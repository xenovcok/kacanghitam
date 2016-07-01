var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema({
	nama: String
});

module.exports = mongoose.model('test', TestSchema);