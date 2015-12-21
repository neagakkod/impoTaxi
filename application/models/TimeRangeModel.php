<?php

class TimeRangeModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
        }

		private function getMaxId()
		{
			$this->db->select_max('id');
			$query = $this->db->get('Week');
			return $query->row_array()["id"];
		}
		
		
		public function get_year($id = FALSE)
		{
			if ($id === FALSE)
			{
					$query = $this->db->get('Year');
					return $query->result_array();
			}
				$query = $this->db->get_where('Year', array('id' => $id));
				return $query->row_array();
		}
		
		public function get_month($id = FALSE)
		{
			if ($id === FALSE)
			{
					$query = $this->db->get('Month');
					return $query->result_array();
			}
				$query = $this->db->get_where('Month', array('id' => $id));
				return $query->row_array();
		}
		
		
		public function get_week($id = FALSE)
		{
			if ($id === FALSE)
			{
					$query = $this->db->get('Week');
					return $query->result_array();
			}
			
			$query = $this->db->get_where('Week', array('id' => $id));
			
			return $query->row_array();
		}

		public function get_weeks_in_month($month_id = FALSE)
		{
				if ($month_id === FALSE)
			{
					return [];
			}
			$query = $this->db->get_where('Week', array('month_id' => $month_id));
			
			return $query->result_array();
		}
		
		
		public function addWeek($week)
		{
			 	$new_id= $this->getMaxId()+1;
		   
		    $data = array(
		        'id' => $new_id,
		        'raw_date_start' => $week["raw_date_start"],
		        'raw_date_end' =>$week["raw_date_end"],
		        'month_id'=>$week["month_id"],
		        'year_id'=>$week["year_id"],
		        'organization_id'=>1//$week["organization_id"]
		    );
	
		    return $this->db->insert('Week', $data);
		}
		
		public function updateWeek($week)
		{
			
		   
		    $data = array(
		        'raw_date_start' => $week["raw_date_start"],
		        'raw_date_end' =>$week["raw_date_end"],
		        'month_id'=>$week["month_id"],
		        'year_id'=>$week["year_id"],
		        'organization_id'=>1//$week["organization_id"]
		    );
	
			$this->db->where('id', $week["id"]);
			$this->db->update('Week', $data); 
		}
}
?>