/**
 * Component()相关的类型声明：
 *
 * 1. 使用该组件的页面的生命周期方法声明(IMippWeComponent.IPageLifetime)
 *
 * 2. 生命周期函数形参类型声明
 *
 * 3. 分享返回值声明(ICustomShareContent)
 *
 * 4. 返回值类型
 */
declare namespace IMippWeComponent {
  /**
   * 生命周期方法:
   *
   * onShow(): void
   *
   * onHide(): void
   *
   * onResize(options: IMippWePage.IResizeOption): void
   */
  interface IPageLifetime extends Partial<WechatMiniprogram.Component.PageLifetimes> {}

  /**
   * Component中options类型声明
   */
  interface IOptions extends WechatMiniprogram.Component.ComponentOptions {}

  /**
   * Component中properties类型声明
   */
  interface IProperty extends WechatMiniprogram.Component.PropertyOption {}
}
