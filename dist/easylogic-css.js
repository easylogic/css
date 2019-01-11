(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EasyLogicCSS = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();











var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function debounce(callback, delay) {

    var t = undefined;

    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback.apply(undefined, args);
        }, delay || 300);
    };
}

function get(obj, key, callback) {

    var returnValue = defaultValue(obj[key], key);

    if (isFunction(callback)) {
        return callback(returnValue);
    }

    return returnValue;
}

function defaultValue(value, defaultValue) {
    return typeof value == 'undefined' ? defaultValue : value;
}

function isUndefined(value) {
    return typeof value == 'undefined' || value == null;
}

function isNotUndefined(value) {
    return isUndefined(value) === false;
}

function isArray(value) {
    return Array.isArray(value);
}

function isBoolean(value) {
    return typeof value == 'boolean';
}

function isString(value) {
    return typeof value == 'string';
}

function isNotString(value) {
    return isString(value) === false;
}

function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && !isArray(value) && value !== null;
}

function isFunction(value) {
    return typeof value == 'function';
}

function isNumber(value) {
    return typeof value == 'number';
}

function cleanObject(obj) {
    var realObject = {};
    Object.keys(obj).filter(function (key) {
        return !!obj[key];
    }).forEach(function (key) {
        realObject[key] = obj[key];
    });

    return realObject;
}

function combineKeyArray(obj) {
    Object.keys(obj).forEach(function (key) {
        if (Array.isArray(obj[key])) {
            obj[key] = obj[key].join(', ');
        }
    });

    return obj;
}

var func = {
    debounce: debounce
};

/**
 * @method format
 *
 * convert color to format string
 *
 *     // hex
 *     color.format({ r : 255, g : 255, b : 255 }, 'hex')  // #FFFFFF
 *
 *     // rgb
 *     color.format({ r : 255, g : 255, b : 255 }, 'rgb') // rgba(255, 255, 255, 0.5);
 *
 *     // rgba
 *     color.format({ r : 255, g : 255, b : 255, a : 0.5 }, 'rgb') // rgba(255, 255, 255, 0.5);
 *
 * @param {Object} obj  obj has r, g, b and a attributes
 * @param {"hex"/"rgb"} type  format string type
 * @returns {*}
 */
function format(obj, type) {
    var defaultColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgba(0, 0, 0, 0)';


    if (Array.isArray(obj)) {
        obj = { r: obj[0], g: obj[1], b: obj[2], a: obj[3] };
    }

    if (type == 'hex') {
        return hex(obj);
    } else if (type == 'rgb') {
        return rgb(obj, defaultColor);
    } else if (type == 'hsl') {
        return hsl(obj);
    }

    return obj;
}

function hex(obj) {
    if (Array.isArray(obj)) {
        obj = { r: obj[0], g: obj[1], b: obj[2], a: obj[3] };
    }

    var r = obj.r.toString(16);
    if (obj.r < 16) r = "0" + r;

    var g = obj.g.toString(16);
    if (obj.g < 16) g = "0" + g;

    var b = obj.b.toString(16);
    if (obj.b < 16) b = "0" + b;

    return '#' + r + g + b;
}

function rgb(obj) {
    var defaultColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgba(0, 0, 0, 0)';

    if (isArray(obj)) {
        obj = { r: obj[0], g: obj[1], b: obj[2], a: obj[3] };
    }

    if (isUndefined(obj)) {
        return undefined;
    }

    if (obj.a == 1 || isUndefined(obj.a)) {
        if (isNaN(obj.r)) {
            return defaultColor;
        }
        return 'rgb(' + obj.r + ',' + obj.g + ',' + obj.b + ')';
    } else {
        return 'rgba(' + obj.r + ',' + obj.g + ',' + obj.b + ',' + obj.a + ')';
    }
}

function hsl(obj) {
    if (isArray(obj)) {
        obj = { r: obj[0], g: obj[1], b: obj[2], a: obj[3] };
    }

    if (obj.a == 1 || isUndefined(obj.a)) {
        return 'hsl(' + obj.h + ',' + obj.s + '%,' + obj.l + '%)';
    } else {
        return 'hsla(' + obj.h + ',' + obj.s + '%,' + obj.l + '%,' + obj.a + ')';
    }
}

var formatter = {
    format: format,
    rgb: rgb,
    hsl: hsl,
    hex: hex
};

function round(n, k) {
    k = isUndefined(k) ? 1 : k;
    return Math.round(n * k) / k;
}

function degreeToRadian(degrees) {
    return degrees * Math.PI / 180;
}

/**
 * 
 * convert radian to degree 
 * 
 * @param {*} radian 
 * @returns {Number} 0..360
 */
function radianToDegree(radian) {
    var angle = radian * 180 / Math.PI;

    if (angle < 0) {
        // 각도가 0보다 작으면 360 에서 반전시킨다. 
        angle = 360 + angle;
    }

    return angle;
}

function getXInCircle(angle, radius) {
    var centerX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    return centerX + radius * Math.cos(degreeToRadian(angle));
}

function getYInCircle(angle, radius) {
    var centerY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    return centerY + radius * Math.sin(degreeToRadian(angle));
}

function getXYInCircle(angle, radius) {
    var centerX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var centerY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    return {
        x: getXInCircle(angle, radius, centerX),
        y: getYInCircle(angle, radius, centerY)
    };
}



function caculateAngle(rx, ry) {
    return radianToDegree(Math.atan2(ry, rx));
}

function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxx12-xx-34xx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
}

var bezierCalc = {
    B1: function B1(t) {
        return t * t * t;
    },
    B2: function B2(t) {
        return 3 * t * t * (1 - t);
    },
    B3: function B3(t) {
        return 3 * t * (1 - t) * (1 - t);
    },
    B4: function B4(t) {
        return (1 - t) * (1 - t) * (1 - t);
    }
};

function cubicBezier(x1, y1, x2, y2) {
    var C2 = { x: x1, y: y1 };
    var C3 = { x: x2, y: y2 };
    return function (progress) {
        // var x = C1.x * bezierCalc.B1(p) + C2.x*bezierCalc.B2(p) + C3.x*bezierCalc.B3(p) + C4.x*bezierCalc.B4(p);
        // var y = C1.y * bezierCalc.B1(progress) + C2.y*bezierCalc.B2(progress) + C3.y*bezierCalc.B3(progress) + C4.y*bezierCalc.B4(progress);

        var y = C2.y * bezierCalc.B2(progress) + C3.y * bezierCalc.B3(progress) + bezierCalc.B4(progress);

        return 1 - y;
    };
}

function getGradientLine(angle, box) {
    var length = Math.abs(box.width * Math.sin(angle)) + Math.abs(box.height * Math.cos(angle));
    var center = {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2
    };

    var yDiff = Math.sin(angle - Math.PI / 2) * length / 2;
    var xDiff = Math.cos(angle - Math.PI / 2) * length / 2;

    return {
        length: length,
        center: center,
        start: {
            x: center.x - xDiff,
            y: center.y - yDiff
        },
        end: {
            x: center.x + xDiff,
            y: center.y + yDiff
        }
    };
}

var math = {
    round: round,
    uuid: uuid,
    radianToDegree: radianToDegree,
    degreeToRadian: degreeToRadian,
    getXInCircle: getXInCircle,
    getYInCircle: getYInCircle,
    caculateAngle: caculateAngle,
    cubicBezier: cubicBezier,
    getGradientLine: getGradientLine
};

/**
 * @method RGBtoHSV
 *
 * convert rgb to hsv
 *
 * 		color.RGBtoHSV(0, 0, 255) === { h : 240, s : 1, v : 1 } === '#FFFF00'
 *
 * @param {Number} R  red color value
 * @param {Number} G  green color value
 * @param {Number} B  blue color value
 * @return {Object}  hsv color code
 */
function RGBtoHSV(r, g, b) {

    if (arguments.length == 1) {
        var _arguments$ = arguments[0],
            r = _arguments$.r,
            g = _arguments$.g,
            b = _arguments$.b;
    }

    var R1 = r / 255;
    var G1 = g / 255;
    var B1 = b / 255;

    var MaxC = Math.max(R1, G1, B1);
    var MinC = Math.min(R1, G1, B1);

    var DeltaC = MaxC - MinC;

    var H = 0;

    if (DeltaC == 0) {
        H = 0;
    } else if (MaxC == R1) {
        H = 60 * ((G1 - B1) / DeltaC % 6);
    } else if (MaxC == G1) {
        H = 60 * ((B1 - R1) / DeltaC + 2);
    } else if (MaxC == B1) {
        H = 60 * ((R1 - G1) / DeltaC + 4);
    }

    if (H < 0) {
        H = 360 + H;
    }

    var S = 0;

    if (MaxC == 0) S = 0;else S = DeltaC / MaxC;

    var V = MaxC;

    return { h: H, s: S, v: V };
}

function RGBtoCMYK(r, g, b) {

    if (arguments.length == 1) {
        var _arguments$2 = arguments[0],
            r = _arguments$2.r,
            g = _arguments$2.g,
            b = _arguments$2.b;
    }

    var R1 = r / 255;
    var G1 = g / 255;
    var B1 = b / 255;

    var K = 1 - Math.max(R1, G1, B1);
    var C = (1 - R1 - K) / (1 - K);
    var M = (1 - G1 - K) / (1 - K);
    var Y = (1 - B1 - K) / (1 - K);

    return { c: C, m: M, y: Y, k: K };
}

function RGBtoHSL(r, g, b) {

    if (arguments.length == 1) {
        var _arguments$3 = arguments[0],
            r = _arguments$3.r,
            g = _arguments$3.g,
            b = _arguments$3.b;
    }

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);break;
            case g:
                h = (b - r) / d + 2;break;
            case b:
                h = (r - g) / d + 4;break;
        }
        h /= 6;
    }

    return { h: round(h * 360), s: round(s * 100), l: round(l * 100) };
}

function c(r, g, b) {

    if (arguments.length == 1) {
        var _arguments$4 = arguments[0],
            r = _arguments$4.r,
            g = _arguments$4.g,
            b = _arguments$4.b;
    }
    return gray((r + g + b) / 3 > 90 ? 0 : 255);
}

function gray(gray) {
    return { r: gray, g: gray, b: gray };
}

function RGBtoSimpleGray(r, g, b) {

    if (arguments.length == 1) {
        var _arguments$5 = arguments[0],
            r = _arguments$5.r,
            g = _arguments$5.g,
            b = _arguments$5.b;
    }
    return gray(Math.ceil((r + g + b) / 3));
}

function RGBtoGray(r, g, b) {

    if (arguments.length == 1) {
        var _arguments$6 = arguments[0],
            r = _arguments$6.r,
            g = _arguments$6.g,
            b = _arguments$6.b;
    }
    return gray(RGBtoYCrCb(r, g, b).y);
}

function brightness(r, g, b) {
    return Math.ceil(r * 0.2126 + g * 0.7152 + b * 0.0722);
}

function RGBtoYCrCb(r, g, b) {

    if (arguments.length == 1) {
        var _arguments$7 = arguments[0],
            r = _arguments$7.r,
            g = _arguments$7.g,
            b = _arguments$7.b;
    }
    var Y = brightness(r, g, b);
    var Cb = 0.564 * (b - Y);
    var Cr = 0.713 * (r - Y);

    return { y: Y, cr: Cr, cb: Cb };
}

function PivotRGB(n) {
    return (n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92) * 100;
}

function RGBtoXYZ(r, g, b) {
    //sR, sG and sB (Standard RGB) input range = 0 ÷ 255
    //X, Y and Z output refer to a D65/2° standard illuminant.
    if (arguments.length == 1) {
        var _arguments$8 = arguments[0],
            r = _arguments$8.r,
            g = _arguments$8.g,
            b = _arguments$8.b;
    }

    var R = r / 255;
    var G = g / 255;
    var B = b / 255;

    R = PivotRGB(R);
    G = PivotRGB(G);
    B = PivotRGB(B);

    var x = R * 0.4124 + G * 0.3576 + B * 0.1805;
    var y = R * 0.2126 + G * 0.7152 + B * 0.0722;
    var z = R * 0.0193 + G * 0.1192 + B * 0.9505;

    return { x: x, y: y, z: z };
}

function RGBtoLAB(r, g, b) {
    if (arguments.length == 1) {
        var _arguments$9 = arguments[0],
            r = _arguments$9.r,
            g = _arguments$9.g,
            b = _arguments$9.b;
    }
    return XYZtoLAB(RGBtoXYZ(r, g, b));
}

var fromRGB = {
    RGBtoCMYK: RGBtoCMYK,
    RGBtoGray: RGBtoGray,
    RGBtoHSL: RGBtoHSL,
    RGBtoHSV: RGBtoHSV,
    RGBtoLAB: RGBtoLAB,
    RGBtoSimpleGray: RGBtoSimpleGray,
    RGBtoXYZ: RGBtoXYZ,
    RGBtoYCrCb: RGBtoYCrCb,
    c: c,
    brightness: brightness,
    gray: gray
};

function CMYKtoRGB(c, m, y, k) {

    if (arguments.length == 1) {
        var _arguments$ = arguments[0],
            c = _arguments$.c,
            m = _arguments$.m,
            y = _arguments$.y,
            k = _arguments$.k;
    }

    var R = 255 * (1 - c) * (1 - k);
    var G = 255 * (1 - m) * (1 - k);
    var B = 255 * (1 - y) * (1 - k);

    return { r: R, g: G, b: B };
}

var fromCMYK = {
    CMYKtoRGB: CMYKtoRGB
};

function ReverseXyz(n) {
    return Math.pow(n, 3) > 0.008856 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787;
}

function ReverseRGB(n) {
    return n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : 12.92 * n;
}

function XYZtoRGB(x, y, z) {
    if (arguments.length == 1) {
        var _arguments$ = arguments[0],
            x = _arguments$.x,
            y = _arguments$.y,
            z = _arguments$.z;
    }
    //X, Y and Z input refer to a D65/2° standard illuminant.
    //sR, sG and sB (standard RGB) output range = 0 ÷ 255

    var X = x / 100.0;
    var Y = y / 100.0;
    var Z = z / 100.0;

    var R = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    var G = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    var B = X * 0.0557 + Y * -0.2040 + Z * 1.0570;

    R = ReverseRGB(R);
    G = ReverseRGB(G);
    B = ReverseRGB(B);

    var r = round(R * 255);
    var g = round(G * 255);
    var b = round(B * 255);

    return { r: r, g: g, b: b };
}

function LABtoXYZ(l, a, b) {
    if (arguments.length == 1) {
        var _arguments$2 = arguments[0],
            l = _arguments$2.l,
            a = _arguments$2.a,
            b = _arguments$2.b;
    }
    //Reference-X, Y and Z refer to specific illuminants and observers.
    //Common reference values are available below in this same page.

    var Y = (l + 16) / 116;
    var X = a / 500 + Y;
    var Z = Y - b / 200;

    Y = ReverseXyz(Y);
    X = ReverseXyz(X);
    Z = ReverseXyz(Z);

    var x = X * 95.047;
    var y = Y * 100.000;
    var z = Z * 108.883;

    return { x: x, y: y, z: z };
}





function LABtoRGB(l, a, b) {
    if (arguments.length == 1) {
        var _arguments$4 = arguments[0],
            l = _arguments$4.l,
            a = _arguments$4.a,
            b = _arguments$4.b;
    }
    return XYZtoRGB(LABtoXYZ(l, a, b));
}

var fromLAB = {
    XYZtoRGB: XYZtoRGB,
    LABtoRGB: LABtoRGB,
    LABtoXYZ: LABtoXYZ
};

/**
 * @method HSVtoRGB
 *
 * convert hsv to rgb
 *
 * 		color.HSVtoRGB(0,0,1) === #FFFFF === { r : 255, g : 0, b : 0 }
 *
 * @param {Number} H  hue color number  (min : 0, max : 360)
 * @param {Number} S  Saturation number  (min : 0, max : 1)
 * @param {Number} V  Value number 		(min : 0, max : 1 )
 * @returns {Object}
 */
function HSVtoRGB(h, s, v) {

    if (arguments.length == 1) {
        var _arguments$ = arguments[0],
            h = _arguments$.h,
            s = _arguments$.s,
            v = _arguments$.v;
    }

    var H = h;
    var S = s;
    var V = v;

    if (H >= 360) {
        H = 0;
    }

    var C = S * V;
    var X = C * (1 - Math.abs(H / 60 % 2 - 1));
    var m = V - C;

    var temp = [];

    if (0 <= H && H < 60) {
        temp = [C, X, 0];
    } else if (60 <= H && H < 120) {
        temp = [X, C, 0];
    } else if (120 <= H && H < 180) {
        temp = [0, C, X];
    } else if (180 <= H && H < 240) {
        temp = [0, X, C];
    } else if (240 <= H && H < 300) {
        temp = [X, 0, C];
    } else if (300 <= H && H < 360) {
        temp = [C, 0, X];
    }

    return {
        r: round((temp[0] + m) * 255),
        g: round((temp[1] + m) * 255),
        b: round((temp[2] + m) * 255)
    };
}

function HSVtoHSL(h, s, v) {

    if (arguments.length == 1) {
        var _arguments$2 = arguments[0],
            h = _arguments$2.h,
            s = _arguments$2.s,
            v = _arguments$2.v;
    }

    var rgb = HSVtoRGB(h, s, v);

    return RGBtoHSL(rgb.r, rgb.g, rgb.b);
}

var fromHSV = {
    HSVtoHSL: HSVtoHSL,
    HSVtoRGB: HSVtoRGB
};

function HUEtoRGB(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

function HSLtoHSV(h, s, l) {

    if (arguments.length == 1) {
        var _arguments$ = arguments[0],
            h = _arguments$.h,
            s = _arguments$.s,
            l = _arguments$.l;
    }
    var rgb = HSLtoRGB(h, s, l);

    return RGBtoHSV(rgb.r, rgb.g, rgb.b);
}

function HSLtoRGB(h, s, l) {

    if (arguments.length == 1) {
        var _arguments$2 = arguments[0],
            h = _arguments$2.h,
            s = _arguments$2.s,
            l = _arguments$2.l;
    }

    var r, g, b;

    h /= 360;
    s /= 100;
    l /= 100;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = HUEtoRGB(p, q, h + 1 / 3);
        g = HUEtoRGB(p, q, h);
        b = HUEtoRGB(p, q, h - 1 / 3);
    }

    return { r: round(r * 255), g: round(g * 255), b: round(b * 255) };
}

var fromHSL = {
    HUEtoRGB: HUEtoRGB,
    HSLtoHSV: HSLtoHSV,
    HSLtoRGB: HSLtoRGB
};

function YCrCbtoRGB(y, cr, cb, bit) {

    if (arguments.length == 1) {
        var _arguments$ = arguments[0],
            y = _arguments$.y,
            cr = _arguments$.cr,
            cb = _arguments$.cb,
            bit = _arguments$.bit;

        bit = bit || 0;
    }
    var R = y + 1.402 * (cr - bit);
    var G = y - 0.344 * (cb - bit) - 0.714 * (cr - bit);
    var B = y + 1.772 * (cb - bit);

    return { r: Math.ceil(R), g: Math.ceil(G), b: Math.ceil(B) };
}

var fromYCrCb = {
    YCrCbtoRGB: YCrCbtoRGB
};

var color_names = { aliceblue: "rgb(240, 248, 255)", antiquewhite: "rgb(250, 235, 215)", aqua: "rgb(0, 255, 255)", aquamarine: "rgb(127, 255, 212)", azure: "rgb(240, 255, 255)", beige: "rgb(245, 245, 220)", bisque: "rgb(255, 228, 196)", black: "rgb(0, 0, 0)", blanchedalmond: "rgb(255, 235, 205)", blue: "rgb(0, 0, 255)", blueviolet: "rgb(138, 43, 226)", brown: "rgb(165, 42, 42)", burlywood: "rgb(222, 184, 135)", cadetblue: "rgb(95, 158, 160)", chartreuse: "rgb(127, 255, 0)", chocolate: "rgb(210, 105, 30)", coral: "rgb(255, 127, 80)", cornflowerblue: "rgb(100, 149, 237)", cornsilk: "rgb(255, 248, 220)", crimson: "rgb(237, 20, 61)", cyan: "rgb(0, 255, 255)", darkblue: "rgb(0, 0, 139)", darkcyan: "rgb(0, 139, 139)", darkgoldenrod: "rgb(184, 134, 11)", darkgray: "rgb(169, 169, 169)", darkgrey: "rgb(169, 169, 169)", darkgreen: "rgb(0, 100, 0)", darkkhaki: "rgb(189, 183, 107)", darkmagenta: "rgb(139, 0, 139)", darkolivegreen: "rgb(85, 107, 47)", darkorange: "rgb(255, 140, 0)", darkorchid: "rgb(153, 50, 204)", darkred: "rgb(139, 0, 0)", darksalmon: "rgb(233, 150, 122)", darkseagreen: "rgb(143, 188, 143)", darkslateblue: "rgb(72, 61, 139)", darkslategray: "rgb(47, 79, 79)", darkslategrey: "rgb(47, 79, 79)", darkturquoise: "rgb(0, 206, 209)", darkviolet: "rgb(148, 0, 211)", deeppink: "rgb(255, 20, 147)", deepskyblue: "rgb(0, 191, 255)", dimgray: "rgb(105, 105, 105)", dimgrey: "rgb(105, 105, 105)", dodgerblue: "rgb(30, 144, 255)", firebrick: "rgb(178, 34, 34)", floralwhite: "rgb(255, 250, 240)", forestgreen: "rgb(34, 139, 34)", fuchsia: "rgb(255, 0, 255)", gainsboro: "rgb(220, 220, 220)", ghostwhite: "rgb(248, 248, 255)", gold: "rgb(255, 215, 0)", goldenrod: "rgb(218, 165, 32)", gray: "rgb(128, 128, 128)", grey: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", greenyellow: "rgb(173, 255, 47)", honeydew: "rgb(240, 255, 240)", hotpink: "rgb(255, 105, 180)", indianred: "rgb(205, 92, 92)", indigo: "rgb(75, 0, 130)", ivory: "rgb(255, 255, 240)", khaki: "rgb(240, 230, 140)", lavender: "rgb(230, 230, 250)", lavenderblush: "rgb(255, 240, 245)", lawngreen: "rgb(124, 252, 0)", lemonchiffon: "rgb(255, 250, 205)", lightblue: "rgb(173, 216, 230)", lightcoral: "rgb(240, 128, 128)", lightcyan: "rgb(224, 255, 255)", lightgoldenrodyellow: "rgb(250, 250, 210)", lightgreen: "rgb(144, 238, 144)", lightgray: "rgb(211, 211, 211)", lightgrey: "rgb(211, 211, 211)", lightpink: "rgb(255, 182, 193)", lightsalmon: "rgb(255, 160, 122)", lightseagreen: "rgb(32, 178, 170)", lightskyblue: "rgb(135, 206, 250)", lightslategray: "rgb(119, 136, 153)", lightslategrey: "rgb(119, 136, 153)", lightsteelblue: "rgb(176, 196, 222)", lightyellow: "rgb(255, 255, 224)", lime: "rgb(0, 255, 0)", limegreen: "rgb(50, 205, 50)", linen: "rgb(250, 240, 230)", magenta: "rgb(255, 0, 255)", maroon: "rgb(128, 0, 0)", mediumaquamarine: "rgb(102, 205, 170)", mediumblue: "rgb(0, 0, 205)", mediumorchid: "rgb(186, 85, 211)", mediumpurple: "rgb(147, 112, 219)", mediumseagreen: "rgb(60, 179, 113)", mediumslateblue: "rgb(123, 104, 238)", mediumspringgreen: "rgb(0, 250, 154)", mediumturquoise: "rgb(72, 209, 204)", mediumvioletred: "rgb(199, 21, 133)", midnightblue: "rgb(25, 25, 112)", mintcream: "rgb(245, 255, 250)", mistyrose: "rgb(255, 228, 225)", moccasin: "rgb(255, 228, 181)", navajowhite: "rgb(255, 222, 173)", navy: "rgb(0, 0, 128)", oldlace: "rgb(253, 245, 230)", olive: "rgb(128, 128, 0)", olivedrab: "rgb(107, 142, 35)", orange: "rgb(255, 165, 0)", orangered: "rgb(255, 69, 0)", orchid: "rgb(218, 112, 214)", palegoldenrod: "rgb(238, 232, 170)", palegreen: "rgb(152, 251, 152)", paleturquoise: "rgb(175, 238, 238)", palevioletred: "rgb(219, 112, 147)", papayawhip: "rgb(255, 239, 213)", peachpuff: "rgb(255, 218, 185)", peru: "rgb(205, 133, 63)", pink: "rgb(255, 192, 203)", plum: "rgb(221, 160, 221)", powderblue: "rgb(176, 224, 230)", purple: "rgb(128, 0, 128)", rebeccapurple: "rgb(102, 51, 153)", red: "rgb(255, 0, 0)", rosybrown: "rgb(188, 143, 143)", royalblue: "rgb(65, 105, 225)", saddlebrown: "rgb(139, 69, 19)", salmon: "rgb(250, 128, 114)", sandybrown: "rgb(244, 164, 96)", seagreen: "rgb(46, 139, 87)", seashell: "rgb(255, 245, 238)", sienna: "rgb(160, 82, 45)", silver: "rgb(192, 192, 192)", skyblue: "rgb(135, 206, 235)", slateblue: "rgb(106, 90, 205)", slategray: "rgb(112, 128, 144)", slategrey: "rgb(112, 128, 144)", snow: "rgb(255, 250, 250)", springgreen: "rgb(0, 255, 127)", steelblue: "rgb(70, 130, 180)", tan: "rgb(210, 180, 140)", teal: "rgb(0, 128, 128)", thistle: "rgb(216, 191, 216)", tomato: "rgb(255, 99, 71)", turquoise: "rgb(64, 224, 208)", violet: "rgb(238, 130, 238)", wheat: "rgb(245, 222, 179)", white: "rgb(255, 255, 255)", whitesmoke: "rgb(245, 245, 245)", yellow: "rgb(255, 255, 0)", yellowgreen: "rgb(154, 205, 50)", transparent: "rgba(0, 0, 0, 0)" };

function isColorName(name) {
    return !!color_names[name];
}

function getColorByName(name) {
    return color_names[name];
}

var ColorNames = {
    isColorName: isColorName,
    getColorByName: getColorByName
};

var color_regexp = /(#(?:[\da-f]{3}){1,2}|rgb\((?:\s*\d{1,3},\s*){2}\d{1,3}\s*\)|rgba\((?:\s*\d{1,3},\s*){3}\d*\.?\d+\s*\)|hsl\(\s*\d{1,3}(?:,\s*\d{1,3}%){2}\s*\)|hsla\(\s*\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\s*\)|([\w_\-]+))/gi;
var color_split = ',';

function matches(str) {
    var matches = str.match(color_regexp);
    var result = [];

    if (!matches) {
        return result;
    }

    for (var i = 0, len = matches.length; i < len; i++) {

        if (matches[i].indexOf('#') > -1 || matches[i].indexOf('rgb') > -1 || matches[i].indexOf('hsl') > -1) {
            result.push({ color: matches[i] });
        } else {
            var nameColor = ColorNames.getColorByName(matches[i]);

            if (nameColor) {
                result.push({ color: matches[i], nameColor: nameColor });
            }
        }
    }

    var pos = { next: 0 };
    result.forEach(function (item) {
        var startIndex = str.indexOf(item.color, pos.next);

        item.startIndex = startIndex;
        item.endIndex = startIndex + item.color.length;

        pos.next = item.endIndex;
    });

    return result;
}

function convertMatches(str) {
    var m = matches(str);

    m.forEach(function (it, index) {
        str = str.replace(it.color, '@' + index);
    });

    return { str: str, matches: m };
}

function convertMatchesArray(str) {
    var splitStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

    var ret = convertMatches(str);
    return ret.str.split(splitStr).map(function (it, index) {
        it = trim(it);

        if (ret.matches[index]) {
            it = it.replace('@' + index, ret.matches[index].color);
        }

        return it;
    });
}

function reverseMatches(str, matches) {
    matches.forEach(function (it, index) {
        str = str.replace('@' + index, it.color);
    });

    return str;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

/**
 * @method rgb
 *
 * parse string to rgb color
 *
 * 		color.parse("#FF0000") === { r : 255, g : 0, b : 0 }
 *
 * 		color.parse("rgb(255, 0, 0)") == { r : 255, g : 0, b :0 }
 * 		color.parse(0xff0000) == { r : 255, g : 0, b : 0 }
 * 		color.parse(0xff000000) == { r : 255, g : 0, b : 0, a: 0 }
 *
 * @param {String} str color string
 * @returns {Object}  rgb object
 */
function parse(str) {
    if (isString(str)) {

        if (ColorNames.isColorName(str)) {
            str = ColorNames.getColorByName(str);
        }

        if (str.indexOf("rgb(") > -1) {
            var arr = str.replace("rgb(", "").replace(")", "").split(",");

            for (var i = 0, len = arr.length; i < len; i++) {
                arr[i] = parseInt(trim(arr[i]), 10);
            }

            var obj = { type: 'rgb', r: arr[0], g: arr[1], b: arr[2], a: 1 };

            obj = Object.assign(obj, RGBtoHSL(obj));

            return obj;
        } else if (str.indexOf("rgba(") > -1) {
            var arr = str.replace("rgba(", "").replace(")", "").split(",");

            for (var i = 0, len = arr.length; i < len; i++) {

                if (len - 1 == i) {
                    arr[i] = parseFloat(trim(arr[i]));
                } else {
                    arr[i] = parseInt(trim(arr[i]), 10);
                }
            }

            var obj = { type: 'rgb', r: arr[0], g: arr[1], b: arr[2], a: arr[3] };

            obj = Object.assign(obj, RGBtoHSL(obj));

            return obj;
        } else if (str.indexOf("hsl(") > -1) {
            var arr = str.replace("hsl(", "").replace(")", "").split(",");

            for (var i = 0, len = arr.length; i < len; i++) {
                arr[i] = parseFloat(trim(arr[i]));
            }

            var obj = { type: 'hsl', h: arr[0], s: arr[1], l: arr[2], a: 1 };

            obj = Object.assign(obj, HSLtoRGB(obj));

            return obj;
        } else if (str.indexOf("hsla(") > -1) {
            var arr = str.replace("hsla(", "").replace(")", "").split(",");

            for (var i = 0, len = arr.length; i < len; i++) {

                if (len - 1 == i) {
                    arr[i] = parseFloat(trim(arr[i]));
                } else {
                    arr[i] = parseInt(trim(arr[i]), 10);
                }
            }

            var obj = { type: 'hsl', h: arr[0], s: arr[1], l: arr[2], a: arr[3] };

            obj = Object.assign(obj, HSLtoRGB(obj));

            return obj;
        } else if (str.indexOf("#") == 0) {

            str = str.replace("#", "");

            var arr = [];
            if (str.length == 3) {
                for (var i = 0, len = str.length; i < len; i++) {
                    var char = str.substr(i, 1);
                    arr.push(parseInt(char + char, 16));
                }
            } else {
                for (var i = 0, len = str.length; i < len; i += 2) {
                    arr.push(parseInt(str.substr(i, 2), 16));
                }
            }

            var obj = { type: 'hex', r: arr[0], g: arr[1], b: arr[2], a: 1 };

            obj = Object.assign(obj, RGBtoHSL(obj));

            return obj;
        }
    } else if (isNumber(str)) {
        if (0x000000 <= str && str <= 0xffffff) {
            var r = (str & 0xff0000) >> 16;
            var g = (str & 0x00ff00) >> 8;
            var b = (str & 0x0000ff) >> 0;

            var obj = { type: 'hex', r: r, g: g, b: b, a: 1 };
            obj = Object.assign(obj, RGBtoHSL(obj));
            return obj;
        } else if (0x00000000 <= str && str <= 0xffffffff) {
            var _r = (str & 0xff000000) >> 24;
            var _g = (str & 0x00ff0000) >> 16;
            var _b = (str & 0x0000ff00) >> 8;
            var a = (str & 0x000000ff) / 255;

            var obj = { type: 'hex', r: _r, g: _g, b: _b, a: a };
            obj = Object.assign(obj, RGBtoHSL(obj));

            return obj;
        }
    }

    return str;
}

function parseGradient(colors) {
    if (isString(colors)) {
        colors = convertMatchesArray(colors);
    }

    colors = colors.map(function (it) {
        if (isString(it)) {
            var ret = convertMatches(it);
            var arr = trim(ret.str).split(' ');

            if (arr[1]) {
                if (arr[1].includes('%')) {
                    arr[1] = parseFloat(arr[1].replace(/%/, '')) / 100;
                } else {
                    arr[1] = parseFloat(arr[1]);
                }
            } else {
                arr[1] = '*';
            }

            arr[0] = reverseMatches(arr[0], ret.matches);

            return arr;
        } else if (Array.isArray(it)) {

            if (!it[1]) {
                it[1] = '*';
            } else if (isString(it[1])) {
                if (it[1].includes('%')) {
                    it[1] = parseFloat(it[1].replace(/%/, '')) / 100;
                } else {
                    it[1] = +it[1];
                }
            }

            return [].concat(toConsumableArray(it));
        }
    });

    var count = colors.filter(function (it) {
        return it[1] === '*';
    }).length;

    if (count > 0) {
        var sum = colors.filter(function (it) {
            return it[1] != '*' && it[1] != 1;
        }).map(function (it) {
            return it[1];
        }).reduce(function (total, cur) {
            return total + cur;
        }, 0);

        var dist = (1 - sum) / count;
        colors.forEach(function (it, index) {
            if (it[1] == '*' && index > 0) {
                if (colors.length - 1 == index) {
                    // it[1] = 1 
                } else {
                    it[1] = dist;
                }
            }
        });
    }

    return colors;
}

var parser = {
    matches: matches,
    convertMatches: convertMatches,
    convertMatchesArray: convertMatchesArray,
    reverseMatches: reverseMatches,
    parse: parse,
    parseGradient: parseGradient,
    trim: trim,
    color_regexp: color_regexp,
    color_split: color_split
};

/**
 * @deprecated 
 * 
 * instead of this,  use blend function 
 *  
 * @param {*} startColor 
 * @param {*} endColor 
 * @param {*} t 
 */
function interpolateRGB(startColor, endColor) {
    var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
    var exportFormat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'hex';

    var obj = interpolateRGBObject(startColor, endColor, t);

    return format(obj, obj.a < 1 ? 'rgb' : exportFormat);
}

function interpolateRGBObject(startColor, endColor) {
    var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

    return {
        r: round(startColor.r + (endColor.r - startColor.r) * t),
        g: round(startColor.g + (endColor.g - startColor.g) * t),
        b: round(startColor.b + (endColor.b - startColor.b) * t),
        a: round(startColor.a + (endColor.a - startColor.a) * t, 100)
    };
}

function scale(scale) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

    if (!scale) return [];

    if (isString(scale)) {
        scale = convertMatchesArray(scale);
    }

    scale = scale || [];
    var len = scale.length;

    var colors = [];
    for (var i = 0; i < len - 1; i++) {
        for (var index = 0; index < count; index++) {
            colors.push(blend(scale[i], scale[i + 1], index / count));
        }
    }
    return colors;
}

function blend(startColor, endColor) {
    var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
    var format$$1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'hex';

    var s = parse(startColor);
    var e = parse(endColor);

    return interpolateRGB(s, e, ratio, format$$1);
}

function mix(startcolor, endColor) {
    var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
    var format$$1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'hex';

    return blend(startcolor, endColor, ratio, format$$1);
}

/**
 * 
 * @param {Color|String} c 
 */
function contrast(c$$1) {
    c$$1 = parse(c$$1);
    return (Math.round(c$$1.r * 299) + Math.round(c$$1.g * 587) + Math.round(c$$1.b * 114)) / 1000;
}

function contrastColor(c$$1) {
    return contrast(c$$1) >= 128 ? 'black' : 'white';
}

function gradient(colors) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    colors = parseGradient(colors);

    var newColors = [];
    var maxCount = count - (colors.length - 1);
    var allCount = maxCount;

    for (var i = 1, len = colors.length; i < len; i++) {

        var startColor = colors[i - 1][0];
        var endColor = colors[i][0];

        // if it is second color
        var rate = i == 1 ? colors[i][1] : colors[i][1] - colors[i - 1][1];

        // if it is last color 
        var colorCount = i == colors.length - 1 ? allCount : Math.floor(rate * maxCount);

        newColors = newColors.concat(scale([startColor, endColor], colorCount), [endColor]);

        allCount -= colorCount;
    }
    return newColors;
}

function scaleHSV(color) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'h';
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9;
    var exportFormat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'rgb';
    var min = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var dist = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 100;

    var colorObj = parse(color);
    var hsv = RGBtoHSV(colorObj);
    var unit = (max - min) * dist / count;

    var results = [];
    for (var i = 1; i <= count; i++) {
        hsv[target] = Math.abs((dist - unit * i) / dist);
        results.push(format(HSVtoRGB(hsv), exportFormat));
    }

    return results;
}

function scaleH(color) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
    var exportFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgb';
    var min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 360;

    return scaleHSV(color, 'h', count, exportFormat, min, max, 1);
}

function scaleS(color) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
    var exportFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgb';
    var min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    return scaleHSV(color, 's', count, exportFormat, min, max, 100);
}

function scaleV(color) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
    var exportFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgb';
    var min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    return scaleHSV(color, 'v', count, exportFormat, min, max, 100);
}

/* predefined scale colors */
scale.parula = function (count) {
    return scale(['#352a87', '#0f5cdd', '#00b5a6', '#ffc337', '#fdff00'], count);
};

scale.jet = function (count) {
    return scale(['#00008f', '#0020ff', '#00ffff', '#51ff77', '#fdff00', '#ff0000', '#800000'], count);
};

scale.hsv = function (count) {
    return scale(['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'], count);
};

scale.hot = function (count) {
    return scale(['#0b0000', '#ff0000', '#ffff00', '#ffffff'], count);
};
scale.pink = function (count) {
    return scale(['#1e0000', '#bd7b7b', '#e7e5b2', '#ffffff'], count);
};

scale.bone = function (count) {
    return scale(['#000000', '#4a4a68', '#a6c6c6', '#ffffff'], count);
};

scale.copper = function (count) {
    return scale(['#000000', '#3d2618', '#9d623e', '#ffa167', '#ffc77f'], count);
};

var mixin = {
    interpolateRGB: interpolateRGB,
    blend: blend,
    mix: mix,
    scale: scale,
    contrast: contrast,
    contrastColor: contrastColor,
    gradient: gradient,
    scaleHSV: scaleHSV,
    scaleH: scaleH,
    scaleS: scaleS,
    scaleV: scaleV
};

function array_equals(v1, v2) {
    if (v1.length !== v2.length) return false;
    for (var i = 0, len = v1.length; i < len; ++i) {
        if (v1[i] !== v2[i]) return false;
    }
    return true;
}

function euclidean(v1, v2) {
    var total = 0;

    for (var i = 0, len = v1.length; i < len; i++) {
        total += Math.pow(v2[i] - v1[i], 2);
    }

    return Math.sqrt(total);
}

function manhattan(v1, v2) {
    var total = 0;

    for (var i = 0, len = v1.length; i < len; i++) {
        total += Math.abs(v2[i] - v1[i]);
    }

    return total;
}

function max(v1, v2) {
    var max = 0;
    for (var i = 0, len = v1.length; i < len; i++) {
        max = Math.max(max, Math.abs(v2[i] - v1[i]));
    }

    return max;
}

var distances = {
    euclidean: euclidean,
    manhattan: manhattan,
    max: max
};

var create_random_number = {
    linear: function linear(num, count) {
        var centeroids = [];
        var start = Math.round(Math.random() * num);
        var dist = Math.floor(num / count);

        do {

            centeroids.push(start);

            start = (start + dist) % num;
        } while (centeroids.length < count);

        return centeroids;
    },

    shuffle: function shuffle(num, count) {
        var centeroids = [];

        while (centeroids.length < count) {

            var index = Math.round(Math.random() * num);

            if (centeroids.indexOf(index) == -1) {
                centeroids.push(index);
            }
        }

        return centeroids;
    }

};

function randomCentroids(points, k) {
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'linear';


    var centeroids = create_random_number[method](points.length, k);

    return centeroids.map(function (i) {
        return points[i];
    });

    // var centeroids = points.slice(0);

    // centeroids.sort(function () {
    //     return (Math.round(Math.random()) - 0.5);
    // })

    // return centeroids.slice(0, k); 
}

function closestCenteroid(point, centeroids, distance) {
    var min = Infinity,
        kIndex = 0;

    centeroids.forEach(function (center, i) {
        var dist = distance(point, center);

        if (dist < min) {
            min = dist;
            kIndex = i;
        }
    });

    return kIndex;
}

function getCenteroid(assigned) {

    if (!assigned.length) return [];

    // initialize centeroid list 
    var centeroid = new Array(assigned[0].length);
    for (var i = 0, len = centeroid.length; i < len; i++) {
        centeroid[i] = 0;
    }

    for (var index = 0, len = assigned.length; index < len; index++) {
        var it = assigned[index];

        var last = index + 1;

        for (var j = 0, jLen = it.length; j < jLen; j++) {
            centeroid[j] += (it[j] - centeroid[j]) / last;
        }
    }

    centeroid = centeroid.map(function (it) {
        return Math.floor(it);
    });

    return centeroid;
}

function unique_array(arrays) {
    return arrays;
    var set = {};
    var count = arrays.length;
    var it = null;
    while (count--) {
        it = arrays[count];
        set[JSON.stringify(it)] = it;
    }

    return Object.values(set);
}

function splitK(k, points, centeroids, distance) {
    var assignment = new Array(k);

    for (var i = 0; i < k; i++) {
        assignment[i] = [];
    }

    for (var idx = 0, pointLength = points.length; idx < pointLength; idx++) {
        var point = points[idx];
        var index = closestCenteroid(point, centeroids, distance);
        assignment[index].push(point);
    }

    return assignment;
}

function setNewCenteroid(k, points, assignment, centeroids, movement, randomFunction) {

    for (var i = 0; i < k; i++) {
        var assigned = assignment[i];

        var centeroid = centeroids[i];
        var newCenteroid = new Array(centeroid.length);

        if (assigned.length > 0) {
            newCenteroid = getCenteroid(assigned);
        } else {
            var idx = Math.floor(randomFunction() * points.length);
            newCenteroid = points[idx];
        }

        if (array_equals(newCenteroid, centeroid)) {
            movement = false;
        } else {
            movement = true;
        }

        centeroids[i] = newCenteroid;
    }

    return movement;
}

function kmeans(points, k, distanceFunction) {
    var period = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    var initialRandom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'linear';

    points = unique_array(points);

    k = k || Math.max(2, Math.ceil(Math.sqrt(points.length / 2)));

    var distance = distanceFunction || 'euclidean';
    if (isString(distance)) {
        distance = distances[distance];
    }

    var rng_seed = 0;
    var random = function random() {
        rng_seed = (rng_seed * 9301 + 49297) % 233280;
        return rng_seed / 233280;
    };

    var centeroids = randomCentroids(points, k, initialRandom);

    var movement = true;
    var iterations = 0;
    while (movement) {
        var assignment = splitK(k, points, centeroids, distance);

        movement = setNewCenteroid(k, points, assignment, centeroids, false, random);

        iterations++;

        if (iterations % period == 0) {
            break;
        }
    }

    return centeroids;
}

function each(len, callback) {
    for (var i = 0; i < len; i += 4) {
        callback(i);
    }
}

function pack(bitmap, callback) {

    each(bitmap.pixels.length, function (i) {
        callback(bitmap.pixels, i);
    });
}

var Canvas = {
    create: function create(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width || 0;
        canvas.height = height || 0;

        return canvas;
    },
    drawPixels: function drawPixels(bitmap) {
        var canvas = this.create(bitmap.width, bitmap.height);

        var context = canvas.getContext('2d');
        var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

        imagedata.data.set(bitmap.pixels);

        context.putImageData(imagedata, 0, 0);

        return canvas;
    },
    createHistogram: function createHistogram(width, height, histogram, callback) {
        var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { black: true, red: false, green: false, blue: false };

        var canvas = this.create(width, height);
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
        context.globalAlpha = 0.7;

        var omit = { black: false };
        if (opt.black) {
            omit.black = false;
        } else {
            omit.black = true;
        }
        if (opt.red) {
            omit.red = false;
        } else {
            omit.red = true;
        }
        if (opt.green) {
            omit.green = false;
        } else {
            omit.green = true;
        }
        if (opt.blue) {
            omit.blue = false;
        } else {
            omit.blue = true;
        }

        Object.keys(histogram).forEach(function (color) {

            if (!omit[color]) {

                var array = histogram[color];
                var ymax = Math.max.apply(Math, array);
                var unitWith = width / array.length;

                context.fillStyle = color;
                array.forEach(function (it, index) {
                    var currentHeight = height * (it / ymax);
                    var x = index * unitWith;

                    context.fillRect(x, height - currentHeight, unitWith, currentHeight);
                });
            }
        });

        if (isFunction(callback)) callback(canvas);
    },
    getHistogram: function getHistogram(bitmap) {
        var black = new Array(256);
        var red = new Array(256);
        var green = new Array(256);
        var blue = new Array(256);
        for (var i = 0; i < 256; i++) {
            black[i] = 0;
            red[i] = 0;
            green[i] = 0;
            blue[i] = 0;
        }

        pack(bitmap, function (pixels, i) {
            // gray scale 
            var grayIndex = Math.round(Color$1.brightness(pixels[i], pixels[i + 1], pixels[i + 2]));
            black[grayIndex]++;

            red[pixels[i]]++;
            green[pixels[i + 1]]++;
            blue[pixels[i + 2]]++;
        });

        return { black: black, red: red, green: green, blue: blue };
    },
    getBitmap: function getBitmap(bitmap, area) {
        var canvas = this.drawPixels(bitmap);

        var context = canvas.getContext('2d');
        var pixels = context.getImageData(area.x || 0, area.y || 0, area.width || canvas.width, area.height || canvas.height).data;

        return { pixels: pixels, width: area.width, height: area.height };
    },
    putBitmap: function putBitmap(bitmap, subBitmap, area) {

        var canvas = this.drawPixels(bitmap);
        var subCanvas = this.drawPixels(subBitmap);

        var context = canvas.getContext('2d');
        context.drawImage(subCanvas, area.x, area.y);

        bitmap.pixels = context.getImageData(0, 0, bitmap.width, bitmap.height).data;

        return bitmap;
    }
};

var ImageLoader = function () {
    function ImageLoader(url) {
        var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck(this, ImageLoader);

        this.isLoaded = false;
        this.imageUrl = url;
        this.opt = opt;
        this.initialize();
    }

    createClass(ImageLoader, [{
        key: 'initialize',
        value: function initialize() {
            this.canvas = this.createCanvas();
            this.context = this.canvas.getContext('2d');
        }
    }, {
        key: 'createCanvas',
        value: function createCanvas() {
            return document.createElement('canvas');
        }
    }, {
        key: 'load',
        value: function load(callback) {
            this.loadImage(callback);
        }
    }, {
        key: 'loadImage',
        value: function loadImage(callback) {
            var _this = this;

            this.getImage(function (img) {
                var ctx = _this.context;
                var ratio = img.height / img.width;

                if (_this.opt.canvasWidth && _this.opt.canvasHeight) {
                    _this.canvas.width = _this.opt.canvasWidth;
                    _this.canvas.height = _this.opt.canvasHeight;
                } else {
                    _this.canvas.width = _this.opt.maxWidth ? _this.opt.maxWidth : img.width;
                    _this.canvas.height = _this.canvas.width * ratio;
                }

                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, _this.canvas.width, _this.canvas.height);
                _this.isLoaded = true;
                callback && callback();
            });
        }
    }, {
        key: 'getImage',
        value: function getImage(callback) {

            this.newImage = new Image();
            var img = this.newImage;
            img.onload = function () {
                callback && callback(img);
            };

            img.onerror = function (e) {
                console.log(e, img.src);
            };

            this.getImageUrl(function (url) {
                img.src = url;
            });
        }
    }, {
        key: 'load',
        value: function load(callback) {
            var _this2 = this;

            this.newImage = new Image();
            var img = this.newImage;
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                _this2.isLoaded = true;
                callback && callback();
            };

            this.getImageUrl(function (url) {
                img.src = url;
            });
        }
    }, {
        key: 'getImageUrl',
        value: function getImageUrl(callback) {
            if (isString(this.imageUrl)) {
                return callback(this.imageUrl);
            } else if (this.imageUrl instanceof Blob) {
                var reader = new FileReader();

                reader.onload = function (ev) {
                    callback(ev.target.result);
                };

                reader.readAsDataURL(this.imageUrl);
            }
        }
    }, {
        key: 'getRGBA',
        value: function getRGBA(r, g, b, a) {
            return [r, g, b, a];
        }
    }, {
        key: 'toArray',
        value: function toArray$$1(filter, callback) {
            var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var imagedata = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var width = imagedata.width;
            var height = imagedata.height;

            var pixels = new Uint8ClampedArray(imagedata.data);

            var bitmap = { pixels: pixels, width: width, height: height };

            if (!filter) {
                filter = function () {
                    return function (bitmap, done) {
                        done(bitmap);
                    };
                }();
            }

            filter(bitmap, function (newBitmap) {
                var tmpCanvas = Canvas.drawPixels(newBitmap);

                if (opt.returnTo == 'canvas') {
                    callback(tmpCanvas);
                } else {
                    callback(tmpCanvas.toDataURL(opt.outputFormat || 'image/png'));
                }
            }, opt);
        }
    }, {
        key: 'toHistogram',
        value: function toHistogram(opt) {
            var imagedata = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var width = imagedata.width;
            var height = imagedata.height;

            var pixels = new Uint8ClampedArray(imagedata.data);

            var bitmap = { pixels: pixels, width: width, height: height };

            return Canvas.getHistogram(bitmap);
        }
    }, {
        key: 'toRGB',
        value: function toRGB() {
            var imagedata = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

            var rgba = imagedata.data;
            var results = [];
            for (var i = 0, len = rgba.length; i < len; i += 4) {
                results[results.length] = [rgba[i + 0], rgba[i + 1], rgba[i + 2], rgba[i + 3]];
            }

            return results;
        }
    }]);
    return ImageLoader;
}();

var CONSTANT = {
    identity: function identity() {
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    },
    stretching: function stretching(k) {
        return [k, 0, 0, 0, 1, 0, 0, 0, 1];
    },
    squeezing: function squeezing(k) {
        return [k, 0, 0, 0, 1 / k, 0, 0, 0, 1];
    },
    scale: function scale() {
        var sx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var sy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        sx = sx || sx === 0 ? sx : 1;
        sy = sy || sy === 0 ? sy : 1;
        return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
    },
    scaleX: function scaleX(sx) {
        return this.scale(sx);
    },
    scaleY: function scaleY(sy) {
        return this.scale(1, sy);
    },
    translate: function translate(tx, ty) {
        return [1, 0, tx, 0, 1, ty, 0, 0, 1];
    },
    rotate: function rotate(angle) {
        var r = this.radian(angle);
        return [Math.cos(r), -Math.sin(r), 0, Math.sin(r), Math.cos(r), 0, 0, 0, 1];
    },
    rotate90: function rotate90() {
        return [0, -1, 0, 1, 0, 0, 0, 0, 1];
    },
    rotate180: function rotate180() {
        return [-1, 0, 0, 0, -1, 0, 0, 0, 1];
    },
    rotate270: function rotate270() {
        return [0, 1, 0, -1, 0, 0, 0, 0, 1];
    },
    radian: function radian(degree) {
        return degree * Math.PI / 180;
    },
    skew: function skew(degreeX, degreeY) {
        var radianX = this.radian(degreeX);
        var radianY = this.radian(degreeY);
        return [1, Math.tan(radianX), 0, Math.tan(radianY), 1, 0, 0, 0, 1];
    },
    skewX: function skewX(degreeX) {
        var radianX = this.radian(degreeX);

        return [1, Math.tan(radianX), 0, 0, 1, 0, 0, 0, 1];
    },
    skewY: function skewY(degreeY) {
        var radianY = this.radian(degreeY);

        return [1, 0, 0, Math.tan(radianY), 1, 0, 0, 0, 1];
    },
    shear1: function shear1(angle) {
        return [1, -Math.tan(this.radian(angle) / 2), 0, 0, 1, 0, 0, 0, 1];
    },
    shear2: function shear2(angle) {
        return [1, 0, 0, Math.sin(this.radian(angle)), 1, 0, 0, 0, 1];
    }
};

var Matrix = {
    CONSTANT: CONSTANT,

    radian: function radian(angle) {
        return CONSTANT.radian(angle);
    },
    multiply: function multiply(A, C) {
        // console.log(JSON.stringify(A), JSON.stringify(C))
        return [A[0] * C[0] + A[1] * C[1] + A[2] * C[2], A[3] * C[0] + A[4] * C[1] + A[5] * C[2], A[6] * C[0] + A[7] * C[1] + A[8] * C[2]];
    },
    identity: function identity(B) {
        return this.multiply(CONSTANT.identity(), B);
    },
    translate: function translate(x, y, B) {
        return this.multiply(CONSTANT.translate(x, y), B);
    },
    rotate: function rotate(angle, B) {
        return this.multiply(CONSTANT.rotate(angle), B);
    },
    shear1: function shear1(angle, B) {
        return this.multiply(CONSTANT.shear1(angle), B);
    },
    shear2: function shear2(angle, B) {
        return this.multiply(CONSTANT.shear2(angle), B);
    },
    rotateShear: function rotateShear(angle, B) {

        var arr = B;

        arr = this.shear1(angle, arr);
        arr = this.shear2(angle, arr);
        arr = this.shear1(angle, arr);

        return arr;
    }
};

function crop() {
    var startX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var startY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments[2];
    var height = arguments[3];


    var newBitmap = createBitmap(width * height * 4, width, height);

    return function (bitmap, done) {
        for (var y = startY, realY = 0; y < height; y++, realY++) {
            for (var x = startX, realX = 0; x < width; x++, realX++) {
                newBitmap.pixels[realY * width * realX] = bitmap.pixels[y * width * x];
            }
        }

        done(newBitmap);
    };
}

// Image manupulate 
function resize(dstWidth, dstHeight) {
    return function (bitmap, done) {
        var c = Canvas.drawPixels(bitmap);
        var context = c.getContext('2d');

        c.width = dstWidth;
        c.height = dstHeight;

        done({
            pixels: new Uint8ClampedArray(context.getImageData(0, 0, dstWidth, dstHeight).data),
            width: dstWidth,
            height: dstHeight
        });
    };
}

function flipV() {
    return function (bitmap, done) {
        var width = bitmap.width;
        var height = bitmap.height;
        var isCenter = height % 2 == 1 ? 1 : 0;

        var halfHeight = isCenter ? Math.floor(height / 2) : height / 2;

        for (var y = 0; y < halfHeight; y++) {
            for (var x = 0; x < width; x++) {

                var startIndex = y * width + x << 2;
                var endIndex = (height - 1 - y) * width + x << 2;
                swapColor(bitmap.pixels, startIndex, endIndex);
            }
        }

        done(bitmap);
    };
}

function flipH() {
    return function (bitmap, done) {
        var width = bitmap.width;
        var height = bitmap.height;
        var isCenter = width % 2 == 1 ? 1 : 0;

        var halfWidth = isCenter ? Math.floor(width / 2) : width / 2;

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < halfWidth; x++) {

                var startIndex = y * width + x << 2;
                var endIndex = y * width + (width - 1 - x) << 2;
                swapColor(bitmap.pixels, startIndex, endIndex);
            }
        }

        done(bitmap);
    };
}

var _UNIT_STRINGS;

var UNIT_VALUE = 'value';
var UNIT_PX = 'px';
var UNIT_EM = 'em';
var UNIT_PERCENT = 'percent';
var UNIT_DEG = 'deg';
var UNIT_COLOR = 'color';

var UNIT_VALUE_STRING = '';
var UNIT_PX_STRING = 'px';
var UNIT_EM_STRING = 'em';
var UNIT_PERCENT_STRING = '%';

var UNIT_COLOR_STRING = '';

var UNIT_STRINGS = (_UNIT_STRINGS = {}, defineProperty(_UNIT_STRINGS, UNIT_VALUE, UNIT_VALUE_STRING), defineProperty(_UNIT_STRINGS, UNIT_PX, UNIT_PX_STRING), defineProperty(_UNIT_STRINGS, UNIT_EM, UNIT_EM_STRING), defineProperty(_UNIT_STRINGS, UNIT_PERCENT, UNIT_PERCENT_STRING), defineProperty(_UNIT_STRINGS, UNIT_DEG, UNIT_DEG), defineProperty(_UNIT_STRINGS, UNIT_COLOR, UNIT_COLOR_STRING), _UNIT_STRINGS);


function px$1(value) {
    return value + UNIT_PX_STRING;
}
function em(value) {
    return value + UNIT_EM_STRING;
}
function percent(value) {
    return value + UNIT_PERCENT_STRING;
}



function isPX(unit) {
    return unit === UNIT_PX;
}
function isEM(unit) {
    return unit === UNIT_EM;
}
function isPercent(unit) {
    return unit === UNIT_PERCENT;
}



function unitString(unit) {
    var defaultString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return UNIT_STRINGS[unit] || defaultString;
}

function unit(value, unit) {
    return value + unitString(unit);
}

function stringUnit() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pxUnit(0);

    return unit(obj.value, obj.unit);
}

function unitValue() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pxUnit(0);

    if (isNumber(obj)) return obj;
    return obj.value;
}

function isUnit(obj, unit) {
    return obj && obj.unit == unit;
}

function isPxUnit(obj) {
    return isUnit(obj, UNIT_PX);
}

function isPercentUnit(obj) {
    return isUnit(obj, UNIT_PERCENT);
}

function isEmUnit(obj) {
    return isUnit(obj, UNIT_EM);
}

function isColorUnit(obj) {
    return isUnit(obj, UNIT_COLOR);
}



function isValueUnit(obj) {
    return isUnit(obj, UNIT_VALUE);
}

function unitObject(value, unit) {
    return { unit: unit, value: value };
}

function valueUnit(value) {
    return { unit: UNIT_VALUE, value: value };
}

function percentUnit(value) {
    return { unit: UNIT_PERCENT, value: value };
}

function pxUnit(value) {
    return { unit: UNIT_PX, value: value };
}

function degUnit(value) {
    return { unit: UNIT_DEG, value: value };
}

function emUnit(value) {
    return { unit: UNIT_EM, value: value };
}



function string2unit(str) {
    if (isNotString(str)) return str;
    if (str.includes(UNIT_PX)) {
        return pxUnit(parseParamNumber$1(str));
    } else if (str.includes(UNIT_PERCENT_STRING)) {
        return percentUnit(parseParamNumber$1(str));
    } else if (str.includes(UNIT_EM)) {
        return emUnit(parseParamNumber$1(str));
    } else if (str.includes(UNIT_DEG)) {
        return degUnit(parseParamNumber$1(str));
    }

    return pxUnit(parseParamNumber$1(str));
}

function value2px(obj, maxValue) {
    var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;

    if (isPxUnit(obj)) {
        return obj.value;
    } else if (isPercentUnit(obj)) {
        return percent2px(obj.value, maxValue);
    } else if (isEmUnit(obj)) {
        return em2px(obj.value, maxValue, fontSize);
    }
}





function convertPercentUnit(obj) {
    if (isValueUnit(obj)) {
        if (obj.value == 'left' || obj.value == 'top') {
            return percentUnit(0);
        } else if (obj.value == 'right' || obj.value == 'bottom') {
            return percentUnit(100);
        } else if (obj.value == 'center') {
            return percentUnit(50);
        }
    }

    return obj;
}

var ITEM_TYPE_PAGE = 'page';
var ITEM_TYPE_LAYER = 'layer';
var ITEM_TYPE_CIRCLE = 'circle';
var ITEM_TYPE_GROUP = 'group';
var ITEM_TYPE_IMAGE = 'image';
var ITEM_TYPE_BOXSHADOW = 'boxshadow';
var ITEM_TYPE_TEXTSHADOW$1 = 'textshadow';
var ITEM_TYPE_COLORSTEP = 'colorstep';

var IS_OBJECT = 'object';
var IS_ATTRIBUTE = 'attribute';

/* page is equal to artboard */
var PAGE_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_PAGE,
    is: IS_OBJECT,
    name: '',
    parentId: '',
    index: 0,
    width: pxUnit(400),
    height: pxUnit(300)
};

var FILTER_DEFAULT_OBJECT = {
    'filterBlur': { index: 0, value: 0, unit: UNIT_PX },
    'filterGrayscale': { index: 10, value: 0, unit: UNIT_PERCENT },
    'filterHueRotate': { index: 20, value: 0, unit: UNIT_DEG },
    'filterInvert': { index: 30, value: 0, unit: UNIT_PERCENT },
    'filterBrightness': { index: 40, value: 100, unit: UNIT_PERCENT },
    'filterContrast': { index: 50, value: 100, unit: UNIT_PERCENT },
    'filterDropshadow': { index: 60 },
    'filterDropshadowOffsetX': { value: 0, unit: UNIT_PX },
    'filterDropshadowOffsetY': { value: 0, unit: UNIT_PX },
    'filterDropshadowBlurRadius': { value: 0, unit: UNIT_PX },
    'filterDropshadowColor': { value: 'black', unit: UNIT_COLOR },
    'filterOpacity': { index: 70, value: 100, unit: UNIT_PERCENT },
    'filterSaturate': { index: 80, value: 100, unit: UNIT_PERCENT },
    'filterSepia': { index: 90, value: 0, unit: UNIT_PERCENT }
};

var FILTER_DEFAULT_OBJECT_KEYS = Object.keys(FILTER_DEFAULT_OBJECT).filter(function (key) {
    return isNotUndefined(FILTER_DEFAULT_OBJECT[key].index);
});

var BACKDROP_DEFAULT_OBJECT = {
    'backdropBlur': { index: 0, value: 0, unit: UNIT_PX },
    'backdropGrayscale': { index: 10, value: 0, unit: UNIT_PERCENT },
    'backdropHueRotate': { index: 20, value: 0, unit: UNIT_DEG },
    'backdropInvert': { index: 30, value: 0, unit: UNIT_PERCENT },
    'backdropBrightness': { index: 40, value: 100, unit: UNIT_PERCENT },
    'backdropContrast': { index: 50, value: 100, unit: UNIT_PERCENT },
    'backdropDropshadow': { index: 60 },
    'backdropDropshadowOffsetX': { value: 10, unit: UNIT_PX },
    'backdropDropshadowOffsetY': { value: 20, unit: UNIT_PX },
    'backdropDropshadowBlurRadius': { value: 30, unit: UNIT_PX },
    'backdropDropshadowColor': { value: 'black', unit: UNIT_COLOR },
    'backdropOpacity': { index: 70, value: 100, unit: UNIT_PERCENT },
    'backdropSaturate': { index: 80, value: 100, unit: UNIT_PERCENT },
    'backdropSepia': { index: 90, value: 0, unit: UNIT_PERCENT }
};

var BACKDROP_DEFAULT_OBJECT_KEYS = Object.keys(BACKDROP_DEFAULT_OBJECT).filter(function (key) {
    return isNotUndefined(BACKDROP_DEFAULT_OBJECT[key].index);
});

var CLIP_PATH_DEFAULT_OBJECT = {
    clipPathType: 'none',
    clipPathSideType: CLIP_PATH_SIDE_TYPE_NONE,
    clipPathSvg: '',
    fitClipPathSize: false,
    clipText: false,
    clipPathRadiusX: undefined,
    clipPathRadiusY: undefined,
    clipPathCenterX: undefined,
    clipPathCenterY: undefined

    /* layer can has children layers. */
};var LAYER_DEFAULT_OBJECT = _extends({
    itemType: ITEM_TYPE_LAYER,
    is: IS_OBJECT,
    name: '',
    index: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    parentId: '',
    mixBlendMode: 'normal',
    selected: true,
    visible: true,
    x: pxUnit(0),
    y: pxUnit(0),
    width: pxUnit(200),
    height: pxUnit(200),
    rotate: 0,
    opacity: 1,
    fontFamily: 'serif',
    fontSize: '13px',
    fontWeight: 400,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    lineHeight: 1.6,
    content: ''
}, CLIP_PATH_DEFAULT_OBJECT, FILTER_DEFAULT_OBJECT, BACKDROP_DEFAULT_OBJECT);

var CIRCLE_DEFAULT_OBJECT = Object.assign({}, LAYER_DEFAULT_OBJECT, {
    type: ITEM_TYPE_CIRCLE,
    borderRadius: percentUnit(100),
    fixedRadius: true
});

var GROUP_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_GROUP,
    is: IS_OBJECT,
    name: '',
    index: 0,
    parentId: '',
    selected: true,
    visible: true,
    x: pxUnit(0),
    y: pxUnit(0)
};

var IMAGE_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_IMAGE,
    is: IS_ATTRIBUTE,
    type: 'static',
    fileType: '', // select file type as imagefile,  png, gif, jpg, svg if type is image 
    index: 0,
    parentId: '',
    angle: 90,
    color: 'red',
    radialType: 'ellipse',
    radialPosition: POSITION_CENTER,
    visible: true,
    isClipPath: false,
    backgroundRepeat: null,
    backgroundSize: null,
    backgroundSizeWidth: 0,
    backgroundSizeHeight: 0,
    backgroundOrigin: null,
    backgroundPositionX: undefined,
    backgroundPositionY: undefined,
    backgroundBlendMode: 'normal',
    backgroundColor: null,
    backgroundAttachment: null,
    backgroundClip: null
};

var BOXSHADOW_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_BOXSHADOW,
    is: IS_ATTRIBUTE,
    offsetX: pxUnit(0),
    offsetY: pxUnit(0),
    inset: false,
    blurRadius: pxUnit(0),
    spreadRadius: pxUnit(0),
    color: 'gray'
};

var TEXTSHADOW_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_TEXTSHADOW$1,
    is: IS_ATTRIBUTE,
    offsetX: pxUnit(0),
    offsetY: pxUnit(0),
    blurRadius: pxUnit(0),
    color: 'gray'
};

var COLORSTEP_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_COLORSTEP,
    is: IS_ATTRIBUTE,
    parentId: '',
    percent: 0,
    color: 'rgba(0, 0, 0, 0)'
};

var IMAGE_ITEM_TYPE_LINEAR = 'linear';
var IMAGE_ITEM_TYPE_REPEATING_LINEAR = 'repeating-linear';
var IMAGE_ITEM_TYPE_RADIAL = 'radial';
var IMAGE_ITEM_TYPE_REPEATING_RADIAL = 'repeating-radial';
var IMAGE_ITEM_TYPE_CONIC = 'conic';
var IMAGE_ITEM_TYPE_REPEATING_CONIC = 'repeating-conic';
var IMAGE_ITEM_TYPE_STATIC = 'static';
var IMAGE_ITEM_TYPE_IMAGE = 'image';

var CLIP_PATH_TYPE_NONE = 'none';
var CLIP_PATH_TYPE_CIRCLE = 'circle';
var CLIP_PATH_TYPE_ELLIPSE = 'ellipse';
var CLIP_PATH_TYPE_INSET = 'inset';
var CLIP_PATH_TYPE_POLYGON = 'polygon';
var CLIP_PATH_TYPE_SVG = 'svg';

var CLIP_PATH_SIDE_TYPE_NONE = 'none';
var CLIP_PATH_SIDE_TYPE_CLOSEST = 'closest-side';
var CLIP_PATH_SIDE_TYPE_FARTHEST = 'farthest-side';

var POSITION_TOP = 'top';
var POSITION_LEFT = 'left';
var POSITION_RIGHT = 'right';
var POSITION_BOTTOM = 'bottom';
var POSITION_CENTER = 'center';

var IMAGE_FILE_TYPE_JPG = 'jpg';
var IMAGE_FILE_TYPE_GIF = 'gif';
var IMAGE_FILE_TYPE_PNG = 'png';
var IMAGE_FILE_TYPE_SVG = 'svg';

var GUIDE_TYPE_VERTICAL = '|';
var GUIDE_TYPE_HORIZONTAL = '-';

function rotateDegree(angle) {
    var cx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : POSITION_CENTER;
    var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : POSITION_CENTER;

    // const r = F.radian(angle)

    return function (bitmap, done) {
        var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var newBitmap = createBitmap(bitmap.pixels.length, bitmap.width, bitmap.height);
        var width = bitmap.width;
        var height = bitmap.height;

        if (cx == POSITION_CENTER) {
            cx = Math.floor(width / 2);
        }

        if (cy == POSITION_CENTER) {
            cy = Math.floor(height / 2);
        }

        var translateMatrix = Matrix.CONSTANT.translate(-cx, -cy);
        var translateMatrix2 = Matrix.CONSTANT.translate(cx, cy);
        var shear1Matrix = Matrix.CONSTANT.shear1(angle);
        var shear2Matrix = Matrix.CONSTANT.shear2(angle);

        packXY(function (pixels, i, x, y) {
            // console.log(x, y, i)
            var arr = Matrix.multiply(translateMatrix, [x, y, 1]);

            arr = Matrix.multiply(shear1Matrix, arr).map(Math.round);
            arr = Matrix.multiply(shear2Matrix, arr).map(Math.round);
            arr = Matrix.multiply(shear1Matrix, arr).map(Math.round);
            arr = Matrix.multiply(translateMatrix2, arr);

            var _arr = arr,
                _arr2 = slicedToArray(_arr, 2),
                x1 = _arr2[0],
                y1 = _arr2[1];

            if (x1 < 0) return;
            if (y1 < 0) return;
            if (x1 > width - 1) return;
            if (y1 > height - 1) return;

            var endIndex = y1 * width + x1 << 2; //  bit 2 shift is  * 4  

            fillPixelColor(pixels, endIndex, bitmap.pixels, i);
        })(newBitmap, function () {
            done(newBitmap);
        }, opt);
    };
}

function rotate() {
    var degree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    degree = parseParamNumber$1(degree);
    degree = degree % 360;
    return function (bitmap, done) {
        var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        if (degree == 0) return bitmap;

        if (degree == 90 || degree == 270) {
            var newBitmap = createBitmap(bitmap.pixels.length, bitmap.height, bitmap.width);
        } else if (degree == 180) {
            var newBitmap = createBitmap(bitmap.pixels.length, bitmap.width, bitmap.height);
        } else {
            return rotateDegree(degree)(bitmap, done, opt);
        }
        packXY(function (pixels, i, x, y) {

            if (degree == 90) {
                var endIndex = x * newBitmap.width + (newBitmap.width - 1 - y) << 2; //  << 2 is equals to (multiply)* 4 
            } else if (degree == 270) {
                var endIndex = (newBitmap.height - 1 - x) * newBitmap.width + y << 2;
            } else if (degree == 180) {
                var endIndex = (newBitmap.height - 1 - y) * newBitmap.width + (newBitmap.width - 1 - x) << 2;
            }

            fillPixelColor(newBitmap.pixels, endIndex, bitmap.pixels, i);
        })(bitmap, function () {
            done(newBitmap);
        }, opt);
    };
}

function histogram$1() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'gray';
    var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var $realPoints = [];

    for (var i = 0; i < points.length - 1; i++) {
        var sp = points[i];
        var ep = points[i + 1];

        var distX = ep[0] - sp[0];
        var distY = ep[1] - sp[1];

        var rate = distY / distX;

        for (var realIndex = 0, start = sp[0]; realIndex < distX; realIndex++, start++) {
            $realPoints[start] = sp[1] + realIndex * rate;
        }
    }

    $realPoints[255] = 255;

    if (type === 'red') {
        return pixel(function () {
            $r = $realPoints[$r];
        }, {}, { $realPoints: $realPoints });
    } else if (type === 'green') {
        return pixel(function () {
            $g = $realPoints[$g];
        }, {}, { $realPoints: $realPoints });
    } else if (type === 'blue') {
        return pixel(function () {
            $b = $realPoints[$b];
        }, {}, { $realPoints: $realPoints });
    } else {
        return pixel(function () {

            var l = Color.RGBtoYCrCb($r, $g, $b);
            var c = Color.YCrCbtoRGB(clamp($realPoints[clamp(l.y)]), l.cr, l.cb, 0);
            $r = c.r;
            $g = c.g;
            $b = c.b;
        }, {}, { $realPoints: $realPoints });
    }
}

var image$1 = {
    crop: crop,
    resize: resize,
    flipH: flipH,
    flipV: flipV,
    rotate: rotate,
    rotateDegree: rotateDegree,
    histogram: histogram$1,
    'rotate-degree': rotateDegree
};

function bitonal(darkColor, lightColor) {
    var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    var $darkColor = Color$1.parse(darkColor);
    var $lightColor = Color$1.parse(lightColor);
    var $threshold = threshold;

    return pixel(function () {
        var thresholdColor = $r + $g + $b <= $threshold ? $darkColor : $lightColor;

        $r = thresholdColor.r;
        $g = thresholdColor.g;
        $b = thresholdColor.b;
    }, {
        $threshold: $threshold
    }, {
        $darkColor: $darkColor,
        $lightColor: $lightColor
    });
}

/*
 * @param {Number} amount  -100..100  ,  value < 0  is darken, value > 0 is brighten 
 */
function brightness$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    amount = parseParamNumber$1(amount);
    var $C = Math.floor(255 * (amount / 100));

    return pixel(function () {
        $r += $C;
        $g += $C;
        $b += $C;
    }, { $C: $C });
}

function brownie() {

    var $matrix = [0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, 0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, 0, 0, 0, 1];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

/**
 * 
 * @param {Number} amount from 0 to 100 
 */
function clip() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    amount = parseParamNumber$1(amount);
    var $C = Math.abs(amount) * 2.55;

    return pixel(function () {

        $r = $r > 255 - $C ? 255 : 0;
        $g = $g > 255 - $C ? 255 : 0;
        $b = $b > 255 - $C ? 255 : 0;
    }, { $C: $C });
}

/**
 * 
 * @param {*} amount   min = -128, max = 128 
 */
function contrast$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    amount = parseParamNumber$1(amount);
    var $C = Math.max((128 + amount) / 128, 0);

    return pixel(function () {
        $r *= $C;
        $g *= $C;
        $b *= $C;
    }, { $C: $C });
}

function gamma() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var $C = parseParamNumber$1(amount);
    return pixel(function () {
        $r = Math.pow($r / 255, $C) * 255;
        $g = Math.pow($g / 255, $C) * 255;
        $b = Math.pow($b / 255, $C) * 255;
    }, { $C: $C });
}

/**
 * F.gradient('red', 'blue', 'yellow', 'white', 10)
 * F.gradient('red, blue, yellow, white, 10')
 */
function gradient$1() {
    // 전체 매개변수 기준으로 파싱 
    // 색이 아닌 것 기준으로 scale 변수로 인식 

    var params = [].concat(Array.prototype.slice.call(arguments));

    if (params.length === 1 && isString(params[0])) {
        params = Color$1.convertMatchesArray(params[0]);
    }

    params = params.map(function (arg) {
        var res = Color$1.matches(arg);

        if (!res.length) {
            return { type: 'scale', value: arg };
        }

        return { type: 'param', value: arg };
    });

    var $scale = params.filter(function (it) {
        return it.type == 'scale';
    })[0];
    $scale = $scale ? +$scale.value : 256;

    params = params.filter(function (it) {
        return it.type == 'param';
    }).map(function (it) {
        return it.value;
    }).join(',');

    var $colors = Color$1.gradient(params, $scale).map(function (c) {
        var _Color$parse = Color$1.parse(c),
            r = _Color$parse.r,
            g = _Color$parse.g,
            b = _Color$parse.b,
            a = _Color$parse.a;

        return { r: r, g: g, b: b, a: a };
    });

    return pixel(function () {
        var colorIndex = clamp(Math.ceil($r * 0.2126 + $g * 0.7152 + $b * 0.0722));
        var newColorIndex = clamp(Math.floor(colorIndex * ($scale / 256)));
        var color = $colors[newColorIndex];

        $r = color.r;
        $g = color.g;
        $b = color.b;
        $a = clamp(Math.floor(color.a * 256));
    }, {}, { $colors: $colors, $scale: $scale });
}

function grayscale(amount) {
    amount = parseParamNumber$1(amount);
    var C = amount / 100;

    if (C > 1) C = 1;

    var $matrix = [0.2126 + 0.7874 * (1 - C), 0.7152 - 0.7152 * (1 - C), 0.0722 - 0.0722 * (1 - C), 0, 0.2126 - 0.2126 * (1 - C), 0.7152 + 0.2848 * (1 - C), 0.0722 - 0.0722 * (1 - C), 0, 0.2126 - 0.2126 * (1 - C), 0.7152 - 0.7152 * (1 - C), 0.0722 + 0.9278 * (1 - C), 0, 0, 0, 0, 1];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

/*
 * @param {Number} amount   0..360  
 */
function hue() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 360;

    var $C = parseParamNumber$1(amount);
    return pixel(function () {
        var hsv = Color.RGBtoHSV($r, $g, $b);

        // 0 ~ 360 
        var h = hsv.h;
        h += Math.abs($amount);
        h = h % 360;
        hsv.h = h;

        var rgb = Color.HSVtoRGB(hsv);

        $r = rgb.r;
        $g = rgb.g;
        $b = rgb.b;
    }, {
        $C: $C
    });
}

function invert() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    var $C = amount / 100;

    return pixel(function () {
        $r = (255 - $r) * $C;
        $g = (255 - $g) * $C;
        $b = (255 - $b) * $C;
    }, {
        $C: $C
    });
}

function kodachrome() {

    var $matrix = [1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 0, 0, 0, 1];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

function matrix() {
    var $a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var $b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var $c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var $d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var $e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var $f = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var $g = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var $h = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var $i = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var $j = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var $k = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
    var $l = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
    var $m = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var $n = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
    var $o = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    var $p = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;


    var $matrix = [$a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $o, $p];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

/**
 * 
 * @param {Number} amount 1..100
 */
function noise() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var $C = parseParamNumber$1(amount);
    return pixel(function () {
        var C = Math.abs($C) * 5;
        var min = -C;
        var max = C;
        var noiseValue = Math.round(min + Math.random() * (max - min));

        $r += noiseValue;
        $g += noiseValue;
        $b += noiseValue;
    }, {
        $C: $C
    });
}

function opacity() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    var $C = amount / 100;

    return pixel(function () {
        $a *= $C;
    }, { $C: $C });
}

function polaroid() {

    var $matrix = [1.438, -0.062, -0.062, 0, -0.122, 1.378, -0.122, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 1];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

/*
 * @param {Number} amount  -100..100 
 */
function saturation() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    var C = amount / 100;
    var L = 1 - Math.abs(C);

    var $matrix = [L, 0, 0, 0, 0, L, 0, 0, 0, 0, L, 0, 0, 0, 0, L];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

/*
 * @param {Number} amount  0..1 
 */
function sepia() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = parseParamNumber$1(amount);
    if (C > 1) C = 1;

    var $matrix = [0.393 + 0.607 * (1 - C), 0.769 - 0.769 * (1 - C), 0.189 - 0.189 * (1 - C), 0, 0.349 - 0.349 * (1 - C), 0.686 + 0.314 * (1 - C), 0.168 - 0.168 * (1 - C), 0, 0.272 - 0.272 * (1 - C), 0.534 - 0.534 * (1 - C), 0.131 + 0.869 * (1 - C), 0, 0, 0, 0, 1];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

function shade() {
    var redValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var greenValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var blueValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var $redValue = parseParamNumber$1(redValue);
    var $greenValue = parseParamNumber$1(greenValue);
    var $blueValue = parseParamNumber$1(blueValue);

    return pixel(function () {
        $r *= $redValue;
        $g *= $greenValue;
        $b *= $blueValue;
    }, {
        $redValue: $redValue,
        $greenValue: $greenValue,
        $blueValue: $blueValue
    });
}

function shift() {

    var $matrix = [1.438, -0.062, -0.062, 0, -0.122, 1.378, -0.122, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 1];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

/**
 * change the relative darkness of (a part of an image) by overexposure to light.
 * @param {*} r 
 * @param {*} g 
 * @param {*} b 
 */
function solarize(redValue, greenValue, blueValue) {
    var $redValue = parseParamNumber$1(redValue);
    var $greenValue = parseParamNumber$1(greenValue);
    var $blueValue = parseParamNumber$1(blueValue);
    return pixel(function () {
        $r = $r < $redValue ? 255 - $r : $r;
        $g = $g < $greenValue ? 255 - $g : $g;
        $b = $b < $blueValue ? 255 - $b : $b;
    }, {
        $redValue: $redValue, $greenValue: $greenValue, $blueValue: $blueValue
    });
}

function technicolor() {

    var $matrix = [1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 0, 0, 0, 1];

    return pixel(function () {
        $r = $matrix[0] * $r + $matrix[1] * $g + $matrix[2] * $b + $matrix[3] * $a;
        $g = $matrix[4] * $r + $matrix[5] * $g + $matrix[6] * $b + $matrix[7] * $a;
        $b = $matrix[8] * $r + $matrix[9] * $g + $matrix[10] * $b + $matrix[11] * $a;
        $a = $matrix[12] * $r + $matrix[13] * $g + $matrix[14] * $b + $matrix[15] * $a;
    }, {
        $matrix: $matrix
    });
}

function thresholdColor() {
    var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var hasColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var $scale = parseParamNumber$1(scale);
    amount = parseParamNumber$1(amount);
    var $C = amount / 100;
    var $hasColor = hasColor;

    return pixel(function () {
        // refer to Color.brightness 
        var v = $C * Math.ceil($r * 0.2126 + $g * 0.7152 + $b * 0.0722) >= $scale ? 255 : 0;

        if ($hasColor) {

            if (v == 0) {
                $r = 0;
                $g = 0;
                $b = 0;
            }
        } else {
            var value = Math.round(v);
            $r = value;
            $g = value;
            $b = value;
        }
    }, {
        $C: $C, $scale: $scale, $hasColor: $hasColor
    });
}

/*
 * @param {Number} amount  0..100 
 */
function threshold() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  return thresholdColor(scale, amount, false);
}

function tint () {
    var redTint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var greenTint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var blueTint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var $redTint = parseParamNumber(redTint);
    var $greenTint = parseParamNumber(greenTint);
    var $blueTint = parseParamNumber(blueTint);
    return pixel(function () {

        $r += (255 - $r) * $redTint;
        $g += (255 - $g) * $greenTint;
        $b += (255 - $b) * $blueTint;
    }, {
        $redTint: $redTint,
        $greenTint: $greenTint,
        $blueTint: $blueTint
    });
}

var pixel$1 = {
    bitonal: bitonal,
    brightness: brightness$1,
    brownie: brownie,
    clip: clip,
    contrast: contrast$1,
    gamma: gamma,
    gradient: gradient$1,
    grayscale: grayscale,
    hue: hue,
    invert: invert,
    kodachrome: kodachrome,
    matrix: matrix,
    noise: noise,
    opacity: opacity,
    polaroid: polaroid,
    saturation: saturation,
    sepia: sepia,
    shade: shade,
    shift: shift,
    solarize: solarize,
    technicolor: technicolor,
    threshold: threshold,
    'threshold-color': thresholdColor,
    tint: tint
};

function blur () {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    amount = parseParamNumber$1(amount);

    return convolution(createBlurMatrix(amount));
}

/*
 * carve, mold, or stamp a design on (a surface) so that it stands out in relief.
 * 
 * @param {Number} amount   0.0 .. 4.0 
 */
function emboss() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

    amount = parseParamNumber$1(amount);
    return convolution([amount * -2.0, -amount, 0.0, -amount, 1.0, amount, 0.0, amount, amount * 2.0]);
}

function gaussianBlur() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    var C = amount / 100;

    return convolution(weight([1, 2, 1, 2, 4, 2, 1, 2, 1], 1 / 16 * C));
}

function gaussianBlur5x() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    var C = amount / 100;
    return convolution(weight([1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1], 1 / 256 * C));
}

function grayscale2() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    return convolution(weight([0.3, 0.3, 0.3, 0, 0, 0.59, 0.59, 0.59, 0, 0, 0.11, 0.11, 0.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], amount / 100));
}

function identity() {
    return convolution([0, 0, 0, 0, 1, 0, 0, 0, 0]);
}

function kirschHorizontal() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    count = parseParamNumber$1(count);
    return convolution([5, 5, 5, -3, 0, -3, -3, -3, -3]);
}

function kirschVertical() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    count = parseParamNumber$1(count);
    return convolution([5, -3, -3, 5, 0, -3, 5, -3, -3]);
}

function laplacian() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    return convolution(weight([-1, -1, -1, -1, 8, -1, -1, -1, -1], amount / 100));
}

function laplacian5x() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    return convolution(weight([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], amount / 100));
}

function motionBlur() {
    return convolution(weight([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 1 / 9));
}

function motionBlur2() {
    return convolution(weight([1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], 1 / 9));
}

function motionBlur3() {
    return convolution(weight([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 1 / 9));
}

function negative() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    return convolution(weight([-1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1], amount / 100));
}

function sepia2() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    return convolution(weight([0.393, 0.349, 0.272, 0, 0, 0.769, 0.686, 0.534, 0, 0, 0.189, 0.168, 0.131, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], amount / 100));
}

function sharpen() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    return convolution(weight([0, -1, 0, -1, 5, -1, 0, -1, 0], amount / 100));
}

function sobelHorizontal() {
    return convolution([-1, -2, -1, 0, 0, 0, 1, 2, 1]);
}

function sobelVertical() {
    return convolution([-1, 0, 1, -2, 0, 2, -1, 0, 1]);
}

/*

StackBlur - a fast almost Gaussian Blur For Canvas

Version: 	0.5
Author:		Mario Klingemann
Contact: 	mario@quasimondo.com
Website:	http://www.quasimondo.com/StackBlurForCanvas
Twitter:	@quasimondo

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Or support me on flattr: 
https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

Copyright (c) 2010 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}

function stackBlurImage(bitmap, radius, blurAlphaChannel) {

    if (blurAlphaChannel) return stackBlurCanvasRGBA(bitmap, 0, 0, radius);else return stackBlurCanvasRGB(bitmap, 0, 0, radius);
}

function stackBlurCanvasRGBA(bitmap, top_x, top_y, radius) {
    if (isNaN(radius) || radius < 1) return bitmap;
    radius |= 0;

    var pixels = bitmap.pixels,
        width = bitmap.width,
        height = bitmap.height;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

    var div = radius + radius + 1;
    var widthMinus1 = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++) {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++) {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
            a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
            pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
            if (pa != 0) {
                pa = 255 / pa;
                pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
                pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
                pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
            } else {
                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

            r_in_sum += stackIn.r = pixels[p];
            g_in_sum += stackIn.g = pixels[p + 1];
            b_in_sum += stackIn.b = pixels[p + 2];
            a_in_sum += stackIn.a = pixels[p + 3];

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            a_sum += a_in_sum;

            stackIn = stackIn.next;

            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;
            a_out_sum += pa = stackOut.a;

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }

    for (x = 0; x < width; x++) {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++) {
            yi = yp + x << 2;

            r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
            a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;

            if (i < heightMinus1) {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
            p = yi << 2;
            pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
            if (pa > 0) {
                pa = 255 / pa;
                pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
                pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
                pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
            } else {
                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

            r_sum += r_in_sum += stackIn.r = pixels[p];
            g_sum += g_in_sum += stackIn.g = pixels[p + 1];
            b_sum += b_in_sum += stackIn.b = pixels[p + 2];
            a_sum += a_in_sum += stackIn.a = pixels[p + 3];

            stackIn = stackIn.next;

            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;
            a_out_sum += pa = stackOut.a;

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += width;
        }
    }

    return bitmap;
}

function stackBlurCanvasRGBA(bitmap, top_x, top_y, radius) {
    if (isNaN(radius) || radius < 1) return bitmap;
    radius |= 0;

    var pixels = bitmap.pixels,
        width = bitmap.width,
        height = bitmap.height;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, r_out_sum, g_out_sum, b_out_sum, r_in_sum, g_in_sum, b_in_sum, pr, pg, pb, rbs;

    var div = radius + radius + 1;
    var widthMinus1 = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++) {
        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++) {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[p + 2]) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
            pixels[yi] = r_sum * mul_sum >> shg_sum;
            pixels[yi + 1] = g_sum * mul_sum >> shg_sum;
            pixels[yi + 2] = b_sum * mul_sum >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

            r_in_sum += stackIn.r = pixels[p];
            g_in_sum += stackIn.g = pixels[p + 1];
            b_in_sum += stackIn.b = pixels[p + 2];

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;

            stackIn = stackIn.next;

            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }

    for (x = 0; x < width; x++) {
        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++) {
            yi = yp + x << 2;

            r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;

            if (i < heightMinus1) {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
            p = yi << 2;
            pixels[p] = r_sum * mul_sum >> shg_sum;
            pixels[p + 1] = g_sum * mul_sum >> shg_sum;
            pixels[p + 2] = b_sum * mul_sum >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

            r_sum += r_in_sum += stackIn.r = pixels[p];
            g_sum += g_in_sum += stackIn.g = pixels[p + 1];
            b_sum += b_in_sum += stackIn.b = pixels[p + 2];

            stackIn = stackIn.next;

            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += width;
        }
    }

    return bitmap;
}

function stackBlur () {
    var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var hasAlphaChannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    radius = parseParamNumber$1(radius);

    return function (bitmap, done) {
        var newBitmap = stackBlurImage(bitmap, radius, hasAlphaChannel);

        done(newBitmap);
    };
}

function transparency() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amount = parseParamNumber$1(amount);
    return convolution(weight([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 1], amount / 100));
}

function unsharpMasking() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 256;

    amount = parseParamNumber$1(amount);
    return convolution(weight([1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, -476, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1], -1 / amount));
}

var matrix$1 = {
     blur: blur,
     emboss: emboss,
     gaussianBlur: gaussianBlur,
     'gaussian-blur': gaussianBlur,
     gaussianBlur5x: gaussianBlur5x,
     'gaussian-blur-5x': gaussianBlur5x,
     grayscale2: grayscale2,
     normal: identity,
     kirschHorizontal: kirschHorizontal,
     'kirsch-horizontal': kirschHorizontal,
     kirschVertical: kirschVertical,
     'kirsch-vertical': kirschVertical,
     laplacian: laplacian,
     laplacian5x: laplacian5x,
     'laplacian-5x': laplacian5x,
     motionBlur: motionBlur,
     'motion-blur': motionBlur,
     motionBlur2: motionBlur2,
     'motion-blur-2': motionBlur2,
     motionBlur3: motionBlur3,
     'motion-blur-3': motionBlur3,
     negative: negative,
     sepia2: sepia2,
     sharpen: sharpen,
     sobelHorizontal: sobelHorizontal,
     'sobel-horizontal': sobelHorizontal,
     sobelVertical: sobelVertical,
     'sobel-vertical': sobelVertical,
     stackBlur: stackBlur,
     'stack-blur': stackBlur,
     transparency: transparency,
     unsharpMasking: unsharpMasking,
     'unsharp-masking': unsharpMasking
};

function kirsch() {
    return filter$1('kirsch-horizontal kirsch-vertical');
}

function sobel() {
    return filter$1('sobel-horizontal sobel-vertical');
}

function vintage() {
    return filter$1('brightness(15) saturation(-20) gamma(1.8)');
}

var multi$2 = {
    kirsch: kirsch,
    sobel: sobel,
    vintage: vintage
};

var FilterList = _extends({}, image$1, pixel$1, matrix$1, multi$2);

var _functions;

var makeId = 0;

var functions$1 = (_functions = {
    partial: partial,
    multi: multi$1,
    merge: merge$1,
    weight: weight,
    repeat: repeat,
    colorMatrix: colorMatrix,
    each: each$1,
    eachXY: eachXY,
    createRandomCount: createRandomCount,
    createRandRange: createRandRange,
    createBitmap: createBitmap,
    createBlurMatrix: createBlurMatrix,
    pack: pack$1,
    packXY: packXY,
    pixel: pixel,
    getBitmap: getBitmap,
    putBitmap: putBitmap,
    radian: radian,
    convolution: convolution,
    parseParamNumber: parseParamNumber$1,
    px2em: px2em,
    px2percent: px2percent,
    em2percent: em2percent,
    em2px: em2px,
    percent2em: percent2em,
    percent2px: percent2px,
    filter: filter$1,
    clamp: clamp$1,
    fillColor: fillColor,
    fillPixelColor: fillPixelColor
}, defineProperty(_functions, 'multi', multi$1), defineProperty(_functions, 'merge', merge$1), defineProperty(_functions, 'matches', matches$1), defineProperty(_functions, 'parseFilter', parseFilter), defineProperty(_functions, 'partial', partial), _functions);

var LocalFilter = functions$1;

function weight(arr) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return arr.map(function (i) {
        return i * num;
    });
}

function repeat(value$$1, num) {
    var arr = new Array(num);
    for (var i = 0; i < num; i++) {
        arr[i] = value$$1;
    }
    return arr;
}

function colorMatrix(pixels, i, matrix) {
    var r = pixels[i],
        g = pixels[i + 1],
        b = pixels[i + 2],
        a = pixels[i + 3];

    fillColor(pixels, i, matrix[0] * r + matrix[1] * g + matrix[2] * b + matrix[3] * a, matrix[4] * r + matrix[5] * g + matrix[6] * b + matrix[7] * a, matrix[8] * r + matrix[9] * g + matrix[10] * b + matrix[11] * a, matrix[12] * r + matrix[13] * g + matrix[14] * b + matrix[15] * a);
}

function makeFilter$1(filter) {

    if (isFunction(filter)) {
        return filter;
    }

    if (isString(filter)) {
        filter = [filter];
    }

    var filterName = filter.shift();

    if (isFunction(filterName)) {
        return filterName;
    }

    var params = filter;

    var filterFunction = FilterList[filterName] || LocalFilter[filterName];

    if (!filterFunction) {
        throw new Error(filterName + ' is not filter. please check filter name.');
    }
    return filterFunction.apply(filterFunction, params);
}

function forLoop(max) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var callback = arguments[3];
    var done = arguments[4];
    var functionDumpCount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10000;
    var frameTimer = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'full';
    var loopCount = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 50;

    var runIndex = index;
    var timer = function timer(callback) {
        setTimeout(callback, 0);
    };

    if (frameTimer == 'requestAnimationFrame') {
        timer = requestAnimationFrame;
        functionDumpCount = 1000;
    }

    if (frameTimer == 'full') {
        /* only for loop  */
        timer = null;
        functionDumpCount = max;
    }

    function makeFunction() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

        var arr = [].concat(toConsumableArray(Array(count)));

        var functionStrings = arr.map(function (countIndex) {
            return 'cri = ri + i * s; if (cri >= mx) return {currentRunIndex: cri, i: null}; c(cri); i++;';
        }).join('\n');

        var smallLoopFunction = new Function('ri', 'i', 's', 'mx', 'c', '\n            let cri = ri;\n            \n            ' + functionStrings + '\n            \n            return {currentRunIndex: cri, i: i} \n        ');

        return smallLoopFunction;
    }

    function runCallback() {

        var smallLoopFunction = makeFunction(loopCount); // loop is call  20 callbacks at once 

        var currentRunIndex = runIndex;
        var ret = {};
        var i = 0;
        while (i < functionDumpCount) {
            ret = smallLoopFunction(runIndex, i, step, max, callback);

            if (ret.i == null) {
                currentRunIndex = ret.currentRunIndex;
                break;
            }

            i = ret.i;
            currentRunIndex = ret.currentRunIndex;
        }

        nextCallback(currentRunIndex);
    }

    function nextCallback(currentRunIndex) {
        if (currentRunIndex) {
            runIndex = currentRunIndex;
        } else {
            runIndex += step;
        }

        if (runIndex >= max) {
            done();
            return;
        }

        if (timer) timer(runCallback);else runCallback();
    }

    runCallback();
}

function each$1(len, callback, done) {
    var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


    forLoop(len, 0, 4, function (i) {
        callback(i, i >> 2 /* xyIndex */);
    }, function () {
        done();
    }, opt.functionDumpCount, opt.frameTimer, opt.loopCount);
}

function eachXY(len, width, callback, done) {
    var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};


    forLoop(len, 0, 4, function (i) {
        var xyIndex = i >> 2;
        callback(i, xyIndex % width, Math.floor(xyIndex / width));
    }, function () {
        done();
    }, opt.functionDumpCount, opt.frameTimer, opt.loopCount);
}

function createRandRange(min, max, count) {
    var result = [];

    for (var i = 1; i <= count; i++) {
        var num = Math.random() * (max - min) + min;
        var sign = Math.floor(Math.random() * 10) % 2 == 0 ? -1 : 1;
        result.push(sign * num);
    }

    result.sort();

    var centerIndex = Math.floor(count >> 1);
    var a = result[centerIndex];
    result[centerIndex] = result[0];
    result[0] = a;

    return result;
}

function createRandomCount() {
    return [3 * 3, 4 * 4, 5 * 5, 6 * 6, 7 * 7, 8 * 8, 9 * 9, 10 * 10].sort(function (a, b) {
        return 0.5 - Math.random();
    })[0];
}

function createBitmap(length, width, height) {
    return { pixels: new Uint8ClampedArray(length), width: width, height: height };
}

function putPixel(dstBitmap, srcBitmap, startX, startY) {

    var len = srcBitmap.pixels.length / 4;
    var dstX = 0,
        dstY = 0,
        x = 0,
        y = 0,
        srcIndex = 0,
        dstIndex = 0;
    for (var i = 0; i < len; i++) {
        x = i % srcBitmap.width, y = Math.floor(i / srcBitmap.width);

        dstX = startX + x;
        dstY = startY + y;

        if (dstX > dstBitmap.width) continue;
        if (dstY > dstBitmap.height) continue;

        srcIndex = y * srcBitmap.width + x << 2;
        dstIndex = dstY * dstBitmap.width + dstX << 2;

        dstBitmap.pixels[dstIndex] = srcBitmap.pixels[srcIndex];
        dstBitmap.pixels[dstIndex + 1] = srcBitmap.pixels[srcIndex + 1];
        dstBitmap.pixels[dstIndex + 2] = srcBitmap.pixels[srcIndex + 2];
        dstBitmap.pixels[dstIndex + 3] = srcBitmap.pixels[srcIndex + 3];
    }
}

function getPixel(srcBitmap, dstBitmap, startX, startY) {
    var len = dstBitmap.pixels.length >> 2;
    var srcX = 0,
        srcY = 0,
        x = 0,
        y = 0,
        srcIndex = 0,
        dstIndex = 0;
    for (var i = 0; i < len; i++) {
        var x = i % dstBitmap.width,
            y = Math.floor(i / dstBitmap.width);

        srcX = startX + x;
        srcY = startY + y;

        if (srcX > srcBitmap.width) continue;
        if (srcY > srcBitmap.height) continue;

        srcIndex = srcY * srcBitmap.width + srcX << 2;
        dstIndex = y * dstBitmap.width + x << 2;

        dstBitmap.pixels[dstIndex] = srcBitmap.pixels[srcIndex];
        dstBitmap.pixels[dstIndex + 1] = srcBitmap.pixels[srcIndex + 1];
        dstBitmap.pixels[dstIndex + 2] = srcBitmap.pixels[srcIndex + 2];
        dstBitmap.pixels[dstIndex + 3] = srcBitmap.pixels[srcIndex + 3];
    }
}

function cloneBitmap(bitmap) {
    var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


    var width = bitmap.width + padding;
    var height = bitmap.height + padding;

    var newBitmap = { pixels: new Uint8ClampedArray(width * height * 4), width: width, height: height };

    return newBitmap;
}

function getBitmap(bitmap, area) {
    return Canvas.getBitmap(bitmap, area);
}

function putBitmap(bitmap, subBitmap, area) {
    return Canvas.putBitmap(bitmap, subBitmap, area);
}

function parseParamNumber$1(param, callback) {
    if (isString(param)) {
        param = param.replace(/deg|px|\%|em/g, '');
    }
    if (isFunction(callback)) {
        return callback(+param);
    }
    return +param;
}







function px2percent(px, maxValue) {
    return round(px / maxValue * 100, 100);
}

function px2em(px, maxValue) {
    var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;

    return round(px / fontSize, 100);
}

function em2px(em$$1, maxValue) {
    var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;

    return Math.floor(round(em$$1 * fontSize, 100));
}

function em2percent(em$$1, maxValue) {
    return px2percent(em2px(em$$1), maxValue);
}

function percent2px(percent$$1, maxValue) {
    return Math.floor(round(maxValue * (percent$$1 / 100), 100));
}

function percent2em(percent$$1, maxValue) {
    return px2em(percent2px(percent$$1, maxValue), maxValue);
}

var filter_regexp = /(([\w_\-]+)(\(([^\)]*)\))?)+/gi;
function pack$1(callback) {
    return function (bitmap, done) {
        each$1(bitmap.pixels.length, function (i, xyIndex) {
            callback(bitmap.pixels, i, xyIndex, bitmap.pixels[i], bitmap.pixels[i + 1], bitmap.pixels[i + 2], bitmap.pixels[i + 3]);
        }, function () {
            done(bitmap);
        });
    };
}

function makePrebuildUserFilterList(arr) {

    var codeString = arr.map(function (it) {
        return ' \n            ' + it.userFunction.$preContext + '\n\n            ' + it.userFunction.$preCallbackString + '\n\n            $r = clamp($r); $g = clamp($g); $b = clamp($b); $a = clamp($a);\n        ';
    }).join('\n\n');

    var rootContextObject = { clamp: clamp$1, Color: Color$1 };
    arr.forEach(function (it) {
        Object.assign(rootContextObject, it.userFunction.rootContextObject);
    });

    var rootContextDefine = 'const ' + Object.keys(rootContextObject).map(function (key) {
        return ' ' + key + ' = $rc.' + key + ' ';
    }).join(',');

    var FunctionCode = ' \n    let $r = $p[$pi], $g = $p[$pi+1], $b = $p[$pi+2], $a = $p[$pi+3];\n    \n    ' + rootContextDefine + '\n\n    ' + codeString + '\n    \n    $p[$pi] = $r; $p[$pi+1] = $g; $p[$pi+2] = $b; $p[$pi+3] = $a;\n    ';

    var userFunction = new Function('$p', '$pi', '$rc', FunctionCode);

    return function ($pixels, $pixelIndex) {
        userFunction($pixels, $pixelIndex, rootContextObject);
    };
}

function makeUserFilterFunctionList(arr) {
    var rootContextObject = {};
    var list = arr.map(function (it) {
        var newKeys = [];

        Object.keys(it.context).forEach(function (key, i) {
            newKeys[key] = 'n$' + makeId++ + key + '$';
        });

        Object.keys(it.rootContext).forEach(function (key, i) {
            newKeys[key] = 'r$' + makeId++ + key + '$';

            rootContextObject[newKeys[key]] = it.rootContext[key];
        });

        var preContext = Object.keys(it.context).filter(function (key) {
            if (isNumber(it.context[key]) || isString(it.context[key])) {
                return false;
            } else if (Array.isArray(it.context[key])) {
                if (isNumber(it.context[key][0]) || isString(it.context[key][0])) {
                    return false;
                }
            }

            return true;
        }).map(function (key, i) {
            return [newKeys[key], JSON.stringify(it.context[key])].join(' = ');
        });

        var preCallbackString = it.callback.toString().split("{");

        preCallbackString.shift();
        preCallbackString = preCallbackString.join("{");
        preCallbackString = preCallbackString.split("}");
        preCallbackString.pop();
        preCallbackString = preCallbackString.join("}");

        Object.keys(newKeys).forEach(function (key) {
            var newKey = newKeys[key];

            if (isNumber(it.context[key]) || isString(it.context[key])) {
                preCallbackString = preCallbackString.replace(new RegExp("\\" + key, "g"), it.context[key]);
            } else if (isArray(it.context[key])) {
                if (isNumber(it.context[key][0]) || isString(it.context[key][0])) {
                    it.context[key].forEach(function (item, index) {
                        preCallbackString = preCallbackString.replace(new RegExp("\\" + key + '\\[' + index + '\\]', "g"), item);
                    });
                } else {
                    preCallbackString = preCallbackString.replace(new RegExp("\\" + key, "g"), newKey);
                }
            } else {
                preCallbackString = preCallbackString.replace(new RegExp("\\" + key, "g"), newKey);
            }
        });

        return { preCallbackString: preCallbackString, preContext: preContext };
    });

    var preContext = list.map(function (it, i) {
        return it.preContext.length ? 'const ' + it.preContext + ';' : "";
    }).join('\n\n');

    var preCallbackString = list.map(function (it) {
        return it.preCallbackString;
    }).join('\n\n');

    var FunctionCode = ' \n    let $r = $pixels[$pixelIndex], $g = $pixels[$pixelIndex+1], $b = $pixels[$pixelIndex+2], $a = $pixels[$pixelIndex+3];\n\n    ' + preContext + '\n\n    ' + preCallbackString + '\n    \n    $pixels[$pixelIndex] = $r\n    $pixels[$pixelIndex+1] = $g \n    $pixels[$pixelIndex+2] = $b   \n    $pixels[$pixelIndex+3] = $a   \n    ';

    var userFunction = new Function('$pixels', '$pixelIndex', '$clamp', '$Color', FunctionCode);

    userFunction.$preCallbackString = preCallbackString;
    userFunction.$preContext = preContext;
    userFunction.rootContextObject = rootContextObject;

    return userFunction;
}

function makeUserFilterFunction(callback) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rootContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return makeUserFilterFunctionList([{ callback: callback, context: context, rootContext: rootContext }]);
}

function pixel(callback) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rootContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var userFunction = makeUserFilterFunction(callback, context, rootContext);

    var returnCallback = function returnCallback(bitmap, done) {};

    returnCallback.userFunction = userFunction;

    return returnCallback;
}

var ColorListIndex = [0, 1, 2, 3];

function swapColor(pixels, startIndex, endIndex) {

    ColorListIndex.forEach(function (i) {
        var temp = pixels[startIndex + i];
        pixels[startIndex + i] = pixels[endIndex + i];
        pixels[endIndex + i] = temp;
    });
}

function packXY(callback) {
    return function (bitmap, done) {
        var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        eachXY(bitmap.pixels.length, bitmap.width, function (i, x, y) {
            callback(bitmap.pixels, i, x, y);
        }, function () {
            done(bitmap);
        }, opt);
    };
}

function radian(degree) {
    return Matrix.CONSTANT.radian(degree);
}

function createBlurMatrix() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

    var count = Math.pow(amount, 2);
    var value$$1 = 1 / count;
    return repeat(value$$1, count);
}

function fillColor(pixels, i, r, g, b, a) {
    if (arguments.length == 3) {
        var _arguments$ = arguments[2],
            r = _arguments$.r,
            g = _arguments$.g,
            b = _arguments$.b,
            a = _arguments$.a;
    }

    if (isNumber(r)) {
        pixels[i] = r;
    }
    if (isNumber(g)) {
        pixels[i + 1] = g;
    }
    if (isNumber(b)) {
        pixels[i + 2] = b;
    }
    if (isNumber(a)) {
        pixels[i + 3] = a;
    }
}

function fillPixelColor(targetPixels, targetIndex, sourcePixels, sourceIndex) {
    fillColor(targetPixels, targetIndex, sourcePixels[sourceIndex], sourcePixels[sourceIndex + 1], sourcePixels[sourceIndex + 2], sourcePixels[sourceIndex + 3]);
}



function createWeightTable(weights) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;

    var weightTable = [];

    weightTable = weights.map(function (w, i) {
        return [];
    });

    weights.forEach(function (w, i) {

        if (w != 0) {
            var data = weightTable[i];

            for (var i = min; i <= max; i++) {
                data[i] = w * i;
            }
        }
    });

    return weightTable;
}

function createSubPixelWeightFunction(weights, weightTable, width, height, opaque) {

    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var alphaFac = opaque ? 1 : 0;

    var FunctionCode = 'let r = 0, g = 0, b = 0, a = 0, scy = 0, scx =0, si = 0; ';
    var R = [];
    var G = [];
    var B = [];
    var A = [];
    weights.forEach(function (wt, index) {
        var cy = Math.floor(index / side);
        var cx = index % side;
        var distY = cy - halfSide;
        var distX = cx - halfSide;

        if (wt == 0) {
            return;
        }

        R.push('$t[' + index + '][$sp[(($sy + (' + distY + ')) * ' + width + ' + ($sx + (' + distX + '))) * 4]]');
        G.push('$t[' + index + '][$sp[(($sy + (' + distY + ')) * ' + width + ' + ($sx + (' + distX + '))) * 4 + 1]]');
        B.push('$t[' + index + '][$sp[(($sy + (' + distY + ')) * ' + width + ' + ($sx + (' + distX + '))) * 4 + 2]]');
        A.push('$t[' + index + '][$sp[(($sy + (' + distY + ')) * ' + width + ' + ($sx + (' + distX + '))) * 4 + 3]]');
    });

    FunctionCode += 'r = ' + R.join(' + ') + '; g = ' + G.join(' + ') + '; b = ' + B.join(' + ') + '; a = ' + A.join(' + ') + ';';
    FunctionCode += '$dp[$di] = r; $dp[$di+1] = g;$dp[$di+2] = b;$dp[$di+3] = a + (' + alphaFac + ')*(255-a); ';

    // console.log(FunctionCode)

    var subPixelFunction = new Function('$dp', '$sp', '$di', '$sx', '$sy', '$t', FunctionCode);

    return function ($dp, $sp, $di, $sx, $sy) {
        subPixelFunction($dp, $sp, $di, $sx, $sy, weightTable);
    };
}

function convolution(weights) {
    var opaque = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var weightTable = createWeightTable(weights);
    return function (bitmap, done) {
        var side = Math.round(Math.sqrt(weights.length));
        var padding = side * 2;

        // 원본 크기를 늘림 
        var sourceBitmap = cloneBitmap(bitmap, padding);

        // 원본 데이타 복사 
        putPixel(sourceBitmap, bitmap, side, side);

        // 최종 아웃풋 
        var newBitmap = createBitmap(sourceBitmap.pixels.length, sourceBitmap.width, sourceBitmap.height);

        // 마지막 원본 아웃풋 
        var returnBitmap = createBitmap(bitmap.pixels.length, bitmap.width, bitmap.height);

        var subPixelWeightFunction = createSubPixelWeightFunction(weights, weightTable, sourceBitmap.width, sourceBitmap.height, opaque);

        var len = bitmap.pixels.length / 4;
        for (var i = 0; i < len; i++) {
            var xyIndex = i,
                x = xyIndex % bitmap.width + side,
                y = Math.floor(xyIndex / bitmap.width) + side;

            subPixelWeightFunction(newBitmap.pixels, sourceBitmap.pixels, (y * sourceBitmap.width + x) * 4, x, y);
        }

        getPixel(newBitmap, returnBitmap, side, side);
        done(returnBitmap);
    };
}

function matches$1(str) {
    var ret = Color$1.convertMatches(str);
    var matches = ret.str.match(filter_regexp);
    var result = [];

    if (!matches) {
        return result;
    }

    result = matches.map(function (it) {
        return { filter: it, origin: Color$1.reverseMatches(it, ret.matches) };
    });

    var pos = { next: 0 };
    result = result.map(function (item) {

        var startIndex = str.indexOf(item.origin, pos.next);

        item.startIndex = startIndex;
        item.endIndex = startIndex + item.origin.length;

        item.arr = parseFilter(item.origin);

        pos.next = item.endIndex;

        return item;
    }).filter(function (it) {
        if (!it.arr.length) return false;
        return true;
    });

    return result;
}

/**
 * Filter Parser 
 * 
 * F.parseFilter('blur(30)') == ['blue', '30']
 * F.parseFilter('gradient(white, black, 3)') == ['gradient', 'white', 'black', '3']
 * 
 * @param {String} filterString 
 */
function parseFilter(filterString) {

    var ret = Color$1.convertMatches(filterString);
    var matches = ret.str.match(filter_regexp);

    if (!matches[0]) {
        return [];
    }

    var arr = matches[0].split('(');

    var filterName = arr.shift();
    var filterParams = [];

    if (arr.length) {
        filterParams = arr.shift().split(')')[0].split(',').map(function (f) {
            return Color$1.reverseMatches(f, ret.matches);
        });
    }

    var result = [filterName].concat(toConsumableArray(filterParams)).map(Color$1.trim);

    return result;
}

function clamp$1(num) {
    return Math.min(255, num);
}

function filter$1(str) {
    return merge$1(matches$1(str).map(function (it) {
        return it.arr;
    }));
}

function makeGroupedFilter$1() {
    var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var groupedFilter = [];
    var group = [];
    for (var i = 0, len = filters.length; i < len; i++) {
        var f = filters[i];

        if (f.userFunction) {
            group.push(f);
        } else {
            if (group.length) {
                groupedFilter.push([].concat(toConsumableArray(group)));
            }
            groupedFilter.push(f);
            group = [];
        }
    }

    if (group.length) {
        groupedFilter.push([].concat(toConsumableArray(group)));
    }

    groupedFilter.forEach(function (filter, index) {
        if (Array.isArray(filter)) {
            groupedFilter[index] = function () {
                var userFunction = makePrebuildUserFilterList(filter);
                // console.log(userFunction)
                return function (bitmap, done) {

                    for (var i = 0, len = bitmap.pixels.length; i < len; i += 4) {
                        userFunction(bitmap.pixels, i);
                    }

                    done(bitmap);
                    // forLoop(bitmap.pixels.length, 0, 4, function (i) {
                    //     userFunction(bitmap.pixels, i)
                    // }, function () {
                    //     done(bitmap)
                    // })
                };
            }();
        }
    });

    return groupedFilter;
}

/** 
 * 
 * multiply filters
 * 
 * ImageFilter.multi('blur', 'grayscale', 'sharpen', ['blur', 3], function (bitmap) {  return bitmap });
 * 
 */
function multi$1() {
    for (var _len = arguments.length, filters = Array(_len), _key = 0; _key < _len; _key++) {
        filters[_key] = arguments[_key];
    }

    filters = filters.map(function (filter) {
        return makeFilter$1(filter);
    }).filter(function (f) {
        return f;
    });

    filters = makeGroupedFilter$1(filters);

    var max = filters.length;

    return function (bitmap, done) {
        var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        var currentBitmap = bitmap;
        var index = 0;

        function runFilter() {
            filters[index].call(null, currentBitmap, function (nextBitmap) {
                currentBitmap = nextBitmap;

                nextFilter();
            }, opt);
        }

        function nextFilter() {
            index++;

            if (index >= max) {
                done(currentBitmap);
                return;
            }

            runFilter();
        }

        runFilter();
    };
}

function merge$1(filters) {
    return multi$1.apply(undefined, toConsumableArray(filters));
}

/**
 * apply filter into special area
 * 
 * F.partial({x,y,width,height}, filter, filter, filter )
 * F.partial({x,y,width,height}, 'filter' )
 * 
 * @param {{x, y, width, height}} area 
 * @param {*} filters   
 */
function partial(area) {
    var allFilter = null;

    for (var _len2 = arguments.length, filters = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        filters[_key2 - 1] = arguments[_key2];
    }

    if (filters.length == 1 && isString(filters[0])) {
        allFilter = filter$1(filters[0]);
    } else {
        allFilter = merge$1(filters);
    }

    return function (bitmap, done) {
        var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        allFilter(getBitmap(bitmap, area), function (newBitmap) {
            done(putBitmap(bitmap, newBitmap, area));
        }, opt);
    };
}

function parseParamNumber$2(param) {
    if (isString(param)) {
        param = param.replace(/deg/, '');
        param = param.replace(/px/, '');
        param = param.replace(/em/, '');
        param = param.replace(/%/, '');
    }
    return +param;
}

function weight$1(arr) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return arr.map(function (i) {
        return i * num;
    });
}

var SHADER_INDEX = 0;

function convolutionString(count) {

    var width = Math.sqrt(count);
    var half = Math.floor(width / 2);

    return [].concat(toConsumableArray(Array(count))).map(function (it, index) {
        var y = Math.floor(index / width) - half;
        var x = index % width - half;

        return 'texture(u_image, v_texCoord + onePixel * vec2(' + x + ', ' + y + ')) * u_kernel' + count + '[' + index + ']';
    }).join(' + \n');
}

function multi$3(str) {
    return [].concat(Array.prototype.slice.call(arguments));
}

function convolution$1(arr) {

    return {
        type: 'convolution',
        length: arr.length,
        content: arr
    };
}

function makeShader(str, index) {
    return '\n        if (u_filterIndex == ' + index + '.0) {\n            ' + str + '\n        }\n    ';
}

function shader(str, options) {
    return {
        type: 'shader',
        index: SHADER_INDEX,
        options: options,
        content: makeShader(str, SHADER_INDEX++)
    };
}

function makeVertexShaderSource() {
    return '#version 300 es \n\n        in vec2 a_position;\n        in vec2 a_texCoord; \n\n        uniform vec2 u_resolution;\n        uniform float u_flipY;\n\n        out vec2 v_texCoord; \n\n        void main() {\n            vec2 zeroToOne = a_position / u_resolution;\n\n            vec2 zeroToTwo = zeroToOne * 2.0;\n\n            vec2 clipSpace = zeroToTwo - 1.0;\n\n            gl_Position = vec4(clipSpace * vec2(1, u_flipY), 0, 1);\n\n            v_texCoord = a_texCoord;\n\n        }\n    ';
}

function makeConvolution(count) {

    return '\n    \n    if (u_kernelSelect == ' + count + '.0) {\n        vec4 colorSum = ' + convolutionString(count) + '; \n\n        outColor = vec4((colorSum / u_kernel' + count + 'Weight).rgb, 1);\n        \n    }\n    ';
}

function makeFragmentShaderSource(filterShaderList) {

    var filterContent = filterShaderList.filter(function (f) {
        return f.type == 'shader';
    }).map(function (f) {
        return f.content;
    }).join('\n\n');

    var weightTable = { '9': true };

    filterShaderList.filter(function (f) {
        return f.type == 'convolution';
    }).forEach(function (f) {
        weightTable[f.length] = true;
    });

    var convolutionString = Object.keys(weightTable).map(function (len) {
        return makeConvolution(+len);
    }).join('\n');

    return '#version 300 es\n\n    precision highp int;\n    precision mediump float;\n    \n    uniform sampler2D u_image;\n\n    // 3 is 3x3 matrix kernel \n    uniform float u_kernelSelect;\n    uniform float u_filterIndex;\n\n    uniform float u_kernel9[9];\n    uniform float u_kernel9Weight;\n    uniform float u_kernel25[25];\n    uniform float u_kernel25Weight;\n    uniform float u_kernel49[49];\n    uniform float u_kernel49Weight;\n    uniform float u_kernel81[81];\n    uniform float u_kernel81Weight;    \n\n    in vec2 v_texCoord;\n    \n    out vec4 outColor;\n\n    float random (vec2 st) {\n        return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);\n    } \n\n    // \n    vec3 rgb2hsv(vec3 c)\n    {\n        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n        vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);\n        vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);\n\n        float d = q.x - min(q.w, q.y);\n        float e = 1.0e-10;\n        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n    }\n\n    vec3 hsv2rgb(vec3 c)\n    {\n        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n    }\n    \n    void main() {\n        vec4 pixelColor = texture(u_image, v_texCoord);\n        vec2 onePixel = vec2(1) / vec2(textureSize(u_image, 0));                \n\n        ' + filterContent + '\n\n        ' + convolutionString + '\n\n    }';
}

function colorToVec4(color) {
    color = [color.r / 255, color.g / 255, color.b / 255, color.a || 0].map(toFloatString);
    return 'vec4(' + color + ')';
}

function toFloatString(number) {
    if (number == Math.floor(number)) {
        return number + '.0';
    }

    return number;
}

function blur$1 () {
    return convolution$1([1, 1, 1, 1, 1, 1, 1, 1, 1]);
}

function normal () {
    return convolution$1([0, 0, 0, 0, 1, 0, 0, 0, 0]);
}

/*
 * carve, mold, or stamp a design on (a surface) so that it stands out in relief.
 * 
 * @param {Number} amount   0.0 .. 4.0 
 */
function emboss$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

    amount = parseParamNumber$2(amount);
    return convolution$1([amount * -2.0, -amount, 0.0, -amount, 1.0, amount, 0.0, amount, amount * 2.0]);
}

/**
 * 
 * @param {Number} amount 0..1
 */
function gaussianBlur$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = parseParamNumber$2(amount) * (1 / 16);

    return convolution$1(weight$1([1, 2, 1, 2, 4, 2, 1, 2, 1], C));
}

function gaussianBlur5x$1() {
    return convolution$1([1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1]);
}

function grayscale2$1() {
    return convolution$1([0.3, 0.3, 0.3, 0, 0, 0.59, 0.59, 0.59, 0, 0, 0.11, 0.11, 0.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

function kirschHorizontal$1() {
    return convolution$1([5, 5, 5, -3, 0, -3, -3, -3, -3]);
}

function kirschVertical$1() {
    return convolution$1([5, -3, -3, 5, 0, -3, 5, -3, -3]);
}

function laplacian$1() {
    return convolution$1([-1, -1, -1, -1, 8, -1, -1, -1, -1]);
}

function laplacian5x$1() {
    return convolution$1([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
}

function motionBlur$1() {
    return convolution$1([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
}

function motionBlur2$1() {
    return convolution$1([1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]);
}

function motionBlur3$1() {
    return convolution$1([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]);
}

function negative$1() {
    return convolution$1([-1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1]);
}

function sepia2$1() {
    return convolution$1([0.393, 0.349, 0.272, 0, 0, 0.769, 0.686, 0.534, 0, 0, 0.189, 0.168, 0.131, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

function sharpen$1() {
    return convolution$1([0, -1, 0, -1, 5, -1, 0, -1, 0]);
}

function sobelHorizontal$1() {
    return convolution$1([-1, -2, -1, 0, 0, 0, 1, 2, 1]);
}

function sobelVertical$1() {
    return convolution$1([-1, 0, 1, -2, 0, 2, -1, 0, 1]);
}

function transparency$1() {
    return convolution$1([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 1]);
}

function unsharpMasking$1() {
    return convolution$1(weight$1([1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, -476, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1], -1 / 256));
}

var matrix$2 = {
     blur: blur$1,
     normal: normal,
     emboss: emboss$1,
     gaussianBlur: gaussianBlur$1,
     'gaussian-blur': gaussianBlur$1,
     gaussianBlur5x: gaussianBlur5x$1,
     'gaussian-blur-5x': gaussianBlur5x$1,
     grayscale2: grayscale2$1,
     kirschHorizontal: kirschHorizontal$1,
     'kirsch-horizontal': kirschHorizontal$1,
     kirschVertical: kirschVertical$1,
     'kirsch-vertical': kirschVertical$1,
     laplacian: laplacian$1,
     laplacian5x: laplacian5x$1,
     'laplacian-5x': laplacian5x$1,
     motionBlur: motionBlur$1,
     'motion-blur': motionBlur$1,
     motionBlur2: motionBlur2$1,
     'motion-blur-2': motionBlur2$1,
     motionBlur3: motionBlur3$1,
     'motion-blur-3': motionBlur3$1,
     negative: negative$1,
     sepia2: sepia2$1,
     sharpen: sharpen$1,
     sobelHorizontal: sobelHorizontal$1,
     'sobel-horizontal': sobelHorizontal$1,
     sobelVertical: sobelVertical$1,
     'sobel-vertical': sobelVertical$1,
     transparency: transparency$1,
     unsharpMasking: unsharpMasking$1,
     'unsharp-masking': unsharpMasking$1
};

function bitonal$1(darkColor, lightColor) {
    var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

    var checkVlue = toFloatString(threshold);
    var darkColorString = colorToVec4(Color$1.parse(darkColor));
    var lightColorString = colorToVec4(Color$1.parse(lightColor));

    return shader('\n        if ((pixelColor.r + pixelColor.g + pixelColor.b) > ' + checkVlue + ') {\n            outColor = vec4(' + lightColorString + '.rgb, pixelColor.a);\n        } else {\n            outColor = vec4(' + darkColorString + '.rgb, pixelColor.a);\n        }\n    ');
}

/*
 * @param {Number} amount  -1..1  ,  value < 0  is darken, value > 0 is brighten 
 */
function brightness$2() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        outColor = pixelColor + (' + C + ');\n    ');
}

function matrix$3() {
    var $a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var $b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var $c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var $d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var $e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var $f = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var $g = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var $h = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var $i = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var $j = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var $k = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
    var $l = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
    var $m = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var $n = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
    var $o = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    var $p = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;


    var matrix = [$a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $o, $p].map(toFloatString);

    return shader('\n\n        outColor = vec4(\n            ' + matrix[0] + ' * pixelColor.r + ' + matrix[1] + ' * pixelColor.g + ' + matrix[2] + ' * pixelColor.b + ' + matrix[3] + ' * pixelColor.a,\n            ' + matrix[4] + ' * pixelColor.r + ' + matrix[5] + ' * pixelColor.g + ' + matrix[6] + ' * pixelColor.b + ' + matrix[7] + ' * pixelColor.a,\n            ' + matrix[8] + ' * pixelColor.r + ' + matrix[9] + ' * pixelColor.g + ' + matrix[10] + ' * pixelColor.b + ' + matrix[11] + ' * pixelColor.a,\n            ' + matrix[12] + ' * pixelColor.r + ' + matrix[13] + ' * pixelColor.g + ' + matrix[14] + ' * pixelColor.b + ' + matrix[15] + ' * pixelColor.a\n        ); \n    ');
}

function brownie$1() {

    return matrix$3(0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, 0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, 0, 0, 0, 1);
}

/*
 * @param {Number} amount 0..1
 */
function clip$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        outColor = vec4(\n            (pixelColor.r > 1.0 - ' + C + ') ? 1.0 : 0.0,\n            (pixelColor.g > 1.0 - ' + C + ') ? 1.0 : 0.0,\n            (pixelColor.b > 1.0 - ' + C + ') ? 1.0 : 0.0,\n            pixelColor.a \n        );\n    ');
}

function chaos() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        vec2 st = pixelColor.st;\n        st *= ' + C + ';\n        \n        vec2 ipos = floor(st);  // get the integer coords\n\n        vec3 color = vec3(random( ipos ));\n\n        outColor = vec4(color, pixelColor.a);\n    ');
}

/*
 * @param {Number} amount  0..1
 */
function contrast$2() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        outColor = pixelColor * ' + C + ';\n    ');
}

/*
 * @param {Number} amount  -1..1  ,  value < 0  is darken, value > 0 is brighten 
 */
function gamma$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        outColor = vec4(pow(pixelColor.r, ' + C + '), pow(pixelColor.g, ' + C + '), pow(pixelColor.b, ' + C + '), pixelColor.a );\n    ');
}

/**
 * F.gradient('red', 'blue', 'yellow', 'white', 10)
 * F.gradient('red, blue, yellow, white, 10')
 */
function gradient$2() {
    // 전체 매개변수 기준으로 파싱 
    // 색이 아닌 것 기준으로 scale 변수로 인식 

    var params = [].concat(Array.prototype.slice.call(arguments));

    if (params.length === 1 && isString(params[0])) {
        params = Color$1.convertMatchesArray(params[0]);
    }

    params = params.map(function (arg) {
        return arg;
    }).join(', ');

    var colors = Color$1.parseGradient(params);

    colors[0][1] = 0;
    colors[colors.length - 1][1] = 1;

    colors = colors.map(function (c) {
        var _Color$parse = Color$1.parse(c[0]),
            r = _Color$parse.r,
            g = _Color$parse.g,
            b = _Color$parse.b,
            a = _Color$parse.a;

        return [{ r: r, g: g, b: b, a: a }, c[1]];
    });

    var temp = [];

    for (var i = 0, len = colors.length; i < len - 1; i++) {
        var start = colors[i];
        var end = colors[i + 1];

        var startColor = colorToVec4(start[0]);
        var endColor = colorToVec4(end[0]);

        var startRate = toFloatString(start[1]);
        var endRate = toFloatString(end[1]);

        temp.push('\n            if (' + startRate + ' <= rate && rate < ' + endRate + ') {\n                outColor = mix(' + startColor + ', ' + endColor + ', (rate - ' + startRate + ')/(' + endRate + ' - ' + startRate + '));\n            }\n        ');
    }

    return shader('\n        float rate = (pixelColor.r * 0.2126 + pixelColor.g * 0.7152 + pixelColor.b * 0.0722); \n\n        ' + temp.join('\n') + '        \n    ');
}

/**
 * 
 * @param {Number} amount 0..1
 */
function grayscale$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = parseParamNumber$2(amount);

    if (C > 1) C = 1;

    return matrix$3(0.2126 + 0.7874 * (1 - C), 0.7152 - 0.7152 * (1 - C), 0.0722 - 0.0722 * (1 - C), 0, 0.2126 - 0.2126 * (1 - C), 0.7152 + 0.2848 * (1 - C), 0.0722 - 0.0722 * (1 - C), 0, 0.2126 - 0.2126 * (1 - C), 0.7152 - 0.7152 * (1 - C), 0.0722 + 0.9278 * (1 - C), 0, 0, 0, 0, 1);
}

//http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
/*
 * @param {Number} amount  0..1  ,  (real value 0..360)
 */
function hue$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        vec3 hsv = rgb2hsv(pixelColor.rgb);\n        hsv.x += ' + C + ';\n        outColor = vec4(hsv2rgb(hsv).rgb, pixelColor.a);\n    ');
}

function invert$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        outColor = vec4(\n            (1.0 - pixelColor.r) * ' + C + ',\n            (1.0 - pixelColor.g) * ' + C + ',\n            (1.0 - pixelColor.b) * ' + C + ',\n            pixelColor.a\n        );\n    ');
}

function kodachrome$1() {

    return matrix$3(1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 0, 0, 0, 1);
}

/**
 * 
 * @param {Number} amount 0..1
 */
function noise$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;


    var C = Math.abs(parseParamNumber$2(amount));
    var min = toFloatString(-C);
    var max = toFloatString(C);
    return shader('\n        float rnd = ' + min + ' + random( pixelColor.st ) * (' + max + ' - ' + min + ');\n\n        outColor = vec4(pixelColor.rgb + rnd, 1.0);\n    ');
}

/**
 * 
 * @param {Number} amount 0..1
 */
function opacity$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = toFloatString(parseParamNumber$2(amount));

    return shader('\n        outColor = vec4(pixelColor.rgb, pixelColor.a * ' + C + ');\n    ');
}

function polaroid$1() {

    return matrix$3(1.438, -0.062, -0.062, 0, -0.122, 1.378, -0.122, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 1);
}

/*
 * @param {Number} amount  0..1 
 */
function saturation$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var L = 1 - Math.abs(parseParamNumber$2(amount));

    return matrix$3(L, 0, 0, 0, 0, L, 0, 0, 0, 0, L, 0, 0, 0, 0, L);
}

/*
 * @param {Number} amount  0..100 
 */
function sepia$1() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var C = parseParamNumber$2(amount);
    if (C > 1) C = 1;

    return matrix$3(0.393 + 0.607 * (1 - C), 0.769 - 0.769 * (1 - C), 0.189 - 0.189 * (1 - C), 0, 0.349 - 0.349 * (1 - C), 0.686 + 0.314 * (1 - C), 0.168 - 0.168 * (1 - C), 0, 0.272 - 0.272 * (1 - C), 0.534 - 0.534 * (1 - C), 0.131 + 0.869 * (1 - C), 0, 0, 0, 0, 1);
}

function shade$1() {
    var redValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var greenValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var blueValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var r = toFloatString(parseParamNumber$2(redValue) / 255);
    var g = toFloatString(parseParamNumber$2(greenValue) / 255);
    var b = toFloatString(parseParamNumber$2(blueValue) / 255);

    return shader('\n        outColor = vec4(\n            pixelColor.r * ' + r + ',\n            pixelColor.g * ' + g + ',\n            pixelColor.b * ' + b + ',\n            pixelColor.a\n        );\n    ');
}

function shift$1() {

    return matrix$3(1.438, -0.062, -0.062, 0, -0.122, 1.378, -0.122, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 1);
}

function solarize$1(redValue, greenValue, blueValue) {
    var r = toFloatString(parseParamNumber$2(redValue));
    var g = toFloatString(parseParamNumber$2(greenValue));
    var b = toFloatString(parseParamNumber$2(blueValue));

    return shader('\n        outColor = vec4(\n            (pixelColor.r < ' + r + ') ? 1.0 - pixelColor.r: pixelColor.r,\n            (pixelColor.g < ' + g + ') ? 1.0 - pixelColor.g: pixelColor.g,\n            (pixelColor.b < ' + b + ') ? 1.0 - pixelColor.b: pixelColor.b,\n            pixelColor.a\n        );\n    ');
}

function technicolor$1() {

    return matrix$3(1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 0, 0, 0, 1);
}

function thresholdColor$1() {
    var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    scale = toFloatString(parseParamNumber$2(scale));

    return shader('\n        float c = ( (pixelColor.r * 0.2126 + pixelColor.g * 0.7152 + pixelColor.b * 0.0722) ) >= ' + scale + ' ? 1.0 : 0.0;\n\n        outColor = vec4(c, c, c, pixelColor.a);\n    ');
}

/*
 * @param {Number} amount  0..100 
 */
function threshold$1() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  return thresholdColor$1(scale, amount, false);
}

/**
 * 
 * @param {*} redTint  0..1
 * @param {*} greenTint 0..1
 * @param {*} blueTint 0..1
 */
function tint$1 () {
    var redTint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var greenTint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var blueTint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var r = parseParamNumber$2(redTint);
    var g = parseParamNumber$2(greenTint);
    var b = parseParamNumber$2(blueTint);

    return shader('\n        outColor = vec4(\n            pixelColor.r += (1 - pixelColor.r) * ' + r + ',\n            pixelColor.g += (1 - pixelColor.g) * ' + g + ',\n            pixelColor.b += (1 - pixelColor.b) * ' + b + ',\n            pixelColor.a\n        );\n    ');
}

var pixel$2 = {
    bitonal: bitonal$1,
    brightness: brightness$2,
    brownie: brownie$1,
    clip: clip$1,
    chaos: chaos,
    contrast: contrast$2,
    gamma: gamma$1,
    gradient: gradient$2,
    grayscale: grayscale$1,
    hue: hue$1,
    invert: invert$1,
    kodachrome: kodachrome$1,
    matrix: matrix$3,
    noise: noise$1,
    opacity: opacity$1,
    polaroid: polaroid$1,
    saturation: saturation$1,
    sepia: sepia$1,
    shade: shade$1,
    shift: shift$1,
    solarize: solarize$1,
    technicolor: technicolor$1,
    threshold: threshold$1,
    'threshold-color': thresholdColor$1,
    tint: tint$1
};

function kirsch$1() {
    return multi$3('kirsch-horizontal kirsch-vertical');
}

function sobel$1() {
    return multi$3('sobel-horizontal sobel-vertical');
}

function vintage$1() {
    return multi$3('brightness(0.15) saturation(-0.2) gamma(1.8)');
}

var multi$4 = {
    kirsch: kirsch$1,
    sobel: sobel$1,
    vintage: vintage$1
};

var GLFilter = _extends({}, matrix$2, pixel$2, multi$4);

var TEXTURE_INDEX = 0;

var GLCanvas = function () {
    function GLCanvas() {
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            width: '400px',
            height: '300px'
        };
        classCallCheck(this, GLCanvas);

        this.img = opt.img;
        this.width = parseFloat(this.img.width || opt.width || px$1(400));
        this.height = parseFloat(this.img.height || opt.height || px$1(300));
        this.init();
    }

    createClass(GLCanvas, [{
        key: 'resize',
        value: function resize() {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.style.width = px$1(this.width);
            this.canvas.style.height = px$1(this.height);

            this.viewport();
        }

        /* Canvas 비우기, 비울 때 색 지정하기  */

    }, {
        key: 'clear',
        value: function clear() {
            var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var gl = this.gl;

            gl.clearColor(r, g, b, a);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }

        /* viewport 설정, 기본적으로 canvas 의 크기로 고정  */

    }, {
        key: 'viewport',
        value: function viewport(x, y, width, height) {
            var gl = this.gl;

            gl.viewport(x || 0, y || 0, width || gl.canvas.width, height || gl.canvas.height);
        }

        // canvas 초기화 
        // gl context 구하기 

    }, {
        key: 'initCanvas',
        value: function initCanvas(vertexSource, fragmentSource) {
            this.canvas = document.createElement('canvas');

            this.gl = this.canvas.getContext('webgl2');

            if (!this.gl) {
                throw new Error("you need webgl2 support");
            }

            // program 생성 
            this.program = this.createProgram(vertexSource, fragmentSource);

            // this.clear()
            this.resize();

            // buffer 설정 
            this.initBuffer();
        }
    }, {
        key: 'draw',
        value: function draw() {
            var primitiveType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'TRIANGLES';
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;

            var gl = this.gl;

            gl.drawArrays(gl[primitiveType], offset, count);
        }
    }, {
        key: 'triangles',
        value: function triangles() {
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

            this.draw('TRIANGLES', offset, count);
        }
    }, {
        key: 'uniform2f',
        value: function uniform2f() {
            var _gl;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var key = args.shift();

            (_gl = this.gl).uniform2f.apply(_gl, [this.locations[key]].concat(args));
        }
    }, {
        key: 'uniform1f',
        value: function uniform1f() {
            var _gl2;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var key = args.shift();

            (_gl2 = this.gl).uniform1f.apply(_gl2, [this.locations[key]].concat(args));
        }
    }, {
        key: 'uniform1fv',
        value: function uniform1fv() {
            var _gl3;

            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            var key = args.shift();

            (_gl3 = this.gl).uniform1fv.apply(_gl3, [this.locations[key]].concat(args));
        }
    }, {
        key: 'uniform1i',
        value: function uniform1i() {
            var _gl4;

            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            var key = args.shift();

            (_gl4 = this.gl).uniform1i.apply(_gl4, [this.locations[key]].concat(args));
        }
    }, {
        key: 'useProgram',
        value: function useProgram() {
            var gl = this.gl;

            gl.useProgram(this.program);
        }
    }, {
        key: 'bindBuffer',
        value: function bindBuffer(key, data) {
            var drawType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'STATIC_DRAW';

            var gl = this.gl;

            if (!this.buffers[key]) {
                this.buffers[key] = gl.createBuffer();
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[key]);

            if (data) {
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl[drawType]);
            }
        }
    }, {
        key: 'enable',
        value: function enable(key) {
            var gl = this.gl;

            // array attribute 를 활성화 시킴 
            gl.enableVertexAttribArray(this.locations[key]);
        }
    }, {
        key: 'location',
        value: function location(key) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "attribute";

            if (type === 'attribute') {
                this.locations[key] = this.gl.getAttribLocation(this.program, key);
            } else if (type === 'uniform') {
                this.locations[key] = this.gl.getUniformLocation(this.program, key);
            }
        }
    }, {
        key: 'a',
        value: function a(key) {
            return this.location(key);
        }
    }, {
        key: 'u',
        value: function u(key) {
            return this.location(key, "uniform");
        }
    }, {
        key: 'pointer',
        value: function pointer(key) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'FLOAT';
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
            var normalize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var stride = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var offset = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

            var gl = this.gl;

            gl.vertexAttribPointer(this.locations[key], size, gl[type], normalize, stride, offset);
        }
    }, {
        key: 'bufferData',
        value: function bufferData() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var gl = this.gl;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        }
    }, {
        key: 'isPowerOf2',
        value: function isPowerOf2(value$$1) {
            return (value$$1 & value$$1 - 1) == 0;
        }
    }, {
        key: 'bindTexture',
        value: function bindTexture(key) {
            var img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var mipLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var internalFormat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'RGBA';
            var srcFormat = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'RGBA';
            var srcType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'UNSIGNED_BYTE';

            var gl = this.gl;

            if (arguments.length == 1) {
                gl.bindTexture(gl.TEXTURE_2D, this.textures[key]);
                return;
            }

            if (!this.textures[key]) {
                this.textures[key] = gl.createTexture();
            }

            this.textureIndex[key] = TEXTURE_INDEX++;
            // this.activeTexture(key)
            gl.bindTexture(gl.TEXTURE_2D, this.textures[key]);

            this.setTextureParameter();

            gl.texImage2D(gl.TEXTURE_2D, mipLevel, gl[internalFormat], gl[srcFormat], gl[srcType], img.newImage || img);
        }
    }, {
        key: 'bindColorTexture',
        value: function bindColorTexture(key, data) {
            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;
            var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var mipLevel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var internalFormat = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'RGBA';
            var srcFormat = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'RGBA';
            var srcType = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'UNSIGNED_BYTE';

            var gl = this.gl;

            if (!this.textures[key]) {
                this.textures[key] = gl.createTexture();
            }

            this.textureIndex[key] = TEXTURE_INDEX++;
            gl.bindTexture(gl.TEXTURE_2D, this.textures[key]);

            this.setTextureParameter();

            gl.texImage2D(gl.TEXTURE_2D, mipLevel, gl[internalFormat], width, height, 0, gl[srcFormat], gl[srcType], new Uint8Array(data));
        }
    }, {
        key: 'bindEmptyTexture',
        value: function bindEmptyTexture(key, width, height) {
            var mipLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var internalFormat = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'RGBA';
            var srcFormat = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'RGBA';
            var srcType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'UNSIGNED_BYTE';

            var gl = this.gl;

            if (!this.textures[key]) {
                this.textures[key] = gl.createTexture();
            }

            this.textureIndex[key] = TEXTURE_INDEX++;
            gl.bindTexture(gl.TEXTURE_2D, this.textures[key]);

            this.setTextureParameter();

            var border = 0;
            var data = null;

            gl.texImage2D(gl.TEXTURE_2D, mipLevel, gl[internalFormat], width, height, border, gl[srcFormat], gl[srcType], data);
        }
    }, {
        key: 'setTextureParameter',
        value: function setTextureParameter() {
            var gl = this.gl;

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }
    }, {
        key: 'bindFrameBufferWithTexture',
        value: function bindFrameBufferWithTexture(key, textureKey, width, height) {
            this.bindEmptyTexture(textureKey, width, height);
            this.bindFrameBuffer(key, textureKey);
        }
    }, {
        key: 'enumToString',
        value: function enumToString(value$$1) {
            var gl = this.gl;

            if (value$$1 === 0) {
                return "NONE";
            }
            for (var key in gl) {
                if (gl[key] === value$$1) {
                    return key;
                }
            }
            return "0x" + value$$1.toString(16);
        }
    }, {
        key: 'bindFrameBuffer',
        value: function bindFrameBuffer(key) {
            var textureKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var gl = this.gl;

            if (arguments.length === 1) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, key == null ? null : this.framebuffers[key]);
                return;
            }

            if (!this.framebuffers[key]) {
                // 프레임버퍼 생성하기 
                this.framebuffers[key] = gl.createFramebuffer();
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[key]);

            // framebuffer 에 texture2d 연결 
            var mipLevel = 0;
            var attachmentPoint = gl.COLOR_ATTACHMENT0; // framebuffer 를 attachmentPoint 에 연결한다. 
            // framebuffer 는 데이타를 가지고 있지 않고 연결 고리만 가지고 있다. 
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, this.textures[textureKey], mipLevel);

            // framebuffer 상태 체크 하기 
            // framebuffer 를 더 이상 할당 못할 수도 있음. 
            var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

            // console.log(this.enumToString(attachmentPoint), this.enumToString(status), key, this.textures[textureKey]);

            if (status !== gl.FRAMEBUFFER_COMPLETE) {
                return;
            }
        }
    }, {
        key: 'bindVA',
        value: function bindVA() {
            var gl = this.gl;

            if (!this.vao) {
                this.vao = gl.createVertexArray();
            }

            gl.bindVertexArray(this.vao);
        }
    }, {
        key: 'bindAttr',
        value: function bindAttr(key, data) {
            var drawType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'STATIC_DRAW';
            var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;

            // 버퍼를 만들고 데이타를 연결한다. 
            this.bindBuffer(key, data, drawType);

            //array 변수를 사용할 수 있도록 활성화 시킨다. 
            this.enable(key);

            // 포인터를 지정한다. 
            // array 변수가 어떻게 iteration 될지 지정한다. size 는 한번에 연산될 요소 개수 
            // size 가 2 라고 했을 때 2개씩 하나의 iteration 에 들어간다. 
            // 즉, (x, y) 가 한번에 들어감 
            this.pointer(key, 'FLOAT', size);
        }

        /* 
            shader 에서 사용하는 Attribute, Uniform 변수 설정 
            변수 설정을 간소화 할 필요도 있을 듯 하다. 
        */

    }, {
        key: 'initBuffer',
        value: function initBuffer() {
            var _canvas = this.canvas,
                width = _canvas.width,
                height = _canvas.height;

            // console.log(width, height)

            // 선언된 변수 location 지정 하기 
            // location 을 지정해야 GLSL 에서 해당 변수와 연결할 수 있다. 언제? 

            this.a("a_position");
            this.a("a_texCoord");
            this.u("u_resolution");
            this.u("u_image");
            this.u("u_flipY");

            this.u("u_kernelSelect");
            this.u("u_filterIndex");

            this.u("u_kernel9[0]");
            this.u("u_kernel9Weight");
            this.u("u_kernel25[0]");
            this.u("u_kernel25Weight");
            this.u("u_kernel49[0]");
            this.u("u_kernel49Weight");
            this.u("u_kernel81[0]");
            this.u("u_kernel81Weight");

            this.bindVA();

            // 단순 변수를 초기화 하고 
            this.bindAttr("a_position", [0, 0, width, 0, 0, height, 0, height, width, 0, width, height], 'STATIC_DRAW', 2 /* components for iteration */);

            // 변수에 데이타를 연결할다. 
            this.bindAttr("a_texCoord", [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0], 'STATIC_DRAW', 2 /* components for iteration */);

            // texture 는 img 로 할 수도 있고 
            this.bindTexture("u_image", this.img);

            // 비어있는 texture 도 만들 수 있다. 
            // 객체로 제어할까? 
            // texture 를 framebuffer 로 바로 대응시킨다. 
            // 이후 framebuffer 가 변경되면 img_texture 가 바뀐다. 
            this.bindFrameBufferWithTexture("frame_buffer_0", "img_texture_0", width, height);
            this.bindFrameBufferWithTexture("frame_buffer_1", "img_texture_1", width, height);
        }
    }, {
        key: 'activeTexture',
        value: function activeTexture() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var gl = this.gl;

            gl.activeTexture(gl.TEXTURE0 + index);
        }
    }, {
        key: 'drawFilter',
        value: function drawFilter() {
            var _this = this;

            var gl = this.gl;

            this.resize();
            this.clear();

            this.useProgram();

            this.bindVA();

            this.activeTexture(0);
            this.bindTexture('u_image');

            this.uniform1i("u_image", 0);
            this.uniform1f("u_flipY", 1);

            var _gl$canvas = gl.canvas,
                width = _gl$canvas.width,
                height = _gl$canvas.height;


            this.eachFilter(function (f, index) {

                _this.bindFrameBuffer('frame_buffer_' + index % 2);
                _this.uniform2f("u_resolution", width, height);
                _this.viewport(0, 0, width, height);

                _this.effectFilter(f);

                // 다음 드로잉을 위해 방금 렌더링 한 텍스처를 사용합니다.
                _this.bindTexture('img_texture_' + index % 2);
            });

            this.uniform1f("u_flipY", -1);
            this.bindFrameBuffer(null);
            this.uniform2f("u_resolution", width, height);
            this.viewport(0, 0, width, height);

            // clear 가 있는 이유는? 
            this.clear();

            this.effectFilter("normal");
        }
    }, {
        key: 'effectFilter',
        value: function effectFilter(filterFunction) {

            if (isString(filterFunction)) {
                filterFunction = (GLFilter[filterFunction] || GLFilter.normal).call(GLFilter);
            }

            if (filterFunction.type == 'convolution') {
                this.uniform1f("u_kernelSelect", filterFunction.length);
                this.uniform1f("u_filterIndex", -1.0);
                this.uniform1fv('u_kernel' + filterFunction.length + '[0]', filterFunction.content);
                this.uniform1f('u_kernel' + filterFunction.length + 'Weight', this.computeKernelWeight(filterFunction.content));
            } else {

                this.uniform1f("u_kernelSelect", -1.0);
                this.uniform1f("u_filterIndex", filterFunction.index);
            }

            this.triangles(0 /* 시작 지점 */, 6 /* 좌표(vertex, 꼭지점) 개수 */); // 총 6개를 도는데 , triangles 니깐 3개씩 묶어서 2번 돈다. 
        }
    }, {
        key: 'computeKernelWeight',
        value: function computeKernelWeight(kernel) {
            var weight = kernel.reduce(function (prev, curr) {
                return prev + curr;
            });
            return weight <= 0 ? 1 : weight;
        }
    }, {
        key: 'createProgram',
        value: function createProgram(vertexSource, fragmentSource) {

            var gl = this.gl;

            var program = gl.createProgram();

            this.vertexShader = this.createVertexShader(vertexSource);
            this.fragmentShader = this.createFragmentShader(fragmentSource);

            // console.log(fragmentSource)      


            gl.attachShader(program, this.vertexShader);
            gl.attachShader(program, this.fragmentShader);

            gl.linkProgram(program);

            var success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {

                return program;
            }

            console.error(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
        }
    }, {
        key: 'createShader',
        value: function createShader(type, source) {
            var gl = this.gl;

            var shader$$1 = gl.createShader(type);
            gl.shaderSource(shader$$1, source);
            gl.compileShader(shader$$1);

            var success = gl.getShaderParameter(shader$$1, gl.COMPILE_STATUS);

            if (success) {
                return shader$$1;
            }

            console.error(gl.getShaderInfoLog(shader$$1));
            gl.deleteShader(shader$$1);
        }
    }, {
        key: 'createVertexShader',
        value: function createVertexShader(vertexSource) {
            var gl = this.gl;

            return this.createShader(gl.VERTEX_SHADER, vertexSource);
        }
    }, {
        key: 'createFragmentShader',
        value: function createFragmentShader(fragmentSource) {
            var gl = this.gl;

            return this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
        }
    }, {
        key: 'eachFilter',
        value: function eachFilter(callback) {
            this.filterList.forEach(callback);
        }
    }, {
        key: 'init',
        value: function init() {
            this.locations = {};
            this.buffers = {};
            this.framebuffers = {};
            this.textures = {};
            this.textureIndex = {};
            this.hasTexParameter = {};
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var gl = this.gl;

            this.init();

            gl.deleteProgram(this.program);
        }
    }, {
        key: 'filter',
        value: function filter(filterList, doneCallback) {

            this.filterList = filterList;

            this.initCanvas(makeVertexShaderSource(), makeFragmentShaderSource(this.filterList));

            this.drawFilter();

            if (isFunction(doneCallback)) {
                doneCallback(this);
            }
        }
    }]);
    return GLCanvas;
}();

var GL$1 = {
    GLCanvas: GLCanvas
};

var functions = {
    filter: filter
};






function makeFilterFunction(filterObj) {
    var filterName = filterObj.arr[0];
    var f = GLFilter[filterName];

    var arr = filterObj.arr;
    arr.shift();

    var result = f.apply(this, arr);

    return result;
}

/**
 * 겹쳐져 있는 Filter 함수를 1차원으로 나열한다. 
 * ex)  ['sobel'] => ['sobel-horizontal', 'sobel-vertial'] 
 * 
 * @param {String|Array} filterString 
 */
function flatFilter(filterString) {

    var filter_list = [];

    if (isString(filterString)) {
        filter_list = matches$1(filterString);
    } else if (Array.isArray(filterString)) {
        filter_list = filterString;
    }

    var allFilter = [];

    filter_list.forEach(function (filterObj) {
        var filterName = filterObj.arr[0];

        if (GLFilter[filterName]) {
            var f = makeFilterFunction(filterObj);

            if (f.type == 'convolution' || f.type == 'shader') {
                allFilter.push(f);
            } else {
                f.forEach(function (subFilter) {
                    allFilter = allFilter.concat(flatFilter(subFilter));
                });
            }
        }
    });

    // console.log(filter_list, allFilter)

    return allFilter;
}

function filter(img, filterString, callback, opt) {

    var canvas = new GL$1.GLCanvas({
        width: opt.width || img.width,
        height: opt.height || img.height,
        img: img
    });

    canvas.filter(flatFilter(filterString), function done() {
        if (isFunction(callback)) {
            callback(canvas);
        }
    });
}

var GL = _extends({}, GL$1, functions);

function palette(colors) {
    var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
    var exportFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';


    if (colors.length > k) {
        colors = kmeans(colors, k);
    }

    return colors.map(function (c) {
        return format(c, exportFormat);
    });
}

function ImageToRGB(url) {
    var callbackOrOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var callback = arguments[2];


    if (!callback) {
        var img = new ImageLoader(url);
        img.loadImage(function () {
            if (isFunction(callbackOrOption)) {
                callbackOrOption(img.toRGB());
            }
        });
    } else if (callback) {
        var img = new ImageLoader(url, callbackOrOption);
        img.loadImage(function () {
            if (isFunction(callback)) {
                callback(img.toRGB());
            }
        });
    }
}

function ImageToCanvas(url, filter, callback) {
    var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { frameTimer: 'full' };

    ImageToURL(url, filter, callback, Object.assign({
        returnTo: 'canvas'
    }, opt));
}

function ImageToURL(url, filter, callback) {
    var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { frameTimer: 'full' };

    var img = new ImageLoader(url);
    img.loadImage(function () {
        img.toArray(filter, function (datauri) {
            if (isFunction(callback)) {
                callback(datauri);
            }
        }, opt);
    });
}

function GLToCanvas(url, filter, callback) {
    var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var img = new ImageLoader(url);
    img.load(function () {
        GL.filter(img.newImage, filter, function done(datauri) {
            if (isFunction(callback)) {
                callback(datauri);
            }
        }, opt);
    });
}

function histogram(url, callback) {
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var img = new ImageLoader(url);
    img.loadImage(function () {
        if (isFunction(callback)) {
            callback(img.toHistogram(opt));
        }
    });
}

function histogramToPoints(points) {
    var tension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;


    var controlPoints = [];
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        if (i == 0) {
            controlPoints[i] = [];
            continue;
        }

        if (i == points.length - 1) {
            controlPoints[i] = [];
            continue;
        }

        var prevPoint = points[i - 1];
        var nextPoint = points[i + 1];

        // 기울기 
        var M = (nextPoint[1] - prevPoint[1]) / (nextPoint[0] - prevPoint[0]);

        var newControlPoint = [prevPoint[0] + (nextPoint[0] - prevPoint[0]) * tension, prevPoint[1] + (nextPoint[1] - prevPoint[1]) * tension];

        var controlPoint = [[].concat(toConsumableArray(prevPoint)), /* start */
        [].concat(newControlPoint) /* end */
        ];

        var P = Math.sqrt(Math.pow(p[0] - prevPoint[0], 2) + Math.pow(p[1] - prevPoint[1], 2));
        var N = Math.sqrt(Math.pow(nextPoint[0] - p[0], 2) + Math.pow(nextPoint[1] - p[1], 2));

        var rate = P / N;

        var dx = controlPoint[0][0] + (controlPoint[1][0] - controlPoint[0][0]) * rate;
        var dy = controlPoint[0][1] + (controlPoint[1][1] - controlPoint[0][1]) * rate;

        controlPoint[0][0] += p[0] - dx;
        controlPoint[0][1] += p[1] - dy;
        controlPoint[1][0] += p[0] - dx;
        controlPoint[1][1] += p[1] - dy;

        controlPoints[i] = controlPoint;
    }

    return controlPoints;
}

function ImageToHistogram(url, callback) {
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { width: 200, height: 100 };


    var img = new ImageLoader(url);
    img.loadImage(function () {
        Canvas.createHistogram(opt.width || 200, opt.height || 100, img.toHistogram(opt), function (canvas) {
            if (isFunction(callback)) callback(canvas.toDataURL('image/png'));
        }, opt);
    });
}

var image = {
    palette: palette,
    ImageToCanvas: ImageToCanvas,
    ImageToHistogram: ImageToHistogram,
    ImageToRGB: ImageToRGB,
    ImageToURL: ImageToURL,
    GLToCanvas: GLToCanvas,
    histogram: histogram,
    histogramToPoints: histogramToPoints
};

var Color$1 = _extends({}, formatter, math, mixin, parser, fromYCrCb, fromRGB, fromCMYK, fromHSV, fromHSL, fromLAB, image, func);

var hue_color = [{ rgb: '#ff0000', start: .0 }, { rgb: '#ffff00', start: .17 }, { rgb: '#00ff00', start: .33 }, { rgb: '#00ffff', start: .50 }, { rgb: '#0000ff', start: .67 }, { rgb: '#ff00ff', start: .83 }, { rgb: '#ff0000', start: 1 }];

function checkHueColor(p) {
    var startColor, endColor;

    for (var i = 0; i < hue_color.length; i++) {
        if (hue_color[i].start >= p) {
            startColor = hue_color[i - 1];
            endColor = hue_color[i];
            break;
        }
    }

    if (startColor && endColor) {
        return Color$1.interpolateRGB(startColor, endColor, (p - startColor.start) / (endColor.start - startColor.start));
    }

    return hue_color[0].rgb;
}

function initHueColors() {
    for (var i = 0, len = hue_color.length; i < len; i++) {
        var hue = hue_color[i];

        var obj = Color$1.parse(hue.rgb);

        hue.r = obj.r;
        hue.g = obj.g;
        hue.b = obj.b;
    }
}

initHueColors();

var HueColor = {
    colors: hue_color,
    checkHueColor: checkHueColor
};

// TODO: worker run 
var ImageFilter = _extends({}, FilterList, functions$1);

var Util = {
    Color: Color$1,
    HueColor: HueColor,
    ColorNames: ColorNames,
    ImageFilter: ImageFilter,
    GL: GL,
    Canvas: Canvas,
    ImageLoader: ImageLoader
};

var counter = 0;
var cached = [];

var Dom = function () {
    function Dom(tag, className, attr) {
        classCallCheck(this, Dom);


        if (isNotString(tag)) {
            this.el = tag;
        } else {

            var el = document.createElement(tag);
            this.uniqId = counter++;

            if (className) {
                el.className = className;
            }

            attr = attr || {};

            for (var k in attr) {
                el.setAttribute(k, attr[k]);
            }

            this.el = el;
        }
    }

    createClass(Dom, [{
        key: "attr",
        value: function attr(key, value$$1) {
            if (arguments.length == 1) {
                return this.el.getAttribute(key);
            }

            this.el.setAttribute(key, value$$1);

            return this;
        }
    }, {
        key: "attrs",
        value: function attrs() {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return args.map(function (key) {
                return _this.el.getAttribute(key);
            });
        }
    }, {
        key: "removeAttr",
        value: function removeAttr(key) {
            this.el.removeAttribute(key);

            return this;
        }
    }, {
        key: "is",
        value: function is(checkElement) {
            return this.el === (checkElement.el || checkElement);
        }
    }, {
        key: "closest",
        value: function closest(cls) {

            var temp = this;
            var checkCls = false;

            while (!(checkCls = temp.hasClass(cls))) {
                if (temp.el.parentNode) {
                    temp = new Dom(temp.el.parentNode);
                } else {
                    return null;
                }
            }

            if (checkCls) {
                return temp;
            }

            return null;
        }
    }, {
        key: "parent",
        value: function parent() {
            return new Dom(this.el.parentNode);
        }
    }, {
        key: "removeClass",
        value: function removeClass() {

            if (this.el.className) {
                var className = this.el.className;

                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                args.forEach(function (cls) {
                    className = (" " + className + " ").replace(" " + cls + " ", ' ').trim();
                });

                this.el.className = className;
            }

            return this;
        }
    }, {
        key: "hasClass",
        value: function hasClass(cls) {
            if (!this.el.className) {
                return false;
            } else {
                var newClass = " " + this.el.className + " ";
                return newClass.indexOf(" " + cls + " ") > -1;
            }
        }
    }, {
        key: "addClass",
        value: function addClass(cls) {
            if (!this.hasClass(cls)) {
                this.el.className = this.el.className + " " + cls;
            }

            return this;
        }
    }, {
        key: "toggleClass",
        value: function toggleClass(cls) {
            var isForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            if (arguments.length == 2) {
                if (isForce) {
                    this.addClass(cls);
                } else {
                    this.removeClass(cls);
                }
            } else {
                if (this.hasClass(cls)) {
                    this.removeClass(cls);
                } else {
                    this.addClass(cls);
                }
            }
        }
    }, {
        key: "html",
        value: function html(_html) {

            if (arguments.length == 0) {
                return this.el.innerHTML;
            }

            if (isString(_html)) {
                this.el.innerHTML = _html;
            } else {
                this.empty().append(_html);
            }

            return this;
        }
    }, {
        key: "find",
        value: function find(selector) {
            return this.el.querySelector(selector);
        }
    }, {
        key: "$",
        value: function $(selector) {
            var node = this.find(selector);
            return node ? new Dom(node) : null;
        }
    }, {
        key: "findAll",
        value: function findAll(selector) {
            return this.el.querySelectorAll(selector);
        }
    }, {
        key: "$$",
        value: function $$(selector) {
            return [].concat(toConsumableArray(this.findAll(selector))).map(function (node) {
                return new Dom(node);
            });
        }
    }, {
        key: "empty",
        value: function empty() {
            return this.html('');
        }
    }, {
        key: "append",
        value: function append(el) {

            if (isString(el)) {
                this.el.appendChild(document.createTextNode(el));
            } else {
                this.el.appendChild(el.el || el);
            }

            return this;
        }
    }, {
        key: "appendTo",
        value: function appendTo(target) {
            var t = target.el ? target.el : target;

            t.appendChild(this.el);

            return this;
        }
    }, {
        key: "remove",
        value: function remove() {
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }

            return this;
        }
    }, {
        key: "text",
        value: function text(value$$1) {
            if (arguments.length == 0) {
                return this.el.textContent;
            } else {
                this.el.textContent = value$$1;
                return this;
            }
        }

        /**
         * 
         * $el.css`
         *  border-color: yellow;
         * `
         * 
         * @param {*} key 
         * @param {*} value 
         */

    }, {
        key: "css",
        value: function css(key, value$$1) {
            var _this2 = this;

            if (arguments.length == 2) {
                this.el.style[key] = value$$1;
            } else if (arguments.length == 1) {

                if (isString(key)) {
                    return getComputedStyle(this.el)[key];
                } else {
                    var keys = key || {};
                    Object.keys(keys).forEach(function (k) {
                        _this2.el.style[k] = keys[k];
                    });
                }
            }

            return this;
        }
    }, {
        key: "cssText",
        value: function cssText(value$$1) {
            if (isUndefined(value$$1)) {
                return this.el.style.cssText;
            }

            this.el.style.cssText = value$$1;

            return this;
        }
    }, {
        key: "cssFloat",
        value: function cssFloat(key) {
            return parseFloat(this.css(key));
        }
    }, {
        key: "cssInt",
        value: function cssInt(key) {
            return parseInt(this.css(key));
        }
    }, {
        key: "px",
        value: function px$$1(key, value$$1) {
            return this.css(key, px$1(value$$1));
        }
    }, {
        key: "rect",
        value: function rect() {
            return this.el.getBoundingClientRect();
        }
    }, {
        key: "offset",
        value: function offset() {
            var rect = this.rect();

            var scrollTop = Dom.getScrollTop();
            var scrollLeft = Dom.getScrollLeft();

            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
    }, {
        key: "offsetLeft",
        value: function offsetLeft() {
            return this.offset().left;
        }
    }, {
        key: "offsetTop",
        value: function offsetTop() {
            return this.offset().top;
        }
    }, {
        key: "position",
        value: function position() {

            if (this.el.style.top) {
                return {
                    top: parseFloat(this.css('top')),
                    left: parseFloat(this.css('left'))
                };
            } else {
                return this.rect();
            }
        }
    }, {
        key: "size",
        value: function size() {
            return [this.width(), this.height()];
        }
    }, {
        key: "width",
        value: function width() {
            return this.el.offsetWidth || this.rect().width;
        }
    }, {
        key: "contentWidth",
        value: function contentWidth() {
            return this.width() - this.cssFloat('padding-left') - this.cssFloat('padding-right');
        }
    }, {
        key: "height",
        value: function height() {
            return this.el.offsetHeight || this.rect().height;
        }
    }, {
        key: "contentHeight",
        value: function contentHeight() {
            return this.height() - this.cssFloat('padding-top') - this.cssFloat('padding-bottom');
        }
    }, {
        key: "dataKey",
        value: function dataKey(key) {
            return this.uniqId + '.' + key;
        }
    }, {
        key: "data",
        value: function data(key, value$$1) {
            if (arguments.length == 2) {
                cached[this.dataKey(key)] = value$$1;
            } else if (arguments.length == 1) {
                return cached[this.dataKey(key)];
            } else {
                var keys = Object.keys(cached);

                var uniqId = this.uniqId + ".";
                return keys.filter(function (key) {
                    if (key.indexOf(uniqId) == 0) {
                        return true;
                    }

                    return false;
                }).map(function (value$$1) {
                    return cached[value$$1];
                });
            }

            return this;
        }
    }, {
        key: "val",
        value: function val(value$$1) {
            if (arguments.length == 0) {
                return this.el.value;
            } else if (arguments.length == 1) {
                this.el.value = value$$1;
            }

            return this;
        }
    }, {
        key: "int",
        value: function int() {
            return parseInt(this.val(), 10);
        }
    }, {
        key: "float",
        value: function float() {
            return parseFloat(this.val());
        }
    }, {
        key: "show",
        value: function show() {
            return this.css('display', 'block');
        }
    }, {
        key: "hide",
        value: function hide() {
            return this.css('display', 'none');
        }
    }, {
        key: "toggle",
        value: function toggle(isForce) {

            var currentHide = this.css('display') == 'none';

            if (arguments.length == 1) {
                currentHide = isForce;
            }

            if (currentHide) {
                return this.show();
            } else {
                return this.hide();
            }
        }
    }, {
        key: "scrollTop",
        value: function scrollTop() {
            if (this.el === document.body) {
                return Dom.getScrollTop();
            }

            return this.el.scrollTop;
        }
    }, {
        key: "scrollLeft",
        value: function scrollLeft() {
            if (this.el === document.body) {
                return Dom.getScrollLeft();
            }

            return this.el.scrollLeft;
        }
    }, {
        key: "on",
        value: function on(eventName, callback, opt1, opt2) {
            this.el.addEventListener(eventName, callback, opt1, opt2);

            return this;
        }
    }, {
        key: "off",
        value: function off(eventName, callback) {
            this.el.removeEventListener(eventName, callback);

            return this;
        }
    }, {
        key: "getElement",
        value: function getElement() {
            return this.el;
        }
    }, {
        key: "createChild",
        value: function createChild(tag) {
            var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var css = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var $element = new Dom(tag, className, attrs);
            $element.css(css);

            this.append($element);

            return $element;
        }
    }, {
        key: "firstChild",
        value: function firstChild() {
            return new Dom(this.el.firstElementChild);
        }
    }, {
        key: "children",
        value: function children() {
            var element = this.el.firstElementChild;

            if (!element) {
                return [];
            }

            var results = [];

            do {
                results.push(new Dom(element));
                element = element.nextElementSibling;
            } while (element);

            return results;
        }
    }, {
        key: "childLength",
        value: function childLength() {
            return this.el.children.length;
        }
    }, {
        key: "replace",
        value: function replace(newElement) {

            this.el.parentNode.replaceChild(newElement.el || newElement, this.el);

            return this;
        }
    }, {
        key: "checked",
        value: function checked() {
            var isChecked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


            if (arguments.length == 0) {
                return !!this.el.checked;
            }

            this.el.checked = !!isChecked;

            return this;
        }
    }], [{
        key: "getScrollTop",
        value: function getScrollTop() {
            return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        }
    }, {
        key: "getScrollLeft",
        value: function getScrollLeft() {
            return Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
        }
    }]);
    return Dom;
}();

var GETTER_PREFIX = '*/';
var ACTION_PREFIX = '/';

function GETTER(str) {
    return GETTER_PREFIX + str;
}

function ACTION(str) {
    return ACTION_PREFIX + str;
}

var BaseModule = function () {
    function BaseModule($store) {
        classCallCheck(this, BaseModule);

        this.$store = $store;
        this.initialize();
    }

    createClass(BaseModule, [{
        key: "afterDispatch",
        value: function afterDispatch() {}
    }, {
        key: "initialize",
        value: function initialize() {
            var _this = this;

            this.filterProps(ACTION_PREFIX).forEach(function (key) {
                _this.$store.action(key, _this);
            });

            this.filterProps(GETTER_PREFIX).forEach(function (key) {
                _this.$store.getter(key, _this);
            });
        }
    }, {
        key: "filterProps",
        value: function filterProps() {
            var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';

            return Object.getOwnPropertyNames(this.__proto__).filter(function (key) {
                return key.startsWith(pattern);
            });
        }
    }]);
    return BaseModule;
}();

var ColorSetsList = function (_BaseModule) {
    inherits(ColorSetsList, _BaseModule);

    function ColorSetsList() {
        classCallCheck(this, ColorSetsList);
        return possibleConstructorReturn(this, (ColorSetsList.__proto__ || Object.getPrototypeOf(ColorSetsList)).apply(this, arguments));
    }

    createClass(ColorSetsList, [{
        key: 'initialize',
        value: function initialize() {
            get$1(ColorSetsList.prototype.__proto__ || Object.getPrototypeOf(ColorSetsList.prototype), 'initialize', this).call(this);

            // set property
            this.$store.colorSetsList = [{ name: "Material",
                edit: true,
                colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
            }, { name: "Custom", "edit": true, "colors": [] }, { name: "Color Scale", "scale": ['red', 'yellow', 'black'], count: 5 }];
            this.$store.currentColorSets = {};
        }
    }, {
        key: ACTION('setUserPalette'),
        value: function value($store, list) {
            $store.userList = list;

            $store.dispatch('resetUserPalette');
            $store.dispatch('setCurrentColorSets');
        }
    }, {
        key: ACTION('resetUserPalette'),
        value: function value($store) {
            if ($store.userList && $store.userList.length) {
                $store.userList = $store.userList.map(function (element, index) {

                    if (isFunction(element.colors)) {
                        var makeCallback = element.colors;

                        element.colors = makeCallback($store);
                        element._colors = makeCallback;
                    }

                    return Object.assign({
                        name: 'color-' + index,
                        colors: []
                    }, element);
                });

                $store.emit('changeUserList');
            }
        }
    }, {
        key: ACTION('setCurrentColorSets'),
        value: function value($store, nameOrIndex) {

            var _list = $store.read('list');

            if (isUndefined(nameOrIndex)) {
                $store.currentColorSets = _list[0];
            } else if (isNumber(nameOrIndex)) {
                $store.currentColorSets = _list[nameOrIndex];
            } else {
                $store.currentColorSets = _list.filter(function (obj) {
                    return obj.name == nameOrIndex;
                })[0];
            }

            $store.emit('changeCurrentColorSets');
        }
    }, {
        key: GETTER('getCurrentColorSets'),
        value: function value($store) {
            return $store.currentColorSets;
        }
    }, {
        key: ACTION('addCurrentColor'),
        value: function value($store, color) {
            if (Array.isArray($store.currentColorSets.colors)) {
                $store.currentColorSets.colors.push(color);
                $store.emit('changeCurrentColorSets');
            }
        }
    }, {
        key: ACTION('setCurrentColorAll'),
        value: function value($store) {
            var colors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            $store.currentColorSets.colors = colors;
            $store.emit('changeCurrentColorSets');
        }
    }, {
        key: ACTION('removeCurrentColor'),
        value: function value($store, index) {
            if ($store.currentColorSets.colors[index]) {
                $store.currentColorSets.colors.splice(index, 1);
                $store.emit('changeCurrentColorSets');
            }
        }
    }, {
        key: ACTION('removeCurrentColorToTheRight'),
        value: function value($store, index) {
            if ($store.currentColorSets.colors[index]) {
                $store.currentColorSets.colors.splice(index, Number.MAX_VALUE);
                $store.emit('changeCurrentColorSets');
            }
        }
    }, {
        key: ACTION('clearPalette'),
        value: function value($store) {
            if ($store.currentColorSets.colors) {
                $store.currentColorSets.colors = [];
                $store.emit('changeCurrentColorSets');
            }
        }
    }, {
        key: GETTER('list'),
        value: function value($store) {
            return Array.isArray($store.userList) && $store.userList.length ? $store.userList : $store.colorSetsList;
        }
    }, {
        key: GETTER('getCurrentColors'),
        value: function value($store) {
            return $store.read('getColors', $store.currentColorSets);
        }
    }, {
        key: GETTER('getColors'),
        value: function value($store, element) {
            if (element.scale) {
                return Color$1.scale(element.scale, element.count);
            }

            return element.colors || [];
        }
    }, {
        key: GETTER('getColorSetsList'),
        value: function value($store) {
            return $store.read('list').map(function (element) {
                return {
                    name: element.name,
                    edit: element.edit,
                    colors: $store.read('getColors', element)
                };
            });
        }
    }]);
    return ColorSetsList;
}(BaseModule);

var EventChecker = function () {
    function EventChecker(value) {
        var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;
        classCallCheck(this, EventChecker);

        this.value = value;
        this.split = split;
    }

    createClass(EventChecker, [{
        key: 'toString',
        value: function toString() {
            return ' ' + this.split + ' ' + this.value;
        }
    }]);
    return EventChecker;
}();

// event name regular expression
var CHECK_LOAD_PATTERN = /^load (.*)/ig;
var CHECK_PATTERN = /^(click|mouse(down|up|move|over|out|enter|leave)|pointer(start|move|end)|touch(start|move|end)|key(down|up|press)|drag|dragstart|drop|dragover|dragenter|dragleave|dragexit|dragend|contextmenu|change|input|ttingttong|tt|paste|resize|scroll|submit)/ig;

var NAME_SAPARATOR = ':';
var CHECK_SAPARATOR = '|';
var LOAD_SAPARATOR = 'load ';
var SAPARATOR = ' ';

var DOM_EVENT_MAKE = function DOM_EVENT_MAKE() {
    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
    }

    var key = keys.join(NAME_SAPARATOR);
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return [key].concat(args).join(SAPARATOR);
    };
};

var CUSTOM = DOM_EVENT_MAKE;
var CLICK = DOM_EVENT_MAKE('click');
var DOUBLECLICK = DOM_EVENT_MAKE('dblclick');
var MOUSEDOWN = DOM_EVENT_MAKE('mousedown');
var MOUSEUP = DOM_EVENT_MAKE('mouseup');
var MOUSEMOVE = DOM_EVENT_MAKE('mousemove');
var MOUSEOVER = DOM_EVENT_MAKE('mouseover');
var MOUSEOUT = DOM_EVENT_MAKE('mouseout');
var MOUSEENTER = DOM_EVENT_MAKE('mouseenter');
var MOUSELEAVE = DOM_EVENT_MAKE('mouseleave');
var TOUCHSTART = DOM_EVENT_MAKE('touchstart');
var TOUCHMOVE = DOM_EVENT_MAKE('touchmove');
var TOUCHEND = DOM_EVENT_MAKE('touchend');
var KEYDOWN = DOM_EVENT_MAKE('keydown');
var KEYUP = DOM_EVENT_MAKE('keyup');
var KEYPRESS = DOM_EVENT_MAKE('keypress');
var DRAG = DOM_EVENT_MAKE('drag');
var DRAGSTART = DOM_EVENT_MAKE('dragstart');
var DROP = DOM_EVENT_MAKE('drop');
var DRAGOVER = DOM_EVENT_MAKE('dragover');
var DRAGENTER = DOM_EVENT_MAKE('dragenter');
var DRAGLEAVE = DOM_EVENT_MAKE('dragleave');
var DRAGEXIT = DOM_EVENT_MAKE('dragexit');
var DRAGOUT = DOM_EVENT_MAKE('dragout');
var DRAGEND = DOM_EVENT_MAKE('dragend');
var CONTEXTMENU = DOM_EVENT_MAKE('contextmenu');
var CHANGE = DOM_EVENT_MAKE('change');
var INPUT = DOM_EVENT_MAKE('input');
var PASTE = DOM_EVENT_MAKE('paste');
var RESIZE = DOM_EVENT_MAKE('resize');
var SCROLL = DOM_EVENT_MAKE('scroll');
var SUBMIT = DOM_EVENT_MAKE('submit');
var POINTERSTART = CUSTOM('mousedown', 'touchstart');
var POINTERMOVE = CUSTOM('mousemove', 'touchmove');
var POINTEREND = CUSTOM('mouseup', 'touchend');
var CHANGEINPUT = CUSTOM('change', 'input');

// custom event 

/*export const PREDEFINED_NAMES = {
    'pointerstart': 'mousedown:touchstart',
    'pointermove': 'mousemove:touchmove',
    'pointerend': 'mouseup:touchend'
}*/

// Predefined CHECKER 
var CHECKER = function CHECKER(value) {
    var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;

    return new EventChecker(value, split);
};

var ALT = CHECKER('ALT');
var SHIFT = CHECKER('SHIFT');
var META = CHECKER('META');
var CONTROL = CHECKER('CONTROL');

var ARROW_UP = CHECKER('ArrowUp');
var ARROW_DOWN = CHECKER('ArrowDown');
var ARROW_LEFT = CHECKER('ArrowLeft');
var ARROW_RIGHT = CHECKER('ArrowRight');

var SELF = CHECKER('self');
var CAPTURE = CHECKER('capture');

var DEBOUNCE = function DEBOUNCE() {
    var debounce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    return CHECKER('debounce(' + debounce + ')');
};

// Predefined LOADER
var LOAD = function LOAD() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '$el';

    return LOAD_SAPARATOR + value;
};

var Event = {
    addEvent: function addEvent(dom, eventName, callback) {
        var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (dom) {
            dom.addEventListener(eventName, callback, useCapture);
        }
    },
    removeEvent: function removeEvent(dom, eventName, callback) {
        if (dom) {
            dom.removeEventListener(eventName, callback);
        }
    },
    pos: function pos(e) {
        if (e.touches && e.touches[0]) {
            return e.touches[0];
        }

        return e;
    },
    posXY: function posXY(e) {
        var pos = this.pos(e);
        return {
            x: pos.pageX,
            y: pos.pageY
        };
    }
};

var DELEGATE_SPLIT = '.';

var State = function () {
  function State(masterObj) {
    var _this = this;

    var settingObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, State);


    this.masterObj = masterObj;
    this.settingObj = settingObj;

    window.addEventListener('resize', debounce(function () {
      _this.initialize();
    }, 300));
  }

  createClass(State, [{
    key: 'initialize',
    value: function initialize() {
      this.settingObj = {};
    }
  }, {
    key: 'set',
    value: function set$$1(key, value) {
      var defaultValue$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      this.settingObj[key] = value || defaultValue$$1;
    }
  }, {
    key: 'init',
    value: function init(key) {

      if (!this.has(key)) {

        var arr = key.split(DELEGATE_SPLIT);

        var obj = this.masterObj.refs[arr[0]] || this.masterObj[arr[0]] || this.masterObj;
        var method = arr.pop();

        if (obj[method]) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var value = obj[method].apply(obj, args);

          this.set(key, value);
        }
      }
    }
  }, {
    key: 'get',
    value: function get$$1(key) {
      var defaultValue$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


      this.init(key, defaultValue$$1);

      return this.settingObj[key] || defaultValue$$1;
    }
  }, {
    key: 'has',
    value: function has(key) {
      return !!this.settingObj[key];
    }
  }]);
  return State;
}();

var ALT$1 = 'ALT';
var SHIFT$1 = 'SHIFT';
var META$1 = 'META';
var CONTROL$1 = 'CONTROL';

var ARROW_UP$1 = 'ArrowUp';
var ARROW_DOWN$1 = 'ArrowDown';
var ARROW_LEFT$1 = 'ArrowLeft';
var ARROW_RIGHT$1 = 'ArrowRight';

var META_KEYS = [CONTROL$1, SHIFT$1, ALT$1, META$1];

var EventMachin = function () {
  function EventMachin() {
    classCallCheck(this, EventMachin);

    this.state = new State(this);
    this.refs = {};
    this.children = {};
    this.childComponents = this.components();
  }

  createClass(EventMachin, [{
    key: 'render',
    value: function render($container) {
      this.$el = this.parseTemplate(this.template());
      this.refs.$el = this.$el;

      if ($container) $container.html(this.$el);

      this.load();

      this.afterRender();
    }
  }, {
    key: 'afterRender',
    value: function afterRender() {}
  }, {
    key: 'components',
    value: function components() {
      return {};
    }
  }, {
    key: 'parseTemplate',
    value: function parseTemplate(html, isLoad) {
      var _this = this;

      if (Array.isArray(html)) {
        html = html.join('');
      }

      html = html.trim();

      var list = new Dom("div").html(html).children();

      var fragment = document.createDocumentFragment();

      list.forEach(function ($el) {
        // ref element 정리 
        if ($el.attr('ref')) {
          _this.refs[$el.attr('ref')] = $el;
        }
        var refs = $el.$$('[ref]');

        [].concat(toConsumableArray(refs)).forEach(function ($dom) {
          var name = $dom.attr('ref');
          _this.refs[name] = $dom;
        });

        fragment.appendChild($el.el);
      });

      if (!isLoad) {
        return list[0];
      }

      return fragment;
    }
  }, {
    key: 'parseComponent',
    value: function parseComponent() {
      var _this2 = this;

      var $el = this.$el;
      Object.keys(this.childComponents).forEach(function (ComponentName) {

        var Component = _this2.childComponents[ComponentName];
        var targets = $el.$$('' + ComponentName.toLowerCase());
        [].concat(toConsumableArray(targets)).forEach(function ($dom) {
          var props = {};

          [].concat(toConsumableArray($dom.el.attributes)).filter(function (t) {
            return ['ref'].indexOf(t.nodeName) < 0;
          }).forEach(function (t) {
            props[t.nodeName] = t.nodeValue;
          });

          var refName = $dom.attr('ref') || ComponentName;

          if (refName) {

            if (Component) {

              var instance = new Component(_this2, props);
              _this2.children[refName] = instance;
              _this2.refs[refName] = instance.$el;

              if (instance) {
                instance.render();

                $dom.replace(instance.$el);
              }
            }
          }
        });
      });
    }
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

      this.filterProps(CHECK_LOAD_PATTERN).forEach(function (callbackName) {
        var elName = callbackName.split(LOAD_SAPARATOR)[1];
        if (_this3.refs[elName]) {
          var fragment = _this3.parseTemplate(_this3[callbackName].call(_this3), true);
          _this3.refs[elName].html(fragment);
        }
      });

      this.parseComponent();
    }

    // 기본 템플릿 지정 

  }, {
    key: 'template',
    value: function template() {
      return '<div></div>';
    }
  }, {
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'eachChildren',
    value: function eachChildren(callback) {
      var _this4 = this;

      if (!isFunction(callback)) return;

      Object.keys(this.children).forEach(function (ChildComponentName) {
        callback(_this4.children[ChildComponentName]);
      });
    }

    /**
     * 이벤트를 초기화한다. 
     */

  }, {
    key: 'initializeEvent',
    value: function initializeEvent() {
      this.initializeEventMachin();

      // 자식 이벤트도 같이 초기화 한다. 
      // 그래서 이 메소드는 부모에서 한번만 불려도 된다. 
      this.eachChildren(function (Component) {
        Component.initializeEvent();
      });
    }

    /**
     * 자원을 해제한다. 
     * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다. 
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyEventMachin();
      // this.refs = {} 

      this.eachChildren(function (Component) {
        Component.destroy();
      });
    }
  }, {
    key: 'destroyEventMachin',
    value: function destroyEventMachin() {
      this.removeEventAll();
    }
  }, {
    key: 'initializeEventMachin',
    value: function initializeEventMachin() {
      this.filterProps(CHECK_PATTERN).forEach(this.parseEvent.bind(this));
    }

    /**
     * property 수집하기 
     * 상위 클래스의 모든 property 를 수집해서 리턴한다. 
     */

  }, {
    key: 'collectProps',
    value: function collectProps() {

      if (!this.collapsedProps) {
        var p = this.__proto__;
        var results = [];
        do {
          results.push.apply(results, toConsumableArray(Object.getOwnPropertyNames(p)));
          p = p.__proto__;
        } while (p);

        this.collapsedProps = results;
      }

      return this.collapsedProps;
    }
  }, {
    key: 'filterProps',
    value: function filterProps(pattern) {
      return this.collectProps().filter(function (key) {
        return key.match(pattern);
      });
    }
  }, {
    key: 'getEventNames',
    value: function getEventNames(eventName) {
      var results = [];

      eventName.split(NAME_SAPARATOR).forEach(function (e) {
        var arr = e.split(NAME_SAPARATOR);

        results.push.apply(results, toConsumableArray(arr));
      });

      return results;
    }
  }, {
    key: 'parseEvent',
    value: function parseEvent(key) {
      var _this5 = this;

      var checkMethodFilters = key.split(CHECK_SAPARATOR).map(function (it) {
        return it.trim();
      });
      var eventSelectorAndBehave = checkMethodFilters.shift();

      var _eventSelectorAndBeha = eventSelectorAndBehave.split(SAPARATOR),
          _eventSelectorAndBeha2 = toArray(_eventSelectorAndBeha),
          eventName = _eventSelectorAndBeha2[0],
          params = _eventSelectorAndBeha2.slice(1);

      var eventNames = this.getEventNames(eventName);
      var callback = this[key].bind(this);

      eventNames.forEach(function (eventName) {
        var eventInfo = [eventName].concat(toConsumableArray(params));
        // console.log(eventInfo)
        _this5.bindingEvent(eventInfo, checkMethodFilters, callback);
      });
    }
  }, {
    key: 'getDefaultDomElement',
    value: function getDefaultDomElement(dom) {
      var el = void 0;

      if (dom) {
        el = this.refs[dom] || this[dom] || window[dom];
      } else {
        el = this.el || this.$el || this.$root;
      }

      if (el instanceof Dom) {
        return el.getElement();
      }

      return el;
    }

    /* magic check method  */

  }, {
    key: 'self',
    value: function self(e) {
      // e.target 이 delegate 대상인지 체크 
      return e.$delegateTarget.el == e.target;
    }
  }, {
    key: 'getDefaultEventObject',
    value: function getDefaultEventObject(eventName, checkMethodFilters) {
      var _this6 = this;

      var isControl = checkMethodFilters.includes(CONTROL$1);
      var isShift = checkMethodFilters.includes(SHIFT$1);
      var isAlt = checkMethodFilters.includes(ALT$1);
      var isMeta = checkMethodFilters.includes(META$1);

      var arr = checkMethodFilters.filter(function (code) {
        return META_KEYS.includes(code.toUpperCase()) === false;
      });

      var checkMethodList = arr.filter(function (code) {
        return !!_this6[code];
      });

      // TODO: split debounce check code 
      var delay = arr.filter(function (code) {
        if (code.indexOf('debounce(') > -1) {
          return true;
        }
        return false;
      });

      var debounceTime = 0;
      if (delay.length) {
        debounceTime = delay[0].replace('debounce(', '').replace(')', '');
      }

      // capture 
      var capturing = arr.filter(function (code) {
        if (code.indexOf('capture') > -1) {
          return true;
        }
        return false;
      });

      var useCapture = false;
      if (capturing.length) {
        useCapture = true;
      }

      arr = arr.filter(function (code) {
        return checkMethodList.includes(code) === false && delay.includes(code) === false && capturing.includes(code) === false;
      }).map(function (code) {
        return code.toLowerCase();
      });

      // TODO: split debounce check code     

      return {
        eventName: eventName,
        isControl: isControl,
        isShift: isShift,
        isAlt: isAlt,
        isMeta: isMeta,
        codes: arr,
        useCapture: useCapture,
        debounce: debounceTime,
        checkMethodList: checkMethodList
      };
    }
  }, {
    key: 'bindingEvent',
    value: function bindingEvent(_ref, checkMethodFilters, callback) {
      var _ref2 = toArray(_ref),
          eventName = _ref2[0],
          dom = _ref2[1],
          delegate = _ref2.slice(2);

      var eventObject = this.getDefaultEventObject(eventName, checkMethodFilters);

      eventObject.dom = this.getDefaultDomElement(dom);
      eventObject.delegate = delegate.join(SAPARATOR);

      this.addEvent(eventObject, callback);
    }
  }, {
    key: 'matchPath',
    value: function matchPath(el, selector) {
      if (el) {
        if (el.matches(selector)) {
          return el;
        }
        return this.matchPath(el.parentElement, selector);
      }
      return null;
    }
  }, {
    key: 'getBindings',
    value: function getBindings() {

      if (!this._bindings) {
        this.initBindings();
      }

      return this._bindings;
    }
  }, {
    key: 'addBinding',
    value: function addBinding(obj) {
      this.getBindings().push(obj);
    }
  }, {
    key: 'initBindings',
    value: function initBindings() {
      this._bindings = [];
    }
  }, {
    key: 'checkEventType',
    value: function checkEventType(e, eventObject) {
      var _this7 = this;

      var onlyControl = eventObject.isControl ? e.ctrlKey : true;
      var onlyShift = eventObject.isShift ? e.shiftKey : true;
      var onlyAlt = eventObject.isAlt ? e.altKey : true;
      var onlyMeta = eventObject.isMeta ? e.metaKey : true;

      // 특정 keycode 를 가지고 있는지 체크 
      // keyup.pagedown  이라고 정의하면 pagedown 키를 눌렀을때만 동작 함 
      var hasKeyCode = true;
      if (eventObject.codes.length) {

        hasKeyCode = (e.code ? eventObject.codes.includes(e.code.toLowerCase()) : false) || (e.key ? eventObject.codes.includes(e.key.toLowerCase()) : false);
      }

      // 체크 메소드들은 모든 메소드를 다 적용해야한다. 
      var isAllCheck = true;
      if (eventObject.checkMethodList.length) {
        isAllCheck = eventObject.checkMethodList.every(function (method) {
          return _this7[method].call(_this7, e);
        });
      }

      return onlyControl && onlyAlt && onlyShift && onlyMeta && hasKeyCode && isAllCheck;
    }
  }, {
    key: 'makeCallback',
    value: function makeCallback(eventObject, callback) {
      var _this8 = this;

      if (eventObject.debounce) {
        callback = debounce(callback, eventObject.debounce);
      }

      if (eventObject.delegate) {
        return function (e) {
          var delegateTarget = _this8.matchPath(e.target || e.srcElement, eventObject.delegate);

          if (delegateTarget) {
            // delegate target 이 있는 경우만 callback 실행 
            e.$delegateTarget = new Dom(delegateTarget);
            e.xy = Event.posXY(e);

            if (_this8.checkEventType(e, eventObject)) {
              return callback(e, e.$delegateTarget, e.xy);
            }
          }
        };
      } else {
        return function (e) {
          e.xy = Event.posXY(e);
          if (_this8.checkEventType(e, eventObject)) {
            return callback(e);
          }
        };
      }
    }
  }, {
    key: 'addEvent',
    value: function addEvent(eventObject, callback) {
      eventObject.callback = this.makeCallback(eventObject, callback);
      this.addBinding(eventObject);
      Event.addEvent(eventObject.dom, eventObject.eventName, eventObject.callback, eventObject.useCapture);
    }
  }, {
    key: 'removeEventAll',
    value: function removeEventAll() {
      var _this9 = this;

      this.getBindings().forEach(function (obj) {
        _this9.removeEvent(obj);
      });
      this.initBindings();
    }
  }, {
    key: 'removeEvent',
    value: function removeEvent(_ref3) {
      var eventName = _ref3.eventName,
          dom = _ref3.dom,
          callback = _ref3.callback;

      Event.removeEvent(dom, eventName, callback);
    }
  }]);
  return EventMachin;
}();

// const CHECK_STORE_PATTERN = /^@/
var CHECK_STORE_MULTI_PATTERN = /^ME@/;

var PREFIX = '@';
var MULTI_PREFIX = 'ME@';
var SPLITTER = '|';

var PIPE = function PIPE() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.join(SPLITTER);
};

var EVENT = function EVENT() {
    return MULTI_PREFIX + PIPE.apply(undefined, arguments);
};

var UIElement = function (_EventMachin) {
    inherits(UIElement, _EventMachin);

    function UIElement(opt, props) {
        classCallCheck(this, UIElement);

        var _this = possibleConstructorReturn(this, (UIElement.__proto__ || Object.getPrototypeOf(UIElement)).call(this, opt));

        _this.opt = opt || {};
        _this.parent = _this.opt;
        _this.props = props || {};
        _this.source = uuid();
        _this.sourceName = _this.constructor.name;
        // window[this.source] = this; 

        if (opt && opt.$store) {
            _this.$store = opt.$store;
        }

        _this.created();

        _this.initialize();

        _this.initializeStoreEvent();
        return _this;
    }

    createClass(UIElement, [{
        key: 'created',
        value: function created() {}
    }, {
        key: 'getRealEventName',
        value: function getRealEventName(e) {
            var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PREFIX;

            var startIndex = e.indexOf(s);
            return e.substr(startIndex == 0 ? 0 : startIndex + s.length);
        }

        /**
         * initialize store event 
         * 
         * you can define '@xxx' method(event) in UIElement 
         * 
         * 
         */

    }, {
        key: 'initializeStoreEvent',
        value: function initializeStoreEvent() {
            var _this2 = this;

            this.storeEvents = {};

            /*
            this.filterProps(CHECK_STORE_PATTERN).forEach((key) => {
                const event = this.getRealEventName(key);
                 this.storeEvents[event] = this[key].bind(this)
                this.$store.on(event, this.storeEvents[event], this);
            }); */

            this.filterProps(CHECK_STORE_MULTI_PATTERN).forEach(function (key) {
                var events = _this2.getRealEventName(key, MULTI_PREFIX);

                var callback = _this2[key].bind(_this2);

                events.split(SPLITTER).forEach(function (e) {
                    e = _this2.getRealEventName(e);

                    _this2.storeEvents[e] = callback;
                    _this2.$store.on(e, _this2.storeEvents[e], _this2);
                });
            });
        }
    }, {
        key: 'destoryStoreEvent',
        value: function destoryStoreEvent() {
            var _this3 = this;

            Object.keys(this.storeEvents).forEach(function (event) {
                _this3.$store.off(event, _this3.storeEvents[event]);
            });
        }
    }, {
        key: 'read',
        value: function read() {
            var _$store;

            return (_$store = this.$store).read.apply(_$store, arguments);
        }
    }, {
        key: 'i18n',
        value: function i18n() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return this.read.apply(this, ['i18n/get'].concat(args));
        }
    }, {
        key: 'run',
        value: function run() {
            var _$store2;

            return (_$store2 = this.$store).run.apply(_$store2, arguments);
        }
    }, {
        key: 'dispatch',
        value: function dispatch() {
            var _$store3;

            this.$store.source = this.source;
            return (_$store3 = this.$store).dispatch.apply(_$store3, arguments);
        }
    }, {
        key: 'emit',
        value: function emit() {
            var _$store4;

            this.$store.source = this.source;
            (_$store4 = this.$store).emit.apply(_$store4, arguments);
        }
    }, {
        key: 'commit',
        value: function commit(eventType) {
            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            this.run.apply(this, ['item/set'].concat(args));
            this.emit.apply(this, [eventType].concat(args));
        }
    }]);
    return UIElement;
}(EventMachin);

var ColorManager = function (_BaseModule) {
    inherits(ColorManager, _BaseModule);

    function ColorManager() {
        classCallCheck(this, ColorManager);
        return possibleConstructorReturn(this, (ColorManager.__proto__ || Object.getPrototypeOf(ColorManager)).apply(this, arguments));
    }

    createClass(ColorManager, [{
        key: 'initialize',
        value: function initialize() {
            get$1(ColorManager.prototype.__proto__ || Object.getPrototypeOf(ColorManager.prototype), 'initialize', this).call(this);

            this.$store.rgb = {};
            this.$store.hsl = {};
            this.$store.hsv = {};
            this.$store.alpha = 1;
            this.$store.format = 'hex';

            // this.$store.dispatch('changeColor');
        }
    }, {
        key: ACTION('changeFormat'),
        value: function value($store, format) {
            $store.format = format;

            $store.emit('changeFormat');
        }
    }, {
        key: ACTION('initColor'),
        value: function value($store, colorObj, source) {
            $store.dispatch('changeColor', colorObj, source, true);
            $store.emit('initColor');
        }
    }, {
        key: ACTION('changeColor'),
        value: function value($store, colorObj, source, isNotEmit) {

            colorObj = colorObj || '#FF0000';

            if (isString(colorObj)) {
                colorObj = Color$1.parse(colorObj);
            }

            colorObj.source = colorObj.source || source;

            $store.alpha = isUndefined(colorObj.a) ? $store.alpha : colorObj.a;
            $store.format = colorObj.type != 'hsv' ? colorObj.type || $store.format : $store.format;

            if ($store.format == 'hex' && $store.alpha < 1) {
                $store.format = 'rgb';
            }

            if (colorObj.type == 'hsl') {
                $store.hsl = Object.assign($store.hsl, colorObj);
                $store.rgb = Color$1.HSLtoRGB($store.hsl);
                $store.hsv = Color$1.HSLtoHSV(colorObj);
            } else if (colorObj.type == 'hex') {
                $store.rgb = Object.assign($store.rgb, colorObj);
                $store.hsl = Color$1.RGBtoHSL($store.rgb);
                $store.hsv = Color$1.RGBtoHSV(colorObj);
            } else if (colorObj.type == 'rgb') {
                $store.rgb = Object.assign($store.rgb, colorObj);
                $store.hsl = Color$1.RGBtoHSL($store.rgb);
                $store.hsv = Color$1.RGBtoHSV(colorObj);
            } else if (colorObj.type == 'hsv') {
                $store.hsv = Object.assign($store.hsv, colorObj);
                $store.rgb = Color$1.HSVtoRGB($store.hsv);
                $store.hsl = Color$1.HSVtoHSL($store.hsv);
            }

            if (!isNotEmit) {
                $store.emit('changeColor', colorObj.source);
            }
        }
    }, {
        key: GETTER('getHueColor'),
        value: function value($store) {
            return HueColor.checkHueColor($store.hsv.h / 360);
        }
    }, {
        key: GETTER('toString'),
        value: function value($store, type) {
            type = type || $store.format;
            var colorObj = $store[type] || $store.rgb;
            return Color$1.format(Object.assign({}, colorObj, { a: $store.alpha }), type);
        }
    }, {
        key: GETTER('toColor'),
        value: function value($store, type) {
            type = (type || $store.format).toLowerCase();

            if (type == 'rgb') {
                return $store.read('toRGB');
            } else if (type == 'hsl') {
                return $store.read('toHSL');
            } else if (type == 'hex') {
                return $store.read('toHEX');
            }

            return $store.read('toString', type);
        }
    }, {
        key: GETTER('toRGB'),
        value: function value($store) {
            return $store.read('toString', 'rgb');
        }
    }, {
        key: GETTER('toHSL'),
        value: function value($store) {
            return $store.read('toString', 'hsl');
        }
    }, {
        key: GETTER('toHEX'),
        value: function value($store) {
            return $store.read('toString', 'hex').toUpperCase();
        }
    }]);
    return ColorManager;
}(BaseModule);

var PREVENT = 'PREVENT';

var BaseStore = function () {
    function BaseStore(opt) {
        classCallCheck(this, BaseStore);

        this.callbacks = [];
        this.actions = [];
        this.getters = [];
        this.modules = opt.modules || [];

        this.initialize();
    }

    createClass(BaseStore, [{
        key: "initialize",
        value: function initialize() {
            this.initializeModule();
        }
    }, {
        key: "initializeModule",
        value: function initializeModule() {
            var _this = this;

            this.modules.forEach(function (ModuleClass) {
                var instance = _this.addModule(ModuleClass);
            });
        }
    }, {
        key: "action",
        value: function action(_action, context) {
            var actionName = _action.substr(_action.indexOf(ACTION_PREFIX) + ACTION_PREFIX.length);
            this.actions[actionName] = { context: context, callback: context[_action] };
        }
    }, {
        key: "getter",
        value: function getter(action, context) {
            var actionName = action.substr(action.indexOf(GETTER_PREFIX) + GETTER_PREFIX.length);
            this.getters[actionName] = { context: context, callback: context[action] };
        }
    }, {
        key: "dispatch",
        value: function dispatch(action, $1, $2, $3, $4, $5) {
            var m = this.actions[action];

            if (m) {
                var ret = this.run(action, $1, $2, $3, $4, $5);

                if (ret != PREVENT) {
                    m.context.afterDispatch();
                }
            } else {
                throw new Error('action : ' + action + ' is not a valid.');
            }
        }
    }, {
        key: "run",
        value: function run(action, $1, $2, $3, $4, $5) {
            var m = this.actions[action];

            if (m) {
                m.callback.call(m.context, this, $1, $2, $3, $4, $5);
            } else {
                throw new Error('action : ' + action + ' is not a valid.');
            }
        }
    }, {
        key: "read",
        value: function read(action, $1, $2, $3, $4, $5) {
            var m = this.getters[action];

            if (m) {
                return m.callback.call(m.context, this, $1, $2, $3, $4, $5);
            } else {
                throw new Error('getter : ' + action + ' is not a valid.');
            }
        }
    }, {
        key: "clone",
        value: function clone(action, $1, $2, $3, $4, $5) {
            return JSON.parse(JSON.stringify(this.read(action, $1, $2, $3, $4, $5)));
        }
    }, {
        key: "addModule",
        value: function addModule(ModuleClass) {
            return new ModuleClass(this);
        }
    }, {
        key: "on",
        value: function on(event, originalCallback, context) {
            var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var callback = delay > 0 ? debounce(originalCallback, delay) : originalCallback;
            this.callbacks.push({ event: event, callback: callback, context: context, originalCallback: originalCallback });
        }
    }, {
        key: "off",
        value: function off(event, originalCallback) {

            if (arguments.length == 0) {
                this.callbacks = [];
            } else if (arguments.length == 1) {
                this.callbacks = this.callbacks.filter(function (f) {
                    return f.event != event;
                });
            } else if (arguments.length == 2) {
                this.callbacks = this.callbacks.filter(function (f) {
                    return !(f.event == event && f.originalCallback == originalCallback);
                });
            }
        }
    }, {
        key: "emit",
        value: function emit($1, $2, $3, $4, $5) {
            var _this2 = this;

            var event = $1;

            this.callbacks.filter(function (f) {
                return f.event == event;
            }).forEach(function (f) {
                if (f && isFunction(f.callback) && f.context.source != _this2.source) {
                    f.callback($2, $3, $4, $5);
                }
            });
        }
    }]);
    return BaseStore;
}();

var BaseColorPicker = function (_UIElement) {
    inherits(BaseColorPicker, _UIElement);

    function BaseColorPicker() {
        classCallCheck(this, BaseColorPicker);
        return possibleConstructorReturn(this, (BaseColorPicker.__proto__ || Object.getPrototypeOf(BaseColorPicker)).apply(this, arguments));
    }

    createClass(BaseColorPicker, [{
        key: 'created',
        value: function created() {
            this.isColorPickerShow = false;
            this.isShortCut = false;
            this.hideDelay = +defaultValue(this.opt.hideDeplay, 2000);
            this.timerCloseColorPicker;
            this.autoHide = this.opt.autoHide || true;
            this.outputFormat = this.opt.outputFormat;
            this.$checkColorPickerClass = this.checkColorPickerClass.bind(this);
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            var _this2 = this;

            var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.$body = null;
            this.$root = null;

            this.$store = new BaseStore({
                modules: [ColorManager, ColorSetsList].concat(toConsumableArray(modules))
            });

            this.callbackChange = function () {
                _this2.callbackChangeValue();
            };

            this.colorpickerShowCallback = function () {};
            this.colorpickerHideCallback = function () {};

            this.$body = new Dom(this.getContainer());
            this.$root = new Dom('div', 'codemirror-colorpicker');

            //  append colorpicker to container (ex : body)
            if (this.opt.position == 'inline') {
                this.$body.append(this.$root);
            }

            if (this.opt.type) {
                // to change css style
                this.$root.addClass(this.opt.type);
            }

            if (this.opt.hideInformation) {
                this.$root.addClass('hide-information');
            }

            if (this.opt.hideColorsets) {
                this.$root.addClass('hide-colorsets');
            }

            this.$arrow = new Dom('div', 'arrow');

            this.$root.append(this.$arrow);

            this.dispatch('setUserPalette', this.opt.colorSets);

            this.render(this.$root);

            this.initColorWithoutChangeEvent(this.opt.color);

            // 이벤트 연결 
            this.initializeEvent();
        }
    }, {
        key: 'initColorWithoutChangeEvent',
        value: function initColorWithoutChangeEvent(color) {
            this.dispatch('initColor', color);
        }

        /** 
         * public method 
         * 
         */

        /**
         * 
         * show colorpicker with position  
         * 
         * @param {{left, top, hideDelay, isShortCut}} opt 
         * @param {String|Object} color  
         * @param {Function} showCallback  it is called when colorpicker is shown
         * @param {Function} hideCallback  it is called once when colorpicker is hidden
         */

    }, {
        key: 'show',
        value: function show(opt, color, showCallback, hideCallback) {

            // 매번 이벤트를 지우고 다시 생성할 필요가 없어서 초기화 코드는 지움. 
            // this.destroy();
            // this.initializeEvent();
            // define colorpicker callback
            this.colorpickerShowCallback = showCallback;
            this.colorpickerHideCallback = hideCallback;
            this.$root.css(this.getInitalizePosition()).show();

            this.definePosition(opt);

            this.isColorPickerShow = true;
            this.isShortCut = opt.isShortCut || false;
            this.outputFormat = opt.outputFormat;

            // define hide delay
            this.hideDelay = +defaultValue(opt.hideDelay, 2000);
            if (this.hideDelay > 0) {
                this.setHideDelay(this.hideDelay);
            }

            this.$root.appendTo(this.$body);

            this.initColorWithoutChangeEvent(color);
        }

        /**
         * 
         * initialize color for colorpicker
         * 
         * @param {String|Object} newColor 
         * @param {String} format  hex, rgb, hsl
         */

    }, {
        key: 'initColor',
        value: function initColor(newColor, format) {
            this.dispatch('changeColor', newColor, format);
        }

        /**
         * hide colorpicker 
         * 
         */

    }, {
        key: 'hide',
        value: function hide() {
            if (this.isColorPickerShow) {
                // this.destroy();
                this.$root.hide();
                this.$root.remove(); // not empty 
                this.isColorPickerShow = false;

                this.callbackHideValue();
            }
        }

        /**
         * set to colors in current sets that you see 
         * @param {Array} colors 
         */

    }, {
        key: 'setColorsInPalette',
        value: function setColorsInPalette() {
            var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.dispatch('setCurrentColorAll', colors);
        }

        /**
         * refresh all color palette 
         * 
         * @param {*} list 
         */

    }, {
        key: 'setUserPalette',
        value: function setUserPalette() {
            var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.dispatch('setUserPalette', list);
        }

        /**
         * private method 
         */

    }, {
        key: 'getOption',
        value: function getOption(key) {
            return this.opt[key];
        }
    }, {
        key: 'setOption',
        value: function setOption(key, value) {
            this.opt[key] = value;
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            return this.opt.container || document.body;
        }
    }, {
        key: 'getColor',
        value: function getColor(type) {
            return this.read('toColor', type);
        }
    }, {
        key: 'definePositionForArrow',
        value: function definePositionForArrow(opt, elementScreenLeft, elementScreenTop) {
            // console.log(arguments)
        }
    }, {
        key: 'definePosition',
        value: function definePosition(opt) {

            var width = this.$root.width();
            var height = this.$root.height();

            // set left position for color picker
            var elementScreenLeft = opt.left - this.$body.scrollLeft();
            if (width + elementScreenLeft > window.innerWidth) {
                elementScreenLeft -= width + elementScreenLeft - window.innerWidth;
            }
            if (elementScreenLeft < 0) {
                elementScreenLeft = 0;
            }

            // set top position for color picker
            var elementScreenTop = opt.top - this.$body.scrollTop();
            if (height + elementScreenTop > window.innerHeight) {
                elementScreenTop -= height + elementScreenTop - window.innerHeight;
            }
            if (elementScreenTop < 0) {
                elementScreenTop = 0;
            }

            // set position
            this.$root.css({
                left: px(elementScreenLeft),
                top: px(elementScreenTop)
            });

            // this.definePositionForArrow(opt, elementScreenLeft, elementScreenTop);
        }
    }, {
        key: 'getInitalizePosition',
        value: function getInitalizePosition() {
            if (this.opt.position == 'inline') {
                return {
                    position: 'relative',
                    left: 'auto',
                    top: 'auto',
                    display: 'inline-block'
                };
            } else {
                return {
                    position: 'fixed', // color picker has fixed position
                    left: '-10000px',
                    top: '-10000px'
                };
            }
        }
    }, {
        key: 'setHideDelay',
        value: function setHideDelay(delayTime) {
            var _this3 = this;

            delayTime = delayTime || 0;

            var hideCallback = this.hide.bind(this);

            this.$root.off('mouseenter');
            this.$root.off('mouseleave');

            this.$root.on('mouseenter', function () {
                clearTimeout(_this3.timerCloseColorPicker);
            });

            this.$root.on('mouseleave', function () {
                clearTimeout(_this3.timerCloseColorPicker);
                _this3.timerCloseColorPicker = setTimeout(hideCallback, delayTime);
            });

            clearTimeout(this.timerCloseColorPicker);
            // this.timerCloseColorPicker = setTimeout(hideCallback, delayTime);
        }
    }, {
        key: 'callbackChangeValue',
        value: function callbackChangeValue(color) {
            color = color || this.getCurrentColor();

            if (isFunction(this.opt.onChange)) {
                this.opt.onChange.call(this, color);
            }

            if (isFunction(this.colorpickerShowCallback)) {
                this.colorpickerShowCallback(color);
            }
        }
    }, {
        key: 'callbackHideValue',
        value: function callbackHideValue(color) {
            color = color || this.getCurrentColor();
            if (isFunction(this.opt.onHide)) {
                this.opt.onHide.call(this, color);
            }

            if (isFunction(this.colorpickerHideCallback)) {
                this.colorpickerHideCallback(color);
            }
        }
    }, {
        key: 'getCurrentColor',
        value: function getCurrentColor() {
            return this.read('toColor', this.outputFormat);
        }
    }, {
        key: 'checkColorPickerClass',
        value: function checkColorPickerClass(el) {
            var $el = new Dom(el);
            var hasColorView = $el.closest('codemirror-colorview');
            var hasColorPicker = $el.closest('codemirror-colorpicker');
            var hasCodeMirror = $el.closest('CodeMirror');
            var IsInHtml = el.nodeName == 'HTML';

            return !!(hasColorPicker || hasColorView || hasCodeMirror);
        }
    }, {
        key: 'checkInHtml',
        value: function checkInHtml(el) {
            var IsInHtml = el.nodeName == 'HTML';

            return IsInHtml;
        }
    }, {
        key: 'initializeStoreEvent',
        value: function initializeStoreEvent() {
            get$1(BaseColorPicker.prototype.__proto__ || Object.getPrototypeOf(BaseColorPicker.prototype), 'initializeStoreEvent', this).call(this);

            this.$store.on('changeColor', this.callbackChange, this);
            this.$store.on('changeFormat', this.callbackChange, this);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            get$1(BaseColorPicker.prototype.__proto__ || Object.getPrototypeOf(BaseColorPicker.prototype), 'destroy', this).call(this);

            this.$store.off('changeColor', this.callbackChange);
            this.$store.off('changeFormat', this.callbackChange);

            this.callbackChange = undefined;

            // remove color picker callback
            this.colorpickerShowCallback = undefined;
            this.colorpickerHideCallback = undefined;
        }

        // Event Bindings 

    }, {
        key: MOUSEUP('document'),
        value: function value(e) {

            // when color picker clicked in outside
            if (this.checkInHtml(e.target)) {
                //this.setHideDelay(hideDelay);
            } else if (this.checkColorPickerClass(e.target) == false) {
                this.hide();
            }
        }
    }]);
    return BaseColorPicker;
}(UIElement);

var BaseBox = function (_UIElement) {
    inherits(BaseBox, _UIElement);

    function BaseBox() {
        classCallCheck(this, BaseBox);
        return possibleConstructorReturn(this, (BaseBox.__proto__ || Object.getPrototypeOf(BaseBox)).apply(this, arguments));
    }

    createClass(BaseBox, [{
        key: 'refresh',
        value: function refresh() {}
    }, {
        key: 'refreshColorUI',
        value: function refreshColorUI(e) {}

        /** push change event  */

    }, {
        key: 'changeColor',
        value: function changeColor(opt) {
            this.dispatch('changeColor', opt || {});
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value(e) {
            this.onDragEnd(e);
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value(e) {
            this.onDragMove(e);
        }
    }, {
        key: POINTERSTART('$bar'),
        value: function value(e) {
            e.preventDefault();
            this.isDown = true;
        }
    }, {
        key: POINTERSTART('$container'),
        value: function value(e) {
            this.isDown = true;
            this.onDragStart(e);
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(e) {
            this.isDown = true;
            this.refreshColorUI(e);
        }
    }, {
        key: 'onDragMove',
        value: function onDragMove(e) {
            if (this.isDown) {
                this.refreshColorUI(e);
            }
        }

        /* called when mouse is ended move  */

    }, {
        key: 'onDragEnd',
        value: function onDragEnd(e) {
            this.isDown = false;
        }
    }, {
        key: EVENT('changeColor'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('initColor'),
        value: function value() {
            this.refresh();
        }
    }]);
    return BaseBox;
}(UIElement);

var BaseSlider = function (_BaseBox) {
    inherits(BaseSlider, _BaseBox);

    function BaseSlider() {
        classCallCheck(this, BaseSlider);
        return possibleConstructorReturn(this, (BaseSlider.__proto__ || Object.getPrototypeOf(BaseSlider)).apply(this, arguments));
    }

    createClass(BaseSlider, [{
        key: 'initialize',
        value: function initialize() {
            get$1(BaseSlider.prototype.__proto__ || Object.getPrototypeOf(BaseSlider.prototype), 'initialize', this).call(this);
            this.minValue = 0; // min domain value 
            this.maxValue = 1; // max domain value 
        }

        /* slider container's min and max position */

    }, {
        key: 'getMinMaxPosition',
        value: function getMinMaxPosition() {
            var min = this.getMinPosition();
            var width = this.getMaxDist();
            var max = min + width;

            return { min: min, max: max, width: width };
        }

        /** get current position on page  */

    }, {
        key: 'getCurrent',
        value: function getCurrent(value$$1) {
            return min + this.getMaxDist() * value$$1;
        }

        /** get min position on slider container  */

    }, {
        key: 'getMinPosition',
        value: function getMinPosition() {
            return this.refs.$container.offset().left;
        }
    }, {
        key: 'getMaxDist',
        value: function getMaxDist() {
            return this.refs.$container.width();
        }

        /** get dist for position value */

    }, {
        key: 'getDist',
        value: function getDist(current) {
            var _getMinMaxPosition = this.getMinMaxPosition(),
                min = _getMinMaxPosition.min,
                max = _getMinMaxPosition.max;

            var dist;
            if (current < min) {
                dist = 0;
            } else if (current > max) {
                dist = 100;
            } else {
                dist = (current - min) / (max - min) * 100;
            }

            return dist;
        }

        /** get caculated dist for domain value   */

    }, {
        key: 'getCaculatedDist',
        value: function getCaculatedDist(e) {
            var current = e ? this.getMousePosition(e) : this.getCurrent(this.getDefaultValue() / this.maxValue);
            var dist = this.getDist(current);

            return dist;
        }

        /** get default value used in slider container */

    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return 0;
        }

        /** set mosue position */

    }, {
        key: 'setMousePosition',
        value: function setMousePosition(x) {
            this.refs.$bar.css({ left: px$1(x) });
        }

        /** set mouse position in page */

    }, {
        key: 'getMousePosition',
        value: function getMousePosition(e) {
            return Event.pos(e).pageX;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setColorUI();
        }

        /** set drag bar position  */

    }, {
        key: 'setColorUI',
        value: function setColorUI(v) {

            v = v || this.getDefaultValue();

            if (v <= this.minValue) {
                this.refs.$bar.addClass('first').removeClass('last');
            } else if (v >= this.maxValue) {
                this.refs.$bar.addClass('last').removeClass('first');
            } else {
                this.refs.$bar.removeClass('last').removeClass('first');
            }

            this.setMousePosition(this.getMaxDist() * ((v || 0) / this.maxValue));
        }
    }]);
    return BaseSlider;
}(BaseBox);

var Value = function (_BaseSlider) {
    inherits(Value, _BaseSlider);

    function Value() {
        classCallCheck(this, Value);
        return possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).apply(this, arguments));
    }

    createClass(Value, [{
        key: 'initialize',
        value: function initialize() {
            get$1(Value.prototype.__proto__ || Object.getPrototypeOf(Value.prototype), 'initialize', this).call(this);

            this.minValue = 0;
            this.maxValue = 1;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class="value">\n                <div ref="$container" class="value-container">\n                    <div ref="$bar" class="drag-bar"></div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor() {
            this.refs.$container.css("background-color", this.read('toRGB'));
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            get$1(Value.prototype.__proto__ || Object.getPrototypeOf(Value.prototype), 'refresh', this).call(this);
            this.setBackgroundColor();
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.$store.hsv.v;
        }
    }, {
        key: 'refreshColorUI',
        value: function refreshColorUI(e) {
            var dist = this.getCaculatedDist(e);

            this.setColorUI(dist / 100 * this.maxValue);

            this.changeColor({
                type: 'hsv',
                v: dist / 100 * this.maxValue
            });
        }
    }]);
    return Value;
}(BaseSlider);

var Opacity = function (_BaseSlider) {
    inherits(Opacity, _BaseSlider);

    function Opacity() {
        classCallCheck(this, Opacity);
        return possibleConstructorReturn(this, (Opacity.__proto__ || Object.getPrototypeOf(Opacity)).apply(this, arguments));
    }

    createClass(Opacity, [{
        key: 'initialize',
        value: function initialize() {
            get$1(Opacity.prototype.__proto__ || Object.getPrototypeOf(Opacity.prototype), 'initialize', this).call(this);

            this.minValue = 0;
            this.maxValue = 1;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n        <div class="opacity">\n            <div ref="$container" class="opacity-container">\n                <div ref="$colorbar" class="color-bar"></div>\n                <div ref="$bar" class="drag-bar2"></div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            get$1(Opacity.prototype.__proto__ || Object.getPrototypeOf(Opacity.prototype), 'refresh', this).call(this);
            this.setOpacityColorBar();
        }
    }, {
        key: 'setOpacityColorBar',
        value: function setOpacityColorBar() {
            var rgb = Object.assign({}, this.$store.rgb);

            rgb.a = 0;
            var start = Color$1.format(rgb, 'rgb');

            rgb.a = 1;
            var end = Color$1.format(rgb, 'rgb');

            this.refs.$colorbar.css('background', 'linear-gradient(to right, ' + start + ', ' + end + ')');
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.$store.alpha;
        }
    }, {
        key: 'refreshColorUI',
        value: function refreshColorUI(e) {
            var dist = this.getCaculatedDist(e);

            this.setColorUI(dist / 100 * this.maxValue);

            this.changeColor({
                a: Math.floor(dist) / 100 * this.maxValue
            });
        }
    }]);
    return Opacity;
}(BaseSlider);

var ColorView = function (_UIElement) {
    inherits(ColorView, _UIElement);

    function ColorView() {
        classCallCheck(this, ColorView);
        return possibleConstructorReturn(this, (ColorView.__proto__ || Object.getPrototypeOf(ColorView)).apply(this, arguments));
    }

    createClass(ColorView, [{
        key: 'template',
        value: function template() {
            return '<div class="color"></div>';
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor() {
            this.refs.$el.css("background-color", this.read('toRGB'));
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setBackgroundColor();
        }
    }, {
        key: EVENT('changeColor'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('initColor'),
        value: function value() {
            this.refresh();
        }
    }]);
    return ColorView;
}(UIElement);

var ColorWheel = function (_UIElement) {
    inherits(ColorWheel, _UIElement);

    function ColorWheel() {
        classCallCheck(this, ColorWheel);
        return possibleConstructorReturn(this, (ColorWheel.__proto__ || Object.getPrototypeOf(ColorWheel)).apply(this, arguments));
    }

    createClass(ColorWheel, [{
        key: 'initialize',
        value: function initialize() {
            get$1(ColorWheel.prototype.__proto__ || Object.getPrototypeOf(ColorWheel.prototype), 'initialize', this).call(this);
            this.width = 214;
            this.height = 214;
            this.thinkness = 0;
            this.half_thinkness = 0;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n        <div class="wheel">\n            <canvas class="wheel-canvas" ref="$colorwheel" ></canvas>\n            <div class="wheel-canvas" ref="$valuewheel" ></div>\n            <div class="drag-pointer" ref="$drag_pointer"></div>\n        </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh(isEvent) {
            this.setColorUI(isEvent);
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI(isEvent) {
            this.renderCanvas();
            this.renderValue();
            this.setHueColor(null, isEvent);
        }
    }, {
        key: 'renderValue',
        value: function renderValue() {
            var value = 1 - this.$store.hsv.v;
            this.refs.$valuewheel.css('background-color', 'rgba(0, 0, 0, ' + value + ')');
        }
    }, {
        key: 'renderWheel',
        value: function renderWheel(width, height) {

            if (this.width && !width) width = this.width;
            if (this.height && !height) height = this.height;

            var $canvas = new Dom('canvas');
            var context = $canvas.el.getContext('2d');
            $canvas.el.width = width;
            $canvas.el.height = height;
            $canvas.px('width', width);
            $canvas.px('height', height);

            var img = context.getImageData(0, 0, width, height);
            var pixels = img.data;
            var half_width = Math.floor(width / 2);
            var half_height = Math.floor(height / 2);

            var radius = width > height ? half_height : half_width;
            var cx = half_width;
            var cy = half_height;

            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var rx = x - cx + 1,
                        ry = y - cy + 1,
                        d = rx * rx + ry * ry,
                        hue = caculateAngle(rx, ry);

                    var rgb = Color$1.HSVtoRGB(hue, // 0~360 hue 
                    Math.min(Math.sqrt(d) / radius, 1), // 0..1 Saturation 
                    1 //  0..1 Value
                    );

                    var index = (y * width + x) * 4;
                    pixels[index] = rgb.r;
                    pixels[index + 1] = rgb.g;
                    pixels[index + 2] = rgb.b;
                    pixels[index + 3] = 255;
                }
            }

            context.putImageData(img, 0, 0);

            if (this.thinkness > 0) {
                context.globalCompositeOperation = "destination-out"; // destination-out 은 그리는 영역이 지워진다. 
                context.fillStyle = 'black';
                context.beginPath();
                context.arc(cx, cy, radius - this.thinkness, 0, Math.PI * 2);
                context.closePath();
                context.fill();
            }

            return $canvas;
        }
    }, {
        key: 'renderCanvas',
        value: function renderCanvas() {

            // only once rendering 
            if (this.$store.createdWheelCanvas) return;

            var $canvas = this.refs.$colorwheel;
            // console.log($canvas);
            var context = $canvas.el.getContext('2d');

            var _$canvas$size = $canvas.size(),
                _$canvas$size2 = slicedToArray(_$canvas$size, 2),
                width = _$canvas$size2[0],
                height = _$canvas$size2[1];

            if (this.width && !width) width = this.width;
            if (this.height && !height) height = this.height;

            $canvas.el.width = width;
            $canvas.el.height = height;
            $canvas.px('width', width);
            $canvas.px('height', height);

            var $wheelCanvas = this.renderWheel(width, height);

            context.drawImage($wheelCanvas.el, 0, 0);

            this.$store.createdWheelCanvas = true;
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.$store.hsv.h;
        }
    }, {
        key: 'getDefaultSaturation',
        value: function getDefaultSaturation() {
            return this.$store.hsv.s;
        }
    }, {
        key: 'getCurrentXY',
        value: function getCurrentXY(e, angle, radius, centerX, centerY) {
            return e ? e.xy : getXYInCircle(angle, radius, centerX, centerY);
        }
    }, {
        key: 'getRectangle',
        value: function getRectangle() {
            var width = this.$el.width();
            var height = this.$el.height();
            var radius = this.refs.$colorwheel.width() / 2;

            var minX = this.$el.offsetLeft();
            var centerX = minX + width / 2;

            var minY = this.$el.offsetTop();
            var centerY = minY + height / 2;

            return { minX: minX, minY: minY, width: width, height: height, radius: radius, centerX: centerX, centerY: centerY };
        }
    }, {
        key: 'setHueColor',
        value: function setHueColor(e, isEvent) {

            if (!this.state.get('$el.width')) return;

            var _getRectangle = this.getRectangle(),
                minX = _getRectangle.minX,
                minY = _getRectangle.minY,
                radius = _getRectangle.radius,
                centerX = _getRectangle.centerX,
                centerY = _getRectangle.centerY;

            var _getCurrentXY = this.getCurrentXY(e, this.getDefaultValue(), this.getDefaultSaturation() * radius, centerX, centerY),
                x = _getCurrentXY.x,
                y = _getCurrentXY.y;

            var rx = x - centerX,
                ry = y - centerY,
                d = rx * rx + ry * ry,
                hue = caculateAngle(rx, ry);

            if (d > radius * radius) {
                var _getCurrentXY2 = this.getCurrentXY(null, hue, radius, centerX, centerY),
                    x = _getCurrentXY2.x,
                    y = _getCurrentXY2.y;
            }

            // saturation 을 
            var saturation = Math.min(Math.sqrt(d) / radius, 1);

            // set drag pointer position 
            this.refs.$drag_pointer.px('left', x - minX);
            this.refs.$drag_pointer.px('top', y - minY);

            if (!isEvent) {
                this.changeColor({
                    type: 'hsv',
                    h: hue,
                    s: saturation
                });
            }
        }
    }, {
        key: 'changeColor',
        value: function changeColor(opt) {
            this.dispatch('changeColor', opt || {});
        }
    }, {
        key: EVENT('changeColor'),
        value: function value() {
            this.refresh(true);
        }
    }, {
        key: EVENT('initColor'),
        value: function value() {
            this.refresh(true);
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value(e) {
            if (this.isDown) {
                this.setHueColor(e);
            }
        }
    }, {
        key: POINTERSTART('$drag_pointer'),
        value: function value(e) {
            e.preventDefault();
            this.isDown = true;
        }
    }, {
        key: POINTERSTART(),
        value: function value(e) {
            this.isDown = true;
            this.setHueColor(e);
        }
    }]);
    return ColorWheel;
}(UIElement);

var ColorInformation = function (_UIElement) {
    inherits(ColorInformation, _UIElement);

    function ColorInformation() {
        classCallCheck(this, ColorInformation);
        return possibleConstructorReturn(this, (ColorInformation.__proto__ || Object.getPrototypeOf(ColorInformation)).apply(this, arguments));
    }

    createClass(ColorInformation, [{
        key: 'template',
        value: function template() {
            return '\n        <div class="information hex">\n            <div ref="$informationChange" class="information-change">\n                <button ref="$formatChangeButton" type="button" class="format-change-button arrow-button"></button>\n            </div>\n            <div class="information-item hex">\n                <div class="input-field hex">\n                    <input ref="$hexCode" class="input" type="text" />\n                    <div class="title">HEX</div>\n                </div>\n            </div>\n            <div class="information-item rgb">\n                <div class="input-field rgb-r">\n                    <input ref="$rgb_r" class="input" type="number" step="1" min="0" max="255" />\n                    <div class="title">R</div>\n                </div>\n                <div class="input-field rgb-g">\n                    <input ref="$rgb_g" class="input" type="number" step="1" min="0" max="255" />\n                    <div class="title">G</div>\n                </div>\n                <div class="input-field rgb-b">\n                    <input ref="$rgb_b" class="input" type="number" step="1" min="0" max="255" />\n                    <div class="title">B</div>\n                </div>          \n                <div class="input-field rgb-a">\n                    <input ref="$rgb_a" class="input" type="number" step="0.01" min="0" max="1" />\n                    <div class="title">A</div>\n                </div>                                                            \n            </div>\n            <div class="information-item hsl">\n                <div class="input-field hsl-h">\n                    <input ref="$hsl_h" class="input" type="number" step="1" min="0" max="360" />\n                    <div class="title">H</div>\n                </div>\n                <div class="input-field hsl-s">\n                    <input ref="$hsl_s" class="input" type="number" step="1" min="0" max="100" />\n                    <div class="postfix">%</div>\n                    <div class="title">S</div>\n                </div>\n                <div class="input-field hsl-l">\n                    <input ref="$hsl_l" class="input" type="number" step="1" min="0" max="100" />\n                    <div class="postfix">%</div>                        \n                    <div class="title">L</div>\n                </div>\n                <div class="input-field hsl-a">\n                    <input ref="$hsl_a" class="input" type="number" step="0.01" min="0" max="1" />\n                    <div class="title">A</div>\n                </div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'setCurrentFormat',
        value: function setCurrentFormat(format) {
            this.format = format;

            this.initFormat();
        }
    }, {
        key: 'initFormat',
        value: function initFormat() {
            var current_format = this.format || 'hex';

            this.$el.removeClass('hex');
            this.$el.removeClass('rgb');
            this.$el.removeClass('hsl');
            this.$el.addClass(current_format);
        }
    }, {
        key: 'nextFormat',
        value: function nextFormat() {
            var current_format = this.format || 'hex';

            var next_format = 'hex';
            if (current_format == 'hex') {
                next_format = 'rgb';
            } else if (current_format == 'rgb') {
                next_format = 'hsl';
            } else if (current_format == 'hsl') {
                if (this.$store.alpha == 1) {
                    next_format = 'hex';
                } else {
                    next_format = 'rgb';
                }
            }

            this.$el.removeClass(current_format);
            this.$el.addClass(next_format);
            this.format = next_format;

            this.dispatch('changeFormat', this.format);
        }
    }, {
        key: 'getFormat',
        value: function getFormat() {
            return this.format || 'hex';
        }
    }, {
        key: 'checkNumberKey',
        value: function checkNumberKey(e) {
            return Event.checkNumberKey(e);
        }
    }, {
        key: 'checkNotNumberKey',
        value: function checkNotNumberKey(e) {
            return !Event.checkNumberKey(e);
        }
    }, {
        key: 'changeRgbColor',
        value: function changeRgbColor() {
            this.dispatch('changeColor', {
                type: 'rgb',
                r: this.refs.$rgb_r.int(),
                g: this.refs.$rgb_g.int(),
                b: this.refs.$rgb_b.int(),
                a: this.refs.$rgb_a.float()
            });
        }
    }, {
        key: 'changeHslColor',
        value: function changeHslColor() {
            this.dispatch('changeColor', {
                type: 'hsl',
                h: this.refs.$hsl_h.int(),
                s: this.refs.$hsl_s.int(),
                l: this.refs.$hsl_l.int(),
                a: this.refs.$hsl_a.float()
            });
        }
    }, {
        key: EVENT('changeColor'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('initColor'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: INPUT('$rgb_r'),
        value: function value(e) {
            this.changeRgbColor();
        }
    }, {
        key: INPUT('$rgb_g'),
        value: function value(e) {
            this.changeRgbColor();
        }
    }, {
        key: INPUT('$rgb_b'),
        value: function value(e) {
            this.changeRgbColor();
        }
    }, {
        key: INPUT('$rgb_a'),
        value: function value(e) {
            this.changeRgbColor();
        }
    }, {
        key: INPUT('$hsl_h'),
        value: function value(e) {
            this.changeHslColor();
        }
    }, {
        key: INPUT('$hsl_s'),
        value: function value(e) {
            this.changeHslColor();
        }
    }, {
        key: INPUT('$hsl_l'),
        value: function value(e) {
            this.changeHslColor();
        }
    }, {
        key: INPUT('$hsl_a'),
        value: function value(e) {
            this.changeHslColor();
        }
    }, {
        key: KEYDOWN('$hexCode'),
        value: function value(e) {
            if (e.which < 65 || e.which > 70) {
                return this.checkNumberKey(e);
            }
        }
    }, {
        key: KEYUP('$hexCode'),
        value: function value(e) {
            var code = this.refs.$hexCode.val();

            if (code.charAt(0) == '#' && code.length == 7) {
                this.dispatch('changeColor', code);
            }
        }
    }, {
        key: CLICK('$formatChangeButton'),
        value: function value(e) {
            this.nextFormat();
        }
    }, {
        key: 'setRGBInput',
        value: function setRGBInput() {
            this.refs.$rgb_r.val(this.$store.rgb.r);
            this.refs.$rgb_g.val(this.$store.rgb.g);
            this.refs.$rgb_b.val(this.$store.rgb.b);
            this.refs.$rgb_a.val(this.$store.alpha);
        }
    }, {
        key: 'setHSLInput',
        value: function setHSLInput() {
            this.refs.$hsl_h.val(this.$store.hsl.h);
            this.refs.$hsl_s.val(this.$store.hsl.s);
            this.refs.$hsl_l.val(this.$store.hsl.l);
            this.refs.$hsl_a.val(this.$store.alpha);
        }
    }, {
        key: 'setHexInput',
        value: function setHexInput() {
            this.refs.$hexCode.val(this.read('toHEX'));
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setCurrentFormat(this.$store.format);
            this.setRGBInput();
            this.setHSLInput();
            this.setHexInput();
        }
    }]);
    return ColorInformation;
}(UIElement);

var DATA_COLORSETS_INDEX = 'data-colorsets-index';

var ColorSetsChooser = function (_UIElement) {
    inherits(ColorSetsChooser, _UIElement);

    function ColorSetsChooser() {
        classCallCheck(this, ColorSetsChooser);
        return possibleConstructorReturn(this, (ColorSetsChooser.__proto__ || Object.getPrototypeOf(ColorSetsChooser)).apply(this, arguments));
    }

    createClass(ColorSetsChooser, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="color-chooser">\n                <div class="color-chooser-container">\n                    <div class="colorsets-item colorsets-item-header">\n                        <h1 class="title">Color Palettes</h1>\n                        <span ref="$toggleButton" class="items">&times;</span>\n                    </div>\n                    <div ref="$colorsetsList" class="colorsets-list"></div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.load();
        }
    }, {
        key: EVENT('changeCurrentColorSets'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('toggleColorChooser'),
        value: function value() {
            this.toggle();
        }

        // loadable 

    }, {
        key: LOAD('$colorsetsList'),
        value: function value() {
            // colorsets 
            var colorSets = this.read('getColorSetsList');

            return '\n            <div>\n                ' + colorSets.map(function (element, index) {
                return '\n                        <div class="colorsets-item" data-colorsets-index="' + index + '" >\n                            <h1 class="title">' + element.name + '</h1>\n                            <div class="items">\n                                <div>\n                                    ' + element.colors.filter(function (color, i) {
                    return i < 5;
                }).map(function (color) {
                    color = color || 'rgba(255, 255, 255, 1)';
                    return '<div class="color-item" title="' + color + '">\n                                                <div class="color-view" style="background-color: ' + color + '"></div>\n                                            </div>';
                }).join('') + '\n                                </div>\n                            </div>\n                        </div>';
            }).join('') + '\n            </div>\n        ';
        }
    }, {
        key: 'show',
        value: function show() {
            this.$el.addClass('open');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.removeClass('open');
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.$el.toggleClass('open');
        }
    }, {
        key: CLICK('$toggleButton'),
        value: function value(e) {
            this.toggle();
        }
    }, {
        key: CLICK('$colorsetsList .colorsets-item'),
        value: function value(e, $dt) {
            if ($dt) {

                var index = parseInt($item.attr(DATA_COLORSETS_INDEX));

                this.dispatch('setCurrentColorSets', index);

                this.hide();
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            get$1(ColorSetsChooser.prototype.__proto__ || Object.getPrototypeOf(ColorSetsChooser.prototype), 'destroy', this).call(this);

            this.hide();
        }
    }]);
    return ColorSetsChooser;
}(UIElement);

var CurrentColorSets = function (_UIElement) {
    inherits(CurrentColorSets, _UIElement);

    function CurrentColorSets() {
        classCallCheck(this, CurrentColorSets);
        return possibleConstructorReturn(this, (CurrentColorSets.__proto__ || Object.getPrototypeOf(CurrentColorSets)).apply(this, arguments));
    }

    createClass(CurrentColorSets, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="colorsets">\n                <div class="menu" title="Open Color Palettes">\n                    <button ref="$colorSetsChooseButton" type="button" class="color-sets-choose-btn arrow-button"></button>\n                </div>\n                <div ref="$colorSetsColorList" class="color-list"></div>\n            </div>\n        ';
        }
    }, {
        key: LOAD('$colorSetsColorList'),
        value: function value() {
            var currentColorSets = this.read('getCurrentColorSets');
            var colors = this.read('getCurrentColors');

            return '\n            <div class="current-color-sets">\n            ' + colors.map(function (color, i) {
                return '<div class="color-item" title="' + color + '" data-index="' + i + '" data-color="' + color + '">\n                    <div class="empty"></div>\n                    <div class="color-view" style="background-color: ' + color + '"></div>\n                </div>';
            }).join('') + '   \n            ' + (currentColorSets.edit ? '<div class="add-color-item">+</div>' : '') + '         \n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.load();
        }
    }, {
        key: 'addColor',
        value: function addColor(color) {
            this.dispatch('addCurrentColor', color);
            this.refresh();
        }
    }, {
        key: EVENT('changeCurrentColorSets'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CLICK('$colorSetsChooseButton'),
        value: function value(e) {
            this.emit('toggleColorChooser');
        }
    }, {
        key: CONTEXTMENU('$colorSetsColorList'),
        value: function value(e) {
            e.preventDefault();
            var currentColorSets = this.read('getCurrentColorSets');

            if (!currentColorSets.edit) {
                return;
            }

            var $target = new Dom(e.target);

            var $item = $target.closest('color-item');

            if ($item) {
                var index = parseInt($item.attr('data-index'));

                this.emit('showContextMenu', e, index);
            } else {
                this.emit('showContextMenu', e);
            }
        }
    }, {
        key: CLICK('$colorSetsColorList .add-color-item'),
        value: function value(e) {
            this.addColor(this.read('toColor'));
        }
    }, {
        key: CLICK('$colorSetsColorList .color-item'),
        value: function value(e, $dt) {
            this.dispatch('changeColor', $dt.attr('data-color'));
        }
    }]);
    return CurrentColorSets;
}(UIElement);

var CurrentColorSetsContextMenu = function (_UIElement) {
    inherits(CurrentColorSetsContextMenu, _UIElement);

    function CurrentColorSetsContextMenu() {
        classCallCheck(this, CurrentColorSetsContextMenu);
        return possibleConstructorReturn(this, (CurrentColorSetsContextMenu.__proto__ || Object.getPrototypeOf(CurrentColorSetsContextMenu)).apply(this, arguments));
    }

    createClass(CurrentColorSetsContextMenu, [{
        key: 'template',
        value: function template() {
            return '\n            <ul class="colorsets-contextmenu">\n                <li class="menu-item small-hide" data-type="remove-color">Remove color</li>\n                <li class="menu-item small-hide" data-type="remove-all-to-the-right">Remove all to the right</li>\n                <li class="menu-item" data-type="clear-palette">Clear palette</li>\n            </ul>\n        ';
        }
    }, {
        key: 'show',
        value: function show(e, index) {
            var $event = Event.pos(e);

            this.$el.px('top', $event.clientY - 10);
            this.$el.px('left', $event.clientX);
            this.$el.addClass('show');
            this.selectedColorIndex = index;

            if (isUndefined(this.selectedColorIndex)) {
                this.$el.addClass('small');
            } else {
                this.$el.removeClass('small');
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.removeClass('show');
        }
    }, {
        key: 'runCommand',
        value: function runCommand(command) {
            switch (command) {
                case 'remove-color':
                    this.dispatch('removeCurrentColor', this.selectedColorIndex);
                    break;
                case 'remove-all-to-the-right':
                    this.dispatch('removeCurrentColorToTheRight', this.selectedColorIndex);
                    break;
                case 'clear-palette':
                    this.dispatch('clearPalette');
                    break;
            }
        }
    }, {
        key: EVENT('showContextMenu'),
        value: function value(e, index) {
            this.show(e, index);
        }
    }, {
        key: CLICK('$el .menu-item'),
        value: function value(e, $dt) {
            e.preventDefault();

            this.runCommand($dt.attr('data-type'));
            this.hide();
        }
    }]);
    return CurrentColorSetsContextMenu;
}(UIElement);

var MacOSColorPicker = function (_BaseColorPicker) {
    inherits(MacOSColorPicker, _BaseColorPicker);

    function MacOSColorPicker() {
        classCallCheck(this, MacOSColorPicker);
        return possibleConstructorReturn(this, (MacOSColorPicker.__proto__ || Object.getPrototypeOf(MacOSColorPicker)).apply(this, arguments));
    }

    createClass(MacOSColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <ColorWheel></ColorWheel>\n                <div class="control">\n                    <Value></Value>\n                    <Opacity></Opacity>\n                    <div class="empty"></div>\n                    <ColorView></ColorView>\n                </div>\n                <Information></Information>\n                <CurrentColorSets></CurrentColorSets>\n                <ColorSetsChooser></ColorSetsChooser>\n                <ContextMenu></ContextMenu>                \n            </div> \n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Value: Value, Opacity: Opacity, ColorView: ColorView,
                ColorWheel: ColorWheel,
                Information: ColorInformation,
                CurrentColorSets: CurrentColorSets,
                ColorSetsChooser: ColorSetsChooser,
                ContextMenu: CurrentColorSetsContextMenu
            };
        }
    }]);
    return MacOSColorPicker;
}(BaseColorPicker);

var Hue = function (_BaseSlider) {
    inherits(Hue, _BaseSlider);

    function Hue() {
        classCallCheck(this, Hue);
        return possibleConstructorReturn(this, (Hue.__proto__ || Object.getPrototypeOf(Hue)).apply(this, arguments));
    }

    createClass(Hue, [{
        key: 'initialize',
        value: function initialize() {
            get$1(Hue.prototype.__proto__ || Object.getPrototypeOf(Hue.prototype), 'initialize', this).call(this);
            this.minValue = 0;
            this.maxValue = 360;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class="hue">\n                <div ref="$container" class="hue-container">\n                    <div ref="$bar" class="drag-bar"></div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.$store.hsv.h;
        }
    }, {
        key: 'refreshColorUI',
        value: function refreshColorUI(e) {

            var dist = this.getCaculatedDist(e);

            this.setColorUI(dist / 100 * this.maxValue);

            this.changeColor({
                h: dist / 100 * this.maxValue,
                type: 'hsv'
            });
        }
    }]);
    return Hue;
}(BaseSlider);

var ColorPalette = function (_UIElement) {
    inherits(ColorPalette, _UIElement);

    function ColorPalette() {
        classCallCheck(this, ColorPalette);
        return possibleConstructorReturn(this, (ColorPalette.__proto__ || Object.getPrototypeOf(ColorPalette)).apply(this, arguments));
    }

    createClass(ColorPalette, [{
        key: 'template',
        value: function template() {
            return '\n        <div class="color-panel">\n            <div ref="$saturation" class="saturation">\n                <div ref="$value" class="value">\n                    <div ref="$drag_pointer" class="drag-pointer"></div>\n                </div>\n            </div>        \n        </div>        \n        ';
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor(color) {
            this.$el.css("background-color", color);
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setColorUI();
        }
    }, {
        key: 'caculateSV',
        value: function caculateSV() {
            var pos = this.drag_pointer_pos || { x: 0, y: 0 };

            var width = this.$el.width();
            var height = this.$el.height();

            var s = pos.x / width;
            var v = (height - pos.y) / height;

            this.dispatch('changeColor', {
                type: 'hsv',
                s: s,
                v: v
            });
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI() {
            var x = this.state.get('$el.width') * this.$store.hsv.s,
                y = this.state.get('$el.height') * (1 - this.$store.hsv.v);

            this.refs.$drag_pointer.px('left', x);
            this.refs.$drag_pointer.px('top', y);

            this.drag_pointer_pos = { x: x, y: y };

            this.setBackgroundColor(this.read('getHueColor'));
        }
    }, {
        key: 'setMainColor',
        value: function setMainColor(e) {
            // e.preventDefault();
            var pos = this.state.get('$el.offset');
            var w = this.state.get('$el.contentWidth');
            var h = this.state.get('$el.contentHeight');

            var x = Event.pos(e).pageX - pos.left;
            var y = Event.pos(e).pageY - pos.top;

            if (x < 0) x = 0;else if (x > w) x = w;

            if (y < 0) y = 0;else if (y > h) y = h;

            this.refs.$drag_pointer.px('left', x);
            this.refs.$drag_pointer.px('top', y);

            this.drag_pointer_pos = { x: x, y: y };

            this.caculateSV();
        }
    }, {
        key: EVENT('changeColor'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('initColor'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: POINTEREND('document'),
        value: function value(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value(e) {
            if (this.isDown) {
                this.setMainColor(e);
            }
        }
    }, {
        key: POINTERSTART(),
        value: function value(e) {
            this.isDown = true;
            this.setMainColor(e);
        }
    }, {
        key: POINTEREND(),
        value: function value(e) {
            this.isDown = false;
        }
    }]);
    return ColorPalette;
}(UIElement);

var ChromeDevToolColorPicker = function (_BaseColorPicker) {
    inherits(ChromeDevToolColorPicker, _BaseColorPicker);

    function ChromeDevToolColorPicker() {
        classCallCheck(this, ChromeDevToolColorPicker);
        return possibleConstructorReturn(this, (ChromeDevToolColorPicker.__proto__ || Object.getPrototypeOf(ChromeDevToolColorPicker)).apply(this, arguments));
    }

    createClass(ChromeDevToolColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <Palette></Palette> \n                <div class="control">\n                    <Hue></Hue>\n                    <Opacity></Opacity>\n                    <div class="empty"></div>\n                    <ColorView></ColorView>\n                </div>\n                <Information></Information>\n                <CurrentColorSets></CurrentColorSets>\n                <ColorSetsChooser></ColorSetsChooser>\n                <ContextMenu></ContextMenu>\n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Hue: Hue, Opacity: Opacity, ColorView: ColorView,
                Palette: ColorPalette,
                Information: ColorInformation,
                CurrentColorSets: CurrentColorSets,
                ColorSetsChooser: ColorSetsChooser,
                ContextMenu: CurrentColorSetsContextMenu
            };
        }
    }]);
    return ChromeDevToolColorPicker;
}(BaseColorPicker);

var MiniColorPicker = function (_BaseColorPicker) {
    inherits(MiniColorPicker, _BaseColorPicker);

    function MiniColorPicker() {
        classCallCheck(this, MiniColorPicker);
        return possibleConstructorReturn(this, (MiniColorPicker.__proto__ || Object.getPrototypeOf(MiniColorPicker)).apply(this, arguments));
    }

    createClass(MiniColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <Palette></Palette>\n                <div class="control">\n                    <Hue></Hue>\n                    <Opacity></Opacity>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Hue: Hue, Opacity: Opacity, Palette: ColorPalette
            };
        }
    }]);
    return MiniColorPicker;
}(BaseColorPicker);

var VerticalSlider = function (_BaseSlider) {
    inherits(VerticalSlider, _BaseSlider);

    function VerticalSlider() {
        classCallCheck(this, VerticalSlider);
        return possibleConstructorReturn(this, (VerticalSlider.__proto__ || Object.getPrototypeOf(VerticalSlider)).apply(this, arguments));
    }

    createClass(VerticalSlider, [{
        key: 'getMaxDist',


        /** get max height for vertical slider */
        value: function getMaxDist() {
            return this.refs.$container.height();
        }

        /** set mouse pointer for vertical slider */

    }, {
        key: 'setMousePosition',
        value: function setMousePosition(y) {
            this.refs.$bar.px('top', y);
        }

        /** get mouse position by pageY for vertical slider */

    }, {
        key: 'getMousePosition',
        value: function getMousePosition(e) {
            return Event.pos(e).pageY;
        }

        /** get min position for vertial slider */

    }, {
        key: 'getMinPosition',
        value: function getMinPosition() {
            return this.refs.$container.offset().top;
        }

        /** get caculated dist for domain value   */

    }, {
        key: 'getCaculatedDist',
        value: function getCaculatedDist(e) {
            var current = e ? this.getMousePosition(e) : this.getCurrent(this.getDefaultValue() / this.maxValue);
            var dist = 100 - this.getDist(current);

            return dist;
        }

        /** set drag bar position  */

    }, {
        key: 'setColorUI',
        value: function setColorUI(v) {

            v = v || this.getDefaultValue();

            if (v <= this.minValue) {
                this.refs.$bar.addClass('first').removeClass('last');
            } else if (v >= this.maxValue) {
                this.refs.$bar.addClass('last').removeClass('first');
            } else {
                this.refs.$bar.removeClass('last').removeClass('first');
            }

            var per = 1 - (v || 0) / this.maxValue;

            this.setMousePosition(this.getMaxDist() * per);
        }
    }]);
    return VerticalSlider;
}(BaseSlider);

var VerticalHue = function (_VerticalSlider) {
    inherits(VerticalHue, _VerticalSlider);

    function VerticalHue() {
        classCallCheck(this, VerticalHue);
        return possibleConstructorReturn(this, (VerticalHue.__proto__ || Object.getPrototypeOf(VerticalHue)).apply(this, arguments));
    }

    createClass(VerticalHue, [{
        key: 'initialize',
        value: function initialize() {
            get$1(VerticalHue.prototype.__proto__ || Object.getPrototypeOf(VerticalHue.prototype), 'initialize', this).call(this);
            this.minValue = 0;
            this.maxValue = 360;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class="hue">\n                <div ref="$container" class="hue-container">\n                    <div ref="$bar" class="drag-bar"></div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.$store.hsv.h;
        }
    }, {
        key: 'refreshColorUI',
        value: function refreshColorUI(e) {

            var dist = this.getCaculatedDist(e);

            this.setColorUI(dist / 100 * this.maxValue);

            this.changeColor({
                h: dist / 100 * this.maxValue,
                type: 'hsv'
            });
        }
    }]);
    return VerticalHue;
}(VerticalSlider);

var VerticalOpacity = function (_VerticalSlider) {
    inherits(VerticalOpacity, _VerticalSlider);

    function VerticalOpacity() {
        classCallCheck(this, VerticalOpacity);
        return possibleConstructorReturn(this, (VerticalOpacity.__proto__ || Object.getPrototypeOf(VerticalOpacity)).apply(this, arguments));
    }

    createClass(VerticalOpacity, [{
        key: 'template',
        value: function template() {
            return '\n        <div class="opacity">\n            <div ref="$container" class="opacity-container">\n                <div ref="$colorbar" class="color-bar"></div>\n                <div ref="$bar" class="drag-bar2"></div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            get$1(VerticalOpacity.prototype.__proto__ || Object.getPrototypeOf(VerticalOpacity.prototype), 'refresh', this).call(this);
            this.setOpacityColorBar();
        }
    }, {
        key: 'setOpacityColorBar',
        value: function setOpacityColorBar() {
            var rgb = Object.assign({}, this.$store.rgb);

            rgb.a = 0;
            var start = Color$1.format(rgb, 'rgb');

            rgb.a = 1;
            var end = Color$1.format(rgb, 'rgb');

            this.refs.$colorbar.css('background', 'linear-gradient(to top, ' + start + ', ' + end + ')');
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.$store.alpha;
        }
    }, {
        key: 'refreshColorUI',
        value: function refreshColorUI(e) {
            var dist = this.getCaculatedDist(e);

            this.setColorUI(dist / 100 * this.maxValue);

            this.changeColor({
                a: Math.floor(dist) / 100 * this.maxValue
            });
        }
    }]);
    return VerticalOpacity;
}(VerticalSlider);

var MiniColorPicker$2 = function (_BaseColorPicker) {
    inherits(MiniColorPicker, _BaseColorPicker);

    function MiniColorPicker() {
        classCallCheck(this, MiniColorPicker);
        return possibleConstructorReturn(this, (MiniColorPicker.__proto__ || Object.getPrototypeOf(MiniColorPicker)).apply(this, arguments));
    }

    createClass(MiniColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <Palette></Palette><div class="control"><Hue></Hue><Opacity></Opacity></div>\n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Hue: VerticalHue,
                Opacity: VerticalOpacity,
                Palette: ColorPalette
            };
        }
    }]);
    return MiniColorPicker;
}(BaseColorPicker);

var ColorRing = function (_ColorWheel) {
    inherits(ColorRing, _ColorWheel);

    function ColorRing() {
        classCallCheck(this, ColorRing);
        return possibleConstructorReturn(this, (ColorRing.__proto__ || Object.getPrototypeOf(ColorRing)).apply(this, arguments));
    }

    createClass(ColorRing, [{
        key: 'initialize',
        value: function initialize() {
            get$1(ColorRing.prototype.__proto__ || Object.getPrototypeOf(ColorRing.prototype), 'initialize', this).call(this);

            this.width = 214;
            this.height = 214;
            this.thinkness = 16;
            this.half_thinkness = this.thinkness / 2;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n        <div class="wheel" data-type="ring">\n            <canvas class="wheel-canvas" ref="$colorwheel" ></canvas>\n            <div class="drag-pointer" ref="$drag_pointer"></div>\n        </div>\n        ';
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI(isEvent) {
            this.renderCanvas();
            this.setHueColor(null, isEvent);
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return this.$store.hsv.h;
        }
    }, {
        key: 'setHueColor',
        value: function setHueColor(e, isEvent) {

            if (!this.state.get('$el.width')) return;

            var _getRectangle = this.getRectangle(),
                minX = _getRectangle.minX,
                minY = _getRectangle.minY,
                radius = _getRectangle.radius,
                centerX = _getRectangle.centerX,
                centerY = _getRectangle.centerY;

            var _getCurrentXY = this.getCurrentXY(e, this.getDefaultValue(), radius, centerX, centerY),
                x = _getCurrentXY.x,
                y = _getCurrentXY.y;

            var rx = x - centerX,
                ry = y - centerY,
                hue = caculateAngle(rx, ry);

            {
                var _getCurrentXY2 = this.getCurrentXY(null, hue, radius - this.half_thinkness, centerX, centerY),
                    x = _getCurrentXY2.x,
                    y = _getCurrentXY2.y;
            }

            // set drag pointer position 
            this.refs.$drag_pointer.px('left', x - minX);
            this.refs.$drag_pointer.px('top', y - minY);

            if (!isEvent) {
                this.changeColor({
                    type: 'hsv',
                    h: hue
                });
            }
        }
    }]);
    return ColorRing;
}(ColorWheel);

var RingColorPicker = function (_BaseColorPicker) {
    inherits(RingColorPicker, _BaseColorPicker);

    function RingColorPicker() {
        classCallCheck(this, RingColorPicker);
        return possibleConstructorReturn(this, (RingColorPicker.__proto__ || Object.getPrototypeOf(RingColorPicker)).apply(this, arguments));
    }

    createClass(RingColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <ColorRing></ColorRing>\n                <Palette></Palette> \n                <div class="control">\n                    <Value></Value>\n                    <Opacity></Opacity>\n                    <div class="empty"></div>\n                    <ColorView></ColorView>\n                </div>\n                <Information></Information>\n                <CurrentColorSets></CurrentColorSets>\n                <ColorSetsChooser></ColorSetsChooser>\n                <ContextMenu></ContextMenu>\n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Value: Value,
                Opacity: Opacity,
                ColorView: ColorView,
                ColorRing: ColorRing,
                Palette: ColorPalette,
                Information: ColorInformation,
                CurrentColorSets: CurrentColorSets,
                ColorSetsChooser: ColorSetsChooser,
                ContextMenu: CurrentColorSetsContextMenu
            };
        }
    }]);
    return RingColorPicker;
}(BaseColorPicker);

var XDColorPicker = function (_BaseColorPicker) {
    inherits(XDColorPicker, _BaseColorPicker);

    function XDColorPicker() {
        classCallCheck(this, XDColorPicker);
        return possibleConstructorReturn(this, (XDColorPicker.__proto__ || Object.getPrototypeOf(XDColorPicker)).apply(this, arguments));
    }

    createClass(XDColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <palette></palette> \n                <div class="control">\n                    <Hue></Hue>\n                    <Opacity></Opacity>\n                </div>\n                <information></information>\n                <currentColorSets></currentColorSets>\n                <colorSetsChooser></colorSetsChooser>\n                <contextMenu></contextMenu>\n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Hue: VerticalHue,
                Opacity: VerticalOpacity,
                Palette: ColorPalette,
                Information: ColorInformation,
                CurrentColorSets: CurrentColorSets,
                ColorSetsChooser: ColorSetsChooser,
                ContextMenu: CurrentColorSetsContextMenu
            };
        }
    }]);
    return XDColorPicker;
}(BaseColorPicker);

var RingTabColorPicker = function (_BaseColorPicker) {
    inherits(RingTabColorPicker, _BaseColorPicker);

    function RingTabColorPicker() {
        classCallCheck(this, RingTabColorPicker);
        return possibleConstructorReturn(this, (RingTabColorPicker.__proto__ || Object.getPrototypeOf(RingTabColorPicker)).apply(this, arguments));
    }

    createClass(RingTabColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <div class=\'color-tab\' ref="$tab">\n                    <div class=\'color-tab-header\' ref="$tabHeader">\n                        <div class=\'color-tab-item active\' item-id="color"><span >' + this.opt.tabTitle + '</span> Color</div>\n                        <div class=\'color-tab-item\' item-id="swatch">Swatch</div>\n                        <div class=\'color-tab-item\' item-id="colorset">Color Set</div>\n                    </div>\n                    <div class=\'color-tab-body\' ref="$tabBody">\n                        <div class=\'color-tab-content active\'  item-id="color">\n                            <ColorRing></ColorRing>\n                            <Palette></Palette> \n                            <div class="control">\n                                <Value></Value>\n                                <Opacity></Opacity>\n                                <div class="empty"></div>\n                                <ColorView></ColorView>\n                            </div>\n                            <Information></Information>\n                        </div>\n                        <div class=\'color-tab-content\' item-id="swatch">\n                            <CurrentColorSets></CurrentColorSets>\n                            <ContextMenu></ContextMenu>\n                        </div>\n                        <div class=\'color-tab-content\' item-id="colorset">\n                            <ColorSetsChooser></ColorSetsChooser>                    \n                        </div>                        \n                    </div>\n\n            </div>\n        ';
        }
    }, {
        key: CLICK('$tabHeader .color-tab-item'),
        value: function value(e, $dt) {
            if (!$dt.hasClass('active')) {
                var selectedItem = this.refs.$tabHeader.$('.active');
                if (selectedItem) selectedItem.removeClass('active');
                $dt.addClass('active');

                var selectedItem = this.refs.$tabBody.$('.active');
                if (selectedItem) selectedItem.removeClass('active');
                var activeItem = this.refs.$tabBody.$('[item-id=\'' + $dt.attr('item-id') + '\']');
                if (activeItem) activeItem.addClass('active');
            }
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Value: Value,
                Opacity: Opacity,
                ColorView: ColorView,
                ColorRing: ColorRing,
                Palette: ColorPalette,
                Information: ColorInformation,
                CurrentColorSets: CurrentColorSets,
                ColorSetsChooser: ColorSetsChooser,
                ContextMenu: CurrentColorSetsContextMenu
            };
        }
    }]);
    return RingTabColorPicker;
}(BaseColorPicker);

var XDTabColorPicker = function (_BaseColorPicker) {
    inherits(XDTabColorPicker, _BaseColorPicker);

    function XDTabColorPicker() {
        classCallCheck(this, XDTabColorPicker);
        return possibleConstructorReturn(this, (XDTabColorPicker.__proto__ || Object.getPrototypeOf(XDTabColorPicker)).apply(this, arguments));
    }

    createClass(XDTabColorPicker, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'colorpicker-body\'>\n                <div class=\'color-tab xd\' ref="$tab">\n                    <div class=\'color-tab-header\' ref="$tabHeader">\n                        <div class=\'color-tab-item active\' item-id="color"><span >' + this.opt.tabTitle + '</span> Color</div>\n                        <div class=\'color-tab-item\' item-id="swatch">Swatch</div>\n                        <div class=\'color-tab-item\' item-id="colorset">Color Set</div>\n                    </div>\n                    <div class=\'color-tab-body\' ref="$tabBody">\n                        <div class=\'color-tab-content active\'  item-id="color">\n                            <palette></palette> \n                            <div class="control">\n                                <Hue></Hue>\n                                <Opacity></Opacity>\n                            </div>\n                            <information></information>\n                        </div>\n                        <div class=\'color-tab-content\' item-id="swatch">\n                            <CurrentColorSets></CurrentColorSets>\n                            <ContextMenu></ContextMenu>\n                        </div>\n                        <div class=\'color-tab-content\' item-id="colorset">\n                            <ColorSetsChooser></ColorSetsChooser>                    \n                        </div>                        \n                    </div>\n\n            </div>\n        ';
        }
    }, {
        key: CLICK('$tabHeader .color-tab-item'),
        value: function value(e, $dt) {
            if (!$dt.hasClass('active')) {
                var selectedItem = this.refs.$tabHeader.$('.active');
                if (selectedItem) selectedItem.removeClass('active');
                $dt.addClass('active');

                var selectedItem = this.refs.$tabBody.$('.active');
                if (selectedItem) selectedItem.removeClass('active');
                var activeItem = this.refs.$tabBody.$('[item-id=\'' + $dt.attr('item-id') + '\']');
                if (activeItem) activeItem.addClass('active');
            }
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                Hue: VerticalHue,
                Opacity: VerticalOpacity,
                Palette: ColorPalette,
                Information: ColorInformation,
                CurrentColorSets: CurrentColorSets,
                ColorSetsChooser: ColorSetsChooser,
                ContextMenu: CurrentColorSetsContextMenu
            };
        }
    }]);
    return XDTabColorPicker;
}(BaseColorPicker);

var ColorPicker = {
    create: function create(opts) {
        switch (opts.type) {
            case 'macos':
                return new MacOSColorPicker(opts);
            case 'xd':
                return new XDColorPicker(opts);
            case 'xd-tab':
                return new XDTabColorPicker(opts);
            case 'ring':
                return new RingColorPicker(opts);
            case 'ring-tab':
                return new RingTabColorPicker(opts);
            case 'mini':
                return new MiniColorPicker(opts);
            case 'mini-vertical':
                return new MiniColorPicker$2(opts);
            case 'sketch':
            case 'palette':
            default:
                return new ChromeDevToolColorPicker(opts);
        }
    },

    ColorPicker: ChromeDevToolColorPicker,
    ChromeDevToolColorPicker: ChromeDevToolColorPicker,
    MacOSColorPicker: MacOSColorPicker,
    RingColorPicker: RingColorPicker,
    MiniColorPicker: MiniColorPicker,
    MiniVerticalColorPicker: MiniColorPicker$2,
    XDColorPicker: XDColorPicker
};

/* event trigger */
var CHANGE_EDITOR = 'CHANGE_EDITOR';
var CHANGE_SELECTION = 'CHANGE_SELECTION';
var CHANGE_PAGE = 'CHANGE_PAGE';
var CHANGE_PAGE_NAME = 'CHANGE_PAGE_NAME';
var CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE';
var CHANGE_PAGE_TRANSFORM = 'CHANGE_PAGE_TRANSFORM';

var CHANGE_LAYER = 'CHANGE_LAYER';
var CHANGE_LAYER_NAME = 'CHANGE_LAYER_NAME';


var CHANGE_LAYER_FILTER = 'CHANGE_LAYER_FILTER';
var CHANGE_LAYER_BACKDROP_FILTER = 'CHANGE_LAYER_BACKDROP_FILTER';
var CHANGE_LAYER_SIZE = 'CHANGE_LAYER_SIZE';
var CHANGE_LAYER_ROTATE = 'CHANGE_LAYER_ROTATE';
var CHANGE_LAYER_OPACITY = 'CHANGE_LAYER_OPACITY';
var CHANGE_LAYER_MOVE = 'CHANGE_LAYER_MOVE';
var CHANGE_LAYER_POSITION = 'CHANGE_LAYER_POSITION';
var CHANGE_LAYER_TRANSFORM = 'CHANGE_LAYER_TRANSFORM';
var CHANGE_LAYER_TRANSFORM_3D = 'CHANGE_LAYER_TRANSFORM_3D';
var CHANGE_LAYER_RADIUS = 'CHANGE_LAYER_RADIUS';
var CHANGE_LAYER_BACKGROUND_COLOR = 'CHANGE_LAYER_BACKGROUND_COLOR';
var CHANGE_LAYER_CLIPPATH = 'CHANGE_LAYER_CLIPPATH';
var CHANGE_LAYER_CLIPPATH_POLYGON = 'CHANGE_LAYER_CLIPPATH_POLYGON';
var CHANGE_LAYER_CLIPPATH_POLYGON_POSITION = 'CHANGE_LAYER_CLIPPATH_POLYGON_POSITION';
var CHANGE_LAYER_TEXT = 'CHANGE_LAYER_TEXT';

var CHANGE_IMAGE = 'CHANGE_IMAGE';
var CHANGE_IMAGE_COLOR = 'CHANGE_IMAGE_COLOR';
var CHANGE_IMAGE_ANGLE = 'CHANGE_IMAGE_ANGLE';
var CHANGE_IMAGE_RADIAL_POSITION = 'CHANGE_IMAGE_RADIAL_POSITION';
var CHANGE_IMAGE_RADIAL_TYPE = 'CHANGE_IMAGE_RADIAL_TYPE';
var CHANGE_IMAGE_LINEAR_ANGLE = 'CHANGE_IMAGE_LINEAR_ANGLE';

var CHANGE_BOXSHADOW = 'CHANGE_BOXSHADOW';
var CHANGE_TEXTSHADOW = 'CHANGE_TEXTSHADOW';

var CHANGE_COLOR_STEP = 'CHANGE_COLOR_STEP';
var ADD_COLOR_STEP = 'ADD_COLOR_STEP';
var REMOVE_COLOR_STEP = 'REMOVE_COLOR_STEP';

var TEXT_FILL_COLOR = 'TEXT_FILL_COLOR';
var SELECT_TAB_LAYER = 'SELECT_TAB_LAYER';
var SELECT_TAB_IMAGE = 'SELECT_TAB_IMAGE';

var INIT_COLOR_SOURCE = ITEM_TYPE_COLORSTEP;

var ColorStepManager = function (_BaseModule) {
    inherits(ColorStepManager, _BaseModule);

    function ColorStepManager() {
        classCallCheck(this, ColorStepManager);
        return possibleConstructorReturn(this, (ColorStepManager.__proto__ || Object.getPrototypeOf(ColorStepManager)).apply(this, arguments));
    }

    createClass(ColorStepManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(ColorStepManager.prototype.__proto__ || Object.getPrototypeOf(ColorStepManager.prototype), "initialize", this).call(this);

            this.$store.step = {
                width: 400
            };
        }
    }, {
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit(CHANGE_EDITOR);
        }
    }, {
        key: GETTER('colorstep/colorSource'),
        value: function value$$1($store) {
            return INIT_COLOR_SOURCE;
        }
    }, {
        key: GETTER('colorstep/current'),
        value: function value$$1($store, index) {
            if (!isUndefined(index)) {
                return $store.read('colorstep/list')[index] || $store.read('colorstep/create');
            } else {
                return $store.read('colorstep/list').filter(function (item) {
                    return !!item.selected;
                })[0];
            }
        }
    }, {
        key: ACTION('colorstep/initColor'),
        value: function value$$1($store, color$$1) {
            $store.run('tool/setColorSource', INIT_COLOR_SOURCE);
            $store.run('tool/changeColor', color$$1);
        }
    }, {
        key: ACTION('colorstep/add'),
        value: function value$$1($store, item, percent$$1) {

            var list = $store.read('item/list/children', item.id);

            if (!list.length) {

                $store.read('item/create/colorstep', { parentId: item.id, color: 'rgba(216,216,216, 0)', percent: percent$$1, index: 0 });
                $store.read('item/create/colorstep', { parentId: item.id, color: 'rgba(216,216,216, 1)', percent: 100, index: 100 });

                $store.run('item/set', item);
                return;
            }

            var colorsteps = list.map(function (id) {
                return $store.items[id];
            });

            if (percent$$1 < colorsteps[0].percent) {

                colorsteps[0].index = 1;

                $store.read('item/create/colorstep', { parentId: item.id, index: 0, color: colorsteps[0].color, percent: percent$$1 });
                $store.run('item/set', colorsteps[0]);
                $store.run('item/set', item);
                return;
            }

            if (colorsteps[colorsteps.length - 1].percent < percent$$1) {
                var color$$1 = colorsteps[colorsteps.length - 1].color;
                var index = colorsteps[colorsteps.length - 1].index;

                $store.read('item/create/colorstep', { parentId: item.id, index: index + 1, color: color$$1, percent: percent$$1 });
                $store.run('item/set', item);
                return;
            }

            for (var i = 0, len = colorsteps.length - 1; i < len; i++) {
                var step = colorsteps[i];
                var nextStep = colorsteps[i + 1];

                if (step.percent <= percent$$1 && percent$$1 <= nextStep.percent) {
                    var color$$1 = Color$1.mix(step.color, nextStep.color, (percent$$1 - step.percent) / (nextStep.percent - step.percent), 'rgb');

                    $store.read('item/create/colorstep', { parentId: item.id, index: step.index + 1, color: color$$1, percent: percent$$1 });
                    $store.run('item/set', item);
                    return;
                }
            }
        }
    }, {
        key: ACTION('colorstep/remove'),
        value: function value$$1($store, id) {
            $store.run('item/remove', id);
        }
    }, {
        key: ACTION('colorstep/sort'),
        value: function value$$1($store, id, sortedList) {

            sortedList.forEach(function (stepId, index) {
                var item = $store.read('item/get', stepId);
                item.index = index * 100;

                $store.run('item/set', item);
            });

            $store.run('item/sort', id);
        }
    }, {
        key: GETTER('colorstep/sort/list'),
        value: function value$$1($store, parentId) {
            var colorsteps = $store.read('item/map/children', parentId);

            colorsteps.sort(function (a, b) {
                if (a.index == b.index) return 0;
                return a.index > b.index ? 1 : -1;
            });

            return colorsteps;
        }

        // 이미지 리스트 얻어오기 

    }, {
        key: GETTER('colorstep/list'),
        value: function value$$1($store) {
            var image = $store.read('selection/current/image');

            if (image) {
                return $store.read('colorstep/sort/list', image.id);
            }

            return [];
        }
    }, {
        key: GETTER('colorstep/currentIndex'),
        value: function value$$1($store, index) {
            if (isUndefined(index)) {
                return $store.read('colorstep/list').map(function (step, index) {
                    return { step: step, index: index };
                }).filter(function (item) {
                    return !!item.step.selected;
                })[0].index;
            } else {
                return index;
            }
        }
    }, {
        key: ACTION('colorstep/cut/off'),
        value: function value$$1($store, id) {
            var list = [];
            if (isUndefined(id)) {
                list = $store.read('colorstep/list');
            } else {
                list = [$store.read('item/get', id)];
            }
            list.forEach(function (item) {
                item.cut = false;
                $store.run('item/set', item);
            });
        }
    }, {
        key: ACTION('colorstep/cut/on'),
        value: function value$$1($store, id) {
            var list = [];
            if (isUndefined(id)) {
                list = $store.read('colorstep/list');
            } else {
                list = [$store.read('item/get', id)];
            }
            list.forEach(function (item) {
                item.cut = true;
                $store.run('item/set', item);
            });
        }
    }, {
        key: "getMaxValue",
        value: function getMaxValue() {
            return this.$store.step.width;
        }
    }, {
        key: "getUnitValue",
        value: function getUnitValue(step, maxValue) {

            if (isPX(step.unit)) {
                if (isUndefined(step.px)) {
                    step.px = percent2px(step.percent, maxValue);
                }

                return {
                    px: step.px,
                    percent: px2percent(step.px, maxValue),
                    em: px2em(step.px, maxValue)
                };
            } else if (isEM(step.unit)) {
                if (isUndefined(step.em)) {
                    step.em = percent2em(step.percent, maxValue);
                }
                return {
                    em: step.em,
                    percent: em2percent(step.em, maxValue),
                    px: em2px(step.em, maxValue)
                };
            }

            return {
                percent: step.percent,
                px: percent2px(step.percent, maxValue),
                em: percent2em(step.percent, maxValue)
            };
        }
    }, {
        key: GETTER('colorstep/unit/value'),
        value: function value$$1($store, step, maxValue) {
            return this.getUnitValue(step, +defaultValue(maxValue, this.getMaxValue()));
        }
    }, {
        key: ACTION('colorstep/ordering/equals'),
        value: function value$$1($store) {
            var _this2 = this;

            var firstIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var lastIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.MAX_SAFE_INTEGER;


            var list = $store.read('colorstep/list').map(function (step) {
                return Object.assign({}, step, $store.read('colorstep/unit/value', step, _this2.getMaxValue()));
            });

            if (lastIndex > list.length - 1) {
                lastIndex = list.length - 1;
            }

            var count = lastIndex - firstIndex;
            var dist = (list[lastIndex].px - list[firstIndex].px) / count;

            var firstValue = list[firstIndex].px;
            for (var i = firstIndex, start = 0; i <= lastIndex; i++, start++) {
                var step = list[i];
                step.px = firstValue + start * dist;
                step.percent = px2percent(step.px, this.getMaxValue());
                step.em = px2em(step.px, this.getMaxValue());
                $store.run('item/set', step);
            }
        }
    }, {
        key: ACTION('colorstep/ordering/equals/left'),
        value: function value$$1($store) {
            $store.run('colorstep/ordering/equals', 0, $store.read('colorstep/currentIndex'));
        }
    }, {
        key: ACTION('colorstep/ordering/equals/right'),
        value: function value$$1($store) {
            $store.run('colorstep/ordering/equals', $store.read('colorstep/currentIndex'));
        }
    }]);
    return ColorStepManager;
}(BaseModule);

var _DEFINED_POSITIONS;

var DEFINED_ANGLES = {
    'to top': 0,
    'to top right': 45,
    'to right': 90,
    'to bottom right': 135,
    'to bottom': 180,
    'to bottom left': 225,
    'to left': 270,
    'to top left': 315

};

var DEFINED_DIRECTIONS = {
    '0': 'to top',
    '45': 'to top right',
    '90': 'to right',
    '135': 'to bottom right',
    '180': 'to bottom',
    '225': 'to bottom left',
    '270': 'to left',
    '315': 'to top left'
};

var DEFINED_POSITIONS = (_DEFINED_POSITIONS = {}, defineProperty(_DEFINED_POSITIONS, POSITION_CENTER, true), defineProperty(_DEFINED_POSITIONS, POSITION_TOP, true), defineProperty(_DEFINED_POSITIONS, POSITION_LEFT, true), defineProperty(_DEFINED_POSITIONS, POSITION_RIGHT, true), defineProperty(_DEFINED_POSITIONS, POSITION_BOTTOM, true), _DEFINED_POSITIONS);

var IMAGE_LIST = [IMAGE_FILE_TYPE_JPG, IMAGE_FILE_TYPE_PNG, IMAGE_FILE_TYPE_GIF, IMAGE_FILE_TYPE_SVG];

var ImageManager = function (_BaseModule) {
    inherits(ImageManager, _BaseModule);

    function ImageManager() {
        classCallCheck(this, ImageManager);
        return possibleConstructorReturn(this, (ImageManager.__proto__ || Object.getPrototypeOf(ImageManager)).apply(this, arguments));
    }

    createClass(ImageManager, [{
        key: GETTER('image/get/file'),
        value: function value$$1($store, files, callback) {
            var colorCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 16;

            (files || []).forEach(function (file) {
                var fileType = file.name.split('.').pop();
                if (IMAGE_LIST.includes(fileType)) {

                    if (isFunction(callback)) {
                        new ImageLoader(file).getImage(function (image$$1) {

                            ImageToRGB(file, { maxWidth: 100 }, function (results) {
                                callback({
                                    datauri: image$$1.src, // export 용 
                                    colors: palette(results, colorCount),
                                    url: URL.createObjectURL(file), // 화면 제어용 
                                    fileType: fileType
                                });
                            });
                        });
                    }
                }
            });
        }
    }, {
        key: GETTER('image/get/url'),
        value: function value$$1($store, urls, callback) {
            var colorCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 16;

            (urls || []).forEach(function (url) {
                var fileType = url.split('.').pop();
                if (IMAGE_LIST.includes(fileType)) {

                    if (isFunction(callback)) {
                        ImageToRGB(url, { maxWidth: 100 }, function (results) {
                            callback({
                                colors: palette(results, colorCount),
                                url: url,
                                fileType: fileType
                            });
                        });
                    }
                }
            });
        }
    }, {
        key: GETTER('image/get/blob'),
        value: function value$$1($store, blobs, callback) {
            (blobs || []).forEach(function (file) {
                if (isFunction(callback)) {
                    new ImageLoader(file, {
                        forceDataURI: true
                    }).getImage(function (image$$1) {
                        var url = file;
                        var svg = '';
                        var svgContent = image$$1.src.split('data:image/svg+xml;charset=utf-8;base64,');

                        if (svgContent.length > 1) {
                            svg = atob(svgContent[1]);
                        }

                        if (url instanceof Blob) {
                            url = URL.createObjectURL(file);
                        }

                        callback({
                            datauri: image$$1.src, // export 용 
                            url: url // 화면 제어용 
                        });
                    });
                }
            });
        }
    }, {
        key: GETTER('image/type/isGradient'),
        value: function value$$1($store, type) {
            return $store.read('image/type/isLinear', type) || $store.read('image/type/isRadial', type) || $store.read('image/type/isConic', type);
        }
    }, {
        key: GETTER('image/type/isNotGradient'),
        value: function value$$1($store, type) {
            return $store.read('image/type/isGradient', type) == false;
        }
    }, {
        key: GETTER('image/type/isLinear'),
        value: function value$$1($store, type) {
            return [IMAGE_ITEM_TYPE_LINEAR, IMAGE_ITEM_TYPE_REPEATING_LINEAR].includes(type);
        }
    }, {
        key: GETTER('image/type/isRadial'),
        value: function value$$1($store, type) {
            return [IMAGE_ITEM_TYPE_RADIAL, IMAGE_ITEM_TYPE_REPEATING_RADIAL].includes(type);
        }
    }, {
        key: GETTER('image/type/isConic'),
        value: function value$$1($store, type) {
            return [IMAGE_ITEM_TYPE_CONIC, IMAGE_ITEM_TYPE_REPEATING_CONIC].includes(type);
        }
    }, {
        key: GETTER('image/type/isImage'),
        value: function value$$1($store, type) {
            return [IMAGE_ITEM_TYPE_IMAGE].includes(type);
        }
    }, {
        key: GETTER('image/type/isStatic'),
        value: function value$$1($store, type) {
            return [IMAGE_ITEM_TYPE_STATIC].includes(type);
        }
    }, {
        key: GETTER('image/angle'),
        value: function value$$1($store) {
            var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            return isUndefined(DEFINED_ANGLES[angle]) ? angle : DEFINED_ANGLES[angle] || 0;
        }
    }, {
        key: GETTER('image/radialPosition'),
        value: function value$$1($store) {
            var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            return position || $store.read('image/get', 'radialPosition');
        }
    }, {
        key: GETTER('image/toCSS'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var isExport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            var results = {};
            var backgroundImage = $store.read('image/toImageString', image$$1, isExport);
            var backgroundPosition = $store.read('image/toBackgroundPositionString', image$$1, isExport);
            var backgroundSize = $store.read('image/toBackgroundSizeString', image$$1, isExport);
            var backgroundRepeat = $store.read('image/toBackgroundRepeatString', image$$1, isExport);
            var backgroundBlendMode = $store.read('image/toBackgroundBlendModeString', image$$1, isExport);

            if (backgroundImage) {
                results['background-image'] = backgroundImage; // size, position, origin, attachment and etc 
            }

            if (backgroundSize) {
                results['background-size'] = backgroundSize;
            }

            if (backgroundPosition) {
                results['background-position'] = backgroundPosition;
            }

            if (backgroundRepeat) {
                results['background-repeat'] = backgroundRepeat;
            }

            if (backgroundBlendMode) {
                results['background-blend-mode'] = backgroundBlendMode;
            }

            return results;
        }
    }, {
        key: GETTER('image/cache/toCSS'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var image$$1 = Object.assign({}, item.image, { colorsteps: item.colorsteps });

            var results = {};
            var backgroundImage = $store.read('image/toImageString', image$$1);
            var backgroundPosition = $store.read('image/toBackgroundPositionString', image$$1);
            var backgroundSize = $store.read('image/toBackgroundSizeString', image$$1);
            var backgroundRepeat = $store.read('image/toBackgroundRepeatString', image$$1);
            var backgroundBlendMode = $store.read('image/toBackgroundBlendModeString', image$$1);

            if (backgroundImage) {
                results['background-image'] = backgroundImage; // size, position, origin, attachment and etc 
            }

            if (backgroundSize) {
                results['background-size'] = backgroundSize;
            }

            if (backgroundPosition) {
                results['background-position'] = backgroundPosition;
            }

            if (backgroundRepeat) {
                results['background-repeat'] = backgroundRepeat;
            }

            if (backgroundBlendMode) {
                results['background-blend-mode'] = backgroundBlendMode;
            }

            return results;
        }
    }, {
        key: GETTER('image/toString'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            var obj = $store.read('image/toCSS', image$$1);

            return Object.keys(obj).map(function (key) {
                return key + ': ' + obj[key] + ';';
            }).join(' ');
        }
    }, {
        key: GETTER('image/toImageString'),
        value: function value$$1($store, image$$1) {
            var isExport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var type = image$$1.type;

            if (type == IMAGE_ITEM_TYPE_LINEAR || type == IMAGE_ITEM_TYPE_REPEATING_LINEAR) {
                return $store.read('image/toLinear', image$$1, isExport);
            } else if (type == IMAGE_ITEM_TYPE_RADIAL || type == IMAGE_ITEM_TYPE_REPEATING_RADIAL) {
                return $store.read('image/toRadial', image$$1, isExport);
            } else if (type == IMAGE_ITEM_TYPE_CONIC || type == IMAGE_ITEM_TYPE_REPEATING_CONIC) {
                return $store.read('image/toConic', image$$1, isExport);
            } else if (type == IMAGE_ITEM_TYPE_IMAGE) {
                return $store.read('image/toImage', image$$1, isExport);
            } else if (type == IMAGE_ITEM_TYPE_STATIC) {
                return $store.read('image/toStatic', image$$1, isExport);
            }
        }
    }, {
        key: GETTER('image/toBackgroundSizeString'),
        value: function value$$1($store, image$$1) {

            if (image$$1.backgroundSize == 'contain' || image$$1.backgroundSize == 'cover') {
                return image$$1.backgroundSize;
            } else if (image$$1.backgroundSizeWidth && image$$1.backgroundSizeHeight) {
                return [stringUnit(image$$1.backgroundSizeWidth), stringUnit(image$$1.backgroundSizeHeight)].join(' ');
            } else if (image$$1.backgroundSizeWidth) {
                return stringUnit(image$$1.backgroundSizeWidth);
            }

            return 'auto';
        }
    }, {
        key: GETTER('image/toBackgroundPositionString'),
        value: function value$$1($store, image$$1) {

            var x = defaultValue(image$$1.backgroundPositionX, valueUnit(POSITION_CENTER));
            var y = defaultValue(image$$1.backgroundPositionY, valueUnit(POSITION_CENTER));

            if (x === 0) x = percentUnit(0);
            if (y === 0) y = percentUnit(0);

            return stringUnit(x) + ' ' + stringUnit(y);
        }
    }, {
        key: GETTER('image/toBackgroundRepeatString'),
        value: function value$$1($store, image$$1) {
            if (image$$1.backgroundRepeat) {
                return image$$1.backgroundRepeat;
            }
        }
    }, {
        key: GETTER('image/toBackgroundBlendModeString'),
        value: function value$$1($store, image$$1) {
            if (image$$1.backgroundBlendMode) {
                return image$$1.backgroundBlendMode || 'normal';
            }
        }
    }, {
        key: GETTER('image/get/unitValue'),
        value: function value$$1($store, step) {
            if (isPX(step.unit)) {
                return px$1(step.px);
            } else if (isEM(step.unit)) {
                return em(step.em);
            }

            return percent(step.percent);
        }
    }, {
        key: GETTER('image/get/stepValue'),
        value: function value$$1($store, step) {
            if (isPX(step.unit)) {
                return step.px;
            } else if (isEM(step.unit)) {
                return step.em;
            }

            return step.percent;
        }
    }, {
        key: GETTER('image/toItemString'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;


            if (!image$$1) return '';

            var colorsteps = image$$1.colorsteps || $store.read('item/map/children', image$$1.id);

            if (!colorsteps) return '';

            var colors = [].concat(toConsumableArray(colorsteps));
            if (!colors.length) return '';

            var newColors = [];
            colors.forEach(function (c, index) {
                if (c.cut && index > 0) {
                    newColors.push({
                        color: c.color,
                        unit: colors[index - 1].unit,
                        percent: colors[index - 1].percent,
                        px: colors[index - 1].px,
                        em: colors[index - 1].em
                    });
                }

                newColors.push(c);
            });

            colors = newColors.map(function (f) {

                var value$$1 = stringUnit(percentUnit(f.percent));
                return f.color + ' ' + value$$1;
            }).join(',');

            return colors;
        }
    }, {
        key: GETTER('image/toConicItemString'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;


            if (!image$$1) return '';

            var colorsteps = image$$1.colorsteps || $store.read('item/map/children', image$$1.id, function (step) {
                return step;
            });

            if (!colorsteps) return '';

            var colors = [].concat(toConsumableArray(colorsteps)).map(function (it, index) {
                it.index = index;
                return it;
            });
            if (!colors.length) return '';

            colors.sort(function (a, b) {
                if (a.percent == b.percent) {
                    if (a.index > b.index) return 1;
                    if (a.index < b.index) return 0;
                    return 0;
                }
                return a.percent > b.percent ? 1 : -1;
            });

            var newColors = [];
            colors.forEach(function (c, index) {
                if (c.cut && index > 0) {
                    newColors.push(Object.assign({}, c, { percent: colors[index - 1].percent }));
                }

                newColors.push(c);
            });

            colors = newColors.map(function (f) {
                var deg$$1 = Math.floor(f.percent * 3.6);
                return f.color + ' ' + deg$$1 + 'deg';
            }).join(',');

            return colors;
        }
    }, {
        key: GETTER('image/toLinear'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var colors = $store.read('image/toItemString', image$$1);

            if (colors == '') return '';

            var opt = '';
            var angle = image$$1.angle;
            var gradientType = image$$1.type;

            opt = angle;

            if (isNumber(opt)) {
                opt = DEFINED_DIRECTIONS['' + opt] || opt;
            }

            if (isNumber(opt)) {
                opt = opt > 360 ? opt % 360 : opt;

                opt = opt + 'deg';
            }

            return gradientType + '-gradient(' + opt + ', ' + colors + ')';
        }
    }, {
        key: GETTER('image/toStatic'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('image/toLinear', {
                type: 'linear',
                angle: 0,
                colorsteps: [{ color: image$$1.color, percent: 0 }, { color: image$$1.color, percent: 100 }]
            });
        }
    }, {
        key: GETTER('image/toLinearRight'),
        value: function value$$1($store, image$$1) {
            return $store.read('image/toLinear', Object.assign({}, image$$1, { type: 'linear', angle: 'to right' }));
        }
    }, {
        key: GETTER('image/toRadial'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var colors = $store.read('image/toItemString', image$$1);

            if (colors == '') return '';
            var opt = '';
            var radialType = image$$1.radialType;
            var radialPosition = image$$1.radialPosition;
            var gradientType = image$$1.type;

            radialPosition = DEFINED_POSITIONS[radialPosition] ? radialPosition : radialPosition.join(' ');

            opt = radialPosition ? radialType + ' at ' + radialPosition : radialType;

            return gradientType + '-gradient(' + opt + ', ' + colors + ')';
        }
    }, {
        key: GETTER('image/toConic'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var colors = $store.read('image/toConicItemString', image$$1);

            if (colors == '') return '';
            var opt = [];
            var conicAngle = image$$1.angle;
            var conicPosition = image$$1.radialPosition;
            var gradientType = image$$1.type;

            conicPosition = DEFINED_POSITIONS[conicPosition] ? conicPosition : conicPosition.join(' ');

            if (isNotUndefined(conicAngle)) {
                conicAngle = get(DEFINED_ANGLES, conicAngle, function (it) {
                    return +it;
                });
                opt.push('from ' + conicAngle + 'deg');
            }

            if (conicPosition) {
                opt.push('at ' + conicPosition);
            }

            var optString = opt.length ? opt.join(' ') + ',' : '';

            return gradientType + '-gradient(' + optString + ' ' + colors + ')';
        }
    }, {
        key: GETTER('image/toImage'),
        value: function value$$1($store) {
            var image$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var isExport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var url = image$$1.backgroundImage;

            if (!isExport && url) {
                return 'url(' + url + ')';
            } else if (isExport) {
                return 'url(' + image$$1.backgroundImageDataURI + ')';
            }

            return null;
        }
    }]);
    return ImageManager;
}(BaseModule);

var layerList = [
    // sample
];

var LayerManager = function (_BaseModule) {
    inherits(LayerManager, _BaseModule);

    function LayerManager() {
        classCallCheck(this, LayerManager);
        return possibleConstructorReturn(this, (LayerManager.__proto__ || Object.getPrototypeOf(LayerManager)).apply(this, arguments));
    }

    createClass(LayerManager, [{
        key: GETTER('layer/list/sample'),
        value: function value$$1($store) {
            var results = [];

            results = layerList.map(function (it) {
                return Object.assign({}, it);
            });

            return results;
        }
    }, {
        key: GETTER('layer/toString'),
        value: function value$$1($store, layer) {
            var withStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


            var obj = $store.read('layer/toCSS', layer, withStyle, image) || {};

            if (image) {
                delete obj['background-color'];
                delete obj['mix-blend-mode'];
                delete obj['filter'];
            }

            return $store.read('css/toString', obj);
        }
    }, {
        key: GETTER('layer/cache/toString'),
        value: function value$$1($store, layer) {
            var obj = $store.read('layer/cache/toCSS', layer) || {};
            obj.position = 'absolute';
            return {
                css: $store.read('css/toString', obj),
                obj: obj
            };
        }
    }, {
        key: GETTER('layer/toExport'),
        value: function value$$1($store, layer) {
            var withStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


            var obj = $store.read('layer/toCSS', layer, withStyle, null, true) || {};
            obj.position = obj.position || 'absolute';

            return $store.read('css/toString', obj);
        }
    }, {
        key: GETTER('layer/make/clip-path'),
        value: function value$$1($store, layer) {
            return $store.read('clip-path/toCSS', layer);
        }
    }, {
        key: GETTER('layer/make/filter'),
        value: function value$$1($store, layer) {
            return $store.read('filter/toCSS', layer);
        }
    }, {
        key: GETTER('layer/make/backdrop'),
        value: function value$$1($store, layer) {
            return $store.read('backdrop/toCSS', layer);
        }
    }, {
        key: GETTER('layer/toImageCSS'),
        value: function value$$1($store, layer) {
            var isExport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var results = {};
            $store.read('item/each/children', layer.id, function (item) {
                var css = $store.read('image/toCSS', item, isExport);

                Object.keys(css).forEach(function (key) {
                    if (!results[key]) {
                        results[key] = [];
                    }

                    results[key].push(css[key]);
                });
            });

            return combineKeyArray(results);
        }
    }, {
        key: GETTER('layer/cache/toImageCSS'),
        value: function value$$1($store, images) {
            var results = {};

            images.forEach(function (item) {
                var image = Object.assign({}, item.image, { colorsteps: item.colorsteps });
                var css = $store.read('image/toCSS', image);

                Object.keys(css).forEach(function (key) {
                    if (!results[key]) {
                        results[key] = [];
                    }

                    results[key].push(css[key]);
                });
            });

            return combineKeyArray(results);
        }
    }, {
        key: GETTER('layer/image/toImageCSS'),
        value: function value$$1($store, image) {
            return $store.read('css/generate', $store.read('image/toCSS', image));
        }
    }, {
        key: GETTER('layer/make/map'),
        value: function value$$1($store, layer, itemType, isExport) {
            var results = {};
            $store.read("item/map/" + itemType + "/children", layer.id, function (item) {
                var css = $store.read(itemType + "/toCSS", item, isExport);

                Object.keys(css).forEach(function (key) {
                    if (!results[key]) {
                        results[key] = [];
                    }

                    results[key].push(css[key]);
                });
            });

            Object.keys(results).forEach(function (key) {
                if (isArray(results[key])) {
                    results[key] = results[key].join(', ');
                }
            });

            return results;
        }
    }, {
        key: GETTER('layer/make/box-shadow'),
        value: function value$$1($store, layer, isExport) {
            return $store.read('layer/make/map', layer, ITEM_TYPE_BOXSHADOW, isExport);
        }
    }, {
        key: GETTER('layer/make/font'),
        value: function value$$1($store, layer, isExport) {
            var results = {};

            if (layer.color) {
                results['color'] = layer.color;
            }

            if (layer.fontSize) {
                results['font-size'] = stringUnit(layer.fontSize);
            }

            if (layer.fontFamily) {
                results['font-family'] = layer.fontFamily;
            }

            if (layer.fontWeight) {
                results['font-weight'] = layer.fontWeight;
            }

            if (isNotUndefined(layer.lineHeight)) {
                results['line-height'] = stringUnit(layer.lineHeight);
            }

            results['word-wrap'] = layer.wordWrap || 'break-word';
            results['word-break'] = layer.wordBreak || 'break-word';

            if (layer.clipText) {
                results['color'] = 'transparent';
                results['background-clip'] = 'text';
                results['-webkit-background-clip'] = 'text';
            }

            return results;
        }
    }, {
        key: GETTER('layer/make/image'),
        value: function value$$1($store, layer, isExport) {
            return $store.read('layer/make/map', layer, ITEM_TYPE_IMAGE, isExport);
        }
    }, {
        key: GETTER('layer/make/text-shadow'),
        value: function value$$1($store, layer, isExport) {
            return $store.read('layer/make/map', layer, ITEM_TYPE_TEXTSHADOW$1, isExport);
        }
    }, {
        key: GETTER('layer/make/transform/rotate'),
        value: function value$$1($store, layer) {

            var results = [];

            if (layer.rotate) {
                results.push("rotate(" + layer.rotate + "deg)");
            }

            return {
                transform: results.length ? results.join(' ') : 'none'
            };
        }
    }, {
        key: GETTER('layer/make/transform'),
        value: function value$$1($store, layer) {

            var results = [];

            if (layer.perspective) {
                results.push("perspective(" + layer.perspective + "px)");
            }

            if (layer.rotate) {
                results.push("rotate(" + layer.rotate + "deg)");
            }

            if (layer.skewX) {
                results.push("skewX(" + layer.skewX + "deg)");
            }

            if (layer.skewY) {
                results.push("skewY(" + layer.skewY + "deg)");
            }

            if (layer.scale) {
                results.push("scale(" + layer.scale + ")");
            }

            if (layer.translateX) {
                results.push("translateX(" + layer.translateX + "px)");
            }

            if (layer.translateY) {
                results.push("translateY(" + layer.translateY + "px)");
            }

            if (layer.translateZ) {
                results.push("translateZ(" + layer.translateZ + "px)");
            }

            if (layer.rotateX) {
                results.push("rotateX(" + layer.rotateX + "deg)");
            }

            if (layer.rotateY) {
                results.push("rotateY(" + layer.rotateY + "deg)");
            }

            if (layer.rotateZ) {
                results.push("rotateZ(" + layer.rotateZ + "deg)");
            }

            if (layer.scaleX) {
                results.push("scaleX(" + layer.scaleX + ")");
            }

            if (layer.scaleY) {
                results.push("scaleY(" + layer.scaleY + ")");
            }

            if (layer.scaleZ) {
                results.push("scaleZ(" + layer.scaleZ + ")");
            }

            return {
                transform: results.length ? results.join(' ') : 'none'
            };
        }
    }, {
        key: GETTER('layer/toStringClipPath'),
        value: function value$$1($store, layer) {

            if (['circle'].includes(layer.clipPathType)) return '';
            if (!layer.clipPathSvg) return '';

            var transform = '';

            if (layer.fitClipPathSize) {
                var widthScale = layer.width.value / layer.clipPathSvgWidth;
                var heightScale = layer.height.value / layer.clipPathSvgHeight;

                transform = "scale(" + widthScale + " " + heightScale + ")";
            }

            var $div = new Dom('div');
            var paths = $div.html(layer.clipPathSvg).$('svg').html();
            var svg = "<svg height=\"0\" width=\"0\"><defs><clipPath id=\"clippath-" + layer.id + "\" " + (transform ? "transform=\"" + transform + "\"" : "") + " >" + paths + "</clipPath></defs></svg>";

            return svg;
        }
    }, {
        key: GETTER('layer/getClipPath'),
        value: function value$$1($store, layer) {
            var items = $store.read('item/filter/children', layer.id, function (image) {
                return image.isClipPath;
            }).map(function (id) {
                return $store.items[id];
            });

            return items.length ? items[0] : null;
        }
    }, {
        key: "isFixedRadius",
        value: function isFixedRadius(layer) {
            if (layer.fixedRadius && layer.borderRadius) {
                return [stringUnit(layer.borderRadius)];
            }

            if (!layer.borderTopLeftRadius) return [];

            if (layer.borderTopLeftRadius.value == layer.borderTopRightRadius.value && layer.borderTopRightRadius.value == layer.borderBottomRightRadius.value && layer.borderBottomRightRadius.value == layer.borderBottomLeftRadius.value) {
                return [stringUnit(layer.borderTopLeftRadius)];
            }

            return [];
        }
    }, {
        key: GETTER('layer/make/border-radius'),
        value: function value$$1($store, layer) {
            var css = {};
            var isFixedRadius = this.isFixedRadius(layer);
            if (isFixedRadius.length) {
                css['border-radius'] = isFixedRadius[0];
            } else {

                if (layer.borderTopLeftRadius) css['border-top-left-radius'] = stringUnit(layer.borderTopLeftRadius);
                if (layer.borderTopRightRadius) css['border-top-right-radius'] = stringUnit(layer.borderTopRightRadius);
                if (layer.borderBottomLeftRadius) css['border-bottom-left-radius'] = stringUnit(layer.borderBottomLeftRadius);
                if (layer.borderBottomRightRadius) css['border-bottom-right-radius'] = stringUnit(layer.borderBottomRightRadius);
            }

            return css;
        }
    }, {
        key: GETTER('layer/bound/toCSS'),
        value: function value$$1($store, layer) {
            var css = {};

            if (!layer) return css;

            css.left = stringUnit(layer.x);
            css.top = stringUnit(layer.y);
            css.width = stringUnit(layer.width);
            css.height = stringUnit(layer.height);
            css['z-index'] = layer.index;

            return css;
        }
    }, {
        key: GETTER('layer/toCSS'),
        value: function value$$1($store) {
            var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var withStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var image = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var isExport = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var css = {};

            if (withStyle) {
                css = Object.assign(css, $store.read('layer/bound/toCSS', layer));
            }

            if (layer.backgroundColor) {
                css['background-color'] = layer.backgroundColor;
            }

            if (layer.mixBlendMode) {
                css['mix-blend-mode'] = layer.mixBlendMode || "";
            }

            if (layer.backgroundClip && !layer.clipText) {
                css['background-clip'] = layer.backgroundClip || "";
                css['-webkit-background-clip'] = layer.backgroundClip || "";
            }

            if (layer.opacity) {
                css['opacity'] = layer.opacity;
            }

            var results = Object.assign(css, $store.read('layer/make/border-radius', layer), $store.read('layer/make/transform', layer), $store.read('layer/make/clip-path', layer), $store.read('layer/make/filter', layer), $store.read('layer/make/backdrop', layer), $store.read('layer/make/font', layer), $store.read('layer/make/box-shadow', layer), $store.read('layer/make/text-shadow', layer), image ? $store.read('layer/image/toImageCSS', image) : $store.read('layer/make/image', layer, isExport));

            return cleanObject(results);
        }
    }, {
        key: GETTER('layer/cache/toCSS'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var layer = Object.assign({}, $store.read('item/convert/style', item.layer), { images: item.images });
            var css = {};

            css = Object.assign(css, $store.read('layer/bound/toCSS', layer));

            if (layer.backgroundColor) {
                css['background-color'] = layer.backgroundColor;
            }

            if (layer.mixBlendMode) {
                css['mix-blend-mode'] = layer.mixBlendMode;
            }

            if (layer.backgroundClip && !layer.clipText) {
                css['background-clip'] = layer.backgroundClip || "";
                css['-webkit-background-clip'] = layer.backgroundClip || "";
            }

            if (layer.opacity) {
                css['opacity'] = layer.opacity;
            }

            var results = Object.assign(css, $store.read('layer/make/border-radius', layer), $store.read('layer/make/transform', layer), $store.read('layer/make/clip-path', layer), $store.read('layer/make/filter', layer), $store.read('layer/make/backdrop', layer), $store.read('layer/make/font', layer), $store.read('layer/make/box-shadow', layer), $store.read('layer/make/text-shadow', layer), $store.read('layer/cache/toImageCSS', layer.images));

            return cleanObject(results);
        }
    }]);
    return LayerManager;
}(BaseModule);

var ToolManager = function (_BaseModule) {
    inherits(ToolManager, _BaseModule);

    function ToolManager() {
        classCallCheck(this, ToolManager);
        return possibleConstructorReturn(this, (ToolManager.__proto__ || Object.getPrototypeOf(ToolManager)).apply(this, arguments));
    }

    createClass(ToolManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(ToolManager.prototype.__proto__ || Object.getPrototypeOf(ToolManager.prototype), "initialize", this).call(this);

            this.$store.tool = {
                color: '',
                colorSource: '',
                'show.grid': false,
                'snap.grid': false,
                'guide.only': false,
                'guide.angle': true,
                'guide.position': true
            };
        }
    }, {
        key: GETTER('clone'),
        value: function value($store, object) {
            return JSON.parse(JSON.stringify(object));
        }
    }, {
        key: GETTER('tool/colorSource'),
        value: function value($store) {
            return $store.tool.colorSource;
        }
    }, {
        key: GETTER('tool/get'),
        value: function value($store, key, defaultValue$$1) {
            return isUndefined($store.tool[key]) ? defaultValue$$1 : $store.tool[key];
        }
    }, {
        key: ACTION('tool/setColorSource'),
        value: function value($store, colorSource) {
            $store.tool.colorSource = colorSource;
        }
    }, {
        key: ACTION('tool/changeColor'),
        value: function value($store, color) {
            $store.tool.color = color;

            $store.emit('changeColor');
        }
    }, {
        key: ACTION('tool/set'),
        value: function value($store, key, _value) {
            $store.tool[key] = _value;

            $store.emit('changeTool');
        }
    }, {
        key: ACTION('tool/toggle'),
        value: function value($store, key, isForce) {
            if (isFunction(isForce)) {
                $store.tool[key] = !$store.tool[key];
            } else {
                $store.tool[key] = isForce;
            }

            $store.emit('changeTool');
        }
    }]);
    return ToolManager;
}(BaseModule);

var blend_list = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

var BlendManager = function (_BaseModule) {
    inherits(BlendManager, _BaseModule);

    function BlendManager() {
        classCallCheck(this, BlendManager);
        return possibleConstructorReturn(this, (BlendManager.__proto__ || Object.getPrototypeOf(BlendManager)).apply(this, arguments));
    }

    createClass(BlendManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(BlendManager.prototype.__proto__ || Object.getPrototypeOf(BlendManager.prototype), "initialize", this).call(this);

            this.$store.blendMode = '';
        }
    }, {
        key: GETTER('blend/layer/toString'),
        value: function value($store, item) {
            var mixBlend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var withStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;


            item = $store.read('clone', item);

            item.mixBlendMode = mixBlend;

            return $store.read('layer/toString', item, withStyle);
        }
    }, {
        key: GETTER('blend/image/toString'),
        value: function value($store, item) {
            var blend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var withStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;


            item = $store.read('clone', item);

            item.backgroundBlendMode = blend;

            // console.log($store.read('image/toString', item, withStyle))

            return $store.read('image/toString', item, withStyle);
        }
    }, {
        key: GETTER('blend/toStringWithoutDimension'),
        value: function value($store, item) {
            var mixBlend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            return $store.read('blend/layer/toString', item, mixBlend, false);
        }
    }, {
        key: GETTER('blend/toStringWithoutDimensionForImage'),
        value: function value($store, item) {
            var blend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'normal';

            // console.log(item, blend);
            var cssText = $store.read('blend/image/toString', item, blend, false);

            cssText = cssText.split(';').map(function (it) {
                return it.split(':').map(function (it) {
                    return it.trim();
                });
            }).map(function (a) {
                if (a[0] == 'background-image') {
                    a[1] += ',url(/resources/image/grapes.jpg)';
                } else if (a[0] == 'background-size') {
                    a[1] += ',auto';
                } else if (a[0] == 'background-repeat') {
                    a[1] += ',no-repeat';
                } else if (a[0] == 'background-position') {
                    a[1] += ',center center';
                } else if (a[0] == 'background-blend-mode') {
                    a[1] += ',normal';
                }

                return a.join(':');
            }).join(';');

            return cssText;
        }
    }, {
        key: GETTER('blend/list'),
        value: function value($store) {
            return blend_list;
        }
    }]);
    return BlendManager;
}(BaseModule);

var sample1 = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: 'red', percent: 0 }, { color: 'blue', percent: 10 }, { color: 'yellow', percent: 40 }, { color: 'green', percent: 60 }, { color: 'magenta', percent: 80 }, { color: 'black', percent: 100 }]
};

var gradegray = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#bdc3c7', percent: 0 }, { color: '#2c3e50', percent: 100 }]
};

var piggypink = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#ee9ca7', percent: 0 }, { color: '#ffdde1', percent: 100 }]
};

var coolblues = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#2193b0', percent: 0 }, { color: '#6dd5ed', percent: 100 }]
};

var megatron = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#C6FFDD', percent: 0 }, { color: '#FBD786', percent: 50 }, { color: '#f7797d', percent: 100 }]
};

var jshine = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#12c2e9', percent: 0 }, { color: '#c471ed', percent: 50 }, { color: '#f7797d', percent: 100 }]
};

var darkocean = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#373B44', percent: 0 }, { color: '#4286f4', percent: 100 }]
};

var yoda = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#FF0099', percent: 0 }, { color: '#493240', percent: 100 }]
};

var liberty = {
    type: 'linear',
    angle: 90,
    colorsteps: [{ color: '#200122', percent: 0 }, { color: '#6f0000', percent: 100 }]
};

var silence = {
    type: 'linear',
    angle: 340,
    colorsteps: [{ color: '#b721ff', percent: 0 }, { color: '#21d4fd', percent: 100 }]
};

var circle = {
    type: 'radial',
    radialPosition: POSITION_CENTER,
    radialType: 'circle',
    colorsteps: [{ color: 'white', percent: 0 }, { color: 'black', percent: 50 }]
};

var circle2 = {
    type: 'repeating-radial',
    radialPosition: 'top',
    radialType: 'circle',
    colorsteps: [{ color: 'white', percent: 0 }, { color: 'rgb(255,82,2)', percent: 9 }]
};

var deepblue = {
    type: 'linear',
    angle: 'to right',
    colorsteps: [{ color: '#6a11cb', percent: 0 }, { color: '#2575fc', percent: 100 }]
};

var gradientList = [deepblue, sample1, gradegray, piggypink, coolblues, megatron, jshine, darkocean, yoda, liberty, silence, circle, circle2];

var material = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E'];

var types = [{ id: 'material', title: 'Material Colors' }];

var list = {
    material: material
};

var ColorList = {
    list: list,
    types: types
};

var GradientManager = function (_BaseModule) {
    inherits(GradientManager, _BaseModule);

    function GradientManager() {
        classCallCheck(this, GradientManager);
        return possibleConstructorReturn(this, (GradientManager.__proto__ || Object.getPrototypeOf(GradientManager)).apply(this, arguments));
    }

    createClass(GradientManager, [{
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit('changeEditor');
        }
    }, {
        key: GETTER('gradient/list/sample'),
        value: function value($store) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';


            var results = [];

            if (type == 'all') {
                results.push.apply(results, toConsumableArray(gradientList.map(function (it) {
                    return Object.assign({}, it);
                })));

                results.push({
                    type: 'static',
                    color: ColorList.list['material'][0]
                });
            } else {
                results.push.apply(results, toConsumableArray(ColorList.list['material'].map(function (color) {
                    return Object.assign({}, { type: 'static', color: color });
                })));
            }

            return results;
        }
    }, {
        key: ACTION('gradient/image/select'),
        value: function value($store, obj) {
            var image = $store.read('selection/current/image');

            if (image) {

                $store.run('item/remove/children', image.id);

                image = Object.assign({}, image, obj);

                if (image.colorsteps) {

                    if (isUndefined(image.colorsteps[0].index)) {
                        image.colorsteps.sort(function (a, b) {

                            var aValue = $store.read('image/get/stepValue', a);
                            var bValue = $store.read('image/get/stepValue', b);

                            if (aValue == bValue) return 0;

                            return aValue > bValue ? 1 : -1;
                        });
                    } else {
                        image.colorsteps.sort(function (a, b) {

                            var aValue = a.index;
                            var bValue = b.index;

                            if (aValue == bValue) return 0;

                            return aValue > bValue ? 1 : -1;
                        });
                    }

                    image.colorsteps.forEach(function (step, index) {
                        step.parentId = image.id;
                        step.index = index * 100;
                        $store.read('item/create/colorstep', step);
                    });
                    // 기존 데이타를 변경 후에 colorsteps 는 지운다. 
                    delete image.colorsteps;
                }

                $store.run('item/set', image);
            } else {
                $store.read('selection/current/layer', function (layer) {
                    layer.backgroundColor = obj.color;
                    $store.run('item/set', layer);
                });
            }
        }
    }, {
        key: ACTION('gradient/image/add'),
        value: function value($store, obj) {
            var image = $store.read('selection/current/image');

            if (image) {

                // $store.run('item/remove/children', image.id);

                var newImageId = $store.read('item/create/object', Object.assign({}, image, obj));
                var newImage = $store.read('item/get', newImageId);
                newImage.index -= 1;

                if (newImage.colorsteps) {

                    if (isUndefined(newImage.colorsteps[0].index)) {
                        newImage.colorsteps.sort(function (a, b) {

                            var aValue = $store.read('image/get/stepValue', a);
                            var bValue = $store.read('image/get/stepValue', b);

                            if (aValue == bValue) return 0;

                            return aValue > bValue ? 1 : -1;
                        });
                    } else {
                        newImage.colorsteps.sort(function (a, b) {

                            var aValue = a.index;
                            var bValue = b.index;

                            if (aValue == bValue) return 0;

                            return aValue > bValue ? 1 : -1;
                        });
                    }

                    newImage.colorsteps.forEach(function (step, index) {
                        step.parentId = newImage.id;
                        step.index = index * 100;
                        $store.read('item/create/colorstep', step);
                    });
                    // 기존 데이타를 변경 후에 colorsteps 는 지운다. 
                    delete newImage.colorsteps;
                }

                $store.run('item/move/in', image.id, newImage.id);
            } else {
                // $store.read('selection/current/layer', (layer) => {
                //     layer.backgroundColor = obj.color;
                //     $store.run('item/set', layer);
                // })

            }
        }
    }, {
        key: ACTION('gradient/select'),
        value: function value($store, type, index) {
            var obj = $store.read('gradient/list/sample', type)[index];

            if (obj) {
                $store.run('gradient/image/select', obj);
            }
        }
    }, {
        key: ACTION('gradient/add'),
        value: function value($store, type, index) {
            var obj = $store.read('gradient/list/sample', type)[index];

            if (obj) {
                $store.run('gradient/image/add', obj);
            }
        }
    }]);
    return GradientManager;
}(BaseModule);

var _updateUnitField;

var INDEX_DIST = 100;
var NONE_INDEX = -99999;

var itemField = {
    'mix-blend-mode': 'mixBlendMode',
    'background-blend-mode': 'backgroundBlendMode',
    'background-color': 'backgroundColor',
    'x': 'x',
    'y': 'y',
    'width': 'width',
    'height': 'height',
    'rotate': 'rotate',
    'border-radius': 'borderRadius',
    'border-top-left-radius': 'borderTopLeftRadius',
    'border-top-right-radius': 'borderTopRightRadius',
    'border-bottom-left-radius': 'borderBottomLeftRadius',
    'border-bottom-right-radius': 'borderBottomRightRadius',
    'skewX': 'skewX',
    'skewY': 'skewY',
    'scale': 'scale',
    'translateX': 'translateX',
    'translateY': 'translateY',
    'translateZ': 'translateZ',
    'rotate3dX': 'rotate3dX',
    'rotate3dY': 'rotate3dY',
    'rotate3dZ': 'rotate3dZ',
    'rotate3dA': 'rotate3dA',
    'scale3dX': 'scale3dX',
    'scale3dY': 'scale3dY',
    'scale3dZ': 'scale3dZ',
    'translate3dX': 'translate3dX',
    'translate3dY': 'translate3dY',
    'translate3dZ': 'translate3dZ'
};

var updateUnitField = (_updateUnitField = {
    borderRadius: true,
    borderTopLeftRadius: true,
    borderBottomLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    backgroundSizeWidth: true,
    backgroundSizeHeight: true,
    x: true,
    y: true,
    width: true,
    height: true,
    backgroundPositionX: true,
    backgroundPositionY: true
}, defineProperty(_updateUnitField, "backgroundSizeHeight", true), defineProperty(_updateUnitField, "backgroundSizeWidth", true), _updateUnitField);

var convertStyle$1 = function convertStyle(item) {
    var style = item.style || {};

    Object.keys(style).forEach(function (key) {
        item[itemField[key]] = style[key];
    });

    delete item.style;

    Object.keys(item).forEach(function (key) {
        if (updateUnitField[key]) {
            item[key] = string2unit(item[key]);
        }
    });

    return item;
};



var ItemManager = function (_BaseModule) {
    inherits(ItemManager, _BaseModule);

    function ItemManager() {
        classCallCheck(this, ItemManager);
        return possibleConstructorReturn(this, (ItemManager.__proto__ || Object.getPrototypeOf(ItemManager)).apply(this, arguments));
    }

    createClass(ItemManager, [{
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit(CHANGE_EDITOR);
        }
    }, {
        key: GETTER('item/convert/style'),
        value: function value$$1($store, item) {
            return convertStyle$1(item);
        }
    }, {
        key: GETTER('item/get'),
        value: function value$$1($store, id) {
            return $store.items[id] || {};
        }
    }, {
        key: ACTION('item/set/all'),
        value: function value$$1($store, parentId, items) {
            var isRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            if (isRemove) {
                $store.run('item/remove/all', parentId);
            }
            Object.assign($store.items, items);
        }
    }, {
        key: ACTION('item/focus'),
        value: function value$$1($store, id) {
            var $el = $store.read('item/dom', id);

            if ($el && $el.el) {
                $el.el.focus();
            }
        }
    }, {
        key: ACTION('item/remove'),
        value: function value$$1($store, id) {
            if (id) {

                var item = $store.read('item/get', id);
                var itemType = item.itemType;

                if (item.parentId) {
                    var list = $store.read('item/list/children', item.parentId, itemType);
                } else {
                    var list = $store.read('item/list/page');
                }

                var nextSelectedId = '';
                for (var i = 0, len = list.length; i < len; i++) {
                    var nodeId = list[i];
                    if ($store.items[id].index > item.index) {
                        nextSelectedId = nodeId;
                        break;
                    }
                }

                if (nextSelectedId) {
                    $store.run('selection/one', nextSelectedId);
                } else {
                    if (item.index > 0) {
                        for (var i = 0, len = list.length; i < len; i++) {
                            var nodeId = list[i];
                            if ($store.items[nodeId].index == item.index - INDEX_DIST) {
                                nextSelectedId = nodeId;
                                break;
                            }
                        }

                        if (nextSelectedId) {
                            $store.run('selection/one', nextSelectedId);
                        }
                    } else {
                        $store.run('selection/one', item.parentId);
                    }
                }

                $store.items[id].index = NONE_INDEX;
                $store.read('item/sort', id);

                if ($store.items[id].backgroundImage) {
                    URL.revokeObjectURL($store.items[id].backgroundImage);
                }
                $store.run('item/initialize', id);
            }
        }
    }, {
        key: ACTION('item/remove/all'),
        value: function value$$1($store, parentId) {
            $store.read('item/each/children', parentId, function (item) {

                $store.run('item/remove/all', item.id);

                $store.run('item/initialize', item.id);
            });
        }
    }, {
        key: ACTION('item/remove/children'),
        value: function value$$1($store, parentId) {
            $store.read('item/each/children', parentId, function (item) {
                $store.run('item/remove', item.id);
            });
        }
    }, {
        key: ACTION('item/set'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var id = obj.id;
            var prevItem = $store.clone('item/get', id);
            $store.items[id] = Object.assign({}, prevItem, obj);

            if (isSelected) $store.run('selection/one', id);
        }

        // initialize items 

    }, {
        key: ACTION('item/load'),
        value: function value$$1($store) {
            $store.read('item/keys').forEach(function (id) {
                $store.items[id] = convertStyle$1($store.items[id]);
            });

            $store.run('history/initialize');
        }
    }, {
        key: ACTION('item/sort'),
        value: function value$$1($store, id) {
            var item = $store.read('item/get', id);
            var itemType = item.itemType;

            if (item.parentId) {
                var list = $store.read('item/list/children', item.parentId, itemType);
            } else {
                var list = $store.read('item/list/page');
            }

            // 필요 없는 index 를 가진 객체는 지운다. 
            list = list.filter(function (id) {
                return $store.items[id].index != NONE_INDEX;
            });

            list.sort(function (a, b) {
                return $store.items[a].index > $store.items[b].index ? 1 : -1;
            });

            list.forEach(function (id, index) {
                $store.items[id].index = index * INDEX_DIST;
            });
        }
    }]);
    return ItemManager;
}(BaseModule);

var MAX_DIST = 1;

var GuideManager = function (_BaseModule) {
    inherits(GuideManager, _BaseModule);

    function GuideManager() {
        classCallCheck(this, GuideManager);
        return possibleConstructorReturn(this, (GuideManager.__proto__ || Object.getPrototypeOf(GuideManager)).apply(this, arguments));
    }

    createClass(GuideManager, [{
        key: GETTER('guide/rect/point'),
        value: function value$$1($store, obj) {
            var id = obj.id;
            var x = unitValue(obj.x);
            var y = unitValue(obj.y);
            var width = unitValue(obj.width);
            var height = unitValue(obj.height);

            var x2 = x + width;
            var y2 = y + height;

            var centerX = x + Math.floor(width / 2);
            var centerY = y + Math.floor(height / 2);

            var startX = x;
            var endX = x2;
            var startY = y;
            var endY = y2;

            return {
                pointX: [{ x: x, y: centerY, startX: startX, endX: endX, centerX: centerX, id: id, width: width, height: height }, { x: centerX, y: centerY, startX: startX, endX: endX, centerX: centerX, id: id, width: width, height: height }, { x: x2, y: centerY, startX: startX, endX: endX, centerX: centerX, id: id, width: width, height: height }],

                pointY: [{ x: centerX, y: y, startY: startY, endY: endY, centerY: centerY, id: id, width: width, height: height }, { x: centerX, y: centerY, startY: startY, endY: endY, centerY: centerY, id: id, width: width, height: height }, { x: centerX, y: y2, startY: startY, endY: endY, centerY: centerY, id: id, width: width, height: height }]
            };
        }
    }, {
        key: GETTER('guide/compare'),
        value: function value$$1($store, A, B) {
            var dist = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MAX_DIST;

            // x 축 비교 , x 축이 dist 안에 있으면 합격 

            var results = [];
            A.pointX.forEach(function (AX, index) {
                B.pointX.forEach(function (BX, targetIndex) {
                    // console.log('x축', AX.x, BX.x, Math.abs(AX.x - BX.x),  dist)
                    if (Math.abs(AX.x - BX.x) <= dist) {

                        results.push({
                            type: GUIDE_TYPE_VERTICAL,
                            x: BX.x,
                            y: AX.y,
                            index: index,
                            targetIndex: targetIndex,
                            startX: BX.startX,
                            endX: BX.endX,
                            centerX: BX.centerX,
                            sourceId: AX.id,
                            targetId: BX.id,
                            width: AX.width,
                            height: AX.height
                        });
                    }
                });
            });

            // y 축 비교,    
            A.pointY.forEach(function (AY, index) {
                B.pointY.forEach(function (BY, targetIndex) {
                    // console.log('y축', AY.y, BY.y, Math.abs(AY.y - BY.y),  dist)
                    if (Math.abs(AY.y - BY.y) <= dist) {
                        results.push({
                            type: GUIDE_TYPE_HORIZONTAL,
                            x: AY.x,
                            y: BY.y,
                            index: index,
                            targetIndex: targetIndex,
                            startY: BY.startY,
                            endY: BY.endY,
                            centerY: BY.centerY,
                            sourceId: AY.id,
                            targetId: BY.id,
                            width: AY.width,
                            height: AY.height
                        });
                    }
                });
            });

            return results;
        }
    }, {
        key: GETTER('guide/snap/layer'),
        value: function value$$1($store) {
            var dist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_DIST;

            var page = $store.read('selection/current/page');

            if (!page) return [];
            if (page.selected) return [];

            var selectionRect = $store.read('guide/rect/point', $store.read('selection/rect'));
            var pageRect = $store.read('guide/rect/point', {
                x: pxUnit(0),
                y: pxUnit(0),
                width: page.width,
                height: page.height
            });

            var layers = [];
            $store.read('item/each/children', page.id, function (item) {
                if ($store.read('selection/check', item.id) == false) {
                    layers.push($store.read('guide/rect/point', item));
                }
            });
            layers.push(pageRect);

            var points = [];

            layers.forEach(function (B) {
                points.push.apply(points, toConsumableArray($store.read('guide/compare', selectionRect, B, dist)));
            });

            // console.log(points);

            return points; //.filter( (_, index) => index === 0);
        }
    }, {
        key: ACTION('guide/snap/caculate'),
        value: function value$$1($store) {
            var dist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_DIST;


            var list = $store.read('guide/snap/layer', dist);

            if (list.length) {

                list.forEach(function (rect) {

                    var positionObject = null;

                    if (rect.type == GUIDE_TYPE_HORIZONTAL) {
                        var y;

                        switch (rect.targetIndex) {
                            case 0:
                                y = rect.startY;break;
                            case 1:
                                y = rect.centerY;break;
                            case 2:
                                y = rect.endY;break;
                        }

                        switch (rect.index) {
                            case 1:
                                y -= Math.floor(rect.height / 2);break;
                            case 2:
                                y -= rect.height;break;
                        }

                        positionObject = { id: rect.sourceId, y: pxUnit(y) };
                    } else if (rect.type == GUIDE_TYPE_VERTICAL) {
                        var x;
                        switch (rect.targetIndex) {
                            case 0:
                                x = rect.startX;break;
                            case 1:
                                x = rect.centerX;break;
                            case 2:
                                x = rect.endX;break;
                        }

                        switch (rect.index) {
                            case 1:
                                x -= Math.floor(rect.width / 2);break;
                            case 2:
                                x -= rect.width;break;
                        }

                        positionObject = { id: rect.sourceId, x: pxUnit(x) };
                    }

                    if (isNotUndefined(positionObject)) {
                        $store.run('item/set', positionObject);
                    }
                });
            }
        }
    }]);
    return GuideManager;
}(BaseModule);

var SAVE_ID = 'css-imageeditor';
var CACHED_PAGE_SAVE_ID = 'css-imageeditor-cached-pages';
var CACHED_LAYER_SAVE_ID = 'css-imageeditor-cached-layers';
var CACHED_IMAGE_SAVE_ID = 'css-imageeditor-cached-images';

var StorageManager = function (_BaseModule) {
    inherits(StorageManager, _BaseModule);

    function StorageManager() {
        classCallCheck(this, StorageManager);
        return possibleConstructorReturn(this, (StorageManager.__proto__ || Object.getPrototypeOf(StorageManager)).apply(this, arguments));
    }

    createClass(StorageManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(StorageManager.prototype.__proto__ || Object.getPrototypeOf(StorageManager.prototype), "initialize", this).call(this);

            this.$store.cachedPages = [];
            this.$store.cachedLayers = [];
            this.$store.cachedImages = [];
        }
    }, {
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit('changeStorage');
        }
    }, {
        key: GETTER('storage/get'),
        value: function value($store, key) {
            return JSON.parse(localStorage.getItem(SAVE_ID + "-" + key));
        }
    }, {
        key: ACTION('storage/set'),
        value: function value($store, key, _value) {
            localStorage.setItem(SAVE_ID + "-" + key, JSON.stringify(_value));
        }
    }, {
        key: GETTER('storage/pages'),
        value: function value($store) {
            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            if (isNotUndefined(id)) {
                var results = $store.cachedPages.filter(function (item) {
                    return item.id == id;
                });

                if (!results.length) {
                    return {};
                }

                return results[0];
            }
            return $store.cachedPages;
        }
    }, {
        key: GETTER('storage/layers'),
        value: function value($store) {
            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            if (isNotUndefined(id)) {
                var results = $store.cachedLayers.filter(function (item) {
                    return item.id == id;
                });

                if (!results.length) {
                    return {};
                }

                return results[0];
            }
            return $store.cachedLayers;
        }
    }, {
        key: GETTER('storage/images'),
        value: function value($store) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            if (isNotUndefined(index)) {
                return $store.cachedImages[index];
            }
            return $store.cachedImages;
        }
    }, {
        key: ACTION('storage/unshift/layer'),
        value: function value($store, layer) {
            var item = $store.read('clone', layer);
            item.id = uuid();
            $store.cachedLayers.unshift(item);

            $store.run('storage/save/layer');
        }
    }, {
        key: ACTION('storage/add/layer'),
        value: function value($store, layer) {
            var item = $store.read('clone', layer);
            item.id = uuid();
            $store.cachedLayers.push(item);

            $store.run('storage/save/layer');
        }
    }, {
        key: ACTION('storage/remove/layer'),
        value: function value($store, id) {

            $store.cachedLayers = $store.cachedLayers.filter(function (item) {
                return item.id != id;
            });

            $store.run('storage/save/layer');
        }
    }, {
        key: ACTION('storage/remove/page'),
        value: function value($store, id) {

            $store.cachedLayers = $store.cachedPages.filter(function (item) {
                return item.id != id;
            });

            $store.run('storage/save/page');
        }
    }, {
        key: ACTION('storage/unshift/page'),
        value: function value($store, page) {
            var item = $store.read('clone', page);
            item.id = uuid();
            $store.cachedPages.unshift(item);

            $store.run('storage/save/page');
        }
    }, {
        key: ACTION('storage/add/page'),
        value: function value($store, page) {
            var item = $store.read('clone', page);
            item.id = uuid();
            $store.cachedPages.push(item);

            $store.run('storage/save/page');
        }
    }, {
        key: ACTION('storage/delete/page'),
        value: function value($store, id) {

            $store.cachedPages = $store.cachedPages.filter(function (item) {
                return item.id != id;
            });

            $store.run('storage/save/page');
        }
    }, {
        key: ACTION('storage/delete/image'),
        value: function value($store, id) {

            $store.cachedImages = $store.cachedImages.filter(function (item) {
                return item.id != id;
            });

            $store.run('storage/save/image');
        }
    }, {
        key: ACTION('storage/add/image'),
        value: function value($store, image) {
            var item = $store.read('clone', image);
            item.id = uuid();
            $store.cachedImages.push(item);

            $store.run('storage/save/image');
        }
    }, {
        key: ACTION('storage/save'),
        value: function value($store) {
            localStorage.setItem(SAVE_ID, JSON.stringify({
                items: $store.items,
                selection: $store.selection
            }));
        }
    }, {
        key: ACTION('storage/save/layer'),
        value: function value($store) {
            localStorage.setItem(CACHED_LAYER_SAVE_ID, JSON.stringify($store.cachedLayers));
        }
    }, {
        key: ACTION('storage/save/page'),
        value: function value($store) {
            localStorage.setItem(CACHED_PAGE_SAVE_ID, JSON.stringify($store.cachedPages));
        }
    }, {
        key: ACTION('storage/save/image'),
        value: function value($store) {
            localStorage.setItem(CACHED_IMAGE_SAVE_ID, JSON.stringify($store.cachedImages));
        }
    }, {
        key: ACTION('storage/load/layer'),
        value: function value($store) {
            $store.cachedLayers = JSON.parse(localStorage.getItem(CACHED_LAYER_SAVE_ID) || "[]");

            $store.cachedLayers = $store.cachedLayers.map(function (item) {
                if (!item.id) item.id = uuid();
                return item;
            });
        }
    }, {
        key: ACTION('storage/load/page'),
        value: function value($store) {
            $store.cachedPages = JSON.parse(localStorage.getItem(CACHED_PAGE_SAVE_ID) || "[]");

            $store.cachedPages = $store.cachedPages.map(function (item) {
                if (!item.id) item.id = uuid();
                return item;
            });
        }
    }, {
        key: ACTION('storage/load/image'),
        value: function value($store) {
            $store.cachedImages = JSON.parse(localStorage.getItem(CACHED_IMAGE_SAVE_ID) || "[]");

            $store.cachedLayers = $store.cachedLayers.map(function (item) {
                if (!item.id) item.id = uuid();
                return item;
            });
        }
    }, {
        key: ACTION('storage/load'),
        value: function value($store, callback) {
            var obj = JSON.parse(localStorage.getItem(SAVE_ID) || "{}");

            if (obj.items) $store.items = obj.items;
            if (obj.selectedId) $store.selectedId = obj.selectedId;
            if (obj.selectedMode) $store.selectedMode = obj.selectedMode;
            if (obj.selection) $store.selection = obj.selection;

            $store.run('item/keys/generate');

            if ($store.selectedId) {
                $store.run('selection/one', $store.selectedId);
            }

            if (isFunction(callback)) {
                callback(!!obj.items);
            }
        }
    }]);
    return StorageManager;
}(BaseModule);

var ordering = {
    'position': 1,
    'left': 2,
    'top': 2,
    'right': 2,
    'bottom': 2,
    'width': 3,
    'height': 3,

    'font-size': 4,
    'font-family': 4,

    'opacity': 10,
    'border-radius': 10,

    'box-shadow': 15,
    'text-shadow': 15,
    'filter': 15,

    'background-clip': 50,
    '-webkit-background-clip': 50,

    'background-repeat': 100,
    'background-blend-mode': 100,
    'background-image': 100,
    'background-size': 100,
    'background-position': 100,

    'transform': 1000

};

var MAX_ORDER = Number.MAX_SAFE_INTEGER;

var CssManager = function (_BaseModule) {
    inherits(CssManager, _BaseModule);

    function CssManager() {
        classCallCheck(this, CssManager);
        return possibleConstructorReturn(this, (CssManager.__proto__ || Object.getPrototypeOf(CssManager)).apply(this, arguments));
    }

    createClass(CssManager, [{
        key: GETTER('css/filtering'),
        value: function value($store, style) {
            var newStyle = style;

            if (newStyle['background-blend-mode'] == 'normal') {
                delete newStyle['background-blend-mode'];
            }

            if (newStyle['mix-blend-mode'] == 'normal') {
                delete newStyle['mix-blend-mode'];
            }

            if (parseParamNumber$2(newStyle.opacity) == 1) {
                delete newStyle.opacity;
            }

            if (parseParamNumber$2(newStyle.left) == 0) {
                delete newStyle.left;
            }

            if (parseParamNumber$2(newStyle.top) == 0) {
                delete newStyle.top;
            }

            if (newStyle.transform == 'none') {
                delete newStyle.transform;
            }

            if (newStyle['transform-style'] == 'float') {
                delete newStyle['transform-style'];
            }

            return newStyle;
        }
    }, {
        key: GETTER('css/sorting'),
        value: function value($store, style) {

            style = $store.read('css/filtering', style);

            var keys = Object.keys(style);

            keys.sort(function (a, b) {
                var aN = ordering[a] || MAX_ORDER;
                var bN = ordering[b] || MAX_ORDER;

                if (aN == bN) return 0;

                return aN < bN ? -1 : 1;
            });

            var newStyle = {};
            keys.forEach(function (key) {
                newStyle[key] = style[key];
            });

            return newStyle;
        }
    }, {
        key: GETTER('css/toString'),
        value: function value($store, style) {
            var newStyle = $store.read('css/sorting', style);

            return Object.keys(newStyle).filter(function (key) {
                return !!newStyle[key];
            }).map(function (key) {
                return key + ": " + newStyle[key];
            }).join(';');
        }
    }, {
        key: GETTER('css/generate'),
        value: function value($store, css) {
            var results = {};

            Object.keys(css).forEach(function (key) {
                if (!results[key]) {
                    results[key] = [];
                }

                results[key].push(css[key]);
            });

            Object.keys(results).forEach(function (key) {
                if (Array.isArray(results[key])) {
                    results[key] = results[key].join(', ');
                }
            });

            return results;
        }
    }]);
    return CssManager;
}(BaseModule);

var ExternalResourceManager = function (_BaseModule) {
    inherits(ExternalResourceManager, _BaseModule);

    function ExternalResourceManager() {
        classCallCheck(this, ExternalResourceManager);
        return possibleConstructorReturn(this, (ExternalResourceManager.__proto__ || Object.getPrototypeOf(ExternalResourceManager)).apply(this, arguments));
    }

    createClass(ExternalResourceManager, [{
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit('changeEditor');
        }
    }, {
        key: ACTION('external/paste'),
        value: function value($store, dataTransfer, layerId) {
            var items = [].concat(toConsumableArray(dataTransfer.items));
            var types = [].concat(toConsumableArray(dataTransfer.types)).filter(function (type) {
                return type == 'text/uri-list';
            });

            var dataList = types.map(function (type) {
                return dataTransfer.getData(type);
            });

            if (dataList.length) {
                $store.read('image/get/url', dataList, function (url) {

                    $store.run('item/prepend/image/url', url, true, layerId);
                });
            }

            var files = [].concat(toConsumableArray(dataTransfer.files));
            if (files.length) {

                $store.read('image/get/file', files, function (img) {
                    $store.dispatch('item/prepend/image/file', img, true, layerId);
                });
            }
        }
    }]);
    return ExternalResourceManager;
}(BaseModule);

var sample1$1 = "\n<svg xmlns='http://www.w3.org/2000/svg'>\n    <rect width=\"30px\" height=\"30px\" fill=\"black\" />\n</svg>\n";

var cloud = "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 60 60\" style=\"enable-background:new 0 0 60 60;\" xml:space=\"preserve\">\n<path style=\"fill:#7FABDA;stroke:#7383BF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;\" d=\"M50.003,27\n\tc-0.115-8.699-7.193-16-15.919-16c-5.559,0-10.779,3.005-13.661,7.336C19.157,17.493,17.636,17,16,17c-4.418,0-8,3.582-8,8\n\tc0,0.153,0.014,0.302,0.023,0.454C8.013,25.636,8,25.82,8,26c-3.988,1.912-7,6.457-7,11.155C1,43.67,6.33,49,12.845,49h24.507\n\tc0.138,0,0.272-0.016,0.408-0.021C37.897,48.984,38.031,49,38.169,49h9.803C54.037,49,59,44.037,59,37.972\n\tC59,32.601,55.106,27.961,50.003,27z\"/>\n<path style=\"fill:#7FABDA;stroke:#7383BF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;\" d=\"M50.003,27\n\tc0,0-2.535-0.375-5.003,0\"/>\n<path style=\"fill:#7FABDA;stroke:#7383BF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;\" d=\"M8,25c0-4.418,3.582-8,8-8\n\ts8,3.582,8,8\"/>\n</svg>\n";

var SVGList = [sample1$1, cloud];

var SVGManager = function (_BaseModule) {
    inherits(SVGManager, _BaseModule);

    function SVGManager() {
        classCallCheck(this, SVGManager);
        return possibleConstructorReturn(this, (SVGManager.__proto__ || Object.getPrototypeOf(SVGManager)).apply(this, arguments));
    }

    createClass(SVGManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(SVGManager.prototype.__proto__ || Object.getPrototypeOf(SVGManager.prototype), "initialize", this).call(this);

            this.$store.svgList = [];
        }
    }, {
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit('changeSvgList');
        }
    }, {
        key: GETTER('svg/list'),
        value: function value($store) {
            return [].concat(toConsumableArray(SVGList), toConsumableArray($store.svgList));
        }
    }, {
        key: ACTION('svg/list/load'),
        value: function value($store) {
            var loadList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            $store.svgList = $store.read('clone', loadList);
        }
    }, {
        key: GETTER('svg/get/clipPath'),
        value: function value($store, svg, id, callback) {
            var transform = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";


            var $div = new Dom('div');
            var paths = $div.html(svg).$('svg').html();

            var svg = "<svg height=\"0\" width=\"0\"><defs><clipPath id=\"" + id + "\" " + (transform ? "transform=\"" + transform + "\"" : "") + " >" + paths + "</clipPath></defs></svg>";

            callback && callback(svg, id);
        }
    }, {
        key: GETTER('svg/get/blob'),
        value: function value($store, index, key) {
            if (SVGList[index]) {
                var svg = "" + SVGList[index];

                return new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
            } else {
                var list = $store.svgList.filter(function (item) {
                    return item.key == key;
                });

                if (list.length) {
                    return new Blob([list[0].svg], { type: "image/svg+xml;charset=utf-8" });
                }
            }

            return '';
        }
    }, {
        key: GETTER('svg/get'),
        value: function value($store, index, key) {
            if (SVGList[index]) {
                return SVGList[index];
            } else {
                var list = $store.svgList.filter(function (item) {
                    return item.key == key;
                });

                if (list.length) {
                    return list[0].svg;
                }
            }

            return '';
        }
    }]);
    return SVGManager;
}(BaseModule);

var CollectManager = function (_BaseModule) {
    inherits(CollectManager, _BaseModule);

    function CollectManager() {
        classCallCheck(this, CollectManager);
        return possibleConstructorReturn(this, (CollectManager.__proto__ || Object.getPrototypeOf(CollectManager)).apply(this, arguments));
    }

    createClass(CollectManager, [{
        key: GETTER('collect/colorsteps'),
        value: function value($store, imageId) {
            return $store.read('item/map/children', imageId, function (colorstep) {
                var colorstep = $store.read('clone', $store.items[colorstep.id]);
                delete colorstep.id;
                delete colorstep.parentId;

                return colorstep;
            });
        }
    }, {
        key: GETTER('collect/one'),
        value: function value($store, id) {
            var item = $store.read('item/get', id);

            switch (item.itemType) {
                case ITEM_TYPE_PAGE:
                    return $store.read('collect/page/one', id);
                case ITEM_TYPE_LAYER:
                    return $store.read('collect/layer/one', id);
                case ITEM_TYPE_IMAGE:
                    return $store.read('collect/image/one', id);
                case ITEM_TYPE_BOXSHADOW:
                    return $store.read('collect/boxshadow/one', id);
                case ITEM_TYPE_TEXTSHADOW:
                    return $store.read('collect/textshadow/one', id);
            }

            return null;
        }
    }, {
        key: GETTER('collect/image/one'),
        value: function value($store, imageId) {
            var image = $store.read('clone', $store.items[imageId]);
            delete image.id;
            delete image.parentId;

            return {
                image: image,
                colorsteps: $store.read('collect/colorsteps', imageId)
            };
        }
    }, {
        key: GETTER('collect/boxshadow/one'),
        value: function value($store, boxshadowId) {
            var boxshadow = $store.read('clone', $store.items[boxshadowId]);
            delete boxshadow.id;
            delete boxshadow.parentId;

            return { boxshadow: boxshadow };
        }
    }, {
        key: GETTER('collect/textshadow/one'),
        value: function value($store, textshadowId) {
            var textshadow = $store.read('clone', $store.items[textshadowId]);
            delete textshadow.id;
            delete textshadow.parentId;

            return { textshadow: textshadow };
        }
    }, {
        key: GETTER('collect/images'),
        value: function value($store, layerId) {
            return $store.read('item/map/image/children', layerId, function (image) {
                return $store.read('collect/image/one', image.id);
            });
        }
    }, {
        key: GETTER('collect/boxshadows'),
        value: function value($store, layerId) {
            return $store.read('item/map/boxshadow/children', layerId, function (image) {
                return $store.read('collect/boxshadow/one', image.id);
            });
        }
    }, {
        key: GETTER('collect/textshadows'),
        value: function value($store, layerId) {
            return $store.read('item/map/textshadow/children', layerId, function (image) {
                return $store.read('collect/textshadow/one', image.id);
            });
        }
    }, {
        key: GETTER('collect/layer/one'),
        value: function value($store, layerId) {
            var results = {};

            if (!$store.items[layerId]) {
                return results;
            }

            var layer = $store.read('clone', $store.items[layerId]);
            delete layer.id;
            delete layer.parentId;

            return {
                layer: layer,
                images: $store.read('collect/images', layerId),
                boxshadows: $store.read('collect/boxshadows', layerId),
                textshadows: $store.read('collect/textshadows', layerId)
            };
        }
    }, {
        key: GETTER('collect/layers'),
        value: function value($store, pageId) {
            return $store.read('item/map/children', pageId, function (layer) {
                return $store.read('collect/layer/one', layer.id);
            });
        }
    }, {
        key: GETTER('collect/page/one'),
        value: function value($store, pageId) {
            var results = {};

            if (!$store.items[pageId]) {
                return results;
            }

            var page = $store.read('clone', $store.items[pageId]);
            delete page.id;
            delete page.parentId;

            return {
                page: page,
                layers: $store.read('collect/layers', pageId)
            };
        }
    }]);
    return CollectManager;
}(BaseModule);

var PageManager = function (_BaseModule) {
    inherits(PageManager, _BaseModule);

    function PageManager() {
        classCallCheck(this, PageManager);
        return possibleConstructorReturn(this, (PageManager.__proto__ || Object.getPrototypeOf(PageManager)).apply(this, arguments));
    }

    createClass(PageManager, [{
        key: GETTER('page/toString'),
        value: function value$$1($store, id) {

            var page = $store.read('item/get', id);
            var obj = $store.read('page/toCSS', page) || {};

            return Object.keys(obj).map(function (key) {
                return key + ": " + obj[key] + ";";
            }).join(' ');
        }
    }, {
        key: GETTER('page/toCSS'),
        value: function value$$1($store) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var sample = $store.read('item/convert/style', page || {});

            var css = {
                overflow: sample.clip ? 'hidden' : '',
                'transform-style': sample.preserve ? 'preserve-3d' : 'flat',
                width: stringUnit(sample.width),
                height: stringUnit(sample.height)
            };

            if (sample.perspective) {
                css.perspective = stringUnit(sample.perspective);
            }

            if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY)) {
                css['perspective-origin'] = stringUnit(sample.perspectiveOriginPositionX) + " " + stringUnit(sample.perspectiveOriginPositionY);
            }

            return $store.read('css/sorting', css);
        }
    }, {
        key: GETTER('page/colorview/toCSS'),
        value: function value$$1($store) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var sample = $store.read('item/convert/style', page || {});

            var css = {
                'transform-style': sample.preserve ? 'preserve-3d' : 'flat'
            };

            if (sample.perspective) {
                css.perspective = stringUnit(sample.perspective);
            }

            if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY)) {
                css['perspective-origin'] = stringUnit(sample.perspectiveOriginPositionX) + " " + stringUnit(sample.perspectiveOriginPositionY);
            }

            return $store.read('css/sorting', css);
        }
    }, {
        key: GETTER('page/cache/toCSS'),
        value: function value$$1($store) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var sample = $store.read('item/convert/style', page || {});

            var css = {
                overflow: sample.clip ? 'hidden' : '',
                'transform-style': sample.preserve ? 'preserve-3d' : 'flat',
                width: stringUnit(sample.width),
                height: stringUnit(sample.height)
            };

            if (sample.perspective) {
                css.perspective = stringUnit(sample.perspective);
            }

            if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY)) {
                css['perspective-origin'] = stringUnit(sample.perspectiveOriginPositionX) + " " + stringUnit(sample.perspectiveOriginPositionY);
            }

            return $store.read('css/sorting', css);
        }
    }, {
        key: GETTER('page/cache/toString'),
        value: function value$$1($store, page) {
            var obj = $store.read('page/cache/toCSS', page) || {};

            return {
                css: $store.read('css/toString', obj),
                obj: obj
            };
        }
    }]);
    return PageManager;
}(BaseModule);

var SELECT_MODE_ONE = "SELECT_MODE_ONE";
var SELECT_MODE_AREA = "SELECT_MODE_AREA";
var SELECT_MODE_GROUP = "SELECT_MODE_GROUP";

var SelectionManager = function (_BaseModule) {
    inherits(SelectionManager, _BaseModule);

    function SelectionManager() {
        classCallCheck(this, SelectionManager);
        return possibleConstructorReturn(this, (SelectionManager.__proto__ || Object.getPrototypeOf(SelectionManager)).apply(this, arguments));
    }

    createClass(SelectionManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(SelectionManager.prototype.__proto__ || Object.getPrototypeOf(SelectionManager.prototype), "initialize", this).call(this);

            this.$store.selection = {
                type: SELECT_MODE_ONE,
                ids: [],
                items: [],
                itemType: ''
            };
        }
    }, {
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit(CHANGE_SELECTION);
        }
    }, {
        key: "checkInArea",
        value: function checkInArea(area, item) {

            if (area.width === 0) {
                return false;
            }
            if (area.height === 0) {
                return false;
            }
            if (area.x2 < item.x) {
                return false;
            }
            if (area.y2 < item.y) {
                return false;
            }
            if (area.x > item.x2) {
                return false;
            }
            if (area.y > item.y2) {
                return false;
            }

            return true;
        }
    }, {
        key: GETTER('selection/initialize/data'),
        value: function value$$1($store) {
            return {
                type: SELECT_MODE_ONE,
                ids: [],
                items: [],
                itemType: ''
            };
        }
    }, {
        key: GETTER('selection/ids'),
        value: function value$$1($store) {
            return $store.selection.ids || [];
        }
    }, {
        key: GETTER('selection/check'),
        value: function value$$1($store, id) {
            return $store.selection.ids.includes(id);
        }
    }, {
        key: GETTER('selection/is/empty'),
        value: function value$$1($store) {
            return $store.selection.ids.length === 0;
        }
    }, {
        key: GETTER('selection/is/not/empty'),
        value: function value$$1($store) {
            return $store.selection.ids.length > 0;
        }
    }, {
        key: GETTER('selection/has/one'),
        value: function value$$1($store) {
            return $store.selection.ids.length === 1;
        }
    }, {
        key: GETTER('selection/has/many'),
        value: function value$$1($store) {
            return $store.selection.ids.length > 1;
        }
    }, {
        key: GETTER('selection/type'),
        value: function value$$1($store) {
            return $store.selection.type;
        }
    }, {
        key: GETTER('selection/current'),
        value: function value$$1($store) {
            return $store.selection.ids.filter(function (id) {
                return !!$store.items[id];
            }).map(function (id) {
                return $store.items[id];
            });
        }
    }, {
        key: GETTER('selection/unit/values'),
        value: function value$$1($store) {
            return $store.read('selection/current').map(function (item) {
                return {
                    id: item.id,
                    x: unitValue(item.x),
                    y: unitValue(item.y),
                    width: unitValue(item.width),
                    height: unitValue(item.height),
                    x2: unitValue(item.x) + unitValue(item.width),
                    y2: unitValue(item.y) + unitValue(item.height),
                    centerX: unitValue(item.x) + unitValue(item.width) / 2,
                    centerY: unitValue(item.y) + unitValue(item.height) / 2
                };
            });
        }
    }, {
        key: "getCurrentItem",
        value: function getCurrentItem($store, itemType, callback) {
            var items = null;

            if ($store.selection.itemType == itemType) {
                var items = $store.read('selection/current');
            }

            if (Array.isArray(items) && items.length) {
                if ($store.read('selection/is/one')) {
                    if (isFunction(callback)) callback(items[0]);
                    return items[0];
                } else {
                    if (isFunction(callback)) callback(items);
                    return items;
                }
            }

            return items;
        }
    }, {
        key: "getCurrentItemId",
        value: function getCurrentItemId($store, itemType, callback) {
            var items = null;

            if ($store.selection.itemType == itemType) {
                var items = $store.read('selection/current');
            }

            if (Array.isArray(items) && items.length) {
                if ($store.read('selection/is/one')) {
                    if (isFunction(callback)) callback(items[0].id);
                    return items[0].id;
                } else {
                    if (isFunction(callback)) callback(items.map(function (it) {
                        return it.id;
                    }));
                    return items.map(function (it) {
                        return it.id;
                    });
                }
            }

            return items;
        }
    }, {
        key: GETTER('selection/current/image'),
        value: function value$$1($store, callback) {
            return this.getCurrentItem($store, ITEM_TYPE_IMAGE, callback);
        }
    }, {
        key: GETTER('selection/current/image/id'),
        value: function value$$1($store, callback) {
            return this.getCurrentItemId($store, ITEM_TYPE_IMAGE, callback);
        }
    }, {
        key: GETTER('selection/current/boxshadow'),
        value: function value$$1($store, callback) {
            return this.getCurrentItem($store, ITEM_TYPE_BOXSHADOW, callback);
        }
    }, {
        key: GETTER('selection/current/boxshadow/id'),
        value: function value$$1($store, callback) {
            return this.getCurrentItemId($store, ITEM_TYPE_BOXSHADOW, callback);
        }
    }, {
        key: GETTER('selection/current/textshadow'),
        value: function value$$1($store, callback) {
            return this.getCurrentItem($store, ITEM_TYPE_TEXTSHADOW$1, callback);
        }
    }, {
        key: GETTER('selection/current/textshadow/id'),
        value: function value$$1($store, callback) {
            return this.getCurrentItemId($store, ITEM_TYPE_TEXTSHADOW$1, callback);
        }
    }, {
        key: GETTER('selection/current/layer'),
        value: function value$$1($store, callback) {
            var layers = null;

            if ($store.selection.itemType == ITEM_TYPE_LAYER) {
                var layers = $store.read('selection/current');
            } else if ($store.selection.itemType == ITEM_TYPE_IMAGE || $store.selection.itemType == ITEM_TYPE_BOXSHADOW || $store.selection.itemType == ITEM_TYPE_TEXTSHADOW$1) {
                var layers = $store.read('selection/current').map(function (item) {
                    return $store.items[item.parentId];
                });
            }
            if (Array.isArray(layers) && layers.length) {
                if ($store.read('selection/is/one')) {
                    if (isFunction(callback)) callback(layers[0]);
                    return layers[0];
                } else {
                    if (isFunction(callback)) callback(layers);
                    return layers;
                }
            }

            return layers;
        }
    }, {
        key: GETTER('selection/current/layer/id'),
        value: function value$$1($store, callback) {
            var layers = null;

            if ($store.selection.itemType == ITEM_TYPE_LAYER) {
                var layers = $store.read('selection/current');
            } else if ($store.selection.itemType == ITEM_TYPE_IMAGE || $store.selection.itemType == ITEM_TYPE_BOXSHADOW || $store.selection.itemType == ITEM_TYPE_TEXTSHADOW$1) {
                var layers = $store.read('selection/current').map(function (item) {
                    return $store.items[item.parentId];
                });
            }

            if (Array.isArray(layers) && layers.length) {
                if ($store.read('selection/is/one')) {
                    if (isFunction(callback)) callback(layers[0].id);
                    return layers[0].id;
                } else {
                    if (isFunction(callback)) callback(layers.map(function (it) {
                        return it.id;
                    }));
                    return layers.map(function (it) {
                        return it.id;
                    });
                }
            }

            return layers;
        }
    }, {
        key: GETTER('selection/current/page'),
        value: function value$$1($store, callback) {

            var pages = $store.read('selection/current').map(function (it) {
                var path = $store.read('item/path', it.id);
                return $store.read('item/get', path[path.length - 1]);
            });

            if (Array.isArray(pages) && pages.length) {
                if (isFunction(callback)) callback(pages[0]);
                return pages[0];
            }

            return null;
        }
    }, {
        key: GETTER('selection/current/page/id'),
        value: function value$$1($store, callback) {

            var pages = $store.read('selection/current').map(function (it) {
                var path = $store.read('item/path', it.id);
                return $store.read('item/get', path[path.length - 1]);
            });

            if (Array.isArray(pages) && pages.length) {
                if (isFunction(callback)) callback(pages[0].id);
                return pages[0].id;
            }

            return null;
        }
    }, {
        key: GETTER('selection/mode'),
        value: function value$$1($store) {
            return $store.selection;
        }
    }, {
        key: GETTER('selection/is'),
        value: function value$$1($store, type) {
            return $store.selection.type == type;
        }
    }, {
        key: GETTER('selection/is/item'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == type;
        }
    }, {
        key: GETTER('selection/is/empty'),
        value: function value$$1($store) {
            return $store.selection.ids.length == 0;
        }
    }, {
        key: GETTER('selection/is/layer'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == ITEM_TYPE_LAYER;
        }
    }, {
        key: GETTER('selection/is/image'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == ITEM_TYPE_IMAGE;
        }
    }, {
        key: GETTER('selection/is/page'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == ITEM_TYPE_PAGE;
        }
    }, {
        key: GETTER('selection/is/boxshadow'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == ITEM_TYPE_BOXSHADOW;
        }
    }, {
        key: GETTER('selection/is/textshadow'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == ITEM_TYPE_TEXTSHADOW$1;
        }
    }, {
        key: GETTER('selection/is/filter'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == ITEM_TYPE_FILTER;
        }
    }, {
        key: GETTER('selection/is/backdrop-filter'),
        value: function value$$1($store, type) {
            return $store.selection.itemType == ITEM_TYPE_BACKDROP;
        }
    }, {
        key: GETTER('selection/is/one'),
        value: function value$$1($store) {
            return $store.read('selection/is', SELECT_MODE_ONE);
        }
    }, {
        key: GETTER('selection/is/group'),
        value: function value$$1($store) {
            return $store.read('selection/is', SELECT_MODE_GROUP);
        }
    }, {
        key: GETTER('selection/is/area'),
        value: function value$$1($store) {
            return $store.read('selection/is', SELECT_MODE_AREA);
        }
    }, {
        key: GETTER('selection/layers'),
        value: function value$$1($store) {
            return $store.read('item/filter', function (id) {
                return $store.items[id].itemType == ITEM_TYPE_LAYER;
            }).map(function (id) {
                var _$store$items$id = $store.items[id],
                    x = _$store$items$id.x,
                    y = _$store$items$id.y,
                    width = _$store$items$id.width,
                    height = _$store$items$id.height;


                x = unitValue(x);
                y = unitValue(y);
                width = unitValue(width);
                height = unitValue(height);
                var x2 = x + width;
                var y2 = y + height;

                return { x: x, y: y, width: width, height: height, x2: x2, y2: y2, id: id };
            });
        }
    }, {
        key: ACTION('selection/one'),
        value: function value$$1($store) {
            var selectedId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            $store.selection = {
                type: SELECT_MODE_ONE,
                ids: [selectedId],
                itemType: $store.items[selectedId].itemType
            };
        }
    }, {
        key: ACTION('selection/change'),
        value: function value$$1($store, itemType) {
            if (itemType == ITEM_TYPE_PAGE) {
                $store.read('selection/current/page', function (page) {
                    $store.run('selection/one', page.id);
                });
            }
        }
    }, {
        key: ACTION('selection/area'),
        value: function value$$1($store, _ref) {
            var _this2 = this;

            var x = _ref.x,
                y = _ref.y,
                width = _ref.width,
                height = _ref.height;

            var x2 = x + width;
            var y2 = y + height;

            var area = { x: x, y: y, width: width, height: height, x2: x2, y2: y2 };

            var layers = $store.read('selection/layers');

            var selectItems = [];
            layers.forEach(function (it) {

                if (_this2.checkInArea(area, it)) {
                    selectItems.push(it.id);
                }
            });

            if (selectItems.length) {
                $store.selection = {
                    type: selectItems.length == 1 ? SELECT_MODE_ONE : SELECT_MODE_GROUP,
                    ids: selectItems,
                    itemType: ITEM_TYPE_LAYER
                };
            } else {
                $store.run('selection/change', ITEM_TYPE_PAGE);
            }
        }
    }, {
        key: GETTER('selection/rect'),
        value: function value$$1($store) {
            var items = $store.selection.ids.map(function (id) {
                var _$store$items$id2 = $store.items[id],
                    x = _$store$items$id2.x,
                    y = _$store$items$id2.y,
                    width = _$store$items$id2.width,
                    height = _$store$items$id2.height;


                x = unitValue(x);
                y = unitValue(y);
                width = unitValue(width);
                height = unitValue(height);
                var x2 = x + width;
                var y2 = y + height;

                return { x: x, y: y, width: width, height: height, x2: x2, y2: y2, id: id };
            });

            var x = Math.min.apply(Math, toConsumableArray(items.map(function (it) {
                return it.x;
            })));
            var y = Math.min.apply(Math, toConsumableArray(items.map(function (it) {
                return it.y;
            })));
            var x2 = Math.max.apply(Math, toConsumableArray(items.map(function (it) {
                return it.x2;
            })));
            var y2 = Math.max.apply(Math, toConsumableArray(items.map(function (it) {
                return it.y2;
            })));

            var width = x2 - x;
            var height = y2 - y;

            x = pxUnit(x);
            y = pxUnit(y);
            width = pxUnit(width);
            height = pxUnit(height);

            if (items.length == 1) {
                return { x: x, y: y, width: width, height: height, id: items[0].id };
            }

            return { x: x, y: y, width: width, height: height };
        }
    }]);
    return SelectionManager;
}(BaseModule);

var HISTORY_MAX = 200;

var HistoryManager = function (_BaseModule) {
    inherits(HistoryManager, _BaseModule);

    function HistoryManager() {
        classCallCheck(this, HistoryManager);
        return possibleConstructorReturn(this, (HistoryManager.__proto__ || Object.getPrototypeOf(HistoryManager)).apply(this, arguments));
    }

    createClass(HistoryManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(HistoryManager.prototype.__proto__ || Object.getPrototypeOf(HistoryManager.prototype), "initialize", this).call(this);

            this.$store.historyOriginal = {};
            this.$store.histories = {};
            this.$store.historyIndex = {};
        }
    }, {
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit('changeHistory');
        }
    }, {
        key: "changeHistory",
        value: function changeHistory($store, page) {

            if ($store.historyIndex[page.id] < 0) {
                var command = $store.historyOriginal[page.id];
            } else {
                var index = $store.historyIndex[page.id];
                var command = $store.histories[page.id][index];
            }

            if (command) {
                var items = command.items,
                    selection = command.selection;

                $store.selection = selection || $store.read('selection/initialize/data');
                $store.dispatch('item/set/all', page.id, $store.read('clone', items));
            }
        }
    }, {
        key: ACTION('history/initialize'),
        value: function value($store) {
            var _this2 = this;

            $store.read('selection/current/page', function (page) {
                _this2.setHistory($store, page);
            });
        }
    }, {
        key: "setHistory",
        value: function setHistory($store, page) {
            if (page && !$store.historyOriginal[page.id]) {
                $store.historyOriginal[page.id] = {
                    items: $store.clone('item/get/all', page.id),
                    selection: $store.selection || $store.read('selection/initialize/data')
                };
                $store.histories[page.id] = [];
                $store.historyIndex[page.id] = 0;
            }
        }
    }, {
        key: ACTION('history/push'),
        value: function value($store, title) {
            var _this3 = this;

            $store.read('selection/current/page', function (page) {

                _this3.setHistory($store, page);

                var index = $store.historyIndex[page.id];
                if (index < 0) index = -1;
                var histories = index < 0 ? [] : $store.histories[page.id].slice(0, index + 1);

                histories.push({
                    title: title,
                    items: $store.clone('item/get/all', page.id),
                    selection: $store.selection || $store.read('selection/initialize/data')
                });

                $store.histories[page.id] = histories;

                if ($store.histories[page.id].length > HISTORY_MAX) {
                    $store.histories[page.id].shift();
                }

                $store.historyIndex[page.id] = $store.histories[page.id].length - 1;
            });
        }
    }, {
        key: ACTION('history/undo'),
        value: function value($store) {
            var _this4 = this;

            $store.read('selection/current/page', function (page) {

                if ($store.historyIndex[page.id] < 0) {
                    return;
                }

                $store.historyIndex[page.id]--;
                _this4.changeHistory($store, page);
            });
        }
    }, {
        key: ACTION('history/redo'),
        value: function value($store) {
            var _this5 = this;

            $store.read('selection/current/page', function (page) {
                if ($store.historyIndex[page.id] > $store.histories[page.id].length - 1) {
                    return;
                }

                $store.historyIndex[page.id]++;
                _this5.changeHistory($store, page);
            });
        }
    }]);
    return HistoryManager;
}(BaseModule);

var OrderingManager = function (_BaseModule) {
    inherits(OrderingManager, _BaseModule);

    function OrderingManager() {
        classCallCheck(this, OrderingManager);
        return possibleConstructorReturn(this, (OrderingManager.__proto__ || Object.getPrototypeOf(OrderingManager)).apply(this, arguments));
    }

    createClass(OrderingManager, [{
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit(CHANGE_EDITOR);
        }
    }, {
        key: "horizontal",
        value: function horizontal($store) {
            var items = $store.read('selection/unit/values');

            var x = Number.MAX_SAFE_INTEGER;
            var xItem = null;

            var x2 = Number.MIN_SAFE_INTEGER;
            var x2Item = null;

            items.forEach(function (item) {

                if (x > item.x) {
                    x = item.x;
                    xItem = item;
                } else if (x2 < item.x2) {
                    x2 = item.x2;
                    x2Item = item;
                }
            });

            var count = items.length - 2;
            var tempIds = [xItem.id, x2Item.id];

            if (count > 0) {
                var restItems = items.filter(function (it) {
                    return !tempIds.includes(it.id);
                });

                restItems.sort(function (a, b) {
                    if (a.centerX == b.centerX) return 0;
                    return a.centerX > b.centerX ? 1 : -1;
                });

                var startX = xItem.centerX;
                var endX = x2Item.centerX;
                var unitWidth = (endX - startX) / (count + 1);

                restItems.forEach(function (item, index) {
                    item.centerX = startX + (index + 1) * unitWidth;
                    item.x = item.centerX - item.width / 2;

                    $store.run('item/set', { id: item.id, x: pxUnit(item.x) });
                });
            }
        }
    }, {
        key: "vertical",
        value: function vertical($store) {
            var items = $store.read('selection/unit/values');

            var y = Number.MAX_SAFE_INTEGER;
            var yItem = null;

            var y2 = Number.MIN_SAFE_INTEGER;
            var y2Item = null;

            items.forEach(function (item) {

                if (y > item.y) {
                    y = item.y;
                    yItem = item;
                } else if (y2 < item.y2) {
                    y2 = item.y2;
                    y2Item = item;
                }
            });

            var count = items.length - 2;
            var tempIds = [yItem.id, y2Item.id];

            if (count > 0) {
                var restItems = items.filter(function (it) {
                    return !tempIds.includes(it.id);
                });

                restItems.sort(function (a, b) {
                    if (a.centerY == b.centerY) return 0;
                    return a.centerY > b.centerY ? 1 : -1;
                });

                var startY = yItem.centerY;
                var endY = y2Item.centerY;
                var unitHeight = (endY - startY) / (count + 1);

                restItems.forEach(function (item, index) {
                    item.centerY = startY + (index + 1) * unitHeight;
                    item.y = item.centerY - item.height / 2;

                    $store.run('item/set', { id: item.id, y: pxUnit(item.y) });
                });
            }
        }
    }, {
        key: "left",
        value: function left($store) {
            var items = $store.read('selection/current');
            var x = Math.min.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.x);
            })));

            items.forEach(function (item) {
                $store.run('item/set', { id: item.id, x: pxUnit(x) });
            });
        }
    }, {
        key: "center",
        value: function center($store) {
            var items = $store.read('selection/current');

            var x = Math.min.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.x);
            })));

            var x2 = Math.max.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.x) + unitValue(item.width);
            })));

            var centerX = x + Math.floor((x2 - x) / 2);

            items.forEach(function (item) {
                var newX = pxUnit(Math.floor(centerX - unitValue(item.width) / 2));
                $store.run('item/set', { id: item.id, x: newX });
            });
        }
    }, {
        key: "right",
        value: function right($store) {
            var items = $store.read('selection/current');

            var x2 = Math.max.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.x) + unitValue(item.width);
            })));

            items.forEach(function (item) {
                var newX = pxUnit(x2 - unitValue(item.width));
                $store.run('item/set', { id: item.id, x: newX });
            });
        }
    }, {
        key: "top",
        value: function top($store) {
            var items = $store.read('selection/current');
            var y = Math.min.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.y);
            })));

            items.forEach(function (item) {
                $store.run('item/set', { id: item.id, y: pxUnit(y) });
            });
        }
    }, {
        key: "middle",
        value: function middle($store) {
            var items = $store.read('selection/current');

            var y = Math.min.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.y);
            })));

            var y2 = Math.max.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.y) + unitValue(item.height);
            })));

            var centerY = y + (y2 - y) / 2;

            items.forEach(function (item) {
                var newY = pxUnit(Math.floor(centerY - unitValue(item.height) / 2));
                $store.run('item/set', { id: item.id, y: newY });
            });
        }
    }, {
        key: "bottom",
        value: function bottom($store) {
            var items = $store.read('selection/current');

            var y2 = Math.max.apply(Math, toConsumableArray(items.map(function (item) {
                return unitValue(item.y) + unitValue(item.height);
            })));

            items.forEach(function (item) {
                var newY = pxUnit(y2 - unitValue(item.height));
                $store.run('item/set', { id: item.id, y: newY });
            });
        }
    }, {
        key: '/ordering/type',
        value: function orderingType($store, type) {
            if (this[type]) {
                this[type].call(this, $store);
            }
        }
    }, {
        key: "forward",
        value: function forward($store) {
            $store.read('selection/current/layer/id', function (id) {
                $store.run('item/move/next', id);
            });
        }
    }, {
        key: "backward",
        value: function backward($store) {
            $store.read('selection/current/layer/id', function (id) {
                $store.run('item/move/prev', id);
            });
        }
    }, {
        key: "front",
        value: function front($store) {
            $store.read('selection/current/layer/id', function (id) {
                $store.run('item/move/last', id);
            });
        }
    }, {
        key: "back",
        value: function back($store) {
            $store.read('selection/current/layer/id', function (id) {
                $store.run('item/move/first', id);
            });
        }
    }, {
        key: ACTION('ordering/index'),
        value: function value$$1($store, type) {
            if (this[type]) {
                this[type].call(this, $store);
            }
        }
    }]);
    return OrderingManager;
}(BaseModule);

var MatrixManager = function (_BaseModule) {
    inherits(MatrixManager, _BaseModule);

    function MatrixManager() {
        classCallCheck(this, MatrixManager);
        return possibleConstructorReturn(this, (MatrixManager.__proto__ || Object.getPrototypeOf(MatrixManager)).apply(this, arguments));
    }

    createClass(MatrixManager, [{
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit(CHANGE_LAYER_POSITION);
        }
    }, {
        key: ACTION('matrix/move'),
        value: function value$$1($store, newValue) {
            var item = $store.read('item/get', newValue.id);

            Object.keys(newValue).filter(function (key) {
                return key != 'id';
            }).forEach(function (key) {
                item[key] = pxUnit(unitValue(item[key]) + newValue[key]);
            });

            $store.run('item/set', item);
        }
    }]);
    return MatrixManager;
}(BaseModule);

var BoxShadowManager = function (_BaseModule) {
    inherits(BoxShadowManager, _BaseModule);

    function BoxShadowManager() {
        classCallCheck(this, BoxShadowManager);
        return possibleConstructorReturn(this, (BoxShadowManager.__proto__ || Object.getPrototypeOf(BoxShadowManager)).apply(this, arguments));
    }

    createClass(BoxShadowManager, [{
        key: GETTER('boxshadow/toCSS'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var isExport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            var results = {};
            var boxshadow = $store.read('boxshadow/toBoxShadowString', item, isExport);

            if (boxshadow) {
                results['box-shadow'] = boxshadow;
            }

            return results;
        }
    }, {
        key: GETTER('boxshadow/cache/toCSS'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            var results = {};
            var boxshadow = $store.read('boxshadow/toBoxShadowString', item, isExport);

            if (boxshadow) {
                results['box-shadow'] = boxshadow;
            }

            return results;
        }
    }, {
        key: GETTER('boxshadow/toString'),
        value: function value$$1($store) {
            var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            var obj = $store.read('boxshadow/toCSS', image);

            return Object.keys(obj).map(function (key) {
                return key + ": " + obj[key] + ";";
            }).join(' ');
        }
    }, {
        key: GETTER('boxshadow/toBoxShadowString'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;


            if (!item) return '';

            var results = [''];

            if (item.inset) {
                results.push('inset');
            }

            results.push(stringUnit(item.offsetX), stringUnit(item.offsetY), stringUnit(item.blurRadius), stringUnit(item.spreadRadius), item.color);

            return results.join(' ');
        }
    }]);
    return BoxShadowManager;
}(BaseModule);

var TextShadowManager = function (_BaseModule) {
    inherits(TextShadowManager, _BaseModule);

    function TextShadowManager() {
        classCallCheck(this, TextShadowManager);
        return possibleConstructorReturn(this, (TextShadowManager.__proto__ || Object.getPrototypeOf(TextShadowManager)).apply(this, arguments));
    }

    createClass(TextShadowManager, [{
        key: GETTER('textshadow/toCSS'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var isExport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            var results = {};
            var textshadow = $store.read('textshadow/toTextShadowString', item, isExport);

            if (textshadow) {
                results['text-shadow'] = textshadow;
            }

            return results;
        }
    }, {
        key: GETTER('textshadow/cache/toCSS'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            var results = {};
            var textshadow = $store.read('textshadow/toTextShadowString', item, isExport);

            if (textshadow) {
                results['text-shadow'] = textshadow;
            }

            return results;
        }
    }, {
        key: GETTER('textshadow/toString'),
        value: function value$$1($store) {
            var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            var obj = $store.read('textshadow/toCSS', image);

            return Object.keys(obj).map(function (key) {
                return key + ": " + obj[key] + ";";
            }).join(' ');
        }
    }, {
        key: GETTER('textshadow/toTextShadowString'),
        value: function value$$1($store) {
            var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;


            if (!item) return '';

            var results = [];

            results.push(stringUnit(item.offsetX), stringUnit(item.offsetY), stringUnit(item.blurRadius), item.color);

            return results.join(' ');
        }
    }]);
    return TextShadowManager;
}(BaseModule);

var filterInfo = {
    'filterBlur': { func: 'blur', title: 'Blur', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PX, defaultValue: 0 },
    'filterGrayscale': { func: 'grayscale', title: 'Grayscale', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
    'filterHueRotate': { func: 'hue-rotate', title: 'Hue', type: 'range', min: 0, max: 360, step: 1, unit: 'deg', defaultValue: 0 },
    'filterInvert': { func: 'invert', title: 'Invert', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
    'filterBrightness': { func: 'brightness', title: 'Brightness', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterContrast': { func: 'contrast', title: 'Contrast', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterDropshadow': { func: 'drop-shadow', type: 'multi', title: 'Drop Shadow' },
    'filterDropshadowOffsetX': { title: 'Offset X', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'filterDropshadowOffsetY': { title: 'Offset Y', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'filterDropshadowBlurRadius': { title: 'Blur Radius', type: 'range', min: 0, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'filterDropshadowColor': { title: 'Color', type: 'color', defaultValue: 'black', unit: UNIT_COLOR },
    'filterOpacity': { func: 'opacity', title: 'Opacity', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterSaturate': { func: 'saturate', title: 'Saturate', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterSepia': { func: 'sepia', title: 'Sepia', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 }
};

var DROP_SHADOW_LIST = ['filterDropshadowOffsetX', 'filterDropshadowOffsetY', 'filterDropshadowBlurRadius', 'filterDropshadowColor'];

var FilterManager = function (_BaseModule) {
    inherits(FilterManager, _BaseModule);

    function FilterManager() {
        classCallCheck(this, FilterManager);
        return possibleConstructorReturn(this, (FilterManager.__proto__ || Object.getPrototypeOf(FilterManager)).apply(this, arguments));
    }

    createClass(FilterManager, [{
        key: GETTER('filter/get'),
        value: function value$$1($store, id) {
            return filterInfo[id];
        }
    }, {
        key: GETTER('filter/list'),
        value: function value$$1($store, layerId) {
            var layer = $store.read('item/get', layerId);
            var realFilters = {};

            FILTER_DEFAULT_OBJECT_KEYS.filter(function (key) {
                return layer[key];
            }).forEach(function (key) {
                realFilters[key] = layer[key];
            });

            realFilters = Object.assign({}, $store.read('clone', FILTER_DEFAULT_OBJECT), realFilters);

            var filterList = FILTER_DEFAULT_OBJECT_KEYS.map(function (key) {
                return _extends({ key: key }, realFilters[key]);
            });

            filterList.sort(function (a, b) {
                return a.index > b.index ? 1 : -1;
            });

            return filterList.map(function (it) {
                return it.key;
            });
        }
    }, {
        key: GETTER('filter/toCSS'),
        value: function value$$1($store, layer) {
            var realFilters = {};

            FILTER_DEFAULT_OBJECT_KEYS.filter(function (key) {
                return layer[key];
            }).forEach(function (key) {
                realFilters[key] = layer[key];
            });

            realFilters = Object.assign({}, $store.read('clone', FILTER_DEFAULT_OBJECT), realFilters);

            var filterList = FILTER_DEFAULT_OBJECT_KEYS.map(function (key) {
                return _extends({ key: key }, realFilters[key]);
            });

            filterList.sort(function (a, b) {
                return a.index > b.index ? 1 : -1;
            });

            var filterString = filterList.filter(function (it) {
                return it.checked;
            }).map(function (it) {
                var viewObject = filterInfo[it.key];
                if (it.key == 'filterDropshadow') {

                    var values = DROP_SHADOW_LIST.map(function (key) {
                        return stringUnit(layer[key] || FILTER_DEFAULT_OBJECT[key]);
                    }).join(' ');

                    return viewObject.func + "(" + values + ")";
                } else {
                    var values = stringUnit(it);
                    return viewObject.func + "(" + values + ")";
                }
            }).join(' ');

            return {
                filter: filterString
            };
        }
    }]);
    return FilterManager;
}(BaseModule);

var backdropInfo = {
    'backdropBlur': { func: 'blur', title: 'Blur', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PX, defaultValue: 0 },
    'backdropGrayscale': { func: 'grayscale', title: 'Grayscale', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
    'backdropHueRotate': { func: 'hue-rotate', title: 'Hue', type: 'range', min: 0, max: 360, step: 1, unit: 'deg', defaultValue: 0 },
    'backdropInvert': { func: 'invert', title: 'Invert', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
    'backdropBrightness': { func: 'brightness', title: 'Brightness', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropContrast': { func: 'contrast', title: 'Contrast', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropDropshadow': { func: 'drop-shadow', type: 'multi', title: 'Drop Shadow' },
    'backdropDropshadowOffsetX': { title: 'Offset X', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'backdropDropshadowOffsetY': { title: 'Offset Y', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'backdropDropshadowBlurRadius': { title: 'Blur Radius', type: 'range', min: 0, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'backdropDropshadowColor': { title: 'Color', type: 'color', defaultValue: 'black', unit: UNIT_COLOR },
    'backdropOpacity': { func: 'opacity', title: 'Opacity', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropSaturate': { func: 'saturate', title: 'Saturate', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropSepia': { func: 'sepia', title: 'Sepia', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 }
};

var DROP_SHADOW_LIST$1 = ['backdropDropshadowOffsetX', 'backdropDropshadowOffsetY', 'backdropDropshadowBlurRadius', 'backdropDropshadowColor'];

var BackdropManager = function (_BaseModule) {
    inherits(BackdropManager, _BaseModule);

    function BackdropManager() {
        classCallCheck(this, BackdropManager);
        return possibleConstructorReturn(this, (BackdropManager.__proto__ || Object.getPrototypeOf(BackdropManager)).apply(this, arguments));
    }

    createClass(BackdropManager, [{
        key: GETTER('backdrop/get'),
        value: function value$$1($store, id) {
            return backdropInfo[id];
        }
    }, {
        key: GETTER('backdrop/list'),
        value: function value$$1($store, layerId) {
            var layer = $store.read('item/get', layerId);
            var realFilters = {};

            BACKDROP_DEFAULT_OBJECT_KEYS.filter(function (key) {
                return layer[key];
            }).forEach(function (key) {
                realFilters[key] = layer[key];
            });

            realFilters = Object.assign({}, $store.read('clone', BACKDROP_DEFAULT_OBJECT), realFilters);

            var filterList = BACKDROP_DEFAULT_OBJECT_KEYS.map(function (key) {
                return _extends({ key: key }, realFilters[key]);
            });

            filterList.sort(function (a, b) {
                return a.index > b.index ? 1 : -1;
            });

            return filterList.map(function (it) {
                return it.key;
            });
        }
    }, {
        key: GETTER('backdrop/toCSS'),
        value: function value$$1($store, layer) {
            var realFilters = {};

            BACKDROP_DEFAULT_OBJECT_KEYS.filter(function (key) {
                return layer[key];
            }).forEach(function (key) {
                realFilters[key] = layer[key];
            });

            realFilters = Object.assign({}, $store.read('clone', BACKDROP_DEFAULT_OBJECT), realFilters);

            var filterList = BACKDROP_DEFAULT_OBJECT_KEYS.map(function (key) {
                return _extends({ key: key }, realFilters[key]);
            });

            filterList.sort(function (a, b) {
                return a.index > b.index ? 1 : -1;
            });

            var filterString = filterList.filter(function (it) {
                return it.checked;
            }).map(function (it) {
                var viewObject = backdropInfo[it.key];
                if (it.key == 'backdropDropshadow') {

                    var values = DROP_SHADOW_LIST$1.map(function (key) {
                        var value$$1 = layer[key] || BACKDROP_DEFAULT_OBJECT[key];

                        return unit(value$$1.value, value$$1.unit, true);
                    }).join(' ');

                    return viewObject.func + "(" + values + ")";
                } else {
                    var values = unit(it.value, it.unit, true);
                    return viewObject.func + "(" + values + ")";
                }
            }).join(' ');

            return {
                'backdrop-filter': filterString,
                '-webkit-backdrop-filter': filterString
            };
        }
    }]);
    return BackdropManager;
}(BaseModule);

var en_US = {
    'app.title': 'EASYLOGIC',
    'app.counting': '{index}'
};

var ko_KR = {
    'app.title': '이지로직'
};

var langs = {
    en_US: en_US,
    ko_KR: ko_KR
};

var LANG_EN = 'en_US';

var FALLBACK_LANG = LANG_EN;

var i18n = {
    get: function get(key) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : FALLBACK_LANG;

        var str = langs[lang][key] || langs[FALLBACK_LANG][key] || undefined;

        Object.keys(params).forEach(function (key) {
            str = str.replace(new RegExp('{' + key + '}', 'ig'), params[key]);
        });

        return str;
    }
};

var I18nManager = function (_BaseModule) {
    inherits(I18nManager, _BaseModule);

    function I18nManager() {
        classCallCheck(this, I18nManager);
        return possibleConstructorReturn(this, (I18nManager.__proto__ || Object.getPrototypeOf(I18nManager)).apply(this, arguments));
    }

    createClass(I18nManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(I18nManager.prototype.__proto__ || Object.getPrototypeOf(I18nManager.prototype), "initialize", this).call(this);

            this.$store.lang = LANG_EN;
        }
    }, {
        key: "afterDispatch",
        value: function afterDispatch() {
            this.emit('changeEditor');
        }
    }, {
        key: ACTION('i18n/change/language'),
        value: function value($store) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LANG_EN;

            $store.lang = lang;
        }
    }, {
        key: GETTER('i18n/get'),
        value: function value($store, key) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var lang = arguments[3];

            return i18n.get(key, params, lang || $store.lang);
        }
    }]);
    return I18nManager;
}(BaseModule);

var triangle = {
    clipPathPolygonPoints: [{ x: percentUnit(50), y: percentUnit(0) }, { x: percentUnit(0), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(100) }]
};

var trapezoid = {
    clipPathPolygonPoints: [{ x: percentUnit(20), y: percentUnit(0) }, { x: percentUnit(0), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(100) }, { x: percentUnit(80), y: percentUnit(0) }]
};

var parallelogram = {
    clipPathPolygonPoints: [{ x: percentUnit(20), y: percentUnit(0) }, { x: percentUnit(0), y: percentUnit(100) }, { x: percentUnit(80), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(0) }]
};

var rhombus = {
    clipPathPolygonPoints: [{ x: percentUnit(50), y: percentUnit(0) }, { x: percentUnit(0), y: percentUnit(50) }, { x: percentUnit(50), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(50) }]
};

var pentagon = {
    clipPathPolygonPoints: [{ x: percentUnit(50), y: percentUnit(0) }, { x: percentUnit(0), y: percentUnit(38) }, { x: percentUnit(18), y: percentUnit(100) }, { x: percentUnit(82), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(38) }]
};

var hexagon = {
    clipPathPolygonPoints: [{ x: percentUnit(50), y: percentUnit(0) }, { x: percentUnit(0), y: percentUnit(25) }, { x: percentUnit(0), y: percentUnit(75) }, { x: percentUnit(50), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(75) }, { x: percentUnit(100), y: percentUnit(25) }]
};

var heptagon = {
    clipPathPolygonPoints: [{ x: percentUnit(50), y: percentUnit(0) }, { x: percentUnit(10), y: percentUnit(20) }, { x: percentUnit(0), y: percentUnit(60) }, { x: percentUnit(25), y: percentUnit(100) }, { x: percentUnit(75), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(60) }, { x: percentUnit(90), y: percentUnit(20) }]
};

var octagon = {
    clipPathPolygonPoints: [{ x: percentUnit(30), y: percentUnit(0) }, { x: percentUnit(0), y: percentUnit(30) }, { x: percentUnit(0), y: percentUnit(70) }, { x: percentUnit(30), y: percentUnit(100) }, { x: percentUnit(70), y: percentUnit(100) }, { x: percentUnit(100), y: percentUnit(70) }, { x: percentUnit(100), y: percentUnit(30) }, { x: percentUnit(70), y: percentUnit(0) }]
};

var nonagon = {
    clipPathPolygonPoints: [{ x: percentUnit(50), y: percentUnit(0) }, { x: percentUnit(17), y: percentUnit(12) }, { x: percentUnit(0), y: percentUnit(43) }, { x: percentUnit(6), y: percentUnit(78) }, { x: percentUnit(32), y: percentUnit(100) }, { x: percentUnit(68), y: percentUnit(100) }, { x: percentUnit(94), y: percentUnit(78) }, { x: percentUnit(100), y: percentUnit(43) }, { x: percentUnit(83), y: percentUnit(12) }]
};

var decagon = {
    clipPathPolygonPoints: [{ x: percentUnit(50), y: percentUnit(0) }, { x: percentUnit(20), y: percentUnit(10) }, { x: percentUnit(0), y: percentUnit(35) }, { x: percentUnit(0), y: percentUnit(70) }, { x: percentUnit(20), y: percentUnit(90) }, { x: percentUnit(50), y: percentUnit(100) }, { x: percentUnit(80), y: percentUnit(90) }, { x: percentUnit(100), y: percentUnit(70) }, { x: percentUnit(100), y: percentUnit(35) }, { x: percentUnit(80), y: percentUnit(10) }]
};

var clipPathList = [triangle, trapezoid, parallelogram, rhombus, pentagon, hexagon, heptagon, octagon, nonagon, decagon];

var SQRT_2 = Math.sqrt(2);

var ClipPathManager = function (_BaseModule) {
    inherits(ClipPathManager, _BaseModule);

    function ClipPathManager() {
        classCallCheck(this, ClipPathManager);
        return possibleConstructorReturn(this, (ClipPathManager.__proto__ || Object.getPrototypeOf(ClipPathManager)).apply(this, arguments));
    }

    createClass(ClipPathManager, [{
        key: GETTER('clip-path/sample/list'),
        value: function value$$1($store) {
            return clipPathList;
        }
    }, {
        key: GETTER('clip-path/sample/get'),
        value: function value$$1($store, index) {
            return clipPathList[index];
        }
    }, {
        key: "caculateClosestFromCenter",
        value: function caculateClosestFromCenter(centerX, centerY, width, height) {
            var list = [[centerX, 0], [centerX, height], [0, centerY], [width, centerY]];

            return Math.min.apply(Math, toConsumableArray(list.map(function (it) {
                var x = Math.pow(Math.abs(centerX - it[0]), 2);
                var y = Math.pow(Math.abs(centerY - it[1]), 2);
                return Math.sqrt(x + y) / SQRT_2;
            })));
        }
    }, {
        key: "caculateFarthestFromCenter",
        value: function caculateFarthestFromCenter(centerX, centerY, width, height) {
            var list = [[centerX, 0], [centerX, height], [0, centerY], [width, centerY]];

            return Math.max.apply(Math, toConsumableArray(list.map(function (it) {
                var x = Math.pow(Math.abs(centerX - it[0]), 2);
                var y = Math.pow(Math.abs(centerY - it[1]), 2);
                return Math.sqrt(x + y) / SQRT_2;
            })));
        }
    }, {
        key: GETTER('clip-path/make/circle'),
        value: function value$$1($store, layer) {

            var width = unitValue(layer.width);
            var height = unitValue(layer.height);

            var dist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / Math.sqrt(2);

            var clipPathCenterX = defaultValue(layer.clipPathCenterX, percentUnit(50));
            var clipPathCenterY = defaultValue(layer.clipPathCenterY, percentUnit(50));
            var clipPathRadiusX = defaultValue(layer.clipPathRadiusX, percentUnit(100));
            var clipPathRadiusY = defaultValue(layer.clipPathRadiusY, percentUnit(100));
            var clipPathSideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE);

            var placeCenterX = stringUnit(clipPathCenterX); // centerX 
            var placeCenterY = stringUnit(clipPathCenterY); // centerY

            if (clipPathSideType == CLIP_PATH_SIDE_TYPE_NONE) {
                var radiusSize = Math.sqrt(Math.pow(Math.abs(value2px(clipPathRadiusX, width) - value2px(clipPathCenterX, width)), 2) + Math.pow(Math.abs(value2px(clipPathRadiusY, height) - value2px(clipPathCenterY, height)), 2));
                var radiusString = percent(Math.floor(radiusSize / dist * 100));
            } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_CLOSEST) {
                var radiusString = CLIP_PATH_SIDE_TYPE_CLOSEST;
            } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_FARTHEST) {
                var radiusString = CLIP_PATH_SIDE_TYPE_FARTHEST;
            }
            return "circle(" + radiusString + " at " + placeCenterX + " " + placeCenterY + ")";
        }
    }, {
        key: GETTER('clip-path/make/ellipse'),
        value: function value$$1($store, layer) {
            var width = unitValue(layer.width);
            var height = unitValue(layer.height);

            var clipPathCenterX = defaultValue(layer.clipPathCenterX, percentUnit(50));
            var clipPathCenterY = defaultValue(layer.clipPathCenterY, percentUnit(50));
            var clipPathRadiusX = defaultValue(layer.clipPathRadiusX, percentUnit(100));
            var clipPathRadiusY = defaultValue(layer.clipPathRadiusY, percentUnit(100));
            var clipPathSideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE);

            var placeCenterX = stringUnit(clipPathCenterX); // centerX 
            var placeCenterY = stringUnit(clipPathCenterY); // centerY

            var dist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / Math.sqrt(2);

            if (clipPathSideType == CLIP_PATH_SIDE_TYPE_NONE) {
                var radiusSizeX = Math.abs(value2px(clipPathRadiusX, width) - value2px(clipPathCenterX, width));

                var radiusPercentX = stringUnit(percentUnit(Math.floor(radiusSizeX / dist * 100)));

                var radiusSizeY = Math.abs(value2px(clipPathRadiusY, height) - value2px(clipPathCenterY, height));
                var radiusPercentY = stringUnit(percentUnit(Math.floor(radiusSizeY / dist * 100)));

                var radiusString = radiusPercentX + " " + radiusPercentY;
            } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_CLOSEST) {
                var radiusString = CLIP_PATH_SIDE_TYPE_CLOSEST;
            } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_FARTHEST) {
                var radiusString = CLIP_PATH_SIDE_TYPE_FARTHEST;
            }

            return "ellipse(" + radiusString + " at " + placeCenterX + " " + placeCenterY + ")";
        }
    }, {
        key: GETTER('clip-path/make/inset'),
        value: function value$$1($store, layer) {

            var clipPathInsetTop = defaultValue(layer.clipPathInsetTop, percentUnit(0));
            var clipPathInsetLeft = defaultValue(layer.clipPathInsetLeft, percentUnit(0));
            var clipPathInsetRight = defaultValue(layer.clipPathInsetRight, percentUnit(0));
            var clipPathInsetBottom = defaultValue(layer.clipPathInsetBottom, percentUnit(0));

            var top = stringUnit(clipPathInsetTop);
            var left = stringUnit(clipPathInsetLeft);
            var right = stringUnit(clipPathInsetRight);
            var bottom = stringUnit(clipPathInsetBottom);

            var insetString = top + " " + right + " " + bottom + " " + left;

            return "inset(" + insetString + ")";
        }
    }, {
        key: GETTER('clip-path/make/polygon'),
        value: function value$$1($store, layer) {

            var clipPathPolygonFillRule = layer.clipPathPolygonFillRule || '';

            var fillRule = '';
            if (clipPathPolygonFillRule != '') {
                fillRule = clipPathPolygonFillRule + ',';
            }

            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);

            var polygonString = clipPathPolygonPoints.map(function (it) {
                return stringUnit(it.x) + " " + stringUnit(it.y);
            }).join(', ');

            return "polygon(" + fillRule + " " + polygonString + ")";
        }
    }, {
        key: GETTER('clip-path/make/svg'),
        value: function value$$1($store, layer) {
            if (layer.clipPathSvg) {
                return "url(#clippath-" + layer.id + ")";
            }
        }
    }, {
        key: GETTER('clip-path/toCSS'),
        value: function value$$1($store, layer) {
            var clipPath = null;
            if (layer.clipPathType == CLIP_PATH_TYPE_NONE) {
                clipPath = CLIP_PATH_TYPE_NONE;
            } else if (layer.clipPathType == CLIP_PATH_TYPE_CIRCLE) {
                clipPath = $store.read('clip-path/make/circle', layer);
            } else if (layer.clipPathType == CLIP_PATH_TYPE_ELLIPSE) {
                clipPath = $store.read('clip-path/make/ellipse', layer);
            } else if (layer.clipPathType == CLIP_PATH_TYPE_INSET) {
                clipPath = $store.read('clip-path/make/inset', layer);
            } else if (layer.clipPathType == CLIP_PATH_TYPE_POLYGON) {
                clipPath = $store.read('clip-path/make/polygon', layer);
            } else if (layer.clipPathType == CLIP_PATH_TYPE_SVG) {
                clipPath = $store.read('clip-path/make/svg', layer);
            }

            // console.log(layer.clipPathType, clipPath);

            return {
                'clip-path': clipPath
            };
        }
    }]);
    return ClipPathManager;
}(BaseModule);

var gradientTypeList = [IMAGE_ITEM_TYPE_LINEAR, IMAGE_ITEM_TYPE_RADIAL, IMAGE_ITEM_TYPE_CONIC];
var repeatingGradientTypeList = [IMAGE_ITEM_TYPE_REPEATING_LINEAR, IMAGE_ITEM_TYPE_REPEATING_RADIAL, IMAGE_ITEM_TYPE_REPEATING_CONIC];
var conicList = [IMAGE_ITEM_TYPE_CONIC, IMAGE_ITEM_TYPE_REPEATING_CONIC];

var ItemCreateManager = function (_BaseModule) {
    inherits(ItemCreateManager, _BaseModule);

    function ItemCreateManager() {
        classCallCheck(this, ItemCreateManager);
        return possibleConstructorReturn(this, (ItemCreateManager.__proto__ || Object.getPrototypeOf(ItemCreateManager)).apply(this, arguments));
    }

    createClass(ItemCreateManager, [{
        key: "initialize",
        value: function initialize() {
            get$1(ItemCreateManager.prototype.__proto__ || Object.getPrototypeOf(ItemCreateManager.prototype), "initialize", this).call(this);

            this.$store.items = {};
            this.$store.itemKeys = [];
        }
    }, {
        key: "afterDispatch",
        value: function afterDispatch() {
            this.$store.emit(CHANGE_EDITOR);
        }
    }, {
        key: GETTER('item/keys'),
        value: function value$$1($store) {
            return $store.itemKeys;
        }
    }, {
        key: ACTION('item/keys/generate'),
        value: function value$$1($store) {
            $store.itemKeys = Object.keys($store.items);
        }
    }, {
        key: ACTION('/item/initialize'),
        value: function value$$1($store, id) {
            delete $store.items[id];

            $store.run('item/keys/generate');
        }
    }, {
        key: GETTER('item/create/object'),
        value: function value$$1($store, obj) {
            var defaultObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            obj = Object.assign({}, $store.read('clone', defaultObj), obj);
            obj.id = Date.now() + '-' + uuid();

            $store.items[obj.id] = obj;

            $store.run('item/keys/generate');

            return obj.id;
        }
    }, {
        key: GETTER('item/create/page'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, PAGE_DEFAULT_OBJECT);
        }
    }, {
        key: GETTER('item/create/layer'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, LAYER_DEFAULT_OBJECT);
        }
    }, {
        key: GETTER('item/create/circle'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, CIRCLE_DEFAULT_OBJECT);
        }
    }, {
        key: GETTER('item/create/group'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, GROUP_DEFAULT_OBJECT);
        }
    }, {
        key: GETTER('item/create/boxshadow'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, BOXSHADOW_DEFAULT_OBJECT);
        }
    }, {
        key: GETTER('item/create/textshadow'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, TEXTSHADOW_DEFAULT_OBJECT);
        }
    }, {
        key: GETTER('item/create/backdrop-filter'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, BACKDROPFILTER_DEFAULT_OBJECT);
        }
    }, {
        key: GETTER('item/create/image'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            var imageId = $store.read('item/create/object', obj, IMAGE_DEFAULT_OBJECT);

            if (obj.type == IMAGE_ITEM_TYPE_STATIC) {} else if (obj.type == IMAGE_ITEM_TYPE_IMAGE) {} else if (gradientTypeList.includes(obj.type)) {

                if (conicList.includes(obj.type)) {
                    $store.items[imageId].angle = 0;
                }

                $store.read('item/create/colorstep', { parentId: imageId, color: 'rgba(216,216,216, 0)', percent: 0, index: 0 });
                $store.read('item/create/colorstep', { parentId: imageId, color: 'rgba(216,216,216, 1)', percent: 100, index: 100 });
            } else if (repeatingGradientTypeList.includes(obj.type)) {
                if (conicList.includes(obj.type)) {
                    $store.items[imageId].angle = 0;
                }

                $store.read('item/create/colorstep', { parentId: imageId, color: 'rgba(216,216,216, 0)', percent: 0, index: 0 });
                $store.read('item/create/colorstep', { parentId: imageId, color: 'rgba(216,216,216, 1)', percent: 10, index: 100 });
            }

            return imageId;
        }
    }, {
        key: GETTER('item/create/colorstep'),
        value: function value$$1($store) {
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $store.read('item/create/object', obj, COLORSTEP_DEFAULT_OBJECT);
        }

        // 객체를 생성하면 id 만 리턴한다. 

    }, {
        key: GETTER('item/create'),
        value: function value$$1($store, itemType) {
            var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return $store.read('item/create/' + itemType, obj);
        }
    }, {
        key: GETTER('item/copy'),
        value: function value$$1($store, id) {
            var copyObject = $store.clone('item/get', id);

            return $store.read('item/create', copyObject.itemType, copyObject);
        }
    }, {
        key: ACTION('item/add'),
        value: function value$$1($store, itemType) {
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var parentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            var id = $store.read('item/create', itemType);
            var item = $store.read('item/get', id);
            item.parentId = parentId;

            item.index = Number.MAX_SAFE_INTEGER;

            $store.run('item/set', item, isSelected);
            $store.run('item/sort', item.id);
        }
    }, {
        key: ACTION('item/prepend/image'),
        value: function value$$1($store, imageType) {
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var parentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            $store.run('item/add/image', imageType, isSelected, parentId, -1);
        }
    }, {
        key: ACTION('item/add/image'),
        value: function value$$1($store, imageType) {
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var parentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
            var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Number.MAX_SAFE_INTEGER;

            var id = $store.read('item/create/image', { type: imageType });
            var item = $store.read('item/get', id);
            item.type = imageType;
            item.parentId = parentId;
            item.index = index;

            $store.run('item/set', item, isSelected);
            $store.run('item/sort', id);
        }
    }, {
        key: ACTION('item/prepend/image/file'),
        value: function value$$1($store, img) {
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var parentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            $store.run('item/add/image/file', img, isSelected, parentId, -1);
        }
    }, {
        key: ACTION('item/add/image/file'),
        value: function value$$1($store, img) {
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var parentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
            var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Number.MAX_SAFE_INTEGER;

            var id = $store.read('item/create/image');
            var item = $store.read('item/get', id);
            item.type = ITEM_TYPE_IMAGE;
            item.parentId = parentId;
            item.index = index;
            item.colors = img.colors;
            item.fileType = img.fileType;
            item.backgroundImage = img.url;
            item.backgroundImageDataURI = img.datauri;
            item.backgroundSizeWidth = percentUnit(100);

            $store.run('item/set', item, isSelected);
            $store.run('item/sort', id);
        }
    }, {
        key: ACTION('item/set/image/file'),
        value: function value$$1($store, id, img) {
            var item = $store.read('item/get', id);
            item.type = ITEM_TYPE_IMAGE;
            item.colors = img.colors;
            item.fileType = img.fileType || 'svg';
            if (img.clipPathSvg) item.clipPathSvg = img.clipPathSvg;
            if (img.clipPathSvgId) item.clipPathSvgId = img.clipPathSvgId;
            item.backgroundImage = img.url;
            item.backgroundImageDataURI = img.datauri;
            item.backgroundSizeWidth = percentUnit(100);

            $store.run('item/set', item);
        }
    }, {
        key: ACTION('item/prepend/image/url'),
        value: function value$$1($store, img) {
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var parentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            $store.run('item/add/image/url', img, isSelected, parentId, -1);
        }
    }, {
        key: ACTION('item/add/image/url'),
        value: function value$$1($store, img) {
            var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var parentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
            var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Number.MAX_SAFE_INTEGER;

            var id = $store.read('item/create/image');
            var item = $store.read('item/get', id);
            item.type = ITEM_TYPE_IMAGE;
            item.parentId = parentId;
            item.index = index;
            item.colors = img.colors;
            item.fileType = img.fileType;
            item.backgroundImage = img.url;
            item.backgroundSizeWidth = percentUnit(100);

            $store.run('item/set', item, isSelected);
            $store.run('item/sort', id);
        }
    }, {
        key: ACTION('item/add/page'),
        value: function value$$1($store) {
            var isSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var pageId = $store.read('item/create', ITEM_TYPE_PAGE);
            var layerId = $store.read('item/create', ITEM_TYPE_LAYER);
            var imageId = $store.read('item/create', ITEM_TYPE_IMAGE);

            // 페이지 생성 
            var page = $store.read('item/get', pageId);
            page.index = Number.MAX_SAFE_INTEGER;
            $store.run('item/set', page);

            // 레이어 생성 
            var layer = $store.read('item/get', layerId);
            layer.parentId = pageId;
            layer.width = page.width;
            layer.height = page.height;
            // layer.style = Object.assign({}, layer.style, page.style)        
            $store.run('item/set', layer);

            // 이미지 생성 
            var image = $store.read('item/get', imageId);
            image.parentId = layerId;
            $store.run('item/set', image, isSelected);

            $store.run('history/initialize');
        }
    }]);
    return ItemCreateManager;
}(BaseModule);

var INDEX_DIST$1 = 100;
var COPY_INDEX_DIST = 1;



var ItemMoveManager = function (_BaseModule) {
    inherits(ItemMoveManager, _BaseModule);

    function ItemMoveManager() {
        classCallCheck(this, ItemMoveManager);
        return possibleConstructorReturn(this, (ItemMoveManager.__proto__ || Object.getPrototypeOf(ItemMoveManager)).apply(this, arguments));
    }

    createClass(ItemMoveManager, [{
        key: ACTION('item/move/to'),
        value: function value($store, sourceId, newItemId) {

            var currentItem = $store.read('item/get', sourceId);

            var newItem = $store.read('item/get', newItemId);
            newItem.index = currentItem.index + COPY_INDEX_DIST;

            $store.run('item/set', newItem, true);
            $store.run('item/sort', newItemId);
        }
    }, {
        key: ACTION('item/move/next'),
        value: function value($store, id) {
            var item = $store.read('item/get', id);
            item.index = $store.read('item/next/index', id);

            $store.run('item/set', item, item.selected);
            $store.run('item/sort', id);
        }
    }, {
        key: ACTION('item/move/last'),
        value: function value($store, id) {
            var item = $store.read('item/get', id);
            item.index = Number.MAX_SAFE_INTEGER;

            $store.run('item/set', item, item.selected);
            $store.run('item/sort', id);
        }
    }, {
        key: ACTION('item/move/first'),
        value: function value($store, id) {
            var item = $store.read('item/get', id);
            item.index = -1 * COPY_INDEX_DIST;

            $store.run('item/set', item, item.selected);
            $store.run('item/sort', id);
        }
    }, {
        key: ACTION('item/move/in'),
        value: function value($store, destId, sourceId) {
            var destItem = $store.read('item/get', destId);
            var sourceItem = $store.read('item/get', sourceId);
            sourceItem.parentId = destItem.parentId;
            sourceItem.index = destItem.index - COPY_INDEX_DIST;

            $store.run('item/set', sourceItem, true);
            $store.run('item/sort', sourceId);
        }
    }, {
        key: ACTION('item/move/in/layer'),
        value: function value($store, destId, sourceId) {
            var destItem = $store.read('item/get', destId); /* layer */
            var sourceItem = $store.read('item/get', sourceId);

            sourceItem.parentId = destItem.id;
            sourceItem.index = Number.MAX_SAFE_INTEGER;

            $store.run('item/set', sourceItem, true);
            $store.run('item/sort', sourceId);
        }
    }, {
        key: ACTION('item/move/prev'),
        value: function value($store, id) {
            var item = $store.read('item/get', id);
            item.index = $store.read('item/prev/index', id);

            $store.run('item/set', item, item.selected);
            $store.run('item/sort', id);
        }
    }, {
        key: GETTER('item/add/index'),
        value: function value($store, id) {
            var dist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INDEX_DIST$1;

            return $store.items[id].index + dist;
        }
    }, {
        key: GETTER('item/next/index'),
        value: function value($store, id) {
            return $store.read('item/add/index', id, INDEX_DIST$1 + COPY_INDEX_DIST);
        }
    }, {
        key: GETTER('item/prev/index'),
        value: function value($store, id) {
            return $store.read('item/add/index', id, -1 * (INDEX_DIST$1 + COPY_INDEX_DIST));
        }
    }]);
    return ItemMoveManager;
}(BaseModule);

var COPY_INDEX_DIST$1 = 1;

var ItemRecoverManager = function (_BaseModule) {
    inherits(ItemRecoverManager, _BaseModule);

    function ItemRecoverManager() {
        classCallCheck(this, ItemRecoverManager);
        return possibleConstructorReturn(this, (ItemRecoverManager.__proto__ || Object.getPrototypeOf(ItemRecoverManager)).apply(this, arguments));
    }

    createClass(ItemRecoverManager, [{
        key: GETTER('item/recover'),
        value: function value($store, item, parentId) {

            if (item.page) {
                return $store.read('item/recover/page', item, parentId);
            } else if (item.layer) {
                return $store.read('item/recover/layer', item, parentId);
            } else if (item.image) {
                return $store.read('item/recover/image', item, parentId);
            } else if (item.boxshadow) {
                return $store.read('item/recover/boxshadow', item, parentId);
            } else if (item.textshadow) {
                return $store.read('item/recover/textshadow', item, parentId);
            }
        }
    }, {
        key: GETTER('item/recover/image'),
        value: function value($store, image, parentId) {
            var newImageId = $store.read('item/create/object', Object.assign({ parentId: parentId }, convertStyle(image.image)));
            image.colorsteps.forEach(function (step) {
                $store.read('item/create/object', Object.assign({}, step, { parentId: newImageId }));
            });

            return newImageId;
        }
    }, {
        key: GETTER('item/recover/boxshadow'),
        value: function value($store, boxshadow, parentId) {
            return $store.read('item/create/object', Object.assign({ parentId: parentId }, boxshadow.boxshadow));
        }
    }, {
        key: GETTER('item/recover/textshadow'),
        value: function value($store, textshadow, parentId) {
            return $store.read('item/create/object', Object.assign({ parentId: parentId }, textshadow.textshadow));
        }
    }, {
        key: GETTER('item/recover/layer'),
        value: function value($store, layer, parentId) {
            var newLayerId = $store.read('item/create/object', Object.assign({ parentId: parentId }, convertStyle(layer.layer)));
            layer.images.forEach(function (image) {
                $store.read('item/recover/image', image, newLayerId);
            });

            layer.boxshadows.forEach(function (boxshadow) {
                $store.read('item/recover/boxshadow', boxshadow, newLayerId);
            });

            layer.textshadows.forEach(function (textshadow) {
                $store.read('item/recover/textshadow', textshadow, newLayerId);
            });

            return newLayerId;
        }
    }, {
        key: GETTER('item/recover/page'),
        value: function value($store, page) {
            var newPageId = $store.read('item/create/object', convertStyle(page.page));
            page.layers.forEach(function (layer) {
                $store.read('item/recover/layer', layer, newPageId);
            });

            return newPageId;
        }
    }, {
        key: ACTION('item/addCache'),
        value: function value($store, item, sourceId) {
            var currentItem = $store.read('item/get', sourceId);
            $store.run('item/move/to', sourceId, $store.read('item/recover', item, currentItem.parentId));
        }
    }, {
        key: ACTION('item/copy/in'),
        value: function value($store, destId, sourceId) {
            var destItem = $store.read('item/get', destId);
            var newImageId = $store.read('item/recover', $store.read('collect/one', sourceId), destItem.parentId);

            var newImageItem = $store.read('item/get', newImageId);
            newImageItem.index = destItem.index - COPY_INDEX_DIST$1;

            $store.run('item/set', sourceItem, true);
            $store.run('item/sort', sourceId);
        }
    }, {
        key: ACTION('item/copy/in/layer'),
        value: function value($store, destId, sourceId) {
            var destItem = $store.read('item/get', destId); /* layer */
            var newImageId = $store.read('item/recover', $store.read('collect/one', sourceId), destItem.parentId);

            var newImageItem = $store.read('item/get', newImageId);
            newImageItem.index = Number.MAX_SAFE_INTEGER;

            $store.run('item/set', newImageItem, true);
            $store.run('item/sort', newImageId);
        }
    }]);
    return ItemRecoverManager;
}(BaseModule);

var DEFAULT_FUNCTION$2 = function DEFAULT_FUNCTION(item) {
    return item;
};

var ItemSearchManager = function (_BaseModule) {
    inherits(ItemSearchManager, _BaseModule);

    function ItemSearchManager() {
        classCallCheck(this, ItemSearchManager);
        return possibleConstructorReturn(this, (ItemSearchManager.__proto__ || Object.getPrototypeOf(ItemSearchManager)).apply(this, arguments));
    }

    createClass(ItemSearchManager, [{
        key: GETTER('item/get/all'),
        value: function value($store, parentId) {
            var items = {};

            $store.read('item/each/children', parentId, function (item) {
                items[item.id] = $store.read('clone', item);

                var children = $store.read('item/get/all', item.id);
                Object.keys(children).forEach(function (key) {
                    items[key] = children[key];
                });
            });

            return items;
        }
    }, {
        key: GETTER('item/list'),
        value: function value($store, filterCallback) {
            var list = $store.itemKeys.filter(filterCallback);

            list.sort(function (aId, bId) {
                return $store.items[aId].index > $store.items[bId].index ? 1 : -1;
            });

            return list;
        }
    }, {
        key: GETTER('item/filter'),
        value: function value($store, filterCallback) {
            return $store.read('item/list', filterCallback);
        }
    }, {
        key: GETTER('item/list/page'),
        value: function value($store) {
            return $store.read('item/list', this.checkOnlyItemTypeCallback($store, 'page'));
        }
    }, {
        key: GETTER('item/map/page'),
        value: function value($store, callback) {
            return $store.read('item/list/page').map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: "checkItemTypeCallback",
        value: function checkItemTypeCallback($store, parentId) {
            var itemType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            return function (id) {
                return $store.items[id].parentId == parentId && $store.items[id].itemType == itemType;
            };
        }
    }, {
        key: "checkOnlyItemTypeCallback",
        value: function checkOnlyItemTypeCallback($store, itemType) {
            return function (id) {
                return $store.items[id].itemType == itemType;
            };
        }
    }, {
        key: "checkParentItemCallback",
        value: function checkParentItemCallback($store, parentId) {
            return function (id) {
                return $store.items[id].parentId == parentId;
            };
        }
    }, {
        key: GETTER('item/list/children'),
        value: function value($store, parentId, itemType) {
            if (isUndefined(itemType)) {
                return $store.read('item/list', this.checkParentItemCallback($store, parentId));
            } else {
                return $store.read('item/list', this.checkItemTypeCallback($store, parentId, itemType));
            }
        }
    }, {
        key: GETTER('item/count/children'),
        value: function value($store, parentId) {
            return $store.read('item/list', this.checkParentItemCallback($store, parentId)).length;
        }
    }, {
        key: GETTER('item/map/children'),
        value: function value($store, parentId) {
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FUNCTION$2;

            return $store.read('item/list', this.checkParentItemCallback($store, parentId)).map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/map/type/children'),
        value: function value($store, parentId, itemType) {
            var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_FUNCTION$2;

            return $store.read('item/list', this.checkItemTypeCallback($store, parentId, itemType)).map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/map/layer/children'),
        value: function value($store, parentId) {
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FUNCTION$2;

            return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_LAYER)).map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/map/image/children'),
        value: function value($store, parentId) {
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FUNCTION$2;

            return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_IMAGE)).map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/map/colorstep/children'),
        value: function value($store, parentId) {
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FUNCTION$2;

            return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_COLORSTEP)).map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/map/boxshadow/children'),
        value: function value($store, parentId) {
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FUNCTION$2;

            return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_BOXSHADOW)).map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/map/textshadow/children'),
        value: function value($store, parentId) {
            var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FUNCTION$2;

            return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_TEXTSHADOW$1)).map(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/filter/children'),
        value: function value($store, parentId, callback) {
            return $store.read('item/list/children', parentId).filter(function (id, index) {
                return callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/each/children'),
        value: function value($store, parentId, callback) {
            return $store.read('item/list/children', parentId).forEach(function (id, index) {
                callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/each/type/children'),
        value: function value($store, parentId, itemType, callback) {
            return $store.read('item/list/children', parentId, itemType).forEach(function (id, index) {
                callback($store.items[id], index);
            });
        }
    }, {
        key: GETTER('item/traverse'),
        value: function value($store, parentId) {
            var list = $store.read('item/list/children', parentId);

            list.sort(function (a, b) {
                var $a = $store.items[a];
                var $b = $store.items[b];

                if ($a.order == $b.order) {

                    if (a > b) return 1;
                    if (a < b) return -1;

                    return 0;
                }
                return $a.order > $b.order ? 1 : -1;
            });

            return list.map(function (childId) {
                return { id: childId, children: $store.read('item/traverse', childId) };
            });
        }
    }, {
        key: GETTER('item/tree'),
        value: function value($store) {
            return $store.read('item/traverse', '');
        }
    }, {
        key: GETTER('item/tree/normalize'),
        value: function value($store) {
            var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var results = [];

            var list = root != null ? $store.read('item/tree') : children;
            list.forEach(function (item) {
                results.push({ id: item.id, depth: depth });
                results.push.apply(results, toConsumableArray($store.read('item/tree/normalize', null, item.children, depth + 1)));
            });

            return results;
        }
    }, {
        key: GETTER('item/path'),
        value: function value($store, id) {
            var results = [id];
            var targetId = id;

            do {
                var item = $store.read('item/get', targetId);

                if (item.parentId == '') {
                    results.push(item.id);
                    break;
                } else {
                    results.push(item.id);
                    targetId = item.parentId;
                }
            } while (targetId);

            return results;
        }
    }, {
        key: GETTER('item/dom'),
        value: function value($store, id) {
            var element = document.querySelector('[item-layer-id="' + id + '"]');

            if (element) {
                return new Dom(element);
            }
        }
    }]);
    return ItemSearchManager;
}(BaseModule);

var ExportManager = function (_BaseModule) {
    inherits(ExportManager, _BaseModule);

    function ExportManager() {
        classCallCheck(this, ExportManager);
        return possibleConstructorReturn(this, (ExportManager.__proto__ || Object.getPrototypeOf(ExportManager)).apply(this, arguments));
    }

    createClass(ExportManager, [{
        key: "makePageCSS",
        value: function makePageCSS($store, page) {

            var css = Object.assign({
                position: 'relative'
            }, $store.read('page/toCSS', page));

            return $store.read('css/toString', css);
        }
    }, {
        key: "getClassName",
        value: function getClassName(className) {
            return (className || '').split(' ').map(function (it) {
                return '.' + it;
            }).join('');
        }
    }, {
        key: "getPageStyle",
        value: function getPageStyle($store, page) {
            var pageStyle = this.makePageCSS($store, page).split(';').map(function (it) {
                return "\t" + it + ';';
            }).join('\n');

            return pageStyle;
        }
    }, {
        key: "getPageHtml",
        value: function getPageHtml($store, page) {
            var html = "<div id=\"page-1\">\n" + $store.read('item/map/children', page.id, function (item, index) {

                var idString = item.idString || 'layer-' + (index + 1);
                var className = item.className;

                var selector = [];

                if (className) {
                    selector.push("class=\"" + className + "\"");
                }

                if (!selector.length && item.idString) {
                    selector.push("id=\"" + idString + "\"");
                } else {
                    selector.push("id=\"layer-" + (index + 1) + "\"");
                }

                var clipPath = $store.read('layer/toStringClipPath', item);

                if (clipPath) {
                    clipPath = "\t\t\n" + clipPath;
                }

                var content = item.content || '';

                return "\t<div " + selector.join(' ') + ">" + content + clipPath + "</div>";
            }).join('\n') + "\n</div>";

            return html;
        }
    }, {
        key: "getLayerStyle",
        value: function getLayerStyle($store, page) {
            var _this2 = this;

            var layerStyle = $store.read('item/map/children', page.id, function (item, index) {

                var idString = item.idString || 'layer-' + (index + 1);
                var className = item.className;

                var selector = [];

                if (className) {
                    selector = _this2.getClassName(className);
                } else {
                    selector = "#" + idString;
                }

                var css = $store.read('layer/toExport', item, true).split(';').map(function (it) {
                    return '\t' + it + ';';
                }).join('\n');

                return selector + " {\n" + css + "\n}";
            }).join('\n');

            return layerStyle;
        }
    }, {
        key: GETTER('export/generate/code'),
        value: function value($store) {
            var page = $store.read('selection/current/page');

            if (!page) {
                return '';
            }

            var pageStyle = this.getPageStyle($store, page);

            var html = this.getPageHtml($store, page);

            var layerStyle = this.getLayerStyle($store, page);

            var styleText = "\n#page-1 { \n" + pageStyle + "\n}\n" + layerStyle + "\n\n";
            var style = "<style type=\"text/css\">" + styleText + "</style>\n";
            return {
                html: html,
                fullhtml: style + html,
                css: styleText
            };
        }
    }, {
        key: GETTER('export/codepen/code'),
        value: function value($store, obj) {
            var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'CSS Gradient Editor';
            var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'EasyLogic Studio';
            var link = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ' - https://css.easylogic.studio';

            return JSON.stringify(_extends({
                title: title,
                description: description + link,
                tags: ["css", "gradient", "editor", "easylogic", "studio"]
            }, obj)).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");
        }
    }]);
    return ExportManager;
}(BaseModule);

var ModuleList = [ExportManager, ClipPathManager, I18nManager, BackdropManager, FilterManager, TextShadowManager, BoxShadowManager, MatrixManager, OrderingManager, SelectionManager, HistoryManager, PageManager, CollectManager, SVGManager, ExternalResourceManager, CssManager, StorageManager, ItemManager, ItemCreateManager, ItemMoveManager, ItemRecoverManager, ItemSearchManager, ColorStepManager, ImageManager, LayerManager, ToolManager, BlendManager, GradientManager, GuideManager];

var BaseCSSEditor = function (_UIElement) {
    inherits(BaseCSSEditor, _UIElement);

    function BaseCSSEditor() {
        classCallCheck(this, BaseCSSEditor);
        return possibleConstructorReturn(this, (BaseCSSEditor.__proto__ || Object.getPrototypeOf(BaseCSSEditor)).apply(this, arguments));
    }

    createClass(BaseCSSEditor, [{
        key: 'initialize',
        value: function initialize() {
            var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.$store = new BaseStore({
                modules: [].concat(toConsumableArray(ModuleList), toConsumableArray(modules))
            });

            this.$body = new Dom(this.getContainer());
            this.$root = new Dom('div', 'csseditor');

            this.$body.append(this.$root);

            if (this.opt.type) {
                // to change css style
                this.$root.addClass(this.opt.type);
            }

            this.render(this.$root);

            // 이벤트 연결 
            this.initializeEvent();
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            return this.opt.container || document.body;
        }
    }]);
    return BaseCSSEditor;
}(UIElement);

var BasePropertyItem = function (_UIElement) {
    inherits(BasePropertyItem, _UIElement);

    function BasePropertyItem() {
        classCallCheck(this, BasePropertyItem);
        return possibleConstructorReturn(this, (BasePropertyItem.__proto__ || Object.getPrototypeOf(BasePropertyItem)).apply(this, arguments));
    }

    createClass(BasePropertyItem, [{
        key: "onToggleShow",
        value: function onToggleShow() {}
    }, {
        key: CLICK('$title'),
        value: function value(e) {
            var $dom = new Dom(e.target);

            if ($dom.hasClass('title')) {
                this.$el.toggleClass('show');
                this.onToggleShow();
            }
        }
    }, {
        key: "isPropertyShow",
        value: function isPropertyShow() {
            return this.$el.hasClass('show');
        }
    }]);
    return BasePropertyItem;
}(UIElement);

var Size = function (_BasePropertyItem) {
    inherits(Size, _BasePropertyItem);

    function Size() {
        classCallCheck(this, Size);
        return possibleConstructorReturn(this, (Size.__proto__ || Object.getPrototypeOf(Size)).apply(this, arguments));
    }

    createClass(Size, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item size show'>\n                <div class='items'>\n                    <div>\n                        <label><button type=\"button\" ref=\"$rect\">*</button>Width</label>\n                        <div>\n                            <div class='input two'> \n                                <input type='number' ref=\"$width\"> <span>" + UNIT_PX + "</span>\n                            </div>\n                        </div>\n                        <label class='second'>height</label>\n                        <div>\n                            <div class=\"input two\">\n                                <input type='number' ref=\"$height\"> <span>" + UNIT_PX + "</span>\n                            </div>\n                        </div>                        \n                    </div>   \n                    <div>\n                        <label>X</label>\n                        <div>\n                            <div class='input two'> \n                                <input type='number' ref=\"$x\"> <span>" + UNIT_PX + "</span>\n                            </div>\n                        </div>\n                        <label class='second'>Y</label>\n                        <div>\n                            <div class='input two'>\n                                <input type='number' ref=\"$y\"> <span>" + UNIT_PX + "</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER_POSITION, CHANGE_LAYER_SIZE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var item = this.read('selection/current');
            if (!item) return;
            if (!item.length) return;

            item = item[0];
            if (this.read('selection/is/image')) return;
            if (item.width) {
                this.refs.$width.val(unitValue(item.width));
            }

            if (item.height) {
                this.refs.$height.val(unitValue(item.height));
            }

            if (item.x) {
                this.refs.$x.val(unitValue(item.x));
            }

            if (item.y) {
                this.refs.$y.val(unitValue(item.y));
            }
        }
    }, {
        key: CLICK('$rect'),
        value: function value$$1(e) {
            var _this2 = this;

            this.read('selection/current/layer/id', function (id) {
                var width = pxUnit(_this2.refs.$width.int());
                var height = width;
                _this2.commit(CHANGE_LAYER_SIZE, { id: id, width: width, height: height });
                _this2.refs.$height.val(_this2.refs.$width.val());
            });
        }
    }, {
        key: INPUT('$width'),
        value: function value$$1() {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                var width = pxUnit(_this3.refs.$width.int());
                _this3.commit(CHANGE_LAYER_SIZE, { id: id, width: width });
            });
        }
    }, {
        key: INPUT('$height'),
        value: function value$$1() {
            var _this4 = this;

            this.read('selection/current/layer/id', function (id) {
                var height = pxUnit(_this4.refs.$height.int());
                _this4.commit(CHANGE_LAYER_SIZE, { id: id, height: height });
            });
        }
    }, {
        key: INPUT('$x'),
        value: function value$$1() {
            var _this5 = this;

            this.read('selection/current/layer/id', function (id) {
                var x = pxUnit(_this5.refs.$x.int());
                _this5.commit(CHANGE_LAYER_POSITION, { id: id, x: x });
            });
        }
    }, {
        key: INPUT('$y'),
        value: function value$$1() {
            var _this6 = this;

            this.read('selection/current/layer/id', function (id) {
                var y = pxUnit(_this6.refs.$y.int());
                _this6.commit(CHANGE_LAYER_POSITION, { id: id, y: y });
            });
        }
    }]);
    return Size;
}(BasePropertyItem);

var Position = function (_BasePropertyItem) {
    inherits(Position, _BasePropertyItem);

    function Position() {
        classCallCheck(this, Position);
        return possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).apply(this, arguments));
    }

    createClass(Position, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item position show'>\n                <div class='title' ref=\"$title\">Position</div>\n                <div class='items'>            \n                    <div>\n                        <label>X</label>\n                        <div>\n                            <input type='number' ref=\"$x\"> <span>" + UNIT_PX + "</span>\n                        </div>\n                        <label>Y</label>\n                        <div>\n                            <input type='number' ref=\"$y\"> <span>" + UNIT_PX + "</span>\n                        </div>\n                    </div>               \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (item) {
                _this2.refs.$x.val(unitValue(item.x));
                _this2.refs.$y.val(unitValue(item.y));
            });
        }
    }, {
        key: INPUT('$x'),
        value: function value$$1() {
            var _this3 = this;

            this.read('selection/current/layer', function (item) {
                item.x = pxUnit(_this3.refs.$x.int());
                _this3.dispatch('item/set', item);
            });
        }
    }, {
        key: INPUT('$y'),
        value: function value$$1() {
            var _this4 = this;

            this.read('selection/current/layer', function (item) {
                item.y = pxUnit(_this4.refs.$y.int());
                _this4.dispatch('item/set', item);
            });
        }
    }]);
    return Position;
}(BasePropertyItem);

var Radius = function (_BasePropertyItem) {
    inherits(Radius, _BasePropertyItem);

    function Radius() {
        classCallCheck(this, Radius);
        return possibleConstructorReturn(this, (Radius.__proto__ || Object.getPrototypeOf(Radius)).apply(this, arguments));
    }

    createClass(Radius, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item radius'>\n                <div class='items'>         \n                    <div>\n                        <label >Top Left</label>\n                        <div>\n                            <input type='range' ref=\"$topLeftRadiusRange\" min=\"0\" max=\"500\">                        \n                            <input type='number' min=\"0\" max=\"500\" ref=\"$topLeftRadius\"> <span>px</span>\n                        </div>\n                    </div>\n                    <div>\n                        <label>Top Right</label>\n                        <div>\n                            <input type='range' ref=\"$topRightRadiusRange\" min=\"0\" max=\"500\">                                                \n                            <input type='number' min=\"0\" max=\"500\" ref=\"$topRightRadius\"> <span>px</span>\n                        </div>\n                    </div>          \n                    <div>\n                        <label>Btm Left</label>\n                        <div>\n                            <input type='range' ref=\"$bottomLeftRadiusRange\" min=\"0\" max=\"500\">                                                \n                            <input type='number' min=\"0\" max=\"500\" ref=\"$bottomLeftRadius\"> <span>px</span>\n                        </div>\n                    </div>\n                    <div>\n                        <label>Btm Right</label>\n                        <div>\n                            <input type='range' ref=\"$bottomRightRadiusRange\" min=\"0\" max=\"500\">                                                \n                            <input type='number' min=\"0\" max=\"500\" ref=\"$bottomRightRadius\"> <span>px</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER_RADIUS, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (item) {
                var maxWidth = unitValue(item.width);

                if (item.fixedRadius) {
                    var borderRadius = defaultValue(item.borderRadius, pxUnit(0));
                    var radius = value2px(borderRadius, maxWidth);
                    _this2.refs.$topLeftRadiusRange.val(radius);
                    _this2.refs.$topRightRadiusRange.val(radius);
                    _this2.refs.$bottomLeftRadiusRange.val(radius);
                    _this2.refs.$bottomRightRadiusRange.val(radius);
                    _this2.refs.$topLeftRadius.val(radius);
                    _this2.refs.$topRightRadius.val(radius);
                    _this2.refs.$bottomLeftRadius.val(radius);
                    _this2.refs.$bottomRightRadius.val(radius);
                } else {
                    if (item.borderTopLeftRadius) {
                        _this2.refs.$topLeftRadius.val(value2px(item.borderTopLeftRadius, maxWidth));
                        _this2.refs.$topLeftRadiusRange.val(value2px(item.borderTopLeftRadius, maxWidth));
                    }
                    if (item.borderTopRightRadius) {
                        _this2.refs.$topRightRadius.val(value2px(item.borderTopRightRadius, maxWidth));
                        _this2.refs.$topRightRadiusRange.val(value2px(item.borderTopRightRadius, maxWidth));
                    }
                    if (item.borderBottomLeftRadius) {
                        _this2.refs.$bottomLeftRadius.val(value2px(item.borderBottomLeftRadius, maxWidth));
                        _this2.refs.$bottomLeftRadiusRange.val(value2px(item.borderBottomLeftRadius, maxWidth));
                    }
                    if (item.borderBottomRightRadius) {
                        _this2.refs.$bottomRightRadius.val(value2px(item.borderBottomRightRadius, maxWidth));
                        _this2.refs.$bottomRightRadiusRange.val(value2px(item.borderBottomRightRadius, maxWidth));
                    }
                }
            });
        }
    }, {
        key: "refreshValue",
        value: function refreshValue() {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_RADIUS, {
                    id: id,
                    borderTopLeftRadius: pxUnit(_this3.refs.$topLeftRadius.val()),
                    borderTopRightRadius: pxUnit(_this3.refs.$topRightRadius.val()),
                    borderBottomLeftRadius: pxUnit(_this3.refs.$bottomLeftRadius.val()),
                    borderBottomRightRadius: pxUnit(_this3.refs.$bottomRightRadius.val()),
                    fixedRadius: false
                });
            });
        }
    }, {
        key: CHANGEINPUT('$topLeftRadiusRange'),
        value: function value$$1() {
            this.refs.$topLeftRadius.val(this.refs.$topLeftRadiusRange.val());
            this.refreshValue();
        }
    }, {
        key: CHANGEINPUT('$topRightRadiusRange'),
        value: function value$$1() {
            this.refs.$topRightRadius.val(this.refs.$topRightRadiusRange.val());
            this.refreshValue();
        }
    }, {
        key: CHANGEINPUT('$bottomLeftRadiusRange'),
        value: function value$$1() {
            this.refs.$bottomLeftRadius.val(this.refs.$bottomLeftRadiusRange.val());
            this.refreshValue();
        }
    }, {
        key: CHANGEINPUT('$bottomRightRadiusRange'),
        value: function value$$1() {
            this.refs.$bottomRightRadius.val(this.refs.$bottomRightRadiusRange.val());
            this.refreshValue();
        }
    }, {
        key: CHANGEINPUT('$topLeftRadius'),
        value: function value$$1() {
            this.refs.$topLeftRadiusRange.val(this.refs.$topLeftRadius.val());
            this.refreshValue();
        }
    }, {
        key: CHANGEINPUT('$topRightRadius'),
        value: function value$$1() {
            this.refs.$topRightRadiusRange.val(this.refs.$topRightRadius.val());
            this.refreshValue();
        }
    }, {
        key: CHANGEINPUT('$bottomLeftRadius'),
        value: function value$$1() {
            this.refs.$bottomLeftRadiusRange.val(this.refs.$bottomLeftRadius.val());
            this.refreshValue();
        }
    }, {
        key: CHANGEINPUT('$bottomRightRadius'),
        value: function value$$1() {
            this.refs.$bottomRightRadiusRange.val(this.refs.$bottomRightRadius.val());
            this.refreshValue();
        }
    }, {
        key: EVENT('toggleRadius'),
        value: function value$$1() {
            this.$el.toggleClass('show');
        }
    }]);
    return Radius;
}(BasePropertyItem);

var Clip = function (_UIElement) {
    inherits(Clip, _UIElement);

    function Clip() {
        classCallCheck(this, Clip);
        return possibleConstructorReturn(this, (Clip.__proto__ || Object.getPrototypeOf(Clip)).apply(this, arguments));
    }

    createClass(Clip, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item show'>\n                <div class='items'>            \n                    <div>\n                        <label>Clip</label>\n                        <div>\n                            <input type='checkbox' ref=\"$check\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_PAGE, CHANGE_EDITOR),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/page', function (item) {
                _this2.refs.$check.checked(item.clip);
            });
        }
    }, {
        key: CLICK('$check'),
        value: function value() {
            var _this3 = this;

            this.read('selection/current/page/id', function (id) {
                _this3.commit(CHANGE_PAGE_SIZE, { id: id, clip: _this3.refs.$check.checked() });
            });
        }
    }]);
    return Clip;
}(UIElement);

var Name = function (_BasePropertyItem) {
    inherits(Name, _BasePropertyItem);

    function Name() {
        classCallCheck(this, Name);
        return possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).apply(this, arguments));
    }

    createClass(Name, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item name show'>\n                <div class='title' ref=\"$title\">Properties</div>   \n                <div class='items'>            \n                    <div>\n                        <label>Name</label>\n                        <div>\n                            <input type='text' ref=\"$name\" class='full'> \n                        </div>\n                    </div>\n                    <div>\n                        <label>ID</label>\n                        <div>\n                            <input type='text' ref=\"$id\" class='full'> \n                        </div>\n                    </div>                                        \n                    <div>\n                        <label>Class</label>\n                        <div>\n                            <input type='text' ref=\"$class\" class='full'> \n                        </div>\n                    </div>                    \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var item = this.read('selection/current');

            if (!item.length) return;

            item = item[0];

            var name = '';
            var idString = '';
            var className = '';
            if (item) {
                name = item.name;
                idString = item.idString || '';
                className = item.className || '';
            }

            this.refs.$name.val(name);
            this.refs.$id.val(idString);
            this.refs.$class.val(className);
        }
    }, {
        key: INPUT('$name'),
        value: function value() {
            var _this2 = this;

            this.read('selection/current/layer/id', function (id) {
                _this2.commit(CHANGE_LAYER_NAME, { id: id, name: _this2.refs.$name.val() });
            });
        }
    }, {
        key: INPUT('$class'),
        value: function value() {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_NAME, { id: id, className: _this3.refs.$class.val() });
            });
        }
    }, {
        key: INPUT('$id'),
        value: function value() {
            var _this4 = this;

            this.read('selection/current/layer/id', function (id) {
                _this4.commit(CHANGE_LAYER_NAME, { id: id, idString: _this4.refs.$id.val() });
            });
        }
    }]);
    return Name;
}(BasePropertyItem);

var GradientSteps = function (_UIElement) {
    inherits(GradientSteps, _UIElement);

    function GradientSteps() {
        classCallCheck(this, GradientSteps);
        return possibleConstructorReturn(this, (GradientSteps.__proto__ || Object.getPrototypeOf(GradientSteps)).apply(this, arguments));
    }

    createClass(GradientSteps, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'gradient-steps\'>\n                <div class="hue-container" ref="$back"></div>            \n                <div class="hue" ref="$steps">\n                    <div class=\'step-list\' ref="$stepList">\n                    </div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'getStepPosition',
        value: function getStepPosition(step) {
            var _getMinMax = this.getMinMax(),
                min = _getMinMax.min,
                max = _getMinMax.max;

            var left = this.refs.$steps.offset().left;

            min -= left;
            max -= left;

            if (isPX(step.unit)) {
                return step.px;
            }

            return min + (max - min) * (step.percent / 100);
        }
    }, {
        key: 'getUnitName',
        value: function getUnitName(step) {
            var unit$$1 = step.unit || UNIT_PERCENT;

            if ([UNIT_PX, UNIT_EM].includes(unit$$1)) {
                return unit$$1;
            }

            return UNIT_PERCENT;
        }
    }, {
        key: 'getUnitSelect',
        value: function getUnitSelect(step) {

            var unit$$1 = step.unit || UNIT_PERCENT;

            if ([UNIT_PX, UNIT_EM].includes(unit$$1) == false) {
                unit$$1 = UNIT_PERCENT;
            }

            return '\n        <select class=\'unit\' data-colorstep-id="' + step.id + '">\n            <option value=\'' + UNIT_PERCENT + '\' ' + (isPercent(unit$$1) ? 'selected' : '') + '>%</option>\n            <option value=\'' + UNIT_PX + '\' ' + (isPX(unit$$1) ? 'selected' : '') + '>px</option>\n            <option value=\'' + UNIT_EM + '\' ' + (isEM(unit$$1) ? 'selected' : '') + '>em</option>\n        </select>\n        ';
        }
    }, {
        key: 'getMaxValue',
        value: function getMaxValue() {
            return this.$store.step.width;
        }

        // load 후에 이벤트를 재설정 해야한다. 

    }, {
        key: LOAD('$stepList'),
        value: function value$$1() {
            var _this2 = this;

            var item = this.read('selection/current/image');

            if (!item) return '';

            return this.read('item/map/children', item.id, function (step) {

                var cut = step.cut ? 'cut' : '';
                var unitValue$$1 = _this2.read('colorstep/unit/value', step, _this2.getMaxValue());
                return '\n                <div \n                    class=\'drag-bar ' + (step.selected ? 'selected' : '') + '\' \n                    id="' + step.id + '"\n                    style="left: ' + _this2.getStepPosition(step) + 'px;"\n                >   \n                    <div class="guide-step step" style=" border-color: ' + step.color + ';background-color: ' + step.color + ';"></div>\n                    <div class=\'guide-line\' \n                        style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), ' + step.color + ' 10%) ;"></div>\n                    <div class="guide-change ' + cut + '" data-colorstep-id="' + step.id + '"></div>\n                    <div class="guide-unit ' + _this2.getUnitName(step) + '">\n                        <input type="number" class="' + UNIT_PERCENT + '" min="-100" max="100" step="0.1"  value="' + unitValue$$1.percent + '" data-colorstep-id="' + step.id + '"  />\n                        <input type="number" class="' + UNIT_PX + '" min="-100" max="1000" step="1"  value="' + unitValue$$1.px + '" data-colorstep-id="' + step.id + '"  />\n                        <input type="number" class="' + UNIT_EM + '" min="-100" max="500" step="0.1"  value="' + unitValue$$1.em + '" data-colorstep-id="' + step.id + '"  />\n                        ' + _this2.getUnitSelect(step) + '\n                    </div>       \n                </div>\n            ';
            });
        }
    }, {
        key: 'isShow',
        value: function isShow() {

            var item = this.read('selection/current');

            if (!item.length) return false;

            item = item[0];

            if (!this.read('image/type/isGradient', item.type)) {
                return false;
            }

            if (!this.read('selection/is/image')) {
                return false;
            }

            return true;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this3 = this;

            this.$el.toggle(this.isShow());

            this.read('selection/current/image', function (item) {
                var type = item ? item.type : '';

                if (_this3.read('image/type/isGradient', type)) {
                    _this3.load();
                    _this3.setColorUI();
                }
            });
        }
    }, {
        key: 'setColorUI',
        value: function setColorUI() {
            this.setBackgroundColor();
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor() {

            this.refs.$stepList.css('background-image', this.read('image/toLinearRight', this.read('selection/current/image')));
        }

        /* slide 영역 min,max 구하기  */

    }, {
        key: 'getMinMax',
        value: function getMinMax() {
            var min = this.refs.$steps.offsetLeft();
            var width = this.refs.$steps.width();
            var max = min + width;

            return { min: min, max: max, width: width };
        }

        /* 현재 위치 구하기  */

    }, {
        key: 'getCurrent',
        value: function getCurrent(e) {
            var _getMinMax2 = this.getMinMax(),
                min = _getMinMax2.min,
                max = _getMinMax2.max;

            var x = e.xy.x;


            var current = Math.min(Math.max(min, x), max);

            return current;
        }

        /**
         * 마우스 이벤트로 현재 위치 및 percent 설정, 전체  gradient 리프레쉬 
         * 
         * @param {*} e 
         */

    }, {
        key: 'refreshColorUI',
        value: function refreshColorUI(e) {
            var _getMinMax3 = this.getMinMax(),
                min = _getMinMax3.min,
                max = _getMinMax3.max;

            var current = this.getCurrent(e);

            if (this.currentStep) {
                var posX = Math.max(min, current);
                var px = posX - this.refs.$steps.offsetLeft();

                if (e.ctrlKey) {
                    px = Math.floor(px); // control + drag is floor number 
                }
                this.currentStepBox.px('left', px);
                // var percent = Math.floor((current - min) / (max - min) * 100)

                var item = this.read('item/get', this.currentStepBox.attr('id'));

                if (item) {

                    // item.px = px; 
                    var percent$$1 = Math.floor(px2percent(px, max - min));
                    var em$$1 = px2em(px, max - min);
                    var newValue = { id: item.id, px: px, percent: percent$$1, em: em$$1 };

                    this.currentUnitPercent.val(percent$$1);
                    this.currentUnitPx.val(px);
                    this.currentUnitEm.val(em$$1);

                    this.run('item/set', newValue);
                    this.run('colorstep/sort', newValue.id, this.getSortedStepList());
                    this.commit(CHANGE_COLOR_STEP, newValue);
                    this.setBackgroundColor();
                }
            }
        }
    }, {
        key: EVENT('changeColor'),
        value: function value$$1() {

            if (this.read('image/isNotGradientType', this.read('selection/current/image'))) return;
            if (this.read('tool/colorSource') != this.read('colorstep/colorSource')) return;

            if (this.currentStep) {

                var item = this.read('item/get', this.currentStep.attr('id'));

                if (item) {
                    var color$$1 = this.read('tool/get', 'color');
                    var newValue = { id: item.id, color: color$$1 };

                    this.commit(CHANGE_COLOR_STEP, newValue);
                    this.refresh();
                }
            }
        }
    }, {
        key: EVENT(CHANGE_COLOR_STEP, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: 'checkTarget',
        value: function checkTarget(e) {
            return this.refs.$back.is(e.target);
        }

        // 이미 선언된 메소드를 사용하여 메타 데이타로 쓴다. 
        // checkTarget 이라는 메소드가 true 를 리턴해줘야 아래 이벤트는 실행된다. 

    }, {
        key: CLICK('$back'),
        value: function value$$1(e) {
            this.addStep(e);
        }
    }, {
        key: 'removeStep',
        value: function removeStep(e) {

            var id = e.$delegateTarget.attr('id');

            this.run('colorstep/remove', id);
            this.emit(REMOVE_COLOR_STEP, id);
            this.run('history/push', 'Remove colorstep');
            this.refresh();
        }
    }, {
        key: 'addStep',
        value: function addStep(e) {
            var _getMinMax4 = this.getMinMax(),
                min = _getMinMax4.min,
                max = _getMinMax4.max;

            var current = this.getCurrent(e);

            var percent$$1 = Math.floor((current - min) / (max - min) * 100);

            var item = this.read('selection/current/image');

            if (!item) return;

            this.dispatch('colorstep/add', item, percent$$1);
            this.emit(ADD_COLOR_STEP, item, percent$$1);
            this.run('history/push', 'Add colorstep');
            this.refresh();
        }
    }, {
        key: 'initColor',
        value: function initColor(color$$1) {
            this.dispatch('colorstep/initColor', color$$1);
        }
    }, {
        key: 'getSortedStepList',
        value: function getSortedStepList() {
            var list = this.refs.$stepList.$$('.drag-bar').map(function (it) {
                return { id: it.attr('id'), x: it.cssFloat('left') };
            });

            list.sort(function (a, b) {
                if (a.x == b.x) return 0;
                return a.x > b.x ? 1 : -1;
            });

            return list.map(function (it) {
                return it.id;
            });
        }
    }, {
        key: 'selectStep',
        value: function selectStep(e) {
            var parent = e.$delegateTarget.parent();
            var item = this.read('item/get', parent.attr('id'));

            this.read('item/each/children', item.parentId, function (step) {
                if (step.selected) step.selected = false;
            });

            item.selected = true;

            this.initColor(item.color);

            this.currentStepBox = this.currentStepBox || parent;
            var $selected = this.refs.$stepList.$('.selected');
            if ($selected && !$selected.is(this.currentStepBox)) {
                $selected.removeClass('selected');
            }

            this.currentStepBox.addClass('selected');
            this.run('item/set', item);
            this.dispatch('colorstep/sort', item.id, this.getSortedStepList());
            this.setBackgroundColor();
        }
    }, {
        key: CLICK('$steps .step') + SHIFT,
        value: function value$$1(e) {
            this.removeStep(e);
        }
    }, {
        key: CLICK('$steps .step'),
        value: function value$$1(e) {
            this.selectStep(e);
        }
    }, {
        key: CLICK('$steps .guide-change'),
        value: function value$$1(e) {
            var id = e.$delegateTarget.attr('data-colorstep-id');
            var item = this.read('item/get', id);

            if (item.id) {
                // var cut = !item.cut;
                var newValue = { id: item.id, cut: !item.cut };
                this.commit(CHANGE_COLOR_STEP, newValue);
                this.run('history/push', 'Apply cut option');

                this.refresh();
            }
        }
    }, {
        key: CHANGE('$steps .guide-unit select.unit'),
        value: function value$$1(e) {

            var unit$$1 = e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('data-colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                step.unit = unit$$1;

                var unitValue$$1 = this.read('colorstep/unit/value', step, this.getMaxValue());
                var newValue = _extends({ id: step.id, unit: unit$$1 }, unitValue$$1);

                this.commit(CHANGE_COLOR_STEP, newValue);

                var $parent = e.$delegateTarget.parent();
                $parent.removeClass(UNIT_PERCENT, UNIT_PX, UNIT_EM).addClass(this.getUnitName(step));
            }
        }
    }, {
        key: INPUT('$steps input.percent'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var layer = this.read('selection/current/layer');

            var percent$$1 = +e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('data-colorstep-id');

            var step = this.read('item/get', id);

            if (step) {

                var newValue = {
                    id: step.id,
                    percent: percent$$1,
                    px: percent2px(percent$$1, this.getMaxValue(layer)),
                    em: percent2em(percent$$1, this.getMaxValue(layer))
                };

                this.currentStepBox.px('left', newValue.px);
                // this.currentUnitPercent.val(item.percent);
                this.currentUnitPx.val(newValue.px);
                this.currentUnitEm.val(newValue.em);

                this.commit(CHANGE_COLOR_STEP, newValue);
                this.setBackgroundColor();
            }
        }
    }, {
        key: INPUT('$steps input.px'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var layer = this.read('selection/current/layer');

            var px = +e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('data-colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                var newValue = {
                    id: step.id,
                    px: px,
                    percent: px2percent(px, this.getMaxValue(layer)),
                    em: px2em(px, this.getMaxValue(layer))
                };

                this.currentStepBox.px('left', newValue.px);
                this.currentUnitPercent.val(newValue.percent);
                // this.currentUnitPx.val(item.px);
                this.currentUnitEm.val(newValue.em);

                this.commit(CHANGE_COLOR_STEP, newValue);
                this.setBackgroundColor();
            }
        }
    }, {
        key: INPUT('$steps input.em'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var layer = this.read('selection/current/layer');

            var em$$1 = +e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('data-colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                var newValue = {
                    id: step.id,
                    em: em$$1,
                    percent: em2percent(em$$1, this.getMaxValue(layer)),
                    px: em2px(em$$1, this.getMaxValue(layer))
                };

                this.currentStepBox.px('left', newValue.px);
                this.currentUnitPercent.val(newValue.percent);
                this.currentUnitPx.val(newValue.px);
                // this.currentUnitEm.val(item.em);

                this.commit(CHANGE_COLOR_STEP, newValue);
                this.setBackgroundColor();
            }
        }
    }, {
        key: 'isDownCheck',
        value: function isDownCheck(e) {
            return this.isDown;
        }
    }, {
        key: 'isNotDownCheck',
        value: function isNotDownCheck(e) {
            return !this.isDown;
        }
    }, {
        key: 'isNotFirstPosition',
        value: function isNotFirstPosition(e) {
            return this.xy.x !== e.xy.x || this.xy.y !== e.xy.y;
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document') + CHECKER('isDownCheck'),
        value: function value$$1(e) {
            this.isDown = false;
            if (this.refs.$stepList) {
                this.refs.$stepList.removeClass('mode-drag');
                this.run('history/push', 'Moved colorstep');
            }
        }
    }, {
        key: POINTERMOVE('document') + CHECKER('isDownCheck'),
        value: function value$$1(e) {
            this.refreshColorUI(e);
            this.refs.$stepList.addClass('mode-drag');
        }
    }, {
        key: 'isStepElement',
        value: function isStepElement(e) {
            return new Dom(e.target).hasClass('step');
        }
    }, {
        key: POINTERSTART('$steps .step') + CHECKER('isNotDownCheck') + CHECKER('isStepElement'),
        value: function value$$1(e) {
            e.preventDefault();

            this.isDown = true;
            this.xy = e.xy;
            this.currentStep = e.$delegateTarget;
            this.currentStepBox = this.currentStep.parent();
            this.currentUnit = this.currentStepBox.$(".guide-unit");
            this.currentUnitPercent = this.currentUnit.$(".percent");
            this.currentUnitPx = this.currentUnit.$(".px");
            this.currentUnitEm = this.currentUnit.$(".em");

            if (this.currentStep) {
                this.selectStep(e);
            }
        }
    }]);
    return GradientSteps;
}(UIElement);

var ColorSteps = function (_BasePropertyItem) {
    inherits(ColorSteps, _BasePropertyItem);

    function ColorSteps() {
        classCallCheck(this, ColorSteps);
        return possibleConstructorReturn(this, (ColorSteps.__proto__ || Object.getPrototypeOf(ColorSteps)).apply(this, arguments));
    }

    createClass(ColorSteps, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item gradient-steps show'>\n                <div class='title'>Color Steps</div>\n                <div class='items'>            \n                    <GradientSteps></GradientSteps>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { GradientSteps: GradientSteps };
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/image');

            if (!item) return false;

            return this.read('image/type/isGradient', item.type);
        }
    }]);
    return ColorSteps;
}(BasePropertyItem);

function checkPxEm(unit$$1) {
    return [UNIT_PX, UNIT_EM].includes(unit$$1);
}

var GradientInfo = function (_UIElement) {
    inherits(GradientInfo, _UIElement);

    function GradientInfo() {
        classCallCheck(this, GradientInfo);
        return possibleConstructorReturn(this, (GradientInfo.__proto__ || Object.getPrototypeOf(GradientInfo)).apply(this, arguments));
    }

    createClass(GradientInfo, [{
        key: "template",
        value: function template() {
            return " \n            <div class='gradient-info'>\n                <div class=\"form-item\" ref=\"$colorsteps\">\n\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "getUnitName",
        value: function getUnitName(step) {
            var unit$$1 = step.unit || UNIT_PERCENT;

            if (checkPxEm(unit$$1)) {
                return unit$$1;
            }

            return 'percent';
        }
    }, {
        key: "getUnitSelect",
        value: function getUnitSelect(step) {

            var unit$$1 = step.unit || UNIT_PERCENT;

            if (checkPxEm(unit$$1) == false) {
                unit$$1 = UNIT_PERCENT;
            }

            return "\n        <select class='unit' colorstep-id=\"" + step.id + "\">\n            <option value='" + UNIT_PERCENT + "' " + (isPercent(unit$$1) ? 'selected' : '') + ">%</option>\n            <option value='" + UNIT_PX + "' " + (isPX(unit$$1) ? 'selected' : '') + ">px</option>\n            <option value='" + UNIT_EM + "' " + (isEM(unit$$1) ? 'selected' : '') + ">em</option>\n        </select>\n        ";
        }
    }, {
        key: "getUnitValue",
        value: function getUnitValue(step) {

            if (isPX(step.unit)) {
                return {
                    px: step.px,
                    percent: px2percent(step.px, this.getMaxValue()),
                    em: px2em(step.px, this.getMaxValue())
                };
            } else if (isEM(step.unit)) {
                return {
                    em: step.em,
                    percent: em2percent(step.em, this.getMaxValue()),
                    px: em2px(step.em, this.getMaxValue())
                };
            }

            return {
                percent: step.percent,
                px: percent2px(step.percent, this.getMaxValue()),
                em: percent2em(step.percent, this.getMaxValue())
            };
        }
    }, {
        key: LOAD('$colorsteps'),
        value: function value$$1() {
            var _this2 = this;

            var item = this.read('selection/current/image');

            if (!item) return '';

            var colorsteps = this.read('colorstep/sort/list', item.id);

            return "<div class='step-list' ref=\"$stepList\">\n                    " + colorsteps.map(function (step) {
                var cut = step.cut ? 'cut' : '';
                var unitValue$$1 = _this2.getUnitValue(step);
                return "\n                            <div class='color-step " + (step.selected ? 'selected' : '') + "' colorstep-id=\"" + step.id + "\" >\n                                <div class=\"color-cut\">\n                                    <div class=\"guide-change " + cut + "\" colorstep-id=\"" + step.id + "\"></div>\n                                </div>                                \n                                <div class=\"color-view\">\n                                    <div class=\"color-view-item\" style=\"background-color: " + step.color + "\" colorstep-id=\"" + step.id + "\" ></div>\n                                </div>                            \n                                <div class=\"color-code\">\n                                    <input type=\"text\" class=\"code\" value='" + step.color + "' colorstep-id=\"" + step.id + "\"  />\n                                </div>\n                                <div class=\"color-unit " + _this2.getUnitName(step) + "\">\n                                    <input type=\"number\" class=\"" + UNIT_PERCENT + "\" min=\"0\" max=\"100\" step=\"0.1\"  value=\"" + unitValue$$1.percent + "\" colorstep-id=\"" + step.id + "\"  />\n                                    <input type=\"number\" class=\"" + UNIT_PX + "\" min=\"0\" max=\"1000\" step=\"1\"  value=\"" + unitValue$$1.px + "\" colorstep-id=\"" + step.id + "\"  />\n                                    <input type=\"number\" class=\"" + UNIT_EM + "\" min=\"0\" max=\"500\" step=\"0.1\"  value=\"" + unitValue$$1.em + "\" colorstep-id=\"" + step.id + "\"  />\n                                    " + _this2.getUnitSelect(step) + "\n                                </div>                       \n                                <div class=\"tools\">\n                                    <button type=\"button\" class='remove-step' colorstep-id=\"" + step.id + "\" >&times;</button>\n                                </div>\n                            </div>\n                        ";
            }).join('') + "\n                </div>";
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.load();
        }
    }, {
        key: EVENT(CHANGE_COLOR_STEP, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "initColor",
        value: function initColor(color$$1) {
            this.dispatch('colorstep/initColor', color$$1);
        }
    }, {
        key: "selectStep",
        value: function selectStep(e) {
            var _this3 = this;

            var item = this.read('item/get', e.$delegateTarget.attr('colorstep-id'));

            this.read('item/each/children', item.parentId, function (step) {
                if (step.selected) {
                    step.selected = false;
                    _this3.run('item/set', step);
                }
            });

            item.selected = true;

            this.initColor(item.color);
            var newValue = { id: item.id, selected: item.selected };
            this.commit(CHANGE_COLOR_STEP, newValue);
            this.refresh();
        }
    }, {
        key: CLICK('$colorsteps .color-view-item'),
        value: function value$$1(e) {
            this.selectStep(e);
        }
    }, {
        key: INPUT('$colorsteps input.code'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var color$$1 = e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                var newValue = { id: step.id, color: color$$1 };
                this.commit(CHANGE_COLOR_STEP, newValue);

                this.refs.$stepList.$(".color-view-item[colorstep-id=\"" + step.id + "\"]").css({
                    'background-color': color$$1
                });
            }
        }
    }, {
        key: "getMaxValue",
        value: function getMaxValue(layer) {
            return this.$store.step.width;
        }
    }, {
        key: CHANGE('$colorsteps select.unit'),
        value: function value$$1(e) {

            var unit$$1 = e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                var newValue = { id: step.id, unit: unit$$1 };
                this.commit(CHANGE_COLOR_STEP, newValue);

                var $parent = e.$delegateTarget.parent();
                $parent.removeClass(UNIT_PERCENT, UNIT_PX, UNIT_EM).addClass(unit$$1);
            }
        }
    }, {
        key: INPUT('$colorsteps input.percent'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var layer = this.read('selection/current/layer');

            var percent$$1 = e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                // percent; 
                var px = percent2px(percent$$1, this.getMaxValue(layer));
                var em$$1 = percent2em(percent$$1, this.getMaxValue(layer));
                var newValue = { id: step.id, percent: percent$$1, px: px, em: em$$1 };

                this.commit(CHANGE_COLOR_STEP, newValue);
            }
        }
    }, {
        key: INPUT('$colorsteps input.px'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var layer = this.read('selection/current/layer');

            var px = e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                // step.px = px; 
                var percent$$1 = px2percent(px, this.getMaxValue(layer));
                var em$$1 = px2em(px, this.getMaxValue(layer));
                var newValue = { id: step.id, percent: percent$$1, px: px, em: em$$1 };
                this.commit(CHANGE_COLOR_STEP, newValue);
            }
        }
    }, {
        key: INPUT('$colorsteps input.em'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var layer = this.read('selection/current/layer');

            var em$$1 = e.$delegateTarget.val();
            var id = e.$delegateTarget.attr('colorstep-id');

            var step = this.read('item/get', id);

            if (step) {
                // step.em = em; 
                var percent$$1 = em2percent(em$$1, this.getMaxValue(layer));
                var px = em2px(em$$1, this.getMaxValue(layer));
                var newValue = { id: step.id, percent: percent$$1, px: px, em: em$$1 };

                this.commit(CHANGE_COLOR_STEP, newValue);
            }
        }
    }, {
        key: CLICK('$colorsteps .remove-step'),
        value: function value$$1(e) {
            var item = this.read('selection/current/image');
            if (!item) return;

            var id = e.$delegateTarget.attr('colorstep-id');

            this.run('colorstep/remove', id);
            this.emit(REMOVE_COLOR_STEP, id);
            this.refresh();
        }
    }, {
        key: CLICK('$colorsteps .guide-change'),
        value: function value$$1(e) {
            var id = e.$delegateTarget.attr('colorstep-id');
            var item = this.read('item/get', id);

            if (item.id) {
                this.commit(CHANGE_COLOR_STEP, { id: item.id, cut: !item.cut });
                this.refresh();
            }
        }
    }]);
    return GradientInfo;
}(UIElement);

var ColorStepsInfo = function (_UIElement) {
    inherits(ColorStepsInfo, _UIElement);

    function ColorStepsInfo() {
        classCallCheck(this, ColorStepsInfo);
        return possibleConstructorReturn(this, (ColorStepsInfo.__proto__ || Object.getPrototypeOf(ColorStepsInfo)).apply(this, arguments));
    }

    createClass(ColorStepsInfo, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item gradient-steps-info show'>\n                <div class='items'>            \n                    <GradientInfo></GradientInfo>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { GradientInfo: GradientInfo };
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/image');
            if (!item) return false;

            return this.read('image/type/isGradient', item.type);
        }
    }]);
    return ColorStepsInfo;
}(UIElement);

var ColorPickerLayer = function (_UIElement) {
    inherits(ColorPickerLayer, _UIElement);

    function ColorPickerLayer() {
        classCallCheck(this, ColorPickerLayer);
        return possibleConstructorReturn(this, (ColorPickerLayer.__proto__ || Object.getPrototypeOf(ColorPickerLayer)).apply(this, arguments));
    }

    createClass(ColorPickerLayer, [{
        key: 'afterRender',
        value: function afterRender() {
            var _this2 = this;

            var defaultColor = 'red';
            this.colorPicker = ColorPicker.create({
                type: 'ring-tab',
                tabTitle: 'Step',
                position: 'inline',
                container: this.$el.el,
                color: defaultColor,
                onChange: function onChange(c) {
                    _this2.changeColor(c);
                }
            });

            setTimeout(function () {
                _this2.colorPicker.dispatch('initColor', defaultColor);
            }, 100);
        }
    }, {
        key: 'template',
        value: function template() {
            return '<div class=\'colorpicker-layer\'> </div>';
        }
    }, {
        key: 'changeColor',
        value: function changeColor(color) {
            var _this3 = this;

            var item = this.read('selection/current');

            if (!item.length) return;

            item = item[0];

            if (this.read('selection/is/image')) {

                if (this.read('image/type/isStatic', item.type)) {
                    this.commit(CHANGE_IMAGE_COLOR, { id: item.id, color: color });
                } else if (this.read('image/type/isGradient', item.type)) {

                    this.read('item/each/children', item.id, function (step) {
                        if (step.selected) {
                            _this3.commit(CHANGE_COLOR_STEP, { id: step.id, color: color });
                        }
                    });
                }
            }
        }
    }, {
        key: EVENT(CHANGE_COLOR_STEP),
        value: function value(newValue) {
            if (isNotUndefined(newValue.color)) {
                this.colorPicker.initColorWithoutChangeEvent(this.read('tool/get', 'color'));
            }
        }
    }, {
        key: EVENT('changeColor'),
        value: function value() {
            this.colorPicker.initColorWithoutChangeEvent(this.read('tool/get', 'color'));
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this4 = this;

            if (this.read('selection/is/image')) {
                this.read('selection/current/image', function (image) {
                    if (_this4.read('image/type/isStatic', image.type)) {
                        _this4.colorPicker.initColorWithoutChangeEvent(image.color);
                    } else if (_this4.read('image/type/isGradient', image.type)) {}
                });
            }
        }
    }]);
    return ColorPickerLayer;
}(UIElement);

var ColorPickerPanel = function (_UIElement) {
    inherits(ColorPickerPanel, _UIElement);

    function ColorPickerPanel() {
        classCallCheck(this, ColorPickerPanel);
        return possibleConstructorReturn(this, (ColorPickerPanel.__proto__ || Object.getPrototypeOf(ColorPickerPanel)).apply(this, arguments));
    }

    createClass(ColorPickerPanel, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item colorpicker show'>\n                <div class='items'>            \n                    <ColorPicker></ColorPicker>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { ColorPicker: ColorPickerLayer };
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/image');

            if (!item) return false;

            return this.read('image/type/isImage', item.type) == false;
        }
    }]);
    return ColorPickerPanel;
}(UIElement);

var Transform = function (_BasePropertyItem) {
    inherits(Transform, _BasePropertyItem);

    function Transform() {
        classCallCheck(this, Transform);
        return possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).apply(this, arguments));
    }

    createClass(Transform, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item transform show'>\n                <div class='title' ref=\"$title\">Transform 2D</div>\n                <div class='items block'>            \n                    <div>\n                        <label>Rotate</label>\n                        <div>\n                            <input type='range' ref=\"$rotateRange\" min=\"0\" max=\"360\">\n                            <input type='number' ref=\"$rotate\"> <span>" + UNIT_DEG + "</span>\n                        </div>\n                    </div>\n                    <div>\n                        <label>Scale</label>\n                        <div>\n                            <input type='range' ref=\"$scaleRange\" min=\"0.5\" max=\"10.0\" step=\"0.1\">                        \n                            <input type='number' ref=\"$scale\" min=\"0.5\" max=\"10.0\" step=\"0.1\">\n                        </div>\n                    </div>                      \n                    <div>\n                        <label>SkewX</label>\n                        <div>\n                            <input type='range' ref=\"$skewXRange\" min=\"-360\" max=\"360\" step=\"0.1\">    \n                            <input type='number' ref=\"$skewX\" min=\"-360\" max=\"360\" step=\"0.1\"> <span>" + UNIT_DEG + "</span>\n                        </div>\n                    </div>\n                    <div>                        \n                        <label>SkewY</label>\n                        <div>\n                            <input type='range' ref=\"$skewYRange\" min=\"-360\" max=\"360\" step=\"0.1\">\n                            <input type='number' ref=\"$skewY\" min=\"-360\" max=\"360\" step=\"0.1\"> <span>" + UNIT_DEG + "</span>\n                        </div>\n                    </div>     \n   \n                    <div>\n                        <label>translateX</label>\n                        <div>\n                            <input type='range' ref=\"$translateXRange\" min=\"-2000\" max=\"2000\" step=\"1\">                        \n                            <input type='number' ref=\"$translateX\" min=\"-2000\" max=\"2000\" step=\"1\"> <span>" + UNIT_PX + "</span>\n                        </div>\n                    </div>\n                    <div>                        \n                        <label>translateY</label>\n                        <div>\n                            <input type='range' ref=\"$translateYRange\" min=\"-2000\" max=\"2000\" step=\"1\">\n                            <input type='number' ref=\"$translateY\" min=\"-2000\" max=\"2000\" step=\"1\"> <span>" + UNIT_PX + "</span>\n                        </div>\n                    </div>                                                   \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER_TRANSFORM, CHANGE_EDITOR, CHANGE_LAYER_ROTATE),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (item) {

                var attr = ['rotate', 'skewX', 'skewY', 'scale', 'translateX', 'translateY'];

                attr.forEach(function (key) {
                    if (item[key]) {
                        _this2.refs["$" + key + "Range"].val(item[key]);
                        _this2.refs["$" + key].val(item[key]);
                    }
                });
            });
        }
    }, {
        key: "updateTransform",
        value: function updateTransform(key) {
            var _this3 = this;

            var postfix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            this.read('selection/current/layer/id', function (id) {
                var value$$1 = _this3.refs['$' + key + postfix].val();
                if (postfix == '') {
                    _this3.refs['$' + key + 'Range'].val(value$$1);
                } else {
                    _this3.refs['$' + key].val(value$$1);
                }
                _this3.commit(CHANGE_LAYER_TRANSFORM, defineProperty({ id: id }, key, value$$1));
            });
        }
    }, {
        key: CHANGEINPUT('$rotateRange'),
        value: function value$$1() {
            this.updateTransform('rotate', 'Range');
        }
    }, {
        key: CHANGEINPUT('$skewXRange'),
        value: function value$$1() {
            this.updateTransform('skewX', 'Range');
        }
    }, {
        key: CHANGEINPUT('$skewYRange'),
        value: function value$$1() {
            this.updateTransform('skewY', 'Range');
        }
    }, {
        key: CHANGEINPUT('$scaleRange'),
        value: function value$$1() {
            this.updateTransform('scale', 'Range');
        }
    }, {
        key: CHANGEINPUT('$translateXRange'),
        value: function value$$1() {
            this.updateTransform('translateX', 'Range');
        }
    }, {
        key: CHANGEINPUT('$translateYRange'),
        value: function value$$1() {
            this.updateTransform('translateY', 'Range');
        }
    }, {
        key: INPUT('$rotate'),
        value: function value$$1() {
            this.updateTransform('rotate');
        }
    }, {
        key: INPUT('$skewX'),
        value: function value$$1() {
            this.updateTransform('skewX');
        }
    }, {
        key: INPUT('$skewY'),
        value: function value$$1() {
            this.updateTransform('skewY');
        }
    }, {
        key: INPUT('$scale'),
        value: function value$$1() {
            this.updateTransform('scale');
        }
    }, {
        key: INPUT('$translateX'),
        value: function value$$1() {
            this.updateTransform('translateX');
        }
    }, {
        key: INPUT('$translateY'),
        value: function value$$1() {
            this.updateTransform('translateY');
        }
    }]);
    return Transform;
}(BasePropertyItem);

var Transform3d = function (_BasePropertyItem) {
    inherits(Transform3d, _BasePropertyItem);

    function Transform3d() {
        classCallCheck(this, Transform3d);
        return possibleConstructorReturn(this, (Transform3d.__proto__ || Object.getPrototypeOf(Transform3d)).apply(this, arguments));
    }

    createClass(Transform3d, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item transform show'>\n                <div class='title' ref=\"$title\">Transform 3D</div> \n                <div class='items block'>            \n                    <div>\n                        <label> 3D </label>\n                        \n                        <div>\n                            <label><input type='checkbox' ref=\"$preserve\"> preserve-3d </label>\n                        </div>\n                    </div>                    \n                    <div>\n                        <label>Perspective</label>\n                        <div>\n                            <input type='range' data-type=\"perspective\" ref=\"$perspectiveRange\" min=\"0\" max=\"3000\">\n                            <input type='number' data-type=\"perspective\" ref=\"$perspective\"> <span>" + UNIT_PX + "</span>\n                        </div>\n                    </div>                \n                    <div>\n                        <label>Rotate X</label>\n                        <div>\n                            <input type='range' data-type=\"rotateX\" ref=\"$rotateXRange\" min=\"-360\" max=\"360\">\n                            <input type='number' data-type=\"rotateX\" ref=\"$rotateX\"> <span>" + UNIT_DEG + "</span>\n                        </div>\n                    </div>\n                    <div>\n                        <label>Rotate Y</label>\n                        <div>\n                            <input type='range' data-type=\"rotateY\" ref=\"$rotateYRange\" min=\"-360\" max=\"360\">\n                            <input type='number' data-type=\"rotateY\" ref=\"$rotateY\"> <span>" + UNIT_DEG + "</span>\n                        </div>\n                    </div>                    \n                    <div>\n                        <label>Rotate Z</label>\n                        <div>\n                            <input type='range' data-type=\"rotateZ\" ref=\"$rotateZRange\" min=\"-360\" max=\"360\">\n                            <input type='number' data-type=\"rotateZ\" ref=\"$rotateZ\"> <span>" + UNIT_DEG + "</span>\n                        </div>\n                    </div>                                         \n                    <div>\n                        <label>Scale X</label>\n                        <div>\n                            <input type='range' data-type=\"scaleX\" ref=\"$scaleXRange\" min=\"0.5\" max=\"10\" step=\"0.1\">\n                            <input type='number' data-type=\"scaleX\" ref=\"$scaleX\"> \n                        </div>\n                    </div>                                        \n                    <div>\n                        <label>Scale Y</label>\n                        <div>\n                            <input type='range' data-type=\"scaleY\" ref=\"$scaleYRange\" min=\"0.5\" max=\"10\" step=\"0.1\">\n                            <input type='number' data-type=\"scaleY\" ref=\"$scaleY\"> \n                        </div>\n                    </div>                                        \n                    <div>\n                        <label>Scale Z</label>\n                        <div>\n                            <input type='range' data-type=\"scaleZ\" ref=\"$scaleZRange\" min=\"0.5\" max=\"10\" step=\"0.1\">\n                            <input type='number' data-type=\"scaleZ\" ref=\"$scaleZ\"> \n                        </div>\n                    </div>    \n                    <div>\n                        <label>Translate X</label>\n                        <div>\n                            <input type='range'  data-type=\"translateX\" ref=\"$translateXRange\" min=\"-2000\" max=\"2000\">\n                            <input type='number'  data-type=\"translateX\" ref=\"$translateX\" min=\"-2000\" max=\"2000\"> <span>" + UNIT_PX + "</span>\n                        </div>\n                    </div>\n                    <div>\n                        <label>Translate Y</label>\n                        <div>\n                            <input type='range'  data-type=\"translateY\" ref=\"$translateYRange\" min=\"-2000\" max=\"2000\">\n                            <input type='number' data-type=\"translateY\" ref=\"$translateY\" min=\"-2000\" max=\"2000\"> <span>" + UNIT_PX + "</span> \n                        </div>\n                    </div>\n                    <div>\n                        <label>Translate Z</label>\n                        <div>\n                            <input type='range' data-type=\"translateZ\" ref=\"$translateZRange\" min=\"-2000\" max=\"2000\">\n                            <input type='number' data-type=\"translateZ\" ref=\"$translateZ\" min=\"-2000\" max=\"2000\">  <span>" + UNIT_PX + "</span>\n                        </div>\n                    </div>                                        \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER_TRANSFORM, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: CLICK('$preserve'),
        value: function value$$1(e) {
            var _this2 = this;

            this.read('selection/current/layer/id', function (id) {
                var preserve = _this2.refs.$preserve.checked();

                _this2.commit(CHANGE_LAYER_TRANSFORM, { id: id, preserve: preserve });
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this3 = this;

            this.read('selection/current/layer', function (item) {

                var attr = ['perspective', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'translateX', 'translateY', 'translateZ'];

                attr.forEach(function (key) {
                    if (item[key]) {
                        _this3.refs["$" + key + "Range"].val(item[key]);
                        _this3.refs["$" + key].val(item[key]);
                    }
                });

                _this3.refs.$preserve.checked(!!item.preserve);
            });
        }
    }, {
        key: "updateTransform",
        value: function updateTransform(key) {
            var _this4 = this;

            var postfix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            this.read('selection/current/layer/id', function (id) {
                var value$$1 = _this4.refs['$' + key + postfix].val();
                if (postfix == '') {
                    _this4.refs['$' + key + 'Range'].val(value$$1);
                } else {
                    _this4.refs['$' + key].val(value$$1);
                }
                _this4.commit(CHANGE_LAYER_TRANSFORM, defineProperty({ id: id }, key, value$$1));
            });
        }
    }, {
        key: CHANGEINPUT('$el input[type=range]'),
        value: function value$$1(e) {
            var $item = e.$delegateTarget;
            this.updateTransform($item.attr('data-type'), 'Range');
        }
    }, {
        key: INPUT('$el input[type=number]'),
        value: function value$$1(e) {
            var $item = e.$delegateTarget;
            this.updateTransform($item.attr('data-type'));
        }
    }]);
    return Transform3d;
}(BasePropertyItem);

var position_list = [POSITION_LEFT, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_CENTER];

var UnitRange = function (_UIElement) {
    inherits(UnitRange, _UIElement);

    function UnitRange() {
        classCallCheck(this, UnitRange);
        return possibleConstructorReturn(this, (UnitRange.__proto__ || Object.getPrototypeOf(UnitRange)).apply(this, arguments));
    }

    createClass(UnitRange, [{
        key: "created",
        value: function created() {
            this.min = this.props.min || 0;
            this.max = this.props.max || 1000;
            this.step = this.props.step || 1;
            this.value = this.props.value || 0;
            this.unit = this.props.unit || UNIT_PX;
            this.showClass = 'show';
            this.maxValueFunction = this.parent[this.props.maxvaluefunction].bind(this.parent);
            this.updateFunction = this.parent[this.props.updatefunction].bind(this.parent);
        }
    }, {
        key: "afterRender",
        value: function afterRender() {
            this.initializeRangeMax(this.unit);
        }
    }, {
        key: "template",
        value: function template() {

            var value$$1 = position_list.includes(this.value) ? "" : this.value;

            return "\n            <div class='unit-range'>\n                <div class='base-value'>\n                    <input ref=\"$range\" type=\"range\" class='range' min=\"" + this.min + "\" max=\"" + this.max + "\" step=\"" + this.step + "\" value=\"" + value$$1 + "\" />\n                    <input ref=\"$number\" type=\"number\" class='number' min=\"" + this.min + "\" max=\"" + this.max + "\" step=\"" + this.step + "\" value=\"" + value$$1 + "\"  />\n                    <button ref=\"$unit\" type=\"button\" class='unit'>" + this.unit + "</button>\n                </div>\n                <div class=\"multi-value\" ref=\"$multiValue\">\n                    <div ref=\"$px\" class=\"" + UNIT_PX + "\" unit='" + UNIT_PX + "'></div>\n                    <div ref=\"$percent\" class=\"" + UNIT_PERCENT + "\" unit='" + UNIT_PERCENT + "'></div>\n                    <div ref=\"$em\" class=\"" + UNIT_EM + "\" unit='" + UNIT_EM + "'></div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: CLICK('$multiValue div'),
        value: function value$$1(e) {
            var unit$$1 = e.$delegateTarget.attr('unit');
            var value$$1 = e.$delegateTarget.attr('value');

            this.selectUnit(unit$$1, value$$1);
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var value$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            if (isPxUnit(value$$1) || isPercentUnit(value$$1) || isEmUnit(value$$1)) {
                this.selectUnit(value$$1.unit, value$$1.value);
                return;
            }

            //TODO: remove legacy code 
            value$$1 = (value$$1 || '') + '';
            var unit$$1 = UNIT_PX;
            if (value$$1.includes(UNIT_PERCENT)) {
                unit$$1 = UNIT_PERCENT;
            } else if (value$$1.includes(UNIT_EM)) {
                unit$$1 = UNIT_EM;
            }

            value$$1 = position_list.includes(value$$1) ? "" : parseParamNumber$2(value$$1);

            this.selectUnit(unit$$1, value$$1);
            //TODO: remove legacy code 
        }
    }, {
        key: "initializeRangeMax",
        value: function initializeRangeMax(unit$$1) {

            if (isPercent(unit$$1)) {
                var max = isPercent(this.props.unit) ? this.props.max : 300;
                this.refs.$range.attr('max', max);
                this.refs.$range.attr('step', 0.01);
                this.refs.$number.attr('max', max);
                this.refs.$number.attr('step', 0.01);
            } else if (isPX(unit$$1)) {
                var max = isPX(this.props.unit) ? this.props.max : 1000;

                this.refs.$range.attr('max', max);
                this.refs.$range.attr('step', 1);
                this.refs.$number.attr('max', max);
                this.refs.$number.attr('step', 1);
            } else if (isEM(unit$$1)) {
                var max = isEM(this.props.unit) ? this.props.max : 300;
                this.refs.$range.attr('max', max);
                this.refs.$range.attr('step', 0.01);
                this.refs.$number.attr('max', max);
                this.refs.$number.attr('step', 0.01);
            }
        }
    }, {
        key: "selectUnit",
        value: function selectUnit(unit$$1, value$$1) {
            this.unit = unit$$1;
            this.value = position_list.includes(value$$1) ? "" : value$$1;

            this.refs.$range.val(this.value);
            this.refs.$number.val(this.value);
            this.refs.$unit.text(unitString(this.unit));

            this.initializeRangeMax(this.unit);
        }
    }, {
        key: CLICK('$unit'),
        value: function value$$1(e) {
            this.$el.toggleClass(this.showClass);
            this.updateRange();
        }
    }, {
        key: "updateRange",
        value: function updateRange() {
            var unit$$1 = this.unit;
            var px = isPX(unit$$1) ? this.refs.$range.val() : undefined;
            var percent$$1 = isPercent(unit$$1) ? this.refs.$range.val() : undefined;
            var em$$1 = isEM(unit$$1) ? this.refs.$range.val() : undefined;
            var maxValue = this.maxValueFunction();

            if (px) {
                this.refs.$px.text(px + ' px').attr('value', px);
                this.refs.$percent.text(px2percent(px, maxValue) + ' %').attr('value', px2percent(px, maxValue));
                this.refs.$em.text(px2em(px, maxValue) + ' em').attr('value', px2em(px, maxValue));
            } else if (percent$$1) {
                this.refs.$percent.text(percent$$1 + ' %').attr('value', percent$$1);
                this.refs.$px.text(percent2px(percent$$1, maxValue) + ' px').attr('value', percent2px(percent$$1, maxValue));
                this.refs.$em.text(percent2em(percent$$1, maxValue) + ' em').attr('value', percent2em(percent$$1, maxValue));
            } else if (em$$1) {
                this.refs.$em.text(em$$1 + ' em').attr('value', em$$1);
                this.refs.$percent.text(em2percent(em$$1, maxValue) + ' %').attr('value', em2percent(em$$1, maxValue));
                this.refs.$px.text(em2px(em$$1, maxValue) + ' px').attr('value', em2px(em$$1, maxValue));
            }
        }
    }, {
        key: INPUT('$range'),
        value: function value$$1(e) {
            var value$$1 = +this.refs.$range.val();
            this.refs.$number.val(value$$1);
            this.updateRange();
            this.updateFunction(unitObject(value$$1, this.unit));
        }
    }, {
        key: INPUT('$number'),
        value: function value$$1(e) {
            var value$$1 = +this.refs.$number.val();
            this.refs.$range.val(value$$1);
            this.updateRange();
            this.updateFunction(unitObject(value$$1, this.unit));
        }
    }]);
    return UnitRange;
}(UIElement);

var BackgroundSize = function (_UIElement) {
    inherits(BackgroundSize, _UIElement);

    function BackgroundSize() {
        classCallCheck(this, BackgroundSize);
        return possibleConstructorReturn(this, (BackgroundSize.__proto__ || Object.getPrototypeOf(BackgroundSize)).apply(this, arguments));
    }

    createClass(BackgroundSize, [{
        key: "components",
        value: function components() {
            return {
                UnitRange: UnitRange
            };
        }
    }, {
        key: "template",
        value: function template() {
            return "\n            <div class='property-item background show'>\n                <div class='items'>\n                    <div>\n                        <label>size</label>\n                        <div class='size-list' ref=\"$size\">\n                            <button type=\"button\" value=\"contain\" title=\"contain\" ></button>\n                            <button type=\"button\" value=\"cover\" title=\"cover\"></button>\n                            <button type=\"button\" value=\"auto\" title=\"auto\"></button>\n                        </div>\n                    </div>\n                    <div>\n                        <label>x</label>\n                        <UnitRange \n                            ref=\"$x\" \n                            min=\"-100\" max=\"1000\" step=\"1\" value=\"0\" unit=\"" + UNIT_PX + "\"\n                            maxValueFunction=\"getMaxX\"\n                            updateFunction=\"updateX\"\n                        ></UnitRange>\n                    </div>\n                    <div>\n                        <label>y</label>\n                        <UnitRange \n                            ref=\"$y\" \n                            min=\"-100\" max=\"1000\" step=\"1\" value=\"0\" unit=\"" + UNIT_PX + "\"\n                            maxValueFunction=\"getMaxY\"\n                            updateFunction=\"updateY\"\n                        ></UnitRange>\n                    </div>\n                    <div>\n                        <label>width</label>\n                        <UnitRange \n                            ref=\"$width\" \n                            min=\"0\" max=\"1000\" step=\"1\" value=\"0\" unit=\"" + UNIT_PX + "\"\n                            maxValueFunction=\"getMaxWidth\"\n                            updateFunction=\"updateWidth\"\n                        ></UnitRange>\n                    </div>\n                    <div>\n                        <label>height</label>\n                        <UnitRange \n                            ref=\"$height\" \n                            min=\"0\" max=\"1000\" step=\"1\" value=\"0\" unit=\"" + UNIT_PX + "\"\n                            maxValueFunction=\"getMaxHeight\"\n                            updateFunction=\"updateHeight\"\n                        ></UnitRange>\n                    </div>                    \n                    <div>\n                        <label>repeat</label>\n                        <div class='flex repeat-list' ref=\"$repeat\">\n                            <button type=\"button\" value='no-repeat' title=\"no-repeat\">\n                                <span></span>\n                            </button>                        \n                            <button type=\"button\" value='repeat' title=\"repeat\">\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                            </button>\n                            <button type=\"button\" value='repeat-x' title=\"repeat-x\">\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                            </button>\n                            <button type=\"button\" value='repeat-y' title=\"repeat-y\">\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                            </button>\n                            <button type=\"button\" value='space' title=\"space\">\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>                                \n                            </button>\n                            <button type=\"button\" value='round' title=\"round\">\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>\n                                <span></span>                                                                \n                            </button>                            \n                            \n                        </div>\n                 \n                    </div>\n\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "updateWidth",
        value: function updateWidth(backgroundSizeWidth) {
            var _this2 = this;

            this.read('selection/current/image/id', function (id) {
                _this2.commit(CHANGE_IMAGE, { id: id, backgroundSizeWidth: backgroundSizeWidth });
            });
        }
    }, {
        key: "updateHeight",
        value: function updateHeight(backgroundSizeHeight) {
            var _this3 = this;

            this.read('selection/current/image/id', function (id) {
                _this3.commit(CHANGE_IMAGE, { id: id, backgroundSizeHeight: backgroundSizeHeight });
            });
        }
    }, {
        key: "updateX",
        value: function updateX(backgroundPositionX) {
            var _this4 = this;

            this.read('selection/current/image/id', function (id) {
                _this4.commit(CHANGE_IMAGE, { id: id, backgroundPositionX: backgroundPositionX });
            });
        }
    }, {
        key: "updateY",
        value: function updateY(backgroundPositionY) {
            var _this5 = this;

            this.read('selection/current/image/id', function (id) {
                _this5.commit(CHANGE_IMAGE, { id: id, backgroundPositionY: backgroundPositionY });
            });
        }
    }, {
        key: "getMaxHeight",
        value: function getMaxHeight() {
            var layer = this.read('selection/current/layer');

            if (!layer) return 0;

            return unitValue(layer.height);
        }
    }, {
        key: "getMaxY",
        value: function getMaxY() {
            var layer = this.read('selection/current/layer');

            if (!layer) return 0;

            return unitValue(layer.height) * 2;
        }
    }, {
        key: "getMaxWidth",
        value: function getMaxWidth() {
            var layer = this.read('selection/current/layer');

            if (!layer) return 0;

            return unitValue(layer.width);
        }
    }, {
        key: "getMaxX",
        value: function getMaxX() {
            var layer = this.read('selection/current/layer');

            if (!layer) return 0;

            return unitValue(layer.width) * 2;
        }
    }, {
        key: CLICK('$size button'),
        value: function value$$1(e) {
            var _this6 = this;

            this.read('selection/current/image/id', function (id) {
                var newValue = { id: id, backgroundSize: e.$delegateTarget.val() };
                _this6.selectBackgroundSize(newValue.backgroundSize);
                _this6.commit(CHANGE_IMAGE, newValue);
            });
        }
    }, {
        key: "selectBackgroundSize",
        value: function selectBackgroundSize() {
            var value$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';

            var selectedItem = this.refs.$size.$('.selected');
            if (selectedItem) selectedItem.removeClass('selected');

            if (!['contain', 'cover', 'auto'].includes(value$$1)) {
                value$$1 = 'auto';
            }

            var item = this.refs.$size.$("[value=" + value$$1 + "]");

            if (item) {
                item.addClass('selected');
            }
        }
    }, {
        key: "selectBackgroundRepeat",
        value: function selectBackgroundRepeat(value$$1) {
            var selectedItem = this.refs.$repeat.$('.selected');
            if (selectedItem) selectedItem.removeClass('selected');

            var item = this.refs.$repeat.$("[value=" + value$$1 + "]");

            if (item) {
                item.addClass('selected');
            }
        }
    }, {
        key: CLICK('$repeat button'),
        value: function value$$1(e) {
            var _this7 = this;

            this.read('selection/current/image/id', function (id) {
                var newValue = { id: id, backgroundRepeat: e.$delegateTarget.val() };
                _this7.selectBackgroundRepeat(newValue.backgroundRepeat);
                _this7.commit(CHANGE_IMAGE, newValue);
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_EDITOR),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this8 = this;

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.read('selection/current/image', function (image) {
                    _this8.children.$width.refresh(image.backgroundSizeWidth);
                    _this8.children.$height.refresh(image.backgroundSizeHeight);

                    var x = convertPercentUnit(defaultValue(image.backgroundPositionX, percentUnit(0)));
                    var y = convertPercentUnit(defaultValue(image.backgroundPositionY, percentUnit(0)));

                    _this8.children.$x.refresh(x);
                    _this8.children.$y.refresh(y);
                    _this8.selectBackgroundSize(image.backgroundSize);
                    _this8.selectBackgroundRepeat(image.backgroundRepeat);
                });
            }
        }
    }, {
        key: "isShow",
        value: function isShow() {

            return true;
        }
    }]);
    return BackgroundSize;
}(UIElement);

var PageSize = function (_UIElement) {
    inherits(PageSize, _UIElement);

    function PageSize() {
        classCallCheck(this, PageSize);
        return possibleConstructorReturn(this, (PageSize.__proto__ || Object.getPrototypeOf(PageSize)).apply(this, arguments));
    }

    createClass(PageSize, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item size show'>\n                <div class='items'>\n                    <div>\n                        <label>   Width</label>\n                        \n                        <div>\n                            <input type='number' ref=\"$width\"> <span>" + UNIT_PX + "</span>\n                            <button type=\"button\" ref=\"$rect\">rect</button>\n                        </div>\n                    </div>\n                    <div>\n                        <label>Height</label>\n                        <div>\n                            <input type='number' ref=\"$height\"> <span>" + UNIT_PX + "</span>\n                        </div>\n                    </div>   \n                                 \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_PAGE_SIZE),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/page', function (item) {
                _this2.refs.$width.val(unitValue(item.width));
                _this2.refs.$height.val(unitValue(item.height));
            });
        }
    }, {
        key: CLICK('$rect'),
        value: function value$$1(e) {
            var _this3 = this;

            this.read('selection/current/page', function (item) {
                var newValue = {
                    id: item.id,
                    width: pxUnit(_this3.refs.$width.int())
                };

                newValue.height = newValue.width;

                _this3.commit(CHANGE_PAGE_SIZE, newValue);
            });
        }
    }, {
        key: INPUT('$width'),
        value: function value$$1() {
            var _this4 = this;

            this.read('selection/current/page/id', function (id) {
                _this4.commit(CHANGE_PAGE_SIZE, { id: id, width: pxUnit(_this4.refs.$width.int()) });
            });
        }
    }, {
        key: INPUT('$height'),
        value: function value$$1() {
            var _this5 = this;

            this.read('selection/current/page/id', function (id) {
                _this5.commit(CHANGE_PAGE_SIZE, { id: id, height: pxUnit(_this5.refs.$height.int()) });
            });
        }
    }]);
    return PageSize;
}(UIElement);

var PageName = function (_UIElement) {
    inherits(PageName, _UIElement);

    function PageName() {
        classCallCheck(this, PageName);
        return possibleConstructorReturn(this, (PageName.__proto__ || Object.getPrototypeOf(PageName)).apply(this, arguments));
    }

    createClass(PageName, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item name show'>\n                <div class='items'>            \n                    <div>\n                        <label>Name</label>\n                        <div>\n                            <input type='text' ref=\"$name\" style=\"width: 100px;\"> \n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/page', function (item) {
                var name = '';
                if (item) {
                    name = item.name;
                }

                _this2.refs.$name.val(name);
            });
        }
    }, {
        key: INPUT('$name'),
        value: function value() {
            var _this3 = this;

            this.read('selection/current/page/id', function (id) {
                _this3.commit(CHANGE_PAGE_NAME, { id: id, name: _this3.refs.$name.val() });
            });
        }
    }]);
    return PageName;
}(UIElement);

var PageExport = function (_UIElement) {
    inherits(PageExport, _UIElement);

    function PageExport() {
        classCallCheck(this, PageExport);
        return possibleConstructorReturn(this, (PageExport.__proto__ || Object.getPrototypeOf(PageExport)).apply(this, arguments));
    }

    createClass(PageExport, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item export'>\n                <div class='items no-padding'>\n                    <div>\n                        <label>Export</label>\n                        <button type=\"button\" ref=\"$exportCSS\">CSS</button>\n                    </div>   \n                                 \n                </div>\n            </div>\n        ";
        }
    }, {
        key: CLICK('$exportCSS'),
        value: function value(e) {
            this.emit('showExport');
        }
    }]);
    return PageExport;
}(UIElement);

var BlendList = function (_BasePropertyItem) {
    inherits(BlendList, _BasePropertyItem);

    function BlendList() {
        classCallCheck(this, BlendList);
        return possibleConstructorReturn(this, (BlendList.__proto__ || Object.getPrototypeOf(BlendList)).apply(this, arguments));
    }

    createClass(BlendList, [{
        key: 'template',
        value: function template() {
            return '\n        <div class=\'property-item blend\'>\n            <div class=\'title\' ref="$title">Blend Mode - <span class=\'description\' ref="$desc"></span></div>\n            <div class=\'items max-height\'>         \n                <div class="blend-list" ref="$blendList"></div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'onToggleShow',
        value: function onToggleShow() {
            this.refresh();
        }
    }, {
        key: LOAD('$blendList'),
        value: function value() {
            var _this2 = this;

            var list = this.read('blend/list');

            var item = this.read('selection/current/image');
            if (!item) {
                return '';
            }

            return '<div>' + list.map(function (blend) {

                var selected = blend == item.backgroundBlendMode ? 'selected' : '';
                return '\n                        <div class=\'blend-item ' + selected + '\' data-mode="' + blend + '">\n                            <div class="blend-item-view-container" style="background-image: url(/resources/image/grapes.jpg);background-blend-mode: ' + blend + ';">\n                                <div class="blend-item-blend-view"  style=\'' + _this2.read('blend/toStringWithoutDimensionForImage', item, blend) + '\'></div>\n                                <div class="blend-item-text">' + blend + '</div>\n                            </div>\n                        </div>';
            }).join('') + '</div>';
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/image');
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this3 = this;

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            this.read('selection/current/image', function (image) {
                _this3.refs.$desc.text(image.backgroundBlendMode || 'normal');
            });

            if (isShow && this.$el.hasClass('show')) {
                this.load();
            }
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_SELECTION),
        value: function value() {
            if (this.isPropertyShow()) {
                this.refresh();
            }
        }
    }, {
        key: CLICK('$blendList .blend-item') + SELF,
        value: function value(e) {
            var _this4 = this;

            this.read('selection/current/image/id', function (id) {
                _this4.commit(CHANGE_IMAGE, { id: id, backgroundBlendMode: e.$delegateTarget.attr('data-mode') }, true);
                _this4.refresh();
            });
        }
    }]);
    return BlendList;
}(BasePropertyItem);

var MixBlendList = function (_BasePropertyItem) {
    inherits(MixBlendList, _BasePropertyItem);

    function MixBlendList() {
        classCallCheck(this, MixBlendList);
        return possibleConstructorReturn(this, (MixBlendList.__proto__ || Object.getPrototypeOf(MixBlendList)).apply(this, arguments));
    }

    createClass(MixBlendList, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'property-item mix-blend-list\'>\n                <div class=\'title\' ref="$title">Mix Blend - <span class=\'description\' ref="$desc"></span></div>\n                <div class=\'items max-height\'>                    \n                    <div class=\'mix-blend-list blend-list-tab\'>\n                        <div class="blend-list" ref="$mixBlendList"></div>            \n                    </div>   \n                </div>\n            </div>\n        ';
        }
    }, {
        key: LOAD('$mixBlendList'),
        value: function value() {
            var _this2 = this;

            var list = this.read('blend/list');
            var item = this.read('selection/current/layer');
            if (!item) {
                return '';
            }

            return '<div>' + list.map(function (blend) {

                var selected = blend == item.mixBlendMode ? 'selected' : '';
                return '\n                        <div class=\'blend-item ' + selected + '\' data-mode="' + blend + '">\n                            <div class="blend-item-view-container">\n                                <div class="blend-item-blend-view"  style=\'' + _this2.read('blend/toStringWithoutDimension', item, blend) + '\'></div>\n                                <div class="blend-item-text">' + blend + '</div>\n                            </div>\n                        </div>';
            }).join('') + '</div>';
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            var image = this.read('selection/current/image');

            if (image) return false;

            return true;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this3 = this;

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow && this.parent.selectedTabId == 'mix') {
                this.load();

                this.read('selection/current/layer', function (layer) {
                    _this3.refs.$desc.text(layer.mixBlendMode);
                });
            }
        }
    }, {
        key: 'show',
        value: function show() {
            this.refresh();
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_EDITOR),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CLICK('$mixBlendList .blend-item') + SELF,
        value: function value(e) {
            var _this4 = this;

            this.read('selection/current/layer/id', function (id) {
                _this4.commit(CHANGE_LAYER, { id: id, mixBlendMode: e.$delegateTarget.attr('data-mode') }, true);
                _this4.refresh();
            });
        }
    }]);
    return MixBlendList;
}(BasePropertyItem);

var DROPSHADOW_FILTER_KEYS = ['filterDropshadowOffsetX', 'filterDropshadowOffsetY', 'filterDropshadowBlurRadius', 'filterDropshadowColor'];

var FilterList$1 = function (_BasePropertyItem) {
    inherits(FilterList, _BasePropertyItem);

    function FilterList() {
        classCallCheck(this, FilterList);
        return possibleConstructorReturn(this, (FilterList.__proto__ || Object.getPrototypeOf(FilterList)).apply(this, arguments));
    }

    createClass(FilterList, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item filters'>\n                <div class='title' ref=\"$title\">\n                    Filter\n                </div>\n                <div class='items no-padding'>                    \n                    <div class=\"filter-list\" ref=\"$filterList\">\n                        \n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "makeInputItem",
        value: function makeInputItem(key, viewObject, dataObject) {
            var _this2 = this;

            var value$$1 = dataObject[key] ? dataObject[key].value : undefined;

            if (viewObject.type == 'range') {
                if (isUndefined(value$$1)) {
                    value$$1 = viewObject.defaultValue;
                }

                return "\n                <div class='filter'>\n                    <span class=\"area\"></span>                \n                    <span class=\"checkbox\">\n                        <input type=\"checkbox\" " + (dataObject.checked ? "checked=\"checked\"" : '') + " data-key=\"" + key + "\" />\n                    </span>\n                    <span class='title' draggable=\"true\">" + viewObject.title + "</span>\n                    <span class='range'><input type=\"range\" min=\"" + viewObject.min + "\" max=\"" + viewObject.max + "\" step=\"" + viewObject.step + "\" value=\"" + value$$1 + "\" ref=\"" + key + "Range\" data-key=\"" + key + "\"/></span>\n                    <span class='input-value'><input type=\"number\" min=\"" + viewObject.min + "\" max=\"" + viewObject.max + "\" step=\"" + viewObject.step + "\" value=\"" + value$$1 + "\"  ref=\"" + key + "Number\" data-key=\"" + key + "\"/></span>\n                    <span class='unit'>" + unitString(viewObject.unit) + "</span>\n                </div>\n            ";
            } else if (viewObject.type == 'multi') {
                return "\n            <div class='filter'>\n                <span class=\"area\"></span>\n                <span class=\"checkbox\">\n                    <input type=\"checkbox\" " + (dataObject.checked ? "checked=\"checked\"" : '') + " data-key=\"" + key + "\" />\n                </span>\n                <span class='title long' draggable=\"true\">" + viewObject.title + "</span>\n            </div>\n            <div class='items'>\n                " + DROPSHADOW_FILTER_KEYS.map(function (subkey) {

                    var it = _this2.read('filter/get', subkey);
                    var value$$1 = isUndefined(dataObject[subkey]) ? it.defaultValue : unitValue(dataObject[subkey]);

                    if (isColorUnit(it)) {
                        return "\n                        <div>\n                            <span class='title'>" + it.title + "</span>\n                            <span class='color'>\n                                <span class=\"color-view drop-shadow\" ref=\"$dropShadowColor\" style=\"background-color: " + value$$1 + "\" data-key=\"" + subkey + "\" ></span>\n                                <span class=\"color-text\" ref=\"$dropShadowColorText\">" + value$$1 + "</span>\n                            </span>\n                        </div>\n                        ";
                    } else {

                        return "\n                        <div>\n                            <span class='title'>" + it.title + "</span>\n                            <span class='range'><input type=\"range\" min=\"" + it.min + "\" max=\"" + it.max + "\" step=\"" + it.step + "\" value=\"" + value$$1 + "\" ref=\"" + subkey + "Range\"  data-key=\"" + subkey + "\" /></span>\n                            <span class='input-value'><input type=\"number\" min=\"" + it.min + "\" max=\"" + it.max + "\" step=\"" + it.step + "\" value=\"" + value$$1 + "\" ref=\"" + subkey + "Number\" data-key=\"" + subkey + "\" /></span>\n                            <span class='unit'>" + unitString(it.unit) + "</span>\n                        </div>\n                        ";
                    }
                }).join('') + "\n            </div>\n            ";
            }

            return "<div></div>";
        }
    }, {
        key: LOAD('$filterList'),
        value: function value$$1() {
            var _this3 = this;

            var layer = this.read('selection/current/layer');

            if (!layer) return '';

            var filterKeys = this.read('filter/list', layer.id);

            return filterKeys.map(function (key) {
                var realKey = key;
                var viewObject = _this3.read('filter/get', realKey);
                var dataObject = layer || {};
                return "\n                <div class='filter-item'>\n                    <div class=\"filter-item-input\">\n                        " + _this3.makeInputItem(realKey, viewObject, dataObject) + "\n                    </div>\n                </div>";
            });
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_FILTER, CHANGE_LAYER),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "isShow",
        value: function isShow() {
            return true;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.load();
        }
    }, {
        key: "updateFilterKeyValue",
        value: function updateFilterKeyValue(key, lastValue) {
            var _this4 = this;

            this.read('selection/current/layer', function (layer) {
                var id = layer.id;
                var value$$1 = layer[key] || _this4.read('clone', FILTER_DEFAULT_OBJECT[key]);
                value$$1.value = lastValue;

                _this4.commit(CHANGE_LAYER_FILTER, defineProperty({ id: id }, key, value$$1));
            });
        }
    }, {
        key: "updateFilterKeyChecked",
        value: function updateFilterKeyChecked(key, checked) {
            var _this5 = this;

            this.read('selection/current/layer', function (layer) {
                var id = layer.id;
                var value$$1 = layer[key] || _this5.read('clone', FILTER_DEFAULT_OBJECT[key]);
                value$$1.checked = checked;

                _this5.commit(CHANGE_LAYER_FILTER, defineProperty({ id: id }, key, value$$1));
            });
        }
    }, {
        key: CLICK('$filterList input[type=checkbox]'),
        value: function value$$1(e) {
            var $check = e.$delegateTarget;
            var key = $check.attr('data-key');
            this.updateFilterKeyChecked(key, $check.checked());
        }
    }, {
        key: CHANGEINPUT('$filterList input[type=range]'),
        value: function value$$1(e) {
            var $range = e.$delegateTarget;
            var key = $range.attr('data-key');
            this.refs[key + "Number"].val($range.val());
            this.updateFilterKeyValue(key, $range.val());
        }
    }, {
        key: INPUT('$filterList input[type=number]'),
        value: function value$$1(e) {
            var $number = e.$delegateTarget;
            var key = $number.attr('data-key');
            this.refs[key + "Range"].val($number.val());
            this.updateFilterKeyValue(key, $number.val());
        }
    }, {
        key: CLICK('$el .drop-shadow'),
        value: function value$$1(e) {
            var color$$1 = e.$delegateTarget.css('background-color');
            this.emit('selectFillColor', color$$1, this.updateDropShadowColor.bind(this));
        }
    }, {
        key: "updateDropShadowColor",
        value: function updateDropShadowColor(color$$1) {
            this.refs.$dropShadowColor.css('background-color', color$$1);
            this.refs.$dropShadowColorText.text(color$$1);

            var key = this.refs.$dropShadowColor.attr('data-key');

            this.updateFilterKeyValue(key, color$$1);
        }
    }]);
    return FilterList;
}(BasePropertyItem);

var BackgroundColor = function (_BasePropertyItem) {
    inherits(BackgroundColor, _BasePropertyItem);

    function BackgroundColor() {
        classCallCheck(this, BackgroundColor);
        return possibleConstructorReturn(this, (BackgroundColor.__proto__ || Object.getPrototypeOf(BackgroundColor)).apply(this, arguments));
    }

    createClass(BackgroundColor, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item background-color show'>\n                <div class='title' ref=\"$title\">Background Color</div>            \n                <div class='items'>            \n                    <div>\n                        <div style='cursor:pointer;' ref=\"$colorview\" title=\"Click me!!\">\n                            <span class='color' ref=\"$color\"></span>\n                            <span class='color-text' ref=\"$colortext\"></span>\n                        </div>\n                    </div> \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT(CHANGE_LAYER_BACKGROUND_COLOR),
        value: function value(newValue) {
            this.refs.$color.css('background-color', newValue.backgroundColor);
            this.refs.$colortext.text(newValue.backgroundColor);
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {
                _this2.refs.$color.css('background-color', layer.backgroundColor);
                _this2.refs.$colortext.text(layer.backgroundColor);
            });
        }
    }, {
        key: CLICK('$colorview'),
        value: function value() {
            this.emit('toggleLayerColorPicker');
        }
    }]);
    return BackgroundColor;
}(BasePropertyItem);

var LayerColorPickerLayer = function (_UIElement) {
    inherits(LayerColorPickerLayer, _UIElement);

    function LayerColorPickerLayer() {
        classCallCheck(this, LayerColorPickerLayer);
        return possibleConstructorReturn(this, (LayerColorPickerLayer.__proto__ || Object.getPrototypeOf(LayerColorPickerLayer)).apply(this, arguments));
    }

    createClass(LayerColorPickerLayer, [{
        key: 'afterRender',
        value: function afterRender() {
            var _this2 = this;

            var layer = this.read('selection/current/layer');

            var defaultColor = layer ? layer.backgroundColor : 'rgba(0, 0, 0, 0)';

            this.colorPicker = ColorPicker.create({
                type: 'xd',
                position: 'inline',
                container: this.$el.el,
                color: defaultColor,
                onChange: function onChange(c) {
                    _this2.changeColor(c);
                }
            });

            setTimeout(function () {
                _this2.colorPicker.dispatch('initColor', defaultColor);
            }, 100);
        }
    }, {
        key: 'template',
        value: function template() {
            return '<div class=\'colorpicker-layer\'> </div>';
        }
    }, {
        key: 'changeColor',
        value: function changeColor(color) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_BACKGROUND_COLOR, { id: id, backgroundColor: color });
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER_BACKGROUND_COLOR, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this4 = this;

            if (this.read('selection/is/layer')) {
                this.read('selection/current/layer', function (layer) {
                    if (layer.backgroundColor) {
                        if (layer.backgroundColor.includes('rgb')) return;
                        _this4.colorPicker.initColorWithoutChangeEvent(layer.backgroundColor);
                    }
                });
            }
        }
    }]);
    return LayerColorPickerLayer;
}(UIElement);

var LayerColorPickerPanel = function (_UIElement) {
    inherits(LayerColorPickerPanel, _UIElement);

    function LayerColorPickerPanel() {
        classCallCheck(this, LayerColorPickerPanel);
        return possibleConstructorReturn(this, (LayerColorPickerPanel.__proto__ || Object.getPrototypeOf(LayerColorPickerPanel)).apply(this, arguments));
    }

    createClass(LayerColorPickerPanel, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item layer-colorpicker show'>\n                <div class='title' ref=\"$title\">Background Color</div>\n                <div class='items'>            \n                    <LayerColorPicker></LayerColorPicker>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { LayerColorPicker: LayerColorPickerLayer };
        }
    }]);
    return LayerColorPickerPanel;
}(UIElement);

var ImageResource = function (_BasePropertyItem) {
    inherits(ImageResource, _BasePropertyItem);

    function ImageResource() {
        classCallCheck(this, ImageResource);
        return possibleConstructorReturn(this, (ImageResource.__proto__ || Object.getPrototypeOf(ImageResource)).apply(this, arguments));
    }

    createClass(ImageResource, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item image-resource show'>\n                <div class='title'>Image Resource</div>            \n                <div class='items' ref=\"$imageList\">\n\n                </div>\n            </div>\n        ";
        }
    }, {
        key: LOAD('$imageList'),
        value: function value() {
            return this.read('svg/list').map(function (svg, index) {
                if (isObject(svg)) {
                    return "<div class='svg-item' data-key=\"" + svg.key + "\">" + svg.svg + "</div>";
                } else {
                    return "<div class='svg-item' data-index=\"" + index + "\">" + svg + "</div>";
                }
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.$el.toggle(this.isShow());
            this.load();
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: EVENT('changeSvgList'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('selectImage'),
        value: function value() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/image');

            if (!item) return false;

            return this.read('image/type/isImage', item.type);
        }
    }, {
        key: CLICK('$imageList .svg-item'),
        value: function value(e) {
            var _this2 = this;

            var _e$$delegateTarget$at = e.$delegateTarget.attrs('data-index', 'data-key'),
                _e$$delegateTarget$at2 = slicedToArray(_e$$delegateTarget$at, 2),
                index = _e$$delegateTarget$at2[0],
                key = _e$$delegateTarget$at2[1];

            if (index) {
                this.read('selection/current/image', function (image) {
                    var file = _this2.read('svg/get/blob', +index);
                    _this2.read('image/get/blob', [file], function (newImage) {
                        _this2.dispatch('item/set/image/file', image.id, newImage);
                    });
                });
            } else if (key) {

                this.read('selection/current/image', function (image) {
                    var file = _this2.read('svg/get/blob', Number.MAX_SAFE_INTEGER, key);
                    _this2.read('image/get/blob', [file], function (newImage) {
                        _this2.dispatch('item/set/image/file', image.id, newImage);
                    });
                });
            }
        }
    }]);
    return ImageResource;
}(BasePropertyItem);

var CLIP_PATH_TYPES = [CLIP_PATH_TYPE_NONE, CLIP_PATH_TYPE_CIRCLE, CLIP_PATH_TYPE_ELLIPSE, CLIP_PATH_TYPE_INSET, CLIP_PATH_TYPE_POLYGON, CLIP_PATH_TYPE_SVG];

var ClipPath = function (_BasePropertyItem) {
    inherits(ClipPath, _BasePropertyItem);

    function ClipPath() {
        classCallCheck(this, ClipPath);
        return possibleConstructorReturn(this, (ClipPath.__proto__ || Object.getPrototypeOf(ClipPath)).apply(this, arguments));
    }

    createClass(ClipPath, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item clip-path show'>\n                <div class='title' ref=\"$title\">Clip Path</div>\n                <div class='items'>            \n                    <div>\n                        <label>View editor</label>\n                        <div >\n                            <label><input type=\"checkbox\" ref=\"$showClipPathEditor\" /> show clip path editor</label>\n                        </div>\n                    </div>                       \n\n                    <div>\n                        <label>Type</label>\n                        <div >\n                            <select ref=\"$clipType\">\n                                " + CLIP_PATH_TYPES.map(function (type) {
                return "<option value=\"" + type + "\">" + type + "</option>";
            }).join('') + "\n                            </select>\n                        </div>\n                    </div>                       \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_EDITOR, CHANGE_SELECTION
        // CHANGE_LAYER_CLIPPATH
        ),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {
                _this2.refs.$showClipPathEditor.checked(layer.showClipPathEditor);
                _this2.refs.$clipType.val(layer.clipPathType || CLIP_PATH_TYPE_NONE);
            });
        }
    }, {
        key: CHANGE('$clipType'),
        value: function value() {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_CLIPPATH, {
                    id: id,
                    clipPathType: _this3.refs.$clipType.val()
                });
            });
        }
    }, {
        key: CLICK('$showClipPathEditor'),
        value: function value() {
            var _this4 = this;

            this.read('selection/current/layer/id', function (id) {
                _this4.commit(CHANGE_LAYER_CLIPPATH, {
                    id: id,
                    showClipPathEditor: _this4.refs.$showClipPathEditor.checked()
                });
            });
        }
    }]);
    return ClipPath;
}(BasePropertyItem);

var PageShowGrid = function (_UIElement) {
    inherits(PageShowGrid, _UIElement);

    function PageShowGrid() {
        classCallCheck(this, PageShowGrid);
        return possibleConstructorReturn(this, (PageShowGrid.__proto__ || Object.getPrototypeOf(PageShowGrid)).apply(this, arguments));
    }

    createClass(PageShowGrid, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item hidden'>\n                <div class='items'>            \n                    <div>\n                        <label>Show Grid</label>\n                        <div>\n                            <input type='checkbox' ref=\"$check\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT('changeTool'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/page', function (item) {
                _this2.refs.$check.checked(_this2.read('tool/get', 'show.grid'));
            });
        }
    }, {
        key: CLICK('$check'),
        value: function value() {
            var _this3 = this;

            this.read('selection/current/page', function (item) {
                _this3.run('tool/set', 'show.grid', _this3.refs.$check.checked());
                _this3.dispatch('tool/set', 'snap.grid', _this3.refs.$check.checked());
            });
        }
    }]);
    return PageShowGrid;
}(UIElement);

var GroupAlign = function (_BasePropertyItem) {
    inherits(GroupAlign, _BasePropertyItem);

    function GroupAlign() {
        classCallCheck(this, GroupAlign);
        return possibleConstructorReturn(this, (GroupAlign.__proto__ || Object.getPrototypeOf(GroupAlign)).apply(this, arguments));
    }

    createClass(GroupAlign, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item group-align show'>\n                <div class='items'>            \n                    <div>\n                        <div>\n                            <button type=\"button\" title=\"left\" data-value=\"left\"></button>\n                            <button type=\"button\" title=\"center\" data-value=\"center\"></button>\n                            <button type=\"button\" title=\"right\" data-value=\"right\"></button>\n                            <button type=\"button\" title=\"top\" data-value=\"top\"></button>\n                            <button type=\"button\" title=\"middle\" data-value=\"middle\"></button>\n                            <button type=\"button\" title=\"bottom\" data-value=\"bottom\"></button>\n                            <button type=\"button\" title=\"vertical\" data-value=\"vertical\"></button>\n                            <button type=\"button\" title=\"horizontal\" data-value=\"horizontal\"></button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: CLICK('$el button'),
        value: function value(e) {
            this.dispatch('ordering/type', e.$delegateTarget.attr('data-value'));
        }
    }]);
    return GroupAlign;
}(BasePropertyItem);

var BackgroundBlend = function (_BasePropertyItem) {
    inherits(BackgroundBlend, _BasePropertyItem);

    function BackgroundBlend() {
        classCallCheck(this, BackgroundBlend);
        return possibleConstructorReturn(this, (BackgroundBlend.__proto__ || Object.getPrototypeOf(BackgroundBlend)).apply(this, arguments));
    }

    createClass(BackgroundBlend, [{
        key: 'template',
        value: function template() {
            return '\n        <div class=\'property-item blend show\'>\n            <div class=\'items max-height\'>         \n                <div>\n                    <label>Blend</label>\n                    <div class=\'size-list\' ref="$size">\n                        <select ref="$blend">\n                        ' + this.read('blend/list').map(function (blend) {
                return '<option value="' + blend + '">' + blend + '</option>';
            }).join('') + '\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/image');
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/image', function (image) {
                _this2.refs.$blend.val(image.backgroundBlendMode);
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CHANGE('$blend'),
        value: function value(e) {
            var _this3 = this;

            this.read('selection/current/image/id', function (id) {
                _this3.commit(CHANGE_IMAGE, { id: id, backgroundBlendMode: _this3.refs.$blend.val() }, true);
            });
        }
    }]);
    return BackgroundBlend;
}(BasePropertyItem);

var LayerBlend = function (_BasePropertyItem) {
    inherits(LayerBlend, _BasePropertyItem);

    function LayerBlend() {
        classCallCheck(this, LayerBlend);
        return possibleConstructorReturn(this, (LayerBlend.__proto__ || Object.getPrototypeOf(LayerBlend)).apply(this, arguments));
    }

    createClass(LayerBlend, [{
        key: 'template',
        value: function template() {
            return '\n        <div class=\'property-item blend show\'>\n            <div class=\'items max-height\'>         \n                <div>\n                    <label>Blend</label>\n                    <div class=\'size-list\' ref="$size">\n                        <select ref="$blend">\n                        ' + this.read('blend/list').map(function (blend) {
                return '<option value="' + blend + '">' + blend + '</option>';
            }).join('') + '\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/layer');
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {
                _this2.refs.$blend.val(layer.mixBlendMode);
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CHANGE('$blend'),
        value: function value(e) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER, { id: id, mixBlendMode: _this3.refs.$blend.val() });
            });
        }
    }]);
    return LayerBlend;
}(BasePropertyItem);

var Rotate = function (_BasePropertyItem) {
    inherits(Rotate, _BasePropertyItem);

    function Rotate() {
        classCallCheck(this, Rotate);
        return possibleConstructorReturn(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).apply(this, arguments));
    }

    createClass(Rotate, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item rotate show'>\n                <div class='items'>            \n                    <div>\n                        <label>Rotate</label>\n                        <div>\n                            <input type='range' ref=\"$rotateRange\" min=\"-360\" max=\"360\" step=\"0.1\">\n                            <input type='number' ref=\"$rotate\" min=\"-360\" max=\"360\" step=\"0.1\"> <span>\xB0</span>\n                        </div>\n                    </div>                                                                           \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_LAYER_ROTATE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (item) {
                _this2.refs.$rotateRange.val(item.rotate || "0");
                _this2.refs.$rotate.val(item.rotate || "0");
            });
        }
    }, {
        key: "updateTransform",
        value: function updateTransform(type) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {

                if (type == 'rotate') {
                    _this3.commit(CHANGE_LAYER_TRANSFORM, { id: id, rotate: _this3.refs.$rotate.val() });
                    _this3.refs.$rotateRange.val(_this3.refs.$rotate.val());
                } else if (type == 'range') {
                    _this3.commit(CHANGE_LAYER_TRANSFORM, { id: id, rotate: _this3.refs.$rotateRange.val() });
                    _this3.refs.$rotate.val(_this3.refs.$rotateRange.val());
                }
            });
        }
    }, {
        key: INPUT('$rotateRange'),
        value: function value() {
            this.updateTransform('range');
        }
    }, {
        key: INPUT('$rotate'),
        value: function value() {
            this.updateTransform('rotate');
        }
    }]);
    return Rotate;
}(BasePropertyItem);

var RadiusFixed = function (_BasePropertyItem) {
    inherits(RadiusFixed, _BasePropertyItem);

    function RadiusFixed() {
        classCallCheck(this, RadiusFixed);
        return possibleConstructorReturn(this, (RadiusFixed.__proto__ || Object.getPrototypeOf(RadiusFixed)).apply(this, arguments));
    }

    createClass(RadiusFixed, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item fixed-radius'>\n                <div class='items'>            \n                    <div>\n                        <label > <button type=\"button\" ref=\"$radiusLabel\">*</button> Radius</label>\n                        <div>\n                            <input type='range' ref=\"$radiusRange\" min=\"0\" max=\"360\">\n                            <input type='number' ref=\"$radius\" min=\"0\" max=\"360\"> <span>px</span>\n                        </div>\n                    </div>                                                                           \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_LAYER_RADIUS, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            var isShow = this.isShow();

            this.$el.toggleClass('show', isShow);

            if (isShow) {

                this.read('selection/current/layer', function (item) {
                    var radius = defaultValue(string2unit(item.borderRadius), pxUnit(0));
                    _this2.refs.$radiusRange.val(radius.value);
                    _this2.refs.$radius.val(radius.value);
                });
            }
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var layer = this.read('selection/current/layer');

            if (!layer) return false;
            if (layer.type == ITEM_TYPE_CIRCLE) return false;

            return true;
        }
    }, {
        key: "updateTransform",
        value: function updateTransform(type) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {

                if (type == 'radius') {
                    _this3.commit(CHANGE_LAYER_RADIUS, {
                        id: id,
                        fixedRadius: true,
                        borderRadius: pxUnit(_this3.refs.$radius.val())
                    });
                    _this3.refs.$radiusRange.val(_this3.refs.$radius.val());
                } else if (type == 'range') {
                    _this3.commit(CHANGE_LAYER_RADIUS, {
                        id: id,
                        fixedRadius: true,
                        borderRadius: pxUnit(_this3.refs.$radiusRange.val())
                    });
                    _this3.refs.$radius.val(_this3.refs.$radiusRange.val());
                }
            });
        }
    }, {
        key: INPUT('$radiusRange'),
        value: function value$$1() {
            this.updateTransform('range');
        }
    }, {
        key: INPUT('$radius'),
        value: function value$$1() {
            this.updateTransform('radius');
        }
    }, {
        key: CLICK('$radiusLabel'),
        value: function value$$1() {
            this.emit('toggleRadius');
        }
    }]);
    return RadiusFixed;
}(BasePropertyItem);

var Opacity$3 = function (_BasePropertyItem) {
    inherits(Opacity, _BasePropertyItem);

    function Opacity() {
        classCallCheck(this, Opacity);
        return possibleConstructorReturn(this, (Opacity.__proto__ || Object.getPrototypeOf(Opacity)).apply(this, arguments));
    }

    createClass(Opacity, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item opacity show'>\n                <div class='items'>            \n                    <div>\n                        <label>Opacity</label>\n                        <div>\n                            <input type='range' ref=\"$opacityRange\" min=\"0\" max=\"1\" step=\"0.01\">\n                            <input type='number' ref=\"$opacity\" min=\"0\" max=\"1\" step=\"0.01\">\n                        </div>\n                    </div>                                                                           \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_LAYER_OPACITY, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (item) {
                _this2.refs.$opacityRange.val(item.opacity || "1");
                _this2.refs.$opacity.val(item.opacity || "1");
            });
        }
    }, {
        key: "updateTransform",
        value: function updateTransform(type) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {

                if (type == 'opacity') {
                    _this3.commit(CHANGE_LAYER_TRANSFORM, { id: id, opacity: _this3.refs.$opacity.val() });
                    _this3.refs.$opacityRange.val(_this3.refs.$opacity.val());
                } else if (type == 'range') {
                    _this3.commit(CHANGE_LAYER_TRANSFORM, { id: id, opacity: _this3.refs.$opacityRange.val() });
                    _this3.refs.$opacity.val(_this3.refs.$opacityRange.val());
                }
            });
        }
    }, {
        key: INPUT('$opacityRange'),
        value: function value() {
            this.updateTransform('range');
        }
    }, {
        key: INPUT('$opacity'),
        value: function value() {
            this.updateTransform('opacity');
        }
    }]);
    return Opacity;
}(BasePropertyItem);

var ClipPathSVG = function (_BasePropertyItem) {
    inherits(ClipPathSVG, _BasePropertyItem);

    function ClipPathSVG() {
        classCallCheck(this, ClipPathSVG);
        return possibleConstructorReturn(this, (ClipPathSVG.__proto__ || Object.getPrototypeOf(ClipPathSVG)).apply(this, arguments));
    }

    createClass(ClipPathSVG, [{
        key: "initialize",
        value: function initialize() {
            get$1(ClipPathSVG.prototype.__proto__ || Object.getPrototypeOf(ClipPathSVG.prototype), "initialize", this).call(this);

            this.count = 0;
        }
    }, {
        key: "template",
        value: function template() {
            return "\n            <div class='property-item clip-path-svg show'>\n\n                <div class='items'>\n                    <div>\n                        <label>Fit Size</label>\n                        <div >\n                            <label><input type=\"checkbox\" ref=\"$fit\" /> fit to layer</label>\n                        </div>\n                    </div>                \n                    <div>\n                        <label>Clip</label>\n                        <div class='clip-path-container' ref=\"$clipPath\" title=\"Click me!!\">\n\n                        </div>\n                    </div>                            \n                    <div class='image-resource' ref=\"$imageList\"></div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: LOAD('$imageList'),
        value: function value() {
            return this.read('svg/list').map(function (svg, index) {
                if (isObject(svg)) {
                    return "<div class='svg-item' data-key=\"" + svg.key + "\">" + svg.svg + "</div>";
                } else {
                    return "<div class='svg-item' data-index=\"" + index + "\">" + svg + "</div>";
                }
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggleClass('show', isShow);

            if (isShow) {

                if (this.count < 4) {
                    this.load();
                    this.count++;
                }

                this.updateView();
            }
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/layer');

            if (!item) return false;

            if (item.clipPathType == CLIP_PATH_TYPE_SVG) return true;
        }
    }, {
        key: CLICK('$clipPath'),
        value: function value() {
            this.emit('toggleClipPathImageList');
        }
    }, {
        key: CLICK('$fit'),
        value: function value() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {

                _this2.commit(CHANGE_LAYER_CLIPPATH, { id: layer.id, fitClipPathSize: _this2.refs.$fit.checked() });
                _this2.refresh();
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_SELECTION, CHANGE_LAYER_CLIPPATH),
        value: function value(_value) {
            this.refresh();
        }
    }, {
        key: "updateView",
        value: function updateView() {
            var _this3 = this;

            this.read('selection/current/layer', function (layer) {
                _this3.refs.$clipPath.html(defaultValue(layer.clipPathSvg, ''));
                _this3.refs.$fit.checked(defaultValue(layer.fitClipPathSize, false));
            });
        }
    }, {
        key: EVENT('changeSvgList'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('toggleClipPathSVG'),
        value: function value(isShow) {
            if (isUndefined(isShow)) {
                this.$el.toggleClass('show');
            } else {
                this.$el.toggleClass('show', isShow);
            }

            if (this.$el.hasClass('show')) {
                this.refresh();
            }
        }
    }, {
        key: "setClipPathSvg",
        value: function setClipPathSvg(id, svg, callback) {
            var newValue = {
                id: id,
                clipPathType: 'svg',
                clipPathSvg: svg
            };

            var $temp = new Dom('div');
            $temp.html(svg);

            var $svg = $temp.$("svg");

            var width = 0;
            var height = 0;
            if ($svg.attr('width')) {
                width = parseParamNumber$1($svg.attr('width'));
            }

            if ($svg.attr('height')) {
                height = parseParamNumber$1($svg.attr('height'));
            }

            if ($svg.attr('viewBox')) {
                var box = $svg.attr('viewBox').split(' ');

                width = parseParamNumber$1(box[2]);
                height = parseParamNumber$1(box[3]);
            }

            newValue.clipPathSvgWidth = width;
            newValue.clipPathSvgHeight = height;

            $temp.remove();

            callback && callback(newValue);
        }
    }, {
        key: CLICK('$imageList .svg-item'),
        value: function value(e) {
            var _this4 = this;

            var index = e.$delegateTarget.attr('data-index');
            var key = e.$delegateTarget.attr('data-key');

            if (index) {
                this.read('selection/current/layer/id', function (id) {
                    var svg = _this4.read('svg/get', +index);

                    _this4.setClipPathSvg(id, svg, function (newValue) {
                        _this4.commit(CHANGE_LAYER, newValue);
                        _this4.updateView();
                    });
                });
            } else if (key) {

                this.read('selection/current/layer/id', function (id) {
                    var svg = _this4.read('svg/get', Number.MAX_SAFE_INTEGER, key);

                    _this4.setClipPathSvg(id, svg, function (newValue) {
                        _this4.commit(CHANGE_LAYER, newValue);
                        _this4.updateView();
                    });
                });
            }
        }
    }]);
    return ClipPathSVG;
}(BasePropertyItem);

var CLIP_PATH_SIDE_TYPES = [CLIP_PATH_SIDE_TYPE_NONE, CLIP_PATH_SIDE_TYPE_CLOSEST, CLIP_PATH_SIDE_TYPE_FARTHEST];

var ClipPathSide = function (_BasePropertyItem) {
    inherits(ClipPathSide, _BasePropertyItem);

    function ClipPathSide() {
        classCallCheck(this, ClipPathSide);
        return possibleConstructorReturn(this, (ClipPathSide.__proto__ || Object.getPrototypeOf(ClipPathSide)).apply(this, arguments));
    }

    createClass(ClipPathSide, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item clip-path-side'>\n                <div class='items'>            \n                    <div>\n                        <label>Side</label>\n                        <div >\n                            <select ref=\"$clipSideType\">\n                                " + CLIP_PATH_SIDE_TYPES.map(function (type) {
                return "<option value=\"" + type + "\">" + type + "</option>";
            }).join('') + "\n                            </select>\n                        </div>\n                    </div>                                                    \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_CLIPPATH),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            var isShow = this.isShow();

            this.$el.toggleClass('show', isShow);

            if (isShow) {

                this.read('selection/current/layer', function (layer) {
                    _this2.refs.$clipSideType.val(layer.clipPathSideType || CLIP_PATH_SIDE_TYPE_NONE);
                });
            }
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/layer');

            if (!item) return false;

            if (item.clipPathType == CLIP_PATH_TYPE_CIRCLE) return true;
            if (item.clipPathType == CLIP_PATH_TYPE_ELLIPSE) return true;
        }
    }, {
        key: EVENT('toggleClipPathSideType'),
        value: function value() {
            this.$el.toggleClass('show');
        }
    }, {
        key: CHANGE('$clipSideType'),
        value: function value() {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_CLIPPATH, {
                    id: id,
                    clipPathSideType: _this3.refs.$clipSideType.val()
                });
            });
        }
    }]);
    return ClipPathSide;
}(BasePropertyItem);

var ClipPathPolygon = function (_BasePropertyItem) {
    inherits(ClipPathPolygon, _BasePropertyItem);

    function ClipPathPolygon() {
        classCallCheck(this, ClipPathPolygon);
        return possibleConstructorReturn(this, (ClipPathPolygon.__proto__ || Object.getPrototypeOf(ClipPathPolygon)).apply(this, arguments));
    }

    createClass(ClipPathPolygon, [{
        key: "template",
        value: function template() {
            var list = this.read('clip-path/sample/list');

            return "\n            <div class='property-item clip-path-polygon'>\n                <div class=\"items\">\n                    <div>\n                        Click panel with alt if you want to add point\n                    </div>\n                    <div>\n                        Click drag item with alt if you want to delete point\n                    </div>                    \n                </div>\n                <div class='items' ref='$sampleList'>" + list.map(function (it, index) {
                var values = it.clipPathPolygonPoints.map(function (point) {
                    return stringUnit(point.x) + " " + stringUnit(point.y);
                }).join(', ');
                return "<div class='clip-path-item' data-index='" + index + "' style='clip-path: polygon(" + values + ")'></div>";
            }).join('') + "</div> \n                <div class='items' ref='$polygonList'></div>\n            </div>\n        ";
        }
    }, {
        key: LOAD('$polygonList'),
        value: function value$$1() {
            var layer = this.read('selection/current/layer');
            if (!layer) return '';
            var points = defaultValue(layer.clipPathPolygonPoints, []);
            if (!points.length) return '';

            var startIndex = 0;
            var lastIndex = points.length - 1;

            return points.map(function (p, index) {

                var start = index == startIndex ? 'start' : '';
                var end = index == lastIndex ? 'end' : '';

                return "\n                <div class=\"polygon-item " + start + " " + end + "\" data-index=\"" + index + "\" >\n                    <div class='area'></div>\n                    <label>X</label>\n                    <div>\n                        <input type=\"number\" data-index=\"" + index + "\" data-key='x' value=\"" + unitValue(p.x) + "\" />\n                        " + unitString(p.x.unit) + "\n                    </div>\n                    <label>Y</label>\n                    <div>\n                        <input type=\"number\" data-index=\"" + index + "\" data-key='y' value=\"" + unitValue(p.y) + "\" />\n                        " + unitString(p.y.unit) + "\n                    </div>\n                    <div class='tools'>\n                        <button type=\"button\" data-key='delete' data-index=\"" + index + "\">&times;</button>\n                        <button type=\"button\" data-key='copy' data-index=\"" + index + "\">+</button>\n                    </div>\n                </div>\n            ";
            });
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER_CLIPPATH_POLYGON),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: EVENT(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION),
        value: function value$$1(newValue) {
            this.refreshPolygonPosition(newValue);
        }
    }, {
        key: "refreshPolygonPosition",
        value: function refreshPolygonPosition(item) {
            var index = item.polygonIndex;
            var pos = item.clipPathPolygonPoints[index];

            var x = this.refs.$polygonList.$("[data-key=\"x\"][data-index=\"" + index + "\"]");
            if (x) {
                x.val(unitValue(pos.x));
            }

            var y = this.refs.$polygonList.$("[data-key=\"y\"][data-index=\"" + index + "\"]");
            if (y) {
                y.val(unitValue(pos.y));
            }
        }
    }, {
        key: "refresh",
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggleClass('show', isShow);

            if (isShow) {

                this.load();
            }
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/layer');

            if (!item) return false;

            return item.clipPathType == CLIP_PATH_TYPE_POLYGON;
        }
    }, {
        key: EVENT('toggleClipPathPolygon'),
        value: function value$$1(isShow) {

            if (isUndefined(isShow)) {
                this.$el.toggleClass('show');
            } else {
                this.$el.toggleClass('show', isShow);
            }
        }
    }, {
        key: CLICK('$polygonList button[data-key]'),
        value: function value$$1(e) {
            var _this2 = this;

            var $item = e.$delegateTarget;
            var polygonIndex = +$item.attr('data-index');
            var key = $item.attr('data-key');
            if (key == 'delete') {
                this.read('selection/current/layer', function (layer) {
                    var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                    clipPathPolygonPoints.splice(polygonIndex, 1);

                    _this2.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {
                        id: layer.id,
                        clipPathPolygonPoints: clipPathPolygonPoints
                    });

                    _this2.refresh();
                });
            } else if (key == 'copy') {
                this.read('selection/current/layer', function (layer) {
                    var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                    var copyItem = clipPathPolygonPoints[polygonIndex];

                    clipPathPolygonPoints.splice(polygonIndex, 0, copyItem);

                    _this2.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {
                        id: layer.id,
                        clipPathPolygonPoints: clipPathPolygonPoints
                    });
                    _this2.refresh();
                });
            }
        }
    }, {
        key: CHANGEINPUT('$polygonList input[type=number]'),
        value: function value$$1(e) {
            var _this3 = this;

            var $item = e.$delegateTarget;

            var polygonIndex = +$item.attr('data-index');
            var key = $item.attr('data-key');
            var value$$1 = +$item.val();

            this.read('selection/current/layer', function (layer) {
                var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                clipPathPolygonPoints[polygonIndex][key] = percentUnit(value$$1);

                _this3.commit(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION, {
                    id: layer.id,
                    polygonIndex: polygonIndex,
                    clipPathPolygonPoints: clipPathPolygonPoints
                });
            });
        }
    }, {
        key: CLICK('$sampleList .clip-path-item'),
        value: function value$$1(e) {
            var _this4 = this;

            var $item = e.$delegateTarget;
            var index = +$item.attr('data-index');
            var points = this.read('clip-path/sample/get', index);

            this.read('selection/current/layer/id', function (id) {

                _this4.commit(CHANGE_LAYER_CLIPPATH_POLYGON, _extends({ id: id }, points));
                _this4.refresh();
            });
        }
    }]);
    return ClipPathPolygon;
}(BasePropertyItem);

var BoxShadow = function (_BasePropertyItem) {
    inherits(BoxShadow, _BasePropertyItem);

    function BoxShadow() {
        classCallCheck(this, BoxShadow);
        return possibleConstructorReturn(this, (BoxShadow.__proto__ || Object.getPrototypeOf(BoxShadow)).apply(this, arguments));
    }

    createClass(BoxShadow, [{
        key: 'template',
        value: function template() {
            return '\n        <div class=\'property-item box-shadow show\'>\n            <div class=\'title\' ref="$title">\n                Box Shadow \n                <span style="float:right;">\n                    <button type="button" ref="$add">+</button>\n                </span>\n            </div>\n            <div class=\'items\'>         \n                <div class="box-shadow-list" ref="$boxShadowList"></div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'makeField',
        value: function makeField() {
            return '\n        <div class=\'box-shadow-item label\'>  \n                <div class="color"></div>\n                <div class="select">\n                    <label>Inset</label>\n                </div>                      \n                <div class="input">\n                    <input class="x" type="text" value="X" />\n                </div>                \n                <div class="input">\n                    <input class="y" type="text" value="Y" />\n                </div>\n                <div class="input">\n                    <input class="blur" type="text" value="B" />\n                </div>\n                <div class="input">\n                    <input class="spread" type="text" value="S" />\n                </div>  \n                <button type="button">X</button>                                              \n            </div>\n    ';
        }
    }, {
        key: 'makeItemNodeBoxShadow',
        value: function makeItemNodeBoxShadow(item) {

            var offsetX = unitValue(item.offsetX);
            var offsetY = unitValue(item.offsetY);
            var blurRadius = unitValue(item.blurRadius);
            var spreadRadius = unitValue(item.spreadRadius);

            var checked = this.read('selection/check', item.id) ? 'checked' : '';

            return '\n            <div class=\'box-shadow-item ' + checked + '\' box-shadow-id="' + item.id + '">  \n                <div class="color" style="background-color: ' + item.color + ';"></div>\n                <div class="select">\n                    <label><input type="checkbox" ' + (item.inset ? 'checked="checked"' : '') + '/></label>\n                </div>                          \n                <div class="input">\n                    <input type="number" min="-100" max="100" data-type=\'offsetX\' value="' + offsetX + '" />\n                </div>                \n\n                <div class="input">\n                    <input type="number" min="-100" max="100" data-type=\'offsetY\' value="' + offsetY + '" />\n                </div>\n                <div class="input">\n                    <input type="number" min="0" max="100" data-type=\'blurRadius\' value="' + blurRadius + '" />\n                </div>\n                <div class="input">\n                    <input type="number" min="0" max="100" data-type=\'spreadRadius\' value="' + spreadRadius + '" />\n                </div>  \n                <button type="button" class=\'delete-boxshadow\'>&times;</button>                                                                                                            \n            </div>\n        ';
        }
    }, {
        key: LOAD('$boxShadowList'),
        value: function value$$1() {
            var _this2 = this;

            var item = this.read('selection/current/layer');
            if (!item) {
                return '';
            }

            var results = this.read('item/map/boxshadow/children', item.id, function (item) {
                return _this2.makeItemNodeBoxShadow(item);
            });

            results.push(this.makeField());

            return results;
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return true;
            // return this.read('selection/is/layer'); 
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.load();
            }
        }
    }, {
        key: EVENT(CHANGE_BOXSHADOW),
        value: function value$$1(newValue) {
            this.refreshBoxShadow(newValue);
        }
    }, {
        key: 'refreshBoxShadow',
        value: function refreshBoxShadow(newValue) {
            var $el = this.refs.$boxShadowList.$('[box-shadow-id="' + newValue.id + '"] .color');
            if ($el) {
                $el.css('background-color', newValue.color);
            }
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_SELECTION, CHANGE_EDITOR),
        value: function value$$1() {
            if (this.isPropertyShow()) {
                this.refresh();
            }
        }
    }, {
        key: CLICK('$add'),
        value: function value$$1(e) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.dispatch('item/add', ITEM_TYPE_BOXSHADOW, false, id);
                _this3.dispatch('history/push', 'Add Box Shadow');
                _this3.refresh();
            });
        }
    }, {
        key: INPUT('$boxShadowList input[type=number]'),
        value: function value$$1(e) {
            var $el = e.$delegateTarget;
            var field = $el.attr('data-type');
            var id = $el.parent().parent().attr('box-shadow-id');

            this.commit(CHANGE_BOXSHADOW, defineProperty({ id: id }, field, pxUnit($el.int())));
        }
    }, {
        key: CLICK('$boxShadowList input[type=checkbox]'),
        value: function value$$1(e) {
            var $el = e.$delegateTarget;
            var id = $el.parent().parent().parent().attr('box-shadow-id');

            this.commit(CHANGE_BOXSHADOW, { id: id, inset: $el.checked() });
        }
    }, {
        key: CLICK('$boxShadowList .delete-boxshadow'),
        value: function value$$1(e) {
            var $el = e.$delegateTarget;
            var id = $el.parent().attr('box-shadow-id');

            this.run('item/initialize', id);
            this.emit(CHANGE_BOXSHADOW);
            this.refresh();
        }
    }, {
        key: CLICK('$boxShadowList .color'),
        value: function value$$1(e) {
            var $el = e.$delegateTarget;
            var id = $el.parent().attr('box-shadow-id');

            this.dispatch('selection/one', id);
            this.emit('fillColorId', id, CHANGE_BOXSHADOW);
            this.refresh();
        }
    }]);
    return BoxShadow;
}(BasePropertyItem);

var TextShadow = function (_BasePropertyItem) {
    inherits(TextShadow, _BasePropertyItem);

    function TextShadow() {
        classCallCheck(this, TextShadow);
        return possibleConstructorReturn(this, (TextShadow.__proto__ || Object.getPrototypeOf(TextShadow)).apply(this, arguments));
    }

    createClass(TextShadow, [{
        key: 'template',
        value: function template() {
            return '\n        <div class=\'property-item text-shadow show\'>\n            <div class=\'title\' ref="$title">\n                Text Shadow \n                <span style="float:right;">\n                    <button type="button" ref="$add">+</button>\n                </span>\n            </div>\n            <div class=\'items\'>         \n                <div class="text-shadow-list" ref="$textShadowList"></div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'makeField',
        value: function makeField() {
            return '\n        <div class=\'text-shadow-item label\'>  \n                <div class="color"></div>                     \n                <div class="input">\n                    <input class="x" type="text" value="X" />\n                </div>                \n                <div class="input">\n                    <input class="y" type="text" value="Y" />\n                </div>\n                <div class="input">\n                    <input class="blur" type="text" value="B" />\n                </div>\n                <button type="button">&times;</button>                                              \n            </div>\n    ';
        }
    }, {
        key: 'makeItemNodetextShadow',
        value: function makeItemNodetextShadow(item) {

            var offsetX = unitValue(item.offsetX);
            var offsetY = unitValue(item.offsetY);
            var blurRadius = unitValue(item.blurRadius);
            var checked = this.read('selection/check', item.id) ? 'checked' : '';

            return '\n            <div class=\'text-shadow-item ' + checked + '\' text-shadow-id="' + item.id + '">  \n                <div class="color" style="background-color: ' + item.color + ';"></div>                      \n                <div class="input">\n                    <input type="number" min="-100" max="100" data-type=\'offsetX\' value="' + offsetX + '" />\n                </div>                \n\n                <div class="input">\n                    <input type="number" min="-100" max="100" data-type=\'offsetY\' value="' + offsetY + '" />\n                </div>\n                <div class="input">\n                    <input type="number" min="0" max="100" data-type=\'blurRadius\' value="' + blurRadius + '" />\n                </div>\n                <button type="button" class=\'delete-textshadow\'>&times;</button>                                                                                                            \n            </div>\n        ';
        }
    }, {
        key: LOAD('$textShadowList'),
        value: function value$$1() {
            var _this2 = this;

            var item = this.read('selection/current/layer');
            if (!item) {
                return '';
            }

            var results = this.read('item/map/textshadow/children', item.id, function (item) {
                return _this2.makeItemNodetextShadow(item);
            });

            results.push(this.makeField());

            return results;
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return true;
            // return this.read('selection/is/layer'); 
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.load();
            }
        }
    }, {
        key: EVENT(CHANGE_TEXTSHADOW),
        value: function value$$1(newValue) {
            this.refreshTextShadow(newValue);
        }
    }, {
        key: 'refreshTextShadow',
        value: function refreshTextShadow(newValue) {
            var $el = this.refs.$textShadowList.$('[text-shadow-id="' + newValue.id + '"] .color');
            if ($el) {
                $el.css('background-color', newValue.color);
            }
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_SELECTION, CHANGE_EDITOR),
        value: function value$$1() {
            if (this.isPropertyShow()) {
                this.refresh();
            }
        }
    }, {
        key: CLICK('$add'),
        value: function value$$1(e) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.dispatch('item/add', ITEM_TYPE_TEXTSHADOW$1, false, id);
                _this3.dispatch('history/push', 'Add text Shadow');
                _this3.refresh();
            });
        }
    }, {
        key: INPUT('$textShadowList input[type=number]'),
        value: function value$$1(e) {
            var $el = e.$delegateTarget;
            var field = $el.attr('data-type');
            var id = $el.parent().parent().attr('text-shadow-id');

            this.commit(CHANGE_TEXTSHADOW, defineProperty({ id: id }, field, pxUnit($el.int())));
        }
    }, {
        key: CLICK('$textShadowList .delete-textshadow'),
        value: function value$$1(e) {
            var $el = e.$delegateTarget;
            var id = $el.parent().attr('text-shadow-id');

            this.run('item/initialize', id);
            this.emit(CHANGE_TEXTSHADOW);
            this.refresh();
        }
    }, {
        key: CLICK('$textShadowList .color'),
        value: function value$$1(e) {
            var $el = e.$delegateTarget;
            var id = $el.parent().attr('text-shadow-id');

            this.dispatch('selection/one', id);
            this.emit(TEXT_FILL_COLOR, id, CHANGE_TEXTSHADOW);
            this.refresh();
        }
    }]);
    return TextShadow;
}(BasePropertyItem);

var FillColorPicker = function (_UIElement) {
    inherits(FillColorPicker, _UIElement);

    function FillColorPicker() {
        classCallCheck(this, FillColorPicker);
        return possibleConstructorReturn(this, (FillColorPicker.__proto__ || Object.getPrototypeOf(FillColorPicker)).apply(this, arguments));
    }

    createClass(FillColorPicker, [{
        key: 'afterRender',
        value: function afterRender() {
            var _this2 = this;

            var defaultColor = 'rgba(0, 0, 0, 0)';

            this.colorPicker = ColorPicker.create({
                type: 'xd-tab',
                tabTitle: 'Fill',
                position: 'inline',
                container: this.$el.el,
                color: defaultColor,
                onChange: function onChange(c) {
                    _this2.changeColor(c);
                }
            });

            setTimeout(function () {
                _this2.colorPicker.dispatch('initColor', defaultColor);
            }, 100);
        }
    }, {
        key: 'template',
        value: function template() {
            return '<div class=\'colorpicker-layer\'> </div>';
        }
    }, {
        key: 'changeColor',
        value: function changeColor(color) {
            if (this.changeColorId) {
                this.commit(this.eventType, { id: this.changeColorId, color: color });
            } else {
                this.callback(color);
            }
        }
    }, {
        key: EVENT('fillColorId'),
        value: function value(id, eventType) {
            this.changeColorId = id;
            this.itemType = this.read('item/get', id).itemType;
            this.eventType = eventType;

            this.color = null;
            this.callback = null;

            this.refresh();
        }
    }, {
        key: EVENT('selectFillColor'),
        value: function value(color, callback) {
            this.changeColorId = null;
            this.itemType = null;
            this.eventType = null;
            this.color = color;
            this.callback = callback;

            this.refresh();
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.changeColorId) {
                var item = this.read('item/get', this.changeColorId);
                this.colorPicker.initColorWithoutChangeEvent(item.color);
            } else if (this.callback) {
                this.colorPicker.initColorWithoutChangeEvent(this.color);
            }
        }
    }]);
    return FillColorPicker;
}(UIElement);

var FillColorPickerPanel = function (_UIElement) {
    inherits(FillColorPickerPanel, _UIElement);

    function FillColorPickerPanel() {
        classCallCheck(this, FillColorPickerPanel);
        return possibleConstructorReturn(this, (FillColorPickerPanel.__proto__ || Object.getPrototypeOf(FillColorPickerPanel)).apply(this, arguments));
    }

    createClass(FillColorPickerPanel, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item fill-colorpicker show'>\n                <div class='items'>            \n                    <FillColorPicker></FillColorPicker>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { FillColorPicker: FillColorPicker };
        }
    }]);
    return FillColorPickerPanel;
}(UIElement);

var BackgroundInfo = function (_BasePropertyItem) {
    inherits(BackgroundInfo, _BasePropertyItem);

    function BackgroundInfo() {
        classCallCheck(this, BackgroundInfo);
        return possibleConstructorReturn(this, (BackgroundInfo.__proto__ || Object.getPrototypeOf(BackgroundInfo)).apply(this, arguments));
    }

    createClass(BackgroundInfo, [{
        key: 'template',
        value: function template() {
            return '\n        <div class=\'property-item background-info show\'>\n            <div class=\'title\' ref="$title">Background Image</div>        \n            <div class=\'items max-height\'>         \n                <div>\n                    <label>Gradient</label>\n                    <div>\n                        <div class="gradient" ref="$typeView"></div>\n                        <label ref="$type"></label>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/image');
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/image', function (image) {
                _this2.refs.$type.text(image.type);
                _this2.refs.$typeView.attr('data-type', image.type);
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }]);
    return BackgroundInfo;
}(BasePropertyItem);

var Text = function (_BasePropertyItem) {
    inherits(Text, _BasePropertyItem);

    function Text() {
        classCallCheck(this, Text);
        return possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
    }

    createClass(Text, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item text show'>\n                <div class='title' ref=\"$title\">Content</div>\n                <div class='items'>\n                    <div class=\"not-clip\">\n                        <label>Text Color</label>\n                        <div>\n                            <span class='color' ref='$color'></span> \n                            <input type=\"text\" class='color-text' ref='$colorText'/>\n                        </div>\n                    </div>\n                    <div class=\"not-clip\">\n                        <label>Clip Area</label>\n                        <div class='size-list'>\n                            <select ref=\"$clip\">\n                                <option value=\"content-box\">content-box</option>\n                                <option value=\"border-box\">border-box</option>\n                                <option value=\"padding-box\">padding-box</option>\n                                <option value=\"text\">text</option>\n                            </select>\n                        </div>\n                    </div>    \n                    <div class=\"not-clip\">\n                        <label></label>\n                        <div class='size-list'>\n                            <label><input type=\"checkbox\" ref=\"$clipText\" /> only text </label>\n                        </div>\n                    </div>    \n\n                    <div>\n                        <textarea class='content' ref=\"$content\"></textarea>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_TEXT),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {
                _this2.refs.$color.css('background-color', layer.color);
                _this2.refs.$colorText.val(layer.color || '');
                _this2.refs.$content.val(layer.content || '');
                _this2.refs.$clip.val(layer.backgroundClip);
                _this2.refs.$clipText.checked(layer.clipText || false);

                _this2.$el.toggleClass('has-clip-text', layer.clipText || false);
            });
        }
    }, {
        key: INPUT('$content'),
        value: function value(e) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_TEXT, { id: id, content: _this3.refs.$content.val() });
            });
        }
    }, {
        key: CLICK('$color'),
        value: function value(e) {
            var _this4 = this;

            this.read('selection/current/layer', function (item) {
                _this4.emit(TEXT_FILL_COLOR, item.id, CHANGE_LAYER_TEXT);
            });
        }
    }, {
        key: CHANGE('$clip'),
        value: function value(e) {
            var _this5 = this;

            this.read('selection/current/layer/id', function (id) {
                _this5.commit(CHANGE_LAYER_TEXT, { id: id, backgroundClip: _this5.refs.$clip.val() }, true);
            });
        }
    }, {
        key: CLICK('$clipText'),
        value: function value(e) {
            var _this6 = this;

            this.read('selection/current/layer/id', function (id) {
                _this6.commit(CHANGE_LAYER_TEXT, { id: id, clipText: _this6.refs.$clipText.checked() }, true);
            });
        }
    }]);
    return Text;
}(BasePropertyItem);

var LayerCode = function (_BasePropertyItem) {
    inherits(LayerCode, _BasePropertyItem);

    function LayerCode() {
        classCallCheck(this, LayerCode);
        return possibleConstructorReturn(this, (LayerCode.__proto__ || Object.getPrototypeOf(LayerCode)).apply(this, arguments));
    }

    createClass(LayerCode, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item layer-code show'>\n                <div class='title' ref=\"$title\">CSS code</div>\n                <div class='items'>            \n                    <div class=\"key-value-view\" ref=\"$keys\">\n\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: LOAD('$keys'),
        value: function value() {
            var layer = this.read('selection/current/layer');

            if (!layer) return '';

            return this.read('layer/toExport', layer, true).split(';').map(function (it) {
                var _it$split = it.split(':'),
                    _it$split2 = slicedToArray(_it$split, 2),
                    key = _it$split2[0],
                    value = _it$split2[1];

                if (key == 'background-image' || key == 'box-shadow' || key == 'text-shadow') {
                    var ret = convertMatches(value);

                    var str = ret.str.split(',').join(',\n  ');

                    str = str.replace(/\(/g, '(\n');
                    str = str.replace(/\)/g, '\n)');

                    value = reverseMatches(str, ret.matches);
                }

                return "\n                <div class=\"key-value-item\">\n                    <div class=\"key\">" + key + ":</div>\n                    <pre class=\"value\">" + value + ";</pre>\n                </div>\n            ";
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_LAYER_SIZE, CHANGE_LAYER_POSITION, CHANGE_LAYER_MOVE, CHANGE_LAYER_BACKGROUND_COLOR, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER_CLIPPATH_POLYGON, CHANGE_LAYER_FILTER, CHANGE_LAYER_BACKDROP_FILTER, CHANGE_LAYER_RADIUS, CHANGE_LAYER_ROTATE, CHANGE_LAYER_OPACITY, CHANGE_LAYER_TRANSFORM, CHANGE_LAYER_TRANSFORM_3D, CHANGE_BOXSHADOW, CHANGE_TEXTSHADOW, CHANGE_EDITOR, CHANGE_SELECTION, SELECT_TAB_LAYER),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {

            if (this.parent.selectedTabId == 'css') {
                this.load();
            }
        }
    }]);
    return LayerCode;
}(BasePropertyItem);

var BackgroundCode = function (_BasePropertyItem) {
    inherits(BackgroundCode, _BasePropertyItem);

    function BackgroundCode() {
        classCallCheck(this, BackgroundCode);
        return possibleConstructorReturn(this, (BackgroundCode.__proto__ || Object.getPrototypeOf(BackgroundCode)).apply(this, arguments));
    }

    createClass(BackgroundCode, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item background-code show'>\n                <div class='title' ref=\"$title\">CSS code</div>\n                <div class='items'>            \n                    <div class=\"key-value-view\" ref=\"$keys\">\n\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: LOAD('$keys'),
        value: function value() {
            var image = this.read('selection/current/image');

            if (!image) return '';

            var obj = this.read('layer/image/toImageCSS', image);

            return Object.keys(obj).map(function (key) {
                var value = obj[key];

                if (key == 'background-image') {
                    var ret = convertMatches(value);

                    var str = ret.str.split(',').join(',\n  ');

                    str = str.replace('(', '(\n');
                    str = str.replace(')', '\n)');

                    value = reverseMatches(str, ret.matches);
                }

                return "\n                <div class=\"key-value-item\">\n                    <div class=\"key\">" + key + ":</div>\n                    <pre class=\"value\">" + value + ";</pre>\n                </div>\n            ";
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_IMAGE_COLOR, CHANGE_IMAGE_ANGLE, CHANGE_IMAGE_LINEAR_ANGLE, CHANGE_IMAGE_RADIAL_POSITION, CHANGE_IMAGE_RADIAL_TYPE, CHANGE_COLOR_STEP, CHANGE_EDITOR, CHANGE_SELECTION, SELECT_TAB_IMAGE),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {

            if (this.parent.selectedTabId == 'css') {
                this.load();
            }
        }
    }]);
    return BackgroundCode;
}(BasePropertyItem);

var TextFillColorPicker = function (_UIElement) {
    inherits(TextFillColorPicker, _UIElement);

    function TextFillColorPicker() {
        classCallCheck(this, TextFillColorPicker);
        return possibleConstructorReturn(this, (TextFillColorPicker.__proto__ || Object.getPrototypeOf(TextFillColorPicker)).apply(this, arguments));
    }

    createClass(TextFillColorPicker, [{
        key: 'afterRender',
        value: function afterRender() {
            var _this2 = this;

            var defaultColor = 'rgba(0, 0, 0, 0)';

            this.colorPicker = ColorPicker.create({
                type: 'xd-tab',
                tabTitle: 'Text',
                position: 'inline',
                container: this.$el.el,
                color: defaultColor,
                onChange: function onChange(c) {
                    _this2.changeColor(c);
                }
            });

            setTimeout(function () {
                _this2.colorPicker.dispatch('initColor', defaultColor);
            }, 100);
        }
    }, {
        key: 'template',
        value: function template() {
            return '<div class=\'colorpicker-layer\'> </div>';
        }
    }, {
        key: 'changeColor',
        value: function changeColor(color) {
            if (this.changeColorId) {
                this.commit(this.eventType, { id: this.changeColorId, color: color });
            }
        }
    }, {
        key: EVENT(TEXT_FILL_COLOR),
        value: function value(id, eventType) {
            this.changeColorId = id;
            this.itemType = this.read('item/get', id).itemType;
            this.eventType = eventType;

            this.refresh();
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.changeColorId) {
                var item = this.read('item/get', this.changeColorId);
                this.colorPicker.initColorWithoutChangeEvent(item.color);
            }
        }
    }]);
    return TextFillColorPicker;
}(UIElement);

var LayerTextColorPickerPanel = function (_UIElement) {
    inherits(LayerTextColorPickerPanel, _UIElement);

    function LayerTextColorPickerPanel() {
        classCallCheck(this, LayerTextColorPickerPanel);
        return possibleConstructorReturn(this, (LayerTextColorPickerPanel.__proto__ || Object.getPrototypeOf(LayerTextColorPickerPanel)).apply(this, arguments));
    }

    createClass(LayerTextColorPickerPanel, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item text-colorpicker show'>\n                <div class='items'>            \n                    <TextFillColorPicker></TextFillColorPicker>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { TextFillColorPicker: TextFillColorPicker };
        }
    }]);
    return LayerTextColorPickerPanel;
}(UIElement);

var fontFamilyList = ['Georgia', "Times New Roman", 'serif', 'sans-serif'];

var fontWeightList = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

var MAX_FONT_SIZE = 300;
var MAX_LINE_HEIGHT = 100;

var Font = function (_BasePropertyItem) {
    inherits(Font, _BasePropertyItem);

    function Font() {
        classCallCheck(this, Font);
        return possibleConstructorReturn(this, (Font.__proto__ || Object.getPrototypeOf(Font)).apply(this, arguments));
    }

    createClass(Font, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item font show'>\n                <div class='title' ref=\"$title\">Font</div>            \n                <div class='items'>\n                    <div>\n                        <label>Family</label>   \n                        <div>\n                            <select ref=\"$fontFamily\">\n                                " + fontFamilyList.map(function (f) {
                return "<option value=\"" + f + "\">" + f + "</option>";
            }).join('') + "\n                            </select>\n                        </div>\n                    </div>   \n                    <div>\n                        <label>Weight</label>   \n                        <div>\n                            <select ref=\"$fontWeight\">\n                                " + fontWeightList.map(function (f) {
                return "<option value=\"" + f + "\">" + f + "</option>";
            }).join('') + "\n                            </select>\n                        </div>\n                    </div>                       \n                    <div>\n                        <label>Size</label>\n                        <UnitRange \n                            ref=\"$fontSize\" \n                            min=\"1\" max=\"300\" step=\"1\" value=\"13\" unit=\"" + UNIT_PX + "\"\n                            maxValueFunction=\"getMaxFontSize\"\n                            updateFunction=\"updateFontSize\"\n                        ></UnitRange>\n                    </div>      \n                    <div>\n                        <label>Line Height</label>\n                        <UnitRange \n                            ref=\"$lineHeight\" \n                            min=\"1\" max=\"100\" step=\"0.01\" value=\"1\" unit=\"" + UNIT_PX + "\"\n                            maxValueFunction=\"getMaxLineHeight\"\n                            updateFunction=\"updateLineHeight\"\n                        ></UnitRange>\n                    </div>                           \n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { UnitRange: UnitRange };
        }
    }, {
        key: "getMaxFontSize",
        value: function getMaxFontSize() {
            return MAX_FONT_SIZE;
        }
    }, {
        key: "getMaxLineHeight",
        value: function getMaxLineHeight() {
            return MAX_LINE_HEIGHT;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {
                _this2.refs.$fontFamily.val(layer.fontFamily);
                _this2.refs.$fontWeight.val(layer.fontWeight);
                _this2.children.$fontSize.refresh(layer.fontSize);
                _this2.children.$lineHeight.refresh(layer.lineHeight);
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER_TEXT, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "updateFontSize",
        value: function updateFontSize(fontSize) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_TEXT, { id: id, fontSize: fontSize });
            });
        }
    }, {
        key: "updateLineHeight",
        value: function updateLineHeight(lineHeight) {
            var _this4 = this;

            this.read('selection/current/layer/id', function (id) {
                _this4.commit(CHANGE_LAYER_TEXT, { id: id, lineHeight: lineHeight });
            });
        }
    }, {
        key: "updateFontFamily",
        value: function updateFontFamily(fontFamily) {
            var _this5 = this;

            this.read('selection/current/layer/id', function (id) {
                _this5.commit(CHANGE_LAYER_TEXT, { id: id, fontFamily: fontFamily });
            });
        }
    }, {
        key: "updateFontWeight",
        value: function updateFontWeight(fontWeight) {
            var _this6 = this;

            this.read('selection/current/layer/id', function (id) {
                _this6.commit(CHANGE_LAYER_TEXT, { id: id, fontWeight: fontWeight });
            });
        }
    }, {
        key: CHANGE('$fontFamily'),
        value: function value$$1(e) {
            this.updateFontFamily(this.refs.$fontFamily.val());
        }
    }, {
        key: CHANGE('$fontWeight'),
        value: function value$$1(e) {
            this.updateFontWeight(this.refs.$fontWeight.val());
        }
    }]);
    return Font;
}(BasePropertyItem);

var BackgroundClip = function (_BasePropertyItem) {
    inherits(BackgroundClip, _BasePropertyItem);

    function BackgroundClip() {
        classCallCheck(this, BackgroundClip);
        return possibleConstructorReturn(this, (BackgroundClip.__proto__ || Object.getPrototypeOf(BackgroundClip)).apply(this, arguments));
    }

    createClass(BackgroundClip, [{
        key: 'template',
        value: function template() {
            return '\n        <div class=\'property-item blend show\'>\n            <div class=\'items max-height\'>         \n                <div>\n                    <label>Clip Area</label>\n                    <div class=\'size-list\'>\n                        <select ref="$clip">\n                            <option value="content-box">content-box</option>\n                            <option value="border-box">border-box</option>\n                            <option value="padding-box">padding-box</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ';
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/layer');
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {
                _this2.refs.$clip.val(layer.backgroundClip);
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CHANGE('$clip'),
        value: function value(e) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER, { id: id, backgroundClip: _this3.refs.$clip.val() }, true);
            });
        }
    }]);
    return BackgroundClip;
}(BasePropertyItem);

var InfoFillColorPicker = function (_UIElement) {
    inherits(InfoFillColorPicker, _UIElement);

    function InfoFillColorPicker() {
        classCallCheck(this, InfoFillColorPicker);
        return possibleConstructorReturn(this, (InfoFillColorPicker.__proto__ || Object.getPrototypeOf(InfoFillColorPicker)).apply(this, arguments));
    }

    createClass(InfoFillColorPicker, [{
        key: 'afterRender',
        value: function afterRender() {
            var _this2 = this;

            var defaultColor = 'rgba(0, 0, 0, 0)';

            this.colorPicker = ColorPicker.create({
                type: 'xd-tab',
                tabTitle: 'Background',
                position: 'inline',
                container: this.$el.el,
                color: defaultColor,
                onChange: function onChange(c) {
                    _this2.changeColor(c);
                }
            });

            setTimeout(function () {
                _this2.colorPicker.dispatch('initColor', defaultColor);
            }, 100);
        }
    }, {
        key: 'template',
        value: function template() {
            return '<div class=\'colorpicker-layer\'> </div>';
        }
    }, {
        key: 'changeColor',
        value: function changeColor(color) {
            var _this3 = this;

            this.read('selection/current/layer/id', function (id) {
                _this3.commit(CHANGE_LAYER_BACKGROUND_COLOR, { id: id, backgroundColor: color });
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER_BACKGROUND_COLOR, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this4 = this;

            if (this.read('selection/is/layer')) {
                this.read('selection/current/layer', function (layer) {
                    if (layer.backgroundColor) {
                        if (layer.backgroundColor.includes('rgb')) return;
                        _this4.colorPicker.initColorWithoutChangeEvent(layer.backgroundColor);
                    }
                });
            }
        }
    }]);
    return InfoFillColorPicker;
}(UIElement);

var LayerInfoColorPickerPanel = function (_UIElement) {
    inherits(LayerInfoColorPickerPanel, _UIElement);

    function LayerInfoColorPickerPanel() {
        classCallCheck(this, LayerInfoColorPickerPanel);
        return possibleConstructorReturn(this, (LayerInfoColorPickerPanel.__proto__ || Object.getPrototypeOf(LayerInfoColorPickerPanel)).apply(this, arguments));
    }

    createClass(LayerInfoColorPickerPanel, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item text-colorpicker show'>\n                <div class='items'>            \n                    <InfoFillColorPicker></InfoFillColorPicker>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { InfoFillColorPicker: InfoFillColorPicker };
        }
    }]);
    return LayerInfoColorPickerPanel;
}(UIElement);

var DROPSHADOW_FILTER_KEYS$1 = ['backdropDropshadowOffsetX', 'backdropDropshadowOffsetY', 'backdropDropshadowBlurRadius', 'backdropDropshadowColor'];

var BackdropList = function (_BasePropertyItem) {
    inherits(BackdropList, _BasePropertyItem);

    function BackdropList() {
        classCallCheck(this, BackdropList);
        return possibleConstructorReturn(this, (BackdropList.__proto__ || Object.getPrototypeOf(BackdropList)).apply(this, arguments));
    }

    createClass(BackdropList, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item filters'>\n                <div class='title' ref=\"$title\">\n                    Backdrop Filter\n                </div>\n                <div class='items no-padding'>                    \n                    <div class=\"filter-list\" ref=\"$filterList\">\n                        \n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "makeInputItem",
        value: function makeInputItem(key, viewObject, dataObject) {
            var _this2 = this;

            var value$$1 = dataObject[key] ? dataObject[key].value : undefined;

            if (viewObject.type == 'range') {
                if (isUndefined(value$$1)) {
                    value$$1 = viewObject.defaultValue;
                }

                return "\n                <div class='filter'>\n                    <span class=\"area\"></span>                \n                    <span class=\"checkbox\">\n                        <input type=\"checkbox\" " + (dataObject.checked ? "checked=\"checked\"" : '') + " data-key=\"" + key + "\" />\n                    </span>\n                    <span class='title' draggable=\"true\">" + viewObject.title + "</span>\n                    <span class='range'><input type=\"range\" min=\"" + viewObject.min + "\" max=\"" + viewObject.max + "\" step=\"" + viewObject.step + "\" value=\"" + value$$1 + "\" ref=\"" + key + "Range\" data-key=\"" + key + "\"/></span>\n                    <span class='input-value'><input type=\"number\" min=\"" + viewObject.min + "\" max=\"" + viewObject.max + "\" step=\"" + viewObject.step + "\" value=\"" + value$$1 + "\"  ref=\"" + key + "Number\" data-key=\"" + key + "\"/></span>\n                    <span class='unit'>" + unitString(viewObject.unit) + "</span>\n                </div>\n            ";
            } else if (viewObject.type == 'multi') {
                return "\n            <div class='filter'>\n                <span class=\"area\"></span>\n                <span class=\"checkbox\">\n                    <input type=\"checkbox\" " + (dataObject.checked ? "checked=\"checked\"" : '') + " data-key=\"" + key + "\" />\n                </span>\n                <span class='title long' draggable=\"true\">" + viewObject.title + "</span>\n            </div>\n            <div class='items'>\n                " + DROPSHADOW_FILTER_KEYS$1.map(function (subkey) {

                    var it = _this2.read('backdrop/get', subkey);
                    var value$$1 = isUndefined(dataObject[subkey]) ? it.defaultValue : unitValue(dataObject[subkey]);

                    if (isColorUnit(it)) {
                        return "\n                        <div>\n                            <span class='title'>" + it.title + "</span>\n                            <span class='color'>\n                                <span class=\"color-view drop-shadow\" ref=\"$dropShadowColor\" style=\"background-color: " + value$$1 + "\" data-key=\"" + subkey + "\" ></span>\n                                <span class=\"color-text\" ref=\"$dropShadowColorText\">" + value$$1 + "</span>\n                            </span>\n                        </div>\n                        ";
                    } else {

                        return "\n                        <div>\n                            <span class='title'>" + it.title + "</span>\n                            <span class='range'><input type=\"range\" min=\"" + it.min + "\" max=\"" + it.max + "\" step=\"" + it.step + "\" value=\"" + value$$1 + "\" ref=\"" + subkey + "Range\"  data-key=\"" + subkey + "\" /></span>\n                            <span class='input-value'><input type=\"number\" min=\"" + it.min + "\" max=\"" + it.max + "\" step=\"" + it.step + "\" value=\"" + value$$1 + "\" ref=\"" + subkey + "Number\" data-key=\"" + subkey + "\" /></span>\n                            <span class='unit'>" + unitString(it.unit) + "</span>\n                        </div>\n                        ";
                    }
                }).join('') + "\n            </div>\n            ";
            }

            return "<div></div>";
        }
    }, {
        key: LOAD('$filterList'),
        value: function value$$1() {
            var _this3 = this;

            var layer = this.read('selection/current/layer');

            if (!layer) return '';

            var filterKeys = this.read('backdrop/list', layer.id);

            return filterKeys.map(function (key) {
                var realKey = key;
                var viewObject = _this3.read('backdrop/get', realKey);
                var dataObject = layer || {};
                return "\n                <div class='filter-item'>\n                    <div class=\"filter-item-input\">\n                        " + _this3.makeInputItem(realKey, viewObject, dataObject) + "\n                    </div>\n                </div>";
            });
        }
    }, {
        key: "refreshFilter",
        value: function refreshFilter(obj) {
            Object.keys(obj).filter(function (key) {
                return key.includes('backdrop');
            }).forEach(function (key) {
                console.log(key);
            });
        }
    }, {
        key: EVENT(CHANGE_LAYER_BACKDROP_FILTER),
        value: function value$$1(obj) {
            this.refreshFilter(obj);
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "isShow",
        value: function isShow() {
            return true;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.load();
        }
    }, {
        key: "updateFilterKeyValue",
        value: function updateFilterKeyValue(key, lastValue) {
            var _this4 = this;

            this.read('selection/current/layer', function (layer) {
                var id = layer.id;
                var value$$1 = layer[key] || _this4.read('clone', BACKDROP_DEFAULT_OBJECT[key]);
                value$$1.value = lastValue;

                _this4.commit(CHANGE_LAYER_BACKDROP_FILTER, defineProperty({ id: id }, key, value$$1));
            });
        }
    }, {
        key: "updateFilterKeyChecked",
        value: function updateFilterKeyChecked(key, checked) {
            var _this5 = this;

            this.read('selection/current/layer', function (layer) {
                var id = layer.id;
                var value$$1 = layer[key] || _this5.read('clone', BACKDROP_DEFAULT_OBJECT[key]);
                value$$1.checked = checked;

                _this5.commit(CHANGE_LAYER_BACKDROP_FILTER, defineProperty({ id: id }, key, value$$1));
            });
        }
    }, {
        key: CLICK('$filterList input[type=checkbox]'),
        value: function value$$1(e) {
            var $check = e.$delegateTarget;
            var key = $check.attr('data-key');
            this.updateFilterKeyChecked(key, $check.checked());
        }
    }, {
        key: CHANGEINPUT('$filterList input[type=range]'),
        value: function value$$1(e) {
            var $range = e.$delegateTarget;
            var key = $range.attr('data-key');
            this.refs[key + "Number"].val($range.val());
            this.updateFilterKeyValue(key, $range.val());
        }
    }, {
        key: INPUT('$filterList input[type=number]'),
        value: function value$$1(e) {
            var $number = e.$delegateTarget;
            var key = $number.attr('data-key');
            this.refs[key + "Range"].val($number.val());
            this.updateFilterKeyValue(key, $number.val());
        }
    }, {
        key: CLICK('$el .drop-shadow'),
        value: function value$$1(e) {
            var color$$1 = e.$delegateTarget.css('background-color');
            this.emit('selectFillColor', color$$1, this.updateDropShadowColor.bind(this));
        }
    }, {
        key: "updateDropShadowColor",
        value: function updateDropShadowColor(color$$1) {
            this.refs.$dropShadowColor.css('background-color', color$$1);
            this.refs.$dropShadowColorText.text(color$$1);

            var key = this.refs.$dropShadowColor.attr('data-key');

            this.updateFilterKeyValue(key, color$$1);
        }
    }]);
    return BackdropList;
}(BasePropertyItem);

var EmptyArea = function (_BasePropertyItem) {
    inherits(EmptyArea, _BasePropertyItem);

    function EmptyArea() {
        classCallCheck(this, EmptyArea);
        return possibleConstructorReturn(this, (EmptyArea.__proto__ || Object.getPrototypeOf(EmptyArea)).apply(this, arguments));
    }

    createClass(EmptyArea, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item empty-area show' style=\"height: " + this.props.height + ";\"></div>\n        ";
        }
    }]);
    return EmptyArea;
}(BasePropertyItem);

var Page3D = function (_UIElement) {
    inherits(Page3D, _UIElement);

    function Page3D() {
        classCallCheck(this, Page3D);
        return possibleConstructorReturn(this, (Page3D.__proto__ || Object.getPrototypeOf(Page3D)).apply(this, arguments));
    }

    createClass(Page3D, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-item size show'>\n                <div class='items'>\n                    <div>\n                        <label> 3D </label>\n                        \n                        <div>\n                            <label><input type='checkbox' ref=\"$preserve\"> preserve-3d </label>\n                        </div>\n                    </div>    \n                    <div>\n                        <label> Perspective </label>\n                        <div>\n                            <input type=\"range\" ref=\"$perspectiveRange\" min=\"-2000\" max=\"2000\" /> \n                            <input type=\"number\" ref=\"$perspective\" /> <span class='unit'>" + unitString(UNIT_PX) + "</span>\n                        </div>                        \n                    </div>                                 \n                    <div>\n                        <label>Origin  X </label>\n                        \n                        <div>\n                            <input type=\"range\" ref=\"$xRange\" min=\"-100\" max=\"100\" />                         \n                            <input type=\"number\" ref=\"$x\" /> <span class='unit'>" + unitString(UNIT_PERCENT) + "</span>\n                        </div>\n                    </div>                                            \n                    <div>\n                        <label>Origin Y </label>\n                        \n                        <div>\n                            <input type=\"range\" ref=\"$yRange\" min=\"-100\" max=\"100\" />                                                 \n                            <input type=\"number\" ref=\"$y\" /> <span class='unit'>" + unitString(UNIT_PERCENT) + "</span>\n                        </div>\n                    </div>                                                                \n                </div>\n            </div>\n        ";
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_PAGE_TRANSFORM),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/page', function (item) {
                var perspective = unitValue(defaultValue(item.perspective, pxUnit(0)));
                var perspectiveOriginPositionX = unitValue(defaultValue(item.perspectiveOriginPositionX, percentUnit(0)));
                var perspectiveOriginPositionY = unitValue(defaultValue(item.perspectiveOriginPositionY, percentUnit(0)));

                _this2.refs.$perspective.val(perspective);
                _this2.refs.$x.val(perspectiveOriginPositionX);
                _this2.refs.$y.val(perspectiveOriginPositionY);

                _this2.refs.$perspectiveRange.val(perspective);
                _this2.refs.$xRange.val(perspectiveOriginPositionX);
                _this2.refs.$yRange.val(perspectiveOriginPositionY);
                _this2.refs.$preserve.checked(!!item.preserve);
            });
        }
    }, {
        key: CLICK('$preserve'),
        value: function value$$1(e) {
            var _this3 = this;

            this.read('selection/current/page/id', function (id) {
                var preserve = _this3.refs.$preserve.checked();

                _this3.commit(CHANGE_PAGE, { id: id, preserve: preserve });
            });
        }
    }, {
        key: INPUT('$perspective'),
        value: function value$$1(e) {
            var _this4 = this;

            this.read('selection/current/page/id', function (id) {
                var value$$1 = _this4.refs.$perspective.val();
                var perspective = pxUnit(+value$$1);

                _this4.commit(CHANGE_PAGE_TRANSFORM, { id: id, perspective: perspective });
                _this4.refs.$perspectiveRange.val(value$$1);
            });
        }
    }, {
        key: CHANGEINPUT('$perspectiveRange'),
        value: function value$$1(e) {
            var _this5 = this;

            this.read('selection/current/page/id', function (id) {
                var value$$1 = _this5.refs.$perspectiveRange.val();
                var perspective = pxUnit(+value$$1);

                _this5.commit(CHANGE_PAGE_TRANSFORM, { id: id, perspective: perspective });
                _this5.refs.$perspective.val(value$$1);
            });
        }
    }, {
        key: INPUT('$x'),
        value: function value$$1(e) {
            var _this6 = this;

            this.read('selection/current/page/id', function (id) {
                var value$$1 = _this6.refs.$x.val();
                var perspectiveOriginPositionX = percentUnit(+value$$1);

                _this6.commit(CHANGE_PAGE_TRANSFORM, { id: id, perspectiveOriginPositionX: perspectiveOriginPositionX });
                _this6.refs.$xRange.val(value$$1);
            });
        }
    }, {
        key: CHANGEINPUT('$xRange'),
        value: function value$$1(e) {
            var _this7 = this;

            this.read('selection/current/page/id', function (id) {
                var value$$1 = _this7.refs.$xRange.val();
                var perspectiveOriginPositionX = percentUnit(+value$$1);

                _this7.commit(CHANGE_PAGE_TRANSFORM, { id: id, perspectiveOriginPositionX: perspectiveOriginPositionX });
                _this7.refs.$x.val(value$$1);
            });
        }
    }, {
        key: INPUT('$y'),
        value: function value$$1(e) {
            var _this8 = this;

            this.read('selection/current/page/id', function (id) {
                var value$$1 = _this8.refs.$y.val();
                var perspectiveOriginPositionY = percentUnit(+value$$1);

                _this8.commit(CHANGE_PAGE_TRANSFORM, { id: id, perspectiveOriginPositionY: perspectiveOriginPositionY });
                _this8.refs.$yRange.val(value$$1);
            });
        }
    }, {
        key: CHANGEINPUT('$yRange'),
        value: function value$$1(e) {
            var _this9 = this;

            this.read('selection/current/page/id', function (id) {
                var value$$1 = _this9.refs.$yRange.val();
                var perspectiveOriginPositionY = percentUnit(+value$$1);

                _this9.commit(CHANGE_PAGE_TRANSFORM, { id: id, perspectiveOriginPositionY: perspectiveOriginPositionY });
                _this9.refs.$y.val(value$$1);
            });
        }
    }]);
    return Page3D;
}(UIElement);

var _Page3D$ClipPathSide$;

var items = (_Page3D$ClipPathSide$ = {
    Page3D: Page3D,
    ClipPathSide: ClipPathSide,
    ClipPathPolygon: ClipPathPolygon,
    ClipPathSVG: ClipPathSVG,
    EmptyArea: EmptyArea,
    BackdropList: BackdropList,
    LayerInfoColorPickerPanel: LayerInfoColorPickerPanel,
    BackgroundClip: BackgroundClip,
    Font: Font,
    LayerTextColorPickerPanel: LayerTextColorPickerPanel,
    BackgroundCode: BackgroundCode,
    LayerCode: LayerCode,
    Text: Text,
    BackgroundInfo: BackgroundInfo,
    FillColorPickerPanel: FillColorPickerPanel,
    TextShadow: TextShadow,
    BoxShadow: BoxShadow
}, defineProperty(_Page3D$ClipPathSide$, "ClipPathSVG", ClipPathSVG), defineProperty(_Page3D$ClipPathSide$, "Opacity", Opacity$3), defineProperty(_Page3D$ClipPathSide$, "RadiusFixed", RadiusFixed), defineProperty(_Page3D$ClipPathSide$, "Rotate", Rotate), defineProperty(_Page3D$ClipPathSide$, "LayerBlend", LayerBlend), defineProperty(_Page3D$ClipPathSide$, "GroupAlign", GroupAlign), defineProperty(_Page3D$ClipPathSide$, "PageShowGrid", PageShowGrid), defineProperty(_Page3D$ClipPathSide$, "ClipPath", ClipPath), defineProperty(_Page3D$ClipPathSide$, "ImageResource", ImageResource), defineProperty(_Page3D$ClipPathSide$, "BackgroundColor", BackgroundColor), defineProperty(_Page3D$ClipPathSide$, "BackgroundBlend", BackgroundBlend), defineProperty(_Page3D$ClipPathSide$, "BlendList", BlendList), defineProperty(_Page3D$ClipPathSide$, "MixBlendList", MixBlendList), defineProperty(_Page3D$ClipPathSide$, "FilterList", FilterList$1), defineProperty(_Page3D$ClipPathSide$, "PageExport", PageExport), defineProperty(_Page3D$ClipPathSide$, "PageSize", PageSize), defineProperty(_Page3D$ClipPathSide$, "PageName", PageName), defineProperty(_Page3D$ClipPathSide$, "BackgroundSize", BackgroundSize), defineProperty(_Page3D$ClipPathSide$, "Transform3d", Transform3d), defineProperty(_Page3D$ClipPathSide$, "Transform", Transform), defineProperty(_Page3D$ClipPathSide$, "LayerColorPickerPanel", LayerColorPickerPanel), defineProperty(_Page3D$ClipPathSide$, "ColorPickerPanel", ColorPickerPanel), defineProperty(_Page3D$ClipPathSide$, "ColorStepsInfo", ColorStepsInfo), defineProperty(_Page3D$ClipPathSide$, "ColorSteps", ColorSteps), defineProperty(_Page3D$ClipPathSide$, "Name", Name), defineProperty(_Page3D$ClipPathSide$, "Size", Size), defineProperty(_Page3D$ClipPathSide$, "Position", Position), defineProperty(_Page3D$ClipPathSide$, "Radius", Radius), defineProperty(_Page3D$ClipPathSide$, "Clip", Clip), _Page3D$ClipPathSide$);

var BaseTab = function (_UIElement) {
    inherits(BaseTab, _UIElement);

    function BaseTab() {
        classCallCheck(this, BaseTab);
        return possibleConstructorReturn(this, (BaseTab.__proto__ || Object.getPrototypeOf(BaseTab)).apply(this, arguments));
    }

    createClass(BaseTab, [{
        key: "template",
        value: function template() {
            return "\n        <div class=\"tab\">\n            <div class=\"tab-header\" ref=\"$header\">\n                <div class=\"tab-item selected\" data-id=\"1\">1</div>\n                <div class=\"tab-item\" data-id=\"2\">2</div>\n            </div>\n            <div class=\"tab-body\" ref=\"$body\">\n                <div class=\"tab-content selected\" data-id=\"1\"></div>\n                <div class=\"tab-content\" data-id=\"2\"></div>\n            </div>\n        </div>\n        ";
        }
    }, {
        key: "isNotSelectedTab",
        value: function isNotSelectedTab(e) {
            return !e.$delegateTarget.hasClass('selected');
        }
    }, {
        key: CLICK('$header .tab-item') + CHECKER('isNotSelectedTab'),
        value: function value(e, $dt) {
            this.selectTab($dt.attr('data-id'));
        }
    }, {
        key: "selectTab",
        value: function selectTab(id) {

            this.selectedTabId = id;

            this.refs.$header.children().forEach(function ($dom) {
                $dom.toggleClass('selected', $dom.attr('data-id') == id);
            });

            this.refs.$body.children().forEach(function ($dom) {
                $dom.toggleClass('selected', $dom.attr('data-id') == id);
            });

            this.onTabShow();
        }
    }, {
        key: "onTabShow",
        value: function onTabShow() {}
    }, {
        key: "setScrollTabTitle",
        value: function setScrollTabTitle($scrollPanel) {
            var offset = $scrollPanel.offset();
            var $tabElementTitle = $scrollPanel.$(".tab-element-title");

            if (!$tabElementTitle) {
                $scrollPanel.append(new Dom('div', 'tab-element-title'));
                $tabElementTitle = $scrollPanel.$(".tab-element-title");
            }

            var elementsInViewport = $scrollPanel.children().map(function ($dom) {
                var rect = $dom.rect();
                if (offset.top <= rect.bottom) {
                    return { $dom: $dom, isElementInViewport: true };
                }
                return { $dom: $dom, isElementInViewport: false };
            });

            var title = '';
            if (elementsInViewport.length) {

                var viewElement = elementsInViewport.filter(function (it) {
                    return it.isElementInViewport;
                });

                if (viewElement.length) {
                    var $dom = viewElement[0].$dom;
                    var $title = $dom.$(".title");

                    if ($title && offset.top > $title.rect().bottom) {
                        title = $title.text();
                    }
                }
            }

            if (title) {
                if ($tabElementTitle.css('display') == 'none') {
                    $tabElementTitle.show();
                }
                $tabElementTitle.px('top', $scrollPanel.scrollTop()).text(title);
            } else {
                $tabElementTitle.hide();
            }
        }
    }]);
    return BaseTab;
}(UIElement);

var LayerTabView = function (_BaseTab) {
    inherits(LayerTabView, _BaseTab);

    function LayerTabView() {
        classCallCheck(this, LayerTabView);
        return possibleConstructorReturn(this, (LayerTabView.__proto__ || Object.getPrototypeOf(LayerTabView)).apply(this, arguments));
    }

    createClass(LayerTabView, [{
        key: 'template',
        value: function template() {
            return '\n        <div class="tab horizontal">\n            <div class="tab-header" ref="$header">\n                <div class="tab-item" data-id="page">Page</div>\n                <div class="tab-item selected" data-id="info">Info</div>\n                <div class="tab-item" data-id="fill">Fill</div>       \n                <div class="tab-item" data-id="text">Text</div>\n                <div class="tab-item" data-id="shape">Shape</div>\n                <div class="tab-item" data-id="transform">Transform</div>\n                <div class="tab-item" data-id="transform3d">3D</div>\n                <div class="tab-item" data-id="css">CSS</div>\n            </div>\n            <div class="tab-body" ref="$body">\n                <div class="tab-content" data-id="page">\n                    <PageName></PageName>\n                    <PageSize></PageSize>\n                    <clip></clip>           \n                    <Page3D></Page3D>       \n                </div>\n\n                <div class="tab-content selected flex" data-id="info">\n                    <div class=\'fixed\'>\n                        <LayerInfoColorPickerPanel></LayerInfoColorPickerPanel>                    \n                    </div>\n                    <div class=\'scroll\' ref="$layerInfoScroll">\n                        <Name></Name>\n                        <size></size>            \n                        <Rotate></Rotate>\n                        <RadiusFixed></RadiusFixed>\n                        <radius></radius>      \n                        <opacity></opacity>         \n                        <LayerBlend></LayerBlend>\n                        <BackgroundClip></BackgroundClip>                    \n                    </div>\n                </div>\n                <div class="tab-content flex" data-id="text">\n                    <div class=\'fixed\'>\n                        <LayerTextColorPickerPanel></LayerTextColorPickerPanel>                    \n                    </div>\n                    <div class=\'scroll\' ref="$layerTextScroll">\n                        <Font></Font>                    \n                        <Text></Text>                    \n                        <TextShadow></TextShadow>        \n                    </div>\n                </div>\n                <div class="tab-content flex" data-id="fill">\n                    <div class=\'fixed\'>\n                        <FillColorPickerPanel></FillColorPickerPanel>\n                    </div>\n                    <div class=\'scroll\' ref="$layerFillScroll">\n                        <BoxShadow></BoxShadow>\n                        <FilterList></FilterList>    \n                        <BackdropList></BackdropList>   \n                        <EmptyArea height="100px"></EmptyArea>      \n                    </div>\n                </div>                \n                <div class="tab-content" data-id="shape">\n                    <ClipPath></ClipPath>   \n                    <ClipPathSide></ClipPathSide>\n                    <ClipPathPolygon></ClipPathPolygon>\n                    <ClipPathSVG></ClipPathSVG>\n                </div>\n                <div class="tab-content" data-id="transform">\n                    <transform></transform>\n                </div>\n                <div class="tab-content" data-id="transform3d">\n                    <transform3d></transform3d> \n                </div>               \n                <div class="tab-content" data-id="css">\n                    <LayerCode></LayerCode>\n                </div>               \n            </div>\n        </div>\n\n        ';
        }
    }, {
        key: SCROLL('$layerInfoScroll'),
        value: function value(e) {
            this.setScrollTabTitle(this.refs.$layerInfoScroll);
        }
    }, {
        key: SCROLL('$layerTextScroll'),
        value: function value(e) {
            this.setScrollTabTitle(this.refs.$layerTextScroll);
        }
    }, {
        key: SCROLL('$layerFillScroll'),
        value: function value(e) {
            this.setScrollTabTitle(this.refs.$layerFillScroll);
        }
    }, {
        key: 'onTabShow',
        value: function onTabShow() {
            this.emit(SELECT_TAB_LAYER, this.selectedTabId);
        }
    }, {
        key: 'components',
        value: function components() {
            return items;
        }
    }]);
    return LayerTabView;
}(BaseTab);

var LayerView = function (_UIElement) {
    inherits(LayerView, _UIElement);

    function LayerView() {
        classCallCheck(this, LayerView);
        return possibleConstructorReturn(this, (LayerView.__proto__ || Object.getPrototypeOf(LayerView)).apply(this, arguments));
    }

    createClass(LayerView, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-view'>\n                <LayerTabView></LayerTabView>\n            </div> \n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return { LayerTabView: LayerTabView };
        }
    }]);
    return LayerView;
}(UIElement);

var ImageTabView = function (_BaseTab) {
    inherits(ImageTabView, _BaseTab);

    function ImageTabView() {
        classCallCheck(this, ImageTabView);
        return possibleConstructorReturn(this, (ImageTabView.__proto__ || Object.getPrototypeOf(ImageTabView)).apply(this, arguments));
    }

    createClass(ImageTabView, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="tab horizontal">\n                <div class="tab-header" ref="$header">\n                    <div class="tab-item selected" data-id="gradient">Gradient</div>\n                    <div class="tab-item" data-id="css">CSS</div>\n                </div>\n                <div class="tab-body" ref="$body">\n                    <div class="tab-content flex selected" data-id="gradient">\n                        <div class=\'fixed\'>\n                            <ColorPickerPanel></ColorPickerPanel>\n                            <ColorStepsInfo></ColorStepsInfo>                            \n                        </div>\n                        <div class=\'scroll\'>\n                            <BackgroundInfo></BackgroundInfo>\n                            <BackgroundBlend></BackgroundBlend>\n                            <div class=\'sub-feature\'>\n                                <BackgroundSize></BackgroundSize>\n                            </div>\n                        </div>    \n\n                    </div>\n                    <div class="tab-content" data-id="css">\n                        <BackgroundCode></BackgroundCode>\n                    </div>\n                </div>\n            </div> \n        ';
        }
    }, {
        key: 'onTabShow',
        value: function onTabShow() {
            this.emit(SELECT_TAB_IMAGE, this.selectedTabId);
        }
    }, {
        key: 'components',
        value: function components() {
            return _extends({}, items);
        }
    }]);
    return ImageTabView;
}(BaseTab);

var ImageView = function (_UIElement) {
    inherits(ImageView, _UIElement);

    function ImageView() {
        classCallCheck(this, ImageView);
        return possibleConstructorReturn(this, (ImageView.__proto__ || Object.getPrototypeOf(ImageView)).apply(this, arguments));
    }

    createClass(ImageView, [{
        key: "template",
        value: function template() {
            return "\n            <div class='property-view'>\n                <ImageTabView></ImageTabView> \n            </div>  \n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return {
                ImageTabView: ImageTabView
            };
        }
    }]);
    return ImageView;
}(UIElement);

var FeatureControl = function (_UIElement) {
    inherits(FeatureControl, _UIElement);

    function FeatureControl() {
        classCallCheck(this, FeatureControl);
        return possibleConstructorReturn(this, (FeatureControl.__proto__ || Object.getPrototypeOf(FeatureControl)).apply(this, arguments));
    }

    createClass(FeatureControl, [{
        key: "template",
        value: function template() {
            return "\n            <div class='feature-control'>     \n                <div class='feature layer-feature' data-type='layer'>\n                    <LayerView></LayerView>\n                </div>                              \n                <div class='feature image-feature' data-type='image'>\n                    <ImageView></ImageView>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return {
                LayerView: LayerView,
                ImageView: ImageView
            };
        }
    }, {
        key: "selectFeature",
        value: function selectFeature() {

            var item = this.read('selection/current');

            if (!item.length) return false;

            var selectedFeature = this.$el.$('.feature.selected');

            if (selectedFeature) selectedFeature.removeClass('selected');

            var selectType = 'layer';

            if (this.read('selection/is/layer') || this.read('selection/is/group')) {
                selectType = 'layer';
            } else if (this.read('selection/is/image')) {
                selectType = 'image';
            }

            this.$el.$(".feature[data-type=" + selectType + "]").addClass('selected');
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.selectFeature();
        }
    }]);
    return FeatureControl;
}(UIElement);

var LayerListView = function (_UIElement) {
    inherits(LayerListView, _UIElement);

    function LayerListView() {
        classCallCheck(this, LayerListView);
        return possibleConstructorReturn(this, (LayerListView.__proto__ || Object.getPrototypeOf(LayerListView)).apply(this, arguments));
    }

    createClass(LayerListView, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'layers show-mini-view\'>\n                <div class=\'title\'> \n                    <h1 ref="$pageName"></h1>\n                </div>             \n                <div class="layer-list" ref="$layerList"></div>\n            </div>\n        ';
        }
    }, {
        key: 'makeItemNode',
        value: function makeItemNode(node, index) {
            var item = this.read('item/get', node.id);

            if (item.itemType == 'layer') {
                return this.makeItemNodeLayer(item, index);
            }
        }
    }, {
        key: 'makeItemNodeImage',
        value: function makeItemNodeImage(item) {
            var selected = this.read('selection/check', item.id) ? 'selected' : '';
            return '\n            <div class=\'tree-item image ' + selected + '\' id="' + item.id + '" draggable="true" >\n                <div class="item-title"> \n                    &lt;' + item.type + '&gt;\n                    <button type="button" class=\'delete-item\' item-id=\'' + item.id + '\' title="Remove">&times;</button>\n                </div>                \n                <div class=\'item-tools\'>\n                    <button type="button" class=\'copy-image-item\' item-id=\'' + item.id + '\' title="Copy">+</button>\n                </div>            \n            </div>\n            ';
        }
    }, {
        key: 'makeItemNodeLayer',
        value: function makeItemNodeLayer(item) {
            var _this2 = this;

            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var selected = this.read('selection/check', item.id) ? 'selected' : '';
            var collapsed = item.gradientCollapsed ? 'collapsed' : '';
            return '\n            <div class=\'tree-item ' + selected + '\' id="' + item.id + '" item-type=\'layer\' draggable="true">\n                <div class="item-title"> \n                    ' + (index + 1) + '. ' + (item.name || 'Layer ') + ' \n                    <button type="button" class=\'delete-item\' item-id=\'' + item.id + '\' title="Remove">&times;</button>\n                </div>\n                <div class=\'item-tools\'>\n                    <button type="button" class=\'copy-item\' item-id=\'' + item.id + '\' title="Copy">+</button>\n                </div>                            \n            </div>\n            <div class="gradient-list-group" >\n                <!-- <div class=\'gradient-collapse-button\' item-id="' + item.id + '"></div> -->\n                <div class="tree-item-children">\n                    ' + this.read('item/map/image/children', item.id, function (item) {
                return _this2.makeItemNodeImage(item);
            }).join('') + '\n                </div>\n            </div>       \n            ';
        }
    }, {
        key: LOAD('$pageName'),
        value: function value() {
            var obj = this.read('selection/current/page') || { name: 'Untitled Project' };
            return obj.name === '' ? '<span>Untitled Project</span>' : '<span>' + obj.name + '</span>';
        }
    }, {
        key: LOAD('$layerList'),
        value: function value() {
            var _this3 = this;

            var page = this.read('selection/current/page');

            if (!page) {
                return '';
            }

            return this.read('item/map/children', page.id, function (item, index) {
                return _this3.makeItemNode(item, index);
            }).reverse();
        }
    }, {
        key: 'refreshSelection',
        value: function refreshSelection() {}
    }, {
        key: 'refresh',
        value: function refresh() {
            this.load();
        }
    }, {
        key: 'refreshSelection',
        value: function refreshSelection(id) {
            var $selected = this.$el.$(".selected");

            if ($selected) {
                $selected.removeClass('selected');
            }

            this.$el.$('[id="' + id + '"]').addClass('selected');
        }

        // refreshLayer () {
        //     this.read('selection/current/layer', (items) => {

        //         if (!items.length) {
        //             items = [items]
        //         }

        //         items.forEach(item => {
        //             this.$el.$(`[id="${item.id}"] .item-view`).cssText(this.read('layer/toString', item, false))
        //         })
        //     })
        // }    

        // refreshImage() {
        //     this.read('selection/current/image', (item) => {
        //         this.$el.$(`[id="${item.id}"] .item-view`).cssText(this.read('image/toString', item))
        //     })
        // }

        // // indivisual effect 
        // [EVENT(
        //     CHANGE_LAYER,
        //     CHANGE_LAYER_BACKGROUND_COLOR,
        //     CHANGE_LAYER_CLIPPATH,
        //     CHANGE_LAYER_CLIPPATH_POLYGON,
        //     CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
        //     CHANGE_LAYER_FILTER,
        //     CHANGE_LAYER_POSITION,
        //     CHANGE_LAYER_RADIUS,
        //     CHANGE_LAYER_SIZE,
        //     CHANGE_LAYER_ROTATE,
        //     CHANGE_LAYER_OPACITY,
        //     CHANGE_LAYER_TRANSFORM,
        //     CHANGE_LAYER_TRANSFORM_3D,

        //     CHANGE_COLOR_STEP,
        //     CHANGE_IMAGE,
        //     CHANGE_IMAGE_ANGLE,
        //     CHANGE_IMAGE_COLOR,
        //     CHANGE_IMAGE_LINEAR_ANGLE,
        //     CHANGE_IMAGE_RADIAL_POSITION,
        //     CHANGE_IMAGE_RADIAL_TYPE
        // )]() {
        //     this.refreshLayer()
        // }


        // all effect 

    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CLICK('$layerList .tree-item') + SELF,
        value: function value(e) {
            var id = e.$delegateTarget.attr('id');
            this.dispatch('selection/one', id);
            this.run('item/focus', id);
            this.refreshSelection(id);
        }
    }, {
        key: DRAGSTART('$layerList .tree-item'),
        value: function value(e) {
            this.draggedLayer = e.$delegateTarget;
            this.draggedLayer.css('opacity', 0.5);
            // e.preventDefault();
        }
    }, {
        key: DRAGEND('$layerList .tree-item'),
        value: function value(e) {

            if (this.draggedLayer) {
                this.draggedLayer.css('opacity', 1);
            }
        }
    }, {
        key: DRAGOVER('$layerList .tree-item'),
        value: function value(e) {
            e.preventDefault();
        }
    }, {
        key: DROP('$layerList .tree-item') + SELF,
        value: function value(e) {
            e.preventDefault();

            var destId = e.$delegateTarget.attr('id');
            var sourceId = this.draggedLayer.attr('id');

            var sourceItem = this.read('item/get', sourceId);
            var destItem = this.read('item/get', destId);

            this.draggedLayer = null;
            if (destItem.itemType == 'layer' && sourceItem.itemType == 'image') {
                if (e.ctrlKey) {
                    this.dispatch('item/copy/in/layer', destId, sourceId);
                } else {
                    this.dispatch('item/move/in/layer', destId, sourceId);
                }

                this.dispatch('history/push', 'Change gradient position ');
                this.refresh();
            } else if (destItem.itemType == sourceItem.itemType) {
                if (e.ctrlKey) {
                    this.dispatch('item/copy/in', destId, sourceId);
                } else {
                    this.dispatch('item/move/in', destId, sourceId);
                }
                this.dispatch('history/push', 'Change item position ');
                this.refresh();
            }
        }
    }, {
        key: DROP('$layerList'),
        value: function value(e) {
            e.preventDefault();

            if (this.draggedLayer) {
                var sourceId = this.draggedLayer.attr('id');

                this.draggedLayer = null;
                this.dispatch('item/move/last', sourceId);
                this.dispatch('history/push', 'Change layer position ');
                this.refresh();
            }
        }
    }, {
        key: CLICK('$layerList .copy-image-item'),
        value: function value(e) {
            this.dispatch('item/addCopy', e.$delegateTarget.attr('item-id'));
            this.dispatch('history/push', 'Add a gradient');
            this.refresh();
        }
    }, {
        key: CLICK('$layerList .copy-item'),
        value: function value(e) {
            this.dispatch('item/addCopy', e.$delegateTarget.attr('item-id'));
            this.dispatch('history/push', 'Copy a layer');
            this.refresh();
        }
    }, {
        key: CLICK('$layerList .delete-item'),
        value: function value(e) {
            this.dispatch('item/remove', e.$delegateTarget.attr('item-id'));
            this.dispatch('history/push', 'Remove item');
            this.refresh();
        }
    }, {
        key: CLICK('$viewSample'),
        value: function value(e) {
            this.emit('toggleLayerSampleView');
        }
    }, {
        key: CLICK('$layerList .gradient-collapse-button') + SELF,
        value: function value(e) {
            e.$delegateTarget.parent().toggleClass('collapsed');
            var item = this.read('item/get', e.$delegateTarget.attr('item-id'));

            item.gradientCollapsed = e.$delegateTarget.parent().hasClass('collapsed');
            this.run('item/set', item);
        }
    }]);
    return LayerListView;
}(UIElement);

var ImageListView = function (_UIElement) {
    inherits(ImageListView, _UIElement);

    function ImageListView() {
        classCallCheck(this, ImageListView);
        return possibleConstructorReturn(this, (ImageListView.__proto__ || Object.getPrototypeOf(ImageListView)).apply(this, arguments));
    }

    createClass(ImageListView, [{
        key: 'template',
        value: function template() {
            return '<div class="image-list"> </div> ';
        }
    }, {
        key: 'makeItemNodeImage',
        value: function makeItemNodeImage(item) {
            var selected = this.read('selection/check', item.id) ? 'selected' : '';
            return '\n            <div class=\'tree-item ' + selected + '\' data-id="' + item.id + '" draggable="true" title="' + item.type + '" >\n                <div class="item-view-container">\n                    <div class="item-view"  style=\'' + this.read('image/toString', item) + '\'></div>\n                </div>\n            </div>\n            ';
        }
    }, {
        key: LOAD(),
        value: function value() {
            var _this2 = this;

            var id = this.read('selection/current/layer/id');

            if (!id) {
                return '';
            }

            return this.read('item/map/image/children', id, function (item) {
                return _this2.makeItemNodeImage(item);
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.load();
        }

        // individual effect

    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_IMAGE_ANGLE, CHANGE_IMAGE_COLOR, CHANGE_IMAGE_LINEAR_ANGLE, CHANGE_IMAGE_RADIAL_POSITION, CHANGE_IMAGE_RADIAL_TYPE, CHANGE_COLOR_STEP, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value(newValue) {
            this.refresh();
        }
    }, {
        key: CLICK('$el .tree-item') + SELF,
        value: function value(e) {
            var id = e.$delegateTarget.attr('data-id');

            if (id) {
                this.dispatch('selection/one', id);
                this.refresh();
            }
        }
    }, {
        key: DRAGSTART('$el .tree-item'),
        value: function value(e) {
            this.draggedImage = e.$delegateTarget;
            this.draggedImage.css('opacity', 0.5);
            // e.preventDefault();
        }
    }, {
        key: DRAGEND('$el .tree-item'),
        value: function value(e) {

            if (this.draggedImage) {
                this.draggedImage.css('opacity', 1);
            }
        }
    }, {
        key: DRAGOVER('$el .tree-item'),
        value: function value(e) {
            e.preventDefault();
        }
    }, {
        key: DROP('$el .tree-item') + SELF,
        value: function value(e) {
            e.preventDefault();

            var destId = e.$delegateTarget.attr('data-id');
            var sourceId = this.draggedImage.attr('data-id');

            this.draggedImage = null;
            this.dispatch('item/move/in', destId, sourceId);
            this.refresh();
        }
    }, {
        key: DROP(),
        value: function value(e) {
            e.preventDefault();

            if (this.draggedImage) {
                var sourceId = this.draggedImage.attr('data-id');

                this.draggedImage = null;
                this.dispatch('item/move/last', sourceId);
                this.refresh();
            }
        }
    }]);
    return ImageListView;
}(UIElement);

var LayerToolbar = function (_UIElement) {
    inherits(LayerToolbar, _UIElement);

    function LayerToolbar() {
        classCallCheck(this, LayerToolbar);
        return possibleConstructorReturn(this, (LayerToolbar.__proto__ || Object.getPrototypeOf(LayerToolbar)).apply(this, arguments));
    }

    createClass(LayerToolbar, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'layer-toolbar\'>            \n                <div class="panel-toolbar">\n                    <div class="button-group">\n                        <button class="page-panel-button" ref="$togglePagePanel" title="Toggle Page">Page</button>\n                        <button class="layer-panel-button" ref="$toggleLayerPanel" title="Toggle Layer">Layer</button>\n                    </div>\n                    <label>&nbsp;</label>\n                    <div class="button-group">\n                        <button class="dodo" ref="$undo" title="Undo">Undo</button>\n                        <button class="dodo" ref="$redo" title="Redo">Redo</button>\n                    </div> \n                </div>\n              \n                <div style="display:inline-block;vertical-align:middle;">       \n                    <ImageListView></ImageListView>               \n                </div>\n               \n                <div class="button-group group-align" ref="$groupAlign">\n                    <button type="button" title="left" data-value="left"></button>\n                    <button type="button" title="center" data-value="center"></button>\n                    <button type="button" title="right" data-value="right"></button>\n                    <button type="button" title="top" data-value="top"></button>\n                    <button type="button" title="middle" data-value="middle"></button>\n                    <button type="button" title="bottom" data-value="bottom"></button>\n                    <button type="button" title="vertical" data-value="vertical"></button>\n                    <button type="button" title="horizontal" data-value="horizontal"></button>\n                </div>\n\n                <div class="button-group group-order" ref="$groupOrdering">\n                    <button type="button" title="front" data-value="front"></button>\n                    <button type="button" title="back" data-value="back"></button>\n                    <button type="button" title="forward" data-value="forward"></button>\n                    <button type="button" title="backward" data-value="backward"></button>\n                </div>                \n                                \n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return { ImageListView: ImageListView };
        }
    }, {
        key: CLICK('$groupAlign button'),
        value: function value(e) {
            this.dispatch('ordering/type', e.$delegateTarget.attr('data-value'));
        }
    }, {
        key: CLICK('$groupOrdering button'),
        value: function value(e) {
            this.dispatch('ordering/index', e.$delegateTarget.attr('data-value'));
        }
    }, {
        key: CLICK('$undo'),
        value: function value(e) {
            this.dispatch('history/undo');
        }
    }, {
        key: CLICK('$redo'),
        value: function value(e) {
            this.dispatch('history/redo');
        }
    }, {
        key: CLICK('$togglePagePanel'),
        value: function value() {
            this.emit('togglePagePanel');
        }
    }, {
        key: CLICK('$toggleLayerPanel'),
        value: function value() {
            this.emit('toggleLayerPanel');
        }
    }]);
    return LayerToolbar;
}(UIElement);

var GradientAngle = function (_UIElement) {
    inherits(GradientAngle, _UIElement);

    function GradientAngle() {
        classCallCheck(this, GradientAngle);
        return possibleConstructorReturn(this, (GradientAngle.__proto__ || Object.getPrototypeOf(GradientAngle)).apply(this, arguments));
    }

    createClass(GradientAngle, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'drag-angle-rect\'>\n                <div class="drag-angle" ref="$dragAngle">\n                    <div ref="$angleText" class="angle-text"></div>\n                    <div ref="$dragPointer" class="drag-pointer"></div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            if (this.isShow()) {
                this.$el.show();

                this.refreshUI();
            } else {
                this.$el.hide();
            }
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            if (!this.read('selection/is/image')) return false;

            var item = this.read('selection/current/image');

            if (!item) return false;

            var isLinear = this.read('image/type/isLinear', item.type);
            var isConic = this.read('image/type/isConic', item.type);

            if (isLinear == false && isConic == false) {
                return false;
            }

            return this.read('tool/get', 'guide.angle');
        }
    }, {
        key: 'getCurrentXY',
        value: function getCurrentXY(e, angle, radius, centerX, centerY) {
            return e ? e.xy : getXYInCircle(angle, radius, centerX, centerY);
        }
    }, {
        key: 'getRectangle',
        value: function getRectangle() {
            var width = this.refs.$dragAngle.width();
            var height = this.refs.$dragAngle.height();
            var radius = Math.floor(width / 2 * 0.7);

            var _refs$$dragAngle$offs = this.refs.$dragAngle.offset(),
                left = _refs$$dragAngle$offs.left,
                top = _refs$$dragAngle$offs.top;

            var minX = left;
            var minY = top;
            var centerX = minX + width / 2;
            var centerY = minY + height / 2;

            return { minX: minX, minY: minY, width: width, height: height, radius: radius, centerX: centerX, centerY: centerY };
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            var image = this.read('selection/current/image');
            if (!image) return 0;

            var angle = this.read('image/angle', image.angle);
            return angle - 90;
        }
    }, {
        key: 'refreshAngleText',
        value: function refreshAngleText(angleText) {
            this.refs.$angleText.text(angleText + ' °');
        }
    }, {
        key: 'refreshUI',
        value: function refreshUI(e) {
            var _getRectangle = this.getRectangle(),
                minX = _getRectangle.minX,
                minY = _getRectangle.minY,
                radius = _getRectangle.radius,
                centerX = _getRectangle.centerX,
                centerY = _getRectangle.centerY;

            var _getCurrentXY = this.getCurrentXY(e, this.getDefaultValue(), radius, centerX, centerY),
                x = _getCurrentXY.x,
                y = _getCurrentXY.y;

            var rx = x - centerX,
                ry = y - centerY,
                angle = caculateAngle(rx, ry);

            {
                var _getCurrentXY2 = this.getCurrentXY(null, angle, radius, centerX, centerY),
                    x = _getCurrentXY2.x,
                    y = _getCurrentXY2.y;
            }

            // set drag pointer position 
            this.refs.$dragPointer.px('left', x - minX);
            this.refs.$dragPointer.px('top', y - minY);

            var lastAngle = Math.round(angle + 90) % 360;

            this.refreshAngleText(lastAngle);

            if (e) {

                this.setAngle(lastAngle);
            }
        }
    }, {
        key: 'setAngle',
        value: function setAngle(angle) {
            var _this2 = this;

            this.read('selection/current/image/id', function (id) {
                _this2.commit(CHANGE_IMAGE_ANGLE, { id: id, angle: angle });
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE_ANGLE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('changeTool'),
        value: function value() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: 'isDownCheck',
        value: function isDownCheck() {
            return this.isDown;
        }
    }, {
        key: 'isNotDownCheck',
        value: function isNotDownCheck() {
            return !this.isDown;
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document') + CHECKER('isDownCheck'),
        value: function value(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document') + DEBOUNCE(10) + CHECKER('isDownCheck'),
        value: function value(e) {
            this.refreshUI(e);
        }
    }, {
        key: POINTERSTART('$drag_pointer') + CHECKER('isNotDownCheck'),
        value: function value(e) {
            e.preventDefault();
            this.isDown = true;
        }
    }, {
        key: POINTERSTART('$dragAngle') + CHECKER('isNotDownCheck'),
        value: function value(e) {
            this.isDown = true;
            this.refreshUI(e);
        }
    }]);
    return GradientAngle;
}(UIElement);

var _DEFINE_POSITIONS;

var DEFINE_POSITIONS = (_DEFINE_POSITIONS = {}, defineProperty(_DEFINE_POSITIONS, POSITION_CENTER, [POSITION_CENTER, POSITION_CENTER]), defineProperty(_DEFINE_POSITIONS, POSITION_RIGHT, [POSITION_RIGHT, POSITION_CENTER]), defineProperty(_DEFINE_POSITIONS, POSITION_TOP, [POSITION_CENTER, POSITION_TOP]), defineProperty(_DEFINE_POSITIONS, POSITION_LEFT, [POSITION_LEFT, POSITION_CENTER]), defineProperty(_DEFINE_POSITIONS, POSITION_BOTTOM, [POSITION_CENTER, POSITION_BOTTOM]), _DEFINE_POSITIONS);

var GradientPosition = function (_UIElement) {
    inherits(GradientPosition, _UIElement);

    function GradientPosition() {
        classCallCheck(this, GradientPosition);
        return possibleConstructorReturn(this, (GradientPosition.__proto__ || Object.getPrototypeOf(GradientPosition)).apply(this, arguments));
    }

    createClass(GradientPosition, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="drag-position">\n                <div ref="$dragPointer" class="drag-pointer"></div>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.refreshUI();
            }
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            if (!this.read('selection/is/image')) return false;

            var item = this.read('selection/current/image');
            if (!item) return false;

            var isRadial = this.read('image/type/isRadial', item.type);
            var isConic = this.read('image/type/isConic', item.type);

            if (isRadial == false && isConic == false) {
                // radial , conic 만 보여주기 
                return false;
            }

            return this.read('tool/get', 'guide.angle');
        }
    }, {
        key: 'getCurrentXY',
        value: function getCurrentXY(e, position) {

            if (e) {
                var xy = e.xy;

                return [xy.x, xy.y];
            }

            var _getRectangle = this.getRectangle(),
                minX = _getRectangle.minX,
                minY = _getRectangle.minY,
                maxX = _getRectangle.maxX,
                maxY = _getRectangle.maxY,
                width = _getRectangle.width,
                height = _getRectangle.height;

            var p = position;
            if (isString(p) && DEFINE_POSITIONS[p]) {
                p = DEFINE_POSITIONS[p];
            } else if (isString(p)) {
                p = p.split(' ');
            }

            p = p.map(function (item, index) {
                if (item == POSITION_CENTER) {
                    if (index == 0) {
                        return minX + width / 2;
                    } else if (index == 1) {
                        return minY + height / 2;
                    }
                } else if (item === POSITION_LEFT) {
                    return minX;
                } else if (item === POSITION_RIGHT) {
                    return maxX;
                } else if (item === POSITION_TOP) {
                    return minY;
                } else if (item === POSITION_BOTTOM) {
                    return maxY;
                } else {
                    if (index == 0) {
                        return minX * width * (+item / 100);
                    } else if (index == 1) {
                        return minY * height * (+item / 100);
                    }
                }
            });

            return p;
        }
    }, {
        key: 'getRectangle',
        value: function getRectangle() {
            var width = this.$el.width();
            var height = this.$el.height();
            var minX = this.$el.offsetLeft();
            var minY = this.$el.offsetTop();

            var maxX = minX + width;
            var maxY = minY + height;

            return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: width, height: height };
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {

            var item = this.read('selection/current/image');

            if (!item) return '';

            return item.radialPosition || '';
        }
    }, {
        key: 'refreshUI',
        value: function refreshUI(e) {
            var _getRectangle2 = this.getRectangle(),
                minX = _getRectangle2.minX,
                minY = _getRectangle2.minY,
                maxX = _getRectangle2.maxX,
                maxY = _getRectangle2.maxY,
                width = _getRectangle2.width,
                height = _getRectangle2.height;

            var _getCurrentXY = this.getCurrentXY(e, this.getDefaultValue()),
                _getCurrentXY2 = slicedToArray(_getCurrentXY, 2),
                x = _getCurrentXY2[0],
                y = _getCurrentXY2[1];

            x = Math.max(Math.min(maxX, x), minX);
            y = Math.max(Math.min(maxY, y), minY);

            var left = x - minX;
            var top = y - minY;

            this.refs.$dragPointer.px('left', left);
            this.refs.$dragPointer.px('top', top);

            if (e) {

                this.setRadialPosition([percent(Math.floor(left / width * 100)), percent(Math.floor(top / height * 100))]);
            }
        }
    }, {
        key: 'setRadialPosition',
        value: function setRadialPosition(radialPosition) {
            var _this2 = this;

            this.read('selection/current/image/id', function (id) {

                _this2.commit(CHANGE_IMAGE_RADIAL_POSITION, { id: id, radialPosition: radialPosition });
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE_RADIAL_POSITION, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: EVENT('changeTool'),
        value: function value$$1() {
            this.$el.toggle(this.isShow());
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value$$1(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value$$1(e) {
            if (this.isDown) {
                this.refreshUI(e);
            }
        }
    }, {
        key: POINTERSTART('$dragPointer'),
        value: function value$$1(e) {
            e.preventDefault();
            this.isDown = true;
        }
    }, {
        key: POINTERSTART(),
        value: function value$$1(e) {
            this.isDown = true;
            // this.refreshUI(e);        
        }
    }, {
        key: DOUBLECLICK('$dragPointer'),
        value: function value$$1(e) {
            e.preventDefault();
            this.setRadialPosition(POSITION_CENTER);
            this.refreshUI();
        }
    }]);
    return GradientPosition;
}(UIElement);

var PredefinedLinearGradientAngle = function (_UIElement) {
    inherits(PredefinedLinearGradientAngle, _UIElement);

    function PredefinedLinearGradientAngle() {
        classCallCheck(this, PredefinedLinearGradientAngle);
        return possibleConstructorReturn(this, (PredefinedLinearGradientAngle.__proto__ || Object.getPrototypeOf(PredefinedLinearGradientAngle)).apply(this, arguments));
    }

    createClass(PredefinedLinearGradientAngle, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="predefined-angluar-group">\n                <button type="button" data-value="to right"></button>                          \n                <button type="button" data-value="to left"></button>                                                  \n                <button type="button" data-value="to top"></button>                            \n                <button type="button" data-value="to bottom"></button>                                        \n                <button type="button" data-value="to top right"></button>                                \n                <button type="button" data-value="to bottom right"></button>                                    \n                <button type="button" data-value="to bottom left"></button>\n                <button type="button" data-value="to top left"></button>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            if (!this.read('selection/is/image')) return false;
            var image = this.read('selection/current/image');

            if (!image) {
                return false;
            }

            var isLinear = this.read('image/type/isLinear', image.type);
            var isConic = this.read('image/type/isConic', image.type);

            return this.read('tool/get', 'guide.angle') && (isLinear || isConic);
        }
    }, {
        key: CLICK('$el button') + SELF,
        value: function value(e) {
            var _this2 = this;

            this.read('selection/current/image/id', function (id) {
                _this2.commit(CHANGE_IMAGE_LINEAR_ANGLE, { id: id, angle: e.$delegateTarget.attr('data-value') });
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE_LINEAR_ANGLE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: EVENT('changeTool'),
        value: function value() {
            this.refresh();
        }
    }]);
    return PredefinedLinearGradientAngle;
}(UIElement);

var PredefinedRadialGradientPosition = function (_UIElement) {
    inherits(PredefinedRadialGradientPosition, _UIElement);

    function PredefinedRadialGradientPosition() {
        classCallCheck(this, PredefinedRadialGradientPosition);
        return possibleConstructorReturn(this, (PredefinedRadialGradientPosition.__proto__ || Object.getPrototypeOf(PredefinedRadialGradientPosition)).apply(this, arguments));
    }

    createClass(PredefinedRadialGradientPosition, [{
        key: 'template',
        value: function template() {
            return ' \n            <div class="predefined-angluar-group radial-position">\n                <button type="button" data-value="top"></button>                          \n                <button type="button" data-value="left"></button>                                                  \n                <button type="button" data-value="bottom"></button>                            \n                <button type="button" data-value="right"></button>                                        \n            </div>\n        ';
        }
    }, {
        key: CLICK('$el button'),
        value: function value(e) {
            var _this2 = this;

            this.read('selection/current/image/id', function (id) {
                _this2.commit(CHANGE_IMAGE_RADIAL_POSITION, { id: id, radialPosition: e.$delegateTarget.attr('data-value') });
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            if (!this.read('selection/is/image')) return false;

            var image = this.read('selection/current/image');

            if (!image) {
                return false;
            }

            var isRadial = this.read('image/type/isRadial', image.type);
            var isConic = this.read('image/type/isConic', image.type);

            return this.read('tool/get', 'guide.angle') && (isRadial || isConic);
        }
    }, {
        key: EVENT(CHANGE_IMAGE_RADIAL_POSITION, CHANGE_EDITOR, CHANGE_SELECTION, 'changeTool'),
        value: function value() {
            this.refresh();
        }
    }]);
    return PredefinedRadialGradientPosition;
}(UIElement);

var PredefinedRadialGradientAngle = function (_UIElement) {
    inherits(PredefinedRadialGradientAngle, _UIElement);

    function PredefinedRadialGradientAngle() {
        classCallCheck(this, PredefinedRadialGradientAngle);
        return possibleConstructorReturn(this, (PredefinedRadialGradientAngle.__proto__ || Object.getPrototypeOf(PredefinedRadialGradientAngle)).apply(this, arguments));
    }

    createClass(PredefinedRadialGradientAngle, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="predefined-radial-gradient-angle">\n                <button ref="$center" type="button" data-value="center" title="center"><span class=\'circle\'></span></button>            \n                <select class="radial-type-list" ref="$select">\n                    <option value="ellipse">ellipse</option>                \n                    <option value="closest-side">closest-side</option> \n                    <option value="closest-corner">closest-corner</option>\n                    <option value="farthest-side">farthest-side</option>\n                    <option value="farthest-corner">farthest-corner</option>                    \n                    <option value="circle">circle</option>\n                    <option value="circle closest-side">circle closest-side</option> \n                    <option value="circle closest-corner">circle closest-corner</option>\n                    <option value="circle farthest-side">circle farthest-side</option>\n                    <option value="circle farthest-corner">circle farthest-corner</option>                                        \n                </select>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var _this2 = this;

            this.read('selection/current/image', function (image) {
                _this2.refs.$select.val(image.radialType);
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE_RADIAL_POSITION, CHANGE_IMAGE_RADIAL_TYPE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CHANGE('$select'),
        value: function value(e) {
            var _this3 = this;

            this.read('selection/current/image/id', function (id) {
                _this3.commit(CHANGE_IMAGE_RADIAL_TYPE, { id: id, radialType: _this3.refs.$select.val() });
            });
        }
    }, {
        key: CLICK('$center'),
        value: function value(e) {
            var _this4 = this;

            this.read('selection/current/image/id', function (id) {
                _this4.commit(CHANGE_IMAGE_RADIAL_POSITION, { id: id, radialPosition: POSITION_CENTER });
            });
        }
    }]);
    return PredefinedRadialGradientAngle;
}(UIElement);

var BackgroundResizer = function (_UIElement) {
    inherits(BackgroundResizer, _UIElement);

    function BackgroundResizer() {
        classCallCheck(this, BackgroundResizer);
        return possibleConstructorReturn(this, (BackgroundResizer.__proto__ || Object.getPrototypeOf(BackgroundResizer)).apply(this, arguments));
    }

    createClass(BackgroundResizer, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="background-resizer">\n                <div ref="$dragPointer" class="drag-pointer"></div>\n                <div ref="$backgroundRect" class=\'background-rect\'></div>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.refreshUI();
            }
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/image');
        }
    }, {
        key: 'getCurrentXY',
        value: function getCurrentXY(e, position) {

            if (e) {
                var xy = e.xy;

                return [xy.x, xy.y];
            }

            return position;
        }
    }, {
        key: 'getRectangle',
        value: function getRectangle() {
            var width = this.$el.width();
            var height = this.$el.height();
            var minX = this.$el.offsetLeft();
            var minY = this.$el.offsetTop();

            var maxX = minX + width;
            var maxY = minY + height;

            return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: width, height: height };
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {

            var item = this.read('selection/current/image');

            if (!item) return '';

            var x = defaultValue(item.backgroundPositionX, percentUnit(0)).value;
            var y = defaultValue(item.backgroundPositionY, percentUnit(0)).value;
            var width = defaultValue(item.backgroundSizeWidth, percentUnit(100)).value;
            var height = defaultValue(item.backgroundSizeHeight, percentUnit(100)).value;

            return { x: x, y: y, width: width, height: height };
        }
    }, {
        key: 'refreshUI',
        value: function refreshUI(e) {
            var _getRectangle = this.getRectangle(),
                minX = _getRectangle.minX,
                minY = _getRectangle.minY,
                maxX = _getRectangle.maxX,
                maxY = _getRectangle.maxY;

            var _getDefaultValue = this.getDefaultValue(),
                x = _getDefaultValue.x,
                y = _getDefaultValue.y,
                width = _getDefaultValue.width,
                height = _getDefaultValue.height;

            if (e) {
                var _getCurrentXY = this.getCurrentXY(e),
                    _getCurrentXY2 = slicedToArray(_getCurrentXY, 2),
                    x = _getCurrentXY2[0],
                    y = _getCurrentXY2[1];

                x = Math.max(Math.min(maxX, x), minX);
                y = Math.max(Math.min(maxY, y), minY);

                var left = x - minX;
                var top = y - minY;
            } else {

                var left = minX + (maxX - minX) * (x / 100);
                var top = minY + (maxY - minY) * (y / 100);
            }

            left = Math.floor(left);
            top = Math.floor(top);

            this.refs.$dragPointer.px('left', left);
            this.refs.$dragPointer.px('top', top);

            if (e) {
                var newLeft = left / (maxX - minX) * 100;
                var newTop = top / (maxY - minY) * 100;
                this.setBackgroundPosition(percentUnit(newLeft), percentUnit(newTop));
            }
        }
    }, {
        key: 'setBackgroundPosition',
        value: function setBackgroundPosition(backgroundPositionX, backgroundPositionY) {
            var _this2 = this;

            this.read('selection/current/image/id', function (id) {
                _this2.commit(CHANGE_IMAGE, { id: id, backgroundPositionX: backgroundPositionX, backgroundPositionY: backgroundPositionY });
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value$$1(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value$$1(e) {
            if (this.isDown) {
                this.refreshUI(e);
            }
        }
    }, {
        key: POINTERSTART('$dragPointer'),
        value: function value$$1(e) {
            e.preventDefault();
            this.isDown = true;
        }
    }, {
        key: POINTERSTART(),
        value: function value$$1(e) {
            this.isDown = true;
            // this.refreshUI(e);        
        }
    }]);
    return BackgroundResizer;
}(UIElement);

var defined_position = {
    'to right': {
        backgroundPositionX: valueUnit(POSITION_RIGHT),
        backgroundPositionY: valueUnit(POSITION_CENTER)
    },
    'to left': {
        backgroundPositionX: valueUnit(POSITION_LEFT),
        backgroundPositionY: valueUnit(POSITION_CENTER)
    },
    'to top': {
        backgroundPositionX: valueUnit(POSITION_CENTER),
        backgroundPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom': {
        backgroundPositionX: valueUnit(POSITION_CENTER),
        backgroundPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top right': {
        backgroundPositionX: valueUnit(POSITION_RIGHT),
        backgroundPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom right': {
        backgroundPositionX: valueUnit(POSITION_RIGHT),
        backgroundPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to bottom left': {
        backgroundPositionX: valueUnit(POSITION_LEFT),
        backgroundPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top left': {
        backgroundPositionX: valueUnit(POSITION_LEFT),
        backgroundPositionY: valueUnit(POSITION_TOP)
    }
};

var PredefinedBackgroundPosition = function (_UIElement) {
    inherits(PredefinedBackgroundPosition, _UIElement);

    function PredefinedBackgroundPosition() {
        classCallCheck(this, PredefinedBackgroundPosition);
        return possibleConstructorReturn(this, (PredefinedBackgroundPosition.__proto__ || Object.getPrototypeOf(PredefinedBackgroundPosition)).apply(this, arguments));
    }

    createClass(PredefinedBackgroundPosition, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="predefined-background-position">\n                <button type="button" data-value="to right"></button>                          \n                <button type="button" data-value="to left"></button>                                                  \n                <button type="button" data-value="to top"></button>                            \n                <button type="button" data-value="to bottom"></button>                                        \n                <button type="button" data-value="to top right"></button>                                \n                <button type="button" data-value="to bottom right"></button>                                    \n                <button type="button" data-value="to bottom left"></button>\n                <button type="button" data-value="to top left"></button>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/image');
        }
    }, {
        key: 'getPosition',
        value: function getPosition(type) {
            return defined_position[type] || {
                backgroundPositionX: valueUnit(POSITION_CENTER),
                backgroundPositionY: valueUnit(POSITION_CENTER)
            };
        }
    }, {
        key: CLICK('$el button') + SELF,
        value: function value$$1(e) {
            var _this2 = this;

            this.read('selection/current/image/id', function (id) {
                var pos = _this2.getPosition(e.$delegateTarget.attr('data-value'));
                _this2.commit(CHANGE_IMAGE, _extends({ id: id }, pos));
            });
        }
    }, {
        key: EVENT(CHANGE_IMAGE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }]);
    return PredefinedBackgroundPosition;
}(UIElement);

var defined_position$1 = {
    'to right': {
        perspectiveOriginPositionX: valueUnit(POSITION_RIGHT),
        perspectiveOriginPositionY: valueUnit(POSITION_CENTER)
    },
    'to left': {
        perspectiveOriginPositionX: valueUnit(POSITION_LEFT),
        perspectiveOriginPositionY: valueUnit(POSITION_CENTER)
    },
    'to top': {
        perspectiveOriginPositionX: valueUnit(POSITION_CENTER),
        perspectiveOriginPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom': {
        perspectiveOriginPositionX: valueUnit(POSITION_CENTER),
        perspectiveOriginPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top right': {
        perspectiveOriginPositionX: valueUnit(POSITION_RIGHT),
        perspectiveOriginPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom right': {
        perspectiveOriginPositionX: valueUnit(POSITION_RIGHT),
        perspectiveOriginPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to bottom left': {
        perspectiveOriginPositionX: valueUnit(POSITION_LEFT),
        perspectiveOriginPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top left': {
        perspectiveOriginPositionX: valueUnit(POSITION_LEFT),
        perspectiveOriginPositionY: valueUnit(POSITION_TOP)
    }
};

var PredefinedPerspectiveOriginPosition = function (_UIElement) {
    inherits(PredefinedPerspectiveOriginPosition, _UIElement);

    function PredefinedPerspectiveOriginPosition() {
        classCallCheck(this, PredefinedPerspectiveOriginPosition);
        return possibleConstructorReturn(this, (PredefinedPerspectiveOriginPosition.__proto__ || Object.getPrototypeOf(PredefinedPerspectiveOriginPosition)).apply(this, arguments));
    }

    createClass(PredefinedPerspectiveOriginPosition, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="predefined-perspective-origin-position">\n                <button type="button" data-value="to right"></button>                          \n                <button type="button" data-value="to left"></button>                                                  \n                <button type="button" data-value="to top"></button>                            \n                <button type="button" data-value="to bottom"></button>                                        \n                <button type="button" data-value="to top right"></button>                                \n                <button type="button" data-value="to bottom right"></button>                                    \n                <button type="button" data-value="to bottom left"></button>\n                <button type="button" data-value="to top left"></button>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            if (!this.read('selection/is/page')) return false;

            var page = this.read('selection/current/page');

            if (!page) return false;

            return !!page.preserve;
        }
    }, {
        key: 'getPosition',
        value: function getPosition(type) {
            return defined_position$1[type] || {
                perspectiveOriginPositionX: percentUnit(0),
                perspectiveOriginPositionY: percentUnit(0)
            };
        }
    }, {
        key: CLICK('$el button') + SELF,
        value: function value$$1(e) {
            var _this2 = this;

            this.read('selection/current/page/id', function (id) {
                var pos = _this2.getPosition(e.$delegateTarget.attr('data-value'));
                _this2.commit(CHANGE_PAGE_TRANSFORM, _extends({ id: id }, pos));
            });
        }
    }, {
        key: EVENT(CHANGE_PAGE_TRANSFORM, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }]);
    return PredefinedPerspectiveOriginPosition;
}(UIElement);

var _DEFINE_POSITIONS$1;

var DEFINE_POSITIONS$1 = (_DEFINE_POSITIONS$1 = {}, defineProperty(_DEFINE_POSITIONS$1, POSITION_CENTER, [POSITION_CENTER, POSITION_CENTER]), defineProperty(_DEFINE_POSITIONS$1, POSITION_RIGHT, [POSITION_RIGHT, POSITION_CENTER]), defineProperty(_DEFINE_POSITIONS$1, POSITION_TOP, [POSITION_CENTER, POSITION_TOP]), defineProperty(_DEFINE_POSITIONS$1, POSITION_LEFT, [POSITION_LEFT, POSITION_CENTER]), defineProperty(_DEFINE_POSITIONS$1, POSITION_BOTTOM, [POSITION_CENTER, POSITION_BOTTOM]), _DEFINE_POSITIONS$1);

var PerspectiveOriginPosition = function (_UIElement) {
    inherits(PerspectiveOriginPosition, _UIElement);

    function PerspectiveOriginPosition() {
        classCallCheck(this, PerspectiveOriginPosition);
        return possibleConstructorReturn(this, (PerspectiveOriginPosition.__proto__ || Object.getPrototypeOf(PerspectiveOriginPosition)).apply(this, arguments));
    }

    createClass(PerspectiveOriginPosition, [{
        key: 'template',
        value: function template() {
            return '\n            <div class="perspective-drag-position">\n                <div ref="$dragPointer" class="drag-pointer"></div>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.refreshUI();
            }
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            if (!this.read('selection/is/page')) return false;

            var page = this.read('selection/current/page');
            if (!page) return false;

            return !!page.preserve;
        }
    }, {
        key: 'getCurrentXY',
        value: function getCurrentXY(e, position) {

            if (e) {
                var xy = e.xy;

                return [xy.x, xy.y];
            }

            var _getRectangle = this.getRectangle(),
                minX = _getRectangle.minX,
                minY = _getRectangle.minY,
                maxX = _getRectangle.maxX,
                maxY = _getRectangle.maxY,
                width = _getRectangle.width,
                height = _getRectangle.height;

            var p = position;
            if (isString(p) && DEFINE_POSITIONS$1[p]) {
                p = DEFINE_POSITIONS$1[p];
            } else if (isString(p)) {
                p = p.split(' ');
            } else {
                p = [unitValue(p.perspectiveOriginPositionX), unitValue(p.perspectiveOriginPositionY)];
            }

            p = p.map(function (item, index) {
                if (item == POSITION_CENTER) {
                    if (index == 0) {
                        return minX + width / 2;
                    } else if (index == 1) {
                        return minY + height / 2;
                    }
                } else if (item === POSITION_LEFT) {
                    return minX;
                } else if (item === POSITION_RIGHT) {
                    return maxX;
                } else if (item === POSITION_TOP) {
                    return minY;
                } else if (item === POSITION_BOTTOM) {
                    return maxY;
                } else {
                    if (index == 0) {
                        return minX + width * (+item / 100);
                    } else if (index == 1) {
                        return minY + height * (+item / 100);
                    }
                }
            });

            return p;
        }
    }, {
        key: 'getRectangle',
        value: function getRectangle() {
            var width = this.$el.width();
            var height = this.$el.height();
            var minX = this.$el.offsetLeft();
            var minY = this.$el.offsetTop();

            var maxX = minX + width;
            var maxY = minY + height;

            return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: width, height: height };
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {

            var item = this.read('selection/current/page');

            if (!item) return '';

            return {
                perspectiveOriginPositionX: defaultValue(item.perspectiveOriginPositionX, percentUnit(0)),
                perspectiveOriginPositionY: defaultValue(item.perspectiveOriginPositionY, percentUnit(0))
            } || '';
        }
    }, {
        key: 'refreshUI',
        value: function refreshUI(e) {
            var _getRectangle2 = this.getRectangle(),
                minX = _getRectangle2.minX,
                minY = _getRectangle2.minY,
                maxX = _getRectangle2.maxX,
                maxY = _getRectangle2.maxY,
                width = _getRectangle2.width,
                height = _getRectangle2.height;

            var _getCurrentXY = this.getCurrentXY(e, this.getDefaultValue()),
                _getCurrentXY2 = slicedToArray(_getCurrentXY, 2),
                x = _getCurrentXY2[0],
                y = _getCurrentXY2[1];

            x = Math.max(Math.min(maxX, x), minX);
            y = Math.max(Math.min(maxY, y), minY);

            var left = x - minX;
            var top = y - minY;

            this.refs.$dragPointer.px('left', left);
            this.refs.$dragPointer.px('top', top);

            if (e) {

                this.setPerspectiveOriginPosition(percentUnit(Math.floor(left / width * 100)), percentUnit(Math.floor(top / height * 100)));
            }
        }
    }, {
        key: 'setPerspectiveOriginPosition',
        value: function setPerspectiveOriginPosition(perspectiveOriginPositionX, perspectiveOriginPositionY) {
            var _this2 = this;

            this.read('selection/current/page/id', function (id) {
                _this2.commit(CHANGE_PAGE_TRANSFORM, { id: id, perspectiveOriginPositionX: perspectiveOriginPositionX, perspectiveOriginPositionY: perspectiveOriginPositionY });
            });
        }
    }, {
        key: EVENT(CHANGE_PAGE_TRANSFORM, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value$$1(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value$$1(e) {
            if (this.isDown) {
                this.refreshUI(e);
            }
        }
    }, {
        key: POINTERSTART('$dragPointer'),
        value: function value$$1(e) {
            e.preventDefault();
            this.isDown = true;
        }
    }, {
        key: POINTERSTART(),
        value: function value$$1(e) {
            this.isDown = true;
            // this.refreshUI(e);        
        }
    }, {
        key: DOUBLECLICK('$dragPointer'),
        value: function value$$1(e) {
            e.preventDefault();
            this.setPerspectiveOriginPosition(valueUnit(POSITION_CENTER), valueUnit(POSITION_CENTER));
            this.refreshUI();
        }
    }]);
    return PerspectiveOriginPosition;
}(UIElement);

var SubFeatureControl = function (_UIElement) {
    inherits(SubFeatureControl, _UIElement);

    function SubFeatureControl() {
        classCallCheck(this, SubFeatureControl);
        return possibleConstructorReturn(this, (SubFeatureControl.__proto__ || Object.getPrototypeOf(SubFeatureControl)).apply(this, arguments));
    }

    createClass(SubFeatureControl, [{
        key: "template",
        value: function template() {
            return "\n            <div class='sub-feature-control'>         \n                <div class='feature'>\n                    <div class=\"property-view\" ref=\"$perspective\">\n                        <PredefinedPerspectiveOriginPosition></PredefinedPerspectiveOriginPosition>\n                        <PerspectiveOriginPosition></PerspectiveOriginPosition>\n                    </div>\n                    <div class=\"property-view\" ref=\"$backgroundSize\">\n                        <PredefinedBackgroundPosition></PredefinedBackgroundPosition>\n                        <BackgroundResizer></BackgroundResizer>\n                    </div>\n                    <div class=\"property-view linear\" ref=\"$linear\">\n                        <PredefinedLinearGradientAngle></PredefinedLinearGradientAngle>\n                        <GradientAngle></GradientAngle>                            \n                    </div>\n                    <div class=\"property-view radial\" ref=\"$radial\">\n                        <PredefinedRadialGradientAngle></PredefinedRadialGradientAngle>\n                        <PredefinedRadialGradientPosition></PredefinedRadialGradientPosition>\n                        <GradientPosition></GradientPosition>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return _extends({
                PerspectiveOriginPosition: PerspectiveOriginPosition,
                PredefinedPerspectiveOriginPosition: PredefinedPerspectiveOriginPosition,
                PredefinedRadialGradientAngle: PredefinedRadialGradientAngle,
                GradientAngle: GradientAngle,
                GradientPosition: GradientPosition,
                PredefinedLinearGradientAngle: PredefinedLinearGradientAngle,
                PredefinedRadialGradientPosition: PredefinedRadialGradientPosition,
                BackgroundResizer: BackgroundResizer,
                PredefinedBackgroundPosition: PredefinedBackgroundPosition
            }, items);
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.$el.toggle(this.isShow());
            this.refs.$perspective.toggleClass('hide', this.isNotPage());
            this.refs.$backgroundSize.toggleClass('hide', this.isNotImage());
            this.refs.$linear.toggleClass('hide', !this.isLinearShow());
            this.refs.$radial.toggleClass('hide', !this.isRadialShow());
        }
    }, {
        key: "isShow",
        value: function isShow() {
            //if (!this.read('selection/is/image')) return false;         
            return true;
        }
    }, {
        key: "isNotImage",
        value: function isNotImage() {
            return this.read('selection/is/image') == false;
        }
    }, {
        key: "isNotPage",
        value: function isNotPage() {
            if (!this.read('selection/is/page')) return true;

            var item = this.read('selection/current/page');
            if (!item) return true;

            return !item.preserve;
        }
    }, {
        key: "isLinearShow",
        value: function isLinearShow() {
            if (!this.read('selection/is/image')) return false;

            var item = this.read('selection/current/image');

            if (!item) return false;

            var isLinear = this.read('image/type/isLinear', item.type);
            var isConic = this.read('image/type/isConic', item.type);

            if (isLinear == false && isConic == false) {
                return false;
            }

            return this.read('tool/get', 'guide.angle');
        }
    }, {
        key: "isRadialShow",
        value: function isRadialShow() {
            if (!this.read('selection/is/image')) return false;

            var item = this.read('selection/current/image');
            if (!item) return false;

            var isRadial = this.read('image/type/isRadial', item.type);
            var isConic = this.read('image/type/isConic', item.type);

            if (isRadial == false && isConic == false) {
                return false;
            }

            return this.read('tool/get', 'guide.angle');
        }
    }, {
        key: EVENT(CHANGE_PAGE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }]);
    return SubFeatureControl;
}(UIElement);

var colorpicker_class = 'codemirror-colorview';
var colorpicker_background_class = 'codemirror-colorview-background';
// Excluded tokens do not show color views..
var excluded_token = ['comment'];

function onChange(cm, evt) {
    if (evt.origin == 'setValue') {
        // if content is changed by setValue method, it initialize markers
        cm.state.colorpicker.close_color_picker();
        cm.state.colorpicker.init_color_update();
        cm.state.colorpicker.style_color_update();
    } else {
        cm.state.colorpicker.style_color_update(cm.getCursor().line);
    }
}

function onUpdate(cm, evt) {
    if (!cm.state.colorpicker.isUpdate) {
        cm.state.colorpicker.isUpdate = true;
        cm.state.colorpicker.close_color_picker();
        cm.state.colorpicker.init_color_update();
        cm.state.colorpicker.style_color_update();
    }
}

function onRefresh(cm, evt) {
    onChange(cm, { origin: 'setValue' });
}

function onKeyup(cm, evt) {
    cm.state.colorpicker.keyup(evt);
}

function onMousedown(cm, evt) {
    if (cm.state.colorpicker.is_edit_mode()) {
        cm.state.colorpicker.check_mousedown(evt);
    }
}

function onPaste(cm, evt) {
    onChange(cm, { origin: 'setValue' });
}

function onScroll(cm) {
    cm.state.colorpicker.close_color_picker();
}

function debounce$1(callback, delay) {

    var t = undefined;

    return function (cm, e) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback(cm, e);
        }, delay || 300);
    };
}

function has_class(el, cls) {
    if (!el || !el.className) {
        return false;
    } else {
        var newClass = ' ' + el.className + ' ';
        return newClass.indexOf(' ' + cls + ' ') > -1;
    }
}

var ColorView$2 = function () {
    function ColorView(cm, opt) {
        classCallCheck(this, ColorView);

        if (isBoolean(opt)) {
            opt = { mode: 'edit' };
        } else {
            opt = Object.assign({ mode: 'edit' }, opt || {});
        }

        this.opt = opt;
        this.cm = cm;
        this.markers = {};

        // set excluded token 
        this.excluded_token = this.opt.excluded_token || excluded_token;

        if (this.opt.colorpicker) {
            this.colorpicker = this.opt.colorpicker(this.opt);
        } else {
            this.colorpicker = ColorPicker.create(this.opt);
        }

        this.init_event();
    }

    createClass(ColorView, [{
        key: 'init_event',
        value: function init_event() {

            this.cm.on('mousedown', onMousedown);
            this.cm.on('keyup', onKeyup);
            this.cm.on('change', onChange);
            this.cm.on('update', onUpdate);
            this.cm.on('refresh', onRefresh);

            // create paste callback
            this.onPasteCallback = function (cm, callback) {
                return function (evt) {
                    callback.call(this, cm, evt);
                };
            }(this.cm, onPaste);

            this.cm.getWrapperElement().addEventListener('paste', this.onPasteCallback);

            if (this.is_edit_mode()) {
                this.cm.on('scroll', debounce$1(onScroll, 50));
            }
        }
    }, {
        key: 'is_edit_mode',
        value: function is_edit_mode() {
            return this.opt.mode == 'edit';
        }
    }, {
        key: 'is_view_mode',
        value: function is_view_mode() {
            return this.opt.mode == 'view';
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.cm.off('mousedown', onMousedown);
            this.cm.off('keyup', onKeyup);
            this.cm.off('change', onChange);
            this.cm.getWrapperElement().removeEventListener('paste', this.onPasteCallback);

            if (this.is_edit_mode()) {
                this.cm.off('scroll');
            }
        }
    }, {
        key: 'hasClass',
        value: function hasClass(el, className) {
            if (!el.className) {
                return false;
            } else {
                var newClass = ' ' + el.className + ' ';
                return newClass.indexOf(' ' + className + ' ') > -1;
            }
        }
    }, {
        key: 'check_mousedown',
        value: function check_mousedown(evt) {
            if (this.hasClass(evt.target, colorpicker_background_class)) {
                this.open_color_picker(evt.target.parentNode);
            } else {
                this.close_color_picker();
            }
        }
    }, {
        key: 'popup_color_picker',
        value: function popup_color_picker(defalutColor) {
            var cursor = this.cm.getCursor();
            var self = this;
            var colorMarker = {
                lineNo: cursor.line,
                ch: cursor.ch,
                color: defalutColor || '#FFFFFF',
                isShortCut: true
            };

            Object.keys(this.markers).forEach(function (key) {
                var searchKey = "#" + key;
                if (searchKey.indexOf("#" + colorMarker.lineNo + ":") > -1) {
                    var marker = self.markers[key];

                    if (marker.ch <= colorMarker.ch && colorMarker.ch <= marker.ch + marker.color.length) {
                        // when cursor has marker
                        colorMarker.ch = marker.ch;
                        colorMarker.color = marker.color;
                        colorMarker.nameColor = marker.nameColor;
                    }
                }
            });

            this.open_color_picker(colorMarker);
        }
    }, {
        key: 'open_color_picker',
        value: function open_color_picker(el) {
            var lineNo = el.lineNo;
            var ch = el.ch;
            var nameColor = el.nameColor;
            var color = el.color;

            if (this.colorpicker) {
                var self = this;
                var prevColor = color;
                var pos = this.cm.charCoords({ line: lineNo, ch: ch });
                this.colorpicker.show({
                    left: pos.left,
                    top: pos.bottom,
                    isShortCut: el.isShortCut || false,
                    hideDelay: self.opt.hideDelay || 2000
                }, nameColor || color, function (newColor) {
                    self.cm.replaceRange(newColor, { line: lineNo, ch: ch }, { line: lineNo, ch: ch + prevColor.length }, '*colorpicker');
                    prevColor = newColor;
                });
            }
        }
    }, {
        key: 'close_color_picker',
        value: function close_color_picker(el) {
            if (this.colorpicker) {
                this.colorpicker.hide();
            }
        }
    }, {
        key: 'key',
        value: function key(lineNo, ch) {
            return [lineNo, ch].join(":");
        }
    }, {
        key: 'keyup',
        value: function keyup(evt) {

            if (this.colorpicker) {
                if (evt.key == 'Escape') {
                    this.colorpicker.hide();
                } else if (this.colorpicker.isShortCut == false) {
                    this.colorpicker.hide();
                }
            }
        }
    }, {
        key: 'init_color_update',
        value: function init_color_update() {
            this.markers = {}; // initialize marker list
        }
    }, {
        key: 'style_color_update',
        value: function style_color_update(lineHandle) {
            if (lineHandle) {
                this.match(lineHandle);
            } else {
                var max = this.cm.lineCount();

                for (var lineNo = 0; lineNo < max; lineNo++) {
                    this.match(lineNo);
                }
            }
        }
    }, {
        key: 'empty_marker',
        value: function empty_marker(lineNo, lineHandle) {
            var list = lineHandle.markedSpans || [];

            for (var i = 0, len = list.length; i < len; i++) {
                var key = this.key(lineNo, list[i].from);

                if (key && has_class(list[i].marker.replacedWith, colorpicker_class)) {
                    delete this.markers[key];
                    list[i].marker.clear();
                }
            }
        }
    }, {
        key: 'match_result',
        value: function match_result(lineHandle) {
            return Color$1.matches(lineHandle.text);
        }
    }, {
        key: 'submatch',
        value: function submatch(lineNo, lineHandle) {
            var _this = this;

            this.empty_marker(lineNo, lineHandle);

            var result = this.match_result(lineHandle);
            var obj = { next: 0 };

            result.forEach(function (item) {
                _this.render(obj, lineNo, lineHandle, item.color, item.nameColor);
            });
        }
    }, {
        key: 'match',
        value: function match(lineNo) {
            var lineHandle = this.cm.getLineHandle(lineNo);
            var self = this;
            this.cm.operation(function () {
                self.submatch(lineNo, lineHandle);
            });
        }
    }, {
        key: 'make_element',
        value: function make_element() {
            var el = document.createElement('div');

            el.className = colorpicker_class;

            if (this.is_edit_mode()) {
                el.title = "open color picker";
            } else {
                el.title = "";
            }

            el.back_element = this.make_background_element();
            el.appendChild(el.back_element);

            return el;
        }
    }, {
        key: 'make_background_element',
        value: function make_background_element() {
            var el = document.createElement('div');

            el.className = colorpicker_background_class;

            return el;
        }
    }, {
        key: 'set_state',
        value: function set_state(lineNo, start, color, nameColor) {
            var marker = this.create_marker(lineNo, start);

            marker.lineNo = lineNo;
            marker.ch = start;
            marker.color = color;
            marker.nameColor = nameColor;

            return marker;
        }
    }, {
        key: 'create_marker',
        value: function create_marker(lineNo, start) {

            if (!this.has_marker(lineNo, start)) {
                this.init_marker(lineNo, start);
            }

            return this.get_marker(lineNo, start);
        }
    }, {
        key: 'init_marker',
        value: function init_marker(lineNo, start) {
            this.markers[this.key(lineNo, start)] = this.make_element();
        }
    }, {
        key: 'has_marker',
        value: function has_marker(lineNo, start) {
            return !!this.get_marker(lineNo, start);
        }
    }, {
        key: 'get_marker',
        value: function get_marker(lineNo, start) {
            var key = this.key(lineNo, start);
            return this.markers[key];
        }
    }, {
        key: 'update_element',
        value: function update_element(el, color) {
            el.back_element.style.backgroundColor = color;
        }
    }, {
        key: 'set_mark',
        value: function set_mark(line, ch, el) {
            this.cm.setBookmark({ line: line, ch: ch }, { widget: el, handleMouseEvents: true });
        }
    }, {
        key: 'is_excluded_token',
        value: function is_excluded_token(line, ch) {
            var type = this.cm.getTokenTypeAt({ line: line, ch: ch });
            var count = 0;
            for (var i = 0, len = this.excluded_token.length; i < len; i++) {
                if (type === this.excluded_token[i]) {
                    count++;
                    break;
                }
            }

            return count > 0; // true is that it has a excluded token 
        }
    }, {
        key: 'render',
        value: function render(cursor, lineNo, lineHandle, color, nameColor) {
            var start = lineHandle.text.indexOf(color, cursor.next);

            if (this.is_excluded_token(lineNo, start) === true) {
                // excluded token do not show.
                return;
            }

            cursor.next = start + color.length;

            if (this.has_marker(lineNo, start)) {
                this.update_element(this.create_marker(lineNo, start), nameColor || color);
                this.set_state(lineNo, start, color, nameColor);
                return;
            }

            var el = this.create_marker(lineNo, start);

            this.update_element(el, nameColor || color);

            this.set_state(lineNo, start, color, nameColor || color);
            this.set_mark(lineNo, start, el);
        }
    }]);
    return ColorView;
}();

try {
    var CodeMirror$1 = require('codemirror');
} catch (e) {}

var CHECK_CODEMIRROR_OBJECT = function CHECK_CODEMIRROR_OBJECT() {
    return CodeMirror$1 || window.CodeMirror;
};
function LOAD_CODEMIRROR_COLORPICKER() {
    var CODEMIRROR_OBJECT = CHECK_CODEMIRROR_OBJECT();

    if (CODEMIRROR_OBJECT) {
        CODEMIRROR_OBJECT.defineOption("colorpicker", false, function (cm, val, old) {
            if (old && old != CODEMIRROR_OBJECT.Init) {

                if (cm.state.colorpicker) {
                    cm.state.colorpicker.destroy();
                    cm.state.colorpicker = null;
                }
                // remove event listener
            }

            if (val) {
                cm.state.colorpicker = new ColorView$2(cm, val);
            }
        });
    }
}

LOAD_CODEMIRROR_COLORPICKER();

var ColorPickerCodeMirror = {
    load: LOAD_CODEMIRROR_COLORPICKER
};

var ExportCodePenButton = function (_UIElement) {
    inherits(ExportCodePenButton, _UIElement);

    function ExportCodePenButton() {
        classCallCheck(this, ExportCodePenButton);
        return possibleConstructorReturn(this, (ExportCodePenButton.__proto__ || Object.getPrototypeOf(ExportCodePenButton)).apply(this, arguments));
    }

    createClass(ExportCodePenButton, [{
        key: "template",
        value: function template() {
            return "\n            <form class='codepen' action=\"https://codepen.io/pen/define\" method=\"POST\" target=\"_blank\">\n                <input type=\"hidden\" name=\"data\" ref=\"$codepen\" value=''>\n                <button type=\"submit\">CodePen</button>\n            </form>     \n        ";
        }
    }, {
        key: SUBMIT(),
        value: function value() {
            var generateCode = this.read('export/generate/code');
            this.refs.$codepen.val(this.read('export/codepen/code', {
                html: generateCode.html,
                css: generateCode.css
            }));

            return false;
        }
    }]);
    return ExportCodePenButton;
}(UIElement);

var ExportJSFiddleButton = function (_UIElement) {
    inherits(ExportJSFiddleButton, _UIElement);

    function ExportJSFiddleButton() {
        classCallCheck(this, ExportJSFiddleButton);
        return possibleConstructorReturn(this, (ExportJSFiddleButton.__proto__ || Object.getPrototypeOf(ExportJSFiddleButton)).apply(this, arguments));
    }

    createClass(ExportJSFiddleButton, [{
        key: "template",
        value: function template() {
            return "\n            <form class='jsfiddle' action=\"http://jsfiddle.net/api/post/library/pure/\" method=\"POST\" target=\"_blank\">\n                <input type=\"hidden\" name=\"title\" ref=\"$title\" value=''>\n                <input type=\"hidden\" name=\"description\" ref=\"$description\" value=''>\n                <input type=\"hidden\" name=\"html\" ref=\"$html\" value=''>\n                <input type=\"hidden\" name=\"css\" ref=\"$css\" value=''>\n                <input type=\"hidden\" name=\"dtd\" value='html 5'>\n                <button type=\"submit\">JSFiddle</button>\n            </form>     \n        ";
        }
    }, {
        key: SUBMIT(),
        value: function value() {
            var generateCode = this.read('export/generate/code');

            this.refs.$title.val('CSS Gradient Editor');
            this.refs.$description.val('EasyLogic Studio - https://css.easylogic.studio');
            this.refs.$html.val(generateCode.html);
            this.refs.$css.val(generateCode.css);

            return false;
        }
    }]);
    return ExportJSFiddleButton;
}(UIElement);

var ExportWindow = function (_UIElement) {
    inherits(ExportWindow, _UIElement);

    function ExportWindow() {
        classCallCheck(this, ExportWindow);
        return possibleConstructorReturn(this, (ExportWindow.__proto__ || Object.getPrototypeOf(ExportWindow)).apply(this, arguments));
    }

    createClass(ExportWindow, [{
        key: "components",
        value: function components() {
            return {
                ExportJSFiddleButton: ExportJSFiddleButton,
                ExportCodePenButton: ExportCodePenButton
            };
        }
    }, {
        key: "template",
        value: function template() {
            return "\n            <div class='export-view'>\n                <div class=\"color-view\">\n                    <div class=\"close\" ref=\"$close\">&times;</div>        \n                    <div class=\"codeview-container\">\n                        <div class=\"title\">\n                            <div class=\"tools\" ref=\"$title\">\n                                <div class=\"tool-item selected\" data-type=\"fullhtml\" ref=\"$fullhtmlTitle\">Full HTML</div>\n                                <div class=\"tool-item\" data-type=\"html\" ref=\"$htmlTitle\">HTML</div>\n                                <div class=\"tool-item\" data-type=\"css\" ref=\"$cssTitle\">CSS</div>\n                            </div>\n                            <div class=\"buttons\">\n                                <ExportCodePenButton></ExportCodePenButton>\n                                <ExportJSFiddleButton></ExportJSFiddleButton>\n                            </div>\n                        </div>\n                        <div class=\"codeview\">\n                            <div class=\"content-item selected\" data-type=\"fullhtml\" ref=\"$fullhtmlContent\">\n                                <textarea ref=\"$fullhtml\"></textarea>\n                            </div>\n                            <div class=\"content-item\" data-type=\"html\" ref=\"$htmlContent\">\n                                <textarea ref=\"$html\"></textarea>\n                            </div>\n                            <div class=\"content-item\" data-type=\"css\" ref=\"$cssContent\">\n                                <textarea ref=\"$css\"></textarea>\n                            </div>                            \n                        </div>\n                    </div>\n                    <div class=\"preview-container\">\n                        <div class=\"title\">Preview</div>\n                        <div class='preview' ref=\"$preview\"></div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "afterRender",
        value: function afterRender() {
            ColorPickerCodeMirror.load();
            var mixedMode = {
                name: "htmlmixed",
                scriptTypes: [{ matches: /\/x-handlebars-template|\/x-mustache/i,
                    mode: null }, { matches: /(text|application)\/(x-)?vb(a|script)/i,
                    mode: "vbscript" }]
            };
            this.cmFullHtml = CodeMirror.fromTextArea(this.refs.$fullhtml.el, {
                lineNumbers: true,
                readOnly: true,
                lineWrapping: true,
                mode: mixedMode,
                colorpicker: {
                    mode: 'view'
                }
            });

            this.cmHtml = CodeMirror.fromTextArea(this.refs.$html.el, {
                lineNumbers: true,
                readOnly: true,
                lineWrapping: true,
                mode: mixedMode
            });

            this.cmCss = CodeMirror.fromTextArea(this.refs.$css.el, {
                lineNumbers: true,
                readOnly: true,
                lineWrapping: true,
                mode: "text/css",
                colorpicker: {
                    mode: 'view'
                }
            });
        }
    }, {
        key: "loadCode",
        value: function loadCode() {
            var page = this.read('selection/current/page');

            if (!page) {
                return '';
            }

            var generateCode = this.read('export/generate/code');

            if (this.cmFullHtml) {
                this.cmFullHtml.setValue(generateCode.fullhtml);
                this.cmFullHtml.refresh();
            }

            if (this.cmHtml) {
                this.cmHtml.setValue(generateCode.html);
                this.cmHtml.refresh();
            }

            if (this.cmCss) {
                this.cmCss.setValue(generateCode.css);
                this.cmCss.refresh();
            }

            this.refs.$preview.html(generateCode.fullhtml);
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.loadCode();
        }
    }, {
        key: CLICK('$close'),
        value: function value(e) {
            this.$el.hide();
        }
    }, {
        key: CLICK('$title .tool-item'),
        value: function value(e) {
            var _this2 = this;

            var type = e.$delegateTarget.attr('data-type');

            Object.keys(this.refs).filter(function (it) {
                return it.includes('Title');
            }).forEach(function (key) {
                var obj = _this2.refs[key];
                obj.toggleClass('selected', "$" + type + "Title" == key);
            });

            Object.keys(this.refs).filter(function (it) {
                return it.includes('Content');
            }).forEach(function (key) {
                var obj = _this2.refs[key];
                obj.toggleClass('selected', "$" + type + "Content" == key);

                if (_this2.cmFullHtml) _this2.cmFullHtml.refresh();
                if (_this2.cmHtml) _this2.cmHtml.refresh();
                if (_this2.cmCss) _this2.cmCss.refresh();
            });
        }
    }, {
        key: EVENT('toggleExport'),
        value: function value() {
            this.$el.toggle();
        }
    }, {
        key: EVENT('showExport'),
        value: function value() {
            this.$el.show();
            this.refresh();
        }
    }, {
        key: EVENT('hideExport'),
        value: function value() {
            this.$el.hide();
        }
    }]);
    return ExportWindow;
}(UIElement);

var Timeline = function (_UIElement) {
    inherits(Timeline, _UIElement);

    function Timeline() {
        classCallCheck(this, Timeline);
        return possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).apply(this, arguments));
    }

    createClass(Timeline, [{
        key: "template",
        value: function template() {
            return "\n            <div class='timeline-view'>\n                <div class=\"timeline-header\" ref=\"$header\">\n                    Timeline\n                </div>\n                <div class='timeline-body\"></div>\n            </div>\n        ";
        }
    }, {
        key: CLICK('$header'),
        value: function value() {
            this.parent.toggleTimeline();
        }
    }]);
    return Timeline;
}(UIElement);

var DropView = function (_UIElement) {
    inherits(DropView, _UIElement);

    function DropView() {
        classCallCheck(this, DropView);
        return possibleConstructorReturn(this, (DropView.__proto__ || Object.getPrototypeOf(DropView)).apply(this, arguments));
    }

    createClass(DropView, [{
        key: "template",
        value: function template() {
            return "\n            <div class='drop-view'>\n                <div class='drop-overview'></div>\n            </div>\n        ";
        }
    }, {
        key: DRAGOVER('document'),
        value: function value(e) {
            e.preventDefault();
            this.$el.show();
        }
    }, {
        key: DRAGOUT('document'),
        value: function value(e) {
            e.preventDefault();
            this.$el.hide();
        }
    }, {
        key: DROP('document'),
        value: function value(e) {
            var _this2 = this;

            e.preventDefault();

            var dataTransfer = e.dataTransfer;

            var items = [].concat(toConsumableArray(dataTransfer.items));
            var types = [].concat(toConsumableArray(dataTransfer.types)).filter(function (type) {
                return type == 'text/uri-list';
            });

            var dataList = types.map(function (type) {
                return dataTransfer.getData(type);
            });

            if (dataList.length) {
                this.read('selection/current/layer', function (layer) {
                    _this2.read('image/get/url', dataList, function (img) {
                        _this2.dispatch('item/prepend/image/url', img, true, layer.id);
                    });
                });
            }

            var files = [].concat(toConsumableArray(dataTransfer.files));
            if (files.length) {
                this.read('selection/current/layer', function (layer) {
                    _this2.read('image/get/file', files, function (img) {
                        _this2.dispatch('item/prepend/image/file', img, true, layer.id);
                    });
                });
            }
        }
    }, {
        key: PASTE('document'),
        value: function value(e) {
            var _this3 = this;

            var dataTransfer = e.clipboardData;

            var items = [].concat(toConsumableArray(dataTransfer.items));
            var types = [].concat(toConsumableArray(dataTransfer.types)).filter(function (type) {
                return type == 'text/uri-list';
            });

            var dataList = types.map(function (type) {
                return dataTransfer.getData(type);
            });

            if (dataList.length) {
                this.read('selection/current/layer', function (layer) {
                    _this3.read('image/get/url', dataList, function (url) {
                        _this3.dispatch('item/prepend/image/url', url, true, layer.id);
                    });
                });
            }

            var files = [].concat(toConsumableArray(dataTransfer.files));
            if (files.length) {
                this.read('selection/current/layer', function (layer) {
                    _this3.read('image/get/file', files, function (img) {
                        _this3.dispatch('item/prepend/image/file', img, true, layer.id);
                        _this3.refresh();
                    });
                });
            }
        }
    }]);
    return DropView;
}(UIElement);

var VerticalColorStep = function (_UIElement) {
    inherits(VerticalColorStep, _UIElement);

    function VerticalColorStep() {
        classCallCheck(this, VerticalColorStep);
        return possibleConstructorReturn(this, (VerticalColorStep.__proto__ || Object.getPrototypeOf(VerticalColorStep)).apply(this, arguments));
    }

    createClass(VerticalColorStep, [{
        key: "components",
        value: function components() {
            return {
                GradientSteps: GradientSteps
            };
        }
    }, {
        key: "template",
        value: function template() {
            return "\n            <div class='vertical-colorstep'>\n                <GradientSteps></GradientSteps>\n            </div>\n        ";
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.$el.toggle(this.isShow());
            this.$el.px('width', this.$store.step.width);
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/image');

            if (!item) return false;

            return this.read('image/type/isGradient', item.type);
        }
    }]);
    return VerticalColorStep;
}(UIElement);

var bezierList = [[0, 0, 1, 1, 'linear'], [0.25, 0.1, 0.25, 1, 'ease'], [0.42, 0, 1, 1, 'ease-in'], [0.47, 0, 0.745, 0.715, 'ease-in-sine'], [0.55, 0.085, 0.68, 0.53, 'ease-in-quad'], [0.55, 0.055, 0.675, 0.19, 'ease-in-cubic'], [0.895, 0.03, 0.685, 0.22, 'ease-in-quart'], [0.755, 0.05, 0.855, 0.06, 'ease-in-quint'], [0.95, 0.05, 0.795, 0.035, 'ease-in-expo'], [0.60, 0.04, 0.98, 0.335, 'ease-in-circ'], [0.60, -0.28, 0.735, 0.045, 'ease-in-back'], [0.42, 0, 0.58, 1, 'ease-in-out'], [0.445, 0.05, 0.55, 0.95, 'ease-in-out-sine'], [0.455, 0.03, 0.515, 0.955, 'ease-in-out-quad'], [0.645, 0.045, 0.355, 1, 'ease-in-out-cubic'], [0.77, 0, 0.175, 1, 'ease-in-out-quart'], [0.86, 0, 0.07, 1, 'ease-in-out-quint'], [1, 0, 0, 1, 'ease-in-out-expo'], [0.785, 0.135, 0.15, 0.86, 'ease-in-out-circ'], [0.68, -0.55, 0.265, 1.55, 'ease-in-out-back'], [0, 0, 0.58, 1, 'ease-out'], [0.39, 0.575, 0.565, 1, 'ease-out-sine'], [0.25, 0.46, 0.45, 0.94, 'ease-out-quad'], [0.215, 0.61, 0.355, 1, 'ease-out-cubic'], [0.165, 0.84, 0.44, 1, 'ease-out-quart'], [0.23, 1, 0.32, 1, 'ease-out-quint'], [0.19, 1, 0.22, 1, 'ease-out-expo'], [0.075, 0.82, 0.165, 1, 'ease-out-circ'], [0.175, 0.885, 0.32, 1.275, 'ease-out-back']];

var stepTimingFunction = function stepTimingFunction() {
    var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';

    return function (progress) {
        var stepDist = 1 / step;

        if (position == 'start') {
            return stepDist * Math.ceil(progress / stepDist);
        } else if (position == 'end') {
            return stepDist * Math.floor(progress / stepDist);
        }
    };
};

var Timing = {
    'ease-out-elastic': function easeOutElastic(progress, duration, start, end) {
        return Math.pow(2, -10 * progress) * Math.sin((progress - .1) * 5 * Math.PI) + 1;
    },
    'cubic-bezier': function cubicBezier$$1(x1, y1, x2, y2) {
        return cubicBezier(x1, y1, x2, y2);
    },
    'step': function step() {
        var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';

        return stepTimingFunction(step, position);
    },
    'step-start': function stepStart(progress) {
        return stepTimingFunction(1, 'start')(progress);
    },
    'step-end': function stepEnd(progress) {
        return stepTimingFunction(1, 'end')(progress);
    }
};

// setup bezier functions
bezierList.forEach(function (arr) {
    Timing[arr[4]] = cubicBezier(arr[0], arr[1], arr[2], arr[3]);
});

var _ScaleFunctions;

var ScaleFunctions = (_ScaleFunctions = {
    'color': 'makeScaleFunctionForColor',
    'number': 'makeScaleFunctionForNumber'
}, defineProperty(_ScaleFunctions, UNIT_PERCENT, 'makeScaleFunctionForPercent'), defineProperty(_ScaleFunctions, UNIT_PX, 'makeScaleFunctionForPx'), defineProperty(_ScaleFunctions, UNIT_EM, 'makeScaleFunctionForEm'), _ScaleFunctions);

var GradientSampleList = function (_UIElement) {
    inherits(GradientSampleList, _UIElement);

    function GradientSampleList() {
        classCallCheck(this, GradientSampleList);
        return possibleConstructorReturn(this, (GradientSampleList.__proto__ || Object.getPrototypeOf(GradientSampleList)).apply(this, arguments));
    }

    createClass(GradientSampleList, [{
        key: "initialize",
        value: function initialize() {
            get$1(GradientSampleList.prototype.__proto__ || Object.getPrototypeOf(GradientSampleList.prototype), "initialize", this).call(this);

            this.list = this.read('gradient/list/sample', this.props.type);
            this.dispatch('storage/load/image');
        }
    }, {
        key: "template",
        value: function template() {

            return "\n        <div class=\"gradient-sample-list\">\n            <div class='cached-list' ref=\"$cachedList\"></div>\n        </div>\n        ";
        }
    }, {
        key: LOAD('$cachedList'),
        value: function value() {
            var _this2 = this;

            var list = this.list.map(function (item, index) {
                return "\n            <div class='gradient-sample-item' style='" + _this2.read('image/toString', item) + "' data-index=\"" + index + "\">\n                <div class='item-tools'>\n                    <button type=\"button\" class='add-item'  data-index=\"" + index + "\" title=\"Addd\">&times;</button>                \n                    <button type=\"button\" class='change-item'  data-index=\"" + index + "\" title=\"Change\"></button>\n                </div>          \n            </div>";
            });

            var storageList = this.read('storage/images').map(function (item, index) {
                var newImage = Object.assign({}, item.image, { colorsteps: item.colorsteps });
                return "\n                <div class='gradient-cached-item' style='" + _this2.read('image/toString', newImage) + "' data-index=\"" + index + "\">\n                    <div class='item-tools'>\n                        <button type=\"button\" class='add-item'  data-index=\"" + index + "\" title=\"Addd\">&times;</button>                \n                        <button type=\"button\" class='change-item'  data-index=\"" + index + "\" title=\"Change\"></button>\n                    </div>          \n                </div>\n            ";
            });

            var results = [].concat(toConsumableArray(list), toConsumableArray(storageList), ["<button type=\"button\" class=\"add-current-image\" title=\"Cache a image\">+</button>"]);

            var emptyCount = 5 - results.length % 5;

            var arr = [].concat(toConsumableArray(Array(emptyCount)));

            arr.forEach(function (it) {
                results.push("<div class='empty'></div>");
            });

            return results;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.load();
        }
    }, {
        key: EVENT('changeStorage'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: CLICK('$el .gradient-sample-item .change-item'),
        value: function value(e) {
            var index = +e.$delegateTarget.attr('data-index');

            this.dispatch('gradient/select', this.props.type, index);
        }
    }, {
        key: CLICK('$el .gradient-sample-item .add-item'),
        value: function value(e) {
            var index = +e.$delegateTarget.attr('data-index');

            this.dispatch('gradient/add', this.props.type, index);
        }
    }, {
        key: CLICK('$el .gradient-cached-item .add-item'),
        value: function value(e) {
            var index = +e.$delegateTarget.attr('data-index');
            var image = this.read('storage/images', index);
            var newImage = Object.assign({}, image.image, { colorsteps: image.colorsteps });

            this.dispatch('gradient/image/add', newImage);
        }
    }, {
        key: CLICK('$el .gradient-cached-item .change-item'),
        value: function value(e) {
            var index = +e.$delegateTarget.attr('data-index');
            var image = this.read('storage/images', index);
            var newImage = Object.assign({}, image.image, { colorsteps: image.colorsteps });

            this.dispatch('gradient/image/select', newImage);
        }
    }, {
        key: CLICK('$el .add-current-image'),
        value: function value(e) {
            var _this3 = this;

            this.read('selection/current/image', function (image) {
                var newImage = _this3.read('collect/image/one', image.id);

                _this3.dispatch('storage/add/image', newImage);
                _this3.refresh();
            });
        }
    }]);
    return GradientSampleList;
}(UIElement);

var GradientSampleWindow = function (_UIElement) {
    inherits(GradientSampleWindow, _UIElement);

    function GradientSampleWindow() {
        classCallCheck(this, GradientSampleWindow);
        return possibleConstructorReturn(this, (GradientSampleWindow.__proto__ || Object.getPrototypeOf(GradientSampleWindow)).apply(this, arguments));
    }

    createClass(GradientSampleWindow, [{
        key: "components",
        value: function components() {
            return {
                GradientSampleList: GradientSampleList
            };
        }
    }, {
        key: "template",
        value: function template() {
            return "\n            <div class='gradient-sample-view'>\n                <div class=\"close\">&times;</div>\n                <GradientSampleList></GradientSampleList>\n            </div>\n        ";
        }
    }, {
        key: CLICK('$el .close'),
        value: function value(e) {
            this.$el.toggle();
        }
    }, {
        key: EVENT('toggleGradientSampleView'),
        value: function value() {
            this.$el.toggle();
        }
    }]);
    return GradientSampleWindow;
}(UIElement);

var LayerSampleList = function (_UIElement) {
    inherits(LayerSampleList, _UIElement);

    function LayerSampleList() {
        classCallCheck(this, LayerSampleList);
        return possibleConstructorReturn(this, (LayerSampleList.__proto__ || Object.getPrototypeOf(LayerSampleList)).apply(this, arguments));
    }

    createClass(LayerSampleList, [{
        key: "initialize",
        value: function initialize() {
            get$1(LayerSampleList.prototype.__proto__ || Object.getPrototypeOf(LayerSampleList.prototype), "initialize", this).call(this);

            this.list = this.read('layer/list/sample', this.props.type);
            this.dispatch('storage/load/layer');
        }
    }, {
        key: "template",
        value: function template() {

            return "\n        <div class=\"layer-sample-list\">\n            <div class='cached-list' ref=\"$cachedList\"></div>\n\n        </div>\n        ";
        }
    }, {
        key: LOAD('$cachedList'),
        value: function value$$1() {
            var _this2 = this;

            var list = this.list.map(function (item, index) {
                var data = _this2.read('layer/cache/toString', item);

                var rateX = 160 / unitValue(data.obj.width);
                var rateY = 120 / unitValue(data.obj.height);

                var transform = "transform: scale(" + rateX + " " + rateY + ")";

                return "\n            <div class='layer-sample-item'  data-sample-id=\"" + item.id + "\">\n                <div class=\"layer-view\" style=\"" + data.css + "; " + transform + "\"></div>\n\n                <div class='item-tools'>\n                    <button type=\"button\" class='add-item'  data-index=\"" + index + "\" title=\"Addd\">&times;</button>\n                </div>          \n            </div>";
            });

            var storageList = this.read('storage/layers').map(function (item) {
                var data = _this2.read('layer/cache/toString', item);

                var rateX = 160 / unitValue(data.obj.width);
                var rateY = 120 / unitValue(data.obj.height);

                var minRate = Math.min(rateY, rateX);

                var transform = "transform-origin: left top;transform: scale(" + minRate + ")";

                return "\n                <div class='layer-cached-item' data-sample-id=\"" + item.id + "\">\n                    <div class=\"layer-view\" style=\"" + data.css + "; " + transform + "\"></div>\n                    <div class='item-tools'>\n                        <button type=\"button\" class='add-item'  data-sample-id=\"" + item.id + "\" title=\"Add\">&times;</button>                \n                        <button type=\"button\" class='delete-item'  data-sample-id=\"" + item.id + "\" title=\"Delete\">&times;</button>\n                    </div>          \n                </div>\n            ";
            });

            var results = [].concat(toConsumableArray(list), toConsumableArray(storageList), ["<button type=\"button\" class=\"add-current-layer\" title=\"Cache a layer\">+</button>"]);

            var emptyCount = 5 - results.length % 5;

            var arr = [].concat(toConsumableArray(Array(emptyCount)));

            arr.forEach(function (it) {
                results.push("<div class='empty'></div>");
            });

            return results;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.load();
        }
    }, {
        key: EVENT('changeStorage'),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: CLICK('$el .layer-sample-item .add-item'),
        value: function value$$1(e) {
            var _this3 = this;

            var index = +e.$delegateTarget.attr('data-index');

            var newLayer = this.list[index];

            if (newLayer) {
                this.read('selection/current/layer', function (layer) {
                    _this3.dispatch('item/addCache', newLayer, layer.id);
                });
            }
        }
    }, {
        key: CLICK('$el .layer-cached-item .add-item'),
        value: function value$$1(e) {
            var _this4 = this;

            var newLayer = this.read('storage/layers', e.$delegateTarget.attr('data-sample-id'));

            if (newLayer) {
                this.read('selection/current/layer', function (layer) {
                    _this4.dispatch('item/addCache', newLayer, layer.id);
                });
            }
        }
    }, {
        key: CLICK('$el .layer-cached-item .delete-item'),
        value: function value$$1(e) {
            this.dispatch('storage/remove/layer', e.$delegateTarget.attr('data-sample-id'));
            this.refresh();
        }
    }, {
        key: CLICK('$el .add-current-layer'),
        value: function value$$1(e) {
            var _this5 = this;

            this.read('selection/current/layer', function (layer) {
                var newLayer = _this5.read('collect/layer/one', layer.id);

                _this5.dispatch('storage/add/layer', newLayer);
                _this5.refresh();
            });
        }
    }]);
    return LayerSampleList;
}(UIElement);

var LayerSampleWindow = function (_UIElement) {
    inherits(LayerSampleWindow, _UIElement);

    function LayerSampleWindow() {
        classCallCheck(this, LayerSampleWindow);
        return possibleConstructorReturn(this, (LayerSampleWindow.__proto__ || Object.getPrototypeOf(LayerSampleWindow)).apply(this, arguments));
    }

    createClass(LayerSampleWindow, [{
        key: "components",
        value: function components() {
            return {
                LayerSampleList: LayerSampleList
            };
        }
    }, {
        key: "template",
        value: function template() {
            return "\n            <div class='layer-sample-view'>\n                <div class=\"close\">&times;</div>\n                <LayerSampleList></LayerSampleList>\n            </div>\n        ";
        }
    }, {
        key: CLICK('$el .close'),
        value: function value(e) {
            this.$el.toggle();
        }
    }, {
        key: EVENT('toggleLayerSampleView'),
        value: function value() {
            this.$el.toggle();
        }
    }]);
    return LayerSampleWindow;
}(UIElement);

var PageSampleList = function (_UIElement) {
    inherits(PageSampleList, _UIElement);

    function PageSampleList() {
        classCallCheck(this, PageSampleList);
        return possibleConstructorReturn(this, (PageSampleList.__proto__ || Object.getPrototypeOf(PageSampleList)).apply(this, arguments));
    }

    createClass(PageSampleList, [{
        key: "initialize",
        value: function initialize() {
            get$1(PageSampleList.prototype.__proto__ || Object.getPrototypeOf(PageSampleList.prototype), "initialize", this).call(this);

            this.list = [];
            this.dispatch('storage/load/page');
        }
    }, {
        key: "template",
        value: function template() {

            return "\n        <div class=\"page-sample-list\">\n            <div class='cached-list' ref=\"$cachedList\"></div>\n\n        </div>\n        ";
        }
    }, {
        key: LOAD('$cachedList'),
        value: function value$$1() {
            var _this2 = this;

            var list = this.list.map(function (page, index) {
                var data = _this2.read('page/cache/toString', page);

                var rateX = 160 / unitValue(defaultValue(data.obj.width, pxUnit(400)));
                var rateY = 120 / unitValue(defaultValue(data.obj.height, pxUnit(300)));

                var transform = "transform: scale(" + rateX + " " + rateY + ")";

                return "\n            <div class='page-sample-item'  data-sample-id=\"" + page.id + "\">\n                <div class=\"page-view\" style=\"" + data.css + "; " + transform + "\">\n                " + page.layers.map(function (layer) {
                    var data = _this2.read('layer/cache/toString', layer);
                    return "\n                        <div class=\"layer-view\" style=\"" + data.css + "\"></div>\n                    ";
                }).join('') + "\n                </div>\n\n                <div class='item-tools'>\n                    <button type=\"button\" class='add-item'  data-index=\"" + index + "\" title=\"Addd\">&times;</button>\n                </div>           \n            </div>";
            });

            var storageList = this.read('storage/pages').map(function (page) {
                var data = _this2.read('page/cache/toString', _this2.read('item/convert/style', page.page));

                var rateX = 160 / unitValue(defaultValue(data.obj.width, pxUnit(400)));
                var rateY = 160 / unitValue(defaultValue(data.obj.height, pxUnit(300)));

                var minRate = Math.min(rateY, rateX);

                var transform = "left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%) scale(" + minRate + ")";

                return "\n                <div class='page-cached-item' data-sample-id=\"" + page.id + "\">\n                    <div class=\"page-view\" style=\"" + data.css + "; " + transform + "\">\n                    " + page.layers.map(function (layer) {
                    var data = _this2.read('layer/cache/toString', layer);
                    return "\n                            <div class=\"layer-view\" style=\"" + data.css + "\"></div>\n                        ";
                }).join('') + "\n                    </div>\n                    <div class='item-tools'>\n                        <button type=\"button\" class='add-item'  data-sample-id=\"" + page.id + "\" title=\"Add\">&times;</button>                \n                        <button type=\"button\" class='delete-item'  data-sample-id=\"" + page.id + "\" title=\"Delete\">&times;</button>\n                    </div>          \n                </div>\n            ";
            });

            var results = [].concat(toConsumableArray(list), toConsumableArray(storageList), ["<button type=\"button\" class=\"add-current-page\" title=\"Cache a page\">+</button>"]);

            var emptyCount = 5 - results.length % 5;

            var arr = [].concat(toConsumableArray(Array(emptyCount)));

            arr.forEach(function (it) {
                results.push("<div class='empty'></div>");
            });

            return results;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.load();
        }
    }, {
        key: EVENT('changeStorage'),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: CLICK('$el .page-sample-item .add-item'),
        value: function value$$1(e) {
            var _this3 = this;

            var index = +e.$delegateTarget.attr('data-index');

            var newPage = this.list[index];

            if (newPage) {
                this.read('selection/current/page', function (page) {
                    _this3.dispatch('item/addCache', newPage, page.id);
                    _this3.emit('changePage');
                });
            }
        }
    }, {
        key: CLICK('$el .page-cached-item .add-item'),
        value: function value$$1(e) {
            var _this4 = this;

            var newPage = this.read('storage/pages', e.$delegateTarget.attr('data-sample-id'));
            if (newPage) {
                this.read('selection/current/page', function (page) {
                    _this4.dispatch('item/addCache', newPage, page.id);
                    _this4.emit('changePage');
                });
            }
        }
    }, {
        key: CLICK('$el .page-cached-item .delete-item'),
        value: function value$$1(e) {
            this.dispatch('storage/remove/page', e.$delegateTarget.attr('data-sample-id'));
            this.refresh();
        }
    }, {
        key: CLICK('$el .add-current-page'),
        value: function value$$1(e) {
            var _this5 = this;

            this.read('selection/current/page', function (page) {
                var newPage = _this5.read('collect/page/one', page.id);

                _this5.dispatch('storage/add/page', newPage);
                _this5.refresh();
            });
        }
    }]);
    return PageSampleList;
}(UIElement);

var PageSampleWindow = function (_UIElement) {
    inherits(PageSampleWindow, _UIElement);

    function PageSampleWindow() {
        classCallCheck(this, PageSampleWindow);
        return possibleConstructorReturn(this, (PageSampleWindow.__proto__ || Object.getPrototypeOf(PageSampleWindow)).apply(this, arguments));
    }

    createClass(PageSampleWindow, [{
        key: "components",
        value: function components() {
            return {
                PageSampleList: PageSampleList
            };
        }
    }, {
        key: "template",
        value: function template() {
            return "\n            <div class='page-sample-view'>\n                <div class=\"close\">&times;</div>\n                <PageSampleList></PageSampleList>\n            </div>\n        ";
        }
    }, {
        key: CLICK('$el .close'),
        value: function value(e) {
            this.$el.toggle();
        }
    }, {
        key: EVENT('togglePageSampleView'),
        value: function value() {
            this.$el.toggle();
        }
    }]);
    return PageSampleWindow;
}(UIElement);

var ClipPathImageList = function (_BasePropertyItem) {
    inherits(ClipPathImageList, _BasePropertyItem);

    function ClipPathImageList() {
        classCallCheck(this, ClipPathImageList);
        return possibleConstructorReturn(this, (ClipPathImageList.__proto__ || Object.getPrototypeOf(ClipPathImageList)).apply(this, arguments));
    }

    createClass(ClipPathImageList, [{
        key: "template",
        value: function template() {
            return "\n            <div class='image-resource'>\n                <div class='items' ref=\"$imageList\">\n\n                </div>\n            </div>\n        ";
        }
    }, {
        key: LOAD('$imageList'),
        value: function value() {
            return this.read('svg/list').map(function (svg, index) {
                if (isObject(svg)) {
                    return "<div class='svg-item' data-key=\"" + svg.key + "\">" + svg.svg + "</div>";
                } else {
                    return "<div class='svg-item' data-index=\"" + index + "\">" + svg + "</div>";
                }
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.load();
        }
    }, {
        key: EVENT('changeSvgList'),
        value: function value() {
            this.refresh();
        }
    }, {
        key: "toggle",
        value: function toggle(isShow) {
            if (isUndefined(isShow)) {
                this.$el.toggleClass('show');
            } else {
                this.$el.toggleClass('show', isShow);
            }
        }
    }, {
        key: EVENT('toggleClipPathImageList'),
        value: function value(isShow) {
            this.toggle(isShow);
        }
    }, {
        key: "setClipPathSvg",
        value: function setClipPathSvg(id, svg, callback) {
            var newValue = {
                id: id,
                clipPathType: 'svg',
                clipPathSvg: svg
            };

            var $temp = new Dom('div');
            $temp.html(svg);

            var $svg = $temp.$("svg");

            var width = 0;
            var height = 0;
            if ($svg.attr('width')) {
                width = parseParamNumber$1($svg.attr('width'));
            }

            if ($svg.attr('height')) {
                height = parseParamNumber$1($svg.attr('height'));
            }

            if ($svg.attr('viewBox')) {
                var box = $svg.attr('viewBox').split(' ');

                width = parseParamNumber$1(box[2]);
                height = parseParamNumber$1(box[3]);
            }

            newValue.clipPathSvgWidth = width;
            newValue.clipPathSvgHeight = height;

            $temp.remove();

            callback && callback(newValue);
        }
    }, {
        key: CLICK('$imageList .svg-item'),
        value: function value(e) {
            var _this2 = this;

            var index = e.$delegateTarget.attr('data-index');
            var key = e.$delegateTarget.attr('data-key');

            if (index) {
                this.read('selection/current/layer/id', function (id) {
                    var svg = _this2.read('svg/get', +index);

                    _this2.setClipPathSvg(id, svg, function (newValue) {
                        _this2.commit(CHANGE_LAYER_CLIPPATH, newValue);
                        _this2.toggle();
                    });
                });
            } else if (key) {
                this.read('selection/current/layer/id', function (id) {
                    var svg = _this2.read('svg/get', Number.MAX_SAFE_INTEGER, key);

                    _this2.setClipPathSvg(id, svg, function (newValue) {
                        _this2.commit(CHANGE_LAYER_CLIPPATH, newValue);
                        _this2.toggle();
                    });
                });
            }
        }
    }]);
    return ClipPathImageList;
}(BasePropertyItem);

var PredefinedPageResizer = function (_UIElement) {
    inherits(PredefinedPageResizer, _UIElement);

    function PredefinedPageResizer() {
        classCallCheck(this, PredefinedPageResizer);
        return possibleConstructorReturn(this, (PredefinedPageResizer.__proto__ || Object.getPrototypeOf(PredefinedPageResizer)).apply(this, arguments));
    }

    createClass(PredefinedPageResizer, [{
        key: 'initialize',
        value: function initialize() {
            get$1(PredefinedPageResizer.prototype.__proto__ || Object.getPrototypeOf(PredefinedPageResizer.prototype), 'initialize', this).call(this);

            this.$board = this.parent.refs.$board;
            this.$page = this.parent.refs.$page;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class="predefined-page-resizer">\n                <button type="button" data-value="to right"></button>\n                <!--<button type="button" data-value="to left"></button>-->\n                <!--<button type="button" data-value="to top"></button>-->\n                <button type="button" data-value="to bottom"></button>\n                <!--<button type="button" data-value="to top right"></button>-->\n                <button type="button" data-value="to bottom right"></button>\n                <!--<button type="button" data-value="to bottom left"></button>-->\n                <!--<button type="button" data-value="to top left"></button>-->\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var isShow = this.isShow();
            this.$el.toggle(isShow);

            if (isShow) {
                this.setPosition();
            }
        }
    }, {
        key: 'setPosition',
        value: function setPosition() {
            var page = this.read('selection/current/page');

            if (!page) return;

            var width = page.width,
                height = page.height;


            var boardOffset = this.$board.offset();
            var pageOffset = this.$page.offset();
            var canvasScrollLeft = this.$board.scrollLeft();
            var canvasScrollTop = this.$board.scrollTop();

            var x = pxUnit(pageOffset.left - boardOffset.left + canvasScrollLeft);
            var y = pxUnit(pageOffset.top - boardOffset.top + canvasScrollTop);

            x = stringUnit(x);
            y = stringUnit(y);
            width = stringUnit(width);
            height = stringUnit(height);

            this.$el.css({
                width: width, height: height,
                left: x, top: y
            });
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/page');
        }
    }, {
        key: EVENT(CHANGE_PAGE_SIZE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: 'change',
        value: function change() {
            var style1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var style2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            var style = Object.assign({}, style1, style2);

            Object.keys(style).forEach(function (key) {
                style[key] = pxUnit(style[key]);
            });

            var page = this.read('selection/current/page');
            page = Object.assign(page, style);
            this.commit(CHANGE_PAGE_SIZE, page);
            this.refresh();
        }
    }, {
        key: 'changeX',
        value: function changeX(dx) {
            var width = this.width + dx;

            this.change({ width: pxUnit(width) });
        }
    }, {
        key: 'changeY',
        value: function changeY(dy) {
            var height = this.height + dy;

            this.change({ height: pxUnit(height) });
        }
    }, {
        key: 'changeXY',
        value: function changeXY(dx, dy) {
            var width = this.width + dx;
            var height = this.height + dy;

            this.change({ width: pxUnit(width), height: pxUnit(height) });
        }
    }, {
        key: 'toTop',
        value: function toTop() {
            var dy = this.xy.y - this.targetXY.y;
            var height = this.height + dy;

            return { height: height };
        }
    }, {
        key: 'toBottom',
        value: function toBottom() {
            var dy = this.targetXY.y - this.xy.y;
            var height = this.height + dy * 2;

            return { height: height };
        }
    }, {
        key: 'toRight',
        value: function toRight() {
            var dx = this.targetXY.x - this.xy.x;
            var width = this.width + dx * 2;

            return { width: width };
        }
    }, {
        key: 'toLeft',
        value: function toLeft() {
            var dx = this.xy.x - this.targetXY.x;
            var width = this.width + dx;

            return { width: width };
        }
    }, {
        key: 'resize',
        value: function resize() {

            if (this.currentType == 'to top') {
                this.change(this.toTop());
            } else if (this.currentType == 'to bottom') {
                this.change(this.toBottom());
            } else if (this.currentType == 'to right') {
                this.change(this.toRight());
            } else if (this.currentType == 'to left') {
                this.change(this.toLeft());
            } else if (this.currentType == 'to bottom left') {
                this.change(this.toBottom(), this.toLeft());
            } else if (this.currentType == 'to bottom right') {
                this.change(this.toBottom(), this.toRight());
            } else if (this.currentType == 'to top right') {
                this.change(this.toTop(), this.toRight());
            } else if (this.currentType == 'to top left') {
                this.change(this.toTop(), this.toLeft());
            }
        }
    }, {
        key: 'isNotDownCheck',
        value: function isNotDownCheck() {
            return !this.xy;
        }
    }, {
        key: 'isDownCheck',
        value: function isDownCheck() {
            return this.xy;
        }
    }, {
        key: POINTERSTART('$el [data-value]') + CHECKER('isNotDownCheck'),
        value: function value$$1(e) {
            e.stopPropagation();
            var type = e.$delegateTarget.attr('data-value');
            this.currentType = type;
            this.xy = e.xy;
            this.page = this.read('selection/current/page');
            this.width = unitValue(this.page.width);
            this.height = unitValue(this.page.height);
        }
    }, {
        key: POINTERMOVE('document') + DEBOUNCE(10) + CHECKER('isDownCheck'),
        value: function value$$1(e) {
            this.targetXY = e.xy;
            this.resize();
        }
    }, {
        key: POINTEREND('document') + CHECKER('isDownCheck'),
        value: function value$$1(e) {
            this.currentType = null;
            this.xy = null;
            this.dispatch('history/push', 'Resize a layer');
        }
    }, {
        key: RESIZE('window') + DEBOUNCE(300),
        value: function value$$1(e) {
            this.refresh();
        }
    }]);
    return PredefinedPageResizer;
}(UIElement);

var SNAP_GRID = 20;

var SEGMENT_TYPE_ROTATE = 'rotate';
var SEGMENT_TYPE_MOVE = 'move';
var SEGMENT_TYPE_TOP = 'to top';
var SEGMENT_TYPE_LEFT = 'to left';
var SEGMENT_TYPE_RIGHT = 'to right';
var SEGMENT_TYPE_BOTTOM = 'to bottom';
var SEGMENT_TYPE_TOP_RIGHT = 'to top right';
var SEGMENT_TYPE_TOP_LEFT = 'to top left';
var SEGMENT_TYPE_BOTTOM_RIGHT = 'to bottom right';
var SEGMENT_TYPE_BOTTOM_LEFT = 'to bottom left';

var PredefinedGroupLayerResizer = function (_UIElement) {
    inherits(PredefinedGroupLayerResizer, _UIElement);

    function PredefinedGroupLayerResizer() {
        classCallCheck(this, PredefinedGroupLayerResizer);
        return possibleConstructorReturn(this, (PredefinedGroupLayerResizer.__proto__ || Object.getPrototypeOf(PredefinedGroupLayerResizer)).apply(this, arguments));
    }

    createClass(PredefinedGroupLayerResizer, [{
        key: 'initialize',
        value: function initialize() {
            get$1(PredefinedGroupLayerResizer.prototype.__proto__ || Object.getPrototypeOf(PredefinedGroupLayerResizer.prototype), 'initialize', this).call(this);

            this.$board = this.parent.refs.$board;
            this.$canvas = this.parent.refs.$canvas;
            this.$page = this.parent.refs.$page;
        }
    }, {
        key: 'template',
        value: function template() {
            return '<div class="predefined-group-resizer"></div>';
        }
    }, {
        key: LOAD(),
        value: function value$$1() {
            var _this2 = this;

            var layers = this.read('selection/current/layer');
            var isImage = this.read('selection/is/image');

            if (!layers) return '';

            if (Array.isArray(layers) == false) {
                layers = [layers];
            }

            return layers.map(function (item) {
                var css = _this2.setRectangle(item);
                var image = isImage ? 'image' : '';
                return ' \n                <div class="predefined-layer-resizer ' + image + '" predefined-layer-id="' + item.id + '" style="' + _this2.read('css/toString', css) + '" >\n                    <div class="event-panel" data-value="' + SEGMENT_TYPE_MOVE + '"></div>\n                    <div class=\'button-group\' predefined-layer-id="' + item.id + '">\n                        <button type="button" data-value="' + SEGMENT_TYPE_RIGHT + '"></button>\n                        <button type="button" data-value="' + SEGMENT_TYPE_LEFT + '"></button>\n                        <button type="button" data-value="' + SEGMENT_TYPE_TOP + '"></button>\n                        <button type="button" data-value="' + SEGMENT_TYPE_BOTTOM + '"></button>\n                        <button type="button" data-value="' + SEGMENT_TYPE_TOP_RIGHT + '"></button>\n                        <button type="button" data-value="' + SEGMENT_TYPE_BOTTOM_RIGHT + '"></button>\n                        <button type="button" data-value="' + SEGMENT_TYPE_BOTTOM_LEFT + '"></button>\n                        <button type="button" data-value="' + SEGMENT_TYPE_TOP_LEFT + '"></button>\n                    </div>\n                    <button type=\'button\' data-value=\'' + SEGMENT_TYPE_ROTATE + '\'></button>         \n                    \n                    \n                </div> \n            ';
            });
        }
    }, {
        key: 'setRectangle',
        value: function setRectangle(_ref) {
            var x = _ref.x,
                y = _ref.y,
                width = _ref.width,
                height = _ref.height,
                id = _ref.id;

            var boardOffset = this.boardOffset || this.$board.offset();
            var pageOffset = this.pageOffset || this.$page.offset();
            var canvasScrollLeft = this.canvasScrollLeft || this.$board.scrollLeft();
            var canvasScrollTop = this.canvasScrollTop || this.$board.scrollTop();

            x = pxUnit(unitValue(x) + pageOffset.left - boardOffset.left + canvasScrollLeft);
            y = pxUnit(unitValue(y) + pageOffset.top - boardOffset.top + canvasScrollTop);

            x = stringUnit(x);
            y = stringUnit(y);
            width = stringUnit(width);
            height = stringUnit(height);

            var transform = "none";

            if (id) {
                transform = this.read('layer/make/transform/rotate', this.read('item/get', id));
            }

            return _extends({
                width: width, height: height,
                left: x, top: y
            }, transform);
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var isShow = this.isShow();
            this.$el.toggle(isShow).attr('line-type', this.read('selection/type'));

            if (isShow) {
                this.load();
            }
        }
    }, {
        key: 'caculatePosition',
        value: function caculatePosition(list, key, align) {
            var valueList = list.filter(function (it) {
                return it.align == align;
            }).map(function (it) {
                return unitValue(it[key]);
            });

            if (valueList.length) {
                return Math.max.apply(Math, [Number.MIN_SAFE_INTEGER].concat(toConsumableArray(valueList)));
            }

            return undefined;
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/not/empty');
        }
    }, {
        key: EVENT(CHANGE_LAYER_TRANSFORM, CHANGE_LAYER_SIZE, CHANGE_LAYER_ROTATE, CHANGE_LAYER_MOVE, CHANGE_LAYER_POSITION, CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_PAGE_SIZE),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: 'caculateRightSize',
        value: function caculateRightSize(item, list) {
            var x = this.caculatePosition(list, 'x', 'right');

            if (isNotUndefined(x)) {
                var newWidth = Math.abs(this.moveX - x);
                item.width = pxUnit(newWidth);
            }
        }
    }, {
        key: 'caculateLeftSize',
        value: function caculateLeftSize(item, list) {
            var x = this.caculatePosition(list, 'x', 'left');

            if (isNotUndefined(x)) {
                var newWidth = this.width + (this.moveX - x);

                item.x = pxUnit(x);
                item.width = pxUnit(newWidth);
            }
        }
    }, {
        key: 'caculateBottomSize',
        value: function caculateBottomSize(item, list) {
            var y = this.caculatePosition(list, 'y', 'bottom');

            if (isNotUndefined(y)) {
                var newHeight = Math.abs(this.moveY - y);
                item.height = pxUnit(newHeight);
            }
        }
    }, {
        key: 'caculateTopSize',
        value: function caculateTopSize(item, list) {
            var y = this.caculatePosition(list, 'y', 'top');

            if (isNotUndefined(y)) {
                var newHeight = this.height + (this.moveY - y);

                item.y = pxUnit(y);
                item.height = pxUnit(newHeight);
            }
        }
    }, {
        key: 'cacualteSizeItem',
        value: function cacualteSizeItem(item, list) {
            if (this.currentType == 'to right') {
                // 오른쪽 왼쪽 크기를 맞추기 
                this.caculateRightSize(item, list);
            } else if (this.currentType == 'to bottom') {
                // 아래위 크기 맞추기 
                this.caculateBottomSize(item, list);
            } else if (this.currentType == 'to bottom left') {
                // 아래위 크기 맞추기 
                this.caculateBottomSize(item, list);
                this.caculateLeftSize(item, list);
            } else if (this.currentType == 'to bottom right') {
                // 아래위 크기 맞추기 
                this.caculateBottomSize(item, list);
                this.caculateRightSize(item, list);
            } else if (this.currentType == 'to left') {
                this.caculateLeftSize(item, list);
            } else if (this.currentType == 'to top') {
                this.caculateTopSize(item, list);
            } else if (this.currentType == 'to top right') {
                this.caculateTopSize(item, list);
                this.caculateRightSize(item, list);
            } else if (this.currentType == 'to top left') {
                this.caculateTopSize(item, list);
                this.caculateLeftSize(item, list);
            }
        }
    }, {
        key: 'caculateSnap',
        value: function caculateSnap() {
            if (this.currentType == SEGMENT_TYPE_MOVE) {
                this.run('guide/snap/caculate', 3, this.currentType);
            }
        }
    }, {
        key: 'setPosition',
        value: function setPosition() {
            var _this3 = this;

            this.$el.children().forEach(function ($el) {
                var item = _this3.read('item/get', $el.attr('predefined-layer-id'));

                $el.cssText(_this3.read('css/toString', _this3.setRectangle(item)));
            });
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition(items) {

            this.setPosition();
        }
    }, {
        key: 'toRight',
        value: function toRight(item) {
            var dx = this.dx;


            this.run('item/set', {
                id: item.id,
                width: pxUnit(item.width + dx)
            });
        }
    }, {
        key: 'toLeft',
        value: function toLeft(item) {
            var dx = this.dx;


            this.run('item/set', {
                id: item.id,
                width: pxUnit(item.width - dx),
                x: pxUnit(item.x + dx)
            });
        }
    }, {
        key: 'toBottom',
        value: function toBottom(item) {
            var dy = this.dy;


            this.run('item/set', {
                id: item.id,
                height: pxUnit(item.height + dy)
            });
        }
    }, {
        key: 'toTop',
        value: function toTop(item) {
            var dy = this.dy;


            this.run('item/set', {
                id: item.id,
                height: pxUnit(item.height - dy),
                y: pxUnit(item.y + dy)
            });
        }
    }, {
        key: 'moveXY',
        value: function moveXY(item) {
            var dx = this.dx,
                dy = this.dy;


            this.run('item/set', {
                id: item.id,
                x: pxUnit(item.x + dx),
                y: pxUnit(item.y + dy)
            });
        }
    }, {
        key: 'rotate',
        value: function rotate(item) {
            var angle = this.angle;
            var rotate = item.rotate;


            rotate = defaultValue(rotate, 0);

            this.run('item/set', {
                id: item.id,
                rotate: rotate + Math.floor(angle) - 270
            });
        }
    }, {
        key: 'resizeComponent',
        value: function resizeComponent() {
            var _this4 = this;

            var items = this.rectItems;
            var event = CHANGE_LAYER_SIZE;

            if (this.currentType == SEGMENT_TYPE_TOP) {
                items.forEach(function (item) {
                    _this4.toTop(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_BOTTOM) {
                items.forEach(function (item) {
                    _this4.toBottom(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_RIGHT) {
                items.forEach(function (item) {
                    _this4.toRight(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_LEFT) {
                items.forEach(function (item) {
                    _this4.toLeft(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_BOTTOM_LEFT) {
                items.forEach(function (item) {
                    _this4.toBottom(item);
                });
                items.forEach(function (item) {
                    _this4.toLeft(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_BOTTOM_RIGHT) {
                items.forEach(function (item) {
                    _this4.toBottom(item);
                });
                items.forEach(function (item) {
                    _this4.toRight(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_TOP_RIGHT) {
                items.forEach(function (item) {
                    _this4.toTop(item);
                });
                items.forEach(function (item) {
                    _this4.toRight(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_TOP_LEFT) {
                items.forEach(function (item) {
                    _this4.toTop(item);
                });
                items.forEach(function (item) {
                    _this4.toLeft(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_MOVE) {
                items.forEach(function (item) {
                    _this4.moveXY(item);
                });
            } else if (this.currentType == SEGMENT_TYPE_ROTATE) {
                items.forEach(function (item) {
                    _this4.rotate(item);
                });
                event = CHANGE_LAYER_ROTATE;
            }

            this.caculateSnap();
            this.emit(event);

            this.updatePosition(items);
        }

        /* drag  */

    }, {
        key: 'isNotDownCheck',
        value: function isNotDownCheck() {
            return !this.xy;
        }
    }, {
        key: 'isDownCheck',
        value: function isDownCheck() {
            return this.xy;
        }
    }, {
        key: POINTERSTART('$el [data-value]') + CHECKER('isNotDownCheck'),
        value: function value$$1(e) {
            e.stopPropagation();
            this.activeButton = e.$delegateTarget;
            this.activeButton.addClass('active');
            var type = e.$delegateTarget.attr('data-value');
            this.currentType = type;
            var layerId = e.$delegateTarget.parent().attr('predefined-layer-id');
            this.$dom = this.read('item/dom', layerId);
            this.$selectLayer = this.read('item/get', layerId);

            if (this.$dom) {
                var rect = this.$dom.rect();
                this.layerX = unitValue(this.$selectLayer.x);
                this.layerY = unitValue(this.$selectLayer.y);
                this.layerCenterX = rect.left + rect.width / 2;
                this.layerCenterY = rect.top + rect.height / 2;
            }
            this.xy = e.xy;
            this.rectItems = this.read('selection/current').map(function (it) {
                return {
                    id: it.id,
                    x: unitValue(it.x),
                    y: unitValue(it.y),
                    width: unitValue(it.width),
                    height: unitValue(it.height),
                    rotate: unitValue(it.rotate || 0)
                };
            });

            this.boardOffset = this.$board.offset();
            this.pageOffset = this.$page.offset();
            this.canvasScrollLeft = this.$board.scrollLeft();
            this.canvasScrollTop = this.$board.scrollTop();
        }
    }, {
        key: POINTERMOVE('document') + CHECKER('isDownCheck'),
        value: function value$$1(e) {
            this.targetXY = e.xy;

            if (!this.xy) {
                return;
            }

            this.dx = e.xy.x - this.xy.x;
            this.dy = e.xy.y - this.xy.y;

            if (this.currentType == 'rotate') {
                this.angle = caculateAngle(e.xy.x - this.layerCenterX, e.xy.y - this.layerCenterY);
            }

            if (this.read('tool/get', 'snap.grid')) {

                if (this.currentType == 'move') {
                    var moveX = this.layerX + this.dx;
                    var moveY = this.layerY + this.dy;

                    var tempX = moveX - moveX % SNAP_GRID;
                    var tempY = moveY - moveY % SNAP_GRID;

                    // console.log({tempX, tempY})

                    this.dx = Math.floor(tempX / SNAP_GRID) * SNAP_GRID - this.layerX;
                    this.dy = Math.floor(tempY / SNAP_GRID) * SNAP_GRID - this.layerY;

                    // console.log('dy', this.dx, 'dx', this.dy)                
                }
            }

            this.run('tool/set', 'moving', true);

            this.resizeComponent();
        }
    }, {
        key: 'isMoved',
        value: function isMoved(e) {
            if (!this.xy) return false;
            return this.xy.x != e.xy.x || this.xy.y != e.xy.y;
        }
    }, {
        key: POINTEREND('document') + CHECKER('isDownCheck'),
        value: function value$$1(e) {
            this.currentType = null;
            this.xy = null;
            this.moveX = null;
            this.moveY = null;
            this.rectItems = null;
            this.currentId = null;
            this.run('tool/set', 'moving', false);
            this.dispatch('history/push', 'Resize a layer');
        }
    }, {
        key: RESIZE('window') + DEBOUNCE(300),
        value: function value$$1(e) {
            this.refresh();
        }
    }]);
    return PredefinedGroupLayerResizer;
}(UIElement);

var CircleEditor = function (_UIElement) {
    inherits(CircleEditor, _UIElement);

    function CircleEditor() {
        classCallCheck(this, CircleEditor);
        return possibleConstructorReturn(this, (CircleEditor.__proto__ || Object.getPrototypeOf(CircleEditor)).apply(this, arguments));
    }

    createClass(CircleEditor, [{
        key: "template",
        value: function template() {
            return "\n            <div class='layer-shape-circle-editor'>\n                <div class=\"drag-item center\" data-type=\"center\" ref=\"$center\"></div>\n                <div class=\"drag-item radius\" data-type=\"radius\" ref=\"$radius\"></div>\n            </div>\n        ";
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.cachedRectangle = false;

                this.read('selection/current/layer', function (layer) {
                    var sideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE);
                    _this2.refs.$radius.toggle(sideType == CLIP_PATH_SIDE_TYPE_NONE);
                });

                this.refreshPointer();
            }
        }
    }, {
        key: "refreshPointer",
        value: function refreshPointer() {
            var _this3 = this;

            this.read('selection/current/layer', function (layer) {

                if (layer.clipPathType !== CLIP_PATH_TYPE_CIRCLE) return;

                var _getRectangle = _this3.getRectangle(),
                    width = _getRectangle.width,
                    height = _getRectangle.height;

                var centerX = defaultValue(layer.clipPathCenterX, percentUnit(50));
                var centerY = defaultValue(layer.clipPathCenterY, percentUnit(50));

                var radiusX = defaultValue(layer.clipPathRadiusX, percentUnit(100));
                var radiusY = defaultValue(layer.clipPathRadiusY, percentUnit(100));

                _this3.refs.$center.px('left', value2px(centerX, width));
                _this3.refs.$center.px('top', value2px(centerY, height));

                _this3.refs.$radius.px('left', value2px(radiusX, width));
                _this3.refs.$radius.px('top', value2px(radiusY, height));
            });
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/layer');

            if (!item) return false;

            return item.clipPathType == CLIP_PATH_TYPE_CIRCLE && !!item.showClipPathEditor;
        }
    }, {
        key: "getRectangle",
        value: function getRectangle() {

            if (!this.cachedRectangle) {
                var width = this.$el.width();
                var height = this.$el.height();
                var minX = this.$el.offsetLeft();
                var minY = this.$el.offsetTop();

                var maxX = minX + width;
                var maxY = minY + height;
                this.cachedRectangle = { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: width, height: height };
            }

            return this.cachedRectangle;
        }
    }, {
        key: "refreshUI",
        value: function refreshUI(e) {
            var _getRectangle2 = this.getRectangle(),
                minX = _getRectangle2.minX,
                minY = _getRectangle2.minY,
                maxX = _getRectangle2.maxX,
                maxY = _getRectangle2.maxY,
                width = _getRectangle2.width,
                height = _getRectangle2.height;

            var _e$xy = e.xy,
                x = _e$xy.x,
                y = _e$xy.y;


            x = Math.max(Math.min(maxX, x), minX);
            y = Math.max(Math.min(maxY, y), minY);

            var left = x - minX;
            var top = y - minY;

            this.refs['$' + this.currentType].px('left', left);
            this.refs['$' + this.currentType].px('top', top);

            if (e) {

                this[this.currentType + "pos"] = [left, top];

                this.updateClipPath();
            }
        }
    }, {
        key: "updateClipPath",
        value: function updateClipPath() {
            var _getRectangle3 = this.getRectangle(),
                width = _getRectangle3.width,
                height = _getRectangle3.height;

            var radius = this.radiuspos || [width, height];
            var center = this.centerpos || [width / 2, height / 2];

            var item = this.layer;
            item.clipPathType = CLIP_PATH_TYPE_CIRCLE;
            item.clipPathCenterX = percentUnit(px2percent(center[0], width));
            item.clipPathCenterY = percentUnit(px2percent(center[1], height));
            item.clipPathRadiusX = percentUnit(px2percent(radius[0], width));
            item.clipPathRadiusY = percentUnit(px2percent(radius[1], height));

            this.commit(CHANGE_LAYER_CLIPPATH, item);
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_SIZE, CHANGE_LAYER_POSITION, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER),
        value: function value$$1() {
            this.refresh();
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value$$1(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value$$1(e) {
            if (this.isDown) {
                this.refreshUI(e);
            }
        }
    }, {
        key: POINTERSTART('$el .drag-item'),
        value: function value$$1(e) {
            e.preventDefault();
            this.currentType = e.$delegateTarget.attr('data-type');
            this.isDown = true;
        }
    }, {
        key: POINTERSTART(),
        value: function value$$1(e) {
            this.isDown = true;
            this.layer = this.read('selection/current/layer');
            // this.refreshUI(e);        
        }
    }]);
    return CircleEditor;
}(UIElement);

var EllipseEditor = function (_UIElement) {
    inherits(EllipseEditor, _UIElement);

    function EllipseEditor() {
        classCallCheck(this, EllipseEditor);
        return possibleConstructorReturn(this, (EllipseEditor.__proto__ || Object.getPrototypeOf(EllipseEditor)).apply(this, arguments));
    }

    createClass(EllipseEditor, [{
        key: "template",
        value: function template() {
            return "\n            <div class='layer-shape-ellipse-editor'>\n                <div class=\"drag-item center\" data-type=\"center\" ref=\"$center\"></div>\n                <div class=\"drag-item radius\" data-type=\"radius\" ref=\"$radius\"></div>\n            </div>\n        ";
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.cachedRectangle = false;

                this.read('selection/current/layer', function (layer) {
                    var sideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE);
                    _this2.refs.$radius.toggle(sideType == CLIP_PATH_SIDE_TYPE_NONE);
                });
                this.refreshPointer();
            }
        }
    }, {
        key: "refreshPointer",
        value: function refreshPointer() {
            var _this3 = this;

            this.read('selection/current/layer', function (layer) {

                if (layer.clipPathType != CLIP_PATH_TYPE_ELLIPSE) return;

                var _getRectangle = _this3.getRectangle(),
                    width = _getRectangle.width,
                    height = _getRectangle.height;

                var centerX = defaultValue(layer.clipPathCenterX, percentUnit(50));
                var centerY = defaultValue(layer.clipPathCenterY, percentUnit(50));

                var radiusX = defaultValue(layer.clipPathRadiusX, percentUnit(100));
                var radiusY = defaultValue(layer.clipPathRadiusY, percentUnit(100));

                _this3.refs.$center.px('left', value2px(centerX, width));
                _this3.refs.$center.px('top', value2px(centerY, height));

                _this3.refs.$radius.px('left', value2px(radiusX, width));
                _this3.refs.$radius.px('top', value2px(radiusY, height));
            });
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/layer');

            if (!item) return false;

            return item.clipPathType == CLIP_PATH_TYPE_ELLIPSE && !!item.showClipPathEditor;
        }
    }, {
        key: "getRectangle",
        value: function getRectangle() {

            if (!this.cachedRectangle) {
                var width = this.$el.width();
                var height = this.$el.height();
                var minX = this.$el.offsetLeft();
                var minY = this.$el.offsetTop();

                var maxX = minX + width;
                var maxY = minY + height;
                this.cachedRectangle = { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: width, height: height };
            }

            return this.cachedRectangle;
        }
    }, {
        key: "refreshUI",
        value: function refreshUI(e) {
            var _getRectangle2 = this.getRectangle(),
                minX = _getRectangle2.minX,
                minY = _getRectangle2.minY,
                maxX = _getRectangle2.maxX,
                maxY = _getRectangle2.maxY,
                width = _getRectangle2.width,
                height = _getRectangle2.height;

            var _e$xy = e.xy,
                x = _e$xy.x,
                y = _e$xy.y;


            x = Math.max(Math.min(maxX, x), minX);
            y = Math.max(Math.min(maxY, y), minY);

            var left = x - minX;
            var top = y - minY;

            this.refs['$' + this.currentType].px('left', left);
            this.refs['$' + this.currentType].px('top', top);

            if (e) {

                this[this.currentType + "pos"] = [left, top];

                this.updateClipPath();
            }
        }
    }, {
        key: "updateClipPath",
        value: function updateClipPath() {
            var _getRectangle3 = this.getRectangle(),
                width = _getRectangle3.width,
                height = _getRectangle3.height;

            var radius = this.radiuspos || [width, height];
            var center = this.centerpos || [width / 2, height / 2];

            var item = this.layer;
            item.clipPathType = CLIP_PATH_TYPE_ELLIPSE;
            item.clipPathCenterX = percentUnit(px2percent(center[0], width));
            item.clipPathCenterY = percentUnit(px2percent(center[1], height));
            item.clipPathRadiusX = percentUnit(px2percent(radius[0], width));
            item.clipPathRadiusY = percentUnit(px2percent(radius[1], height));

            this.commit(CHANGE_LAYER_CLIPPATH, item);
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_SIZE, CHANGE_LAYER_POSITION, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER),
        value: function value$$1() {
            this.refresh();
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value$$1(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value$$1(e) {
            if (this.isDown) {
                this.refreshUI(e);
            }
        }
    }, {
        key: POINTERSTART('$el .drag-item'),
        value: function value$$1(e) {
            e.preventDefault();
            this.currentType = e.$delegateTarget.attr('data-type');
            this.isDown = true;
        }
    }, {
        key: POINTERSTART(),
        value: function value$$1(e) {
            this.isDown = true;
            this.layer = this.read('selection/current/layer');
            // this.refreshUI(e);        
        }
    }]);
    return EllipseEditor;
}(UIElement);

var InsetEditor = function (_UIElement) {
    inherits(InsetEditor, _UIElement);

    function InsetEditor() {
        classCallCheck(this, InsetEditor);
        return possibleConstructorReturn(this, (InsetEditor.__proto__ || Object.getPrototypeOf(InsetEditor)).apply(this, arguments));
    }

    createClass(InsetEditor, [{
        key: "template",
        value: function template() {
            return "\n            <div class='layer-shape-inset-editor'>\n                <div class=\"drag-item top\" data-type=\"top\" ref=\"$top\"></div>\n                <div class=\"drag-item left\" data-type=\"left\" ref=\"$left\"></div>\n                <div class=\"drag-item right\" data-type=\"right\" ref=\"$right\"></div>\n                <div class=\"drag-item bottom\" data-type=\"bottom\" ref=\"$bottom\"></div>\n            </div>\n        ";
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.cachedRectangle = false;

                this.refreshPointer();
            }
        }
    }, {
        key: "refreshPointer",
        value: function refreshPointer() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {

                if (layer.clipPathType !== CLIP_PATH_TYPE_INSET) return;

                var _getRectangle = _this2.getRectangle(),
                    width = _getRectangle.width,
                    height = _getRectangle.height;

                var top = defaultValue(layer.clipPathInsetTop, percentUnit(0));
                var left = defaultValue(layer.clipPathInsetLeft, percentUnit(0));
                var right = defaultValue(layer.clipPathInsetRight, percentUnit(0));
                var bottom = defaultValue(layer.clipPathInsetBottom, percentUnit(0));

                var topValue = value2px(top, height);
                var leftValue = value2px(left, width);
                var rightValue = value2px(percentUnit(100 - right.value), width);
                var bottomValue = value2px(percentUnit(100 - bottom.value), height);

                var centerX = leftValue + (rightValue - leftValue) / 2;
                var centerY = topValue + (bottomValue - topValue) / 2;

                _this2.refs.$top.px('top', topValue);
                _this2.refs.$top.px('left', centerX);

                _this2.refs.$left.px('top', centerY);
                _this2.refs.$left.px('left', leftValue);

                _this2.refs.$right.px('top', centerY);
                _this2.refs.$right.px('left', rightValue);

                _this2.refs.$bottom.px('left', centerX);
                _this2.refs.$bottom.px('top', bottomValue);
            });
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/layer');

            if (!item) return false;

            return item.clipPathType == CLIP_PATH_TYPE_INSET && !!item.showClipPathEditor;
        }
    }, {
        key: "getRectangle",
        value: function getRectangle() {

            if (!this.cachedRectangle) {
                var width = this.$el.width();
                var height = this.$el.height();
                var minX = this.$el.offsetLeft();
                var minY = this.$el.offsetTop();

                var maxX = minX + width;
                var maxY = minY + height;
                this.cachedRectangle = { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: width, height: height };
            }

            return this.cachedRectangle;
        }
    }, {
        key: "refreshUI",
        value: function refreshUI(e) {
            var _getRectangle2 = this.getRectangle(),
                minX = _getRectangle2.minX,
                minY = _getRectangle2.minY,
                maxX = _getRectangle2.maxX,
                maxY = _getRectangle2.maxY,
                width = _getRectangle2.width,
                height = _getRectangle2.height;

            var _e$xy = e.xy,
                x = _e$xy.x,
                y = _e$xy.y;


            x = Math.max(Math.min(maxX, x), minX);
            y = Math.max(Math.min(maxY, y), minY);

            if (this.currentType == 'top' || this.currentType == 'bottom') {
                var top = y - minY;
                this.refs['$' + this.currentType].px('top', top);
            } else {
                var left = x - minX;
                this.refs['$' + this.currentType].px('left', left);
            }

            if (e) {

                if (this.currentType == 'top' || this.currentType == 'bottom') {
                    this[this.currentType + "pos"] = top;
                } else {
                    this[this.currentType + "pos"] = left;
                }

                this.updateClipPath();
            }
        }
    }, {
        key: "updateClipPath",
        value: function updateClipPath() {
            var _getRectangle3 = this.getRectangle(),
                width = _getRectangle3.width,
                height = _getRectangle3.height;

            // TODO:  value must be with a unit. 


            var item = this.layer;
            item.clipPathType = CLIP_PATH_TYPE_INSET;
            item.clipPathInsetTop = percentUnit(px2percent(defaultValue(this.toppos, 0), height));
            item.clipPathInsetLeft = percentUnit(px2percent(defaultValue(this.leftpos, 0), width));
            item.clipPathInsetRight = percentUnit(px2percent(width - defaultValue(this.rightpos, width), width));
            item.clipPathInsetBottom = percentUnit(px2percent(height - defaultValue(this.bottompos, height), height));

            this.commit(CHANGE_LAYER_CLIPPATH, item);

            this.refreshPointer();
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_SIZE, CHANGE_LAYER_POSITION, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER),
        value: function value$$1() {
            this.refresh();
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value$$1(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value$$1(e) {
            if (this.isDown) {
                this.refreshUI(e);
            }
        }
    }, {
        key: POINTERSTART('$el .drag-item'),
        value: function value$$1(e) {
            e.preventDefault();
            this.currentType = e.$delegateTarget.attr('data-type');
            this.isDown = true;
        }
    }, {
        key: POINTERSTART(),
        value: function value$$1(e) {
            this.isDown = true;
            this.layer = this.read('selection/current/layer');
            // this.refreshUI(e);        
        }
    }]);
    return InsetEditor;
}(UIElement);

var PolygonEditor = function (_UIElement) {
    inherits(PolygonEditor, _UIElement);

    function PolygonEditor() {
        classCallCheck(this, PolygonEditor);
        return possibleConstructorReturn(this, (PolygonEditor.__proto__ || Object.getPrototypeOf(PolygonEditor)).apply(this, arguments));
    }

    createClass(PolygonEditor, [{
        key: "template",
        value: function template() {
            return "\n            <div class='layer-shape-polygon-editor'>\n\n            </div>\n        ";
        }
    }, {
        key: LOAD(),
        value: function value$$1() {
            var layer = this.read('selection/current/layer');
            if (!layer) return '';
            var points = defaultValue(layer.clipPathPolygonPoints, []);
            if (!points.length) return '';

            var startIndex = 0;
            var lastIndex = points.length - 1;

            return points.map(function (p, index) {

                var start = index == startIndex ? 'start' : '';
                var end = index == lastIndex ? 'end' : '';

                return "<div class=\"drag-item " + start + " " + end + "\" data-point-index=\"" + index + "\" style='left: " + stringUnit(p.x) + ";top: " + stringUnit(p.y) + "'></div>";
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var isShow = this.isShow();

            this.$el.toggle(isShow);

            if (isShow) {
                this.cachedRectangle = false;
                this.load();
            }
        }
    }, {
        key: "isShow",
        value: function isShow() {
            var item = this.read('selection/current/layer');

            if (!item) return false;

            return item.clipPathType == CLIP_PATH_TYPE_POLYGON && !!item.showClipPathEditor;
        }
    }, {
        key: "getRectangle",
        value: function getRectangle() {

            if (!this.cachedRectangle) {
                var width = this.$el.width();
                var height = this.$el.height();
                var minX = this.$el.offsetLeft();
                var minY = this.$el.offsetTop();

                var maxX = minX + width;
                var maxY = minY + height;
                this.cachedRectangle = { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: width, height: height };
            }

            return this.cachedRectangle;
        }
    }, {
        key: "refreshUI",
        value: function refreshUI(e) {
            var _getRectangle = this.getRectangle(),
                minX = _getRectangle.minX,
                minY = _getRectangle.minY,
                maxX = _getRectangle.maxX,
                maxY = _getRectangle.maxY,
                width = _getRectangle.width,
                height = _getRectangle.height;

            var _e$xy = e.xy,
                x = _e$xy.x,
                y = _e$xy.y;


            x = Math.max(Math.min(maxX, x), minX);
            y = Math.max(Math.min(maxY, y), minY);

            var left = x - minX;
            var top = y - minY;

            this.$dragItem.px('left', left);
            this.$dragItem.px('top', top);

            if (e) {

                this.$dragPoint = {
                    x: percentUnit(px2percent(left, width)),
                    y: percentUnit(px2percent(top, height))
                };

                this.updateClipPath();
            }
        }
    }, {
        key: "updateClipPath",
        value: function updateClipPath() {
            var _this2 = this;

            this.read('selection/current/layer', function (layer) {
                var polygonIndex = +_this2.$dragItem.attr('data-point-index');
                var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                clipPathPolygonPoints[polygonIndex] = _this2.$dragPoint;

                _this2.commit(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION, {
                    id: layer.id,
                    polygonIndex: polygonIndex,
                    clipPathPolygonPoints: clipPathPolygonPoints
                });
            });
        }
    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_SIZE, CHANGE_LAYER_POSITION, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER, CHANGE_LAYER_CLIPPATH_POLYGON),
        value: function value$$1() {
            this.refresh();
        }

        // Event Bindings 

    }, {
        key: POINTEREND('document'),
        value: function value$$1(e) {
            this.isDown = false;
        }
    }, {
        key: POINTERMOVE('document'),
        value: function value$$1(e) {
            if (this.isDown) {
                this.refreshUI(e);
            }
        }
    }, {
        key: POINTERSTART('$el .drag-item'),
        value: function value$$1(e) {
            e.preventDefault();
            this.$dragItem = e.$delegateTarget;
            this.isDown = true;
        }
    }, {
        key: "addPoint",
        value: function addPoint(e) {
            var _this3 = this;

            var _getRectangle2 = this.getRectangle(),
                minX = _getRectangle2.minX,
                minY = _getRectangle2.minY,
                maxX = _getRectangle2.maxX,
                maxY = _getRectangle2.maxY,
                width = _getRectangle2.width,
                height = _getRectangle2.height;

            var _e$xy2 = e.xy,
                x = _e$xy2.x,
                y = _e$xy2.y;


            x = Math.max(Math.min(maxX, x), minX);
            y = Math.max(Math.min(maxY, y), minY);

            var left = x - minX;
            var top = y - minY;

            var point = {
                x: percentUnit(px2percent(left, width)),
                y: percentUnit(px2percent(top, height))
            };

            this.read('selection/current/layer', function (layer) {
                var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                clipPathPolygonPoints.push(point);

                _this3.commit(CHANGE_LAYER_CLIPPATH_POLYGON, { id: layer.id, clipPathPolygonPoints: clipPathPolygonPoints });
                _this3.refresh();
            });
        }
    }, {
        key: "deletePoint",
        value: function deletePoint(e) {
            var _this4 = this;

            var index = +e.$delegateTarget.attr('data-point-index');

            this.read('selection/current/layer', function (layer) {
                var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                clipPathPolygonPoints.splice(index, 1);

                _this4.commit(CHANGE_LAYER_CLIPPATH_POLYGON, { id: layer.id, clipPathPolygonPoints: clipPathPolygonPoints });
                _this4.refresh();
            });
        }
    }, {
        key: "isNotDragItem",
        value: function isNotDragItem(e) {
            return new Dom(e.target).hasClass('drag-item') == false;
        }
    }, {
        key: CLICK() + ALT,
        value: function value$$1(e) {
            e.preventDefault();

            this.addPoint(e);
        }
    }, {
        key: CLICK('$el .drag-item') + ALT + CAPTURE,
        value: function value$$1(e) {
            e.stopPropagation();
            e.preventDefault();

            this.deletePoint(e);
        }
    }]);
    return PolygonEditor;
}(UIElement);

var shapeEditor = {
    PolygonEditor: PolygonEditor,
    InsetEditor: InsetEditor,
    EllipseEditor: EllipseEditor,
    CircleEditor: CircleEditor

};

var LayerShapeEditor = function (_UIElement) {
    inherits(LayerShapeEditor, _UIElement);

    function LayerShapeEditor() {
        classCallCheck(this, LayerShapeEditor);
        return possibleConstructorReturn(this, (LayerShapeEditor.__proto__ || Object.getPrototypeOf(LayerShapeEditor)).apply(this, arguments));
    }

    createClass(LayerShapeEditor, [{
        key: 'initialize',
        value: function initialize() {
            get$1(LayerShapeEditor.prototype.__proto__ || Object.getPrototypeOf(LayerShapeEditor.prototype), 'initialize', this).call(this);

            this.$board = this.parent.refs.$board;
            this.$canvas = this.parent.refs.$canvas;
            this.$page = this.parent.refs.$page;
        }
    }, {
        key: 'components',
        value: function components() {
            return shapeEditor;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class="layer-shape-editor">\n                <CircleEditor></CircleEditor>\n                <EllipseEditor></EllipseEditor>\n                <InsetEditor></InsetEditor>\n                <PolygonEditor></PolygonEditor>\n                <PathEditor></PathEditor>\n            </div>\n        ';
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var isShow = this.isShow();
            this.$el.toggle(isShow);

            if (isShow) {
                this.setPosition();
            }
        }
    }, {
        key: 'setRectangle',
        value: function setRectangle(_ref) {
            var x = _ref.x,
                y = _ref.y,
                width = _ref.width,
                height = _ref.height,
                id = _ref.id;

            var boardOffset = this.boardOffset || this.$board.offset();
            var pageOffset = this.pageOffset || this.$page.offset();
            var canvasScrollLeft = this.canvasScrollLeft || this.$board.scrollLeft();
            var canvasScrollTop = this.canvasScrollTop || this.$board.scrollTop();

            x = pxUnit(unitValue(x) + pageOffset.left - boardOffset.left + canvasScrollLeft);
            y = pxUnit(unitValue(y) + pageOffset.top - boardOffset.top + canvasScrollTop);

            x = stringUnit(x);
            y = stringUnit(y);
            width = stringUnit(width);
            height = stringUnit(height);

            var transform = "none";

            if (id) {
                transform = this.read('layer/make/transform/rotate', this.read('item/get', id));
            }

            return _extends({
                width: width,
                height: height,
                left: x,
                top: y
            }, transform);
        }
    }, {
        key: 'setPosition',
        value: function setPosition() {
            var item = this.read('selection/current/layer');

            if (!item) return;

            this.$el.css(this.setRectangle(item));
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            // console.log(this.read('selection/current'));
            return this.read('selection/is/layer') || this.read('selection/is/image') || this.read('selection/is/boxshadow') || this.read('selection/is/textshadow');
        }
    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_LAYER_SIZE, CHANGE_LAYER_POSITION, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER_ROTATE, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value$$1() {
            this.refresh();
        }
    }]);
    return LayerShapeEditor;
}(UIElement);

var MoveGuide = function (_UIElement) {
    inherits(MoveGuide, _UIElement);

    function MoveGuide() {
        classCallCheck(this, MoveGuide);
        return possibleConstructorReturn(this, (MoveGuide.__proto__ || Object.getPrototypeOf(MoveGuide)).apply(this, arguments));
    }

    createClass(MoveGuide, [{
        key: 'initialize',
        value: function initialize() {
            get$1(MoveGuide.prototype.__proto__ || Object.getPrototypeOf(MoveGuide.prototype), 'initialize', this).call(this);

            this.$board = this.parent.refs.$board;
            this.$page = this.parent.refs.$page;
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class="move-guide">\n\n            </div>\n        ';
        }
    }, {
        key: LOAD(),
        value: function value() {
            var layer = this.read('selection/current/layer');
            if (!layer) return [];

            var list = this.read('guide/snap/layer', 3);

            var bo = this.$board.offset();
            var po = this.$page.offset();

            var top = po.top - bo.top + this.$board.scrollTop();
            var left = po.left - bo.left + this.$board.scrollLeft();

            return list.map(function (axis) {
                if (axis.type == '-') {
                    return '<div class=\'line\' style=\'left: 0px; top: ' + (axis.y + top) + 'px; right: 0px; height: 1px;\'></div>';
                } else {
                    return '<div class=\'line\' style=\'left: ' + (axis.x + left) + 'px; top: 0px; bottom: 0px; width: 1px;\'></div>';
                }
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {

            var isShow = this.isShow();

            this.$el.toggle(isShow);
            if (isShow) {
                this.load();
            }
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('tool/get', 'moving');
        }
    }, {
        key: EVENT(CHANGE_LAYER_SIZE, CHANGE_LAYER_ROTATE, CHANGE_LAYER_MOVE, CHANGE_LAYER_POSITION, CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: RESIZE('window') + DEBOUNCE(300),
        value: function value(e) {
            this.refresh();
        }
    }]);
    return MoveGuide;
}(UIElement);

var GradientView = function (_UIElement) {
    inherits(GradientView, _UIElement);

    function GradientView() {
        classCallCheck(this, GradientView);
        return possibleConstructorReturn(this, (GradientView.__proto__ || Object.getPrototypeOf(GradientView)).apply(this, arguments));
    }

    createClass(GradientView, [{
        key: 'initialize',
        value: function initialize() {
            get$1(GradientView.prototype.__proto__ || Object.getPrototypeOf(GradientView.prototype), 'initialize', this).call(this);

            this.hasScroll = false;
            this.initializeLayerCache();
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class=\'page-view\'>\n                <div class=\'page-content\' ref="$board">\n                    <div class="page-canvas" ref="$canvas">\n                        <div class="gradient-color-view-container" ref="$page">\n                            <div class="gradient-color-view" ref="$colorview"></div>\n                        </div>       \n                        <PredefinedPageResizer></PredefinedPageResizer>\n                        <PredefinedGroupLayerResizer></PredefinedGroupLayerResizer>\n                        <LayerShapeEditor></LayerShapeEditor>\n                        <MoveGuide></MoveGuide>\n                        <div ref="$dragArea"></div>                     \n                    </div>          \n                </div>\n                <SubFeatureControl></SubFeatureControl>\n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                ColorPickerLayer: ColorPickerLayer,
                SubFeatureControl: SubFeatureControl,
                LayerShapeEditor: LayerShapeEditor,
                MoveGuide: MoveGuide,
                PredefinedPageResizer: PredefinedPageResizer,
                PredefinedGroupLayerResizer: PredefinedGroupLayerResizer
            };
        }
    }, {
        key: 'initializeLayerCache',
        value: function initializeLayerCache() {
            this.layerItems = {};
        }
    }, {
        key: LOAD('$colorview'),
        value: function value$$1() {
            var _this2 = this;

            var page = this.read('selection/current/page');

            if (!page) {
                return '';
            }

            this.initializeLayerCache();

            var list = this.read('item/map/children', page.id, function (item, index) {
                var content = item.content || '';
                return '<div \n                    tabindex=\'' + index + '\'\n                    class=\'layer\' \n                    item-layer-id="' + item.id + '" \n                    title="' + (index + 1) + '. ' + (item.name || 'Layer') + '" \n                    style=\'' + _this2.read('layer/toString', item, true) + '\'>' + content + _this2.read('layer/toStringClipPath', item) + '</div>';
            });

            return list;
        }
    }, {
        key: EVENT('animationEditor'),
        value: function value$$1() {
            this.load();
        }
    }, {
        key: 'refresh',
        value: function refresh(isDrag) {
            this.setBackgroundColor();
            this.load();

            
        }
    }, {
        key: 'refreshLayer',
        value: function refreshLayer() {
            var _this3 = this;

            this.read('selection/current/layer', function (items) {

                if (!items.length) {
                    items = [items];
                }

                items.forEach(function (item) {

                    if (!_this3.layerItems[item.id]) {
                        var $el = _this3.$el.$('[item-layer-id="' + item.id + '"]');

                        _this3.layerItems[item.id] = $el;
                    }

                    _this3.layerItems[item.id].cssText(_this3.read('layer/toString', item, true));

                    var content = item.content || '';
                    _this3.layerItems[item.id].html(content + _this3.read('layer/toStringClipPath', item));
                });
            });
        }
    }, {
        key: 'refreshLayerPosition',
        value: function refreshLayerPosition() {
            var _this4 = this;

            this.read('selection/current/layer', function (items) {

                if (!items.length) {
                    items = [items];
                }

                items.forEach(function (item) {
                    if (!_this4.layerItems[item.id]) {
                        var $el = _this4.$el.$('[item-layer-id="' + item.id + '"]');

                        _this4.layerItems[item.id] = $el;
                    }

                    _this4.layerItems[item.id].css(_this4.read('layer/bound/toCSS', item));
                });
            });
        }
    }, {
        key: 'setBackgroundColor',
        value: function setBackgroundColor() {

            var page = this.read('selection/current/page');

            var pageCSS = this.read('page/toCSS', page || { clip: false });

            var canvasCSS = {
                width: px$1(2000),
                height: px$1(2000)
            };

            var colorviewCSS = this.read('page/colorview/toCSS', page || { clip: false });
            this.refs.$canvas.css(canvasCSS);
            this.refs.$page.css(pageCSS);
            this.refs.$colorview.css(colorviewCSS);

            if (!this.hasScroll) {
                var canvasWidth = 2000;
                var canvasHeight = 2000;
                var boardWidth = this.refs.$board.width();
                var boardHeight = this.refs.$board.height();
                var pageWidth = parseParamNumber$1(pageCSS.width);
                var pageHeight = parseParamNumber$1(pageCSS.height);

                if (boardWidth < pageWidth) {
                    var left = canvasWidth / 2 - (pageWidth / 2 - boardWidth / 2);
                } else {
                    var left = canvasWidth / 2 - boardWidth / 2;
                }

                if (boardHeight < pageHeight) {
                    var top = canvasHeight / 2 - (pageHeight / 2 - boardHeight / 2);
                } else {
                    var top = canvasHeight / 2 - boardHeight / 2;
                }

                this.refs.$board.el.scrollTop = Math.floor(top);
                this.refs.$board.el.scrollLeft = Math.floor(left);
                this.hasScroll = true;
            }

            var item = this.read('selection/current/page');

            this.refs.$page.toggle(item);

            if (item) {
                if (item.itemType == 'page') {
                    var count = this.read('item/count/children', item.id);
                    this.refs.$colorview.toggle(count);
                }
            }
        }
    }, {
        key: EVENT(CHANGE_PAGE_SIZE, CHANGE_PAGE, CHANGE_PAGE_TRANSFORM),
        value: function value$$1() {
            this.setBackgroundColor();
        }

        // [EVENT(
        //     CHANGE_LAYER_POSITION,
        //     CHANGE_LAYER_SIZE,
        //     CHANGE_LAYER_MOVE,        
        // )] () {
        //     this.refreshLayerPosition();
        // }

        // indivisual layer effect 

    }, {
        key: EVENT(CHANGE_LAYER, CHANGE_LAYER_BACKGROUND_COLOR, CHANGE_LAYER_CLIPPATH, CHANGE_LAYER_FILTER, CHANGE_LAYER_BACKDROP_FILTER, CHANGE_LAYER_RADIUS, CHANGE_LAYER_ROTATE, CHANGE_LAYER_OPACITY, CHANGE_LAYER_TRANSFORM, CHANGE_LAYER_TRANSFORM_3D, CHANGE_LAYER_TEXT, CHANGE_LAYER_POSITION, CHANGE_LAYER_SIZE, CHANGE_LAYER_MOVE, CHANGE_LAYER_CLIPPATH_POLYGON, CHANGE_LAYER_CLIPPATH_POLYGON_POSITION, CHANGE_BOXSHADOW, CHANGE_TEXTSHADOW, CHANGE_IMAGE, CHANGE_IMAGE_COLOR, CHANGE_IMAGE_ANGLE, CHANGE_IMAGE_LINEAR_ANGLE, CHANGE_IMAGE_RADIAL_POSITION, CHANGE_IMAGE_RADIAL_TYPE, CHANGE_COLOR_STEP),
        value: function value$$1() {
            this.refreshLayer();
        }

        // all effect 

    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value$$1() {
            this.refresh();
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection() {
            // this.refresh();
        }
    }, {
        key: EVENT('changeTool'),
        value: function value$$1() {
            // this.refresh()
            this.refs.$colorview.toggleClass('showGrid', this.read('tool/get', 'show.grid'));
        }
    }]);
    return GradientView;
}(UIElement);

var HandleView = function (_GradientView) {
    inherits(HandleView, _GradientView);

    function HandleView() {
        classCallCheck(this, HandleView);
        return possibleConstructorReturn(this, (HandleView.__proto__ || Object.getPrototypeOf(HandleView)).apply(this, arguments));
    }

    createClass(HandleView, [{
        key: 'checkPage',
        value: function checkPage(e) {
            return e.target == this.refs.$colorview.el;
        }
    }, {
        key: CLICK('$page .layer') + SELF,
        value: function value(e) {
            var id = e.$delegateTarget.attr('item-layer-id');
            if (id) {
                this.dispatch('selection/one', id);
                this.run('item/focus', id);
            }
        }
    }, {
        key: KEYDOWN('$colorview .layer') + ARROW_DOWN$1,
        value: function value(e) {
            e.preventDefault();
            var y = e.altKey ? 1 : 5;
            this.refreshPosition({ y: y });
        }
    }, {
        key: KEYDOWN('$colorview .layer') + ARROW_UP$1,
        value: function value(e) {
            e.preventDefault();
            var y = e.altKey ? -1 : -5;
            this.refreshPosition({ y: y });
        }
    }, {
        key: KEYDOWN('$colorview .layer') + ARROW_LEFT$1,
        value: function value(e) {
            e.preventDefault();
            var x = e.altKey ? -1 : -5;
            this.refreshPosition({ x: x });
        }
    }, {
        key: KEYDOWN('$colorview .layer') + ARROW_RIGHT$1,
        value: function value(e) {
            e.preventDefault();
            var x = e.altKey ? 1 : 5;
            this.refreshPosition({ x: x });
        }
    }, {
        key: 'refreshPosition',
        value: function refreshPosition(obj) {
            var _this2 = this;

            this.read('selection/current').forEach(function (item) {
                _this2.dispatch('matrix/move', Object.assign({ id: item.id }, obj));
                _this2.refreshLayer();
            });
        }
    }, {
        key: 'selectPageMode',
        value: function selectPageMode() {

            if (!this.dragArea) {
                this.dispatch('selection/change', ITEM_TYPE_PAGE);
            }
        }
    }, {
        key: 'isDownCheck',
        value: function isDownCheck() {
            return this.isDown;
        }
    }, {
        key: 'isNotDownCheck',
        value: function isNotDownCheck() {
            return !this.isDown;
        }
    }, {
        key: 'isPageMode',
        value: function isPageMode(e) {
            if (this.read('selection/is/page')) {
                return true;
            }

            var $target = new Dom(e.target);

            if ($target.is(this.refs.$colorview)) {
                return true;
            }

            if ($target.is(this.refs.$canvas)) {
                return true;
            }
        }
    }, {
        key: 'hasDragArea',
        value: function hasDragArea() {
            return this.dragArea;
        }
    }, {
        key: 'hasNotDragArea',
        value: function hasNotDragArea() {
            return !this.dragArea;
        }
    }, {
        key: POINTERSTART('$canvas') + CHECKER('hasNotDragArea') + CHECKER('isPageMode') + CHECKER('isNotDownCheck'),
        value: function value(e) {
            this.isDown = true;
            this.xy = e.xy;
            this.targetXY = e.xy;
            var x = this.xy.x;
            var y = this.xy.y;
            this.dragArea = true;
            this.refs.$dragArea.cssText('position:absolute;left: ' + x + 'px;top: ' + y + 'px;width: 0px;height:0px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;');
            this.refs.$dragArea.show();
            // console.log('b');        
        }
    }, {
        key: POINTERMOVE('document') + CHECKER('hasDragArea') + CHECKER('isDownCheck'),
        value: function value(e) {
            // if (!this.xy) return;         
            // this.refs.$page.addClass('moving');
            this.targetXY = e.xy;

            var width = Math.abs(this.targetXY.x - this.xy.x);
            var height = Math.abs(this.targetXY.y - this.xy.y);

            var offset = this.refs.$board.offset();

            var x = Math.min(this.targetXY.x, this.xy.x) + this.refs.$board.scrollLeft() - offset.left;
            var y = Math.min(this.targetXY.y, this.xy.y) + this.refs.$board.scrollTop() - offset.top;
            this.refs.$dragArea.cssText('position:absolute;left: ' + x + 'px;top: ' + y + 'px;width: ' + width + 'px;height:' + height + 'px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;');

            // console.log('c');
        }
    }, {
        key: POINTEREND('document') + CHECKER('hasDragArea') + CHECKER('isDownCheck'),
        value: function value(e) {
            var _this3 = this;

            this.isDown = false;

            var width = Math.abs(this.targetXY.x - this.xy.x);
            var height = Math.abs(this.targetXY.y - this.xy.y);

            var po = this.refs.$page.offset();

            var x = Math.min(this.targetXY.x, this.xy.x) - po.left;
            var y = Math.min(this.targetXY.y, this.xy.y) - po.top;

            var area = { x: x, y: y, width: width, height: height };

            if (width != 0 && height != 0) {
                // noop 
            } else {
                var $target = new Dom(e.target);

                if ($target.hasClass('layer')) {
                    area = { x: x, y: y, width: 1, height: 1 };
                } else {
                    area = { x: x, y: y, width: 0, height: 0 };
                }
            }

            this.dispatch('selection/area', area);

            this.updateSelection();

            if (this.read('selection/is/layer')) {
                var items = this.read('selection/current');
                this.run('item/focus', items[0].id);
            }

            this.targetXY = null;
            this.xy = null;

            // console.log('a');

            this.refs.$dragArea.hide();
            setTimeout(function () {
                _this3.dragArea = false;
            }, 100);
        }
    }]);
    return HandleView;
}(GradientView);

var ToolMenu = function (_UIElement) {
    inherits(ToolMenu, _UIElement);

    function ToolMenu() {
        classCallCheck(this, ToolMenu);
        return possibleConstructorReturn(this, (ToolMenu.__proto__ || Object.getPrototypeOf(ToolMenu)).apply(this, arguments));
    }

    createClass(ToolMenu, [{
        key: 'components',
        value: function components() {
            return {
                PageShowGrid: PageShowGrid,
                ExportCodePenButton: ExportCodePenButton,
                ExportJSFiddleButton: ExportJSFiddleButton
            };
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class=\'tool-menu\'>        \n                <div class="add-items">\n                    <label>Layer </label>\n                    <button type="button" class=\'add-layer rect\' ref="$addLayer"></button>\n                    <button type="button" class=\'add-layer circle\' ref="$addLayerCircle"></button>\n                    <button type="button" class=\'view-sample arrow\' ref="$viewSample"></button>\n                   \n                </div>\n                <div class="add-items">\n                    <label>Gradient </label>\n                    <div class=\'gradient-type\' ref="$gradientType">\n                        <div class="gradient-item linear" data-type="linear" title="Linear Gradient"></div>\n                        <div class="gradient-item radial" data-type="radial" title="Radial Gradient"></div>\n                        <div class="gradient-item conic" data-type="conic" title="Conic Gradient"></div>                            \n                        <div class="gradient-item repeating-linear" data-type="repeating-linear" title="repeating Linear Gradient"></div>\n                        <div class="gradient-item repeating-radial" data-type="repeating-radial" title="repeating Radial Gradient"></div>\n                        <div class="gradient-item repeating-conic" data-type="repeating-conic" title="repeating Conic Gradient"></div>                            \n                        <div class="gradient-item static" data-type="static" title="Static Color"></div>                                \n                        <div class="gradient-item image" data-type="image" title="Background Image">\n                            <div class="m1"></div>\n                            <div class="m2"></div>\n                            <div class="m3"></div> \n                        </div>                                                  \n                        <div class="gradient-sample-list arrow" title="Gradient Sample View">\n                        </div>     \n                    </div>\n                </div>\n                <div class=\'items\'>\n                    <label>Show Grid <input type=\'checkbox\' ref="$check"></label>                \n                    <button type="button" ref="$exportButton">Export</button>    \n                    <ExportCodePenButton></ExportCodePenButton>\n                    <ExportJSFiddleButton></ExportJSFiddleButton>\n                    <button type="button" ref="$saveButton">Save</button>\n                    <a class="button" href="https://github.com/easylogic/css" target="_github_">Github</a>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: CLICK('$check'),
        value: function value() {
            var _this2 = this;

            this.read('selection/current/page', function (item) {
                _this2.run('tool/set', 'show.grid', _this2.refs.$check.checked());
                _this2.dispatch('tool/set', 'snap.grid', _this2.refs.$check.checked());
            });
        }
    }, {
        key: CLICK('$saveButton'),
        value: function value(e) {
            this.run('storage/save');
        }
    }, {
        key: CLICK('$viewSample'),
        value: function value(e) {
            this.emit('togglePageSampleView');
        }
    }, {
        key: CLICK('$exportButton'),
        value: function value(e) {
            this.emit('showExport');
        }
    }, {
        key: CLICK('$addLayer'),
        value: function value(e) {
            var _this3 = this;

            this.read('selection/current/page', function (page) {
                _this3.dispatch('item/add', ITEM_TYPE_LAYER, true, page.id);
                _this3.dispatch('history/push', 'Add a layer');
            });
        }
    }, {
        key: CLICK('$addLayerCircle'),
        value: function value(e) {
            var _this4 = this;

            this.read('selection/current/page', function (page) {
                _this4.dispatch('item/add', ITEM_TYPE_CIRCLE, true, page.id);
                _this4.dispatch('history/push', 'Add a layer');
            });
        }
    }, {
        key: CLICK('$gradientType .gradient-item'),
        value: function value(e) {
            var _this5 = this;

            this.read('selection/current/layer', function (item) {
                var type = e.$delegateTarget.attr('data-type');

                _this5.dispatch('item/prepend/image', type, true, item.id);
                _this5.dispatch('history/push', 'Add ' + type + ' gradient');
            });
        }
    }, {
        key: CLICK('$el .gradient-sample-list'),
        value: function value(e) {
            this.emit('toggleGradientSampleView');
        }
    }]);
    return ToolMenu;
}(UIElement);

var PageListView = function (_UIElement) {
    inherits(PageListView, _UIElement);

    function PageListView() {
        classCallCheck(this, PageListView);
        return possibleConstructorReturn(this, (PageListView.__proto__ || Object.getPrototypeOf(PageListView)).apply(this, arguments));
    }

    createClass(PageListView, [{
        key: 'components',
        value: function components() {
            return { PageShowGrid: PageShowGrid };
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class=\'pages\'>         \n                <div class="page-list" ref="$pageList">\n                \n                </div>\n                <div class=\'project-tools\'>\n                    <button type="button" class=\'view-sample\' ref="$viewSample"></button>                \n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'makeItemNode',
        value: function makeItemNode(node, index) {
            var item = this.read('item/get', node.id);

            var page = this.read('selection/current/page');

            var selectedId = '';

            if (page) selectedId = page.id;

            if (item.itemType == 'page') {
                return this.makeItemNodePage(item, index, selectedId);
            }
        }
    }, {
        key: 'makeItemNodePage',
        value: function makeItemNodePage(item, index, selectedId) {
            var selected = item.id == selectedId ? 'selected' : '';
            return '\n            <div class=\'tree-item ' + selected + '\' id="' + item.id + '" type=\'page\'>\n                <div class="item-preview"></div>\n                <div class="item-title">\n                    ' + (item.name || 'Project ' + index) + '\n                </div>   \n            </div>\n            ';
        }
    }, {
        key: LOAD('$pageList'),
        value: function value() {
            var _this2 = this;

            var str = this.read('item/map/page', function (item, index) {
                return _this2.makeItemNode(item, index);
            }).join('');

            str += '<button type="button" class=\'add-page\'></button>';

            return str;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.load();
        }
    }, {
        key: EVENT(CHANGE_PAGE),
        value: function value() {
            this.refresh();
            this.emit(CHANGE_EDITOR);
        }
    }, {
        key: CLICK('$pageList .add-page'),
        value: function value(e) {
            this.dispatch('item/add/page', true);
            this.refresh();
        }
    }, {
        key: CLICK('$pageList .tree-item') + SELF,
        value: function value(e) {

            this.dispatch('selection/one', e.$delegateTarget.attr('id'));
            this.refresh();
        }
    }, {
        key: CLICK('$saveButton'),
        value: function value(e) {
            this.run('storage/save');
        }
    }, {
        key: CLICK('$viewSample'),
        value: function value(e) {
            this.emit('togglePageSampleView');
        }
    }, {
        key: CLICK('$exportButton'),
        value: function value(e) {
            this.emit('showExport');
        }
    }]);
    return PageListView;
}(UIElement);

var SelectLayerView = function (_UIElement) {
    inherits(SelectLayerView, _UIElement);

    function SelectLayerView() {
        classCallCheck(this, SelectLayerView);
        return possibleConstructorReturn(this, (SelectLayerView.__proto__ || Object.getPrototypeOf(SelectLayerView)).apply(this, arguments));
    }

    createClass(SelectLayerView, [{
        key: "template",
        value: function template() {
            return "    \n            <div class=\"select-layer-view\">\n\n                <div class=\"item-info\">\n                    <LayerListView></LayerListView>\n                </div>\n                <PageListView></PageListView>                            \n            </div>\n        ";
        }
    }, {
        key: "components",
        value: function components() {
            return {
                PageListView: PageListView,
                LayerListView: LayerListView
            };
        }
    }]);
    return SelectLayerView;
}(UIElement);

var ImageToolbar = function (_UIElement) {
    inherits(ImageToolbar, _UIElement);

    function ImageToolbar() {
        classCallCheck(this, ImageToolbar);
        return possibleConstructorReturn(this, (ImageToolbar.__proto__ || Object.getPrototypeOf(ImageToolbar)).apply(this, arguments));
    }

    createClass(ImageToolbar, [{
        key: 'template',
        value: function template() {
            return '\n            <div class=\'image-toolbar\'>            \n                <div class="step-align">\n                    <label>Sorting</label>\n                    <div class="button-group">\n                        <button ref="$ordering" title="Full Ordering">=|=</button>\n                        <button ref="$orderingLeft" title="Left Ordering">=|</button>\n                        <button ref="$orderingRight" title="Right Ordering">|=</button>\n                    </div>\n\n                    <label>Cutting</label>\n                    <div class="button-group">\n                        <button class="cut" ref="$cutOff" title="Cut Off"></button>\n                        <button class="cut on" ref="$cutOn" title="Cut On"></button>\n                    </div>      \n                </div>\n                                \n            </div>\n        ';
        }

        // indivisual layer effect 

    }, {
        key: EVENT(CHANGE_EDITOR, CHANGE_SELECTION),
        value: function value() {
            this.refresh();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.$el.toggle(this.isShow());
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.read('selection/is/image');
        }
    }, {
        key: CLICK('$ordering'),
        value: function value(e) {
            this.dispatch('colorstep/ordering/equals');
            this.dispatch('history/push', 'Ordering gradient');
        }
    }, {
        key: CLICK('$orderingLeft'),
        value: function value(e) {
            this.dispatch('colorstep/ordering/equals/left');
            this.dispatch('history/push', 'Ordering gradient');
        }
    }, {
        key: CLICK('$orderingRight'),
        value: function value(e) {
            this.dispatch('colorstep/ordering/equals/right');
            this.dispatch('history/push', 'Ordering gradient');
        }
    }, {
        key: CLICK('$cutOff'),
        value: function value(e) {
            this.dispatch('colorstep/cut/off');
            this.dispatch('history/push', 'Cut off static gradient pattern');
        }
    }, {
        key: CLICK('$cutOn'),
        value: function value(e) {
            this.dispatch('colorstep/cut/on');
            this.dispatch('history/push', 'Cut on static gradient pattern');
        }
    }]);
    return ImageToolbar;
}(UIElement);

var CSSEditor$1 = function (_BaseCSSEditor) {
    inherits(CSSEditor, _BaseCSSEditor);

    function CSSEditor() {
        classCallCheck(this, CSSEditor);
        return possibleConstructorReturn(this, (CSSEditor.__proto__ || Object.getPrototypeOf(CSSEditor)).apply(this, arguments));
    }

    createClass(CSSEditor, [{
        key: 'afterRender',
        value: function afterRender() {
            var _this2 = this;

            setTimeout(function () {
                _this2.emit('changeEditor');
            }, 100);
        }
    }, {
        key: 'template',
        value: function template() {
            return '\n            <div class="layout-main expertor-mode" ref="$layoutMain">\n                <div class="layout-header">\n                    <h1 class="header-title">' + this.i18n('app.title') + '</h1>\n                    <div class="page-tab-menu">\n                        <ToolMenu></ToolMenu>\n                    </div>\n                </div>\n                <div class="layout-top">\n                    <LayerToolbar></LayerToolbar>\n                </div>\n                <div class="layout-left">      \n                    <SelectLayerView></SelectLayerView>\n                </div>\n                <div class="layout-body">\n                    <ImageToolbar></ImageToolbar>\n                    <VerticalColorStep></VerticalColorStep>\n                    <HandleView></HandleView>                      \n                </div>                \n                <div class="layout-right">\n                    <FeatureControl></FeatureControl>\n                    <ClipPathImageList></ClipPathImageList>\n                </div>\n                <div class="layout-footer">\n                    <Timeline></Timeline>\n                </div>\n                <ExportView></ExportView>\n                <DropView></DropView>\n                <GradientSampleView></GradientSampleView>\n                <LayerSampleView></LayerSampleView>\n                <PageSampleView></PageSampleView>\n            </div>\n        ';
        }
    }, {
        key: 'components',
        value: function components() {
            return {
                ImageToolbar: ImageToolbar,
                SelectLayerView: SelectLayerView,
                ToolMenu: ToolMenu,
                LayerToolbar: LayerToolbar,
                ClipPathImageList: ClipPathImageList,
                GradientSampleView: GradientSampleWindow,
                VerticalColorStep: VerticalColorStep,
                DropView: DropView,
                ExportView: ExportWindow,
                HandleView: HandleView,
                FeatureControl: FeatureControl,
                LayerListView: LayerListView,
                SubFeatureControl: SubFeatureControl,
                Timeline: Timeline,
                LayerSampleView: LayerSampleWindow,
                PageSampleView: PageSampleWindow
            };
        }
    }, {
        key: EVENT(CHANGE_EDITOR),
        value: function value() {
            /*
            this.read('selection/current/layer', (layer) => {
                var self = this; 
                var obj = layer.style
                var aniObject = Animation.createTimeline([{
                    duration: 1000, 
                    obj,
                    timing: 'ease-out-sine',
                    iteration: 3, 
                    direction: 'alternate',
                    keyframes : {
                        '0%': {
                            'x': '0px',
                            'background-color': 'rgba(255, 255, 255, 0.5)',
                        },
                        '100%': {
                            'x': '250px',
                            'background-color': 'rgba(255, 0, 255, 1)'
                        }
                    } 
                 }], {
                    callback() {
                        self.run('item/set', layer);
                        self.emit('animationEditor')
                    }
                });
                 aniObject.start();
                 })
            */

        }
    }, {
        key: 'loadStart',
        value: function loadStart(isAdd) {
            var _this3 = this;

            this.dispatch('storage/load', function (isLoaded) {
                if (!isLoaded && isAdd) {
                    _this3.dispatch('item/add/page', true);
                } else {
                    _this3.dispatch('item/load');
                }
                _this3.emit(CHANGE_PAGE);
            });
        }
    }, {
        key: 'toggleTimeline',
        value: function toggleTimeline() {
            this.$el.toggleClass('show-timeline');
        }
    }, {
        key: EVENT('updateLayout'),
        value: function value(layout) {
            // screenModes.filter(key => key != layout).forEach(key => {
            //     this.refs.$layoutMain.removeClass(`${key}-mode`)
            // })

            // this.refs.$layoutMain.addClass(`${layout}-mode`)
        }
    }, {
        key: EVENT('togglePagePanel'),
        value: function value() {
            this.$el.toggleClass('has-page-panel');
        }
    }, {
        key: EVENT('toggleLayerPanel'),
        value: function value() {
            this.$el.toggleClass('has-layer-panel');
        }
    }]);
    return CSSEditor;
}(BaseCSSEditor);

var CSSEditor = {
    createCSSEditor: function createCSSEditor() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: 'white' };

        switch (opts.type) {
            default:
                return new CSSEditor$1(opts);
        }
    },

    CSSEditor: CSSEditor$1
};

var index = _extends({}, Util, ColorPicker, CSSEditor);

return index;

})));
