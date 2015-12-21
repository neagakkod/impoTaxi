<?php

class UserModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
        }



		public function getProfiles($user = FALSE)
		{

			if ($user === FALSE)
			{
				return 0;
			}
			
			$query = $this->db->get_where('UserProfilesView', array('id' => $user["id"]));

	
			$found_profiles=count($query->result_array())>0 ? $query->result_array()[0]:null;
		
			if(!isset($found_profiles))
			 return 0;
		
			return $found_profiles;
		}
		
	

}
?>