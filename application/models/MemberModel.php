<?php
require_once("IndividualModel.php");
class MemberModel extends IndividualModel {



        public function __construct()
        {
            $this->load->database();
        }


		private function getMaxId()
		{
			$this->db->select_max('id');
			$query = $this->db->get('OrgnMember');
			return $query->row_array()["id"];
		}
	
		
		
		public function get($id = FALSE)
		{
			if ($id === FALSE)
			{
					$query = $this->db->get('MemberView');
				return 0;
			}
			
			$query = $this->db->get_where('MemberView', array('id' => $id));
			
			return $query->row_array();
		}
		
		public function addMember($newMember)
		{
			 $new_id= $this->getMaxId()+1;
			
			 $new_individual_id=$this->addIndividual($newMember);
			 $data = array(
		        'id' => $new_id,
		        'individual_id' => $new_individual_id,
		        'organization_id' =>$newMember["organization_id"],
		        'profile_type'=>$newMember["profile_type"],
		        'user_id'=>$newMember["user_id"]
		    );
	
		    return $this->db->insert('OrgnMember', $data);
		}

}
?>