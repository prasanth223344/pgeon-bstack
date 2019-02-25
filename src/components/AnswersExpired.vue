<template>



    <div id="answers_container">
      
    
        <div class="col-md-12 subtract-margin-left" v-for="answer in answers">
            <ul class="media-list media-list-conversation c-w-md fa-ul">
                <li class="media m-b-md">
                    <a class="media-left" >
                        
                        
                        <span >  {{checkVoted(answer.id)}}</span>
                        
                    </a>
                    <div class="media-body">
                        <ul class="media-list media-list-conversation c-w-md">
                            <li class="media media-current-user m-b-md media-divider">
                                <div class="media-body">
                                    <div  v-bind:class="[ accepted_answer == answer.id ? 'accepted_answer' : ownerOfAnswer(answer.user_id) ? 'your_answer' : '']"   class="media-body-text media-response media-user-response"  style="cursor: point">
                                     
                                        {{answer.answer}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>


    </div>





</template>

<script>
  export default {

    data: function() {
      return {
        answers: [],
        my_votes: []

      };
    },
    props: ['question_id', 'current_user_id', 'question_owner_id', 'accepted_answer'],
    mounted() {


    },
    
    methods: {

      ownerOfAnswer: function(user_id) {
        return this.current_user_id == user_id
      },
     
   
 
      
      checkVoted(answer_id) {
         for (var i = 0; i < this.my_votes.length; i++) {
            if (this.my_votes[i]["answer_id"] == answer_id) {
              return this.my_votes[i]["votecount"];
              
            }
         }
        return "-";
      },
   
      
    }


    ,
    created: function() {


   

      $.getJSON('/question/' + this.question_id + '/json', function(response) {
        this.answers = response.answers
        
        // var com = this
        $.getJSON('/get_votes_with_count/'+this.question_id, function(votes) {
       //   com.my_votes = votes
            this.my_votes = votes
          
            console.log(this.my_votes[0].votecount)
          
      }.bind(this));
        
      }.bind(this));
      
       
      
    },


  }

</script>
