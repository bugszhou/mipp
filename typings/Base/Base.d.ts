type DataOption = Record<string, any>;

export declare class Base<IData extends DataOption> {
  static before(): Partial<{
    onLoad: () => void;
    onShow: () => void;
    onReady: () => void;
  }>;
  /** 页面的文件路径 */
  is: string;

  /** 到当前页面的路径 */
  route: string;

  /** 打开当前页面路径中的参数 */
  options: Record<string, string | undefined>;

  /** `setData` 函数用于将数据从逻辑层发送到视图层
   *（异步），同时改变对应的 `this.data` 的值（同步）。
   *
   * **注意：**
   *
   * 1. **直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致**。
   * 2. 仅支持设置可 JSON 化的数据。
   * 3. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
   * 4. 请不要把 data 中任何一项的 value 设为 `undefined` ，否则这一项将不被设置并可能遗留一些潜在问题。
   */
  setData(
    /** 这次要改变的数据
     *
     * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
     *
     * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
     */
    data: Partial<IData> & WechatMiniprogram.IAnyObject,
    // data: Partial<IData>,
    /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
    callback?: () => void
  ): void;

  setDataAsync(
    /** 这次要改变的数据
     *
     * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
     *
     * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
     */
    data: Partial<IData> & WechatMiniprogram.IAnyObject
  ): Promise<void>;

  /** 检查组件是否具有 `behavior` （检查时会递归检查被直接或间接引入的所有behavior） */
  hasBehavior(behavior: object): void;

  /** 触发事件，参见组件事件 */
  triggerEvent(
    name: string,
    detail?: object,
    options?: WechatMiniprogram.Component.TriggerEventOption
  ): void;

  /** 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内 */
  createSelectorQuery(): WechatMiniprogram.SelectorQuery;

  /** 创建一个 IntersectionObserver 对象，选择器选取范围为这个组件实例内 */
  createIntersectionObserver(
    options: WechatMiniprogram.CreateIntersectionObserverOption
  ): WechatMiniprogram.IntersectionObserver;

  /** 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 `wx://component-export` 影响） */
  selectComponent(
    selector: string
  ): WechatMiniprogram.Component.TrivialInstance;

  /** 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组 */
  selectAllComponents(
    selector: string
  ): WechatMiniprogram.Component.TrivialInstance[];

  /**
   * 选取当前组件节点所在的组件实例（即组件的引用者），返回它的组件实例对象（会被 `wx://component-export` 影响）
   *
   * 最低基础库版本：[`2.8.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  selectOwnerComponent(): WechatMiniprogram.Component.TrivialInstance;

  /** 获取这个关系所对应的所有关联节点，参见 组件间关系 */
  getRelationNodes(
    relationKey: string
  ): WechatMiniprogram.Component.TrivialInstance[];

  /**
   * 立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步）
   *
   * 最低基础库版本：[`2.4.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  groupSetData(callback?: () => void): void;

  /**
   * 返回当前页面的 custom-tab-bar 的组件实例
   *
   * 最低基础库版本：[`2.6.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  getTabBar(): WechatMiniprogram.Component.TrivialInstance;

  /**
   * 返回页面标识符（一个字符串），可以用来判断几个自定义组件实例是不是在同一个页面内
   *
   * 最低基础库版本：[`2.7.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  getPageId(): string;

  /**
   * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  animate(
    selector: string,
    keyFrames: WechatMiniprogram.Component.KeyFrame[],
    duration: number,
    callback: () => void
  ): void;

  /**
   * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  animate(
    selector: string,
    keyFrames: WechatMiniprogram.Component.ScrollTimelineKeyframe[],
    duration: number,
    scrollTimeline: WechatMiniprogram.Component.ScrollTimelineOption
  ): void;

  /**
   * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  clearAnimation(selector: string, callback: () => void): void;

  /**
   * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  clearAnimation(
    selector: string,
    options: WechatMiniprogram.Component.ClearAnimationOptions,
    callback: () => void
  ): void;

  getOpenerEventChannel(): WechatMiniprogram.EventChannel;
  /**
   * 获取更新性能统计信息，详见 [获取更新性能统计信息]((custom-component/update-perf-stat))
   *
   *
   * 最低基础库版本：[`2.12.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  setUpdatePerformanceListener<WithDataPath extends boolean = false>(
    options: WechatMiniprogram.Component.SetUpdatePerformanceListenerOption<WithDataPath>,
    callback?: WechatMiniprogram.Component.UpdatePerformanceListener<WithDataPath>
  ): void;

  static render<IData = any>(ins: Base<IData>): void;
  static serialize<IData = any>(ins: Base<IData>): void;
}

export interface IMiniComponentOptions
  extends WechatMiniprogram.Component.ComponentOptions {}
export interface IMiniComponentRelationOption
  extends WechatMiniprogram.Component.RelationOption {}
export interface IMiniComponentDefinitionFilter
  extends WechatMiniprogram.Component.DefinitionFilter {}

export declare class MiniComponent<
  IData extends DataOption = DataOption,
  IProps = DataOption
> {
  static before(): Partial<{
    created: () => void;
    ready: () => void;
  }>;
  /** 页面的文件路径 */
  is: string;

