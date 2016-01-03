<?

tcpdf();
$obj_pdf = new TCPDF('P', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$obj_pdf->SetCreator(PDF_CREATOR);
$title = "IMPOTAXI :RAPPORT DE DÉPENSES";
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
 	margin-bottom: 20px;
 }
 table#expenseTable 
 {
 	   border: 1px solid  #000;
    /*    background-color: #ffffee;*/
 }
 table#expenseTable td.money,th.money
 {
 text-align: right;
 }
  table#expenseTable th
 {
 	   border-bottom: 1px solid  #000;
 	   border-top: 1px solid  #000;
 	   font-weight: 600;
 	   padding: 3px;
 	   
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
   				<td><?php echo $sumary["amount"] ?></td>
   					<th style="width:35%">TAXES SUR LES DÉPENSES:</th>
   				<td><?php echo ($sumary["TVQ"]+$sumary["TPS"]) ?></td>
   			</tr>
   			<tr>
   			
   				<th style="width:35%">TOTAL TPS:</th>
   				<td><?php echo $sumary["TPS"] ?></td>
   				<th style="width:35%">TOTAL TVQ:</th>
   				<td><?php echo $sumary["TVQ"] ?></td>
   			</tr>
   		</table>
   </div>
  <div id="rpt_detail">
  	
  	
  	<table class="" id="expenseTable">
    <thead>
        <tr>
            <th >Date</th>
            <th >Auto</th>
            <th >Compagnie</th>
            <th >Raison</th>
            <th class="money" >Sous-Total</th>
            <th class="money" >TPS</th>
            <th class="money" >TVQ</th>
            <th class="money" >Total</th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($expenses as $item):?>
        <tr id="<?php echo $item["id"] ?>" class="odd gradeX">
            <td>
            <?php echo $item["date"] ?>
            </td>
            <td>
             <?php echo $item["car_name"] ?>
            </td>
             <td>
            <?php echo substr($item["merchant_name"],0,9) ?>
            	
            </td>
            <td><?php echo $item["reason"] ?></td>
            <td class="money"><?php echo $item["amount"]?></td>
            <td class="money"><?php echo $item["TPS"] ?></td>
            <td class="money"><?php echo $item["TVQ"]?></td>
            <td class="money"><?php echo $item["Total"] ?></td>
   
        </tr>
  	<?php endforeach;?>

    </tbody>
    <tfoot>
    <tr>
    	<th colspan="4"></th> 
       <!-- <th></th> 
        <th></th>-->
        <th class="money"><?php echo $sumary["amount"] ?></th> 
        <th class="money"><?php echo $sumary["TPS"] ?></th> 
        <th class="money"><?php echo $sumary["TVQ"] ?></th> 
        <th class="money"><?php echo $sumary["Total"] ?></th>
       
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