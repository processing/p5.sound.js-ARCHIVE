/*! p5.sound.js v0.0.5-alpha February 09, 2024 */
(function (f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f()
  } else if (typeof define === 'function' && define.amd) {
    define([], f)
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window
    } else if (typeof global !== 'undefined') {
      g = global
    } else if (typeof self !== 'undefined') {
      g = self
    } else {
      g = this
    }
    g.p5sound = f()
  }
}) (function () {
  var define,
  module,
  exports;
  return (function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = 'function' == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error('Cannot find module \'' + i + '\'');
            throw a.code = 'MODULE_NOT_FOUND',
            a
          }
          var p = n[i] = {
            exports: {
            }
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r)
          }, p, p.exports, r, e, n, t)
        }
        return n[i].exports
      }
      for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o
    }
    return r
  }) () ({
    1: [
      function (_dereq_, module, exports) {
        /*! For license information please see Tone.js.LICENSE.txt */
        !function (t, e) {
          'object' == typeof exports && 'object' == typeof module ? module.exports = e() : 'function' == typeof define && define.amd ? define([], e) : 'object' == typeof exports ? exports.Tone = e() : t.Tone = e();
        }('undefined' != typeof self ? self : this, () =>(() =>{
          var t = {
            382: function (t, e, s) {
              !function (t, e, s, n) {
                'use strict';
                function i(t) {
                  return t && 'object' == typeof t && 'default' in t ? t : {
                  default:
                    t
                  };
                }
                var o = i(e),
                r = i(s),
                a = i(n),
                c = function (t, e, s) {
                  return {
                    endTime: e,
                    insertTime: s,
                    type: 'exponentialRampToValue',
                    value: t
                  };
                },
                h = function (t, e, s) {
                  return {
                    endTime: e,
                    insertTime: s,
                    type: 'linearRampToValue',
                    value: t
                  };
                },
                l = function (t, e) {
                  return {
                    startTime: e,
                    type: 'setValue',
                    value: t
                  };
                },
                u = function (t, e, s) {
                  return {
                    duration: s,
                    startTime: e,
                    type: 'setValueCurve',
                    values: t
                  };
                },
                p = function (t, e, s) {
                  var n = s.startTime,
                  i = s.target,
                  o = s.timeConstant;
                  return i + (e - i) * Math.exp((n - t) / o);
                },
                d = function (t) {
                  return 'exponentialRampToValue' === t.type;
                },
                f = function (t) {
                  return 'linearRampToValue' === t.type;
                },
                _ = function (t) {
                  return d(t) || f(t);
                },
                m = function (t) {
                  return 'setValue' === t.type;
                },
                g = function (t) {
                  return 'setValueCurve' === t.type;
                },
                v = function t(e, s, n, i) {
                  var o = e[s];
                  return void 0 === o ? i : _(o) || m(o) ? o.value : g(o) ? o.values[o.values.length - 1] : p(n, t(e, s - 1, o.startTime, i), o);
                },
                y = function (t, e, s, n, i) {
                  return void 0 === s ? [
                    n.insertTime,
                    i
                  ] : _(s) ? [
                    s.endTime,
                    s.value
                  ] : m(s) ? [
                    s.startTime,
                    s.value
                  ] : g(s) ? [
                    s.startTime + s.duration,
                    s.values[s.values.length - 1]
                  ] : [
                    s.startTime,
                    v(t, e - 1, s.startTime, i)
                  ];
                },
                x = function (t) {
                  return 'cancelAndHold' === t.type;
                },
                w = function (t) {
                  return 'cancelScheduledValues' === t.type;
                },
                b = function (t) {
                  return x(t) || w(t) ? t.cancelTime : d(t) || f(t) ? t.endTime : t.startTime;
                },
                T = function (t, e, s, n) {
                  var i = n.endTime,
                  o = n.value;
                  return s === o ? o : 0 < s && 0 < o || s < 0 && o < 0 ? s * Math.pow(o / s, (t - e) / (i - e)) : 0;
                },
                S = function (t, e, s, n) {
                  return s + (t - e) / (n.endTime - e) * (n.value - s);
                },
                k = function (t, e) {
                  var s = e.duration,
                  n = e.startTime,
                  i = e.values;
                  return function (t, e) {
                    var s = Math.floor(e),
                    n = Math.ceil(e);
                    return s === n ? t[s] : (1 - (e - s)) * t[s] + (1 - (n - e)) * t[n];
                  }(i, (t - n) / s * (i.length - 1));
                },
                A = function (t) {
                  return 'setTarget' === t.type;
                },
                C = function (t) {
                  function e(t) {
                    r.default(this, e),
                    this._automationEvents = [
                    ],
                    this._currenTime = 0,
                    this._defaultValue = t;
                  }
                  return a.default(e, [
                    {
                      key: t,
                      value: function () {
                        return this._automationEvents[Symbol.iterator]();
                      }
                    },
                    {
                      key: 'add',
                      value: function (t) {
                        var e = b(t);
                        if (x(t) || w(t)) {
                          var s = this._automationEvents.findIndex(function (s) {
                            return w(t) && g(s) ? s.startTime + s.duration >= e : b(s) >= e;
                          }),
                          n = this._automationEvents[s];
                          if ( - 1 !== s && (this._automationEvents = this._automationEvents.slice(0, s)), x(t)) {
                            var i = this._automationEvents[this._automationEvents.length - 1];
                            if (void 0 !== n && _(n)) {
                              if (A(i)) throw new Error('The internal list is malformed.');
                              var o = g(i) ? i.startTime + i.duration : b(i),
                              r = g(i) ? i.values[i.values.length - 1] : i.value,
                              a = d(n) ? T(e, o, r, n) : S(e, o, r, n),
                              p = d(n) ? c(a, e, this._currenTime) : h(a, e, this._currenTime);
                              this._automationEvents.push(p);
                            }
                            void 0 !== i && A(i) && this._automationEvents.push(l(this.getValue(e), e)),
                            void 0 !== i && g(i) && i.startTime + i.duration > e && (this._automationEvents[this._automationEvents.length - 1] = u(new Float32Array([6,
                            7]), i.startTime, e - i.startTime));
                          }
                        } else {
                          var m = this._automationEvents.findIndex(function (t) {
                            return b(t) > e;
                          }),
                          v = - 1 === m ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[m - 1];
                          if (void 0 !== v && g(v) && b(v) + v.duration > e) return !1;
                          var y = d(t) ? c(t.value, t.endTime, this._currenTime) : f(t) ? h(t.value, e, this._currenTime) : t;
                          if ( - 1 === m) this._automationEvents.push(y);
                           else {
                            if (g(t) && e + t.duration > b(this._automationEvents[m])) return !1;
                            this._automationEvents.splice(m, 0, y);
                          }
                        }
                        return !0;
                      }
                    },
                    {
                      key: 'flush',
                      value: function (t) {
                        var e = this._automationEvents.findIndex(function (e) {
                          return b(e) > t;
                        });
                        if (e > 1) {
                          var s = this._automationEvents.slice(e - 1),
                          n = s[0];
                          A(n) && s.unshift(l(v(this._automationEvents, e - 2, n.startTime, this._defaultValue), n.startTime)),
                          this._automationEvents = s;
                        }
                      }
                    },
                    {
                      key: 'getValue',
                      value: function (t) {
                        if (0 === this._automationEvents.length) return this._defaultValue;
                        var e = this._automationEvents.findIndex(function (e) {
                          return b(e) > t;
                        }),
                        s = this._automationEvents[e],
                        n = ( - 1 === e ? this._automationEvents.length : e) - 1,
                        i = this._automationEvents[n];
                        if (void 0 !== i && A(i) && (void 0 === s || !_(s) || s.insertTime > t)) return p(t, v(this._automationEvents, n - 1, i.startTime, this._defaultValue), i);
                        if (void 0 !== i && m(i) && (void 0 === s || !_(s))) return i.value;
                        if (void 0 !== i && g(i) && (void 0 === s || !_(s) || i.startTime + i.duration > t)) return t < i.startTime + i.duration ? k(t, i) : i.values[i.values.length - 1];
                        if (void 0 !== i && _(i) && (void 0 === s || !_(s))) return i.value;
                        if (void 0 !== s && d(s)) {
                          var r = y(this._automationEvents, n, i, s, this._defaultValue),
                          a = o.default(r, 2),
                          c = a[0],
                          h = a[1];
                          return T(t, c, h, s);
                        }
                        if (void 0 !== s && f(s)) {
                          var l = y(this._automationEvents, n, i, s, this._defaultValue),
                          u = o.default(l, 2),
                          x = u[0],
                          w = u[1];
                          return S(t, x, w, s);
                        }
                        return this._defaultValue;
                      }
                    }
                  ]),
                  e;
                }(Symbol.iterator);
                t.AutomationEventList = C,
                t.createCancelAndHoldAutomationEvent = function (t) {
                  return {
                    cancelTime: t,
                    type: 'cancelAndHold'
                  };
                },
                t.createCancelScheduledValuesAutomationEvent = function (t) {
                  return {
                    cancelTime: t,
                    type: 'cancelScheduledValues'
                  };
                },
                t.createExponentialRampToValueAutomationEvent = function (t, e) {
                  return {
                    endTime: e,
                    type: 'exponentialRampToValue',
                    value: t
                  };
                },
                t.createLinearRampToValueAutomationEvent = function (t, e) {
                  return {
                    endTime: e,
                    type: 'linearRampToValue',
                    value: t
                  };
                },
                t.createSetTargetAutomationEvent = function (t, e, s) {
                  return {
                    startTime: e,
                    target: t,
                    timeConstant: s,
                    type: 'setTarget'
                  };
                },
                t.createSetValueAutomationEvent = l,
                t.createSetValueCurveAutomationEvent = u,
                Object.defineProperty(t, '__esModule', {
                  value: !0
                });
              }(e, s(424), s(690), s(728));
            },
            897: t=>{
              t.exports = function (t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var s = 0, n = new Array(e); s < e; s++) n[s] = t[s];
                return n;
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            },
            372: t=>{
              t.exports = function (t) {
                if (Array.isArray(t)) return t;
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            },
            690: t=>{
              t.exports = function (t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            },
            728: t=>{
              function e(t, e) {
                for (var s = 0; s < e.length; s++) {
                  var n = e[s];
                  n.enumerable = n.enumerable || !1,
                  n.configurable = !0,
                  'value' in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n);
                }
              }
              t.exports = function (t, s, n) {
                return s && e(t.prototype, s),
                n && e(t, n),
                Object.defineProperty(t, 'prototype', {
                  writable: !1
                }),
                t;
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            },
            872: t=>{
              t.exports = function (t, e) {
                var s = null == t ? null : 'undefined' != typeof Symbol && t[Symbol.iterator] || t['@@iterator'];
                if (null != s) {
                  var n,
                  i,
                  o = [
                  ],
                  r = !0,
                  a = !1;
                  try {
                    for (s = s.call(t); !(r = (n = s.next()).done) && (o.push(n.value), !e || o.length !== e); r = !0);
                  } catch (t) {
                    a = !0,
                    i = t;
                  } finally {
                    try {
                      r || null == s.return || s.return();
                    } finally {
                      if (a) throw i;
                    }
                  }
                  return o;
                }
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            },
            218: t=>{
              t.exports = function () {
                throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            },
            424: (t, e, s) =>{
              var n = s(372),
              i = s(872),
              o = s(116),
              r = s(218);
              t.exports = function (t, e) {
                return n(t) || i(t, e) || o(t, e) || r();
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            },
            116: (t, e, s) =>{
              var n = s(897);
              t.exports = function (t, e) {
                if (t) {
                  if ('string' == typeof t) return n(t, e);
                  var s = Object.prototype.toString.call(t).slice(8, - 1);
                  return 'Object' === s && t.constructor && (s = t.constructor.name),
                  'Map' === s || 'Set' === s ? Array.from(t) : 'Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? n(t, e) : void 0;
                }
              },
              t.exports.__esModule = !0,
              t.exports.default = t.exports;
            }
          },
          e = {
          };
          function s(n) {
            var i = e[n];
            if (void 0 !== i) return i.exports;
            var o = e[n] = {
              exports: {
              }
            };
            return t[n].call(o.exports, o, o.exports, s),
            o.exports;
          }
          s.d = (t, e) =>{
            for (var n in e) s.o(e, n) && !s.o(t, n) && Object.defineProperty(t, n, {
              enumerable: !0,
              get: e[n]
            });
          },
          s.o = (t, e) =>Object.prototype.hasOwnProperty.call(t, e),
          s.r = t=>{
            'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
              value: 'Module'
            }),
            Object.defineProperty(t, '__esModule', {
              value: !0
            });
          };
          var n = {
          };
          return (() =>{
            'use strict';
            s.r(n),
            s.d(n, {
              AMOscillator: () =>$o,
              AMSynth: () =>Cr,
              Abs: () =>pr,
              Add: () =>nr,
              AmplitudeEnvelope: () =>Sr,
              Analyser: () =>Xa,
              AudioToGain: () =>Xo,
              AutoFilter: () =>ua,
              AutoPanner: () =>da,
              AutoWah: () =>_a,
              BaseContext: () =>Ci,
              BiquadFilter: () =>Dr,
              BitCrusher: () =>ga,
              Buffer: () =>Dc,
              BufferSource: () =>Mc,
              Buffers: () =>Oc,
              Channel: () =>sc,
              Chebyshev: () =>ya,
              Chorus: () =>Sa,
              Clock: () =>vo,
              Compressor: () =>cc,
              Context: () =>Di,
              Convolver: () =>fc,
              CrossFade: () =>ca,
              DCMeter: () =>Ja,
              Delay: () =>yo,
              Destination: () =>yc,
              Distortion: () =>ka,
              Draw: () =>Sc,
              DuoSynth: () =>Rr,
              EQ3: () =>dc,
              Emitter: () =>Ai,
              Envelope: () =>xr,
              FFT: () =>Ha,
              FMOscillator: () =>Ho,
              FMSynth: () =>qr,
              FatOscillator: () =>Ko,
              FeedbackCombFilter: () =>Br,
              FeedbackDelay: () =>Ca,
              Filter: () =>Or,
              Follower: () =>fa,
              Freeverb: () =>Ra,
              Frequency: () =>Ji,
              FrequencyClass: () =>Yi,
              FrequencyEnvelope: () =>Mr,
              FrequencyShifter: () =>Oa,
              Gain: () =>ho,
              GainToAudio: () =>dr,
              Gate: () =>hc,
              GrainPlayer: () =>ur,
              GreaterThan: () =>gr,
              GreaterThanZero: () =>mr,
              IntervalTimeline: () =>Co,
              JCReverb: () =>Va,
              LFO: () =>rr,
              Limiter: () =>lc,
              Listener: () =>bc,
              Loop: () =>$r,
              LowpassCombFilter: () =>Gr,
              Master: () =>xc,
              MembraneSynth: () =>Vr,
              Merge: () =>wa,
              MetalSynth: () =>Ir,
              Meter: () =>$a,
              MidSideCompressor: () =>uc,
              MidSideMerge: () =>Ba,
              MidSideSplit: () =>Wa,
              Midi: () =>To,
              MidiClass: () =>bo,
              Mono: () =>nc,
              MonoSynth: () =>Er,
              MultibandCompressor: () =>pc,
              MultibandSplit: () =>ic,
              Multiply: () =>Yo,
              Negate: () =>fr,
              Noise: () =>Lo,
              NoiseSynth: () =>Nr,
              Offline: () =>xo,
              OfflineContext: () =>qi,
              OmniOscillator: () =>sr,
              OnePoleFilter: () =>Ur,
              Oscillator: () =>Zo,
              PWMOscillator: () =>tr,
              PanVol: () =>ec,
              Panner: () =>pa,
              Panner3D: () =>rc,
              Param: () =>no,
              Part: () =>Hr,
              Pattern: () =>ra,
              Phaser: () =>La,
              PingPongDelay: () =>Pa,
              PitchShift: () =>ja,
              Player: () =>hr,
              Players: () =>lr,
              PluckSynth: () =>Qr,
              PolySynth: () =>Zr,
              Pow: () =>Fo,
              PulseOscillator: () =>Jo,
              Recorder: () =>ac,
              Reverb: () =>za,
              Sampler: () =>Xr,
              Scale: () =>ir,
              ScaleExp: () =>vr,
              Sequence: () =>aa,
              Signal: () =>po,
              Solo: () =>tc,
              Split: () =>xa,
              StateTimeline: () =>so,
              StereoWidener: () =>Ga,
              Subtract: () =>_r,
              SyncedSignal: () =>yr,
              Synth: () =>kr,
              Ticks: () =>ko,
              TicksClass: () =>So,
              Time: () =>Xi,
              TimeClass: () =>Zi,
              Timeline: () =>wi,
              ToneAudioBuffer: () =>Ri,
              ToneAudioBuffers: () =>wo,
              ToneAudioNode: () =>io,
              ToneBufferSource: () =>jo,
              ToneEvent: () =>Yr,
              ToneOscillatorNode: () =>Qo,
              Transport: () =>gc,
              TransportTime: () =>to,
              TransportTimeClass: () =>Ki,
              Tremolo: () =>Qa,
              Unit: () =>e,
              UserMedia: () =>Uo,
              Vibrato: () =>Za,
              Volume: () =>Oo,
              WaveShaper: () =>qo,
              Waveform: () =>Ka,
              Zero: () =>or,
              connect: () =>ro,
              connectSeries: () =>oo,
              connectSignal: () =>fo,
              context: () =>Ac,
              dbToGain: () =>ji,
              debug: () =>t,
              defaultArg: () =>pi,
              disconnect: () =>ao,
              fanIn: () =>co,
              ftom: () =>Bi,
              gainToDb: () =>Li,
              getContext: () =>Vi,
              getDestination: () =>wc,
              getDraw: () =>kc,
              getListener: () =>Tc,
              getTransport: () =>vc,
              immediate: () =>mc,
              intervalToFrequencyRatio: () =>zi,
              isArray: () =>Ln,
              isBoolean: () =>jn,
              isDefined: () =>In,
              isFunction: () =>Vn,
              isNote: () =>Wn,
              isNumber: () =>Nn,
              isObject: () =>Pn,
              isString: () =>zn,
              isUndef: () =>Fn,
              loaded: () =>Cc,
              mtof: () =>Gi,
              now: () =>_c,
              optionsFromArguments: () =>ui,
              setContext: () =>Ni,
              start: () =>Pi,
              supported: () =>qn,
              version: () =>i
            });
            var t = {
            };
            s.r(t),
            s.d(t, {
              assert: () =>Bn,
              assertContextRunning: () =>Gn,
              assertRange: () =>Un,
              assertUsedScheduleTime: () =>Yn,
              enterScheduledCallback: () =>Xn,
              log: () =>Jn,
              setLogger: () =>Hn,
              warn: () =>Kn
            });
            var e = {
            };
            s.r(e);
            const i = '14.8.49';
            var o = s(382);
            const r = new WeakSet(),
            a = new WeakMap(),
            c = new WeakMap(),
            h = new WeakMap(),
            l = new WeakMap(),
            u = new WeakMap(),
            p = new WeakMap(),
            d = new WeakMap(),
            f = new WeakMap(),
            _ = new WeakMap(),
            m = {
              construct: () =>m
            },
            g = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,
            v = (t, e) =>{
              const s = [
              ];
              let n = t.replace(/^[\s]+/, ''),
              i = n.match(g);
              for (; null !== i; ) {
                const t = i[1].slice(1, - 1),
                o = i[0].replace(/([\s]+)?;?$/, '').replace(t, new URL(t, e).toString());
                s.push(o),
                n = n.slice(i[0].length).replace(/^[\s]+/, ''),
                i = n.match(g);
              }
              return [s.join(';'),
              n];
            },
            y = t=>{
              if (void 0 !== t && !Array.isArray(t)) throw new TypeError('The parameterDescriptors property of given value for processorCtor is not an array.');
            },
            x = t=>{
              if (!(t=>{
                try {
                  new new Proxy(t, m) ();
                } catch {
                  return !1;
                }
                return !0;
              }) (t)) throw new TypeError('The given value for processorCtor should be a constructor.');
              if (null === t.prototype || 'object' != typeof t.prototype) throw new TypeError('The given value for processorCtor should have a prototype.');
            },
            w = (t, e) =>{
              const s = t.get(e);
              if (void 0 === s) throw new Error('A value with the given key could not be found.');
              return s;
            },
            b = (t, e) =>{
              const s = Array.from(t).filter(e);
              if (s.length > 1) throw Error('More than one element was found.');
              if (0 === s.length) throw Error('No element was found.');
              const [n] = s;
              return t.delete(n),
              n;
            },
            T = (t, e, s, n) =>{
              const i = w(t, e),
              o = b(i, t=>t[0] === s && t[1] === n);
              return 0 === i.size && t.delete(e),
              o;
            },
            S = t=>w(p, t),
            k = t=>{
              if (r.has(t)) throw new Error('The AudioNode is already stored.');
              r.add(t),
              S(t).forEach(t=>t(!0));
            },
            A = t=>'port' in t,
            C = t=>{
              if (!r.has(t)) throw new Error('The AudioNode is not stored.');
              r.delete(t),
              S(t).forEach(t=>t(!1));
            },
            D = (t, e) =>{
              !A(t) && e.every(t=>0 === t.size) && C(t);
            },
            O = {
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              fftSize: 2048,
              maxDecibels: - 30,
              minDecibels: - 100,
              smoothingTimeConstant: 0.8
            },
            M = (t, e) =>t.context === e,
            E = t=>{
              try {
                t.copyToChannel(new Float32Array(1), 0, - 1);
              } catch {
                return !1;
              }
              return !0;
            },
            R = () =>new DOMException('', 'IndexSizeError'),
            q = t=>{
              var e;
              t.getChannelData = (e = t.getChannelData, s=>{
                try {
                  return e.call(t, s);
                } catch (t) {
                  if (12 === t.code) throw R();
                  throw t;
                }
              });
            },
            F = {
              numberOfChannels: 1
            },
            I = - 3.4028234663852886e+38,
            V = - I,
            N = t=>r.has(t),
            P = {
              buffer: null,
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              loop: !1,
              loopEnd: 0,
              loopStart: 0,
              playbackRate: 1
            },
            j = t=>w(a, t),
            L = t=>w(h, t),
            z = (t, e) =>{
              const {
                activeInputs: s
              }
              = j(t);
              s.forEach(s=>s.forEach(([s]) =>{
                e.includes(t) || z(s, [
                  ...e,
                  t
                ]);
              }));
              const n = (t=>'playbackRate' in t) (t) ? [
                t.playbackRate
              ] : A(t) ? Array.from(t.parameters.values()) : (t=>'frequency' in t && 'gain' in t) (t) ? [
                t.Q,
                t.detune,
                t.frequency,
                t.gain
              ] : (t=>'offset' in t) (t) ? [
                t.offset
              ] : (t=>!('frequency' in t) && 'gain' in t) (t) ? [
                t.gain
              ] : (t=>'detune' in t && 'frequency' in t) (t) ? [
                t.detune,
                t.frequency
              ] : (t=>'pan' in t) (t) ? [
                t.pan
              ] : [
              ];
              for (const t of n) {
                const s = L(t);
                void 0 !== s && s.activeInputs.forEach(([t]) =>z(t, e));
              }
              N(t) && C(t);
            },
            W = t=>{
              z(t.destination, [
              ]);
            },
            B = t=>'context' in t,
            U = t=>B(t[0]),
            G = (t, e, s, n) =>{
              for (const e of t) if (s(e)) {
                if (n) return !1;
                throw Error('The set contains at least one similar element.');
              }
              return t.add(e),
              !0;
            },
            Q = (t, e, [
              s,
              n
            ], i) =>{
              G(t, [
                e,
                s,
                n
              ], t=>t[0] === e && t[1] === s, i);
            },
            Z = (t, [
              e,
              s,
              n
            ], i) =>{
              const o = t.get(e);
              void 0 === o ? t.set(e, new Set([[s,
              n]])) : G(o, [
                s,
                n
              ], t=>t[0] === s, i);
            },
            X = t=>'inputs' in t,
            Y = (t, e, s, n) =>{
              if (X(e)) {
                const i = e.inputs[n];
                return t.connect(i, s, 0),
                [
                  i,
                  s,
                  0
                ];
              }
              return t.connect(e, s, n),
              [
                e,
                s,
                n
              ];
            },
            $ = (t, e, s) =>{
              for (const n of t) if (n[0] === e && n[1] === s) return t.delete(n),
              n;
              return null;
            },
            H = (t, e) =>{
              if (!S(t).delete(e)) throw new Error('Missing the expected event listener.');
            },
            J = (t, e, s) =>{
              const n = w(t, e),
              i = b(n, t=>t[0] === s);
              return 0 === n.size && t.delete(e),
              i;
            },
            K = (t, e, s, n) =>{
              X(e) ? t.disconnect(e.inputs[n], s, 0) : t.disconnect(e, s, n);
            },
            tt = t=>w(c, t),
            et = t=>w(l, t),
            st = t=>d.has(t),
            nt = t=>!r.has(t),
            it = (t, e) =>new Promise(s=>{
              if (null !== e) s(!0);
               else {
                const e = t.createScriptProcessor(256, 1, 1),
                n = t.createGain(),
                i = t.createBuffer(1, 2, 44100),
                o = i.getChannelData(0);
                o[0] = 1,
                o[1] = 1;
                const r = t.createBufferSource();
                r.buffer = i,
                r.loop = !0,
                r.connect(e).connect(t.destination),
                r.connect(n),
                r.disconnect(n),
                e.onaudioprocess = n=>{
                  const i = n.inputBuffer.getChannelData(0);
                  Array.prototype.some.call(i, t=>1 === t) ? s(!0) : s(!1),
                  r.stop(),
                  e.onaudioprocess = null,
                  r.disconnect(e),
                  e.disconnect(t.destination);
                },
                r.start();
              }
            }),
            ot = (t, e) =>{
              const s = new Map();
              for (const e of t) for (const t of e) {
                const e = s.get(t);
                s.set(t, void 0 === e ? 1 : e + 1);
              }
              s.forEach((t, s) =>e(s, t));
            },
            rt = t=>'context' in t,
            at = t=>{
              const e = new Map();
              t.connect = (t=>(s, n = 0, i = 0) =>{
                const o = rt(s) ? t(s, n, i) : t(s, n),
                r = e.get(s);
                return void 0 === r ? e.set(s, [
                  {
                    input: i,
                    output: n
                  }
                ]) : r.every(t=>t.input !== i || t.output !== n) && r.push({
                  input: i,
                  output: n
                }),
                o;
              }) (t.connect.bind(t)),
              t.disconnect = (s=>(n, i, o) =>{
                if (s.apply(t), void 0 === n) e.clear();
                 else if ('number' == typeof n) for (const [t,
                s]of e) {
                  const i = s.filter(t=>t.output !== n);
                  0 === i.length ? e.delete(t) : e.set(t, i);
                } else if (e.has(n)) if (void 0 === i) e.delete(n);
                 else {
                  const t = e.get(n);
                  if (void 0 !== t) {
                    const s = t.filter(t=>t.output !== i && (t.input !== o || void 0 === o));
                    0 === s.length ? e.delete(n) : e.set(n, s);
                  }
                }
                for (const [s,
                n]of e) n.forEach(e=>{
                  rt(s) ? t.connect(s, e.output, e.input) : t.connect(s, e.output);
                });
              }) (t.disconnect);
            },
            ct = (t, e, s, n, i) =>{
              const [o,
              r] = ((t, e, s, n) =>{
                const {
                  activeInputs: i,
                  passiveInputs: o
                }
                = j(e),
                r = $(i[n], t, s);
                return null === r ? [
                  T(o, t, s, n) [2],
                  !1
                ] : [
                  r[2],
                  !0
                ];
              }) (t, s, n, i);
              if (null !== o && (H(t, o), !r || e || st(t) || K(tt(t), tt(s), n, i)), N(s)) {
                const {
                  activeInputs: t
                }
                = j(s);
                D(s, t);
              }
            },
            ht = (t, e, s, n) =>{
              const [i,
              o] = ((t, e, s) =>{
                const {
                  activeInputs: n,
                  passiveInputs: i
                }
                = L(e),
                o = $(n, t, s);
                return null === o ? [
                  J(i, t, s) [1],
                  !1
                ] : [
                  o[2],
                  !0
                ];
              }) (t, s, n);
              null !== i && (H(t, i), !o || e || st(t) || tt(t).disconnect(et(s), n));
            };
            class lt {
              constructor(t) {
                this._map = new Map(t);
              }
              get size() {
                return this._map.size;
              }
              entries() {
                return this._map.entries();
              }
              forEach(t, e = null) {
                return this._map.forEach((s, n) =>t.call(e, s, n, this));
              }
              get(t) {
                return this._map.get(t);
              }
              has(t) {
                return this._map.has(t);
              }
              keys() {
                return this._map.keys();
              }
              values() {
                return this._map.values();
              }
            }
            const ut = {
              channelCount: 2,
              channelCountMode: 'explicit',
              channelInterpretation: 'speakers',
              numberOfInputs: 1,
              numberOfOutputs: 1,
              parameterData: {
              },
              processorOptions: {
              }
            };
            function pt(t, e, s, n, i) {
              if ('function' == typeof t.copyFromChannel) 0 === e[s].byteLength && (e[s] = new Float32Array(128)),
              t.copyFromChannel(e[s], n, i);
               else {
                const o = t.getChannelData(n);
                if (0 === e[s].byteLength) e[s] = o.slice(i, i + 128);
                 else {
                  const t = new Float32Array(o.buffer, i * Float32Array.BYTES_PER_ELEMENT, 128);
                  e[s].set(t);
                }
              }
            }
            const dt = (t, e, s, n, i) =>{
              'function' == typeof t.copyToChannel ? 0 !== e[s].byteLength && t.copyToChannel(e[s], n, i) : 0 !== e[s].byteLength && t.getChannelData(n).set(e[s], i);
            },
            ft = (t, e) =>{
              const s = [
              ];
              for (let n = 0; n < t; n += 1) {
                const t = [
                ],
                i = 'number' == typeof e ? e : e[n];
                for (let e = 0; e < i; e += 1) t.push(new Float32Array(128));
                s.push(t);
              }
              return s;
            },
            _t = async(t, e, s, n, i, o, r) =>{
              const a = null === e ? 128 * Math.ceil(t.context.length / 128) : e.length,
              c = n.channelCount * n.numberOfInputs,
              h = i.reduce((t, e) =>t + e, 0),
              l = 0 === h ? null : s.createBuffer(h, a, s.sampleRate);
              if (void 0 === o) throw new Error('Missing the processor constructor.');
              const u = j(t),
              p = await((t, e) =>{
                const s = w(_, t),
                n = tt(e);
                return w(s, n);
              }) (s, t),
              d = ft(n.numberOfInputs, n.channelCount),
              f = ft(n.numberOfOutputs, i),
              m = Array.from(t.parameters.keys()).reduce((t, e) =>({
                ...t,
                [
                  e
                ]: new Float32Array(128)
              }), {
              });
              for (let h = 0; h < a; h += 128) {
                if (n.numberOfInputs > 0 && null !== e) for (let t = 0; t < n.numberOfInputs; t += 1) for (let s = 0; s < n.channelCount; s += 1) pt(e, d[t], s, s, h);
                void 0 !== o.parameterDescriptors && null !== e && o.parameterDescriptors.forEach(({
                  name: t
                }, s) =>{
                  pt(e, m, t, c + s, h);
                });
                for (let t = 0; t < n.numberOfInputs; t += 1) for (let e = 0; e < i[t]; e += 1) 0 === f[t][e].byteLength && (f[t][e] = new Float32Array(128));
                try {
                  const t = d.map((t, e) =>0 === u.activeInputs[e].size ? [
                  ] : t),
                  e = r(h / s.sampleRate, s.sampleRate, () =>p.process(t, f, m));
                  if (null !== l) for (let t = 0, e = 0; t < n.numberOfOutputs; t += 1) {
                    for (let s = 0; s < i[t]; s += 1) dt(l, f[t], s, e + s, h);
                    e += i[t];
                  }
                  if (!e) break;
                } catch (e) {
                  t.dispatchEvent(new ErrorEvent('processorerror', {
                    colno: e.colno,
                    filename: e.filename,
                    lineno: e.lineno,
                    message: e.message
                  }));
                  break;
                }
              }
              return l;
            },
            mt = {
              Q: 1,
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              detune: 0,
              frequency: 350,
              gain: 0,
              type: 'lowpass'
            },
            gt = {
              channelCount: 1,
              channelCountMode: 'explicit',
              channelInterpretation: 'speakers',
              numberOfInputs: 6
            },
            vt = {
              channelCount: 6,
              channelCountMode: 'explicit',
              channelInterpretation: 'discrete',
              numberOfOutputs: 6
            },
            yt = {
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              offset: 1
            },
            xt = {
              buffer: null,
              channelCount: 2,
              channelCountMode: 'clamped-max',
              channelInterpretation: 'speakers',
              disableNormalization: !1
            },
            wt = t=>{
              const {
                port1: e,
                port2: s
              }
              = new MessageChannel();
              return new Promise(n=>{
                const i = () =>{
                  s.onmessage = null,
                  e.close(),
                  s.close(),
                  n();
                };
                s.onmessage = () =>i();
                try {
                  e.postMessage(t, [
                    t
                  ]);
                } finally {
                  i();
                }
              });
            },
            bt = {
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              delayTime: 0,
              maxDelayTime: 1
            },
            Tt = (t, e, s) =>{
              const n = e[s];
              if (void 0 === n) throw t();
              return n;
            },
            St = {
              attack: 0.003,
              channelCount: 2,
              channelCountMode: 'clamped-max',
              channelInterpretation: 'speakers',
              knee: 30,
              ratio: 12,
              release: 0.25,
              threshold: - 24
            },
            kt = {
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              gain: 1
            },
            At = () =>new DOMException('', 'InvalidStateError'),
            Ct = () =>new DOMException('', 'InvalidAccessError'),
            Dt = {
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers'
            },
            Ot = (t, e, s, n, i, o, r, a, c, h, l) =>{
              const u = h.length;
              let p = a;
              for (let a = 0; a < u; a += 1) {
                let u = s[0] * h[a];
                for (let e = 1; e < i; e += 1) {
                  const n = p - e & c - 1;
                  u += s[e] * o[n],
                  u -= t[e] * r[n];
                }
                for (let t = i; t < n; t += 1) u += s[t] * o[p - t & c - 1];
                for (let s = i; s < e; s += 1) u -= t[s] * r[p - s & c - 1];
                o[p] = h[a],
                r[p] = u,
                p = p + 1 & c - 1,
                l[a] = u;
              }
              return p;
            },
            Mt = {
              channelCount: 2,
              channelCountMode: 'explicit',
              channelInterpretation: 'speakers'
            },
            Et = t=>{
              const e = new Uint32Array([1179011410,
              40,
              1163280727,
              544501094,
              16,
              131073,
              44100,
              176400,
              1048580,
              1635017060,
              4,
              0]);
              try {
                const s = t.decodeAudioData(e.buffer, () =>{
                });
                return void 0 !== s && (s.catch(() =>{
                }), !0);
              } catch {
              }
              return !1;
            },
            Rt = (t, e, s) =>{
              const n = e[s];
              void 0 !== n && n !== t[s] && (t[s] = n);
            },
            qt = (t, e) =>{
              Rt(t, e, 'channelCount'),
              Rt(t, e, 'channelCountMode'),
              Rt(t, e, 'channelInterpretation');
            },
            Ft = t=>'function' == typeof t.getFloatTimeDomainData,
            It = (t, e, s) =>{
              const n = e[s];
              void 0 !== n && n !== t[s].value && (t[s].value = n);
            },
            Vt = t=>{
              t.start = (e=>(s = 0, n = 0, i) =>{
                if ('number' == typeof i && i < 0 || n < 0 || s < 0) throw new RangeError('The parameters can\'t be negative.');
                e.call(t, s, n, i);
              }) (t.start);
            },
            Nt = t=>{
              var e;
              t.stop = (e = t.stop, (s = 0) =>{
                if (s < 0) throw new RangeError('The parameter can\'t be negative.');
                e.call(t, s);
              });
            },
            Pt = (t, e) =>null === t ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(t * e))))),
            jt = (t, e) =>{
              const s = t.createBiquadFilter();
              return qt(s, e),
              It(s, e, 'Q'),
              It(s, e, 'detune'),
              It(s, e, 'frequency'),
              It(s, e, 'gain'),
              Rt(s, e, 'type'),
              s;
            },
            Lt = (t, e) =>{
              const s = t.createChannelSplitter(e.numberOfOutputs);
              return qt(s, e),
              (t=>{
                const e = t.numberOfOutputs;
                Object.defineProperty(t, 'channelCount', {
                  get: () =>e,
                  set: t=>{
                    if (t !== e) throw At();
                  }
                }),
                Object.defineProperty(t, 'channelCountMode', {
                  get: () =>'explicit',
                  set: t=>{
                    if ('explicit' !== t) throw At();
                  }
                }),
                Object.defineProperty(t, 'channelInterpretation', {
                  get: () =>'discrete',
                  set: t=>{
                    if ('discrete' !== t) throw At();
                  }
                });
              }) (s),
              s;
            },
            zt = (t, e) =>(t.connect = e.connect.bind(e), t.disconnect = e.disconnect.bind(e), t),
            Wt = (t, e) =>{
              const s = t.createDelay(e.maxDelayTime);
              return qt(s, e),
              It(s, e, 'delayTime'),
              s;
            },
            Bt = (t, e) =>{
              const s = t.createGain();
              return qt(s, e),
              It(s, e, 'gain'),
              s;
            };
            function Ut(t, e) {
              const s = e[0] * e[0] + e[1] * e[1];
              return [(t[0] * e[0] + t[1] * e[1]) / s,
              (t[1] * e[0] - t[0] * e[1]) / s];
            }
            function Gt(t, e) {
              let s = [
                0,
                0
              ];
              for (let o = t.length - 1; o >= 0; o -= 1) i = e,
              s = [
                (n = s) [0] * i[0] - n[1] * i[1],
                n[0] * i[1] + n[1] * i[0]
              ],
              s[0] += t[o];
              var n,
              i;
              return s;
            }
            const Qt = (t, e, s, n) =>t.createScriptProcessor(e, s, n),
            Zt = () =>new DOMException('', 'NotSupportedError'),
            Xt = {
              numberOfChannels: 1
            },
            Yt = {
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              detune: 0,
              frequency: 440,
              periodicWave: void 0,
              type: 'sine'
            },
            $t = {
              channelCount: 2,
              channelCountMode: 'clamped-max',
              channelInterpretation: 'speakers',
              coneInnerAngle: 360,
              coneOuterAngle: 360,
              coneOuterGain: 0,
              distanceModel: 'inverse',
              maxDistance: 10000,
              orientationX: 1,
              orientationY: 0,
              orientationZ: 0,
              panningModel: 'equalpower',
              positionX: 0,
              positionY: 0,
              positionZ: 0,
              refDistance: 1,
              rolloffFactor: 1
            },
            Ht = {
              disableNormalization: !1
            },
            Jt = {
              channelCount: 2,
              channelCountMode: 'explicit',
              channelInterpretation: 'speakers',
              pan: 0
            },
            Kt = () =>new DOMException('', 'UnknownError'),
            te = {
              channelCount: 2,
              channelCountMode: 'max',
              channelInterpretation: 'speakers',
              curve: null,
              oversample: 'none'
            },
            ee = (t, e, s) =>void 0 === t.copyFromChannel ? t.getChannelData(s) [0] : (t.copyFromChannel(e, s), e[0]),
            se = t=>{
              if (null === t) return !1;
              const e = t.length;
              return e % 2 != 0 ? 0 !== t[Math.floor(e / 2)] : t[e / 2 - 1] + t[e / 2] !== 0;
            },
            ne = (t, e, s, n) =>{
              let i = t;
              for (; !i.hasOwnProperty(e); ) i = Object.getPrototypeOf(i);
              const {
                get: o,
                set: r
              }
              = Object.getOwnPropertyDescriptor(i, e);
              Object.defineProperty(t, e, {
                get: s(o),
                set: n(r)
              });
            },
            ie = (t, e, s) =>{
              try {
                t.setValueAtTime(e, s);
              } catch (n) {
                if (9 !== n.code) throw n;
                ie(t, e, s + 1e-7);
              }
            },
            oe = t=>{
              const e = t.createOscillator();
              try {
                e.start( - 1);
              } catch (t) {
                return t instanceof RangeError;
              }
              return !1;
            },
            re = t=>{
              const e = t.createBuffer(1, 1, 44100),
              s = t.createBufferSource();
              s.buffer = e,
              s.start(),
              s.stop();
              try {
                return s.stop(),
                !0;
              } catch {
                return !1;
              }
            },
            ae = t=>{
              const e = t.createOscillator();
              try {
                e.stop( - 1);
              } catch (t) {
                return t instanceof RangeError;
              }
              return !1;
            },
            ce = () =>{
              try {
                new DOMException();
              } catch {
                return !1;
              }
              return !0;
            },
            he = () =>new Promise(t=>{
              const e = new ArrayBuffer(0),
              {
                port1: s,
                port2: n
              }
              = new MessageChannel();
              s.onmessage = ({
                data: e
              }) =>t(null !== e),
              n.postMessage(e, [
                e
              ]);
            }),
            le = (t, e) =>{
              const s = e.createGain();
              t.connect(s);
              const n = (e=>() =>{
                e.call(t, s),
                t.removeEventListener('ended', n);
              }) (t.disconnect);
              t.addEventListener('ended', n),
              zt(t, s),
              t.stop = (e=>{
                let n = !1;
                return (i = 0) =>{
                  if (n) try {
                    e.call(t, i);
                  } catch {
                    s.gain.setValueAtTime(0, i);
                  } else e.call(t, i),
                  n = !0;
                };
              }) (t.stop);
            },
            ue = (t, e) =>s=>{
              const n = {
                value: t
              };
              return Object.defineProperties(s, {
                currentTarget: n,
                target: n
              }),
              'function' == typeof e ? e.call(t, s) : e.handleEvent.call(t, s);
            },
            pe = (t=>(e, s, [
              n,
              i,
              o
            ], r) =>{
              t(e[i], [
                s,
                n,
                o
              ], t=>t[0] === s && t[1] === n, r);
            }) (G),
            de = (t=>(e, s, [
              n,
              i,
              o
            ], r) =>{
              const a = e.get(n);
              void 0 === a ? e.set(n, new Set([[i,
              s,
              o]])) : t(a, [
                i,
                s,
                o
              ], t=>t[0] === i && t[1] === s, r);
            }) (G),
            fe = (t=>(e, s, n, i) =>t(e[i], t=>t[0] === s && t[1] === n)) (b),
            _e = new WeakMap(),
            me = (t=>e=>{
              var s;
              return null !== (s = t.get(e)) && void 0 !== s ? s : 0;
            }) (_e),
            ge = (ve = new Map(), ye = new WeakMap(), (t, e) =>{
              const s = ye.get(t);
              if (void 0 !== s) return s;
              const n = ve.get(t);
              if (void 0 !== n) return n;
              try {
                const s = e();
                return s instanceof Promise ? (ve.set(t, s), s.catch(() =>!1).then(e=>(ve.delete(t), ye.set(t, e), e))) : (ye.set(t, s), s);
              } catch {
                return ye.set(t, !1),
                !1;
              }
            });
            var ve,
            ye;
            const xe = 'undefined' == typeof window ? null : window,
            we = ((t, e) =>(s, n) =>{
              const i = s.createAnalyser();
              if (qt(i, n), !(n.maxDecibels > n.minDecibels)) throw e();
              return Rt(i, n, 'fftSize'),
              Rt(i, n, 'maxDecibels'),
              Rt(i, n, 'minDecibels'),
              Rt(i, n, 'smoothingTimeConstant'),
              t(Ft, () =>Ft(i)) || (t=>{
                t.getFloatTimeDomainData = e=>{
                  const s = new Uint8Array(e.length);
                  t.getByteTimeDomainData(s);
                  const n = Math.max(s.length, t.fftSize);
                  for (let t = 0; t < n; t += 1) e[t] = 0.0078125 * (s[t] - 128);
                  return e;
                };
              }) (i),
              i;
            }) (ge, R),
            be = (t=>e=>{
              const s = t(e);
              if (null === s.renderer) throw new Error('Missing the renderer of the given AudioNode in the audio graph.');
              return s.renderer;
            }) (j),
            Te = ((t, e, s) =>async(n, i, o) =>{
              const r = t(n);
              await Promise.all(r.activeInputs.map((t, r) =>Array.from(t).map(async([t,
              a]) =>{
                const c = e(t),
                h = await c.render(t, i),
                l = n.context.destination;
                s(t) || n === l && s(n) || h.connect(o, a, r);
              })).reduce((t, e) =>[...t,
              ...e], [
              ]));
            }) (j, be, st),
            Se = ((t, e, s) =>() =>{
              const n = new WeakMap();
              return {
                render(i, o) {
                  const r = n.get(o);
                  return void 0 !== r ? Promise.resolve(r) : (async(i, o) =>{
                    let r = e(i);
                    if (!M(r, o)) {
                      const e = {
                        channelCount: r.channelCount,
                        channelCountMode: r.channelCountMode,
                        channelInterpretation: r.channelInterpretation,
                        fftSize: r.fftSize,
                        maxDecibels: r.maxDecibels,
                        minDecibels: r.minDecibels,
                        smoothingTimeConstant: r.smoothingTimeConstant
                      };
                      r = t(o, e);
                    }
                    return n.set(o, r),
                    await s(i, o, r),
                    r;
                  }) (i, o);
                }
              };
            }) (we, tt, Te),
            ke = (Ae = u, t=>{
              const e = Ae.get(t);
              if (void 0 === e) throw At();
              return e;
            });
            var Ae;
            const Ce = (t=>null === t ? null : t.hasOwnProperty('OfflineAudioContext') ? t.OfflineAudioContext : t.hasOwnProperty('webkitOfflineAudioContext') ? t.webkitOfflineAudioContext : null) (xe),
            De = (t=>e=>null !== t && e instanceof t) (Ce),
            Oe = new WeakMap(),
            Me = (t=>class {
              constructor(t) {
                this._nativeEventTarget = t,
                this._listeners = new WeakMap();
              }
              addEventListener(e, s, n) {
                if (null !== s) {
                  let i = this._listeners.get(s);
                  void 0 === i && (i = t(this, s), 'function' == typeof s && this._listeners.set(s, i)),
                  this._nativeEventTarget.addEventListener(e, i, n);
                }
              }
              dispatchEvent(t) {
                return this._nativeEventTarget.dispatchEvent(t);
              }
              removeEventListener(t, e, s) {
                const n = null === e ? void 0 : this._listeners.get(e);
                this._nativeEventTarget.removeEventListener(t, void 0 === n ? null : n, s);
              }
            }) (ue),
            Ee = (t=>null === t ? null : t.hasOwnProperty('AudioContext') ? t.AudioContext : t.hasOwnProperty('webkitAudioContext') ? t.webkitAudioContext : null) (xe),
            Re = (t=>e=>null !== t && e instanceof t) (Ee),
            qe = (t=>e=>null !== t && 'function' == typeof t.AudioNode && e instanceof t.AudioNode) (xe),
            Fe = (t=>e=>null !== t && 'function' == typeof t.AudioParam && e instanceof t.AudioParam) (xe),
            Ie = (t=>null === t ? null : t.hasOwnProperty('AudioWorkletNode') ? t.AudioWorkletNode : null) (xe),
            Ve = ((t, e, s, n, i, o, r, a, h, l, u, d, f, _, m, g) =>class extends l {
              constructor(e, n, i, o) {
                super (i),
                this._context = e,
                this._nativeAudioNode = i;
                const r = u(e);
                d(r) && !0 !== s(it, () =>it(r, g)) && at(i),
                c.set(this, i),
                p.set(this, new Set()),
                'closed' !== e.state && n && k(this),
                t(this, o, i);
              }
              get channelCount() {
                return this._nativeAudioNode.channelCount;
              }
              set channelCount(t) {
                this._nativeAudioNode.channelCount = t;
              }
              get channelCountMode() {
                return this._nativeAudioNode.channelCountMode;
              }
              set channelCountMode(t) {
                this._nativeAudioNode.channelCountMode = t;
              }
              get channelInterpretation() {
                return this._nativeAudioNode.channelInterpretation;
              }
              set channelInterpretation(t) {
                this._nativeAudioNode.channelInterpretation = t;
              }
              get context() {
                return this._context;
              }
              get numberOfInputs() {
                return this._nativeAudioNode.numberOfInputs;
              }
              get numberOfOutputs() {
                return this._nativeAudioNode.numberOfOutputs;
              }
              connect(t, s = 0, a = 0) {
                if (s < 0 || s >= this._nativeAudioNode.numberOfOutputs) throw i();
                const c = u(this._context),
                l = m(c);
                if (f(t) || _(t)) throw o();
                if (B(t)) {
                  const i = tt(t);
                  try {
                    const e = Y(this._nativeAudioNode, i, s, a),
                    n = nt(this);
                    (l || n) && this._nativeAudioNode.disconnect(...e),
                    'closed' !== this.context.state && !n && nt(t) && k(t);
                  } catch (t) {
                    if (12 === t.code) throw o();
                    throw t;
                  }
                  if (e(this, t, s, a, l)) {
                    const e = h([this], t);
                    ot(e, n(l));
                  }
                  return t;
                }
                const p = et(t);
                if ('playbackRate' === p.name && 1024 === p.maxValue) throw r();
                try {
                  this._nativeAudioNode.connect(p, s),
                  (l || nt(this)) && this._nativeAudioNode.disconnect(p, s);
                } catch (t) {
                  if (12 === t.code) throw o();
                  throw t;
                }
                if (((t, e, s, n) =>{
                  const {
                    activeInputs: i,
                    passiveInputs: o
                  }
                  = L(e),
                  {
                    outputs: r
                  }
                  = j(t),
                  a = S(t),
                  c = r=>{
                    const a = tt(t),
                    c = et(e);
                    if (r) {
                      const e = J(o, t, s);
                      Q(i, t, e, !1),
                      n || st(t) || a.connect(c, s);
                    } else {
                      const e = ((t, e, s) =>b(t, t=>t[0] === e && t[1] === s)) (i, t, s);
                      Z(o, e, !1),
                      n || st(t) || a.disconnect(c, s);
                    }
                  };
                  return !!G(r, [
                    e,
                    s
                  ], t=>t[0] === e && t[1] === s, !0) && (a.add(c), N(t) ? Q(i, t, [
                    s,
                    c
                  ], !0) : Z(o, [
                    t,
                    s,
                    c
                  ], !0), !0);
                }) (this, t, s, l)) {
                  const e = h([this], t);
                  ot(e, n(l));
                }
              }
              disconnect(t, e, s) {
                let n;
                const r = u(this._context),
                c = m(r);
                if (void 0 === t) n = ((t, e) =>{
                  const s = j(t),
                  n = [
                  ];
                  for (const i of s.outputs) U(i) ? ct(t, e, ...i) : ht(t, e, ...i),
                  n.push(i[0]);
                  return s.outputs.clear(),
                  n;
                }) (this, c);
                 else if ('number' == typeof t) {
                  if (t < 0 || t >= this.numberOfOutputs) throw i();
                  n = ((t, e, s) =>{
                    const n = j(t),
                    i = [
                    ];
                    for (const o of n.outputs) o[1] === s && (U(o) ? ct(t, e, ...o) : ht(t, e, ...o), i.push(o[0]), n.outputs.delete(o));
                    return i;
                  }) (this, c, t);
                } else {
                  if (void 0 !== e && (e < 0 || e >= this.numberOfOutputs)) throw i();
                  if (B(t) && void 0 !== s && (s < 0 || s >= t.numberOfInputs)) throw i();
                  if (n = ((t, e, s, n, i) =>{
                    const o = j(t);
                    return Array.from(o.outputs).filter(t=>!(t[0] !== s || void 0 !== n && t[1] !== n || void 0 !== i && t[2] !== i)).map(s=>(U(s) ? ct(t, e, ...s) : ht(t, e, ...s), o.outputs.delete(s), s[0]));
                  }) (this, c, t, e, s), 0 === n.length) throw o();
                }
                for (const t of n) {
                  const e = h([this], t);
                  ot(e, a);
                }
              }
            }) ((Ne = a, (t, e, s) =>{
              const n = [
              ];
              for (let t = 0; t < s.numberOfInputs; t += 1) n.push(new Set());
              Ne.set(t, {
                activeInputs: n,
                outputs: new Set(),
                passiveInputs: new WeakMap(),
                renderer: e
              });
            }), ((t, e, s, n, i, o, r, a, c, h, l, u, p) =>{
              const d = new WeakMap();
              return (f, _, m, g, v) =>{
                const {
                  activeInputs: y,
                  passiveInputs: x
                }
                = o(_),
                {
                  outputs: w
                }
                = o(f),
                b = a(f),
                S = o=>{
                  const a = c(_),
                  h = c(f);
                  if (o) {
                    const e = T(x, f, m, g);
                    t(y, f, e, !1),
                    v || u(f) || s(h, a, m, g),
                    p(_) && k(_);
                  } else {
                    const t = n(y, f, m, g);
                    e(x, g, t, !1),
                    v || u(f) || i(h, a, m, g);
                    const s = r(_);
                    if (0 === s) l(_) && D(_, y);
                     else {
                      const t = d.get(_);
                      void 0 !== t && clearTimeout(t),
                      d.set(_, setTimeout(() =>{
                        l(_) && D(_, y);
                      }, 1000 * s));
                    }
                  }
                };
                return !!h(w, [
                  _,
                  m,
                  g
                ], t=>t[0] === _ && t[1] === m && t[2] === g, !0) && (b.add(S), l(f) ? t(y, f, [
                  m,
                  g,
                  S
                ], !0) : e(x, g, [
                  f,
                  m,
                  S
                ], !0), !0);
              };
            }) (pe, de, Y, fe, K, j, me, S, tt, G, N, st, nt), ge, ((t, e, s, n, i, o) =>r=>(a, c) =>{
              const h = t.get(a);
              if (void 0 === h) {
                if (!r && o(a)) {
                  const t = n(a),
                  {
                    outputs: o
                  }
                  = s(a);
                  for (const s of o) if (U(s)) {
                    const i = n(s[0]);
                    e(t, i, s[1], s[2]);
                  } else {
                    const e = i(s[0]);
                    t.disconnect(e, s[1]);
                  }
                }
                t.set(a, c);
              } else t.set(a, h + c);
            }) (d, K, j, tt, et, N), R, Ct, Zt, ((t, e, s, n, i, o, r, a) =>(c, h) =>{
              const l = e.get(c);
              if (void 0 === l) throw new Error('Missing the expected cycle count.');
              const u = o(c.context),
              p = a(u);
              if (l === h) {
                if (e.delete(c), !p && r(c)) {
                  const e = n(c),
                  {
                    outputs: o
                  }
                  = s(c);
                  for (const s of o) if (U(s)) {
                    const i = n(s[0]);
                    t(e, i, s[1], s[2]);
                  } else {
                    const t = i(s[0]);
                    e.connect(t, s[1]);
                  }
                }
              } else e.set(c, l - h);
            }) (Y, d, j, tt, et, ke, N, De), ((t, e, s) =>function n(i, o) {
              const r = B(o) ? o : s(t, o);
              if ((t=>'delayTime' in t) (r)) return [];
              if (i[0] === r) return [i];
              if (i.includes(r)) return [];
              const {
                outputs: a
              }
              = e(r);
              return Array.from(a).map(t=>n([...i,
              r], t[0])).reduce((t, e) =>t.concat(e), [
              ]);
            }) (Oe, j, w), Me, ke, Re, qe, Fe, De, Ie);
            var Ne;
            const Pe = ((t, e, s, n, i, o) =>class extends t {
              constructor(t, s) {
                const r = i(t),
                a = {
                  ...O,
                  ...s
                },
                c = n(r, a);
                super (t, !1, c, o(r) ? e() : null),
                this._nativeAnalyserNode = c;
              }
              get fftSize() {
                return this._nativeAnalyserNode.fftSize;
              }
              set fftSize(t) {
                this._nativeAnalyserNode.fftSize = t;
              }
              get frequencyBinCount() {
                return this._nativeAnalyserNode.frequencyBinCount;
              }
              get maxDecibels() {
                return this._nativeAnalyserNode.maxDecibels;
              }
              set maxDecibels(t) {
                const e = this._nativeAnalyserNode.maxDecibels;
                if (this._nativeAnalyserNode.maxDecibels = t, !(t > this._nativeAnalyserNode.minDecibels)) throw this._nativeAnalyserNode.maxDecibels = e,
                s();
              }
              get minDecibels() {
                return this._nativeAnalyserNode.minDecibels;
              }
              set minDecibels(t) {
                const e = this._nativeAnalyserNode.minDecibels;
                if (this._nativeAnalyserNode.minDecibels = t, !(this._nativeAnalyserNode.maxDecibels > t)) throw this._nativeAnalyserNode.minDecibels = e,
                s();
              }
              get smoothingTimeConstant() {
                return this._nativeAnalyserNode.smoothingTimeConstant;
              }
              set smoothingTimeConstant(t) {
                this._nativeAnalyserNode.smoothingTimeConstant = t;
              }
              getByteFrequencyData(t) {
                this._nativeAnalyserNode.getByteFrequencyData(t);
              }
              getByteTimeDomainData(t) {
                this._nativeAnalyserNode.getByteTimeDomainData(t);
              }
              getFloatFrequencyData(t) {
                this._nativeAnalyserNode.getFloatFrequencyData(t);
              }
              getFloatTimeDomainData(t) {
                this._nativeAnalyserNode.getFloatTimeDomainData(t);
              }
            }) (Ve, Se, R, we, ke, De),
            je = new WeakSet(),
            Le = (t=>null === t ? null : t.hasOwnProperty('AudioBuffer') ? t.AudioBuffer : null) (xe),
            ze = (We = new Uint32Array(1), t=>(We[0] = t, We[0]));
            var We;
            const Be = ((t, e) =>s=>{
              s.copyFromChannel = (n, i, o = 0) =>{
                const r = t(o),
                a = t(i);
                if (a >= s.numberOfChannels) throw e();
                const c = s.length,
                h = s.getChannelData(a),
                l = n.length;
                for (let t = r < 0 ? - r : 0; t + r < c && t < l; t += 1) n[t] = h[t + r];
              },
              s.copyToChannel = (n, i, o = 0) =>{
                const r = t(o),
                a = t(i);
                if (a >= s.numberOfChannels) throw e();
                const c = s.length,
                h = s.getChannelData(a),
                l = n.length;
                for (let t = r < 0 ? - r : 0; t + r < c && t < l; t += 1) h[t + r] = n[t];
              };
            }) (ze, R),
            Ue = (t=>e=>{
              e.copyFromChannel = (s=>(n, i, o = 0) =>{
                const r = t(o),
                a = t(i);
                if (r < e.length) return s.call(e, n, a, r);
              }) (e.copyFromChannel),
              e.copyToChannel = (s=>(n, i, o = 0) =>{
                const r = t(o),
                a = t(i);
                if (r < e.length) return s.call(e, n, a, r);
              }) (e.copyToChannel);
            }) (ze),
            Ge = ((t, e, s, n, i, o, r, a) =>{
              let c = null;
              return class h {
                constructor(h) {
                  if (null === i) throw new Error('Missing the native OfflineAudioContext constructor.');
                  const {
                    length: l,
                    numberOfChannels: u,
                    sampleRate: p
                  }
                  = {
                    ...F,
                    ...h
                  };
                  null === c && (c = new i(1, 1, 44100));
                  const d = null !== n && e(o, o) ? new n({
                    length: l,
                    numberOfChannels: u,
                    sampleRate: p
                  }) : c.createBuffer(u, l, p);
                  if (0 === d.numberOfChannels) throw s();
                  return 'function' != typeof d.copyFromChannel ? (r(d), q(d)) : e(E, () =>E(d)) || a(d),
                  t.add(d),
                  d;
                }
                static[Symbol.hasInstance](e) {
                  return null !== e && 'object' == typeof e && Object.getPrototypeOf(e) === h.prototype || t.has(e);
                }
              };
            }) (je, ge, Zt, Le, Ce, (t=>() =>{
              if (null === t) return !1;
              try {
                new t({
                  length: 1,
                  sampleRate: 44100
                });
              } catch {
                return !1;
              }
              return !0;
            }) (Le), Be, Ue),
            Qe = (t=>(e, s) =>{
              const n = t(e, {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete',
                gain: 0
              });
              s.connect(n).connect(e.destination);
              const i = () =>{
                s.removeEventListener('ended', i),
                s.disconnect(n),
                n.disconnect();
              };
              s.addEventListener('ended', i);
            }) (Bt),
            Ze = ((t, e, s) =>async(n, i, o) =>{
              const r = e(n);
              await Promise.all(Array.from(r.activeInputs).map(async([e,
              n]) =>{
                const r = t(e),
                a = await r.render(e, i);
                s(e) || a.connect(o, n);
              }));
            }) (be, L, st),
            Xe = (t=>(e, s, n) =>t(s, e, n)) (Ze),
            Ye = ((t, e, s, n, i, o, r, a, c, h, l) =>(c, u) =>{
              const p = c.createBufferSource();
              return qt(p, u),
              It(p, u, 'playbackRate'),
              Rt(p, u, 'buffer'),
              Rt(p, u, 'loop'),
              Rt(p, u, 'loopEnd'),
              Rt(p, u, 'loopStart'),
              e(s, () =>s(c)) || (t=>{
                t.start = (e=>{
                  let s = !1;
                  return (n = 0, i = 0, o) =>{
                    if (s) throw At();
                    e.call(t, n, i, o),
                    s = !0;
                  };
                }) (t.start);
              }) (p),
              e(n, () =>n(c)) || (t=>{
                t.start = (e=>(s = 0, n = 0, i) =>{
                  const o = t.buffer,
                  r = null === o ? n : Math.min(o.duration, n);
                  null !== o && r > o.duration - 0.5 / t.context.sampleRate ? e.call(t, s, 0, 0) : e.call(t, s, r, i);
                }) (t.start);
              }) (p),
              e(i, () =>i(c)) || h(p, c),
              e(o, () =>o(c)) || Vt(p),
              e(r, () =>r(c)) || l(p, c),
              e(a, () =>a(c)) || Nt(p),
              t(c, p),
              p;
            }) (Qe, ge, t=>{
              const e = t.createBufferSource();
              e.start();
              try {
                e.start();
              } catch {
                return !0;
              }
              return !1;
            }, t=>{
              const e = t.createBufferSource(),
              s = t.createBuffer(1, 1, 44100);
              e.buffer = s;
              try {
                e.start(0, 1);
              } catch {
                return !1;
              }
              return !0;
            }, t=>{
              const e = t.createBufferSource();
              e.start();
              try {
                e.stop();
              } catch {
                return !1;
              }
              return !0;
            }, oe, re, ae, 0, (t=>(e, s) =>{
              const n = s.createBuffer(1, 1, 44100);
              null === e.buffer && (e.buffer = n),
              t(e, 'buffer', t=>() =>{
                const s = t.call(e);
                return s === n ? null : s;
              }, t=>s=>t.call(e, null === s ? n : s));
            }) (ne), le),
            $e = ((t, e) =>(s, n, i) =>(t(n).replay(i), e(n, s, i))) ((t=>e=>{
              const s = t(e);
              if (null === s.renderer) throw new Error('Missing the renderer of the given AudioParam in the audio graph.');
              return s.renderer;
            }) (L), Ze),
            He = ((t, e, s, n, i) =>() =>{
              const o = new WeakMap();
              let r = null,
              a = null;
              return {
                set start(t) {
                  r = t;
                },
                set stop(t) {
                  a = t;
                },
                render(c, h) {
                  const l = o.get(h);
                  return void 0 !== l ? Promise.resolve(l) : (async(c, h) =>{
                    let l = s(c);
                    const u = M(l, h);
                    if (!u) {
                      const t = {
                        buffer: l.buffer,
                        channelCount: l.channelCount,
                        channelCountMode: l.channelCountMode,
                        channelInterpretation: l.channelInterpretation,
                        loop: l.loop,
                        loopEnd: l.loopEnd,
                        loopStart: l.loopStart,
                        playbackRate: l.playbackRate.value
                      };
                      l = e(h, t),
                      null !== r && l.start(...r),
                      null !== a && l.stop(a);
                    }
                    return o.set(h, l),
                    u ? await t(h, c.playbackRate, l.playbackRate) : await n(h, c.playbackRate, l.playbackRate),
                    await i(c, h, l),
                    l;
                  }) (c, h);
                }
              };
            }) (Xe, Ye, tt, $e, Te),
            Je = ((t, e, s, n, i, r, a, c, h, l, u, p, d) =>(n, f, _, m = null, g = null) =>{
              const v = new o.AutomationEventList(_.defaultValue),
              y = f ? (t=>({
                replay(e) {
                  for (const s of t) if ('exponentialRampToValue' === s.type) {
                    const {
                      endTime: t,
                      value: n
                    }
                    = s;
                    e.exponentialRampToValueAtTime(n, t);
                  } else if ('linearRampToValue' === s.type) {
                    const {
                      endTime: t,
                      value: n
                    }
                    = s;
                    e.linearRampToValueAtTime(n, t);
                  } else if ('setTarget' === s.type) {
                    const {
                      startTime: t,
                      target: n,
                      timeConstant: i
                    }
                    = s;
                    e.setTargetAtTime(n, t, i);
                  } else if ('setValue' === s.type) {
                    const {
                      startTime: t,
                      value: n
                    }
                    = s;
                    e.setValueAtTime(n, t);
                  } else {
                    if ('setValueCurve' !== s.type) throw new Error('Can\'t apply an unknown automation.');
                    {
                      const {
                        duration: t,
                        startTime: n,
                        values: i
                      }
                      = s;
                      e.setValueCurveAtTime(i, n, t);
                    }
                  }
                }
              })) (v) : null,
              x = {
                get defaultValue() {
                  return _.defaultValue;
                },
                get maxValue() {
                  return null === m ? _.maxValue : m;
                },
                get minValue() {
                  return null === g ? _.minValue : g;
                },
                get value() {
                  return _.value;
                },
                set value(t) {
                  _.value = t,
                  x.setValueAtTime(t, n.context.currentTime);
                },
                cancelAndHoldAtTime(t) {
                  if ('function' == typeof _.cancelAndHoldAtTime) null === y && v.flush(n.context.currentTime),
                  v.add(i(t)),
                  _.cancelAndHoldAtTime(t);
                   else {
                    const e = Array.from(v).pop();
                    null === y && v.flush(n.context.currentTime),
                    v.add(i(t));
                    const s = Array.from(v).pop();
                    _.cancelScheduledValues(t),
                    e !== s && void 0 !== s && ('exponentialRampToValue' === s.type ? _.exponentialRampToValueAtTime(s.value, s.endTime) : 'linearRampToValue' === s.type ? _.linearRampToValueAtTime(s.value, s.endTime) : 'setValue' === s.type ? _.setValueAtTime(s.value, s.startTime) : 'setValueCurve' === s.type && _.setValueCurveAtTime(s.values, s.startTime, s.duration));
                  }
                  return x;
                },
                cancelScheduledValues: t=>(null === y && v.flush(n.context.currentTime), v.add(r(t)), _.cancelScheduledValues(t), x),
                exponentialRampToValueAtTime(t, e) {
                  if (0 === t) throw new RangeError();
                  if (!Number.isFinite(e) || e < 0) throw new RangeError();
                  return null === y && v.flush(n.context.currentTime),
                  v.add(a(t, e)),
                  _.exponentialRampToValueAtTime(t, e),
                  x;
                },
                linearRampToValueAtTime: (t, e) =>(null === y && v.flush(n.context.currentTime), v.add(c(t, e)), _.linearRampToValueAtTime(t, e), x),
                setTargetAtTime: (t, e, s) =>(null === y && v.flush(n.context.currentTime), v.add(h(t, e, s)), _.setTargetAtTime(t, e, s), x),
                setValueAtTime: (t, e) =>(null === y && v.flush(n.context.currentTime), v.add(l(t, e)), _.setValueAtTime(t, e), x),
                setValueCurveAtTime(t, e, s) {
                  const i = t instanceof Float32Array ? t : new Float32Array(t);
                  if (null !== p && 'webkitAudioContext' === p.name) {
                    const t = e + s,
                    o = n.context.sampleRate,
                    r = Math.ceil(e * o),
                    a = Math.floor(t * o),
                    c = a - r,
                    h = new Float32Array(c);
                    for (let t = 0; t < c; t += 1) {
                      const n = (i.length - 1) / s * ((r + t) / o - e),
                      a = Math.floor(n),
                      c = Math.ceil(n);
                      h[t] = a === c ? i[a] : (1 - (n - a)) * i[a] + (1 - (c - n)) * i[c];
                    }
                    null === y && v.flush(n.context.currentTime),
                    v.add(u(h, e, s)),
                    _.setValueCurveAtTime(h, e, s);
                    const l = a / o;
                    l < t && d(x, h[h.length - 1], l),
                    d(x, i[i.length - 1], t);
                  } else null === y && v.flush(n.context.currentTime),
                  v.add(u(i, e, s)),
                  _.setValueCurveAtTime(i, e, s);
                  return x;
                }
              };
              return s.set(x, _),
              e.set(x, n),
              t(x, y),
              x;
            }) ((Ke = h, (t, e) =>{
              Ke.set(t, {
                activeInputs: new Set(),
                passiveInputs: new WeakMap(),
                renderer: e
              });
            }), Oe, l, 0, o.createCancelAndHoldAutomationEvent, o.createCancelScheduledValuesAutomationEvent, o.createExponentialRampToValueAutomationEvent, o.createLinearRampToValueAutomationEvent, o.createSetTargetAutomationEvent, o.createSetValueAutomationEvent, o.createSetValueCurveAutomationEvent, Ee, ie);
            var Ke;
            const ts = ((t, e, s, n, i, o, r, a) =>class extends t {
              constructor(t, n) {
                const a = o(t),
                c = {
                  ...P,
                  ...n
                },
                h = i(a, c),
                l = r(a),
                u = l ? e() : null;
                super (t, !1, h, u),
                this._audioBufferSourceNodeRenderer = u,
                this._isBufferNullified = !1,
                this._isBufferSet = null !== c.buffer,
                this._nativeAudioBufferSourceNode = h,
                this._onended = null,
                this._playbackRate = s(this, l, h.playbackRate, V, I);
              }
              get buffer() {
                return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;
              }
              set buffer(t) {
                if (this._nativeAudioBufferSourceNode.buffer = t, null !== t) {
                  if (this._isBufferSet) throw n();
                  this._isBufferSet = !0;
                }
              }
              get loop() {
                return this._nativeAudioBufferSourceNode.loop;
              }
              set loop(t) {
                this._nativeAudioBufferSourceNode.loop = t;
              }
              get loopEnd() {
                return this._nativeAudioBufferSourceNode.loopEnd;
              }
              set loopEnd(t) {
                this._nativeAudioBufferSourceNode.loopEnd = t;
              }
              get loopStart() {
                return this._nativeAudioBufferSourceNode.loopStart;
              }
              set loopStart(t) {
                this._nativeAudioBufferSourceNode.loopStart = t;
              }
              get onended() {
                return this._onended;
              }
              set onended(t) {
                const e = 'function' == typeof t ? a(this, t) : null;
                this._nativeAudioBufferSourceNode.onended = e;
                const s = this._nativeAudioBufferSourceNode.onended;
                this._onended = null !== s && s === e ? t : s;
              }
              get playbackRate() {
                return this._playbackRate;
              }
              start(t = 0, e = 0, s) {
                if (this._nativeAudioBufferSourceNode.start(t, e, s), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.start = void 0 === s ? [
                  t,
                  e
                ] : [
                  t,
                  e,
                  s
                ]), 'closed' !== this.context.state) {
                  k(this);
                  const t = () =>{
                    this._nativeAudioBufferSourceNode.removeEventListener('ended', t),
                    N(this) && C(this);
                  };
                  this._nativeAudioBufferSourceNode.addEventListener('ended', t);
                }
              }
              stop(t = 0) {
                this._nativeAudioBufferSourceNode.stop(t),
                null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.stop = t);
              }
            }) (Ve, He, Je, At, Ye, ke, De, ue),
            es = ((t, e, s, n, i, o, r, a) =>class extends t {
              constructor(t, e) {
                const s = o(t),
                n = r(s),
                c = i(s, e, n);
                super (t, !1, c, n ? (t=>{
                  const e = new WeakMap();
                  return {
                    render(s, n) {
                      const i = e.get(n);
                      return void 0 !== i ? Promise.resolve(i) : (async(s, n) =>{
                        const i = n.destination;
                        return e.set(n, i),
                        await t(s, n, i),
                        i;
                      }) (s, n);
                    }
                  };
                }) (a) : null),
                this._isNodeOfNativeOfflineAudioContext = n,
                this._nativeAudioDestinationNode = c;
              }
              get channelCount() {
                return this._nativeAudioDestinationNode.channelCount;
              }
              set channelCount(t) {
                if (this._isNodeOfNativeOfflineAudioContext) throw n();
                if (t > this._nativeAudioDestinationNode.maxChannelCount) throw s();
                this._nativeAudioDestinationNode.channelCount = t;
              }
              get channelCountMode() {
                return this._nativeAudioDestinationNode.channelCountMode;
              }
              set channelCountMode(t) {
                if (this._isNodeOfNativeOfflineAudioContext) throw n();
                this._nativeAudioDestinationNode.channelCountMode = t;
              }
              get maxChannelCount() {
                return this._nativeAudioDestinationNode.maxChannelCount;
              }
            }) (Ve, 0, R, At, ((t, e) =>(s, n, i) =>{
              const o = s.destination;
              if (o.channelCount !== n) try {
                o.channelCount = n;
              } catch {
              }
              i && 'explicit' !== o.channelCountMode && (o.channelCountMode = 'explicit'),
              0 === o.maxChannelCount && Object.defineProperty(o, 'maxChannelCount', {
                value: n
              });
              const r = t(s, {
                channelCount: n,
                channelCountMode: o.channelCountMode,
                channelInterpretation: o.channelInterpretation,
                gain: 1
              });
              return e(r, 'channelCount', t=>() =>t.call(r), t=>e=>{
                t.call(r, e);
                try {
                  o.channelCount = e;
                } catch (t) {
                  if (e > o.maxChannelCount) throw t;
                }
              }),
              e(r, 'channelCountMode', t=>() =>t.call(r), t=>e=>{
                t.call(r, e),
                o.channelCountMode = e;
              }),
              e(r, 'channelInterpretation', t=>() =>t.call(r), t=>e=>{
                t.call(r, e),
                o.channelInterpretation = e;
              }),
              Object.defineProperty(r, 'maxChannelCount', {
                get: () =>o.maxChannelCount
              }),
              r.connect(o),
              r;
            }) (Bt, ne), ke, De, Te),
            ss = ((t, e, s, n, i) =>() =>{
              const o = new WeakMap();
              return {
                render(r, a) {
                  const c = o.get(a);
                  return void 0 !== c ? Promise.resolve(c) : (async(r, a) =>{
                    let c = s(r);
                    const h = M(c, a);
                    if (!h) {
                      const t = {
                        Q: c.Q.value,
                        channelCount: c.channelCount,
                        channelCountMode: c.channelCountMode,
                        channelInterpretation: c.channelInterpretation,
                        detune: c.detune.value,
                        frequency: c.frequency.value,
                        gain: c.gain.value,
                        type: c.type
                      };
                      c = e(a, t);
                    }
                    return o.set(a, c),
                    h ? (await t(a, r.Q, c.Q), await t(a, r.detune, c.detune), await t(a, r.frequency, c.frequency), await t(a, r.gain, c.gain)) : (await n(a, r.Q, c.Q), await n(a, r.detune, c.detune), await n(a, r.frequency, c.frequency), await n(a, r.gain, c.gain)),
                    await i(r, a, c),
                    c;
                  }) (r, a);
                }
              };
            }) (Xe, jt, tt, $e, Te),
            ns = (t=>(e, s) =>t.set(e, s)) (_e),
            is = ((t, e, s, n, i, o, r, a) =>class extends t {
              constructor(t, n) {
                const c = o(t),
                h = {
                  ...mt,
                  ...n
                },
                l = i(c, h),
                u = r(c);
                super (t, !1, l, u ? s() : null),
                this._Q = e(this, u, l.Q, V, I),
                this._detune = e(this, u, l.detune, 1200 * Math.log2(V), - 1200 * Math.log2(V)),
                this._frequency = e(this, u, l.frequency, t.sampleRate / 2, 0),
                this._gain = e(this, u, l.gain, 40 * Math.log10(V), I),
                this._nativeBiquadFilterNode = l,
                a(this, 1);
              }
              get detune() {
                return this._detune;
              }
              get frequency() {
                return this._frequency;
              }
              get gain() {
                return this._gain;
              }
              get Q() {
                return this._Q;
              }
              get type() {
                return this._nativeBiquadFilterNode.type;
              }
              set type(t) {
                this._nativeBiquadFilterNode.type = t;
              }
              getFrequencyResponse(t, e, s) {
                try {
                  this._nativeBiquadFilterNode.getFrequencyResponse(t, e, s);
                } catch (t) {
                  if (11 === t.code) throw n();
                  throw t;
                }
                if (t.length !== e.length || e.length !== s.length) throw n();
              }
            }) (Ve, Je, ss, Ct, jt, ke, De, ns),
            os = ((t, e) =>(s, n, i) =>{
              const o = new Set();
              return s.connect = (i=>(r, a = 0, c = 0) =>{
                const h = 0 === o.size;
                if (e(r)) return i.call(s, r, a, c),
                t(o, [
                  r,
                  a,
                  c
                ], t=>t[0] === r && t[1] === a && t[2] === c, !0),
                h && n(),
                r;
                i.call(s, r, a),
                t(o, [
                  r,
                  a
                ], t=>t[0] === r && t[1] === a, !0),
                h && n();
              }) (s.connect),
              s.disconnect = (t=>(n, r, a) =>{
                const c = o.size > 0;
                if (void 0 === n) t.apply(s),
                o.clear();
                 else if ('number' == typeof n) {
                  t.call(s, n);
                  for (const t of o) t[1] === n && o.delete(t);
                } else {
                  e(n) ? t.call(s, n, r, a) : t.call(s, n, r);
                  for (const t of o) t[0] !== n || void 0 !== r && t[1] !== r || void 0 !== a && t[2] !== a || o.delete(t);
                }
                const h = 0 === o.size;
                c && h && i();
              }) (s.disconnect),
              s;
            }) (G, qe),
            rs = ((t, e) =>(s, n) =>{
              n.channelCount = 1,
              n.channelCountMode = 'explicit',
              Object.defineProperty(n, 'channelCount', {
                get: () =>1,
                set: () =>{
                  throw t();
                }
              }),
              Object.defineProperty(n, 'channelCountMode', {
                get: () =>'explicit',
                set: () =>{
                  throw t();
                }
              });
              const i = s.createBufferSource();
              e(n, () =>{
                const t = n.numberOfInputs;
                for (let e = 0; e < t; e += 1) i.connect(n, 0, e);
              }, () =>i.disconnect(n));
            }) (At, os),
            as = ((t, e) =>(s, n) =>{
              const i = s.createChannelMerger(n.numberOfInputs);
              return null !== t && 'webkitAudioContext' === t.name && e(s, i),
              qt(i, n),
              i;
            }) (Ee, rs),
            cs = ((t, e, s) =>() =>{
              const n = new WeakMap();
              return {
                render(i, o) {
                  const r = n.get(o);
                  return void 0 !== r ? Promise.resolve(r) : (async(i, o) =>{
                    let r = e(i);
                    if (!M(r, o)) {
                      const e = {
                        channelCount: r.channelCount,
                        channelCountMode: r.channelCountMode,
                        channelInterpretation: r.channelInterpretation,
                        numberOfInputs: r.numberOfInputs
                      };
                      r = t(o, e);
                    }
                    return n.set(o, r),
                    await s(i, o, r),
                    r;
                  }) (i, o);
                }
              };
            }) (as, tt, Te),
            hs = ((t, e, s, n, i) =>class extends t {
              constructor(t, o) {
                const r = n(t),
                a = {
                  ...gt,
                  ...o
                };
                super (t, !1, s(r, a), i(r) ? e() : null);
              }
            }) (Ve, cs, as, ke, De),
            ls = ((t, e, s) =>() =>{
              const n = new WeakMap();
              return {
                render(i, o) {
                  const r = n.get(o);
                  return void 0 !== r ? Promise.resolve(r) : (async(i, o) =>{
                    let r = e(i);
                    if (!M(r, o)) {
                      const e = {
                        channelCount: r.channelCount,
                        channelCountMode: r.channelCountMode,
                        channelInterpretation: r.channelInterpretation,
                        numberOfOutputs: r.numberOfOutputs
                      };
                      r = t(o, e);
                    }
                    return n.set(o, r),
                    await s(i, o, r),
                    r;
                  }) (i, o);
                }
              };
            }) (Lt, tt, Te),
            us = ((t, e, s, n, i, o) =>class extends t {
              constructor(t, o) {
                const r = n(t),
                a = (t=>({
                  ...t,
                  channelCount: t.numberOfOutputs
                })) ({
                  ...vt,
                  ...o
                });
                super (t, !1, s(r, a), i(r) ? e() : null);
              }
            }) (Ve, ls, Lt, ke, De),
            ps = ((t, e, s, n) =>(i, {
              offset: o,
              ...r
            }) =>{
              const a = i.createBuffer(1, 2, 44100),
              c = e(i, {
                buffer: null,
                channelCount: 2,
                channelCountMode: 'max',
                channelInterpretation: 'speakers',
                loop: !1,
                loopEnd: 0,
                loopStart: 0,
                playbackRate: 1
              }),
              h = s(i, {
                ...r,
                gain: o
              }),
              l = a.getChannelData(0);
              l[0] = 1,
              l[1] = 1,
              c.buffer = a,
              c.loop = !0;
              const u = {
                get bufferSize() {
                },
                get channelCount() {
                  return h.channelCount;
                },
                set channelCount(t) {
                  h.channelCount = t;
                },
                get channelCountMode() {
                  return h.channelCountMode;
                },
                set channelCountMode(t) {
                  h.channelCountMode = t;
                },
                get channelInterpretation() {
                  return h.channelInterpretation;
                },
                set channelInterpretation(t) {
                  h.channelInterpretation = t;
                },
                get context() {
                  return h.context;
                },
                get inputs() {
                  return [];
                },
                get numberOfInputs() {
                  return c.numberOfInputs;
                },
                get numberOfOutputs() {
                  return h.numberOfOutputs;
                },
                get offset() {
                  return h.gain;
                },
                get onended() {
                  return c.onended;
                },
                set onended(t) {
                  c.onended = t;
                },
                addEventListener: (...t) =>c.addEventListener(t[0], t[1], t[2]),
                dispatchEvent: (...t) =>c.dispatchEvent(t[0]),
                removeEventListener: (...t) =>c.removeEventListener(t[0], t[1], t[2]),
                start(t = 0) {
                  c.start.call(c, t);
                },
                stop(t = 0) {
                  c.stop.call(c, t);
                }
              };
              return t(i, c),
              n(zt(u, h), () =>c.connect(h), () =>c.disconnect(h));
            }) (Qe, Ye, Bt, os),
            ds = ((t, e, s, n, i) =>(o, r) =>{
              if (void 0 === o.createConstantSource) return s(o, r);
              const a = o.createConstantSource();
              return qt(a, r),
              It(a, r, 'offset'),
              e(n, () =>n(o)) || Vt(a),
              e(i, () =>i(o)) || Nt(a),
              t(o, a),
              a;
            }) (Qe, ge, ps, oe, ae),
            fs = ((t, e, s, n, i) =>() =>{
              const o = new WeakMap();
              let r = null,
              a = null;
              return {
                set start(t) {
                  r = t;
                },
                set stop(t) {
                  a = t;
                },
                render(c, h) {
                  const l = o.get(h);
                  return void 0 !== l ? Promise.resolve(l) : (async(c, h) =>{
                    let l = s(c);
                    const u = M(l, h);
                    if (!u) {
                      const t = {
                        channelCount: l.channelCount,
                        channelCountMode: l.channelCountMode,
                        channelInterpretation: l.channelInterpretation,
                        offset: l.offset.value
                      };
                      l = e(h, t),
                      null !== r && l.start(r),
                      null !== a && l.stop(a);
                    }
                    return o.set(h, l),
                    u ? await t(h, c.offset, l.offset) : await n(h, c.offset, l.offset),
                    await i(c, h, l),
                    l;
                  }) (c, h);
                }
              };
            }) (Xe, ds, tt, $e, Te),
            _s = ((t, e, s, n, i, o, r) =>class extends t {
              constructor(t, r) {
                const a = i(t),
                c = {
                  ...yt,
                  ...r
                },
                h = n(a, c),
                l = o(a),
                u = l ? s() : null;
                super (t, !1, h, u),
                this._constantSourceNodeRenderer = u,
                this._nativeConstantSourceNode = h,
                this._offset = e(this, l, h.offset, V, I),
                this._onended = null;
              }
              get offset() {
                return this._offset;
              }
              get onended() {
                return this._onended;
              }
              set onended(t) {
                const e = 'function' == typeof t ? r(this, t) : null;
                this._nativeConstantSourceNode.onended = e;
                const s = this._nativeConstantSourceNode.onended;
                this._onended = null !== s && s === e ? t : s;
              }
              start(t = 0) {
                if (this._nativeConstantSourceNode.start(t), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.start = t), 'closed' !== this.context.state) {
                  k(this);
                  const t = () =>{
                    this._nativeConstantSourceNode.removeEventListener('ended', t),
                    N(this) && C(this);
                  };
                  this._nativeConstantSourceNode.addEventListener('ended', t);
                }
              }
              stop(t = 0) {
                this._nativeConstantSourceNode.stop(t),
                null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.stop = t);
              }
            }) (Ve, Je, fs, ds, ke, De, ue),
            ms = ((t, e) =>(s, n) =>{
              const i = s.createConvolver();
              if (qt(i, n), n.disableNormalization === i.normalize && (i.normalize = !n.disableNormalization), Rt(i, n, 'buffer'), n.channelCount > 2) throw t();
              if (e(i, 'channelCount', t=>() =>t.call(i), e=>s=>{
                if (s > 2) throw t();
                return e.call(i, s);
              }), 'max' === n.channelCountMode) throw t();
              return e(i, 'channelCountMode', t=>() =>t.call(i), e=>s=>{
                if ('max' === s) throw t();
                return e.call(i, s);
              }),
              i;
            }) (Zt, ne),
            gs = ((t, e, s) =>() =>{
              const n = new WeakMap();
              return {
                render(i, o) {
                  const r = n.get(o);
                  return void 0 !== r ? Promise.resolve(r) : (async(i, o) =>{
                    let r = e(i);
                    if (!M(r, o)) {
                      const e = {
                        buffer: r.buffer,
                        channelCount: r.channelCount,
                        channelCountMode: r.channelCountMode,
                        channelInterpretation: r.channelInterpretation,
                        disableNormalization: !r.normalize
                      };
                      r = t(o, e);
                    }
                    return n.set(o, r),
                    X(r) ? await s(i, o, r.inputs[0]) : await s(i, o, r),
                    r;
                  }) (i, o);
                }
              };
            }) (ms, tt, Te),
            vs = ((t, e, s, n, i, o) =>class extends t {
              constructor(t, r) {
                const a = n(t),
                c = {
                  ...xt,
                  ...r
                },
                h = s(a, c);
                super (t, !1, h, i(a) ? e() : null),
                this._isBufferNullified = !1,
                this._nativeConvolverNode = h,
                null !== c.buffer && o(this, c.buffer.duration);
              }
              get buffer() {
                return this._isBufferNullified ? null : this._nativeConvolverNode.buffer;
              }
              set buffer(t) {
                if (this._nativeConvolverNode.buffer = t, null === t && null !== this._nativeConvolverNode.buffer) {
                  const t = this._nativeConvolverNode.context;
                  this._nativeConvolverNode.buffer = t.createBuffer(1, 1, 44100),
                  this._isBufferNullified = !0,
                  o(this, 0);
                } else this._isBufferNullified = !1,
                o(this, null === this._nativeConvolverNode.buffer ? 0 : this._nativeConvolverNode.buffer.duration);
              }
              get normalize() {
                return this._nativeConvolverNode.normalize;
              }
              set normalize(t) {
                this._nativeConvolverNode.normalize = t;
              }
            }) (Ve, gs, ms, ke, De, ns),
            ys = ((t, e, s, n, i) =>o=>{
              const r = new WeakMap();
              return {
                render(a, c) {
                  const h = r.get(c);
                  return void 0 !== h ? Promise.resolve(h) : (async(a, c) =>{
                    let h = s(a);
                    const l = M(h, c);
                    if (!l) {
                      const t = {
                        channelCount: h.channelCount,
                        channelCountMode: h.channelCountMode,
                        channelInterpretation: h.channelInterpretation,
                        delayTime: h.delayTime.value,
                        maxDelayTime: o
                      };
                      h = e(c, t);
                    }
                    return r.set(c, h),
                    l ? await t(c, a.delayTime, h.delayTime) : await n(c, a.delayTime, h.delayTime),
                    await i(a, c, h),
                    h;
                  }) (a, c);
                }
              };
            }) (Xe, Wt, tt, $e, Te),
            xs = ((t, e, s, n, i, o, r) =>class extends t {
              constructor(t, a) {
                const c = i(t),
                h = {
                  ...bt,
                  ...a
                },
                l = n(c, h),
                u = o(c);
                super (t, !1, l, u ? s(h.maxDelayTime) : null),
                this._delayTime = e(this, u, l.delayTime),
                r(this, h.maxDelayTime);
              }
              get delayTime() {
                return this._delayTime;
              }
            }) (Ve, Je, ys, Wt, ke, De, ns),
            ws = (t=>(e, s) =>{
              const n = e.createDynamicsCompressor();
              if (qt(n, s), s.channelCount > 2) throw t();
              if ('max' === s.channelCountMode) throw t();
              return It(n, s, 'attack'),
              It(n, s, 'knee'),
              It(n, s, 'ratio'),
              It(n, s, 'release'),
              It(n, s, 'threshold'),
              n;
            }) (Zt),
            bs = ((t, e, s, n, i) =>() =>{
              const o = new WeakMap();
              return {
                render(r, a) {
                  const c = o.get(a);
                  return void 0 !== c ? Promise.resolve(c) : (async(r, a) =>{
                    let c = s(r);
                    const h = M(c, a);
                    if (!h) {
                      const t = {
                        attack: c.attack.value,
                        channelCount: c.channelCount,
                        channelCountMode: c.channelCountMode,
                        channelInterpretation: c.channelInterpretation,
                        knee: c.knee.value,
                        ratio: c.ratio.value,
                        release: c.release.value,
                        threshold: c.threshold.value
                      };
                      c = e(a, t);
                    }
                    return o.set(a, c),
                    h ? (await t(a, r.attack, c.attack), await t(a, r.knee, c.knee), await t(a, r.ratio, c.ratio), await t(a, r.release, c.release), await t(a, r.threshold, c.threshold)) : (await n(a, r.attack, c.attack), await n(a, r.knee, c.knee), await n(a, r.ratio, c.ratio), await n(a, r.release, c.release), await n(a, r.threshold, c.threshold)),
                    await i(r, a, c),
                    c;
                  }) (r, a);
                }
              };
            }) (Xe, ws, tt, $e, Te),
            Ts = ((t, e, s, n, i, o, r, a) =>class extends t {
              constructor(t, i) {
                const c = o(t),
                h = {
                  ...St,
                  ...i
                },
                l = n(c, h),
                u = r(c);
                super (t, !1, l, u ? s() : null),
                this._attack = e(this, u, l.attack),
                this._knee = e(this, u, l.knee),
                this._nativeDynamicsCompressorNode = l,
                this._ratio = e(this, u, l.ratio),
                this._release = e(this, u, l.release),
                this._threshold = e(this, u, l.threshold),
                a(this, 0.006);
              }
              get attack() {
                return this._attack;
              }
              get channelCount() {
                return this._nativeDynamicsCompressorNode.channelCount;
              }
              set channelCount(t) {
                const e = this._nativeDynamicsCompressorNode.channelCount;
                if (this._nativeDynamicsCompressorNode.channelCount = t, t > 2) throw this._nativeDynamicsCompressorNode.channelCount = e,
                i();
              }
              get channelCountMode() {
                return this._nativeDynamicsCompressorNode.channelCountMode;
              }
              set channelCountMode(t) {
                const e = this._nativeDynamicsCompressorNode.channelCountMode;
                if (this._nativeDynamicsCompressorNode.channelCountMode = t, 'max' === t) throw this._nativeDynamicsCompressorNode.channelCountMode = e,
                i();
              }
              get knee() {
                return this._knee;
              }
              get ratio() {
                return this._ratio;
              }
              get reduction() {
                return 'number' == typeof this._nativeDynamicsCompressorNode.reduction.value ? this._nativeDynamicsCompressorNode.reduction.value : this._nativeDynamicsCompressorNode.reduction;
              }
              get release() {
                return this._release;
              }
              get threshold() {
                return this._threshold;
              }
            }) (Ve, Je, bs, ws, Zt, ke, De, ns),
            Ss = ((t, e, s, n, i) =>() =>{
              const o = new WeakMap();
              return {
                render(r, a) {
                  const c = o.get(a);
                  return void 0 !== c ? Promise.resolve(c) : (async(r, a) =>{
                    let c = s(r);
                    const h = M(c, a);
                    if (!h) {
                      const t = {
                        channelCount: c.channelCount,
                        channelCountMode: c.channelCountMode,
                        channelInterpretation: c.channelInterpretation,
                        gain: c.gain.value
                      };
                      c = e(a, t);
                    }
                    return o.set(a, c),
                    h ? await t(a, r.gain, c.gain) : await n(a, r.gain, c.gain),
                    await i(r, a, c),
                    c;
                  }) (r, a);
                }
              };
            }) (Xe, Bt, tt, $e, Te),
            ks = ((t, e, s, n, i, o) =>class extends t {
              constructor(t, r) {
                const a = i(t),
                c = {
                  ...kt,
                  ...r
                },
                h = n(a, c),
                l = o(a);
                super (t, !1, h, l ? s() : null),
                this._gain = e(this, l, h.gain, V, I);
              }
              get gain() {
                return this._gain;
              }
            }) (Ve, Je, Ss, Bt, ke, De),
            As = ((t, e, s, n) =>(i, o, {
              channelCount: r,
              channelCountMode: a,
              channelInterpretation: c,
              feedback: h,
              feedforward: l
            }) =>{
              const u = Pt(o, i.sampleRate),
              p = h instanceof Float64Array ? h : new Float64Array(h),
              d = l instanceof Float64Array ? l : new Float64Array(l),
              f = p.length,
              _ = d.length,
              m = Math.min(f, _);
              if (0 === f || f > 20) throw n();
              if (0 === p[0]) throw e();
              if (0 === _ || _ > 20) throw n();
              if (0 === d[0]) throw e();
              if (1 !== p[0]) {
                for (let t = 0; t < _; t += 1) d[t] /= p[0];
                for (let t = 1; t < f; t += 1) p[t] /= p[0];
              }
              const g = s(i, u, r, r);
              g.channelCount = r,
              g.channelCountMode = a,
              g.channelInterpretation = c;
              const v = [
              ],
              y = [
              ],
              x = [
              ];
              for (let t = 0; t < r; t += 1) {
                v.push(0);
                const t = new Float32Array(32),
                e = new Float32Array(32);
                t.fill(0),
                e.fill(0),
                y.push(t),
                x.push(e);
              }
              g.onaudioprocess = t=>{
                const e = t.inputBuffer,
                s = t.outputBuffer,
                n = e.numberOfChannels;
                for (let t = 0; t < n; t += 1) {
                  const n = e.getChannelData(t),
                  i = s.getChannelData(t);
                  v[t] = Ot(p, f, d, _, m, y[t], x[t], v[t], 32, n, i);
                }
              };
              const w = i.sampleRate / 2;
              return zt({
                get bufferSize() {
                  return u;
                },
                get channelCount() {
                  return g.channelCount;
                },
                set channelCount(t) {
                  g.channelCount = t;
                },
                get channelCountMode() {
                  return g.channelCountMode;
                },
                set channelCountMode(t) {
                  g.channelCountMode = t;
                },
                get channelInterpretation() {
                  return g.channelInterpretation;
                },
                set channelInterpretation(t) {
                  g.channelInterpretation = t;
                },
                get context() {
                  return g.context;
                },
                get inputs() {
                  return [g];
                },
                get numberOfInputs() {
                  return g.numberOfInputs;
                },
                get numberOfOutputs() {
                  return g.numberOfOutputs;
                },
                addEventListener: (...t) =>g.addEventListener(t[0], t[1], t[2]),
                dispatchEvent: (...t) =>g.dispatchEvent(t[0]),
                getFrequencyResponse(e, s, n) {
                  if (e.length !== s.length || s.length !== n.length) throw t();
                  const i = e.length;
                  for (let t = 0; t < i; t += 1) {
                    const i = - Math.PI * (e[t] / w),
                    o = [
                      Math.cos(i),
                      Math.sin(i)
                    ],
                    r = Ut(Gt(d, o), Gt(p, o));
                    s[t] = Math.sqrt(r[0] * r[0] + r[1] * r[1]),
                    n[t] = Math.atan2(r[1], r[0]);
                  }
                },
                removeEventListener: (...t) =>g.removeEventListener(t[0], t[1], t[2])
              }, g);
            }) (Ct, At, Qt, Zt),
            Cs = ((t, e, s, n) =>i=>t(Et, () =>Et(i)) ? Promise.resolve(t(n, n)).then(t=>{
              if (!t) {
                const t = s(i, 512, 0, 1);
                i.oncomplete = () =>{
                  t.onaudioprocess = null,
                  t.disconnect();
                },
                t.onaudioprocess = () =>i.currentTime,
                t.connect(i.destination);
              }
              return i.startRendering();
            }) : new Promise(t=>{
              const s = e(i, {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete',
                gain: 0
              });
              i.oncomplete = e=>{
                s.disconnect(),
                t(e.renderedBuffer);
              },
              s.connect(i.destination),
              i.startRendering();
            })) (ge, Bt, Qt, ((t, e) =>() =>{
              if (null === e) return Promise.resolve(!1);
              const s = new e(1, 1, 44100),
              n = t(s, {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete',
                gain: 0
              });
              return new Promise(t=>{
                s.oncomplete = () =>{
                  n.disconnect(),
                  t(0 !== s.currentTime);
                },
                s.startRendering();
              });
            }) (Bt, Ce)),
            Ds = ((t, e, s, n, i) =>(o, r) =>{
              const a = new WeakMap();
              let c = null;
              return {
                render(h, l) {
                  const u = a.get(l);
                  return void 0 !== u ? Promise.resolve(u) : (async(h, l) =>{
                    let u = null,
                    p = e(h);
                    const d = M(p, l);
                    if (void 0 === l.createIIRFilter ? u = t(l, {
                      buffer: null,
                      channelCount: 2,
                      channelCountMode: 'max',
                      channelInterpretation: 'speakers',
                      loop: !1,
                      loopEnd: 0,
                      loopStart: 0,
                      playbackRate: 1
                    }) : d || (p = l.createIIRFilter(r, o)), a.set(l, null === u ? p : u), null !== u) {
                      if (null === c) {
                        if (null === s) throw new Error('Missing the native OfflineAudioContext constructor.');
                        const t = new s(h.context.destination.channelCount, h.context.length, l.sampleRate);
                        c = (async() =>(await n(h, t, t.destination), ((t, e, s, n) =>{
                          const i = s instanceof Float64Array ? s : new Float64Array(s),
                          o = n instanceof Float64Array ? n : new Float64Array(n),
                          r = i.length,
                          a = o.length,
                          c = Math.min(r, a);
                          if (1 !== i[0]) {
                            for (let t = 0; t < r; t += 1) o[t] /= i[0];
                            for (let t = 1; t < a; t += 1) i[t] /= i[0];
                          }
                          const h = new Float32Array(32),
                          l = new Float32Array(32),
                          u = e.createBuffer(t.numberOfChannels, t.length, t.sampleRate),
                          p = t.numberOfChannels;
                          for (let e = 0; e < p; e += 1) {
                            const s = t.getChannelData(e),
                            n = u.getChannelData(e);
                            h.fill(0),
                            l.fill(0),
                            Ot(i, r, o, a, c, h, l, 0, 32, s, n);
                          }
                          return u;
                        }) (await i(t), l, o, r))) ();
                      }
                      const t = await c;
                      return u.buffer = t,
                      u.start(0),
                      u;
                    }
                    return await n(h, l, p),
                    p;
                  }) (h, l);
                }
              };
            }) (Ye, tt, Ce, Te, Cs),
            Os = (t=>(e, s, n) =>{
              if (void 0 === e.createIIRFilter) return t(e, s, n);
              const i = e.createIIRFilter(n.feedforward, n.feedback);
              return qt(i, n),
              i;
            }) (As),
            Ms = ((t, e, s, n, i, o) =>class extends t {
              constructor(t, r) {
                const a = n(t),
                c = i(a),
                h = {
                  ...Dt,
                  ...r
                },
                l = e(a, c ? null : t.baseLatency, h);
                super (t, !1, l, c ? s(h.feedback, h.feedforward) : null),
                (t=>{
                  var e;
                  t.getFrequencyResponse = (e = t.getFrequencyResponse, (s, n, i) =>{
                    if (s.length !== n.length || n.length !== i.length) throw Ct();
                    return e.call(t, s, n, i);
                  });
                }) (l),
                this._nativeIIRFilterNode = l,
                o(this, 1);
              }
              getFrequencyResponse(t, e, s) {
                return this._nativeIIRFilterNode.getFrequencyResponse(t, e, s);
              }
            }) (Ve, Os, Ds, ke, De, ns),
            Es = ((t, e, s, n, i, o, r, a) =>(c, h) =>{
              const l = h.listener,
              {
                forwardX: u,
                forwardY: p,
                forwardZ: d,
                positionX: f,
                positionY: _,
                positionZ: m,
                upX: g,
                upY: v,
                upZ: y
              }
              = void 0 === l.forwardX ? (() =>{
                const u = new Float32Array(1),
                p = e(h, {
                  channelCount: 1,
                  channelCountMode: 'explicit',
                  channelInterpretation: 'speakers',
                  numberOfInputs: 9
                }),
                d = r(h);
                let f = !1,
                _ = [
                  0,
                  0,
                  - 1,
                  0,
                  1,
                  0
                ],
                m = [
                  0,
                  0,
                  0
                ];
                const g = () =>{
                  if (f) return;
                  f = !0;
                  const t = n(h, 256, 9, 0);
                  t.onaudioprocess = ({
                    inputBuffer: t
                  }) =>{
                    const e = [
                      o(t, u, 0),
                      o(t, u, 1),
                      o(t, u, 2),
                      o(t, u, 3),
                      o(t, u, 4),
                      o(t, u, 5)
                    ];
                    e.some((t, e) =>t !== _[e]) && (l.setOrientation(...e), _ = e);
                    const s = [
                      o(t, u, 6),
                      o(t, u, 7),
                      o(t, u, 8)
                    ];
                    s.some((t, e) =>t !== m[e]) && (l.setPosition(...s), m = s);
                  },
                  p.connect(t);
                },
                v = t=>e=>{
                  e !== _[t] && (_[t] = e, l.setOrientation(..._));
                },
                y = t=>e=>{
                  e !== m[t] && (m[t] = e, l.setPosition(...m));
                },
                x = (e, n, o) =>{
                  const r = s(h, {
                    channelCount: 1,
                    channelCountMode: 'explicit',
                    channelInterpretation: 'discrete',
                    offset: n
                  });
                  r.connect(p, 0, e),
                  r.start(),
                  Object.defineProperty(r.offset, 'defaultValue', {
                    get: () =>n
                  });
                  const l = t({
                    context: c
                  }, d, r.offset, V, I);
                  var u,
                  f,
                  _,
                  m,
                  v,
                  y,
                  x;
                  return a(l, 'value', t=>() =>t.call(l), t=>e=>{
                    try {
                      t.call(l, e);
                    } catch (t) {
                      if (9 !== t.code) throw t;
                    }
                    g(),
                    d && o(e);
                  }),
                  l.cancelAndHoldAtTime = (u = l.cancelAndHoldAtTime, d ? () =>{
                    throw i();
                  }
                   : (...t) =>{
                    const e = u.apply(l, t);
                    return g(),
                    e;
                  }),
                  l.cancelScheduledValues = (f = l.cancelScheduledValues, d ? () =>{
                    throw i();
                  }
                   : (...t) =>{
                    const e = f.apply(l, t);
                    return g(),
                    e;
                  }),
                  l.exponentialRampToValueAtTime = (_ = l.exponentialRampToValueAtTime, d ? () =>{
                    throw i();
                  }
                   : (...t) =>{
                    const e = _.apply(l, t);
                    return g(),
                    e;
                  }),
                  l.linearRampToValueAtTime = (m = l.linearRampToValueAtTime, d ? () =>{
                    throw i();
                  }
                   : (...t) =>{
                    const e = m.apply(l, t);
                    return g(),
                    e;
                  }),
                  l.setTargetAtTime = (v = l.setTargetAtTime, d ? () =>{
                    throw i();
                  }
                   : (...t) =>{
                    const e = v.apply(l, t);
                    return g(),
                    e;
                  }),
                  l.setValueAtTime = (y = l.setValueAtTime, d ? () =>{
                    throw i();
                  }
                   : (...t) =>{
                    const e = y.apply(l, t);
                    return g(),
                    e;
                  }),
                  l.setValueCurveAtTime = (x = l.setValueCurveAtTime, d ? () =>{
                    throw i();
                  }
                   : (...t) =>{
                    const e = x.apply(l, t);
                    return g(),
                    e;
                  }),
                  l;
                };
                return {
                  forwardX: x(0, 0, v(0)),
                  forwardY: x(1, 0, v(1)),
                  forwardZ: x(2, - 1, v(2)),
                  positionX: x(6, 0, y(0)),
                  positionY: x(7, 0, y(1)),
                  positionZ: x(8, 0, y(2)),
                  upX: x(3, 0, v(3)),
                  upY: x(4, 1, v(4)),
                  upZ: x(5, 0, v(5))
                };
              }) () : l;
              return {
                get forwardX() {
                  return u;
                },
                get forwardY() {
                  return p;
                },
                get forwardZ() {
                  return d;
                },
                get positionX() {
                  return f;
                },
                get positionY() {
                  return _;
                },
                get positionZ() {
                  return m;
                },
                get upX() {
                  return g;
                },
                get upY() {
                  return v;
                },
                get upZ() {
                  return y;
                }
              };
            }) (Je, as, ds, Qt, Zt, ee, De, ne),
            Rs = new WeakMap(),
            qs = ((t, e, s, n, i, o) =>class extends s {
              constructor(s, o) {
                super (s),
                this._nativeContext = s,
                u.set(this, s),
                n(s) && i.set(s, new Set()),
                this._destination = new t(this, o),
                this._listener = e(this, s),
                this._onstatechange = null;
              }
              get currentTime() {
                return this._nativeContext.currentTime;
              }
              get destination() {
                return this._destination;
              }
              get listener() {
                return this._listener;
              }
              get onstatechange() {
                return this._onstatechange;
              }
              set onstatechange(t) {
                const e = 'function' == typeof t ? o(this, t) : null;
                this._nativeContext.onstatechange = e;
                const s = this._nativeContext.onstatechange;
                this._onstatechange = null !== s && s === e ? t : s;
              }
              get sampleRate() {
                return this._nativeContext.sampleRate;
              }
              get state() {
                return this._nativeContext.state;
              }
            }) (es, Es, Me, De, Rs, ue),
            Fs = ((t, e, s, n, i, o) =>(r, a) =>{
              const c = r.createOscillator();
              return qt(c, a),
              It(c, a, 'detune'),
              It(c, a, 'frequency'),
              void 0 !== a.periodicWave ? c.setPeriodicWave(a.periodicWave) : Rt(c, a, 'type'),
              e(s, () =>s(r)) || Vt(c),
              e(n, () =>n(r)) || o(c, r),
              e(i, () =>i(r)) || Nt(c),
              t(r, c),
              c;
            }) (Qe, ge, oe, re, ae, le),
            Is = ((t, e, s, n, i) =>() =>{
              const o = new WeakMap();
              let r = null,
              a = null,
              c = null;
              return {
                set periodicWave(t) {
                  r = t;
                },
                set start(t) {
                  a = t;
                },
                set stop(t) {
                  c = t;
                },
                render(h, l) {
                  const u = o.get(l);
                  return void 0 !== u ? Promise.resolve(u) : (async(h, l) =>{
                    let u = s(h);
                    const p = M(u, l);
                    if (!p) {
                      const t = {
                        channelCount: u.channelCount,
                        channelCountMode: u.channelCountMode,
                        channelInterpretation: u.channelInterpretation,
                        detune: u.detune.value,
                        frequency: u.frequency.value,
                        periodicWave: null === r ? void 0 : r,
                        type: u.type
                      };
                      u = e(l, t),
                      null !== a && u.start(a),
                      null !== c && u.stop(c);
                    }
                    return o.set(l, u),
                    p ? (await t(l, h.detune, u.detune), await t(l, h.frequency, u.frequency)) : (await n(l, h.detune, u.detune), await n(l, h.frequency, u.frequency)),
                    await i(h, l, u),
                    u;
                  }) (h, l);
                }
              };
            }) (Xe, Fs, tt, $e, Te),
            Vs = ((t, e, s, n, i, o, r) =>class extends t {
              constructor(t, r) {
                const a = i(t),
                c = {
                  ...Yt,
                  ...r
                },
                h = s(a, c),
                l = o(a),
                u = l ? n() : null,
                p = t.sampleRate / 2;
                super (t, !1, h, u),
                this._detune = e(this, l, h.detune, 153600, - 153600),
                this._frequency = e(this, l, h.frequency, p, - p),
                this._nativeOscillatorNode = h,
                this._onended = null,
                this._oscillatorNodeRenderer = u,
                null !== this._oscillatorNodeRenderer && void 0 !== c.periodicWave && (this._oscillatorNodeRenderer.periodicWave = c.periodicWave);
              }
              get detune() {
                return this._detune;
              }
              get frequency() {
                return this._frequency;
              }
              get onended() {
                return this._onended;
              }
              set onended(t) {
                const e = 'function' == typeof t ? r(this, t) : null;
                this._nativeOscillatorNode.onended = e;
                const s = this._nativeOscillatorNode.onended;
                this._onended = null !== s && s === e ? t : s;
              }
              get type() {
                return this._nativeOscillatorNode.type;
              }
              set type(t) {
                this._nativeOscillatorNode.type = t,
                null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = null);
              }
              setPeriodicWave(t) {
                this._nativeOscillatorNode.setPeriodicWave(t),
                null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = t);
              }
              start(t = 0) {
                if (this._nativeOscillatorNode.start(t), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.start = t), 'closed' !== this.context.state) {
                  k(this);
                  const t = () =>{
                    this._nativeOscillatorNode.removeEventListener('ended', t),
                    N(this) && C(this);
                  };
                  this._nativeOscillatorNode.addEventListener('ended', t);
                }
              }
              stop(t = 0) {
                this._nativeOscillatorNode.stop(t),
                null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.stop = t);
              }
            }) (Ve, Je, Fs, Is, ke, De, ue),
            Ns = (t=>(e, s) =>{
              const n = t(e, {
                buffer: null,
                channelCount: 2,
                channelCountMode: 'max',
                channelInterpretation: 'speakers',
                loop: !1,
                loopEnd: 0,
                loopStart: 0,
                playbackRate: 1
              }),
              i = e.createBuffer(1, 2, 44100);
              return n.buffer = i,
              n.loop = !0,
              n.connect(s),
              n.start(),
              () =>{
                n.stop(),
                n.disconnect(s);
              };
            }) (Ye),
            Ps = ((t, e, s, n, i) =>(o, {
              curve: r,
              oversample: a,
              ...c
            }) =>{
              const h = o.createWaveShaper(),
              l = o.createWaveShaper();
              qt(h, c),
              qt(l, c);
              const u = s(o, {
                ...c,
                gain: 1
              }),
              p = s(o, {
                ...c,
                gain: - 1
              }),
              d = s(o, {
                ...c,
                gain: 1
              }),
              f = s(o, {
                ...c,
                gain: - 1
              });
              let _ = null,
              m = !1,
              g = null;
              const v = {
                get bufferSize() {
                },
                get channelCount() {
                  return h.channelCount;
                },
                set channelCount(t) {
                  u.channelCount = t,
                  p.channelCount = t,
                  h.channelCount = t,
                  d.channelCount = t,
                  l.channelCount = t,
                  f.channelCount = t;
                },
                get channelCountMode() {
                  return h.channelCountMode;
                },
                set channelCountMode(t) {
                  u.channelCountMode = t,
                  p.channelCountMode = t,
                  h.channelCountMode = t,
                  d.channelCountMode = t,
                  l.channelCountMode = t,
                  f.channelCountMode = t;
                },
                get channelInterpretation() {
                  return h.channelInterpretation;
                },
                set channelInterpretation(t) {
                  u.channelInterpretation = t,
                  p.channelInterpretation = t,
                  h.channelInterpretation = t,
                  d.channelInterpretation = t,
                  l.channelInterpretation = t,
                  f.channelInterpretation = t;
                },
                get context() {
                  return h.context;
                },
                get curve() {
                  return g;
                },
                set curve(s) {
                  if (null !== s && s.length < 2) throw e();
                  if (null === s) h.curve = s,
                  l.curve = s;
                   else {
                    const t = s.length,
                    e = new Float32Array(t + 2 - t % 2),
                    n = new Float32Array(t + 2 - t % 2);
                    e[0] = s[0],
                    n[0] = - s[t - 1];
                    const i = Math.ceil((t + 1) / 2),
                    o = (t + 1) / 2 - 1;
                    for (let r = 1; r < i; r += 1) {
                      const a = r / i * o,
                      c = Math.floor(a),
                      h = Math.ceil(a);
                      e[r] = c === h ? s[c] : (1 - (a - c)) * s[c] + (1 - (h - a)) * s[h],
                      n[r] = c === h ? - s[t - 1 - c] : - (1 - (a - c)) * s[t - 1 - c] - (1 - (h - a)) * s[t - 1 - h];
                    }
                    e[i] = t % 2 == 1 ? s[i - 1] : (s[i - 2] + s[i - 1]) / 2,
                    h.curve = e,
                    l.curve = n;
                  }
                  g = s,
                  m && (n(g) && null === _ ? _ = t(o, u) : null !== _ && (_(), _ = null));
                },
                get inputs() {
                  return [u];
                },
                get numberOfInputs() {
                  return h.numberOfInputs;
                },
                get numberOfOutputs() {
                  return h.numberOfOutputs;
                },
                get oversample() {
                  return h.oversample;
                },
                set oversample(t) {
                  h.oversample = t,
                  l.oversample = t;
                },
                addEventListener: (...t) =>u.addEventListener(t[0], t[1], t[2]),
                dispatchEvent: (...t) =>u.dispatchEvent(t[0]),
                removeEventListener: (...t) =>u.removeEventListener(t[0], t[1], t[2])
              };
              return null !== r && (v.curve = r instanceof Float32Array ? r : new Float32Array(r)),
              a !== v.oversample && (v.oversample = a),
              i(zt(v, d), () =>{
                u.connect(h).connect(d),
                u.connect(p).connect(l).connect(f).connect(d),
                m = !0,
                n(g) && (_ = t(o, u));
              }, () =>{
                u.disconnect(h),
                h.disconnect(d),
                u.disconnect(p),
                p.disconnect(l),
                l.disconnect(f),
                f.disconnect(d),
                m = !1,
                null !== _ && (_(), _ = null);
              });
            }) (Ns, At, Bt, se, os),
            js = ((t, e, s, n, i, o, r) =>(a, c) =>{
              const h = a.createWaveShaper();
              if (null !== o && 'webkitAudioContext' === o.name && void 0 === a.createGain().gain.automationRate) return s(a, c);
              qt(h, c);
              const l = null === c.curve || c.curve instanceof Float32Array ? c.curve : new Float32Array(c.curve);
              if (null !== l && l.length < 2) throw e();
              Rt(h, {
                curve: l
              }, 'curve'),
              Rt(h, c, 'oversample');
              let u = null,
              p = !1;
              return r(h, 'curve', t=>() =>t.call(h), e=>s=>(e.call(h, s), p && (n(s) && null === u ? u = t(a, h) : n(s) || null === u || (u(), u = null)), s)),
              i(h, () =>{
                p = !0,
                n(h.curve) && (u = t(a, h));
              }, () =>{
                p = !1,
                null !== u && (u(), u = null);
              });
            }) (Ns, At, Ps, se, os, Ee, ne),
            Ls = ((t, e, s, n, i, o, r, a, c, h) =>(l, {
              coneInnerAngle: u,
              coneOuterAngle: p,
              coneOuterGain: d,
              distanceModel: f,
              maxDistance: _,
              orientationX: m,
              orientationY: g,
              orientationZ: v,
              panningModel: y,
              positionX: x,
              positionY: w,
              positionZ: b,
              refDistance: T,
              rolloffFactor: S,
              ...k
            }) =>{
              const A = l.createPanner();
              if (k.channelCount > 2) throw r();
              if ('max' === k.channelCountMode) throw r();
              qt(A, k);
              const C = {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete'
              },
              D = s(l, {
                ...C,
                channelInterpretation: 'speakers',
                numberOfInputs: 6
              }),
              O = n(l, {
                ...k,
                gain: 1
              }),
              M = n(l, {
                ...C,
                gain: 1
              }),
              E = n(l, {
                ...C,
                gain: 0
              }),
              R = n(l, {
                ...C,
                gain: 0
              }),
              q = n(l, {
                ...C,
                gain: 0
              }),
              F = n(l, {
                ...C,
                gain: 0
              }),
              I = n(l, {
                ...C,
                gain: 0
              }),
              V = i(l, 256, 6, 1),
              N = o(l, {
                ...C,
                curve: new Float32Array([1,
                1]),
                oversample: 'none'
              });
              let P = [
                m,
                g,
                v
              ],
              j = [
                x,
                w,
                b
              ];
              const L = new Float32Array(1);
              V.onaudioprocess = ({
                inputBuffer: t
              }) =>{
                const e = [
                  c(t, L, 0),
                  c(t, L, 1),
                  c(t, L, 2)
                ];
                e.some((t, e) =>t !== P[e]) && (A.setOrientation(...e), P = e);
                const s = [
                  c(t, L, 3),
                  c(t, L, 4),
                  c(t, L, 5)
                ];
                s.some((t, e) =>t !== j[e]) && (A.setPosition(...s), j = s);
              },
              Object.defineProperty(E.gain, 'defaultValue', {
                get: () =>0
              }),
              Object.defineProperty(R.gain, 'defaultValue', {
                get: () =>0
              }),
              Object.defineProperty(q.gain, 'defaultValue', {
                get: () =>0
              }),
              Object.defineProperty(F.gain, 'defaultValue', {
                get: () =>0
              }),
              Object.defineProperty(I.gain, 'defaultValue', {
                get: () =>0
              });
              const z = {
                get bufferSize() {
                },
                get channelCount() {
                  return A.channelCount;
                },
                set channelCount(t) {
                  if (t > 2) throw r();
                  O.channelCount = t,
                  A.channelCount = t;
                },
                get channelCountMode() {
                  return A.channelCountMode;
                },
                set channelCountMode(t) {
                  if ('max' === t) throw r();
                  O.channelCountMode = t,
                  A.channelCountMode = t;
                },
                get channelInterpretation() {
                  return A.channelInterpretation;
                },
                set channelInterpretation(t) {
                  O.channelInterpretation = t,
                  A.channelInterpretation = t;
                },
                get coneInnerAngle() {
                  return A.coneInnerAngle;
                },
                set coneInnerAngle(t) {
                  A.coneInnerAngle = t;
                },
                get coneOuterAngle() {
                  return A.coneOuterAngle;
                },
                set coneOuterAngle(t) {
                  A.coneOuterAngle = t;
                },
                get coneOuterGain() {
                  return A.coneOuterGain;
                },
                set coneOuterGain(t) {
                  if (t < 0 || t > 1) throw e();
                  A.coneOuterGain = t;
                },
                get context() {
                  return A.context;
                },
                get distanceModel() {
                  return A.distanceModel;
                },
                set distanceModel(t) {
                  A.distanceModel = t;
                },
                get inputs() {
                  return [O];
                },
                get maxDistance() {
                  return A.maxDistance;
                },
                set maxDistance(t) {
                  if (t < 0) throw new RangeError();
                  A.maxDistance = t;
                },
                get numberOfInputs() {
                  return A.numberOfInputs;
                },
                get numberOfOutputs() {
                  return A.numberOfOutputs;
                },
                get orientationX() {
                  return M.gain;
                },
                get orientationY() {
                  return E.gain;
                },
                get orientationZ() {
                  return R.gain;
                },
                get panningModel() {
                  return A.panningModel;
                },
                set panningModel(t) {
                  A.panningModel = t;
                },
                get positionX() {
                  return q.gain;
                },
                get positionY() {
                  return F.gain;
                },
                get positionZ() {
                  return I.gain;
                },
                get refDistance() {
                  return A.refDistance;
                },
                set refDistance(t) {
                  if (t < 0) throw new RangeError();
                  A.refDistance = t;
                },
                get rolloffFactor() {
                  return A.rolloffFactor;
                },
                set rolloffFactor(t) {
                  if (t < 0) throw new RangeError();
                  A.rolloffFactor = t;
                },
                addEventListener: (...t) =>O.addEventListener(t[0], t[1], t[2]),
                dispatchEvent: (...t) =>O.dispatchEvent(t[0]),
                removeEventListener: (...t) =>O.removeEventListener(t[0], t[1], t[2])
              };
              return u !== z.coneInnerAngle && (z.coneInnerAngle = u),
              p !== z.coneOuterAngle && (z.coneOuterAngle = p),
              d !== z.coneOuterGain && (z.coneOuterGain = d),
              f !== z.distanceModel && (z.distanceModel = f),
              _ !== z.maxDistance && (z.maxDistance = _),
              m !== z.orientationX.value && (z.orientationX.value = m),
              g !== z.orientationY.value && (z.orientationY.value = g),
              v !== z.orientationZ.value && (z.orientationZ.value = v),
              y !== z.panningModel && (z.panningModel = y),
              x !== z.positionX.value && (z.positionX.value = x),
              w !== z.positionY.value && (z.positionY.value = w),
              b !== z.positionZ.value && (z.positionZ.value = b),
              T !== z.refDistance && (z.refDistance = T),
              S !== z.rolloffFactor && (z.rolloffFactor = S),
              1 === P[0] && 0 === P[1] && 0 === P[2] || A.setOrientation(...P),
              0 === j[0] && 0 === j[1] && 0 === j[2] || A.setPosition(...j),
              h(zt(z, A), () =>{
                O.connect(A),
                t(O, N, 0, 0),
                N.connect(M).connect(D, 0, 0),
                N.connect(E).connect(D, 0, 1),
                N.connect(R).connect(D, 0, 2),
                N.connect(q).connect(D, 0, 3),
                N.connect(F).connect(D, 0, 4),
                N.connect(I).connect(D, 0, 5),
                D.connect(V).connect(l.destination);
              }, () =>{
                O.disconnect(A),
                a(O, N, 0, 0),
                N.disconnect(M),
                M.disconnect(D),
                N.disconnect(E),
                E.disconnect(D),
                N.disconnect(R),
                R.disconnect(D),
                N.disconnect(q),
                q.disconnect(D),
                N.disconnect(F),
                F.disconnect(D),
                N.disconnect(I),
                I.disconnect(D),
                D.disconnect(V),
                V.disconnect(l.destination);
              });
            }) (Y, At, as, Bt, Qt, js, Zt, K, ee, os),
            zs = (t=>(e, s) =>{
              const n = e.createPanner();
              return void 0 === n.orientationX ? t(e, s) : (qt(n, s), It(n, s, 'orientationX'), It(n, s, 'orientationY'), It(n, s, 'orientationZ'), It(n, s, 'positionX'), It(n, s, 'positionY'), It(n, s, 'positionZ'), Rt(n, s, 'coneInnerAngle'), Rt(n, s, 'coneOuterAngle'), Rt(n, s, 'coneOuterGain'), Rt(n, s, 'distanceModel'), Rt(n, s, 'maxDistance'), Rt(n, s, 'panningModel'), Rt(n, s, 'refDistance'), Rt(n, s, 'rolloffFactor'), n);
            }) (Ls),
            Ws = ((t, e, s, n, i, o, r, a, c, h) =>() =>{
              const l = new WeakMap();
              let u = null;
              return {
                render(p, d) {
                  const f = l.get(d);
                  return void 0 !== f ? Promise.resolve(f) : (async(p, d) =>{
                    let f = null,
                    _ = o(p);
                    const m = {
                      channelCount: _.channelCount,
                      channelCountMode: _.channelCountMode,
                      channelInterpretation: _.channelInterpretation
                    },
                    g = {
                      ...m,
                      coneInnerAngle: _.coneInnerAngle,
                      coneOuterAngle: _.coneOuterAngle,
                      coneOuterGain: _.coneOuterGain,
                      distanceModel: _.distanceModel,
                      maxDistance: _.maxDistance,
                      panningModel: _.panningModel,
                      refDistance: _.refDistance,
                      rolloffFactor: _.rolloffFactor
                    },
                    v = M(_, d);
                    if ('bufferSize' in _) f = n(d, {
                      ...m,
                      gain: 1
                    });
                     else if (!v) {
                      const t = {
                        ...g,
                        orientationX: _.orientationX.value,
                        orientationY: _.orientationY.value,
                        orientationZ: _.orientationZ.value,
                        positionX: _.positionX.value,
                        positionY: _.positionY.value,
                        positionZ: _.positionZ.value
                      };
                      _ = i(d, t);
                    }
                    if (l.set(d, null === f ? _ : f), null !== f) {
                      if (null === u) {
                        if (null === r) throw new Error('Missing the native OfflineAudioContext constructor.');
                        const t = new r(6, p.context.length, d.sampleRate),
                        n = e(t, {
                          channelCount: 1,
                          channelCountMode: 'explicit',
                          channelInterpretation: 'speakers',
                          numberOfInputs: 6
                        });
                        n.connect(t.destination),
                        u = (async() =>{
                          const e = await Promise.all([p.orientationX,
                          p.orientationY,
                          p.orientationZ,
                          p.positionX,
                          p.positionY,
                          p.positionZ].map(async(e, n) =>{
                            const i = s(t, {
                              channelCount: 1,
                              channelCountMode: 'explicit',
                              channelInterpretation: 'discrete',
                              offset: 0 === n ? 1 : 0
                            });
                            return await a(t, e, i.offset),
                            i;
                          }));
                          for (let t = 0; t < 6; t += 1) e[t].connect(n, 0, t),
                          e[t].start(0);
                          return h(t);
                        }) ();
                      }
                      const t = await u,
                      o = n(d, {
                        ...m,
                        gain: 1
                      });
                      await c(p, d, o);
                      const l = [
                      ];
                      for (let e = 0; e < t.numberOfChannels; e += 1) l.push(t.getChannelData(e));
                      let _ = [
                        l[0][0],
                        l[1][0],
                        l[2][0]
                      ],
                      v = [
                        l[3][0],
                        l[4][0],
                        l[5][0]
                      ],
                      y = n(d, {
                        ...m,
                        gain: 1
                      }),
                      x = i(d, {
                        ...g,
                        orientationX: _[0],
                        orientationY: _[1],
                        orientationZ: _[2],
                        positionX: v[0],
                        positionY: v[1],
                        positionZ: v[2]
                      });
                      o.connect(y).connect(x.inputs[0]),
                      x.connect(f);
                      for (let e = 128; e < t.length; e += 128) {
                        const t = [
                          l[0][e],
                          l[1][e],
                          l[2][e]
                        ],
                        s = [
                          l[3][e],
                          l[4][e],
                          l[5][e]
                        ];
                        if (t.some((t, e) =>t !== _[e]) || s.some((t, e) =>t !== v[e])) {
                          _ = t,
                          v = s;
                          const r = e / d.sampleRate;
                          y.gain.setValueAtTime(0, r),
                          y = n(d, {
                            ...m,
                            gain: 0
                          }),
                          x = i(d, {
                            ...g,
                            orientationX: _[0],
                            orientationY: _[1],
                            orientationZ: _[2],
                            positionX: v[0],
                            positionY: v[1],
                            positionZ: v[2]
                          }),
                          y.gain.setValueAtTime(1, r),
                          o.connect(y).connect(x.inputs[0]),
                          x.connect(f);
                        }
                      }
                      return f;
                    }
                    return v ? (await t(d, p.orientationX, _.orientationX), await t(d, p.orientationY, _.orientationY), await t(d, p.orientationZ, _.orientationZ), await t(d, p.positionX, _.positionX), await t(d, p.positionY, _.positionY), await t(d, p.positionZ, _.positionZ)) : (await a(d, p.orientationX, _.orientationX), await a(d, p.orientationY, _.orientationY), await a(d, p.orientationZ, _.orientationZ), await a(d, p.positionX, _.positionX), await a(d, p.positionY, _.positionY), await a(d, p.positionZ, _.positionZ)),
                    X(_) ? await c(p, d, _.inputs[0]) : await c(p, d, _),
                    _;
                  }) (p, d);
                }
              };
            }) (Xe, as, ds, Bt, zs, tt, Ce, $e, Te, Cs),
            Bs = ((t, e, s, n, i, o, r) =>class extends t {
              constructor(t, a) {
                const c = i(t),
                h = {
                  ...$t,
                  ...a
                },
                l = s(c, h),
                u = o(c);
                super (t, !1, l, u ? n() : null),
                this._nativePannerNode = l,
                this._orientationX = e(this, u, l.orientationX, V, I),
                this._orientationY = e(this, u, l.orientationY, V, I),
                this._orientationZ = e(this, u, l.orientationZ, V, I),
                this._positionX = e(this, u, l.positionX, V, I),
                this._positionY = e(this, u, l.positionY, V, I),
                this._positionZ = e(this, u, l.positionZ, V, I),
                r(this, 1);
              }
              get coneInnerAngle() {
                return this._nativePannerNode.coneInnerAngle;
              }
              set coneInnerAngle(t) {
                this._nativePannerNode.coneInnerAngle = t;
              }
              get coneOuterAngle() {
                return this._nativePannerNode.coneOuterAngle;
              }
              set coneOuterAngle(t) {
                this._nativePannerNode.coneOuterAngle = t;
              }
              get coneOuterGain() {
                return this._nativePannerNode.coneOuterGain;
              }
              set coneOuterGain(t) {
                this._nativePannerNode.coneOuterGain = t;
              }
              get distanceModel() {
                return this._nativePannerNode.distanceModel;
              }
              set distanceModel(t) {
                this._nativePannerNode.distanceModel = t;
              }
              get maxDistance() {
                return this._nativePannerNode.maxDistance;
              }
              set maxDistance(t) {
                this._nativePannerNode.maxDistance = t;
              }
              get orientationX() {
                return this._orientationX;
              }
              get orientationY() {
                return this._orientationY;
              }
              get orientationZ() {
                return this._orientationZ;
              }
              get panningModel() {
                return this._nativePannerNode.panningModel;
              }
              set panningModel(t) {
                this._nativePannerNode.panningModel = t;
              }
              get positionX() {
                return this._positionX;
              }
              get positionY() {
                return this._positionY;
              }
              get positionZ() {
                return this._positionZ;
              }
              get refDistance() {
                return this._nativePannerNode.refDistance;
              }
              set refDistance(t) {
                this._nativePannerNode.refDistance = t;
              }
              get rolloffFactor() {
                return this._nativePannerNode.rolloffFactor;
              }
              set rolloffFactor(t) {
                this._nativePannerNode.rolloffFactor = t;
              }
            }) (Ve, Je, zs, Ws, ke, De, ns),
            Us = (t=>(e, {
              disableNormalization: s,
              imag: n,
              real: i
            }) =>{
              const o = n instanceof Float32Array ? n : new Float32Array(n),
              r = i instanceof Float32Array ? i : new Float32Array(i),
              a = e.createPeriodicWave(r, o, {
                disableNormalization: s
              });
              if (Array.from(n).length < 2) throw t();
              return a;
            }) (R),
            Gs = ((t, e, s, n) =>class n {
              constructor(n, i) {
                const o = e(n),
                r = (t=>{
                  const {
                    imag: e,
                    real: s
                  }
                  = t;
                  return void 0 === e ? void 0 === s ? {
                    ...t,
                    imag: [
                      0,
                      0
                    ],
                    real: [
                      0,
                      0
                    ]
                  }
                   : {
                    ...t,
                    imag: Array.from(s, () =>0),
                    real: s
                  }
                   : void 0 === s ? {
                    ...t,
                    imag: e,
                    real: Array.from(e, () =>0)
                  }
                   : {
                    ...t,
                    imag: e,
                    real: s
                  };
                }) ({
                  ...Ht,
                  ...i
                }),
                a = t(o, r);
                return s.add(a),
                a;
              }
              static[Symbol.hasInstance](t) {
                return null !== t && 'object' == typeof t && Object.getPrototypeOf(t) === n.prototype || s.has(t);
              }
            }) (Us, ke, new WeakSet()),
            Qs = ((t, e, s, n, i, o) =>{
              const r = 16385,
              a = new Float32Array([1,
              1]),
              c = Math.PI / 2,
              h = {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete'
              },
              l = {
                ...h,
                oversample: 'none'
              },
              u = (t, o, u, p, d) =>{
                if (1 === o) return ((t, e, i, o) =>{
                  const u = new Float32Array(r),
                  p = new Float32Array(r);
                  for (let t = 0; t < r; t += 1) {
                    const e = t / 16384 * c;
                    u[t] = Math.cos(e),
                    p[t] = Math.sin(e);
                  }
                  const d = s(t, {
                    ...h,
                    gain: 0
                  }),
                  f = n(t, {
                    ...l,
                    curve: u
                  }),
                  _ = n(t, {
                    ...l,
                    curve: a
                  }),
                  m = s(t, {
                    ...h,
                    gain: 0
                  }),
                  g = n(t, {
                    ...l,
                    curve: p
                  });
                  return {
                    connectGraph() {
                      e.connect(d),
                      e.connect(void 0 === _.inputs ? _ : _.inputs[0]),
                      e.connect(m),
                      _.connect(i),
                      i.connect(void 0 === f.inputs ? f : f.inputs[0]),
                      i.connect(void 0 === g.inputs ? g : g.inputs[0]),
                      f.connect(d.gain),
                      g.connect(m.gain),
                      d.connect(o, 0, 0),
                      m.connect(o, 0, 1);
                    },
                    disconnectGraph() {
                      e.disconnect(d),
                      e.disconnect(void 0 === _.inputs ? _ : _.inputs[0]),
                      e.disconnect(m),
                      _.disconnect(i),
                      i.disconnect(void 0 === f.inputs ? f : f.inputs[0]),
                      i.disconnect(void 0 === g.inputs ? g : g.inputs[0]),
                      f.disconnect(d.gain),
                      g.disconnect(m.gain),
                      d.disconnect(o, 0, 0),
                      m.disconnect(o, 0, 1);
                    }
                  };
                }) (t, u, p, d);
                if (2 === o) return ((t, i, o, u) =>{
                  const p = new Float32Array(r),
                  d = new Float32Array(r),
                  f = new Float32Array(r),
                  _ = new Float32Array(r),
                  m = Math.floor(8192.5);
                  for (let t = 0; t < r; t += 1) if (t > m) {
                    const e = (t - m) / (16384 - m) * c;
                    p[t] = Math.cos(e),
                    d[t] = Math.sin(e),
                    f[t] = 0,
                    _[t] = 1;
                  } else {
                    const e = t / (16384 - m) * c;
                    p[t] = 1,
                    d[t] = 0,
                    f[t] = Math.cos(e),
                    _[t] = Math.sin(e);
                  }
                  const g = e(t, {
                    channelCount: 2,
                    channelCountMode: 'explicit',
                    channelInterpretation: 'discrete',
                    numberOfOutputs: 2
                  }),
                  v = s(t, {
                    ...h,
                    gain: 0
                  }),
                  y = n(t, {
                    ...l,
                    curve: p
                  }),
                  x = s(t, {
                    ...h,
                    gain: 0
                  }),
                  w = n(t, {
                    ...l,
                    curve: d
                  }),
                  b = n(t, {
                    ...l,
                    curve: a
                  }),
                  T = s(t, {
                    ...h,
                    gain: 0
                  }),
                  S = n(t, {
                    ...l,
                    curve: f
                  }),
                  k = s(t, {
                    ...h,
                    gain: 0
                  }),
                  A = n(t, {
                    ...l,
                    curve: _
                  });
                  return {
                    connectGraph() {
                      i.connect(g),
                      i.connect(void 0 === b.inputs ? b : b.inputs[0]),
                      g.connect(v, 0),
                      g.connect(x, 0),
                      g.connect(T, 1),
                      g.connect(k, 1),
                      b.connect(o),
                      o.connect(void 0 === y.inputs ? y : y.inputs[0]),
                      o.connect(void 0 === w.inputs ? w : w.inputs[0]),
                      o.connect(void 0 === S.inputs ? S : S.inputs[0]),
                      o.connect(void 0 === A.inputs ? A : A.inputs[0]),
                      y.connect(v.gain),
                      w.connect(x.gain),
                      S.connect(T.gain),
                      A.connect(k.gain),
                      v.connect(u, 0, 0),
                      T.connect(u, 0, 0),
                      x.connect(u, 0, 1),
                      k.connect(u, 0, 1);
                    },
                    disconnectGraph() {
                      i.disconnect(g),
                      i.disconnect(void 0 === b.inputs ? b : b.inputs[0]),
                      g.disconnect(v, 0),
                      g.disconnect(x, 0),
                      g.disconnect(T, 1),
                      g.disconnect(k, 1),
                      b.disconnect(o),
                      o.disconnect(void 0 === y.inputs ? y : y.inputs[0]),
                      o.disconnect(void 0 === w.inputs ? w : w.inputs[0]),
                      o.disconnect(void 0 === S.inputs ? S : S.inputs[0]),
                      o.disconnect(void 0 === A.inputs ? A : A.inputs[0]),
                      y.disconnect(v.gain),
                      w.disconnect(x.gain),
                      S.disconnect(T.gain),
                      A.disconnect(k.gain),
                      v.disconnect(u, 0, 0),
                      T.disconnect(u, 0, 0),
                      x.disconnect(u, 0, 1),
                      k.disconnect(u, 0, 1);
                    }
                  };
                }) (t, u, p, d);
                throw i();
              };
              return (e, {
                channelCount: n,
                channelCountMode: r,
                pan: a,
                ...c
              }) =>{
                if ('max' === r) throw i();
                const h = t(e, {
                  ...c,
                  channelCount: 1,
                  channelCountMode: r,
                  numberOfInputs: 2
                }),
                l = s(e, {
                  ...c,
                  channelCount: n,
                  channelCountMode: r,
                  gain: 1
                }),
                p = s(e, {
                  channelCount: 1,
                  channelCountMode: 'explicit',
                  channelInterpretation: 'discrete',
                  gain: a
                });
                let {
                  connectGraph: d,
                  disconnectGraph: f
                }
                = u(e, n, l, p, h);
                Object.defineProperty(p.gain, 'defaultValue', {
                  get: () =>0
                }),
                Object.defineProperty(p.gain, 'maxValue', {
                  get: () =>1
                }),
                Object.defineProperty(p.gain, 'minValue', {
                  get: () => - 1
                });
                const _ = {
                  get bufferSize() {
                  },
                  get channelCount() {
                    return l.channelCount;
                  },
                  set channelCount(t) {
                    l.channelCount !== t && (m && f(), ({
                      connectGraph: d,
                      disconnectGraph: f
                    }
                    = u(e, t, l, p, h)), m && d()),
                    l.channelCount = t;
                  },
                  get channelCountMode() {
                    return l.channelCountMode;
                  },
                  set channelCountMode(t) {
                    if ('clamped-max' === t || 'max' === t) throw i();
                    l.channelCountMode = t;
                  },
                  get channelInterpretation() {
                    return l.channelInterpretation;
                  },
                  set channelInterpretation(t) {
                    l.channelInterpretation = t;
                  },
                  get context() {
                    return l.context;
                  },
                  get inputs() {
                    return [l];
                  },
                  get numberOfInputs() {
                    return l.numberOfInputs;
                  },
                  get numberOfOutputs() {
                    return l.numberOfOutputs;
                  },
                  get pan() {
                    return p.gain;
                  },
                  addEventListener: (...t) =>l.addEventListener(t[0], t[1], t[2]),
                  dispatchEvent: (...t) =>l.dispatchEvent(t[0]),
                  removeEventListener: (...t) =>l.removeEventListener(t[0], t[1], t[2])
                };
                let m = !1;
                return o(zt(_, h), () =>{
                  d(),
                  m = !0;
                }, () =>{
                  f(),
                  m = !1;
                });
              };
            }) (as, Lt, Bt, js, Zt, os),
            Zs = ((t, e) =>(s, n) =>{
              const i = n.channelCountMode;
              if ('clamped-max' === i) throw e();
              if (void 0 === s.createStereoPanner) return t(s, n);
              const o = s.createStereoPanner();
              return qt(o, n),
              It(o, n, 'pan'),
              Object.defineProperty(o, 'channelCountMode', {
                get: () =>i,
                set: t=>{
                  if (t !== i) throw e();
                }
              }),
              o;
            }) (Qs, Zt),
            Xs = ((t, e, s, n, i) =>() =>{
              const o = new WeakMap();
              return {
                render(r, a) {
                  const c = o.get(a);
                  return void 0 !== c ? Promise.resolve(c) : (async(r, a) =>{
                    let c = s(r);
                    const h = M(c, a);
                    if (!h) {
                      const t = {
                        channelCount: c.channelCount,
                        channelCountMode: c.channelCountMode,
                        channelInterpretation: c.channelInterpretation,
                        pan: c.pan.value
                      };
                      c = e(a, t);
                    }
                    return o.set(a, c),
                    h ? await t(a, r.pan, c.pan) : await n(a, r.pan, c.pan),
                    X(c) ? await i(r, a, c.inputs[0]) : await i(r, a, c),
                    c;
                  }) (r, a);
                }
              };
            }) (Xe, Zs, tt, $e, Te),
            Ys = ((t, e, s, n, i, o) =>class extends t {
              constructor(t, r) {
                const a = i(t),
                c = {
                  ...Jt,
                  ...r
                },
                h = s(a, c),
                l = o(a);
                super (t, !1, h, l ? n() : null),
                this._pan = e(this, l, h.pan);
              }
              get pan() {
                return this._pan;
              }
            }) (Ve, Je, Zs, Xs, ke, De),
            $s = ((t, e, s) =>() =>{
              const n = new WeakMap();
              return {
                render(i, o) {
                  const r = n.get(o);
                  return void 0 !== r ? Promise.resolve(r) : (async(i, o) =>{
                    let r = e(i);
                    if (!M(r, o)) {
                      const e = {
                        channelCount: r.channelCount,
                        channelCountMode: r.channelCountMode,
                        channelInterpretation: r.channelInterpretation,
                        curve: r.curve,
                        oversample: r.oversample
                      };
                      r = t(o, e);
                    }
                    return n.set(o, r),
                    X(r) ? await s(i, o, r.inputs[0]) : await s(i, o, r),
                    r;
                  }) (i, o);
                }
              };
            }) (js, tt, Te),
            Hs = ((t, e, s, n, i, o, r) =>class extends t {
              constructor(t, e) {
                const a = i(t),
                c = {
                  ...te,
                  ...e
                },
                h = s(a, c);
                super (t, !0, h, o(a) ? n() : null),
                this._isCurveNullified = !1,
                this._nativeWaveShaperNode = h,
                r(this, 1);
              }
              get curve() {
                return this._isCurveNullified ? null : this._nativeWaveShaperNode.curve;
              }
              set curve(t) {
                if (null === t) this._isCurveNullified = !0,
                this._nativeWaveShaperNode.curve = new Float32Array([0,
                0]);
                 else {
                  if (t.length < 2) throw e();
                  this._isCurveNullified = !1,
                  this._nativeWaveShaperNode.curve = t;
                }
              }
              get oversample() {
                return this._nativeWaveShaperNode.oversample;
              }
              set oversample(t) {
                this._nativeWaveShaperNode.oversample = t;
              }
            }) (Ve, At, js, $s, ke, De, ns),
            Js = (t=>null !== t && t.isSecureContext) (xe),
            Ks = (t=>(e, s, n) =>{
              Object.defineProperties(t, {
                currentFrame: {
                  configurable: !0,
                  get: () =>Math.round(e * s)
                },
                currentTime: {
                  configurable: !0,
                  get: () =>e
                }
              });
              try {
                return n();
              } finally {
                null !== t && (delete t.currentFrame, delete t.currentTime);
              }
            }) (xe),
            tn = new WeakMap(),
            en = ((t, e) =>s=>{
              let n = t.get(s);
              if (void 0 !== n) return n;
              if (null === e) throw new Error('Missing the native OfflineAudioContext constructor.');
              return n = new e(1, 1, 44100),
              t.set(s, n),
              n;
            }) (tn, Ce),
            sn = Js ? ((t, e, s, n, i, o, r, a, c, h, l, u, p) =>{
              let d = 0;
              return (_, m, g = {
                credentials: 'omit'
              }) =>{
                const w = l.get(_);
                if (void 0 !== w && w.has(m)) return Promise.resolve();
                const b = h.get(_);
                if (void 0 !== b) {
                  const t = b.get(m);
                  if (void 0 !== t) return t;
                }
                const T = o(_),
                S = void 0 === T.audioWorklet ? i(m).then(([t,
                e]) =>{
                  const [n,
                  i] = v(t, e);
                  return s(`${ n };((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${ i }
})})(window,'_AWGS')`);
                }).then(() =>{
                  const t = p._AWGS.pop();
                  if (void 0 === t) throw new SyntaxError();
                  n(T.currentTime, T.sampleRate, () =>t(class {
                  }, void 0, (t, s) =>{
                    if ('' === t.trim()) throw e();
                    const n = f.get(T);
                    if (void 0 !== n) {
                      if (n.has(t)) throw e();
                      x(s),
                      y(s.parameterDescriptors),
                      n.set(t, s);
                    } else x(s),
                    y(s.parameterDescriptors),
                    f.set(T, new Map([[t,
                    s]]));
                  }, T.sampleRate, void 0, void 0));
                }) : Promise.all([i(m),
                Promise.resolve(t(u, u))]).then(([[t,
                e],
                s]) =>{
                  const n = d + 1;
                  d = n;
                  const [i,
                  o] = v(t, e),
                  h = new Blob([`${ i };((AudioWorkletProcessor,registerProcessor)=>{${ o }
})(${ s ? 'AudioWorkletProcessor' : 'class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}' },(n,p)=>registerProcessor(n,class extends p{${ s ? '' : '__c = (a) => a.forEach(e=>this.__b.add(e.buffer));' }process(i,o,p){${ s ? '' : 'i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));' }return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${ n }',class extends AudioWorkletProcessor{process(){return !1}})`], {
                    type: 'application/javascript; charset=utf-8'
                  }),
                  l = URL.createObjectURL(h);
                  return T.audioWorklet.addModule(l, g).then(() =>{
                    if (a(T)) return T;
                    const t = r(T);
                    return t.audioWorklet.addModule(l, g).then(() =>t);
                  }).then(t=>{
                    if (null === c) throw new SyntaxError();
                    try {
                      new c(t, `__sac${ n }`);
                    } catch {
                      throw new SyntaxError();
                    }
                  }).finally(() =>URL.revokeObjectURL(l));
                });
                return void 0 === b ? h.set(_, new Map([[m,
                S]])) : b.set(m, S),
                S.then(() =>{
                  const t = l.get(_);
                  void 0 === t ? l.set(_, new Set([m])) : t.add(m);
                }).finally(() =>{
                  const t = h.get(_);
                  void 0 !== t && t.delete(m);
                }),
                S;
              };
            }) (ge, Zt, (t=>e=>new Promise((s, n) =>{
              if (null === t) return void n(new SyntaxError());
              const i = t.document.head;
              if (null === i) n(new SyntaxError());
               else {
                const o = t.document.createElement('script'),
                r = new Blob([e], {
                  type: 'application/javascript'
                }),
                a = URL.createObjectURL(r),
                c = t.onerror,
                h = () =>{
                  t.onerror = c,
                  URL.revokeObjectURL(a);
                };
                t.onerror = (e, s, i, o, r) =>s === a || s === t.location.href && 1 === i && 1 === o ? (h(), n(r), !1) : null !== c ? c(e, s, i, o, r) : void 0,
                o.onerror = () =>{
                  h(),
                  n(new SyntaxError());
                },
                o.onload = () =>{
                  h(),
                  s();
                },
                o.src = a,
                o.type = 'module',
                i.appendChild(o);
              }
            })) (xe), Ks, async t=>{
              try {
                const e = await fetch(t);
                if (e.ok) return [await e.text(),
                e.url];
              } catch {
              }
              throw new DOMException('', 'AbortError');
            }, ke, en, De, Ie, new WeakMap(), new WeakMap(), ((t, e) =>async() =>{
              if (null === t) return !0;
              if (null === e) return !1;
              const s = new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'], {
                type: 'application/javascript; charset=utf-8'
              }),
              n = new e(1, 128, 44100),
              i = URL.createObjectURL(s);
              let o = !1,
              r = !1;
              try {
                await n.audioWorklet.addModule(i);
                const e = new t(n, 'a', {
                  numberOfOutputs: 0
                }),
                s = n.createOscillator();
                e.port.onmessage = () =>o = !0,
                e.onprocessorerror = () =>r = !0,
                s.connect(e),
                s.start(0),
                await n.startRendering();
              } catch {
              } finally {
                URL.revokeObjectURL(i);
              }
              return o && !r;
            }) (Ie, Ce), xe) : void 0,
            nn = ((t, e) =>s=>t(s) || e(s)) (Re, De),
            on = ((t, e, s, n, i, o, r, a, c, h, l) =>(s, n) =>{
              const u = r(s) ? s : o(s);
              if (i.has(n)) {
                const t = new DOMException('', 'DataCloneError');
                return Promise.reject(t);
              }
              try {
                i.add(n);
              } catch {
              }
              return e(c, () =>c(u)) ? u.decodeAudioData(n).then(s=>(wt(n).catch(() =>{
              }), e(a, () =>a(s)) || l(s), t.add(s), s)) : new Promise((e, s) =>{
                const i = async() =>{
                  try {
                    await wt(n);
                  } catch {
                  }
                },
                o = t=>{
                  s(t),
                  i();
                };
                try {
                  u.decodeAudioData(n, s=>{
                    'function' != typeof s.copyFromChannel && (h(s), q(s)),
                    t.add(s),
                    i().then(() =>e(s));
                  }, t=>{
                    o(null === t ? new DOMException('', 'EncodingError') : t);
                  });
                } catch (t) {
                  o(t);
                }
              });
            }) (je, ge, 0, 0, new WeakSet(), ke, nn, E, Et, Be, Ue),
            rn = ((t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _, m, g, v, y) =>class extends f {
              constructor(e, s) {
                super (e, s),
                this._nativeContext = e,
                this._audioWorklet = void 0 === t ? void 0 : {
                  addModule: (e, s) =>t(this, e, s)
                };
              }
              get audioWorklet() {
                return this._audioWorklet;
              }
              createAnalyser() {
                return new e(this);
              }
              createBiquadFilter() {
                return new i(this);
              }
              createBuffer(t, e, n) {
                return new s({
                  length: e,
                  numberOfChannels: t,
                  sampleRate: n
                });
              }
              createBufferSource() {
                return new n(this);
              }
              createChannelMerger(t = 6) {
                return new o(this, {
                  numberOfInputs: t
                });
              }
              createChannelSplitter(t = 6) {
                return new r(this, {
                  numberOfOutputs: t
                });
              }
              createConstantSource() {
                return new a(this);
              }
              createConvolver() {
                return new c(this);
              }
              createDelay(t = 1) {
                return new l(this, {
                  maxDelayTime: t
                });
              }
              createDynamicsCompressor() {
                return new u(this);
              }
              createGain() {
                return new p(this);
              }
              createIIRFilter(t, e) {
                return new d(this, {
                  feedback: e,
                  feedforward: t
                });
              }
              createOscillator() {
                return new _(this);
              }
              createPanner() {
                return new m(this);
              }
              createPeriodicWave(t, e, s = {
                disableNormalization: !1
              }) {
                return new g(this, {
                  ...s,
                  imag: e,
                  real: t
                });
              }
              createStereoPanner() {
                return new v(this);
              }
              createWaveShaper() {
                return new y(this);
              }
              decodeAudioData(t, e, s) {
                return h(this._nativeContext, t).then(t=>('function' == typeof e && e(t), t), t=>{
                  throw 'function' == typeof s && s(t),
                  t;
                });
              }
            }) (sn, Pe, Ge, ts, is, hs, us, _s, vs, on, xs, Ts, ks, Ms, qs, Vs, Bs, Gs, Ys, Hs),
            an = ((t, e, s, n) =>class extends t {
              constructor(t, e) {
                const i = s(t),
                o = ((t, e) =>t.createMediaElementSource(e.mediaElement)) (i, e);
                if (n(i)) throw TypeError();
                super (t, !0, o, null),
                this._nativeMediaElementAudioSourceNode = o;
              }
              get mediaElement() {
                return this._nativeMediaElementAudioSourceNode.mediaElement;
              }
            }) (Ve, 0, ke, De),
            cn = ((t, e, s, n) =>class extends t {
              constructor(t, e) {
                const i = s(t);
                if (n(i)) throw new TypeError();
                const o = ((t, e) =>{
                  const s = t.createMediaStreamDestination();
                  return qt(s, e),
                  1 === s.numberOfOutputs && Object.defineProperty(s, 'numberOfOutputs', {
                    get: () =>0
                  }),
                  s;
                }) (i, {
                  ...Mt,
                  ...e
                });
                super (t, !1, o, null),
                this._nativeMediaStreamAudioDestinationNode = o;
              }
              get stream() {
                return this._nativeMediaStreamAudioDestinationNode.stream;
              }
            }) (Ve, 0, ke, De),
            hn = ((t, e, s, n) =>class extends t {
              constructor(t, e) {
                const i = s(t),
                o = ((t, {
                  mediaStream: e
                }) =>{
                  const s = e.getAudioTracks();
                  s.sort((t, e) =>t.id < e.id ? - 1 : t.id > e.id ? 1 : 0);
                  const n = s.slice(0, 1),
                  i = t.createMediaStreamSource(new MediaStream(n));
                  return Object.defineProperty(i, 'mediaStream', {
                    value: e
                  }),
                  i;
                }) (i, e);
                if (n(i)) throw new TypeError();
                super (t, !0, o, null),
                this._nativeMediaStreamAudioSourceNode = o;
              }
              get mediaStream() {
                return this._nativeMediaStreamAudioSourceNode.mediaStream;
              }
            }) (Ve, 0, ke, De),
            ln = ((t, e) =>(s, {
              mediaStreamTrack: n
            }) =>{
              if ('function' == typeof s.createMediaStreamTrackSource) return s.createMediaStreamTrackSource(n);
              const i = new MediaStream([n]),
              o = s.createMediaStreamSource(i);
              if ('audio' !== n.kind) throw t();
              if (e(s)) throw new TypeError();
              return o;
            }) (At, De),
            un = ((t, e, s) =>class extends t {
              constructor(t, n) {
                const i = s(t);
                super (t, !0, e(i, n), null);
              }
            }) (Ve, ln, ke),
            pn = ((t, e, s, n, i, o, r, a, c) =>class extends t {
              constructor(t = {
              }) {
                if (null === c) throw new Error('Missing the native AudioContext constructor.');
                let e;
                try {
                  e = new c(t);
                } catch (t) {
                  if (12 === t.code && 'sampleRate is not in range' === t.message) throw s();
                  throw t;
                }
                if (null === e) throw n();
                if (!(t=>void 0 === t || 'number' == typeof t || 'string' == typeof t && ('balanced' === t || 'interactive' === t || 'playback' === t)) (t.latencyHint)) throw new TypeError(`The provided value '${ t.latencyHint }' is not a valid enum value of type AudioContextLatencyCategory.`);
                if (void 0 !== t.sampleRate && e.sampleRate !== t.sampleRate) throw s();
                super (e, 2);
                const {
                  latencyHint: i
                }
                = t,
                {
                  sampleRate: o
                }
                = e;
                if (this._baseLatency = 'number' == typeof e.baseLatency ? e.baseLatency : 'balanced' === i ? 512 / o : 'interactive' === i || void 0 === i ? 256 / o : 'playback' === i ? 1024 / o : 128 * Math.max(2, Math.min(128, Math.round(i * o / 128))) / o, this._nativeAudioContext = e, 'webkitAudioContext' === c.name ? (this._nativeGainNode = e.createGain(), this._nativeOscillatorNode = e.createOscillator(), this._nativeGainNode.gain.value = 1e-37, this._nativeOscillatorNode.connect(this._nativeGainNode).connect(e.destination), this._nativeOscillatorNode.start()) : (this._nativeGainNode = null, this._nativeOscillatorNode = null), this._state = null, 'running' === e.state) {
                  this._state = 'suspended';
                  const t = () =>{
                    'suspended' === this._state && (this._state = null),
                    e.removeEventListener('statechange', t);
                  };
                  e.addEventListener('statechange', t);
                }
              }
              get baseLatency() {
                return this._baseLatency;
              }
              get state() {
                return null !== this._state ? this._state : this._nativeAudioContext.state;
              }
              close() {
                return 'closed' === this.state ? this._nativeAudioContext.close().then(() =>{
                  throw e();
                }) : ('suspended' === this._state && (this._state = null), this._nativeAudioContext.close().then(() =>{
                  null !== this._nativeGainNode && null !== this._nativeOscillatorNode && (this._nativeOscillatorNode.stop(), this._nativeGainNode.disconnect(), this._nativeOscillatorNode.disconnect()),
                  W(this);
                }));
              }
              createMediaElementSource(t) {
                return new i(this, {
                  mediaElement: t
                });
              }
              createMediaStreamDestination() {
                return new o(this);
              }
              createMediaStreamSource(t) {
                return new r(this, {
                  mediaStream: t
                });
              }
              createMediaStreamTrackSource(t) {
                return new a(this, {
                  mediaStreamTrack: t
                });
              }
              resume() {
                return 'suspended' === this._state ? new Promise((t, e) =>{
                  const s = () =>{
                    this._nativeAudioContext.removeEventListener('statechange', s),
                    'running' === this._nativeAudioContext.state ? t() : this.resume().then(t, e);
                  };
                  this._nativeAudioContext.addEventListener('statechange', s);
                }) : this._nativeAudioContext.resume().catch(t=>{
                  if (void 0 === t || 15 === t.code) throw e();
                  throw t;
                });
              }
              suspend() {
                return this._nativeAudioContext.suspend().catch(t=>{
                  if (void 0 === t) throw e();
                  throw t;
                });
              }
            }) (rn, At, Zt, Kt, an, cn, hn, un, Ee),
            dn = (t=>e=>{
              const s = t.get(e);
              if (void 0 === s) throw new Error('The context has no set of AudioWorkletNodes.');
              return s;
            }) (Rs),
            fn = (t=>(e, s) =>{
              t(e).add(s);
            }) (dn),
            _n = (t=>(e, s, n = 0, i = 0) =>{
              const o = e[n];
              if (void 0 === o) throw t();
              return rt(s) ? o.connect(s, 0, i) : o.connect(s, 0);
            }) (R),
            mn = (t=>(e, s) =>{
              t(e).delete(s);
            }) (dn),
            gn = (t=>(e, s, n, i = 0) =>void 0 === s ? e.forEach(t=>t.disconnect()) : 'number' == typeof s ? Tt(t, e, s).disconnect() : rt(s) ? void 0 === n ? e.forEach(t=>t.disconnect(s)) : void 0 === i ? Tt(t, e, n).disconnect(s, 0) : Tt(t, e, n).disconnect(s, 0, i) : void 0 === n ? e.forEach(t=>t.disconnect(s)) : Tt(t, e, n).disconnect(s, 0)) (R),
            vn = new WeakMap(),
            yn = ((t, e) =>s=>e(t, s)) (vn, w),
            xn = ((t, e, s, n, i, o, r, a, c, h, l, u, p) =>(d, f, m, g) =>{
              if (0 === g.numberOfInputs && 0 === g.numberOfOutputs) throw c();
              const v = Array.isArray(g.outputChannelCount) ? g.outputChannelCount : Array.from(g.outputChannelCount);
              if (v.some(t=>t < 1)) throw c();
              if (v.length !== g.numberOfOutputs) throw e();
              if ('explicit' !== g.channelCountMode) throw c();
              const y = g.channelCount * g.numberOfInputs,
              x = v.reduce((t, e) =>t + e, 0),
              w = void 0 === m.parameterDescriptors ? 0 : m.parameterDescriptors.length;
              if (y + w > 6 || x > 6) throw c();
              const b = new MessageChannel(),
              T = [
              ],
              S = [
              ];
              for (let t = 0; t < g.numberOfInputs; t += 1) T.push(r(d, {
                channelCount: g.channelCount,
                channelCountMode: g.channelCountMode,
                channelInterpretation: g.channelInterpretation,
                gain: 1
              })),
              S.push(i(d, {
                channelCount: g.channelCount,
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete',
                numberOfOutputs: g.channelCount
              }));
              const k = [
              ];
              if (void 0 !== m.parameterDescriptors) for (const {
                defaultValue: t,
                maxValue: e,
                minValue: s,
                name: n
              }
              of m.parameterDescriptors) {
                const i = o(d, {
                  channelCount: 1,
                  channelCountMode: 'explicit',
                  channelInterpretation: 'discrete',
                  offset: void 0 !== g.parameterData[n] ? g.parameterData[n] : void 0 === t ? 0 : t
                });
                Object.defineProperties(i.offset, {
                  defaultValue: {
                    get: () =>void 0 === t ? 0 : t
                  },
                  maxValue: {
                    get: () =>void 0 === e ? V : e
                  },
                  minValue: {
                    get: () =>void 0 === s ? I : s
                  }
                }),
                k.push(i);
              }
              const A = n(d, {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'speakers',
                numberOfInputs: Math.max(1, y + w)
              }),
              C = Pt(f, d.sampleRate),
              D = a(d, C, y + w, Math.max(1, x)),
              O = i(d, {
                channelCount: Math.max(1, x),
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete',
                numberOfOutputs: Math.max(1, x)
              }),
              M = [
              ];
              for (let t = 0; t < g.numberOfOutputs; t += 1) M.push(n(d, {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'speakers',
                numberOfInputs: v[t]
              }));
              for (let t = 0; t < g.numberOfInputs; t += 1) {
                T[t].connect(S[t]);
                for (let e = 0; e < g.channelCount; e += 1) S[t].connect(A, e, t * g.channelCount + e);
              }
              const E = new lt(void 0 === m.parameterDescriptors ? [
              ] : m.parameterDescriptors.map(({
                name: t
              }, e) =>{
                const s = k[e];
                return s.connect(A, 0, y + e),
                s.start(0),
                [
                  t,
                  s.offset
                ];
              }));
              A.connect(D);
              let R = g.channelInterpretation,
              q = null;
              const F = 0 === g.numberOfOutputs ? [
                D
              ] : M,
              N = {
                get bufferSize() {
                  return C;
                },
                get channelCount() {
                  return g.channelCount;
                },
                set channelCount(t) {
                  throw s();
                },
                get channelCountMode() {
                  return g.channelCountMode;
                },
                set channelCountMode(t) {
                  throw s();
                },
                get channelInterpretation() {
                  return R;
                },
                set channelInterpretation(t) {
                  for (const e of T) e.channelInterpretation = t;
                  R = t;
                },
                get context() {
                  return D.context;
                },
                get inputs() {
                  return T;
                },
                get numberOfInputs() {
                  return g.numberOfInputs;
                },
                get numberOfOutputs() {
                  return g.numberOfOutputs;
                },
                get onprocessorerror() {
                  return q;
                },
                set onprocessorerror(t) {
                  'function' == typeof q && N.removeEventListener('processorerror', q),
                  q = 'function' == typeof t ? t : null,
                  'function' == typeof q && N.addEventListener('processorerror', q);
                },
                get parameters() {
                  return E;
                },
                get port() {
                  return b.port2;
                },
                addEventListener: (...t) =>D.addEventListener(t[0], t[1], t[2]),
                connect: t.bind(null, F),
                disconnect: h.bind(null, F),
                dispatchEvent: (...t) =>D.dispatchEvent(t[0]),
                removeEventListener: (...t) =>D.removeEventListener(t[0], t[1], t[2])
              },
              P = new Map();
              var j,
              L;
              b.port1.addEventListener = (j = b.port1.addEventListener, (...t) =>{
                if ('message' === t[0]) {
                  const e = 'function' == typeof t[1] ? t[1] : 'object' == typeof t[1] && null !== t[1] && 'function' == typeof t[1].handleEvent ? t[1].handleEvent : null;
                  if (null !== e) {
                    const s = P.get(t[1]);
                    void 0 !== s ? t[1] = s : (t[1] = t=>{
                      l(d.currentTime, d.sampleRate, () =>e(t));
                    }, P.set(e, t[1]));
                  }
                }
                return j.call(b.port1, t[0], t[1], t[2]);
              }),
              b.port1.removeEventListener = (L = b.port1.removeEventListener, (...t) =>{
                if ('message' === t[0]) {
                  const e = P.get(t[1]);
                  void 0 !== e && (P.delete(t[1]), t[1] = e);
                }
                return L.call(b.port1, t[0], t[1], t[2]);
              });
              let z = null;
              Object.defineProperty(b.port1, 'onmessage', {
                get: () =>z,
                set: t=>{
                  'function' == typeof z && b.port1.removeEventListener('message', z),
                  z = 'function' == typeof t ? t : null,
                  'function' == typeof z && (b.port1.addEventListener('message', z), b.port1.start());
                }
              }),
              m.prototype.port = b.port1;
              let W = null;
              const B = ((t, e, s, n) =>{
                let i = _.get(t);
                void 0 === i && (i = new WeakMap(), _.set(t, i));
                const o = (async(t, e) =>{
                  const s = await(t=>new Promise((e, s) =>{
                    const {
                      port1: n,
                      port2: i
                    }
                    = new MessageChannel();
                    n.onmessage = ({
                      data: t
                    }) =>{
                      n.close(),
                      i.close(),
                      e(t);
                    },
                    n.onmessageerror = ({
                      data: t
                    }) =>{
                      n.close(),
                      i.close(),
                      s(t);
                    },
                    i.postMessage(t);
                  })) (e);
                  return new t(s);
                }) (s, n);
                return i.set(e, o),
                o;
              }) (d, N, m, g);
              B.then(t=>W = t);
              const U = ft(g.numberOfInputs, g.channelCount),
              G = ft(g.numberOfOutputs, v),
              Q = void 0 === m.parameterDescriptors ? [
              ] : m.parameterDescriptors.reduce((t, {
                name: e
              }) =>({
                ...t,
                [
                  e
                ]: new Float32Array(128)
              }), {
              });
              let Z = !0;
              const X = () =>{
                g.numberOfOutputs > 0 && D.disconnect(O);
                for (let t = 0, e = 0; t < g.numberOfOutputs; t += 1) {
                  const s = M[t];
                  for (let n = 0; n < v[t]; n += 1) O.disconnect(s, e + n, n);
                  e += v[t];
                }
              },
              Y = new Map();
              D.onaudioprocess = ({
                inputBuffer: t,
                outputBuffer: e
              }) =>{
                if (null !== W) {
                  const s = u(N);
                  for (let n = 0; n < C; n += 128) {
                    for (let e = 0; e < g.numberOfInputs; e += 1) for (let s = 0; s < g.channelCount; s += 1) pt(t, U[e], s, s, n);
                    void 0 !== m.parameterDescriptors && m.parameterDescriptors.forEach(({
                      name: e
                    }, s) =>{
                      pt(t, Q, e, y + s, n);
                    });
                    for (let t = 0; t < g.numberOfInputs; t += 1) for (let e = 0; e < v[t]; e += 1) 0 === G[t][e].byteLength && (G[t][e] = new Float32Array(128));
                    try {
                      const t = U.map((t, e) =>{
                        if (s[e].size > 0) return Y.set(e, C / 128),
                        t;
                        const n = Y.get(e);
                        return void 0 === n ? [
                        ] : (t.every(t=>t.every(t=>0 === t)) && (1 === n ? Y.delete(e) : Y.set(e, n - 1)), t);
                      }),
                      i = l(d.currentTime + n / d.sampleRate, d.sampleRate, () =>W.process(t, G, Q));
                      Z = i;
                      for (let t = 0, s = 0; t < g.numberOfOutputs; t += 1) {
                        for (let i = 0; i < v[t]; i += 1) dt(e, G[t], i, s + i, n);
                        s += v[t];
                      }
                    } catch (t) {
                      Z = !1,
                      N.dispatchEvent(new ErrorEvent('processorerror', {
                        colno: t.colno,
                        filename: t.filename,
                        lineno: t.lineno,
                        message: t.message
                      }));
                    }
                    if (!Z) {
                      for (let t = 0; t < g.numberOfInputs; t += 1) {
                        T[t].disconnect(S[t]);
                        for (let e = 0; e < g.channelCount; e += 1) S[n].disconnect(A, e, t * g.channelCount + e);
                      }
                      if (void 0 !== m.parameterDescriptors) {
                        const t = m.parameterDescriptors.length;
                        for (let e = 0; e < t; e += 1) {
                          const t = k[e];
                          t.disconnect(A, 0, y + e),
                          t.stop();
                        }
                      }
                      A.disconnect(D),
                      D.onaudioprocess = null,
                      $ ? X() : K();
                      break;
                    }
                  }
                }
              };
              let $ = !1;
              const H = r(d, {
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'discrete',
                gain: 0
              }),
              J = () =>D.connect(H).connect(d.destination),
              K = () =>{
                D.disconnect(H),
                H.disconnect();
              };
              return J(),
              p(N, () =>{
                if (Z) {
                  K(),
                  g.numberOfOutputs > 0 && D.connect(O);
                  for (let t = 0, e = 0; t < g.numberOfOutputs; t += 1) {
                    const s = M[t];
                    for (let n = 0; n < v[t]; n += 1) O.connect(s, e + n, n);
                    e += v[t];
                  }
                }
                $ = !0;
              }, () =>{
                Z && (J(), X()),
                $ = !1;
              });
            }) (_n, R, At, as, Lt, ds, Bt, Qt, Zt, gn, Ks, yn, os),
            wn = ((t, e, s, n, i) =>(o, r, a, c, h, l) =>{
              if (null !== a) try {
                const e = new a(o, c, l),
                n = new Map();
                let r = null;
                if (Object.defineProperties(e, {
                  channelCount: {
                    get: () =>l.channelCount,
                    set: () =>{
                      throw t();
                    }
                  },
                  channelCountMode: {
                    get: () =>'explicit',
                    set: () =>{
                      throw t();
                    }
                  },
                  onprocessorerror: {
                    get: () =>r,
                    set: t=>{
                      'function' == typeof r && e.removeEventListener('processorerror', r),
                      r = 'function' == typeof t ? t : null,
                      'function' == typeof r && e.addEventListener('processorerror', r);
                    }
                  }
                }), e.addEventListener = (p = e.addEventListener, (...t) =>{
                  if ('processorerror' === t[0]) {
                    const e = 'function' == typeof t[1] ? t[1] : 'object' == typeof t[1] && null !== t[1] && 'function' == typeof t[1].handleEvent ? t[1].handleEvent : null;
                    if (null !== e) {
                      const s = n.get(t[1]);
                      void 0 !== s ? t[1] = s : (t[1] = s=>{
                        'error' === s.type ? (Object.defineProperties(s, {
                          type: {
                            value: 'processorerror'
                          }
                        }), e(s)) : e(new ErrorEvent(t[0], {
                          ...s
                        }));
                      }, n.set(e, t[1]));
                    }
                  }
                  return p.call(e, 'error', t[1], t[2]),
                  p.call(e, ...t);
                }), e.removeEventListener = (u = e.removeEventListener, (...t) =>{
                  if ('processorerror' === t[0]) {
                    const e = n.get(t[1]);
                    void 0 !== e && (n.delete(t[1]), t[1] = e);
                  }
                  return u.call(e, 'error', t[1], t[2]),
                  u.call(e, t[0], t[1], t[2]);
                }), 0 !== l.numberOfOutputs) {
                  const t = s(o, {
                    channelCount: 1,
                    channelCountMode: 'explicit',
                    channelInterpretation: 'discrete',
                    gain: 0
                  });
                  return e.connect(t).connect(o.destination),
                  i(e, () =>t.disconnect(), () =>t.connect(o.destination));
                }
                return e;
              } catch (t) {
                if (11 === t.code) throw n();
                throw t;
              }
              var u,
              p;
              if (void 0 === h) throw n();
              return (t=>{
                const {
                  port1: e
                }
                = new MessageChannel();
                try {
                  e.postMessage(t);
                } finally {
                  e.close();
                }
              }) (l),
              e(o, r, h, l);
            }) (At, xn, Bt, Zt, os),
            bn = ((t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _) =>(m, g, v) =>{
              const y = new WeakMap();
              let x = null;
              return {
                render(w, b) {
                  a(b, w);
                  const T = y.get(b);
                  return void 0 !== T ? Promise.resolve(T) : (async(a, w) =>{
                    let b = l(a),
                    T = null;
                    const S = M(b, w),
                    k = Array.isArray(g.outputChannelCount) ? g.outputChannelCount : Array.from(g.outputChannelCount);
                    if (null === u) {
                      const t = k.reduce((t, e) =>t + e, 0),
                      s = i(w, {
                        channelCount: Math.max(1, t),
                        channelCountMode: 'explicit',
                        channelInterpretation: 'discrete',
                        numberOfOutputs: Math.max(1, t)
                      }),
                      o = [
                      ];
                      for (let t = 0; t < a.numberOfOutputs; t += 1) o.push(n(w, {
                        channelCount: 1,
                        channelCountMode: 'explicit',
                        channelInterpretation: 'speakers',
                        numberOfInputs: k[t]
                      }));
                      const h = r(w, {
                        channelCount: g.channelCount,
                        channelCountMode: g.channelCountMode,
                        channelInterpretation: g.channelInterpretation,
                        gain: 1
                      });
                      h.connect = e.bind(null, o),
                      h.disconnect = c.bind(null, o),
                      T = [
                        s,
                        o,
                        h
                      ];
                    } else S || (b = new u(w, m));
                    if (y.set(w, null === T ? b : T[2]), null !== T) {
                      if (null === x) {
                        if (void 0 === v) throw new Error('Missing the processor constructor.');
                        if (null === p) throw new Error('Missing the native OfflineAudioContext constructor.');
                        const t = a.channelCount * a.numberOfInputs,
                        e = void 0 === v.parameterDescriptors ? 0 : v.parameterDescriptors.length,
                        s = t + e,
                        c = async() =>{
                          const c = new p(s, 128 * Math.ceil(a.context.length / 128), w.sampleRate),
                          h = [
                          ],
                          l = [
                          ];
                          for (let t = 0; t < g.numberOfInputs; t += 1) h.push(r(c, {
                            channelCount: g.channelCount,
                            channelCountMode: g.channelCountMode,
                            channelInterpretation: g.channelInterpretation,
                            gain: 1
                          })),
                          l.push(i(c, {
                            channelCount: g.channelCount,
                            channelCountMode: 'explicit',
                            channelInterpretation: 'discrete',
                            numberOfOutputs: g.channelCount
                          }));
                          const u = await Promise.all(Array.from(a.parameters.values()).map(async t=>{
                            const e = o(c, {
                              channelCount: 1,
                              channelCountMode: 'explicit',
                              channelInterpretation: 'discrete',
                              offset: t.value
                            });
                            return await d(c, t, e.offset),
                            e;
                          })),
                          m = n(c, {
                            channelCount: 1,
                            channelCountMode: 'explicit',
                            channelInterpretation: 'speakers',
                            numberOfInputs: Math.max(1, t + e)
                          });
                          for (let t = 0; t < g.numberOfInputs; t += 1) {
                            h[t].connect(l[t]);
                            for (let e = 0; e < g.channelCount; e += 1) l[t].connect(m, e, t * g.channelCount + e);
                          }
                          for (const [e,
                          s]of u.entries()) s.connect(m, 0, t + e),
                          s.start(0);
                          return m.connect(c.destination),
                          await Promise.all(h.map(t=>f(a, c, t))),
                          _(c);
                        };
                        x = _t(a, 0 === s ? null : await c(), w, g, k, v, h);
                      }
                      const t = await x,
                      e = s(w, {
                        buffer: null,
                        channelCount: 2,
                        channelCountMode: 'max',
                        channelInterpretation: 'speakers',
                        loop: !1,
                        loopEnd: 0,
                        loopStart: 0,
                        playbackRate: 1
                      }),
                      [
                        c,
                        l,
                        u
                      ] = T;
                      null !== t && (e.buffer = t, e.start(0)),
                      e.connect(c);
                      for (let t = 0, e = 0; t < a.numberOfOutputs; t += 1) {
                        const s = l[t];
                        for (let n = 0; n < k[t]; n += 1) c.connect(s, e + n, n);
                        e += k[t];
                      }
                      return u;
                    }
                    if (S) for (const [e,
                    s]of a.parameters.entries()) await t(w, s, b.parameters.get(e));
                     else for (const [t,
                    e]of a.parameters.entries()) await d(w, e, b.parameters.get(t));
                    return await f(a, w, b),
                    b;
                  }) (w, b);
                }
              };
            }) (Xe, _n, Ye, as, Lt, ds, Bt, mn, gn, Ks, tt, Ie, Ce, $e, Te, Cs),
            Tn = (t=>e=>t.get(e)) (tn),
            Sn = (t=>(e, s) =>{
              t.set(e, s);
            }) (vn),
            kn = Js ? ((t, e, s, n, i, o, r, a, c, h, l, u, p, d) =>class extends e {
              constructor(e, l, p) {
                var d;
                const _ = a(e),
                m = c(_),
                g = (t=>({
                  ...t,
                  outputChannelCount: void 0 !== t.outputChannelCount ? t.outputChannelCount : 1 === t.numberOfInputs && 1 === t.numberOfOutputs ? [
                    t.channelCount
                  ] : Array.from({
                    length: t.numberOfOutputs
                  }, () =>1)
                })) ({
                  ...ut,
                  ...p
                });
                (t=>{
                  const {
                    port1: e,
                    port2: s
                  }
                  = new MessageChannel();
                  try {
                    e.postMessage(t);
                  } finally {
                    e.close(),
                    s.close();
                  }
                }) (g);
                const v = f.get(_),
                y = null == v ? void 0 : v.get(l),
                x = m || 'closed' !== _.state ? _ : null !== (d = r(_)) && void 0 !== d ? d : _,
                w = i(x, m ? null : e.baseLatency, h, l, y, g);
                super (e, !0, w, m ? n(l, g, y) : null);
                const b = [
                ];
                w.parameters.forEach((t, e) =>{
                  const n = s(this, m, t);
                  b.push([e,
                  n]);
                }),
                this._nativeAudioWorkletNode = w,
                this._onprocessorerror = null,
                this._parameters = new lt(b),
                m && t(_, this);
                const {
                  activeInputs: T
                }
                = o(this);
                u(w, T);
              }
              get onprocessorerror() {
                return this._onprocessorerror;
              }
              set onprocessorerror(t) {
                const e = 'function' == typeof t ? d(this, t) : null;
                this._nativeAudioWorkletNode.onprocessorerror = e;
                const s = this._nativeAudioWorkletNode.onprocessorerror;
                this._onprocessorerror = null !== s && s === e ? t : s;
              }
              get parameters() {
                return null === this._parameters ? this._nativeAudioWorkletNode.parameters : this._parameters;
              }
              get port() {
                return this._nativeAudioWorkletNode.port;
              }
            }) (fn, Ve, Je, bn, wn, j, Tn, ke, De, Ie, 0, Sn, 0, ue) : void 0,
            An = ((t, e) =>(s, n, i) =>{
              if (null === e) throw new Error('Missing the native OfflineAudioContext constructor.');
              try {
                return new e(s, n, i);
              } catch (e) {
                if ('SyntaxError' === e.name) throw t();
                throw e;
              }
            }) (Zt, Ce),
            Cn = ((t, e, s, n, i, o, r, a) =>(c, h) =>s(c).render(c, h).then(() =>Promise.all(Array.from(n(h)).map(t=>s(t).render(t, h)))).then(() =>i(h)).then(s=>('function' != typeof s.copyFromChannel ? (r(s), q(s)) : e(o, () =>o(s)) || a(s), t.add(s), s))) (je, ge, be, dn, Cs, E, Be, Ue),
            Dn = ((t, e, s, n, i) =>class extends t {
              constructor(t, s, i) {
                let o;
                if ('number' == typeof t && void 0 !== s && void 0 !== i) o = {
                  length: s,
                  numberOfChannels: t,
                  sampleRate: i
                };
                 else {
                  if ('object' != typeof t) throw new Error('The given parameters are not valid.');
                  o = t;
                }
                const {
                  length: r,
                  numberOfChannels: a,
                  sampleRate: c
                }
                = {
                  ...Xt,
                  ...o
                },
                h = n(a, r, c);
                e(Et, () =>Et(h)) || h.addEventListener('statechange', (() =>{
                  let t = 0;
                  const e = s=>{
                    'running' === this._state && (t > 0 ? (h.removeEventListener('statechange', e), s.stopImmediatePropagation(), this._waitForThePromiseToSettle(s)) : t += 1);
                  };
                  return e;
                }) ()),
                super (h, a),
                this._length = r,
                this._nativeOfflineAudioContext = h,
                this._state = null;
              }
              get length() {
                return void 0 === this._nativeOfflineAudioContext.length ? this._length : this._nativeOfflineAudioContext.length;
              }
              get state() {
                return null === this._state ? this._nativeOfflineAudioContext.state : this._state;
              }
              startRendering() {
                return 'running' === this._state ? Promise.reject(s()) : (this._state = 'running', i(this.destination, this._nativeOfflineAudioContext).finally(() =>{
                  this._state = null,
                  W(this);
                }));
              }
              _waitForThePromiseToSettle(t) {
                null === this._state ? this._nativeOfflineAudioContext.dispatchEvent(t) : setTimeout(() =>this._waitForThePromiseToSettle(t));
              }
            }) (rn, ge, At, An, Cn),
            On = ((t, e) =>s=>{
              const n = t.get(s);
              return e(n) || e(s);
            }) (u, Re),
            Mn = ((t, e) =>s=>t.has(s) || e(s)) (c, qe),
            En = ((t, e) =>s=>t.has(s) || e(s)) (l, Fe),
            Rn = ((t, e) =>s=>{
              const n = t.get(s);
              return e(n) || e(s);
            }) (u, De),
            qn = () =>(async(t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _) =>!!(t(e, e) && t(s, s) && t(i, i) && t(o, o) && t(a, a) && t(c, c) && t(h, h) && t(l, l) && t(u, u) && t(p, p) && t(d, d)) && (await Promise.all([t(n, n),
            t(r, r),
            t(f, f),
            t(_, _)])).every(t=>t)) (ge, (t=>() =>{
              if (null === t) return !1;
              const e = new t(1, 1, 44100).createBuffer(1, 1, 44100);
              if (void 0 === e.copyToChannel) return !0;
              const s = new Float32Array(2);
              try {
                e.copyFromChannel(s, 0, 0);
              } catch {
                return !1;
              }
              return !0;
            }) (Ce), (t=>() =>{
              if (null === t) return !1;
              if (void 0 !== t.prototype && void 0 !== t.prototype.close) return !0;
              const e = new t(),
              s = void 0 !== e.close;
              try {
                e.close();
              } catch {
              }
              return s;
            }) (Ee), (t=>() =>{
              if (null === t) return Promise.resolve(!1);
              const e = new t(1, 1, 44100);
              return new Promise(t=>{
                let s = !0;
                const n = n=>{
                  s && (s = !1, e.startRendering(), t(n instanceof TypeError));
                };
                let i;
                try {
                  i = e.decodeAudioData(null, () =>{
                  }, n);
                } catch (t) {
                  n(t);
                }
                void 0 !== i && i.catch(n);
              });
            }) (Ce), (t=>() =>{
              if (null === t) return !1;
              let e;
              try {
                e = new t({
                  latencyHint: 'balanced'
                });
              } catch {
                return !1;
              }
              return e.close(),
              !0;
            }) (Ee), (t=>() =>{
              if (null === t) return !1;
              const e = new t(1, 1, 44100).createGain(),
              s = e.connect(e) === e;
              return e.disconnect(e),
              s;
            }) (Ce), ((t, e) =>async() =>{
              if (null === t) return !0;
              if (null === e) return !1;
              const s = new Blob(['let c,p;class A extends AudioWorkletProcessor{constructor(){super();this.port.onmessage=(e)=>{p=e.data;p.onmessage=()=>{p.postMessage(c);p.close()};this.port.postMessage(0)}}process(){c=1}}registerProcessor("a",A)'], {
                type: 'application/javascript; charset=utf-8'
              }),
              n = new MessageChannel(),
              i = new e(1, 128, 44100),
              o = URL.createObjectURL(s);
              let r = !1;
              try {
                await i.audioWorklet.addModule(o);
                const e = new t(i, 'a', {
                  numberOfOutputs: 0
                }),
                s = i.createOscillator();
                await new Promise(t=>{
                  e.port.onmessage = () =>t(),
                  e.port.postMessage(n.port2, [
                    n.port2
                  ]);
                }),
                e.port.onmessage = () =>r = !0,
                s.connect(e),
                s.start(0),
                await i.startRendering(),
                r = await new Promise(t=>{
                  n.port1.onmessage = ({
                    data: e
                  }) =>t(1 === e),
                  n.port1.postMessage(0);
                });
              } catch {
              } finally {
                n.port1.close(),
                URL.revokeObjectURL(o);
              }
              return r;
            }) (Ie, Ce), (t=>() =>{
              if (null === t) return !1;
              const e = new t(1, 1, 44100).createChannelMerger();
              if ('max' === e.channelCountMode) return !0;
              try {
                e.channelCount = 2;
              } catch {
                return !0;
              }
              return !1;
            }) (Ce), (t=>() =>{
              if (null === t) return !1;
              const e = new t(1, 1, 44100);
              return void 0 === e.createConstantSource || e.createConstantSource().offset.maxValue !== Number.POSITIVE_INFINITY;
            }) (Ce), (t=>() =>{
              if (null === t) return !1;
              const e = new t(1, 1, 44100),
              s = e.createConvolver();
              s.buffer = e.createBuffer(1, 1, e.sampleRate);
              try {
                s.buffer = e.createBuffer(1, 1, e.sampleRate);
              } catch {
                return !1;
              }
              return !0;
            }) (Ce), (t=>() =>{
              if (null === t) return !1;
              const e = new t(1, 1, 44100).createConvolver();
              try {
                e.channelCount = 1;
              } catch {
                return !1;
              }
              return !0;
            }) (Ce), ce, (t=>() =>null !== t && t.hasOwnProperty('isSecureContext')) (xe), (t=>() =>{
              if (null === t) return !1;
              const e = new t();
              try {
                return e.createMediaStreamSource(new MediaStream()),
                !1;
              } catch (t) {
                return !0;
              } finally {
                e.close();
              }
            }) (Ee), (t=>() =>{
              if (null === t) return Promise.resolve(!1);
              const e = new t(1, 1, 44100);
              if (void 0 === e.createStereoPanner) return Promise.resolve(!0);
              if (void 0 === e.createConstantSource) return Promise.resolve(!0);
              const s = e.createConstantSource(),
              n = e.createStereoPanner();
              return s.channelCount = 1,
              s.offset.value = 1,
              n.channelCount = 1,
              s.start(),
              s.connect(n).connect(e.destination),
              e.startRendering().then(t=>1 !== t.getChannelData(0) [0]);
            }) (Ce), he);
            function Fn(t) {
              return void 0 === t;
            }
            function In(t) {
              return !Fn(t);
            }
            function Vn(t) {
              return 'function' == typeof t;
            }
            function Nn(t) {
              return 'number' == typeof t;
            }
            function Pn(t) {
              return '[object Object]' === Object.prototype.toString.call(t) && t.constructor === Object;
            }
            function jn(t) {
              return 'boolean' == typeof t;
            }
            function Ln(t) {
              return Array.isArray(t);
            }
            function zn(t) {
              return 'string' == typeof t;
            }
            function Wn(t) {
              return zn(t) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(t);
            }
            function Bn(t, e) {
              if (!t) throw new Error(e);
            }
            function Un(t, e, s = 1 / 0) {
              if (!(e <= t && t <= s)) throw new RangeError(`Value must be within [${ e }, ${ s }], got: ${ t }`);
            }
            function Gn(t) {
              t.isOffline || 'running' === t.state || Kn('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.');
            }
            let Qn = !1,
            Zn = !1;
            function Xn(t) {
              Qn = t;
            }
            function Yn(t) {
              Fn(t) && Qn && !Zn && (Zn = !0, Kn('Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing'));
            }
            let $n = console;
            function Hn(t) {
              $n = t;
            }
            function Jn(...t) {
              $n.log(...t);
            }
            function Kn(...t) {
              $n.warn(...t);
            }
            const ti = 'object' == typeof self ? self : null,
            ei = ti && (ti.hasOwnProperty('AudioContext') || ti.hasOwnProperty('webkitAudioContext'));
            function si(t, e, s, n) {
              var i,
              o = arguments.length,
              r = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, s) : n;
              if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) r = Reflect.decorate(t, e, s, n);
               else for (var a = t.length - 1; a >= 0; a--) (i = t[a]) && (r = (o < 3 ? i(r) : o > 3 ? i(e, s, r) : i(e, s)) || r);
              return o > 3 && r && Object.defineProperty(e, s, r),
              r;
            }
            function ni(t, e, s, n) {
              return new (s || (s = Promise)) (function (i, o) {
                function r(t) {
                  try {
                    c(n.next(t));
                  } catch (t) {
                    o(t);
                  }
                }
                function a(t) {
                  try {
                    c(n.throw(t));
                  } catch (t) {
                    o(t);
                  }
                }
                function c(t) {
                  var e;
                  t.done ? i(t.value) : (e = t.value, e instanceof s ? e : new s(function (t) {
                    t(e);
                  })).then(r, a);
                }
                c((n = n.apply(t, e || [
                ])).next());
              });
            }
            Object.create,
            Object.create;
            class ii {
              constructor(t, e, s, n) {
                this._callback = t,
                this._type = e,
                this._minimumUpdateInterval = Math.max(128 / (n || 44100), 0.001),
                this.updateInterval = s,
                this._createClock();
              }
              _createWorker() {
                const t = new Blob([`
			// the initial timeout time
			let timeoutTime =  ${ (1000 * this._updateInterval).toFixed(1) };
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`], {
                  type: 'text/javascript'
                }),
                e = URL.createObjectURL(t),
                s = new Worker(e);
                s.onmessage = this._callback.bind(this),
                this._worker = s;
              }
              _createTimeout() {
                this._timeout = setTimeout(() =>{
                  this._createTimeout(),
                  this._callback();
                }, 1000 * this._updateInterval);
              }
              _createClock() {
                if ('worker' === this._type) try {
                  this._createWorker();
                } catch (t) {
                  this._type = 'timeout',
                  this._createClock();
                } else 'timeout' === this._type && this._createTimeout();
              }
              _disposeClock() {
                this._timeout && clearTimeout(this._timeout),
                this._worker && (this._worker.terminate(), this._worker.onmessage = null);
              }
              get updateInterval() {
                return this._updateInterval;
              }
              set updateInterval(t) {
                var e;
                this._updateInterval = Math.max(t, this._minimumUpdateInterval),
                'worker' === this._type && (null === (e = this._worker) || void 0 === e || e.postMessage(1000 * this._updateInterval));
              }
              get type() {
                return this._type;
              }
              set type(t) {
                this._disposeClock(),
                this._type = t,
                this._createClock();
              }
              dispose() {
                this._disposeClock();
              }
            }
            function oi(t) {
              return En(t);
            }
            function ri(t) {
              return Mn(t);
            }
            function ai(t) {
              return Rn(t);
            }
            function ci(t) {
              return On(t);
            }
            function hi(t, e) {
              return 'value' === t || oi(e) || ri(e) || function (t) {
                return t instanceof Ge;
              }(e);
            }
            function li(t, ...e) {
              if (!e.length) return t;
              const s = e.shift();
              if (Pn(t) && Pn(s)) for (const e in s) hi(e, s[e]) ? t[e] = s[e] : Pn(s[e]) ? (t[e] || Object.assign(t, {
                [
                  e
                ]: {
                }
              }), li(t[e], s[e])) : Object.assign(t, {
                [
                  e
                ]: s[e]
              });
              return li(t, ...e);
            }
            function ui(t, e, s = [
            ], n) {
              const i = {
              },
              o = Array.from(e);
              if (Pn(o[0]) && n && !Reflect.has(o[0], n) && (Object.keys(o[0]).some(e=>Reflect.has(t, e)) || (li(i, {
                [
                  n
                ]: o[0]
              }), s.splice(s.indexOf(n), 1), o.shift())), 1 === o.length && Pn(o[0])) li(i, o[0]);
               else for (let t = 0; t < s.length; t++) In(o[t]) && (i[s[t]] = o[t]);
              return li(t, i);
            }
            function pi(t, e) {
              return Fn(t) ? e : t;
            }
            function di(t, e) {
              return e.forEach(e=>{
                Reflect.has(t, e) && delete t[e];
              }),
              t;
            }
            class fi {
              constructor() {
                this.debug = !1,
                this._wasDisposed = !1;
              }
              static getDefaults() {
                return {
                };
              }
              log(...t) {
                (this.debug || ti && this.toString() === ti.TONE_DEBUG_CLASS) && Jn(this, ...t);
              }
              dispose() {
                return this._wasDisposed = !0,
                this;
              }
              get disposed() {
                return this._wasDisposed;
              }
              toString() {
                return this.name;
              }
            }
            fi.version = i;
            const _i = 0.000001;
            function mi(t, e) {
              return t > e + _i;
            }
            function gi(t, e) {
              return mi(t, e) || yi(t, e);
            }
            function vi(t, e) {
              return t + _i < e;
            }
            function yi(t, e) {
              return Math.abs(t - e) < _i;
            }
            function xi(t, e, s) {
              return Math.max(Math.min(t, s), e);
            }
            class wi extends fi {
              constructor() {
                super (),
                this.name = 'Timeline',
                this._timeline = [
                ];
                const t = ui(wi.getDefaults(), arguments, [
                  'memory'
                ]);
                this.memory = t.memory,
                this.increasing = t.increasing;
              }
              static getDefaults() {
                return {
                  memory: 1 / 0,
                  increasing: !1
                };
              }
              get length() {
                return this._timeline.length;
              }
              add(t) {
                if (Bn(Reflect.has(t, 'time'), 'Timeline: events must have a time attribute'), t.time = t.time.valueOf(), this.increasing && this.length) {
                  const e = this._timeline[this.length - 1];
                  Bn(gi(t.time, e.time), 'The time must be greater than or equal to the last scheduled time'),
                  this._timeline.push(t);
                } else {
                  const e = this._search(t.time);
                  this._timeline.splice(e + 1, 0, t);
                }
                if (this.length > this.memory) {
                  const t = this.length - this.memory;
                  this._timeline.splice(0, t);
                }
                return this;
              }
              remove(t) {
                const e = this._timeline.indexOf(t);
                return - 1 !== e && this._timeline.splice(e, 1),
                this;
              }
              get(t, e = 'time') {
                const s = this._search(t, e);
                return - 1 !== s ? this._timeline[s] : null;
              }
              peek() {
                return this._timeline[0];
              }
              shift() {
                return this._timeline.shift();
              }
              getAfter(t, e = 'time') {
                const s = this._search(t, e);
                return s + 1 < this._timeline.length ? this._timeline[s + 1] : null;
              }
              getBefore(t) {
                const e = this._timeline.length;
                if (e > 0 && this._timeline[e - 1].time < t) return this._timeline[e - 1];
                const s = this._search(t);
                return s - 1 >= 0 ? this._timeline[s - 1] : null;
              }
              cancel(t) {
                if (this._timeline.length > 1) {
                  let e = this._search(t);
                  if (e >= 0) {
                    if (yi(this._timeline[e].time, t)) {
                      for (let s = e; s >= 0 && yi(this._timeline[s].time, t); s--) e = s;
                      this._timeline = this._timeline.slice(0, e);
                    } else this._timeline = this._timeline.slice(0, e + 1);
                  } else this._timeline = [
                  ];
                } else 1 === this._timeline.length && gi(this._timeline[0].time, t) && (this._timeline = [
                ]);
                return this;
              }
              cancelBefore(t) {
                const e = this._search(t);
                return e >= 0 && (this._timeline = this._timeline.slice(e + 1)),
                this;
              }
              previousEvent(t) {
                const e = this._timeline.indexOf(t);
                return e > 0 ? this._timeline[e - 1] : null;
              }
              _search(t, e = 'time') {
                if (0 === this._timeline.length) return - 1;
                let s = 0;
                const n = this._timeline.length;
                let i = n;
                if (n > 0 && this._timeline[n - 1][e] <= t) return n - 1;
                for (; s < i; ) {
                  let n = Math.floor(s + (i - s) / 2);
                  const o = this._timeline[n],
                  r = this._timeline[n + 1];
                  if (yi(o[e], t)) {
                    for (let s = n; s < this._timeline.length && yi(this._timeline[s][e], t); s++) n = s;
                    return n;
                  }
                  if (vi(o[e], t) && mi(r[e], t)) return n;
                  mi(o[e], t) ? i = n : s = n + 1;
                }
                return - 1;
              }
              _iterate(t, e = 0, s = this._timeline.length - 1) {
                this._timeline.slice(e, s + 1).forEach(t);
              }
              forEach(t) {
                return this._iterate(t),
                this;
              }
              forEachBefore(t, e) {
                const s = this._search(t);
                return - 1 !== s && this._iterate(e, 0, s),
                this;
              }
              forEachAfter(t, e) {
                const s = this._search(t);
                return this._iterate(e, s + 1),
                this;
              }
              forEachBetween(t, e, s) {
                let n = this._search(t),
                i = this._search(e);
                return - 1 !== n && - 1 !== i ? (this._timeline[n].time !== t && (n += 1), this._timeline[i].time === e && (i -= 1), this._iterate(s, n, i)) : - 1 === n && this._iterate(s, 0, i),
                this;
              }
              forEachFrom(t, e) {
                let s = this._search(t);
                for (; s >= 0 && this._timeline[s].time >= t; ) s--;
                return this._iterate(e, s + 1),
                this;
              }
              forEachAtTime(t, e) {
                const s = this._search(t);
                if ( - 1 !== s && yi(this._timeline[s].time, t)) {
                  let n = s;
                  for (let e = s; e >= 0 && yi(this._timeline[e].time, t); e--) n = e;
                  this._iterate(t=>{
                    e(t);
                  }, n, s);
                }
                return this;
              }
              dispose() {
                return super.dispose(),
                this._timeline = [
                ],
                this;
              }
            }
            const bi = [
            ];
            function Ti(t) {
              bi.push(t);
            }
            const Si = [
            ];
            function ki(t) {
              Si.push(t);
            }
            class Ai extends fi {
              constructor() {
                super (...arguments),
                this.name = 'Emitter';
              }
              on(t, e) {
                return t.split(/\W+/).forEach(t=>{
                  Fn(this._events) && (this._events = {
                  }),
                  this._events.hasOwnProperty(t) || (this._events[t] = [
                  ]),
                  this._events[t].push(e);
                }),
                this;
              }
              once(t, e) {
                const s = (...n) =>{
                  e(...n),
                  this.off(t, s);
                };
                return this.on(t, s),
                this;
              }
              off(t, e) {
                return t.split(/\W+/).forEach(t=>{
                  if (Fn(this._events) && (this._events = {
                  }), this._events.hasOwnProperty(t)) if (Fn(e)) this._events[t] = [
                  ];
                   else {
                    const s = this._events[t];
                    for (let t = s.length - 1; t >= 0; t--) s[t] === e && s.splice(t, 1);
                  }
                }),
                this;
              }
              emit(t, ...e) {
                if (this._events && this._events.hasOwnProperty(t)) {
                  const s = this._events[t].slice(0);
                  for (let t = 0, n = s.length; t < n; t++) s[t].apply(this, e);
                }
                return this;
              }
              static mixin(t) {
                [
                  'on',
                  'once',
                  'off',
                  'emit'
                ].forEach(e=>{
                  const s = Object.getOwnPropertyDescriptor(Ai.prototype, e);
                  Object.defineProperty(t.prototype, e, s);
                });
              }
              dispose() {
                return super.dispose(),
                this._events = void 0,
                this;
              }
            }
            class Ci extends Ai {
              constructor() {
                super (...arguments),
                this.isOffline = !1;
              }
              toJSON() {
                return {
                };
              }
            }
            class Di extends Ci {
              constructor() {
                var t,
                e;
                super (),
                this.name = 'Context',
                this._constants = new Map(),
                this._timeouts = new wi(),
                this._timeoutIds = 0,
                this._initialized = !1,
                this._closeStarted = !1,
                this.isOffline = !1,
                this._workletPromise = null;
                const s = ui(Di.getDefaults(), arguments, [
                  'context'
                ]);
                s.context ? (this._context = s.context, this._latencyHint = (null === (t = arguments[0]) || void 0 === t ? void 0 : t.latencyHint) || '') : (this._context = function (t) {
                  return new pn(t);
                }({
                  latencyHint: s.latencyHint
                }), this._latencyHint = s.latencyHint),
                this._ticker = new ii(this.emit.bind(this, 'tick'), s.clockSource, s.updateInterval, this._context.sampleRate),
                this.on('tick', this._timeoutLoop.bind(this)),
                this._context.onstatechange = () =>{
                  this.emit('statechange', this.state);
                },
                this[(null === (e = arguments[0]) || void 0 === e ? void 0 : e.hasOwnProperty('updateInterval')) ? '_lookAhead' : 'lookAhead'] = s.lookAhead;
              }
              static getDefaults() {
                return {
                  clockSource: 'worker',
                  latencyHint: 'interactive',
                  lookAhead: 0.1,
                  updateInterval: 0.05
                };
              }
              initialize() {
                var t;
                return this._initialized || (t = this, bi.forEach(e=>e(t)), this._initialized = !0),
                this;
              }
              createAnalyser() {
                return this._context.createAnalyser();
              }
              createOscillator() {
                return this._context.createOscillator();
              }
              createBufferSource() {
                return this._context.createBufferSource();
              }
              createBiquadFilter() {
                return this._context.createBiquadFilter();
              }
              createBuffer(t, e, s) {
                return this._context.createBuffer(t, e, s);
              }
              createChannelMerger(t) {
                return this._context.createChannelMerger(t);
              }
              createChannelSplitter(t) {
                return this._context.createChannelSplitter(t);
              }
              createConstantSource() {
                return this._context.createConstantSource();
              }
              createConvolver() {
                return this._context.createConvolver();
              }
              createDelay(t) {
                return this._context.createDelay(t);
              }
              createDynamicsCompressor() {
                return this._context.createDynamicsCompressor();
              }
              createGain() {
                return this._context.createGain();
              }
              createIIRFilter(t, e) {
                return this._context.createIIRFilter(t, e);
              }
              createPanner() {
                return this._context.createPanner();
              }
              createPeriodicWave(t, e, s) {
                return this._context.createPeriodicWave(t, e, s);
              }
              createStereoPanner() {
                return this._context.createStereoPanner();
              }
              createWaveShaper() {
                return this._context.createWaveShaper();
              }
              createMediaStreamSource(t) {
                return Bn(ci(this._context), 'Not available if OfflineAudioContext'),
                this._context.createMediaStreamSource(t);
              }
              createMediaElementSource(t) {
                return Bn(ci(this._context), 'Not available if OfflineAudioContext'),
                this._context.createMediaElementSource(t);
              }
              createMediaStreamDestination() {
                return Bn(ci(this._context), 'Not available if OfflineAudioContext'),
                this._context.createMediaStreamDestination();
              }
              decodeAudioData(t) {
                return this._context.decodeAudioData(t);
              }
              get currentTime() {
                return this._context.currentTime;
              }
              get state() {
                return this._context.state;
              }
              get sampleRate() {
                return this._context.sampleRate;
              }
              get listener() {
                return this.initialize(),
                this._listener;
              }
              set listener(t) {
                Bn(!this._initialized, 'The listener cannot be set after initialization.'),
                this._listener = t;
              }
              get transport() {
                return this.initialize(),
                this._transport;
              }
              set transport(t) {
                Bn(!this._initialized, 'The transport cannot be set after initialization.'),
                this._transport = t;
              }
              get draw() {
                return this.initialize(),
                this._draw;
              }
              set draw(t) {
                Bn(!this._initialized, 'Draw cannot be set after initialization.'),
                this._draw = t;
              }
              get destination() {
                return this.initialize(),
                this._destination;
              }
              set destination(t) {
                Bn(!this._initialized, 'The destination cannot be set after initialization.'),
                this._destination = t;
              }
              createAudioWorkletNode(t, e) {
                return function (t, e, s) {
                  return Bn(In(kn), 'This node only works in a secure context (https or localhost)'),
                  new kn(t, e, s);
                }(this.rawContext, t, e);
              }
              addAudioWorkletModule(t) {
                return ni(this, void 0, void 0, function * () {
                  Bn(In(this.rawContext.audioWorklet), 'AudioWorkletNode is only available in a secure context (https or localhost)'),
                  this._workletPromise || (this._workletPromise = this.rawContext.audioWorklet.addModule(t)),
                  yield this._workletPromise;
                });
              }
              workletsAreReady() {
                return ni(this, void 0, void 0, function * () {
                  (yield this._workletPromise) ? this._workletPromise : Promise.resolve();
                });
              }
              get updateInterval() {
                return this._ticker.updateInterval;
              }
              set updateInterval(t) {
                this._ticker.updateInterval = t;
              }
              get clockSource() {
                return this._ticker.type;
              }
              set clockSource(t) {
                this._ticker.type = t;
              }
              get lookAhead() {
                return this._lookAhead;
              }
              set lookAhead(t) {
                this._lookAhead = t,
                this.updateInterval = t ? t / 2 : 0.01;
              }
              get latencyHint() {
                return this._latencyHint;
              }
              get rawContext() {
                return this._context;
              }
              now() {
                return this._context.currentTime + this._lookAhead;
              }
              immediate() {
                return this._context.currentTime;
              }
              resume() {
                return ci(this._context) ? this._context.resume() : Promise.resolve();
              }
              close() {
                return ni(this, void 0, void 0, function * () {
                  var t;
                  ci(this._context) && 'closed' !== this.state && !this._closeStarted && (this._closeStarted = !0, yield this._context.close()),
                  this._initialized && (t = this, Si.forEach(e=>e(t)));
                });
              }
              getConstant(t) {
                if (this._constants.has(t)) return this._constants.get(t);
                {
                  const e = this._context.createBuffer(1, 128, this._context.sampleRate),
                  s = e.getChannelData(0);
                  for (let e = 0; e < s.length; e++) s[e] = t;
                  const n = this._context.createBufferSource();
                  return n.channelCount = 1,
                  n.channelCountMode = 'explicit',
                  n.buffer = e,
                  n.loop = !0,
                  n.start(0),
                  this._constants.set(t, n),
                  n;
                }
              }
              dispose() {
                return super.dispose(),
                this._ticker.dispose(),
                this._timeouts.dispose(),
                Object.keys(this._constants).map(t=>this._constants[t].disconnect()),
                this.close(),
                this;
              }
              _timeoutLoop() {
                const t = this.now();
                let e = this._timeouts.peek();
                for (; this._timeouts.length && e && e.time <= t; ) e.callback(),
                this._timeouts.shift(),
                e = this._timeouts.peek();
              }
              setTimeout(t, e) {
                this._timeoutIds++;
                const s = this.now();
                return this._timeouts.add({
                  callback: t,
                  id: this._timeoutIds,
                  time: s + e
                }),
                this._timeoutIds;
              }
              clearTimeout(t) {
                return this._timeouts.forEach(e=>{
                  e.id === t && this._timeouts.remove(e);
                }),
                this;
              }
              clearInterval(t) {
                return this.clearTimeout(t);
              }
              setInterval(t, e) {
                const s = ++this._timeoutIds,
                n = () =>{
                  const i = this.now();
                  this._timeouts.add({
                    callback: () =>{
                      t(),
                      n();
                    },
                    id: s,
                    time: i + e
                  });
                };
                return n(),
                s;
              }
            }
            function Oi(t, e) {
              Ln(e) ? e.forEach(e=>Oi(t, e)) : Object.defineProperty(t, e, {
                enumerable: !0,
                writable: !1
              });
            }
            function Mi(t, e) {
              Ln(e) ? e.forEach(e=>Mi(t, e)) : Object.defineProperty(t, e, {
                writable: !0
              });
            }
            const Ei = () =>{
            };
            class Ri extends fi {
              constructor() {
                super (),
                this.name = 'ToneAudioBuffer',
                this.onload = Ei;
                const t = ui(Ri.getDefaults(), arguments, [
                  'url',
                  'onload',
                  'onerror'
                ]);
                this.reverse = t.reverse,
                this.onload = t.onload,
                zn(t.url) ? this.load(t.url).catch(t.onerror) : t.url && this.set(t.url);
              }
              static getDefaults() {
                return {
                  onerror: Ei,
                  onload: Ei,
                  reverse: !1
                };
              }
              get sampleRate() {
                return this._buffer ? this._buffer.sampleRate : Vi().sampleRate;
              }
              set(t) {
                return t instanceof Ri ? t.loaded ? this._buffer = t.get() : t.onload = () =>{
                  this.set(t),
                  this.onload(this);
                }
                 : this._buffer = t,
                this._reversed && this._reverse(),
                this;
              }
              get() {
                return this._buffer;
              }
              load(t) {
                return ni(this, void 0, void 0, function * () {
                  const e = Ri.load(t).then(t=>{
                    this.set(t),
                    this.onload(this);
                  });
                  Ri.downloads.push(e);
                  try {
                    yield e;
                  } finally {
                    const t = Ri.downloads.indexOf(e);
                    Ri.downloads.splice(t, 1);
                  }
                  return this;
                });
              }
              dispose() {
                return super.dispose(),
                this._buffer = void 0,
                this;
              }
              fromArray(t) {
                const e = Ln(t) && t[0].length > 0,
                s = e ? t.length : 1,
                n = e ? t[0].length : t.length,
                i = Vi(),
                o = i.createBuffer(s, n, i.sampleRate),
                r = e || 1 !== s ? t : [
                  t
                ];
                for (let t = 0; t < s; t++) o.copyToChannel(r[t], t);
                return this._buffer = o,
                this;
              }
              toMono(t) {
                if (Nn(t)) this.fromArray(this.toArray(t));
                 else {
                  let t = new Float32Array(this.length);
                  const e = this.numberOfChannels;
                  for (let s = 0; s < e; s++) {
                    const e = this.toArray(s);
                    for (let s = 0; s < e.length; s++) t[s] += e[s];
                  }
                  t = t.map(t=>t / e),
                  this.fromArray(t);
                }
                return this;
              }
              toArray(t) {
                if (Nn(t)) return this.getChannelData(t);
                if (1 === this.numberOfChannels) return this.toArray(0);
                {
                  const t = [
                  ];
                  for (let e = 0; e < this.numberOfChannels; e++) t[e] = this.getChannelData(e);
                  return t;
                }
              }
              getChannelData(t) {
                return this._buffer ? this._buffer.getChannelData(t) : new Float32Array(0);
              }
              slice(t, e = this.duration) {
                Bn(this.loaded, 'Buffer is not loaded');
                const s = Math.floor(t * this.sampleRate),
                n = Math.floor(e * this.sampleRate);
                Bn(s < n, 'The start time must be less than the end time');
                const i = n - s,
                o = Vi().createBuffer(this.numberOfChannels, i, this.sampleRate);
                for (let t = 0; t < this.numberOfChannels; t++) o.copyToChannel(this.getChannelData(t).subarray(s, n), t);
                return new Ri(o);
              }
              _reverse() {
                if (this.loaded) for (let t = 0; t < this.numberOfChannels; t++) this.getChannelData(t).reverse();
                return this;
              }
              get loaded() {
                return this.length > 0;
              }
              get duration() {
                return this._buffer ? this._buffer.duration : 0;
              }
              get length() {
                return this._buffer ? this._buffer.length : 0;
              }
              get numberOfChannels() {
                return this._buffer ? this._buffer.numberOfChannels : 0;
              }
              get reverse() {
                return this._reversed;
              }
              set reverse(t) {
                this._reversed !== t && (this._reversed = t, this._reverse());
              }
              static fromArray(t) {
                return new Ri().fromArray(t);
              }
              static fromUrl(t) {
                return ni(this, void 0, void 0, function * () {
                  const e = new Ri();
                  return yield e.load(t);
                });
              }
              static load(t) {
                return ni(this, void 0, void 0, function * () {
                  const e = t.match(/\[([^\]\[]+\|.+)\]$/);
                  if (e) {
                    const s = e[1].split('|');
                    let n = s[0];
                    for (const t of s) if (Ri.supportsType(t)) {
                      n = t;
                      break;
                    }
                    t = t.replace(e[0], n);
                  }
                  const s = '' === Ri.baseUrl || Ri.baseUrl.endsWith('/') ? Ri.baseUrl : Ri.baseUrl + '/',
                  n = document.createElement('a');
                  n.href = s + t,
                  n.pathname = (n.pathname + n.hash).split('/').map(encodeURIComponent).join('/');
                  const i = yield fetch(n.href);
                  if (!i.ok) throw new Error(`could not load url: ${ t }`);
                  const o = yield i.arrayBuffer();
                  return yield Vi().decodeAudioData(o);
                });
              }
              static supportsType(t) {
                const e = t.split('.'),
                s = e[e.length - 1];
                return '' !== document.createElement('audio').canPlayType('audio/' + s);
              }
              static loaded() {
                return ni(this, void 0, void 0, function * () {
                  for (yield Promise.resolve(); Ri.downloads.length; ) yield Ri.downloads[0];
                });
              }
            }
            Ri.baseUrl = '',
            Ri.downloads = [
            ];
            class qi extends Di {
              constructor() {
                var t,
                e,
                s;
                super ({
                  clockSource: 'offline',
                  context: ai(arguments[0]) ? arguments[0] : (t = arguments[0], e = arguments[1] * arguments[2], s = arguments[2], new Dn(t, e, s)),
                  lookAhead: 0,
                  updateInterval: ai(arguments[0]) ? 128 / arguments[0].sampleRate : 128 / arguments[2]
                }),
                this.name = 'OfflineContext',
                this._currentTime = 0,
                this.isOffline = !0,
                this._duration = ai(arguments[0]) ? arguments[0].length / arguments[0].sampleRate : arguments[1];
              }
              now() {
                return this._currentTime;
              }
              get currentTime() {
                return this._currentTime;
              }
              _renderClock(t) {
                return ni(this, void 0, void 0, function * () {
                  let e = 0;
                  for (; this._duration - this._currentTime >= 0; ) {
                    this.emit('tick'),
                    this._currentTime += 128 / this.sampleRate,
                    e++;
                    const s = Math.floor(this.sampleRate / 128);
                    t && e % s == 0 && (yield new Promise(t=>setTimeout(t, 1)));
                  }
                });
              }
              render(t = !0) {
                return ni(this, void 0, void 0, function * () {
                  yield this.workletsAreReady(),
                  yield this._renderClock(t);
                  const e = yield this._context.startRendering();
                  return new Ri(e);
                });
              }
              close() {
                return Promise.resolve();
              }
            }
            const Fi = new class extends Ci {
              constructor() {
                super (...arguments),
                this.lookAhead = 0,
                this.latencyHint = 0,
                this.isOffline = !1;
              }
              createAnalyser() {
                return {
                };
              }
              createOscillator() {
                return {
                };
              }
              createBufferSource() {
                return {
                };
              }
              createBiquadFilter() {
                return {
                };
              }
              createBuffer(t, e, s) {
                return {
                };
              }
              createChannelMerger(t) {
                return {
                };
              }
              createChannelSplitter(t) {
                return {
                };
              }
              createConstantSource() {
                return {
                };
              }
              createConvolver() {
                return {
                };
              }
              createDelay(t) {
                return {
                };
              }
              createDynamicsCompressor() {
                return {
                };
              }
              createGain() {
                return {
                };
              }
              createIIRFilter(t, e) {
                return {
                };
              }
              createPanner() {
                return {
                };
              }
              createPeriodicWave(t, e, s) {
                return {
                };
              }
              createStereoPanner() {
                return {
                };
              }
              createWaveShaper() {
                return {
                };
              }
              createMediaStreamSource(t) {
                return {
                };
              }
              createMediaElementSource(t) {
                return {
                };
              }
              createMediaStreamDestination() {
                return {
                };
              }
              decodeAudioData(t) {
                return Promise.resolve({
                });
              }
              createAudioWorkletNode(t, e) {
                return {
                };
              }
              get rawContext() {
                return {
                };
              }
              addAudioWorkletModule(t) {
                return ni(this, void 0, void 0, function * () {
                  return Promise.resolve();
                });
              }
              resume() {
                return Promise.resolve();
              }
              setTimeout(t, e) {
                return 0;
              }
              clearTimeout(t) {
                return this;
              }
              setInterval(t, e) {
                return 0;
              }
              clearInterval(t) {
                return this;
              }
              getConstant(t) {
                return {
                };
              }
              get currentTime() {
                return 0;
              }
              get state() {
                return {
                };
              }
              get sampleRate() {
                return 0;
              }
              get listener() {
                return {
                };
              }
              get transport() {
                return {
                };
              }
              get draw() {
                return {
                };
              }
              set draw(t) {
              }
              get destination() {
                return {
                };
              }
              set destination(t) {
              }
              now() {
                return 0;
              }
              immediate() {
                return 0;
              }
            }();
            let Ii = Fi;
            function Vi() {
              return Ii === Fi && ei && Ni(new Di()),
              Ii;
            }
            function Ni(t, e = !1) {
              e && Ii.dispose(),
              Ii = ci(t) ? new Di(t) : ai(t) ? new qi(t) : t;
            }
            function Pi() {
              return Ii.resume();
            }
            if (ti && !ti.TONE_SILENCE_LOGGING) {
              let t = 'v';
              'dev' === i && (t = '');
              const e = ` * Tone.js ${ t }${ i } * `;
              console.log(`%c${ e }`, 'background: #000; color: #fff');
            }
            function ji(t) {
              return Math.pow(10, t / 20);
            }
            function Li(t) {
              return Math.log(t) / Math.LN10 * 20;
            }
            function zi(t) {
              return Math.pow(2, t / 12);
            }
            let Wi = 440;
            function Bi(t) {
              return Math.round(Ui(t));
            }
            function Ui(t) {
              return 69 + 12 * Math.log2(t / Wi);
            }
            function Gi(t) {
              return Wi * Math.pow(2, (t - 69) / 12);
            }
            class Qi extends fi {
              constructor(t, e, s) {
                super (),
                this.defaultUnits = 's',
                this._val = e,
                this._units = s,
                this.context = t,
                this._expressions = this._getExpressions();
              }
              _getExpressions() {
                return {
                  hz: {
                    method: t=>this._frequencyToUnits(parseFloat(t)),
                    regexp: /^(\d+(?:\.\d+)?)hz$/i
                  },
                  i: {
                    method: t=>this._ticksToUnits(parseInt(t, 10)),
                    regexp: /^(\d+)i$/i
                  },
                  m: {
                    method: t=>this._beatsToUnits(parseInt(t, 10) * this._getTimeSignature()),
                    regexp: /^(\d+)m$/i
                  },
                  n: {
                    method: (t, e) =>{
                      const s = parseInt(t, 10),
                      n = '.' === e ? 1.5 : 1;
                      return 1 === s ? this._beatsToUnits(this._getTimeSignature()) * n : this._beatsToUnits(4 / s) * n;
                    },
                    regexp: /^(\d+)n(\.?)$/i
                  },
                  number: {
                    method: t=>this._expressions[this.defaultUnits].method.call(this, t),
                    regexp: /^(\d+(?:\.\d+)?)$/
                  },
                  s: {
                    method: t=>this._secondsToUnits(parseFloat(t)),
                    regexp: /^(\d+(?:\.\d+)?)s$/
                  },
                  samples: {
                    method: t=>parseInt(t, 10) / this.context.sampleRate,
                    regexp: /^(\d+)samples$/
                  },
                  t: {
                    method: t=>{
                      const e = parseInt(t, 10);
                      return this._beatsToUnits(8 / (3 * Math.floor(e)));
                    },
                    regexp: /^(\d+)t$/i
                  },
                  tr: {
                    method: (t, e, s) =>{
                      let n = 0;
                      return t && '0' !== t && (n += this._beatsToUnits(this._getTimeSignature() * parseFloat(t))),
                      e && '0' !== e && (n += this._beatsToUnits(parseFloat(e))),
                      s && '0' !== s && (n += this._beatsToUnits(parseFloat(s) / 4)),
                      n;
                    },
                    regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/
                  }
                };
              }
              valueOf() {
                if (this._val instanceof Qi && this.fromType(this._val), Fn(this._val)) return this._noArg();
                if (zn(this._val) && Fn(this._units)) {
                  for (const t in this._expressions) if (this._expressions[t].regexp.test(this._val.trim())) {
                    this._units = t;
                    break;
                  }
                } else if (Pn(this._val)) {
                  let t = 0;
                  for (const e in this._val) if (In(this._val[e])) {
                    const s = this._val[e];
                    t += new this.constructor(this.context, e).valueOf() * s;
                  }
                  return t;
                }
                if (In(this._units)) {
                  const t = this._expressions[this._units],
                  e = this._val.toString().trim().match(t.regexp);
                  return e ? t.method.apply(this, e.slice(1)) : t.method.call(this, this._val);
                }
                return zn(this._val) ? parseFloat(this._val) : this._val;
              }
              _frequencyToUnits(t) {
                return 1 / t;
              }
              _beatsToUnits(t) {
                return 60 / this._getBpm() * t;
              }
              _secondsToUnits(t) {
                return t;
              }
              _ticksToUnits(t) {
                return t * this._beatsToUnits(1) / this._getPPQ();
              }
              _noArg() {
                return this._now();
              }
              _getBpm() {
                return this.context.transport.bpm.value;
              }
              _getTimeSignature() {
                return this.context.transport.timeSignature;
              }
              _getPPQ() {
                return this.context.transport.PPQ;
              }
              fromType(t) {
                switch (this._units = void 0, this.defaultUnits) {
                  case 's':
                    this._val = t.toSeconds();
                    break;
                  case 'i':
                    this._val = t.toTicks();
                    break;
                  case 'hz':
                    this._val = t.toFrequency();
                    break;
                  case 'midi':
                    this._val = t.toMidi();
                }
                return this;
              }
              toFrequency() {
                return 1 / this.toSeconds();
              }
              toSamples() {
                return this.toSeconds() * this.context.sampleRate;
              }
              toMilliseconds() {
                return 1000 * this.toSeconds();
              }
            }
            class Zi extends Qi {
              constructor() {
                super (...arguments),
                this.name = 'TimeClass';
              }
              _getExpressions() {
                return Object.assign(super._getExpressions(), {
                  now: {
                    method: t=>this._now() + new this.constructor(this.context, t).valueOf(),
                    regexp: /^\+(.+)/
                  },
                  quantize: {
                    method: t=>{
                      const e = new Zi(this.context, t).valueOf();
                      return this._secondsToUnits(this.context.transport.nextSubdivision(e));
                    },
                    regexp: /^@(.+)/
                  }
                });
              }
              quantize(t, e = 1) {
                const s = new this.constructor(this.context, t).valueOf(),
                n = this.valueOf();
                return n + (Math.round(n / s) * s - n) * e;
              }
              toNotation() {
                const t = this.toSeconds(),
                e = [
                  '1m'
                ];
                for (let t = 1; t < 9; t++) {
                  const s = Math.pow(2, t);
                  e.push(s + 'n.'),
                  e.push(s + 'n'),
                  e.push(s + 't');
                }
                e.push('0');
                let s = e[0],
                n = new Zi(this.context, e[0]).toSeconds();
                return e.forEach(e=>{
                  const i = new Zi(this.context, e).toSeconds();
                  Math.abs(i - t) < Math.abs(n - t) && (s = e, n = i);
                }),
                s;
              }
              toBarsBeatsSixteenths() {
                const t = this._beatsToUnits(1);
                let e = this.valueOf() / t;
                e = parseFloat(e.toFixed(4));
                const s = Math.floor(e / this._getTimeSignature());
                let n = e % 1 * 4;
                e = Math.floor(e) % this._getTimeSignature();
                const i = n.toString();
                return i.length > 3 && (n = parseFloat(parseFloat(i).toFixed(3))),
                [
                  s,
                  e,
                  n
                ].join(':');
              }
              toTicks() {
                const t = this._beatsToUnits(1);
                return this.valueOf() / t * this._getPPQ();
              }
              toSeconds() {
                return this.valueOf();
              }
              toMidi() {
                return Bi(this.toFrequency());
              }
              _now() {
                return this.context.now();
              }
            }
            function Xi(t, e) {
              return new Zi(Vi(), t, e);
            }
            class Yi extends Zi {
              constructor() {
                super (...arguments),
                this.name = 'Frequency',
                this.defaultUnits = 'hz';
              }
              static get A4() {
                return Wi;
              }
              static set A4(t) {
                !function (t) {
                  Wi = t;
                }(t);
              }
              _getExpressions() {
                return Object.assign({
                }, super._getExpressions(), {
                  midi: {
                    regexp: /^(\d+(?:\.\d+)?midi)/,
                    method(t) {
                      return 'midi' === this.defaultUnits ? t : Yi.mtof(t);
                    }
                  },
                  note: {
                    regexp: /^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,
                    method(t, e) {
                      const s = $i[t.toLowerCase()] + 12 * (parseInt(e, 10) + 1);
                      return 'midi' === this.defaultUnits ? s : Yi.mtof(s);
                    }
                  },
                  tr: {
                    regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
                    method(t, e, s) {
                      let n = 1;
                      return t && '0' !== t && (n *= this._beatsToUnits(this._getTimeSignature() * parseFloat(t))),
                      e && '0' !== e && (n *= this._beatsToUnits(parseFloat(e))),
                      s && '0' !== s && (n *= this._beatsToUnits(parseFloat(s) / 4)),
                      n;
                    }
                  }
                });
              }
              transpose(t) {
                return new Yi(this.context, this.valueOf() * zi(t));
              }
              harmonize(t) {
                return t.map(t=>this.transpose(t));
              }
              toMidi() {
                return Bi(this.valueOf());
              }
              toNote() {
                const t = this.toFrequency(),
                e = Math.log2(t / Yi.A4);
                let s = Math.round(12 * e) + 57;
                const n = Math.floor(s / 12);
                return n < 0 && (s += - 12 * n),
                Hi[s % 12] + n.toString();
              }
              toSeconds() {
                return 1 / super.toSeconds();
              }
              toTicks() {
                const t = this._beatsToUnits(1),
                e = this.valueOf() / t;
                return Math.floor(e * this._getPPQ());
              }
              _noArg() {
                return 0;
              }
              _frequencyToUnits(t) {
                return t;
              }
              _ticksToUnits(t) {
                return 1 / (60 * t / (this._getBpm() * this._getPPQ()));
              }
              _beatsToUnits(t) {
                return 1 / super._beatsToUnits(t);
              }
              _secondsToUnits(t) {
                return 1 / t;
              }
              static mtof(t) {
                return Gi(t);
              }
              static ftom(t) {
                return Bi(t);
              }
            }
            const $i = {
              cbbb: - 3,
              cbb: - 2,
              cb: - 1,
              c: 0,
              'c#': 1,
              cx: 2,
              'c##': 2,
              'c###': 3,
              'cx#': 3,
              'c#x': 3,
              dbbb: - 1,
              dbb: 0,
              db: 1,
              d: 2,
              'd#': 3,
              dx: 4,
              'd##': 4,
              'd###': 5,
              'dx#': 5,
              'd#x': 5,
              ebbb: 1,
              ebb: 2,
              eb: 3,
              e: 4,
              'e#': 5,
              ex: 6,
              'e##': 6,
              'e###': 7,
              'ex#': 7,
              'e#x': 7,
              fbbb: 2,
              fbb: 3,
              fb: 4,
              f: 5,
              'f#': 6,
              fx: 7,
              'f##': 7,
              'f###': 8,
              'fx#': 8,
              'f#x': 8,
              gbbb: 4,
              gbb: 5,
              gb: 6,
              g: 7,
              'g#': 8,
              gx: 9,
              'g##': 9,
              'g###': 10,
              'gx#': 10,
              'g#x': 10,
              abbb: 6,
              abb: 7,
              ab: 8,
              a: 9,
              'a#': 10,
              ax: 11,
              'a##': 11,
              'a###': 12,
              'ax#': 12,
              'a#x': 12,
              bbbb: 8,
              bbb: 9,
              bb: 10,
              b: 11,
              'b#': 12,
              bx: 13,
              'b##': 13,
              'b###': 14,
              'bx#': 14,
              'b#x': 14
            },
            Hi = [
              'C',
              'C#',
              'D',
              'D#',
              'E',
              'F',
              'F#',
              'G',
              'G#',
              'A',
              'A#',
              'B'
            ];
            function Ji(t, e) {
              return new Yi(Vi(), t, e);
            }
            class Ki extends Zi {
              constructor() {
                super (...arguments),
                this.name = 'TransportTime';
              }
              _now() {
                return this.context.transport.seconds;
              }
            }
            function to(t, e) {
              return new Ki(Vi(), t, e);
            }
            class eo extends fi {
              constructor() {
                super ();
                const t = ui(eo.getDefaults(), arguments, [
                  'context'
                ]);
                this.defaultContext ? this.context = this.defaultContext : this.context = t.context;
              }
              static getDefaults() {
                return {
                  context: Vi()
                };
              }
              now() {
                return this.context.currentTime + this.context.lookAhead;
              }
              immediate() {
                return this.context.currentTime;
              }
              get sampleTime() {
                return 1 / this.context.sampleRate;
              }
              get blockTime() {
                return 128 / this.context.sampleRate;
              }
              toSeconds(t) {
                return Yn(t),
                new Zi(this.context, t).toSeconds();
              }
              toFrequency(t) {
                return new Yi(this.context, t).toFrequency();
              }
              toTicks(t) {
                return new Ki(this.context, t).toTicks();
              }
              _getPartialProperties(t) {
                const e = this.get();
                return Object.keys(e).forEach(s=>{
                  Fn(t[s]) && delete e[s];
                }),
                e;
              }
              get() {
                const t = this.constructor.getDefaults();
                return Object.keys(t).forEach(e=>{
                  if (Reflect.has(this, e)) {
                    const s = this[e];
                    In(s) && In(s.value) && In(s.setValueAtTime) ? t[e] = s.value : s instanceof eo ? t[e] = s._getPartialProperties(t[e]) : Ln(s) || Nn(s) || zn(s) || jn(s) ? t[e] = s : delete t[e];
                  }
                }),
                t;
              }
              set(t) {
                return Object.keys(t).forEach(e=>{
                  Reflect.has(this, e) && In(this[e]) && (this[e] && In(this[e].value) && In(this[e].setValueAtTime) ? this[e].value !== t[e] && (this[e].value = t[e]) : this[e] instanceof eo ? this[e].set(t[e]) : this[e] = t[e]);
                }),
                this;
              }
            }
            class so extends wi {
              constructor(t = 'stopped') {
                super (),
                this.name = 'StateTimeline',
                this._initial = t,
                this.setStateAtTime(this._initial, 0);
              }
              getValueAtTime(t) {
                const e = this.get(t);
                return null !== e ? e.state : this._initial;
              }
              setStateAtTime(t, e, s) {
                return Un(e, 0),
                this.add(Object.assign({
                }, s, {
                  state: t,
                  time: e
                })),
                this;
              }
              getLastState(t, e) {
                for (let s = this._search(e); s >= 0; s--) {
                  const e = this._timeline[s];
                  if (e.state === t) return e;
                }
              }
              getNextState(t, e) {
                const s = this._search(e);
                if ( - 1 !== s) for (let e = s; e < this._timeline.length; e++) {
                  const s = this._timeline[e];
                  if (s.state === t) return s;
                }
              }
            }
            class no extends eo {
              constructor() {
                super (ui(no.getDefaults(), arguments, [
                  'param',
                  'units',
                  'convert'
                ])),
                this.name = 'Param',
                this.overridden = !1,
                this._minOutput = 1e-7;
                const t = ui(no.getDefaults(), arguments, [
                  'param',
                  'units',
                  'convert'
                ]);
                for (Bn(In(t.param) && (oi(t.param) || t.param instanceof no), 'param must be an AudioParam'); !oi(t.param); ) t.param = t.param._param;
                this._swappable = !!In(t.swappable) && t.swappable,
                this._swappable ? (this.input = this.context.createGain(), this._param = t.param, this.input.connect(this._param)) : this._param = this.input = t.param,
                this._events = new wi(1000),
                this._initialValue = this._param.defaultValue,
                this.units = t.units,
                this.convert = t.convert,
                this._minValue = t.minValue,
                this._maxValue = t.maxValue,
                In(t.value) && t.value !== this._toType(this._initialValue) && this.setValueAtTime(t.value, 0);
              }
              static getDefaults() {
                return Object.assign(eo.getDefaults(), {
                  convert: !0,
                  units: 'number'
                });
              }
              get value() {
                const t = this.now();
                return this.getValueAtTime(t);
              }
              set value(t) {
                this.cancelScheduledValues(this.now()),
                this.setValueAtTime(t, this.now());
              }
              get minValue() {
                return In(this._minValue) ? this._minValue : 'time' === this.units || 'frequency' === this.units || 'normalRange' === this.units || 'positive' === this.units || 'transportTime' === this.units || 'ticks' === this.units || 'bpm' === this.units || 'hertz' === this.units || 'samples' === this.units ? 0 : 'audioRange' === this.units ? - 1 : 'decibels' === this.units ? - 1 / 0 : this._param.minValue;
              }
              get maxValue() {
                return In(this._maxValue) ? this._maxValue : 'normalRange' === this.units || 'audioRange' === this.units ? 1 : this._param.maxValue;
              }
              _is(t, e) {
                return this.units === e;
              }
              _assertRange(t) {
                return In(this.maxValue) && In(this.minValue) && Un(t, this._fromType(this.minValue), this._fromType(this.maxValue)),
                t;
              }
              _fromType(t) {
                return this.convert && !this.overridden ? this._is(t, 'time') ? this.toSeconds(t) : this._is(t, 'decibels') ? ji(t) : this._is(t, 'frequency') ? this.toFrequency(t) : t : this.overridden ? 0 : t;
              }
              _toType(t) {
                return this.convert && 'decibels' === this.units ? Li(t) : t;
              }
              setValueAtTime(t, e) {
                const s = this.toSeconds(e),
                n = this._fromType(t);
                return Bn(isFinite(n) && isFinite(s), `Invalid argument(s) to setValueAtTime: ${ JSON.stringify(t) }, ${ JSON.stringify(e) }`),
                this._assertRange(n),
                this.log(this.units, 'setValueAtTime', t, s),
                this._events.add({
                  time: s,
                  type: 'setValueAtTime',
                  value: n
                }),
                this._param.setValueAtTime(n, s),
                this;
              }
              getValueAtTime(t) {
                const e = Math.max(this.toSeconds(t), 0),
                s = this._events.getAfter(e),
                n = this._events.get(e);
                let i = this._initialValue;
                if (null === n) i = this._initialValue;
                 else if ('setTargetAtTime' !== n.type || null !== s && 'setValueAtTime' !== s.type) {
                  if (null === s) i = n.value;
                   else if ('linearRampToValueAtTime' === s.type || 'exponentialRampToValueAtTime' === s.type) {
                    let t = n.value;
                    if ('setTargetAtTime' === n.type) {
                      const e = this._events.getBefore(n.time);
                      t = null === e ? this._initialValue : e.value;
                    }
                    i = 'linearRampToValueAtTime' === s.type ? this._linearInterpolate(n.time, t, s.time, s.value, e) : this._exponentialInterpolate(n.time, t, s.time, s.value, e);
                  } else i = n.value;
                } else {
                  const t = this._events.getBefore(n.time);
                  let s;
                  s = null === t ? this._initialValue : t.value,
                  'setTargetAtTime' === n.type && (i = this._exponentialApproach(n.time, s, n.value, n.constant, e));
                }
                return this._toType(i);
              }
              setRampPoint(t) {
                t = this.toSeconds(t);
                let e = this.getValueAtTime(t);
                return this.cancelAndHoldAtTime(t),
                0 === this._fromType(e) && (e = this._toType(this._minOutput)),
                this.setValueAtTime(e, t),
                this;
              }
              linearRampToValueAtTime(t, e) {
                const s = this._fromType(t),
                n = this.toSeconds(e);
                return Bn(isFinite(s) && isFinite(n), `Invalid argument(s) to linearRampToValueAtTime: ${ JSON.stringify(t) }, ${ JSON.stringify(e) }`),
                this._assertRange(s),
                this._events.add({
                  time: n,
                  type: 'linearRampToValueAtTime',
                  value: s
                }),
                this.log(this.units, 'linearRampToValueAtTime', t, n),
                this._param.linearRampToValueAtTime(s, n),
                this;
              }
              exponentialRampToValueAtTime(t, e) {
                let s = this._fromType(t);
                s = yi(s, 0) ? this._minOutput : s,
                this._assertRange(s);
                const n = this.toSeconds(e);
                return Bn(isFinite(s) && isFinite(n), `Invalid argument(s) to exponentialRampToValueAtTime: ${ JSON.stringify(t) }, ${ JSON.stringify(e) }`),
                this._events.add({
                  time: n,
                  type: 'exponentialRampToValueAtTime',
                  value: s
                }),
                this.log(this.units, 'exponentialRampToValueAtTime', t, n),
                this._param.exponentialRampToValueAtTime(s, n),
                this;
              }
              exponentialRampTo(t, e, s) {
                return s = this.toSeconds(s),
                this.setRampPoint(s),
                this.exponentialRampToValueAtTime(t, s + this.toSeconds(e)),
                this;
              }
              linearRampTo(t, e, s) {
                return s = this.toSeconds(s),
                this.setRampPoint(s),
                this.linearRampToValueAtTime(t, s + this.toSeconds(e)),
                this;
              }
              targetRampTo(t, e, s) {
                return s = this.toSeconds(s),
                this.setRampPoint(s),
                this.exponentialApproachValueAtTime(t, s, e),
                this;
              }
              exponentialApproachValueAtTime(t, e, s) {
                e = this.toSeconds(e),
                s = this.toSeconds(s);
                const n = Math.log(s + 1) / Math.log(200);
                return this.setTargetAtTime(t, e, n),
                this.cancelAndHoldAtTime(e + 0.9 * s),
                this.linearRampToValueAtTime(t, e + s),
                this;
              }
              setTargetAtTime(t, e, s) {
                const n = this._fromType(t);
                Bn(isFinite(s) && s > 0, 'timeConstant must be a number greater than 0');
                const i = this.toSeconds(e);
                return this._assertRange(n),
                Bn(isFinite(n) && isFinite(i), `Invalid argument(s) to setTargetAtTime: ${ JSON.stringify(t) }, ${ JSON.stringify(e) }`),
                this._events.add({
                  constant: s,
                  time: i,
                  type: 'setTargetAtTime',
                  value: n
                }),
                this.log(this.units, 'setTargetAtTime', t, i, s),
                this._param.setTargetAtTime(n, i, s),
                this;
              }
              setValueCurveAtTime(t, e, s, n = 1) {
                s = this.toSeconds(s),
                e = this.toSeconds(e);
                const i = this._fromType(t[0]) * n;
                this.setValueAtTime(this._toType(i), e);
                const o = s / (t.length - 1);
                for (let s = 1; s < t.length; s++) {
                  const i = this._fromType(t[s]) * n;
                  this.linearRampToValueAtTime(this._toType(i), e + s * o);
                }
                return this;
              }
              cancelScheduledValues(t) {
                const e = this.toSeconds(t);
                return Bn(isFinite(e), `Invalid argument to cancelScheduledValues: ${ JSON.stringify(t) }`),
                this._events.cancel(e),
                this._param.cancelScheduledValues(e),
                this.log(this.units, 'cancelScheduledValues', e),
                this;
              }
              cancelAndHoldAtTime(t) {
                const e = this.toSeconds(t),
                s = this._fromType(this.getValueAtTime(e));
                Bn(isFinite(e), `Invalid argument to cancelAndHoldAtTime: ${ JSON.stringify(t) }`),
                this.log(this.units, 'cancelAndHoldAtTime', e, 'value=' + s);
                const n = this._events.get(e),
                i = this._events.getAfter(e);
                return n && yi(n.time, e) ? i ? (this._param.cancelScheduledValues(i.time), this._events.cancel(i.time)) : (this._param.cancelAndHoldAtTime(e), this._events.cancel(e + this.sampleTime)) : i && (this._param.cancelScheduledValues(i.time), this._events.cancel(i.time), 'linearRampToValueAtTime' === i.type ? this.linearRampToValueAtTime(this._toType(s), e) : 'exponentialRampToValueAtTime' === i.type && this.exponentialRampToValueAtTime(this._toType(s), e)),
                this._events.add({
                  time: e,
                  type: 'setValueAtTime',
                  value: s
                }),
                this._param.setValueAtTime(s, e),
                this;
              }
              rampTo(t, e = 0.1, s) {
                return 'frequency' === this.units || 'bpm' === this.units || 'decibels' === this.units ? this.exponentialRampTo(t, e, s) : this.linearRampTo(t, e, s),
                this;
              }
              apply(t) {
                const e = this.context.currentTime;
                t.setValueAtTime(this.getValueAtTime(e), e);
                const s = this._events.get(e);
                if (s && 'setTargetAtTime' === s.type) {
                  const n = this._events.getAfter(s.time),
                  i = n ? n.time : e + 2,
                  o = (i - e) / 10;
                  for (let s = e; s < i; s += o) t.linearRampToValueAtTime(this.getValueAtTime(s), s);
                }
                return this._events.forEachAfter(this.context.currentTime, e=>{
                  'cancelScheduledValues' === e.type ? t.cancelScheduledValues(e.time) : 'setTargetAtTime' === e.type ? t.setTargetAtTime(e.value, e.time, e.constant) : t[e.type](e.value, e.time);
                }),
                this;
              }
              setParam(t) {
                Bn(this._swappable, 'The Param must be assigned as \'swappable\' in the constructor');
                const e = this.input;
                return e.disconnect(this._param),
                this.apply(t),
                this._param = t,
                e.connect(this._param),
                this;
              }
              dispose() {
                return super.dispose(),
                this._events.dispose(),
                this;
              }
              get defaultValue() {
                return this._toType(this._param.defaultValue);
              }
              _exponentialApproach(t, e, s, n, i) {
                return s + (e - s) * Math.exp( - (i - t) / n);
              }
              _linearInterpolate(t, e, s, n, i) {
                return e + (i - t) / (s - t) * (n - e);
              }
              _exponentialInterpolate(t, e, s, n, i) {
                return e * Math.pow(n / e, (i - t) / (s - t));
              }
            }
            class io extends eo {
              constructor() {
                super (...arguments),
                this._internalChannels = [
                ];
              }
              get numberOfInputs() {
                return In(this.input) ? oi(this.input) || this.input instanceof no ? 1 : this.input.numberOfInputs : 0;
              }
              get numberOfOutputs() {
                return In(this.output) ? this.output.numberOfOutputs : 0;
              }
              _isAudioNode(t) {
                return In(t) && (t instanceof io || ri(t));
              }
              _getInternalNodes() {
                const t = this._internalChannels.slice(0);
                return this._isAudioNode(this.input) && t.push(this.input),
                this._isAudioNode(this.output) && this.input !== this.output && t.push(this.output),
                t;
              }
              _setChannelProperties(t) {
                this._getInternalNodes().forEach(e=>{
                  e.channelCount = t.channelCount,
                  e.channelCountMode = t.channelCountMode,
                  e.channelInterpretation = t.channelInterpretation;
                });
              }
              _getChannelProperties() {
                const t = this._getInternalNodes();
                Bn(t.length > 0, 'ToneAudioNode does not have any internal nodes');
                const e = t[0];
                return {
                  channelCount: e.channelCount,
                  channelCountMode: e.channelCountMode,
                  channelInterpretation: e.channelInterpretation
                };
              }
              get channelCount() {
                return this._getChannelProperties().channelCount;
              }
              set channelCount(t) {
                const e = this._getChannelProperties();
                this._setChannelProperties(Object.assign(e, {
                  channelCount: t
                }));
              }
              get channelCountMode() {
                return this._getChannelProperties().channelCountMode;
              }
              set channelCountMode(t) {
                const e = this._getChannelProperties();
                this._setChannelProperties(Object.assign(e, {
                  channelCountMode: t
                }));
              }
              get channelInterpretation() {
                return this._getChannelProperties().channelInterpretation;
              }
              set channelInterpretation(t) {
                const e = this._getChannelProperties();
                this._setChannelProperties(Object.assign(e, {
                  channelInterpretation: t
                }));
              }
              connect(t, e = 0, s = 0) {
                return ro(this, t, e, s),
                this;
              }
              toDestination() {
                return this.connect(this.context.destination),
                this;
              }
              toMaster() {
                return Kn('toMaster() has been renamed toDestination()'),
                this.toDestination();
              }
              disconnect(t, e = 0, s = 0) {
                return ao(this, t, e, s),
                this;
              }
              chain(...t) {
                return oo(this, ...t),
                this;
              }
              fan(...t) {
                return t.forEach(t=>this.connect(t)),
                this;
              }
              dispose() {
                return super.dispose(),
                In(this.input) && (this.input instanceof io ? this.input.dispose() : ri(this.input) && this.input.disconnect()),
                In(this.output) && (this.output instanceof io ? this.output.dispose() : ri(this.output) && this.output.disconnect()),
                this._internalChannels = [
                ],
                this;
              }
            }
            function oo(...t) {
              const e = t.shift();
              t.reduce((t, e) =>(t instanceof io ? t.connect(e) : ri(t) && ro(t, e), e), e);
            }
            function ro(t, e, s = 0, n = 0) {
              for (Bn(In(t), 'Cannot connect from undefined node'), Bn(In(e), 'Cannot connect to undefined node'), (e instanceof io || ri(e)) && Bn(e.numberOfInputs > 0, 'Cannot connect to node with no inputs'), Bn(t.numberOfOutputs > 0, 'Cannot connect from node with no outputs'); e instanceof io || e instanceof no; ) In(e.input) && (e = e.input);
              for (; t instanceof io; ) In(t.output) && (t = t.output);
              oi(e) ? t.connect(e, s) : t.connect(e, s, n);
            }
            function ao(t, e, s = 0, n = 0) {
              if (In(e)) for (; e instanceof io; ) e = e.input;
              for (; !ri(t); ) In(t.output) && (t = t.output);
              oi(e) ? t.disconnect(e, s) : ri(e) ? t.disconnect(e, s, n) : t.disconnect();
            }
            function co(...t) {
              const e = t.pop();
              In(e) && t.forEach(t=>ro(t, e));
            }
            class ho extends io {
              constructor() {
                super (ui(ho.getDefaults(), arguments, [
                  'gain',
                  'units'
                ])),
                this.name = 'Gain',
                this._gainNode = this.context.createGain(),
                this.input = this._gainNode,
                this.output = this._gainNode;
                const t = ui(ho.getDefaults(), arguments, [
                  'gain',
                  'units'
                ]);
                this.gain = new no({
                  context: this.context,
                  convert: t.convert,
                  param: this._gainNode.gain,
                  units: t.units,
                  value: t.gain,
                  minValue: t.minValue,
                  maxValue: t.maxValue
                }),
                Oi(this, 'gain');
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  convert: !0,
                  gain: 1,
                  units: 'gain'
                });
              }
              dispose() {
                return super.dispose(),
                this._gainNode.disconnect(),
                this.gain.dispose(),
                this;
              }
            }
            class lo extends io {
              constructor(t) {
                super (t),
                this.onended = Ei,
                this._startTime = - 1,
                this._stopTime = - 1,
                this._timeout = - 1,
                this.output = new ho({
                  context: this.context,
                  gain: 0
                }),
                this._gainNode = this.output,
                this.getStateAtTime = function (t) {
                  const e = this.toSeconds(t);
                  return - 1 !== this._startTime && e >= this._startTime && ( - 1 === this._stopTime || e <= this._stopTime) ? 'started' : 'stopped';
                },
                this._fadeIn = t.fadeIn,
                this._fadeOut = t.fadeOut,
                this._curve = t.curve,
                this.onended = t.onended;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  curve: 'linear',
                  fadeIn: 0,
                  fadeOut: 0,
                  onended: Ei
                });
              }
              _startGain(t, e = 1) {
                Bn( - 1 === this._startTime, 'Source cannot be started more than once');
                const s = this.toSeconds(this._fadeIn);
                return this._startTime = t + s,
                this._startTime = Math.max(this._startTime, this.context.currentTime),
                s > 0 ? (this._gainNode.gain.setValueAtTime(0, t), 'linear' === this._curve ? this._gainNode.gain.linearRampToValueAtTime(e, t + s) : this._gainNode.gain.exponentialApproachValueAtTime(e, t, s)) : this._gainNode.gain.setValueAtTime(e, t),
                this;
              }
              stop(t) {
                return this.log('stop', t),
                this._stopGain(this.toSeconds(t)),
                this;
              }
              _stopGain(t) {
                Bn( - 1 !== this._startTime, '\'start\' must be called before \'stop\''),
                this.cancelStop();
                const e = this.toSeconds(this._fadeOut);
                return this._stopTime = this.toSeconds(t) + e,
                this._stopTime = Math.max(this._stopTime, this.now()),
                e > 0 ? 'linear' === this._curve ? this._gainNode.gain.linearRampTo(0, e, t) : this._gainNode.gain.targetRampTo(0, e, t) : (this._gainNode.gain.cancelAndHoldAtTime(t), this._gainNode.gain.setValueAtTime(0, t)),
                this.context.clearTimeout(this._timeout),
                this._timeout = this.context.setTimeout(() =>{
                  const t = 'exponential' === this._curve ? 2 * e : 0;
                  this._stopSource(this.now() + t),
                  this._onended();
                }, this._stopTime - this.context.currentTime),
                this;
              }
              _onended() {
                if (this.onended !== Ei && (this.onended(this), this.onended = Ei, !this.context.isOffline)) {
                  const t = () =>this.dispose();
                  void 0 !== window.requestIdleCallback ? window.requestIdleCallback(t) : setTimeout(t, 1000);
                }
              }
              get state() {
                return this.getStateAtTime(this.now());
              }
              cancelStop() {
                return this.log('cancelStop'),
                Bn( - 1 !== this._startTime, 'Source is not started'),
                this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime),
                this.context.clearTimeout(this._timeout),
                this._stopTime = - 1,
                this;
              }
              dispose() {
                return super.dispose(),
                this._gainNode.dispose(),
                this.onended = Ei,
                this;
              }
            }
            class uo extends lo {
              constructor() {
                super (ui(uo.getDefaults(), arguments, [
                  'offset'
                ])),
                this.name = 'ToneConstantSource',
                this._source = this.context.createConstantSource();
                const t = ui(uo.getDefaults(), arguments, [
                  'offset'
                ]);
                ro(this._source, this._gainNode),
                this.offset = new no({
                  context: this.context,
                  convert: t.convert,
                  param: this._source.offset,
                  units: t.units,
                  value: t.offset,
                  minValue: t.minValue,
                  maxValue: t.maxValue
                });
              }
              static getDefaults() {
                return Object.assign(lo.getDefaults(), {
                  convert: !0,
                  offset: 1,
                  units: 'number'
                });
              }
              start(t) {
                const e = this.toSeconds(t);
                return this.log('start', e),
                this._startGain(e),
                this._source.start(e),
                this;
              }
              _stopSource(t) {
                this._source.stop(t);
              }
              dispose() {
                return super.dispose(),
                'started' === this.state && this.stop(),
                this._source.disconnect(),
                this.offset.dispose(),
                this;
              }
            }
            class po extends io {
              constructor() {
                super (ui(po.getDefaults(), arguments, [
                  'value',
                  'units'
                ])),
                this.name = 'Signal',
                this.override = !0;
                const t = ui(po.getDefaults(), arguments, [
                  'value',
                  'units'
                ]);
                this.output = this._constantSource = new uo({
                  context: this.context,
                  convert: t.convert,
                  offset: t.value,
                  units: t.units,
                  minValue: t.minValue,
                  maxValue: t.maxValue
                }),
                this._constantSource.start(0),
                this.input = this._param = this._constantSource.offset;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  convert: !0,
                  units: 'number',
                  value: 0
                });
              }
              connect(t, e = 0, s = 0) {
                return fo(this, t, e, s),
                this;
              }
              dispose() {
                return super.dispose(),
                this._param.dispose(),
                this._constantSource.dispose(),
                this;
              }
              setValueAtTime(t, e) {
                return this._param.setValueAtTime(t, e),
                this;
              }
              getValueAtTime(t) {
                return this._param.getValueAtTime(t);
              }
              setRampPoint(t) {
                return this._param.setRampPoint(t),
                this;
              }
              linearRampToValueAtTime(t, e) {
                return this._param.linearRampToValueAtTime(t, e),
                this;
              }
              exponentialRampToValueAtTime(t, e) {
                return this._param.exponentialRampToValueAtTime(t, e),
                this;
              }
              exponentialRampTo(t, e, s) {
                return this._param.exponentialRampTo(t, e, s),
                this;
              }
              linearRampTo(t, e, s) {
                return this._param.linearRampTo(t, e, s),
                this;
              }
              targetRampTo(t, e, s) {
                return this._param.targetRampTo(t, e, s),
                this;
              }
              exponentialApproachValueAtTime(t, e, s) {
                return this._param.exponentialApproachValueAtTime(t, e, s),
                this;
              }
              setTargetAtTime(t, e, s) {
                return this._param.setTargetAtTime(t, e, s),
                this;
              }
              setValueCurveAtTime(t, e, s, n) {
                return this._param.setValueCurveAtTime(t, e, s, n),
                this;
              }
              cancelScheduledValues(t) {
                return this._param.cancelScheduledValues(t),
                this;
              }
              cancelAndHoldAtTime(t) {
                return this._param.cancelAndHoldAtTime(t),
                this;
              }
              rampTo(t, e, s) {
                return this._param.rampTo(t, e, s),
                this;
              }
              get value() {
                return this._param.value;
              }
              set value(t) {
                this._param.value = t;
              }
              get convert() {
                return this._param.convert;
              }
              set convert(t) {
                this._param.convert = t;
              }
              get units() {
                return this._param.units;
              }
              get overridden() {
                return this._param.overridden;
              }
              set overridden(t) {
                this._param.overridden = t;
              }
              get maxValue() {
                return this._param.maxValue;
              }
              get minValue() {
                return this._param.minValue;
              }
              apply(t) {
                return this._param.apply(t),
                this;
              }
            }
            function fo(t, e, s, n) {
              (e instanceof no || oi(e) || e instanceof po && e.override) && (e.cancelScheduledValues(0), e.setValueAtTime(0, 0), e instanceof po && (e.overridden = !0)),
              ro(t, e, s, n);
            }
            class _o extends no {
              constructor() {
                super (ui(_o.getDefaults(), arguments, [
                  'value'
                ])),
                this.name = 'TickParam',
                this._events = new wi(1 / 0),
                this._multiplier = 1;
                const t = ui(_o.getDefaults(), arguments, [
                  'value'
                ]);
                this._multiplier = t.multiplier,
                this._events.cancel(0),
                this._events.add({
                  ticks: 0,
                  time: 0,
                  type: 'setValueAtTime',
                  value: this._fromType(t.value)
                }),
                this.setValueAtTime(t.value, 0);
              }
              static getDefaults() {
                return Object.assign(no.getDefaults(), {
                  multiplier: 1,
                  units: 'hertz',
                  value: 1
                });
              }
              setTargetAtTime(t, e, s) {
                e = this.toSeconds(e),
                this.setRampPoint(e);
                const n = this._fromType(t),
                i = this._events.get(e),
                o = Math.round(Math.max(1 / s, 1));
                for (let t = 0; t <= o; t++) {
                  const o = s * t + e,
                  r = this._exponentialApproach(i.time, i.value, n, s, o);
                  this.linearRampToValueAtTime(this._toType(r), o);
                }
                return this;
              }
              setValueAtTime(t, e) {
                const s = this.toSeconds(e);
                super.setValueAtTime(t, e);
                const n = this._events.get(s),
                i = this._events.previousEvent(n),
                o = this._getTicksUntilEvent(i, s);
                return n.ticks = Math.max(o, 0),
                this;
              }
              linearRampToValueAtTime(t, e) {
                const s = this.toSeconds(e);
                super.linearRampToValueAtTime(t, e);
                const n = this._events.get(s),
                i = this._events.previousEvent(n),
                o = this._getTicksUntilEvent(i, s);
                return n.ticks = Math.max(o, 0),
                this;
              }
              exponentialRampToValueAtTime(t, e) {
                e = this.toSeconds(e);
                const s = this._fromType(t),
                n = this._events.get(e),
                i = Math.round(Math.max(10 * (e - n.time), 1)),
                o = (e - n.time) / i;
                for (let t = 0; t <= i; t++) {
                  const i = o * t + n.time,
                  r = this._exponentialInterpolate(n.time, n.value, e, s, i);
                  this.linearRampToValueAtTime(this._toType(r), i);
                }
                return this;
              }
              _getTicksUntilEvent(t, e) {
                if (null === t) t = {
                  ticks: 0,
                  time: 0,
                  type: 'setValueAtTime',
                  value: 0
                };
                 else if (Fn(t.ticks)) {
                  const e = this._events.previousEvent(t);
                  t.ticks = this._getTicksUntilEvent(e, t.time);
                }
                const s = this._fromType(this.getValueAtTime(t.time));
                let n = this._fromType(this.getValueAtTime(e));
                const i = this._events.get(e);
                return i && i.time === e && 'setValueAtTime' === i.type && (n = this._fromType(this.getValueAtTime(e - this.sampleTime))),
                0.5 * (e - t.time) * (s + n) + t.ticks;
              }
              getTicksAtTime(t) {
                const e = this.toSeconds(t),
                s = this._events.get(e);
                return Math.max(this._getTicksUntilEvent(s, e), 0);
              }
              getDurationOfTicks(t, e) {
                const s = this.toSeconds(e),
                n = this.getTicksAtTime(e);
                return this.getTimeOfTick(n + t) - s;
              }
              getTimeOfTick(t) {
                const e = this._events.get(t, 'ticks'),
                s = this._events.getAfter(t, 'ticks');
                if (e && e.ticks === t) return e.time;
                if (e && s && 'linearRampToValueAtTime' === s.type && e.value !== s.value) {
                  const n = this._fromType(this.getValueAtTime(e.time)),
                  i = (this._fromType(this.getValueAtTime(s.time)) - n) / (s.time - e.time),
                  o = Math.sqrt(Math.pow(n, 2) - 2 * i * (e.ticks - t)),
                  r = ( - n + o) / i,
                  a = ( - n - o) / i;
                  return (r > 0 ? r : a) + e.time;
                }
                return e ? 0 === e.value ? 1 / 0 : e.time + (t - e.ticks) / e.value : t / this._initialValue;
              }
              ticksToTime(t, e) {
                return this.getDurationOfTicks(t, e);
              }
              timeToTicks(t, e) {
                const s = this.toSeconds(e),
                n = this.toSeconds(t),
                i = this.getTicksAtTime(s);
                return this.getTicksAtTime(s + n) - i;
              }
              _fromType(t) {
                return 'bpm' === this.units && this.multiplier ? 1 / (60 / t / this.multiplier) : super._fromType(t);
              }
              _toType(t) {
                return 'bpm' === this.units && this.multiplier ? t / this.multiplier * 60 : super._toType(t);
              }
              get multiplier() {
                return this._multiplier;
              }
              set multiplier(t) {
                const e = this.value;
                this._multiplier = t,
                this.cancelScheduledValues(0),
                this.setValueAtTime(e, 0);
              }
            }
            class mo extends po {
              constructor() {
                super (ui(mo.getDefaults(), arguments, [
                  'value'
                ])),
                this.name = 'TickSignal';
                const t = ui(mo.getDefaults(), arguments, [
                  'value'
                ]);
                this.input = this._param = new _o({
                  context: this.context,
                  convert: t.convert,
                  multiplier: t.multiplier,
                  param: this._constantSource.offset,
                  units: t.units,
                  value: t.value
                });
              }
              static getDefaults() {
                return Object.assign(po.getDefaults(), {
                  multiplier: 1,
                  units: 'hertz',
                  value: 1
                });
              }
              ticksToTime(t, e) {
                return this._param.ticksToTime(t, e);
              }
              timeToTicks(t, e) {
                return this._param.timeToTicks(t, e);
              }
              getTimeOfTick(t) {
                return this._param.getTimeOfTick(t);
              }
              getDurationOfTicks(t, e) {
                return this._param.getDurationOfTicks(t, e);
              }
              getTicksAtTime(t) {
                return this._param.getTicksAtTime(t);
              }
              get multiplier() {
                return this._param.multiplier;
              }
              set multiplier(t) {
                this._param.multiplier = t;
              }
              dispose() {
                return super.dispose(),
                this._param.dispose(),
                this;
              }
            }
            class go extends eo {
              constructor() {
                super (ui(go.getDefaults(), arguments, [
                  'frequency'
                ])),
                this.name = 'TickSource',
                this._state = new so(),
                this._tickOffset = new wi(),
                this._ticksAtTime = new wi(),
                this._secondsAtTime = new wi();
                const t = ui(go.getDefaults(), arguments, [
                  'frequency'
                ]);
                this.frequency = new mo({
                  context: this.context,
                  units: t.units,
                  value: t.frequency
                }),
                Oi(this, 'frequency'),
                this._state.setStateAtTime('stopped', 0),
                this.setTicksAtTime(0, 0);
              }
              static getDefaults() {
                return Object.assign({
                  frequency: 1,
                  units: 'hertz'
                }, eo.getDefaults());
              }
              get state() {
                return this.getStateAtTime(this.now());
              }
              start(t, e) {
                const s = this.toSeconds(t);
                return 'started' !== this._state.getValueAtTime(s) && (this._state.setStateAtTime('started', s), In(e) && this.setTicksAtTime(e, s), this._ticksAtTime.cancel(s), this._secondsAtTime.cancel(s)),
                this;
              }
              stop(t) {
                const e = this.toSeconds(t);
                if ('stopped' === this._state.getValueAtTime(e)) {
                  const t = this._state.get(e);
                  t && t.time > 0 && (this._tickOffset.cancel(t.time), this._state.cancel(t.time));
                }
                return this._state.cancel(e),
                this._state.setStateAtTime('stopped', e),
                this.setTicksAtTime(0, e),
                this._ticksAtTime.cancel(e),
                this._secondsAtTime.cancel(e),
                this;
              }
              pause(t) {
                const e = this.toSeconds(t);
                return 'started' === this._state.getValueAtTime(e) && (this._state.setStateAtTime('paused', e), this._ticksAtTime.cancel(e), this._secondsAtTime.cancel(e)),
                this;
              }
              cancel(t) {
                return t = this.toSeconds(t),
                this._state.cancel(t),
                this._tickOffset.cancel(t),
                this._ticksAtTime.cancel(t),
                this._secondsAtTime.cancel(t),
                this;
              }
              getTicksAtTime(t) {
                const e = this.toSeconds(t),
                s = this._state.getLastState('stopped', e),
                n = this._ticksAtTime.get(e),
                i = {
                  state: 'paused',
                  time: e
                };
                this._state.add(i);
                let o = n || s,
                r = n ? n.ticks : 0,
                a = null;
                return this._state.forEachBetween(o.time, e + this.sampleTime, t=>{
                  let e = o.time;
                  const s = this._tickOffset.get(t.time);
                  s && s.time >= o.time && (r = s.ticks, e = s.time),
                  'started' === o.state && 'started' !== t.state && (r += this.frequency.getTicksAtTime(t.time) - this.frequency.getTicksAtTime(e), t.time != i.time && (a = {
                    state: t.state,
                    time: t.time,
                    ticks: r
                  })),
                  o = t;
                }),
                this._state.remove(i),
                a && this._ticksAtTime.add(a),
                r;
              }
              get ticks() {
                return this.getTicksAtTime(this.now());
              }
              set ticks(t) {
                this.setTicksAtTime(t, this.now());
              }
              get seconds() {
                return this.getSecondsAtTime(this.now());
              }
              set seconds(t) {
                const e = this.now(),
                s = this.frequency.timeToTicks(t, e);
                this.setTicksAtTime(s, e);
              }
              getSecondsAtTime(t) {
                t = this.toSeconds(t);
                const e = this._state.getLastState('stopped', t),
                s = {
                  state: 'paused',
                  time: t
                };
                this._state.add(s);
                const n = this._secondsAtTime.get(t);
                let i = n || e,
                o = n ? n.seconds : 0,
                r = null;
                return this._state.forEachBetween(i.time, t + this.sampleTime, t=>{
                  let e = i.time;
                  const n = this._tickOffset.get(t.time);
                  n && n.time >= i.time && (o = n.seconds, e = n.time),
                  'started' === i.state && 'started' !== t.state && (o += t.time - e, t.time != s.time && (r = {
                    state: t.state,
                    time: t.time,
                    seconds: o
                  })),
                  i = t;
                }),
                this._state.remove(s),
                r && this._secondsAtTime.add(r),
                o;
              }
              setTicksAtTime(t, e) {
                return e = this.toSeconds(e),
                this._tickOffset.cancel(e),
                this._tickOffset.add({
                  seconds: this.frequency.getDurationOfTicks(t, e),
                  ticks: t,
                  time: e
                }),
                this._ticksAtTime.cancel(e),
                this._secondsAtTime.cancel(e),
                this;
              }
              getStateAtTime(t) {
                return t = this.toSeconds(t),
                this._state.getValueAtTime(t);
              }
              getTimeOfTick(t, e = this.now()) {
                const s = this._tickOffset.get(e),
                n = this._state.get(e),
                i = Math.max(s.time, n.time),
                o = this.frequency.getTicksAtTime(i) + t - s.ticks;
                return this.frequency.getTimeOfTick(o);
              }
              forEachTickBetween(t, e, s) {
                let n = this._state.get(t);
                this._state.forEachBetween(t, e, e=>{
                  n && 'started' === n.state && 'started' !== e.state && this.forEachTickBetween(Math.max(n.time, t), e.time - this.sampleTime, s),
                  n = e;
                });
                let i = null;
                if (n && 'started' === n.state) {
                  const o = Math.max(n.time, t),
                  r = this.frequency.getTicksAtTime(o),
                  a = r - this.frequency.getTicksAtTime(n.time);
                  let c = Math.ceil(a) - a;
                  c = yi(c, 1) ? 0 : c;
                  let h = this.frequency.getTimeOfTick(r + c);
                  for (; h < e; ) {
                    try {
                      s(h, Math.round(this.getTicksAtTime(h)));
                    } catch (t) {
                      i = t;
                      break;
                    }
                    h += this.frequency.getDurationOfTicks(1, h);
                  }
                }
                if (i) throw i;
                return this;
              }
              dispose() {
                return super.dispose(),
                this._state.dispose(),
                this._tickOffset.dispose(),
                this._ticksAtTime.dispose(),
                this._secondsAtTime.dispose(),
                this.frequency.dispose(),
                this;
              }
            }
            class vo extends eo {
              constructor() {
                super (ui(vo.getDefaults(), arguments, [
                  'callback',
                  'frequency'
                ])),
                this.name = 'Clock',
                this.callback = Ei,
                this._lastUpdate = 0,
                this._state = new so('stopped'),
                this._boundLoop = this._loop.bind(this);
                const t = ui(vo.getDefaults(), arguments, [
                  'callback',
                  'frequency'
                ]);
                this.callback = t.callback,
                this._tickSource = new go({
                  context: this.context,
                  frequency: t.frequency,
                  units: t.units
                }),
                this._lastUpdate = 0,
                this.frequency = this._tickSource.frequency,
                Oi(this, 'frequency'),
                this._state.setStateAtTime('stopped', 0),
                this.context.on('tick', this._boundLoop);
              }
              static getDefaults() {
                return Object.assign(eo.getDefaults(), {
                  callback: Ei,
                  frequency: 1,
                  units: 'hertz'
                });
              }
              get state() {
                return this._state.getValueAtTime(this.now());
              }
              start(t, e) {
                Gn(this.context);
                const s = this.toSeconds(t);
                return this.log('start', s),
                'started' !== this._state.getValueAtTime(s) && (this._state.setStateAtTime('started', s), this._tickSource.start(s, e), s < this._lastUpdate && this.emit('start', s, e)),
                this;
              }
              stop(t) {
                const e = this.toSeconds(t);
                return this.log('stop', e),
                this._state.cancel(e),
                this._state.setStateAtTime('stopped', e),
                this._tickSource.stop(e),
                e < this._lastUpdate && this.emit('stop', e),
                this;
              }
              pause(t) {
                const e = this.toSeconds(t);
                return 'started' === this._state.getValueAtTime(e) && (this._state.setStateAtTime('paused', e), this._tickSource.pause(e), e < this._lastUpdate && this.emit('pause', e)),
                this;
              }
              get ticks() {
                return Math.ceil(this.getTicksAtTime(this.now()));
              }
              set ticks(t) {
                this._tickSource.ticks = t;
              }
              get seconds() {
                return this._tickSource.seconds;
              }
              set seconds(t) {
                this._tickSource.seconds = t;
              }
              getSecondsAtTime(t) {
                return this._tickSource.getSecondsAtTime(t);
              }
              setTicksAtTime(t, e) {
                return this._tickSource.setTicksAtTime(t, e),
                this;
              }
              getTimeOfTick(t, e = this.now()) {
                return this._tickSource.getTimeOfTick(t, e);
              }
              getTicksAtTime(t) {
                return this._tickSource.getTicksAtTime(t);
              }
              nextTickTime(t, e) {
                const s = this.toSeconds(e),
                n = this.getTicksAtTime(s);
                return this._tickSource.getTimeOfTick(n + t, s);
              }
              _loop() {
                const t = this._lastUpdate,
                e = this.now();
                this._lastUpdate = e,
                this.log('loop', t, e),
                t !== e && (this._state.forEachBetween(t, e, t=>{
                  switch (t.state) {
                    case 'started':
                      const e = this._tickSource.getTicksAtTime(t.time);
                      this.emit('start', t.time, e);
                      break;
                    case 'stopped':
                      0 !== t.time && this.emit('stop', t.time);
                      break;
                    case 'paused':
                      this.emit('pause', t.time);
                  }
                }), this._tickSource.forEachTickBetween(t, e, (t, e) =>{
                  this.callback(t, e);
                }));
              }
              getStateAtTime(t) {
                const e = this.toSeconds(t);
                return this._state.getValueAtTime(e);
              }
              dispose() {
                return super.dispose(),
                this.context.off('tick', this._boundLoop),
                this._tickSource.dispose(),
                this._state.dispose(),
                this;
              }
            }
            Ai.mixin(vo);
            class yo extends io {
              constructor() {
                super (ui(yo.getDefaults(), arguments, [
                  'delayTime',
                  'maxDelay'
                ])),
                this.name = 'Delay';
                const t = ui(yo.getDefaults(), arguments, [
                  'delayTime',
                  'maxDelay'
                ]),
                e = this.toSeconds(t.maxDelay);
                this._maxDelay = Math.max(e, this.toSeconds(t.delayTime)),
                this._delayNode = this.input = this.output = this.context.createDelay(e),
                this.delayTime = new no({
                  context: this.context,
                  param: this._delayNode.delayTime,
                  units: 'time',
                  value: t.delayTime,
                  minValue: 0,
                  maxValue: this.maxDelay
                }),
                Oi(this, 'delayTime');
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  delayTime: 0,
                  maxDelay: 1
                });
              }
              get maxDelay() {
                return this._maxDelay;
              }
              dispose() {
                return super.dispose(),
                this._delayNode.disconnect(),
                this.delayTime.dispose(),
                this;
              }
            }
            function xo(t, e, s = 2, n = Vi().sampleRate) {
              return ni(this, void 0, void 0, function * () {
                const i = Vi(),
                o = new qi(s, e, n);
                Ni(o),
                yield t(o);
                const r = o.render();
                Ni(i);
                const a = yield r;
                return new Ri(a);
              });
            }
            class wo extends fi {
              constructor() {
                super (),
                this.name = 'ToneAudioBuffers',
                this._buffers = new Map(),
                this._loadingCount = 0;
                const t = ui(wo.getDefaults(), arguments, [
                  'urls',
                  'onload',
                  'baseUrl'
                ], 'urls');
                this.baseUrl = t.baseUrl,
                Object.keys(t.urls).forEach(e=>{
                  this._loadingCount++;
                  const s = t.urls[e];
                  this.add(e, s, this._bufferLoaded.bind(this, t.onload), t.onerror);
                });
              }
              static getDefaults() {
                return {
                  baseUrl: '',
                  onerror: Ei,
                  onload: Ei,
                  urls: {
                  }
                };
              }
              has(t) {
                return this._buffers.has(t.toString());
              }
              get(t) {
                return Bn(this.has(t), `ToneAudioBuffers has no buffer named: ${ t }`),
                this._buffers.get(t.toString());
              }
              _bufferLoaded(t) {
                this._loadingCount--,
                0 === this._loadingCount && t && t();
              }
              get loaded() {
                return Array.from(this._buffers).every(([t,
                e]) =>e.loaded);
              }
              add(t, e, s = Ei, n = Ei) {
                return zn(e) ? (this.baseUrl && 'data:audio/' === e.trim().substring(0, 11).toLowerCase() && (this.baseUrl = ''), this._buffers.set(t.toString(), new Ri(this.baseUrl + e, s, n))) : this._buffers.set(t.toString(), new Ri(e, s, n)),
                this;
              }
              dispose() {
                return super.dispose(),
                this._buffers.forEach(t=>t.dispose()),
                this._buffers.clear(),
                this;
              }
            }
            class bo extends Yi {
              constructor() {
                super (...arguments),
                this.name = 'MidiClass',
                this.defaultUnits = 'midi';
              }
              _frequencyToUnits(t) {
                return Bi(super._frequencyToUnits(t));
              }
              _ticksToUnits(t) {
                return Bi(super._ticksToUnits(t));
              }
              _beatsToUnits(t) {
                return Bi(super._beatsToUnits(t));
              }
              _secondsToUnits(t) {
                return Bi(super._secondsToUnits(t));
              }
              toMidi() {
                return this.valueOf();
              }
              toFrequency() {
                return Gi(this.toMidi());
              }
              transpose(t) {
                return new bo(this.context, this.toMidi() + t);
              }
            }
            function To(t, e) {
              return new bo(Vi(), t, e);
            }
            class So extends Ki {
              constructor() {
                super (...arguments),
                this.name = 'Ticks',
                this.defaultUnits = 'i';
              }
              _now() {
                return this.context.transport.ticks;
              }
              _beatsToUnits(t) {
                return this._getPPQ() * t;
              }
              _secondsToUnits(t) {
                return Math.floor(t / (60 / this._getBpm()) * this._getPPQ());
              }
              _ticksToUnits(t) {
                return t;
              }
              toTicks() {
                return this.valueOf();
              }
              toSeconds() {
                return this.valueOf() / this._getPPQ() * (60 / this._getBpm());
              }
            }
            function ko(t, e) {
              return new So(Vi(), t, e);
            }
            class Ao extends eo {
              constructor() {
                super (...arguments),
                this.name = 'Draw',
                this.expiration = 0.25,
                this.anticipation = 0.008,
                this._events = new wi(),
                this._boundDrawLoop = this._drawLoop.bind(this),
                this._animationFrame = - 1;
              }
              schedule(t, e) {
                return this._events.add({
                  callback: t,
                  time: this.toSeconds(e)
                }),
                1 === this._events.length && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop)),
                this;
              }
              cancel(t) {
                return this._events.cancel(this.toSeconds(t)),
                this;
              }
              _drawLoop() {
                const t = this.context.currentTime;
                for (; this._events.length && this._events.peek().time - this.anticipation <= t; ) {
                  const e = this._events.shift();
                  e && t - e.time <= this.expiration && e.callback();
                }
                this._events.length > 0 && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop));
              }
              dispose() {
                return super.dispose(),
                this._events.dispose(),
                cancelAnimationFrame(this._animationFrame),
                this;
              }
            }
            Ti(t=>{
              t.draw = new Ao({
                context: t
              });
            }),
            ki(t=>{
              t.draw.dispose();
            });
            class Co extends fi {
              constructor() {
                super (...arguments),
                this.name = 'IntervalTimeline',
                this._root = null,
                this._length = 0;
              }
              add(t) {
                Bn(In(t.time), 'Events must have a time property'),
                Bn(In(t.duration), 'Events must have a duration parameter'),
                t.time = t.time.valueOf();
                let e = new Do(t.time, t.time + t.duration, t);
                for (null === this._root ? this._root = e : this._root.insert(e), this._length++; null !== e; ) e.updateHeight(),
                e.updateMax(),
                this._rebalance(e),
                e = e.parent;
                return this;
              }
              remove(t) {
                if (null !== this._root) {
                  const e = [
                  ];
                  this._root.search(t.time, e);
                  for (const s of e) if (s.event === t) {
                    this._removeNode(s),
                    this._length--;
                    break;
                  }
                }
                return this;
              }
              get length() {
                return this._length;
              }
              cancel(t) {
                return this.forEachFrom(t, t=>this.remove(t)),
                this;
              }
              _setRoot(t) {
                this._root = t,
                null !== this._root && (this._root.parent = null);
              }
              _replaceNodeInParent(t, e) {
                null !== t.parent ? (t.isLeftChild() ? t.parent.left = e : t.parent.right = e, this._rebalance(t.parent)) : this._setRoot(e);
              }
              _removeNode(t) {
                if (null === t.left && null === t.right) this._replaceNodeInParent(t, null);
                 else if (null === t.right) this._replaceNodeInParent(t, t.left);
                 else if (null === t.left) this._replaceNodeInParent(t, t.right);
                 else {
                  let e,
                  s = null;
                  if (t.getBalance() > 0) {
                    if (null === t.left.right) e = t.left,
                    e.right = t.right,
                    s = e;
                     else {
                      for (e = t.left.right; null !== e.right; ) e = e.right;
                      e.parent && (e.parent.right = e.left, s = e.parent, e.left = t.left, e.right = t.right);
                    }
                  } else if (null === t.right.left) e = t.right,
                  e.left = t.left,
                  s = e;
                   else {
                    for (e = t.right.left; null !== e.left; ) e = e.left;
                    e.parent && (e.parent.left = e.right, s = e.parent, e.left = t.left, e.right = t.right);
                  }
                  null !== t.parent ? t.isLeftChild() ? t.parent.left = e : t.parent.right = e : this._setRoot(e),
                  s && this._rebalance(s);
                }
                t.dispose();
              }
              _rotateLeft(t) {
                const e = t.parent,
                s = t.isLeftChild(),
                n = t.right;
                n && (t.right = n.left, n.left = t),
                null !== e ? s ? e.left = n : e.right = n : this._setRoot(n);
              }
              _rotateRight(t) {
                const e = t.parent,
                s = t.isLeftChild(),
                n = t.left;
                n && (t.left = n.right, n.right = t),
                null !== e ? s ? e.left = n : e.right = n : this._setRoot(n);
              }
              _rebalance(t) {
                const e = t.getBalance();
                e > 1 && t.left ? t.left.getBalance() < 0 ? this._rotateLeft(t.left) : this._rotateRight(t) : e < - 1 && t.right && (t.right.getBalance() > 0 ? this._rotateRight(t.right) : this._rotateLeft(t));
              }
              get(t) {
                if (null !== this._root) {
                  const e = [
                  ];
                  if (this._root.search(t, e), e.length > 0) {
                    let t = e[0];
                    for (let s = 1; s < e.length; s++) e[s].low > t.low && (t = e[s]);
                    return t.event;
                  }
                }
                return null;
              }
              forEach(t) {
                if (null !== this._root) {
                  const e = [
                  ];
                  this._root.traverse(t=>e.push(t)),
                  e.forEach(e=>{
                    e.event && t(e.event);
                  });
                }
                return this;
              }
              forEachAtTime(t, e) {
                if (null !== this._root) {
                  const s = [
                  ];
                  this._root.search(t, s),
                  s.forEach(t=>{
                    t.event && e(t.event);
                  });
                }
                return this;
              }
              forEachFrom(t, e) {
                if (null !== this._root) {
                  const s = [
                  ];
                  this._root.searchAfter(t, s),
                  s.forEach(t=>{
                    t.event && e(t.event);
                  });
                }
                return this;
              }
              dispose() {
                return super.dispose(),
                null !== this._root && this._root.traverse(t=>t.dispose()),
                this._root = null,
                this;
              }
            }
            class Do {
              constructor(t, e, s) {
                this._left = null,
                this._right = null,
                this.parent = null,
                this.height = 0,
                this.event = s,
                this.low = t,
                this.high = e,
                this.max = this.high;
              }
              insert(t) {
                t.low <= this.low ? null === this.left ? this.left = t : this.left.insert(t) : null === this.right ? this.right = t : this.right.insert(t);
              }
              search(t, e) {
                t > this.max || (null !== this.left && this.left.search(t, e), this.low <= t && this.high > t && e.push(this), this.low > t || null !== this.right && this.right.search(t, e));
              }
              searchAfter(t, e) {
                this.low >= t && (e.push(this), null !== this.left && this.left.searchAfter(t, e)),
                null !== this.right && this.right.searchAfter(t, e);
              }
              traverse(t) {
                t(this),
                null !== this.left && this.left.traverse(t),
                null !== this.right && this.right.traverse(t);
              }
              updateHeight() {
                null !== this.left && null !== this.right ? this.height = Math.max(this.left.height, this.right.height) + 1 : null !== this.right ? this.height = this.right.height + 1 : null !== this.left ? this.height = this.left.height + 1 : this.height = 0;
              }
              updateMax() {
                this.max = this.high,
                null !== this.left && (this.max = Math.max(this.max, this.left.max)),
                null !== this.right && (this.max = Math.max(this.max, this.right.max));
              }
              getBalance() {
                let t = 0;
                return null !== this.left && null !== this.right ? t = this.left.height - this.right.height : null !== this.left ? t = this.left.height + 1 : null !== this.right && (t = - (this.right.height + 1)),
                t;
              }
              isLeftChild() {
                return null !== this.parent && this.parent.left === this;
              }
              get left() {
                return this._left;
              }
              set left(t) {
                this._left = t,
                null !== t && (t.parent = this),
                this.updateHeight(),
                this.updateMax();
              }
              get right() {
                return this._right;
              }
              set right(t) {
                this._right = t,
                null !== t && (t.parent = this),
                this.updateHeight(),
                this.updateMax();
              }
              dispose() {
                this.parent = null,
                this._left = null,
                this._right = null,
                this.event = null;
              }
            }
            class Oo extends io {
              constructor() {
                super (ui(Oo.getDefaults(), arguments, [
                  'volume'
                ])),
                this.name = 'Volume';
                const t = ui(Oo.getDefaults(), arguments, [
                  'volume'
                ]);
                this.input = this.output = new ho({
                  context: this.context,
                  gain: t.volume,
                  units: 'decibels'
                }),
                this.volume = this.output.gain,
                Oi(this, 'volume'),
                this._unmutedVolume = t.volume,
                this.mute = t.mute;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  mute: !1,
                  volume: 0
                });
              }
              get mute() {
                return this.volume.value === - 1 / 0;
              }
              set mute(t) {
                !this.mute && t ? (this._unmutedVolume = this.volume.value, this.volume.value = - 1 / 0) : this.mute && !t && (this.volume.value = this._unmutedVolume);
              }
              dispose() {
                return super.dispose(),
                this.input.dispose(),
                this.volume.dispose(),
                this;
              }
            }
            class Mo extends io {
              constructor() {
                super (ui(Mo.getDefaults(), arguments)),
                this.name = 'Destination',
                this.input = new Oo({
                  context: this.context
                }),
                this.output = new ho({
                  context: this.context
                }),
                this.volume = this.input.volume;
                const t = ui(Mo.getDefaults(), arguments);
                oo(this.input, this.output, this.context.rawContext.destination),
                this.mute = t.mute,
                this._internalChannels = [
                  this.input,
                  this.context.rawContext.destination,
                  this.output
                ];
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  mute: !1,
                  volume: 0
                });
              }
              get mute() {
                return this.input.mute;
              }
              set mute(t) {
                this.input.mute = t;
              }
              chain(...t) {
                return this.input.disconnect(),
                t.unshift(this.input),
                t.push(this.output),
                oo(...t),
                this;
              }
              get maxChannelCount() {
                return this.context.rawContext.destination.maxChannelCount;
              }
              dispose() {
                return super.dispose(),
                this.volume.dispose(),
                this;
              }
            }
            Ti(t=>{
              t.destination = new Mo({
                context: t
              });
            }),
            ki(t=>{
              t.destination.dispose();
            });
            class Eo extends fi {
              constructor(t) {
                super (),
                this.name = 'TimelineValue',
                this._timeline = new wi({
                  memory: 10
                }),
                this._initialValue = t;
              }
              set(t, e) {
                return this._timeline.add({
                  value: t,
                  time: e
                }),
                this;
              }
              get(t) {
                const e = this._timeline.get(t);
                return e ? e.value : this._initialValue;
              }
            }
            class Ro extends io {
              constructor() {
                super (Object.assign(ui(Ro.getDefaults(), arguments, [
                  'context'
                ])));
              }
              connect(t, e = 0, s = 0) {
                return fo(this, t, e, s),
                this;
              }
            }
            class qo extends Ro {
              constructor() {
                super (Object.assign(ui(qo.getDefaults(), arguments, [
                  'mapping',
                  'length'
                ]))),
                this.name = 'WaveShaper',
                this._shaper = this.context.createWaveShaper(),
                this.input = this._shaper,
                this.output = this._shaper;
                const t = ui(qo.getDefaults(), arguments, [
                  'mapping',
                  'length'
                ]);
                Ln(t.mapping) || t.mapping instanceof Float32Array ? this.curve = Float32Array.from(t.mapping) : Vn(t.mapping) && this.setMap(t.mapping, t.length);
              }
              static getDefaults() {
                return Object.assign(po.getDefaults(), {
                  length: 1024
                });
              }
              setMap(t, e = 1024) {
                const s = new Float32Array(e);
                for (let n = 0, i = e; n < i; n++) {
                  const e = n / (i - 1) * 2 - 1;
                  s[n] = t(e, n);
                }
                return this.curve = s,
                this;
              }
              get curve() {
                return this._shaper.curve;
              }
              set curve(t) {
                this._shaper.curve = t;
              }
              get oversample() {
                return this._shaper.oversample;
              }
              set oversample(t) {
                Bn(['none',
                '2x',
                '4x'].some(e=>e.includes(t)), 'oversampling must be either \'none\', \'2x\', or \'4x\''),
                this._shaper.oversample = t;
              }
              dispose() {
                return super.dispose(),
                this._shaper.disconnect(),
                this;
              }
            }
            class Fo extends Ro {
              constructor() {
                super (Object.assign(ui(Fo.getDefaults(), arguments, [
                  'value'
                ]))),
                this.name = 'Pow';
                const t = ui(Fo.getDefaults(), arguments, [
                  'value'
                ]);
                this._exponentScaler = this.input = this.output = new qo({
                  context: this.context,
                  mapping: this._expFunc(t.value),
                  length: 8192
                }),
                this._exponent = t.value;
              }
              static getDefaults() {
                return Object.assign(Ro.getDefaults(), {
                  value: 1
                });
              }
              _expFunc(t) {
                return e=>Math.pow(Math.abs(e), t);
              }
              get value() {
                return this._exponent;
              }
              set value(t) {
                this._exponent = t,
                this._exponentScaler.setMap(this._expFunc(this._exponent));
              }
              dispose() {
                return super.dispose(),
                this._exponentScaler.dispose(),
                this;
              }
            }
            class Io {
              constructor(t, e) {
                this.id = Io._eventId++,
                this._remainderTime = 0;
                const s = Object.assign(Io.getDefaults(), e);
                this.transport = t,
                this.callback = s.callback,
                this._once = s.once,
                this.time = Math.floor(s.time),
                this._remainderTime = s.time - this.time;
              }
              static getDefaults() {
                return {
                  callback: Ei,
                  once: !1,
                  time: 0
                };
              }
              get floatTime() {
                return this.time + this._remainderTime;
              }
              invoke(t) {
                if (this.callback) {
                  const e = this.transport.bpm.getDurationOfTicks(1, t);
                  this.callback(t + this._remainderTime * e),
                  this._once && this.transport.clear(this.id);
                }
              }
              dispose() {
                return this.callback = void 0,
                this;
              }
            }
            Io._eventId = 0;
            class Vo extends Io {
              constructor(t, e) {
                super (t, e),
                this._currentId = - 1,
                this._nextId = - 1,
                this._nextTick = this.time,
                this._boundRestart = this._restart.bind(this);
                const s = Object.assign(Vo.getDefaults(), e);
                this.duration = s.duration,
                this._interval = s.interval,
                this._nextTick = s.time,
                this.transport.on('start', this._boundRestart),
                this.transport.on('loopStart', this._boundRestart),
                this.transport.on('ticks', this._boundRestart),
                this.context = this.transport.context,
                this._restart();
              }
              static getDefaults() {
                return Object.assign({
                }, Io.getDefaults(), {
                  duration: 1 / 0,
                  interval: 1,
                  once: !1
                });
              }
              invoke(t) {
                this._createEvents(t),
                super.invoke(t);
              }
              _createEvent() {
                return vi(this._nextTick, this.floatTime + this.duration) ? this.transport.scheduleOnce(this.invoke.bind(this), new So(this.context, this._nextTick).toSeconds()) : - 1;
              }
              _createEvents(t) {
                vi(this._nextTick + this._interval, this.floatTime + this.duration) && (this._nextTick += this._interval, this._currentId = this._nextId, this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new So(this.context, this._nextTick).toSeconds()));
              }
              _restart(t) {
                this.transport.clear(this._currentId),
                this.transport.clear(this._nextId),
                this._nextTick = this.floatTime;
                const e = this.transport.getTicksAtTime(t);
                mi(e, this.time) && (this._nextTick = this.floatTime + Math.ceil((e - this.floatTime) / this._interval) * this._interval),
                this._currentId = this._createEvent(),
                this._nextTick += this._interval,
                this._nextId = this._createEvent();
              }
              dispose() {
                return super.dispose(),
                this.transport.clear(this._currentId),
                this.transport.clear(this._nextId),
                this.transport.off('start', this._boundRestart),
                this.transport.off('loopStart', this._boundRestart),
                this.transport.off('ticks', this._boundRestart),
                this;
              }
            }
            class No extends eo {
              constructor() {
                super (ui(No.getDefaults(), arguments)),
                this.name = 'Transport',
                this._loop = new Eo(!1),
                this._loopStart = 0,
                this._loopEnd = 0,
                this._scheduledEvents = {
                },
                this._timeline = new wi(),
                this._repeatedEvents = new Co(),
                this._syncedSignals = [
                ],
                this._swingAmount = 0;
                const t = ui(No.getDefaults(), arguments);
                this._ppq = t.ppq,
                this._clock = new vo({
                  callback: this._processTick.bind(this),
                  context: this.context,
                  frequency: 0,
                  units: 'bpm'
                }),
                this._bindClockEvents(),
                this.bpm = this._clock.frequency,
                this._clock.frequency.multiplier = t.ppq,
                this.bpm.setValueAtTime(t.bpm, 0),
                Oi(this, 'bpm'),
                this._timeSignature = t.timeSignature,
                this._swingTicks = t.ppq / 2;
              }
              static getDefaults() {
                return Object.assign(eo.getDefaults(), {
                  bpm: 120,
                  loopEnd: '4m',
                  loopStart: 0,
                  ppq: 192,
                  swing: 0,
                  swingSubdivision: '8n',
                  timeSignature: 4
                });
              }
              _processTick(t, e) {
                if (this._loop.get(t) && e >= this._loopEnd && (this.emit('loopEnd', t), this._clock.setTicksAtTime(this._loopStart, t), e = this._loopStart, this.emit('loopStart', t, this._clock.getSecondsAtTime(t)), this.emit('loop', t)), this._swingAmount > 0 && e % this._ppq != 0 && e % (2 * this._swingTicks) != 0) {
                  const s = e % (2 * this._swingTicks) / (2 * this._swingTicks),
                  n = Math.sin(s * Math.PI) * this._swingAmount;
                  t += new So(this.context, 2 * this._swingTicks / 3).toSeconds() * n;
                }
                Xn(!0),
                this._timeline.forEachAtTime(e, e=>e.invoke(t)),
                Xn(!1);
              }
              schedule(t, e) {
                const s = new Io(this, {
                  callback: t,
                  time: new Ki(this.context, e).toTicks()
                });
                return this._addEvent(s, this._timeline);
              }
              scheduleRepeat(t, e, s, n = 1 / 0) {
                const i = new Vo(this, {
                  callback: t,
                  duration: new Zi(this.context, n).toTicks(),
                  interval: new Zi(this.context, e).toTicks(),
                  time: new Ki(this.context, s).toTicks()
                });
                return this._addEvent(i, this._repeatedEvents);
              }
              scheduleOnce(t, e) {
                const s = new Io(this, {
                  callback: t,
                  once: !0,
                  time: new Ki(this.context, e).toTicks()
                });
                return this._addEvent(s, this._timeline);
              }
              clear(t) {
                if (this._scheduledEvents.hasOwnProperty(t)) {
                  const e = this._scheduledEvents[t.toString()];
                  e.timeline.remove(e.event),
                  e.event.dispose(),
                  delete this._scheduledEvents[t.toString()];
                }
                return this;
              }
              _addEvent(t, e) {
                return this._scheduledEvents[t.id.toString()] = {
                  event: t,
                  timeline: e
                },
                e.add(t),
                t.id;
              }
              cancel(t = 0) {
                const e = this.toTicks(t);
                return this._timeline.forEachFrom(e, t=>this.clear(t.id)),
                this._repeatedEvents.forEachFrom(e, t=>this.clear(t.id)),
                this;
              }
              _bindClockEvents() {
                this._clock.on('start', (t, e) =>{
                  e = new So(this.context, e).toSeconds(),
                  this.emit('start', t, e);
                }),
                this._clock.on('stop', t=>{
                  this.emit('stop', t);
                }),
                this._clock.on('pause', t=>{
                  this.emit('pause', t);
                });
              }
              get state() {
                return this._clock.getStateAtTime(this.now());
              }
              start(t, e) {
                let s;
                return this.context.resume(),
                In(e) && (s = this.toTicks(e)),
                this._clock.start(t, s),
                this;
              }
              stop(t) {
                return this._clock.stop(t),
                this;
              }
              pause(t) {
                return this._clock.pause(t),
                this;
              }
              toggle(t) {
                return t = this.toSeconds(t),
                'started' !== this._clock.getStateAtTime(t) ? this.start(t) : this.stop(t),
                this;
              }
              get timeSignature() {
                return this._timeSignature;
              }
              set timeSignature(t) {
                Ln(t) && (t = t[0] / t[1] * 4),
                this._timeSignature = t;
              }
              get loopStart() {
                return new Zi(this.context, this._loopStart, 'i').toSeconds();
              }
              set loopStart(t) {
                this._loopStart = this.toTicks(t);
              }
              get loopEnd() {
                return new Zi(this.context, this._loopEnd, 'i').toSeconds();
              }
              set loopEnd(t) {
                this._loopEnd = this.toTicks(t);
              }
              get loop() {
                return this._loop.get(this.now());
              }
              set loop(t) {
                this._loop.set(t, this.now());
              }
              setLoopPoints(t, e) {
                return this.loopStart = t,
                this.loopEnd = e,
                this;
              }
              get swing() {
                return this._swingAmount;
              }
              set swing(t) {
                this._swingAmount = t;
              }
              get swingSubdivision() {
                return new So(this.context, this._swingTicks).toNotation();
              }
              set swingSubdivision(t) {
                this._swingTicks = this.toTicks(t);
              }
              get position() {
                const t = this.now(),
                e = this._clock.getTicksAtTime(t);
                return new So(this.context, e).toBarsBeatsSixteenths();
              }
              set position(t) {
                const e = this.toTicks(t);
                this.ticks = e;
              }
              get seconds() {
                return this._clock.seconds;
              }
              set seconds(t) {
                const e = this.now(),
                s = this._clock.frequency.timeToTicks(t, e);
                this.ticks = s;
              }
              get progress() {
                if (this.loop) {
                  const t = this.now();
                  return (this._clock.getTicksAtTime(t) - this._loopStart) / (this._loopEnd - this._loopStart);
                }
                return 0;
              }
              get ticks() {
                return this._clock.ticks;
              }
              set ticks(t) {
                if (this._clock.ticks !== t) {
                  const e = this.now();
                  if ('started' === this.state) {
                    const s = this._clock.getTicksAtTime(e),
                    n = e + this._clock.frequency.getDurationOfTicks(Math.ceil(s) - s, e);
                    this.emit('stop', n),
                    this._clock.setTicksAtTime(t, n),
                    this.emit('start', n, this._clock.getSecondsAtTime(n));
                  } else this.emit('ticks', e),
                  this._clock.setTicksAtTime(t, e);
                }
              }
              getTicksAtTime(t) {
                return this._clock.getTicksAtTime(t);
              }
              getSecondsAtTime(t) {
                return this._clock.getSecondsAtTime(t);
              }
              get PPQ() {
                return this._clock.frequency.multiplier;
              }
              set PPQ(t) {
                this._clock.frequency.multiplier = t;
              }
              nextSubdivision(t) {
                if (t = this.toTicks(t), 'started' !== this.state) return 0;
                {
                  const e = this.now(),
                  s = t - this.getTicksAtTime(e) % t;
                  return this._clock.nextTickTime(s, e);
                }
              }
              syncSignal(t, e) {
                const s = this.now();
                let n = this.bpm,
                i = 1 / (60 / n.getValueAtTime(s) / this.PPQ),
                o = [
                ];
                if ('time' === t.units) {
                  const t = 1 / 64 / i,
                  e = new ho(t),
                  s = new Fo( - 1),
                  r = new ho(t);
                  n.chain(e, s, r),
                  n = r,
                  i = 1 / i,
                  o = [
                    e,
                    s,
                    r
                  ];
                }
                e || (e = 0 !== t.getValueAtTime(s) ? t.getValueAtTime(s) / i : 0);
                const r = new ho(e);
                return n.connect(r),
                r.connect(t._param),
                o.push(r),
                this._syncedSignals.push({
                  initial: t.value,
                  nodes: o,
                  signal: t
                }),
                t.value = 0,
                this;
              }
              unsyncSignal(t) {
                for (let e = this._syncedSignals.length - 1; e >= 0; e--) {
                  const s = this._syncedSignals[e];
                  s.signal === t && (s.nodes.forEach(t=>t.dispose()), s.signal.value = s.initial, this._syncedSignals.splice(e, 1));
                }
                return this;
              }
              dispose() {
                return super.dispose(),
                this._clock.dispose(),
                Mi(this, 'bpm'),
                this._timeline.dispose(),
                this._repeatedEvents.dispose(),
                this;
              }
            }
            Ai.mixin(No),
            Ti(t=>{
              t.transport = new No({
                context: t
              });
            }),
            ki(t=>{
              t.transport.dispose();
            });
            class Po extends io {
              constructor(t) {
                super (t),
                this.input = void 0,
                this._state = new so('stopped'),
                this._synced = !1,
                this._scheduled = [
                ],
                this._syncedStart = Ei,
                this._syncedStop = Ei,
                this._state.memory = 100,
                this._state.increasing = !0,
                this._volume = this.output = new Oo({
                  context: this.context,
                  mute: t.mute,
                  volume: t.volume
                }),
                this.volume = this._volume.volume,
                Oi(this, 'volume'),
                this.onstop = t.onstop;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  mute: !1,
                  onstop: Ei,
                  volume: 0
                });
              }
              get state() {
                return this._synced ? 'started' === this.context.transport.state ? this._state.getValueAtTime(this.context.transport.seconds) : 'stopped' : this._state.getValueAtTime(this.now());
              }
              get mute() {
                return this._volume.mute;
              }
              set mute(t) {
                this._volume.mute = t;
              }
              _clampToCurrentTime(t) {
                return this._synced ? t : Math.max(t, this.context.currentTime);
              }
              start(t, e, s) {
                let n = Fn(t) && this._synced ? this.context.transport.seconds : this.toSeconds(t);
                if (n = this._clampToCurrentTime(n), this._synced || 'started' !== this._state.getValueAtTime(n)) {
                  if (this.log('start', n), this._state.setStateAtTime('started', n), this._synced) {
                    const t = this._state.get(n);
                    t && (t.offset = this.toSeconds(pi(e, 0)), t.duration = s ? this.toSeconds(s) : void 0);
                    const i = this.context.transport.schedule(t=>{
                      this._start(t, e, s);
                    }, n);
                    this._scheduled.push(i),
                    'started' === this.context.transport.state && this.context.transport.getSecondsAtTime(this.immediate()) > n && this._syncedStart(this.now(), this.context.transport.seconds);
                  } else Gn(this.context),
                  this._start(n, e, s);
                } else Bn(mi(n, this._state.get(n).time), 'Start time must be strictly greater than previous start time'),
                this._state.cancel(n),
                this._state.setStateAtTime('started', n),
                this.log('restart', n),
                this.restart(n, e, s);
                return this;
              }
              stop(t) {
                let e = Fn(t) && this._synced ? this.context.transport.seconds : this.toSeconds(t);
                if (e = this._clampToCurrentTime(e), 'started' === this._state.getValueAtTime(e) || In(this._state.getNextState('started', e))) {
                  if (this.log('stop', e), this._synced) {
                    const t = this.context.transport.schedule(this._stop.bind(this), e);
                    this._scheduled.push(t);
                  } else this._stop(e);
                  this._state.cancel(e),
                  this._state.setStateAtTime('stopped', e);
                }
                return this;
              }
              restart(t, e, s) {
                return t = this.toSeconds(t),
                'started' === this._state.getValueAtTime(t) && (this._state.cancel(t), this._restart(t, e, s)),
                this;
              }
              sync() {
                return this._synced || (this._synced = !0, this._syncedStart = (t, e) =>{
                  if (mi(e, 0)) {
                    const s = this._state.get(e);
                    if (s && 'started' === s.state && s.time !== e) {
                      const n = e - this.toSeconds(s.time);
                      let i;
                      s.duration && (i = this.toSeconds(s.duration) - n),
                      this._start(t, this.toSeconds(s.offset) + n, i);
                    }
                  }
                }, this._syncedStop = t=>{
                  const e = this.context.transport.getSecondsAtTime(Math.max(t - this.sampleTime, 0));
                  'started' === this._state.getValueAtTime(e) && this._stop(t);
                }, this.context.transport.on('start', this._syncedStart), this.context.transport.on('loopStart', this._syncedStart), this.context.transport.on('stop', this._syncedStop), this.context.transport.on('pause', this._syncedStop), this.context.transport.on('loopEnd', this._syncedStop)),
                this;
              }
              unsync() {
                return this._synced && (this.context.transport.off('stop', this._syncedStop), this.context.transport.off('pause', this._syncedStop), this.context.transport.off('loopEnd', this._syncedStop), this.context.transport.off('start', this._syncedStart), this.context.transport.off('loopStart', this._syncedStart)),
                this._synced = !1,
                this._scheduled.forEach(t=>this.context.transport.clear(t)),
                this._scheduled = [
                ],
                this._state.cancel(0),
                this._stop(0),
                this;
              }
              dispose() {
                return super.dispose(),
                this.onstop = Ei,
                this.unsync(),
                this._volume.dispose(),
                this._state.dispose(),
                this;
              }
            }
            class jo extends lo {
              constructor() {
                super (ui(jo.getDefaults(), arguments, [
                  'url',
                  'onload'
                ])),
                this.name = 'ToneBufferSource',
                this._source = this.context.createBufferSource(),
                this._internalChannels = [
                  this._source
                ],
                this._sourceStarted = !1,
                this._sourceStopped = !1;
                const t = ui(jo.getDefaults(), arguments, [
                  'url',
                  'onload'
                ]);
                ro(this._source, this._gainNode),
                this._source.onended = () =>this._stopSource(),
                this.playbackRate = new no({
                  context: this.context,
                  param: this._source.playbackRate,
                  units: 'positive',
                  value: t.playbackRate
                }),
                this.loop = t.loop,
                this.loopStart = t.loopStart,
                this.loopEnd = t.loopEnd,
                this._buffer = new Ri(t.url, t.onload, t.onerror),
                this._internalChannels.push(this._source);
              }
              static getDefaults() {
                return Object.assign(lo.getDefaults(), {
                  url: new Ri(),
                  loop: !1,
                  loopEnd: 0,
                  loopStart: 0,
                  onload: Ei,
                  onerror: Ei,
                  playbackRate: 1
                });
              }
              get fadeIn() {
                return this._fadeIn;
              }
              set fadeIn(t) {
                this._fadeIn = t;
              }
              get fadeOut() {
                return this._fadeOut;
              }
              set fadeOut(t) {
                this._fadeOut = t;
              }
              get curve() {
                return this._curve;
              }
              set curve(t) {
                this._curve = t;
              }
              start(t, e, s, n = 1) {
                Bn(this.buffer.loaded, 'buffer is either not set or not loaded');
                const i = this.toSeconds(t);
                this._startGain(i, n),
                e = this.loop ? pi(e, this.loopStart) : pi(e, 0);
                let o = Math.max(this.toSeconds(e), 0);
                if (this.loop) {
                  const t = this.toSeconds(this.loopEnd) || this.buffer.duration,
                  e = this.toSeconds(this.loopStart),
                  s = t - e;
                  gi(o, t) && (o = (o - e) % s + e),
                  yi(o, this.buffer.duration) && (o = 0);
                }
                if (this._source.buffer = this.buffer.get(), this._source.loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration, vi(o, this.buffer.duration) && (this._sourceStarted = !0, this._source.start(i, o)), In(s)) {
                  let t = this.toSeconds(s);
                  t = Math.max(t, 0),
                  this.stop(i + t);
                }
                return this;
              }
              _stopSource(t) {
                !this._sourceStopped && this._sourceStarted && (this._sourceStopped = !0, this._source.stop(this.toSeconds(t)), this._onended());
              }
              get loopStart() {
                return this._source.loopStart;
              }
              set loopStart(t) {
                this._source.loopStart = this.toSeconds(t);
              }
              get loopEnd() {
                return this._source.loopEnd;
              }
              set loopEnd(t) {
                this._source.loopEnd = this.toSeconds(t);
              }
              get buffer() {
                return this._buffer;
              }
              set buffer(t) {
                this._buffer.set(t);
              }
              get loop() {
                return this._source.loop;
              }
              set loop(t) {
                this._source.loop = t,
                this._sourceStarted && this.cancelStop();
              }
              dispose() {
                return super.dispose(),
                this._source.onended = null,
                this._source.disconnect(),
                this._buffer.dispose(),
                this.playbackRate.dispose(),
                this;
              }
            }
            class Lo extends Po {
              constructor() {
                super (ui(Lo.getDefaults(), arguments, [
                  'type'
                ])),
                this.name = 'Noise',
                this._source = null;
                const t = ui(Lo.getDefaults(), arguments, [
                  'type'
                ]);
                this._playbackRate = t.playbackRate,
                this.type = t.type,
                this._fadeIn = t.fadeIn,
                this._fadeOut = t.fadeOut;
              }
              static getDefaults() {
                return Object.assign(Po.getDefaults(), {
                  fadeIn: 0,
                  fadeOut: 0,
                  playbackRate: 1,
                  type: 'white'
                });
              }
              get type() {
                return this._type;
              }
              set type(t) {
                if (Bn(t in Bo, 'Noise: invalid type: ' + t), this._type !== t && (this._type = t, 'started' === this.state)) {
                  const t = this.now();
                  this._stop(t),
                  this._start(t);
                }
              }
              get playbackRate() {
                return this._playbackRate;
              }
              set playbackRate(t) {
                this._playbackRate = t,
                this._source && (this._source.playbackRate.value = t);
              }
              _start(t) {
                const e = Bo[this._type];
                this._source = new jo({
                  url: e,
                  context: this.context,
                  fadeIn: this._fadeIn,
                  fadeOut: this._fadeOut,
                  loop: !0,
                  onended: () =>this.onstop(this),
                  playbackRate: this._playbackRate
                }).connect(this.output),
                this._source.start(this.toSeconds(t), Math.random() * (e.duration - 0.001));
              }
              _stop(t) {
                this._source && (this._source.stop(this.toSeconds(t)), this._source = null);
              }
              get fadeIn() {
                return this._fadeIn;
              }
              set fadeIn(t) {
                this._fadeIn = t,
                this._source && (this._source.fadeIn = this._fadeIn);
              }
              get fadeOut() {
                return this._fadeOut;
              }
              set fadeOut(t) {
                this._fadeOut = t,
                this._source && (this._source.fadeOut = this._fadeOut);
              }
              _restart(t) {
                this._stop(t),
                this._start(t);
              }
              dispose() {
                return super.dispose(),
                this._source && this._source.disconnect(),
                this;
              }
            }
            const zo = 220500,
            Wo = {
              brown: null,
              pink: null,
              white: null
            },
            Bo = {
              get brown() {
                if (!Wo.brown) {
                  const t = [
                  ];
                  for (let e = 0; e < 2; e++) {
                    const s = new Float32Array(zo);
                    t[e] = s;
                    let n = 0;
                    for (let t = 0; t < zo; t++) {
                      const e = 2 * Math.random() - 1;
                      s[t] = (n + 0.02 * e) / 1.02,
                      n = s[t],
                      s[t] *= 3.5;
                    }
                  }
                  Wo.brown = new Ri().fromArray(t);
                }
                return Wo.brown;
              },
              get pink() {
                if (!Wo.pink) {
                  const t = [
                  ];
                  for (let e = 0; e < 2; e++) {
                    const s = new Float32Array(zo);
                    let n,
                    i,
                    o,
                    r,
                    a,
                    c,
                    h;
                    t[e] = s,
                    n = i = o = r = a = c = h = 0;
                    for (let t = 0; t < zo; t++) {
                      const e = 2 * Math.random() - 1;
                      n = 0.99886 * n + 0.0555179 * e,
                      i = 0.99332 * i + 0.0750759 * e,
                      o = 0.969 * o + 0.153852 * e,
                      r = 0.8665 * r + 0.3104856 * e,
                      a = 0.55 * a + 0.5329522 * e,
                      c = - 0.7616 * c - 0.016898 * e,
                      s[t] = n + i + o + r + a + c + h + 0.5362 * e,
                      s[t] *= 0.11,
                      h = 0.115926 * e;
                    }
                  }
                  Wo.pink = new Ri().fromArray(t);
                }
                return Wo.pink;
              },
              get white() {
                if (!Wo.white) {
                  const t = [
                  ];
                  for (let e = 0; e < 2; e++) {
                    const s = new Float32Array(zo);
                    t[e] = s;
                    for (let t = 0; t < zo; t++) s[t] = 2 * Math.random() - 1;
                  }
                  Wo.white = new Ri().fromArray(t);
                }
                return Wo.white;
              }
            };
            class Uo extends io {
              constructor() {
                super (ui(Uo.getDefaults(), arguments, [
                  'volume'
                ])),
                this.name = 'UserMedia';
                const t = ui(Uo.getDefaults(), arguments, [
                  'volume'
                ]);
                this._volume = this.output = new Oo({
                  context: this.context,
                  volume: t.volume
                }),
                this.volume = this._volume.volume,
                Oi(this, 'volume'),
                this.mute = t.mute;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  mute: !1,
                  volume: 0
                });
              }
              open(t) {
                return ni(this, void 0, void 0, function * () {
                  Bn(Uo.supported, 'UserMedia is not supported'),
                  'started' === this.state && this.close();
                  const e = yield Uo.enumerateDevices();
                  Nn(t) ? this._device = e[t] : (this._device = e.find(e=>e.label === t || e.deviceId === t), !this._device && e.length > 0 && (this._device = e[0]), Bn(In(this._device), `No matching device ${ t }`));
                  const s = {
                    audio: {
                      echoCancellation: !1,
                      sampleRate: this.context.sampleRate,
                      noiseSuppression: !1,
                      mozNoiseSuppression: !1
                    }
                  };
                  this._device && (s.audio.deviceId = this._device.deviceId);
                  const n = yield navigator.mediaDevices.getUserMedia(s);
                  if (!this._stream) {
                    this._stream = n;
                    const t = this.context.createMediaStreamSource(n);
                    ro(t, this.output),
                    this._mediaStream = t;
                  }
                  return this;
                });
              }
              close() {
                return this._stream && this._mediaStream && (this._stream.getAudioTracks().forEach(t=>{
                  t.stop();
                }), this._stream = void 0, this._mediaStream.disconnect(), this._mediaStream = void 0),
                this._device = void 0,
                this;
              }
              static enumerateDevices() {
                return ni(this, void 0, void 0, function * () {
                  return (yield navigator.mediaDevices.enumerateDevices()).filter(t=>'audioinput' === t.kind);
                });
              }
              get state() {
                return this._stream && this._stream.active ? 'started' : 'stopped';
              }
              get deviceId() {
                return this._device ? this._device.deviceId : void 0;
              }
              get groupId() {
                return this._device ? this._device.groupId : void 0;
              }
              get label() {
                return this._device ? this._device.label : void 0;
              }
              get mute() {
                return this._volume.mute;
              }
              set mute(t) {
                this._volume.mute = t;
              }
              dispose() {
                return super.dispose(),
                this.close(),
                this._volume.dispose(),
                this.volume.dispose(),
                this;
              }
              static get supported() {
                return In(navigator.mediaDevices) && In(navigator.mediaDevices.getUserMedia);
              }
            }
            function Go(t, e) {
              return ni(this, void 0, void 0, function * () {
                const s = e / t.context.sampleRate,
                n = new qi(1, s, t.context.sampleRate);
                return new t.constructor(Object.assign(t.get(), {
                  frequency: 2 / s,
                  detune: 0,
                  context: n
                })).toDestination().start(0),
                (yield n.render()).getChannelData(0);
              });
            }
            class Qo extends lo {
              constructor() {
                super (ui(Qo.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ])),
                this.name = 'ToneOscillatorNode',
                this._oscillator = this.context.createOscillator(),
                this._internalChannels = [
                  this._oscillator
                ];
                const t = ui(Qo.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ]);
                ro(this._oscillator, this._gainNode),
                this.type = t.type,
                this.frequency = new no({
                  context: this.context,
                  param: this._oscillator.frequency,
                  units: 'frequency',
                  value: t.frequency
                }),
                this.detune = new no({
                  context: this.context,
                  param: this._oscillator.detune,
                  units: 'cents',
                  value: t.detune
                }),
                Oi(this, [
                  'frequency',
                  'detune'
                ]);
              }
              static getDefaults() {
                return Object.assign(lo.getDefaults(), {
                  detune: 0,
                  frequency: 440,
                  type: 'sine'
                });
              }
              start(t) {
                const e = this.toSeconds(t);
                return this.log('start', e),
                this._startGain(e),
                this._oscillator.start(e),
                this;
              }
              _stopSource(t) {
                this._oscillator.stop(t);
              }
              setPeriodicWave(t) {
                return this._oscillator.setPeriodicWave(t),
                this;
              }
              get type() {
                return this._oscillator.type;
              }
              set type(t) {
                this._oscillator.type = t;
              }
              dispose() {
                return super.dispose(),
                'started' === this.state && this.stop(),
                this._oscillator.disconnect(),
                this.frequency.dispose(),
                this.detune.dispose(),
                this;
              }
            }
            class Zo extends Po {
              constructor() {
                super (ui(Zo.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ])),
                this.name = 'Oscillator',
                this._oscillator = null;
                const t = ui(Zo.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ]);
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.frequency
                }),
                Oi(this, 'frequency'),
                this.detune = new po({
                  context: this.context,
                  units: 'cents',
                  value: t.detune
                }),
                Oi(this, 'detune'),
                this._partials = t.partials,
                this._partialCount = t.partialCount,
                this._type = t.type,
                t.partialCount && 'custom' !== t.type && (this._type = this.baseType + t.partialCount.toString()),
                this.phase = t.phase;
              }
              static getDefaults() {
                return Object.assign(Po.getDefaults(), {
                  detune: 0,
                  frequency: 440,
                  partialCount: 0,
                  partials: [
                  ],
                  phase: 0,
                  type: 'sine'
                });
              }
              _start(t) {
                const e = this.toSeconds(t),
                s = new Qo({
                  context: this.context,
                  onended: () =>this.onstop(this)
                });
                this._oscillator = s,
                this._wave ? this._oscillator.setPeriodicWave(this._wave) : this._oscillator.type = this._type,
                this._oscillator.connect(this.output),
                this.frequency.connect(this._oscillator.frequency),
                this.detune.connect(this._oscillator.detune),
                this._oscillator.start(e);
              }
              _stop(t) {
                const e = this.toSeconds(t);
                this._oscillator && this._oscillator.stop(e);
              }
              _restart(t) {
                const e = this.toSeconds(t);
                return this.log('restart', e),
                this._oscillator && this._oscillator.cancelStop(),
                this._state.cancel(e),
                this;
              }
              syncFrequency() {
                return this.context.transport.syncSignal(this.frequency),
                this;
              }
              unsyncFrequency() {
                return this.context.transport.unsyncSignal(this.frequency),
                this;
              }
              _getCachedPeriodicWave() {
                if ('custom' === this._type) return Zo._periodicWaveCache.find(t=>{
                  return t.phase === this._phase && (e = t.partials, s = this._partials, e.length === s.length && e.every((t, e) =>s[e] === t));
                  var e,
                  s;
                });
                {
                  const t = Zo._periodicWaveCache.find(t=>t.type === this._type && t.phase === this._phase);
                  return this._partialCount = t ? t.partialCount : this._partialCount,
                  t;
                }
              }
              get type() {
                return this._type;
              }
              set type(t) {
                this._type = t;
                const e = - 1 !== ['sine',
                'square',
                'sawtooth',
                'triangle'].indexOf(t);
                if (0 === this._phase && e) this._wave = void 0,
                this._partialCount = 0,
                null !== this._oscillator && (this._oscillator.type = t);
                 else {
                  const e = this._getCachedPeriodicWave();
                  if (In(e)) {
                    const {
                      partials: t,
                      wave: s
                    }
                    = e;
                    this._wave = s,
                    this._partials = t,
                    null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave);
                  } else {
                    const [e,
                    s] = this._getRealImaginary(t, this._phase),
                    n = this.context.createPeriodicWave(e, s);
                    this._wave = n,
                    null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave),
                    Zo._periodicWaveCache.push({
                      imag: s,
                      partialCount: this._partialCount,
                      partials: this._partials,
                      phase: this._phase,
                      real: e,
                      type: this._type,
                      wave: this._wave
                    }),
                    Zo._periodicWaveCache.length > 100 && Zo._periodicWaveCache.shift();
                  }
                }
              }
              get baseType() {
                return this._type.replace(this.partialCount.toString(), '');
              }
              set baseType(t) {
                this.partialCount && 'custom' !== this._type && 'custom' !== t ? this.type = t + this.partialCount : this.type = t;
              }
              get partialCount() {
                return this._partialCount;
              }
              set partialCount(t) {
                Un(t, 0);
                let e = this._type;
                const s = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);
                if (s && (e = s[1]), 'custom' !== this._type) this.type = 0 === t ? e : e + t.toString();
                 else {
                  const e = new Float32Array(t);
                  this._partials.forEach((t, s) =>e[s] = t),
                  this._partials = Array.from(e),
                  this.type = this._type;
                }
              }
              _getRealImaginary(t, e) {
                let s = 2048;
                const n = new Float32Array(s),
                i = new Float32Array(s);
                let o = 1;
                if ('custom' === t) {
                  if (o = this._partials.length + 1, this._partialCount = this._partials.length, s = o, 0 === this._partials.length) return [n,
                  i];
                } else {
                  const e = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(t);
                  e ? (o = parseInt(e[2], 10) + 1, this._partialCount = parseInt(e[2], 10), t = e[1], o = Math.max(o, 2), s = o) : this._partialCount = 0,
                  this._partials = [
                  ];
                }
                for (let r = 1; r < s; ++r) {
                  const s = 2 / (r * Math.PI);
                  let a;
                  switch (t) {
                    case 'sine':
                      a = r <= o ? 1 : 0,
                      this._partials[r - 1] = a;
                      break;
                    case 'square':
                      a = 1 & r ? 2 * s : 0,
                      this._partials[r - 1] = a;
                      break;
                    case 'sawtooth':
                      a = s * (1 & r ? 1 : - 1),
                      this._partials[r - 1] = a;
                      break;
                    case 'triangle':
                      a = 1 & r ? s * s * 2 * (r - 1 >> 1 & 1 ? - 1 : 1) : 0,
                      this._partials[r - 1] = a;
                      break;
                    case 'custom':
                      a = this._partials[r - 1];
                      break;
                    default:
                      throw new TypeError('Oscillator: invalid type: ' + t);
                  }
                  0 !== a ? (n[r] = - a * Math.sin(e * r), i[r] = a * Math.cos(e * r)) : (n[r] = 0, i[r] = 0);
                }
                return [n,
                i];
              }
              _inverseFFT(t, e, s) {
                let n = 0;
                const i = t.length;
                for (let o = 0; o < i; o++) n += t[o] * Math.cos(o * s) + e[o] * Math.sin(o * s);
                return n;
              }
              getInitialValue() {
                const [t,
                e] = this._getRealImaginary(this._type, 0);
                let s = 0;
                const n = 2 * Math.PI;
                for (let i = 0; i < 32; i++) s = Math.max(this._inverseFFT(t, e, i / 32 * n), s);
                return xi( - this._inverseFFT(t, e, this._phase) / s, - 1, 1);
              }
              get partials() {
                return this._partials.slice(0, this.partialCount);
              }
              set partials(t) {
                this._partials = t,
                this._partialCount = this._partials.length,
                t.length && (this.type = 'custom');
              }
              get phase() {
                return this._phase * (180 / Math.PI);
              }
              set phase(t) {
                this._phase = t * Math.PI / 180,
                this.type = this._type;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  return Go(this, t);
                });
              }
              dispose() {
                return super.dispose(),
                null !== this._oscillator && this._oscillator.dispose(),
                this._wave = void 0,
                this.frequency.dispose(),
                this.detune.dispose(),
                this;
              }
            }
            Zo._periodicWaveCache = [
            ];
            class Xo extends Ro {
              constructor() {
                super (...arguments),
                this.name = 'AudioToGain',
                this._norm = new qo({
                  context: this.context,
                  mapping: t=>(t + 1) / 2
                }),
                this.input = this._norm,
                this.output = this._norm;
              }
              dispose() {
                return super.dispose(),
                this._norm.dispose(),
                this;
              }
            }
            class Yo extends po {
              constructor() {
                super (Object.assign(ui(Yo.getDefaults(), arguments, [
                  'value'
                ]))),
                this.name = 'Multiply',
                this.override = !1;
                const t = ui(Yo.getDefaults(), arguments, [
                  'value'
                ]);
                this._mult = this.input = this.output = new ho({
                  context: this.context,
                  minValue: t.minValue,
                  maxValue: t.maxValue
                }),
                this.factor = this._param = this._mult.gain,
                this.factor.setValueAtTime(t.value, 0);
              }
              static getDefaults() {
                return Object.assign(po.getDefaults(), {
                  value: 0
                });
              }
              dispose() {
                return super.dispose(),
                this._mult.dispose(),
                this;
              }
            }
            class $o extends Po {
              constructor() {
                super (ui($o.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'modulationType'
                ])),
                this.name = 'AMOscillator',
                this._modulationScale = new Xo({
                  context: this.context
                }),
                this._modulationNode = new ho({
                  context: this.context
                });
                const t = ui($o.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'modulationType'
                ]);
                this._carrier = new Zo({
                  context: this.context,
                  detune: t.detune,
                  frequency: t.frequency,
                  onstop: () =>this.onstop(this),
                  phase: t.phase,
                  type: t.type
                }),
                this.frequency = this._carrier.frequency,
                this.detune = this._carrier.detune,
                this._modulator = new Zo({
                  context: this.context,
                  phase: t.phase,
                  type: t.modulationType
                }),
                this.harmonicity = new Yo({
                  context: this.context,
                  units: 'positive',
                  value: t.harmonicity
                }),
                this.frequency.chain(this.harmonicity, this._modulator.frequency),
                this._modulator.chain(this._modulationScale, this._modulationNode.gain),
                this._carrier.chain(this._modulationNode, this.output),
                Oi(this, [
                  'frequency',
                  'detune',
                  'harmonicity'
                ]);
              }
              static getDefaults() {
                return Object.assign(Zo.getDefaults(), {
                  harmonicity: 1,
                  modulationType: 'square'
                });
              }
              _start(t) {
                this._modulator.start(t),
                this._carrier.start(t);
              }
              _stop(t) {
                this._modulator.stop(t),
                this._carrier.stop(t);
              }
              _restart(t) {
                this._modulator.restart(t),
                this._carrier.restart(t);
              }
              get type() {
                return this._carrier.type;
              }
              set type(t) {
                this._carrier.type = t;
              }
              get baseType() {
                return this._carrier.baseType;
              }
              set baseType(t) {
                this._carrier.baseType = t;
              }
              get partialCount() {
                return this._carrier.partialCount;
              }
              set partialCount(t) {
                this._carrier.partialCount = t;
              }
              get modulationType() {
                return this._modulator.type;
              }
              set modulationType(t) {
                this._modulator.type = t;
              }
              get phase() {
                return this._carrier.phase;
              }
              set phase(t) {
                this._carrier.phase = t,
                this._modulator.phase = t;
              }
              get partials() {
                return this._carrier.partials;
              }
              set partials(t) {
                this._carrier.partials = t;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  return Go(this, t);
                });
              }
              dispose() {
                return super.dispose(),
                this.frequency.dispose(),
                this.detune.dispose(),
                this.harmonicity.dispose(),
                this._carrier.dispose(),
                this._modulator.dispose(),
                this._modulationNode.dispose(),
                this._modulationScale.dispose(),
                this;
              }
            }
            class Ho extends Po {
              constructor() {
                super (ui(Ho.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'modulationType'
                ])),
                this.name = 'FMOscillator',
                this._modulationNode = new ho({
                  context: this.context,
                  gain: 0
                });
                const t = ui(Ho.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'modulationType'
                ]);
                this._carrier = new Zo({
                  context: this.context,
                  detune: t.detune,
                  frequency: 0,
                  onstop: () =>this.onstop(this),
                  phase: t.phase,
                  type: t.type
                }),
                this.detune = this._carrier.detune,
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.frequency
                }),
                this._modulator = new Zo({
                  context: this.context,
                  phase: t.phase,
                  type: t.modulationType
                }),
                this.harmonicity = new Yo({
                  context: this.context,
                  units: 'positive',
                  value: t.harmonicity
                }),
                this.modulationIndex = new Yo({
                  context: this.context,
                  units: 'positive',
                  value: t.modulationIndex
                }),
                this.frequency.connect(this._carrier.frequency),
                this.frequency.chain(this.harmonicity, this._modulator.frequency),
                this.frequency.chain(this.modulationIndex, this._modulationNode),
                this._modulator.connect(this._modulationNode.gain),
                this._modulationNode.connect(this._carrier.frequency),
                this._carrier.connect(this.output),
                this.detune.connect(this._modulator.detune),
                Oi(this, [
                  'modulationIndex',
                  'frequency',
                  'detune',
                  'harmonicity'
                ]);
              }
              static getDefaults() {
                return Object.assign(Zo.getDefaults(), {
                  harmonicity: 1,
                  modulationIndex: 2,
                  modulationType: 'square'
                });
              }
              _start(t) {
                this._modulator.start(t),
                this._carrier.start(t);
              }
              _stop(t) {
                this._modulator.stop(t),
                this._carrier.stop(t);
              }
              _restart(t) {
                return this._modulator.restart(t),
                this._carrier.restart(t),
                this;
              }
              get type() {
                return this._carrier.type;
              }
              set type(t) {
                this._carrier.type = t;
              }
              get baseType() {
                return this._carrier.baseType;
              }
              set baseType(t) {
                this._carrier.baseType = t;
              }
              get partialCount() {
                return this._carrier.partialCount;
              }
              set partialCount(t) {
                this._carrier.partialCount = t;
              }
              get modulationType() {
                return this._modulator.type;
              }
              set modulationType(t) {
                this._modulator.type = t;
              }
              get phase() {
                return this._carrier.phase;
              }
              set phase(t) {
                this._carrier.phase = t,
                this._modulator.phase = t;
              }
              get partials() {
                return this._carrier.partials;
              }
              set partials(t) {
                this._carrier.partials = t;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  return Go(this, t);
                });
              }
              dispose() {
                return super.dispose(),
                this.frequency.dispose(),
                this.harmonicity.dispose(),
                this._carrier.dispose(),
                this._modulator.dispose(),
                this._modulationNode.dispose(),
                this.modulationIndex.dispose(),
                this;
              }
            }
            class Jo extends Po {
              constructor() {
                super (ui(Jo.getDefaults(), arguments, [
                  'frequency',
                  'width'
                ])),
                this.name = 'PulseOscillator',
                this._widthGate = new ho({
                  context: this.context,
                  gain: 0
                }),
                this._thresh = new qo({
                  context: this.context,
                  mapping: t=>t <= 0 ? - 1 : 1
                });
                const t = ui(Jo.getDefaults(), arguments, [
                  'frequency',
                  'width'
                ]);
                this.width = new po({
                  context: this.context,
                  units: 'audioRange',
                  value: t.width
                }),
                this._triangle = new Zo({
                  context: this.context,
                  detune: t.detune,
                  frequency: t.frequency,
                  onstop: () =>this.onstop(this),
                  phase: t.phase,
                  type: 'triangle'
                }),
                this.frequency = this._triangle.frequency,
                this.detune = this._triangle.detune,
                this._triangle.chain(this._thresh, this.output),
                this.width.chain(this._widthGate, this._thresh),
                Oi(this, [
                  'width',
                  'frequency',
                  'detune'
                ]);
              }
              static getDefaults() {
                return Object.assign(Po.getDefaults(), {
                  detune: 0,
                  frequency: 440,
                  phase: 0,
                  type: 'pulse',
                  width: 0.2
                });
              }
              _start(t) {
                t = this.toSeconds(t),
                this._triangle.start(t),
                this._widthGate.gain.setValueAtTime(1, t);
              }
              _stop(t) {
                t = this.toSeconds(t),
                this._triangle.stop(t),
                this._widthGate.gain.cancelScheduledValues(t),
                this._widthGate.gain.setValueAtTime(0, t);
              }
              _restart(t) {
                this._triangle.restart(t),
                this._widthGate.gain.cancelScheduledValues(t),
                this._widthGate.gain.setValueAtTime(1, t);
              }
              get phase() {
                return this._triangle.phase;
              }
              set phase(t) {
                this._triangle.phase = t;
              }
              get type() {
                return 'pulse';
              }
              get baseType() {
                return 'pulse';
              }
              get partials() {
                return [];
              }
              get partialCount() {
                return 0;
              }
              set carrierType(t) {
                this._triangle.type = t;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  return Go(this, t);
                });
              }
              dispose() {
                return super.dispose(),
                this._triangle.dispose(),
                this.width.dispose(),
                this._widthGate.dispose(),
                this._thresh.dispose(),
                this;
              }
            }
            class Ko extends Po {
              constructor() {
                super (ui(Ko.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'spread'
                ])),
                this.name = 'FatOscillator',
                this._oscillators = [
                ];
                const t = ui(Ko.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'spread'
                ]);
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.frequency
                }),
                this.detune = new po({
                  context: this.context,
                  units: 'cents',
                  value: t.detune
                }),
                this._spread = t.spread,
                this._type = t.type,
                this._phase = t.phase,
                this._partials = t.partials,
                this._partialCount = t.partialCount,
                this.count = t.count,
                Oi(this, [
                  'frequency',
                  'detune'
                ]);
              }
              static getDefaults() {
                return Object.assign(Zo.getDefaults(), {
                  count: 3,
                  spread: 20,
                  type: 'sawtooth'
                });
              }
              _start(t) {
                t = this.toSeconds(t),
                this._forEach(e=>e.start(t));
              }
              _stop(t) {
                t = this.toSeconds(t),
                this._forEach(e=>e.stop(t));
              }
              _restart(t) {
                this._forEach(e=>e.restart(t));
              }
              _forEach(t) {
                for (let e = 0; e < this._oscillators.length; e++) t(this._oscillators[e], e);
              }
              get type() {
                return this._type;
              }
              set type(t) {
                this._type = t,
                this._forEach(e=>e.type = t);
              }
              get spread() {
                return this._spread;
              }
              set spread(t) {
                if (this._spread = t, this._oscillators.length > 1) {
                  const e = - t / 2,
                  s = t / (this._oscillators.length - 1);
                  this._forEach((t, n) =>t.detune.value = e + s * n);
                }
              }
              get count() {
                return this._oscillators.length;
              }
              set count(t) {
                if (Un(t, 1), this._oscillators.length !== t) {
                  this._forEach(t=>t.dispose()),
                  this._oscillators = [
                  ];
                  for (let e = 0; e < t; e++) {
                    const s = new Zo({
                      context: this.context,
                      volume: - 6 - 1.1 * t,
                      type: this._type,
                      phase: this._phase + e / t * 360,
                      partialCount: this._partialCount,
                      onstop: 0 === e ? () =>this.onstop(this) : Ei
                    });
                    'custom' === this.type && (s.partials = this._partials),
                    this.frequency.connect(s.frequency),
                    this.detune.connect(s.detune),
                    s.detune.overridden = !1,
                    s.connect(this.output),
                    this._oscillators[e] = s;
                  }
                  this.spread = this._spread,
                  'started' === this.state && this._forEach(t=>t.start());
                }
              }
              get phase() {
                return this._phase;
              }
              set phase(t) {
                this._phase = t,
                this._forEach((t, e) =>t.phase = this._phase + e / this.count * 360);
              }
              get baseType() {
                return this._oscillators[0].baseType;
              }
              set baseType(t) {
                this._forEach(e=>e.baseType = t),
                this._type = this._oscillators[0].type;
              }
              get partials() {
                return this._oscillators[0].partials;
              }
              set partials(t) {
                this._partials = t,
                this._partialCount = this._partials.length,
                t.length && (this._type = 'custom', this._forEach(e=>e.partials = t));
              }
              get partialCount() {
                return this._oscillators[0].partialCount;
              }
              set partialCount(t) {
                this._partialCount = t,
                this._forEach(e=>e.partialCount = t),
                this._type = this._oscillators[0].type;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  return Go(this, t);
                });
              }
              dispose() {
                return super.dispose(),
                this.frequency.dispose(),
                this.detune.dispose(),
                this._forEach(t=>t.dispose()),
                this;
              }
            }
            class tr extends Po {
              constructor() {
                super (ui(tr.getDefaults(), arguments, [
                  'frequency',
                  'modulationFrequency'
                ])),
                this.name = 'PWMOscillator',
                this.sourceType = 'pwm',
                this._scale = new Yo({
                  context: this.context,
                  value: 2
                });
                const t = ui(tr.getDefaults(), arguments, [
                  'frequency',
                  'modulationFrequency'
                ]);
                this._pulse = new Jo({
                  context: this.context,
                  frequency: t.modulationFrequency
                }),
                this._pulse.carrierType = 'sine',
                this.modulationFrequency = this._pulse.frequency,
                this._modulator = new Zo({
                  context: this.context,
                  detune: t.detune,
                  frequency: t.frequency,
                  onstop: () =>this.onstop(this),
                  phase: t.phase
                }),
                this.frequency = this._modulator.frequency,
                this.detune = this._modulator.detune,
                this._modulator.chain(this._scale, this._pulse.width),
                this._pulse.connect(this.output),
                Oi(this, [
                  'modulationFrequency',
                  'frequency',
                  'detune'
                ]);
              }
              static getDefaults() {
                return Object.assign(Po.getDefaults(), {
                  detune: 0,
                  frequency: 440,
                  modulationFrequency: 0.4,
                  phase: 0,
                  type: 'pwm'
                });
              }
              _start(t) {
                t = this.toSeconds(t),
                this._modulator.start(t),
                this._pulse.start(t);
              }
              _stop(t) {
                t = this.toSeconds(t),
                this._modulator.stop(t),
                this._pulse.stop(t);
              }
              _restart(t) {
                this._modulator.restart(t),
                this._pulse.restart(t);
              }
              get type() {
                return 'pwm';
              }
              get baseType() {
                return 'pwm';
              }
              get partials() {
                return [];
              }
              get partialCount() {
                return 0;
              }
              get phase() {
                return this._modulator.phase;
              }
              set phase(t) {
                this._modulator.phase = t;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  return Go(this, t);
                });
              }
              dispose() {
                return super.dispose(),
                this._pulse.dispose(),
                this._scale.dispose(),
                this._modulator.dispose(),
                this;
              }
            }
            const er = {
              am: $o,
              fat: Ko,
              fm: Ho,
              oscillator: Zo,
              pulse: Jo,
              pwm: tr
            };
            class sr extends Po {
              constructor() {
                super (ui(sr.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ])),
                this.name = 'OmniOscillator';
                const t = ui(sr.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ]);
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.frequency
                }),
                this.detune = new po({
                  context: this.context,
                  units: 'cents',
                  value: t.detune
                }),
                Oi(this, [
                  'frequency',
                  'detune'
                ]),
                this.set(t);
              }
              static getDefaults() {
                return Object.assign(Zo.getDefaults(), Ho.getDefaults(), $o.getDefaults(), Ko.getDefaults(), Jo.getDefaults(), tr.getDefaults());
              }
              _start(t) {
                this._oscillator.start(t);
              }
              _stop(t) {
                this._oscillator.stop(t);
              }
              _restart(t) {
                return this._oscillator.restart(t),
                this;
              }
              get type() {
                let t = '';
                return ['am',
                'fm',
                'fat'].some(t=>this._sourceType === t) && (t = this._sourceType),
                t + this._oscillator.type;
              }
              set type(t) {
                'fm' === t.substr(0, 2) ? (this._createNewOscillator('fm'), this._oscillator = this._oscillator, this._oscillator.type = t.substr(2)) : 'am' === t.substr(0, 2) ? (this._createNewOscillator('am'), this._oscillator = this._oscillator, this._oscillator.type = t.substr(2)) : 'fat' === t.substr(0, 3) ? (this._createNewOscillator('fat'), this._oscillator = this._oscillator, this._oscillator.type = t.substr(3)) : 'pwm' === t ? (this._createNewOscillator('pwm'), this._oscillator = this._oscillator) : 'pulse' === t ? this._createNewOscillator('pulse') : (this._createNewOscillator('oscillator'), this._oscillator = this._oscillator, this._oscillator.type = t);
              }
              get partials() {
                return this._oscillator.partials;
              }
              set partials(t) {
                this._getOscType(this._oscillator, 'pulse') || this._getOscType(this._oscillator, 'pwm') || (this._oscillator.partials = t);
              }
              get partialCount() {
                return this._oscillator.partialCount;
              }
              set partialCount(t) {
                this._getOscType(this._oscillator, 'pulse') || this._getOscType(this._oscillator, 'pwm') || (this._oscillator.partialCount = t);
              }
              set(t) {
                return Reflect.has(t, 'type') && t.type && (this.type = t.type),
                super.set(t),
                this;
              }
              _createNewOscillator(t) {
                if (t !== this._sourceType) {
                  this._sourceType = t;
                  const e = er[t],
                  s = this.now();
                  if (this._oscillator) {
                    const t = this._oscillator;
                    t.stop(s),
                    this.context.setTimeout(() =>t.dispose(), this.blockTime);
                  }
                  this._oscillator = new e({
                    context: this.context
                  }),
                  this.frequency.connect(this._oscillator.frequency),
                  this.detune.connect(this._oscillator.detune),
                  this._oscillator.connect(this.output),
                  this._oscillator.onstop = () =>this.onstop(this),
                  'started' === this.state && this._oscillator.start(s);
                }
              }
              get phase() {
                return this._oscillator.phase;
              }
              set phase(t) {
                this._oscillator.phase = t;
              }
              get sourceType() {
                return this._sourceType;
              }
              set sourceType(t) {
                let e = 'sine';
                'pwm' !== this._oscillator.type && 'pulse' !== this._oscillator.type && (e = this._oscillator.type),
                'fm' === t ? this.type = 'fm' + e : 'am' === t ? this.type = 'am' + e : 'fat' === t ? this.type = 'fat' + e : 'oscillator' === t ? this.type = e : 'pulse' === t ? this.type = 'pulse' : 'pwm' === t && (this.type = 'pwm');
              }
              _getOscType(t, e) {
                return t instanceof er[e];
              }
              get baseType() {
                return this._oscillator.baseType;
              }
              set baseType(t) {
                this._getOscType(this._oscillator, 'pulse') || this._getOscType(this._oscillator, 'pwm') || 'pulse' === t || 'pwm' === t || (this._oscillator.baseType = t);
              }
              get width() {
                return this._getOscType(this._oscillator, 'pulse') ? this._oscillator.width : void 0;
              }
              get count() {
                return this._getOscType(this._oscillator, 'fat') ? this._oscillator.count : void 0;
              }
              set count(t) {
                this._getOscType(this._oscillator, 'fat') && Nn(t) && (this._oscillator.count = t);
              }
              get spread() {
                return this._getOscType(this._oscillator, 'fat') ? this._oscillator.spread : void 0;
              }
              set spread(t) {
                this._getOscType(this._oscillator, 'fat') && Nn(t) && (this._oscillator.spread = t);
              }
              get modulationType() {
                return this._getOscType(this._oscillator, 'fm') || this._getOscType(this._oscillator, 'am') ? this._oscillator.modulationType : void 0;
              }
              set modulationType(t) {
                (this._getOscType(this._oscillator, 'fm') || this._getOscType(this._oscillator, 'am')) && zn(t) && (this._oscillator.modulationType = t);
              }
              get modulationIndex() {
                return this._getOscType(this._oscillator, 'fm') ? this._oscillator.modulationIndex : void 0;
              }
              get harmonicity() {
                return this._getOscType(this._oscillator, 'fm') || this._getOscType(this._oscillator, 'am') ? this._oscillator.harmonicity : void 0;
              }
              get modulationFrequency() {
                return this._getOscType(this._oscillator, 'pwm') ? this._oscillator.modulationFrequency : void 0;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  return Go(this, t);
                });
              }
              dispose() {
                return super.dispose(),
                this.detune.dispose(),
                this.frequency.dispose(),
                this._oscillator.dispose(),
                this;
              }
            }
            class nr extends po {
              constructor() {
                super (Object.assign(ui(nr.getDefaults(), arguments, [
                  'value'
                ]))),
                this.override = !1,
                this.name = 'Add',
                this._sum = new ho({
                  context: this.context
                }),
                this.input = this._sum,
                this.output = this._sum,
                this.addend = this._param,
                oo(this._constantSource, this._sum);
              }
              static getDefaults() {
                return Object.assign(po.getDefaults(), {
                  value: 0
                });
              }
              dispose() {
                return super.dispose(),
                this._sum.dispose(),
                this;
              }
            }
            class ir extends Ro {
              constructor() {
                super (Object.assign(ui(ir.getDefaults(), arguments, [
                  'min',
                  'max'
                ]))),
                this.name = 'Scale';
                const t = ui(ir.getDefaults(), arguments, [
                  'min',
                  'max'
                ]);
                this._mult = this.input = new Yo({
                  context: this.context,
                  value: t.max - t.min
                }),
                this._add = this.output = new nr({
                  context: this.context,
                  value: t.min
                }),
                this._min = t.min,
                this._max = t.max,
                this.input.connect(this.output);
              }
              static getDefaults() {
                return Object.assign(Ro.getDefaults(), {
                  max: 1,
                  min: 0
                });
              }
              get min() {
                return this._min;
              }
              set min(t) {
                this._min = t,
                this._setRange();
              }
              get max() {
                return this._max;
              }
              set max(t) {
                this._max = t,
                this._setRange();
              }
              _setRange() {
                this._add.value = this._min,
                this._mult.value = this._max - this._min;
              }
              dispose() {
                return super.dispose(),
                this._add.dispose(),
                this._mult.dispose(),
                this;
              }
            }
            class or extends Ro {
              constructor() {
                super (Object.assign(ui(or.getDefaults(), arguments))),
                this.name = 'Zero',
                this._gain = new ho({
                  context: this.context
                }),
                this.output = this._gain,
                this.input = void 0,
                ro(this.context.getConstant(0), this._gain);
              }
              dispose() {
                return super.dispose(),
                ao(this.context.getConstant(0), this._gain),
                this;
              }
            }
            class rr extends io {
              constructor() {
                super (ui(rr.getDefaults(), arguments, [
                  'frequency',
                  'min',
                  'max'
                ])),
                this.name = 'LFO',
                this._stoppedValue = 0,
                this._units = 'number',
                this.convert = !0,
                this._fromType = no.prototype._fromType,
                this._toType = no.prototype._toType,
                this._is = no.prototype._is,
                this._clampValue = no.prototype._clampValue;
                const t = ui(rr.getDefaults(), arguments, [
                  'frequency',
                  'min',
                  'max'
                ]);
                this._oscillator = new Zo(t),
                this.frequency = this._oscillator.frequency,
                this._amplitudeGain = new ho({
                  context: this.context,
                  gain: t.amplitude,
                  units: 'normalRange'
                }),
                this.amplitude = this._amplitudeGain.gain,
                this._stoppedSignal = new po({
                  context: this.context,
                  units: 'audioRange',
                  value: 0
                }),
                this._zeros = new or({
                  context: this.context
                }),
                this._a2g = new Xo({
                  context: this.context
                }),
                this._scaler = this.output = new ir({
                  context: this.context,
                  max: t.max,
                  min: t.min
                }),
                this.units = t.units,
                this.min = t.min,
                this.max = t.max,
                this._oscillator.chain(this._amplitudeGain, this._a2g, this._scaler),
                this._zeros.connect(this._a2g),
                this._stoppedSignal.connect(this._a2g),
                Oi(this, [
                  'amplitude',
                  'frequency'
                ]),
                this.phase = t.phase;
              }
              static getDefaults() {
                return Object.assign(Zo.getDefaults(), {
                  amplitude: 1,
                  frequency: '4n',
                  max: 1,
                  min: 0,
                  type: 'sine',
                  units: 'number'
                });
              }
              start(t) {
                return t = this.toSeconds(t),
                this._stoppedSignal.setValueAtTime(0, t),
                this._oscillator.start(t),
                this;
              }
              stop(t) {
                return t = this.toSeconds(t),
                this._stoppedSignal.setValueAtTime(this._stoppedValue, t),
                this._oscillator.stop(t),
                this;
              }
              sync() {
                return this._oscillator.sync(),
                this._oscillator.syncFrequency(),
                this;
              }
              unsync() {
                return this._oscillator.unsync(),
                this._oscillator.unsyncFrequency(),
                this;
              }
              _setStoppedValue() {
                this._stoppedValue = this._oscillator.getInitialValue(),
                this._stoppedSignal.value = this._stoppedValue;
              }
              get min() {
                return this._toType(this._scaler.min);
              }
              set min(t) {
                t = this._fromType(t),
                this._scaler.min = t;
              }
              get max() {
                return this._toType(this._scaler.max);
              }
              set max(t) {
                t = this._fromType(t),
                this._scaler.max = t;
              }
              get type() {
                return this._oscillator.type;
              }
              set type(t) {
                this._oscillator.type = t,
                this._setStoppedValue();
              }
              get partials() {
                return this._oscillator.partials;
              }
              set partials(t) {
                this._oscillator.partials = t,
                this._setStoppedValue();
              }
              get phase() {
                return this._oscillator.phase;
              }
              set phase(t) {
                this._oscillator.phase = t,
                this._setStoppedValue();
              }
              get units() {
                return this._units;
              }
              set units(t) {
                const e = this.min,
                s = this.max;
                this._units = t,
                this.min = e,
                this.max = s;
              }
              get state() {
                return this._oscillator.state;
              }
              connect(t, e, s) {
                return (t instanceof no || t instanceof po) && (this.convert = t.convert, this.units = t.units),
                fo(this, t, e, s),
                this;
              }
              dispose() {
                return super.dispose(),
                this._oscillator.dispose(),
                this._stoppedSignal.dispose(),
                this._zeros.dispose(),
                this._scaler.dispose(),
                this._a2g.dispose(),
                this._amplitudeGain.dispose(),
                this.amplitude.dispose(),
                this;
              }
            }
            function ar(t, e = 1 / 0) {
              const s = new WeakMap();
              return function (n, i) {
                Reflect.defineProperty(n, i, {
                  configurable: !0,
                  enumerable: !0,
                  get: function () {
                    return s.get(this);
                  },
                  set: function (n) {
                    Un(n, t, e),
                    s.set(this, n);
                  }
                });
              };
            }
            function cr(t, e = 1 / 0) {
              const s = new WeakMap();
              return function (n, i) {
                Reflect.defineProperty(n, i, {
                  configurable: !0,
                  enumerable: !0,
                  get: function () {
                    return s.get(this);
                  },
                  set: function (n) {
                    Un(this.toSeconds(n), t, e),
                    s.set(this, n);
                  }
                });
              };
            }
            class hr extends Po {
              constructor() {
                super (ui(hr.getDefaults(), arguments, [
                  'url',
                  'onload'
                ])),
                this.name = 'Player',
                this._activeSources = new Set();
                const t = ui(hr.getDefaults(), arguments, [
                  'url',
                  'onload'
                ]);
                this._buffer = new Ri({
                  onload: this._onload.bind(this, t.onload),
                  onerror: t.onerror,
                  reverse: t.reverse,
                  url: t.url
                }),
                this.autostart = t.autostart,
                this._loop = t.loop,
                this._loopStart = t.loopStart,
                this._loopEnd = t.loopEnd,
                this._playbackRate = t.playbackRate,
                this.fadeIn = t.fadeIn,
                this.fadeOut = t.fadeOut;
              }
              static getDefaults() {
                return Object.assign(Po.getDefaults(), {
                  autostart: !1,
                  fadeIn: 0,
                  fadeOut: 0,
                  loop: !1,
                  loopEnd: 0,
                  loopStart: 0,
                  onload: Ei,
                  onerror: Ei,
                  playbackRate: 1,
                  reverse: !1
                });
              }
              load(t) {
                return ni(this, void 0, void 0, function * () {
                  return yield this._buffer.load(t),
                  this._onload(),
                  this;
                });
              }
              _onload(t = Ei) {
                t(),
                this.autostart && this.start();
              }
              _onSourceEnd(t) {
                this.onstop(this),
                this._activeSources.delete(t),
                0 !== this._activeSources.size || this._synced || 'started' !== this._state.getValueAtTime(this.now()) || (this._state.cancel(this.now()), this._state.setStateAtTime('stopped', this.now()));
              }
              start(t, e, s) {
                return super.start(t, e, s),
                this;
              }
              _start(t, e, s) {
                e = this._loop ? pi(e, this._loopStart) : pi(e, 0);
                const n = this.toSeconds(e),
                i = s;
                s = pi(s, Math.max(this._buffer.duration - n, 0));
                let o = this.toSeconds(s);
                o /= this._playbackRate,
                t = this.toSeconds(t);
                const r = new jo({
                  url: this._buffer,
                  context: this.context,
                  fadeIn: this.fadeIn,
                  fadeOut: this.fadeOut,
                  loop: this._loop,
                  loopEnd: this._loopEnd,
                  loopStart: this._loopStart,
                  onended: this._onSourceEnd.bind(this),
                  playbackRate: this._playbackRate
                }).connect(this.output);
                this._loop || this._synced || (this._state.cancel(t + o), this._state.setStateAtTime('stopped', t + o, {
                  implicitEnd: !0
                })),
                this._activeSources.add(r),
                this._loop && Fn(i) ? r.start(t, n) : r.start(t, n, o - this.toSeconds(this.fadeOut));
              }
              _stop(t) {
                const e = this.toSeconds(t);
                this._activeSources.forEach(t=>t.stop(e));
              }
              restart(t, e, s) {
                return super.restart(t, e, s),
                this;
              }
              _restart(t, e, s) {
                var n;
                null === (n = [
                  ...this._activeSources
                ].pop()) || void 0 === n || n.stop(t),
                this._start(t, e, s);
              }
              seek(t, e) {
                const s = this.toSeconds(e);
                if ('started' === this._state.getValueAtTime(s)) {
                  const e = this.toSeconds(t);
                  this._stop(s),
                  this._start(s, e);
                }
                return this;
              }
              setLoopPoints(t, e) {
                return this.loopStart = t,
                this.loopEnd = e,
                this;
              }
              get loopStart() {
                return this._loopStart;
              }
              set loopStart(t) {
                this._loopStart = t,
                this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration),
                this._activeSources.forEach(e=>{
                  e.loopStart = t;
                });
              }
              get loopEnd() {
                return this._loopEnd;
              }
              set loopEnd(t) {
                this._loopEnd = t,
                this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration),
                this._activeSources.forEach(e=>{
                  e.loopEnd = t;
                });
              }
              get buffer() {
                return this._buffer;
              }
              set buffer(t) {
                this._buffer.set(t);
              }
              get loop() {
                return this._loop;
              }
              set loop(t) {
                if (this._loop !== t && (this._loop = t, this._activeSources.forEach(e=>{
                  e.loop = t;
                }), t)) {
                  const t = this._state.getNextState('stopped', this.now());
                  t && this._state.cancel(t.time);
                }
              }
              get playbackRate() {
                return this._playbackRate;
              }
              set playbackRate(t) {
                this._playbackRate = t;
                const e = this.now(),
                s = this._state.getNextState('stopped', e);
                s && s.implicitEnd && (this._state.cancel(s.time), this._activeSources.forEach(t=>t.cancelStop())),
                this._activeSources.forEach(s=>{
                  s.playbackRate.setValueAtTime(t, e);
                });
              }
              get reverse() {
                return this._buffer.reverse;
              }
              set reverse(t) {
                this._buffer.reverse = t;
              }
              get loaded() {
                return this._buffer.loaded;
              }
              dispose() {
                return super.dispose(),
                this._activeSources.forEach(t=>t.dispose()),
                this._activeSources.clear(),
                this._buffer.dispose(),
                this;
              }
            }
            si([cr(0)], hr.prototype, 'fadeIn', void 0),
            si([cr(0)], hr.prototype, 'fadeOut', void 0);
            class lr extends io {
              constructor() {
                super (ui(lr.getDefaults(), arguments, [
                  'urls',
                  'onload'
                ], 'urls')),
                this.name = 'Players',
                this.input = void 0,
                this._players = new Map();
                const t = ui(lr.getDefaults(), arguments, [
                  'urls',
                  'onload'
                ], 'urls');
                this._volume = this.output = new Oo({
                  context: this.context,
                  volume: t.volume
                }),
                this.volume = this._volume.volume,
                Oi(this, 'volume'),
                this._buffers = new wo({
                  urls: t.urls,
                  onload: t.onload,
                  baseUrl: t.baseUrl,
                  onerror: t.onerror
                }),
                this.mute = t.mute,
                this._fadeIn = t.fadeIn,
                this._fadeOut = t.fadeOut;
              }
              static getDefaults() {
                return Object.assign(Po.getDefaults(), {
                  baseUrl: '',
                  fadeIn: 0,
                  fadeOut: 0,
                  mute: !1,
                  onload: Ei,
                  onerror: Ei,
                  urls: {
                  },
                  volume: 0
                });
              }
              get mute() {
                return this._volume.mute;
              }
              set mute(t) {
                this._volume.mute = t;
              }
              get fadeIn() {
                return this._fadeIn;
              }
              set fadeIn(t) {
                this._fadeIn = t,
                this._players.forEach(e=>{
                  e.fadeIn = t;
                });
              }
              get fadeOut() {
                return this._fadeOut;
              }
              set fadeOut(t) {
                this._fadeOut = t,
                this._players.forEach(e=>{
                  e.fadeOut = t;
                });
              }
              get state() {
                return Array.from(this._players).some(([t,
                e]) =>'started' === e.state) ? 'started' : 'stopped';
              }
              has(t) {
                return this._buffers.has(t);
              }
              player(t) {
                if (Bn(this.has(t), `No Player with the name ${ t } exists on this object`), !this._players.has(t)) {
                  const e = new hr({
                    context: this.context,
                    fadeIn: this._fadeIn,
                    fadeOut: this._fadeOut,
                    url: this._buffers.get(t)
                  }).connect(this.output);
                  this._players.set(t, e);
                }
                return this._players.get(t);
              }
              get loaded() {
                return this._buffers.loaded;
              }
              add(t, e, s) {
                return Bn(!this._buffers.has(t), 'A buffer with that name already exists on this object'),
                this._buffers.add(t, e, s),
                this;
              }
              stopAll(t) {
                return this._players.forEach(e=>e.stop(t)),
                this;
              }
              dispose() {
                return super.dispose(),
                this._volume.dispose(),
                this.volume.dispose(),
                this._players.forEach(t=>t.dispose()),
                this._buffers.dispose(),
                this;
              }
            }
            class ur extends Po {
              constructor() {
                super (ui(ur.getDefaults(), arguments, [
                  'url',
                  'onload'
                ])),
                this.name = 'GrainPlayer',
                this._loopStart = 0,
                this._loopEnd = 0,
                this._activeSources = [
                ];
                const t = ui(ur.getDefaults(), arguments, [
                  'url',
                  'onload'
                ]);
                this.buffer = new Ri({
                  onload: t.onload,
                  onerror: t.onerror,
                  reverse: t.reverse,
                  url: t.url
                }),
                this._clock = new vo({
                  context: this.context,
                  callback: this._tick.bind(this),
                  frequency: 1 / t.grainSize
                }),
                this._playbackRate = t.playbackRate,
                this._grainSize = t.grainSize,
                this._overlap = t.overlap,
                this.detune = t.detune,
                this.overlap = t.overlap,
                this.loop = t.loop,
                this.playbackRate = t.playbackRate,
                this.grainSize = t.grainSize,
                this.loopStart = t.loopStart,
                this.loopEnd = t.loopEnd,
                this.reverse = t.reverse,
                this._clock.on('stop', this._onstop.bind(this));
              }
              static getDefaults() {
                return Object.assign(Po.getDefaults(), {
                  onload: Ei,
                  onerror: Ei,
                  overlap: 0.1,
                  grainSize: 0.2,
                  playbackRate: 1,
                  detune: 0,
                  loop: !1,
                  loopStart: 0,
                  loopEnd: 0,
                  reverse: !1
                });
              }
              _start(t, e, s) {
                e = pi(e, 0),
                e = this.toSeconds(e),
                t = this.toSeconds(t);
                const n = 1 / this._clock.frequency.getValueAtTime(t);
                this._clock.start(t, e / n),
                s && this.stop(t + this.toSeconds(s));
              }
              restart(t, e, s) {
                return super.restart(t, e, s),
                this;
              }
              _restart(t, e, s) {
                this._stop(t),
                this._start(t, e, s);
              }
              _stop(t) {
                this._clock.stop(t);
              }
              _onstop(t) {
                this._activeSources.forEach(e=>{
                  e.fadeOut = 0,
                  e.stop(t);
                }),
                this.onstop(this);
              }
              _tick(t) {
                const e = this._clock.getTicksAtTime(t),
                s = e * this._grainSize;
                if (this.log('offset', s), !this.loop && s > this.buffer.duration) return void this.stop(t);
                const n = s < this._overlap ? 0 : this._overlap,
                i = new jo({
                  context: this.context,
                  url: this.buffer,
                  fadeIn: n,
                  fadeOut: this._overlap,
                  loop: this.loop,
                  loopStart: this._loopStart,
                  loopEnd: this._loopEnd,
                  playbackRate: zi(this.detune / 100)
                }).connect(this.output);
                i.start(t, this._grainSize * e),
                i.stop(t + this._grainSize / this.playbackRate),
                this._activeSources.push(i),
                i.onended = () =>{
                  const t = this._activeSources.indexOf(i);
                  - 1 !== t && this._activeSources.splice(t, 1);
                };
              }
              get playbackRate() {
                return this._playbackRate;
              }
              set playbackRate(t) {
                Un(t, 0.001),
                this._playbackRate = t,
                this.grainSize = this._grainSize;
              }
              get loopStart() {
                return this._loopStart;
              }
              set loopStart(t) {
                this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration),
                this._loopStart = this.toSeconds(t);
              }
              get loopEnd() {
                return this._loopEnd;
              }
              set loopEnd(t) {
                this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration),
                this._loopEnd = this.toSeconds(t);
              }
              get reverse() {
                return this.buffer.reverse;
              }
              set reverse(t) {
                this.buffer.reverse = t;
              }
              get grainSize() {
                return this._grainSize;
              }
              set grainSize(t) {
                this._grainSize = this.toSeconds(t),
                this._clock.frequency.setValueAtTime(this._playbackRate / this._grainSize, this.now());
              }
              get overlap() {
                return this._overlap;
              }
              set overlap(t) {
                const e = this.toSeconds(t);
                Un(e, 0),
                this._overlap = e;
              }
              get loaded() {
                return this.buffer.loaded;
              }
              dispose() {
                return super.dispose(),
                this.buffer.dispose(),
                this._clock.dispose(),
                this._activeSources.forEach(t=>t.dispose()),
                this;
              }
            }
            class pr extends Ro {
              constructor() {
                super (...arguments),
                this.name = 'Abs',
                this._abs = new qo({
                  context: this.context,
                  mapping: t=>Math.abs(t) < 0.001 ? 0 : Math.abs(t)
                }),
                this.input = this._abs,
                this.output = this._abs;
              }
              dispose() {
                return super.dispose(),
                this._abs.dispose(),
                this;
              }
            }
            class dr extends Ro {
              constructor() {
                super (...arguments),
                this.name = 'GainToAudio',
                this._norm = new qo({
                  context: this.context,
                  mapping: t=>2 * Math.abs(t) - 1
                }),
                this.input = this._norm,
                this.output = this._norm;
              }
              dispose() {
                return super.dispose(),
                this._norm.dispose(),
                this;
              }
            }
            class fr extends Ro {
              constructor() {
                super (...arguments),
                this.name = 'Negate',
                this._multiply = new Yo({
                  context: this.context,
                  value: - 1
                }),
                this.input = this._multiply,
                this.output = this._multiply;
              }
              dispose() {
                return super.dispose(),
                this._multiply.dispose(),
                this;
              }
            }
            class _r extends po {
              constructor() {
                super (Object.assign(ui(_r.getDefaults(), arguments, [
                  'value'
                ]))),
                this.override = !1,
                this.name = 'Subtract',
                this._sum = new ho({
                  context: this.context
                }),
                this.input = this._sum,
                this.output = this._sum,
                this._neg = new fr({
                  context: this.context
                }),
                this.subtrahend = this._param,
                oo(this._constantSource, this._neg, this._sum);
              }
              static getDefaults() {
                return Object.assign(po.getDefaults(), {
                  value: 0
                });
              }
              dispose() {
                return super.dispose(),
                this._neg.dispose(),
                this._sum.dispose(),
                this;
              }
            }
            class mr extends Ro {
              constructor() {
                super (Object.assign(ui(mr.getDefaults(), arguments))),
                this.name = 'GreaterThanZero',
                this._thresh = this.output = new qo({
                  context: this.context,
                  length: 127,
                  mapping: t=>t <= 0 ? 0 : 1
                }),
                this._scale = this.input = new Yo({
                  context: this.context,
                  value: 10000
                }),
                this._scale.connect(this._thresh);
              }
              dispose() {
                return super.dispose(),
                this._scale.dispose(),
                this._thresh.dispose(),
                this;
              }
            }
            class gr extends po {
              constructor() {
                super (Object.assign(ui(gr.getDefaults(), arguments, [
                  'value'
                ]))),
                this.name = 'GreaterThan',
                this.override = !1;
                const t = ui(gr.getDefaults(), arguments, [
                  'value'
                ]);
                this._subtract = this.input = new _r({
                  context: this.context,
                  value: t.value
                }),
                this._gtz = this.output = new mr({
                  context: this.context
                }),
                this.comparator = this._param = this._subtract.subtrahend,
                Oi(this, 'comparator'),
                this._subtract.connect(this._gtz);
              }
              static getDefaults() {
                return Object.assign(po.getDefaults(), {
                  value: 0
                });
              }
              dispose() {
                return super.dispose(),
                this._gtz.dispose(),
                this._subtract.dispose(),
                this.comparator.dispose(),
                this;
              }
            }
            class vr extends ir {
              constructor() {
                super (Object.assign(ui(vr.getDefaults(), arguments, [
                  'min',
                  'max',
                  'exponent'
                ]))),
                this.name = 'ScaleExp';
                const t = ui(vr.getDefaults(), arguments, [
                  'min',
                  'max',
                  'exponent'
                ]);
                this.input = this._exp = new Fo({
                  context: this.context,
                  value: t.exponent
                }),
                this._exp.connect(this._mult);
              }
              static getDefaults() {
                return Object.assign(ir.getDefaults(), {
                  exponent: 1
                });
              }
              get exponent() {
                return this._exp.value;
              }
              set exponent(t) {
                this._exp.value = t;
              }
              dispose() {
                return super.dispose(),
                this._exp.dispose(),
                this;
              }
            }
            class yr extends po {
              constructor() {
                super (ui(po.getDefaults(), arguments, [
                  'value',
                  'units'
                ])),
                this.name = 'SyncedSignal',
                this.override = !1;
                const t = ui(po.getDefaults(), arguments, [
                  'value',
                  'units'
                ]);
                this._lastVal = t.value,
                this._synced = this.context.transport.scheduleRepeat(this._onTick.bind(this), '1i'),
                this._syncedCallback = this._anchorValue.bind(this),
                this.context.transport.on('start', this._syncedCallback),
                this.context.transport.on('pause', this._syncedCallback),
                this.context.transport.on('stop', this._syncedCallback),
                this._constantSource.disconnect(),
                this._constantSource.stop(0),
                this._constantSource = this.output = new uo({
                  context: this.context,
                  offset: t.value,
                  units: t.units
                }).start(0),
                this.setValueAtTime(t.value, 0);
              }
              _onTick(t) {
                const e = super.getValueAtTime(this.context.transport.seconds);
                this._lastVal !== e && (this._lastVal = e, this._constantSource.offset.setValueAtTime(e, t));
              }
              _anchorValue(t) {
                const e = super.getValueAtTime(this.context.transport.seconds);
                this._lastVal = e,
                this._constantSource.offset.cancelAndHoldAtTime(t),
                this._constantSource.offset.setValueAtTime(e, t);
              }
              getValueAtTime(t) {
                const e = new Ki(this.context, t).toSeconds();
                return super.getValueAtTime(e);
              }
              setValueAtTime(t, e) {
                const s = new Ki(this.context, e).toSeconds();
                return super.setValueAtTime(t, s),
                this;
              }
              linearRampToValueAtTime(t, e) {
                const s = new Ki(this.context, e).toSeconds();
                return super.linearRampToValueAtTime(t, s),
                this;
              }
              exponentialRampToValueAtTime(t, e) {
                const s = new Ki(this.context, e).toSeconds();
                return super.exponentialRampToValueAtTime(t, s),
                this;
              }
              setTargetAtTime(t, e, s) {
                const n = new Ki(this.context, e).toSeconds();
                return super.setTargetAtTime(t, n, s),
                this;
              }
              cancelScheduledValues(t) {
                const e = new Ki(this.context, t).toSeconds();
                return super.cancelScheduledValues(e),
                this;
              }
              setValueCurveAtTime(t, e, s, n) {
                const i = new Ki(this.context, e).toSeconds();
                return s = this.toSeconds(s),
                super.setValueCurveAtTime(t, i, s, n),
                this;
              }
              cancelAndHoldAtTime(t) {
                const e = new Ki(this.context, t).toSeconds();
                return super.cancelAndHoldAtTime(e),
                this;
              }
              setRampPoint(t) {
                const e = new Ki(this.context, t).toSeconds();
                return super.setRampPoint(e),
                this;
              }
              exponentialRampTo(t, e, s) {
                const n = new Ki(this.context, s).toSeconds();
                return super.exponentialRampTo(t, e, n),
                this;
              }
              linearRampTo(t, e, s) {
                const n = new Ki(this.context, s).toSeconds();
                return super.linearRampTo(t, e, n),
                this;
              }
              targetRampTo(t, e, s) {
                const n = new Ki(this.context, s).toSeconds();
                return super.targetRampTo(t, e, n),
                this;
              }
              dispose() {
                return super.dispose(),
                this.context.transport.clear(this._synced),
                this.context.transport.off('start', this._syncedCallback),
                this.context.transport.off('pause', this._syncedCallback),
                this.context.transport.off('stop', this._syncedCallback),
                this._constantSource.dispose(),
                this;
              }
            }
            class xr extends io {
              constructor() {
                super (ui(xr.getDefaults(), arguments, [
                  'attack',
                  'decay',
                  'sustain',
                  'release'
                ])),
                this.name = 'Envelope',
                this._sig = new po({
                  context: this.context,
                  value: 0
                }),
                this.output = this._sig,
                this.input = void 0;
                const t = ui(xr.getDefaults(), arguments, [
                  'attack',
                  'decay',
                  'sustain',
                  'release'
                ]);
                this.attack = t.attack,
                this.decay = t.decay,
                this.sustain = t.sustain,
                this.release = t.release,
                this.attackCurve = t.attackCurve,
                this.releaseCurve = t.releaseCurve,
                this.decayCurve = t.decayCurve;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  attack: 0.01,
                  attackCurve: 'linear',
                  decay: 0.1,
                  decayCurve: 'exponential',
                  release: 1,
                  releaseCurve: 'exponential',
                  sustain: 0.5
                });
              }
              get value() {
                return this.getValueAtTime(this.now());
              }
              _getCurve(t, e) {
                if (zn(t)) return t;
                {
                  let s;
                  for (s in wr) if (wr[s][e] === t) return s;
                  return t;
                }
              }
              _setCurve(t, e, s) {
                if (zn(s) && Reflect.has(wr, s)) {
                  const n = wr[s];
                  Pn(n) ? '_decayCurve' !== t && (this[t] = n[e]) : this[t] = n;
                } else {
                  if (!Ln(s) || '_decayCurve' === t) throw new Error('Envelope: invalid curve: ' + s);
                  this[t] = s;
                }
              }
              get attackCurve() {
                return this._getCurve(this._attackCurve, 'In');
              }
              set attackCurve(t) {
                this._setCurve('_attackCurve', 'In', t);
              }
              get releaseCurve() {
                return this._getCurve(this._releaseCurve, 'Out');
              }
              set releaseCurve(t) {
                this._setCurve('_releaseCurve', 'Out', t);
              }
              get decayCurve() {
                return this._getCurve(this._decayCurve, 'Out');
              }
              set decayCurve(t) {
                this._setCurve('_decayCurve', 'Out', t);
              }
              triggerAttack(t, e = 1) {
                this.log('triggerAttack', t, e),
                t = this.toSeconds(t);
                let s = this.toSeconds(this.attack);
                const n = this.toSeconds(this.decay),
                i = this.getValueAtTime(t);
                if (i > 0 && (s = (1 - i) / (1 / s)), s < this.sampleTime) this._sig.cancelScheduledValues(t),
                this._sig.setValueAtTime(e, t);
                 else if ('linear' === this._attackCurve) this._sig.linearRampTo(e, s, t);
                 else if ('exponential' === this._attackCurve) this._sig.targetRampTo(e, s, t);
                 else {
                  this._sig.cancelAndHoldAtTime(t);
                  let n = this._attackCurve;
                  for (let t = 1; t < n.length; t++) if (n[t - 1] <= i && i <= n[t]) {
                    n = this._attackCurve.slice(t),
                    n[0] = i;
                    break;
                  }
                  this._sig.setValueCurveAtTime(n, t, s, e);
                }
                if (n && this.sustain < 1) {
                  const i = e * this.sustain,
                  o = t + s;
                  this.log('decay', o),
                  'linear' === this._decayCurve ? this._sig.linearRampToValueAtTime(i, n + o) : this._sig.exponentialApproachValueAtTime(i, o, n);
                }
                return this;
              }
              triggerRelease(t) {
                this.log('triggerRelease', t),
                t = this.toSeconds(t);
                const e = this.getValueAtTime(t);
                if (e > 0) {
                  const s = this.toSeconds(this.release);
                  s < this.sampleTime ? this._sig.setValueAtTime(0, t) : 'linear' === this._releaseCurve ? this._sig.linearRampTo(0, s, t) : 'exponential' === this._releaseCurve ? this._sig.targetRampTo(0, s, t) : (Bn(Ln(this._releaseCurve), 'releaseCurve must be either \'linear\', \'exponential\' or an array'), this._sig.cancelAndHoldAtTime(t), this._sig.setValueCurveAtTime(this._releaseCurve, t, s, e));
                }
                return this;
              }
              getValueAtTime(t) {
                return this._sig.getValueAtTime(t);
              }
              triggerAttackRelease(t, e, s = 1) {
                return e = this.toSeconds(e),
                this.triggerAttack(e, s),
                this.triggerRelease(e + this.toSeconds(t)),
                this;
              }
              cancel(t) {
                return this._sig.cancelScheduledValues(this.toSeconds(t)),
                this;
              }
              connect(t, e = 0, s = 0) {
                return fo(this, t, e, s),
                this;
              }
              asArray(t = 1024) {
                return ni(this, void 0, void 0, function * () {
                  const e = t / this.context.sampleRate,
                  s = new qi(1, e, this.context.sampleRate),
                  n = this.toSeconds(this.attack) + this.toSeconds(this.decay),
                  i = n + this.toSeconds(this.release),
                  o = 0.1 * i,
                  r = i + o,
                  a = new this.constructor(Object.assign(this.get(), {
                    attack: e * this.toSeconds(this.attack) / r,
                    decay: e * this.toSeconds(this.decay) / r,
                    release: e * this.toSeconds(this.release) / r,
                    context: s
                  }));
                  return a._sig.toDestination(),
                  a.triggerAttackRelease(e * (n + o) / r, 0),
                  (yield s.render()).getChannelData(0);
                });
              }
              dispose() {
                return super.dispose(),
                this._sig.dispose(),
                this;
              }
            }
            si([cr(0)], xr.prototype, 'attack', void 0),
            si([cr(0)], xr.prototype, 'decay', void 0),
            si([ar(0, 1)], xr.prototype, 'sustain', void 0),
            si([cr(0)], xr.prototype, 'release', void 0);
            const wr = (() =>{
              const t = 128;
              let e,
              s;
              const n = [
              ];
              for (e = 0; e < t; e++) n[e] = Math.sin(e / 127 * (Math.PI / 2));
              const i = [
              ];
              for (e = 0; e < 127; e++) {
                s = e / 127;
                const t = Math.sin(s * (2 * Math.PI) * 6.4 - Math.PI / 2) + 1;
                i[e] = t / 10 + 0.83 * s;
              }
              i[127] = 1;
              const o = [
              ];
              for (e = 0; e < t; e++) o[e] = Math.ceil(e / 127 * 5) / 5;
              const r = [
              ];
              for (e = 0; e < t; e++) s = e / 127,
              r[e] = 0.5 * (1 - Math.cos(Math.PI * s));
              const a = [
              ];
              for (e = 0; e < t; e++) {
                s = e / 127;
                const t = 4 * Math.pow(s, 3) + 0.2,
                n = Math.cos(t * Math.PI * 2 * s);
                a[e] = Math.abs(n * (1 - s));
              }
              function c(t) {
                const e = new Array(t.length);
                for (let s = 0; s < t.length; s++) e[s] = 1 - t[s];
                return e;
              }
              return {
                bounce: {
                  In: c(a),
                  Out: a
                },
                cosine: {
                  In: n,
                  Out: (h = n, h.slice(0).reverse())
                },
                exponential: 'exponential',
                linear: 'linear',
                ripple: {
                  In: i,
                  Out: c(i)
                },
                sine: {
                  In: r,
                  Out: c(r)
                },
                step: {
                  In: o,
                  Out: c(o)
                }
              };
              var h;
            }) ();
            class br extends io {
              constructor() {
                super (ui(br.getDefaults(), arguments)),
                this._scheduledEvents = [
                ],
                this._synced = !1,
                this._original_triggerAttack = this.triggerAttack,
                this._original_triggerRelease = this.triggerRelease,
                this._syncedRelease = t=>this._original_triggerRelease(t);
                const t = ui(br.getDefaults(), arguments);
                this._volume = this.output = new Oo({
                  context: this.context,
                  volume: t.volume
                }),
                this.volume = this._volume.volume,
                Oi(this, 'volume');
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  volume: 0
                });
              }
              sync() {
                return this._syncState() && (this._syncMethod('triggerAttack', 1), this._syncMethod('triggerRelease', 0), this.context.transport.on('stop', this._syncedRelease), this.context.transport.on('pause', this._syncedRelease), this.context.transport.on('loopEnd', this._syncedRelease)),
                this;
              }
              _syncState() {
                let t = !1;
                return this._synced || (this._synced = !0, t = !0),
                t;
              }
              _syncMethod(t, e) {
                const s = this['_original_' + t] = this[t];
                this[t] = (...t) =>{
                  const n = t[e],
                  i = this.context.transport.schedule(n=>{
                    t[e] = n,
                    s.apply(this, t);
                  }, n);
                  this._scheduledEvents.push(i);
                };
              }
              unsync() {
                return this._scheduledEvents.forEach(t=>this.context.transport.clear(t)),
                this._scheduledEvents = [
                ],
                this._synced && (this._synced = !1, this.triggerAttack = this._original_triggerAttack, this.triggerRelease = this._original_triggerRelease, this.context.transport.off('stop', this._syncedRelease), this.context.transport.off('pause', this._syncedRelease), this.context.transport.off('loopEnd', this._syncedRelease)),
                this;
              }
              triggerAttackRelease(t, e, s, n) {
                const i = this.toSeconds(s),
                o = this.toSeconds(e);
                return this.triggerAttack(t, i, n),
                this.triggerRelease(i + o),
                this;
              }
              dispose() {
                return super.dispose(),
                this._volume.dispose(),
                this.unsync(),
                this._scheduledEvents = [
                ],
                this;
              }
            }
            class Tr extends br {
              constructor() {
                super (ui(Tr.getDefaults(), arguments));
                const t = ui(Tr.getDefaults(), arguments);
                this.portamento = t.portamento,
                this.onsilence = t.onsilence;
              }
              static getDefaults() {
                return Object.assign(br.getDefaults(), {
                  detune: 0,
                  onsilence: Ei,
                  portamento: 0
                });
              }
              triggerAttack(t, e, s = 1) {
                this.log('triggerAttack', t, e, s);
                const n = this.toSeconds(e);
                return this._triggerEnvelopeAttack(n, s),
                this.setNote(t, n),
                this;
              }
              triggerRelease(t) {
                this.log('triggerRelease', t);
                const e = this.toSeconds(t);
                return this._triggerEnvelopeRelease(e),
                this;
              }
              setNote(t, e) {
                const s = this.toSeconds(e),
                n = t instanceof Yi ? t.toFrequency() : t;
                if (this.portamento > 0 && this.getLevelAtTime(s) > 0.05) {
                  const t = this.toSeconds(this.portamento);
                  this.frequency.exponentialRampTo(n, t, s);
                } else this.frequency.setValueAtTime(n, s);
                return this;
              }
            }
            si([cr(0)], Tr.prototype, 'portamento', void 0);
            class Sr extends xr {
              constructor() {
                super (ui(Sr.getDefaults(), arguments, [
                  'attack',
                  'decay',
                  'sustain',
                  'release'
                ])),
                this.name = 'AmplitudeEnvelope',
                this._gainNode = new ho({
                  context: this.context,
                  gain: 0
                }),
                this.output = this._gainNode,
                this.input = this._gainNode,
                this._sig.connect(this._gainNode.gain),
                this.output = this._gainNode,
                this.input = this._gainNode;
              }
              dispose() {
                return super.dispose(),
                this._gainNode.dispose(),
                this;
              }
            }
            class kr extends Tr {
              constructor() {
                super (ui(kr.getDefaults(), arguments)),
                this.name = 'Synth';
                const t = ui(kr.getDefaults(), arguments);
                this.oscillator = new sr(Object.assign({
                  context: this.context,
                  detune: t.detune,
                  onstop: () =>this.onsilence(this)
                }, t.oscillator)),
                this.frequency = this.oscillator.frequency,
                this.detune = this.oscillator.detune,
                this.envelope = new Sr(Object.assign({
                  context: this.context
                }, t.envelope)),
                this.oscillator.chain(this.envelope, this.output),
                Oi(this, [
                  'oscillator',
                  'frequency',
                  'detune',
                  'envelope'
                ]);
              }
              static getDefaults() {
                return Object.assign(Tr.getDefaults(), {
                  envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), {
                    attack: 0.005,
                    decay: 0.1,
                    release: 1,
                    sustain: 0.3
                  }),
                  oscillator: Object.assign(di(sr.getDefaults(), [
                    ...Object.keys(Po.getDefaults()),
                    'frequency',
                    'detune'
                  ]), {
                    type: 'triangle'
                  })
                });
              }
              _triggerEnvelopeAttack(t, e) {
                if (this.envelope.triggerAttack(t, e), this.oscillator.start(t), 0 === this.envelope.sustain) {
                  const e = this.toSeconds(this.envelope.attack),
                  s = this.toSeconds(this.envelope.decay);
                  this.oscillator.stop(t + e + s);
                }
              }
              _triggerEnvelopeRelease(t) {
                this.envelope.triggerRelease(t),
                this.oscillator.stop(t + this.toSeconds(this.envelope.release));
              }
              getLevelAtTime(t) {
                return t = this.toSeconds(t),
                this.envelope.getValueAtTime(t);
              }
              dispose() {
                return super.dispose(),
                this.oscillator.dispose(),
                this.envelope.dispose(),
                this;
              }
            }
            class Ar extends Tr {
              constructor() {
                super (ui(Ar.getDefaults(), arguments)),
                this.name = 'ModulationSynth';
                const t = ui(Ar.getDefaults(), arguments);
                this._carrier = new kr({
                  context: this.context,
                  oscillator: t.oscillator,
                  envelope: t.envelope,
                  onsilence: () =>this.onsilence(this),
                  volume: - 10
                }),
                this._modulator = new kr({
                  context: this.context,
                  oscillator: t.modulation,
                  envelope: t.modulationEnvelope,
                  volume: - 10
                }),
                this.oscillator = this._carrier.oscillator,
                this.envelope = this._carrier.envelope,
                this.modulation = this._modulator.oscillator,
                this.modulationEnvelope = this._modulator.envelope,
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency'
                }),
                this.detune = new po({
                  context: this.context,
                  value: t.detune,
                  units: 'cents'
                }),
                this.harmonicity = new Yo({
                  context: this.context,
                  value: t.harmonicity,
                  minValue: 0
                }),
                this._modulationNode = new ho({
                  context: this.context,
                  gain: 0
                }),
                Oi(this, [
                  'frequency',
                  'harmonicity',
                  'oscillator',
                  'envelope',
                  'modulation',
                  'modulationEnvelope',
                  'detune'
                ]);
              }
              static getDefaults() {
                return Object.assign(Tr.getDefaults(), {
                  harmonicity: 3,
                  oscillator: Object.assign(di(sr.getDefaults(), [
                    ...Object.keys(Po.getDefaults()),
                    'frequency',
                    'detune'
                  ]), {
                    type: 'sine'
                  }),
                  envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), {
                    attack: 0.01,
                    decay: 0.01,
                    sustain: 1,
                    release: 0.5
                  }),
                  modulation: Object.assign(di(sr.getDefaults(), [
                    ...Object.keys(Po.getDefaults()),
                    'frequency',
                    'detune'
                  ]), {
                    type: 'square'
                  }),
                  modulationEnvelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5
                  })
                });
              }
              _triggerEnvelopeAttack(t, e) {
                this._carrier._triggerEnvelopeAttack(t, e),
                this._modulator._triggerEnvelopeAttack(t, e);
              }
              _triggerEnvelopeRelease(t) {
                return this._carrier._triggerEnvelopeRelease(t),
                this._modulator._triggerEnvelopeRelease(t),
                this;
              }
              getLevelAtTime(t) {
                return t = this.toSeconds(t),
                this.envelope.getValueAtTime(t);
              }
              dispose() {
                return super.dispose(),
                this._carrier.dispose(),
                this._modulator.dispose(),
                this.frequency.dispose(),
                this.detune.dispose(),
                this.harmonicity.dispose(),
                this._modulationNode.dispose(),
                this;
              }
            }
            class Cr extends Ar {
              constructor() {
                super (ui(Cr.getDefaults(), arguments)),
                this.name = 'AMSynth',
                this._modulationScale = new Xo({
                  context: this.context
                }),
                this.frequency.connect(this._carrier.frequency),
                this.frequency.chain(this.harmonicity, this._modulator.frequency),
                this.detune.fan(this._carrier.detune, this._modulator.detune),
                this._modulator.chain(this._modulationScale, this._modulationNode.gain),
                this._carrier.chain(this._modulationNode, this.output);
              }
              dispose() {
                return super.dispose(),
                this._modulationScale.dispose(),
                this;
              }
            }
            class Dr extends io {
              constructor() {
                super (ui(Dr.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ])),
                this.name = 'BiquadFilter';
                const t = ui(Dr.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ]);
                this._filter = this.context.createBiquadFilter(),
                this.input = this.output = this._filter,
                this.Q = new no({
                  context: this.context,
                  units: 'number',
                  value: t.Q,
                  param: this._filter.Q
                }),
                this.frequency = new no({
                  context: this.context,
                  units: 'frequency',
                  value: t.frequency,
                  param: this._filter.frequency
                }),
                this.detune = new no({
                  context: this.context,
                  units: 'cents',
                  value: t.detune,
                  param: this._filter.detune
                }),
                this.gain = new no({
                  context: this.context,
                  units: 'decibels',
                  convert: !1,
                  value: t.gain,
                  param: this._filter.gain
                }),
                this.type = t.type;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  Q: 1,
                  type: 'lowpass',
                  frequency: 350,
                  detune: 0,
                  gain: 0
                });
              }
              get type() {
                return this._filter.type;
              }
              set type(t) {
                Bn( - 1 !== ['lowpass',
                'highpass',
                'bandpass',
                'lowshelf',
                'highshelf',
                'notch',
                'allpass',
                'peaking'].indexOf(t), `Invalid filter type: ${ t }`),
                this._filter.type = t;
              }
              getFrequencyResponse(t = 128) {
                const e = new Float32Array(t);
                for (let s = 0; s < t; s++) {
                  const n = 19980 * Math.pow(s / t, 2) + 20;
                  e[s] = n;
                }
                const s = new Float32Array(t),
                n = new Float32Array(t),
                i = this.context.createBiquadFilter();
                return i.type = this.type,
                i.Q.value = this.Q.value,
                i.frequency.value = this.frequency.value,
                i.gain.value = this.gain.value,
                i.getFrequencyResponse(e, s, n),
                s;
              }
              dispose() {
                return super.dispose(),
                this._filter.disconnect(),
                this.Q.dispose(),
                this.frequency.dispose(),
                this.gain.dispose(),
                this.detune.dispose(),
                this;
              }
            }
            class Or extends io {
              constructor() {
                super (ui(Or.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'rolloff'
                ])),
                this.name = 'Filter',
                this.input = new ho({
                  context: this.context
                }),
                this.output = new ho({
                  context: this.context
                }),
                this._filters = [
                ];
                const t = ui(Or.getDefaults(), arguments, [
                  'frequency',
                  'type',
                  'rolloff'
                ]);
                this._filters = [
                ],
                this.Q = new po({
                  context: this.context,
                  units: 'positive',
                  value: t.Q
                }),
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.frequency
                }),
                this.detune = new po({
                  context: this.context,
                  units: 'cents',
                  value: t.detune
                }),
                this.gain = new po({
                  context: this.context,
                  units: 'decibels',
                  convert: !1,
                  value: t.gain
                }),
                this._type = t.type,
                this.rolloff = t.rolloff,
                Oi(this, [
                  'detune',
                  'frequency',
                  'gain',
                  'Q'
                ]);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  Q: 1,
                  detune: 0,
                  frequency: 350,
                  gain: 0,
                  rolloff: - 12,
                  type: 'lowpass'
                });
              }
              get type() {
                return this._type;
              }
              set type(t) {
                Bn( - 1 !== ['lowpass',
                'highpass',
                'bandpass',
                'lowshelf',
                'highshelf',
                'notch',
                'allpass',
                'peaking'].indexOf(t), `Invalid filter type: ${ t }`),
                this._type = t,
                this._filters.forEach(e=>e.type = t);
              }
              get rolloff() {
                return this._rolloff;
              }
              set rolloff(t) {
                const e = Nn(t) ? t : parseInt(t, 10),
                s = [
                  - 12,
                  - 24,
                  - 48,
                  - 96
                ];
                let n = s.indexOf(e);
                Bn( - 1 !== n, `rolloff can only be ${ s.join(', ') }`),
                n += 1,
                this._rolloff = e,
                this.input.disconnect(),
                this._filters.forEach(t=>t.disconnect()),
                this._filters = new Array(n);
                for (let t = 0; t < n; t++) {
                  const e = new Dr({
                    context: this.context
                  });
                  e.type = this._type,
                  this.frequency.connect(e.frequency),
                  this.detune.connect(e.detune),
                  this.Q.connect(e.Q),
                  this.gain.connect(e.gain),
                  this._filters[t] = e;
                }
                this._internalChannels = this._filters,
                oo(this.input, ...this._internalChannels, this.output);
              }
              getFrequencyResponse(t = 128) {
                const e = new Dr({
                  frequency: this.frequency.value,
                  gain: this.gain.value,
                  Q: this.Q.value,
                  type: this._type,
                  detune: this.detune.value
                }),
                s = new Float32Array(t).map(() =>1);
                return this._filters.forEach(() =>{
                  e.getFrequencyResponse(t).forEach((t, e) =>s[e] *= t);
                }),
                e.dispose(),
                s;
              }
              dispose() {
                return super.dispose(),
                this._filters.forEach(t=>{
                  t.dispose();
                }),
                Mi(this, [
                  'detune',
                  'frequency',
                  'gain',
                  'Q'
                ]),
                this.frequency.dispose(),
                this.Q.dispose(),
                this.detune.dispose(),
                this.gain.dispose(),
                this;
              }
            }
            class Mr extends xr {
              constructor() {
                super (ui(Mr.getDefaults(), arguments, [
                  'attack',
                  'decay',
                  'sustain',
                  'release'
                ])),
                this.name = 'FrequencyEnvelope';
                const t = ui(Mr.getDefaults(), arguments, [
                  'attack',
                  'decay',
                  'sustain',
                  'release'
                ]);
                this._octaves = t.octaves,
                this._baseFrequency = this.toFrequency(t.baseFrequency),
                this._exponent = this.input = new Fo({
                  context: this.context,
                  value: t.exponent
                }),
                this._scale = this.output = new ir({
                  context: this.context,
                  min: this._baseFrequency,
                  max: this._baseFrequency * Math.pow(2, this._octaves)
                }),
                this._sig.chain(this._exponent, this._scale);
              }
              static getDefaults() {
                return Object.assign(xr.getDefaults(), {
                  baseFrequency: 200,
                  exponent: 1,
                  octaves: 4
                });
              }
              get baseFrequency() {
                return this._baseFrequency;
              }
              set baseFrequency(t) {
                const e = this.toFrequency(t);
                Un(e, 0),
                this._baseFrequency = e,
                this._scale.min = this._baseFrequency,
                this.octaves = this._octaves;
              }
              get octaves() {
                return this._octaves;
              }
              set octaves(t) {
                this._octaves = t,
                this._scale.max = this._baseFrequency * Math.pow(2, t);
              }
              get exponent() {
                return this._exponent.value;
              }
              set exponent(t) {
                this._exponent.value = t;
              }
              dispose() {
                return super.dispose(),
                this._exponent.dispose(),
                this._scale.dispose(),
                this;
              }
            }
            class Er extends Tr {
              constructor() {
                super (ui(Er.getDefaults(), arguments)),
                this.name = 'MonoSynth';
                const t = ui(Er.getDefaults(), arguments);
                this.oscillator = new sr(Object.assign(t.oscillator, {
                  context: this.context,
                  detune: t.detune,
                  onstop: () =>this.onsilence(this)
                })),
                this.frequency = this.oscillator.frequency,
                this.detune = this.oscillator.detune,
                this.filter = new Or(Object.assign(t.filter, {
                  context: this.context
                })),
                this.filterEnvelope = new Mr(Object.assign(t.filterEnvelope, {
                  context: this.context
                })),
                this.envelope = new Sr(Object.assign(t.envelope, {
                  context: this.context
                })),
                this.oscillator.chain(this.filter, this.envelope, this.output),
                this.filterEnvelope.connect(this.filter.frequency),
                Oi(this, [
                  'oscillator',
                  'frequency',
                  'detune',
                  'filter',
                  'filterEnvelope',
                  'envelope'
                ]);
              }
              static getDefaults() {
                return Object.assign(Tr.getDefaults(), {
                  envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), {
                    attack: 0.005,
                    decay: 0.1,
                    release: 1,
                    sustain: 0.9
                  }),
                  filter: Object.assign(di(Or.getDefaults(), Object.keys(io.getDefaults())), {
                    Q: 1,
                    rolloff: - 12,
                    type: 'lowpass'
                  }),
                  filterEnvelope: Object.assign(di(Mr.getDefaults(), Object.keys(io.getDefaults())), {
                    attack: 0.6,
                    baseFrequency: 200,
                    decay: 0.2,
                    exponent: 2,
                    octaves: 3,
                    release: 2,
                    sustain: 0.5
                  }),
                  oscillator: Object.assign(di(sr.getDefaults(), Object.keys(Po.getDefaults())), {
                    type: 'sawtooth'
                  })
                });
              }
              _triggerEnvelopeAttack(t, e = 1) {
                if (this.envelope.triggerAttack(t, e), this.filterEnvelope.triggerAttack(t), this.oscillator.start(t), 0 === this.envelope.sustain) {
                  const e = this.toSeconds(this.envelope.attack),
                  s = this.toSeconds(this.envelope.decay);
                  this.oscillator.stop(t + e + s);
                }
              }
              _triggerEnvelopeRelease(t) {
                this.envelope.triggerRelease(t),
                this.filterEnvelope.triggerRelease(t),
                this.oscillator.stop(t + this.toSeconds(this.envelope.release));
              }
              getLevelAtTime(t) {
                return t = this.toSeconds(t),
                this.envelope.getValueAtTime(t);
              }
              dispose() {
                return super.dispose(),
                this.oscillator.dispose(),
                this.envelope.dispose(),
                this.filterEnvelope.dispose(),
                this.filter.dispose(),
                this;
              }
            }
            class Rr extends Tr {
              constructor() {
                super (ui(Rr.getDefaults(), arguments)),
                this.name = 'DuoSynth';
                const t = ui(Rr.getDefaults(), arguments);
                this.voice0 = new Er(Object.assign(t.voice0, {
                  context: this.context,
                  onsilence: () =>this.onsilence(this)
                })),
                this.voice1 = new Er(Object.assign(t.voice1, {
                  context: this.context
                })),
                this.harmonicity = new Yo({
                  context: this.context,
                  units: 'positive',
                  value: t.harmonicity
                }),
                this._vibrato = new rr({
                  frequency: t.vibratoRate,
                  context: this.context,
                  min: - 50,
                  max: 50
                }),
                this._vibrato.start(),
                this.vibratoRate = this._vibrato.frequency,
                this._vibratoGain = new ho({
                  context: this.context,
                  units: 'normalRange',
                  gain: t.vibratoAmount
                }),
                this.vibratoAmount = this._vibratoGain.gain,
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: 440
                }),
                this.detune = new po({
                  context: this.context,
                  units: 'cents',
                  value: t.detune
                }),
                this.frequency.connect(this.voice0.frequency),
                this.frequency.chain(this.harmonicity, this.voice1.frequency),
                this._vibrato.connect(this._vibratoGain),
                this._vibratoGain.fan(this.voice0.detune, this.voice1.detune),
                this.detune.fan(this.voice0.detune, this.voice1.detune),
                this.voice0.connect(this.output),
                this.voice1.connect(this.output),
                Oi(this, [
                  'voice0',
                  'voice1',
                  'frequency',
                  'vibratoAmount',
                  'vibratoRate'
                ]);
              }
              getLevelAtTime(t) {
                return t = this.toSeconds(t),
                this.voice0.envelope.getValueAtTime(t) + this.voice1.envelope.getValueAtTime(t);
              }
              static getDefaults() {
                return li(Tr.getDefaults(), {
                  vibratoAmount: 0.5,
                  vibratoRate: 5,
                  harmonicity: 1.5,
                  voice0: li(di(Er.getDefaults(), Object.keys(Tr.getDefaults())), {
                    filterEnvelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5
                    },
                    envelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5
                    }
                  }),
                  voice1: li(di(Er.getDefaults(), Object.keys(Tr.getDefaults())), {
                    filterEnvelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5
                    },
                    envelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5
                    }
                  })
                });
              }
              _triggerEnvelopeAttack(t, e) {
                this.voice0._triggerEnvelopeAttack(t, e),
                this.voice1._triggerEnvelopeAttack(t, e);
              }
              _triggerEnvelopeRelease(t) {
                return this.voice0._triggerEnvelopeRelease(t),
                this.voice1._triggerEnvelopeRelease(t),
                this;
              }
              dispose() {
                return super.dispose(),
                this.voice0.dispose(),
                this.voice1.dispose(),
                this.frequency.dispose(),
                this.detune.dispose(),
                this._vibrato.dispose(),
                this.vibratoRate.dispose(),
                this._vibratoGain.dispose(),
                this.harmonicity.dispose(),
                this;
              }
            }
            class qr extends Ar {
              constructor() {
                super (ui(qr.getDefaults(), arguments)),
                this.name = 'FMSynth';
                const t = ui(qr.getDefaults(), arguments);
                this.modulationIndex = new Yo({
                  context: this.context,
                  value: t.modulationIndex
                }),
                this.frequency.connect(this._carrier.frequency),
                this.frequency.chain(this.harmonicity, this._modulator.frequency),
                this.frequency.chain(this.modulationIndex, this._modulationNode),
                this.detune.fan(this._carrier.detune, this._modulator.detune),
                this._modulator.connect(this._modulationNode.gain),
                this._modulationNode.connect(this._carrier.frequency),
                this._carrier.connect(this.output);
              }
              static getDefaults() {
                return Object.assign(Ar.getDefaults(), {
                  modulationIndex: 10
                });
              }
              dispose() {
                return super.dispose(),
                this.modulationIndex.dispose(),
                this;
              }
            }
            const Fr = [
              1,
              1.483,
              1.932,
              2.546,
              2.63,
              3.897
            ];
            class Ir extends Tr {
              constructor() {
                super (ui(Ir.getDefaults(), arguments)),
                this.name = 'MetalSynth',
                this._oscillators = [
                ],
                this._freqMultipliers = [
                ];
                const t = ui(Ir.getDefaults(), arguments);
                this.detune = new po({
                  context: this.context,
                  units: 'cents',
                  value: t.detune
                }),
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency'
                }),
                this._amplitude = new ho({
                  context: this.context,
                  gain: 0
                }).connect(this.output),
                this._highpass = new Or({
                  Q: 0,
                  context: this.context,
                  type: 'highpass'
                }).connect(this._amplitude);
                for (let e = 0; e < Fr.length; e++) {
                  const s = new Ho({
                    context: this.context,
                    harmonicity: t.harmonicity,
                    modulationIndex: t.modulationIndex,
                    modulationType: 'square',
                    onstop: 0 === e ? () =>this.onsilence(this) : Ei,
                    type: 'square'
                  });
                  s.connect(this._highpass),
                  this._oscillators[e] = s;
                  const n = new Yo({
                    context: this.context,
                    value: Fr[e]
                  });
                  this._freqMultipliers[e] = n,
                  this.frequency.chain(n, s.frequency),
                  this.detune.connect(s.detune);
                }
                this._filterFreqScaler = new ir({
                  context: this.context,
                  max: 7000,
                  min: this.toFrequency(t.resonance)
                }),
                this.envelope = new xr({
                  attack: t.envelope.attack,
                  attackCurve: 'linear',
                  context: this.context,
                  decay: t.envelope.decay,
                  release: t.envelope.release,
                  sustain: 0
                }),
                this.envelope.chain(this._filterFreqScaler, this._highpass.frequency),
                this.envelope.connect(this._amplitude.gain),
                this._octaves = t.octaves,
                this.octaves = t.octaves;
              }
              static getDefaults() {
                return li(Tr.getDefaults(), {
                  envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), {
                    attack: 0.001,
                    decay: 1.4,
                    release: 0.2
                  }),
                  harmonicity: 5.1,
                  modulationIndex: 32,
                  octaves: 1.5,
                  resonance: 4000
                });
              }
              _triggerEnvelopeAttack(t, e = 1) {
                return this.envelope.triggerAttack(t, e),
                this._oscillators.forEach(e=>e.start(t)),
                0 === this.envelope.sustain && this._oscillators.forEach(e=>{
                  e.stop(t + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay));
                }),
                this;
              }
              _triggerEnvelopeRelease(t) {
                return this.envelope.triggerRelease(t),
                this._oscillators.forEach(e=>e.stop(t + this.toSeconds(this.envelope.release))),
                this;
              }
              getLevelAtTime(t) {
                return t = this.toSeconds(t),
                this.envelope.getValueAtTime(t);
              }
              get modulationIndex() {
                return this._oscillators[0].modulationIndex.value;
              }
              set modulationIndex(t) {
                this._oscillators.forEach(e=>e.modulationIndex.value = t);
              }
              get harmonicity() {
                return this._oscillators[0].harmonicity.value;
              }
              set harmonicity(t) {
                this._oscillators.forEach(e=>e.harmonicity.value = t);
              }
              get resonance() {
                return this._filterFreqScaler.min;
              }
              set resonance(t) {
                this._filterFreqScaler.min = this.toFrequency(t),
                this.octaves = this._octaves;
              }
              get octaves() {
                return this._octaves;
              }
              set octaves(t) {
                this._octaves = t,
                this._filterFreqScaler.max = this._filterFreqScaler.min * Math.pow(2, t);
              }
              dispose() {
                return super.dispose(),
                this._oscillators.forEach(t=>t.dispose()),
                this._freqMultipliers.forEach(t=>t.dispose()),
                this.frequency.dispose(),
                this.detune.dispose(),
                this._filterFreqScaler.dispose(),
                this._amplitude.dispose(),
                this.envelope.dispose(),
                this._highpass.dispose(),
                this;
              }
            }
            class Vr extends kr {
              constructor() {
                super (ui(Vr.getDefaults(), arguments)),
                this.name = 'MembraneSynth',
                this.portamento = 0;
                const t = ui(Vr.getDefaults(), arguments);
                this.pitchDecay = t.pitchDecay,
                this.octaves = t.octaves,
                Oi(this, [
                  'oscillator',
                  'envelope'
                ]);
              }
              static getDefaults() {
                return li(Tr.getDefaults(), kr.getDefaults(), {
                  envelope: {
                    attack: 0.001,
                    attackCurve: 'exponential',
                    decay: 0.4,
                    release: 1.4,
                    sustain: 0.01
                  },
                  octaves: 10,
                  oscillator: {
                    type: 'sine'
                  },
                  pitchDecay: 0.05
                });
              }
              setNote(t, e) {
                const s = this.toSeconds(e),
                n = this.toFrequency(t instanceof Yi ? t.toFrequency() : t),
                i = n * this.octaves;
                return this.oscillator.frequency.setValueAtTime(i, s),
                this.oscillator.frequency.exponentialRampToValueAtTime(n, s + this.toSeconds(this.pitchDecay)),
                this;
              }
              dispose() {
                return super.dispose(),
                this;
              }
            }
            si([ar(0)], Vr.prototype, 'octaves', void 0),
            si([cr(0)], Vr.prototype, 'pitchDecay', void 0);
            class Nr extends br {
              constructor() {
                super (ui(Nr.getDefaults(), arguments)),
                this.name = 'NoiseSynth';
                const t = ui(Nr.getDefaults(), arguments);
                this.noise = new Lo(Object.assign({
                  context: this.context
                }, t.noise)),
                this.envelope = new Sr(Object.assign({
                  context: this.context
                }, t.envelope)),
                this.noise.chain(this.envelope, this.output);
              }
              static getDefaults() {
                return Object.assign(br.getDefaults(), {
                  envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), {
                    decay: 0.1,
                    sustain: 0
                  }),
                  noise: Object.assign(di(Lo.getDefaults(), Object.keys(Po.getDefaults())), {
                    type: 'white'
                  })
                });
              }
              triggerAttack(t, e = 1) {
                return t = this.toSeconds(t),
                this.envelope.triggerAttack(t, e),
                this.noise.start(t),
                0 === this.envelope.sustain && this.noise.stop(t + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay)),
                this;
              }
              triggerRelease(t) {
                return t = this.toSeconds(t),
                this.envelope.triggerRelease(t),
                this.noise.stop(t + this.toSeconds(this.envelope.release)),
                this;
              }
              sync() {
                return this._syncState() && (this._syncMethod('triggerAttack', 0), this._syncMethod('triggerRelease', 0)),
                this;
              }
              triggerAttackRelease(t, e, s = 1) {
                return e = this.toSeconds(e),
                t = this.toSeconds(t),
                this.triggerAttack(e, s),
                this.triggerRelease(e + t),
                this;
              }
              dispose() {
                return super.dispose(),
                this.noise.dispose(),
                this.envelope.dispose(),
                this;
              }
            }
            const Pr = new Set();
            function jr(t) {
              Pr.add(t);
            }
            function Lr(t, e) {
              const s = `registerProcessor("${ t }", ${ e })`;
              Pr.add(s);
            }
            class zr extends io {
              constructor(t) {
                super (t),
                this.name = 'ToneAudioWorklet',
                this.workletOptions = {
                },
                this.onprocessorerror = Ei;
                const e = URL.createObjectURL(new Blob([Array.from(Pr).join('\n')], {
                  type: 'text/javascript'
                })),
                s = this._audioWorkletName();
                this._dummyGain = this.context.createGain(),
                this._dummyParam = this._dummyGain.gain,
                this.context.addAudioWorkletModule(e).then(() =>{
                  this.disposed || (this._worklet = this.context.createAudioWorkletNode(s, this.workletOptions), this._worklet.onprocessorerror = this.onprocessorerror.bind(this), this.onReady(this._worklet));
                });
              }
              dispose() {
                return super.dispose(),
                this._dummyGain.disconnect(),
                this._worklet && (this._worklet.port.postMessage('dispose'), this._worklet.disconnect()),
                this;
              }
            }
            jr('\n\t/**\n\t * The base AudioWorkletProcessor for use in Tone.js. Works with the [[ToneAudioWorklet]]. \n\t */\n\tclass ToneAudioWorkletProcessor extends AudioWorkletProcessor {\n\n\t\tconstructor(options) {\n\t\t\t\n\t\t\tsuper(options);\n\t\t\t/**\n\t\t\t * If the processor was disposed or not. Keep alive until it\'s disposed.\n\t\t\t */\n\t\t\tthis.disposed = false;\n\t\t   \t/** \n\t\t\t * The number of samples in the processing block\n\t\t\t */\n\t\t\tthis.blockSize = 128;\n\t\t\t/**\n\t\t\t * the sample rate\n\t\t\t */\n\t\t\tthis.sampleRate = sampleRate;\n\n\t\t\tthis.port.onmessage = (event) => {\n\t\t\t\t// when it receives a dispose \n\t\t\t\tif (event.data === "dispose") {\n\t\t\t\t\tthis.disposed = true;\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t}\n'),
            jr('\n\t/**\n\t * Abstract class for a single input/output processor. \n\t * has a \'generate\' function which processes one sample at a time\n\t */\n\tclass SingleIOProcessor extends ToneAudioWorkletProcessor {\n\n\t\tconstructor(options) {\n\t\t\tsuper(Object.assign(options, {\n\t\t\t\tnumberOfInputs: 1,\n\t\t\t\tnumberOfOutputs: 1\n\t\t\t}));\n\t\t\t/**\n\t\t\t * Holds the name of the parameter and a single value of that\n\t\t\t * parameter at the current sample\n\t\t\t * @type { [name: string]: number }\n\t\t\t */\n\t\t\tthis.params = {}\n\t\t}\n\n\t\t/**\n\t\t * Generate an output sample from the input sample and parameters\n\t\t * @abstract\n\t\t * @param input number\n\t\t * @param channel number\n\t\t * @param parameters { [name: string]: number }\n\t\t * @returns number\n\t\t */\n\t\tgenerate(){}\n\n\t\t/**\n\t\t * Update the private params object with the \n\t\t * values of the parameters at the given index\n\t\t * @param parameters { [name: string]: Float32Array },\n\t\t * @param index number\n\t\t */\n\t\tupdateParams(parameters, index) {\n\t\t\tfor (const paramName in parameters) {\n\t\t\t\tconst param = parameters[paramName];\n\t\t\t\tif (param.length > 1) {\n\t\t\t\t\tthis.params[paramName] = parameters[paramName][index];\n\t\t\t\t} else {\n\t\t\t\t\tthis.params[paramName] = parameters[paramName][0];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Process a single frame of the audio\n\t\t * @param inputs Float32Array[][]\n\t\t * @param outputs Float32Array[][]\n\t\t */\n\t\tprocess(inputs, outputs, parameters) {\n\t\t\tconst input = inputs[0];\n\t\t\tconst output = outputs[0];\n\t\t\t// get the parameter values\n\t\t\tconst channelCount = Math.max(input && input.length || 0, output.length);\n\t\t\tfor (let sample = 0; sample < this.blockSize; sample++) {\n\t\t\t\tthis.updateParams(parameters, sample);\n\t\t\t\tfor (let channel = 0; channel < channelCount; channel++) {\n\t\t\t\t\tconst inputSample = input && input.length ? input[channel][sample] : 0;\n\t\t\t\t\toutput[channel][sample] = this.generate(inputSample, channel, this.params);\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn !this.disposed;\n\t\t}\n\t};\n'),
            jr('\n\t/**\n\t * A multichannel buffer for use within an AudioWorkletProcessor as a delay line\n\t */\n\tclass DelayLine {\n\t\t\n\t\tconstructor(size, channels) {\n\t\t\tthis.buffer = [];\n\t\t\tthis.writeHead = []\n\t\t\tthis.size = size;\n\n\t\t\t// create the empty channels\n\t\t\tfor (let i = 0; i < channels; i++) {\n\t\t\t\tthis.buffer[i] = new Float32Array(this.size);\n\t\t\t\tthis.writeHead[i] = 0;\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Push a value onto the end\n\t\t * @param channel number\n\t\t * @param value number\n\t\t */\n\t\tpush(channel, value) {\n\t\t\tthis.writeHead[channel] += 1;\n\t\t\tif (this.writeHead[channel] > this.size) {\n\t\t\t\tthis.writeHead[channel] = 0;\n\t\t\t}\n\t\t\tthis.buffer[channel][this.writeHead[channel]] = value;\n\t\t}\n\n\t\t/**\n\t\t * Get the recorded value of the channel given the delay\n\t\t * @param channel number\n\t\t * @param delay number delay samples\n\t\t */\n\t\tget(channel, delay) {\n\t\t\tlet readHead = this.writeHead[channel] - Math.floor(delay);\n\t\t\tif (readHead < 0) {\n\t\t\t\treadHead += this.size;\n\t\t\t}\n\t\t\treturn this.buffer[channel][readHead];\n\t\t}\n\t}\n');
            const Wr = 'feedback-comb-filter';
            Lr(Wr, '\n\tclass FeedbackCombFilterWorklet extends SingleIOProcessor {\n\n\t\tconstructor(options) {\n\t\t\tsuper(options);\n\t\t\tthis.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);\n\t\t}\n\n\t\tstatic get parameterDescriptors() {\n\t\t\treturn [{\n\t\t\t\tname: "delayTime",\n\t\t\t\tdefaultValue: 0.1,\n\t\t\t\tminValue: 0,\n\t\t\t\tmaxValue: 1,\n\t\t\t\tautomationRate: "k-rate"\n\t\t\t}, {\n\t\t\t\tname: "feedback",\n\t\t\t\tdefaultValue: 0.5,\n\t\t\t\tminValue: 0,\n\t\t\t\tmaxValue: 0.9999,\n\t\t\t\tautomationRate: "k-rate"\n\t\t\t}];\n\t\t}\n\n\t\tgenerate(input, channel, parameters) {\n\t\t\tconst delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);\n\t\t\tthis.delayLine.push(channel, input + delayedSample * parameters.feedback);\n\t\t\treturn delayedSample;\n\t\t}\n\t}\n');
            class Br extends zr {
              constructor() {
                super (ui(Br.getDefaults(), arguments, [
                  'delayTime',
                  'resonance'
                ])),
                this.name = 'FeedbackCombFilter';
                const t = ui(Br.getDefaults(), arguments, [
                  'delayTime',
                  'resonance'
                ]);
                this.input = new ho({
                  context: this.context
                }),
                this.output = new ho({
                  context: this.context
                }),
                this.delayTime = new no({
                  context: this.context,
                  value: t.delayTime,
                  units: 'time',
                  minValue: 0,
                  maxValue: 1,
                  param: this._dummyParam,
                  swappable: !0
                }),
                this.resonance = new no({
                  context: this.context,
                  value: t.resonance,
                  units: 'normalRange',
                  param: this._dummyParam,
                  swappable: !0
                }),
                Oi(this, [
                  'resonance',
                  'delayTime'
                ]);
              }
              _audioWorkletName() {
                return Wr;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  delayTime: 0.1,
                  resonance: 0.5
                });
              }
              onReady(t) {
                oo(this.input, t, this.output);
                const e = t.parameters.get('delayTime');
                this.delayTime.setParam(e);
                const s = t.parameters.get('feedback');
                this.resonance.setParam(s);
              }
              dispose() {
                return super.dispose(),
                this.input.dispose(),
                this.output.dispose(),
                this.delayTime.dispose(),
                this.resonance.dispose(),
                this;
              }
            }
            class Ur extends io {
              constructor() {
                super (ui(Ur.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ])),
                this.name = 'OnePoleFilter';
                const t = ui(Ur.getDefaults(), arguments, [
                  'frequency',
                  'type'
                ]);
                this._frequency = t.frequency,
                this._type = t.type,
                this.input = new ho({
                  context: this.context
                }),
                this.output = new ho({
                  context: this.context
                }),
                this._createFilter();
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  frequency: 880,
                  type: 'lowpass'
                });
              }
              _createFilter() {
                const t = this._filter,
                e = this.toFrequency(this._frequency),
                s = 1 / (2 * Math.PI * e);
                if ('lowpass' === this._type) {
                  const t = 1 / (s * this.context.sampleRate),
                  e = t - 1;
                  this._filter = this.context.createIIRFilter([t,
                  0], [
                    1,
                    e
                  ]);
                } else {
                  const t = 1 / (s * this.context.sampleRate) - 1;
                  this._filter = this.context.createIIRFilter([1,
                  - 1], [
                    1,
                    t
                  ]);
                }
                this.input.chain(this._filter, this.output),
                t && this.context.setTimeout(() =>{
                  this.disposed || (this.input.disconnect(t), t.disconnect());
                }, this.blockTime);
              }
              get frequency() {
                return this._frequency;
              }
              set frequency(t) {
                this._frequency = t,
                this._createFilter();
              }
              get type() {
                return this._type;
              }
              set type(t) {
                this._type = t,
                this._createFilter();
              }
              getFrequencyResponse(t = 128) {
                const e = new Float32Array(t);
                for (let s = 0; s < t; s++) {
                  const n = 19980 * Math.pow(s / t, 2) + 20;
                  e[s] = n;
                }
                const s = new Float32Array(t),
                n = new Float32Array(t);
                return this._filter.getFrequencyResponse(e, s, n),
                s;
              }
              dispose() {
                return super.dispose(),
                this.input.dispose(),
                this.output.dispose(),
                this._filter.disconnect(),
                this;
              }
            }
            class Gr extends io {
              constructor() {
                super (ui(Gr.getDefaults(), arguments, [
                  'delayTime',
                  'resonance',
                  'dampening'
                ])),
                this.name = 'LowpassCombFilter';
                const t = ui(Gr.getDefaults(), arguments, [
                  'delayTime',
                  'resonance',
                  'dampening'
                ]);
                this._combFilter = this.output = new Br({
                  context: this.context,
                  delayTime: t.delayTime,
                  resonance: t.resonance
                }),
                this.delayTime = this._combFilter.delayTime,
                this.resonance = this._combFilter.resonance,
                this._lowpass = this.input = new Ur({
                  context: this.context,
                  frequency: t.dampening,
                  type: 'lowpass'
                }),
                this._lowpass.connect(this._combFilter);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  dampening: 3000,
                  delayTime: 0.1,
                  resonance: 0.5
                });
              }
              get dampening() {
                return this._lowpass.frequency;
              }
              set dampening(t) {
                this._lowpass.frequency = t;
              }
              dispose() {
                return super.dispose(),
                this._combFilter.dispose(),
                this._lowpass.dispose(),
                this;
              }
            }
            class Qr extends br {
              constructor() {
                super (ui(Qr.getDefaults(), arguments)),
                this.name = 'PluckSynth';
                const t = ui(Qr.getDefaults(), arguments);
                this._noise = new Lo({
                  context: this.context,
                  type: 'pink'
                }),
                this.attackNoise = t.attackNoise,
                this._lfcf = new Gr({
                  context: this.context,
                  dampening: t.dampening,
                  resonance: t.resonance
                }),
                this.resonance = t.resonance,
                this.release = t.release,
                this._noise.connect(this._lfcf),
                this._lfcf.connect(this.output);
              }
              static getDefaults() {
                return li(br.getDefaults(), {
                  attackNoise: 1,
                  dampening: 4000,
                  resonance: 0.7,
                  release: 1
                });
              }
              get dampening() {
                return this._lfcf.dampening;
              }
              set dampening(t) {
                this._lfcf.dampening = t;
              }
              triggerAttack(t, e) {
                const s = this.toFrequency(t);
                e = this.toSeconds(e);
                const n = 1 / s;
                return this._lfcf.delayTime.setValueAtTime(n, e),
                this._noise.start(e),
                this._noise.stop(e + n * this.attackNoise),
                this._lfcf.resonance.cancelScheduledValues(e),
                this._lfcf.resonance.setValueAtTime(this.resonance, e),
                this;
              }
              triggerRelease(t) {
                return this._lfcf.resonance.linearRampTo(0, this.release, t),
                this;
              }
              dispose() {
                return super.dispose(),
                this._noise.dispose(),
                this._lfcf.dispose(),
                this;
              }
            }
            class Zr extends br {
              constructor() {
                super (ui(Zr.getDefaults(), arguments, [
                  'voice',
                  'options'
                ])),
                this.name = 'PolySynth',
                this._availableVoices = [
                ],
                this._activeVoices = [
                ],
                this._voices = [
                ],
                this._gcTimeout = - 1,
                this._averageActiveVoices = 0,
                this._syncedRelease = t=>this.releaseAll(t);
                const t = ui(Zr.getDefaults(), arguments, [
                  'voice',
                  'options'
                ]);
                Bn(!Nn(t.voice), 'DEPRECATED: The polyphony count is no longer the first argument.');
                const e = t.voice.getDefaults();
                this.options = Object.assign(e, t.options),
                this.voice = t.voice,
                this.maxPolyphony = t.maxPolyphony,
                this._dummyVoice = this._getNextAvailableVoice();
                const s = this._voices.indexOf(this._dummyVoice);
                this._voices.splice(s, 1),
                this._gcTimeout = this.context.setInterval(this._collectGarbage.bind(this), 1);
              }
              static getDefaults() {
                return Object.assign(br.getDefaults(), {
                  maxPolyphony: 32,
                  options: {
                  },
                  voice: kr
                });
              }
              get activeVoices() {
                return this._activeVoices.length;
              }
              _makeVoiceAvailable(t) {
                this._availableVoices.push(t);
                const e = this._activeVoices.findIndex(e=>e.voice === t);
                this._activeVoices.splice(e, 1);
              }
              _getNextAvailableVoice() {
                if (this._availableVoices.length) return this._availableVoices.shift();
                if (this._voices.length < this.maxPolyphony) {
                  const t = new this.voice(Object.assign(this.options, {
                    context: this.context,
                    onsilence: this._makeVoiceAvailable.bind(this)
                  }));
                  return Bn(t instanceof Tr, 'Voice must extend Monophonic class'),
                  t.connect(this.output),
                  this._voices.push(t),
                  t;
                }
                Kn('Max polyphony exceeded. Note dropped.');
              }
              _collectGarbage() {
                if (this._averageActiveVoices = Math.max(0.95 * this._averageActiveVoices, this.activeVoices), this._availableVoices.length && this._voices.length > Math.ceil(this._averageActiveVoices + 1)) {
                  const t = this._availableVoices.shift(),
                  e = this._voices.indexOf(t);
                  this._voices.splice(e, 1),
                  this.context.isOffline || t.dispose();
                }
              }
              _triggerAttack(t, e, s) {
                t.forEach(t=>{
                  const n = new bo(this.context, t).toMidi(),
                  i = this._getNextAvailableVoice();
                  i && (i.triggerAttack(t, e, s), this._activeVoices.push({
                    midi: n,
                    voice: i,
                    released: !1
                  }), this.log('triggerAttack', t, e));
                });
              }
              _triggerRelease(t, e) {
                t.forEach(t=>{
                  const s = new bo(this.context, t).toMidi(),
                  n = this._activeVoices.find(({
                    midi: t,
                    released: e
                  }) =>t === s && !e);
                  n && (n.voice.triggerRelease(e), n.released = !0, this.log('triggerRelease', t, e));
                });
              }
              _scheduleEvent(t, e, s, n) {
                Bn(!this.disposed, 'Synth was already disposed'),
                s <= this.now() ? 'attack' === t ? this._triggerAttack(e, s, n) : this._triggerRelease(e, s) : this.context.setTimeout(() =>{
                  this.disposed || this._scheduleEvent(t, e, s, n);
                }, s - this.now());
              }
              triggerAttack(t, e, s) {
                Array.isArray(t) || (t = [
                  t
                ]);
                const n = this.toSeconds(e);
                return this._scheduleEvent('attack', t, n, s),
                this;
              }
              triggerRelease(t, e) {
                Array.isArray(t) || (t = [
                  t
                ]);
                const s = this.toSeconds(e);
                return this._scheduleEvent('release', t, s),
                this;
              }
              triggerAttackRelease(t, e, s, n) {
                const i = this.toSeconds(s);
                if (this.triggerAttack(t, i, n), Ln(e)) {
                  Bn(Ln(t), 'If the duration is an array, the notes must also be an array');
                  for (let s = 0; s < t.length; s++) {
                    const n = e[Math.min(s, e.length - 1)],
                    o = this.toSeconds(n);
                    Bn(o > 0, 'The duration must be greater than 0'),
                    this.triggerRelease(t[s], i + o);
                  }
                } else {
                  const s = this.toSeconds(e);
                  Bn(s > 0, 'The duration must be greater than 0'),
                  this.triggerRelease(t, i + s);
                }
                return this;
              }
              sync() {
                return this._syncState() && (this._syncMethod('triggerAttack', 1), this._syncMethod('triggerRelease', 1), this.context.transport.on('stop', this._syncedRelease), this.context.transport.on('pause', this._syncedRelease), this.context.transport.on('loopEnd', this._syncedRelease)),
                this;
              }
              set(t) {
                const e = di(t, [
                  'onsilence',
                  'context'
                ]);
                return this.options = li(this.options, e),
                this._voices.forEach(t=>t.set(e)),
                this._dummyVoice.set(e),
                this;
              }
              get() {
                return this._dummyVoice.get();
              }
              releaseAll(t) {
                const e = this.toSeconds(t);
                return this._activeVoices.forEach(({
                  voice: t
                }) =>{
                  t.triggerRelease(e);
                }),
                this;
              }
              dispose() {
                return super.dispose(),
                this._dummyVoice.dispose(),
                this._voices.forEach(t=>t.dispose()),
                this._activeVoices = [
                ],
                this._availableVoices = [
                ],
                this.context.clearInterval(this._gcTimeout),
                this;
              }
            }
            class Xr extends br {
              constructor() {
                super (ui(Xr.getDefaults(), arguments, [
                  'urls',
                  'onload',
                  'baseUrl'
                ], 'urls')),
                this.name = 'Sampler',
                this._activeSources = new Map();
                const t = ui(Xr.getDefaults(), arguments, [
                  'urls',
                  'onload',
                  'baseUrl'
                ], 'urls'),
                e = {
                };
                Object.keys(t.urls).forEach(s=>{
                  const n = parseInt(s, 10);
                  if (Bn(Wn(s) || Nn(n) && isFinite(n), `url key is neither a note or midi pitch: ${ s }`), Wn(s)) {
                    const n = new Yi(this.context, s).toMidi();
                    e[n] = t.urls[s];
                  } else Nn(n) && isFinite(n) && (e[n] = t.urls[n]);
                }),
                this._buffers = new wo({
                  urls: e,
                  onload: t.onload,
                  baseUrl: t.baseUrl,
                  onerror: t.onerror
                }),
                this.attack = t.attack,
                this.release = t.release,
                this.curve = t.curve,
                this._buffers.loaded && Promise.resolve().then(t.onload);
              }
              static getDefaults() {
                return Object.assign(br.getDefaults(), {
                  attack: 0,
                  baseUrl: '',
                  curve: 'exponential',
                  onload: Ei,
                  onerror: Ei,
                  release: 0.1,
                  urls: {
                  }
                });
              }
              _findClosest(t) {
                let e = 0;
                for (; e < 96; ) {
                  if (this._buffers.has(t + e)) return - e;
                  if (this._buffers.has(t - e)) return e;
                  e++;
                }
                throw new Error(`No available buffers for note: ${ t }`);
              }
              triggerAttack(t, e, s = 1) {
                return this.log('triggerAttack', t, e, s),
                Array.isArray(t) || (t = [
                  t
                ]),
                t.forEach(t=>{
                  const n = Ui(new Yi(this.context, t).toFrequency()),
                  i = Math.round(n),
                  o = n - i,
                  r = this._findClosest(i),
                  a = i - r,
                  c = this._buffers.get(a),
                  h = zi(r + o),
                  l = new jo({
                    url: c,
                    context: this.context,
                    curve: this.curve,
                    fadeIn: this.attack,
                    fadeOut: this.release,
                    playbackRate: h
                  }).connect(this.output);
                  l.start(e, 0, c.duration / h, s),
                  Ln(this._activeSources.get(i)) || this._activeSources.set(i, [
                  ]),
                  this._activeSources.get(i).push(l),
                  l.onended = () =>{
                    if (this._activeSources && this._activeSources.has(i)) {
                      const t = this._activeSources.get(i),
                      e = t.indexOf(l);
                      - 1 !== e && t.splice(e, 1);
                    }
                  };
                }),
                this;
              }
              triggerRelease(t, e) {
                return this.log('triggerRelease', t, e),
                Array.isArray(t) || (t = [
                  t
                ]),
                t.forEach(t=>{
                  const s = new Yi(this.context, t).toMidi();
                  if (this._activeSources.has(s) && this._activeSources.get(s).length) {
                    const t = this._activeSources.get(s);
                    e = this.toSeconds(e),
                    t.forEach(t=>{
                      t.stop(e);
                    }),
                    this._activeSources.set(s, [
                    ]);
                  }
                }),
                this;
              }
              releaseAll(t) {
                const e = this.toSeconds(t);
                return this._activeSources.forEach(t=>{
                  for (; t.length; ) t.shift().stop(e);
                }),
                this;
              }
              sync() {
                return this._syncState() && (this._syncMethod('triggerAttack', 1), this._syncMethod('triggerRelease', 1)),
                this;
              }
              triggerAttackRelease(t, e, s, n = 1) {
                const i = this.toSeconds(s);
                return this.triggerAttack(t, i, n),
                Ln(e) ? (Bn(Ln(t), 'notes must be an array when duration is array'), t.forEach((t, s) =>{
                  const n = e[Math.min(s, e.length - 1)];
                  this.triggerRelease(t, i + this.toSeconds(n));
                })) : this.triggerRelease(t, i + this.toSeconds(e)),
                this;
              }
              add(t, e, s) {
                if (Bn(Wn(t) || isFinite(t), `note must be a pitch or midi: ${ t }`), Wn(t)) {
                  const n = new Yi(this.context, t).toMidi();
                  this._buffers.add(n, e, s);
                } else this._buffers.add(t, e, s);
                return this;
              }
              get loaded() {
                return this._buffers.loaded;
              }
              dispose() {
                return super.dispose(),
                this._buffers.dispose(),
                this._activeSources.forEach(t=>{
                  t.forEach(t=>t.dispose());
                }),
                this._activeSources.clear(),
                this;
              }
            }
            si([cr(0)], Xr.prototype, 'attack', void 0),
            si([cr(0)], Xr.prototype, 'release', void 0);
            class Yr extends eo {
              constructor() {
                super (ui(Yr.getDefaults(), arguments, [
                  'callback',
                  'value'
                ])),
                this.name = 'ToneEvent',
                this._state = new so('stopped'),
                this._startOffset = 0;
                const t = ui(Yr.getDefaults(), arguments, [
                  'callback',
                  'value'
                ]);
                this._loop = t.loop,
                this.callback = t.callback,
                this.value = t.value,
                this._loopStart = this.toTicks(t.loopStart),
                this._loopEnd = this.toTicks(t.loopEnd),
                this._playbackRate = t.playbackRate,
                this._probability = t.probability,
                this._humanize = t.humanize,
                this.mute = t.mute,
                this._playbackRate = t.playbackRate,
                this._state.increasing = !0,
                this._rescheduleEvents();
              }
              static getDefaults() {
                return Object.assign(eo.getDefaults(), {
                  callback: Ei,
                  humanize: !1,
                  loop: !1,
                  loopEnd: '1m',
                  loopStart: 0,
                  mute: !1,
                  playbackRate: 1,
                  probability: 1,
                  value: null
                });
              }
              _rescheduleEvents(t = - 1) {
                this._state.forEachFrom(t, t=>{
                  let e;
                  if ('started' === t.state) {
                    - 1 !== t.id && this.context.transport.clear(t.id);
                    const s = t.time + Math.round(this.startOffset / this._playbackRate);
                    if (!0 === this._loop || Nn(this._loop) && this._loop > 1) {
                      e = 1 / 0,
                      Nn(this._loop) && (e = this._loop * this._getLoopDuration());
                      const n = this._state.getAfter(s);
                      null !== n && (e = Math.min(e, n.time - s)),
                      e !== 1 / 0 && (e = new So(this.context, e));
                      const i = new So(this.context, this._getLoopDuration());
                      t.id = this.context.transport.scheduleRepeat(this._tick.bind(this), i, new So(this.context, s), e);
                    } else t.id = this.context.transport.schedule(this._tick.bind(this), new So(this.context, s));
                  }
                });
              }
              get state() {
                return this._state.getValueAtTime(this.context.transport.ticks);
              }
              get startOffset() {
                return this._startOffset;
              }
              set startOffset(t) {
                this._startOffset = t;
              }
              get probability() {
                return this._probability;
              }
              set probability(t) {
                this._probability = t;
              }
              get humanize() {
                return this._humanize;
              }
              set humanize(t) {
                this._humanize = t;
              }
              start(t) {
                const e = this.toTicks(t);
                return 'stopped' === this._state.getValueAtTime(e) && (this._state.add({
                  id: - 1,
                  state: 'started',
                  time: e
                }), this._rescheduleEvents(e)),
                this;
              }
              stop(t) {
                this.cancel(t);
                const e = this.toTicks(t);
                if ('started' === this._state.getValueAtTime(e)) {
                  this._state.setStateAtTime('stopped', e, {
                    id: - 1
                  });
                  const t = this._state.getBefore(e);
                  let s = e;
                  null !== t && (s = t.time),
                  this._rescheduleEvents(s);
                }
                return this;
              }
              cancel(t) {
                t = pi(t, - 1 / 0);
                const e = this.toTicks(t);
                return this._state.forEachFrom(e, t=>{
                  this.context.transport.clear(t.id);
                }),
                this._state.cancel(e),
                this;
              }
              _tick(t) {
                const e = this.context.transport.getTicksAtTime(t);
                if (!this.mute && 'started' === this._state.getValueAtTime(e)) {
                  if (this.probability < 1 && Math.random() > this.probability) return;
                  if (this.humanize) {
                    let e = 0.02;
                    jn(this.humanize) || (e = this.toSeconds(this.humanize)),
                    t += (2 * Math.random() - 1) * e;
                  }
                  this.callback(t, this.value);
                }
              }
              _getLoopDuration() {
                return (this._loopEnd - this._loopStart) / this._playbackRate;
              }
              get loop() {
                return this._loop;
              }
              set loop(t) {
                this._loop = t,
                this._rescheduleEvents();
              }
              get playbackRate() {
                return this._playbackRate;
              }
              set playbackRate(t) {
                this._playbackRate = t,
                this._rescheduleEvents();
              }
              get loopEnd() {
                return new So(this.context, this._loopEnd).toSeconds();
              }
              set loopEnd(t) {
                this._loopEnd = this.toTicks(t),
                this._loop && this._rescheduleEvents();
              }
              get loopStart() {
                return new So(this.context, this._loopStart).toSeconds();
              }
              set loopStart(t) {
                this._loopStart = this.toTicks(t),
                this._loop && this._rescheduleEvents();
              }
              get progress() {
                if (this._loop) {
                  const t = this.context.transport.ticks,
                  e = this._state.get(t);
                  if (null !== e && 'started' === e.state) {
                    const s = this._getLoopDuration();
                    return (t - e.time) % s / s;
                  }
                  return 0;
                }
                return 0;
              }
              dispose() {
                return super.dispose(),
                this.cancel(),
                this._state.dispose(),
                this;
              }
            }
            class $r extends eo {
              constructor() {
                super (ui($r.getDefaults(), arguments, [
                  'callback',
                  'interval'
                ])),
                this.name = 'Loop';
                const t = ui($r.getDefaults(), arguments, [
                  'callback',
                  'interval'
                ]);
                this._event = new Yr({
                  context: this.context,
                  callback: this._tick.bind(this),
                  loop: !0,
                  loopEnd: t.interval,
                  playbackRate: t.playbackRate,
                  probability: t.probability
                }),
                this.callback = t.callback,
                this.iterations = t.iterations;
              }
              static getDefaults() {
                return Object.assign(eo.getDefaults(), {
                  interval: '4n',
                  callback: Ei,
                  playbackRate: 1,
                  iterations: 1 / 0,
                  probability: 1,
                  mute: !1,
                  humanize: !1
                });
              }
              start(t) {
                return this._event.start(t),
                this;
              }
              stop(t) {
                return this._event.stop(t),
                this;
              }
              cancel(t) {
                return this._event.cancel(t),
                this;
              }
              _tick(t) {
                this.callback(t);
              }
              get state() {
                return this._event.state;
              }
              get progress() {
                return this._event.progress;
              }
              get interval() {
                return this._event.loopEnd;
              }
              set interval(t) {
                this._event.loopEnd = t;
              }
              get playbackRate() {
                return this._event.playbackRate;
              }
              set playbackRate(t) {
                this._event.playbackRate = t;
              }
              get humanize() {
                return this._event.humanize;
              }
              set humanize(t) {
                this._event.humanize = t;
              }
              get probability() {
                return this._event.probability;
              }
              set probability(t) {
                this._event.probability = t;
              }
              get mute() {
                return this._event.mute;
              }
              set mute(t) {
                this._event.mute = t;
              }
              get iterations() {
                return !0 === this._event.loop ? 1 / 0 : this._event.loop;
              }
              set iterations(t) {
                this._event.loop = t === 1 / 0 || t;
              }
              dispose() {
                return super.dispose(),
                this._event.dispose(),
                this;
              }
            }
            class Hr extends Yr {
              constructor() {
                super (ui(Hr.getDefaults(), arguments, [
                  'callback',
                  'events'
                ])),
                this.name = 'Part',
                this._state = new so('stopped'),
                this._events = new Set();
                const t = ui(Hr.getDefaults(), arguments, [
                  'callback',
                  'events'
                ]);
                this._state.increasing = !0,
                t.events.forEach(t=>{
                  Ln(t) ? this.add(t[0], t[1]) : this.add(t);
                });
              }
              static getDefaults() {
                return Object.assign(Yr.getDefaults(), {
                  events: [
                  ]
                });
              }
              start(t, e) {
                const s = this.toTicks(t);
                if ('started' !== this._state.getValueAtTime(s)) {
                  e = pi(e, this._loop ? this._loopStart : 0),
                  e = this._loop ? pi(e, this._loopStart) : pi(e, 0);
                  const t = this.toTicks(e);
                  this._state.add({
                    id: - 1,
                    offset: t,
                    state: 'started',
                    time: s
                  }),
                  this._forEach(e=>{
                    this._startNote(e, s, t);
                  });
                }
                return this;
              }
              _startNote(t, e, s) {
                e -= s,
                this._loop ? t.startOffset >= this._loopStart && t.startOffset < this._loopEnd ? (t.startOffset < s && (e += this._getLoopDuration()), t.start(new So(this.context, e))) : t.startOffset < this._loopStart && t.startOffset >= s && (t.loop = !1, t.start(new So(this.context, e))) : t.startOffset >= s && t.start(new So(this.context, e));
              }
              get startOffset() {
                return this._startOffset;
              }
              set startOffset(t) {
                this._startOffset = t,
                this._forEach(t=>{
                  t.startOffset += this._startOffset;
                });
              }
              stop(t) {
                const e = this.toTicks(t);
                return this._state.cancel(e),
                this._state.setStateAtTime('stopped', e),
                this._forEach(e=>{
                  e.stop(t);
                }),
                this;
              }
              at(t, e) {
                const s = new Ki(this.context, t).toTicks(),
                n = new So(this.context, 1).toSeconds(),
                i = this._events.values();
                let o = i.next();
                for (; !o.done; ) {
                  const t = o.value;
                  if (Math.abs(s - t.startOffset) < n) return In(e) && (t.value = e),
                  t;
                  o = i.next();
                }
                return In(e) ? (this.add(t, e), this.at(t)) : null;
              }
              add(t, e) {
                t instanceof Object && Reflect.has(t, 'time') && (t = (e = t).time);
                const s = this.toTicks(t);
                let n;
                return e instanceof Yr ? (n = e, n.callback = this._tick.bind(this)) : n = new Yr({
                  callback: this._tick.bind(this),
                  context: this.context,
                  value: e
                }),
                n.startOffset = s,
                n.set({
                  humanize: this.humanize,
                  loop: this.loop,
                  loopEnd: this.loopEnd,
                  loopStart: this.loopStart,
                  playbackRate: this.playbackRate,
                  probability: this.probability
                }),
                this._events.add(n),
                this._restartEvent(n),
                this;
              }
              _restartEvent(t) {
                this._state.forEach(e=>{
                  'started' === e.state ? this._startNote(t, e.time, e.offset) : t.stop(new So(this.context, e.time));
                });
              }
              remove(t, e) {
                return Pn(t) && t.hasOwnProperty('time') && (t = (e = t).time),
                t = this.toTicks(t),
                this._events.forEach(s=>{
                  s.startOffset === t && (Fn(e) || In(e) && s.value === e) && (this._events.delete(s), s.dispose());
                }),
                this;
              }
              clear() {
                return this._forEach(t=>t.dispose()),
                this._events.clear(),
                this;
              }
              cancel(t) {
                return this._forEach(e=>e.cancel(t)),
                this._state.cancel(this.toTicks(t)),
                this;
              }
              _forEach(t) {
                return this._events && this._events.forEach(e=>{
                  e instanceof Hr ? e._forEach(t) : t(e);
                }),
                this;
              }
              _setAll(t, e) {
                this._forEach(s=>{
                  s[t] = e;
                });
              }
              _tick(t, e) {
                this.mute || this.callback(t, e);
              }
              _testLoopBoundries(t) {
                this._loop && (t.startOffset < this._loopStart || t.startOffset >= this._loopEnd) ? t.cancel(0) : 'stopped' === t.state && this._restartEvent(t);
              }
              get probability() {
                return this._probability;
              }
              set probability(t) {
                this._probability = t,
                this._setAll('probability', t);
              }
              get humanize() {
                return this._humanize;
              }
              set humanize(t) {
                this._humanize = t,
                this._setAll('humanize', t);
              }
              get loop() {
                return this._loop;
              }
              set loop(t) {
                this._loop = t,
                this._forEach(e=>{
                  e.loopStart = this.loopStart,
                  e.loopEnd = this.loopEnd,
                  e.loop = t,
                  this._testLoopBoundries(e);
                });
              }
              get loopEnd() {
                return new So(this.context, this._loopEnd).toSeconds();
              }
              set loopEnd(t) {
                this._loopEnd = this.toTicks(t),
                this._loop && this._forEach(e=>{
                  e.loopEnd = t,
                  this._testLoopBoundries(e);
                });
              }
              get loopStart() {
                return new So(this.context, this._loopStart).toSeconds();
              }
              set loopStart(t) {
                this._loopStart = this.toTicks(t),
                this._loop && this._forEach(t=>{
                  t.loopStart = this.loopStart,
                  this._testLoopBoundries(t);
                });
              }
              get playbackRate() {
                return this._playbackRate;
              }
              set playbackRate(t) {
                this._playbackRate = t,
                this._setAll('playbackRate', t);
              }
              get length() {
                return this._events.size;
              }
              dispose() {
                return super.dispose(),
                this.clear(),
                this;
              }
            }
            function * Jr(t) {
              let e = 0;
              for (; e < t; ) e = xi(e, 0, t - 1),
              yield e,
              e++;
            }
            function * Kr(t) {
              let e = t - 1;
              for (; e >= 0; ) e = xi(e, 0, t - 1),
              yield e,
              e--;
            }
            function * ta(t, e) {
              for (; ; ) yield * e(t);
            }
            function * ea(t, e) {
              let s = e ? 0 : t - 1;
              for (; ; ) s = xi(s, 0, t - 1),
              yield s,
              e ? (s++, s >= t - 1 && (e = !1)) : (s--, s <= 0 && (e = !0));
            }
            function * sa(t) {
              let e = 0,
              s = 0;
              for (; e < t; ) e = xi(e, 0, t - 1),
              yield e,
              s++,
              e += s % 2 ? 2 : - 1;
            }
            function * na(t) {
              let e = t - 1,
              s = 0;
              for (; e >= 0; ) e = xi(e, 0, t - 1),
              yield e,
              s++,
              e += s % 2 ? - 2 : 1;
            }
            function * ia(t) {
              const e = [
              ];
              for (let s = 0; s < t; s++) e.push(s);
              for (; e.length > 0; ) {
                const s = xi(e.splice(Math.floor(e.length * Math.random()), 1) [0], 0, t - 1);
                yield s;
              }
            }
            function * oa(t, e = 'up', s = 0) {
              switch (Bn(t >= 1, 'The number of values must be at least one'), e) {
                case 'up':
                  yield * ta(t, Jr);
                case 'down':
                  yield * ta(t, Kr);
                case 'upDown':
                  yield * ea(t, !0);
                case 'downUp':
                  yield * ea(t, !1);
                case 'alternateUp':
                  yield * ta(t, sa);
                case 'alternateDown':
                  yield * ta(t, na);
                case 'random':
                  yield * function * (t) {
                    for (; ; ) {
                      const e = Math.floor(Math.random() * t);
                      yield e;
                    }
                  }(t);
                case 'randomOnce':
                  yield * ta(t, ia);
                case 'randomWalk':
                  yield * function * (t) {
                    let e = Math.floor(Math.random() * t);
                    for (; ; ) 0 === e ? e++ : e === t - 1 || Math.random() < 0.5 ? e-- : e++,
                    yield e;
                  }(t);
              }
            }
            class ra extends $r {
              constructor() {
                super (ui(ra.getDefaults(), arguments, [
                  'callback',
                  'values',
                  'pattern'
                ])),
                this.name = 'Pattern';
                const t = ui(ra.getDefaults(), arguments, [
                  'callback',
                  'values',
                  'pattern'
                ]);
                this.callback = t.callback,
                this._values = t.values,
                this._pattern = oa(t.values.length, t.pattern),
                this._type = t.pattern;
              }
              static getDefaults() {
                return Object.assign($r.getDefaults(), {
                  pattern: 'up',
                  values: [
                  ],
                  callback: Ei
                });
              }
              _tick(t) {
                const e = this._pattern.next();
                this._index = e.value,
                this._value = this._values[e.value],
                this.callback(t, this._value);
              }
              get values() {
                return this._values;
              }
              set values(t) {
                this._values = t,
                this.pattern = this._type;
              }
              get value() {
                return this._value;
              }
              get index() {
                return this._index;
              }
              get pattern() {
                return this._type;
              }
              set pattern(t) {
                this._type = t,
                this._pattern = oa(this._values.length, this._type);
              }
            }
            class aa extends Yr {
              constructor() {
                super (ui(aa.getDefaults(), arguments, [
                  'callback',
                  'events',
                  'subdivision'
                ])),
                this.name = 'Sequence',
                this._part = new Hr({
                  callback: this._seqCallback.bind(this),
                  context: this.context
                }),
                this._events = [
                ],
                this._eventsArray = [
                ];
                const t = ui(aa.getDefaults(), arguments, [
                  'callback',
                  'events',
                  'subdivision'
                ]);
                this._subdivision = this.toTicks(t.subdivision),
                this.events = t.events,
                this.loop = t.loop,
                this.loopStart = t.loopStart,
                this.loopEnd = t.loopEnd,
                this.playbackRate = t.playbackRate,
                this.probability = t.probability,
                this.humanize = t.humanize,
                this.mute = t.mute,
                this.playbackRate = t.playbackRate;
              }
              static getDefaults() {
                return Object.assign(di(Yr.getDefaults(), [
                  'value'
                ]), {
                  events: [
                  ],
                  loop: !0,
                  loopEnd: 0,
                  loopStart: 0,
                  subdivision: '8n'
                });
              }
              _seqCallback(t, e) {
                null === e || this.mute || this.callback(t, e);
              }
              get events() {
                return this._events;
              }
              set events(t) {
                this.clear(),
                this._eventsArray = t,
                this._events = this._createSequence(this._eventsArray),
                this._eventsUpdated();
              }
              start(t, e) {
                return this._part.start(t, e ? this._indexTime(e) : e),
                this;
              }
              stop(t) {
                return this._part.stop(t),
                this;
              }
              get subdivision() {
                return new So(this.context, this._subdivision).toSeconds();
              }
              _createSequence(t) {
                return new Proxy(t, {
                  get: (t, e) =>t[e],
                  set: (t, e, s) =>(zn(e) && isFinite(parseInt(e, 10)) && Ln(s) ? t[e] = this._createSequence(s) : t[e] = s, this._eventsUpdated(), !0)
                });
              }
              _eventsUpdated() {
                this._part.clear(),
                this._rescheduleSequence(this._eventsArray, this._subdivision, this.startOffset),
                this.loopEnd = this.loopEnd;
              }
              _rescheduleSequence(t, e, s) {
                t.forEach((t, n) =>{
                  const i = n * e + s;
                  if (Ln(t)) this._rescheduleSequence(t, e / t.length, i);
                   else {
                    const e = new So(this.context, i, 'i').toSeconds();
                    this._part.add(e, t);
                  }
                });
              }
              _indexTime(t) {
                return new So(this.context, t * this._subdivision + this.startOffset).toSeconds();
              }
              clear() {
                return this._part.clear(),
                this;
              }
              dispose() {
                return super.dispose(),
                this._part.dispose(),
                this;
              }
              get loop() {
                return this._part.loop;
              }
              set loop(t) {
                this._part.loop = t;
              }
              get loopStart() {
                return this._loopStart;
              }
              set loopStart(t) {
                this._loopStart = t,
                this._part.loopStart = this._indexTime(t);
              }
              get loopEnd() {
                return this._loopEnd;
              }
              set loopEnd(t) {
                this._loopEnd = t,
                this._part.loopEnd = 0 === t ? this._indexTime(this._eventsArray.length) : this._indexTime(t);
              }
              get startOffset() {
                return this._part.startOffset;
              }
              set startOffset(t) {
                this._part.startOffset = t;
              }
              get playbackRate() {
                return this._part.playbackRate;
              }
              set playbackRate(t) {
                this._part.playbackRate = t;
              }
              get probability() {
                return this._part.probability;
              }
              set probability(t) {
                this._part.probability = t;
              }
              get progress() {
                return this._part.progress;
              }
              get humanize() {
                return this._part.humanize;
              }
              set humanize(t) {
                this._part.humanize = t;
              }
              get length() {
                return this._part.length;
              }
            }
            class ca extends io {
              constructor() {
                super (Object.assign(ui(ca.getDefaults(), arguments, [
                  'fade'
                ]))),
                this.name = 'CrossFade',
                this._panner = this.context.createStereoPanner(),
                this._split = this.context.createChannelSplitter(2),
                this._g2a = new dr({
                  context: this.context
                }),
                this.a = new ho({
                  context: this.context,
                  gain: 0
                }),
                this.b = new ho({
                  context: this.context,
                  gain: 0
                }),
                this.output = new ho({
                  context: this.context
                }),
                this._internalChannels = [
                  this.a,
                  this.b
                ];
                const t = ui(ca.getDefaults(), arguments, [
                  'fade'
                ]);
                this.fade = new po({
                  context: this.context,
                  units: 'normalRange',
                  value: t.fade
                }),
                Oi(this, 'fade'),
                this.context.getConstant(1).connect(this._panner),
                this._panner.connect(this._split),
                this._panner.channelCount = 1,
                this._panner.channelCountMode = 'explicit',
                ro(this._split, this.a.gain, 0),
                ro(this._split, this.b.gain, 1),
                this.fade.chain(this._g2a, this._panner.pan),
                this.a.connect(this.output),
                this.b.connect(this.output);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  fade: 0.5
                });
              }
              dispose() {
                return super.dispose(),
                this.a.dispose(),
                this.b.dispose(),
                this.output.dispose(),
                this.fade.dispose(),
                this._g2a.dispose(),
                this._panner.disconnect(),
                this._split.disconnect(),
                this;
              }
            }
            class ha extends io {
              constructor(t) {
                super (t),
                this.name = 'Effect',
                this._dryWet = new ca({
                  context: this.context
                }),
                this.wet = this._dryWet.fade,
                this.effectSend = new ho({
                  context: this.context
                }),
                this.effectReturn = new ho({
                  context: this.context
                }),
                this.input = new ho({
                  context: this.context
                }),
                this.output = this._dryWet,
                this.input.fan(this._dryWet.a, this.effectSend),
                this.effectReturn.connect(this._dryWet.b),
                this.wet.setValueAtTime(t.wet, 0),
                this._internalChannels = [
                  this.effectReturn,
                  this.effectSend
                ],
                Oi(this, 'wet');
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  wet: 1
                });
              }
              connectEffect(t) {
                return this._internalChannels.push(t),
                this.effectSend.chain(t, this.effectReturn),
                this;
              }
              dispose() {
                return super.dispose(),
                this._dryWet.dispose(),
                this.effectSend.dispose(),
                this.effectReturn.dispose(),
                this.wet.dispose(),
                this;
              }
            }
            class la extends ha {
              constructor(t) {
                super (t),
                this.name = 'LFOEffect',
                this._lfo = new rr({
                  context: this.context,
                  frequency: t.frequency,
                  amplitude: t.depth
                }),
                this.depth = this._lfo.amplitude,
                this.frequency = this._lfo.frequency,
                this.type = t.type,
                Oi(this, [
                  'frequency',
                  'depth'
                ]);
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  frequency: 1,
                  type: 'sine',
                  depth: 1
                });
              }
              start(t) {
                return this._lfo.start(t),
                this;
              }
              stop(t) {
                return this._lfo.stop(t),
                this;
              }
              sync() {
                return this._lfo.sync(),
                this;
              }
              unsync() {
                return this._lfo.unsync(),
                this;
              }
              get type() {
                return this._lfo.type;
              }
              set type(t) {
                this._lfo.type = t;
              }
              dispose() {
                return super.dispose(),
                this._lfo.dispose(),
                this.frequency.dispose(),
                this.depth.dispose(),
                this;
              }
            }
            class ua extends la {
              constructor() {
                super (ui(ua.getDefaults(), arguments, [
                  'frequency',
                  'baseFrequency',
                  'octaves'
                ])),
                this.name = 'AutoFilter';
                const t = ui(ua.getDefaults(), arguments, [
                  'frequency',
                  'baseFrequency',
                  'octaves'
                ]);
                this.filter = new Or(Object.assign(t.filter, {
                  context: this.context
                })),
                this.connectEffect(this.filter),
                this._lfo.connect(this.filter.frequency),
                this.octaves = t.octaves,
                this.baseFrequency = t.baseFrequency;
              }
              static getDefaults() {
                return Object.assign(la.getDefaults(), {
                  baseFrequency: 200,
                  octaves: 2.6,
                  filter: {
                    type: 'lowpass',
                    rolloff: - 12,
                    Q: 1
                  }
                });
              }
              get baseFrequency() {
                return this._lfo.min;
              }
              set baseFrequency(t) {
                this._lfo.min = this.toFrequency(t),
                this.octaves = this._octaves;
              }
              get octaves() {
                return this._octaves;
              }
              set octaves(t) {
                this._octaves = t,
                this._lfo.max = this._lfo.min * Math.pow(2, t);
              }
              dispose() {
                return super.dispose(),
                this.filter.dispose(),
                this;
              }
            }
            class pa extends io {
              constructor() {
                super (Object.assign(ui(pa.getDefaults(), arguments, [
                  'pan'
                ]))),
                this.name = 'Panner',
                this._panner = this.context.createStereoPanner(),
                this.input = this._panner,
                this.output = this._panner;
                const t = ui(pa.getDefaults(), arguments, [
                  'pan'
                ]);
                this.pan = new no({
                  context: this.context,
                  param: this._panner.pan,
                  value: t.pan,
                  minValue: - 1,
                  maxValue: 1
                }),
                this._panner.channelCount = t.channelCount,
                this._panner.channelCountMode = 'explicit',
                Oi(this, 'pan');
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  pan: 0,
                  channelCount: 1
                });
              }
              dispose() {
                return super.dispose(),
                this._panner.disconnect(),
                this.pan.dispose(),
                this;
              }
            }
            class da extends la {
              constructor() {
                super (ui(da.getDefaults(), arguments, [
                  'frequency'
                ])),
                this.name = 'AutoPanner';
                const t = ui(da.getDefaults(), arguments, [
                  'frequency'
                ]);
                this._panner = new pa({
                  context: this.context,
                  channelCount: t.channelCount
                }),
                this.connectEffect(this._panner),
                this._lfo.connect(this._panner.pan),
                this._lfo.min = - 1,
                this._lfo.max = 1;
              }
              static getDefaults() {
                return Object.assign(la.getDefaults(), {
                  channelCount: 1
                });
              }
              dispose() {
                return super.dispose(),
                this._panner.dispose(),
                this;
              }
            }
            class fa extends io {
              constructor() {
                super (ui(fa.getDefaults(), arguments, [
                  'smoothing'
                ])),
                this.name = 'Follower';
                const t = ui(fa.getDefaults(), arguments, [
                  'smoothing'
                ]);
                this._abs = this.input = new pr({
                  context: this.context
                }),
                this._lowpass = this.output = new Ur({
                  context: this.context,
                  frequency: 1 / this.toSeconds(t.smoothing),
                  type: 'lowpass'
                }),
                this._abs.connect(this._lowpass),
                this._smoothing = t.smoothing;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  smoothing: 0.05
                });
              }
              get smoothing() {
                return this._smoothing;
              }
              set smoothing(t) {
                this._smoothing = t,
                this._lowpass.frequency = 1 / this.toSeconds(this.smoothing);
              }
              dispose() {
                return super.dispose(),
                this._abs.dispose(),
                this._lowpass.dispose(),
                this;
              }
            }
            class _a extends ha {
              constructor() {
                super (ui(_a.getDefaults(), arguments, [
                  'baseFrequency',
                  'octaves',
                  'sensitivity'
                ])),
                this.name = 'AutoWah';
                const t = ui(_a.getDefaults(), arguments, [
                  'baseFrequency',
                  'octaves',
                  'sensitivity'
                ]);
                this._follower = new fa({
                  context: this.context,
                  smoothing: t.follower
                }),
                this._sweepRange = new vr({
                  context: this.context,
                  min: 0,
                  max: 1,
                  exponent: 0.5
                }),
                this._baseFrequency = this.toFrequency(t.baseFrequency),
                this._octaves = t.octaves,
                this._inputBoost = new ho({
                  context: this.context
                }),
                this._bandpass = new Or({
                  context: this.context,
                  rolloff: - 48,
                  frequency: 0,
                  Q: t.Q
                }),
                this._peaking = new Or({
                  context: this.context,
                  type: 'peaking'
                }),
                this._peaking.gain.value = t.gain,
                this.gain = this._peaking.gain,
                this.Q = this._bandpass.Q,
                this.effectSend.chain(this._inputBoost, this._follower, this._sweepRange),
                this._sweepRange.connect(this._bandpass.frequency),
                this._sweepRange.connect(this._peaking.frequency),
                this.effectSend.chain(this._bandpass, this._peaking, this.effectReturn),
                this._setSweepRange(),
                this.sensitivity = t.sensitivity,
                Oi(this, [
                  'gain',
                  'Q'
                ]);
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  baseFrequency: 100,
                  octaves: 6,
                  sensitivity: 0,
                  Q: 2,
                  gain: 2,
                  follower: 0.2
                });
              }
              get octaves() {
                return this._octaves;
              }
              set octaves(t) {
                this._octaves = t,
                this._setSweepRange();
              }
              get follower() {
                return this._follower.smoothing;
              }
              set follower(t) {
                this._follower.smoothing = t;
              }
              get baseFrequency() {
                return this._baseFrequency;
              }
              set baseFrequency(t) {
                this._baseFrequency = this.toFrequency(t),
                this._setSweepRange();
              }
              get sensitivity() {
                return Li(1 / this._inputBoost.gain.value);
              }
              set sensitivity(t) {
                this._inputBoost.gain.value = 1 / ji(t);
              }
              _setSweepRange() {
                this._sweepRange.min = this._baseFrequency,
                this._sweepRange.max = Math.min(this._baseFrequency * Math.pow(2, this._octaves), this.context.sampleRate / 2);
              }
              dispose() {
                return super.dispose(),
                this._follower.dispose(),
                this._sweepRange.dispose(),
                this._bandpass.dispose(),
                this._peaking.dispose(),
                this._inputBoost.dispose(),
                this;
              }
            }
            const ma = 'bit-crusher';
            Lr(ma, '\n\tclass BitCrusherWorklet extends SingleIOProcessor {\n\n\t\tstatic get parameterDescriptors() {\n\t\t\treturn [{\n\t\t\t\tname: "bits",\n\t\t\t\tdefaultValue: 12,\n\t\t\t\tminValue: 1,\n\t\t\t\tmaxValue: 16,\n\t\t\t\tautomationRate: \'k-rate\'\n\t\t\t}];\n\t\t}\n\n\t\tgenerate(input, _channel, parameters) {\n\t\t\tconst step = Math.pow(0.5, parameters.bits - 1);\n\t\t\tconst val = step * Math.floor(input / step + 0.5);\n\t\t\treturn val;\n\t\t}\n\t}\n');
            class ga extends ha {
              constructor() {
                super (ui(ga.getDefaults(), arguments, [
                  'bits'
                ])),
                this.name = 'BitCrusher';
                const t = ui(ga.getDefaults(), arguments, [
                  'bits'
                ]);
                this._bitCrusherWorklet = new va({
                  context: this.context,
                  bits: t.bits
                }),
                this.connectEffect(this._bitCrusherWorklet),
                this.bits = this._bitCrusherWorklet.bits;
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  bits: 4
                });
              }
              dispose() {
                return super.dispose(),
                this._bitCrusherWorklet.dispose(),
                this;
              }
            }
            class va extends zr {
              constructor() {
                super (ui(va.getDefaults(), arguments)),
                this.name = 'BitCrusherWorklet';
                const t = ui(va.getDefaults(), arguments);
                this.input = new ho({
                  context: this.context
                }),
                this.output = new ho({
                  context: this.context
                }),
                this.bits = new no({
                  context: this.context,
                  value: t.bits,
                  units: 'positive',
                  minValue: 1,
                  maxValue: 16,
                  param: this._dummyParam,
                  swappable: !0
                });
              }
              static getDefaults() {
                return Object.assign(zr.getDefaults(), {
                  bits: 12
                });
              }
              _audioWorkletName() {
                return ma;
              }
              onReady(t) {
                oo(this.input, t, this.output);
                const e = t.parameters.get('bits');
                this.bits.setParam(e);
              }
              dispose() {
                return super.dispose(),
                this.input.dispose(),
                this.output.dispose(),
                this.bits.dispose(),
                this;
              }
            }
            class ya extends ha {
              constructor() {
                super (ui(ya.getDefaults(), arguments, [
                  'order'
                ])),
                this.name = 'Chebyshev';
                const t = ui(ya.getDefaults(), arguments, [
                  'order'
                ]);
                this._shaper = new qo({
                  context: this.context,
                  length: 4096
                }),
                this._order = t.order,
                this.connectEffect(this._shaper),
                this.order = t.order,
                this.oversample = t.oversample;
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  order: 1,
                  oversample: 'none'
                });
              }
              _getCoefficient(t, e, s) {
                return s.has(e) || (0 === e ? s.set(e, 0) : 1 === e ? s.set(e, t) : s.set(e, 2 * t * this._getCoefficient(t, e - 1, s) - this._getCoefficient(t, e - 2, s))),
                s.get(e);
              }
              get order() {
                return this._order;
              }
              set order(t) {
                Bn(Number.isInteger(t), '\'order\' must be an integer'),
                this._order = t,
                this._shaper.setMap(e=>this._getCoefficient(e, t, new Map()));
              }
              get oversample() {
                return this._shaper.oversample;
              }
              set oversample(t) {
                this._shaper.oversample = t;
              }
              dispose() {
                return super.dispose(),
                this._shaper.dispose(),
                this;
              }
            }
            class xa extends io {
              constructor() {
                super (ui(xa.getDefaults(), arguments, [
                  'channels'
                ])),
                this.name = 'Split';
                const t = ui(xa.getDefaults(), arguments, [
                  'channels'
                ]);
                this._splitter = this.input = this.output = this.context.createChannelSplitter(t.channels),
                this._internalChannels = [
                  this._splitter
                ];
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  channels: 2
                });
              }
              dispose() {
                return super.dispose(),
                this._splitter.disconnect(),
                this;
              }
            }
            class wa extends io {
              constructor() {
                super (ui(wa.getDefaults(), arguments, [
                  'channels'
                ])),
                this.name = 'Merge';
                const t = ui(wa.getDefaults(), arguments, [
                  'channels'
                ]);
                this._merger = this.output = this.input = this.context.createChannelMerger(t.channels);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  channels: 2
                });
              }
              dispose() {
                return super.dispose(),
                this._merger.disconnect(),
                this;
              }
            }
            class ba extends io {
              constructor(t) {
                super (t),
                this.name = 'StereoEffect',
                this.input = new ho({
                  context: this.context
                }),
                this.input.channelCount = 2,
                this.input.channelCountMode = 'explicit',
                this._dryWet = this.output = new ca({
                  context: this.context,
                  fade: t.wet
                }),
                this.wet = this._dryWet.fade,
                this._split = new xa({
                  context: this.context,
                  channels: 2
                }),
                this._merge = new wa({
                  context: this.context,
                  channels: 2
                }),
                this.input.connect(this._split),
                this.input.connect(this._dryWet.a),
                this._merge.connect(this._dryWet.b),
                Oi(this, [
                  'wet'
                ]);
              }
              connectEffectLeft(...t) {
                this._split.connect(t[0], 0, 0),
                oo(...t),
                ro(t[t.length - 1], this._merge, 0, 0);
              }
              connectEffectRight(...t) {
                this._split.connect(t[0], 1, 0),
                oo(...t),
                ro(t[t.length - 1], this._merge, 0, 1);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  wet: 1
                });
              }
              dispose() {
                return super.dispose(),
                this._dryWet.dispose(),
                this._split.dispose(),
                this._merge.dispose(),
                this;
              }
            }
            class Ta extends ba {
              constructor(t) {
                super (t),
                this.feedback = new po({
                  context: this.context,
                  value: t.feedback,
                  units: 'normalRange'
                }),
                this._feedbackL = new ho({
                  context: this.context
                }),
                this._feedbackR = new ho({
                  context: this.context
                }),
                this._feedbackSplit = new xa({
                  context: this.context,
                  channels: 2
                }),
                this._feedbackMerge = new wa({
                  context: this.context,
                  channels: 2
                }),
                this._merge.connect(this._feedbackSplit),
                this._feedbackMerge.connect(this._split),
                this._feedbackSplit.connect(this._feedbackL, 0, 0),
                this._feedbackL.connect(this._feedbackMerge, 0, 0),
                this._feedbackSplit.connect(this._feedbackR, 1, 0),
                this._feedbackR.connect(this._feedbackMerge, 0, 1),
                this.feedback.fan(this._feedbackL.gain, this._feedbackR.gain),
                Oi(this, [
                  'feedback'
                ]);
              }
              static getDefaults() {
                return Object.assign(ba.getDefaults(), {
                  feedback: 0.5
                });
              }
              dispose() {
                return super.dispose(),
                this.feedback.dispose(),
                this._feedbackL.dispose(),
                this._feedbackR.dispose(),
                this._feedbackSplit.dispose(),
                this._feedbackMerge.dispose(),
                this;
              }
            }
            class Sa extends Ta {
              constructor() {
                super (ui(Sa.getDefaults(), arguments, [
                  'frequency',
                  'delayTime',
                  'depth'
                ])),
                this.name = 'Chorus';
                const t = ui(Sa.getDefaults(), arguments, [
                  'frequency',
                  'delayTime',
                  'depth'
                ]);
                this._depth = t.depth,
                this._delayTime = t.delayTime / 1000,
                this._lfoL = new rr({
                  context: this.context,
                  frequency: t.frequency,
                  min: 0,
                  max: 1
                }),
                this._lfoR = new rr({
                  context: this.context,
                  frequency: t.frequency,
                  min: 0,
                  max: 1,
                  phase: 180
                }),
                this._delayNodeL = new yo({
                  context: this.context
                }),
                this._delayNodeR = new yo({
                  context: this.context
                }),
                this.frequency = this._lfoL.frequency,
                Oi(this, [
                  'frequency'
                ]),
                this._lfoL.frequency.connect(this._lfoR.frequency),
                this.connectEffectLeft(this._delayNodeL),
                this.connectEffectRight(this._delayNodeR),
                this._lfoL.connect(this._delayNodeL.delayTime),
                this._lfoR.connect(this._delayNodeR.delayTime),
                this.depth = this._depth,
                this.type = t.type,
                this.spread = t.spread;
              }
              static getDefaults() {
                return Object.assign(Ta.getDefaults(), {
                  frequency: 1.5,
                  delayTime: 3.5,
                  depth: 0.7,
                  type: 'sine',
                  spread: 180,
                  feedback: 0,
                  wet: 0.5
                });
              }
              get depth() {
                return this._depth;
              }
              set depth(t) {
                this._depth = t;
                const e = this._delayTime * t;
                this._lfoL.min = Math.max(this._delayTime - e, 0),
                this._lfoL.max = this._delayTime + e,
                this._lfoR.min = Math.max(this._delayTime - e, 0),
                this._lfoR.max = this._delayTime + e;
              }
              get delayTime() {
                return 1000 * this._delayTime;
              }
              set delayTime(t) {
                this._delayTime = t / 1000,
                this.depth = this._depth;
              }
              get type() {
                return this._lfoL.type;
              }
              set type(t) {
                this._lfoL.type = t,
                this._lfoR.type = t;
              }
              get spread() {
                return this._lfoR.phase - this._lfoL.phase;
              }
              set spread(t) {
                this._lfoL.phase = 90 - t / 2,
                this._lfoR.phase = t / 2 + 90;
              }
              start(t) {
                return this._lfoL.start(t),
                this._lfoR.start(t),
                this;
              }
              stop(t) {
                return this._lfoL.stop(t),
                this._lfoR.stop(t),
                this;
              }
              sync() {
                return this._lfoL.sync(),
                this._lfoR.sync(),
                this;
              }
              unsync() {
                return this._lfoL.unsync(),
                this._lfoR.unsync(),
                this;
              }
              dispose() {
                return super.dispose(),
                this._lfoL.dispose(),
                this._lfoR.dispose(),
                this._delayNodeL.dispose(),
                this._delayNodeR.dispose(),
                this.frequency.dispose(),
                this;
              }
            }
            class ka extends ha {
              constructor() {
                super (ui(ka.getDefaults(), arguments, [
                  'distortion'
                ])),
                this.name = 'Distortion';
                const t = ui(ka.getDefaults(), arguments, [
                  'distortion'
                ]);
                this._shaper = new qo({
                  context: this.context,
                  length: 4096
                }),
                this._distortion = t.distortion,
                this.connectEffect(this._shaper),
                this.distortion = t.distortion,
                this.oversample = t.oversample;
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  distortion: 0.4,
                  oversample: 'none'
                });
              }
              get distortion() {
                return this._distortion;
              }
              set distortion(t) {
                this._distortion = t;
                const e = 100 * t,
                s = Math.PI / 180;
                this._shaper.setMap(t=>Math.abs(t) < 0.001 ? 0 : (3 + e) * t * 20 * s / (Math.PI + e * Math.abs(t)));
              }
              get oversample() {
                return this._shaper.oversample;
              }
              set oversample(t) {
                this._shaper.oversample = t;
              }
              dispose() {
                return super.dispose(),
                this._shaper.dispose(),
                this;
              }
            }
            class Aa extends ha {
              constructor(t) {
                super (t),
                this.name = 'FeedbackEffect',
                this._feedbackGain = new ho({
                  context: this.context,
                  gain: t.feedback,
                  units: 'normalRange'
                }),
                this.feedback = this._feedbackGain.gain,
                Oi(this, 'feedback'),
                this.effectReturn.chain(this._feedbackGain, this.effectSend);
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  feedback: 0.125
                });
              }
              dispose() {
                return super.dispose(),
                this._feedbackGain.dispose(),
                this.feedback.dispose(),
                this;
              }
            }
            class Ca extends Aa {
              constructor() {
                super (ui(Ca.getDefaults(), arguments, [
                  'delayTime',
                  'feedback'
                ])),
                this.name = 'FeedbackDelay';
                const t = ui(Ca.getDefaults(), arguments, [
                  'delayTime',
                  'feedback'
                ]);
                this._delayNode = new yo({
                  context: this.context,
                  delayTime: t.delayTime,
                  maxDelay: t.maxDelay
                }),
                this.delayTime = this._delayNode.delayTime,
                this.connectEffect(this._delayNode),
                Oi(this, 'delayTime');
              }
              static getDefaults() {
                return Object.assign(Aa.getDefaults(), {
                  delayTime: 0.25,
                  maxDelay: 1
                });
              }
              dispose() {
                return super.dispose(),
                this._delayNode.dispose(),
                this.delayTime.dispose(),
                this;
              }
            }
            class Da extends io {
              constructor(t) {
                super (t),
                this.name = 'PhaseShiftAllpass',
                this.input = new ho({
                  context: this.context
                }),
                this.output = new ho({
                  context: this.context
                }),
                this.offset90 = new ho({
                  context: this.context
                }),
                this._bank0 = this._createAllPassFilterBank([0.6923878,
                0.9360654322959,
                0.988229522686,
                0.9987488452737]),
                this._bank1 = this._createAllPassFilterBank([0.4021921162426,
                0.856171088242,
                0.9722909545651,
                0.9952884791278]),
                this._oneSampleDelay = this.context.createIIRFilter([0,
                1], [
                  1,
                  0
                ]),
                oo(this.input, ...this._bank0, this._oneSampleDelay, this.output),
                oo(this.input, ...this._bank1, this.offset90);
              }
              _createAllPassFilterBank(t) {
                return t.map(t=>{
                  const e = [
                    [t * t,
                    0,
                    - 1],
                    [
                      1,
                      0,
                      - t * t
                    ]
                  ];
                  return this.context.createIIRFilter(e[0], e[1]);
                });
              }
              dispose() {
                return super.dispose(),
                this.input.dispose(),
                this.output.dispose(),
                this.offset90.dispose(),
                this._bank0.forEach(t=>t.disconnect()),
                this._bank1.forEach(t=>t.disconnect()),
                this._oneSampleDelay.disconnect(),
                this;
              }
            }
            class Oa extends ha {
              constructor() {
                super (ui(Oa.getDefaults(), arguments, [
                  'frequency'
                ])),
                this.name = 'FrequencyShifter';
                const t = ui(Oa.getDefaults(), arguments, [
                  'frequency'
                ]);
                this.frequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.frequency,
                  minValue: - this.context.sampleRate / 2,
                  maxValue: this.context.sampleRate / 2
                }),
                this._sine = new Qo({
                  context: this.context,
                  type: 'sine'
                }),
                this._cosine = new Zo({
                  context: this.context,
                  phase: - 90,
                  type: 'sine'
                }),
                this._sineMultiply = new Yo({
                  context: this.context
                }),
                this._cosineMultiply = new Yo({
                  context: this.context
                }),
                this._negate = new fr({
                  context: this.context
                }),
                this._add = new nr({
                  context: this.context
                }),
                this._phaseShifter = new Da({
                  context: this.context
                }),
                this.effectSend.connect(this._phaseShifter),
                this.frequency.fan(this._sine.frequency, this._cosine.frequency),
                this._phaseShifter.offset90.connect(this._cosineMultiply),
                this._cosine.connect(this._cosineMultiply.factor),
                this._phaseShifter.connect(this._sineMultiply),
                this._sine.connect(this._sineMultiply.factor),
                this._sineMultiply.connect(this._negate),
                this._cosineMultiply.connect(this._add),
                this._negate.connect(this._add.addend),
                this._add.connect(this.effectReturn);
                const e = this.immediate();
                this._sine.start(e),
                this._cosine.start(e);
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  frequency: 0
                });
              }
              dispose() {
                return super.dispose(),
                this.frequency.dispose(),
                this._add.dispose(),
                this._cosine.dispose(),
                this._cosineMultiply.dispose(),
                this._negate.dispose(),
                this._phaseShifter.dispose(),
                this._sine.dispose(),
                this._sineMultiply.dispose(),
                this;
              }
            }
            const Ma = [
              1557 / 44100,
              1617 / 44100,
              1491 / 44100,
              1422 / 44100,
              1277 / 44100,
              1356 / 44100,
              1188 / 44100,
              1116 / 44100
            ],
            Ea = [
              225,
              556,
              441,
              341
            ];
            class Ra extends ba {
              constructor() {
                super (ui(Ra.getDefaults(), arguments, [
                  'roomSize',
                  'dampening'
                ])),
                this.name = 'Freeverb',
                this._combFilters = [
                ],
                this._allpassFiltersL = [
                ],
                this._allpassFiltersR = [
                ];
                const t = ui(Ra.getDefaults(), arguments, [
                  'roomSize',
                  'dampening'
                ]);
                this.roomSize = new po({
                  context: this.context,
                  value: t.roomSize,
                  units: 'normalRange'
                }),
                this._allpassFiltersL = Ea.map(t=>{
                  const e = this.context.createBiquadFilter();
                  return e.type = 'allpass',
                  e.frequency.value = t,
                  e;
                }),
                this._allpassFiltersR = Ea.map(t=>{
                  const e = this.context.createBiquadFilter();
                  return e.type = 'allpass',
                  e.frequency.value = t,
                  e;
                }),
                this._combFilters = Ma.map((e, s) =>{
                  const n = new Gr({
                    context: this.context,
                    dampening: t.dampening,
                    delayTime: e
                  });
                  return s < Ma.length / 2 ? this.connectEffectLeft(n, ...this._allpassFiltersL) : this.connectEffectRight(n, ...this._allpassFiltersR),
                  this.roomSize.connect(n.resonance),
                  n;
                }),
                Oi(this, [
                  'roomSize'
                ]);
              }
              static getDefaults() {
                return Object.assign(ba.getDefaults(), {
                  roomSize: 0.7,
                  dampening: 3000
                });
              }
              get dampening() {
                return this._combFilters[0].dampening;
              }
              set dampening(t) {
                this._combFilters.forEach(e=>e.dampening = t);
              }
              dispose() {
                return super.dispose(),
                this._allpassFiltersL.forEach(t=>t.disconnect()),
                this._allpassFiltersR.forEach(t=>t.disconnect()),
                this._combFilters.forEach(t=>t.dispose()),
                this.roomSize.dispose(),
                this;
              }
            }
            const qa = [
              0.06748,
              0.06404,
              0.08212,
              0.09004
            ],
            Fa = [
              0.773,
              0.802,
              0.753,
              0.733
            ],
            Ia = [
              347,
              113,
              37
            ];
            class Va extends ba {
              constructor() {
                super (ui(Va.getDefaults(), arguments, [
                  'roomSize'
                ])),
                this.name = 'JCReverb',
                this._allpassFilters = [
                ],
                this._feedbackCombFilters = [
                ];
                const t = ui(Va.getDefaults(), arguments, [
                  'roomSize'
                ]);
                this.roomSize = new po({
                  context: this.context,
                  value: t.roomSize,
                  units: 'normalRange'
                }),
                this._scaleRoomSize = new ir({
                  context: this.context,
                  min: - 0.733,
                  max: 0.197
                }),
                this._allpassFilters = Ia.map(t=>{
                  const e = this.context.createBiquadFilter();
                  return e.type = 'allpass',
                  e.frequency.value = t,
                  e;
                }),
                this._feedbackCombFilters = qa.map((t, e) =>{
                  const s = new Br({
                    context: this.context,
                    delayTime: t
                  });
                  return this._scaleRoomSize.connect(s.resonance),
                  s.resonance.value = Fa[e],
                  e < qa.length / 2 ? this.connectEffectLeft(...this._allpassFilters, s) : this.connectEffectRight(...this._allpassFilters, s),
                  s;
                }),
                this.roomSize.connect(this._scaleRoomSize),
                Oi(this, [
                  'roomSize'
                ]);
              }
              static getDefaults() {
                return Object.assign(ba.getDefaults(), {
                  roomSize: 0.5
                });
              }
              dispose() {
                return super.dispose(),
                this._allpassFilters.forEach(t=>t.disconnect()),
                this._feedbackCombFilters.forEach(t=>t.dispose()),
                this.roomSize.dispose(),
                this._scaleRoomSize.dispose(),
                this;
              }
            }
            class Na extends Ta {
              constructor(t) {
                super (t),
                this._feedbackL.disconnect(),
                this._feedbackL.connect(this._feedbackMerge, 0, 1),
                this._feedbackR.disconnect(),
                this._feedbackR.connect(this._feedbackMerge, 0, 0),
                Oi(this, [
                  'feedback'
                ]);
              }
            }
            class Pa extends Na {
              constructor() {
                super (ui(Pa.getDefaults(), arguments, [
                  'delayTime',
                  'feedback'
                ])),
                this.name = 'PingPongDelay';
                const t = ui(Pa.getDefaults(), arguments, [
                  'delayTime',
                  'feedback'
                ]);
                this._leftDelay = new yo({
                  context: this.context,
                  maxDelay: t.maxDelay
                }),
                this._rightDelay = new yo({
                  context: this.context,
                  maxDelay: t.maxDelay
                }),
                this._rightPreDelay = new yo({
                  context: this.context,
                  maxDelay: t.maxDelay
                }),
                this.delayTime = new po({
                  context: this.context,
                  units: 'time',
                  value: t.delayTime
                }),
                this.connectEffectLeft(this._leftDelay),
                this.connectEffectRight(this._rightPreDelay, this._rightDelay),
                this.delayTime.fan(this._leftDelay.delayTime, this._rightDelay.delayTime, this._rightPreDelay.delayTime),
                this._feedbackL.disconnect(),
                this._feedbackL.connect(this._rightDelay),
                Oi(this, [
                  'delayTime'
                ]);
              }
              static getDefaults() {
                return Object.assign(Na.getDefaults(), {
                  delayTime: 0.25,
                  maxDelay: 1
                });
              }
              dispose() {
                return super.dispose(),
                this._leftDelay.dispose(),
                this._rightDelay.dispose(),
                this._rightPreDelay.dispose(),
                this.delayTime.dispose(),
                this;
              }
            }
            class ja extends Aa {
              constructor() {
                super (ui(ja.getDefaults(), arguments, [
                  'pitch'
                ])),
                this.name = 'PitchShift';
                const t = ui(ja.getDefaults(), arguments, [
                  'pitch'
                ]);
                this._frequency = new po({
                  context: this.context
                }),
                this._delayA = new yo({
                  maxDelay: 1,
                  context: this.context
                }),
                this._lfoA = new rr({
                  context: this.context,
                  min: 0,
                  max: 0.1,
                  type: 'sawtooth'
                }).connect(this._delayA.delayTime),
                this._delayB = new yo({
                  maxDelay: 1,
                  context: this.context
                }),
                this._lfoB = new rr({
                  context: this.context,
                  min: 0,
                  max: 0.1,
                  type: 'sawtooth',
                  phase: 180
                }).connect(this._delayB.delayTime),
                this._crossFade = new ca({
                  context: this.context
                }),
                this._crossFadeLFO = new rr({
                  context: this.context,
                  min: 0,
                  max: 1,
                  type: 'triangle',
                  phase: 90
                }).connect(this._crossFade.fade),
                this._feedbackDelay = new yo({
                  delayTime: t.delayTime,
                  context: this.context
                }),
                this.delayTime = this._feedbackDelay.delayTime,
                Oi(this, 'delayTime'),
                this._pitch = t.pitch,
                this._windowSize = t.windowSize,
                this._delayA.connect(this._crossFade.a),
                this._delayB.connect(this._crossFade.b),
                this._frequency.fan(this._lfoA.frequency, this._lfoB.frequency, this._crossFadeLFO.frequency),
                this.effectSend.fan(this._delayA, this._delayB),
                this._crossFade.chain(this._feedbackDelay, this.effectReturn);
                const e = this.now();
                this._lfoA.start(e),
                this._lfoB.start(e),
                this._crossFadeLFO.start(e),
                this.windowSize = this._windowSize;
              }
              static getDefaults() {
                return Object.assign(Aa.getDefaults(), {
                  pitch: 0,
                  windowSize: 0.1,
                  delayTime: 0,
                  feedback: 0
                });
              }
              get pitch() {
                return this._pitch;
              }
              set pitch(t) {
                this._pitch = t;
                let e = 0;
                t < 0 ? (this._lfoA.min = 0, this._lfoA.max = this._windowSize, this._lfoB.min = 0, this._lfoB.max = this._windowSize, e = zi(t - 1) + 1) : (this._lfoA.min = this._windowSize, this._lfoA.max = 0, this._lfoB.min = this._windowSize, this._lfoB.max = 0, e = zi(t) - 1),
                this._frequency.value = e * (1.2 / this._windowSize);
              }
              get windowSize() {
                return this._windowSize;
              }
              set windowSize(t) {
                this._windowSize = this.toSeconds(t),
                this.pitch = this._pitch;
              }
              dispose() {
                return super.dispose(),
                this._frequency.dispose(),
                this._delayA.dispose(),
                this._delayB.dispose(),
                this._lfoA.dispose(),
                this._lfoB.dispose(),
                this._crossFade.dispose(),
                this._crossFadeLFO.dispose(),
                this._feedbackDelay.dispose(),
                this;
              }
            }
            class La extends ba {
              constructor() {
                super (ui(La.getDefaults(), arguments, [
                  'frequency',
                  'octaves',
                  'baseFrequency'
                ])),
                this.name = 'Phaser';
                const t = ui(La.getDefaults(), arguments, [
                  'frequency',
                  'octaves',
                  'baseFrequency'
                ]);
                this._lfoL = new rr({
                  context: this.context,
                  frequency: t.frequency,
                  min: 0,
                  max: 1
                }),
                this._lfoR = new rr({
                  context: this.context,
                  frequency: t.frequency,
                  min: 0,
                  max: 1,
                  phase: 180
                }),
                this._baseFrequency = this.toFrequency(t.baseFrequency),
                this._octaves = t.octaves,
                this.Q = new po({
                  context: this.context,
                  value: t.Q,
                  units: 'positive'
                }),
                this._filtersL = this._makeFilters(t.stages, this._lfoL),
                this._filtersR = this._makeFilters(t.stages, this._lfoR),
                this.frequency = this._lfoL.frequency,
                this.frequency.value = t.frequency,
                this.connectEffectLeft(...this._filtersL),
                this.connectEffectRight(...this._filtersR),
                this._lfoL.frequency.connect(this._lfoR.frequency),
                this.baseFrequency = t.baseFrequency,
                this.octaves = t.octaves,
                this._lfoL.start(),
                this._lfoR.start(),
                Oi(this, [
                  'frequency',
                  'Q'
                ]);
              }
              static getDefaults() {
                return Object.assign(ba.getDefaults(), {
                  frequency: 0.5,
                  octaves: 3,
                  stages: 10,
                  Q: 10,
                  baseFrequency: 350
                });
              }
              _makeFilters(t, e) {
                const s = [
                ];
                for (let n = 0; n < t; n++) {
                  const t = this.context.createBiquadFilter();
                  t.type = 'allpass',
                  this.Q.connect(t.Q),
                  e.connect(t.frequency),
                  s.push(t);
                }
                return s;
              }
              get octaves() {
                return this._octaves;
              }
              set octaves(t) {
                this._octaves = t;
                const e = this._baseFrequency * Math.pow(2, t);
                this._lfoL.max = e,
                this._lfoR.max = e;
              }
              get baseFrequency() {
                return this._baseFrequency;
              }
              set baseFrequency(t) {
                this._baseFrequency = this.toFrequency(t),
                this._lfoL.min = this._baseFrequency,
                this._lfoR.min = this._baseFrequency,
                this.octaves = this._octaves;
              }
              dispose() {
                return super.dispose(),
                this.Q.dispose(),
                this._lfoL.dispose(),
                this._lfoR.dispose(),
                this._filtersL.forEach(t=>t.disconnect()),
                this._filtersR.forEach(t=>t.disconnect()),
                this.frequency.dispose(),
                this;
              }
            }
            class za extends ha {
              constructor() {
                super (ui(za.getDefaults(), arguments, [
                  'decay'
                ])),
                this.name = 'Reverb',
                this._convolver = this.context.createConvolver(),
                this.ready = Promise.resolve();
                const t = ui(za.getDefaults(), arguments, [
                  'decay'
                ]);
                this._decay = t.decay,
                this._preDelay = t.preDelay,
                this.generate(),
                this.connectEffect(this._convolver);
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  decay: 1.5,
                  preDelay: 0.01
                });
              }
              get decay() {
                return this._decay;
              }
              set decay(t) {
                Un(t = this.toSeconds(t), 0.001),
                this._decay = t,
                this.generate();
              }
              get preDelay() {
                return this._preDelay;
              }
              set preDelay(t) {
                Un(t = this.toSeconds(t), 0),
                this._preDelay = t,
                this.generate();
              }
              generate() {
                return ni(this, void 0, void 0, function * () {
                  const t = this.ready,
                  e = new qi(2, this._decay + this._preDelay, this.context.sampleRate),
                  s = new Lo({
                    context: e
                  }),
                  n = new Lo({
                    context: e
                  }),
                  i = new wa({
                    context: e
                  });
                  s.connect(i, 0, 0),
                  n.connect(i, 0, 1);
                  const o = new ho({
                    context: e
                  }).toDestination();
                  i.connect(o),
                  s.start(0),
                  n.start(0),
                  o.gain.setValueAtTime(0, 0),
                  o.gain.setValueAtTime(1, this._preDelay),
                  o.gain.exponentialApproachValueAtTime(0, this._preDelay, this.decay);
                  const r = e.render();
                  return this.ready = r.then(Ei),
                  yield t,
                  this._convolver.buffer = (yield r).get(),
                  this;
                });
              }
              dispose() {
                return super.dispose(),
                this._convolver.disconnect(),
                this;
              }
            }
            class Wa extends io {
              constructor() {
                super (ui(Wa.getDefaults(), arguments)),
                this.name = 'MidSideSplit',
                this._split = this.input = new xa({
                  channels: 2,
                  context: this.context
                }),
                this._midAdd = new nr({
                  context: this.context
                }),
                this.mid = new Yo({
                  context: this.context,
                  value: Math.SQRT1_2
                }),
                this._sideSubtract = new _r({
                  context: this.context
                }),
                this.side = new Yo({
                  context: this.context,
                  value: Math.SQRT1_2
                }),
                this._split.connect(this._midAdd, 0),
                this._split.connect(this._midAdd.addend, 1),
                this._split.connect(this._sideSubtract, 0),
                this._split.connect(this._sideSubtract.subtrahend, 1),
                this._midAdd.connect(this.mid),
                this._sideSubtract.connect(this.side);
              }
              dispose() {
                return super.dispose(),
                this.mid.dispose(),
                this.side.dispose(),
                this._midAdd.dispose(),
                this._sideSubtract.dispose(),
                this._split.dispose(),
                this;
              }
            }
            class Ba extends io {
              constructor() {
                super (ui(Ba.getDefaults(), arguments)),
                this.name = 'MidSideMerge',
                this.mid = new ho({
                  context: this.context
                }),
                this.side = new ho({
                  context: this.context
                }),
                this._left = new nr({
                  context: this.context
                }),
                this._leftMult = new Yo({
                  context: this.context,
                  value: Math.SQRT1_2
                }),
                this._right = new _r({
                  context: this.context
                }),
                this._rightMult = new Yo({
                  context: this.context,
                  value: Math.SQRT1_2
                }),
                this._merge = this.output = new wa({
                  context: this.context
                }),
                this.mid.fan(this._left),
                this.side.connect(this._left.addend),
                this.mid.connect(this._right),
                this.side.connect(this._right.subtrahend),
                this._left.connect(this._leftMult),
                this._right.connect(this._rightMult),
                this._leftMult.connect(this._merge, 0, 0),
                this._rightMult.connect(this._merge, 0, 1);
              }
              dispose() {
                return super.dispose(),
                this.mid.dispose(),
                this.side.dispose(),
                this._leftMult.dispose(),
                this._rightMult.dispose(),
                this._left.dispose(),
                this._right.dispose(),
                this;
              }
            }
            class Ua extends ha {
              constructor(t) {
                super (t),
                this.name = 'MidSideEffect',
                this._midSideMerge = new Ba({
                  context: this.context
                }),
                this._midSideSplit = new Wa({
                  context: this.context
                }),
                this._midSend = this._midSideSplit.mid,
                this._sideSend = this._midSideSplit.side,
                this._midReturn = this._midSideMerge.mid,
                this._sideReturn = this._midSideMerge.side,
                this.effectSend.connect(this._midSideSplit),
                this._midSideMerge.connect(this.effectReturn);
              }
              connectEffectMid(...t) {
                this._midSend.chain(...t, this._midReturn);
              }
              connectEffectSide(...t) {
                this._sideSend.chain(...t, this._sideReturn);
              }
              dispose() {
                return super.dispose(),
                this._midSideSplit.dispose(),
                this._midSideMerge.dispose(),
                this._midSend.dispose(),
                this._sideSend.dispose(),
                this._midReturn.dispose(),
                this._sideReturn.dispose(),
                this;
              }
            }
            class Ga extends Ua {
              constructor() {
                super (ui(Ga.getDefaults(), arguments, [
                  'width'
                ])),
                this.name = 'StereoWidener';
                const t = ui(Ga.getDefaults(), arguments, [
                  'width'
                ]);
                this.width = new po({
                  context: this.context,
                  value: t.width,
                  units: 'normalRange'
                }),
                Oi(this, [
                  'width'
                ]),
                this._twoTimesWidthMid = new Yo({
                  context: this.context,
                  value: 2
                }),
                this._twoTimesWidthSide = new Yo({
                  context: this.context,
                  value: 2
                }),
                this._midMult = new Yo({
                  context: this.context
                }),
                this._twoTimesWidthMid.connect(this._midMult.factor),
                this.connectEffectMid(this._midMult),
                this._oneMinusWidth = new _r({
                  context: this.context
                }),
                this._oneMinusWidth.connect(this._twoTimesWidthMid),
                ro(this.context.getConstant(1), this._oneMinusWidth),
                this.width.connect(this._oneMinusWidth.subtrahend),
                this._sideMult = new Yo({
                  context: this.context
                }),
                this.width.connect(this._twoTimesWidthSide),
                this._twoTimesWidthSide.connect(this._sideMult.factor),
                this.connectEffectSide(this._sideMult);
              }
              static getDefaults() {
                return Object.assign(Ua.getDefaults(), {
                  width: 0.5
                });
              }
              dispose() {
                return super.dispose(),
                this.width.dispose(),
                this._midMult.dispose(),
                this._sideMult.dispose(),
                this._twoTimesWidthMid.dispose(),
                this._twoTimesWidthSide.dispose(),
                this._oneMinusWidth.dispose(),
                this;
              }
            }
            class Qa extends ba {
              constructor() {
                super (ui(Qa.getDefaults(), arguments, [
                  'frequency',
                  'depth'
                ])),
                this.name = 'Tremolo';
                const t = ui(Qa.getDefaults(), arguments, [
                  'frequency',
                  'depth'
                ]);
                this._lfoL = new rr({
                  context: this.context,
                  type: t.type,
                  min: 1,
                  max: 0
                }),
                this._lfoR = new rr({
                  context: this.context,
                  type: t.type,
                  min: 1,
                  max: 0
                }),
                this._amplitudeL = new ho({
                  context: this.context
                }),
                this._amplitudeR = new ho({
                  context: this.context
                }),
                this.frequency = new po({
                  context: this.context,
                  value: t.frequency,
                  units: 'frequency'
                }),
                this.depth = new po({
                  context: this.context,
                  value: t.depth,
                  units: 'normalRange'
                }),
                Oi(this, [
                  'frequency',
                  'depth'
                ]),
                this.connectEffectLeft(this._amplitudeL),
                this.connectEffectRight(this._amplitudeR),
                this._lfoL.connect(this._amplitudeL.gain),
                this._lfoR.connect(this._amplitudeR.gain),
                this.frequency.fan(this._lfoL.frequency, this._lfoR.frequency),
                this.depth.fan(this._lfoR.amplitude, this._lfoL.amplitude),
                this.spread = t.spread;
              }
              static getDefaults() {
                return Object.assign(ba.getDefaults(), {
                  frequency: 10,
                  type: 'sine',
                  depth: 0.5,
                  spread: 180
                });
              }
              start(t) {
                return this._lfoL.start(t),
                this._lfoR.start(t),
                this;
              }
              stop(t) {
                return this._lfoL.stop(t),
                this._lfoR.stop(t),
                this;
              }
              sync() {
                return this._lfoL.sync(),
                this._lfoR.sync(),
                this.context.transport.syncSignal(this.frequency),
                this;
              }
              unsync() {
                return this._lfoL.unsync(),
                this._lfoR.unsync(),
                this.context.transport.unsyncSignal(this.frequency),
                this;
              }
              get type() {
                return this._lfoL.type;
              }
              set type(t) {
                this._lfoL.type = t,
                this._lfoR.type = t;
              }
              get spread() {
                return this._lfoR.phase - this._lfoL.phase;
              }
              set spread(t) {
                this._lfoL.phase = 90 - t / 2,
                this._lfoR.phase = t / 2 + 90;
              }
              dispose() {
                return super.dispose(),
                this._lfoL.dispose(),
                this._lfoR.dispose(),
                this._amplitudeL.dispose(),
                this._amplitudeR.dispose(),
                this.frequency.dispose(),
                this.depth.dispose(),
                this;
              }
            }
            class Za extends ha {
              constructor() {
                super (ui(Za.getDefaults(), arguments, [
                  'frequency',
                  'depth'
                ])),
                this.name = 'Vibrato';
                const t = ui(Za.getDefaults(), arguments, [
                  'frequency',
                  'depth'
                ]);
                this._delayNode = new yo({
                  context: this.context,
                  delayTime: 0,
                  maxDelay: t.maxDelay
                }),
                this._lfo = new rr({
                  context: this.context,
                  type: t.type,
                  min: 0,
                  max: t.maxDelay,
                  frequency: t.frequency,
                  phase: - 90
                }).start().connect(this._delayNode.delayTime),
                this.frequency = this._lfo.frequency,
                this.depth = this._lfo.amplitude,
                this.depth.value = t.depth,
                Oi(this, [
                  'frequency',
                  'depth'
                ]),
                this.effectSend.chain(this._delayNode, this.effectReturn);
              }
              static getDefaults() {
                return Object.assign(ha.getDefaults(), {
                  maxDelay: 0.005,
                  frequency: 5,
                  depth: 0.1,
                  type: 'sine'
                });
              }
              get type() {
                return this._lfo.type;
              }
              set type(t) {
                this._lfo.type = t;
              }
              dispose() {
                return super.dispose(),
                this._delayNode.dispose(),
                this._lfo.dispose(),
                this.frequency.dispose(),
                this.depth.dispose(),
                this;
              }
            }
            class Xa extends io {
              constructor() {
                super (ui(Xa.getDefaults(), arguments, [
                  'type',
                  'size'
                ])),
                this.name = 'Analyser',
                this._analysers = [
                ],
                this._buffers = [
                ];
                const t = ui(Xa.getDefaults(), arguments, [
                  'type',
                  'size'
                ]);
                this.input = this.output = this._gain = new ho({
                  context: this.context
                }),
                this._split = new xa({
                  context: this.context,
                  channels: t.channels
                }),
                this.input.connect(this._split),
                Un(t.channels, 1);
                for (let e = 0; e < t.channels; e++) this._analysers[e] = this.context.createAnalyser(),
                this._split.connect(this._analysers[e], e, 0);
                this.size = t.size,
                this.type = t.type,
                this.smoothing = t.smoothing;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  size: 1024,
                  smoothing: 0.8,
                  type: 'fft',
                  channels: 1
                });
              }
              getValue() {
                return this._analysers.forEach((t, e) =>{
                  const s = this._buffers[e];
                  'fft' === this._type ? t.getFloatFrequencyData(s) : 'waveform' === this._type && t.getFloatTimeDomainData(s);
                }),
                1 === this.channels ? this._buffers[0] : this._buffers;
              }
              get size() {
                return this._analysers[0].frequencyBinCount;
              }
              set size(t) {
                this._analysers.forEach((e, s) =>{
                  e.fftSize = 2 * t,
                  this._buffers[s] = new Float32Array(t);
                });
              }
              get channels() {
                return this._analysers.length;
              }
              get type() {
                return this._type;
              }
              set type(t) {
                Bn('waveform' === t || 'fft' === t, `Analyser: invalid type: ${ t }`),
                this._type = t;
              }
              get smoothing() {
                return this._analysers[0].smoothingTimeConstant;
              }
              set smoothing(t) {
                this._analysers.forEach(e=>e.smoothingTimeConstant = t);
              }
              dispose() {
                return super.dispose(),
                this._analysers.forEach(t=>t.disconnect()),
                this._split.dispose(),
                this._gain.dispose(),
                this;
              }
            }
            class Ya extends io {
              constructor() {
                super (ui(Ya.getDefaults(), arguments)),
                this.name = 'MeterBase',
                this.input = this.output = this._analyser = new Xa({
                  context: this.context,
                  size: 256,
                  type: 'waveform'
                });
              }
              dispose() {
                return super.dispose(),
                this._analyser.dispose(),
                this;
              }
            }
            class $a extends Ya {
              constructor() {
                super (ui($a.getDefaults(), arguments, [
                  'smoothing'
                ])),
                this.name = 'Meter';
                const t = ui($a.getDefaults(), arguments, [
                  'smoothing'
                ]);
                this.input = this.output = this._analyser = new Xa({
                  context: this.context,
                  size: 256,
                  type: 'waveform',
                  channels: t.channelCount
                }),
                this.smoothing = t.smoothing,
                this.normalRange = t.normalRange,
                this._rms = new Array(t.channelCount),
                this._rms.fill(0);
              }
              static getDefaults() {
                return Object.assign(Ya.getDefaults(), {
                  smoothing: 0.8,
                  normalRange: !1,
                  channelCount: 1
                });
              }
              getLevel() {
                return Kn('\'getLevel\' has been changed to \'getValue\''),
                this.getValue();
              }
              getValue() {
                const t = this._analyser.getValue(),
                e = (1 === this.channels ? [
                  t
                ] : t).map((t, e) =>{
                  const s = t.reduce((t, e) =>t + e * e, 0),
                  n = Math.sqrt(s / t.length);
                  return this._rms[e] = Math.max(n, this._rms[e] * this.smoothing),
                  this.normalRange ? this._rms[e] : Li(this._rms[e]);
                });
                return 1 === this.channels ? e[0] : e;
              }
              get channels() {
                return this._analyser.channels;
              }
              dispose() {
                return super.dispose(),
                this._analyser.dispose(),
                this;
              }
            }
            class Ha extends Ya {
              constructor() {
                super (ui(Ha.getDefaults(), arguments, [
                  'size'
                ])),
                this.name = 'FFT';
                const t = ui(Ha.getDefaults(), arguments, [
                  'size'
                ]);
                this.normalRange = t.normalRange,
                this._analyser.type = 'fft',
                this.size = t.size;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  normalRange: !1,
                  size: 1024,
                  smoothing: 0.8
                });
              }
              getValue() {
                return this._analyser.getValue().map(t=>this.normalRange ? ji(t) : t);
              }
              get size() {
                return this._analyser.size;
              }
              set size(t) {
                this._analyser.size = t;
              }
              get smoothing() {
                return this._analyser.smoothing;
              }
              set smoothing(t) {
                this._analyser.smoothing = t;
              }
              getFrequencyOfIndex(t) {
                return Bn(0 <= t && t < this.size, `index must be greater than or equal to 0 and less than ${ this.size }`),
                t * this.context.sampleRate / (2 * this.size);
              }
            }
            class Ja extends Ya {
              constructor() {
                super (ui(Ja.getDefaults(), arguments)),
                this.name = 'DCMeter',
                this._analyser.type = 'waveform',
                this._analyser.size = 256;
              }
              getValue() {
                return this._analyser.getValue() [0];
              }
            }
            class Ka extends Ya {
              constructor() {
                super (ui(Ka.getDefaults(), arguments, [
                  'size'
                ])),
                this.name = 'Waveform';
                const t = ui(Ka.getDefaults(), arguments, [
                  'size'
                ]);
                this._analyser.type = 'waveform',
                this.size = t.size;
              }
              static getDefaults() {
                return Object.assign(Ya.getDefaults(), {
                  size: 1024
                });
              }
              getValue() {
                return this._analyser.getValue();
              }
              get size() {
                return this._analyser.size;
              }
              set size(t) {
                this._analyser.size = t;
              }
            }
            class tc extends io {
              constructor() {
                super (ui(tc.getDefaults(), arguments, [
                  'solo'
                ])),
                this.name = 'Solo';
                const t = ui(tc.getDefaults(), arguments, [
                  'solo'
                ]);
                this.input = this.output = new ho({
                  context: this.context
                }),
                tc._allSolos.has(this.context) || tc._allSolos.set(this.context, new Set()),
                tc._allSolos.get(this.context).add(this),
                this.solo = t.solo;
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  solo: !1
                });
              }
              get solo() {
                return this._isSoloed();
              }
              set solo(t) {
                t ? this._addSolo() : this._removeSolo(),
                tc._allSolos.get(this.context).forEach(t=>t._updateSolo());
              }
              get muted() {
                return 0 === this.input.gain.value;
              }
              _addSolo() {
                tc._soloed.has(this.context) || tc._soloed.set(this.context, new Set()),
                tc._soloed.get(this.context).add(this);
              }
              _removeSolo() {
                tc._soloed.has(this.context) && tc._soloed.get(this.context).delete(this);
              }
              _isSoloed() {
                return tc._soloed.has(this.context) && tc._soloed.get(this.context).has(this);
              }
              _noSolos() {
                return !tc._soloed.has(this.context) || tc._soloed.has(this.context) && 0 === tc._soloed.get(this.context).size;
              }
              _updateSolo() {
                this._isSoloed() || this._noSolos() ? this.input.gain.value = 1 : this.input.gain.value = 0;
              }
              dispose() {
                return super.dispose(),
                tc._allSolos.get(this.context).delete(this),
                this._removeSolo(),
                this;
              }
            }
            tc._allSolos = new Map(),
            tc._soloed = new Map();
            class ec extends io {
              constructor() {
                super (ui(ec.getDefaults(), arguments, [
                  'pan',
                  'volume'
                ])),
                this.name = 'PanVol';
                const t = ui(ec.getDefaults(), arguments, [
                  'pan',
                  'volume'
                ]);
                this._panner = this.input = new pa({
                  context: this.context,
                  pan: t.pan,
                  channelCount: t.channelCount
                }),
                this.pan = this._panner.pan,
                this._volume = this.output = new Oo({
                  context: this.context,
                  volume: t.volume
                }),
                this.volume = this._volume.volume,
                this._panner.connect(this._volume),
                this.mute = t.mute,
                Oi(this, [
                  'pan',
                  'volume'
                ]);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  mute: !1,
                  pan: 0,
                  volume: 0,
                  channelCount: 1
                });
              }
              get mute() {
                return this._volume.mute;
              }
              set mute(t) {
                this._volume.mute = t;
              }
              dispose() {
                return super.dispose(),
                this._panner.dispose(),
                this.pan.dispose(),
                this._volume.dispose(),
                this.volume.dispose(),
                this;
              }
            }
            class sc extends io {
              constructor() {
                super (ui(sc.getDefaults(), arguments, [
                  'volume',
                  'pan'
                ])),
                this.name = 'Channel';
                const t = ui(sc.getDefaults(), arguments, [
                  'volume',
                  'pan'
                ]);
                this._solo = this.input = new tc({
                  solo: t.solo,
                  context: this.context
                }),
                this._panVol = this.output = new ec({
                  context: this.context,
                  pan: t.pan,
                  volume: t.volume,
                  mute: t.mute,
                  channelCount: t.channelCount
                }),
                this.pan = this._panVol.pan,
                this.volume = this._panVol.volume,
                this._solo.connect(this._panVol),
                Oi(this, [
                  'pan',
                  'volume'
                ]);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  pan: 0,
                  volume: 0,
                  mute: !1,
                  solo: !1,
                  channelCount: 1
                });
              }
              get solo() {
                return this._solo.solo;
              }
              set solo(t) {
                this._solo.solo = t;
              }
              get muted() {
                return this._solo.muted || this.mute;
              }
              get mute() {
                return this._panVol.mute;
              }
              set mute(t) {
                this._panVol.mute = t;
              }
              _getBus(t) {
                return sc.buses.has(t) || sc.buses.set(t, new ho({
                  context: this.context
                })),
                sc.buses.get(t);
              }
              send(t, e = 0) {
                const s = this._getBus(t),
                n = new ho({
                  context: this.context,
                  units: 'decibels',
                  gain: e
                });
                return this.connect(n),
                n.connect(s),
                n;
              }
              receive(t) {
                return this._getBus(t).connect(this),
                this;
              }
              dispose() {
                return super.dispose(),
                this._panVol.dispose(),
                this.pan.dispose(),
                this.volume.dispose(),
                this._solo.dispose(),
                this;
              }
            }
            sc.buses = new Map();
            class nc extends io {
              constructor() {
                super (ui(nc.getDefaults(), arguments)),
                this.name = 'Mono',
                this.input = new ho({
                  context: this.context
                }),
                this._merge = this.output = new wa({
                  channels: 2,
                  context: this.context
                }),
                this.input.connect(this._merge, 0, 0),
                this.input.connect(this._merge, 0, 1);
              }
              dispose() {
                return super.dispose(),
                this._merge.dispose(),
                this.input.dispose(),
                this;
              }
            }
            class ic extends io {
              constructor() {
                super (ui(ic.getDefaults(), arguments, [
                  'lowFrequency',
                  'highFrequency'
                ])),
                this.name = 'MultibandSplit',
                this.input = new ho({
                  context: this.context
                }),
                this.output = void 0,
                this.low = new Or({
                  context: this.context,
                  frequency: 0,
                  type: 'lowpass'
                }),
                this._lowMidFilter = new Or({
                  context: this.context,
                  frequency: 0,
                  type: 'highpass'
                }),
                this.mid = new Or({
                  context: this.context,
                  frequency: 0,
                  type: 'lowpass'
                }),
                this.high = new Or({
                  context: this.context,
                  frequency: 0,
                  type: 'highpass'
                }),
                this._internalChannels = [
                  this.low,
                  this.mid,
                  this.high
                ];
                const t = ui(ic.getDefaults(), arguments, [
                  'lowFrequency',
                  'highFrequency'
                ]);
                this.lowFrequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.lowFrequency
                }),
                this.highFrequency = new po({
                  context: this.context,
                  units: 'frequency',
                  value: t.highFrequency
                }),
                this.Q = new po({
                  context: this.context,
                  units: 'positive',
                  value: t.Q
                }),
                this.input.fan(this.low, this.high),
                this.input.chain(this._lowMidFilter, this.mid),
                this.lowFrequency.fan(this.low.frequency, this._lowMidFilter.frequency),
                this.highFrequency.fan(this.mid.frequency, this.high.frequency),
                this.Q.connect(this.low.Q),
                this.Q.connect(this._lowMidFilter.Q),
                this.Q.connect(this.mid.Q),
                this.Q.connect(this.high.Q),
                Oi(this, [
                  'high',
                  'mid',
                  'low',
                  'highFrequency',
                  'lowFrequency'
                ]);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  Q: 1,
                  highFrequency: 2500,
                  lowFrequency: 400
                });
              }
              dispose() {
                return super.dispose(),
                Mi(this, [
                  'high',
                  'mid',
                  'low',
                  'highFrequency',
                  'lowFrequency'
                ]),
                this.low.dispose(),
                this._lowMidFilter.dispose(),
                this.mid.dispose(),
                this.high.dispose(),
                this.lowFrequency.dispose(),
                this.highFrequency.dispose(),
                this.Q.dispose(),
                this;
              }
            }
            class oc extends io {
              constructor() {
                super (...arguments),
                this.name = 'Listener',
                this.positionX = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.positionX
                }),
                this.positionY = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.positionY
                }),
                this.positionZ = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.positionZ
                }),
                this.forwardX = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.forwardX
                }),
                this.forwardY = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.forwardY
                }),
                this.forwardZ = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.forwardZ
                }),
                this.upX = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.upX
                }),
                this.upY = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.upY
                }),
                this.upZ = new no({
                  context: this.context,
                  param: this.context.rawContext.listener.upZ
                });
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  positionX: 0,
                  positionY: 0,
                  positionZ: 0,
                  forwardX: 0,
                  forwardY: 0,
                  forwardZ: - 1,
                  upX: 0,
                  upY: 1,
                  upZ: 0
                });
              }
              dispose() {
                return super.dispose(),
                this.positionX.dispose(),
                this.positionY.dispose(),
                this.positionZ.dispose(),
                this.forwardX.dispose(),
                this.forwardY.dispose(),
                this.forwardZ.dispose(),
                this.upX.dispose(),
                this.upY.dispose(),
                this.upZ.dispose(),
                this;
              }
            }
            Ti(t=>{
              t.listener = new oc({
                context: t
              });
            }),
            ki(t=>{
              t.listener.dispose();
            });
            class rc extends io {
              constructor() {
                super (ui(rc.getDefaults(), arguments, [
                  'positionX',
                  'positionY',
                  'positionZ'
                ])),
                this.name = 'Panner3D';
                const t = ui(rc.getDefaults(), arguments, [
                  'positionX',
                  'positionY',
                  'positionZ'
                ]);
                this._panner = this.input = this.output = this.context.createPanner(),
                this.panningModel = t.panningModel,
                this.maxDistance = t.maxDistance,
                this.distanceModel = t.distanceModel,
                this.coneOuterGain = t.coneOuterGain,
                this.coneOuterAngle = t.coneOuterAngle,
                this.coneInnerAngle = t.coneInnerAngle,
                this.refDistance = t.refDistance,
                this.rolloffFactor = t.rolloffFactor,
                this.positionX = new no({
                  context: this.context,
                  param: this._panner.positionX,
                  value: t.positionX
                }),
                this.positionY = new no({
                  context: this.context,
                  param: this._panner.positionY,
                  value: t.positionY
                }),
                this.positionZ = new no({
                  context: this.context,
                  param: this._panner.positionZ,
                  value: t.positionZ
                }),
                this.orientationX = new no({
                  context: this.context,
                  param: this._panner.orientationX,
                  value: t.orientationX
                }),
                this.orientationY = new no({
                  context: this.context,
                  param: this._panner.orientationY,
                  value: t.orientationY
                }),
                this.orientationZ = new no({
                  context: this.context,
                  param: this._panner.orientationZ,
                  value: t.orientationZ
                });
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  coneInnerAngle: 360,
                  coneOuterAngle: 360,
                  coneOuterGain: 0,
                  distanceModel: 'inverse',
                  maxDistance: 10000,
                  orientationX: 0,
                  orientationY: 0,
                  orientationZ: 0,
                  panningModel: 'equalpower',
                  positionX: 0,
                  positionY: 0,
                  positionZ: 0,
                  refDistance: 1,
                  rolloffFactor: 1
                });
              }
              setPosition(t, e, s) {
                return this.positionX.value = t,
                this.positionY.value = e,
                this.positionZ.value = s,
                this;
              }
              setOrientation(t, e, s) {
                return this.orientationX.value = t,
                this.orientationY.value = e,
                this.orientationZ.value = s,
                this;
              }
              get panningModel() {
                return this._panner.panningModel;
              }
              set panningModel(t) {
                this._panner.panningModel = t;
              }
              get refDistance() {
                return this._panner.refDistance;
              }
              set refDistance(t) {
                this._panner.refDistance = t;
              }
              get rolloffFactor() {
                return this._panner.rolloffFactor;
              }
              set rolloffFactor(t) {
                this._panner.rolloffFactor = t;
              }
              get distanceModel() {
                return this._panner.distanceModel;
              }
              set distanceModel(t) {
                this._panner.distanceModel = t;
              }
              get coneInnerAngle() {
                return this._panner.coneInnerAngle;
              }
              set coneInnerAngle(t) {
                this._panner.coneInnerAngle = t;
              }
              get coneOuterAngle() {
                return this._panner.coneOuterAngle;
              }
              set coneOuterAngle(t) {
                this._panner.coneOuterAngle = t;
              }
              get coneOuterGain() {
                return this._panner.coneOuterGain;
              }
              set coneOuterGain(t) {
                this._panner.coneOuterGain = t;
              }
              get maxDistance() {
                return this._panner.maxDistance;
              }
              set maxDistance(t) {
                this._panner.maxDistance = t;
              }
              dispose() {
                return super.dispose(),
                this._panner.disconnect(),
                this.orientationX.dispose(),
                this.orientationY.dispose(),
                this.orientationZ.dispose(),
                this.positionX.dispose(),
                this.positionY.dispose(),
                this.positionZ.dispose(),
                this;
              }
            }
            class ac extends io {
              constructor() {
                super (ui(ac.getDefaults(), arguments)),
                this.name = 'Recorder';
                const t = ui(ac.getDefaults(), arguments);
                this.input = new ho({
                  context: this.context
                }),
                Bn(ac.supported, 'Media Recorder API is not available'),
                this._stream = this.context.createMediaStreamDestination(),
                this.input.connect(this._stream),
                this._recorder = new MediaRecorder(this._stream.stream, {
                  mimeType: t.mimeType
                });
              }
              static getDefaults() {
                return io.getDefaults();
              }
              get mimeType() {
                return this._recorder.mimeType;
              }
              static get supported() {
                return null !== ti && Reflect.has(ti, 'MediaRecorder');
              }
              get state() {
                return 'inactive' === this._recorder.state ? 'stopped' : 'paused' === this._recorder.state ? 'paused' : 'started';
              }
              start() {
                return ni(this, void 0, void 0, function * () {
                  Bn('started' !== this.state, 'Recorder is already started');
                  const t = new Promise(t=>{
                    const e = () =>{
                      this._recorder.removeEventListener('start', e, !1),
                      t();
                    };
                    this._recorder.addEventListener('start', e, !1);
                  });
                  return this._recorder.start(),
                  yield t;
                });
              }
              stop() {
                return ni(this, void 0, void 0, function * () {
                  Bn('stopped' !== this.state, 'Recorder is not started');
                  const t = new Promise(t=>{
                    const e = s=>{
                      this._recorder.removeEventListener('dataavailable', e, !1),
                      t(s.data);
                    };
                    this._recorder.addEventListener('dataavailable', e, !1);
                  });
                  return this._recorder.stop(),
                  yield t;
                });
              }
              pause() {
                return Bn('started' === this.state, 'Recorder must be started'),
                this._recorder.pause(),
                this;
              }
              dispose() {
                return super.dispose(),
                this.input.dispose(),
                this._stream.disconnect(),
                this;
              }
            }
            class cc extends io {
              constructor() {
                super (ui(cc.getDefaults(), arguments, [
                  'threshold',
                  'ratio'
                ])),
                this.name = 'Compressor',
                this._compressor = this.context.createDynamicsCompressor(),
                this.input = this._compressor,
                this.output = this._compressor;
                const t = ui(cc.getDefaults(), arguments, [
                  'threshold',
                  'ratio'
                ]);
                this.threshold = new no({
                  minValue: this._compressor.threshold.minValue,
                  maxValue: this._compressor.threshold.maxValue,
                  context: this.context,
                  convert: !1,
                  param: this._compressor.threshold,
                  units: 'decibels',
                  value: t.threshold
                }),
                this.attack = new no({
                  minValue: this._compressor.attack.minValue,
                  maxValue: this._compressor.attack.maxValue,
                  context: this.context,
                  param: this._compressor.attack,
                  units: 'time',
                  value: t.attack
                }),
                this.release = new no({
                  minValue: this._compressor.release.minValue,
                  maxValue: this._compressor.release.maxValue,
                  context: this.context,
                  param: this._compressor.release,
                  units: 'time',
                  value: t.release
                }),
                this.knee = new no({
                  minValue: this._compressor.knee.minValue,
                  maxValue: this._compressor.knee.maxValue,
                  context: this.context,
                  convert: !1,
                  param: this._compressor.knee,
                  units: 'decibels',
                  value: t.knee
                }),
                this.ratio = new no({
                  minValue: this._compressor.ratio.minValue,
                  maxValue: this._compressor.ratio.maxValue,
                  context: this.context,
                  convert: !1,
                  param: this._compressor.ratio,
                  units: 'positive',
                  value: t.ratio
                }),
                Oi(this, [
                  'knee',
                  'release',
                  'attack',
                  'ratio',
                  'threshold'
                ]);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  attack: 0.003,
                  knee: 30,
                  ratio: 12,
                  release: 0.25,
                  threshold: - 24
                });
              }
              get reduction() {
                return this._compressor.reduction;
              }
              dispose() {
                return super.dispose(),
                this._compressor.disconnect(),
                this.attack.dispose(),
                this.release.dispose(),
                this.threshold.dispose(),
                this.ratio.dispose(),
                this.knee.dispose(),
                this;
              }
            }
            class hc extends io {
              constructor() {
                super (Object.assign(ui(hc.getDefaults(), arguments, [
                  'threshold',
                  'smoothing'
                ]))),
                this.name = 'Gate';
                const t = ui(hc.getDefaults(), arguments, [
                  'threshold',
                  'smoothing'
                ]);
                this._follower = new fa({
                  context: this.context,
                  smoothing: t.smoothing
                }),
                this._gt = new gr({
                  context: this.context,
                  value: ji(t.threshold)
                }),
                this.input = new ho({
                  context: this.context
                }),
                this._gate = this.output = new ho({
                  context: this.context
                }),
                this.input.connect(this._gate),
                this.input.chain(this._follower, this._gt, this._gate.gain);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  smoothing: 0.1,
                  threshold: - 40
                });
              }
              get threshold() {
                return Li(this._gt.value);
              }
              set threshold(t) {
                this._gt.value = ji(t);
              }
              get smoothing() {
                return this._follower.smoothing;
              }
              set smoothing(t) {
                this._follower.smoothing = t;
              }
              dispose() {
                return super.dispose(),
                this.input.dispose(),
                this._follower.dispose(),
                this._gt.dispose(),
                this._gate.dispose(),
                this;
              }
            }
            class lc extends io {
              constructor() {
                super (Object.assign(ui(lc.getDefaults(), arguments, [
                  'threshold'
                ]))),
                this.name = 'Limiter';
                const t = ui(lc.getDefaults(), arguments, [
                  'threshold'
                ]);
                this._compressor = this.input = this.output = new cc({
                  context: this.context,
                  ratio: 20,
                  attack: 0.003,
                  release: 0.01,
                  threshold: t.threshold
                }),
                this.threshold = this._compressor.threshold,
                Oi(this, 'threshold');
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  threshold: - 12
                });
              }
              get reduction() {
                return this._compressor.reduction;
              }
              dispose() {
                return super.dispose(),
                this._compressor.dispose(),
                this.threshold.dispose(),
                this;
              }
            }
            class uc extends io {
              constructor() {
                super (Object.assign(ui(uc.getDefaults(), arguments))),
                this.name = 'MidSideCompressor';
                const t = ui(uc.getDefaults(), arguments);
                this._midSideSplit = this.input = new Wa({
                  context: this.context
                }),
                this._midSideMerge = this.output = new Ba({
                  context: this.context
                }),
                this.mid = new cc(Object.assign(t.mid, {
                  context: this.context
                })),
                this.side = new cc(Object.assign(t.side, {
                  context: this.context
                })),
                this._midSideSplit.mid.chain(this.mid, this._midSideMerge.mid),
                this._midSideSplit.side.chain(this.side, this._midSideMerge.side),
                Oi(this, [
                  'mid',
                  'side'
                ]);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  mid: {
                    ratio: 3,
                    threshold: - 24,
                    release: 0.03,
                    attack: 0.02,
                    knee: 16
                  },
                  side: {
                    ratio: 6,
                    threshold: - 30,
                    release: 0.25,
                    attack: 0.03,
                    knee: 10
                  }
                });
              }
              dispose() {
                return super.dispose(),
                this.mid.dispose(),
                this.side.dispose(),
                this._midSideSplit.dispose(),
                this._midSideMerge.dispose(),
                this;
              }
            }
            class pc extends io {
              constructor() {
                super (Object.assign(ui(pc.getDefaults(), arguments))),
                this.name = 'MultibandCompressor';
                const t = ui(pc.getDefaults(), arguments);
                this._splitter = this.input = new ic({
                  context: this.context,
                  lowFrequency: t.lowFrequency,
                  highFrequency: t.highFrequency
                }),
                this.lowFrequency = this._splitter.lowFrequency,
                this.highFrequency = this._splitter.highFrequency,
                this.output = new ho({
                  context: this.context
                }),
                this.low = new cc(Object.assign(t.low, {
                  context: this.context
                })),
                this.mid = new cc(Object.assign(t.mid, {
                  context: this.context
                })),
                this.high = new cc(Object.assign(t.high, {
                  context: this.context
                })),
                this._splitter.low.chain(this.low, this.output),
                this._splitter.mid.chain(this.mid, this.output),
                this._splitter.high.chain(this.high, this.output),
                Oi(this, [
                  'high',
                  'mid',
                  'low',
                  'highFrequency',
                  'lowFrequency'
                ]);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  lowFrequency: 250,
                  highFrequency: 2000,
                  low: {
                    ratio: 6,
                    threshold: - 30,
                    release: 0.25,
                    attack: 0.03,
                    knee: 10
                  },
                  mid: {
                    ratio: 3,
                    threshold: - 24,
                    release: 0.03,
                    attack: 0.02,
                    knee: 16
                  },
                  high: {
                    ratio: 3,
                    threshold: - 24,
                    release: 0.03,
                    attack: 0.02,
                    knee: 16
                  }
                });
              }
              dispose() {
                return super.dispose(),
                this._splitter.dispose(),
                this.low.dispose(),
                this.mid.dispose(),
                this.high.dispose(),
                this.output.dispose(),
                this;
              }
            }
            class dc extends io {
              constructor() {
                super (ui(dc.getDefaults(), arguments, [
                  'low',
                  'mid',
                  'high'
                ])),
                this.name = 'EQ3',
                this.output = new ho({
                  context: this.context
                }),
                this._internalChannels = [
                ];
                const t = ui(dc.getDefaults(), arguments, [
                  'low',
                  'mid',
                  'high'
                ]);
                this.input = this._multibandSplit = new ic({
                  context: this.context,
                  highFrequency: t.highFrequency,
                  lowFrequency: t.lowFrequency
                }),
                this._lowGain = new ho({
                  context: this.context,
                  gain: t.low,
                  units: 'decibels'
                }),
                this._midGain = new ho({
                  context: this.context,
                  gain: t.mid,
                  units: 'decibels'
                }),
                this._highGain = new ho({
                  context: this.context,
                  gain: t.high,
                  units: 'decibels'
                }),
                this.low = this._lowGain.gain,
                this.mid = this._midGain.gain,
                this.high = this._highGain.gain,
                this.Q = this._multibandSplit.Q,
                this.lowFrequency = this._multibandSplit.lowFrequency,
                this.highFrequency = this._multibandSplit.highFrequency,
                this._multibandSplit.low.chain(this._lowGain, this.output),
                this._multibandSplit.mid.chain(this._midGain, this.output),
                this._multibandSplit.high.chain(this._highGain, this.output),
                Oi(this, [
                  'low',
                  'mid',
                  'high',
                  'lowFrequency',
                  'highFrequency'
                ]),
                this._internalChannels = [
                  this._multibandSplit
                ];
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  high: 0,
                  highFrequency: 2500,
                  low: 0,
                  lowFrequency: 400,
                  mid: 0
                });
              }
              dispose() {
                return super.dispose(),
                Mi(this, [
                  'low',
                  'mid',
                  'high',
                  'lowFrequency',
                  'highFrequency'
                ]),
                this._multibandSplit.dispose(),
                this.lowFrequency.dispose(),
                this.highFrequency.dispose(),
                this._lowGain.dispose(),
                this._midGain.dispose(),
                this._highGain.dispose(),
                this.low.dispose(),
                this.mid.dispose(),
                this.high.dispose(),
                this.Q.dispose(),
                this;
              }
            }
            class fc extends io {
              constructor() {
                super (ui(fc.getDefaults(), arguments, [
                  'url',
                  'onload'
                ])),
                this.name = 'Convolver',
                this._convolver = this.context.createConvolver();
                const t = ui(fc.getDefaults(), arguments, [
                  'url',
                  'onload'
                ]);
                this._buffer = new Ri(t.url, e=>{
                  this.buffer = e,
                  t.onload();
                }),
                this.input = new ho({
                  context: this.context
                }),
                this.output = new ho({
                  context: this.context
                }),
                this._buffer.loaded && (this.buffer = this._buffer),
                this.normalize = t.normalize,
                this.input.chain(this._convolver, this.output);
              }
              static getDefaults() {
                return Object.assign(io.getDefaults(), {
                  normalize: !0,
                  onload: Ei
                });
              }
              load(t) {
                return ni(this, void 0, void 0, function * () {
                  this.buffer = yield this._buffer.load(t);
                });
              }
              get buffer() {
                return this._buffer.length ? this._buffer : null;
              }
              set buffer(t) {
                t && this._buffer.set(t),
                this._convolver.buffer && (this.input.disconnect(), this._convolver.disconnect(), this._convolver = this.context.createConvolver(), this.input.chain(this._convolver, this.output));
                const e = this._buffer.get();
                this._convolver.buffer = e || null;
              }
              get normalize() {
                return this._convolver.normalize;
              }
              set normalize(t) {
                this._convolver.normalize = t;
              }
              dispose() {
                return super.dispose(),
                this._buffer.dispose(),
                this._convolver.disconnect(),
                this;
              }
            }
            function _c() {
              return Vi().now();
            }
            function mc() {
              return Vi().immediate();
            }
            const gc = Vi().transport;
            function vc() {
              return Vi().transport;
            }
            const yc = Vi().destination,
            xc = Vi().destination;
            function wc() {
              return Vi().destination;
            }
            const bc = Vi().listener;
            function Tc() {
              return Vi().listener;
            }
            const Sc = Vi().draw;
            function kc() {
              return Vi().draw;
            }
            const Ac = Vi();
            function Cc() {
              return Ri.loaded();
            }
            const Dc = Ri,
            Oc = wo,
            Mc = jo;
          }) (),
          n;
        }) ());
      },
      {
      }
    ],
    2: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _helpers = _dereq_('./helpers');
        var _processorNames = _interopRequireDefault(_dereq_('./audioWorklet/processorNames'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        /**
 *  Amplitude measures volume between 0.0 and 1.0.
 *  Listens to all p5sound by default, or use setInput()
 *  to listen to a specific sound source. Accepts an optional
 *  smoothing value, which defaults to 0.
 *
 *  @class p5.Amplitude
 *  @constructor
 *  @param {Number} [smoothing] between 0.0 and .999 to smooth
 *                             amplitude readings (defaults to 0)
 *  @example
 *  <div><code>
 *  let sound, amplitude;
 *
 *  function preload(){
 *    sound = loadSound('assets/beat.mp3');
 *  }
 *  function setup() {
 *    let cnv = createCanvas(100,100);
 *    cnv.mouseClicked(togglePlay);
 *    amplitude = new p5.Amplitude();
 *  }
 *
 *  function draw() {
 *    background(220);
 *    text('tap to play', 20, 20);
 *
 *    let level = amplitude.getLevel();
 *    let size = map(level, 0, 1, 0, 200);
 *    ellipse(width/2, height/2, size, size);
 *  }
 *
 *  function togglePlay() {
 *    if (sound.isPlaying() ){
 *      sound.pause();
 *    } else {
 *      sound.loop();
 *		amplitude = new p5.Amplitude();
 *		amplitude.setInput(sound);
 *    }
 *  }
 *
 *  </code></div>
 */

        class Amplitude {
          constructor(smoothing) {
            // Set to 2048 for now. In future iterations, this should be inherited or parsed from p5sound's default
            this.bufferSize = (0, _helpers.safeBufferSize) (2048);
            // set audio context
            this._workletNode = new AudioWorkletNode(_audioContext.default, _processorNames.default.amplitudeProcessor, {
              outputChannelCount: [
                1
              ],
              parameterData: {
                smoothing: smoothing || 0
              },
              processorOptions: {
                normalize: false,
                smoothing: smoothing || 0,
                numInputChannels: 2,
                bufferSize: this.bufferSize
              }
            });
            this._workletNode.port.onmessage = function (event) {
              if (event.data.name === 'amplitude') {
                this.volume = event.data.volume;
                this.volNorm = event.data.volNorm;
                this.stereoVol = event.data.stereoVol;
                this.stereoVolNorm = event.data.stereoVolNorm;
              }
            }.bind(this);
            // for connections
            this.input = this._workletNode;
            this.output = _audioContext.default.createGain();
            // the variables to return
            this.volume = 0;
            this.volNorm = 0;
            this.stereoVol = [
              0,
              0
            ];
            this.stereoVolNorm = [
              0,
              0
            ];
            this.normalize = false;
            this._workletNode.connect(this.output);
            this.output.gain.value = 0;
            // this may only be necessary because of a Chrome bug
            this.output.connect(_audioContext.default.destination);
            // connect to p5sound main output by default, unless set by input()
            _main.default.meter.connect(this._workletNode);
            // add this p5.SoundFile to the soundArray
            _main.default.soundArray.push(this);
          }          /**
   *  Connects to the p5sound instance (main output) by default.
   *  Optionally, you can pass in a specific source (i.e. a soundfile).
   *
   *  @method setInput
   *  @for p5.Amplitude
   *  @param {soundObject|undefined} [snd] set the sound source
   *                                       (optional, defaults to
   *                                       main output)
   *  @param {Number|undefined} [smoothing] a range between 0.0 and 1.0
   *                                        to smooth amplitude readings
   *  @example
   *  <div><code>
   *  function preload(){
   *    sound1 = loadSound('assets/beat.mp3');
   *    sound2 = loadSound('assets/drum.mp3');
   *  }
   *  function setup(){
   *    cnv = createCanvas(100, 100);
   *    cnv.mouseClicked(toggleSound);
   *
   *    amplitude = new p5.Amplitude();
   *    amplitude.setInput(sound2);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap to play', 20, 20);
   *
   *    let level = amplitude.getLevel();
   *    let size = map(level, 0, 1, 0, 200);
   *    ellipse(width/2, height/2, size, size);
   *  }
   *
   *  function toggleSound(){
   *    if (sound1.isPlaying() && sound2.isPlaying()) {
   *      sound1.stop();
   *      sound2.stop();
   *    } else {
   *      sound1.play();
   *      sound2.play();
   *    }
   *  }
   *  </code></div>
   */

          setInput(source, smoothing) {
            _main.default.meter.disconnect();
            if (smoothing) {
              this._workletNode.parameters.get('smoothing').value = smoothing;
            }            // connect to the master out of p5s instance if no snd is provided

            if (source == null) {
              console.log('Amplitude input source is not ready! Connecting to main output instead');
              _main.default.meter.connect(this._workletNode);
            }            // connect to the sound if it is available
             else if (source) {
              source.connect(this._workletNode);
              this._workletNode.disconnect();
              this._workletNode.connect(this.output);
            }            // otherwise, connect to the master out of p5s instance (default)
             else {
              _main.default.meter.connect(this._workletNode);
            }
          }          /**
   *  Returns a single Amplitude reading at the moment it is called.
   *  For continuous readings, run in the draw loop.
   *
   *  @method getLevel
   *  @for p5.Amplitude
   *  @param {Number} [channel] Optionally return only channel 0 (left) or 1 (right)
   *  @return {Number}       Amplitude as a number between 0.0 and 1.0
   *  @example
   *  <div><code>
   *  function preload(){
   *    sound = loadSound('assets/beat.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mouseClicked(toggleSound);
   *    amplitude = new p5.Amplitude();
   *  }
   *
   *  function draw() {
   *    background(220, 150);
   *    textAlign(CENTER);
   *    text('tap to play', width/2, 20);
   *
   *    let level = amplitude.getLevel();
   *    let size = map(level, 0, 1, 0, 200);
   *    ellipse(width/2, height/2, size, size);
   *  }
   *
   *  function toggleSound(){
   *    if (sound.isPlaying()) {
   *      sound.stop();
   *    } else {
   *      sound.play();
   *    }
   *  }
   *  </code></div>
   */

          getLevel(channel) {
            if (typeof channel !== 'undefined') {
              if (this.normalize) {
                return this.stereoVolNorm[channel];
              } else {
                return this.stereoVol[channel];
              }
            } else if (this.normalize) {
              return this.volNorm;
            } else {
              return this.volume;
            }
          }          /**
   * Determines whether the results of Amplitude.process() will be
   * Normalized. To normalize, Amplitude finds the difference the
   * loudest reading it has processed and the maximum amplitude of
   * 1.0. Amplitude adds this difference to all values to produce
   * results that will reliably map between 0.0 and 1.0. However,
   * if a louder moment occurs, the amount that Normalize adds to
   * all the values will change. Accepts an optional boolean parameter
   * (true or false). Normalizing is off by default.
   *
   * @method toggleNormalize
   * @for p5.Amplitude
   * @param {boolean} [boolean] set normalize to true (1) or false (0)
   */

          toggleNormalize(bool) {
            if (typeof bool === 'boolean') {
              this.normalize = bool;
            } else {
              this.normalize = !this.normalize;
            }
            this._workletNode.port.postMessage({
              name: 'toggleNormalize',
              normalize: this.normalize
            });
          }          /**
   *  Smooth Amplitude analysis by averaging with the last analysis
   *  frame. Off by default.
   *
   *  @method smooth
   *  @for p5.Amplitude
   *  @param {Number} set smoothing from 0.0 <= 1
   */

          smooth(s) {
            if (s >= 0 && s < 1) {
              this._workletNode.port.postMessage({
                name: 'smoothing',
                smoothing: s
              });
            } else {
              console.log('Error: smoothing must be between 0 and 1');
            }
          }
          dispose() {
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            if (this.input) {
              this.input.disconnect();
              delete this.input;
            }
            if (this.output) {
              this.output.disconnect();
              delete this.output;
            }
            this._workletNode.disconnect();
            delete this._workletNode;
          }
        }
        var _default = exports.default = Amplitude;
      },
      {
        './audioContext': 15,
        './audioWorklet/processorNames': 16,
        './helpers': 19,
        './main': 20
      }
    ],
    3: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        /**
 *  <p>FFT (Fast Fourier Transform) is an analysis algorithm that
 *  isolates individual
 *  <a href="https://en.wikipedia.org/wiki/Audio_frequency">
 *  audio frequencies</a> within a waveform.</p>
 *
 *  <p>Once instantiated, a AnalyzerFFT object can return an array based on
 *  two types of analyses: <br> • <code>AnalyzerFFT.waveform()</code> computes
 *  amplitude values along the time domain. The array indices correspond
 *  to samples across a brief moment in time. Each value represents
 *  amplitude of the waveform at that sample of time.<br>
 *  • <code>AnalyzerFFT.analyze() </code> computes amplitude values along the
 *  frequency domain. The array indices correspond to frequencies (i.e.
 *  pitches), from the lowest to the highest that humans can hear. Each
 *  value represents amplitude at that slice of the frequency spectrum.
 *  Use with <code>getEnergy()</code> to measure amplitude at specific
 *  frequencies, or within a range of frequencies. </p>
 *
 *  <p>AnalyzerFFT analyzes a very short snapshot of sound called a sample
 *  buffer. It returns an array of amplitude measurements, referred
 *  to as <code>bins</code>. The array is 1024 bins long by default.
 *  You can change the bin array length, but it must be a power of 2
 *  between 16 and 1024 in order for the FFT algorithm to function
 *  correctly. The actual size of the FFT buffer is twice the
 *  number of bins, so given a standard sample rate, the buffer is
 *  2048/44100 seconds long.</p>
 *
 *
 *  @class p5sound.AnalyzerFFT
 *  @constructor
 *  @param {Number} [smoothing]   Smooth results of Freq Spectrum.
 *                                0.0 < smoothing < 1.0.
 *                                Defaults to 0.8.
 *  @param {Number} [bins]    Length of resulting array.
 *                            Must be a power of two between
 *                            16 and 1024. Defaults to 1024.
 *  @example
 *  <div><code>
 *  function preload(){
 *    sound = loadSound('assets/Damscray_DancingTiger.mp3');
 *  }
 *
 *  function setup(){
 *    let cnv = createCanvas(100,100);
 *    cnv.mouseClicked(togglePlay);
 *    fft = new AnalyzerFFT();
 *    sound.amp(0.2);
 *  }
 *
 *  function draw(){
 *    background(220);
 *
 *    let spectrum = fft.analyze();
 *    noStroke();
 *    fill(255, 0, 255);
 *    for (let i = 0; i< spectrum.length; i++){
 *      let x = map(i, 0, spectrum.length, 0, width);
 *      let h = -height + map(spectrum[i], 0, 255, height, 0);
 *      rect(x, height, width / spectrum.length, h )
 *    }
 *
 *    let waveform = fft.waveform();
 *    noFill();
 *    beginShape();
 *    stroke(20);
 *    for (let i = 0; i < waveform.length; i++){
 *      let x = map(i, 0, waveform.length, 0, width);
 *      let y = map( waveform[i], -1, 1, 0, height);
 *      vertex(x,y);
 *    }
 *    endShape();
 *
 *    text('tap to play', 20, 20);
 *  }
 *
 *  function togglePlay() {
 *    if (sound.isPlaying()) {
 *      sound.pause();
 *    } else {
 *      sound.loop();
 *    }
 *  }
 *  </code></div>
 */

        class AnalyzerFFT {
          constructor(smoothing, bins) {
            this.input = this.analyser = _audioContext.default.createAnalyser();
            Object.defineProperties(this, {
              bins: {
                get: function () {
                  return this.analyser.fftSize / 2;
                },
                set: function (b) {
                  this.analyser.fftSize = b * 2;
                },
                configurable: true,
                enumerable: true
              },
              smoothing: {
                get: function () {
                  return this.analyser.smoothingTimeConstant;
                },
                set: function (s) {
                  this.analyser.smoothingTimeConstant = s;
                },
                configurable: true,
                enumerable: true
              }
            });
            // set default smoothing and bins
            this.smooth(smoothing);
            this.bins = bins || 1024;
            // default connections to p5sound fftMeter
            _main.default.fftMeter.connect(this.analyser);
            this.freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
            this.timeDomain = new Uint8Array(this.analyser.frequencyBinCount);
            // predefined frequency ranges, these will be tweakable
            this.bass = [
              20,
              140
            ];
            this.lowMid = [
              140,
              400
            ];
            this.mid = [
              400,
              2600
            ];
            this.highMid = [
              2600,
              5200
            ];
            this.treble = [
              5200,
              14000
            ];
            // add this p5.SoundFile to the soundArray
            _main.default.soundArray.push(this);
          }          /**
   *  Set the input source for the FFT analysis. If no source is
   *  provided, FFT will analyze all sound in the sketch.
   *
   *  @method  setInput
   *  @for AnalyzerFFT
   *  @param {Object} [source] p5.sound object (or web audio API source node)
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setInput(source) {
            if (!source) {
              _main.default.fftMeter.connect(this.analyser);
            } else {
              if (source.output) {
                source.output.connect(this.analyser);
              } else if (source.connect) {
                source.connect(this.analyser);
              }
              _main.default.fftMeter.disconnect();
            }
          }          /**
   *  Returns an array of amplitude values (between -1.0 and +1.0) that represent
   *  a snapshot of amplitude readings in a single buffer. Length will be
   *  equal to bins (defaults to 1024). Can be used to draw the waveform
   *  of a sound.
   *
   *  @method waveform
   *  @for AnalyzerFFT
   *  @param {Number} [bins]    Must be a power of two between
   *                            16 and 1024. Defaults to 1024.
   *  @param {String} [precision] If any value is provided, will return results
   *                              in a Float32 Array which is more precise
   *                              than a regular array.
   *  @return {Array}  Array    Array of amplitude values (-1 to 1)
   *                            over time. Array length = bins.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          waveform() {
            let mode;
            let normalArray = new Array();
            for (let i = 0; i < arguments.length; i++) {
              if (typeof arguments[i] === 'number') {
                this.bins = arguments[i];
              }
              if (typeof arguments[i] === 'string') {
                mode = arguments[i];
              }
            }            // getFloatFrequencyData doesnt work in Safari as of 5/2015

            if (mode && !p5.prototype._isSafari()) {
              timeToFloat(this, this.timeDomain);
              this.analyser.getFloatTimeDomainData(this.timeDomain);
              return this.timeDomain;
            } else {
              timeToInt(this, this.timeDomain);
              this.analyser.getByteTimeDomainData(this.timeDomain);
              for (let j = 0; j < this.timeDomain.length; j++) {
                let scaled = p5.prototype.map(this.timeDomain[j], 0, 255, - 1, 1);
                normalArray.push(scaled);
              }
              return normalArray;
            }
          }          /**
   *  Returns an array of amplitude values (between 0 and 255)
   *  across the frequency spectrum. Length is equal to FFT bins
   *  (1024 by default). The array indices correspond to frequencies
   *  (i.e. pitches), from the lowest to the highest that humans can
   *  hear. Each value represents amplitude at that slice of the
   *  frequency spectrum. Must be called prior to using
   *  <code>getEnergy()</code>.
   *
   *  @method analyze
   *  @for AnalyzerFFT
   *  @param {Number} [bins]    Must be a power of two between
   *                             16 and 1024. Defaults to 1024.
   *  @param {Number} [scale]    If "dB," returns decibel
   *                             float measurements between
   *                             -140 and 0 (max).
   *                             Otherwise returns integers from 0-255.
   *  @return {Array} spectrum    Array of energy (amplitude/volume)
   *                              values across the frequency spectrum.
   *                              Lowest energy (silence) = 0, highest
   *                              possible is 255.
   *  @example
   *  <div><code>
   *  let osc, fft;
   *
   *  function setup(){
   *    let cnv = createCanvas(100,100);
   *    cnv.mousePressed(startSound);
   *    osc = new Oscillator();
   *    osc.amp(0);
   *    fft = new AnalyzerFFT();
   *  }
   *
   *  function draw(){
   *    background(220);
   *
   *    let freq = map(mouseX, 0, windowWidth, 20, 10000);
   *    freq = constrain(freq, 1, 20000);
   *    osc.freq(freq);
   *
   *    let spectrum = fft.analyze();
   *    noStroke();
   *    fill(255, 0, 255);
   *    for (let i = 0; i< spectrum.length; i++){
   *      let x = map(i, 0, spectrum.length, 0, width);
   *      let h = -height + map(spectrum[i], 0, 255, height, 0);
   *      rect(x, height, width / spectrum.length, h );
   *    }
   *
   *    stroke(255);
   *    if (!osc.started) {
   *      text('tap here and drag to change frequency', 10, 20, width - 20);
   *    } else {
   *      text(round(freq)+'Hz', 10, 20);
   *    }
   *  }
   *
   *  function startSound() {
   *    osc.start();
   *    osc.amp(0.5, 0.2);
   *  }
   *
   *  function mouseReleased() {
   *    osc.amp(0, 0.2);
   *  }
   *  </code></div>
   *
   *
   */

          analyze() {
            let mode;
            for (let i = 0; i < arguments.length; i++) {
              if (typeof arguments[i] === 'number') {
                this.bins = arguments[i];
              }
              if (typeof arguments[i] === 'string') {
                mode = arguments[i];
              }
            }
            if (mode && mode.toLowerCase() === 'db') {
              freqToFloat(this);
              this.analyser.getFloatFrequencyData(this.freqDomain);
              return this.freqDomain;
            } else {
              freqToInt(this, this.freqDomain);
              this.analyser.getByteFrequencyData(this.freqDomain);
              let normalArray = Array.apply([], this.freqDomain);
              return normalArray;
            }
          }          /**
   *  Returns the amount of energy (volume) at a specific
   *  <a href="https://en.wikipedia.org/wiki/Audio_frequency" target="_blank">
   *  frequency</a>, or the average amount of energy between two
   *  frequencies. Accepts Number(s) corresponding
   *  to frequency (in Hz) (frequency must be >= 0), or a "string" corresponding to predefined
   *  frequency ranges ("bass", "lowMid", "mid", "highMid", "treble").
   *  Returns a range between 0 (no energy/volume at that frequency) and
   *  255 (maximum energy).
   *  <em>NOTE: analyze() must be called prior to getEnergy(). analyze()
   *  tells the FFT to analyze frequency data, and getEnergy() uses
   *  the results to determine the value at a specific frequency or
   *  range of frequencies.</em></p>
   *
   *  @method  getEnergy
   *  @for p5sound.FFT
   *  @param  {Number|String} frequency1   Will return a value representing
   *                                energy at this frequency. Alternately,
   *                                the strings "bass", "lowMid" "mid",
   *                                "highMid", and "treble" will return
   *                                predefined frequency ranges.
   *  @param  {Number} [frequency2] If a second frequency is given,
   *                                will return average amount of
   *                                energy that exists between the
   *                                two frequencies.
   *  @return {Number}  Energy (volume/amplitude) from
   *                    0 and 255.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          getEnergy(frequency1, frequency2) {
            let nyquist = _audioContext.default.sampleRate / 2;
            if (frequency1 === 'bass') {
              frequency1 = this.bass[0];
              frequency2 = this.bass[1];
            } else if (frequency1 === 'lowMid') {
              frequency1 = this.lowMid[0];
              frequency2 = this.lowMid[1];
            } else if (frequency1 === 'mid') {
              frequency1 = this.mid[0];
              frequency2 = this.mid[1];
            } else if (frequency1 === 'highMid') {
              frequency1 = this.highMid[0];
              frequency2 = this.highMid[1];
            } else if (frequency1 === 'treble') {
              frequency1 = this.treble[0];
              frequency2 = this.treble[1];
            }
            if (typeof frequency1 !== 'number') {
              throw 'invalid input for getEnergy()';
            }
            if (typeof frequency2 !== 'number') {
              // if only one parameter:
              let index = Math.round(frequency1 / nyquist * this.freqDomain.length);
              return this.freqDomain[index];
            }
            if (frequency1 < 0 || frequency2 < 0) {
              throw 'invalid input for getEnergy(), frequency cannot be a negative number';
            }            // if two parameters:
            // if second is higher than first

            if (frequency1 > frequency2) {
              let swap = frequency2;
              frequency2 = frequency1;
              frequency1 = swap;
            }
            let lowIndex = Math.round(frequency1 / nyquist * this.freqDomain.length);
            let highIndex = Math.round(frequency2 / nyquist * this.freqDomain.length);
            let total = 0;
            let numFrequencies = 0;
            // add up all of the values for the frequencies
            for (let i = lowIndex; i <= highIndex; i++) {
              total += this.freqDomain[i];
              numFrequencies += 1;
            }            // divide by total number of frequencies

            let toReturn = total / numFrequencies;
            return toReturn;
          }          /**
   *  Returns the
   *  <a href="http://en.wikipedia.org/wiki/Spectral_centroid" target="_blank">
   *  spectral centroid</a> of the input signal.
   *  <em>NOTE: analyze() must be called prior to getCentroid(). Analyze()
   *  tells the FFT to analyze frequency data, and getCentroid() uses
   *  the results determine the spectral centroid.</em></p>
   *
   *  @method  getCentroid
   *  @for AnalyzerFFT
   *  @return {Number}   Spectral Centroid Frequency  of the spectral centroid in Hz.
   *
   *
   * @example
   *  <div><code>
   * function setup(){
   *  cnv = createCanvas(100,100);
   *  cnv.mousePressed(userStartAudio);
   *  sound = new p5.AudioIn();
   *  sound.start();
   *  fft = new AnalyzerFFT();
   *  sound.connect(fft);
   *}
   *
   *function draw() {
   *  if (getAudioContext().state !== 'running') {
   *    background(220);
   *    text('tap here and enable mic to begin', 10, 20, width - 20);
   *    return;
   *  }
   *  let centroidplot = 0.0;
   *  let spectralCentroid = 0;
   *
   *  background(0);
   *  stroke(0,255,0);
   *  let spectrum = fft.analyze();
   *  fill(0,255,0); // spectrum is green
   *
   *  //draw the spectrum
   *  for (let i = 0; i < spectrum.length; i++){
   *    let x = map(log(i), 0, log(spectrum.length), 0, width);
   *    let h = map(spectrum[i], 0, 255, 0, height);
   *    let rectangle_width = (log(i+1)-log(i))*(width/log(spectrum.length));
   *    rect(x, height, rectangle_width, -h )
   *  }
   *  let nyquist = 22050;
   *
   *  // get the centroid
   *  spectralCentroid = fft.getCentroid();
   *
   *  // the mean_freq_index calculation is for the display.
   *  let mean_freq_index = spectralCentroid/(nyquist/spectrum.length);
   *
   *  centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);
   *
   *  stroke(255,0,0); // the line showing where the centroid is will be red
   *
   *  rect(centroidplot, 0, width / spectrum.length, height)
   *  noStroke();
   *  fill(255,255,255);  // text is white
   *  text('centroid: ', 10, 20);
   *  text(round(spectralCentroid)+' Hz', 10, 40);
   *}
   * </code></div>
   */

          getCentroid() {
            let nyquist = _audioContext.default.sampleRate / 2;
            let cumulative_sum = 0;
            let centroid_normalization = 0;
            for (let i = 0; i < this.freqDomain.length; i++) {
              cumulative_sum += i * this.freqDomain[i];
              centroid_normalization += this.freqDomain[i];
            }
            let mean_freq_index = 0;
            if (centroid_normalization !== 0) {
              mean_freq_index = cumulative_sum / centroid_normalization;
            }
            let spec_centroid_freq = mean_freq_index * (nyquist / this.freqDomain.length);
            return spec_centroid_freq;
          }          /**
   *  Smooth FFT analysis by averaging with the last analysis frame.
   *
   *  @method smooth
   *  @param {Number} smoothing    0.0 < smoothing < 1.0.
   *                               Defaults to 0.8.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          smooth(s) {
            if (typeof s !== 'undefined') {
              this.smoothing = s;
            }
            return this.smoothing;
          }
          dispose() {
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            if (this.analyser) {
              this.analyser.disconnect();
              delete this.analyser;
            }
          }          /**
   *  Returns an array of average amplitude values for a given number
   *  of frequency bands split equally. N defaults to 16.
   *  <em>NOTE: analyze() must be called prior to linAverages(). Analyze()
   *  tells the FFT to analyze frequency data, and linAverages() uses
   *  the results to group them into a smaller set of averages.</em></p>
   *
   *  @method  linAverages
   *  @for AnalyzerFFT
   *  @param  {Number}  N                Number of returned frequency groups
   *  @return {Array}   linearAverages   Array of average amplitude values for each group
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          linAverages(_N) {
            let N = _N || 16; // This prevents undefined, null or 0 values of N
            let spectrum = this.freqDomain;
            let spectrumLength = spectrum.length;
            let spectrumStep = Math.floor(spectrumLength / N);
            let linearAverages = new Array(N);
            // Keep a second index for the current average group and place the values accordingly
            // with only one loop in the spectrum data
            let groupIndex = 0;
            for (let specIndex = 0; specIndex < spectrumLength; specIndex++) {
              linearAverages[groupIndex] = linearAverages[groupIndex] !== undefined ? (linearAverages[groupIndex] + spectrum[specIndex]) / 2 : spectrum[specIndex];
              // Increase the group index when the last element of the group is processed
              if (specIndex % spectrumStep === spectrumStep - 1) {
                groupIndex++;
              }
            }
            return linearAverages;
          }          /**
   *  Returns an array of average amplitude values of the spectrum, for a given
   *  set of <a href="https://en.wikipedia.org/wiki/Octave_band" target="_blank">
   *  Octave Bands</a>
   *  <em>NOTE: analyze() must be called prior to logAverages(). Analyze()
   *  tells the FFT to analyze frequency data, and logAverages() uses
   *  the results to group them into a smaller set of averages.</em></p>
   *
   *  @method  logAverages
   *  @for AnalyzerFFT
   *  @param  {Array}   octaveBands    Array of Octave Bands objects for grouping
   *  @return {Array}   logAverages    Array of average amplitude values for each group
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          logAverages(octaveBands) {
            let nyquist = _audioContext.default.sampleRate / 2;
            let spectrum = this.freqDomain;
            let spectrumLength = spectrum.length;
            let logAverages = new Array(octaveBands.length);
            // Keep a second index for the current average group and place the values accordingly
            // With only one loop in the spectrum data
            let octaveIndex = 0;
            for (let specIndex = 0; specIndex < spectrumLength; specIndex++) {
              let specIndexFrequency = Math.round(specIndex * nyquist / this.freqDomain.length);
              // Increase the group index if the current frequency exceeds the limits of the band
              if (specIndexFrequency > octaveBands[octaveIndex].hi) {
                octaveIndex++;
              }
              logAverages[octaveIndex] = logAverages[octaveIndex] !== undefined ? (logAverages[octaveIndex] + spectrum[specIndex]) / 2 : spectrum[specIndex];
            }
            return logAverages;
          }          /**
   *  Calculates and Returns the 1/N
   *  <a href="https://en.wikipedia.org/wiki/Octave_band" target="_blank">Octave Bands</a>
   *  N defaults to 3 and minimum central frequency to 15.625Hz.
   *  (1/3 Octave Bands ~= 31 Frequency Bands)
   *  Setting fCtr0 to a central value of a higher octave will ignore the lower bands
   *  and produce less frequency groups.
   *
   *  @method   getOctaveBands
   *  @for AnalyzerFFT
   *  @param  {Number}  N             Specifies the 1/N type of generated octave bands
   *  @param  {Number}  fCtr0         Minimum central frequency for the lowest band
   *  @return {Array}   octaveBands   Array of octave band objects with their bounds
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          getOctaveBands(_N, _fCtr0) {
            let N = _N || 3; // Default to 1/3 Octave Bands
            let fCtr0 = _fCtr0 || 15.625; // Minimum central frequency, defaults to 15.625Hz
            let octaveBands = [
            ];
            let lastFrequencyBand = {
              lo: fCtr0 / Math.pow(2, 1 / (2 * N)),
              ctr: fCtr0,
              hi: fCtr0 * Math.pow(2, 1 / (2 * N))
            };
            octaveBands.push(lastFrequencyBand);
            let nyquist = _audioContext.default.sampleRate / 2;
            while (lastFrequencyBand.hi < nyquist) {
              let newFrequencyBand = {
              };
              newFrequencyBand.lo = lastFrequencyBand.hi;
              newFrequencyBand.ctr = lastFrequencyBand.ctr * Math.pow(2, 1 / N);
              newFrequencyBand.hi = newFrequencyBand.ctr * Math.pow(2, 1 / (2 * N));
              octaveBands.push(newFrequencyBand);
              lastFrequencyBand = newFrequencyBand;
            }
            return octaveBands;
          }
          _onNewInput() {
            //  disconnect FFT from sketch when something is connected
            _main.default.fftMeter.disconnect();
          }
        }        // helper methods to convert type from float (dB) to int (0-255)

        function freqToFloat(fft) {
          if (fft.freqDomain instanceof Float32Array === false) {
            fft.freqDomain = new Float32Array(fft.analyser.frequencyBinCount);
          }
        }
        function freqToInt(fft) {
          if (fft.freqDomain instanceof Uint8Array === false) {
            fft.freqDomain = new Uint8Array(fft.analyser.frequencyBinCount);
          }
        }
        function timeToFloat(fft) {
          if (fft.timeDomain instanceof Float32Array === false) {
            fft.timeDomain = new Float32Array(fft.analyser.frequencyBinCount);
          }
        }
        function timeToInt(fft) {
          if (fft.timeDomain instanceof Uint8Array === false) {
            fft.timeDomain = new Uint8Array(fft.analyser.frequencyBinCount);
          }
        }
        var _default = exports.default = AnalyzerFFT;
      },
      {
        './audioContext': 15,
        './main': 20
      }
    ],
    4: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _Amplitude = _interopRequireDefault(_dereq_('./Amplitude'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        // an array of input sources

        _main.default.inputSources = [
        ];
        /**
 *  <p>Get audio from an input, i.e. your computer's microphone.</p>
 *
 *  <p>Turn the mic on/off with the start() and stop() methods. When the mic
 *  is on, its volume can be measured with getLevel or by connecting an
 *  FFT object.</p>
 *
 *  <p>If you want to hear the AudioIn, use the .connect() method.
 *  AudioIn does not connect to p5.sound output by default to prevent
 *  feedback.</p>
 *
 *  <p><em>Note: This uses the <a href="http://caniuse.com/stream">getUserMedia/
 *  Stream</a> API, which is not supported by certain browsers. Access in Chrome browser
 *  is limited to localhost and https, but access over http may be limited.</em></p>
 *
 *  @class p5.AudioIn
 *  @constructor
 *  @param {Function} [errorCallback] A function to call if there is an error
 *                                    accessing the AudioIn. For example,
 *                                    Safari and iOS devices do not
 *                                    currently allow microphone access.
 *  @example
 *  <div><code>
 *  let mic;
 *
 *   function setup(){
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(userStartAudio);
 *    textAlign(CENTER);
 *    mic = new p5.AudioIn();
 *    mic.start();
 *  }
 *
 *  function draw(){
 *    background(0);
 *    fill(255);
 *    text('tap to start', width/2, 20);
 *
 *    micLevel = mic.getLevel();
 *    let y = height - micLevel * height;
 *    ellipse(width/2, y, 10, 10);
 *  }
 *  </code></div>
 */
        class AudioIn {
          constructor(errorCallback) {
            /**
     * Set up audio input
     * @property {GainNode} input
     */
            this.input = _audioContext.default.createGain();
            /**
     * Send audio as an output, i.e. your computer's speaker.
     * @property {GainNode} output
     */
            this.output = _audioContext.default.createGain();
            /**
     * Used to store the MediaStream object that is returned from the getUserMedia() API,
     * which allows access to the user's microphone. The stream is used to create a MediaStreamAudioSourceNode,
     * which is used as the audio source for the input and output gain nodes.
     * The stream is also used to check if the browser supports the MediaStreamTrack and mediaDevices API,
     * and if not, an errorCallback function is called or an alert is displayed.
     * @property {MediaStream|null} stream
     */
            this.stream = null;
            /**
     * Used to access the "audio input" from the user's microphone.
     * It creates a MediaStream object that can be used to start and stop the mic and measure its volume using the getLevel() method or by connecting it to an FFT object.
     * MediaStream object can also be use to check if the browser supports MediaStreamTrack and mediaDevices and to add the AudioIn object to the soundArray for disposal on close.
     * @property {MediaStreamAudioSourceNode|null} mediaStream
     */
            this.mediaStream = null;
            /**
     * Used to store the "current source of audio input", such as the user's microphone.
     * Initially set to "null" and can be updated as the user selects different audio sources.
     * Also used in conjunction with the "input" and "mediaStream" properties to control audio input.
     * @property {Number|null} currentSource
     */
            this.currentSource = null;
            /**
     *  Client must allow browser to access their microphone / audioin source.
     *  Default: false. Will become true when the client enables access.
     *  @property {Boolean} enabled
     */
            this.enabled = false;
            /**
     * Input amplitude, connect to it by default but not to master out
     *  @property {p5.Amplitude} amplitude
     */
            this.amplitude = new _Amplitude.default();
            this.output.connect(this.amplitude.input);
            if (!window.MediaStreamTrack || !window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
              errorCallback ? errorCallback() : window.alert('This browser does not support MediaStreamTrack and mediaDevices');
            }            // add to soundArray so we can dispose on close

            _main.default.soundArray.push(this);
          }          /**
   *  Start processing audio input. This enables the use of other
   *  AudioIn methods like getLevel(). Note that by default, AudioIn
   *  is not connected to p5.sound's output. So you won't hear
   *  anything unless you use the connect() method.<br/>
   *
   *  Certain browsers limit access to the user's microphone. For example,
   *  Chrome only allows access from localhost and over https. For this reason,
   *  you may want to include an errorCallback—a function that is called in case
   *  the browser won't provide mic access.
   *
   *  @method start
   *  @for p5.AudioIn
   *  @param {Function} [successCallback] Name of a function to call on
   *                                    success.
   *  @param {Function} [errorCallback] Name of a function to call if
   *                                    there was an error. For example,
   *                                    some browsers do not support
   *                                    getUserMedia.
   */

          start(successCallback, errorCallback) {
            let self = this;
            if (this.stream) {
              this.stop();
            }            // set the audio source

            let audioSource = _main.default.inputSources[self.currentSource];
            let constraints = {
              audio: {
                sampleRate: _audioContext.default.sampleRate,
                echoCancellation: false
              }
            };
            // if developers determine which source to use
            if (_main.default.inputSources[this.currentSource]) {
              constraints.audio.deviceId = audioSource.deviceId;
            }
            window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
              self.stream = stream;
              self.enabled = true;
              // Wrap a MediaStreamSourceNode around the live input
              self.mediaStream = _audioContext.default.createMediaStreamSource(stream);
              self.mediaStream.connect(self.output);
              // only send to the Amplitude reader, so we can see it but not hear it.
              self.amplitude.setInput(self.output);
              if (successCallback) successCallback();
            }).catch(function (err) {
              if (errorCallback) errorCallback(err);
               else console.error(err);
            });
          }          /**
   *  Turn the AudioIn off. If the AudioIn is stopped, it cannot getLevel().
   *  If re-starting, the user may be prompted for permission access.
   *
   *  @method stop
   *  @for p5.AudioIn
   */

          stop() {
            if (this.stream) {
              this.stream.getTracks().forEach(function (track) {
                track.stop();
              });
              this.mediaStream.disconnect();
              delete this.mediaStream;
              delete this.stream;
            }
          }          /**
   *  Connect to an audio unit. If no parameter is provided, will
   *  connect to the main output (i.e. your speakers).<br/>
   *
   *  @method  connect
   *  @for p5.AudioIn
   *  @param  {Object} [unit] An object that accepts audio input,
   *                          such as an FFT
   */

          connect(unit) {
            if (unit) {
              if (unit.hasOwnProperty('input')) {
                this.output.connect(unit.input);
              } else if (unit.hasOwnProperty('analyser')) {
                this.output.connect(unit.analyser);
              } else {
                this.output.connect(unit);
              }
            } else {
              this.output.connect(_main.default.input);
            }
            if (unit && unit._onNewInput) {
              unit._onNewInput(this);
            }
          }          /**
   *  Disconnect the AudioIn from all audio units. For example, if
   *  connect() had been called, disconnect() will stop sending
   *  signal to your speakers.<br/>
   *
   *  @method  disconnect
   *  @for p5.AudioIn
   */

          disconnect() {
            if (this.output) {
              this.output.disconnect();
              // stay connected to amplitude even if not outputting to p5
              this.output.connect(this.amplitude.input);
            }
          }          /**
   *  Read the Amplitude (volume level) of an AudioIn. The AudioIn
   *  class contains its own instance of the Amplitude class to help
   *  make it easy to get a microphone's volume level. Accepts an
   *  optional smoothing value (0.0 < 1.0). <em>NOTE: AudioIn must
   *  .start() before using .getLevel().</em><br/>
   *
   *  @method  getLevel
   *  @for p5.AudioIn
   *  @param  {Number} [smoothing] Smoothing is 0.0 by default.
   *                               Smooths values based on previous values.
   *  @return {Number}           Volume level (between 0.0 and 1.0)
   */

          getLevel(smoothing) {
            if (smoothing) {
              this.amplitude.smooth(smoothing);
            }
            return this.amplitude.getLevel();
          }          /**
   *  Set amplitude (volume) of a mic input between 0 and 1.0. <br/>
   *
   *  @method  amp
   *  @for p5.AudioIn
   *  @param  {Number} vol between 0 and 1.0
   *  @param {Number} [time] ramp time (optional)
   */

          amp(vol, t) {
            if (t) {
              let rampTime = t || 0;
              let currentVol = this.output.gain.value;
              this.output.gain.cancelScheduledValues(_audioContext.default.currentTime);
              this.output.gain.setValueAtTime(currentVol, _audioContext.default.currentTime);
              this.output.gain.linearRampToValueAtTime(vol, rampTime + _audioContext.default.currentTime);
            } else {
              this.output.gain.cancelScheduledValues(_audioContext.default.currentTime);
              this.output.gain.setValueAtTime(vol, _audioContext.default.currentTime);
            }
          }          /**
   * Returns a list of available input sources. This is a wrapper
   * for <a href="https://developer.mozilla.org/
   * en-US/docs/Web/API/MediaDevices/enumerateDevices" target="_blank">
   * MediaDevices.enumerateDevices() - Web APIs | MDN</a>
   * and it returns a Promise.
   * @method  getSources
   * @for p5.AudioIn
   * @param  {Function} [successCallback] This callback function handles the sources when they
   *                                      have been enumerated. The callback function
   *                                      receives the deviceList array as its only argument
   * @param  {Function} [errorCallback] This optional callback receives the error
   *                                    message as its argument.
   * @returns {Promise} Returns a Promise that can be used in place of the callbacks, similar
   *                            to the enumerateDevices() method
   * @example
   *  <div><code>
   *  let audioIn;
   *
   *  function setup(){
   *    text('getting sources...', 0, 20);
   *    audioIn = new p5.AudioIn();
   *    audioIn.getSources(gotSources);
   *  }
   *
   *  function gotSources(deviceList) {
   *    if (deviceList.length > 0) {
   *      //set the source to the first item in the deviceList array
   *      audioIn.setSource(0);
   *      let currentSource = deviceList[audioIn.currentSource];
   *      text('set source to: ' + currentSource.deviceId, 5, 20, width);
   *    }
   *  }
   *  </code></div>
   */

          getSources(onSuccess, onError) {
            return new Promise(function (resolve, reject) {
              window.navigator.mediaDevices.enumerateDevices().then(function (devices) {
                _main.default.inputSources = devices.filter(function (device) {
                  return device.kind === 'audioinput';
                });
                resolve(_main.default.inputSources);
                if (onSuccess) {
                  onSuccess(_main.default.inputSources);
                }
              }).catch(function (error) {
                reject(error);
                if (onError) {
                  onError(error);
                } else {
                  console.error('This browser does not support MediaStreamTrack.getSources()');
                }
              });
            });
          }          /**
   *  Set the input source. Accepts a number representing a
   *  position in the array returned by getSources().
   *  This is only available in browsers that support
   * <a href="https://developer.mozilla.org/
   * en-US/docs/Web/API/MediaDevices/enumerateDevices" target="_blank">
   * navigator.mediaDevices.enumerateDevices()</a>
   *
   *  @method setSource
   *  @for p5.AudioIn
   *  @param {number} num position of input source in the array
   *  @example
   *  <div><code>
   *  let audioIn;
   *
   *  function setup(){
   *    text('getting sources...', 0, 20);
   *    audioIn = new p5.AudioIn();
   *    audioIn.getSources(gotSources);
   *  }
   *
   *  function gotSources(deviceList) {
   *    if (deviceList.length > 0) {
   *      //set the source to the first item in the deviceList array
   *      audioIn.setSource(0);
   *      let currentSource = deviceList[audioIn.currentSource];
   *      text('set source to: ' + currentSource.deviceId, 5, 20, width);
   *    }
   *  }
   *  </code></div>
   */

          setSource(num) {
            if (_main.default.inputSources.length > 0 && num < _main.default.inputSources.length) {
              // set the current source
              this.currentSource = num;
              console.log('set source to ', _main.default.inputSources[this.currentSource]);
            } else {
              console.log('unable to set input source');
            }            // restart stream if currently active

            if (this.stream && this.stream.active) {
              this.start();
            }
          }          // private method

          dispose() {
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            this.stop();
            if (this.output) {
              this.output.disconnect();
            }
            if (this.amplitude) {
              this.amplitude.dispose();
            }
            delete this.amplitude;
            delete this.output;
          }
        }
        var _default = exports.default = AudioIn;
      },
      {
        './Amplitude': 2,
        './audioContext': 15,
        './main': 20
      }
    ],
    5: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = exports.LowPass = exports.HighPass = exports.BandPass = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _Effect = _interopRequireDefault(_dereq_('./Effect'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        /**
 *  <p>A BiquadFilter uses a Web Audio Biquad Filter to filter
 *  the frequency response of an input source. Subclasses
 *  include:</p>
 *  <a href="/reference/#/LowPass"><code>LowPass</code></a>:
 *  Allows frequencies below the cutoff frequency to pass through,
 *  and attenuates frequencies above the cutoff.<br/>
 *  <a href="/reference/#/HighPass"><code>HighPass</code></a>:
 *  The opposite of a lowpass filter. <br/>
 *  <a href="/reference/#/BandPass"><code>BandPass</code></a>:
 *  Allows a range of frequencies to pass through and attenuates
 *  the frequencies below and above this frequency range.<br/>
 *
 *  The <code>.res()</code> method controls either width of the
 *  bandpass, or resonance of the low/highpass cutoff frequency.
 *
 *  This class extends <a href = "/reference/#/Effect">Effect</a>.
 *  Methods <a href = "/reference/#/Effect/amp">amp()</a>, <a href = "/reference/#/Effect/chain">chain()</a>,
 *  <a href = "/reference/#/Effect/drywet">drywet()</a>, <a href = "/reference/#/Effect/connect">connect()</a>, and
 *  <a href = "/reference/#/Effect/disconnect">disconnect()</a> are available.
 *
 *  @class BiquadFilter
 *  @extends Effect
 *  @constructor
 *  @param {String} [type] 'lowpass' (default), 'highpass', 'bandpass'
 *  @example
 *  <div><code>
 *  let fft, noise, filter;
 *
 *  function setup() {
 *    let cnv = createCanvas(100,100);
 *    cnv.mousePressed(makeNoise);
 *    fill(255, 0, 255);
 *
 *    filter = new BandPass();
 *    noise = new Noise();
 *    noise.disconnect();
 *    noise.connect(filter);
 *
 *    fft = new AnalyzerFFT();
 *  }
 *
 *  function draw() {
 *    background(220);
 *
 *    // set the BandPass frequency based on mouseX
 *    let freq = map(mouseX, 0, width, 20, 10000);
 *    freq = constrain(freq, 0, 22050);
 *    filter.freq(freq);
 *    // give the filter a narrow band (lower res = wider bandpass)
 *    filter.res(50);
 *
 *    // draw filtered spectrum
 *    let spectrum = fft.analyze();
 *    noStroke();
 *    for (let i = 0; i < spectrum.length; i++) {
 *      let x = map(i, 0, spectrum.length, 0, width);
 *      let h = -height + map(spectrum[i], 0, 255, height, 0);
 *      rect(x, height, width/spectrum.length, h);
 *    }
 *    if (!noise.started) {
 *      text('tap here and drag to change frequency', 10, 20, width - 20);
 *    } else {
 *      text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);
 *    }
 *  }
 *
 *  function makeNoise() {
 *    // see also: `userStartAudio()`
 *    noise.start();
 *    noise.amp(0.5, 0.2);
 *  }
 *
 *  function mouseReleased() {
 *    noise.amp(0, 0.2);
 *  }
 *
 *  </code></div>
 */

        class BiquadFilter extends _Effect.default {
          constructor(type) {
            super ();
            this.biquad = _audioContext.default.createBiquadFilter();
            this.input.connect(this.biquad);
            // this.biquad.connect(this.output);
            this.biquad.connect(this.wet);
            if (type) {
              this.setType(type);
            }
            this._on = true;
            this._untoggledType = this.biquad.type;
          }          /**
   *  Filter an audio signal according to a set
   *  of filter parameters.
   *
   *  @method  process
   *  @param {Object} src An object that outputs audio
   *  @param {Number} [freq] Frequency in Hz, from 10 to 22050
   *  @param {Number} [res] Resonance/Width of the filter frequency
   *                        from 0.001 to 1000
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          process(src, freq, res, time) {
            src.connect(this.input);
            this.set(freq, res, time);
          }          /**
   *  Set the frequency and the resonance of the filter.
   *
   *  @method  set
   *  @param {Number} [freq] Frequency in Hz, from 10 to 22050
   *  @param {Number} [res]  Resonance (Q) from 0.001 to 1000
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          set(freq, res, time) {
            if (freq) {
              this.freq(freq, time);
            }
            if (res) {
              this.res(res, time);
            }
          }          /**
   *  Set the filter frequency, in Hz, from 10 to 22050 (the range of
   *  human hearing, although in reality most people hear in a narrower
   *  range).
   *
   *  @method  freq
   *  @param  {Number} freq Filter Frequency
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @return {Number} value  Returns the current frequency value
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          freq(freq, time) {
            let t = time || 0;
            if (freq <= 0) {
              freq = 1;
            }
            if (typeof freq === 'number') {
              this.biquad.frequency.cancelScheduledValues(_audioContext.default.currentTime + 0.01 + t);
              this.biquad.frequency.exponentialRampToValueAtTime(freq, _audioContext.default.currentTime + 0.02 + t);
            } else if (freq) {
              freq.connect(this.biquad.frequency);
            }
            return this.biquad.frequency.value;
          }          /**
   *  Controls either width of a bandpass frequency,
   *  or the resonance of a low/highpass cutoff frequency.
   *
   *  @method  res
   *  @param {Number} res  Resonance/Width of filter freq
   *                       from 0.001 to 1000
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @return {Number} value Returns the current res value
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          res(res, time) {
            let t = time || 0;
            if (typeof res === 'number') {
              this.biquad.Q.value = res;
              this.biquad.Q.cancelScheduledValues(_audioContext.default.currentTime + 0.01 + t);
              this.biquad.Q.linearRampToValueAtTime(res, _audioContext.default.currentTime + 0.02 + t);
            } else if (res) {
              res.connect(this.biquad.Q);
            }
            return this.biquad.Q.value;
          }          /**
   * Controls the gain attribute of a Biquad Filter.
   * This is distinctly different from .amp() which is inherited from Effect
   * .amp() controls the volume via the output gain node
   * BiquadFilter.gain() controls the gain parameter of a Biquad Filter node.
   *
   * @method gain
   * @param  {Number} gain
   * @return {Number} Returns the current or updated gain value
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          gain(gain, time) {
            let t = time || 0;
            if (typeof gain === 'number') {
              this.biquad.gain.value = gain;
              this.biquad.gain.cancelScheduledValues(_audioContext.default.currentTime + 0.01 + t);
              this.biquad.gain.linearRampToValueAtTime(gain, _audioContext.default.currentTime + 0.02 + t);
            } else if (gain) {
              gain.connect(this.biquad.gain);
            }
            return this.biquad.gain.value;
          }          /**
   * Toggle function. Switches between the specified type and allpass
   *
   * @method toggle
   * @return {boolean} [Toggle value]
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          toggle() {
            this._on = !this._on;
            if (this._on === true) {
              this.biquad.type = this._untoggledType;
            } else if (this._on === false) {
              this.biquad.type = 'allpass';
            }
            return this._on;
          }          /**
   *  Set the type of a BiquadFilter. Possible types include:
   *  "lowpass" (default), "highpass", "bandpass",
   *  "lowshelf", "highshelf", "peaking", "notch",
   *  "allpass".
   *
   *  @method  setType
   *  @param {String} t
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setType(t) {
            this.biquad.type = t;
            this._untoggledType = this.biquad.type;
          }
          dispose() {
            // remove reference from soundArray
            super.dispose();
            if (this.biquad) {
              this.biquad.disconnect();
              delete this.biquad;
            }
          }
        }        /**
 *  Constructor: <code>new LowPass()</code> BiquadFilter.
 *  This is the same as creating a BiquadFilter and then calling
 *  its method <code>setType('lowpass')</code>.
 *  See BiquadFilter for methods.
 *
 *  @class LowPass
 *  @constructor
 *  @extends BiquadFilter
 */

        class LowPass extends BiquadFilter {
          constructor() {
            super ('lowpass');
          }
        }        /**
*  Constructor: <code>new HighPass()</code> BiquadFilter.
*  This is the same as creating a BiquadFilter and then calling
*  its method <code>setType('highpass')</code>.
*  See BiquadFilter for methods.
*
*  @class HighPass
*  @constructor
*  @extends BiquadFilter
*/

        exports.LowPass = LowPass;
        class HighPass extends BiquadFilter {
          constructor() {
            super ('highpass');
          }
        }        /**
*  Constructor: <code>new BandPass()</code> BiquadFilter.
*  This is the same as creating a BiquadFilter and then calling
*  its method <code>setType('bandpass')</code>.
*  See BiquadFilter for methods.
*
*  @class BandPass
*  @constructor
*  @extends BiquadFilter
*/

        exports.HighPass = HighPass;
        class BandPass extends BiquadFilter {
          constructor() {
            super ('bandpass');
          }
        }
        exports.BandPass = BandPass;
        var _default = exports.default = BiquadFilter;
      },
      {
        './Effect': 7,
        './audioContext': 15
      }
    ],
    6: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _BiquadFilter = _interopRequireDefault(_dereq_('./BiquadFilter'));
        var _Effect = _interopRequireDefault(_dereq_('./Effect'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        /**
 * Delay is an echo effect. it processes an existing sound source,
 * and outputs a delayed version of that sound. the Delay can
 * produce different effects depending on the delayTime, feedback,
 * filter, and type. in the example below, a feedback of 0.5 (the
 * default value) will produce a looping delay that decreases in
 * volume by 50% each repeat.
 *
 *
 * This class extends Effect
 *
 * @class Delay
 * @extends Effect
 * @constructor
 * @example
 * <div><code>
 * let osc;
 *
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   background(220);
 *   textAlign(CENTER);
 *   text('tap to play', width/2, height/2);
 *
 *   osc = new Oscillator('square');
 *   osc.amp(0.5);
 *   delay = new Delay();
 *
 *   // delay.process() accepts 4 parameters:
 *   // source, delaytime (in seconds), feedback, filter frequency
 *   delay.process(osc, 0.12, 0.7, 2300);
 *   cnv.mousePressed(oscStart);
 * }
 *
 * function oscStart() {
 *   osc.start();
 * }
 *
 * function mouseReleased() {
 *   osc.stop();
 * }
 * </code></div>
 */

        class Delay extends _Effect.default {
          constructor() {
            super ();
            this._split = _audioContext.default.createChannelSplitter(2);
            this._merge = _audioContext.default.createChannelMerger(2);
            this._leftGain = _audioContext.default.createGain();
            this._rightGain = _audioContext.default.createGain();
            /**
     *  The Delay is built with two
     *  <a href="http://www.w3.org/TR/webaudio/#DelayNode">
     *  Web Audio Delay Nodes</a>, one for each stereo channel.
     *
     *  @for Delay
     *  @property {DelayNode} leftDelay
     */
            this.leftDelay = _audioContext.default.createDelay();
            /**
     *  The Delay is built with two
     *  <a href="http://www.w3.org/TR/webaudio/#DelayNode">
     *  Web Audio Delay Nodes</a>, one for each stereo channel.
     *  @for Delay
     *  @property {DelayNode} rightDelay
     */
            this.rightDelay = _audioContext.default.createDelay();
            this._leftBiquadFilter = new _BiquadFilter.default();
            this._rightBiquadFilter = new _BiquadFilter.default();
            this._leftBiquadFilter.disconnect();
            this._rightBiquadFilter.disconnect();
            this._leftBiquadFilter.biquad.frequency.setValueAtTime(1200, _audioContext.default.currentTime);
            this._rightBiquadFilter.biquad.frequency.setValueAtTime(1200, _audioContext.default.currentTime);
            this._leftBiquadFilter.biquad.Q.setValueAtTime(0.3, _audioContext.default.currentTime);
            this._rightBiquadFilter.biquad.Q.setValueAtTime(0.3, _audioContext.default.currentTime);
            // graph routing
            this.input.connect(this._split);
            this.leftDelay.connect(this._leftGain);
            this.rightDelay.connect(this._rightGain);
            this._leftGain.connect(this._leftBiquadFilter.input);
            this._rightGain.connect(this._rightBiquadFilter.input);
            this._merge.connect(this.wet);
            this._leftBiquadFilter.biquad.gain.setValueAtTime(1, _audioContext.default.currentTime);
            this._rightBiquadFilter.biquad.gain.setValueAtTime(1, _audioContext.default.currentTime);
            // default routing
            this.setType(0);
            this._maxDelay = this.leftDelay.delayTime.maxValue;
            this.feedback(0.5);
          }
          process(src, _delayTime, _feedback, _filter) {
            let feedback = _feedback || 0;
            let delayTime = _delayTime || 0;
            if (feedback >= 1) {
              throw new Error('Feedback value will force a positive feedback loop.');
            }
            if (delayTime >= this._maxDelay) {
              throw new Error('Delay Time exceeds maximum delay time of ' + this._maxDelay + ' second.');
            }
            src.connect(this.input);
            this.leftDelay.delayTime.value = delayTime;
            this.rightDelay.delayTime.value = delayTime;
            this._leftGain.gain.value = feedback;
            this._rightGain.gain.value = feedback;
            if (_filter) {
              this._leftBiquadFilter.freq(_filter);
              this._rightBiquadFilter.freq(_filter);
            }
          }          /**
   *  Set the delay (echo) time, in seconds. Usually this value will be
   *  a floating point number between 0.0 and 1.0.
   *
   *  @method  delayTime
   *  @for Delay
   *  @param {Number} delayTime Time (in seconds) of the delay
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          delayTime(t) {
            // if t is an audio node...
            if (typeof t !== 'number') {
              t.connect(this.leftDelay.delayTime);
              t.connect(this.rightDelay.delayTime);
            } else {
              this.leftDelay.delayTime.cancelScheduledValues(_audioContext.default.currentTime);
              this.rightDelay.delayTime.cancelScheduledValues(_audioContext.default.currentTime);
              this.leftDelay.delayTime.linearRampToValueAtTime(t, _audioContext.default.currentTime);
              this.rightDelay.delayTime.linearRampToValueAtTime(t, _audioContext.default.currentTime);
            }
          }          /**
   *  Feedback occurs when Delay sends its signal back through its input
   *  in a loop. The feedback amount determines how much signal to send each
   *  time through the loop. A feedback greater than 1.0 is not desirable because
   *  it will increase the overall output each time through the loop,
   *  creating an infinite feedback loop. The default value is 0.5
   *
   *  @method  feedback
   *  @for Delay
   *  @param {Number|Object} feedback 0.0 to 1.0, or an object such as an
   *                                  Oscillator that can be used to
   *                                  modulate this param
   *  @returns {Number} Feedback value
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          feedback(f) {
            // if f is an audio node...
            if (f && typeof f !== 'number') {
              f.connect(this._leftGain.gain);
              f.connect(this._rightGain.gain);
            } else if (f >= 1) {
              throw new Error('Feedback value will force a positive feedback loop.');
            } else if (typeof f === 'number') {
              this._leftGain.gain.value = f;
              this._rightGain.gain.value = f;
            }            // return value of feedback

            return this._leftGain.gain.value;
          }          /**
   *  Set a lowpass filter frequency for the delay. A lowpass filter
   *  will cut off any frequencies higher than the filter frequency.
   *
   *  @method  filter
   *  @for Delay
   *  @param {Number|Object} cutoffFreq  A lowpass filter will cut off any
   *                              frequencies higher than the filter frequency.
   *  @param {Number|Object} res  Resonance of the filter frequency
   *                              cutoff, or an object (i.e. a Oscillator)
   *                              that can be used to modulate this parameter.
   *                              High numbers (i.e. 15) will produce a resonance,
   *                              low numbers (i.e. .2) will produce a slope.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          filter(freq, q) {
            this._leftBiquadFilter.set(freq, q);
            this._rightBiquadFilter.set(freq, q);
          }          /**
   *  Choose a preset type of delay. 'pingPong' bounces the signal
   *  from the left to the right channel to produce a stereo effect.
   *  Any other parameter will revert to the default delay setting.
   *
   *  @method  setType
   *  @for Delay
   *  @param {String|Number} type 'pingPong' (1) or 'default' (0)
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setType(t) {
            if (t === 1) {
              t = 'pingPong';
            }
            this._split.disconnect();
            this._leftBiquadFilter.disconnect();
            this._rightBiquadFilter.disconnect();
            this._split.connect(this.leftDelay, 0);
            this._split.connect(this.rightDelay, 1);
            switch (t) {
              case 'pingPong':
                this._rightBiquadFilter.setType(this._leftBiquadFilter.biquad.type);
                this._leftBiquadFilter.output.connect(this._merge, 0, 0);
                this._rightBiquadFilter.output.connect(this._merge, 0, 1);
                this._leftBiquadFilter.output.connect(this.rightDelay);
                this._rightBiquadFilter.output.connect(this.leftDelay);
                break;
              default:
                this._leftBiquadFilter.output.connect(this._merge, 0, 0);
                this._rightBiquadFilter.output.connect(this._merge, 0, 1);
                this._leftBiquadFilter.output.connect(this.leftDelay);
                this._rightBiquadFilter.output.connect(this.rightDelay);
            }
          }          // DocBlocks for methods inherited from p5.Effect
          /**
   *  Set the output level of the delay effect.
   *
   *  @method  amp
   *  @for Delay
   *  @param  {Number} volume amplitude between 0 and 1.0
   *  @param {Number} [rampTime] create a fade that lasts rampTime
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
          /**
   *  Send output to a p5.sound or web audio object
   *
   *  @method  connect
   *  @for Delay
   *  @param  {Object} unit
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
          /**
   *  Disconnect all output.
   *
   *  @method disconnect
   *  @for Delay
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          dispose() {
            super.dispose();
            this._split.disconnect();
            this._leftBiquadFilter.dispose();
            this._rightBiquadFilter.dispose();
            this._merge.disconnect();
            this._leftGain.disconnect();
            this._rightGain.disconnect();
            this.leftDelay.disconnect();
            this.rightDelay.disconnect();
            this._split = undefined;
            this._leftBiquadFilter = undefined;
            this._rightBiquadFilter = undefined;
            this._merge = undefined;
            this._leftGain = undefined;
            this._rightGain = undefined;
            this.leftDelay = undefined;
            this.rightDelay = undefined;
          }
        }
        var _default = exports.default = Delay;
      },
      {
        './BiquadFilter': 5,
        './Effect': 7,
        './audioContext': 15
      }
    ],
    7: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _tone = _dereq_('tone');
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        /**
 * Effect is a base class for audio effects in p5sound.
 * This module handles the nodes and methods that are
 * common and useful for current and future effects.
 *
 *
 * This class is extended by other effects.
 *
 * @class Effect
 * @constructor
 *
 * @param {Object} [audioContext] reference to the audio context of the p5 object
 * @param {AudioNode} [input] gain node effect wrapper
 * @param {AudioNode} [output] gain node effect wrapper
 *
 */

        class Effect {
          constructor() {
            this.input = _audioContext.default.createGain();
            this.output = _audioContext.default.createGain();
            this._drywet = new _tone.CrossFade(1);
            this.wet = _audioContext.default.createGain();
            this.input.connect(this._drywet.a);
            this.wet.connect(this._drywet.b);
            this._drywet.connect(this.output);
            this.connect();
            this.output.connect(_main.default.input);
            // this.input.gain.value = 0.5;
            // this.output.gain.value = 0.5;
            // this.input.connect(this.output);
            // this.output.connect(p5sound.input);
            _main.default.soundArray.push(this);
          }          /**
   * set the output volume of the filter
   *  @method amp
   * @for Effect
   * @param {Number} [vol] amplitude between 0.0 and 1.0
   * @param {Number} [rampTime] create a fade that lasts until rampTime
   * @param {Number} [tFromNow] schedule this event to happen in tFromNow
  * @example
  * <div><code>
  * function setup() {
  * console.log('TODO EXAMPLE');
  * }
  *
  * function draw() {
  * }
  * </code></div>
   */

          amp(vol, rampTime = 0, tFromNow = 0) {
            const now = _audioContext.default.currentTime;
            const startTime = now + tFromNow;
            const endTime = startTime + rampTime * 0.001;
            const currentVol = this.output.gain.value;
            this.output.gain.cancelScheduledValues(now);
            this.output.gain.linearRampToValueAtTime(currentVol, startTime + 0.001);
            this.output.gain.linearRampToValueAtTime(vol, endTime);
          }          /**
   * link effects together in a chain
   * example usage: filter.chain(reverb, delay, panner)
   * may be used with an open-ended number of arguments
   */

          chain() {
            if (arguments.length > 0) {
              this.connect(arguments[0]);
              for (let i = 0; i < arguments.length; i += 1) {
                arguments[i - 1].connect(arguments[i]);
              }
            }
            return this;
          }          /**
   *  Adjust the dry/wet value.
   *
   *  @method drywet
   *  @for Effect
   *  @param {Number} [fade] The desired drywet value (0 - 1.0)
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          drywet(fade) {
            if (typeof fade !== 'undefined') {
              this._drywet.fade.value = fade;
            }
            return this._drywet.fade.value;
          }          /**
   * send output to a p5sound, Web Audio Node, or use signal to
   * control an AudioParam
   * @method connect
   * @for Effect
   * @param {Object} unit
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          connect(unit) {
            let u = unit || _main.default.input;
            this.output.connect(u.input ? u.input : u);
            if (unit && unit._onNewInput) {
              unit._onNewInput(this);
            }
          }          /**
   * disconnect all outputs
   * @method disconnect
   * @for Effect
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          disconnect() {
            if (this.output) {
              this.output.disconnect();
            }
          }
          dispose() {
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            if (this.input) {
              this.input.disconnect();
              delete this.input;
            }
            if (this.output) {
              this.output.disconnect();
              delete this.output;
            }
          }
        }
        var _default = exports.default = Effect;
      },
      {
        './audioContext': 15,
        './main': 20,
        'tone': 1
      }
    ],
    8: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _tone = _dereq_('tone');
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        // import Tone.js modules
        /**
 *  <p>Envelopes are pre-defined amplitude distribution over time.
 *  Typically, envelopes are used to control the output volume
 *  of an object, a series of fades referred to as Attack, Decay,
 *  Sustain and Release (
 *  <a href="https://upload.wikimedia.org/wikipedia/commons/e/ea/ADSR_parameter.svg">ADSR</a>
 *  ). Envelopes can also control other Web Audio Parameters—for example, a Envelope can
 *  control an Oscillator's frequency like this: <code>osc.freq(env)</code>.</p>
 *  <p>Use <code><a href="#/Envelope/setRange">setRange</a></code> to change the attack/release level.
 *  Use <code><a href="#/Envelope/setADSR">setADSR</a></code> to change attackTime, decayTime, sustainPercent and releaseTime.</p>
 *  <p>Use the <code><a href="#/Envelope/play">play</a></code> method to play the entire envelope,
 *  the <code><a href="#/Envelope/ramp">ramp</a></code> method for a pingable trigger,
 *  or <code><a href="#/Envelope/triggerAttack">triggerAttack</a></code>/
 *  <code><a href="#/Envelope/triggerRelease">triggerRelease</a></code> to trigger noteOn/noteOff.</p>
 *
 *  @class Envelope
 *  @constructor
 *  @example
 *  <div><code>
 *  let t1 = 0.1; // attack time in seconds
 *  let l1 = 0.7; // attack level 0.0 to 1.0
 *  let t2 = 0.3; // decay time in seconds
 *  let l2 = 0.1; // decay level  0.0 to 1.0
 *
 *  let env;
 *  let triOsc;
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    background(220);
 *    text('tap to play', 20, 20);
 *    cnv.mousePressed(playSound);
 *
 *    env = new Envelope(t1, l1, t2, l2);
 *    triOsc = new Oscillator('triangle');
 *  }
 *
 *  function playSound() {
 *    // starting the oscillator ensures that audio is enabled.
 *    triOsc.start();
 *    env.play(triOsc);
 *  }
 *  </code></div>
 */

        class Envelope {
          constructor(t1, l1, t2, l2, t3, l3) {
            /**
     * Time until envelope reaches attackLevel
     * @property attackTime
     */
            this.aTime = t1 || 0.1;
            /**
     * Level once attack is complete.
     * @property attackLevel
     */
            this.aLevel = l1 || 1;
            /**
     * Time until envelope reaches decayLevel.
     * @property decayTime
     */
            this.dTime = t2 || 0.5;
            /**
     * Level after decay. The envelope will sustain here until it is released.
     * @property decayLevel
     */
            this.dLevel = l2 || 0;
            /**
     * Duration of the release portion of the envelope.
     * @property releaseTime
     */
            this.rTime = t3 || 0;
            /**
     * Level at the end of the release.
     * @property releaseLevel
     */
            this.rLevel = l3 || 0;
            this._rampHighPercentage = 0.98;
            this._rampLowPercentage = 0.02;
            this.output = _audioContext.default.createGain();
            this.control = new _tone.TransportTimelineSignal();
            this._init(); // this makes sure the envelope starts at zero
            // connect to the output
            this.control.connect(this.output);
            this.output.connect(_main.default.input);
            // store connection
            this.connection = null;
            //array of math operation signal chaining
            this.mathOps = [
              this.control
            ];
            //whether envelope should be linear or exponential curve
            this.isExponential = false;
            // oscillator or buffer source to clear on env complete
            // to save resources if/when it is retriggered
            this.sourceToClear = null;
            // set to true if attack is set, then false on release
            this.wasTriggered = false;
            // add to the soundArray so we can dispose of the env later
            _main.default.soundArray.push(this);
          }          // this init function just smooths the starting value to zero and gives a start point for the timeline
          // - it was necessary to remove glitches at the beginning.

          _init() {
            let now = _audioContext.default.currentTime;
            let t = now;
            this.control.setTargetAtTime(0.00001, t, 0.001);
            //also, compute the correct time constants
            this._setRampAD(this.aTime, this.dTime);
          }          /**
   *  Reset the envelope with a series of time/value pairs.
   *
   *  @method  set
   *  @for Envelope
   *  @param {Number} attackTime     Time (in seconds) before level
   *                                 reaches attackLevel
   *  @param {Number} attackLevel    Typically an amplitude between
   *                                 0.0 and 1.0
   *  @param {Number} decayTime      Time
   *  @param {Number} decayLevel   Amplitude (In a standard ADSR envelope,
   *                                 decayLevel = sustainLevel)
   *  @param {Number} releaseTime   Release Time (in seconds)
   *  @param {Number} releaseLevel  Amplitude
   *  @example
   *  <div><code>
   *  let attackTime;
   *  let l1 = 0.7; // attack level 0.0 to 1.0
   *  let t2 = 0.3; // decay time in seconds
   *  let l2 = 0.1; // decay level  0.0 to 1.0
   *  let l3 = 0.2; // release time in seconds
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playSound);
   *
   *    env = new Envelope();
   *    triOsc = new Oscillator('triangle');
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *
   *    attackTime = map(mouseX, 0, width, 0.0, 1.0);
   *    text('attack time: ' + attackTime, 5, height - 20);
   *  }
   *
   *  // mouseClick triggers envelope if over canvas
   *  function playSound() {
   *    env.set(attackTime, l1, t2, l2, l3);
   *
   *    triOsc.start();
   *    env.play(triOsc);
   *  }
   *  </code></div>
   *
   */

          set(t1, l1, t2, l2, t3, l3) {
            this.aTime = t1;
            this.aLevel = l1;
            this.dTime = t2 || 0;
            this.dLevel = l2 || 0;
            this.rTime = t3 || 0;
            this.rLevel = l3 || 0;
            // set time constants for ramp
            this._setRampAD(t1, t2);
          }          /**
   *  Set values like a traditional
   *  <a href="https://en.wikipedia.org/wiki/Synthesizer#/media/File:ADSR_parameter.svg">
   *  ADSR envelope
   *  </a>.
   *
   *  @method  setADSR
   *  @for Envelope
   *  @param {Number} attackTime    Time (in seconds before envelope
   *                                reaches Attack Level
   *  @param {Number} [decayTime]    Time (in seconds) before envelope
   *                                reaches Decay/Sustain Level
   *  @param {Number} [susRatio]    Ratio between attackLevel and releaseLevel, on a scale from 0 to 1,
   *                                where 1.0 = attackLevel, 0.0 = releaseLevel.
   *                                The susRatio determines the decayLevel and the level at which the
   *                                sustain portion of the envelope will sustain.
   *                                For example, if attackLevel is 0.4, releaseLevel is 0,
   *                                and susAmt is 0.5, the decayLevel would be 0.2. If attackLevel is
   *                                increased to 1.0 (using <code>setRange</code>),
   *                                then decayLevel would increase proportionally, to become 0.5.
   *  @param {Number} [releaseTime]   Time in seconds from now (defaults to 0)
   *  @example
   *  <div><code>
   *  let attackLevel = 1.0;
   *  let releaseLevel = 0;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.2;
   *  let releaseTime = 0.5;
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playEnv);
   *
   *    env = new Envelope();
   *    triOsc = new Oscillator('triangle');
   *    triOsc.amp(env);
   *    triOsc.freq(220);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *    attackTime = map(mouseX, 0, width, 0, 1.0);
   *    text('attack time: ' + attackTime, 5, height - 40);
   *  }
   *
   *  function playEnv() {
   *    triOsc.start();
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.play();
   *  }
   *  </code></div>
   */

          setADSR(aTime, dTime, sPercent, rTime) {
            this.aTime = aTime;
            this.dTime = dTime || 0;
            // lerp
            this.sPercent = sPercent || 0;
            this.dLevel = typeof sPercent !== 'undefined' ? sPercent * (this.aLevel - this.rLevel) + this.rLevel : 0;
            this.rTime = rTime || 0;
            // also set time constants for ramp
            this._setRampAD(aTime, dTime);
          }          /**
   *  Set max (attackLevel) and min (releaseLevel) of envelope.
   *
   *  @method  setRange
   *  @for Envelope
   *  @param {Number} aLevel attack level (defaults to 1)
   *  @param {Number} rLevel release level (defaults to 0)
   *  @example
   *  <div><code>
   *  let attackLevel = 1.0;
   *  let releaseLevel = 0;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.2;
   *  let releaseTime = 0.5;
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playEnv);
   *
   *    env = new Envelope();
   *    triOsc = new Oscillator('triangle');
   *    triOsc.amp(env);
   *    triOsc.freq(220);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *    attackLevel = map(mouseY, height, 0, 0, 1.0);
   *    text('attack level: ' + attackLevel, 5, height - 20);
   *  }
   *
   *  function playEnv() {
   *    triOsc.start();
   *    env.setRange(attackLevel, releaseLevel);
   *    env.play();
   *  }
   *  </code></div>
   */

          setRange(aLevel, rLevel) {
            this.aLevel = aLevel || 1;
            this.rLevel = rLevel || 0;
            // not sure if this belongs here:
            // {Number} [dLevel] decay/sustain level (optional)
            // if (typeof(dLevel) !== 'undefined') {
            //   this.dLevel = dLevel
            // } else if (this.sPercent) {
            //   this.dLevel = this.sPercent ? this.sPercent * (this.aLevel - this.rLevel) + this.rLevel : 0;
            // }
          }          //  private (undocumented) method called when ADSR is set to set time constants for ramp
          //
          //  Set the <a href="https://en.wikipedia.org/wiki/RC_time_constant">
          //  time constants</a> for simple exponential ramps.
          //  The larger the time constant value, the slower the
          //  transition will be.
          //
          //  method  _setRampAD
          //  param {Number} attackTimeConstant  attack time constant
          //  param {Number} decayTimeConstant   decay time constant
          //

          _setRampAD(t1, t2) {
            this._rampAttackTime = this.checkExpInput(t1);
            this._rampDecayTime = this.checkExpInput(t2);
            let TCDenominator = 1;
            /// Aatish Bhatia's calculation for time constant for rise(to adjust 1/1-e calculation to any percentage)
            TCDenominator = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage));
            this._rampAttackTC = t1 / this.checkExpInput(TCDenominator);
            TCDenominator = Math.log(1 / this._rampLowPercentage);
            this._rampDecayTC = t2 / this.checkExpInput(TCDenominator);
          }          // private method

          setRampPercentages(p1, p2) {
            //set the percentages that the simple exponential ramps go to
            this._rampHighPercentage = this.checkExpInput(p1);
            this._rampLowPercentage = this.checkExpInput(p2);
            let TCDenominator = 1;
            //now re-compute the time constants based on those percentages
            /// Aatish Bhatia's calculation for time constant for rise(to adjust 1/1-e calculation to any percentage)
            TCDenominator = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage));
            this._rampAttackTC = this._rampAttackTime / this.checkExpInput(TCDenominator);
            TCDenominator = Math.log(1 / this._rampLowPercentage);
            this._rampDecayTC = this._rampDecayTime / this.checkExpInput(TCDenominator);
          }          /**
   *  Assign a parameter to be controlled by this envelope.
   *  If a p5.Sound object is given, then the Envelope will control its
   *  output gain. If multiple inputs are provided, the env will
   *  control all of them.
   *
   *  @method  setInput
   *  @for Envelope
   *  @param  {Object} [...inputs]         A p5.sound object or
   *                                Web Audio Param.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setInput() {
            for (let i = 0; i < arguments.length; i++) {
              this.connect(arguments[i]);
            }
          }          /**
   *  Set whether the envelope ramp is linear (default) or exponential.
   *  Exponential ramps can be useful because we perceive amplitude
   *  and frequency logarithmically.
   *
   *  @method  setExp
   *  @for Envelope
   *  @param {Boolean} isExp true is exponential, false is linear
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setExp(isExp) {
            this.isExponential = isExp;
          }          //helper method to protect against zero values being sent to exponential functions

          checkExpInput(value) {
            if (value <= 0) {
              value = 1e-8;
            }
            return value;
          }          /**
   *  <p>Play tells the envelope to start acting on a given input.
   *  If the input is a p5.sound object (i.e. AudioIn, Oscillator,
   *  SoundFile), then Envelope will control its output volume.
   *  Envelopes can also be used to control any <a href="
   *  http://docs.webplatform.org/wiki/apis/webaudio/AudioParam">
   *  Web Audio Audio Param.</a></p>
   *
   *  @method  play
   *  @for Envelope
   *  @param  {Object} unit         A p5.sound object or
   *                                Web Audio Param.
   *  @param  {Number} [startTime]  time from now (in seconds) at which to play
   *  @param  {Number} [sustainTime] time to sustain before releasing the envelope
   *  @example
   *  <div><code>
   *  let attackLevel = 1.0;
   *  let releaseLevel = 0;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.2;
   *  let releaseTime = 0.5;
   *
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playEnv);
   *
   *    env = new Envelope();
   *    triOsc = new Oscillator('triangle');
   *    triOsc.amp(env);
   *    triOsc.freq(220);
   *    triOsc.start();
   *  }
   *
   *  function draw() {
   *    background(220);
   *    text('tap here to play', 5, 20);
   *    attackTime = map(mouseX, 0, width, 0, 1.0);
   *    attackLevel = map(mouseY, height, 0, 0, 1.0);
   *    text('attack time: ' + attackTime, 5, height - 40);
   *    text('attack level: ' + attackLevel, 5, height - 20);
   *  }
   *
   *  function playEnv() {
   *    // ensure that audio is enabled
   *    userStartAudio();
   *
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.setRange(attackLevel, releaseLevel);
   *    env.play();
   *  }
   *  </code></div>
   */

          play(unit, secondsFromNow, susTime) {
            let tFromNow = secondsFromNow || 0;
            if (unit) {
              if (this.connection !== unit) {
                this.connect(unit);
              }
            }
            this.triggerAttack(unit, tFromNow);
            this.triggerRelease(unit, tFromNow + this.aTime + this.dTime + ~~susTime);
          }          /**
   *  Trigger the Attack, and Decay portion of the Envelope.
   *  Similar to holding down a key on a piano, but it will
   *  hold the sustain level until you let go. Input can be
   *  any p5.sound object, or a <a href="
   *  http://docs.webplatform.org/wiki/apis/webaudio/AudioParam">
   *  Web Audio Param</a>.
   *
   *  @method  triggerAttack
   *  @for Envelope
   *  @param  {Object} unit p5.sound Object or Web Audio Param
   *  @param  {Number} secondsFromNow time from now (in seconds)
   *  @example
   *  <div><code>
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.3;
   *  let releaseTime = 0.4;
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    background(220);
   *    textAlign(CENTER);
   *    textSize(10);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env = new Envelope();
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.setRange(1.0, 0.0);
   *    triOsc = new Oscillator('triangle');
   *    triOsc.freq(220);
   *
   *    cnv.mousePressed(envAttack);
   *  }
   *
   *  function envAttack()  {
   *    background(0, 255, 255);
   *    text('release to release', width/2, height/2);
   *
   *    // ensures audio is enabled. See also: `userStartAudio`
   *    triOsc.start();
   *
   *    env.triggerAttack(triOsc);
   *  }
   *
   *  function mouseReleased() {
   *    background(220);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env.triggerRelease(triOsc);
   *  }
   *  </code></div>
   */

          triggerAttack(unit, secondsFromNow) {
            let now = _audioContext.default.currentTime;
            let tFromNow = secondsFromNow || 0;
            let t = now + tFromNow;
            this.lastAttack = t;
            this.wasTriggered = true;
            if (unit) {
              if (this.connection !== unit) {
                this.connect(unit);
              }
            }            // get and set value (with linear ramp) to anchor automation

            let valToSet = this.control.getValueAtTime(t);
            if (this.isExponential === true) {
              this.control.exponentialRampToValueAtTime(this.checkExpInput(valToSet), t);
            } else {
              this.control.linearRampToValueAtTime(valToSet, t);
            }            // after each ramp completes, cancel scheduled values
            // (so they can be overridden in case env has been re-triggered)
            // then, set current value (with linearRamp to avoid click)
            // then, schedule the next automation...
            // attack

            t += this.aTime;
            if (this.isExponential === true) {
              this.control.exponentialRampToValueAtTime(this.checkExpInput(this.aLevel), t);
              valToSet = this.checkExpInput(this.control.getValueAtTime(t));
              this.control.cancelScheduledValues(t);
              this.control.exponentialRampToValueAtTime(valToSet, t);
            } else {
              this.control.linearRampToValueAtTime(this.aLevel, t);
              valToSet = this.control.getValueAtTime(t);
              this.control.cancelScheduledValues(t);
              this.control.linearRampToValueAtTime(valToSet, t);
            }            // decay to decay level (if using ADSR, then decay level == sustain level)

            t += this.dTime;
            if (this.isExponential === true) {
              this.control.exponentialRampToValueAtTime(this.checkExpInput(this.dLevel), t);
              valToSet = this.checkExpInput(this.control.getValueAtTime(t));
              this.control.cancelScheduledValues(t);
              this.control.exponentialRampToValueAtTime(valToSet, t);
            } else {
              this.control.linearRampToValueAtTime(this.dLevel, t);
              valToSet = this.control.getValueAtTime(t);
              this.control.cancelScheduledValues(t);
              this.control.linearRampToValueAtTime(valToSet, t);
            }
          }          /**
   *  Trigger the Release of the Envelope. This is similar to releasing
   *  the key on a piano and letting the sound fade according to the
   *  release level and release time.
   *
   *  @method  triggerRelease
   *  @for Envelope
   *  @param  {Object} unit p5.sound Object or Web Audio Param
   *  @param  {Number} secondsFromNow time to trigger the release
   *  @example
   *  <div><code>
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let susPercent = 0.3;
   *  let releaseTime = 0.4;
   *  let env, triOsc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    background(220);
   *    textAlign(CENTER);
   *    textSize(10);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env = new Envelope();
   *    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
   *    env.setRange(1.0, 0.0);
   *    triOsc = new Oscillator('triangle');
   *    triOsc.freq(220);
   *
   *    cnv.mousePressed(envAttack);
   *  }
   *
   *  function envAttack()  {
   *    background(0, 255, 255);
   *    text('release to release', width/2, height/2);
   *
   *    // ensures audio is enabled. See also: `userStartAudio`
   *    triOsc.start();
   *
   *    env.triggerAttack(triOsc);
   *  }
   *
   *  function mouseReleased() {
   *    background(220);
   *    text('tap to triggerAttack', width/2, height/2);
   *
   *    env.triggerRelease(triOsc);
   *  }
   *  </code></div>
   */

          triggerRelease(unit, secondsFromNow) {
            // only trigger a release if an attack was triggered
            if (!this.wasTriggered) {
              // this currently causes a bit of trouble:
              // if a later release has been scheduled (via the play function)
              // a new earlier release won't interrupt it, because
              // this.wasTriggered has already been set to false.
              // If we want new earlier releases to override, then we need to
              // keep track of the last release time, and if the new release time is
              // earlier, then use it.
              return;
            }
            let now = _audioContext.default.currentTime;
            let tFromNow = secondsFromNow || 0;
            let t = now + tFromNow;
            if (unit) {
              if (this.connection !== unit) {
                this.connect(unit);
              }
            }            // get and set value (with linear or exponential ramp) to anchor automation

            let valToSet = this.control.getValueAtTime(t);
            if (this.isExponential === true) {
              this.control.exponentialRampToValueAtTime(this.checkExpInput(valToSet), t);
            } else {
              this.control.linearRampToValueAtTime(valToSet, t);
            }            // release

            t += this.rTime;
            if (this.isExponential === true) {
              this.control.exponentialRampToValueAtTime(this.checkExpInput(this.rLevel), t);
              valToSet = this.checkExpInput(this.control.getValueAtTime(t));
              this.control.cancelScheduledValues(t);
              this.control.exponentialRampToValueAtTime(valToSet, t);
            } else {
              this.control.linearRampToValueAtTime(this.rLevel, t);
              valToSet = this.control.getValueAtTime(t);
              this.control.cancelScheduledValues(t);
              this.control.linearRampToValueAtTime(valToSet, t);
            }
            this.wasTriggered = false;
          }          /**
   *  Exponentially ramp to a value using the first two
   *  values from <code><a href="#/Envelope/setADSR">setADSR(attackTime, decayTime)</a></code>
   *  as <a href="https://en.wikipedia.org/wiki/RC_time_constant">
   *  time constants</a> for simple exponential ramps.
   *  If the value is higher than current value, it uses attackTime,
   *  while a decrease uses decayTime.
   *
   *  @method  ramp
   *  @for Envelope
   *  @param  {Object} unit           p5.sound Object or Web Audio Param
   *  @param  {Number} secondsFromNow When to trigger the ramp
   *  @param  {Number} v              Target value
   *  @param  {Number} [v2]           Second target value
   *  @example
   *  <div><code>
   *  let env, osc, amp;
   *
   *  let attackTime = 0.001;
   *  let decayTime = 0.2;
   *  let attackLevel = 1;
   *  let decayLevel = 0;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    fill(0,255,0);
   *    noStroke();
   *
   *    env = new Envelope();
   *    env.setADSR(attackTime, decayTime);
   *    osc = new Oscillator();
   *    osc.amp(env);
   *    amp = new p5.Amplitude();
   *
   *    cnv.mousePressed(triggerRamp);
   *  }
   *
   *  function triggerRamp() {
   *    // ensures audio is enabled. See also: `userStartAudio`
   *    osc.start();
   *
   *    env.ramp(osc, 0, attackLevel, decayLevel);
   *  }
   *
   *  function draw() {
   *    background(20);
   *    text('tap to play', 10, 20);
   *    let h = map(amp.getLevel(), 0, 0.4, 0, height);;
   *    rect(0, height, width, -h);
   *  }
   *  </code></div>
   */

          ramp(unit, secondsFromNow, v1, v2) {
            let now = _audioContext.default.currentTime;
            let tFromNow = secondsFromNow || 0;
            let t = now + tFromNow;
            let destination1 = this.checkExpInput(v1);
            let destination2 = typeof v2 !== 'undefined' ? this.checkExpInput(v2) : undefined;
            // connect env to unit if not already connected
            if (unit) {
              if (this.connection !== unit) {
                this.connect(unit);
              }
            }            //get current value

            let currentVal = this.checkExpInput(this.control.getValueAtTime(t));
            // this.control.cancelScheduledValues(t);
            //if it's going up
            if (destination1 > currentVal) {
              this.control.setTargetAtTime(destination1, t, this._rampAttackTC);
              t += this._rampAttackTime;
            }            //if it's going down
             else if (destination1 < currentVal) {
              this.control.setTargetAtTime(destination1, t, this._rampDecayTC);
              t += this._rampDecayTime;
            }            // Now the second part of envelope begins

            if (destination2 === undefined) return;
            //if it's going up
            if (destination2 > destination1) {
              this.control.setTargetAtTime(destination2, t, this._rampAttackTC);
            }            //if it's going down
             else if (destination2 < destination1) {
              this.control.setTargetAtTime(destination2, t, this._rampDecayTC);
            }
          }
          connect(unit) {
            this.connection = unit;
            // assume we're talking about output gain
            // unless given a different audio param
            if (unit instanceof Oscillator || unit instanceof SoundFile || unit instanceof AudioIn || unit instanceof Reverb || unit instanceof Noise || unit instanceof BiquadFilter || unit instanceof Delay) {
              unit = unit.output.gain;
            }
            if (unit instanceof AudioParam) {
              //set the initial value
              unit.setValueAtTime(0, _audioContext.default.currentTime);
            }
            this.output.connect(unit);
            // let u = unit || p5sound.input;
            // this.output.connect(u.input ? u.input : u);
            if (unit && unit._onNewInput) {
              unit._onNewInput(this);
            }
          }
          disconnect() {
            if (this.output) {
              this.output.disconnect();
            }
          }          // Signal Math
          /**
   *  Add a value to the Oscillator's output amplitude,
   *  and return the oscillator. Calling this method
   *  again will override the initial add() with new values.
   *
   *  @method  add
   *  @for Envelope
   *  @param {Number} number Constant number to add
   *  @return {Envelope} Envelope Returns this envelope
   *                                     with scaled output
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          add(num) {
            let add = new _tone.Add(num);
            let thisChain = this.mathOps.length;
            let nextChain = this.output;
            return p5.prototype._mathChain(this, add, thisChain, nextChain, _tone.Add);
          }          /**
   *  Multiply the Envelope's output amplitude
   *  by a fixed value. Calling this method
   *  again will override the initial mult() with new values.
   *
   *  @method  mult
   *  @for Envelope
   *  @param {Number} number Constant number to multiply
   *  @return {Envelope} Envelope Returns this envelope
   *                                     with scaled output
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          mult(num) {
            let mult = new _tone.Multiply(num);
            let thisChain = this.mathOps.length;
            let nextChain = this.output;
            return p5.prototype._mathChain(this, mult, thisChain, nextChain, _tone.Multiply);
          }          /**
   *  Scale this envelope's amplitude values to a given
   *  range, and return the envelope. Calling this method
   *  again will override the initial scale() with new values.
   *
   *  @method  scale
   *  @for Envelope
   *  @param  {Number} inMin  input range minumum
   *  @param  {Number} inMax  input range maximum
   *  @param  {Number} outMin input range minumum
   *  @param  {Number} outMax input range maximum
   *  @return {Envelope} Envelope Returns this envelope
   *                                     with scaled output
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          scale(inMin, inMax, outMin, outMax) {
            let scale = new _tone.Scale(inMin, inMax, outMin, outMax);
            let thisChain = this.mathOps.length;
            let nextChain = this.output;
            return p5.prototype._mathChain(this, scale, thisChain, nextChain, _tone.Scale);
          }          // get rid of the oscillator

          dispose() {
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            this.disconnect();
            if (this.control) {
              this.control.dispose();
              this.control = null;
            }
            for (let i = 1; i < this.mathOps.length; i++) {
              this.mathOps[i].dispose();
            }
          }
        }
        var _default = exports.default = Envelope;
      },
      {
        './audioContext': 15,
        './main': 20,
        'tone': 1
      }
    ],
    9: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        /**
 *  A gain node is usefull to set the relative volume of sound.
 *  It's typically used to build mixers.
 *
 *  @class Gain
 *  @constructor
 *  @example
 *  <div><code>
 *
 *  // load two soundfile and crossfade beetween them
 *  let sound1,sound2;
 *  let sound1Gain, sound2Gain, mixGain;
 *  function preload(){
 *    soundFormats('ogg', 'mp3');
 *    sound1 = loadSound('assets/Damscray_-_Dancing_Tiger_01');
 *    sound2 = loadSound('assets/beat');
 *  }
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(startSound);
 *    // create a 'mix' gain bus to which we will connect both soundfiles
 *    mixGain = new Gain();
 *    mixGain.connect();
 *    sound1.disconnect(); // diconnect from p5 output
 *    sound1Gain = new Gain(); // setup a gain node
 *    sound1Gain.setInput(sound1); // connect the first sound to its input
 *    sound1Gain.connect(mixGain); // connect its output to the final mix bus
 *    sound2.disconnect();
 *    sound2Gain = new Gain();
 *    sound2Gain.setInput(sound2);
 *    sound2Gain.connect(mixGain);
 *  }
 *  function startSound() {
 *    sound1.loop();
 *    sound2.loop();
 *    loop();
 *  }
 *  function mouseReleased() {
 *    sound1.stop();
 *    sound2.stop();
 *  }
 *  function draw(){
 *    background(220);
 *    textAlign(CENTER);
 *    textSize(11);
 *    fill(0);
 *    if (!sound1.isPlaying()) {
 *      text('tap and drag to play', width/2, height/2);
 *      return;
 *    }
 *    // map the horizontal position of the mouse to values useable for volume    *  control of sound1
 *    let sound1Volume = constrain(map(mouseX,width,0,0,1), 0, 1);
 *    let sound2Volume = 1-sound1Volume;
 *    sound1Gain.amp(sound1Volume);
 *    sound2Gain.amp(sound2Volume);
 *    // map the vertical position of the mouse to values useable for 'output    *  volume control'
 *    let outputVolume = constrain(map(mouseY,height,0,0,1), 0, 1);
 *    mixGain.amp(outputVolume);
 *    text('output', width/2, height - outputVolume * height * 0.9)
 *    fill(255, 0, 255);
 *    textAlign(LEFT);
 *    text('sound1', 5, height - sound1Volume * height * 0.9);
 *    textAlign(RIGHT);
 *    text('sound2', width - 5, height - sound2Volume * height * 0.9);
 *  }
 *</code></div>
 */

        class Gain {
          constructor() {
            this.input = _audioContext.default.createGain();
            this.output = _audioContext.default.createGain();
            this.input.gain.value = 0.5;
            this.output.gain.value = 0.5;
            this.input.connect(this.output);
            this.output.connect(_main.default.input);
            // add  to the soundArray
            _main.default.soundArray.push(this);
          }          /**
   *  Connect a source to the gain node.
   *
   *  @method  setInput
   *  @for Gain
   *  @param  {Object} src     p5.sound / Web Audio object with a sound
   *                           output.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setInput(src) {
            src.connect(this.input);
          }          /**
   *  Send output to a p5.sound or web audio object
   *
   *  @method  connect
   *  @for Gain
   *  @param  {Object} unit
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          connect(unit) {
            let u = unit || _main.default.input;
            this.output.connect(u.input ? u.input : u);
            if (unit && unit._onNewInput) {
              unit._onNewInput(this);
            }
          }          /**
   *  Disconnect all output.
   *
   *  @method disconnect
   *  @for Gain
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          disconnect() {
            if (this.output) {
              this.output.disconnect();
            }
          }          /**
   *  Set the output level of the gain node.
   *
   *  @method  amp
   *  @for Gain
   *  @param  {Number} volume amplitude between 0 and 1.0
   *  @param  {Number} [rampTime] create a fade that lasts rampTime
   *  @param  {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          amp(vol, rampTime = 0, tFromNow = 0) {
            let now = _audioContext.default.currentTime;
            let currentVol = this.output.gain.value;
            this.output.gain.cancelScheduledValues(now);
            this.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
            this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
          }
          dispose() {
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            if (this.output) {
              this.output.disconnect();
              delete this.output;
            }
            if (this.input) {
              this.input.disconnect();
              delete this.input;
            }
          }
        }
        var _default = exports.default = Gain;
      },
      {
        './audioContext': 15,
        './main': 20
      }
    ],
    10: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _Oscillator = _interopRequireDefault(_dereq_('./Oscillator'));
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        // generate noise buffers

        const _whiteNoiseBuffer = function () {
          let bufferSize = 2 * _audioContext.default.sampleRate;
          let whiteBuffer = _audioContext.default.createBuffer(1, bufferSize, _audioContext.default.sampleRate);
          let noiseData = whiteBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            noiseData[i] = Math.random() * 2 - 1;
          }
          whiteBuffer.type = 'white';
          return whiteBuffer;
        }();
        const _pinkNoiseBuffer = function () {
          let bufferSize = 2 * _audioContext.default.sampleRate;
          let pinkBuffer = _audioContext.default.createBuffer(1, bufferSize, _audioContext.default.sampleRate);
          let noiseData = pinkBuffer.getChannelData(0);
          let b0,
          b1,
          b2,
          b3,
          b4,
          b5,
          b6;
          b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            let white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.969 * b2 + white * 0.153852;
            b3 = 0.8665 * b3 + white * 0.3104856;
            b4 = 0.55 * b4 + white * 0.5329522;
            b5 = - 0.7616 * b5 - white * 0.016898;
            noiseData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            noiseData[i] *= 0.11; // (roughly) compensate for gain
            b6 = white * 0.115926;
          }
          pinkBuffer.type = 'pink';
          return pinkBuffer;
        }();
        const _brownNoiseBuffer = function () {
          let bufferSize = 2 * _audioContext.default.sampleRate;
          let brownBuffer = _audioContext.default.createBuffer(1, bufferSize, _audioContext.default.sampleRate);
          let noiseData = brownBuffer.getChannelData(0);
          let lastOut = 0;
          for (let i = 0; i < bufferSize; i++) {
            let white = Math.random() * 2 - 1;
            noiseData[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = noiseData[i];
            noiseData[i] *= 3.5;
          }
          brownBuffer.type = 'brown';
          return brownBuffer;
        }();
        class Noise extends _Oscillator.default {
          constructor(type) {
            super ();
            let assignType;
            delete this.f;
            delete this.freq;
            delete this.oscillator;
            if (type === 'brown') {
              assignType = _brownNoiseBuffer;
            } else if (type === 'pink') {
              assignType = _pinkNoiseBuffer;
            } else {
              assignType = _whiteNoiseBuffer;
            }
            this.buffer = assignType;
          }
          setType(type) {
            switch (type) {
              case 'white':
                this.buffer = _whiteNoiseBuffer;
                break;
              case 'pink':
                this.buffer = _pinkNoiseBuffer;
                break;
              case 'brown':
                this.buffer = _brownNoiseBuffer;
                break;
              default:
                this.buffer = _whiteNoiseBuffer;
            }
            if (this.started) {
              let now = _audioContext.default.currentTime;
              this.stop(now);
              this.start(now + 0.01);
            }
          }
          getType() {
            return this.buffer.type;
          }
          start() {
            if (this.started) {
              this.stop();
            }
            this.noise = _audioContext.default.createBufferSource();
            this.noise.buffer = this.buffer;
            this.noise.loop = true;
            this.noise.connect(this.output);
            let now = _audioContext.default.currentTime;
            this.noise.start(now);
            this.started = true;
          }
          stop() {
            let now = _audioContext.default.currentTime;
            if (this.noise) {
              this.noise.stop(now);
              this.started = false;
            }
          }
          dispose() {
            let now = _audioContext.default.currentTime;
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            if (this.noise) {
              this.noise.disconnect();
              this.stop(now);
            }
            if (this.output) {
              this.output.disconnect();
            }
            if (this.panner) {
              this.panner.disconnect();
            }
            this.output = null;
            this.panner = null;
            this.buffer = null;
            this.noise = null;
          }
        }
        var _default = exports.default = Noise;
      },
      {
        './Oscillator': 11,
        './audioContext': 15,
        './main': 20
      }
    ],
    11: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = exports.TriOsc = exports.SqrOsc = exports.SinOsc = exports.SawOsc = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _tone = _dereq_('tone');
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        // import Tone.js modules
        /**
 * @module Sound
 * @submodule Oscillator
 * @for p5sound
 * @requires core
 */
        /**
 * Creates a  new <a href="#/p5sound.Oscillator">p5sound.Oscillator</a>
 *
 * Example coming soon...
 */
        // ========================== //
        // SIGNAL MATH FOR MODULATION //
        // ========================== //

        function sigChain(nodes, newNode, nodeType, input, output) {
          let prevNode = null;
          let nextNode = null;
          let replacedNode = null;
          // If nodes already contains an node of type nodeType, replace that node
          // with newNode.
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] instanceof nodeType) {
              prevNode = i === 0 ? input : nodes[i - 1];
              nextNode = i === nodes.length - 1 ? output : nodes[i + 1];
              replacedNode = nodes[i];
              nodes[i] = newNode;
              break;
            }
          }          // Otherwise, add newMathOp to the end of mathOps.

          if (replacedNode === null) {
            prevNode = nodes.length === 0 ? input : nodes[nodes.length - 1];
            nextNode = output;
            nodes.push(newNode);
          }          // Connect the newMathOp to the previous and next nodes.

          prevNode.disconnect();
          if (replacedNode !== null) {
            replacedNode.disconnect();
            replacedNode.dispose();
          }
          prevNode.connect(newNode);
          newNode.connect(nextNode);
        }        // reference
        // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination
        // jason recommends to play with the web audio api on the console
        // on google chrome
        /*
 * Class methods
 */
        /**
*
* @class Oscillator
* @constructor
* @param {Number} type
*/

        class Oscillator {
          constructor(freq, type) {
            // proofing the constructor
            if (typeof freq === 'string') {
              let f = type;
              type = freq;
              freq = f;
            }
            if (typeof type === 'number') {
              let f = type;
              type = freq;
              freq = f;
            }            // sine, triangle, square, saw, pulse

            this.type = type;
            this.started = false;
            // components
            this.phaseAmount = undefined;
            this.oscillator = _audioContext.default.createOscillator();
            this.f = freq || 440; // frequency
            this.oscillator.type = type || 'sine';
            this.oscillator.frequency.setValueAtTime(this.f, _audioContext.default.currentTime);
            // connections
            this.output = _audioContext.default.createGain();
            // modulators connected to the oscillator frequency
            this._freqMods = [
            ];
            // set default output gain to 0.5
            // TODO: maybe think of a constant that people can tweak
            // for max volume
            this.output.gain.value = 0.5;
            this.output.gain.setValueAtTime(0.5, _audioContext.default.currentTime);
            this.oscillator.connect(this.output);
            // stereo panning
            //this.connection = p5.input; // connect to p5sound by default
            //this.panner = new Panner();
            //this.output.connect(this.panner);
            // this.output.connect(audioContext.destination);
            this.output.connect(_main.default.input);
            // array of math operation signal chaining
            this.mathOps = [
            ];
            // if you wanna do 3D node panners
            // please do it with web audio api,
            // everything we are doing here its compatible
            // add to the soundArray so we can dispose of the osc later
            _main.default.soundArray.push(this);
            // TODO: try a different approach
            // not create references to the audio nodes
            // so that we dont use up so much memory
            // these methods are now the same thing
            this.fade = this.amp;
          }          /**
   *  Start an oscillator.
   *
   *  Starting an oscillator on a user gesture will enable audio in browsers
   *  that have a strict autoplay policy, including Chrome and most mobile
   *  devices. See also: <a href="#/p5/userStartAudio">userStartAudio()</a>.
   *
   *  @method  start
   *  @for Oscillator
   *  @param  {Number} [time] startTime in seconds from now.
   *  @param  {Number} [frequency] frequency in Hz.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          start(time, f) {
            if (this.started) {
              let now = _audioContext.default.currentTime;
              this.stop(now);
            }
            if (!this.started) {
              let freq = f || this.f;
              let type = this.oscillator.type;
              this.oscillator = _audioContext.default.createOscillator();
              this.oscillator.frequency.value = Math.abs(freq);
              this.oscillator.type = type;
              this.oscillator.connect(this.output);
              time = time || 0;
              this.oscillator.start(time + _audioContext.default.currentTime);
              this.freqNode = this.oscillator.frequency;
              // // if other oscillators are already connected to this osc's freq
              for (let i in this._freqMods) {
                if (typeof this._freqMods[i].connect !== 'undefined') {
                  this._freqMods[i].connect(this.oscillator.frequency);
                }
              }
              this.started = true;
            }
          }          /**
   *  Stop an oscillator. Accepts an optional parameter
   *  to determine how long (in seconds from now) until the
   *  oscillator stops.
   *
   *  @method  stop
   *  @for Oscillator
   *  @param  {Number} [secondsFromNow] Time, in seconds from now.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
          // hopefully we can get rid of the started variable

          stop(time) {
            if (this.started) {
              let t = time || 0;
              let now = _audioContext.default.currentTime;
              this.oscillator.stop(t + now);
              this.started = false;
            }
          }          /**
   *  Set the amplitude between 0 and 1.0. Or, pass in an object
   *  such as an oscillator to modulate amplitude with an audio signal.
   *
   *  @method  amp
   *  @for Oscillator
   *  @param  {Number|Object} vol between 0 and 1.0
   *                              or a modulating signal/oscillator
   *  @param {Number} [rampTime] create a fade that lasts rampTime
   *  @param {Number} [timeFromNow] schedule this event to happen
   *                                seconds from now
   *  @return  {AudioParam} gain  If no value is provided,
   *                              returns the Web Audio API
   *                              AudioParam that controls
   *                              this oscillator's
   *                              gain/amplitude/volume)
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          amp(vol, rampTime = 0, tFromNow = 0) {
            if (typeof vol === 'number') {
              let now = _audioContext.default.currentTime;
              this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
            } else if (vol) {
              vol.connect(this.output.gain);
            } else {
              // return the Gain Node
              return this.output.gain;
            }
          }          /**
   * Returns the value of output gain
   *
   *  @method  getAmp
   *  @for Oscillator
   *
   * @returns {number} Amplitude value between 0.0 and 1.0
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          getAmp() {
            return this.output.gain.value;
          }          /**
   *  Set frequency of an oscillator to a value. Or, pass in an object
   *  such as an oscillator to modulate the frequency with an audio signal.
   *
   *  @method  freq
   *  @for Oscillator
   *  @param  {Number|Object} Frequency Frequency in Hz
   *                                        or modulating signal/oscillator
   *  @param  {Number} [rampTime] Ramp time (in seconds)
   *  @param  {Number} [timeFromNow] Schedule this event to happen
   *                                   at x seconds from now
   *  @return  {AudioParam} Frequency If no value is provided,
   *                                  returns the Web Audio API
   *                                  AudioParam that controls
   *                                  this oscillator's frequency
   *  @example
   *  <div><code>
   *  let osc;
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(playOscillator);
   *    osc = new Oscillator(300);
   *    background(220);
   *    text('tap to play', 20, 20);
   *  }
   *
   *  function playOscillator() {
   *    osc.start();
   *    osc.amp(0.5);
   *    // start at 700Hz
   *    osc.freq(700);
   *    // ramp to 60Hz over 0.7 seconds
   *    osc.freq(60, 0.7);
   *    osc.amp(0, 0.1, 0.7);
   *  }
   *  </code></div>
   */

          freq(val, rampTime = 0, tFromNow = 0) {
            if (typeof val === 'number' && !isNaN(val)) {
              this.f = val;
              let now = _audioContext.default.currentTime;
              if (rampTime === 0) {
                this.oscillator.frequency.setValueAtTime(val, tFromNow + now);
              } else {
                if (val > 0) {
                  this.oscillator.frequency.exponentialRampToValueAtTime(val, tFromNow + rampTime + now);
                } else {
                  this.oscillator.frequency.linearRampToValueAtTime(val, tFromNow + rampTime + now);
                }
              }              // reset phase if oscillator has a phase

              if (this.phaseAmount) {
                this.phase(this.phaseAmount);
              }
            } else if (val) {
              if (val.output) {
                val = val.output;
              }
              val.connect(this.oscillator.frequency);
              // keep track of what is modulating this param
              // so it can be re-connected if
              this._freqMods.push(val);
            } else {
              // return the Frequency Node
              return this.oscillator.frequency;
            }
          }          /**
   * Returns the value of frequency of oscillator
   *
   *  @method  getFreq
   *  @for Oscillator
   *  @returns {number} Frequency of oscillator in Hertz
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          getFreq() {
            return this.oscillator.frequency.value;
          }          /**
   *  Set type to 'sine', 'triangle', 'sawtooth' or 'square'.
   *
   *  @method  setType
   *  @for Oscillator
   *  @param {String} type 'sine', 'triangle', 'sawtooth' or 'square'.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setType(type) {
            this.oscillator.type = type;
          }          /**
     *  Returns  current type of oscillator eg. 'sine', 'triangle', 'sawtooth' or 'square'.
     *
     *  @method  getType
     *  @for Oscillator
     *  @returns {String} type of oscillator  eg . 'sine', 'triangle', 'sawtooth' or 'square'.
     *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
     */

          getType() {
            return this.oscillator.type;
          }          /**
   *  Connect to a p5.sound / Web Audio object.
   *
   *  @method  connect
   *  @for Oscillator
   *  @param  {Object} unit A p5.sound or Web Audio object
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */
          // connect(unit) {
          //   if(!unit) {
          //     this.output.connect(p5sound.input);
          //   }
          //   else if (unit.hasOwnProperty('input')) {
          //     this.output.connect(unit.input);
          //     this.connection =- unit.input;
          //   } else {
          //     this.output.connect(unit);
          //     this.connection(unit);
          //   }
          //   if (unit && unit._onNewInput) {
          //     unit._onNewInput(this);
          //   }
          // }

          connect(unit) {
            if (!unit) {
              this.output.connect(_main.default.input);
            } else if (unit.hasOwnProperty('input')) {
              this.output.connect(unit.input);
            } else {
              this.output.connect(unit);
            }
            if (unit && unit._onNewInput) {
              unit._onNewInput(this);
            }
          }          /**
   *  Disconnect all outputs
   *
   *  @method  disconnect
   *  @for Oscillator
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          disconnect() {
            if (this.output) {
              this.output.disconnect();
            }            // if (this.panner) {
            //   this.panner.disconnect();
            //   if (this.output) {
            //     this.output.connect(this.panner);
            //   }
            // }

            this.oscMods = [
            ];
          }          // get rid of the oscillator

          dispose() {
            // remove reference from soundArray
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            if (this.oscillator) {
              let now = _audioContext.default.currentTime;
              this.stop(now);
              this.disconnect();
              // this.panner.dispose();
              // this.panner = null;
              this.oscillator = null;
            }            // if it is a Pulse
            // if (this.osc2) {
            // this.osc2.dispose();
            // }

          }          /**
   *  Set the phase of an oscillator between 0.0 and 1.0.
   *  In this implementation, phase is a delay time
   *  based on the oscillator's current frequency.
   *
   *  @method  phase
   *  @for Oscillator
   *  @param  {Number} phase float between 0.0 and 1.0
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          phase(p) {
            let delayAmt = p5.prototype.map(p, 0, 1, 0, 1 / this.f);
            let now = _audioContext.default.currentTime;
            this.phaseAmount = p;
            if (!this.dNode) {
              // create a delay node
              this.dNode = _audioContext.default.createDelay();
              // put the delay node in between output and panner
              this.oscillator.disconnect();
              this.oscillator.connect(this.dNode);
              this.dNode.connect(this.output);
            }            // set delay time to match phase:

            this.dNode.delayTime.setValueAtTime(delayAmt, now);
          }          /**
   *  Add a value to the Oscillator's output amplitude,
   *  and return the oscillator. Calling this method again
   *  will override the initial add() with a new value.
   *
   *  @method  add
   *  @for Oscillator
   *  @param {Number} number Constant number to add
   *  @return {Oscillator} Oscillator Returns this oscillator
   *                                     with scaled output
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          add(num) {
            let add = new _tone.Add(num);
            sigChain(this.mathOps, add, _tone.Add, this.oscillator, this.output);
            return this;
          }          /**
   *  Multiply the Oscillator's output amplitude
   *  by a fixed value (i.e. turn it up!). Calling this method
   *  again will override the initial mult() with a new value.
   *
   *  @method  mult
   *  @for Oscillator
   *  @param {Number} number Constant number to multiply
   *  @return {Oscillator} Oscillator Returns this oscillator
   *                                     with multiplied output
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          mult(num) {
            let mult = new _tone.Multiply(num);
            sigChain(this.mathOps, mult, _tone.Multiply, this.oscillator, this.output);
            return this;
          }          /**
   *  Scale this oscillator's amplitude values to a given
   *  range, and return the oscillator. Calling this method
   *  again will override the initial scale() with new values.
   *
   *  @method  scale
   *  @for Oscillator
   *  @param  {Number} inMin  input range minumum
   *  @param  {Number} inMax  input range maximum
   *  @param  {Number} outMin input range minumum
   *  @param  {Number} outMax input range maximum
   *  @return {Oscillator} Oscillator Returns this oscillator
   *                                     with scaled output
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          scale(inMin, inMax, outMin, outMax) {
            let mapOutMin,
            mapOutMax;
            if (arguments.length === 4) {
              mapOutMin = p5.prototype.map(0, inMin, inMax, outMin, outMax);
              mapOutMax = p5.prototype.map(1, inMin, inMax, outMin, outMax);
            } else {
              mapOutMin = arguments[0];
              mapOutMax = arguments[1];
            }
            let scale = new _tone.Scale(mapOutMin, mapOutMax);
            sigChain(this.mathOps, scale, _tone.Scale, this.oscillator, this.output);
            return this;
          }
        }
        class SinOsc extends Oscillator {
          constructor(freq) {
            super (freq, 'sine');
          }
        }        /**
 *  Constructor: <code>new p5.TriOsc()</code>.
 *  This creates a Triangle Wave Oscillator and is
 *  equivalent to <code>new Oscillator('triangle')
 *  </code> or creating a Oscillator and then calling
 *  its method <code>setType('triangle')</code>.
 *  See Oscillator for methods.
 *
 *  @class  p5.TriOsc
 *  @constructor
 *  @extends Oscillator
 *  @param {Number} [freq] Set the frequency
 */

        exports.SinOsc = SinOsc;
        class TriOsc extends Oscillator {
          constructor(freq) {
            super (freq, 'triangle');
          }
        }        /**
 *  Constructor: <code>new p5.SawOsc()</code>.
 *  This creates a SawTooth Wave Oscillator and is
 *  equivalent to <code> new Oscillator('sawtooth')
 *  </code> or creating a Oscillator and then calling
 *  its method <code>setType('sawtooth')</code>.
 *  See Oscillator for methods.
 *
 *  @class  p5.SawOsc
 *  @constructor
 *  @extends Oscillator
 *  @param {Number} [freq] Set the frequency
 */

        exports.TriOsc = TriOsc;
        class SawOsc extends Oscillator {
          constructor(freq) {
            super (freq, 'sawtooth');
          }
        }        /**
 *  Constructor: <code>new p5.SqrOsc()</code>.
 *  This creates a Square Wave Oscillator and is
 *  equivalent to <code> new Oscillator('square')
 *  </code> or creating a Oscillator and then calling
 *  its method <code>setType('square')</code>.
 *  See Oscillator for methods.
 *
 *  @class  p5.SqrOsc
 *  @constructor
 *  @extends Oscillator
 *  @param {Number} [freq] Set the frequency
 */

        exports.SawOsc = SawOsc;
        class SqrOsc extends Oscillator {
          constructor(freq) {
            super (freq, 'square');
          }
        }
        exports.SqrOsc = SqrOsc;
        var _default = exports.default = Oscillator;
      },
      {
        './audioContext': 15,
        './main': 20,
        'tone': 1
      }
    ],
    12: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext.js'));
        var _Effect = _interopRequireDefault(_dereq_('./Effect.js'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        // import p5sound from './main';

        let Panner;
        // Stereo panner
        // if there is a stereo panner node use it
        if (typeof _audioContext.default.createStereoPanner !== 'undefined') {
          /**
   * The Panner class allows you to control the stereo
   * panning of a sound source. It uses the [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode),
   * which allows you to adjust the balance between the left and right channels of a sound source.
   *
   * This class extends <a href = "/reference/#/Effect">Effect</a>.
   * Methods <a href = "/reference/#/Effect/amp">amp()</a>, <a href = "/reference/#/Effect/chain">chain()</a>,
   * <a href = "/reference/#/Effect/drywet">drywet()</a>, <a href = "/reference/#/Effect/connect">connect()</a>, and
   * <a href = "/reference/#/Effect/disconnect">disconnect()</a> are available.
   *
   * @class Panner
   * @extends Effect
   */
          class PannerTemp extends _Effect.default {
            constructor() {
              super ();
              this.stereoPanner = _audioContext.default.createStereoPanner();
              this.input.connect(this.stereoPanner);
              this.stereoPanner.connect(this.wet);
            }            /**
     * Set the stereo pan position, a value of -1 means the sound will be fully panned
     * to the left, a value of 0 means the sound will be centered, and a value of 1 means
     * the sound will be fully panned to the right.
     * @method pan
     * @for Panner
     * @param {Number} value  A value between -1 and 1 that sets the pan position.
     *
     * @param {Number} [time] time in seconds that it will take for the panning to change to the specified value.
    *  @example
    * <div><code>
    * function setup() {
    *  console.log('TODO EXAMPLE');
    * }
    *
    * function draw() {
    * }
     */

            pan(val, tFromNow) {
              if (typeof val === 'number') {
                let time = tFromNow || 0;
                this.stereoPanner.pan.linearRampToValueAtTime(val, _audioContext.default.currentTime + time);
              } else if (typeof val !== 'undefined') {
                val.connect(this.stereoPanner.pan);
              }
            }            /**
     *  Return the current panning value.
     *
     *  @method  getPan
     *  @for Panner
     *  @return {Number} current panning value, number between -1 (left) and 1 (right).
     *  @example
    * <div><code>
    * function setup() {
    *  console.log('TODO EXAMPLE');
    * }
    *
    * function draw() {
    * }
     */

            getPan() {
              return this.stereoPanner.pan.value;
            }            /**
     *  Get rid of the Panner and free up its resources / memory.
     *
     *  @method  dispose
     *  @for Panner
        *  @example
    * <div><code>
    * function setup() {
    *  console.log('TODO EXAMPLE');
    * }
    *
    * function draw() {
    * }
     */

            dispose() {
              super.dispose();
              if (this.stereoPanner) {
                this.stereoPanner.disconnect();
                delete this.stereoPanner;
              }
            }
          }
          Panner = PannerTemp;
        } else {
          // if there is no createStereoPanner object
          // such as in safari 7.1.7 at the time of writing this
          // use this method to create the effect
          class PannerTemp extends _Effect.default {
            constructor() {
              super ();
              // 'explicit' channelCountMode will convert any number of channels to stereo
              this.input.channelCountMode = 'explicit';
              this.panValue = 0;
              this.left = _audioContext.default.createGain();
              this.right = _audioContext.default.createGain();
              this.left.channelInterpretation = 'discrete';
              this.right.channelInterpretation = 'discrete';
              this.splitter = _audioContext.default.createChannelSplitter(2);
              this.merger = _audioContext.default.createChannelMerger(2);
              this.input.connect(this.splitter);
              this.splitter.connect(this.left, 1);
              this.splitter.connect(this.right, 0);
              this.left.connect(this.merger, 0, 1);
              this.right.connect(this.merger, 0, 0);
              this.merger.connect(this.wet);
            }            // -1 is left, +1 is right

            pan(val, tFromNow) {
              this.panValue = val;
              let time = tFromNow || 0;
              let t = _audioContext.default.currentTime + time;
              let v = (val + 1) / 2;
              let rightVal = Math.cos(v * Math.PI / 2);
              let leftVal = Math.sin(v * Math.PI / 2);
              this.left.gain.linearRampToValueAtTime(leftVal, t);
              this.right.gain.linearRampToValueAtTime(rightVal, t);
            }
            getPan() {
              return this.panValue;
            }
            dispose() {
              super.dispose();
              if (this.left) {
                this.left.disconnect();
                delete this.left;
              }
              if (this.right) {
                this.right.disconnect();
                delete this.right;
              }
              if (this.splitter) {
                this.splitter.disconnect();
                delete this.splitter;
              }
              if (this.merger) {
                this.merger.disconnect();
                delete this.merger;
              }
            }
          }
          Panner = PannerTemp;
        }
        var _default = exports.default = Panner;
      },
      {
        './Effect.js': 7,
        './audioContext.js': 15
      }
    ],
    13: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        exports.loadSound = loadSound;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _processorNames = _interopRequireDefault(_dereq_('./audioWorklet/processorNames'));
        var _errorHandler = _interopRequireDefault(_dereq_('./errorHandler'));
        var _helpers = _dereq_('./helpers');
        var _Panner = _interopRequireDefault(_dereq_('./Panner'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        let _createCounterBuffer = function (buffer) {
          const len = buffer.length;
          const audioBuf = _audioContext.default.createBuffer(1, buffer.length, _audioContext.default.sampleRate);
          const arrayBuffer = audioBuf.getChannelData(0);
          for (let index = 0; index < len; index++) {
            arrayBuffer[index] = index;
          }
          return audioBuf;
        };
        /*** SCHEDULE EVENTS ***/
        // Cue inspired by JavaScript setTimeout, and the
        // Tone.js Transport Timeline Event, MIT License Yotam Mann 2015 tonejs.org
        class Cue {
          constructor(callback, time, id, val) {
            this.callback = callback;
            this.time = time;
            this.id = id;
            this.val = val;
          }
        }        // event handler to remove references to the bufferSourceNode when it is done playing

        function _clearOnEnd(e) {
          const thisBufferSourceNode = e.target;
          const soundFile = this;
          // delete this.bufferSourceNode from the sources array when it is done playing:
          thisBufferSourceNode._playing = false;
          thisBufferSourceNode.removeEventListener('ended', soundFile._clearOnEnd);
          // call the onended callback
          soundFile._onended(soundFile);
          // delete bufferSourceNode(s) in soundFile.bufferSourceNodes
          // iterate in reverse order because the index changes by splice
          soundFile.bufferSourceNodes.map((_, i) =>i).reverse().forEach(function (i) {
            const n = soundFile.bufferSourceNodes[i];
            if (n._playing === false) {
              soundFile.bufferSourceNodes.splice(i, 1);
            }
          });
          if (soundFile.bufferSourceNodes.length === 0) {
            soundFile._playing = false;
          }
        }        /**
 *  <p>SoundFile object with a path to a file.</p>
 *
 *  <p>The SoundFile may not be available immediately because
 *  it loads the file information asynchronously.</p>
 *
 *  <p>To do something with the sound as soon as it loads
 *  pass the name of a function as the second parameter.</p>
 *
 *  <p>Only one file path is required. However, audio file formats
 *  (i.e. mp3, ogg, wav and m4a/aac) are not supported by all
 *  web browsers. If you want to ensure compatability, instead of a single
 *  file path, you may include an Array of filepaths, and the browser will
 *  choose a format that works.</p>
 *
 *  @class SoundFile
 *  @constructor
 *  @param {String|Array} path   path to a sound file (String). Optionally,
 *                               you may include multiple file formats in
 *                               an array. Alternately, accepts an object
 *                               from the HTML5 File API, or a p5.File.
 *  @param {Function} [successCallback]   Name of a function to call once file loads
 *  @param {Function} [errorCallback]   Name of a function to call if file fails to
 *                                      load. This function will receive an error or
 *                                     XMLHttpRequest object with information
 *                                     about what went wrong.
 *  @param {Function} [whileLoadingCallback]   Name of a function to call while file
 *                                             is loading. That function will
 *                                             receive progress of the request to
 *                                             load the sound file
 *                                             (between 0 and 1) as its first
 *                                             parameter. This progress
 *                                             does not account for the additional
 *                                             time needed to decode the audio data.
 *
 *  @example
 *  <div><code>
 *  let mySound;
 *  function preload() {
 *    soundFormats('mp3', 'ogg');
 *    mySound = loadSound('assets/doorbell');
 *  }
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(canvasPressed);
 *    background(220);
 *    text('tap here to play', 10, 20);
 *  }
 *
 *  function canvasPressed() {
 *    // playing a sound file on a user gesture
 *    // is equivalent to `userStartAudio()`
 *    mySound.play();
 *  }
 * </code></div>
 */

        class SoundFile {
          constructor(paths, onload, onerror, whileLoading) {
            if (typeof paths !== 'undefined') {
              if (typeof paths === 'string' || typeof paths[0] === 'string') {
                let path = p5.prototype._checkFileFormats(paths);
                this.url = path;
              } else if (typeof paths === 'object') {
                if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                  // The File API isn't supported in this browser
                  throw 'Unable to load file because the File API is not supported';
                }
              }              // if type is a p5.File...get the actual file

              if (paths.file) {
                paths = paths.file;
              }
              this.file = paths;
            }            // private _onended callback, set by the method: onended(callback)

            this._onended = function () {
            };
            this._looping = false;
            this._playing = false;
            this._paused = false;
            this._pauseTime = 0;
            // cues for scheduling events with addCue() removeCue()
            this._cues = [
            ];
            this._cueIDCounter = 0;
            //  position of the most recently played sample
            this._lastPos = 0;
            this._counterNode = null;
            this._workletNode = null;
            // array of sources so that they can all be stopped!
            this.bufferSourceNodes = [
            ];
            // current source
            this.bufferSourceNode = null;
            this.buffer = null;
            this.playbackRate = 1;
            this.input = _audioContext.default.createGain();
            this.output = _audioContext.default.createGain();
            this.reversed = false;
            // start and end of playback / loop
            this.startTime = 0;
            this.endTime = null;
            this.pauseTime = 0;
            // "restart" would stop playback before retriggering
            this.mode = 'sustain';
            // time that playback was started, in millis
            this.startMillis = null;
            // stereo panning
            this.panner = new _Panner.default();
            this.output.connect(this.panner);
            this.panner.connect(_main.default.input);
            // it is possible to instantiate a soundfile with no path
            if (this.url || this.file) {
              this.load(onload, onerror);
            }            // add this SoundFile to the soundArray

            _main.default.soundArray.push(this);
            if (typeof whileLoading === 'function') {
              this._whileLoading = whileLoading;
            } else {
              this._whileLoading = function () {
              };
            }
            this._clearOnEnd = _clearOnEnd.bind(this);
            // same as setVolume, to match Processing Sound
            this.amp = this.setVolume;
            // these are the same thing
            this.fade = this.setVolume;
          }          /**
   * This is a helper function that the SoundFile calls to load
   * itself. Accepts a callback (the name of another function)
   * as an optional parameter.
   *
   * @private
   * @for SoundFile
   * @param {Function} [successCallback]   Name of a function to call once file loads
   * @param {Function} [errorCallback]   Name of a function to call if there is an error
   */

          load(callback, errorCallback) {
            let self = this;
            let errorTrace = new Error().stack;
            if (this.url !== undefined && this.url !== '') {
              let request = new XMLHttpRequest();
              request.addEventListener('progress', function (evt) {
                self._updateProgress(evt);
              }, false);
              request.open('GET', this.url, true);
              request.responseType = 'arraybuffer';
              request.onload = function () {
                if (request.status === 200) {
                  // on sucess loading file:
                  if (!self.panner) return;
                  _audioContext.default.decodeAudioData(request.response,                  // success decoding buffer:
                  function (buff) {
                    if (!self.panner) return;
                    self.buffer = buff;
                    if (callback) {
                      callback(self);
                    }
                  },                  // error decoding buffer. "e" is undefined in Chrome 11/22/2015
                  function () {
                    if (!self.panner) return;
                    let err = new _errorHandler.default('decodeAudioData', errorTrace, self.url);
                    let msg = 'AudioContext error at decodeAudioData for ' + self.url;
                    if (errorCallback) {
                      err.msg = msg;
                      errorCallback(err);
                    } else {
                      console.error(msg + '\n The error stack trace includes: \n' + err.stack);
                    }
                  });
                }                // if request status != 200, it failed
                 else {
                  if (!self.panner) return;
                  let err = new _errorHandler.default('loadSound', errorTrace, self.url);
                  let msg = 'Unable to load ' + self.url + '. The request status was: ' + request.status + ' (' + request.statusText + ')';
                  if (errorCallback) {
                    err.message = msg;
                    errorCallback(err);
                  } else {
                    console.error(msg + '\n The error stack trace includes: \n' + err.stack);
                  }
                }
              };
              // if there is another error, aside from 404...
              request.onerror = function () {
                let err = new _errorHandler.default('loadSound', errorTrace, self.url);
                let msg = 'There was no response from the server at ' + self.url + '. Check the url and internet connectivity.';
                if (errorCallback) {
                  err.message = msg;
                  errorCallback(err);
                } else {
                  console.error(msg + '\n The error stack trace includes: \n' + err.stack);
                }
              };
              request.send();
            } else if (this.file !== undefined) {
              let reader = new FileReader();
              reader.onload = function () {
                if (!self.panner) return;
                _audioContext.default.decodeAudioData(reader.result, function (buff) {
                  if (!self.panner) return;
                  self.buffer = buff;
                  if (callback) {
                    callback(self);
                  }
                });
              };
              reader.onerror = function (e) {
                if (!self.panner) return;
                if (onerror) {
                  onerror(e);
                }
              };
              reader.readAsArrayBuffer(this.file);
            }
          }          // TO DO: use this method to create a loading bar that shows progress during file upload/decode.

          _updateProgress(evt) {
            if (evt.lengthComputable) {
              let percentComplete = evt.loaded / evt.total * 0.99;
              this._whileLoading(percentComplete, evt);
              // ...
            } else {
              // Unable to compute progress information since the total size is unknown
              this._whileLoading('size unknown');
            }
          }          /**
   *  Returns true if the sound file finished loading successfully.
   *
   *  @method  isLoaded
   *  @for SoundFile
   *  @return {Boolean}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          isLoaded() {
            if (this.buffer) {
              return true;
            } else {
              return false;
            }
          }          /**
   * Play the SoundFile
   *
   * @method play
   * @for SoundFile
   * @param {Number} [startTime]            (optional) schedule playback to start (in seconds from now).
   * @param {Number} [rate]             (optional) playback rate
   * @param {Number} [amp]              (optional) amplitude (volume)
   *                                     of playback
   * @param {Number} [cueStart]        (optional) cue start time in seconds
   * @param {Number} [duration]          (optional) duration of playback in seconds
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          play(startTime, rate, amp, _cueStart, duration) {
            if (!this.output) {
              console.warn('SoundFile.play() called after dispose');
              return;
            }
            let now = _audioContext.default.currentTime;
            let cueStart,
            cueEnd;
            let time = startTime || 0;
            if (time < 0) {
              time = 0;
            }
            time = time + now;
            if (typeof rate !== 'undefined') {
              this.rate(rate);
            }
            if (typeof amp !== 'undefined') {
              this.setVolume(amp);
            }            // TO DO: if already playing, create array of buffers for easy stop()

            if (this.buffer) {
              // reset the pause time (if it was paused)
              this._pauseTime = 0;
              // handle restart playmode
              if (this.mode === 'restart' && this.buffer && this.bufferSourceNode) {
                this.bufferSourceNode.stop(time);
                // this._counterNode.stop(time);
              }              //dont create another instance if already playing

              if (this.mode === 'untildone' && this.isPlaying()) {
                return;
              }              // make a new source and counter. They are automatically assigned playbackRate and buffer

              this.bufferSourceNode = this._initSourceNode();
              // garbage collect counterNode and create a new one
              // delete this._counterNode;
              // this._counterNode = this._initCounterNode();
              if (_cueStart) {
                if (_cueStart >= 0 && _cueStart < this.buffer.duration) {
                  // this.startTime = cueStart;
                  cueStart = _cueStart;
                } else {
                  throw 'start time out of range';
                }
              } else {
                cueStart = 0;
              }
              if (duration) {
                // if duration is greater than buffer.duration, just play entire file anyway rather than throw an error
                duration = duration <= this.buffer.duration - cueStart ? duration : this.buffer.duration;
              }              // if it was paused, play at the pause position

              if (this._paused) {
                this.bufferSourceNode.start(time, this.pauseTime, duration);
                // this._counterNode.start(time, this.pauseTime, duration);
              } else {
                this.bufferSourceNode.start(time, cueStart, duration);
                // this._counterNode.start(time, cueStart, duration);
              }
              this._playing = true;
              this._paused = false;
              // add source to sources array, which is used in stopAll()
              this.bufferSourceNodes.push(this.bufferSourceNode);
              this.bufferSourceNode._arrayIndex = this.bufferSourceNodes.length - 1;
              this.bufferSourceNode.addEventListener('ended', this._clearOnEnd);
            }            // If soundFile hasn't loaded the buffer yet, throw an error
             else {
              throw 'not ready to play file, buffer has yet to load. Try preload()';
            }            // if looping, will restart at original time

            this.bufferSourceNode.loop = this._looping;
            // this._counterNode.loop = this._looping;
            if (this._looping === true) {
              cueEnd = duration ? duration : cueStart - 1e-15;
              this.bufferSourceNode.loopStart = cueStart;
              this.bufferSourceNode.loopEnd = cueEnd;
              // this._counterNode.loopStart = cueStart;
              // this._counterNode.loopEnd = cueEnd;
            }
          }          /**
   *  SoundFile has two play modes: <code>restart</code> and
   *  <code>sustain</code>. Play Mode determines what happens to a
   *  SoundFile if it is triggered while in the middle of playback.
   *  In sustain mode, playback will continue simultaneous to the
   *  new playback. In restart mode, play() will stop playback
   *  and start over. With untilDone, a sound will play only if it's
   *  not already playing. Sustain is the default mode.
   *
   *  @method  playMode
   *  @for SoundFile
   *  @param  {String} str 'restart' or 'sustain' or 'untilDone'
   *  @example
   *  <div><code>
   *  let mySound;
   *  function preload(){
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    noFill();
   *    rect(0, height/2, width - 1, height/2 - 1);
   *    rect(0, 0, width - 1, height/2);
   *    textAlign(CENTER, CENTER);
   *    fill(20);
   *    text('restart', width/2, 1 * height/4);
   *    text('sustain', width/2, 3 * height/4);
   *  }
   *  function canvasPressed() {
   *    if (mouseX < height/2) {
   *      mySound.playMode('restart');
   *    } else {
   *      mySound.playMode('sustain');
   *    }
   *    mySound.play();
   *  }
   *
   * </code></div>
   */

          playMode(str) {
            let s = str.toLowerCase().trim();
            // if restart, stop all other sounds from playing
            if (s === 'restart' && this.buffer && this.bufferSourceNode) {
              for (let i = 0; i < this.bufferSourceNodes.length; i++) {
                let now = _audioContext.default.currentTime;
                this.bufferSourceNodes[i].stop(now);
              }
            }            // set play mode to effect future playback

            if (s === 'restart' || s === 'sustain' || s === 'untildone') {
              this.mode = s;
            } else {
              throw 'Invalid play mode. Must be either "restart" or "sustain"';
            }
          }          /**
   *  Pauses a file that is currently playing. If the file is not
   *  playing, then nothing will happen.
   *
   *  After pausing, .play() will resume from the paused
   *  position.
   *  If SoundFile had been set to loop before it was paused,
   *  it will continue to loop after it is unpaused with .play().
   *
   *  @method pause
   *  @for SoundFile
   *  @param {Number} [startTime] (optional) schedule event to occur
   *                               seconds from now
   *  @example
   *  <div><code>
   *  let soundFile;
   *  function preload() {
   *    soundFormats('ogg', 'mp3');
   *    soundFile = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');
   *  }
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to play, release to pause', 10, 20, width - 20);
   *  }
   *  function canvasPressed() {
   *    soundFile.loop();
   *    background(0, 200, 50);
   *  }
   *  function mouseReleased() {
   *    soundFile.pause();
   *    background(220);
   *  }
   *  </code>
   *  </div>
   */

          pause(startTime) {
            let now = _audioContext.default.currentTime;
            let time = startTime || 0;
            let pTime = time + now;
            if (this.isPlaying() && this.buffer && this.bufferSourceNode) {
              this._paused = true;
              this._playing = false;
              this.pauseTime = this.currentTime();
              this.bufferSourceNode.stop(pTime);
              // this._counterNode.stop(pTime);
              this._pauseTime = this.currentTime();
              // TO DO: make sure play() still starts from orig start position
            } else {
              this._pauseTime = 0;
            }
          }          /**
   * Loop the SoundFile. Accepts optional parameters to set the
   * playback rate, playback volume, loopStart, loopEnd.
   *
   * @method loop
   * @for SoundFile
   * @param {Number} [startTime] (optional) schedule event to occur
   *                             seconds from now
   * @param {Number} [rate]        (optional) playback rate
   * @param {Number} [amp]         (optional) playback volume
   * @param {Number} [cueLoopStart] (optional) startTime in seconds
   * @param {Number} [duration]  (optional) loop duration in seconds
   * @example
   *  <div><code>
   *  let soundFile;
   *  let loopStart = 0.5;
   *  let loopDuration = 0.2;
   *  function preload() {
   *    soundFormats('ogg', 'mp3');
   *    soundFile = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');
   *  }
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to play, release to pause', 10, 20, width - 20);
   *  }
   *  function canvasPressed() {
   *    soundFile.loop();
   *    background(0, 200, 50);
   *  }
   *  function mouseReleased() {
   *    soundFile.pause();
   *    background(220);
   *  }
   *  </code>
   *  </div>
   */

          loop(startTime, rate, amp, loopStart, duration) {
            this._looping = true;
            this.play(startTime, rate, amp, loopStart, duration);
          }          /**
   * Set a SoundFile's looping flag to true or false. If the sound
   * is currently playing, this change will take effect when it
   * reaches the end of the current playback.
   *
   * @method setLoop
   * @for SoundFile
   * @param {Boolean} Boolean   set looping to true or false
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setLoop(bool) {
            if (bool === true) {
              this._looping = true;
            } else if (bool === false) {
              this._looping = false;
            } else {
              throw 'Error: setLoop accepts either true or false';
            }
            if (this.bufferSourceNode) {
              this.bufferSourceNode.loop = this._looping;
              this._counterNode.loop = this._looping;
            }
          }          /**
   * Returns 'true' if a SoundFile is currently looping and playing, 'false' if not.
   *
   * @method isLooping
   * @for SoundFile
   * @return {Boolean}
   * @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          isLooping() {
            if (!this.bufferSourceNode) {
              return false;
            }
            if (this._looping === true && this.isPlaying() === true) {
              return true;
            }
            return false;
          }          /**
   *  Returns true if a SoundFile is playing, false if not (i.e.
   *  paused or stopped).
   *
   *  @method isPlaying
   *  @for SoundFile
   *  @return {Boolean}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          isPlaying() {
            return this._playing;
          }          /**
   *  Returns true if a SoundFile is paused, false if not (i.e.
   *  playing or stopped).
   *
   *  @method  isPaused
   *  @for SoundFile
   *  @return {Boolean}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          isPaused() {
            return this._paused;
          }          /**
   * Stop soundfile playback.
   *
   * @method stop
   * @for SoundFile
   * @param {Number} [startTime] (optional) schedule event to occur
   *                             in seconds from now
  * @example
  * <div><code>
  * function setup() {
  * console.log('TODO EXAMPLE');
  * }
  *
  * function draw() {
  * }
  * </code></div>
   */

          stop(timeFromNow) {
            let time = timeFromNow || 0;
            if (this.mode === 'sustain' || this.mode === 'untildone') {
              this.stopAll(time);
              this._playing = false;
              this.pauseTime = 0;
              this._paused = false;
            } else if (this.buffer && this.bufferSourceNode) {
              let now = _audioContext.default.currentTime;
              this.pauseTime = 0;
              this.bufferSourceNode.stop(now + time);
              // this._counterNode.stop(now + time);
              this._playing = false;
              this._paused = false;
            }
          }          /**
   *  Stop playback on all of this soundfile's sources.
   *  @private
   */

          stopAll(_time) {
            let now = _audioContext.default.currentTime;
            let time = _time || 0;
            if (this.buffer && this.bufferSourceNode) {
              for (let i in this.bufferSourceNodes) {
                const bufferSourceNode = this.bufferSourceNodes[i];
                if (bufferSourceNode) {
                  try {
                    bufferSourceNode.stop(now + time);
                  } catch (e) {
                    // this was throwing errors only on Safari
                  }
                }
              }              // this._counterNode.stop(now + time);

            }
          }          /**
   * It returns the volume of a sound, which is a measure
   * of how loud or quiet the sound is.
   *
   * @method getVolume
   * @for SoundFile
   * @return {Number}
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          getVolume() {
            return this.output.gain.value;
          }          /**
   * Set the stereo panning of a p5.sound object to
   * a floating point number between -1.0 (left) and 1.0 (right).
   * Default is 0.0 (center).
   *
   * @method pan
   * @for SoundFile
   * @param {Number} panValue     Set the stereo panner
   * @param {Number} [timeFromNow]  schedule this event to happen
   *                                 seconds from now
   * @example
   * <div><code>
   *  let ballX = 0;
   *  let soundFile;
   *
   *  function preload() {
   *    soundFormats('ogg', 'mp3');
   *    soundFile = loadSound('assets/beatbox.mp3');
   *  }
   *
   *  function draw() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    ballX = constrain(mouseX, 0, width);
   *    ellipse(ballX, height/2, 20, 20);
   *  }
   *
   *  function canvasPressed(){
   *    // map the ball's x location to a panning degree
   *    // between -1.0 (left) and 1.0 (right)
   *    let panning = map(ballX, 0., width,-1.0, 1.0);
   *    soundFile.pan(panning);
   *    soundFile.play();
   *  }
   *  </div></code>
   */

          pan(pval, tFromNow) {
            this.panner.pan(pval, tFromNow);
          }          /**
   * Returns the current stereo pan position (-1.0 to 1.0)
   *
   * @method getPan
   * @for SoundFile
   * @return {Number} Returns the stereo pan setting of the Oscillator
   *                          as a number between -1.0 (left) and 1.0 (right).
   *                          0.0 is center and default.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          getPan() {
            return this.panner.getPan();
          }          /**
   *  Set the playback rate of a sound file. Will change the speed and the pitch.
   *  Values less than zero will reverse the audio buffer.
   *
   *  @method rate
   *  @for SoundFile
   *  @param {Number} [playbackRate]     Set the playback rate. 1.0 is normal,
   *                                     .5 is half-speed, 2.0 is twice as fast.
   *                                     Values less than zero play backwards.
   *  @example
   *  <div><code>
   *  let mySound;
   *
   *  function preload() {
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *  }
   *  function canvasPressed() {
   *    mySound.loop();
   *  }
   *  function mouseReleased() {
   *    mySound.pause();
   *  }
   *  function draw() {
   *    background(220);
   *
   *    // Set the rate to a range between 0.1 and 4
   *    // Changing the rate also alters the pitch
   *    let playbackRate = map(mouseY, 0.1, height, 2, 0);
   *    playbackRate = constrain(playbackRate, 0.01, 4);
   *    mySound.rate(playbackRate);
   *
   *    line(0, mouseY, width, mouseY);
   *    text('rate: ' + round(playbackRate * 100) + '%', 10, 20);
   *  }
   *
   * </code>
   * </div>
   *
   */

          rate(playbackRate) {
            let reverse = false;
            if (typeof playbackRate === 'undefined') {
              return this.playbackRate;
            }
            this.playbackRate = playbackRate;
            if (playbackRate === 0) {
              playbackRate = 1e-13;
            } else if (playbackRate < 0 && !this.reversed) {
              playbackRate = Math.abs(playbackRate);
              reverse = true;
            } else if (playbackRate > 0 && this.reversed) {
              reverse = true;
            }
            if (this.bufferSourceNode) {
              let now = _audioContext.default.currentTime;
              this.bufferSourceNode.playbackRate.cancelScheduledValues(now);
              this.bufferSourceNode.playbackRate.linearRampToValueAtTime(Math.abs(playbackRate), now);
              this._counterNode.playbackRate.cancelScheduledValues(now);
              this._counterNode.playbackRate.linearRampToValueAtTime(Math.abs(playbackRate), now);
            }
            if (reverse) {
              this.reverseBuffer();
            }
            return this.playbackRate;
          }          /**
   *  Pitch of a sound file can be changed by providing a MIDI note number.
   *  It will change the pitch and also the speed.
   *  If the input note is 60 (middle C), then frequency and speed is normal.
   *  If we increase the note input, then frequency and speed increases,
   *  and if we decrease the note input, then frequency and speed decreases.
   *
   *  @method setPitch
   *  @for SoundFile
   *  @param {Number} pitchRate     If the MIDI note is increased, then both the
   *                                frequency of the sound and its playback speed
   *                                will increase as a result.
   *  @example
   *  <div><code>
   *  let sound, sRate, midiVal;
   *  let midiNotes = [60, 64, 67, 72];
   *  let noteIndex = 0;
   *
   *  function preload() {
   *    sound = loadSound('assets/beat.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(startSound);
   *  }
   *
   *  function draw() {
   *    background(220);
   *    sRate = sound.rate();
   *    text('tap to play', 10, 20);
   *    if (midiVal) {
   *      text('MIDI: ' + midiVal, 10, 40);
   *      text('Rate: ' + sRate, 10, 60);
   *    }
   *  }
   *
   *  function startSound() {
   *    if (sound.isPlaying()) {
   *      sound.stop();
   *    }
   *    sound.play();
   *    midiVal = midiNotes[noteIndex % midiNotes.length];
   *    sound.setPitch(midiVal);
   *
   *    noteIndex++;
   *  }
   *  </code></div>
   */

          setPitch(num) {
            let newPlaybackRate = (0, _helpers.midiToFreq) (num) / (0, _helpers.midiToFreq) (60);
            this.rate(newPlaybackRate);
          }          /**
   * Returns the current pitch of a sound file as a MIDI note.
   *
   * @method getPitch
   * @for SoundFile
   * @return {Number}  Current pitch of the SoundFile. The default note is assumed to
   *                   be 60 (middle C).
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          getPitch() {
            let freqValue = this.rate() * (0, _helpers.midiToFreq) (60);
            return freqToMidi(freqValue);
          }          /**
   * Returns the current playback rate of a sound file.
   *
   * @method getPlaybackRate
   * @for SoundFile
   * @return {Number}  Current playback rate of the SoundFile.
     *  @example
   *  <div><code>
   *  let mySound;
   *
   *  function preload() {
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *  }
   *  function canvasPressed() {
   *    mySound.loop();
   *  }
   *  function mouseReleased() {
   *    mySound.pause();
   *  }
   *  function draw() {
   *    background(220);
   *
   *    let playbackRate = mySound.getPlaybackRate();
   *    text('rate: ' + round(playbackRate * 100) + '%', 10, 20);
   *  }
   *
   * </code>
   * </div>
   *
   */

          getPlaybackRate() {
            return this.playbackRate;
          }          /**
   *  Multiply the output volume (amplitude) of a sound file
   *  between 0.0 (silence) and 1.0 (full volume).
   *  1.0 is the maximum amplitude of a digital sound, so multiplying
   *  by greater than 1.0 may cause digital distortion. To
   *  fade, provide a <code>rampTime</code> parameter. For more
   *  complex fades, see the Envelope class.
   *
   *  Alternately, you can pass in a signal source such as an
   *  oscillator to modulate the amplitude with an audio signal.
   *
   *  @method  setVolume
   *  @for SoundFile
   *  @param {Number|Object} volume  Volume (amplitude) between 0.0
   *                                     and 1.0 or modulating signal/oscillator
   *  @param {Number} [rampTime]  Fade for t seconds
   *  @param {Number} [timeFromNow]  Schedule this event to happen at
   *                                 t seconds in the future
  *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setVolume(vol, _rampTime, _tFromNow) {
            if (typeof vol === 'number') {
              let rampTime = _rampTime || 0;
              let tFromNow = _tFromNow || 0;
              let now = _audioContext.default.currentTime;
              let currentVol = this.output.gain.value;
              this.output.gain.cancelScheduledValues(now + tFromNow);
              this.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
              this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
            } else if (vol) {
              vol.connect(this.output.gain);
            } else {
              // return the Gain Node
              return this.output.gain;
            }
          }          /**
   * Returns the duration of a sound file in seconds.
   *
   * @method duration
   * @for SoundFile
   * @return {Number} The duration of the soundFile in seconds.
    * @example
  * <div><code>
  * function setup() {
  * console.log('TODO EXAMPLE');
  * }
  *
  * function draw() {
  * }
  * </code></div>
   */

          duration() {
            // Return Duration
            if (this.buffer) {
              return this.buffer.duration;
            } else {
              return 0;
            }
          }          /**
   * Return the current position of the SoundFile playhead, in seconds.
   * Time is relative to the normal buffer direction, so if `reverseBuffer`
   * has been called, currentTime will count backwards.
   *
   * @method currentTime
   * @for SoundFile
   * @return {Number}   currentTime of the soundFile in seconds.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          currentTime() {
            return this.reversed ? Math.abs(this._lastPos - this.buffer.length) / _audioContext.default.sampleRate : this._lastPos / _audioContext.default.sampleRate;
          }          /**
   * Move the playhead of a soundfile that is currently playing to a
   * new position and a new duration, in seconds.
   * If none are given, will reset the file to play entire duration
   * from start to finish. To set the position of a soundfile that is
   * not currently playing, use the `play` or `loop` methods.
   *
   * @method jump
   * @for SoundFile
   * @param {Number} cueTime    cueTime of the soundFile in seconds.
   * @param {Number} duration    duration in seconds.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          jump(cueTime, duration) {
            if (cueTime < 0 || cueTime > this.buffer.duration) {
              throw 'jump time out of range';
            }
            if (duration > this.buffer.duration - cueTime) {
              throw 'end time out of range';
            }
            let cTime = cueTime || 0;
            let dur = duration || undefined;
            if (this.isPlaying()) {
              this.stop(0);
              this.play(0, this.playbackRate, this.output.gain.value, cTime, dur);
            }
          }          /**
   * Return the number of channels in a sound file.
   * For example, Mono = 1, Stereo = 2.
   *
   * @method channels
   * @for SoundFile
   * @return {Number} [channels]
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          channels() {
            if (this.buffer) return this.buffer.numberOfChannels;
          }          /**
   * Return the sample rate of the sound file.
   *
   * @method sampleRate
   * @for SoundFile
   * @return {Number} [sampleRate]
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          sampleRate() {
            if (this.buffer) return this.buffer.sampleRate;
          }          /**
   * Return the number of samples in a sound file.
   * Equal to sampleRate * duration.
   *
   * @method frames
   * @for SoundFile
   * @return {Number} [sampleCount]
  * @example
  * <div><code>
  * function setup() {
  * console.log('TODO EXAMPLE');
  * }
  *
  * function draw() {
  * }
  * </code></div>
   */

          frames() {
            if (this.buffer) return this.buffer.length;
          }          /**
   * Returns an array of amplitude peaks in a SoundFile that can be
   * used to draw a static waveform. Scans through the SoundFile's
   * audio buffer to find the greatest amplitudes. Accepts one
   * parameter, 'length', which determines size of the array.
   * Larger arrays result in more precise waveform visualizations.
   *
   * Inspired by Wavesurfer.js.
   *
   * @method  getPeaks
   * @for SoundFile
   * @params {Number} [length] length is the size of the returned array.
   *                          Larger length results in more precision.
   *                          Defaults to 5*width of the browser window.
   * @returns {Float32Array} Array of peaks.
  * @example
  * <div><code>
  * function setup() {
  * console.log('TODO EXAMPLE');
  * }
  *
  * function draw() {
  * }
  * </code></div>
   */

          getPeaks(length) {
            if (this.buffer) {
              // set length to window's width if no length is provided
              if (!length) {
                length = window.innerWidth * 5;
              }
              if (this.buffer) {
                let buffer = this.buffer;
                let sampleSize = buffer.length / length;
                let sampleStep = ~~(sampleSize / 10) || 1;
                let channels = buffer.numberOfChannels;
                let peaks = new Float32Array(Math.round(length));
                for (let c = 0; c < channels; c++) {
                  let chan = buffer.getChannelData(c);
                  for (let i = 0; i < length; i++) {
                    let start = ~~(i * sampleSize);
                    let end = ~~(start + sampleSize);
                    let max = 0;
                    for (let j = start; j < end; j += sampleStep) {
                      let value = chan[j];
                      if (value > max) {
                        max = value;
                        // faster than Math.abs
                      } else if ( - value > max) {
                        max = value;
                      }
                    }
                    if (c === 0 || Math.abs(max) > peaks[i]) {
                      peaks[i] = max;
                    }
                  }
                }
                return peaks;
              }
            } else {
              throw 'Cannot load peaks yet, buffer is not loaded';
            }
          }          /**
   *  Reverses the SoundFile's buffer source.
   *  Playback must be handled separately (see example).
   *
   *  @method  reverseBuffer
   *  @for SoundFile
   *  @example
   *  <div><code>
   *  let drum;
   *  function preload() {
   *    drum = loadSound('assets/drum.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to play', 20, 20);
   *  }
   *
   *  function canvasPressed() {
   *    drum.stop();
   *    drum.reverseBuffer();
   *    drum.play();
   *  }
   * </code>
   * </div>
   */

          reverseBuffer() {
            if (this.buffer) {
              let currentPos = this._lastPos / _audioContext.default.sampleRate;
              let curVol = this.getVolume();
              this.setVolume(0, 0.001);
              const numChannels = this.buffer.numberOfChannels;
              for (let i = 0; i < numChannels; i++) {
                this.buffer.getChannelData(i).reverse();
              }              // set reversed flag

              this.reversed = !this.reversed;
              if (this.isPlaying() && currentPos) {
                this.jump(this.duration() - currentPos);
              }
              this.setVolume(curVol, 0.001);
            } else {
              throw 'SoundFile is not done loading';
            }
          }          /**
   *  Schedule an event to be called when the soundfile
   *  reaches the end of a buffer. If the soundfile is
   *  playing through once, this will be called when it
   *  ends. If it is looping, it will be called when
   *  stop is called.
   *
   *  @method  onended
   *  @for SoundFile
   *  @param  {Function} callback function to call when the
   *                              soundfile has ended.
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          onended(callback) {
            this._onended = callback;
            return this;
          }
          add() {
            // TO DO
          }
          dispose() {
            let now = _audioContext.default.currentTime;
            // remove reference to soundfile
            let index = _main.default.soundArray.indexOf(this);
            _main.default.soundArray.splice(index, 1);
            this.stop(now);
            if (this.buffer && this.bufferSourceNode) {
              for (let i = 0; i < this.bufferSourceNodes.length - 1; i++) {
                if (this.bufferSourceNodes[i] !== null) {
                  this.bufferSourceNodes[i].disconnect();
                  try {
                    this.bufferSourceNodes[i].stop(now);
                  } catch (e) {
                    console.warn('no buffer source node to dispose');
                  }
                  this.bufferSourceNodes[i] = null;
                }
              }
              if (this.isPlaying()) {
                try {
                  // this._counterNode.stop(now);
                } catch (e) {
                  console.log(e);
                }
                this._counterNode = null;
              }
            }
            if (this.output) {
              this.output.disconnect();
              this.output = null;
            }
            if (this.panner) {
              this.panner.dispose();
              this.panner = null;
            }
          }          /**
   * Connects the output of a p5.sound object to input of another
   * p5.sound object. For example, you may connect a SoundFile to an
   * AnalyzerFFT or an Effect. If no parameter is given, it will connect to
   * the main output. Most p5.sound objects connect to the main
   * output when they are created.
   *
   * @method connect
   * @for SoundFile
   * @param {Object} [object] Audio object that accepts an input
  * @example
  * <div><code>
  * function setup() {
  * console.log('TODO EXAMPLE');
  * }
  *
  * function draw() {
  * }
  * </code></div>
   */

          connect(unit) {
            if (!unit) {
              // this.panner.connect(p5sound.input);
              this.output.connect(_main.default.input);
            } else {
              if (unit.hasOwnProperty('input')) {
                // this.panner.connect(unit.input);
                this.output.connect(unit.input);
              } else {
                // this.panner.connect(unit);
                this.output.connect(unit);
              }
            }
            if (unit && unit._onNewInput) {
              unit._onNewInput(this);
            }
          }          /**
   * Disconnects the output of this p5sound object.
   *
   * @method disconnect
   * @for SoundFile
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          disconnect() {
            // if (this.panner) {
            if (this.output) {
              // this.panner.disconnect();
              this.output.disconnect();
            }
          }          /**
   */

          getLevel() {
            console.warn('SoundFile.getLevel has been removed from the library. Use p5.Amplitude instead');
          }          /**
   *  Reset the source for this SoundFile to a
   *  new path (URL).
   *
   *  @method  setPath
   *  @for SoundFile
   *  @param {String}   path     path to audio file
   *  @param {Function} callback Callback
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setPath(p, callback) {
            let path = p5.prototype._checkFileFormats(p);
            this.url = path;
            this.load(callback);
          }          /**
   *  Replace the current Audio Buffer with a new Buffer.
   *
   *  @method setBuffer
   *  @for SoundFile
   *  @param {Array} buf Array of Float32 Array(s). 2 Float32 Arrays
   *                     will create a stereo source. 1 will create
   *                     a mono source.
   * @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          setBuffer(buf) {
            let numChannels = buf.length;
            let size = buf[0].length;
            let newBuffer = _audioContext.default.createBuffer(numChannels, size, _audioContext.default.sampleRate);
            if (!(buf[0] instanceof Float32Array)) {
              buf[0] = new Float32Array(buf[0]);
            }
            for (let channelNum = 0; channelNum < numChannels; channelNum++) {
              let channel = newBuffer.getChannelData(channelNum);
              channel.set(buf[channelNum]);
            }
            this.buffer = newBuffer;
          }          // initialize counterNode, set its initial buffer and playbackRate

          async _initCounterNode() {
            let self = this;
            // let now = audioContext.currentTime;
            // let cNode = audioContext.createBufferSource();
            // Reuse the worklet node rather than creating a new one. Even if we
            // disconnect it, it seems to leak and cause choppy audio after a
            // while.
            if (!self._workletNode) {
              // const workletBufferSize = safeBufferSize(256);
              const workletBufferSize = 256;
              self._workletNode = new AudioWorkletNode(_audioContext.default, _processorNames.default.soundFileProcessor, {
                processorOptions: {
                  bufferSize: workletBufferSize
                }
              });
              console.log('before', JSON.stringify(self._workletNode, null, 2));
              await self._workletNode.addModule('recorderProcessor.js');
              await self._workletNode.addModule('amplitudeProcessor.js');
              await self._workletNode.addModule('soundfileProcessor.js');
              console.log('after', JSON.stringify(self._workletNode, null, 2));
              self._workletNode.port.onmessage = event=>{
                if (event.data.name === 'position') {
                  // event.data.position should only be 0 when paused
                  if (event.data.position === 0) {
                    return;
                  }
                  this._lastPos = event.data.position;
                  // do any callbacks that have been scheduled
                  this._onTimeUpdate(self._lastPos);
                }
              };
              self._workletNode.connect(p5.soundOut._silentNode);
            }            // create counter buffer of the same length as self.buffer

            cNode.buffer = _createCounterBuffer(self.buffer);
            cNode.playbackRate.setValueAtTime(self.playbackRate, now);
            cNode.connect(self._workletNode);
            return cNode;
          }          // initialize sourceNode, set its initial buffer and playbackRate

          _initSourceNode() {
            let bufferSourceNode = _audioContext.default.createBufferSource();
            bufferSourceNode.buffer = this.buffer;
            bufferSourceNode.playbackRate.value = this.playbackRate;
            bufferSourceNode.connect(this.output);
            return bufferSourceNode;
          }
          processPeaks(callback, _initThreshold, _minThreshold, _minPeaks) {
            console.warn('processPeaks is deprecated');
          }          /**
   *  Schedule events to trigger every time a MediaElement
   *  (audio/video) reaches a playback cue point.
   *
   *  Accepts a callback function, a time (in seconds) at which to trigger
   *  the callback, and an optional parameter for the callback.
   *
   *
   *  @method  addCue
   *  @for SoundFile
   *  @param {Number}   time     Time in seconds, relative to this media
   *                             element's playback. For example, to trigger
   *                             an event every time playback reaches two
   *                             seconds, pass in the number 2. This will be
   *                             passed as the first parameter to
   *                             the callback function.
   *  @param {Function} callback Name of a function that will be
   *                             called at the given time. The callback will
   *                             optionally receive the third argument as its
   *                             parameter.
   *  @param {Object} [value]    An object to be passed as the
   *                             optional parameter to the
   *                             callback function.
   *  @return {Number} id ID of this cue,
   *                      useful for removeCue(id)
   *  @example
   *  <div><code>
   *  let mySound;
   *  function preload() {
   *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
   *  }
   *
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to play', 10, 20);
   *
   *    // schedule calls to changeText
   *    mySound.addCue(0, changeText, "hello" );
   *    mySound.addCue(0.5, changeText, "hello," );
   *    mySound.addCue(1, changeText, "hello, p5!");
   *    mySound.addCue(1.5, changeText, "hello, p5!!");
   *    mySound.addCue(2, changeText, "hello, p5!!!!!");
   *  }
   *
   *  function changeText(val) {
   *    background(220);
   *    text(val, 10, 20);
   *  }
   *
   *  function canvasPressed() {
   *    mySound.play();
   *  }
   *  </code></div>
   */

          addCue(time, callback, val) {
            let id = this._cueIDCounter++;
            let cue = new Cue(callback, time, id, val);
            this._cues.push(cue);
            // if (!this.elt.ontimeupdate) {
            //   this.elt.ontimeupdate = this._onTimeUpdate.bind(this);
            // }
            return id;
          }          /**
   *  Remove a callback based on its ID. The ID is returned by the
   *  addCue method.
   *
   *  @method removeCue
   *  @for SoundFile
   *  @param  {Number} id ID of the cue, as returned by addCue
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          removeCue(id) {
            let cueLength = this._cues.length;
            for (let i = 0; i < cueLength; i++) {
              let cue = this._cues[i];
              if (cue.id === id) {
                this._cues.splice(i, 1);
                break;
              }
            }
            if (this._cues.length === 0) {
              // TO DO: remove callback
              // this.elt.ontimeupdate = null
            }
          }          /**
   *  Remove all of the callbacks that had originally been scheduled
   *  via the addCue method.
   *
   *  @method  clearCues
   *  @example
   * <div><code>
   * function setup() {
   *  console.log('TODO EXAMPLE');
   * }
   *
   * function draw() {
   * }
   */

          clearCues() {
            this._cues = [
            ];
            // this.elt.ontimeupdate = null;
          }          // private method that checks for cues to be fired if events
          // have been scheduled using addCue(callback, time).

          _onTimeUpdate(position) {
            let playbackTime = position / this.buffer.sampleRate;
            let cueLength = this._cues.length;
            for (let i = 0; i < cueLength; i++) {
              let cue = this._cues[i];
              let callbackTime = cue.time;
              let val = cue.val;
              let leftLimit = this._prevUpdateTime || 0;
              let rightLimit = playbackTime;
              if (leftLimit <= callbackTime && callbackTime <= rightLimit) {
                cue.callback(val);
              }
            }
            this._prevUpdateTime = playbackTime;
          }          /**
   * Save a SoundFile as a .wav file. The browser will prompt the user
   * to download the file to their device. To upload a file to a server, see
   * <a href="/reference/#/SoundFile/getBlob">getBlob</a>
   *
   * @method save
   * @for SoundFile
   * @param  {String} [fileName]      name of the resulting .wav file.
   * @example
   *  <div><code>
   *  let mySound;
   *  function preload() {
   *    mySound = loadSound('assets/doorbell.mp3');
   *  }
   *  function setup() {
   *    let cnv = createCanvas(100, 100);
   *    cnv.mousePressed(canvasPressed);
   *    background(220);
   *    text('tap to download', 10, 20);
   *  }
   *
   *  function canvasPressed() {
   *    mySound.save('my cool filename');
   *  }
   * </code></div>
   */

          save(fileName) {
            p5.prototype.saveSound(this, fileName, 'wav');
          }          /**
   * This method is useful for sending a SoundFile to a server. It returns the
   * .wav-encoded audio data as a "<a target="_blank" title="Blob reference at
   * MDN" href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a>".
   * A Blob is a file-like data object that can be uploaded to a server
   * with an <a href="/reference/#/p5/httpDo">http</a> request. We'll
   * use the `httpDo` options object to send a POST request with some
   * specific options: we encode the request as `multipart/form-data`,
   * and attach the blob as one of the form values using `FormData`.
   *
   *
   * @method getBlob
   * @for SoundFile
   * @returns {Blob} A file-like data object
   * @example
   *  <div><code>
   *  function preload() {
   *    mySound = loadSound('assets/doorbell.mp3');
   *  }
   *
   *  function setup() {
   *    noCanvas();
   *    let soundBlob = mySound.getBlob();
   *
   *    // Now we can send the blob to a server...
   *    let serverUrl = 'https://jsonplaceholder.typicode.com/posts';
   *    let httpRequestOptions = {
   *      method: 'POST',
   *      body: new FormData().append('soundBlob', soundBlob),
   *      headers: new Headers({
   *        'Content-Type': 'multipart/form-data'
   *      })
   *    };
   *    httpDo(serverUrl, httpRequestOptions);
   *
   *    // We can also create an `ObjectURL` pointing to the Blob
   *    let blobUrl = URL.createObjectURL(soundBlob);
   *
   *    // The `<Audio>` Element accepts Object URL's
   *    createAudio(blobUrl).showControls();
   *
   *    createDiv();
   *
   *    // The ObjectURL exists as long as this tab is open
   *    let input = createInput(blobUrl);
   *    input.attribute('readonly', true);
   *    input.mouseClicked(function() { input.elt.select() });
   *  }
   *
   * </code></div>
   */

          getBlob() {
            const dataView = (0, _helpers.convertToWav) (this.buffer);
            return new Blob([dataView], {
              type: 'audio/wav'
            });
          }
        }        /**
 *  loadSound() returns a new SoundFile from a specified
 *  path. If called during preload(), the SoundFile will be ready
 *  to play in time for setup() and draw(). If called outside of
 *  preload, the SoundFile will not be ready immediately, so
 *  loadSound accepts a callback as the second parameter. Using a
 *  <a href="https://github.com/processing/p5.js/wiki/Local-server">
 *  local server</a> is recommended when loading external files.
 *
 *  @method loadSound
 *  @for p5sound
 *  @param  {String|Array}   path     Path to the sound file, or an array with
 *                                    paths to soundfiles in multiple formats
 *                                    i.e. ['sound.ogg', 'sound.mp3'].
 *                                    Alternately, accepts an object: either
 *                                    from the HTML5 File API, or a p5.File.
 *  @param {Function} [successCallback]   Name of a function to call once file loads
 *  @param {Function} [errorCallback]   Name of a function to call if there is
 *                                      an error loading the file.
 *  @param {Function} [whileLoading] Name of a function to call while file is loading.
 *                                 This function will receive the percentage loaded
 *                                 so far, from 0.0 to 1.0.
 *  @return {SoundFile}            Returns a SoundFile
 *  @example
 *  <div><code>
 *  let mySound;
 *  function preload() {
 *    soundFormats('mp3', 'ogg');
 *    mySound = loadSound('assets/doorbell');
 *  }
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(canvasPressed);
 *    background(220);
 *    text('tap here to play', 10, 20);
 *  }
 *
 *  function canvasPressed() {
 *    // playing a sound file on a user gesture
 *    // is equivalent to `userStartAudio()`
 *    mySound.play();
 *  }
 *  </code></div>
 */

        function loadSound(path, callback, onerror, whileLoading) {
          // if loading locally without a server
          if (window.location.origin.indexOf('file://') > - 1 && window.cordova === 'undefined') {
            window.alert('This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS');
          }
          let self = this;
          let s = new SoundFile(path, function () {
            if (typeof callback === 'function') {
              callback.apply(self, arguments);
            }
            if (typeof self._decrementPreload === 'function') {
              self._decrementPreload();
            }
          }, onerror, whileLoading);
          return s;
        }
        var _default = exports.default = SoundFile;
      },
      {
        './Panner': 12,
        './audioContext': 15,
        './audioWorklet/processorNames': 16,
        './errorHandler': 18,
        './helpers': 19,
        './main': 20
      }
    ],
    14: [
      function (_dereq_, module, exports) {
        'use strict';
        _dereq_('./constants');
        _dereq_('./shims');
        var _audioContext = _dereq_('./audioContext');
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _helpers = _dereq_('./helpers');
        var _Amplitude = _interopRequireDefault(_dereq_('./Amplitude'));
        var _AudioIn = _interopRequireDefault(_dereq_('./AudioIn'));
        var _AnalyzerFFT = _interopRequireDefault(_dereq_('./AnalyzerFFT'));
        var _BiquadFilter = _interopRequireWildcard(_dereq_('./BiquadFilter'));
        var _Delay = _interopRequireDefault(_dereq_('./Delay'));
        var _Effect = _interopRequireDefault(_dereq_('./Effect'));
        var _Envelope = _interopRequireDefault(_dereq_('./Envelope'));
        var _Gain = _interopRequireDefault(_dereq_('./Gain'));
        var _Noise = _interopRequireDefault(_dereq_('./Noise'));
        var _Oscillator = _interopRequireWildcard(_dereq_('./Oscillator'));
        var _Panner = _interopRequireDefault(_dereq_('./Panner'));
        var _SoundFile = _interopRequireWildcard(_dereq_('./SoundFile'));
        function _getRequireWildcardCache(e) {
          if ('function' != typeof WeakMap) return null;
          var r = new WeakMap(),
          t = new WeakMap();
          return (_getRequireWildcardCache = function (e) {
            return e ? t : r;
          }) (e);
        }
        function _interopRequireWildcard(e, r) {
          if (!r && e && e.__esModule) return e;
          if (null === e || 'object' != typeof e && 'function' != typeof e) return {
          default:
            e
          };
          var t = _getRequireWildcardCache(r);
          if (t && t.has(e)) return t.get(e);
          var n = {
            __proto__: null
          },
          a = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var u in e) if ('default' !== u && Object.prototype.hasOwnProperty.call(e, u)) {
            var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
            i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
          }
          return n.default = e,
          t && t.set(e, n),
          n;
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }
        p5.prototype.getAudioContext = _audioContext.getAudioContext;
        // helpers
        p5.prototype.sampleRate = _helpers.sampleRate;
        p5.prototype.freqToMidi = _helpers.freqToMidi;
        p5.prototype.midiToFreq = _helpers.midiToFreq;
        p5.prototype.noteToFreq = _helpers.noteToFreq;
        p5.prototype.soundFormats = _helpers.soundFormats;
        p5.prototype.disposeSound = _helpers.disposeSound;
        p5.prototype._checkFileFormats = _helpers._checkFileFormats;
        p5.prototype._mathChain = _helpers._mathChain;
        p5.prototype.convertToWav = _helpers.convertToWav;
        p5.prototype.interleave = _helpers.interleave;
        p5.prototype.writeUTFBytes = _helpers.writeUTFBytes;
        p5.prototype.safeBufferSize = _helpers.safeBufferSize;
        p5.prototype.saveSound = _helpers.saveSound;
        p5.prototype.Amplitude = _Amplitude.default;
        p5.prototype.AudioIn = _AudioIn.default;
        p5.prototype.AnalyzerFFT = _AnalyzerFFT.default;
        p5.prototype.BiquadFilter = _BiquadFilter.default;
        p5.prototype.LowPass = _BiquadFilter.LowPass;
        p5.prototype.HighPass = _BiquadFilter.HighPass;
        p5.prototype.BandPass = _BiquadFilter.BandPass;
        p5.prototype.Delay = _Delay.default;
        p5.prototype.Effect = _Effect.default;
        p5.prototype.Envelope = _Envelope.default;
        p5.prototype.Gain = _Gain.default;
        p5.prototype.Noise = _Noise.default;
        p5.prototype.Oscillator = _Oscillator.default;
        p5.prototype.SinOsc = _Oscillator.SinOsc;
        p5.prototype.TriOsc = _Oscillator.TriOsc;
        p5.prototype.SawOsc = _Oscillator.SawOsc;
        p5.prototype.SqrOsc = _Oscillator.SqrOsc;
        p5.prototype.Panner = _Panner.default;
        p5.prototype.SoundFile = _SoundFile.default;
        p5.prototype.loadSound = _SoundFile.loadSound;
        // register preload handling of loadSound
        p5.prototype.registerPreloadMethod('loadSound', p5.prototype);
        module.exports = _main.default;
      },
      {
        './Amplitude': 2,
        './AnalyzerFFT': 3,
        './AudioIn': 4,
        './BiquadFilter': 5,
        './Delay': 6,
        './Effect': 7,
        './Envelope': 8,
        './Gain': 9,
        './Noise': 10,
        './Oscillator': 11,
        './Panner': 12,
        './SoundFile': 13,
        './audioContext': 15,
        './constants': 17,
        './helpers': 19,
        './main': 20,
        './shims': 21
      }
    ],
    15: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        exports.getAudioContext = getAudioContext;
        var Tone = _interopRequireWildcard(_dereq_('tone'));
        function _getRequireWildcardCache(e) {
          if ('function' != typeof WeakMap) return null;
          var r = new WeakMap(),
          t = new WeakMap();
          return (_getRequireWildcardCache = function (e) {
            return e ? t : r;
          }) (e);
        }
        function _interopRequireWildcard(e, r) {
          if (!r && e && e.__esModule) return e;
          if (null === e || 'object' != typeof e && 'function' != typeof e) return {
          default:
            e
          };
          var t = _getRequireWildcardCache(r);
          if (t && t.has(e)) return t.get(e);
          var n = {
            __proto__: null
          },
          a = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var u in e) if ('default' !== u && Object.prototype.hasOwnProperty.call(e, u)) {
            var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
            i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
          }
          return n.default = e,
          t && t.set(e, n),
          n;
        }        // import Tone.js dependency
        // create a new AudioContext from Web Audio API

        const audioContext = new window.AudioContext();
        // set the context for Tone.js to be the same as p5.sound.js
        Tone.setContext(audioContext);
        /**
 * <p>Returns the Audio Context for this sketch. Useful for users
 * who would like to dig deeper into the <a target='_blank' href=
 * 'http://webaudio.github.io/web-audio-api/'>Web Audio API
 * </a>. and the reference for it at <a target='_blank' href=
 * 'https://developer.mozilla.org/en-US/docs/Web/API/AudioContext'>
 * MDN Web Docs</a></p>
 *
 * <p>Browsers require users to startAudioContext
 * with a user gesture, such as touchStarted in the example below.</p>
 *
 * @for p5sound
 * @method getAudioContext
 * @return {Object}    audioContext for this sketch
 * @example
 *  function draw() {
 *    background(255);
 *    textAlign(CENTER);
 *
 *    if (getAudioContext().state == 'running') {
 *      text('audioContext is running', width/2, height/2);
 *    } else if (getAudioContext().state == 'suspended') {
 *      text('audio is suspended', width/2, height/2);
 *    } else if (getAudioContext().state == 'closed') {
 *     text('audioContext is closed', width/2, height/2);
 *    }
 *
 *   text('tap or mouse press to change behavior', width/2, height/2 + 20);
 *
 *  function mousePressed() {
 *    if (getAudioContext().state == 'suspended') {
 *      getAudioContext().resume();
 *    } else if (getAudioContext().state == 'running') {
 *     getAudioContext().suspend();
 *  }
 *
 */
        function getAudioContext() {
          return audioContext;
        }
        var _default = exports.default = audioContext;
      },
      {
        'tone': 1
      }
    ],
    16: [
      function (_dereq_, module, exports) {
        'use strict';
        module.exports = {
          recorderProcessor: 'recorder-processor',
          soundFileProcessor: 'sound-file-processor',
          amplitudeProcessor: 'amplitude-processor'
        };
      },
      {
      }
    ],
    17: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.VERSION = void 0;
        /**
 * @module Constants
 * @submodule Constants
 * @for p5sound
 */
        /**
 * Version of this p5sound.js.
 * @property {String} VERSION
 * @final
 */
        const VERSION = exports.VERSION = '0.0.5-alpha';
      },
      {
      }
    ],
    18: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        /*
    Helper function to generate an error
    with a custom stack trace that points to the sketch
    and removes other parts of the stack trace.

    @private
    @class customError
    @constructor
    @param  {String} name         custom  error name
    @param  {String} errorTrace   custom error trace
    @param  {String} failedPath     path to the file that failed to load
    @property {String} name custom error name
    @property {String} message custom error message
    @property {String} stack trace the error back to a line in the user's sketch.
                             Note: this edits out stack trace within p5.js and p5.sound.
    @property {String} originalStack unedited, original stack trace
    @property {String} failedPath path to the file that failed to load
    @return {Error}     returns a custom Error object
   */
        let CustomError = function (name, errorTrace, failedPath) {
          let err = new Error();
          let tempStack,
          splitStack;
          err.name = name;
          err.originalStack = err.stack + errorTrace;
          tempStack = err.stack + errorTrace;
          err.failedPath = failedPath;
          // only print the part of the stack trace that refers to the user code:
          splitStack = tempStack.split('\n').filter(function (ln) {
            return !ln.match(/(p5.|native code|globalInit)/g);
          });
          err.stack = splitStack.join('\n');
          return err; // TODO: is this really a constructor?
        };
        var _default = exports.default = CustomError;
      },
      {
      }
    ],
    19: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports._checkFileFormats = _checkFileFormats;
        exports._mathChain = _mathChain;
        exports.convertToWav = convertToWav;
        exports.disposeSound = disposeSound;
        exports.freqToMidi = freqToMidi;
        exports.interleave = interleave;
        exports.midiToFreq = midiToFreq;
        exports.noteToFreq = noteToFreq;
        exports.safeBufferSize = safeBufferSize;
        exports.sampleRate = sampleRate;
        exports.saveSound = saveSound;
        exports.soundFormats = soundFormats;
        exports.writeUTFBytes = writeUTFBytes;
        var _main = _interopRequireDefault(_dereq_('./main'));
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        // import processorNames from './audioWorklet/processorNames';
        /**
 * @for p5sound
 */
        /**
 * Returns a number representing the sample rate, in samples per second,
 * of all sound objects in this audio context. It is determined by the
 * sampling rate of your operating system's sound card, and it is not
 * currently possile to change.
 * It is often 44100, or twice the range of human hearing.
 *
 * @method sampleRate
 * @return {Number} samplerate samples per second
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
 */

        function sampleRate() {
          return _audioContext.default.sampleRate;
        }        /**
 *  Returns the closest MIDI note value for
 *  a given frequency.
 *
 *  @method freqToMidi
 *  @param  {Number} frequency A freqeuncy, for example, the "A"
 *                             above Middle C is 440Hz
 *  @return {Number}   MIDI note value
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
 */

        function freqToMidi(f) {
          let mathlog2 = Math.log(f / 440) / Math.log(2);
          let m = Math.round(12 * mathlog2) + 69;
          return m;
        }        /**
 *  Returns the frequency value of a MIDI note value.
 *  General MIDI treats notes as integers where middle C
 *  is 60, C# is 61, D is 62 etc. Useful for generating
 *  musical frequencies with oscillators.
 *
 *  @method  midiToFreq
 *  @param  {Number} midiNote The number of a MIDI note
 *  @return {Number} Frequency value of the given MIDI note
 *  @example
 *  <div><code>
 *  let midiNotes = [60, 64, 67, 72];
 *  let noteIndex = 0;
 *  let midiVal, freq;
 *
 *  function setup() {
 *    let cnv = createCanvas(100, 100);
 *    cnv.mousePressed(startSound);
 *    osc = new p5.TriOsc();
 *    env = new p5.Envelope();
 *  }
 *
 *  function draw() {
 *    background(220);
 *    text('tap to play', 10, 20);
 *    if (midiVal) {
 *      text('MIDI: ' + midiVal, 10, 40);
 *      text('Freq: ' + freq, 10, 60);
 *    }
 *  }
 *
 *  function startSound() {
 *    // see also: userStartAudio();
 *    osc.start();
 *
 *    midiVal = midiNotes[noteIndex % midiNotes.length];
 *    freq = midiToFreq(midiVal);
 *    osc.freq(freq);
 *    env.ramp(osc, 0, 1.0, 0);
 *
 *    noteIndex++;
 *  }
 *  </code></div>
 */

        function midiToFreq(m) {
          return 440 * Math.pow(2, (m - 69) / 12);
        }        // This method converts ANSI notes specified as a string "C4", "Eb3" to a frequency
        /**
 *  Returns the frequency value of a note. This
 *  the method converts ANSI notes specified as a
 *  string "C4", "Eb3" etc to a frequency.
 *
 *  @method  noteToFreq
 *  @param  {String} ansiNote The string of a ANSI note
 *  @return {Number} Frequency value of the given ANSI note
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
 */

        function noteToFreq(note) {
          if (typeof note !== 'string') {
            return note;
          }
          let wholeNotes = {
            A: 33,
            B: 35,
            C: 24,
            D: 26,
            E: 28,
            F: 29,
            G: 31
          };
          let value = wholeNotes[note[0].toUpperCase()];
          let octave = ~~note.slice( - 1);
          value += 12 * (octave - 1);
          switch (note[1]) {
            case '#':
              value += 1;
              break;
            case 'b':
              value -= 1;
              break;
            default:
              break;
          }
          return midiToFreq(value);
        }        /**
 *  List the SoundFile formats that you will include. LoadSound
 *  will search your directory for these extensions, and will pick
 *  a format that is compatable with the client's web browser.
 *  <a href="http://media.io/">Here</a> is a free online file
 *  converter.
 *
 *  @method soundFormats
 *  @param {String} [...formats] i.e. 'mp3', 'wav', 'ogg'
 *  @example
 *  <div><code>
 *  function preload() {
 *    // set the global sound formats
 *    soundFormats('mp3', 'ogg');
 *
 *    // load either beatbox.mp3, or .ogg, depending on browser
 *    mySound = loadSound('assets/beatbox.mp3');
 *  }
 *
 *  function setup() {
 *       let cnv = createCanvas(100, 100);
 *       background(220);
 *       text('sound loaded! tap to play', 10, 20, width - 20);
 *       cnv.mousePressed(function() {
 *         mySound.play();
 *       });
 *     }
 *  </code></div>
 */

        function soundFormats() {
          // reset extensions array
          _main.default.extensions = [
          ];
          // add extensions
          for (let i = 0; i < arguments.length; i++) {
            arguments[i] = arguments[i].toLowerCase();
            if (['mp3',
            'wav',
            'ogg',
            'm4a',
            'aac'].indexOf(arguments[i]) > - 1) {
              _main.default.extensions.push(arguments[i]);
            } else {
              throw arguments[i] + ' is not a valid sound format!';
            }
          }
        }
        function disposeSound() {
          //looping backwards as looping forward may cause the
          //index of an element to change while the loop runs
          for (let i = _main.default.soundArray.length - 1; i >= 0; i--) {
            _main.default.soundArray[i].dispose();
          }
        }
        function _checkFileFormats(paths) {
          let path;
          // if path is a single string, check to see if extension is provided
          if (typeof paths === 'string') {
            path = paths;
            // check if extension is provided
            let extTest = path.split('.').pop();
            // if an extension is provided
            if (['mp3',
            'wav',
            'ogg',
            'm4a',
            'aac'].indexOf(extTest) > - 1) {
              if (!p5.prototype.isFileSupported(extTest)) {
                let pathSplit = path.split('.');
                let pathCore = pathSplit[pathSplit.length - 1];
                for (let i = 0; i < _main.default.extensions.length; i++) {
                  const extension = _main.default.extensions[i];
                  const supported = p5.prototype.isFileSupported(extension);
                  if (supported) {
                    pathCore = '';
                    if (pathSplit.length === 2) {
                      pathCore += pathSplit[0];
                    }
                    for (let i = 1; i <= pathSplit.length - 2; i++) {
                      let p = pathSplit[i];
                      pathCore += '.' + p;
                    }
                    path = pathCore += '.';
                    path = path += extension;
                    break;
                  }
                }
              }
            }            // if no extension is provided
             else {
              for (let i = 0; i < _main.default.extensions.length; i++) {
                const extension = _main.default.extensions[i];
                const supported = p5.prototype.isFileSupported(extension);
                if (supported) {
                  path = path + '.' + extension;
                  break;
                }
              }
            }
          } // end 'if string'
          // path can either be a single string, or an array
           else if (typeof paths === 'object') {
            for (let i = 0; i < paths.length; i++) {
              let extension = paths[i].split('.').pop();
              let supported = p5.prototype.isFileSupported(extension);
              if (supported) {
                // console.log('.'+extension + ' is ' + supported +
                //  ' supported by your browser.');
                path = paths[i];
                break;
              }
            }
          }
          return path;
        }        /**
 *  Used by Osc and Envelope to chain signal math
 */

        function _mathChain(o, math, thisChain, nextChain, type) {
          // if this type of math already exists in the chain, replace it
          for (let i in o.mathOps) {
            if (o.mathOps[i] instanceof type) {
              o.mathOps[i].dispose();
              thisChain = i;
              if (thisChain < o.mathOps.length - 1) {
                nextChain = o.mathOps[i + 1];
              }
            }
          }
          o.mathOps[thisChain - 1].disconnect();
          o.mathOps[thisChain - 1].connect(math);
          math.connect(nextChain);
          o.mathOps[thisChain] = math;
          return o;
        }        // helper methods to convert audio file as .wav format,
        // will use as saving .wav file and saving blob object
        // Thank you to Matt Diamond's RecorderJS (MIT License)
        // https://github.com/mattdiamond/Recorderjs

        function convertToWav(audioBuffer) {
          let leftChannel,
          rightChannel;
          leftChannel = audioBuffer.getChannelData(0);
          // handle mono files
          if (audioBuffer.numberOfChannels > 1) {
            rightChannel = audioBuffer.getChannelData(1);
          } else {
            rightChannel = leftChannel;
          }
          let interleaved = interleave(leftChannel, rightChannel);
          // create the buffer and view to create the .WAV file
          let buffer = new window.ArrayBuffer(44 + interleaved.length * 2);
          let view = new window.DataView(buffer);
          // write the WAV container,
          // check spec at: https://web.archive.org/web/20171215131933/http://tiny.systems/software/soundProgrammer/WavFormatDocs.pdf
          // RIFF chunk descriptor
          writeUTFBytes(view, 0, 'RIFF');
          view.setUint32(4, 36 + interleaved.length * 2, true);
          writeUTFBytes(view, 8, 'WAVE');
          // FMT sub-chunk
          writeUTFBytes(view, 12, 'fmt ');
          view.setUint32(16, 16, true);
          view.setUint16(20, 1, true);
          // stereo (2 channels)
          view.setUint16(22, 2, true);
          view.setUint32(24, _audioContext.default.sampleRate, true);
          view.setUint32(28, _audioContext.default.sampleRate * 4, true);
          view.setUint16(32, 4, true);
          view.setUint16(34, 16, true);
          // data sub-chunk
          writeUTFBytes(view, 36, 'data');
          view.setUint32(40, interleaved.length * 2, true);
          // write the PCM samples
          let lng = interleaved.length;
          let index = 44;
          let volume = 1;
          for (let i = 0; i < lng; i++) {
            view.setInt16(index, interleaved[i] * (32767 * volume), true);
            index += 2;
          }
          return view;
        }        // helper methods to save waves

        function interleave(leftChannel, rightChannel) {
          let length = leftChannel.length + rightChannel.length;
          let result = new Float32Array(length);
          let inputIndex = 0;
          for (let index = 0; index < length; ) {
            result[index++] = leftChannel[inputIndex];
            result[index++] = rightChannel[inputIndex];
            inputIndex++;
          }
          return result;
        }
        function writeUTFBytes(view, offset, string) {
          let lng = string.length;
          for (let i = 0; i < lng; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
          }
        }
        function safeBufferSize(idealBufferSize) {
          let bufferSize = idealBufferSize;
          // if the AudioWorkletNode is actually a ScriptProcessorNode created via polyfill,
          // make sure that our chosen buffer size isn't smaller than the buffer size automatically
          // selected by the polyfill
          // reference: https://github.com/GoogleChromeLabs/audioworklet-polyfill/issues/13#issuecomment-425014930
          // let tempAudioWorkletNode = new AudioWorkletNode(
          //   audioContext,
          //   processorNames.soundFileProcessor
          // );
          // if (tempAudioWorkletNode instanceof ScriptProcessorNode) {
          //   bufferSize = tempAudioWorkletNode.bufferSize;
          // }
          // tempAudioWorkletNode.disconnect();
          // tempAudioWorkletNode = null;
          return bufferSize;
        }        /**
 * Save a SoundFile as a .wav file. The browser will prompt the user
 * to download the file to their device.
 * For uploading audio to a server, use
 * <a href="/docs/reference/#/p5.SoundFile/saveBlob">`p5.SoundFile.saveBlob`</a>.
 *
 *  @for p5sound
 *  @method saveSound
 *  @param  {SoundFile} soundFile SoundFile that you wish to save
 *  @param  {String} fileName      name of the resulting .wav file.
 * @example
 * <div><code>
 * function setup() {
 * console.log('TODO EXAMPLE');
 * }
 *
 * function draw() {
 * }
 * </code></div>
 */
        // add to p5.prototype as this is used by the p5 `save()` method.

        function saveSound(soundFile, fileName) {
          const dataView = convertToWav(soundFile.buffer);
          p5.prototype.writeFile([dataView], fileName, 'wav');
        }
      },
      {
        './audioContext': 15,
        './main': 20
      }
    ],
    20: [
      function (_dereq_, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = void 0;
        var _audioContext = _interopRequireDefault(_dereq_('./audioContext.js'));
        var _constants = _dereq_('./constants.js');
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
          default:
            obj
          };
        }        // p5sound contains the final sound output bus.

        class Main {
          constructor() {
            this.input = _audioContext.default.createGain();
            this.output = _audioContext.default.createGain();
            // //put a hard limiter on the output
            this.limiter = _audioContext.default.createDynamicsCompressor();
            this.limiter.threshold.value = - 3;
            this.limiter.ratio.value = 20;
            this.limiter.knee.value = 1;
            this.audioContext = _audioContext.default;
            this.output.disconnect();
            // connect input to limiter
            this.input.connect(this.limiter);
            // connect limiter to output
            this.limiter.connect(this.output);
            // meter is just for global Amplitude / FFT analysis
            this.meter = _audioContext.default.createGain();
            this.fftMeter = _audioContext.default.createGain();
            this.output.connect(this.meter);
            this.output.connect(this.fftMeter);
            // connect output to destination
            this.output.connect(this.audioContext.destination);
            // an array of all sounds in the sketch
            this.soundArray = [
            ];
            // file extensions to search for
            this.extensions = [
            ];
            this.VERSION = _constants.VERSION;
          }
        }        // create a single instance of the p5Sound main output for use within this sketch

        const p5sound = new Main();
        /**
 * Returns a number representing the output volume for sound
 * in this sketch.
 *
 * @method getOutputVolume
 * @return {Number} Output volume for sound in this sketch.
 *                  Should be between 0.0 (silence) and 1.0.
 */
        p5.prototype.getOutputVolume = function () {
          return p5sound.output.gain.value;
        };
        /**
 *  <p>Scale the output of all sound in this sketch</p>
 *  Scaled between 0.0 (silence) and 1.0 (full volume).
 *  1.0 is the maximum amplitude of a digital sound, so multiplying
 *  by greater than 1.0 may cause digital distortion. To
 *  fade, provide a <code>rampTime</code> parameter. For more
 *  complex fades, see the Envelope class.
 *
 *  Alternately, you can pass in a signal source such as an
 *  oscillator to modulate the amplitude with an audio signal.
 *
 *  <p><b>How This Works</b>: When you load the p5.sound module, it
 *  creates a single instance of p5sound. All sound objects in this
 *  module output to p5sound before reaching your computer's output.
 *  So if you change the amplitude of p5sound, it impacts all of the
 *  sound in this module.</p>
 *
 *  <p>If no value is provided, returns a Web Audio API Gain Node</p>
 *
 *  @method outputVolume
 *  @param {Number|Object} volume  Volume (amplitude) between 0.0
 *                                     and 1.0 or modulating signal/oscillator
 *  @param {Number} [rampTime]  Fade for t seconds
 *  @param {Number} [timeFromNow]  Schedule this event to happen at
 *                                 t seconds in the future
 */
        // p5sound.prototype.outputVolume = function (vol, rampTime = 0, tFromNow = 0) {
        //   if (typeof vol === 'number') {
        //     let now = p5sound.audioContext.currentTime;
        //     let currentVol = p5sound.output.gain.value;
        //     p5sound.output.gain.cancelScheduledValues(now + tFromNow);
        //     if (rampTime !== 0)
        //       p5sound.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
        //     p5sound.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
        //   } else if (vol) {
        //     vol.connect(p5sound.output.gain);
        //   } else {
        //     // return the Gain Node
        //     return p5sound.output.gain;
        //   }
        // };
        /**
 *  `p5sound.soundOut` is the p5sound.sound final output bus. It sends output to
 *  the destination of this window's web audio context. It contains
 *  Web Audio API nodes including a dyanmicsCompressor (<code>.limiter</code>),
 *  and Gain Nodes for <code>.input</code> and <code>.output</code>.
 *
 *  @property {Object} soundOut
 */
        p5.prototype.soundOut = p5.soundOut = p5sound;
        // // a silent connection to the DesinationNode
        // // which will ensure that anything connected to it
        // // will not be garbage collected
        p5.soundOut._silentNode = _audioContext.default.createGain();
        p5.soundOut._silentNode.gain.value = 0;
        p5.soundOut._silentNode.connect(_audioContext.default.destination);
        var _default = exports.default = p5sound;
      },
      {
        './audioContext.js': 15,
        './constants.js': 17
      }
    ],
    21: [
      function (_dereq_, module, exports) {
        'use strict';
        /**
 * This module has shims
 */
        /* AudioContext Monkeypatch
     Copyright 2013 Chris Wilson
     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at
         http://www.apache.org/licenses/LICENSE-2.0
     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
  */
        /**
 * Determine which filetypes are supported (inspired by buzz.js)
 * The audio element (el) will only be used to test browser support for various audio formats
 */
        let el = document.createElement('audio');
        p5.prototype.isSupported = function () {
          return !!el.canPlayType;
        };
        let isOGGSupported = function () {
          return !!el.canPlayType && el.canPlayType('audio/ogg; codecs="vorbis"');
        };
        let isMP3Supported = function () {
          return !!el.canPlayType && el.canPlayType('audio/mpeg;');
        };
        let isWAVSupported = function () {
          return !!el.canPlayType && el.canPlayType('audio/wav; codecs="1"');
        };
        let isAACSupported = function () {
          return !!el.canPlayType && (el.canPlayType('audio/x-m4a;') || el.canPlayType('audio/aac;'));
        };
        let isAIFSupported = function () {
          return !!el.canPlayType && el.canPlayType('audio/x-aiff;');
        };
        p5.prototype.isFileSupported = function (extension) {
          switch (extension.toLowerCase()) {
            case 'mp3':
              return isMP3Supported();
            case 'wav':
              return isWAVSupported();
            case 'ogg':
              return isOGGSupported();
            case 'aac':
            case 'm4a':
            case 'mp4':
              return isAACSupported();
            case 'aif':
            case 'aiff':
              return isAIFSupported();
            default:
              return false;
          }
        };
      },
      {
      }
    ]
  }, {
  }, [
    14
  ]) (14)
});
