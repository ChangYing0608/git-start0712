var express = require('express');
var router = express.Router();
var con = require('../model/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/load',function(req,res,next){
	var sql='select * from t_sign';
	con.query(sql,function(err,results){
		if(err)throw err;
		console.log(results);
		res.send(results);
	});
});
router.post('/img',function(req,res,next){
	var sql='select * from t_news where SignId=4';
	con.query(sql,function(err,results){
		if(err)throw err;
		console.log(results);
		res.send(results);
	});
});
router.post('/default',function(req,res,next){
	var sql='select * from t_news where SignId=1';
	con.query(sql,function(err,results){
		if(err)throw err;
		console.log(results);
		res.send(results);
	});
});
router.post('/getNews',function(req,res,next){
	var SignId=req.body.SignId;
	var sql='select * from t_news where SignId='+SignId;
	con.query(sql,function(err,results){
		if(err)throw err;
		console.log(results);
		res.send(results);
	});
});
module.exports = router;
