"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MiniBase = /** @class */ (function () {
    function MiniBase() {
    }
    Object.defineProperty(MiniBase.prototype, "componentName", {
        /**
         * 页面名称，注意唯一性
         */
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    return MiniBase;
}());
exports.default = MiniBase;
