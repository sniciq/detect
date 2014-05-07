<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="pragma" content="no-cache" />
		<link rel="Shortcut Icon" href="../images/favicon.ico" />
		<title>检测系统</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/ExtJS/resources/css/ext-all.css.gzipfile"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/ExtJS/resources/css/ext-all-notheme.css"/>
		
		<link rel="stylesheet" type="text/css" title="blue" href="${ctx}/ExtJS/resources/css/xtheme-blue.css" />
		<link rel="stylesheet" type="text/css" title="gray" href="${ctx}/ExtJS/resources/css/xtheme-gray.css" />
		
		<script type="text/javascript" src="${ctx}/ExtJS/adapter/ext/ext-base.js.gzipfile"></script>
		<script type="text/javascript" src="${ctx}/ExtJS/ext-all.js.gzipfile"></script>
		<script type="text/javascript" src="${ctx}/ExtJS/src/locale/ext-lang-zh_CN.js"></script>
		
		<script type="text/javascript">
			var globalCtx = '${ctx}';
		</script>
		
		<style type="text/css">  
		    .x-selectable, .x-selectable * {  
		        -moz-user-select: text!important;  
		        -khtml-user-select: text!important;  
		        -webkit-user-select: text!important;
		    }  
		</style>
		
		<style type="text/css">
			.text-RegisterRecordPanel {font-size:18px;}
			.text-RegisterRecordPanel .x-form-cb-label {font-weight: bold;font-size:18px;}
			
			#RegisterRecordPanel-standardTmpterId1 {height:25px ;font-size:18px;}
			#RegisterRecordPanel-tempRegisterId1 {height:25px ;font-size:18px;}
			.text-RegisterRecordPanel-combo {height:20px ;font-size:15px;}
			
			div.panel_header_icon_title_left {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    width: 22px;
			    padding-right: 6px;
			}
			div.panel_header_main {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    line-height: 22px;
			    margin: auto;
			}
			
			div.panel_header_extra {
			    text-align: left;
			    float: right;
			    margin-right: 10px;
			}
			
			div.panel_header_icon1 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			div.panel_header_icon2 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			.userInfo {
				height: 35px;margin-top: 5px;float: right;margin-right: 10px;text-align: right;
				font-weight: bold; font-size: 15px; color: #333333;
			}
		</style>
		
		<script type="text/javascript" src="../register/RegisterRecordPanelSamplePanel.js"></script>
		<script type="text/javascript" src="../register/RegisterRecordPanel_new.js"></script>
		
		<script type="text/javascript">
			Ext.BLANK_IMAGE_URL = '../ExtJS/resources/images/default/s.gif';
			
			Ext.onReady(function() {
				Ext.QuickTips.init();
				
				var panel = new com.ms.controller.register.RegisterRecordPanel({region:'center'});
				var viewport = new Ext.Viewport({
					layout: 'border',
					items: [panel]
				});
				panel.initMethod();
			});
		</script>
	</head>
	<body>
		
	</body>
</html>