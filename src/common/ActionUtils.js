export default {
	// 获取鼠标坐标
	mousePosition(ev)
	{
		if (ev.pageX || ev.pageY) {
			return {x: ev.pageX, y: ev.pageY};
		}
		return {
			x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y: ev.clientY + document.body.scrollTop - document.body.clientTop
		};
	}
}
