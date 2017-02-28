/** @jsx h */
import Preact, { h, render, Component } from 'preact';
import Touch from '../src/pindex';

const rootNode = document.getElementById('root');

class Test extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			result: '',
		};
		
		this.say = this.say.bind(this);
		this.swipe = this.swipe.bind(this);
	}

	say(text) {
		return (e) => {
			this.setState({
				result: text,
			});
		}
	}

	swipe(direction) {
		return (e) => {
			this.setState({
				result: `swipe ${direction}`,
			});
		}
	}

    render() {
        return (
        	<div>
        		<p className="result">log: {this.state.result}</p>
	        	<Touch onTap={this.say('hello')}>
		        	<button>Hello! Tap/Click me!</button>
		        </Touch>
		        <Touch onLongTap={this.say('helloooooooooooo')}>
		        	<button>Hello! Long Tap me!</button>
		        </Touch>
		        <Touch onDoubleTap={this.say('hello hello')}>
		        	<button>Hello! Double Tap me!</button>
		        </Touch>
		        <Touch className="swipe"
		        	onSwipeLeft={this.swipe('left')}
		        	onSwipeRight={this.swipe('right')}
		        	onSwipeUp={this.swipe('up')}
		        	onSwipeDown={this.swipe('down')}
		        >
		        	Swipe me!
		        </Touch>
	        </div>
	    );
    }
}

render(<Test />, rootNode);