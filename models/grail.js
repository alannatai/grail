const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grailSchema = new mongoose.Schema(
  {
    grail: {
      type: String,
      required: true
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Grail', grailSchema);

