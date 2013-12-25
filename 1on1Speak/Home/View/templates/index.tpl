<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>1on1speak</title>
        <?php include TEMPLATES.'Common/common.tpl'; ?>
		<style type="text/css">
			.form-signin {
			  max-width: 550px;
			  padding: 50px;
			  margin: 0 auto;
			}
		
			.errMsg {
				display:none;
				height: 45px;
				width : 100%;
				text-align:center;
				line-height:45px;	
				color:white;
				background-color:#DF4444;
			}
			
			#photo-banner {
				background-size: cover;
				height: 492px;
				border-bottom: 1px solid #efefef;
				background: url("/Home/View/images/together.jpg") center no-repeat;
				background-color: #fff;
				min-width: 880px;
			}
			
		</style>
  </head>

  <body style="">
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><span class="color-teal">1on1</span>speak</a></a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="index.php?m=classinfo&a=main">公开课</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" id="logul">
            <li><a href="#" onclick="showTab(0)">登录</a></li>
            <li><a href="#">|</a></li>
            <li><a href="#" onclick="showTab(1)">注册</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">
      <div id="photo-banner" class="jumbotron"></div>
	  <?php include TEMPLATES.'User/login.tpl'; ?>
    </div><!-- /.container -->



	<script>
		$('#myTab a').click(function (e) {
	
		})

		function showTab(liNum){
			$('#myModal').modal('show');
			if (liNum == 0)
			{
				$('#myTab a:first').tab('show');
			} else {
				$('#myTab a:last').tab('show');
			}	
		}
		

	   $(function(){
	   		// 登录校验
		    $("#loginBt").on('click',function(event){
		    	var isSubmit = true;
		    	var data = [];
		    	$('input',$('#loginForm')).each(function (i,field) {
		    		var el = $(field);
		    		var name = field.name;
		    		var value = el.val().trim();
		    		if (value == '') {
		    			$('#loginErrMsg').show();
		    			$('#loginErrMsg').text(field.placeholder+"必填");
		    			isSubmit = false;
		    			return false;
		    		} else {
		    			if (field.type == "email") {
			    			var result = (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value));
			    			if (result) {
				    			$('#loginErrMsg').show();
				    			$('#loginErrMsg').text("请输入合法的邮箱地址");
				    			isSubmit = false;
				    			return false;
			    			}
		    			}
		    		}
		    		data.push(field.name+"="+value);
		    	});
		    
		    	if (isSubmit) {
		    		$('#errMsg').hide();
		    		var url = "/index.php?m=User&a=login";
					$.ajax({
					    type: "POST",
					    url: url,
				        dataType:'json', 
				        data: data.join('&'),
					    success: function(data) {
					    	//location.href="/index.php?m=home";
					    	if (data.success) {
					    		alert(data.msg);
					    		//$('#loginForm').reset();
						    	location.reload();
					    	} else {
					    		$('#loginErrMsg').show();
				    			$('#loginErrMsg').text(data.msg);
					    	}
					    },
					    error:function() {
					    	location.reload();
					    }
					});	
		    	}
		    });	   	
		    
		    
		    // 注册
		    $("#signBt").on('click',function(event){
		    	var isSubmit = true;
		    	var data = [];
		    	$('input',$('#signForm')).each(function (i,field) {
		    		var el = $(field);
		    		var name = field.name;
		    		var value = el.val().trim();
		    		if (value == '') {
		    			$('#signErrMsg').show();
		    			$('#signErrMsg').text(field.placeholder+"必填");
		    			isSubmit = false;
		    			return false;
		    		} else {
		    			if (field.type == "email") {
			    			var result = (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value));
			    			if (result) {
				    			$('#signErrMsg').show();
				    			$('#signErrMsg').text("请输入合法的邮箱地址");
				    			isSubmit = false;
				    			return false;
			    			}
		    			}
		    		}
		    		data.push(field.name+"="+value);
		    	});
		    	
		    
		    	if (isSubmit) {
		    		$('#errMsg').hide();
					$.ajax({
					    type: "POST",
					    url: "index.php?m=User&a=signup",
				        dataType:'json', 
				        data: data.join('&'),
					    success: function(data) {
					    	if (data.success) {
					    		//$('#signForm').reset();
					    		alert(data.msg)
						    	location.reload();
					    	} else {
					    		$('#signErrMsg').show();
				    			$('#signErrMsg').text(data.msg);
					    	}
					    },
					    error:function() {
					    	location.reload();
					    }
					});	
		    	}
		    });		    
		    	  
	   });

	</script>
</body></html>