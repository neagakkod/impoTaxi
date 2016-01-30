<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CarExpenses extends MY_Controller 
{
	
	public function __construct()
    {
         parent::__construct();
         $this->load->model('Carexpensemodel');
    }
    
    public function index($id = FALSE)
	{
		$expenses=$this->Carexpensemodel->get_expense($id);
		$data['expenses'] = $expenses;
		echo json_encode($data['expenses'] );
	}
	
	public function getForTimeRange()
	{
		$timeRange=  $this->input->post();	
		
		$expenses=$this->Carexpensemodel->get_ExpenseForTimeRange($timeRange);
		$data['expenses'] = $expenses;
		
		echo json_encode($data['expenses'] );
	}
	
	
	public function getReportForTimeRange()
	{
		$this->load->helper('pdf_helper');
	    
	    $sumary = array("TPS"=>0,"TVQ"=>0,"Total"=>0,"amount"=>0);
	    $timeRange=  $this->input->post();		
	    $tpsRate= 0.05;
	    $tvqRate= 0.09975;
	   	$expenses=$this->Carexpensemodel->get_ExpenseForTimeRange($timeRange);
	
			
		foreach ($expenses as $key => $value)
		{
			$expenses[$key]["date"]=date("Y-m-d",  round($expenses[$key]["raw_date"]/1000));
			//number_format((float)$foo, 2, '.', '');
			$expenses[$key]["amount"] =number_format($expenses[$key]["amount"], 2, '.', '');
			$sumary["amount"]+=$expenses[$key]["amount"];
			
			$expenses[$key]["TPS"]  = number_format(round($expenses[$key]["amount"]*($tpsRate),2), 2, '.', '');
			$sumary["TPS"]+=$expenses[$key]["TPS"];
			
			$expenses[$key]["TVQ"]  = number_format(round(($expenses[$key]["amount"])*($tvqRate),2), 2, '.', '');
			$sumary["TVQ"]+=$expenses[$key]["TVQ"];
			// ($expenses[$key]["amount"]+$expenses[$key]["TPS"])*(0.09975);
			
			$expenses[$key]["Total"]=number_format(	$expenses[$key]["TPS"] +$expenses[$key]["TVQ"]+$expenses[$key]["amount"], 2, '.', '');
			$sumary["Total"]+=$expenses[$key]["Total"];
	
		}
				$data['expenses'] = $expenses;
				$data['sumary'] = $sumary;
	
	    $this->load->view('expense_report', $data);
	}
	
	
	
	public function update()
	{
		$expense = $this->input->post();	
		echo "received";
		print_r($expense);
		$this->Carexpensemodel->updateCarexpense($expense);
	}
	
	public function add()
	{
		$expense = $this->input->post();	
		echo "received";
		print_r($expense);
		$this->Carexpensemodel->addCarExpense($expense);
	}
	
	
	
	public function delete($id = FALSE)
	{
		$result["result"]= array("success"=>false,array("Deletion did not work "));
		
		if($this->Carexpensemodel->deleteCarExpense($id)>0)//	$this->Carexpensemodel->deleteCarExpense($id);
		{
			$result["result"]= array("success"=>true);
		}
		
		echo json_encode($result["result"]);
	}
}
?>