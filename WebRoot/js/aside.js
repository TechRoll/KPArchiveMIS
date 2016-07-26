$(function(){
	 $(".tree").treemenu();
	 
	//搜索
	    $("#searchform").on("submit",function(e){
	          e.preventDefault();
	          e.stopPropagation();})
	    $(".search-term").on("keydown",function(event){
	      var keyCode = event.keyCode || event.which || event.charCode;
	      switch(keyCode){
	        case 13:$("#searchbt").trigger("click");;
	      }
	    })
	    $("#searchbt").bind("click",function(){
	      var searchtext = $(".search-term").val();
	      if(searchtext!=""){
	        $("#searchFile").html("");
	        $(".tree").hide();
	        $("#loading").show();
	        $("#allFile li>a").each(function(){
	          let e = $(this);
	          if(e.text().indexOf(searchtext)!=-1 &&e.parent().hasClass("tree-empty")){
//	           $("<li></li>").append(e.clone()).append("<a class='downfile' herf="+absolutepath.substring(pathlong)+"></a>").appendTo($("#searchFile"));
	        	  $("<li></li>").append(e.clone()).append(e.next().clone()).appendTo($("#searchFile"));
	           //e.parent().appendTo($("#searchFile"));
	          }
	        });
	        $.get("servlet/ToSearch",{content:searchtext},function(data){
	        	$("#searchFile").append(data);
	        	if($("#searchFile li").length===0){
		            $("#searchFile").html("<p>未查找到文件</p>")
		        }
	        	$("#loading").hide();
	        	$(".searchFilebox").show();
	        });
	        
	      }
	    });
	    $(".searchFilebox .ui-icon-closethick").on("click",function(){
	          $(".tree").show();
	          $(".searchFilebox").hide();
	    });
});