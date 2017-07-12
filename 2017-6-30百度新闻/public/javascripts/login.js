$(document).ready(function(){
	var i=5;
	var timer=setInterval(function(){
		var str='距离返回主页还有'+i+'秒......';
		$('div').html(str);
		i--;
		if(i==-1){clearInterval(timer);location.href='http://localhost:3000/';}
	},1000);
});