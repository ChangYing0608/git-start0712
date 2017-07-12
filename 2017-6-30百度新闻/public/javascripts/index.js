;(function (win,doc){
	function changeSize(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*50+'px';
	}
	changeSize();
	win.addEventListener('resize',changeSize,false);
})(window,document);
$(document).ready(function(){

	$.ajax({
		url:'/load',
		type:'post',
		success:function(data){
			var arr=data;
			for(var i=0;i<arr.length;i++){
				var oLi=$('<li></li>');
				oLi.html('<a href="javascript:;" class="_'+(i+1)+'">'+arr[i].Name
					+'</a>');
				$('.newsTitList').append(oLi);
			}
			$('.newsTitList li:first-child').addClass('on');

			$.ajax({
				url:'/img',
				type:'post',
				success:function(data){
					var arr=data;
					for(var i=0;i<arr.length;i++){
						var oLi=$('<li></li>');
						oLi.html('<img src="/images/img'+(i+1)+'.jpg"><p>'
							+arr[i].Title+'</p>');
						$('.imgLists').append(oLi);
					};

				},
				error:function(err){
					console.log(err);
				}
			});
			$.ajax({
				url:'/default',
				type:'post',
				success:function(data){
					var arr=data;
					for(var i=0;i<arr.length;i++){
						var oLi=$('<li class="clearFix"></li>');
						var str=arr[i].Time;
						var y=str.split('-')[0];
						var m=str.split('-')[1];
						var d=str.split('-')[2].substring(0,2);
						var time=y+'-'+m+'-'+d;

						oLi.html('<div class="newsImg"><img src="'+arr[i].ImgSrc
							+'"></div><div class="newsCon"><p>'+arr[i].Title
							+'</p><span>'+time+'</span></div>');
						$('.newsListWrap').append(oLi);
					}
				},
				error:function(err){
					console.log(err);
				}
			});
			$('.newsTitList li a').on('click',function(){
				$('.newsTitList li').attr('class','');
				var SignId=$(this).attr('class').substring(1);
				$(this).parent().addClass('on');
				$.ajax({
					url:'/getNews',
					type:'post',
					data:{SignId:SignId},
					success:function(data){
						var arr=data;
						$('.newsListWrap').html('');
						for(var i=0;i<arr.length;i++){
							var oLi=$('<li class="clearFix"></li>');
							var str=arr[i].Time;
							var y=str.split('-')[0];
							var m=str.split('-')[1];
							var d=str.split('-')[2].substring(0,2);
							var time=y+'-'+m+'-'+d;

							oLi.html('<div class="newsImg"><img src="'+arr[i].ImgSrc
								+'"></div><div class="newsCon"><p>'+arr[i].Title
								+'</p><span>'+time+'</span></div>');
							$('.newsListWrap').append(oLi);
						}
					},
					error:function(err){
						console.log(err);
					}
				})

				$('.newsListWrap')

			});
		},
		error:function(err){
			console.log(err);
		}
	});
	// 轮播图
	var imgUl=document.querySelector('.imgLists');
	var imgLi=imgUl.children;
	var x=0
	var iNow=0;
	imgUl.addEventListener('touchstart',function(ev){
		var oldX=ev.targetTouches[0].pageX-x;
		var downX=ev.targetTouches[0].pageX;
		function fnMove(ev){
			x=ev.targetTouches[0].pageX-oldX;
			imgUl.style.left=x/50+'rem';
		}
		function fnEnd(ev){
			document.removeEventListener('touchmove',fnMove,false);
			document.removeEventListener('touchend',fnEnd,false);
			var upX=ev.changedTouches[0].pageX;
			if(Math.abs(upX-downX)>20){
				if(downX>upX){
					iNow++;
					if(iNow==imgLi.length){
						// iNow=imgLi.length-1
						var oLi=imgUl.children[0];
						imgUl.appendChild(oLi);
						iNow=imgLi.length-1;
					}
				}else{
					iNow--;
					if(iNow==-1){
						var oLi=imgUl.children[2];
						imgUl.insertBefore(oLi,imgUl.children[0]);
						iNow=0;
					}
				}
			}
			x=-iNow*imgLi[0].offsetWidth;
			imgUl.style.left=x/58.5+'rem';
		}
		document.addEventListener('touchmove',fnMove,false);
		document.addEventListener('touchend',fnEnd,false);
	},false);
	// 拖拽
	var newsUl=document.querySelector('.newsTitList');
	var newsLi=newsUl.children;
	newsUl.addEventListener('touchstart',function(ev){
		var oldX=ev.targetTouches[0].pageX-x;
		var downX=ev.targetTouches[0].pageX;
		function fnMove(ev){
			x=ev.targetTouches[0].pageX-oldX;
			if(x>0){x=0;}
			else if(x<-558){x=-558;}
			newsUl.style.left=x/50+'rem';
		}
		function fnEnd(ev){
			document.removeEventListener('touchmove',fnMove,false);
			document.removeEventListener('touchend',fnEnd,false);
		}
		document.addEventListener('touchmove',fnMove,false);
		document.addEventListener('touchend',fnEnd,false);
	},false);
});