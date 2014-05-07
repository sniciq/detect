/*
 * 本周进度
 */
Ext.namespace('com.ms.controller.register.WeekProgressPanel');
com.ms.controller.register.WeekProgressPanel=Ext.extend(Ext.Panel, {
	initComponent: function() {
		
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
			items: [
				{
					layout: 'column',
					items: [
						{
							columnWidth: 1, layout: 'form',labelWidth:60,
							items: [
								{
									xtype: 'compositefield',
									items:[
										{xtype: 'datefield',name : 'startDate', fieldLabel: '送检时间', value:myApp.firstDayOfThisWeek,format:'Y-m-d',editable: false},
										{xtype:'displayfield', value:'至'},
										{xtype: 'datefield',name : 'endDate', value:myApp.lastDayOfThisWeek, format:'Y-m-d', editable: false},
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
								}
							]
						}
					]
				}
			]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(),
//			{header:'ID号', dataIndex:'id', sortable:true, width: 40},
			{header:'送检单位', dataIndex:'unit', sortable:true},
			{header:'编号', dataIndex:'tmterNo', sortable:true, width: 40},
			{header:'样品编号', dataIndex:'sampleNo', sortable:true, width: 40},
			{header:'温度范围', dataIndex:'minTemp', width: 50, sortable:true,renderer:function(v, cellmeta, record, rowIndex, columnIndex, stor) {
				return record.data.minTemp + ' ~ ' + record.data.maxTemp;
			}},
			{header:'需检温点数', dataIndex:'needDetectPonits', sortable:false, width: 50},
			{header:'已检温点数', dataIndex:'detectedPonits', sortable:false, width: 50},
			{header:'未检温点', dataIndex:'tbDetectedPonits', sortable:false, width: 50},
			{header:'送检时间', dataIndex:'createDate', sortable:true, width: 40}
		]);
		
		var ds = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({url: '../register/TempRegisterController/searchProgress.sdo'}),
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
					{name: 'immersionType'},
					{name: 'detectedPonits'},
					{name: 'needDetectPonits'},
					{name: 'tbDetectedPonits'}
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
			bbar: new Ext.PagingToolbar({
				pageSize: 20,
				store: ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录',
				items: [
				]
			})
		});
		
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
        com.ms.controller.register.WeekProgressPanel.superclass.initComponent.apply(this, arguments);
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
