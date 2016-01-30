<?php

defined('BASEPATH') OR exit('No direct script access allowed');
class HomePage extends MY_Controller 
{
	public function __construct()
    {
         parent::__construct();
        
    }
    
	public function index()
	{
			parent::_some_shared_method();
	  $this->load->view('impoTaxi');
	  
	}
	
//	private function calculateTPS
	public function pdf()
	{
		$this->load->model('Carexpensemodel');
	    $this->load->helper('pdf_helper');
	    
	     $data=array("cssPath"=>"");
	     
	     $sumary = array("TPS"=>0,"TVQ"=>0,"Total"=>0,"amount"=>0);
	     	
	     
	   	$expenses=$this->Carexpensemodel->get_expense();
	
			
			 foreach ($expenses as $key => $value)
			{
				$expenses[$key]["date"]=date("Y-m-d",  round($expenses[$key]["raw_date"]/1000));
				//number_format((float)$foo, 2, '.', '');
				$expenses[$key]["amount"] =number_format($expenses[$key]["amount"], 2, '.', '');
				$sumary["amount"]+=$expenses[$key]["amount"];
				
				$expenses[$key]["TPS"]  = number_format(round($expenses[$key]["amount"]*(0.05),2), 2, '.', '');
				$sumary["TPS"]+=$expenses[$key]["TPS"];
				
				$expenses[$key]["TVQ"]  = number_format(round(($expenses[$key]["amount"])*(0.09975),2), 2, '.', '');
				$sumary["TVQ"]+=$expenses[$key]["TVQ"];
				// ($expenses[$key]["amount"]+$expenses[$key]["TPS"])*(0.09975);
				
				$expenses[$key]["Total"]=number_format(	$expenses[$key]["TPS"] +$expenses[$key]["TVQ"]+$expenses[$key]["amount"], 2, '.', '');
				$sumary["Total"]+=$expenses[$key]["Total"];
			//	print_r($sumary);
				
			//	echo "<br>";
			}
				$data['expenses'] = $expenses;
				$data['sumary'] = $sumary;
		//	print_r($expenses);
	    $this->load->view('expense_report', $data);
	
	}
	public function test($id = false)
	{
		 
	 	  $this->load->view('UserForm');
	}
	
	
	public function incomeReport()
	{
		$this->load->helper('pdf_helper');
		$this->load->library('contributionReportMap');
		$inc= $this->load->model('IncomeModel');
		$tpsRate= 0.05;
	    $tvqRate= 0.09975;
		$l= array(7,8,9);//array(10,11,12);
	
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
	public function log($msg)
	{
		if(is_string($msg))
		echo $msg;
		else
		print_r($msg);
		
		echo "<br/>";
	}
	public function debugThis($dME)
	{
		  
	    
				echo json_encode($dME );
	 		exit;
	}
}
?>