package com.ms.controller.register;

import java.util.Date;

import com.ms.dao.entity.register.DetectRecordEty;

public class DetectRecordForm extends DetectRecordEty {
	private Date startDate;
	private Date endDate;
	
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

}
