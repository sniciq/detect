package com.ms.dao.entity.register;

/**
 * 检测点
 *
 */
public class DetectTempEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private String name;
	private Integer temp;

	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Integer getTemp() {
		return this.temp;
	}
	public void setTemp(Integer temp) {
		this.temp = temp;
	}

}