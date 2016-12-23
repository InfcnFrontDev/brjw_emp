function initEcharts(info, theme, opts) {


    var dom = document.createElement("div");
    dom.style.width = info.Width + 'px';
    dom.style.height = info.Height + 'px';
    dom.style.position = 'absolute';
    dom.style.left = info.X + 'px';
    dom.style.top = info.Y + 'px';
    dom.style.border = '1px solid #808080';
    if (info.visible) {
        dom.style.display = 'block';
    } else {
        dom.style.display = 'hidden';
    }
    if (info.position) {       //if position 为 true，设为relative
        dom.style.position = 'relative';
    }

    if (info.parentid.indexOf("mypage_td") != -1 || info.parentid.indexOf("section") != -1) {   //如果是表格control(mypage_td) or 幻灯片网页（section）
        document.getElementById(info.parentid).appendChild(dom);
    } else {
        document.body.appendChild(dom);
    }
    if (!dom) {
        throw new Error('Initialize failed: invalid dom.');
    }
    var chart = echarts.init(dom, theme);
 
    return chart;

}