/*
 * 检测点管理
 */
Ext.namespace('com.ms.controller.register.DetectTempPanel');
com.ms.controller.register.DetectTempPanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
		var editForm = new Ext.FormPanel({
			labelAlign: 'right',
			region: 'center',
			autoScroll:true, 
			labelWidth: 60,
			frame: true,
			xtype: 'fieldset',
			items: [
				{xtype: 'textfield',hidden: true,anchor: '100%',name:'id'},
				{xtype: 'textfield',name: 'name', fieldLabel: '名称',anchor : '95%'},
				{xtype: 'numberfield',name: 'temp', fieldLabel: '温度',anchor : '95%'}
			],
			buttons: [
				{
					text: '保存'	,
					handler: function() {
						if(!editForm.getForm().isValid())
							return;
						
						editForm.form.doAction('submit', {
							url: '../register/DetecttempController/save.sdo',
							method: 'post',
							waitTitle:'请等待',
							waitMsg: '正在提交...',
							params: '',
							success: function(form, action) {
								if(action.result.result == 'success') {
									Ext.MessageBox.alert('结果', '保存成功！');
									form.findField('temp').setValue('');
									grid.getStore().reload();
//									form.reset();
//									editWin.hide();
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
			width:300,
			height:140,
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
			layout: 'hbox',
			defaults: {width:250, layout: 'form', labelWidth: 50, margins:'0 5 0 0'},
			items: [
				{
					items: [
						{ xtype: 'textfield', name: 'name', fieldLabel: '名称',anchor : '95%'}
					]
				},
				{
					xtype: 'button',
					text: '查询',
					width: 70,
					handler: function() {
						var fv = searchForm.getForm().getValues();
						ds.baseParams= fv;
						ds.load({params: {"extLimit.start":0, "extLimit.limit":20}});
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
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'ID号', dataIndex:'id', width: 60, sortable:true},
			{header:'名称', dataIndex:'name', width: 180,  sortable:true},
			{header:'温度', dataIndex:'temp',  width: 80, sortable:true}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/DetecttempController/search.sdo'}),
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
					{name: 'name'},
					{name: 'temp'}
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
							deleteResource(rs.data.id, rs.data.menuName);
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
		            	deleteResource(rs.data.id, rs.data.menuName);
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
				url: '../register/DetecttempController/getDetailInfo.sdo',
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
					url: '../register/DetecttempController/delete.sdo',
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
        com.ms.controller.register.DetectTempPanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
	}
});
