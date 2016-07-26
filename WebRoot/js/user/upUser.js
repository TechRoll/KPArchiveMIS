// JavaScript Document
$(document).ready(function() {
    $("#uNameNull").hide();      //初始隐藏
    

    var uName = function () {
    	if($("#userName").val()==null || $("#userName").val()=="") {      //用户名是否为空
    		$("#uNameNull").show(); 
    	} else {
    		$("#uNameNull").hide();
    		//$("#save").attr("disabled",false);
    	}
    };
    
   $("#userName").keyup(uName);
   $("#save").click(function(){
	   if($("#userName").val()!=null && $("#userName").val()!="") {
		   //$("#save").attr("disabled",true);
		   //document.upUserForm.submit();
		   $.post("UpUser",
				   {
			          "userName":$("#userName").val()
				   },
				   function(data,status){
					   if(status){
						   alert(data);
						   window.location="main.jsp";
					   }
		   });
	   } 	  
   });
   
   $("#userName").keyup(function(event){  //回车绑定按钮点击事件
		if(event.keyCode==13){
			$("#save").click();
		}
	});
});