;(function (win,doc){
	function changeSize(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*50+'px';
	}
	changeSize();
	win.addEventListener('resize',changeSize,false);
})(window,document);
$(document).ready(function(){
	
	$('#txt').on('input',function(){
		$('#txtDT').css('display','block');
		$('#txtDT').on('click',function(){
			$('#txt').val('');
			$(this).css('display','none');
		});
		if($(this).val()==''){
			$('#txtDT').css('display','none');
		}
	});
	$('#PW').on('input',function(){
		$('#PWDT').css('display','block');
		$('#PWDT').on('click',function(){
			$('#PW').val('');
			$(this).css('display','none');
		});
		if($(this).val()==''){
			$('#PWDT').css('display','none');
		}
	});

	$('#loginBtn').on('click',function(ev){
		ev.preventDefault();
		var txt=$('#txt').val();
		var PW=$('#PW').val();
		var userRe=/^[a-zA-Z]\w{6,12}$/;
		var phRe=/^1\d{10}$/;
		var emRe=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var pwRe=/^(\w){6,20}$/;

		if(pwRe.test(PW)){
			if(userRe.test(txt)){
				var Name=txt;
				$.ajax({
					url:'/users/Name',
					type:'post',
					data:{Name:Name,Password:PW},
					success:function(data){
						if(data=='ok'){
							location.href='http://localhost:3000/users/login';
							// window.open('/users/login');
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
			else if(phRe.test(txt)){
				var Phone=txt;
				$.ajax({
					url:'/users/Phone',
					type:'post',
					data:{Phone:Phone,Password:PW},
					success:function(data){
						if(data=='ok'){
							location.href='http://localhost:3000/users/login';
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
			else if(emRe.test(txt)){
				var Email=txt;
				$.ajax({
					url:'/users/Email',
					type:'post',
					data:{Email:Email,Password:PW},
					success:function(data){
						if(data=='ok'){
							location.href='http://localhost:3000/users/login';
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
			else{alert('请输入6到12位以字母开头的用户名');}
		}else{
			alert('请输入6到20位不含特殊符号的密码');

		}
		$('#txt').val('');
		$('#PW').val('');
	});

});