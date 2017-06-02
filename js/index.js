$(function(){
	//检测手机号
	var isphonenum = true;
	$("#phonenum").blur(function(){
		var phonenum = $("#phonenum").val();
		if(checkMobile(phonenum)){
			isphonenum = true;
			$(".prompt").hide();
		}else{
			isphonenum = false;
			$(".prompt").show();
		}
	});
	//发送验证码
	$(".sendmsg").click(function(){
		if($("#phonenum").val()==''){
			alert("请填写手机号");
			return;
		}
		if(!isphonenum){
			alert("请填写正确的手机号");
			return;
		}
		
		$.ajax({
			type:"post",
			url:"http://10.22.64.66:9090/shangze/sendsms",
			async:true,
			dataType:json,
			data:{
				mobile:	$("#phonenum").val()			
			},
			success:function(data){
				console.log(data)
			}
		});
	});
	//验证并登录
	$("#login").click(function(){
		login();
		if($("#phonenum").val()==''){
			alert("请输入手机号");
		}else if($("#code").val() == ''){
			alert("请输入验证码");
		};
//		$.ajax({
//			type:"post",
//			url:"http://10.22.64.66:9090/shangze/checksms",
//			async:true,
//			dataType:json,
//			data:{
//				mobile:$("#phonenum").val(),
//				code:$("#code").val()
//			},
//			success:function(data){
//				console.log(data);
//			}
//		});
	})
	
	function checkMobile(str) {
	    var re = /^1\d{10}$/;
	    if (re.test(str)) {
	        return true;
	    } else {
	        return false;
	    }
	}
	
	function login(){
		var token = localStorage.getItem("token") || '';
		$.ajax({
			type:"post",
			url:"http://10.22.64.66:9090/shangze/login",
			async:true,
			data:{
				mobile:$("#phonenum").val(),
				token:token
			},
			success:function(data){
				console.log(data);
			}
		});
	}
})
