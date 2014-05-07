package com.ms.dao.entity.register;
public class TempRegisterPointEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private Integer tempRegisterId; //样本登记ID
	private Integer temp;	//温度

	public Integer getTempRegisterId() {
		return tempRegisterId;
	}
	public void setTempRegisterId(Integer tempRegisterId) {
		this.tempRegisterId = tempRegisterId;
	}
	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	* 得到 温度
	* @return 温度 : java.lang.Double
	*/
	public Integer getTemp() {
		return this.temp;
	}
	/**
	 * 设置 温度
	 * @param temp, 温度 : java.lang.Double
	*/
	public void setTemp(Integer temp) {
		this.temp = temp;
	}

}