var Post = require('../models/posts').Post;

module.exports = function(app) {

	app.get('/admin/post', function(req, res){
		res.render('post/index');
	});

	app.get('/admin/post/new', function(req, res){
		res.render('post/new');
	});

	app.post('/admin/post/new', function(req, res){
		var post = new Post();

		post.title = req.body.title;
		post.article = req.body.content;
		post.featured = req.body.featured;
		post.author_id = req.body.author_id;
		post.comment_enabled = req.body.e_comment;

		post.save(function(err){
			if(err)
				res.send(err);

			res.redirect('/admin/post/list');
		});
	});

	app.get('/admin/post/list', function(req, res){
		Post.find({}, function(err, post){
			if (err) throw err;
			console.log('data retreived');

			res.render('post/list', {data:post});

		});

	});

	app.get('/admin/post/category', function(req, res){
		res.render('post/category');
	});

}