// JavaScript Document

var currentLanguage = "fr"
var TimeCalculator= function ()
{
	var self=this;
	self.difference=-1;
	self.click= function()
	{
		if(!self.startTime)
		{
			self.startTime= new Date();
			return;
		}
		var endTime= new Date();
		self.difference= endTime-self.startTime;
	};
	
	self.disPlayDiff=function()
	{
		var rslt= (self.difference/1000) +" s ";
		self.difference=-1;
		return rslt;
	};
};
//---
var LaunchAdressFetcher = function(callback){
	return $.get("index.php/FetcherAddresses",callback);
};


var fetcher;
var expenseView;
var editExpensesView;
var weeklyIncomeView;
var timer= new TimeCalculator();
var isOnLoginPage = location.pathname.indexOf("/login.php")>0;


////
var currentDate = new Date();
var CurrentInfo = {"year":currentDate.getFullYear()
				  ,"trimester":!isOnLoginPage?TrimesterList[Math.ceil(currentDate.getMonth()/3)]:-1
				  ,"date":currentDate
				  };

///

	LaunchAdressFetcher(function(addressFetcher)
	{
		fetcher = JSON.parse(addressFetcher);
		if(isOnLoginPage)
			$(document).ready(function(){
			    		LoginController({submitBtnId:"submitCredBtn",
			    						 usrInputId:"inputUsr",
			    						 pwdInputId:"inputPassword"});
			    	});
	    else
		{
			var menuBar= new MenuBarController();
			menuBar.init();
			/*var icontroller= new IncomeController({data:{weeks:weeks,month_id:11}});
			icontroller.init();*/
		/*	$.get("templates/nonEditable_expenseGrid.html",function(datas)
			{
				$.get("templates/editExpense.html",function(data)
				{
					expensesView = Handlebars.compile(datas);
					editExpensesView=Handlebars.compile(data);
					
					var controller= new ExpenseController({
						expense:editExpensesView,
						expenses:expensesView
					});
					controller.showForm();
					controller.show();
				});
			});*/
		/*	$.get("templates/income.html",function(data)
			{
				weeklyIncomeView = Handlebars.compile(data);
				IncomeController({weekelyIncomeView:weeklyIncomeView});
			});*/
		}
	});







