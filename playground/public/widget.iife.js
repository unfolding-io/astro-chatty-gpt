var fu = Object.defineProperty;
var po = (se) => {
	throw TypeError(se);
};
var hu = (se, re, L) =>
	re in se
		? fu(se, re, { enumerable: !0, configurable: !0, writable: !0, value: L })
		: (se[re] = L);
var K = (se, re, L) => hu(se, typeof re != "symbol" ? re + "" : re, L),
	pu = (se, re, L) => re.has(se) || po("Cannot " + L);
var go = (se, re, L) =>
	re.has(se)
		? po("Cannot add the same private member more than once")
		: re instanceof WeakSet
			? re.add(se)
			: re.set(se, L);
var Xn = (se, re, L) => (pu(se, re, "access private method"), L);
((se) => {
	var xt, Xs, mo;
	function re(e) {
		const t = Object.create(null);
		for (const n of e.split(",")) t[n] = 1;
		return (n) => n in t;
	}
	const L = {},
		St = [],
		je = () => {},
		er = () => !1,
		dn = (e) =>
			e.charCodeAt(0) === 111 &&
			e.charCodeAt(1) === 110 &&
			(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
		es = (e) => e.startsWith("onUpdate:"),
		ae = Object.assign,
		ts = (e, t) => {
			const n = e.indexOf(t);
			n > -1 && e.splice(n, 1);
		},
		vo = Object.prototype.hasOwnProperty,
		H = (e, t) => vo.call(e, t),
		j = Array.isArray,
		Ct = (e) => gn(e) === "[object Map]",
		tr = (e) => gn(e) === "[object Set]",
		D = (e) => typeof e == "function",
		te = (e) => typeof e == "string",
		rt = (e) => typeof e == "symbol",
		X = (e) => e !== null && typeof e == "object",
		nr = (e) => (X(e) || D(e)) && D(e.then) && D(e.catch),
		sr = Object.prototype.toString,
		gn = (e) => sr.call(e),
		yo = (e) => gn(e).slice(8, -1),
		rr = (e) => gn(e) === "[object Object]",
		ns = (e) =>
			te(e) && e !== "NaN" && e[0] !== "-" && "" + Number.parseInt(e, 10) === e,
		Ft = re(
			",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
		),
		mn = (e) => {
			const t = Object.create(null);
			return (n) => t[n] || (t[n] = e(n));
		},
		bo = /-\w/g,
		it = mn((e) => e.replace(bo, (t) => t.slice(1).toUpperCase())),
		wo = /\B([A-Z])/g,
		pt = mn((e) => e.replace(wo, "-$1").toLowerCase()),
		ir = mn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
		ss = mn((e) => (e ? `on${ir(e)}` : "")),
		ot = (e, t) => !Object.is(e, t),
		vn = (e, ...t) => {
			for (let n = 0; n < e.length; n++) e[n](...t);
		},
		or = (e, t, n, s = !1) => {
			Object.defineProperty(e, t, {
				configurable: !0,
				enumerable: !1,
				writable: s,
				value: n,
			});
		},
		rs = (e) => {
			const t = Number.parseFloat(e);
			return isNaN(t) ? e : t;
		};
	let lr;
	const yn = () =>
		lr ||
		(lr =
			typeof globalThis < "u"
				? globalThis
				: typeof self < "u"
					? self
					: typeof window < "u"
						? window
						: typeof global < "u"
							? global
							: {});
	function bn(e) {
		if (j(e)) {
			const t = {};
			for (let n = 0; n < e.length; n++) {
				const s = e[n],
					r = te(s) ? To(s) : bn(s);
				if (r) for (const i in r) t[i] = r[i];
			}
			return t;
		}
		if (te(e) || X(e)) return e;
	}
	const ko = /;(?![^(]*\))/g,
		xo = /:([^]+)/,
		_o = /\/\*[^]*?\*\//g;
	function To(e) {
		const t = {};
		return (
			e
				.replace(_o, "")
				.split(ko)
				.forEach((n) => {
					if (n) {
						const s = n.split(xo);
						s.length > 1 && (t[s[0].trim()] = s[1].trim());
					}
				}),
			t
		);
	}
	function Mt(e) {
		let t = "";
		if (te(e)) t = e;
		else if (j(e))
			for (let n = 0; n < e.length; n++) {
				const s = Mt(e[n]);
				s && (t += s + " ");
			}
		else if (X(e)) for (const n in e) e[n] && (t += n + " ");
		return t.trim();
	}
	const So = re(
		"itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	);
	function ar(e) {
		return !!e || e === "";
	}
	const cr = (e) => !!(e && e.__v_isRef === !0),
		De = (e) =>
			te(e)
				? e
				: e == null
					? ""
					: j(e) || (X(e) && (e.toString === sr || !D(e.toString)))
						? cr(e)
							? De(e.value)
							: JSON.stringify(e, ur, 2)
						: String(e),
		ur = (e, t) =>
			cr(t)
				? ur(e, t.value)
				: Ct(t)
					? {
							[`Map(${t.size})`]: [...t.entries()].reduce(
								(n, [s, r], i) => ((n[is(s, i) + " =>"] = r), n),
								{},
							),
						}
					: tr(t)
						? { [`Set(${t.size})`]: [...t.values()].map((n) => is(n)) }
						: rt(t)
							? is(t)
							: X(t) && !j(t) && !rr(t)
								? String(t)
								: t,
		is = (e, t = "") => {
			var n;
			return rt(e) ? `Symbol(${((n = e.description)) != null ? n : t})` : e;
		}; /**
	 * @vue/reactivity v3.5.21
	 * (c) 2018-present Yuxi (Evan) You and Vue contributors
	 * @license MIT
	 **/
	let ce;
	class Co {
		constructor(t = !1) {
			(this.detached = t),
				(this._active = !0),
				(this._on = 0),
				(this.effects = []),
				(this.cleanups = []),
				(this._isPaused = !1),
				(this.parent = ce),
				!t &&
					ce &&
					(this.index = (ce.scopes || (ce.scopes = [])).push(this) - 1);
		}
		get active() {
			return this._active;
		}
		pause() {
			if (this._active) {
				this._isPaused = !0;
				let t, n;
				if (this.scopes)
					for (t = 0, n = this.scopes.length; t < n; t++)
						this.scopes[t].pause();
				for (t = 0, n = this.effects.length; t < n; t++)
					this.effects[t].pause();
			}
		}
		resume() {
			if (this._active && this._isPaused) {
				this._isPaused = !1;
				let t, n;
				if (this.scopes)
					for (t = 0, n = this.scopes.length; t < n; t++)
						this.scopes[t].resume();
				for (t = 0, n = this.effects.length; t < n; t++)
					this.effects[t].resume();
			}
		}
		run(t) {
			if (this._active) {
				const n = ce;
				try {
					return (ce = this), t();
				} finally {
					ce = n;
				}
			}
		}
		on() {
			++this._on === 1 && ((this.prevScope = ce), (ce = this));
		}
		off() {
			this._on > 0 &&
				--this._on === 0 &&
				((ce = this.prevScope), (this.prevScope = void 0));
		}
		stop(t) {
			if (this._active) {
				this._active = !1;
				let n, s;
				for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
				for (
					this.effects.length = 0, n = 0, s = this.cleanups.length;
					n < s;
					n++
				)
					this.cleanups[n]();
				if (((this.cleanups.length = 0), this.scopes)) {
					for (n = 0, s = this.scopes.length; n < s; n++)
						this.scopes[n].stop(!0);
					this.scopes.length = 0;
				}
				if (!this.detached && this.parent && !t) {
					const r = this.parent.scopes.pop();
					r &&
						r !== this &&
						((this.parent.scopes[this.index] = r), (r.index = this.index));
				}
				this.parent = void 0;
			}
		}
	}
	function fr() {
		return ce;
	}
	function Mo(e, t = !1) {
		ce && ce.cleanups.push(e);
	}
	let Z;
	const os = new WeakSet();
	class hr {
		constructor(t) {
			(this.fn = t),
				(this.deps = void 0),
				(this.depsTail = void 0),
				(this.flags = 5),
				(this.next = void 0),
				(this.cleanup = void 0),
				(this.scheduler = void 0),
				ce && ce.active && ce.effects.push(this);
		}
		pause() {
			this.flags |= 64;
		}
		resume() {
			this.flags & 64 &&
				((this.flags &= -65),
				os.has(this) && (os.delete(this), this.trigger()));
		}
		notify() {
			(this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || dr(this);
		}
		run() {
			if (!(this.flags & 1)) return this.fn();
			(this.flags |= 2), br(this), gr(this);
			const t = Z,
				n = Pe;
			(Z = this), (Pe = !0);
			try {
				return this.fn();
			} finally {
				mr(this), (Z = t), (Pe = n), (this.flags &= -3);
			}
		}
		stop() {
			if (this.flags & 1) {
				for (let t = this.deps; t; t = t.nextDep) us(t);
				(this.deps = this.depsTail = void 0),
					br(this),
					this.onStop && this.onStop(),
					(this.flags &= -2);
			}
		}
		trigger() {
			this.flags & 64
				? os.add(this)
				: this.scheduler
					? this.scheduler()
					: this.runIfDirty();
		}
		runIfDirty() {
			cs(this) && this.run();
		}
		get dirty() {
			return cs(this);
		}
	}
	let pr = 0,
		Ht,
		Ut;
	function dr(e, t = !1) {
		if (((e.flags |= 8), t)) {
			(e.next = Ut), (Ut = e);
			return;
		}
		(e.next = Ht), (Ht = e);
	}
	function ls() {
		pr++;
	}
	function as() {
		if (--pr > 0) return;
		if (Ut) {
			let t = Ut;
			for (Ut = void 0; t; ) {
				const n = t.next;
				(t.next = void 0), (t.flags &= -9), (t = n);
			}
		}
		let e;
		for (; Ht; ) {
			let t = Ht;
			for (Ht = void 0; t; ) {
				const n = t.next;
				if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
					try {
						t.trigger();
					} catch (s) {
						e || (e = s);
					}
				t = n;
			}
		}
		if (e) throw e;
	}
	function gr(e) {
		for (let t = e.deps; t; t = t.nextDep)
			(t.version = -1),
				(t.prevActiveLink = t.dep.activeLink),
				(t.dep.activeLink = t);
	}
	function mr(e) {
		let t,
			n = e.depsTail,
			s = n;
		for (; s; ) {
			const r = s.prevDep;
			s.version === -1 ? (s === n && (n = r), us(s), Eo(s)) : (t = s),
				(s.dep.activeLink = s.prevActiveLink),
				(s.prevActiveLink = void 0),
				(s = r);
		}
		(e.deps = t), (e.depsTail = n);
	}
	function cs(e) {
		for (let t = e.deps; t; t = t.nextDep)
			if (
				t.dep.version !== t.version ||
				(t.dep.computed && (vr(t.dep.computed) || t.dep.version !== t.version))
			)
				return !0;
		return !!e._dirty;
	}
	function vr(e) {
		if (
			(e.flags & 4 && !(e.flags & 16)) ||
			((e.flags &= -17), e.globalVersion === Vt) ||
			((e.globalVersion = Vt),
			!e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !cs(e)))
		)
			return;
		e.flags |= 2;
		const t = e.dep,
			n = Z,
			s = Pe;
		(Z = e), (Pe = !0);
		try {
			gr(e);
			const r = e.fn(e._value);
			(t.version === 0 || ot(r, e._value)) &&
				((e.flags |= 128), (e._value = r), t.version++);
		} catch (r) {
			throw (t.version++, r);
		} finally {
			(Z = n), (Pe = s), mr(e), (e.flags &= -3);
		}
	}
	function us(e, t = !1) {
		const { dep: n, prevSub: s, nextSub: r } = e;
		if (
			(s && ((s.nextSub = r), (e.prevSub = void 0)),
			r && ((r.prevSub = s), (e.nextSub = void 0)),
			n.subs === e && ((n.subs = s), !s && n.computed))
		) {
			n.computed.flags &= -5;
			for (let i = n.computed.deps; i; i = i.nextDep) us(i, !0);
		}
		!t && !--n.sc && n.map && n.map.delete(n.key);
	}
	function Eo(e) {
		const { prevDep: t, nextDep: n } = e;
		t && ((t.nextDep = n), (e.prevDep = void 0)),
			n && ((n.prevDep = t), (e.nextDep = void 0));
	}
	let Pe = !0;
	const yr = [];
	function ze() {
		yr.push(Pe), (Pe = !1);
	}
	function Le() {
		const e = yr.pop();
		Pe = e === void 0 ? !0 : e;
	}
	function br(e) {
		const { cleanup: t } = e;
		if (((e.cleanup = void 0), t)) {
			const n = Z;
			Z = void 0;
			try {
				t();
			} finally {
				Z = n;
			}
		}
	}
	let Vt = 0;
	class Po {
		constructor(t, n) {
			(this.sub = t),
				(this.dep = n),
				(this.version = n.version),
				(this.nextDep =
					this.prevDep =
					this.nextSub =
					this.prevSub =
					this.prevActiveLink =
						void 0);
		}
	}
	class fs {
		constructor(t) {
			(this.computed = t),
				(this.version = 0),
				(this.activeLink = void 0),
				(this.subs = void 0),
				(this.map = void 0),
				(this.key = void 0),
				(this.sc = 0),
				(this.__v_skip = !0);
		}
		track(t) {
			if (!Z || !Pe || Z === this.computed) return;
			let n = this.activeLink;
			if (n === void 0 || n.sub !== Z)
				(n = this.activeLink = new Po(Z, this)),
					Z.deps
						? ((n.prevDep = Z.depsTail),
							(Z.depsTail.nextDep = n),
							(Z.depsTail = n))
						: (Z.deps = Z.depsTail = n),
					wr(n);
			else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
				const s = n.nextDep;
				(s.prevDep = n.prevDep),
					n.prevDep && (n.prevDep.nextDep = s),
					(n.prevDep = Z.depsTail),
					(n.nextDep = void 0),
					(Z.depsTail.nextDep = n),
					(Z.depsTail = n),
					Z.deps === n && (Z.deps = s);
			}
			return n;
		}
		trigger(t) {
			this.version++, Vt++, this.notify(t);
		}
		notify(t) {
			ls();
			try {
				for (let n = this.subs; n; n = n.prevSub)
					n.sub.notify() && n.sub.dep.notify();
			} finally {
				as();
			}
		}
	}
	function wr(e) {
		if ((e.dep.sc++, e.sub.flags & 4)) {
			const t = e.dep.computed;
			if (t && !e.dep.subs) {
				t.flags |= 20;
				for (let s = t.deps; s; s = s.nextDep) wr(s);
			}
			const n = e.dep.subs;
			n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e);
		}
	}
	const hs = new WeakMap(),
		dt = Symbol(""),
		ps = Symbol(""),
		Wt = Symbol("");
	function ue(e, t, n) {
		if (Pe && Z) {
			let s = hs.get(e);
			s || hs.set(e, (s = new Map()));
			let r = s.get(n);
			r || (s.set(n, (r = new fs())), (r.map = s), (r.key = n)), r.track();
		}
	}
	function Qe(e, t, n, s, r, i) {
		const o = hs.get(e);
		if (!o) {
			Vt++;
			return;
		}
		const l = (a) => {
			a && a.trigger();
		};
		if ((ls(), t === "clear")) o.forEach(l);
		else {
			const a = j(e),
				h = a && ns(n);
			if (a && n === "length") {
				const u = Number(s);
				o.forEach((p, g) => {
					(g === "length" || g === Wt || (!rt(g) && g >= u)) && l(p);
				});
			} else
				switch (
					((n !== void 0 || o.has(void 0)) && l(o.get(n)), h && l(o.get(Wt)), t)
				) {
					case "add":
						a ? h && l(o.get("length")) : (l(o.get(dt)), Ct(e) && l(o.get(ps)));
						break;
					case "delete":
						a || (l(o.get(dt)), Ct(e) && l(o.get(ps)));
						break;
					case "set":
						Ct(e) && l(o.get(dt));
						break;
				}
		}
		as();
	}
	function Et(e) {
		const t = B(e);
		return t === e ? t : (ue(t, "iterate", Wt), Me(e) ? t : t.map(ie));
	}
	function wn(e) {
		return ue((e = B(e)), "iterate", Wt), e;
	}
	const Io = {
		__proto__: null,
		[Symbol.iterator]() {
			return ds(this, Symbol.iterator, ie);
		},
		concat(...e) {
			return Et(this).concat(...e.map((t) => (j(t) ? Et(t) : t)));
		},
		entries() {
			return ds(this, "entries", (e) => ((e[1] = ie(e[1])), e));
		},
		every(e, t) {
			return Ye(this, "every", e, t, void 0, arguments);
		},
		filter(e, t) {
			return Ye(this, "filter", e, t, (n) => n.map(ie), arguments);
		},
		find(e, t) {
			return Ye(this, "find", e, t, ie, arguments);
		},
		findIndex(e, t) {
			return Ye(this, "findIndex", e, t, void 0, arguments);
		},
		findLast(e, t) {
			return Ye(this, "findLast", e, t, ie, arguments);
		},
		findLastIndex(e, t) {
			return Ye(this, "findLastIndex", e, t, void 0, arguments);
		},
		forEach(e, t) {
			return Ye(this, "forEach", e, t, void 0, arguments);
		},
		includes(...e) {
			return gs(this, "includes", e);
		},
		indexOf(...e) {
			return gs(this, "indexOf", e);
		},
		join(e) {
			return Et(this).join(e);
		},
		lastIndexOf(...e) {
			return gs(this, "lastIndexOf", e);
		},
		map(e, t) {
			return Ye(this, "map", e, t, void 0, arguments);
		},
		pop() {
			return Kt(this, "pop");
		},
		push(...e) {
			return Kt(this, "push", e);
		},
		reduce(e, ...t) {
			return kr(this, "reduce", e, t);
		},
		reduceRight(e, ...t) {
			return kr(this, "reduceRight", e, t);
		},
		shift() {
			return Kt(this, "shift");
		},
		some(e, t) {
			return Ye(this, "some", e, t, void 0, arguments);
		},
		splice(...e) {
			return Kt(this, "splice", e);
		},
		toReversed() {
			return Et(this).toReversed();
		},
		toSorted(e) {
			return Et(this).toSorted(e);
		},
		toSpliced(...e) {
			return Et(this).toSpliced(...e);
		},
		unshift(...e) {
			return Kt(this, "unshift", e);
		},
		values() {
			return ds(this, "values", ie);
		},
	};
	function ds(e, t, n) {
		const s = wn(e),
			r = s[t]();
		return (
			s !== e &&
				!Me(e) &&
				((r._next = r.next),
				(r.next = () => {
					const i = r._next();
					return i.value && (i.value = n(i.value)), i;
				})),
			r
		);
	}
	const Ro = Array.prototype;
	function Ye(e, t, n, s, r, i) {
		const o = wn(e),
			l = o !== e && !Me(e),
			a = o[t];
		if (a !== Ro[t]) {
			const p = a.apply(e, i);
			return l ? ie(p) : p;
		}
		let h = n;
		o !== e &&
			(l
				? (h = function (p, g) {
						return n.call(this, ie(p), g, e);
					})
				: n.length > 2 &&
					(h = function (p, g) {
						return n.call(this, p, g, e);
					}));
		const u = a.call(o, h, s);
		return l && r ? r(u) : u;
	}
	function kr(e, t, n, s) {
		const r = wn(e);
		let i = n;
		return (
			r !== e &&
				(Me(e)
					? n.length > 3 &&
						(i = function (o, l, a) {
							return n.call(this, o, l, a, e);
						})
					: (i = function (o, l, a) {
							return n.call(this, o, ie(l), a, e);
						})),
			r[t](i, ...s)
		);
	}
	function gs(e, t, n) {
		const s = B(e);
		ue(s, "iterate", Wt);
		const r = s[t](...n);
		return (r === -1 || r === !1) && ys(n[0])
			? ((n[0] = B(n[0])), s[t](...n))
			: r;
	}
	function Kt(e, t, n = []) {
		ze(), ls();
		const s = B(e)[t].apply(e, n);
		return as(), Le(), s;
	}
	const Ao = re("__proto__,__v_isRef,__isVue"),
		xr = new Set(
			Object.getOwnPropertyNames(Symbol)
				.filter((e) => e !== "arguments" && e !== "caller")
				.map((e) => Symbol[e])
				.filter(rt),
		);
	function jo(e) {
		rt(e) || (e = String(e));
		const t = B(this);
		return ue(t, "has", e), Object.hasOwn(t, e);
	}
	class _r {
		constructor(t = !1, n = !1) {
			(this._isReadonly = t), (this._isShallow = n);
		}
		get(t, n, s) {
			if (n === "__v_skip") return t.__v_skip;
			const r = this._isReadonly,
				i = this._isShallow;
			if (n === "__v_isReactive") return !r;
			if (n === "__v_isReadonly") return r;
			if (n === "__v_isShallow") return i;
			if (n === "__v_raw")
				return s === (r ? (i ? Pr : Er) : i ? Mr : Cr).get(t) ||
					Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
					? t
					: void 0;
			const o = j(t);
			if (!r) {
				let a;
				if (o && (a = Io[n])) return a;
				if (n === "hasOwnProperty") return jo;
			}
			const l = Reflect.get(t, n, oe(t) ? t : s);
			return (rt(n) ? xr.has(n) : Ao(n)) || (r || ue(t, "get", n), i)
				? l
				: oe(l)
					? o && ns(n)
						? l
						: l.value
					: X(l)
						? r
							? Ir(l)
							: vs(l)
						: l;
		}
	}
	class Tr extends _r {
		constructor(t = !1) {
			super(!1, t);
		}
		set(t, n, s, r) {
			let i = t[n];
			if (!this._isShallow) {
				const a = lt(i);
				if (
					(!Me(s) && !lt(s) && ((i = B(i)), (s = B(s))),
					!j(t) && oe(i) && !oe(s))
				)
					return a || (i.value = s), !0;
			}
			const o = j(t) && ns(n) ? Number(n) < t.length : H(t, n),
				l = Reflect.set(t, n, s, oe(t) ? t : r);
			return (
				t === B(r) && (o ? ot(s, i) && Qe(t, "set", n, s) : Qe(t, "add", n, s)),
				l
			);
		}
		deleteProperty(t, n) {
			const s = H(t, n);
			t[n];
			const r = Reflect.deleteProperty(t, n);
			return r && s && Qe(t, "delete", n, void 0), r;
		}
		has(t, n) {
			const s = Reflect.has(t, n);
			return (!rt(n) || !xr.has(n)) && ue(t, "has", n), s;
		}
		ownKeys(t) {
			return ue(t, "iterate", j(t) ? "length" : dt), Reflect.ownKeys(t);
		}
	}
	class Sr extends _r {
		constructor(t = !1) {
			super(!0, t);
		}
		set(t, n) {
			return !0;
		}
		deleteProperty(t, n) {
			return !0;
		}
	}
	const Do = new Tr(),
		zo = new Sr(),
		Lo = new Tr(!0),
		$o = new Sr(!0),
		ms = (e) => e,
		kn = (e) => Reflect.getPrototypeOf(e);
	function Oo(e, t, n) {
		return function (...s) {
			const r = this.__v_raw,
				i = B(r),
				o = Ct(i),
				l = e === "entries" || (e === Symbol.iterator && o),
				a = e === "keys" && o,
				h = r[e](...s),
				u = n ? ms : t ? Sn : ie;
			return (
				!t && ue(i, "iterate", a ? ps : dt),
				{
					next() {
						const { value: p, done: g } = h.next();
						return g
							? { value: p, done: g }
							: { value: l ? [u(p[0]), u(p[1])] : u(p), done: g };
					},
					[Symbol.iterator]() {
						return this;
					},
				}
			);
		};
	}
	function xn(e) {
		return function (...t) {
			return e === "delete" ? !1 : e === "clear" ? void 0 : this;
		};
	}
	function Bo(e, t) {
		const n = {
			get(r) {
				const i = this.__v_raw,
					o = B(i),
					l = B(r);
				e || (ot(r, l) && ue(o, "get", r), ue(o, "get", l));
				const { has: a } = kn(o),
					h = t ? ms : e ? Sn : ie;
				if (a.call(o, r)) return h(i.get(r));
				if (a.call(o, l)) return h(i.get(l));
				i !== o && i.get(r);
			},
			get size() {
				const r = this.__v_raw;
				return !e && ue(B(r), "iterate", dt), r.size;
			},
			has(r) {
				const i = this.__v_raw,
					o = B(i),
					l = B(r);
				return (
					e || (ot(r, l) && ue(o, "has", r), ue(o, "has", l)),
					r === l ? i.has(r) : i.has(r) || i.has(l)
				);
			},
			forEach(r, i) {
				const l = this.__v_raw,
					a = B(l),
					h = t ? ms : e ? Sn : ie;
				return (
					!e && ue(a, "iterate", dt),
					l.forEach((u, p) => r.call(i, h(u), h(p), this))
				);
			},
		};
		return (
			ae(
				n,
				e
					? {
							add: xn("add"),
							set: xn("set"),
							delete: xn("delete"),
							clear: xn("clear"),
						}
					: {
							add(r) {
								!t && !Me(r) && !lt(r) && (r = B(r));
								const i = B(this);
								return (
									kn(i).has.call(i, r) || (i.add(r), Qe(i, "add", r, r)), this
								);
							},
							set(r, i) {
								!t && !Me(i) && !lt(i) && (i = B(i));
								const o = B(this),
									{ has: l, get: a } = kn(o);
								let h = l.call(o, r);
								h || ((r = B(r)), (h = l.call(o, r)));
								const u = a.call(o, r);
								return (
									o.set(r, i),
									h ? ot(i, u) && Qe(o, "set", r, i) : Qe(o, "add", r, i),
									this
								);
							},
							delete(r) {
								const i = B(this),
									{ has: o, get: l } = kn(i);
								let a = o.call(i, r);
								a || ((r = B(r)), (a = o.call(i, r))), l && l.call(i, r);
								const h = i.delete(r);
								return a && Qe(i, "delete", r, void 0), h;
							},
							clear() {
								const r = B(this),
									i = r.size !== 0,
									o = r.clear();
								return i && Qe(r, "clear", void 0, void 0), o;
							},
						},
			),
			["keys", "values", "entries", Symbol.iterator].forEach((r) => {
				n[r] = Oo(r, e, t);
			}),
			n
		);
	}
	function _n(e, t) {
		const n = Bo(e, t);
		return (s, r, i) =>
			r === "__v_isReactive"
				? !e
				: r === "__v_isReadonly"
					? e
					: r === "__v_raw"
						? s
						: Reflect.get(H(n, r) && r in s ? n : s, r, i);
	}
	const No = { get: _n(!1, !1) },
		Fo = { get: _n(!1, !0) },
		Ho = { get: _n(!0, !1) },
		Uo = { get: _n(!0, !0) },
		Cr = new WeakMap(),
		Mr = new WeakMap(),
		Er = new WeakMap(),
		Pr = new WeakMap();
	function Vo(e) {
		switch (e) {
			case "Object":
			case "Array":
				return 1;
			case "Map":
			case "Set":
			case "WeakMap":
			case "WeakSet":
				return 2;
			default:
				return 0;
		}
	}
	function Wo(e) {
		return e.__v_skip || !Object.isExtensible(e) ? 0 : Vo(yo(e));
	}
	function vs(e) {
		return lt(e) ? e : Tn(e, !1, Do, No, Cr);
	}
	function Ko(e) {
		return Tn(e, !1, Lo, Fo, Mr);
	}
	function Ir(e) {
		return Tn(e, !0, zo, Ho, Er);
	}
	function gu(e) {
		return Tn(e, !0, $o, Uo, Pr);
	}
	function Tn(e, t, n, s, r) {
		if (!X(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
		const i = Wo(e);
		if (i === 0) return e;
		const o = r.get(e);
		if (o) return o;
		const l = new Proxy(e, i === 2 ? s : n);
		return r.set(e, l), l;
	}
	function Pt(e) {
		return lt(e) ? Pt(e.__v_raw) : !!(e && e.__v_isReactive);
	}
	function lt(e) {
		return !!(e && e.__v_isReadonly);
	}
	function Me(e) {
		return !!(e && e.__v_isShallow);
	}
	function ys(e) {
		return e ? !!e.__v_raw : !1;
	}
	function B(e) {
		const t = e && e.__v_raw;
		return t ? B(t) : e;
	}
	function qo(e) {
		return (
			!H(e, "__v_skip") && Object.isExtensible(e) && or(e, "__v_skip", !0), e
		);
	}
	const ie = (e) => (X(e) ? vs(e) : e),
		Sn = (e) => (X(e) ? Ir(e) : e);
	function oe(e) {
		return e ? e.__v_isRef === !0 : !1;
	}
	function gt(e) {
		return Rr(e, !1);
	}
	function Zo(e) {
		return Rr(e, !0);
	}
	function Rr(e, t) {
		return oe(e) ? e : new Jo(e, t);
	}
	class Jo {
		constructor(t, n) {
			(this.dep = new fs()),
				(this.__v_isRef = !0),
				(this.__v_isShallow = !1),
				(this._rawValue = n ? t : B(t)),
				(this._value = n ? t : ie(t)),
				(this.__v_isShallow = n);
		}
		get value() {
			return this.dep.track(), this._value;
		}
		set value(t) {
			const n = this._rawValue,
				s = this.__v_isShallow || Me(t) || lt(t);
			(t = s ? t : B(t)),
				ot(t, n) &&
					((this._rawValue = t),
					(this._value = s ? t : ie(t)),
					this.dep.trigger());
		}
	}
	function qt(e) {
		return oe(e) ? e.value : e;
	}
	const Go = {
		get: (e, t, n) => (t === "__v_raw" ? e : qt(Reflect.get(e, t, n))),
		set: (e, t, n, s) => {
			const r = e[t];
			return oe(r) && !oe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
		},
	};
	function Ar(e) {
		return Pt(e) ? e : new Proxy(e, Go);
	}
	class Qo {
		constructor(t, n, s) {
			(this.fn = t),
				(this.setter = n),
				(this._value = void 0),
				(this.dep = new fs(this)),
				(this.__v_isRef = !0),
				(this.deps = void 0),
				(this.depsTail = void 0),
				(this.flags = 16),
				(this.globalVersion = Vt - 1),
				(this.next = void 0),
				(this.effect = this),
				(this.__v_isReadonly = !n),
				(this.isSSR = s);
		}
		notify() {
			if (((this.flags |= 16), !(this.flags & 8) && Z !== this))
				return dr(this, !0), !0;
		}
		get value() {
			const t = this.dep.track();
			return vr(this), t && (t.version = this.dep.version), this._value;
		}
		set value(t) {
			this.setter && this.setter(t);
		}
	}
	function Yo(e, t, n = !1) {
		let s, r;
		return D(e) ? (s = e) : ((s = e.get), (r = e.set)), new Qo(s, r, n);
	}
	const Cn = {},
		Mn = new WeakMap();
	let mt;
	function Xo(e, t = !1, n = mt) {
		if (n) {
			let s = Mn.get(n);
			s || Mn.set(n, (s = [])), s.push(e);
		}
	}
	function el(e, t, n = L) {
		const {
				immediate: s,
				deep: r,
				once: i,
				scheduler: o,
				augmentJob: l,
				call: a,
			} = n,
			h = (P) => (r ? P : Me(P) || r === !1 || r === 0 ? Xe(P, 1) : Xe(P));
		let u,
			p,
			g,
			w,
			E = !1,
			R = !1;
		if (
			(oe(e)
				? ((p = () => e.value), (E = Me(e)))
				: Pt(e)
					? ((p = () => h(e)), (E = !0))
					: j(e)
						? ((R = !0),
							(E = e.some((P) => Pt(P) || Me(P))),
							(p = () =>
								e.map((P) => {
									if (oe(P)) return P.value;
									if (Pt(P)) return h(P);
									if (D(P)) return a ? a(P, 2) : P();
								})))
						: D(e)
							? t
								? (p = a ? () => a(e, 2) : e)
								: (p = () => {
										if (g) {
											ze();
											try {
												g();
											} finally {
												Le();
											}
										}
										const P = mt;
										mt = u;
										try {
											return a ? a(e, 3, [w]) : e(w);
										} finally {
											mt = P;
										}
									})
							: (p = je),
			t && r)
		) {
			const P = p,
				Y = r === !0 ? 1 / 0 : r;
			p = () => Xe(P(), Y);
		}
		const Q = fr(),
			z = () => {
				u.stop(), Q && Q.active && ts(Q.effects, u);
			};
		if (i && t) {
			const P = t;
			t = (...Y) => {
				P(...Y), z();
			};
		}
		let U = R ? new Array(e.length).fill(Cn) : Cn;
		const q = (P) => {
			if (!(!(u.flags & 1) || (!u.dirty && !P)))
				if (t) {
					const Y = u.run();
					if (r || E || (R ? Y.some((ee, S) => ot(ee, U[S])) : ot(Y, U))) {
						g && g();
						const ee = mt;
						mt = u;
						try {
							const S = [Y, U === Cn ? void 0 : R && U[0] === Cn ? [] : U, w];
							(U = Y), a ? a(t, 3, S) : t(...S);
						} finally {
							mt = ee;
						}
					}
				} else u.run();
		};
		return (
			l && l(q),
			(u = new hr(p)),
			(u.scheduler = o ? () => o(q, !1) : q),
			(w = (P) => Xo(P, !1, u)),
			(g = u.onStop =
				() => {
					const P = Mn.get(u);
					if (P) {
						if (a) a(P, 4);
						else for (const Y of P) Y();
						Mn.delete(u);
					}
				}),
			t ? (s ? q(!0) : (U = u.run())) : o ? o(q.bind(null, !0), !0) : u.run(),
			(z.pause = u.pause.bind(u)),
			(z.resume = u.resume.bind(u)),
			(z.stop = z),
			z
		);
	}
	function Xe(e, t = 1 / 0, n) {
		if (
			t <= 0 ||
			!X(e) ||
			e.__v_skip ||
			((n = n || new Map()), (n.get(e) || 0) >= t)
		)
			return e;
		if ((n.set(e, t), t--, oe(e))) Xe(e.value, t, n);
		else if (j(e)) for (let s = 0; s < e.length; s++) Xe(e[s], t, n);
		else if (tr(e) || Ct(e))
			e.forEach((s) => {
				Xe(s, t, n);
			});
		else if (rr(e)) {
			for (const s in e) Xe(e[s], t, n);
			for (const s of Object.getOwnPropertySymbols(e))
				Object.prototype.propertyIsEnumerable.call(e, s) && Xe(e[s], t, n);
		}
		return e;
	} /**
	 * @vue/runtime-core v3.5.21
	 * (c) 2018-present Yuxi (Evan) You and Vue contributors
	 * @license MIT
	 **/
	const Zt = [];
	let bs = !1;
	function mu(e, ...t) {
		if (bs) return;
		(bs = !0), ze();
		const n = Zt.length ? Zt[Zt.length - 1].component : null,
			s = n && n.appContext.config.warnHandler,
			r = tl();
		if (s)
			It(s, n, 11, [
				e +
					t
						.map((i) => {
							var o, l;
							return (l = (o = i.toString) == null ? void 0 : o.call(i)) != null
								? l
								: JSON.stringify(i);
						})
						.join(""),
				n && n.proxy,
				r
					.map(({ vnode: i }) => `at <${Ei(n, i.type)}>`)
					.join(`
  `),
				r,
			]);
		else {
			const i = [`[Vue warn]: ${e}`, ...t];
			r.length &&
				i.push(
					`
  `,
					...nl(r),
				),
				console.warn(...i);
		}
		Le(), (bs = !1);
	}
	function tl() {
		let e = Zt[Zt.length - 1];
		if (!e) return [];
		const t = [];
		for (; e; ) {
			const n = t[0];
			n && n.vnode === e
				? n.recurseCount++
				: t.push({ vnode: e, recurseCount: 0 });
			const s = e.component && e.component.parent;
			e = s && s.vnode;
		}
		return t;
	}
	function nl(e) {
		const t = [];
		return (
			e.forEach((n, s) => {
				t.push(
					...(s === 0
						? []
						: [
								`
  `,
							]),
					...sl(n),
				);
			}),
			t
		);
	}
	function sl({ vnode: e, recurseCount: t }) {
		const n = t > 0 ? `... (${t} recursive calls)` : "",
			s = e.component ? e.component.parent == null : !1,
			r = ` at <${Ei(e.component, e.type, s)}`,
			i = ">" + n;
		return e.props ? [r, ...rl(e.props), i] : [r + i];
	}
	function rl(e) {
		const t = [],
			n = Object.keys(e);
		return (
			n.slice(0, 3).forEach((s) => {
				t.push(...jr(s, e[s]));
			}),
			n.length > 3 && t.push(" ..."),
			t
		);
	}
	function jr(e, t, n) {
		return te(t)
			? ((t = JSON.stringify(t)), n ? t : [`${e}=${t}`])
			: typeof t == "number" || typeof t == "boolean" || t == null
				? n
					? t
					: [`${e}=${t}`]
				: oe(t)
					? ((t = jr(e, B(t.value), !0)), n ? t : [`${e}=Ref<`, t, ">"])
					: D(t)
						? [`${e}=fn${t.name ? `<${t.name}>` : ""}`]
						: ((t = B(t)), n ? t : [`${e}=`, t]);
	}
	function It(e, t, n, s) {
		try {
			return s ? e(...s) : e();
		} catch (r) {
			En(r, t, n);
		}
	}
	function $e(e, t, n, s) {
		if (D(e)) {
			const r = It(e, t, n, s);
			return (
				r &&
					nr(r) &&
					r.catch((i) => {
						En(i, t, n);
					}),
				r
			);
		}
		if (j(e)) {
			const r = [];
			for (let i = 0; i < e.length; i++) r.push($e(e[i], t, n, s));
			return r;
		}
	}
	function En(e, t, n, s = !0) {
		const r = t ? t.vnode : null,
			{ errorHandler: i, throwUnhandledErrorInProduction: o } =
				(t && t.appContext.config) || L;
		if (t) {
			let l = t.parent;
			const a = t.proxy,
				h = `https://vuejs.org/error-reference/#runtime-${n}`;
			for (; l; ) {
				const u = l.ec;
				if (u) {
					for (let p = 0; p < u.length; p++) if (u[p](e, a, h) === !1) return;
				}
				l = l.parent;
			}
			if (i) {
				ze(), It(i, null, 10, [e, a, h]), Le();
				return;
			}
		}
		il(e, n, r, s, o);
	}
	function il(e, t, n, s = !0, r = !1) {
		if (r) throw e;
		console.error(e);
	}
	const he = [];
	let Oe = -1;
	const Rt = [];
	let at = null,
		At = 0;
	const Dr = Promise.resolve();
	let Pn = null;
	function ws(e) {
		const t = Pn || Dr;
		return e ? t.then(this ? e.bind(this) : e) : t;
	}
	function ol(e) {
		let t = Oe + 1,
			n = he.length;
		for (; t < n; ) {
			const s = (t + n) >>> 1,
				r = he[s],
				i = Jt(r);
			i < e || (i === e && r.flags & 2) ? (t = s + 1) : (n = s);
		}
		return t;
	}
	function ks(e) {
		if (!(e.flags & 1)) {
			const t = Jt(e),
				n = he[he.length - 1];
			!n || (!(e.flags & 2) && t >= Jt(n))
				? he.push(e)
				: he.splice(ol(t), 0, e),
				(e.flags |= 1),
				zr();
		}
	}
	function zr() {
		Pn || (Pn = Dr.then(Or));
	}
	function ll(e) {
		j(e)
			? Rt.push(...e)
			: at && e.id === -1
				? at.splice(At + 1, 0, e)
				: e.flags & 1 || (Rt.push(e), (e.flags |= 1)),
			zr();
	}
	function Lr(e, t, n = Oe + 1) {
		for (; n < he.length; n++) {
			const s = he[n];
			if (s && s.flags & 2) {
				if (e && s.id !== e.uid) continue;
				he.splice(n, 1),
					n--,
					s.flags & 4 && (s.flags &= -2),
					s(),
					s.flags & 4 || (s.flags &= -2);
			}
		}
	}
	function $r(e) {
		if (Rt.length) {
			const t = [...new Set(Rt)].sort((n, s) => Jt(n) - Jt(s));
			if (((Rt.length = 0), at)) {
				at.push(...t);
				return;
			}
			for (at = t, At = 0; At < at.length; At++) {
				const n = at[At];
				n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2);
			}
			(at = null), (At = 0);
		}
	}
	const Jt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
	function Or(e) {
		try {
			for (Oe = 0; Oe < he.length; Oe++) {
				const t = he[Oe];
				t &&
					!(t.flags & 8) &&
					(t.flags & 4 && (t.flags &= -2),
					It(t, t.i, t.i ? 15 : 14),
					t.flags & 4 || (t.flags &= -2));
			}
		} finally {
			for (; Oe < he.length; Oe++) {
				const t = he[Oe];
				t && (t.flags &= -2);
			}
			(Oe = -1),
				(he.length = 0),
				$r(),
				(Pn = null),
				(he.length || Rt.length) && Or();
		}
	}
	let Ee = null,
		Br = null;
	function In(e) {
		const t = Ee;
		return (Ee = e), (Br = (e && e.type.__scopeId) || null), t;
	}
	function al(e, t = Ee, n) {
		if (!t || e._n) return e;
		const s = (...r) => {
			s._d && yi(-1);
			const i = In(t);
			let o;
			try {
				o = e(...r);
			} finally {
				In(i), s._d && yi(1);
			}
			return o;
		};
		return (s._n = !0), (s._c = !0), (s._d = !0), s;
	}
	function cl(e, t) {
		if (Ee === null) return e;
		const n = Nn(Ee),
			s = e.dirs || (e.dirs = []);
		for (let r = 0; r < t.length; r++) {
			let [i, o, l, a = L] = t[r];
			i &&
				(D(i) && (i = { mounted: i, updated: i }),
				i.deep && Xe(o),
				s.push({
					dir: i,
					instance: n,
					value: o,
					oldValue: void 0,
					arg: l,
					modifiers: a,
				}));
		}
		return e;
	}
	function vt(e, t, n, s) {
		const r = e.dirs,
			i = t && t.dirs;
		for (let o = 0; o < r.length; o++) {
			const l = r[o];
			i && (l.oldValue = i[o].value);
			const a = l.dir[s];
			a && (ze(), $e(a, n, 8, [e.el, l, e, t]), Le());
		}
	}
	const ul = Symbol("_vte"),
		fl = (e) => e.__isTeleport,
		hl = Symbol("_leaveCb");
	function xs(e, t) {
		e.shapeFlag & 6 && e.component
			? ((e.transition = t), xs(e.component.subTree, t))
			: e.shapeFlag & 128
				? ((e.ssContent.transition = t.clone(e.ssContent)),
					(e.ssFallback.transition = t.clone(e.ssFallback)))
				: (e.transition = t);
	}
	function Nr(e, t) {
		return D(e) ? ae({ name: e.name }, t, { setup: e }) : e;
	}
	function Fr(e) {
		e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
	}
	const Rn = new WeakMap();
	function Gt(e, t, n, s, r = !1) {
		if (j(e)) {
			e.forEach((E, R) => Gt(E, t && (j(t) ? t[R] : t), n, s, r));
			return;
		}
		if (Qt(s) && !r) {
			s.shapeFlag & 512 &&
				s.type.__asyncResolved &&
				s.component.subTree.component &&
				Gt(e, t, n, s.component.subTree);
			return;
		}
		const i = s.shapeFlag & 4 ? Nn(s.component) : s.el,
			o = r ? null : i,
			{ i: l, r: a } = e,
			h = t && t.r,
			u = l.refs === L ? (l.refs = {}) : l.refs,
			p = l.setupState,
			g = B(p),
			w = p === L ? er : (E) => H(g, E);
		if (h != null && h !== a) {
			if ((Hr(t), te(h))) (u[h] = null), w(h) && (p[h] = null);
			else if (oe(h)) {
				h.value = null;
				const E = t;
				E.k && (u[E.k] = null);
			}
		}
		if (D(a)) It(a, l, 12, [o, u]);
		else {
			const E = te(a),
				R = oe(a);
			if (E || R) {
				const Q = () => {
					if (e.f) {
						const z = E ? (w(a) ? p[a] : u[a]) : a.value;
						if (r) j(z) && ts(z, i);
						else if (j(z)) z.includes(i) || z.push(i);
						else if (E) (u[a] = [i]), w(a) && (p[a] = u[a]);
						else {
							const U = [i];
							(a.value = U), e.k && (u[e.k] = U);
						}
					} else
						E
							? ((u[a] = o), w(a) && (p[a] = o))
							: R && ((a.value = o), e.k && (u[e.k] = o));
				};
				if (o) {
					const z = () => {
						Q(), Rn.delete(e);
					};
					(z.id = -1), Rn.set(e, z), ke(z, n);
				} else Hr(e), Q();
			}
		}
	}
	function Hr(e) {
		const t = Rn.get(e);
		t && ((t.flags |= 8), Rn.delete(e));
	}
	yn().requestIdleCallback, yn().cancelIdleCallback;
	const Qt = (e) => !!e.type.__asyncLoader,
		Ur = (e) => e.type.__isKeepAlive;
	function pl(e, t) {
		Vr(e, "a", t);
	}
	function dl(e, t) {
		Vr(e, "da", t);
	}
	function Vr(e, t, n = de) {
		const s =
			e.__wdc ||
			(e.__wdc = () => {
				let r = n;
				for (; r; ) {
					if (r.isDeactivated) return;
					r = r.parent;
				}
				return e();
			});
		if ((An(t, s, n), n)) {
			let r = n.parent;
			for (; r && r.parent; )
				Ur(r.parent.vnode) && gl(s, t, n, r), (r = r.parent);
		}
	}
	function gl(e, t, n, s) {
		const r = An(t, e, s, !0);
		Kr(() => {
			ts(s[t], r);
		}, n);
	}
	function An(e, t, n = de, s = !1) {
		if (n) {
			const r = n[e] || (n[e] = []),
				i =
					t.__weh ||
					(t.__weh = (...o) => {
						ze();
						const l = sn(n),
							a = $e(t, n, e, o);
						return l(), Le(), a;
					});
			return s ? r.unshift(i) : r.push(i), i;
		}
	}
	const et =
			(e) =>
			(t, n = de) => {
				(!rn || e === "sp") && An(e, (...s) => t(...s), n);
			},
		ml = et("bm"),
		Wr = et("m"),
		vl = et("bu"),
		yl = et("u"),
		bl = et("bum"),
		Kr = et("um"),
		wl = et("sp"),
		kl = et("rtg"),
		xl = et("rtc");
	function _l(e, t = de) {
		An("ec", e, t);
	}
	const Tl = Symbol.for("v-ndc");
	function Sl(e, t, n, s) {
		let r;
		const i = n,
			o = j(e);
		if (o || te(e)) {
			const l = o && Pt(e);
			let a = !1,
				h = !1;
			l && ((a = !Me(e)), (h = lt(e)), (e = wn(e))), (r = new Array(e.length));
			for (let u = 0, p = e.length; u < p; u++)
				r[u] = t(a ? (h ? Sn(ie(e[u])) : ie(e[u])) : e[u], u, void 0, i);
		} else if (typeof e == "number") {
			r = new Array(e);
			for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, i);
		} else if (X(e))
			if (e[Symbol.iterator]) r = Array.from(e, (l, a) => t(l, a, void 0, i));
			else {
				const l = Object.keys(e);
				r = new Array(l.length);
				for (let a = 0, h = l.length; a < h; a++) {
					const u = l[a];
					r[a] = t(e[u], u, a, i);
				}
			}
		else r = [];
		return r;
	}
	const _s = (e) => (e ? (Si(e) ? Nn(e) : _s(e.parent)) : null),
		Yt = ae(Object.create(null), {
			$: (e) => e,
			$el: (e) => e.vnode.el,
			$data: (e) => e.data,
			$props: (e) => e.props,
			$attrs: (e) => e.attrs,
			$slots: (e) => e.slots,
			$refs: (e) => e.refs,
			$parent: (e) => _s(e.parent),
			$root: (e) => _s(e.root),
			$host: (e) => e.ce,
			$emit: (e) => e.emit,
			$options: (e) => Gr(e),
			$forceUpdate: (e) =>
				e.f ||
				(e.f = () => {
					ks(e.update);
				}),
			$nextTick: (e) => e.n || (e.n = ws.bind(e.proxy)),
			$watch: (e) => ql.bind(e),
		}),
		Ts = (e, t) => e !== L && !e.__isScriptSetup && H(e, t),
		Cl = {
			get({ _: e }, t) {
				if (t === "__v_skip") return !0;
				const {
					ctx: n,
					setupState: s,
					data: r,
					props: i,
					accessCache: o,
					type: l,
					appContext: a,
				} = e;
				let h;
				if (t[0] !== "$") {
					const w = o[t];
					if (w !== void 0)
						switch (w) {
							case 1:
								return s[t];
							case 2:
								return r[t];
							case 4:
								return n[t];
							case 3:
								return i[t];
						}
					if (Ts(s, t)) return (o[t] = 1), s[t];
					if (r !== L && H(r, t)) return (o[t] = 2), r[t];
					if ((h = e.propsOptions[0]) && H(h, t)) return (o[t] = 3), i[t];
					if (n !== L && H(n, t)) return (o[t] = 4), n[t];
					Ss && (o[t] = 0);
				}
				const u = Yt[t];
				let p, g;
				if (u) return t === "$attrs" && ue(e.attrs, "get", ""), u(e);
				if ((p = l.__cssModules) && (p = p[t])) return p;
				if (n !== L && H(n, t)) return (o[t] = 4), n[t];
				if (((g = a.config.globalProperties), H(g, t))) return g[t];
			},
			set({ _: e }, t, n) {
				const { data: s, setupState: r, ctx: i } = e;
				return Ts(r, t)
					? ((r[t] = n), !0)
					: s !== L && H(s, t)
						? ((s[t] = n), !0)
						: H(e.props, t) || (t[0] === "$" && t.slice(1) in e)
							? !1
							: ((i[t] = n), !0);
			},
			has(
				{
					_: {
						data: e,
						setupState: t,
						accessCache: n,
						ctx: s,
						appContext: r,
						propsOptions: i,
						type: o,
					},
				},
				l,
			) {
				let a, h;
				return !!(
					n[l] ||
					(e !== L && l[0] !== "$" && H(e, l)) ||
					Ts(t, l) ||
					((a = i[0]) && H(a, l)) ||
					H(s, l) ||
					H(Yt, l) ||
					H(r.config.globalProperties, l) ||
					((h = o.__cssModules) && h[l])
				);
			},
			defineProperty(e, t, n) {
				return (
					n.get != null
						? (e._.accessCache[t] = 0)
						: H(n, "value") && this.set(e, t, n.value, null),
					Reflect.defineProperty(e, t, n)
				);
			},
		};
	function qr(e) {
		return j(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
	}
	let Ss = !0;
	function Ml(e) {
		const t = Gr(e),
			n = e.proxy,
			s = e.ctx;
		(Ss = !1), t.beforeCreate && Zr(t.beforeCreate, e, "bc");
		const {
			data: r,
			computed: i,
			methods: o,
			watch: l,
			provide: a,
			inject: h,
			created: u,
			beforeMount: p,
			mounted: g,
			beforeUpdate: w,
			updated: E,
			activated: R,
			deactivated: Q,
			beforeDestroy: z,
			beforeUnmount: U,
			destroyed: q,
			unmounted: P,
			render: Y,
			renderTracked: ee,
			renderTriggered: S,
			errorCaptured: fe,
			serverPrefetch: ve,
			expose: Se,
			inheritAttrs: J,
			components: _t,
			directives: nt,
			filters: Ae,
		} = t;
		if ((h && El(h, s, null), o))
			for (const F in o) {
				const $ = o[F];
				D($) && (s[F] = $.bind(n));
			}
		if (r) {
			const F = r.call(n, n);
			X(F) && (e.data = vs(F));
		}
		if (((Ss = !0), i))
			for (const F in i) {
				const $ = i[F],
					ge = D($) ? $.bind(n, n) : D($.get) ? $.get.bind(n, n) : je,
					Ke = !D($) && D($.set) ? $.set.bind(n) : je,
					me = Lt({ get: ge, set: Ke });
				Object.defineProperty(s, F, {
					enumerable: !0,
					configurable: !0,
					get: () => me.value,
					set: (ye) => (me.value = ye),
				});
			}
		if (l) for (const F in l) Jr(l[F], s, n, F);
		if (a) {
			const F = D(a) ? a.call(n) : a;
			Reflect.ownKeys(F).forEach(($) => {
				Dl($, F[$]);
			});
		}
		u && Zr(u, e, "c");
		function ne(F, $) {
			j($) ? $.forEach((ge) => F(ge.bind(n))) : $ && F($.bind(n));
		}
		if (
			(ne(ml, p),
			ne(Wr, g),
			ne(vl, w),
			ne(yl, E),
			ne(pl, R),
			ne(dl, Q),
			ne(_l, fe),
			ne(xl, ee),
			ne(kl, S),
			ne(bl, U),
			ne(Kr, P),
			ne(wl, ve),
			j(Se))
		)
			if (Se.length) {
				const F = e.exposed || (e.exposed = {});
				Se.forEach(($) => {
					Object.defineProperty(F, $, {
						get: () => n[$],
						set: (ge) => (n[$] = ge),
						enumerable: !0,
					});
				});
			} else e.exposed || (e.exposed = {});
		Y && e.render === je && (e.render = Y),
			J != null && (e.inheritAttrs = J),
			_t && (e.components = _t),
			nt && (e.directives = nt),
			ve && Fr(e);
	}
	function El(e, t, n = je) {
		j(e) && (e = Cs(e));
		for (const s in e) {
			const r = e[s];
			let i;
			X(r)
				? "default" in r
					? (i = Dn(r.from || s, r.default, !0))
					: (i = Dn(r.from || s))
				: (i = Dn(r)),
				oe(i)
					? Object.defineProperty(t, s, {
							enumerable: !0,
							configurable: !0,
							get: () => i.value,
							set: (o) => (i.value = o),
						})
					: (t[s] = i);
		}
	}
	function Zr(e, t, n) {
		$e(j(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
	}
	function Jr(e, t, n, s) {
		const r = s.includes(".") ? pi(n, s) : () => n[s];
		if (te(e)) {
			const i = t[e];
			D(i) && bt(r, i);
		} else if (D(e)) bt(r, e.bind(n));
		else if (X(e))
			if (j(e)) e.forEach((i) => Jr(i, t, n, s));
			else {
				const i = D(e.handler) ? e.handler.bind(n) : t[e.handler];
				D(i) && bt(r, i, e);
			}
	}
	function Gr(e) {
		const t = e.type,
			{ mixins: n, extends: s } = t,
			{
				mixins: r,
				optionsCache: i,
				config: { optionMergeStrategies: o },
			} = e.appContext,
			l = i.get(t);
		let a;
		return (
			l
				? (a = l)
				: !r.length && !n && !s
					? (a = t)
					: ((a = {}),
						r.length && r.forEach((h) => jn(a, h, o, !0)),
						jn(a, t, o)),
			X(t) && i.set(t, a),
			a
		);
	}
	function jn(e, t, n, s = !1) {
		const { mixins: r, extends: i } = t;
		i && jn(e, i, n, !0), r && r.forEach((o) => jn(e, o, n, !0));
		for (const o in t)
			if (!(s && o === "expose")) {
				const l = Pl[o] || (n && n[o]);
				e[o] = l ? l(e[o], t[o]) : t[o];
			}
		return e;
	}
	const Pl = {
		data: Qr,
		props: Yr,
		emits: Yr,
		methods: Xt,
		computed: Xt,
		beforeCreate: pe,
		created: pe,
		beforeMount: pe,
		mounted: pe,
		beforeUpdate: pe,
		updated: pe,
		beforeDestroy: pe,
		beforeUnmount: pe,
		destroyed: pe,
		unmounted: pe,
		activated: pe,
		deactivated: pe,
		errorCaptured: pe,
		serverPrefetch: pe,
		components: Xt,
		directives: Xt,
		watch: Rl,
		provide: Qr,
		inject: Il,
	};
	function Qr(e, t) {
		return t
			? e
				? function () {
						return ae(
							D(e) ? e.call(this, this) : e,
							D(t) ? t.call(this, this) : t,
						);
					}
				: t
			: e;
	}
	function Il(e, t) {
		return Xt(Cs(e), Cs(t));
	}
	function Cs(e) {
		if (j(e)) {
			const t = {};
			for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
			return t;
		}
		return e;
	}
	function pe(e, t) {
		return e ? [...new Set([].concat(e, t))] : t;
	}
	function Xt(e, t) {
		return e ? ae(Object.create(null), e, t) : t;
	}
	function Yr(e, t) {
		return e
			? j(e) && j(t)
				? [...new Set([...e, ...t])]
				: ae(Object.create(null), qr(e), qr(t ?? {}))
			: t;
	}
	function Rl(e, t) {
		if (!e) return t;
		if (!t) return e;
		const n = ae(Object.create(null), e);
		for (const s in t) n[s] = pe(e[s], t[s]);
		return n;
	}
	function Xr() {
		return {
			app: null,
			config: {
				isNativeTag: er,
				performance: !1,
				globalProperties: {},
				optionMergeStrategies: {},
				errorHandler: void 0,
				warnHandler: void 0,
				compilerOptions: {},
			},
			mixins: [],
			components: {},
			directives: {},
			provides: Object.create(null),
			optionsCache: new WeakMap(),
			propsCache: new WeakMap(),
			emitsCache: new WeakMap(),
		};
	}
	let Al = 0;
	function jl(e, t) {
		return (s, r = null) => {
			D(s) || (s = ae({}, s)), r != null && !X(r) && (r = null);
			const i = Xr(),
				o = new WeakSet(),
				l = [];
			let a = !1;
			const h = (i.app = {
				_uid: Al++,
				_component: s,
				_props: r,
				_container: null,
				_context: i,
				_instance: null,
				version: ba,
				get config() {
					return i.config;
				},
				set config(u) {},
				use(u, ...p) {
					return (
						o.has(u) ||
							(u && D(u.install)
								? (o.add(u), u.install(h, ...p))
								: D(u) && (o.add(u), u(h, ...p))),
						h
					);
				},
				mixin(u) {
					return i.mixins.includes(u) || i.mixins.push(u), h;
				},
				component(u, p) {
					return p ? ((i.components[u] = p), h) : i.components[u];
				},
				directive(u, p) {
					return p ? ((i.directives[u] = p), h) : i.directives[u];
				},
				mount(u, p, g) {
					if (!a) {
						const w = h._ceVNode || Ne(s, r);
						return (
							(w.appContext = i),
							g === !0 ? (g = "svg") : g === !1 && (g = void 0),
							e(w, u, g),
							(a = !0),
							(h._container = u),
							(u.__vue_app__ = h),
							Nn(w.component)
						);
					}
				},
				onUnmount(u) {
					l.push(u);
				},
				unmount() {
					a &&
						($e(l, h._instance, 16),
						e(null, h._container),
						delete h._container.__vue_app__);
				},
				provide(u, p) {
					return (i.provides[u] = p), h;
				},
				runWithContext(u) {
					const p = jt;
					jt = h;
					try {
						return u();
					} finally {
						jt = p;
					}
				},
			});
			return h;
		};
	}
	let jt = null;
	function Dl(e, t) {
		if (de) {
			let n = de.provides;
			const s = de.parent && de.parent.provides;
			s === n && (n = de.provides = Object.create(s)), (n[e] = t);
		}
	}
	function Dn(e, t, n = !1) {
		const s = ua();
		if (s || jt) {
			const r = jt
				? jt._context.provides
				: s
					? s.parent == null || s.ce
						? s.vnode.appContext && s.vnode.appContext.provides
						: s.parent.provides
					: void 0;
			if (r && e in r) return r[e];
			if (arguments.length > 1) return n && D(t) ? t.call(s && s.proxy) : t;
		}
	}
	const ei = {},
		ti = () => Object.create(ei),
		ni = (e) => Object.getPrototypeOf(e) === ei;
	function zl(e, t, n, s = !1) {
		const r = {},
			i = ti();
		(e.propsDefaults = Object.create(null)), si(e, t, r, i);
		for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
		n
			? (e.props = s ? r : Ko(r))
			: e.type.props
				? (e.props = r)
				: (e.props = i),
			(e.attrs = i);
	}
	function Ll(e, t, n, s) {
		const {
				props: r,
				attrs: i,
				vnode: { patchFlag: o },
			} = e,
			l = B(r),
			[a] = e.propsOptions;
		let h = !1;
		if ((s || o > 0) && !(o & 16)) {
			if (o & 8) {
				const u = e.vnode.dynamicProps;
				for (let p = 0; p < u.length; p++) {
					const g = u[p];
					if (zn(e.emitsOptions, g)) continue;
					const w = t[g];
					if (a)
						if (H(i, g)) w !== i[g] && ((i[g] = w), (h = !0));
						else {
							const E = it(g);
							r[E] = Ms(a, l, E, w, e, !1);
						}
					else w !== i[g] && ((i[g] = w), (h = !0));
				}
			}
		} else {
			si(e, t, r, i) && (h = !0);
			let u;
			for (const p in l)
				(!t || (!H(t, p) && ((u = pt(p)) === p || !H(t, u)))) &&
					(a
						? n &&
							(n[p] !== void 0 || n[u] !== void 0) &&
							(r[p] = Ms(a, l, p, void 0, e, !0))
						: delete r[p]);
			if (i !== l)
				for (const p in i) (!t || !H(t, p)) && (delete i[p], (h = !0));
		}
		h && Qe(e.attrs, "set", "");
	}
	function si(e, t, n, s) {
		const [r, i] = e.propsOptions;
		let o = !1,
			l;
		if (t)
			for (const a in t) {
				if (Ft(a)) continue;
				const h = t[a];
				let u;
				r && H(r, (u = it(a)))
					? !i || !i.includes(u)
						? (n[u] = h)
						: ((l || (l = {}))[u] = h)
					: zn(e.emitsOptions, a) ||
						((!(a in s) || h !== s[a]) && ((s[a] = h), (o = !0)));
			}
		if (i) {
			const a = B(n),
				h = l || L;
			for (let u = 0; u < i.length; u++) {
				const p = i[u];
				n[p] = Ms(r, a, p, h[p], e, !H(h, p));
			}
		}
		return o;
	}
	function Ms(e, t, n, s, r, i) {
		const o = e[n];
		if (o != null) {
			const l = H(o, "default");
			if (l && s === void 0) {
				const a = o.default;
				if (o.type !== Function && !o.skipFactory && D(a)) {
					const { propsDefaults: h } = r;
					if (n in h) s = h[n];
					else {
						const u = sn(r);
						(s = h[n] = a.call(null, t)), u();
					}
				} else s = a;
				r.ce && r.ce._setProp(n, s);
			}
			o[0] &&
				(i && !l ? (s = !1) : o[1] && (s === "" || s === pt(n)) && (s = !0));
		}
		return s;
	}
	const $l = new WeakMap();
	function ri(e, t, n = !1) {
		const s = n ? $l : t.propsCache,
			r = s.get(e);
		if (r) return r;
		const i = e.props,
			o = {},
			l = [];
		let a = !1;
		if (!D(e)) {
			const u = (p) => {
				a = !0;
				const [g, w] = ri(p, t, !0);
				ae(o, g), w && l.push(...w);
			};
			!n && t.mixins.length && t.mixins.forEach(u),
				e.extends && u(e.extends),
				e.mixins && e.mixins.forEach(u);
		}
		if (!i && !a) return X(e) && s.set(e, St), St;
		if (j(i))
			for (let u = 0; u < i.length; u++) {
				const p = it(i[u]);
				ii(p) && (o[p] = L);
			}
		else if (i)
			for (const u in i) {
				const p = it(u);
				if (ii(p)) {
					const g = i[u],
						w = (o[p] = j(g) || D(g) ? { type: g } : ae({}, g)),
						E = w.type;
					let R = !1,
						Q = !0;
					if (j(E))
						for (let z = 0; z < E.length; ++z) {
							const U = E[z],
								q = D(U) && U.name;
							if (q === "Boolean") {
								R = !0;
								break;
							}
							q === "String" && (Q = !1);
						}
					else R = D(E) && E.name === "Boolean";
					(w[0] = R), (w[1] = Q), (R || H(w, "default")) && l.push(p);
				}
			}
		const h = [o, l];
		return X(e) && s.set(e, h), h;
	}
	function ii(e) {
		return e[0] !== "$" && !Ft(e);
	}
	const Es = (e) => e === "_" || e === "_ctx" || e === "$stable",
		Ps = (e) => (j(e) ? e.map(Fe) : [Fe(e)]),
		Ol = (e, t, n) => {
			if (t._n) return t;
			const s = al((...r) => Ps(t(...r)), n);
			return (s._c = !1), s;
		},
		oi = (e, t, n) => {
			const s = e._ctx;
			for (const r in e) {
				if (Es(r)) continue;
				const i = e[r];
				if (D(i)) t[r] = Ol(r, i, s);
				else if (i != null) {
					const o = Ps(i);
					t[r] = () => o;
				}
			}
		},
		li = (e, t) => {
			const n = Ps(t);
			e.slots.default = () => n;
		},
		ai = (e, t, n) => {
			for (const s in t) (n || !Es(s)) && (e[s] = t[s]);
		},
		Bl = (e, t, n) => {
			const s = (e.slots = ti());
			if (e.vnode.shapeFlag & 32) {
				const r = t._;
				r ? (ai(s, t, n), n && or(s, "_", r, !0)) : oi(t, s);
			} else t && li(e, t);
		},
		Nl = (e, t, n) => {
			const { vnode: s, slots: r } = e;
			let i = !0,
				o = L;
			if (s.shapeFlag & 32) {
				const l = t._;
				l
					? n && l === 1
						? (i = !1)
						: ai(r, t, n)
					: ((i = !t.$stable), oi(t, r)),
					(o = t);
			} else t && (li(e, t), (o = { default: 1 }));
			if (i) for (const l in r) !Es(l) && o[l] == null && delete r[l];
		},
		ke = ta;
	function Fl(e) {
		return Hl(e);
	}
	function Hl(e, t) {
		const n = yn();
		n.__VUE__ = !0;
		const {
				insert: s,
				remove: r,
				patchProp: i,
				createElement: o,
				createText: l,
				createComment: a,
				setText: h,
				setElementText: u,
				parentNode: p,
				nextSibling: g,
				setScopeId: w = je,
				insertStaticContent: E,
			} = e,
			R = (
				c,
				f,
				d,
				y = null,
				m = null,
				v = null,
				_ = void 0,
				x = null,
				k = !!f.dynamicChildren,
			) => {
				if (c === f) return;
				c && !nn(c, f) && ((y = Nt(c)), ye(c, m, v, !0), (c = null)),
					f.patchFlag === -2 && ((k = !1), (f.dynamicChildren = null));
				const { type: b, ref: I, shapeFlag: T } = f;
				switch (b) {
					case Ln:
						Q(c, f, d, y);
						break;
					case ct:
						z(c, f, d, y);
						break;
					case $n:
						c == null && U(f, d, y, _);
						break;
					case Be:
						_t(c, f, d, y, m, v, _, x, k);
						break;
					default:
						T & 1
							? Y(c, f, d, y, m, v, _, x, k)
							: T & 6
								? nt(c, f, d, y, m, v, _, x, k)
								: (T & 64 || T & 128) &&
									b.process(c, f, d, y, m, v, _, x, k, hn);
				}
				I != null && m
					? Gt(I, c && c.ref, v, f || c, !f)
					: I == null && c && c.ref != null && Gt(c.ref, null, v, c, !0);
			},
			Q = (c, f, d, y) => {
				if (c == null) s((f.el = l(f.children)), d, y);
				else {
					const m = (f.el = c.el);
					f.children !== c.children && h(m, f.children);
				}
			},
			z = (c, f, d, y) => {
				c == null ? s((f.el = a(f.children || "")), d, y) : (f.el = c.el);
			},
			U = (c, f, d, y) => {
				[c.el, c.anchor] = E(c.children, f, d, y, c.el, c.anchor);
			},
			q = ({ el: c, anchor: f }, d, y) => {
				let m;
				for (; c && c !== f; ) (m = g(c)), s(c, d, y), (c = m);
				s(f, d, y);
			},
			P = ({ el: c, anchor: f }) => {
				let d;
				for (; c && c !== f; ) (d = g(c)), r(c), (c = d);
				r(f);
			},
			Y = (c, f, d, y, m, v, _, x, k) => {
				f.type === "svg" ? (_ = "svg") : f.type === "math" && (_ = "mathml"),
					c == null ? ee(f, d, y, m, v, _, x, k) : ve(c, f, m, v, _, x, k);
			},
			ee = (c, f, d, y, m, v, _, x) => {
				let k, b;
				const { props: I, shapeFlag: T, transition: M, dirs: A } = c;
				if (
					((k = c.el = o(c.type, v, I && I.is, I)),
					T & 8
						? u(k, c.children)
						: T & 16 && fe(c.children, k, null, y, m, Is(c, v), _, x),
					A && vt(c, null, y, "created"),
					S(k, c, c.scopeId, _, y),
					I)
				) {
					for (const G in I)
						G !== "value" && !Ft(G) && i(k, G, null, I[G], v, y);
					"value" in I && i(k, "value", null, I.value, v),
						(b = I.onVnodeBeforeMount) && He(b, y, c);
				}
				A && vt(c, null, y, "beforeMount");
				const O = Ul(m, M);
				O && M.beforeEnter(k),
					s(k, f, d),
					((b = I && I.onVnodeMounted) || O || A) &&
						ke(() => {
							b && He(b, y, c), O && M.enter(k), A && vt(c, null, y, "mounted");
						}, m);
			},
			S = (c, f, d, y, m) => {
				if ((d && w(c, d), y)) for (let v = 0; v < y.length; v++) w(c, y[v]);
				if (m) {
					const v = m.subTree;
					if (
						f === v ||
						(vi(v.type) && (v.ssContent === f || v.ssFallback === f))
					) {
						const _ = m.vnode;
						S(c, _, _.scopeId, _.slotScopeIds, m.parent);
					}
				}
			},
			fe = (c, f, d, y, m, v, _, x, k = 0) => {
				for (let b = k; b < c.length; b++) {
					const I = (c[b] = x ? ut(c[b]) : Fe(c[b]));
					R(null, I, f, d, y, m, v, _, x);
				}
			},
			ve = (c, f, d, y, m, v, _) => {
				const x = (f.el = c.el);
				let { patchFlag: k, dynamicChildren: b, dirs: I } = f;
				k |= c.patchFlag & 16;
				const T = c.props || L,
					M = f.props || L;
				let A;
				if (
					(d && yt(d, !1),
					(A = M.onVnodeBeforeUpdate) && He(A, d, f, c),
					I && vt(f, c, d, "beforeUpdate"),
					d && yt(d, !0),
					((T.innerHTML && M.innerHTML == null) ||
						(T.textContent && M.textContent == null)) &&
						u(x, ""),
					b
						? Se(c.dynamicChildren, b, x, d, y, Is(f, m), v)
						: _ || $(c, f, x, null, d, y, Is(f, m), v, !1),
					k > 0)
				) {
					if (k & 16) J(x, T, M, d, m);
					else if (
						(k & 2 && T.class !== M.class && i(x, "class", null, M.class, m),
						k & 4 && i(x, "style", T.style, M.style, m),
						k & 8)
					) {
						const O = f.dynamicProps;
						for (let G = 0; G < O.length; G++) {
							const V = O[G],
								be = T[V],
								we = M[V];
							(we !== be || V === "value") && i(x, V, be, we, m, d);
						}
					}
					k & 1 && c.children !== f.children && u(x, f.children);
				} else !_ && b == null && J(x, T, M, d, m);
				((A = M.onVnodeUpdated) || I) &&
					ke(() => {
						A && He(A, d, f, c), I && vt(f, c, d, "updated");
					}, y);
			},
			Se = (c, f, d, y, m, v, _) => {
				for (let x = 0; x < f.length; x++) {
					const k = c[x],
						b = f[x],
						I =
							k.el && (k.type === Be || !nn(k, b) || k.shapeFlag & 198)
								? p(k.el)
								: d;
					R(k, b, I, null, y, m, v, _, !0);
				}
			},
			J = (c, f, d, y, m) => {
				if (f !== d) {
					if (f !== L)
						for (const v in f) !Ft(v) && !(v in d) && i(c, v, f[v], null, m, y);
					for (const v in d) {
						if (Ft(v)) continue;
						const _ = d[v],
							x = f[v];
						_ !== x && v !== "value" && i(c, v, x, _, m, y);
					}
					"value" in d && i(c, "value", f.value, d.value, m);
				}
			},
			_t = (c, f, d, y, m, v, _, x, k) => {
				const b = (f.el = c ? c.el : l("")),
					I = (f.anchor = c ? c.anchor : l(""));
				const { patchFlag: T, dynamicChildren: M, slotScopeIds: A } = f;
				A && (x = x ? x.concat(A) : A),
					c == null
						? (s(b, d, y),
							s(I, d, y),
							fe(f.children || [], d, I, m, v, _, x, k))
						: T > 0 && T & 64 && M && c.dynamicChildren
							? (Se(c.dynamicChildren, M, d, m, v, _, x),
								(f.key != null || (m && f === m.subTree)) && ci(c, f, !0))
							: $(c, f, d, I, m, v, _, x, k);
			},
			nt = (c, f, d, y, m, v, _, x, k) => {
				(f.slotScopeIds = x),
					c == null
						? f.shapeFlag & 512
							? m.ctx.activate(f, d, y, _, k)
							: Ae(f, d, y, m, v, _, k)
						: st(c, f, k);
			},
			Ae = (c, f, d, y, m, v, _) => {
				const x = (c.component = ca(c, y, m));
				if ((Ur(c) && (x.ctx.renderer = hn), fa(x, !1, _), x.asyncDep)) {
					if ((m && m.registerDep(x, ne, _), !c.el)) {
						const k = (x.subTree = Ne(ct));
						z(null, k, f, d), (c.placeholder = k.el);
					}
				} else ne(x, c, f, d, m, v, _);
			},
			st = (c, f, d) => {
				const y = (f.component = c.component);
				if (Xl(c, f, d))
					if (y.asyncDep && !y.asyncResolved) {
						F(y, f, d);
						return;
					} else (y.next = f), y.update();
				else (f.el = c.el), (y.vnode = f);
			},
			ne = (c, f, d, y, m, v, _) => {
				const x = () => {
					if (c.isMounted) {
						let { next: T, bu: M, u: A, parent: O, vnode: G } = c;
						{
							const Je = ui(c);
							if (Je) {
								T && ((T.el = G.el), F(c, T, _)),
									Je.asyncDep.then(() => {
										c.isUnmounted || x();
									});
								return;
							}
						}
						let V = T,
							be;
						yt(c, !1),
							T ? ((T.el = G.el), F(c, T, _)) : (T = G),
							M && vn(M),
							(be = T.props && T.props.onVnodeBeforeUpdate) && He(be, O, T, G),
							yt(c, !0);
						const we = gi(c),
							Ze = c.subTree;
						(c.subTree = we),
							R(Ze, we, p(Ze.el), Nt(Ze), c, m, v),
							(T.el = we.el),
							V === null && ea(c, we.el),
							A && ke(A, m),
							(be = T.props && T.props.onVnodeUpdated) &&
								ke(() => He(be, O, T, G), m);
					} else {
						let T;
						const { el: M, props: A } = f,
							{ bm: O, m: G, parent: V, root: be, type: we } = c,
							Ze = Qt(f);
						yt(c, !1),
							O && vn(O),
							!Ze && (T = A && A.onVnodeBeforeMount) && He(T, V, f),
							yt(c, !0);
						{
							be.ce &&
								be.ce._def.shadowRoot !== !1 &&
								be.ce._injectChildStyle(we);
							const Je = (c.subTree = gi(c));
							R(null, Je, d, y, c, m, v), (f.el = Je.el);
						}
						if ((G && ke(G, m), !Ze && (T = A && A.onVnodeMounted))) {
							const Je = f;
							ke(() => He(T, V, Je), m);
						}
						(f.shapeFlag & 256 ||
							(V && Qt(V.vnode) && V.vnode.shapeFlag & 256)) &&
							c.a &&
							ke(c.a, m),
							(c.isMounted = !0),
							(f = d = y = null);
					}
				};
				c.scope.on();
				const k = (c.effect = new hr(x));
				c.scope.off();
				const b = (c.update = k.run.bind(k)),
					I = (c.job = k.runIfDirty.bind(k));
				(I.i = c), (I.id = c.uid), (k.scheduler = () => ks(I)), yt(c, !0), b();
			},
			F = (c, f, d) => {
				f.component = c;
				const y = c.vnode.props;
				(c.vnode = f),
					(c.next = null),
					Ll(c, f.props, y, d),
					Nl(c, f.children, d),
					ze(),
					Lr(c),
					Le();
			},
			$ = (c, f, d, y, m, v, _, x, k = !1) => {
				const b = c && c.children,
					I = c ? c.shapeFlag : 0,
					T = f.children,
					{ patchFlag: M, shapeFlag: A } = f;
				if (M > 0) {
					if (M & 128) {
						Ke(b, T, d, y, m, v, _, x, k);
						return;
					}
					if (M & 256) {
						ge(b, T, d, y, m, v, _, x, k);
						return;
					}
				}
				A & 8
					? (I & 16 && ht(b, m, v), T !== b && u(d, T))
					: I & 16
						? A & 16
							? Ke(b, T, d, y, m, v, _, x, k)
							: ht(b, m, v, !0)
						: (I & 8 && u(d, ""), A & 16 && fe(T, d, y, m, v, _, x, k));
			},
			ge = (c, f, d, y, m, v, _, x, k) => {
				(c = c || St), (f = f || St);
				const b = c.length,
					I = f.length,
					T = Math.min(b, I);
				let M;
				for (M = 0; M < T; M++) {
					const A = (f[M] = k ? ut(f[M]) : Fe(f[M]));
					R(c[M], A, d, null, m, v, _, x, k);
				}
				b > I ? ht(c, m, v, !0, !1, T) : fe(f, d, y, m, v, _, x, k, T);
			},
			Ke = (c, f, d, y, m, v, _, x, k) => {
				let b = 0;
				const I = f.length;
				let T = c.length - 1,
					M = I - 1;
				for (; b <= T && b <= M; ) {
					const A = c[b],
						O = (f[b] = k ? ut(f[b]) : Fe(f[b]));
					if (nn(A, O)) R(A, O, d, null, m, v, _, x, k);
					else break;
					b++;
				}
				for (; b <= T && b <= M; ) {
					const A = c[T],
						O = (f[M] = k ? ut(f[M]) : Fe(f[M]));
					if (nn(A, O)) R(A, O, d, null, m, v, _, x, k);
					else break;
					T--, M--;
				}
				if (b > T) {
					if (b <= M) {
						const A = M + 1,
							O = A < I ? f[A].el : y;
						for (; b <= M; )
							R(null, (f[b] = k ? ut(f[b]) : Fe(f[b])), d, O, m, v, _, x, k),
								b++;
					}
				} else if (b > M) for (; b <= T; ) ye(c[b], m, v, !0), b++;
				else {
					const A = b,
						O = b,
						G = new Map();
					for (b = O; b <= M; b++) {
						const Ce = (f[b] = k ? ut(f[b]) : Fe(f[b]));
						Ce.key != null && G.set(Ce.key, b);
					}
					let V,
						be = 0;
					const we = M - O + 1;
					let Ze = !1,
						Je = 0;
					const pn = new Array(we);
					for (b = 0; b < we; b++) pn[b] = 0;
					for (b = A; b <= T; b++) {
						const Ce = c[b];
						if (be >= we) {
							ye(Ce, m, v, !0);
							continue;
						}
						let Ge;
						if (Ce.key != null) Ge = G.get(Ce.key);
						else
							for (V = O; V <= M; V++)
								if (pn[V - O] === 0 && nn(Ce, f[V])) {
									Ge = V;
									break;
								}
						Ge === void 0
							? ye(Ce, m, v, !0)
							: ((pn[Ge - O] = b + 1),
								Ge >= Je ? (Je = Ge) : (Ze = !0),
								R(Ce, f[Ge], d, null, m, v, _, x, k),
								be++);
					}
					const uo = Ze ? Vl(pn) : St;
					for (V = uo.length - 1, b = we - 1; b >= 0; b--) {
						const Ce = O + b,
							Ge = f[Ce],
							fo = f[Ce + 1],
							ho = Ce + 1 < I ? fo.el || fo.placeholder : y;
						pn[b] === 0
							? R(null, Ge, d, ho, m, v, _, x, k)
							: Ze && (V < 0 || b !== uo[V] ? me(Ge, d, ho, 2) : V--);
					}
				}
			},
			me = (c, f, d, y, m = null) => {
				const { el: v, type: _, transition: x, children: k, shapeFlag: b } = c;
				if (b & 6) {
					me(c.component.subTree, f, d, y);
					return;
				}
				if (b & 128) {
					c.suspense.move(f, d, y);
					return;
				}
				if (b & 64) {
					_.move(c, f, d, hn);
					return;
				}
				if (_ === Be) {
					s(v, f, d);
					for (let T = 0; T < k.length; T++) me(k[T], f, d, y);
					s(c.anchor, f, d);
					return;
				}
				if (_ === $n) {
					q(c, f, d);
					return;
				}
				if (y !== 2 && b & 1 && x)
					if (y === 0) x.beforeEnter(v), s(v, f, d), ke(() => x.enter(v), m);
					else {
						const { leave: T, delayLeave: M, afterLeave: A } = x,
							O = () => {
								c.ctx.isUnmounted ? r(v) : s(v, f, d);
							},
							G = () => {
								v._isLeaving && v[hl](!0),
									T(v, () => {
										O(), A && A();
									});
							};
						M ? M(v, O, G) : G();
					}
				else s(v, f, d);
			},
			ye = (c, f, d, y = !1, m = !1) => {
				const {
					type: v,
					props: _,
					ref: x,
					children: k,
					dynamicChildren: b,
					shapeFlag: I,
					patchFlag: T,
					dirs: M,
					cacheIndex: A,
				} = c;
				if (
					(T === -2 && (m = !1),
					x != null && (ze(), Gt(x, null, d, c, !0), Le()),
					A != null && (f.renderCache[A] = void 0),
					I & 256)
				) {
					f.ctx.deactivate(c);
					return;
				}
				const O = I & 1 && M,
					G = !Qt(c);
				let V;
				if ((G && (V = _ && _.onVnodeBeforeUnmount) && He(V, f, c), I & 6))
					qe(c.component, d, y);
				else {
					if (I & 128) {
						c.suspense.unmount(d, y);
						return;
					}
					O && vt(c, null, f, "beforeUnmount"),
						I & 64
							? c.type.remove(c, f, d, hn, y)
							: b && !b.hasOnce && (v !== Be || (T > 0 && T & 64))
								? ht(b, f, d, !1, !0)
								: ((v === Be && T & 384) || (!m && I & 16)) && ht(k, f, d),
						y && fn(c);
				}
				((G && (V = _ && _.onVnodeUnmounted)) || O) &&
					ke(() => {
						V && He(V, f, c), O && vt(c, null, f, "unmounted");
					}, d);
			},
			fn = (c) => {
				const { type: f, el: d, anchor: y, transition: m } = c;
				if (f === Be) {
					le(d, y);
					return;
				}
				if (f === $n) {
					P(c);
					return;
				}
				const v = () => {
					r(d), m && !m.persisted && m.afterLeave && m.afterLeave();
				};
				if (c.shapeFlag & 1 && m && !m.persisted) {
					const { leave: _, delayLeave: x } = m,
						k = () => _(d, v);
					x ? x(c.el, v, k) : k();
				} else v();
			},
			le = (c, f) => {
				let d;
				for (; c !== f; ) (d = g(c)), r(c), (c = d);
				r(f);
			},
			qe = (c, f, d) => {
				const { bum: y, scope: m, job: v, subTree: _, um: x, m: k, a: b } = c;
				fi(k),
					fi(b),
					y && vn(y),
					m.stop(),
					v && ((v.flags |= 8), ye(_, c, f, d)),
					x && ke(x, f),
					ke(() => {
						c.isUnmounted = !0;
					}, f);
			},
			ht = (c, f, d, y = !1, m = !1, v = 0) => {
				for (let _ = v; _ < c.length; _++) ye(c[_], f, d, y, m);
			},
			Nt = (c) => {
				if (c.shapeFlag & 6) return Nt(c.component.subTree);
				if (c.shapeFlag & 128) return c.suspense.next();
				const f = g(c.anchor || c.el),
					d = f && f[ul];
				return d ? g(d) : f;
			};
		let Tt = !1;
		const co = (c, f, d) => {
				c == null
					? f._vnode && ye(f._vnode, null, null, !0)
					: R(f._vnode || null, c, f, null, null, null, d),
					(f._vnode = c),
					Tt || ((Tt = !0), Lr(), $r(), (Tt = !1));
			},
			hn = {
				p: R,
				um: ye,
				m: me,
				r: fn,
				mt: Ae,
				mc: fe,
				pc: $,
				pbc: Se,
				n: Nt,
				o: e,
			};
		return { render: co, hydrate: void 0, createApp: jl(co) };
	}
	function Is({ type: e, props: t }, n) {
		return (n === "svg" && e === "foreignObject") ||
			(n === "mathml" &&
				e === "annotation-xml" &&
				t &&
				t.encoding &&
				t.encoding.includes("html"))
			? void 0
			: n;
	}
	function yt({ effect: e, job: t }, n) {
		n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
	}
	function Ul(e, t) {
		return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
	}
	function ci(e, t, n = !1) {
		const s = e.children,
			r = t.children;
		if (j(s) && j(r))
			for (let i = 0; i < s.length; i++) {
				const o = s[i];
				let l = r[i];
				l.shapeFlag & 1 &&
					!l.dynamicChildren &&
					((l.patchFlag <= 0 || l.patchFlag === 32) &&
						((l = r[i] = ut(r[i])), (l.el = o.el)),
					!n && l.patchFlag !== -2 && ci(o, l)),
					l.type === Ln && l.patchFlag !== -1 && (l.el = o.el),
					l.type === ct && !l.el && (l.el = o.el);
			}
	}
	function Vl(e) {
		const t = e.slice(),
			n = [0];
		let s, r, i, o, l;
		const a = e.length;
		for (s = 0; s < a; s++) {
			const h = e[s];
			if (h !== 0) {
				if (((r = n[n.length - 1]), e[r] < h)) {
					(t[s] = r), n.push(s);
					continue;
				}
				for (i = 0, o = n.length - 1; i < o; )
					(l = (i + o) >> 1), e[n[l]] < h ? (i = l + 1) : (o = l);
				h < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
			}
		}
		for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
		return n;
	}
	function ui(e) {
		const t = e.subTree.component;
		if (t) return t.asyncDep && !t.asyncResolved ? t : ui(t);
	}
	function fi(e) {
		if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
	}
	const Wl = Symbol.for("v-scx"),
		Kl = () => Dn(Wl);
	function bt(e, t, n) {
		return hi(e, t, n);
	}
	function hi(e, t, n = L) {
		const { immediate: s, deep: r, flush: i, once: o } = n,
			l = ae({}, n),
			a = (t && s) || (!t && i !== "post");
		let h;
		if (rn) {
			if (i === "sync") {
				const w = Kl();
				h = w.__watcherHandles || (w.__watcherHandles = []);
			} else if (!a) {
				const w = () => {};
				return (w.stop = je), (w.resume = je), (w.pause = je), w;
			}
		}
		const u = de;
		l.call = (w, E, R) => $e(w, u, E, R);
		let p = !1;
		i === "post"
			? (l.scheduler = (w) => {
					ke(w, u && u.suspense);
				})
			: i !== "sync" &&
				((p = !0),
				(l.scheduler = (w, E) => {
					E ? w() : ks(w);
				})),
			(l.augmentJob = (w) => {
				t && (w.flags |= 4),
					p && ((w.flags |= 2), u && ((w.id = u.uid), (w.i = u)));
			});
		const g = el(e, t, l);
		return rn && (h ? h.push(g) : a && g()), g;
	}
	function ql(e, t, n) {
		const s = this.proxy,
			r = te(e) ? (e.includes(".") ? pi(s, e) : () => s[e]) : e.bind(s, s);
		let i;
		D(t) ? (i = t) : ((i = t.handler), (n = t));
		const o = sn(this),
			l = hi(r, i.bind(s), n);
		return o(), l;
	}
	function pi(e, t) {
		const n = t.split(".");
		return () => {
			let s = e;
			for (let r = 0; r < n.length && s; r++) s = s[n[r]];
			return s;
		};
	}
	const Zl = (e, t) =>
		t === "modelValue" || t === "model-value"
			? e.modelModifiers
			: e[`${t}Modifiers`] || e[`${it(t)}Modifiers`] || e[`${pt(t)}Modifiers`];
	function Jl(e, t, ...n) {
		if (e.isUnmounted) return;
		const s = e.vnode.props || L;
		let r = n;
		const i = t.startsWith("update:"),
			o = i && Zl(s, t.slice(7));
		o &&
			(o.trim && (r = n.map((u) => (te(u) ? u.trim() : u))),
			o.number && (r = n.map(rs)));
		let l,
			a = s[(l = ss(t))] || s[(l = ss(it(t)))];
		!a && i && (a = s[(l = ss(pt(t)))]), a && $e(a, e, 6, r);
		const h = s[l + "Once"];
		if (h) {
			if (!e.emitted) e.emitted = {};
			else if (e.emitted[l]) return;
			(e.emitted[l] = !0), $e(h, e, 6, r);
		}
	}
	const Gl = new WeakMap();
	function di(e, t, n = !1) {
		const s = n ? Gl : t.emitsCache,
			r = s.get(e);
		if (r !== void 0) return r;
		const i = e.emits;
		let o = {},
			l = !1;
		if (!D(e)) {
			const a = (h) => {
				const u = di(h, t, !0);
				u && ((l = !0), ae(o, u));
			};
			!n && t.mixins.length && t.mixins.forEach(a),
				e.extends && a(e.extends),
				e.mixins && e.mixins.forEach(a);
		}
		return !i && !l
			? (X(e) && s.set(e, null), null)
			: (j(i) ? i.forEach((a) => (o[a] = null)) : ae(o, i),
				X(e) && s.set(e, o),
				o);
	}
	function zn(e, t) {
		return !e || !dn(t)
			? !1
			: ((t = t.slice(2).replace(/Once$/, "")),
				H(e, t[0].toLowerCase() + t.slice(1)) || H(e, pt(t)) || H(e, t));
	}
	function vu() {}
	function gi(e) {
		const {
				type: t,
				vnode: n,
				proxy: s,
				withProxy: r,
				propsOptions: [i],
				slots: o,
				attrs: l,
				emit: a,
				render: h,
				renderCache: u,
				props: p,
				data: g,
				setupState: w,
				ctx: E,
				inheritAttrs: R,
			} = e,
			Q = In(e);
		let z, U;
		try {
			if (n.shapeFlag & 4) {
				const P = r || s,
					Y = P;
				(z = Fe(h.call(Y, P, u, p, w, g, E))), (U = l);
			} else {
				const P = t;
				(z = Fe(
					P.length > 1 ? P(p, { attrs: l, slots: o, emit: a }) : P(p, null),
				)),
					(U = t.props ? l : Ql(l));
			}
		} catch (P) {
			(en.length = 0), En(P, e, 1), (z = Ne(ct));
		}
		let q = z;
		if (U && R !== !1) {
			const P = Object.keys(U),
				{ shapeFlag: Y } = q;
			P.length &&
				Y & 7 &&
				(i && P.some(es) && (U = Yl(U, i)), (q = Dt(q, U, !1, !0)));
		}
		return (
			n.dirs &&
				((q = Dt(q, null, !1, !0)),
				(q.dirs = q.dirs ? q.dirs.concat(n.dirs) : n.dirs)),
			n.transition && xs(q, n.transition),
			(z = q),
			In(Q),
			z
		);
	}
	const Ql = (e) => {
			let t;
			for (const n in e)
				(n === "class" || n === "style" || dn(n)) &&
					((t || (t = {}))[n] = e[n]);
			return t;
		},
		Yl = (e, t) => {
			const n = {};
			for (const s in e) (!es(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
			return n;
		};
	function Xl(e, t, n) {
		const { props: s, children: r, component: i } = e,
			{ props: o, children: l, patchFlag: a } = t,
			h = i.emitsOptions;
		if (t.dirs || t.transition) return !0;
		if (n && a >= 0) {
			if (a & 1024) return !0;
			if (a & 16) return s ? mi(s, o, h) : !!o;
			if (a & 8) {
				const u = t.dynamicProps;
				for (let p = 0; p < u.length; p++) {
					const g = u[p];
					if (o[g] !== s[g] && !zn(h, g)) return !0;
				}
			}
		} else
			return (r || l) && (!l || !l.$stable)
				? !0
				: s === o
					? !1
					: s
						? o
							? mi(s, o, h)
							: !0
						: !!o;
		return !1;
	}
	function mi(e, t, n) {
		const s = Object.keys(t);
		if (s.length !== Object.keys(e).length) return !0;
		for (let r = 0; r < s.length; r++) {
			const i = s[r];
			if (t[i] !== e[i] && !zn(n, i)) return !0;
		}
		return !1;
	}
	function ea({ vnode: e, parent: t }, n) {
		for (; t; ) {
			const s = t.subTree;
			if (
				(s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
			)
				((e = t.vnode).el = n), (t = t.parent);
			else break;
		}
	}
	const vi = (e) => e.__isSuspense;
	function ta(e, t) {
		t && t.pendingBranch
			? j(e)
				? t.effects.push(...e)
				: t.effects.push(e)
			: ll(e);
	}
	const Be = Symbol.for("v-fgt"),
		Ln = Symbol.for("v-txt"),
		ct = Symbol.for("v-cmt"),
		$n = Symbol.for("v-stc"),
		en = [];
	let xe = null;
	function _e(e = !1) {
		en.push((xe = e ? null : []));
	}
	function na() {
		en.pop(), (xe = en[en.length - 1] || null);
	}
	let tn = 1;
	function yi(e, t = !1) {
		(tn += e), e < 0 && xe && t && (xe.hasOnce = !0);
	}
	function bi(e) {
		return (
			(e.dynamicChildren = tn > 0 ? xe || St : null),
			na(),
			tn > 0 && xe && xe.push(e),
			e
		);
	}
	function Ie(e, t, n, s, r, i) {
		return bi(C(e, t, n, s, r, i, !0));
	}
	function wi(e, t, n, s, r) {
		return bi(Ne(e, t, n, s, r, !0));
	}
	function ki(e) {
		return e ? e.__v_isVNode === !0 : !1;
	}
	function nn(e, t) {
		return e.type === t.type && e.key === t.key;
	}
	const xi = ({ key: e }) => e ?? null,
		On = ({ ref: e, ref_key: t, ref_for: n }) => (
			typeof e == "number" && (e = "" + e),
			e != null
				? te(e) || oe(e) || D(e)
					? { i: Ee, r: e, k: t, f: !!n }
					: e
				: null
		);
	function C(
		e,
		t = null,
		n = null,
		s = 0,
		r = null,
		i = e === Be ? 0 : 1,
		o = !1,
		l = !1,
	) {
		const a = {
			__v_isVNode: !0,
			__v_skip: !0,
			type: e,
			props: t,
			key: t && xi(t),
			ref: t && On(t),
			scopeId: Br,
			slotScopeIds: null,
			children: n,
			component: null,
			suspense: null,
			ssContent: null,
			ssFallback: null,
			dirs: null,
			transition: null,
			el: null,
			anchor: null,
			target: null,
			targetStart: null,
			targetAnchor: null,
			staticCount: 0,
			shapeFlag: i,
			patchFlag: s,
			dynamicProps: r,
			dynamicChildren: null,
			appContext: null,
			ctx: Ee,
		};
		return (
			l
				? (Rs(a, n), i & 128 && e.normalize(a))
				: n && (a.shapeFlag |= te(n) ? 8 : 16),
			tn > 0 &&
				!o &&
				xe &&
				(a.patchFlag > 0 || i & 6) &&
				a.patchFlag !== 32 &&
				xe.push(a),
			a
		);
	}
	const Ne = sa;
	function sa(e, t = null, n = null, s = 0, r = null, i = !1) {
		if (((!e || e === Tl) && (e = ct), ki(e))) {
			const l = Dt(e, t, !0);
			return (
				n && Rs(l, n),
				tn > 0 &&
					!i &&
					xe &&
					(l.shapeFlag & 6 ? (xe[xe.indexOf(e)] = l) : xe.push(l)),
				(l.patchFlag = -2),
				l
			);
		}
		if ((ya(e) && (e = e.__vccOpts), t)) {
			t = ra(t);
			let { class: l, style: a } = t;
			l && !te(l) && (t.class = Mt(l)),
				X(a) && (ys(a) && !j(a) && (a = ae({}, a)), (t.style = bn(a)));
		}
		const o = te(e) ? 1 : vi(e) ? 128 : fl(e) ? 64 : X(e) ? 4 : D(e) ? 2 : 0;
		return C(e, t, n, s, r, o, i, !0);
	}
	function ra(e) {
		return e ? (ys(e) || ni(e) ? ae({}, e) : e) : null;
	}
	function Dt(e, t, n = !1, s = !1) {
		const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e,
			h = t ? oa(r || {}, t) : r,
			u = {
				__v_isVNode: !0,
				__v_skip: !0,
				type: e.type,
				props: h,
				key: h && xi(h),
				ref:
					t && t.ref
						? n && i
							? j(i)
								? i.concat(On(t))
								: [i, On(t)]
							: On(t)
						: i,
				scopeId: e.scopeId,
				slotScopeIds: e.slotScopeIds,
				children: l,
				target: e.target,
				targetStart: e.targetStart,
				targetAnchor: e.targetAnchor,
				staticCount: e.staticCount,
				shapeFlag: e.shapeFlag,
				patchFlag: t && e.type !== Be ? (o === -1 ? 16 : o | 16) : o,
				dynamicProps: e.dynamicProps,
				dynamicChildren: e.dynamicChildren,
				appContext: e.appContext,
				dirs: e.dirs,
				transition: a,
				component: e.component,
				suspense: e.suspense,
				ssContent: e.ssContent && Dt(e.ssContent),
				ssFallback: e.ssFallback && Dt(e.ssFallback),
				placeholder: e.placeholder,
				el: e.el,
				anchor: e.anchor,
				ctx: e.ctx,
				ce: e.ce,
			};
		return a && s && xs(u, a.clone(u)), u;
	}
	function ia(e = " ", t = 0) {
		return Ne(Ln, null, e, t);
	}
	function _i(e, t) {
		const n = Ne($n, null, e);
		return (n.staticCount = t), n;
	}
	function zt(e = "", t = !1) {
		return t ? (_e(), wi(ct, null, e)) : Ne(ct, null, e);
	}
	function Fe(e) {
		return e == null || typeof e == "boolean"
			? Ne(ct)
			: j(e)
				? Ne(Be, null, e.slice())
				: ki(e)
					? ut(e)
					: Ne(Ln, null, String(e));
	}
	function ut(e) {
		return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Dt(e);
	}
	function Rs(e, t) {
		let n = 0;
		const { shapeFlag: s } = e;
		if (t == null) t = null;
		else if (j(t)) n = 16;
		else if (typeof t == "object")
			if (s & 65) {
				const r = t.default;
				r && (r._c && (r._d = !1), Rs(e, r()), r._c && (r._d = !0));
				return;
			} else {
				n = 32;
				const r = t._;
				!r && !ni(t)
					? (t._ctx = Ee)
					: r === 3 &&
						Ee &&
						(Ee.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
			}
		else
			D(t)
				? ((t = { default: t, _ctx: Ee }), (n = 32))
				: ((t = String(t)), s & 64 ? ((n = 16), (t = [ia(t)])) : (n = 8));
		(e.children = t), (e.shapeFlag |= n);
	}
	function oa(...e) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const s = e[n];
			for (const r in s)
				if (r === "class")
					t.class !== s.class && (t.class = Mt([t.class, s.class]));
				else if (r === "style") t.style = bn([t.style, s.style]);
				else if (dn(r)) {
					const i = t[r],
						o = s[r];
					o &&
						i !== o &&
						!(j(i) && i.includes(o)) &&
						(t[r] = i ? [].concat(i, o) : o);
				} else r !== "" && (t[r] = s[r]);
		}
		return t;
	}
	function He(e, t, n, s = null) {
		$e(e, t, 7, [n, s]);
	}
	const la = Xr();
	let aa = 0;
	function ca(e, t, n) {
		const s = e.type,
			r = (t ? t.appContext : e.appContext) || la,
			i = {
				uid: aa++,
				vnode: e,
				type: s,
				parent: t,
				appContext: r,
				root: null,
				next: null,
				subTree: null,
				effect: null,
				update: null,
				job: null,
				scope: new Co(!0),
				render: null,
				proxy: null,
				exposed: null,
				exposeProxy: null,
				withProxy: null,
				provides: t ? t.provides : Object.create(r.provides),
				ids: t ? t.ids : ["", 0, 0],
				accessCache: null,
				renderCache: [],
				components: null,
				directives: null,
				propsOptions: ri(s, r),
				emitsOptions: di(s, r),
				emit: null,
				emitted: null,
				propsDefaults: L,
				inheritAttrs: s.inheritAttrs,
				ctx: L,
				data: L,
				props: L,
				attrs: L,
				slots: L,
				refs: L,
				setupState: L,
				setupContext: null,
				suspense: n,
				suspenseId: n ? n.pendingId : 0,
				asyncDep: null,
				asyncResolved: !1,
				isMounted: !1,
				isUnmounted: !1,
				isDeactivated: !1,
				bc: null,
				c: null,
				bm: null,
				m: null,
				bu: null,
				u: null,
				um: null,
				bum: null,
				da: null,
				a: null,
				rtg: null,
				rtc: null,
				ec: null,
				sp: null,
			};
		return (
			(i.ctx = { _: i }),
			(i.root = t ? t.root : i),
			(i.emit = Jl.bind(null, i)),
			e.ce && e.ce(i),
			i
		);
	}
	let de = null;
	const ua = () => de || Ee;
	let Bn, As;
	{
		const e = yn(),
			t = (n, s) => {
				let r;
				return (
					(r = e[n]) || (r = e[n] = []),
					r.push(s),
					(i) => {
						r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
					}
				);
			};
		(Bn = t("__VUE_INSTANCE_SETTERS__", (n) => (de = n))),
			(As = t("__VUE_SSR_SETTERS__", (n) => (rn = n)));
	}
	const sn = (e) => {
			const t = de;
			return (
				Bn(e),
				e.scope.on(),
				() => {
					e.scope.off(), Bn(t);
				}
			);
		},
		Ti = () => {
			de && de.scope.off(), Bn(null);
		};
	function Si(e) {
		return e.vnode.shapeFlag & 4;
	}
	let rn = !1;
	function fa(e, t = !1, n = !1) {
		t && As(t);
		const { props: s, children: r } = e.vnode,
			i = Si(e);
		zl(e, s, i, t), Bl(e, r, n || t);
		const o = i ? ha(e, t) : void 0;
		return t && As(!1), o;
	}
	function ha(e, t) {
		const n = e.type;
		(e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Cl));
		const { setup: s } = n;
		if (s) {
			ze();
			const r = (e.setupContext = s.length > 1 ? da(e) : null),
				i = sn(e),
				o = It(s, e, 0, [e.props, r]),
				l = nr(o);
			if ((Le(), i(), (l || e.sp) && !Qt(e) && Fr(e), l)) {
				if ((o.then(Ti, Ti), t))
					return o
						.then((a) => {
							Ci(e, a);
						})
						.catch((a) => {
							En(a, e, 0);
						});
				e.asyncDep = o;
			} else Ci(e, o);
		} else Mi(e);
	}
	function Ci(e, t, n) {
		D(t)
			? e.type.__ssrInlineRender
				? (e.ssrRender = t)
				: (e.render = t)
			: X(t) && (e.setupState = Ar(t)),
			Mi(e);
	}
	function Mi(e, t, n) {
		const s = e.type;
		e.render || (e.render = s.render || je);
		{
			const r = sn(e);
			ze();
			try {
				Ml(e);
			} finally {
				Le(), r();
			}
		}
	}
	const pa = {
		get(e, t) {
			return ue(e, "get", ""), e[t];
		},
	};
	function da(e) {
		const t = (n) => {
			e.exposed = n || {};
		};
		return {
			attrs: new Proxy(e.attrs, pa),
			slots: e.slots,
			emit: e.emit,
			expose: t,
		};
	}
	function Nn(e) {
		return e.exposed
			? e.exposeProxy ||
					(e.exposeProxy = new Proxy(Ar(qo(e.exposed)), {
						get(t, n) {
							if (n in t) return t[n];
							if (n in Yt) return Yt[n](e);
						},
						has(t, n) {
							return n in t || n in Yt;
						},
					}))
			: e.proxy;
	}
	const ga = /(?:^|[-_])\w/g,
		ma = (e) => e.replace(ga, (t) => t.toUpperCase()).replace(/[-_]/g, "");
	function va(e, t = !0) {
		return D(e) ? e.displayName || e.name : e.name || (t && e.__name);
	}
	function Ei(e, t, n = !1) {
		let s = va(t);
		if (!s && t.__file) {
			const r = t.__file.match(/([^/\\]+)\.\w+$/);
			r && (s = r[1]);
		}
		if (!s && e && e.parent) {
			const r = (i) => {
				for (const o in i) if (i[o] === t) return o;
			};
			s =
				r(e.components || e.parent.type.components) ||
				r(e.appContext.components);
		}
		return s ? ma(s) : n ? "App" : "Anonymous";
	}
	function ya(e) {
		return D(e) && "__vccOpts" in e;
	}
	const Lt = (e, t) => Yo(e, t, rn),
		ba = "3.5.21"; /**
	 * @vue/runtime-dom v3.5.21
	 * (c) 2018-present Yuxi (Evan) You and Vue contributors
	 * @license MIT
	 **/
	let js;
	const Pi = typeof window < "u" && window.trustedTypes;
	if (Pi)
		try {
			js = Pi.createPolicy("vue", { createHTML: (e) => e });
		} catch {}
	const Ii = js ? (e) => js.createHTML(e) : (e) => e,
		wa = "http://www.w3.org/2000/svg",
		ka = "http://www.w3.org/1998/Math/MathML",
		tt = typeof document < "u" ? document : null,
		Ri = tt && tt.createElement("template"),
		xa = {
			insert: (e, t, n) => {
				t.insertBefore(e, n || null);
			},
			remove: (e) => {
				const t = e.parentNode;
				t && t.removeChild(e);
			},
			createElement: (e, t, n, s) => {
				const r =
					t === "svg"
						? tt.createElementNS(wa, e)
						: t === "mathml"
							? tt.createElementNS(ka, e)
							: n
								? tt.createElement(e, { is: n })
								: tt.createElement(e);
				return (
					e === "select" &&
						s &&
						s.multiple != null &&
						r.setAttribute("multiple", s.multiple),
					r
				);
			},
			createText: (e) => tt.createTextNode(e),
			createComment: (e) => tt.createComment(e),
			setText: (e, t) => {
				e.nodeValue = t;
			},
			setElementText: (e, t) => {
				e.textContent = t;
			},
			parentNode: (e) => e.parentNode,
			nextSibling: (e) => e.nextSibling,
			querySelector: (e) => tt.querySelector(e),
			setScopeId(e, t) {
				e.setAttribute(t, "");
			},
			insertStaticContent(e, t, n, s, r, i) {
				const o = n ? n.previousSibling : t.lastChild;
				if (r && (r === i || r.nextSibling))
					for (
						;
						t.insertBefore(r.cloneNode(!0), n),
							!(r === i || !(r = r.nextSibling));
					);
				else {
					Ri.innerHTML = Ii(
						s === "svg"
							? `<svg>${e}</svg>`
							: s === "mathml"
								? `<math>${e}</math>`
								: e,
					);
					const l = Ri.content;
					if (s === "svg" || s === "mathml") {
						const a = l.firstChild;
						for (; a.firstChild; ) l.appendChild(a.firstChild);
						l.removeChild(a);
					}
					t.insertBefore(l, n);
				}
				return [
					o ? o.nextSibling : t.firstChild,
					n ? n.previousSibling : t.lastChild,
				];
			},
		},
		_a = Symbol("_vtc");
	function Ta(e, t, n) {
		const s = e[_a];
		s && (t = (t ? [t, ...s] : [...s]).join(" ")),
			t == null
				? e.removeAttribute("class")
				: n
					? e.setAttribute("class", t)
					: (e.className = t);
	}
	const Ai = Symbol("_vod"),
		Sa = Symbol("_vsh"),
		Ca = Symbol(""),
		Ma = /(?:^|;)\s*display\s*:/;
	function Ea(e, t, n) {
		const s = e.style,
			r = te(n);
		let i = !1;
		if (n && !r) {
			if (t)
				if (te(t))
					for (const o of t.split(";")) {
						const l = o.slice(0, o.indexOf(":")).trim();
						n[l] == null && Fn(s, l, "");
					}
				else for (const o in t) n[o] == null && Fn(s, o, "");
			for (const o in n) o === "display" && (i = !0), Fn(s, o, n[o]);
		} else if (r) {
			if (t !== n) {
				const o = s[Ca];
				o && (n += ";" + o), (s.cssText = n), (i = Ma.test(n));
			}
		} else t && e.removeAttribute("style");
		Ai in e && ((e[Ai] = i ? s.display : ""), e[Sa] && (s.display = "none"));
	}
	const ji = /\s*!important$/;
	function Fn(e, t, n) {
		if (j(n)) n.forEach((s) => Fn(e, t, s));
		else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
		else {
			const s = Pa(e, t);
			ji.test(n)
				? e.setProperty(pt(s), n.replace(ji, ""), "important")
				: (e[s] = n);
		}
	}
	const Di = ["Webkit", "Moz", "ms"],
		Ds = {};
	function Pa(e, t) {
		const n = Ds[t];
		if (n) return n;
		let s = it(t);
		if (s !== "filter" && s in e) return (Ds[t] = s);
		s = ir(s);
		for (let r = 0; r < Di.length; r++) {
			const i = Di[r] + s;
			if (i in e) return (Ds[t] = i);
		}
		return t;
	}
	const zi = "http://www.w3.org/1999/xlink";
	function Li(e, t, n, s, r, i = So(t)) {
		s && t.startsWith("xlink:")
			? n == null
				? e.removeAttributeNS(zi, t.slice(6, t.length))
				: e.setAttributeNS(zi, t, n)
			: n == null || (i && !ar(n))
				? e.removeAttribute(t)
				: e.setAttribute(t, i ? "" : rt(n) ? String(n) : n);
	}
	function $i(e, t, n, s, r) {
		if (t === "innerHTML" || t === "textContent") {
			n != null && (e[t] = t === "innerHTML" ? Ii(n) : n);
			return;
		}
		const i = e.tagName;
		if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
			const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value,
				a = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
			(l !== a || !("_value" in e)) && (e.value = a),
				n == null && e.removeAttribute(t),
				(e._value = n);
			return;
		}
		let o = !1;
		if (n === "" || n == null) {
			const l = typeof e[t];
			l === "boolean"
				? (n = ar(n))
				: n == null && l === "string"
					? ((n = ""), (o = !0))
					: l === "number" && ((n = 0), (o = !0));
		}
		try {
			e[t] = n;
		} catch {}
		o && e.removeAttribute(r || t);
	}
	function $t(e, t, n, s) {
		e.addEventListener(t, n, s);
	}
	function Ia(e, t, n, s) {
		e.removeEventListener(t, n, s);
	}
	const Oi = Symbol("_vei");
	function Ra(e, t, n, s, r = null) {
		const i = e[Oi] || (e[Oi] = {}),
			o = i[t];
		if (s && o) o.value = s;
		else {
			const [l, a] = Aa(t);
			if (s) {
				const h = (i[t] = za(s, r));
				$t(e, l, h, a);
			} else o && (Ia(e, l, o, a), (i[t] = void 0));
		}
	}
	const Bi = /(?:Once|Passive|Capture)$/;
	function Aa(e) {
		let t;
		if (Bi.test(e)) {
			t = {};
			let s;
			for (; (s = e.match(Bi)); )
				(e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
		}
		return [e[2] === ":" ? e.slice(3) : pt(e.slice(2)), t];
	}
	let zs = 0;
	const ja = Promise.resolve(),
		Da = () => zs || (ja.then(() => (zs = 0)), (zs = Date.now()));
	function za(e, t) {
		const n = (s) => {
			if (!s._vts) s._vts = Date.now();
			else if (s._vts <= n.attached) return;
			$e(La(s, n.value), t, 5, [s]);
		};
		return (n.value = e), (n.attached = Da()), n;
	}
	function La(e, t) {
		if (j(t)) {
			const n = e.stopImmediatePropagation;
			return (
				(e.stopImmediatePropagation = () => {
					n.call(e), (e._stopped = !0);
				}),
				t.map((s) => (r) => !r._stopped && s && s(r))
			);
		}
		return t;
	}
	const Ni = (e) =>
			e.charCodeAt(0) === 111 &&
			e.charCodeAt(1) === 110 &&
			e.charCodeAt(2) > 96 &&
			e.charCodeAt(2) < 123,
		$a = (e, t, n, s, r, i) => {
			const o = r === "svg";
			t === "class"
				? Ta(e, s, o)
				: t === "style"
					? Ea(e, n, s)
					: dn(t)
						? es(t) || Ra(e, t, n, s, i)
						: (
									t[0] === "."
										? ((t = t.slice(1)), !0)
										: t[0] === "^"
											? ((t = t.slice(1)), !1)
											: Oa(e, t, s, o)
								)
							? ($i(e, t, s),
								!e.tagName.includes("-") &&
									(t === "value" || t === "checked" || t === "selected") &&
									Li(e, t, s, o, i, t !== "value"))
							: e._isVueCE && (/[A-Z]/.test(t) || !te(s))
								? $i(e, it(t), s, i, t)
								: (t === "true-value"
										? (e._trueValue = s)
										: t === "false-value" && (e._falseValue = s),
									Li(e, t, s, o));
		};
	function Oa(e, t, n, s) {
		if (s)
			return !!(
				t === "innerHTML" ||
				t === "textContent" ||
				(t in e && Ni(t) && D(n))
			);
		if (
			t === "spellcheck" ||
			t === "draggable" ||
			t === "translate" ||
			t === "autocorrect" ||
			t === "form" ||
			(t === "list" && e.tagName === "INPUT") ||
			(t === "type" && e.tagName === "TEXTAREA")
		)
			return !1;
		if (t === "width" || t === "height") {
			const r = e.tagName;
			if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
				return !1;
		}
		return Ni(t) && te(n) ? !1 : t in e;
	}
	const Fi = (e) => {
		const t = e.props["onUpdate:modelValue"] || !1;
		return j(t) ? (n) => vn(t, n) : t;
	};
	function Ba(e) {
		e.target.composing = !0;
	}
	function Hi(e) {
		const t = e.target;
		t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
	}
	const Ls = Symbol("_assign"),
		Na = {
			created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
				e[Ls] = Fi(r);
				const i = s || (r.props && r.props.type === "number");
				$t(e, t ? "change" : "input", (o) => {
					if (o.target.composing) return;
					let l = e.value;
					n && (l = l.trim()), i && (l = rs(l)), e[Ls](l);
				}),
					n &&
						$t(e, "change", () => {
							e.value = e.value.trim();
						}),
					t ||
						($t(e, "compositionstart", Ba),
						$t(e, "compositionend", Hi),
						$t(e, "change", Hi));
			},
			mounted(e, { value: t }) {
				e.value = t ?? "";
			},
			beforeUpdate(
				e,
				{ value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } },
				o,
			) {
				if (((e[Ls] = Fi(o)), e.composing)) return;
				const l =
						(i || e.type === "number") && !/^0\d/.test(e.value)
							? rs(e.value)
							: e.value,
					a = t ?? "";
				l !== a &&
					((document.activeElement === e &&
						e.type !== "range" &&
						((s && t === n) || (r && e.value.trim() === a))) ||
						(e.value = a));
			},
		},
		Fa = ["ctrl", "shift", "alt", "meta"],
		Ha = {
			stop: (e) => e.stopPropagation(),
			prevent: (e) => e.preventDefault(),
			self: (e) => e.target !== e.currentTarget,
			ctrl: (e) => !e.ctrlKey,
			shift: (e) => !e.shiftKey,
			alt: (e) => !e.altKey,
			meta: (e) => !e.metaKey,
			left: (e) => "button" in e && e.button !== 0,
			middle: (e) => "button" in e && e.button !== 1,
			right: (e) => "button" in e && e.button !== 2,
			exact: (e, t) => Fa.some((n) => e[`${n}Key`] && !t.includes(n)),
		},
		Ui = (e, t) => {
			const n = e._withMods || (e._withMods = {}),
				s = t.join(".");
			return (
				n[s] ||
				(n[s] = (r, ...i) => {
					for (let o = 0; o < t.length; o++) {
						const l = Ha[t[o]];
						if (l && l(r, t)) return;
					}
					return e(r, ...i);
				})
			);
		},
		Ua = ae({ patchProp: $a }, xa);
	let Vi;
	function Va() {
		return Vi || (Vi = Fl(Ua));
	}
	const Wa = (...e) => {
		const t = Va().createApp(...e),
			{ mount: n } = t;
		return (
			(t.mount = (s) => {
				const r = qa(s);
				if (!r) return;
				const i = t._component;
				!D(i) && !i.render && !i.template && (i.template = r.innerHTML),
					r.nodeType === 1 && (r.textContent = "");
				const o = n(r, !1, Ka(r));
				return (
					r instanceof Element &&
						(r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
					o
				);
			}),
			t
		);
	};
	function Ka(e) {
		if (e instanceof SVGElement) return "svg";
		if (typeof MathMLElement == "function" && e instanceof MathMLElement)
			return "mathml";
	}
	function qa(e) {
		return te(e) ? document.querySelector(e) : e;
	}
	function $s(e) {
		const t = Zo(),
			n = e.subscribe((s) => {
				t.value = s;
			});
		return fr() && Mo(n), t;
	}
	let Re = [],
		ft = 0;
	const Hn = 4;
	const Os = (e) => {
		const t = [],
			n = {
				get() {
					return n.lc || n.listen(() => {})(), n.value;
				},
				lc: 0,
				listen(s) {
					return (
						(n.lc = t.push(s)),
						() => {
							for (let i = ft + Hn; i < Re.length; )
								Re[i] === s ? Re.splice(i, Hn) : (i += Hn);
							const r = t.indexOf(s);
							~r && (t.splice(r, 1), --n.lc || n.off());
						}
					);
				},
				notify(s, r) {
					const i = !Re.length;
					for (const o of t) Re.push(o, n.value, s, r);
					if (i) {
						for (ft = 0; ft < Re.length; ft += Hn)
							Re[ft](Re[ft + 1], Re[ft + 2], Re[ft + 3]);
						Re.length = 0;
					}
				},
				off() {},
				set(s) {
					const r = n.value;
					r !== s && ((n.value = s), n.notify(r));
				},
				subscribe(s) {
					const r = n.listen(s);
					return s(n.value), r;
				},
				value: e,
			};
		return n;
	};
	const Za = 5,
		Un = 6,
		Vn = 10;
	let Ja = (e, t, n, s) => (
			(e.events = e.events || {}),
			e.events[n + Vn] ||
				(e.events[n + Vn] = s((r) => {
					e.events[n].reduceRight((i, o) => (o(i), i), { shared: {}, ...r });
				})),
			(e.events[n] = e.events[n] || []),
			e.events[n].push(t),
			() => {
				const r = e.events[n],
					i = r.indexOf(t);
				r.splice(i, 1),
					r.length ||
						(delete e.events[n], e.events[n + Vn](), delete e.events[n + Vn]);
			}
		),
		Ga = 1e3,
		Qa = (e, t) =>
			Ja(
				e,
				(s) => {
					const r = t(s);
					r && e.events[Un].push(r);
				},
				Za,
				(s) => {
					const r = e.listen;
					e.listen = (...o) => (
						!e.lc && !e.active && ((e.active = !0), s()), r(...o)
					);
					const i = e.off;
					return (
						(e.events[Un] = []),
						(e.off = () => {
							i(),
								setTimeout(() => {
									if (e.active && !e.lc) {
										e.active = !1;
										for (const o of e.events[Un]) o();
										e.events[Un] = [];
									}
								}, Ga);
						}),
						() => {
							(e.listen = r), (e.off = i);
						}
					);
				},
			),
		Wi = (e) => e,
		Ot = {},
		Bs = { addEventListener() {}, removeEventListener() {} };
	function Ya() {
		try {
			return typeof localStorage < "u";
		} catch {
			return !1;
		}
	}
	Ya() && (Ot = localStorage),
		typeof window < "u" &&
			(Bs = {
				addEventListener(e, t, n) {
					window.addEventListener("storage", t),
						window.addEventListener("pageshow", n);
				},
				removeEventListener(e, t, n) {
					window.removeEventListener("storage", t),
						window.removeEventListener("pageshow", n);
				},
			});
	function Xa(e, t = void 0, n = {}) {
		const s = n.encode || Wi,
			r = n.decode || Wi,
			i = Os(t),
			o = i.set;
		i.set = (h) => {
			const u = s(h);
			typeof u > "u" ? delete Ot[e] : (Ot[e] = u), o(h);
		};
		function l(h) {
			h.key === e
				? h.newValue === null
					? o(t)
					: o(r(h.newValue))
				: Ot[e] || o(t);
		}
		function a() {
			i.set(Ot[e] ? r(Ot[e]) : t);
		}
		return (
			Qa(i, () => {
				if ((a(), n.listen !== !1))
					return (
						Bs.addEventListener(e, l, a),
						() => {
							Bs.removeEventListener(e, l, a);
						}
					);
			}),
			i
		);
	}
	const Ns = Os(!1),
		Fs = Os(!1),
		Bt = Xa("chat-messages", [], {
			encode: JSON.stringify,
			decode: JSON.parse,
		}),
		Wn = () => {
			Ns.set(!Ns.get());
		},
		Kn = (e) => {
			const t = {
				...e,
				id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				timestamp: Date.now(),
			};
			Bt.set([...Bt.get(), t]);
		};
	function Hs() {
		return {
			async: !1,
			breaks: !1,
			extensions: null,
			gfm: !0,
			hooks: null,
			pedantic: !1,
			renderer: null,
			silent: !1,
			tokenizer: null,
			walkTokens: null,
		};
	}
	let wt = Hs();
	function Ki(e) {
		wt = e;
	}
	const qi = /[&<>"']/,
		ec = new RegExp(qi.source, "g"),
		Zi = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
		tc = new RegExp(Zi.source, "g"),
		nc = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		},
		Ji = (e) => nc[e];
	function Te(e, t) {
		if (t) {
			if (qi.test(e)) return e.replace(ec, Ji);
		} else if (Zi.test(e)) return e.replace(tc, Ji);
		return e;
	}
	const sc = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
	function rc(e) {
		return e.replace(
			sc,
			(t, n) => (
				(n = n.toLowerCase()),
				n === "colon"
					? ":"
					: n.charAt(0) === "#"
						? n.charAt(1) === "x"
							? String.fromCharCode(Number.parseInt(n.substring(2), 16))
							: String.fromCharCode(+n.substring(1))
						: ""
			),
		);
	}
	const ic = /(^|[^[])\^/g;
	function W(e, t) {
		let n = typeof e == "string" ? e : e.source;
		t = t || "";
		const s = {
			replace: (r, i) => {
				let o = typeof i == "string" ? i : i.source;
				return (o = o.replace(ic, "$1")), (n = n.replace(r, o)), s;
			},
			getRegex: () => new RegExp(n, t),
		};
		return s;
	}
	function Gi(e) {
		try {
			e = encodeURI(e).replace(/%25/g, "%");
		} catch {
			return null;
		}
		return e;
	}
	const on = { exec: () => null };
	function Qi(e, t) {
		const n = e.replace(/\|/g, (i, o, l) => {
				let a = !1,
					h = o;
				for (; --h >= 0 && l[h] === "\\"; ) a = !a;
				return a ? "|" : " |";
			}),
			s = n.split(/ \|/);
		let r = 0;
		if (
			(s[0].trim() || s.shift(),
			s.length > 0 && !s[s.length - 1].trim() && s.pop(),
			t)
		)
			if (s.length > t) s.splice(t);
			else for (; s.length < t; ) s.push("");
		for (; r < s.length; r++) s[r] = s[r].trim().replace(/\\\|/g, "|");
		return s;
	}
	function qn(e, t, n) {
		const s = e.length;
		if (s === 0) return "";
		let r = 0;
		for (; r < s && e.charAt(s - r - 1) === t; ) r++;
		return e.slice(0, s - r);
	}
	function oc(e, t) {
		if (e.indexOf(t[1]) === -1) return -1;
		let n = 0;
		for (let s = 0; s < e.length; s++)
			if (e[s] === "\\") s++;
			else if (e[s] === t[0]) n++;
			else if (e[s] === t[1] && (n--, n < 0)) return s;
		return -1;
	}
	function Yi(e, t, n, s) {
		const r = t.href,
			i = t.title ? Te(t.title) : null,
			o = e[1].replace(/\\([[\]])/g, "$1");
		if (e[0].charAt(0) !== "!") {
			s.state.inLink = !0;
			const l = {
				type: "link",
				raw: n,
				href: r,
				title: i,
				text: o,
				tokens: s.inlineTokens(o),
			};
			return (s.state.inLink = !1), l;
		}
		return { type: "image", raw: n, href: r, title: i, text: Te(o) };
	}
	function lc(e, t) {
		const n = e.match(/^(\s+)(?:```)/);
		if (n === null) return t;
		const s = n[1];
		return t
			.split(`
  `)
			.map((r) => {
				const i = r.match(/^\s+/);
				if (i === null) return r;
				const [o] = i;
				return o.length >= s.length ? r.slice(s.length) : r;
			})
			.join(`
  `);
	}
	class Zn {
		constructor(t) {
			K(this, "options");
			K(this, "rules");
			K(this, "lexer");
			this.options = t || wt;
		}
		space(t) {
			const n = this.rules.block.newline.exec(t);
			if (n && n[0].length > 0) return { type: "space", raw: n[0] };
		}
		code(t) {
			const n = this.rules.block.code.exec(t);
			if (n) {
				const s = n[0].replace(/^ {1,4}/gm, "");
				return {
					type: "code",
					raw: n[0],
					codeBlockStyle: "indented",
					text: this.options.pedantic
						? s
						: qn(
								s,
								`
  `,
							),
				};
			}
		}
		fences(t) {
			const n = this.rules.block.fences.exec(t);
			if (n) {
				const s = n[0],
					r = lc(s, n[3] || "");
				return {
					type: "code",
					raw: s,
					lang: n[2]
						? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
						: n[2],
					text: r,
				};
			}
		}
		heading(t) {
			const n = this.rules.block.heading.exec(t);
			if (n) {
				let s = n[2].trim();
				if (/#$/.test(s)) {
					const r = qn(s, "#");
					(this.options.pedantic || !r || / $/.test(r)) && (s = r.trim());
				}
				return {
					type: "heading",
					raw: n[0],
					depth: n[1].length,
					text: s,
					tokens: this.lexer.inline(s),
				};
			}
		}
		hr(t) {
			const n = this.rules.block.hr.exec(t);
			if (n) return { type: "hr", raw: n[0] };
		}
		blockquote(t) {
			const n = this.rules.block.blockquote.exec(t);
			if (n) {
				let s = n[0].replace(
					/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
					`
      $1`,
				);
				s = qn(
					s.replace(/^ *>[ \t]?/gm, ""),
					`
  `,
				);
				const r = this.lexer.state.top;
				this.lexer.state.top = !0;
				const i = this.lexer.blockTokens(s);
				return (
					(this.lexer.state.top = r),
					{ type: "blockquote", raw: n[0], tokens: i, text: s }
				);
			}
		}
		list(t) {
			let n = this.rules.block.list.exec(t);
			if (n) {
				let s = n[1].trim();
				const r = s.length > 1,
					i = {
						type: "list",
						raw: "",
						ordered: r,
						start: r ? +s.slice(0, -1) : "",
						loose: !1,
						items: [],
					};
				(s = r ? `\\d{1,9}\\${s.slice(-1)}` : `\\${s}`),
					this.options.pedantic && (s = r ? s : "[*+-]");
				const o = new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);
				let l = "",
					a = "",
					h = !1;
				for (; t; ) {
					let u = !1;
					if (!(n = o.exec(t)) || this.rules.block.hr.test(t)) break;
					(l = n[0]), (t = t.substring(l.length));
					let p = n[2]
							.split(
								`
  `,
								1,
							)[0]
							.replace(/^\t+/, (z) => " ".repeat(3 * z.length)),
						g = t.split(
							`
  `,
							1,
						)[0],
						w = 0;
					this.options.pedantic
						? ((w = 2), (a = p.trimStart()))
						: ((w = n[2].search(/[^ ]/)),
							(w = w > 4 ? 1 : w),
							(a = p.slice(w)),
							(w += n[1].length));
					let E = !1;
					if (
						(!p &&
							/^ *$/.test(g) &&
							((l +=
								g +
								`
  `),
							(t = t.substring(g.length + 1)),
							(u = !0)),
						!u)
					) {
						const z = new RegExp(
								`^ {0,${Math.min(3, w - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`,
							),
							U = new RegExp(
								`^ {0,${Math.min(3, w - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
							),
							q = new RegExp(`^ {0,${Math.min(3, w - 1)}}(?:\`\`\`|~~~)`),
							P = new RegExp(`^ {0,${Math.min(3, w - 1)}}#`);
						for (; t; ) {
							const Y = t.split(
								`
  `,
								1,
							)[0];
							if (
								((g = Y),
								this.options.pedantic &&
									(g = g.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
								q.test(g) || P.test(g) || z.test(g) || U.test(t))
							)
								break;
							if (g.search(/[^ ]/) >= w || !g.trim())
								a +=
									`
  ` + g.slice(w);
							else {
								if (
									E ||
									p.search(/[^ ]/) >= 4 ||
									q.test(p) ||
									P.test(p) ||
									U.test(p)
								)
									break;
								a +=
									`
  ` + g;
							}
							!E && !g.trim() && (E = !0),
								(l +=
									Y +
									`
  `),
								(t = t.substring(Y.length + 1)),
								(p = g.slice(w));
						}
					}
					i.loose || (h ? (i.loose = !0) : /\n *\n *$/.test(l) && (h = !0));
					let R = null,
						Q;
					this.options.gfm &&
						((R = /^\[[ xX]\] /.exec(a)),
						R && ((Q = R[0] !== "[ ] "), (a = a.replace(/^\[[ xX]\] +/, "")))),
						i.items.push({
							type: "list_item",
							raw: l,
							task: !!R,
							checked: Q,
							loose: !1,
							text: a,
							tokens: [],
						}),
						(i.raw += l);
				}
				(i.items[i.items.length - 1].raw = l.trimEnd()),
					(i.items[i.items.length - 1].text = a.trimEnd()),
					(i.raw = i.raw.trimEnd());
				for (let u = 0; u < i.items.length; u++)
					if (
						((this.lexer.state.top = !1),
						(i.items[u].tokens = this.lexer.blockTokens(i.items[u].text, [])),
						!i.loose)
					) {
						const p = i.items[u].tokens.filter((w) => w.type === "space"),
							g = p.length > 0 && p.some((w) => /\n.*\n/.test(w.raw));
						i.loose = g;
					}
				if (i.loose)
					for (let u = 0; u < i.items.length; u++) i.items[u].loose = !0;
				return i;
			}
		}
		html(t) {
			const n = this.rules.block.html.exec(t);
			if (n)
				return {
					type: "html",
					block: !0,
					raw: n[0],
					pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
					text: n[0],
				};
		}
		def(t) {
			const n = this.rules.block.def.exec(t);
			if (n) {
				const s = n[1].toLowerCase().replace(/\s+/g, " "),
					r = n[2]
						? n[2]
								.replace(/^<(.*)>$/, "$1")
								.replace(this.rules.inline.anyPunctuation, "$1")
						: "",
					i = n[3]
						? n[3]
								.substring(1, n[3].length - 1)
								.replace(this.rules.inline.anyPunctuation, "$1")
						: n[3];
				return { type: "def", tag: s, raw: n[0], href: r, title: i };
			}
		}
		table(t) {
			const n = this.rules.block.table.exec(t);
			if (!n || !/[:|]/.test(n[2])) return;
			const s = Qi(n[1]),
				r = n[2].replace(/^\||\| *$/g, "").split("|"),
				i =
					n[3] && n[3].trim()
						? n[3].replace(/\n[ \t]*$/, "").split(`
  `)
						: [],
				o = { type: "table", raw: n[0], header: [], align: [], rows: [] };
			if (s.length === r.length) {
				for (const l of r)
					/^ *-+: *$/.test(l)
						? o.align.push("right")
						: /^ *:-+: *$/.test(l)
							? o.align.push("center")
							: /^ *:-+ *$/.test(l)
								? o.align.push("left")
								: o.align.push(null);
				for (const l of s)
					o.header.push({ text: l, tokens: this.lexer.inline(l) });
				for (const l of i)
					o.rows.push(
						Qi(l, o.header.length).map((a) => ({
							text: a,
							tokens: this.lexer.inline(a),
						})),
					);
				return o;
			}
		}
		lheading(t) {
			const n = this.rules.block.lheading.exec(t);
			if (n)
				return {
					type: "heading",
					raw: n[0],
					depth: n[2].charAt(0) === "=" ? 1 : 2,
					text: n[1],
					tokens: this.lexer.inline(n[1]),
				};
		}
		paragraph(t) {
			const n = this.rules.block.paragraph.exec(t);
			if (n) {
				const s =
					n[1].charAt(n[1].length - 1) ===
					`
  `
						? n[1].slice(0, -1)
						: n[1];
				return {
					type: "paragraph",
					raw: n[0],
					text: s,
					tokens: this.lexer.inline(s),
				};
			}
		}
		text(t) {
			const n = this.rules.block.text.exec(t);
			if (n)
				return {
					type: "text",
					raw: n[0],
					text: n[0],
					tokens: this.lexer.inline(n[0]),
				};
		}
		escape(t) {
			const n = this.rules.inline.escape.exec(t);
			if (n) return { type: "escape", raw: n[0], text: Te(n[1]) };
		}
		tag(t) {
			const n = this.rules.inline.tag.exec(t);
			if (n)
				return (
					!this.lexer.state.inLink && /^<a /i.test(n[0])
						? (this.lexer.state.inLink = !0)
						: this.lexer.state.inLink &&
							/^<\/a>/i.test(n[0]) &&
							(this.lexer.state.inLink = !1),
					!this.lexer.state.inRawBlock &&
					/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
						? (this.lexer.state.inRawBlock = !0)
						: this.lexer.state.inRawBlock &&
							/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) &&
							(this.lexer.state.inRawBlock = !1),
					{
						type: "html",
						raw: n[0],
						inLink: this.lexer.state.inLink,
						inRawBlock: this.lexer.state.inRawBlock,
						block: !1,
						text: n[0],
					}
				);
		}
		link(t) {
			const n = this.rules.inline.link.exec(t);
			if (n) {
				const s = n[2].trim();
				if (!this.options.pedantic && /^</.test(s)) {
					if (!/>$/.test(s)) return;
					const o = qn(s.slice(0, -1), "\\");
					if ((s.length - o.length) % 2 === 0) return;
				} else {
					const o = oc(n[2], "()");
					if (o > -1) {
						const a = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + o;
						(n[2] = n[2].substring(0, o)),
							(n[0] = n[0].substring(0, a).trim()),
							(n[3] = "");
					}
				}
				let r = n[2],
					i = "";
				if (this.options.pedantic) {
					const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);
					o && ((r = o[1]), (i = o[3]));
				} else i = n[3] ? n[3].slice(1, -1) : "";
				return (
					(r = r.trim()),
					/^</.test(r) &&
						(this.options.pedantic && !/>$/.test(s)
							? (r = r.slice(1))
							: (r = r.slice(1, -1))),
					Yi(
						n,
						{
							href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
							title: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
						},
						n[0],
						this.lexer,
					)
				);
			}
		}
		reflink(t, n) {
			let s;
			if (
				(s = this.rules.inline.reflink.exec(t)) ||
				(s = this.rules.inline.nolink.exec(t))
			) {
				const r = (s[2] || s[1]).replace(/\s+/g, " "),
					i = n[r.toLowerCase()];
				if (!i) {
					const o = s[0].charAt(0);
					return { type: "text", raw: o, text: o };
				}
				return Yi(s, i, s[0], this.lexer);
			}
		}
		emStrong(t, n, s = "") {
			let r = this.rules.inline.emStrongLDelim.exec(t);
			if (!r || (r[3] && s.match(/[\p{L}\p{N}]/u))) return;
			if (
				!(r[1] || r[2] || "") ||
				!s ||
				this.rules.inline.punctuation.exec(s)
			) {
				const o = [...r[0]].length - 1;
				let l,
					a,
					h = o,
					u = 0;
				const p =
					r[0][0] === "*"
						? this.rules.inline.emStrongRDelimAst
						: this.rules.inline.emStrongRDelimUnd;
				for (
					p.lastIndex = 0, n = n.slice(-1 * t.length + o);
					(r = p.exec(n)) != null;
				) {
					if (((l = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]), !l))
						continue;
					if (((a = [...l].length), r[3] || r[4])) {
						h += a;
						continue;
					}
					if ((r[5] || r[6]) && o % 3 && !((o + a) % 3)) {
						u += a;
						continue;
					}
					if (((h -= a), h > 0)) continue;
					a = Math.min(a, a + h + u);
					const g = [...r[0]][0].length,
						w = t.slice(0, o + r.index + g + a);
					if (Math.min(o, a) % 2) {
						const R = w.slice(1, -1);
						return {
							type: "em",
							raw: w,
							text: R,
							tokens: this.lexer.inlineTokens(R),
						};
					}
					const E = w.slice(2, -2);
					return {
						type: "strong",
						raw: w,
						text: E,
						tokens: this.lexer.inlineTokens(E),
					};
				}
			}
		}
		codespan(t) {
			const n = this.rules.inline.code.exec(t);
			if (n) {
				let s = n[2].replace(/\n/g, " ");
				const r = /[^ ]/.test(s),
					i = /^ /.test(s) && / $/.test(s);
				return (
					r && i && (s = s.substring(1, s.length - 1)),
					(s = Te(s, !0)),
					{ type: "codespan", raw: n[0], text: s }
				);
			}
		}
		br(t) {
			const n = this.rules.inline.br.exec(t);
			if (n) return { type: "br", raw: n[0] };
		}
		del(t) {
			const n = this.rules.inline.del.exec(t);
			if (n)
				return {
					type: "del",
					raw: n[0],
					text: n[2],
					tokens: this.lexer.inlineTokens(n[2]),
				};
		}
		autolink(t) {
			const n = this.rules.inline.autolink.exec(t);
			if (n) {
				let s, r;
				return (
					n[2] === "@"
						? ((s = Te(n[1])), (r = "mailto:" + s))
						: ((s = Te(n[1])), (r = s)),
					{
						type: "link",
						raw: n[0],
						text: s,
						href: r,
						tokens: [{ type: "text", raw: s, text: s }],
					}
				);
			}
		}
		url(t) {
			var s;
			let n;
			if ((n = this.rules.inline.url.exec(t))) {
				let r, i;
				if (n[2] === "@") (r = Te(n[0])), (i = "mailto:" + r);
				else {
					let o;
					do
						(o = n[0]),
							(n[0] =
								((s = this.rules.inline._backpedal.exec(n[0])) == null
									? void 0
									: s[0]) ?? "");
					while (o !== n[0]);
					(r = Te(n[0])), n[1] === "www." ? (i = "http://" + n[0]) : (i = n[0]);
				}
				return {
					type: "link",
					raw: n[0],
					text: r,
					href: i,
					tokens: [{ type: "text", raw: r, text: r }],
				};
			}
		}
		inlineText(t) {
			const n = this.rules.inline.text.exec(t);
			if (n) {
				let s;
				return (
					this.lexer.state.inRawBlock ? (s = n[0]) : (s = Te(n[0])),
					{ type: "text", raw: n[0], text: s }
				);
			}
		}
	}
	const ac = /^(?: *(?:\n|$))+/,
		cc = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
		uc =
			/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
		ln = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
		fc = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
		Xi = /(?:[*+-]|\d{1,9}[.)])/,
		eo = W(
			/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
		)
			.replace(/bull/g, Xi)
			.replace(/blockCode/g, / {4}/)
			.replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
			.replace(/blockquote/g, / {0,3}>/)
			.replace(/heading/g, / {0,3}#{1,6}/)
			.replace(/html/g, / {0,3}<[^\n>]+>\n/)
			.getRegex(),
		Us =
			/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
		hc = /^[^\n]+/,
		Vs = /(?!\s*\])(?:\\.|[^[\]\\])+/,
		pc = W(
			/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
		)
			.replace("label", Vs)
			.replace(
				"title",
				/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
			)
			.getRegex(),
		dc = W(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
			.replace(/bull/g, Xi)
			.getRegex(),
		Jn =
			"address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
		Ws = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
		gc = W(
			"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
			"i",
		)
			.replace("comment", Ws)
			.replace("tag", Jn)
			.replace(
				"attribute",
				/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
			)
			.getRegex(),
		to = W(Us)
			.replace("hr", ln)
			.replace("heading", " {0,3}#{1,6}(?:\\s|$)")
			.replace("|lheading", "")
			.replace("|table", "")
			.replace("blockquote", " {0,3}>")
			.replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
			.replace("list", " {0,3}(?:[*+-]|1[.)]) ")
			.replace(
				"html",
				"</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
			)
			.replace("tag", Jn)
			.getRegex(),
		Ks = {
			blockquote: W(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
				.replace("paragraph", to)
				.getRegex(),
			code: cc,
			def: pc,
			fences: uc,
			heading: fc,
			hr: ln,
			html: gc,
			lheading: eo,
			list: dc,
			newline: ac,
			paragraph: to,
			table: on,
			text: hc,
		},
		no = W(
			"^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
		)
			.replace("hr", ln)
			.replace("heading", " {0,3}#{1,6}(?:\\s|$)")
			.replace("blockquote", " {0,3}>")
			.replace("code", " {4}[^\\n]")
			.replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
			.replace("list", " {0,3}(?:[*+-]|1[.)]) ")
			.replace(
				"html",
				"</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
			)
			.replace("tag", Jn)
			.getRegex(),
		mc = {
			...Ks,
			table: no,
			paragraph: W(Us)
				.replace("hr", ln)
				.replace("heading", " {0,3}#{1,6}(?:\\s|$)")
				.replace("|lheading", "")
				.replace("table", no)
				.replace("blockquote", " {0,3}>")
				.replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
				.replace("list", " {0,3}(?:[*+-]|1[.)]) ")
				.replace(
					"html",
					"</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
				)
				.replace("tag", Jn)
				.getRegex(),
		},
		vc = {
			...Ks,
			html: W(
				`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`,
			)
				.replace("comment", Ws)
				.replace(
					/tag/g,
					"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",
				)
				.getRegex(),
			def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
			heading: /^(#{1,6})(.*)(?:\n+|$)/,
			fences: on,
			lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
			paragraph: W(Us)
				.replace("hr", ln)
				.replace(
					"heading",
					` *#{1,6} *[^
  ]`,
				)
				.replace("lheading", eo)
				.replace("|table", "")
				.replace("blockquote", " {0,3}>")
				.replace("|fences", "")
				.replace("|list", "")
				.replace("|html", "")
				.replace("|tag", "")
				.getRegex(),
		},
		so = /^\\([!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~])/,
		yc = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
		ro = /^( {2,}|\\)\n(?!\s*$)/,
		bc =
			/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<![`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
		an = "\\p{P}\\p{S}",
		wc = W(/^((?![*_])[\spunctuation])/, "u")
			.replace(/punctuation/g, an)
			.getRegex(),
		kc = /\[[^[\]]*?\]\([^()]*?\)|`[^`]*?`|<[^<>]*?>/g,
		xc = W(
			/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
			"u",
		)
			.replace(/punct/g, an)
			.getRegex(),
		_c = W(
			"^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])",
			"gu",
		)
			.replace(/punct/g, an)
			.getRegex(),
		Tc = W(
			"^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])",
			"gu",
		)
			.replace(/punct/g, an)
			.getRegex(),
		Sc = W(/\\([punct])/, "gu")
			.replace(/punct/g, an)
			.getRegex(),
		Cc = W(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
			.replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
			.replace(
				"email",
				/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
			)
			.getRegex(),
		Mc = W(Ws).replace("(?:-->|$)", "-->").getRegex(),
		Ec = W(
			"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
		)
			.replace("comment", Mc)
			.replace(
				"attribute",
				/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
			)
			.getRegex(),
		Gn = /(?:\[(?:\\.|[^[\]\\])*\]|\\.|`[^`]*`|[^[\]\\`])*?/,
		Pc = W(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
			.replace("label", Gn)
			.replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
			.replace(
				"title",
				/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
			)
			.getRegex(),
		io = W(/^!?\[(label)\]\[(ref)\]/)
			.replace("label", Gn)
			.replace("ref", Vs)
			.getRegex(),
		oo = W(/^!?\[(ref)\](?:\[\])?/)
			.replace("ref", Vs)
			.getRegex(),
		Ic = W("reflink|nolink(?!\\()", "g")
			.replace("reflink", io)
			.replace("nolink", oo)
			.getRegex(),
		qs = {
			_backpedal: on,
			anyPunctuation: Sc,
			autolink: Cc,
			blockSkip: kc,
			br: ro,
			code: yc,
			del: on,
			emStrongLDelim: xc,
			emStrongRDelimAst: _c,
			emStrongRDelimUnd: Tc,
			escape: so,
			link: Pc,
			nolink: oo,
			punctuation: wc,
			reflink: io,
			reflinkSearch: Ic,
			tag: Ec,
			text: bc,
			url: on,
		},
		Rc = {
			...qs,
			link: W(/^!?\[(label)\]\((.*?)\)/)
				.replace("label", Gn)
				.getRegex(),
			reflink: W(/^!?\[(label)\]\s*\[([^\]]*)\]/)
				.replace("label", Gn)
				.getRegex(),
		},
		Zs = {
			...qs,
			escape: W(so).replace("])", "~|])").getRegex(),
			url: W(
				/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9-]+\.?)+[^\s<]*|^email/,
				"i",
			)
				.replace(
					"email",
					/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
				)
				.getRegex(),
			_backpedal:
				/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
			del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
			text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+/=?_`{|}~-]+@)|[\s\S]*?(?:(?=[\\<![`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+/=?_`{|}~-](?=[a-zA-Z0-9.!#$%&'*+/=?_`{|}~-]+@)))/,
		},
		Ac = {
			...Zs,
			br: W(ro).replace("{2,}", "*").getRegex(),
			text: W(Zs.text)
				.replace("\\b_", "\\b_| {2,}\\n")
				.replace(/\{2,\}/g, "*")
				.getRegex(),
		},
		Qn = { normal: Ks, gfm: mc, pedantic: vc },
		cn = { normal: qs, gfm: Zs, breaks: Ac, pedantic: Rc };
	class Ue {
		constructor(t) {
			K(this, "tokens");
			K(this, "options");
			K(this, "state");
			K(this, "tokenizer");
			K(this, "inlineQueue");
			(this.tokens = []),
				(this.tokens.links = Object.create(null)),
				(this.options = t || wt),
				(this.options.tokenizer = this.options.tokenizer || new Zn()),
				(this.tokenizer = this.options.tokenizer),
				(this.tokenizer.options = this.options),
				(this.tokenizer.lexer = this),
				(this.inlineQueue = []),
				(this.state = { inLink: !1, inRawBlock: !1, top: !0 });
			const n = { block: Qn.normal, inline: cn.normal };
			this.options.pedantic
				? ((n.block = Qn.pedantic), (n.inline = cn.pedantic))
				: this.options.gfm &&
					((n.block = Qn.gfm),
					this.options.breaks ? (n.inline = cn.breaks) : (n.inline = cn.gfm)),
				(this.tokenizer.rules = n);
		}
		static get rules() {
			return { block: Qn, inline: cn };
		}
		static lex(t, n) {
			return new Ue(n).lex(t);
		}
		static lexInline(t, n) {
			return new Ue(n).inlineTokens(t);
		}
		lex(t) {
			(t = t.replace(
				/\r\n|\r/g,
				`
  `,
			)),
				this.blockTokens(t, this.tokens);
			for (let n = 0; n < this.inlineQueue.length; n++) {
				const s = this.inlineQueue[n];
				this.inlineTokens(s.src, s.tokens);
			}
			return (this.inlineQueue = []), this.tokens;
		}
		blockTokens(t, n = []) {
			this.options.pedantic
				? (t = t.replace(/\t/g, "    ").replace(/^ +$/gm, ""))
				: (t = t.replace(
						/^( *)(\t+)/gm,
						(l, a, h) => a + "    ".repeat(h.length),
					));
			let s, r, i, o;
			for (; t; )
				if (
					!(
						this.options.extensions &&
						this.options.extensions.block &&
						this.options.extensions.block.some((l) =>
							(s = l.call({ lexer: this }, t, n))
								? ((t = t.substring(s.raw.length)), n.push(s), !0)
								: !1,
						)
					)
				) {
					if ((s = this.tokenizer.space(t))) {
						(t = t.substring(s.raw.length)),
							s.raw.length === 1 && n.length > 0
								? (n[n.length - 1].raw += `
  `)
								: n.push(s);
						continue;
					}
					if ((s = this.tokenizer.code(t))) {
						(t = t.substring(s.raw.length)),
							(r = n[n.length - 1]),
							r && (r.type === "paragraph" || r.type === "text")
								? ((r.raw +=
										`
  ` + s.raw),
									(r.text +=
										`
  ` + s.text),
									(this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
								: n.push(s);
						continue;
					}
					if ((s = this.tokenizer.fences(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.heading(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.hr(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.blockquote(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.list(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.html(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.def(t))) {
						(t = t.substring(s.raw.length)),
							(r = n[n.length - 1]),
							r && (r.type === "paragraph" || r.type === "text")
								? ((r.raw +=
										`
  ` + s.raw),
									(r.text +=
										`
  ` + s.raw),
									(this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
								: this.tokens.links[s.tag] ||
									(this.tokens.links[s.tag] = { href: s.href, title: s.title });
						continue;
					}
					if ((s = this.tokenizer.table(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.lheading(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if (
						((i = t),
						this.options.extensions && this.options.extensions.startBlock)
					) {
						let l = 1 / 0;
						const a = t.slice(1);
						let h;
						this.options.extensions.startBlock.forEach((u) => {
							(h = u.call({ lexer: this }, a)),
								typeof h == "number" && h >= 0 && (l = Math.min(l, h));
						}),
							l < 1 / 0 && l >= 0 && (i = t.substring(0, l + 1));
					}
					if (this.state.top && (s = this.tokenizer.paragraph(i))) {
						(r = n[n.length - 1]),
							o && r.type === "paragraph"
								? ((r.raw +=
										`
  ` + s.raw),
									(r.text +=
										`
  ` + s.text),
									this.inlineQueue.pop(),
									(this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
								: n.push(s),
							(o = i.length !== t.length),
							(t = t.substring(s.raw.length));
						continue;
					}
					if ((s = this.tokenizer.text(t))) {
						(t = t.substring(s.raw.length)),
							(r = n[n.length - 1]),
							r && r.type === "text"
								? ((r.raw +=
										`
  ` + s.raw),
									(r.text +=
										`
  ` + s.text),
									this.inlineQueue.pop(),
									(this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
								: n.push(s);
						continue;
					}
					if (t) {
						const l = "Infinite loop on byte: " + t.charCodeAt(0);
						if (this.options.silent) {
							console.error(l);
							break;
						}
						throw new Error(l);
					}
				}
			return (this.state.top = !0), n;
		}
		inline(t, n = []) {
			return this.inlineQueue.push({ src: t, tokens: n }), n;
		}
		inlineTokens(t, n = []) {
			let s,
				r,
				i,
				o = t,
				l,
				a,
				h;
			if (this.tokens.links) {
				const u = Object.keys(this.tokens.links);
				if (u.length > 0)
					for (
						;
						(l = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null;
					)
						u.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) &&
							(o =
								o.slice(0, l.index) +
								"[" +
								"a".repeat(l[0].length - 2) +
								"]" +
								o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
			}
			for (; (l = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
				o =
					o.slice(0, l.index) +
					"[" +
					"a".repeat(l[0].length - 2) +
					"]" +
					o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
			for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
				o =
					o.slice(0, l.index) +
					"++" +
					o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
			for (; t; )
				if (
					(a || (h = ""),
					(a = !1),
					!(
						this.options.extensions &&
						this.options.extensions.inline &&
						this.options.extensions.inline.some((u) =>
							(s = u.call({ lexer: this }, t, n))
								? ((t = t.substring(s.raw.length)), n.push(s), !0)
								: !1,
						)
					))
				) {
					if ((s = this.tokenizer.escape(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.tag(t))) {
						(t = t.substring(s.raw.length)),
							(r = n[n.length - 1]),
							r && s.type === "text" && r.type === "text"
								? ((r.raw += s.raw), (r.text += s.text))
								: n.push(s);
						continue;
					}
					if ((s = this.tokenizer.link(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.reflink(t, this.tokens.links))) {
						(t = t.substring(s.raw.length)),
							(r = n[n.length - 1]),
							r && s.type === "text" && r.type === "text"
								? ((r.raw += s.raw), (r.text += s.text))
								: n.push(s);
						continue;
					}
					if ((s = this.tokenizer.emStrong(t, o, h))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.codespan(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.br(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.del(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if ((s = this.tokenizer.autolink(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if (!this.state.inLink && (s = this.tokenizer.url(t))) {
						(t = t.substring(s.raw.length)), n.push(s);
						continue;
					}
					if (
						((i = t),
						this.options.extensions && this.options.extensions.startInline)
					) {
						let u = 1 / 0;
						const p = t.slice(1);
						let g;
						this.options.extensions.startInline.forEach((w) => {
							(g = w.call({ lexer: this }, p)),
								typeof g == "number" && g >= 0 && (u = Math.min(u, g));
						}),
							u < 1 / 0 && u >= 0 && (i = t.substring(0, u + 1));
					}
					if ((s = this.tokenizer.inlineText(i))) {
						(t = t.substring(s.raw.length)),
							s.raw.slice(-1) !== "_" && (h = s.raw.slice(-1)),
							(a = !0),
							(r = n[n.length - 1]),
							r && r.type === "text"
								? ((r.raw += s.raw), (r.text += s.text))
								: n.push(s);
						continue;
					}
					if (t) {
						const u = "Infinite loop on byte: " + t.charCodeAt(0);
						if (this.options.silent) {
							console.error(u);
							break;
						}
						throw new Error(u);
					}
				}
			return n;
		}
	}
	class Yn {
		constructor(t) {
			K(this, "options");
			this.options = t || wt;
		}
		code(t, n, s) {
			var i;
			const r = (i = (n || "").match(/^\S*/)) == null ? void 0 : i[0];
			return (
				(t =
					t.replace(/\n$/, "") +
					`
  `),
				r
					? '<pre><code class="language-' +
						Te(r) +
						'">' +
						(s ? t : Te(t, !0)) +
						`</code></pre>
  `
					: "<pre><code>" +
						(s ? t : Te(t, !0)) +
						`</code></pre>
  `
			);
		}
		blockquote(t) {
			return `<blockquote>
  ${t}</blockquote>
  `;
		}
		html(t, n) {
			return t;
		}
		heading(t, n, s) {
			return `<h${n}>${t}</h${n}>
  `;
		}
		hr() {
			return `<hr>
  `;
		}
		list(t, n, s) {
			const r = n ? "ol" : "ul",
				i = n && s !== 1 ? ' start="' + s + '"' : "";
			return (
				"<" +
				r +
				i +
				`>
  ` +
				t +
				"</" +
				r +
				`>
  `
			);
		}
		listitem(t, n, s) {
			return `<li>${t}</li>
  `;
		}
		checkbox(t) {
			return (
				"<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
			);
		}
		paragraph(t) {
			return `<p>${t}</p>
  `;
		}
		table(t, n) {
			return (
				n && (n = `<tbody>${n}</tbody>`),
				`<table>
  <thead>
  ` +
					t +
					`</thead>
  ` +
					n +
					`</table>
  `
			);
		}
		tablerow(t) {
			return `<tr>
  ${t}</tr>
  `;
		}
		tablecell(t, n) {
			const s = n.header ? "th" : "td";
			return (
				(n.align ? `<${s} align="${n.align}">` : `<${s}>`) +
				t +
				`</${s}>
  `
			);
		}
		strong(t) {
			return `<strong>${t}</strong>`;
		}
		em(t) {
			return `<em>${t}</em>`;
		}
		codespan(t) {
			return `<code>${t}</code>`;
		}
		br() {
			return "<br>";
		}
		del(t) {
			return `<del>${t}</del>`;
		}
		link(t, n, s) {
			const r = Gi(t);
			if (r === null) return s;
			t = r;
			let i = '<a href="' + t + '"';
			return n && (i += ' title="' + n + '"'), (i += ">" + s + "</a>"), i;
		}
		image(t, n, s) {
			const r = Gi(t);
			if (r === null) return s;
			t = r;
			let i = `<img src="${t}" alt="${s}"`;
			return n && (i += ` title="${n}"`), (i += ">"), i;
		}
		text(t) {
			return t;
		}
	}
	class Js {
		strong(t) {
			return t;
		}
		em(t) {
			return t;
		}
		codespan(t) {
			return t;
		}
		del(t) {
			return t;
		}
		html(t) {
			return t;
		}
		text(t) {
			return t;
		}
		link(t, n, s) {
			return "" + s;
		}
		image(t, n, s) {
			return "" + s;
		}
		br() {
			return "";
		}
	}
	class Ve {
		constructor(t) {
			K(this, "options");
			K(this, "renderer");
			K(this, "textRenderer");
			(this.options = t || wt),
				(this.options.renderer = this.options.renderer || new Yn()),
				(this.renderer = this.options.renderer),
				(this.renderer.options = this.options),
				(this.textRenderer = new Js());
		}
		static parse(t, n) {
			return new Ve(n).parse(t);
		}
		static parseInline(t, n) {
			return new Ve(n).parseInline(t);
		}
		parse(t, n = !0) {
			let s = "";
			for (let r = 0; r < t.length; r++) {
				const i = t[r];
				if (
					this.options.extensions &&
					this.options.extensions.renderers &&
					this.options.extensions.renderers[i.type]
				) {
					const o = i,
						l = this.options.extensions.renderers[o.type].call(
							{ parser: this },
							o,
						);
					if (
						l !== !1 ||
						![
							"space",
							"hr",
							"heading",
							"code",
							"table",
							"blockquote",
							"list",
							"html",
							"paragraph",
							"text",
						].includes(o.type)
					) {
						s += l || "";
						continue;
					}
				}
				switch (i.type) {
					case "space":
						continue;
					case "hr": {
						s += this.renderer.hr();
						continue;
					}
					case "heading": {
						const o = i;
						s += this.renderer.heading(
							this.parseInline(o.tokens),
							o.depth,
							rc(this.parseInline(o.tokens, this.textRenderer)),
						);
						continue;
					}
					case "code": {
						const o = i;
						s += this.renderer.code(o.text, o.lang, !!o.escaped);
						continue;
					}
					case "table": {
						const o = i;
						let l = "",
							a = "";
						for (let u = 0; u < o.header.length; u++)
							a += this.renderer.tablecell(
								this.parseInline(o.header[u].tokens),
								{ header: !0, align: o.align[u] },
							);
						l += this.renderer.tablerow(a);
						let h = "";
						for (let u = 0; u < o.rows.length; u++) {
							const p = o.rows[u];
							a = "";
							for (let g = 0; g < p.length; g++)
								a += this.renderer.tablecell(this.parseInline(p[g].tokens), {
									header: !1,
									align: o.align[g],
								});
							h += this.renderer.tablerow(a);
						}
						s += this.renderer.table(l, h);
						continue;
					}
					case "blockquote": {
						const o = i,
							l = this.parse(o.tokens);
						s += this.renderer.blockquote(l);
						continue;
					}
					case "list": {
						const o = i,
							l = o.ordered,
							a = o.start,
							h = o.loose;
						let u = "";
						for (let p = 0; p < o.items.length; p++) {
							const g = o.items[p],
								w = g.checked,
								E = g.task;
							let R = "";
							if (g.task) {
								const Q = this.renderer.checkbox(!!w);
								h
									? g.tokens.length > 0 && g.tokens[0].type === "paragraph"
										? ((g.tokens[0].text = Q + " " + g.tokens[0].text),
											g.tokens[0].tokens &&
												g.tokens[0].tokens.length > 0 &&
												g.tokens[0].tokens[0].type === "text" &&
												(g.tokens[0].tokens[0].text =
													Q + " " + g.tokens[0].tokens[0].text))
										: g.tokens.unshift({ type: "text", text: Q + " " })
									: (R += Q + " ");
							}
							(R += this.parse(g.tokens, h)),
								(u += this.renderer.listitem(R, E, !!w));
						}
						s += this.renderer.list(u, l, a);
						continue;
					}
					case "html": {
						const o = i;
						s += this.renderer.html(o.text, o.block);
						continue;
					}
					case "paragraph": {
						const o = i;
						s += this.renderer.paragraph(this.parseInline(o.tokens));
						continue;
					}
					case "text": {
						let o = i,
							l = o.tokens ? this.parseInline(o.tokens) : o.text;
						for (; r + 1 < t.length && t[r + 1].type === "text"; )
							(o = t[++r]),
								(l +=
									`
  ` + (o.tokens ? this.parseInline(o.tokens) : o.text));
						s += n ? this.renderer.paragraph(l) : l;
						continue;
					}
					default: {
						const o = 'Token with "' + i.type + '" type was not found.';
						if (this.options.silent) return console.error(o), "";
						throw new Error(o);
					}
				}
			}
			return s;
		}
		parseInline(t, n) {
			n = n || this.renderer;
			let s = "";
			for (let r = 0; r < t.length; r++) {
				const i = t[r];
				if (
					this.options.extensions &&
					this.options.extensions.renderers &&
					this.options.extensions.renderers[i.type]
				) {
					const o = this.options.extensions.renderers[i.type].call(
						{ parser: this },
						i,
					);
					if (
						o !== !1 ||
						![
							"escape",
							"html",
							"link",
							"image",
							"strong",
							"em",
							"codespan",
							"br",
							"del",
							"text",
						].includes(i.type)
					) {
						s += o || "";
						continue;
					}
				}
				switch (i.type) {
					case "escape": {
						const o = i;
						s += n.text(o.text);
						break;
					}
					case "html": {
						const o = i;
						s += n.html(o.text);
						break;
					}
					case "link": {
						const o = i;
						s += n.link(o.href, o.title, this.parseInline(o.tokens, n));
						break;
					}
					case "image": {
						const o = i;
						s += n.image(o.href, o.title, o.text);
						break;
					}
					case "strong": {
						const o = i;
						s += n.strong(this.parseInline(o.tokens, n));
						break;
					}
					case "em": {
						const o = i;
						s += n.em(this.parseInline(o.tokens, n));
						break;
					}
					case "codespan": {
						const o = i;
						s += n.codespan(o.text);
						break;
					}
					case "br": {
						s += n.br();
						break;
					}
					case "del": {
						const o = i;
						s += n.del(this.parseInline(o.tokens, n));
						break;
					}
					case "text": {
						const o = i;
						s += n.text(o.text);
						break;
					}
					default: {
						const o = 'Token with "' + i.type + '" type was not found.';
						if (this.options.silent) return console.error(o), "";
						throw new Error(o);
					}
				}
			}
			return s;
		}
	}
	class un {
		constructor(t) {
			K(this, "options");
			this.options = t || wt;
		}
		preprocess(t) {
			return t;
		}
		postprocess(t) {
			return t;
		}
		processAllTokens(t) {
			return t;
		}
	}
	K(
		un,
		"passThroughHooks",
		new Set(["preprocess", "postprocess", "processAllTokens"]),
	);
	class jc {
		constructor(...t) {
			go(this, xt);
			K(this, "defaults", Hs());
			K(this, "options", this.setOptions);
			K(this, "parse", Xn(this, xt, Xs).call(this, Ue.lex, Ve.parse));
			K(
				this,
				"parseInline",
				Xn(this, xt, Xs).call(this, Ue.lexInline, Ve.parseInline),
			);
			K(this, "Parser", Ve);
			K(this, "Renderer", Yn);
			K(this, "TextRenderer", Js);
			K(this, "Lexer", Ue);
			K(this, "Tokenizer", Zn);
			K(this, "Hooks", un);
			this.use(...t);
		}
		walkTokens(t, n) {
			var r, i;
			let s = [];
			for (const o of t)
				switch (((s = s.concat(n.call(this, o))), o.type)) {
					case "table": {
						const l = o;
						for (const a of l.header)
							s = s.concat(this.walkTokens(a.tokens, n));
						for (const a of l.rows)
							for (const h of a) s = s.concat(this.walkTokens(h.tokens, n));
						break;
					}
					case "list": {
						const l = o;
						s = s.concat(this.walkTokens(l.items, n));
						break;
					}
					default: {
						const l = o;
						(i =
							(r = this.defaults.extensions) == null
								? void 0
								: r.childTokens) != null && i[l.type]
							? this.defaults.extensions.childTokens[l.type].forEach((a) => {
									const h = l[a].flat(1 / 0);
									s = s.concat(this.walkTokens(h, n));
								})
							: l.tokens && (s = s.concat(this.walkTokens(l.tokens, n)));
					}
				}
			return s;
		}
		use(...t) {
			const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
			return (
				t.forEach((s) => {
					const r = { ...s };
					if (
						((r.async = this.defaults.async || r.async || !1),
						s.extensions &&
							(s.extensions.forEach((i) => {
								if (!i.name) throw new Error("extension name required");
								if ("renderer" in i) {
									const o = n.renderers[i.name];
									o
										? (n.renderers[i.name] = function (...l) {
												let a = i.renderer.apply(this, l);
												return a === !1 && (a = o.apply(this, l)), a;
											})
										: (n.renderers[i.name] = i.renderer);
								}
								if ("tokenizer" in i) {
									if (!i.level || (i.level !== "block" && i.level !== "inline"))
										throw new Error(
											"extension level must be 'block' or 'inline'",
										);
									const o = n[i.level];
									o ? o.unshift(i.tokenizer) : (n[i.level] = [i.tokenizer]),
										i.start &&
											(i.level === "block"
												? n.startBlock
													? n.startBlock.push(i.start)
													: (n.startBlock = [i.start])
												: i.level === "inline" &&
													(n.startInline
														? n.startInline.push(i.start)
														: (n.startInline = [i.start])));
								}
								"childTokens" in i &&
									i.childTokens &&
									(n.childTokens[i.name] = i.childTokens);
							}),
							(r.extensions = n)),
						s.renderer)
					) {
						const i = this.defaults.renderer || new Yn(this.defaults);
						for (const o in s.renderer) {
							if (!(o in i)) throw new Error(`renderer '${o}' does not exist`);
							if (o === "options") continue;
							const l = o,
								a = s.renderer[l],
								h = i[l];
							i[l] = (...u) => {
								let p = a.apply(i, u);
								return p === !1 && (p = h.apply(i, u)), p || "";
							};
						}
						r.renderer = i;
					}
					if (s.tokenizer) {
						const i = this.defaults.tokenizer || new Zn(this.defaults);
						for (const o in s.tokenizer) {
							if (!(o in i)) throw new Error(`tokenizer '${o}' does not exist`);
							if (["options", "rules", "lexer"].includes(o)) continue;
							const l = o,
								a = s.tokenizer[l],
								h = i[l];
							i[l] = (...u) => {
								let p = a.apply(i, u);
								return p === !1 && (p = h.apply(i, u)), p;
							};
						}
						r.tokenizer = i;
					}
					if (s.hooks) {
						const i = this.defaults.hooks || new un();
						for (const o in s.hooks) {
							if (!(o in i)) throw new Error(`hook '${o}' does not exist`);
							if (o === "options") continue;
							const l = o,
								a = s.hooks[l],
								h = i[l];
							un.passThroughHooks.has(o)
								? (i[l] = (u) => {
										if (this.defaults.async)
											return Promise.resolve(a.call(i, u)).then((g) =>
												h.call(i, g),
											);
										const p = a.call(i, u);
										return h.call(i, p);
									})
								: (i[l] = (...u) => {
										let p = a.apply(i, u);
										return p === !1 && (p = h.apply(i, u)), p;
									});
						}
						r.hooks = i;
					}
					if (s.walkTokens) {
						const i = this.defaults.walkTokens,
							o = s.walkTokens;
						r.walkTokens = function (l) {
							let a = [];
							return (
								a.push(o.call(this, l)), i && (a = a.concat(i.call(this, l))), a
							);
						};
					}
					this.defaults = { ...this.defaults, ...r };
				}),
				this
			);
		}
		setOptions(t) {
			return (this.defaults = { ...this.defaults, ...t }), this;
		}
		lexer(t, n) {
			return Ue.lex(t, n ?? this.defaults);
		}
		parser(t, n) {
			return Ve.parse(t, n ?? this.defaults);
		}
	}
	(xt = new WeakSet()),
		(Xs = function (t, n) {
			return (s, r) => {
				const i = { ...r },
					o = { ...this.defaults, ...i };
				this.defaults.async === !0 &&
					i.async === !1 &&
					(o.silent ||
						console.warn(
							"marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.",
						),
					(o.async = !0));
				const l = Xn(this, xt, mo).call(this, !!o.silent, !!o.async);
				if (typeof s > "u" || s === null)
					return l(new Error("marked(): input parameter is undefined or null"));
				if (typeof s != "string")
					return l(
						new Error(
							"marked(): input parameter is of type " +
								Object.prototype.toString.call(s) +
								", string expected",
						),
					);
				if ((o.hooks && (o.hooks.options = o), o.async))
					return Promise.resolve(o.hooks ? o.hooks.preprocess(s) : s)
						.then((a) => t(a, o))
						.then((a) => (o.hooks ? o.hooks.processAllTokens(a) : a))
						.then((a) =>
							o.walkTokens
								? Promise.all(this.walkTokens(a, o.walkTokens)).then(() => a)
								: a,
						)
						.then((a) => n(a, o))
						.then((a) => (o.hooks ? o.hooks.postprocess(a) : a))
						.catch(l);
				try {
					o.hooks && (s = o.hooks.preprocess(s));
					let a = t(s, o);
					o.hooks && (a = o.hooks.processAllTokens(a)),
						o.walkTokens && this.walkTokens(a, o.walkTokens);
					let h = n(a, o);
					return o.hooks && (h = o.hooks.postprocess(h)), h;
				} catch (a) {
					return l(a);
				}
			};
		}),
		(mo = (t, n) => (s) => {
			if (
				((s.message += `
  Please report this to https://github.com/markedjs/marked.`),
				t)
			) {
				const r =
					"<p>An error occurred:</p><pre>" + Te(s.message + "", !0) + "</pre>";
				return n ? Promise.resolve(r) : r;
			}
			if (n) return Promise.reject(s);
			throw s;
		});
	const kt = new jc();
	function N(e, t) {
		return kt.parse(e, t);
	}
	(N.options = N.setOptions =
		(e) => (kt.setOptions(e), (N.defaults = kt.defaults), Ki(N.defaults), N)),
		(N.getDefaults = Hs),
		(N.defaults = wt),
		(N.use = (...e) => (
			kt.use(...e), (N.defaults = kt.defaults), Ki(N.defaults), N
		)),
		(N.walkTokens = (e, t) => kt.walkTokens(e, t)),
		(N.parseInline = kt.parseInline),
		(N.Parser = Ve),
		(N.parser = Ve.parse),
		(N.Renderer = Yn),
		(N.TextRenderer = Js),
		(N.Lexer = Ue),
		(N.lexer = Ue.lex),
		(N.Tokenizer = Zn),
		(N.Hooks = un),
		(N.parse = N),
		N.options,
		N.setOptions,
		N.use,
		N.walkTokens,
		N.parseInline,
		Ve.parse,
		Ue.lex;
	const lo = new N.Renderer();
	(lo.link = function (e, t, n) {
		return N.Renderer.prototype.link
			.call(this, e, t, n)
			.replace("<a", "<a target='_self' rel='noreferrer' ");
	}),
		N.setOptions({ renderer: lo, breaks: !0, gfm: !0 });
	async function Dc(e) {
		return await N(e);
	}
	const zc = ["innerHTML"],
		Lc = Nr({
			__name: "MarkdownContent",
			props: { content: {}, isStreaming: { type: Boolean, default: !1 } },
			setup(e) {
				const t = e,
					n = gt("");
				return (
					bt(
						() => t.content,
						async (s) => {
							n.value = await Dc(s);
						},
						{ immediate: !0 },
					),
					(s, r) => (
						_e(),
						Ie(
							"div",
							{
								class: "prose prose-sm max-w-full overflow-x-hidden prose-gray",
								innerHTML: n.value,
							},
							null,
							8,
							zc,
						)
					)
				);
			},
		}),
		ao = {
			nl: {
				title: "Echt Ierland Chat",
				clearChat: "Chat wissen",
				closeChat: "Chat sluiten",
				showInfo: "Informatie tonen",
				welcomeMessage: "Hallo! Hoe kan ik je helpen?",
				placeholder: "Jouw vraag...",
				errorMessage: "Sorry, er is een fout opgetreden. Probeer het opnieuw.",
				privacyTitle: "Privacy & Gegevens",
				privacyLocalStorage:
					"Alle chats worden alleen op jouw apparaat opgeslagen",
				privacyLocalStorageDesc:
					"We slaan geen chats of persoonlijke informatie extern op.",
				privacyPrivate: "Alle chats zijn privé",
				privacyPrivateDesc:
					"Jouw gesprekken blijven volledig privé en worden niet gedeeld.",
				privacyUnderstood: "Begrepen",
				scrollToBottom: "Naar beneden scrollen",
			},
			de: {
				title: "Echt Ierland Chat",
				clearChat: "Chat löschen",
				closeChat: "Chat schließen",
				showInfo: "Informationen anzeigen",
				welcomeMessage: "Hallo! Wie kann ich dir helfen?",
				placeholder: "Deine Frage...",
				errorMessage:
					"Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
				privacyTitle: "Datenschutz & Daten",
				privacyLocalStorage:
					"Alle Chats werden nur auf deinem Gerät gespeichert",
				privacyLocalStorageDesc:
					"Wir speichern keine Chats oder persönlichen Informationen extern.",
				privacyPrivate: "Alle Chats sind privat",
				privacyPrivateDesc:
					"Deine Gespräche bleiben vollständig privat und werden nicht geteilt.",
				privacyUnderstood: "Verstanden",
				scrollToBottom: "Nach unten scrollen",
			},
			en: {
				title: "Echt Ierland Chat",
				clearChat: "Clear chat",
				closeChat: "Close chat",
				showInfo: "Show info",
				welcomeMessage: "Hello! How can I help you?",
				placeholder: "Your question...",
				errorMessage: "Sorry, there was an error. Please try again.",
				privacyTitle: "Privacy & Data",
				privacyLocalStorage: "All chats are stored only on your device",
				privacyLocalStorageDesc:
					"We do not store chats or personal information externally.",
				privacyPrivate: "All chats are private",
				privacyPrivateDesc:
					"Your conversations remain completely private and are not shared.",
				privacyUnderstood: "Understood",
				scrollToBottom: "Scroll to bottom",
			},
			es: {
				title: "Echt Ierland Chat",
				clearChat: "Limpiar chat",
				closeChat: "Cerrar chat",
				showInfo: "Mostrar información",
				welcomeMessage: "¡Hola! ¿Cómo puedo ayudarte?",
				placeholder: "Tu pregunta...",
				errorMessage:
					"Lo siento, hubo un error. Por favor, inténtalo de nuevo.",
				privacyTitle: "Privacidad y Datos",
				privacyLocalStorage:
					"Todos los chats se almacenan solo en tu dispositivo",
				privacyLocalStorageDesc:
					"No almacenamos chats o información personal externamente.",
				privacyPrivate: "Todos los chats son privados",
				privacyPrivateDesc:
					"Tus conversaciones permanecen completamente privadas y no se comparten.",
				privacyUnderstood: "Entendido",
				scrollToBottom: "Desplazarse hacia abajo",
			},
			pt: {
				title: "Echt Ierland Chat",
				clearChat: "Limpar chat",
				closeChat: "Fechar chat",
				showInfo: "Mostrar informações",
				welcomeMessage: "Olá! Como posso ajudá-lo?",
				placeholder: "Sua pergunta...",
				errorMessage: "Desculpe, ocorreu um erro. Tente novamente.",
				privacyTitle: "Privacidade e Dados",
				privacyLocalStorage:
					"Todos os chats são armazenados apenas no seu dispositivo",
				privacyLocalStorageDesc:
					"Não armazenamos chats ou informações pessoais externamente.",
				privacyPrivate: "Todos os chats são privados",
				privacyPrivateDesc:
					"Suas conversas permanecem completamente privadas e não são compartilhadas.",
				privacyUnderstood: "Entendido",
				scrollToBottom: "Rolar para baixo",
			},
			fr: {
				title: "Echt Ierland Chat",
				clearChat: "Effacer le chat",
				closeChat: "Fermer le chat",
				showInfo: "Afficher les informations",
				welcomeMessage: "Bonjour ! Comment puis-je vous aider ?",
				placeholder: "Votre question...",
				errorMessage: "Désolé, une erreur s'est produite. Veuillez réessayer.",
				privacyTitle: "Confidentialité et Données",
				privacyLocalStorage:
					"Tous les chats sont stockés uniquement sur votre appareil",
				privacyLocalStorageDesc:
					"Nous ne stockons pas de chats ou d'informations personnelles en externe.",
				privacyPrivate: "Tous les chats sont privés",
				privacyPrivateDesc:
					"Vos conversations restent complètement privées et ne sont pas partagées.",
				privacyUnderstood: "Compris",
				scrollToBottom: "Faire défiler vers le bas",
			},
			it: {
				title: "Echt Ierland Chat",
				clearChat: "Cancella chat",
				closeChat: "Chiudi chat",
				showInfo: "Mostra informazioni",
				welcomeMessage: "Ciao! Come posso aiutarti?",
				placeholder: "La tua domanda...",
				errorMessage: "Scusa, c'è stato un errore. Riprova.",
				privacyTitle: "Privacy e Dati",
				privacyLocalStorage:
					"Tutte le chat sono memorizzate solo sul tuo dispositivo",
				privacyLocalStorageDesc:
					"Non memorizziamo chat o informazioni personali esternamente.",
				privacyPrivate: "Tutte le chat sono private",
				privacyPrivateDesc:
					"Le tue conversazioni rimangono completamente private e non vengono condivise.",
				privacyUnderstood: "Capito",
				scrollToBottom: "Scorri in basso",
			},
			pl: {
				title: "Echt Ierland Chat",
				clearChat: "Wyczyść chat",
				closeChat: "Zamknij chat",
				showInfo: "Pokaż informacje",
				welcomeMessage: "Cześć! Jak mogę Ci pomóc?",
				placeholder: "Twoje pytanie...",
				errorMessage: "Przepraszam, wystąpił błąd. Spróbuj ponownie.",
				privacyTitle: "Prywatność i Dane",
				privacyLocalStorage:
					"Wszystkie czaty są przechowywane tylko na Twoim urządzeniu",
				privacyLocalStorageDesc:
					"Nie przechowujemy czatów ani danych osobowych zewnętrznie.",
				privacyPrivate: "Wszystkie czaty są prywatne",
				privacyPrivateDesc:
					"Twoje rozmowy pozostają całkowicie prywatne i nie są udostępniane.",
				privacyUnderstood: "Rozumiem",
				scrollToBottom: "Przewiń w dół",
			},
			cs: {
				title: "Echt Ierland Chat",
				clearChat: "Vymazat chat",
				closeChat: "Zavřít chat",
				showInfo: "Zobrazit informace",
				welcomeMessage: "Ahoj! Jak vám mohu pomoci?",
				placeholder: "Vaše otázka...",
				errorMessage: "Omlouvám se, došlo k chybě. Zkuste to prosím znovu.",
				privacyTitle: "Soukromí a Data",
				privacyLocalStorage:
					"Všechny chaty jsou uloženy pouze na vašem zařízení",
				privacyLocalStorageDesc: "Neukládáme chaty ani osobní údaje externě.",
				privacyPrivate: "Všechny chaty jsou soukromé",
				privacyPrivateDesc:
					"Vaše konverzace zůstávají zcela soukromé a nejsou sdíleny.",
				privacyUnderstood: "Rozumím",
				scrollToBottom: "Posunout dolů",
			},
			sk: {
				title: "Echt Ierland Chat",
				clearChat: "Vymazať chat",
				closeChat: "Zavrieť chat",
				showInfo: "Zobraziť informácie",
				welcomeMessage: "Ahoj! Ako vám môžem pomôcť?",
				placeholder: "Vaša otázka...",
				errorMessage: "Prepáčte, došlo k chybe. Skúste to prosím znovu.",
				privacyTitle: "Súkromie a Dáta",
				privacyLocalStorage: "Všetky chaty sú uložené len na vašom zariadení",
				privacyLocalStorageDesc: "Neukladáme chaty ani osobné údaje externě.",
				privacyPrivate: "Všetky chaty sú súkromné",
				privacyPrivateDesc:
					"Vaše konverzácie zostávajú úplne súkromné a nie sú zdieľané.",
				privacyUnderstood: "Rozumiem",
				scrollToBottom: "Posunúť nadol",
			},
			hu: {
				title: "Echt Ierland Chat",
				clearChat: "Chat törlése",
				closeChat: "Chat bezárása",
				showInfo: "Információk megjelenítése",
				welcomeMessage: "Helló! Hogyan segíthetek?",
				placeholder: "A kérdésed...",
				errorMessage: "Sajnálom, hiba történt. Kérlek, próbáld újra.",
				privacyTitle: "Adatvédelem és Adatok",
				privacyLocalStorage: "Minden chat csak az eszközödön van tárolva",
				privacyLocalStorageDesc:
					"Nem tárolunk chat-eket vagy személyes információkat külsőleg.",
				privacyPrivate: "Minden chat privát",
				privacyPrivateDesc:
					"A beszélgetéseid teljesen privátak maradnak és nem osztódnak meg.",
				privacyUnderstood: "Értem",
				scrollToBottom: "Lecsúsztatás",
			},
			ro: {
				title: "Echt Ierland Chat",
				clearChat: "Șterge chat-ul",
				closeChat: "Închide chat-ul",
				showInfo: "Afișează informații",
				welcomeMessage: "Salut! Cum te pot ajuta?",
				placeholder: "Întrebarea ta...",
				errorMessage:
					"Îmi pare rău, a apărut o eroare. Te rog încearcă din nou.",
				privacyTitle: "Confidențialitate și Date",
				privacyLocalStorage:
					"Toate chat-urile sunt stocate doar pe dispozitivul tău",
				privacyLocalStorageDesc:
					"Nu stocăm chat-uri sau informații personale extern.",
				privacyPrivate: "Toate chat-urile sunt private",
				privacyPrivateDesc:
					"Conversațiile tale rămân complet private și nu sunt partajate.",
				privacyUnderstood: "Înțeles",
				scrollToBottom: "Derulează în jos",
			},
			bg: {
				title: "Echt Ierland Chat",
				clearChat: "Изчисти чата",
				closeChat: "Затвори чата",
				showInfo: "Покажи информация",
				welcomeMessage: "Здравей! Как мога да ти помогна?",
				placeholder: "Твоят въпрос...",
				errorMessage: "Съжалявам, възникна грешка. Моля, опитай отново.",
				privacyTitle: "Поверителност и Данни",
				privacyLocalStorage:
					"Всички чатове се съхраняват само на твоето устройство",
				privacyLocalStorageDesc:
					"Не съхраняваме чатове или лична информация външно.",
				privacyPrivate: "Всички чатове са частни",
				privacyPrivateDesc:
					"Твоите разговори остават напълно частни и не се споделят.",
				privacyUnderstood: "Разбрано",
				scrollToBottom: "Превърти надолу",
			},
			hr: {
				title: "Echt Ierland Chat",
				clearChat: "Obriši chat",
				closeChat: "Zatvori chat",
				showInfo: "Prikaži informacije",
				welcomeMessage: "Bok! Kako ti mogu pomoći?",
				placeholder: "Tvoje pitanje...",
				errorMessage: "Oprosti, došlo je do greške. Molim te, pokušaj ponovno.",
				privacyTitle: "Privatnost i Podaci",
				privacyLocalStorage: "Svi chatovi se čuvaju samo na tvom uređaju",
				privacyLocalStorageDesc:
					"Ne čuvamo chatove ili osobne podatke vanjski.",
				privacyPrivate: "Svi chatovi su privatni",
				privacyPrivateDesc:
					"Tvoji razgovori ostaju potpuno privatni i ne dijele se.",
				privacyUnderstood: "Razumijem",
				scrollToBottom: "Pomakni dolje",
			},
			sl: {
				title: "Echt Ierland Chat",
				clearChat: "Počisti chat",
				closeChat: "Zapri chat",
				showInfo: "Prikaži informacije",
				welcomeMessage: "Pozdravljeni! Kako vam lahko pomagam?",
				placeholder: "Vaše vprašanje...",
				errorMessage:
					"Oprostite, prišlo je do napake. Prosimo, poskusite znova.",
				privacyTitle: "Zasebnost in Podatki",
				privacyLocalStorage: "Vsi chatovi so shranjeni samo na vaši napravi",
				privacyLocalStorageDesc:
					"Ne shranjujemo chatov ali osebnih podatkov zunanje.",
				privacyPrivate: "Vsi chatovi so zasebni",
				privacyPrivateDesc:
					"Vaši pogovori ostanejo popolnoma zasebni in se ne delijo.",
				privacyUnderstood: "Razumem",
				scrollToBottom: "Pomakni navzdol",
			},
			et: {
				title: "Echt Ierland Chat",
				clearChat: "Kustuta vestlus",
				closeChat: "Sulge vestlus",
				showInfo: "Näita teavet",
				welcomeMessage: "Tere! Kuidas saan sind aidata?",
				placeholder: "Sinu küsimus...",
				errorMessage: "Vabandust, tekkis viga. Palun proovi uuesti.",
				privacyTitle: "Privaatsus ja Andmed",
				privacyLocalStorage: "Kõik vestlused salvestatakse ainult sinu seadmel",
				privacyLocalStorageDesc:
					"Me ei salvesta vestlusi või isikuandmeid väliselt.",
				privacyPrivate: "Kõik vestlused on privaatsed",
				privacyPrivateDesc:
					"Sinu vestlused jäävad täielikult privaatseteks ja ei jagata.",
				privacyUnderstood: "Mõistan",
				scrollToBottom: "Kerri alla",
			},
			lv: {
				title: "Echt Ierland Chat",
				clearChat: "Notīrīt tērzīšanu",
				closeChat: "Aizvērt tērzīšanu",
				showInfo: "Rādīt informāciju",
				welcomeMessage: "Sveiki! Kā es varu jums palīdzēt?",
				placeholder: "Jūsu jautājums...",
				errorMessage: "Atvainojiet, radās kļūda. Lūdzu, mēģiniet vēlreiz.",
				privacyTitle: "Privātums un Dati",
				privacyLocalStorage: "Visas tērzīšanas tiek glabātas tikai jūsu ierīcē",
				privacyLocalStorageDesc:
					"Mēs neglabājam tērzīšanas vai personīgo informāciju ārēji.",
				privacyPrivate: "Visas tērzīšanas ir privātas",
				privacyPrivateDesc:
					"Jūsu sarunas paliek pilnībā privātas un netiek dalītas.",
				privacyUnderstood: "Sapratu",
				scrollToBottom: "Ritināt uz leju",
			},
			lt: {
				title: "Echt Ierland Chat",
				clearChat: "Išvalyti pokalbį",
				closeChat: "Uždaryti pokalbį",
				showInfo: "Rodyti informaciją",
				welcomeMessage: "Sveiki! Kaip galiu jums padėti?",
				placeholder: "Jūsų klausimas...",
				errorMessage: "Atsiprašau, įvyko klaida. Bandykite dar kartą.",
				privacyTitle: "Privatumas ir Duomenys",
				privacyLocalStorage: "Visi pokalbiai saugomi tik jūsų įrenginyje",
				privacyLocalStorageDesc:
					"Mes nesaugome pokalbių ar asmeninės informacijos išorėje.",
				privacyPrivate: "Visi pokalbiai yra privatūs",
				privacyPrivateDesc:
					"Jūsų pokalbiai lieka visiškai privatūs ir nėra dalijami.",
				privacyUnderstood: "Suprantu",
				scrollToBottom: "Slinkti žemyn",
			},
			fi: {
				title: "Echt Ierland Chat",
				clearChat: "Tyhjennä chat",
				closeChat: "Sulje chat",
				showInfo: "Näytä tiedot",
				welcomeMessage: "Hei! Miten voin auttaa sinua?",
				placeholder: "Kysymyksesi...",
				errorMessage: "Anteeksi, tapahtui virhe. Yritä uudelleen.",
				privacyTitle: "Yksityisyys ja Tiedot",
				privacyLocalStorage: "Kaikki chatit tallennetaan vain laitteellesi",
				privacyLocalStorageDesc:
					"Emme tallenna chatteja tai henkilökohtaisia tietoja ulkoisesti.",
				privacyPrivate: "Kaikki chatit ovat yksityisiä",
				privacyPrivateDesc:
					"Keskustelusi pysyvät täysin yksityisinä eikä niitä jaeta.",
				privacyUnderstood: "Ymmärretty",
				scrollToBottom: "Vieritä alaspäin",
			},
			sv: {
				title: "Echt Ierland Chat",
				clearChat: "Rensa chat",
				closeChat: "Stäng chat",
				showInfo: "Visa information",
				welcomeMessage: "Hej! Hur kan jag hjälpa dig?",
				placeholder: "Din fråga...",
				errorMessage: "Tyvärr, det uppstod ett fel. Försök igen.",
				privacyTitle: "Integritet och Data",
				privacyLocalStorage: "Alla chattar lagras endast på din enhet",
				privacyLocalStorageDesc:
					"Vi lagrar inte chattar eller personlig information externt.",
				privacyPrivate: "Alla chattar är privata",
				privacyPrivateDesc:
					"Dina konversationer förblir helt privata och delas inte.",
				privacyUnderstood: "Förstått",
				scrollToBottom: "Rulla ner",
			},
			da: {
				title: "Echt Ierland Chat",
				clearChat: "Ryd chat",
				closeChat: "Luk chat",
				showInfo: "Vis information",
				welcomeMessage: "Hej! Hvordan kan jeg hjælpe dig?",
				placeholder: "Dit spørgsmål...",
				errorMessage: "Beklager, der opstod en fejl. Prøv igen.",
				privacyTitle: "Privatliv og Data",
				privacyLocalStorage: "Alle chats gemmes kun på din enhed",
				privacyLocalStorageDesc:
					"Vi gemmer ikke chats eller personlige oplysninger eksternt.",
				privacyPrivate: "Alle chats er private",
				privacyPrivateDesc:
					"Dine samtaler forbliver helt private og deles ikke.",
				privacyUnderstood: "Forstået",
				scrollToBottom: "Rul ned",
			},
			no: {
				title: "Echt Ierland Chat",
				clearChat: "Tøm chat",
				closeChat: "Lukk chat",
				showInfo: "Vis informasjon",
				welcomeMessage: "Hei! Hvordan kan jeg hjelpe deg?",
				placeholder: "Ditt spørsmål...",
				errorMessage: "Beklager, det oppstod en feil. Prøv igjen.",
				privacyTitle: "Personvern og Data",
				privacyLocalStorage: "Alle chatter lagres kun på din enhet",
				privacyLocalStorageDesc:
					"Vi lagrer ikke chatter eller personlig informasjon eksternt.",
				privacyPrivate: "Alle chatter er private",
				privacyPrivateDesc: "Dine samtaler forblir helt private og deles ikke.",
				privacyUnderstood: "Forstått",
				scrollToBottom: "Rull ned",
			},
			is: {
				title: "Echt Ierland Chat",
				clearChat: "Hreinsa spjall",
				closeChat: "Loka spjalli",
				showInfo: "Sýna upplýsingar",
				welcomeMessage: "Halló! Hvernig get ég hjálpað þér?",
				placeholder: "Spurningin þín...",
				errorMessage: "Því miður, villa kom upp. Vinsamlegast reyndu aftur.",
				privacyTitle: "Einkalíf og Gögn",
				privacyLocalStorage: "Öll spjöll eru aðeins geymd á þínu tæki",
				privacyLocalStorageDesc:
					"Við geymum ekki spjöll eða persónuupplýsingar utanaðkomandi.",
				privacyPrivate: "Öll spjöll eru einkamál",
				privacyPrivateDesc:
					"Samtöl þín verða algjörlega einkamál og eru ekki deild.",
				privacyUnderstood: "Skilja",
				scrollToBottom: "Fletta niður",
			},
			mt: {
				title: "Echt Ierland Chat",
				clearChat: "Ħassar chat",
				closeChat: "Agħlaq chat",
				showInfo: "Uri informazzjoni",
				welcomeMessage: "Bonġu! Kif nista' ngħinek?",
				placeholder: "Il-mistoqsija tiegħek...",
				errorMessage:
					"Jiddispjaċini, kien hemm żball. Jekk jogħġbok ipprova mill-ġdid.",
				privacyTitle: "Privatezza u Data",
				privacyLocalStorage:
					"Il-chats kollha jinżammu biss fuq it-tagħmir tiegħek",
				privacyLocalStorageDesc:
					"Aħna ma nżammux chats jew informazzjoni personali barra.",
				privacyPrivate: "Il-chats kollha huma privati",
				privacyPrivateDesc:
					"Il-konversazzjonijiet tiegħek jibqgħu kompletament privati u ma jinqasmu.",
				privacyUnderstood: "Mifhum",
				scrollToBottom: "Iċċarġja 'l isfel",
			},
			cy: {
				title: "Echt Ierland Chat",
				clearChat: "Clirio sgwrs",
				closeChat: "Cau sgwrs",
				showInfo: "Dangos gwybodaeth",
				welcomeMessage: "Helo! Sut gallaf eich helpu?",
				placeholder: "Eich cwestiwn...",
				errorMessage: "Mae'n ddrwg gennyf, bu gwall. Rhowch gynnig arall arni.",
				privacyTitle: "Preifatrwydd a Data",
				privacyLocalStorage:
					"Mae pob sgwrs yn cael ei storio ar eich dyfais yn unig",
				privacyLocalStorageDesc:
					"Nid ydym yn storio sgwrsiau neu wybodaeth bersonol yn allanol.",
				privacyPrivate: "Mae pob sgwrs yn breifat",
				privacyPrivateDesc:
					"Mae eich sgyrsiau yn aros yn hollol breifat ac nid ydynt yn cael eu rhannu.",
				privacyUnderstood: "Deall",
				scrollToBottom: "Sgrolio i lawr",
			},
			ga: {
				title: "Echt Ierland Chat",
				clearChat: "Glan comhrá",
				closeChat: "Dún comhrá",
				showInfo: "Taispeáin eolas",
				welcomeMessage: "Dia dhuit! Conas is féidir liom cabhrú leat?",
				placeholder: "Do cheist...",
				errorMessage:
					"Tá brón orm, tharla earráid. Déan iarracht arís le do thoil.",
				privacyTitle: "Príobháideachas agus Sonraí",
				privacyLocalStorage: "Stóráiltear gach comhrá ar do ghléas amháin",
				privacyLocalStorageDesc:
					"Ní stóráilimid comhráite nó faisnéis phearsanta go seachtrach.",
				privacyPrivate: "Tá gach comhrá príobháideach",
				privacyPrivateDesc:
					"Fanann do chomhráite go hiomlán príobháideach agus ní roinneann siad.",
				privacyUnderstood: "Tuigthe",
				scrollToBottom: "Scrollaigh síos",
			},
			el: {
				title: "Echt Ierland Chat",
				clearChat: "Καθαρισμός συνομιλίας",
				closeChat: "Κλείσιμο συνομιλίας",
				showInfo: "Εμφάνιση πληροφοριών",
				welcomeMessage: "Γεια σας! Πώς μπορώ να σας βοηθήσω;",
				placeholder: "Η ερώτησή σας...",
				errorMessage: "Συγγνώμη, προέκυψε σφάλμα. Παρακαλώ δοκιμάστε ξανά.",
				privacyTitle: "Απόρρητο και Δεδομένα",
				privacyLocalStorage:
					"Όλες οι συνομιλίες αποθηκεύονται μόνο στην συσκευή σας",
				privacyLocalStorageDesc:
					"Δεν αποθηκεύουμε συνομιλίες ή προσωπικές πληροφορίες εξωτερικά.",
				privacyPrivate: "Όλες οι συνομιλίες είναι ιδιωτικές",
				privacyPrivateDesc:
					"Οι συνομιλίες σας παραμένουν εντελώς ιδιωτικές και δεν κοινοποιούνται.",
				privacyUnderstood: "Κατανοητό",
				scrollToBottom: "Κύλιση προς τα κάτω",
			},
		};
	function $c(e = "nl") {
		return ao[e] || ao.en;
	}
	const Oc = {
			key: 1,
			class:
				"bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col border border-gray-200 relative",
			style: { "max-height": "calc(100dvh - 130px)" },
		},
		Bc = {
			class:
				"text-white p-4 rounded-t-2xl flex justify-start items-center gap-2 bg-primary",
		},
		Nc = { class: "text-lg font-semibold" },
		Fc = ["aria-label"],
		Hc = ["aria-label"],
		Uc = ["aria-label"],
		Vc = { key: 0, class: "text-center text-gray-500 mt-8" },
		Wc = { key: 0, class: "text-[15px] leading-relaxed" },
		Kc = { key: 1, class: "flex justify-start" },
		qc = { key: 0, class: "absolute bottom-20 right-4 z-10" },
		Zc = ["title"],
		Jc = { class: "p-4 border-t border-gray-200" },
		Gc = ["placeholder", "disabled"],
		Qc = ["disabled"],
		Yc = { class: "flex items-center justify-between mb-4" },
		Xc = { class: "text-lg font-semibold text-gray-800" },
		eu = { class: "space-y-4 text-gray-700" },
		tu = { class: "flex items-start space-x-3" },
		nu = { class: "font-medium text-gray-800" },
		su = { class: "text-sm text-gray-600 mt-1" },
		ru = { class: "flex items-start space-x-3" },
		iu = { class: "font-medium text-gray-800" },
		ou = { class: "text-sm text-gray-600 mt-1" },
		lu = { class: "mt-6 flex justify-end" },
		au = "/api/chatbot",
		cu = Nr({
			__name: "ChatWidget",
			props: { config: {} },
			setup(e) {
				const t = e,
					n = $s(Ns),
					s = $s(Bt),
					r = $s(Fs),
					i = Lt(() => n.value),
					o = Lt(() => s.value),
					l = Lt(() => r.value),
					a = Lt(() => $c(t.config.language || "en")),
					h = gt(""),
					u = gt(),
					p = gt(!1),
					g = gt(!0),
					w = gt(!1),
					E = gt(!1),
					R = Lt(() => l.value),
					Q = () => {
						if (!u.value) return !0;
						const {
							scrollTop: ee,
							scrollHeight: S,
							clientHeight: fe,
						} = u.value;
						return S - ee - fe < 10;
					},
					z = () => {
						ws(() => {
							u.value && g.value && (u.value.scrollTop = u.value.scrollHeight);
						});
					},
					U = () => {
						if (!u.value) return;
						const ee = Q();
						(g.value = ee), (w.value = !ee), ee && (p.value = !1);
					};
				bt(
					o,
					() => {
						g.value ? z() : (w.value = !0);
					},
					{ deep: !0 },
				),
					bt(l, (ee) => {
						ee && g.value && z();
					});
				const q = async (ee) => {
					var fe;
					if ((ee.preventDefault(), !h.value.trim() || R.value)) return;
					const S = h.value.trim();
					(h.value = ""), Kn({ role: "user", content: S }), Fs.set(!0);
					try {
						const ve = await fetch(au, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								language: t.config.language || "en",
								messages: [
									...o.value.map((st) => ({
										role: st.role,
										content: st.content,
									})),
									{ role: "user", content: S },
								],
								stream: !0,
							}),
						});
						if (!ve.ok)
							throw (
								(console.log("HTTP error! status: ", ve),
								new Error(`HTTP error! status: ${ve.status}`))
							);
						const Se = (fe = ve.body) == null ? void 0 : fe.getReader();
						if (!Se)
							throw (
								(console.log("No response body"), new Error("No response body"))
							);
						Kn({ role: "assistant", content: "" });
						const J = new TextDecoder();
						let _t = null,
							nt = "",
							Ae = "";
						for (;;) {
							const { done: st, value: ne } = await Se.read();
							if (st) break;
							for (Ae += J.decode(ne, { stream: !0 }); Ae.includes("DATA:"); ) {
								const F = Ae.indexOf("DATA:"),
									$ = Ae.substring(F + 5);
								let ge = -1,
									Ke = 0,
									me = !1,
									ye = !1;
								for (let le = 0; le < $.length; le++) {
									const qe = $[le];
									if (ye) {
										ye = !1;
										continue;
									}
									if (qe === "\\") {
										ye = !0;
										continue;
									}
									if (qe === '"') {
										me = !me;
										continue;
									}
									if (
										!me &&
										(qe === "{" && Ke++, qe === "}" && Ke--, Ke === 0)
									) {
										ge = le + 1;
										break;
									}
								}
								if (ge === -1) break;
								const fn = $.substring(0, ge);
								Ae = $.substring(ge);
								try {
									const le = JSON.parse(fn);
									if (le.type === "sources") _t = le.data;
									else if (le.type === "text") {
										nt += le.data;
										const qe = o.value,
											ht = qe[qe.length - 1];
										if (ht.role === "assistant") {
											const Nt = { ...ht, content: nt },
												Tt = [...qe];
											(Tt[Tt.length - 1] = Nt), Bt.set(Tt);
										}
									} else
										le.type === "end"
											? console.log("Stream completed")
											: le.type === "error" &&
												(console.error("Stream error:", le.data),
												Kn({
													role: "assistant",
													content: `Error: ${le.data}`,
												}));
								} catch (le) {
									console.error("Error parsing stream data:", le, "JSON:", fn);
								}
							}
						}
						if (Ae.trim()) {
							const st = Ae.split("DATA:").filter((ne) => ne.trim());
							for (const ne of st)
								try {
									const F = JSON.parse(ne.trim());
									if (F.type === "sources") _t = F.data;
									else if (F.type === "text") {
										nt += F.data;
										const $ = o.value,
											ge = $[$.length - 1];
										if (ge.role === "assistant") {
											const Ke = { ...ge, content: nt },
												me = [...$];
											(me[me.length - 1] = Ke), Bt.set(me);
										}
									}
								} catch (F) {
									console.error("Error parsing final buffer data:", F);
								}
						}
					} catch (ve) {
						console.error("Chat error:", ve),
							Kn({ role: "assistant", content: a.value.errorMessage });
					} finally {
						Fs.set(!1);
					}
				};
				Wr(() => {
					z();
				});
				function P() {
					Bt.set([]);
				}
				const Y = () => {
					(g.value = !0), (w.value = !1), z();
				};
				return (
					bt(i, (ee) => {
						ee &&
							ws(() => {
								(g.value = !0), z();
							});
					}),
					(ee, S) => {
						var fe, ve, Se;
						return (
							_e(),
							Ie(
								"div",
								{
									class: "fixed bottom-4 right-4 z-50",
									style: bn(
										`--primary: ${((fe = ee.config.theme)) == null ? void 0 : fe.primary}; --primary-hover: ${((ve = ee.config.theme)) == null ? void 0 : ve.primaryHover};`,
									),
								},
								[
									i.value
										? zt("", !0)
										: (_e(),
											Ie(
												"button",
												{
													key: 0,
													onClick:
														S[0] || (S[0] = (...J) => qt(Wn) && qt(Wn)(...J)),
													class:
														"bg-primary btn text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105",
												},
												[
													...(S[8] ||
														(S[8] = [
															C(
																"svg",
																{
																	class: "w-6 h-6",
																	fill: "none",
																	stroke: "currentColor",
																	viewBox: "0 0 24 24",
																},
																[
																	C("path", {
																		"stroke-linecap": "round",
																		"stroke-linejoin": "round",
																		"stroke-width": "2",
																		d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
																	}),
																],
																-1,
															),
														])),
												],
											)),
									i.value
										? (_e(),
											Ie("div", Oc, [
												C("div", Bc, [
													C(
														"h3",
														Nc,
														De(
															((Se = t.config) == null ? void 0 : Se.title) ||
																"chat with us",
														),
														1,
													),
													C(
														"button",
														{
															onClick: S[1] || (S[1] = (J) => (E.value = !0)),
															"aria-label": a.value.showInfo,
															class:
																"text-white hover:text-gray-200 transition-colors ml-auto",
														},
														[
															...(S[9] ||
																(S[9] = [
																	C(
																		"svg",
																		{
																			xmlns: "http://www.w3.org/2000/svg",
																			width: "24",
																			height: "24",
																			viewBox: "0 0 24 24",
																		},
																		[
																			C(
																				"g",
																				{
																					fill: "none",
																					stroke: "currentColor",
																					"stroke-linecap": "round",
																					"stroke-linejoin": "round",
																					"stroke-width": "2",
																				},
																				[
																					C("path", {
																						d: "m12.802 2.165l5.575 2.389c.48.206.863.589 1.07 1.07l2.388 5.574c.22.512.22 1.092 0 1.604l-2.389 5.575c-.206.48-.589.863-1.07 1.07l-5.574 2.388c-.512.22-1.092.22-1.604 0l-5.575-2.389a2.04 2.04 0 0 1-1.07-1.07l-2.388-5.574a2.04 2.04 0 0 1 0-1.604l2.389-5.575c.206-.48.589-.863 1.07-1.07l5.574-2.388a2.04 2.04 0 0 1 1.604 0M12 9h.01",
																					}),
																					C("path", { d: "M11 12h1v4h1" }),
																				],
																			),
																		],
																		-1,
																	),
																])),
														],
														8,
														Fc,
													),
													C(
														"button",
														{
															onClick: P,
															"aria-label": a.value.clearChat,
															class:
																"text-white hover:text-gray-200 transition-colors",
														},
														[
															...(S[10] ||
																(S[10] = [
																	C(
																		"svg",
																		{
																			xmlns: "http://www.w3.org/2000/svg",
																			width: "24",
																			height: "24",
																			viewBox: "0 0 24 24",
																		},
																		[
																			C("path", {
																				fill: "none",
																				stroke: "currentColor",
																				"stroke-linecap": "round",
																				"stroke-linejoin": "round",
																				"stroke-width": "2",
																				d: "M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4",
																			}),
																		],
																		-1,
																	),
																])),
														],
														8,
														Hc,
													),
													C(
														"button",
														{
															"aria-label": a.value.closeChat,
															onClick:
																S[2] ||
																(S[2] = (...J) => qt(Wn) && qt(Wn)(...J)),
															class:
																"text-white hover:text-gray-200 transition-colors",
														},
														[
															...(S[11] ||
																(S[11] = [
																	C(
																		"svg",
																		{
																			class: "w-5 h-5",
																			fill: "none",
																			stroke: "currentColor",
																			viewBox: "0 0 24 24",
																		},
																		[
																			C("path", {
																				"stroke-linecap": "round",
																				"stroke-linejoin": "round",
																				"stroke-width": "2",
																				d: "M6 18L18 6M6 6l12 12",
																			}),
																		],
																		-1,
																	),
																])),
														],
														8,
														Uc,
													),
												]),
												C(
													"div",
													{
														ref_key: "messagesContainer",
														ref: u,
														onScroll: U,
														class:
															"flex-1 overflow-y-auto p-4 space-y-4 relative",
														style: {
															"max-height": "calc(100dvh - 200px)",
															"scroll-behavior": "smooth",
														},
													},
													[
														o.value.length === 0
															? (_e(),
																Ie("div", Vc, [
																	S[12] ||
																		(S[12] = _i(
																			'<div class="mb-4 rounded-full w-20 h-20 mx-auto p-4 grid place-items-center bg-black/10"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 32 32"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M25 5H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11l6 4v-4h1a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4"></path><path d="M10 15a1 1 0 1 1-2 0a1 1 0 0 1 2 0m6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path></g></svg></div>',
																			1,
																		)),
																	C("p", null, De(a.value.welcomeMessage), 1),
																]))
															: zt("", !0),
														(_e(!0),
														Ie(
															Be,
															null,
															Sl(
																o.value,
																(J) => (
																	_e(),
																	Ie(
																		"div",
																		{
																			key: J.id,
																			class: Mt(
																				`mb-4 ${J.role === "user" ? "flex justify-end" : "flex justify-start"}`,
																			),
																		},
																		[
																			C(
																				"div",
																				{
																					class: Mt(
																						`max-w-[95%] overflow-x-hidden chat-message ${J.role === "user" ? "ml-5" : "mr-5"}`,
																					),
																				},
																				[
																					C(
																						"div",
																						{
																							class: Mt(
																								`px-5 py-4 rounded-2xl ${J.role === "user" ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-800 shadow-sm"}`,
																							),
																						},
																						[
																							J.role === "user"
																								? (_e(),
																									Ie("p", Wc, De(J.content), 1))
																								: (_e(),
																									wi(
																										Lc,
																										{
																											key: 1,
																											content: J.content,
																											"is-streaming":
																												l.value &&
																												J ===
																													o.value[
																														o.value.length - 1
																													],
																										},
																										null,
																										8,
																										["content", "is-streaming"],
																									)),
																						],
																						2,
																					),
																				],
																				2,
																			),
																		],
																		2,
																	)
																),
															),
															128,
														)),
														l.value
															? (_e(),
																Ie("div", Kc, [
																	...(S[13] ||
																		(S[13] = [
																			_i(
																				'<div class="bg-gray-100 rounded-2xl px-4 py-2"><div class="flex space-x-1"><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0.1s;"></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0.2s;"></div></div></div>',
																				1,
																			),
																		])),
																]))
															: zt("", !0),
													],
													544,
												),
												w.value
													? (_e(),
														Ie("div", qc, [
															C(
																"button",
																{
																	onClick: Y,
																	class:
																		"bg-primary btn text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105",
																	title: a.value.scrollToBottom,
																},
																[
																	...(S[14] ||
																		(S[14] = [
																			C(
																				"svg",
																				{
																					class: "w-5 h-5",
																					fill: "none",
																					stroke: "currentColor",
																					viewBox: "0 0 24 24",
																				},
																				[
																					C("path", {
																						"stroke-linecap": "round",
																						"stroke-linejoin": "round",
																						"stroke-width": "2",
																						d: "M19 14l-7 7m0 0l-7-7m7 7V3",
																					}),
																				],
																				-1,
																			),
																		])),
																],
																8,
																Zc,
															),
														]))
													: zt("", !0),
												C("div", Jc, [
													C(
														"form",
														{
															onSubmit: Ui(q, ["prevent"]),
															class: "flex space-x-2",
														},
														[
															cl(
																C(
																	"input",
																	{
																		"onUpdate:modelValue":
																			S[3] || (S[3] = (J) => (h.value = J)),
																		type: "text",
																		placeholder: a.value.placeholder,
																		class:
																			"flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
																		disabled: R.value,
																	},
																	null,
																	8,
																	Gc,
																),
																[[Na, h.value]],
															),
															C(
																"button",
																{
																	type: "submit",
																	disabled: R.value || !h.value.trim(),
																	class:
																		"bg-primary btn disabled:bg-gray-300 text-white px-4 py-2 rounded-full transition-colors disabled:cursor-not-allowed",
																},
																[
																	...(S[15] ||
																		(S[15] = [
																			C(
																				"svg",
																				{
																					xmlns: "http://www.w3.org/2000/svg",
																					width: "24",
																					height: "24",
																					viewBox: "0 0 24 24",
																				},
																				[
																					C("path", {
																						fill: "none",
																						stroke: "currentColor",
																						"stroke-linecap": "round",
																						"stroke-linejoin": "round",
																						"stroke-width": "2",
																						d: "M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1z",
																					}),
																				],
																				-1,
																			),
																		])),
																],
																8,
																Qc,
															),
														],
														32,
													),
												]),
												E.value
													? (_e(),
														Ie(
															"div",
															{
																key: 1,
																class:
																	"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
																onClick: S[7] || (S[7] = (J) => (E.value = !1)),
															},
															[
																C(
																	"div",
																	{
																		class:
																			"bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl",
																		onClick:
																			S[6] || (S[6] = Ui(() => {}, ["stop"])),
																	},
																	[
																		C("div", Yc, [
																			C("h3", Xc, De(a.value.privacyTitle), 1),
																			C(
																				"button",
																				{
																					onClick:
																						S[4] ||
																						(S[4] = (J) => (E.value = !1)),
																					class:
																						"text-gray-400 hover:text-gray-600 transition-colors",
																					"aria-label": "Close dialog",
																				},
																				[
																					...(S[16] ||
																						(S[16] = [
																							C(
																								"svg",
																								{
																									class: "w-6 h-6",
																									fill: "none",
																									stroke: "currentColor",
																									viewBox: "0 0 24 24",
																								},
																								[
																									C("path", {
																										"stroke-linecap": "round",
																										"stroke-linejoin": "round",
																										"stroke-width": "2",
																										d: "M6 18L18 6M6 6l12 12",
																									}),
																								],
																								-1,
																							),
																						])),
																				],
																			),
																		]),
																		C("div", eu, [
																			C("div", tu, [
																				S[17] ||
																					(S[17] = C(
																						"div",
																						{
																							class:
																								"flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center",
																						},
																						[
																							C(
																								"svg",
																								{
																									class: "w-4 h-4 text-white",
																									fill: "none",
																									stroke: "currentColor",
																									viewBox: "0 0 24 24",
																								},
																								[
																									C("path", {
																										"stroke-linecap": "round",
																										"stroke-linejoin": "round",
																										"stroke-width": "2",
																										d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
																									}),
																								],
																							),
																						],
																						-1,
																					)),
																				C("div", null, [
																					C(
																						"p",
																						nu,
																						De(a.value.privacyLocalStorage),
																						1,
																					),
																					C(
																						"p",
																						su,
																						De(a.value.privacyLocalStorageDesc),
																						1,
																					),
																				]),
																			]),
																			C("div", ru, [
																				S[18] ||
																					(S[18] = C(
																						"div",
																						{
																							class:
																								"flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center",
																						},
																						[
																							C(
																								"svg",
																								{
																									class:
																										"w-4 h-4 text-green-600",
																									fill: "none",
																									stroke: "currentColor",
																									viewBox: "0 0 24 24",
																								},
																								[
																									C("path", {
																										"stroke-linecap": "round",
																										"stroke-linejoin": "round",
																										"stroke-width": "2",
																										d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
																									}),
																								],
																							),
																						],
																						-1,
																					)),
																				C("div", null, [
																					C(
																						"p",
																						iu,
																						De(a.value.privacyPrivate),
																						1,
																					),
																					C(
																						"p",
																						ou,
																						De(a.value.privacyPrivateDesc),
																						1,
																					),
																				]),
																			]),
																		]),
																		C("div", lu, [
																			C(
																				"button",
																				{
																					onClick:
																						S[5] ||
																						(S[5] = (J) => (E.value = !1)),
																					class:
																						"bg-primary btn text-white px-4 py-2 rounded-lg transition-colors",
																				},
																				De(a.value.privacyUnderstood),
																				1,
																			),
																		]),
																	],
																),
															],
														))
													: zt("", !0),
											]))
										: zt("", !0),
								],
								4,
							)
						);
					}
				);
			},
		});
	class uu {
		constructor(t, n) {
			K(this, "shadowRoot");
			K(this, "app");
			K(this, "config");
			(this.config = n),
				t.shadowRoot
					? ((this.shadowRoot = t.shadowRoot), (this.shadowRoot.innerHTML = ""))
					: (this.shadowRoot = t.attachShadow({ mode: "open" })),
				this.initializeWidget();
		}
		initializeWidget() {
			const t = document.createElement("div");
			(t.id = "chat-widget"),
				this.shadowRoot.appendChild(t),
				(this.app = Wa(cu, { config: this.config })),
				this.app.mount(t),
				this.injectStyles();
		}
		injectStyles() {
			const t = document.createElement("style");
			(t.textContent = `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        
        /* Additional custom styles for shadow DOM */
        #chat-widget {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.5;
          color: #333;
          --primary: #eb720f;
          --primary-hover: #ea580c;
        }
        
        /* Ensure proper z-index stacking */
        #chat-widget .fixed {
          z-index: 999999;
        }
        
        /* Custom scrollbar for messages */
        #chat-widget .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        #chat-widget .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        #chat-widget .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        #chat-widget .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Custom link styles for chat messages */
        #chat-widget .chat-message a {
          transition: all 0.3s ease !important;
          color: var(--primary, teal) !important;
          text-decoration: underline !important;
        }
        
        #chat-widget .chat-message a:hover {
          color: var(--primary-hover, black) !important;
          text-decoration: none !important;
        }
        
        /* Override prose styles for links */
        #chat-widget .chat-message a {
          color: var(--primary, teal) !important;
          text-decoration: none !important;
        }
        
        #chat-widget .chat-message a:hover {
          color: var(--primary-hover, black) !important;
          text-decoration: underline !important;
        }
  
         #chat-widget .btn:hover {
          background-color: var(--primary-hover, black) !important; 
        }
  
      
  
          #chat-widget .bg-primary {
              background-color: var(--primary, teal) !important;
          }
      
       #chat-widget chat-message ul li ul {
          list-style-type: disc !important;
          margin-left: 1rem !important;
          margin-block: 1rem !important;
      }
      
       #chat-widget .chat-message img {
          max-width: 100% !important;
          width: 100% !important;
          height: auto !important;
       }
      
          #chat-widget .chat-message ul li ul li {
              list-style-type: disc !important;
              margin-left: 1rem !important;
              line-height: 1.2 !important;
              margin-block: 0.2rem !important;
          }
  
           #chat-widget .chat-message * + *{
             
              padding-top: 0.5rem !important;
          }
      `),
				this.shadowRoot.appendChild(t);
		}
		destroy() {
			this.app && (this.app.unmount(), (this.app = null)),
				this.shadowRoot && (this.shadowRoot.innerHTML = "");
		}
		updateConfig(t) {
			(this.config = { ...this.config, ...t }),
				this.destroy(),
				this.initializeWidget();
		}
	}
	let We = null;
	function Gs(e, t) {
		const n = t ? document.getElementById(t) : document.body;
		if (!n) throw new Error(`Container element ${t || "body"} not found`);
		return We && (We.destroy(), (We = null)), (We = new uu(n, e)), We;
	}
	function Qs() {
		We && (We.destroy(), (We = null));
	}
	function Ys(e) {
		We && We.updateConfig(e);
	}
	typeof window < "u" &&
		((window.AstroChattyGptWidget = { init: Gs, destroy: Qs, update: Ys }),
		(window.initChatWidget = Gs),
		(window.destroyChatWidget = Qs),
		(window.updateChatWidget = Ys)),
		(se.destroyChatWidget = Qs),
		(se.initChatWidget = Gs),
		(se.updateChatWidget = Ys),
		Object.defineProperty(se, Symbol.toStringTag, { value: "Module" });
})((this.AstroChattyGptWidget = this.AstroChattyGptWidget || {}));
