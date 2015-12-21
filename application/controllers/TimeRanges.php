<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TimeRanges extends CI_Controller 
{
	private $trimesterGrid;
	
	public function __construct()
    {
         parent::__construct();
         
         $this->trimesterGrid = array("1"=>array(1,2,3),
         							  "2"=>array(4,5,6),
         							  "3"=>array(7,8,9),
         							  "4"=>array(10,11,12));
         $this->load->model('TimeRangeModel');
         $this->load->model('IncomeModel');
    }
    
    public function getAllYears($id = FALSE)
	{
		$years=$this->TimeRangeModel->get_year();
		$data['years'] = $years;
		echo json_encode($data['years'] );
	}
	
	public function getAllWeeks($id = FALSE)
	{
		$weeks=$this->TimeRangeModel->get_week($id);
	/*	foreach ($weeks as $week) {
		    $week["income"]=
		}*/
			
		$data['weeks'] = $weeks;
		
		echo json_encode($data['weeks'] );
	}
	
	public function getAllWeeksInMonth($mont_id = FALSE)
	{
		$weeks=$this->TimeRangeModel->get_weeks_in_month($mont_id);
		$data['weeks'] = $weeks;
		echo json_encode($data['weeks'] );
	}
	
	public function getAllWeeksInTrimester($trimester_id = FALSE)
	{
			$monthList = array();
		if($trimester_id)
		{
			$montIDhList = $this->trimesterGrid[$trimester_id];
		
			for ($i=0; $i<count($montIDhList) ;$i++) 
			{
				$monthList[$i] = array("month_id"=>$montIDhList[$i],
			 						   "weeks"=>$this->TimeRangeModel->get_weeks_in_month($montIDhList[$i]));
			}
		
		
		}
			$data['weeksInMonths'] = $monthList;
			echo json_encode($data['weeksInMonths'] );
	}
	
	public function addWeek()
	{
			$newWeek = $this->input->post();	
		echo "received";
		print_r($newWeek);
		$this->TimeRangeModel->addWeek($newWeek);
	}
	
	
	public function updateWeek()
	{
		$updatedWeek = $this->input->post();	
		echo "received";
		print_r($updatedWeek);
		$this->TimeRangeModel->updateWeek($updatedWeek);
	}
}
?>