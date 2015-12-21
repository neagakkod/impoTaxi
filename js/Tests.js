// JavaScript Document


//--------------------------------------------------------------

var weekArgs= {
	raw_date_start:1447593139563,
	raw_date_end:1448111539563,
	id:1,
	month_id:11,
	incomes:[]
};


var driverArgs={
	id: 1,
	first_name:"Max"
};
var max = new Driver(driverArgs);


var weeklyIncomeArgs = {
	id:1,
	week_id : 1,
	driver_status_id : 1,
	grossTotal:200,
	driver:max,
	days:2
};


var milSecsInAWeek= 518400000;
var day = 1000 * 60 * 60 * 24 * 3
milSecsInAWeek+=day;
var week= new Week(weekArgs);
var weeksInMonth= 4;
var amountOfWeeks = 2;
var currentWeekOfMonth = amountOfWeeks%weeksInMonth;

var weeks = [];

do
{
	weeklyIncomeArgs.week_id=weekArgs.id;
	weeks.push(new Week(weekArgs));

	
	//creating weekly income
//	weekArgs.incomes.push(new WeeklyIncome(weeklyIncomeArgs));
	
	weeks[weeks.length-1].incomes.push(new WeeklyIncome(weeklyIncomeArgs));
	//updating weeklyIncome
	//weeklyIncomeArgs.id++;
	
	//updating week
	weekArgs.raw_date_start+=milSecsInAWeek;
	weekArgs.raw_date_end+=milSecsInAWeek;
	amountOfWeeks++;
	weekArgs.id++;
	currentWeekOfMonth = amountOfWeeks%weeksInMonth;
	weekArgs.month_id = weekArgs.month_id + ((currentWeekOfMonth===0)?1:0);
	weekArgs.month_id = (weekArgs.month_id>12) ? weekArgs.month_id%12 : weekArgs.month_id;
}
while(amountOfWeeks<=5);
console.log(weeks);


$.each(weeks,function()
{
	console.log("id:"+this.id)
	console.log("s:"+this.date_start.getTime())
	console.log("e:"+this.date_end.getTime())
})
/*var icontroller= new IncomeController({data:{weeks:weeks,month_id:11}});
icontroller.init();*/
/*

$.get("templates/income.html",function(data)
			{
				weeklyIncomeView = Handlebars.compile(data);
				IncomeController({weekelyIncomeView:weeklyIncomeView,data:{list:weeklyIncomes}});
			});*/