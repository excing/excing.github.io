/**
 * Created by chshqiang on 16-6-20.
 * javascript http get 请示工具
 */

include('https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js');

function getYYYYMMDD(time) {
    var d = new Date(time);
    var yyyymmdd = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + (d.getDate()) + '日';
    return yyyymmdd;
}

function include(url) {
    var el_script = document.createElement('script');
    el_script.async = false;
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

function index(token, callback) {
    post(api_domain, {token: token}, callback);
}

function login(name, passwdMd5, callback) {
    post(api_domain + "login", {name: name, passwd: passwdMd5}, callback);
}

function logout(token, callback) {
    post(api_domain + 'logout', {token: token}, callback);
}

function online(token, callback) {
    post(api_domain + 'online', {token: token}, callback);
}

function edit(blog, callback) {
    postJson(api_domain + 'edit', blog, callback); 
}

function list(token, pageNumber, callback) {
    post(api_domain + "list/" + pageNumber, {token: token}, callback);
}

function view(token, blogId, callback) {
    post(api_domain + "view/" + blogId, {token: token}, callback);
}

function viewByPwd(pwd, blogId, callback) {
    post(api_domain + "view/" + blogId, {pwd: md5(pwd)}, callback);
}

function getBlogPwd(token, blogId, callback) {
    post(api_domain + "getBlogPwd/" + blogId, {token: token}, callback);
}

function updateBlogPwd(token, blogId, pwd, callback) {
    post(api_domain + "updateBlogPwd/" + blogId , {token: token, pwd: pwd}, callback);
}

function parseEditTitle(srcText) {
    if (";;" == srcText.slice(-3, -1)) {
        var mode = parseInt(srcText.substring(srcText.length - 1));
        if (!isNaN(mode)) {
            return {title: srcText.slice(0, -3), mode: mode};
        }
    }

    return {title: srcText, mode: 0};
}

function getEditTitleSrcText(title, mode) {
    var modeStr = "";

    if (1 == mode) {            // 表示列表不可见
        modeStr = ";;1";
    } else if (2 == mode) {     // 表示内容输入口令可见
        modeStr = ";;2";
    } else if (3 == mode) {     // 表示不可见
        modeStr = ";;3";
    } else if (4 == mode) {     // 表示列表不可见，输入口令可见
        modeStr = ";;4";
    }

    return title + modeStr;
}

// 以下代码处理搜索和指令业务
var input_search = document.getElementById("input_search");

if (null != input_search) {
    input_search.onsearch = onInputSearch();
    input_search.addEventListener("search", onInputSearch);
}

function loginCallback(data) {
    Cookies.set('token', data, {expires: 3});
}

function logoutCallback(data) {
}

function onInputSearch() {
    searchText = input_search.value;

    if ("" == searchText) {
        return;
    }

    if (":n" == searchText) {
        window.location.href="edit.html";
    } else if (":q" == searchText) {
        logout(Cookies.get('token'), logoutCallback);
        Cookies.set('token', "");
    } else if (":lg " == searchText.substr(0, 4)) {
        var words = searchText.split(" ");

        if (3 == words.length) {
            name = words[1];
            passwd = words[2];

            login(name, md5(passwd), loginCallback);
        }
    }

    input_search.value = "";
}

// 以上代码处理搜索和指令业务