var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	user_id: Number,
	username: String,
	password: String,
	email: String,
	no_telp: Number,
	date_birth: Date,
	jenis_kelamin: String,
	alamat: String,
	negara: String
});

var User = mongoose.model('User', UserSchema);
module.exports.User=User;