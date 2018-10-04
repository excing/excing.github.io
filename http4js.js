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

!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(o){function t(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},t.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(e){}return r=o.write?o.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),u=f.slice(1).join("=");'"'===u.charAt(0)&&(u=u.slice(1,-1));try{var l=f[0].replace(s,decodeURIComponent);if(u=o.read?o.read(u,l):o(u,l)||u.replace(s,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch(e){}if(n===l){c=u;break}n||(c[l]=u)}catch(e){}}return c}}return t.set=t,t.get=function(e){return t.call(t,e)},t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}return n(function(){})});