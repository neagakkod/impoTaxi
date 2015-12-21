<?php

class IncomeModel extends CI_Model {



        public function __construct()
        {
            $this->load->database();
        }

		private function getMaxId()
		{
			$this->db->select_max('id');
			$query = $this->db->get('WeeklyIncome');
			return $query->row_array()["id"];
		}
		
		public function getById($id = FALSE)
		{
			if ($id === FALSE)
			{
				$query = $this->db->get('WeeklyIncome');
				return 0;
			}
			
			$query = $this->db->get_where('WeeklyIncome', array('id' => $id));
			
			return $query->row_array();
		}
		
		public function getMonthlyIncomeSummary($month_id)
		{
			$this->db->select_sum('cho_empl');
			$this->db->select_sum('cho_prop');
			$this->db->select_sum('grossTotal');
			$this->db->select_sum('netTotal');
			$this->db->where('month_id', $month_id);
			
			$query = $this->db->get('HeavyWeeklyIncomeView_Full');
		
				return $query->row_array();
		}
		public function getYearlyIncomeSummary($year_id)
		{
			$this->db->select_sum('cho_empl');
			$this->db->select_sum('cho_prop');
			$this->db->select_sum('grossTotal');
			$this->db->select_sum('netTotal');
			$this->db->where('year_id', $year_id);
			
			$query = $this->db->get('HeavyWeeklyIncomeView_Full');
		
				return $query->row_array();
		}
		public function getIncomesInWeek($week_id = FALSE)
		{
			if ($week_id === FALSE)
			{
				$query = $this->db->get('WeeklyIncome');
				return 0;
			}
			
			$query = $this->db->get_where('WeeklyIncome', array('week_id' => $week_id));
			
			return $query->result_array();
		}
		
		public function addWeeklyIncome($income)
		{
		    //$new_expense_id=$this->add_expense($expense);
		   	
		   	$new_id= $this->getMaxId()+1;
		   
		    $data = array(
		        'id' => $new_id,
		        'grossTotal' => $income["grossTotal"],
		        'provider_id' =>$income["driver"]["id"],
		        'driver_status_id'=>$income["driverStatus"]["id"],
		        'days'=>$income["days"],
		        'week_id'=>$income["week_id"],
		        'denormalized_provider_name'=>$income["driver"]["first_name"],
		        'organization_id'=>1
		    );
	
		    return $this->db->insert('WeeklyIncome', $data);
		}

}
?>