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
      this.viewStatus = "load";
      let isError = false;

      try {
        beforeObj?.onLoad?.apply(this, opts);
      } catch (e) {
        console.error(e);
        isError = true;
      }

      if (isError) {
        return;
      }

      isError = false;

      try {
        this?.beforeOnLoad?.(...opts);
      } catch (e) {
        console.error(e);
      }
      return createdFn?.apply?.(this, opts);
    };

    const readyFn = that?.onReady;
    that.onReady = function ready(...opts: any) {
      try {
        if (this.viewStatus !== "ready") {
          this.viewStatus = "ready";
        }
      } catch {}

      let isError = false;

      try {
        beforeObj?.onReady?.apply(this, opts);
      } catch (e) {
        console.error(e);
        isError = true;
      }

      if (isError) {
        return;
      }

      isError = false;

      return readyFn?.apply?.(this, opts);
    };

    const showFn = that?.onShow;
    that.onShow = function show(...opts: any) {
      let isError = false;

      try {
        beforeObj?.onShow?.apply(this, opts);
      } catch (e) {
        console.error(e);
        isError = true;
      }

      if (isError) {
        return;
      }

      isError = false;

      return showFn?.apply?.(this, opts);
    };

    return that;
  }

  static render<IData = any>(ins: Base<IData>) {
    Page(Base.serialize(ins));
  }
}
