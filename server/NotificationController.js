
const express = require('express');
const request = require('request-promise');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');
var moment = require('moment');
const { ObjectId } = require('mongodb'); // or ObjectID 
const points = require('./shared/points.js');


//settimeout will be set and will be stored this array...this should be cleared when the question is ended prematurely
var timeouts = {};

async function sendNotifToVoters(db, question) {
  //console.log('======timing out buddy=======');

  const radiksData = db.collection(COLLECTION);
  clearTimeout(timeouts[question.question_id])
  delete timeouts[question.question_id]





  const res_answers_with_vote = await radiksData
    .find(
      {
        radiksType: 'Vote',
        question_id: question.question_id,

      }
      ,
      {
        projection: { answer_id: 1, _id: 0, vote: 1 },
      }
    )
    .toArray();

  var answers_with_vote = new Array()
  var votecounts = {}
  for (var i = 0; i < res_answers_with_vote.length; i++) {
    //not exists
    if (answers_with_vote.indexOf(res_answers_with_vote[i].answer_id) < 0) {
      answers_with_vote.push(res_answers_with_vote[i].answer_id)
      //fresh initialization
      votecounts[res_answers_with_vote[i].answer_id] = 0
    }

    //add votes
    votecounts[res_answers_with_vote[i].answer_id] += res_answers_with_vote[i].vote


  }

  if (answers_with_vote) {

    const res_owners_of_answers = await radiksData
      .find(
        {
          radiksType: 'Answer',
          _id: { $in: answers_with_vote },
        }
        ,
        {
          projection: { user_id: 1 },
        }
      )
      .toArray();







    //insert votes earned...

    var answered_users = []
    var answered_users_prev_votes = {}
    var data = {
      radiksType: "Notification",
      created_by: question.created_by,
      question_id: question.question_id,
      type: "votes_earned",
      votes: points,
      seen: 0,
      createdAt: moment().unix()
    };



    
    

    // res_owners_of_answers.forEach(res => {
    //  
     
    // })


    

    for (var res of res_owners_of_answers) {

  
    


      //don't send for zero 
      if (votecounts[res._id] == 0) continue;
      var tdata = { ...data }

      var pts = await points.calc(res.user_id, radiksData)


      tdata.target_user = res.user_id
      tdata.votes = votecounts[res._id]
      tdata.points = pts
      answered_users.push(tdata)

      const res_owners_of_answers = await radiksData
      .find(
        {
          radiksType: 'Vote',
          _id: { $in: answers_with_vote },
        }
        ,
        {
          projection: { user_id: 1 },
        }
      )
      .toArray();

      answered_users_prev_votes

    }
    if (answered_users.length > 0) {


      await radiksData.insertMany(
        answered_users
      )
    }



  }




}

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

      if (followers_data.length > 0) {
        await radiksData.insertMany(
          followers_data
        )
      }

      //send out notificatoins when the time expires
      var trigger_at = (data.expiring_at * 1000) - new Date().getTime()


      timeouts[data.question_id] = setTimeout(function () {
        
        sendNotifToVoters(db, data)
      }, trigger_at);



    } else if (data.type == 'question_deleted') {
      
      
      sendNotifToVoters(db, data)
    }



    res.send('success');

  });



  Router.getAsync('/unseen/:user_id', async (req, res) => {

    const results = await radiksData
      .find(
        {
          radiksType: 'Notification',
          target_user: req.params.user_id,
          seen: 0,
        }
      ).count();


    res.json({ count: results });
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











  Router.postAsync('/notification/:data', async (req, res) => {
    var pars = JSON.parse(req.params.data);
    console.log(pars.target_users);
    res.send('success');


  })


  return Router;
};

module.exports = notificationController;
