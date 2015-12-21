// JavaScript Document
/*
args={
	date_start,
	date_end,
}
*/
var TimeRange=function(args)
{
	var self= this;
	self.date_start=args.raw_date_start? new Date(parseInt(args.raw_date_start)): new Date();
	self.date_start.changeTimePart(0,0,0);
	self.date_end=args.raw_date_end? new Date(parseInt(args.raw_date_end)):  new Date();
	self.date_end.changeTimePart(23,59,59);
	self.getIncomes= function(){}
	self.getExpenses= function(){}
	
}
/*
args={
	id,
month_id,
}
*/
var Week= function(args)
{
	var _generateDefault= function()
						{
							var defaultDate= new Date();
							return {
								id:0,
								month_id:1,
								date_start:defaultDate.getTime(),
								date_end:defaultDate.getTime()
							};
						};
	
	if(!args)
	{
		args = _generateDefault();
	}
	var self = this;
	self.id= args.id;
	self.month_id= args.month_id;
	self.incomes=[];
	TimeRange.call(this,args);
};
/*
args={
	id,year_id,name
}
*/

var Month= function(args)
{
	var self = this;
	self.id= args.id;
	self.year_id=args.year_id;
	self.name= args.name;
	self.weeks=[];
	TimeRange.call(this);
	self.date_start=self.weeks[0].date_start;
	self.date_end =self.weeks[self.weeks.length-1].date_start;
}
/*
args={
	id,name
}
*/
var Year= function(args)
{
	var self = this;
	self.id= args.id;
	self.name= args.name;
	self.months=[];
	self.date_start=self.months[0].date_start;
	self.date_end =self.months[self.weeks.length-1].date_start;
	self.trimesters=[];
	var generateTrimesters=function()
	{
		//groupment of months into three
	}
	TimeRange.call(this);
}