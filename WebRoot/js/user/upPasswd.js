// JavaScript Document
$(document).ready(function() {
    $("#pwdEqual").hide();      //初始隐藏
    $("#pwdLength").hide();
    
    var erro =function(){      //密码确认及错误输出
        if($("#password").val()!=$("#passwordAgin").val()){  //两次输入的密码是否不相等？
            $("#pwdEqual").show();
        } else {
            $("#pwdEqual").hide();
            //$("#save").attr("disabled",false);
        }
    };
    var pwdlgh = function () {
    	if($("#password").val().length<6) {      //密码长度是否少于6？
    		$("#pwdLength").show();
    	} else {
    		$("#pwdLength").hide();
    		//$("#save").attr("disabled",false);
    	}
    };
    
   $("#passwordAgin").keyup(erro);
   $("#password").change(pwdlgh);
   $("#save").click(function(){
	   if($("#password").val()==$("#passwordAgin").val() && $("#password").val().length>=6) {
		   //$("#save").attr("disabled",true);
		   //document.upPasswdForm.submit();
		   $.post("UpPasswd",
				   {
			         "password":$("#password").val()
				   },
				   function(data,status){
					 if(status){
						 alert(data);
						 window.location="login.jsp";
					 }  
		   });
	   } 	  
   });
   
   $("#passwordAgin").keyup(function(event){  //回车绑定按钮点击事件
		if(event.keyCode==13){
			$("#save").click();
		}
	});
});