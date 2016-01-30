// JavaScript Document
/*
options:
{
	viewName:"",
	form_id:"",
	holderId:"",
	subject:{},
	operation:"" //either "add" or "update",
	updateBtnProcedure:function(){},
	addBtnProcedure:function(){},
	subjectType:""
}
*/
var KuaminikaForm = function(options)
{
	var self = this;
	
	var subjectCreator = new ModelCreator(options.subjectType);
	self.holderId = options.holderId;
	self.operation = options.operation;
    self.form_container = document.getElementById(self.holderId);
	self.subject = options.subject?options.subject:{};
	self.blankSubject = self.subject.blank ? self.subject : subjectCreator.createBlank();
	
	self.view = new KuaminikaView({viewName:options.viewName,
	 							   digestView:function(template)
										   {
								   				self.form_container.innerHTML =	template(self.subject);
								   			
											}});//options.view;
	self.setHolder = function(holder_id)
	{
		self.holderId = holder_id;
		self.form_container = document.getElementById(self.holderId);
	};
	

	self.truncateForm = function()
	{
		if(self.form_container)
			self.form_container.innerHTML="";
	};
	
	self.modeMenu = new FormModeMenu();
	self.loadProcedure = function(){
			
			self.modeMenu.addeModeHandler= function()
				{ 
					self.subject = self.blankSubject;
					self.operation="add";
					self.load();
					
				};
		   self.modeMenu.activate();	
		
			
			var addBtn = document.getElementById("addSubjectButton");
			var updateBtn =  document.getElementById("updateSubjectButton");
			var allInputs = $(self.form_container.getElementsByTagName('input'));
		
			
			allInputs.change(function()
			{
				self.subject[this.name]=this.dataset.isnumeric?parseFloat(this.value):this.value;
			});
			addBtn.onclick=function(e)
			{
				options.addBtnProcedure(self.subject);
			};
			
			
			updateBtn.onclick=function()
			{
				options.updateBtnProcedure(self.subject);
			};
			
			self.updateBtn = $(updateBtn);
			self.addBtn = $(addBtn);
		
			if(self.operation)
				self.activateMode(self.operation);
	};
	
	self.load= function()
	{
		console.log ("inside form.load():%O",self.subject);
		self.view.postDigest = self.loadProcedure ;
	 	self.view.execute();
	};

	self.activateMode=function(mode)
	{
		//set update or add mode
		if(mode==="update")
		{
			self.updateBtn.show();
			self.addBtn.hide();
			if(self.modeMenu.activated)
				self.modeMenu.activateMode(mode);
		}
		else
		{
		//	self.subject = self.blankSubject;
			self.updateBtn.hide();
			self.addBtn.show();	
			if(self.modeMenu.activated)
				self.modeMenu.activateMode(mode);
		
		}
	};
	
};