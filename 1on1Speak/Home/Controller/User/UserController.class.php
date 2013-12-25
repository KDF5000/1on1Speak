<?php
/**
 * student module
 */
require_once CONTROLLERS._.'Common'._.'Page.class.php';
include_once (MODEL.'Dao'._.'UserDaoTest.php');
		
class UserController extends PageBase {
	
	public function main() {
		// Set the template's params
		include TEMP.'index.tpl';
	}
	
 	/**
 	 * 用户登录
 	 */	
  	public function login() {
	  	$userName = $_POST['userName'];
	  	$password = $_POST['password'];
	  	$userDao = new UserDaoTest();

	  	$response = array();
	  	//判断用户是否存在
		$users = $userDao->findUserByMail($userName);
		$isLogin = false;
		if (is_array($users)) {
			for($i=0; $i<count($users); $i++) {
				if ($users ["password"] == $password) {
					$isLogin = true;
					break;
				}
			}
			
			if ($isLogin) {
				session_start();
				$_SESSION ["user"] = $userName; // 保存用户名
						
				$response = array(
					'success' => $isLogin,
					'msg' =>'登录成功！'
				);
			} else {
				$response = array(
					'success' => $isLogin,
					'msg' =>'用户密码错误！'
				);
			}
		} else { // 没有记录
			$response = array(
				'success' => $isLogin,
				'msg' =>'用户信息不存在！'
			);
		}
		
		echo json_encode($response);
  	}  
  	
  	/**
  	 * 用户注册
  	 */
  	public function signup() {
  		$userName = $_POST['userName'];
  		$password = $_POST['password'];
  		$userDao = new UserDao();
  		$response = array();
  		$user = array(
  			'name' => $userName,
  			'pass' => $password
  		);
  		$users = $userDao->findUserByName($userName);
  		//echo(is_array($users));
  		if (is_array($users)) {
  			$response = array(
  				'success' => false,
  				'msg' => $userName.'被占用！'
  			);
  		} else {
	  		$result = $userDao->addUser($user);
	  		if ($result) {
	  			session_start();
	  			$_SESSION ["user"] = $userName; // 保存用户名
	  			$response = array(
	  				'success' => true,
	  				'msg' => '注册成功！'
	  			);
	  		} else {
	  			$response = array(
	  				'success' => false,
	  				'msg' =>'注册失败！'
	  			);
	  		}
  		}
  		echo json_encode($response);
  	}
  	
  	
  	/**
  	 * 用户退出
  	 */
  	public function logout() {
  		session_start();
  		if(isset($_SESSION ["user"])){
  			session_unset (); // 删除会话
  			session_destroy ();
  		}
  		header('Location: /') ;
  	}

}
?>
