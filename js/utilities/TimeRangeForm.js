// JavaScript Document
var TimeRangeForm = function (options)
{
	KuaminikaForm.call(this,options);
	var self = this;
	var superLoad= self.loadProcedure;
	var driverFinder = new ModelFinder(fetcher["Drivers"],"Driver");
	self.deleteBtnProcedure = options.deleteBtnProcedure;

	
	var performAddWeek = function ()
	{	
		var addMe = self.subject;
	
		addMe.raw_date_end=Math.max(self.subject.date_end.getTime(),self.subject.date_start.getTime());
		addMe.year_id = self.subject.date_start.getFullYear();
		addMe.raw_date_start=Math.min(self.subject.date_end.getTime(),self.subject.date_start.getTime());
		
		$.post(fetcher.TimeRanges.addWeek,self.subject,function(rsp)
		{
		   console.log(rsp);
		   	options.addBtnProcedure(self.subject);
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
		   	options.updateBtnProcedure(self.subject);
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
		self.title = FormTitleHolder.TimeRangeForm[self.operation][currentLanguage];
		var title_holder= document.getElementsByClassName("formTitleHolder")[0];
		title_holder.innerHTML= self.title?self.title:"";
		self.dateComponents = generateDateComponents();
		
		var addWeekBtn = self.form_container.getElementsByClassName("addSubjectButton")[0];
		addWeekBtn.onclick = performAddWeek;
		
		var updateWeekBtn = self.form_container.getElementsByClassName("updateSubjectButton")[0];
 		updateWeekBtn.onclick = performUpdateWeek;
 		
 		var deleteWeekBtn = self.form_container.getElementsByClassName("deleteSubjectButton")[0];	
 		deleteWeekBtn.onclick = self.deleteBtnProcedure;
 		
 		self.deleteBtn = $(deleteWeekBtn);
		self.updateBtn=$(updateWeekBtn);
		self.addBtn=$(addWeekBtn);
		
		self.activateMode(self.operation);
	};
	
	
		self.activateMode=function(mode)
	{
		//set update or add mode
		if(mode=="update")
		{
			self.updateBtn.show();
			self.deleteBtn.show();
			self.addBtn.hide();
			if(self.modeMenu.activated)
				self.modeMenu.activateMode(mode);
		}
		else
		{
			self.deleteBtn.hide();
			self.updateBtn.hide();
			self.addBtn.show();	
		}
	};
	
	self.dateComponents = [];

};
