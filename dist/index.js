"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentBase = exports.PageBase = void 0;
var Base_1 = __importDefault(require("../dist/Page/Base"));
var Base_2 = __importDefault(require("../dist/Component/Base"));
exports.PageBase = Base_1.default;
exports.ComponentBase = Base_2.default;
var MiniBase = /** @class */ (function () {
    function MiniBase() {
    }
    return MiniBase;
}());
exports.default = {
    MiniBase: MiniBase,
    PageBase: Base_1.default,
    ComponentBase: Base_2.default,
};
