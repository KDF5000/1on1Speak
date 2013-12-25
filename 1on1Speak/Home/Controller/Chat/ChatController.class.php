<?php
/**
 * Chat Page - a ajax http handler for chating and document sharing
 *  - Implement the Ajax handler for getting/sending chat content and manage
 *     the data in the database
 *  - Implement the Ajax handler for sharing documents across multiple clients.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-07-09 16:32:49Z 
 * @author  zhihan, chengxu $
 */
require_once 'Page.class.php';
include_once (INC.'model/ChatMessageDao.php');

class Chat extends PageBase {
  protected static $DOCSHARE_FILE;
  protected static $WHITEBOARD_DIR;

  function __construct() {
    self::$DOCSHARE_FILE = DATA.'docshare.data';
    self::$WHITEBOARD_DIR = DATA.'whiteboard/';
  }
  //首次进来，获取全部聊天内容
  public function getContent(){
    //PARAMS
    $roomId = $_POST['rid'];
    $cId = 0;
    if (isset($_POST['cid'])) {
      $cId = $_POST['cid'];
    }

    $uid = $_SESSION['user']['id'];
    error_log('uid='.$uid);

    $cmd = new ChatMessageDao();
    $chatMsgs = $cmd->getNewContents($roomId, $cId);
    $everythingOK = false;
    if (is_array($chatMsgs)) {
      error_log('hasChatmsgs'.count($chatMsgs));
      $dataArr = array();
      for($i=0; $i<count($chatMsgs); $i++) {
        $userModelJson = $chatMsgs[$i]['user_json'];
        $userModel = json_decode($userModelJson);
        if ($userModel == NULL || empty($userModel->picture)) {
          $userImage = '/images/shead1.jpg';
        } else {
          $userImage = $userModel->picture;
        }
        $messageModel = $chatMsgs[$i]['json'];
        $dataArr[$i] = array('cid' => $chatMsgs[$i]['id'],
                             'uid' => $chatMsgs[$i]['user_id'],
                             'uimage' => $userImage,
                             'content' => $messageModel);
      }
      $everythingOK = true;
    }
    if($everythingOK) {
      $response = array(
          'code' => '0',
          'data' => $dataArr);
    } else {
      $response = array(
          'code' => '1',
          'msg' => 'server err，please contact admin'
        );
    }
    echo json_encode($response); 
  }  

  //发送消息
  public function sendContent(){
    //PARAMS
    $roomId = $_POST['rid'];
    $mycontent = $_POST['content'];
    //get uid from session
    $uid = $_SESSION['user']['id'];
	$uid = 1;
    error_log("uid=".$uid);
    $cmd = new ChatMessageDao();
    $content = array("session_id" => $roomId,
                     "uid" => $uid,
                     "content" => $mycontent,
                     );
    $cmd->addContent($content);

    //backData
    $everythingOK = true;
    if($everythingOK) {
      $response = array(
          'code' => '0',
          'data' => array()
          );
    } else {
      $response = array(
          'code' => '1',
          'msg' => 'server err1,please send later...'
        );
    }
    echo json_encode($response);
  }

  public function saveDocShare() {
    //PARAMS
    $roomId = $_POST['rid'];
    $mycontent = $_POST['content'];
    error_log($mycontent);
    $s = file_get_contents(self::$DOCSHARE_FILE);
    if (empty($s)) {
      $mapping = array();
    } else {
      $mapping = json_decode($s);
      $mapping = get_object_vars($mapping);
    }
    $json = json_decode($mycontent);
    $mapping[$roomId] = $json;
    $content = json_encode($mapping);
    file_put_contents(self::$DOCSHARE_FILE, $content);
  }

  public function loadDocShare() {
    //PARAMS
    $roomId = $_POST['rid'];
    $s = file_get_contents(self::$DOCSHARE_FILE);
    if (empty($s)) {
      /*
      $output = array(
        "type" => "sharedocument",
        "scribd_doc_id" => 0,
        "scribd_access_key": 0,
        "page": 1);
      echo json_encode($output);
      */
      echo "";
    } else {
      $mapping = json_decode($s);
      if (is_array($mapping)) {
        // Nothing to do.
      } else {
        $mapping = get_object_vars($mapping);
      }
      //var_dump($mapping);
      if ($mapping[$roomId]->scribd_doc_id == 0) {
        echo "";
        return;
      } else {
        echo json_encode($mapping[$roomId]);
      }
    }
  }

  public function saveBoard() {
    $bid = $_POST['bid'];
    $objects = $_POST['svgObjects'];
    file_put_contents(self::$WHITEBOARD_DIR.'/file_'.$bid, $objects);
    echo '{code":"0"}';
  }

  public function loadBoard() {
    $bid = $_POST['bid'];
    error_log($bid);

    $fc = file_get_contents(self::$WHITEBOARD_DIR.'/file_'.$bid);
    error_log('loadBoard.');
    error_log($fc);
    if(empty($fc)) {
      echo '{data:"[]","code":"0"}';
    } else {
      $response = array(
          'code' => '0',
          'data' => $fc,
        );
      echo json_encode($response);
    }
  }
}
?>