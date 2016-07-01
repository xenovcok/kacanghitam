var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	post_id: Number,
	title: String,
	article: String,
	author_id: Number,
	date_published: { type: Date, default: Date.now },
	featured: Boolean,
	comment_enabled: Boolean,
	views: Number
});

var Post = mongoose.model('Post', PostSchema);
module.exports.Post=Post;