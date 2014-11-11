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
		<title>记录表</title>
		
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
			
			.myTable {margin:auto;font-size: 14px;border-color: black;border-collapse: collapse;border-spacing: 0;width: 100%;margin-top:10px;}
			.myTable tr {height: 50px;}
			.myTable td {text-align: center;border: 1px solid black;word-wrap: break-all;word-wrap: break-word;width: 8.3%;font-size: 14px;}
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
		    	.myTable tr {height: 95px;}
		    	.myTable td {font-size: 20px;width: 8.3%;}
		    	.RS_RG {font-size: 20px;text-align: right;font-weight: bold;}
			    div.header-left { display: none; position: running(header-left);}  
			    div.header-right {display: none; position: running(header-right); }  
			    div.footer-left {display: none; position: running(footer-left); }  
			    div.footer-right { display: none; position: running(footer-right); }  
			    div.footer-center { display: none; position: running(footer-center); }
		    }
    
			@page {
				size: A4;
				margin-top: 0.5in;
				margin-bottom: 0.5in;
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
		
		<c:forEach items="${allReportList}" var="dataMap">
		<div class="doc">
			<div class="title_header">
				<h2>云南省计量测试技术研究院</h2>
				<h2>温度计检定记录</h2>
				<div class="RS_RG">YS—RG—B013—2012</div>
				<hr/>
			</div>
			<table  border="0" class="myTable">
				<tr>
					<td colspan="6" style="text-align: left;border: 0px solid black;">标准器编号: ${dataMap.detectData.tmterNo}</td>
					<td colspan="6" style="text-align: right;border: 0px solid black;">
						院设备编号：
						<a><input type="checkbox" onclick="return false;" style="outline: 1px solid; " <c:if test="${dataMap.detectData.equipmentNo=='RG024'}">checked="checked"</c:if> />RG024</a>&nbsp;&nbsp;
						<a><input type="checkbox" onclick="return false;" style="outline: 1px solid; " <c:if test="${dataMap.detectData.equipmentNo=='RG025'}">checked="checked"</c:if>/>RG025</a>&nbsp;&nbsp;
						<a><input type="checkbox" onclick="return false;" style="outline: 1px solid; " <c:if test="${dataMap.detectData.equipmentNo=='RG026'}">checked="checked"</c:if>/>RG026</a>
					</td>
				</tr>
				<tr>
					<td colspan="3">温度计编号</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td>${dataMap.detectData.tmterNo}</td>
					</c:if>
					<td><c:if test="${fn:length(dataMap.sampleList) > 0}">${dataMap.sampleList[0].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[0].doubleTmer == true}">(${dataMap.sampleList[0].doubleTmerName})</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 1}">${dataMap.sampleList[1].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[1].doubleTmer == true}">(${dataMap.sampleList[1].doubleTmerName})</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 2}">${dataMap.sampleList[2].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[2].doubleTmer == true}">(${dataMap.sampleList[2].doubleTmerName})</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 3}">${dataMap.sampleList[3].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[3].doubleTmer == true}">(${dataMap.sampleList[3].doubleTmerName})</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 4}">${dataMap.sampleList[4].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[4].doubleTmer == true}">(${dataMap.sampleList[4].doubleTmerName})</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 5}">${dataMap.sampleList[5].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[5].doubleTmer == true}">(${dataMap.sampleList[5].doubleTmerName})</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 6}">${dataMap.sampleList[6].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[6].doubleTmer == true}">(${dataMap.sampleList[6].doubleTmerName})</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 7}">${dataMap.sampleList[7].tempRegisterTmterNo}<c:if test="${dataMap.sampleList[7].doubleTmer == true}">(${dataMap.sampleList[7].doubleTmerName})</c:if></c:if></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td colspan="3">最小分度值</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td>${dataMap.detectData.standardTmpter_miniScale}</td>
					</c:if>
					<td><c:if test="${fn:length(dataMap.sampleList) > 0}">${dataMap.sampleList[0].tempRegisterMiniScale}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 1}">${dataMap.sampleList[1].tempRegisterMiniScale}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 2}">${dataMap.sampleList[2].tempRegisterMiniScale}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 3}">${dataMap.sampleList[3].tempRegisterMiniScale}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 4}">${dataMap.sampleList[4].tempRegisterMiniScale}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 5}">${dataMap.sampleList[5].tempRegisterMiniScale}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 6}">${dataMap.sampleList[6].tempRegisterMiniScale}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 7}">${dataMap.sampleList[7].tempRegisterMiniScale}</c:if></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td rowspan="2">
						<table style="width:100%;margin-left: 3px;">
							<tr>
								<td style="border: 0px;min-width: 10px;">名<br/>义<br/>温<br/>度</td>
								<td style="border: 0px;min-width: 10px;"><fmt:formatNumber value="${dataMap.detectData.detectTemp}" pattern="#0.#" /><br/>℃</td>
							</tr>
						</table>
					</td>
					<td rowspan="2">读数</td>
					<td>1</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td><c:if test="${dataMap.detectData.temp1>0}">+</c:if>${dataMap.detectData.temp1_input}</td>
					</c:if>
					<td><c:if test="${fn:length(dataMap.sampleList) > 0}"><c:if test="${dataMap.sampleList[0].result1Type==0}"><c:if test="${dataMap.sampleList[0].temp1>0}">+</c:if>${dataMap.sampleList[0].temp1_input}</c:if><c:if test="${dataMap.sampleList[0].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[0].result1Type==2}">超差</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 1}"><c:if test="${dataMap.sampleList[1].result1Type==0}"><c:if test="${dataMap.sampleList[1].temp1>0}">+</c:if>${dataMap.sampleList[1].temp1_input}</c:if><c:if test="${dataMap.sampleList[1].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[1].result1Type==2}">超差</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 2}"><c:if test="${dataMap.sampleList[2].result1Type==0}"><c:if test="${dataMap.sampleList[2].temp1>0}">+</c:if>${dataMap.sampleList[2].temp1_input}</c:if><c:if test="${dataMap.sampleList[2].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[2].result1Type==2}">超差</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 3}"><c:if test="${dataMap.sampleList[3].result1Type==0}"><c:if test="${dataMap.sampleList[3].temp1>0}">+</c:if>${dataMap.sampleList[3].temp1_input}</c:if><c:if test="${dataMap.sampleList[3].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[3].result1Type==2}">超差</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 4}"><c:if test="${dataMap.sampleList[4].result1Type==0}"><c:if test="${dataMap.sampleList[4].temp1>0}">+</c:if>${dataMap.sampleList[4].temp1_input}</c:if><c:if test="${dataMap.sampleList[4].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[4].result1Type==2}">超差</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 5}"><c:if test="${dataMap.sampleList[5].result1Type==0}"><c:if test="${dataMap.sampleList[5].temp1>0}">+</c:if>${dataMap.sampleList[5].temp1_input}</c:if><c:if test="${dataMap.sampleList[5].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[5].result1Type==2}">超差</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 6}"><c:if test="${dataMap.sampleList[6].result1Type==0}"><c:if test="${dataMap.sampleList[6].temp1>0}">+</c:if>${dataMap.sampleList[6].temp1_input}</c:if><c:if test="${dataMap.sampleList[6].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[6].result1Type==2}">超差</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 7}"><c:if test="${dataMap.sampleList[7].result1Type==0}"><c:if test="${dataMap.sampleList[7].temp1>0}">+</c:if>${dataMap.sampleList[7].temp1_input}</c:if><c:if test="${dataMap.sampleList[7].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[7].result1Type==2}">超差</c:if></c:if></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td>2</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td><c:if test="${dataMap.detectData.temp2>0}">+</c:if>${dataMap.detectData.temp2_input}</td>
					</c:if>
					<td><c:if test="${fn:length(dataMap.sampleList) > 0}"><c:if test="${dataMap.sampleList[0].result1Type==0}"><c:if test="${dataMap.sampleList[0].temp2>0}">+</c:if>${dataMap.sampleList[0].temp2_input}</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 1}"><c:if test="${dataMap.sampleList[1].result1Type==0}"><c:if test="${dataMap.sampleList[1].temp2>0}">+</c:if>${dataMap.sampleList[1].temp2_input}</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 2}"><c:if test="${dataMap.sampleList[2].result1Type==0}"><c:if test="${dataMap.sampleList[2].temp2>0}">+</c:if>${dataMap.sampleList[2].temp2_input}</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 3}"><c:if test="${dataMap.sampleList[3].result1Type==0}"><c:if test="${dataMap.sampleList[3].temp2>0}">+</c:if>${dataMap.sampleList[3].temp2_input}</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 4}"><c:if test="${dataMap.sampleList[4].result1Type==0}"><c:if test="${dataMap.sampleList[4].temp2>0}">+</c:if>${dataMap.sampleList[4].temp2_input}</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 5}"><c:if test="${dataMap.sampleList[5].result1Type==0}"><c:if test="${dataMap.sampleList[5].temp2>0}">+</c:if>${dataMap.sampleList[5].temp2_input}</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 6}"><c:if test="${dataMap.sampleList[6].result1Type==0}"><c:if test="${dataMap.sampleList[6].temp2>0}">+</c:if>${dataMap.sampleList[6].temp2_input}</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 7}"><c:if test="${dataMap.sampleList[7].result1Type==0}"><c:if test="${dataMap.sampleList[7].temp2>0}">+</c:if>${dataMap.sampleList[7].temp2_input}</c:if></c:if></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td colspan="3">读数平均值(℃)</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td><c:if test="${dataMap.detectData.tempAvg1>0}">+</c:if>${dataMap.detectData.tempAvg1_str}</td>
					</c:if>
					<td><c:if test="${fn:length(dataMap.sampleList) > 0}"><c:if test="${dataMap.sampleList[0].tempAvg1>0}">+</c:if>${dataMap.sampleList[0].tempAvg1_str}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 1}"><c:if test="${dataMap.sampleList[1].tempAvg1>0}">+</c:if>${dataMap.sampleList[1].tempAvg1_str}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 2}"><c:if test="${dataMap.sampleList[2].tempAvg1>0}">+</c:if>${dataMap.sampleList[2].tempAvg1_str}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 3}"><c:if test="${dataMap.sampleList[3].tempAvg1>0}">+</c:if>${dataMap.sampleList[3].tempAvg1_str}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 4}"><c:if test="${dataMap.sampleList[4].tempAvg1>0}">+</c:if>${dataMap.sampleList[4].tempAvg1_str}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 5}"><c:if test="${dataMap.sampleList[5].tempAvg1>0}">+</c:if>${dataMap.sampleList[5].tempAvg1_str}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 6}"><c:if test="${dataMap.sampleList[6].tempAvg1>0}">+</c:if>${dataMap.sampleList[6].tempAvg1_str}</c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 7}"><c:if test="${dataMap.sampleList[7].tempAvg1>0}">+</c:if>${dataMap.sampleList[7].tempAvg1_str}</c:if></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td colspan="3">检定该点后零位(℃)</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td colspan="3">标准修正值(℃)</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td><c:if test="${dataMap.detectData.standardTmpterCorrection>0}">+</c:if>${dataMap.detectData.standardTmpterCorrectionMiniScaleStr}</td>
					</c:if>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td colspan="3">温槽实际温度(℃)</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td><c:if test="${dataMap.detectData.tempReal>0}">+</c:if>${dataMap.detectData.tempReal_str}</td>
					</c:if>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td colspan="3">检定结果(℃)</td>
					<c:if test="${dataMap.detectData.standardTmpterId != null && dataMap.detectData.standardTmpterId>0}">
					<td>&nbsp;</td>
					</c:if>
					<td><c:if test="${fn:length(dataMap.sampleList) > 0}"><c:if test="${dataMap.sampleList[0].result1Type==0}"><c:if test="${dataMap.sampleList[0].result1>0}">+</c:if>${dataMap.sampleList[0].result1_str}</c:if><c:if test="${dataMap.sampleList[0].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[0].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 1}"><c:if test="${dataMap.sampleList[1].result1Type==0}"><c:if test="${dataMap.sampleList[1].result1>0}">+</c:if>${dataMap.sampleList[1].result1_str}</c:if><c:if test="${dataMap.sampleList[1].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[1].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 2}"><c:if test="${dataMap.sampleList[2].result1Type==0}"><c:if test="${dataMap.sampleList[2].result1>0}">+</c:if>${dataMap.sampleList[2].result1_str}</c:if><c:if test="${dataMap.sampleList[2].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[2].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 3}"><c:if test="${dataMap.sampleList[3].result1Type==0}"><c:if test="${dataMap.sampleList[3].result1>0}">+</c:if>${dataMap.sampleList[3].result1_str}</c:if><c:if test="${dataMap.sampleList[3].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[3].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 4}"><c:if test="${dataMap.sampleList[4].result1Type==0}"><c:if test="${dataMap.sampleList[4].result1>0}">+</c:if>${dataMap.sampleList[4].result1_str}</c:if><c:if test="${dataMap.sampleList[4].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[4].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 5}"><c:if test="${dataMap.sampleList[5].result1Type==0}"><c:if test="${dataMap.sampleList[5].result1>0}">+</c:if>${dataMap.sampleList[5].result1_str}</c:if><c:if test="${dataMap.sampleList[5].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[5].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 6}"><c:if test="${dataMap.sampleList[6].result1Type==0}"><c:if test="${dataMap.sampleList[6].result1>0}">+</c:if>${dataMap.sampleList[6].result1_str}</c:if><c:if test="${dataMap.sampleList[6].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[6].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<td><c:if test="${fn:length(dataMap.sampleList) > 7}"><c:if test="${dataMap.sampleList[7].result1Type==0}"><c:if test="${dataMap.sampleList[7].result1>0}">+</c:if>${dataMap.sampleList[7].result1_str}</c:if><c:if test="${dataMap.sampleList[7].result1Type==1}">断柱</c:if><c:if test="${dataMap.sampleList[7].result1Type==2}">超差</c:if><c:if test="${dataMap.sampleList[0].result1Type==3}">损坏</c:if></c:if></td>
					<c:if test="${dataMap.detectData.standardTmpterId == null || dataMap.detectData.standardTmpterId==0}">
					<td>&nbsp;</td>
					</c:if>
				</tr>
				<tr>
					<td colspan="3">检定依据</td>
					<td colspan="9">
						<a><input type="checkbox" onclick="return false;" style="outline: 1px solid; " <c:if test="${dataMap.detectBasis_JJG130_2011==true}">checked="checked"</c:if> />JJG130-2011</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<a><input type="checkbox" onclick="return false;" style="outline: 1px solid; " <c:if test="${dataMap.detectBasis_JJG131_2004==true}">checked="checked"</c:if>/>JJG131-2004</a>
					</td>
				</tr>
				<tr>
					<td colspan="4">检定地点: ${dataMap.detectData.address}</td>
					<td colspan="4">温度: ${dataMap.detectData.temp}℃</td>
					<td colspan="4">湿度: ${dataMap.detectData.humidity}%RH</td>
				</tr>
				<tr>
					<td colspan="4" style="text-align: left;border: 0px solid black;">检定员: </td>
					<td colspan="4" style="text-align: left;border: 0px solid black;">核验员：</td>
					<td colspan="4" style="text-align: right;border: 0px solid black;">检定时间：　<fmt:formatDate pattern="yyyy年MM月dd日" value="${dataMap.detectData.createDate}" /></td>
				</tr>
			</table>
		</div>
		</c:forEach>
	</body>
</html>