<!-- login form start-->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
	<div class="modal-content">
	
		<ul class="nav nav-tabs nav-justified" id="myTab">
		  <li class="active"><a href="#login" data-toggle="tab">登录</a></li>
		  <li><a href="#signup" data-toggle="tab">注册</a></li>
		</ul>

		<div class="tab-content">
		  <!--login from -->
		  <div class="tab-pane active" id="login">
		  	<div class="errMsg" id="loginErrMsg"></div>
			<form role="form" class="form-signin" method="post" action="" id="loginForm">
				<div class="input-group input-group-lg">
				  <span class="input-group-addon">
					<i class="icon-envelope"></i>
				  </span>
				  <input type="email" class="form-control"  placeholder="邮箱地址" name="userName">
				</div>
				</p>
				<div class="input-group input-group-lg">
				  <span class="input-group-addon">
					<i class="icon-lock">&nbsp;</i>
				  </span>
				  <input type="password" class="form-control"  placeholder="密码" name="password">
				</div>
				</p>
				<a href="#">忘记密码?</a>
				</p>						
				<br>
				<button type="button" class="btn btn-primary btn-lg btn-block" id="loginBt">登录</button>					
			</form>
		  </div>
			
		  <!--signup from -->
		  <div class="tab-pane" id="signup">
		  	<div class="errMsg" id="signErrMsg"></div>
			<form role="form" class="form-signin" method="post" action="" id="signForm">
				<div class="input-group input-group-lg">
				  <span class="input-group-addon">
					<i class="icon-envelope"></i>
				  </span>
				  <input type="text" class="form-control"  placeholder="邮箱地址" name="userName">
				</div>
				</p>
				<div class="input-group input-group-lg">
				  <span class="input-group-addon">
					<i class="icon-lock">&nbsp;</i>
				  </span>
				  <input type="password" class="form-control"  placeholder="密码" name="password">
				</div>
				</p>
				<br>									
				<button type="button" class="btn btn-primary btn-lg btn-block" id="signBt">注册</button>
			</form>				  
		  </div>
		</div>


	</div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- login form end-->

