/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as e from '../js/buffer';
import * as t from '../js/events';
import * as n from '../js/process';
import * as r from '../js/string_decoder';

var o = {
    920: (e, t, n) => {
        const {AbortError:r,codes:o} = n(994), i = n(355), {ERR_INVALID_ARG_TYPE:a} = o;
        e.exports.addAbortSignal = function (t, n) {
            if (((e, t) => {
                if ("object" != typeof e || !("aborted" in e)) throw new a("signal", "AbortSignal", e)
            })(t),!(r = n) || "function" != typeof r.pipe) throw new a("stream", "stream.Stream", n);
            var r;
            return e.exports.addAbortSignalNoValidate(t, n)
        }, e.exports.addAbortSignalNoValidate = function (e, t) {
            if ("object" != typeof e || !("aborted" in e)) return t;
            const n = () => {
                t.destroy(new r(void 0, { cause: e.reason }))
            };
            return e.aborted ? n() : (e.addEventListener("abort", n), i(t, (() => e.removeEventListener("abort", n)))), t
        }
    },
    340: (e, t, n) => {
        const {StringPrototypeSlice:r,SymbolIterator:o,TypedArrayPrototypeSet:i,Uint8Array:a} = n(557),
            {Buffer:l} = n(368), {inspect:s} = n(501);
        e.exports = class {
            constructor() {
                this.head = null, this.tail = null, this.length = 0
            }

            push(e) {
                const t = { data: e, next: null };
                    this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
            }

            unshift(e) {
                const t = { data: e, next: this.head };
                0 === this.length && (this.tail = t), this.head = t, ++this.length
            }

            shift() {
                if (0 === this.length) return;
                const e = this.head.data;
                return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
            }

            clear() {
                this.head = this.tail = null, this.length = 0
            }

            join(e) {
                if (0 === this.length) return "";
                let t = this.head, n = "" + t.data;
                for (; null !== (t = t.next); ) n += e + t.data;
                return n
            }

            concat(e) {
                if (0 === this.length) return l.alloc(0);
                const t = l.allocUnsafe(e >>> 0);
                let n = this.head, r = 0;
                for (; n; ) i(t, n.data, r), r += n.data.length, n = n.next;
                return t
            }

            consume(e, t) {
                const n = this.head.data;
                if (e < n.length) {
                    const t = n.slice(0, e);
                    return this.head.data = n.slice(e), t
                }
                return e === n.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e)
            }

            first() {
                return this.head.data
            }

            * [o]() {
                for (let e = this.head;e; e = e.next) yield e.data
            }

            _getString(e) {
                let t = "", n = this.head, o = 0;
                do {
                    const i = n.data;
                    if (!(e > i.length)) {
                            e === i.length ? (t += i, ++o, n.next ? this.head = n.next : this.head = this.tail = null) : (t += r(i, 0, e), this.head = n, n.data = r(i, e));
                        break
                    }
                    t += i, e -= i.length, ++o
                } while (null !== (n = n.next));
                return this.length -= o, t
            }

            _getBuffer(e) {
                const t = l.allocUnsafe(e), n = e;
                let r = this.head, o = 0;
                do {
                    const l = r.data;
                    if (!(e > l.length)) {
                            e === l.length ? (i(t, l, n - e), ++o, r.next ? this.head = r.next : this.head = this.tail = null) : (i(t, new a(l.buffer, l.byteOffset, e), n - e), this.head = r, r.data = l.slice(e));
                        break
                    }
                    i(t, l, n - e), e -= l.length, ++o
                } while (null !== (r = r.next));
                return this.length -= o, t
            }

            [Symbol.for("nodejs.util.inspect.custom")](e, t) {
                return s(this, { ...t, depth: 0, customInspect: !1 })
            }
        }
    },
    262: (e, t, n) => {
        const {pipeline:r} = n(792), o = n(438), {destroyer:i} = n(701),
            {isNodeStream:a,isReadable:l,isWritable:s} = n(433),
            {AbortError:u,codes:{ ERR_INVALID_ARG_VALUE: d, ERR_MISSING_ARGS: c }} = n(994);
        e.exports = function (...e) {
            if (0 === e.length) throw new c("streams");
            if (1 === e.length) return o.from(e[0]);
            const t = [...e];
            if ("function" == typeof e[0] && (e[0] = o.from(e[0])), "function" == typeof e[e.length-1]) {
                const t = e.length - 1;
                e[t] = o.from(e[t])
            }
            for (let n = 0;n < e.length; ++n) if (a(e[n])) {
                if (n < e.length - 1 && !l(e[n])) throw new d(`streams[${n}]`, t[n], "must be readable");
                if (n > 0 && !s(e[n])) throw new d(`streams[${n}]`, t[n], "must be writable")
            }
            let n, f, b, h, p;
            const y = e[0], g = r(e, (function (e) {
                const t = h;
                h = null, t ? t(e) : e ? p.destroy(e) : w || _ || p.destroy()
            })), _ = !!s(y), w = !!l(g);
            return p = new o({
                writableObjectMode: !(null == y || !y.writableObjectMode),
                readableObjectMode: !(null == g || !g.writableObjectMode),
                writable: _,
                readable: w
            }), _ && (p._write = function (e, t, r) {
                y.write(e, t) ? r() : n = r
            }, p._final = function (e) {
                y.end(), f = e
            }, y.on("drain", (function () {
                if (n) {
                    const e = n;
                    n = null, e()
                }
            })), g.on("finish", (function () {
                if (f) {
                    const e = f;
                    f = null, e()
                }
            }))), w && (g.on("readable", (function () {
                if (b) {
                    const e = b;
                    b = null, e()
                }
            })), g.on("end", (function () {
                p.push(null)
            })), p._read = function () {
                for (;; ) {
                    const e = g.read();
                    if (null === e) return void (b = p._read);
                    if (!p.push(e)) return
                }
            }), p._destroy = function (e, t) {
                e || null === h || (e = new u), b = null, n = null, f = null, null === h ? t(e) : (h = t, i(g, e))
            }, p
        }
    },
    701: (e, t, n) => {
        const r = n(394), {aggregateTwoErrors:o,codes:{ ERR_MULTIPLE_CALLBACK: i },AbortError:a} = n(994),
            {Symbol:l} = n(557), {kDestroyed:s,isDestroyed:u,isFinished:d,isServerRequest:c} = n(433),
            f = l("kDestroy"), b = l("kConstruct");

        function h(e, t, n) {
            e && (e.stack, t && !t.errored && (t.errored = e), n && !n.errored && (n.errored = e))
        }

        function p(e, t, n) {
            let o = !1;

            function i(t) {
                if (o) return;
                o = !0;
                const i = e._readableState, a = e._writableState;
                h(t, a, i), a && (a.closed = !0), i && (i.closed = !0), "function" == typeof n && n(t), t ? r.nextTick(y, e, t) : r.nextTick(g, e)
            }

            try {
                e._destroy(t || null, i)
            } catch (t) {
                i(t)
            }
        }

        function y(e, t) {
            _(e, t), g(e)
        }

        function g(e) {
            const t = e._readableState, n = e._writableState;
            n && (n.closeEmitted = !0), t && (t.closeEmitted = !0), (n && n.emitClose || t && t.emitClose) && e.emit("close")
        }

        function _(e, t) {
            const n = e._readableState, r = e._writableState;
            r && r.errorEmitted || n && n.errorEmitted || (r && (r.errorEmitted = !0), n && (n.errorEmitted = !0), e.emit("error", t))
        }

        function w(e, t, n) {
            const o = e._readableState, i = e._writableState;
            if (i && i.destroyed || o && o.destroyed) return this;
                o && o.autoDestroy || i && i.autoDestroy ? e.destroy(t) : t && (t.stack, i && !i.errored && (i.errored = t), o && !o.errored && (o.errored = t), n ? r.nextTick(_, e, t) : _(e, t))
        }

        function m(e) {
            let t = !1;

            function n(n) {
                if (t) return void w(e, null != n ? n : new i);
                t = !0;
                const o = e._readableState, a = e._writableState, l = a || o;
                o && (o.constructed = !0), a && (a.constructed = !0), l.destroyed ? e.emit(f, n) : n ? w(e, n,!0) : r.nextTick(E, e)
            }

            try {
                e._construct(n)
            } catch (e) {
                n(e)
            }
        }

        function E(e) {
            e.emit(b)
        }

        function S(e) {
            return e && e.setHeader && "function" == typeof e.abort
        }

        function v(e) {
            e.emit("close")
        }

        function R(e, t) {
            e.emit("error", t), r.nextTick(v, e)
        }

        e.exports = {
            construct: function (e, t) {
                if ("function" != typeof e._construct) return;
                const n = e._readableState, o = e._writableState;
                n && (n.constructed = !1), o && (o.constructed = !1), e.once(b, t), e.listenerCount(b) > 1 || r.nextTick(m, e)
            },
            destroyer: function (e, t) {
                e && !u(e) && (t || d(e) || (t = new a), c(e) ? (e.socket = null, e.destroy(t)) : S(e) ? e.abort() : S(e.req) ? e.req.abort() : "function" == typeof e.destroy ? e.destroy(t) : "function" == typeof e.close ? e.close() : t ? r.nextTick(R, e, t) : r.nextTick(v, e), e.destroyed || (e[s] = !0))
            },
            destroy: function (e, t) {
                const n = this._readableState, r = this._writableState, i = r || n;
                return r && r.destroyed || n && n.destroyed ? ("function" == typeof t && t(), this) : (h(e, r, n), r && (r.destroyed = !0), n && (n.destroyed = !0), i.constructed ? p(this, e, t) : this.once(f, (function (n) {
                    p(this, o(n, e), t)
                })), this)
            },
            undestroy: function () {
                const e = this._readableState, t = this._writableState;
                e && (e.constructed = !0, e.closed = !1, e.closeEmitted = !1, e.destroyed = !1, e.errored = null, e.errorEmitted = !1, e.reading = !1, e.ended = !1 === e.readable, e.endEmitted = !1 === e.readable), t && (t.constructed = !0, t.destroyed = !1, t.closed = !1, t.closeEmitted = !1, t.errored = null, t.errorEmitted = !1, t.finalCalled = !1, t.prefinished = !1, t.ended = !1 === t.writable, t.ending = !1 === t.writable, t.finished = !1 === t.writable)
            },
            errorOrDestroy: w
        }
    },
    438: (e, t, n) => {
        const {ObjectDefineProperties:r,ObjectGetOwnPropertyDescriptor:o,ObjectKeys:i,ObjectSetPrototypeOf:a} = n(557);
        e.exports = u;
        const l = n(392), s = n(772);
        a(u.prototype, l.prototype), a(u, l);
        {
            const e = i(s.prototype);
            for (let t = 0;t < e.length; t++) {
                const n = e[t];
                u.prototype[n] || (u.prototype[n] = s.prototype[n])
            }
        }

        function u(e) {
            if (!(this instanceof u)) return new u(e);
            l.call(this, e), s.call(this, e), e ? (this.allowHalfOpen = !1 !== e.allowHalfOpen,!1 === e.readable && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0),!1 === e.writable && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0)) : this.allowHalfOpen = !0
        }

        let d, c;

        function f() {
            return void 0 === d && (d = {}), d
        }

        r(u.prototype, {
            writable: { __proto__: null, ...o(s.prototype, "writable") },
            writableHighWaterMark: { __proto__: null, ...o(s.prototype, "writableHighWaterMark") },
            writableObjectMode: { __proto__: null, ...o(s.prototype, "writableObjectMode") },
            writableBuffer: { __proto__: null, ...o(s.prototype, "writableBuffer") },
            writableLength: { __proto__: null, ...o(s.prototype, "writableLength") },
            writableFinished: { __proto__: null, ...o(s.prototype, "writableFinished") },
            writableCorked: { __proto__: null, ...o(s.prototype, "writableCorked") },
            writableEnded: { __proto__: null, ...o(s.prototype, "writableEnded") },
            writableNeedDrain: { __proto__: null, ...o(s.prototype, "writableNeedDrain") },
            destroyed: { __proto__: null, get() {
                return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
            }, set(e) {
                this._readableState && this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
            } }
        }), u.fromWeb = function (e, t) {
            return f().newStreamDuplexFromReadableWritablePair(e, t)
        }, u.toWeb = function (e) {
            return f().newReadableWritablePairFromDuplex(e)
        }, u.from = function (e) {
            return c || (c = n(873)), c(e, "body")
        }
    },
    873: (e, t, n) => {
        const r = n(394), o = n(368),
            {isReadable:i,isWritable:a,isIterable:l,isNodeStream:s,isReadableNodeStream:u,isWritableNodeStream:d,isDuplexNodeStream:c} = n(433),
            f = n(355), {AbortError:b,codes:{ ERR_INVALID_ARG_TYPE: h, ERR_INVALID_RETURN_VALUE: p }} = n(994),
            {destroyer:y} = n(701), g = n(438), _ = n(392), {createDeferredPromise:w} = n(501), m = n(533),
            E = globalThis.Blob || o.Blob, S = void 0 !== E ? function (e) {
                return e instanceof E
            } : function (e) {
                return !1
            }, v = globalThis.AbortController || n(499).AbortController, {FunctionPrototypeCall:R} = n(557);

        class A extends g {
            constructor(e) {
                super(e),!1 === (null == e ? void 0 : e.readable) && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0),!1 === (null == e ? void 0 : e.writable) && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0)
            }
        }

        function T(e) {
            const t = e.readable && "function" != typeof e.readable.read ? _.wrap(e.readable) : e.readable,
                n = e.writable;
            let r, o, l, s, u, d = !!i(t), c = !!a(n);

            function h(e) {
                const t = s;
                s = null, t ? t(e) : e ? u.destroy(e) : d || c || u.destroy()
            }

            return u = new A({
                readableObjectMode: !(null == t || !t.readableObjectMode),
                writableObjectMode: !(null == n || !n.writableObjectMode),
                readable: d,
                writable: c
            }), c && (f(n, (e => {
                c = !1, e && y(t, e), h(e)
            })), u._write = function (e, t, o) {
                n.write(e, t) ? o() : r = o
            }, u._final = function (e) {
                n.end(), o = e
            }, n.on("drain", (function () {
                if (r) {
                    const e = r;
                    r = null, e()
                }
            })), n.on("finish", (function () {
                if (o) {
                    const e = o;
                    o = null, e()
                }
            }))), d && (f(t, (e => {
                d = !1, e && y(t, e), h(e)
            })), t.on("readable", (function () {
                if (l) {
                    const e = l;
                    l = null, e()
                }
            })), t.on("end", (function () {
                u.push(null)
            })), u._read = function () {
                for (;; ) {
                    const e = t.read();
                    if (null === e) return void (l = u._read);
                    if (!u.push(e)) return
                }
            }), u._destroy = function (e, i) {
                e || null === s || (e = new b), l = null, r = null, o = null, null === s ? i(e) : (s = i, y(n, e), y(t, e))
            }, u
        }

        e.exports = function e(t, n) {
            if (c(t)) return t;
            if (u(t)) return T({ readable: t });
            if (d(t)) return T({ writable: t });
            if (s(t)) return T({ writable: !1, readable: !1 });
            if ("function" == typeof t) {
                const {value:e,write:o,final:i,destroy:a} = function(e){
                    let {promise:t,resolve:n} = w();
                    const o = new v, i = o.signal;
                    return { value: e(async function*(){
                        for (;; ) {
                            const e = t;
                            t = null;
                            const {chunk:o,done:a,cb:l} = await e;
                            if (r.nextTick(l), a) return;
                            if (i.aborted) throw new b(void 0, { cause: i.reason });
                            ({ promise: t, resolve: n } = w()), yield o
                        }
                    }(), { signal: i }), write(e, t, r) {
                        const o = n;
                        n = null, o({ chunk: e, done: !1, cb: r })
                    }, final(e) {
                        const t = n;
                        n = null, t({ done: !0, cb: e })
                    }, destroy(e, t) {
                        o.abort(), t(e)
                    } }
                }(t);
                if (l(e)) return m(A, e, { objectMode: !0, write: o, final: i, destroy: a });
                const s = null == e ? void 0 : e.then;
                if ("function" == typeof s) {
                    let t;
                    const n = R(s, e, (e => {
                        if (null != e) throw new p("nully", "body", e)
                    }), (e => {
                        y(t, e)
                    }));
                    return t = new A({
                        objectMode: !0,
                        readable: !1,
                        write: o,
                        final(e) {
                            i((async () => {
                                try {
                                    await n, r.nextTick(e, null)
                                } catch (t) {
                                    r.nextTick(e, t)
                                }
                            }))
                        },
                        destroy: a
                    })
                }
                throw new p("Iterable, AsyncIterable or AsyncFunction", n, e)
            }
            if (S(t)) return e(t.arrayBuffer());
            if (l(t)) return m(A, t, { objectMode: !0, writable: !1 });
            if ("object" == typeof (null == t ? void 0 : t.writable) || "object" == typeof (null == t ? void 0 : t.readable)) return T({
                readable: null != t && t.readable ? u(null == t ? void 0 : t.readable) ? null == t ? void 0 : t.readable : e(t.readable) : void 0,
                writable: null != t && t.writable ? d(null == t ? void 0 : t.writable) ? null == t ? void 0 : t.writable : e(t.writable) : void 0
            });
            const o = null == t ? void 0 : t.then;
            if ("function" == typeof o) {
                let e;
                return R(o, t, (t => {
                    null != t && e.push(t), e.push(null)
                }), (t => {
                    y(e, t)
                })), e = new A({ objectMode: !0, writable: !1, read() {
                } })
            }
            throw new h(n, ["Blob", "ReadableStream", "WritableStream", "Stream", "Iterable", "AsyncIterable", "Function", "{ readable, writable } pair", "Promise"], t)
        }
    },
    355: (e, t, n) => {
        const r = n(394), {AbortError:o,codes:i} = n(994), {ERR_INVALID_ARG_TYPE:a,ERR_STREAM_PREMATURE_CLOSE:l} = i,
            {kEmptyObject:s,once:u} = n(501), {validateAbortSignal:d,validateFunction:c,validateObject:f} = n(215),
            {Promise:b} = n(557),
            {isClosed:h,isReadable:p,isReadableNodeStream:y,isReadableFinished:g,isReadableErrored:_,isWritable:w,isWritableNodeStream:m,isWritableFinished:E,isWritableErrored:S,isNodeStream:v,willEmitClose:R} = n(433),
            A = () => {
            };

        function T(e, t, n) {
            var i, b;
                2 === arguments.length ? (n = t, t = s) : null == t ? t = s : f(t, "options"), c(n, "callback"), d(t.signal, "options.signal"), n = u(n);
            const T = null !== (i = t.readable) && void 0 !== i ? i : y(e),
                I = null !== (b = t.writable) && void 0 !== b ? b : m(e);
            if (!v(e)) throw new a("stream", "Stream", e);
            const k = e._writableState, O = e._readableState, P = () => {
                e.writable || N()
            };
            let M = R(e) && y(e) === T && m(e) === I, x = E(e,!1);
            const N = () => {
                x = !0, e.destroyed && (M = !1), (!M || e.readable && !T) && (T && !j || n.call(e))
            };
            let j = g(e,!1);
            const D = () => {
                j = !0, e.destroyed && (M = !1), (!M || e.writable && !I) && (I && !x || n.call(e))
            }, L = t => {
                n.call(e, t)
            };
            let W = h(e);
            const $ = () => {
                W = !0;
                const t = S(e) || _(e);
                return t && "boolean" != typeof t ? n.call(e, t) : T && !j && y(e,!0) && !g(e,!1) ? n.call(e, new l) : !I || x || E(e,!1) ? void n.call(e) : n.call(e, new l)
            }, C = () => {
                e.req.on("finish", N)
            };
                !function(e){
                    return e.setHeader && "function" == typeof e.abort
                }(e) ? I && !k && (e.on("end", P), e.on("close", P)) : (e.on("complete", N), M || e.on("abort", $), e.req ? C() : e.on("request", C)), M || "boolean" != typeof e.aborted || e.on("aborted", $), e.on("end", D), e.on("finish", N),!1 !== t.error && e.on("error", L), e.on("close", $), W ? r.nextTick($) : null != k && k.errorEmitted || null != O && O.errorEmitted ? M || r.nextTick($) : (T || M && !p(e) || !x && !1 !== w(e)) && (I || M && !w(e) || !j && !1 !== p(e)) ? O && e.req && e.aborted && r.nextTick($) : r.nextTick($);
            const F = () => {
                n = A, e.removeListener("aborted", $), e.removeListener("complete", N), e.removeListener("abort", $), e.removeListener("request", C), e.req && e.req.removeListener("finish", N), e.removeListener("end", P), e.removeListener("close", P), e.removeListener("finish", N), e.removeListener("end", D), e.removeListener("error", L), e.removeListener("close", $)
            };
            if (t.signal && !W) {
                const i = () => {
                    const r = n;
                    F(), r.call(e, new o(void 0, { cause: t.signal.reason }))
                };
                if (t.signal.aborted) r.nextTick(i); else {
                    const r = n;
                    n = u(((...n) => {
                        t.signal.removeEventListener("abort", i), r.apply(e, n)
                    })), t.signal.addEventListener("abort", i)
                }
            }
            return F
        }

        e.exports = T, e.exports.finished = function (e, t) {
            return new b(((n, r) => {
                T(e, t, (e => {
                        e ? r(e) : n()
                }))
            }))
        }
    },
    533: (e, t, n) => {
        const r = n(394), {PromisePrototypeThen:o,SymbolAsyncIterator:i,SymbolIterator:a} = n(557), {Buffer:l} = n(368),
            {ERR_INVALID_ARG_TYPE:s,ERR_STREAM_NULL_VALUES:u} = n(994).codes;
        e.exports = function (e, t, n) {
            let d, c;
            if ("string" == typeof t || t instanceof l) return new e({ objectMode: !0, ...n, read() {
                this.push(t), this.push(null)
            } });
            if (t && t[i]) c = !0, d = t[i](); else {
                if (!t || !t[a]) throw new s("iterable", ["Iterable"], t);
                c = !1, d = t[a]()
            }
            const f = new e({ objectMode: !0, highWaterMark: 1, ...n });
            let b = !1;
            return f._read = function () {
                b || (b = !0, async function(){
                    for (;; ) {
                        try {
                            const {value:e,done:t} = c ? await d.next() : d.next();
                            if (t) f.push(null); else {
                                const t = e && "function" == typeof e.then ? await e : e;
                                if (null === t) throw b = !1, new u;
                                if (f.push(t)) continue;
                                b = !1
                            }
                        } catch (e) {
                            f.destroy(e)
                        }
                        break
                    }
                }())
            }, f._destroy = function (e, t) {
                o(async function(e){
                    const t = null != e, n = "function" == typeof d.throw;
                    if (t && n) {
                        const {value:t,done:n} = await d.throw(e);
                        if (await t, n) return
                    }
                    if ("function" == typeof d.return) {
                        const {value:e} = await d.return();
                        await e
                    }
                }(e), (() => r.nextTick(t, e)), (n => r.nextTick(t, n || e)))
            }, f
        }
    },
    693: (e, t, n) => {
        const {ArrayIsArray:r,ObjectSetPrototypeOf:o} = n(557), {EventEmitter:i} = n(178);

        function a(e) {
            i.call(this, e)
        }

        function l(e, t, n) {
            if ("function" == typeof e.prependListener) return e.prependListener(t, n);
                e._events && e._events[t] ? r(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n)
        }

        o(a.prototype, i.prototype), o(a, i), a.prototype.pipe = function (e, t) {
            const n = this;

            function r(t) {
                e.writable && !1 === e.write(t) && n.pause && n.pause()
            }

            function o() {
                n.readable && n.resume && n.resume()
            }

            n.on("data", r), e.on("drain", o), e._isStdio || t && !1 === t.end || (n.on("end", s), n.on("close", u));
            let a = !1;

            function s() {
                a || (a = !0, e.end())
            }

            function u() {
                a || (a = !0, "function" == typeof e.destroy && e.destroy())
            }

            function d(e) {
                c(), 0 === i.listenerCount(this, "error") && this.emit("error", e)
            }

            function c() {
                n.removeListener("data", r), e.removeListener("drain", o), n.removeListener("end", s), n.removeListener("close", u), n.removeListener("error", d), e.removeListener("error", d), n.removeListener("end", c), n.removeListener("close", c), e.removeListener("close", c)
            }

            return l(n, "error", d), l(e, "error", d), n.on("end", c), n.on("close", c), e.on("close", c), e.emit("pipe", n), e
        }, e.exports = { Stream: a, prependListener: l }
    },
    723: (e, t, n) => {
        const r = globalThis.AbortController || n(499).AbortController,
            {codes:{ ERR_INVALID_ARG_TYPE: o, ERR_MISSING_ARGS: i, ERR_OUT_OF_RANGE: a },AbortError:l} = n(994),
            {validateAbortSignal:s,validateInteger:u,validateObject:d} = n(215), c = n(557).Symbol("kWeak"),
            {finished:f} = n(355),
            {ArrayPrototypePush:b,MathFloor:h,Number:p,NumberIsNaN:y,Promise:g,PromiseReject:_,PromisePrototypeThen:w,Symbol:m} = n(557),
            E = m("kEmpty"), S = m("kEof");

        function v(e, t) {
            if ("function" != typeof e) throw new o("fn", ["Function", "AsyncFunction"], e);
            null != t && d(t, "options"), null != (null == t ? void 0 : t.signal) && s(t.signal, "options.signal");
            let n = 1;
            return null != (null == t ? void 0 : t.concurrency) && (n = h(t.concurrency)), u(n, "concurrency", 1), async function*(){
                var o, i;
                const a = new r, s = this, u = [], d = a.signal, c = { signal: d }, f = () => a.abort();
                let b, h;
                null != t && null !== (o = t.signal) && void 0 !== o && o.aborted && f(), null == t || null === (i = t.signal) || void 0 === i || i.addEventListener("abort", f);
                let p = !1;

                function y() {
                    p = !0
                }

                !async function(){
                    try {
                        for await (let t of s) {
                            var r;
                            if (p) return;
                            if (d.aborted) throw new l;
                            try {
                                t = e(t, c)
                            } catch (e) {
                                t = _(e)
                            }
                            t !== E && ("function" == typeof (null === (r = t) || void 0 === r ? void 0 : r.catch) && t.catch(y), u.push(t), b && (b(), b = null),!p && u.length && u.length >= n && await new g((e => {
                                h = e
                            })))
                        }
                        u.push(S)
                    } catch (e) {
                        const t = _(e);
                        w(t, void 0, y), u.push(t)
                    } finally {
                        var o;
                        p = !0, b && (b(), b = null), null == t || null === (o = t.signal) || void 0 === o || o.removeEventListener("abort", f)
                    }
                }();
                try {
                    for (;; ) {
                        for (; u.length > 0; ) {
                            const e = await u[0];
                            if (e === S) return;
                            if (d.aborted) throw new l;
                            e !== E && (yield e), u.shift(), h && (h(), h = null)
                        }
                        await new g((e => {
                            b = e
                        }))
                    }
                } finally {
                    a.abort(), p = !0, h && (h(), h = null)
                }
            }.call(this)
        }

        async function R(e, t = void 0) {
            for await (const n of A.call(this, e, t)) return !0;
            return !1
        }

        function A(e, t) {
            if ("function" != typeof e) throw new o("fn", ["Function", "AsyncFunction"], e);
            return v.call(this, (async function (t, n) {
                return await e(t, n) ? t : E
            }), t)
        }

        class T extends i {
            constructor() {
                super("reduce"), this.message = "Reduce of an empty stream requires an initial value"
            }
        }

        function I(e) {
            if (e = p(e), y(e)) return 0;
            if (e < 0) throw new a("number", ">= 0", e);
            return e
        }

        e.exports.streamReturningOperators = {
            asIndexedPairs: function (e = void 0) {
                return null != e && d(e, "options"), null != (null == e ? void 0 : e.signal) && s(e.signal, "options.signal"), async function*(){
                    let t = 0;
                    for await (const r of this) {
                        var n;
                        if (null != e && null !== (n = e.signal) && void 0 !== n && n.aborted) throw new l({
                            cause: e.signal.reason
                        });
                        yield[t++, r]
                    }
                }.call(this)
            },
            drop: function (e, t = void 0) {
                return null != t && d(t, "options"), null != (null == t ? void 0 : t.signal) && s(t.signal, "options.signal"), e = I(e), async function*(){
                    var n;
                    if (null != t && null !== (n = t.signal) && void 0 !== n && n.aborted) throw new l;
                    for await (const n of this) {
                        var r;
                        if (null != t && null !== (r = t.signal) && void 0 !== r && r.aborted) throw new l;
                        e-- <= 0 && (yield n)
                    }
                }.call(this)
            },
            filter: A,
            flatMap: function (e, t) {
                const n = v.call(this, e, t);
                return async function*(){
                    for await (const e of n) yield* e
                }.call(this)
            },
            map: v,
            take: function (e, t = void 0) {
                return null != t && d(t, "options"), null != (null == t ? void 0 : t.signal) && s(t.signal, "options.signal"), e = I(e), async function*(){
                    var n;
                    if (null != t && null !== (n = t.signal) && void 0 !== n && n.aborted) throw new l;
                    for await (const n of this) {
                        var r;
                        if (null != t && null !== (r = t.signal) && void 0 !== r && r.aborted) throw new l;
                        if (!(e-- > 0)) return;
                        yield n
                    }
                }.call(this)
            }
        }, e.exports.promiseReturningOperators = {
            every: async function (e, t = void 0) {
                if ("function" != typeof e) throw new o("fn", ["Function", "AsyncFunction"], e);
                return !await R.call(this, (async (...t) =>!await e(...t)), t)
            },
            forEach: async function (e, t) {
                if ("function" != typeof e) throw new o("fn", ["Function", "AsyncFunction"], e);
                for await (const n of v.call(this, (async function (t, n) {
                    return await e(t, n), E
                }), t)) ;
            },
            reduce: async function (e, t, n) {
                var i;
                if ("function" != typeof e) throw new o("reducer", ["Function", "AsyncFunction"], e);
                null != n && d(n, "options"), null != (null == n ? void 0 : n.signal) && s(n.signal, "options.signal");
                let a = arguments.length > 1;
                if (null != n && null !== (i = n.signal) && void 0 !== i && i.aborted) {
                    const e = new l(void 0, { cause: n.signal.reason });
                    throw this.once("error", (() => {
                    })), await f(this.destroy(e)), e
                }
                const u = new r, b = u.signal;
                if (null != n && n.signal) {
                    const e = { once: !0, [c]: this };
                    n.signal.addEventListener("abort", (() => u.abort()), e)
                }
                let h = !1;
                try {
                    for await (const r of this) {
                        var p;
                        if (h = !0, null != n && null !== (p = n.signal) && void 0 !== p && p.aborted) throw new l;
                            a ? t = await e(t, r, { signal: b }) : (t = r, a = !0)
                    }
                    if (!h && !a) throw new T
                } finally {
                    u.abort()
                }
                return t
            },
            toArray: async function (e) {
                null != e && d(e, "options"), null != (null == e ? void 0 : e.signal) && s(e.signal, "options.signal");
                const t = [];
                for await (const r of this) {
                    var n;
                    if (null != e && null !== (n = e.signal) && void 0 !== n && n.aborted) throw new l(void 0, {
                        cause: e.signal.reason
                    });
                    b(t, r)
                }
                return t
            },
            some: R,
            find: async function (e, t) {
                for await (const n of A.call(this, e, t)) return n
            }
        }
    },
    107: (e, t, n) => {
        const {ObjectSetPrototypeOf:r} = n(557);
        e.exports = i;
        const o = n(744);

        function i(e) {
            if (!(this instanceof i)) return new i(e);
            o.call(this, e)
        }

        r(i.prototype, o.prototype), r(i, o), i.prototype._transform = function (e, t, n) {
            n(null, e)
        }
    },
    792: (e, t, n) => {
        const r = n(394), {ArrayIsArray:o,Promise:i,SymbolAsyncIterator:a} = n(557), l = n(355), {once:s} = n(501),
            u = n(701), d = n(438), {aggregateTwoErrors:c,codes:{
                ERR_INVALID_ARG_TYPE: f,
                ERR_INVALID_RETURN_VALUE: b,
                ERR_MISSING_ARGS: h,
                ERR_STREAM_DESTROYED: p,
                ERR_STREAM_PREMATURE_CLOSE: y
            },AbortError:g} = n(994), {validateFunction:_,validateAbortSignal:w} = n(215),
            {isIterable:m,isReadable:E,isReadableNodeStream:S,isNodeStream:v} = n(433),
            R = globalThis.AbortController || n(499).AbortController;
        let A, T;

        function I(e, t, n) {
            let r = !1;
            return e.on("close", (() => {
                r = !0
            })), { destroy: t => {
                r || (r = !0, u.destroyer(e, t || new p("pipe")))
            }, cleanup: l(e, { readable: t, writable: n }, (e => {
                r = !e
            })) }
        }

        function k(e) {
            if (m(e)) return e;
            if (S(e)) return async function*(e){
                T || (T = n(392)), yield* T.prototype[a].call(e)
            }(e);
            throw new f("val", ["Readable", "Iterable", "AsyncIterable"], e)
        }

        async function O(e, t, n, {end:r}) {
            let o, a = null;
            const s = e => {
                if (e && (o = e), a) {
                    const e = a;
                    a = null, e()
                }
            }, u = () => new i(((e, t) => {
                    o ? t(o) : a = () => {
                        o ? t(o) : e()
                }
            }));
            t.on("drain", s);
            const d = l(t, { readable: !1 }, s);
            try {
                t.writableNeedDrain && await u();
                for await (const n of e) t.write(n) || await u();
                r && t.end(), await u(), n()
            } catch (e) {
                n(o !== e ? c(o, e) : e)
            } finally {
                d(), t.off("drain", s)
            }
        }

        function P(e, t, i) {
            if (1 === e.length && o(e[0]) && (e = e[0]), e.length < 2) throw new h("streams");
            const a = new R, l = a.signal, s = null == i ? void 0 : i.signal, u = [];

            function c() {
                N(new g)
            }

            let p, y;
            w(s, "options.signal"), null == s || s.addEventListener("abort", c);
            const _ = [];
            let T, P = 0;

            function x(e) {
                N(e, 0 == --P)
            }

            function N(e, n) {
                if (!e || p && "ERR_STREAM_PREMATURE_CLOSE" !== p.code || (p = e), p || n) {
                    for (; _.length; ) _.shift()(p);
                    null == s || s.removeEventListener("abort", c), a.abort(), n && (p || u.forEach((e => e())), r.nextTick(t, p, y))
                }
            }

            for (let L = 0;L < e.length; L++) {
                const W = e[L], $ = L < e.length - 1, C = L > 0, F = $ || !1 !== (null == i ? void 0 : i.end),
                    U = L === e.length - 1;
                if (v(W)) {
                    if (F) {
                        const {destroy:B,cleanup:G} = I(W, $, C);
                        _.push(B), E(W) && U && u.push(G)
                    }

                    function j(e) {
                        e && "AbortError" !== e.name && "ERR_STREAM_PREMATURE_CLOSE" !== e.code && x(e)
                    }

                    W.on("error", j), E(W) && U && u.push((() => {
                        W.removeListener("error", j)
                    }))
                }
                if (0 === L) if ("function" == typeof W) {
                    if (T = W({ signal: l }),!m(T)) throw new b("Iterable, AsyncIterable or Stream", "source", T)
                } else T = m(W) || S(W) ? W : d.from(W); else if ("function" == typeof W) if (T = k(T), T = W(T, {
                    signal: l
                }), $) {
                    if (!m(T,!0)) throw new b("AsyncIterable", `transform[${L - 1}]`, T)
                } else {
                    var D;
                    A || (A = n(107));
                    const H = new A({ objectMode: !0 }), V = null === (D = T) || void 0 === D ? void 0 : D.then;
                    if ("function" == typeof V) P++, V.call(T, (e => {
                        y = e, null != e && H.write(e), F && H.end(), r.nextTick(x)
                    }), (e => {
                        H.destroy(e), r.nextTick(x, e)
                    })); else {
                        if (!m(T,!0)) throw new b("AsyncIterable or Promise", "destination", T);
                        P++, O(T, H, x, { end: F })
                    }
                    T = H;
                    const {destroy:q,cleanup:Y} = I(T,!1,!0);
                    _.push(q), U && u.push(Y)
                } else if (v(W)) {
                    if (S(T)) {
                        P += 2;
                        const K = M(T, W, x, { end: F });
                        E(W) && U && u.push(K)
                    } else {
                        if (!m(T)) throw new f("val", ["Readable", "Iterable", "AsyncIterable"], T);
                        P++, O(T, W, x, { end: F })
                    }
                    T = W
                } else T = d.from(W)
            }
            return (null != l && l.aborted || null != s && s.aborted) && r.nextTick(c), T
        }

        function M(e, t, n, {end:r}) {
            let o = !1;
            return t.on("close", (() => {
                o || n(new y)
            })), e.pipe(t, { end: r }), r ? e.once("end", (() => {
                o = !0, t.end()
            })) : n(), l(e, { readable: !0, writable: !1 }, (t => {
                const r = e._readableState;
                    t && "ERR_STREAM_PREMATURE_CLOSE" === t.code && r && r.ended && !r.errored && !r.errorEmitted ? e.once("end", n).once("error", n) : n(t)
            })), l(t, { readable: !1, writable: !0 }, n)
        }

        e.exports = { pipelineImpl: P, pipeline: function (...e) {
            return P(e, s(function(e){
                return _(e[e.length-1], "streams[stream.length - 1]"), e.pop()
            }(e)))
        } }
    },
    392: (e, t, n) => {
        const r = n(394),
            {ArrayPrototypeIndexOf:o,NumberIsInteger:i,NumberIsNaN:a,NumberParseInt:l,ObjectDefineProperties:s,ObjectKeys:u,ObjectSetPrototypeOf:d,Promise:c,SafeSet:f,SymbolAsyncIterator:b,Symbol:h} = n(557);
        e.exports = C, C.ReadableState = $;
        const {EventEmitter:p} = n(178), {Stream:y,prependListener:g} = n(693), {Buffer:_} = n(368),
            {addAbortSignal:w} = n(920), m = n(355);
        let E = n(501).debuglog("stream", (e => {
            E = e
        }));
        const S = n(340), v = n(701), {getHighWaterMark:R,getDefaultHighWaterMark:A} = n(745),
            {aggregateTwoErrors:T,codes:{
                ERR_INVALID_ARG_TYPE: I,
                ERR_METHOD_NOT_IMPLEMENTED: k,
                ERR_OUT_OF_RANGE: O,
                ERR_STREAM_PUSH_AFTER_EOF: P,
                ERR_STREAM_UNSHIFT_AFTER_END_EVENT: M
            }} = n(994), {validateObject:x} = n(215), N = h("kPaused"), {StringDecoder:j} = n(888), D = n(533);
        d(C.prototype, y.prototype), d(C, y);
        const L = () => {
        }, {errorOrDestroy:W} = v;

        function $(e, t, r) {
            "boolean" != typeof r && (r = t instanceof n(438)), this.objectMode = !(!e || !e.objectMode), r && (this.objectMode = this.objectMode || !(!e || !e.readableObjectMode)), this.highWaterMark = e ? R(this, e, "readableHighWaterMark", r) : A(!1), this.buffer = new S, this.length = 0, this.pipes = [], this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.constructed = !0, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this[N] = null, this.errorEmitted = !1, this.emitClose = !e || !1 !== e.emitClose, this.autoDestroy = !e || !1 !== e.autoDestroy, this.destroyed = !1, this.errored = null, this.closed = !1, this.closeEmitted = !1, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.multiAwaitDrain = !1, this.readingMore = !1, this.dataEmitted = !1, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new j(e.encoding), this.encoding = e.encoding)
        }

        function C(e) {
            if (!(this instanceof C)) return new C(e);
            const t = this instanceof n(438);
            this._readableState = new $(e, this, t), e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.construct && (this._construct = e.construct), e.signal && !t && w(e.signal, this)), y.call(this, e), v.construct(this, (() => {
                this._readableState.needReadable && V(this, this._readableState)
            }))
        }

        function F(e, t, n, r) {
            E("readableAddChunk", t);
            const o = e._readableState;
            let i;
            if (o.objectMode || ("string" == typeof t ? (n = n || o.defaultEncoding, o.encoding !== n && (r && o.encoding ? t = _.from(t, n).toString(o.encoding) : (t = _.from(t, n), n = ""))) : t instanceof _ ? n = "" : y._isUint8Array(t) ? (t = y._uint8ArrayToBuffer(t), n = "") : null != t && (i = new I("chunk", ["string", "Buffer", "Uint8Array"], t))), i) W(e, i); else if (null === t) o.reading = !1, function(e, t){
                if (E("onEofChunk"),!t.ended) {
                    if (t.decoder) {
                        const e = t.decoder.end();
                        e && e.length && (t.buffer.push(e), t.length += t.objectMode ? 1 : e.length)
                    }
                    t.ended = !0, t.sync ? G(e) : (t.needReadable = !1, t.emittedReadable = !0, H(e))
                }
            }(e, o); else if (o.objectMode || t && t.length > 0) if (r) if (o.endEmitted) W(e, new M); else {
                if (o.destroyed || o.errored) return !1;
                U(e, o, t,!0)
            } else if (o.ended) W(e, new P); else {
                if (o.destroyed || o.errored) return !1;
                o.reading = !1, o.decoder && !n ? (t = o.decoder.write(t), o.objectMode || 0 !== t.length ? U(e, o, t,!1) : V(e, o)) : U(e, o, t,!1)
            } else r || (o.reading = !1, V(e, o));
            return!o.ended && (o.length < o.highWaterMark || 0 === o.length)
        }

        function U(e, t, n, r) {
                t.flowing && 0 === t.length && !t.sync && e.listenerCount("data") > 0 ? (t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null, t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && G(e)), V(e, t)
        }

        function B(e, t) {
            return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : a(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0
        }

        function G(e) {
            const t = e._readableState;
            E("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (E("emitReadable", t.flowing), t.emittedReadable = !0, r.nextTick(H, e))
        }

        function H(e) {
            const t = e._readableState;
            E("emitReadable_", t.destroyed, t.length, t.ended), t.destroyed || t.errored || !t.length && !t.ended || (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, J(e)
        }

        function V(e, t) {
            !t.readingMore && t.constructed && (t.readingMore = !0, r.nextTick(q, e, t))
        }

        function q(e, t) {
            for (;!t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
                const n = t.length;
                if (E("maybeReadMore read 0"), e.read(0), n === t.length) break
            }
            t.readingMore = !1
        }

        function Y(e) {
            const t = e._readableState;
            t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !1 === t[N] ? t.flowing = !0 : e.listenerCount("data") > 0 ? e.resume() : t.readableListening || (t.flowing = null)
        }

        function K(e) {
            E("readable nexttick read 0"), e.read(0)
        }

        function z(e, t) {
            E("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), J(e), t.flowing && !t.reading && e.read(0)
        }

        function J(e) {
            const t = e._readableState;
            for (E("flow", t.flowing); t.flowing && null !== e.read(); ) ;
        }

        function X(e, t) {
            "function" != typeof e.read && (e = C.wrap(e, { objectMode: !0 }));
            const n = async function*(e, t){
                let n, r = L;

                function o(t) {
                        this === e ? (r(), r = L) : r = t
                }

                e.on("readable", o);
                const i = m(e, { writable: !1 }, (e => {
                    n = e ? T(n, e) : null, r(), r = L
                }));
                try {
                    for (;; ) {
                        const t = e.destroyed ? null : e.read();
                        if (null !== t) yield t; else {
                            if (n) throw n;
                            if (null === n) return;
                            await new c(o)
                        }
                    }
                } catch (e) {
                    throw n = T(n, e), n
                } finally {
                        !n && !1 === (null == t ? void 0 : t.destroyOnReturn) || void 0 !== n && !e._readableState.autoDestroy ? (e.off("readable", o), i()) : v.destroyer(e, null)
                }
            }(e, t);
            return n.stream = e, n
        }

        function Z(e, t) {
            if (0 === t.length) return null;
            let n;
            return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n
        }

        function Q(e) {
            const t = e._readableState;
            E("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, r.nextTick(ee, t, e))
        }

        function ee(e, t) {
            if (E("endReadableNT", e.endEmitted, e.length),!e.errored && !e.closeEmitted && !e.endEmitted && 0 === e.length) if (e.endEmitted = !0, t.emit("end"), t.writable && !1 === t.allowHalfOpen) r.nextTick(te, t); else if (e.autoDestroy) {
                const e = t._writableState;
                (!e || e.autoDestroy && (e.finished || !1 === e.writable)) && t.destroy()
            }
        }

        function te(e) {
            e.writable && !e.writableEnded && !e.destroyed && e.end()
        }

        let ne;

        function re() {
            return void 0 === ne && (ne = {}), ne
        }

        C.prototype.destroy = v.destroy, C.prototype._undestroy = v.undestroy, C.prototype._destroy = function (e, t) {
            t(e)
        }, C.prototype[p.captureRejectionSymbol] = function (e) {
            this.destroy(e)
        }, C.prototype.push = function (e, t) {
            return F(this, e, t,!1)
        }, C.prototype.unshift = function (e, t) {
            return F(this, e, t,!0)
        }, C.prototype.isPaused = function () {
            const e = this._readableState;
            return!0 === e[N] || !1 === e.flowing
        }, C.prototype.setEncoding = function (e) {
            const t = new j(e);
            this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
            const n = this._readableState.buffer;
            let r = "";
            for (const e of n) r += t.write(e);
            return n.clear(), "" !== r && n.push(r), this._readableState.length = r.length, this
        }, C.prototype.read = function (e) {
            E("read", e), void 0 === e ? e = NaN : i(e) || (e = l(e, 10));
            const t = this._readableState, n = e;
            if (e > t.highWaterMark && (t.highWaterMark = function(e){
                if (e > 1073741824) throw new O("size", "<= 1GiB", e);
                return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, ++e
            }(e)), 0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return E("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? Q(this) : G(this), null;
            if (0 === (e = B(e, t)) && t.ended) return 0 === t.length && Q(this), null;
            let r, o = t.needReadable;
            if (E("need readable", o), (0 === t.length || t.length - e < t.highWaterMark) && (o = !0, E("length less than watermark", o)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) o = !1, E("reading, ended or constructing", o); else if (o) {
                E("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0);
                try {
                    this._read(t.highWaterMark)
                } catch (e) {
                    W(this, e)
                }
                t.sync = !1, t.reading || (e = B(n, t))
            }
            return r = e > 0 ? Z(e, t) : null, null === r ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null), 0 === t.length && (t.ended || (t.needReadable = !0), n !== e && t.ended && Q(this)), null === r || t.errorEmitted || t.closeEmitted || (t.dataEmitted = !0, this.emit("data", r)), r
        }, C.prototype._read = function (e) {
            throw new k("_read()")
        }, C.prototype.pipe = function (e, t) {
            const n = this, o = this._readableState;
            1 === o.pipes.length && (o.multiAwaitDrain || (o.multiAwaitDrain = !0, o.awaitDrainWriters = new f(o.awaitDrainWriters ? [o.awaitDrainWriters] : []))), o.pipes.push(e), E("pipe count=%d opts=%j", o.pipes.length, t);
            const i = t && !1 === t.end || e === r.stdout || e === r.stderr ? p : a;

            function a() {
                E("onend"), e.end()
            }

            let l;
            o.endEmitted ? r.nextTick(i) : n.once("end", i), e.on("unpipe", (function t(r, i) {
                E("onunpipe"), r === n && i && !1 === i.hasUnpiped && (i.hasUnpiped = !0, E("cleanup"), e.removeListener("close", b), e.removeListener("finish", h), l && e.removeListener("drain", l), e.removeListener("error", c), e.removeListener("unpipe", t), n.removeListener("end", a), n.removeListener("end", p), n.removeListener("data", d), s = !0, l && o.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && l())
            }));
            let s = !1;

            function u() {
                s || (1 === o.pipes.length && o.pipes[0] === e ? (E("false write response, pause", 0), o.awaitDrainWriters = e, o.multiAwaitDrain = !1) : o.pipes.length > 1 && o.pipes.includes(e) && (E("false write response, pause", o.awaitDrainWriters.size), o.awaitDrainWriters.add(e)), n.pause()), l || (l = function(e, t){
                    return function () {
                        const n = e._readableState;
                            n.awaitDrainWriters === t ? (E("pipeOnDrain", 1), n.awaitDrainWriters = null) : n.multiAwaitDrain && (E("pipeOnDrain", n.awaitDrainWriters.size), n.awaitDrainWriters.delete(t)), n.awaitDrainWriters && 0 !== n.awaitDrainWriters.size || !e.listenerCount("data") || e.resume()
                    }
                }(n, e), e.on("drain", l))
            }

            function d(t) {
                E("ondata");
                const n = e.write(t);
                E("dest.write", n),!1 === n && u()
            }

            function c(t) {
                if (E("onerror", t), p(), e.removeListener("error", c), 0 === e.listenerCount("error")) {
                    const n = e._writableState || e._readableState;
                        n && !n.errorEmitted ? W(e, t) : e.emit("error", t)
                }
            }

            function b() {
                e.removeListener("finish", h), p()
            }

            function h() {
                E("onfinish"), e.removeListener("close", b), p()
            }

            function p() {
                E("unpipe"), n.unpipe(e)
            }

            return n.on("data", d), g(e, "error", c), e.once("close", b), e.once("finish", h), e.emit("pipe", n),!0 === e.writableNeedDrain ? o.flowing && u() : o.flowing || (E("pipe resume"), n.resume()), e
        }, C.prototype.unpipe = function (e) {
            const t = this._readableState;
            if (0 === t.pipes.length) return this;
            if (!e) {
                const e = t.pipes;
                t.pipes = [], this.pause();
                for (let t = 0;t < e.length; t++) e[t].emit("unpipe", this, { hasUnpiped: !1 });
                return this
            }
            const n = o(t.pipes, e);
            return -1 === n || (t.pipes.splice(n, 1), 0 === t.pipes.length && this.pause(), e.emit("unpipe", this, {
                hasUnpiped: !1
            })), this
        }, C.prototype.on = function (e, t) {
            const n = y.prototype.on.call(this, e, t), o = this._readableState;
            return "data" === e ? (o.readableListening = this.listenerCount("readable") > 0,!1 !== o.flowing && this.resume()) : "readable" === e && (o.endEmitted || o.readableListening || (o.readableListening = o.needReadable = !0, o.flowing = !1, o.emittedReadable = !1, E("on readable", o.length, o.reading), o.length ? G(this) : o.reading || r.nextTick(K, this))), n
        }, C.prototype.addListener = C.prototype.on, C.prototype.removeListener = function (e, t) {
            const n = y.prototype.removeListener.call(this, e, t);
            return "readable" === e && r.nextTick(Y, this), n
        }, C.prototype.off = C.prototype.removeListener, C.prototype.removeAllListeners = function (e) {
            const t = y.prototype.removeAllListeners.apply(this, arguments);
            return "readable" !== e && void 0 !== e || r.nextTick(Y, this), t
        }, C.prototype.resume = function () {
            const e = this._readableState;
            return e.flowing || (E("resume"), e.flowing = !e.readableListening, function(e, t){
                t.resumeScheduled || (t.resumeScheduled = !0, r.nextTick(z, e, t))
            }(this, e)), e[N] = !1, this
        }, C.prototype.pause = function () {
            return E("call pause flowing=%j", this._readableState.flowing),!1 !== this._readableState.flowing && (E("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[N] = !0, this
        }, C.prototype.wrap = function (e) {
            let t = !1;
            e.on("data", (n => {
                !this.push(n) && e.pause && (t = !0, e.pause())
            })), e.on("end", (() => {
                this.push(null)
            })), e.on("error", (e => {
                W(this, e)
            })), e.on("close", (() => {
                this.destroy()
            })), e.on("destroy", (() => {
                this.destroy()
            })), this._read = () => {
                t && e.resume && (t = !1, e.resume())
            };
            const n = u(e);
            for (let t = 1;t < n.length; t++) {
                const r = n[t];
                void 0 === this[r] && "function" == typeof e[r] && (this[r] = e[r].bind(e))
            }
            return this
        }, C.prototype[b] = function () {
            return X(this)
        }, C.prototype.iterator = function (e) {
            return void 0 !== e && x(e, "options"), X(this, e)
        }, s(C.prototype, {
            readable: { __proto__: null, get() {
                const e = this._readableState;
                return !(!e || !1 === e.readable || e.destroyed || e.errorEmitted || e.endEmitted)
            }, set(e) {
                this._readableState && (this._readableState.readable = !!e)
            } },
            readableDidRead: { __proto__: null, enumerable: !1, get: function () {
                return this._readableState.dataEmitted
            } },
            readableAborted: { __proto__: null, enumerable: !1, get: function () {
                return !(!1 === this._readableState.readable || !this._readableState.destroyed && !this._readableState.errored || this._readableState.endEmitted)
            } },
            readableHighWaterMark: { __proto__: null, enumerable: !1, get: function () {
                return this._readableState.highWaterMark
            } },
            readableBuffer: { __proto__: null, enumerable: !1, get: function () {
                return this._readableState && this._readableState.buffer
            } },
            readableFlowing: { __proto__: null, enumerable: !1, get: function () {
                return this._readableState.flowing
            }, set: function (e) {
                this._readableState && (this._readableState.flowing = e)
            } },
            readableLength: { __proto__: null, enumerable: !1, get() {
                return this._readableState.length
            } },
            readableObjectMode: { __proto__: null, enumerable: !1, get() {
                return!!this._readableState && this._readableState.objectMode
            } },
            readableEncoding: { __proto__: null, enumerable: !1, get() {
                return this._readableState ? this._readableState.encoding : null
            } },
            errored: { __proto__: null, enumerable: !1, get() {
                return this._readableState ? this._readableState.errored : null
            } },
            closed: { __proto__: null, get() {
                return!!this._readableState && this._readableState.closed
            } },
            destroyed: { __proto__: null, enumerable: !1, get() {
                return!!this._readableState && this._readableState.destroyed
            }, set(e) {
                this._readableState && (this._readableState.destroyed = e)
            } },
            readableEnded: { __proto__: null, enumerable: !1, get() {
                return!!this._readableState && this._readableState.endEmitted
            } }
        }), s($.prototype, { pipesCount: { __proto__: null, get() {
            return this.pipes.length
        } }, paused: { __proto__: null, get() {
            return!1 !== this[N]
        }, set(e) {
            this[N] = !!e
        } } }), C._fromList = Z, C.from = function (e, t) {
            return D(C, e, t)
        }, C.fromWeb = function (e, t) {
            return re().newStreamReadableFromReadableStream(e, t)
        }, C.toWeb = function (e, t) {
            return re().newReadableStreamFromStreamReadable(e, t)
        }, C.wrap = function (e, t) {
            var n, r;
            return new C({
                objectMode: null === (n = null !== (r = e.readableObjectMode) && void 0 !== r ? r : e.objectMode) || void 0 === n || n,
                ...t,
                destroy(t, n) {
                    v.destroyer(e, t), n(t)
                }
            }).wrap(e)
        }
    },
    745: (e, t, n) => {
        const {MathFloor:r,NumberIsInteger:o} = n(557), {ERR_INVALID_ARG_VALUE:i} = n(994).codes;

        function a(e) {
            return e ? 16 : 16384
        }

        e.exports = { getHighWaterMark: function (e, t, n, l) {
            const s = function(e, t, n){
                return null != e.highWaterMark ? e.highWaterMark : t ? e[n] : null
            }(t, l, n);
            if (null != s) {
                if (!o(s) || s < 0) throw new i(l ? `options.${n}` : "options.highWaterMark", s);
                return r(s)
            }
            return a(e.objectMode)
        }, getDefaultHighWaterMark: a }
    },
    744: (e, t, n) => {
        const {ObjectSetPrototypeOf:r,Symbol:o} = n(557);
        e.exports = u;
        const {ERR_METHOD_NOT_IMPLEMENTED:i} = n(994).codes, a = n(438), {getHighWaterMark:l} = n(745);
        r(u.prototype, a.prototype), r(u, a);
        const s = o("kCallback");

        function u(e) {
            if (!(this instanceof u)) return new u(e);
            const t = e ? l(this, e, "readableHighWaterMark",!0) : null;
            0 === t && (e = {
                ...e,
                highWaterMark: null,
                readableHighWaterMark: t,
                writableHighWaterMark: e.writableHighWaterMark || 0
            }), a.call(this, e), this._readableState.sync = !1, this[s] = null, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", c)
        }

        function d(e) {
                "function" != typeof this._flush || this.destroyed ? (this.push(null), e && e()) : this._flush(((t, n) => {
                    t ? e ? e(t) : this.destroy(t) : (null != n && this.push(n), this.push(null), e && e())
            }))
        }

        function c() {
            this._final !== d && d.call(this)
        }

        u.prototype._final = d, u.prototype._transform = function (e, t, n) {
            throw new i("_transform()")
        }, u.prototype._write = function (e, t, n) {
            const r = this._readableState, o = this._writableState, i = r.length;
            this._transform(e, t, ((e, t) => {
                    e ? n(e) : (null != t && this.push(t), o.ended || i === r.length || r.length < r.highWaterMark ? n() : this[s] = n)
            }))
        }, u.prototype._read = function () {
            if (this[s]) {
                const e = this[s];
                this[s] = null, e()
            }
        }
    },
    433: (e, t, n) => {
        const {Symbol:r,SymbolAsyncIterator:o,SymbolIterator:i} = n(557), a = r("kDestroyed"), l = r("kIsErrored"),
            s = r("kIsReadable"), u = r("kIsDisturbed");

        function d(e, t = !1) {
            var n;
            return !(!e || "function" != typeof e.pipe || "function" != typeof e.on || t && ("function" != typeof e.pause || "function" != typeof e.resume) || e._writableState && !1 === (null === (n = e._readableState) || void 0 === n ? void 0 : n.readable) || e._writableState && !e._readableState)
        }

        function c(e) {
            var t;
            return !(!e || "function" != typeof e.write || "function" != typeof e.on || e._readableState && !1 === (null === (t = e._writableState) || void 0 === t ? void 0 : t.writable))
        }

        function f(e) {
            return e && (e._readableState || e._writableState || "function" == typeof e.write && "function" == typeof e.on || "function" == typeof e.pipe && "function" == typeof e.on)
        }

        function b(e) {
            if (!f(e)) return null;
            const t = e._writableState, n = e._readableState, r = t || n;
            return !!(e.destroyed || e[a] || null != r && r.destroyed)
        }

        function h(e) {
            if (!c(e)) return null;
            if (!0 === e.writableEnded) return !0;
            const t = e._writableState;
            return (null == t || !t.errored) && ("boolean" != typeof (null == t ? void 0 : t.ended) ? null : t.ended)
        }

        function p(e, t) {
            if (!d(e)) return null;
            const n = e._readableState;
            return (null == n || !n.errored) && ("boolean" != typeof (null == n ? void 0 : n.endEmitted) ? null : !!(n.endEmitted || !1 === t && !0 === n.ended && 0 === n.length))
        }

        function y(e) {
            return e && null != e[s] ? e[s] : "boolean" != typeof (null == e ? void 0 : e.readable) ? null : !b(e) && d(e) && e.readable && !p(e)
        }

        function g(e) {
            return "boolean" != typeof (null == e ? void 0 : e.writable) ? null : !b(e) && c(e) && e.writable && !h(e)
        }

        function _(e) {
            return "boolean" == typeof e._closed && "boolean" == typeof e._defaultKeepAlive && "boolean" == typeof e._removedConnection && "boolean" == typeof e._removedContLen
        }

        function w(e) {
            return "boolean" == typeof e._sent100 && _(e)
        }

        e.exports = {
            kDestroyed: a,
            isDisturbed: function (e) {
                var t;
                return !(!e || !(null !== (t = e[u]) && void 0 !== t ? t : e.readableDidRead || e.readableAborted))
            },
            kIsDisturbed: u,
            isErrored: function (e) {
                var t, n, r, o, i, a, s, u, d, c;
                return !(!e || !(null !== (t = null !== (n = null !== (r = null !== (o = null !== (i = null !== (a = e[l]) && void 0 !== a ? a : e.readableErrored) && void 0 !== i ? i : e.writableErrored) && void 0 !== o ? o : null === (s = e._readableState) || void 0 === s ? void 0 : s.errorEmitted) && void 0 !== r ? r : null === (u = e._writableState) || void 0 === u ? void 0 : u.errorEmitted) && void 0 !== n ? n : null === (d = e._readableState) || void 0 === d ? void 0 : d.errored) && void 0 !== t ? t : null === (c = e._writableState) || void 0 === c ? void 0 : c.errored))
            },
            kIsErrored: l,
            isReadable: y,
            kIsReadable: s,
            isClosed: function (e) {
                if (!f(e)) return null;
                if ("boolean" == typeof e.closed) return e.closed;
                const t = e._writableState, n = e._readableState;
                return "boolean" == typeof (null == t ? void 0 : t.closed) || "boolean" == typeof (null == n ? void 0 : n.closed) ? (null == t ? void 0 : t.closed) || (null == n ? void 0 : n.closed) : "boolean" == typeof e._closed && _(e) ? e._closed : null
            },
            isDestroyed: b,
            isDuplexNodeStream: function (e) {
                return !(!e || "function" != typeof e.pipe || !e._readableState || "function" != typeof e.on || "function" != typeof e.write)
            },
            isFinished: function (e, t) {
                return f(e) ? !(!b(e) && (!1 !== (null == t ? void 0 : t.readable) && y(e) || !1 !== (null == t ? void 0 : t.writable) && g(e))) : null
            },
            isIterable: function (e, t) {
                return null != e && (!0 === t ? "function" == typeof e[o] : !1 === t ? "function" == typeof e[i] : "function" == typeof e[o] || "function" == typeof e[i])
            },
            isReadableNodeStream: d,
            isReadableEnded: function (e) {
                if (!d(e)) return null;
                if (!0 === e.readableEnded) return !0;
                const t = e._readableState;
                return!(!t || t.errored) && ("boolean" != typeof (null == t ? void 0 : t.ended) ? null : t.ended)
            },
            isReadableFinished: p,
            isReadableErrored: function (e) {
                var t, n;
                return f(e) ? e.readableErrored ? e.readableErrored : null !== (t = null === (n = e._readableState) || void 0 === n ? void 0 : n.errored) && void 0 !== t ? t : null : null
            },
            isNodeStream: f,
            isWritable: g,
            isWritableNodeStream: c,
            isWritableEnded: h,
            isWritableFinished: function (e, t) {
                if (!c(e)) return null;
                if (!0 === e.writableFinished) return !0;
                const n = e._writableState;
                return (null == n || !n.errored) && ("boolean" != typeof (null == n ? void 0 : n.finished) ? null : !!(n.finished || !1 === t && !0 === n.ended && 0 === n.length))
            },
            isWritableErrored: function (e) {
                var t, n;
                return f(e) ? e.writableErrored ? e.writableErrored : null !== (t = null === (n = e._writableState) || void 0 === n ? void 0 : n.errored) && void 0 !== t ? t : null : null
            },
            isServerRequest: function (e) {
                var t;
                return "boolean" == typeof e._consuming && "boolean" == typeof e._dumped && void 0 === (null === (t = e.req) || void 0 === t ? void 0 : t.upgradeOrConnect)
            },
            isServerResponse: w,
            willEmitClose: function (e) {
                if (!f(e)) return null;
                const t = e._writableState, n = e._readableState, r = t || n;
                return!r && w(e) || !!(r && r.autoDestroy && r.emitClose && !1 === r.closed)
            }
        }
    },
    772: (e, t, n) => {
        const r = n(394),
            {ArrayPrototypeSlice:o,Error:i,FunctionPrototypeSymbolHasInstance:a,ObjectDefineProperty:l,ObjectDefineProperties:s,ObjectSetPrototypeOf:u,StringPrototypeToLowerCase:d,Symbol:c,SymbolHasInstance:f} = n(557);
        e.exports = j, j.WritableState = x;
        const {EventEmitter:b} = n(178), h = n(693).Stream, {Buffer:p} = n(368), y = n(701),
            {addAbortSignal:g} = n(920), {getHighWaterMark:_,getDefaultHighWaterMark:w} = n(745),
            {ERR_INVALID_ARG_TYPE:m,ERR_METHOD_NOT_IMPLEMENTED:E,ERR_MULTIPLE_CALLBACK:S,ERR_STREAM_CANNOT_PIPE:v,ERR_STREAM_DESTROYED:R,ERR_STREAM_ALREADY_FINISHED:A,ERR_STREAM_NULL_VALUES:T,ERR_STREAM_WRITE_AFTER_END:I,ERR_UNKNOWN_ENCODING:k} = n(994).codes,
            {errorOrDestroy:O} = y;

        function P() {
        }

        u(j.prototype, h.prototype), u(j, h);
        const M = c("kOnFinished");

        function x(e, t, r) {
            "boolean" != typeof r && (r = t instanceof n(438)), this.objectMode = !(!e || !e.objectMode), r && (this.objectMode = this.objectMode || !(!e || !e.writableObjectMode)), this.highWaterMark = e ? _(this, e, "writableHighWaterMark", r) : w(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
            const o = !(!e || !1 !== e.decodeStrings);
            this.decodeStrings = !o, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = $.bind(void 0, t), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, N(this), this.pendingcb = 0, this.constructed = !0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !e || !1 !== e.emitClose, this.autoDestroy = !e || !1 !== e.autoDestroy, this.errored = null, this.closed = !1, this.closeEmitted = !1, this[M] = []
        }

        function N(e) {
            e.buffered = [], e.bufferedIndex = 0, e.allBuffers = !0, e.allNoop = !0
        }

        function j(e) {
            const t = this instanceof n(438);
            if (!t && !a(j, this)) return new j(e);
            this._writableState = new x(e, this, t), e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final), "function" == typeof e.construct && (this._construct = e.construct), e.signal && g(e.signal, this)), h.call(this, e), y.construct(this, (() => {
                const e = this._writableState;
                e.writing || B(this, e), H(this, e)
            }))
        }

        function D(e, t, n, o) {
            const i = e._writableState;
            if ("function" == typeof n) o = n, n = i.defaultEncoding; else {
                if (n) {
                    if ("buffer" !== n && !p.isEncoding(n)) throw new k(n)
                } else n = i.defaultEncoding;
                "function" != typeof o && (o = P)
            }
            if (null === t) throw new T;
            if (!i.objectMode) if ("string" == typeof t) !1 !== i.decodeStrings && (t = p.from(t, n), n = "buffer"); else if (t instanceof p) n = "buffer"; else {
                if (!h._isUint8Array(t)) throw new m("chunk", ["string", "Buffer", "Uint8Array"], t);
                t = h._uint8ArrayToBuffer(t), n = "buffer"
            }
            let a;
            return i.ending ? a = new I : i.destroyed && (a = new R("write")), a ? (r.nextTick(o, a), O(e, a,!0), a) : (i.pendingcb++, function(e, t, n, r, o){
                const i = t.objectMode ? 1 : n.length;
                t.length += i;
                const a = t.length < t.highWaterMark;
                return a || (t.needDrain = !0), t.writing || t.corked || t.errored || !t.constructed ? (t.buffered.push({
                    chunk: n,
                    encoding: r,
                    callback: o
                }), t.allBuffers && "buffer" !== r && (t.allBuffers = !1), t.allNoop && o !== P && (t.allNoop = !1)) : (t.writelen = i, t.writecb = o, t.writing = !0, t.sync = !0, e._write(n, r, t.onwrite), t.sync = !1), a && !t.errored && !t.destroyed
            }(e, i, t, n, o))
        }

        function L(e, t, n, r, o, i, a) {
            t.writelen = r, t.writecb = a, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new R("write")) : n ? e._writev(o, t.onwrite) : e._write(o, i, t.onwrite), t.sync = !1
        }

        function W(e, t, n, r) {
            --t.pendingcb, r(n), U(t), O(e, n)
        }

        function $(e, t) {
            const n = e._writableState, o = n.sync, i = n.writecb;
                "function" == typeof i ? (n.writing = !1, n.writecb = null, n.length -= n.writelen, n.writelen = 0, t ? (t.stack, n.errored || (n.errored = t), e._readableState && !e._readableState.errored && (e._readableState.errored = t), o ? r.nextTick(W, e, n, t, i) : W(e, n, t, i)) : (n.buffered.length > n.bufferedIndex && B(e, n), o ? null !== n.afterWriteTickInfo && n.afterWriteTickInfo.cb === i ? n.afterWriteTickInfo.count++ : (n.afterWriteTickInfo = {
                count: 1,
                cb: i,
                stream: e,
                state: n
            }, r.nextTick(C, n.afterWriteTickInfo)) : F(e, n, 1, i))) : O(e, new S)
        }

        function C({stream:e,state:t,count:n,cb:r}) {
            return t.afterWriteTickInfo = null, F(e, t, n, r)
        }

        function F(e, t, n, r) {
            for (!t.ending && !e.destroyed && 0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain")); n-- > 0; ) t.pendingcb--, r();
            t.destroyed && U(t), H(e, t)
        }

        function U(e) {
            if (e.writing) return;
            for (let n = e.bufferedIndex;n < e.buffered.length; ++n) {
                var t;
                const {chunk:r,callback:o} = e.buffered[n], i = e.objectMode ? 1 : r.length;
                e.length -= i, o(null !== (t = e.errored) && void 0 !== t ? t : new R("write"))
            }
            const n = e[M].splice(0);
            for (let t = 0;t < n.length; t++) {
                var r;
                n[t](null !== (r = e.errored) && void 0 !== r ? r : new R("end"))
            }
            N(e)
        }

        function B(e, t) {
            if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed) return;
            const {buffered:n,bufferedIndex:r,objectMode:i} = t, a = n.length - r;
            if (!a) return;
            let l = r;
            if (t.bufferProcessing = !0, a > 1 && e._writev) {
                t.pendingcb -= a - 1;
                const r = t.allNoop ? P : e => {
                    for (let t = l;t < n.length; ++t) n[t].callback(e)
                }, i = t.allNoop && 0 === l ? n : o(n, l);
                i.allBuffers = t.allBuffers, L(e, t,!0, t.length, i, "", r), N(t)
            } else {
                do {
                    const {chunk:r,encoding:o,callback:a} = n[l];
                    n[l++] = null, L(e, t,!1, i ? 1 : r.length, r, o, a)
                } while (l < n.length && !t.writing);
                    l === n.length ? N(t) : l > 256 ? (n.splice(0, l), t.bufferedIndex = 0) : t.bufferedIndex = l
            }
            t.bufferProcessing = !1
        }

        function G(e) {
            return e.ending && !e.destroyed && e.constructed && 0 === e.length && !e.errored && 0 === e.buffered.length && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted
        }

        function H(e, t, n) {
            G(t) && (function(e, t){
                t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.finalCalled = !0, function(e, t){
                    let n = !1;

                    function o(o) {
                        if (n) O(e, null != o ? o : S()); else if (n = !0, t.pendingcb--, o) {
                            const n = t[M].splice(0);
                            for (let e = 0;e < n.length; e++) n[e](o);
                            O(e, o, t.sync)
                        } else G(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, r.nextTick(V, e, t))
                    }

                    t.sync = !0, t.pendingcb++;
                    try {
                        e._final(o)
                    } catch (e) {
                        o(e)
                    }
                    t.sync = !1
                }(e, t)))
            }(e, t), 0 === t.pendingcb && (n ? (t.pendingcb++, r.nextTick(((e, t) => {
                G(t) ? V(e, t) : t.pendingcb--
            }), e, t)) : G(t) && (t.pendingcb++, V(e, t))))
        }

        function V(e, t) {
            t.pendingcb--, t.finished = !0;
            const n = t[M].splice(0);
            for (let e = 0;e < n.length; e++) n[e]();
            if (e.emit("finish"), t.autoDestroy) {
                const t = e._readableState;
                (!t || t.autoDestroy && (t.endEmitted || !1 === t.readable)) && e.destroy()
            }
        }

        x.prototype.getBuffer = function () {
            return o(this.buffered, this.bufferedIndex)
        }, l(x.prototype, "bufferedRequestCount", { __proto__: null, get() {
            return this.buffered.length - this.bufferedIndex
        } }), l(j, f, { __proto__: null, value: function (e) {
            return!!a(this, e) || this === j && e && e._writableState instanceof x
        } }), j.prototype.pipe = function () {
            O(this, new v)
        }, j.prototype.write = function (e, t, n) {
            return!0 === D(this, e, t, n)
        }, j.prototype.cork = function () {
            this._writableState.corked++
        }, j.prototype.uncork = function () {
            const e = this._writableState;
            e.corked && (e.corked--, e.writing || B(this, e))
        }, j.prototype.setDefaultEncoding = function (e) {
            if ("string" == typeof e && (e = d(e)),!p.isEncoding(e)) throw new k(e);
            return this._writableState.defaultEncoding = e, this
        }, j.prototype._write = function (e, t, n) {
            if (!this._writev) throw new E("_write()");
            this._writev([{ chunk: e, encoding: t }], n)
        }, j.prototype._writev = null, j.prototype.end = function (e, t, n) {
            const o = this._writableState;
            let a;
            if ("function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null != e) {
                const n = D(this, e, t);
                n instanceof i && (a = n)
            }
            return o.corked && (o.corked = 1, this.uncork()), a || (o.errored || o.ending ? o.finished ? a = new A("end") : o.destroyed && (a = new R("end")) : (o.ending = !0, H(this, o,!0), o.ended = !0)), "function" == typeof n && (a || o.finished ? r.nextTick(n, a) : o[M].push(n)), this
        }, s(j.prototype, {
            closed: { __proto__: null, get() {
                return!!this._writableState && this._writableState.closed
            } },
            destroyed: { __proto__: null, get() {
                return!!this._writableState && this._writableState.destroyed
            }, set(e) {
                this._writableState && (this._writableState.destroyed = e)
            } },
            writable: { __proto__: null, get() {
                const e = this._writableState;
                return !(!e || !1 === e.writable || e.destroyed || e.errored || e.ending || e.ended)
            }, set(e) {
                this._writableState && (this._writableState.writable = !!e)
            } },
            writableFinished: { __proto__: null, get() {
                return!!this._writableState && this._writableState.finished
            } },
            writableObjectMode: { __proto__: null, get() {
                return!!this._writableState && this._writableState.objectMode
            } },
            writableBuffer: { __proto__: null, get() {
                return this._writableState && this._writableState.getBuffer()
            } },
            writableEnded: { __proto__: null, get() {
                return!!this._writableState && this._writableState.ending
            } },
            writableNeedDrain: { __proto__: null, get() {
                const e = this._writableState;
                return!!e && !e.destroyed && !e.ending && e.needDrain
            } },
            writableHighWaterMark: { __proto__: null, get() {
                return this._writableState && this._writableState.highWaterMark
            } },
            writableCorked: { __proto__: null, get() {
                return this._writableState ? this._writableState.corked : 0
            } },
            writableLength: { __proto__: null, get() {
                return this._writableState && this._writableState.length
            } },
            errored: { __proto__: null, enumerable: !1, get() {
                return this._writableState ? this._writableState.errored : null
            } },
            writableAborted: { __proto__: null, enumerable: !1, get: function () {
                return !(!1 === this._writableState.writable || !this._writableState.destroyed && !this._writableState.errored || this._writableState.finished)
            } }
        });
        const q = y.destroy;
        let Y;

        function K() {
            return void 0 === Y && (Y = {}), Y
        }

        j.prototype.destroy = function (e, t) {
            const n = this._writableState;
            return!n.destroyed && (n.bufferedIndex < n.buffered.length || n[M].length) && r.nextTick(U, n), q.call(this, e, t), this
        }, j.prototype._undestroy = y.undestroy, j.prototype._destroy = function (e, t) {
            t(e)
        }, j.prototype[b.captureRejectionSymbol] = function (e) {
            this.destroy(e)
        }, j.fromWeb = function (e, t) {
            return K().newStreamWritableFromWritableStream(e, t)
        }, j.toWeb = function (e) {
            return K().newWritableStreamFromStreamWritable(e)
        }
    },
    215: (e, t, n) => {
        const {ArrayIsArray:r,ArrayPrototypeIncludes:o,ArrayPrototypeJoin:i,ArrayPrototypeMap:a,NumberIsInteger:l,NumberIsNaN:s,NumberMAX_SAFE_INTEGER:u,NumberMIN_SAFE_INTEGER:d,NumberParseInt:c,ObjectPrototypeHasOwnProperty:f,RegExpPrototypeExec:b,String:h,StringPrototypeToUpperCase:p,StringPrototypeTrim:y} = n(557),
            {hideStackFrames:g,codes:{
                ERR_SOCKET_BAD_PORT: _,
                ERR_INVALID_ARG_TYPE: w,
                ERR_INVALID_ARG_VALUE: m,
                ERR_OUT_OF_RANGE: E,
                ERR_UNKNOWN_SIGNAL: S
            }} = n(994), {normalizeEncoding:v} = n(501), {isAsyncFunction:R,isArrayBufferView:A} = n(501).types, T = {},
            I = /^[0-7]+$/, k = g(((e, t, n = d, r = u) => {
                if ("number" != typeof e) throw new w(t, "number", e);
                if (!l(e)) throw new E(t, "an integer", e);
                if (e < n || e > r) throw new E(t, `>= ${n} && <= ${r}`, e)
            })), O = g(((e, t, n = -2147483648, r = 2147483647) => {
                if ("number" != typeof e) throw new w(t, "number", e);
                if (!l(e)) throw new E(t, "an integer", e);
                if (e < n || e > r) throw new E(t, `>= ${n} && <= ${r}`, e)
            })), P = g(((e, t, n = !1) => {
                if ("number" != typeof e) throw new w(t, "number", e);
                if (!l(e)) throw new E(t, "an integer", e);
                const r = n ? 1 : 0, o = 4294967295;
                if (e < r || e > o) throw new E(t, `>= ${r} && <= ${o}`, e)
            }));

        function M(e, t) {
            if ("string" != typeof e) throw new w(t, "string", e)
        }

        const x = g(((e, t, n) => {
            if (!o(n, e)) {
                const r = i(a(n, (e => "string" == typeof e ? `'${e}'` : h(e))), ", ");
                throw new m(t, e, "must be one of: " + r)
            }
        }));

        function N(e, t, n) {
            return null != e && f(e, t) ? e[t] : n
        }

        const j = g(((e, t, n = null) => {
            const o = N(n, "allowArray",!1), i = N(n, "allowFunction",!1);
            if (!N(n, "nullable",!1) && null === e || !o && r(e) || "object" != typeof e && (!i || "function" != typeof e)) throw new w(t, "Object", e)
        })), D = g(((e, t, n = 0) => {
            if (!r(e)) throw new w(t, "Array", e);
            if (e.length < n) throw new m(t, e, `must be longer than ${n}`)
        })), L = g(((e, t = "buffer") => {
            if (!A(e)) throw new w(t, ["Buffer", "TypedArray", "DataView"], e)
        })), W = g(((e, t) => {
            if (void 0 !== e && (null === e || "object" != typeof e || !("aborted" in e))) throw new w(t, "AbortSignal", e)
        })), $ = g(((e, t) => {
            if ("function" != typeof e) throw new w(t, "Function", e)
        })), C = g(((e, t) => {
            if ("function" != typeof e || R(e)) throw new w(t, "Function", e)
        })), F = g(((e, t) => {
            if (void 0 !== e) throw new w(t, "undefined", e)
        }));
        e.exports = {
            isInt32: function (e) {
                return e === (0 | e)
            },
            isUint32: function (e) {
                return e === e >>> 0
            },
            parseFileMode: function (e, t, n) {
                if (void 0 === e && (e = n), "string" == typeof e) {
                    if (null === b(I, e)) throw new m(t, e, "must be a 32-bit unsigned integer or an octal string");
                    e = c(e, 8)
                }
                return P(e, t), e
            },
            validateArray: D,
            validateBoolean: function (e, t) {
                if ("boolean" != typeof e) throw new w(t, "boolean", e)
            },
            validateBuffer: L,
            validateEncoding: function (e, t) {
                const n = v(t), r = e.length;
                if ("hex" === n && r % 2 != 0) throw new m("encoding", t, `is invalid for data of length ${r}`)
            },
            validateFunction: $,
            validateInt32: O,
            validateInteger: k,
            validateNumber: function (e, t, n = void 0, r) {
                if ("number" != typeof e) throw new w(t, "number", e);
                if (null != n && e < n || null != r && e > r || (null != n || null != r) && s(e)) throw new E(t, `${null != n ? `>= ${n}` : ""}${null != n && null != r ? " && " : ""}${null != r ? `<= ${r}` : ""}`, e)
            },
            validateObject: j,
            validateOneOf: x,
            validatePlainFunction: C,
            validatePort: function (e, t = "Port", n = !0) {
                if ("number" != typeof e && "string" != typeof e || "string" == typeof e && 0 === y(e).length || +e != +e >>> 0 || e > 65535 || 0 === e && !n) throw new _(t, e, n);
                return 0 | e
            },
            validateSignalName: function (e, t = "signal") {
                if (M(e, t), void 0 === T[e]) {
                    if (void 0 !== T[p(e)]) throw new S(e + " (signals must use all capital letters)");
                    throw new S(e)
                }
            },
            validateString: M,
            validateUint32: P,
            validateUndefined: F,
            validateUnion: function (e, t, n) {
                if (!o(n, e)) throw new w(t, `('${i(n, "|")}')`, e)
            },
            validateAbortSignal: W
        }
    },
    994: (e, t, n) => {
        const {format:r,inspect:o,AggregateError:i} = n(501), a = globalThis.AggregateError || i,
            l = Symbol("kIsNodeError"),
            s = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"],
            u = /^([A-Z][a-z0-9]*)+$/, d = {};

        function c(e, t) {
            if (!e) throw new d.ERR_INTERNAL_ASSERTION(t)
        }

        function f(e) {
            let t = "", n = e.length;
            const r = "-" === e[0] ? 1 : 0;
            for (; n >= r + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
            return `${e.slice(0, n)}${t}`
        }

        function b(e, t, n) {
            n || (n = Error);

            class o extends n {
                constructor(...n) {
                    super(function(e, t, n){
                        if ("function" == typeof t) return c(t.length <= n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${t.length}).`), t(...n);
                        const o = (t.match(/%[dfijoOs]/g) || []).length;
                        return c(o === n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${o}).`), 0 === n.length ? t : r(t, ...n)
                    }(e, t, n))
                }

                toString() {
                    return `${this.name} [${e}]: ${this.message}`
                }
            }

            Object.defineProperties(o.prototype, {
                name: { value: n.name, writable: !0, enumerable: !1, configurable: !0 },
                toString: { value() {
                    return `${this.name} [${e}]: ${this.message}`
                }, writable: !0, enumerable: !1, configurable: !0 }
            }), o.prototype.code = e, o.prototype[l] = !0, d[e] = o
        }

        function h(e) {
            const t = "__node_internal_" + e.name;
            return Object.defineProperty(e, "name", { value: t }), e
        }

        class p extends Error {
            constructor(e = "The operation was aborted", t = void 0) {
                if (void 0 !== t && "object" != typeof t) throw new d.ERR_INVALID_ARG_TYPE("options", "Object", t);
                super(e, t), this.code = "ABORT_ERR", this.name = "AbortError"
            }
        }

        b("ERR_ASSERTION", "%s", Error), b("ERR_INVALID_ARG_TYPE", ((e, t, n) => {
            c("string" == typeof e, "'name' must be a string"), Array.isArray(t) || (t = [t]);
            let r = "The ";
            e.endsWith(" argument") ? r += `${e} ` : r += `"${e}" ${e.includes(".") ? "property" : "argument"} `, r += "must be ";
            const i = [], a = [], l = [];
            for (const e of t) c("string" == typeof e, "All expected entries have to be of type string"), s.includes(e) ? i.push(e.toLowerCase()) : u.test(e) ? a.push(e) : (c("object" !== e, 'The value "object" should be written as "Object"'), l.push(e));
            if (a.length > 0) {
                const e = i.indexOf("object");
                -1 !== e && (i.splice(i, e, 1), a.push("Object"))
            }
            if (i.length > 0) {
                switch (i.length) {
                    case 1:
                        r += `of type ${i[0]}`;
                        break;
                    case 2:
                        r += `one of type ${i[0]} or ${i[1]}`;
                        break;
                    default: {
                        const e = i.pop();
                        r += `one of type ${i.join(", ")}, or ${e}`
                    }
                }
                (a.length > 0 || l.length > 0) && (r += " or ")
            }
            if (a.length > 0) {
                switch (a.length) {
                    case 1:
                        r += `an instance of ${a[0]}`;
                        break;
                    case 2:
                        r += `an instance of ${a[0]} or ${a[1]}`;
                        break;
                    default: {
                        const e = a.pop();
                        r += `an instance of ${a.join(", ")}, or ${e}`
                    }
                }
                l.length > 0 && (r += " or ")
            }
            switch (l.length) {
                case 0:
                    break;
                case 1:
                    l[0].toLowerCase() !== l[0] && (r += "an "), r += `${l[0]}`;
                    break;
                case 2:
                    r += `one of ${l[0]} or ${l[1]}`;
                    break;
                default: {
                    const e = l.pop();
                    r += `one of ${l.join(", ")}, or ${e}`
                }
            }
            if (null == n) r += `. Received ${n}`; else if ("function" == typeof n && n.name) r += `. Received function ${n.name}`; else if ("object" == typeof n) {
                var d;
                    null !== (d = n.constructor) && void 0 !== d && d.name ? r += `. Received an instance of ${n.constructor.name}` : r += `. Received ${o(n, {
                    depth: -1
                })}`
            } else {
                let e = o(n, { colors: !1 });
                e.length > 25 && (e = `${e.slice(0, 25)}...`), r += `. Received type ${typeof n} (${e})`
            }
            return r
        }), TypeError), b("ERR_INVALID_ARG_VALUE", ((e, t, n = "is invalid") => {
            let r = o(t);
            return r.length > 128 && (r = r.slice(0, 128) + "..."), `The ${e.includes(".") ? "property" : "argument"} '${e}' ${n}. Received ${r}`
        }), TypeError), b("ERR_INVALID_RETURN_VALUE", ((e, t, n) => {
            var r;
            return `Expected ${e} to be returned from the "${t}" function but got ${null != n && null !== (r = n.constructor) && void 0 !== r && r.name ? `instance of ${n.constructor.name}` : "type " + typeof n}.`
        }), TypeError), b("ERR_MISSING_ARGS", ((...e) => {
            let t;
            c(e.length > 0, "At least one arg needs to be specified");
            const n = e.length;
            switch (e = (Array.isArray(e) ? e : [e]).map((e => `"${e}"`)).join(" or "), n) {
                case 1:
                    t += `The ${e[0]} argument`;
                    break;
                case 2:
                    t += `The ${e[0]} and ${e[1]} arguments`;
                    break;
                default: {
                    const n = e.pop();
                    t += `The ${e.join(", ")}, and ${n} arguments`
                }
            }
            return `${t} must be specified`
        }), TypeError), b("ERR_OUT_OF_RANGE", ((e, t, n) => {
            let r;
            return c(t, 'Missing "range" argument'), Number.isInteger(n) && Math.abs(n) > 2**32 ? r = f(String(n)) : "bigint" == typeof n ? (r = String(n), (n > 2n**32n || n < -(2n**32n)) && (r = f(r)), r += "n") : r = o(n), `The value of "${e}" is out of range. It must be ${t}. Received ${r}`
        }), RangeError), b("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error), b("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error), b("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error), b("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error), b("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error), b("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), b("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error), b("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error), b("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error), b("ERR_STREAM_WRITE_AFTER_END", "write after end", Error), b("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError), e.exports = {
            AbortError: p,
            aggregateTwoErrors: h((function (e, t) {
                if (e && t && e !== t) {
                    if (Array.isArray(t.errors)) return t.errors.push(e), t;
                    const n = new a([t, e], t.message);
                    return n.code = t.code, n
                }
                return e || t
            })),
            hideStackFrames: h,
            codes: d
        }
    },
    557: e => {
        e.exports = {
            ArrayIsArray: e => Array.isArray(e),
            ArrayPrototypeIncludes: (e, t) => e.includes(t),
            ArrayPrototypeIndexOf: (e, t) => e.indexOf(t),
            ArrayPrototypeJoin: (e, t) => e.join(t),
            ArrayPrototypeMap: (e, t) => e.map(t),
            ArrayPrototypePop: (e, t) => e.pop(t),
            ArrayPrototypePush: (e, t) => e.push(t),
            ArrayPrototypeSlice: (e, t, n) => e.slice(t, n),
            Error,
            FunctionPrototypeCall: (e, t, ...n) => e.call(t, ...n),
            FunctionPrototypeSymbolHasInstance: (e, t) => Function.prototype[Symbol.hasInstance].call(e, t),
            MathFloor: Math.floor,
            Number,
            NumberIsInteger: Number.isInteger,
            NumberIsNaN: Number.isNaN,
            NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
            NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
            NumberParseInt: Number.parseInt,
            ObjectDefineProperties: (e, t) => Object.defineProperties(e, t),
            ObjectDefineProperty: (e, t, n) => Object.defineProperty(e, t, n),
            ObjectGetOwnPropertyDescriptor: (e, t) => Object.getOwnPropertyDescriptor(e, t),
            ObjectKeys: e => Object.keys(e),
            ObjectSetPrototypeOf: (e, t) => Object.setPrototypeOf(e, t),
            Promise,
            PromisePrototypeCatch: (e, t) => e.catch(t),
            PromisePrototypeThen: (e, t, n) => e.then(t, n),
            PromiseReject: e => Promise.reject(e),
            ReflectApply: Reflect.apply,
            RegExpPrototypeTest: (e, t) => e.test(t),
            SafeSet: Set,
            String,
            StringPrototypeSlice: (e, t, n) => e.slice(t, n),
            StringPrototypeToLowerCase: e => e.toLowerCase(),
            StringPrototypeToUpperCase: e => e.toUpperCase(),
            StringPrototypeTrim: e => e.trim(),
            Symbol,
            SymbolAsyncIterator: Symbol.asyncIterator,
            SymbolHasInstance: Symbol.hasInstance,
            SymbolIterator: Symbol.iterator,
            TypedArrayPrototypeSet: (e, t, n) => e.set(t, n),
            Uint8Array
        }
    },
    501: (e, t, n) => {
        const r = n(368), o = Object.getPrototypeOf((async function () {
        })).constructor, i = globalThis.Blob || r.Blob, a = void 0 !== i ? function (e) {
            return e instanceof i
        } : function (e) {
            return !1
        };

        class l extends Error {
            constructor(e) {
                if (!Array.isArray(e)) throw new TypeError("Expected input to be an Array, got " + typeof e);
                let t = "";
                for (let n = 0;n < e.length; n++) t += `    ${e[n].stack}\n`;
                super(t), this.name = "AggregateError", this.errors = e
            }
        }

        e.exports = {
            AggregateError: l,
            kEmptyObject: Object.freeze({}),
            once(e) {
                let t = !1;
                return function (...n) {
                    t || (t = !0, e.apply(this, n))
                }
            },
            createDeferredPromise: function () {
                let e, t;
                return { promise: new Promise(((n, r) => {
                    e = n, t = r
                })), resolve: e, reject: t }
            },
            promisify: e => new Promise(((t, n) => {
                e(((e, ...r) => e ? n(e) : t(...r)))
            })),
            debuglog: () => function () {
            },
            format: (e, ...t) => e.replace(/%([sdifj])/g, (function (...[e, n]) {
                const r = t.shift();
                return "f" === n ? r.toFixed(6) : "j" === n ? JSON.stringify(r) : "s" === n && "object" == typeof r ? `${r.constructor !== Object ? r.constructor.name : ""} {}`.trim() : r.toString()
            })),
            inspect(e) {
                switch (typeof e) {
                    case "string":
                        if (e.includes("'")) {
                            if (!e.includes('"')) return `"${e}"`;
                            if (!e.includes("`") && !e.includes("${")) return `\`${e}\``
                        }
                        return `'${e}'`;
                    case "number":
                        return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
                    case "bigint":
                        return `${String(e)}n`;
                    case "boolean":
                    case "undefined":
                        return String(e);
                    case "object":
                        return "{}"
                }
            },
            types: { isAsyncFunction: e => e instanceof o, isArrayBufferView: e => ArrayBuffer.isView(e) },
            isBlob: a
        }, e.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom")
    },
    957: (e, t, n) => {
        const {Buffer:r} = n(368), {ObjectDefineProperty:o,ObjectKeys:i,ReflectApply:a} = n(557),
            {promisify:{ custom: l }} = n(501), {streamReturningOperators:s,promiseReturningOperators:u} = n(723),
            {codes:{ ERR_ILLEGAL_CONSTRUCTOR: d }} = n(994), c = n(262), {pipeline:f} = n(792), {destroyer:b} = n(701),
            h = n(355), p = n(523), y = n(433), g = e.exports = n(693).Stream;
        g.isDisturbed = y.isDisturbed, g.isErrored = y.isErrored, g.isReadable = y.isReadable, g.Readable = n(392);
        for (const m of i(s)) {
            const E = s[m];

            function _(...e) {
                if (new.target) throw d();
                return g.Readable.from(a(E, this, e))
            }

            o(_, "name", { __proto__: null, value: E.name }), o(_, "length", {
                __proto__: null,
                value: E.length
            }), o(g.Readable.prototype, m, {
                __proto__: null,
                value: _,
                enumerable: !1,
                configurable: !0,
                writable: !0
            })
        }
        for (const S of i(u)) {
            const v = u[S];

            function _(...e) {
                if (new.target) throw d();
                return a(v, this, e)
            }

            o(_, "name", { __proto__: null, value: v.name }), o(_, "length", {
                __proto__: null,
                value: v.length
            }), o(g.Readable.prototype, S, {
                __proto__: null,
                value: _,
                enumerable: !1,
                configurable: !0,
                writable: !0
            })
        }
        g.Writable = n(772), g.Duplex = n(438), g.Transform = n(744), g.PassThrough = n(107), g.pipeline = f;
        const {addAbortSignal:w} = n(920);
        g.addAbortSignal = w, g.finished = h, g.destroy = b, g.compose = c, o(g, "promises", {
            __proto__: null,
            configurable: !0,
            enumerable: !0,
            get: () => p
        }), o(f, l, { __proto__: null, enumerable: !0, get: () => p.pipeline }), o(h, l, {
            __proto__: null,
            enumerable: !0,
            get: () => p.finished
        }), g.Stream = g, g._isUint8Array = function (e) {
            return e instanceof Uint8Array
        }, g._uint8ArrayToBuffer = function (e) {
            return r.from(e.buffer, e.byteOffset, e.byteLength)
        }
    },
    523: (e, t, n) => {
        const {ArrayPrototypePop:r,Promise:o} = n(557), {isIterable:i,isNodeStream:a} = n(433),
            {pipelineImpl:l} = n(792), {finished:s} = n(355);
        e.exports = { finished: s, pipeline: function (...e) {
            return new o(((t, n) => {
                let o, s;
                const u = e[e.length-1];
                if (u && "object" == typeof u && !a(u) && !i(u)) {
                    const t = r(e);
                    o = t.signal, s = t.end
                }
                l(e, ((e, r) => {
                        e ? n(e) : t(r)
                }), { signal: o, end: s })
            }))
        } }
    },
    499: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(911);

        class o extends r.EventTarget {
            constructor() {
                throw super(), new TypeError("AbortSignal cannot be constructed directly")
            }

            get aborted() {
                const e = i.get(this);
                if ("boolean" != typeof e) throw new TypeError("Expected 'this' to be an 'AbortSignal' object, but got " + (null === this ? "null" : typeof this));
                return e
            }
        }

        r.defineEventAttribute(o.prototype, "abort");
        const i = new WeakMap;
        Object.defineProperties(o.prototype, {
            aborted: { enumerable: !0 }
        }), "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag && Object.defineProperty(o.prototype, Symbol.toStringTag, {
            configurable: !0,
            value: "AbortSignal"
        });

        class a {
            constructor() {
                l.set(this, function(){
                    const e = Object.create(o.prototype);
                    return r.EventTarget.call(e), i.set(e,!1), e
                }())
            }

            get signal() {
                return s(this)
            }

            abort() {
                var e;
                e = s(this),!1 === i.get(e) && (i.set(e,!0), e.dispatchEvent({ type: "abort" }))
            }
        }

        const l = new WeakMap;

        function s(e) {
            const t = l.get(e);
            if (null == t) throw new TypeError("Expected 'this' to be an 'AbortController' object, but got " + (null === e ? "null" : typeof e));
            return t
        }

        Object.defineProperties(a.prototype, {
            signal: { enumerable: !0 },
            abort: { enumerable: !0 }
        }), "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag && Object.defineProperty(a.prototype, Symbol.toStringTag, {
            configurable: !0,
            value: "AbortController"
        }), t.AbortController = a, t.AbortSignal = o, t.default = a, e.exports = a, e.exports.AbortController = e.exports.default = a, e.exports.AbortSignal = o
    },
    911: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        const n = new WeakMap, r = new WeakMap;

        function o(e) {
            const t = n.get(e);
            return console.assert(null != t, "'this' is expected an Event object, but got", e), t
        }

        function i(e) {
                null == e.passiveListener ? e.event.cancelable && (e.canceled = !0, "function" == typeof e.event.preventDefault && e.event.preventDefault()) : "undefined" != typeof console && "function" == typeof console.error && console.error("Unable to preventDefault inside passive event listener invocation.", e.passiveListener)
        }

        function a(e, t) {
            n.set(this, {
                eventTarget: e,
                event: t,
                eventPhase: 2,
                currentTarget: e,
                canceled: !1,
                stopped: !1,
                immediateStopped: !1,
                passiveListener: null,
                timeStamp: t.timeStamp || Date.now()
            }), Object.defineProperty(this, "isTrusted", { value: !1, enumerable: !0 });
            const r = Object.keys(t);
            for (let e = 0;e < r.length; ++e) {
                const t = r[e];
                t in this || Object.defineProperty(this, t, l(t))
            }
        }

        function l(e) {
            return { get() {
                return o(this).event[e]
            }, set(t) {
                o(this).event[e] = t
            }, configurable: !0, enumerable: !0 }
        }

        function s(e) {
            return { value() {
                const t = o(this).event;
                return t[e].apply(t, arguments)
            }, configurable: !0, enumerable: !0 }
        }

        function u(e) {
            if (null == e || e === Object.prototype) return a;
            let t = r.get(e);
            return null == t && (t = function(e, t){
                const n = Object.keys(t);
                if (0 === n.length) return e;

                function r(t, n) {
                    e.call(this, t, n)
                }

                r.prototype = Object.create(e.prototype, { constructor: { value: r, configurable: !0, writable: !0 } });
                for (let o = 0;o < n.length; ++o) {
                    const i = n[o];
                    if (!(i in e.prototype)) {
                        const e = "function" == typeof Object.getOwnPropertyDescriptor(t, i).value;
                        Object.defineProperty(r.prototype, i, e ? s(i) : l(i))
                    }
                }
                return r
            }(u(Object.getPrototypeOf(e)), e), r.set(e, t)), t
        }

        function d(e) {
            return o(e).immediateStopped
        }

        function c(e, t) {
            o(e).passiveListener = t
        }

        a.prototype = {
            get
            type() {
                return o(this).event.type
            },
            get target() {
                return o(this).eventTarget
            },
            get currentTarget() {
                return o(this).currentTarget
            },
            composedPath() {
                const e = o(this).currentTarget;
                return null == e ? [] : [e]
            },
            get NONE() {
                return 0
            },
            get CAPTURING_PHASE() {
                return 1
            },
            get AT_TARGET() {
                return 2
            },
            get BUBBLING_PHASE() {
                return 3
            },
            get eventPhase() {
                return o(this).eventPhase
            },
            stopPropagation() {
                const e = o(this);
                e.stopped = !0, "function" == typeof e.event.stopPropagation && e.event.stopPropagation()
            },
            stopImmediatePropagation() {
                const e = o(this);
                e.stopped = !0, e.immediateStopped = !0, "function" == typeof e.event.stopImmediatePropagation && e.event.stopImmediatePropagation()
            },
            get bubbles() {
                return Boolean(o(this).event.bubbles)
            },
            get cancelable() {
                return Boolean(o(this).event.cancelable)
            },
            preventDefault() {
                i(o(this))
            },
            get defaultPrevented() {
                return o(this).canceled
            },
            get composed() {
                return Boolean(o(this).event.composed)
            },
            get timeStamp() {
                return o(this).timeStamp
            },
            get srcElement() {
                return o(this).eventTarget
            },
            get cancelBubble() {
                return o(this).stopped
            },
            set cancelBubble(e) {
                if (!e) return;
                const t = o(this);
                t.stopped = !0, "boolean" == typeof t.event.cancelBubble && (t.event.cancelBubble = !0)
            },
            get returnValue() {
                return !o(this).canceled
            },
            set returnValue(e) {
                e || i(o(this))
            },
            initEvent() {
            }
        }, Object.defineProperty(a.prototype, "constructor", {
            value: a,
            configurable: !0,
            writable: !0
        }), "undefined" != typeof window && void 0 !== window.Event && (Object.setPrototypeOf(a.prototype, window.Event.prototype), r.set(window.Event.prototype, a));
        const f = new WeakMap, b = 3;

        function h(e) {
            return null !== e && "object" == typeof e
        }

        function p(e) {
            const t = f.get(e);
            if (null == t) throw new TypeError("'this' is expected an EventTarget object, but got another value.");
            return t
        }

        function y(e, t) {
            Object.defineProperty(e, `on${t}`, function(e){
                return { get() {
                    let t = p(this).get(e);
                    for (; null != t; ) {
                        if (t.listenerType === b) return t.listener;
                        t = t.next
                    }
                    return null
                }, set(t) {
                    "function" == typeof t || h(t) || (t = null);
                    const n = p(this);
                    let r = null, o = n.get(e);
                    for (; null != o; ) o.listenerType === b ? null !== r ? r.next = o.next : null !== o.next ? n.set(e, o.next) : n.delete(e) : r = o, o = o.next;
                    if (null !== t) {
                        const o = {
                            listener: t,
                            listenerType: b,
                            passive: !1,
                            once: !1,
                            next: null
                        };
                            null === r ? n.set(e, o) : r.next = o
                    }
                }, configurable: !0, enumerable: !0 }
            }(t))
        }

        function g(e) {

            function t() {
                _.call(this)
            }

            t.prototype = Object.create(_.prototype, { constructor: { value: t, configurable: !0, writable: !0 } });
            for (let n = 0;n < e.length; ++n) y(t.prototype, e[n]);
            return t
        }

        function _() {
            if (!(this instanceof _)) {
                if (1 === arguments.length && Array.isArray(arguments[0])) return g(arguments[0]);
                if (arguments.length > 0) {
                    const e = new Array(arguments.length);
                    for (let t = 0;t < arguments.length; ++t) e[t] = arguments[t];
                    return g(e)
                }
                throw new TypeError("Cannot call a class as a function")
            }
            f.set(this, new Map)
        }

        _.prototype = { addEventListener(e, t, n) {
            if (null == t) return;
            if ("function" != typeof t && !h(t)) throw new TypeError("'listener' should be a function or an object.");
            const r = p(this), o = h(n), i = (o ? Boolean(n.capture) : Boolean(n)) ? 1 : 2, a = {
                listener: t,
                listenerType: i,
                passive: o && Boolean(n.passive),
                once: o && Boolean(n.once),
                next: null
            };
            let l = r.get(e);
            if (void 0 === l) return void r.set(e, a);
            let s = null;
            for (; null != l; ) {
                if (l.listener === t && l.listenerType === i) return;
                s = l, l = l.next
            }
            s.next = a
        }, removeEventListener(e, t, n) {
            if (null == t) return;
            const r = p(this), o = (h(n) ? Boolean(n.capture) : Boolean(n)) ? 1 : 2;
            let i = null, a = r.get(e);
            for (; null != a; ) {
                if (a.listener === t && a.listenerType === o) return void (null !== i ? i.next = a.next : null !== a.next ? r.set(e, a.next) : r.delete(e));
                i = a, a = a.next
            }
        }, dispatchEvent(e) {
            if (null == e || "string" != typeof e.type) throw new TypeError('"event.type" should be a string.');
            const t = p(this), n = e.type;
            let r = t.get(n);
            if (null == r) return !0;
            const i = function(e, t){
                return new (u(Object.getPrototypeOf(t)))(e, t)
            }(this, e);
            let a = null;
            for (; null != r; ) {
                if (r.once ? null !== a ? a.next = r.next : null !== r.next ? t.set(n, r.next) : t.delete(n) : a = r, c(i, r.passive ? r.listener : null), "function" == typeof r.listener) try {
                    r.listener.call(this, i)
                } catch (e) {
                    "undefined" != typeof console && "function" == typeof console.error && console.error(e)
                } else r.listenerType !== b && "function" == typeof r.listener.handleEvent && r.listener.handleEvent(i);
                if (d(i)) break;
                r = r.next
            }
            return c(i, null), function(e, t){
                o(e).eventPhase = 0
            }(i), function(e, t){
                o(e).currentTarget = null
            }(i),!i.defaultPrevented
        } }, Object.defineProperty(_.prototype, "constructor", {
            value: _,
            configurable: !0,
            writable: !0
        }), "undefined" != typeof window && void 0 !== window.EventTarget && Object.setPrototypeOf(_.prototype, window.EventTarget.prototype), t.defineEventAttribute = y, t.EventTarget = _, t.default = _, e.exports = _, e.exports.EventTarget = e.exports.default = _, e.exports.defineEventAttribute = y
    },
    368: t => {
        t.exports = e
    },
    178: e => {
        e.exports = t
    },
    394: e => {
        e.exports = n
    },
    888: e => {
        e.exports = r
    }
}, i = {};

