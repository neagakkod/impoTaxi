<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends MY_Controller {

 	public function __construct()
    {
         parent::__construct();
         $this->load->model('LoginModel');
    }

	public function getUserInfo()
	{
		echo json_encode($this->session->userdata('logged_in')); 
	}
	public function authenticate()
	{
	
	    $credentials = $_POST;
	    
	    // if I had not used post tags.. this would have been the way to do it 
	    // json_decode(file_get_contents('php://input'), TRUE);
	    
	     $authResult=$this->LoginModel->autenticate($credentials);
	 //	echo $this->session->userdata('targetBeforeLogin');

	     if(isset($authResult["usr"]))
	      { 
	      	$this->session->set_userdata('logged_in', $authResult );
	      }
	      
		$result = array("loggedIn"=>isset($authResult["usr"]),
						"userInfo"=>$this->session->userdata('logged_in'),
						"targetBeforeLogin"=>$this->session->userdata('targetBeforeLogin'));
						
		echo json_encode($result);
	}
	
	public function logout()
	{  	
		$this->load->helper('url');
		$this->session->unset_userdata('logged_in');
		//$f=;
		$result = array("loggedIn"=>false);
		echo json_encode($result);
	//	$this->load->view('login');
	}
	public function index()
	{
		$this->load->view('Login/index');
	}
	
	
	
	
}
