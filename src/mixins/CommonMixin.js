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
		
		format1000tok: function (n,d){
					if(n<0) return 0;
					if(n<1000) return n;
					var x=(''+n).length,p=Math.pow,d=p(10,d)
					x-=x%3
					return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]}
	    
    }

};