AjaxRowExpander = function(config, previewURL) {
	AjaxRowExpander.superclass.constructor.call(this, config, previewURL);
	this.previewURL = previewURL;
	this.enableCaching = false;
}

Ext.extend(AjaxRowExpander, Ext.grid.RowExpander, {
	getBodyContent: function(record, index) {
		var body = '<div id="gridRowDiv_' + record.id + '">Loading...</div>';
		Ext.Ajax.request({
			url: this.previewURL + record.id,
			disableCaching: true,
			success: function(response, options) {
				Ext.getDom('gridRowDiv_' + options.objId).innerHTML = response.responseText;
			},
			failure: function(error) {
            },
            objId: record.id
		});
		return body;
	},
	beforeExpand : function(record, body, rowIndex){
		if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            body.innerHTML = this.getBodyContent(record, rowIndex);
            return true;
        } else{
            return false;
        }
	}
});