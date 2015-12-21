<?php

class IndividualModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
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

}
?>