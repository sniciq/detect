Ext.namespace('ms.office');

ms.office.app = Ext.extend(Ext.util.Observable, {
	constructor : function(config) {
		this.monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
		var date = new Date();
		
		this.nowYear = date.getFullYear();
		
		this.yearData = [];
		for(var i = this.nowYear - 3; i <= this.nowYear; i++) {
			this.yearData.push({value: i,text: i});
		}
		
		this.nowMonth = date.getMonth();//月份从0开始
		this.nowMonth = this.nowMonth + 1;//系统中月份需要从1开始，0表示全部
		this.nowQuarter = Math.floor(this.nowMonth/3);
		var tt = this.nowMonth % 3;
		if(tt > 0) {
			this.nowQuarter =this.nowQuarter + 1;
		}
		
		var nowDate = new Date();
		var wd = nowDate.getDay();
		this.firstDayOfThisWeek = nowDate.add(Date.DAY, (1 - wd));
		this.lastDayOfThisWeek = this.firstDayOfThisWeek.add(Date.DAY, 6);
		
		
		this.commonChart = new yk.stat.office.CommonChart();
		
		this.cachedModuls = [];
		this.userObj = new Object();
		this.init();
		this.appJSLoader = new yk.stat.office.JSLoader();
		
        Ext.apply(this, config);
        this.addEvents('loadUserInfoOver');
        ms.office.app.superclass.constructor.call(this);
	},
	
	init: function() {
		this.userInfoTpl = new Ext.XTemplate(
			'<div class="userInfo">',
				'{realName}, 欢迎您！',
			'</div>',
		    {
		    	compiled: true
            }
		);
		
		this.top = new Ext.Panel({
			collapseMode:'mini',
			collapsed: false,
			region: 'north',
			frame: false,
			height: 55,
			border: false,
			baseCls:'x-plain',
			layout: 'hbox',
			layoutConfig : {
				padding: 0, 
				align: 'top'
			},
			defaults:{
				margins:'3 10 0 0'
			},
			items: [
				{
					bodyStyle: 'margin-left: 20px;',
					baseCls:'x-plain',
//					html: '<img height="50px" src="'+globalCtx+'/images/sysname.png" />',
					border: false,
					flex:1
				},
				{
					bodyStyle: 'margin-top: 10px;',
					xtype: 'panel',ref: 'userInfoPanel',baseCls:'x-plain',
					width: 150,
					border:true
				}
			]
		})
		
//		this.MenuTreePanel = new yk.stat.office.MenuTreePanel({
//			title: '导航',
//			region: 'west',
//			split : true,
//			border : false,
//			collapseMode:'mini',//在分割线处出现按钮
//	        collapsible : true,
//			collapsed : false,
//			width : 180,
//			minSize : 10,
//			maxSize : 300,
//			layout : 'accordion',
//			layoutConfig:{
//	        }
//		});
		
		this.MenuTreePanel = new yk.stat.office.DataViewMenuPanel({
			title: '导航',
			region: 'west',
			split : true,
			border : false,
			collapseMode:'mini',//在分割线处出现按钮
	        collapsible : true,
			collapsed : false,
			width : 180,
			minSize : 10,
			maxSize : 600,
			layout : 'accordion',
			layoutConfig:{
	        }
		});
		
		this.MenuTreePanel.on('menuClick', this.clickTree, this);
		
		this.mainTab = new Ext.TabPanel({
			region: 'center',
			margins: '0 5 0 0',
			activeTab: 0,
			enableTabScroll:true,
			plugins: new Ext.ux.TabCloseMenu(),
			items:[],
			listeners: {
				beforeadd: {
					scope: this,
					fn: function() {
					}
				},
				add: {
					scope: this,
					fn: function() {
					}
				},
				beforetabchange: {
					scope: this,
					fn: function(tab, newTab, currentTab) {
					}
				}
			}
		});
		this.mainTab.on('tabchange', this.changeTab, this);
		
		var cp = new Ext.state.CookieProvider();
		var AdStatETheme = cp.get("AdStatEThemeCSS");
		if(!AdStatETheme || AdStatETheme == '') {
			AdStatETheme = 'blue';
		}
		
		Ext.Themes = [
			['默认主题', 'blue'],
			['灰色主题', 'gray']
		];  
	  
		this.themesStore = new Ext.data.SimpleStore({  
		    fields: ['name', 'css'],  
		    data: Ext.Themes  
		}); 
		
		this.themesCombo = new Ext.form.ComboBox({ 
			id: 'ThemeCombId',
		    store: this.themesStore,
		    width: 90,
		    valueField: 'css',  
		    displayField: 'name',  
		    value: AdStatETheme,
		    mode: 'local',
		    fieldLabel: '主题',
		    typeAhead: true,  
		    editable: false,  
		    triggerAction: 'all',     
		    selectOnFocus: true  
		});  
		this.themesCombo.on('select', function(c, re, index) {
		    cp.set("AdStatEThemeCSS", c.getValue());
		    this.setActiveStyleSheet(c.getValue());
		},this);
		
		var allTreeMenu = this.allTreeMenu = new Ext.menu.Menu({
			allowOtherMenus: true,
			items: [
			]
		});
		
		var menu = new Ext.menu.Menu({
	        plain: true,
	        width: 200,
	        layout:'menu',
	        items: [
	        	{
	                xtype: 'panel',
	                height: 27,
	                border: false
	        	},
	            {
	            	xtype: 'panel',
	            	id: 'regularlyPanel',
	            	layout: {
                        type:'vbox',
                        padding:'5',
                        align:'stretch'
                    },
                    defaults:{margins:'0 0 5 0',xtype: 'button'},
                    height: 200,
                    items:[
                    ]
                },
                '-',
	            {
		            text: '所有功能',
		            iconCls : 'allResource',
		            width: 100,
	                menu: allTreeMenu
	            },
	            '-',
	            {
	                xtype: 'toolbar',
	                buttonAlign: 'right',
                    items: [{
                    	iconAlign: 'left',
                    	iconCls: 'logout',
                    	xtype: 'button',
                    	text: '退出系统',
                    	handler: function() {
				        	Ext.MessageBox.confirm('提示',"确定退出登录？？", function(btn) {
								if(btn != 'yes') {
									return;
								}
								Ext.Ajax.request({
									method: 'POST',
									url: globalCtx+'/basic/LoginController/logout.sdo',
									success:function(resp){
										var obj=Ext.util.JSON.decode(resp.responseText);
								      	if(obj.result == 'success') {
								      		top.location.href=globalCtx + '/login.jsp';
								      	}
								      	else {
								      		Ext.MessageBox.alert('报错了！！！', '错误！！！');
								      	}
									}
								})
							});
				        }
                    }]
	            }
	        ]
		});
	
		this.btoolBar = new Ext.Toolbar({
			collapsible : true,
			collapseMode:'mini',
			region: 'south',
			height: 27,
			layout: 'hbox',
			layoutConfig: {
	            padding:'0',
	            align:'center'
	        },
	        defaults:{margins:'0 0 0 0'},
			items:[
				{
					text:'<b>系统功能</b>',
					scale: 'medium',
					iconAlign: 'left',
                	arrowAlign:'top',
					iconCls: 'syslog',
					menu: menu
				},
			    '-',
			    {
	                xtype:'spacer',
	                flex:.2
	            },
	            '-',
	            {
	            	xtype:'label',
	            	width: 180,
			        html:'sys 1.0'
	            },
	            '-',
	            {
	            	id : 'SysInfor',
	            	width: 180,
	            	xtype:'label'
	            },
	            {
	                xtype:'spacer',
	                flex:.2
	            },
	            '-',
	            {
			        text:'收展',
			        iconCls: 'expand',
			        scope: this,
			        handler: function() {
			        	if(this.top.collapsed)
							myApp.top.expand();
						else
							this.top.collapse();
			        }
	            },
	            '-',
	            this.themesCombo
			]
		});
		
		var viewport = new Ext.Viewport({
			layout: 'border',
			items: [this.MenuTreePanel, this.mainTab,this.top,this.btoolBar]
		});
		this.loadMask = new Ext.LoadMask(this.mainTab.body);
	},
	
	toolAction: function (btn) {
	},
	
	fullScreen: function() {
		if(this.top.collapsed)
			this.top.expand();
		else
			this.top.collapse();
		
		if(this.MenuTreePanel.collapsed)
			this.MenuTreePanel.expand();
		else
			this.MenuTreePanel.collapse();
		
		if(this.btoolBar.hidden)
			this.btoolBar.show();
		else
			this.btoolBar.hide();
	},
	
	/**
	 * tab页切换事件
	 * @param {} p
	 * @param {} t
	 */
	changeTab: function(p, t) {
		if(!t)
			return;
			
		this.MenuTreePanel.selectTreeNode(p, t);	
	},
	
	/**
	 * 左侧树的点击事件
	 * @param {} nodeAttr
	 * @return {Boolean}
	 */
	clickTree: function(nodeAttr) {
		if(!nodeAttr.leaf) return false;
		var id = 'tab-' + nodeAttr.id;
		var tab = Ext.getCmp(id);
		if(!tab) {
			this.mainTab.setActiveTab(tab);
			this.loadModel(nodeAttr);
		} else {
			this.mainTab.setActiveTab(tab);
		}
		
		this.addRegularlyPanel(nodeAttr);
	},
	
	/**
	 * 根据模块ID查询是否已经加载
	 * @param {} modulId
	 * @return {}
	 */
	findCachedModulById: function(modulId) {
		for(var i = 0; i < this.cachedModuls.length; i++) {
			if( this.cachedModuls[i].id == modulId)
				return this.cachedModuls[i].module;
		}
	},
	
	/**
	 * 根据类全称查询是否已经加载
	 * @param {} className
	 * @return {}
	 */
	findCachedModulByClass: function(className) {
		for(var i = 0; i < this.cachedModuls.length; i++) {
			if( this.cachedModuls[i].module == className)
				return this.cachedModuls[i].module;
		}
	},
	
	/**
	 * 添加JS模块到主窗体
	 * @param {} moduleMainClass 类全称
	 * @param {} nodeAttr 模块属性, id和text不能少
	 * @return {} 模块实例
	 */
	addModul: function(moduleMainClass, nodeAttr) {
		var moduleInstance = eval("new " + moduleMainClass + "();");
        this.mainTab.add({
			id: nodeAttr.id,
			title: nodeAttr.text,
			closable: true,
			layout: 'fit',
			items:[moduleInstance]
		}).show();
		return moduleInstance;
	},
	
	/**
	 * 加载模块，即完成左侧树的点击事件
	 * @param {} nodeAttr 树结点的属性
	 * @param {} initParamObj 初始化参数
	 */
	loadModel: function(nodeAttr, initParamObj) {
		if(!initParamObj)
			initParamObj = {};
			
		var n = this.mainTab.get(nodeAttr.id);
		if(n) {
			this.mainTab.setActiveTab(n);
		}
		else {
			if(nodeAttr.type == 'iframe') {
				var itemPanel = new Ext.Panel({
					id: nodeAttr.id,
					title: nodeAttr.text,
					closable: true,
					layout: 'fit',
					html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + nodeAttr.url + '"></iframe>'
				});
				this.mainTab.add(itemPanel).show();
			}
			else if(nodeAttr.type == 'JSClass') {
				var moduleStr = this.findCachedModulById(nodeAttr.id);
				if(moduleStr) {
					var moduleInstance = this.addModul(moduleStr, nodeAttr);
					moduleInstance.initMethod(initParamObj);
				}
				else {
					this.loadMask.show();
					var jsFiles = nodeAttr.jsUrl.split(';');
					
					this.appJSLoader.loadJs(jsFiles, function(){
						myApp.cachedModuls.push({id:nodeAttr.id, module:nodeAttr.mainClass});
						var moduleInstance = myApp.addModul(nodeAttr.mainClass, nodeAttr);
						moduleInstance.initMethod(initParamObj);
						myApp.loadMask.hide();
					});
				}
			}
		}
	},
	
	/**
	 * 添加首页
	 */
	addIndexPanel: function() {
		var indexTab = new com.youku.ad.stat.overview.Overview();
		this.mainTab.add(indexTab).show();
		indexTab.initMethod();
	},
	
	/**
	 * 加载左侧树菜单, 多级菜单时使用
	 */
	loadUserMenuTree: function() {
		this.MenuTreePanel.loadTree(this.MenuTreePanel, 'stat');	
	},
	
	/**
	 * 生成左侧树以后左下角多级菜单
	 * @param {} treeData
	 */
	createUserMenu: function() {
		this.MenuTreePanel.createMenu(this.userObj.userTree.userTree);
		this.createStartMenu();
	},
	
	/**
	 * 生成左下角的开始菜单
	 */
	createStartMenu: function() {
		this.allTreeMenu.removeAll();
		var treeData = this.userObj.userTree.userTree;
		for(var i = 0; i < treeData.length; i++) {
			var children = [];
			for(var j = 0; j < treeData[i].subMenu.length; j++) {
				var amenu = {
					listeners: {
						click: {
							scope: this,
							fn: function(b, e){
								this.clickTree(b);
							}
						}
					}
				};
				
				Ext.apply(amenu, treeData[i].subMenu[j]);
				
				children.push(amenu);
			}
			
			var cp = {
				text: treeData[i].menuName,
				icon : treeData[i].icon,
				menu: {
					items:children
				}
			}
			this.allTreeMenu.add(cp);
		}
	},
	
	addRegularlyPanel: function(attr) {
	},
	
	/**
	 * 加载用户信息
	 */
	loadUserInfo: function(url) {
		Ext.Ajax.request({
			method: 'post',
			url: url,
			params: '',
			scope: this,
		   	success:function(resp){
		    	var obj=Ext.util.JSON.decode(resp.responseText);
		    	delete this.userObj.Permission;
		    	Ext.apply(this.userObj, obj);
		    	this.userInfoTpl.overwrite(this.top.userInfoPanel.body, this.userObj.UserInfo);
		    	this.fireEvent('loadUserInfoOver', obj);
		   	}
		});
	},
	
	/**
	 * 向主Tab窗口中添加tab页
	 * @param {} item
	 */
	addTab: function(item) {
		var n = this.mainTab.get(item.id);
		if(n) {
			this.mainTab.setActiveTab(n);
		}
		else {
			var a = this.mainTab.add(item);
			this.mainTab.setActiveTab(a);
		}
	},
	
	/**
	 * 动态添加JS模块
	 * @param {} id 自定义的ID
	 * @param {} moduleClass 模块类全称，即主类
	 * @param {} jsFiles 数组[] 相关JS文件(目前只支持一个JS文件，待完善)//FIXME 目前只支持一个JS文件，待完善
	 * @param {} attr Object对象 tab模块属性, id和text不能少
	 * @param {} params Object对象 模块初始化用到的参数
	 */
	addModuleTab: function(id, moduleClass, jsFiles, attr, params) {
		var module = this.findCachedModulByClass(moduleClass);
		var moduleInstance = null;
		if(module) {
			moduleInstance = this.addModul(module, attr);
			moduleInstance.initMethod(params);
		}
		else {
			this.loadMask.show();
			
			this.appJSLoader.loadJs(jsFiles, function(){
				myApp.cachedModuls.push({id:id, module:moduleClass});
				moduleInstance = myApp.addModul(moduleClass, attr);
				moduleInstance.initMethod(params);
				myApp.loadMask.hide();
			});
		}
	},
	
	/**
	 * 根据ID查找TAB
	 * @param {} id id
	 * @return {}
	 */
	findTab: function(id) {
		return this.mainTab.get(id);
	},
	
	setActiveStyleSheet: function(title) {
	    this.setDocumentTheme(document, title);
	    
	     //刷新iframe的主题
	    var iframes = Ext.query('iframe');
	    for(var i = 0; i < iframes.length; i++) {
	    	this.setDocumentTheme(iframes[i].contentWindow.document, title);
	    }
	},
	
	/**
	 * 刷新documnet主题
	 * @param {} doc documnet对象
	 * @param {} themeTitle CSS的title
	 */
	setDocumentTheme: function(doc, themeTitle) {
		var i,
	        a,
	        links = doc.getElementsByTagName("link"),
	        len = links.length;
	    for (i = 0; i < len; i++) {
	        a = links[i];
	        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
	            a.disabled = true;
	            if (a.getAttribute("title") == themeTitle) a.disabled = false;
	        }
	    }
	},
	
	initTheme: function(title) {
		var cp = new Ext.state.CookieProvider();
		var AdStatETheme = cp.get("AdStatEThemeCSS");
		if(!AdStatETheme) {
			this.setActiveStyleSheet(title);
			this.themesCombo.setValue(title);
		}
		else {
			this.setActiveStyleSheet(AdStatETheme);
			this.themesCombo.setValue(AdStatETheme);
		}
	},
	
	/**
	 * 打开初始化模块
	 * @param {} paramObj
	 */
	initSys: function(paramObj) {
		var moduleClass = paramObj.initModule;
		var module = this.getModulebyMainClass(moduleClass);
		if(!module) return;
		this.loadModel(module, paramObj);
	},
	
	/**
	 * 根据模块主类找到用户的模块
	 * @param {} mainClass
	 */
	getModulebyMainClass: function(mainClass) {
		var treeData = this.userObj.userTree.userTree;
		
		for(var i = 0; i < treeData.length; i++) {
			for(var j = 0; j < treeData[i].subMenu.length; j++) {
				if(treeData[i].subMenu[j].mainClass == mainClass) {
					return treeData[i].subMenu[j];
				}
			}
		}
		return null;
	},
	
	/**
	 * 用户是否有角色
	 * @param {} roleNameArr 判断的角色数组
	 */
	isUserHasRole: function(roleNameArr) {
		for(var i = 0; i < myApp.userObj.RoleList.length; i++) {
			for(var j = 0; j < roleNameArr.length; j++) {
				if(roleNameArr[j] == myApp.userObj.RoleList[i].roleName) {
					return true;
				}
			}
		}
		return false;
	},
	
	checkBrowser: function(r){
		var ua = navigator.userAgent.toLowerCase()
        return r.test(ua);
    },
	
	showHelp: function() {
		if(Ext.isIE7 || Ext.isIE8) {
			Ext.getCmp('SysInfor').getEl().update('<font size="2" color="#333">您可以使用IE9+、chrome、firefox得到更好的体验！</font>');
		}
		else if(Ext.isIE6 && !this.checkBrowser(/msie 10/)) {
			Ext.getCmp('SysInfor').getEl().update('<font size="2" color="#FF0000">检测到您的IE版本过低，' +
				'请升级到IE7以上版本或使用chrome、firefox。</font>');
		}
	},
	
	log: function(msg) {
	},
	
	getMonth: function (quarter) {
		if(!quarter)
			quarter = this.nowQuarter;
			
		this.log('getMonth('+ quarter + ')');
		
		var monthData = [];
		monthData.push({value: 0, text:'全部'});
		
		if(quarter > 0) {
			var startM = 3 * (quarter - 1);
			for(var i = startM ; i < startM + 3; i++) {
				monthData.push({
					value: i + 1,
					text: this.monthNames[i % 12]
				});
			}
		}
		else if(quarter == 0) {//表示全年
			for(var i = 0 ; i < 12; i++) {
				monthData.push({value: i + 1,text: this.monthNames[i % 12]});
			}
		}
		return monthData;
	}
});