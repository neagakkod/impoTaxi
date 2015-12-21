<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Drivers extends MY_Controller 
{
	
	public function __construct()
    {
         parent::__construct();
         $this->load->model('DriverModel');
    }
    
    public function get($id = FALSE)
	{
		$drivers=$this->DriverModel->getById($id);
		$data['drivers'] = $drivers;
		echo json_encode($data['drivers'] );
	}
	
	public function getLight($id = FALSE)
	{
		$drivers=$this->DriverModel->getByIdLight($id);
		$data['drivers'] = $drivers;
		echo json_encode($data['drivers'] );
	}
	
}
?>
