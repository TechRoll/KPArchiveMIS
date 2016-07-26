//保存ul内容
var saveul = function(){
	$("#allFile li").removeClass("selected");
	var htmlcontent = $("#allFile").html().replace(/[\r\n\t]/g,"").trim();
    
    $.post("serviet/Saveul",{content:htmlcontent});
};
//li绑定选中事件
var bindli=function(){
    $("#allFile li").unbind("click");
    
    $("#allFile li").bind("click",function(e){
        e.preventDefault();
        e.stopPropagation();
        let $this = $(this);
        $("#allFile li").removeClass("selected");
        $(this).addClass("selected");
   });
  };
$(function(){
	var flag=true;
    var setdrag =  $(".dragtree ul").dragsort({dragSelector: "li", dragBetween: true});
    // var setdrag =  $(".tree").dragsort({dragSelector: "li", dragBetween: true});
    //$(".dragtree ul").sortable();           //ui排序
        
    var changecontent = "<span id='edit'>编辑</span><ul class='appendlist' id='appendlist'><li><a href='javascript:;'>添加同级分类</a></li><li><a href='javascript:;'>添加子集分类</a></li></ul><ul class='appendlist' id='editcontent'><li><a herf='javascript:;' id='detele'>删除</a></li><li><a herf='javascript:;' id='rename'>重命名</a></li><li><a herf='javascript:;' id='moveUp'>上移</a></li><li><a herf='javascript:;' id='moveDown'>下移</a></li></ul>";
    $("#changefile").append(changecontent);
    
    $("#allFile").on("change",function(){
    	saveul();
    	});
    $.get("serviet/Saveul",function(data){
    	if(data=="")
    		$("#allFile").html("<h3>请上传文件或添加文件夹<h3>");
    	else
    		$("#allFile").html(data);
    	$(".tree").treemenu();
    	 bindli();
    	}
    );
    
    
     
    $("#edit").on("click",function(){
        let $this = $(this);
        if(flag){
            $this.html("完成");
            $("#appendlist").hide();
            $("#editcontent").show();
            flag = false;
        }
        else{
            $this.html("编辑");
            $("#appendlist").show();
            $("#editcontent").hide();
            flag = true;
            saveul();
        }
    });
    //添加同级分类
    $("#appendlist>li:eq(0)").on("click",function(){
        changeFormAlert($(this).text(),"分类名称",addPeer,$(".selected").parent());
    });
    
    //添加子集分类
    $("#appendlist>li:eq(1)").on("click",function(){
      if(judgeselect()){
         changeFormAlert($(this).text(),"分类名称",addChild,$(".selected>ul"));
      }
    });  
    
     
    var createli = function(name){
        let newli = null;
        newli = $("<li class='folder'></li>");
        // newli.addClass("tree-empty ui-sortable-handle file").attr("data-time","");
        // newli.append("<span class='toggler'></span>").append("<a href=\"#\">"+name+"</a>");
        
        newli.append("<a href=\"#\">"+name+"</a><ul></ul>");
        //newli.find("a").addClass("file").attr("data-time","");
        
        return newli;
    };
    var addPeer = function(name){
        let newli = createli(name);
        if(!($(".selected").length === 0)){
          $(newli).appendTo($(".selected").parent());
        }
        else{
        	if($(".tree>li").length===0)
        		$(".tree").html(newli);
        	else
        		$(newli).appendTo($(".tree"));
        }
        $(".tree").treemenuUpdate();
        saveul();
     bindli();
    };
    var addChild = function(name){
        let newli = createli(name);
        if(judgeselect()){
          if(($(".selected>ul").length===0)){
        	  if($(".selected").hasClass("folder"))
        		  $(newli).appendTo($(".selected>ul:eq(0)"));
        	  else
        		  $(newli).appendTo($(".selected").parent());
          }
          else{
            // $("<ul></ul>").appendTo($(".selected")).addClass("treemenu ui-sortable").append(newli);
            // $(".selected").removeClass("tree-empty").addClass("tree-opened");
            $("<ul></ul>").appendTo($(".selected")).append(newli);
          }
        }
        $(".tree").treemenuUpdate();
        saveul();
     bindli();
    };
    // 上移按钮
    $("#moveUp").on("click",function(){
        $(".selected").insertBefore($(".selected").prev());
        saveul();
    });
    // 下移按钮
    $("#moveDown").on("click",function(){
        console.log("$(this).index()");
        $(".selected").insertAfter($(".selected").next());
        saveul();
    });
    // 删除按钮
    $("#detele").on("click",function(){
        if(judgeselect()){
           $( "#detele-confirm" ).dialog("open");
           
        }
    });
    // 重命名按钮
    $("#rename").on("click",function(){
        if(judgeselect()){
           changeFormAlert("修改文件名称","文件名称",renameFn,$(".selected").parent());
           
        }
    });
    // 删除确认框
    $( "#detele-confirm" ).dialog({
      resizable: false,
      modal: true,
      autoOpen :false,
      buttons: {
        "删除": function() {
          $( this ).dialog( "close" );
          // deteled.push( $(".selected"));                      //删除数组
          $(".selected").remove();
          saveul();
          if($(".tree>li").length===0)
      		$("#allFile").html("<h3>请上传文件或添加文件夹<h3>");
          // console.log(deteled[0]);
          
        },
        "取消": function() {
          $( this ).dialog( "close" );
          return false;
        }
      }
    });
    //警告判断
    var judgeselect = function(){
      if(($(".selected").length === 0)){
         $( "#warning-confirm" ).dialog("open");
         return false;
      }else return true;
    };
    //重名判断
    var ifrepeat=function(o,name){
      let haverepeat = false;
      o.find(">li>a").each(function(){
          let e = $(this);
          if( e.text() == name.val() ){
            haverepeat=true;
          }
          // else{
          //   console.log(e.text());
          //   console.log(name);
          // }
      });
      
      if(haverepeat){
        name.addClass( "ui-state-error" );
        updateTips( "此位置以包含同名文件" );
        return false;
      }
      else{
        return true;
      }
    };
    /*****************************警告框*****************/
    $( "#warning-confirm" ).dialog({
      resizable: false,
      modal: true,
      autoOpen :false,
      buttons: {
        "确认": function() {
          $( this ).dialog( "close" );
        }
      }
    });
    
    /*****************重命名框******************** */
    
      
    // 正则检查
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
    /*********长度检查*********/
     function checkLength( o, n, min ) {
      if ( o.val().length <= min ) {
        o.addClass( "ui-state-error" );
        updateTips( "" + n + " 的长度必须大于 " +
          min );
        return false;
      } else {
        return true;
      }
    }
    /******错误提示*******/
     function updateTips( t ) {
       let tips = $( ".validateTips" );
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
    /***********重命名**************/
    var renameFn = function(name){
       $(".selected").find("a:eq(0)").text(name);
       saveul();
    };
    
    
    var changeFormAlert = function(title,label,fn,o){
      var name = $( "#name" ),
      allFields = $( [] ).add( name );
      $( "#dialog-form" ).attr("title",title).find("p").text("");
      $( "#dialog-form>label" ).text(label);
      $( "#dialog-form" ).dialog({
      modal: true,
      buttons: {
        "确认": function() {
          var bValid = true;
          allFields.removeClass( "ui-state-error" );
          bValid = bValid && checkLength( name, "文件名", 0);
          bValid = bValid && checkRegexp( name, /[^*?"<>|]/g, "文件名不能包括特殊字符" );
          bValid = bValid && ifrepeat(o,name);
          
          if ( bValid ) {
              // $(".selected").find("a:eq(0)").text(name.val());
              fn(name.val());
              $( this ).dialog( "close" );
          }
        },
        "取消": function() {
              $( this ).dialog( "close" );
        }
      },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });
    };
});