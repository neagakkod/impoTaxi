// JavaScript Document
/*
{amount:,name:,isPercentage:}
*/
var TaxInsurance = function(args)
{
	var self= this;
	self.amount= args.amount;
	self.name = args.name;
	self.isPercentage = false;
};

var Insurance = function (args)
{
	TaxInsurance.call(this,args);
	var self= this;
	self.insurance_id= args.id;
	self.calculate = function(subject)
	{
		var rate = (self.isPercentage)?parseFloat(self.amount/100):self.amount;
		return rate*subject;
	};
};
var Tax = function (args)
{
	TaxInsurance.call(this,args);
	var self= this;
	self.isRegional= args.isRegional;
	self.calculationMethod= args.calcMethod;
	self.tax_id=args.id;
	self.isPercentage= true;
	self.calculate = function(subject)
	{
		var rate = (self.isPercentage)?parseFloat(self.amount/100):self.amount;
		
		if(self.isRegional && self.calculationMethod=="quebec")
		{
			subject = subject + ModelHolder.taxInsurances["TPS"].calculate(subject);
		}
		return rate*subject;
	};
};

//already in client (dimension models)
ModelHolder.taxInsurances={"chom_empl":new Insurance({amount:1.73,name:"chom_empl",id:1}),
						   "chom_prop":new Insurance({amount:2.42,name:"chom_prop",id:2}),
						   "TPS":new Tax({amount:5,name:"TPS",isRegional:false,calcMethod:"normal"}),
						   "TVQ":new Tax({amount:9.975,name:"TVQ",isRegional:true,calcMethod:"quebec"})};