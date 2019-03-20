
import Following from "../models/Following";

export var FollowMixin = {

 
		data () {
			return {
				
			}
		},

    created: function() {
  
		

    },
    
      methods: {
				
				follow: async function (id) {

					const follow = new Following({
						user_id: id,
						followed_by: this.current_user.username
		
					});
					await follow.save();
					

					
				}
			
	    
    }

};