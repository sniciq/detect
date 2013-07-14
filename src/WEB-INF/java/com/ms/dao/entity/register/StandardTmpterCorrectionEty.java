package com.ms.dao.entity.register;
public class StandardTmpterCorrectionEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private Integer standardTmpterId;	//标准器ID
	private java.lang.Double value;	//计数值
	private java.lang.Double correction;	//修正值

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
	* 得到 计数值
	* @return 计数值 : java.lang.Double
	*/
	public java.lang.Double getValue() {
		return this.value;
	}
	/**
	 * 设置 计数值
	 * @param value, 计数值 : java.lang.Double
	*/
	public void setValue(java.lang.Double value) {
		this.value = value;
	}

	/**
	* 得到 修正值
	* @return 修正值 : java.lang.Double
	*/
	public java.lang.Double getCorrection() {
		return this.correction;
	}
	/**
	 * 设置 修正值
	 * @param correction, 修正值 : java.lang.Double
	*/
	public void setCorrection(java.lang.Double correction) {
		this.correction = correction;
	}

}