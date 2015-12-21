// JavaScript Document

var KuaminikaCredentials = function(args)
{
	var self= this;
	self.username=args.usr ? args.usr : "";
	self.password=args.pwd ? args.pwd : "";
	
}
var KuaminikaAuthenticator = function (args)
{
	var self = this;
	self.authenticationURL=	args.url;
	self.credentials= args.credentials;
	self.authenticate= function(){
		console.log(self.credentials);
	$.post(self.authenticationURL,self.credentials,function(result){
		result= JSON.parse(result);
		console.log(result);
		if(result.loggedIn)
		window.location.replace(result.targetBeforeLogin?result.targetBeforeLogin:"/impotaxi");
		});
	};
};

