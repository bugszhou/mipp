import rfdc from "rfdc";
import clone from "rfdc";

declare global {
  const Component: any;
}

function isPlainObject(val: any): val is Record<string, any> {
  if (
    val === null ||
    Object.prototype.toString.call(val) !== "[object Object]"
  ) {
    return false;
  }
  const prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

export default class Base<IData> {
  /**
   * 组件名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }

  data = {};
}

export type IComponentData<
  IProps,
  IData = Record<string, any>
> = (IProps extends { properties: any }
  ? Partial<{
      [key in keyof IProps["properties"]]: IProps["properties"][key]["value"];
    }>
  : unknown) &
  IData;

export class MiniComponent<IData = IComponentData<any>> {
  data: IData = Object.create(null);

  viewStatus: "load" | "ready" = "load";

  private delProperties = ["constructor"];

  setDataAsync(data: Partial<IData>) {
    return new Promise((resolve) => {
      (this as any).setData(data, () => {
        resolve(void 0);
      });
    });
  }

  static serialize<T extends MiniComponent<any>>(obj: T): any {
    const that = clone({ proto: true })(obj);

    const _that: any = that;

    const delProperties = [
      ...(Array.isArray(obj.delProperties) ? obj.delProperties : []),
    ];

    delProperties.forEach((item) => {
      delete that[item];
    });

    try {
      if (typeof _that?.props === "object") {
        _that.properties = _that?.props;
        delete _that?.props;
      }

      Object.keys(_that?.properties || {}).forEach((property) => {
        const val = _that?.properties?.[property];

        if (typeof val === "undefined") {
          delete _that?.properties?.[property];
          return;
        }

        if (typeof val === "string") {
          _that.properties[property] = {
            type: String,
            value: val,
          };
          return;
        }

        if (typeof val === "number") {
          _that.properties[property] = {
            type: Number,
            value: val,
          };
          return;
        }

        if (typeof val === "boolean") {
          _that.properties[property] = {
            type: Boolean,
            value: val,
          };
          return;
        }

        if (Array.isArray(val)) {
          _that.properties[property] = {
            type: Array,
            value: _that?.properties[property],
          };
          return;
        }

        if (isPlainObject(val) || val === null) {
          const defaultType = _that.properties[property]?.type;
          const defaultValue = _that.properties[property]?.value;
          const safeValue =
            defaultValue ||
            defaultValue === null ||
            defaultValue === "" ||
            defaultValue === 0 ||
            defaultValue === false
              ? defaultValue
              : Object.create(null);
          _that.properties[property] = {
            type: typeof defaultType === "function" ? defaultType : Object,
            value: typeof defaultType === "function" ? safeValue : val,
          };
          return;
        }
      });
    } catch (e) {
      console.error(e);
    }

    if (!_that?.methods) {
      _that.methods = Object.create(null);
    }

    _that.methods.setDataAsync = _that.setDataAsync;
    delete _that.setDataAsync;

    if (!_that?.lifetimes) {
      _that.lifetimes = Object.create(null);
    }

    const createdFn = _that?.lifetimes?.created || _that?.created;
    _that.lifetimes.created = function created(...opts: any) {
      try {
        this.viewStatus = "load";
      } catch {}
      return createdFn?.apply?.(this, opts);
    };

    const readyFn = _that?.lifetimes?.ready || _that?.ready;
    _that.lifetimes.ready = function ready(...opts: any) {
      try {
        if (this.viewStatus !== "ready") {
          this.viewStatus = "ready";
        }
      } catch {}
      return readyFn?.apply?.(this, opts);
    };

    try {
      [
        ...Object.keys(_that.methods),
        ...Object.keys(_that?.pageLifetimes || {}),
        ...Object.keys(_that?.observers || {}),
        ...Object.keys(_that?.lifetimes || {}),
      ].forEach((keyName) => {
        delete _that[keyName];
      });
      delete _that.delProperties;
    } catch (e) {
      console.error(e);
    }

    return that;
  }

  static Component(ins: MiniComponent) {
    MiniComponent.render(ins);
  }

  static render(ins: MiniComponent) {
    Component(MiniComponent.serialize(ins));
  }
}

export function method(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const methods = rfdc()(UIInterface?.methods ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("methods")) {
    UIInterface.methods = Object.create(null);
  }
  UIInterface.methods = {
    ...UIInterface.methods,
    ...(methods ?? Object.create(null)),
  };
  UIInterface.methods[methodName] = descriptor.value;
}

export function observer(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const observers = rfdc()(UIInterface?.observers ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("observers")) {
    UIInterface.observers = Object.create(null);
  }
  UIInterface.observers = {
    ...UIInterface.observers,
    ...(observers ?? Object.create(null)),
  };
  UIInterface.observers[methodName] = descriptor.value;
}

export function pageLifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const pageLifetimes = rfdc()(
    UIInterface?.pageLifetimes ?? Object.create(null)
  );

  if (!UIInterface.hasOwnProperty("pageLifetimes")) {
    UIInterface.pageLifetimes = Object.create(null);
  }
  UIInterface.pageLifetimes = {
    ...UIInterface.pageLifetimes,
    ...(pageLifetimes ?? Object.create(null)),
  };
  UIInterface.pageLifetimes[methodName] = descriptor.value;
}

export function lifetimes(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const lifetimes = rfdc()(UIInterface?.lifetimes ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("lifetimes")) {
    UIInterface.lifetimes = Object.create(null);
  }
  UIInterface.lifetimes = {
    ...UIInterface.lifetimes,
    ...(lifetimes ?? Object.create(null)),
  };

  const base = Object.getPrototypeOf(UIInterface);

  const fn = descriptor.value;

  UIInterface.lifetimes[methodName] = async function lifetimesFn(...opts) {
    if (typeof base?.created === "function") {
      // 为什么手动执行一次created
      await base.created.apply(this, opts);
    }
    await fn.apply(this, opts);
  };
}

export function lifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const lifetimes = rfdc()(UIInterface?.lifetimes ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("lifetimes")) {
    UIInterface.lifetimes = Object.create(null);
  }
  UIInterface.lifetimes = {
    ...UIInterface.lifetimes,
    ...(lifetimes ?? Object.create(null)),
  };
  UIInterface.lifetimes[methodName] = descriptor.value;
}

export function extendLifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const lifetimes = rfdc()(UIInterface?.lifetimes ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("lifetimes")) {
    UIInterface.lifetimes = Object.create(null);
  }
  UIInterface.lifetimes = {
    ...UIInterface.lifetimes,
    ...(lifetimes ?? Object.create(null)),
  };
  const beforeFn = UIInterface.lifetimes[methodName];
  const fn = descriptor.value;

  UIInterface.lifetimes[methodName] = function newLifetime(...opts) {
    const that = this;

    const currentResult = fn?.apply?.(that, opts);

    if (
      typeof currentResult === "object" &&
      typeof currentResult?.then === "function"
    ) {
      return (async function runLifetimes() {
        await currentResult;
        return await beforeFn?.apply?.(that, opts);
      })();
    }

    return beforeFn?.apply?.(that, opts);
  };
}
