// JavaScript Document

var KuaminikaDropDown = function(args)
{
	var self= this;
	var blankKuaminikaDropDownArgs = {
		id:"",
		initialValue:{chosenValue:"",chosenDisplay:""},
		list:[],
		holder_id:"",
		property:"",
		reactToChoice:function(){}
	};
	if(!args)
	{
		args = blankKuaminikaDropDownArgs;
	}
	
	self.id = args.id;
	self.initialValue =args.initialValue;
	self.list = args.list;
	self.holder_id = args.holder_id;
	self.property = args.property;
	self.reactToChoice = args.reactToChoice;
	
	var generateChoices = function()
	{
		var rslt= "";
		$.each(self.list,function()
		{
			rslt+='<li data-chosenvalue="'+this.chosenValue+'" data-chosendisplay="'+this.chosenDisplay+'"><a  href="#">'+this.chosenDisplay+'</a></li>';
			
		});
	
		rslt=$.parseHTML(rslt);
		
		console.log(rslt);
	 	var valueHolder = document.getElementById(self.id+'_selected');
		$.each(rslt,function(i,n)
		{
			n.onclick=function()
			{
				valueHolder.innerHTML= n.dataset.chosendisplay;
				if(self.reactToChoice)
				{
					self.reactToChoice(n.dataset.chosenvalue);
				}
			};
		});
		return rslt;
	};
	
	
		
	
	
	self.load = function()
	{
		var result = '	<div id="'+self.id+'" class="dropdown menu-bar pull-left" style="margin-bottom: 0">' 
			   + '	  <button class="btn btn-default dropdown-toggle" type="button" id="'+self.id+'Menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
			   + '	    <span id="'+self.id+'_selected"  data-chosenvalue="'+self.initialValue.chosenValue+'" data-chosendisplay="'+self.initialValue.chosenDisplay+'">'+self.initialValue.chosenDisplay+'</span>'
			   + '	    <span class="caret"></span>'
			   + '	  </button>'
			   + '	  <ul id="'+self.id+'_choiceList" class="dropdown-menu" aria-labelledby="'+self.id+'Menu">'
			  
			   + '	  </ul>'
			   + '	</div>';
		var container = document.getElementById(self.holder_id);
		    container.innerHTML=result;
		var choiceListItems=  generateChoices();

		$('#'+self.id+'_choiceList').html(choiceListItems);
		
	};
	
};


var FormModeMenu = function ()
{
	var self= this;

	self.activated = false;
	
	self.container = null;
	
	self.addMenuItem = null;
	self.updateMenuItem = null;
	
	self.addeModeHandler = function(){};
	self.updateModeHandler = function(){};
	
	self.activate = function()
	{
		self.container = document.getElementById("formMenu");
		if(self.container)
		{
			var addMenuItem = self.container.children[0];
			var updateMenuItem = self.container.children[1];
		
			addMenuItem.onclick = self.addeModeHandler ;
			updateMenuItem.onclick = self.updateModeHandler ;
		
			self.addMenuItem=$(addMenuItem);
			self.updateMenuItem=$(updateMenuItem);
			self.activated = true;
		}	
	};
	
	
	self.activateMode = function(mode)
	{
			//set update or add mode
		if(mode=="update")
		{
		
			self.addMenuItem.removeClass("active");
			//self.addMenuItem.hide();
			self.updateMenuItem.addClass("active");
			self.updateMenuItem.show();
			
		}
		else
		{
			$(".currentlyInEdit").removeClass("currentlyInEdit");
			self.addMenuItem.addClass("active");
			self.addMenuItem.show();
			self.updateMenuItem.removeClass("active");
			self.updateMenuItem.hide();
		}
	};
	
};


//Ajouter une semaine

var FormTitleHolder = {
  "IncomeForm":{"update":{"fr":"Modif. de Revenu"
  						  ,"en":"Modify Income"
  						  ,"kr":"Modifye Revni a"
  						}
  				,"add":{"fr":"Ajouter un Revenu"
  						,"en":"Add Income"
  						,"kr":"Ajoute yon Revni"
  						}
  				} 
  ,"TimeRangeForm":{"update":{"fr":"Modif. de Semaine"
  						  ,"en":"Modify Week"
  						  ,"kr":"Modifye semèn la"
  						}
  				,"add":{"fr":"Ajouter une semaine"
  						,"en":"Add week"
  						,"kr":"Ajoute yon semèn"
  						}
  				} 
};