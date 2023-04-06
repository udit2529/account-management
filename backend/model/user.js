var mongoose = require('mongoose');
timestamps = require('mongoose-timestamp')
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

userSchema = new Schema( {
	username: String,
	password: String,
	email: String,
	
},{
	timestamps: true,
});
userSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
  });
  
  // static method to login user
  userSchema.statics.login = async function(email, password) {
	const user = await this.findOne({ email });
	if (user) {
	  const auth = await bcrypt.compare(password, user.password);
	  if (auth) {
		return user;
	  }
	  throw Error('incorrect password');
	}
	throw Error('incorrect email');
  };
user = mongoose.model('user', userSchema);

module.exports = user;