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
		
	
		public function isAddableToPreExisting($income)
		{
			$query = $this->db->get_where('WeeklyIncome', array('week_id' => $income["week_id"],
																	'provider_id'=>$income["driver"]["id"]));
																	
			$preExistingContentArr= $query->result_array();
			$result= count($preExistingContentArr)>0;
			
			if($result)
			{
				$preExistingContent = $preExistingContentArr[0];
				$income["id"]=$preExistingContent["id"];
				$income["grossTotal"] += $preExistingContent["grossTotal"];
				$income["days"] += $preExistingContent["days"];
				$this->updateWeeklyIncome($income);
			}
			
			return $result;
		}
		
		public function addWeeklyIncome($income)
		{
		    //$new_expense_id=$this->add_expense($expense);
		   	
		   	$new_id= $this->getMaxId()+1;
		   
		   if($this->isAddableToPreExisting($income))
		   	return 1;
		    
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
		
		
		public function updateWeeklyIncome($income)
		{
		    //$new_expense_id=$this->add_expense($expense);
		   	
		   //	$new_id= $this->getMaxId()+1;
		   echo "bout to update like this:";
		   print_r($income);
		    $data = array(
		       
		        'grossTotal' => $income["grossTotal"],
		        'provider_id' =>$income["driver"]["id"],
		        'driver_status_id'=>$income["driverStatus"]["id"],
		        'days'=>$income["days"],
		        'week_id'=>$income["week_id"],
		        'denormalized_provider_name'=>$income["driver"]["first_name"],
		        'organization_id'=>1
		    );
	
		   
			$this->db->where('id', $income["id"]);
		    $this->db->update('WeeklyIncome', $data); 
		}
		
		public function deleteIncomeById($id)
		{
		   $this->db->delete('WeeklyIncome', array('id' => $id));
		   	return ($this->db->affected_rows()>0);
		}
		
		public function deleteIncomesForWeek($week_id)
		{
		   $this->db->delete('WeeklyIncome', array('week_id' => $week_id));
		   	return ($this->db->affected_rows()>0);
		}

}
?>