// JavaScript Document
var TemplateHolder = {};
var KuaminikaView = function(args)
{
	var self= this;
	var doNothingFnc = function(){};
	self.viewName = args.viewName;
	
	self.postDigest = args.postDigest?args.postDigest:doNothingFnc;
	self.preDigest = args.preDigest?args.preDigest:doNothingFnc;
	self.digestView = args.digestView?args.digestView:doNothingFnc;
	
	var fetchTemplate= function(digestView)
	{
		$.get("templates/"+self.viewName+".html",function(rawTmplt)
		{
			TemplateHolder[self.viewName]=Handlebars.compile(rawTmplt);
			self.preDigest();
			 digestView(TemplateHolder[self.viewName]);
			 	self.postDigest();
		});
	};
	
	self.execute = function()
	{
		if(TemplateHolder[self.viewName])
		{
			self.preDigest();
			self.digestView(TemplateHolder[self.viewName]);
			self.postDigest();
		}
		
			fetchTemplate(self.digestView);
	};
	
};


var MultipleKuaminikaView = function(args) 
{
	var self = this;
	KuaminikaView.call(this,args);
	self.subViewsList= args.subViewsList;
}