function a(e) {
    var t = i[e];
    if (void 0 !== t) return t.exports;
    var n = i[e] = { exports: {} };
    return o[e](n, n.exports, a), n.exports
}

var l = {};
(() => {
    var e = l;
    const t = a(957), n = t.Readable.destroy;
    e.CT = t._isUint8Array, e.q8 = t.isDisturbed, e.o6 = t.isErrored, e.FA = t.isReadable, e.$M = t.Readable, e.cK = t.Writable, e.$P = t.Duplex, e.wx = t.Transform, e.ze = t.PassThrough, e.iy = t.addAbortSignal, e.V3 = t.finished, e.ob = t.destroy, e.ob = n, e.EU = t.pipeline, e.qC = t.compose
})();
var s = l.$P, u = l.ze, d = l.$M, c = l.wx, f = l.cK, b = l.CT, h = l.iy, p = l.qC, y = l.ob, g = l.V3, _ = l.q8,
    w = l.o6, m = l.FA, E = l.EU;

export {
    s as Duplex,
    u as PassThrough,
    d as Readable,
    c as Transform,
    f as Writable,
    b as _isUint8Array,
    h as addAbortSignal,
    p as compose,
    y as destroy,
    g as finished,
    _ as isDisturbed,
    w as isErrored,
    m as isReadable,
    E as pipeline
};