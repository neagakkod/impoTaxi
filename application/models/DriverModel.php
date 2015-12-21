<?php

class DriverModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
        }


		public function getById($id = FALSE)
		{
			if ($id === FALSE)
			{
				$query = $this->db->get('DriverView');
				return $query->result_array();
			}
			
			$query = $this->db->get_where('DriverView', array('id' => $id));
			
			return $query->row_array();
		}
		
		public function getByIdLight($id = FALSE)
		{
			$this->db->select('id');
			$this->db->select('first_name');
		
			if ($id === FALSE)
			{
			
				$query = $this->db->get('DriverView');
				return $query->result_array();
			}
				
			$query = $this->db->get_where('DriverView', array('id' => $id));
			
			return $query->row_array();
		}
	

}
?>