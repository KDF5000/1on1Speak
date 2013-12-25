window.jsurl = null;
if(navigator.userAgent.toLowerCase().indexOf('chrome') > 0) {
    jsurl = '/js/_tokhtml5.js';
} else {
    jsurl = '/js/tokflash.js';
}

require([jsurl,'/js/video/videoTemplete.js'],function(){

	var apiKey = $scope.apiKey;
    var sessionId = $scope.sessionId;
    var token = $scope.token;

	TB.setLogLevel(TB.ERROR);
    function sessionConnectedHandler(event) {
	  if($scope.userType == 2){
        session.publish(PublishManager.create({'type':'teacher_pub','name':$scope.userName}));
	  } else {
	    session.publish(PublishManager.create({'type':'student_pub','name':$scope.userName}));
	  }

      // Subscribe to streams that were in the session when we connected
      subscribeToStreams(event.streams);
    }

    function streamCreatedHandler(event) {
      // Subscribe to any new streams that are created
      subscribeToStreams(event.streams);
    }

    function subscribeToStreams(streams) {
      for (var i = 0; i < streams.length; i++) {
        // Make sure we don't subscribe to ourself
        if (streams[i].connection.connectionId == session.connection.connectionId) {
          return;
        }
		datas=streams[i].name.split("|||");
		if(datas[1]=="2"){
          PublishManager.create({'type':'teacher_sub','session':session,'stream':streams[i]})
		} else {
		  PublishManager.create({'type':'student_sub','session':session,'stream':streams[i]})
		}
		
      }
    }
    window.session = TB.initSession(sessionId);
    session.addEventListener('sessionConnected', sessionConnectedHandler);
    session.addEventListener('streamCreated', streamCreatedHandler);
    session.connect(apiKey, token);
});