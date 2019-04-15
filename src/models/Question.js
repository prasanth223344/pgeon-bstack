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
      type: String,
      decrypted: true,
    },
    
    accepted_user: {
      type: String,
      decrypted: true,
    },
    
    expiring_at: {
      type: Number,
      decrypted: true,
    },

    last_event_fired: {
      type: String,
      decrypted: true,
    },

    manually_chosen_as_top: {
      type: String,
      decrypted: true,
    },
    
    hits: {
      type: Number,
      decrypted: true,
    },

    

    
  }

    

}
