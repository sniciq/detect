package com.ms.controller.register;
import java.text.SimpleDateFormat;
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
import com.ms.dao.entity.basic.UserEty;
import com.ms.dao.entity.register.TempRegisterEty;
import com.ms.dao.mapper.register.TempRegisterDao;

@Controller
@RequestMapping("/register/TempRegisterController/")
public class TempRegisterController {

private Logger logger = Logger.getLogger(TempRegisterController.class);
	@Autowired
	private TempRegisterDao tempRegisterDao;


	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, TempRegisterEty tempRegisterEty) throws Exception {
		int count = tempRegisterDao.selectLimitCount(tempRegisterEty);
		List<TempRegisterData> list = tempRegisterDao.selectDataByLimit(tempRegisterEty);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		return retObj.toString();
	}

	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(HttpServletRequest request, TempRegisterEty tempRegisterEty) {
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