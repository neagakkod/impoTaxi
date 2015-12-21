// JavaScript Document

var Merchant = function()
{
	var self= this;
		self.name="";
		self.id;
		
};


var MerchantCreator= 
{
	createFromRaw:function(raw)
	{
		var rslt= new CarExpense();
		rslt.date= new Date(parseInt(raw.raw_date));
		rslt.id=raw.id;
		rslt.reason=raw.reason;
		rslt.subTotal=parseFloat(raw.amount);
		rslt.car= CarCreator.createLight(raw.car_id);
		//rslt.merchant
		return rslt;
	},
	createBlank: function()
	{
	 return new CarExpense(CarCreator.createBlank());
	}
}

var CarExpenseFinder= function(addressFetcher)
{
	var self = {};
	
	self.fetcher = addressFetcher;
	self.findAll = function(dowhenfound)
	{
		if(CarExpenseHolder.carExpenses.length>0)
		{
			dowhenfound(CarExpenseHolder.carExpenses);
		}
		else
		{
			$.get(self.fetcher.getAllExpenses,function(rawExpenses)
			{
				rawExpenses=JSON.parse(rawExpenses);
			 	var rslt= 	$.map(rawExpenses,function(rawExpense)
					{
						return CarExpenseCreator.createFromRaw(rawExpense);
					});
				
				CarExpenseHolder.carExpenses= rslt;
				dowhenfound(CarExpenseHolder.carExpenses);
			});
		}
	};
	
	
	return self;

};
 