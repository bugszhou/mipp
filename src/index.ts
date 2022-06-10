import Base from "../dist/Page/Base";
import MiniBase from "./Page/MiniBase";
import {
  MiniComponent,
  method,
  observers,
  pageLifetime,
  lifetimes,
} from "./Component/Base";

export const PageBase = Base;

export const EmptyBase = MiniBase;

export { observers, pageLifetime, lifetimes, method, MiniComponent };

export default {
  EmptyBase: MiniBase,
  PageBase: Base,
  MiniComponent,
  observers,
  pageLifetime,
  lifetimes,
  method,
};
