<?php
/**
 * ChatMessageDao - database utils for managing the chat message.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-20 21:26:11Z 
 * @author     chengxu $
 */

include_once( 'DB.php' );

class ChatMessageDao {
  function pingSessionAndUser($sessionId, $userId, $userName) {
    $db = DB::getDB();
    $name = mysql_real_escape_string($content['userName']);
    $query = "insert into sessionping values({$userId},{$sessionId},'{$name}', NULL) on duplicate key update ping=now()";
    mysql_query($query,$db) or die("Invalid query: " . mysql_error());
  }

  function getSessionUser($sessionId) {
    $db = DB::getDB();
    $query = "select distinct uid, name from sessionping where ping>now()-60 AND session_id={$sessionId}";
    $res = mysql_query($query,$db) or die("Invalid query: " . mysql_error());
    $arr = array();
    while($row = mysql_fetch_array($res,MYSQL_ASSOC)) {
      array_push($arr,$row);
    }
    return $arr;
  }

  function addContent($content) {
    $db = DB::getDB();
    $esc = mysql_real_escape_string($content['content']);
    $query = "insert into chat_message(session_id, user_id, json) values({$content['session_id']},{$content['uid']},\"{$esc}\")";
	error_log($query);
    mysql_query($query,$db) or die("Invalid query: " . mysql_error());
  }

  function getNewContents($session_id, $id) {
    $db = DB::getDB();
    $query = "select chat_message.id as id, chat_message.session_id as session_id, user_id, user.name as name, chat_message.json, user.json as user_json, chat_message.create_time from chat_message join user on chat_message.user_id=user.id where chat_message.session_id={$session_id} ";
    if (isset($id)) {
      $query .= " and chat_message.id>".$id;
    }
    $query .= " order by chat_message.create_time;";
    error_log($query);
    $res = mysql_query($query,$db) or die("Invalid query: " . mysql_error());
    $arr = array();
    while($row = mysql_fetch_array($res,MYSQL_ASSOC)) {
      array_push($arr,$row);
    }
    return $arr;
  }
}

?>