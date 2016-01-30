<?php 
class MonthNames
{
	var $language_id;
	var $monthList;
	
	public function MonthNames($language_id)
	{
		$this->language_id=$language_id;		
		$this->monthList = array(1=>array(1=>"January"
										 ,2=>"Janvier")
								,2=>array(1=>"February"
										 ,2=>"Fevrier")
								,3=>array(1=>"March"
										 ,2=>"Mars")
								,4=>array(1=>"April"
										 ,2=>"Avril")
								,5=>array(1=>"May"
										 ,2=>"Mai")
								,6=>array(1=>"June"
										 ,2=>"Juin")
								,7=>array(1=>"July"
										 ,2=>"Juillet")
								,8=>array(1=>"August"
										 ,2=>"Aout")
								,9=>array(1=>"September"
										 ,2=>"Septembre")
								,10=>array(1=>"October"
										 ,2=>"Octobre")
								,11=>array(1=>"November"
										 ,2=>"Novembre")
								,12=>array(1=>"December"
										 ,2=>"Decembre"));
		
	}
	
	public function getMonthAt($month_id)
	{
		return $this->monthList[$month_id][$this->language_id];
	}
}


?>