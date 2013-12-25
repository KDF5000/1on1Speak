<?php if(empty($_SESSION['user'])){?>
<div class="header">
    <div class="h_logo">
		<div class="h_link">
            <a href="http://www.sina.com.cn" class="a1">立即加入</a>
            <a href="#" class="a1">登  录</a>
            <a href="#" class="a2"></a>
            <a class="a3">合作账号登录</a>
            <a href="#" class="a4"></a>
            <a href="#" class="a5"></a>
            <a href="#" class="a6"></a>
        </div>
    	<a href="#"><img src="/images/logo.png" width="160" height="59" /></a>
    </div>
</div>
<?php }else{ ?>
<div class="header">
    <div class="h_logo">
		<div class="h_link">
			<a class="a3 a7">HI：阳顶天</a>
			<a class="a3">欢迎使用史比克英语！</a>
			<a href="#" class="a8">退 出</a>
        </div>
    	<a href="#"><img src="/images/logo.png" width="160" height="59" /></a>
    </div>
</div>
<?php }?>