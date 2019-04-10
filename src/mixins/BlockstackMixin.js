
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

				loadProfilePic: async function(user_id, target) {
					var pf = await this.blockstack.lookupProfile(user_id);
					target
						.filter(o => o.user_id === user_id)
						.forEach(o => {
							if (
								pf &&
								typeof pf.image !== "undefined" &&
								pf.image[0]["contentUrl"]
							) {
								o.profile_pic = pf.image[0]["contentUrl"];
							}
						});
				},


				loadIndivProfilePic: async function(user_id) {
					var pf = await this.blockstack.lookupProfile(user_id);
							if (
								pf &&
								typeof pf.image !== "undefined" &&
								pf.image[0]["contentUrl"]
							) {
								console.log(pf.image[0]["contentUrl"]);
								
								return pf.image[0]["contentUrl"];
							}

							return null;
				}
				
	    
    }

};