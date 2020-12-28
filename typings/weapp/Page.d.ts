/**
 * Page()相关的类型声明：
 * 
 * 1. 生命周期方法声明(ILifetime)
 * 
 * 2. 生命周期函数形参类型声明
 * 
 * 3. 分享返回值声明(ICustomShareContent)
 * 
 * 4. 返回值类型
 */
declare namespace IMippWePage {
  /**
   * 生命周期方法:
   * 
   * onLoad(query: any)
   * 
   * onShow(): void
   * 
   * onReady(): void
   * 
   * onHide(): void
   * 
   * onUnload(): void
   * 
   * onPullDownRefresh(): void
   * 
   * onReachBottom(): void
   * 
   * onShareAppMessage(options: IMippWePage.IShareAppMessageOption): IMippWePage.ICustomShareContent | void
   * 
   * onPageScroll(options: IMippWePage.IPageScrollOption): void
   * 
   * onTabItemTap(options: IMippWePage.ITabItemTapOption): void
   * 
   * onResize(options: IMippWePage.IResizeOption): void
   * 
   * onAddToFavorites(options: IMippWePage.IAddToFavoritesOption): IMippWePage.IAddToFavoritesContent
   */
  interface ILifetime extends Partial<WechatMiniprogram.Page.ILifetime> {}

  /**
   * 形参声明
   * 
   * 转发监听事件的形参接口声明
   * @example onShareAppMessage(options: IShareAppMessageOption): ICustomShareContent | void
   */
  interface IShareAppMessageOption extends WechatMiniprogram.Page.IShareAppMessageOption {}

  /**
   * 形参声明
   * 
   * 在Page中监听页面滚动事件(onPageScroll)的形参接口声明
   * @example onPageScroll(options: IPageScrollOption): void
   */
  interface IPageScrollOption extends WechatMiniprogram.Page.IPageScrollOption {}

  /**
   * 形参声明
   * 
   * 在Page中监听tab栏点击事件(onTabItemTap)的形参接口声明
   * @example onTabItemTap(options: ITabItemTapOption): void
   */
  interface ITabItemTapOption extends WechatMiniprogram.Page.ITabItemTapOption {}

  /**
   * 形参声明
   * 
   * 在Page中监听页面尺寸发生变化事件(onResize)的形参接口声明
   * @example onResize(options: IResizeOption): void
   */
  interface IResizeOption extends WechatMiniprogram.Page.IResizeOption {}

  /**
   * 形参声明
   * 
   * 在Page中监听用户点击右上角菜单“收藏”按钮的行为事件(onAddToFavorites)的形参接口声明
   * @example onAddToFavorites(options: IAddToFavoritesOption): IAddToFavoritesContent
   */
  interface IAddToFavoritesOption extends WechatMiniprogram.Page.IAddToFavoritesOption {}

  /**
   * 返回值声明
   * 
   * 在Page中监听用户点击右上角菜单“收藏”按钮的行为事件(onAddToFavorites)的返回值接口声明
   * @example onAddToFavorites(options: IAddToFavoritesOption): IAddToFavoritesContent
   */
  interface IAddToFavoritesContent extends WechatMiniprogram.Page.IAddToFavoritesContent {}

  /**
   * 返回值声明
   * 
   * 分享返回值类型声明
   * @example onShareAppMessage(options: IShareAppMessageOption): ICustomShareContent | void
   */
  interface ICustomShareContent extends Partial<WechatMiniprogram.Page.ICustomShareContent> {}
}
