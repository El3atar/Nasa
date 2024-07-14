var tObjectCheck, _allowedQuerystrings = [],
    isSearch = !1,
    oCONFIG = {
        GWT_GA4ID: ["G-CSLL4ZEK4L"],
        FORCE_SSL: !0,
        ANONYMIZE_IP: !0,
        AGENCY: "",
        SUB_AGENCY: "",
        VERSION: "20240712 v8.2 - GA4",
        SITE_TOPIC: "",
        SITE_PLATFORM: "",
        SCRIPT_SOURCE: "",
        URL_PROTOCOL: location.protocol,
        USE_MAIN_CUSTOM_DIMENSIONS: !0,
        MAIN_AGENCY_DIMENSION: "agency",
        MAIN_SUBAGENCY_DIMENSION: "subagency",
        MAIN_CODEVERSION_DIMENSION: "version",
        MAIN_SITE_TOPIC_DIMENSION: "site_topic",
        MAIN_SITE_PLATFORM_DIMENSION: "site_platform",
        MAIN_SCRIPT_SOURCE_URL_DIMENSION: "script_source",
        MAIN_URL_PROTOCOL_DIMENSION: "protocol",
        MAIN_INTERACTION_TYPE_DIMENSION: "interaction_type",
        MAIN_USING_PARALLEL_DIMENSION: "using_parallel_tracker",
        USE_PARALLEL_CUSTOM_DIMENSIONS: !1,
        PARALLEL_AGENCY_DIMENSION: "agency",
        PARALLEL_SUBAGENCY_DIMENSION: "subagency",
        PARALLEL_CODEVERSION_DIMENSION: "version",
        PARALLEL_SITE_TOPIC_DIMENSION: "site_topic",
        PARALLEL_SITE_PLATFORM_DIMENSION: "site_platform",
        PARALLEL_SCRIPT_SOURCE_URL_DIMENSION: "script_source",
        PARALLEL_URL_PROTOCOL_DIMENSION: "protocol",
        PARALLEL_INTERACTION_TYPE_DIMENSION: "interaction_type",
        PARALLEL_USING_PARALLEL_DIMENSION: "using_parallel_tracker",
        COOKIE_DOMAIN: location.hostname.replace(/^www\./, "").toLowerCase(),
        COOKIE_TIMEOUT: 63072E3,
        SEARCH_PARAMS: "q|query|nasaInclude|k|querytext|keys|qt|search_input|search|globalSearch|goog|s|gsearch|search_keywords|SearchableText|sp_q|qs|psnetsearch|locate|lookup|search_api_views_fulltext|keywords|request|_3_keywords|searchString",
        YOUTUBE: !1,
        YT_MILESTONE: 25,
        AUTOTRACKER: !0,
        EXTS: "doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",
        SUBDOMAIN_BASED: !0,
        GA4_NAME: "GSA_GA4_ENOR",
        USE_CUSTOM_URL: !1,
        USE_CUSTOM_TITLE: !1,
        USING_PARALLEL_TRACKER: "no",
        ACTIVATE_DEV: !1
    };
_updateConfig();
_setEnvironment();
var head = document.getElementsByTagName("head").item(0),
    GA4Object = document.createElement("script");
GA4Object.setAttribute("type", "text/javascript");
GA4Object.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + oCONFIG.GWT_GA4ID[0]);
head.appendChild(GA4Object);
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments)
}
gtag("js", new Date);
gtag("set", {
    cookie_flags: "SameSite=Strict;Secure",
    transport_type: "beacon"
});

function _onEveryPage() {
    _payloadInterceptor();
    _defineCookieDomain();
    _defineAgencyCDsValues();
    _setAllowedQS();
    createTracker()
}
_onEveryPage();

function _defineCookieDomain() {
    /(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/.test(oCONFIG.SUBDOMAIN_BASED.toString()) ? (oCONFIG.COOKIE_DOMAIN = oCONFIG.SUBDOMAIN_BASED.toLowerCase().replace(/^www\./i, ""), oCONFIG.SUBDOMAIN_BASED = !0) : !1 === oCONFIG.SUBDOMAIN_BASED ? (oCONFIG.COOKIE_DOMAIN = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1], oCONFIG.SUBDOMAIN_BASED = !0) : (oCONFIG.COOKIE_DOMAIN = location.hostname.toLowerCase().replace(/^www\./i,
        ""), oCONFIG.SUBDOMAIN_BASED = !1)
}

function _defineAgencyCDsValues() {
    oCONFIG.AGENCY = oCONFIG.AGENCY || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
    oCONFIG.SUB_AGENCY = oCONFIG.SUB_AGENCY || "" + oCONFIG.COOKIE_DOMAIN;
    oCONFIG.SITE_TOPIC = oCONFIG.SITE_TOPIC || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
    oCONFIG.SITE_PLATFORM = oCONFIG.SITE_PLATFORM || "unspecified:" + oCONFIG.COOKIE_DOMAIN
}

