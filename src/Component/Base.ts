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

  constructor() {
    return MiniComponent.serialize(this);
  }

  static serialize<T extends MiniComponent<any>>(obj: T): any {
    const that = clone({ proto: true })(obj);

    const delProperties = [
      ...(Array.isArray(obj.delProperties) ? obj.delProperties : []),
    ];

    delProperties.forEach((item) => {
      delete that[item];
    });

    return that;
  }

  static Component(componentIns: MiniComponent) {
    Component(componentIns);
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

export function observers(
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
