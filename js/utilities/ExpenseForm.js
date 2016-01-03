// JavaScript Document
var ExpenseForm = function(options)
{
	KuaminikaForm.call(this,options);
	var self = this;
	var superLoad= self.loadProcedure;
	var carFinder = CarFinder(fetcher.Cars);
	//var merchantFinder = 
	
	self.subject.merchant= ModelHolder.Merchant.get(self.subject.merchant_id);
	
	self.loadProcedure = function()
	{
		var whenAllCarsFound = function(allCars)
		{
			self.carDropdown.list=$.map(allCars,function(value,key){
													 	return {chosenValue:key,chosenDisplay:value.name};
													 });
			var selectedCar = self.subject.car?self.subject.car:allCars[1];
			self.carDropdown.initialValue = {chosenValue:selectedCar.id,chosenDisplay:selectedCar.name};
			self.subject.car= selectedCar;
			
			self.merchantDropdown.list=$.map(ModelHolder.Merchant.map,function(value,key){
													 	return {chosenValue:key,chosenDisplay:value.name};
													 });
			var selectedMerchant = self.subject.merchant ?self.subject.merchant: ModelHolder.Merchant.get(1);
			self.merchantDropdown.initialValue = {chosenValue:selectedMerchant.id,chosenDisplay:selectedMerchant.name};
			
			
			superLoad();
			
			var dtp=$("#expenseForm .date");
			dtp.datetimepicker({format: 'YYYY-MM-DD'});
			dtp.on("dp.change",function(e)
			{
				self.subject.date=e.date._d;
			});
			self.merchantDropdown.load();
			self.carDropdown.load();
		};
		carFinder.findAll(whenAllCarsFound);
	
	};
	
	self.carDropdown = new KuaminikaDropDown({
										 id:"expenseFormCarDropdown",
										 reactToChoice:function(car_id)
										 {
										 	self.subject.car= ModelHolder["Car"].get(car_id);
										 },
										holder_id:"expenseForm_car_selector_holder"
										});
										
										
	self.merchantDropdown = new KuaminikaDropDown({
										 id:"expenseFormMerchantDropdown",
										 reactToChoice:function(merchant_id)
										 {
										 	self.subject.merchant= ModelHolder["Merchant"].get(merchant_id);
										 	self.subject.merchant_id= self.subject.merchant.id;
										 },
										holder_id:"expenseForm_merchant_selector_holder"
										});
	
};
ExpenseForm.prototype = (function() {
  var Base = function() {};
  Base.prototype = KuaminikaForm.prototype;
  return new Base();
}());
ExpenseForm.prototype.constructor = ExpenseForm;
/*	var ExpenseForm = function(options)
	{
		var self= this;
		var cars= options.carList;
		var assignCar= function(id)
		{
			return $.grep(cars,function(car)
			{
				return car.id==id;
			})[0];
		};
		self.activateMode=function(mode)
		{
			//set update or add mode
			if(mode=="update")
			{
				self.updateBtn.show();
				self.addBtn.hide();
				self.addMenuItem.removeClass("active");
				self.updateMenuItem.addClass("active");
				
			}
			else
			{
				self.updateBtn.hide();
				self.addBtn.show();
				$(".currentlyInEdit").removeClass("currentlyInEdit");
				self.addMenuItem.addClass("active");
				self.updateMenuItem.removeClass("active");
			}
		};
		
		self.template=options.template;
		self.expense=options.expense;
		self.action= options.action;
		self.load= function(loadContainer_id)
		{
			$("#"+loadContainer_id).html(self.template({expense:self.expense}));
			var form=$("#expenseForm");
			
			var menuForm= document.getElementById("expenseFormMenu");
			var addMenuItem = menuForm.children[0];
				addMenuItem.onclick=function()
				{
					self.expense=CarExpenseCreator.createBlank();
					self.load(loadContainer_id);
					self.activateMode("add");
				};
			var updateMenuItem = menuForm.children[1];
				updateMenuItem.onclick=function()
				{
					self.expense=options.expenseList[0];
					$(".currentlyInEdit").removeClass("currentlyInEdit");
					$("#"+self.expense.id).addClass("currentlyInEdit");
					menuForm.remove();
					form.remove();
					self.load(loadContainer_id);
					self.activateMode("update");
				};
			
			var allInputs=$("#expenseForm input");
			var carSelector = $("#expenseForm .car_id_selector");
			var dtp=$("#expenseForm .date");
			
			var addBtn = document.getElementById("addExpenseButton");
			var updateBtn=  document.getElementById("updateExpenseButton");
			if(options.action=="add")
				self.expense.car=assignCar(carSelector.val());
			allInputs.change(function()
			{
				self.expense[this.name]=this.dataset.isnumeric?parseInt(this.value):this.value;
			});
		
			dtp.datetimepicker({format: 'YYYY-MM-DD'});
			dtp.on("dp.change",function(e)
			{
				self.expense.date=e.date._d;
			});
			carSelector.change(function()
			{
				var chosenCar_id=this.options[this.selectedIndex].value;
				self.expense.car = assignCar(chosenCar_id);
			});
	
			addBtn.onclick=function(e)
			{
				menuForm.remove();
				form.remove();
				options.addBtnProcedure(self.expense);
			};
			
			updateBtn.onclick=function()
			{
				menuForm.remove();
				form.remove();
				options.updateBtnProcedure(self.expense);
			};
			
			self.updateBtn=$(updateBtn);
			self.addBtn=$(addBtn);
			self.addMenuItem=$(addMenuItem);
			self.updateMenuItem=$(updateMenuItem);
			self.activateMode(options.action);
		};
	};*/