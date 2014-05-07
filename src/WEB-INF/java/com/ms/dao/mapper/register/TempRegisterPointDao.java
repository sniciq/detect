package com.ms.dao.mapper.register;

import com.ms.dao.entity.register.TempRegisterPointEty;

public interface TempRegisterPointDao extends com.eddy.dao.base.BaseDao<TempRegisterPointEty> {
	
	public void deleteByRegisterId(int registerId);
}