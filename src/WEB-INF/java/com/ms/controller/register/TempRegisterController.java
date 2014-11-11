package com.ms.controller.register;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.Region;
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
import com.eddy.util.JSONGrid;
import com.ms.dao.entity.basic.UserEty;
import com.ms.dao.entity.register.DetectTempEty;
import com.ms.dao.entity.register.TempRegisterEty;
import com.ms.dao.entity.register.TempRegisterPointEty;
import com.ms.dao.mapper.register.DetectTempDao;
import com.ms.dao.mapper.register.SampleRecordDao;
import com.ms.dao.mapper.register.TempRegisterDao;
import com.ms.dao.mapper.register.TempRegisterPointDao;
import com.ms.util.DateUtil;

/**
 * 样品登记
 *
 */
@Controller
@RequestMapping("/register/TempRegisterController/")
public class TempRegisterController {

	private Logger logger = Logger.getLogger(TempRegisterController.class);

	@Autowired
	private TempRegisterDao tempRegisterDao;

	@Autowired
	private TempRegisterPointDao tempRegisterPointDao;
	
	@Autowired
	private DetectTempDao detectTempDao;
	
	@Autowired
	private SampleRecordDao sampleRecordDao;
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	/**
	 * 根据编号精确查询，并返回最后一次登记的编号
	 * @param tmterNo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="selectRecentByAccurateTmterNo.sdo")
	public @ResponseBody String selectRecentByAccurateTmterNo(@RequestParam("tmterNo") String tmterNo, @RequestParam("detectTemp") int detectTemp) throws Exception {
		
		Date monday = DateUtil.getMonday(new Date());
		Map<String, String> tMap = new HashMap<String, String>();
		tMap.put("tmterNo", tmterNo);
		tMap.put("monday", new SimpleDateFormat("yyyy-MM-dd").format(monday));
		TempRegisterEty data = tempRegisterDao.selectRecentSinceMonday(tMap);
		if(data == null) {
			throw new Exception("没有找到本周编号为:" + tmterNo + "的记录!请检测编号是否正确。");
		}
		
		//查询本周内有没有做过实验
		Calendar cal = Calendar.getInstance();
		int dow = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if(dow == 0)
			dow = 7;
		cal.add(Calendar.DAY_OF_YEAR, 0 - dow + 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("detectTemp", detectTemp);
		paramMap.put("tempRegisterId", data.getId());
		paramMap.put("startDate", cal.getTime());
		int c = sampleRecordDao.selectTempRegisterCountByTime(paramMap);
		
		JSONObject retObj = JSONObject.fromObject(data);
		retObj.put("thisWeekCount", c);
		
		return retObj.toString();
	}
	
	@RequestMapping(value="selectRecentByTmterNo.sdo")
	public @ResponseBody String selectRecentByTmterNo(@RequestParam("tmterNo") String tmterNo) throws Exception {
		List<TempRegisterData> list = tempRegisterDao.selectRecentByTmterNo(tmterNo);
		return JSONGrid.toJSon(list, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).toString();
	}
	
	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, TempRegisterControllerForm form) throws Exception {
		int count = tempRegisterDao.selectLimitCountByForm(form);
		List<TempRegisterData> list = tempRegisterDao.selectDataByLimitByForm(form);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		return retObj.toString();
	}

	/**
	 * 检查本周内是否有重复的编号
	 * @param tmterNo
	 * @return
	 */
	@RequestMapping(value="checkTmterNo.sdo")
	public @ResponseBody String checkTmterNo(@RequestParam("tmterNo") String tmterNo) throws Exception {
		Calendar cal = Calendar.getInstance();
		int dow = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if(dow == 0)
			dow = 7;
		cal.add(Calendar.DAY_OF_YEAR, 0 - dow + 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("tmterNo", tmterNo);
		paramMap.put("startTime", cal.getTime());
		int c = tempRegisterDao.selectCountByTmterNo(paramMap);
		if(c > 0) {
			throw new Exception("本周内编号:" + tmterNo + " 重复。");
		}

		JSONObject obj = new JSONObject();
		obj.put("success",true);
		obj.put("result","success");
		return obj.toString();
	}
	
	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(HttpServletRequest request, TempRegisterEty tempRegisterEty) throws Exception {
		try {
			Double.parseDouble(tempRegisterEty.getMiniScale());
		}
		catch (Exception e) {
			throw new Exception("最小分度值输入错误！");
		}
		
		UserEty userEty = (UserEty) request.getSession().getAttribute("UserEty");
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		if(tempRegisterEty.getId() == null) {
			tempRegisterEty.setCreateDate(new Date());
			tempRegisterEty.setCreateUserID(userEty.getId());
			tempRegisterDao.insert(tempRegisterEty);
		} else { 
			tempRegisterDao.updateById(tempRegisterEty);
		}
		
		if(StringUtils.isNotEmpty(tempRegisterEty.getTempregisterpointName())) {
			tempRegisterPointDao.deleteByRegisterId(tempRegisterEty.getId());
			DetectTempEty searchEty = new DetectTempEty();
			searchEty.setName(tempRegisterEty.getTempregisterpointName());
			List<DetectTempEty> list = detectTempDao.selectByEntity(searchEty);
			for(DetectTempEty ety : list) {
				TempRegisterPointEty mEty = new TempRegisterPointEty();
				mEty.setTemp(ety.getTemp());
				mEty.setTempRegisterId(tempRegisterEty.getId());
				tempRegisterPointDao.insert(mEty);
			}
		}
		
		obj.put("result","success");
		return obj.toString();
	}

	@RequestMapping(value="delete.sdo")
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		tempRegisterDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}

	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		TempRegisterEty tempRegisterEty = (TempRegisterEty) tempRegisterDao.selectById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(tempRegisterEty, config);
		obj.put("data", dataObj);
		return obj.toString();
	}
	
	/**
	 * 查询进度
	 * @param request
	 * @param response
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="searchProgress.sdo")
	public @ResponseBody String searchProgress(HttpServletRequest request, HttpServletResponse response, TempRegisterControllerForm form) throws Exception {
		int count = tempRegisterDao.selectLimitCountByForm(form);
		List<TempRegisterData> list = tempRegisterDao.selectDataByLimitByForm(form);
		for(TempRegisterData data : list) {
			TempRegisterPointEty pEty = new TempRegisterPointEty();
			pEty.setTempRegisterId(data.getId());
			List<TempRegisterPointEty> pList = tempRegisterPointDao.selectByEntity(pEty);//需测温点
			List<Integer> dList = sampleRecordDao.setectDetectedTemp(data.getId());//已检温点
			
			List<Integer> tbList = new ArrayList<Integer>(); 
			Integer[] pArr = new Integer[pList.size()];
			for(int i = 0; i < pList.size(); i++) {
				pArr[i] = pList.get(i).getTemp();
				
				boolean isDetect = false;
				for(Integer d : dList) {
					if(d != null && pList.get(i).getTemp().intValue() == d.intValue()) {
						isDetect = true;
						break;
					}
				}
				
				
				if(!isDetect) {
					tbList.add(pList.get(i).getTemp());
				}
			}
			
			Integer[] dArr = new Integer[dList.size()];
			dList.toArray(dArr);
			
			Integer[] tbArr = new Integer[tbList.size()];
			tbList.toArray(tbArr);
			
			String detectedPonits = StringUtils.join(dArr, ",");
			String needDetectedPonits = StringUtils.join(pArr, ",");
			String tbDetectedPonits = StringUtils.join(tbArr, ",");
			data.setTbDetectedPonits(tbDetectedPonits);
			data.setDetectedPonits(detectedPonits);
			data.setNeedDetectPonits(needDetectedPonits);
		}
		
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		return retObj.toString();
	}
	
	@RequestMapping(value="showRegistReport.sdo")
	public String showRegistReport(HttpServletRequest request, @RequestParam("sd") String sd, @RequestParam("ed") String ed) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(sd);
		Date endDate = df.parse(ed);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("startDate", startDate);
		paramMap.put("endDate", endDate);
		paramMap.put("sort", "id");
		paramMap.put("dir", "ASC");
		List<RegistReportData> list = tempRegisterDao.selectRegistReportData(paramMap);
		
		int pageRows = 25;
		List<List<RegistReportData>> pageData = new ArrayList<List<RegistReportData>>();
		
		int m = list.size() % pageRows;
		if(m > 0) {
			int lSize = pageRows - m;
			for(int i = 0; i < lSize; i++) {
				list.add(new RegistReportData());
			}
		}
		
		String recentUnit = "";
		String recentSampleNo = "";
		String recentTmerName = "";
		String recentTmerType = "";
		boolean newUnit = true;
		List<RegistReportData> pList = new ArrayList<RegistReportData>();
		for(int i = 0; i < list.size(); i++) {
			if(i != 0 && i % pageRows == 0) {
				pageData.add(pList);
				pList = new ArrayList<RegistReportData>();
				recentUnit = "";
				recentSampleNo = "";
				recentTmerName = "";
				recentTmerType = "";
			}
			RegistReportData data = list.get(i);
			if(data.getId() != null) {//补充的空行排除
				data.setTmerType(data.getMinTemp() + "℃-" + data.getMaxTemp() + "℃；" + data.getMiniScale() + "；" + data.getImmersionType() + "；" + data.getManufacturer());
				
				if(StringUtils.isNotEmpty(recentUnit) && data.getUnit().equals(recentUnit)) {
					data.setUnit("");
					newUnit = false;
				}
				else {
					recentUnit = data.getUnit();
					newUnit = true;
				}
				
				if(!newUnit && StringUtils.isNotEmpty(recentTmerType) && data.getTmerType().equals(recentTmerType)) {
					data.setTmerType("");
				}
				else {
					recentTmerType = data.getTmerType();
				}
				
				if(!newUnit && StringUtils.isNotEmpty(recentTmerName) && data.getTmerName().equals(recentTmerName)) {
					data.setTmerName("");
				}
				else {
					recentTmerName = data.getTmerName();
				}
				
				if(StringUtils.isNotEmpty(recentSampleNo) && data.getSampleNo().equals(recentSampleNo)) {
					data.setSampleNo("");
				}
				else {
					recentSampleNo = data.getSampleNo();
				}
			}
			pList.add(data);
		}
		
		if(pList.size() > 0) {
			pageData.add(pList);
		}
		
		request.setAttribute("pageData", pageData);
		return "/report/RegistReport.jsp";
	}
	
	/**
	 * 显示误差表
	 * @param request
	 * @param sd
	 * @param ed
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("showDeviationReport.sdo")
	public String showDeviationReport(HttpServletRequest request, @RequestParam("sd") String sd, @RequestParam("ed") String ed) throws Exception {
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(sd);
		Date endDate = df.parse(ed);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("startDate", startDate);
		paramMap.put("endDate", endDate);
		paramMap.put("sort", "id");
		paramMap.put("dir", "ASC");
		
		List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
		List<RegistReportData> list = tempRegisterDao.selectRegistReportData(paramMap);//单位列表
		for(RegistReportData data : list) {//查询检测历史
			List<SampleRecordData> sampleList = sampleRecordDao.selectDataByTempRegister(data.getId());
			if(sampleList.size() == 0) 
				continue;
			
			List<SampleRecordData> retList = new ArrayList<SampleRecordData>();
			for(SampleRecordData rd: sampleList) {
				if(rd.getTempRegisterTmerName().equals("干湿球温度计")) {
					rd.setDoubleTmer(true);
					SampleRecordData dataG = new SampleRecordData();//干
					SampleRecordData dataS = new SampleRecordData();//湿
					
					BeanUtils.copyProperties(rd, dataG);
					BeanUtils.copyProperties(rd, dataS);
					
					dataG.setDoubleTmerName("干");
					dataS.setDoubleTmerName("湿");
					dataS.setTemp1(dataS.getTemp3());
					dataS.setTemp2(dataS.getTemp4());
					dataS.setTemp1_input(dataS.getTemp3_input());
					dataS.setTemp2_input(dataS.getTemp4_input());
					dataS.setTempAvg1(dataS.getTempAvg2());
					dataS.setTempAvg1_str(dataS.getTempAvg2_str());
					dataS.setResult1_str(dataS.getResult2_str());
					
					retList.add(dataG);
					retList.add(dataS);
				}
				else {
					retList.add(rd);
				}
			}
			
			Map<String, Object> aObj = new HashMap<String, Object>();
			aObj.put("unit", data);
			aObj.put("sampleList", retList);
			dataList.add(aObj);
		}
		
		int pageRows = 12;
		List<List<Map<String, Object>>> pageData = new ArrayList<List<Map<String, Object>>>();
		
		int m = dataList.size() % pageRows;
		if(m > 0) {
			int lSize = pageRows - m;
			for(int i = 0; i < lSize; i++) {
				Map<String, Object> aObj = new HashMap<String, Object>();
				aObj.put("unit", new RegistReportData());
				aObj.put("sampleList", new ArrayList<SampleRecordData>());
				dataList.add(aObj);
			}
		}
		
		List<Map<String, Object>> pList = new ArrayList<Map<String, Object>>();
		for(int i = 0; i < dataList.size(); i++) {
			if(i != 0 && i % pageRows == 0) {
				pageData.add(pList);
				pList = new ArrayList<Map<String, Object>>();
			}
			pList.add(dataList.get(i));
		}
		
		if(pList.size() > 0) {
			pageData.add(pList);
		}
		
		request.setAttribute("pageData", pageData);
		return "/report/DeviationReport.jsp";
	}

	@RequestMapping("exportDeviationReport.sdo")
	public void exportDeviationReport(HttpServletRequest request, HttpServletResponse response) {
		try {
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("误差表");
			
			int rowIndex = 0;
			//表头
			HSSFRow row = sheet.createRow(rowIndex++);
		    HSSFCell cell = row.createCell((short) 0);
		    cell.setCellValue(new HSSFRichTextString("检定结果误差表"));
		    HSSFCellStyle titleStyle = wb.createCellStyle();
		    titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直
		    titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);//水平
		    cell.setCellStyle(titleStyle);
		    sheet.addMergedRegion(new Region(rowIndex,(short)0,rowIndex,(short)12));//指定合并区域

		    row = sheet.createRow(rowIndex++);
			HSSFCellStyle style = wb.createCellStyle();
			style.setFillForegroundColor(HSSFColor.LIME.index);
			style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			
			String[] exp_column_names = {"ID", "编号", "项目", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"};
			for (int j = 0; j < exp_column_names.length; j++) {
				cell = row.createCell((short)j);
				cell.setCellStyle(style);
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(new HSSFRichTextString(exp_column_names[j]));
			}
			
			
			
			response.setHeader("Content-Disposition", "attachment;filename=\"" + new String("误差表.xls".getBytes("GBK"),"ISO8859_1") + "\"");
			response.setHeader("Pragma", "public");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);
			response.setContentType("application/vnd.ms-excel" + ";charset=UTF-8");
			wb.write(response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();
			
		}
		catch(Exception e) {
			logger.error(e.getMessage(), e);
		}
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