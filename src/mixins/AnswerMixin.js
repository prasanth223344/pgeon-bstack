export var AnswerMixin = {

    data: {
        topAnswers: [],
        topResponders: [],
		selected_user: null,
		makaka: "dfdf"
    },

    created: function() {
  
       // this.logged_user = JSON.parse(this.logged_user);
    },
    
      methods: {
	    getTopAnswers: function () {
	    		if(this.selected_user) {
				$.getJSON(`/user/${this.selected_user}/topanswers`, function(response) {
     				this.topAnswers = response
   				}.bind(this));	    			
  			}
	    		
	    		
	    		
	    },
	    setUserAndGetTopAnswer:function (user_id) {
	    		this.selected_user = user_id
	    		this.getTopAnswers()
	    },
	    resetTopAnswers: function(user_id) {
	    		this.selected_user=user_id
	    		this.clearVals()
	    },
	    
	    clearVals: function () {
		    	this.topAnswers = []
	    		this.topResponders = []
	    },
	    
	    showAllResponders: function (user_id){
	    	$.getJSON(`/user/${user_id}/topresponders`, function(response) {
 				this.topResponders = response
				}.bind(this));
	    },
    }

};