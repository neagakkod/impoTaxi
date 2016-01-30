<?php
   require_once('DriverContribution.php');
   require_once('MonthNames.php');

class ContributionReportMap
{
	var $map;
	var $monthMap;
	var $tpsRate;
	var $tvqRate;
	var $currentLanguage;
	private $monthNamer;
	
	public function ContributionReportMap()
	{
		$this->map = array();
		$this->monthMap = array();
		$this->tpsRate=0.05;
		$this->tvqRate=0.09975;
		$this->currentLanguage=2;
		$this->monthNamer= new MonthNames($this->currentLanguage);
		
	}
	
	public function addAToDrviverContrbution($gross,$month_id,$days,$provider,$year_id,$start,$end,$chomEmpRate=1.73,$chomPropRate=2.42)
	{
		$k= $year_id."".$month_id."".$provider["id"];
		$mk = $year_id."".$month_id;
		
		if($this->hasValueFor($k))
		{
			$subject = $this->get($k);
			$subject->addToGrossAmount($gross);
			$subject->addTodays($days);
			$subject->addProvisionDetail($gross,$days,$start,$end);
		}
		else
		{
			$this->map[$k]=new DriverContribution($gross,$month_id,$days,$provider,$start,$end);
			$this->registerMonthly($mk,$this->map[$k]);
		}
		
	}
	
	public function loadMonthMap()
	{
		foreach($this->map as $k=>$driverContribution)
		{
			
			$this->monthMap[substr( $k,0,6 )]->addDetail($driverContribution);
			$this->monthMap[substr( $k,0,6 )]->addTodays($driverContribution->days);
			$this->monthMap[substr( $k,0,6 )]->addToGrossAmount($driverContribution->grossAmount);//getGrossAmount());
		
			unset($this->map[$k]);
		}
	}
	
	public function registerMonthly($key,$driverContribution)
	{	if(!$this->hasMonthlyValueFor($key))
		{
			$this->monthMap[$key]=new MonthlyContribution();//MonthlyContribution($driverContribution);
			$this->monthMap[$key]->month_id=$driverContribution->month_id;
			$this->monthMap[$key]->monthName=$this->monthNamer->getMonthAt($driverContribution->month_id);
			$this->monthMap[$key]->chomEmp_rate=$driverContribution->chomEmp_rate;
			$this->monthMap[$key]->chomProp_rate=$driverContribution->chomProp_rate;
			$this->monthMap[$key]->tpsRate=	$this->tpsRate;
			$this->monthMap[$key]->tvqRate=$this->tvqRate;
	
		}
	}
	

	public function hasMonthlyValueFor($key)
	{
		return array_key_exists($key,$this->monthMap);
	}
	
	public function hasValueFor($key)
	{
		return array_key_exists($key,$this->map);
	}
	
	public function get($key)
	{
		return $this->map[$key];
	}
	
	public function getMonthly($key)
	{
		return $this->monthMap[$key];
	}
	
	
	public function debugThis($dME)
	{
		echo json_encode($dME );
	 	exit;
	}
}

?>