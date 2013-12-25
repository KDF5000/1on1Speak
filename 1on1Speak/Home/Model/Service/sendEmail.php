<?php
/**
 * sendEmail - database utils for user email sender.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-20 10:33:11Z 
 * @author     helen $
 */

include_once( 'DB.php' );
include_once( INC.'email/email_sender.php' );
class sendEmail{
  //发送验证邮箱email
  function sendEmailVerify($user){
	$to = $user['email'];
	$userName=$user['name'];
	
	//url rule: "http://www.1on1speak.com/reg/verifyEmail/".用户id加100."&code=".sha1(用户id.用户名称.创建用户时间)
	$verify_url="http://www.1on1speak.com/reg/verifyEmail/".($user['id']+100)."&code=".sha1($user['id'].$user['name'].$user['create_time'])."/";
	
    $subject = "Confirm your email address";
    $body = '<h3>Confirm your email address</h3><BR>
<h1>Dear '.$userName.',</h1>
<B>Thanks for signing up for 1on1speak.</b><BR>
<b>Help us verify you\'re a human by clicking the link below to confirm your email address.<B><br>
<a href="'.$verify_url.'">'.$verify_url.'</a>';
    return EmailSender::getInstance()->mySendEmail($to,$subject,$body);
  }
}
