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
	addBtnProcedure:function(){}
}
*/
var KuaminikaForm = function(options)
{
	var self = this;
	

	self.holderId = options.holderId;
	self.operation = options.operation;
    self.form_container = document.getElementById(self.holderId);
	self.subject = options.subject;
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
	self.loadProcedure = function(){
			
			var menuForm= document.getElementById("formMenu");
			var addMenuItem = menuForm.children[0];
				addMenuItem.onclick=function()
				{
				//	self.subject = 
					self.load();
					self.activateMode("add");
				};
			var updateMenuItem = menuForm.children[1];
				updateMenuItem.onclick=function()
				{
					self.expense=options.expenseList[0];
					$(".currentlyInEdit").removeClass("currentlyInEdit");
					$("#"+self.subject.id).addClass("currentlyInEdit");
					menuForm.remove();
					form.remove();
					self.load();
					self.activateMode("update");
				};
			var addBtn = document.getElementById("addSubjectButton");
			var updateBtn =  document.getElementById("updateSubjectButton");
			var allInputs = $(self.form_container.getElementsByTagName('input'));
			allInputs.change(function()
			{
				self.subject[this.name]=this.dataset.isnumeric?parseInt(this.value):this.value;
			});
			addBtn.onclick=function(e)
			{
			//	menuForm.remove();
			
				options.addBtnProcedure(self.subject);
			};
			
			
			updateBtn.onclick=function()
			{
				menuForm.remove();
				form.remove();
				options.updateBtnProcedure(self.subject);
			};
			
			self.updateBtn=$(updateBtn);
			self.addBtn=$(addBtn);
			self.addMenuItem=$(addMenuItem);
			self.updateMenuItem=$(updateMenuItem);
			self.activateMode(options.action);
		};
	
	self.load= function()
	{
		self.view.postDigest= self.loadProcedure ;
			
	 	self.view.execute();
		
	};

	self.activateMode=function(mode)
	{
		//set update or add mode
		if(mode=="update")
		{
			self.updateBtn.show();
			self.addBtn.hide();
		//	self.addMenuItem.removeClass("active");
		//	self.updateMenuItem.addClass("active");
			
		}
		else
		{
			self.updateBtn.hide();
			self.addBtn.show();
			$(".currentlyInEdit").removeClass("currentlyInEdit");
		//	self.addMenuItem.addClass("active");
		//	self.updateMenuItem.removeClass("active");
		}
	};
	
};