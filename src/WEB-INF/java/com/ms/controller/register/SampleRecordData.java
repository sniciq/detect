package com.ms.controller.register;

import com.ms.dao.entity.register.SampleRecordEty;

public class SampleRecordData extends SampleRecordEty {
	
	private String experimentNo;	//实验编号
	private Double detectTemp;	//名义温度
	
	private String tempRegisterTmterNo;//检测登记的编号
	private String tempRegisterSampleNo;//登记样本编号
	private String tempRegisterTmerName;//检测登记的仪器名称，用于判断是否是干湿温度计
	private String tempRegisterMiniScale;//最小分度值
	private String createUserName;
	private boolean doubleTmer = false;//是否是干湿温度计
	private String doubleTmerName = "干";//干还是湿
	
	public String getDoubleTmerName() {
		return doubleTmerName;
	}
	public void setDoubleTmerName(String doubleTmerName) {
		this.doubleTmerName = doubleTmerName;
	}
	public Double getDetectTemp() {
		return detectTemp;
	}
	public void setDetectTemp(Double detectTemp) {
		this.detectTemp = detectTemp;
	}
	public String getTempRegisterSampleNo() {
		return tempRegisterSampleNo;
	}
	public void setTempRegisterSampleNo(String tempRegisterSampleNo) {
		this.tempRegisterSampleNo = tempRegisterSampleNo;
	}
	public boolean isDoubleTmer() {
		return doubleTmer;
	}
	public void setDoubleTmer(boolean doubleTmer) {
		this.doubleTmer = doubleTmer;
	}
	public String getTempRegisterTmerName() {
		return tempRegisterTmerName;
	}
	public void setTempRegisterTmerName(String tempRegisterTmerName) {
		this.tempRegisterTmerName = tempRegisterTmerName;
	}
	public String getTempRegisterMiniScale() {
		return tempRegisterMiniScale;
	}
	public void setTempRegisterMiniScale(String tempRegisterMiniScale) {
		this.tempRegisterMiniScale = tempRegisterMiniScale;
	}
	public String getTempRegisterTmterNo() {
		return tempRegisterTmterNo;
	}
	public void setTempRegisterTmterNo(String tempRegisterTmterNo) {
		this.tempRegisterTmterNo = tempRegisterTmterNo;
	}
	public String getExperimentNo() {
		return experimentNo;
	}
	public void setExperimentNo(String experimentNo) {
		this.experimentNo = experimentNo;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
}
