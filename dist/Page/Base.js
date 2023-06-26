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
        return Base.serialize(this);
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
    Base.serialize = function (obj) {
        var that = rfdc_1.default({ proto: true })(obj);
        var delProperties = __spreadArrays((Array.isArray(obj.delProperties) ? obj.delProperties : []));
        delProperties.forEach(function (item) {
            delete that[item];
        });
        var createdFn = that === null || that === void 0 ? void 0 : that.onLoad;
        that.onLoad = function created() {
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
        var readyFn = that === null || that === void 0 ? void 0 : that.onReady;
        that.onReady = function ready() {
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
        return that;
    };
    Base.render = function (ins) {
        Page(ins);
    };
    return Base;
}());
exports.default = Base;
