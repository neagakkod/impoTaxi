// JavaScript Document
/*
driverArgs={
	id: 1,
	first_name:"Max",
	last_name:"",
	email:"",
	phone:""
}
*/

var Driver = function(args)
{
	var self= this;
	Individual.call(this,args);
	self.car= args.car?args.car:null;
};