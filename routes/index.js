var User = require('../models/users').User;

function aut(req,res,next){
	var user = new User();

}

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('theme-layout');
	});

	app.get('/admin', function(req, res){
		
	});

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.post('/login', function(req, res){
		var user = new User();
		var usern = req.body.username;
		User.find({ username: usern }, function(err, user) {
			if (err) throw err;

			console.log(user);
		});
	});

	app.get('/logout', function(req, res){
		delete req.session.user_id;
		res.redirect('/login');
	});

}