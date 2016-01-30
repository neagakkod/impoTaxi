<?php

class IndividualModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
        }


		private function getMaxId()
		{
			$this->db->select_max('id');
			$query = $this->db->get('Individual');
			return $query->row_array()["id"];
		}
	
		
		
		public function get($id = FALSE)
		{
			if ($id === FALSE)
			{
					$query = $this->db->get('Individual');
				return 0;
			}
			
			$query = $this->db->get_where('Individual', array('id' => $id));
			
			return $query->row_array();
		}
		
		public function addIndividual($newIndividual)
		{
			 $new_id= $this->getMaxId()+1;
			 $data = array(
		        'id' => $new_id,
		        'first_name' => $newIndividual["first_name"],
		        'last_name' =>$newIndividual["last_name"],
		        'email'=>$newIndividual["email"],
		        'phone'=>$newIndividual["phone"],
		        'organization_id'=>$newIndividual["organization_id"]
		    );
	
		     $this->db->insert('Individual', $data);
		     
		     return $new_id;
		}

}
?>