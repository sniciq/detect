/*
 * 检测登记
 */
Ext.namespace('com.ms.controller.register.TempRegistePanel');
com.ms.controller.register.TempRegistePanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
		
		var tempregisterpointNameStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/DetecttempController/searchCustomerName.sdo'}),
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				idProperty:'name',
				root: 'invdata',
				fields: [
					{name: 'name'}
				]
			})
		});
		tempregisterpointNameStore.load();
		
		var editForm = new Ext.FormPanel({
			labelAlign: 'right',
			region: 'center',
			autoScroll:true, 
			labelWidth: 100,
			frame: true,
			xtype: 'fieldset',
			items: [
				{xtype: 'textfield',hidden: true,anchor: '100%',name:'id'},
				{xtype: 'textfield',name: 'unit', fieldLabel: '送检单位',anchor : '95%'},
				{
					xtype: 'combo',fieldLabel: '仪器名称',name: 'tmerName',hiddenName: 'tmerName',anchor : '95%',
					triggerAction: 'all',editable: true,mode: 'local',allowBlank : false,
					valueField: 'value',displayField: 'text',
					store: new Ext.data.SimpleStore({
						fields: ['value', 'text'],
						data: [['水银温度计', '水银温度计'],['石油产品用温度计', '石油产品用温度计'],['有机液体温度计', '有机液体温度计'],['干湿球温度计', '干湿球温度计']]
					})
				},
				{
					xtype: 'combo',fieldLabel: '浸没方式',name: 'immersionType',hiddenName: 'immersionType',anchor : '95%',
					triggerAction: 'all',editable: true,mode: 'local',allowBlank : false,
					valueField: 'value',displayField: 'text',
					store: new Ext.data.SimpleStore({
						fields: ['value', 'text'],
						data: [['全浸', '全浸'],['局浸', '局浸'],['竹节', '竹节']]
					})
				},
				{
					xtype: 'combo',fieldLabel: '感温液体',name: 'sensingLiquid',hiddenName: 'sensingLiquid',anchor : '95%',
					triggerAction: 'all',editable: false,mode: 'local',allowBlank : true,
					valueField: 'value',displayField: 'text',
					store: new Ext.data.SimpleStore({
						fields: ['value', 'text'],
						data: [['有机', '有机'],['汞基', '汞基'],['水银', '水银']]
					})
				},
				{
		            xtype: 'compositefield',
		            fieldLabel: '温度范围',
		            msgTarget: 'side',
		            anchor: '-20',
		            items:[
						{xtype: 'textfield',name: 'minTemp',width: 50, allowBlank: false},
						{xtype: 'displayfield',width: 10,value: '~',html:'~'},
						{xtype: 'textfield',name: 'maxTemp',width: 50, allowBlank: false}
					]
		        },
				{xtype: 'textfield',name: 'miniScale', fieldLabel: '最小分度值',anchor : '95%'},
				{xtype: 'textfield',name: 'manufacturer', fieldLabel: '生产厂家',anchor : '95%'},
				{	
					xtype: 'textfield',name: 'tmterNo', fieldLabel: '编号',anchor : '95%', allowBlank: false,
					listeners: {
						blur: {
							scope: this,
							fn: function(txt) {
								if(txt.getValue() == '') 
									return;
								
								Ext.Ajax.request({
									method: 'post',
									url: '../register/TempRegisterController/checkTmterNo.sdo',
									params: {tmterNo: txt.getValue()},
									success:function(resp){
										var obj=Ext.util.JSON.decode(resp.responseText);
										if(obj.result == 'success') {
										}
										else {
											Ext.MessageBox.alert('错误提示', obj.info);
										}
									}
								})
							}
						}
					}
				},
				{xtype: 'textfield',name: 'sampleNo', fieldLabel: '样品编号',anchor : '95%'},
				{xtype: 'textfield',name: 'certificateNo', fieldLabel: '证书编号',anchor : '95%'},
				{
					xtype: 'combo',
					height: 30,
					allowBlank : true,
					name: 'tempregisterpointName', 
					fieldLabel: '检测点',anchor : '95%',
					emptyText: '检测点...',
					hiddenName: 'tempregisterpointName',
					triggerAction: 'all', 
					forceSelection: true,
					editable: false,
					hideTrigger: false,
					anchor : '95%',
					mode: 'local',
					valueField: 'name',
					displayField: 'name',
					store: tempregisterpointNameStore
				},
				{
					xtype: 'combo',
					fieldLabel: '结果判定',
					name: 'result',
					hiddenName: 'result',
					anchor : '95%',
					triggerAction: 'all', 
					editable: false,
					mode: 'local',
					allowBlank : false,
					valueField: 'value',
					displayField: 'text',
					store: new Ext.data.SimpleStore({
						fields: ['value', 'text'],
						data: [['待测', '待测'],['合格', '合格'], ['不合格', '不合格'], ['断柱', '断柱'], ['损坏', '损坏']]
					})
				}
			],
			buttons: [
				{
					text: '保存'	,
					handler: function() {
						if(!editForm.getForm().isValid())
							return;
						
						editForm.form.doAction('submit', {
							url: '../register/TempRegisterController/save.sdo',
							method: 'post',
							waitTitle:'请等待',
							waitMsg: '正在提交...',
							params: '',
							success: function(form, action) {
								if(action.result.result == 'success') {
									Ext.MessageBox.alert('结果', '保存成功！');
									
									if(form.findField("id").getValue()) {//修改时需要关闭
										form.reset();
										editWin.hide();
									}
									else {//其它情况视为连续增加
										form.findField("tmterNo").setValue('');
									}
									
									grid.getStore().reload();
								}
								else {
									var info = '' || action.result.info;
									Ext.MessageBox.show({
						        		title: '保存错误!',
					        		    msg: info,
					        		    buttons: Ext.Msg.OK,
					        		    icon: Ext.MessageBox.ERROR
						        	});
								}
							}
						});
					}
				},
				{
					text: '取消'	,
					handler: function() {
						editForm.form.reset();
						editWin.hide();
					}
				}
			]
		});
		
		var editWin = new Ext.Window({
			title: '编辑',
			modal: true,
			layout:'fit',
			width:500,
			height:400,
			closeAction:'hide',
			plain: true,
			layout: 'border',
			items: [editForm]
		});
		
		var tempRegisterPointPanel = this.tempRegisterPointPanel = new com.ms.controller.TempRegisterPointPanel({region: 'center'}); 
		
		var detectPointWin = this.detectPointWin = new Ext.Window({
			title: '编辑检测点',
			modal: true,
			layout:'fit',
			width:300,
			height:320,
			closeAction:'hide',
			plain: true,
			layout: 'border',
			items: [tempRegisterPointPanel]
		});
		
		var searchForm = this.searchForm = new Ext.FormPanel({
			frame: true,
			title: '查询',
			collapsible : true,
			collapsed: false,
			collapseMode:'mini',
			region: 'north',
			split: true,
			labelAlign: 'right',
			height: 100,
			items: [
				{
					layout: 'column',
					items: [
						{
							columnWidth: .25, layout: 'form',labelWidth:60,
							items: [
								{
									xtype: 'compositefield',
									items:[
										{xtype: 'datefield',name : 'startDate', fieldLabel: '送检时间', value:myApp.firstDayOfThisWeek,format:'Y-m-d',editable: false},
										{xtype:'displayfield', value:'至'},
										{xtype: 'datefield',name : 'endDate', value:myApp.lastDayOfThisWeek, format:'Y-m-d', editable: false}
									]
								}
							]
						},
						{
							columnWidth: .25, layout: 'form',labelWidth:60,
							items: [
								{xtype: 'textfield',name: 'unit', fieldLabel: '送检单位',anchor : '95%'}
							]
						},
						{
							columnWidth: .25, layout: 'form',labelWidth:60,
							items: [
								{xtype: 'textfield',name: 'tmterNo', fieldLabel: '编号',anchor : '95%'}
							]
						},
						{
							columnWidth: .25, layout: 'form',labelWidth:60,
							items: [
								{xtype: 'textfield',name: 'result', fieldLabel: '结果',anchor : '95%'}
							]
						}
					]
				}
			],
			buttons: [
				{
					text: '查询',
					width: 70,
					scope: this,
					handler: function() {
						this.doSearch();
					}
				},
				{
					text: '打印登记表',
			    	width: 70,
					scope: this,
					handler: function() {
						var sd = this.searchForm.getForm().findField('startDate').getValue().format('Y-m-d');
						var ed = this.searchForm.getForm().findField('endDate').getValue().format('Y-m-d');
												
						var item = {
							id: 'RegistReport_' + sd + '--' + ed,
							title: '登记表_' + sd + '--' + ed,
							closable: true,
							html: '<iframe scrolling="auto" width="100%", height="100%" src="../register/TempRegisterController/showRegistReport.sdo?sd='+sd+'&ed='+ed+'"></iframe>'
						}
						myApp.addTab(item);
					}
				},
				{
					text: '打印误差表',
			    	width: 70,
					scope: this,
					handler: function() {
						var sd = this.searchForm.getForm().findField('startDate').getValue().format('Y-m-d');
						var ed = this.searchForm.getForm().findField('endDate').getValue().format('Y-m-d');
												
						var item = {
							id: 'DeviationReport_' + sd + '--' + ed,
							title: '误差表_' + sd + '--' + ed,
							closable: true,
							html: '<iframe scrolling="auto" width="100%", height="100%" src="../register/TempRegisterController/showDeviationReport.sdo?sd='+sd+'&ed='+ed+'"></iframe>'
						}
						myApp.addTab(item);
					}
				},
				{
					text: '清空',
					width: 70,
					handler: function() {
						searchForm.form.reset();
						ds.baseParams= {};
						ds.load({params: {"extLimit.start":0, "extLimit.limit":20}});
					}
				}
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'ID号', dataIndex:'id', sortable:true, width: 40},
			{header:'编号', dataIndex:'tmterNo', sortable:true},
			{header:'样品编号', dataIndex:'sampleNo', sortable:true},
			{header:'仪器名称', dataIndex:'tmerName', sortable:true, width: 80},
			{header:'送检单位', dataIndex:'unit', sortable:true},
			{header:'温度范围', dataIndex:'minTemp', width: 50, sortable:true,renderer:function(v, cellmeta, record, rowIndex, columnIndex, stor) {
				return record.data.minTemp + ' ~ ' + record.data.maxTemp;
			}},
			{header:'最小分度值', dataIndex:'miniScale', sortable:true, width: 50},
			{header:'浸没方式', dataIndex:'immersionType', sortable:true, width: 50},
			{header:'感温液体', dataIndex:'sensingLiquid', sortable:true, width: 50},
			{header:'生产厂家', dataIndex:'manufacturer', sortable:true},
			{header:'证书编号', dataIndex:'certificateNo', sortable:true},
			{header:'结果判定', dataIndex:'result', sortable:true, width: 50},
			{header:'登记用户', dataIndex:'createUserName', sortable:true, width: 50},
			{header:'创建时间', dataIndex:'createDate', sortable:true, width: 100}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/TempRegisterController/search.sdo'}),
			remoteSort: true,
			paramNames: {
				start : 'extLimit.start', 
			    limit : 'extLimit.limit', 
			    sort : 'extLimit.sort', 
			    dir : 'extLimit.dir'   
			},
			sortInfo: {
			    field: 'id',
			    direction: 'DESC' 
			},
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				idProperty:'id',
				root: 'invdata',
				fields: [
					{name: 'id'},
					{name: 'unit'},
					{name: 'tmerName'},
					{name: 'minTemp'},
					{name: 'maxTemp'},
					{name: 'miniScale'},
					{name: 'manufacturer'},
					{name: 'tmterNo'},
					{name: 'sampleNo'},
					{name: 'certificateNo'},
					{name: 'result'},
					{name: 'createUserID'},
					{name: 'createUserName'},
					{name: 'createDate'},
					{name: 'sensingLiquid'},
					{name: 'immersionType'}
				]
			})
		});
		
		var grid = this.grid = new Ext.grid.GridPanel({
			region: 'center',
			loadMask: true,
			store: ds,
			colModel: cm,
			sm:sm,
			viewConfig: {
				forceFit: true
			},
			tbar: new Ext.Toolbar({
				buttons: [
					{
						text: '查询'	,
						iconCls: 'find',
						handler: function() {
							if(searchForm.collapsed)
								searchForm.expand();
							else
								searchForm.collapse();
						}
					},
					{
						text: '新增',
						iconCls: 'add',
						handler: function() {
							editForm.form.reset();
							editWin.show();
						}
					},
					{
						text: '复制'	,
						iconCls: 'edit',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							if(!rs) {
								Ext.MessageBox.alert('提示', '请先选择一条数据！');
								return
							};
							doCopy(rs.data.id);
						}
					},
					{
						text: '修改'	,
						iconCls: 'edit',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							if(!rs) {
								Ext.MessageBox.alert('提示', '请先选择一条数据！');
								return
							};
							showInfo(rs.data.id);
						}
					},
					{
						text: '检测点'	,
						iconCls: 'edit',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							if(!rs) {
								Ext.MessageBox.alert('提示', '请先选择一条数据！');
								return
							};
							showDetectPoint(rs.data.id);
						}
					},
					{
						text: '删除'	,
						iconCls: 'del',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							if(!rs) {
								Ext.MessageBox.alert('提示', '请先选择一条数据！');
								return
							};
							deleteResource(rs.data.id, rs.data.unit + " " + rs.data.tmerName);
						}
					}
				]
			}),
			bbar: new Ext.PagingToolbar({
				pageSize: 20,
				store: ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录',
				items: [
				    '-'
				]
			})
		});
		
		function doCopy(id) {
			editWin.show();
			editForm.load({
				url: '../register/TempRegisterController/getDetailInfo.sdo',
				params: {id: id},
				success:function(form,action){
					form.findField('id').setValue('');
					form.findField('tmterNo').setValue('');
				}
			});
		}
		
		function showInfo(id) {
			editForm.load({
				url: '../register/TempRegisterController/getDetailInfo.sdo',
				params: {id: id},
				success:function(form,action){
				}
			});
			editWin.show();
		}
		
		function showDetectPoint(registerId) {
			detectPointWin.show();
			tempRegisterPointPanel.loadData(registerId);
		}
		
		function deleteResource(id, info) {
			Ext.MessageBox.confirm('提示', '确定删除  ' + info + ' ?', function(btn) {
				if(btn != 'yes') {
					return;
				}
				Ext.Ajax.request({
					method: 'post',
					url: '../register/TempRegisterController/delete.sdo',
					params: {id: id},
					success:function(resp){
						var obj=Ext.util.JSON.decode(resp.responseText);
						if(obj.result == 'success') {
							grid.getStore().reload();
							Ext.MessageBox.alert('提示', '删除成功！');
						}
						else {
							Ext.MessageBox.alert('报错了！！！', '删除失败！！！' + obj.info);
						}
					}
				});
			});
		}
		
		Ext.apply(this, {  
            iconCls: 'tabs',  
            autoScroll: false,  
            closable: true,
            layout: 'border',
            items:[
            	searchForm,grid
            ]
        });  
        //调用父类构造函数（必须）  
        com.ms.controller.register.TempRegistePanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
		this.doSearch();
	},
	
	doSearch: function() {
		var fv = this.searchForm.getForm().getValues();
		this.grid.getStore().baseParams= fv;
		this.grid.getStore().load({params: {"extLimit.start":0, "extLimit.limit":20}});
	}
	
});
