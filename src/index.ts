import Base from "../dist/Page/Base";
import MiniBase from "./Page/MiniBase";
import Component, {
  method,
  observers,
  pageLifetime,
  lifetimes,
} from "../dist/Component/Base";

export const PageBase = Base;
export const MiniComponent = Component;

export const EmptyBase = MiniBase;

export { observers, pageLifetime, lifetimes, method };

export default {
  EmptyBase: MiniBase,
  PageBase: Base,
  MiniComponent,
  observers,
  pageLifetime,
  lifetimes,
  method,
};
