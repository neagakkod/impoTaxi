// JavaScript Document

Handlebars.registerHelper('calculateTotal', function(expenses) 
{
   var result =0;
	$.each(expenses,function(i,expense)
	{
		result+=expense.subTotal;
	});
  return result;
});

Handlebars.registerHelper('calculateTps', function(subtotal) 
{
  var result =(parseFloat(subtotal)*taxRates.tps);
  return Math.round(result * 100) / 100;
});

Handlebars.registerHelper('calculateTvq', function(subtotal) 
{
  var tps= Handlebars.helpers.calculateTps(subtotal);
  var result = parseFloat(subtotal)*taxRates.tvq;//((tps+parseFloat(subtotal))*taxRates.tvq);
  return Math.round(result * 100) / 100;
});

Handlebars.registerHelper('calculateTaxInc', function(subtotal) 
{
   var tps= Handlebars.helpers.calculateTps(subtotal);
   var tvq= Handlebars.helpers.calculateTvq(subtotal);
   var result =subtotal+tps+tvq;
   return Math.round(result * 100) / 100;
});


Handlebars.registerHelper('calculateIncomeInsurance', function(days,insuranceType) {
  var insurance=ModelHolder.taxInsurances[insuranceType];
  return insurance.calculate(days);
});


Handlebars.registerHelper('formatDate', function(date) {
  return moment(date).format('YYYY-MM-DD');
});

Handlebars.registerHelper('formatDateInc', function(date) {
  return moment(date).format('MMM-DD');
});

Handlebars.registerHelper('writeMonth', function(month_id) {
  return MonthList[month_id][currentLanguage];
});

Handlebars.registerHelper('writeAsMoney', function(decimalValue) {
	var _format= '$0.00';
//	var string = numeral(decimalValue).format('0,0');
  return numeral(decimalValue).format(_format);
});


Handlebars.registerHelper('LoadCarDropDownOptions', function(/*cars,*/chosenCar) {
  var cars=ModelHolder.Car;
  var rslt="";
  var selected="";
  $.map(cars,function(car)
  {
  	selected=(car.id==chosenCar.id)?"selected":"";
   	rslt+="<option "+selected+" value="+car.id+" >"+car.name+"</option>";
  });
  rslt+="";
  return rslt;
});