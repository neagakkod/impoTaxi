// JavaScript Document

var LoginController = function(args)
{
	
	var submitBtn = document.getElementById(args.submitBtnId);
	var usrInput  = document.getElementById(args.usrInputId);
	var pwdInput  = document.getElementById(args.pwdInputId);
	

	submitBtn.onclick = function()
	{	var cred= new KuaminikaCredentials({usr:usrInput.value,pwd:pwdInput.value});
		var authenticator = new KuaminikaAuthenticator({url: fetcher.Login.authenticate,credentials:cred}); 
		authenticator.authenticate()
		
	};

};
