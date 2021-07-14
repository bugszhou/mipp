import Base from "../dist/Page/Base";
import Component from "../dist/Component/Base";

export const PageBase = Base;
export const ComponentBase = Component;

export class MiniBase {
  /**
   * 页面名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }
}

export default {
  MiniBase,
  PageBase: Base,
  ComponentBase: Component,
};
