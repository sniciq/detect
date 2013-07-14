/*
 * comments
 */
Ext.namespace('com.ms.controller.register.CorrectionPanel');
com.ms.controller.register.CorrectionPanel=Ext.extend(Ext.Panel, {
	standardTmpterId: 0,
	
	initComponent: function() {
		
		var editForm = new Ext.FormPanel({
			labelAlign: 'right',
			region: 'north',
			autoScroll:true, 
			height: 60,
			frame: true,
			layout: 'hbox',
			layoutConfig: {
                padding:'5',
                align:'middle'
            },
            defaults:{margins:'0 5 0 0'},
            items: [
				{
					width: 200, layout: 'form',labelWidth: 80,
					items: [
						{xtype: 'numberfield',name: 'value', fieldLabel: '计数值',anchor : '95%'}
					]
				},
				{
					width: 200, layout: 'form',labelWidth: 80,
					items: [
						{xtype: 'numberfield',name: 'correction', fieldLabel: '修正值',anchor : '95%'}
					]
				},
				{
					xtype: 'button',
					text: '保存',
					width: 70,
					scope: this,
					handler: function() {
						if(!editForm.getForm().isValid())
							return;
						
						editForm.form.doAction('submit', {
							url: '../register/StandardtmptercorrectionController/save.sdo',
							method: 'post',
							waitTitle:'请等待',
							waitMsg: '正在提交...',
							params: {standardTmpterId: this.standardTmpterId},
							success: function(form, action) {
								if(action.result.result == 'success') {
									Ext.MessageBox.alert('结果', '保存成功！');
									form.reset();
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
					xtype: 'button',
					text: '清空',
					width: 70,
					handler: function() {
						editForm.form.reset();
					}
				}
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
			{header:'计数值', dataIndex:'value', sortable:true},
			{header:'修正值', dataIndex:'correction', sortable:true}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/StandardtmptercorrectionController/search.sdo'}),
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
					{name: 'standardTmpterId'},
					{name: 'value'},
					{name: 'correction'}
				]
			})
		});
		
		var grid = this.grid = new Ext.grid.GridPanel({
			region: 'center',
			store: ds,
			colModel: cm,
			sm:sm,
			loadMask: true,
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
							if(!rs) {
								Ext.MessageBox.alert('提示', '请先选择一条数据！');
								return
							};
							deleteResource(rs.data.id, rs.data.value);
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
					url: '../register/StandardtmptercorrectionController/delete.sdo',
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
            autoScroll: false,  
            closable: true,
            layout: 'border',
            items:[
            	editForm,grid
            ]
        });  
        //调用父类构造函数（必须）  
        com.ms.controller.register.CorrectionPanel.superclass.initComponent.apply(this, arguments);
	},
	
	initMethod: function() {
	},
	
	loadData: function(standardTmpterId) {
		this.standardTmpterId = standardTmpterId; 
		this.grid.store.baseParams = {standardTmpterId: standardTmpterId};
		this.grid.store.load();
	}
});
