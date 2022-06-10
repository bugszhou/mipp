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
exports.lifetimes = exports.pageLifetime = exports.observers = exports.method = exports.MiniComponent = void 0;
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
        return MiniComponent.serialize(this);
    }
    MiniComponent.serialize = function (obj) {
        var that = rfdc_1.default({ proto: true })(obj);
        var delProperties = __spreadArrays((Array.isArray(obj.delProperties) ? obj.delProperties : []));
        delProperties.forEach(function (item) {
            delete that[item];
        });
        return that;
    };
    MiniComponent.Component = function (componentIns) {
        Component(componentIns);
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
function observers(UIInterface, methodName, descriptor) {
    if (!UIInterface.observers) {
        UIInterface.observers = Object.create(null);
    }
    UIInterface.observers[methodName] = descriptor.value;
}
exports.observers = observers;
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