  id: string;

  // 接口
  /** 类似于mixins和traits的组件间代码复用机制，参见 [behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html) */
  behaviors: string[];

  // 接口
  /** 组件间关系定义，参见 [组件间关系](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html) */
  relations: {
    [componentName: string]: IMiniComponentRelationOption;
  };

  // 接口
  /** 组件接受的外部样式类，参见 [外部样式类](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html) */
  externalClasses?: string[];

  // 接口
  /** 一些选项（文档中介绍相关特性时会涉及具体的选项设置，这里暂不列举） */
  options: IMiniComponentOptions;

  // 接口
  /** 定义段过滤器，用于自定义组件扩展，参见 [自定义组件扩展](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/extend.html)
   *
   * 最低基础库版本： [`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) */
  definitionFilter?: IMiniComponentDefinitionFilter;

  // 接口
  /**
   * 组件自定义导出，当使用 `behavior: wx://component-export` 时，这个定义段可以用于指定组件被 selectComponent 调用时的返回值，参见 [组件间通信与事件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)
   * 最低基础库版本： [`2.2.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) */
  export: () => Record<string, any>;

  /** `setData` 函数用于将数据从逻辑层发送到视图层
   *（异步），同时改变对应的 `this.data` 的值（同步）。
   *
   * **注意：**
   *
   * 1. **直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致**。
   * 2. 仅支持设置可 JSON 化的数据。
   * 3. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
   * 4. 请不要把 data 中任何一项的 value 设为 `undefined` ，否则这一项将不被设置并可能遗留一些潜在问题。
   */
  setData(
    /** 这次要改变的数据
     *
     * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
     *
     * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
     */
    data: Partial<IData> & WechatMiniprogram.IAnyObject,
    // data: Partial<IData>,
    /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
    callback?: () => void
  ): void;

  setDataAsync(
    /** 这次要改变的数据
     *
     * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
     *
     * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
     */
    data: Partial<IData> & WechatMiniprogram.IAnyObject
  ): Promise<void>;

  /** 触发事件，参见组件事件 */
  triggerEvent<DetailType = any>(
    name: string,
    detail?: DetailType,
    options?: WechatMiniprogram.Component.TriggerEventOption
  ): void;

  /** 检查组件是否具有 `behavior` （检查时会递归检查被直接或间接引入的所有behavior） */
  hasBehavior(behavior: object): void;

  /** 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内 */
  createSelectorQuery(): WechatMiniprogram.SelectorQuery;

  /** 创建一个 IntersectionObserver 对象，选择器选取范围为这个组件实例内 */
  createIntersectionObserver(
    options: WechatMiniprogram.CreateIntersectionObserverOption
  ): WechatMiniprogram.IntersectionObserver;

  /** 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 `wx://component-export` 影响） */
  selectComponent(
    selector: string
  ): WechatMiniprogram.Component.TrivialInstance;

  /** 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组 */
  selectAllComponents(
    selector: string
  ): WechatMiniprogram.Component.TrivialInstance[];

