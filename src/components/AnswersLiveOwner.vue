<template>
<div>


 <main class="landing-main mw6 m-auto pl15 pr15 smtp mt15p" v-bind:class="[{ 'confirming-modal--active':  showendmodal == true }]">

    <div class="open-question__right">
      <div class="open-question__meta">
        <span class="open-question__author">{{question_user_slug}}</span>
         <div>
        <span class="open-question__stop" v-on:click="showendmodal=true">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm296-80v160c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16z"></path></svg>

          
        </span>
        <span class="open-question__time"><answeringtimer :initial="parseInt(initial)"></answeringtimer></span>
      </div>

      </div>
      <a :href="'/'+question_user_slug" class="open-question__content selected mt5p m0">
        <p>{{question}}</p>
      </a>
    </div>


     <div class="open-question__seperator mt15p mb15p">
      <div class="open-question__seperator__inner mr15p"></div>
      <div class="open-question__seen mr15p">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.354 231.631C512.969 135.948 407.808 72 288 72 168.14 72 63.004 135.994 6.646 231.63a47.999 47.999 0 0 0 0 48.739C63.032 376.053 168.192 440 288 440c119.86 0 224.996-63.994 281.354-159.631a48.002 48.002 0 0 0 0-48.738zM416 228c0 68.483-57.308 124-128 124s-128-55.517-128-124 57.308-124 128-124 128 55.517 128 124zm125.784 36.123C489.837 352.277 393.865 408 288 408c-106.291 0-202.061-56.105-253.784-143.876a16.006 16.006 0 0 1 0-16.247c29.072-49.333 73.341-90.435 127.66-115.887C140.845 158.191 128 191.568 128 228c0 85.818 71.221 156 160 156 88.77 0 160-70.178 160-156 0-36.411-12.833-69.794-33.875-96.01 53.76 25.189 98.274 66.021 127.66 115.887a16.006 16.006 0 0 1-.001 16.246zM224 224c0-10.897 2.727-21.156 7.53-30.137v.02c0 14.554 11.799 26.353 26.353 26.353 14.554 0 26.353-11.799 26.353-26.353s-11.799-26.353-26.353-26.353h-.02c8.981-4.803 19.24-7.53 30.137-7.53 35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64z"></path></svg>
          <span>  {{hits}}  </span>
      </div>
      <div class="open-question__comments mr15p">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 64c123.5 0 224 79 224 176S379.5 416 256 416c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176m0-32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26 3.8 8.8 12.4 14.5 22 14.5 61.5 0 110-25.7 139.1-46.3 29 9.1 60.2 14.3 93 14.3 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path></svg>
          <span> {{answers.length}} </span>
      </div>
      <div class="open-question__votes">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 32c8.823 0 16 7.178 16 16v352c0 8.822-7.177 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h352m-34.301 98.293l-8.451-8.52c-4.667-4.705-12.265-4.736-16.97-.068l-163.441 162.13-68.976-69.533c-4.667-4.705-12.265-4.736-16.97-.068l-8.52 8.451c-4.705 4.667-4.736 12.265-.068 16.97l85.878 86.572c4.667 4.705 12.265 4.736 16.97.068l180.48-179.032c4.704-4.667 4.735-12.265.068-16.97z"></path></svg>
          <span> {{vote_count}} </span>
      </div>
    </div>






    
         
     

       <div class="open-question__no-responses" v-if="records_loaded && answers.length<1">
        <!-- <p class="m0">No Responses yet</p> -->
      </div>


<div  v-else>

   <div v-for="(answer, index) in answers"  v-bind:key="answer">
       <v-touch   v-bind:press-options="{ time: '500' }"  v-bind:class="[{ 'fadeIn':  answer.id == pushed_id }, 'media-list media-list-conversation c-w-md jsvote animated open-question__response'] "  >

          <p>{{answer.answer}} </p>
         




           </v-touch>
        </div>

  </div>
     

<div class="confirmation-modal end-live-qt">
    <div class="confirmation-modal__overlay standard-overlay"></div>
    <div class="confirmation-modal__modal">
      <h2>End Now?</h2>
      <p>Are you sure to End this Question?</p>
      <div class="flex">
        <div class="flex1"></div>
        <button class="confirmation-modal__cancel">Cancel</button>
        <button class="confirmation-modal__danger" v-on:click="endnow">End Now</button>
      </div>
    </div>
  </div>

 </main>
 

</div>



</template>

<script>
var longpress;
var pressTimer;
  export default {

    data: function() {
      return {
        answers: [],
        submitted_text: '',
        already_answered: false,
        placeholder: "Enter your response here",
        my_votes: [],
        voted_now : 0,
        vote_count: 0,
        records_loaded: false,
        //animateion will work only for the new items coming in not while refreshing the page...
		pushed_id:0,
		submit_error: false,
		error_class: "danger",
		lock_voting: false,
    showendmodal: false
      };
    },
    //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh
    props: ['question_id', 'hits',  'initial',    'question_user_slug', 'question'],
    mounted() {

    },
    
    watch: {
    
    },
    methods: {
     
    
    
    	
    	clearError() {
    		this.submit_error = false	
    	},
      		
    
      
      scrollToEnd: function() {
        var container = this.$el

        container.scrollTop = container.scrollHeight - container.clientHeight;

      },
     
   
    
       
      getVoteCount() {
    	  	  var com = this	
          $.getJSON('/get_vote_count_for_question/'+this.question_id, function(votes) {
          		com.vote_count = votes['vote_count']
          }, (response) => {
              alert('error fetching vote counts')
          });
      }
      ,
      fetchRecords() {
	    	  $.getJSON('/question/' + this.question_id + '/json', function(response) {
	    	        this.answers = response.answers
	    	        
	    	        // var com = this
	    	        $.getJSON('/get_votes/'+this.question_id, function(votes) {
	    	       //   com.my_votes = votes
	    	            this.my_votes = votes
	    	          	this.records_loaded = true
	    	           // console.log(this.my_votes[0])
	    	          
	    	      }.bind(this));
	    	        
	    	      }.bind(this));
	    	  
	    	 
      },
      
      
   
     




        endnow: function () {

        this.$http.post(`/end_now/${this.question_id}`).then((response) => {
           socket.emit('end_now', this.question_id);
           setTimeout(function(){ location.reload(); }, 1000);
        }, (response) => {
          alert('error submitting')
        });


          
        },
        
             cancelnow: function () {

        this.$http.delete(`/question/${this.question_id}`).then((response) => {
           socket.emit('cancel_now', this.question_id);
           setTimeout(function(){ location.href = "/my-questions"; }, 1000);
        }, (response) => {
          alert('error submitting')
        });


          
        },
  
      
    }


    
    ,
    created: function() {
      var com = this

      //got some new questions inserted
      if (socket) {
        //just specific to this question id
        
        
        socket.emit('connect_me', 'Q_' + this.question_id);
        socket.on('new_answers', function(response) {
        	  com.pushed_id = response.id;	
          com.answers.push(response)
          com.scrollToEnd();
        });

        socket.on('answer_deleted', function(id) {

          for (var i = 0; i < com.answers.length; i++) {
            if (com.answers[i]["id"] == id) {
              com.answers.splice(i, 1);
              com.already_answered = false
              com.placeholder = "Enter your response here"
              break;
            }

          }
        });
        
        
        socket.on('question_ended', function(id) {
          //owners don't react..
        })
        
       
         socket.on('question_cancelled', function(id) {
        	          //owner don't react..

        })
        

      }

      this.fetchRecords();
      this.getVoteCount();
      
      
       
      
    },


  }

</script>
