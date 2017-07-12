;(function (win,doc){
	function changeSize(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*50+'px';
	}
	changeSize();
	win.addEventListener('resize',changeSize,false);
})(window,document);
;(function (win,doc){
	function changeSize(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*50+'px';
	}
	changeSize();
	win.addEventListener('resize',changeSize,false);
})(window,document);
$(document).ready(function(){
	$('#username').on('input',function(){
		$('#txtDT').css('display','block');
		$('#txtDT').on('click',function(){
			$('#username').val('');
			$(this).css('display','none');
		});
		if($(this).val()==''){
			$('#txtDT').css('display','none');
		}
	});
	$('#username').on('blur',function(){
		var username=$('#username').val();
		var userRe=/^[a-zA-Z]\w{6,12}$/;
		if(!userRe.test(username)){alert('请输入6到12位以字母开头的用户名');}
		else{
			$.ajax({
				url:'/users/Name/r',
				type:'post',
				data:{Name:username},
				success:function(data){
					if(data=='ok'){
						$('#reOkName').css('display','block');
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
	});
	$('#phone').on('input',function(){
		$('#phoneDT').css('display','block');
		$('#phoneDT').on('click',function(){
			$('#phone').val('');
			$(this).css('display','none');
		});
		if($(this).val()==''){
			$('#phoneDT').css('display','none');
		}
	});
	$('#phone').on('blur',function(){
		var phone=$('#phone').val();
		var phRe=/^1\d{10}$/;
		if(!phRe.test(phone)){alert('请输入正确的手机号');}
		else{
			$.ajax({
				url:'/users/Phone/r',
				type:'post',
				data:{Phone:phone},
				success:function(data){
					if(data=='ok'){
						$('#reOkPhone').css('display','block');
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
	});
	$('#email').on('input',function(){
		$('#emailDT').css('display','block');
		$('#emailDT').on('click',function(){
			$('#email').val('');
			$(this).css('display','none');
		});
		if($(this).val()==''){
			$('#emailDT').css('display','none');
		}
	});
	$('#email').on('blur',function(){
		var email=$('#email').val();
		var emRe=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		if(!emRe.test(email)){alert('请输入正确的邮箱号');}
		else{
			$.ajax({
				url:'/users/Email/r',
				type:'post',
				data:{Email:email},
				success:function(data){
					if(data=='ok'){
						$('#reOkEmail').css('display','block');
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
	});
	$('#pw').on('input',function(){
		$('#pwDT').css('display','block');
		$('#pwDT').on('click',function(){
			$('#pw').val('');
			$(this).css('display','none');
		});
		if($(this).val()==''){
			$('#pwDT').css('display','none');
		}
	});
	$('#pw').on('blur',function(){
		var pw=$('#pw').val();
		var pwRe=/^(\w){6,20}$/;
		if(!pwRe.test(pw)){alert('请输入6到20位不含特殊符号的密码');}
	});
	

	//注册页面btn
	$('#Btn').on('click',function(ev){
		ev.preventDefault();
		var username=$('#username').val();
		var phone=$('#phone').val();
		var email=$('#email').val();
		var pw=$('#pw').val();

		var userRe=/^[a-zA-Z]\w{6,12}$/;
		var phRe=/^1\d{10}$/;
		var emRe=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		var pwRe=/^(\w){6,20}$/;
		//数据验证
		if(userRe.test(username)&&phRe.test(phone)&&emRe.test(email)&&pwRe.test(pw))
		{
			$.ajax({
				url:'/register/insert',
				type:'post',
				data:{Name:username,Phone:phone,Email:email,Password:pw},
				success:function(data){
					if(data=='ok'){
						location.href='http://localhost:3000/users/ok';
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}
		else{
			alert('请按照提示重新填写');
		}

	});
});