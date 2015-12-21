// JavaScript Document
var IncomeForm = function (options)
{
	KuaminikaForm.call(this,options);
	var self = this;
	var superLoad= self.loadProcedure;
	var driverFinder = new ModelFinder(fetcher["Drivers"],"Driver");
	self.loadProcedure = function()
	{
		
		driverFinder.findAllLight("light",function(driverList){
			self.driverDropdown.list=$.map(driverList,function(value,key){
														 	return {chosenValue:key,chosenDisplay:value.first_name};
														 });
															 
			var selectedDriver = self.subject.driver?self.subject.driver:driverList[1];
			self.driverDropdown.initialValue={chosenValue:selectedDriver.id,chosenDisplay:selectedDriver.first_name};
			self.subject.driver=selectedDriver;
			superLoad();
			self.statusDropdown.load();
			self.driverDropdown.load();
		});
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
IncomeForm.prototype=Object.create(KuaminikaForm.prototype);
IncomeForm.prototype.constructor = IncomeForm;