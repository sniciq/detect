package com;

import com.ms.util.MiniScaleUtil;


public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		double standardMiniScale = 0.1;
		double av = (-9 + -9) / 2 * standardMiniScale * 0.1;
		av = MiniScaleUtil.convertWithMiniScale(av, standardMiniScale);
		System.out.println("平均温度:" + av);
		double tempReal = av + 0.09;
		tempReal = MiniScaleUtil.convertWithMiniScale(tempReal, standardMiniScale);
		System.out.println("温槽实际温度:" + tempReal);
		
		
		
//		System.out.println("++10.5".replace("+", ""));
//		System.out.println(Double.parseDouble("+10.5"));
		
//		String v = "10.5";
//		String sv = v.substring(0, v.indexOf("."));//小数点前的
//		String ev = v.substring(v.indexOf(".")+1, v.indexOf(".") + 1+1);//小数点后一位
//		System.out.println(sv);
//		System.out.println(ev);
//		int sn = 2;
//		int evv = Integer.parseInt(ev) / sn * sn;
//		String resultStr = sv + "." + evv;
//		System.out.println(Double.valueOf(resultStr));
		
//		System.out.println(Math.floor(10.5));
//
//		System.out.println(new BigDecimal(10.125).setScale(2, BigDecimal.ROUND_HALF_EVEN).doubleValue());
//		double a = convertValueWithMiniScale(10.23, 0.05);
//		System.out.println(a);
//		
//		System.out.println(convertString(a, 0.01));
		
	}
	
	//值要比最小分度值的位数多一位,如果结果的小数位数比最小分度值少，则需要补0
	public static String convertString(double v, double scale) {
		if(scale == 1.0 || scale == 2.0 || scale == 5.0 ) {
			return v+"";
		}
		
		String s = scale + "";
		int n = s.indexOf(".");
		if(n < 0) {
			return v+"";
		}
		
		int dn = s.length() - 1 - n;//最小分度值的小数位数
		
		String retStr = v + "";
		n = retStr.indexOf(".");
		int rdn = retStr.length() - 1 - n;//值的小数位数
		for(int i = 0; i < dn - rdn + 1; i++) {//值要比最小分度值的位数多一位
			retStr += "0";
		}
		return retStr;
	}
	
	/**
	 * 根据scale返回值，如：
	 * 
	 * 1. 当最小分度值是:0.01、0.1、1时，不用取舍，只需要保留到最小分度的下一位就行，如：
	 * scale=0.1, v=10.124， 则返回10.12
	 * 
	 * 2. 0.02、0.2、2，结果只能是偶数, 0 2 4 6 8 如：
	 * scale=0.02, v=10.123, 则返回10.122
	 * scale=0.02, v=10.125, 则返回10.124
	 * scale=2, v=10.125, 则返回10.0
	 * scale=2, v=10.325, 则返回10.2
	 * 
	 * 3. 0.05、0.5、5时，最后一位只能是0、5 如：
	 * scale=5, v=12.325, 则返回12.0
	 * scale=5, v=12.625, 则返回12.5
	 * scale=0.5, v=12.325, 则返回12.30
	 * scale=0.5, v=12.365, 则返回12.35
	 * 
	 * @param v
	 * @param scale
	 * @return
	 */
	public static double convertValueWithMiniScale(double vd, double scale) {
		//1. 将V分为两部分，前部分取到分度值的位数，后一部分取到分度值的后一位
		String s = scale + "";
		String v = vd + "";
		if(scale == 1.0 || scale == 2.0 || scale == 5.0 ) {
			String sv = v.substring(0, v.indexOf("."));//小数点前的
			String ev = v.substring(v.indexOf(".")+1, v.indexOf(".") + 2);//小数点后一位
			int sn = new Double(scale).intValue();
			int evv = Integer.parseInt(ev) / sn * sn;
			String resultStr = sv + "." + evv;
			return Double.valueOf(resultStr);
		}
		else if (scale < 1.0){
			int sn = Integer.parseInt(s.substring(s.length() - 1));//分度值最后一位
			
			int index = s.length() - s.indexOf(".");//小数点位置
			if(v.indexOf(".") + index > v.length()) {
				return vd;
			}
			
			String sv = v.substring(0, v.indexOf(".") + index);//分度值位数
			
			if(v.indexOf(".") + index + 1 > v.length()) {
				return vd;
			}
			int ev = Integer.parseInt(v.substring(v.indexOf(".") + index, v.indexOf(".") + index + 1));//分度值后一位
			int evv = ev / sn * sn;
			String resultStr = sv + "" + evv;
			return Double.valueOf(resultStr);
		}
		return 0;
	}

}
