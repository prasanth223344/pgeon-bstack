<template>
<div>

<div class="bgw"> 
<div class="people-tabs mw6 m-auto pr15 ">
      <div  class="people-tab " v-bind:class="{'people-tab--active': current_tab == 'iam_following'}">
        <a v-on:click="setcurrenttab('iam_following')">{{iam_following_count}} Following</a>
      </div>
      <div class="people-tab" v-bind:class="{'people-tab--active': current_tab == 'my_followers'}">
        <a v-on:click="setcurrenttab('my_followers')">{{my_followers_count}} Followers</a>
      </div>
      <div class="people-search">
        <a href="/search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path></svg>

        </a>
      </div>
    </div>
</div>




<main class="mw6 m-auto people-main">
<div  v-bind:class="{ 'hidden': (this.current_tab != 'iam_following') }">
    <div class="people-item" v-for="item in iam_following" >
      <div>
            <avatar :size="36"  :src="item.avatar"  :username="(item.name)?item.name:item.url" ></avatar>
        <div class="people-item__info">
          <h4>{{ item.url }}</h4>
          <span>{{ item.last_posted }}</span>
        </div>
      </div>
        <button v-if="isExistsinUndo(item.user_id)" v-on:click="followNoUpdate(item.user_id, $event)"  class="follow-button">
     

                                       
        <span>Follow</span>
        <!-- following is the `active` state -->
      </button>
      <button v-else v-on:click="unfollowNoUpdate(item.user_id)" class="follow-button follow-button--active">
        <!-- following is the `active` state -->
        <span>Following</span>
      </button>

    </div>

</div>
<div v-bind:class="{ 'hidden': (this.current_tab == 'iam_following') }">
 <div class="people-item" v-for="item in my_followers" >
      <div>
        
            <avatar :size="36"	 :src="item.avatar"  :username="(item.name)?item.name:item.url" ></avatar>
        <div class="people-item__info">
          <h4>{{ item.url }}</h4>
          <span>{{ item.last_posted }}</span>
        </div>
      </div>
      <button v-if="!isExistsinFollowing(item.user_id)" v-on:click="follow(item.user_id, $event)"  class="follow-button">
     

                                       
        <span>Follow</span>
        <!-- following is the `active` state -->
      </button>
       <button  v-else v-on:click="unfollowNoUpdate(item.user_id)"  class="follow-button follow-button--active">
        <!-- following is the `active` state -->
        <span>Following</span>
      </button>

    </div>
</div>

</main>






  </div>




</template>

<script>
import Avatar from 'vue-avatar'

    export default {

    data: function(){
        return {
            iam_following: [],
            //this is used for holding i_am folliwing temporarily so it can reflect in i_am_follwing tab during undoing purpose
             temp_iam_following: [],
            my_followers: [],
            iam_following_count : 0,
            my_followers_count : 0,
            current_tab: "iam_following",
          //  current_order: false,
            current_order: 'DESC',
            showsorting:false,
            unfollwed_undo: []
        };
    },
        mounted() {
         //   console.log('Component mounted.')

        },
        created: function(){
          //only the first time all update..from there only update the my_followers..I_am_follwogin left intact for undo purpose
            this.fetchData()
        },
        components: {
				Avatar
		},

        methods: {
            setcurrenttab(tab) {
                this.current_tab = tab
                this.sort()

                
            },
            sort() {
                if(!this.current_order ||  this.current_order == 'ASC') {

                    this[this.current_tab].sort(function(a, b){
                        return a.convo_count - b.convo_count;
                    });
                    
                }else if(this.current_order == 'DESC') {
                    
                    this[this.current_tab].sort(function(a, b){
                        return b.convo_count - a.convo_count;
                    });
                     
                }
                
            },
        	fetchData() {
        		$.getJSON('/followers', function(response){
                      this.my_followers = response.my_followers;
                      this.temp_iam_following = this.iam_following = response.iam_following;
                      this.iam_following_count = response.iam_following_count
                      this.my_followers_count = response.my_followers_count
                      this.sort()
                   // console.log(response.iam_following_count)
                }.bind(this ));
          },

           fetchDataNoUpdate() {
        		$.getJSON('/followers', function(response){
                      this.temp_iam_following = response.iam_following;
                   //   this.my_followers = response.my_followers;
                      this.iam_following_count = response.iam_following_count
                      this.my_followers_count = response.my_followers_count
                      this.sort()
                   // console.log(response.iam_following_count)
                }.bind(this ));
        	},
        	
        	isExistsinFollowing(user_id) {

        		for(var k in this.temp_iam_following) {
        			   if (user_id == (this.temp_iam_following[k].user_id))
        				   return true;
        			}
        		return false	;
          },
          isExistsinUndo(user_id) {
            
        		for(var k in this.unfollwed_undo) {
              
        			   if (user_id == (this.unfollwed_undo[k]))
        				   return true;
        			}
        		return false	;
          },
        
        	getBubbleCount() {
        		this.$http.get('/bubble').then((response) => {
        			if (parseInt(response.data) > 0) 
        				$(".bubble").html(response.data)
        	 
        	        //alert('ss')
        	        // success callback
        	      }, (response) => {
        	        // error callback
        	      });
        	},  
            follow: function (id, event) {
              //  $.post('follow',  )
            //  $(event.target).children().remove()
              var formData = {
                'user_id': id
              }
              this.$http.post('/follow', formData).then((response) => {
                
            	 	 this.fetchData()
                // success callback
                
              }, (response) => {
            	  console.log(response)
                // error callback
              });



            },
           

            unfollow: function (id) {
              //  $.post('unfollow',  )
              var formData = {
                'user_id': id
              }
              this.$http.post('/unfollow', formData).then((response) => {
	            	  this.fetchData()
              }, (response) => {
                	
              });



            },

    ///will unfollow, but will not update the  following list.. instead will into a temp undo array ..
            unfollowNoUpdate: function (id) {
              //  $.post('unfollow',  )
              var formData = {
                'user_id': id
              }
              this.$http.post('/unfollow', formData).then((response) => {
                  this.unfollwed_undo.push(id)
	            	  this.fetchDataNoUpdate()
              }, (response) => {
                	
              });



            },

              followNoUpdate: function (id, event) {
              //  $.post('follow',  )
            //  $(event.target).children().remove()
              var formData = {
                'user_id': id
              }
              this.$http.post('/follow', formData).then((response) => {
                  this.fetchDataNoUpdate()
                  //this.unfollwed_undo.push(id)
                  this.unfollwed_undo = this.unfollwed_undo.filter(e => e !== id) 
                  console.log(this.unfollwed_undo);
                  
                // success callback
                
              }, (response) => {
            	  console.log(response)
                // error callback
              });



            },




          }


    }
</script>
