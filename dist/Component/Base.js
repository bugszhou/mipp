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
exports.lifetimes = exports.pageLifetime = exports.observer = exports.method = exports.MiniComponent = void 0;
var rfdc_1 = __importDefault(require("rfdc"));
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
        var _a, _b, _c, _d;
        var that = rfdc_1.default({ proto: true })(obj);
        var delProperties = __spreadArrays((Array.isArray(obj.delProperties) ? obj.delProperties : []));
        delProperties.forEach(function (item) {
            delete that[item];
        });
        try {
            if (typeof ((_a = that) === null || _a === void 0 ? void 0 : _a.props) === "object") {
                that.properties = (_b = that) === null || _b === void 0 ? void 0 : _b.props;
                (_c = that) === null || _c === void 0 ? true : delete _c.props;
            }
            Object.keys(((_d = that) === null || _d === void 0 ? void 0 : _d.properties) || {})
                .filter(function (property) { var _a; return Array.isArray((_a = that) === null || _a === void 0 ? void 0 : _a.properties[property]); })
                .forEach(function (property) {
                var _a;
                that.properties[property] = {
                    type: Array,
                    value: (_a = that) === null || _a === void 0 ? void 0 : _a.properties[property],
                };
            });
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
    if (!UIInterface.methods) {
        UIInterface.methods = Object.create(null);
    }
    UIInterface.methods[methodName] = descriptor.value;
}
exports.method = method;
function observer(UIInterface, methodName, descriptor) {
    if (!UIInterface.observers) {
        UIInterface.observers = Object.create(null);
    }
    UIInterface.observers[methodName] = descriptor.value;
}
exports.observer = observer;
function pageLifetime(UIInterface, methodName, descriptor) {
    if (!UIInterface.pageLifetimes) {
        UIInterface.pageLifetimes = Object.create(null);
    }
    UIInterface.pageLifetimes[methodName] = descriptor.value;
}
exports.pageLifetime = pageLifetime;
function lifetimes(UIInterface, methodName, descriptor) {
    if (!UIInterface.lifetimes) {
        UIInterface.lifetimes = Object.create(null);
    }
    UIInterface.lifetimes[methodName] = descriptor.value;
}
exports.lifetimes = lifetimes;
