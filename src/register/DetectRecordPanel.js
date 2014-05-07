/*
 * 实验查询管理
 */
Ext.namespace('com.ms.controller.register.DetectRecordPanel');
com.ms.controller.register.DetectRecordPanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
		
		var editForm = new Ext.FormPanel({
			labelAlign: 'right',
			region: 'center',
			autoScroll:true, 
			labelWidth: 130,
			frame: true,
			xtype: 'fieldset',
			items: [
				{xtype: 'textfield',hidden: true,anchor: '100%',name:'id'},
				{
					xtype: 'combo',
					allowBlank : true,
					name: 'standardTmpterId', fieldLabel: '标准器',anchor : '95%',
					emptyText: '输入标准器编号检索...',
					hiddenName: 'standardTmpterId',
					triggerAction: 'all', 
					forceSelection: true,
					editable: true,
					hideTrigger: false,
					anchor : '95%',
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
								{name: 'tmterNo'}
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
				},
				{xtype: 'textfield',name: 'experimentNo', fieldLabel: '实验编号',anchor : '95%'},
				{
					xtype: 'combo',fieldLabel: '院设备编号',name: 'equipmentNo',hiddenName: 'equipmentNo',anchor : '95%',
					triggerAction: 'all',editable: false,mode: 'local',allowBlank : false,
					valueField: 'value',displayField: 'text',
					store: new Ext.data.SimpleStore({
						fields: ['value', 'text'],
						data: [['RG024', 'RG024'],['RG025', 'RG025'],['RG026', 'RG026']]
					})
				},
				
				{xtype: 'textfield',name: 'temp', fieldLabel: '温度',anchor : '95%'},
				{xtype: 'textfield',name: 'humidity', fieldLabel: '湿度',anchor : '95%'},
				{xtype: 'textfield',name: 'address', fieldLabel: '地点',anchor : '95%'},
				{xtype: 'textfield',name: 'detectTemp', fieldLabel: '名义温度',anchor : '95%'},
				{xtype: 'textfield',name: 'tempReal_str', fieldLabel: '温槽实际温度',anchor : '95%'},
				{xtype: 'textfield',name: 'temp1_input', fieldLabel: '读数1',anchor : '95%'},
				{xtype: 'textfield',name: 'temp2_input', fieldLabel: '读数2',anchor : '95%'},
				{xtype: 'textfield',name: 'tempAvg1_str', fieldLabel: '平均读数',anchor : '95%'}
			],
			buttons: [
				{
					text: '保存'	,
					handler: function() {
						if(!editForm.getForm().isValid())
							return;
						
						editForm.form.doAction('submit', {
							url: '../register/DetectRecordController/save.sdo',
							method: 'post',
							waitTitle:'请等待',
							waitMsg: '正在提交...',
							params: '',
							success: function(form, action) {
								if(action.result.result == 'success') {
									Ext.MessageBox.alert('结果', '保存成功！');
									form.reset();
									grid.getStore().reload();
									editWin.hide();
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
			height:380,
			closeAction:'hide',
			plain: true,
			layout: 'border',
			items: [editForm]
		});
	
		var searchForm = this.searchForm = new Ext.FormPanel({
			frame: true,
			title: '查询',
			collapsible : true,
			collapsed: false,
			autoHeight:true,
			collapseMode:'mini',
			region: 'north',
			split: true,
			labelAlign: 'right',
			layout: 'hbox',
			defaults: {width:200, layout: 'form', labelWidth: 80, margins:'0 5 0 0'},
			items: [
		        {
		        	width:330,
		        	items: [
						{
							xtype: 'compositefield',
							items:[
								{xtype: 'datefield',name : 'startDate',fieldLabel: '实验时间', value:myApp.firstDayOfThisWeek,format:'Y-m-d',width: 110, editable: false},
								{xtype:'displayfield', value:'至'},
								{xtype: 'datefield',name : 'endDate', format:'Y-m-d',value:myApp.lastDayOfThisWeek, width: 110, editable: false}
							]
						}
					]
		        },
				{
					items: [
						{
							xtype: 'combo',fieldLabel: '院设备编号',name: 'equipmentNo',hiddenName: 'equipmentNo',anchor : '95%',
							triggerAction: 'all',editable: false,mode: 'local',allowBlank : false,
							valueField: 'value',displayField: 'text',
							store: new Ext.data.SimpleStore({
								fields: ['value', 'text'],
								data: [['RG024', 'RG024'],['RG025', 'RG025'],['RG026', 'RG026']]
							})
						}
					]
				},
				{
					items: [
						{xtype: 'textfield',name: 'experimentNo', fieldLabel: '实验编号',anchor : '95%'}
					]
				},
				{
					xtype: 'button',
					text: '查询',
					width: 70,
					scope: this,
					handler: function() {
						this.doSearch();
					}
				},
				{
					xtype: 'button',
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
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'ID号', dataIndex:'id',width: 60, sortable:true},
			{header:'名义温度', dataIndex:'detectTemp', width: 80,sortable:true},
			{header:'实验编号', dataIndex:'experimentNo', width: 80,sortable:true},
			{header:'院设备编号', dataIndex:'equipmentNo',width: 80, sortable:true},
			{header:'温度', dataIndex:'temp', width: 60,sortable:true},
			{header:'湿度', dataIndex:'humidity',width: 60, sortable:true},
			{header:'测定依据', dataIndex:'detectBasis', width: 120,sortable:true},
			{header:'地点', dataIndex:'address', sortable:true},
			{header:'时间', dataIndex:'createDate', width: 120, sortable:true},
			{header:'创建用户', dataIndex:'createUserName', sortable:true}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/DetectRecordController/search.sdo'}),
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
					{name: 'standardTmpterId'},
					{name: 'createUserName'},
					{name: 'tmterNo'},
					{name: 'experimentNo'},
					{name: 'equipmentNo'},
					{name: 'temp'},
					{name: 'humidity'},
					{name: 'address'},
					{name: 'createDate'},
					{name: 'detectTemp'},
					{name: 'temp1'},
					{name: 'temp2'},
					{name: 'temp1_input'},
					{name: 'temp2_inpu'},
					{name: 'temp3'},
					{name: 'temp4'},
					{name: 'tempAvg1'},
					{name: 'tempAvg2'},
					{name: 'tempReal'},
					{name: 'detectBasis'}
				]
			})
		});
		
		var grid = this.grid = new Ext.grid.GridPanel({
			region: 'center',
			store: ds,
			loadMask: true,
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
						text: '修改'	,
						iconCls: 'edit',
						handler: function() {
							var selItems = grid.getSelectionModel().getSelections();
			        		if(selItems.length != 1) {
			        			Ext.MessageBox.alert('提示', "请选择一个记录！");
			        			return;
			        		}
							var rs = grid.getSelectionModel().getSelected();
							showInfo(rs.data.id);
						}
					},
					{
						text: '删除'	,
						iconCls: 'del',
						handler: function() {
							var selItems = grid.getSelectionModel().getSelections();
			        		if(selItems.length != 1) {
			        			Ext.MessageBox.alert('提示', "请选择一个记录！");
			        			return;
			        		}
							var rs = grid.getSelectionModel().getSelected();
							deleteResource(rs.data.id, rs.data.experimentNo);
						}
					},
					{
						text: '查看记录表',
						iconCls: 'add',
						handler: function() {
							var selItems = grid.getSelectionModel().getSelections();
							if(selItems.length <= 0) {
								Ext.MessageBox.alert('提示', '请至少选择一个实验记录！');
								return;
							}
							
							var ids = '';
							for(var i = 0; i < selItems.length; i++) {
								ids += selItems[i].data.id+'-'
							}
							printReport(ids);
							//var rs = grid.getSelectionModel().getSelected();
							//printReport(rs.data.id, rs.data.experimentNo);
						}
					}
				]
			}),
			bbar: new Ext.PagingToolbar({
				pageSize: 25,
				store: ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录',
				items: [
					'-',
					{
						text: '导出(前台)'	,
						iconCls: 'export',
						handler: function() {
							var vExportContent = grid.getExcelXml();
							document.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(vExportContent);  
						}
					}
				]
			})
		});
		
		var contextMenu = new Ext.menu.Menu({
	        items: [
		        {
		            text: '修改',
		            iconCls: 'edit',
		            scope: this,
		            handler: function() {
		            	var rs = grid.getSelectionModel().getSelected();
		            	showInfo(rs.data.id);
		            }
		        },
		        {
		            text: '删除',
		            iconCls: 'del',
		            scope: this,
		            handler: function() {
		            	var rs = grid.getSelectionModel().getSelected();
		            	deleteResource(rs.data.id, rs.data.experimentNo);
		            }
		        }
			]
	    });
	    
	    grid.on('rowcontextmenu', function(grid, index, event) {
			event.stopEvent();
			grid.getSelectionModel().selectRow(index);
			contextMenu.showAt(event.getXY());
		});
		
		grid.addListener('rowdblclick', function(grid, rowindex, e) {
			var record = grid.getStore().getAt(rowindex);
			showInfo(record.data.id);
		});
		
		function showInfo(id) {
			editForm.load({
				url: '../register/DetectRecordController/getDetailInfo.sdo',
				params: {id: id},
				success:function(form,action){
					var _rs = new Ext.data.Record({id: action.result.data.standardTmpterId, tmterNo: action.result.data.tmterNo}, action.result.data.standardTmpterId) ;
					form.findField('standardTmpterId').getStore().removeAll();
					form.findField('standardTmpterId').getStore().insert(0, _rs);
					form.findField('standardTmpterId').setValue(action.result.data.standardTmpterId);
				}
			});
			editWin.show();
		}
		
		function deleteResource(id, info) {
			Ext.MessageBox.confirm('提示', '确定删除  ' + info + ' ?', function(btn) {
				if(btn != 'yes') {
					return;
				}
				Ext.Ajax.request({
					method: 'post',
					url: '../register/DetectRecordController/delete.sdo',
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
		
		function printReport(ids) {
			var item = {
				id: 'printReport_' + ids,
				title: '记录表_' + ids,
				closable: true,
				html: '<iframe scrolling="auto" width="100%", height="100%" src="../register/DetectRecordController/showDetectReport.sdo?ids='+ids+'"></iframe>'
			}
			myApp.addTab(item);
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
        com.ms.controller.register.DetectRecordPanel.superclass.initComponent.apply(this, arguments);
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
