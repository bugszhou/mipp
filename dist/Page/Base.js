"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base() {
        this.data = {};
        this.options = {};
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
    return Base;
}());
exports.default = Base;
