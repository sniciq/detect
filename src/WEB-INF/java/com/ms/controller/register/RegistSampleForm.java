package com.ms.controller.register;

import java.util.Date;

public class RegistSampleForm {
	
	//---------------实验相关项-----------------
	private Integer detectId;
	private Integer standardTmpterId;	//标准器ID
	private String experimentNo;	//实验编号
	private String equipmentNo;	//院设备编号：RG024,RG025,RG026
	private java.lang.Double temp;	//温度
	private java.lang.Double humidity;	//湿度
	private String address;	//地点
	private Integer createUserId;//创建用户ID
	private Double detectTemp;	//名义温度
	private java.lang.Double standardTemp1;	//读数1
	private java.lang.Double standardTemp2;	//读数2
	
	private String standardTemp1_input;
	private String standardTemp2_input;
	
	private String standardTempStr;//读数字符串
	
	private String standardTempAvg1_str;
	private java.lang.Double standardTempAvg1;	//平均读数
	private java.lang.Double tempReal;	//温槽实际温度
	private String tempReal_str;
	private String detectBasis;	//测定依据:JJG123-2011\\JJG131-2004
	
	
	//---------------样本相关项-----------------
	private Integer id;	//样本ID
	private Integer tempRegisterId;	//登记ID号
	private Integer sampleNo;//样本序号
	private String sampleName;//样本名称，温度计名称，也就是是哪种温度计
	
	private java.lang.Double temp1;
	private java.lang.Double temp2;
	private String temp12Str;
	
	private String temp34Str;
	private java.lang.Double temp3;
	private java.lang.Double temp4;
	private java.lang.Double tempAvg1;
	private java.lang.Double tempAvg2;
	
	private String tempAvg1_str;
	private String tempAvg2_str;
	
	private String result;
	private Double result1;
	private Double result2;
	
	private String result1_str;
	private String result2_str;
	
	//存储用户输入的字符串内容，用于打印报表
	private String temp1_input;
	private String temp2_input;
	private String temp3_input;
	private String temp4_input;
	
	private Integer createUserID;
	private Date createDate;
	
