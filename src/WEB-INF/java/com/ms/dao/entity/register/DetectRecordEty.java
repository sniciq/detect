package com.ms.dao.entity.register;

import java.util.Date;

public class DetectRecordEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private Integer standardTmpterId;	//标准器ID
	private String experimentNo;	//实验编号
	private String equipmentNo;	//院设备编号：RG024,RG025,RG026
	private String temp;	//温度
	private String humidity;	//湿度
	private String address;	//地点
	private Date createDate;	//时间
	private Integer createUserId;//创建用户ID
	private Double detectTemp;	//名义温度
	private java.lang.Double temp1;	//读数1
	private java.lang.Double temp2;	//读数2
	private java.lang.Double temp3;	//(湿度)读数1
	private java.lang.Double temp4;	//(湿度)读数2
	private java.lang.Double tempAvg1;	//平均读数
	private java.lang.Double tempAvg2;	//平均读数2（湿度）
	private java.lang.Double tempReal;	//温槽实际温度
	private String detectBasis;	//测定依据:JJG123-2011\\JJG131-2004
	
	//存储用户输入的字符串内容，用于打印报表
	private String temp1_input;
	private String temp2_input;
	private String temp3_input;
	private String temp4_input;
	
	private String tempAvg1_str;
	private String tempAvg2_str;
	private String tempReal_str;
	
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
	public String getTempReal_str() {
		return tempReal_str;
	}
	public void setTempReal_str(String tempReal_str) {
		this.tempReal_str = tempReal_str;
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
	public Integer getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}
	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	* 得到 标准器ID
	* @return 标准器ID : Integer
	*/
	public Integer getStandardTmpterId() {
		return this.standardTmpterId;
	}
	/**
	 * 设置 标准器ID
	 * @param standardTmpterId, 标准器ID : Integer
	*/
	public void setStandardTmpterId(Integer standardTmpterId) {
		this.standardTmpterId = standardTmpterId;
	}

	/**
	* 得到 实验编号
	* @return 实验编号 : String
	*/
	public String getExperimentNo() {
		return this.experimentNo;
	}
	/**
	 * 设置 实验编号
	 * @param experimentNo, 实验编号 : String
	*/
	public void setExperimentNo(String experimentNo) {
		this.experimentNo = experimentNo;
	}

	/**
	* 得到 院设备编号：RG024,RG025,RG026
	* @return 院设备编号：RG024,RG025,RG026 : String
	*/
	public String getEquipmentNo() {
		return this.equipmentNo;
	}
	/**
	 * 设置 院设备编号：RG024,RG025,RG026
	 * @param equipmentNo, 院设备编号：RG024,RG025,RG026 : String
	*/
	public void setEquipmentNo(String equipmentNo) {
		this.equipmentNo = equipmentNo;
	}

	/**
	* 得到 温度
	* @return 温度 : java.lang.Double
	*/
	public String getTemp() {
		return this.temp;
	}
	/**
	 * 设置 温度
	 * @param temp, 温度 : java.lang.Double
	*/
	public void setTemp(String temp) {
		this.temp = temp;
	}

	/**
	* 得到 湿度
	* @return 湿度 : java.lang.Double
	*/
	public String getHumidity() {
		return this.humidity;
	}
	/**
	 * 设置 湿度
	 * @param humidity, 湿度 : java.lang.Double
	*/
	public void setHumidity(String humidity) {
		this.humidity = humidity;
	}

	/**
	* 得到 地点
	* @return 地点 : String
	*/
	public String getAddress() {
		return this.address;
	}
	/**
	 * 设置 地点
	 * @param address, 地点 : String
	*/
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	* 得到 时间
	* @return 时间 : String
	*/
	public Date getCreateDate() {
		return this.createDate;
	}
	/**
	 * 设置 时间
	 * @param createDate, 时间 : String
	*/
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	/**
	* 得到 名义温度
	* @return 名义温度 : Integer
	*/
	public Double getDetectTemp() {
		return this.detectTemp;
	}
	/**
	 * 设置 名义温度
	 * @param detectTemp, 名义温度 : Integer
	*/
	public void setDetectTemp(Double detectTemp) {
		this.detectTemp = detectTemp;
	}

	/**
	* 得到 读数1
	* @return 读数1 : java.lang.Double
	*/
	public java.lang.Double getTemp1() {
		return this.temp1;
	}
	/**
	 * 设置 读数1
	 * @param temp1, 读数1 : java.lang.Double
	*/
	public void setTemp1(java.lang.Double temp1) {
		this.temp1 = temp1;
	}

	/**
	* 得到 读数2
	* @return 读数2 : java.lang.Double
	*/
	public java.lang.Double getTemp2() {
		return this.temp2;
	}
	/**
	 * 设置 读数2
	 * @param temp2, 读数2 : java.lang.Double
	*/
	public void setTemp2(java.lang.Double temp2) {
		this.temp2 = temp2;
	}

	/**
	* 得到 读数3(干度2)
	* @return 读数3(干度2) : java.lang.Double
	*/
	public java.lang.Double getTemp3() {
		return this.temp3;
	}
	/**
	 * 设置 读数3(干度2)
	 * @param temp3, 读数3(干度2) : java.lang.Double
	*/
	public void setTemp3(java.lang.Double temp3) {
		this.temp3 = temp3;
	}

	/**
	* 得到 读数4湿度2)
	* @return 读数4湿度2) : java.lang.Double
	*/
	public java.lang.Double getTemp4() {
		return this.temp4;
	}
	/**
	 * 设置 读数4湿度2)
	 * @param temp4, 读数4湿度2) : java.lang.Double
	*/
	public void setTemp4(java.lang.Double temp4) {
		this.temp4 = temp4;
	}

	/**
	* 得到 平均读数
	* @return 平均读数 : java.lang.Double
	*/
	public java.lang.Double getTempAvg1() {
		return this.tempAvg1;
	}
	/**
	 * 设置 平均读数
	 * @param tempAvg1, 平均读数 : java.lang.Double
	*/
	public void setTempAvg1(java.lang.Double tempAvg1) {
		this.tempAvg1 = tempAvg1;
	}

	/**
	* 得到 平均读数2（湿度）
	* @return 平均读数2（湿度） : java.lang.Double
	*/
	public java.lang.Double getTempAvg2() {
		return this.tempAvg2;
	}
	/**
	 * 设置 平均读数2（湿度）
	 * @param tempAvg2, 平均读数2（湿度） : java.lang.Double
	*/
	public void setTempAvg2(java.lang.Double tempAvg2) {
		this.tempAvg2 = tempAvg2;
	}

	/**
	* 得到 温槽实际温度
	* @return 温槽实际温度 : java.lang.Double
	*/
	public java.lang.Double getTempReal() {
		return this.tempReal;
	}
	/**
	 * 设置 温槽实际温度
	 * @param tempReal, 温槽实际温度 : java.lang.Double
	*/
	public void setTempReal(java.lang.Double tempReal) {
		this.tempReal = tempReal;
	}

	/**
	* 得到 测定依据:JJG123-2011\\JJG131-2004
	* @return 测定依据:JJG123-2011\\JJG131-2004 : String
	*/
	public String getDetectBasis() {
		return this.detectBasis;
	}
	/**
	 * 设置 测定依据:JJG123-2011\\JJG131-2004
	 * @param detectBasis, 测定依据:JJG123-2011\\JJG131-2004 : String
	*/
	public void setDetectBasis(String detectBasis) {
		this.detectBasis = detectBasis;
	}

}