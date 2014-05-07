package com.ms.controller.register;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eddy.util.DateJsonValueProcessor;
import com.eddy.util.ExtLimit;
import com.eddy.util.JSONGrid;
import com.ms.dao.entity.basic.UserEty;
import com.ms.dao.entity.register.DetectRecordEty;
import com.ms.dao.entity.register.SampleRecordEty;
import com.ms.dao.entity.register.StandardTmpterCorrectionEty;
import com.ms.dao.entity.register.StandardTmpterEty;
import com.ms.dao.mapper.register.DetectRecordDao;
import com.ms.dao.mapper.register.SampleRecordDao;
import com.ms.dao.mapper.register.StandardTmpterCorrectionDao;
import com.ms.dao.mapper.register.StandardTmpterDao;
import com.ms.services.SampleRecordService;
import com.ms.util.MiniScaleUtil;

/**
 * 实验查询
 *
 */
@Controller
@RequestMapping("/register/DetectRecordController/")
public class DetectRecordController {

	private Logger logger = Logger.getLogger(getClass());

	@Autowired
	private DetectRecordDao detectRecordDao;
	
	@Autowired
	private SampleRecordDao sampleRecordDao;
	
	@Autowired
	private SampleRecordService sampleRecordService;
	
	@Autowired
	private StandardTmpterDao standardTmpterDao;
	
