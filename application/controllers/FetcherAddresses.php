<?php

defined('BASEPATH') OR exit('No direct script access allowed');
class FetcherAddresses extends CI_Controller 
{
	public function __construct()
    {
         parent::__construct();
       //  $this->load->helper('url');
    }
    
	public function index()
	{
	//	$base_url = base_url();
		$data['FetcherAddresses'] = array("CarExpenses"=>array("getAll"=>"index.php/CarExpenses/",
															   "add"=>"index.php/CarExpenses/add",
															   "delete"=>"index.php/CarExpenses/delete/",
															   "update"=>"index.php/CarExpenses/update"
															),
											"Cars" =>array("getAll"=>"index.php/Cars/"),
											"Login"=>array("authenticate"=>"index.php/Login/authenticate",
														   "getUserInfo"=>"index.php/Login/getUserInfo",
														   "logout"=>"index.php/Login/logout"),
											"TimeRanges"=>array("allYears"=>"index.php/TimeRanges/getAllYears",
																"allWeeks"=>"index.php/TimeRanges/getAllWeeks",
																"allWeeksInMonth"=>"index.php/TimeRanges/getAllWeeksInMonth",
																"allWeeksInTrimester"=>"index.php/TimeRanges/getAllWeeksInTrimester",
																"addWeek"=>"index.php/TimeRanges/addWeek",
																"updateWeek"=>"index.php/TimeRanges/updateWeek"),
											"Incomes"=>array("yearSummary"=>"",
															 "monthSummary"=>"index.php/Incomes/monthIncomeSummary/",
															 "weeklyIncome"=>"index.php/Incomes/incomesInWeek/",
															 "add"=>"index.php/Incomes/addWeeklyIncome/"),
											"Drivers"=>array("full"=>"index.php/drivers/get/",
															 "light"=>"index.php/drivers/getLight/"));
	 //echo base_url();
	 	echo json_encode($data['FetcherAddresses']);
	}
	
}
?>