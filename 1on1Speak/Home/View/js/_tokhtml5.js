/*!
 * OpenTok JavaScript Library v1.1.4
 * http://www.tokbox.com/
 *
 * Copyright (c) 2011 TokBox, Inc.
 *
 * Date: March 20 12:01:48 2013
 */
(function () {
    var x = this;
    var k = x._;
    var F = {};
    var E = Array.prototype,
        g = Object.prototype,
        s = Function.prototype;
    var J = E.push,
        p = E.slice,
        z = E.concat,
        C = E.unshift,
        d = g.toString,
        j = g.hasOwnProperty;
    var N = E.forEach,
        r = E.map,
        G = E.reduce,
        c = E.reduceRight,
        b = E.filter,
        D = E.every,
        q = E.some,
        o = E.indexOf,
        m = E.lastIndexOf,
        v = Array.isArray,
        f = Object.keys,
        H = s.bind;
    var O = function (P) {
        if (P instanceof O) {
            return P
        }
        if (!(this instanceof O)) {
            return new O(P)
        }
        this._wrapped = P
    };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = O
        }
        exports._ = O
    } else {
        x._ = O
    }
    O.VERSION = "1.4.2";
    var K = O.each = O.forEach = function (U, T, S) {
        if (U == null) {
            return
        }
        if (N && U.forEach === N) {
            U.forEach(T, S)
        } else {
            if (U.length === +U.length) {
                for (var R = 0, P = U.length; R < P; R++) {
                    if (T.call(S, U[R], R, U) === F) {
                        return
                    }
                }
            } else {
                for (var Q in U) {
                    if (O.has(U, Q)) {
                        if (T.call(S, U[Q], Q, U) === F) {
                            return
                        }
                    }
                }
            }
        }
    };
    O.map = O.collect = function (S, R, Q) {
        var P = [];
        if (S == null) {
            return P
        }
        if (r && S.map === r) {
            return S.map(R, Q)
        }
        K(S, function (V, T, U) {
            P[P.length] = R.call(Q, V, T, U)
        });
        return P
    };
    O.reduce = O.foldl = O.inject = function (T, S, P, R) {
        var Q = arguments.length > 2;
        if (T == null) {
            T = []
        }
        if (G && T.reduce === G) {
            if (R) {
                S = O.bind(S, R)
            }
            return Q ? T.reduce(S, P) : T.reduce(S)
        }
        K(T, function (W, U, V) {
            if (!Q) {
                P = W;
                Q = true
            } else {
                P = S.call(R, P, W, U, V)
            }
        });
        if (!Q) {
            throw new TypeError("Reduce of empty array with no initial value")
        }
        return P
    };
    O.reduceRight = O.foldr = function (V, S, P, R) {
        var Q = arguments.length > 2;
        if (V == null) {
            V = []
        }
        if (c && V.reduceRight === c) {
            if (R) {
                S = O.bind(S, R)
            }
            return arguments.length > 2 ? V.reduceRight(S, P) : V.reduceRight(S)
        }
        var U = V.length;
        if (U !== +U) {
            var T = O.keys(V);
            U = T.length
        }
        K(V, function (Y, W, X) {
            W = T ? T[--U] : --U;
            if (!Q) {
                P = V[W];
                Q = true
            } else {
                P = S.call(R, P, V[W], W, X)
            }
        });
        if (!Q) {
            throw new TypeError("Reduce of empty array with no initial value")
        }
        return P
    };
    O.find = O.detect = function (S, R, Q) {
        var P;
        B(S, function (V, T, U) {
            if (R.call(Q, V, T, U)) {
                P = V;
                return true
            }
        });
        return P
    };
    O.filter = O.select = function (S, R, Q) {
        var P = [];
        if (S == null) {
            return P
        }
        if (b && S.filter === b) {
            return S.filter(R, Q)
        }
        K(S, function (V, T, U) {
            if (R.call(Q, V, T, U)) {
                P[P.length] = V
            }
        });
        return P
    };
    O.reject = function (S, R, Q) {
        var P = [];
        if (S == null) {
            return P
        }
        K(S, function (V, T, U) {
            if (!R.call(Q, V, T, U)) {
                P[P.length] = V
            }
        });
        return P
    };
    O.every = O.all = function (S, R, Q) {
        R || (R = O.identity);
        var P = true;
        if (S == null) {
            return P
        }
        if (D && S.every === D) {
            return S.every(R, Q)
        }
        K(S, function (V, T, U) {
            if (!(P = P && R.call(Q, V, T, U))) {
                return F
            }
        });
        return !!P
    };
    var B = O.some = O.any = function (S, R, Q) {
        R || (R = O.identity);
        var P = false;
        if (S == null) {
            return P
        }
        if (q && S.some === q) {
            return S.some(R, Q)
        }
        K(S, function (V, T, U) {
            if (P || (P = R.call(Q, V, T, U))) {
                return F
            }
        });
        return !!P
    };
    O.contains = O.include = function (R, Q) {
        var P = false;
        if (R == null) {
            return P
        }
        if (o && R.indexOf === o) {
            return R.indexOf(Q) != -1
        }
        P = B(R, function (S) {
            return S === Q
        });
        return P
    };
    O.invoke = function (Q, R) {
        var P = p.call(arguments, 2);
        return O.map(Q, function (S) {
            return (O.isFunction(R) ? R : S[R]).apply(S, P)
        })
    };
    O.pluck = function (Q, P) {
        return O.map(Q, function (R) {
            return R[P]
        })
    };
    O.where = function (Q, P) {
        if (O.isEmpty(P)) {
            return []
        }
        return O.filter(Q, function (S) {
            for (var R in P) {
                if (P[R] !== S[R]) {
                    return false
                }
            }
            return true
        })
    };
    O.max = function (S, R, Q) {
        if (!R && O.isArray(S) && S[0] === +S[0] && S.length < 65535) {
            return Math.max.apply(Math, S)
        }
        if (!R && O.isEmpty(S)) {
            return -Infinity
        }
        var P = {
            computed: -Infinity
        };
        K(S, function (W, T, V) {
            var U = R ? R.call(Q, W, T, V) : W;
            U >= P.computed && (P = {
                value: W,
                computed: U
            })
        });
        return P.value
    };
    O.min = function (S, R, Q) {
        if (!R && O.isArray(S) && S[0] === +S[0] && S.length < 65535) {
            return Math.min.apply(Math, S)
        }
        if (!R && O.isEmpty(S)) {
            return Infinity
        }
        var P = {
            computed: Infinity
        };
        K(S, function (W, T, V) {
            var U = R ? R.call(Q, W, T, V) : W;
            U < P.computed && (P = {
                value: W,
                computed: U
            })
        });
        return P.value
    };
    O.shuffle = function (S) {
        var R;
        var Q = 0;
        var P = [];
        K(S, function (T) {
            R = O.random(Q++);
            P[Q - 1] = P[R];
            P[R] = T
        });
        return P
    };
    var a = function (P) {
        return O.isFunction(P) ? P : function (Q) {
            return Q[P]
        }
    };
    O.sortBy = function (S, R, P) {
        var Q = a(R);
        return O.pluck(O.map(S, function (V, T, U) {
            return {
                value: V,
                index: T,
                criteria: Q.call(P, V, T, U)
            }
        }).sort(function (W, V) {
            var U = W.criteria;
            var T = V.criteria;
            if (U !== T) {
                if (U > T || U === void 0) {
                    return 1
                }
                if (U < T || T === void 0) {
                    return -1
                }
            }
            return W.index < V.index ? -1 : 1
        }), "value")
    };
    var u = function (U, T, Q, S) {
        var P = {};
        var R = a(T);
        K(U, function (X, V) {
            var W = R.call(Q, X, V, U);
            S(P, W, X)
        });
        return P
    };
    O.groupBy = function (R, Q, P) {
        return u(R, Q, P, function (S, T, U) {
            (O.has(S, T) ? S[T] : (S[T] = [])).push(U)
        })
    };
    O.countBy = function (R, Q, P) {
        return u(R, Q, P, function (S, T, U) {
            if (!O.has(S, T)) {
                S[T] = 0
            }
            S[T]++
        })
    };
    O.sortedIndex = function (W, V, S, R) {
        S = S == null ? O.identity : a(S);
        var U = S.call(R, V);
        var P = 0,
            T = W.length;
        while (P < T) {
            var Q = (P + T) >>> 1;
            S.call(R, W[Q]) < U ? P = Q + 1 : T = Q
        }
        return P
    };
    O.toArray = function (P) {
        if (!P) {
            return []
        }
        if (P.length === +P.length) {
            return p.call(P)
        }
        return O.values(P)
    };
    O.size = function (P) {
        return (P.length === +P.length) ? P.length : O.keys(P).length
    };
    O.first = O.head = O.take = function (R, Q, P) {
        return (Q != null) && !P ? p.call(R, 0, Q) : R[0]
    };
    O.initial = function (R, Q, P) {
        return p.call(R, 0, R.length - ((Q == null) || P ? 1 : Q))
    };
    O.last = function (R, Q, P) {
        if ((Q != null) && !P) {
            return p.call(R, Math.max(R.length - Q, 0))
        } else {
            return R[R.length - 1]
        }
    };
    O.rest = O.tail = O.drop = function (R, Q, P) {
        return p.call(R, (Q == null) || P ? 1 : Q)
    };
    O.compact = function (P) {
        return O.filter(P, function (Q) {
            return !!Q
        })
    };
    var y = function (Q, R, P) {
        K(Q, function (S) {
            if (O.isArray(S)) {
                R ? J.apply(P, S) : y(S, R, P)
            } else {
                P.push(S)
            }
        });
        return P
    };
    O.flatten = function (Q, P) {
        return y(Q, P, [])
    };
    O.without = function (P) {
        return O.difference(P, p.call(arguments, 1))
    };
    O.uniq = O.unique = function (V, U, T, S) {
        var Q = T ? O.map(V, T, S) : V;
        var R = [];
        var P = [];
        K(Q, function (X, W) {
            if (U ? (!W || P[P.length - 1] !== X) : !O.contains(P, X)) {
                P.push(X);
                R.push(V[W])
            }
        });
        return R
    };
    O.union = function () {
        return O.uniq(z.apply(E, arguments))
    };
    O.intersection = function (Q) {
        var P = p.call(arguments, 1);
        return O.filter(O.uniq(Q), function (R) {
            return O.every(P, function (S) {
                return O.indexOf(S, R) >= 0
            })
        })
    };
    O.difference = function (Q) {
        var P = z.apply(E, p.call(arguments, 1));
        return O.filter(Q, function (R) {
            return !O.contains(P, R)
        })
    };
    O.zip = function () {
        var P = p.call(arguments);
        var S = O.max(O.pluck(P, "length"));
        var R = new Array(S);
        for (var Q = 0; Q < S; Q++) {
            R[Q] = O.pluck(P, "" + Q)
        }
        return R
    };
    O.object = function (T, R) {
        var P = {};
        for (var S = 0, Q = T.length; S < Q; S++) {
            if (R) {
                P[T[S]] = R[S]
            } else {
                P[T[S][0]] = T[S][1]
            }
        }
        return P
    };
    O.indexOf = function (T, R, S) {
        if (T == null) {
            return -1
        }
        var Q = 0,
            P = T.length;
        if (S) {
            if (typeof S == "number") {
                Q = (S < 0 ? Math.max(0, P + S) : S)
            } else {
                Q = O.sortedIndex(T, R);
                return T[Q] === R ? Q : -1
            }
        }
        if (o && T.indexOf === o) {
            return T.indexOf(R, S)
        }
        for (; Q < P; Q++) {
            if (T[Q] === R) {
                return Q
            }
        }
        return -1
    };
    O.lastIndexOf = function (T, R, S) {
        if (T == null) {
            return -1
        }
        var P = S != null;
        if (m && T.lastIndexOf === m) {
            return P ? T.lastIndexOf(R, S) : T.lastIndexOf(R)
        }
        var Q = (P ? S : T.length);
        while (Q--) {
            if (T[Q] === R) {
                return Q
            }
        }
        return -1
    };
    O.range = function (U, S, T) {
        if (arguments.length <= 1) {
            S = U || 0;
            U = 0
        }
        T = arguments[2] || 1;
        var Q = Math.max(Math.ceil((S - U) / T), 0);
        var P = 0;
        var R = new Array(Q);
        while (P < Q) {
            R[P++] = U;
            U += T
        }
        return R
    };
    var I = function () {};
    O.bind = function e(S, Q) {
        var R, P;
        if (S.bind === H && H) {
            return H.apply(S, p.call(arguments, 1))
        }
        if (!O.isFunction(S)) {
            throw new TypeError
        }
        P = p.call(arguments, 2);
        return R = function () {
            if (!(this instanceof R)) {
                return S.apply(Q, P.concat(p.call(arguments)))
            }
            I.prototype = S.prototype;
            var U = new I;
            var T = S.apply(U, P.concat(p.call(arguments)));
            if (Object(T) === T) {
                return T
            }
            return U
        }
    };
    O.bindAll = function (Q) {
        var P = p.call(arguments, 1);
        if (P.length == 0) {
            P = O.functions(Q)
        }
        K(P, function (R) {
            Q[R] = O.bind(Q[R], Q)
        });
        return Q
    };
    O.memoize = function (R, Q) {
        var P = {};
        Q || (Q = O.identity);
        return function () {
            var S = Q.apply(this, arguments);
            return O.has(P, S) ? P[S] : (P[S] = R.apply(this, arguments))
        }
    };
    O.delay = function (Q, R) {
        var P = p.call(arguments, 2);
        return setTimeout(function () {
            return Q.apply(null, P)
        }, R)
    };
    O.defer = function (P) {
        return O.delay.apply(O, [P, 1].concat(p.call(arguments, 1)))
    };
    O.throttle = function (R, S) {
        var Q, U, V, W, T, X;
        var P = O.debounce(function () {
            T = W = false
        }, S);
        return function () {
            Q = this;
            U = arguments;
            var Y = function () {
                V = null;
                if (T) {
                    X = R.apply(Q, U)
                }
                P()
            };
            if (!V) {
                V = setTimeout(Y, S)
            }
            if (W) {
                T = true
            } else {
                W = true;
                X = R.apply(Q, U)
            }
            P();
            return X
        }
    };
    O.debounce = function (R, T, Q) {
        var S, P;
        return function () {
            var X = this,
                W = arguments;
            var V = function () {
                S = null;
                if (!Q) {
                    P = R.apply(X, W)
                }
            };
            var U = Q && !S;
            clearTimeout(S);
            S = setTimeout(V, T);
            if (U) {
                P = R.apply(X, W)
            }
            return P
        }
    };
    O.once = function (R) {
        var P = false,
            Q;
        return function () {
            if (P) {
                return Q
            }
            P = true;
            Q = R.apply(this, arguments);
            R = null;
            return Q
        }
    };
    O.wrap = function (P, Q) {
        return function () {
            var R = [P];
            J.apply(R, arguments);
            return Q.apply(this, R)
        }
    };
    O.compose = function () {
        var P = arguments;
        return function () {
            var Q = arguments;
            for (var R = P.length - 1; R >= 0; R--) {
                Q = [P[R].apply(this, Q)]
            }
            return Q[0]
        }
    };
    O.after = function (Q, P) {
        if (Q <= 0) {
            return P()
        }
        return function () {
            if (--Q < 1) {
                return P.apply(this, arguments)
            }
        }
    };
    O.keys = f || function (R) {
        if (R !== Object(R)) {
            throw new TypeError("Invalid object")
        }
        var Q = [];
        for (var P in R) {
            if (O.has(R, P)) {
                Q[Q.length] = P
            }
        }
        return Q
    };
    O.values = function (R) {
        var P = [];
        for (var Q in R) {
            if (O.has(R, Q)) {
                P.push(R[Q])
            }
        }
        return P
    };
    O.pairs = function (R) {
        var Q = [];
        for (var P in R) {
            if (O.has(R, P)) {
                Q.push([P, R[P]])
            }
        }
        return Q
    };
    O.invert = function (R) {
        var P = {};
        for (var Q in R) {
            if (O.has(R, Q)) {
                P[R[Q]] = Q
            }
        }
        return P
    };
    O.functions = O.methods = function (R) {
        var Q = [];
        for (var P in R) {
            if (O.isFunction(R[P])) {
                Q.push(P)
            }
        }
        return Q.sort()
    };
    O.extend = function (P) {
        K(p.call(arguments, 1), function (Q) {
            for (var R in Q) {
                P[R] = Q[R]
            }
        });
        return P
    };
    O.pick = function (Q) {
        var R = {};
        var P = z.apply(E, p.call(arguments, 1));
        K(P, function (S) {
            if (S in Q) {
                R[S] = Q[S]
            }
        });
        return R
    };
    O.omit = function (R) {
        var S = {};
        var Q = z.apply(E, p.call(arguments, 1));
        for (var P in R) {
            if (!O.contains(Q, P)) {
                S[P] = R[P]
            }
        }
        return S
    };
    O.defaults = function (P) {
        K(p.call(arguments, 1), function (Q) {
            for (var R in Q) {
                if (P[R] == null) {
                    P[R] = Q[R]
                }
            }
        });
        return P
    };
    O.clone = function (P) {
        if (!O.isObject(P)) {
            return P
        }
        return O.isArray(P) ? P.slice() : O.extend({}, P)
    };
    O.tap = function (Q, P) {
        P(Q);
        return Q
    };
    var L = function (W, V, Q, R) {
        if (W === V) {
            return W !== 0 || 1 / W == 1 / V
        }
        if (W == null || V == null) {
            return W === V
        }
        if (W instanceof O) {
            W = W._wrapped
        }
        if (V instanceof O) {
            V = V._wrapped
        }
        var T = d.call(W);
        if (T != d.call(V)) {
            return false
        }
        switch (T) {
        case "[object String]":
            return W == String(V);
        case "[object Number]":
            return W != +W ? V != +V : (W == 0 ? 1 / W == 1 / V : W == +V);
        case "[object Date]":
        case "[object Boolean]":
            return +W == +V;
        case "[object RegExp]":
            return W.source == V.source && W.global == V.global && W.multiline == V.multiline && W.ignoreCase == V.ignoreCase
        }
        if (typeof W != "object" || typeof V != "object") {
            return false
        }
        var P = Q.length;
        while (P--) {
            if (Q[P] == W) {
                return R[P] == V
            }
        }
        Q.push(W);
        R.push(V);
        var Y = 0,
            Z = true;
        if (T == "[object Array]") {
            Y = W.length;
            Z = Y == V.length;
            if (Z) {
                while (Y--) {
                    if (!(Z = L(W[Y], V[Y], Q, R))) {
                        break
                    }
                }
            }
        } else {
            var U = W.constructor,
                S = V.constructor;
            if (U !== S && !(O.isFunction(U) && (U instanceof U) && O.isFunction(S) && (S instanceof S))) {
                return false
            }
            for (var X in W) {
                if (O.has(W, X)) {
                    Y++;
                    if (!(Z = O.has(V, X) && L(W[X], V[X], Q, R))) {
                        break
                    }
                }
            }
            if (Z) {
                for (X in V) {
                    if (O.has(V, X) && !(Y--)) {
                        break
                    }
                }
                Z = !Y
            }
        }
        Q.pop();
        R.pop();
        return Z
    };
    O.isEqual = function (Q, P) {
        return L(Q, P, [], [])
    };
    O.isEmpty = function (Q) {
        if (Q == null) {
            return true
        }
        if (O.isArray(Q) || O.isString(Q)) {
            return Q.length === 0
        }
        for (var P in Q) {
            if (O.has(Q, P)) {
                return false
            }
        }
        return true
    };
    O.isElement = function (P) {
        return !!(P && P.nodeType === 1)
    };
    O.isArray = v || function (P) {
        return d.call(P) == "[object Array]"
    };
    O.isObject = function (P) {
        return P === Object(P)
    };
    K(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (P) {
        O["is" + P] = function (Q) {
            return d.call(Q) == "[object " + P + "]"
        }
    });
    if (!O.isArguments(arguments)) {
        O.isArguments = function (P) {
            return !!(P && O.has(P, "callee"))
        }
    }
    if (typeof (/./) !== "function") {
        O.isFunction = function (P) {
            return typeof P === "function"
        }
    }
    O.isFinite = function (P) {
        return O.isNumber(P) && isFinite(P)
    };
    O.isNaN = function (P) {
        return O.isNumber(P) && P != +P
    };
    O.isBoolean = function (P) {
        return P === true || P === false || d.call(P) == "[object Boolean]"
    };
    O.isNull = function (P) {
        return P === null
    };
    O.isUndefined = function (P) {
        return P === void 0
    };
    O.has = function (Q, P) {
        return j.call(Q, P)
    };
    O.noConflict = function () {
        x._ = k;
        return this
    };
    O.identity = function (P) {
        return P
    };
    O.times = function (S, R, Q) {
        for (var P = 0; P < S; P++) {
            R.call(Q, P)
        }
    };
    O.random = function (Q, P) {
        if (P == null) {
            P = Q;
            Q = 0
        }
        return Q + (0 | Math.random() * (P - Q + 1))
    };
    var n = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    n.unescape = O.invert(n.escape);
    var M = {
        escape: new RegExp("[" + O.keys(n.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + O.keys(n.unescape).join("|") + ")", "g")
    };
    O.each(["escape", "unescape"], function (P) {
        O[P] = function (Q) {
            if (Q == null) {
                return ""
            }
            return ("" + Q).replace(M[P], function (R) {
                return n[P][R]
            })
        }
    });
    O.result = function (P, R) {
        if (P == null) {
            return null
        }
        var Q = P[R];
        return O.isFunction(Q) ? Q.call(P) : Q
    };
    O.mixin = function (P) {
        K(O.functions(P), function (Q) {
            var R = O[Q] = P[Q];
            O.prototype[Q] = function () {
                var S = [this._wrapped];
                J.apply(S, arguments);
                return t.call(this, R.apply(O, S))
            }
        })
    };
    var A = 0;
    O.uniqueId = function (P) {
        var Q = A++;
        return P ? P + Q : Q
    };
    O.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var w = /(.)^/;
    var h = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var i = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    O.template = function (X, S, R) {
        R = O.defaults({}, R, O.templateSettings);
        var T = new RegExp([(R.escape || w).source, (R.interpolate || w).source, (R.evaluate || w).source].join("|") + "|$", "g");
        var U = 0;
        var P = "__p+='";
        X.replace(T, function (Z, aa, Y, ac, ab) {
            P += X.slice(U, ab).replace(i, function (ad) {
                return "\\" + h[ad]
            });
            P += aa ? "'+\n((__t=(" + aa + "))==null?'':_.escape(__t))+\n'" : Y ? "'+\n((__t=(" + Y + "))==null?'':__t)+\n'" : ac ? "';\n" + ac + "\n__p+='" : "";
            U = ab + Z.length
        });
        P += "';\n";
        if (!R.variable) {
            P = "with(obj||{}){\n" + P + "}\n"
        }
        P = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + P + "return __p;\n";
        try {
            var Q = new Function(R.variable || "obj", "_", P)
        } catch (V) {
            V.source = P;
            throw V
        }
        if (S) {
            return Q(S, O)
        }
        var W = function (Y) {
            return Q.call(this, Y, O)
        };
        W.source = "function(" + (R.variable || "obj") + "){\n" + P + "}";
        return W
    };
    O.chain = function (P) {
        return O(P).chain()
    };
    var t = function (P) {
        return this._chain ? O(P).chain() : P
    };
    O.mixin(O);
    K(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (P) {
        var Q = E[P];
        O.prototype[P] = function () {
            var R = this._wrapped;
            Q.apply(R, arguments);
            if ((P == "shift" || P == "splice") && R.length === 0) {
                delete R[0]
            }
            return t.call(this, R)
        }
    });
    K(["concat", "join", "slice"], function (P) {
        var Q = E[P];
        O.prototype[P] = function () {
            return t.call(this, Q.apply(this._wrapped, arguments))
        }
    });
    O.extend(O.prototype, {
        chain: function () {
            this._chain = true;
            return this
        },
        value: function () {
            return this._wrapped
        }
    })
}).call(this);
/*
 *  This is a modified version of Robert Kieffer awesome uuid.js library.
 *  The only modifications we've made are to remove the Node.js specific
 *  parts of the code and the UUID version 1 generator (which we don't
 *  use). The original copyright notice is below.
 *
 *     node-uuid/uuid.js
 *
 *     Copyright (c) 2010 Robert Kieffer
 *     Dual licensed under the MIT and GPL licenses.
 *     Documentation and details at https://github.com/broofa/node-uuid
 */
