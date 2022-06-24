import clone from "rfdc";

declare global {
  const Component: any;
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

    const delProperties = [
      ...(Array.isArray(obj.delProperties) ? obj.delProperties : []),
    ];

    delProperties.forEach((item) => {
      delete that[item];
    });

    try {
      if (typeof (that as any)?.props === "object") {
        (that as any).properties = (that as any)?.props;
        delete (that as any)?.props;
      }

      Object.keys((that as any)?.properties || {})
        .filter((property) =>
          Array.isArray((that as any)?.properties[property])
        )
        .forEach((property) => {
          (that as any).properties[property] = {
            type: Array,
            value: (that as any)?.properties[property],
          };
        });
    } catch (e) {
      console.error(e);
    }

    const _that: any = that;
    if (!_that?.methods) {
      _that.methods = Object.create(null);
    }

    _that.methods.setDataAsync = _that.setDataAsync;
    delete _that.setDataAsync;

    try {
      Object.keys(_that.methods).forEach((keyName) => {
        delete _that[keyName];
      });
      delete _that.delProperties;
    } catch (e) {
      console.error(e);
    }

    return that;
  }

  static Component(ins: MiniComponent) {
    MiniComponent.render(ins)
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
