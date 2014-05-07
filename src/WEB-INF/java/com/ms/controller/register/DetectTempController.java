package com.ms.controller.register;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eddy.util.DateJsonValueProcessor;
import com.eddy.util.JSONGrid;
import com.ms.dao.entity.register.DetectTempEty;
import com.ms.dao.mapper.register.DetectTempDao;

/**
 * 检测点管理
 *
 */
@Controller
@RequestMapping("/register/DetecttempController/")
public class DetectTempController {

private Logger logger = Logger.getLogger(DetectTempController.class);
	@Autowired
	private DetectTempDao detectTempDao;


	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, DetectTempEty detectTempEty) throws Exception {
		int count = detectTempDao.selectLimitCount(detectTempEty);
		List<DetectTempEty> list = detectTempDao.selectByLimit(detectTempEty);
		JSONObject retObj = JSONGrid.toJSon(list, count);
		return retObj.toString();
	}
	
	
	@RequestMapping(value="searchCustomerName.sdo")
	public @ResponseBody String searchCustomerName(HttpServletRequest request, HttpServletResponse response, DetectTempEty detectTempEty) throws Exception {
		int count = detectTempDao.selectCustomerNameCount(detectTempEty);
		List<DetectTempEty> list = detectTempDao.selectCustomerNameByLimit(detectTempEty);
		DetectTempEty myEty = new DetectTempEty();
		myEty.setName("自定义");
		list.add(0, myEty);
		JSONObject retObj = JSONGrid.toJSon(list, count);
		return retObj.toString();
	}


	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(DetectTempEty detectTempEty) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		if(detectTempEty.getId() == null) {
			detectTempDao.insert(detectTempEty);
		} else { 
			detectTempDao.updateById(detectTempEty);
		}
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="delete.sdo")
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		detectTempDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		DetectTempEty detectTempEty = (DetectTempEty) detectTempDao.selectById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(detectTempEty, config);
		obj.put("data", dataObj);
		return obj.toString();
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