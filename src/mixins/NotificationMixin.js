
export var NotificationMixin = {

 
		data () {
			return {

				notif_count: 0,
				
			}
		},

    created: async function() {
		
		if(this.current_user) {

			var response = await axios.get(
				`${process.env.RADIKS_SERVER}/notification/unseen/${this.current_user.username}`
			  );
			  this.notif_count = response.data.count
		
		}
		
    

    },
    
     

};