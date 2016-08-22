<?php
	$hiddenValue = @$_POST['hiddenValue'];
	$userEmail = @$_POST['userEmail'];
	$type = @$_POST['type'];

	$array = explode("#", $hiddenValue);

	$sendto = 'taxassist@vi-m.com';
	$sendto1 = 'taxassist2@vi-m.com';
	
	$name = "TaxAssist";

    $subject  = "Assist Me: ".$name;
    $headers  = "From: " . strip_tags($name) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($name) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

    $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
    $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Assist Me - ".$type."</h2>\r\n";
    $msg .= "<p><strong>User Email: </strong>".$userEmail."</p>\r\n\r";
    $msg .= "<p><strong>Looking for assistance: </strong></p>\r\n\r";

    for ($i=0; $i < sizeof($array)-1; $i++) {
    	$var = $array[$i];

    	$msg .= "<p>".($i+1)."] ".$var."</p>\r\n";
    }

    $msg .= "</body></html>";


    if(@mail($sendto, $subject, $msg, $headers)) {
    	mail($sendto1, $subject, $msg, $headers);
        echo "true";
    }
?>