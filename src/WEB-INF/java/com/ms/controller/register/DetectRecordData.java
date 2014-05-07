package com.ms.controller.register;

import com.ms.dao.entity.register.DetectRecordEty;

public class DetectRecordData extends DetectRecordEty {

	private String createUserName;

	private String tmterNo; // 标准器编号
	
	private java.lang.Double standardTmpter_miniScale;	//标准器最小分度值
	
	private java.lang.Double standardTmpterCorrection;//标准修正值
	
	private String standardTmpterCorrectionMiniScaleStr;//标准修正值
	
	public String getStandardTmpterCorrectionMiniScaleStr() {
		return standardTmpterCorrectionMiniScaleStr;
	}
	public void setStandardTmpterCorrectionMiniScaleStr(String standardTmpterCorrectionMiniScaleStr) {
		this.standardTmpterCorrectionMiniScaleStr = standardTmpterCorrectionMiniScaleStr;
	}
	public java.lang.Double getStandardTmpterCorrection() {
		return standardTmpterCorrection;
	}
	public void setStandardTmpterCorrection(java.lang.Double standardTmpterCorrection) {
		this.standardTmpterCorrection = standardTmpterCorrection;
	}
	public java.lang.Double getStandardTmpter_miniScale() {
		return standardTmpter_miniScale;
	}
	public void setStandardTmpter_miniScale(java.lang.Double standardTmpter_miniScale) {
		this.standardTmpter_miniScale = standardTmpter_miniScale;
	}
	/**
	* 得到 标准器编号
	* @return 标准器编号 : String
	*/
	public String getTmterNo() {
		return this.tmterNo;
	}
	/**
	 * 设置 标准器编号
	 * @param tmterNo, 标准器编号 : String
	*/
	public void setTmterNo(String tmterNo) {
		this.tmterNo = tmterNo;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

}
