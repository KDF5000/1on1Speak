<?php
/**
 * InterviewSessionDao - database access object for Interview session management.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-15 14:23:11Z 
 * @author     chengxu $
 */
include_once( 'DB.php' );
//TOK SDK

require_once MODULE.'OpenTokSDK.php';

class InterviewSessionDao {
  function getSessionInfo($sessionId) {
    $db = DB::getDB();
    $query = "select json from interview_session where id={$sessionId}";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
  }

  function getAllSessions($uid, $email) {
    $db = DB::getDB();
    $query = "select id, json from interview_session where id in (select session_id from session_user where user_id={$uid} or interviewer_email='$email' or candidate_email='$email')";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    $rows = array();
    while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
      array_push($rows, $row);
    }
    mysql_free_result($res);
    return $rows;
  }

  function createSession($interview_session) {
    $db = DB::getDB();
    $json_text = json_encode($interview_session);
    $query = "insert into interview_session(id, title, pin, start_time, end_time, json) values (NULL, '{$interview_session['name']}','{$interview_session['pin']}','{$interview_session['start_time']}','{$interview_session['end_time']}','{$json_text}')";
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);

    $user = $_SESSION['user'];
    $user_id = $user['id'];
    $query = "insert into session_user(id, session_id, user_id, candidate_name, candidate_email, interviewer_name, interviewer_email) values (NULL, ".mysql_insert_id().",'{$user_id}', '{$interview_session['candidate_name']}','{$interview_session['candidate_email']}','{$interview_session['interviewer_name']}','{$interview_session['interviewer_email']}')";
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);

    return true;
  }

  function updateSession($session_id, $interview_session) {
    $db = DB::getDB();
    $json_text = json_encode($interview_session);
    $query = "update interview_session set title='{$interview_session['name']}',pin='{$interview_session['pin']}', start_time='{$interview_session['start_time']}', end_time='{$interview_session['end_time']}', json='{$json_text}' WHERE id={$session_id}";
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    if (mysql_affected_rows() == 0) {
      return "did not find the record.";
    }

    $user = $_SESSION['user'];
    $user_id = $user['id'];
    $query = "update session_user set candidate_name='{$interview_session['candidate_name']}', candidate_email='{$interview_session['candidate_email']}', interviewer_name='{$interview_session['interviewer_name']}', interviewer_email='{$interview_session['interviewer_email']}' where session_id={$session_id};";
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());

    if (mysql_affected_rows() == 0) {
      return "did not find the record.";
    }
    error_log($query);
    return true;
  }
  
  function createOwnSession($create_interview){
	$apiObj = new OpenTokSDK(API_Config::API_KEY, API_Config::API_SECRET);
	$session = $apiObj->create_session();
    $sessionId = $session->getSessionId();
	
	$db = DB::getDB();
    $query = "select count(*) as space_id from user where myspace_id='{$create_interview['myspace_id']}'";
	
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    if($row['space_id']>0){
	  $query = "select count(*) as space_id from user where myspace_id like '{$create_interview['myspace_id']}%'";
      $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
      error_log($query);
      $row = mysql_fetch_array($res, MYSQL_ASSOC);
	  if($row['space_id']>0){
	    $myspace_id=$create_interview['myspace_id'] .($row['space_id']+1);
	  } else {
	    $myspace_id=$create_interview['myspace_id'];
	  }
	} else {
	  $myspace_id=$create_interview['myspace_id'];
	}
	
	$query = "update user set myspace_pin='{$create_interview['myspace_pin']}',myspace_id='{$create_interview['myspace_id']}', session_id='{$sessionId}' WHERE id={$create_interview['user_id']}";
	
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    if (mysql_affected_rows() == 0) {
      return false;
    } else {
	  return true;
	}
	
  }
  function updateSpaceId($myspace){
	$db = DB::getDB();
	$query = "select count(*) as space_id from user where myspace_id='{$myspace['myspace_id']}' and id<>{$myspace['user_id']}";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
	if($row["space_id"]>0){
	  return false;
	} else {
      $query = "update user set myspace_id='{$myspace['myspace_id']}' WHERE id={$myspace['user_id']}";
      mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
      error_log($query);
	  return true;
	}
  }
  
  function updteSpacePin($myspace){
    $db = DB::getDB();
    $query = "update user set myspace_pin='{$myspace['myspace_pin']}' WHERE id={$myspace['user_id']}";
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    return true;
  }
  
  function getMySession($myspace_id){
    $db = DB::getDB();
    $query = "select session_id from user where myspace_id='{$myspace_id}'";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
  }
}

?>