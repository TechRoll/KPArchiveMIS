<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- [if lte IE 8]>
	    <link type="text/css" href="css/ie.css" rel="stylesheet" />
	<![endif]-->
<link rel="shortcut icon" href="favicon.ico" />
<link type="text/css" href="css/global.css" rel="stylesheet" />
<link type="text/css" href="css/register.css" rel="stylesheet" />

<title>用户注册</title>

<script type="text/javascript" src="js/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/user/upUser.js"></script>
</head>
<body>
	<div class="has_shadow up_wrapper">
		<a href="main.jsp">返回首页</a>
		<form id="upUserForm" name="upUserForm" class="upForm" action="UpUser"
			method="post">
			<table>
				<tr>
					<td><label for="userId">帐号：</label>
					</td>
					<td><p id="userId"><%=session.getAttribute("userId")%></p>
					</td>
				</tr>
				<tr>
					<td><label for="userName">用户名：</label>
					</td>
					<td><input class="round_rect" id="userName" name="userName"
						type="text" value=<%=session.getAttribute("userName")%> /><span
						id="uNameNull">*用户名不能为空！</span>
					</td>
				</tr>
				<tr>
					<td><input type="text" style="display:none;" />
					<!-- 多写一个input是为了阻止浏览器默认回车提交行为 -->
					</td>
					<td><input id="save" type="button" class="button round_rect"
						value="保存" />
					</td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
