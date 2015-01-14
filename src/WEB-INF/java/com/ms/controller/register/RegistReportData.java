package com.ms.controller.register;

public class RegistReportData {
	private Integer id;
	private String unit;	//送检单位
	private String tmerName;//仪器名称
	private String tmterNo;	//编号
	private String sampleNo;	//样品编号
	private String style;//型号规格
	private String miniScale;	//最小分度值
	private String immersionType;//浸没方式(全浸、局浸)
	private String minTemp;	//最小温度
	private String maxTemp;	//最大温度
	private String manufacturer;
	private String tmerType;
	private String result;
	
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	public String getTmerType() {
		return tmerType;
	}
	public void setTmerType(String tmerType) {
		this.tmerType = tmerType;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getMiniScale() {
		return miniScale;
	}
	public void setMiniScale(String miniScale) {
		this.miniScale = miniScale;
	}
	public String getImmersionType() {
		return immersionType;
	}
	public void setImmersionType(String immersionType) {
		this.immersionType = immersionType;
	}
	public String getMinTemp() {
		return minTemp;
	}
	public void setMinTemp(String minTemp) {
		this.minTemp = minTemp;
	}
	public String getMaxTemp() {
		return maxTemp;
	}
	public void setMaxTemp(String maxTemp) {
		this.maxTemp = maxTemp;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getTmerName() {
		return tmerName;
	}
	public void setTmerName(String tmerName) {
		this.tmerName = tmerName;
	}
	public String getTmterNo() {
		return tmterNo;
	}
	public void setTmterNo(String tmterNo) {
		this.tmterNo = tmterNo;
	}
	public String getSampleNo() {
		return sampleNo;
	}
	public void setSampleNo(String sampleNo) {
		this.sampleNo = sampleNo;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	
}
