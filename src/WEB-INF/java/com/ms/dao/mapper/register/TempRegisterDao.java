package com.ms.dao.mapper.register;

import java.util.List;
import java.util.Map;

import com.ms.controller.register.RegistReportData;
import com.ms.controller.register.TempRegisterControllerForm;
import com.ms.controller.register.TempRegisterData;
import com.ms.dao.entity.register.TempRegisterEty;

/**
 * 样品登记
 *
 */
public interface TempRegisterDao extends com.eddy.dao.base.BaseDao<TempRegisterEty> {

	List<TempRegisterData> selectDataByLimit(TempRegisterEty tempRegisterEty);

	int selectLimitCountByForm(TempRegisterControllerForm form);

	List<TempRegisterData> selectDataByLimitByForm(TempRegisterControllerForm form);

	/**
	 * 查询登记表信息
	 * @param paramMap
	 * @return
	 */
	List<RegistReportData> selectRegistReportData(Map<String, Object> paramMap);

	/**
	 * 通过编号得到最近登记的
	 * @param tmterNo
	 * @return
	 */
	List<TempRegisterData> selectRecentByTmterNo(String tmterNo);

	TempRegisterEty selectRecentByAccurateTmterNo(String tmterNo);

	int selectCountByTmterNo(Map<String, Object> paramMap);
}