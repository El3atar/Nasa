! function() {
    "use strict";
    var n;
    n = window.wp.hooks, window.wpParselyHooks = (0, n.createHooks)(),
        function() {
            var n = function() {
                    var n;
                    return null === (n = window.wpParselyHooks) || void 0 === n ? void 0 : n.doAction("wpParselyOnLoad")
                },
                o = function() {
                    var n;
                    return null === (n = window.wpParselyHooks) || void 0 === n ? void 0 : n.doAction("wpParselyOnReady")
                };
            if ("object" == typeof window.PARSELY) {
                if ("function" != typeof window.PARSELY.onload) window.PARSELY.onload = n;
                else {
                    var e = window.PARSELY.onload;
                    window.PARSELY.onload = function() {
                        e && e(), n()
                    }
                }
                if ("function" != typeof window.PARSELY.onReady) window.PARSELY.onReady = o;
                else {
                    var t = window.PARSELY.onReady;
                    window.PARSELY.onReady = function() {
                        t && t(), o()
                    }
                }
            } else window.PARSELY = {
                onload: n,
                onReady: o
            };
            !0 === window.wpParselyDisableAutotrack && (window.PARSELY.autotrack = !1)
        }(),
        function() {
            window.wp.i18n;
            var n, o, e;
            ! function(n) {
                n.Minutes10 = "10m", n.Hour = "1h", n.Hours2 = "2h", n.Hours4 = "4h", n.Hours24 = "24h", n.Days7 = "7d", n.Days30 = "30d"
            }(n || (n = {})),
            function(n) {
                n.Views = "views", n.AvgEngaged = "avg_engaged"
            }(o || (o = {})),
            function(n) {
                n.Author = "author", n.Section = "section", n.Tag = "tag", n.Unavailable = "unavailable"
            }(e || (e = {}));
            var t;
            void 0 !== window.wpParselySiteId && (null === (t = window.wpParselyHooks) || void 0 === t || t.addAction("wpParselyOnLoad", "wpParsely", (function() {
                return n = this, o = void 0, t = function() {
                    var n, o, e, t;
                    return function(n, o) {
                        var e, t, i, a, r = {
                            label: 0,
                            sent: function() {
                                if (1 & i[0]) throw i[1];
                                return i[1]
                            },
                            trys: [],
                            ops: []
                        };
                        return a = {
                            next: l(0),
                            throw: l(1),
                            return: l(2)
                        }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                            return this
                        }), a;

                        function l(l) {
                            return function(u) {
                                return function(l) {
                                    if (e) throw new TypeError("Generator is already executing.");
                                    for (; a && (a = 0, l[0] && (r = 0)), r;) try {
                                        if (e = 1, t && (i = 2 & l[0] ? t.return : l[0] ? t.throw || ((i = t.return) && i.call(t), 0) : t.next) && !(i = i.call(t, l[1])).done) return i;
                                        switch (t = 0, i && (l = [2 & l[0], i.value]), l[0]) {
                                            case 0:
                                            case 1:
                                                i = l;
                                                break;
                                            case 4:
                                                return r.label++, {
                                                    value: l[1],
                                                    done: !1
                                                };
                                            case 5:
                                                r.label++, t = l[1], l = [0];
                                                continue;
                                            case 7:
                                                l = r.ops.pop(), r.trys.pop();
                                                continue;
                                            default:
                                                if (!((i = (i = r.trys).length > 0 && i[i.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                    r = 0;
                                                    continue
                                                }
                                                if (3 === l[0] && (!i || l[1] > i[0] && l[1] < i[3])) {
                                                    r.label = l[1];
                                                    break
                                                }
                                                if (6 === l[0] && r.label < i[1]) {
                                                    r.label = i[1], i = l;
                                                    break
                                                }
                                                if (i && r.label < i[2]) {
                                                    r.label = i[2], r.ops.push(l);
                                                    break
                                                }
                                                i[2] && r.ops.pop(), r.trys.pop();
                                                continue
                                        }
                                        l = o.call(n, r)
                                    } catch (n) {
                                        l = [6, n], t = 0
                                    } finally {
                                        e = i = 0
                                    }
                                    if (5 & l[0]) throw l[1];
                                    return {
                                        value: l[0] ? l[1] : void 0,
                                        done: !0
                                    }
                                }([l, u])
                            }
                        }
                    }(this, (function(i) {
                        return n = null === (t = null === (e = window.PARSELY) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.parsely_site_uuid, window.wpParselySiteId && n ? (o = "".concat("https://api.parsely.com/v2", "/profile?apikey=").concat(encodeURIComponent(window.wpParselySiteId), "&uuid=").concat(encodeURIComponent(n), "&url=").concat(encodeURIComponent(window.location.href)), [2, fetch(o)]) : [2]
                    }))
                }, new((e = void 0) || (e = Promise))((function(i, a) {
                    function r(n) {
                        try {
                            u(t.next(n))
                        } catch (n) {
                            a(n)
                        }
                    }

                    function l(n) {
                        try {
                            u(t.throw(n))
                        } catch (n) {
                            a(n)
                        }
                    }

                    function u(n) {
                        var o;
                        n.done ? i(n.value) : (o = n.value, o instanceof e ? o : new e((function(n) {
                            n(o)
                        }))).then(r, l)
                    }
                    u((t = t.apply(n, o || [])).next())
                }));
                var n, o, e, t
            })))
        }()
}();