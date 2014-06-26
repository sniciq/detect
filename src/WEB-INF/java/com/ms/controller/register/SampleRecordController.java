package com.ms.controller.register;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
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
import com.eddy.util.JSONGrid;
import com.ms.dao.entity.basic.UserEty;
import com.ms.dao.entity.register.DetectRecordEty;
import com.ms.dao.entity.register.SampleRecordEty;
import com.ms.dao.entity.register.StandardTmpterCorrectionEty;
import com.ms.dao.entity.register.StandardTmpterEty;
import com.ms.dao.entity.register.TempRegisterEty;
import com.ms.dao.mapper.register.DetectRecordDao;
import com.ms.dao.mapper.register.SampleRecordDao;
import com.ms.dao.mapper.register.StandardTmpterCorrectionDao;
import com.ms.dao.mapper.register.StandardTmpterDao;
import com.ms.dao.mapper.register.TempRegisterDao;
import com.ms.dao.mapper.register.TempRegisterPointDao;
import com.ms.util.MiniScaleUtil;

/**
 * 样本检测历史查询
 *
 */
@Controller
@RequestMapping("/register/SampleRecordController/")
public class SampleRecordController {

	private Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SampleRecordDao sampleRecordDao;

	@Autowired
	private DetectRecordDao detectRecordDao;
	
	@Autowired
	private StandardTmpterDao standardTmpterDao;
	
	@Autowired
	private StandardTmpterCorrectionDao standardTmpterCorrectionDao;
	
	@Autowired
	private TempRegisterDao tempRegisterDao;
	
