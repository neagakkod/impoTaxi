var UserController = function()
{
	var self= this;
	var _addUserViewName = "AddUserForm";
	var mainContainer_id = "centerStage";
	var userGridName = "allUsersGrid";
	var userGridId ="userTable";
	
	var userCreator = new ModelCreator("User");

	var addUserForm = new UserForm({
								viewName:_addUserViewName,
								form_id:"",
								holderId:mainContainer_id,
								operation:"add",
								subjectType:"User",
								addBtnProcedure:function(newUser)
								{
									console.log(newUser);
									$.post(fetcher.Users.add,newUser,function(rslt){
										console.log(rslt);
									
									});
								}
							});
							
							
	var allUsersGrid = new  KuaminikaGrid({gridID:"userGridId",
											viewName:userGridName,
									     	gridHolderId:mainContainer_id//"leftPart"
													}); 
	var activateTopMenu = function()
	{
		var launchAddSubject = document.getElementById("launchAddSubject");
	
		var launchRptBtn = document.getElementById("launchRptBtn");
			launchRptBtn.style.display="none";
	
		launchAddSubject.onclick = function()
		{
			self.loadAddUserForm();	
		};
	};
	
	
							
	self.loadAddUserForm= function()
	{
		addUserForm.subject=userCreator.createBlank();
		addUserForm.operation = "add";
		addUserForm.load();
	};
	
	
	self.loadAllUsersGrid = function()
	{
		$.get(fetcher.Users.getById,function(rawUsers)
		{
			rawUsers= JSON.parse(rawUsers);
			var addedUser ;
		  	allUsersGrid.data=$.map(rawUsers,function(rawUser)
			{
				 addedUser= new User(rawUser);
					ModelHolder.User.add(addedUser);
					return addedUser;
			});
		
		
			allUsersGrid.load();
		});
	};
	
	self.init=function()
	{
		activateTopMenu();
		self.loadAllUsersGrid();
	};
};
