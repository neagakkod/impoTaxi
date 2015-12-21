<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cars extends CI_Controller 
{
	
	public function __construct()
    {
         parent::__construct();
         $this->load->model('Carmodel');
    }
    
    public function index($id = FALSE)
	{
		$expenses=$this->Carmodel->get_car($id);
		$data['cars'] = $expenses;
		echo json_encode($data['cars'] );
	}
}
?>