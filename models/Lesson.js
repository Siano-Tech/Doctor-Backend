const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  lessonId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number
  },
  showService: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('lesson', LessonSchema);