	@Autowired
	private StandardTmpterCorrectionDao standardTmpterCorrectionDao;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, DetectRecordForm searchForm) throws Exception {
		int count = detectRecordDao.selectLimitCountByForm(searchForm);
		List<DetectRecordData> list = detectRecordDao.selectDataByLimit(searchForm);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		return retObj.toString();
	}

	@RequestMapping(value="initHis.sdo")
	public @ResponseBody String initHis(HttpServletRequest request ) throws Exception {
		ExtLimit ext = new ExtLimit();
		ext.setSort("id");
		ext.setDir("DESC");
		
		DetectRecordEty ety = new DetectRecordEty();
		ety.setExtLimit(ext);
		List<DetectRecordEty> list = detectRecordDao.selectByEntity(ety);
		for(DetectRecordEty d : list) {
			
			StandardTmpterEty st = standardTmpterDao.selectById(d.getStandardTmpterId());
			if(st != null) {
				d.setTempAvg1_str(MiniScaleUtil.stringValueAsMiniScale(d.getTempAvg1(), st.getMiniScale()));
				d.setTempReal_str(MiniScaleUtil.stringValueAsMiniScale(d.getTempReal(), st.getMiniScale()));
				detectRecordDao.updateById(d);
			}
			
			sampleRecordService.updateSampleRecords(d.getId());
		}
		
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		obj.put("result","success");
		return obj.toString();
	}

	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(HttpServletRequest request, DetectRecordEty detectRecordEty) throws Exception {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		
		detectRecordEty.setTemp1(Double.parseDouble(detectRecordEty.getTemp1_input()));
		detectRecordEty.setTemp2(Double.parseDouble(detectRecordEty.getTemp2_input()));
		
		if(StringUtils.isNotEmpty(detectRecordEty.getTempReal_str())) {
			detectRecordEty.setTempReal(Double.parseDouble(detectRecordEty.getTempReal_str()));
		}
		if(StringUtils.isNotEmpty(detectRecordEty.getTempAvg1_str())) {
			detectRecordEty.setTempAvg1(Double.parseDouble(detectRecordEty.getTempAvg1_str()));
		}
		
		if(detectRecordEty.getDetectTemp().intValue() != 0) {//为0时不用填标准器
			StandardTmpterEty st = standardTmpterDao.selectById(detectRecordEty.getStandardTmpterId());
			if(st == null) {
				throw new Exception("无法得到标准器数据，请确认输入标准器是否正确！");
			}
			
			StandardTmpterCorrectionEty stcsearchEty = new StandardTmpterCorrectionEty();
			stcsearchEty.setStandardTmpterId(detectRecordEty.getStandardTmpterId());
			stcsearchEty.setValue(detectRecordEty.getDetectTemp());
			List<StandardTmpterCorrectionEty> stcs = standardTmpterCorrectionDao.selectByEntity(stcsearchEty);
			if(stcs.size() != 1) {
				throw new Exception("无法获取标准器修正值！");
			}
		}
		else {
			detectRecordEty.setStandardTmpterId(0);
		}
		
		if(detectRecordEty.getId() == null) {
			UserEty userEty = (UserEty) request.getSession().getAttribute("UserEty");
			detectRecordEty.setCreateUserId(userEty.getId());
			detectRecordEty.setCreateDate(new Date());
			
			detectRecordDao.insert(detectRecordEty);
		} else { 
			detectRecordDao.updateById(detectRecordEty);
			sampleRecordService.updateSampleRecords(detectRecordEty.getId());
		}
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="delete.sdo")
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		detectRecordDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		DetectRecordData detectRecordEty = detectRecordDao.selectDataById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(detectRecordEty, config);
		obj.put("data", dataObj);
		return obj.toString();
	}
	
	/**
	 * 查看记录表
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value="showDetectReport.sdo")
	public String showDetectReport(HttpServletRequest request, @RequestParam("ids") String ids) {
		List<Map<String, Object>> allReportList = new ArrayList<Map<String, Object>>();
		String[] idArr = StringUtils.split(ids, "-");
		for(String idStr : idArr) {
			Map<String, Object> dataMap = new HashMap<String, Object>();
			DetectRecordData detectData = detectRecordDao.selectDataById(Integer.parseInt(idStr));
			
			if(detectData.getStandardTmpterId() != null && detectData.getStandardTmpterId() > 0) {
				String correctionStr = MiniScaleUtil.stringValueAsMiniScale(detectData.getStandardTmpterCorrection(), detectData.getStandardTmpter_miniScale());
				detectData.setStandardTmpterCorrectionMiniScaleStr(correctionStr);
			}
			
			String detectBasis = detectData.getDetectBasis();
			String[] bs = StringUtils.split(detectBasis, ",");
			boolean detectBasis_JJG130_2011 = false;
			boolean detectBasis_JJG131_2004 = false;
			
			if(bs != null && bs.length > 0) {
				for(String s : bs) {
					if(s.equals("JJG130-2011")) {
						detectBasis_JJG130_2011 = true;
					}
					else if(s.equals("JJG131-2004")) {
						detectBasis_JJG131_2004 = true;
					}
				}
			}
			
			SampleRecordEty se = new SampleRecordEty();
			ExtLimit limit = new ExtLimit();
			limit.setSort("sampleNo");
			limit.setDir("ASC");
			se.setExtLimit(limit);
			se.setDetectID(detectData.getId());
			List<SampleRecordData> sampleList = sampleRecordDao.selectDataByLimit(se);
			
			List<SampleRecordData> retList = new ArrayList<SampleRecordData>();
			for(SampleRecordData data: sampleList) {
				if(data.getTempRegisterTmerName().equals("干湿球温度计")) {
					data.setDoubleTmer(true);
					
					SampleRecordData dataG = new SampleRecordData();//干
					SampleRecordData dataS = new SampleRecordData();//湿
					
					BeanUtils.copyProperties(data, dataG);
					BeanUtils.copyProperties(data, dataS);
					
					dataG.setDoubleTmerName("干");
					dataS.setDoubleTmerName("湿");
					dataS.setTemp1(dataS.getTemp3());
					dataS.setTemp2(dataS.getTemp4());
					dataS.setTemp1_input(dataS.getTemp3_input());
					dataS.setTemp2_input(dataS.getTemp4_input());
					dataS.setTempAvg1(dataS.getTempAvg2());
					dataS.setTempAvg1_str(dataS.getTempAvg2_str());
					dataS.setResult1_str(dataS.getResult2_str());
					dataS.setResult1Type(dataS.getResult2Type());
					retList.add(dataG);
					retList.add(dataS);
				}
				else {
					retList.add(data);
				}
			}
			
			dataMap.put("sampleList", retList);
			dataMap.put("detectData", detectData);
			dataMap.put("detectBasis_JJG130_2011", detectBasis_JJG130_2011);
			dataMap.put("detectBasis_JJG131_2004", detectBasis_JJG131_2004);
			allReportList.add(dataMap);
		}
		request.setAttribute("allReportList", allReportList);
		return "/report/ReportSampleRecord.jsp";
	}

	@ExceptionHandler
	public @ResponseBody String handle(Exception e) {
		logger.error("", e);
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		obj.put("result","error");
		obj.put("info",e.getMessage());
		return obj.toString();
	}
}