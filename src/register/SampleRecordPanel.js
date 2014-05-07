/*
 * 检测历史查询
 */
Ext.namespace('com.ms.controller.register.SampleRecordPanel');
com.ms.controller.register.SampleRecordPanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
		var editForm = new Ext.FormPanel({
			labelAlign: 'right',
			region: 'center',
			autoScroll:true, 
			labelWidth: 100,
			frame: true,
			items: [
				{xtype: 'textfield',hidden: true,anchor: '100%',name:'id'},
				{
					xtype: 'combo',
					allowBlank : false,
					name: 'detectID', fieldLabel: '实验编号',anchor : '95%',
					emptyText: '输入实验编号检索...',
					hiddenName: 'detectID',
					triggerAction: 'all', 
					forceSelection: true,
					editable: true,
					hideTrigger: false,
					anchor : '95%',
					mode: 'local',
					valueField: 'id',
					displayField: 'experimentNo',
					store: new Ext.data.Store({
						proxy: new Ext.data.HttpProxy({url: '../register/DetectRecordController/search.sdo'}),
						reader: new Ext.data.JsonReader({
							totalProperty: 'total',
							idProperty:'id',
							root: 'invdata',
							fields: [
								{name: 'id'},
								{name: 'experimentNo'}
							]
						})
					}),
					listeners : {
						keyUp: function(comboBox, e){
							if(e.getKey() == 16 || e.getKey() == 17 || e.getKey() == 18 || e.getKey() == 20 || e.getKey() == 27 || e.getKey() == 13 || e.getKey() == 37 || e.getKey() == 38 || e.getKey() == 39 || e.getKey() == 40)
								return;
							comboBox.store.load({params: {experimentNo: comboBox.el.dom.value, "extLimit.start":0, "extLimit.limit":20, 'extLimit.sort': 'tmterNo', 'extLimit.dir': 'DESC'}});
						}
					}
				},
				{xtype: 'numberfield',name: 'tempRegisterId', fieldLabel: '检测登记ID',anchor : '95%'},
				{xtype: 'textfield',name: 'temp1_input', fieldLabel: '温度1',anchor : '95%'},
				{xtype: 'textfield',name: 'temp2_input', fieldLabel: '温度2',anchor : '95%'},
				{xtype: 'textfield',name: 'temp3_input', fieldLabel: '湿度1',anchor : '95%'},
				{xtype: 'textfield',name: 'temp4_input', fieldLabel: '湿度2',anchor : '95%'},
				{xtype: 'textfield',name: 'tempAvg1_str', fieldLabel: '平均温度',anchor : '95%'},
				{xtype: 'textfield',name: 'tempAvg2_str', fieldLabel: '平均湿度',anchor : '95%'},
				{xtype: 'textfield',name: 'result1_str', fieldLabel: '结果1',anchor : '95%'},
				{xtype: 'textfield',name: 'result2_str', fieldLabel: '结果2',anchor : '95%'}
			],
			buttons: [
				{
					text: '保存'	,
					handler: function() {
						if(!editForm.getForm().isValid())
							return;
						
						editForm.form.doAction('submit', {
							url: '../register/SampleRecordController/save.sdo',
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
			title: '编辑, 特别提示：读数中: "/":表示断柱，"%":表示超差',
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
								{xtype: 'datefield',name : 'startDate', fieldLabel: '送检时间', value:myApp.firstDayOfThisWeek,format:'Y-m-d',editable: false},
								{xtype:'displayfield', value:'至'},
								{xtype: 'datefield',name : 'endDate', value:myApp.lastDayOfThisWeek, format:'Y-m-d', editable: false}
							]
						}
					]
		        },
				{
					items: [
						{xtype: 'textfield',name: 'tempRegisterTmterNo', fieldLabel: '编号',anchor : '95%'}
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
				}
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'ID号', dataIndex:'id',width: 60, sortable:true},
			{header:'检测登记ID', dataIndex:'tempRegisterId', sortable:true},
			{header:'编号', dataIndex:'tempRegisterTmterNo', sortable:true},
			{header:'样本编号', dataIndex:'tempRegisterSampleNo', sortable:true},
			{header:'名义温度', dataIndex:'detectTemp', sortable:true},
//			{header:'读数1', dataIndex:'temp1',width: 60, sortable:true},
//			{header:'读数2', dataIndex:'temp2',width: 60, sortable:true},
//			{header:'湿度1', dataIndex:'temp3', width: 60,sortable:true},
//			{header:'湿度2', dataIndex:'temp4',width: 60, sortable:true},
			{header:'平均温度', dataIndex:'tempAvg1',width: 60, sortable:true},
			{header:'平均湿度', dataIndex:'tempAvg2',width: 60, sortable:true},
			{header:'结果1', dataIndex:'result1', sortable:true},
			{header:'结果2', dataIndex:'result2', sortable:true},
			{header:'实验编号', dataIndex:'experimentNo', sortable:true},
			{header:'创建用户', dataIndex:'createUserName', sortable:true},
			{header:'时间', width: 140,dataIndex:'createDate', sortable:true}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/SampleRecordController/search.sdo'}),
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
					{name: 'detectID'},
					{name: 'tempRegisterId'},
					{name: 'tempRegisterTmterNo'},
					{name: 'tempRegisterSampleNo'},
					{name: 'experimentNo'},
					{name: 'detectTemp'},
					{name: 'sampleNo'},
					{name: 'createUserName'},
					{name: 'createDate'},
					{name: 'temp1'},
					{name: 'temp2'},
					{name: 'temp3'},
					{name: 'temp4'},
					{name: 'tempAvg1'},
					{name: 'tempAvg2'},
					{name: 'result1'},
					{name: 'result2'}
				]
			})
		});
		
		var grid = this.grid = new Ext.grid.GridPanel({
			region: 'center',
			store: ds,
			colModel: cm,
			sm:sm,
			viewConfig: {
				forceFit: false
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
							var rs = grid.getSelectionModel().getSelected();
							showInfo(rs.data.id);
						}
					},
					{
						text: '删除'	,
						iconCls: 'del',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							deleteResource(rs.data.id, rs.data.id);
						}
					},
					{
						text: '查看记录表',
						iconCls: 'add',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							printReport(rs.data.detectID);
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
//					'-',
//					{
//						text: '打印'	,
//						iconCls: 'find',
//						handler: function() {
//						}
//					}
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
		            	deleteResource(rs.data.id, rs.data.id);
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
				method: 'post',
				url: '../register/SampleRecordController/getDetailInfo.sdo',
				params: {id: id},
				success:function(form, action){
					var _rs = new Ext.data.Record({id: action.result.data.detectID, experimentNo: action.result.data.experimentNo}, action.result.data.detectID) ;
					form.findField('detectID').getStore().removeAll();
					form.findField('detectID').getStore().insert(0, _rs);
					form.findField('detectID').setValue(action.result.data.detectID);
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
					url: '../register/SampleRecordController/delete.sdo',
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
		
		function printReport(detectID) {
			var item = {
				id: 'printReport_' + detectID,
				title: '记录表_' + detectID,
				closable: true,
				html: '<iframe scrolling="auto" width="100%", height="100%" src="../register/DetectRecordController/showDetectReport.sdo?ids='+detectID+'"></iframe>'
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
        com.ms.controller.register.SampleRecordPanel.superclass.initComponent.apply(this, arguments);
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
