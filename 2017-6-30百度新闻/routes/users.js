var express = require('express');
var router = express.Router();
var con = require('../model/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/ok', function(req, res, next) {
  res.render('ok');
});

router.post('/Name',function(req, res, next){
	var Name=req.body.Name;
	var PW=req.body.Password;
	var sql='select * from t_users where Name='+'"'+Name+'"';
	con.query(sql,function(err,results){
		if(err)throw err;
		if (results.length ==0 ) {
			res.send('您的用户名或者密码错误!');
		}else{
			if(results[0].Name==Name&&results[0].Password==PW){
				res.send('ok');
			}else{
				res.send('您的用户名或者密码错误!');
			}
		};
	})
});
router.post('/Name/r',function(req, res, next){
	var Name=req.body.Name;
	var sql='select * from t_users where Name='+'"'+Name+'"';
	con.query(sql,function(err,results){
		if(err)throw err;
		if (results.length ==0 ) {
			res.send('ok');
		}else{
			res.send('用户名已注册，请选择登录');
		};
	})
});

router.post('/Phone',function(req, res, next){
	var Phone=req.body.Phone;
	var PW=req.body.Password;
	var sql='select * from t_users where Phone='+'"'+Phone+'"';
	con.query(sql,function(err,results){
		if(err)throw err;
		if (results.length ==0 ) {
			res.send('您的手机号或者密码错误!')
		}else{
			if(results[0].Phone==Phone&&results[0].Password==PW){
				res.send('ok');
			}else{
				res.send('您的手机号或者密码错误!');
			}
		};
	});
});
router.post('/Phone/r',function(req, res, next){
	var Phone=req.body.Phone;
	var sql='select * from t_users where Phone='+'"'+Phone+'"';
	con.query(sql,function(err,results){
		if(err)throw err;
		if (results.length ==0 ) {
			res.send('ok')
		}else{
			res.send('手机号已注册，请选择登录');
		};
	});
});

router.post('/Email',function(req, res, next){
	var Email=req.body.Email;
	var PW=req.body.Password;
	var sql='select * from t_users where Email='+'"'+Email+'"';
	con.query(sql,function(err,results){
		if(err)throw err;
		if (results.length ==0 ) {
			res.send('您的邮箱或者密码错误!')
		}else{
			if(results[0].Email==Email&&results[0].Password==PW){
				res.send('ok');
			}else{
				res.send('您的邮箱或者密码错误!');
			}
		};
	})
});
router.post('/Email/r',function(req, res, next){
	var Email=req.body.Email;
	var sql='select * from t_users where Email='+'"'+Email+'"';
	con.query(sql,function(err,results){
		if(err)throw err;
		if (results.length ==0 ) {
			res.send('ok')
		}else{
			res.send('邮箱号已注册，请选择登录');
		};
	})
});

module.exports = router;
