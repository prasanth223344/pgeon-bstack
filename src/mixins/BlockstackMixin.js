
export var BlockstackMixin = {

 
		data () {
			return {
				blockstack: window.blockstack,
				current_user: null,
				profile: null
				
			}
		},

    created: function() {
  
			if (this.blockstack.isUserSignedIn()) {
      	var userData = blockstack.loadUserData()
				var profile = new blockstack.Person(userData.profile)
				this.current_user = userData
				this.current_profile = profile
				this.profile_pic = this.current_profile.avatarUrl()

			}

    },
    
      methods: {

			
	    
    }

};