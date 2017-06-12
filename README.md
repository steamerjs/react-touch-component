react-touch-component
==========

[![NPM Version](https://img.shields.io/npm/v/react-touch-component.svg?style=flat)](https://www.npmjs.com/package/react-touch-component)

借鉴zepto touch封装的React Component

onTap事件兼容PC使用

Base on zepto touch lib.

onTap event also works with PC as well.


Supported Events
----------

- onTap
- onSingleTap
- onDoubleTap
- onLongTap
- onSwipe
- onSwipeUp
- onSwipeRight
- onSwipeDown
- onSwipeLeft


Installation
----------

```
$ npm install react-touch-component --save
```


Usage
----------
React 版本

```js
import Touch from 'react-touch-component';

export default class Demo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.handleTap = this.handleTap.bind(this);
  }
  
  handleTap() {
    console.log('tap!');
  }
  
  render() {
    <Touch onTap={this.handleTap}>
      <button>Tap me</button>
    </Touch>
  }
}
```

Preact版本
```js
import Touch from 'react-touch-component/pindex';

```


Changelog
----------

- `v1.1.1` (2017/6/12) 兼容React v15.5后的版本
- `v1.1.0` (2017/2/28) 新增preact版本
- `v1.0.1` (2017/2/22) 兼容Node环境，防止脚本报错
- `v1.0.0` (2017/2/8) 初版