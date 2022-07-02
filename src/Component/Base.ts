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
  if (!UIInterface.methods) {
    UIInterface.methods = Object.create(null);
  }
  UIInterface.methods[methodName] = descriptor.value;
}

export function observer(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  if (!UIInterface.observers) {
    UIInterface.observers = Object.create(null);
  }
  UIInterface.observers[methodName] = descriptor.value;
}

export function pageLifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  if (!UIInterface.pageLifetimes) {
    UIInterface.pageLifetimes = Object.create(null);
  }
  UIInterface.pageLifetimes[methodName] = descriptor.value;
}

export function lifetimes(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  if (!UIInterface.lifetimes) {
    UIInterface.lifetimes = Object.create(null);
  }
  UIInterface.lifetimes[methodName] = descriptor.value;
}
