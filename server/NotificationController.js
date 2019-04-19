
const express = require('express');
const request = require('request-promise');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');
var moment = require('moment');


const notificationController = (db) => {
  const Router = decorateApp(express.Router());
  const radiksData = db.collection(COLLECTION);

  // Router.getAsync('/messages', async (req, res) => {
  //   let messages = await aggregateMessages(radiksData, req.query);

  //   let username = req.query.fetcher || req.universalCookies.get('username');
  //   if (username) username = username.replace(/"/g, '');
  //   messages = transformMessageVotes(messages, username);

  //   res.json({ messages });
  // });








  Router.postAsync('/insert/:data', async (req, res) => {

    var data = JSON.parse(req.params.data);
    data.seen = 0
    data.createdAt =  moment().unix() 
    if(data.type == 'user_followed') {
        await radiksData.insertOne(
        data
       )
    }else if(data.type == 'question_posted') {

      //get his followers
      const his_followers = await radiksData
      .find(
        {
          radiksType: 'Following',
          user_id: data.created_by,

        }
        ,
        {
          projection: { followed_by: 1, _id: 0 },
        }
      )
      .toArray();

      
      var followers_data = []


        

      his_followers.forEach(uid => {
        var tdata = {...data}
        tdata.target_user = uid.followed_by
        followers_data.push(tdata)
      })
  

      await radiksData.insertMany(
              followers_data
            )




    }
 

    res.send('success');
   
  });



  Router.getAsync('/:user_id', async (req, res) => {

    const results = await radiksData
      .find(
        {
          radiksType: 'Notification',
          target_user: req.params.user_id,
          seen: 0,

        }
        
      )
      .toArray();
   
    //const usernames = users.map(({ username }) => username && username);
    res.json(results);
  });






  Router.deleteAsync('/answer/:id', async (req, res) => {

     await radiksData.remove(
      { radiksType: 'Vote',
        answer_id: req.params.id
      }
      )

      await radiksData.remove(
        { radiksType: 'Answer',
          _id: req.params.id
        }
      )

    res.send('success');
  })


  Router.deleteAsync('/question/:id', async (req, res) => {

     await radiksData.remove(
      { radiksType: 'Question',
        _id: req.params.id
      }
      )

     await radiksData.remove(
      { radiksType: 'Vote',
        question_id: req.params.id
      }
      )

      await radiksData.remove(
        { radiksType: 'Answer',
        question_id: req.params.id
        }
      )

    res.send('success');
  })







 Router.deleteAsync('/question-multiple/:ids', async (req, res) => {

   
  await radiksData.deleteMany(
   { radiksType: 'Question',
     _id: { "$in": [req.params.ids.split(",")]}
   }
   )

  await radiksData.deleteMany(
   { radiksType: 'Vote',
     question_id: { "$in": [req.params.ids.split(",")]}
   }
   )

   await radiksData.deleteMany(
     { radiksType: 'Answer',
     question_id: { "$in": [req.params.ids.split(",")]}
     }
   )
     
   res.send('success');
})



Router.postAsync('/notification/:data', async (req, res) => {
    console.log('wwerwer');
    var pars = JSON.parse(req.params.data);
    console.log( pars.target_users);
    res.send('success');

    
})


  return Router;
};

module.exports = notificationController;
