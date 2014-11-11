package com.ms.dao.entity.register;

import java.util.Date;

public class SampleRecordEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;	//样本ID
	private Integer detectID;//实验ID
	
	private Integer tempRegisterId;	//登记编号, 对应TempRegisterEty
	private Integer sampleNo;//样本序号
	
	private java.lang.Double temp1;//读数１
	private java.lang.Double temp2;//读数2
	private java.lang.Double temp3;//湿度１
	private java.lang.Double temp4;//湿度2
	
	private java.lang.Double tempAvg1;
	private java.lang.Double tempAvg2;
	private Double result1;
	private Double result2;
	private String result;
	
	//存储用户输入的字符串内容，用于打印报表
	private String temp1_input;
	private String temp2_input;
	private String temp3_input;
	private String temp4_input;
	
	private Integer createUserID;
	private Date createDate;
	
	private Date startDate;
	private Date endDate;
	private String tempRegisterTmterNo;
	
	private String tempAvg1_str;
	private String tempAvg2_str;
	private String result1_str;
	private String result2_str;
	
	private Integer result1Type;//0:正常,1:断柱,2:超差,3:损坏
	private Integer result2Type;//0:正常,1:断柱,2:超差,3:损坏
	public Integer getResult1Type() {
		return result1Type;
	}
	public void setResult1Type(Integer result1Type) {
		this.result1Type = result1Type;
	}
	public Integer getResult2Type() {
		return result2Type;
	}
	public void setResult2Type(Integer result2Type) {
		this.result2Type = result2Type;
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
	public String getTempRegisterTmterNo() {
		return tempRegisterTmterNo;
	}
	public void setTempRegisterTmterNo(String tempRegisterTmterNo) {
		this.tempRegisterTmterNo = tempRegisterTmterNo;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Double getResult1() {
		return result1;
	}
	public void setResult1(Double result1) {
		if(result1 != null && result1 == -0.0) {
			result1 = 0.0;
		}
		this.result1 = result1;
	}
	public Double getResult2() {
		return result2;
	}
	public void setResult2(Double result2) {
		if(result2 != null && result2 == -0.0) {
			result2 = 0.0;
		}
		this.result2 = result2;
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
	/**
	* 得到 样本ID
	* @return 样本ID : Integer
	*/
	public Integer getId() {
		return this.id;
	}
	/**
	 * 设置 样本ID
	 * @param id, 样本ID : Integer
	*/
	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDetectID() {
		return this.detectID;
	}
	public void setDetectID(Integer detectID) {
		this.detectID = detectID;
	}

	public java.lang.Double getTemp1() {
		return this.temp1;
	}
	public void setTemp1(java.lang.Double temp1) {
		this.temp1 = temp1;
	}

	public java.lang.Double getTemp2() {
		return this.temp2;
	}
	public void setTemp2(java.lang.Double temp2) {
		this.temp2 = temp2;
	}

	public java.lang.Double getTemp3() {
		return this.temp3;
	}
	public void setTemp3(java.lang.Double temp3) {
		this.temp3 = temp3;
	}

	public java.lang.Double getTemp4() {
		return this.temp4;
	}
	public void setTemp4(java.lang.Double temp4) {
		this.temp4 = temp4;
	}

	public java.lang.Double getTempAvg1() {
		return this.tempAvg1;
	}
	public void setTempAvg1(java.lang.Double tempAvg1) {
		this.tempAvg1 = tempAvg1;
	}

	public java.lang.Double getTempAvg2() {
		return this.tempAvg2;
	}
	public void setTempAvg2(java.lang.Double tempAvg2) {
		this.tempAvg2 = tempAvg2;
	}

	public String getResult() {
		return this.result;
	}
	public void setResult(String result) {
		this.result = result;
	}

}