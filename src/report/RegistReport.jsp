<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="pragma" content="no-cache" />
		<link rel="Shortcut Icon" href="../images/favicon.ico" />
		<title>登记表</title>
		
		<script type="text/javascript" src="${ctx}/ExtJS/adapter/ext/ext-base.js.gzipfile"></script>
		<script type="text/javascript" src="${ctx}/ExtJS/ext-all.js.gzipfile"></script>
		<script type="text/javascript" src="${ctx}/ExtJS/src/locale/ext-lang-zh_CN.js"></script>
		<style type="text/css">
			.button {
				display: inline-block;  
			    zoom: 1; /* zoom and *display = ie7 hack for display:inline-block */  
			    *display: inline;  
			    vertical-align: baseline;  
			    margin: 0 2px;  
			    outline: none;  
			    cursor: pointer;  
			    text-align: center;  
			    text-decoration: none;  
			    font: 14px/100% Arial, Helvetica, sans-serif;  
			    padding: .5em 2em .55em;  
			    text-shadow: 0 1px 1px rgba(0,0,0,.3);  
			    -webkit-border-radius: .5em;   
			    -moz-border-radius: .5em;
			    border-radius: .5em;  
			    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);  
			    -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);  
			    box-shadow: 0 1px 2px rgba(0,0,0,.2);  
			}
			
			.PageNext{page-break-after: always;}

			.doc {width: 750px;margin:auto;border:0px solid green;font-family:Arial,Verdana,Sans-serif;page-break-after: always;}
			.title_header {margin:auto;}
			.title_header h1,h2{text-align: center;font-weight: bold;}
			
			.myTable {margin:auto;font-size: 14px;border-color: black;border-collapse: collapse;border-spacing: 0;width: 100%;height:750px;margin-top:10px;}
			.myTable tr {height: 30px;}
			.myTable td {text-align: center;border:0px;word-wrap: break-all;word-wrap: break-word;font-size: 12px;}
			.myTable th {text-align: center;border: 1px solid black;word-wrap: break-all;word-wrap: break-word;font-size: 14px;font-weight: bold;}
			.thWidth {width: 40px;}
			.RS_RG {text-align: right;font-size: 12px;font-weight: bold;}
			
			div.header-right {display: none}  
		    div.header-left {display: none}  
		    div.footer-center {display: none}  
		    div.footer-right {display: none}
		    div.footer-left {display: none}  
		
		    @media print {
		    	h2 {font-size: 25px;font-weight: bold;}
		    	.Noprint{display:none;}
		    	body {width: 10.5in;height:11.5in;margin:auto;margin-top: 0.5in;}
		    	.doc {width:10in;height:11.5in;margin:auto;border:0px solid green;font-family:Arial,Verdana,Sans-serif;page-break-after: always;}
		    	.myTable {margin:auto;border-color: black;border-collapse: collapse;border-spacing: 0;width: 100%;margin-top:10px;}
		    	.myTable tr {height: 50px;}
		    	.myTable td {font-size: 16px;}
		    	.myTable th {font-size: 20px;font-weight: bold;}
		    	.thWidth {width: 60px;}
		    	.RS_RG {font-size: 20px;text-align: right;font-weight: bold;}
			    div.header-left { display: none; position: running(header-left);}  
			    div.header-right {display: none; position: running(header-right); }  
			    div.footer-left {display: none; position: running(footer-left); }  
			    div.footer-right { display: none; position: running(footer-right); }  
			    div.footer-center { display: none; position: running(footer-center); }
		    }
    
			@page {
				size: A4;
				margin-top: 0.3in;
				margin-bottom: 0.1in;
				margin-left: 0.5in;
				margin-right: 0.5in;
			    border: none;
				@top-right { content: element(header-right) };
				@top-left { content: element(header-left) };
			    @bottom-left { content: element(footer-left) };  
			    @bottom-right { content: element(footer-right) };
			    @bottom-center { content: element(footer-center) }; 
			}

			#pagenumber:before { content: counter(page);}  
		    #pagecount:before { content: counter(pages);}
		</style>
		
		<script type="text/javascript">
		Ext.BLANK_IMAGE_URL = '${ctx}/ExtJS/resources/images/default/s.gif';
		
		if(Ext.isIE) {
			var HKEY_Root,HKEY_Path,HKEY_Key;
			HKEY_Root="HKEY_CURRENT_USER";
			HKEY_Path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
		}
		
		Ext.onReady(function() {
			Ext.QuickTips.init();
			window.printDoc= function() {
				if(Ext.isIE) {
					try  {
						 var Wsh=new ActiveXObject("WScript.Shell");
					      HKEY_Key="header";
					      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
					      HKEY_Key="footer";
					      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
					      HKEY_Key="margin_left" 
					      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0"); //键值设定--左边边界

					      HKEY_Key="margin_top" 
					      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0"); //键值设定--上边边界

					      HKEY_Key="margin_right" 
					      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0"); //键值设定--右边边界

					      HKEY_Key="margin_bottom" 
					      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0"); //键值设定--下边边界
				    }
				    catch(e)  {
				        var errorMsg = e.message+"\r"+"请设置:IE选项->安全->Internet->"+"ActiveX控件和插件"+"\r"+"对未标记为可安全执行脚本的ActiveX的控件初始化并执行脚本->允许/提示";
				        alert(errorMsg);
				        return;
				    }
				    window.print(); 
				}
				else {
					window.print();
				}
			}
		});
		</script>
	</head>
	<body>
		<div style="float: right;" class="Noprint">
			<input class="button" type="button" value="打印" onclick="printDoc();" />
		</div>
		
		<c:forEach items="${pageData}" var="list" varStatus="pageStat">
		<div class="doc">
			<div class="title_header">
				<h2>云南省计量测试技术研究院</h2>
				<h2>温度计检定／校准信息汇总表</h2>
				<div class="RS_RG">YS—RG—B018—2010</div>
				<hr/>
			</div>
			<table border="0" class="myTable">
				<tr>
					<th>送检单位</th>
					<th>仪器名称</th>
					<th>型号规格、生产厂家</th>
					<th>编号</th>
					<th class="thWidth">样品编号</th>
					<th class="thWidth">证书编号</th>
					<th class="thWidth">结果判定</th>
				</tr>
				<c:forEach items="${list}" var="o" varStatus="stat">
				<tr>
					<td style="border-left:1px solid black;border-bottom:1px dashed black;<c:if test="${stat.last}">border-bottom:1px solid black;</c:if>">${o.unit}</td>
					<td style="border-left:1px solid black;border-bottom:1px dashed black;<c:if test="${stat.last}">border-bottom:1px solid black;</c:if>">${o.tmerName}</td>
					<td style="border-left:1px solid black;border-bottom:1px dashed black;<c:if test="${stat.last}">border-bottom:1px solid black;</c:if>">${o.tmerType}</td>
					<td style="border-left:1px solid black;border-bottom:1px dashed black;<c:if test="${stat.last}">border-bottom:1px solid black;</c:if>">${o.tmterNo}</td>
					<td style="border-left:1px solid black;border-bottom:1px dashed black;<c:if test="${stat.last}">border-bottom:1px solid black;</c:if>">${o.sampleNo}</td>
					<td style="border-left:1px solid black;border-bottom:1px dashed black;<c:if test="${stat.last}">border-bottom:1px solid black;</c:if>"></td>
					<td style="border-left:1px solid black;border-bottom:1px dashed black;border-right:1px solid black;<c:if test="${stat.last}">border-bottom:1px solid black;</c:if>"><c:if test="${o.result != '待测'}">${o.result}</c:if></td>
				</tr>
				</c:forEach>
				<tr>
					<td colspan="7">共&nbsp;&nbsp;${fn:length(pageData)}&nbsp;&nbsp;页&nbsp;&nbsp;第&nbsp;&nbsp;${pageStat.count}&nbsp;&nbsp;页</td>
				</tr>
			</table>
		</div>
		</c:forEach>
	</body>
</html>