var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Base = /** @class */ (function () {
    function Base() {
        this.data = {};
        this.delProperties = [
            "constructor",
            "setData",
            "is",
            "id",
            "dataset",
            "hasBehavior",
            "triggerEvent",
            "createSelectorQuery",
            "createIntersectionObserver",
            "selectComponent",
            "selectAllComponents",
            "selectOwnerComponent",
            "getRelationNodes",
            "groupSetData",
            "getTabBar",
            "getPageId",
            "animate",
            "clearAnimation",
            "getOpenerEventChannel",
        ];
        // 子类自定义配置序列化需要删除的属性名
        this.customerProperties = [];
        return Base.serialize(this);
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
    Base.prototype.setData = function (opts, callback) {
        if (opts) {
            //
        }
    };
    /** 检查组件是否具有 `behavior` （检查时会递归检查被直接或间接引入的所有behavior） */
    Base.prototype.hasBehavior = function (behavior) { };
    /** 触发事件，参见组件事件 */
    Base.prototype.triggerEvent = function (name, detail, options) { };
    /** 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内 */
    Base.prototype.createSelectorQuery = function () { };
    /** 创建一个 IntersectionObserver 对象，选择器选取范围为这个组件实例内 */
    Base.prototype.createIntersectionObserver = function (options) { };
    /** 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 `wx://component-export` 影响） */
    Base.prototype.selectComponent = function (selector) { };
    /** 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组 */
    Base.prototype.selectAllComponents = function (selector) { };
    /**
     * 选取当前组件节点所在的组件实例（即组件的引用者），返回它的组件实例对象（会被 `wx://component-export` 影响）
     *
     * 最低基础库版本：[`2.8.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    Base.prototype.selectOwnerComponent = function () { };
    /** 获取这个关系所对应的所有关联节点，参见 组件间关系 */
    Base.prototype.getRelationNodes = function (relationKey) { };
    /**
     * 立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步）
     *
     * 最低基础库版本：[`2.4.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    Base.prototype.groupSetData = function (callback) { };
    /**
     * 返回当前页面的 custom-tab-bar 的组件实例
     *
     * 最低基础库版本：[`2.6.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    Base.prototype.getTabBar = function () { };
    /**
     * 返回页面标识符（一个字符串），可以用来判断几个自定义组件实例是不是在同一个页面内
     *
     * 最低基础库版本：[`2.7.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    Base.prototype.getPageId = function () { };
    /**
     * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
     *
     * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     * scrollTimeline?: WechatMiniprogram.Component.ScrollTimelineOption,
     * callback?: () => void,
     **/
    Base.prototype.animate = function (selector, keyFrames, duration) {
        var opts = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            opts[_i - 3] = arguments[_i];
        }
    };
    /**
     * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
     *
     * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
     **/
    Base.prototype.clearAnimation = function (selector, options, callback) { };
    Base.prototype.getOpenerEventChannel = function () { };
    Base.serialize = function (obj) {
        var start = Date.now();
        var that = Object.create(null);
        var delProperties = __spreadArrays(obj.delProperties, [
            "delProperties",
            "customerProperties",
        ]);
        if (Array.isArray(obj.customerProperties)) {
            delProperties.push.apply(delProperties, obj.customerProperties);
        }
        var allProperties = __spreadArrays(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj)));
        allProperties.forEach(function (key) {
            if (delProperties.includes(key)) {
                return;
            }
            that[key] = obj[key];
        });
        try {
            console.log(obj.componentName, " serialize time: ", Date.now() - start);
        }
        catch (e) {
            console.log(e);
        }
        return that;
    };
    return Base;
}());
export default Base;
