<?php
/**
 * Database wrapper and utils functions.
 *
 * @copyright  Copyright (c) 2013  1on1speak.com Technologies(http://www.1on1speak.com)
 * @version    2013-06-09 10:33:11Z 
 * @author     chengxu $
 */

class DB {
  public static function getDB() {
    $db = mysql_connect(MYSQLHOST,MYSQLUSR,MYSQLPASS);
    if(!$db) {
      echo 'Error: ' . mysql_errno() . ' - ' . mysql_error();
    }
    mysql_query("set names utf8");
    $res = mysql_select_db(MYSQLDB, $db);
    return $db;
  }
}

?>