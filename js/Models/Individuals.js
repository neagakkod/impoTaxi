// JavaScript Document

var Individual = function(args)
{
	var self = this;
	self.id = args.id?args.id:0;
	self.first_name = args.first_name?args.first_name:"";
	self.last_name = args.last_name?args.last_name:"";
	self.email = args.email?args.email:"";
	self.phone = args.phone?args.phone:"";
	self.addresses= [];
	self.organization_id=args.organization_id;
};

var Driver = function(args)
{
	var self= this;
	Individual.call(this,args);
	self.car= args.car?args.car:null;
};


var Member = function(args)
{
	var self= this;
	Individual.call(this,args);
	self.profile_type= args.profile_type;
};