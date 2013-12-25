<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html"; charset="utf-8" />
<meta name="description" content="">
<meta name="keywords" content="">
<link href="/css/course.css" rel="stylesheet" media="screen">
<?php include TEMP.'tpl/common.tpl'; ?>
<title>注册－1on1speak</title>
</head>
<body>
<?php include TEMP.'tpl/header_n.tpl'; ?>

<div class="rt-box">
	<div class="rt-l curr"><span></span><div class="xx">填写基本信息</div></div>
	<div class="rt-c"><span></span><div class="xx">填写高级信息</div></div>
	<div class="rt-r"><span></span><div class="xx">完成</div></div>
</div>

<div class="rt-xx">
	<div class="rt-bt">填写基本信息</div>
	<ul class="rt-lginp">
		<li class="rem">
			<span>注册邮箱：</span>
			<div class="inpbox">
				<input name="" type="text"/>
			</div>
			<div class="prompt-xx w">
				输入的邮箱有误
			</div>
		</li>
		<li class="rmm">
			<span>密码：</span>
			<div class="inpbox">
				<input name="" type="password" class="mm" />
			</div>
			<div class="prompt-xx y">
				输入正确
			</div>
		</li>
		<li class="rname">
			<span>英文名字：</span>
			<div class="inpbox">
				<input name="" type="text"/>
			</div>
			<div class="prompt-xx y">
				输入正确
			</div>
		</li>
		<li>
			<a href="#" class="rtbtn"></a>
			<a href="#" class="rtbtn2"></a>
		</li>
	</ul>
</div>



