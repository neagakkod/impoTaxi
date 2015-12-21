<?php
/**
 *  File: /application/core/MY_Controller.php
 */
class MY_Controller extends CI_Controller 
{

	

	private function get_current_url() {

	
	    return 'http'. (($_SERVER['SERVER_PORT'] == '443') ? 's' : '')
	        .'://'. $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	}
    /**
     * Prefix with an underscore if you don't want it
     * publicly available through URI-routing
     */
    public function _some_shared_method()
    {
    
        // some common operation here
        try
        {  
           
           if(!$this->session->userdata('logged_in'))
		   {
		    	throw new Exception('Division by zero.');
		   }
        }
        catch (Exception $e) 
        {
        //	echo $e->getMessage();
        	$this->session->set_userdata('targetBeforeLogin', $this->get_current_url() );
        	 $this->load->view('login');
        	
        }
	
    }

}