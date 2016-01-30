var Organization = function(args)
{
	var blankArgs = {
			id:0,name:"",owner:""
	};
	var self = this;
	self.name= args.name;
	self.id= args.id;
	self.owner= args.owner;
};