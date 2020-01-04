const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    grails: [{ type: Schema.Types.ObjectId, ref: 'Grail' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);

