const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  comment: {type: String, required: true}
}, { timestamps: true });

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;