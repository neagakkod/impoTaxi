<?php
class ExpenseModel extends CI_Model 
{
	
    public function __construct()
    {
        $this->load->database();
    }
    
    public function get_Expense($id = FALSE)
	{
		if ($id === FALSE)
		{
				$query = $this->db->get('Expense');
				return $query->result_array();
		}
			$query = $this->db->get_where('Expense', array('id' => $id));
			return $query->row_array();
	}
	
	private function getMaxId()
	{
		$this->db->select_max('id');
		$query = $this->db->get('Expense');
		return $query->row_array()["id"];
	}
	
	protected function updateExpense($expense)
	{
	 	$data = array(
	        'amount' => $expense["amount"],
	        'raw_date' => $expense["raw_date"],
	        'reason' =>  $expense["reason"],
	        'merchant_id' => $expense["merchant_id"]
	    );
	    print_r($expense);
		$this->db->where('id', $expense["id"]);
		$this->db->update('Expense', $data); 
		
	}
	
	protected function add_expense($expense)
	{
	    $new_id= $this->getMaxId()+1;
	
	    $data = array(
	        'id' => $new_id,
	        'amount' => $expense["amount"],
	        'raw_date' => $expense["raw_date"],
	        'reason' =>  $expense["reason"],
	        'merchant_id' => $expense["merchant_id"]
	    );
	
    	 $this->db->insert('Expense', $data);
	    return $new_id;
	}
	
	protected function deleteExpense($id)
	{
	
		$this->db->delete('ExpenseTax', array('expense_id' => $id)); 
		$this->db->delete('Expense', array('id' => $id)); 
		return $this->db->affected_rows();
	}
    
}
?>