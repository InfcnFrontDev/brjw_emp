let $ajax = function (url, success, error) {
	$.ajax({
		url: url,
		cache: false,
		dataType: 'json',
		success: function (data, textStatus, jqXHR) {
			success && success(data, textStatus, jqXHR);

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			error && error(XMLHttpRequest, textStatus, errorThrown);
		}
	});
};

let newPromise = function (url) {
	return new Promise(function (resolve, reject) {
		$ajax(url, function (result) {
			resolve(result)
		}, function (error) {
			reject(error)
		});
	})
};

export default {
	/**
	 * 调用页面数据接口，/WebServices/PageService.ashx
	 */
	getPageService(pageid, linkid, title) {
		return newPromise(MyUI.apiUrl.pageService + '?pageid=' + pageid + '&linkid=' + linkid + '&title=' + (title || ''));
	}
}
