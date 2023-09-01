const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  content: {type: String, required: true},
  place: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place'}
}, { timestamps: true });


module.exports = mongoose.model("Review", ReviewSchema);