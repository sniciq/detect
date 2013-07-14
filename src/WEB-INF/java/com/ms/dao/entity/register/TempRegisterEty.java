package com.ms.dao.entity.register;

import java.util.Date;

public class TempRegisterEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;	//ID
	private String unit;	//送检单位
	private String tmerName;	//温度计名称:水银温度计，煤油温度计，干湿温度计
	private java.lang.Double minTemp;	//最小温度
	private java.lang.Double maxTemp;	//最大温度
	private java.lang.Double miniScale;	//最小分度值
	private String manufacturer;	//生产厂家
	private String tmterNo;	//温度计编号
	private String sampleNo;	//样品编号
	private String certificateNo;	//证书编号
	private String result;	//检测结果：“待测”、“合格”、“不合格”、“断柱”、“损坏”
	private Integer createUserID;	//创建人
	private Date createDate;	//创建时间

	/**
	* 得到 ID
	* @return ID : Integer
	*/
	public Integer getId() {
		return this.id;
	}
	/**
	 * 设置 ID
	 * @param id, ID : Integer
	*/
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	* 得到 送检单位
	* @return 送检单位 : String
	*/
	public String getUnit() {
		return this.unit;
	}
	/**
	 * 设置 送检单位
	 * @param unit, 送检单位 : String
	*/
	public void setUnit(String unit) {
		this.unit = unit;
	}

	/**
	* 得到 温度计名称:水银温度计，煤油温度计，干湿温度计
	* @return 温度计名称:水银温度计，煤油温度计，干湿温度计 : String
	*/
	public String getTmerName() {
		return this.tmerName;
	}
	/**
	 * 设置 温度计名称:水银温度计，煤油温度计，干湿温度计
	 * @param tmerName, 温度计名称:水银温度计，煤油温度计，干湿温度计 : String
	*/
	public void setTmerName(String tmerName) {
		this.tmerName = tmerName;
	}

	/**
	* 得到 最小温度
	* @return 最小温度 : java.lang.Double
	*/
	public java.lang.Double getMinTemp() {
		return this.minTemp;
	}
	/**
	 * 设置 最小温度
	 * @param minTemp, 最小温度 : java.lang.Double
	*/
	public void setMinTemp(java.lang.Double minTemp) {
		this.minTemp = minTemp;
	}

	/**
	* 得到 最大温度
	* @return 最大温度 : java.lang.Double
	*/
	public java.lang.Double getMaxTemp() {
		return this.maxTemp;
	}
	/**
	 * 设置 最大温度
	 * @param maxTemp, 最大温度 : java.lang.Double
	*/
	public void setMaxTemp(java.lang.Double maxTemp) {
		this.maxTemp = maxTemp;
	}

	/**
	* 得到 最小分度值
	* @return 最小分度值 : java.lang.Double
	*/
	public java.lang.Double getMiniScale() {
		return this.miniScale;
	}
	/**
	 * 设置 最小分度值
	 * @param miniScale, 最小分度值 : java.lang.Double
	*/
	public void setMiniScale(java.lang.Double miniScale) {
		this.miniScale = miniScale;
	}

	/**
	* 得到 生产厂家
	* @return 生产厂家 : String
	*/
	public String getManufacturer() {
		return this.manufacturer;
	}
	/**
	 * 设置 生产厂家
	 * @param manufacturer, 生产厂家 : String
	*/
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	/**
	* 得到 温度计编号
	* @return 温度计编号 : String
	*/
	public String getTmterNo() {
		return this.tmterNo;
	}
	/**
	 * 设置 温度计编号
	 * @param tmterNo, 温度计编号 : String
	*/
	public void setTmterNo(String tmterNo) {
		this.tmterNo = tmterNo;
	}

	/**
	* 得到 样品编号
	* @return 样品编号 : String
	*/
	public String getSampleNo() {
		return this.sampleNo;
	}
	/**
	 * 设置 样品编号
	 * @param sampleNo, 样品编号 : String
	*/
	public void setSampleNo(String sampleNo) {
		this.sampleNo = sampleNo;
	}

	/**
	* 得到 证书编号
	* @return 证书编号 : String
	*/
	public String getCertificateNo() {
		return this.certificateNo;
	}
	/**
	 * 设置 证书编号
	 * @param certificateNo, 证书编号 : String
	*/
	public void setCertificateNo(String certificateNo) {
		this.certificateNo = certificateNo;
	}

	/**
	* 得到 检测结果：“待测”、“合格”、“不合格”、“断柱”、“损坏”
	* @return 检测结果：“待测”、“合格”、“不合格”、“断柱”、“损坏” : String
	*/
	public String getResult() {
		return this.result;
	}
	/**
	 * 设置 检测结果：“待测”、“合格”、“不合格”、“断柱”、“损坏”
	 * @param result, 检测结果：“待测”、“合格”、“不合格”、“断柱”、“损坏” : String
	*/
	public void setResult(String result) {
		this.result = result;
	}

	/**
	* 得到 创建人
	* @return 创建人 : Integer
	*/
	public Integer getCreateUserID() {
		return this.createUserID;
	}
	/**
	 * 设置 创建人
	 * @param createUserID, 创建人 : Integer
	*/
	public void setCreateUserID(Integer createUserID) {
		this.createUserID = createUserID;
	}

	/**
	* 得到 创建时间
	* @return 创建时间 : Date
	*/
	public Date getCreateDate() {
		return this.createDate;
	}
	/**
	 * 设置 创建时间
	 * @param createDate, 创建时间 : Date
	*/
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

}