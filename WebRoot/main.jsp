<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="application-name" content="档案管理系统 V1.0" />
	<link rel="shortcut icon" href="favicon.ico">
	<link type="text/css" rel="stylesheet" href="css/global.css" />
	<link type="text/css" rel="stylesheet" href="css/jquery-ui.min.css" />
	<link type="text/css" rel="stylesheet" href="css/uploadify.css" />
	<link type="text/css" rel="stylesheet" href="css/main.css" />
	
	<link rel="stylesheet" href="css/screen.css" />
    <link rel="stylesheet" href="css/jquery.treemenu.css" />
    <link rel="stylesheet" href="css/asideStyle.css" />

	<!--[if lte IE 8]>
	<script type="text/javascript" src="scripts/html5.js"></script>
	<![endif]-->

	<script type="text/javascript" src="js/jquery/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/uploadify/jquery.uploadify.min.js"></script>
	
	<script src="js/jquery.treemenu - change.js" type="text/javascript"></script>
    <script src="js/jquery.dragsort-0.5.2.min.js"></script>
	
	<title>档案管理</title>
</head>
<body>

<header id="hd">
	<div id="btnFilePanel">
		<!-- exportData写这些是为了让按钮样式都一样 -->
		<div class="uploadify">
			<div id="exportData" class="uploadify-button">
				<span class="uploadify-button-text">备份数据</span>
			</div>
		</div>
		<div id="importData"></div>
		<div id="uploadFile"></div>
	</div>
	<div id="hdRight"><!-- 用户名及其相关功能 -->
    	<!-- 判断登录的是否为超级管理员，是的话则显示按钮 -->
    	<!--
    	            未登录的话会显示出错 
    	 -->
    	<% String str=(String)session.getAttribute("grade");%>
    	<% if(str != null) {%>
    	<% if(str.equals("superAdmin")){ %>
	       <a href="configAdmin.jsp">设置管理员</a>
		<% }} %>
	    <!-- 显示登陆用户名 -->
	    <a href="upUser.jsp" class="user_icon" title="点击修改"><%= session.getAttribute("userName") %></a>
        <a href="upPasswd.jsp">修改密码</a>
        <a href="LogOff" class="logOff_icon" title="退出登录">注销</a>
	</div>
</header>

<section id="bd">
   	<section id="main">
   		<div id="tabs">
   			<ul id="tabsList"></ul>
	   		<div id="contentList">
   				<iframe src="default.html" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>
	   		</div>
	   	</div>
   	</section>
    <aside>
	    <div class="header">
	        <h2>档案列表</h2>
	        <span class="right"><a id="homeLink" href="javascript:;" class="g_icon home" title="返回首页">首页</a></span>
	        <form id="searchform">
	            <input id="masthead-search-term" class="search-term " name="search_query" value="" placeholder="搜索" type="text" />
	            <a id="searchbt" href="javascript:;"></a>
	        </form>
	    </div><!--header end-->
	    <div id = "changefile" class="changefile">
	    
	    </div>
	    <div class="dragtree">
	    <ul id="allFile" class="tree">
		</ul>
	    </div>
	    <div class="searchFilebox">
	        <span class="ui-button-icon-primary ui-icon ui-icon-closethick" style="float:right;margin-top: -10px;"></span>
	        <ul id="searchFile">
	            
	        </ul>
	    </div>
    </aside>
</section>

<footer id="ft"><p>版权所有&copy;2016</p></footer>

<div id="loading" class="loading" style="display:none">
	<span class="round_rect">正在载入...</span>
</div>

<div id="exportData-dialog" title="导出数据">
	<!-- 档案列表显示在这里 -->
	<div id="dload">
		<!-- 三个点间隔显示等待 -->
		正在进行备份<span> .</span><span> .</span><span> .</span><a href="servlet/exportDate" id="downloadDB"></a>
	</div>
</div>

<div id="uploadFile-dialog">
	<!-- 此弹窗用于上传文件时显示进度条，上传未完成，用户不能对界面进行操作 -->
</div>

<!--删除确认框-->
<div id="detele-confirm" title="确认" class="alertconfim">
    <p><span class="ui-icon ui-icon-alert" ></span>文件将被永久删除，并且无法恢复。您确定吗？</p>
</div>
<!--重命名框-->
<div id="dialog-form" title="修改文件名称" style="text-align: center;" class="alertconfim">
     <p class="validateTips" ></p>
    <label for="name">文件名称</label>
    <input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all">
</div>
<!--警告框-->
<div id="warning-confirm" title="提示" class="alertconfim">
    <p><span class="ui-icon ui-icon-alert" ></span>请先选中一个文件或目录</p>
</div>

<script type="text/javascript" src="js/main.js"></script>
<script src="js/treeset - old.js" type="text/javascript"></script>
<script src="js/aside.js" type="text/javascript"></script>

</body>
</html>