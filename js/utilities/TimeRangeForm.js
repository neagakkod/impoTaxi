// JavaScript Document
var TimeRangeForm = function (options)
{
	KuaminikaForm.call(this,options);
	var self = this;
	var superLoad= self.loadProcedure;
	var driverFinder = new ModelFinder(fetcher["Drivers"],"Driver");
	
	var performAddWeek = function ()
	{	
		var addMe = self.subject;
	
		addMe.raw_date_end=Math.max(self.subject.date_end.getTime(),self.subject.date_start.getTime());
		addMe.year_id = self.subject.date_start.getFullYear();
		addMe.raw_date_start=Math.min(self.subject.date_end.getTime(),self.subject.date_start.getTime());
		
		$.post(fetcher.TimeRanges.addWeek,self.subject,function(rsp)
		{
		   console.log(rsp);	
		});
	};
	var performUpdateWeek= function()
	{
		var updateMe = self.subject;
	
		updateMe.raw_date_end=Math.max(self.subject.date_end.getTime(),self.subject.date_start.getTime());
		updateMe.year_id = self.subject.date_start.getFullYear();
		updateMe.raw_date_start=Math.min(self.subject.date_end.getTime(),self.subject.date_start.getTime());
		
		$.post(fetcher.TimeRanges.updateWeek,self.subject,function(rsp)
		{
		   console.log(rsp);	
		});
	};
	var generateDateComponents = function(){
	
		var raw =document.getElementsByClassName("kuaminikaDateComponent");
		var rslt =$.map(raw,function(dtp){
			dtp=$(dtp);
			
			dtp.on("dp.change",function(e)
			{
				var chosen=e.date._d;
			
				self.subject[this.dataset.attribute] = chosen;
			
			});
			return	dtp.datetimepicker({format: 'YYYY-MM-DD'});
		});
		
	
		console.log(rslt);
		return rslt;
	}; 
	
	self.loadProcedure = function()
	{
		self.dateComponents = generateDateComponents();
		
		var addWeekBtn = self.form_container.getElementsByClassName("addSubjectButton")[0];
		addWeekBtn.onclick = performAddWeek;
		var updateWeekBtn = self.form_container.getElementsByClassName("updateSubjectButton")[0];
 		updateWeekBtn.onclick = performUpdateWeek;
 		
		self.updateBtn=$(updateWeekBtn);
		self.addBtn=$(addWeekBtn);
		
		self.activateMode(self.operation);
	};
	
	self.dateComponents = [];

};
