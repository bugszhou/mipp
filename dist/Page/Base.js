"use strict";
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
            this.viewStatus = "load";
            var isError = false;
            try {
                (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onLoad) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
            }
            catch (e) {
                console.error(e);
                isError = true;
            }
            if (isError) {
                return;
            }
            isError = false;
            try {
                (_b = this === null || this === void 0 ? void 0 : this.beforeOnLoad) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArrays([this], opts));
            }
            catch (e) {
                console.error(e);
            }
            return (_c = createdFn === null || createdFn === void 0 ? void 0 : createdFn.apply) === null || _c === void 0 ? void 0 : _c.call(createdFn, this, opts);
        };
        var readyFn = that === null || that === void 0 ? void 0 : that.onReady;
        that.onReady = function ready() {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                if (this.viewStatus !== "ready") {
                    this.viewStatus = "ready";
                }
            }
            catch (_h) { }
            var isError = false;
            var beforeResult = null;
            try {
                beforeResult = (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onReady) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
            }
            catch (e) {
                console.error(e);
                isError = true;
            }
            if (isError) {
                return;
            }
            isError = false;
            try {
                (_b = this === null || this === void 0 ? void 0 : this.beforeOnReady) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArrays([this], opts));
            }
            catch (e) {
                console.error(e);
            }
            var readyResult = (_c = readyFn === null || readyFn === void 0 ? void 0 : readyFn.apply) === null || _c === void 0 ? void 0 : _c.call(readyFn, this, opts);
            if (typeof beforeResult === "object" &&
                typeof (beforeResult === null || beforeResult === void 0 ? void 0 : beforeResult.then) === "function") {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, beforeResult];
                            case 1:
                                _e.sent();
                                return [4 /*yield*/, ((_b = (_a = that === null || that === void 0 ? void 0 : that.onReadyAsync) === null || _a === void 0 ? void 0 : _a.apply) === null || _b === void 0 ? void 0 : _b.call(_a, this, opts))];
                            case 2:
                                _e.sent();
                                return [4 /*yield*/, ((_d = (_c = that === null || that === void 0 ? void 0 : that.renderView) === null || _c === void 0 ? void 0 : _c.apply) === null || _d === void 0 ? void 0 : _d.call(_c, this, opts))];
                            case 3:
                                _e.sent();
                                return [2 /*return*/, readyResult];
                        }
                    });
                }); })();
            }
            else {
                (_e = (_d = that === null || that === void 0 ? void 0 : that.onReadyAsync) === null || _d === void 0 ? void 0 : _d.apply) === null || _e === void 0 ? void 0 : _e.call(_d, this, opts);
                (_g = (_f = that === null || that === void 0 ? void 0 : that.renderView) === null || _f === void 0 ? void 0 : _f.apply) === null || _g === void 0 ? void 0 : _g.call(_f, this, opts);
            }
            return readyResult;
        };
        var showFn = that === null || that === void 0 ? void 0 : that.onShow;
        that.onShow = function show() {
            var _a, _b;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            var isError = false;
            try {
                (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onShow) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
            }
            catch (e) {
                console.error(e);
                isError = true;
            }
            if (isError) {
                return;
            }
            isError = false;
            return (_b = showFn === null || showFn === void 0 ? void 0 : showFn.apply) === null || _b === void 0 ? void 0 : _b.call(showFn, this, opts);
        };
        return that;
    };
    Base.render = function (ins) {
        Page(Base.serialize(ins));
    };
    return Base;
}());
exports.default = Base;
