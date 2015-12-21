// JavaScript Document

	var ExpenseForm = function(options)
	{
		var self= this;
		var cars= options.carList;
		var assignCar= function(id)
		{
			return $.grep(cars,function(car)
			{
				return car.id==id;
			})[0];
		};
		self.activateMode=function(mode)
		{
			//set update or add mode
			if(mode=="update")
			{
				self.updateBtn.show();
				self.addBtn.hide();
				self.addMenuItem.removeClass("active");
				self.updateMenuItem.addClass("active");
				
			}
			else
			{
				self.updateBtn.hide();
				self.addBtn.show();
				$(".currentlyInEdit").removeClass("currentlyInEdit");
				self.addMenuItem.addClass("active");
				self.updateMenuItem.removeClass("active");
			}
		};
		
		self.template=options.template;
		self.expense=options.expense;
		self.action= options.action;
		self.load= function(loadContainer_id)
		{
			$("#"+loadContainer_id).html(self.template({expense:self.expense}));
			var form=$("#expenseForm");
			
			var menuForm= document.getElementById("expenseFormMenu");
			var addMenuItem = menuForm.children[0];
				addMenuItem.onclick=function()
				{
					self.expense=CarExpenseCreator.createBlank();
					self.load(loadContainer_id);
					self.activateMode("add");
				};
			var updateMenuItem = menuForm.children[1];
				updateMenuItem.onclick=function()
				{
					self.expense=options.expenseList[0];
					$(".currentlyInEdit").removeClass("currentlyInEdit");
					$("#"+self.expense.id).addClass("currentlyInEdit");
					menuForm.remove();
					form.remove();
					self.load(loadContainer_id);
					self.activateMode("update");
				};
			
			var allInputs=$("#expenseForm input");
			var carSelector = $("#expenseForm .car_id_selector");
			var dtp=$("#expenseForm .date");
			
			var addBtn = document.getElementById("addExpenseButton");
			var updateBtn=  document.getElementById("updateExpenseButton");
			if(options.action=="add")
				self.expense.car=assignCar(carSelector.val());
			allInputs.change(function()
			{
				self.expense[this.name]=this.dataset.isnumeric?parseInt(this.value):this.value;
			});
		
			dtp.datetimepicker({format: 'YYYY-MM-DD'});
			dtp.on("dp.change",function(e)
			{
				self.expense.date=e.date._d;
			});
			carSelector.change(function()
			{
				var chosenCar_id=this.options[this.selectedIndex].value;
				self.expense.car = assignCar(chosenCar_id);
			});
	
			addBtn.onclick=function(e)
			{
				menuForm.remove();
				form.remove();
				options.addBtnProcedure(self.expense);
			};
			
			updateBtn.onclick=function()
			{
				menuForm.remove();
				form.remove();
				options.updateBtnProcedure(self.expense);
			};
			
			self.updateBtn=$(updateBtn);
			self.addBtn=$(addBtn);
			self.addMenuItem=$(addMenuItem);
			self.updateMenuItem=$(updateMenuItem);
			self.activateMode(options.action);
		};
	};