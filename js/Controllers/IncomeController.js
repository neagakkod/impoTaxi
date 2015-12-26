// JavaScript Document
var IncomeController = function(args){
		var self= this;
		
		var _viewName ="income";
		var _weekListViewName = "weekList";
		var _gridViewName ="incomeGrid"; 
		var _editViewName = "editIncome";
		var _editWeekName = "editWeek";
		
		var data ={} ;
		var wIncomeCreator = new ModelCreator("WeeklyIncome");
		var wCreator = new ModelCreator("Week");
		var wIncomeFinder = new ModelFinder(fetcher["Incomes"],"WeeklyIncome");

		
		
		
		self.weekListView =  new  KuaminikaView({viewName:_weekListViewName});
		self.gridView = new  KuaminikaGrid({gridID:"incomeTable",
											viewName:_gridViewName,
									     	gridHolderId:"income_viewFloor"
													});
		var loadAddIncomeFormForWeek = function(week_id)
		{
			self.incomeForm.subject=wIncomeCreator.createBlank();
			self.incomeForm.operation = "add";
			self.incomeForm.subject.week_id = week_id;
			self.incomeForm.load();
		};
		var loadAddFormForWeek = function(month_id)
		{
			self.weekForm.truncateForm();
			self.weekForm.subject = wCreator.createBlank(); 
			self.weekForm.subject.month_id= month_id;
			self.weekForm.operation = "add";
			self.weekForm.setHolder("income_viewFloor");
			self.weekForm.load();
		};
		

		self.weekForm = new TimeRangeForm({viewName:_editWeekName
											,subject:wCreator.createBlank()
				      						,addBtnProcedure:function()
											{
												ModelHolder["Week"].add(self.weekForm.subject);
												$.each(data.list,function()
												{
													if(this.month_id== self.weekForm.subject.month_id)
													{
														this.weeks.push(self.weekForm.subject);
													}
												});
												 self.weekListView.execute();
											},
											updateBtnProcedure:function()
											{
													ModelHolder["Week"].add(self.weekForm.subject);
												 self.weekListView.execute();

											},
											deleteBtnProcedure:function()
											{
												var idToRemove = self.weekForm.subject.id;
													$.get(fetcher.TimeRanges.deleteWeek+"/"+idToRemove,function(rslt){
																console.log(rslt);
																ModelHolder["Week"].remove(idToRemove);
																$.each(data.list,function()
																	{ 
																		if(this.month_id== self.weekForm.subject.month_id)
																		{
																			this.weeks = $.grep(this.weeks,function(n){
																				 	return n.id!==idToRemove;
																				 });
																		}
																	});
																self.displayWeeklyIncomesForTrimester(CurrentInfo.trimester.id);
			
															});
											}
										});
		self.incomeForm = new IncomeForm({viewName:_editViewName,
									holderId:"rightPart",
									subject:wIncomeCreator.createBlank(),
									subjectType:"WeeklyIncome",
									addBtnProcedure:function(weeklyIncome)
									{
										console.log(weeklyIncome);
										$.post(fetcher.Incomes.add,weeklyIncome,function(rslt){
											console.log(rslt);
											var week_id=self.incomeForm.subject.week_id;
											self.incomeForm.subject=wIncomeCreator.createBlank();
											
											self.displayIncomesForWeek(week_id);
											loadAddIncomeFormForWeek(week_id);
										});
									},
									updateBtnProcedure:function(weeklyIncome)
									{
											console.log(weeklyIncome);
										$.post(fetcher.Incomes.update,weeklyIncome,function(rslt){
											console.log(rslt);
											var week_id=self.incomeForm.subject.week_id;
											console.log(self.incomeForm);
											self.gridView.reload();
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
					
					ModelHolder["WeeklyIncome"].updateMapWithArray(incomes);
					self.gridView.data = incomes;
					self.gridView.loadElement = function()
											{
									     	  	var subject_id = this.id.split("_")[1];
									     	 	self.incomeForm.subject = ModelHolder["WeeklyIncome"].get(subject_id);
									     	 	self.incomeForm.operation = "update";
									     	 	self.incomeForm.load();
									     	 	self.gridView.markRowAsSelected(subject_id);
									     	  };
					self.gridView.actionBeforeDelete = function(id,gridDelete)
					{
							$.get(fetcher.Incomes.delete+id,function(rslt){
														
									gridDelete();
							});
					};
					self.gridView.load();
				
				});
		};
		
		
		self.displayWeeklyIncomesForTrimester= function(trimester_id)
		{
			 data={trimester_id:trimester_id,list:[]};
			
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
															   				
															   				self.weekListView.digestView=function(template)
																										 {
																										 	$("#weekListContainer").html(template(data));
																										 		//loading addweek btns
																												var addWeekBtns= document.getElementsByClassName("loadAddWeekBtn");
																												$.each(addWeekBtns,function(){
																													this.onclick=function()
																													{
																														loadAddFormForWeek(this.dataset.month_id);
																													};
																												});
																												
																										 	
																										 		
																										 		//activating week btns 
																										 		var weekListBtns = document.getElementsByClassName("weeksInMonth");
																								   				$.each(weekListBtns,function()
																								   				{ 
																								   					$.each(this.children,function()
																								   					{
																									   					this.onclick= function()
																									   					{
																									   							self.weekForm.truncateForm();
																									   							self.weekForm.subject = ModelHolder.Week.map[this.dataset.id];
																									   							self.weekForm.setHolder("topForm");
																									   							self.weekForm.operation="update";
																									   							self.weekForm.load();
																									   							
																									   							self.displayIncomesForWeek(this.dataset.id);
																									   							loadAddIncomeFormForWeek(this.dataset.id);
																									   							console.log("clicked on week:"+this.id);
																									   					};
																									   					
																									   				});
																								   				});
																										 };
																			 self.weekListView.execute();
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
