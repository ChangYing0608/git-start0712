var express = require('express');
var router = express.Router();
var con = require('../model/db.js');

router.get('/',function(req,res,next){
	res.render('admin');
});

router.get('/all', function(req, res, next) {
	var sql='select * from t_news order by Id desc';
	con.query(sql,function(err,results){
		if(err)throw err;
		console.log(results);
		res.send(results);
	});
});

router.post('/select',function(req,res,next){
	var str=req.body.Id;
	var sql='select * from t_news where Id='+str;
	con.query(sql,function(err,results){
		if(err)throw err;
		if(results){
			res.send(results);
		};
	});

});
router.post('/insert',function(req,res,next){
	var Title=req.body.Title;
	var Article=req.body.Article;
	var ImgSrc=req.body.ImgSrc;
	var Source=req.body.Source;
	var Time=req.body.Time;
	var SignId=req.body.SignId;
	if(Time==''){
		var sql='insert into t_news(Title,Article,ImgSrc,Source,SignId) values(?,?,?,?,?)';
		con.query(sql,[Title,Article,ImgSrc,Source,SignId],function(err,results){
			if(err)throw err;
			if(results.insertId){
				res.send('成功插入一条数据');
			}
		});
	}
	else{
		var sql='insert into t_news(Title,Article,ImgSrc,Source,Time,SignId) values(?,?,?,?,?,?)';
		con.query(sql,[Title,Article,ImgSrc,Source,Time,SignId],function(err,results){
			if(err)throw err;
			if(results.insertId){
				res.send('成功插入一条数据');
			}
		});
	}

});
router.post('/update',function(req,res,next){
	var Id=req.body.Id;
	var Title=req.body.Title;
	var Article=req.body.Article;
	var ImgSrc=req.body.ImgSrc;
	var Source=req.body.Source;
	var Time=req.body.Time;
	var SignId=req.body.SignId;

	var sql='update t_news set Title=?,Article=?,ImgSrc=?,Source=?,Time=?,SignId=? where Id=?';
	con.query(sql,[Title,Article,ImgSrc,Source,Time,SignId,Id],function(err,results){
		if(err)throw err;
		if(results.affectedRows!='0'){
			res.send('成功修改一条数据');
		}
	});

});
router.post('/delete',function(req,res,next){
	var str=req.body.Id;
	var sql='delete from t_news where Id='+str;
	con.query(sql,function(err,results){
		if(err)throw err;
		if(results.affectedRows!='0'){
			res.send('成功删除一条数据');
		}
	});
});
module.exports = router;