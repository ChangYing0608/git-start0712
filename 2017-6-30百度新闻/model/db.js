//引入mysql模块
var mySql = require('mysql');
//创建数据库连接
var con=mySql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	database:'baidudb'
});

// con.prototype.insert = function(tabName) {
// 	var sql='insert into'+tabName+'';
// };
// con.prototype.select = function(tabName){

// }
// con.prototype.selectAll=function(tabName){
// 	console.log(tabname);
// 	var sql='select * from'+tabName;
// 	var resultsList;
// 	con.query(sql,function(error,results){
// 		if(error)throw error;
// 		resultsList=results;
// 	})
// 	return resultsList;
// }
// con.prototype.update = function(tabName){

// }
// con.prototype.delete = function(tabName){

// }
// INSERT INTO t_news(Title, Article, ImgSrc, Source, SignId) VALUES ('为省路费翻墙扒火车 90后男子翻进派出所','　　中新网西安7月3日电 (记者 田进 通讯员 郝黎俊)西铁警方3日透露，为省几百元车费，90后男子打算扒乘火车回家，然而在翻墙时却翻进了安康白河东站派出所的院墙，被值班民警抓个正着。','/images/sh1.jpg','百度','6');
module.exports = con;
