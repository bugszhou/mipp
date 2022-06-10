"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniComponent = exports.method = exports.lifetimes = exports.pageLifetime = exports.observers = exports.EmptyBase = exports.PageBase = void 0;
var Base_1 = __importDefault(require("../dist/Page/Base"));
var MiniBase_1 = __importDefault(require("./Page/MiniBase"));
var Base_2 = require("./Component/Base");
Object.defineProperty(exports, "MiniComponent", { enumerable: true, get: function () { return Base_2.MiniComponent; } });
Object.defineProperty(exports, "method", { enumerable: true, get: function () { return Base_2.method; } });
Object.defineProperty(exports, "observers", { enumerable: true, get: function () { return Base_2.observers; } });
Object.defineProperty(exports, "pageLifetime", { enumerable: true, get: function () { return Base_2.pageLifetime; } });
Object.defineProperty(exports, "lifetimes", { enumerable: true, get: function () { return Base_2.lifetimes; } });
exports.PageBase = Base_1.default;
exports.EmptyBase = MiniBase_1.default;
exports.default = {
    EmptyBase: MiniBase_1.default,
    PageBase: Base_1.default,
    MiniComponent: Base_2.MiniComponent,
    observers: Base_2.observers,
    pageLifetime: Base_2.pageLifetime,
    lifetimes: Base_2.lifetimes,
    method: Base_2.method,
};
