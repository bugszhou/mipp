import Base from "../dist/Page/Base";
import MiniBase from "./Page/MiniBase";
import {
  MiniComponent,
  method,
  observer,
  pageLifetime,
  lifetimes,
} from "./Component/Base";

export const PageBase = Base;

export const EmptyBase = MiniBase;

export {
  observer,
  pageLifetime,
  lifetimes,
  method,
  MiniComponent,
  MiniComponent as ComponentBase,
};

export default {
  EmptyBase: MiniBase,
  PageBase: Base,
  MiniComponent,
  ComponentBase: MiniComponent,
  observer,
  pageLifetime,
  lifetimes,
  method,
};
