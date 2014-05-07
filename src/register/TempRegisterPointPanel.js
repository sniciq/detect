/*
 * 登记样本的检测点
 */
Ext.namespace('com.ms.controller.TempRegisterPointPanel');
com.ms.controller.TempRegisterPointPanel=Ext.extend(Ext.Panel, {
	registerId: 0,
	
	initComponent: function() {
		
		var searchForm = new Ext.FormPanel({
			labelAlign: 'right',
			region: 'north',
			autoScroll:true, 
			labelWidth: 100,
			height: 50,
			frame: true,
			layout: 'hbox',
			layoutConfig: {
                padding:'5',
                align:'middle'
            },
            defaults:{margins:'0 5 0 0',width: 60},
			items: [
				{
					width: 120, layout: 'form',labelWidth: 40,
					items: [
						{xtype: 'numberfield',name: 'temp', fieldLabel: '温度',anchor : '95%',allowBlank : false}
					]
				},
				{
					xtype: 'button',
					text: '保存'	,
					scope: this,
					handler: function() {
						if(!searchForm.getForm().isValid())
							return;
						
						searchForm.form.doAction('submit', {
							url: '../register/TempregisterpointController/save.sdo',
							method: 'post',
							waitTitle:'请等待',
							waitMsg: '正在提交...',
							params: {tempRegisterId: this.registerId},
							success: function(form, sdo) {
								if(sdo.result.result == 'success') {
									Ext.MessageBox.alert('结果', '保存成功！');
									form.reset();
									grid.getStore().reload();
								}
								else {
									var info = '' || sdo.result.info;
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
					xtype: 'button',
					text: '取消'	,
					handler: function() {
						searchForm.form.reset();
					}
				}
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'温度', dataIndex:'temp', sortable:true}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/TempregisterpointController/search.sdo'}),
			remoteSort: true,
			paramNames: {
				start : 'extLimit.start', 
			    limit : 'extLimit.limit', 
			    sort : 'extLimit.sort', 
			    dir : 'extLimit.dir'   
			},
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				idProperty:'id',
				root: 'invdata',
				fields: [
					{name: 'id'},
					{name: 'temp'}
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
						text: '删除'	,
						iconCls: 'del',
						handler: function() {
							var rs = grid.getSelectionModel().getSelected();
							deleteResource(rs.data.id, rs.data.temp);
						}
					}
				]
			})
		});
		
		function deleteResource(id, info) {
			Ext.MessageBox.confirm('提示', '确定删除  ' + info + ' ?', function(btn) {
				if(btn != 'yes') {
					return;
				}
				Ext.Ajax.request({
					method: 'post',
					url: '../register/TempregisterpointController/delete.sdo',
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
        com.ms.controller.TempRegisterPointPanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
	},
	
	loadData: function(registerId) {
		this.registerId = registerId;
		this.grid.getStore().baseParams = {tempRegisterId: registerId};
		this.grid.getStore().load();
	}
});
