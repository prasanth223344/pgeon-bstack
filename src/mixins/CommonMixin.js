export var CommonMixin = {

   

    created: function() {
    },
    
      methods: {
    	  	addResponseFocus: function (e) {
    	  		 $(e.target).addClass("active-response-container")
  		},
  		removeResponseFocus: function (e) {
	  		 $(e.target).hasClass("active-response-container") && $(e.target).removeClass("active-response-container") 
		},
  	
	    
    }

};