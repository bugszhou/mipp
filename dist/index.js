"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyBase = exports.ComponentBase = exports.PageBase = void 0;
var Base_1 = __importDefault(require("../dist/Page/Base"));
var MiniBase_1 = __importDefault(require("./Page/MiniBase"));
var Base_2 = __importDefault(require("../dist/Component/Base"));
exports.PageBase = Base_1.default;
exports.ComponentBase = Base_2.default;
exports.EmptyBase = MiniBase_1.default;
exports.default = {
    EmptyBase: MiniBase_1.default,
    PageBase: Base_1.default,
    ComponentBase: Base_2.default,
};
