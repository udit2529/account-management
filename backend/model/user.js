var mongoose = require('mongoose');
timestamps = require('mongoose-timestamp')
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	password: String,
	email: String,
	
},{
	timestamps: true,
}),
user = mongoose.model('user', userSchema);

module.exports = user;