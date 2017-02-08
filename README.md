react-touch-component
==========

基于zepto touch封装的React Component

onTap事件兼容PC使用

Base on zepto touch lib.

onTap event also works with PC as well.


Supported Events
----------

```js
onTap onSingleTap onDoubleTap onLongTap
onSwipe onSwipeUp onSwipeRight onSwipeDown onSwipeLeft
```


Installation
----------

```
$ npm install react-touch-component --save
```


Usage
----------

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


Changelog
----------

- `v1.0.0` (2017/2/8) 初版