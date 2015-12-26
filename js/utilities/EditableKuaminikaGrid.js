// JavaScript Document

var EditableKuaminikaGrid = function(options)
{
	KuaminikaGrid.call(this,options);
	
	var self= this;
	
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
	
	self.updateRow= function(edited)
	{
	
		var objectModified = findObjectModified(edited);
		$.map(objectModified,function(k,v)
		{
			objectModified[k]=edited[k];
		});
		self.reload();	
	};

		
};