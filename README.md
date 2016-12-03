# react-touch-component
react mobile touch component

# Usage

```js
import Touch from 'touch';

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
      <div>tap me</div>
    </Touch>
  }
}
```
