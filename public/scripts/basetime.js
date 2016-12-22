function showBaseTime() {
    if ( window.parent.document.getElementById('timespan') ){
        if (window.location.href.indexOf('basetime') < 0) {
            var now = new Date();
            window.parent.document.getElementById('timespan').innerText = now.Format("yyyy-MM-dd hh:mm:ss");
            window.parent.dataPickChange();
        }

        window.parent.document.getElementById('timezone').style.display = "block";
    }
}

function hideBaseTime() {
    if (window.parent.document.getElementById('timespan')) {
        window.parent.document.getElementById('timespan').innerText = '';
        window.parent.document.getElementById('timezone').style.display = "none";
    }

}

function setIframeBaseTime(iframeid, basetime) {
    var oiframe = document.getElementById("mypage_iframe_" + iframeid);
    //根据传人的basetime情况，判断是否刷新和修改basetime值
    if (basetime != "") {
        var oldbasetime = oiframe.getAttribute("myBaseTime");
        if (basetime == oldbasetime) {
            oiframe.setAttribute('needRefreshBaseTime', false);
        } else {
            oiframe.setAttribute('myBaseTime', basetime);
            oiframe.setAttribute('needRefreshBaseTime', true);
        }
    } else {
        oiframe.setAttribute('needRefreshBaseTime', false);
    }
}

function iframeBaseTimeRefresh(iframeid) {
    var oiframe = document.getElementById("mypage_iframe_" + iframeid);
    if (oiframe.getAttribute('needRefreshBaseTime')=='true') {
        var basetime = oiframe.getAttribute("myBaseTime");
        if (oiframe.src.indexOf('basetime') > 0) {
            oiframe.src = oiframe.src.substring(0, oiframe.src.indexOf('&basetime')) + '&basetime=' + encodeURIComponent(basetime);
        }
        else {
            oiframe.src = oiframe.src + '&basetime=' + encodeURIComponent(basetime);
        }
    }
}


function getFirstDateTime(datatime) {
    var dtarr = datatime.split(".");
    return dtarr[0];
}