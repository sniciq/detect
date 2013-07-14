package com.ms.controller.register;

import com.ms.dao.entity.register.TempRegisterEty;

public class TempRegisterData extends TempRegisterEty {
	private String createUserName;

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

}
