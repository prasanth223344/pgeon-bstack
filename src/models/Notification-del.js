import { Model } from 'radiks';

export default class Notification extends Model {
  static className = 'Notification'

  static schema = {
  
    target_user: {
      type: String,
      decrypted: true,
    },
    created_by: {
      type: String,
      decrypted: true,
    },
    seen: {
      type: Boolean,
      decrypted: true,
    },

    type: {
      type: String,
      decrypted: true,
    },

    question_id: {
      type: String,
      decrypted: true,
    },
  
    bulk_deleted: {
      type: Boolean,
      decrypted: true,
    },


  }


}


