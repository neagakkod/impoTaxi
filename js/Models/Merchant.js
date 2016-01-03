// JavaScript Document

var Merchant = function()
{
	var self= this;
		self.name="";
		self.id=-1;
		
};

var MerchantCreator= 
{
	createFromRaw:function(raw)
	{
		var rslt= new Merchant();
		rslt.date= new Date(parseInt(raw.raw_date));
		rslt.id=raw.id;
		rslt.name=raw.name;
		return rslt;
	},
	createBlank: function()
	{
	 return new Merchant();
	}
};

 //temporarily putting Merchants up 
ModelHolder.Merchant.updateMapWithArray([
	MerchantCreator.createFromRaw({id:1,name:"garage excellence"}),
	MerchantCreator.createFromRaw({id:2,name:"canadian tire"})
	]);
	
