<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Incomes extends MY_Controller 
{
	
	public function __construct()
    {
         parent::__construct();
         $this->load->model('IncomeModel');
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
}
?>
