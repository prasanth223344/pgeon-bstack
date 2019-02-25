<template>
<div >

<header class="bg-white relative fixed-header ">
  <div class="mw6 m-auto notification-header pr15 pl15 flex items-center justify-between">

    <a onclick="window.history.back()" class="left-arrow fc">
<svg version="1.1" viewBox="0 0 448 256" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#4A4A4A" fill-rule="nonzero"><path d="m136.97 252.48l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971l-83.928-83.444h375.89c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12h-375.89l83.928-83.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-116.48 116c-4.686 4.686-4.686 12.284 0 16.971l116.48 116c4.686 4.686 12.284 4.686 16.97-1e-3z"></path></g></g></svg>
    </a>
    <h4 class="header-title m0">Notifications</h4>
    <button class="btn clear-all" v-if="notifications.length>0 && show_clear" v-on:click="clear_all"  >
      Clear All
      <!-- {{bubble}} -->
    </button>
   
     <button class="btn clear-all" v-if="show_undo" v-on:click="fetchUndoRecords"  >
      Undo
      <!-- {{bubble}} -->
    </button>

    </div>

</header>






           <main class="notification-main mw6 m-auto">
             <div  v-if="still_deciding_count" class="spinner">
             <img src="img/spinner.svg">
        </div>





         <div class="m-b-5" v-else>

<div class="notifications-item pr15 pl15" v-on:click="fetchRecords"  v-if="new_recs_in>0" >
  You have new notifications
  </div>


 <div class="notifications-item pr15 pl15"  v-on:click="redirect(notification)"  v-bind:class="{ 'notifications-item--unseen':  notification.seen != 1}"  v-for="notification in notifications">

      <!-- <span class="fa text-muted" :class="notification.class"></span> -->
      <div class="notif-icon fc">

          <svg v-if="notification.type == 'answer_accepted'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M448 64V12c0-6.6-5.4-12-12-12H140c-6.6 0-12 5.4-12 12v52H12C5.4 64 0 69.4 0 76v61.6C0 199.7 68.1 272 160.7 285.7c29.4 60.7 73.7 90.3 111.3 96.9V480h-86c-14.4 0-26 11.7-26 26.1 0 3.3 2.7 5.9 6 5.9h244c3.3 0 6-2.6 6-5.9 0-14.4-11.6-26.1-26-26.1h-86v-97.4c37.7-6.6 81.9-36.2 111.3-96.9C508 272 576 199.6 576 137.6V76c0-6.6-5.4-12-12-12H448zM32 137.6V96h96v24c0 51.8 7 94.9 18.5 130.2C77.9 232.5 32 178 32 137.6zM288 352c-72 0-128-104-128-232V32h256v88c0 128-56 232-128 232zm256-214.4c0 40.4-46 94.9-114.5 112.6C441 214.9 448 171.8 448 120V96h96v41.6z"></path></svg>


          <svg v-if="notification.type == 'votes_earned' || notification.type == 'user_followed' " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496.656 285.683C506.583 272.809 512 256 512 235.468c-.001-37.674-32.073-72.571-72.727-72.571h-70.15c8.72-17.368 20.695-38.911 20.695-69.817C389.819 34.672 366.518 0 306.91 0c-29.995 0-41.126 37.918-46.829 67.228-3.407 17.511-6.626 34.052-16.525 43.951C219.986 134.75 184 192 162.382 203.625c-2.189.922-4.986 1.648-8.032 2.223C148.577 197.484 138.931 192 128 192H32c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-8.74c32.495 0 100.687 40.747 177.455 40.726 5.505.003 37.65.03 41.013 0 59.282.014 92.255-35.887 90.335-89.793 15.127-17.727 22.539-43.337 18.225-67.105 12.456-19.526 15.126-47.07 9.628-69.405zM32 480V224h96v256H32zm424.017-203.648C472 288 472 336 450.41 347.017c13.522 22.76 1.352 53.216-15.015 61.996 8.293 52.54-18.961 70.606-57.212 70.974-3.312.03-37.247 0-40.727 0-72.929 0-134.742-40.727-177.455-40.727V235.625c37.708 0 72.305-67.939 106.183-101.818 30.545-30.545 20.363-81.454 40.727-101.817 50.909 0 50.909 35.517 50.909 61.091 0 42.189-30.545 61.09-30.545 101.817h111.999c22.73 0 40.627 20.364 40.727 40.727.099 20.363-8.001 36.375-23.984 40.727zM104 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"></path></svg>




          <avatar v-if="notification.type == 'question_posted'" :size="36"  :src="notification.avatar" :username="(notification.name)?notification.name:notification.slug"></avatar>

         </div>
      <div class="notifications-body">
        <h5 class="notification-title m0">


          

          {{notification.message}}
        </h5>
        <span class="notification-time">
            {{notification.ago}}
        </span>
      </div>
    </div>

















  </div>
</main>

<main class="notification-main mw6 m-auto"  v-if="notifications.length<1 && still_deciding_count == false">
  <div class="empty-notifications">
    <p class="m0">
      <span>🎉</span>
      <span>You’re all caught up!</span>
    </p>
  </div>
</main>


</div>

</template>

<script>

import Avatar from 'vue-avatar'

  export default {

    data: function() {
      return {
        notifications: [],
        still_deciding_count: true,
        new_recs_in: false,
        bubble: 0,
        show_undo: false,
        show_clear: true,
      };
    },
    props: ['current_user_id'],
    mounted() {
		//alert(window.bubbleCount)

    },
    components: {
				Avatar
		},

    methods: {

      redirect: function(notification) {

	//if already seen..just redirct it
    	  if (notification.seen == 1) {
    		  location.href = notification.link_to
    	  }else {
    		  //mark that rec as seen.
    		  var formData = {
    	                'id': notification.id
    	              }
    	    	  	this.bubble -= 1
    	        this.$http.post('/markasseen', formData).then((response) => {
    	        		//	this.$emit('bubbleCountChanged', this.bubble-1)
    	        	 		location.href = notification.link_to
    	          }, (response) => {
    	            alert('error navigating')
    	          });
    	  }

      },


      clear_all() {

	    	  this.$http.delete('/notification').then((response) => {
	    		  	this.still_deciding_count = false
              this.notifications =  []
              this.bubble = 0;

              this.show_clear = false
              this.show_undo = true
	              if (socket) {
                  //this will just emit a cleared event from server to all the clients to clear themselves
                  socket.emit('clearbubble', this.current_user_id);
                  
                  }
	            }, (response) => {
	              alert('error clearing')
	            });
      },


     

      fetchRecords() {

    	  	this.new_recs_in=false
    	  	this.still_deciding_count = true
    		$.getJSON('/notifications/json', function(response) {


    			this.notifications = response
    		 	var com = this
    			response.forEach(function(val,index) {
         //   console.log(val.seen);
            
    					if(val.seen == 0 )
    						com.bubble++;
    				})
    			this.still_deciding_count = false

    	    }.bind(this));


  },


    fetchUndoRecords() {

    	  	this.new_recs_in=false
          this.still_deciding_count = true
          ///notifications/json/undo 
    		$.getJSON('/notifications/json/1', function(response) {

            this.notifications = response
            this.still_deciding_count = false
            this.show_clear = true
            this.show_undo = false

    	    }.bind(this));


  },



    },
    created: function() {



    	 this.fetchRecords();

    	var com = this


    	 if (socket) {
    		 socket.on('bubble', function (bubble) {
    			 //total unseen
    			 	 com.new_recs_in = bubble
    			 	 com.bubble = bubble
    		      });
        }








     }


  }

</script>
