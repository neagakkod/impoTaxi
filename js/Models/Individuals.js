// JavaScript Document

var Individual = function(args)
{
	var self = this;
	self.id = args.id?args.id:0;
	self.first_name = args.first_name?args.first_name:"";
	self.last_name = args.last_name?args.last_name:"";
	self.email = args.email?args.email:"";
	self.addresses= [];
};

var Driver = function(args)
{
	var self= this;
	Individual.call(this,args);
	self.car= args.car?args.car:null;
};