function _setEnvironment() {
    if (document.location.href.match(/([?&])(dap-dev-env)([^&$]*)/i) || oCONFIG.ACTIVATE_DEV) oCONFIG.GWT_GA4ID[0] = "G-9TNNMGP8WJ"
}

function _cleanBooleanParam(a) {
    switch (a.toString().toLowerCase()) {
        case "true":
        case "on":
        case "yes":
        case "1":
            return !0;
        case "false":
        case "off":
        case "no":
        case "0":
            return !1;
        default:
            return a
    }
}

function _isValidGA4Num(a) {
    a = a.toLowerCase();
    a = a.match(/^g\-([0-9a-z])+$/);
    return null !== a && 0 < a.length && a[0] !== oCONFIG.GWT_GA4ID[0].toLowerCase()
}
var d_c = 1;

function _cleanGA4Value(a, b) {
    try {
        return b = b.replace(/\s/g, "_").replace(/([^\w]+)/g, "").match(/[A-Za-z]\w*$/ig), null !== b ? b[0].toLowerCase() : "d" === a ? "custom_dimension_" + d_c++ : "dap_event"
    } catch (d) {}
}

function _updateConfig() {
    if ("undefined" !== typeof _fedParmsGTM) {
        var a = _fedParmsGTM.toLowerCase().split("&");
        oCONFIG.SCRIPT_SOURCE = "GTM"
    } else {
        var b = document.getElementById("_fed_an_ua_tag");
        _fullParams = b.src.match(/^([^\?]*)(.*)$/i)[2].replace("?", "");
        a = _fullParams.split("&");
        oCONFIG.SCRIPT_SOURCE = b.src.split("?")[0]
    }
    for (b = 0; b < a.length; b++) switch (_keyValuePair = decodeURIComponent(a[b].toLowerCase()), _key = _keyValuePair.split("=")[0], _value = _keyValuePair.split("=")[1], _key) {
        case "pua":
            for (var d = _value.split(","),
                    c = 0; c < d.length; c++) _isValidGA4Num(d[c]) && (oCONFIG.GWT_GA4ID.push(d[c].toUpperCase()), oCONFIG.USING_PARALLEL_TRACKER = "pua");
            break;
        case "pga4":
            d = _value.split(",");
            for (c = 0; c < d.length; c++) _isValidGA4Num(d[c]) && (oCONFIG.GWT_GA4ID.push(d[c].toUpperCase()), oCONFIG.USING_PARALLEL_TRACKER = "pga4");
            break;
        case "agency":
            oCONFIG.AGENCY = _value.toUpperCase();
            break;
        case "subagency":
            oCONFIG.SUB_AGENCY = _value.toUpperCase();
            break;
        case "sitetopic":
            oCONFIG.SITE_TOPIC = _value;
            break;
        case "siteplatform":
            oCONFIG.SITE_PLATFORM =
                _value;
            break;
        case "parallelcd":
            _value = _cleanBooleanParam(_value);
            if (!0 === _value || !1 === _value) oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS = _value;
            break;
        case "custurl":
            _value = _cleanBooleanParam(_value);
            if (!0 === _value || !1 === _value) oCONFIG.USE_CUSTOM_URL = _value;
            break;
        case "custitle":
            _value = _cleanBooleanParam(_value);
            if (!0 === _value || !1 === _value) oCONFIG.USE_CUSTOM_TITLE = _value;
            break;
        case "dapdev":
            _value = _cleanBooleanParam(_value);
            if (!0 === _value || !1 === _value) oCONFIG.ACTIVATE_DEV = _value;
            break;
        case "palagencydim":
            _value =
                _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_AGENCY_DIMENSION = _value);
            break;
        case "palsubagencydim":
            _value = _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_SUBAGENCY_DIMENSION = _value);
            break;
        case "palversiondim":
            _value = _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_CODEVERSION_DIMENSION = _value);
            break;
        case "paltopicdim":
            _value = _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_SITE_TOPIC_DIMENSION = _value);
            break;
        case "palplatformdim":
            _value = _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_SITE_PLATFORM_DIMENSION = _value);
            break;
        case "palscriptsrcdim":
            _value = _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION = _value);
            break;
        case "palurlprotocoldim":
            _value = _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_URL_PROTOCOL_DIMENSION = _value);
            break;
        case "palinteractiontypedim":
            _value = _cleanGA4Value("d", _value);
            "" !== _value && (oCONFIG.PARALLEL_INTERACTION_TYPE_DIMENSION = _value);
            break;
        case "cto":
            oCONFIG.COOKIE_TIMEOUT = 2628E3 *
                parseInt(_value);
            break;
        case "sp":
            oCONFIG.SEARCH_PARAMS += "|" + _value.replace(/,/g, "|");
            break;
        case "exts":
            oCONFIG.EXTS += "|" + _value.replace(/,/g, "|");
            break;
        case "yt":
            _value = _cleanBooleanParam(_value);
            if (!0 === _value || !1 === _value) oCONFIG.YOUTUBE = _value;
            break;
        case "ytm":
            oCONFIG.YT_MILESTONE = /^(10|20|25)$/.test(_value) ? parseInt(_value) : 25;
            break;
        case "autotracker":
            _value = _cleanBooleanParam(_value);
            if (!0 === _value || !1 === _value) oCONFIG.AUTOTRACKER = _value;
            break;
        case "sdor":
            oCONFIG.SUBDOMAIN_BASED = _cleanBooleanParam(_value)
    }
}

