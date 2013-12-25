<?php
include_once ('DB.php');

class studentDao {
	
	/* 根据用户名查找用户 */
	function findStudentByUserName($UserName) {
		$db = DB::getDB ();
		$query = "select * from t_students where username={$UserName}";
		$res = mysql_query ( $query, $db ) or die ( "Invalid query: " . $query . " error:" . mysql_error () . " - " . mysql_errno () );
		$row = mysql_fetch_array ( $res, MYSQL_ASSOC );
		return $row;
	}
	
	
	//以下三组更新用户登陆信息的方法，需要合并为一个方法。
	//最好是引入框架，不然效率确实很低

	/**
	 * 登陆成功更新用户登陆信息
	 */
	function updateStuLoginInfoForSuc($UserName) {
		$db = DB::getDB ();
		
		// 更新最近登陆时间，并将登陆失败次数置0
		$query = "update t_students set login_fail_num=0,last_login_time=now() where userName={$UserName}";
		mysql_query ( $query, $db ) or die ( "Invalid query: " . $query . " error:" . mysql_error () . " - " . mysql_errno () );
		error_log ( $query );
		
		if (mysql_affected_rows ()) {
			return false;
		}
		return true;
	}
	
	/**
	 * 登陆失败更新用户登陆信息，只更新登陆失败时间
	 */
	function updateStuLoginFailTime($UserName) {
		$db = DB::getDB ();
		
		$query = "update t_students set last_login_fail = now() where userName={$UserName}";
		$res = mysql_query ( $query, $db ) or die ( "Invalid query: " . $query . " error:" . mysql_error () . " - " . mysql_errno () );
		
		error_log ( $query );
		if (mysql_affected_rows () == 0) {
			return false;
		}
		return true;
	}
	
	/**
	 * 登陆失败更新用户登陆信息，更新登陆失败时间，并将登陆失败次数加1
	 */
	function updateStuLoginFailInfo($UserName) {
		$db = DB::getDB ();
		
		$query = "update t_students set login_fail_num=login_fail_num+1 , last_login_fail =now() where userName={$UserName}";
		$res = mysql_query ( $query, $db ) or die ( "Invalid query: " . $query . " error:" . mysql_error () . " - " . mysql_errno () );
		
		error_log ( $query );
		if (mysql_affected_rows () == 0) {
			return false;
		}
		return true;
	}
	
	/**
	 * 更新用户状态
	 */
	function updateStSatus($UserName){
		
	}

}