  /**
   * 选取当前组件节点所在的组件实例（即组件的引用者），返回它的组件实例对象（会被 `wx://component-export` 影响）
   *
   * 最低基础库版本：[`2.8.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  selectOwnerComponent(): WechatMiniprogram.Component.TrivialInstance;

  /** 获取这个关系所对应的所有关联节点，参见 组件间关系 */
  getRelationNodes(
    relationKey: string
  ): WechatMiniprogram.Component.TrivialInstance[];

  /**
   * 立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步）
   *
   * 最低基础库版本：[`2.4.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  groupSetData(callback?: () => void): void;

  /**
   * 返回当前页面的 custom-tab-bar 的组件实例
   *
   * 最低基础库版本：[`2.6.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  getTabBar(): WechatMiniprogram.Component.TrivialInstance;

  /**
   * 返回页面标识符（一个字符串），可以用来判断几个自定义组件实例是不是在同一个页面内
   *
   * 最低基础库版本：[`2.7.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  getPageId(): string;

  /**
   * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  animate(
    selector: string,
    keyFrames: WechatMiniprogram.Component.KeyFrame[],
    duration: number,
    callback: () => void
  ): void;

  /**
   * 执行关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  animate(
    selector: string,
    keyFrames: WechatMiniprogram.Component.ScrollTimelineKeyframe[],
    duration: number,
    scrollTimeline: WechatMiniprogram.Component.ScrollTimelineOption
  ): void;

  /**
   * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  clearAnimation(selector: string, callback: () => void): void;

  /**
   * 清除关键帧动画，详见[动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html)
   *
   * 最低基础库版本：[`2.9.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   **/
  clearAnimation(
    selector: string,
    options: WechatMiniprogram.Component.ClearAnimationOptions,
    callback: () => void
  ): void;

  getOpenerEventChannel(): WechatMiniprogram.EventChannel;
  /**
   * 获取更新性能统计信息，详见 [获取更新性能统计信息]((custom-component/update-perf-stat))
   *
   *
   * 最低基础库版本：[`2.12.0`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  setUpdatePerformanceListener<WithDataPath extends boolean = false>(
    options: WechatMiniprogram.Component.SetUpdatePerformanceListenerOption<WithDataPath>,
    callback?: WechatMiniprogram.Component.UpdatePerformanceListener<WithDataPath>
  ): void;

  // 接口
  /** 页面生命周期回调—监听页面显示
   *
   * 页面显示/切入前台时触发。
   */
  show(): void;

  // 接口
  /** 页面生命周期回调—监听页面隐藏
   *
   * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
   */
  hide(): void;

  // 接口
  /** 页面生命周期回调—监听页面尺寸变化
   *
   * 所在页面尺寸变化时执行
   */
  resize(size: WechatMiniprogram.Page.IResizeOption): void;

  // 接口
  /**
   * 在组件实例刚刚被创建时执行，注意此时不能调用 `setData`
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */

  // 接口
  created(): void;
  /**
   * 在组件实例进入页面节点树时执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */

  // 接口
  attached(): void;

  // 接口
  /**
   * 在组件在视图层布局完成后执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  ready(): void;

  // 接口
  /**
   * 在组件实例被移动到节点树另一个位置时执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  moved(): void;

  // 接口
  /**
   * 在组件实例被从页面节点树移除时执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  detached(): void;

  // 接口
  /**
   * 每当组件方法抛出错误时执行
   *
   * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  error(err: Error): void;

  static Component(ins: any): void;

  static render(ins: any): void;
  static serialize(ins: any): void;
}

export function method(
  UIInterface: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void;

export function observer(
  UIInterface: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void;

export function pageLifetime(
  UIInterface: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void;

export function lifetimes(
  UIInterface: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void;

export function lifetime(
  UIInterface: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void;

export function extendLifetime(
  UIInterface: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void;

export type IComponentData<
  IProps,
  IData = Record<string, any>
> = (IProps extends { properties: any }
  ? Partial<{
      [key in keyof IProps["properties"]]: IProps["properties"][key] extends {
        type: any;
      }
        ? IProps["properties"][key]["value"]
        : IProps["properties"][key];
    }>
  : unknown) &
  IData;
