<?php

include_once (MODEL.'Dao/DB.php');

class UserDaoTest {
	/*通过邮件查找用户*/
	function findUserByMail($userMail)
	{
		$db = DB::getDB();
		$query = "select * from user where userName='$userMail'";
		$res = mysql_query($query,$db) or die("Invalid query: " .$query. " error:" . mysql_error());
		error_log($query);
		$row = mysql_fetch_array($res, MYSQL_ASSOC);
		return $row;
	}
	/*
	 * function:addUser,return ture or false
	 * author:KDF5000
	 * Date:2013-12-14
	 */
	function addUser($user)
	{
		$db = DB::getDB();
		if(!is_array($user))
		{
			return false;
		}
		else 
		{
			$userName = $user['name'];
			$password = $user['pass'];
			
			$query = "insert user(userName,password) values('$userName','$password')";
			$res = mysql_query($query) or die("Invalid query: " .$query. " error:" . mysql_error());
			error_log($query);
			return $res;
		}
	}
}

?>