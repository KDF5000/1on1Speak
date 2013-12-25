<?php
/**
 * PageBase - the base class for all the controller.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-25 12:10:49Z 
 * @author  helen $
 */

class PageBase {
  function run($action) {	
    $this->$action();
  }
}
?>