(function () {
    var n = this;
    var f, e;
    var q = new Array(16);
    f = function () {
        var u, s = q,
            t = 0;
        for (t = 0; t < 16; t++) {
            if ((t & 3) === 0) {
                u = Math.random() * 4294967296
            }
            s[t] = u >>> ((t & 3) << 3) & 255
        }
        return s
    };
    if (n.crypto && crypto.getRandomValues) {
        var b = new Uint32Array(4);
        e = function () {
            crypto.getRandomValues(b);
            for (var i = 0; i < 16; i++) {
                q[i] = b[i >> 2] >>> ((i & 3) * 8) & 255
            }
            return q
        }
    }
    var d = e || f;
    var m = typeof (Buffer) == "function" ? Buffer : Array;
    var p = [];
    var j = {};
    for (var h = 0; h < 256; h++) {
        p[h] = (h + 256).toString(16).substr(1);
        j[p[h]] = h
    }

    function g(v, r, w) {
        var t = (r && w) || 0,
            u = 0;
        r = r || [];
        v.toLowerCase().replace(/[0-9a-f]{2}/g, function (i) {
            if (u < 16) {
                r[t + u++] = j[i]
            }
        });
        while (u < 16) {
            r[t + u++] = 0
        }
        return r
    }

    function k(r, t) {
        var s = t || 0,
            u = p;
        return u[r[s++]] + u[r[s++]] + u[r[s++]] + u[r[s++]] + "-" + u[r[s++]] + u[r[s++]] + "-" + u[r[s++]] + u[r[s++]] + "-" + u[r[s++]] + u[r[s++]] + "-" + u[r[s++]] + u[r[s++]] + u[r[s++]] + u[r[s++]] + u[r[s++]] + u[r[s++]]
    }

    function o(s, r, w) {
        var t = r && w || 0;
        if (typeof (s) == "string") {
            r = s == "binary" ? new m(16) : null;
            s = null
        }
        s = s || {};
        var v = s.random || (s.rng || d)();
        v[6] = (v[6] & 15) | 64;
        v[8] = (v[8] & 63) | 128;
        if (r) {
            for (var u = 0; u < 16; u++) {
                r[t + u] = v[u]
            }
        }
        return r || k(v)
    }
    var a = o;
    a.v4 = o;
    a.parse = g;
    a.unparse = k;
    a.BufferClass = m;
    a.mathRNG = f;
    a.whatwgRNG = e;
    var c = n.uuid;
    a.noConflict = function () {
        n.uuid = c;
        return a
    };
    n.uuid = a
}());
(function (c) {
    if (location.protocol === "file:") {
        alert("You cannot test a page using WebRTC through the file system due to browser permissions. You must run it over a web server.")
    }
    if (!c.URL && c.webkitURL) {
        c.URL = c.webkitURL
    }
    var a = 0,
        b, e = document.location.hash,
        f;
    var d = {
        initSession: function (g) {
            if (!this.sessions[g]) {
                this.sessions[g] = new d.Session(g)
            }
            return this.sessions[g]
        },
        initPublisher: function (j, g, h) {
            d.debug("TB.initPublisher(" + g + ")");
            var i = new d.rtc.Publisher();
            i.publish(g, h);
            return i
        },
        checkSystemRequirements: function () {
            d.debug("TB.checkSystemRequirements()");
            var g = d.$.supportsWebSockets() && d.$.supportsWebRTC() ? this.HAS_REQUIREMENTS : this.NOT_HAS_REQUIREMENTS;
            d.checkSystemRequirements = function () {
                d.debug("TB.checkSystemRequirements()");
                return g
            };
            return g
        },
        upgradeSystemRequirements: function () {
            d.onLoad(function () {
                var g = "_upgradeFlash";
                document.body.appendChild((function () {
                    var i = document.createElement("iframe");
                    i.id = g;
                    i.style.position = "absolute";
                    i.style.position = "fixed";
                    i.style.height = "100%";
                    i.style.width = "100%";
                    i.style.top = "0px";
                    i.style.left = "0px";
                    i.style.right = "0px";
                    i.style.bottom = "0px";
                    i.style.zIndex = 1000;
                    try {
                        i.style.backgroundColor = "rgba(0,0,0,0.2)"
                    } catch (h) {
                        i.style.backgroundColor = "transparent";
                        i.setAttribute("allowTransparency", "true")
                    }
                    i.setAttribute("frameBorder", "0");
                    i.frameBorder = "0";
                    i.scrolling = "no";
                    i.setAttribute("scrolling", "no");
                    i.src = d.BUILD_PROPERTIES.widgetURL + "/html/upgradeFlash.html#" + encodeURIComponent(document.location.href);
                    return i
                })());
                if (b) {
                    clearInterval(b)
                }
                b = setInterval(function () {
                    var i = document.location.hash,
                        h = /^#?\d+&/;
                    if (i !== e && h.test(i)) {
                        e = i;
                        if (i.replace(h, "") === "close_window") {
                            document.body.removeChild(document.getElementById(g));
                            document.location.hash = ""
                        }
                    }
                }, 100)
            })
        },
        reportIssue: function () {
            d.warn("ToDo: haven't yet implemented TB.reportIssue")
        },
        components: {},
        sessions: {},
        rtc: {},
        behaviours: {},
        APIKEY: (function () {
            var h = (function () {
                var i = document.getElementsByTagName("script");
                i = i[i.length - 1];
                i = i.getAttribute("src") || i.src;
                return i
            })();
            var g = h.match(/[\?\&]apikey=([^&]+)/i);
            return g ? g[1] : ""
        })(),
        HAS_REQUIREMENTS: 1,
        NOT_HAS_REQUIREMENTS: 0
    };
    d._ = _.noConflict();
    c.OT = d;
    c.TB = d
})(window);
OT.BUILD_PROPERTIES = {
    baseURL: "http://www.tokbox.com",
    apiURL: "http://anvil.opentok.com",
    messagingServer: "staging.tokbox.com",
    loggingURL: "http://hlg.tokbox.com/prod",
    widgetURL: "http://static.opentok.com/webrtc/v2.0.3",
    version: "v2.0.3",
    debug: false
};
if (true && window.location.protocol.indexOf("https") >= 0) {
    OT.BUILD_PROPERTIES.widgetURL = "https://swww.tokbox.com/webrtc/v2.0.3";
    OT.BUILD_PROPERTIES.loggingURL = "https://api.opentok.com/hl";
    OT.BUILD_PROPERTIES.apiURL = "https://anvil.opentok.com"
}
OT.BUILD_PROPERTIES.configURL = OT.BUILD_PROPERTIES.widgetURL + "/js/dynamic_config.min.js";
OT.BUILD_PROPERTIES.cssURL = OT.BUILD_PROPERTIES.widgetURL + "/css";
(function (b) {
    OT.$ = function (c) {
        return document.getElementById(c)
    };
    OT.$.noop = function () {};
    OT.$.supportsWebSockets = function () {
        return "WebSocket" in b
    };
    OT.$.now = (function () {
        var d = b.performance || {}, c = d.now || d.mozNow || d.msNow || d.oNow || d.webkitNow;
        if (c) {
            return c.bind(d)
        } else {
            return function () {
                return new Date().getTime()
            }
        }
    })();
    OT.$.browser = function () {
        var d = b.navigator.userAgent.toLowerCase(),
            e, c = "Unknown";
        if (d.indexOf("firefox") > -1) {
            c = "Firefox"
        }
        if (d.indexOf("opera") > -1) {
            c = "Opera"
        } else {
            if (d.indexOf("msie") > -1) {
                c = "IE"
            } else {
                if (d.indexOf("chrome") > -1) {
                    c = "Chrome"
                }
            }
        } if ((e = b.navigator.vendor) && e.toLowerCase().indexOf("apple") > -1) {
            c = "Safari"
        }
        d = null;
        OT.$.browser = function () {
            return c
        };
        return c
    };
    OT.$.moreInfoLink = function (d) {
        var e = d ? d.apiKey : OT.APIKEY,
            c = ["http://www.tokbox.com/opentok/info"];
        c[0] += "?guid=a80c00ad22a3e7dcee262f5f7c549c94c794d663";
        if (d) {
            c.push("session_id=" + d.id);
            if (d.connected) {
                c.push("connection_id=" + d.connection.id)
            }
        }
        c.push("partner_id=" + e);
        c.push("utm_source=" + e);
        c.push("utm_medium=" + OT.$.browser());
        if (OT.BUILD_PROPERTIES.widgetURL.indexOf("static") > -1) {
            c.push("utm_campaign=static")
        } else {
            c.push("utm_campaign=staging")
        }
        return c.join("&")
    };
    OT.$.deepClone = function (e) {
        if (!OT._.isObject(e)) {
            return e
        }
        var c = OT._.isArray(e) ? [] : {};
        for (var d in e) {
            if (!e.hasOwnProperty(d)) {
                continue
            }
            if (OT._.isObject(e[d])) {
                c[d] = this.deepClone(e[d])
            } else {
                c[d] = e[d]
            }
        }
        return c
    };
    OT.$.JSONify = (b.JSON && b.JSON.stringify) ? b.JSON.stringify : function (d) {
        var c = "{ ";
        for (var e in d) {
            if (typeof (d[e]) == "boolean") {
                c += '"' + e + '":' + d[e] + ", "
            } else {
                c += '"' + e + '":"' + d[e].toString() + '", '
            }
        }
        if (c.length > 1) {
            c = c.substring(0, c.length - 2) + " }"
        } else {
            c = "{}"
        }
        return c
    };
    OT.$.tbAlert = function (f, d) {
        var c = new OT.Modal(f, "<div>" + d + "</div>");
        OT.$.addClass(c.el, "OT_tbalert");
        var e = OT.$.createElement("input", {
            className: "OT_closeButton",
            type: "button",
            value: "close"
        });
        c.el.appendChild(e);
        e.onclick = function () {
            if (c) {
                c.close()
            }
            c = null
        }
    };
    OT.$.canDefineProperty = true;
    try {
        Object.defineProperty({}, "x", {})
    } catch (a) {
        OT.$.canDefineProperty = false
    }
    if (!Object.create) {
        Object.create = function (d) {
            if (arguments.length > 1) {
                throw new Error("Object.create implementation only accepts the first parameter.")
            }

            function c() {}
            c.prototype = d;
            return new c()
        }
    }
})(window);
(function (a) {
    OT.eventing = function (c) {
        var f = {};

        function b(h, g) {
            if (!h) {
                return
            }
            h.apply(null, g.slice())
        }

        function e(g, i, h, k) {
            if (!g || g.length === 0) {
                return
            }
            var j = g.length,
                m = j;
            OT._.forEach(g, function (o, n) {
                setTimeout(function () {
                    try {
                        o.apply(null, i)
                    } finally {
                        m--;
                        if (m === 0) {
                            b(k, i)
                        }
                    }
                }, 1)
            })
        }

        function d(g) {
            if (f[g]) {
                delete f[g]
            }
        }
        c.dispatchEvent = function (h, g) {
            if (!h.type) {
                OT.error("OT.Eventing.dispatchEvent: Event has no type");
                OT.error(h);
                throw new Error("OT.Eventing.dispatchEvent: Event has no type")
            }
            if (!h.target) {
                h.target = this
            }
            if (!f[h.type] || f[h.type].length === 0) {
                b(g, [h]);
                return
            }
            e(f[h.type], [h], h.type, g);
            return this
        };
        c.trigger = function (g) {
            if (!f[g] || f[g].length === 0) {
                return
            }
            var h = Array.prototype.slice.call(arguments);
            h.shift();
            e(f[g], h, g);
            return this
        };
        c.on = function (g, i) {
            if (typeof (g) === "string" && i) {
                this.addEventListener(g, i)
            } else {
                for (var h in g) {
                    if (g.hasOwnProperty(h)) {
                        this.addEventListener(h, g[h])
                    }
                }
            }
            return this
        };
        c.off = function (g, i) {
            if (typeof (g) === "string") {
                if (i) {
                    this.removeEventListener(g, i)
                } else {
                    d(g)
                }
            } else {
                for (var h in g) {
                    if (g.hasOwnProperty(h)) {
                        this.removeEventListener(h, g[h])
                    }
                }
            }
            return this
        };
        c.addEventListener = function (g, h) {
            if (!f[g]) {
                f[g] = []
            }
            f[g].push(h)
        };
        c.removeEventListener = function (g, h) {
            if (f[g]) {
                f[g] = OT._.without(f[g], h)
            }
        };
        return c
    };
    OT.eventing(OT)
})(window);
(function (a) {
    OT.Event = function (e, c) {
        this.type = e;
        this.cancelable = c !== undefined ? c : true;
        var d = false,
            b = null;
        this.preventDefault = function () {
            if (this.cancelable) {
                d = true
            } else {
                OT.warn("Event.preventDefault :: Trying to preventDefault on an Event that isn't cancelable")
            }
        };
        this.isDefaultPrevented = function () {
            return d
        };
        if (OT.$.canDefineProperty) {
            Object.defineProperty(this, "target", {
                set: function (f) {
                    b = f
                },
                get: function () {
                    return b
                }
            })
        }
    };
    OT.Event.names = {
        ACTIVE: "active",
        INACTIVE: "inactive",
        UNKNOWN: "unknown",
        PER_SESSION: "perSession",
        PER_STREAM: "perStream",
        EXCEPTION: "exception",
        ISSUE_REPORTED: "issueReported",
        SESSION_CONNECTED: "sessionConnected",
        SESSION_DISCONNECTED: "sessionDisconnected",
        STREAM_CREATED: "streamCreated",
        STREAM_DESTROYED: "streamDestroyed",
        CONNECTION_CREATED: "connectionCreated",
        CONNECTION_DESTROYED: "connectionDestroyed",
        SIGNAL_RECEIVED: "signalReceived",
        STREAM_PROPERTY_CHANGED: "streamPropertyChanged",
        MICROPHONE_LEVEL_CHANGED: "microphoneLevelChanged",
        ARCHIVE_CREATED: "archiveCreated",
        ARCHIVE_CLOSED: "archiveClosed",
        ARCHIVE_LOADED: "archiveLoaded",
        ARCHIVE_SAVED: "archiveSaved",
        SESSION_RECORDING_STARTED: "sessionRecordingStarted",
        SESSION_RECORDING_STOPPED: "sessionRecordingStopped",
        SESSION_RECORDING_IN_PROGRESS: "sessionRecordingInProgress",
        STREAM_RECORDING_IN_PROGRESS: "streamRecordingInProgress",
        SESSION_NOT_RECORDING: "sessionNotRecording",
        STREAM_NOT_RECORDING: "streamNotRecording",
        STREAM_RECORDING_STARTED: "streamRecordingStarted",
        STREAM_RECORDING_STOPPED: "streamRecordingStopped",
        PLAYBACK_STARTED: "playbackStarted",
        PLAYBACK_PAUSED: "playbackPaused",
        PLAYBACK_STOPPED: "playbackStopped",
        RECORDING_STARTED: "recordingStarted",
        RECORDING_STOPPED: "recordingStopped",
        RESIZE: "resize",
        SETTINGS_BUTTON_CLICK: "settingsButtonClick",
        DEVICE_INACTIVE: "deviceInactive",
        INVALID_DEVICE_NAME: "invalidDeviceName",
        ACCESS_ALLOWED: "accessAllowed",
        ACCESS_DENIED: "accessDenied",
        ACCESS_DIALOG_OPENED: "accessDialogOpened",
        ACCESS_DIALOG_CLOSED: "accessDialogClosed",
        ECHO_CANCELLATION_MODE_CHANGED: "echoCancellationModeChanged",
        DEVICES_DETECTED: "devicesDetected",
        DEVICES_SELECTED: "devicesSelected",
        CLOSE_BUTTON_CLICK: "closeButtonClick",
        MICLEVEL: "microphoneActivityLevel",
        MICGAINCHANGED: "microphoneGainChanged",
        DYNAMIC_CONFIG_CHANGED: "dynamicConfigChanged",
        DYNAMIC_CONFIG_LOAD_FAILED: "dynamicConfigLoadFailed",
        ENV_LOADED: "envLoaded"
    };
    OT.ValueEvent = function (b, c) {
        OT.Event.call(this, b);
        this.value = c
    };
    OT.ExceptionCodes = {
        JS_EXCEPTION: 2000,
        AUTHENTICATION_ERROR: 1004,
        INVALID_SESSION_ID: 1005,
        CONNECT_FAILED: 1006,
        CONNECT_REJECTED: 1007,
        CONNECTION_TIMEOUT: 1008,
        P2P_CONNECTION_FAILED: 1013,
        API_RESPONSE_FAILURE: 1014,
        UNABLE_TO_PUBLISH: 1500,
        UNABLE_TO_SIGNAL: 1510,
        UNABLE_TO_FORCE_DISCONNECT: 1520,
        UNABLE_TO_FORCE_UNPUBLISH: 1530
    };
    OT.ExceptionEvent = function (c, e, f, d, b) {
        OT.Event.call(this, c);
        this.message = e;
        this.title = f;
        this.code = d;
        this.component = b
    };
    OT.IssueReportedEvent = function (b, c) {
        OT.Event.call(this, b);
        this.issueId = c
    };
    OT.EnvLoadedEvent = function (b) {
        OT.Event.call(this, b)
    };
    OT.DynamicConfigChangedEvent = function (b) {
        OT.Event.call(this, b)
    };
    OT.DynamicConfigLoadFailedEvent = function (b) {
        OT.Event.call(this, b)
    };
    OT.ConnectionEvent = function (c, b, d) {
        OT.Event.call(this, c);
        this.connections = b;
        this.reason = d
    };
    OT.StreamEvent = function (c, e, d, b) {
        OT.Event.call(this, c, b);
        this.streams = e;
        this.reason = d
    };
    OT.SessionConnectEvent = function (d, c, e, b) {
        OT.Event.call(this, d);
        this.connections = c;
        this.streams = e;
        this.archives = b;
        this.groups = []
    };
    OT.SessionDisconnectEvent = function (c, d, b) {
        OT.Event.call(this, c, b);
        this.reason = d
    };
    OT.VolumeEvent = function (b, d, c) {
        OT.Event.call(this, b);
        this.streamId = d;
        this.volume = c
    };
    OT.DeviceEvent = function (c, b, d) {
        OT.Event.call(this, c);
        this.camera = b;
        this.microphone = d
    };
    OT.DeviceStatusEvent = function (e, b, d, c, f) {
        OT.Event.call(this, e);
        this.cameras = b;
        this.microphones = d;
        this.selectedCamera = c;
        this.selectedMicrophone = f
    };
    OT.ResizeEvent = function (c, d, b, f, e) {
        OT.Event.call(this, c);
        this.widthFrom = d;
        this.widthTo = b;
        this.heightFrom = f;
        this.heightTo = e
    };
    OT.StreamPropertyChangedEvent = function (c, e, f, b, d) {
        OT.Event.call(this, c);
        this.type = c;
        this.stream = e;
        this.changedProperty = f;
        this.oldValue = b;
        this.newValue = d
    };
    OT.ArchiveEvent = function (c, b) {
        OT.Event.call(this, c);
        this.archives = b
    };
    OT.ArchiveStreamEvent = function (c, b, d) {
        OT.Event.call(this, c);
        this.archive = b;
        this.streams = d
    };
    OT.StateChangedEvent = function (b, c) {
        OT.Event.call(this, b);
        this.changedValues = c
    };
    OT.ChangeFailedEvent = function (b, e, c, d) {
        OT.Event.call(this, b);
        this.reasonCode = e;
        this.reason = c;
        this.failedValues = d
    }
})(window);
(function (a) {
    OT.Config = (function () {
        var j = 4000,
            n = false,
            h = {}, c = {}, e, f = document.head || document.getElementsByTagName("head")[0],
            m, k = function () {
                if (m) {
                    clearTimeout(m);
                    m = null
                }
            }, b = function () {
                k();
                if (e) {
                    e.onload = e.onreadystatechange = null;
                    if (f && e.parentNode) {
                        f.removeChild(e)
                    }
                    e = undefined
                }
            }, d = function () {
                if (e.readyState && !/loaded|complete/.test(e.readyState)) {
                    return
                }
                k();
                if (!n) {
                    g._onLoadTimeout()
                }
            }, i = function (o, p) {
                if (p && c[p] && c[p][o]) {
                    return c[p][o]
                }
                return h[o]
            }, g = {
                load: function () {
                    n = false;
                    setTimeout(function () {
                        e = document.createElement("script");
                        e.async = "async";
                        e.src = OT.BUILD_PROPERTIES.configURL;
                        e.onload = e.onreadystatechange = OT._.bind(d, this);
                        f.appendChild(e)
                    }, 1);
                    m = setTimeout(function () {
                        g._onLoadTimeout()
                    }, j)
                },
                _onLoadTimeout: function () {
                    b();
                    OT.warn("TB DynamicConfig failed to load in " + j + " ms");
                    this.dispatchEvent(new OT.DynamicConfigLoadFailedEvent(OT.Event.names.DYNAMIC_CONFIG_LOAD_FAILED))
                },
                isLoaded: function () {
                    return n
                },
                reset: function () {
                    b();
                    n = false;
                    h = {};
                    c = {}
                },
                replaceWith: function (o) {
                    b();
                    if (!o) {
                        o = {}
                    }
                    h = o.global || {};
                    c = o.partners || {};
                    if (!n) {
                        n = true
                    }
                    this.dispatchEvent(new OT.DynamicConfigChangedEvent(OT.Event.names.DYNAMIC_CONFIG_CHANGED))
                },
                get: function (o, q, r) {
                    var p = i(o, r);
                    return p ? p[q] : null
                }
            };
        OT.eventing(g);
        return g
    })()
})(window);
(function (a) {
    OT.WebSocketMessageType = {
        CONNECTED_TO_WEBSOCKET_SERVER: 1000,
        CONNECT_TO_SESSION: 1001,
        SIGNAL: 1002,
        CONNECTION_CREATED: 1003,
        CONNECTION_DESTROYED: 1004,
        CONNECTION_COUNT_CHANGED: 1005,
        STREAM_CREATED: 1006,
        STREAM_MODIFIED: 1007,
        STREAM_DESTROYED: 1008,
        FORCE_DISCONNECT: 1009,
        FORCE_UNPUBLISH: 1010,
        JSEP_OFFER: 1011,
        JSEP_ANSWER: 1012,
        JSEP_PRANSWER: 1013,
        JSEP_CANDIDATE: 1014,
        JSEP_SUBSCRIBE: 1015,
        JSEP_UNSUBSCRIBE: 1016,
        WEBSOCKET_PING: 1017,
        WEBSOCKET_PONG: 1018,
        STREAM_REGISTERED: 1019,
        SESSION_CONNECT_FAILED: 1100,
        PUBLISH_FAILED: 1101,
        SUBSCRIBE_FAILED: 1102,
        FORCEDISCONNECT_FAILED: 1103,
        FORCEUNPUBLISH_FAILED: 1104
    }
})(window);
(function (a) {
    OT.WebSocketMessage = function (b, c) {
        this.type = b;
        this.payload = c;
        this.toString = function () {
            return JSON.stringify(this)
        }
    };
    OT.WebSocketMessage.connectToSessionMessage = function (f, e, c, d, b) {
        return {
            type: OT.WebSocketMessageType.CONNECT_TO_SESSION,
            payload: {
                sessionId: f,
                apiKey: e,
                token: c,
                supportsWebRTC: OT.$.supportsWebRTC(),
                connectionObjects: d,
                p2pEnabled: b
            }
        }
    };
    OT.WebSocketMessage.signalMessage = function (b, d, c) {
        return {
            type: OT.WebSocketMessageType.SIGNAL,
            payload: {
                fromAddress: b,
                toAddresses: d,
                messagePayload: c
            }
        }
    };
    OT.WebSocketMessage.createStream = function (g, b, k, c, j, i, f, d, h) {
        var e = {
            type: OT.WebSocketMessageType.STREAM_CREATED,
            payload: {
                publisherId: g,
                name: b,
				streamData: k,
                orientation: {
                    videoOrientation: c,
                    width: j,
                    height: i
                },
                hasAudio: f,
                hasVideo: d,
                p2pEnabled: h
            }
        };
        return e
    };
    OT.WebSocketMessage.modifyStream = function (e, b, d) {
        var c = {
            type: OT.WebSocketMessageType.STREAM_MODIFIED,
            payload: {
                streamId: e,
                key: b,
                value: d
            }
        };
        return c
    };
    OT.WebSocketMessage.destroyStream = function (b) {
        return {
            type: OT.WebSocketMessageType.STREAM_DESTROYED,
            payload: {
                streamId: b
            }
        }
    };
    OT.WebSocketMessage.jsepMessage = function (d, f, b, e) {
        e.fromAddress = d;
        e.toAddresses = f;
        var c = {
            type: b,
            payload: e
        };
        return c
    };
    OT.WebSocketMessage.forceDisconnect = function (b) {
        return {
            type: OT.WebSocketMessageType.FORCE_DISCONNECT,
            payload: {
                connectionId: b
            }
        }
    };
    OT.WebSocketMessage.forceUnpublish = function (b) {
        return {
            type: OT.WebSocketMessageType.FORCE_UNPUBLISH,
            payload: {
                streamId: b
            }
        }
    };
    OT.WebSocketMessage.pingMessage = function (c, b) {
        return {
            type: OT.WebSocketMessageType.WEBSOCKET_PING,
            payload: {
                message: b,
                timestamp: (+Date.now()).toString()
            }
        }
    };
    OT.WebSocketMessage.pongMessage = function (b, c) {
        return {
            type: OT.WebSocketMessageType.WEBSOCKET_PONG,
            payload: {
                message: b,
                timestamp: parseInt(c, 10)
            }
        }
    }
})(window);
(function (a) {
    OT.Messenger = function (n, C) {
        var b = {};
        b[OT.WebSocketMessageType.CONNECT_TO_SESSION] = {
            type: "SessionConnected",
            afterConnected: false
        };
        b[OT.WebSocketMessageType.SESSION_CONNECT_FAILED] = {
            type: "SessionConnectFailed",
            afterConnected: false
        };
        b[OT.WebSocketMessageType.CONNECTION_CREATED] = {
            type: "ConnectionCreated",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.CONNECTION_DESTROYED] = {
            type: "ConnectionDestroyed",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.STREAM_CREATED] = {
            type: "StreamCreated",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.STREAM_MODIFIED] = {
            type: "StreamModified",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.STREAM_DESTROYED] = {
            type: "StreamDestroyed",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.STREAM_REGISTERED] = {
            type: "StreamRegistered",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.JSEP_OFFER] = {
            type: "JSEPMessageReceived",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.JSEP_ANSWER] = {
            type: "JSEPMessageReceived",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.JSEP_PRANSWER] = {
            type: "JSEPMessageReceived",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.JSEP_CANDIDATE] = {
            type: "JSEPMessageReceived",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.JSEP_SUBSCRIBE] = {
            type: "JSEPMessageReceived",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.JSEP_UNSUBSCRIBE] = {
            type: "JSEPMessageReceived",
            afterConnected: true
        };
        b[OT.WebSocketMessageType.SIGNAL] = {
            type: "SignalReceived",
            afterConnected: true
        };
        var B = 8081;
        var c = 25000;
        var d = 3 * c - 100;
        OT.eventing(this);
        this.onSessionConnected = null;
        this.onConnectionClosed = null;
        this.webSocket = null;
        this.connectionId = null;
        var g, h, D, A, m, w = false,
            t = new OT.Analytics(),
            y = [],
            v = false,
            f = null;
        var e = function (F, G, I, E) {
            var H = {
                action: "webSocketConnection",
                variation: F,
                payload_type: G,
                payload: I,
                session_id: g,
                partner_id: D.partnerId,
                widget_id: D.widgetId,
                widget_type: "Controller"
            };
            if (E) {
                H = OT._.extend(E, H)
            }
            t.logEvent(H)
        };
        this.connect = function (H, E, F) {
            g = H;
            h = E;
            D = F;
            _webSocketUrl = "ws://" + n + ":" + B + "/rumorwebsockets";
            var G = [_webSocketUrl, navigator.userAgent, OT.BUILD_PROPERTIES.version];
            e("Attempt", "webSocketServerUrl|userAgent|sdkVersion", G.map(function (I) {
                return I.replace("|", "\\|")
            }).join("|"));
            this.webSocket = new WebSocket(_webSocketUrl);
            this.webSocket.onopen = s;
            this.webSocket.onclose = p;
            this.webSocket.onerror = z;
            this.webSocket.onmessage = k;
            A = setTimeout(function () {
                e("Failure", "reason", "Connection to the server timed out waiting to receive connected message.");
                q.trigger("exception", "Connection to the server timed out.", OT.ExceptionCodes.CONNECTION_TIMEOUT)
            }, 15000)
        };
        this.disconnect = function () {
            w = true;
            if (this.webSocket) {
                this.webSocket.close();
                this.webSocket = null
            }
        };
        this.sendMessage = function (E) {
            OT.warn("Sending WebSocket message: " + JSON.stringify(E));
            this.webSocket.send(JSON.stringify(E))
        };

        function s() {
            OT.debug("WebSocket connected");
            clearTimeout(A);
            A = setTimeout(function () {
                e("Failure", "reason", "Connection to the server timed out waiting to receive connected message.");
                q.trigger("exception", "Connection to the server timed out waiting to receive connected message.", OT.ExceptionCodes.CONNECTION_TIMEOUT)
            }, 15000)
        }

        function z() {
            q.trigger("exception", "TB.Socket Error :: The socket to " + n + " received an error.", OT.ExceptionCodes.CONNECT_FAILED)
        }

        function p() {
            clearTimeout(m);
            q.trigger("ConnectionClosed", {
                reason: w ? "clientDisconnected" : "networkDisconnected"
            })
        }

        function k(E) {
            OT.warn("WebSocket message recieved: " + E.data);
            x(E.data)
        }

        function x(G) {
            var E = JSON.parse(G);
            switch (E.type) {
            case OT.WebSocketMessageType.CONNECTED_TO_WEBSOCKET_SERVER:
                u(E.payload);
                break;
            case OT.WebSocketMessageType.WEBSOCKET_PONG:
                f = +Date.now();
                break;
            case OT.WebSocketMessageType.CONNECT_TO_SESSION:
                clearTimeout(A);
                v = true;
                o();
            default:
                if (b.hasOwnProperty(E.type)) {
                    var F = b[E.type].type;
                    OT.debug("Received " + F);
                    if (!v && b[E.type].afterConnected) {
                        j(G)
                    } else {
                        q.trigger(F, C.wrangle(E.payload))
                    }
                } else {
                    OT.debug("Message type " + E.type + " was not handled.")
                } if (E.type === OT.WebSocketMessageType.CONNECT_TO_SESSION) {
                    r()
                }
                break
            }
        }

        function j(E) {
            y.push(E)
        }

        function r() {
            while (y.length > 0) {
                x(y.shift())
            }
        }

        function i() {
            if (!f) {
                return false
            }
            return (+Date.now() - f) >= d
        }

        function o() {
            if (i()) {
                OT.error("We seem to have lost connectivity!");
                p()
            } else {
                q.sendMessage(OT.WebSocketMessage.pingMessage(q.connectionId, "ping!"));
                m = setTimeout(o, c)
            }
        }

        function u(E) {
            q.connectionId = E.connectionId;
            e("Success", "webSocketServerUrl", _webSocketUrl, {
                connectionId: E.connectionId
            });
            clearTimeout(A);
            A = setTimeout(function () {
                e("Failure", "reason", "Connection to the server timed out waiting to receive connected message.");
                q.trigger("exception", "Connection to the server timed out fetching the session state.", OT.ExceptionCodes.CONNECTION_TIMEOUT)
            }, 15000);
            q.sendMessage(OT.WebSocketMessage.connectToSessionMessage(g, OT.APIKEY, h, D.requireConnectionObjects, D.p2pEnabled))
        }
        var q = this
    }
})(window);
(function (g) {
    OT.DEBUG = 5;
    OT.LOG = 4;
    OT.INFO = 3;
    OT.WARN = 2;
    OT.ERROR = 1;
    OT.NONE = 0;
    var a = OT.NONE,
        c = [],
        h = g.console,
        e = false;
    if (h && typeof h.log == "object") {
        OT._.each(["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"], function (i) {
            h[i] = this.call(h[i], h)
        }, OT._.bind)
    }
    OT.log = function () {
        if (b(OT.LOG)) {
            if (h) {
                h.log.apply(h, arguments)
            }
            d("log", arguments)
        }
    };
    OT.debug = function () {
        if (b(OT.DEBUG)) {
            if (h) {
                h.log.apply(h, arguments)
            }
            d("debug", arguments)
        }
    };
    OT.info = function () {
        if (b(OT.INFO)) {
            if (h) {
                h.info.apply(h, arguments)
            }
            d("info", arguments)
        }
    };
    OT.warn = function () {
        if (b(OT.WARN)) {
            if (h) {
                h.warn.apply(h, arguments)
            }
            d("warn", arguments)
        }
    };
    OT.error = function () {
        if (b(OT.ERROR)) {
            if (h) {
                h.error.apply(h, arguments)
            }
            d("error", arguments)
        }
    };
    OT.setLogLevel = function (i) {
        a = typeof (i) === "number" ? i : 0;
        if (b(OT.DEBUG) && !e) {
            OT.debug("OpenTok JavaScript library " + OT.BUILD_PROPERTIES.version);
            OT.debug("Release notes: " + OT.BUILD_PROPERTIES.baseURL + "/opentok/api/tools/js_webrtc/documentation/overview/webrtc_release_notes.html");
            OT.debug("Known issues: " + OT.BUILD_PROPERTIES.baseURL + "/opentok/api/tools/js_webrtc/documentation/overview/webrtc_release_notes.html#knownIssues");
            e = true
        }
        OT.debug("TB.setLogLevel(" + a + ")");
        return a
    };
    OT.getLogs = function () {
        return c
    };

    function b(i) {
        return a >= i
    }

    function f() {
        var i = new Date();
        return i.toLocaleTimeString() + i.getMilliseconds()
    }

    function d(m, i) {
        if (!i) {
            return
        }
        var j;
        try {
            j = OT.$.JSONify(i)
        } catch (k) {
            j = i.toString()
        }
        if (j.length <= 2) {
            return
        }
        c.push([m, f(), j])
    }
    OT.setLogLevel(OT.BUILD_PROPERTIES.debug ? OT.DEBUG : OT.ERROR)
})(window);
(function (a) {
    OT.$.castToBoolean = function (c, b) {
        if (c === undefined) {
            return b
        }
        return c === "true" || c === true
    }
})(window);
(function (a) {
    OT.$.supportsClassList = function () {
        var b = typeof (document !== "undefined") && ("classList" in document.createElement("a"));
        OT.$.supportsClassList = function () {
            return b
        };
        return b
    };
    OT.$.removeElement = function (b) {
        if (b && b.parentNode) {
            b.parentNode.removeChild(b)
        }
    };
    OT.$.removeElementById = function (b) {
        this.removeElement(OT.$(b))
    };
    OT.$.removeElementsByType = function (b, c) {
        if (!b) {
            return
        }
        var d = b.getElementsByTagName(c);
        while (d.length) {
            b.removeChild(d[0])
        }
    };
    OT.$.emptyElement = function (b) {
        while (b.firstChild) {
            b.removeChild(b.firstChild)
        }
        return b
    };
    OT.$.createElement = function (h, b, g) {
        var e = document.createElement(h);
        for (var d in b) {
            if (typeof (b[d]) === "object") {
                if (!e[d]) {
                    e[d] = {}
                }
                var c = b[d];
                for (var f in c) {
                    e[d][f] = c[f]
                }
            } else {
                if (d === "className") {
                    e.className = b[d]
                } else {
                    e.setAttribute(d, b[d])
                }
            }
        }
        if (g) {
            e.innerHTML = g
        }
        return e
    };
    OT.$.createButton = function (f, b, e) {
        var d = OT.$.createElement("button", b, f);
        if (e) {
            for (var c in e) {
                if (e.hasOwnProperty(c)) {
                    OT.$.on(d, c, e[c])
                }
            }
            d._boundEvents = e
        }
        return d
    };
    OT.$.on = function (d, b, e) {
        if (d.addEventListener) {
            d.addEventListener(b, e, false)
        } else {
            if (d.attachEvent) {
                d.attachEvent("on" + b, e)
            } else {
                var c = d["on" + b];
                d["on" + b] = function () {
                    e.apply(this, arguments);
                    if (c) {
                        c.apply(this, arguments)
                    }
                }
            }
        }
    }
})(window);
(function (c) {
    OT.$.addClass = function (e, f) {
        if (e.nodeType !== 1) {
            return
        }
        var h = f.trim().split(/\s+/),
            d;
        if (OT.$.supportsClassList()) {
            for (d = 0, l = h.length; d < l; ++d) {
                e.classList.add(h[d])
            }
            return
        }
        if (!e.className && h.length === 1) {
            e.className = f
        } else {
            var g = " " + e.className + " ";
            for (d = 0, l = h.length; d < l; ++d) {
                if (!~g.indexOf(" " + h[d] + " ")) {
                    g += h[d] + " "
                }
            }
            e.className = g.trim()
        }
        return this
    };
    OT.$.removeClass = function (e, g) {
        if (!g) {
            return
        }
        if (e.nodeType !== 1) {
            return
        }
        var h = g.trim().split(/\s+/),
            d;
        if (OT.$.supportsClassList()) {
            for (d = 0, l = h.length; d < l; ++d) {
                e.classList.remove(h[d])
            }
            return
        }
        var f = (" " + e.className + " ").replace(/[\s+]/, " ");
        for (d = 0, l = h.length; d < l; ++d) {
            f = f.replace(" " + h[d] + " ", " ")
        }
        e.className = f.trim();
        return this
    };
    var a = function (d) {
        if (d.offsetWidth > 0) {
            return d.offsetWidth + "px"
        }
        return OT.$.css(d, "width")
    }, b = function (d) {
            if (d.offsetHeight > 0) {
                return d.offsetHeight + "px"
            }
            return OT.$.css(d, "height")
        };
    OT.$.width = function (d) {
        if (d.offsetWidth !== 0) {
            return a(d)
        } else {
            return OT.$.makeVisibleAndYield(d, function () {
                return a(d)
            })
        }
    };
    OT.$.height = function (d) {
        if (d.offsetHeight !== 0) {
            return b(d)
        } else {
            return OT.$.makeVisibleAndYield(d, function () {
                return b(d)
            })
        }
    };
    OT.$.centerElement = function (e, f, d) {
        if (!f) {
            f = parseInt(OT.$.width(e), 10)
        }
        if (!d) {
            d = parseInt(OT.$.height(e), 10)
        }
        var h = -0.5 * f + "px";
        var g = -0.5 * d + "px";
        OT.$.css(e, "margin", g + " 0 0 " + h);
        OT.$.addClass(e, "OT_centered")
    }
})(window);
(function (a) {
    var b = {};
    OT.$.show = function (c) {
        var d = c.style.display;
        if (d === "" || d === "none") {
            c.style.display = b[c] || "";
            delete b[c]
        }
        return this
    };
    OT.$.hide = function (c) {
        if (c.style.display === "none") {
            return
        }
        b[c] = OT.$.css(c, "display");
        c.style.display = "none";
        return this
    };
    OT.$.css = function (e, j, h) {
        if (typeof (j) !== "string") {
            var g = e.style;
            for (var i in j) {
                g[i] = j[i]
            }
            return this
        } else {
            if (h) {
                e.style[j] = h;
                return this
            } else {
                var d = j.replace(/([A-Z]|^ms)/g, "-$1").toLowerCase(),
                    c = e.ownerDocument.defaultView.getComputedStyle(e, null),
                    f = c.getPropertyValue(d);
                if (f === "") {
                    f = e.style[d]
                }
                return f
            }
        }
    };
    OT.$.applyCSS = function (e, g, h) {
        var f = {}, d, c;
        for (d in g) {
            if (g.hasOwnProperty(d)) {
                f[d] = OT.$.css(e, d);
                OT.$.css(e, d, g[d])
            }
        }
        c = h();
        for (d in g) {
            if (g.hasOwnProperty(d)) {
                OT.$.css(e, d, f[d])
            }
        }
        return c
    };
    OT.$.makeVisibleAndYield = function (c, d) {
        return OT.$.applyCSS(c, {
            display: "block",
            visibility: "hidden"
        }, d)
    }
})(window);
(function (b) {
    function a(c) {
        Object.defineProperty(c.prototype, "firstElementChild", {
            get: function () {
                var d = this;
                d = d.firstChild;
                while (d && d.nodeType != 1) {
                    d = d.nextSibling
                }
                return d
            }
        });
        Object.defineProperty(c.prototype, "lastElementChild", {
            get: function () {
                var d = this;
                d = d.lastChild;
                while (d && d.nodeType != 1) {
                    d = d.previousSibling
                }
                return d
            }
        });
        Object.defineProperty(c.prototype, "nextElementSibling", {
            get: function () {
                var d = this;
                while (d = d.nextSibling) {
                    if (d.nodeType == 1) {
                        break
                    }
                }
                return d
            }
        });
        Object.defineProperty(c.prototype, "previousElementSibling", {
            get: function () {
                var d = this;
                while (d = d.previousSibling) {
                    if (d.nodeType == 1) {
                        break
                    }
                }
                return d
            }
        })
    }
    OT.$.parseXML = function (e) {
        var c, d;
        if (b.DOMParser) {
            d = (new DOMParser()).parseFromString(e, "text/xml")
        } else {
            d = new ActiveXObject("Microsoft.XMLDOM");
            d.async = "false";
            d.loadXML(e);
            a(d)
        }
        c = d.documentElement;
        if (!c || !c.nodeName || c.nodeName === "parsererror") {
            return null
        }
        return d
    }
})(window);
(function (b) {
    function a(e, g) {
        if (typeof (e) === "string") {
            return e
        }
        var f = [];
        for (var d in e) {
            f.push(encodeURIComponent(d) + "=" + encodeURIComponent(e[d]))
        }
        return f.join("&").replace(/\+/g, "%20")
    }
    OT.$.getXML = function (f, e) {
        var g = e && e.success,
            h = function (k) {
                var j;
                if (!k) {
                    return false
                }
                j = k.documentElement;
                if (!j || !j.nodeName || j.nodeName === "parsererror") {
                    return false
                }
                return true
            }, i = function (m) {
                var k = m.target.responseXML,
                    j;
                if (h(k)) {
                    if (g) {
                        g(k, m, m.target)
                    }
                } else {
                    if (e && e.error) {
                        e.error(m, m.target)
                    }
                }
            };
        var d = OT._.extend(e.headers || {}, {
            "Content-Type": "application/xml"
        });
        OT.$.get(f, OT._.extend(e || {}, {
            success: i,
            headers: d
        }))
    };
    OT.$.getJSON = function (e, d) {
        var f = d && d.success,
            g = function (i) {
                var h;
                try {
                    h = JSON.parse(i.target.responseText)
                } catch (j) {
                    if (d && d.error) {
                        d.error(i, i.target)
                    }
                    return
                }
                if (f) {
                    f(h, i, i.target)
                }
            };
        OT.$.get(e, OT._.extend(d || {}, {
            success: g,
            headers: {
                "Content-Type": "application/json"
            }
        }))
    };
    OT.$.get = function (g, f) {
        var h = new XMLHttpRequest(),
            d = f || {};
        c(h, d.success, d.error);
        if (d.process) {
            h.addEventListener("progress", d.progress, false)
        }
        if (d.cancelled) {
            h.addEventListener("abort", d.cancelled, false)
        }
        h.open("GET", g, true);
        if (!d.headers) {
            d.headers = {}
        }
        for (var e in d.headers) {
            h.setRequestHeader(e, d.headers[e])
        }
        h.send()
    };
    OT.$.post = function (g, f) {
        var h = new XMLHttpRequest(),
            d = f || {};
        c(h, d.success, d.error);
        if (d.process) {
            h.addEventListener("progress", d.progress, false)
        }
        if (d.cancelled) {
            h.addEventListener("abort", d.cancelled, false)
        }
        h.open("POST", g, true);
        if (!d.headers) {
            d.headers = {}
        }
        for (var e in d.headers) {
            h.setRequestHeader(e, d.headers[e])
        }
        h.send(a(d.data))
    };
    OT.$.postFormData = function (e, g, d) {
        if (!g) {
            throw new Error("OT.$.postFormData must be passed a data options.")
        }
        var h = new FormData();
        for (var f in g) {
            h.append(f, g[f])
        }
        OT.$.post(e, OT._.extend(d || {}, {
            data: h
        }))
    };
    OT.$.getJSONP = function (e, q) {
        var n = 30000,
            h, j = document.head || document.getElementsByTagName("head")[0],
            m, i = e,
            p = OT._.extend(q || {}, {
                callbackParameter: "callback"
            }),
            o = function () {
                if (m) {
                    clearTimeout(m);
                    m = null
                }
            }, d = function () {
                o();
                if (h) {
                    h.onload = h.onreadystatechange = null;
                    OT.$.removeElement(h);
                    h = undefined
                }
            }, f = function () {
                if (h.readyState && !/loaded|complete/.test(h.readyState)) {
                    return
                }
                o()
            }, g = function () {
                d();
                OT.error("The JSONP request to " + i + " timed out after " + n + "ms.");
                if (p.error) {
                    p.error("The JSONP request to " + e + " timed out after " + n + "ms.", i, p)
                }
            }, k = function () {
                return "jsonp_callback_" + (+new Date())
            };
        p.callbackName = k();
        this.jsonp_callbacks[p.callbackName] = function (r) {
            d();
            if (p.success) {
                p.success(r)
            }
        };
        i += ((/\?/).test(i) ? "&" : "?") + p.callbackParameter + "=" + p.callbackName;
        h = OT.$.createElement("script", {
            async: "async",
            src: i,
            onload: f,
            onreadystatechange: f
        });
        j.appendChild(h);
        m = setTimeout(function () {
            _this._onLoadTimeout()
        }, n)
    };
    var c = function (e, f, d) {
        e.addEventListener("load", function (h) {
            var g = h.target.status;
            if (g >= 200 && g < 300 || g === 304) {
                if (f) {
                    f.apply(null, arguments)
                }
            } else {
                if (d) {
                    d(h)
                }
            }
        }, false);
        if (d) {
            e.addEventListener("error", d, false)
        }
    }
})(window);
(function (b) {
    var a = 4 / 3;

    function c(f, h, d) {
        if (!h) {
            h = parseInt(OT.$.width(f.parentNode), 10)
        } else {
            h = parseInt(h, 10)
        } if (!d) {
            d = parseInt(OT.$.height(f.parentNode), 10)
        } else {
            d = parseInt(d, 10)
        }
        var j = (h + 0) / d,
            i, e, g, k;
        if (a == j) {
            e = i = "100%"
        } else {
            if (j > a) {
                i = "100";
                e = (j / a) * 100;
                k = (e - 100) / 2;
                g = 0
            } else {
                e = "100%";
                i = (a / j) * 100;
                g = (i - 100) / 2;
                k = 0
            }
        }
        OT.$.css(f, {
            width: i + "%",
            height: e + "%",
            marginLeft: "-" + g + "%",
            marginTop: "-" + k + "%"
        })
    }
    OT.$.getOrCreateWidgetContainerById = function (g, e) {
        var d = OT.$(g),
            f = document.createElement("div");
        if (!d) {
            d = OT.$.createElement("div", {
                id: g
            });
            d.style.backgroundColor = "#000000";
            document.body.appendChild(d)
        } else {
            OT.$.emptyElement(d)
        } if (e) {
            width = e.width;
            height = e.height;
            if (width) {
                if (typeof (width) == "number") {
                    width = width + "px"
                }
            }
            if (height) {
                if (typeof (height) == "number") {
                    height = height + "px"
                }
            }
            d.style.width = width ? width : "264px";
            d.style.height = height ? height : "198px";
            d.style.overflow = "hidden";
            if (e.mirror === undefined || e.mirror) {
                OT.$.addClass(d, "OT_mirrored")
            }
        }
        if (e.classNames) {
            OT.$.addClass(d, e.classNames)
        }
        OT.$.addClass(f, "OT_video-container");
        f.style.width = d.style.width;
        f.style.height = d.style.height;
        d.appendChild(f);
        c(f, d.offsetWidth, d.offsetHeight);
        d.videoContainer = f;
        //TODO 莫名弹出一个视频框
//        if(d.style.width != '450px' && d.style.width != '300px') {
//            d.style.display = 'none';
//        }
        return d
    }
})(window);
(function (a) {
    var b = (function () {
        if (navigator.getUserMedia) {
            return navigator.getUserMedia.bind(navigator)
        } else {
            if (navigator.mozGetUserMedia) {
                return navigator.mozGetUserMedia.bind(navigator)
            } else {
                if (navigator.webkitGetUserMedia) {
                    return navigator.webkitGetUserMedia.bind(navigator)
                }
            }
        }
    })();
    if (navigator.webkitGetUserMedia) {
        if (!webkitMediaStream.prototype.getVideoTracks) {
            webkitMediaStream.prototype.getVideoTracks = function () {
                return this.videoTracks
            }
        }
        if (!webkitMediaStream.prototype.getAudioTracks) {
            webkitMediaStream.prototype.getAudioTracks = function () {
                return this.audioTracks
            }
        }
        if (!webkitRTCPeerConnection.prototype.getLocalStreams) {
            webkitRTCPeerConnection.prototype.getLocalStreams = function () {
                return this.localStreams
            }
        }
        if (!webkitRTCPeerConnection.prototype.getRemoteStreams) {
            webkitRTCPeerConnection.prototype.getRemoteStreams = function () {
                return this.remoteStreams
            }
        }
    } else {
        if (navigator.mozGetUserMedia) {
            if (!MediaStream.prototype.getVideoTracks) {
                MediaStream.prototype.getVideoTracks = function () {
                    return []
                }
            }
            if (!MediaStream.prototype.getAudioTracks) {
                MediaStream.prototype.getAudioTracks = function () {
                    return []
                }
            }
        }
    }
    OT.$.supportsWebRTC = function () {
        var c = false;
        if (navigator.webkitGetUserMedia) {
            c = typeof (webkitRTCPeerConnection) === "function" && !! webkitRTCPeerConnection.prototype.addStream
        } else {
            if (navigator.mozGetUserMedia) {
                var d = a.navigator.userAgent.toLowerCase().match(/Firefox\/([0-9\.]+)/i);
                c = typeof (mozRTCPeerConnection) === "function" && (d !== null && parseFloat(d[1], 10) > 20)
            }
        }
        OT.$.supportsWebRTC = function () {
            return c
        };
        return c
    };
    OT.$.supportedCryptoScheme = function () {
        if (!OT.$.supportsWebRTC()) {
            return "NONE"
        }
        var c = a.navigator.userAgent.toLowerCase().match(/chrome\/([0-9\.]+)/i);
        return c && parseFloat(c[1], 10) < 25 ? "SDES_SRTP" : "DTLS_SRTP"
    };
    OT.$.getUserMedia = function (i, n, f, d, c) {
        if (!i || OT._.all(i, function (e) {
            return e === false
        })) {
            OT.error("Couldn't get UserMedia: All constraints were false");
            f({
                code: "NO_CONSTRAINTS"
            });
            return
        }
        var g = null,
            h = function () {
                if (g) {
                    clearTimeout(g)
                } else {
                    if (c) {
                        c()
                    }
                }
            }, o = function () {
                g = null;
                if (d) {
                    d()
                }
            }, m = function () {
                h();
                n.apply(null, arguments)
            }, j = function (e) {
                h();
                f.apply(null, arguments)
            };
        try {
            b(i, m, j)
        } catch (k) {
            OT.error("Couldn't get UserMedia: " + k.toString());
            j({})
        }
        if (location.protocol.indexOf("https") === -1) {
            setTimeout(o, 100)
        } else {
            g = setTimeout(o, 500)
        }
    }
})(window);
(function (a) {
    OT.Modal = function (e, b, d) {
        var c = "        <header>            <h1><%= title %></h1>        </header>        <div class='OT_dialog-body'>            <%= body %>        </div>    ";
        this.el = OT.$.createElement("section", {
            className: "OT_root OT_dialog OT_modal"
        }, OT._.template(c, {
            title: e,
            body: b
        }));
        this.el.style.display = "none";
        document.body.appendChild(this.el);
        OT.$.centerElement(this.el);
        OT.$.show(this.el);
        this.close = function () {
            OT.$.removeElement(this.el);
            this.el = null;
            return this
        }
    }
})(window);
(function (c) {
    function b() {
        var d = false,
            f = false,
            i = function () {
                return f && d
            }, g = function () {
                if (i()) {
                    OT.dispatchEvent(new OT.EnvLoadedEvent(OT.Event.names.ENV_LOADED))
                }
            }, j = function () {
                f = true;
                OT.Config.load();
                g()
            }, e = function () {
                d = true;
                OT.Config.off(OT.Event.names.DYNAMIC_CONFIG_CHANGED, e);
                OT.Config.off(OT.Event.names.DYNAMIC_CONFIG_LOAD_FAILED, h);
                g()
            }, h = function () {
                e()
            };
        OT.Config.on(OT.Event.names.DYNAMIC_CONFIG_CHANGED, e);
        OT.Config.on(OT.Event.names.DYNAMIC_CONFIG_LOAD_FAILED, h);
        if (document.readyState == "complete" || (document.readyState == "interactive" && document.body)) {
            j()
        } else {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", j, false)
            } else {
                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", function () {
                        if (document.readyState == "complete") {
                            j()
                        }
                    })
                }
            }
        }
        this.onLoad = function (k) {
            if (i()) {
                k();
                return
            }
            OT.on(OT.Event.names.ENV_LOADED, k)
        }
    }
    var a = new b();
    OT.onLoad = function (d, e) {
        if (!e) {
            a.onLoad(d)
        } else {
            a.onLoad(OT._.bind(d, e))
        }
    }
})(window);
(function (d) {
    var c = {
        1000: "Failed To Load",
        1004: "Authentication error",
        1005: "Invalid Session ID",
        1006: "Connect Failed",
        1007: "Connect Rejected",
        1008: "Connect Time-out",
        1009: "Security Error",
        1010: "Not Connected",
        1011: "Invalid Parameter",
        1012: "Peer-to-peer Stream Play Failed",
        1013: "Peer-to-peer Connection Failed",
        1014: "API Response Failure",
        1500: "Unable to Publish",
        1510: "Unable to Signal",
        1520: "Unable to Force Disconnect",
        1530: "Unable to Force Unpublish",
        1540: "Unable to record archive",
        1550: "Unable to play back archive",
        1560: "Unable to create archive",
        1570: "Unable to load archive",
        2000: "Internal Error",
        2001: "Embed Failed",
        3000: "Archive load exception",
        3001: "Archive create exception",
        3002: "Playback stop exception",
        3003: "Playback start exception",
        3004: "Record start exception",
        3005: "Record stop exception",
        3006: "Archive load exception",
        3007: "Session recording in progress",
        3008: "Archive recording internal failure",
        4000: "WebSocket Connection Failed",
        4001: "WebSocket Network Disconnected"
    };
    var b;

    function a(e, k, i, f) {
        var j = c[i],
            g = f ? OT._.clone(f) : {};
        OT.error("TB.exception :: title: " + j + " (" + i + ") msg: " + k);
        if (!g.partnerId) {
            g.partnerId = OT.APIKEY
        }
        try {
            if (!b) {
                b = new OT.Analytics()
            }
            b.logError(i, "tb.exception", j, {
                details: k
            }, g);
            OT.dispatchEvent(new OT.ExceptionEvent(OT.Event.names.EXCEPTION, k, j, i, e))
        } catch (h) {
            OT.error("TB.exception :: Failed to dispatch exception - " + h.toString())
        }
    }
    OT.handleJsException = function (h, g, e) {
        if (e && !e.target) {
            e.target = null
        }
        var f, i = e.session;
        if (i) {
            f = {
                sessionId: i.sessionId
            };
            if (i.connected) {
                f.connectionId = i.connection.connectionId
            }
        } else {
            if (e.sessionId) {
                f = {
                    sessionId: e.sessionId
                }
            }
        }
        a(e.target, h, g, f)
    };
    OT.exceptionHandler = function (f, j, e, i, g) {
        var h;
        if (f) {
            h = OT.components[f];
            if (!h) {
                OT.warn("Could not find the component with component ID " + f)
            }
        }
        a(h, j, i, g)
    }
})(window);
(function (a) {
    OT.ConnectionCapabilities = function (d) {
        var b = function (e) {
            e.supportsWebRTC = OT.$.castToBoolean(e.supportsWebRTC);
            return e
        };
        var c = b(d);
        this.supportsWebRTC = c.supportsWebRTC
    }
})(window);
(function (a) {
    OT.Connection = function (e, b, d, c) {
        this.id = this.connectionId = e;
        this.creationTime = Number(b);
        this.data = d;
        this.capabilities = new OT.ConnectionCapabilities(c);
        this.quality = null;
        OT.eventing(this)
    }
})(window);
(function (a) {
    OT.Stream = function (e, f, b, j, n, k, m, h, d, i, g, o, c, p) {
        this.id = this.streamId = e;
        this.sessionId = i;
        this.connection = f;
        this.name = b;
        this.data = j;
        this.type = n || "basic";
        this.creationTime = Number(k);
        this.hasAudio = OT.$.castToBoolean(m, true);
        this.hasVideo = OT.$.castToBoolean(h, true);
        this.orientation = d;
        this.peerId = g;
        this.quality = o;
        this.videoDimensions = {
            width: c,
            height: p
        };
        OT.eventing(this);
        this.update = function (q, r) {
            switch (q) {
            case "hasAudio":
            case "hasVideo":
                this[q] = OT.$.castToBoolean(r, true);
                break;
            case "quality":
            case "name":
            case "videoDimensions":
            case "orientation":
                this[q] = r
            }
        };
        this.startRecording = function (q) {
            OT.debug("OT.Stream.startRecording");
            throw new Error("OT.Stream.startRecording: Is not implemented yet.")
        };
        this.stopRecording = function (q) {
            OT.debug("OT.Stream.stopRecording");
            throw new Error("OT.Stream.stopRecording: Is not implemented yet.")
        }
    }
})(window);
(function (a) {
    OT.DOMComponentCleanup = (function () {
        var e = {}, d = {};
        var c = function (f) {
            OT.$.on(f, "unload", function () {
                return b(f)
            })
        }, b = function (f) {
                if (!d[f] || d[f].length === 0) {
                    return
                }
                d[f].slice().forEach(function (g) {
                    g.destroy()
                });
                delete d[f]
            };
        return {
            add: function (f) {
                if (f.targetElement && f.id) {
                    var g = f.targetElement.ownerDocument.defaultView;
                    e[f.id] = g;
                    if (!d.hasOwnProperty(g)) {
                        d[g] = [];
                        c(g)
                    }
                    d[g].push(f)
                }
            },
            remove: function (g) {
                if (!g.id || !e[g.id]) {
                    return
                }
                var h = e[g.id],
                    f;
                if ((f = OT._.indexOf(d[h], g)) != -1) {
                    d[h].splice(f, 1)
                }
            }
        }
    })()
})(window);
(function (c) {
    OT.VideoOrientation = {
        ROTATED_NORMAL: "OTVideoOrientationRotatedNormal",
        ROTATED_LEFT: "OTVideoOrientationRotatedLeft",
        ROTATED_RIGHT: "OTVideoOrientationRotatedRight",
        ROTATED_UPSIDE_DOWN: "OTVideoOrientationRotatedUpsideDown"
    };
    OT.rtc.VideoElement = function (p) {
        var i, n, j, g = false,
            o = OT._.defaults(p || {}, {
                fallbackText: "Sorry, Web RTC is not available in your browser"
            });
        OT.eventing(this);
        var k = OT._.bind(function (q) {
            var r = "There was an unexpected problem with the Video Stream: " + b(q.target.error.code);
            this.trigger("error", null, r, this)
        }, this),
            h = OT._.bind(function () {
                g = true;
                this.trigger("streamBound", this)
            }, this),
            m = OT._.bind(function (q) {
                this.trigger("error", OT.ExceptionCodes.P2P_CONNECTION_FAILED, q, this)
            }, this);
        n = d(o.fallbackText, o.attributes);
        n.addEventListener("error", k, false);
        Object.defineProperties(this, {
            stream: {
                get: function () {
                    return i
                }
            },
            domElement: {
                get: function () {
                    return n
                }
            },
            parentElement: {
                get: function () {
                    return j
                }
            },
            isBoundToStream: {
                get: function () {
                    return g
                }
            }
        });
        this.appendTo = function (q) {
            j = q;
            j.appendChild(n);
            return this
        };
        this.bindToStream = function (q) {
            g = false;
            i = q;
            a(n, i, h, m);
            return this
        };
        this.unbindStream = function () {
            if (!i) {
                return
            }
            if (n) {
                if (!navigator.mozGetUserMedia) {
                    c.URL.revokeObjectURL(n.src)
                } else {
                    n.mozSrcObject = null
                }
            }
            i = null;
            return this
        };
        this.destroy = function () {
            this.unbindStream();
            if (n) {
                OT.$.removeElement(n);
                n = null
            }
            j = null;
            return undefined
        }
    };
    if (OT.$.canDefineProperty) {
        Object.defineProperty(OT.rtc.VideoElement.prototype, "imgData", {
            get: function () {
                var g = OT.$.createElement("canvas", {
                    width: this.domElement.videoWidth,
                    height: this.domElement.videoHeight,
                    style: {
                        display: "none"
                    }
                });
                document.body.appendChild(g);
                g.getContext("2d").drawImage(this.domElement, 0, 0, g.width, g.height);
                var h = g.toDataURL("image/png");
                OT.$.removeElement(g);
                return h.replace("data:image/png;base64,", "").trim()
            }
        })
    }
    var f = {
        OTVideoOrientationRotatedNormal: "rotate(0deg)",
        OTVideoOrientationRotatedLeft: "rotate(90deg)",
        OTVideoOrientationRotatedRight: "rotate(-90deg)",
        OTVideoOrientationRotatedUpsideDown: "rotate(180deg)"
    };
    if (OT.$.canDefineProperty) {
        Object.defineProperty(OT.rtc.VideoElement.prototype, "orientation", {
            set: function (g) {
                var h = f[g] || f.ROTATED_NORMAL;
                switch (OT.$.browser()) {
                case "Chrome":
                case "Safari":
                    this.domElement.style.webkitTransform = h;
                    break;
                case "IE":
                    this.domElement.style.msTransform = h;
                    break;
                default:
                    this.domElement.style.transform = h
                }
            }
        })
    }

    function d(j, g) {
        var i = document.createElement("video");
        i.setAttribute("autoplay", "");
        i.innerHTML = j;
        if (g) {
            if (g.muted === true) {
                delete g.muted;
                i.muted = "true"
            }
            for (var h in g) {
                i.setAttribute(h, g[h])
            }
        }
        return i
    }
    var e = {};
    if (c.MediaError) {
        e[c.MediaError.MEDIA_ERR_ABORTED] = "The fetching process for the media resource was aborted by the user agent at the user's request.";
        e[c.MediaError.MEDIA_ERR_NETWORK] = "A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.";
        e[c.MediaError.MEDIA_ERR_DECODE] = "An error of some description occurred while decoding the media resource, after the resource was established to be usable.";
        e[c.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED] = "The media resource indicated by the src attribute was not suitable. "
    }

    function b(g) {
        return e[parseInt(g, 10)] || "An unknown error occurred."
    }

    function a(m, g, j, o) {
        if (navigator.mozGetUserMedia) {
            m.mozSrcObject = g
        } else {
            m.src = c.URL.createObjectURL(g)
        }
        m.play();
        var i = 150,
            h = 0,
            n;

        function k() {
            h++;
            if ((!navigator.mozGetUserMedia && g.getVideoTracks().length === 0 && g.getAudioTracks().length === 0) || m.currentTime > 0) {
                j()
            } else {
                if (h < i) {
                    n = setTimeout(k, 200)
                } else {
                    o("The video stream failed to connect. Please notify the site owner if this continues to happen.")
                }
            }
        }
        k()
    }
})(window);
(function (f) {
    var g = (f.webkitRTCPeerConnection || f.mozRTCPeerConnection);
    var e = (f.mozRTCSessionDescription || f.RTCSessionDescription);
    var d = (f.mozRTCIceCandidate || f.RTCIceCandidate);
    var c = function (i, j) {
        return function (k) {
            OT.debug("IceCandidateForwarder: Ice Candidate");
            if (k.candidate) {
                i(OT.WebSocketMessageType.JSEP_CANDIDATE, {
                    candidate: k.candidate
                })
            } else {
                OT.debug("IceCandidateForwarder: No more ICE candidates. PeerConnection Status: " + k.srcElement.readyState + ", Ice Status: " + k.srcElement.iceState);
                j()
            }
        }
    };
    var a = function () {
        var j = [],
            i = null;
        Object.defineProperty(this, "peerConnection", {
            set: function (k) {
                i = k
            }
        });
        this.process = function (m) {
            var k = new d(m.candidate);
            if (i) {
                i.addIceCandidate(k)
            } else {
                j.push(k)
            }
        };
        this.processPending = function () {
            while (j.length) {
                i.addIceCandidate(j.shift())
            }
        }
    };
    var b = function (i, o, p, j) {
        var n = function (r) {
            return function (s) {
                if (j) {
                    j(r, s)
                }
            }
        }, m = function (r) {
                i.setLocalDescription(r, function () {
                    p(r)
                }, n("Error while setting LocalDescription"))
            }, k = function (r) {
                i.createAnswer(m, n("Error while setting createAnswer"), null, false)
            };
        if (o.sdp.indexOf("a=crypto") === -1) {
            var q = "a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:FakeFakeFakeFakeFakeFakeFakeFakeFakeFake\\r\\n";
            o.sdp = o.sdp.replace(/^c=IN(.*)$/gmi, "c=IN$1\r\n" + q)
        }
        i.setRemoteDescription(o, k, n("Error while setting RemoteDescription"))
    };
    var h = function (i, n, j) {
        var o = {
            mandatory: {},
            optional: []
        }, m = function (p) {
                return function (q) {
                    if (j) {
                        j(p, q)
                    }
                }
            }, k = function (p) {
                i.setLocalDescription(p, function () {
                    n(p)
                }, m("Error while setting LocalDescription"))
            };
        if (navigator.mozGetUserMedia) {
            o.mandatory.MozDontOfferDataChannel = true
        }
        i.createOffer(k, m("Error while creating Offer"), o)
    };
    OT.rtc.PeerConnection = function (C) {
        var n, j = new a(),
            t, E, y = "new",
            r = false,
            x = [];
        OT.eventing(this);
        if (navigator.mozGetUserMedia) {
            C.iceServers = []
        }
        var z = OT._.bind(function (F, G) {
            if (x.length) {
                x[0](F, G)
            }
        }, this),
            w = function () {
                if (r && y === "stable") {
                    this.trigger("open")
                }
            }, u = OT._.bind(function () {
                if (!n) {
                    try {
                        OT.debug('Creating peer connection config "' + JSON.stringify(C) + '".');
                        n = new g(C, {
                            optional: [{
                                DtlsSrtpKeyAgreement: true
                            }]
                        })
                    } catch (F) {
                        OT.error("Failed to create PeerConnection, exception: " + F.message);
                        return null
                    }
                    j.peerConnection = n;
                    n.onicecandidate = c(z, OT._.bind(function () {
                        r = true;
                        w.call(this)
                    }, this));
                    n.onaddstream = OT._.bind(D, this);
                    n.onremovestream = OT._.bind(o, this);
                    n.onstatechange = OT._.bind(m, this)
                }
                return n
            }, this),
            m = function (F) {
                if (F.target.readyState.toLowerCase() !== y) {
                    y = F.target.readyState.toLowerCase();
                    OT.debug("PeerConnection.stateChange: " + y);
                    switch (y) {
                    case "new":
                        break;
                    case "open":
                    case "active":
                    case "stable":
                        y = "stable";
                        w.call(this);
                        break;
                    case "closed":
                        if (j) {
                            j.peerConnection = null
                        }
                        n = null;
                        this.trigger("close");
                        break
                    }
                }
            }, q = function () {
                var F;
                if (n.getLocalStreams) {
                    F = n.getLocalStreams()
                } else {
                    if (n.localStreams) {
                        F = n.localStreams
                    } else {
                        throw new Error("Invalid Peer Connection object implements no method for retrieving local streams")
                    }
                }
                return Array.prototype.slice.call(F)
            }, v = function () {
                var F;
                if (n.getRemoteStreams) {
                    F = n.getRemoteStreams()
                } else {
                    if (n.remoteStreams) {
                        F = n.remoteStreams
                    } else {
                        throw new Error("Invalid Peer Connection object implements no method for retrieving remote streams")
                    }
                }
                return Array.prototype.slice.call(F)
            }, p = function (G, F) {
                return OT._.bind(function (H) {
                    i.call(this, "PeerConnection." + G + ": " + F + ": " + H)
                }, this)
            }, D = function (G) {
                var F = (G.type === "audio" || G.type === "video") ? G.type : "merged";
                this.trigger("streamAdded", G.stream, F)
            }, o = function (G) {
                var F = (G.type === "audio" || G.type === "video") ? G.type : "merged";
                this.trigger("streamRemoved", G.stream, F)
            }, B = function (G, F) {
                z(G, {
                    sdp: F
                })
            }, s = function (H) {
                var G = new e(H.sdp),
                    F = function (J) {
                        B(OT.WebSocketMessageType.JSEP_ANSWER, J)
                    }, I = function (K, J) {
                        i("PeerConnection.offerProcessor " + K + ": " + J)
                    };
                u();
                _remoteDescriptionType = G.type;
                _remoteDescription = G;
                b(n, G, F, I)
            }, A = function (F) {
                if (!F.sdp) {
                    OT.error("PeerConnection.processMessage: Weird message, no SDP.");
                    return
                }
                E = new e(F.sdp);
                _remoteDescriptionType = E.type;
                _remoteDescription = E;
                n.setRemoteDescription(E);
                j.processPending()
            }, k = function (F) {
                OT.debug("PeerConnection.processSubscribe: Sending offer to subscriber.");
                u();
                h(n, function (G) {
                    t = G;
                    B(OT.WebSocketMessageType.JSEP_OFFER, t)
                }, function (H, G) {
                    i("PeerConnection.suscribeProcessor " + H + ": " + G)
                })
            }, i = OT._.bind(function (F) {
                OT.error(F);
                this.trigger("error", F)
            }, this);
        this.addLocalStream = function (F) {
            u();
            n.addStream(F)
        };
        this.disconnect = function () {
            j = null;
            if (n) {
                if (n.readyState.toLowerCase() !== "closed") {
                    n.close()
                }
                n = null
            }
        };
        this.processMessage = function (F, G) {
            OT.debug("PeerConnection.processMessage: Received " + F + " from " + G.fromAddress);
            OT.debug(G);
            switch (F) {
            case OT.WebSocketMessageType.JSEP_SUBSCRIBE:
                k.call(this, G);
                break;
            case OT.WebSocketMessageType.JSEP_OFFER:
                s.call(this, G);
                break;
            case OT.WebSocketMessageType.JSEP_ANSWER:
                A.call(this, G);
                break;
            case OT.WebSocketMessageType.JSEP_CANDIDATE:
                j.process(G);
                break;
            default:
                OT.debug("PeerConnection.processMessage: Received an unexpected message of type " + F + " from " + G.fromAddress + ": " + JSON.stringify(G))
            }
            return this
        };
        this.registerMessageDelegate = function (F) {
            x.push(F)
        };
        this.unregisterMessageDelegate = function (F) {
            OT._.without(x, F)
        };
        Object.defineProperty(this, "remoteStreams", {
            get: function () {
                return n ? v() : []
            }
        })
    }
})(window);
(function (b) {
    var a = {};
    OT.rtc.PeerConnections = {
        add: function (g, f, c) {
            var d = g.id + "_" + f.id,
                e = a[d];
            if (!e) {
                e = a[d] = {
                    count: 0,
                    pc: new OT.rtc.PeerConnection(c)
                }
            }
            e.count += 1;
            return e.pc
        },
        remove: function (f, e) {
            var c = f.id + "_" + e.id,
                d = a[c];
            if (d) {
                d.count -= 1;
                if (d.count === 0) {
                    d.pc.disconnect();
                    delete a[c]
                }
            }
        }
    }
})(window);
(function (a) {
    OT.rtc.PublisherPeerConnection = function (m, f, i, k) {
        var j, b = false;
        var c = function () {
            this.trigger("connected", this)
        }, e = function () {
                this.destroy();
                this.trigger("disconnected", this)
            }, h = function (n) {
                this.trigger("error", null, n, this);
                this.destroy()
            }, g = function (n, o) {
                if (!b && n === OT.WebSocketMessageType.JSEP_CANDIDATE) {
                    b = o.candidate.candidate.indexOf("relay") !== -1
                }
                f.sendJSEPMessage(m, n, OT._.extend(o, {
                    streamId: i.id
                }))
            };
        OT.eventing(this);
        this.destroy = function () {
            if (j) {
                OT.rtc.PeerConnections.remove(m, i)
            }
            j = null
        };
        this.processMessage = function (n, o) {
            j.processMessage(n, o)
        };
        var d;
        if (f.sessionInfo.iceServers) {
            d = f.sessionInfo.iceServers
        } else {
            d = [{
                url: "stun:stun.l.google.com:19302"
            }]
        }
        j = OT.rtc.PeerConnections.add(m, i, {
            iceServers: d
        });
        j.on({
            open: OT._.bind(c, this),
            close: OT._.bind(e, this),
            error: OT._.bind(h, this)
        });
        j.registerMessageDelegate(g);
        j.addLocalStream(k);
        Object.defineProperty(this, "remoteConnection", {
            value: m
        });
        Object.defineProperty(this, "hasRelayCandidates", {
            get: function () {
                return b
            }
        })
    }
})(window);
(function (a) {
    OT.rtc.SubscriberPeerConnection = function (q, j, n) {
        var p, o = {}, h = false,
            d = false;
        var e = function () {
            h = true;
            this.trigger("connected", this)
        }, g = function () {
                h = false;
                this.destroy();
                this.trigger("disconnected", this)
            }, c = function (r, s) {
                o[s] = r;
                this.trigger("remoteStreamAdded", o[s], s, this)
            }, i = function (r, s) {
                delete o[s];
                this.trigger("remoteStreamRemoved", r, s, this)
            }, m = function (r) {
                h = false;
                this.trigger("error", null, r, this)
            }, k = function (r, s) {
                if (!d && r === OT.WebSocketMessageType.JSEP_CANDIDATE) {
                    d = s.candidate.candidate.indexOf("relay") !== -1
                }
                j.sendJSEPMessage(q, r, OT._.extend(s, {
                    streamId: n.id
                }))
            }, b = function (r) {
                var s = "get" + (r ? "Video" : "Audio") + "Tracks";
                return function (x) {
                    var z = p.remoteStreams,
                        w, A;
                    if (z.length === 0 || !z[0][s]) {
                        return
                    }
                    for (var y = 0, v = z.length; y < v; ++y) {
                        A = z[y];
                        w = A[s]();
                        for (var t = 0, u = w.length; t < u; ++t) {
                            w[t].enabled = x
                        }
                    }
                }
            };
        OT.eventing(this);
        this.destroy = function () {
            if (j && j.connected && n) {
                j.sendJSEPMessage(n.connection, OT.WebSocketMessageType.JSEP_UNSUBSCRIBE, {
                    streamId: n.id
                })
            }
            if (p) {
                this.subscribeToAudio(false);
                OT.rtc.PeerConnections.remove(q, n)
            }
            o = {};
            h = false;
            p = null
        };
        this.processMessage = function (r, s) {
            p.processMessage(r, s)
        };
        this.subscribeToAudio = b(false);
        this.subscribeToVideo = b(true);
        Object.defineProperty(this, "connected", {
            get: function () {
                return h
            }
        });
        Object.defineProperty(this, "hasRelayCandidates", {
            get: function () {
                return d
            }
        });
        var f;
        if (j.sessionInfo.iceServers) {
            f = j.sessionInfo.iceServers
        } else {
            f = [{
                url: "stun:stun.l.google.com:19302"
            }]
        }
        p = OT.rtc.PeerConnections.add(q, n, {
            iceServers: f
        });
        p.on({
            open: OT._.bind(e, this),
            close: OT._.bind(g, this),
            streamAdded: OT._.bind(c, this),
            streamRemoved: OT._.bind(i, this),
            error: OT._.bind(m, this)
        });
        p.registerMessageDelegate(k);
        if (p.remoteStreams.length > 0) {
            p.remoteStreams.forEach(c, this)
        } else {
            j.sendJSEPMessage(q, OT.WebSocketMessageType.JSEP_SUBSCRIBE, {
                streamId: n.id,
                keyManagemenMethod: OT.$.supportedCryptoScheme()
            })
        }
    }
})(window);
(function (a) {
    OT.Chrome = function (d) {
        var e = false,
            c = {}, b = function (f, g) {
                g.parent = this;
                //TODO 去掉一些多余的按钮
                if(!g || !g.appendTo) {
                    return;
                }
                g.appendTo(d.parent);
                c[f] = g;
                Object.defineProperty(this, f, {
                    get: function () {
                        return c[f]
                    }
                })
            };
        if (!d.parent) {
            return
        }
        OT.eventing(this);
        this.destroy = function () {
            this.hide();
            for (var f in c) {
                c[f].destroy()
            }
        };
        this.show = function () {
            e = true;
            for (var f in c) {
                c[f].show()
            }
        };
        this.hide = function () {
            e = false;
            for (var f in c) {
                c[f].hide()
            }
        };
        this.set = function (g, h) {
            if (typeof (g) === "string" && h) {
                b.call(this, g, h)
            } else {
                for (var f in g) {
                    if (g.hasOwnProperty(f)) {
                        b.call(this, f, g[f])
                    }
                }
            }
            return this
        }
    }
})(window);
(function (a) {
    if (!OT.Chrome.Behaviour) {
        OT.Chrome.Behaviour = {}
    }
    OT.Chrome.Behaviour.Widget = function (f, c) {
        var b = c || {}, e, d;
        f.setDisplayMode = function (h) {
            var g = h || "auto";
            if (e === g) {
                return
            }
            OT.$.removeClass(this.domElement, "OT_mode-" + e);
            OT.$.addClass(this.domElement, "OT_mode-" + g);
            d = e;
            e = g
        };
        f.show = function () {
            this.setDisplayMode(d);
            if (b.onShow) {
                b.onShow()
            }
            return this
        };
        f.hide = function () {
            this.setDisplayMode("off");
            if (b.onHide) {
                b.onHide()
            }
            return this
        };
        f.destroy = function () {
            if (b.onDestroy) {
                b.onDestroy(this.domElement)
            }
            if (this.domElement) {
                OT.$.removeElement(this.domElement)
            }
            return f
        };
        f.appendTo = function (g) {
            this.domElement = OT.$.createElement(b.nodeName || "div", b.htmlAttributes, b.htmlContent);
            if (b.onCreate) {
                b.onCreate(this.domElement)
            }
            f.setDisplayMode("on");
            g.appendChild(this.domElement);
            setTimeout(function () {
                f.setDisplayMode(b.mode)
            }, 2000);
            return f
        }
    }
})(window);
(function (a) {
    OT.Chrome.NamePanel = function (c) {
        var b = c.name;
        if (!b || b.trim().length === "") {
            b = null;
            c.mode = "off"
        }
        var d;
        this.__defineGetter__("domElement", function () {
            return d
        });
        this.__defineSetter__("domElement", function (e) {
            d = e
        });
        OT.Chrome.Behaviour.Widget(this, {
            mode: c.mode,
            nodeName: "h1",
            htmlContent: b.toString().split("|||")[0],
            htmlAttributes: {
                className: "OT_name"
            }
        });
        this.__defineSetter__("name", OT._.bind(function (e) {
            if (!b) {
                this.setDisplayMode("auto")
            }
            b = e;
            d.innerHTML = b
        }, this))
    }
})(window);
//TODO 去掉对声音控制的绑定
/*
(function (a) {
    OT.Chrome.MuteButton = function (d) {
        var f, c = d.muted || false;
        var g;
        this.__defineGetter__("domElement", function () {
            return g
        });
        this.__defineSetter__("domElement", function (j) {
            g = j
        });
        var e = function (j) {
            f = OT._.bind(i, this);
            j.addEventListener("click", f, false)
        }, b = function (j) {
                f = null;
                j.removeEventListener("click", f, false)
            }, i = function (j) {
                c = !c;
                if (c) {
                    OT.$.addClass(g, "OT_active");
                    this.parent.trigger("muted", this)
                } else {
                    OT.$.removeClass(g, "OT_active");
                    this.parent.trigger("unmuted", this)
                }
                return false
            };
        var h = c ? "OT_mute OT_active" : "OT_mute";
        OT.Chrome.Behaviour.Widget(this, {
            mode: d.mode,
            nodeName: "button",
            htmlContent: "Mute",
            htmlAttributes: {
                className: h
            },
            onCreate: OT._.bind(e, this),
            onDestroy: OT._.bind(b, this)
        })
    }
})(window);
*/
//TODO 去掉对声音控制的绑定
/*
(function (a) {
    OT.Chrome.MicVolume = function (d) {
        var f, c = d.muted || false;
        var g;
        this.__defineGetter__("domElement", function () {
            return g
        });
        this.__defineSetter__("domElement", function (i) {
            g = i
        });
        var e = function (i) {
            f = OT._.bind(h, this);
            i.addEventListener("click", f, false)
        }, b = function (i) {
                f = null;
                i.removeEventListener("click", f, false)
            }, h = function (i) {
                c = !c;
                if (c) {
                    OT.$.addClass(g, "active");
                    this.parent.trigger("muted", this)
                } else {
                    OT.$.removeClass(g, "active");
                    this.parent.trigger("unmuted", this)
                }
                return false
            };
        OT.Chrome.Behaviour.Widget(this, {
            mode: d.mode,
            nodeName: "button",
            htmlContent: "Mute",
            htmlAttributes: {
                className: "OT_mic-volume"
            },
            onCreate: OT._.bind(e, this),
            onDestroy: OT._.bind(b, this)
        })
    }
})(window);
*/
(function (a) {
    OT.Chrome.SettingsPanelButton = function (c) {
        var e;
        var d = function (h) {
            e = OT._.bind(g, this);
            h.addEventListener("click", e, false)
        }, b = function (h) {
                e = null;
                h.removeEventListener("click", e, false)
            }, g = function (h) {
                this.parent.trigger("SettingsPanel:open", this);
                return false
            };
        var f;
        this.__defineGetter__("domElement", function () {
            return f
        });
        this.__defineSetter__("domElement", function (h) {
            f = h
        });
        OT.Chrome.Behaviour.Widget(this, {
            mode: c.mode,
            nodeName: "button",
            htmlContent: "Settings",
            htmlAttributes: {
                className: "OT_settings-panel"
            },
            onCreate: OT._.bind(d, this),
            onDestroy: OT._.bind(b, this)
        })
    }
})(window);
(function (a) {
    OT.Chrome.SettingsPanel = function (e) {
        if (!e.stream) {
            return
        }
        var d = e.stream;
        var f;
        this.__defineGetter__("domElement", function () {
            return f
        });
        this.__defineSetter__("domElement", function (h) {
            f = h
        });
        var c = function () {
            var j = d.getVideoTracks().length ? d.getVideoTracks()[0].label : "None",
                i = d.getAudioTracks().length ? d.getAudioTracks()[0].label : "None";
            f.innerHTML = "<dl>                                        <dt>Cam</dt>                                        <dd>" + j + "</dd>                                        <dt>Mic</dt>                                        <dd>" + i + "</dd>                                    </dl>";
            var h = OT.$.createButton("Close", {
                className: "OT_close"
            }, {
                click: OT._.bind(b, this)
            });
            f.appendChild(h)
        }, g = function () {
                c.call(this)
            }, b = function () {
                this.parent.trigger("SettingsPanel:close", this);
                return false
            };
        OT.Chrome.Behaviour.Widget(this, {
            mode: e.mode,
            nodeName: "section",
            htmlContent: "Settings",
            htmlAttributes: {
                className: "OT_settings-panel"
            },
            onCreate: OT._.bind(c, this),
            onShow: OT._.bind(g, this)
        })
    }
})(window);
(function (a) {
    OT.Chrome.OpenTokButton = function (b) {
        if (!b || !b.infoHref) {
            return false
        }
        var c;
        this.__defineGetter__("domElement", function () {
            return c
        });
        this.__defineSetter__("domElement", function (d) {
            c = d
        });
        /*
        OT.Chrome.Behaviour.Widget(this, {
            mode: b ? b.mode : null,
            nodeName: "a",
            htmlContent: "OpenTok",
            htmlAttributes: {
                className: "OT_opentok",
                title: "more info",
                href: b.infoHref,
                target: "_blank"
            }
        });
        */
        this.__defineSetter__("infoHref", function (d) {
            b.infoHref = d;
            c.setAttribute("href", d)
        })
    }
})(window);
(function (b) {
    OT.rtc.StylableComponent = function (f, d) {
        if (!f.trigger) {
            throw new Error("OT.rtc.StylableComponent is dependent on the mixin OT.eventing. Ensure that this is included in the object before StylableComponent.")
        }
        var e = function (h, i, g) {
            if (g) {
                f.trigger("styleValueChanged", h, i, g)
            } else {
                f.trigger("styleValueChanged", h, i)
            }
        };
        var c = new a(d, e);
        f.getStyle = function (g) {
            return c.get(g)
        };
        f.setStyle = function (i, h, g) {
            if (typeof (i) !== "string") {
                c.setAll(i, g)
            } else {
                c.set(i, h)
            }
            return this
        }
    };
    var a = function (d, f) {
        var e = ["showMicButton", "showSpeakerButton", "showSettingsButton", "showCameraToggleButton", "nameDisplayMode", "buttonDisplayMode", "showSaveButton", "showRecordButton", "showRecordStopButton", "showReRecordButton", "showPauseButton", "showPlayButton", "showPlayStopButton", "showStopButton", "backgroundImageURI", "showControlPanel", "showRecordCounter", "showPlayCounter", "showControlBar", "showPreviewTime"],
            i = {
                buttonDisplayMode: ["auto", "off", "on"],
                nameDisplayMode: ["auto", "off", "on"],
                showSettingsButton: [true, false],
                showMicButton: [true, false],
                showCameraToggleButton: [true, false],
                showSaveButton: [true, false],
                backgroundImageURI: null,
                showControlBar: [true, false],
                showPlayCounter: [true, false],
                showRecordCounter: [true, false],
                showPreviewTime: [true, false]
            }, c = {}, g = function (j, k) {
                return j === "backgroundImageURI" || (i.hasOwnProperty(j) && OT._.include(i[j], k))
            }, h = function (j) {
                switch (j) {
                case "true":
                    return true;
                case "false":
                    return false;
                default:
                    return j
                }
            };
        this.getAll = function () {
            var k = OT._.clone(c);
            for (var j in k) {
                if (e.indexOf(j) < 0) {
                    delete k[j]
                }
            }
            return k
        };
        this.get = function (j) {
            if (j) {
                return c[j]
            }
            return this.getAll()
        };
        this.setAll = function (n, j) {
            var k, o;
            for (var m in n) {
                o = h(n[m]);
                if (g(m, o)) {
                    k = c[m];
                    if (o !== k) {
                        c[m] = o;
                        if (!j) {
                            f(m, o, k)
                        }
                    }
                } else {
                    OT.warn("Style.setAll::Invalid style property passed " + m + " : " + o)
                }
            }
            return this
        };
        this.set = function (k, m) {
            OT.debug("Publisher.setStyle: " + k.toString());
            var n = h(m),
                j;
            if (!g(k, n)) {
                OT.warn("Style.set::Invalid style property passed " + k + " : " + n);
                return this
            }
            j = c[k];
            if (n !== j) {
                c[k] = n;
                f(k, m, j)
            }
            return this
        };
        if (d) {
            this.setAll(d, true)
        }
    }
})(window);
(function (a) {
    OT.Microphone = function (c, e) {
        var b, d = 50;
        Object.defineProperty(this, "muted", {
            get: function () {
                return b
            },
            set: function (h) {
                if (b === h) {
                    return
                }
                b = h;
                var j = c.getAudioTracks();
                for (var g = 0, f = j.length; g < f; ++g) {
                    j[g].enabled = !b
                }
            }
        });
        Object.defineProperty(this, "gain", {
            get: function () {
                return d
            },
            set: function (f) {
                OT.warn("OT.Microphone.gain IS NOT YET IMPLEMENTED");
                d = f
            }
        });
        if (e !== undefined) {
            this.muted = e === true
        } else {
            if (c.getAudioTracks().length) {
                this.muted = !c.getAudioTracks()[0].enabled
            } else {
                this.muted = false
            }
        }
    }
})(window);
(function (a) {
    OT.rtc.Publisher = function () {
        if (!OT.checkSystemRequirements()) {
            OT.upgradeSystemRequirements();
            return
        }
        var j = OT.rtc.Publisher.nextId(),
            A, n, v, t, r, F, p = {}, e = false,
            w, h, d = false,
            E, G, x = new OT.Analytics(),
            g;
        OT.eventing(this);
        OT.rtc.StylableComponent(this, {
            showMicButton: true,
            showSettingsButton: true,
            showCameraToggleButton: true,
            nameDisplayMode: "auto",
            buttonDisplayMode: "auto",
            backgroundImageURI: null
        });
        var f = function (J, H, I, K) {
            x.logEvent({
                action: J,
                variation: H,
                payload_type: I,
                payload: K,
                session_id: F ? F.sessionId : null,
                connection_id: F && F.connected ? F.connection.connectionId : null,
                partner_id: F ? F.apiKey : OT.APIKEY,
                streamId: t ? t.id : null,
                widget_id: j,
                widget_type: "Publisher"
            })
        }, b = function () {
                OT.debug("OT.rtc.Publisher.onLoaded");
                f("publish", "Success", "streamType", "WebRTC");
                OT.$.removeClass(n, "loading");
                u.call(this);
                e = true;
                this.trigger("loaded", this)
            }, c = function (H) {
                f("publish", "Failure", "reason", "Publisher PeerConnection Error: " + H);
                OT.handleJsException("Publisher PeerConnection Error: " + H, OT.ExceptionCodes.P2P_CONNECTION_FAILED, {
                    session: F,
                    target: this
                })
            }, C = function (H) {
                OT.debug("OT.rtc.Publisher.onStreamAvailable");
                this.dispatchEvent(new OT.Event(OT.Event.names.ACCESS_ALLOWED, false));
                i();
                r = H;
                E = new OT.Microphone(r, !w.publishAudio);
                this.publishVideo(w.publishVideo);
                v = new OT.rtc.VideoElement({
                    attributes: navigator.mozGetUserMedia ? {
                        muted: true
                    } : null
                });
                v.on({
                    streamBound: OT._.bind(b, this),
                    timeout: OT._.bind(c, this),
                    error: OT._.bind(o, this)
                }).bindToStream(r).appendTo(n.videoContainer);
                OT.DOMComponentCleanup.add(this, v)
            }, z = function (H) {
                var J = function (M, L) {
                    OT.error("OT.rtc.Publisher.onStreamAvailableError " + M);
                    f("publish", "Failure", "reason", "Publisher failed to access camera/mic: " + M);
                    OT.handleJsException("Publisher failed to access camera/mic: " + M, 2000, {
                        session: F,
                        target: L
                    })
                };
                switch (H.code) {
                case 1:
                    OT.error("OT.rtc.Publisher.onStreamAvailableError Permission Denied");
                    f("publish", "Failure", "reason", "Publisher Access Denied: Permission Denied (" + H.code + ")");
                    var K = new OT.Event(OT.Event.names.ACCESS_DENIED),
                        I = function () {
                            if (!K.isDefaultPrevented() && n) {
                                OT.$.removeElement(n)
                            }
                        };
                    this.dispatchEvent(K, I);
                    break;
                case "NO_CONSTRAINTS":
                    if (n) {
                        OT.$.removeElement(n)
                    }
                    J("No constaints were provided", this);
                    break;
                default:
                    if (n) {
                        OT.$.removeElement(n)
                    }
                    J("Unknown Reason (" + H.code + ")", this)
                }
            }, m = function () {
                f("accessDialog", "Opened", "", "");
                this.dispatchEvent(new OT.Event(OT.Event.names.ACCESS_DIALOG_OPENED, false))
            }, s = function () {
                f("accessDialog", "Closed", "", "");
                this.dispatchEvent(new OT.Event(OT.Event.names.ACCESS_DIALOG_CLOSED, false))
            }, o = function (J, H) {
                OT.error("OT.rtc.Publisher.onVideoError");
                var I = H + (J ? " (" + J + ")" : "");
                f("stream", null, "reason", "Publisher while playing stream: " + I);
                OT.handleJsException("Publisher error playing stream: " + I, 2000, {
                    session: F,
                    target: this
                })
            }, k = function (H) {
                OT.debug("OT.rtc.Subscriber has been disconnected from the Publisher's PeerConnection");
                this.cleanupSubscriber(H.remoteConnection.id)
            }, y = function (I, J, H) {
                f("publish", "Failure", "reason|hasRelayCandidates", ["Publisher PeerConnection with connection " + H.remoteConnection.id + " failed: " + J, H.hasRelayCandidates].join("|"));
                OT.handleJsException("Publisher PeerConnection Error: " + J, 2000, {
                    session: F,
                    target: this
                });
                delete p[H.remoteConnection.id]
            }, i = function () {
                if (r) {
                    r.stop();
                    r = null
                }
            }, B = function (J) {
                var H = p[J.id];
                if (!H) {
                    var I = OT.$.now();
                    f("createPeerConnection", "Attempt", "", "");
                    H = p[J.id] = new OT.rtc.PublisherPeerConnection(J, F, t, r);
                    H.on({
                        connected: function () {
                            f("createPeerConnection", "Success", "pcc|hasRelayCandidates", [parseInt(OT.$.now() - I, 10), H.hasRelayCandidates].join("|"))
                        },
                        disconnected: OT._.bind(k, this),
                        error: OT._.bind(y, this)
                    })
                }
                return H
            }, D = function (I) {
                if (I === false) {
                    return "off"
                }
                var H = this.getStyle("buttonDisplayMode");
                if (H === false) {
                    return "on"
                }
                return H
            }, q = function (I, J, H) {
                if (!G) {
                    return
                }
                switch (I) {
                case "nameDisplayMode":
                    G.name.setDisplayMode(J);
                    break;
                case "buttonDisplayMode":
                case "showMicButton":
                case "showSettingsButton":
                }
            }, u = function () {
                G = new OT.Chrome({
                    parent: n
                }).set({
                    name: new OT.Chrome.NamePanel({
                        name: w.name,
                        mode: this.getStyle("nameDisplayMode")
                    }),
                    /*
                    muteButton: new OT.Chrome.MuteButton({
                        muted: w.publishAudio === false,
                        mode: D.call(this, this.getStyle("showMicButton"))
                    }),*/
                    opentokButton: new OT.Chrome.OpenTokButton({
                        infoHref: OT.$.moreInfoLink(F)
                    })
                }).on({
                    muted: OT._.bind(function () {
                        this.publishAudio(false)
                    }, this),
                    unmuted: OT._.bind(function () {
                        this.publishAudio(true)
                    }, this)
                })
            };
        this.publish = function (I, H) {
            OT.debug("OT.rtc.Publisher: publish");
            if (A) {
                this.unpublish()
            }
            A = I || uuid();
            w = OT._.defaults(H || {}, {
                publishAudio: true,
                publishVideo: true,
                mirror: true
            });
            if (w.style) {
                this.setStyle(w.style, null, true)
            }
            if (w.name) {
                w.name = w.name.toString()
            }
			if (w.data) {
                w.data = w.data.toString()
            }
            w.classNames = "OT_root OT_publisher OT_loading";
            OT.onLoad(function () {
                n = OT.$.getOrCreateWidgetContainerById(A, w);
                OT.$.getUserMedia({
                    audio: true,
                    video: true
                }, OT._.bind(C, this), OT._.bind(z, this), OT._.bind(m, this), OT._.bind(s, this))
            }, this);
            return this
        };
        this.publishAudio = function (H) {
            w.publishAudio = H;
            E.muted = !H;
            if (F && t) {
                F.sendMessage(OT.WebSocketMessage.modifyStream(t.streamId, "hasAudio", H))
            }
        };
        this.publishVideo = function (L) {
            var I = w.publishVideo;
            w.publishVideo = L;
            if (F && t && w.publishVideo !== I) {
                F.sendMessage(OT.WebSocketMessage.modifyStream(t.streamId, "hasVideo", L))
            }
            var K = r.getVideoTracks();
            for (var J = 0, H = K.length; J < H; ++J) {
                K[J].enabled = L
            }
        };
        this.recordQOS = function () {
            x.logQOS({
                widget_type: "Publisher",
                stream_type: "WebRTC",
                sessionId: F ? F.sessionId : null,
                connectionId: F && F.connected ? F.connection.connectionId : null,
                partnerId: F ? F.apiKey : OT.APIKEY,
                streamId: t ? t.id : null,
                widgetId: j,
                version: OT.BUILD_PROPERTIES.version,
                media_server_name: F.sessionInfo.messagingServer,
                duration: new Date().getTime() - h.getTime()
            })
        };
        this.destroy = function () {
            OT.DOMComponentCleanup.remove(this);
            if (G) {
                G.destroy();
                G = null
            }
            this.disconnect();
            E = null;
            if (v) {
                v.destroy();
                v = null
            }
            i();
            if (n) {
                OT.$.removeElement(n);
                n = null
            }
            if (this.session) {
                this._.unpublishFromSession(this.session)
            }
            d = false;
            if (g) {
                clearInterval(g)
            }
            A = null;
            t = null;
            e = false;
            F = null;
            _properties = null;
            this.trigger("destroyed", this);
            return this
        };
        this.disconnect = function () {
            for (var H in p) {
                this.cleanupSubscriber(H)
            }
        };
        this.cleanupSubscriber = function (I) {
            var H = p[I];
            if (H) {
                H.destroy();
                delete p[I];
                f("disconnect", "PeerConnection", "subscriberConnection", I)
            }
        };
        this.processMessage = function (I, K, J) {
            OT.debug("OT.rtc.Publisher.processMessage: Received " + I + " from " + K.id);
            OT.debug(J);
            switch (I) {
            case OT.WebSocketMessageType.JSEP_UNSUBSCRIBE:
                this.cleanupSubscriber(K.id);
                break;
            default:
                var H = B.call(this, K);
                H.processMessage(I, J)
            }
        };
        this.getImgData = function () {
            if (!e) {
                OT.error("OT.rtc.Publisher.getImgData: Cannot getImgData before the Publisher is publishing.");
                return null
            }
            return v.imgData
        };
        this._ = {
            publishToSession: OT._.bind(function (I) {
                this.session = I;
                if (G) {
                    G.opentokButton.infoHref = OT.$.moreInfoLink(F)
                }
                var H = function () {
                    I.sendMessage(OT.WebSocketMessage.createStream(this.guid, w && w.name ? w.name : "",w.data, OT.VideoOrientation.ROTATED_NORMAL, 640, 480, w.publishAudio, w.publishVideo, this.session.sessionInfo.p2pEnabled))
                };
                if (e) {
                    H.call(this)
                } else {
                    this.on("loaded", OT._.bind(H, this))
                }
                f("publish", "Attempt", "streamType", "WebRTC");
                return this
            }, this),
            unpublishFromSession: OT._.bind(function (H) {
                if (!this.session || H.id !== this.session.id) {
                    OT.warn("The publisher " + this.guid + " is trying to unpublish from a session " + H.id + " it is not attached to");
                    return this
                }
                if (H.connected && this.stream) {
                    H.sendMessage(OT.WebSocketMessage.destroyStream(this.stream.id))
                }
                this.disconnect();
                this.session = null;
                f("unpublish", "Success", "sessionId", H.id);
                return this
            }, this),
            publishedToSessionHandler: OT._.bind(function () {
                h = new Date();
                d = true;
                g = setInterval(this.recordQOS, 30000)
            }, this)
        };
        this.detectDevices = function () {
            OT.warn("Fixme: Haven't implemented detectDevices")
        };
        this.detectMicActivity = function () {
            OT.warn("Fixme: Haven't implemented detectMicActivity")
        };
        this.getEchoCancellationMode = function () {
            OT.warn("Fixme: Haven't implemented getEchoCancellationMode");
            return "fullDuplex"
        };
        this.setMicrophoneGain = function (H) {
            OT.warn("Fixme: Haven't implemented setMicrophoneGain")
        };
        this.getMicrophoneGain = function () {
            OT.warn("Fixme: Haven't implemented getMicrophoneGain");
            return 0.5
        };
        this.setCamera = function (H) {
            OT.warn("Fixme: Haven't implemented setCamera")
        };
        this.setMicrophone = function (H) {
            OT.warn("Fixme: Haven't implemented setMicrophone")
        };
        this.on("styleValueChanged", OT._.bind(q, this));
        this.__defineGetter__("id", function () {
            return A
        });
        this.__defineGetter__("guid", function () {
            return j
        });
        this.__defineGetter__("stream", function () {
            return t
        });
        this.__defineSetter__("stream", function (H) {
            t = H
        });
        this.__defineGetter__("streamId", function () {
            if (!t) {
                return null
            }
            return t.id
        });
        this.__defineGetter__("targetElement", function () {
            return v.domeElement
        });
        this.__defineGetter__("domId", function () {
            return A
        });
        this.__defineGetter__("session", function () {
            return F
        });
        this.__defineSetter__("session", function (H) {
            F = H
        });
        this.__defineGetter__("isWebRTC", function () {
            return true
        });
        Object.defineProperty(this._, "webRtcStream", {
            get: function () {
                return r
            }
        })
    };
    OT.rtc.Publisher.nextId = uuid
})(window);
(function (a) {
    OT.rtc.Subscriber = function (m, h) {
        var c = uuid(),
            y = m || c,
            n, i = {}, B, q, k, A = h.session,
            e = false,
            x, w, g, s = OT._.clone(h),
            t = new OT.Analytics();
        if (!A) {
            OT.handleJsException("Subscriber must be passed a session option", 2000, {
                session: A,
                target: this
            });
            return
        }
        OT.eventing(this);
        OT.rtc.StylableComponent(this, {
            nameDisplayMode: "auto",
            buttonDisplayMode: "auto",
            backgroundImageURI: null
        });
        var f = function (E, C, D, F) {
            t.logEvent({
                action: E,
                variation: C,
                payload_type: D,
                payload: F,
                stream_id: q ? q.id : null,
                session_id: A ? A.sessionId : null,
                connection_id: A && A.connected ? A.connection.connectionId : null,
                partner_id: A && A.connected ? A.sessionInfo.partnerId : null,
                widget_id: c,
                widget_type: "Subscriber"
            })
        }, d = function () {
                return i.merged || i.video
            }, b = function () {
                if (e || i.length === 0) {
                    return
                }
                var C = OT._.every(i.values, function (D) {
                    return D.isBoundToStream
                });
                if (k && k.connected) {
                    f("createPeerConnection", "Opened", "", "");
                    if (C) {
                        f("createPeerConnection", "StreamAdded", "", "")
                    }
                }
                if (!C || (k && !k.connected)) {
                    return
                }
                OT.debug("OT.rtc.Subscriber.onLoaded");
                e = true;
                x = OT.$.now();
                f("createPeerConnection", "Success", "pcc|hasRelayCandidates", [parseInt(x - w, 10), k && k.hasRelayCandidates].join("|"));
                g = setInterval(this.recordQOS, 30000);
                OT.$.removeClass(n, "loading");
                r.call(this);
                this.trigger("loaded", this);
                f("subscribe", "Success", "streamId", q.id)
            }, v = function () {
                OT.debug("OT.rtc.Subscriber has been disconnected from the Publisher's PeerConnection");
                this.disconnect()
            }, u = function (C, D) {
                if (!e) {
                    f("createPeerConnection", "Failure", "reason|hasRelayCandidates", ["Subscriber PeerConnection Error: " + D, k && k.hasRelayCandidates].join("|"))
                }
                this.disconnect();
                f("subscribe", "Failure", "reason", "Subscriber PeerConnection Error: " + D);
                OT.handleJsException("Subscriber PeerConnection Error: " + D, OT.ExceptionCodes.P2P_CONNECTION_FAILED, {
                    session: A,
                    target: this
                });
                p.call(this, D)
            }, z = function (E, D) {
                OT.debug("OT.rtc.Subscriber.onRemoteStreamAdded");
                this.subscribeToAudio(s.subscribeToAudio);
                this.subscribeToVideo(s.subscribeToVideo);
                var C = new OT.rtc.VideoElement();
                C.on({
                    streamBound: OT._.bind(b, this),
                    timeout: OT._.bind(u, this),
                    error: OT._.bind(u, this)
                });
                if (D === "audio") {
                    OT.$.addClass(C.domElement, "OT_hidden-audio")
                }
                C.bindToStream(E).appendTo(n.videoContainer);
                OT.DOMComponentCleanup.add(this, C);
                i[D] = C;
                if (D !== "audio") {
                    this.streamOrientationDidChange(q.orientation.width, q.orientation.height, q.orientation.videoOrientation)
                }
                this.trigger("streamAdded", this)
            }, j = function (D) {
                OT.debug("OT.rtc.Subscriber.onStreamRemoved");
                for (var C in i) {
                    if (i[C].stream == D) {
                        i[C].destroy();
                        delete i[C]
                    }
                }
                this.trigger("streamRemoved", this)
            }, o = function (D, E, C) {
                if (!B) {
                    return
                }
                switch (D) {
                case "nameDisplayMode":
                    B.name.setDisplayMode(E);
                    break;
                case "buttonDisplayMode":
                }
            }, r = function () {
                B = new OT.Chrome({
                    parent: n
                }).set({
                    name: new OT.Chrome.NamePanel({
                        name: s.name,
                        mode: this.getStyle("nameDisplayMode")
                    }),
                    opentokButton: new OT.Chrome.OpenTokButton({
                        infoHref: OT.$.moreInfoLink(A)
                    })
                }).on({
                    muted: function () {},
                    unmuted: function () {}
                })
            }, p = function (C) {
                if (n) {
                    n.innerHTML = "<p>" + C + "<p>"
                }
                OT.$.addClass(n, "OT_subscriber_error")
            };
        this.recordQOS = function () {
            if (e && A && A.connected) {
                t.logQOS({
                    widget_type: "Subscriber",
                    stream_type: "WebRTC",
                    session_id: A.sessionId,
                    connectionId: A.connection.connectionId,
                    media_server_name: A.sessionInfo.messagingServer,
                    partner_id: A.apiKey,
                    stream_id: q.id,
                    widget_id: c,
                    version: OT.BUILD_PROPERTIES.version,
                    duration: parseInt(OT.$.now() - x, 10)
                })
            }
        };
        this.subscribe = function (C) {
            OT.debug("OT.rtc.Subscriber: subscribe to " + C.id);
            if (e) {
                OT.error("OT.rtc.Subscriber.Subscribe: Cannot subscribe, already subscribing.");
                return false
            }
            if (!C) {
                OT.error("OT.rtc.Subscriber: No stream parameter.");
                return false
            }
            if (q) {
                OT.error("OT.rtc.Subscriber: Already subscribed");
                return false
            }
            q = C;
            y = m || uuid();
            s.name = q.name;
            s.classNames = "OT_root OT_subscriber OT_loading";
            if (s.style) {
                this.setStyle(s.style, null, true)
            }
            s.subscribeToAudio = OT.$.castToBoolean(s.subscribeToAudio, true);
            s.subscribeToVideo = OT.$.castToBoolean(s.subscribeToVideo, true);
            n = OT.$.getOrCreateWidgetContainerById(y, s);
            w = OT.$.now();
            if (q.connection.id !== A.connection.id) {
                f("createPeerConnection", "Attempt", "", "");
                k = new OT.rtc.SubscriberPeerConnection(q.connection, A, q);
                k.on({
                    connected: OT._.bind(b, this),
                    disconnected: OT._.bind(v, this),
                    error: OT._.bind(u, this),
                    remoteStreamAdded: OT._.bind(z, this),
                    remoteStreamRemoved: OT._.bind(j, this)
                })
            } else {
                z.call(this, A.getPublisherForStream(q)._.webRtcStream, "merged");
                b.call(this)
            }
            f("subscribe", "Attempt", "streamId", q.id);
            return this
        };
        this.destroy = function () {
            OT.DOMComponentCleanup.remove(this);
            this.disconnect();
            if (B) {
                B.destroy();
                B = null
            }
            for (var C in i) {
                i[C].destroy();
                i[C].off("streamBound");
                i[C].off("timeout");
                i[C].off("error")
            }
            i = {};
            if (n) {
                OT.$.removeElement(n);
                n = null
            }
            if (q) {
                f("unsubscribe", null, "streamId", q.id)
            }
            y = null;
            q = null;
            clearInterval(g);
            A = null;
            s = null;
            this.trigger("destroyed", this);
            return this
        };
        this.disconnect = function () {
            e = false;
            if (k) {
                k.destroy();
                k = null;
                f("disconnect", "PeerConnection", "streamId", q.id)
            }
        };
        this.processMessage = function (C, E, D) {
            OT.debug("OT.rtc.Subscriber.processMessage: Received " + C + " message from " + E.id);
            OT.debug(D);
            if (k) {
                k.processMessage(C, D)
            }
        };
        this.getImgData = function () {
            if (!this.subscribing) {
                OT.error("OT.rtc.Subscriber.getImgData: Cannot getImgData before the Subscriber is subscribing.");
                return null
            }
            return d().imgData
        };
        this.setAudioVolume = function (C) {
            OT.warn("Fixme: Haven't implemented setAudioVolume")
        };
        this.getAudioVolume = function () {
            OT.warn("Fixme: Haven't implemented getAudioVolume");
            return 0.5
        };
        this.subscribeToAudio = function (C) {
            s.subscribeToAudio = OT.$.castToBoolean(C, true);
            if (k) {
                k.subscribeToAudio(C)
            }
        };
        this.subscribeToVideo = function (C) {
            s.subscribeToVideo = OT.$.castToBoolean(C, true);
            if (k) {
                k.subscribeToVideo(C)
            }
        };
        this.streamOrientationDidChange = function (E, C, D) {
            d().orientation = D
        };
        this.on("styleValueChanged", OT._.bind(o, this));
        this.__defineGetter__("id", function () {
            return y
        });
        this.__defineGetter__("stream", function () {
            return q
        });
        this.__defineGetter__("targetElement", function () {
            return d() ? d().domElement : null
        });
        this.__defineGetter__("subscribing", function () {
            return e
        });
        this.__defineGetter__("isWebRTC", function () {
            return true
        })
    }
})(window);
(function (a) {
    OT.TokenPermissions = function (e) {
        var c = null;
        this.sessionId = null;
        this.partnerId = null;
        this.connectionData = "";
        this.validToken = true;
        this.capabilities = {
            forceUnpublish: 0,
            playback: 0,
            publish: 0,
            publishH264: 0,
            record: 0,
            subscribe: 0
        };
        if (e.documentElement && e.documentElement.firstElementChild !== null) {
            c = e.documentElement.firstElementChild
        }
        OT.log("ValidateTokenResponse:");
        OT.log(e);
        if (c !== null && c.localName.toLowerCase() == "token") {
            var d = c.firstElementChild;
            do {
                switch (d.localName) {
                case "session_id":
                    this.sessionId = d.textContent;
                    break;
                case "partner_id":
                    this.partnerId = d.textContent;
                    break;
                case "permissions":
                    var b = d.firstElementChild;
                    do {
                        switch (b.tagName) {
                        case "forceunpublish":
                            this.capabilities.forceUnpublish = 1;
                            break;
                        case "forcedisconnect":
                            this.capabilities.forceDisconnect = 1;
                            break;
                        case "playback":
                            this.capabilities.playback = 1;
                            break;
                        case "publish":
                            this.capabilities.publish = 1;
                            break;
                        case "publishH264":
                            this.capabilities.publishH264 = 1;
                            break;
                        case "record":
                            this.capabilities.record = 1;
                            break;
                        case "subscribe":
                            this.capabilities.subscribe = 1;
                            break
                        }
                    } while (b = b.nextElementSibling);
                    OT.debug("Capabilities:" + JSON.stringify(this.capabilities));
                    break;
                case "connection_data":
                    this.connectionData = d.textContent;
                    OT.log("ConnectionData: " + this.connectionData);
                    break;
                case "invalid":
                    OT.error("Token Invalid " + d.firstChild.textContent);
                    this.validToken = false;
                    break;
                default:
                    break
                }
            } while (d = d.nextElementSibling)
        } else {
            this.validToken = false
        }
    }
})(window);
(function (a) {
    OT.SessionInfo = function (j) {
        var h = null;
        this.sessionId = null;
        this.partnerId = null;
        this.sessionStatus = null;
        this.p2pEnabled = false;
        this.messagingServer = null;
        this.iceServers = null;
        OT.log("SessionInfo Response:");
        OT.log(j);
        if (j && j.documentElement && j.documentElement.firstElementChild !== null) {
            h = j.documentElement.firstElementChild
        }
        var f = h.firstElementChild;
        do {
            switch (f.localName) {
            case "session_id":
                this.sessionId = f.textContent;
                break;
            case "partner_id":
                this.partnerId = f.textContent;
                break;
            case "session_status":
                this.sessionStatus = f.textContent;
                break;
            case "messaging_server_url":
                this.messagingServer = f.textContent;
                break;
            case "ice_servers":
                this.iceServers = [];
                var d = f.childNodes,
                    k, e;
                for (var g = 0, c = d.length; g < c; ++g) {
                    if (d[g].localName === "ice_server") {
                        e = d[g].attributes;
                        k = {
                            url: e.getNamedItem("url").nodeValue
                        };
                        if (e.getNamedItem("credential") && e.getNamedItem("credential").nodeValue.length) {
                            k.credential = e.getNamedItem("credential").nodeValue
                        }
                        this.iceServers.push(k)
                    }
                }
                break;
            case "properties":
                var m = f.firstElementChild;
                if (m) {
                    do {
                        if (m.localName === "p2p" && m.firstElementChild !== null) {
                            this.p2pEnabled = (m.firstElementChild.textContent === "enabled");
                            break
                        }
                    } while (m = m.nextElementSibling)
                }
                break;
            default:
                break
            }
        } while (f = f.nextElementSibling);
        h = null
    };
    OT.SessionInfo.get = function (g, h, f) {
        var d = OT.BUILD_PROPERTIES.apiURL + "/session/" + g.id + "?extended=true",
            e = OT.$.now(),
            c = function (j) {
                g.logEvent("Instrumentation", null, "gsi", OT.$.now() - e);
                var i = parseErrorFromXMLDocument(j);
                if (i === false) {
                    onGetResponseCallback(g, h, j)
                } else {
                    onGetErrorCallback(g, f, i)
                }
            };
        g.logEvent("getSessionInfo", "Attempt", "api_url", OT.BUILD_PROPERTIES.apiURL);
        OT.$.getXML(d, {
            headers: {
                "X-TB-TOKEN-AUTH": g.token,
                "X-TB-VERSION": 1
            },
            success: c,
            error: function (i) {
                onGetErrorCallback(g, f, parseErrorFromXMLDocument(i.target.responseXML))
            }
        })
    };
    var b = {};
    b["404"] = OT.ExceptionCodes.INVALID_SESSION_ID;
    b["403"] = OT.ExceptionCodes.AUTHENTICATION_ERROR;
    parseErrorFromXMLDocument = function (g) {
        if (g && g.documentElement && g.documentElement.firstElementChild !== null) {
            var e = g.evaluate("//error", g.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
                c = e.snapshotLength;
            if (c === 0) {
                return false
            }
            for (var d = 0; d < c; ++d) {
                var f = e.snapshotItem(d);
                return {
                    code: f.getAttribute("code"),
                    message: f.firstElementChild.getAttribute("message")
                }
            }
        }
        return {
            code: null,
            message: "Unknown error: getSessionInfo XML response was badly formed"
        }
    };
    onGetResponseCallback = function (d, e, c) {
        d.logEvent("getSessionInfo", "Success", "api_url", OT.BUILD_PROPERTIES.apiURL);
        e(new OT.SessionInfo(c))
    };
    onGetErrorCallback = function (e, d, c) {
        TB.handleJsException("TB.SessionInfoError :: Unable to get session info " + c.message, b[c.code], {
            session: e
        });
        e.logEvent("getSessionInfo", "Failure", "errorMessage", "TB.SessionInfoError :: Unable to get session info " + c.message);
        d(c, event)
    }
})(window);
(function (a) {
    OT.Capabilities = function (b) {
        this.publish = OT._.contains(b, "publish") ? 1 : 0;
        this.subscribe = OT._.contains(b, "subscribe") ? 1 : 0;
        this.forceUnpublish = OT._.contains(b, "forceunpublish") ? 1 : 0;
        this.forceDisconnect = OT._.contains(b, "forcedisconnect") ? 1 : 0;
        this.supportsWebRTC = OT.$.supportsWebRTC() ? 1 : 0
    }
})(window);
(function (c) {
    var a = [],
        b = false;
    OT.Analytics = function () {
        var f = OT.BUILD_PROPERTIES.loggingURL + "/logging/ClientEvent",
            g = OT.BUILD_PROPERTIES.loggingURL + "/logging/ClientQos",
            h = {}, d = {
                payloadType: "payload_type",
                streamId: "stream_id",
                sessionId: "session_id",
                connectionId: "connection_id",
                widgetType: "widget_type",
                widgetId: "widget_id"
            }, i = function (o, m, p, n) {
                OT.$.post(m ? g : f, {
                    success: p,
                    error: n,
                    data: o,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
            }, j = function () {
                if (!b && a.length > 0) {
                    b = true;
                    var n = a[0];
                    var m = function () {
                        a.shift();
                        b = false;
                        j()
                    };
                    if (n) {
                        i(n.data, n.isQos, function () {
                            n.onComplete();
                            setTimeout(m, 50)
                        }, function () {
                            OT.debug("Failed to send ClientEvent, moving on to the next item.");
                            setTimeout(m, 50)
                        })
                    }
                }
            }, e = function (n, o, m) {
                a.push({
                    data: n,
                    onComplete: o,
                    isQos: m
                });
                j()
            }, k = function (p, o, q) {
                if (!q) {
                    return false
                }
                var m = [q, o, p].join("_"),
                    n = 100;
                if (n === null || n === undefined) {
                    return false
                }
                return (h[m] || 0) <= n
            };
        this.logError = function (r, p, q, o, n) {
            if (!n) {
                n = {}
            }
            var t = n.partnerId;
            if (OT.Config.get("exceptionLogging", "enabled", t) !== true) {
                return
            }
            if (k(r, p, t)) {
                return
            }
            var m = [t, p, r].join("_"),
                s = this.escapePayload(OT._.extend(o || {}, {
                    message: s,
                    userAgent: navigator.userAgent
                }));
            h[m] = typeof (h[m]) !== "undefined" ? h[m] + 1 : 1;
            return this.logEvent(OT._.extend(n, {
                action: p + "." + r,
                payloadType: s[0],
                payload: s[1]
            }))
        };
        this.logEvent = function (m) {
            var q = m.partnerId;
            if (!m) {
                m = {}
            }
            var o = OT._.extend({
                variation: "",
                guid: m.connectionId || "",
                widget_id: "",
                session_id: "",
                connection_id: "",
                stream_id: "",
                partner_id: q,
                source: c.location.href,
                section: "",
                build: ""
            }, m),
                p = function () {};
            for (var n in d) {
                if (d.hasOwnProperty(n) && o[n]) {
                    o[d[n]] = o[n];
                    delete o[n]
                }
            }
            e(o, p, false)
        };
        this.logQOS = function (m) {
            var q = m.partnerId;
            if (!m) {
                m = {}
            }
            var o = OT._.extend({
                guid: m.connectionId,
                widget_id: "",
                session_id: "",
                connection_id: "",
                stream_id: "",
                partner_id: q,
                source: c.location.href,
                build: "",
                duration: 0
            }, m),
                p = function () {};
            for (var n in d) {
                if (d.hasOwnProperty(n) && o[n]) {
                    o[d[n]] = o[n];
                    delete o[n]
                }
            }
            e(o, p, true)
        };
        this.escapePayload = function (p) {
            var o = [],
                m = [];
            for (var n in p) {
                if (p.hasOwnProperty(n) && p[n] !== null && p[n] !== undefined) {
                    o.push(p[n] ? p[n].toString().replace("|", "\\|") : "");
                    m.push(n.toString().replace("|", "\\|"))
                }
            }
            return [m.join("|"), o.join("|")]
        }
    }
})(window);
(function (a) {
    OT.Session = function (H) {
        if (!OT.checkSystemRequirements()) {
            OT.upgradeSystemRequirements();
            return
        }
        var e, h = false,
            F = false,
            n, A = {}, M = {}, T = {}, O = {}, L, o, s = H,
            R = false,
            f, d = {}, y = uuid(),
            V = {}, q = new OT.Analytics();
        OT.eventing(this);

        function v(X) {
            for (var Y in M) {
                var W = M[Y];
                if (X === W.streamId) {
                    return W
                }
            }
            return null
        }

        function B(W) {
            if (!W.connection || !A[W.connection.connectionId]) {
                OT.warn("Received a stream for a connection that doesn't exist");
                OT.debug(W);
                return false
            }
            return true
        }

        function r(W) {
            return O[W]
        }

        function S(W) {
            W.forEach(J)
        }

        function J(W) {
            O[W.id] = W
        }

        function m(W) {
            delete O[W]
        }

        function p(Z, X, Y) {
            var aa = r(Z),
                W = aa[X];
            aa.update(X, Y);
            return W
        }
        var x = function (W) {
            h = true;
            F = false;
            n = W.connectionId;
            d = new OT.Capabilities(W.permissions);
            W.connections.forEach(function (X) {
                A[X.connectionId] = X
            });
            W.streams = OT._.filter(W.streams, function (X) {
                return B(X)
            });
            S(W.streams);
            this.dispatchEvent(new OT.SessionConnectEvent(OT.Event.names.SESSION_CONNECTED, W.connections, W.streams, W.archives))
        }, c = function (W) {
                h = false;
                F = false;
                OT.error(W.reason);
                this.trigger("sessionConnectFailed", W.reason);
                switch (W.code) {
                case 409:
                    TB.handleJsException("TB.SessionConnectionFailed :: The P2P session already has two participants.", OT.ExceptionCodes.CONNECT_REJECTED, {
                        session: this
                    });
                    break;
                case 410:
                    TB.handleJsException("TB.SessionConnectionFailed :: The session already has four participants.", OT.ExceptionCodes.CONNECT_REJECTED, {
                        session: this
                    });
                    break;
                default:
                    TB.handleJsException("TB.SessionConnectionFailed :: The session failed to connect.", OT.ExceptionCodes.CONNECT_FAILED, {
                        session: this
                    });
                    break
                }
            }, C = function (X, W) {
                TB.handleJsException(X, W, {
                    session: this
                })
            }, U = function (Y) {
                var X = new OT.SessionDisconnectEvent("sessionDisconnected", Y.reason);
                G.call(this);
                D.call(this);
                var W = function () {
                    if (!X.isDefaultPrevented()) {
                        i.call(this)
                    }
                };
                this.dispatchEvent(X, OT._.bind(W, this))
            }, K = function (W) {
                A[W.connection.connectionId] = W.connection;
                W.connections = [W.connection];
                delete W.connection;
                this.dispatchEvent(new OT.ConnectionEvent(OT.Event.names.CONNECTION_CREATED, W.connections))
            }, E = function (X) {
                if (n !== X.connection.connectionId) {
                    delete A[X.connection.connectionId]
                }
                for (var W in M) {
                    M[W].cleanupSubscriber(X.connection.connectionId)
                }
                X.connections = [X.connection];
                delete X.connection;
                this.dispatchEvent(new OT.ConnectionEvent(OT.Event.names.CONNECTION_DESTROYED, X.connections, X.reason))
            }, g = function (X) {
                OT.debug(X.streams);
                if (X.streams.length === 0) {
                    return
                }
                S(X.streams);
                var W;
                X.streams.forEach(function (Y) {
                    if (Y.publisherId) {
                        W = M[Y.publisherId];
                        delete Y.publisherId
                    } else {
                        W = this.getPublisherForStream(Y.id)
                    } if (W) {
                        W.stream = Y
                    }
                })
            }, w = function (W) {
                W.streams = OT._.filter(W.streams, B);
                OT.debug(W.streams);
                if (W.streams.length > 0) {
                    S(W.streams);
                    W.streams.forEach(function (Y) {
                        var X = v(Y.id);
                        if (X) {
                            X._.publishedToSessionHandler()
                        }
                    });
                    this.dispatchEvent(new OT.StreamEvent(OT.Event.names.STREAM_CREATED, W.streams, W.reason))
                }
            }, t = function (Y) {
                OT.debug(Y);
                var aa = {
                    orientation: "videoDimensions",
                    hasAudio: "hasAudio",
                    hasVideo: "hasVideo"
                };
                var ac = Y.key.split("/"),
                    ad = r(Y.streamId),
                    ae, ab, Z, X = Y.value,
                    W;
                ac = ac.length > 0 ? ac[ac.length - 1] : null;
                if (!ac || !aa[ac]) {
                    OT.warn("Unknown stream property was modified.");
                    return
                }
                ab = aa[ac];
                W = p(Y.streamId, ab, Y.value);
                if (ac === "orientation") {
                    ae = T[Y.streamId];
                    if (ae) {
                        ae.streamOrientationDidChange(Y.value.width, Y.value.height, Y.value.videoOrientation)
                    }
                    X = {
                        width: X.width,
                        height: X.height
                    }
                }
                this.dispatchEvent(new OT.StreamPropertyChangedEvent(OT.Event.names.STREAM_PROPERTY_CHANGED, ad, ab, W, X))
            }, b = function (Y) {
                if (Y.streams.length <= 0) {
                    return
                }
                Y.streams = OT._.filter(Y.streams, function (Z) {
                    return B(Z)
                });
                var X = new OT.StreamEvent("streamDestroyed", Y.streams, Y.reason);
                var W = function () {
                    var Z = !X.isDefaultPrevented();
                    Y.streams.forEach(function (ad) {
                        var ab = v(ad.id);
                        if (ab) {
                            ab.disconnect();
                            if (Z) {
                                u(ab)
                            }
                            delete M[ab.guid]
                        }
                        for (var ac in T) {
                            if (ac === ad.id) {
                                var aa = T[ac];
                                aa.disconnect();
                                if (Z) {
                                    this.unsubscribe(aa)
                                }
                                delete T[ac]
                            }
                        }
                        m(ad.id)
                    }, this)
                };
                this.dispatchEvent(X, OT._.bind(W, this))
            }, j = function (X) {
                OT.log("jsepMessageHandler: " + JSON.stringify(X));
                if (!A[X.fromAddress]) {
                    OT.warn("OT.Session.onMessage: Received peerConnectionData from an unknown connection.");
                    A[X.fromAddress] = new OT.Connection(X.fromAddress, new Date(), null, {
                        supportsWebRTC: true
                    })
                }
                if (X.hasOwnProperty("streamId")) {
                    var W = null;
                    if (X.type == OT.WebSocketMessageType.JSEP_SUBSCRIBE || X.type == OT.WebSocketMessageType.JSEP_UNSUBSCRIBE) {
                        W = v(X.streamId, true)
                    } else {
                        W = v(X.streamId, true) || T[X.streamId]
                    } if (!W) {
                        OT.warn("OT.Session.onMessage: Received peerConnectionData for an unknown publisher.");
                        return
                    }
                    W.processMessage(X.type, A[X.fromAddress], X)
                }
            }, k = function (X) {
                var W = new OT.SignalEvent("signalReceived", A[X.fromAddress]);
                this.dispatchEvent(W)
            }, G = function () {
                L = null;
                o = null;
                n = null;
                h = false;
                d = null;
                A = {};
                O = {}
            }, D = function () {
                for (var W in M) {
                    M[W].disconnect()
                }
                for (var X in T) {
                    T[X].disconnect()
                }
            }, u = function (W) {
                if (V[W.guid]) {
                    W.off("destroyed", V[W.guid]);
                    delete V[W.guid]
                }
                W.destroy()
            }, i = function () {
                for (var W in M) {
                    u(M[W])
                }
                M = {};
                V = {};
                for (var X in T) {
                    T[X].destroy()
                }
                T = {}
            }, I = function (W) {
                V[W.guid] = OT._.bind(function () {
                    this.unpublish(W)
                }, this);
                W.on("destroyed", V[W.guid])
            }, P = function () {
                TB.log("connectToMessenger");
                this.properties = {
                    requireConnectionObjects: true
                };
                var W = function (X) {
                    return function (Y) {
                        return function () {
                            return Y.apply(X, arguments)
                        }
                    }
                }(this);
                f = new OT.Messenger(this.sessionInfo.messagingServer, new OT.SessionMessageWrangler(this)).on({
                    SessionConnected: W(x),
                    SessionConnectFailed: W(c),
                    ConnectionClosed: W(U),
                    ConnectionCreated: W(K),
                    ConnectionDestroyed: W(E),
                    StreamRegistered: W(g),
                    StreamCreated: W(w),
                    StreamModified: W(t),
                    StreamDestroyed: W(b),
                    JSEPMessageReceived: W(j),
                    SignalReceived: W(k),
                    exception: W(C)
                });
                f.connect(s, o, {
                    requireConnectionObjects: this.properties.requireConnectionObjects,
                    p2pEnabled: this.sessionInfo.p2pEnabled,
                    widgetId: y,
                    partnerId: L
                })
            }, N = function () {
                if (F) {
                    OT.SessionInfo.get(this, OT._.bind(Q, this), function () {
                        F = false
                    })
                }
            }, Q = function (W) {
                if (F) {
                    this.sessionInfo = W;
                    if (this.sessionInfo.partnerId) {
                        L = this.sessionInfo.partnerId
                    }
                    P.call(this)
                }
            }, z = function (W) {
                return d[W] === 1
            };
        this.logEvent = function (Y, X, W, Z) {
            q.logEvent({
                action: Y,
                variation: X,
                payload_type: W,
                payload: Z,
                session_id: s,
                partner_id: L,
                widget_id: y,
                widget_type: "Controller"
            })
        };
        this.connect = function (Y, X, W) {
            if (h) {
                OT.warn("OT.Session: Cannot connect, already connected.");
                return
            }
            if (F) {
                OT.warn("OT.Session: Cannot connect, already connecting.");
                return
            }
            F = true;
            G.call(this);
            L = Y.toString();
            if (OT.APIKEY.length === 0) {
                OT.APIKEY = L
            }
            o = X;
            N.call(this)
        };
        this.disconnect = function () {
            F = false;
            if (f) {
                f.disconnect();
                f = null;
                R = false
            }
        };
        this.publish = function (Y, W) {
            var X;
            if (!h) {
                q.logError(1010, "tb.exception", "We need to be connected before you can publish", null, {
                    action: "publish",
                    variation: "Failure",
                    payload_type: "reason",
                    payload: "We need to be connected before you can publish",
                    session_id: s,
                    partner_id: L,
                    widgetId: y,
                    widget_type: "Controller"
                });
                X = "We need to be connected before you can publish";
                OT.error(X);
                throw new Error(X)
            }
            if (!z("publish")) {
                q.logEvent({
                    action: "publish",
                    variation: "Failure",
                    payload_type: "reason",
                    payload: "This token does not allow publishing. The role must be at least `publisher` to enable this functionality",
                    session_id: s,
                    partner_id: L,
                    widgetId: y,
                    widget_type: "Controller"
                });
                TB.handleJsException("This token does not allow publishing. The role must be at least `publisher` to enable this functionality", OT.ExceptionCodes.UNABLE_TO_PUBLISH, {
                    session: this
                });
                return null
            }
            if (!Y || typeof (Y) === "string") {
                Y = OT.initPublisher(this.apiKey, Y, W)
            } else {
                if (Y instanceof OT.rtc.Publisher || Y instanceof OT.flash.Publisher) {
                    if ("session" in Y && Y.session && "sessionId" in Y.session) {
                        if (Y.session.sessionId === this.sessionId) {
                            OT.warn("Cannot publish " + Y.guid + " again to " + this.sessionId + ". Please call session.unpublish(publisher) first.")
                        } else {
                            OT.warn("Cannot publish " + Y.guid + " publisher already attached to " + Y.session.sessionId + ". Please call session.unpublish(publisher) first.")
                        }
                    }
                } else {
                    X = "Session.publish :: First parameter passed in is neither a string nor an instance of the Publisher";
                    OT.error(X);
                    throw new Error(X)
                }
            }
            M[Y.guid] = Y;
            Y._.publishToSession(this);
            I.call(this, Y);
            return Y
        };
        this.unpublish = function (W) {
            if (!W) {
                OT.error("OT.Session.unpublish: publisher parameter missing.");
                return
            }
            W._.unpublishFromSession(this)
        };
        this.modifyStream = function (Y, W, X) {
            if (!Y || !W || !X) {
                OT.error("OT.Session.modifyStream: must provide streamId, key and value to modify a stream property.")
            }
            f.sendMessage(OT.WebSocketMessage.modifyStream(Y, W, X))
        };
        this.subscribe = function (aa, W, X) {
            var Z;
            if (!this.connection || !this.connection.connectionId) {
                Z = "Session.subscribe :: Connection required to subscribe";
                OT.error(Z);
                throw new Error(Z)
            }
            if (!aa) {
                Z = "Session.subscribe :: stream cannot be null";
                OT.error(Z);
                throw new Error(Z)
            }
            if (!aa.hasOwnProperty("streamId")) {
                Z = "Session.subscribe :: invalid stream object";
                OT.error(Z);
                throw new Error(Z)
            }
            var Y = new OT.rtc.Subscriber(W, OT._.extend(X || {}, {
                session: this
            }));
            T[aa.streamId] = Y;
            Y.subscribe(aa);
            return Y
        };
        this.unsubscribe = function (W) {
            if (!W) {
                var X = "OT.Session.unsubscribe: subscriber cannot be null";
                OT.error(X);
                throw new Error(X)
            }
            if (!W.stream) {
                OT.warn("OT.Session.unsubscribe:: tried to unsubscribe a subscriber that had no stream");
                return false
            }
            OT.debug("OT.Session.unsubscribe: subscriber " + W.id);
            delete T[W.stream.id];
            W.destroy();
            return true
        };
        this.getSubscribersForStream = function (W) {
            return [T[W.id]]
        };
        this.getPublisherForStream = function (X) {
            var W;
            if (typeof (X) == "string") {
                W = X
            } else {
                if (typeof (X) == "object" && X && X.hasOwnProperty("id")) {
                    W = X.id
                } else {
                    errorMsg = "Session.getPublisherForStream :: Invalid stream type";
                    OT.error(errorMsg);
                    throw new Error(errorMsg)
                }
            }
            return v(W)
        };
        this.sendMessage = function () {
            return f.sendMessage.apply(f, arguments)
        };
        this.sendJSEPMessage = function (Y, W, X) {
            if (f && f.connectionId) {
                f.sendMessage(OT.WebSocketMessage.jsepMessage(f.connectionId, Y.connectionId, W, X))
            } else {
                OT.warn("Session.sendJSEPMessage :: Tried to send a message without a _messenger")
            }
        };
        this.forceDisconnect = function (W) {
            if (z("forceDisconnect")) {
                var X = typeof (W) === "string" ? W : W.id;
                f.sendMessage(OT.WebSocketMessage.forceDisconnect(X))
            } else {
                TB.handleJsException("This token does not allow forceDisconnect. The role must be at least `moderator` to enable this functionality", OT.ExceptionCodes.UNABLE_TO_FORCE_DISCONNECT, {
                    session: this
                })
            }
        };
        this.forceUnpublish = function (W) {
            if (z("forceUnpublish")) {
                var X = typeof (W) === "string" ? W : W.id;
                f.sendMessage(OT.WebSocketMessage.forceUnpublish(X))
            } else {
                TB.handleJsException("This token does not allow forceUnpublish. The role must be at least `moderator` to enable this functionality", OT.ExceptionCodes.UNABLE_TO_FORCE_UNPUBLISH, {
                    session: this
                })
            }
        };
        this.getStateManager = function () {
            OT.warn("Fixme: Have not implemented session.getStateManager")
        };
        this.__defineGetter__("apiKey", function () {
            return L
        });
        this.__defineGetter__("token", function () {
            return o
        });
        this.__defineGetter__("connected", function () {
            return h
        });
        this.__defineGetter__("connection", function () {
            return A[n]
        });
        this.__defineSetter__("connection", function (W) {
            if (W.hasOwnProperty("connectionId")) {
                n = W.connectionId;
                A[n] = W
            }
        });
        this.__defineGetter__("capabilities", function () {
            return d
        });
        this.__defineGetter__("sessionId", function () {
            return s
        });
        this.__defineGetter__("id", function () {
            return s
        });
        this.__defineGetter__("connections", function () {
            return A
        });
        this.__defineGetter__("publishers", function () {
            return M
        })
    }
})(window);
(function (a) {
    OT.SessionMessageWrangler = function (f) {
        var d = function (g) {
            return new OT.Connection(g.connectionId, g.creationTime, g.data, {
                supportsWebRTC: g.supportsWebRTC
            })
        }, e = function (g) {
                return Object.keys(g).map(function (h) {
                    return d(g[h])
                })
            }, b = function (h, g) {
                function i(n) {
                    if (f.connections[h.connection.connectionId]) {
                        return f.connections[h.connection.connectionId]
                    } else {
                        if (g) {
                            for (var k = 0, m = g.length; k < m; ++k) {
                                if (n === g[k].id) {
                                    return g[k]
                                }
                            }
                        }
                    }
                    return null
                }

                var j = new OT.Stream(h.streamId, i(h.connection.connectionId), h.name, h.streamData, h.type, h.creationTime, h.hasAudio, h.hasVideo, h.orientation ? h.orientation : {
                    videoOrientation: OT.VideoOrientation.ROTATED_NORMAL,
                    width: 640,
                    height: 480
                }, f.id, h.peerId, h.quality, h.orientation ? h.orientation.width : 640, h.orientation ? h.orientation.height : 480);
                if (h.publisherId) {
                    j.publisherId = h.publisherId
                }
                return j
            }, c = function (i, h) {
                var k = [];
                for (var g in i) {
                    if (i.hasOwnProperty(g)) {
                        var j = b(i[g], h);
                        if (j) {
                            k.push(j)
                        }
                    }
                }
                return k
            };
        this.wrangle = function (g) {
            if (g.sessionState) {
                if (g.sessionState.CONNECTIONS) {
                    g.connections = e(g.sessionState.CONNECTIONS)
                }
                if (g.sessionState.STREAMS) {
                    g.streams = c(g.sessionState.STREAMS, g.connections)
                }
            } else {
                if (g.streams) {
                    g.streams = c(g.streams, g.connections)
                }
                if (g.connection) {
                    g.connection = d(g.connection)
                }
            }
            return g
        }
    }
})(window);
(function (a) {
    OT.onLoad(function () {
        var c = document.createElement("link");
        c.type = "text/css";
        c.media = "screen";
        c.rel = "stylesheet";
        c.href = OT.BUILD_PROPERTIES.cssURL + "/ot.css";
        var b = document.head || document.getElementsByTagName("head")[0];
        b.appendChild(c)
    })
})(window);