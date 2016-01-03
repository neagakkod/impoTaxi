// JavaScript Document

var currentLanguage = "fr";
var taxRates = {tps:0.05,tvq:0.09975}
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

var CurrentInfo = function()
				{ var currentDate = new Date();
					var currentYear = new Year({id:currentDate.getFullYear()});
				 return {"year":currentYear//currentDate.getFullYear()
				  ,"trimester":!isOnLoginPage?currentYear.trimesters[Math.ceil(currentDate.getMonth()/3)]:1//TrimesterList[Math.ceil(currentDate.getMonth()/3)]:-1
				  ,"date":currentDate
				  }}();

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







