<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	 <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap-datetimepicker.css" rel="stylesheet">

     <link href="css/impoTaxi.css" rel="stylesheet">
	<title>
		IMPOTAXI
	</title>
</head>
<body>
	<!-- Navigation -->
	<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
		<div id="expenseIncomeToggler" class="menu-bar btn-group pull-left" role="group" aria-label="...">
			  <!-- <a type="button" class="btn btn-default">Left</a> -->
			  <a  type="button" data-option="expense" class="btn btn-default active"> EXPENSES</a>
			  <a  type="button" data-option="income" class="btn btn-default">INCOMES</a>
		</div>
		
		<div id="yearDropdown" class="dropdown menu-bar pull-left" style="margin-bottom: 0">
		  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    <span  > Year:2016 </span>
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
		    <li  data-chosenvalue="2015" data-chosendisplay="2015"><a  href="#">2015</a></li>
		    <li  data-chosenvalue="2016" data-chosendisplay="2016"><a   href="#">2016</a></li>
		  </ul>
		</div>
		
		
		<div id="trimesterDropdown" class="dropdown menu-bar pull-left" style="margin-bottom: 0">
		  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    <span  >Trimester: Oct, Nov, Dec</span>
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
		    <li data-chosenvalue="1" data-chosendisplay="Jan, Feb, Mar"><a  href="#">Jan, Feb, Mar</a></li>
		    <li data-chosenvalue="2" data-chosendisplay="Apr, May, Jun" ><a href="#">Apr, May, Jun</a></li>
		    <li data-chosenvalue="3" data-chosendisplay="Jul, Aou, Sept"><a  href="#">Jul, Aou, Sept</a></li>
		    <li data-chosenvalue="4" data-chosendisplay="Oct, Nov, Dec"><a  href="#">Oct, Nov, Dec</a></li>
		  </ul>
		</div>
		
		<div class="menu-bar btn-group pull-right" role="group" aria-label="...">
			  <!-- <a type="button" class="btn btn-default">Left</a> -->
			  <a id="usrDisplay" type="button" class="btn btn-default "></a>
			  <a id="logOutBtn" type="button"  class="btn btn-default"><span class="glyphicon glyphicon-off"></span></a>
		</div>
	</nav>
		
	<div id="wrapper" class="col-md-11">
		<div id="middleMenu" class="row">
			 <div class="col-md-offset-9">
			 	<button id = "launchAddSubject"  type="button" class="btn btn-success"><span class="glyphicon glyphicon-plus "></span> AJOUTER </button> 
			 	<button id = "launchRptBtn"  type="button" class="btn btn-primary"><span class="glyphicon glyphicon-file"></span> RAPPORT</button>
			 </div>
			 <hr></hr>
		</div>
		<div id="centerStage" class="row">
			
		</div>
		<div id="modalStage" class="modal " style="display: none;width:50%;margin:2% auto "></div>
	<!--	<div id="leftPart" class="col-md-8">
		
		</div>	
		<div id="rightPart" class="col-md-4">
			
		</div>-->
	</div>
	<div id="sideMenu" class="col-md-1">
		
			<div><h2 class="add">Place for btns!</h2></div>
	</div>

	
    
  
 	<!-- jQuery -->
    <script src="js/plugins/jquery-2.1.4.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/plugins/bootstrap/bootstrap.min.js"></script>
 	<!-- moment.js JavaScript -->
    <script src="js/plugins/moment.js"></script>
    <!-- numeral.js JavaScript -->
    <script src="js/plugins/numeral.js"></script>
    <!-- datetimepicker JavaScript -->
    <script type="text/javascript" src="js/plugins/bootstrap-datetimepicker.js"></script>

    
	 <!-- DataTables JavaScript -->
    <script src="js/plugins/jquery.dataTables.js"></script>
    
    <!-- handlebars JavaScript -->
    <script src="js/plugins/handlebars-v4.0.4.js"></script>
   
   
    <!-- Utilities -->
    <script src="js/utilities/PrototypeAdditions.js"></script>
    <script src="js/utilities/KuaminikaView.js"></script>
    <script src="js/utilities/KuaminikaGrid.js"></script>
    <script src="js/utilities/Fetcher.js"></script>
    <script src="js/utilities/FormUtilities.js"></script>
    <script src="js/utilities/KuaminikaForm.js"></script>
    <script src="js/utilities/TimeRangeForm.js"></script>
    <script src="js/utilities/IncomeForm.js"></script>
    <script src="js/utilities/ExpenseForm.js"></script>
    <script src="js/utilities/HBHelpers.js"></script>

    <!-- Models -->
    <script src="js/utilities/ModelUtilities.js"></script>
	<script src="js/Models/TaxAndInsurance.js"></script>
    <script src="js/Models/Merchant.js"></script>
    <script src="js/Models/Car.js"></script>
	<script src="js/Models/Expense.js"></script>
	<script src="js/Models/Individuals.js"></script>
	<script src="js/Models/Income.js"></script>
	<script src="js/Models/TimeRanges.js"></script>
	<script src="js/Models/User.js"></script>
	
	<!-- controllers -->
	<script src="js/Controllers/IncomeController.js"></script>
    <script src="js/Controllers/ExpenseController.js"></script>
    <script src="js/Controllers/MenuBarController.js"></script>
    
    
    <!-- app -->
    <script src="js/impoTaxi.js"></script>
   <!-- <script src="js/Tests.js"></script>-->
    

    
</body>
</html>