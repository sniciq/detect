/*
 * 系统资源管理界面
 */
 
Ext.namespace('com.ms.basic.ResourcePanel');
com.ms.basic.ResourcePanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
		
		var store = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../basic/ResourcesController/searchPic.sdo'}),
			remoteSort: true,
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				idProperty:'id',
				root: 'invdata',
				fields: [
					{name: 'url'}
				]
			})
		});
		store.load();
		
		var tpl = new Ext.XTemplate(
			'<div class="resource_icon_panel">',
				'<ul>',
	                '<tpl for=".">',
	                    '<li class="resource_icon_panel_icon">',
	                        '<img width="32" height="32" src="{url}" />',
	                    '</li>',
	                '</tpl>',
	            '</ul>',
            '<div>'
        );
		
		var dataview = this.dataview = new Ext.DataView({
			store: store,
			tpl: tpl,
			id:'images-view',
		    frame:true,
		    width:535,
		    autoHeight:true,
		    collapsible:true,
		    layout:'fit',
		    title:'Simple DataView',
		    itemSelector: 'li.resource_icon_panel_icon',
		    singleSelect: true,
		    multiSelect : true,
		    autoScroll  : true,
			cls: 'resource_icon_panel',
			overClass   : 'resource_icon_panel_icon-hover',
			listeners: {
				click: {
					scope: this,
					fn:  function(dv, index, b, c) {
						var url = this.dataview.store.data.items[index].data.url;
						this.editForm.getForm().findField('icon').setValue(url);
						this.iconWin.hide();
			    	}
				}
			}
	    });
		
		var iconWin = this.iconWin = new Ext.Window({
			title: '图标',
			modal: true,
			layout: 'fit',
			autoScroll: true,
			width: 480,
			height: 300,
			closeAction:'hide',
			plain: true,
			items:[this.dataview]		
		});
		
		var editForm = this.editForm = new Ext.FormPanel({
			labelAlign: 'right',
			region: 'center',
			autoScroll:true, 
			labelWidth: 100,
			frame: true,
			xtype: 'fieldset',
			items: [
				{
					items: [
						{
							columnWidth: .01, layout: 'form',
							items: [
								{ xtype: 'hidden', name: 'id', hidden:true, hiddenLabel:true}
							]
						}
					]
				},
				{
					items: [
						{
							layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'nodeId', fieldLabel: '节点ID',allowBlank : false,anchor : '95%'}
							]
						},
						{
							layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'menuName', fieldLabel: '菜单名称',allowBlank : false,anchor : '95%'}
							]
						},
						{
							layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'parantNodeID', fieldLabel: '父节点ID',allowBlank : true,anchor : '95%'}
							]
						},
						{
							layout: 'form',
							items: [
								{
									xtype: 'compositefield',
					    			fieldLabel: '图标',
					    			layout: 'hbox',
					    			layoutConfig: {
					                    padding:'10',
					                    align:'middle'
					                },
					                defaults:{margins:'0 20 0 0'},
					    			items: [
					                    {xtype: 'textfield', name: 'icon', frame: true, flex:1},
					                    {xtype: 'button', text: '选择图标', width:70, margins:'0 30 0 0', scope: this,
					                    	handler: function() {
					                    		this.iconWin.show();
											}
					                    }
					                ]
								}
							]
						},
						{
							layout: 'form',
							items: [
								new Ext.form.ComboBox({
									fieldLabel: '类型',
									name: 'type',
									hiddenName: 'type',
									anchor : '95%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									allowBlank : false,
									valueField: 'value',
									displayField: 'text',
									value: 'iframe',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['JSClass', 'JSClass'],['iframe', 'iframe']]
									}),
									listeners : {
							            select : {
							            	scope: this,
							            	fn: function(comb, record, index) {
								            	var v = comb.getValue();
								            	this.valiDateType(v);
								            }
							            }
									}
								})
							]
						},
						{
							layout: 'form',
							items: [
								{ id: 'txt_actionPath', xtype: 'textfield', name: 'actionPath', fieldLabel: '路径',allowBlank : true,anchor : '95%'}
							]
						},
						{
							layout: 'form',
							items: [
								{ id: 'txt_MainClass', xtype: 'textfield', name: 'mainClass', fieldLabel: '主类',allowBlank : true,anchor : '95%'}
							]
						},
						{
							layout: 'form',
							items: [
								{ id: 'txt_jsClassFile', xtype: 'textfield', name: 'jsClassFile', fieldLabel: 'JS文件,多个时用";"分隔',allowBlank : true,anchor : '95%'}
							]
						},
						{
							layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'menuOrder', fieldLabel: '排序号',allowBlank : true,anchor : '95%'}
							]
						},
						{
							layout: 'form',
							items: [
								new Ext.form.ComboBox({
									fieldLabel: '是否可用',
									name: 'isValiDate',
									hiddenName: 'isValiDate',
									anchor : '95%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									allowBlank : false,
									valueField: 'value',
									displayField: 'text',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['1', '可用'],['0', '不可用']]
									})
								})
							]
						},
						{
							layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'description', fieldLabel: '描述',allowBlank : true,anchor : '95%'}
							]
						}
					]
				}
			],
			buttons: [
				{
					text: '保存'	,
					scope: this,
					handler: function() {
						if(!editForm.getForm().isValid())
							return;
						
						editForm.form.doAction('submit', {
							url: '../basic/ResourcesController/save.sdo',
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
		
		var editWin = this.editWin = new Ext.Window({
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
								{ xtype: 'textfield', name: 'nodeId', fieldLabel: '节点ID',anchor : '95%'}
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'menuName', fieldLabel: '菜单名称',anchor : '95%'}
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'parantNodeID', fieldLabel: '父节点ID',anchor : '95%'}
							]
						}
					]
				},
				{
					layout: 'column',
					items: [
						{
							columnWidth: .33, layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'icon', fieldLabel: '图标',anchor : '95%'}
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'menuOrder', fieldLabel: '排序号',anchor : '95%'}
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'actionPath', fieldLabel: '路径',anchor : '95%'}
							]
						}
					]
				},
				{
					layout: 'column',
					items: [
						{
							columnWidth: .33, layout: 'form',
							items: [
								new Ext.form.ComboBox({
									fieldLabel: '是否可用',
									name: 'valiDate',
									hiddenName: 'isValiDate',
									anchor : '95%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									valueField: 'value',
									displayField: 'text',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['1', '可用'],['0', '不可用']]
									})
								})
							]
						},
						{
							columnWidth: .33, layout: 'form',
							items: [
								{ xtype: 'textfield', name: 'description', fieldLabel: '描述',anchor : '95%'}
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
						ds.load({params: {start:0, limit:20}});
					}
				}),
				new Ext.Button({
						text: '清空',
						width: 70,
						handler: function() {
							searchForm.form.reset();
							ds.baseParams= {};
							ds.load({params: {start:0, limit:20}});
						}
				})
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect:true
		});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'节点ID', dataIndex:'nodeId', sortable:true},
			{header:'菜单名称', dataIndex:'menuName', sortable:true},
			{header:'父节点ID', dataIndex:'parantNodeID', sortable:true},
			{header:'图标', dataIndex:'icon', sortable:true},
			{header:'路径', dataIndex:'actionPath', sortable:true},
			{header:'jsClassFile', dataIndex:'jsClassFile', sortable:true},
			{header:'排序号', dataIndex:'menuOrder', sortable:true},
			{header:'是否可用', dataIndex:'isValiDate', sortable:true, renderer:renderVal},
			{header:'描述', dataIndex:'description', sortable:true}
		]);
		
		function renderVal(v) {
			if(v == '1')
				return '<font style="color: #379337;font-weight: bold;">可用</font>';
			else {
				return '<font style="color: #DDDDDD;font-weight: bold;">不可用</font>';
			}
		}
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../basic/ResourcesController/search.sdo'}),
			remoteSort: true,
			sortInfo: {
				field: 'menuOrder',
				direction: 'ASC'
			},
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				idProperty:'id',
				root: 'invdata',
				fields: [
					{name: 'id', type: 'int'},
					{name: 'nodeId', type: 'int'},
					{name: 'menuName'},
					{name: 'parantNodeID', type: 'int'},
					{name: 'icon'},
					{name: 'openIcon'},
					{name: 'actionPath'},
					{name: 'jsClassFile'},
					{name: 'menuOrder', type: 'int'},
					{name: 'isValiDate'},
					{name: 'description'}
				]
			})
		});
		
		ds.load({params: {start:0, limit:25}});
		
		var grid = this.grid = new Ext.grid.GridPanel({
			region: 'center',
			ds: ds,
			cm: cm,
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
						scope: this,
						handler: function() {
							editForm.form.reset();
							editForm.getForm().setValues({type: 'iframe',isValiDate: 1})
							this.valiDateType('iframe')
							editWin.show(Ext.getBody());
						}
					},
					{
						text: '修改'	,
						iconCls: 'edit',
						scope: this,
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							this.showInfo(rs.data.id);
						}
					},
					{
						text: '删除'	,
						scope: this,
						iconCls: 'del',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							this.deleteResource(rs.data.id, rs.data.menuName);
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
							grid.exportToExcel();
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
		            	this.showInfo(rs.data.id);
		            }
		        },
		        {
		            text: '删除',
		            iconCls: 'del',
		            scope: this,
		            handler: function() {
		            	var rs = grid.getSelectionModel().getSelected();
		            	this.deleteResource(rs.data.id, rs.data.menuName);
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
			this.showInfo(record.data.id);
		}, this);
		
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
        com.ms.basic.ResourcePanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
	},
	
	showInfo: function(id) {
		this.editForm.load({
			scope: this,
			url: '../basic/ResourcesController/getDetailInfo.sdo',
			params: {id: id},
			success:function(form,action){
				var v = this.editForm.getForm().findField('type').getValue();
				this.valiDateType(v);
			}
		});
		this.editWin.show(Ext.getBody());
	},
	
	deleteResource: function (id, info) {
		Ext.MessageBox.confirm('提示', '确定删除  ' + info + ' ?', function(btn) {
			if(btn != 'yes') {
				return;
			}
			Ext.Ajax.request({
				method: 'post',
				scope: this,
				url: '../basic/ResourcesController/delete.sdo',
				params: {id: id},
				success:function(resp){
					var obj=Ext.util.JSON.decode(resp.responseText);
					if(obj.result == 'success') {
						this.grid.getStore().reload();
						Ext.MessageBox.alert('提示', '删除成功！');
					}
					else {
						Ext.MessageBox.alert('报错了！！！', '删除失败！！！' + obj.info);
					}
				}
			});
		}, this);
	},
	
	valiDateType: function(v) {
    	if(v == 'iframe') {
    		Ext.getCmp('txt_actionPath').show();
    		Ext.getCmp('txt_jsClassFile').hide();
    		Ext.getCmp('txt_MainClass').hide();
    	}
    	else {
    		Ext.getCmp('txt_actionPath').hide();
    		Ext.getCmp('txt_jsClassFile').show();
    		Ext.getCmp('txt_MainClass').show();
    	}
	}
});