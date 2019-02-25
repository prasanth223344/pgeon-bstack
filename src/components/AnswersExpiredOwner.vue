<template>

<div>

  <header class="landing_header relative">
    <div class="mw6 m-auto landing_header__inner flex items-center top__header relative pr15 pl15">
      <a href="/pending" class="question-details__close pointer">

      <?xml version="1.0" encoding="UTF-8"?>
<svg version="1.1" viewBox="0 0 448 256" xmlns="http://www.w3.org/2000/svg">
<g fill="none" fill-rule="evenodd">
<g fill="#4A4A4A" fill-rule="nonzero">
<path d="m136.97 252.48l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971l-83.928-83.444h375.89c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12h-375.89l83.928-83.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-116.48 116c-4.686 4.686-4.686 12.284 0 16.971l116.48 116c4.686 4.686 12.284 4.686 16.97-1e-3z"/>
</g>
</g>
</svg>

      </a>
      <div class="question-details__profile">
        <p class="m0">All Responses</p>
      </div>
      <div class="pointer save_button">
        <span v-on:click="saveChosenAnswer()">Save</span>
      </div>
    </div>
    <div class="details__dropdown__container mw6 m-auto">

    </div>
    <div class="details__overlay standard-overlay"></div>
  </header>






 <main class="landing-main mw6 m-auto pl15 pr15">

    <div class="open-question__right">
      <div class="open-question__meta">
        <span class="open-question__author">{{uname}}</span>
        <span class="open-question__time">Ended {{ex_date}}</span>
      </div>
      <a href="/question/234/details" class="open-question__content mt5p m0">
        <p>	{{question}}</p>
      </a>
    </div>

    <div class="open-question__seperator mt15p mb15p">
      <div class="open-question__seperator__inner open-question__seperator__inner--fullwidth"></div>
    </div>

    <div class="open-question__responses">


      <div class="open-question__response pointer" v-for="answer in answers" v-bind:class="{'chosen': answer.id == answer_id}" :id="answer.id" v-on:click="selectAnswer(answer.id)" >
        <p>{{answer.answer}}</p>
        <div class="mr10p"> {{ checkVoted(answer.id)}} </div>
      </div>


    </div>
  </main>
</div>



</template>

<script>
  export default {

    data: function() {
      return {
        answers: [],
        my_votes: [],
        csrf: "",
        uname: "",
        question: "",
          ex_date: "",
          answer_id: 0
      };
    },
    props: ['topanswer', 'question_id', 'top_a'],

    mounted() {
              this.csrf = $('meta[name="csrf-token"]').attr('content');


    },

    methods: {



    	fetchRecords() {


         this.answer_id = this.top_a
    		 $.getJSON('/question/' + this.question_id + '/json', function(response) {
                this.question = response.q.question
                this.uname = response.uname
                this.ex_date = response.ex_date
                this.answers = response.answers


    		    //    console.log(response);

    		        // var com = this
    		        $.getJSON('/get_votes_with_count/'+this.question_id, function(votes) {
    		       //   com.my_votes = votes
                    this.my_votes = votes

    		      }.bind(this));

    		      }.bind(this));
    	},

      selectAnswer(answer_id) {

    	  	this.answer_id = answer_id

      },

      saveChosenAnswer() {

    	  var formData = {
    	          'question_id': this.question_id,
    	          'answer_id': this.answer_id,
    	        }
    	        this.$http.post('/set_chosen_answer', formData).then((response) => {
    	        		location.href=`/pending/${this.question_id}/${this.answer_id}`
    	        }, (response) => {
    	          alert('error submitting')
    	        });

      },


      checkVoted(answer_id) {
         for (var i = 0; i < this.my_votes.length; i++) {
            if (this.my_votes[i]["answer_id"] == answer_id) {
            		return this.my_votes[i]["votecount"];
            }
         }
        return 0;
      },


    }

    ,
    created: function() {

      this.fetchRecords()

    },


  }

</script>
