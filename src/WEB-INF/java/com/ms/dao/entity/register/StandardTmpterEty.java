package com.ms.dao.entity.register;

import java.util.Date;

/**
 * 标准器
 *
 */
public class StandardTmpterEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private String tmterNo;	//温度计编号
	private String certificateNo;	//证书编号
	private java.lang.Double minTemp;	//最小温度
	private java.lang.Double maxTemp;	//最大温度
	private java.lang.Double miniScale;	//最小分度值
	private Integer createUserID;
	private Date createDate;

	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
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

	public Integer getCreateUserID() {
		return this.createUserID;
	}
	public void setCreateUserID(Integer createUserID) {
		this.createUserID = createUserID;
	}

	public Date getCreateDate() {
		return this.createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

}