/**
 * 微信小程序公共类型声明
 */
declare namespace IMippWeCommon {
  /**
   * getApp的形参类型声明
   * @example getApp<T = IAnyObject>(opts?: IMippWeCommon.IGetAppOption): T;
   */
  interface IGetAppOption extends WechatMiniprogram.App.GetAppOption {}
}
