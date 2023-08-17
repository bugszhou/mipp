"use strict";
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
var rfdc_1 = __importDefault(require("rfdc"));
var Base = /** @class */ (function () {
    function Base() {
        this.data = {};
        this.delProperties = ["constructor"];
    }
    Object.defineProperty(Base.prototype, "componentName", {
        /**
         * 页面名称，注意唯一性
         */
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    Base.prototype.setDataAsync = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.setData(data, function () {
                resolve(void 0);
            });
        });
    };
    Base.before = function () {
        return Object.create(null);
    };
    Base.serialize = function (obj) {
        var _a;
        var that = rfdc_1.default({ proto: true })(obj);
        var delProperties = __spreadArrays((Array.isArray(obj.delProperties) ? obj.delProperties : []));
        delProperties.forEach(function (item) {
            delete that[item];
        });
        var beforeObj = (_a = Base === null || Base === void 0 ? void 0 : Base.before) === null || _a === void 0 ? void 0 : _a.call(Base);
        var createdFn = that === null || that === void 0 ? void 0 : that.onLoad;
        that.onLoad = function created() {
            var _a, _b, _c;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                this.viewStatus = "load";
                (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onLoad) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
                (_b = this === null || this === void 0 ? void 0 : this.beforeOnLoad) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArrays([this], opts));
            }
            catch (_d) { }
            return (_c = createdFn === null || createdFn === void 0 ? void 0 : createdFn.apply) === null || _c === void 0 ? void 0 : _c.call(createdFn, this, opts);
        };
        var readyFn = that === null || that === void 0 ? void 0 : that.onReady;
        that.onReady = function ready() {
            var _a, _b;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                if (this.viewStatus !== "ready") {
                    this.viewStatus = "ready";
                }
                (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onReady) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
            }
            catch (_c) { }
            return (_b = readyFn === null || readyFn === void 0 ? void 0 : readyFn.apply) === null || _b === void 0 ? void 0 : _b.call(readyFn, this, opts);
        };
        var showFn = that === null || that === void 0 ? void 0 : that.onShow;
        that.onShow = function show() {
            var _a, _b;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onShow) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
            }
            catch (_c) { }
            return (_b = showFn === null || showFn === void 0 ? void 0 : showFn.apply) === null || _b === void 0 ? void 0 : _b.call(showFn, this, opts);
        };
        return that;
    };
    Base.render = function (ins) {
        Page(ins);
    };
    return Base;
}());
exports.default = Base;
