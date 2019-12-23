const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Mongoose is connected  ${process.env.DATABASE_URL}`);
});
