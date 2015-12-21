// JavaScript Document
var IncomeController = function(args){
		var self= this;
		var _viewName ="income";
		var _gridViewName ="incomeGrid"; 
		var _editViewName = "editIncome";
		var _editWeekName = "editWeek";
		var data ={month_id:CurrentInfo.date.getMonth()} ;
		var wIncomeCreator = new ModelCreator("WeeklyIncome");
		var wCreator = new ModelCreator("Week");
		
		
		var loadAddIncomeFormForWeek = function(week_id)
		{
			self.incomeForm.operation = "add";
			self.incomeForm.subject.week_id = week_id;
			self.incomeForm.load();
		};
		var loadAddFormForWeek = function(month_id)
		{
			self.weekForm.truncateForm();
			self.weekForm.subject.month_id= month_id;
			self.weekForm.operation = "add";
			self.weekForm.setHolder("income_viewFloor");
			self.weekForm.load();
		};
		
		self.weekForm = new TimeRangeForm({viewName:_editWeekName,
											subject:wCreator.createBlank()
																	});
		self.incomeForm = new IncomeForm({viewName:_editViewName,
									holderId:"rightPart",
									subject:wIncomeCreator.createBlank(),
									addBtnProcedure:function(weeklyIncome)
									{
										console.log(weeklyIncome);
										$.post(fetcher.Incomes.add,weeklyIncome,function(rslt){
											console.log(rslt);
										});
									}
									});
		
		self.displayIncomesForWeek = function(week_id)
		{
				$.get(fetcher.Incomes.weeklyIncome+"/"+week_id,function(incomeArgs)
				{
					console.log(incomeArgs);
					incomeArgs = JSON.parse(incomeArgs);
					var addedIncome;
					var incomes = jQuery.map( incomeArgs, function(n) {
						
											addedIncome = new WeeklyIncome(n);
											addedIncome.driver = new Driver({
																				id: n.provider_id,
																				first_name:n.denormalized_provider_name
																			}); 
											 return addedIncome;
											});
					
					
					
				    var gridView = new  KuaminikaGrid({gridID:"incomeTable",
													  viewName:_gridViewName,
											     	  tableData:incomes,
											     	  gridHolderId:"income_viewFloor"
													});
						gridView.load();
				
				});
		};
		
		
		self.displayWeeklyIncomesForTrimester= function(trimester_id)
		{
			var data={trimester_id:trimester_id,list:[]};
			
			$.get(fetcher.TimeRanges.allWeeksInTrimester+"/"+trimester_id,function(raw_weeks)
			{
				console.log(raw_weeks);
			
				$.each(JSON.parse(raw_weeks),function(){
					
					data.list.push({month_id:this.month_id,
							        weeks:$.map(this.weeks,function(v,k)
																{
																	var newWeek= new Week(v);
																	ModelHolder.Week.add(newWeek);
																	return newWeek;
																})
	
									});
				});
				console.log(data);//allWeeksInMonth
				
				var	weekelyIncomeView = new  KuaminikaView({viewName:_viewName,
														    digestView:function(template)
																	   {
															   				$("#leftPart").html(template(data));
																			var loadAddWeekBtns= document.getElementsByClassName("loadAddWeekBtn");
																			$.each(loadAddWeekBtns,function(){
																				this.onclick=function()
																				{
																					loadAddFormForWeek(this.dataset.month_id);
																				};
																			});
		
															   				var weekList = document.getElementsByClassName("weeksInMonth");
															   				$.each(weekList,function()
															   				{ $.each(this.children,function(){
															   					this.onclick= function()
															   					{
															   							self.weekForm.truncateForm();
															   							self.weekForm.subject = ModelHolder.Week.map[this.dataset.id];
															   							self.weekForm.setHolder("topForm");
															   							self.weekForm.operation="update";
															   							self.weekForm.load();
															   							self.displayIncomesForWeek(this.dataset.id);
															   							
															   							loadAddIncomeFormForWeek(this.dataset.id);
															   							console.log("clicked on "+this.id);
															   					};});
															   		
															   				});
																		}
															}); 
				weekelyIncomeView.execute();
			});
		};
		
		
      
		self.init= function()
		{
			self.displayWeeklyIncomesForTrimester(CurrentInfo.trimester.id);
			
		};
		
	
};
