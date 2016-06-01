<?php
	require_once "../vendor/autoload.php";
	$mail = new PHPMailer();
	//Enable SMTP debugging. 
	$mail->SMTPDebug = 3;                               
	//Set PHPMailer to use SMTP.
	$mail->isSMTP();            
	//Set SMTP host name                          
	$mail->Host = "smtp.gmail.com";
	//Set this to true if SMTP host requires authentication to send email
	$mail->SMTPAuth = true;                          
	//Provide username and password     
	$mail->Username = "jhavive123@gmail.com";                 
	$mail->Password = "vivek91*";                           
	//If SMTP requires TLS encryption then set it
	$mail->SMTPSecure = "tls";                           
	//Set TCP port to connect to 
	$mail->Port = 587;  


	//PHPMailer Object
	$emailAddress = $_POST["email"];

	//From email address and name
	$mail->From = "vivekj@liv.ai";
	$mail->FromName = "Vivek Jha";

	//To address and name
	$mail->addAddress($emailAddress); //Recipient name is optional

	//Address to which recipient will reply
	$mail->addReplyTo("vivekj@liv.ai", "Reply");

	//CC and BCC
	//Send HTML or Plain Text email
	$mail->isHTML(true);

	$mail->Subject = "Subject Text";
	$mail->Body = "<i>Thank You for showing interest. We'll get in touch</i>";
	$mail->AltBody = "This is the plain text version of the email content";

	if(!$mail->send()) 
	{
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} 
	else 
	{
	    echo '<script type="text/javascript">
           window.location = "../templates/thankyou/thankyou.html"
     	</script>';
	}
?>