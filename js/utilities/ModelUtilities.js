// JavaScript Document
var IdentityMap = function(){
	var self= this;
	self.map={};
	self.get= function(id)
	{
		return self.map[id];
	}
	self.size = function() {
	    var size = 0, key;
	    for (key in self.map) {
	        if (self.map.hasOwnProperty(key)) size++;
	    }
	    return size;
	};
	self.updateMapWithArray= function(mapArray)
	{
		$.each(mapArray,function(){
				self.map[this.id]=this;
			});
	};
	
	self.add = function(addMe)
	{
		self.map[addMe.id]=addMe;
	};
};


var ModelHolder = {
	car:new IdentityMap(),
	carExpense:new IdentityMap(),
	Income:new IdentityMap(),
	taxInsurances:new IdentityMap(),
	timeRanges_Months:new IdentityMap(),
	Week:new IdentityMap(),
	Driver:new IdentityMap()
};
var DriverStatus = {"1":{"fr":"disponible","en":"available","kr":"lib","id":1},
					"2":{"fr":"malade","en":"sick","kr":"malad","id":2},
					"3":{"fr":"panne","en":"car breakdown","kr":"pann","id":3},
					"4":{"fr":"vacances","en":"vacation","kr":"vakans","id":4}
};
var MonthList = {
	"1":{"fr":"Janvier","en":"January","kr":"Janvye"},
	"2":{"fr":"Fevrier","en":"February","kr":"Fevriye"},
	"3":{"fr":"Mars","en":"March","kr":"Mas"},
	"4":{"fr":"Avril","en":"April","kr":"Avril"},
	"5":{"fr":"Mai","en":"May","kr":"Me"},
	"6":{"fr":"Juin","en":"June","kr":"Jwen"},
	"7":{"fr":"Juillet","en":"July","kr":"Jiye"},
	"8":{"fr":"Aout","en":"August","kr":"Aout"},
	"9":{"fr":"Septembre","en":"September","kr":"Septanm"},
	"10":{"fr":"Octobre","en":"October","kr":"Oktob"},
	"11":{"fr":"Novembre","en":"November","kr":"Novanm"},
	"12":{"fr":"Decembre","en":"December","kr":"Desanm"}
};


var TrimesterList = {
	"1":{id:1,month_ids:[1,2,3],name:"Jan, Feb, Mar"},
	"2":{id:2,month_ids:[4,5,6],name:"Apr, May, Jun"},
	"3":{id:3,month_ids:[7,8,9],name:"Jul, Aou, Sept"},
	"4":{id:4,month_ids:[10,11,12],name:"Oct, Nov, Dec"}
}
var ModelCreator= function(ModelType)
{
	var self= this;
	var Model = window[ModelType];
	self.createLight=function(args)
	{
		var rslt= new Model(args);
		rslt.light=true;
		return rslt;
	};
	self.createBlank=function(args)
	{
		var rslt= new Model(args);
		rslt.blank=true;
		return rslt;
	};
	
	self.createConcrete=function(rawArgs)
	{
		var rslt= new Model(rawArgs);
		rslt.concrete=true;
		return rslt;
	};
	self.createLightFromRaw=function(rawArgs)
	{
		var rslt= new Model(rawArgs);
		rslt.light=true;
		return rslt;
	};
};

var ModelFinder= function(addressFetcher,ModelType)
{
	var self = this;
	var modelCreator = new ModelCreator(ModelType);
	self.fetcher = addressFetcher;
	self.findAll = function(dowhenfound)
	{
		if(ModelHolder[ModelType].length>0)
		{
			dowhenfound(ModelHolder[ModelType]);
		}//ModelHolder[ModelType]
		else
		{
			$.get(self.fetcher.getAll,function(rawArgsList)
			{
				rawArgsList = JSON.parse(rawArgsList);
			 	var rslt = 	$.map(rawArgsList,function(rawArgs)
					{
						return modelCreator.createLightFromRaw(rawArgs);
					});
				
				ModelHolder[ModelType]= rslt;
				dowhenfound(ModelHolder[ModelType]);
			});
		}
	};
	self.findAllLight = function(fetchType,dowhenfound)
	{
		if(ModelHolder[ModelType].size()>0)
		{
			dowhenfound(ModelHolder[ModelType].map);
		}//ModelHolder[ModelType]
		else
		{
			$.get(self.fetcher[fetchType],function(rawArgsList)
			{
				rawArgsList = JSON.parse(rawArgsList);
			 	var rslt = $.map(rawArgsList,function(rawArgs)
					{
						return modelCreator.createLightFromRaw(rawArgs);
					});
				
				ModelHolder[ModelType].updateMapWithArray(rslt);
				dowhenfound(ModelHolder[ModelType].map);
			});
		}
	};
};

 