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
import com.ms.dao.entity.register.TempRegisterPointEty;
import com.ms.dao.mapper.register.TempRegisterPointDao;

@Controller
@RequestMapping("/register/TempregisterpointController/")
public class TempRegisterPointController {

private Logger logger = Logger.getLogger(TempRegisterPointController.class);
	@Autowired
	private TempRegisterPointDao tempRegisterPointDao;

	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, TempRegisterPointEty tempRegisterPointEty) throws Exception {
		int count = tempRegisterPointDao.selectLimitCount(tempRegisterPointEty);
		List<TempRegisterPointEty> list = tempRegisterPointDao.selectByLimit(tempRegisterPointEty);
		JSONObject retObj = JSONGrid.toJSon(list, count);
		return retObj.toString();
	}

	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(TempRegisterPointEty tempRegisterPointEty) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		if(tempRegisterPointEty.getId() == null) {
			tempRegisterPointDao.insert(tempRegisterPointEty);
		} else { 
			tempRegisterPointDao.updateById(tempRegisterPointEty);
		}
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="delete.sdo")
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		tempRegisterPointDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		TempRegisterPointEty tempRegisterPointEty = (TempRegisterPointEty) tempRegisterPointDao.selectById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(tempRegisterPointEty, config);
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