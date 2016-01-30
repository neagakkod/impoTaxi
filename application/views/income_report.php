<?

tcpdf();
$obj_pdf = new TCPDF('P', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$obj_pdf->SetCreator(PDF_CREATOR);
$title = "IMPOTAXI :RAPPORT DE REVENUE";
$obj_pdf->SetTitle($title);
$obj_pdf->SetHeaderData("",0, $title, "ANNÉE:2015 - TRIMESTRE:OCT, NOV, DEC");
//$obj_pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, $title, PDF_HEADER_STRING);
$obj_pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$obj_pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
$obj_pdf->SetDefaultMonospacedFont('helvetica');
$obj_pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$obj_pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
$obj_pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$obj_pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
$obj_pdf->SetFont('helvetica', '', 9);
$obj_pdf->setFontSubsetting(false);
$obj_pdf->AddPage();
ob_start();
    // we can have any view part here like HTML, PHP etc
    //margin:0 0 15px 0 
   
    ?>
 <style>
 
 div#rpt_resumeBox
 {
 	border:1px solid #000;
 	padding: 10px;
 	margin-bottom: 20px;
 }
 
 div#rpt_resumeBox table
 {
 	
 }
 table#incomeTable 
 {
 	   border: 1px solid  #000;
    /*    background-color: #ffffee;*/
 }
 table#incomeTable td,th
 {
 	border: 1px solid  #787878;
 }
 table#incomeTable td.money,th.money
 {
 
 text-align: right;
 	width:10%;
 }
  
</style>
<script  type="text/javascript">

	
</script>
 <div id="rpt_resumeBox" style="	/*border:1px solid #000;margin-bottom: 20px;*/">
 	R&eacute;sum&eacute;
 	<br/>
 	<table>
   		<thead>
        <tr>
            <th >Mois</th>
            <th >revenue brut</th>
            <th >TPS (<?php echo ($tpsRate*100); ?>%)</th>
            <th >TVQ (<?php echo ($tvqRate*100); ?>%)</th>
            <th >Total apr&egrave;s taxes</th>
            <th >Taxes pay&eacute;s</th>
        </tr>
    </thead>
   		<?php foreach ( $this->contributionreportmap->monthMap as $kM=>$month):?>
   		 <tr>
            <td ><?php echo $month->monthName; ?></td>
            <td  class="money" ><?php echo $month->netAmount; ?></td>
            <td  class="money" ><?php echo ($month->tpsAmount); ?></td>
            <td  class="money" ><?php echo ($month->tvqAmount); ?></td>
            <td  class="money" ><?php echo ($month->netAmount-($month->tpsAmount+$month->tvqAmount)); ?></td>
            <td  class="money" ><?php echo ($month->tpsAmount+$month->tvqAmount); ?></td>
        </tr>
   		
   		<?php endforeach;?>
   	</table>
  </div>
  <div id="rpt_detail">
  
  <table class="" id="incomeTable">
    <thead>
        <tr>
            <th style="width:16%" >Mois</th>
            <th style="width:17%">Chauffeur</th>
            <th style="width:20%">Semaine</th>
            <th style="width:7%">Jours</th>
            <th class="money" >Montant</th>
            <th class="money" >Ch.Emp</th>
            <th class="money" >Ch.Prop</th>
            <th class="money" >Revenue</th>
        </tr>
    </thead>
    <tbody>
   <?php foreach ( $this->contributionreportmap->monthMap as $kM=>$month)
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
					$currentWeek = $currentDriverContribution[$j];
					$lastWeek=$j==count($currentDriverContribution)-1;
					$newMonthHasStarted=$i==0 && $j==0;
					$newDriverHasStarted=$j==0;
					if($newMonthHasStarted)
					{
						echo "	<td style=\"width:16%\" rowspan=\"".($spanInfo[$kM])."\">".
										$month->monthName.
								"</td>";
					}
					if($newDriverHasStarted)
					{
							echo "	<td style=\"width:17%\" rowspan=\"".($spanInfo[$kM."_".$driverContributionsForMonth[$i]->provider["name"]])."\">".
										$driverContributionsForMonth[$i]->provider["name"].
							"</td>";
						
					}
					
   ?>
		 		
			   	
			   	
			   		<td style="width:20%"><?php echo $currentWeek["start"]."-".$currentWeek["end"] ?></td>
			   		<td style="width:7%"><?php echo $currentWeek["days"] ?></td>
			   		<td class="money"><?php echo $currentWeek["grossAmount"] ?></td>
			   		<td class="money"><?php echo $currentWeek["chomEmp"] ?></td>
			   		<td class="money"><?php echo $currentWeek["chomProp"] ?></td>
			   		<td class="money"><?php echo $currentWeek["netAmount"] ?></td>
			   	</tr>
	   
   <?php 
	   
	   				if($lastWeek)
	   				{
	   						echo "<tr>".
	   								"<td>Total </td>".
	   								"<td>".$driverContributionsForMonth[$i]->days."</td>".
	   								"<td class=\"money\">".$driverContributionsForMonth[$i]->grossAmount."</td>".
	   								"<td class=\"money\">".$driverContributionsForMonth[$i]->chomEmp."</td>".
	   								"<td class=\"money\">".$driverContributionsForMonth[$i]->chomProp."</td>".
	   								"<td class=\"money\">".$driverContributionsForMonth[$i]->netAmount."</td>".
	   							"</tr>";
	   				}
	   				if(	$lastDriver && $lastWeek)
	   				{
	   						echo "<tr>".
	   								"<td colspan=\"2\"><b>Revenue Mensuel</b>:&nbsp;&nbsp;".$month->netAmount." <br/> <b>TPS</b>:"
	   												.($month->netAmount*$tpsRate)."&nbsp;&nbsp; <b>TVQ</b>:"
	   												.($month->netAmount*$tvqRate).
	   								"</td>".
	   								"<td>".$month->days."</td>".
	   								"<td class=\"money\">".$month->grossAmount."</td>".
	   								"<td class=\"money\">".$month->chomEmp."</td>".
	   								"<td class=\"money\">".$month->chomProp."</td>".
	   								"<td class=\"money\">".$month->netAmount."</td>".
	   							"</tr>";
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
    <?php
    
    
// Form validation functions
$js = <<<EOD
	function formatDate (milisec)
	{
		var dt= new Date(milisec);
		var monthNames = [
			  "Janvier", "Fevrier", "Mars",
			  "Avril", "Mai", "Juin", "Juillet",
			  "Aout", "Septembre", "Octobre",
			  "Novembre", "Decembre"
			];
			
			var date = new Date();
			var day = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
		return	day + ' ' + monthNames[monthIndex] + ' ' + year;
		//	console.log(day, monthNames[monthIndex], year);
		//	document.write(day + ' ' + monthNames[monthIndex] + ' ' + year);
	}
EOD;
    
    // Add Javascript code
$obj_pdf->IncludeJS($js);
    $content = ob_get_contents();
ob_end_clean();
$obj_pdf->writeHTML($content, true, false, true, false, '');
$obj_pdf->Output('output.pdf', 'I');
?>