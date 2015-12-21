// JavaScript Document
var TemplateHolder = {};
var KuaminikaView = function(args)
{
	var self= this;
	
	self.viewName = args.viewName;
	self.postDigest = args.postDigest?args.postDigest:function(){};
	self.preDigest = args.preDigest?args.preDigest:function(){};
	
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
			args.digestView(TemplateHolder[self.viewName]);
			self.postDigest();
		}
		
			fetchTemplate(args.digestView);
	};
	
};


var MultipleKuaminikaView = function(args) 
{
	var self = this;
	KuaminikaView.call(this,args);
	self.subViewsList= args.subViewsList;
}