import { Model } from 'radiks';

export default class Vote extends Model {
  static className = 'Vote'

  static schema = {
  
    user_id: {
      type: String,
      decrypted: true,
    },

    answer_id: {
      type: String,
      decrypted: true,
    },

    question_id: {
      type: String,
      decrypted: true,
    },
    
    vote: {
      type: Number,
      decrypted: true,
    },

    deleted: {
      type: Boolean,
      decrypted: true,
    }



    
  }

  static defaults = {
    deleted: false
  }

  

}
