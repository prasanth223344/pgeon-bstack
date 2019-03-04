<template>
    <span>{{formatted}}</span> 
  </template>


<script>
import moment from 'moment';


    export default {
      
      
   props: {
    interval: {
      type: Number,
      default: 5
    },
    initial: {
      type: Number
    },
     question_id: {
       type: String
     },
    
     
  },
  
  data() {
    return {
      current: this.initial,
      timerInterval: null,
      formatted:'...'
    }
  },
  methods: {
    to_time() {
    	
    	//https://stackoverflow.com/questions/13903897/javascript-return-number-of-days-hours-minutes-seconds-between-two-dates
    	   
    	
    	var delta =   this.current
    	var days = Math.floor(delta / 86400);
    	delta -= days * 86400;
      
    	var hours = Math.floor(delta / 3600) % 24;
      
    	delta -= hours * 3600;
    	
    	var minutes = Math.floor(delta / 60) % 60;
    	delta -= minutes * 60;
    	
    	var seconds = delta % 60;  // in theory the modulus is not required

    	var t_str = '';
    	//if(days > 0) 
    //		t_str += days + 'd ' 
    	if(hours > 0) {
        hours = (days * 24) + hours
        if (hours < 10) {hours   = "0"+hours;}
        t_str += hours + ':' 
      }
    	if(minutes > 0) {
        if (minutes < 10) {minutes = "0"+minutes;}
        t_str += minutes + ':'
      }
      //if(seconds > 0)
        if (seconds < 10) {seconds = "0"+seconds;}
    		t_str += seconds + '' 
    				
          return t_str

          
   
    },
    
    onInterval() {

      this.current = this.current -= this.interval
      
      this.formatted = this.to_time()
      if (this.current <= 0) {
        clearInterval(this.timerInterval)
        this.current = 0
        //this.$dispatch('eventName', this.question_id)
        this.$emit('event', this.question_id);
      }
    }
  },
  mounted() {
    //
    this.current = this.current - moment().unix()
    this.timerInterval = setInterval(this.onInterval, this.interval * 1000)
  }


    }
</script>
