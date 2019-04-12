
const express = require('express');
const request = require('request-promise');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');


const makeApiController = (db) => {
  const Router = decorateApp(express.Router());
  const radiksData = db.collection(COLLECTION);

  // Router.getAsync('/messages', async (req, res) => {
  //   let messages = await aggregateMessages(radiksData, req.query);

  //   let username = req.query.fetcher || req.universalCookies.get('username');
  //   if (username) username = username.replace(/"/g, '');
  //   messages = transformMessageVotes(messages, username);

  //   res.json({ messages });
  // });

  Router.getAsync('/avatar', (req, res) => {
      res.send('hello world');

  })

  Router.getAsync('/avatar/:username', async (req, res) => {
    const { username } = req.params;
    const user = await radiksData.findOne({ _id: username });
    if (!user) {
      res.send('user not found');
    }
    let image;
    
    if (user.profile.image) {
      [image] = user.profile.image;
    }

    if (image) {
      return res.redirect(image.contentUrl);
    }

    res.send('not found');
  });




  Router.getAsync('/profileqa/:id', async (req, res) => {

    const results = await radiksData
      .find(
        {
          
          radiksType: 'Question',
          expiring_at: { $lt: Date.now()  },
          accepted_answer:  { $exists: true},
          $or: [ { user_id: req.params.id }, { accepted_user: req.params.id } ],

        },
        {
          projection: { question: 1, _id:1, accepted_answer:1, accepted_user:1, user_id:1 },
        }
      )
      .toArray();


   
    //const usernames = users.map(({ username }) => username && username);
    res.json(results);
  });



  Router.getAsync('/search/:exclude/:startswith', async (req, res) => {

    const results = await radiksData
      .find(
        {
          radiksType: 'BlockstackUser',
          username: {'$regex' : '.*'+req.params.startswith+'.*' , '$options' : 'i' },
          _id: {'$ne': req.params.exclude }

        },
        {
          projection: { username: 1, _id:1 },
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

  // Router.getAsync('/user/:username', async (req, res) => {
  //   const { username } = req.params;
  //   let user = await radiksData.findOne({
  //     radiksType: 'BlockstackUser',
  //     username,
  //   });

  //   if (!user) {
  //     const uri = `https://core.blockstack.org/v1/users/${username}`;
  //     try {
  //       const userData = await request({
  //         uri,
  //         json: true,
  //       });
  //       if (userData[username] && !userData[username].error) {
  //         user = {
  //           username,
  //           profile: userData[username].profile,
  //         };
  //       }
  //     } catch (error) {
  //       // user not found
  //     }
  //   }

  //   res.json({ attrs: user });
  // });




  return Router;
};

module.exports = makeApiController;
