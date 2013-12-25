<?php
	require 'Common'.DIRECTORY_SEPARATOR.'Config'.DIRECTORY_SEPARATOR.'config.php';
	require CONTROLLERS.'Application.class.php';
	$app = new Application();
	$app->run();	

