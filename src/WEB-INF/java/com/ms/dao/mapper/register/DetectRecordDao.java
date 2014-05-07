package com.ms.dao.mapper.register;

import java.util.List;

import com.ms.controller.register.DetectRecordData;
import com.ms.controller.register.DetectRecordForm;
import com.ms.dao.entity.register.DetectRecordEty;

public interface DetectRecordDao extends com.eddy.dao.base.BaseDao<DetectRecordEty> {

	int selectLimitCountByForm(DetectRecordForm searchForm);
	
	List<DetectRecordData> selectDataByLimit(DetectRecordEty detectRecordEty);

	DetectRecordData selectDataById(int id);

	int selectTodayCount(String todayStr);
	
}