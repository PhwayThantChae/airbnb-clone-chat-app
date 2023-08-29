const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: {type: String, require: true, unique: true},
  name: String,
  email: {type: String, unique: true},
  password: String,
  userType: String,
  profileImg: String
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;