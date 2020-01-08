const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grailSchema = new mongoose.Schema(
  {
    grail: {
      type: String,
      required: true,
      // validate: {
      //   validator: function(v, cb) {
      //     User.find({name: v}, function(err, docs){
      //        cb(docs.length === 0);
      //     });
      //   },
      //   message: 'Enter Grail'
      // }
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Grail', grailSchema);

