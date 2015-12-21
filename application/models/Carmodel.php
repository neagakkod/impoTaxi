<?php
class Carmodel extends CI_Model 
{
	
        public function __construct()
        {
            $this->load->database();
        }
        
        public function get_car($id = FALSE)
		{
			if ($id === FALSE)
			{
					$query = $this->db->get('Car');
					return $query->result_array();
			}
				$query = $this->db->get_where('Car', array('id' => $id));
				return $query->row_array();
		}
}
?>