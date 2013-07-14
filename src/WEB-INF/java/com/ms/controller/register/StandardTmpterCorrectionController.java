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
import com.ms.dao.entity.register.StandardTmpterCorrectionEty;
import com.ms.dao.mapper.register.StandardTmpterCorrectionDao;

@Controller
@RequestMapping("/register/StandardtmptercorrectionController/")
public class StandardTmpterCorrectionController {

private Logger logger = Logger.getLogger(StandardTmpterCorrectionController.class);
	@Autowired
	private StandardTmpterCorrectionDao standardTmpterCorrectionDao;


	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, StandardTmpterCorrectionEty standardTmpterCorrectionEty) throws Exception {
		int count = standardTmpterCorrectionDao.selectLimitCount(standardTmpterCorrectionEty);
		List<StandardTmpterCorrectionEty> list = standardTmpterCorrectionDao.selectByLimit(standardTmpterCorrectionEty);
		JSONObject retObj = JSONGrid.toJSon(list, count);
		return retObj.toString();
	}


	@RequestMapping(value="save.sdo")
	public @ResponseBody String save(StandardTmpterCorrectionEty standardTmpterCorrectionEty) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		if(standardTmpterCorrectionEty.getId() == null) {
			standardTmpterCorrectionDao.insert(standardTmpterCorrectionEty);
		} else { 
			standardTmpterCorrectionDao.updateById(standardTmpterCorrectionEty);
		}
		obj.put("result","success");
		return obj.toString();
	}

	@RequestMapping(value="delete.sdo")
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		standardTmpterCorrectionDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}

	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		StandardTmpterCorrectionEty standardTmpterCorrectionEty = (StandardTmpterCorrectionEty) standardTmpterCorrectionDao.selectById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(standardTmpterCorrectionEty, config);
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