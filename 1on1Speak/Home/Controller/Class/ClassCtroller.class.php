<?php
/**
 * student module
 */
require_once 'Page.class.php';
include_once (INC.'model/ClassInfoDao.php');

		
class ClassInfo extends PageBase {
	
	public function main() {
		include TEMP.'home.tpl';
	}
}
?>
