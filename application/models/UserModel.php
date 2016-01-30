<?php

class UserModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
        }
	
		private function getMaxId()
		{
			$this->db->select_max('id');
			$query = $this->db->get('User');
			return $query->row_array()["id"];
		}
	
		private function getMaxSaltId()
		{
			$this->db->select_max('id');
			$query = $this->db->get('Salt');
			return $query->row_array()["id"];
		}
		
		public function getByOrganization($orgn_id)
		{
			if ($orgn_id === FALSE)
			{
				$query = $this->db->get('UserView');
				return $query->result_array();
			}
			$query = $this->db->get_where('UserView', array('organization_id' => $orgn_id));
			return $query->result_array();
		}


		public function add($newUser)
		{
			
			 $new_id= $this->getMaxId()+1;
			 $newSalt_id= $this->getMaxSaltId()+1;
			 $newSalt= $this->_create_salt();
			 $newUser["user_id"]=$new_id;
			 $data = array(
			 	"id"=>$new_id,
			 	"usr"=>$newUser["usr"],
			 	"pwd"=>sha1($newUser["pwd"]).$newSalt);
			 	
			 $saltData = array(
			 	"id"=>$newSalt_id,
			 	"usr_id"=>$new_id,
			 	"salt"=>$newSalt
			 	);
			  $this->db->insert('User', $data);	
			  $this->db->insert('Salt', $saltData);
			  return $new_id;
		}

		public function getById($id = FALSE)
		{

			if ($id === FALSE)
			{
				$query = $this->db->get('UserView');
				return $query->result_array();
			}
			
			$query = $this->db->get_where('UserView', array('id' => $user["id"]));
			return $query->result_array();
		}
		
	
		private function _create_salt()
		{
			$this->load->helper('string');
		   
		    return sha1(random_string('alnum', 32));
	
	//	$this->debugThis(random_string('alnum', 32));
		}
		
		
		public function debugThis($dME)
	{
		  
	    
				echo json_encode($dME );
	 		exit;
	}
}
?>