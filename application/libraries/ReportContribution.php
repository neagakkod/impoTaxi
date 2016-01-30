<?php
/*
contribution for the month per provider
*/
class ReportContribution 
{
	var $grossAmount;
	var $chomEmp;
	var $chomProp;
	var $chomEmp_rate;
	var $chomProp_rate;
	var $netAmount;
	var $month_id;
	var $days;

		
	public function ReportContribution($gross=0,$month_id=1,$days=0,$chomEmpRate=1.73,$chomPropRate=2.42)
	{
		$this->grossAmount = number_format(	$gross, 2, '.', '');//$gross;
		$this->chomEmp_rate = $chomEmpRate;
		$this->chomProp_rate = $chomPropRate;
		$this->month_id = $month_id;
		$this->days = $days;
	
	
		$this->calculateChEmpl();
		$this->calculateChProp();
		$this->calculateNet();
	}
	
	protected function calculateNet()
	{
		$this->netAmount = $this->grossAmount - $this->chomEmp - 	$this->chomProp;
	}
	
	private function calculateChEmpl()
	{
	
		$this->chomEmp = $this->chomEmp_rate*$this->days;
	}
	
	private function calculateChProp()
	{
		$this->chomProp = $this->chomProp_rate*$this->days;
	}
	
	public function addToGrossAmount($amount)
	{
		$this->grossAmount+=$amount;
		$this->calculateNet();
	}
	
	public function addTodays($days)
	{
		$this->days+=$days;
		$this->calculateChEmpl();
		$this->calculateChProp();
	}
	

}



?>