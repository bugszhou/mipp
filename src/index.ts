import Base from "../dist/Page/Base";
import MiniBase from "./Page/MiniBase";
import Component from "../dist/Component/Base";

export const PageBase = Base;
export const ComponentBase = Component;

export const EmptyBase = MiniBase;

export default {
  EmptyBase: MiniBase,
  PageBase: Base,
  ComponentBase: Component,
};
