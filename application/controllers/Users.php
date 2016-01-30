<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends MY_Controller
{
	public function __construct()
    {
         parent::__construct();
         $this->load->model('UserModel');
         $this->load->model('MemberModel');
    }
    
    
	private function getMaxId()
	{
		$this->db->select_max('id');
		$query = $this->db->get('User');
		return $query->row_array()["id"];
	}
	
    public function getByOrganization($orgn_id=FALSE)
    {
    
    	echo json_encode($this->UserModel->getByOrganization($orgn_id));

    }
    
    
    public function add()
    {
    	$newUser = $this->input->post();	
    	$newUserId = $this->UserModel->add($newUser);
    	$newUser["memberAccount"]["user_id"]=$newUserId;
    	$this->MemberModel->addMember($newUser["memberAccount"]);
    }
    
    public function getById($id=FALSE)
    {
    
    	echo json_encode($this->UserModel->getById($id));
    }

	
		
    public function debugThis($dME)
	{
				echo json_encode($dME );
	 		exit;
	}
    
}

?>