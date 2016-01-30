<?php
   require_once('DriverContribution.php');
class ContributionReportMap
{
	var $map;
	var $monthMap;
	
	public function ContributionReportMap()
	{
		$this->map = array();
		$this->monthMap = array();
	}
	
	public function addAToDrviverContrbution($gross,$month_id,$days,$provider,$year_id,$start,$end,$chomEmpRate=1.73,$chomPropRate=2.42)
	{
		$k= $year_id."".$month_id."".$provider["id"];
		$mk = $year_id."".$month_id;
		//echo $k ."turn-----------------------------------------".$start."-".$end."</br>";
		//echo $k ."provides-".$gross." days:".$days."</br>";
		if($this->hasValueFor($k))
		{
			$subject = $this->get($k);
			$subject->addToGrossAmount($gross);
			$subject->addTodays($days);
			$subject->addProvisionDetail($gross,$days,$start,$end);
		//	$this->addToMonthly($mk,$subject,$gross,$days);
		}
		else
		{
			$this->map[$k]=new DriverContribution($gross,$month_id,$days,$provider,$start,$end);
			$this->registerMonthly($mk,$this->map[$k]);
			//$this->addToMonthly($mk,$this->map[$k],$gross,$days);//);
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
		{$this->monthMap[$key]=new MonthlyContribution();//MonthlyContribution($driverContribution);
		$this->monthMap[$key]->month_id=$driverContribution->month_id;
		$this->monthMap[$key]->chomEmp_rate=$driverContribution->chomEmp_rate;
		$this->monthMap[$key]->chomProp_rate=$driverContribution->chomProp_rate;
		}/*	$this->monthMap[$key]->addToGrossAmount($driverContribution->grossAmount);//getGrossAmount());
			$this->monthMap[$key]->addTodays($driverContribution->days);
			$this->monthMap[$key]->addDetail($driverContribution);*/
	}
	
	
/*	public function addToMonthly($key,$driverContribution,$gross=0,$days=0)
	{
		if($this->hasMonthlyValueFor($key))
		{//echo $key ." exists</br>";
		//echo "gross is:".$gross."</br>";
			$subject = $this->getMonthly($key);
		                                                          
		                                                          
		                                                          
		                                                          
		}
		else
		{//echo $key ." no exists</br>";
			$this->monthMap[$key]=new MonthlyContribution();//MonthlyContribution($driverContribution);
			$this->monthMap[$key]->month_id=$driverContribution->month_id;
			$this->monthMap[$key]->chomEmp_rate=$driverContribution->chomEmp_rate;
			$this->monthMap[$key]->chomProp_rate=$driverContribution->chomProp_rate;
			$this->monthMap[$key]->addToGrossAmount($driverContribution->grossAmount);//getGrossAmount());
			$this->monthMap[$key]->addTodays($driverContribution->days);
			$this->monthMap[$key]->addDetail($driverContribution);
		}
		//echo $key ."count of month_map:".count($this->monthMap)."</br>";
		//echo $key ."amount in month_map[".$key."]:".$this->monthMap[$key]->grossAmount."</br>";
	//	echo $key ."amount of days in month_map[".$key."]:".$this->monthMap[$key]->days."</br>";
		
	}*/
	
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