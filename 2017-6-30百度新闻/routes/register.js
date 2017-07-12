var express = require('express');
var router = express.Router();
var con = require('../model/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/insert',function(req,res,next){
	var Name=req.body.Name;
	var Phone=req.body.Phone;
	var Email=req.body.Email;
	var sql1='select * from t_users where Name='+'"'+Name+'"';
	var sql2='select * from t_users where Phone='+Phone;
	var sql3='select * from t_users where Email='+'"'+Email+'"';
	con.query(sql1,function(err,results){
		if(err)throw err;
		console.log(results);
		if(results==''){
			con.query(sql2,function(err,results){
				console.log(results);
				if(err)throw err;
				if(results==''){
					con.query(sql3,function(err,results){
						console.log(results);
						if(err)throw err;
						if(results==''){
							var Password=req.body.Password;
							var sql4='insert into t_users(Name,Password,Phone,Email) values(?,?,?,?)';
							con.query(sql4,[Name,Password,Phone,Email],function(err,results){
								console.log(results);
								if(err)throw err;
								res.send('ok');
							});
						}
						else{
							res.send('邮箱已被注册');
						}
					});
				}
				else{
					res.send('手机号已被注册');
				}
			});
		}
		else{
			res.send('用户名已被注册');
		}
	});
});

module.exports = router;