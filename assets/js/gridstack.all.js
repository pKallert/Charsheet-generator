/** gridstack.js 0.6.0 - IE and older browsers Polyfills for this library @preserve*/
(Number.isNaN =
    Number.isNaN ||
    function (t) {
        return "number" == typeof t && t != t;
    }),
    Array.prototype.find ||
        Object.defineProperty(Array.prototype, "find", {
            value: function (t) {
                if (null == this) throw TypeError('"this" is null or not defined');
                var e = Object(this),
                    i = e.length >>> 0;
                if ("function" != typeof t) throw TypeError("predicate must be a function");
                for (var s = arguments[1], o = 0; o < i; ) {
                    var n = e[o];
                    if (t.call(s, n, o, e)) return n;
                    o++;
                }
            },
            configurable: !0,
            writable: !0,
        }),
    Array.prototype.findIndex ||
        Object.defineProperty(Array.prototype, "findIndex", {
            value: function (t) {
                if (null == this) throw new TypeError('"this" is null or not defined');
                var e = Object(this),
                    i = e.length >>> 0;
                if ("function" != typeof t) throw new TypeError("predicate must be a function");
                for (var s = arguments[1], o = 0; o < i; ) {
                    var n = e[o];
                    if (t.call(s, n, o, e)) return o;
                    o++;
                }
                return -1;
            },
            configurable: !0,
            writable: !0,
        }),
    /**
     * gridstack.js 0.6.0
     * https://gridstackjs.com/
     * (c) 2014-2019 Dylan Weiss, Alain Dumesny, Pavel Reznikov
     * gridstack.js may be freely distributed under the MIT license.
     * @preserve
     */
    (function (t) {
        if ("function" == typeof define && define.amd) define(["jquery", "exports"], t);
        else if ("undefined" != typeof exports) {
            var e;
            try {
                e = require("jquery");
            } catch (t) {}
            t(e || window.jQuery, exports);
        } else t(window.jQuery, window);
    })(function (f, t) {
        function h(t, e, i) {
            void 0 !== t[e] && ((t[i] = t[e]), console.warn("gridstack.js: Option `" + e + "` is deprecated as of v0.5.2 and has been replaced with `" + i + "`. It will be **completely** removed in v1.0."));
        }
        function l(t, e, i) {
            var s = t.attr(e);
            void 0 !== s && (t.attr(i, s), console.warn("gridstack.js: attribute `" + e + "`=" + s + " is deprecated on this object as of v0.5.2 and has been replaced with `" + i + "`. It will be **completely** removed in v1.0."));
        }
        var m = {
            isIntercepted: function (t, e) {
                return !(t.x + t.width <= e.x || e.x + e.width <= t.x || t.y + t.height <= e.y || e.y + e.height <= t.y);
            },
            sort: function (t, e, i) {
                if (!i) {
                    var s = t.map(function (t) {
                        return t.x + t.width;
                    });
                    i = Math.max.apply(Math, s);
                }
                return -1 === e
                    ? m.sortBy(t, function (t) {
                          return -(t.x + t.y * i);
                      })
                    : m.sortBy(t, function (t) {
                          return t.x + t.y * i;
                      });
            },
            createStylesheet: function (t) {
                var e = document.createElement("style");
                return (
                    e.setAttribute("type", "text/css"),
                    e.setAttribute("data-gs-style-id", t),
                    e.styleSheet ? (e.styleSheet.cssText = "") : e.appendChild(document.createTextNode("")),
                    document.getElementsByTagName("head")[0].appendChild(e),
                    e.sheet
                );
            },
            removeStylesheet: function (t) {
                f("STYLE[data-gs-style-id=" + t + "]").remove();
            },
            insertCSSRule: function (t, e, i, s) {
                "function" == typeof t.insertRule ? t.insertRule(e + "{" + i + "}", s) : "function" == typeof t.addRule && t.addRule(e, i, s);
            },
            toBool: function (t) {
                return "boolean" == typeof t ? t : "string" == typeof t ? !("" === (t = t.toLowerCase()) || "no" === t || "false" === t || "0" === t) : Boolean(t);
            },
            _collisionNodeCheck: function (t) {
                return t !== this.node && m.isIntercepted(t, this.nn);
            },
            _didCollide: function (t) {
                return m.isIntercepted({ x: this.n.x, y: this.newY, width: this.n.width, height: this.n.height }, t);
            },
            _isAddNodeIntercepted: function (t) {
                return m.isIntercepted({ x: this.x, y: this.y, width: this.node.width, height: this.node.height }, t);
            },
            parseHeight: function (t) {
                var e = t,
                    i = "px";
                if (e && "string" == typeof e) {
                    var s = e.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);
                    if (!s) throw new Error("Invalid height");
                    (i = s[2] || "px"), (e = parseFloat(s[1]));
                }
                return { height: e, unit: i };
            },
            without: function (t, e) {
                var i = t.indexOf(e);
                return -1 !== i && (t = t.slice(0)).splice(i, 1), t;
            },
            sortBy: function (t, o) {
                return t.slice(0).sort(function (t, e) {
                    var i = o(t),
                        s = o(e);
                    return s === i ? 0 : s < i ? 1 : -1;
                });
            },
            defaults: function (i) {
                return (
                    Array.prototype.slice.call(arguments, 1).forEach(function (t) {
                        for (var e in t) !t.hasOwnProperty(e) || (i.hasOwnProperty(e) && void 0 !== i[e]) || (i[e] = t[e]);
                    }),
                    i
                );
            },
            clone: function (t) {
                return f.extend({}, t);
            },
            throttle: function (t, e) {
                var i = !1;
                return function () {
                    i ||
                        (t.apply(this, arguments),
                        (i = !0),
                        setTimeout(function () {
                            i = !1;
                        }, e));
                };
            },
            removePositioningStyles: function (t) {
                var e = t[0].style;
                e.position && e.removeProperty("position"), e.left && e.removeProperty("left"), e.top && e.removeProperty("top"), e.width && e.removeProperty("width"), e.height && e.removeProperty("height");
            },
            getScrollParent: function (t) {
                return null === t ? null : t.scrollHeight > t.clientHeight ? t : m.getScrollParent(t.parentNode);
            },
            updateScrollPosition: function (t, e, i) {
                var s = t.getBoundingClientRect(),
                    o = window.innerHeight || document.documentElement.clientHeight;
                if (s.top < 0 || s.bottom > o) {
                    var n = s.bottom - o,
                        r = s.top,
                        a = m.getScrollParent(t);
                    if (null !== a) {
                        var h = a.scrollTop;
                        s.top < 0 && i < 0 ? (t.offsetHeight > o ? (a.scrollTop += i) : (a.scrollTop += Math.abs(r) > Math.abs(i) ? i : r)) : 0 < i && (t.offsetHeight > o ? (a.scrollTop += i) : (a.scrollTop += i < n ? i : n)),
                            (e.position.top += a.scrollTop - h);
                    }
                }
            },
        };
        function d(t) {
            this.grid = t;
        }
        (d.registeredPlugins = []),
            (d.registerPlugin = function (t) {
                d.registeredPlugins.push(t);
            }),
            (d.prototype.resizable = function (t, e) {
                return this;
            }),
            (d.prototype.draggable = function (t, e) {
                return this;
            }),
            (d.prototype.droppable = function (t, e) {
                return this;
            }),
            (d.prototype.isDroppable = function (t) {
                return !1;
            }),
            (d.prototype.on = function (t, e, i) {
                return this;
            });
        function p(t, e, i, s, o) {
            (this.column = t || 12), (this.float = i || !1), (this.maxRow = s || 0), (this.nodes = o || []), (this.onchange = e || function () {}), (this._addedNodes = []), (this._removedNodes = []), (this._batchMode = !1);
        }
        var c = 0;
        (p.prototype.batchUpdate = function () {
            this._batchMode || ((this._batchMode = !0), (this._prevFloat = this.float), (this.float = !0));
        }),
            (p.prototype.commit = function () {
                this._batchMode && ((this._batchMode = !1), (this.float = this._prevFloat), delete this._prevFloat, this._packNodes(), this._notify());
            }),
            (p.prototype.getNodeDataByDOMEl = function (e) {
                return this.nodes.find(function (t) {
                    return e.get(0) === t.el.get(0);
                });
            }),
            (p.prototype._fixCollisions = function (t) {
                this._sortNodes(-1);
                var e = t,
                    i = Boolean(
                        this.nodes.find(function (t) {
                            return t.locked;
                        })
                    );
                for (this.float || i || (e = { x: 0, y: t.y, width: this.column, height: t.height }); ; ) {
                    var s = this.nodes.find(m._collisionNodeCheck, { node: t, nn: e });
                    if (!s) return;
                    this.moveNode(s, s.x, t.y + t.height, s.width, s.height, !0);
                }
            }),
            (p.prototype.isAreaEmpty = function (t, e, i, s) {
                var o = { x: t || 0, y: e || 0, width: i || 1, height: s || 1 };
                return !this.nodes.find(function (t) {
                    return m.isIntercepted(t, o);
                });
            }),
            (p.prototype._sortNodes = function (t) {
                this.nodes = m.sort(this.nodes, t, this.column);
            }),
            (p.prototype._packNodes = function () {
                this._sortNodes(),
                    this.float
                        ? this.nodes.forEach(function (t, e) {
                              if (!t._updating && void 0 !== t._origY && t.y !== t._origY)
                                  for (var i = t.y; i >= t._origY; ) {
                                      this.nodes.slice(0, e).find(m._didCollide, { n: t, newY: i }) || ((t._dirty = !0), (t.y = i)), --i;
                                  }
                          }, this)
                        : this.nodes.forEach(function (t, e) {
                              if (!t.locked)
                                  for (; 0 < t.y; ) {
                                      var i = t.y - 1,
                                          s = 0 === e;
                                      if (0 < e) s = void 0 === this.nodes.slice(0, e).find(m._didCollide, { n: t, newY: i });
                                      if (!s) break;
                                      (t._dirty = t.y !== i), (t.y = i);
                                  }
                          }, this);
            }),
            (p.prototype._prepareNode = function (t, e) {
                (void 0 !== (t = t || {}).x && void 0 !== t.y && null !== t.x && null !== t.y) || (t.autoPosition = !0);
                var i = { width: 1, height: 1, x: 0, y: 0 };
                return (
                    ((t = m.defaults(t, i)).x = parseInt(t.x)),
                    (t.y = parseInt(t.y)),
                    (t.width = parseInt(t.width)),
                    (t.height = parseInt(t.height)),
                    (t.autoPosition = t.autoPosition || !1),
                    (t.noResize = t.noResize || !1),
                    (t.noMove = t.noMove || !1),
                    Number.isNaN(t.x) && ((t.x = i.x), (t.autoPosition = !0)),
                    Number.isNaN(t.y) && ((t.y = i.y), (t.autoPosition = !0)),
                    Number.isNaN(t.width) && (t.width = i.width),
                    Number.isNaN(t.height) && (t.height = i.height),
                    t.width > this.column ? (t.width = this.column) : t.width < 1 && (t.width = 1),
                    t.height < 1 && (t.height = 1),
                    t.x < 0 && (t.x = 0),
                    t.x + t.width > this.column && (e ? (t.width = this.column - t.x) : (t.x = this.column - t.width)),
                    t.y < 0 && (t.y = 0),
                    t
                );
            }),
            (p.prototype._notify = function () {
                if (!this._batchMode) {
                    var t = Array.prototype.slice.call(arguments, 0);
                    (t[0] = void 0 === t[0] ? [] : Array.isArray(t[0]) ? t[0] : [t[0]]), (t[1] = void 0 === t[1] || t[1]);
                    var e = t[0].concat(this.getDirtyNodes());
                    this.onchange(e, t[1]);
                }
            }),
            (p.prototype.cleanNodes = function () {
                this._batchMode ||
                    this.nodes.forEach(function (t) {
                        delete t._dirty;
                    });
            }),
            (p.prototype.getDirtyNodes = function () {
                return this.nodes.filter(function (t) {
                    return t._dirty;
                });
            }),
            (p.prototype.addNode = function (t, e) {
                var i = t.x,
                    s = t.y,
                    o = t.width,
                    n = t.height;
                if (
                    (void 0 !== (t = this._prepareNode(t)).maxWidth && (t.width = Math.min(t.width, t.maxWidth)),
                    void 0 !== t.maxHeight && (t.height = Math.min(t.height, t.maxHeight)),
                    void 0 !== t.minWidth && (t.width = Math.max(t.width, t.minWidth)),
                    void 0 !== t.minHeight && (t.height = Math.max(t.height, t.minHeight)),
                    (t._id = t._id || ++c),
                    t.autoPosition)
                ) {
                    this._sortNodes();
                    for (var r = 0; ; ++r) {
                        var a = r % this.column,
                            h = Math.floor(r / this.column);
                        if (!(a + t.width > this.column) && !this.nodes.find(m._isAddNodeIntercepted, { x: a, y: h, node: t })) {
                            (t.x = a), (t.y = h), delete t.autoPosition;
                            break;
                        }
                    }
                }
                return this.nodes.push(t), e && this._addedNodes.push(t), t._dirty || (i == t.x && s == t.y && o == t.width && n == t.height) || (t._dirty = !0), this._fixCollisions(t), this._packNodes(), this._notify(), t;
            }),
            (p.prototype.removeNode = function (t, e) {
                (e = void 0 === e || e), this._removedNodes.push(t), (t._id = null), (this.nodes = m.without(this.nodes, t)), this._packNodes(), this._notify(t, e);
            }),
            (p.prototype.removeAll = function (t) {
                delete this._layouts,
                    0 !== this.nodes.length &&
                        ((t = void 0 === t || t),
                        this.nodes.forEach(function (t) {
                            t._id = null;
                        }),
                        (this._removedNodes = this.nodes),
                        (this.nodes = []),
                        this._notify(this._removedNodes, t));
            }),
            (p.prototype.canMoveNode = function (e, t, i, s, o) {
                if (!this.isNodeChangedPosition(e, t, i, s, o)) return !1;
                var n,
                    r = Boolean(
                        this.nodes.find(function (t) {
                            return t.locked;
                        })
                    );
                if (!this.maxRow && !r) return !0;
                var a = new p(
                    this.column,
                    null,
                    this.float,
                    0,
                    this.nodes.map(function (t) {
                        return t === e ? (n = f.extend({}, t)) : f.extend({}, t);
                    })
                );
                if (!n) return !0;
                a.moveNode(n, t, i, s, o);
                var h = !0;
                return (
                    r &&
                        (h &= !Boolean(
                            a.nodes.find(function (t) {
                                return t !== n && Boolean(t.locked) && Boolean(t._dirty);
                            })
                        )),
                    this.maxRow && (h &= a.getGridHeight() <= this.maxRow),
                    h
                );
            }),
            (p.prototype.canBePlacedWithRespectToHeight = function (t) {
                if (!this.maxRow) return !0;
                var e = new p(
                    this.column,
                    null,
                    this.float,
                    0,
                    this.nodes.map(function (t) {
                        return f.extend({}, t);
                    })
                );
                return e.addNode(t), e.getGridHeight() <= this.maxRow;
            }),
            (p.prototype.isNodeChangedPosition = function (t, e, i, s, o) {
                return (
                    "number" != typeof e && (e = t.x),
                    "number" != typeof i && (i = t.y),
                    "number" != typeof s && (s = t.width),
                    "number" != typeof o && (o = t.height),
                    void 0 !== t.maxWidth && (s = Math.min(s, t.maxWidth)),
                    void 0 !== t.maxHeight && (o = Math.min(o, t.maxHeight)),
                    void 0 !== t.minWidth && (s = Math.max(s, t.minWidth)),
                    void 0 !== t.minHeight && (o = Math.max(o, t.minHeight)),
                    t.x !== e || t.y !== i || t.width !== s || t.height !== o
                );
            }),
            (p.prototype.moveNode = function (t, e, i, s, o, n) {
                if (
                    ("number" != typeof e && (e = t.x),
                    "number" != typeof i && (i = t.y),
                    "number" != typeof s && (s = t.width),
                    "number" != typeof o && (o = t.height),
                    void 0 !== t.maxWidth && (s = Math.min(s, t.maxWidth)),
                    void 0 !== t.maxHeight && (o = Math.min(o, t.maxHeight)),
                    void 0 !== t.minWidth && (s = Math.max(s, t.minWidth)),
                    void 0 !== t.minHeight && (o = Math.max(o, t.minHeight)),
                    t.x === e && t.y === i && t.width === s && t.height === o)
                )
                    return t;
                var r = t.width !== s;
                return (
                    (t._dirty = !0),
                    (t.x = e),
                    (t.y = i),
                    (t.width = s),
                    (t.height = o),
                    (t.lastTriedX = e),
                    (t.lastTriedY = i),
                    (t.lastTriedWidth = s),
                    (t.lastTriedHeight = o),
                    (t = this._prepareNode(t, r)),
                    this._fixCollisions(t),
                    n || (this._packNodes(), this._notify()),
                    t
                );
            }),
            (p.prototype.getGridHeight = function () {
                return this.nodes.reduce(function (t, e) {
                    return Math.max(t, e.y + e.height);
                }, 0);
            }),
            (p.prototype.beginUpdate = function (t) {
                t._updating ||
                    ((t._updating = !0),
                    this.nodes.forEach(function (t) {
                        t._origY = t.y;
                    }));
            }),
            (p.prototype.endUpdate = function () {
                var t = this.nodes.find(function (t) {
                    return t._updating;
                });
                t &&
                    ((t._updating = !1),
                    this.nodes.forEach(function (t) {
                        delete t._origY;
                    }));
            });
        function i(t, e) {
            var i,
                s,
                c = this;
            (e = e || {}),
                (this.container = f(t)),
                h(e, "width", "column"),
                h(e, "height", "maxRow"),
                l(this.container, "data-gs-width", "data-gs-column"),
                l(this.container, "data-gs-height", "data-gs-max-row"),
                (e.itemClass = e.itemClass || "grid-stack-item");
            var o = 0 < this.container.closest("." + e.itemClass).length;
            if (
                ((this.opts = m.defaults(e, {
                    column: parseInt(this.container.attr("data-gs-column")) || 12,
                    maxRow: parseInt(this.container.attr("data-gs-max-row")) || 0,
                    itemClass: "grid-stack-item",
                    placeholderClass: "grid-stack-placeholder",
                    placeholderText: "",
                    handle: ".grid-stack-item-content",
                    handleClass: null,
                    cellHeight: 60,
                    verticalMargin: 20,
                    auto: !0,
                    minWidth: 768,
                    float: !1,
                    staticGrid: !1,
                    _class: "grid-stack-instance-" + (1e4 * Math.random()).toFixed(0),
                    animate: Boolean(this.container.attr("data-gs-animate")) || !1,
                    alwaysShowResizeHandle: e.alwaysShowResizeHandle || !1,
                    resizable: m.defaults(e.resizable || {}, { autoHide: !e.alwaysShowResizeHandle, handles: "se" }),
                    draggable: m.defaults(e.draggable || {}, { handle: (e.handleClass ? "." + e.handleClass : e.handle ? e.handle : "") || ".grid-stack-item-content", scroll: !1, appendTo: "body" }),
                    disableDrag: e.disableDrag || !1,
                    disableResize: e.disableResize || !1,
                    rtl: "auto",
                    removable: !1,
                    removableOptions: m.defaults(e.removableOptions || {}, { accept: "." + e.itemClass }),
                    removeTimeout: 2e3,
                    verticalMarginUnit: "px",
                    cellHeightUnit: "px",
                    disableOneColumnMode: e.disableOneColumnMode || !1,
                    oneColumnModeClass: e.oneColumnModeClass || "grid-stack-one-column-mode",
                    ddPlugin: null,
                })),
                !1 === this.opts.ddPlugin ? (this.opts.ddPlugin = d) : null === this.opts.ddPlugin && (this.opts.ddPlugin = d.registeredPlugins[0] || d),
                (this.dd = new this.opts.ddPlugin(this)),
                "auto" === this.opts.rtl && (this.opts.rtl = "rtl" === this.container.css("direction")),
                this.opts.rtl && this.container.addClass("grid-stack-rtl"),
                (this.opts.isNested = o),
                (s = "auto" === this.opts.cellHeight) ? c.cellHeight(c.cellWidth(), !0) : this.cellHeight(this.opts.cellHeight, !0),
                this.verticalMargin(this.opts.verticalMargin, !0),
                this.container.addClass(this.opts._class),
                this._setStaticClass(),
                o && this.container.addClass("grid-stack-nested"),
                this._initStyles(),
                (this.grid = new p(
                    this.opts.column,
                    function (t, e) {
                        e = void 0 === e || e;
                        var i = 0;
                        this.nodes.forEach(function (t) {
                            i = Math.max(i, t.y + t.height);
                        }),
                            t.forEach(function (t) {
                                e && null === t._id ? t.el && t.el.remove() : t.el.attr("data-gs-x", t.x).attr("data-gs-y", t.y).attr("data-gs-width", t.width).attr("data-gs-height", t.height);
                            }),
                            c._updateStyles(i + 10);
                    },
                    this.opts.float,
                    this.opts.maxRow
                )),
                this.opts.auto)
            ) {
                var n = [],
                    r = this;
                this.container.children("." + this.opts.itemClass + ":not(." + this.opts.placeholderClass + ")").each(function (t, e) {
                    e = f(e);
                    var i = parseInt(e.attr("data-gs-x")),
                        s = parseInt(e.attr("data-gs-y"));
                    n.push({ el: e, i: (Number.isNaN(i) ? 1e3 : i) + (Number.isNaN(s) ? 1e3 : s) * r.opts.column });
                }),
                    m
                        .sortBy(n, function (t) {
                            return t.i;
                        })
                        .forEach(function (t) {
                            this._prepareElement(t.el);
                        }, this);
            }
            if (
                (this.setAnimation(this.opts.animate),
                (this.placeholder = f('<div class="' + this.opts.placeholderClass + " " + this.opts.itemClass + '"><div class="placeholder-content">' + this.opts.placeholderText + "</div></div>").hide()),
                this._updateContainerHeight(),
                (this._updateHeightsOnResize = m.throttle(function () {
                    c.cellHeight(c.cellWidth(), !1);
                }, 100)),
                (this.onResizeHandler = function () {
                    if ((s && c._updateHeightsOnResize(), c._isOneColumnMode() && !c.opts.disableOneColumnMode)) {
                        if (i) return;
                        c.container.addClass(c.opts.oneColumnModeClass),
                            (i = !0),
                            c.grid._sortNodes(),
                            c.grid.nodes.forEach(function (t) {
                                c.container.append(t.el), c.opts.staticGrid || (c.dd.draggable(t.el, "disable"), c.dd.resizable(t.el, "disable"), t.el.trigger("resize"));
                            });
                    } else {
                        if (!i) return;
                        if ((c.container.removeClass(c.opts.oneColumnModeClass), (i = !1), c.opts.staticGrid)) return;
                        c.grid.nodes.forEach(function (t) {
                            t.noMove || c.opts.disableDrag || c.dd.draggable(t.el, "enable"), t.noResize || c.opts.disableResize || c.dd.resizable(t.el, "enable"), t.el.trigger("resize");
                        });
                    }
                }),
                f(window).resize(this.onResizeHandler),
                this.onResizeHandler(),
                !c.opts.staticGrid && "string" == typeof c.opts.removable)
            ) {
                var a = f(c.opts.removable);
                this.dd.isDroppable(a) || this.dd.droppable(a, c.opts.removableOptions),
                    this.dd
                        .on(a, "dropover", function (t, e) {
                            var i = f(e.draggable),
                                s = i.data("_gridstack_node");
                            s && s._grid === c && (i.data("inTrashZone", !0), c._setupRemovingTimeout(i));
                        })
                        .on(a, "dropout", function (t, e) {
                            var i = f(e.draggable),
                                s = i.data("_gridstack_node");
                            s && s._grid === c && (i.data("inTrashZone", !1), c._clearRemovingTimeout(i));
                        });
            }
            if (!c.opts.staticGrid && c.opts.acceptWidgets) {
                function u(t, e) {
                    var i = g,
                        s = i.data("_gridstack_node"),
                        o = c.getCellFromPixel({ left: t.pageX, top: t.pageY }, !0),
                        n = Math.max(0, o.x),
                        r = Math.max(0, o.y);
                    s._added ||
                        ((s._added = !0),
                        (s.el = i),
                        (s.autoPosition = !0),
                        (s.x = n),
                        (s.y = r),
                        c.grid.cleanNodes(),
                        c.grid.beginUpdate(s),
                        c.grid.addNode(s),
                        c.container.append(c.placeholder),
                        c.placeholder.attr("data-gs-x", s.x).attr("data-gs-y", s.y).attr("data-gs-width", s.width).attr("data-gs-height", s.height).show(),
                        (s.el = c.placeholder),
                        (s._beforeDragX = s.x),
                        (s._beforeDragY = s.y),
                        c._updateContainerHeight()),
                        c.grid.canMoveNode(s, n, r) && (c.grid.moveNode(s, n, r), c._updateContainerHeight());
                }
                var g = null;
                this.dd
                    .droppable(c.container, {
                        accept: function (t) {
                            var e = (t = f(t)).data("_gridstack_node");
                            return (!e || e._grid !== c) && t.is(!0 === c.opts.acceptWidgets ? ".grid-stack-item" : c.opts.acceptWidgets);
                        },
                    })
                    .on(c.container, "dropover", function (t, e) {
                        var i,
                            s,
                            o = f(e.draggable),
                            n = o.data("_gridstack_node");
                        if (!n || !n.width || !n.height) {
                            var r = parseInt(o.attr("data-gs-width"));
                            0 < r && ((n = n || {}).width = r);
                            var a = parseInt(o.attr("data-gs-height"));
                            0 < a && ((n = n || {}).height = a);
                        }
                        var h = c.cellWidth(),
                            l = c.cellHeight(),
                            d = c.opts.verticalMargin;
                        (i = n && n.width ? n.width : Math.ceil(o.outerWidth() / h)), (s = n && n.height ? n.height : Math.round((o.outerHeight() + d) / (l + d))), (g = o);
                        var p = c.grid._prepareNode({ width: i, height: s, _added: !1, _temporary: !0 });
                        (p.isOutOfGrid = !0), o.data("_gridstack_node", p), o.data("_gridstack_node_orig", n), o.on("drag", u);
                    })
                    .on(c.container, "dropout", function (t, e) {
                        var i = f(e.draggable);
                        if (i.data("_gridstack_node")) {
                            var s = i.data("_gridstack_node");
                            s.isOutOfGrid && (i.unbind("drag", u), (s.el = null), c.grid.removeNode(s), c.placeholder.detach(), c._updateContainerHeight(), i.data("_gridstack_node", i.data("_gridstack_node_orig")));
                        }
                    })
                    .on(c.container, "drop", function (t, e) {
                        c.placeholder.detach();
                        var i = f(e.draggable).data("_gridstack_node");
                        (i.isOutOfGrid = !1), (i._grid = c);
                        var s = f(e.draggable).clone(!1);
                        s.data("_gridstack_node", i);
                        var o = f(e.draggable).data("_gridstack_node_orig");
                        void 0 !== o && void 0 !== o._grid && o._grid._triggerRemoveEvent(),
                            f(e.helper).remove(),
                            (i.el = s),
                            c.placeholder.hide(),
                            m.removePositioningStyles(s),
                            s.find("div.ui-resizable-handle").remove(),
                            s
                                .attr("data-gs-x", i.x)
                                .attr("data-gs-y", i.y)
                                .attr("data-gs-width", i.width)
                                .attr("data-gs-height", i.height)
                                .addClass(c.opts.itemClass)
                                .enableSelection()
                                .removeData("draggable")
                                .removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled")
                                .unbind("drag", u),
                            c.container.append(s),
                            c._prepareElementsByNode(s, i),
                            c._updateContainerHeight(),
                            c.grid._addedNodes.push(i),
                            c._triggerAddEvent(),
                            c._triggerChangeEvent(),
                            c.grid.endUpdate(),
                            f(e.draggable).unbind("drag", u),
                            f(e.draggable).removeData("_gridstack_node"),
                            f(e.draggable).removeData("_gridstack_node_orig"),
                            c.container.trigger("dropped", [o, i]);
                    });
            }
        }
        var e, s, o;
        function n() {
            return console.warn("gridstack.js: Function `" + s + "` is deprecated as of v0.5.2 and has been replaced with `" + o + "`. It will be **completely** removed in v1.0."), e.apply(this, arguments);
        }
        return (
            (i.prototype._triggerChangeEvent = function () {
                if (!this.grid._batchMode) {
                    var t = this.grid.getDirtyNodes();
                    t && t.length && (this.grid._layoutsNodesChange(t), this.container.trigger("change", [t]), this.grid.cleanNodes());
                }
            }),
            (i.prototype._triggerAddEvent = function () {
                this.grid._batchMode ||
                    (this.grid._addedNodes && 0 < this.grid._addedNodes.length && (this.grid._layoutsNodesChange(this.grid._addedNodes), this.container.trigger("added", [this.grid._addedNodes]), (this.grid._addedNodes = [])));
            }),
            (i.prototype._triggerRemoveEvent = function () {
                this.grid._batchMode || (this.grid._removedNodes && 0 < this.grid._removedNodes.length && (this.container.trigger("removed", [this.grid._removedNodes]), (this.grid._removedNodes = [])));
            }),
            (i.prototype._initStyles = function () {
                this._stylesId && m.removeStylesheet(this._stylesId),
                    (this._stylesId = "gridstack-style-" + (1e5 * Math.random()).toFixed()),
                    (this._styles = m.createStylesheet(this._stylesId)),
                    null !== this._styles && (this._styles._max = 0);
            }),
            (i.prototype._updateStyles = function (t) {
                if (null !== this._styles && void 0 !== this._styles) {
                    var e,
                        i = "." + this.opts._class + " ." + this.opts.itemClass,
                        s = this;
                    if (
                        (void 0 === t && (t = this._styles._max),
                        this._initStyles(),
                        this._updateContainerHeight(),
                        this.opts.cellHeight &&
                            !(0 !== this._styles._max && t <= this._styles._max) &&
                            ((e =
                                this.opts.verticalMargin && this.opts.cellHeightUnit !== this.opts.verticalMarginUnit
                                    ? function (t, e) {
                                          return t && e
                                              ? "calc(" + (s.opts.cellHeight * t + s.opts.cellHeightUnit) + " + " + (s.opts.verticalMargin * e + s.opts.verticalMarginUnit) + ")"
                                              : s.opts.cellHeight * t + s.opts.verticalMargin * e + s.opts.cellHeightUnit;
                                      }
                                    : function (t, e) {
                                          return s.opts.cellHeight * t + s.opts.verticalMargin * e + s.opts.cellHeightUnit;
                                      }),
                            0 === this._styles._max && m.insertCSSRule(this._styles, i, "min-height: " + e(1, 0) + ";", 0),
                            t > this._styles._max))
                    ) {
                        for (var o = this._styles._max; o < t; ++o)
                            m.insertCSSRule(this._styles, i + '[data-gs-height="' + (o + 1) + '"]', "height: " + e(o + 1, o) + ";", o),
                                m.insertCSSRule(this._styles, i + '[data-gs-min-height="' + (o + 1) + '"]', "min-height: " + e(o + 1, o) + ";", o),
                                m.insertCSSRule(this._styles, i + '[data-gs-max-height="' + (o + 1) + '"]', "max-height: " + e(o + 1, o) + ";", o),
                                m.insertCSSRule(this._styles, i + '[data-gs-y="' + o + '"]', "top: " + e(o, o) + ";", o);
                        this._styles._max = t;
                    }
                }
            }),
            (i.prototype._updateContainerHeight = function () {
                if (!this.grid._batchMode) {
                    var t = this.grid.getGridHeight(),
                        e = parseInt(this.container.css("min-height"));
                    if (0 < e) {
                        var i = this.opts.verticalMargin,
                            s = Math.round((e + i) / (this.cellHeight() + i));
                        t < s && (t = s);
                    }
                    this.container.attr("data-gs-current-height", t),
                        this.opts.cellHeight &&
                            (this.opts.verticalMargin
                                ? this.opts.cellHeightUnit === this.opts.verticalMarginUnit
                                    ? this.container.css("height", t * (this.opts.cellHeight + this.opts.verticalMargin) - this.opts.verticalMargin + this.opts.cellHeightUnit)
                                    : this.container.css("height", "calc(" + (t * this.opts.cellHeight + this.opts.cellHeightUnit) + " + " + (t * (this.opts.verticalMargin - 1) + this.opts.verticalMarginUnit) + ")")
                                : this.container.css("height", t * this.opts.cellHeight + this.opts.cellHeightUnit));
                }
            }),
            (i.prototype._isOneColumnMode = function () {
                return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= this.opts.minWidth;
            }),
            (i.prototype._setupRemovingTimeout = function (t) {
                var e = f(t).data("_gridstack_node");
                !e._removeTimeout &&
                    this.opts.removable &&
                    (e._removeTimeout = setTimeout(function () {
                        t.addClass("grid-stack-item-removing"), (e._isAboutToRemove = !0);
                    }, this.opts.removeTimeout));
            }),
            (i.prototype._clearRemovingTimeout = function (t) {
                var e = f(t).data("_gridstack_node");
                e._removeTimeout && (clearTimeout(e._removeTimeout), (e._removeTimeout = null), t.removeClass("grid-stack-item-removing"), (e._isAboutToRemove = !1));
            }),
            (i.prototype._prepareElementsByNode = function (l, d) {
                function t(t, e) {
                    var i,
                        s,
                        o = Math.round(e.position.left / p),
                        n = Math.floor((e.position.top + c / 2) / c);
                    if (("drag" !== t.type && ((i = Math.round(e.size.width / p)), (s = Math.round(e.size.height / c))), "drag" === t.type)) {
                        var r = e.position.top - d._prevYPix;
                        if (((d._prevYPix = e.position.top), m.updateScrollPosition(l[0], e, r), l.data("inTrashZone") || o < 0 || o >= u.grid.column || n < 0 || (!u.grid.float && n > u.grid.getGridHeight()))) {
                            if (d._temporaryRemoved) return;
                            !0 === u.opts.removable && u._setupRemovingTimeout(l),
                                (o = d._beforeDragX),
                                (n = d._beforeDragY),
                                u.placeholder.detach(),
                                u.placeholder.hide(),
                                u.grid.removeNode(d),
                                u._updateContainerHeight(),
                                (d._temporaryRemoved = !0);
                        } else
                            u._clearRemovingTimeout(l),
                                d._temporaryRemoved &&
                                    (u.grid.addNode(d),
                                    u.placeholder.attr("data-gs-x", o).attr("data-gs-y", n).attr("data-gs-width", i).attr("data-gs-height", s).show(),
                                    u.container.append(u.placeholder),
                                    (d.el = u.placeholder),
                                    (d._temporaryRemoved = !1));
                    } else if ("resize" === t.type && o < 0) return;
                    var a = void 0 !== i ? i : d.lastTriedWidth,
                        h = void 0 !== s ? s : d.lastTriedHeight;
                    !u.grid.canMoveNode(d, o, n, i, s) ||
                        (d.lastTriedX === o && d.lastTriedY === n && d.lastTriedWidth === a && d.lastTriedHeight === h) ||
                        ((d.lastTriedX = o), (d.lastTriedY = n), (d.lastTriedWidth = i), (d.lastTriedHeight = s), u.grid.moveNode(d, o, n, i, s), u._updateContainerHeight(), "resize" === t.type && f(t.target).trigger("gsresize", d));
                }
                function e(t, e) {
                    u.container.append(u.placeholder);
                    var i = f(this);
                    u.grid.cleanNodes(), u.grid.beginUpdate(d), (p = u.cellWidth());
                    var s = u.cellHeight();
                    (c = u.container.height() / parseInt(u.container.attr("data-gs-current-height"))),
                        u.placeholder.attr("data-gs-x", i.attr("data-gs-x")).attr("data-gs-y", i.attr("data-gs-y")).attr("data-gs-width", i.attr("data-gs-width")).attr("data-gs-height", i.attr("data-gs-height")).show(),
                        (d.el = u.placeholder),
                        (d._beforeDragX = d.x),
                        (d._beforeDragY = d.y),
                        (d._prevYPix = e.position.top);
                    var o = d.minHeight || 1,
                        n = u.opts.verticalMargin;
                    u.dd.resizable(l, "option", "minWidth", p * (d.minWidth || 1)), u.dd.resizable(l, "option", "minHeight", s * o + (o - 1) * n), "resizestart" === t.type && i.find(".grid-stack-item").trigger("resizestart");
                }
                function i(t, e) {
                    var i = f(this);
                    if (i.data("_gridstack_node")) {
                        if ((u.placeholder.detach(), (d.el = i), u.placeholder.hide(), d._isAboutToRemove)) l.data("_gridstack_node")._grid._triggerRemoveEvent(), l.removeData("_gridstack_node"), l.remove();
                        else
                            u._clearRemovingTimeout(l),
                                d._temporaryRemoved
                                    ? (m.removePositioningStyles(i),
                                      i.attr("data-gs-x", d._beforeDragX).attr("data-gs-y", d._beforeDragY).attr("data-gs-width", d.width).attr("data-gs-height", d.height),
                                      (d.x = d._beforeDragX),
                                      (d.y = d._beforeDragY),
                                      (d._temporaryRemoved = !1),
                                      u.grid.addNode(d))
                                    : (m.removePositioningStyles(i), i.attr("data-gs-x", d.x).attr("data-gs-y", d.y).attr("data-gs-width", d.width).attr("data-gs-height", d.height));
                        u._updateContainerHeight(), u._triggerChangeEvent(), u.grid.endUpdate();
                        var s = i.find(".grid-stack");
                        s.length &&
                            "resizestop" === t.type &&
                            (s.each(function (t, e) {
                                f(e).data("gridstack").onResizeHandler();
                            }),
                            i.find(".grid-stack-item").trigger("resizestop"),
                            i.find(".grid-stack-item").trigger("gsresizestop")),
                            "resizestop" === t.type && u.container.trigger("gsresizestop", i);
                    }
                }
                var p,
                    c,
                    u = this;
                this.dd.draggable(l, { start: e, stop: i, drag: t }).resizable(l, { start: e, stop: i, resize: t }),
                    (d.noMove || (this._isOneColumnMode() && !u.opts.disableOneColumnMode) || this.opts.disableDrag || this.opts.staticGrid) && this.dd.draggable(l, "disable"),
                    (d.noResize || (this._isOneColumnMode() && !u.opts.disableOneColumnMode) || this.opts.disableResize || this.opts.staticGrid) && this.dd.resizable(l, "disable"),
                    this._writeAttr(l, d);
            }),
            (i.prototype._prepareElement = function (t, e) {
                e = void 0 !== e && e;
                (t = f(t)).addClass(this.opts.itemClass);
                var i = this._readAttr(t, { el: t, _grid: this });
                (i = this.grid.addNode(i, e)), t.data("_gridstack_node", i), this._prepareElementsByNode(t, i);
            }),
            (i.prototype._writeAttr = function (t, e) {
                (t = f(t)),
                    void 0 !== (e = e || {}).x && t.attr("data-gs-x", e.x),
                    void 0 !== e.y && t.attr("data-gs-y", e.y),
                    void 0 !== e.width && t.attr("data-gs-width", e.width),
                    void 0 !== e.height && t.attr("data-gs-height", e.height),
                    void 0 !== e.autoPosition && t.attr("data-gs-auto-position", !!e.autoPosition || null),
                    void 0 !== e.minWidth && t.attr("data-gs-min-width", e.minWidth),
                    void 0 !== e.maxWidth && t.attr("data-gs-max-width", e.maxWidth),
                    void 0 !== e.minHeight && t.attr("data-gs-min-height", e.minHeight),
                    void 0 !== e.maxHeight && t.attr("data-gs-max-height", e.maxHeight),
                    void 0 !== e.noResize && t.attr("data-gs-no-resize", !!e.noResize || null),
                    void 0 !== e.noMove && t.attr("data-gs-no-move", !!e.noMove || null),
                    void 0 !== e.locked && t.attr("data-gs-locked", !!e.locked || null),
                    void 0 !== e.resizeHandles && t.attr("data-gs-resize-handles", e.resizeHandles),
                    void 0 !== e.id && t.attr("data-gs-id", e.id);
            }),
            (i.prototype._readAttr = function (t, e) {
                return (
                    (t = f(t)),
                    ((e = e || {}).x = t.attr("data-gs-x")),
                    (e.y = t.attr("data-gs-y")),
                    (e.width = t.attr("data-gs-width")),
                    (e.height = t.attr("data-gs-height")),
                    (e.autoPosition = m.toBool(t.attr("data-gs-auto-position"))),
                    (e.maxWidth = t.attr("data-gs-max-width")),
                    (e.minWidth = t.attr("data-gs-min-width")),
                    (e.maxHeight = t.attr("data-gs-max-height")),
                    (e.minHeight = t.attr("data-gs-min-height")),
                    (e.noResize = m.toBool(t.attr("data-gs-no-resize"))),
                    (e.noMove = m.toBool(t.attr("data-gs-no-move"))),
                    (e.locked = m.toBool(t.attr("data-gs-locked"))),
                    (e.resizeHandles = t.attr("data-gs-resize-handles")),
                    (e.id = t.attr("data-gs-id")),
                    e
                );
            }),
            (i.prototype.setAnimation = function (t) {
                t ? this.container.addClass("grid-stack-animate") : this.container.removeClass("grid-stack-animate");
            }),
            (i.prototype.addWidget = function (t, e, i, s, o, n, r, a, h, l, d) {
                return void 0 !== e && "object" != typeof e
                    ? this.addWidget(t, { x: e, y: i, width: s, height: o, autoPosition: n, minWidth: r, maxWidth: a, minHeight: h, maxHeight: l, id: d })
                    : ((e = e || {}), (t = f(t)), this._writeAttr(t, e), this.container.append(t), this._prepareElement(t, !0), this._updateContainerHeight(), this._triggerAddEvent(), t);
            }),
            (i.prototype.makeWidget = function (t) {
                return (t = f(t)), this._prepareElement(t, !0), this._updateContainerHeight(), this._triggerAddEvent(), t;
            }),
            (i.prototype.willItFit = function (t, e, i, s, o) {
                var n = { x: t, y: e, width: i, height: s, autoPosition: o };
                return this.grid.canBePlacedWithRespectToHeight(n);
            }),
            (i.prototype.removeWidget = function (t, e) {
                e = void 0 === e || e;
                var i = (t = f(t)).data("_gridstack_node");
                (i = i || this.grid.getNodeDataByDOMEl(t)), t.removeData("_gridstack_node"), this.grid.removeNode(i, e), this._triggerRemoveEvent();
            }),
            (i.prototype.removeAll = function (t) {
                !1 !== t &&
                    this.grid.nodes.forEach(function (t) {
                        t.el.removeData("_gridstack_node");
                    }),
                    this.grid.removeAll(t),
                    this._triggerRemoveEvent();
            }),
            (i.prototype.destroy = function (t) {
                f(window).off("resize", this.onResizeHandler),
                    this.disable(),
                    void 0 === t || t ? this.container.remove() : (this.removeAll(!1), this.container.removeData("gridstack")),
                    m.removeStylesheet(this._stylesId),
                    this.grid && (this.grid = null);
            }),
            (i.prototype.resizable = function (t, s) {
                var o = this;
                return (
                    (t = f(t)).each(function (t, e) {
                        var i = (e = f(e)).data("_gridstack_node");
                        i && ((i.noResize = !s), i.noResize || (o._isOneColumnMode() && !o.opts.disableOneColumnMode) ? o.dd.resizable(e, "disable") : o.dd.resizable(e, "enable"));
                    }),
                    this
                );
            }),
            (i.prototype.movable = function (t, s) {
                var o = this;
                return (
                    (t = f(t)).each(function (t, e) {
                        var i = (e = f(e)).data("_gridstack_node");
                        i &&
                            ((i.noMove = !s),
                            i.noMove || (o._isOneColumnMode() && !o.opts.disableOneColumnMode) ? (o.dd.draggable(e, "disable"), e.removeClass("ui-draggable-handle")) : (o.dd.draggable(e, "enable"), e.addClass("ui-draggable-handle")));
                    }),
                    this
                );
            }),
            (i.prototype.enableMove = function (t, e) {
                this.movable(this.container.children("." + this.opts.itemClass), t), e && (this.opts.disableDrag = !t);
            }),
            (i.prototype.enableResize = function (t, e) {
                this.resizable(this.container.children("." + this.opts.itemClass), t), e && (this.opts.disableResize = !t);
            }),
            (i.prototype.disable = function () {
                this.movable(this.container.children("." + this.opts.itemClass), !1), this.resizable(this.container.children("." + this.opts.itemClass), !1), this.container.trigger("disable");
            }),
            (i.prototype.enable = function () {
                this.movable(this.container.children("." + this.opts.itemClass), !0), this.resizable(this.container.children("." + this.opts.itemClass), !0), this.container.trigger("enable");
            }),
            (i.prototype.locked = function (t, s) {
                return (
                    (t = f(t)).each(function (t, e) {
                        var i = (e = f(e)).data("_gridstack_node");
                        i && ((i.locked = s || !1), e.attr("data-gs-locked", i.locked ? "yes" : null));
                    }),
                    this
                );
            }),
            (i.prototype.maxHeight = function (t, s) {
                return (
                    (t = f(t)).each(function (t, e) {
                        var i = (e = f(e)).data("_gridstack_node");
                        i && (isNaN(s) || ((i.maxHeight = s || !1), e.attr("data-gs-max-height", s)));
                    }),
                    this
                );
            }),
            (i.prototype.minHeight = function (t, s) {
                return (
                    (t = f(t)).each(function (t, e) {
                        var i = (e = f(e)).data("_gridstack_node");
                        i && (isNaN(s) || ((i.minHeight = s || !1), e.attr("data-gs-min-height", s)));
                    }),
                    this
                );
            }),
            (i.prototype.maxWidth = function (t, s) {
                return (
                    (t = f(t)).each(function (t, e) {
                        var i = (e = f(e)).data("_gridstack_node");
                        i && (isNaN(s) || ((i.maxWidth = s || !1), e.attr("data-gs-max-width", s)));
                    }),
                    this
                );
            }),
            (i.prototype.minWidth = function (t, s) {
                return (
                    (t = f(t)).each(function (t, e) {
                        var i = (e = f(e)).data("_gridstack_node");
                        i && (isNaN(s) || ((i.minWidth = s || !1), e.attr("data-gs-min-width", s)));
                    }),
                    this
                );
            }),
            (i.prototype._updateElement = function (t, e) {
                var i = (t = f(t).first()).data("_gridstack_node");
                if (i) {
                    var s = this;
                    s.grid.cleanNodes(), s.grid.beginUpdate(i), e.call(this, t, i), s._updateContainerHeight(), s._triggerChangeEvent(), s.grid.endUpdate();
                }
            }),
            (i.prototype.resize = function (t, i, s) {
                this._updateElement(t, function (t, e) {
                    (i = null != i ? i : e.width), (s = null != s ? s : e.height), this.grid.moveNode(e, e.x, e.y, i, s);
                });
            }),
            (i.prototype.move = function (t, i, s) {
                this._updateElement(t, function (t, e) {
                    (i = null != i ? i : e.x), (s = null != s ? s : e.y), this.grid.moveNode(e, i, s, e.width, e.height);
                });
            }),
            (i.prototype.update = function (t, i, s, o, n) {
                this._updateElement(t, function (t, e) {
                    (i = null != i ? i : e.x), (s = null != s ? s : e.y), (o = null != o ? o : e.width), (n = null != n ? n : e.height), this.grid.moveNode(e, i, s, o, n);
                });
            }),
            (i.prototype.compact = function () {
                if (0 !== this.grid.nodes.length) {
                    this.batchUpdate(), this.grid._sortNodes();
                    var t = this.grid.nodes;
                    (this.grid.nodes = []),
                        t.forEach(function (t) {
                            t.noMove || t.locked || (t.autoPosition = !0), this.grid.addNode(t, !1);
                        }, this),
                        this.commit();
                }
            }),
            (i.prototype.verticalMargin = function (t, e) {
                if (void 0 === t) return this.opts.verticalMargin;
                var i = m.parseHeight(t);
                (this.opts.verticalMarginUnit === i.unit && this.opts.maxRow === i.height) || ((this.opts.verticalMarginUnit = i.unit), (this.opts.verticalMargin = i.height), e || this._updateStyles());
            }),
            (i.prototype.cellHeight = function (t, e) {
                if (void 0 === t) {
                    if (this.opts.cellHeight && "auto" !== this.opts.cellHeight) return this.opts.cellHeight;
                    var i = this.container.children("." + this.opts.itemClass).first(),
                        s = i.attr("data-gs-height"),
                        o = this.opts.verticalMargin;
                    return Math.round((i.outerHeight() - (s - 1) * o) / s);
                }
                var n = m.parseHeight(t);
                (this.opts.cellHeightUnit === n.unit && this.opts.cellHeight === n.height) || ((this.opts.cellHeightUnit = n.unit), (this.opts.cellHeight = n.height), e || this._updateStyles());
            }),
            (i.prototype.cellWidth = function () {
                return Math.round(this.container.outerWidth() / this.opts.column);
            }),
            (i.prototype.getCellFromPixel = function (t, e) {
                var i = void 0 !== e && e ? this.container.offset() : this.container.position(),
                    s = t.left - i.left,
                    o = t.top - i.top,
                    n = Math.floor(this.container.width() / this.opts.column),
                    r = Math.floor(this.container.height() / parseInt(this.container.attr("data-gs-current-height")));
                return { x: Math.floor(s / n), y: Math.floor(o / r) };
            }),
            (i.prototype.batchUpdate = function () {
                this.grid.batchUpdate();
            }),
            (i.prototype.commit = function () {
                this.grid.commit(), this._triggerRemoveEvent(), this._triggerAddEvent(), this._triggerChangeEvent();
            }),
            (i.prototype.isAreaEmpty = function (t, e, i, s) {
                return this.grid.isAreaEmpty(t, e, i, s);
            }),
            (i.prototype.setStatic = function (t) {
                (this.opts.staticGrid = !0 === t), this.enableMove(!t), this.enableResize(!t), this._setStaticClass();
            }),
            (i.prototype._setStaticClass = function () {
                var t = "grid-stack-static";
                !0 === this.opts.staticGrid ? this.container.addClass(t) : this.container.removeClass(t);
            }),
            (p.prototype._layoutsNodesChange = function (t) {
                this._layouts &&
                    !this._ignoreLayoutsNodeChange &&
                    this._layouts.forEach(function (s, o) {
                        s &&
                            o !== this.column &&
                            (o < this.column
                                ? (this._layouts[o] = void 0)
                                : t.forEach(function (e) {
                                      var t = s.find(function (t) {
                                          return t._id === e._id;
                                      });
                                      if (t) {
                                          var i = o / this.column;
                                          (t.y = e.y), (t.x = Math.round(e.x * i));
                                      }
                                  }, this));
                    }, this);
            }),
            (p.prototype._updateNodeWidths = function (e, t) {
                if (0 !== this.nodes.length && e !== t) {
                    var i = m.sort(this.nodes, -1, e),
                        s = [i.length];
                    i.forEach(function (t, e) {
                        s[e] = { x: t.x, y: t.y, width: t.width, _id: t._id };
                    }),
                        (this._layouts = this._layouts || []),
                        (this._layouts[e] = s);
                    var o = this._layouts.length - 1,
                        n = this._layouts[t] || [];
                    0 === n.length &&
                        e < t &&
                        t < o &&
                        (n = this._layouts[o] || []).length &&
                        ((e = o),
                        n.forEach(function (e) {
                            var t = i.findIndex(function (t) {
                                return t && t._id === e._id;
                            });
                            -1 !== t && ((i[t].x = e.x), (i[t].y = e.y), (i[t].width = e.width));
                        }),
                        (n = []));
                    var r = [];
                    n.forEach(function (e) {
                        var t = i.findIndex(function (t) {
                            return t && t._id === e._id;
                        });
                        -1 !== t && ((i[t].x = e.x), (i[t].y = e.y), (i[t].width = e.width), r.push(i[t]), (i[t] = null));
                    });
                    var a = t / e;
                    i.forEach(function (t) {
                        t && ((t.x = Math.round(t.x * a)), (t.width = 1 === e ? 1 : Math.round(t.width * a) || 1), r.push(t));
                    }),
                        (r = m.sort(r, -1, t)),
                        (this._ignoreLayoutsNodeChange = !0),
                        this.batchUpdate(),
                        (this.nodes = []),
                        r.forEach(function (t) {
                            this.addNode(t, !1), (t._dirty = !0);
                        }, this),
                        this.commit(),
                        delete this._ignoreLayoutsNodeChange;
                }
            }),
            (i.prototype.setColumn = function (t, e) {
                if (this.opts.column !== t) {
                    var i = this.opts.column;
                    this.container.removeClass("grid-stack-" + i),
                        this.container.addClass("grid-stack-" + t),
                        (this.opts.column = this.grid.column = t),
                        !0 !== e && (this.grid._updateNodeWidths(i, t), (this.grid._ignoreLayoutsNodeChange = !0), this._triggerChangeEvent(), delete this.grid._ignoreLayoutsNodeChange);
                }
            }),
            (i.prototype.float = function (t) {
                if (void 0 === t) return this.opts.float || !1;
                this.opts.float !== t && ((this.opts.float = this.grid.float = t || !1), t || (this.grid._packNodes(), this.grid._notify()));
            }),
            (i.prototype.setGridWidth = ((s = "setGridWidth"), (o = "setColumn"), (n.prototype = (e = i.prototype.setColumn).prototype), n)),
            (t.GridStackUI = i),
            (t.GridStackUI.Utils = m),
            (t.GridStackUI.Engine = p),
            (t.GridStackUI.GridStackDragDropPlugin = d),
            (f.fn.gridstack = function (e) {
                return this.each(function () {
                    var t = f(this);
                    t.data("gridstack") || t.data("gridstack", new i(this, e));
                });
            }),
            t.GridStackUI
        );
    }),
    /*! jQuery UI - v1.12.1 - 2019-11-20
     * http://jqueryui.com
     * Includes: widget.js, data.js, disable-selection.js, scroll-parent.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/mouse.js
     * Copyright jQuery Foundation and other contributors; Licensed MIT @preserve*/
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
    })(function (y) {
        y.ui = y.ui || {};
        y.ui.version = "1.12.1";
        var o,
            i = 0,
            a = Array.prototype.slice;
        (y.cleanData =
            ((o = y.cleanData),
            function (t) {
                var e, i, s;
                for (s = 0; null != (i = t[s]); s++)
                    try {
                        (e = y._data(i, "events")) && e.remove && y(i).triggerHandler("remove");
                    } catch (t) {}
                o(t);
            })),
            (y.widget = function (t, i, e) {
                var s,
                    o,
                    n,
                    r = {},
                    a = t.split(".")[0],
                    h = a + "-" + (t = t.split(".")[1]);
                return (
                    e || ((e = i), (i = y.Widget)),
                    y.isArray(e) && (e = y.extend.apply(null, [{}].concat(e))),
                    (y.expr[":"][h.toLowerCase()] = function (t) {
                        return !!y.data(t, h);
                    }),
                    (y[a] = y[a] || {}),
                    (s = y[a][t]),
                    (o = y[a][t] = function (t, e) {
                        if (!this._createWidget) return new o(t, e);
                        arguments.length && this._createWidget(t, e);
                    }),
                    y.extend(o, s, { version: e.version, _proto: y.extend({}, e), _childConstructors: [] }),
                    ((n = new i()).options = y.widget.extend({}, n.options)),
                    y.each(e, function (e, s) {
                        function o() {
                            return i.prototype[e].apply(this, arguments);
                        }
                        function n(t) {
                            return i.prototype[e].apply(this, t);
                        }
                        y.isFunction(s)
                            ? (r[e] = function () {
                                  var t,
                                      e = this._super,
                                      i = this._superApply;
                                  return (this._super = o), (this._superApply = n), (t = s.apply(this, arguments)), (this._super = e), (this._superApply = i), t;
                              })
                            : (r[e] = s);
                    }),
                    (o.prototype = y.widget.extend(n, { widgetEventPrefix: (s && n.widgetEventPrefix) || t }, r, { constructor: o, namespace: a, widgetName: t, widgetFullName: h })),
                    s
                        ? (y.each(s._childConstructors, function (t, e) {
                              var i = e.prototype;
                              y.widget(i.namespace + "." + i.widgetName, o, e._proto);
                          }),
                          delete s._childConstructors)
                        : i._childConstructors.push(o),
                    y.widget.bridge(t, o),
                    o
                );
            }),
            (y.widget.extend = function (t) {
                for (var e, i, s = a.call(arguments, 1), o = 0, n = s.length; o < n; o++)
                    for (e in s[o]) (i = s[o][e]), s[o].hasOwnProperty(e) && void 0 !== i && (y.isPlainObject(i) ? (t[e] = y.isPlainObject(t[e]) ? y.widget.extend({}, t[e], i) : y.widget.extend({}, i)) : (t[e] = i));
                return t;
            }),
            (y.widget.bridge = function (n, e) {
                var r = e.prototype.widgetFullName || n;
                y.fn[n] = function (i) {
                    var t = "string" == typeof i,
                        s = a.call(arguments, 1),
                        o = this;
                    return (
                        t
                            ? this.length || "instance" !== i
                                ? this.each(function () {
                                      var t,
                                          e = y.data(this, r);
                                      return "instance" === i
                                          ? ((o = e), !1)
                                          : e
                                          ? y.isFunction(e[i]) && "_" !== i.charAt(0)
                                              ? (t = e[i].apply(e, s)) !== e && void 0 !== t
                                                  ? ((o = t && t.jquery ? o.pushStack(t.get()) : t), !1)
                                                  : void 0
                                              : y.error("no such method '" + i + "' for " + n + " widget instance")
                                          : y.error("cannot call methods on " + n + " prior to initialization; attempted to call method '" + i + "'");
                                  })
                                : (o = void 0)
                            : (s.length && (i = y.widget.extend.apply(null, [i].concat(s))),
                              this.each(function () {
                                  var t = y.data(this, r);
                                  t ? (t.option(i || {}), t._init && t._init()) : y.data(this, r, new e(i, this));
                              })),
                        o
                    );
                };
            }),
            (y.Widget = function () {}),
            (y.Widget._childConstructors = []),
            (y.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: { classes: {}, disabled: !1, create: null },
                _createWidget: function (t, e) {
                    (e = y(e || this.defaultElement || this)[0]),
                        (this.element = y(e)),
                        (this.uuid = i++),
                        (this.eventNamespace = "." + this.widgetName + this.uuid),
                        (this.bindings = y()),
                        (this.hoverable = y()),
                        (this.focusable = y()),
                        (this.classesElementLookup = {}),
                        e !== this &&
                            (y.data(e, this.widgetFullName, this),
                            this._on(!0, this.element, {
                                remove: function (t) {
                                    t.target === e && this.destroy();
                                },
                            }),
                            (this.document = y(e.style ? e.ownerDocument : e.document || e)),
                            (this.window = y(this.document[0].defaultView || this.document[0].parentWindow))),
                        (this.options = y.widget.extend({}, this.options, this._getCreateOptions(), t)),
                        this._create(),
                        this.options.disabled && this._setOptionDisabled(this.options.disabled),
                        this._trigger("create", null, this._getCreateEventData()),
                        this._init();
                },
                _getCreateOptions: function () {
                    return {};
                },
                _getCreateEventData: y.noop,
                _create: y.noop,
                _init: y.noop,
                destroy: function () {
                    var i = this;
                    this._destroy(),
                        y.each(this.classesElementLookup, function (t, e) {
                            i._removeClass(e, t);
                        }),
                        this.element.off(this.eventNamespace).removeData(this.widgetFullName),
                        this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
                        this.bindings.off(this.eventNamespace);
                },
                _destroy: y.noop,
                widget: function () {
                    return this.element;
                },
                option: function (t, e) {
                    var i,
                        s,
                        o,
                        n = t;
                    if (0 === arguments.length) return y.widget.extend({}, this.options);
                    if ("string" == typeof t)
                        if (((n = {}), (t = (i = t.split(".")).shift()), i.length)) {
                            for (s = n[t] = y.widget.extend({}, this.options[t]), o = 0; o < i.length - 1; o++) (s[i[o]] = s[i[o]] || {}), (s = s[i[o]]);
                            if (((t = i.pop()), 1 === arguments.length)) return void 0 === s[t] ? null : s[t];
                            s[t] = e;
                        } else {
                            if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                            n[t] = e;
                        }
                    return this._setOptions(n), this;
                },
                _setOptions: function (t) {
                    var e;
                    for (e in t) this._setOption(e, t[e]);
                    return this;
                },
                _setOption: function (t, e) {
                    return "classes" === t && this._setOptionClasses(e), (this.options[t] = e), "disabled" === t && this._setOptionDisabled(e), this;
                },
                _setOptionClasses: function (t) {
                    var e, i, s;
                    for (e in t) (s = this.classesElementLookup[e]), t[e] !== this.options.classes[e] && s && s.length && ((i = y(s.get())), this._removeClass(s, e), i.addClass(this._classes({ element: i, keys: e, classes: t, add: !0 })));
                },
                _setOptionDisabled: function (t) {
                    this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
                },
                enable: function () {
                    return this._setOptions({ disabled: !1 });
                },
                disable: function () {
                    return this._setOptions({ disabled: !0 });
                },
                _classes: function (o) {
                    var n = [],
                        r = this;
                    function t(t, e) {
                        var i, s;
                        for (s = 0; s < t.length; s++)
                            (i = r.classesElementLookup[t[s]] || y()),
                                (i = o.add ? y(y.unique(i.get().concat(o.element.get()))) : y(i.not(o.element).get())),
                                (r.classesElementLookup[t[s]] = i),
                                n.push(t[s]),
                                e && o.classes[t[s]] && n.push(o.classes[t[s]]);
                    }
                    return (
                        (o = y.extend({ element: this.element, classes: this.options.classes || {} }, o)),
                        this._on(o.element, { remove: "_untrackClassesElement" }),
                        o.keys && t(o.keys.match(/\S+/g) || [], !0),
                        o.extra && t(o.extra.match(/\S+/g) || []),
                        n.join(" ")
                    );
                },
                _untrackClassesElement: function (i) {
                    var s = this;
                    y.each(s.classesElementLookup, function (t, e) {
                        -1 !== y.inArray(i.target, e) && (s.classesElementLookup[t] = y(e.not(i.target).get()));
                    });
                },
                _removeClass: function (t, e, i) {
                    return this._toggleClass(t, e, i, !1);
                },
                _addClass: function (t, e, i) {
                    return this._toggleClass(t, e, i, !0);
                },
                _toggleClass: function (t, e, i, s) {
                    s = "boolean" == typeof s ? s : i;
                    var o = "string" == typeof t || null === t,
                        n = { extra: o ? e : i, keys: o ? t : e, element: o ? this.element : t, add: s };
                    return n.element.toggleClass(this._classes(n), s), this;
                },
                _on: function (r, a, t) {
                    var h,
                        l = this;
                    "boolean" != typeof r && ((t = a), (a = r), (r = !1)),
                        t ? ((a = h = y(a)), (this.bindings = this.bindings.add(a))) : ((t = a), (a = this.element), (h = this.widget())),
                        y.each(t, function (t, e) {
                            function i() {
                                if (r || (!0 !== l.options.disabled && !y(this).hasClass("ui-state-disabled"))) return ("string" == typeof e ? l[e] : e).apply(l, arguments);
                            }
                            "string" != typeof e && (i.guid = e.guid = e.guid || i.guid || y.guid++);
                            var s = t.match(/^([\w:-]*)\s*(.*)$/),
                                o = s[1] + l.eventNamespace,
                                n = s[2];
                            n ? h.on(o, n, i) : a.on(o, i);
                        });
                },
                _off: function (t, e) {
                    (e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
                        t.off(e).off(e),
                        (this.bindings = y(this.bindings.not(t).get())),
                        (this.focusable = y(this.focusable.not(t).get())),
                        (this.hoverable = y(this.hoverable.not(t).get()));
                },
                _delay: function (t, e) {
                    var i = this;
                    return setTimeout(function () {
                        return ("string" == typeof t ? i[t] : t).apply(i, arguments);
                    }, e || 0);
                },
                _hoverable: function (t) {
                    (this.hoverable = this.hoverable.add(t)),
                        this._on(t, {
                            mouseenter: function (t) {
                                this._addClass(y(t.currentTarget), null, "ui-state-hover");
                            },
                            mouseleave: function (t) {
                                this._removeClass(y(t.currentTarget), null, "ui-state-hover");
                            },
                        });
                },
                _focusable: function (t) {
                    (this.focusable = this.focusable.add(t)),
                        this._on(t, {
                            focusin: function (t) {
                                this._addClass(y(t.currentTarget), null, "ui-state-focus");
                            },
                            focusout: function (t) {
                                this._removeClass(y(t.currentTarget), null, "ui-state-focus");
                            },
                        });
                },
                _trigger: function (t, e, i) {
                    var s,
                        o,
                        n = this.options[t];
                    if (((i = i || {}), ((e = y.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase()), (e.target = this.element[0]), (o = e.originalEvent))) for (s in o) s in e || (e[s] = o[s]);
                    return this.element.trigger(e, i), !((y.isFunction(n) && !1 === n.apply(this.element[0], [e].concat(i))) || e.isDefaultPrevented());
                },
            }),
            y.each({ show: "fadeIn", hide: "fadeOut" }, function (n, r) {
                y.Widget.prototype["_" + n] = function (e, t, i) {
                    var s;
                    "string" == typeof t && (t = { effect: t });
                    var o = t ? (!0 === t || "number" == typeof t ? r : t.effect || r) : n;
                    "number" == typeof (t = t || {}) && (t = { duration: t }),
                        (s = !y.isEmptyObject(t)),
                        (t.complete = i),
                        t.delay && e.delay(t.delay),
                        s && y.effects && y.effects.effect[o]
                            ? e[n](t)
                            : o !== n && e[o]
                            ? e[o](t.duration, t.easing, i)
                            : e.queue(function (t) {
                                  y(this)[n](), i && i.call(e[0]), t();
                              });
                };
            });
        y.widget,
            y.extend(y.expr[":"], {
                data: y.expr.createPseudo
                    ? y.expr.createPseudo(function (e) {
                          return function (t) {
                              return !!y.data(t, e);
                          };
                      })
                    : function (t, e, i) {
                          return !!y.data(t, i[3]);
                      },
            }),
            y.fn.extend({
                disableSelection:
                    ((t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"),
                    function () {
                        return this.on(t + ".ui-disableSelection", function (t) {
                            t.preventDefault();
                        });
                    }),
                enableSelection: function () {
                    return this.off(".ui-disableSelection");
                },
            }),
            (y.fn.scrollParent = function (t) {
                var e = this.css("position"),
                    i = "absolute" === e,
                    s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    o = this.parents()
                        .filter(function () {
                            var t = y(this);
                            return (!i || "static" !== t.css("position")) && s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"));
                        })
                        .eq(0);
                return "fixed" !== e && o.length ? o : y(this[0].ownerDocument || document);
            }),
            (y.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
        var t,
            n = !1;
        y(document).on("mouseup", function () {
            n = !1;
        });
        y.widget("ui.mouse", {
            version: "1.12.1",
            options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 },
            _mouseInit: function () {
                var e = this;
                this.element
                    .on("mousedown." + this.widgetName, function (t) {
                        return e._mouseDown(t);
                    })
                    .on("click." + this.widgetName, function (t) {
                        if (!0 === y.data(t.target, e.widgetName + ".preventClickEvent")) return y.removeData(t.target, e.widgetName + ".preventClickEvent"), t.stopImmediatePropagation(), !1;
                    }),
                    (this.started = !1);
            },
            _mouseDestroy: function () {
                this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
            },
            _mouseDown: function (t) {
                if (!n) {
                    (this._mouseMoved = !1), this._mouseStarted && this._mouseUp(t), (this._mouseDownEvent = t);
                    var e = this,
                        i = 1 === t.which,
                        s = !("string" != typeof this.options.cancel || !t.target.nodeName) && y(t.target).closest(this.options.cancel).length;
                    return (
                        !(i && !s && this._mouseCapture(t)) ||
                        ((this.mouseDelayMet = !this.options.delay),
                        this.mouseDelayMet ||
                            (this._mouseDelayTimer = setTimeout(function () {
                                e.mouseDelayMet = !0;
                            }, this.options.delay)),
                        this._mouseDistanceMet(t) && this._mouseDelayMet(t) && ((this._mouseStarted = !1 !== this._mouseStart(t)), !this._mouseStarted)
                            ? (t.preventDefault(), !0)
                            : (!0 === y.data(t.target, this.widgetName + ".preventClickEvent") && y.removeData(t.target, this.widgetName + ".preventClickEvent"),
                              (this._mouseMoveDelegate = function (t) {
                                  return e._mouseMove(t);
                              }),
                              (this._mouseUpDelegate = function (t) {
                                  return e._mouseUp(t);
                              }),
                              this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate),
                              t.preventDefault(),
                              (n = !0)))
                    );
                }
            },
            _mouseMove: function (t) {
                if (this._mouseMoved) {
                    if (y.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button) return this._mouseUp(t);
                    if (!t.which)
                        if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                        else if (!this.ignoreMissingWhich) return this._mouseUp(t);
                }
                return (
                    (t.which || t.button) && (this._mouseMoved = !0),
                    this._mouseStarted
                        ? (this._mouseDrag(t), t.preventDefault())
                        : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t)), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
                );
            },
            _mouseUp: function (t) {
                this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate),
                    this._mouseStarted && ((this._mouseStarted = !1), t.target === this._mouseDownEvent.target && y.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)),
                    this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
                    (this.ignoreMissingWhich = !1),
                    (n = !1),
                    t.preventDefault();
            },
            _mouseDistanceMet: function (t) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
            },
            _mouseDelayMet: function () {
                return this.mouseDelayMet;
            },
            _mouseStart: function () {},
            _mouseDrag: function () {},
            _mouseStop: function () {},
            _mouseCapture: function () {
                return !0;
            },
        }),
            (y.ui.plugin = {
                add: function (t, e, i) {
                    var s,
                        o = y.ui[t].prototype;
                    for (s in i) (o.plugins[s] = o.plugins[s] || []), o.plugins[s].push([e, i[s]]);
                },
                call: function (t, e, i, s) {
                    var o,
                        n = t.plugins[e];
                    if (n && (s || (t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))) for (o = 0; o < n.length; o++) t.options[n[o][0]] && n[o][1].apply(t.element, i);
                },
            }),
            (y.ui.safeActiveElement = function (e) {
                var i;
                try {
                    i = e.activeElement;
                } catch (t) {
                    i = e.body;
                }
                return (i = i || e.body).nodeName || (i = e.body), i;
            }),
            (y.ui.safeBlur = function (t) {
                t && "body" !== t.nodeName.toLowerCase() && y(t).trigger("blur");
            });
        y.widget("ui.draggable", y.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null,
            },
            _create: function () {
                "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit();
            },
            _setOption: function (t, e) {
                this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName());
            },
            _destroy: function () {
                (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0) : (this._removeHandleClassName(), this._mouseDestroy());
            },
            _mouseCapture: function (t) {
                var e = this.options;
                return (
                    !(this.helper || e.disabled || 0 < y(t.target).closest(".ui-resizable-handle").length) &&
                    ((this.handle = this._getHandle(t)), !!this.handle && (this._blurActiveElement(t), this._blockFrames(!0 === e.iframeFix ? "iframe" : e.iframeFix), !0))
                );
            },
            _blockFrames: function (t) {
                this.iframeBlocks = this.document.find(t).map(function () {
                    var t = y(this);
                    return y("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0];
                });
            },
            _unblockFrames: function () {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
            },
            _blurActiveElement: function (t) {
                var e = y.ui.safeActiveElement(this.document[0]);
                y(t.target).closest(e).length || y.ui.safeBlur(e);
            },
            _mouseStart: function (t) {
                var e = this.options;
                return (
                    (this.helper = this._createHelper(t)),
                    this._addClass(this.helper, "ui-draggable-dragging"),
                    this._cacheHelperProportions(),
                    y.ui.ddmanager && (y.ui.ddmanager.current = this),
                    this._cacheMargins(),
                    (this.cssPosition = this.helper.css("position")),
                    (this.scrollParent = this.helper.scrollParent(!0)),
                    (this.offsetParent = this.helper.offsetParent()),
                    (this.hasFixedAncestor =
                        0 <
                        this.helper.parents().filter(function () {
                            return "fixed" === y(this).css("position");
                        }).length),
                    (this.positionAbs = this.element.offset()),
                    this._refreshOffsets(t),
                    (this.originalPosition = this.position = this._generatePosition(t, !1)),
                    (this.originalPageX = t.pageX),
                    (this.originalPageY = t.pageY),
                    e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
                    this._setContainment(),
                    !1 === this._trigger("start", t)
                        ? (this._clear(), !1)
                        : (this._cacheHelperProportions(), y.ui.ddmanager && !e.dropBehaviour && y.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), y.ui.ddmanager && y.ui.ddmanager.dragStart(this, t), !0)
                );
            },
            _refreshOffsets: function (t) {
                (this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }),
                    (this.offset.click = { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top });
            },
            _mouseDrag: function (t, e) {
                if ((this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), (this.position = this._generatePosition(t, !0)), (this.positionAbs = this._convertPositionTo("absolute")), !e)) {
                    var i = this._uiHash();
                    if (!1 === this._trigger("drag", t, i)) return this._mouseUp(new y.Event("mouseup", t)), !1;
                    this.position = i.position;
                }
                return (this.helper[0].style.left = this.position.left + "px"), (this.helper[0].style.top = this.position.top + "px"), y.ui.ddmanager && y.ui.ddmanager.drag(this, t), !1;
            },
            _mouseStop: function (t) {
                var e = this,
                    i = !1;
                return (
                    y.ui.ddmanager && !this.options.dropBehaviour && (i = y.ui.ddmanager.drop(this, t)),
                    this.dropped && ((i = this.dropped), (this.dropped = !1)),
                    ("invalid" === this.options.revert && !i) || ("valid" === this.options.revert && i) || !0 === this.options.revert || (y.isFunction(this.options.revert) && this.options.revert.call(this.element, i))
                        ? y(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                              !1 !== e._trigger("stop", t) && e._clear();
                          })
                        : !1 !== this._trigger("stop", t) && this._clear(),
                    !1
                );
            },
            _mouseUp: function (t) {
                return this._unblockFrames(), y.ui.ddmanager && y.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.trigger("focus"), y.ui.mouse.prototype._mouseUp.call(this, t);
            },
            cancel: function () {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new y.Event("mouseup", { target: this.element[0] })) : this._clear(), this;
            },
            _getHandle: function (t) {
                return !this.options.handle || !!y(t.target).closest(this.element.find(this.options.handle)).length;
            },
            _setHandleClassName: function () {
                (this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element), this._addClass(this.handleElement, "ui-draggable-handle");
            },
            _removeHandleClassName: function () {
                this._removeClass(this.handleElement, "ui-draggable-handle");
            },
            _createHelper: function (t) {
                var e = this.options,
                    i = y.isFunction(e.helper),
                    s = i ? y(e.helper.apply(this.element[0], [t])) : "clone" === e.helper ? this.element.clone().removeAttr("id") : this.element;
                return (
                    s.parents("body").length || s.appendTo("parent" === e.appendTo ? this.element[0].parentNode : e.appendTo),
                    i && s[0] === this.element[0] && this._setPositionRelative(),
                    s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
                    s
                );
            },
            _setPositionRelative: function () {
                /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
            },
            _adjustOffsetFromHelper: function (t) {
                "string" == typeof t && (t = t.split(" ")),
                    y.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }),
                    "left" in t && (this.offset.click.left = t.left + this.margins.left),
                    "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
                    "top" in t && (this.offset.click.top = t.top + this.margins.top),
                    "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
            },
            _isRootNode: function (t) {
                return /(html|body)/i.test(t.tagName) || t === this.document[0];
            },
            _getParentOffset: function () {
                var t = this.offsetParent.offset(),
                    e = this.document[0];
                return (
                    "absolute" === this.cssPosition && this.scrollParent[0] !== e && y.contains(this.scrollParent[0], this.offsetParent[0]) && ((t.left += this.scrollParent.scrollLeft()), (t.top += this.scrollParent.scrollTop())),
                    this._isRootNode(this.offsetParent[0]) && (t = { top: 0, left: 0 }),
                    { top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
                );
            },
            _getRelativeOffset: function () {
                if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
                var t = this.element.position(),
                    e = this._isRootNode(this.scrollParent[0]);
                return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft()) };
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
                };
            },
            _cacheHelperProportions: function () {
                this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
            },
            _setContainment: function () {
                var t,
                    e,
                    i,
                    s = this.options,
                    o = this.document[0];
                (this.relativeContainer = null),
                    s.containment
                        ? "window" !== s.containment
                            ? "document" !== s.containment
                                ? s.containment.constructor !== Array
                                    ? ("parent" === s.containment && (s.containment = this.helper[0].parentNode),
                                      (i = (e = y(s.containment))[0]) &&
                                          ((t = /(scroll|auto)/.test(e.css("overflow"))),
                                          (this.containment = [
                                              (parseInt(e.css("borderLeftWidth"), 10) || 0) + (parseInt(e.css("paddingLeft"), 10) || 0),
                                              (parseInt(e.css("borderTopWidth"), 10) || 0) + (parseInt(e.css("paddingTop"), 10) || 0),
                                              (t ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) -
                                                  (parseInt(e.css("borderRightWidth"), 10) || 0) -
                                                  (parseInt(e.css("paddingRight"), 10) || 0) -
                                                  this.helperProportions.width -
                                                  this.margins.left -
                                                  this.margins.right,
                                              (t ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) -
                                                  (parseInt(e.css("borderBottomWidth"), 10) || 0) -
                                                  (parseInt(e.css("paddingBottom"), 10) || 0) -
                                                  this.helperProportions.height -
                                                  this.margins.top -
                                                  this.margins.bottom,
                                          ]),
                                          (this.relativeContainer = e)))
                                    : (this.containment = s.containment)
                                : (this.containment = [0, 0, y(o).width() - this.helperProportions.width - this.margins.left, (y(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top])
                            : (this.containment = [
                                  y(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
                                  y(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
                                  y(window).scrollLeft() + y(window).width() - this.helperProportions.width - this.margins.left,
                                  y(window).scrollTop() + (y(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top,
                              ])
                        : (this.containment = null);
            },
            _convertPositionTo: function (t, e) {
                e = e || this.position;
                var i = "absolute" === t ? 1 : -1,
                    s = this._isRootNode(this.scrollParent[0]);
                return {
                    top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                    left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i,
                };
            },
            _generatePosition: function (t, e) {
                var i,
                    s,
                    o,
                    n,
                    r = this.options,
                    a = this._isRootNode(this.scrollParent[0]),
                    h = t.pageX,
                    l = t.pageY;
                return (
                    (a && this.offset.scroll) || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }),
                    e &&
                        (this.containment &&
                            ((i = this.relativeContainer ? ((s = this.relativeContainer.offset()), [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : this.containment),
                            t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left),
                            t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top),
                            t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left),
                            t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)),
                        r.grid &&
                            ((o = r.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY),
                            (l = i ? (o - this.offset.click.top >= i[1] || o - this.offset.click.top > i[3] ? o : o - this.offset.click.top >= i[1] ? o - r.grid[1] : o + r.grid[1]) : o),
                            (n = r.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX),
                            (h = i ? (n - this.offset.click.left >= i[0] || n - this.offset.click.left > i[2] ? n : n - this.offset.click.left >= i[0] ? n - r.grid[0] : n + r.grid[0]) : n)),
                        "y" === r.axis && (h = this.originalPageX),
                        "x" === r.axis && (l = this.originalPageY)),
                    {
                        top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top),
                        left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left),
                    }
                );
            },
            _clear: function () {
                this._removeClass(this.helper, "ui-draggable-dragging"),
                    this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
                    (this.helper = null),
                    (this.cancelHelperRemoval = !1),
                    this.destroyOnClear && this.destroy();
            },
            _trigger: function (t, e, i) {
                return (
                    (i = i || this._uiHash()),
                    y.ui.plugin.call(this, t, [e, i, this], !0),
                    /^(drag|start|stop)/.test(t) && ((this.positionAbs = this._convertPositionTo("absolute")), (i.offset = this.positionAbs)),
                    y.Widget.prototype._trigger.call(this, t, e, i)
                );
            },
            plugins: {},
            _uiHash: function () {
                return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs };
            },
        }),
            y.ui.plugin.add("draggable", "connectToSortable", {
                start: function (e, t, i) {
                    var s = y.extend({}, t, { item: i.element });
                    (i.sortables = []),
                        y(i.options.connectToSortable).each(function () {
                            var t = y(this).sortable("instance");
                            t && !t.options.disabled && (i.sortables.push(t), t.refreshPositions(), t._trigger("activate", e, s));
                        });
                },
                stop: function (e, t, i) {
                    var s = y.extend({}, t, { item: i.element });
                    (i.cancelHelperRemoval = !1),
                        y.each(i.sortables, function () {
                            var t = this;
                            t.isOver
                                ? ((t.isOver = 0),
                                  (i.cancelHelperRemoval = !0),
                                  (t.cancelHelperRemoval = !1),
                                  (t._storedCSS = { position: t.placeholder.css("position"), top: t.placeholder.css("top"), left: t.placeholder.css("left") }),
                                  t._mouseStop(e),
                                  (t.options.helper = t.options._helper))
                                : ((t.cancelHelperRemoval = !0), t._trigger("deactivate", e, s));
                        });
                },
                drag: function (i, s, o) {
                    y.each(o.sortables, function () {
                        var t = !1,
                            e = this;
                        (e.positionAbs = o.positionAbs),
                            (e.helperProportions = o.helperProportions),
                            (e.offset.click = o.offset.click),
                            e._intersectsWith(e.containerCache) &&
                                ((t = !0),
                                y.each(o.sortables, function () {
                                    return (
                                        (this.positionAbs = o.positionAbs),
                                        (this.helperProportions = o.helperProportions),
                                        (this.offset.click = o.offset.click),
                                        this !== e && this._intersectsWith(this.containerCache) && y.contains(e.element[0], this.element[0]) && (t = !1),
                                        t
                                    );
                                })),
                            t
                                ? (e.isOver ||
                                      ((e.isOver = 1),
                                      (o._parent = s.helper.parent()),
                                      (e.currentItem = s.helper.appendTo(e.element).data("ui-sortable-item", !0)),
                                      (e.options._helper = e.options.helper),
                                      (e.options.helper = function () {
                                          return s.helper[0];
                                      }),
                                      (i.target = e.currentItem[0]),
                                      e._mouseCapture(i, !0),
                                      e._mouseStart(i, !0, !0),
                                      (e.offset.click.top = o.offset.click.top),
                                      (e.offset.click.left = o.offset.click.left),
                                      (e.offset.parent.left -= o.offset.parent.left - e.offset.parent.left),
                                      (e.offset.parent.top -= o.offset.parent.top - e.offset.parent.top),
                                      o._trigger("toSortable", i),
                                      (o.dropped = e.element),
                                      y.each(o.sortables, function () {
                                          this.refreshPositions();
                                      }),
                                      (o.currentItem = o.element),
                                      (e.fromOutside = o)),
                                  e.currentItem && (e._mouseDrag(i), (s.position = e.position)))
                                : e.isOver &&
                                  ((e.isOver = 0),
                                  (e.cancelHelperRemoval = !0),
                                  (e.options._revert = e.options.revert),
                                  (e.options.revert = !1),
                                  e._trigger("out", i, e._uiHash(e)),
                                  e._mouseStop(i, !0),
                                  (e.options.revert = e.options._revert),
                                  (e.options.helper = e.options._helper),
                                  e.placeholder && e.placeholder.remove(),
                                  s.helper.appendTo(o._parent),
                                  o._refreshOffsets(i),
                                  (s.position = o._generatePosition(i, !0)),
                                  o._trigger("fromSortable", i),
                                  (o.dropped = !1),
                                  y.each(o.sortables, function () {
                                      this.refreshPositions();
                                  }));
                    });
                },
            }),
            y.ui.plugin.add("draggable", "cursor", {
                start: function (t, e, i) {
                    var s = y("body"),
                        o = i.options;
                    s.css("cursor") && (o._cursor = s.css("cursor")), s.css("cursor", o.cursor);
                },
                stop: function (t, e, i) {
                    var s = i.options;
                    s._cursor && y("body").css("cursor", s._cursor);
                },
            }),
            y.ui.plugin.add("draggable", "opacity", {
                start: function (t, e, i) {
                    var s = y(e.helper),
                        o = i.options;
                    s.css("opacity") && (o._opacity = s.css("opacity")), s.css("opacity", o.opacity);
                },
                stop: function (t, e, i) {
                    var s = i.options;
                    s._opacity && y(e.helper).css("opacity", s._opacity);
                },
            }),
            y.ui.plugin.add("draggable", "scroll", {
                start: function (t, e, i) {
                    i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
                        i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
                },
                drag: function (t, e, i) {
                    var s = i.options,
                        o = !1,
                        n = i.scrollParentNotHidden[0],
                        r = i.document[0];
                    n !== r && "HTML" !== n.tagName
                        ? ((s.axis && "x" === s.axis) ||
                              (i.overflowOffset.top + n.offsetHeight - t.pageY < s.scrollSensitivity
                                  ? (n.scrollTop = o = n.scrollTop + s.scrollSpeed)
                                  : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (n.scrollTop = o = n.scrollTop - s.scrollSpeed)),
                          (s.axis && "y" === s.axis) ||
                              (i.overflowOffset.left + n.offsetWidth - t.pageX < s.scrollSensitivity
                                  ? (n.scrollLeft = o = n.scrollLeft + s.scrollSpeed)
                                  : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (n.scrollLeft = o = n.scrollLeft - s.scrollSpeed)))
                        : ((s.axis && "x" === s.axis) ||
                              (t.pageY - y(r).scrollTop() < s.scrollSensitivity
                                  ? (o = y(r).scrollTop(y(r).scrollTop() - s.scrollSpeed))
                                  : y(window).height() - (t.pageY - y(r).scrollTop()) < s.scrollSensitivity && (o = y(r).scrollTop(y(r).scrollTop() + s.scrollSpeed))),
                          (s.axis && "y" === s.axis) ||
                              (t.pageX - y(r).scrollLeft() < s.scrollSensitivity
                                  ? (o = y(r).scrollLeft(y(r).scrollLeft() - s.scrollSpeed))
                                  : y(window).width() - (t.pageX - y(r).scrollLeft()) < s.scrollSensitivity && (o = y(r).scrollLeft(y(r).scrollLeft() + s.scrollSpeed)))),
                        !1 !== o && y.ui.ddmanager && !s.dropBehaviour && y.ui.ddmanager.prepareOffsets(i, t);
                },
            }),
            y.ui.plugin.add("draggable", "snap", {
                start: function (t, e, i) {
                    var s = i.options;
                    (i.snapElements = []),
                        y(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function () {
                            var t = y(this),
                                e = t.offset();
                            this !== i.element[0] && i.snapElements.push({ item: this, width: t.outerWidth(), height: t.outerHeight(), top: e.top, left: e.left });
                        });
                },
                drag: function (t, e, i) {
                    var s,
                        o,
                        n,
                        r,
                        a,
                        h,
                        l,
                        d,
                        p,
                        c,
                        u = i.options,
                        g = u.snapTolerance,
                        f = e.offset.left,
                        m = f + i.helperProportions.width,
                        v = e.offset.top,
                        _ = v + i.helperProportions.height;
                    for (p = i.snapElements.length - 1; 0 <= p; p--)
                        (h = (a = i.snapElements[p].left - i.margins.left) + i.snapElements[p].width),
                            (d = (l = i.snapElements[p].top - i.margins.top) + i.snapElements[p].height),
                            m < a - g || h + g < f || _ < l - g || d + g < v || !y.contains(i.snapElements[p].item.ownerDocument, i.snapElements[p].item)
                                ? (i.snapElements[p].snapping && i.options.snap.release && i.options.snap.release.call(i.element, t, y.extend(i._uiHash(), { snapItem: i.snapElements[p].item })), (i.snapElements[p].snapping = !1))
                                : ("inner" !== u.snapMode &&
                                      ((s = Math.abs(l - _) <= g),
                                      (o = Math.abs(d - v) <= g),
                                      (n = Math.abs(a - m) <= g),
                                      (r = Math.abs(h - f) <= g),
                                      s && (e.position.top = i._convertPositionTo("relative", { top: l - i.helperProportions.height, left: 0 }).top),
                                      o && (e.position.top = i._convertPositionTo("relative", { top: d, left: 0 }).top),
                                      n && (e.position.left = i._convertPositionTo("relative", { top: 0, left: a - i.helperProportions.width }).left),
                                      r && (e.position.left = i._convertPositionTo("relative", { top: 0, left: h }).left)),
                                  (c = s || o || n || r),
                                  "outer" !== u.snapMode &&
                                      ((s = Math.abs(l - v) <= g),
                                      (o = Math.abs(d - _) <= g),
                                      (n = Math.abs(a - f) <= g),
                                      (r = Math.abs(h - m) <= g),
                                      s && (e.position.top = i._convertPositionTo("relative", { top: l, left: 0 }).top),
                                      o && (e.position.top = i._convertPositionTo("relative", { top: d - i.helperProportions.height, left: 0 }).top),
                                      n && (e.position.left = i._convertPositionTo("relative", { top: 0, left: a }).left),
                                      r && (e.position.left = i._convertPositionTo("relative", { top: 0, left: h - i.helperProportions.width }).left)),
                                  !i.snapElements[p].snapping && (s || o || n || r || c) && i.options.snap.snap && i.options.snap.snap.call(i.element, t, y.extend(i._uiHash(), { snapItem: i.snapElements[p].item })),
                                  (i.snapElements[p].snapping = s || o || n || r || c));
                },
            }),
            y.ui.plugin.add("draggable", "stack", {
                start: function (t, e, i) {
                    var s,
                        o = i.options,
                        n = y.makeArray(y(o.stack)).sort(function (t, e) {
                            return (parseInt(y(t).css("zIndex"), 10) || 0) - (parseInt(y(e).css("zIndex"), 10) || 0);
                        });
                    n.length &&
                        ((s = parseInt(y(n[0]).css("zIndex"), 10) || 0),
                        y(n).each(function (t) {
                            y(this).css("zIndex", s + t);
                        }),
                        this.css("zIndex", s + n.length));
                },
            }),
            y.ui.plugin.add("draggable", "zIndex", {
                start: function (t, e, i) {
                    var s = y(e.helper),
                        o = i.options;
                    s.css("zIndex") && (o._zIndex = s.css("zIndex")), s.css("zIndex", o.zIndex);
                },
                stop: function (t, e, i) {
                    var s = i.options;
                    s._zIndex && y(e.helper).css("zIndex", s._zIndex);
                },
            });
        y.ui.draggable;
        y.widget("ui.droppable", {
            version: "1.12.1",
            widgetEventPrefix: "drop",
            options: { accept: "*", addClasses: !0, greedy: !1, scope: "default", tolerance: "touch", activate: null, deactivate: null, drop: null, out: null, over: null },
            _create: function () {
                var t,
                    e = this.options,
                    i = e.accept;
                (this.isover = !1),
                    (this.isout = !0),
                    (this.accept = y.isFunction(i)
                        ? i
                        : function (t) {
                              return t.is(i);
                          }),
                    (this.proportions = function () {
                        if (!arguments.length) return t || (t = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight });
                        t = arguments[0];
                    }),
                    this._addToManager(e.scope),
                    e.addClasses && this._addClass("ui-droppable");
            },
            _addToManager: function (t) {
                (y.ui.ddmanager.droppables[t] = y.ui.ddmanager.droppables[t] || []), y.ui.ddmanager.droppables[t].push(this);
            },
            _splice: function (t) {
                for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1);
            },
            _destroy: function () {
                var t = y.ui.ddmanager.droppables[this.options.scope];
                this._splice(t);
            },
            _setOption: function (t, e) {
                if ("accept" === t)
                    this.accept = y.isFunction(e)
                        ? e
                        : function (t) {
                              return t.is(e);
                          };
                else if ("scope" === t) {
                    var i = y.ui.ddmanager.droppables[this.options.scope];
                    this._splice(i), this._addToManager(e);
                }
                this._super(t, e);
            },
            _activate: function (t) {
                var e = y.ui.ddmanager.current;
                this._addActiveClass(), e && this._trigger("activate", t, this.ui(e));
            },
            _deactivate: function (t) {
                var e = y.ui.ddmanager.current;
                this._removeActiveClass(), e && this._trigger("deactivate", t, this.ui(e));
            },
            _over: function (t) {
                var e = y.ui.ddmanager.current;
                e && (e.currentItem || e.element)[0] !== this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this._addHoverClass(), this._trigger("over", t, this.ui(e)));
            },
            _out: function (t) {
                var e = y.ui.ddmanager.current;
                e && (e.currentItem || e.element)[0] !== this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this._removeHoverClass(), this._trigger("out", t, this.ui(e)));
            },
            _drop: function (e, t) {
                var i = t || y.ui.ddmanager.current,
                    s = !1;
                return (
                    !(!i || (i.currentItem || i.element)[0] === this.element[0]) &&
                    (this.element
                        .find(":data(ui-droppable)")
                        .not(".ui-draggable-dragging")
                        .each(function () {
                            var t = y(this).droppable("instance");
                            if (
                                t.options.greedy &&
                                !t.options.disabled &&
                                t.options.scope === i.options.scope &&
                                t.accept.call(t.element[0], i.currentItem || i.element) &&
                                h(i, y.extend(t, { offset: t.element.offset() }), t.options.tolerance, e)
                            )
                                return !(s = !0);
                        }),
                    !s && !!this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(i)), this.element))
                );
            },
            ui: function (t) {
                return { draggable: t.currentItem || t.element, helper: t.helper, position: t.position, offset: t.positionAbs };
            },
            _addHoverClass: function () {
                this._addClass("ui-droppable-hover");
            },
            _removeHoverClass: function () {
                this._removeClass("ui-droppable-hover");
            },
            _addActiveClass: function () {
                this._addClass("ui-droppable-active");
            },
            _removeActiveClass: function () {
                this._removeClass("ui-droppable-active");
            },
        });
        var h = (y.ui.intersect = function (t, e, i, s) {
            if (!e.offset) return !1;
            var o = (t.positionAbs || t.position.absolute).left + t.margins.left,
                n = (t.positionAbs || t.position.absolute).top + t.margins.top,
                r = o + t.helperProportions.width,
                a = n + t.helperProportions.height,
                h = e.offset.left,
                l = e.offset.top,
                d = h + e.proportions().width,
                p = l + e.proportions().height;
            switch (i) {
                case "fit":
                    return h <= o && r <= d && l <= n && a <= p;
                case "intersect":
                    return h < o + t.helperProportions.width / 2 && r - t.helperProportions.width / 2 < d && l < n + t.helperProportions.height / 2 && a - t.helperProportions.height / 2 < p;
                case "pointer":
                    return c(s.pageY, l, e.proportions().height) && c(s.pageX, h, e.proportions().width);
                case "touch":
                    return ((l <= n && n <= p) || (l <= a && a <= p) || (n < l && p < a)) && ((h <= o && o <= d) || (h <= r && r <= d) || (o < h && d < r));
                default:
                    return !1;
            }
        });
        function c(t, e, i) {
            return e <= t && t < e + i;
        }
        !(y.ui.ddmanager = {
            current: null,
            droppables: { default: [] },
            prepareOffsets: function (t, e) {
                var i,
                    s,
                    o = y.ui.ddmanager.droppables[t.options.scope] || [],
                    n = e ? e.type : null,
                    r = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                t: for (i = 0; i < o.length; i++)
                    if (!(o[i].options.disabled || (t && !o[i].accept.call(o[i].element[0], t.currentItem || t.element)))) {
                        for (s = 0; s < r.length; s++)
                            if (r[s] === o[i].element[0]) {
                                o[i].proportions().height = 0;
                                continue t;
                            }
                        (o[i].visible = "none" !== o[i].element.css("display")),
                            o[i].visible && ("mousedown" === n && o[i]._activate.call(o[i], e), (o[i].offset = o[i].element.offset()), o[i].proportions({ width: o[i].element[0].offsetWidth, height: o[i].element[0].offsetHeight }));
                    }
            },
            drop: function (t, e) {
                var i = !1;
                return (
                    y.each((y.ui.ddmanager.droppables[t.options.scope] || []).slice(), function () {
                        this.options &&
                            (!this.options.disabled && this.visible && h(t, this, this.options.tolerance, e) && (i = this._drop.call(this, e) || i),
                            !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && ((this.isout = !0), (this.isover = !1), this._deactivate.call(this, e)));
                    }),
                    i
                );
            },
            dragStart: function (t, e) {
                t.element.parentsUntil("body").on("scroll.droppable", function () {
                    t.options.refreshPositions || y.ui.ddmanager.prepareOffsets(t, e);
                });
            },
            drag: function (n, r) {
                n.options.refreshPositions && y.ui.ddmanager.prepareOffsets(n, r),
                    y.each(y.ui.ddmanager.droppables[n.options.scope] || [], function () {
                        if (!this.options.disabled && !this.greedyChild && this.visible) {
                            var t,
                                e,
                                i,
                                s = h(n, this, this.options.tolerance, r),
                                o = !s && this.isover ? "isout" : s && !this.isover ? "isover" : null;
                            o &&
                                (this.options.greedy &&
                                    ((e = this.options.scope),
                                    (i = this.element.parents(":data(ui-droppable)").filter(function () {
                                        return y(this).droppable("instance").options.scope === e;
                                    })).length && ((t = y(i[0]).droppable("instance")).greedyChild = "isover" === o)),
                                t && "isover" === o && ((t.isover = !1), (t.isout = !0), t._out.call(t, r)),
                                (this[o] = !0),
                                (this["isout" === o ? "isover" : "isout"] = !1),
                                this["isover" === o ? "_over" : "_out"].call(this, r),
                                t && "isout" === o && ((t.isout = !1), (t.isover = !0), t._over.call(t, r)));
                        }
                    });
            },
            dragStop: function (t, e) {
                t.element.parentsUntil("body").off("scroll.droppable"), t.options.refreshPositions || y.ui.ddmanager.prepareOffsets(t, e);
            },
        }) !== y.uiBackCompat &&
            y.widget("ui.droppable", y.ui.droppable, {
                options: { hoverClass: !1, activeClass: !1 },
                _addActiveClass: function () {
                    this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass);
                },
                _removeActiveClass: function () {
                    this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass);
                },
                _addHoverClass: function () {
                    this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                },
                _removeHoverClass: function () {
                    this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                },
            });
        y.ui.droppable;
        y.widget("ui.resizable", y.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" },
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null,
            },
            _num: function (t) {
                return parseFloat(t) || 0;
            },
            _isNumber: function (t) {
                return !isNaN(parseFloat(t));
            },
            _hasScroll: function (t, e) {
                if ("hidden" === y(t).css("overflow")) return !1;
                var i,
                    s = e && "left" === e ? "scrollLeft" : "scrollTop";
                return 0 < t[s] || ((t[s] = 1), (i = 0 < t[s]), (t[s] = 0), i);
            },
            _create: function () {
                var t,
                    e = this.options,
                    i = this;
                this._addClass("ui-resizable"),
                    y.extend(this, {
                        _aspectRatio: !!e.aspectRatio,
                        aspectRatio: e.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: e.helper || e.ghost || e.animate ? e.helper || "ui-resizable-helper" : null,
                    }),
                    this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) &&
                        (this.element.wrap(
                            y("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                                position: this.element.css("position"),
                                width: this.element.outerWidth(),
                                height: this.element.outerHeight(),
                                top: this.element.css("top"),
                                left: this.element.css("left"),
                            })
                        ),
                        (this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"))),
                        (this.elementIsWrapper = !0),
                        (t = {
                            marginTop: this.originalElement.css("marginTop"),
                            marginRight: this.originalElement.css("marginRight"),
                            marginBottom: this.originalElement.css("marginBottom"),
                            marginLeft: this.originalElement.css("marginLeft"),
                        }),
                        this.element.css(t),
                        this.originalElement.css("margin", 0),
                        (this.originalResizeStyle = this.originalElement.css("resize")),
                        this.originalElement.css("resize", "none"),
                        this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })),
                        this.originalElement.css(t),
                        this._proportionallyResize()),
                    this._setupHandles(),
                    e.autoHide &&
                        y(this.element)
                            .on("mouseenter", function () {
                                e.disabled || (i._removeClass("ui-resizable-autohide"), i._handles.show());
                            })
                            .on("mouseleave", function () {
                                e.disabled || i.resizing || (i._addClass("ui-resizable-autohide"), i._handles.hide());
                            }),
                    this._mouseInit();
            },
            _destroy: function () {
                this._mouseDestroy();
                function t(t) {
                    y(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
                }
                var e;
                return (
                    this.elementIsWrapper &&
                        (t(this.element), (e = this.element), this.originalElement.css({ position: e.css("position"), width: e.outerWidth(), height: e.outerHeight(), top: e.css("top"), left: e.css("left") }).insertAfter(e), e.remove()),
                    this.originalElement.css("resize", this.originalResizeStyle),
                    t(this.originalElement),
                    this
                );
            },
            _setOption: function (t, e) {
                switch ((this._super(t, e), t)) {
                    case "handles":
                        this._removeHandles(), this._setupHandles();
                }
            },
            _setupHandles: function () {
                var t,
                    e,
                    i,
                    s,
                    o,
                    n = this.options,
                    r = this;
                if (
                    ((this.handles =
                        n.handles ||
                        (y(".ui-resizable-handle", this.element).length
                            ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" }
                            : "e,s,se")),
                    (this._handles = y()),
                    this.handles.constructor === String)
                )
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), i = this.handles.split(","), this.handles = {}, e = 0; e < i.length; e++)
                        (s = "ui-resizable-" + (t = y.trim(i[e]))), (o = y("<div>")), this._addClass(o, "ui-resizable-handle " + s), o.css({ zIndex: n.zIndex }), (this.handles[t] = ".ui-resizable-" + t), this.element.append(o);
                (this._renderAxis = function (t) {
                    var e, i, s, o;
                    for (e in ((t = t || this.element), this.handles))
                        this.handles[e].constructor === String
                            ? (this.handles[e] = this.element.children(this.handles[e]).first().show())
                            : (this.handles[e].jquery || this.handles[e].nodeType) && ((this.handles[e] = y(this.handles[e])), this._on(this.handles[e], { mousedown: r._mouseDown })),
                            this.elementIsWrapper &&
                                this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) &&
                                ((i = y(this.handles[e], this.element)),
                                (o = /sw|ne|nw|se|n|s/.test(e) ? i.outerHeight() : i.outerWidth()),
                                (s = ["padding", /ne|nw|n/.test(e) ? "Top" : /se|sw|s/.test(e) ? "Bottom" : /^e$/.test(e) ? "Right" : "Left"].join("")),
                                t.css(s, o),
                                this._proportionallyResize()),
                            (this._handles = this._handles.add(this.handles[e]));
                }),
                    this._renderAxis(this.element),
                    (this._handles = this._handles.add(this.element.find(".ui-resizable-handle"))),
                    this._handles.disableSelection(),
                    this._handles.on("mouseover", function () {
                        r.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), (r.axis = o && o[1] ? o[1] : "se"));
                    }),
                    n.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"));
            },
            _removeHandles: function () {
                this._handles.remove();
            },
            _mouseCapture: function (t) {
                var e,
                    i,
                    s = !1;
                for (e in this.handles) ((i = y(this.handles[e])[0]) !== t.target && !y.contains(i, t.target)) || (s = !0);
                return !this.options.disabled && s;
            },
            _mouseStart: function (t) {
                var e,
                    i,
                    s,
                    o = this.options,
                    n = this.element;
                return (
                    (this.resizing = !0),
                    this._renderProxy(),
                    (e = this._num(this.helper.css("left"))),
                    (i = this._num(this.helper.css("top"))),
                    o.containment && ((e += y(o.containment).scrollLeft() || 0), (i += y(o.containment).scrollTop() || 0)),
                    (this.offset = this.helper.offset()),
                    (this.position = { left: e, top: i }),
                    (this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: n.width(), height: n.height() }),
                    (this.originalSize = this._helper ? { width: n.outerWidth(), height: n.outerHeight() } : { width: n.width(), height: n.height() }),
                    (this.sizeDiff = { width: n.outerWidth() - n.width(), height: n.outerHeight() - n.height() }),
                    (this.originalPosition = { left: e, top: i }),
                    (this.originalMousePosition = { left: t.pageX, top: t.pageY }),
                    (this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1),
                    (s = y(".ui-resizable-" + this.axis).css("cursor")),
                    y("body").css("cursor", "auto" === s ? this.axis + "-resize" : s),
                    this._addClass("ui-resizable-resizing"),
                    this._propagate("start", t),
                    !0
                );
            },
            _mouseDrag: function (t) {
                var e,
                    i,
                    s = this.originalMousePosition,
                    o = this.axis,
                    n = t.pageX - s.left || 0,
                    r = t.pageY - s.top || 0,
                    a = this._change[o];
                return (
                    this._updatePrevProperties(),
                    a &&
                        ((e = a.apply(this, [t, n, r])),
                        this._updateVirtualBoundaries(t.shiftKey),
                        (this._aspectRatio || t.shiftKey) && (e = this._updateRatio(e, t)),
                        (e = this._respectSize(e, t)),
                        this._updateCache(e),
                        this._propagate("resize", t),
                        (i = this._applyChanges()),
                        !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
                        y.isEmptyObject(i) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges())),
                    !1
                );
            },
            _mouseStop: function (t) {
                this.resizing = !1;
                var e,
                    i,
                    s,
                    o,
                    n,
                    r,
                    a,
                    h = this.options,
                    l = this;
                return (
                    this._helper &&
                        ((s = (i = (e = this._proportionallyResizeElements).length && /textarea/i.test(e[0].nodeName)) && this._hasScroll(e[0], "left") ? 0 : l.sizeDiff.height),
                        (o = i ? 0 : l.sizeDiff.width),
                        (n = { width: l.helper.width() - o, height: l.helper.height() - s }),
                        (r = parseFloat(l.element.css("left")) + (l.position.left - l.originalPosition.left) || null),
                        (a = parseFloat(l.element.css("top")) + (l.position.top - l.originalPosition.top) || null),
                        h.animate || this.element.css(y.extend(n, { top: a, left: r })),
                        l.helper.height(l.size.height),
                        l.helper.width(l.size.width),
                        this._helper && !h.animate && this._proportionallyResize()),
                    y("body").css("cursor", "auto"),
                    this._removeClass("ui-resizable-resizing"),
                    this._propagate("stop", t),
                    this._helper && this.helper.remove(),
                    !1
                );
            },
            _updatePrevProperties: function () {
                (this.prevPosition = { top: this.position.top, left: this.position.left }), (this.prevSize = { width: this.size.width, height: this.size.height });
            },
            _applyChanges: function () {
                var t = {};
                return (
                    this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"),
                    this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"),
                    this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"),
                    this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"),
                    this.helper.css(t),
                    t
                );
            },
            _updateVirtualBoundaries: function (t) {
                var e,
                    i,
                    s,
                    o,
                    n,
                    r = this.options;
                (n = {
                    minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
                    maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
                    minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
                    maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0,
                }),
                    (this._aspectRatio || t) &&
                        ((e = n.minHeight * this.aspectRatio),
                        (s = n.minWidth / this.aspectRatio),
                        (i = n.maxHeight * this.aspectRatio),
                        (o = n.maxWidth / this.aspectRatio),
                        e > n.minWidth && (n.minWidth = e),
                        s > n.minHeight && (n.minHeight = s),
                        i < n.maxWidth && (n.maxWidth = i),
                        o < n.maxHeight && (n.maxHeight = o)),
                    (this._vBoundaries = n);
            },
            _updateCache: function (t) {
                (this.offset = this.helper.offset()),
                    this._isNumber(t.left) && (this.position.left = t.left),
                    this._isNumber(t.top) && (this.position.top = t.top),
                    this._isNumber(t.height) && (this.size.height = t.height),
                    this._isNumber(t.width) && (this.size.width = t.width);
            },
            _updateRatio: function (t) {
                var e = this.position,
                    i = this.size,
                    s = this.axis;
                return (
                    this._isNumber(t.height) ? (t.width = t.height * this.aspectRatio) : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio),
                    "sw" === s && ((t.left = e.left + (i.width - t.width)), (t.top = null)),
                    "nw" === s && ((t.top = e.top + (i.height - t.height)), (t.left = e.left + (i.width - t.width))),
                    t
                );
            },
            _respectSize: function (t) {
                var e = this._vBoundaries,
                    i = this.axis,
                    s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                    o = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                    n = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                    r = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                    a = this.originalPosition.left + this.originalSize.width,
                    h = this.originalPosition.top + this.originalSize.height,
                    l = /sw|nw|w/.test(i),
                    d = /nw|ne|n/.test(i);
                return (
                    n && (t.width = e.minWidth),
                    r && (t.height = e.minHeight),
                    s && (t.width = e.maxWidth),
                    o && (t.height = e.maxHeight),
                    n && l && (t.left = a - e.minWidth),
                    s && l && (t.left = a - e.maxWidth),
                    r && d && (t.top = h - e.minHeight),
                    o && d && (t.top = h - e.maxHeight),
                    t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : (t.top = null),
                    t
                );
            },
            _getPaddingPlusBorderDimensions: function (t) {
                for (
                    var e = 0,
                        i = [],
                        s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")],
                        o = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")];
                    e < 4;
                    e++
                )
                    (i[e] = parseFloat(s[e]) || 0), (i[e] += parseFloat(o[e]) || 0);
                return { height: i[0] + i[2], width: i[1] + i[3] };
            },
            _proportionallyResize: function () {
                if (this._proportionallyResizeElements.length)
                    for (var t, e = 0, i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++)
                        (t = this._proportionallyResizeElements[e]),
                            this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)),
                            t.css({ height: i.height() - this.outerDimensions.height || 0, width: i.width() - this.outerDimensions.width || 0 });
            },
            _renderProxy: function () {
                var t = this.element,
                    e = this.options;
                (this.elementOffset = t.offset()),
                    this._helper
                        ? ((this.helper = this.helper || y("<div style='overflow:hidden;'></div>")),
                          this._addClass(this.helper, this._helper),
                          this.helper.css({ width: this.element.outerWidth(), height: this.element.outerHeight(), position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++e.zIndex }),
                          this.helper.appendTo("body").disableSelection())
                        : (this.helper = this.element);
            },
            _change: {
                e: function (t, e) {
                    return { width: this.originalSize.width + e };
                },
                w: function (t, e) {
                    var i = this.originalSize;
                    return { left: this.originalPosition.left + e, width: i.width - e };
                },
                n: function (t, e, i) {
                    var s = this.originalSize;
                    return { top: this.originalPosition.top + i, height: s.height - i };
                },
                s: function (t, e, i) {
                    return { height: this.originalSize.height + i };
                },
                se: function (t, e, i) {
                    return y.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, e, i]));
                },
                sw: function (t, e, i) {
                    return y.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, e, i]));
                },
                ne: function (t, e, i) {
                    return y.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, e, i]));
                },
                nw: function (t, e, i) {
                    return y.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, e, i]));
                },
            },
            _propagate: function (t, e) {
                y.ui.plugin.call(this, t, [e, this.ui()]), "resize" !== t && this._trigger(t, e, this.ui());
            },
            plugins: {},
            ui: function () {
                return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition };
            },
        }),
            y.ui.plugin.add("resizable", "animate", {
                stop: function (e) {
                    var i = y(this).resizable("instance"),
                        t = i.options,
                        s = i._proportionallyResizeElements,
                        o = s.length && /textarea/i.test(s[0].nodeName),
                        n = o && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                        r = o ? 0 : i.sizeDiff.width,
                        a = { width: i.size.width - r, height: i.size.height - n },
                        h = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                        l = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
                    i.element.animate(y.extend(a, l && h ? { top: l, left: h } : {}), {
                        duration: t.animateDuration,
                        easing: t.animateEasing,
                        step: function () {
                            var t = { width: parseFloat(i.element.css("width")), height: parseFloat(i.element.css("height")), top: parseFloat(i.element.css("top")), left: parseFloat(i.element.css("left")) };
                            s && s.length && y(s[0]).css({ width: t.width, height: t.height }), i._updateCache(t), i._propagate("resize", e);
                        },
                    });
                },
            }),
            y.ui.plugin.add("resizable", "containment", {
                start: function () {
                    var i,
                        s,
                        t,
                        e,
                        o,
                        n,
                        r,
                        a = y(this).resizable("instance"),
                        h = a.options,
                        l = a.element,
                        d = h.containment,
                        p = d instanceof y ? d.get(0) : /parent/.test(d) ? l.parent().get(0) : d;
                    p &&
                        ((a.containerElement = y(p)),
                        /document/.test(d) || d === document
                            ? ((a.containerOffset = { left: 0, top: 0 }),
                              (a.containerPosition = { left: 0, top: 0 }),
                              (a.parentData = { element: y(document), left: 0, top: 0, width: y(document).width(), height: y(document).height() || document.body.parentNode.scrollHeight }))
                            : ((i = y(p)),
                              (s = []),
                              y(["Top", "Right", "Left", "Bottom"]).each(function (t, e) {
                                  s[t] = a._num(i.css("padding" + e));
                              }),
                              (a.containerOffset = i.offset()),
                              (a.containerPosition = i.position()),
                              (a.containerSize = { height: i.innerHeight() - s[3], width: i.innerWidth() - s[1] }),
                              (t = a.containerOffset),
                              (e = a.containerSize.height),
                              (o = a.containerSize.width),
                              (n = a._hasScroll(p, "left") ? p.scrollWidth : o),
                              (r = a._hasScroll(p) ? p.scrollHeight : e),
                              (a.parentData = { element: p, left: t.left, top: t.top, width: n, height: r })));
                },
                resize: function (t) {
                    var e,
                        i,
                        s,
                        o,
                        n = y(this).resizable("instance"),
                        r = n.options,
                        a = n.containerOffset,
                        h = n.position,
                        l = n._aspectRatio || t.shiftKey,
                        d = { top: 0, left: 0 },
                        p = n.containerElement,
                        c = !0;
                    p[0] !== document && /static/.test(p.css("position")) && (d = a),
                        h.left < (n._helper ? a.left : 0) &&
                            ((n.size.width = n.size.width + (n._helper ? n.position.left - a.left : n.position.left - d.left)), l && ((n.size.height = n.size.width / n.aspectRatio), (c = !1)), (n.position.left = r.helper ? a.left : 0)),
                        h.top < (n._helper ? a.top : 0) &&
                            ((n.size.height = n.size.height + (n._helper ? n.position.top - a.top : n.position.top)), l && ((n.size.width = n.size.height * n.aspectRatio), (c = !1)), (n.position.top = n._helper ? a.top : 0)),
                        (s = n.containerElement.get(0) === n.element.parent().get(0)),
                        (o = /relative|absolute/.test(n.containerElement.css("position"))),
                        s && o ? ((n.offset.left = n.parentData.left + n.position.left), (n.offset.top = n.parentData.top + n.position.top)) : ((n.offset.left = n.element.offset().left), (n.offset.top = n.element.offset().top)),
                        (e = Math.abs(n.sizeDiff.width + (n._helper ? n.offset.left - d.left : n.offset.left - a.left))),
                        (i = Math.abs(n.sizeDiff.height + (n._helper ? n.offset.top - d.top : n.offset.top - a.top))),
                        e + n.size.width >= n.parentData.width && ((n.size.width = n.parentData.width - e), l && ((n.size.height = n.size.width / n.aspectRatio), (c = !1))),
                        i + n.size.height >= n.parentData.height && ((n.size.height = n.parentData.height - i), l && ((n.size.width = n.size.height * n.aspectRatio), (c = !1))),
                        c || ((n.position.left = n.prevPosition.left), (n.position.top = n.prevPosition.top), (n.size.width = n.prevSize.width), (n.size.height = n.prevSize.height));
                },
                stop: function () {
                    var t = y(this).resizable("instance"),
                        e = t.options,
                        i = t.containerOffset,
                        s = t.containerPosition,
                        o = t.containerElement,
                        n = y(t.helper),
                        r = n.offset(),
                        a = n.outerWidth() - t.sizeDiff.width,
                        h = n.outerHeight() - t.sizeDiff.height;
                    t._helper && !e.animate && /relative/.test(o.css("position")) && y(this).css({ left: r.left - s.left - i.left, width: a, height: h }),
                        t._helper && !e.animate && /static/.test(o.css("position")) && y(this).css({ left: r.left - s.left - i.left, width: a, height: h });
                },
            }),
            y.ui.plugin.add("resizable", "alsoResize", {
                start: function () {
                    var t = y(this).resizable("instance").options;
                    y(t.alsoResize).each(function () {
                        var t = y(this);
                        t.data("ui-resizable-alsoresize", { width: parseFloat(t.width()), height: parseFloat(t.height()), left: parseFloat(t.css("left")), top: parseFloat(t.css("top")) });
                    });
                },
                resize: function (t, i) {
                    var e = y(this).resizable("instance"),
                        s = e.options,
                        o = e.originalSize,
                        n = e.originalPosition,
                        r = { height: e.size.height - o.height || 0, width: e.size.width - o.width || 0, top: e.position.top - n.top || 0, left: e.position.left - n.left || 0 };
                    y(s.alsoResize).each(function () {
                        var t = y(this),
                            s = y(this).data("ui-resizable-alsoresize"),
                            o = {},
                            e = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        y.each(e, function (t, e) {
                            var i = (s[e] || 0) + (r[e] || 0);
                            i && 0 <= i && (o[e] = i || null);
                        }),
                            t.css(o);
                    });
                },
                stop: function () {
                    y(this).removeData("ui-resizable-alsoresize");
                },
            }),
            y.ui.plugin.add("resizable", "ghost", {
                start: function () {
                    var t = y(this).resizable("instance"),
                        e = t.size;
                    (t.ghost = t.originalElement.clone()),
                        t.ghost.css({ opacity: 0.25, display: "block", position: "relative", height: e.height, width: e.width, margin: 0, left: 0, top: 0 }),
                        t._addClass(t.ghost, "ui-resizable-ghost"),
                        !1 !== y.uiBackCompat && "string" == typeof t.options.ghost && t.ghost.addClass(this.options.ghost),
                        t.ghost.appendTo(t.helper);
                },
                resize: function () {
                    var t = y(this).resizable("instance");
                    t.ghost && t.ghost.css({ position: "relative", height: t.size.height, width: t.size.width });
                },
                stop: function () {
                    var t = y(this).resizable("instance");
                    t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
                },
            }),
            y.ui.plugin.add("resizable", "grid", {
                resize: function () {
                    var t,
                        e = y(this).resizable("instance"),
                        i = e.options,
                        s = e.size,
                        o = e.originalSize,
                        n = e.originalPosition,
                        r = e.axis,
                        a = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                        h = a[0] || 1,
                        l = a[1] || 1,
                        d = Math.round((s.width - o.width) / h) * h,
                        p = Math.round((s.height - o.height) / l) * l,
                        c = o.width + d,
                        u = o.height + p,
                        g = i.maxWidth && i.maxWidth < c,
                        f = i.maxHeight && i.maxHeight < u,
                        m = i.minWidth && i.minWidth > c,
                        v = i.minHeight && i.minHeight > u;
                    (i.grid = a),
                        m && (c += h),
                        v && (u += l),
                        g && (c -= h),
                        f && (u -= l),
                        /^(se|s|e)$/.test(r)
                            ? ((e.size.width = c), (e.size.height = u))
                            : /^(ne)$/.test(r)
                            ? ((e.size.width = c), (e.size.height = u), (e.position.top = n.top - p))
                            : /^(sw)$/.test(r)
                            ? ((e.size.width = c), (e.size.height = u), (e.position.left = n.left - d))
                            : ((u - l <= 0 || c - h <= 0) && (t = e._getPaddingPlusBorderDimensions(this)),
                              0 < u - l ? ((e.size.height = u), (e.position.top = n.top - p)) : ((u = l - t.height), (e.size.height = u), (e.position.top = n.top + o.height - u)),
                              0 < c - h ? ((e.size.width = c), (e.position.left = n.left - d)) : ((c = h - t.width), (e.size.width = c), (e.position.left = n.left + o.width - c)));
                },
            });
        y.ui.resizable;
    }) /** gridstack.js 0.6.0 - JQuery UI Drag&Drop plugin @preserve */,
    (function (t) {
        if ("function" == typeof define && define.amd) define(["jquery", "gridstack", "exports"], t);
        else if ("undefined" != typeof exports) {
            try {
                jQuery = require("jquery");
            } catch (t) {}
            try {
                gridstack = require("gridstack");
            } catch (t) {}
            t(jQuery, gridstack.GridStackUI, exports);
        } else t(jQuery, GridStackUI, window);
    })(function (n, e, t) {
        function i(t) {
            e.GridStackDragDropPlugin.call(this, t);
        }
        return (
            e.GridStackDragDropPlugin.registerPlugin(i),
            (((i.prototype = Object.create(e.GridStackDragDropPlugin.prototype)).constructor = i).prototype.resizable = function (t, e) {
                if (((t = n(t)), "disable" === e || "enable" === e)) t.resizable(e);
                else if ("option" === e) {
                    var i = arguments[2],
                        s = arguments[3];
                    t.resizable(e, i, s);
                } else {
                    var o = t.data("gs-resize-handles") ? t.data("gs-resize-handles") : this.grid.opts.resizable.handles;
                    t.resizable(n.extend({}, this.grid.opts.resizable, { handles: o }, { start: e.start || function () {}, stop: e.stop || function () {}, resize: e.resize || function () {} }));
                }
                return this;
            }),
            (i.prototype.draggable = function (t, e) {
                return (
                    (t = n(t)),
                    "disable" === e || "enable" === e
                        ? t.draggable(e)
                        : t.draggable(
                              n.extend({}, this.grid.opts.draggable, {
                                  containment: this.grid.opts.isNested && !this.grid.opts.dragOut ? this.grid.container.parent() : this.grid.opts.draggable.containment || null,
                                  start: e.start || function () {},
                                  stop: e.stop || function () {},
                                  drag: e.drag || function () {},
                              })
                          ),
                    this
                );
            }),
            (i.prototype.droppable = function (t, e) {
                return (t = n(t)).droppable(e), this;
            }),
            (i.prototype.isDroppable = function (t, e) {
                return (t = n(t)), Boolean(t.data("droppable"));
            }),
            (i.prototype.on = function (t, e, i) {
                return n(t).on(e, i), this;
            }),
            (t.JQueryUIGridStackDragDropPlugin = i)
        );
    });
//# sourceMappingURL=gridstack.min.map
