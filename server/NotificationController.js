
const express = require('express');
const request = require('request-promise');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');
var moment = require('moment');
const { ObjectId } = require('mongodb'); // or ObjectID 


const notificationController = (db) => {
  const Router = decorateApp(express.Router());
  const radiksData = db.collection(COLLECTION);






  Router.postAsync('/insert/:data', async (req, res) => {

    var data = JSON.parse(req.params.data);
    data.seen = 0
    data.createdAt = moment().unix()
    if (data.type == 'user_followed' || data.type == 'answer_accepted') {
      await radiksData.insertOne(
        data
      )
    } else if (data.type == 'question_posted') {

      //get his followers
      const his_followers = await radiksData
        .find(
          {
            radiksType: 'Following',
            user_id: data.created_by,

          }
          ,
          {
            projection: { followed_by: 1 },
          }
        )
        .toArray();


      var followers_data = []



      his_followers.forEach(uid => {
        var tdata = { ...data }
        tdata.target_user = uid.followed_by
        tdata.id = uid._id
        followers_data.push(tdata)
      })

      await radiksData.insertMany(
        followers_data
      )



    }


    res.send('success');

  });



  Router.getAsync('/:user_id/:undo?', async (req, res) => {



    if (req.params.undo) {
      await radiksData
        .updateMany(
          {
            "target_user": req.params.user_id
          }, {
            $set: {
              bulk_deleted: 0
            }
          }
        )
    } else {
      //this will probably on first time load or page refresh
      //delete previously bulk deleted on refresh..otherwise it will also be shown

      await radiksData
        .deleteMany(
          {
            "target_user": req.params.user_id,
            "bulk_deleted": 1
          }
        )
    }


    const results = await radiksData
      .find(
        {
          radiksType: 'Notification',
          target_user: req.params.user_id,
          // seen: 0,

        }

      ).sort({ createdAt: -1 })
      .toArray();

    //const usernames = users.map(({ username }) => username && username);
    res.json(results);
  });






  Router.postAsync('/markasseen/:id', async (req, res) => {
    console.log(ObjectId(req.params.id));
    console.log((req.params.id));


    const results = await radiksData
      .updateOne(
        {
          "_id": ObjectId(req.params.id)
        }, {
          $set: {
            seen: 1
          }
        }
      )

    res.send('success');

  })



  Router.deleteAsync('/:user_id', async (req, res) => {

  
    await radiksData
      .updateMany({
        "target_user": req.params.user_id

      }, {
          $set: {
            bulk_deleted: 1
          }
        })


    res.send('success');
  })


  Router.deleteAsync('/question/:id', async (req, res) => {

    await radiksData.remove(
      {
        radiksType: 'Question',
        _id: req.params.id
      }
    )

    await radiksData.remove(
      {
        radiksType: 'Vote',
        question_id: req.params.id
      }
    )

    await radiksData.remove(
      {
        radiksType: 'Answer',
        question_id: req.params.id
      }
    )

    res.send('success');
  })







  Router.deleteAsync('/question-multiple/:ids', async (req, res) => {


    await radiksData.deleteMany(
      {
        radiksType: 'Question',
        _id: { "$in": [req.params.ids.split(",")] }
      }
    )

    await radiksData.deleteMany(
      {
        radiksType: 'Vote',
        question_id: { "$in": [req.params.ids.split(",")] }
      }
    )

    await radiksData.deleteMany(
      {
        radiksType: 'Answer',
        question_id: { "$in": [req.params.ids.split(",")] }
      }
    )

    res.send('success');
  })



  Router.postAsync('/notification/:data', async (req, res) => {
    console.log('wwerwer');
    var pars = JSON.parse(req.params.data);
    console.log(pars.target_users);
    res.send('success');


  })


  return Router;
};

module.exports = notificationController;
