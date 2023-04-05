var mongoose = require('mongoose');
timestamps = require('mongoose-timestamp')
var Schema = mongoose.Schema;

productSchema = new Schema( {
	empId:Number,
	name: String,
	gender: String,
	contact: Number,
	address: String,
	image: String,
	age: { type : String },
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
},{
	timestamps: true,
}),
product = mongoose.model('product', productSchema);

module.exports = product;