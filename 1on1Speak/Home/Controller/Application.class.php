<?php
/**
 * Main application entry point.
 *  - Parse the http request, route the request to the controller
 *    and execute the specified actions.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-25 12:10:49Z 
 * @author  helen $
 */

class Application
{
  
  /**
   * The module to load, parsed from request URL.
   *
   * @var string
   * @access private
   */
  var $module = '';  //应用模块，指小模块
  var $controller = '';//小模块下的控制器
  /**
   * The action of the module to be invoked, parsed from request URL.
   *
   * @var string
   * @access private
   */
  var $action = '';  //控制器的方法（动作）

  function Application() {
  }
  //获取模块
  function getModule() {
    $this->module = (empty($_GET['m'])) ? 'Home':($_GET['m']);
    $this->module = ucfirst($this->module);
    return $this->module;
  }
  //获取控制器
  function getController(){
    $this->controller = ((empty($_GET['c'])) ? ($this->module.'Controller'):($_GET['c'] . 'Controller'));

    return $this->controller;
  }
  //获取控制器的动作（方法）
  function getAction() {
    return $this->action = (empty($_GET['a'])) ? 'main' : $_GET['a'];
  }

  function handleError() {
    // TODO(helen): Add comprehensive error handling code here
    //  - Showing debug trace in DEBUG mode.
    //  - Showing a friendly error page in PRODUCTION mode.
    header('Location: /');
    exit;
  }

  function run() {
    // Parse the module ,controller, action from URL
    $this->getModule();
    $this->getController();
    $this->getAction();

    // Load the controller
    $controller_file = CONTROLLERS.$this->module._.$this->controller.'.class.php';
    if(!file_exists($controller_file)){
      handleError();
    }
    require_once $controller_file;
    
    // Locate the classes and the method. Instantiate the class.
    if(!class_exists($this->controller)){
      handleError();
    }

    $class = new $this->controller;

    if(!method_exists($class,$this->action)){
      handleError();
    }

    // Invoke the action.
    $class->run($this->action);
  }
}
?>
