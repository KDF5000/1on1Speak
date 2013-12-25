window.getTemplate = function(t,objs) {
  for(var k in objs) {
    var reg = new RegExp('\%\{'+k+'\}','g');
    t = t.replace(reg,objs[k]);
  }
  return t;
};

var CHAT_INTERVAL_TIME = 2000;

$scope.inGetMessages = false;

$scope.otherChat = ['<div class="xinx xright">',
                    	'<div class="l"><img src="%{UIMAGE}"></div>',
                        '<div class="r"><span></span><p>%{CONTENT}</p></div>',
                    '</div>'].join('');
$scope.selfChat = ['<div class="xinx">',
                    	'<div class="l"><img src="%{UIMAGE}"></div>',
                        '<div class="r"><span></span><p>%{CONTENT}</p></div>',
                    '</div>'].join('');

var appendToChatElem = function(chatElm) {
	var html = $scope.otherChat;
	if(chatElm.uid == $scope.uid) {
		html = $scope.selfChat;
	}
	$(getTemplate(html,{
        'UIMAGE' : chatElm.uimage,
        'CONTENT' : chatElm.content
      })).appendTo('#chatContent');
}

$scope.lastChatId = 0;

var chatArea = $('#chatArea');
var chatSendBtn = $('#chatSendBtn');

$.ajax({
    type: "POST",
    //url: "/1on1speak/web/index.php?m=chat&a=getPreviousContent",
    url: "/chat/getContent/",
    dataType:'json', 
    data: 'rid='+$scope.rid,
    success: function(data) {
    	//{code:0,data:[{uid:'123',uimage:'/images/shead1.jpg',content:'test 123'}...]}
    	if(data.code == 0) {
    		data = data.data;
    		for(var i=0; data[i]; i++) {
    			appendToChatElem(data[i]);
                $scope.lastChatId = data[i].cid;
    		}
			
    	} else {
    		alert(data.msg);
    	}
    	$('.J_chatLoading').remove();
    	chatArea.removeAttr('disabled');
    	chatSendBtn.removeAttr('disabled');
    },
    error:function() {
    	alert('获取失败...');
    	$('.J_chatLoading').remove();
    	chatArea.removeAttr('disabled');
    	chatSendBtn.removeAttr('disabled');
    }
});

var sendData = function(val) {
    var data = [];
    data.push('rid='+$scope.rid);
    data.push('content='+encodeURIComponent(val));
    chatArea.attr('disabled','true');
    chatSendBtn.attr('disabled','true');
    $.ajax({
        type: "POST",
        url: "/chat/sendContent/",
        dataType:'json', 
        data: data.join('&'),
        success: function(data) {
            if(data.code == 0) {
                chatArea.val('');
                getChatMessages();
            } else {
                alert(data.msg);
            }
            chatArea.removeAttr('disabled');
            chatSendBtn.removeAttr('disabled');
        },
        error:function() {
            alert('提交失败...');
            chatArea.removeAttr('disabled');
            chatSendBtn.removeAttr('disabled');
        }
    });
}

chatSendBtn.on('click',function(){
    var val = $.trim(chatArea.val());
    if(val) {
        sendData(val);
    }
    return false;
});

chatArea.on('keydown',function(e){
    var val = $.trim(this.value);
	if(e.keyCode == 13 && val) {
        sendData(val);
	}
});


var getChatMessages = function() {
    if ($scope.inGetMessages) {
        return;
    }
    $scope.inGetMessages = true;
    var data = [];
    data.push('rid='+$scope.rid);
    data.push('cid='+$scope.lastChatId);
    //上传代码
    $.ajax({
        type: "POST",
        //url: "/1on1speak/web/index.php?m=chat&a=getContent",
        url: "/chat/getContent/",
        dataType:'json', 
        data: data.join('&'),
        success: function(data) {
            if(data.code == 0 && !$('.J_chatLoading')[0]) {
                data = data.data;
                for(var i=0; data[i]; i++) {
                    appendToChatElem(data[i]);
                    $scope.lastChatId = data[i].cid;
                    $("#scroll_message").scrollTop($("#scroll_message")[0].scrollHeight); 
                }
            }
            $scope.inGetMessages = false;
        },
        error:function() {
                $scope.inGetMessages = false;
        }
    });
}

setInterval(function(){getChatMessages();}, CHAT_INTERVAL_TIME);
