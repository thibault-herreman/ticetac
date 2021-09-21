var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
   name: String,
   firstname: String,
   email: String,
   password: String,
   journeyId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journeys'}]
});
module.exports = mongoose.model('users', userSchema);
