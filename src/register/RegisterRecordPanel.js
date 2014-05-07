/*
 * 样本录入
 */
Ext.namespace('com.ms.controller.register.RegisterRecordPanel');
com.ms.controller.register.RegisterRecordPanel=Ext.extend(Ext.FormPanel, {
	fullScreen: false,
	initComponent: function() {
		this.operateMask = this.operateMask = new Ext.LoadMask(Ext.getBody(), {msg:"正在操作，请耐心等待..."});
		var l_width = 90;
		var r_width = 110;
		var dl_width = 70;
		var f_height = 25;
		var todayStr = new Date().format('Y-m-d');
		
		Ext.apply(this, {  
            autoScroll: true,  
            frame: true,
            buttonAlign: 'center',
            items: [
				{ xtype: 'textfield', hidden:true,fieldLabel: '地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点',name: 'address', labelStyle: 'font-weight:bold;font-size:15px;',height: f_height,value:"本院3504房间", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true},
				{
					layout: 'hbox',
					layoutConfig: {
                        padding:'5',
                        pack:'center',
                        align:'middle'
                    },
                    defaults:{margins:'0 5 0 0', xtype: 'button',width: 80,scale: 'large'},
                    items:[
						{
							text: '<span style="font-size:15px;font-weight: bold;cursor:pointer">新建实验</span>',
							scope: this,
							handler: function() {
								this.getForm().reset();
								this.initMethod();
								
//								myApp.addTab({
//									title: '样本录入',
//									id: 'aaaaaaaaaa',
//									closable: true,
//									layout: 'fit',
//									items:[new com.ms.controller.register.RegisterRecordPanel()]
//								});
							}
						},
						{
							text: '<span style="font-size:15px;font-weight: bold;cursor:pointer">全屏</span>',
							scope: this,
							handler: function(btn) {
								if(this.fullScreen) {
									this.fullScreen = false;
									btn.setText('<span style="font-size:15px;font-weight: bold;cursor:pointer">全屏</span>');
								}
								else {
									this.fullScreen = true;
									btn.setText('<span style="font-size:15px;font-weight: bold;cursor:pointer">退出全屏</span>');
								}
								myApp.fullScreen();
							}
						},
						{
							text: '<span style="font-size:15px;font-weight: bold;cursor:pointer">结束</span>',
							scope: this,
							handler: function() {
								this.next();
								this.getForm().reset();
								this.initMethod();
							}
						}
                    ]
				},
				{
                	xtype: 'fieldset',
                	title: '实验信息及标准器信息',
                	layout: 'form',
                	items: [
                	    {xtype: 'textfield',hidden: true,anchor: '100%',name:'detectId'},
						{
							layout: 'column',
							items: [
								{
									columnWidth: .5, layout: 'form',labelWidth: dl_width,
									items: [{ xtype: 'textfield', fieldLabel: '实验编号',readOnly:true,name: 'experimentNo', labelStyle: 'font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								},
								{
									columnWidth: .5, layout: 'form',labelWidth: dl_width,
									items: [
										{
											columnWidth: 1, layout: 'form',labelWidth: dl_width+20,
											items: [
												{
												    xtype: 'radiogroup',
												    fieldLabel: '院设备编号',
												    labelStyle: 'font-weight:bold;font-size:15px;',
												    name: 'equipmentNoGroup',
												    cls : 'text-RegisterRecordPanel',
												    items: [{
												        boxLabel: 'RG024',
												        name: 'equipmentNo',
												        inputValue: 'RG024',
												        checked: true
												    }, {
												        boxLabel: 'RG025',
												        name: 'equipmentNo',
												        inputValue: 'RG025'
												    }, {
												        boxLabel: 'RG026',
												        name: 'equipmentNo',
												        inputValue: 'RG026'
												    }]
												}
											 ]
										}
									]
								}
							]
						},
						{
							layout: 'column',
							items: [
								{
									columnWidth: .6, layout: 'form',labelWidth: dl_width,
									items: [
										{
										    xtype: 'checkboxgroup',
										    fieldLabel: '检定依据',
										    labelStyle: 'font-weight:bold;font-size:15px;',
										    cls : 'text-RegisterRecordPanel',
										    items: [{
										        boxLabel: 'JJG130-2011',
										        name: 'detectBasis_JJG130-2011',
										        inputValue: 'JJG130-2011',
										        checked: true
										    }, {
										        boxLabel: 'JJG131-2004',
										        name: 'detectBasis_JJG131-2004',
										        inputValue: 'JJG131-2004'
										    }]
										}
									 ]
								},
								{
									columnWidth: .4, layout: 'form',labelWidth: dl_width,
									items: [{ xtype: 'numberfield', fieldLabel: '温度(℃)',name: 'temp', labelStyle: 'font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								}
							]
						},
						{
							layout: 'column',
							items: [
								{
									columnWidth: .33, layout: 'form',labelWidth: dl_width+30,
									items: [{ xtype: 'numberfield', fieldLabel: '湿度(%HR)',name: 'humidity',labelStyle: 'font-weight:bold;font-size:15px;', height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								},
								{
									columnWidth: .33, layout: 'form',labelWidth: dl_width,
									items: [{ xtype: 'numberfield', fieldLabel: '名义温度',name: 'detectTemp', labelStyle: 'font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								},
								{
									columnWidth: .33, layout: 'form',labelWidth: dl_width,
									items: [
								        {
											xtype: 'combo',
											id: 'RegisterRecordPanel-standardTmpterId',
											labelStyle: 'font-weight:bold;font-size:15px;',
											height: f_height,
											allowBlank : false,
											cls : 'text-RegisterRecordPanel-combo',
											name: 'standardTmpterId', fieldLabel: '标准器',anchor : '99%',
											emptyText: '输入标准器编号检索...',
											hiddenName: 'standardTmpterId',
											triggerAction: 'all', 
											forceSelection: true,
											editable: true,
											hideTrigger: true,
											anchor : '99%',
											mode: 'local',
											valueField: 'id',
											displayField: 'tmterNo',
											store: new Ext.data.Store({
												proxy: new Ext.data.HttpProxy({url: '../register/StandardTmpterController/search.sdo'}),
												reader: new Ext.data.JsonReader({
													totalProperty: 'total',
													idProperty:'id',
													root: 'invdata',
													fields: [
														{name: 'id'},
														{name: 'tmterNo'},
														{name: 'miniScale'}
													]
												})
											}),
											listeners : {
												keyUp: function(comboBox, e){
													if(e.getKey() == 16 || e.getKey() == 17 || e.getKey() == 18 || e.getKey() == 20 || e.getKey() == 27 || e.getKey() == 13 || e.getKey() == 37 || e.getKey() == 38 || e.getKey() == 39 || e.getKey() == 40)
														return;
													comboBox.store.load({params: {tmterNo: comboBox.el.dom.value, "extLimit.start":0, "extLimit.limit":20, 'extLimit.sort': 'tmterNo', 'extLimit.dir': 'DESC'}});
												}
											}
										}
									]
								}
							]
						},
						{
							layout: 'column',
							items: [
								{
									columnWidth: .33, layout: 'form',labelWidth: dl_width-20,
									items: [{ xtype: 'textfield', fieldLabel: '读数',name: 'standardTempStr', labelStyle: 'background-color:#FFFF00;font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								}
							]
						}
                	]
                },
                {
                	xtype: 'fieldset',
                	title: '样本信息及结果',
                	layout: 'form',
                	items: [
						{
							layout: 'column',
							items: [
								{
									columnWidth: .15, layout: 'form',labelWidth: 40,
									items: [{ xtype: 'numberfield', fieldLabel: '序号', readOnly:true, name: 'sampleNo',labelStyle: 'font-weight:bold;font-size:15px;', height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								},
								{
									columnWidth: .3, layout: 'form',labelWidth: 40,
									items: [
									    {
											xtype: 'combo',
											id: 'RegisterRecordPanel-tempRegisterId',
											labelStyle: 'font-weight:bold;font-size:15px;',
											height: f_height,
											allowBlank : false,
											cls : 'text-RegisterRecordPanel-combo',
											name: 'tempRegisterId', fieldLabel: '编号',anchor : '99%',
											emptyText: '输入登记编号检索...',
											hiddenName: 'tempRegisterId',
											triggerAction: 'all', 
											forceSelection: true,
											editable: true,
											hideTrigger: true,
											anchor : '99%',
											mode: 'local',
											valueField: 'id',
											displayField: 'tmterNo',
											store: new Ext.data.Store({
												proxy: new Ext.data.HttpProxy({url: '../register/TempRegisterController/search.sdo'}),
												reader: new Ext.data.JsonReader({
													totalProperty: 'total',
													idProperty:'id',
													root: 'invdata',
													fields: [
														{name: 'id'},
														{name: 'tmterNo'},
														{name: 'tmerName'},
														{name: 'miniScale'}
													]
												})
											}),
											listeners : {
												keyUp: function(comboBox, e){
													if(e.getKey() == 16 || e.getKey() == 17 || e.getKey() == 18 || e.getKey() == 20 || e.getKey() == 27 || e.getKey() == 13 || e.getKey() == 37 || e.getKey() == 38 || e.getKey() == 39 || e.getKey() == 40)
														return;
													comboBox.store.load({params: {tmterNo: comboBox.el.dom.value, "extLimit.start":0, "extLimit.limit":20, 'extLimit.sort': 'tmterNo', 'extLimit.dir': 'DESC'}});
												},
												select: {
													scope: this,
													fn: function(combo, record, index) {
														if(record.data.tmerName == '干湿球温度计') {
															this.temp34Str.show();
														}
														else {
															this.temp34Str.hide();
														}
													}
												}
											}
										}
									]
								},
								{
									columnWidth: .2, layout: 'form',labelWidth: dl_width-20,
									items: [{ xtype: 'textfield', fieldLabel: '读数',name: 'temp12Str', labelStyle: 'background-color:#00FFFF;font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								},
								{
									columnWidth: .2, layout: 'form',hidden:true,ref: '../../temp34Str',labelWidth: dl_width-20,
									items: [{ xtype: 'textfield', fieldLabel: '湿度',name: 'temp34Str', labelStyle: 'background-color:#00FFFF;font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
								}
							]
						}
                	]
                },
				{
					layout: 'hbox',
					layoutConfig: {
                        padding:'5',
                        pack:'center',
                        align:'middle'
                    },
                    defaults:{margins:'0 5 0 0', xtype: 'button',width: 80,scale: 'large'},
                    items:[
						{
							text: '<span style="font-size:15px;font-weight: bold;cursor:pointer">下一个</span>',
							scope: this,
							handler: function() {
								this.next();
							}
						}, {
							scope: this,
							xtype: 'panel',
							ref: '../panel_saveinfor',
							html: ' '
						}
                    ]
				}
            ]
        });  
        //调用父类构造函数（必须）  
        com.ms.controller.register.RegisterRecordPanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
		this.operateMask.show();
		Ext.Ajax.request({
			method: 'post',
			url: '../register/SampleRecordController/initRegist.sdo',
			scope: this,
			success:function(resp){
				this.operateMask.hide();
				var obj=Ext.util.JSON.decode(resp.responseText);
				this.getForm().findField('sampleNo').setValue(1);
				this.getForm().findField('detectId').setValue("");
				
				//实验信息和标准器信息----设置为可修改
				this.getForm().findField('equipmentNoGroup').enable();
				this.getForm().findField('temp').enable();
				this.getForm().findField('humidity').enable();
				this.getForm().findField('detectTemp').enable();
				this.getForm().findField('standardTmpterId').enable();
				this.getForm().findField('standardTempStr').enable();
				
				this.doLayout();
			}
		});
	},
	
	next: function() {
		this.operateMask.show();
		var data = this.getForm().getValues();
		
		//disabled的属性需要单独取
		data.standardTmpterId = this.getForm().findField('standardTmpterId').getValue();
		data.equipmentNoGroup = this.getForm().findField('equipmentNoGroup').getValue();
		data.temp = this.getForm().findField('temp').getValue();
		data.humidity = this.getForm().findField('humidity').getValue();
		data.detectTemp = this.getForm().findField('detectTemp').getValue();
		data.standardTempStr = this.getForm().findField('standardTempStr').getValue();
		
		Ext.Ajax.request({
			url: '../register/SampleRecordController/registSample.sdo',
			method: 'post',
			waitTitle:'请等待',
			waitMsg: '正在提交...',
			scope: this,
			params: data,
			success:function(resp){
				this.operateMask.hide();
				var obj=Ext.util.JSON.decode(resp.responseText);
				if(obj.result == 'success') {
					if(obj.experimentNo) {
						this.getForm().findField('experimentNo').setValue(obj.experimentNo);
					}
					if(obj.detectId) {
						this.getForm().findField('detectId').setValue(obj.detectId);
					}
					
					this.showSaveInfo('<font style="font-weight: bold;color:#333">保存成功!</font>');

					//需要清空样本数据
					var sampleNo = this.getForm().findField('sampleNo').getValue();
					this.getForm().findField('sampleNo').setValue(sampleNo + 1);
					this.getForm().findField('tempRegisterId').setValue('');
					this.getForm().findField('temp12Str').setValue('');
					this.getForm().findField('temp34Str').setValue('');
					this.temp34Str.hide();
					
					//实验信息和标准器信息不可修改
					this.getForm().findField('equipmentNoGroup').disable();
					this.getForm().findField('temp').disable();
					this.getForm().findField('humidity').disable();
					this.getForm().findField('detectTemp').disable();
					this.getForm().findField('standardTmpterId').disable();
					this.getForm().findField('standardTempStr').disable();
					
					if(sampleNo + 1 >= 9) {
						this.getForm().reset();
						this.initMethod();
					}
				}
				else {
					var info = '' || obj.info;
					this.showSaveInfo('<font style="font-weight: bold;color:#FF0000">保存错误!</font>');
					Ext.MessageBox.show({
		        		title: '保存错误!',
	        		    msg: info,
	        		    buttons: Ext.Msg.OK,
	        		    icon: Ext.MessageBox.ERROR
		        	});
				}
			}
		});
	},
	
	showSaveInfo: function(info) {
		this.panel_saveinfor.getEl().update(info);
		var task = new Ext.util.DelayedTask(function(){
			this.panel_saveinfor.getEl().update('');
		}, this);
		task.delay(900); 
	}
});
