import Base from "../dist/Page/Base";
import MiniBase from "./Page/MiniBase";
import {
  MiniComponent,
  method,
  observer,
  pageLifetime,
  lifetimes,
  lifetime,
  extendLifetime,
} from "./Component/Base";

export const PageBase = Base;

export const EmptyBase = MiniBase;

export {
  observer,
  pageLifetime,
  lifetimes,
  lifetime,
  extendLifetime,
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
  lifetime,
  extendLifetime,
  method,
};
