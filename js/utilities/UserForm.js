var UserForm = function(options)
{
	var self= this;
	

		KuaminikaForm.call(this,options);
		
			var superLoad= self.loadProcedure;
	self.loadProcedure = function()
	{
			superLoad();
			
			var allInputs = $(self.form_container.getElementsByTagName('input'));
			allInputs.change(function()
			{ 
			
				if(this.dataset.memberaccount)
				{	self.subject.memberAccount[this.name]=this.value;
				 
					delete self.subject[this.name];
				}
				console.log(self.subject);
				//self.subject.applyDaysChanges();
			});
			self.subject.memberAccount.organization_id=self.organizationDropDown.initialValue.chosenValue;
			self.subject.memberAccount.profile_type=2;
			self.organizationDropDown.load();
	};
		self.organizationDropDown = new KuaminikaDropDown({
											 id:"organizationDropDown",
											 initialValue:{chosenValue:1,chosenDisplay:"Kuaminika-dev"},
											 list:[{chosenValue:1,chosenDisplay:"Kuaminika-dev"}],
											 reactToChoice:function(orgnaization_id)
											 {
											 	self.subject.memberAccount.orgnaization_id= orgnaization_id;
											 },
											holder_id:"organization_holder"
											});
};
UserForm.prototype = (function() {
  var Base = function() {};
  Base.prototype = KuaminikaForm.prototype;
  return new Base();
}());
//IncomeForm.prototype=Object.create(KuaminikaForm.prototype);
UserForm.prototype.constructor = UserForm;