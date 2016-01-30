<?php
   require_once('ReportContribution.php');
class DriverContribution extends ReportContribution
{
	var $provider;
		var $provisionDetail;
	public function DriverContribution($gross,$month_id,$days,$provider,$start,$end,$chomEmpRate=1.73,$chomPropRate=2.42)
	{
	
		$this->ReportContribution($gross,$month_id,$days,$chomEmpRate,$chomPropRate);
		$this->provider = $provider;
				$this->provisionDetail=array();
		$this->addProvisionDetail($gross,$days,$start,$end);
	}
	
	public function addProvisionDetail($gross,$days,$start,$end)
	{
		array_push($this->provisionDetail,array("grossAmount"=>$gross
										,"chomEmp"=>$days*$this->chomEmp_rate
										,"chomProp"=>$days*$this->chomProp_rate
										,"days"=>$days
										,"start"=>$start
										,"end"=>$end
										,"netAmount"=>$gross-($days*$this->chomEmp_rate)-($days*$this->chomProp_rate)));
	}
	
	
}

class MonthlyContribution extends ReportContribution 
{
	var $provisionDetail;
	 var $tpsRate;
	var $tvqRate;
	var $tpsAmount;
	var $tvqAmount;
	var $monthName;
	public function MonthlyContribution($gross=0,$month_id=1,$days=0,$tpsRate=1,$tvqRate=1,$chomEmpRate=1.73,$chomPropRate=2.42)
	{
			$this->ReportContribution($gross,$month_id,$days,$chomEmpRate,$chomPropRate);
			$this->provisionDetail=array();
			$this->tpsRate=$tpsRate;
			$this->tvqRate=$tvqRate;
			$this->monthName="";
	}
	
	public function addToGrossAmount($amount)
	{
	
		$this->grossAmount+=$amount;
		$this->calculateNet();
		// number_format(round(( $this->netAmount*$this->tpsRate)*($tvqRate),2), 2, '.', '');
		$this->tpsAmount= number_format(round(( $this->netAmount*$this->tpsRate),2), 2, '.', '');// $this->netAmount*$this->tpsRate;
		$this->tvqAmount= number_format(round(( $this->netAmount*$this->tvqRate),2), 2, '.', '');// $this->netAmount*$this->tvqRate;
	}
	
	public function addDetail($detail)
	{
		array_push($this->provisionDetail,$detail);
	}
}


?>