package com.ms.dao.mapper.register;

import java.util.List;
import java.util.Map;

import com.ms.controller.register.SampleRecordData;
import com.ms.dao.entity.register.SampleRecordEty;

public interface SampleRecordDao extends com.eddy.dao.base.BaseDao<SampleRecordEty> {

	List<SampleRecordData> selectDataByLimit(SampleRecordEty sampleRecordEty);

	SampleRecordData selectDataById(int id);

	/**
	 * 查询已经检测的温点
	 * @param tempRegisterId 登记ID
	 * @return
	 */
	List<Integer> setectDetectedTemp(Integer tempRegisterId);

	List<SampleRecordData> selectDataByTempRegister(Integer id);

	int selectTempRegisterCountByTime(Map<String, Object> paramMap);
	
}