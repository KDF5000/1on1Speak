<?php
/**
 * Home page module.
 *  - configure the template parameters for Home page.
 *  - (more functions)...
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-25 12:10:49
 * @author  helen $
 */
require_once CONTROLLERS.'Common'._.'Page.class.php';

class HomeController extends PageBase {
  public function main() {
    // Set the template's params
  	session_start();
    if(isset($_SESSION ["user"])){
	    include TEMPLATES._.'Home'._.'home.tpl';
    } else {
    	include TEMPLATES.'index.tpl';
    }
  }
}
?>