function _sendEvent(a, b) {
    for (var d = "", c = 0; c < oCONFIG.GWT_GA4ID.length; c++) try {
        d += oCONFIG.GA4_NAME + c + ","
    } catch (g) {}
    b = _piiRedactor(_objToQuery(b), "json");
    b = _queryToJSON(b);
    b = _unflattenJSON(b);
    b.send_to = d.replace(/.$/, "");
    b.event_name_dimension = a;
    gtag("event", a, b)
}

function gas4(a, b) {
    if (void 0 !== a && "" !== a && void 0 !== b && "object" === typeof b)
        if (a = _cleanGA4Value("e", a), "page_view" === a.toLowerCase()) try {
            0 !== Object.keys(b).length && (b.page_location = _URIHandler(_scrubbedURL(b.page_location ? b.page_location : location.href)).split(/[#]/)[0], b.page_title = b.page_title ? b.page_title : document.title, _sendEvent("page_view", b), isSearch ? _sendViewSearchResult({
                search_term: isSearch
            }) : "")
        } catch (c) {} else try {
            var d = /((email|telephone|image|cta|navigation|faq|accordion)_)?click|file_download|view_search_results|video_(start|pause|progress|complete|play)|official_USA_site_banner_click|form_(start|submit|progress)|content_view|social_share|error|sort|filter|was_this_helpful_submit/gi.test(a) ?
                a : "dap_event";
            0 !== Object.keys(b).length ? _sendEvent(d, b) : _sendEvent(d)
        } catch (c) {}
}

function gas(a, b, d, c, g, e, k) {
    if (void 0 !== a && "" !== a && void 0 !== b && "" !== b && void 0 !== d && "" !== d)
        if ("pageview" === b.toLowerCase()) try {
            d = _URIHandler(_scrubbedURL(d)).split(/[#]/)[0], _sendEvent("page_view", {
                page_location: d,
                page_title: void 0 === c || "" === c ? document.title : c
            }), isSearch ? _sendViewSearchResult({
                search_term: isSearch
            }) : ""
        } catch (h) {} else if ("event" === b.toLowerCase() && void 0 !== c && "" !== c) try {
            a = !1, void 0 !== k && "boolean" === typeof _cleanBooleanParam(k) && (a = _cleanBooleanParam(k)), _sendEvent("dap_event", {
                event_category: d,
                event_action: c,
                event_label: void 0 === g ? "" : g,
                event_value: void 0 === e || "" === e || isNaN(e) ? 0 : parseInt(e),
                non_interaction: a
            })
        } catch (h) {} else -1 == b.toLowerCase().indexOf("dimension") && b.toLowerCase().indexOf("metric")
}

function _sendViewSearchResult(a) {
    _sendEvent("view_search_results", a);
    isSearch = !1
}

