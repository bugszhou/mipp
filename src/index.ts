import Base from "../dist/Page/Base";
import Component from "../dist/Component/Base";

export const PageBase = Base;
export const ComponentBase = Component;

class MiniBase {}

export default {
  MiniBase,
  PageBase: Base,
  ComponentBase: Component,
};
