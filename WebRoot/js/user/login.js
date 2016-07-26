$(function () {
	
	$("#sub").click(function () {    //账号和密码都不为空时提交
		if($("#userId").val()=="" || $("#password").val()=="")
		{
			alert("请输入用户名和密码！");
		} else {
			//document.loginForm.submit();
			$.post("login",{
				                    "userId":$("#userId").val(),
				                    "password":$("#password").val()
				                },function(data,status){
				                	if(status){
				                		if(data=="passVerify"){
				                			window.location="main.jsp";
				                		} else {
				                			//alert(data);
				                			$("#errorPut").text(data);
				                		}
				                		 
				                	}
				                });
		}
	});
	
	$("#password").keyup(function(event){  //回车绑定按钮点击事件
		if(event.keyCode==13){
			$("#sub").click();
		}
	});
});