function _isExcludedReferrer() {
    if ("" !== document.referrer) {
        var a = document.referrer.replace(/https?:\/\//i, "").split("/")[0].replace(/^www\./i, "");
        return oCONFIG.SUBDOMAIN_BASED ? -1 != a.indexOf(oCONFIG.COOKIE_DOMAIN) ? !0 : !1 : a === oCONFIG.COOKIE_DOMAIN ? !0 : !1
    }
}

function createTracker(a) {
    a = /^\/.*$/i;
    try {
        var b = oCONFIG.USE_CUSTOM_URL && a.test(custom_dap_data.url) ? location.protocol + "//" + location.hostname + custom_dap_data.url.replace(location.protocol + "//" + location.hostname, "") : document.location.href;
        var d = oCONFIG.USE_CUSTOM_TITLE ? custom_dap_data.title : document.title
    } catch (g) {
        b = document.location.href, d = document.title
    }
    a = b.split(document.location.hostname)[1]; - 1 !== document.title.search(/404|not found/i) && (a = ("/vpv404/" + a).replace(/\/\//g, "/") + (document.referrer ?
        "/" + document.referrer : document.referrer));
    b = -1 !== document.title.search(/404|not found/ig) ? document.location.protocol + "//" + document.location.hostname + a : b;
    b = _URIHandler(_scrubbedURL(b));
    for (a = 0; a < oCONFIG.GWT_GA4ID.length; a++) {
        if (0 === a) {
            var c = {
                groups: oCONFIG.GA4_NAME + a,
                cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
                page_location: b,
                page_title: d,
                [oCONFIG.MAIN_AGENCY_DIMENSION]: oCONFIG.AGENCY.toUpperCase(),
                [oCONFIG.MAIN_SUBAGENCY_DIMENSION]: oCONFIG.SUB_AGENCY.toUpperCase(),
                [oCONFIG.MAIN_SITE_TOPIC_DIMENSION]: oCONFIG.SITE_TOPIC.toLowerCase(),
                [oCONFIG.MAIN_SITE_PLATFORM_DIMENSION]: oCONFIG.SITE_PLATFORM.toLowerCase(),
                [oCONFIG.MAIN_SCRIPT_SOURCE_URL_DIMENSION]: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
                [oCONFIG.MAIN_CODEVERSION_DIMENSION]: oCONFIG.VERSION.toLowerCase(),
                [oCONFIG.MAIN_URL_PROTOCOL_DIMENSION]: oCONFIG.URL_PROTOCOL.toLowerCase(),
                [oCONFIG.MAIN_USING_PARALLEL_DIMENSION]: oCONFIG.USING_PARALLEL_TRACKER.toLowerCase()
            };
            document.referrer && -1 !== document.referrer.search(location.hostname) ? c.page_referrer = _scrubbedURL(document.referrer) : document.referrer;
            c = _piiRedactor(_objToQuery(c), "default")
        } else c = 0 < a && oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS ? {
            groups: oCONFIG.GA4_NAME + a,
            cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
            page_location: b,
            page_title: d,
            [oCONFIG.PARALLEL_AGENCY_DIMENSION]: oCONFIG.AGENCY.toUpperCase(),
            [oCONFIG.PARALLEL_SUBAGENCY_DIMENSION]: oCONFIG.SUB_AGENCY.toUpperCase(),
            [oCONFIG.PARALLEL_SITE_TOPIC_DIMENSION]: oCONFIG.SITE_TOPIC.toLowerCase(),
            [oCONFIG.PARALLEL_SITE_PLATFORM_DIMENSION]: oCONFIG.SITE_PLATFORM.toLowerCase(),
            [oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION]: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
            [oCONFIG.PARALLEL_CODEVERSION_DIMENSION]: oCONFIG.VERSION.toLowerCase(),
            [oCONFIG.PARALLEL_URL_PROTOCOL_DIMENSION]: oCONFIG.URL_PROTOCOL.toLowerCase(),
            [oCONFIG.PARALLEL_USING_PARALLEL_DIMENSION]: oCONFIG.USING_PARALLEL_TRACKER.toLowerCase()
        } : {
            groups: oCONFIG.GA4_NAME + a,
            cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
            page_location: b,
            page_title: d
        }, document.referrer && -1 !== document.referrer.search(location.hostname) ? c.page_referrer = _scrubbedURL(document.referrer) : document.referrer, c = _piiRedactor(_objToQuery(c),
            "default");
        c = _queryToJSON(c);
        c = _unflattenJSON(c);
        gtag("config", oCONFIG.GWT_GA4ID[a], c)
    }
    isSearch ? _sendViewSearchResult({
        search_term: isSearch
    }) : ""
}

function _initAutoTracker() {
    var a = function(c) {
            c = c.href.toLowerCase().replace(/[#?&].*/, "").split(c.hostname)[1].split(".");
            c = c[c.length - 1];
            return null != c.match(new RegExp("^(" + oCONFIG.EXTS + ")$")) ? c : !1
        },
        b = function(c) {
            try {
                var g = JSON.stringify(c);
                return JSON.parse(g.toLowerCase())
            } catch (e) {}
        },
        d = function(c) {
            try {
                if ("mousedown" === c.type || "keydown" === c.type && 13 === c.keyCode)
                    if ("A" === c.target.nodeName || null !== c.target.closest("a")) {
                        var g = oCONFIG.COOKIE_DOMAIN,
                            e = "",
                            k = "",
                            h = "",
                            l = /^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,
                            n = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,
                            m = "",
                            q = "",
                            p = {},
                            r = /^(tel:)(.*)$/i,
                            f = c.target.closest("a");
                        "mousedown" === c.type ? q = "Mouse Click" : "keydown" === c.type && 13 === c.keyCode && (q = "Enter Key Keystroke");
                        if (l.test(f.href) || n.test(f.href) || r.test(f.href)) try {
                            n.test(f.href) ? (h = f.hostname.toLowerCase().replace(/^www\./i, ""), m = "l") : l.test(f.href) ? (h = f.href.split("@")[1].toLowerCase(), m = "m") : r.test(f.href) && (h = f.href, h = h.toLowerCase(), m = "t")
                        } catch (t) {}(oCONFIG.SUBDOMAIN_BASED ?
                            -1 !== h.indexOf(g) : h === g) ? "m" === m ? (e = f.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/), p = {
                            link_id: f.id,
                            link_url: e[0],
                            link_domain: e[0].split("@")[1],
                            link_text: f.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                            link_classes: f.className,
                            interaction_type: q
                        }, _sendEvent("email_click", b(p))) : "l" === m && a(f) ? (e = f.pathname.split(/[#?&?]/)[0], k = a(f), p = {
                            file_name: e,
                            file_extension: k,
                            link_text: f.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                            link_id: f.id,
                            link_url: f.href.replace(/[#?&].*/, ""),
                            link_domain: f.hostname.replace(/^www\./i,
                                ""),
                            interaction_type: q
                        }, _sendEvent("file_download", b(p))) : "l" !== m || a(f) : "l" === m && a(f) ? (e = f.pathname.split(/[#?&?]/)[0], k = a(f), p = {
                            file_name: e,
                            file_extension: k,
                            link_text: f.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                            link_id: f.id,
                            link_url: f.href.replace(/[#?&].*/, ""),
                            link_domain: f.hostname.replace(/^www\./i, ""),
                            outbound: !0,
                            interaction_type: q
                        }, _sendEvent("file_download", b(p))) : "l" !== m || a(f) ? "m" === m ? (e = f.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/), p = {
                            link_id: f.id,
                            link_url: e[0],
                            link_domain: e[0].split("@")[1],
                            link_text: f.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                            link_classes: f.className,
                            outbound: !0,
                            interaction_type: q
                        }, _sendEvent("email_click", b(p))) : "t" === m && (p = {
                            link_id: f.id,
                            link_url: f.href.split("tel:")[1],
                            link_text: f.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                            link_classes: f.className,
                            interaction_type: q
                        }, _sendEvent("telephone_click", b(p))) : (p = {
                            link_id: f.id,
                            link_url: f.href.replace(/[#?&].*/, ""),
                            link_domain: f.hostname.replace(/^www\./i, ""),
                            link_text: f.text.replace(/(?:[\r\n]+)+/g, "").trim(),
                            link_classes: f.className,
                            outbound: !0,
                            interaction_type: q
                        }, _sendEvent("click", b(p)))
                    }
            } catch (t) {}
        };
    document.addEventListener ? document.addEventListener("mousedown", d, !1) : document.attachEvent && document.attachEvent("onmousedown", d);
    document.addEventListener ? document.addEventListener("keydown", d, !1) : document.attachEvent && document.attachEvent("onkeydown", d)
}
if (oCONFIG.YOUTUBE) {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var videoArray = [],
        playerArray = [],
        _buckets = [],
        _milestoneController = oCONFIG.YT_MILESTONE,
        ytUtils = [];
    onYouTubeIframeAPIReady = function() {
        for (var a = 0; a < videoArray.length; a++) playerArray[a] = new YT.Player(videoArray[a], {
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: onPlayerError
            }
        })
    };
    onPlayerReady = function(a) {};
    onPlayerError = function(a) {
        _sendEvent("video_error", {
            videotitle: void 0 !== a.target.playerInfo ? a.target.playerInfo.videoData.title : a.target.getVideoData().title
        })
    };
    onPlayerStateChange = function(a) {
        try {
            for (var b = 0, d = void 0 !== a.target.playerInfo ? a.target.playerInfo.videoData.video_id : a.target.getVideoData().video_id, c = 0; c < videoArray.length; c++) videoArray[c] == d && (b = c);
            var g = void 0 !== playerArray[b].playerInfo ? Math.round(playerArray[b].playerInfo.currentTime) :
                Math.round(playerArray[b].getCurrentTime()),
                e = void 0 !== playerArray[b].playerInfo ? Math.round(playerArray[b].playerInfo.duration) : Math.round(playerArray[b].getDuration()),
                k = {
                    video_current_time: g,
                    video_duration: e,
                    video_percent: (g / e * 100).toFixed(),
                    video_provider: "youtube",
                    video_title: void 0 !== playerArray[b].playerInfo ? playerArray[b].playerInfo.videoData.title : playerArray[b].getVideoData().title,
                    video_id: void 0 !== playerArray[b].playerInfo ? playerArray[b].playerInfo.videoData.video_id : playerArray[b].getVideoData().video_id,
                    video_url: void 0 !== playerArray[b].playerInfo ? playerArray[b].playerInfo.videoUrl : playerArray[b].getVideoUrl()
                };
            a.data == YT.PlayerState.PLAYING && 0 == k.video_percent ? (_sendEvent("video_start", k), cCi = 0, _milestoneController && (ytUtils.push([b, function(h) {
                for (h = 1; h <= 100 / _milestoneController; h++) 4 === 100 / _milestoneController && h === 100 / _milestoneController ? _buckets[h - 1] = {
                    id: b,
                    milestone: 95,
                    triggered: !1
                } : 100 !== _milestoneController * h ? _buckets[h - 1] = {
                    id: b,
                    milestone: _milestoneController * h,
                    triggered: !1
                } : "";
                setInterval(function() {
                    var l =
                        void 0 !== playerArray[b].playerInfo ? Math.round(playerArray[b].playerInfo.currentTime) : Math.round(playerArray[b].getCurrentTime()),
                        n = void 0 !== playerArray[b].playerInfo ? Math.round(playerArray[b].playerInfo.duration) : Math.round(playerArray[b].getDuration());
                    l = {
                        video_current_time: l,
                        video_duration: n,
                        video_percent: (l / n * 100).toFixed(),
                        video_provider: "youtube",
                        video_title: void 0 !== playerArray[b].playerInfo ? playerArray[b].playerInfo.videoData.title : playerArray[b].getVideoData().title,
                        video_id: void 0 !== playerArray[b].playerInfo ?
                            playerArray[b].playerInfo.videoData.video_id : playerArray[b].getVideoData().video_id,
                        video_url: void 0 !== playerArray[b].playerInfo ? playerArray[b].playerInfo.videoUrl : playerArray[b].getVideoUrl()
                    };
                    l.video_percent <= _buckets[_buckets.length - 1] && cCi < _buckets.length && l.video_percent >= _buckets[cCi].milestone && !_buckets[cCi].triggered && _buckets[b].id === b && (_buckets[cCi].triggered = !0, l.video_percent = _buckets[cCi].milestone, l.video_current_time = Math.round(l.video_duration / _buckets.length * (cCi + 1)), _sendEvent("video_progress",
                        l), cCi++)
                }, (void 0 !== playerArray[b].playerInfo ? Math.round(playerArray[b].playerInfo.duration) : Math.round(playerArray[b].getDuration())) / _buckets.length)
            }]), ytUtils[ytUtils.length - 1][1](b))) : a.data == YT.PlayerState.PLAYING && _sendEvent("video_play", k);
            a.data == YT.PlayerState.ENDED && _sendEvent("video_complete", k);
            a.data == YT.PlayerState.PAUSED && _sendEvent("video_pause", k)
        } catch (h) {}
    };
    youtube_parser = function(a) {
        if ((a = a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&\?]*).*/)) && 11 == a[2].length) return a[2]
    };
    IsYouTube = function(a) {
        a = a.match(/(.*)(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*/);
        return null != a && 0 < a.length
    };
    YTUrlHandler = function(a) {
        return a = a.replace(/origin=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})&?/gi, "origin=" + document.location.protocol + "//" + document.location.host), stAdd = "", adFlag = !1, -1 == a.indexOf("https") && (a = a.replace("http", "https")), -1 == a.indexOf("?") && (stAdd = "?flag=1"), -1 == a.indexOf("enablejsapi") &&
            (stAdd += "&enablejsapi=1", adFlag = !0), -1 == a.indexOf("origin") && (stAdd += "&origin=" + document.location.protocol + "//" + document.location.host, adFlag = !0), 1 == adFlag ? a + stAdd : a
    };
    _initYouTubeTracker = function() {
        for (var a = 0, b = document.getElementsByTagName("iframe"), d = 0; d < b.length; d++) {
            var c = b[d].src;
            IsYouTube(c) && (b[d].src = YTUrlHandler(c), c = youtube_parser(c), videoArray[a] = c, b[d].setAttribute("id", c), a++)
        }
    }
}

function _payloadInterceptor() {
    window._isRedacted = window._isRedacted || !1;
    if (!window._isRedacted) {
        window._isRedacted = !0;
        try {
            var a = window.navigator.sendBeacon,
                b = oCONFIG.GWT_GA4ID.join("|");
            window.navigator.sendBeacon = function() {
                if (arguments && arguments[0].match(/google-analytics\.com.*v=2&/i) && arguments[0].match(new RegExp(b))) {
                    var d = arguments[0].split("?")[0],
                        c = arguments[0].split("?")[1];
                    c = _piiRedactor(c, "ga4");
                    var g = [];
                    arguments[1] && arguments[1].split("\r\n").forEach(function(e) {
                        g.push(_piiRedactor(e,
                            "ga4"))
                    });
                    arguments[0] = [d, c].join("?");
                    arguments[1] && 0 < g.length && (g.join("\r\n"), arguments[1] = g.join("\r\n"))
                }
                return a.apply(this, arguments)
            }
        } catch (d) {
            return a.apply(this, arguments)
        }
    }
}

function _unflattenJSON(a) {
    try {
        if (Object(a) !== a || Array.isArray(a)) return a;
        var b = {},
            d;
        for (d in a) {
            var c = b;
            var g = "";
            var e = 0;
            do {
                var k = d.indexOf(".", e);
                var h = d.substring(e, -1 !== k ? k : void 0);
                c = c[g] || (c[g] = isNaN(parseInt(h)) ? {} : []);
                g = h;
                e = k + 1
            } while (0 <= k);
            c[g] = a[d]
        }
        return b[""]
    } catch (l) {}
}

function _flattenJSON(a) {
    try {
        var b = {};

        function d(c, g) {
            if (Object(c) !== c) b[g] = c;
            else if (Array.isArray(c)) {
                for (var e = 0, k = c.length; e < k; e++) d(c[e], g ? g + "." + e : "" + e);
                0 == k && (b[g] = [])
            } else {
                e = !0;
                for (k in c) e = !1, d(c[k], g ? g + "." + k : k);
                e && (b[g] = {})
            }
        }
        d(a, "");
        return b
    } catch (d) {}
}

function _objToQuery(a) {
    return Object.keys(a).reduce(function(b, d, c) {
        c = 0 === c ? "" : "&";
        d = encodeURIComponent(d);
        var g = encodeURIComponent(a[d]);
        return [b, c, d, "=", g].join("")
    }, "")
}

function _queryToJSON(a) {
    var b = {};
    a.split("&").forEach(function(d) {
        var c = d.split("=");
        d = c[0];
        c = decodeURIComponent(c[1] || "");
        b[d] ? "[object Array]" === Object.prototype.toString.call(b[d]) ? b[d].push(c) : b[d] = [b[d], c] : b[d] = c
    });
    return JSON.parse(JSON.stringify(b))
}
var piiRegex = [];

function _piiRegexReset() {
    window.piiRegex = [{
            name: "EMAIL",
            regex: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gi
        }, {
            name: "TEL",
            regex: /((tel|(tele)?phone|mob(ile)?|cell(ular)?)=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]\d{3}[\s\.\-]\d{4})([^&\s\?\/]*)/gi
        }, {
            name: "SSN",
            regex: /((full)?(([\-_])?)?ssn=)?(\d{3}([\s\.\-\+]|%20)\d{2}([\s\.\-\+]|%20)\d{4})([^&\s\?\/]*)/ig
        }, {
            name: "NAME",
            regex: /((first|last|middle|sur|f|l|user)([\-_])?)?name=([^&\s\?\/]*)/ig
        }, {
            name: "PASSWORD",
            regex: /(((confirm([\-_])?)?password)|passwd|pwd)=([^&\s\?\/]*)/ig
        },
        {
            name: "ZIP",
            regex: /(post(al)?[\s]?code|zip[\s]?code|zip)=([^&\s\?\/]*)/gi
        }, {
            name: "ADDRESS",
            regex: /add(ress)?([1-2])?=([^&\s\?\/]*)/ig
        }
    ]
}

function _piiRedactor(a, b) {
    try {
        a = "object" === typeof a && /json|default/.test(b) ? (_flattenJSON(a), a = _objToQuery(a)) : a;
        _piiRegexReset();
        var d = _allowedQuerystrings.toString().replace(/,/g, "=|") + "=",
            c = a.split("&");
        for (a = 0; a < c.length; a++) {
            var g = "",
                e = c[a].split("="),
                k = 2 < e.length ? e.slice(1).join("=") : e[1];
            e.splice(2);
            e[1] = k;
            try {
                var h = decodeURIComponent(decodeURIComponent(e[1]))
            } catch (m) {
                h = decodeURIComponent(e[1])
            }
            if ((null != e[0].match(RegExp("dl|dr|dt|dt|en|ep.|up.|uid")) || /query|json/ig.test(b)) && -1 < h.indexOf("?")) {
                var l =
                    h.split("?").splice(1).join("&").split("&"),
                    n = [];
                for (pa = 0; pa < l.length; pa++) - 1 < l[pa].indexOf("?") && n.push(l[pa].split("?")[1]);
                l = l.concat(n);
                for (n = 0; n < l.length; n++) null != l[n].toLowerCase().match(new RegExp(d)) && (g += l[n] + "&");
                h = h.replace(/\?.*/, "?" + g.replace(/&$/, ""))
            }
            "json" === b ? window.piiRegex.push({
                name: "DOB",
                regex: /(((birth)?date|dob)=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([^&\s\?\/]*)/ig,
                format: "YYYY-MM-DD"
            }, {
                name: "DOB",
                regex: /(((birth)?date|dob)=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^&\s\?\/]*)/ig,
                format: "YYYY-DD-MM"
            }, {
                name: "DOB",
                regex: /(((birth)?date|dob)=)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,
                format: "DD-MM-YYYY"
            }, {
                name: "DOB",
                regex: /(((birth)?date|dob)=)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,
                format: "MM-DD-YYYY"
            }) : ("query" === b || "json" === b && /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(h)) && window.piiRegex.push({
                name: "TEL",
                regex: /((tel|(tele)?phone|mob(ile)?|cell(ular)?)=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]?\d{3}[\s\.\-]?\d{4})([^&\s\?\/]*)/gi
            }, {
                name: "SSN",
                regex: /((full)?(([\-_])?)?ssn=)?(\d{3}([\s\.\-\+]|%20)?\d{2}([\s\.\-\+]|%20)?\d{4})([^&\s\?\/]*)/ig
            }, {
                name: "DOB",
                regex: /(((birth)?date|dob)=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]%20)(0?[1-9]|[12][0-9]|3[01])([^&\s\?\/]*)/ig,
                format: "YYYY-MM-DD"
            }, {
                name: "DOB",
                regex: /(((birth)?date|dob)=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^&\s\?\/]*)/ig,
                format: "YYYY-DD-MM"
            }, {
                name: "DOB",
                regex: /(((birth)?date|dob)=)?(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,
                format: "DD-MM-YYYY"
            }, {
                name: "DOB",
                regex: /(((birth)?date|dob)=)?(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]%20)(19|20)\d\d([^&\s\?\/]*)/ig,
                format: "MM-DD-YYYY"
            });
            if (null != e[0].match(RegExp("dl|dr|dt|dt|en|ep.|up.|uid")) && null != e[0].match(RegExp("ep.agency||ep.subagency|ep.site_topic|ep.site_platform|ep.script_source|ep.version|ep.protocol")) || /query|json|default/ig.test(b)) piiRegex.forEach(function(m) {
                h = h.replace(m.regex, "[REDACTED_" + m.name + "]")
            }), e[1] = encodeURIComponent(h.replace(/\?$/,
                "")) || h.replace(/\?$/, ""), c[a] = e.join("=")
        }
        _piiRegexReset();
        return c.join("&")
    } catch (m) {}
}