<div class="rt-xx">
	<div class="rt-bt">填写高级信息</div>
	<ul class="rt-lginp ad">
		<li>
			<span>请选择您的性别：</span>
			<label for="a1"><input name="a1" type="radio" value="" id="a1"/>男</label>
			<label for="a2"><input name="a1" type="radio" value="" id="a2"/>女</label>
		</li>
		<li>
			<span>请输入您的当前学历：</span>
			<label for="a"><input name="a" type="radio" value="" id="a"/>小学</label>
			<label for="b"><input name="a" type="radio" value="" id="b"/>初中</label>
			<label for="c"><input name="a" type="radio" value="" id="c"/>高中</label>
			<label for="d"><input name="a" type="radio" value="" id="d"/>大学</label>
			<label for="e"><input name="a" type="radio" value="" id="e"/>硕士</label>
			<label for="f"><input name="a" type="radio" value="" id="f"/>博士</label>
			<label for="g"><input name="a" type="radio" value="" id="g"/>其他</label>
		</li>
		<li>
			<span>您的口语水品比同学：</span>
			<label for="c1"><input name="c1" type="radio" value="" id="c1"/>好很多</label>
			<label for="c2"><input name="c1" type="radio" value="" id="c2"/>略好</label>
			<label for="c3"><input name="c1" type="radio" value="" id="c3"/>差不多</label>
			<label for="c4"><input name="c1" type="radio" value="" id="c4"/>稍差</label>
			<label for="c5"><input name="c1" type="radio" value="" id="c5"/>差很多</label>
		</li>
		<li>
			<span>您的词汇量比同学：</span>
			<label for="k1"><input name="a3" type="radio" value="" id="k1"/>好很多</label>
			<label for="k2"><input name="a3" type="radio" value="" id="k2"/>略好</label>
			<label for="k3"><input name="a3" type="radio" value="" id="k3"/>差不多</label>
			<label for="k4"><input name="a3" type="radio" value="" id="k4"/>稍差</label>
			<label for="k5"><input name="a3" type="radio" value="" id="k5"/>差很多</label>
		</li>
		<li>
			<span>您参加过以下哪种考试：</span>
			<label for="s1"><input name="s1" type="radio" value="" id="s1"/>CET-4</label>
			<label for="s2"><input name="s1" type="radio" value="" id="s2"/>CET-6</label>
			<label for="s3"><input name="s1" type="radio" value="" id="s3"/>TOEFL</label>
			<label for="s4"><input name="s1" type="radio" value="" id="s4"/>GRE</label>
			<label for="s5"><input name="s1" type="radio" value="" id="s5"/>GMAT</label>
			<label for="s6"><input name="s1" type="radio" value="" id="s6"/>IELTS</label>
		</li>
		<li>
			<span>您的考试分数是：</span>
			<div>TOFEL<input name="" type="text" class="fens" style="margin-left:10px"/></div>
		</li>
		<li class="mudi">
			<span>您练习口语的最主要目的是：</span>
			<div style="height:64px">
				<label for="m1"><input name="m" type="checkbox" value="" id="m1"/>出国留学</label>
				<label for="m2"><input name="m" type="checkbox" value="" id="m2"/>工作需要</label>
				<label for="m3"><input name="m" type="checkbox" value="" id="m3"/>自我成长</label>
				<label for="m4"><input name="m" type="checkbox" value="" id="m4"/>矫正发音</label><br />

				<label for="m5"><input name="m" type="checkbox" value="" id="m5"/>出国旅游</label>
				<label for="m6"><input name="m" type="checkbox" value="" id="m6"/>结交外国友人</label>
				<label for="m7"><input name="m" type="checkbox" value="" id="m7"/>个人爱好</label>
				<label for="m8"><input name="m" type="checkbox" value="" id="m8"/>其他</label>
			</div>
		</li>
		<li>
			<span>您当前在哪个城市：</span>
			<div>
				<select name="" class="set">
					<option value="opt1">北京</option>
					<option value="opt2">上海</option>
					<option value="opt3">深圳</option>
					<option value="opt4">广州</option>
				</select>
			</div>
		</li>
		<li>
			<span>请输入您的联系电话：</span><div><input name="" type="text" class="fens" style="width:120px"/></div>
		</li>
		<li class="mudi">
			<span>请选择您的爱好：</span>
			<div style="height:64px">
				<label for="l1"><input name="l1" type="checkbox" value="" id="l1"/>电影</label>
				<label for="l2"><input name="l1" type="checkbox" value="" id="l2"/>体育</label>
				<label for="l3"><input name="1l" type="checkbox" value="" id="l3"/>人文</label>
				<label for="l4"><input name="l1" type="checkbox" value="" id="l4"/>政治</label><br />

				<label for="l5"><input name="l1" type="checkbox" value="" id="l5"/>旅游</label>
				<label for="l6"><input name="l1" type="checkbox" value="" id="l6"/>美食</label>
				<label for="l7"><input name="l1" type="checkbox" value="" id="l7"/>建筑</label>
				<label for="l8"><input name="l1" type="checkbox" value="" id="l8"/>音乐</label>
			</div>
		</li>

		
		<li>
			<a href="#" class="rttjbtn"></a>
		</li>
	</ul>
</div>




<div class="rt-xx">
	<div class="rt-bt">注册成功</div>
	<ul class="rt-lginp" style="padding:64px 0">
		<li class="rt-cg"><h4>感谢您的注册！</h4></li>
		<li class="rt-btn" style="text-align:center">
			<a href="#" class="rt-home">点击访问首页</a>
			<a href="#" class="rtbtn2"></a>
		</li>
	</ul>
	<br />
	<br />
</div>




<div class="otherrm">
	<div class="otherrm-jp">
		<h4>使用合作账号登录</h4>
		<h5>Jenifer Lawrence（教师姓名）</h5>
		已教授学生207名，总计572课时<br />爱好：历史、地理、音乐
	</div>
	<div class="otherrm-kc">
		<h4>使用合作账号登录</h4>
		<h5>Jenifer Lawrence（教师姓名）</h5>
		推荐课程推荐课程推荐课程推荐课程推荐课程推荐课程推荐课程
	</div>	
	<div class="otherrm-st">
		<h4>使用合作账号登录</h4>
		<h5>Jenifer Lawrence（教师姓名）</h5>
		免费试听免费试听免费试听免费试听免费试听免费试听免费试听
	</div>
	<div class="clear"></div>
</div>

<?php include TEMP.'tpl/foot.tpl'; ?>
</body>
</html>


