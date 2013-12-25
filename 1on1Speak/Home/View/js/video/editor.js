require(['/js/firepad/mode/apl/apl.js','/js/firepad/mode/asterisk/asterisk.js','/js/firepad/mode/clike/clike.js','/js/firepad/mode/clojure/clojure.js','/js/firepad/mode/cobol/cobol.js','/js/firepad/mode/coffeescript/coffeescript.js','/js/firepad/mode/commonlisp/commonlisp.js','/js/firepad/mode/css/css.js','/js/firepad/mode/d/d.js','/js/firepad/mode/diff/diff.js','/js/firepad/mode/ecl/ecl.js','/js/firepad/mode/erlang/erlang.js','/js/firepad/mode/gas/gas.js','/js/firepad/mode/gfm/gfm.js','/js/firepad/mode/go/go.js','/js/firepad/mode/groovy/groovy.js','/js/firepad/mode/haml/haml.js','/js/firepad/mode/haskell/haskell.js','/js/firepad/mode/haxe/haxe.js','/js/firepad/mode/htmlembedded/htmlembedded.js','/js/firepad/mode/htmlmixed/htmlmixed.js','/js/firepad/mode/http/http.js','/js/firepad/mode/javascript/javascript.js','/js/firepad/mode/jinja2/jinja2.js','/js/firepad/mode/less/less.js','/js/firepad/mode/livescript/livescript.js','/js/firepad/mode/lua/lua.js','/js/firepad/mode/markdown/markdown.js','/js/firepad/mode/mirc/mirc.js','/js/firepad/mode/ntriples/ntriples.js','/js/firepad/mode/ocaml/ocaml.js','/js/firepad/mode/pascal/pascal.js','/js/firepad/mode/perl/perl.js','/js/firepad/mode/php/php.js','/js/firepad/mode/pig/pig.js','/js/firepad/mode/properties/properties.js','/js/firepad/mode/python/python.js','/js/firepad/mode/q/q.js','/js/firepad/mode/r/r.js','/js/firepad/mode/rst/rst.js','/js/firepad/mode/ruby/ruby.js','/js/firepad/mode/rust/rust.js','/js/firepad/mode/sass/sass.js','/js/firepad/mode/scheme/scheme.js','/js/firepad/mode/shell/shell.js','/js/firepad/mode/sieve/sieve.js','/js/firepad/mode/smalltalk/smalltalk.js','/js/firepad/mode/smarty/smarty.js','/js/firepad/mode/sparql/sparql.js','/js/firepad/mode/sql/sql.js','/js/firepad/mode/stex/stex.js','/js/firepad/mode/tcl/tcl.js','/js/firepad/mode/tiddlywiki/tiddlywiki.js','/js/firepad/mode/tiki/tiki.js','/js/firepad/mode/turtle/turtle.js','/js/firepad/mode/vb/vb.js','/js/firepad/mode/vbscript/vbscript.js','/js/firepad/mode/velocity/velocity.js','/js/firepad/mode/verilog/verilog.js','/js/firepad/mode/xml/xml.js','/js/firepad/mode/xquery/xquery.js','/js/firepad/mode/yaml/yaml.js','/js/firepad/mode/z80/z80.js'],function(){
	$('#code').on('click',function(){
		var $th = $(this);
		if(!$th.attr('hasInited')) {
			$th.attr('hasInited','1');
			//var userId = Math.floor(Math.random() * 9999999999).toString();
			var userId = $scope.uid;
			var firepadRef = new Firebase('https://testohtest1.firebaseio.com/firepads/'+$scope.sessionId);
			//var firepadRef = new Firebase('https://testohtest1.firebaseio.com');
			var codeMirror = CodeMirror($('#firepad')[0], { lineWrapping: true,lineNumbers: true });
			var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
			  { userId : userId});
			firepad.on('ready', function() {
			  if (firepad.isHistoryEmpty()) {
			    firepad.setText('//code here');
			  }
			  $('#firepad .firepad').height($('#page2 .toolcon').height());
			});
			$scope.firepad = firepad;
			$scope.editor = codeMirror;
		}
	});

	$('#themeSele').on('change',function(){
		var theme = this.options[this.selectedIndex].innerHTML;
	    $scope.editor.setOption("theme", theme);
	});

	$('#lanSele').on('change',function(){
		var lan = this.options[this.selectedIndex].innerHTML;
		$scope.editor.setOption("mode", lan);
	});
});