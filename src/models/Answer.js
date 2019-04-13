import { Model } from 'radiks';

export default class Answer extends Model {
  static className = 'Answer'

  static schema = {
    answer: {
      type: String,
      decrypted: true,

    },
    user_id: {
      type: String,
      decrypted: true,
    },

    question_id: {
      type: String,
      decrypted: true,
    },

    manually_chosen_as_top: {
      type: Number,
      decrypted: true,
    },


  }



}


