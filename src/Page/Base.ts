export default class Base<IData> {
  /**
   * 页面名称，注意唯一性
   */
  get componentName(): string {
    return "Base";
  }

  data = {};

  options = {};

  private delProperties = ["options", "setData", "nextTick"];

  // 子类自定义配置序列化需要删除的属性名
  customerProperties: string[] = [];

  constructor() {
    return Base.serialize(this);
  }

  setData(opts?: Partial<IData>, callback?: () => any): void {
    if (opts) {
      //
    }
  }

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
