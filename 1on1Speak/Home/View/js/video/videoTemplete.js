window.getTemplate = function(t,objs) {
  for(var k in objs) {
    var reg = new RegExp('\%\{'+k+'\}','g');
    t = t.replace(reg,objs[k]);
  }
  return t;
};

$scope.videoTemplete = ['<div class="J_videoContent" pid="%{VIDEOID}">',
                      '<div class="ipage-video">',
                            '<div id="video_%{VIDEOID}" style="width:950px;height:450x;overflow:hidden;"></div>',
                        '</div>',
                        '<div class="ipage-video_info">',
                            '<div class="myname">%{VIDEONAME}</div>',
                            '<i class="i-mcamera span2" id="takePicture_%{VIDEOID}"></i>',
                            '<i class="i-mic span2" id="voiceControl_%{VIDEOID}"></i>',
                        '</div>',
                    '</div>'].join('');

(function(namespace){

  var apiKey = $scope.apiKey;
  var sessionId = $scope.sessionId;
  var token = $scope.token;

  var pm = function(){
    this.indexs = 0;
    this.publishs = [];
    this.suber = [];
    this.total = 0;
  };

  pm.prototype.__bindEvent = function(index) {
    var me = this;
    $('#takePicture_'+index).click(function(){
      var imgData = me.publishs[index].getImgData();

      var img = document.createElement("img");
      img.setAttribute("src", "data:image/png;base64," + imgData);
      var imgWin = window.open("about:blank", "Screenshot");
      imgWin.document.write("<body></body>");
      imgWin.document.body.appendChild(img);
    });
    $('#voiceControl_'+index).click(function(){
      if(this.getAttribute('noned')) {
        me.publishs[index].publishAudio(true);
        this.removeAttribute('noned');
      } else {
        me.publishs[index].publishAudio(false);
        this.setAttribute('noned',1);
      }
    });
  }

  //
  pm.prototype.__hadThisStream = function(stream) {
    var sArr = this.suber;
    for(var i=0; sArr[i]; i++) {
      if(sArr[i].streamId == stream.streamId) {
		  
        //console.log('sessionId相同，为：'+sArr[i].streamId);
        return true;
      }
    }
    //console.log('新sessionId，为：'+stream.streamId);
    return false;
  }

  //自己的视频
  pm.prototype.create = function(params) {
    var me = this;
    switch(params.type) {
      case 'teacher_pub' : 
	    //初始化生成的stream中的参以用来判用户的角色及名称
	    var name = params.name || '';
		names=name.split("|||");
	    var properties = {width:258, height:194, name:name};
        $(getTemplate($scope.videoTemplete,{
          'VIDEOID' : me.indexs,
          'VIDEONAME' : names[0]
        })).appendTo('#camera_teacher');
        var publisher = TB.initPublisher(apiKey, 'video_'+this.indexs,properties);
        this.publishs.push(publisher);
        this.__bindEvent(this.indexs);
        this.total++;
        this.indexs++;
        return publisher;
	  case 'student_pub' : 
	    var name = params.name || '';
		names=name.split("|||");
	    properties = {width: 320, height:240, name:name};
        $(getTemplate($scope.videoTemplete,{
          'VIDEOID' : me.indexs,
          'VIDEONAME' : names[0]
        })).appendTo('#camera_student');
        var publisher = TB.initPublisher(apiKey, 'video_'+this.indexs,properties);
        this.publishs.push(publisher);
        this.__bindEvent(this.indexs);
        this.total++;
        this.indexs++;
        return publisher;
      case 'student_sub' :
	    properties = {width: 159, height:133};
		names=params.stream.name.split("|||");
        if(!me.__hadThisStream(params.stream)) {
          $(getTemplate($scope.videoTemplete,{
            'VIDEOID' : me.indexs,
            'VIDEONAME' : names[0]
          })).appendTo('#otherStudent');
          params.session.subscribe(params.stream, 'video_'+this.indexs,properties);
          $('#takePicture_'+this.indexs).hide();
          $('#voiceControl_'+this.indexs).hide();
          me.suber.push(params.stream);
          this.total++;
          this.indexs++;
        }
      case 'teacher_sub' :
	    properties = {width: 258, height:194};
		names=params.stream.name.split("|||");
        if(!me.__hadThisStream(params.stream)) {
          $(getTemplate($scope.videoTemplete,{
            'VIDEOID' : me.indexs,
            'VIDEONAME' : names[0]
          })).appendTo('#camera_teacher');
          params.session.subscribe(params.stream, 'video_'+this.indexs,properties);
          $('#takePicture_'+this.indexs).hide();
          $('#voiceControl_'+this.indexs).hide();
          me.suber.push(params.stream);
          this.total++;
          this.indexs++;
        }
    }
  };

  namespace.PublishManager = new pm();
})(window);