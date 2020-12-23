/// <reference path="./weapp/index.d.ts" />
import "weapp-api-typings";

declare class PageBase<IData extends Record<string, any>> {
  constructor(options?: any);

  get componentName(): string;
  data: any;
  options: any;
  readonly delProperties: string[];
  customerProperties: string[];
  setData(opts: Partial<IData>, callback?: () => any): void;
}
