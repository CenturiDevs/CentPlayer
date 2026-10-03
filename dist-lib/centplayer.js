import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/Icon.tsx
var o = {
	play: [{
		shape: "path",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}],
	pause: [{
		shape: "rect",
		x: 14,
		y: 3,
		w: 5,
		h: 18,
		rx: 1
	}, {
		shape: "rect",
		x: 5,
		y: 3,
		w: 5,
		h: 18,
		rx: 1
	}],
	volume: [
		{
			shape: "path",
			d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
		},
		{
			shape: "path",
			d: "M16 9a5 5 0 0 1 0 6"
		},
		{
			shape: "path",
			d: "M19.364 18.364a9 9 0 0 0 0-12.728"
		}
	],
	muted: [
		{
			shape: "path",
			d: "M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"
		},
		{
			shape: "path",
			d: "m16.5 14.5 5-5"
		},
		{
			shape: "path",
			d: "m16.5 9.5 5 5"
		}
	],
	back10: [{
		shape: "path",
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
	}, {
		shape: "path",
		d: "M3 3v5h5"
	}],
	forward10: [{
		shape: "path",
		d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"
	}, {
		shape: "path",
		d: "M21 3v5h-5"
	}],
	back: [{
		shape: "path",
		d: "m12 19-7-7 7-7"
	}, {
		shape: "path",
		d: "M19 12H5"
	}],
	chevronLeft: [{
		shape: "path",
		d: "m15 18-6-6 6-6"
	}],
	chevronRight: [{
		shape: "path",
		d: "m9 18 6-6-6-6"
	}],
	fullscreen: [
		{
			shape: "path",
			d: "M8 3H5a2 2 0 0 0-2 2v3"
		},
		{
			shape: "path",
			d: "M21 8V5a2 2 0 0 0-2-2h-3"
		},
		{
			shape: "path",
			d: "M3 16v3a2 2 0 0 0 2 2h3"
		},
		{
			shape: "path",
			d: "M16 21h3a2 2 0 0 0 2-2v-3"
		}
	],
	exitFullscreen: [
		{
			shape: "path",
			d: "M8 3v3a2 2 0 0 1-2 2H3"
		},
		{
			shape: "path",
			d: "M21 8h-3a2 2 0 0 1-2-2V3"
		},
		{
			shape: "path",
			d: "M3 16h3a2 2 0 0 1 2 2v3"
		},
		{
			shape: "path",
			d: "M16 21v-3a2 2 0 0 1 2-2h3"
		}
	],
	pip: [{
		shape: "path",
		d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"
	}, {
		shape: "rect",
		x: 12,
		y: 13,
		w: 10,
		h: 7,
		rx: 2
	}],
	expand: [
		{
			shape: "path",
			d: "m15 15 6 6"
		},
		{
			shape: "path",
			d: "m15 9 6-6"
		},
		{
			shape: "path",
			d: "M21 16v5h-5"
		},
		{
			shape: "path",
			d: "M21 8V3h-5"
		},
		{
			shape: "path",
			d: "M3 16v5h5"
		},
		{
			shape: "path",
			d: "m3 21 6-6"
		},
		{
			shape: "path",
			d: "M3 8V3h5"
		},
		{
			shape: "path",
			d: "M9 9 3 3"
		}
	],
	shrink: [
		{
			shape: "path",
			d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8"
		},
		{
			shape: "path",
			d: "M9 19.8V15m0 0H4.2M9 15l-6 6"
		},
		{
			shape: "path",
			d: "M15 4.2V9m0 0h4.8M15 9l6-6"
		},
		{
			shape: "path",
			d: "M9 4.2V9m0 0H4.2M9 9 3 3"
		}
	]
};
function s({ name: e, className: t }) {
	return /* @__PURE__ */ i("svg", {
		className: t ? `cp-icon ${t}` : "cp-icon",
		viewBox: "0 0 24 24",
		width: "24",
		height: "24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		focusable: "false",
		children: o[e].map((e, t) => e.shape === "path" ? /* @__PURE__ */ i("path", { d: e.d }, t) : /* @__PURE__ */ i("rect", {
			x: e.x,
			y: e.y,
			width: e.w,
			height: e.h,
			rx: e.rx
		}, t))
	});
}
//#endregion
//#region src/components/EpisodeButton.tsx
function c({ direction: e, label: t, onClick: n }) {
	let r = e === "prev" ? "chevronLeft" : "chevronRight";
	return /* @__PURE__ */ a("button", {
		type: "button",
		className: "cp-pill",
		onClick: n,
		disabled: !n,
		"aria-label": t,
		children: [
			e === "prev" && /* @__PURE__ */ i(s, {
				name: r,
				className: "cp-pill-icon"
			}),
			/* @__PURE__ */ i("span", {
				className: "cp-pill-label",
				children: t
			}),
			e === "next" && /* @__PURE__ */ i(s, {
				name: r,
				className: "cp-pill-icon"
			})
		]
	});
}
//#endregion
//#region src/components/IconButton.tsx
function l({ name: e, label: t, onClick: n, size: r = "md", className: a }) {
	return /* @__PURE__ */ i("button", {
		type: "button",
		className: `cp-btn cp-btn--${r}${a ? ` ${a}` : ""}`,
		onClick: n,
		"aria-label": t,
		title: t,
		children: /* @__PURE__ */ i(s, { name: e })
	});
}
//#endregion
//#region src/components/InfoPanel.tsx
function u({ title: e, description: t }) {
	return !e && !t ? null : /* @__PURE__ */ a("div", { children: [e && /* @__PURE__ */ i("h2", {
		className: "cp-title",
		children: e
	}), t && /* @__PURE__ */ i("p", {
		className: "cp-desc",
		children: t
	})] });
}
//#endregion
//#region src/core/format.ts
function d(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => e.toString().padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
var f = (e) => Math.min(Math.max(e, 0), 1);
function p(e, t) {
	return !e || t <= 0 ? null : {
		left: `${f(e.start / t) * 100}%`,
		width: `${f((e.end - e.start) / t) * 100}%`
	};
}
//#endregion
//#region src/components/MetaRow.tsx
function m({ player: e }) {
	return /* @__PURE__ */ a("div", {
		className: "cp-meta",
		children: [
			/* @__PURE__ */ i("span", {
				className: "cp-time",
				children: d(e.currentTime)
			}),
			e.pipSupported && /* @__PURE__ */ i(l, {
				name: "pip",
				label: e.isPip ? "Exit picture-in-picture" : "Picture-in-picture",
				size: "sm",
				className: e.isPip ? "cp-btn--active" : "",
				onClick: e.togglePip
			}),
			/* @__PURE__ */ i(l, {
				name: e.isFullscreen ? "exitFullscreen" : "fullscreen",
				label: e.isFullscreen ? "Exit fullscreen" : "Fullscreen",
				size: "sm",
				onClick: e.toggleFullscreen
			}),
			/* @__PURE__ */ i(l, {
				name: e.isTheater ? "shrink" : "expand",
				label: e.isTheater ? "Exit expanded view" : "Expanded view",
				size: "sm",
				onClick: e.toggleTheater
			})
		]
	});
}
//#endregion
//#region src/components/SkipButton.tsx
function h({ label: e, onSkip: t }) {
	return /* @__PURE__ */ i("button", {
		type: "button",
		className: "cp-skip",
		onClick: t,
		children: e
	});
}
//#endregion
//#region src/components/Timeline.tsx
function g({ player: t, segments: o }) {
	let { duration: s, currentTime: c, buffered: l, isScrubbing: u } = t, m = n(null), h = n(!1), [g, _] = r(null), v = e((e) => {
		let t = m.current;
		if (!t) return 0;
		let n = t.getBoundingClientRect();
		return n.width === 0 ? 0 : f((e - n.left) / n.width);
	}, []), y = (e) => {
		e.currentTarget.hasPointerCapture(e.pointerId) || e.currentTarget.setPointerCapture(e.pointerId), h.current = !0, t.beginScrub(), t.scrubTo(v(e.clientX) * s);
	}, b = (e) => {
		let n = v(e.clientX);
		_(n), h.current && t.scrubTo(n * s);
	}, x = (e) => {
		e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId), h.current = !1, t.endScrub(v(e.clientX) * s);
	}, S = (e) => {
		(e.key === "ArrowLeft" || e.key === "ArrowRight") && (e.preventDefault(), e.stopPropagation(), t.seekBy(e.key === "ArrowLeft" ? -10 : 10));
	}, C = s > 0 ? f(c / s) : 0, w = s > 0 ? f(l) : 0, T = o.map((e) => ({
		start: e.start,
		style: p(e, s)
	})).filter((e) => e.style !== null);
	return /* @__PURE__ */ a("div", {
		className: "cp-timeline-wrap",
		children: [/* @__PURE__ */ i("div", {
			className: "cp-timeline",
			ref: m,
			"data-scrubbing": u,
			role: "slider",
			tabIndex: 0,
			"aria-label": "Seek",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(s),
			"aria-valuenow": Math.round(c),
			"aria-valuetext": `${d(c)} of ${d(s)}`,
			onKeyDown: S,
			onPointerDown: y,
			onPointerMove: b,
			onPointerUp: x,
			onPointerCancel: x,
			onPointerLeave: () => _(null),
			children: /* @__PURE__ */ a("div", {
				className: "cp-track",
				children: [
					/* @__PURE__ */ i("div", {
						className: "cp-buffer",
						style: { width: `${w * 100}%` }
					}),
					/* @__PURE__ */ i("div", {
						className: "cp-played",
						style: { width: `${C * 100}%` }
					}),
					T.map(({ start: e, style: t }) => /* @__PURE__ */ i("div", {
						className: "cp-marker",
						style: t
					}, e)),
					/* @__PURE__ */ i("div", {
						className: "cp-thumb",
						style: { left: `${C * 100}%` }
					})
				]
			})
		}), g !== null && /* @__PURE__ */ i("div", {
			className: "cp-preview",
			style: { left: `${g * 100}%` },
			children: d(g * s)
		})]
	});
}
//#endregion
//#region src/components/VolumeControl.tsx
function _({ player: e }) {
	let [o, c] = r(!1), l = n(null);
	t(() => {
		if (!o) return;
		let e = (e) => {
			l.current?.contains(e.target) || c(!1);
		}, t = (e) => {
			e.key === "Escape" && c(!1);
		};
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t);
		};
	}, [o]);
	let { isMuted: u, volume: d } = e;
	return /* @__PURE__ */ a("div", {
		className: "cp-volume",
		ref: l,
		"data-open": o,
		children: [/* @__PURE__ */ i("button", {
			type: "button",
			className: "cp-btn",
			onClick: () => c((e) => !e),
			"aria-label": o ? "Hide volume" : u ? "Unmute" : "Volume",
			"aria-expanded": o,
			children: /* @__PURE__ */ i(s, { name: u || d === 0 ? "muted" : "volume" })
		}), /* @__PURE__ */ i("div", {
			className: "cp-volume-panel",
			role: "group",
			"aria-label": "Volume",
			children: /* @__PURE__ */ i("input", {
				className: "cp-volume-slider",
				type: "range",
				min: 0,
				max: 1,
				step: .05,
				value: u ? 0 : d,
				onChange: (t) => e.changeVolume(Number(t.target.value)),
				"aria-label": "Volume"
			})
		})]
	});
}
//#endregion
//#region src/components/Chrome.tsx
function v({ player: e, features: t, title: n, description: r, onPrevious: o, onNext: s, onTogglePlay: d, onSeekCue: f, intro: p, outro: v }) {
	let { isPlaying: y, inIntro: b, inOutro: x } = e, S = t.introSkip, C = S ? [p, v].filter((e) => !!e) : [], w = S && (b || x), T = t.episodeNavigation;
	return /* @__PURE__ */ a("div", {
		className: "cp-chrome",
		children: [/* @__PURE__ */ i("div", { className: "cp-scrim" }), /* @__PURE__ */ a("div", {
			className: "cp-bottom",
			children: [
				/* @__PURE__ */ i(u, {
					title: n,
					description: r
				}),
				/* @__PURE__ */ a("div", {
					className: "cp-row",
					children: [
						/* @__PURE__ */ i("div", {
							className: "cp-row-side",
							children: T && /* @__PURE__ */ i(c, {
								direction: "prev",
								label: "Previous Episode",
								onClick: o
							})
						}),
						/* @__PURE__ */ a("div", {
							className: "cp-row-center",
							children: [
								/* @__PURE__ */ i(l, {
									name: "back10",
									label: "Back 10 seconds",
									onClick: () => f("back10")
								}),
								/* @__PURE__ */ i(l, {
									name: y ? "pause" : "play",
									label: y ? "Pause" : "Play",
									onClick: d
								}),
								/* @__PURE__ */ i(l, {
									name: "forward10",
									label: "Forward 10 seconds",
									onClick: () => f("forward10")
								})
							]
						}),
						/* @__PURE__ */ a("div", {
							className: "cp-row-side cp-row-side--end",
							children: [
								w && /* @__PURE__ */ i("div", {
									className: "cp-skip-anchor",
									children: /* @__PURE__ */ i(h, {
										label: b ? "Skip intro" : "Skip outro",
										onSkip: b ? e.skipIntro : e.skipOutro
									})
								}),
								/* @__PURE__ */ i(_, { player: e }),
								T && /* @__PURE__ */ i(c, {
									direction: "next",
									label: "Next Episode",
									onClick: s
								})
							]
						})
					]
				}),
				/* @__PURE__ */ i(g, {
					player: e,
					segments: C
				}),
				/* @__PURE__ */ i(m, { player: e })
			]
		})]
	});
}
//#endregion
//#region src/components/MiniProgress.tsx
function y({ player: e }) {
	let t = e.duration > 0 ? f(e.currentTime / e.duration) * 100 : 0;
	return /* @__PURE__ */ i("div", {
		className: "cp-mini",
		"aria-hidden": "true",
		children: /* @__PURE__ */ i("div", {
			className: "cp-mini-played",
			style: { width: `${t}%` }
		})
	});
}
//#endregion
//#region src/components/SurfaceFeedback.tsx
function b({ cue: e }) {
	return e ? /* @__PURE__ */ a("div", {
		className: `cp-cue cp-cue--${e}`,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ i("span", {
			className: "cp-cue-badge",
			children: /* @__PURE__ */ i(s, {
				name: e,
				className: "cp-cue-icon"
			})
		}), /* @__PURE__ */ i("span", {
			className: "cp-cue-text",
			children: "10 seconds"
		})]
	}) : null;
}
//#endregion
//#region src/core/config.ts
var x = {
	anime: {
		introSkip: !0,
		episodeNavigation: !0
	},
	series: {
		introSkip: !1,
		episodeNavigation: !0
	},
	movie: {
		introSkip: !1,
		episodeNavigation: !1
	}
};
function S(e, t) {
	return {
		...x[e],
		...t
	};
}
//#endregion
//#region src/core/usePlayer.ts
var C = (e, t, n) => Math.min(Math.max(e, t), n);
function w(e) {
	if (e.disablePictureInPicture) return !1;
	let t = e;
	return typeof e.requestPictureInPicture == "function" || typeof t.webkitSetPresentationMode == "function";
}
function T(i) {
	let { src: a, view: o = "default", autoPlay: s = !1, muted: c = !1, startAt: l = 0, intro: u, outro: d } = i, { onPlay: f, onPause: p, onEnded: m, onTimeUpdate: h, onSeek: g, onVolumeChange: _, onSkipIntro: v, onSkipOutro: y } = i, b = n(null), x = n(null), [S, T] = r(!1), [E, D] = r(!1), [O, k] = r(!1), [A, ee] = r(!1), [te, j] = r(o === "expanded"), [ne, M] = r(!1), [N, P] = r(!1), [F, I] = r(0), [L, R] = r(0), [re, z] = r(0), [B, V] = r(1), [H, U] = r(c), [ie, ae] = r(!1), [oe, W] = r(!1), [se, G] = r(o);
	se !== o && (G(o), j(o === "expanded"));
	let K = n(!1), q = n(!1), J = n(0), Y = n({}), ce = n({
		autoPlay: s,
		muted: c,
		startAt: l
	});
	t(() => {
		Y.current = {
			onPlay: f,
			onPause: p,
			onEnded: m,
			onTimeUpdate: h,
			onSeek: g,
			onVolumeChange: _,
			onSkipIntro: v,
			onSkipOutro: y
		};
	});
	let X = e(() => {
		let e = b.current;
		e && Y.current.onTimeUpdate?.(e.currentTime, e.duration);
	}, []), le = e(() => {
		let e = b.current;
		if (!e || e.buffered.length === 0 || !e.duration) {
			z(0);
			return;
		}
		z(e.buffered.end(e.buffered.length - 1) / e.duration);
	}, []), ue = e(() => {
		let e = b.current;
		e && e.play().catch(() => T(!1));
	}, []), de = e(() => {
		b.current?.pause();
	}, []), fe = e(() => {
		let e = b.current;
		e && (e.paused ? ue() : de());
	}, [ue, de]), Z = e((e) => {
		let t = b.current;
		if (!t) return;
		let n = C(e, 0, Number.isFinite(t.duration) ? t.duration : e);
		t.currentTime = n, I(n), Y.current.onSeek?.(n), X();
	}, [X]), pe = e((e) => {
		let t = b.current;
		t && Z(t.currentTime + e);
	}, [Z]), me = e((e) => {
		let t = b.current;
		if (!t) return;
		let n = C(e, 0, 1);
		t.volume = n, t.muted = n === 0, V(n), U(n === 0), Y.current.onVolumeChange?.(n);
	}, []), he = e(() => {
		let e = b.current;
		e && (e.muted = !e.muted, U(e.muted), Y.current.onVolumeChange?.(e.muted ? 0 : e.volume));
	}, []), Q = e(() => {
		let e = x.current;
		if (!e || document.fullscreenElement) return;
		let t = e;
		t.requestFullscreen ? t.requestFullscreen().catch(() => {}) : t.webkitRequestFullscreen?.().catch(() => {});
	}, []), $ = e(() => {
		document.fullscreenElement && document.exitFullscreen().catch(() => {});
	}, []), ge = e(() => {
		if (document.fullscreenElement) {
			$();
			return;
		}
		Q();
	}, [Q, $]), _e = e(() => {
		j((e) => !e);
	}, []), ve = e(() => {
		let e = b.current;
		if (!e) return;
		if (document.pictureInPictureElement === e) {
			document.exitPictureInPicture().catch(() => {});
			return;
		}
		if (typeof e.requestPictureInPicture == "function") {
			e.requestPictureInPicture().catch(() => {});
			return;
		}
		let t = e;
		t.webkitSetPresentationMode && e.readyState > 0 && t.webkitSetPresentationMode("picture-in-picture");
	}, []), ye = e(() => {
		let e = b.current;
		K.current = !0, k(!0), q.current = !!e && !e.paused;
	}, []), be = e((e) => {
		I(e);
	}, []), xe = e((e) => {
		let t = b.current;
		K.current = !1, k(!1), t && (t.currentTime = C(e, 0, Number.isFinite(t.duration) ? t.duration : e), q.current && t.play().catch(() => {})), X();
	}, [X]), Se = e(() => {
		u && (ae(!0), Z(u.end), Y.current.onSkipIntro?.());
	}, [u, Z]), Ce = e(() => {
		d && (W(!0), Z(d.end), Y.current.onSkipOutro?.());
	}, [d, Z]);
	return t(() => {
		if (!S) return;
		let e = 0, t = () => {
			let n = b.current;
			if (n) {
				K.current || I(n.currentTime);
				let e = performance.now();
				e - J.current >= 250 && (J.current = e, Y.current.onTimeUpdate?.(n.currentTime, n.duration));
			}
			e = requestAnimationFrame(t);
		};
		return e = requestAnimationFrame(t), () => cancelAnimationFrame(e);
	}, [S]), t(() => {
		o === "fullscreen" ? Q() : $();
	}, [
		o,
		Q,
		$
	]), t(() => {
		let e = () => ee(document.fullscreenElement !== null);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []), t(() => {
		ce.current = {
			autoPlay: s,
			muted: c,
			startAt: l
		};
	}), t(() => {
		let e = b.current;
		if (!e) return;
		D(!1), T(!1), I(0), R(0), z(0), ae(!1), W(!1), J.current = 0;
		let { autoPlay: t, muted: n, startAt: r } = ce.current, i = () => {
			let n = Number.isFinite(e.duration) ? e.duration : 0;
			R(n), D(!0), V(e.volume), U(e.muted), r > 0 && (e.currentTime = C(r, 0, n || r)), t && e.play().catch(() => T(!1)), le();
		}, a = () => {
			T(!0), Y.current.onPlay?.();
		}, o = () => {
			T(!1), Y.current.onTimeUpdate?.(e.currentTime, e.duration);
		}, s = () => {
			T(!1), Y.current.onEnded?.();
		}, c = () => le(), l = () => {
			K.current || I(e.currentTime);
		}, u = () => M(!0), d = () => M(!1);
		return e.addEventListener("loadedmetadata", i), e.addEventListener("play", a), e.addEventListener("pause", o), e.addEventListener("ended", s), e.addEventListener("progress", c), e.addEventListener("seeked", l), e.addEventListener("enterpictureinpicture", u), e.addEventListener("leavepictureinpicture", d), e.muted = n, P(w(e)), e.readyState >= 1 && i(), () => {
			e.removeEventListener("loadedmetadata", i), e.removeEventListener("play", a), e.removeEventListener("pause", o), e.removeEventListener("ended", s), e.removeEventListener("progress", c), e.removeEventListener("seeked", l), e.removeEventListener("enterpictureinpicture", u), e.removeEventListener("leavepictureinpicture", d);
		};
	}, [a, le]), t(() => {
		let e = b.current;
		e && (e.muted = c);
	}, [c]), {
		videoRef: b,
		containerRef: x,
		isPlaying: S,
		isReady: E,
		isScrubbing: O,
		isFullscreen: A,
		isTheater: te,
		isPip: ne,
		pipSupported: N,
		currentTime: F,
		duration: L,
		buffered: re,
		volume: B,
		isMuted: H,
		inIntro: u !== void 0 && !ie && F >= u.start && F < u.end,
		inOutro: d !== void 0 && !oe && F >= d.start && F < d.end,
		play: ue,
		pause: de,
		togglePlay: fe,
		seek: Z,
		seekBy: pe,
		changeVolume: me,
		toggleMute: he,
		toggleFullscreen: ge,
		toggleTheater: _e,
		togglePip: ve,
		beginScrub: ye,
		scrubTo: be,
		endScrub: xe,
		skipIntro: Se,
		skipOutro: Ce
	};
}
//#endregion
//#region src/core/surface.ts
var E = .34, D = .66;
function O(e) {
	return e <= E ? "back" : e >= D ? "forward" : "toggle";
}
function k(e) {
	let t = O(e);
	return t === "back" ? -10 : t === "forward" ? 10 : 0;
}
//#endregion
//#region src/hooks/useAutoHide.ts
var A = 3e3;
function ee(i) {
	let [a, o] = r(!1), s = n(null), c = e(() => {
		s.current !== null && (window.clearTimeout(s.current), s.current = null);
	}, []), l = e(() => {
		o(!1), c(), s.current = window.setTimeout(() => o(!0), A);
	}, [c]), u = e(() => {
		c(), i && o(!0);
	}, [c, i]);
	return t(() => c, [c]), {
		controlsVisible: !i || !a,
		wake: l,
		sleep: u
	};
}
//#endregion
//#region src/hooks/usePlayerKeyboard.ts
function te(t) {
	return e((e) => {
		if (!(e.target instanceof HTMLInputElement)) switch (e.key) {
			case " ":
			case "k":
				e.preventDefault(), t.togglePlay();
				break;
			case "ArrowRight":
				e.preventDefault(), t.seekBy(10);
				break;
			case "ArrowLeft":
				e.preventDefault(), t.seekBy(-10);
				break;
			case "ArrowUp":
				e.preventDefault(), t.changeVolume(t.volume + .05);
				break;
			case "ArrowDown":
				e.preventDefault(), t.changeVolume(t.volume - .05);
				break;
			case "m":
				t.toggleMute();
				break;
			case "f": t.toggleFullscreen();
		}
	}, [t]);
}
//#endregion
//#region src/hooks/useSurfaceCue.ts
var j = 550;
function ne() {
	let [i, a] = r(null), o = n(void 0), s = n(0), c = e((e) => {
		s.current += 1, a({
			cue: e,
			nonce: s.current
		}), window.clearTimeout(o.current), o.current = window.setTimeout(() => a(null), j);
	}, []);
	return t(() => () => window.clearTimeout(o.current), []), {
		cue: i?.cue ?? null,
		nonce: i?.nonce ?? 0,
		show: c
	};
}
//#endregion
//#region src/Player.tsx
var M = 300;
function N({ src: t, poster: r, type: o = "movie", title: c, description: u, intro: d, outro: f, features: p, view: m = "default", autoPlay: h = !1, autoAdvance: g = !0, muted: _ = !1, startAt: x = 0, className: C = "", onPrevious: w, onNext: E, onBack: D, onEnded: O, ...A }) {
	let j = S(o, p), N = e(() => {
		O?.(), g && j.episodeNavigation && E?.();
	}, [
		O,
		E,
		g,
		j.episodeNavigation
	]), P = T({
		src: t,
		view: m,
		autoPlay: h,
		muted: _,
		startAt: x,
		intro: d,
		outro: f,
		...A,
		onEnded: N
	}), { videoRef: F, containerRef: I, isPlaying: L, isReady: R, isTheater: re } = P, { togglePlay: z, seekBy: B } = P, { controlsVisible: V, wake: H, sleep: U } = ee(L), ie = te(P), { cue: ae, nonce: oe, show: W } = ne(), se = e((e) => {
		H(), ie(e);
	}, [ie, H]), G = e(() => {
		H(), z();
	}, [z, H]), K = n(0), q = e((e) => {
		H();
		let t = Date.now();
		if (t - K.current < M) {
			K.current = 0;
			return;
		}
		K.current = t;
		let n = e.currentTarget.getBoundingClientRect();
		if (n.width === 0) return G();
		let r = k((e.clientX - n.left) / n.width);
		if (r === 0) {
			z();
			return;
		}
		B(r), W(r < 0 ? "back10" : "forward10");
	}, [
		G,
		B,
		W,
		z,
		H
	]), J = e((e) => {
		H(), B(e === "back10" ? -10 : 10), W(e);
	}, [
		B,
		W,
		H
	]), Y = e(() => {
		D ? D() : window.history.back();
	}, [D]);
	return /* @__PURE__ */ a("div", {
		ref: I,
		className: `cp-root${C ? ` ${C}` : ""}`,
		tabIndex: 0,
		"data-chrome": V,
		"data-theater": re,
		onKeyDown: se,
		onMouseMove: H,
		onMouseLeave: U,
		children: [
			/* @__PURE__ */ i("video", {
				ref: F,
				className: "cp-video",
				src: t,
				poster: r,
				preload: "metadata",
				playsInline: !0,
				onClick: q
			}),
			/* @__PURE__ */ i("div", { className: "cp-dimmer" }),
			/* @__PURE__ */ i(b, { cue: ae }, oe),
			/* @__PURE__ */ i("div", {
				className: "cp-back",
				children: /* @__PURE__ */ i(l, {
					name: "back",
					label: "Go back",
					onClick: Y
				})
			}),
			!R && /* @__PURE__ */ i("div", {
				className: "cp-loading",
				children: /* @__PURE__ */ i("div", { className: "cp-spinner" })
			}),
			R && !L && /* @__PURE__ */ i("button", {
				className: "cp-bigplay",
				onClick: G,
				"aria-label": "Play",
				children: /* @__PURE__ */ i(s, { name: "play" })
			}),
			/* @__PURE__ */ i(v, {
				player: P,
				features: j,
				title: c,
				description: u,
				onPrevious: w,
				onNext: E,
				onTogglePlay: G,
				onSeekCue: J,
				intro: d,
				outro: f
			}),
			!V && /* @__PURE__ */ i(y, { player: P })
		]
	});
}
//#endregion
export { x as CONTENT_PRESETS, N as Player, d as formatTime, S as resolveFeatures, p as segmentStyle, k as surfaceSeekDelta, O as surfaceZone, T as usePlayer };

//# sourceMappingURL=centplayer.js.map