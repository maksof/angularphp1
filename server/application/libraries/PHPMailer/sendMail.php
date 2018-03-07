<?php

class sendRestKey
{
	function sendRegMail($data)
	{
		require APPPATH.'libraries/PHPMailer/class.phpmailer.php';
			
		$mail = new PHPMailer();
		$mail->IsSMTP();
		$mail->SMTPAuth = true;
		$mail->Host     = "ssl://smtp.gmail.com";
		$mail->Port     = 465;
		$mail->Username = "timetable534@gmail.com";
		$mail->Password = "Time@Table";
		$mail->From = "timetable534@gmail.com";
		$mail->FromName = "TimeTable";
		$mail->Subject  = $data['subject'];
		$mail->Body     = $data['body'];
		$mail->AddAddress($data['email']);
		if(!$mail->Send()){
			return false;
		}else{
			return true;
		}			
	}
}
?>