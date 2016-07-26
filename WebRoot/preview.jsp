<!-- 这个页面的作用是加载flash插件 -->

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0014)about:internet -->
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="css/reset.css">
<script type="text/javascript" src="js/swfobject/swfobject.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/flexpaper/flexpaper.js"></script>
<script type="text/javascript" src="js/flashConfig.js"></script>

</head>
<body>
	<!-- flash是否可用 -->
	<div id="flashContent" style="display:none">
		<p>请安装flash 10.0.0以上的版本</p>
		<script type="text/javascript">
			var pageHost = ((document.location.protocol == "https:") ? "https://"
					: "http://");
			document
					.write("<a href='http://www.adobe.com/go/getflashplayer'><img src='" + pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>");
		</script>
	</div>
</body>
</html>
