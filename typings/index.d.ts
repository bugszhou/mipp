export default class Mipp<IData> {
  public get componentName(): string;
  data: any;
  options: any;
  readonly delProperties: string[];
  customerProperties: string[];
  setData(opts: Partial<IData>, callback?: () => any): void;
}

export class PageBase<IData> {
  public get componentName(): string;
  data: any;
  options: any;
  readonly delProperties: string[];
  customerProperties: string[];
  setData(opts: Partial<IData>, callback?: () => any): void;
}
