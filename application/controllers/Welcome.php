<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends MY_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	 
	public function __construct()
    {
         parent::__construct();
       
       
         //$this->load->model('Expensemodel');
         $this->load->model('Carexpensemodel');
    }
	public function index()
	{
		parent::_some_shared_method();
		//$this->load->view('welcome_message');
	//	$expenses= $this->Expensemodel->get_expense();
		
	$expenses=$this->Carexpensemodel->get_expense();
		
		  $data['expenses'] = $expenses;
				echo json_encode($data['expenses'] );
	//	echo $this->Expensemodel->get();
	}
}
