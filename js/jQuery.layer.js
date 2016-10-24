/*---------------------------------------------------------*/
/*                          Alert                          */
/*---------------------------------------------------------*/

/*
	AlertHideObj   用于清除延时关闭（全局变量）
	Str            要显示的内容
	T              自动关闭的时间数值
	Title          自定义的标题
	Ico            图标(/static/js/img/)
	w              指定一个宽度
	h              指定一个高度
	num            是否开启弹框标题（未定义或0将开启，非0将关闭）
*/

var AlertHideObj = null;

function MyAlert(Str, T, Title, Ico, w, h, num) {
	hideselect();
	window.clearTimeout(AlertHideObj);
	var obj;
	if ($(".Alert").length == 0) {
		$("body").append('<div class="MoveAlert"></div><div class="AlertBg"></div>' + '<table class="Alert"><tbody class="AlertBody"><tr><td class="AlertT"><img src="" /><span></span></td>' + '<td class="AlertClose"><a href="javascript:void(0);">&times;</a></td></tr>' + '<tr><td colspan="2" valign="top"><div id="AlertC">' + Str + '</div></td></tr></tbody></table>');
		obj = $(".Alert");
	}
	$('.AlertClose2').remove();
	if (num == 1 || num == 2) {
		$('.AlertT').parent().remove();
		$('.Alert').css({
			"border": "1px solid #F5A000",
			"box-shadow": "none",
			"background": "#FFF",
			"top": ($(window).height() - $('.Alert').height()) / 2 - 80
		})
	}
	if (num == 2) {
		$('.AlertT').parent().remove();
		$('.AlertBody').append('<a class="AlertClose2" href="javascript:void(0);"></a>');
		$('.AlertBody').css({
			"position": "relative"
		});
	}
	if (typeof(Ico) !== 'undefined' && Ico !== '') {
		$(".AlertT").find("img").attr("src", "/static/Js/img/" + Ico + ".gif");
	} else {
		$(".AlertT").find("img").attr("src", "/static/Js/img/_Alert.gif");
	}
	if (typeof(Title) == 'undefined' || Title == '') {
		$(".AlertT").find("span").text("提示消息")
	} else {
		$(".AlertT").find("span").text(Title)
	}

	$("#AlertC").html(Str);
	!isNaN(w) ? $(".Alert").css({
		"width": w
	}) : $(".Alert").css("width", "auto");
	!isNaN(h) ? $(".Alert").css({
		"height": h
	}) : $(".Alert").css("height", "auto");
	!isNaN(h) ? $("#AlertC").css({
		"height": h - 100
	}) : $("#AlertC").css("height", "auto");

	var _sTop = $(document).scrollTop(),
		_wH = $(document).height(),
		_wW = $(document).width(),
		_tH = $(".Alert").height(),
		_tW = $(".Alert").width();
	_Top = (_wH - _tH) / 2 + _sTop;
	_Left = (_wW - _tW) / 2;
	$(".Alert").css({
		"display": "block",
		"left": _Left
	});
	$(".AlertBg").css({
		"opacity": 0.0,
		"display": "block",
		"height": $(document).height()
	});
	$(".AlertBg").animate({
		opacity: 0.3
	}, "slow");
	//如果指定了自动关闭的时间
	if (!isNaN(T)) {
		AlertHideObj = setTimeout("hideMyAlert()", T);
	}
	$(".AlertClose a").bind("click", function() {
		hideMyAlert();
	});
	$(".AlertClose2").bind("click", function() {
		hideMyAlert();
	});
	//拖动
	var _x = 0;
	var _y = 0;
	$(".AlertT").mousedown(function(e) {
		$(this).css("cursor", "move");
		var offset = $(".Alert").offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		if (typeof userSelect === "string") {
			return document.documentElement.style[userSelect] = "none";
		}
		document.unselectable = "on";
		document.onselectstart = function() {
			return false;
		}
		$(document).bind("mousemove", function(ev) {
			_x = ev.pageX - x;
			_y = ev.pageY - y - $(document).scrollTop();
			$(".Alert").css({
				left: _x + "px",
				top: _y + "px"
			});
		});
	});
	$(document).mouseup(function() {
		if (typeof userSelect === "string") {
			return document.documentElement.style[userSelect] = "text";
		}
		document.unselectable = "off";
		document.onselectstart = null;
		$(".AlertT").css("cursor", "default");
		$(".MoveAlert").hide()
		$(this).unbind("mousemove");
	});

}
////////隐藏Alert

function hideMyAlert() {
	$(".AlertBg").fadeOut("slow");
	$(".Alert").hide();
	showselect();
	window.clearTimeout(AlertHideObj)
}