function _initIdAssigner() {
    for (var a = document.getElementsByTagName("a"), b = 0; b < a.length; b++) {
        var d = a[b].getAttribute("id");
        null !== d && "" !== d && void 0 !== d || a[b].setAttribute("id", "anch_" + b)
    }
}

function _initBannerTracker() {
    try {
        var a = document.querySelector("section.usa-banner button.usa-accordion__button");
        a && a.addEventListener("click", function(b) {
            gas4("official_usa_site_banner_click", {
                link_text: b.target.textContent.trim(),
                section: "header"
            })
        })
    } catch (b) {}
}

function _URIHandler(a) {
    var b = new RegExp("([?&])(" + oCONFIG.SEARCH_PARAMS + ")(=[^&]+)", "i");
    b.test(a) && (a = a.replace(b, "$1query$3"), isSearch = a.match(/([?&])(query=)([^&#?]*)/i)[3]);
    return a
}

function _scrubbedURL(a) {
    RegExp.escape = function(c) {
        return c.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    };
    var b = "";
    a = ((new RegExp(`^(https?:\\/\\/(www\\.)?)?${RegExp.escape(document.location.hostname.replace(/^www\\./,""))}`, "ig")).test(a) ? a : document.location.protocol + "//" + document.location.hostname + a).toLowerCase();
    var d = a.split("?")[0];
    return 1 < a.split("?").length ? (a.split("?")[1].split("&").forEach(function(c, g) {
        -1 < _allowedQuerystrings.indexOf(c.split("=")[0]) && (b = b + "&" + c)
    }), 0 < b.length ? d + "?" + _piiRedactor(b.substring(1),
        "query") : d) : d
}

function _setAllowedQS() {
    var a = {
        "default": "utm_id utm_source utm_medium utm_campaign utm_term utm_content utm_source_platform utm_creative_format utm_marketing_tactic gbraid wbraid _gl gclid dclid gclsrc affiliate dap-dev-env v".split(" "),
        gsa: ["challenge", "state"],
        dhs: ["appreceiptnum"],
        doc: "station meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid lan office pil".split(" "),
        hhs: ["s_cid",
            "selectedFacets"
        ],
        hud: ["PostID"],
        nasa: ["feature", "ProductID", "selectedFacets"],
        nps: ["gid", "mapid", "site", "webcam", "id"],
        nsf: "meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid".split(" "),
        va: ["id"],
        dod: ["p"],
        opm: "l soc jt j rmi smin hp g d a".split(" ")
    };
    _allowedQuerystrings = a.default.concat(a[oCONFIG.AGENCY.toLowerCase()]).concat(oCONFIG.SEARCH_PARAMS.toLowerCase().split("|"))
}

function _setUpTrackers() {
    oCONFIG.ENHANCED_LINK ? _initIdAssigner() : "";
    oCONFIG.AUTOTRACKER ? _initAutoTracker() : "";
    oCONFIG.YOUTUBE ? _initYouTubeTracker() : "";
    _initBannerTracker()
}

function _setUpTrackersIfReady() {
    return "interactive" === document.readyState || "complete" === document.readyState ? (_setUpTrackers(), !0) : !1
}
_setUpTrackersIfReady() || (document.addEventListener ? document.addEventListener("DOMContentLoaded", _setUpTrackers) : document.attachEvent && document.attachEvent("onreadystatechange", _setUpTrackersIfReady));
//# sourceMappingURL=Federated.js.map