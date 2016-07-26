var tabs;
var tabCount = 0;//用于记录打开过的标签页的总数
var tabNumber = 0;//用于记录现有的标签页的总数
var sucnumber=0;
//首次打开页面从数据库中获取所有档案
//allFile();

//各种事件绑定
$(function(){
	/*
	 * 使用tabs插件
	 */
	tabs = $("#tabs").tabs();
	/*
	 * 使tabs标签页可横向拖拽排序
	 */
	tabs.find( ".ui-tabs-nav" ).sortable({
		axis: "x",
		stop: function() {
			tabs.tabs( "refresh" );
		}
    });
	/*
	 * 文件列表可拖拽
	 */
	$( "#allFile" ).sortable();
    $( "#allFile" ).disableSelection();
	/*
	 * 全局title提示
	 */
	$(document).tooltip();
	/*
	 * 双击档案文件显示loading
	 */
	$('#allFile li').dblclick(function() {
		$('#loading').show();
	});
	/*
	 * 页面加载完成隐藏loading
	 */
	$(document).load(function(){
		$('#loading').hide();
	});
	/*
	 * 列表项双击，添加一个新的标签页
	 */
	$('#allFile').on('dblclick', '.file', addTabContent);
	/*
	 * 点击标签页的X关闭此标签页
	 */
	tabs.delegate( "#tabsList span", "click", delTabContent);
	/*
	 * 返回首页按钮
	 */
	$('#homeLink').click(function(){
		$('#contentList').html('<iframe src="default.html" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>');
		$('#tabsList').html('');
		tabCount = 0;
	});
	/*
	 * 点击导出按钮，打开导出数据的弹窗
	 */
	$('#exportData').click(function(){
		$("#exportData-dialog").dialog("open");
	});
	/*
	 * 导出数据的弹窗配置，模态弹窗，用户不可拖动
	 */
	$('#dload').hide();
	$( "#exportData-dialog" ).dialog({
		autoOpen: false,
		height: 120,
		width:170,
		modal: true,
		draggable:false,
		close: function(){//dialog被关闭后触发
			clearInterval(timer);
			$('#dload').hide();
		},
	    buttons:{
	    	"点击这里开始进行备份":function(){
	    		exportload();
	    		$('#dload').show();
	    		document.getElementById('downloadDB').click();
	    		setTimeout(function(){//略微等一下关闭弹窗
	    			$("#exportData-dialog").dialog("close");
	    		}, 1000);
	    	}
	    }
	});
	var timer = null;
	function exportload(){//三个点切换的函数
    	var i = -1;
    	timer = setInterval(function(){
    		if(i < 3){
    			i++;
    			$('#exportData-dialog div span').eq(i).show();
    		}else{
    			i = -1;
    			$('#exportData-dialog div span').hide();
    		}
    	},400);
    }
	/*
	 * 导入数据
	 */
	$("#importData").uploadify({
		auto:true,
		swf:'js/uploadify/uploadify.swf',
		buttonText:'导入数据',
		queueID:'uploadFile-dialog',
//		multi:true,
		fileTypeExts:'*.db',
		fileTypeDesc:'数据文件',
		uploader:'servlet/RecoverDate',//上传到处理上传的文件的servlet
		progressData : 'percentage',
		onUploadStart:function(){//文件开始上传时触发
			$('#uploadFile-dialog').dialog("open");
		},
		onUploadSuccess:function(){//文件上传成功时触发
			$('#uploadFile-dialog').dialog("close");
		},
		onQueueComplete:function(queueData) {
			$('#uploadFile-dialog').dialog("close");
			//上传成功和失败的文件的个数
			var succ = queueData.uploadsSuccessful;
			var error =  queueData.uploadsErrored;
			allFile(succ - sucnumber);
			sucnumber = succ;
        }
	});
	/*
	 * 添加文件
	 */
	$("#uploadFile").uploadify({  
		auto:true,
		swf:'js/uploadify/uploadify.swf',
		buttonText:'添加文件',
		queueID:'uploadFile-dialog',
		multi:true,
		fileTypeExts:'*.doc; *.docx; *.jpg; *.png; *.pdf; *.jpeg;',
		fileTypeDesc:'pdf、word、jpg、png、jpeg',
		checkExisting:true,//文件上传重复性检查程序，检查即将上传的文件在服务器端是否已存在，存在返回1，不存在返回0
		uploader:'js/uploadify',//上传到处理上传的文件的servlet
		progressData : 'percentage',
		formData:{	//	JSON格式上传每个文件的同时提交到服务器的额外数据，可在’onUploadStart’事件中使用’settings’方法动态设置。
			//在这里面
		},
		preventCaching:true,//如果为true，则每次上传文件时自动加上一串随机字符串参数，防止URL缓存影响上传结果
		//文件开始上传时触发
		onUploadStart:function(){
			//this.settings();动态设置formData
			$('#uploadFile-dialog').dialog("open");
		},
		//一个文件上传成功后触发
		onUploadSuccess:function(){
			//$('#uploadFile-dialog').dialog("close");
		},
		//文件队列全部上传完成后触发
		onQueueComplete:function(queueData) {
			$('#uploadFile-dialog').dialog("close");
			//上传成功和失败的文件的个数
			var succ = queueData.uploadsSuccessful;
			var error =  queueData.uploadsErrored;
			//新的文件上传成功刷新档案列表
			allFile();
        }
    });
	/*
	 * 上传进度的弹窗，模态弹窗，上传期间用户不能做其他事情
	 */
	$('#uploadFile-dialog').dialog({
		autoOpen: false,
		height: 200,
		modal: true,
		draggable:false,
//	    buttons:{
//	    	"取消所有正在上传的所有任务":function(){
//	    		$( this ).dialog("close");
//	    		//关闭当前正在上传的所有任务
//	    		$('#uploadFile').uploadify('cancel','*');
//	    	}
//	    }
	});
});

