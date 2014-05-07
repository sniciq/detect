/*
 * 样本录入
 */
Ext.namespace('com.ms.controller.register.RegisterRecordPanel');
com.ms.controller.register.RegisterRecordPanel=Ext.extend(Ext.Panel, {
	fullScreen: false,
	initComponent: function() {
		this.operateMask = this.operateMask = new Ext.LoadMask(Ext.getBody(), {msg:"正在操作，请耐心等待..."});
		var l_width = 90;
		var r_width = 110;
		var dl_width = 70;
		var f_height = 25;
		var todayStr = new Date().format('Y-m-d');
		
		var detectForm = this.detectForm = new Ext.FormPanel({
			frame: true,
			items: [
				{ xtype: 'textfield', hidden:true,fieldLabel: '地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点',name: 'address', labelStyle: 'font-weight:bold;font-size:15px;',height: f_height,value:"本院3504房间", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true},
				{xtype: 'textfield',hidden: true,anchor: '100%',name:'detectId'},
				{
					layout: 'column',
					items: [
						{
							columnWidth: .3, layout: 'form',labelWidth: dl_width,
							items: [{ xtype: 'textfield', hidden:true,fieldLabel: '实验编号',readOnly:true,name: 'experimentNo', labelStyle: 'font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
						},
						{
							columnWidth: .7, layout: 'form',labelWidth: dl_width,
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
						}
					]
				},
				{
					layout: 'column',
					items: [
						{
							columnWidth: .5, layout: 'form',labelWidth: dl_width,
							items: [{ xtype: 'numberfield', fieldLabel: '温度(℃)',name: 'temp', labelStyle: 'font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
						},
						{
							columnWidth: .5, layout: 'form',labelWidth: dl_width+30,
							items: [{ xtype: 'numberfield', fieldLabel: '湿度(%HR)',name: 'humidity',labelStyle: 'font-weight:bold;font-size:15px;', height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
						}
					]
				},
				{
					layout: 'column',
					items: [
						{
							columnWidth: .5, layout: 'form',labelWidth: dl_width,
							items: [{ 
								xtype: 'numberfield', fieldLabel: '名义温度',name: 'detectTemp', labelStyle: 'font-weight:bold;font-size:15px;',
								height: f_height,value:"", cls : 'text-RegisterRecordPanel', 
								anchor : '99%', allowBlank : true,scope:this,
								listeners: {
									change: function(input, v) {
										if(v == 0) {
											detectForm.getForm().findField('standardTmpterId').hide();
											detectForm.getForm().findField('standardTempStr').hide();
										}
										else {
											detectForm.getForm().findField('standardTmpterId').show();
											detectForm.getForm().findField('standardTempStr').show();
										}
									}
								}
							}]
						},
						{
							columnWidth: .5, layout: 'form',labelWidth: dl_width+30,
							items: [
						        {
									xtype: 'combo',
									labelStyle: 'font-weight:bold;font-size:15px;',
									height: f_height,
									allowBlank : true,
									cls : 'text-RegisterRecordPanel-combo',
									name: 'standardTmpterId', fieldLabel: '标&nbsp;&nbsp;&nbsp;&nbsp;准&nbsp;&nbsp;&nbsp;&nbsp;器',anchor : '99%',
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
							columnWidth: .5, layout: 'form',labelWidth: dl_width,
							items: [{ xtype: 'textfield', fieldLabel: '读&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数',name: 'standardTempStr', labelStyle: 'background-color:#FFFF00;font-weight:bold;font-size:15px;',height: f_height,value:"", cls : 'text-RegisterRecordPanel', anchor : '99%', allowBlank : true}]
						}
					]
				}
			]
		});
		
		var sample1 = this.sample1 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 1, detectForm:detectForm});
		var sample2 = this.sample2 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 2, detectForm:detectForm});
		var sample3 = this.sample3 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 3, detectForm:detectForm});
		var sample4 = this.sample4 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 4, detectForm:detectForm});
		var sample5 = this.sample5 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 5, detectForm:detectForm});
		var sample6 = this.sample6 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 6, detectForm:detectForm});
		var sample7 = this.sample7 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 7, detectForm:detectForm});
		var sample8 = this.sample8 = new com.ms.controller.register.RegisterRecordPanelSamplePanel({sampleNo: 8, detectForm:detectForm});
		
		Ext.apply(this, {  
            autoScroll: true,  
            frame: true,
            buttonAlign: 'center',
            items: [
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
//								this.detectForm.getForm().reset();
//								this.initMethod();
								
								var rp = new com.ms.controller.register.RegisterRecordPanel();
								myApp.addTab({
									title: '样本录入',
									id: 'RegisterRecordPanel_new_'+new Date(),
									closable: true,
									layout: 'fit',
									items:[rp]
								});
								rp.initMethod();
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
						}
				    ]
				},
                {
					xtype: 'tabpanel',
					activeTab: 0,
					ref: 'myTab',
					items: [
						{
							title: '实验信息及标准器信息',
							items:[detectForm]
						},
						{
							title: '样本信息录入',border: false,
							items:[
								sample1,sample2,sample3,sample4,sample5,sample6,sample7,sample8,
								{
									frame: true,
									html: '<b>特别提示：/:表示断柱，%:表示超差</b>'
								}
							]
						}
					],
					listeners: {
						beforetabchange: function(tab, newTab, currentTab) {
							if(currentTab && newTab) {
								if(currentTab.title == '实验信息及标准器信息' && newTab.title == '样本信息录入') {
									var dt = detectForm.getForm().findField('detectTemp').getValue();
									if(dt == '') {
										Ext.MessageBox.show({title: '提示',msg: "请先录入名义温度",buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
										return false;
									}
								}
							}
						}
					}
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
							text: '<span style="font-size:15px;font-weight: bold;cursor:pointer">提交</span>',
							scope: this,
							handler: function() {
								this.doSubmit();
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
	},
	
	doSubmit: function() {
		Ext.MessageBox.confirm('提示', '确定提交  ?', function(btn) {
			if(btn != 'yes') {
				return;
			}
			
			var postData = {};
			postData.samples = new Array();
			postData.samples.push(this.sample1.getData());
			postData.samples.push(this.sample2.getData());
			postData.samples.push(this.sample3.getData());
			postData.samples.push(this.sample4.getData());
			postData.samples.push(this.sample5.getData());
			postData.samples.push(this.sample6.getData());
			postData.samples.push(this.sample7.getData());
			postData.samples.push(this.sample8.getData());
			postData.detect = this.detectForm.getForm().getValues();
			
			this.operateMask.show();
			var dataStr = Ext.encode(postData);
			
			Ext.Ajax.request({
				url: '../register/SampleRecordController/registSampleNew.sdo',
				method: 'post',
				waitTitle:'请等待',
				waitMsg: '正在提交...',
				scope: this,
				params: {data: dataStr},
				success:function(resp){
					this.operateMask.hide();
					var obj=Ext.util.JSON.decode(resp.responseText);
					if(obj.result == 'success') {
						if(obj.experimentNo) {
							this.detectForm.getForm().findField('experimentNo').setValue(obj.experimentNo);
						}
						if(obj.detectId) {
							this.detectForm.getForm().findField('detectId').setValue(obj.detectId);
						}
						
						this.showSaveInfo('<font style="font-weight: bold;color:#333">保存成功!</font>');

						this.detectForm.getForm().reset();
						this.detectForm.getForm().findField('standardTmpterId').show();
						this.detectForm.getForm().findField('standardTempStr').show();
						this.sample1.resetData();
						this.sample2.resetData();
						this.sample3.resetData();
						this.sample4.resetData();
						this.sample5.resetData();
						this.sample6.resetData();
						this.sample7.resetData();
						this.sample8.resetData();
						this.myTab.setActiveTab(0);
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
		}, this);
	},
	
	showSaveInfo: function(info) {
		this.panel_saveinfor.getEl().update(info);
		var task = new Ext.util.DelayedTask(function(){
			this.panel_saveinfor.getEl().update('');
		}, this);
		task.delay(900); 
	}
});
