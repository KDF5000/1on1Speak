<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html"; charset="utf-8" />
<meta name="description" content="">
<meta name="keywords" content="">
<link href="/css/course.css" rel="stylesheet" media="screen">
<?php include TEMP.'tpl/common.tpl'; ?>
<title>1on1speak</title>
</head>
<body>
<?php 
if(empty($_POST['userName'])){
?>
<form name="form1" action="" method="post">
  <div id="selectRole" style="margin:auto; width:180px; padding:50px; margin-top:100px; font-family:Verdana, Geneva, sans-serif; border:1px solid #CCC;">
    用户名：<input name="userName" id="userName" style="width:120px;"/><br /><BR />
    选角色：<select id="role" name="role"><option value="2">老师</option><option value="1">学生</option></select><BR />
    <input type="submit" value="进入" style="float:right;">
  </div>
</form>
<?php }else{?>

<?php include TEMP.'tpl/header_n.tpl'; ?>
<div class="er_c">
	<div class="c_r">
		<div><img src="/images/banimg.jpg" width="710" height="468" /></div>
		<a href="#" class="lefta"></a>
		<a href="#" class="righta"></a>
		<div class="c-btn">
			<div class="c-btnl"><a href="#" class="a"></a><a href="#" class="b"></a><a href="#" class="c"></a></div>
			<div class="c-btnrbg"></div>
		</div>
	</div>
	<div class="c_l">
		<div class="l-jp">
			<h3></h3>
			<div id="camera_teacher" style="height:194px;"></div>
			<div class="l-m"></div>
		</div>
		<div class="l-xx">
			<div>Lisa Cuddy<span><img src="/images/fla.png" width="14" height="13" /><img src="/images/fla.png" width="14" height="13" /><img src="/images/half.png" width="13" height="13" /></span></div>
			<p>
			Hello, my name is Lori and I am a professional educator with 16 years experience working with students of all ages. I started my career in 1997 as a Resource Specialist, teaching English and Algebra to high school aged students with special needs. After earning my Masters Degree in Counseling and Psychology, I worked as a Counselor
			Hello, my name is Lori and I am a professional educator with 16 years experience working with students of all ages. I started my career in 1997 as a Resource Specialist, teaching English and Algebra to high school aged students with special needs. After earning my Masters Degree in Counseling and Psychology, I worked as a Counselor
			</p>
		</div>
	</div>
	<div class="clear"></div>
</div>


<div class="er_c2">
	<div class="renyxx">
		<div class="myvid">
			<h3></h3>
			<div id="camera_student" style="height:240px;"></div>
			<div class="myname"></div>
		</div>
		<div class="qtreny">
			<div class="qnav"><span>隐藏其他用户</span></div>
			<div class="qitaren" id="otherStudent" style="float:left; width:335px;">
				
			</div>
		</div>
	</div>
	<div class="jishichat" id="scroll_message" style="overflow-x: hidden;overflow-y: auto;">
		<h3></h3>
		<div class="" id="chatContent" style="visibility: visible;">
		</div>
	</div>
	<div class="clear"></div>
	<div class="search">
		<div class="s-inp">
			<a href="#" class="sa1"></a>
			<a href="#" class="sa2"></a>
			<a href="#" class="sa3"></a>
			<a href="#" class="sa4"></a>
			<input name="keyTxt" id="chatArea" type="text" value="说点什么吧...."/>
		</div>
		<div class="s-btn"  id="chatSendBtn" ><a href="#"></a></div>
	</div>
</div>
<br />
<br />
<?php include TEMP.'tpl/foot.tpl'; ?></body>
<script>
    window.$scope = <?php echo json_encode($pageInfo); ?>;
    require(["/js/pages/"+$scope.pageId+".js"]);
</script>
<?php }?>
</html>