// JavaScript Document

var Expense = function()
{
	var self= this;
		self.date= new Date();
		self.reason="";
		self.subTotal=0;
		self.merchant_id=1;
		
}

var CarExpense = function(car)
{
	var self = this;
	self.car = car;
   Expense.call(this);
}
var CarExpenseCreator= 
{
	createFromRaw:function(raw)
	{
		var rslt= new CarExpense();
		rslt.date= new Date(parseInt(raw.raw_date));
		rslt.id=raw.id;
		rslt.reason=raw.reason;
		rslt.subTotal=parseFloat(raw.amount);
		rslt.car= CarCreator.createLight(raw.car_id,raw.car_name);
		rslt.merchant_id=1;
		rslt.merchant = ModelHolder.Merchant.get(rslt.merchant_id);
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
	
	var preFoundProcedure = function(rawExpenses,dowhenfound)
		{
			rawExpenses=JSON.parse(rawExpenses);
			 	var rslt= 	$.map(rawExpenses,function(rawExpense)
					{
						return CarExpenseCreator.createFromRaw(rawExpense);
					});
				ModelHolder.CarExpense.updateMapWithArray(rslt);
	
				dowhenfound(rslt);
		}
	
	
	
	self.findAll = function(dowhenfound)
	{
		if(CarExpenseHolder.carExpenses.length>0)
		{
			dowhenfound(CarExpenseHolder.carExpenses);
		}
		else
		{
			$.get(self.fetcher.getAll,function(rawExpenses)
			{
				preFoundProcedure(rawExpenses,dowhenfound);
			});
		}
	};
	
	self.findAllForTimeRange = function(timeRange, doWhenFound)
	{
		
		timeRange.raw_date_end=timeRange.date_end.getTime();
		timeRange.raw_date_start=timeRange.date_start.getTime();
		$.post(fetcher.CarExpenses.getForTimeRange,timeRange,function(rawExpenses)
		{
			preFoundProcedure(rawExpenses,doWhenFound);
		});
	}
	return self;

};
 