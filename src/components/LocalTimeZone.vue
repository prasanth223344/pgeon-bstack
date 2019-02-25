<template>
 <span>   {{formatted}}</span> 
  </template>


<script>
import moment from 'moment';

    export default {
      
      
   props: {
 
    ts: {
      type: String
    },
 
    
     
  },
  
  data() {
    return {
       formatted:'...'
    }
  },
  methods: {
    to_time() {
   
    		this.formatted = moment.unix(this.ts).format("MM/DD/YYYY");
    //  return t_str      
    },

  },
  mounted() {
    this.to_time()
  }


    }
</script>