	public Integer getDetectId() {
		return detectId;
	}
	public void setDetectId(Integer detectId) {
		this.detectId = detectId;
	}
	public String getStandardTempAvg1_str() {
		return standardTempAvg1_str;
	}
	public void setStandardTempAvg1_str(String standardTempAvg1_str) {
		this.standardTempAvg1_str = standardTempAvg1_str;
	}
	public String getTempReal_str() {
		return tempReal_str;
	}
	public void setTempReal_str(String tempReal_str) {
		this.tempReal_str = tempReal_str;
	}
	public String getTempAvg1_str() {
		return tempAvg1_str;
	}
	public void setTempAvg1_str(String tempAvg1_str) {
		this.tempAvg1_str = tempAvg1_str;
	}
	public String getTempAvg2_str() {
		return tempAvg2_str;
	}
	public void setTempAvg2_str(String tempAvg2_str) {
		this.tempAvg2_str = tempAvg2_str;
	}
	public String getResult1_str() {
		return result1_str;
	}
	public void setResult1_str(String result1_str) {
		this.result1_str = result1_str;
	}
	public String getResult2_str() {
		return result2_str;
	}
	public void setResult2_str(String result2_str) {
		this.result2_str = result2_str;
	}
	public String getStandardTemp1_input() {
		return standardTemp1_input;
	}
	public void setStandardTemp1_input(String standardTemp1_input) {
		this.standardTemp1_input = standardTemp1_input;
	}
	public String getStandardTemp2_input() {
		return standardTemp2_input;
	}
	public void setStandardTemp2_input(String standardTemp2_input) {
		this.standardTemp2_input = standardTemp2_input;
	}
	public String getTemp1_input() {
		return temp1_input;
	}
	public void setTemp1_input(String temp1_input) {
		this.temp1_input = temp1_input;
	}
	public String getTemp2_input() {
		return temp2_input;
	}
	public void setTemp2_input(String temp2_input) {
		this.temp2_input = temp2_input;
	}
	public String getTemp3_input() {
		return temp3_input;
	}
	public void setTemp3_input(String temp3_input) {
		this.temp3_input = temp3_input;
	}
	public String getTemp4_input() {
		return temp4_input;
	}
	public void setTemp4_input(String temp4_input) {
		this.temp4_input = temp4_input;
	}
	public String getStandardTempStr() {
		return standardTempStr;
	}
	public void setStandardTempStr(String standardTempStr) {
		this.standardTempStr = standardTempStr;
	}
	public Double getResult1() {
		return result1;
	}
	public void setResult1(Double result1) {
		this.result1 = result1;
	}
	public Double getResult2() {
		return result2;
	}
	public void setResult2(Double result2) {
		this.result2 = result2;
	}
	public String getSampleName() {
		return sampleName;
	}
	public void setSampleName(String sampleName) {
		this.sampleName = sampleName;
	}
	public Integer getTempRegisterId() {
		return tempRegisterId;
	}
	public void setTempRegisterId(Integer tempRegisterId) {
		this.tempRegisterId = tempRegisterId;
	}
	public Integer getSampleNo() {
		return sampleNo;
	}
	public void setSampleNo(Integer sampleNo) {
		this.sampleNo = sampleNo;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public java.lang.Double getTemp1() {
		return temp1;
	}
	public void setTemp1(java.lang.Double temp1) {
		this.temp1 = temp1;
	}
	public java.lang.Double getTemp2() {
		return temp2;
	}
	public void setTemp2(java.lang.Double temp2) {
		this.temp2 = temp2;
	}
	public java.lang.Double getTemp3() {
		return temp3;
	}
	public void setTemp3(java.lang.Double temp3) {
		this.temp3 = temp3;
	}
	public java.lang.Double getTemp4() {
		return temp4;
	}
	public void setTemp4(java.lang.Double temp4) {
		this.temp4 = temp4;
	}
	public java.lang.Double getTempAvg1() {
		return tempAvg1;
	}
	public void setTempAvg1(java.lang.Double tempAvg1) {
		this.tempAvg1 = tempAvg1;
	}
	public java.lang.Double getTempAvg2() {
		return tempAvg2;
	}
	public void setTempAvg2(java.lang.Double tempAvg2) {
		this.tempAvg2 = tempAvg2;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Integer getCreateUserID() {
		return createUserID;
	}
	public void setCreateUserID(Integer createUserID) {
		this.createUserID = createUserID;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Integer getStandardTmpterId() {
		return standardTmpterId;
	}
	public void setStandardTmpterId(Integer standardTmpterId) {
		this.standardTmpterId = standardTmpterId;
	}
	public String getExperimentNo() {
		return experimentNo;
	}
	public void setExperimentNo(String experimentNo) {
		this.experimentNo = experimentNo;
	}
	public String getEquipmentNo() {
		return equipmentNo;
	}
	public void setEquipmentNo(String equipmentNo) {
		this.equipmentNo = equipmentNo;
	}
	public java.lang.Double getTemp() {
		return temp;
	}
	public void setTemp(java.lang.Double temp) {
		this.temp = temp;
	}
	public java.lang.Double getHumidity() {
		return humidity;
	}
	public void setHumidity(java.lang.Double humidity) {
		this.humidity = humidity;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Integer getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}
	public Double getDetectTemp() {
		return detectTemp;
	}
	public void setDetectTemp(Double detectTemp) {
		this.detectTemp = detectTemp;
	}
	public java.lang.Double getStandardTemp1() {
		return standardTemp1;
	}
	public void setStandardTemp1(java.lang.Double standardTemp1) {
		this.standardTemp1 = standardTemp1;
	}
	public java.lang.Double getStandardTemp2() {
		return standardTemp2;
	}
	public void setStandardTemp2(java.lang.Double standardTemp2) {
		this.standardTemp2 = standardTemp2;
	}
	
	public java.lang.Double getStandardTempAvg1() {
		return standardTempAvg1;
	}
	public void setStandardTempAvg1(java.lang.Double standardTempAvg1) {
		this.standardTempAvg1 = standardTempAvg1;
	}
	public java.lang.Double getTempReal() {
		return tempReal;
	}
	public void setTempReal(java.lang.Double tempReal) {
		this.tempReal = tempReal;
	}
	public String getDetectBasis() {
		return detectBasis;
	}
	public void setDetectBasis(String detectBasis) {
		this.detectBasis = detectBasis;
	}
	public String getTemp12Str() {
		return temp12Str;
	}
	public void setTemp12Str(String temp12Str) {
		this.temp12Str = temp12Str;
	}
	public String getTemp34Str() {
		return temp34Str;
	}
	public void setTemp34Str(String temp34Str) {
		this.temp34Str = temp34Str;
	}
}
