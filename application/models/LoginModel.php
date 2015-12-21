<?php

class LoginModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
        }



		public function autenticate($credentials = FALSE)
		{

			if ($credentials === FALSE)
			{
				return 0;
			}
			
			$query = $this->db->get_where('User', array('usr' => $credentials["username"]));

	
			$found_usr=count($query->result_array())>0 ? $query->result_array()[0]:null;
		
			if(!isset($found_usr))
			 return 0;
			$query = $this->db->get_where('Salt', array('usr_id' => $found_usr["id"]));
			$found_salt= $query->result_array()[0];
		
			if (sha1($credentials["password"])+$found_salt["salt"]==$found_usr["pwd"])
			{	
				$query = $this->db->get_where('User', array('id' => $found_usr["id"]));
				$userInfo=count($query->result_array())>0 ? $query->result_array()[0]:null;
			
				return $userInfo;
			}
			else 
				return 0;
		}
		
	

}
?>