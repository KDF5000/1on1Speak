<?php
/**
 * The configuration for all global constants. 
 *
 * @copyright  Copyright (c) 2013  1on1Speak.com
 * @version    0.1
 * @author  KDF5000 $
 * @Date    2013.12.23
 */

define('_', DIRECTORY_SEPARATOR);
define('CONF', dirname(__file__) . _);
define('COMMON', dirname(CONF) . _);
define('ROOT', dirname(COMMON). _ );
define('UTIL', COMMON . 'Util'._);

/**
 * Home模块
 */
define('HOME',ROOT.'Home'._);
define('CONTROLLERS',HOME.'Controller'._);
define('MODEL',HOME.'Model'._);
define('VIEW',HOME.'View'._);
define('JS',VIEW.'js'._);
define('CSS',VIEW.'css'._);
define('IMAGES',VIEW.'images'._);
define('TEMPLATES',VIEW.'templates'._);
define('HTML',VIEW.'html'._);
/**
 * web根目录下的其他目录
 */
define('LIBS',ROOT.'libs'._);
define('RUNTIME',ROOT.'Runtime'._);
define('UPLOAD',ROOT.'Data'._.'upload'._);
/**
 * 数据库的相关信息
 */
define( "MYSQLHOST" , 'localhost' );
define( "MYSQLDB" , '1on1speak' );
define( "MYSQLUSR" , 'root' );
define( "MYSQLPASS" , '123' );

define('SITE','http://'.$_SERVER['HTTP_HOST'].'/');
?>
