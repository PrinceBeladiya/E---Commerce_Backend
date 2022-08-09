const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthSchema = new Schema({
  Firstname: {
    type: String,
    require: true,
  },
  Lastname: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Mobile: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
});

const AuthTable = mongoose.model('User_Details', AuthSchema);
module.exports = AuthTable;
