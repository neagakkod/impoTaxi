<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CarExpenses extends CI_Controller 
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