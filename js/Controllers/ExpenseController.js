// JavaScript Document


var ExpenseController= function(viewset)
{
	var self= this;
	
	var _gridViewName ="nonEditable_expenseGrid"; 
	var _editViewName = "editExpense";
	var mainContainer_id = "centerStage";
	var editFormContainer_id = "modalStage";
	var topMenuContainer_id = "middleMenu";
	

	var finder ={ 
				expenses:CarExpenseFinder(fetcher.CarExpenses),
				cars:CarFinder(fetcher.Cars)
				};

	var ceCreator= new ModelCreator("CarExpense");
	self.add=function(newExpense)
	{
		var convertedInstance= newExpense? newExpense:CarExpenseCreator.createBlank();
	
		convertedInstance.raw_date=convertedInstance.date.getTime();
		convertedInstance.amount=convertedInstance.subTotal;
		$.post(fetcher.CarExpenses.add,convertedInstance,function(data)
		{
			console.log(data);
			self.grid.addRow(newExpense);
		});
	};
	
	self.update= function()
	{
		var convertedInstance= self.form.subject;
			convertedInstance.raw_date=convertedInstance.date.getTime();
			convertedInstance.amount=convertedInstance.subTotal;
		$.post(fetcher.CarExpenses.update,convertedInstance,function(data)
		{
			console.log(data);
				self.grid.reload();
					self.formContainer.modal("hide"); 
		});
	};

	
	self.delete= function(id,doClientDelete)
	{
		$.get(fetcher.CarExpenses.delete+id,function(data)
		{
			data= JSON.parse(data);
			if(data.success)
			{
			
				if(self.form.subject.id===id)
				{
					self.form.subject=null;
				}
				doClientDelete();
			}
		});
	};
	
	
	
	
	self.grid = new  KuaminikaGrid({gridID:"expenseTable",
											viewName:_gridViewName,
									     	gridHolderId:mainContainer_id//"leftPart"
													});
	
	self.topMenuContainer = document.getElementById(topMenuContainer_id);
	
	self.formContainer = 	$("#"+editFormContainer_id);
	self.form = new ExpenseForm({viewName:_editViewName,
								 holderId:editFormContainer_id,//"rightPart"
								 subject:ceCreator.createBlank(),
								 subjectType:"CarExpense",
								 addBtnProcedure:function(newEx)
								{
									self.add(newEx);
									loadAddExpenseForm();
									self.formContainer.modal("hide"); 
									//loadAddExpenseForm();
								},
								updateBtnProcedure:self.update
								
								
								});
								
/*	self.grid=new  KuaminikaGrid({gridID:"expenseTable",
								  template:viewset.expenses,
								  blnkElmFunction:CarExpenseCreator.createBlank,
								  actionBeforeDelete:self.delete,
								  actionBeforeUpdate:self.update,
								  NoControllerActionNeeded:false,
								  loadElementFunction:self.loadExpenseToEdit
								});*/
	var activateTopMenu = function()
	{
		var launchAddFormBtn = document.getElementById("launchAddSubject");
		launchAddFormBtn.onclick=function()
		{	self.formContainer.modal("show"); 
			loadAddExpenseForm();
		};
		launchAddFormBtn.style.display="";
		var launchRptBtn = document.getElementById("launchRptBtn");
		launchRptBtn.onclick = function()
		{
			var currentTrimester = CurrentInfo.trimester;
			var frm=document.getElementById("launchRptBtn_form");

			$.each(currentTrimester,function(k,v)
			{  $('<input />').attr('type', 'hidden')
				            .attr('name', k)
				            .attr('value', v)
				            .appendTo(frm);
		
			});
			frm.action=fetcher.CarExpenses.rptForTimeRange;
			frm.method="post";
			frm.submit();
		};
	};

	var loadAddExpenseForm = function()
	{
	
		self.form.subject=ceCreator.createBlank();
		self.form.operation = "add";
		self.form.load();
	};							
								
	self.showAllExpensesForTrimester = function(trimester_id)
	{
		var currentTrimester = CurrentInfo.trimester;
		
		
		var doWhenFound = function(expenses)
		{
			self.grid.data= expenses;
			self.grid.loadElement = function()
											{
													self.formContainer.modal("show"); 
									     	  	var subject_id = this.id.split("_")[1];
									     	 	self.form.subject = ModelHolder["CarExpense"].get(subject_id);
									     	 	self.form.operation = "update";
									     	 	self.form.load();
									     	 	self.grid.markRowAsSelected(subject_id);
									     	  };
			self.grid.actionBeforeDelete = self.delete;
			self.grid.load();
			console.log(expenses);
		};
		finder.expenses.findAllForTimeRange(currentTrimester,doWhenFound);
	
	};

	self.init=function()
	{
		self.showAllExpensesForTrimester(CurrentInfo.trimester.id);
		activateTopMenu();
		//loadAddExpenseForm();
	};
};