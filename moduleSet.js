$.fn.moduleSet = function(opt){
	var setting = {
		button:[
			{text:'编辑',callback:function(){},iconfont:'&#xe648;'},
			{text:'美化',callback:function(){},iconfont:'&#xe63f;'},
			{text:'删除',callback:function(){},iconfont:'&#xe613;'},
		],
	}

	var options = $.extend({},setting,opt);
	var M = {};

	var _this = this;

	// 初始化
	M.init = function(){
		$(_this).css('position','relative');
		M.createStyle();
		M.createElem(function(){
			M.initShowModule();
		});
	}

	// 显示方法
	M.initShowModule = function(){
		$(_this).mouseenter(function(){
			$(_this).find('.panel-module-box').fadeIn(200);
		}).mouseleave(function(){
			$(_this).find('.panel-module-box').fadeOut(100);
		})			
	}

	// 创建样式
	M.createStyle = function(){

		if($('#panel-style').length > 0) return;

		var style = '<style id="panel-style">.panel-module-box{display:none;}.panel-module-mask{ position: absolute; z-index: 1; left: 0; right: 0; bottom: 0; top: 0; background: #000; opacity: .7; border: 2px dashed #fff; cursor: move; } .panel-module-handle{ position: absolute; left:0; top:0; z-index: 2; } .handle-btn{ cursor: pointer; padding:7px 20px; border:1px solid #eee; background-color: #fff; border-right:0; } .handle-btn:hover{ background-color: #f1f3f5; } .handle-btn:last-child{ border-right:1px solid #eee; }</style>';

		$($('head')[0]).append(style);

	}

	// 创建elem
	M.createElem = function(callback){
		if($(_this).find('.panel-module-handle').length > 0) return;

		var btnGroup = '';
		for(var i = 0; i < options.button.length; i++){
			btnGroup += '<button class="handle-btn"><i class="iconfont">'+options.button[i].iconfont+'</i>'+options.button[i].text+'</button>';

			// 绑定事件
			M.createEvent(i);

		}

		var elem = '<div class="panel-module-box"><div class="panel-module-mask"></div><div class="panel-module-handle">'+btnGroup+'</div></div>';
		$(_this).append(elem);
		// 创建后回调
		callback && typeof(callback) == 'function' && callback(this);

	}

	// 创建事件
	M.createEvent = function(index){
		$(_this).delegate('button:eq('+index+')','click',function(){
			!!options.button[index].callback && typeof(options.button[index].callback) == 'function' && options.button[index].callback(this);
		})
	}

	M.init();
}