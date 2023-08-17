import clone from "rfdc";

declare global {
  const Page: any;
}

export default class Base<IData = any> {
  /**
   * 页面名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }

  data = {};

  setDataAsync(data: Partial<IData>) {
    return new Promise((resolve) => {
      (this as any).setData(data, () => {
        resolve(void 0);
      });
    });
  }

  private delProperties = ["constructor"];

  static before(): Partial<{
    onLoad: () => void;
    onShow: () => void;
    onReady: () => void;
  }> {
    return Object.create(null);
  }

  static serialize<T extends Base<any>>(obj: T): any {
    const that: any = clone({ proto: true })(obj);

    const delProperties = [
      ...(Array.isArray(obj.delProperties) ? obj.delProperties : []),
    ];

    delProperties.forEach((item) => {
      delete that[item];
    });

    const beforeObj = Base?.before?.();

    const createdFn = that?.onLoad;
    that.onLoad = function created(...opts: any) {
      try {
        this.viewStatus = "load";
        beforeObj?.onLoad?.apply(this, opts);
        this?.beforeOnLoad?.(...opts);
      } catch {}
      return createdFn?.apply?.(this, opts);
    };

    const readyFn = that?.onReady;
    that.onReady = function ready(...opts: any) {
      try {
        if (this.viewStatus !== "ready") {
          this.viewStatus = "ready";
        }
        beforeObj?.onReady?.apply(this, opts);
      } catch {}
      return readyFn?.apply?.(this, opts);
    };

    const showFn = that?.onShow;
    that.onShow = function show(...opts: any) {
      try {
        beforeObj?.onShow?.apply(this, opts);
      } catch {}
      return showFn?.apply?.(this, opts);
    };

    return that;
  }

  static render<IData = any>(ins: Base<IData>) {
    Page(Base.serialize(ins));
  }
}
