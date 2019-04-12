<template>
<div>
    <headerforq v-bind:question="question" v-bind:noshare="noshare" v-bind:nomenu="nomenu"></headerforq>



 <main class="landing-main mw6 m-auto pl15 pr15 smtp mt15p" v-if="records_loaded">
    <div class="open-question__right">
      <div class="open-question__meta">
        <span >
                             
                               	    <router-link class="open-question__author" :to="{ name: 'friendship', params: { q_by: question.user_id, a_by: answer.user_id }}" >{{question.user_id}} ← {{answer.user_id}}</router-link>
                           
                           
        </span>
        <span class="open-question__time"> Published:  {{formatted}}</span>
      </div>


             <div class="q-bubble qa-item ">
          <div>
            <span> {{question.question}}</span>
          </div>
          <div class="qa-item__seperator"></div>
          <span>     
          {{answer.answer}}
                       
          </span>
          </div>

     
    </div>



  
          
  




         

  </main>




 

</div>



</template>

<script>
var longpress;
var pressTimer;
import Headerforq from './shared/HeaderForQ.vue'
import Question from "../models/Question";
import Answer from "../models/Answer";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";



import moment from 'moment';

  export default {

    data: function() {
      return {
        answer: null,
        records_loaded: false,
        formatted:null ,
        noshare:true,
        nomenu:false
      
      };
    },
    //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh
    props: ['question'],
      mixins: [BlockstackMixin],

    mounted() {

      console.log(this.question);
      
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
     
     
     
  
      
    }


    
    ,
    created: async function() {
      var com = this
      
      var ans = await Answer.findById(this.question.accepted_answer);
      this.answer = ans.attrs
      this.formatted = moment.unix(this.question.expiring_at).format("MM/DD/YYYY");
      if(this.question.user_id == this.current_user.username) {

        
        this.nomenu = true
      }
       this.records_loaded = true
      
    },

  components: {
    Headerforq
  }

  }

</script>
