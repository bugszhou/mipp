interface IFn {
  (): void;
}

export default class Base<IData> {
  /**
   * 组件名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }

  data = {};

  private delProperties = [
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
  customerProperties: string[] = [];

  constructor() {
    return Base.serialize(this);
  }

  /** 组件的文件路径 */
  is: string;

  /** 节点id */
  id: string;

  /** 节点dataset */
  dataset: Record<string, string>;

  setData(opts?: Partial<IData>, callback?: () => any): void {
    if (opts) {
      //
    }
  }

  /** 检查组件是否具有 `behavior` （检查时会递归检查被直接或间接引入的所有behavior） */
  hasBehavior(behavior: object): void {}

  /** 触发事件，参见组件事件 */
  triggerEvent(
    name: string,
    detail?: object,
    options?: WechatMiniprogram.Component.TriggerEventOption
  ): void {}

  /** 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内 */
  createSelectorQuery(): WechatMiniprogram.SelectorQuery {}

  /** 创建一个 IntersectionObserver 对象，选择器选取范围为这个组件实例内 */
  createIntersectionObserver(
    options: WechatMiniprogram.CreateIntersectionObserverOption
  ): WechatMiniprogram.IntersectionObserver {}

  /** 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 `wx://component-export` 影响） */
  selectComponent(
    selector: string
  ): WechatMiniprogram.Component.TrivialInstance {}

  /** 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组 */
  selectAllComponents(
    selector: string
  ): WechatMiniprogram.Component.TrivialInstance[] {}

  /**
   * 选取当前组件节点所在的组件实例（即组件的引用者），返回它的组件实例对象（会被 `wx://component-export` 影响）
   *
   * 最低基础库版本：[`2.8.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  selectOwnerComponent(): WechatMiniprogram.Component.TrivialInstance {}

  /** 获取这个关系所对应的所有关联节点，参见 组件间关系 */
  getRelationNodes(
    relationKey: string
  ): WechatMiniprogram.Component.TrivialInstance[] {}

  /**
   * 立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步）
   *
   * 最低基础库版本：[`2.4.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  groupSetData(callback?: () => void): void {}

  /**
   * 返回当前页面的 custom-tab-bar 的组件实例
   *
   * 最低基础库版本：[`2.6.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  getTabBar(): WechatMiniprogram.Component.TrivialInstance {}

  /**
   * 返回页面标识符（一个字符串），可以用来判断几个自定义组件实例是不是在同一个页面内
   *
   * 最低基础库版本：[`2.7.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  getPageId(): string {}

  /**
   * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   * scrollTimeline?: WechatMiniprogram.Component.ScrollTimelineOption,
   * callback?: () => void,
   **/
  animate(
    selector: string,
    keyFrames: WechatMiniprogram.Component.KeyFrame[] | WechatMiniprogram.Component.ScrollTimelineKeyframe[],
    duration?: number,
    ...opts,
  ): void {}

  /**
   * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  clearAnimation(
    selector: string,
    options?: WechatMiniprogram.Component.ClearAnimationOptions | IFn,
    callback?: () => void
  ): void {}

  getOpenerEventChannel(): WechatMiniprogram.EventChannel {}

  static serialize<T extends Base<any>>(obj: T): any {
    const start = Date.now();
    const that = Object.create(null);

    const delProperties = [
      ...obj.delProperties,
      "delProperties",
      "customerProperties",
    ];
    if (Array.isArray(obj.customerProperties)) {
      delProperties.push(...obj.customerProperties);
    }

    const allProperties = [
      ...Object.keys(obj),
      ...Object.keys(Object.getPrototypeOf(obj)),
    ];
    allProperties.forEach((key) => {
      if (delProperties.includes(key)) {
        return;
      }
      that[key] = obj[key];
    });

    try {
      console.log(obj.componentName, " serialize time: ", Date.now() - start);
    } catch (e) {
      console.log(e);
    }

    return that;
  }
}
