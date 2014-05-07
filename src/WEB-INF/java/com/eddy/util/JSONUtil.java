package com.eddy.util;

import net.sf.json.JSONObject;

public class JSONUtil {
	
	/**
	 * 成功JSON
	 * @return
	 */
	public static String successJSON() {
		JSONObject obj = new JSONObject();
		obj.put("result","success");
		obj.put("success",true);
		return obj.toString();
	}

}
