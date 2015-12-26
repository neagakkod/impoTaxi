// JavaScript Document

var KuaminikaGrid=function(options)
{
	var self=this;
	var _gridHolder =null;
	
	self.getGridHolder = function ()
	{
		if(_gridHolder === null)
			_gridHolder = document.getElementById(self.holder_id);
		return _gridHolder;
	};
	
	self.view = new KuaminikaView({viewName:options.viewName,digestView:function(template){
											
												self.getGridHolder().innerHTML=template({list:self.data});
											
										}});
	//private functions
	var findObjectModified=function(rowOrobject)
	{
		return $.grep(self.data,function(dataItem)
							{
								return dataItem.id==rowOrobject.id;
							})[0];
	};
	
	var doNothing = function(){};
	//public functions
	self.load= function()
	{
		self.view.postDigest= function()
		{
			
				  	self.activateDeleteButtons(self.deleteBtnClass);
			
				 	self.activateUpdateButtons(self.updateBtnClass);  
		};
		
		self.view.execute();
	};
	
	

	self.markRowAsSelected=function(row_id)
	{
		if(row_id)
		{
			$(".currentlyInEdit").removeClass("currentlyInEdit");
			self.selected_row_id=row_id;
			$("#"+self.selected_row_id).addClass("currentlyInEdit");
		}
	};
	
	self.reload= function()
	{
		self.view.postDigest= function()
		{
			
				  	self.activateDeleteButtons(self.deleteBtnClass);
		
				 	self.activateUpdateButtons(self.updateBtnClass);  
				self.markRowAsSelected(self.selected_row_id);
		};
		
		self.view.execute();
	
		
	};
	
	
	self.activateDeleteButtons= function(deleteBtnClassName)
	{
		if(deleteBtnClassName)
		   self.deleteBtnClass = deleteBtnClassName;
		   
		var deleteBtns = document.getElementsByClassName(self.deleteBtnClass);
		$.each(deleteBtns,function(i,v)
		{
			v.onclick=self.deleteRow;
		});	
	};
	
	
	self.activateUpdateButtons= function (updateBtnClassName)
	{
		if(updateBtnClassName)
			self.updateBtnClass = updateBtnClassName;
			
	
		var updateBtns = document.getElementsByClassName(self.updateBtnClass);
		$.each(updateBtns,function(i,v)
		{
			v.onclick=self.loadElement;
		});	
	};
	
	self.deleteRow= function(e)
	{ 
		var inputsRow = this.parentElement.parentElement;
		
		var clientDelete= function()
		{
			self.data = $.grep(self.data,function(n){
			 	return parseInt(n.id)!==parseInt(inputsRow.id);
			 });
			 console.log(self.data);
			 self.reload();
		};
		
		if(self.actionBeforeDelete||options.NoControllerActionNeeded)
			self.actionBeforeDelete(parseInt(inputsRow.id),clientDelete);
	};

	self.addRow= function(newElm)
	{
		var latest= newElm ? newElm: options.blnkElmFunction();
		var size = self.data.length;
		var idArray= $.map(self.data,function(v){return v.id});
		var new_id= Math.max.apply(Math,idArray)+1; 
		latest.id=new_id;
		self.data[size] = latest;
		self.reload();	
	};
	
	//constructor
	self.data = options.tableData?options.tableData:[];
	self.gridID = options.gridID;
	self.selected_row_id = null;
	self.holder_id = options.gridHolderId;
	self.loadElement = options.loadElementFunction ? options.loadElementFunction : doNothing;
	self.actionBeforeDelete =  options.actionBeforeDelete ? options.actionBeforeDelete : doNothing;
	self.deleteBtnClass = options.deleteButtonsClassName? options.deleteButtonsClassName:"deleteSubjectBtn";
	self.updateBtnClass = options.updateButtonsClassName? options.updateButtonsClassName:"updateSubjectBtn";
};

/*
options:
{
	tableData:[],
	gridID:"",
	viewName:"",
	actionBeforeDelete:function(){},
	updateButtonsClassName:"",
	deleteButtonsClassName:"",
	loadElementFunction:function(){},
	NoControllerActionNeeded:true,
	gridHolderId:""
}

*/


/*
	Requirements  for HandleBar views
	- provide classes 
		-deleteSubjectBtn: on hyperlinks linked to deleting
		-updateSubjectBtn:

*/