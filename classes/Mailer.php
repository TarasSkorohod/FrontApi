<?php

require_once( ROOT . "vendor/autoload.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require ROOT . 'vendor/phpmailer/phpmailer/src/Exception.php';
require ROOT . 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require ROOT . 'vendor/phpmailer/phpmailer/src/SMTP.php';


class Mailer {

	public $opt;




	function send( $to, $from, array $mail ) {
		
		if ( is_string($from) ) $from["email"] = $from;
		if ( is_string($to) ) $to["email"] = $to;
		
		if ( !isset( $mail["subject"] ) ) trigger_error( '"subject" is not defined', E_USER_ERROR );
		if ( !isset( $mail["body"] ) ) trigger_error( '"body" is not defined', E_USER_ERROR );
		
		
		
		$hnd = new PHPMailer(true);

		$hnd->Mailer = "smtp";


		try {
			//Server settings
			$hnd->SMTPDebug = $this->opt["debug"];                      //Enable verbose debug output
			$hnd->isSMTP();                                            //Send using SMTP
			$hnd->Host       = EMAIL_SUPPORT_HOST;                     //Set the SMTP server to send through
			$hnd->SMTPAuth   = true;                                   //Enable SMTP authentication
			$hnd->Username   = EMAIL_SUPPORT_USER;                     //SMTP username
			$hnd->Password   = EMAIL_SUPPORT_PASSWORD;                               //SMTP password
			$hnd->CharSet = 'UTF-8';
			$hnd->Encoding = 'base64';

			//$hnd->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
			$hnd->Port       = 25 ;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

			//Recipients
			if ( isset( $from["name"] ) ) {
				$hnd->setFrom( $from["email"], $from["name"] );
			} else {
				$hnd->setFrom( $from["email"] );
			};

			if ( isset( $to["name"] ) ) {
				$hnd->addAddress( $to["email"], $to["name"] );
			} else {
				$hnd->addAddress( $to["email"] );
			};
			
			//$hnd->addReplyTo('info@example.com', 'Information');
			//$hnd->addCC('cc@example.com');
			//$hnd->addBCC('bcc@example.com');

			//Attachments
		   // $hnd->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
		   // $hnd->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

			//Content
			$hnd->isHTML(true);                                  //Set email format to HTML
			$hnd->Subject = $mail["subject"];
			$hnd->Body    = $mail["body"];
			//$hnd->AltBody = 'This is the body in plain text for non-HTML mail clients';

			$hnd->send();
			
			if ( $this->opt["debug"] ) echo 'Message has been sent';
			return true;
		} catch (Exception $e) {
			
			if ( $this->opt["debug"] ) echo "Message could not be sent. Mailer Error: {$hnd->ErrorInfo}";
			return false;
		}

	}




	function __construct( array $opt = [] ) {

		$opt_default = [
			"debug" => false
		];

		
		$this->opt = $opt = array_merge( $opt_default, $opt );
			
		

		
	}






}