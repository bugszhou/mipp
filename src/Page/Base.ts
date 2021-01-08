export default class Base<IData> {
  /**
   * 页面名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }

  data = {};

  options = {};
}
