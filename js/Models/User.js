// JavaScript Document

var User=function(args){
	/*
	args
	{
		usr:""
	   ,user_id:0
	}
	*/
	args=args?args:{};
	var self= this;
	self.id= args.user_id?args._id:0;;
	self.usr=args.usr;
	self.memberAccount = new Member(args);
	
};






