/*
 * 删除标签页
 */
function delTabContent(event){
	tabNumber--;
	var panelId = $(event.target).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    //标签页删除之后首先设置其宽度
	tabsWidth();
	//刷新标签页
    tabs.tabs( "refresh" );
  //如果页面的标签页都被删除就回到欢迎页
    if(tabNumber === 0){
    	$('#homeLink').click();
    }
}

/*
 * 添加一个新的标签页
 */
function addTabContent(event){
	if(tabCount === 0){
		$('#contentList').html('');
	}
	tabCount++;
	tabNumber++;
	var tabsList = $('#tabsList');
	var contentList = $('#contentList');
	//构建要加载到页面的元素节点
	var tabsHtml = '<li><a href="#tabs-'+tabCount+'">'+event.target.innerHTML+'</a><span title="close">X</span></li>';
	var contentListHtml = '<div id="tabs-'+tabCount+'"><iframe id="preview'+tabCount+'" src="preview.jsp?id=preview'+tabCount+'" data-path="userFile/'+$(event.target).attr('data-time')+'.swf" frameborder="0" scrolling="no" width="100%" height="100%"></iframe></div>';
	//添加到页面中
	tabsList.append(tabsHtml);
	//标签页添加之后首先设置其宽度
	tabsWidth();
	contentList.append(contentListHtml);
	//刷新标签页
	tabs.tabs("refresh");
	//将内容显示区定位到新打开的标签页
	$('a[href=#tabs-'+tabCount+']').click();
	//为新iframe添加load事件
	$('#preview'+tabCount).load(function(){		
		$('#loading').hide();
	});
}

/*
 * 标签页个数检测函数，根据标签页的个数调整标签的宽度
 */
function tabsWidth(){
	var tabWidth = parseInt( parseInt( $('#tabsList').width() )/ (tabNumber+1) );//转为整数
	$('#tabsList li').each(function(){
		$(this).css({
			'width':tabWidth,
		}).find('a').css({
			'width':tabWidth-55,
		});
	});
}

/*
 * 档案列表刷新函数，使用get请求从服务器获取数据解析到页面
 */
//function allFile(){//146行调用了这个方法
//	var fl = $('#allFile');
//	$.get('servlet/GetFileInfo', function(data){
//		 var objs=eval("("+data+")");
//		 var str = '';
//		 for(var i = 0; i < objs.length; i++){
//			 str += '<li class="file" title="双击打开" data-time="'+objs[i]['timePath']+'">'+objs[i]['fileTitle']+'</li><a href="servlet/DownloadFile?filename='+objs[i]['realPath']+'">下载</a>';
//		 }
//		 fl.html(str);
//	});
//	
//}
function allFile(n){//146行调用了这个方法
	var fl = $('#allFile');
	$.get('servlet/GetFileInfo', function(data){
		 var objs=eval("("+data+")");
		 var str = '';
		 for(var i = objs.length-n; i < objs.length; i++){
			 str += '<li ><a class="file" title="双击打开" data-time="'+objs[i]['timePath']+'">'+objs[i]['fileTitle']+'</a><a href="servlet/DownloadFile?filename='+objs[i]['realPath']+'" class="downfile"></a></li>';
		 }
		 if($(".tree>li").length===0)
			 fl.html(str);
     	 else if($(".selected").length === 0)
     		fl.append(str);
     	 else
     		$(".selected>ul").append(str);
		 
		 $(".tree").treemenuUpdate();
		 saveul();
		 bindli();
	});
	
}
