
 <style>
 
 div#rpt_resumeBox
 {
 	border:1px solid #000;
 	margin-bottom: 20px;
 }
 table#incomeTable 
 {
 	   border: 1px solid  #000;
    /*    background-color: #ffffee;*/
 }
 table#incomeTable td,th
 {
 	border: 1px solid  #000;
 }
 table#incomeTable td.money,th.money
 {
 text-align: right;
 }
  
</style>
<script  type="text/javascript">

	
</script>
<div id="rpt_resumeBox" style="	/*border:1px solid #000;margin-bottom: 20px;*/">
   		
   		<table style="width:80%;margin-top: 15px">
   			<tr>
   				<th colspan="4"><strong>RÉSUMÉ:</strong></th>
   			</tr>
   			<tr>
   				<th colspan="4"></th>
   			</tr>
   			<tr>
   				<th style="width:35%">SOUS-TOTAL DES DÉPENSES:</th>
   				<td><?php echo ""?></td>
   					<th style="width:35%">TAXES SUR LES DÉPENSES:</th>
   				<td><?php echo "" ?></td>
   			</tr>
   			<tr>
   			
   				<th style="width:35%">TOTAL TPS:</th>
   				<td><?php  echo "" ?></td>
   				<th style="width:35%">TOTAL TVQ:</th>
   				<td><?php  echo "" ?></td>
   			</tr>
   		</table>
   </div>
  <div id="rpt_detail">
  
<table class="" id="incomeTable">
    <thead>
        <tr>
            <th >Mois</th>
            <th >Chauffeur</th>
            <th >Semaine</th>
            <th >Jours</th>
            <th class="money" >Montant</th>
            <th class="money" >Ch.Emp</th>
            <th class="money" >Ch.Prop</th>
            <th class="money" >Revenue</th>
        </tr>
    </thead>
    <tbody>
   <?php foreach ( $this->drivercontributionmap->monthMap as $kM=>$month)
   		 {
   		 
		 	$driverContributionsForMonth=$month->provisionDetail;//->provisionDetail;
		 	//	print_r($spanInfo[$kM]);
			for ( $i=0;$i<count($driverContributionsForMonth)/*$spanInfo[$kM]*/;$i++ )
			{
				$currentDriverContribution=$driverContributionsForMonth[$i]->provisionDetail;
				$lastDriver=$i==count($driverContributionsForMonth)-1;
				for ( $j=0;$j<count($currentDriverContribution);$j++ )
				{
					echo "<tr>";
					
					$lastWeek=$j==count($currentDriverContribution)-1;
					$newMonthHasStarted=$i==0 && $j==0;
					$newDriverHasStarted=$j==0;
					if($newMonthHasStarted)
					{
						echo "	<td rowspan=\"".($spanInfo[$kM])."\">".($spanInfo[$kM])."</td>";
					}
					if($newDriverHasStarted)
					{
							echo "	<td rowspan=\"".($spanInfo[$kM."_".$driverContributionsForMonth[$i]->provider["name"]])."\">".($spanInfo[$kM."_".$driverContributionsForMonth[$i]->provider["name"]])."</td>";
						
					}
					
   ?>
		 		
			   	
			   	
			   		<td>1</td>
			   		<td>1</td>
			   		<td>1</td>
			   		<td>1</td>
			   		<td>1</td>
			   		<td>1</td>
			   	</tr>
	   
   <?php 
	   
	   				if($lastWeek)
	   				{
	   						echo "<tr><td>final</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>";
	   				}
	   				if(	$lastDriver && $lastWeek)
	   				{
	   						echo "<tr><td>final</td><td>final</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>";
	   				}
			  	}
			}
   		}
   	?>
    </tbody>
    <tfoot>
    <tr>
    	<th colspan="4"></th> 
     
       
    </tr>
  </tfoot>
</table>
  	
  	
  	
  	
  	
</div>
