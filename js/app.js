(() => {
    var __webpack_modules__ = {
        211: function(__unused_webpack_module, exports) {
            (function(global, factory) {
                true ? factory(exports) : 0;
            })(0, (function(exports) {
                "use strict";
                exports.PipsMode = void 0;
                (function(PipsMode) {
                    PipsMode["Range"] = "range";
                    PipsMode["Steps"] = "steps";
                    PipsMode["Positions"] = "positions";
                    PipsMode["Count"] = "count";
                    PipsMode["Values"] = "values";
                })(exports.PipsMode || (exports.PipsMode = {}));
                exports.PipsType = void 0;
                (function(PipsType) {
                    PipsType[PipsType["None"] = -1] = "None";
                    PipsType[PipsType["NoValue"] = 0] = "NoValue";
                    PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
                    PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
                })(exports.PipsType || (exports.PipsType = {}));
                function isValidFormatter(entry) {
                    return isValidPartialFormatter(entry) && "function" === typeof entry.from;
                }
                function isValidPartialFormatter(entry) {
                    return "object" === typeof entry && "function" === typeof entry.to;
                }
                function removeElement(el) {
                    el.parentElement.removeChild(el);
                }
                function isSet(value) {
                    return null !== value && void 0 !== value;
                }
                function preventDefault(e) {
                    e.preventDefault();
                }
                function unique(array) {
                    return array.filter((function(a) {
                        return !this[a] ? this[a] = true : false;
                    }), {});
                }
                function closest(value, to) {
                    return Math.round(value / to) * to;
                }
                function offset(elem, orientation) {
                    var rect = elem.getBoundingClientRect();
                    var doc = elem.ownerDocument;
                    var docElem = doc.documentElement;
                    var pageOffset = getPageOffset(doc);
                    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) pageOffset.x = 0;
                    return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
                }
                function isNumeric(a) {
                    return "number" === typeof a && !isNaN(a) && isFinite(a);
                }
                function addClassFor(element, className, duration) {
                    if (duration > 0) {
                        addClass(element, className);
                        setTimeout((function() {
                            removeClass(element, className);
                        }), duration);
                    }
                }
                function limit(a) {
                    return Math.max(Math.min(a, 100), 0);
                }
                function asArray(a) {
                    return Array.isArray(a) ? a : [ a ];
                }
                function countDecimals(numStr) {
                    numStr = String(numStr);
                    var pieces = numStr.split(".");
                    return pieces.length > 1 ? pieces[1].length : 0;
                }
                function addClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.add(className); else el.className += " " + className;
                }
                function removeClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.remove(className); else el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
                }
                function hasClass(el, className) {
                    return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
                }
                function getPageOffset(doc) {
                    var supportPageOffset = void 0 !== window.pageXOffset;
                    var isCSS1Compat = "CSS1Compat" === (doc.compatMode || "");
                    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
                    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
                    return {
                        x,
                        y
                    };
                }
                function getActions() {
                    return window.navigator.pointerEnabled ? {
                        start: "pointerdown",
                        move: "pointermove",
                        end: "pointerup"
                    } : window.navigator.msPointerEnabled ? {
                        start: "MSPointerDown",
                        move: "MSPointerMove",
                        end: "MSPointerUp"
                    } : {
                        start: "mousedown touchstart",
                        move: "mousemove touchmove",
                        end: "mouseup touchend"
                    };
                }
                function getSupportsPassive() {
                    var supportsPassive = false;
                    try {
                        var opts = Object.defineProperty({}, "passive", {
                            get: function() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("test", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }
                function getSupportsTouchActionNone() {
                    return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
                }
                function subRangeRatio(pa, pb) {
                    return 100 / (pb - pa);
                }
                function fromPercentage(range, value, startRange) {
                    return 100 * value / (range[startRange + 1] - range[startRange]);
                }
                function toPercentage(range, value) {
                    return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
                }
                function isPercentage(range, value) {
                    return value * (range[1] - range[0]) / 100 + range[0];
                }
                function getJ(value, arr) {
                    var j = 1;
                    while (value >= arr[j]) j += 1;
                    return j;
                }
                function toStepping(xVal, xPct, value) {
                    if (value >= xVal.slice(-1)[0]) return 100;
                    var j = getJ(value, xVal);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
                }
                function fromStepping(xVal, xPct, value) {
                    if (value >= 100) return xVal.slice(-1)[0];
                    var j = getJ(value, xPct);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
                }
                function getStep(xPct, xSteps, snap, value) {
                    if (100 === value) return value;
                    var j = getJ(value, xPct);
                    var a = xPct[j - 1];
                    var b = xPct[j];
                    if (snap) {
                        if (value - a > (b - a) / 2) return b;
                        return a;
                    }
                    if (!xSteps[j - 1]) return value;
                    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
                }
                var Spectrum = function() {
                    function Spectrum(entry, snap, singleStep) {
                        this.xPct = [];
                        this.xVal = [];
                        this.xSteps = [];
                        this.xNumSteps = [];
                        this.xHighestCompleteStep = [];
                        this.xSteps = [ singleStep || false ];
                        this.xNumSteps = [ false ];
                        this.snap = snap;
                        var index;
                        var ordered = [];
                        Object.keys(entry).forEach((function(index) {
                            ordered.push([ asArray(entry[index]), index ]);
                        }));
                        ordered.sort((function(a, b) {
                            return a[0][0] - b[0][0];
                        }));
                        for (index = 0; index < ordered.length; index++) this.handleEntryPoint(ordered[index][1], ordered[index][0]);
                        this.xNumSteps = this.xSteps.slice(0);
                        for (index = 0; index < this.xNumSteps.length; index++) this.handleStepPoint(index, this.xNumSteps[index]);
                    }
                    Spectrum.prototype.getDistance = function(value) {
                        var distances = [];
                        for (var index = 0; index < this.xNumSteps.length - 1; index++) distances[index] = fromPercentage(this.xVal, value, index);
                        return distances;
                    };
                    Spectrum.prototype.getAbsoluteDistance = function(value, distances, direction) {
                        var xPct_index = 0;
                        if (value < this.xPct[this.xPct.length - 1]) while (value > this.xPct[xPct_index + 1]) xPct_index++; else if (value === this.xPct[this.xPct.length - 1]) xPct_index = this.xPct.length - 2;
                        if (!direction && value === this.xPct[xPct_index + 1]) xPct_index++;
                        if (null === distances) distances = [];
                        var start_factor;
                        var rest_factor = 1;
                        var rest_rel_distance = distances[xPct_index];
                        var range_pct = 0;
                        var rel_range_distance = 0;
                        var abs_distance_counter = 0;
                        var range_counter = 0;
                        if (direction) start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]); else start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
                        while (rest_rel_distance > 0) {
                            range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                            if (distances[xPct_index + range_counter] * rest_factor + 100 - 100 * start_factor > 100) {
                                rel_range_distance = range_pct * start_factor;
                                rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                                start_factor = 1;
                            } else {
                                rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                                rest_factor = 0;
                            }
                            if (direction) {
                                abs_distance_counter -= rel_range_distance;
                                if (this.xPct.length + range_counter >= 1) range_counter--;
                            } else {
                                abs_distance_counter += rel_range_distance;
                                if (this.xPct.length - range_counter >= 1) range_counter++;
                            }
                            rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
                        }
                        return value + abs_distance_counter;
                    };
                    Spectrum.prototype.toStepping = function(value) {
                        value = toStepping(this.xVal, this.xPct, value);
                        return value;
                    };
                    Spectrum.prototype.fromStepping = function(value) {
                        return fromStepping(this.xVal, this.xPct, value);
                    };
                    Spectrum.prototype.getStep = function(value) {
                        value = getStep(this.xPct, this.xSteps, this.snap, value);
                        return value;
                    };
                    Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
                        var j = getJ(value, this.xPct);
                        if (100 === value || isDown && value === this.xPct[j - 1]) j = Math.max(j - 1, 1);
                        return (this.xVal[j] - this.xVal[j - 1]) / size;
                    };
                    Spectrum.prototype.getNearbySteps = function(value) {
                        var j = getJ(value, this.xPct);
                        return {
                            stepBefore: {
                                startValue: this.xVal[j - 2],
                                step: this.xNumSteps[j - 2],
                                highestStep: this.xHighestCompleteStep[j - 2]
                            },
                            thisStep: {
                                startValue: this.xVal[j - 1],
                                step: this.xNumSteps[j - 1],
                                highestStep: this.xHighestCompleteStep[j - 1]
                            },
                            stepAfter: {
                                startValue: this.xVal[j],
                                step: this.xNumSteps[j],
                                highestStep: this.xHighestCompleteStep[j]
                            }
                        };
                    };
                    Spectrum.prototype.countStepDecimals = function() {
                        var stepDecimals = this.xNumSteps.map(countDecimals);
                        return Math.max.apply(null, stepDecimals);
                    };
                    Spectrum.prototype.hasNoSize = function() {
                        return this.xVal[0] === this.xVal[this.xVal.length - 1];
                    };
                    Spectrum.prototype.convert = function(value) {
                        return this.getStep(this.toStepping(value));
                    };
                    Spectrum.prototype.handleEntryPoint = function(index, value) {
                        var percentage;
                        if ("min" === index) percentage = 0; else if ("max" === index) percentage = 100; else percentage = parseFloat(index);
                        if (!isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
                        this.xPct.push(percentage);
                        this.xVal.push(value[0]);
                        var value1 = Number(value[1]);
                        if (!percentage) {
                            if (!isNaN(value1)) this.xSteps[0] = value1;
                        } else this.xSteps.push(isNaN(value1) ? false : value1);
                        this.xHighestCompleteStep.push(0);
                    };
                    Spectrum.prototype.handleStepPoint = function(i, n) {
                        if (!n) return;
                        if (this.xVal[i] === this.xVal[i + 1]) {
                            this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                            return;
                        }
                        this.xSteps[i] = fromPercentage([ this.xVal[i], this.xVal[i + 1] ], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
                        var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
                        var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
                        var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
                        this.xHighestCompleteStep[i] = step;
                    };
                    return Spectrum;
                }();
                var defaultFormatter = {
                    to: function(value) {
                        return void 0 === value ? "" : value.toFixed(2);
                    },
                    from: Number
                };
                var cssClasses = {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    touchArea: "touch-area",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    connects: "connects",
                    ltr: "ltr",
                    rtl: "rtl",
                    textDirectionLtr: "txt-dir-ltr",
                    textDirectionRtl: "txt-dir-rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                };
                var INTERNAL_EVENT_NS = {
                    tooltips: ".__tooltips",
                    aria: ".__aria"
                };
                function testStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
                    parsed.singleStep = entry;
                }
                function testKeyboardPageMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
                    parsed.keyboardPageMultiplier = entry;
                }
                function testKeyboardMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
                    parsed.keyboardMultiplier = entry;
                }
                function testKeyboardDefaultStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
                    parsed.keyboardDefaultStep = entry;
                }
                function testRange(parsed, entry) {
                    if ("object" !== typeof entry || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
                    if (void 0 === entry.min || void 0 === entry.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
                    parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
                }
                function testStart(parsed, entry) {
                    entry = asArray(entry);
                    if (!Array.isArray(entry) || !entry.length) throw new Error("noUiSlider: 'start' option is incorrect.");
                    parsed.handles = entry.length;
                    parsed.start = entry;
                }
                function testSnap(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'snap' option must be a boolean.");
                    parsed.snap = entry;
                }
                function testAnimate(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'animate' option must be a boolean.");
                    parsed.animate = entry;
                }
                function testAnimationDuration(parsed, entry) {
                    if ("number" !== typeof entry) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
                    parsed.animationDuration = entry;
                }
                function testConnect(parsed, entry) {
                    var connect = [ false ];
                    var i;
                    if ("lower" === entry) entry = [ true, false ]; else if ("upper" === entry) entry = [ false, true ];
                    if (true === entry || false === entry) {
                        for (i = 1; i < parsed.handles; i++) connect.push(entry);
                        connect.push(false);
                    } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); else connect = entry;
                    parsed.connect = connect;
                }
                function testOrientation(parsed, entry) {
                    switch (entry) {
                      case "horizontal":
                        parsed.ort = 0;
                        break;

                      case "vertical":
                        parsed.ort = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'orientation' option is invalid.");
                    }
                }
                function testMargin(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
                    if (0 === entry) return;
                    parsed.margin = parsed.spectrum.getDistance(entry);
                }
                function testLimit(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
                    parsed.limit = parsed.spectrum.getDistance(entry);
                    if (!parsed.limit || parsed.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
                }
                function testPadding(parsed, entry) {
                    var index;
                    if (!isNumeric(entry) && !Array.isArray(entry)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (Array.isArray(entry) && !(2 === entry.length || isNumeric(entry[0]) || isNumeric(entry[1]))) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (0 === entry) return;
                    if (!Array.isArray(entry)) entry = [ entry, entry ];
                    parsed.padding = [ parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1]) ];
                    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                    var totalPadding = entry[0] + entry[1];
                    var firstValue = parsed.spectrum.xVal[0];
                    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
                    if (totalPadding / (lastValue - firstValue) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
                }
                function testDirection(parsed, entry) {
                    switch (entry) {
                      case "ltr":
                        parsed.dir = 0;
                        break;

                      case "rtl":
                        parsed.dir = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'direction' option was not recognized.");
                    }
                }
                function testBehaviour(parsed, entry) {
                    if ("string" !== typeof entry) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
                    var tap = entry.indexOf("tap") >= 0;
                    var drag = entry.indexOf("drag") >= 0;
                    var fixed = entry.indexOf("fixed") >= 0;
                    var snap = entry.indexOf("snap") >= 0;
                    var hover = entry.indexOf("hover") >= 0;
                    var unconstrained = entry.indexOf("unconstrained") >= 0;
                    var dragAll = entry.indexOf("drag-all") >= 0;
                    if (fixed) {
                        if (2 !== parsed.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                        testMargin(parsed, parsed.start[1] - parsed.start[0]);
                    }
                    if (unconstrained && (parsed.margin || parsed.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
                    parsed.events = {
                        tap: tap || snap,
                        drag,
                        dragAll,
                        fixed,
                        snap,
                        hover,
                        unconstrained
                    };
                }
                function testTooltips(parsed, entry) {
                    if (false === entry) return;
                    if (true === entry || isValidPartialFormatter(entry)) {
                        parsed.tooltips = [];
                        for (var i = 0; i < parsed.handles; i++) parsed.tooltips.push(entry);
                    } else {
                        entry = asArray(entry);
                        if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                        entry.forEach((function(formatter) {
                            if ("boolean" !== typeof formatter && !isValidPartialFormatter(formatter)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                        }));
                        parsed.tooltips = entry;
                    }
                }
                function testHandleAttributes(parsed, entry) {
                    if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
                    parsed.handleAttributes = entry;
                }
                function testAriaFormat(parsed, entry) {
                    if (!isValidPartialFormatter(entry)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
                    parsed.ariaFormat = entry;
                }
                function testFormat(parsed, entry) {
                    if (!isValidFormatter(entry)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
                    parsed.format = entry;
                }
                function testKeyboardSupport(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
                    parsed.keyboardSupport = entry;
                }
                function testDocumentElement(parsed, entry) {
                    parsed.documentElement = entry;
                }
                function testCssPrefix(parsed, entry) {
                    if ("string" !== typeof entry && false !== entry) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
                    parsed.cssPrefix = entry;
                }
                function testCssClasses(parsed, entry) {
                    if ("object" !== typeof entry) throw new Error("noUiSlider: 'cssClasses' must be an object.");
                    if ("string" === typeof parsed.cssPrefix) {
                        parsed.cssClasses = {};
                        Object.keys(entry).forEach((function(key) {
                            parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
                        }));
                    } else parsed.cssClasses = entry;
                }
                function testOptions(options) {
                    var parsed = {
                        margin: null,
                        limit: null,
                        padding: null,
                        animate: true,
                        animationDuration: 300,
                        ariaFormat: defaultFormatter,
                        format: defaultFormatter
                    };
                    var tests = {
                        step: {
                            r: false,
                            t: testStep
                        },
                        keyboardPageMultiplier: {
                            r: false,
                            t: testKeyboardPageMultiplier
                        },
                        keyboardMultiplier: {
                            r: false,
                            t: testKeyboardMultiplier
                        },
                        keyboardDefaultStep: {
                            r: false,
                            t: testKeyboardDefaultStep
                        },
                        start: {
                            r: true,
                            t: testStart
                        },
                        connect: {
                            r: true,
                            t: testConnect
                        },
                        direction: {
                            r: true,
                            t: testDirection
                        },
                        snap: {
                            r: false,
                            t: testSnap
                        },
                        animate: {
                            r: false,
                            t: testAnimate
                        },
                        animationDuration: {
                            r: false,
                            t: testAnimationDuration
                        },
                        range: {
                            r: true,
                            t: testRange
                        },
                        orientation: {
                            r: false,
                            t: testOrientation
                        },
                        margin: {
                            r: false,
                            t: testMargin
                        },
                        limit: {
                            r: false,
                            t: testLimit
                        },
                        padding: {
                            r: false,
                            t: testPadding
                        },
                        behaviour: {
                            r: true,
                            t: testBehaviour
                        },
                        ariaFormat: {
                            r: false,
                            t: testAriaFormat
                        },
                        format: {
                            r: false,
                            t: testFormat
                        },
                        tooltips: {
                            r: false,
                            t: testTooltips
                        },
                        keyboardSupport: {
                            r: true,
                            t: testKeyboardSupport
                        },
                        documentElement: {
                            r: false,
                            t: testDocumentElement
                        },
                        cssPrefix: {
                            r: true,
                            t: testCssPrefix
                        },
                        cssClasses: {
                            r: true,
                            t: testCssClasses
                        },
                        handleAttributes: {
                            r: false,
                            t: testHandleAttributes
                        }
                    };
                    var defaults = {
                        connect: false,
                        direction: "ltr",
                        behaviour: "tap",
                        orientation: "horizontal",
                        keyboardSupport: true,
                        cssPrefix: "noUi-",
                        cssClasses,
                        keyboardPageMultiplier: 5,
                        keyboardMultiplier: 1,
                        keyboardDefaultStep: 10
                    };
                    if (options.format && !options.ariaFormat) options.ariaFormat = options.format;
                    Object.keys(tests).forEach((function(name) {
                        if (!isSet(options[name]) && void 0 === defaults[name]) {
                            if (tests[name].r) throw new Error("noUiSlider: '" + name + "' is required.");
                            return;
                        }
                        tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
                    }));
                    parsed.pips = options.pips;
                    var d = document.createElement("div");
                    var msPrefix = void 0 !== d.style.msTransform;
                    var noPrefix = void 0 !== d.style.transform;
                    parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
                    var styles = [ [ "left", "top" ], [ "right", "bottom" ] ];
                    parsed.style = styles[parsed.dir][parsed.ort];
                    return parsed;
                }
                function scope(target, options, originalOptions) {
                    var actions = getActions();
                    var supportsTouchActionNone = getSupportsTouchActionNone();
                    var supportsPassive = supportsTouchActionNone && getSupportsPassive();
                    var scope_Target = target;
                    var scope_Base;
                    var scope_Handles;
                    var scope_Connects;
                    var scope_Pips;
                    var scope_Tooltips;
                    var scope_Spectrum = options.spectrum;
                    var scope_Values = [];
                    var scope_Locations = [];
                    var scope_HandleNumbers = [];
                    var scope_ActiveHandlesCount = 0;
                    var scope_Events = {};
                    var scope_Document = target.ownerDocument;
                    var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
                    var scope_Body = scope_Document.body;
                    var scope_DirOffset = "rtl" === scope_Document.dir || 1 === options.ort ? 0 : 100;
                    function addNodeTo(addTarget, className) {
                        var div = scope_Document.createElement("div");
                        if (className) addClass(div, className);
                        addTarget.appendChild(div);
                        return div;
                    }
                    function addOrigin(base, handleNumber) {
                        var origin = addNodeTo(base, options.cssClasses.origin);
                        var handle = addNodeTo(origin, options.cssClasses.handle);
                        addNodeTo(handle, options.cssClasses.touchArea);
                        handle.setAttribute("data-handle", String(handleNumber));
                        if (options.keyboardSupport) {
                            handle.setAttribute("tabindex", "0");
                            handle.addEventListener("keydown", (function(event) {
                                return eventKeydown(event, handleNumber);
                            }));
                        }
                        if (void 0 !== options.handleAttributes) {
                            var attributes_1 = options.handleAttributes[handleNumber];
                            Object.keys(attributes_1).forEach((function(attribute) {
                                handle.setAttribute(attribute, attributes_1[attribute]);
                            }));
                        }
                        handle.setAttribute("role", "slider");
                        handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
                        if (0 === handleNumber) addClass(handle, options.cssClasses.handleLower); else if (handleNumber === options.handles - 1) addClass(handle, options.cssClasses.handleUpper);
                        return origin;
                    }
                    function addConnect(base, add) {
                        if (!add) return false;
                        return addNodeTo(base, options.cssClasses.connect);
                    }
                    function addElements(connectOptions, base) {
                        var connectBase = addNodeTo(base, options.cssClasses.connects);
                        scope_Handles = [];
                        scope_Connects = [];
                        scope_Connects.push(addConnect(connectBase, connectOptions[0]));
                        for (var i = 0; i < options.handles; i++) {
                            scope_Handles.push(addOrigin(base, i));
                            scope_HandleNumbers[i] = i;
                            scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
                        }
                    }
                    function addSlider(addTarget) {
                        addClass(addTarget, options.cssClasses.target);
                        if (0 === options.dir) addClass(addTarget, options.cssClasses.ltr); else addClass(addTarget, options.cssClasses.rtl);
                        if (0 === options.ort) addClass(addTarget, options.cssClasses.horizontal); else addClass(addTarget, options.cssClasses.vertical);
                        var textDirection = getComputedStyle(addTarget).direction;
                        if ("rtl" === textDirection) addClass(addTarget, options.cssClasses.textDirectionRtl); else addClass(addTarget, options.cssClasses.textDirectionLtr);
                        return addNodeTo(addTarget, options.cssClasses.base);
                    }
                    function addTooltip(handle, handleNumber) {
                        if (!options.tooltips || !options.tooltips[handleNumber]) return false;
                        return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
                    }
                    function isSliderDisabled() {
                        return scope_Target.hasAttribute("disabled");
                    }
                    function isHandleDisabled(handleNumber) {
                        var handleOrigin = scope_Handles[handleNumber];
                        return handleOrigin.hasAttribute("disabled");
                    }
                    function removeTooltips() {
                        if (scope_Tooltips) {
                            removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                            scope_Tooltips.forEach((function(tooltip) {
                                if (tooltip) removeElement(tooltip);
                            }));
                            scope_Tooltips = null;
                        }
                    }
                    function tooltips() {
                        removeTooltips();
                        scope_Tooltips = scope_Handles.map(addTooltip);
                        bindEvent("update" + INTERNAL_EVENT_NS.tooltips, (function(values, handleNumber, unencoded) {
                            if (!scope_Tooltips || !options.tooltips) return;
                            if (false === scope_Tooltips[handleNumber]) return;
                            var formattedValue = values[handleNumber];
                            if (true !== options.tooltips[handleNumber]) formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                            scope_Tooltips[handleNumber].innerHTML = formattedValue;
                        }));
                    }
                    function aria() {
                        removeEvent("update" + INTERNAL_EVENT_NS.aria);
                        bindEvent("update" + INTERNAL_EVENT_NS.aria, (function(values, handleNumber, unencoded, tap, positions) {
                            scope_HandleNumbers.forEach((function(index) {
                                var handle = scope_Handles[index];
                                var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                                var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                                var now = positions[index];
                                var text = String(options.ariaFormat.to(unencoded[index]));
                                min = scope_Spectrum.fromStepping(min).toFixed(1);
                                max = scope_Spectrum.fromStepping(max).toFixed(1);
                                now = scope_Spectrum.fromStepping(now).toFixed(1);
                                handle.children[0].setAttribute("aria-valuemin", min);
                                handle.children[0].setAttribute("aria-valuemax", max);
                                handle.children[0].setAttribute("aria-valuenow", now);
                                handle.children[0].setAttribute("aria-valuetext", text);
                            }));
                        }));
                    }
                    function getGroup(pips) {
                        if (pips.mode === exports.PipsMode.Range || pips.mode === exports.PipsMode.Steps) return scope_Spectrum.xVal;
                        if (pips.mode === exports.PipsMode.Count) {
                            if (pips.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                            var interval = pips.values - 1;
                            var spread = 100 / interval;
                            var values = [];
                            while (interval--) values[interval] = interval * spread;
                            values.push(100);
                            return mapToRange(values, pips.stepped);
                        }
                        if (pips.mode === exports.PipsMode.Positions) return mapToRange(pips.values, pips.stepped);
                        if (pips.mode === exports.PipsMode.Values) {
                            if (pips.stepped) return pips.values.map((function(value) {
                                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                            }));
                            return pips.values;
                        }
                        return [];
                    }
                    function mapToRange(values, stepped) {
                        return values.map((function(value) {
                            return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                        }));
                    }
                    function generateSpread(pips) {
                        function safeIncrement(value, increment) {
                            return Number((value + increment).toFixed(7));
                        }
                        var group = getGroup(pips);
                        var indexes = {};
                        var firstInRange = scope_Spectrum.xVal[0];
                        var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
                        var ignoreFirst = false;
                        var ignoreLast = false;
                        var prevPct = 0;
                        group = unique(group.slice().sort((function(a, b) {
                            return a - b;
                        })));
                        if (group[0] !== firstInRange) {
                            group.unshift(firstInRange);
                            ignoreFirst = true;
                        }
                        if (group[group.length - 1] !== lastInRange) {
                            group.push(lastInRange);
                            ignoreLast = true;
                        }
                        group.forEach((function(current, index) {
                            var step;
                            var i;
                            var q;
                            var low = current;
                            var high = group[index + 1];
                            var newPct;
                            var pctDifference;
                            var pctPos;
                            var type;
                            var steps;
                            var realSteps;
                            var stepSize;
                            var isSteps = pips.mode === exports.PipsMode.Steps;
                            if (isSteps) step = scope_Spectrum.xNumSteps[index];
                            if (!step) step = high - low;
                            if (void 0 === high) high = low;
                            step = Math.max(step, 1e-7);
                            for (i = low; i <= high; i = safeIncrement(i, step)) {
                                newPct = scope_Spectrum.toStepping(i);
                                pctDifference = newPct - prevPct;
                                steps = pctDifference / (pips.density || 1);
                                realSteps = Math.round(steps);
                                stepSize = pctDifference / realSteps;
                                for (q = 1; q <= realSteps; q += 1) {
                                    pctPos = prevPct + q * stepSize;
                                    indexes[pctPos.toFixed(5)] = [ scope_Spectrum.fromStepping(pctPos), 0 ];
                                }
                                type = group.indexOf(i) > -1 ? exports.PipsType.LargeValue : isSteps ? exports.PipsType.SmallValue : exports.PipsType.NoValue;
                                if (!index && ignoreFirst && i !== high) type = 0;
                                if (!(i === high && ignoreLast)) indexes[newPct.toFixed(5)] = [ i, type ];
                                prevPct = newPct;
                            }
                        }));
                        return indexes;
                    }
                    function addMarking(spread, filterFunc, formatter) {
                        var _a, _b;
                        var element = scope_Document.createElement("div");
                        var valueSizeClasses = (_a = {}, _a[exports.PipsType.None] = "", _a[exports.PipsType.NoValue] = options.cssClasses.valueNormal, 
                        _a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge, _a[exports.PipsType.SmallValue] = options.cssClasses.valueSub, 
                        _a);
                        var markerSizeClasses = (_b = {}, _b[exports.PipsType.None] = "", _b[exports.PipsType.NoValue] = options.cssClasses.markerNormal, 
                        _b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge, _b[exports.PipsType.SmallValue] = options.cssClasses.markerSub, 
                        _b);
                        var valueOrientationClasses = [ options.cssClasses.valueHorizontal, options.cssClasses.valueVertical ];
                        var markerOrientationClasses = [ options.cssClasses.markerHorizontal, options.cssClasses.markerVertical ];
                        addClass(element, options.cssClasses.pips);
                        addClass(element, 0 === options.ort ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
                        function getClasses(type, source) {
                            var a = source === options.cssClasses.value;
                            var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                            var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                            return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
                        }
                        function addSpread(offset, value, type) {
                            type = filterFunc ? filterFunc(value, type) : type;
                            if (type === exports.PipsType.None) return;
                            var node = addNodeTo(element, false);
                            node.className = getClasses(type, options.cssClasses.marker);
                            node.style[options.style] = offset + "%";
                            if (type > exports.PipsType.NoValue) {
                                node = addNodeTo(element, false);
                                node.className = getClasses(type, options.cssClasses.value);
                                node.setAttribute("data-value", String(value));
                                node.style[options.style] = offset + "%";
                                node.innerHTML = String(formatter.to(value));
                            }
                        }
                        Object.keys(spread).forEach((function(offset) {
                            addSpread(offset, spread[offset][0], spread[offset][1]);
                        }));
                        return element;
                    }
                    function removePips() {
                        if (scope_Pips) {
                            removeElement(scope_Pips);
                            scope_Pips = null;
                        }
                    }
                    function pips(pips) {
                        removePips();
                        var spread = generateSpread(pips);
                        var filter = pips.filter;
                        var format = pips.format || {
                            to: function(value) {
                                return String(Math.round(value));
                            }
                        };
                        scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
                        return scope_Pips;
                    }
                    function baseSize() {
                        var rect = scope_Base.getBoundingClientRect();
                        var alt = "offset" + [ "Width", "Height" ][options.ort];
                        return 0 === options.ort ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
                    }
                    function attachEvent(events, element, callback, data) {
                        var method = function(event) {
                            var e = fixEvent(event, data.pageOffset, data.target || element);
                            if (!e) return false;
                            if (isSliderDisabled() && !data.doNotReject) return false;
                            if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) return false;
                            if (events === actions.start && void 0 !== e.buttons && e.buttons > 1) return false;
                            if (data.hover && e.buttons) return false;
                            if (!supportsPassive) e.preventDefault();
                            e.calcPoint = e.points[options.ort];
                            callback(e, data);
                            return;
                        };
                        var methods = [];
                        events.split(" ").forEach((function(eventName) {
                            element.addEventListener(eventName, method, supportsPassive ? {
                                passive: true
                            } : false);
                            methods.push([ eventName, method ]);
                        }));
                        return methods;
                    }
                    function fixEvent(e, pageOffset, eventTarget) {
                        var touch = 0 === e.type.indexOf("touch");
                        var mouse = 0 === e.type.indexOf("mouse");
                        var pointer = 0 === e.type.indexOf("pointer");
                        var x = 0;
                        var y = 0;
                        if (0 === e.type.indexOf("MSPointer")) pointer = true;
                        if ("mousedown" === e.type && !e.buttons && !e.touches) return false;
                        if (touch) {
                            var isTouchOnTarget = function(checkTouch) {
                                var target = checkTouch.target;
                                return target === eventTarget || eventTarget.contains(target) || e.composed && e.composedPath().shift() === eventTarget;
                            };
                            if ("touchstart" === e.type) {
                                var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                                if (targetTouches.length > 1) return false;
                                x = targetTouches[0].pageX;
                                y = targetTouches[0].pageY;
                            } else {
                                var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                                if (!targetTouch) return false;
                                x = targetTouch.pageX;
                                y = targetTouch.pageY;
                            }
                        }
                        pageOffset = pageOffset || getPageOffset(scope_Document);
                        if (mouse || pointer) {
                            x = e.clientX + pageOffset.x;
                            y = e.clientY + pageOffset.y;
                        }
                        e.pageOffset = pageOffset;
                        e.points = [ x, y ];
                        e.cursor = mouse || pointer;
                        return e;
                    }
                    function calcPointToPercentage(calcPoint) {
                        var location = calcPoint - offset(scope_Base, options.ort);
                        var proposal = 100 * location / baseSize();
                        proposal = limit(proposal);
                        return options.dir ? 100 - proposal : proposal;
                    }
                    function getClosestHandle(clickedPosition) {
                        var smallestDifference = 100;
                        var handleNumber = false;
                        scope_Handles.forEach((function(handle, index) {
                            if (isHandleDisabled(index)) return;
                            var handlePosition = scope_Locations[index];
                            var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                            var clickAtEdge = 100 === differenceWithThisHandle && 100 === smallestDifference;
                            var isCloser = differenceWithThisHandle < smallestDifference;
                            var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                            if (isCloser || isCloserAfter || clickAtEdge) {
                                handleNumber = index;
                                smallestDifference = differenceWithThisHandle;
                            }
                        }));
                        return handleNumber;
                    }
                    function documentLeave(event, data) {
                        if ("mouseout" === event.type && "HTML" === event.target.nodeName && null === event.relatedTarget) eventEnd(event, data);
                    }
                    function eventMove(event, data) {
                        if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === event.buttons && 0 !== data.buttonsProperty) return eventEnd(event, data);
                        var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
                        var proposal = 100 * movement / data.baseSize;
                        moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
                    }
                    function eventEnd(event, data) {
                        if (data.handle) {
                            removeClass(data.handle, options.cssClasses.active);
                            scope_ActiveHandlesCount -= 1;
                        }
                        data.listeners.forEach((function(c) {
                            scope_DocumentElement.removeEventListener(c[0], c[1]);
                        }));
                        if (0 === scope_ActiveHandlesCount) {
                            removeClass(scope_Target, options.cssClasses.drag);
                            setZindex();
                            if (event.cursor) {
                                scope_Body.style.cursor = "";
                                scope_Body.removeEventListener("selectstart", preventDefault);
                            }
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("change", handleNumber);
                            fireEvent("set", handleNumber);
                            fireEvent("end", handleNumber);
                        }));
                    }
                    function eventStart(event, data) {
                        if (data.handleNumbers.some(isHandleDisabled)) return;
                        var handle;
                        if (1 === data.handleNumbers.length) {
                            var handleOrigin = scope_Handles[data.handleNumbers[0]];
                            handle = handleOrigin.children[0];
                            scope_ActiveHandlesCount += 1;
                            addClass(handle, options.cssClasses.active);
                        }
                        event.stopPropagation();
                        var listeners = [];
                        var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                            target: event.target,
                            handle,
                            connect: data.connect,
                            listeners,
                            startCalcPoint: event.calcPoint,
                            baseSize: baseSize(),
                            pageOffset: event.pageOffset,
                            handleNumbers: data.handleNumbers,
                            buttonsProperty: event.buttons,
                            locations: scope_Locations.slice()
                        });
                        var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
                        if (event.cursor) {
                            scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                            if (scope_Handles.length > 1) addClass(scope_Target, options.cssClasses.drag);
                            scope_Body.addEventListener("selectstart", preventDefault, false);
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("start", handleNumber);
                        }));
                    }
                    function eventTap(event) {
                        event.stopPropagation();
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var handleNumber = getClosestHandle(proposal);
                        if (false === handleNumber) return;
                        if (!options.events.snap) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        setHandle(handleNumber, proposal, true, true);
                        setZindex();
                        fireEvent("slide", handleNumber, true);
                        fireEvent("update", handleNumber, true);
                        if (!options.events.snap) {
                            fireEvent("change", handleNumber, true);
                            fireEvent("set", handleNumber, true);
                        } else eventStart(event, {
                            handleNumbers: [ handleNumber ]
                        });
                    }
                    function eventHover(event) {
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var to = scope_Spectrum.getStep(proposal);
                        var value = scope_Spectrum.fromStepping(to);
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            if ("hover" === targetEvent.split(".")[0]) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, value);
                            }));
                        }));
                    }
                    function eventKeydown(event, handleNumber) {
                        if (isSliderDisabled() || isHandleDisabled(handleNumber)) return false;
                        var horizontalKeys = [ "Left", "Right" ];
                        var verticalKeys = [ "Down", "Up" ];
                        var largeStepKeys = [ "PageDown", "PageUp" ];
                        var edgeKeys = [ "Home", "End" ];
                        if (options.dir && !options.ort) horizontalKeys.reverse(); else if (options.ort && !options.dir) {
                            verticalKeys.reverse();
                            largeStepKeys.reverse();
                        }
                        var key = event.key.replace("Arrow", "");
                        var isLargeDown = key === largeStepKeys[0];
                        var isLargeUp = key === largeStepKeys[1];
                        var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
                        var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
                        var isMin = key === edgeKeys[0];
                        var isMax = key === edgeKeys[1];
                        if (!isDown && !isUp && !isMin && !isMax) return true;
                        event.preventDefault();
                        var to;
                        if (isUp || isDown) {
                            var direction = isDown ? 0 : 1;
                            var steps = getNextStepsForHandle(handleNumber);
                            var step = steps[direction];
                            if (null === step) return false;
                            if (false === step) step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                            if (isLargeUp || isLargeDown) step *= options.keyboardPageMultiplier; else step *= options.keyboardMultiplier;
                            step = Math.max(step, 1e-7);
                            step *= isDown ? -1 : 1;
                            to = scope_Values[handleNumber] + step;
                        } else if (isMax) to = options.spectrum.xVal[options.spectrum.xVal.length - 1]; else to = options.spectrum.xVal[0];
                        setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
                        fireEvent("slide", handleNumber);
                        fireEvent("update", handleNumber);
                        fireEvent("change", handleNumber);
                        fireEvent("set", handleNumber);
                        return false;
                    }
                    function bindSliderEvents(behaviour) {
                        if (!behaviour.fixed) scope_Handles.forEach((function(handle, index) {
                            attachEvent(actions.start, handle.children[0], eventStart, {
                                handleNumbers: [ index ]
                            });
                        }));
                        if (behaviour.tap) attachEvent(actions.start, scope_Base, eventTap, {});
                        if (behaviour.hover) attachEvent(actions.move, scope_Base, eventHover, {
                            hover: true
                        });
                        if (behaviour.drag) scope_Connects.forEach((function(connect, index) {
                            if (false === connect || 0 === index || index === scope_Connects.length - 1) return;
                            var handleBefore = scope_Handles[index - 1];
                            var handleAfter = scope_Handles[index];
                            var eventHolders = [ connect ];
                            var handlesToDrag = [ handleBefore, handleAfter ];
                            var handleNumbersToDrag = [ index - 1, index ];
                            addClass(connect, options.cssClasses.draggable);
                            if (behaviour.fixed) {
                                eventHolders.push(handleBefore.children[0]);
                                eventHolders.push(handleAfter.children[0]);
                            }
                            if (behaviour.dragAll) {
                                handlesToDrag = scope_Handles;
                                handleNumbersToDrag = scope_HandleNumbers;
                            }
                            eventHolders.forEach((function(eventHolder) {
                                attachEvent(actions.start, eventHolder, eventStart, {
                                    handles: handlesToDrag,
                                    handleNumbers: handleNumbersToDrag,
                                    connect
                                });
                            }));
                        }));
                    }
                    function bindEvent(namespacedEvent, callback) {
                        scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
                        scope_Events[namespacedEvent].push(callback);
                        if ("update" === namespacedEvent.split(".")[0]) scope_Handles.forEach((function(a, index) {
                            fireEvent("update", index);
                        }));
                    }
                    function isInternalNamespace(namespace) {
                        return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
                    }
                    function removeEvent(namespacedEvent) {
                        var event = namespacedEvent && namespacedEvent.split(".")[0];
                        var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
                        Object.keys(scope_Events).forEach((function(bind) {
                            var tEvent = bind.split(".")[0];
                            var tNamespace = bind.substring(tEvent.length);
                            if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) if (!isInternalNamespace(tNamespace) || namespace === tNamespace) delete scope_Events[bind];
                        }));
                    }
                    function fireEvent(eventName, handleNumber, tap) {
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            var eventType = targetEvent.split(".")[0];
                            if (eventName === eventType) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                            }));
                        }));
                    }
                    function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {
                        var distance;
                        if (scope_Handles.length > 1 && !options.events.unconstrained) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                                to = Math.max(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                                to = Math.min(to, distance);
                            }
                        }
                        if (scope_Handles.length > 1 && options.limit) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                                to = Math.min(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                                to = Math.max(to, distance);
                            }
                        }
                        if (options.padding) {
                            if (0 === handleNumber) {
                                distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                                to = Math.max(to, distance);
                            }
                            if (handleNumber === scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                                to = Math.min(to, distance);
                            }
                        }
                        to = scope_Spectrum.getStep(to);
                        to = limit(to);
                        if (to === reference[handleNumber] && !getValue) return false;
                        return to;
                    }
                    function inRuleOrder(v, a) {
                        var o = options.ort;
                        return (o ? a : v) + ", " + (o ? v : a);
                    }
                    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
                        var proposals = locations.slice();
                        var firstHandle = handleNumbers[0];
                        var b = [ !upward, upward ];
                        var f = [ upward, !upward ];
                        handleNumbers = handleNumbers.slice();
                        if (upward) handleNumbers.reverse();
                        if (handleNumbers.length > 1) handleNumbers.forEach((function(handleNumber, o) {
                            var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);
                            if (false === to) proposal = 0; else {
                                proposal = to - proposals[handleNumber];
                                proposals[handleNumber] = to;
                            }
                        })); else b = f = [ true ];
                        var state = false;
                        handleNumbers.forEach((function(handleNumber, o) {
                            state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
                        }));
                        if (state) {
                            handleNumbers.forEach((function(handleNumber) {
                                fireEvent("update", handleNumber);
                                fireEvent("slide", handleNumber);
                            }));
                            if (void 0 != connect) fireEvent("drag", firstHandle);
                        }
                    }
                    function transformDirection(a, b) {
                        return options.dir ? 100 - a - b : a;
                    }
                    function updateHandlePosition(handleNumber, to) {
                        scope_Locations[handleNumber] = to;
                        scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
                        var translation = transformDirection(to, 0) - scope_DirOffset;
                        var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
                        scope_Handles[handleNumber].style[options.transformRule] = translateRule;
                        updateConnect(handleNumber);
                        updateConnect(handleNumber + 1);
                    }
                    function setZindex() {
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                            var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                            scope_Handles[handleNumber].style.zIndex = String(zIndex);
                        }));
                    }
                    function setHandle(handleNumber, to, lookBackward, lookForward, exactInput) {
                        if (!exactInput) to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);
                        if (false === to) return false;
                        updateHandlePosition(handleNumber, to);
                        return true;
                    }
                    function updateConnect(index) {
                        if (!scope_Connects[index]) return;
                        var l = 0;
                        var h = 100;
                        if (0 !== index) l = scope_Locations[index - 1];
                        if (index !== scope_Connects.length - 1) h = scope_Locations[index];
                        var connectWidth = h - l;
                        var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
                        var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
                        scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
                    }
                    function resolveToValue(to, handleNumber) {
                        if (null === to || false === to || void 0 === to) return scope_Locations[handleNumber];
                        if ("number" === typeof to) to = String(to);
                        to = options.format.from(to);
                        if (false !== to) to = scope_Spectrum.toStepping(to);
                        if (false === to || isNaN(to)) return scope_Locations[handleNumber];
                        return to;
                    }
                    function valueSet(input, fireSetEvent, exactInput) {
                        var values = asArray(input);
                        var isInit = void 0 === scope_Locations[0];
                        fireSetEvent = void 0 === fireSetEvent ? true : fireSetEvent;
                        if (options.animate && !isInit) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
                        }));
                        var i = 1 === scope_HandleNumbers.length ? 0 : 1;
                        if (isInit && scope_Spectrum.hasNoSize()) {
                            exactInput = true;
                            scope_Locations[0] = 0;
                            if (scope_HandleNumbers.length > 1) {
                                var space_1 = 100 / (scope_HandleNumbers.length - 1);
                                scope_HandleNumbers.forEach((function(handleNumber) {
                                    scope_Locations[handleNumber] = handleNumber * space_1;
                                }));
                            }
                        }
                        for (;i < scope_HandleNumbers.length; ++i) scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
                        }));
                        setZindex();
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            fireEvent("update", handleNumber);
                            if (null !== values[handleNumber] && fireSetEvent) fireEvent("set", handleNumber);
                        }));
                    }
                    function valueReset(fireSetEvent) {
                        valueSet(options.start, fireSetEvent);
                    }
                    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
                        handleNumber = Number(handleNumber);
                        if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
                        setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
                        fireEvent("update", handleNumber);
                        if (fireSetEvent) fireEvent("set", handleNumber);
                    }
                    function valueGet(unencoded) {
                        if (void 0 === unencoded) unencoded = false;
                        if (unencoded) return 1 === scope_Values.length ? scope_Values[0] : scope_Values.slice(0);
                        var values = scope_Values.map(options.format.to);
                        if (1 === values.length) return values[0];
                        return values;
                    }
                    function destroy() {
                        removeEvent(INTERNAL_EVENT_NS.aria);
                        removeEvent(INTERNAL_EVENT_NS.tooltips);
                        Object.keys(options.cssClasses).forEach((function(key) {
                            removeClass(scope_Target, options.cssClasses[key]);
                        }));
                        while (scope_Target.firstChild) scope_Target.removeChild(scope_Target.firstChild);
                        delete scope_Target.noUiSlider;
                    }
                    function getNextStepsForHandle(handleNumber) {
                        var location = scope_Locations[handleNumber];
                        var nearbySteps = scope_Spectrum.getNearbySteps(location);
                        var value = scope_Values[handleNumber];
                        var increment = nearbySteps.thisStep.step;
                        var decrement = null;
                        if (options.snap) return [ value - nearbySteps.stepBefore.startValue || null, nearbySteps.stepAfter.startValue - value || null ];
                        if (false !== increment) if (value + increment > nearbySteps.stepAfter.startValue) increment = nearbySteps.stepAfter.startValue - value;
                        if (value > nearbySteps.thisStep.startValue) decrement = nearbySteps.thisStep.step; else if (false === nearbySteps.stepBefore.step) decrement = false; else decrement = value - nearbySteps.stepBefore.highestStep;
                        if (100 === location) increment = null; else if (0 === location) decrement = null;
                        var stepDecimals = scope_Spectrum.countStepDecimals();
                        if (null !== increment && false !== increment) increment = Number(increment.toFixed(stepDecimals));
                        if (null !== decrement && false !== decrement) decrement = Number(decrement.toFixed(stepDecimals));
                        return [ decrement, increment ];
                    }
                    function getNextSteps() {
                        return scope_HandleNumbers.map(getNextStepsForHandle);
                    }
                    function updateOptions(optionsToUpdate, fireSetEvent) {
                        var v = valueGet();
                        var updateAble = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips" ];
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) originalOptions[name] = optionsToUpdate[name];
                        }));
                        var newOptions = testOptions(originalOptions);
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) options[name] = newOptions[name];
                        }));
                        scope_Spectrum = newOptions.spectrum;
                        options.margin = newOptions.margin;
                        options.limit = newOptions.limit;
                        options.padding = newOptions.padding;
                        if (options.pips) pips(options.pips); else removePips();
                        if (options.tooltips) tooltips(); else removeTooltips();
                        scope_Locations = [];
                        valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
                    }
                    function setupSlider() {
                        scope_Base = addSlider(scope_Target);
                        addElements(options.connect, scope_Base);
                        bindSliderEvents(options.events);
                        valueSet(options.start);
                        if (options.pips) pips(options.pips);
                        if (options.tooltips) tooltips();
                        aria();
                    }
                    setupSlider();
                    var scope_Self = {
                        destroy,
                        steps: getNextSteps,
                        on: bindEvent,
                        off: removeEvent,
                        get: valueGet,
                        set: valueSet,
                        setHandle: valueSetHandle,
                        reset: valueReset,
                        __moveHandles: function(upward, proposal, handleNumbers) {
                            moveHandles(upward, proposal, scope_Locations, handleNumbers);
                        },
                        options: originalOptions,
                        updateOptions,
                        target: scope_Target,
                        removePips,
                        removeTooltips,
                        getPositions: function() {
                            return scope_Locations.slice();
                        },
                        getTooltips: function() {
                            return scope_Tooltips;
                        },
                        getOrigins: function() {
                            return scope_Handles;
                        },
                        pips
                    };
                    return scope_Self;
                }
                function initialize(target, originalOptions) {
                    if (!target || !target.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + target);
                    if (target.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
                    var options = testOptions(originalOptions);
                    var api = scope(target, options, originalOptions);
                    target.noUiSlider = api;
                    return api;
                }
                var nouislider = {
                    __spectrum: Spectrum,
                    cssClasses,
                    create: initialize
                };
                exports.create = initialize;
                exports.cssClasses = cssClasses;
                exports["default"] = nouislider;
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const flsModules = {};
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
        function getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            spollerTitle.parentNode.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        spollerActiveTitle.parentNode.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove("_spoller-active");
                        spollerClose.parentNode.classList.remove("_spoller-active");
                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    }));
                }));
            }
        }
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction);
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                    }));
                }
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    }
                    e.preventDefault();
                }
            }
        }
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        class Popup {
            constructor(options) {
                let config = {
                    logging: true,
                    init: true,
                    attributeOpenButton: "data-popup",
                    attributeCloseButton: "data-close",
                    fixElementSelector: "[data-lp]",
                    youtubeAttribute: "data-popup-youtube",
                    youtubePlaceAttribute: "data-popup-youtube-place",
                    setAutoplayYoutube: true,
                    classes: {
                        popup: "popup",
                        popupContent: "popup__content",
                        popupActive: "popup_show",
                        bodyActive: "popup-show"
                    },
                    focusCatch: true,
                    closeEsc: true,
                    bodyLock: true,
                    hashSettings: {
                        location: true,
                        goHash: true
                    },
                    on: {
                        beforeOpen: function() {},
                        afterOpen: function() {},
                        beforeClose: function() {},
                        afterClose: function() {}
                    }
                };
                this.youTubeCode;
                this.isOpen = false;
                this.targetOpen = {
                    selector: false,
                    element: false
                };
                this.previousOpen = {
                    selector: false,
                    element: false
                };
                this.lastClosed = {
                    selector: false,
                    element: false
                };
                this._dataValue = false;
                this.hash = false;
                this._reopen = false;
                this._selectorOpen = false;
                this.lastFocusEl = false;
                this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
                this.options = {
                    ...config,
                    ...options,
                    classes: {
                        ...config.classes,
                        ...options?.classes
                    },
                    hashSettings: {
                        ...config.hashSettings,
                        ...options?.hashSettings
                    },
                    on: {
                        ...config.on,
                        ...options?.on
                    }
                };
                this.bodyLock = false;
                this.options.init ? this.initPopups() : null;
            }
            initPopups() {
                this.popupLogging(`Проснулся`);
                this.eventsPopup();
            }
            eventsPopup() {
                document.addEventListener("click", function(e) {
                    const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                    if (buttonOpen) {
                        e.preventDefault();
                        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                        if ("error" !== this._dataValue) {
                            if (!this.isOpen) this.lastFocusEl = buttonOpen;
                            this.targetOpen.selector = `${this._dataValue}`;
                            this._selectorOpen = true;
                            this.open();
                            return;
                        } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                        return;
                    }
                    const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                    if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                    if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                        this._focusCatch(e);
                        return;
                    }
                }.bind(this));
                if (this.options.hashSettings.goHash) {
                    window.addEventListener("hashchange", function() {
                        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                    }.bind(this));
                    window.addEventListener("load", function() {
                        if (window.location.hash) this._openToHash();
                    }.bind(this));
                }
            }
            open(selectorValue) {
                if (bodyLockStatus) {
                    document.addEventListener("click", (function(e) {
                        if (e.target.classList.contains("popup__wrapper")) window.location.hash = "";
                    }));
                    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                        this.targetOpen.selector = selectorValue;
                        this._selectorOpen = true;
                    }
                    if (this.isOpen) {
                        this._reopen = true;
                        this.close();
                    }
                    if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                    if (!this._reopen) this.previousActiveElement = document.activeElement;
                    this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                    if (this.targetOpen.element) {
                        if (this.youTubeCode) {
                            const codeVideo = this.youTubeCode;
                            const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                            const iframe = document.createElement("iframe");
                            iframe.setAttribute("allowfullscreen", "");
                            const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                            iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                            iframe.setAttribute("src", urlVideo);
                            if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                                this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                            }
                            this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                        }
                        if (this.options.hashSettings.location) {
                            this._getHash();
                            this._setHash();
                        }
                        this.options.on.beforeOpen(this);
                        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.targetOpen.element.classList.add(this.options.classes.popupActive);
                        document.documentElement.classList.add(this.options.classes.bodyActive);
                        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                        this.targetOpen.element.setAttribute("aria-hidden", "false");
                        this.previousOpen.selector = this.targetOpen.selector;
                        this.previousOpen.element = this.targetOpen.element;
                        this._selectorOpen = false;
                        this.isOpen = true;
                        setTimeout((() => {
                            this._focusTrap();
                        }), 50);
                        this.options.on.afterOpen(this);
                        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.popupLogging(`Открыл попап`);
                    } else this.popupLogging(`такого попапа нет.Проверьте корректность ввода. `);
                }
            }
            close(selectorValue) {
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
                if (!this.isOpen || !bodyLockStatus) return;
                this.options.on.beforeClose(this);
                document.dispatchEvent(new CustomEvent("beforePopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
                this.previousOpen.element.classList.remove(this.options.classes.popupActive);
                this.previousOpen.element.setAttribute("aria-hidden", "true");
                if (!this._reopen) {
                    document.documentElement.classList.remove(this.options.classes.bodyActive);
                    !this.bodyLock ? bodyUnlock() : null;
                    this.isOpen = false;
                }
                this._removeHash();
                if (this._selectorOpen) {
                    this.lastClosed.selector = this.previousOpen.selector;
                    this.lastClosed.element = this.previousOpen.element;
                }
                this.options.on.afterClose(this);
                document.dispatchEvent(new CustomEvent("afterPopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                setTimeout((() => {
                    this._focusTrap();
                }), 50);
                this.popupLogging(`Закрыл попап`);
            }
            _getHash() {
                if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
            }
            _openToHash() {
                let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
                const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
                if (buttons && classInHash) this.open(classInHash);
            }
            _setHash() {
                history.pushState("", "", this.hash);
            }
            _removeHash() {
                history.pushState("", "", window.location.href.split("#")[0]);
            }
            _focusCatch(e) {
                const focusable = this.targetOpen.element.querySelectorAll(this._focuskEl);
                const focusArray = Array.prototype.slice.call(focusable);
                const focusedIndex = focusArray.indexOf(document.activeElement);
                if (e.shiftKey && 0 === focusedIndex) {
                    focusArray[focusArray.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                    focusArray[0].focus();
                    e.preventDefault();
                }
            }
            _focusTrap() {
                const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
                if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
            }
            popupLogging(message) {
                this.options.logging ? FLS(`[Попапос]: ${message}`) : null;
            }
        }
        flsModules.popup = new Popup({});
        let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    headerItemHeight = document.querySelector(headerItem).offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                FLS(`[gotoBlock]: ...едем к ${targetBlock}`);
            } else FLS(`[gotoBlock]: ...такого блока нет на странице: ${targetBlock}`);
        };
        function formFieldsInit(options = {
            viewPass: false
        }) {
            const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
            if (formFields.length) formFields.forEach((formField => {
                if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
            }));
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    formValidate.removeError(targetElement);
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
                }
            }));
            if (options.viewPass) document.addEventListener("click", (function(e) {
                let targetElement = e.target;
                if (targetElement.closest('[class*="__viewpass"]')) {
                    let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                    targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                    targetElement.classList.toggle("_viewpass-active");
                }
            }));
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if ("email" === formRequiredItem.dataset.required) {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        function formSubmit(options = {
            validate: true
        }) {
            const forms = document.forms;
            if (forms.length) for (const form of forms) {
                form.addEventListener("submit", (function(e) {
                    const form = e.target;
                    formSubmitAction(form, e);
                }));
                form.addEventListener("reset", (function(e) {
                    const form = e.target;
                    formValidate.formClean(form);
                }));
            }
            async function formSubmitAction(form, e) {
                const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
                if (0 === error) {
                    const ajax = form.hasAttribute("data-ajax");
                    if (ajax) {
                        e.preventDefault();
                        const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                        const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                        const formData = new FormData(form);
                        form.classList.add("_sending");
                        const response = await fetch(formAction, {
                            method: formMethod,
                            body: formData
                        });
                        if (response.ok) {
                            await response.json();
                            form.classList.remove("_sending");
                            formSent(form);
                        } else {
                            alert("Ошибка!");
                            form.classList.remove("_sending");
                        }
                    } else if (form.hasAttribute("data-dev")) {
                        e.preventDefault();
                        formSent(form);
                    }
                } else {
                    e.preventDefault();
                    const formError = form.querySelector("._form-error");
                    if (formError && form.hasAttribute("data-goto-error")) gotoBlock(formError, true, 1e3);
                }
            }
            function formSent(form) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                setTimeout((() => {
                    if (flsModules.popup) {
                        const popup = form.dataset.popupMessage;
                        popup ? flsModules.popup.open(popup) : null;
                    }
                }), 0);
                formValidate.formClean(form);
                formLogging(`Форма отправлена!`);
            }
            function formLogging(message) {
                FLS(`[Формы]: ${message}`);
            }
        }
        !function(e) {
            "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : window.wNumb = e();
        }((function() {
            "use strict";
            var o = [ "decimals", "thousand", "mark", "prefix", "suffix", "encoder", "decoder", "negativeBefore", "negative", "edit", "undo" ];
            function w(e) {
                return e.split("").reverse().join("");
            }
            function h(e, t) {
                return e.substring(0, t.length) === t;
            }
            function f(e, t, n) {
                if ((e[t] || e[n]) && e[t] === e[n]) throw new Error(t);
            }
            function x(e) {
                return "number" == typeof e && isFinite(e);
            }
            function n(e, t, n, r, i, o, f, u, s, c, a, p) {
                var d, l, h, g = p, v = "", m = "";
                return o && (p = o(p)), !!x(p) && (!1 !== e && 0 === parseFloat(p.toFixed(e)) && (p = 0), 
                p < 0 && (d = !0, p = Math.abs(p)), !1 !== e && (p = function(e, t) {
                    return e = e.toString().split("e"), (+((e = (e = Math.round(+(e[0] + "e" + (e[1] ? +e[1] + t : t)))).toString().split("e"))[0] + "e" + (e[1] ? e[1] - t : -t))).toFixed(t);
                }(p, e)), -1 !== (p = p.toString()).indexOf(".") ? (h = (l = p.split("."))[0], n && (v = n + l[1])) : h = p, 
                t && (h = w((h = w(h).match(/.{1,3}/g)).join(w(t)))), d && u && (m += u), r && (m += r), 
                d && s && (m += s), m += h, m += v, i && (m += i), c && (m = c(m, g)), m);
            }
            function r(e, t, n, r, i, o, f, u, s, c, a, p) {
                var d, l = "";
                return a && (p = a(p)), !(!p || "string" != typeof p) && (u && h(p, u) && (p = p.replace(u, ""), 
                d = !0), r && h(p, r) && (p = p.replace(r, "")), s && h(p, s) && (p = p.replace(s, ""), 
                d = !0), i && function(e, t) {
                    return e.slice(-1 * t.length) === t;
                }(p, i) && (p = p.slice(0, -1 * i.length)), t && (p = p.split(t).join("")), n && (p = p.replace(n, ".")), 
                d && (l += "-"), "" !== (l = (l += p).replace(/[^0-9\.\-.]/g, "")) && (l = Number(l), 
                f && (l = f(l)), !!x(l) && l));
            }
            function i(e, t, n) {
                var r, i = [];
                for (r = 0; r < o.length; r += 1) i.push(e[o[r]]);
                return i.push(n), t.apply("", i);
            }
            return function e(t) {
                if (!(this instanceof e)) return new e(t);
                "object" == typeof t && (t = function(e) {
                    var t, n, r, i = {};
                    for (void 0 === e.suffix && (e.suffix = e.postfix), t = 0; t < o.length; t += 1) if (void 0 === (r = e[n = o[t]])) "negative" !== n || i.negativeBefore ? "mark" === n && "." !== i.thousand ? i[n] = "." : i[n] = !1 : i[n] = "-"; else if ("decimals" === n) {
                        if (!(0 <= r && r < 8)) throw new Error(n);
                        i[n] = r;
                    } else if ("encoder" === n || "decoder" === n || "edit" === n || "undo" === n) {
                        if ("function" != typeof r) throw new Error(n);
                        i[n] = r;
                    } else {
                        if ("string" != typeof r) throw new Error(n);
                        i[n] = r;
                    }
                    return f(i, "mark", "thousand"), f(i, "prefix", "negative"), f(i, "prefix", "negativeBefore"), 
                    i;
                }(t), this.to = function(e) {
                    return i(t, n, e);
                }, this.from = function(e) {
                    return i(t, r, e);
                });
            };
        }));
        var nouislider = __webpack_require__(211);
        const tabsBody = document.querySelectorAll("#calculatorTabsBody");
        tabsBody.forEach((tab => {
            const rangeFirstSlider = tab.querySelector(".filters-price__first-slider");
            const rangeSecondSlider = tab.querySelector(".filters-price__second-slider");
            const formatter = new Intl.NumberFormat("ru");
            const firstRangeInput = tab.querySelector("#first-range-input");
            const secondRangeInput = tab.querySelector("#second-range-input");
            let firstRangeMin = parseFloat(firstRangeInput.getAttribute("min"));
            let firstRangeMax = parseFloat(firstRangeInput.getAttribute("max"));
            let secondRangeMin = parseFloat(secondRangeInput.getAttribute("min"));
            let secondRangeMax = parseFloat(secondRangeInput.getAttribute("max"));
            const depositInput = tab.querySelector("#deposit");
            const pay = tab.querySelector("#pay");
            let take = tab.querySelector("#take");
            nouislider.create(rangeFirstSlider, {
                start: [ 1e6 ],
                connect: [ true, false ],
                step: 1,
                range: {
                    min: [ firstRangeMin ],
                    max: [ firstRangeMax ]
                },
                format: wNumb({
                    decimals: 0,
                    thousand: " "
                })
            });
            rangeFirstSlider.noUiSlider.on("update", (function(values) {
                firstRangeInput.value = values;
                calculate();
                inputWidth(pay);
                inputWidth(firstRangeInput);
                inputWidth(depositInput);
            }));
            firstRangeInput.addEventListener("change", (function() {
                rangeFirstSlider.noUiSlider.set(this.value);
            }));
            nouislider.create(rangeSecondSlider, {
                start: [ 25 ],
                connect: [ true, false ],
                step: 1,
                range: {
                    min: [ secondRangeMin ],
                    max: [ secondRangeMax ]
                },
                format: wNumb({
                    decimals: 0,
                    thousand: " "
                })
            });
            rangeSecondSlider.noUiSlider.on("update", (function(values) {
                secondRangeInput.value = values;
                calculate();
                inputWidth(secondRangeInput);
                inputWidth(pay);
            }));
            secondRangeInput.addEventListener("change", (function() {
                rangeSecondSlider.noUiSlider.set(this.value);
            }));
            function calculate() {
                pay.value = formatter.format(parseInt(stringToNumber(firstRangeInput) / stringToNumber(secondRangeInput)));
                take.innerText = "   " + firstRangeInput.value;
                let ratio = parseFloat(depositInput.getAttribute("ratio"));
                depositInput.value = formatter.format(parseInt(ratio * stringToNumber(firstRangeInput)));
            }
            function inputWidth(item) {
                let itemLength = item.value.length;
                item.style.width = itemLength + "ch";
            }
            function stringToNumber(inputString) {
                let val = parseInt(Array.from(inputString.value).filter((item => " " != item)).join(""));
                return val;
            }
            const formCity =  document.querySelector('#formCity');
            const formLoaner = document.querySelector('#formLoaner');
            const formPtsEstate = document.querySelector("#formPtsEstate");
            const formTotal = document.querySelector("#formTotal");
            const formTerm = document.querySelector("#formTerm");
            const formDeposit = document.querySelector("#formDeposit");
            const formPay = document.querySelector("#formPay");
            const takes = document.querySelectorAll(".calculator-tabs__button");
            for (const take of takes) take.addEventListener("click", (function() {
                let inputTopCity = document.querySelector("#cityTopInput");
                let formCityParent = inputTopCity.value
                formCity.value = formCityParent
                let formLoanerParent = take.parentNode.parentNode.parentNode.parentNode.getAttribute('loaner')
            formLoaner.value = formLoanerParent
                let parentPtsEstate = take.parentNode.parentNode.parentNode.querySelector("._tab-active").value;
                formPtsEstate.value = parentPtsEstate;
                formPtsEstate.innerText = parentPtsEstate;
                let formTotalParent = take.parentNode.querySelector("#first-range-input").value;
                formValues(formTotal, formTotalParent);
                let formTermParent = take.parentNode.querySelector("#second-range-input").value;
                formValues(formTerm, formTermParent);
                let formDepositParent = take.parentNode.querySelector("#deposit").value;
                formValues(formDeposit, formDepositParent);
                let formPayParent = take.parentNode.querySelector("#pay").value;
                formValues(formPay, formPayParent);
            }));
            function formValues(formItem, itemParent) {
                formItem.innerText = itemParent;
                formItem.value = itemParent;
            }
            const totalSummTable = document.querySelector("#totalSummTable");
            const totalMonthsTable = document.querySelector("#totalMonthsTable");
            const popupProcentTable = document.querySelector("#popupProcentTable");
            const popupTable = document.querySelectorAll(".popupTable-link");
            const procent = parseFloat(pay.getAttribute("procent"));
            const decimal = 100;
            const tbody = document.querySelector(".popup-chart__tbody");
            for (const table of popupTable) table.addEventListener("click", (function() {
                document.querySelector("#popup-table");
                let totalSummTableParent = " " + table.parentNode.parentNode.querySelector("#first-range-input").value;
                formValues(totalSummTable, totalSummTableParent);
                inputWidth(totalSummTable);
                let totalMonthsTableParent = " " + table.parentNode.parentNode.querySelector("#second-range-input").value;
                formValues(totalMonthsTable, totalMonthsTableParent);
                inputWidth(totalMonthsTable);
                let popupProcentTableParent = " " + (procent * decimal).toFixed(1) + "%";
                formValues(popupProcentTable, popupProcentTableParent);
                inputWidth(popupProcentTable);
                let totalSummTableParentNum = stringToNumber(table.parentNode.parentNode.querySelector("#first-range-input"));
                let tbodyTrValueNum = stringToNumber(table.parentNode.parentNode.querySelector("#second-range-input"));
                let tbodyTrValue = table.parentNode.parentNode.querySelector("#second-range-input").value;
                table.parentNode.parentNode.querySelector("#pay").value;
                let tdtValueNum = totalSummTableParentNum / tbodyTrValueNum;
                let tdrValue = stringToNumber(table.parentNode.parentNode.querySelector("#first-range-input")) - tdtValueNum;
                var rounded = function(number) {
                    return +number.toFixed(2);
                };
                let tbodyTr = '<tr class="popup-chart__tr">            <td id="month"></td>            <td id="procentPay"></td>            <td id="termPay"></td>            <td id="remain"></td>        </tr>';
                while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
                for (let index = 0; index < tbodyTrValue; index++) {
                    tbody.insertAdjacentHTML("beforeend", tbodyTr);
                    let tdm = tbody.querySelectorAll("#month");
                    let tdt = tbody.querySelectorAll("#termPay");
                    let tdr = tbody.querySelectorAll("#remain");
                    let tdp = tbody.querySelectorAll("#procentPay");
                    tdm[index].innerText = index + 1;
                    tdt[index].innerText = rounded(tdtValueNum);
                    if (0 == index) {
                        tdr[index].innerText = rounded(tdrValue);
                        tdr[index].innerText;
                        tdp[index].innerText = rounded(procent * totalSummTableParentNum + parseFloat(tdt[index].textContent));
                    }
                    if (index > 0) {
                        tdr[index].innerText = rounded(tdr[index - 1].textContent - tdt[index].textContent);
                        tdp[index].innerText = rounded(procent * tdr[index - 1].textContent + parseFloat(tdt[index].textContent));
                    }
                    if (index == tbodyTrValue - 1) {
                        console.log(tbodyTrValue - 1);
                        tdr[index].innerText = parseInt(tdr[index - 1].textContent - tdt[index].textContent);
                    }
                }
            }));
        }));
        function ssr_window_esm_isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = "undefined" !== typeof document ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if ("undefined" === typeof setTimeout) {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if ("undefined" === typeof setTimeout) return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = "undefined" !== typeof window ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function makeReactive(obj) {
            const proto = obj.__proto__;
            Object.defineProperty(obj, "__proto__", {
                get() {
                    return proto;
                },
                set(value) {
                    proto.__proto__ = value;
                }
            });
        }
        class Dom7 extends Array {
            constructor(items) {
                if ("number" === typeof items) super(items); else {
                    super(...items || []);
                    makeReactive(this);
                }
            }
        }
        function arrayFlat(arr = []) {
            const res = [];
            arr.forEach((el => {
                if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
            }));
            return res;
        }
        function arrayFilter(arr, callback) {
            return Array.prototype.filter.call(arr, callback);
        }
        function arrayUnique(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
            return uniqueArray;
        }
        function qsa(selector, context) {
            if ("string" !== typeof selector) return [ selector ];
            const a = [];
            const res = context.querySelectorAll(selector);
            for (let i = 0; i < res.length; i += 1) a.push(res[i]);
            return a;
        }
        function dom7_esm_$(selector, context) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            let arr = [];
            if (!context && selector instanceof Dom7) return selector;
            if (!selector) return new Dom7(arr);
            if ("string" === typeof selector) {
                const html = selector.trim();
                if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                    let toCreate = "div";
                    if (0 === html.indexOf("<li")) toCreate = "ul";
                    if (0 === html.indexOf("<tr")) toCreate = "tbody";
                    if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                    if (0 === html.indexOf("<tbody")) toCreate = "table";
                    if (0 === html.indexOf("<option")) toCreate = "select";
                    const tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
                } else arr = qsa(selector.trim(), context || document);
            } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
                if (selector instanceof Dom7) return selector;
                arr = selector;
            }
            return new Dom7(arrayUnique(arr));
        }
        dom7_esm_$.fn = Dom7.prototype;
        function addClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.add(...classNames);
            }));
            return this;
        }
        function removeClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.remove(...classNames);
            }));
            return this;
        }
        function toggleClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                classNames.forEach((className => {
                    el.classList.toggle(className);
                }));
            }));
        }
        function hasClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
        }
        function attr(attrs, value) {
            if (1 === arguments.length && "string" === typeof attrs) {
                if (this[0]) return this[0].getAttribute(attrs);
                return;
            }
            for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
            }
            return this;
        }
        function removeAttr(attr) {
            for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
            return this;
        }
        function transform(transform) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
            return this;
        }
        function transition(duration) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
            return this;
        }
        function on(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            function handleLiveEvent(e) {
                const target = e.target;
                if (!target) return;
                const eventData = e.target.dom7EventData || [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                    const parents = dom7_esm_$(target).parents();
                    for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
                }
            }
            function handleEvent(e) {
                const eventData = e && e.target ? e.target.dom7EventData || [] : [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                listener.apply(this, eventData);
            }
            const events = eventType.split(" ");
            let j;
            for (let i = 0; i < this.length; i += 1) {
                const el = this[i];
                if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7Listeners) el.dom7Listeners = {};
                    if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                    el.dom7Listeners[event].push({
                        listener,
                        proxyListener: handleEvent
                    });
                    el.addEventListener(event, handleEvent, capture);
                } else for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                    if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                    el.dom7LiveListeners[event].push({
                        listener,
                        proxyListener: handleLiveEvent
                    });
                    el.addEventListener(event, handleLiveEvent, capture);
                }
            }
            return this;
        }
        function off(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            const events = eventType.split(" ");
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    let handlers;
                    if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                    if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                        const handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
            return this;
        }
        function trigger(...args) {
            const window = ssr_window_esm_getWindow();
            const events = args[0].split(" ");
            const eventData = args[1];
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    if (window.CustomEvent) {
                        const evt = new window.CustomEvent(event, {
                            detail: eventData,
                            bubbles: true,
                            cancelable: true
                        });
                        el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                        el.dispatchEvent(evt);
                        el.dom7EventData = [];
                        delete el.dom7EventData;
                    }
                }
            }
            return this;
        }
        function transitionEnd(callback) {
            const dom = this;
            function fireCallBack(e) {
                if (e.target !== this) return;
                callback.call(this, e);
                dom.off("transitionend", fireCallBack);
            }
            if (callback) dom.on("transitionend", fireCallBack);
            return this;
        }
        function dom7_esm_outerWidth(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        }
        function dom7_esm_outerHeight(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        }
        function offset() {
            if (this.length > 0) {
                const window = ssr_window_esm_getWindow();
                const document = ssr_window_esm_getDocument();
                const el = this[0];
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            return null;
        }
        function styles() {
            const window = ssr_window_esm_getWindow();
            if (this[0]) return window.getComputedStyle(this[0], null);
            return {};
        }
        function css(props, value) {
            const window = ssr_window_esm_getWindow();
            let i;
            if (1 === arguments.length) if ("string" === typeof props) {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            } else {
                for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
                return this;
            }
            if (2 === arguments.length && "string" === typeof props) {
                for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
                return this;
            }
            return this;
        }
        function each(callback) {
            if (!callback) return this;
            this.forEach(((el, index) => {
                callback.apply(el, [ el, index ]);
            }));
            return this;
        }
        function filter(callback) {
            const result = arrayFilter(this, callback);
            return dom7_esm_$(result);
        }
        function html(html) {
            if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
            for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
            return this;
        }
        function dom7_esm_text(text) {
            if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
            for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
            return this;
        }
        function is(selector) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            let compareWith;
            let i;
            if (!el || "undefined" === typeof selector) return false;
            if ("string" === typeof selector) {
                if (el.matches) return el.matches(selector);
                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                compareWith = dom7_esm_$(selector);
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            if (selector === document) return el === document;
            if (selector === window) return el === window;
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [ selector ] : selector;
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            return false;
        }
        function index() {
            let child = this[0];
            let i;
            if (child) {
                i = 0;
                while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
                return i;
            }
            return;
        }
        function eq(index) {
            if ("undefined" === typeof index) return this;
            const length = this.length;
            if (index > length - 1) return dom7_esm_$([]);
            if (index < 0) {
                const returnIndex = length + index;
                if (returnIndex < 0) return dom7_esm_$([]);
                return dom7_esm_$([ this[returnIndex] ]);
            }
            return dom7_esm_$([ this[index] ]);
        }
        function append(...els) {
            let newChild;
            const document = ssr_window_esm_getDocument();
            for (let k = 0; k < els.length; k += 1) {
                newChild = els[k];
                for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
                } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
            }
            return this;
        }
        function prepend(newChild) {
            const document = ssr_window_esm_getDocument();
            let i;
            let j;
            for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
            return this;
        }
        function next(selector) {
            if (this.length > 0) {
                if (selector) {
                    if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function nextAll(selector) {
            const nextEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (dom7_esm_$(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return dom7_esm_$(nextEls);
        }
        function prev(selector) {
            if (this.length > 0) {
                const el = this[0];
                if (selector) {
                    if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function prevAll(selector) {
            const prevEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return dom7_esm_$(prevEls);
        }
        function dom7_esm_parent(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
                if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else parents.push(this[i].parentNode);
            return dom7_esm_$(parents);
        }
        function parents(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) {
                let parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                    } else parents.push(parent);
                    parent = parent.parentNode;
                }
            }
            return dom7_esm_$(parents);
        }
        function closest(selector) {
            let closest = this;
            if ("undefined" === typeof selector) return dom7_esm_$([]);
            if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
            return closest;
        }
        function find(selector) {
            const foundElements = [];
            for (let i = 0; i < this.length; i += 1) {
                const found = this[i].querySelectorAll(selector);
                for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
            }
            return dom7_esm_$(foundElements);
        }
        function children(selector) {
            const children = [];
            for (let i = 0; i < this.length; i += 1) {
                const childNodes = this[i].children;
                for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
            return dom7_esm_$(children);
        }
        function remove() {
            for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            return this;
        }
        const noTrigger = "resize scroll".split(" ");
        function shortcut(name) {
            function eventHandler(...args) {
                if ("undefined" === typeof args[0]) {
                    for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                    return this;
                }
                return this.on(name, ...args);
            }
            return eventHandler;
        }
        shortcut("click");
        shortcut("blur");
        shortcut("focus");
        shortcut("focusin");
        shortcut("focusout");
        shortcut("keyup");
        shortcut("keydown");
        shortcut("keypress");
        shortcut("submit");
        shortcut("change");
        shortcut("mousedown");
        shortcut("mousemove");
        shortcut("mouseup");
        shortcut("mouseenter");
        shortcut("mouseleave");
        shortcut("mouseout");
        shortcut("mouseover");
        shortcut("touchstart");
        shortcut("touchend");
        shortcut("touchmove");
        shortcut("resize");
        shortcut("scroll");
        const Methods = {
            addClass,
            removeClass,
            hasClass,
            toggleClass,
            attr,
            removeAttr,
            transform,
            transition,
            on,
            off,
            trigger,
            transitionEnd,
            outerWidth: dom7_esm_outerWidth,
            outerHeight: dom7_esm_outerHeight,
            styles,
            offset,
            css,
            each,
            html,
            text: dom7_esm_text,
            is,
            index,
            eq,
            append,
            prepend,
            next,
            nextAll,
            prev,
            prevAll,
            parent: dom7_esm_parent,
            parents,
            closest,
            find,
            children,
            filter,
            remove
        };
        Object.keys(Methods).forEach((methodName => {
            Object.defineProperty(dom7_esm_$.fn, methodName, {
                value: Methods[methodName],
                writable: true
            });
        }));
        const dom = dom7_esm_$;
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay) {
            if (void 0 === delay) delay = 0;
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis) {
            if (void 0 === axis) axis = "x";
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
        }
        function isNode(node) {
            if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
            return node && (1 === node.nodeType || 11 === node.nodeType);
        }
        function utils_extend() {
            const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < arguments.length; i += 1) {
                const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll(_ref) {
            let {swiper, targetPosition, side} = _ref;
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (null === startTime) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                passiveListener: function checkPassiveListener() {
                    let supportsPassive = false;
                    try {
                        const opts = Object.defineProperty({}, "passive", {
                            get() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }(),
                gestures: function checkGestures() {
                    return "ongesturestart" in window;
                }()
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice(_temp) {
            let {userAgent} = void 0 === _temp ? {} : _temp;
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = "Win32" === platform;
            let macos = "MacIntel" === platform;
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides) {
            if (void 0 === overrides) overrides = {};
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            return {
                isSafari: isSafari(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize(_ref) {
            let {swiper, on, emit} = _ref;
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((_ref2 => {
                            let {contentBoxSize, contentRect, target} = _ref2;
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = function(target, options) {
                if (void 0 === options) options = {};
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (1 === mutations.length) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                    childList: "undefined" === typeof options.childList ? true : options.childList,
                    characterData: "undefined" === typeof options.characterData ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = swiper.$el.parents();
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.$el[0], {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.$wrapperEl[0], {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        const events_emitter = {
            on(events, handler, priority) {
                const self = this;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if ("function" !== typeof handler) return self;
                function onceHandler() {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit() {
                const self = this;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                if ("string" === typeof args[0] || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const $el = swiper.$el;
            if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
            if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
            if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
            width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
            height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionLabel(property) {
                if (swiper.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if ("undefined" === typeof swiperSize) return;
            if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
            swiper.virtualSize = -spaceBetween;
            if (rtl) slides.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }); else slides.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slidesLength);
            let slideSize;
            const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                const slide = slides.eq(i);
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
                if ("none" === slide.css("display")) continue;
                if ("auto" === params.slidesPerView) {
                    if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide[0]);
                    const currentTransform = slide[0].style.transform;
                    const currentWebKitTransform = slide[0].style.webkitTransform;
                    if (currentTransform) slide[0].style.transform = "none";
                    if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide[0];
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide[0].style.transform = currentTransform;
                    if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
                width: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (params.setWrapperSize) $wrapperEl.css({
                [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (0 === snapGrid.length) snapGrid = [ 0 ];
            if (0 !== params.spaceBetween) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).css({
                    [key]: `${spaceBetween}px`
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                const maxSnap = allSlidesSize - swiperSize;
                snapGrid = snapGrid.map((snap => {
                    if (snap < 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                if (allSlidesSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
                return swiper.slides.eq(index)[0];
            };
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) swiper.visibleSlides.each((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
        function updateSlidesProgress(translate) {
            if (void 0 === translate) translate = this && this.translate || 0;
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (0 === slides.length) return;
            if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            slides.removeClass(params.slideVisibleClass);
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
            swiper.visibleSlides = dom(swiper.visibleSlides);
        }
        function updateProgress(translate) {
            const swiper = this;
            if ("undefined" === typeof translate) {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (0 === translatesDiff) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                isBeginning = progress <= 0;
                isEnd = progress >= 1;
            }
            Object.assign(swiper, {
                progress,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
            let activeSlide;
            if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
            activeSlide.addClass(params.slideActiveClass);
            if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
            let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
            if (params.loop && 0 === nextSlide.length) {
                nextSlide = slides.eq(0);
                nextSlide.addClass(params.slideNextClass);
            }
            let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
            if (params.loop && 0 === prevSlide.length) {
                prevSlide = slides.eq(-1);
                prevSlide.addClass(params.slidePrevClass);
            }
            if (params.loop) {
                if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
                if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
            }
            swiper.emitSlidesClasses();
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            if ("undefined" === typeof activeIndex) {
                for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
                } else if (translate >= slidesGrid[i]) activeIndex = i;
                if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
            }
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
            Object.assign(swiper, {
                snapIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
        }
        function updateClickedSlide(e) {
            const swiper = this;
            const params = swiper.params;
            const slide = dom(e).closest(`.${params.slideClass}`)[0];
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        const update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis) {
            if (void 0 === axis) axis = this.isHorizontal() ? "x" : "y";
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
            if (void 0 === translate) translate = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if (void 0 === translateBounds) translateBounds = true;
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (0 === speed) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        const translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit(_ref) {
            let {swiper, runCallbacks, direction, step} = _ref;
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if ("reset" === dir) {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks, direction) {
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd_transitionEnd(runCallbacks, direction) {
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        const core_transition = {
            setTransition,
            transitionStart,
            transitionEnd: transitionEnd_transitionEnd
        };
        function slideTo(index, speed, runCallbacks, internal, initial) {
            if (void 0 === index) index = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            const translate = -snapGrid[snapIndex];
            swiper.updateProgress(translate);
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(100 * translate);
                const normalizedGrid = Math.floor(100 * slidesGrid[i]);
                const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
                if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if ("slide" !== params.effect) swiper.setTranslate(translate);
                if ("reset" !== direction) {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (0 === speed) {
                    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._swiperImmediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index, speed, runCallbacks, internal) {
            if (void 0 === index) index = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            let newIndex = index;
            if (swiper.params.loop) newIndex += swiper.loopedSlides;
            return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }
        function slideNext(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {animating, enabled, params} = swiper;
            if (!enabled) return swiper;
            let perGroup = params.slidesPerGroup;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
            if (!enabled) return swiper;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if ("undefined" === typeof prevSnap && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if ("undefined" !== typeof prevSnap) {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed, runCallbacks, internal, threshold) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if (void 0 === threshold) threshold = .5;
            const swiper = this;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            const {params, $wrapperEl} = swiper;
            const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        const slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, $wrapperEl} = swiper;
            const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
            $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
            let slides = $selector.children(`.${params.slideClass}`);
            if (params.loopFillGroupWithBlank) {
                const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
                if (blankSlidesNum !== params.slidesPerGroup) {
                    for (let i = 0; i < blankSlidesNum; i += 1) {
                        const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                        $selector.append(blankNode);
                    }
                    slides = $selector.children(`.${params.slideClass}`);
                }
            }
            if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
            swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
            swiper.loopedSlides += params.loopAdditionalSlides;
            if (swiper.loopedSlides > slides.length) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                if (index < swiper.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - swiper.loopedSlides) prependSlides.push(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
            for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        function loopFix() {
            const swiper = this;
            swiper.emit("beforeLoopFix");
            const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
            let newIndex;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            const snapTranslate = -snapGrid[activeIndex];
            const diff = snapTranslate - swiper.getTranslate();
            if (activeIndex < loopedSlides) {
                newIndex = slides.length - 3 * loopedSlides + activeIndex;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            } else if (activeIndex >= slides.length - loopedSlides) {
                newIndex = -slides.length + activeIndex + loopedSlides;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {$wrapperEl, params, slides} = swiper;
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
            slides.removeAttr("data-swiper-slide-index");
        }
        const loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
            el.style.cursor = "move";
            el.style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab";
            el.style.cursor = moving ? "-moz-grabbin" : "-moz-grab";
            el.style.cursor = moving ? "grabbing" : "grab";
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        }
        const grab_cursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base) {
            if (void 0 === base) base = this;
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            const data = swiper.touchEventsData;
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let $targetEl = dom(e.target);
            if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
            data.isTouchEvent = "touchstart" === e.type;
            if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
            if (!data.isTouchEvent && "button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) $targetEl = dom(event.path[0]);
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, e.target) : $targetEl.closest(noSwipingSelector)[0])) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
            touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            if ("touchstart" !== e.type) {
                let preventDefault = true;
                if ($targetEl.is(data.focusableElements)) {
                    preventDefault = false;
                    if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
                }
                if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
                const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
                if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
            }
            if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            if (data.isTouchEvent && "touchmove" !== e.type) return;
            const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
            const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
            const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if ("undefined" === typeof data.isScrolling) {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            if (!data.isMoved) {
                if (params.loop && !params.cssMode) swiper.loopFix();
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
                data.allowMomentumBounce = false;
                if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            let diff = swiper.isHorizontal() ? diffX : diffY;
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) diff = -diff;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (swiper.params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if ("undefined" !== typeof slidesGrid[i + increment]) {
                    if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                    if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && 0 === el.offsetWidth) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (-0 === swiper.translate) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        let dummyEventAttached = false;
        function dummyEventListener() {}
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, touchEvents, el, wrapperEl, device, support} = swiper;
            const capture = !!params.nested;
            const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!support.touch) {
                el[domMethod](touchEvents.start, swiper.onTouchStart, false);
                document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
                document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
            } else {
                const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
                el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                    passive: false,
                    capture
                } : capture);
                el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
                if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
            }
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        };
        function attachEvents() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, support} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            if (support.touch && !dummyEventAttached) {
                document.addEventListener("touchstart", dummyEventListener);
                dummyEventAttached = true;
            }
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        const core_events = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                $el.addClass(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base, containerEl) {
            if (void 0 === base) base = "window";
            if (!breakpoints || "container" === base && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if ("string" === typeof point && 0 === point.indexOf("@")) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if ("window" === base) {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        const breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if ("string" === typeof item) resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, $el, device, support} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "pointer-events": !support.touch
            }, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            $el.addClass([ ...classNames ].join(" "));
            swiper.emitContainerClasses();
        }
        function removeClasses_removeClasses() {
            const swiper = this;
            const {$el, classNames} = swiper;
            $el.removeClass(classNames.join(" "));
            swiper.emitContainerClasses();
        }
        const classes = {
            addClasses,
            removeClasses: removeClasses_removeClasses
        };
        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
            const window = ssr_window_esm_getWindow();
            let image;
            function onReady() {
                if (callback) callback();
            }
            const isPicture = dom(imageEl).parent("picture")[0];
            if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
                image = new window.Image;
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) image.sizes = sizes;
                if (srcset) image.srcset = srcset;
                if (src) image.src = src;
            } else onReady(); else onReady();
        }
        function preloadImages() {
            const swiper = this;
            swiper.imagesToLoad = swiper.$el.find("img");
            function onReady() {
                if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
                if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
                if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                    if (swiper.params.updateOnImagesReady) swiper.update();
                    swiper.emit("imagesReady");
                }
            }
            for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
                const imageEl = swiper.imagesToLoad[i];
                swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
            }
        }
        const core_images = {
            loadImage,
            preloadImages
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = 1 === swiper.snapGrid.length;
            if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
            if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        const check_overflow = {
            checkOverflow
        };
        const defaults = {
            init: true,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: false,
            loopPreventsSlide: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj) {
                if (void 0 === obj) obj = {};
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if ("object" !== typeof moduleParams || null === moduleParams) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                    auto: true
                };
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (true === params[moduleParamName]) params[moduleParamName] = {
                    enabled: true
                };
                if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter: events_emitter,
            update,
            translate,
            transition: core_transition,
            slide,
            loop,
            grabCursor: grab_cursor,
            events: core_events,
            breakpoints,
            checkOverflow: check_overflow,
            classes,
            images: core_images
        };
        const extendedDefaults = {};
        class core_Swiper {
            constructor() {
                let el;
                let params;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                if (params.el && dom(params.el).length > 1) {
                    const swipers = [];
                    dom(params.el).each((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                swiper.$ = dom;
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: dom(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return "horizontal" === swiper.params.direction;
                    },
                    isVertical() {
                        return "vertical" === swiper.params.direction;
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEvents: function touchEvents() {
                        const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                        const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                        swiper.touchEventsTouch = {
                            start: touch[0],
                            move: touch[1],
                            end: touch[2],
                            cancel: touch[3]
                        };
                        swiper.touchEventsDesktop = {
                            start: desktop[0],
                            move: desktop[1],
                            end: desktop[2]
                        };
                        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                    }(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: utils_now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.each((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view, exact) {
                if (void 0 === view) view = "current";
                if (void 0 === exact) exact = false;
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex].swiperSlideSize;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                    setTranslate();
                    if (swiper.params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate) {
                if (void 0 === needUpdate) needUpdate = true;
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
                if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.each((slideEl => {
                    if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            mount(el) {
                const swiper = this;
                if (swiper.mounted) return true;
                const $el = dom(el || swiper.params.el);
                el = $el[0];
                if (!el) return false;
                el.swiper = swiper;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                        res.children = options => $el.children(options);
                        return res;
                    }
                    return $el.children(getWrapperSelector());
                };
                let $wrapperEl = getWrapper();
                if (0 === $wrapperEl.length && swiper.params.createElements) {
                    const document = ssr_window_esm_getDocument();
                    const wrapper = document.createElement("div");
                    $wrapperEl = dom(wrapper);
                    wrapper.className = swiper.params.wrapperClass;
                    $el.append(wrapper);
                    $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                        $wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    $el,
                    el,
                    $wrapperEl,
                    wrapperEl: $wrapperEl[0],
                    mounted: true,
                    rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                    rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                    wrongRTL: "-webkit-box" === $wrapperEl.css("display")
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (false === mounted) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                if (swiper.params.loop) swiper.loopCreate();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.preloadImages) swiper.preloadImages();
                if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                swiper.attachEvents();
                swiper.initialized = true;
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance, cleanStyles) {
                if (void 0 === deleteInstance) deleteInstance = true;
                if (void 0 === cleanStyles) cleanStyles = true;
                const swiper = this;
                const {params, $el, $wrapperEl, slides} = swiper;
                if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    $el.removeAttr("style");
                    $wrapperEl.removeAttr("style");
                    if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (false !== deleteInstance) {
                    swiper.$el[0].swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
                const modules = core_Swiper.prototype.__modules__;
                if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => core_Swiper.installModule(m)));
                    return core_Swiper;
                }
                core_Swiper.installModule(module);
                return core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        core_Swiper.use([ Resize, Observer ]);
        const core = core_Swiper;
        function Keyboard(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            swiper.keyboard = {
                enabled: false
            };
            extendParams({
                keyboard: {
                    enabled: false,
                    onlyInViewport: true,
                    pageUpDown: true
                }
            });
            function handle(event) {
                if (!swiper.enabled) return;
                const {rtlTranslate: rtl} = swiper;
                let e = event;
                if (e.originalEvent) e = e.originalEvent;
                const kc = e.keyCode || e.charCode;
                const pageUpDown = swiper.params.keyboard.pageUpDown;
                const isPageUp = pageUpDown && 33 === kc;
                const isPageDown = pageUpDown && 34 === kc;
                const isArrowLeft = 37 === kc;
                const isArrowRight = 39 === kc;
                const isArrowUp = 38 === kc;
                const isArrowDown = 40 === kc;
                if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) return false;
                if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) return false;
                if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
                if (document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase())) return;
                if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
                    let inView = false;
                    if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && 0 === swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length) return;
                    const $el = swiper.$el;
                    const swiperWidth = $el[0].clientWidth;
                    const swiperHeight = $el[0].clientHeight;
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    const swiperOffset = swiper.$el.offset();
                    if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
                    const swiperCoord = [ [ swiperOffset.left, swiperOffset.top ], [ swiperOffset.left + swiperWidth, swiperOffset.top ], [ swiperOffset.left, swiperOffset.top + swiperHeight ], [ swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight ] ];
                    for (let i = 0; i < swiperCoord.length; i += 1) {
                        const point = swiperCoord[i];
                        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
                            if (0 === point[0] && 0 === point[1]) continue;
                            inView = true;
                        }
                    }
                    if (!inView) return;
                }
                if (swiper.isHorizontal()) {
                    if (isPageUp || isPageDown || isArrowLeft || isArrowRight) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                    if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
                    if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
                } else {
                    if (isPageUp || isPageDown || isArrowUp || isArrowDown) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                    if (isPageDown || isArrowDown) swiper.slideNext();
                    if (isPageUp || isArrowUp) swiper.slidePrev();
                }
                emit("keyPress", kc);
                return;
            }
            function enable() {
                if (swiper.keyboard.enabled) return;
                dom(document).on("keydown", handle);
                swiper.keyboard.enabled = true;
            }
            function disable() {
                if (!swiper.keyboard.enabled) return;
                dom(document).off("keydown", handle);
                swiper.keyboard.enabled = false;
            }
            on("init", (() => {
                if (swiper.params.keyboard.enabled) enable();
            }));
            on("destroy", (() => {
                if (swiper.keyboard.enabled) disable();
            }));
            Object.assign(swiper.keyboard, {
                enable,
                disable
            });
        }
        function Mousewheel(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const window = ssr_window_esm_getWindow();
            extendParams({
                mousewheel: {
                    enabled: false,
                    releaseOnEdges: false,
                    invert: false,
                    forceToAxis: false,
                    sensitivity: 1,
                    eventsTarget: "container",
                    thresholdDelta: null,
                    thresholdTime: null
                }
            });
            swiper.mousewheel = {
                enabled: false
            };
            let timeout;
            let lastScrollTime = utils_now();
            let lastEventBeforeSnap;
            const recentWheelEvents = [];
            function normalize(e) {
                const PIXEL_STEP = 10;
                const LINE_HEIGHT = 40;
                const PAGE_HEIGHT = 800;
                let sX = 0;
                let sY = 0;
                let pX = 0;
                let pY = 0;
                if ("detail" in e) sY = e.detail;
                if ("wheelDelta" in e) sY = -e.wheelDelta / 120;
                if ("wheelDeltaY" in e) sY = -e.wheelDeltaY / 120;
                if ("wheelDeltaX" in e) sX = -e.wheelDeltaX / 120;
                if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
                    sX = sY;
                    sY = 0;
                }
                pX = sX * PIXEL_STEP;
                pY = sY * PIXEL_STEP;
                if ("deltaY" in e) pY = e.deltaY;
                if ("deltaX" in e) pX = e.deltaX;
                if (e.shiftKey && !pX) {
                    pX = pY;
                    pY = 0;
                }
                if ((pX || pY) && e.deltaMode) if (1 === e.deltaMode) {
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
                if (pX && !sX) sX = pX < 1 ? -1 : 1;
                if (pY && !sY) sY = pY < 1 ? -1 : 1;
                return {
                    spinX: sX,
                    spinY: sY,
                    pixelX: pX,
                    pixelY: pY
                };
            }
            function handleMouseEnter() {
                if (!swiper.enabled) return;
                swiper.mouseEntered = true;
            }
            function handleMouseLeave() {
                if (!swiper.enabled) return;
                swiper.mouseEntered = false;
            }
            function animateSlider(newEvent) {
                if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) return false;
                if (swiper.params.mousewheel.thresholdTime && utils_now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) return false;
                if (newEvent.delta >= 6 && utils_now() - lastScrollTime < 60) return true;
                if (newEvent.direction < 0) {
                    if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
                        swiper.slideNext();
                        emit("scroll", newEvent.raw);
                    }
                } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
                    swiper.slidePrev();
                    emit("scroll", newEvent.raw);
                }
                lastScrollTime = (new window.Date).getTime();
                return false;
            }
            function releaseScroll(newEvent) {
                const params = swiper.params.mousewheel;
                if (newEvent.direction < 0) {
                    if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) return true;
                } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) return true;
                return false;
            }
            function handle(event) {
                let e = event;
                let disableParentSwiper = true;
                if (!swiper.enabled) return;
                const params = swiper.params.mousewheel;
                if (swiper.params.cssMode) e.preventDefault();
                let target = swiper.$el;
                if ("container" !== swiper.params.mousewheel.eventsTarget) target = dom(swiper.params.mousewheel.eventsTarget);
                if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
                if (e.originalEvent) e = e.originalEvent;
                let delta = 0;
                const rtlFactor = swiper.rtlTranslate ? -1 : 1;
                const data = normalize(e);
                if (params.forceToAxis) if (swiper.isHorizontal()) if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor; else return true; else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY; else return true; else delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
                if (0 === delta) return true;
                if (params.invert) delta = -delta;
                let positions = swiper.getTranslate() + delta * params.sensitivity;
                if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
                if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();
                disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
                if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
                if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
                    const newEvent = {
                        time: utils_now(),
                        delta: Math.abs(delta),
                        direction: Math.sign(delta),
                        raw: event
                    };
                    if (recentWheelEvents.length >= 2) recentWheelEvents.shift();
                    const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                    recentWheelEvents.push(newEvent);
                    if (prevEvent) {
                        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) animateSlider(newEvent);
                    } else animateSlider(newEvent);
                    if (releaseScroll(newEvent)) return true;
                } else {
                    const newEvent = {
                        time: utils_now(),
                        delta: Math.abs(delta),
                        direction: Math.sign(delta)
                    };
                    const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
                    if (!ignoreWheelEvents) {
                        lastEventBeforeSnap = void 0;
                        if (swiper.params.loop) swiper.loopFix();
                        let position = swiper.getTranslate() + delta * params.sensitivity;
                        const wasBeginning = swiper.isBeginning;
                        const wasEnd = swiper.isEnd;
                        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
                        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
                        swiper.setTransition(0);
                        swiper.setTranslate(position);
                        swiper.updateProgress();
                        swiper.updateActiveIndex();
                        swiper.updateSlidesClasses();
                        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) swiper.updateSlidesClasses();
                        if (swiper.params.freeMode.sticky) {
                            clearTimeout(timeout);
                            timeout = void 0;
                            if (recentWheelEvents.length >= 15) recentWheelEvents.shift();
                            const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                            const firstEvent = recentWheelEvents[0];
                            recentWheelEvents.push(newEvent);
                            if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) recentWheelEvents.splice(0); else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
                                const snapToThreshold = delta > 0 ? .8 : .2;
                                lastEventBeforeSnap = newEvent;
                                recentWheelEvents.splice(0);
                                timeout = utils_nextTick((() => {
                                    swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                                }), 0);
                            }
                            if (!timeout) timeout = utils_nextTick((() => {
                                const snapToThreshold = .5;
                                lastEventBeforeSnap = newEvent;
                                recentWheelEvents.splice(0);
                                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                            }), 500);
                        }
                        if (!ignoreWheelEvents) emit("scroll", e);
                        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
                        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
                    }
                }
                if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                return false;
            }
            function events(method) {
                let target = swiper.$el;
                if ("container" !== swiper.params.mousewheel.eventsTarget) target = dom(swiper.params.mousewheel.eventsTarget);
                target[method]("mouseenter", handleMouseEnter);
                target[method]("mouseleave", handleMouseLeave);
                target[method]("wheel", handle);
            }
            function enable() {
                if (swiper.params.cssMode) {
                    swiper.wrapperEl.removeEventListener("wheel", handle);
                    return true;
                }
                if (swiper.mousewheel.enabled) return false;
                events("on");
                swiper.mousewheel.enabled = true;
                return true;
            }
            function disable() {
                if (swiper.params.cssMode) {
                    swiper.wrapperEl.addEventListener(event, handle);
                    return true;
                }
                if (!swiper.mousewheel.enabled) return false;
                events("off");
                swiper.mousewheel.enabled = false;
                return true;
            }
            on("init", (() => {
                if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) disable();
                if (swiper.params.mousewheel.enabled) enable();
            }));
            on("destroy", (() => {
                if (swiper.params.cssMode) enable();
                if (swiper.mousewheel.enabled) disable();
            }));
            Object.assign(swiper.mousewheel, {
                enable,
                disable
            });
        }
        function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            const document = ssr_window_esm_getDocument();
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && true === params.auto) {
                    let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                    if (!element) {
                        element = document.createElement("div");
                        element.className = checkProps[key];
                        swiper.$el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            });
            swiper.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null
            };
            function getEl(el) {
                let $el;
                if (el) {
                    $el = dom(el);
                    if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
                }
                return $el;
            }
            function toggleEl($el, disabled) {
                const params = swiper.params.navigation;
                if ($el && $el.length > 0) {
                    $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                    if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
                }
            }
            function update() {
                if (swiper.params.loop) return;
                const {$nextEl, $prevEl} = swiper.navigation;
                toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                const $nextEl = getEl(params.nextEl);
                const $prevEl = getEl(params.prevEl);
                if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
                if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
                Object.assign(swiper.navigation, {
                    $nextEl,
                    nextEl: $nextEl && $nextEl[0],
                    $prevEl,
                    prevEl: $prevEl && $prevEl[0]
                });
                if (!swiper.enabled) {
                    if ($nextEl) $nextEl.addClass(params.lockClass);
                    if ($prevEl) $prevEl.addClass(params.lockClass);
                }
            }
            function destroy() {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl && $nextEl.length) {
                    $nextEl.off("click", onNextClick);
                    $nextEl.removeClass(swiper.params.navigation.disabledClass);
                }
                if ($prevEl && $prevEl.length) {
                    $prevEl.off("click", onPrevClick);
                    $prevEl.removeClass(swiper.params.navigation.disabledClass);
                }
            }
            on("init", (() => {
                init();
                update();
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
                if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            }));
            on("click", ((_s, e) => {
                const {$nextEl, $prevEl} = swiper.navigation;
                const targetEl = e.target;
                if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                    if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                    if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                    if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
            }));
            Object.assign(swiper.navigation, {
                update,
                init,
                destroy
            });
        }
        function classes_to_selector_classesToSelector(classes) {
            if (void 0 === classes) classes = "";
            return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const pfx = "swiper-pagination";
            extendParams({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: false,
                    hideOnClick: false,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: false,
                    type: "bullets",
                    dynamicBullets: false,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: number => number,
                    formatFractionTotal: number => number,
                    bulletClass: `${pfx}-bullet`,
                    bulletActiveClass: `${pfx}-bullet-active`,
                    modifierClass: `${pfx}-`,
                    currentClass: `${pfx}-current`,
                    totalClass: `${pfx}-total`,
                    hiddenClass: `${pfx}-hidden`,
                    progressbarFillClass: `${pfx}-progressbar-fill`,
                    progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                    clickableClass: `${pfx}-clickable`,
                    lockClass: `${pfx}-lock`,
                    horizontalClass: `${pfx}-horizontal`,
                    verticalClass: `${pfx}-vertical`
                }
            });
            swiper.pagination = {
                el: null,
                $el: null,
                bullets: []
            };
            let bulletSize;
            let dynamicBulletIndex = 0;
            function isPaginationDisabled() {
                return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
            }
            function setSideBullets($bulletEl, position) {
                const {bulletActiveClass} = swiper.params.pagination;
                $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
            }
            function update() {
                const rtl = swiper.rtl;
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let current;
                const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.loop) {
                    current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                    if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                    if (current > total - 1) current -= total;
                    if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
                } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
                if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                    const bullets = swiper.pagination.bullets;
                    let firstIndex;
                    let lastIndex;
                    let midIndex;
                    if (params.dynamicBullets) {
                        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                        $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                        if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                            dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                    if ($el.length > 1) bullets.each((bullet => {
                        const $bullet = dom(bullet);
                        const bulletIndex = $bullet.index();
                        if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                            if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                        }
                    })); else {
                        const $bullet = bullets.eq(current);
                        const bulletIndex = $bullet.index();
                        $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            const $firstDisplayedBullet = bullets.eq(firstIndex);
                            const $lastDisplayedBullet = bullets.eq(lastIndex);
                            for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                            if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                                for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            }
                        }
                    }
                    if (params.dynamicBullets) {
                        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                        const offsetProp = rtl ? "right" : "left";
                        bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                    }
                }
                if ("fraction" === params.type) {
                    $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                    $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
                }
                if ("progressbar" === params.type) {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                    $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
                }
                if ("custom" === params.type && params.renderCustom) {
                    $el.html(params.renderCustom(swiper, current + 1, total));
                    emit("paginationRender", $el[0]);
                } else emit("paginationUpdate", $el[0]);
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
            function render() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let paginationHTML = "";
                if ("bullets" === params.type) {
                    let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                    for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                    $el.html(paginationHTML);
                    swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
                }
                if ("fraction" === params.type) {
                    if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("progressbar" === params.type) {
                    if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
            }
            function init() {
                swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                    el: "swiper-pagination"
                });
                const params = swiper.params.pagination;
                if (!params.el) return;
                let $el = dom(params.el);
                if (0 === $el.length) return;
                if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                    $el = swiper.$el.find(params.el);
                    if ($el.length > 1) $el = $el.filter((el => {
                        if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                        return true;
                    }));
                }
                if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
                $el.addClass(params.modifierClass + params.type);
                $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if ("bullets" === params.type && params.dynamicBullets) {
                    $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
                if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                    e.preventDefault();
                    let index = dom(this).index() * swiper.params.slidesPerGroup;
                    if (swiper.params.loop) index += swiper.loopedSlides;
                    swiper.slideTo(index);
                }));
                Object.assign(swiper.pagination, {
                    $el,
                    el: $el[0]
                });
                if (!swiper.enabled) $el.addClass(params.lockClass);
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const $el = swiper.pagination.$el;
                $el.removeClass(params.hiddenClass);
                $el.removeClass(params.modifierClass + params.type);
                $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
                if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
            }
            on("init", (() => {
                init();
                render();
                update();
            }));
            on("activeIndexChange", (() => {
                if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
            }));
            on("snapIndexChange", (() => {
                if (!swiper.params.loop) update();
            }));
            on("slidesLengthChange", (() => {
                if (swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("snapGridLengthChange", (() => {
                if (!swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$el} = swiper.pagination;
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
            }));
            on("lock unlock", (() => {
                update();
            }));
            on("click", ((_s, e) => {
                const targetEl = e.target;
                const {$el} = swiper.pagination;
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                    if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                    $el.toggleClass(swiper.params.pagination.hiddenClass);
                }
            }));
            Object.assign(swiper.pagination, {
                render,
                update,
                init,
                destroy
            });
        }
        function Scrollbar(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const document = ssr_window_esm_getDocument();
            let isTouched = false;
            let timeout = null;
            let dragTimeout = null;
            let dragStartPos;
            let dragSize;
            let trackSize;
            let divider;
            extendParams({
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: false,
                    draggable: false,
                    snapOnRelease: true,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            });
            swiper.scrollbar = {
                el: null,
                dragEl: null,
                $el: null,
                $dragEl: null
            };
            function setTranslate() {
                if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
                const {scrollbar, rtlTranslate: rtl, progress} = swiper;
                const {$dragEl, $el} = scrollbar;
                const params = swiper.params.scrollbar;
                let newSize = dragSize;
                let newPos = (trackSize - dragSize) * progress;
                if (rtl) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = dragSize - newPos;
                        newPos = 0;
                    } else if (-newPos + dragSize > trackSize) newSize = trackSize + newPos;
                } else if (newPos < 0) {
                    newSize = dragSize + newPos;
                    newPos = 0;
                } else if (newPos + dragSize > trackSize) newSize = trackSize - newPos;
                if (swiper.isHorizontal()) {
                    $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
                    $dragEl[0].style.width = `${newSize}px`;
                } else {
                    $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
                    $dragEl[0].style.height = `${newSize}px`;
                }
                if (params.hide) {
                    clearTimeout(timeout);
                    $el[0].style.opacity = 1;
                    timeout = setTimeout((() => {
                        $el[0].style.opacity = 0;
                        $el.transition(400);
                    }), 1e3);
                }
            }
            function setTransition(duration) {
                if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
                swiper.scrollbar.$dragEl.transition(duration);
            }
            function updateSize() {
                if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
                const {scrollbar} = swiper;
                const {$dragEl, $el} = scrollbar;
                $dragEl[0].style.width = "";
                $dragEl[0].style.height = "";
                trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
                divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
                if ("auto" === swiper.params.scrollbar.dragSize) dragSize = trackSize * divider; else dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
                if (swiper.isHorizontal()) $dragEl[0].style.width = `${dragSize}px`; else $dragEl[0].style.height = `${dragSize}px`;
                if (divider >= 1) $el[0].style.display = "none"; else $el[0].style.display = "";
                if (swiper.params.scrollbar.hide) $el[0].style.opacity = 0;
                if (swiper.params.watchOverflow && swiper.enabled) scrollbar.$el[swiper.isLocked ? "addClass" : "removeClass"](swiper.params.scrollbar.lockClass);
            }
            function getPointerPosition(e) {
                if (swiper.isHorizontal()) return "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX;
                return "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY;
            }
            function setDragPosition(e) {
                const {scrollbar, rtlTranslate: rtl} = swiper;
                const {$el} = scrollbar;
                let positionRatio;
                positionRatio = (getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? "left" : "top"] - (null !== dragStartPos ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
                positionRatio = Math.max(Math.min(positionRatio, 1), 0);
                if (rtl) positionRatio = 1 - positionRatio;
                const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
                swiper.updateProgress(position);
                swiper.setTranslate(position);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            function onDragStart(e) {
                const params = swiper.params.scrollbar;
                const {scrollbar, $wrapperEl} = swiper;
                const {$el, $dragEl} = scrollbar;
                isTouched = true;
                dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? "left" : "top"] : null;
                e.preventDefault();
                e.stopPropagation();
                $wrapperEl.transition(100);
                $dragEl.transition(100);
                setDragPosition(e);
                clearTimeout(dragTimeout);
                $el.transition(0);
                if (params.hide) $el.css("opacity", 1);
                if (swiper.params.cssMode) swiper.$wrapperEl.css("scroll-snap-type", "none");
                emit("scrollbarDragStart", e);
            }
            function onDragMove(e) {
                const {scrollbar, $wrapperEl} = swiper;
                const {$el, $dragEl} = scrollbar;
                if (!isTouched) return;
                if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                setDragPosition(e);
                $wrapperEl.transition(0);
                $el.transition(0);
                $dragEl.transition(0);
                emit("scrollbarDragMove", e);
            }
            function onDragEnd(e) {
                const params = swiper.params.scrollbar;
                const {scrollbar, $wrapperEl} = swiper;
                const {$el} = scrollbar;
                if (!isTouched) return;
                isTouched = false;
                if (swiper.params.cssMode) {
                    swiper.$wrapperEl.css("scroll-snap-type", "");
                    $wrapperEl.transition("");
                }
                if (params.hide) {
                    clearTimeout(dragTimeout);
                    dragTimeout = utils_nextTick((() => {
                        $el.css("opacity", 0);
                        $el.transition(400);
                    }), 1e3);
                }
                emit("scrollbarDragEnd", e);
                if (params.snapOnRelease) swiper.slideToClosest();
            }
            function events(method) {
                const {scrollbar, touchEventsTouch, touchEventsDesktop, params, support} = swiper;
                const $el = scrollbar.$el;
                const target = $el[0];
                const activeListener = support.passiveListener && params.passiveListeners ? {
                    passive: false,
                    capture: false
                } : false;
                const passiveListener = support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                if (!target) return;
                const eventMethod = "on" === method ? "addEventListener" : "removeEventListener";
                if (!support.touch) {
                    target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
                    document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
                    document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
                } else {
                    target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
                    target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
                    target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
                }
            }
            function enableDraggable() {
                if (!swiper.params.scrollbar.el) return;
                events("on");
            }
            function disableDraggable() {
                if (!swiper.params.scrollbar.el) return;
                events("off");
            }
            function init() {
                const {scrollbar, $el: $swiperEl} = swiper;
                swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
                    el: "swiper-scrollbar"
                });
                const params = swiper.params.scrollbar;
                if (!params.el) return;
                let $el = dom(params.el);
                if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1 && 1 === $swiperEl.find(params.el).length) $el = $swiperEl.find(params.el);
                let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);
                if (0 === $dragEl.length) {
                    $dragEl = dom(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
                    $el.append($dragEl);
                }
                Object.assign(scrollbar, {
                    $el,
                    el: $el[0],
                    $dragEl,
                    dragEl: $dragEl[0]
                });
                if (params.draggable) enableDraggable();
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.scrollbar.lockClass);
            }
            function destroy() {
                disableDraggable();
            }
            on("init", (() => {
                init();
                updateSize();
                setTranslate();
            }));
            on("update resize observerUpdate lock unlock", (() => {
                updateSize();
            }));
            on("setTranslate", (() => {
                setTranslate();
            }));
            on("setTransition", ((_s, duration) => {
                setTransition(duration);
            }));
            on("enable disable", (() => {
                const {$el} = swiper.scrollbar;
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.scrollbar.lockClass);
            }));
            on("destroy", (() => {
                destroy();
            }));
            Object.assign(swiper.scrollbar, {
                updateSize,
                setTranslate,
                init,
                destroy
            });
        }
        function Autoplay(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            let timeout;
            swiper.autoplay = {
                running: false,
                paused: false
            };
            extendParams({
                autoplay: {
                    enabled: false,
                    delay: 3e3,
                    waitForTransition: true,
                    disableOnInteraction: true,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                    pauseOnMouseEnter: false
                }
            });
            function run() {
                const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
                let delay = swiper.params.autoplay.delay;
                if ($activeSlideEl.attr("data-swiper-autoplay")) delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
                clearTimeout(timeout);
                timeout = utils_nextTick((() => {
                    let autoplayResult;
                    if (swiper.params.autoplay.reverseDirection) if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isBeginning) {
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop(); else if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isEnd) {
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop();
                    if (swiper.params.cssMode && swiper.autoplay.running) run(); else if (false === autoplayResult) run();
                }), delay);
            }
            function start() {
                if ("undefined" !== typeof timeout) return false;
                if (swiper.autoplay.running) return false;
                swiper.autoplay.running = true;
                emit("autoplayStart");
                run();
                return true;
            }
            function stop() {
                if (!swiper.autoplay.running) return false;
                if ("undefined" === typeof timeout) return false;
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = void 0;
                }
                swiper.autoplay.running = false;
                emit("autoplayStop");
                return true;
            }
            function pause(speed) {
                if (!swiper.autoplay.running) return;
                if (swiper.autoplay.paused) return;
                if (timeout) clearTimeout(timeout);
                swiper.autoplay.paused = true;
                if (0 === speed || !swiper.params.autoplay.waitForTransition) {
                    swiper.autoplay.paused = false;
                    run();
                } else [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
                }));
            }
            function onVisibilityChange() {
                const document = ssr_window_esm_getDocument();
                if ("hidden" === document.visibilityState && swiper.autoplay.running) pause();
                if ("visible" === document.visibilityState && swiper.autoplay.paused) {
                    run();
                    swiper.autoplay.paused = false;
                }
            }
            function onTransitionEnd(e) {
                if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
                if (e.target !== swiper.$wrapperEl[0]) return;
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
                swiper.autoplay.paused = false;
                if (!swiper.autoplay.running) stop(); else run();
            }
            function onMouseEnter() {
                if (swiper.params.autoplay.disableOnInteraction) stop(); else {
                    emit("autoplayPause");
                    pause();
                }
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
            }
            function onMouseLeave() {
                if (swiper.params.autoplay.disableOnInteraction) return;
                swiper.autoplay.paused = false;
                emit("autoplayResume");
                run();
            }
            function attachMouseEvents() {
                if (swiper.params.autoplay.pauseOnMouseEnter) {
                    swiper.$el.on("mouseenter", onMouseEnter);
                    swiper.$el.on("mouseleave", onMouseLeave);
                }
            }
            function detachMouseEvents() {
                swiper.$el.off("mouseenter", onMouseEnter);
                swiper.$el.off("mouseleave", onMouseLeave);
            }
            on("init", (() => {
                if (swiper.params.autoplay.enabled) {
                    start();
                    const document = ssr_window_esm_getDocument();
                    document.addEventListener("visibilitychange", onVisibilityChange);
                    attachMouseEvents();
                }
            }));
            on("beforeTransitionStart", ((_s, speed, internal) => {
                if (swiper.autoplay.running) if (internal || !swiper.params.autoplay.disableOnInteraction) swiper.autoplay.pause(speed); else stop();
            }));
            on("sliderFirstMove", (() => {
                if (swiper.autoplay.running) if (swiper.params.autoplay.disableOnInteraction) stop(); else pause();
            }));
            on("touchEnd", (() => {
                if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) run();
            }));
            on("destroy", (() => {
                detachMouseEvents();
                if (swiper.autoplay.running) stop();
                const document = ssr_window_esm_getDocument();
                document.removeEventListener("visibilitychange", onVisibilityChange);
            }));
            Object.assign(swiper.autoplay, {
                pause,
                run,
                start,
                stop
            });
        }
        function Grid(_ref) {
            let {swiper, extendParams} = _ref;
            extendParams({
                grid: {
                    rows: 1,
                    fill: "column"
                }
            });
            let slidesNumberEvenToRows;
            let slidesPerRow;
            let numFullColumns;
            const initSlides = slidesLength => {
                const {slidesPerView} = swiper.params;
                const {rows, fill} = swiper.params.grid;
                slidesPerRow = slidesNumberEvenToRows / rows;
                numFullColumns = Math.floor(slidesLength / rows);
                if (Math.floor(slidesLength / rows) === slidesLength / rows) slidesNumberEvenToRows = slidesLength; else slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
                if ("auto" !== slidesPerView && "row" === fill) slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
            };
            const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
                const {slidesPerGroup, spaceBetween} = swiper.params;
                const {rows, fill} = swiper.params.grid;
                let newSlideOrderIndex;
                let column;
                let row;
                if ("row" === fill && slidesPerGroup > 1) {
                    const groupIndex = Math.floor(i / (slidesPerGroup * rows));
                    const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
                    const columnsInGroup = 0 === groupIndex ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
                    row = Math.floor(slideIndexInGroup / columnsInGroup);
                    column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
                    newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
                    slide.css({
                        "-webkit-order": newSlideOrderIndex,
                        order: newSlideOrderIndex
                    });
                } else if ("column" === fill) {
                    column = Math.floor(i / rows);
                    row = i - column * rows;
                    if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
                        row += 1;
                        if (row >= rows) {
                            row = 0;
                            column += 1;
                        }
                    }
                } else {
                    row = Math.floor(i / slidesPerRow);
                    column = i - row * slidesPerRow;
                }
                slide.css(getDirectionLabel("margin-top"), 0 !== row ? spaceBetween && `${spaceBetween}px` : "");
            };
            const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
                const {spaceBetween, centeredSlides, roundLengths} = swiper.params;
                const {rows} = swiper.params.grid;
                swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
                swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
                swiper.$wrapperEl.css({
                    [getDirectionLabel("width")]: `${swiper.virtualSize + spaceBetween}px`
                });
                if (centeredSlides) {
                    snapGrid.splice(0, snapGrid.length);
                    const newSlidesGrid = [];
                    for (let i = 0; i < snapGrid.length; i += 1) {
                        let slidesGridItem = snapGrid[i];
                        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
                    }
                    snapGrid.push(...newSlidesGrid);
                }
            };
            swiper.grid = {
                initSlides,
                updateSlide,
                updateWrapperSize
            };
        }
        function effect_init_effectInit(params) {
            const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective} = params;
            on("beforeInit", (() => {
                if (swiper.params.effect !== effect) return;
                swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
                if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
                const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
                Object.assign(swiper.params, overwriteParamsResult);
                Object.assign(swiper.originalParams, overwriteParamsResult);
            }));
            on("setTranslate", (() => {
                if (swiper.params.effect !== effect) return;
                setTranslate();
            }));
            on("setTransition", ((_s, duration) => {
                if (swiper.params.effect !== effect) return;
                setTransition(duration);
            }));
            let requireUpdateOnVirtual;
            on("virtualUpdate", (() => {
                if (!swiper.slides.length) requireUpdateOnVirtual = true;
                requestAnimationFrame((() => {
                    if (requireUpdateOnVirtual && swiper.slides.length) {
                        setTranslate();
                        requireUpdateOnVirtual = false;
                    }
                }));
            }));
        }
        function effect_target_effectTarget(effectParams, $slideEl) {
            if (effectParams.transformEl) return $slideEl.find(effectParams.transformEl).css({
                "backface-visibility": "hidden",
                "-webkit-backface-visibility": "hidden"
            });
            return $slideEl;
        }
        function effect_virtual_transition_end_effectVirtualTransitionEnd(_ref) {
            let {swiper, duration, transformEl, allSlides} = _ref;
            const {slides, activeIndex, $wrapperEl} = swiper;
            if (swiper.params.virtualTranslate && 0 !== duration) {
                let eventTriggered = false;
                let $transitionEndTarget;
                if (allSlides) $transitionEndTarget = transformEl ? slides.find(transformEl) : slides; else $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
                $transitionEndTarget.transitionEnd((() => {
                    if (eventTriggered) return;
                    if (!swiper || swiper.destroyed) return;
                    eventTriggered = true;
                    swiper.animating = false;
                    const triggerEvents = [ "webkitTransitionEnd", "transitionend" ];
                    for (let i = 0; i < triggerEvents.length; i += 1) $wrapperEl.trigger(triggerEvents[i]);
                }));
            }
        }
        function EffectFade(_ref) {
            let {swiper, extendParams, on} = _ref;
            extendParams({
                fadeEffect: {
                    crossFade: false,
                    transformEl: null
                }
            });
            const setTranslate = () => {
                const {slides} = swiper;
                const params = swiper.params.fadeEffect;
                for (let i = 0; i < slides.length; i += 1) {
                    const $slideEl = swiper.slides.eq(i);
                    const offset = $slideEl[0].swiperSlideOffset;
                    let tx = -offset;
                    if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                    let ty = 0;
                    if (!swiper.isHorizontal()) {
                        ty = tx;
                        tx = 0;
                    }
                    const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                    const $targetEl = effect_target_effectTarget(params, $slideEl);
                    $targetEl.css({
                        opacity: slideOpacity
                    }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
                }
            };
            const setTransition = duration => {
                const {transformEl} = swiper.params.fadeEffect;
                const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
                $transitionElements.transition(duration);
                effect_virtual_transition_end_effectVirtualTransitionEnd({
                    swiper,
                    duration,
                    transformEl,
                    allSlides: true
                });
            };
            effect_init_effectInit({
                effect: "fade",
                swiper,
                on,
                setTranslate,
                setTransition,
                overwriteParams: () => ({
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: !swiper.params.cssMode
                })
            });
        }
        function EffectCube(_ref) {
            let {swiper, extendParams, on} = _ref;
            extendParams({
                cubeEffect: {
                    slideShadows: true,
                    shadow: true,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            });
            const setTranslate = () => {
                const {$el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize, browser} = swiper;
                const params = swiper.params.cubeEffect;
                const isHorizontal = swiper.isHorizontal();
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                let wrapperRotate = 0;
                let $cubeShadowEl;
                if (params.shadow) if (isHorizontal) {
                    $cubeShadowEl = $wrapperEl.find(".swiper-cube-shadow");
                    if (0 === $cubeShadowEl.length) {
                        $cubeShadowEl = dom('<div class="swiper-cube-shadow"></div>');
                        $wrapperEl.append($cubeShadowEl);
                    }
                    $cubeShadowEl.css({
                        height: `${swiperWidth}px`
                    });
                } else {
                    $cubeShadowEl = $el.find(".swiper-cube-shadow");
                    if (0 === $cubeShadowEl.length) {
                        $cubeShadowEl = dom('<div class="swiper-cube-shadow"></div>');
                        $el.append($cubeShadowEl);
                    }
                }
                for (let i = 0; i < slides.length; i += 1) {
                    const $slideEl = slides.eq(i);
                    let slideIndex = i;
                    if (isVirtual) slideIndex = parseInt($slideEl.attr("data-swiper-slide-index"), 10);
                    let slideAngle = 90 * slideIndex;
                    let round = Math.floor(slideAngle / 360);
                    if (rtl) {
                        slideAngle = -slideAngle;
                        round = Math.floor(-slideAngle / 360);
                    }
                    const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                    let tx = 0;
                    let ty = 0;
                    let tz = 0;
                    if (slideIndex % 4 === 0) {
                        tx = 4 * -round * swiperSize;
                        tz = 0;
                    } else if ((slideIndex - 1) % 4 === 0) {
                        tx = 0;
                        tz = 4 * -round * swiperSize;
                    } else if ((slideIndex - 2) % 4 === 0) {
                        tx = swiperSize + 4 * round * swiperSize;
                        tz = swiperSize;
                    } else if ((slideIndex - 3) % 4 === 0) {
                        tx = -swiperSize;
                        tz = 3 * swiperSize + 4 * swiperSize * round;
                    }
                    if (rtl) tx = -tx;
                    if (!isHorizontal) {
                        ty = tx;
                        tx = 0;
                    }
                    const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
                    if (progress <= 1 && progress > -1) {
                        wrapperRotate = 90 * slideIndex + 90 * progress;
                        if (rtl) wrapperRotate = 90 * -slideIndex - 90 * progress;
                    }
                    $slideEl.transform(transform);
                    if (params.slideShadows) {
                        let shadowBefore = isHorizontal ? $slideEl.find(".swiper-slide-shadow-left") : $slideEl.find(".swiper-slide-shadow-top");
                        let shadowAfter = isHorizontal ? $slideEl.find(".swiper-slide-shadow-right") : $slideEl.find(".swiper-slide-shadow-bottom");
                        if (0 === shadowBefore.length) {
                            shadowBefore = dom(`<div class="swiper-slide-shadow-${isHorizontal ? "left" : "top"}"></div>`);
                            $slideEl.append(shadowBefore);
                        }
                        if (0 === shadowAfter.length) {
                            shadowAfter = dom(`<div class="swiper-slide-shadow-${isHorizontal ? "right" : "bottom"}"></div>`);
                            $slideEl.append(shadowAfter);
                        }
                        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                    }
                }
                $wrapperEl.css({
                    "-webkit-transform-origin": `50% 50% -${swiperSize / 2}px`,
                    "transform-origin": `50% 50% -${swiperSize / 2}px`
                });
                if (params.shadow) if (isHorizontal) $cubeShadowEl.transform(`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`); else {
                    const shadowAngle = Math.abs(wrapperRotate) - 90 * Math.floor(Math.abs(wrapperRotate) / 90);
                    const multiplier = 1.5 - (Math.sin(2 * shadowAngle * Math.PI / 360) / 2 + Math.cos(2 * shadowAngle * Math.PI / 360) / 2);
                    const scale1 = params.shadowScale;
                    const scale2 = params.shadowScale / multiplier;
                    const offset = params.shadowOffset;
                    $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
                }
                const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
                $wrapperEl.transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
            };
            const setTransition = duration => {
                const {$el, slides} = swiper;
                slides.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration);
                if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) $el.find(".swiper-cube-shadow").transition(duration);
            };
            effect_init_effectInit({
                effect: "cube",
                swiper,
                on,
                setTranslate,
                setTransition,
                perspective: () => true,
                overwriteParams: () => ({
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    resistanceRatio: 0,
                    spaceBetween: 0,
                    centeredSlides: false,
                    virtualTranslate: true
                })
            });
        }
        function create_shadow_createShadow(params, $slideEl, side) {
            const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}`;
            const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
            let $shadowEl = $shadowContainer.children(`.${shadowClass}`);
            if (!$shadowEl.length) {
                $shadowEl = dom(`<div class="swiper-slide-shadow${side ? `-${side}` : ""}"></div>`);
                $shadowContainer.append($shadowEl);
            }
            return $shadowEl;
        }
        function EffectFlip(_ref) {
            let {swiper, extendParams, on} = _ref;
            extendParams({
                flipEffect: {
                    slideShadows: true,
                    limitRotation: true,
                    transformEl: null
                }
            });
            const setTranslate = () => {
                const {slides, rtlTranslate: rtl} = swiper;
                const params = swiper.params.flipEffect;
                for (let i = 0; i < slides.length; i += 1) {
                    const $slideEl = slides.eq(i);
                    let progress = $slideEl[0].progress;
                    if (swiper.params.flipEffect.limitRotation) progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                    const offset = $slideEl[0].swiperSlideOffset;
                    const rotate = -180 * progress;
                    let rotateY = rotate;
                    let rotateX = 0;
                    let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
                    let ty = 0;
                    if (!swiper.isHorizontal()) {
                        ty = tx;
                        tx = 0;
                        rotateX = -rotateY;
                        rotateY = 0;
                    } else if (rtl) rotateY = -rotateY;
                    $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
                    if (params.slideShadows) {
                        let shadowBefore = swiper.isHorizontal() ? $slideEl.find(".swiper-slide-shadow-left") : $slideEl.find(".swiper-slide-shadow-top");
                        let shadowAfter = swiper.isHorizontal() ? $slideEl.find(".swiper-slide-shadow-right") : $slideEl.find(".swiper-slide-shadow-bottom");
                        if (0 === shadowBefore.length) shadowBefore = create_shadow_createShadow(params, $slideEl, swiper.isHorizontal() ? "left" : "top");
                        if (0 === shadowAfter.length) shadowAfter = create_shadow_createShadow(params, $slideEl, swiper.isHorizontal() ? "right" : "bottom");
                        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                    }
                    const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    const $targetEl = effect_target_effectTarget(params, $slideEl);
                    $targetEl.transform(transform);
                }
            };
            const setTransition = duration => {
                const {transformEl} = swiper.params.flipEffect;
                const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
                $transitionElements.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration);
                effect_virtual_transition_end_effectVirtualTransitionEnd({
                    swiper,
                    duration,
                    transformEl
                });
            };
            effect_init_effectInit({
                effect: "flip",
                swiper,
                on,
                setTranslate,
                setTransition,
                perspective: () => true,
                overwriteParams: () => ({
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: !swiper.params.cssMode
                })
            });
        }
        function EffectCoverflow(_ref) {
            let {swiper, extendParams, on} = _ref;
            extendParams({
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    scale: 1,
                    modifier: 1,
                    slideShadows: true,
                    transformEl: null
                }
            });
            const setTranslate = () => {
                const {width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid} = swiper;
                const params = swiper.params.coverflowEffect;
                const isHorizontal = swiper.isHorizontal();
                const transform = swiper.translate;
                const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
                const rotate = isHorizontal ? params.rotate : -params.rotate;
                const translate = params.depth;
                for (let i = 0, length = slides.length; i < length; i += 1) {
                    const $slideEl = slides.eq(i);
                    const slideSize = slidesSizesGrid[i];
                    const slideOffset = $slideEl[0].swiperSlideOffset;
                    const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
                    const offsetMultiplier = "function" === typeof params.modifier ? params.modifier(centerOffset) : centerOffset * params.modifier;
                    let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
                    let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
                    let translateZ = -translate * Math.abs(offsetMultiplier);
                    let stretch = params.stretch;
                    if ("string" === typeof stretch && -1 !== stretch.indexOf("%")) stretch = parseFloat(params.stretch) / 100 * slideSize;
                    let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
                    let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
                    let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
                    if (Math.abs(translateX) < .001) translateX = 0;
                    if (Math.abs(translateY) < .001) translateY = 0;
                    if (Math.abs(translateZ) < .001) translateZ = 0;
                    if (Math.abs(rotateY) < .001) rotateY = 0;
                    if (Math.abs(rotateX) < .001) rotateX = 0;
                    if (Math.abs(scale) < .001) scale = 0;
                    const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
                    const $targetEl = effect_target_effectTarget(params, $slideEl);
                    $targetEl.transform(slideTransform);
                    $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                    if (params.slideShadows) {
                        let $shadowBeforeEl = isHorizontal ? $slideEl.find(".swiper-slide-shadow-left") : $slideEl.find(".swiper-slide-shadow-top");
                        let $shadowAfterEl = isHorizontal ? $slideEl.find(".swiper-slide-shadow-right") : $slideEl.find(".swiper-slide-shadow-bottom");
                        if (0 === $shadowBeforeEl.length) $shadowBeforeEl = create_shadow_createShadow(params, $slideEl, isHorizontal ? "left" : "top");
                        if (0 === $shadowAfterEl.length) $shadowAfterEl = create_shadow_createShadow(params, $slideEl, isHorizontal ? "right" : "bottom");
                        if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                        if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                    }
                }
            };
            const setTransition = duration => {
                const {transformEl} = swiper.params.coverflowEffect;
                const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
                $transitionElements.transition(duration).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(duration);
            };
            effect_init_effectInit({
                effect: "coverflow",
                swiper,
                on,
                setTranslate,
                setTransition,
                perspective: () => true,
                overwriteParams: () => ({
                    watchSlidesProgress: true
                })
            });
        }
        function initSliders() {
            if (document.querySelector(".top__slider")) new core(".top__slider", {
                modules: [ Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, Autoplay, EffectFade, EffectFlip, EffectCube, EffectCoverflow, Grid ],
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                initialSlide: 0,
                centeredSlides: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 0,
                autoHeight: false,
                speed: 300,
                simulateTouch: true,
                loop: false,
                slideToClickedSlide: true,
                preloadImages: false,
                lazy: false,
                watchOverflow: true,
                navigation: {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                    pageUpDown: true
                }
            });
            if (document.querySelector(".reviews__slider")) new core(".reviews__slider", {
                modules: [ Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, Autoplay, EffectFade, EffectFlip, EffectCube, EffectCoverflow, Grid ],
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                initialSlide: 1,
                centeredSlides: true,
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 20,
                autoHeight: false,
                speed: 300,
                simulateTouch: false,
                loop: false,
                slideToClickedSlide: true,
                preloadImages: false,
                lazy: false,
                watchOverflow: true,
                navigation: {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                    pageUpDown: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        centeredSlides: true
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        centeredSlides: true
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        centeredSlides: true
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        centeredSlides: true
                    },
                    1268: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        centeredSlides: true
                    }
                }
            });
            if (document.querySelector(".certificate__slider")) new core(".certificate__slider", {
                modules: [ Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, Autoplay, EffectFade, EffectFlip, EffectCube, EffectCoverflow, Grid ],
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                centeredSlides: false,
                slidesPerView: "auto",
                slidesPerGroup: 1,
                spaceBetween: 20,
                autoHeight: false,
                speed: 300,
                simulateTouch: false,
                loop: false,
                slideToClickedSlide: true,
                preloadImages: false,
                lazy: false,
                watchOverflow: true,
                navigation: {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                    pageUpDown: true
                }
            });
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        let addWindowScrollEvent = false;
        function pageNavigation() {
            document.addEventListener("click", pageNavigationAction);
            document.addEventListener("watcherCallback", pageNavigationAction);
            function pageNavigationAction(e) {
                if ("click" === e.type) {
                    const targetElement = e.target;
                    if (targetElement.closest("[data-goto]")) {
                        const gotoLink = targetElement.closest("[data-goto]");
                        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                        const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                        gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                        e.preventDefault();
                    }
                } else if ("watcherCallback" === e.type && e.detail) {
                    const entry = e.detail.entry;
                    const targetElement = entry.target;
                    if ("navigator" === targetElement.dataset.watch) {
                        document.querySelector(`[data-goto]._navigator-active`);
                        let navigatorCurrentItem;
                        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                            const element = targetElement.classList[index];
                            if (document.querySelector(`[data-goto=".${element}"]`)) {
                                navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                                break;
                            }
                        }
                        if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                    }
                }
            }
            if (getHash()) {
                let goToHash;
                if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
                goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
            }
        }
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            if (header) {
                const headerShow = header.hasAttribute("data-scroll-show");
                const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
                const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
                let scrollDirection = 0;
                let timer;
                document.addEventListener("windowScroll", (function(e) {
                    const scrollTop = window.scrollY;
                    clearTimeout(timer);
                    if (scrollTop >= startPoint) {
                        !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                        if (headerShow) {
                            if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                            timer = setTimeout((() => {
                                !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                            }), headerShowTimer);
                        }
                    } else {
                        header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                        if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                    }
                    scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
                }));
            }
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = оbjects.length - 1; i >= 0; i--) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if ("first" === place) {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
        if (isMobile.any()) {
            document.body.classList.add("_touch");
            let menuArrows = document.querySelectorAll(".menu__arrow");
            if (menuArrows.length > 0) {
                function containArrow() {
                    menuArrows.forEach((e => {
                        if (e.classList.contains("active") && e.parentElement.classList.contains("active")) {
                            e.classList.remove("active");
                            e.parentElement.classList.remove("active");
                        }
                    }));
                }
                for (let index = 0; index < menuArrows.length; index++) {
                    const menuArrow = menuArrows[index];
                    menuArrow.addEventListener("click", (function() {
                        if (menuArrow.classList.contains("active")) {
                            menuArrow.classList.remove("active");
                            menuArrow.parentElement.classList.remove("active");
                        } else {
                            containArrow();
                            menuArrow.classList.toggle("active");
                            menuArrow.parentElement.classList.toggle("active");
                        }
                    }));
                }
            }
        } else document.body.classList.add("_pc");
        let subLists = document.querySelectorAll(".menu__sub-list");
        window.addEventListener("DOMContentLoaded", (function() {
            RemSubmenu();
        }));
        function RemSubmenu() {
            if (subLists) subLists.forEach((subList => {
                if (0 === subList.textContent.length) {
                    let targetArrow = subList.parentNode.querySelector(".menu__arrow");
                    subList.remove();
                    targetArrow.remove();
                }
            }));
        }
        if (subLists) subLists.forEach((subList => {
            subList.addEventListener("click", (function() {
                function menuClose() {
                    document.documentElement.classList.remove("menu-open");
                    document.documentElement.classList.remove("lock");
                }
                menuClose();
            }));
        }));
        let Photos = document.querySelectorAll(".photo img");
        Photos.forEach((Photo => {
            if (!Photo.src.includes(".png")) Photo.parentNode.remove();
            if (Photo.src.includes(".png")) {
                let noPhoto = Photo.parentNode.parentNode.querySelector(".nophoto");
                noPhoto.remove();
            }
        }));
        let cities = document.querySelectorAll(".city_li");
        let inputTopCity = document.querySelector("#cityTopInput");
        document.querySelectorAll("#cityInput");
        let inputPhones = document.querySelectorAll("#phoneInput");
        let spanPhones = document.querySelectorAll("#phoneSpan");
        let spanCities = document.querySelectorAll("#citySpan");
        let spanLocations = document.querySelectorAll("#locationSpan");
        let spanPayTitles = document.querySelectorAll("#paytitle");
        let spanPayInns = document.querySelectorAll("#payinn");
        let spanPayBiks = document.querySelectorAll("#paybik");
        let spanPayRschets = document.querySelectorAll("#payrschet");
        function sendTopValue(citychange) {
            if (citychange) inputTopCity.value = citychange.id;
        }
        function readLocation() {
            let currentURL = document.location.search;
            let parramsCurrentURL = new URLSearchParams(currentURL);
            let cityHash = parramsCurrentURL.get("citychange");
            cities.forEach((city => {
                if (city.id === cityHash) inputTopCity.value = city.id;
            }));
        }
        function sendValues2() {
            let inputTopCity = document.querySelector("#cityTopInput");
            cities.forEach((city => {
                if (city.id === inputTopCity.value) {
                    inputPhones.forEach((inputPhone => {
                        if (city) {
                            inputPhone.value = city.dataset.phonemax;
                            inputPhone.parentNode.href = "tel:" + city.dataset.phonemin;
                        }
                    }));
                    spanPhones.forEach((spanPhone => {
                        if (city) {
                            spanPhone.innerHTML = city.dataset.phonemax;
                            spanPhone.parentNode.href = "tel:" + city.dataset.phonemin;
                        }
                    }));
                    spanCities.forEach((spanCity => {
                        if (city) spanCity.innerHTML = city.id;
                    }));
                    spanLocations.forEach((spanLocation => {
                        if (city) spanLocation.innerHTML = city.dataset.location;
                    }));
                    spanPayTitles.forEach((spanPayTitle => {
                        if (city) spanPayTitle.innerHTML = city.dataset.paytitle;
                    }));
                    spanPayInns.forEach((spanPayInn => {
                        if (city) spanPayInn.innerHTML = city.dataset.payinn;
                    }));
                    spanPayBiks.forEach((spanPayBik => {
                        if (city) spanPayBik.innerHTML = city.dataset.paybik;
                    }));
                    spanPayRschets.forEach((spanPayRschet => {
                        if (city) spanPayRschet.innerHTML = city.dataset.payrschet;
                    }));
                }
            }));
        }
        function sendInHref(city) {
            let allLinks = document.querySelectorAll(".menu__link");
            if (allLinks) for (let index = 0; index < allLinks.length; index++) {
                const element = allLinks[index];
                let oldHref = element.href;
                let hashHref = `?citychange=`;
                let hashHrefId = ``;
                function setAtr() {
                    hashHrefId = `${city.id}`;
                    element.href = oldHref;
                    let checked = element.href.includes("?citychange=");
                    if (!checked) element.href = oldHref + hashHref + hashHrefId;
                    if (checked) {
                        oldHref = oldHref.split(`?`)[0];
                        element.href = oldHref + hashHref + hashHrefId;
                    }
                }
                setAtr();
            }
            let allLinksOthers = document.querySelectorAll(".gopage");
            if (allLinksOthers) for (let index = 0; index < allLinksOthers.length; index++) {
                const element = allLinksOthers[index];
                let oldHref = element.href;
                let hashHref = `?citychange=`;
                let hashHrefId = ``;
                function setAtr() {
                    hashHrefId = `${city.id}`;
                    element.href = oldHref;
                    let checked = element.href.includes("?citychange=");
                    if (!checked) element.href = oldHref + hashHref + hashHrefId;
                    if (checked) {
                        oldHref = oldHref.split(`?`)[0];
                        element.href = oldHref + hashHref + hashHrefId;
                    }
                }
                setAtr();
            }
            let allSubLinks = document.querySelectorAll(".menu__sub-link");
            if (allSubLinks) for (let index = 0; index < allSubLinks.length; index++) {
                const element = allSubLinks[index];
                let oldHref = element.href;
                let hashHref = `?citychange=`;
                let hashHrefId = ``;
                var str = oldHref;
                var re = /#...../i;
                str.match(re);
                let indexHash = oldHref.indexOf("#");
                let endIndexHash = oldHref.indexOf("#") + 6;
                let hashValue = oldHref.slice(indexHash, endIndexHash);
                let newOldhref = oldHref.split(`#`)[0];
                function setAtr() {
                    hashHrefId = `${city.id}`;
                    element.href = newOldhref;
                    let checked = element.href.includes("?citychange=");
                    if (!checked) element.href = newOldhref + hashHref + hashHrefId;
                    if (checked) {
                        newOldhref = newOldhref.split(`?`)[0];
                        element.href = newOldhref + hashHref + hashHrefId;
                    }
                }
                setAtr();
                element.href = element.href + hashValue;
            }
        }
        if (cities) cities.forEach((city => {
            let deafultCity = city.hasAttribute("data-default");
            if (deafultCity) {
                sendTopValue(city);
                sendValues2();
            }
            city.addEventListener("click", (function() {
                sendTopValue(city);
                sendValues2();
                flsModules.popup.close("#city");
                sendInHref(city);
            }));
        }));
        let menuItemCity = document.querySelector(".menu__item_city");
        if (menuItemCity) menuItemCity.addEventListener("click", (function(e) {
            e.preventDefault();
            menuItemCity.parentNode.classList.toggle("active");
            let citiesSublis = document.querySelectorAll(".city_subli");
            citiesSublis.forEach((citySubli => {
                citySubli.addEventListener("click", (function() {
                    for (let index = 0; index < cities.length; index++) {
                        const city = cities[index];
                        if (citySubli.innerHTML == city.id) {
                            sendTopValue(city);
                            sendValues2();
                            sendInHref(city);
                        }
                    }
                    menuItemCity.parentNode.classList.remove("active");
                }));
            }));
        }));
        let mainIndex = document.querySelector(".main_index");
        let mainContacts = document.querySelector(".main_contacts");
        let mainLoan = document.querySelector(".main_loan");
        let mainNomoney = document.querySelector(".main_nomoney");
        let mainAbout = document.querySelector(".main_about");
        let mainDocuments = document.querySelector(".main_documents");
        if (mainIndex) {
            if (!window.location.href.includes("?citychange=")) flsModules.popup.open("#city");
            readLocation();
            sendValues2();
            cities.forEach((city => {
                if (city.id === inputTopCity.value) sendInHref(city);
            }));
        }
        if (mainContacts) {
            readLocation();
            sendValues2();
            cities.forEach((city => {
                if (city.id === inputTopCity.value) sendInHref(city);
            }));
            let mabBlock = document.querySelector(".map_block");
            mabBlock.style.display = "none";
            let mainContacts = document.querySelector(".main__container");
            mainContacts.innerHTML = `<div class="map_block">${mabBlock.innerHTML}</div>` + mainContacts.innerHTML;
            let branchs = document.querySelectorAll(".branch");
            branchs.forEach((branch => {
                if (branch.querySelector(".branch_name").textContent === inputTopCity.value) branch.classList.add("active");
            }));
        }
        if (mainLoan) {
            readLocation();
            sendValues2();
            cities.forEach((city => {
                if (city.id === inputTopCity.value) sendInHref(city);
            }));
        }
        if (mainNomoney) {
            readLocation();
            sendValues2();
            cities.forEach((city => {
                if (city.id === inputTopCity.value) sendInHref(city);
            }));
        }
        if (mainAbout) {
            readLocation();
            sendValues2();
            cities.forEach((city => {
                if (city.id === inputTopCity.value) sendInHref(city);
            }));
        }
        if (mainDocuments) {
            readLocation();
            sendValues2();
            cities.forEach((city => {
                if (city.id === inputTopCity.value) sendInHref(city);
            }));
        }
        window.addEventListener("DOMContentLoaded", (function() {
            let boxVideos = document.querySelectorAll(".review_video");
            if (boxVideos) boxVideos.forEach((boxVideo => {
                if (boxVideo.dataset.src.length > 1) {
                    let neighbourVideo = boxVideo.parentNode.querySelector(".review_text");
                    neighbourVideo.remove();
                }
                if (boxVideo.dataset.src.length <= 1) boxVideo.remove();
            }));
            let nameReviews = document.querySelectorAll(".author_name");
            nameReviews.forEach((nameReview => {
                if (nameReview.innerText.length < 1) nameReview.parentNode.parentNode.remove();
            }));
            let videos = document.querySelectorAll(".video");
            if (videos) videos.forEach((video => {
                video.addEventListener("click", (function() {
                    if (video.classList.contains("ready")) return; else {
                        let src = video.dataset.src;
                        video.classList.add("ready");
                        video.innerHTML = "";
                        video.insertAdjacentHTML("afterbegin", `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/` + src + `?autoplay=1;&playlist=` + src + `" title="YouTube video player" frameborder="0"\n\t\t\t\t\tallow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n\t\t\t\t\tallowfullscreen>\n\t\t\t\t</iframe>`);
                    }
                }));
            }));
        }));
        let aboutUsLisParent = document.querySelector(".aboutus_blocks");
        if (aboutUsLisParent) {
            let aboutUsLis = aboutUsLisParent.querySelectorAll(".aboutus_block");
            for (let index = 0; index < aboutUsLis.length; index++) {
                const aboutUsLi = aboutUsLis[index];
                let spanLi = aboutUsLi.querySelector(".quantityli");
                if (index < 9) spanLi.innerHTML = `0${[ index + 1 ]}`;
                if (index >= 9) spanLi.innerHTML = `${[ index + 1 ]}`;
            }
        }
        const loansTabsBody = document.querySelectorAll(".loans-tabs__body");
        const loansTabsTitle = document.querySelectorAll(".loans-tabs__title");
        if (loansTabsTitle) {
            loansTabsTitle.forEach(((TabsTitle, index) => {
                let TabsTitleText = TabsTitle.textContent;
                Array.from(loansTabsBody[index].querySelectorAll(".side-block__span")).slice(0, -1).forEach((span => span.textContent = TabsTitleText));
            }));
            const sideBlockInfo = document.querySelectorAll(".side-block__info");
            sideBlockInfo.forEach((block => {
                let sideBlockTagging = block.querySelector(".side-block__tagging");
                if ("" == sideBlockTagging.textContent) sideBlockTagging.remove();
            }));
        }
        let questionsBtn = document.querySelector(".questions_btn");
        if (questionsBtn) questionsBtn.addEventListener("click", (function(e) {
            questionsBtn.classList.toggle("active");
            questionsBtn.parentNode.classList.toggle("active");
        }));
        let spollersTitles = document.querySelectorAll(".spollers__title");
        if (spollersTitles) spollersTitles.forEach((spollersTitle => {
            spollersTitle.addEventListener("click", (function() {
                let questionsShowmore = spollersTitle.parentNode.parentNode.parentNode.parentNode.parentNode;
                questionsShowmore.offsetHeight;
                let endHeight = 300 + 100;
                if (!spollersTitle.classList.contains("_spoller-active")) questionsShowmore.style.height = `${endHeight}px`;
                if (spollersTitle.classList.contains("_spoller-active")) questionsShowmore.style.height = `${endHeight - 100}px`;
            }));
        }));
        const Logos = document.querySelector(".menu__item_socials");
        Array.from(Logos.getElementsByTagName("a"));
        const menuBody = document.querySelector(".menu__body");
        const headerMenu = document.querySelector(".header__menu");
        document.querySelector(".menu-list");
        function checkScreen() {
            window.matchMedia(" (max-width: 640px)");
            const checkTablet = window.matchMedia(" (min-width: 640.1px) and (max-width: 960px)");
            const checkDesktop = window.matchMedia(" (min-width: 961px)");
            if (checkTablet.matches) menuBody.appendChild(Logos);
            if (checkDesktop.matches) headerMenu.appendChild(Logos);
            checkTablet.addListener((function(e) {
                if (e.matches) menuBody.appendChild(Logos);
            }));
            checkDesktop.addListener((function(e) {
                if (e.matches) {
                    console.log("checkDesktop");
                    headerMenu.appendChild(Logos);
                }
            }));
        }
        const formButton =document.querySelectorAll('.feedback-form__button');
        formButton.forEach(button =>{
        button.addEventListener( 'click', function() {
            let calculateForms = document.querySelectorAll('.page__feedback');
        if (calculateForms) {
            calculateForms.forEach(calcForm =>{
              let calcOption = calcForm.querySelector('.opt')
              let calcOptionId = calcForm.parentNode.id
              if (calcOptionId == 'privateId') {
                calcOption.value = "Частное лицо"
                calcOption.textContent = "Частное лицо"
              }
              if (calcOptionId == "businessId") {
                calcOption.value = "Юридическое лицо"
              }
            })
        }
        });
        })
        checkScreen();
        window["FLS"] = false;
        menuInit();
        menuClose();
        spollers();
        tabs();
        formFieldsInit({
            viewPass: true
        });
        formSubmit();
        pageNavigation();
        headerScroll();
    })();
})();