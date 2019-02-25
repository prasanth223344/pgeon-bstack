<template>
<div>


 <main class="landing-main mw6 m-auto pl15 pr15" v-if="questions.length<1">
		<div class="container text-center m-t-5p">
				      <div  v-if="still_deciding_count" >
    
		    
        </div>
				 <div v-else>
         <div class="empty-notifications">
           <p class="m0"><span style="-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); -ms-transform: scale(-1, 1); transform: scale(-1, 1);">💬</span>
             <span>There are currently no<br> responses to display</span>
           </p>
         </div>
				</div>
		</div>
	</main>




 <main class="landing-main mw6 m-auto pl15 pr15">




	   <div class="open-question__container"  v-for="question in questions">
        <div class="open-question__left">
          <a :href="question.slug">
			 <avatar :size="36"  :src="question.avatar" :username="(question.name)?question.name:question.slug"></avatar>
          </a>
        </div>
        <div class="open-question__right">
          <span class="open-question__meta">
            <a class="open-question__author" :href="'r/'+question.rslug">{{question.rslug_formatted}}</a>
            <span class="open-question__time">{{question.ago}}</span>
          </span>
        <div class="q-bubble-container q-bubble-container--clickable mt5p">
        <div class="q-bubble qa-item ">
          <div>
            <span> {{question.question}}</span>
          </div>
          <div class="qa-item__seperator"></div>
          <span> {{question.answer}}</span>
          </div>
          </div>
        </div>
      </div>




                    <ul class="load_more" v-if="currently_fetched_records_count>=paginate && still_deciding_paging"><li>
									      <div   class="spinner p-rel">
            <div class="b1 se"></div>
            <div class="b2 se"></div>
            <div class="b3 se"></div>
            <div class="b4 se"></div>
            <div class="b5 se"></div>
            <div class="b6 se"></div>
            <div class="b7 se"></div>
            <div class="b8 se"></div>
            <div class="b9 se"></div>
            <div class="b10 se"></div>
            <div class="b11 se"></div>
            <div class="b12 se"></div>
        </div>
						</li></ul>



<div class="FAB-button__container mw6 m-auto" v-if="role_id == 3">
          <a href="/my-questions" class="FAB-button">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M436 238H242V44c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v194H12c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h194v194c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12V274h194c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z"></path></svg>
          </a>
        </div>




 </main>



       </div>





</template>

<script>
import {CommonMixin} from '../mixins/CommonMixin.js';
import Avatar from 'vue-avatar'

  export default {

	  data: function() {
	      return {
	        questions: [],
	        current_filter: 'follow',
			paginate:6,
			currently_fetched_records_count:0,
			current_page:0,
			still_deciding_count: true,
			still_deciding_paging: false,


	      };
	    },
	    props: ['user_id', 'role_id', 'avatar', 'slug', 'csrf_field','eligible_to_ask'],
	    mounted() {
			$(".up50").removeClass("up50")
			$(window).bind('scroll',this.handleScroll);

		},

        components: {
				Avatar
		},


	    mixins: [CommonMixin],

	    methods: {

	    	reset: function () {
				this.questions = []
				this.current_page = 0
				this.currently_fetched_records_count = 0
				//questions.length will be zero but not finalized yet until push to array
				this.still_deciding_count = true
				$(".up50").removeClass("up50") && $(".up0").removeClass("up0")

			},



		handleScroll: function () {

			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				//if scroll hits bottom
				if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
					this.get_paginated_results()
				}
			}
		},

			get_paginated_results: function () {
				//	console.log(this.currently_fetched_records_count)
					//pagination counters will be reset when we click on filters
					this.current_page ++;
					this.still_deciding_paging = true
					if (this.current_filter == 'follow') {
						this.get_paginated_qff()
					}else {
						this.get_paginated_featured()
					}
				},


				get_paginated_qff: function () {
					 $.getJSON(`/rff/${this.paginate}/${this.current_page}`, function(response) {
						  //this will not exists after first time...
								$(".spinner").remove()
						 this.still_deciding_paging = false
						 this.currently_fetched_records_count = 0
					        if (response[0]['id'] !== undefined) {
					        		this.currently_fetched_records_count = response.length
					        		this.questions.push(...response)

					        }
						 	//if this is empty even after .push?
						 	if (this.questions.length < 1)
						 		this.still_deciding_count = false
					      }.bind(this));
				},
		    		followed_questions: function() {
		    			this.reset()
		    			this.current_filter = 'follow'
		    			this.get_paginated_qff()

		    		},
		    		/** will be called only from load more links as well**/
		    		get_paginated_featured: function () {
		    			 $.getJSON(`/featuredr/${this.paginate}/${this.current_page}`, function(response) {

							
								

							  this.still_deciding_paging = false
		    				  this.currently_fetched_records_count = 0
		   		          if (response[0]['id'] !== undefined) {
		   		        	 	this.currently_fetched_records_count = response.length
		   		          	this.questions.push(...response)
		   		          }
		    				  if (this.questions.length < 1)
		    				 		this.still_deciding_count = false
		   		        }.bind(this));
		    		},

		    		/** will be called only from onclick..so to reset everything**/
		    		featured_questions: function() {
		    			this.reset()
		    			this.current_filter = 'everyone'
		    			this.get_paginated_featured()


		    		},



	      redirect: function(id) {
	        location.href = 'question/' + id
	      },






	    },
	    created: function() {


			
							


	  this.followed_questions()


    //   $.getJSON('/responses/json', function(response) {


    //     if (response[0]['id'] !== undefined)
    //       this.all_questions = response
    //       this.decide_questions()
	//   }.bind(this));

    },


  }

</script>
