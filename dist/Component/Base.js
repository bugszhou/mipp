"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lifetime = exports.lifetimes = exports.pageLifetime = exports.observer = exports.method = exports.MiniComponent = void 0;
var rfdc_1 = __importDefault(require("rfdc"));
var rfdc_2 = __importDefault(require("rfdc"));
function isPlainObject(val) {
    if (val === null ||
        Object.prototype.toString.call(val) !== "[object Object]") {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
var Base = /** @class */ (function () {
    function Base() {
        this.data = {};
    }
    Object.defineProperty(Base.prototype, "componentName", {
        /**
         * 组件名称，注意唯一性
         */
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    return Base;
}());
exports.default = Base;
var MiniComponent = /** @class */ (function () {
    function MiniComponent() {
        this.data = Object.create(null);
        this.viewStatus = "load";
        this.delProperties = ["constructor"];
    }
    MiniComponent.prototype.setDataAsync = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.setData(data, function () {
                resolve(void 0);
            });
        });
    };
    MiniComponent.serialize = function (obj) {
        var _a, _b;
        var that = rfdc_2.default({ proto: true })(obj);
        var _that = that;
        var delProperties = __spreadArrays((Array.isArray(obj.delProperties) ? obj.delProperties : []));
        delProperties.forEach(function (item) {
            delete that[item];
        });
        try {
            if (typeof (_that === null || _that === void 0 ? void 0 : _that.props) === "object") {
                _that.properties = _that === null || _that === void 0 ? void 0 : _that.props;
                _that === null || _that === void 0 ? true : delete _that.props;
            }
            Object.keys((_that === null || _that === void 0 ? void 0 : _that.properties) || {}).forEach(function (property) {
                var _a, _b, _c, _d;
                var val = (_a = _that === null || _that === void 0 ? void 0 : _that.properties) === null || _a === void 0 ? void 0 : _a[property];
                if (typeof val === "undefined") {
                    (_b = _that === null || _that === void 0 ? void 0 : _that.properties) === null || _b === void 0 ? true : delete _b[property];
                    return;
                }
                if (typeof val === "string") {
                    _that.properties[property] = {
                        type: String,
                        value: val,
                    };
                    return;
                }
                if (typeof val === "number") {
                    _that.properties[property] = {
                        type: Number,
                        value: val,
                    };
                    return;
                }
                if (typeof val === "boolean") {
                    _that.properties[property] = {
                        type: Boolean,
                        value: val,
                    };
                    return;
                }
                if (Array.isArray(val)) {
                    _that.properties[property] = {
                        type: Array,
                        value: _that === null || _that === void 0 ? void 0 : _that.properties[property],
                    };
                    return;
                }
                if (isPlainObject(val) || val === null) {
                    var defaultType = (_c = _that.properties[property]) === null || _c === void 0 ? void 0 : _c.type;
                    var defaultValue = (_d = _that.properties[property]) === null || _d === void 0 ? void 0 : _d.value;
                    var safeValue = defaultValue ||
                        defaultValue === null ||
                        defaultValue === "" ||
                        defaultValue === 0 ||
                        defaultValue === false
                        ? defaultValue
                        : Object.create(null);
                    _that.properties[property] = {
                        type: typeof defaultType === "function" ? defaultType : Object,
                        value: typeof defaultType === "function" ? safeValue : val,
                    };
                    return;
                }
            });
        }
        catch (e) {
            console.error(e);
        }
        if (!(_that === null || _that === void 0 ? void 0 : _that.methods)) {
            _that.methods = Object.create(null);
        }
        _that.methods.setDataAsync = _that.setDataAsync;
        delete _that.setDataAsync;
        if (!(_that === null || _that === void 0 ? void 0 : _that.lifetimes)) {
            _that.lifetimes = Object.create(null);
        }
        var createdFn = (_a = _that === null || _that === void 0 ? void 0 : _that.lifetimes) === null || _a === void 0 ? void 0 : _a.created;
        _that.lifetimes.created = function created() {
            var _a;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                this.viewStatus = "load";
            }
            catch (_b) { }
            return (_a = createdFn === null || createdFn === void 0 ? void 0 : createdFn.apply) === null || _a === void 0 ? void 0 : _a.call(createdFn, this, opts);
        };
        var readyFn = (_b = _that === null || _that === void 0 ? void 0 : _that.lifetimes) === null || _b === void 0 ? void 0 : _b.ready;
        _that.lifetimes.ready = function ready() {
            var _a;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                if (this.viewStatus !== "ready") {
                    this.viewStatus = "ready";
                }
            }
            catch (_b) { }
            return (_a = readyFn === null || readyFn === void 0 ? void 0 : readyFn.apply) === null || _a === void 0 ? void 0 : _a.call(readyFn, this, opts);
        };
        try {
            __spreadArrays(Object.keys(_that.methods), Object.keys((_that === null || _that === void 0 ? void 0 : _that.pageLifetimes) || {}), Object.keys((_that === null || _that === void 0 ? void 0 : _that.observers) || {}), Object.keys((_that === null || _that === void 0 ? void 0 : _that.lifetimes) || {})).forEach(function (keyName) {
                delete _that[keyName];
            });
            delete _that.delProperties;
        }
        catch (e) {
            console.error(e);
        }
        return that;
    };
    MiniComponent.Component = function (ins) {
        MiniComponent.render(ins);
    };
    MiniComponent.render = function (ins) {
        Component(MiniComponent.serialize(ins));
    };
    return MiniComponent;
}());
exports.MiniComponent = MiniComponent;
function method(UIInterface, methodName, descriptor) {
    var _a;
    var methods = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.methods) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("methods")) {
        UIInterface.methods = Object.create(null);
    }
    UIInterface.methods = __assign(__assign({}, UIInterface.methods), (methods !== null && methods !== void 0 ? methods : Object.create(null)));
    UIInterface.methods[methodName] = descriptor.value;
}
exports.method = method;
function observer(UIInterface, methodName, descriptor) {
    var _a;
    var observers = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.observers) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("observers")) {
        UIInterface.observers = Object.create(null);
    }
    UIInterface.observers = __assign(__assign({}, UIInterface.observers), (observers !== null && observers !== void 0 ? observers : Object.create(null)));
    UIInterface.observers[methodName] = descriptor.value;
}
exports.observer = observer;
function pageLifetime(UIInterface, methodName, descriptor) {
    var _a;
    var pageLifetimes = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.pageLifetimes) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("pageLifetimes")) {
        UIInterface.pageLifetimes = Object.create(null);
    }
    UIInterface.pageLifetimes = __assign(__assign({}, UIInterface.pageLifetimes), (pageLifetimes !== null && pageLifetimes !== void 0 ? pageLifetimes : Object.create(null)));
    UIInterface.pageLifetimes[methodName] = descriptor.value;
}
exports.pageLifetime = pageLifetime;
function lifetimes(UIInterface, methodName, descriptor) {
    var _a;
    var lifetimes = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.lifetimes) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("lifetimes")) {
        UIInterface.lifetimes = Object.create(null);
    }
    UIInterface.lifetimes = __assign(__assign({}, UIInterface.lifetimes), (lifetimes !== null && lifetimes !== void 0 ? lifetimes : Object.create(null)));
    var base = Object.getPrototypeOf(UIInterface);
    var fn = descriptor.value;
    UIInterface.lifetimes[methodName] = function lifetimesFn() {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof (base === null || base === void 0 ? void 0 : base.created) === "function")) return [3 /*break*/, 2];
                        // 为什么手动执行一次created
                        return [4 /*yield*/, base.created.apply(this, opts)];
                    case 1:
                        // 为什么手动执行一次created
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, fn.apply(this, opts)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.lifetimes = lifetimes;
function lifetime(UIInterface, methodName, descriptor) {
    var _a;
    var lifetimes = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.lifetimes) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("lifetimes")) {
        UIInterface.lifetimes = Object.create(null);
    }
    UIInterface.lifetimes = __assign(__assign({}, UIInterface.lifetimes), (lifetimes !== null && lifetimes !== void 0 ? lifetimes : Object.create(null)));
    UIInterface.lifetimes[methodName] = descriptor.value;
}
exports.lifetime = lifetime;
