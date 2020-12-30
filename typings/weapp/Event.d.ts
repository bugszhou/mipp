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
  interface IEvent extends WechatMiniprogram.Event {}

  interface ITap extends WechatMiniprogram.TapEvent {}

  interface IInput extends WechatMiniprogram.InputEvent {}

  /**
   * change事件监听函数形参
   */
  interface IChange extends IEvent {
    detail: {
      value: string | number;
    };
    type: "change";
  }
}
