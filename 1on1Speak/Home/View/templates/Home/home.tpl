<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>1on1speak</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta name="author" content="stilearning" />

        <!-- google font -->
		<link href="http://fonts.googleapis.com/css?family=Aclonica:regular" rel="stylesheet" type="text/css" >
		<link rel="stylesheet" href="/libs/bootstrap-3.0.0-dist/css/bootstrap.min.css" />
		<link href="/Home/View/css/stilearn-helper.css" rel="stylesheet" />
		<link href="/libs/font-awesome/css/font-awesome.css" rel="stylesheet" />
		<link rel="stylesheet" href="/Home/View/css/matrix-style.css" />
		<link rel="stylesheet" href="/Home/View/css/matrix-media.css" />

<style type="text/css">
	.main-container {
		padding: 20px 50px;
		height:100%;
	}

	.top-header-panel{
		 width:100%;
		 height:60px;
		 margin:-20px 0px 0px 0px;
	}

	.top-header-left-panel{
		 width:auto;
		 height:60px;
		 margin-right:190px;
		 background-color:#2E363F;
	}
	.top-header-right-panel{
		 position:relative;
		 width:190px; 
		 height:60px;
		 background-color:#2E363F;
		 float:right;
		 color:white;
		 line-height:60px;
	}
		
	.panel-sitename{
		padding-left: 10px;
		font-size: 1.0em;
		font-family: 'Aclonica', serif;
		color: #F1F1F1;
		text-shadow: 0px 1px 1px #4d4d4d;
		line-height:60px;
	}

</style>


</head>
<body>
	<!--top-Header-menu-->
	<div class="top-header-panel">
		 <?php if(isset($_SESSION['user'])){?>
			 <div class="top-header-right-panel">
				<div class="btn-group">
				  <button type="button" class="btn btn-success">你有0节课</button>
				  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
					<span class="caret"></span>
					<span class="sr-only">Toggle Dropdown</span>
				  </button>
				  <ul class="dropdown-menu" role="menu">
					<li><a href="#">购买课程</a></li>
					<li><a href="#" onclick="goUserInfo()">用户中心</a></li>
					<li class="divider"></li>
					<li><a href="/user/logout/">退出</a></li>
				  </ul>
				</div>				
			 </div>  
		 <?php }else{ ?>
			 <div class="top-header-right-panel">
				<div>
				    <a>登录</a>
				    |
				    <a>注册</a>
				</div>	
			 </div>  		 
		 <?php }?>
		  
		 <div class="top-header-left-panel">
			<h2><a href="/" class="panel-sitename"><span class="color-teal">1on1</span>speak</a></h2>   			
		 </div>  
	</div>
	<!--close-top-Header-menu-->

	<!--sidebar-menu-->
	<div id="sidebar">
	  <ul>
		<li class="active">
			<a href="#">
				<div class="helper-font-32">
					<i class="icon-dashboard"></i>
				</div>
				<span>公开课</span>	
			</a>
		</li>
	  </ul>
	</div>
	<!--sidebar-menu-->

	<!--main-container-part-->
	<div id="content">
	<!--breadcrumbs-->
	  <div id="content-header">
		<div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-dashboard"></i>公开课</a></div>
	  </div>
	<!--End-breadcrumbs-->

		<div class="main-container">
			<iframe src="/Home/View/html/classinfo.html" id="mainFrame" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
		</div>
	</div>

	<!--end-main-container-part-->


	<script src="/libs/js/jquery.js"></script>
	<script src="/libs/bootstrap-3.0.0-dist/js/bootstrap.js"></script>

	<script>
		$('#sidebar a').click(function (e) {
			$("#mainFrame").attr("src","/Home/View/html/classinfo.html");
		})

		function goUserInfo() {
			$("#mainFrame").attr("src","/Home/View/html/userinfo.html");
		}
	</script>
</body>
</html>
