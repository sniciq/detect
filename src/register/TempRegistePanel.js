/*
 * comments
 */
Ext.namespace('com.ms.controller.register.TempRegistePanel');
com.ms.controller.register.TempRegistePanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
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
				{xtype: 'textfield',name: 'tmerName', fieldLabel: '仪器名称',anchor : '95%'},
				{
		            xtype: 'compositefield',
		            fieldLabel: '温度范围',
		            msgTarget: 'side',
		            anchor: '-20',
		            items:[
						{xtype: 'numberfield',name: 'minTemp',width: 50, allowBlank: false},
						{xtype: 'displayfield',width: 10,value: '~',html:'~'},
						{xtype: 'numberfield',name: 'maxTemp',width: 50, allowBlank: false}
					]
		        },
				{xtype: 'numberfield',name: 'miniScale', fieldLabel: '最小分度值',anchor : '95%'},
				{xtype: 'textfield',name: 'manufacturer', fieldLabel: '生产厂家',anchor : '95%'},
				{xtype: 'textfield',name: 'tmterNo', fieldLabel: '编号',anchor : '95%'},
				{xtype: 'textfield',name: 'sampleNo', fieldLabel: '样品编号',anchor : '95%'},
				{xtype: 'textfield',name: 'certificateNo', fieldLabel: '证书编号',anchor : '95%'},
				new Ext.form.ComboBox({
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
				})
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
			height:320,
			closeAction:'hide',
			plain: true,
			layout: 'border',
			items: [editForm]
		});
	
		var searchForm = new Ext.FormPanel({
			frame: true,
			title: '查询',
			collapsible : true,
			collapsed: true,
			autoHeight:true,
			collapseMode:'mini',
			region: 'north',
			split: true,
			labelAlign: 'right',
			items: [
				{
					layout: 'column',
					items: [
						{
							columnWidth: .33, layout: 'form',
							items: [
								{xtype: 'textfield',name: 'unit', fieldLabel: '送检单位',anchor : '95%'}
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{xtype: 'textfield',name: 'tmterNo', fieldLabel: '编号',anchor : '95%'}
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{xtype: 'textfield',name: 'result', fieldLabel: 'result',anchor : '95%'}
							]
						}
					]
				}
			],
			buttons: [
				new Ext.Button({
					text: '查询',
					width: 70,
					handler: function() {
						var fv = searchForm.getForm().getValues();
						ds.baseParams= fv;
						ds.load({params: {"extLimit.start":0, "extLimit.limit":20}});
					}
				}),
				new Ext.Button({
						text: '清空',
						width: 70,
						handler: function() {
							searchForm.form.reset();
							ds.baseParams= {};
							ds.load({params: {"extLimit.start":0, "extLimit.limit":20}});
						}
				})
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'送检单位', dataIndex:'unit', sortable:true},
			{header:'仪器名称', dataIndex:'tmerName', sortable:true},
			{header:'温度范围', dataIndex:'minTemp', sortable:true,renderer:function(v, cellmeta, record, rowIndex, columnIndex, stor) {
				return record.data.minTemp + ' ~ ' + record.data.maxTemp;
			}},
			{header:'最小分度值', dataIndex:'miniScale', sortable:true},
			{header:'生产厂家', dataIndex:'manufacturer', sortable:true},
			{header:'编号', dataIndex:'tmterNo', sortable:true},
			{header:'样品编号', dataIndex:'sampleNo', sortable:true},
			{header:'证书编号', dataIndex:'certificateNo', sortable:true},
			{header:'结果判定', dataIndex:'result', sortable:true},
			{header:'登记用户', dataIndex:'createUserName', sortable:true},
			{header:'创建时间', dataIndex:'createDate', sortable:true}
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
			//${ModuleGridSortInfo},
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
					{name: 'createDate'}
				]
			})
		});
		ds.load({params: {"extLimit.start":0, "extLimit.limit":25}});
		
		var grid = new Ext.grid.GridPanel({
			region: 'center',
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
				pageSize: 25,
				store: ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录',
				items: [
//					'-',
//					{
//						text: '导出(前台)'	,
//						iconCls: 'export',
//						handler: function() {
//							var vExportContent = grid.getExcelXml();
//							document.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(vExportContent);  
//						}
//					}
				]
			})
		});
		
		function showInfo(id) {
			editForm.load({
				url: '../register/TempRegisterController/getDetailInfo.sdo',
				params: {id: id},
				success:function(form,action){
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
	}
});
