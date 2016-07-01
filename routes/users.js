var User = require('../models/users').User;

module.exports=function(app){

    app.get('/admin/users', function(req, res) {
        res.render('users/index');
    });

    app.get('/admin/users/new', function(req, res) {
        res.render('users/add');
    });

    app.post('/admin/users', function(req, res) {

        var users = new User();      // create a new instance of the Bear model
        users.username = req.body.username;  // set the bears name (comes from the request)
        users.password = req.body.password;
        users.email = req.body.email;

        // save the bear and check for errors
        users.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
        
    });

}