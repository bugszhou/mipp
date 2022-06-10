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

export { observer, pageLifetime, lifetimes, method, MiniComponent };

export default {
  EmptyBase: MiniBase,
  PageBase: Base,
  MiniComponent,
  observer,
  pageLifetime,
  lifetimes,
  method,
};
