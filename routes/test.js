var express = require('express');
var test =  require('../models/test');
var router = express.Router();

router.post('/', function (req, res){
  var tes = new test();

  tes.nama = req.body.nama;

  tes.save(function(err){
  	if (err)
  		res.send('tenan e!!');

  	res.json({message:'Sukses!'});

  });

});