const mongoose = require('mongoose');

var FlightModelSchema = new Schema({
    title: String,
    time: Date,
    price: Number,
    date: Date
  });
  

  exports.Flight= mongoose.model('flight', FlightModelSchema);