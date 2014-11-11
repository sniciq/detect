package com.ms.util;

import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	public static Date getMonday(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date); 
        int curDay = calendar.get(Calendar.DAY_OF_WEEK);
        if (curDay == 1) { 
            calendar.add(Calendar.DATE, -6); 
        } else { 
            calendar.add(Calendar.DATE, 2 - curDay); 
        } 
        return calendar.getTime();
	}
}
