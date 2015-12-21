// JavaScript Document


var ExpenseController= function(viewset)
{
	var self= this;
	var finder ={ 
				expenses:CarExpenseFinder(fetcher.CarExpenses),
				cars:CarFinder(fetcher.Cars)
				};


	self.update= function()
	{
		var convertedInstance= self.form.expense;
			convertedInstance.raw_date=convertedInstance.date.getTime();
			convertedInstance.amount=convertedInstance.subTotal;
		$.post(fetcher.CarExpenses.update,convertedInstance,function(data)
		{
			console.log(data);
				self.grid.updateRow(convertedInstance);
		});
	};
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
	
	
	self.delete= function(id,doClientDelete)
	{
		$.get(fetcher.CarExpenses.delete+id,function(data)
		{
			data= JSON.parse(data);
			if(data.success)
			{
			
				if(self.form.expense.id==id)
				{
					self.form.expense=null;
				}
				doClientDelete();
			}
		});
	};
	self.show=function()
	{
		finder.cars.findAll(function(cars){
			
			finder.expenses.findAll(function(expenses)
			{ 
			
				self.grid.data=expenses;
				self.grid.addBtnId="addExpenseButton";
				$("#leftPart").append(self.grid.load());
				self.grid.listenAndprocessChange();
				self.grid.activateDateTimePickers();
				self.grid.activateUpdateButtons("editExpenseButton");
				self.grid.activateDeleteButtons("deleteExpenseButton");
			});
		});
	};
	
	self.loadExpenseToEdit= function(id)
	{
		console.log("thd");
		console.log(this);
		var expense_id=parseInt(this.id.split("_")[1]);
		var editMe=$.grep(CarExpenseHolder.carExpenses,function(expense)
		{
			return expense.id==expense_id;
			
		})[0];
		$(".currentlyInEdit").removeClass("currentlyInEdit");
		$("#"+expense_id).addClass("currentlyInEdit");
		self.showForm(editMe);
	};
	
	self.showForm= function(currentEx)
	{
		finder.cars.findAll(function(cars)
		{
			finder.expenses.findAll(function(expenses)
			{ 
				self.form= new ExpenseForm({
					template:viewset.expense,
					expense:currentEx?currentEx:CarExpenseCreator.createBlank(),
					carList:cars,
					action:currentEx?"update":"add",
					expenseList:expenses,
					updateBtnProcedure:function(editMe)
					{
						self.update(editMe);
						self.showForm();
					},
					addBtnProcedure:function(newEx)
					{
						self.add(newEx);
						self.showForm();
					}
				});
				self.form.load("rightPart");
			});
		});
	};
	self.grid=new  KuaminikaGrid({gridID:"expenseTable",
								  template:viewset.expenses,
								  blnkElmFunction:CarExpenseCreator.createBlank,
								  actionBeforeDelete:self.delete,
								  actionBeforeUpdate:self.update,
								  NoControllerActionNeeded:false,
								  loadElementFunction:self.loadExpenseToEdit
								});
};