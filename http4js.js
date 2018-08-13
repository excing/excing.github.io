/**
 * Created by chshqiang on 16-6-20.
 * javascript http get 请示工具
 */

include('https://cdn.bootcss.com/js-cookie/latest/js.cookie.min.js');
include('https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js');

function include(url) {
    var el_script = document.createElement('script');
    el_script.src = url;
    document.head.appendChild(el_script);
}

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

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return("");
}

// 以下代码处理搜索和指令业务
var input_search = document.getElementById("input_search");
input_search.onsearch = onInputSearch();
input_search.addEventListener("search", onInputSearch);

function loginCallback(data) {
    // Cookies.set('token', data, {expires: 7});
}

function searchCallback(data) {
    var result = JSON.parse(data);
}

function onInputSearch() {
    searchText = input_search.value;

    if ("" == searchText) {
        return;
    }

    if (":lg " == searchText.substr(0, 4)) {
        var words = searchText.split(" ");

        if (3 == words.length) {
            name = words[1];
            passwd = words[2];

            post(api_domain + "/login", {name: name, passwd: md5(passwd)}, loginCallback);
        }
    } else {
        post(api_domain + "/search", {searchText: searchText}, searchCallback);
    }

    input_search.value = "";
}

// 以上代码处理搜索和指令业务