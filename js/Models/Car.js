// JavaScript Document
/*var CarExpenseHolder= {
	
	cars:[],
	carExpenses:[]	
};

*/


var Car = function(_id,name)
{
	var self = this;
	self.id = _id;
	self.make="";
	self.model="";
	self.year=0;
	self.color="";
	self.name=name;
};




var CarCreator= 
{
	createLight:function(_id,name)
	{
		var rslt= new Car(_id,name);
		rslt.light=true;
		return rslt;
	},
	createBlank:function()
	{
		var rslt= new Car();
		rslt.blank=true;
		return rslt;
	}
	,
	createConcrete:function(raw)
	{
		var rslt= new Car(raw.id,raw.name);
		rslt.make= raw.make;
		rslt.model= raw.model;
		rslt.year= raw.year;
		rslt.concrete=true;
		return rslt;
	},
	createLightFromRaw:function(raw)
	{
	var rslt= new Car(raw.id,raw.name);
		rslt.light=true;
		return rslt;
	}
};

var CarFinder= function(addressFetcher)
{
	var self = {};
	
	self.fetcher = addressFetcher;
	self.findAll = function(dowhenfound)
	{
		if(ModelHolder.Car.length>0)
		{
			dowhenfound(ModelHolder.Car);
		}
		else
		{
			$.get(self.fetcher.getAll,function(rawCars)
			{
				rawCars=JSON.parse(rawCars);
			 	var rslt= 	$.map(rawCars,function(rawCar)
					{
						return CarCreator.createLightFromRaw(rawCar);
					});
				
				ModelHolder.Car= rslt;
				dowhenfound(ModelHolder.Car);
			});
		}
	};
	
	
	return self;

};
 