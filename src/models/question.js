import { Model } from 'radiks';

export default class Question extends Model {
  static className = 'Question'

  static schema = {
    question: {
      type: String,
      decrypted: true,

    },
    user_id: {
      type: String,
      decrypted: true,
    },

    accepted_answer: {
      type: Number,
      decrypted: true,
    },
    
    expiring_at: {
      type: Number,
      decrypted: true,
    },

    

    
  }

  

}
