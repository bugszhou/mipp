/**
 * Event事件形参声明：
 *
 * 1. 通用类型
 *
 * 2. 点击类型
 *
 * 3. Input类型
 *
 */
declare namespace IMippWeEvent {
  interface IEvent extends WechatMiniprogram.Event {
    detail: any;
  }

  interface ITap extends WechatMiniprogram.TapEvent {}

  interface IInput extends WechatMiniprogram.InputEvent {}

  /**
   * change事件监听函数形参
   */
  interface IChange extends IEvent {
    detail: {
      value: string;
    };
    type: "change";
  }

  /**
   * 获取用户信息监听函数形参
   */
  interface IUserInfo extends IEvent {
    detail: WechatMiniprogram.GetUserInfoSuccessCallbackResult;
    type: "getUserInfo";
  }

  /**
   * 获取用户手机号监听函数形参
   */
  interface IGetPhoneNumber extends IEvent {
    detail: {
      /** 包括敏感数据在内的完整用户信息的加密数据，详见 [用户数据的签名验证和加解密]((signature#加密数据解密算法)) */
      encryptedData: string;
      /** 加密算法的初始向量，详见 [用户数据的签名验证和加解密]((signature#加密数据解密算法)) */
      iv: string;
      errMsg: string;
    };
    type: "getphonenumber";
  }
}
