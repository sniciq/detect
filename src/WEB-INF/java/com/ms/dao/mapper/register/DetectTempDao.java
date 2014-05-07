package com.ms.dao.mapper.register;

import java.util.List;

import com.ms.dao.entity.register.DetectTempEty;

public interface DetectTempDao extends com.eddy.dao.base.BaseDao<DetectTempEty> {

	int selectCustomerNameCount(DetectTempEty detectTempEty);

	List<DetectTempEty> selectCustomerNameByLimit(DetectTempEty detectTempEty);
}