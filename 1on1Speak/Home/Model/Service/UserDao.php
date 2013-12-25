<?php
/**
 * UserDao - database utils for User table.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-09 10:33:11Z 
 * @author     chengxu $
 */

include_once (INC.'model/DB.php');

class UserDao {
  /*通过所属SNS平台和平台ID查询用户*/
  function findUserByPid($platform,$pid) {
    $db = DB::getDB();
    $query = "select user.id as id, user.name, user_platform.email, user.json, user.myspace_id, user.create_time from user join user_platform where user_platform.platform = '{$platform}' and user_platform.pid = '{$pid}'";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:" . mysql_error()." - ". mysql_errno());
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
  }

  /*通过用户名和密码进行登陆*/
  function findUserByMailAndPass($userName,$pass) {
    $db = DB::getDB();
    $query = "select user.id as id, user.name, user_platform.email, user.json, user.myspace_id, user.myspace_pin, user.create_time from user join user_platform where user.id = user_platform.user_id and user_platform.email = '{$userName}' and user.password = '{$pass}'";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:" . mysql_error());
    error_log($query);
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
  }
  
  /**
   * 通过用户名查找用户
   * @param unknown_type $userName
   * @return multitype:
   */
  function findUserByName($userName) {
    $db = DB::getDB();
    $query = "select * from user where name='$userName'";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:" . mysql_error());
    error_log($query);
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
  }
  

  /*通过id查询用户*/
  function findUserById($id) {
    $db = DB::getDB();
    $query = "select user.id as id, user.name, user_platform.email, user.json, user.myspace_id, user.create_time from user join user_platform where user.id=user_platform.user_id and user.id = '{$id}'";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:" . mysql_error());
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
  }

  /*添加用户*/
  function addUser($user) {
    $db = DB::getDB();
//     $user['platform'] = $user['platform'] == NULL ? "web" : $user['platform'];
//     $user['pid'] = empty($user['pid']) ? 'NULL' : $user['pid'];
//     $user['token'] = empty($user['token']) ? 'NULL' : $user['token'];
//     $user['mail'] = empty($user['mail']) ? 'NULL' : $user['mail'];
    $user['name'] = empty($user['name']) ? 'NULL' : $user['name'];
    $user['pass'] = empty($user['pass']) ? 'NULL' : $user['pass'];

//     $model = mysql_real_escape_string(json_encode($user));

    $query = "insert into user(name, password)  values('{$user['name']}','{$user['pass']}')";

    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    
//     $user_id=mysql_insert_id();
//     $query = "insert into user_platform(id, user_id, platform, pid, token, email) values (NULL, ".$user_id.",'{$user['platform']}','{$user['pid']}','{$user['token']}','{$user['mail']}')";
//     mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
	
//     $query = "insert into email_send(id, user_id, type,flag)  values(NULL,".$user_id.",'1',0)";
//     mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
	
    return true;
  }

  function checkMail($email) {
    $db = DB::getDB();
    $query = "select * from user_platform where email = '{$email}'";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:" . mysql_error());
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
    return $row;
  }

  /*检查邮件是否已经发送成功！*/
  function checkSendEmail($user_id){
    $db = DB::getDB();
    $query = "select * from email_send where user_id = '{$user_id}'";
    $res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:" . mysql_error());
    $row = mysql_fetch_array($res, MYSQL_ASSOC);
	if($row){
		if($row['flag']==1){
		  return 1;
		} else {
		  return 0;	
		}
	} else {
		return 0;	
	}
  }
  
  /*邮件发送成功后修改发送状！*/
  function updateEmailSend($user_id,$type){
  	$db = DB::getDB();
    $json_text = json_encode($interview_session);
    $query = "update email_send set flag=1 WHERE user_id={$user_id} and type='{$type}' order by id desc limit 1";
	
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    if (mysql_affected_rows() == 0) {
      return false;
    }
	return true;
  }
  
  //修改用户状态为已邮件验证通过用户
  function verifyChange($user_id){
  	$db = DB::getDB();
    $json_text = json_encode($interview_session);
    $query = "update user_platform set flag=1 WHERE user_id={$user_id}";
	
    mysql_query($query,$db) or die("Invalid query: " .$query. " error:". mysql_error());
    error_log($query);
    if (mysql_affected_rows() == 0) {
      return false;
    }
	 return true;
  }
}
