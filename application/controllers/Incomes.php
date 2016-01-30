<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Incomes extends MY_Controller 
{
	
	public function __construct()
    {
         parent::__construct();
         $this->load->model('IncomeModel');
          $this->trimesterGrid = array("1"=>array(1,2,3),
         							  "2"=>array(4,5,6),
         							  "3"=>array(7,8,9),
         							  "4"=>array(10,11,12));
    }
    
    public function monthIncomeSummary($month_id = FALSE)
	{
		$monthlyIncome=$this->IncomeModel->getMonthlyIncomeSummary($month_id);
		$data['monthlyIncome'] = $monthlyIncome;
		echo json_encode($data['monthlyIncome'] );
	}
	
	public function yearlyIncomeSummary($year_id = FALSE)
	{
		$weeks=$this->IncomeModel->getYearlyIncomeSummary($year_id);
		$data['yearlyIncome'] = $weeks;
		echo json_encode($data['yearlyIncome'] );
	}
	
	public function incomesInWeek($week_id = FALSE)
	{
		$weekIncomes=$this->IncomeModel->getIncomesInWeek($week_id);
		$data['weekIncomes'] = $weekIncomes;
		echo json_encode($data['weekIncomes'] );
	}
	
	public function addWeeklyIncome()
	{
			$income = $this->input->post();	
		echo "received";
		print_r($income);
		$this->IncomeModel->addWeeklyIncome($income);
	}
	
	public function updateWeeklyIncome()
	{
			$income = $this->input->post();	
		echo "received";
		print_r($income);
		$this->IncomeModel->updateWeeklyIncome($income);
	}

	public function deleteWeeklyIncomeBYId($id = FALSE)
	{
		return $this->IncomeModel->deleteIncomeById($id);
	}

	public function getReportForTimeRange()
	{
			$this->load->helper('pdf_helper');
		$this->load->library('contributionReportMap');
		$inc= $this->load->model('IncomeModel');
		$tpsRate= 0.05;
	    $tvqRate= 0.09975;
	    
	     $timeRange=  $this->input->post();
		$l= explode(",",$timeRange["month_ids"]); 
	 	$incomes=$this->IncomeModel->getIncomeReportForTimeRange($l);
	
		 $currentContributionMapKey="";
		 
	 	 foreach ($incomes as $key => $value)
	 	 {
	 	
	 	 	$currentContributionMapKey= $incomes[$key]["year_id"]."".$incomes[$key]["month_id"]."".$incomes[$key]["provider_id"];
	 	 	$this->contributionreportmap->addAToDrviverContrbution( $incomes[$key]["grossTotal"]
	 	 									,$incomes[$key]["month_id"]
	 	 									,$incomes[$key]["days"]
	 	 									,array("id"=>$incomes[$key]["provider_id"],"name"=>$incomes[$key]["provider_name"])
	 	 									, $incomes[$key]["year_id"]
	 	 									,date("d M",  round($incomes[$key]["raw_date_start"]/1000))
	 	 									,date("d M",  round($incomes[$key]["raw_date_end"]/1000)));
	 
	 	 }
	 	 $this->contributionreportmap->loadMonthMap();
	 	 $spanInfo= array();
	 	 foreach ($this->contributionreportmap->monthMap as $key => $value)
	 	 {
	 	 	 $detailtSetArr=$this->contributionreportmap->monthMap[$key]->provisionDetail;
	 	     $spanInfo[$key]=count($detailtSetArr)+1;
	 	 
	 	 	foreach($detailtSetArr as $dt)
	 	 	{
	 	 		$innerDetailtSetArr=$dt->provisionDetail;
	 			$spanInfo[$key."_".$dt->provider["name"]]=count($innerDetailtSetArr)+1;
	 	 		$spanInfo[$key]+=count($innerDetailtSetArr);
	 	 	}
	 	 }
		
		$data=array("spanInfo"=> $spanInfo
				   ,"tpsRate"=>$tpsRate
				   ,"tvqRate"=>$tvqRate
					);
		  $this->load->view('income_report', $data);
	}
		public function debugThis($dME)
	{
		  
	    
				echo json_encode($dME );
	 		exit;
	}

}
?>
