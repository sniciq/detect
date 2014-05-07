<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap demo</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
	<link href="assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Bootstrap -->
    <link href="../static/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <script src="../static/jquery/jquery-1.10.2.min.js"></script>
    <script src="../static/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript">
    	var $j = jQuery.noConflict();
    	$j(function() {
    	});
    </script>
  </head>
  <body>
  	<table class="table table-striped table-bordered table-hover">
		<tr>
			<td style="width:100px;text-align: right;">实验编号</td>
			<td><input type="text" placeholder="Type something…"  style="width:95%;" /></td>
			<td style="width:100px;text-align: right;">院设备编号</td>
			<td><input type="text" placeholder="Type something…"  style="width:95%;" /></td>
		</tr>
		<tr>
			<td style="text-align: right;">温度(℃)</td>
			<td><input type="text" placeholder="Type something…" style="width:95%;" /></td>
			<td style="text-align: right;">湿度(%HR)</td>
			<td><input type="text" placeholder="Type something…" style="width:95%;" /></td>
		</tr>
	</table>
  </body>
</html>