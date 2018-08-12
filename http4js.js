/**
 * Created by chshqiang on 16-6-20.
 * javascript http get 请示工具
 */

function get(url, callback, error) {
    callback = callback || function(data) {}
    error = error || function() {}

    xmlHttp = createXMLHttpRequest();
    xmlHttp.open("GET", url, true);// 异步处理返回
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var b = xmlHttp.responseText;
            callback(b);
        } else {
            error();
        }
    };
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xmlHttp.send();
}

function post(url, params, callback) {
    callback = callback || function(data) {}

    xmlHttp = createXMLHttpRequest();
    xmlHttp.open("POST", url, true);// 异步处理返回
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var b = xmlHttp.responseText;
            callback(b);
        }
    };

    var postText = "";

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            postText += key + "=" + params[key] + "&";
        }
    }

    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xmlHttp.send(postText.substr(0, postText.length - 1));
}

function postJson(url, params, callback) {
    callback = callback || function(data) {}

    xmlHttp = createXMLHttpRequest();
    xmlHttp.open("POST", url, true);// 异步处理返回
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var b = xmlHttp.responseText;
            callback(b);
        }
    };

    var postText = JSON.stringify(params);

    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xmlHttp.send(postText);
}

function createXMLHttpRequest() {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType)
            xmlHttp.overrideMimeType('text/xml');
    } else if (window.ActiveXObject) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
            }
        }
    }
    return xmlHttp;
}
