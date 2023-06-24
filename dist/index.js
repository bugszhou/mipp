"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentBase = exports.MiniComponent = exports.method = exports.lifetime = exports.lifetimes = exports.pageLifetime = exports.observer = exports.EmptyBase = exports.PageBase = void 0;
var Base_1 = __importDefault(require("../dist/Page/Base"));
var MiniBase_1 = __importDefault(require("./Page/MiniBase"));
var Base_2 = require("./Component/Base");
Object.defineProperty(exports, "MiniComponent", { enumerable: true, get: function () { return Base_2.MiniComponent; } });
Object.defineProperty(exports, "ComponentBase", { enumerable: true, get: function () { return Base_2.MiniComponent; } });
Object.defineProperty(exports, "method", { enumerable: true, get: function () { return Base_2.method; } });
Object.defineProperty(exports, "observer", { enumerable: true, get: function () { return Base_2.observer; } });
Object.defineProperty(exports, "pageLifetime", { enumerable: true, get: function () { return Base_2.pageLifetime; } });
Object.defineProperty(exports, "lifetimes", { enumerable: true, get: function () { return Base_2.lifetimes; } });
Object.defineProperty(exports, "lifetime", { enumerable: true, get: function () { return Base_2.lifetime; } });
exports.PageBase = Base_1.default;
exports.EmptyBase = MiniBase_1.default;
exports.default = {
    EmptyBase: MiniBase_1.default,
    PageBase: Base_1.default,
    MiniComponent: Base_2.MiniComponent,
    ComponentBase: Base_2.MiniComponent,
    observer: Base_2.observer,
    pageLifetime: Base_2.pageLifetime,
    lifetimes: Base_2.lifetimes,
    lifetime: Base_2.lifetime,
    method: Base_2.method,
};
