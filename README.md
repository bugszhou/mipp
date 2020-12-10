# Mipp

小程序 typescript 基类

## Installation

使用 class 风格时，小程序继承的父类

## Import

Import `PageBase`:

```javascript
import { PageBase } from "mipp";
```

or import all:

```javascript
import Mipp from "mipp";
```

## Api

- PageBase<IData>

## Interface

- IMippWe.IPageLifetime

### `PageBase`

逻辑页面的父类，所有页面都需要继承该父类；

#### `<IData>`

是页面渲染的数据类或 interface，即`data`中所包含的数据或者 interface

#### Example

```javascript
class Data {
  username = "";
}

class Index extends PageBase<Data> implements IMippWe.IPageLifetime {
  data = new Data();
  constructor () {
    this.setData(new Data());
  }

  onLoad(): void {
    console.log("onLoad", this);
  }
}
```

### `IMippWe.IPageLifetime`

小程序生命周期函数的 interface

```txt
{
  onLoad
  onShow
  onReady
  onHide
  onUnload
  onPullDownRefresh
  onReachBottom
  onShareAppMessage
  onPageScroll
  onTabItemTap
  onResize
  onAddToFavorites
}
```

#### Example

```javascript
interface IData {
  username: string;
}

class Index extends PageBase<IData> implements IMippWe.IPageLifetime {
  data: IData = {
    username: "",
  };

  onLoad(): void {
    console.log("onLoad", this);
  }
}
```
