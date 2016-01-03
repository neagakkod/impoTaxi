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
	  //echo "im testing".$id;
	  //IncomeModel
	 // echo number_format(microtime(true)*1000,0,'.','');
	//  $this->load->model('Carexpensemodel');
	
	$inc= $this->load->model('IncomeModel');
	
	print_r($this->IncomeModel->getMonthLyIncomeSummary(11));
	  // $this->Carexpensemodel->deleteCarExpense($id);
	    /*  $size = mcrypt_get_iv_size(MCRYPT_CAST_256, MCRYPT_MODE_CFB);
    $iv = mcrypt_create_iv($size, MCRYPT_DEV_RANDOM);
    echo $iv;*/
	    /*$this->load->model('Carexpensemodel');
	     echo "Carexpensemodel loaded</br>";
	     $expense=$this->Carexpensemodel->get_expense(1);
	     
	     echo "got expense of id 1</br>";
	     
	     print_r($expense);
	     echo "</br>";
	      
	      echo "modifying expense</br>";
	     $expense["amount"]=800;
	     print_r($expense);
	     
	      echo "</br>";
	      echo "modified</br>";
	      
	      
	      $this->Carexpensemodel->addCarExpense($expense);
	      echo "inserted as new expense</br>";*/
	    
	}
}
?>