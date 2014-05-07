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
import com.ms.dao.entity.register.StandardTmpterEty;
import com.ms.dao.mapper.register.StandardTmpterDao;

/**
 * 标准器管理
 *
 */
@Controller
@RequestMapping("/register/StandardTmpterController/")
public class StandardTmpterController {

private Logger logger = Logger.getLogger(StandardTmpterController.class);

	@Autowired
	private StandardTmpterDao standardTmpterDao;

	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, StandardTmpterEty standardTmpterEty) throws Exception {
		int count = standardTmpterDao.selectLimitCount(standardTmpterEty);
		List<StandardTmpterEty> list = standardTmpterDao.selectByLimit(standardTmpterEty);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		return retObj.toString();
	}
	
	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(HttpServletRequest request, StandardTmpterEty standardTmpterEty) {
		UserEty userEty = (UserEty) request.getSession().getAttribute("UserEty");
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		if(standardTmpterEty.getId() == null) {
			standardTmpterEty.setCreateUserID(userEty.getId());
			standardTmpterEty.setCreateDate(new Date());
			standardTmpterDao.insert(standardTmpterEty);
		} else { 
			standardTmpterDao.updateById(standardTmpterEty);
		}
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="delete.sdo")
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		standardTmpterDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}


	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		StandardTmpterEty standardTmpterEty = (StandardTmpterEty) standardTmpterDao.selectById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(standardTmpterEty, config);
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