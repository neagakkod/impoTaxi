// JavaScript Document

var KuaminikaGrid=function(options)
{
	var self=this;
	
	self.view = new KuaminikaView({viewName:options.viewName,digestView:function(template){
											
												self.gridHolder.innerHTML=template({list:self.data});
										}});
	//private functions
	var findObjectModified=function(rowOrobject)
	{
		return $.grep(self.data,function(dataItem)
							{
								return dataItem.id==rowOrobject.id;
							})[0];
	};
	
	//public functions
	self.load= function()
	{
		return	self.view.execute();
		//return self.gridTemplate({list:self.data});
	};
	
	self.reload= function()
	{
		var parent=$("#expenseTable").parent();
		$("#"+self.gridID).remove();
		parent.append(self.load());
		self.listenAndprocessChange();
		self.activateDateTimePickers();
	
		if(self.deleteBtnClass)
		  	self.activateDeleteButtons(self.deleteBtnClass);
		if(self.updateBtnClass)
		 	self.activateUpdateButtons(self.updateBtnClass);  
	};
	self.listenAndprocessChange=function()
	{
		var allInputs=$("#"+self.gridID+" input");
		
		allInputs.change(function()
		{
		   console.log(this);
		   var inputsRow = this.parentElement.parentElement;
		   var objectModified = findObjectModified(inputsRow);
		   
				objectModified[this.dataset.property]=this.value;
				console.log(objectModified);
				if(this.dataset.isnumeric)
			    {	
			      objectModified[this.dataset.property]=parseInt(this.value);
			    }
			    self.reload();
		});
	};
	self.activateDateTimePickers=function()
	{
		var spaces=$("[data-isdate='true']");
		$.each(spaces,function(i,val)
		{
			var dateChanged= function(e)
			{
			 	console.log("Date change");
			  	console.log(e);
			 	var physicalRow = val.parentElement.parentElement;
			 	var objectModified = findObjectModified(physicalRow);
			 	objectModified.date=e.date._d;
			 	var inputInside=dtp.find("input")[0];
			 	val.dataset.dateValue=e.date.format("YYYY-MM-DD");
			 	console.log(objectModified);
			 	self.reload();
			 };
			var dtp=$(val);
			dtp.datetimepicker({format: 'YYYY-MM-DD'});
			dtp.on("dp.change",dateChanged);
		});
	};
	
	self.activateDeleteButtons= function(deleteBtnClassName)
	{
		self.deleteBtnClass = deleteBtnClassName;
		var deleteBtns = document.getElementsByClassName(self.deleteBtnClass);
		$.each(deleteBtns,function(i,v)
		{
			v.onclick=self.deleteRow;
		});	
	};
	
	
	self.activateUpdateButtons= function (updateBtnClassName)
	{
		self.updateBtnClass = updateBtnClassName;
		self.loadElement=options.loadElementFunction;
		var updateBtns = document.getElementsByClassName(self.updateBtnClass);
		$.each(updateBtns,function(i,v)
		{
			v.onclick=self.loadElement;
		});	
	};
	
	self.updateRow= function(edited)
	{
	
		var objectModified = findObjectModified(edited);
		$.map(objectModified,function(k,v)
		{
			objectModified[k]=edited[k];
		});
		self.reload();	
	};
	
	self.deleteRow= function(e)
	{ var inputsRow = this.parentElement.parentElement;
		var clientDelete= function()
		{
			self.data = $.grep(self.data,function(n){
			 	return parseInt(n.id)!==parseInt(inputsRow.id);
			 });
			 console.log(self.data);
			 self.reload();
		};
		if(options.actionBeforeDelete||options.NoControllerActionNeeded)
			options.actionBeforeDelete(parseInt(inputsRow.id),clientDelete);
	};
	
//	sel
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
	self.data=options.tableData;
	self.gridID=options.gridID;
	self.gridHolder = document.getElementById(options.gridHolderId);
	self.deleteBtnClass=options.deleteBtnClass;
};

/*
options:
{
	tableData:[],
	gridID:"",
	deleteBtnClass:"",
	viewName:"",
	actionBeforeDelete:function(){},
	loadElementFunction:function(){},
	NoControllerActionNeeded:true,
	gridHolderId:""
}

*/