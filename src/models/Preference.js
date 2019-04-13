import { Model } from 'radiks';

export default class Preference extends Model {
  static className = 'Preference'

  static schema = {
    
    user_id: {
      type: String,
      decrypted: true,
    },

    someone_i_followed_posted: {
      type: Boolean,
      decrypted: true,
    },

    my_response_selected: {
      type: Boolean,
      decrypted: true,
    },
    subscribed_to_newsletter: {
      type: Boolean,
      decrypted: true,
    },
    my_response_got_points: {
      type: Boolean,
      decrypted: true,
    },
      
    
  }
  

}


