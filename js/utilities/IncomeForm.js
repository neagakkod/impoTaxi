// JavaScript Document
var IncomeForm = function (options)
{
	KuaminikaForm.call(this,options);
	var self = this;
	var superLoad= self.loadProcedure;
	var driverFinder = new ModelFinder(fetcher["Drivers"],"Driver");
	self.loadProcedure = function()
	{
	
		driverFinder.findAllLight(function(driverList){
			self.driverDropdown.list=$.map(driverList,function(value,key){
														 	return {chosenValue:key,chosenDisplay:value.first_name};
														 });
															 
			var selectedDriver = self.subject.driver?self.subject.driver:driverList[1];
			var selectedStatus = self.subject.driverStatus;
			self.statusDropdown.initialValue = {chosenValue:selectedStatus.id,chosenDisplay:selectedStatus[currentLanguage]};
			self.driverDropdown.initialValue = {chosenValue:selectedDriver.id,chosenDisplay:selectedDriver.first_name};
			self.subject.driver=selectedDriver;
			superLoad();
			var allInputs = $(self.form_container.getElementsByTagName('input'));
			allInputs.change(function()
			{
				self.subject[this.name]=this.dataset.isnumeric?parseInt(this.value):this.value;
				self.subject.applyDaysChanges();
			});
			
			self.statusDropdown.load();
			self.driverDropdown.load();
		},"light");
	};
	
	
	self.statusDropdown = new KuaminikaDropDown({
												 id:"statusDropDown",
												 initialValue:{chosenValue:self.subject.driverStatus.id,chosenDisplay:self.subject.driverStatus[currentLanguage]},
												 list:$.map(DriverStatus,function(value,key)
																		 {
																		 	return {chosenValue:key,chosenDisplay:value[currentLanguage]};
																		 }),
												 reactToChoice:function(status_id)
												 {
												 	self.subject.driverStatus= DriverStatus[status_id];
												 },
												holder_id:"statusHolder"
												});
	self.driverDropdown = new KuaminikaDropDown({
											 id:"driverDropdown",
											 reactToChoice:function(driver_id)
											 {
											 	self.subject.driver= ModelHolder["Driver"].get(driver_id);
											 },
											holder_id:"driverHolder"
											});
	
};

IncomeForm.prototype = (function() {
  var Base = function() {};
  Base.prototype = KuaminikaForm.prototype;
  return new Base();
}());
//IncomeForm.prototype=Object.create(KuaminikaForm.prototype);
IncomeForm.prototype.constructor = IncomeForm;