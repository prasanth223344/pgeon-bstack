import { Model } from 'radiks';

export default class Following extends Model {
  static className = 'Following'

  static schema = {
  
    user_id: {
      type: String,
      decrypted: true,
    },

    user_id: {
      type: String,
      decrypted: true,
    },

    followed_by: {
      type: String,
      decrypted: true,
    },
       

    
  }

  

}
