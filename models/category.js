const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    grails: [{ type: Schema.Types.ObjectId, ref: 'Grail' }]
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('Category', categorySchema);

