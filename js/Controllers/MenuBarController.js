// JavaScript Document

var MenuBarController= function(args)
{
	var self= this;
	var usrDisplay= document.getElementById("usrDisplay");
	var logOutBtn= document.getElementById("logOutBtn");
	var expenseIncomeToggler = document.getElementById("expenseIncomeToggler");
	var ControllerOptions = {
								"income":"IncomeController",
								"expense":"ExpenseController"
							};
							
							
	// side buttons
	var usrBtn = document.getElementById("usrBtn");
	
		self.initiatedController = null;	
	$.each(expenseIncomeToggler.children,function()
	{
		if(this.classList.contains("active"))
	    	self.initiatedController = new window[ControllerOptions[this.dataset.option]];
		
	});
	
					
	var RegisteredDropdown = function (args){
		
		/*
		args:{id,label}
		*/
		var me = this;
		me.id= args.id;
		me.label = args.label;
		me.dropDown = document.getElementById(me.id);
		me.valueHolder = me.dropDown.children[0].children[0];
		var reactToChoice = args.reactToChoice;
		$.each(me.dropDown.children[1].children,function(i,n)
		{
			n.onclick=function()
			{
				me.valueHolder.innerHTML= me.label+":"+n.dataset.chosendisplay;
				if(reactToChoice)
				{
					reactToChoice(n.dataset.chosenvalue);
				}
			};
		});
	};
	
	self.toggleExpenseIncome = function()
	{
			
		$.each(expenseIncomeToggler.children,function(i,n)
		{
			n.classList.remove('active');
			//console.log(n)
		});	
		
		this.classList.add('active');
		
		console.log(this);
		
		self.initiatedController = new window[ControllerOptions[this.dataset.option]];
		
		self.initiatedController.init();
	};
	
	
	self.init= function()
	{
		$.get(fetcher.Login.getUserInfo,function(userInfo){
			userInfo=JSON.parse(userInfo);
			currentUserInfo= new User(userInfo);
			currentOrganization = new Organization({id:1,name:"Kuaminika-dev",owner:"herman"});
			console.log(currentUserInfo);
			usrDisplay.innerHTML=currentUserInfo.usr;
		});
		
		//launching expenseIncomeToggler
		var expenseOption = expenseIncomeToggler.children[0];
		var incomeOption = expenseIncomeToggler.children[1];
		expenseOption.onclick = self.toggleExpenseIncome;
		incomeOption.onclick = self.toggleExpenseIncome;
		
		
		//registering Dropdowns
		var yearDropdown = new RegisteredDropdown({id:"yearDropdown",
												   label:"Year",
												   reactToChoice:function(choice)
												   {
												   	 	CurrentInfo.year=new Year({id:choice});//choice;
												   	 		if(self.initiatedController)
													   	 		self.initiatedController.init();
												   	 	
												   }});
			yearDropdown.valueHolder.innerHTML="Year"+":"+CurrentInfo.year.name;
			
		var trimesterDropdown = new RegisteredDropdown({id:"trimesterDropdown",
													   label:"Trimester",
													   reactToChoice:function(choice)
													   {
													   	 	CurrentInfo.trimester=CurrentInfo.year.trimesters[choice-1];//TrimesterList[choice];
													   	 	if(self.initiatedController)
													   	 		self.initiatedController.init();
													   }});
			trimesterDropdown.valueHolder.innerHTML="Trimester"+":"+CurrentInfo.trimester.name;
		 
		usrBtn.onclick = function()
		{
			var usrController = new UserController();
			usrController.init();
		};
		
		self.initiatedController.init();
		logOutBtn.onclick= function()
		{
			$.get(fetcher.Login.logout,function(rslt){
				rslt=JSON.parse(rslt);
				if(!rslt.loggedIn)
					window.location.replace("login.php");
			});
		};
	};
	

};