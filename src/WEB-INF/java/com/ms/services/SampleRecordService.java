package com.ms.services;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.eddy.util.ExtLimit;
import com.ms.controller.register.DetectRecordData;
import com.ms.dao.entity.register.SampleRecordEty;
import com.ms.dao.entity.register.TempRegisterEty;
import com.ms.dao.mapper.register.DetectRecordDao;
import com.ms.dao.mapper.register.SampleRecordDao;
import com.ms.dao.mapper.register.TempRegisterDao;
import com.ms.util.MiniScaleUtil;

@Service
@Scope(value = "singleton")
public class SampleRecordService {
	
	private Logger logger = Logger.getLogger(getClass());

	@Autowired
	private DetectRecordDao detectRecordDao;
	
	@Autowired
	private SampleRecordDao sampleRecordDao;
	
	@Autowired
	private TempRegisterDao tempRegisterDao;

	/**
	 * 实验信息更新后重新计算
	 * @param detectRecordId
	 */
	public void updateSampleRecords(int detectRecordId) {
		try {
			DetectRecordData detectData = detectRecordDao.selectDataById(detectRecordId);
			double tempReal = detectData.getTempReal();
			double detectTemp = detectData.getDetectTemp();
			
			SampleRecordEty se = new SampleRecordEty();
			ExtLimit limit = new ExtLimit();
			limit.setSort("sampleNo");
			limit.setDir("ASC");
			se.setExtLimit(limit);
			se.setDetectID(detectData.getId());
			List<SampleRecordEty> sampleList = sampleRecordDao.selectByEntity(se);
			for(SampleRecordEty ety : sampleList) {
				TempRegisterEty tempRegisterEty = tempRegisterDao.selectById(ety.getTempRegisterId());
				double miniScale = Double.parseDouble(tempRegisterEty.getMiniScale());
				double av = (ety.getTemp1() + ety.getTemp2()) / 2 * miniScale * 0.1;
				av = MiniScaleUtil.convertWithMiniScale(av, miniScale);
				ety.setTempAvg1(av);;
				ety.setTempAvg1_str(MiniScaleUtil.stringValueAsMiniScale(av, miniScale));
				
				if(detectTemp == 0) {//在0度的时候直接就是不用标准器，检定结果就是读数平均值的相反数
					ety.setResult1(av * -1);
					ety.setResult1_str(MiniScaleUtil.stringValueAsMiniScale(av * -1, miniScale));
				}
				else {
					double r = tempReal - av;
					r = Math.round((r * 10 / miniScale)) * miniScale / 10;
					r = MiniScaleUtil.convertWithMiniScale(r, miniScale);
					ety.setResult1(r);
					ety.setResult1_str(MiniScaleUtil.stringValueAsMiniScale(r, miniScale));
				}
				
				if(tempRegisterEty.getTmerName().equals("干湿球温度计")) {
					av = (ety.getTemp3() + ety.getTemp4()) / 2 * miniScale * 0.1;
					av = MiniScaleUtil.convertWithMiniScale(av, miniScale);
					ety.setTempAvg2(av);;
					ety.setTempAvg2_str(MiniScaleUtil.stringValueAsMiniScale(av, miniScale));
					
					if(detectTemp == 0) {//在0度的时候直接就是不用标准器，检定结果就是读数平均值的相反数
						ety.setResult2(av * -1);
						ety.setResult2_str(MiniScaleUtil.stringValueAsMiniScale(av * -1, miniScale));
					}
					else {
						double r = tempReal - ety.getTempAvg2();
						r = Math.round((r * 10 / miniScale)) * miniScale / 10;
						r = MiniScaleUtil.convertWithMiniScale(r, miniScale);
						ety.setResult2(r);
						ety.setResult2_str(MiniScaleUtil.stringValueAsMiniScale(r, miniScale));
					}
					
				}
				sampleRecordDao.updateById(ety);
			}
		}
		catch(Exception e) {
			logger.error("实验信息更新后重新计算样本数据错误!", e);;
		}
	}
}
