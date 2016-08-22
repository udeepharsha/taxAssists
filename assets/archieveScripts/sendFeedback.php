<?php
	$form1_content = @$_POST['form1_content'];
    $userEmail = @$_POST['userEmail'];

	$sendto = 'taxassist@vi-m.com';
    $sendto1 = 'taxassist2@vi-m.com';
    
	$name = "TaxAssist";

    $subject  = "Feedback: ".$name;
    $headers  = "From: " . strip_tags($name) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($name) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

    $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
    $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Feedback</h2>\r\n";
    $msg .= "<p><strong>Feedback Message From: </strong>".$userEmail."</p>\r\n\r";
    $msg .= "<p>".$form1_content."</p>\r\n";
    $msg .= "</body></html>";


    if(@mail($sendto, $subject, $msg, $headers)) {
        mail($sendto1, $subject, $msg, $headers);
        echo "true";
    }
?>