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