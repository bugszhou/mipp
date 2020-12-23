/**
 * App()相关的类型声明：
 * 
 * 1. 生命周期方法声明(ILifetime)
 * 
 * 2. 生命周期函数形参类型声明
 * 
 */
declare namespace IMippWeApp {
  /**
   * 生命周期方法:
   * 
   * onLaunch(options: ILaunchOption): void
   * 
   * onShow(options: ILaunchOption): void
   * 
   * onHide(): void
   * 
   * onError(error: string): void // 错误信息，包含堆栈
   * 
   * onPageNotFound(options: PageNotFoundOption): void
   * 
   * onUnhandledRejection(result: OnUnhandledRejectionCallbackResult) => void
   * 
   * onThemeChange(result: OnThemeChangeCallbackResult) => void
   * 
   */
  interface ILifetime extends Partial<WechatMiniprogram.App.Option> {}

  /**
   * 形参声明
   * 
   * App中onLaunch和onShow事件的形参接口声明
   * @example onLaunch(options: ILaunchOption): void
   * @example onShow(options: ILaunchOption): void
   */
  interface ILaunchOption extends WechatMiniprogram.App.LaunchShowOption {}

  /**
   * 形参声明
   * 
   * App中onPageNotFound事件的形参接口声明
   * @example onPageNotFound(options: PageNotFoundOption): void
   */
  interface IPageNotFoundOption extends WechatMiniprogram.App.PageNotFoundOption {}

  /**
   * 形参声明
   * 
   * App中未处理的 Promise 拒绝事件的形参接口声明
   * @example onUnhandledRejection(result: OnUnhandledRejectionCallbackResult) => void
   */
  interface IOnUnhandledRejectionCallbackResult extends WechatMiniprogram.OnUnhandledRejectionCallbackResult {}

  /**
   * 形参声明
   * 
   * App中监听系统主题改变事件(onThemeChange)事件的形参接口声明
   * @example (result: OnThemeChangeCallbackResult) => void
   */
  interface OnThemeChangeCallbackResult extends WechatMiniprogram.OnThemeChangeCallbackResult {}
}