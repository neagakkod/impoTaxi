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