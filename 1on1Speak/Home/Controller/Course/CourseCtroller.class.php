<?php
/**
 * Speak.com page module 
 *  - configure the template parameters for Interview page.
 *  - (more functions)...
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-08 13:11:49Z 
 * @author  helen $
 */
require_once 'Page.class.php';

//TOK SDK
require_once 'API_Config.php';
require_once 'OpenTokArchive.php';
require_once 'OpenTokSDK.php';
require_once 'OpenTokSession.php';

class Course extends PageBase {
  private function checkIsLogin() {
    if(empty($_SESSION['user']) ){;
      header('Location: /login/') ;
    }		
  }

  public function main() {
    //$this->checkIsLogin();
    $apiObj = new OpenTokSDK(API_Config::API_KEY, API_Config::API_SECRET);

    //$session = $apiObj->create_session();

    //$sessionId = $session->getSessionId();

    //$sessionId = '2_MX4yMzMzNjA4Mn5-TW9uIEp1biAxNyAwOToxNjo1NyBQRFQgMjAxM34wLjExNjQ3Mjk2fg';
    $sessionId = "1_MX4zMzQ0MTc5Mn4xMjcuMC4wLjF-VGh1IEp1biAyNyAyMTo1NzozMyBQRFQgMjAxM34wLjM2NjAwMDE4fg";

    //TODO 确认使用者类型
    $userType = $_POST['role'];//1学生，2老师
    //当前房间id
    $roomId = 1;
	if($userType==1){
	  $userName= "学生:".$_POST['userName'];
	} else {
	  $userName= $_POST['userName']."老师";
	}
    //当前用户的UID
    $uid = $_SESSION['user']['id'];
    //$uid = 123;

  	$pageInfo = array ('pageId' => 'course',
                           'apiKey' => API_Config::API_KEY,
                           'sessionId' => $sessionId,
                           'token' => $apiObj->generate_token($sessionId),
                           'userName' => $userName.'|||'.$userType,
                           'userType' => $userType,
                           'rid' => $roomId,
                           'uid' => $uid
                           );

    include TEMP.'course.tpl';  
  }
}
?>