	@Autowired
	private TempRegisterPointDao tempRegisterPointDao;
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, SampleRecordEty sampleRecordEty) throws Exception {
		int count = sampleRecordDao.selectLimitCount(sampleRecordEty);
		List<SampleRecordData> list = sampleRecordDao.selectDataByLimit(sampleRecordEty);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		return retObj.toString();
	}


	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(HttpServletRequest request, SampleRecordEty sampleRecordEty) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		
		///:表示断柱，%:表示超差
		if(sampleRecordEty.getTemp1_input().equals("/") || sampleRecordEty.getTemp2_input().equals("/")) {
			sampleRecordEty.setResult1Type(1);
		}
		else if(sampleRecordEty.getTemp1_input().equals("%") || sampleRecordEty.getTemp2_input().equals("%")) {
			sampleRecordEty.setResult1Type(2);
		}
		else {
			sampleRecordEty.setResult1Type(0);
			sampleRecordEty.setTemp1(Double.parseDouble(sampleRecordEty.getTemp1_input()));
			sampleRecordEty.setTemp2(Double.parseDouble(sampleRecordEty.getTemp2_input()));
		}
		
		if(sampleRecordEty.getTemp3_input().equals("/") || sampleRecordEty.getTemp4_input().equals("/")) {
			sampleRecordEty.setResult2Type(1);
		}
		else if(sampleRecordEty.getTemp3_input().equals("%") || sampleRecordEty.getTemp4_input().equals("%")) {
			sampleRecordEty.setResult2Type(2);
		}
		else {
			sampleRecordEty.setResult2Type(0);
			sampleRecordEty.setTemp3(Double.parseDouble(sampleRecordEty.getTemp3_input()));
			sampleRecordEty.setTemp4(Double.parseDouble(sampleRecordEty.getTemp4_input()));
		}
		
		if(StringUtils.isNotEmpty(sampleRecordEty.getTempAvg1_str())) {
			sampleRecordEty.setTempAvg1(Double.parseDouble(sampleRecordEty.getTempAvg1_str()));
		}
		if(StringUtils.isNotEmpty(sampleRecordEty.getTempAvg2_str())) {
			sampleRecordEty.setTempAvg2(Double.parseDouble(sampleRecordEty.getTempAvg2_str()));
		}
		if(StringUtils.isNotEmpty(sampleRecordEty.getResult1_str())) {
			sampleRecordEty.setResult1(Double.parseDouble(sampleRecordEty.getResult1_str()));
		}
		if(StringUtils.isNotEmpty(sampleRecordEty.getResult2_str())) {
			sampleRecordEty.setResult2(Double.parseDouble(sampleRecordEty.getResult2_str()));
		}
		
		if(sampleRecordEty.getId() == null) {
			UserEty userEty = (UserEty) request.getSession().getAttribute("UserEty");
			sampleRecordEty.setCreateUserID(userEty.getId());
			sampleRecordEty.setCreateDate(new Date());
			sampleRecordDao.insert(sampleRecordEty);
		} else { 
			sampleRecordDao.updateById(sampleRecordEty);
		}
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="delete.sdo")
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		sampleRecordDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		SampleRecordData sampleRecordEty = sampleRecordDao.selectDataById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(sampleRecordEty, config);
		obj.put("data", dataObj);
		return obj.toString();
	}
	
	/**
	 * 样本登记初始化<br/>
	 * 返回新的实验号、当前时间等
	 * @return
	 */
	@RequestMapping(value="initRegist.sdo")
	public @ResponseBody String initRegist() throws Exception {
		//实验号 yyyyMMdd001形式
		// 1. 查询今天的实验总数
		Date nowDate = new Date();
		JSONObject obj = new JSONObject();
		obj.put("today", new SimpleDateFormat("yyyy-MM-dd").format(nowDate));
		return obj.toString();
	}

	private String createExperimentNo() {
		Date nowDate = new Date();
		int todayCount = detectRecordDao.selectTodayCount(new SimpleDateFormat("yyyy-MM-dd").format(nowDate));
		String ss = "000";
		ss += (todayCount+1);
		ss = ss.substring(ss.length() -3 , ss.length());
		String experimentNo = new SimpleDateFormat("yyyyMMdd").format(nowDate) + ss;
		return experimentNo;
	}
	
	/**
	 * 样本登记
	 * @return
	 */
	@RequestMapping(value="registSample.sdo")
	public @ResponseBody String registSample(HttpServletRequest request, RegistSampleForm form) throws Exception {
		JSONObject obj = new JSONObject();
		
		//----------------------验证及计算数据
		String standardTempStr = form.getStandardTempStr();
		if(StringUtils.isEmpty(standardTempStr)) {
			throw new Exception("标准器读数输入错误!");
		}
		String[] temps = StringUtils.split(standardTempStr, ",");
		if(temps.length != 2) {
			throw new Exception("标准器读数输入错误!");
		}
		try {
			form.setStandardTemp1_input(temps[0].replace("+", ""));
			form.setStandardTemp2_input(temps[1].replace("+", ""));
			form.setStandardTemp1(Double.valueOf(temps[0]));
			form.setStandardTemp2(Double.valueOf(temps[1]));
		}
		catch (Exception e) {
			throw new Exception("标准器读数输入错误!");
		}
		
		StandardTmpterEty st = standardTmpterDao.selectById(form.getStandardTmpterId());
		if(st == null) {
			throw new Exception("无法得到标准器数据，请确认输入标准器是否正确！");
		}

		StandardTmpterCorrectionEty stcsearchEty = new StandardTmpterCorrectionEty();
		stcsearchEty.setStandardTmpterId(form.getStandardTmpterId());
		stcsearchEty.setValue(form.getDetectTemp());
		List<StandardTmpterCorrectionEty> stcs = standardTmpterCorrectionDao.selectByEntity(stcsearchEty);
		if(stcs.size() != 1) {
			throw new Exception("无法获取标准器修正值！");
		}
		StandardTmpterCorrectionEty stc = stcs.get(0);
		
		//计算标准器平均读数及槽温
		double av = (form.getStandardTemp1() + form.getStandardTemp2()) / 2 * st.getMiniScale() * 0.1;
		double tempReal = av + stc.getCorrection();
		
		av = MiniScaleUtil.convertWithMiniScale(av, st.getMiniScale());
		tempReal = MiniScaleUtil.convertWithMiniScale(tempReal, st.getMiniScale());
		
		form.setStandardTempAvg1(av);
		form.setTempReal(tempReal);
		form.setStandardTempAvg1_str(MiniScaleUtil.stringValueAsMiniScale(av, st.getMiniScale()));
		form.setTempReal_str(MiniScaleUtil.stringValueAsMiniScale(tempReal, st.getMiniScale()));
		
		//样本数据
		String tempStr12 = form.getTemp12Str();
		if(StringUtils.isEmpty(tempStr12)) {
			throw new Exception("样本读数输入错误!");
		}
		temps = StringUtils.split(tempStr12, ",");
		if(temps.length != 2) {
			throw new Exception("样本读数输入错误!");
		}
		try {
			form.setTemp1_input(temps[0].replace("+", ""));
			form.setTemp2_input(temps[1].replace("+", ""));
			form.setTemp1(Double.valueOf(temps[0]));
			form.setTemp2(Double.valueOf(temps[1]));
		}
		catch (Exception e) {
			throw new Exception("样本读数输入错误!");
		}
		
		TempRegisterEty tempRegisterEty = tempRegisterDao.selectById(form.getTempRegisterId());
		if(tempRegisterEty == null) {
			throw new Exception("无法获取检测样本，请确认输入的样本编号是否正确。");
		}
		
//		TempRegisterPointEty s_TempRegisterPointEty = new TempRegisterPointEty();
//		s_TempRegisterPointEty.setTempRegisterId(form.getTempRegisterId());
//		s_TempRegisterPointEty.setTemp(form.getDetectTemp());
//		List<TempRegisterPointEty> tepL = tempRegisterPointDao.selectByLimit(s_TempRegisterPointEty);
//		if(tepL.size() == 0) {
//			throw new Exception("当前样本没有该检测点！");
//		}
		
		double miniScale = Double.parseDouble(tempRegisterEty.getMiniScale()) ;
		av = (form.getTemp1() + form.getTemp2()) / 2 * miniScale * 0.1;
		av = MiniScaleUtil.convertWithMiniScale(av, miniScale);
		
		form.setTempAvg1(av);
		form.setTempAvg1_str(MiniScaleUtil.stringValueAsMiniScale(av, miniScale));
		
		double r = tempReal - av;
		r = Math.round((r * 10 / miniScale)) * miniScale / 10;
		r = MiniScaleUtil.convertWithMiniScale(r, miniScale);
		form.setResult1(r);
		form.setResult1_str(MiniScaleUtil.stringValueAsMiniScale(r, miniScale));
		if(tempRegisterEty.getTmerName().equals("干湿球温度计")) {
			String tempStr34 = form.getTemp34Str();
			if(StringUtils.isEmpty(tempStr34)) {
				throw new Exception("样本读数输入错误!");
			}
			temps = StringUtils.split(tempStr34, ",");
			if(temps.length != 2) {
				throw new Exception("样本读数输入错误!");
			}
			try {
				form.setTemp3_input(temps[0].replace("+", ""));
				form.setTemp4_input(temps[1].replace("+", ""));
				form.setTemp3(Double.valueOf(temps[0]));
				form.setTemp4(Double.valueOf(temps[1]));
			}
			catch (Exception e) {
				throw new Exception("样本读数输入错误!");
			}
			
			av = (form.getTemp3() + form.getTemp4()) / 2 * miniScale * 0.1;
			av = MiniScaleUtil.convertWithMiniScale(av, miniScale);
			form.setTempAvg2(av);
			form.setTempAvg2_str(MiniScaleUtil.stringValueAsMiniScale(av, miniScale));
			r = tempReal - av;
			r = Math.round((r * 10 / miniScale)) * miniScale / 10;
			r = MiniScaleUtil.convertWithMiniScale(r, miniScale);
			form.setResult2(r);
			form.setResult2_str(MiniScaleUtil.stringValueAsMiniScale(r, miniScale));
		}
		//----------------------验证及计算数据-----------结束

		UserEty userEty = (UserEty) request.getSession().getAttribute("UserEty");
		Date nowDate = new Date();
		
		String detectBasis = "";
		String ss = request.getParameter("detectBasis_JJG130-2011");
		if(StringUtils.isNotEmpty(ss)) {
			detectBasis += ss;
		}
		ss = request.getParameter("detectBasis_JJG131-2004");
		if(StringUtils.isNotEmpty(ss)) {
			detectBasis += "," + ss;
		}
		
		//由DetectId判断是否是新实验
		DetectRecordEty detecEty = detectRecordDao.selectById(form.getDetectId());
		//2. 如果是新实验,则先存到实验表中
		if(detecEty == null) {
			String experimentNo = createExperimentNo();
			
			detecEty = new DetectRecordEty();
			BeanUtils.copyProperties(form, detecEty);
			detecEty.setId(null);
			detecEty.setExperimentNo(experimentNo);
			detecEty.setDetectBasis(detectBasis);
			detecEty.setCreateDate(nowDate);
			detecEty.setCreateUserId(userEty.getId());

			detecEty.setTemp1(form.getStandardTemp1());
			detecEty.setTemp2(form.getStandardTemp2());
			
			detecEty.setTemp1_input(form.getStandardTemp1_input());
			detecEty.setTemp2_input(form.getStandardTemp2_input());
			
			detecEty.setTempAvg1(form.getStandardTempAvg1());
			detecEty.setTempAvg1_str(form.getStandardTempAvg1_str());
			detecEty.setTemp3(null);
			detecEty.setTemp4(null);
			detecEty.setTempAvg2(null);
			detecEty.setTempAvg2_str(null);
			detectRecordDao.insert(detecEty);
			
			obj.put("experimentNo",experimentNo);
			obj.put("detectId",detecEty.getId());
		}
		
		//3. 存入到样品表
		SampleRecordEty sampleRecordEty = new SampleRecordEty();
		BeanUtils.copyProperties(form, sampleRecordEty);
		sampleRecordEty.setId(null);
		sampleRecordEty.setCreateDate(nowDate);
		sampleRecordEty.setCreateUserID(userEty.getId());
		sampleRecordEty.setDetectID(detecEty.getId());
		
		if(!tempRegisterEty.getTmerName().equals("干湿球温度计")) {
			sampleRecordEty.setTemp3(null);
			sampleRecordEty.setTemp4(null);
			sampleRecordEty.setTemp3_input(null);
			sampleRecordEty.setTemp4_input(null);
			sampleRecordEty.setTempAvg2(null);
			sampleRecordEty.setTempAvg2_str(null);
		}
		sampleRecordDao.insert(sampleRecordEty);
		obj.put("result","success");
		obj.put("success",true);
		return obj.toString();
	}
	
	/**
	 * 平均温度 = (读数1 + 读数2)/2 * 最小分度值 * 0.1 <br>
	 * 温槽实际温度的结果＝ 平均温度(取舍后的) + 修正值 <br>
	 * 结果 ＝ 温槽实际温度 － 平均温度
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="registSampleNew.sdo")
	public @ResponseBody String registSampleNew(HttpServletRequest request) throws Exception {
		JSONObject obj = new JSONObject();
		
		UserEty userEty = (UserEty) request.getSession().getAttribute("UserEty");
		Date nowDate = new Date();
		
		//------------验证及计算标准器数据----------
		DetectRecordEty detecEty = new DetectRecordEty();
		String postData = request.getParameter("data");
		JSONObject postJSON = JSONObject.fromObject(postData);
		
		JSONObject detectJSON = postJSON.getJSONObject("detect");
		if(detectJSON.containsKey("temp")) {
			detecEty.setTemp(detectJSON.getString("temp"));
		}
		if(detectJSON.containsKey("humidity")) {
			detecEty.setHumidity(detectJSON.getString("humidity"));
		}
		
		if(detectJSON.containsKey("equipmentNo")) {//院设备编号
			detecEty.setEquipmentNo(detectJSON.getString("equipmentNo"));
		}
		String detectBasis = "";
		if(detectJSON.containsKey("detectBasis_JJG130-2011")) {
			if(StringUtils.isNotEmpty(detectJSON.getString("detectBasis_JJG130-2011"))) {
				detectBasis += detectJSON.getString("detectBasis_JJG130-2011");
			}
		}
		if(detectJSON.containsKey("detectBasis_JJG131-2004")) {
			if(StringUtils.isNotEmpty(detectJSON.getString("detectBasis_JJG131-2004"))) {
				detectBasis += detectJSON.getString("detectBasis_JJG131-2004");
			}
		}
		detecEty.setDetectBasis(detectBasis);//检定依据
		
		String detectTempStr = detectJSON.getString("detectTemp");//名义温度
		if(StringUtils.isEmpty(detectTempStr)) {
			throw new Exception("名义温度不能为空!");
		}
		
		double detectTemp = Double.parseDouble(detectTempStr);
		detecEty.setDetectTemp(detectTemp);
		double correction = 0;
		double standardMiniScale = 0;
		double tempReal = 0;
		if(detectTemp != 0) {//为0时不用填标准器
			if(!detectJSON.containsKey("standardTmpterId")) {
				throw new Exception("请选择标准器!");
			}
			int standardTmpterId = detectJSON.getInt("standardTmpterId");
			StandardTmpterEty st = standardTmpterDao.selectById(standardTmpterId);
			if(st == null) {
				throw new Exception("无法得到标准器数据，请确认输入标准器是否正确！");
			}
			
			String standardTempStr = detectJSON.getString("standardTempStr");;
			if(StringUtils.isEmpty(standardTempStr)) {
				throw new Exception("标准器读数不能为空!");
			}
			String[] temps = StringUtils.split(standardTempStr, ",");
			try {
				String temps1 = temps[0];
				String temps2 = "";
				if(temps.length == 1) {
					temps2 = temps[0];
				}
				else {
					temps2 = temps[1];
				}
				detecEty.setTemp1(Double.valueOf(temps1));
				detecEty.setTemp2(Double.valueOf(temps2));
				detecEty.setTemp1_input(temps1.replace("+", ""));
				detecEty.setTemp2_input(temps2.replace("+", ""));
			}
			catch (Exception e) {
				throw new Exception("标准器读数输入错误!");
			}
			
			detecEty.setStandardTmpterId(standardTmpterId);
			
			standardMiniScale = st.getMiniScale();
			StandardTmpterCorrectionEty stcsearchEty = new StandardTmpterCorrectionEty();
			stcsearchEty.setStandardTmpterId(standardTmpterId);
			stcsearchEty.setValue(detectTemp);
			List<StandardTmpterCorrectionEty> stcs = standardTmpterCorrectionDao.selectByEntity(stcsearchEty);
			if(stcs.size() != 1) {
				throw new Exception("无法获取标准器修正值！");
			}
			StandardTmpterCorrectionEty stc = stcs.get(0);
			correction = stc.getCorrection();
			
			//计算标准器平均读数及槽温
			double av = (detecEty.getTemp1() + detecEty.getTemp2()) / 2 * standardMiniScale * 0.1;
			av = MiniScaleUtil.convertWithMiniScale(av, standardMiniScale);
			
			tempReal = new BigDecimal(av + "").add(new BigDecimal(correction + "")).doubleValue();
//			温槽实际温度不做取舍
//			tempReal = MiniScaleUtil.convertWithMiniScale(tempReal, standardMiniScale);
			
			detecEty.setTempAvg1(av);
			detecEty.setTempAvg1_str(MiniScaleUtil.stringValueAsMiniScale(av, standardMiniScale));
			detecEty.setDetectTemp(detectTemp);
			detecEty.setTempReal(tempReal);
			detecEty.setTempReal_str(MiniScaleUtil.stringValueAsMiniScale(tempReal, standardMiniScale));
		}
		//------------验证及计算标准器数据-------------结束----------
		
		List<SampleRecordEty> seList = new ArrayList<SampleRecordEty>();
		JSONArray arr = postJSON.getJSONArray("samples");
		for(int i = 0; i < arr.size(); i++) {
			SampleRecordEty sampleEty = createSampleRecordEty(arr.getJSONObject(i), tempReal, detectTemp);
			if(sampleEty == null )
				continue;
			
			seList.add(sampleEty);
		}
		
		String experimentNo = createExperimentNo();
		detecEty.setExperimentNo(experimentNo);
		detecEty.setCreateDate(nowDate);
		detecEty.setCreateUserId(userEty.getId());
		detecEty.setAddress(detectJSON.getString("address"));
		detectRecordDao.insert(detecEty);
		
		for(SampleRecordEty sampleEty : seList) {
			sampleEty.setCreateUserID(userEty.getId());
			sampleEty.setCreateDate(nowDate);
			sampleEty.setDetectID(detecEty.getId());
			sampleRecordDao.insert(sampleEty);
		}
		
		obj.put("result","success");
		obj.put("success",true);
		return obj.toString();
	}
	
	/**
	 * 生成样本数据
	 * 名义温度为0时要特殊处理<br>
	 * 就没有什么最小分度值和修正值，在0度的时候直接就是不用标准器，检定结果就是读数平均值的相反数
	 * @param jsonObj
	 * @param tempReal 槽温
	 * @param detectTemp 名义温度 , 名义温度为0时要特殊处理, 在0度的时候直接就是不用标准器，检定结果就是读数平均值的相反数
	 * @return
	 * @throws Exception
	 */
	private SampleRecordEty createSampleRecordEty(JSONObject jsonObj, double tempReal, double detectTemp) throws Exception {
		SampleRecordEty sampleEty = new SampleRecordEty();
//		if(!jsonObj.containsKey("tempRegisterId") || StringUtils.isEmpty(jsonObj.getString("tempRegisterId"))) {
//			return null;
//		}
//		
//		int TempRegisterId = jsonObj.getInt("tempRegisterId");
//		TempRegisterEty tempRegisterEty = tempRegisterDao.selectById(TempRegisterId);
//		if(tempRegisterEty == null) {
//			throw new Exception("无法获取检测样本，请确认输入的样本编号是否正确。");
//		}
//		
		
		if(!jsonObj.containsKey("tmterNo") || StringUtils.isEmpty(jsonObj.getString("tmterNo"))) {
			return null;
		}
		
		//改为根据编号返回ID
		String tmterNo = jsonObj.getString("tmterNo");
		TempRegisterEty tempRegisterEty = tempRegisterDao.selectRecentByAccurateTmterNo(tmterNo);
		if(tempRegisterEty == null) {
			throw new Exception("无法获取检测样本，请确认输入的样本编号是否正确。");
		}
		
		sampleEty.setTempRegisterId(tempRegisterEty.getId());
		
		int sampleNo = jsonObj.getInt("sampleNo");
		if(!jsonObj.containsKey("temp12Str") || StringUtils.isEmpty(jsonObj.getString("temp12Str"))) {
			throw new Exception("样本: " + sampleNo + " 读数输入错误！");
		}
		
		sampleEty.setSampleNo(sampleNo);
		String temp12Str = jsonObj.getString("temp12Str");
		String[] temps = StringUtils.split(temp12Str, ",");
		try {
			String temps1 = temps[0];
			String temps2 = "";
			if(temps.length == 1) {
				temps2 = temps[0];
			}
			else {
				temps2 = temps[1];
			}
			
			sampleEty.setTemp1_input(temps1.replace("+", ""));
			sampleEty.setTemp2_input(temps2.replace("+", ""));
			
			if(temps1.equals("/") || temps2.equals("/")) {//断柱
				sampleEty.setResult1Type(1);
			}
			else if(temps1.equals("%") || temps2.equals("%")) {//超差
				sampleEty.setResult1Type(2);
			}
			else {
				sampleEty.setResult1Type(0);
				sampleEty.setTemp1(Double.valueOf(temps1));
				sampleEty.setTemp2(Double.valueOf(temps2));
			}
		}
		catch (Exception e) {
			throw new Exception("标准器读数输入错误!");
		}
		
		if(sampleEty.getResult1Type().intValue() == 0){
			double miniScale = Double.parseDouble(tempRegisterEty.getMiniScale());
			double av = (sampleEty.getTemp1() + sampleEty.getTemp2()) / 2 * miniScale * 0.1;
			av = MiniScaleUtil.convertWithMiniScale(av, miniScale);
			sampleEty.setTempAvg1(av);
			sampleEty.setTempAvg1_str(MiniScaleUtil.stringValueAsMiniScale(av, miniScale));
			
			if(detectTemp == 0) {//在0度的时候直接就是不用标准器，检定结果就是读数平均值的相反数
				sampleEty.setResult1(av * -1);
				sampleEty.setResult1_str(MiniScaleUtil.stringValueAsMiniScale(av * -1, miniScale));
			}
			else {
				double r = tempReal - av;
				r = Math.round((r * 10 / miniScale)) * miniScale / 10;
				r = MiniScaleUtil.convertWithMiniScale(r, miniScale);
				sampleEty.setResult1(r);
				sampleEty.setResult1_str(MiniScaleUtil.stringValueAsMiniScale(r, miniScale));
			}
		}

		if(tempRegisterEty.getTmerName().equals("干湿球温度计")) {
			if(!jsonObj.containsKey("temp34Str") || StringUtils.isEmpty(jsonObj.getString("temp34Str"))) {
				throw new Exception("样本: " + sampleNo + " 读数输入错误！");
			}
			
			String temp34Str = jsonObj.getString("temp34Str");
			temps = StringUtils.split(temp34Str, ",");
			try {
				String temps1 = temps[0];
				String temps2 = "";
				if(temps.length == 1) {
					temps2 = temps[0];
				}
				else {
					temps2 = temps[1];
				}
				sampleEty.setTemp3_input(temps1.replace("+", ""));
				sampleEty.setTemp4_input(temps2.replace("+", ""));
				
				if(temps1.equals("/") || temps2.equals("/")) {//断柱
					sampleEty.setResult2Type(1);
				}
				else if(temps1.equals("%") || temps2.equals("%")) {//超差
					sampleEty.setResult2Type(2);
				}
				else {
					sampleEty.setResult2Type(0);
					sampleEty.setTemp3(Double.valueOf(temps1));
					sampleEty.setTemp4(Double.valueOf(temps2));
				}
			}
			catch (Exception e) {
				throw new Exception("样本: " + sampleNo + " 湿度输入错误！");
			}
			
			if(sampleEty.getResult2Type().intValue() == 0) {
				double miniScale = Double.parseDouble(tempRegisterEty.getMiniScale());
				double av = (sampleEty.getTemp3() + sampleEty.getTemp4()) / 2 * miniScale * 0.1;
				av = MiniScaleUtil.convertWithMiniScale(av, miniScale);
				sampleEty.setTempAvg2(av);
				sampleEty.setTempAvg2_str(MiniScaleUtil.stringValueAsMiniScale(av, miniScale));
				
				if(detectTemp == 0) {//在0度的时候直接就是不用标准器，检定结果就是读数平均值的相反数
					sampleEty.setResult2(av * -1);
					sampleEty.setResult2_str(MiniScaleUtil.stringValueAsMiniScale(av * -1, miniScale));
				}
				else {
					double r = tempReal - av;
					r = Math.round((r * 10 / miniScale)) * miniScale / 10;
					r = MiniScaleUtil.convertWithMiniScale(r, miniScale);
					sampleEty.setResult2(r);
					sampleEty.setResult2_str(MiniScaleUtil.stringValueAsMiniScale(r, miniScale));
				}
			}
		}
		return sampleEty;
	}
	
	@ExceptionHandler
	public @ResponseBody String handle(Exception e) {
		logger.error(e.getMessage(), e);
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		obj.put("result","error");
		obj.put("info",e.getMessage());
		return obj.toString();
	}
}