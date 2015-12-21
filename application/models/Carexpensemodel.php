<?php
include("Expensemodel.php");
class CarExpenseModel extends ExpenseModel 
{
	 function __construct() {
        parent::__construct();
    }
   
   public function get_Expense($id = FALSE)
	{
		if ($id === FALSE)
		{
				$query = $this->db->get('CarExpenseView');
				return $query->result_array();
		}
			$query = $this->db->get_where('CarExpenseView', array('id' => $id));
			return $query->row_array();
	}
	
	private function getMaxId()
	{
		$this->db->select_max('id');
		$query = $this->db->get('CarExpense');
		return $query->row_array()["id"];
	}

	public function addCarExpense($expense)
	{
	   $new_expense_id=$this->add_expense($expense);
	   	
	   	$new_id= $this->getMaxId()+1;
	   
	    $data = array(
	        'id' => $new_id,
	        'car_id' => $expense["car"]["id"],
	        'expense_id' => $new_expense_id
	    );
	
	    return $this->db->insert('CarExpense', $data);
	}
	
	
	public function updateCarexpense($expense)
	{
		$data = array(
               'expense_id' => $expense["id"],
               'car_id' => $expense["car"]["id"]
            );
       
		$this->db->where('expense_id', $expense["id"]);
		$this->db->update('CarExpense', $data); 
		$this->updateExpense($expense);
	}

	
	public function deleteCarExpense($id)
	{
		   $this->db->delete('CarExpense', array('expense_id' => $id));
		   
		if($this->db->affected_rows()>0)
		   return $this->deleteExpense($id);
		  
		  return 0;
	}
}

/*
 $data = array(
        'title' => $this->input->post('title'),
        'slug' => $slug,
        'text' => $this->input->post('text')
    );

    return $this->db->insert('news', $data);

*/
?>

