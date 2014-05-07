package com.ms.controller.register;

import com.ms.dao.entity.register.TempRegisterEty;

public class TempRegisterData extends TempRegisterEty {
	private String createUserName;
	
	private String detectedPonits;
	private String needDetectPonits;
	private String tbDetectedPonits;
	
	public String getTbDetectedPonits() {
		return tbDetectedPonits;
	}

	public void setTbDetectedPonits(String tbDetectedPonits) {
		this.tbDetectedPonits = tbDetectedPonits;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getDetectedPonits() {
		return detectedPonits;
	}

	public void setDetectedPonits(String detectedPonits) {
		this.detectedPonits = detectedPonits;
	}

	public String getNeedDetectPonits() {
		return needDetectPonits;
	}

	public void setNeedDetectPonits(String needDetectPonits) {
		this.needDetectPonits = needDetectPonits;
	}

}
