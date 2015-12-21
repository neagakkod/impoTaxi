// JavaScript Document
/*
args{
	id,
	week_id,
	driverStatus_id,
	grossTotal
}
*/
var Income = function(args){
	var self= this;
	self.grossTotal=args.grossTotal;
	
}

var blanWeeklyIncomekArgs={
	id:-1,
	week_id:-1,
	driver_status_id:1,
	grossTotal:0,
	days:0, 
	insurances :[]
};

var WeeklyIncome = function(args)
{
	var self = this;
	
	if(!args)
	{
		args = blanWeeklyIncomekArgs;
	}
	Income.call(this,args);
	
	
	self.id = args.id;
	self.TaxesAndInsurances=[ModelHolder.taxInsurances["chom_empl"],ModelHolder.taxInsurances["chom_prop"]];//args.TaxesAndInsurances?args.TaxesAndInsurances:[];
	self.driverStatus = DriverStatus[args.driver_status_id];
	self.week_id = args.week_id;
	self.driver = args.driver?args.driver:null;
	self.days = args.days?args.days:0;
	
	if(self.days)
	{
		
		self.netTotal= self.grossTotal; 
		$.each(self.TaxesAndInsurances,function(i,n)
		{
			self[n.name] = n.calculate(self.days);
			self.netTotal = self.netTotal - self[n.name];
		//console.log("ff")	
		});
	
	}
	
};