<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="favicon.ico" />
<link type="text/css" href="css/configAdmin.css" rel="stylesheet" />

<script type="text/javascript" src="js/jquery/jquery-1.9.1.min.js"></script>
<script src="js/user/configAdmin.js"></script>
<title>权限管理</title>
</head>
<body>
	<div id="header">
		<a href="main.jsp" class="g_icon home" title="返回首页">首页</a> <input
			id="admin" class="btn" type="button" value="管理员列表" /> <input
			id="user" class="btn" type="button" value="用户列表" /> <input
			id="userId" type="text" /><input id="search" type="button"
			value="搜索Id" />
	</div>
	<div id="queryForm">
		<form method="get" name="tabForm" action="GradeConfig">
			<input id="formSubmit" class="btn" type="button" value="保存该表设置">
			<div id="queryTable" class="scrollBar">
				<table cellspacing="0" id="tab">
					<thead>
						<tr>
							<th>Id</th>
							<th>用户名</th>
							<th>权限</th>
							<th>创建时间</th>
							<th>设置权限</th>
						</tr>
					</thead>
					<tbody>
						<!-- 页面加载时从数据库加载 -->
					</tbody>
				</table>
			</div>
		</form>
	</div>
	<div id="footer">
		<p>版权所有&copy;2016</p>
	</div>
</body>
</html>