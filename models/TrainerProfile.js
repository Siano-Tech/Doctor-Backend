const mongoose = require('mongoose');

const TrainerProfileSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  // company: {
  //   type: String
  // },
  // website: {
  //   type: String
  // },
  // location: {
  //   type: String
  // },
  // status: {
  //   type: String,
  //   required: true
  // },
  // skills: {
  //   type: [String],
  //   required: true
  // },
  // bio: {
  //   type: String
  // },
  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true
  //     },
  //     company: {
  //       type: String,
  //       required: true
  //     },
  //     location: {
  //       type: String
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
  // social: {
  //   youtube: {
  //     type: String
  //   },
  //   twitter: {
  //     type: String
  //   },
  //   facebook: {
  //     type: String
  //   },
  //   linkedin: {
  //     type: String
  //   },
  //   instagram: {
  //     type: String
  //   }
  // },
  trainerId: {
    type: Number
  },
  name: {
    type: String
  },
  location: {
    type: String
  },
  ratings: {
    type: String
  },
  description: {
    type: String
  },
  experience: {
    type: String
  },
  about: {
    type: String
  },
  socialLinks: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedIn: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('trainerProfile', TrainerProfileSchema);
