$(document).ready(function(){
	//创建后台下拉列表
	var arr=['推荐','百家','本地','图片','娱乐','社会','军事','互联网','科技','女人','搞笑','生活','国际','国内','体育'];
	for(var i=0;i<arr.length;i++){
		$('#newSign').append($('<option value='+(i+1)+'>'+arr[i]+'</option>'));
	};

	//登录
	$('#username').on('blur',function(){
		if($('#username').val()==''){$('#username').parent().addClass('has-error');}
		else{$('#newName').parent().removeClass('has-error');}
	});
	$('#pwd').on('blur',function(){
		if($('#pwd').val()==''){$('#pwd').parent().addClass('has-error');}
		else{$('#pwd').parent().removeClass('has-error');}
	});
	$('.log-btn').on('click',function(){
		var username=$('#username').val();
		var pwd=$('#pwd').val();
		if(username!=''&&pwd!=''){
			$.ajax({
				url:'/users/Name',
				type:'post',
				data:{Name:username,Password:pwd},
				success:function(data){
					if(data=='ok'){
						
						$('.fr').css('display','none');
						$('<div class="logOk"></div>').html(username+' 欢迎您！ '
							+'<button id="exit" type="button" class="btn btn-default" data-toggle="modal data-target="#myExit>退出</button>')
					}
					else{
						alert(data);
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	})

	$.ajax({
		url:'/admin/all',
		type:'get',
		success:function(data){
			var arr=data;
			for(var i=0;i<arr.length;i++){
				var oLi=$('<li></li>');
				var str=arr[i].Time;
				var date=str.split('T')[0];
				var hh=str.split('T')[1].substring(0,2);
				var num=str.split('T')[1].substring(2,8);
				hh=parseInt(hh)+8;
				var time=date+' '+hh+num;
				oLi.html('<div class="Id">'+arr[i].Id
					+'</div><div class="Title">'+arr[i].Title
					+'</div><div class="Time">'+time
					+'</div><button type="button" class="del-btn btn btn-danger" data-toggle="modal" data-target="#myDelete">删除</button>');
				$('.newsList').append(oLi);
			};
		},
		error:function(err){
			console.log(err);
		}
	})
	//后台提交按钮点击事件
	var id;
	$('#newName').on('blur',function(){
		if($('#newName').val()==''){$('#newName').parent().addClass('has-error');}
		else{$('#newName').parent().removeClass('has-error');}
	});
	$('#newCon').on('blur',function(){
		if($('#newCon').val()==''){$('#newCon').parent().addClass('has-error');}
		else{$('#newCon').parent().removeClass('has-error');}
	});
	$('#newSource').on('blur',function(){
		if($('#newSource').val()==''){$('#newSource').parent().addClass('has-error');}
		else{$('#newSource').parent().removeClass('has-error');}
	});
	$('#sub').on('click',function(ev){
		ev.stopPropagation();
		if($('#newName').val()!=''&&$('#newCon').val()!=''&&$('#newSource').val()!=''){
			$('#myInsert').modal('show');
		}
	});
	$('#btn').on('click',function(ev){
		var title=$('#newName').val();
		var article=$('#newCon').val();
		var imgSrc=$('#newSrc').val();
		var source=$('#newSource').val();
		var time=$('#newDate').val();
		var signId=$('select').val();
		if(id&&$('#sub').html()=='修改'){
			$.ajax({
				url:'/admin/update',
			 	type:'post',
			 	data:{
			 			Id:id,
						Title:title,
						Article:article,
						ImgSrc:imgSrc,
						Source:source,
						Time:time,
						SignId:signId
					},
			 	success:function(data){
			 		if(data){
			 			alert(data);
			 			$.ajax({
							url:'/admin/all',
							type:'get',
							success:function(data){
								var arr=data;
								$('.newsList').children().remove();
								for(var i=0;i<arr.length;i++){
									var oLi=$('<li></li>');
									var str=arr[i].Time;
									var date=str.split('T')[0];
									var num=str.split('T')[1].substring(0,8);
									var time=date+' '+num;
									oLi.html('<div class="Id">'+arr[i].Id
										+'</div><div class="Title">'+arr[i].Title
										+'</div><div class="Time">'+time
										+'</div><button type="button" class="del-btn btn btn-danger" data-toggle="modal" data-target="#myDelete">删除</button>');
									$('.newsList').append(oLi);
								}
							},
							error:function(err){
								console.log(err);
							}
						});
			 		};
			 		$('#newName').val('');
					$('#newCon').val('');
					$('#newSrc').val('');
					$('#newSource').val('');
					$('#newDate').val('');
					$('select').val('');
					$('#sub').html('提交');
					$('#myInsertBody').html('确定要插入吗？');
					id=null;
			 	},
			 	error:function(err){
			 		console.log(err);
			 	}
			});
		}else{
			$.ajax({
				url:'/admin/insert',
			 	type:'post',
			 	data:{
						Title:title,
						Article:article,
						ImgSrc:imgSrc,
						Source:source,
						Time:time,
						SignId:signId
					},
			 	success:function(data){
			 		if(data){
			 			alert(data);
			 			$.ajax({
							url:'/admin/all',
							type:'get',
							success:function(data){
								var arr=data;
								$('.newsList').children().remove();
								for(var i=0;i<arr.length;i++){
									var oLi=$('<li></li>');
									var str=arr[i].Time;
									var date=str.split('T')[0];
									var num=str.split('T')[1].substring(0,8);
									var time=date+' '+num;
									oLi.html('<div class="Id">'+arr[i].Id
										+'</div><div class="Title">'+arr[i].Title
										+'</div><div class="Time">'+time
										+'</div><button type="button" class="del-btn btn btn-danger" data-toggle="modal" data-target="#myDelete">删除</button>');
									$('.newsList').append(oLi);
								}
							},
							error:function(err){
								console.log(err);
							}
						});
			 		};
			 		$('#newName').val('');
					$('#newCon').val('');
					$('#newSrc').val('');
					$('#newSource').val('');
					$('#newDate').val('');
					$('select').val('');
			 	},
			 	error:function(err){
			 		console.log(err);
			 	}
			});
		}
	});
	$('#clear-btn').on('click',function(){
		$('#sub').html('提交');
		$('#newName').val('');
		$('#newCon').val('');
		$('#newSrc').val('');
		$('#newSource').val('');
		$('#newDate').val('');
		$('select').val('');
		id=undefined;
	})
	$('.newsList').on('click','li',function(){
		var Id=$(this).children().eq(0).html();
		id=Id;
		$('#sub').html('修改');
		$('#myInsertBody').html('确定要修改吗？');
		$.ajax({
			url:'/admin/select',
			type:'post',
			data:{Id:Id},
			success:function(data){
				var str=data[0].Time;
				var date=str.split('T')[0];
				var hh=str.split('T')[1].substring(0,2);
				var num=str.split('T')[1].substring(2,8);
				hh=parseInt(hh)+8;
				var time=date+' '+hh+num;
				$('#newName').val(data[0].Title);
				$('#newCon').val(data[0].Article);
				$('#newSrc').val(data[0].ImgSrc);
				$('#newSource').val(data[0].Source);
				$('#newDate').val(time);
				$('select').val(data[0].SignId);
			},
			error:function(err){
				console.log(err);
			}
		});
	});
	$('.newsList').on('click','button[class*="del-btn"]',function(ev){
		ev.stopPropagation();
		var Id=$(this).parent().children().eq(0).html();
		$('#myDelete').modal('show');
		$('.del-sure').on('click',function(){
			$.ajax({
				url:'/admin/delete',
				type:'post',
				data:{Id:Id},
				success:function(data){
					if(data){
			 			alert(data);
			 			$.ajax({
							url:'/admin/all',
							type:'get',
							success:function(data){
								var arr=data;
								$('.newsList').children().remove();
								for(var i=0;i<arr.length;i++){
									var oLi=$('<li></li>');
									var str=arr[i].Time;
									var date=str.split('T')[0];
									var num=str.split('T')[1].substring(0,8);
									var time=date+' '+num;
									oLi.html('<div class="Id">'+arr[i].Id
										+'</div><div class="Title">'+arr[i].Title
										+'</div><div class="Time">'+time
										+'</div><button type="button" class="del-btn btn btn-danger" data-toggle="modal" data-target="#myDelete">删除</button>');
									$('.newsList').append(oLi);
								}
							},
							error:function(err){
								console.log(err);
							}
						});
			 		}
				},
				error:function(err){
					console.log(err);
				}
			});
		});
	});
});