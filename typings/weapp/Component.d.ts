/**
 * Component()相关的类型声明：
 *
 * 1. 使用该组件的页面的生命周期方法声明(IMippWeComponent.IPageLifetime)
 *
 * 2. 组件生命周期方法声明
 *
 */
declare namespace IMippWeComponent {
  /**
   * Component生命周期方法：
   *
   * created(): void
   *
   * attached(): void
   *
   * ready(): void
   *
   * moved(): void
   *
   * detached(): void
   *
   * error(err: Error): void
   *
   */
  interface ILifetimes extends Partial<WechatMiniprogram.Component.Lifetimes> {}

  /**
   * Page生命周期方法:
   *
   * onShow(): void
   *
   * onHide(): void
   *
   * onResize(options: IMippWePage.IResizeOption): void
   */
  interface IPageLifetimes<This> {
    /** 页面生命周期回调—监听页面显示
     *
     * 页面显示/切入前台时触发。
     */
    show(this: This): void;
    /** 页面生命周期回调—监听页面隐藏
     *
     * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
     */
    hide(this: This): void;
    /** 页面生命周期回调—监听页面尺寸变化
     *
     * 所在页面尺寸变化时执行
     */
    resize(this: This, size: IMippWePage.IResizeOption): void;
  }

  /**
   * Page生命周期方法:
   *
   * onShow(): void
   *
   * onHide(): void
   *
   * onResize(options: IMippWePage.IResizeOption): void
   */
  type IPageLifetime<This, IMethods> = Partial<IPageLifetimes<This & IMethodsOption<This, IMethods>>>

  /**
   * Component中options类型声明
   */
  interface IOptions extends WechatMiniprogram.Component.ComponentOptions {}

  /**
   * Component中properties类型声明
   */
  interface IProperty extends WechatMiniprogram.Component.PropertyOption {}

  /**
   * 组件methods声明
   */
  type Keys<IMethods> = keyof IMethods;

  type IMethodsOption<This, IMethods> = { [K in Keys<IMethods>]: (this: (IMethods extends any | null | undefined ? This : This & IMethods), ...args: any[]) => any;};

  interface ITriggerEventOption
    extends WechatMiniprogram.Component.TriggerEventOption {}
}
