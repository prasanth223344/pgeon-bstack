const moment = require('moment');

exports.calc = async function(user_id, radiksData) {
    

    //get all the questions which the user answered
    const qres = await radiksData
      .find(
        {

          radiksType: 'Answer',
          user_id: user_id,

        },
        {
          projection: { question_id: 1, _id:1 },
        }
      )
      .toArray();
        qs = [];
        q_a_s = {}
        for (i = 0; i < qres.length; i++){
          qs.push(qres[i]["question_id"]);
          q_a_s[qres[i]["question_id"]]= qres[i]["_id"]
        }
  

      
        
        

        //filter out the expired one..don't count the live one
      const fresults = await radiksData
      .find(
        {

          radiksType: 'Question',
          _id: { $in: qs },
          expiring_at: { $lt: moment().unix()  },

        },
        {
          projection: {  _id:1 },
        }
        
      )
      .toArray();

      //take answers which are from expired qs
      for (i = 0; i < qres.length; i++){
        qs.push(qres[i]["question_id"]);
         

      }

      answers_for_vote_query = []

      //if the answered Q is in expired Q

      for (i = 0; i < fresults.length; i++){
        if(q_a_s[fresults[i]["_id"]]){
          answers_for_vote_query.push(q_a_s[fresults[i]["_id"]])
        }

       // filteredqs.push();
      }

     
      

      const vres = await radiksData
      .find(
        {

          radiksType: 'Vote',
          answer_id: { $in: answers_for_vote_query },


        }
        ,
        {
          projection: { vote: 1 },
        }
        
      )
      .toArray();

      points = 0;
      for (i = 0; i < vres.length; i++){
        points += vres[i]["vote"];
      }

      
      return points;

 };
