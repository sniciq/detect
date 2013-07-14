package com.ms.dao.mapper.register;

import java.util.List;

import com.ms.controller.register.TempRegisterData;
import com.ms.dao.entity.register.TempRegisterEty;

public interface TempRegisterDao extends com.eddy.dao.base.BaseDao<TempRegisterEty> {

	List<TempRegisterData> selectDataByLimit(TempRegisterEty tempRegisterEty);
}