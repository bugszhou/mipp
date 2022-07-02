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
        var that = rfdc_1.default({ proto: true })(obj);
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
                    var safeValue = defaultValue || defaultValue === null
                        ? defaultValue
                        : Object.create(null);
                    _that.properties[property] = {
                        type: Object,
                        value: typeof defaultType === "function" && defaultType === Object
                            ? safeValue
                            : val,
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
