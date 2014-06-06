/**
 * 如果该完后是不是在录入读数的时候我可以不用录两次，当数据一样的时候只录一个，
 * 系统默认读数2，当前后读数不一样的时候我也可以像之前那样数之间用逗号隔开，系统也默许
 */
Ext.namespace('com.ms.controller.register.RegisterRecordPanelSamplePanel');
com.ms.controller.register.RegisterRecordPanelSamplePanel=Ext.extend(Ext.FormPanel, {
	sampleNo: 0,
	initComponent: function() {
		var l_width = 90;
		var r_width = 110;
		var dl_width = 70;
		var f_height = 25;
		var todayStr = new Date().format('Y-m-d');
		Ext.apply(this, {
            autoScroll: true,  
            frame: true,
            border: false,
			layout: 'hbox',
			layoutConfig: {
                padding:'2',
                align:'middle'
            },
            defaults:{margins:'0 5 0 0',layout:'form',height:f_height,labelWidth: 40,flex:1},
            items:[
                {width: 80,items:[{ xtype:'numberfield',fieldLabel: '序号', readOnly:true, name: 'sampleNo',labelStyle: 'font-weight:bold;font-size:15px;',anchor : '99%',value:this.sampleNo, cls : 'text-RegisterRecordPanel', allowBlank : true}]},
                {labelWidth: 80,items:[
                    {xtype: 'textfield',hidden: true,anchor: '100%',name:'tempRegisterId'},
                    {	
                    	xtype: 'textfield', fieldLabel: '登记编号',allowBlank : false,name: 'tmterNo',
                    	labelStyle: 'font-weight:bold;font-size:15px;',enableKeyEvents:true,
                    	cls : 'text-RegisterRecordPanel',
                    	listeners: {
                    		scope: this,
                    		change: function(tf, newValue, oldValue) {
                    			this.doCheckTmterNo(newValue);
                    		},
                    		keydown: function(tf, e ) {
                    			if(e.getKey() == 13) {
	                    			this.doCheckTmterNo(tf.getValue());
                    			}
                    		}
                    	}
                    }
                ]},
                {items:[{ ref: '../temp12Str',hidden:true,xtype: 'textfield', fieldLabel: '读数',name: 'temp12Str', labelStyle: 'background-color:#00FFFF;font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]},
                {items:[{ ref: '../temp34Str',hidden:true,xtype: 'textfield', fieldLabel: '湿度',name: 'temp34Str', labelStyle: 'background-color:#00FFFF;font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]},
                {width:60,items:[{ ref: '../infor',hidden:true,xtype:'panel',html:'<font style="color:#FF0000">重复录入</font>'}]}
            ]
		});
		com.ms.controller.register.RegisterRecordPanelSamplePanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
	},
	
	doCheckTmterNo: function(tmterNo) {
		this.temp34Str.hide();
		this.temp12Str.hide();
		if(tmterNo == ''){ 
			return;
		}
		this.checkTmterNo(tmterNo);
	},
	checkTmterNo: function(tmterNo) {
		var detectTemp = this.detectForm.getForm().findField('detectTemp').getValue();
		this.el.mask('正在验证，请等待...');
		Ext.Ajax.request({
			url: '../register/TempRegisterController/selectRecentByAccurateTmterNo.sdo',
			method: 'post',
			waitTitle:'请等待',
			waitMsg: '正在提交...',
			scope: this,
			params: {tmterNo: tmterNo, detectTemp:detectTemp},
			success:function(resp){
				this.el.unmask();
				this.getForm().findField('tempRegisterId').setValue('');
				var obj=Ext.util.JSON.decode(resp.responseText);
				if(obj.result == 'error') {
					var info = '' || obj.info;
					Ext.MessageBox.show({
		        		title: '错误提示',
	        		    msg: info,
	        		    buttons: Ext.Msg.OK,
	        		    icon: Ext.MessageBox.ERROR
		        	});
					this.getForm().findField('tmterNo').setValue('');
				}
				else if(obj.id == '') {
					Ext.MessageBox.show({
		        		title: '错误提示',
	        		    msg: '登记编号输入错误',
	        		    buttons: Ext.Msg.OK,
	        		    icon: Ext.MessageBox.ERROR
		        	});
					this.getForm().findField('tmterNo').setValue('');
				}
				else {
					if(obj.tmerName == '干湿球温度计') {
						this.temp34Str.show();
					}
					else {
						this.temp34Str.hide();
					}
					this.getForm().findField('tempRegisterId').setValue(obj.id);
					this.temp12Str.show();
					this.temp12Str.focus();
				}
				
				if(obj.thisWeekCount > 0) {
					this.infor.show();
				}
				else {
					this.infor.hide();
				}
			}
		});
	},
	
	resetData: function() {
		this.getForm().findField('tempRegisterId').setValue('');
		this.getForm().findField('tmterNo').setValue('');
		this.getForm().findField('temp12Str').setValue('');
		this.getForm().findField('temp34Str').setValue('');
		this.temp34Str.hide();
	},
	
	getData: function() {
		var data = {};
		data.sampleNo = this.sampleNo;
		data.temp12Str = this.getForm().findField('temp12Str').getValue();
		data.temp34Str = this.getForm().findField('temp34Str').getValue();
		data.tempRegisterId = this.getForm().findField('tempRegisterId').getValue();
		return data;
	}
});