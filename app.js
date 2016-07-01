const env          = process.env;

var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var Cookies = require('cookies');
var mongoose =  require('mongoose');
var express = require('express');
var config = require('./config');

var app = express();   

var jwt = require('jsonwebtoken');
var User = require('./models/users');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));


//var routes = require('./routes/index');
//var users = require('./routes/users'); 

app.set('view engine', 'pug');
app.set('views', './views');

var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '8080';

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/kacanghitam';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	process.env.OPENSHIFT_APP_NAME;
}

app.set('superSecret', config.secret);

mongoose.connect(connection_string);

require("./routes/index")(app);

app.post('/authenticate', function(req, res) {

  // find the user
  mongoose.model('User').findOne({name:req.body.username}, function(err, user) {

  	if (err) throw err;

  	if (!user) {
  		res.json({ success: false, message: 'Authentication failed. User not found.' });
  	} else if (user) {

      // check if password matches
      if (user.password != req.body.pass) {
      	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
        	expiresIn : "1h"
        });

        // return the information including token as JSON
        res.json({
        	success: true,
        	message: 'Enjoy your token!',
        	token: token
        });

    } 

    /*
    new Cookies(req,res).set('access_token',token,{
    	httpOnly: true,
        secure: true      // for your production environment
    });
    */

}

});
});

app.use(function(req, res, next) {

  console.log(token);
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || token;
  console.log(token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    	if (err) {
    		return res.json({ success: false, message: 'Failed to authenticate token.' });    
    	} else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
    }
});

} else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
    	success: false, 
    	message: 'No token provided.' 
    });
    
}
});

require("./routes/users")(app);
require("./routes/post")(app);

app.use(function(req, res, next) {
	res.render('404');
});

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  	console.log(`Application worker ${process.pid} started...`);
  });
