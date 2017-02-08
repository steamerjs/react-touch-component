'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ua = navigator.userAgent.toLowerCase();
var _platform = function _platform(os) {
	var ver = ('' + (new RegExp(os + '(\\d+((\\.|_)\\d+)*)').exec(ua) || [, 0])[1]).replace(/_/g, '.');
	// undefined < 3 === false, but null < 3 === true
	return parseFloat(ver) || undefined;
};
var os = {
	ios: _platform('os '),
	android: _platform('android[/ ]'),
	pc: !_platform('os ') && !_platform('android[/ ]')
};

var Touch = function (_Component) {
	_inherits(Touch, _Component);

	function Touch(props, context) {
		_classCallCheck(this, Touch);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

		_this.state = {};

		_this.touchInfo = {
			x: null,
			y: null,
			x2: null,
			y2: null,
			start: 0,
			last: 0,
			isDoubleTap: false,
			touchTimeout: null,
			tapTimeout: null,
			swipeTimeout: null,
			longTapTimeout: null
		};

		_this.devicePixelRatio = window.devicePixelRatio || 1;

		_this.longTapDelay = 750;
		_this.maxTapAbsX = 30;
		_this.maxTapAbsY = os.android ? 5 : 30;

		_this.getDefaultTouchInfo = _this.getDefaultTouchInfo.bind(_this);
		_this.longTap = _this.longTap.bind(_this);
		_this.cancelLongTap = _this.cancelLongTap.bind(_this);
		_this.cancelAll = _this.cancelAll.bind(_this);

		_this.calculatePos = _this.calculatePos.bind(_this);
		_this.touchStart = _this.touchStart.bind(_this);
		_this.touchMove = _this.touchMove.bind(_this);
		_this.touchEnd = _this.touchEnd.bind(_this);
		return _this;
	}

	Touch.prototype.componentWillReceiveProps = function componentWillReceiveProps() {};

	Touch.prototype.componentDidMount = function componentDidMount() {
		window.addEventListener('scroll', this.cancelAll, false);
	};

	Touch.prototype.componentWillUnmount = function componentWillUnmount() {
		window.removeEventListener('scroll', this.cancelAll, false);
	};

	Touch.prototype.getDefaultTouchInfo = function getDefaultTouchInfo() {
		return {
			x: null,
			y: null,
			x2: null,
			y2: null,
			start: 0,
			last: 0,
			isDoubleTap: false,
			touchTimeout: null,
			tapTimeout: null,
			swipeTimeout: null,
			longTapTimeout: null
		};
	};

	Touch.prototype.longTap = function longTap() {
		this.touchInfo.longTapTimeout = null;

		if (this.touchInfo.last) {
			this.props.onLongTap && this.props.onLongTap();
			this.touchInfo = this.getDefaultTouchInfo();
		}
	};

	Touch.prototype.cancelLongTap = function cancelLongTap() {
		this.touchInfo.longTapTimeout && clearTimeout(this.touchInfo.longTapTimeout);

		this.touchInfo.longTapTimeout = null;
	};

	Touch.prototype.cancelAll = function cancelAll() {
		this.touchInfo.touchTimeout && clearTimeout(this.touchInfo.touchTimeout);
		this.touchInfo.tapTimeout && clearTimeout(this.touchInfo.tapTimeout);
		this.touchInfo.swipeTimeout && clearTimeout(this.touchInfo.swipeTimeout);
		this.touchInfo.longTapTimeout && clearTimeout(this.touchInfo.longTapTimeout);

		this.touchInfo = this.getDefaultTouchInfo();
	};

	Touch.prototype.calculatePos = function calculatePos(e) {
		var x = e ? e.touches[0].pageX : this.touchInfo.x2;
		var y = e ? e.touches[0].pageY : this.touchInfo.y2;

		if (x === null && y === null) {
			return {
				deltaX: 0,
				deltaY: 0,
				absX: 0,
				absY: 0
			};
		}

		var xd = this.touchInfo.x - x;
		var yd = this.touchInfo.y - y;

		var axd = Math.abs(xd);
		var ayd = Math.abs(yd);

		return {
			deltaX: xd,
			deltaY: yd,
			absX: axd,
			absY: ayd
		};
	};

	Touch.prototype.touchStart = function touchStart(e) {
		if (e.touches.length > 1) {
			return;
		}

		var firstTouch = e.touches[0];

		if (e.touches && e.touches.length === 1 && this.touchInfo.x2) {
			// Clear out touch movement data if we have it sticking around
			// This can occur if touchcancel doesn't fire due to preventDefault, etc.
			(0, _objectAssign2.default)(this.touchInfo, {
				x2: null,
				y2: null
			});
		}

		var now = Date.now(),
		    delta = now - (this.touchInfo.last || now);

		this.touchInfo.touchTimeout && clearTimeout(this.touchInfo.touchTimeout);

		if (delta > 0 && delta <= 250) {
			(0, _objectAssign2.default)(this.touchInfo, {
				isDoubleTap: true
			});
		}

		(0, _objectAssign2.default)(this.touchInfo, {
			start: now,
			last: now,
			x: firstTouch.pageX,
			y: firstTouch.pageY,
			longTapTimeout: setTimeout(this.longTap, this.longTapDelay)
		});
	};

	Touch.prototype.touchMove = function touchMove(e) {
		this.cancelLongTap();

		(0, _objectAssign2.default)(this.touchInfo, {
			x2: e.touches[0].pageX,
			y2: e.touches[0].pageY
		});

		var pos = this.calculatePos(e);

		if (pos.absX > Math.round(20 / this.devicePixelRatio) && pos.absX > pos.absY) {
			e.preventDefault();
		}
	};

	Touch.prototype.touchEnd = function touchEnd(e) {
		var _this2 = this;

		this.cancelLongTap();

		var pos = this.calculatePos();

		// swipe
		if (this.touchInfo.x2 && pos.absX > this.maxTapAbsX || this.touchInfo.y2 && pos.absY > this.maxTapAbsY) {
			(function () {
				var time = Date.now() - _this2.touchInfo.start,
				    velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time,
				    isFlick = velocity > _this2.props.flickThreshold;

				e.persist();
				(0, _objectAssign2.default)(_this2.touchInfo, {
					swipeTimeout: setTimeout(function () {
						_this2.props.onSwipe && _this2.props.onSwipe(e, pos.deltaX, pos.deltaY, isFlick);

						if (pos.absX > pos.absY) {
							if (pos.deltaX > 0) {
								_this2.props.onSwipeLeft && _this2.props.onSwipeLeft(e, pos.deltaX, isFlick);
							} else {
								_this2.props.onSwipeRight && _this2.props.onSwipeRight(e, pos.deltaX, isFlick);
							}
						} else {
							if (pos.deltaY > 0) {
								_this2.props.onSwipeUp && _this2.props.onSwipeUp(e, pos.deltaY, isFlick);
							} else {
								_this2.props.onSwipeDown && _this2.props.onSwipeDown(e, pos.deltaY, isFlick);
							}
						}

						_this2.touchInfo = _this2.getDefaultTouchInfo();
					}, 0)
				});
			})();
		}
		// normal tap
		else if (this.touchInfo.last) {
				// don't fire tap when delta position changed by more than 30 pixels,
				// for instance when moving to a point and back to origin
				if (pos.absX < this.maxTapAbsX && pos.absY < this.maxTapAbsY) {
					// delay by one tick so we can cancel the 'tap' event if 'scroll' fires
					// ('tap' fires before 'scroll')
					e.persist();
					(0, _objectAssign2.default)(this.touchInfo, {
						tapTimeout: setTimeout(function () {
							// trigger universal 'tap' with the option to cancelTouch()
							// (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
							_this2.props.onTap && _this2.props.onTap(e);

							// trigger double tap immediately
							if (_this2.touchInfo.isDoubleTap) {
								_this2.props.onDoubleTap && _this2.props.onDoubleTap(e);
								_this2.touchInfo = _this2.getDefaultTouchInfo();
							}

							// trigger single tap after 250ms of inactivity
							else {
									(0, _objectAssign2.default)(_this2.touchInfo, {
										touchTimeout: setTimeout(function () {
											(0, _objectAssign2.default)(_this2.touchInfo, {
												touchTimeout: null
											});
											_this2.props.onSingleTap && _this2.props.onSingleTap(e);
											_this2.touchInfo = _this2.getDefaultTouchInfo();
										}, 250)
									});
								}
						}, 0)
					});
				} else {
					this.touchInfo = this.getDefaultTouchInfo();
				}
			}
	};

	Touch.prototype.render = function render() {
		var _props = this.props,
		    onTap = _props.onTap,
		    onSingleTap = _props.onSingleTap,
		    onDoubleTap = _props.onDoubleTap,
		    onLongTap = _props.onLongTap,
		    onSwipe = _props.onSwipe,
		    onSwipeUp = _props.onSwipeUp,
		    onSwipeRight = _props.onSwipeRight,
		    onSwipeDown = _props.onSwipeDown,
		    onSwipeLeft = _props.onSwipeLeft,
		    flickThreshold = _props.flickThreshold,
		    passThroughProps = _objectWithoutProperties(_props, ['onTap', 'onSingleTap', 'onDoubleTap', 'onLongTap', 'onSwipe', 'onSwipeUp', 'onSwipeRight', 'onSwipeDown', 'onSwipeLeft', 'flickThreshold']);

		if (os.pc) {
			return _react2.default.createElement(
				'div',
				_extends({}, passThroughProps, {
					onClick: onTap }),
				this.props.children
			);
		}

		return _react2.default.createElement(
			'div',
			_extends({}, passThroughProps, {
				onTouchStart: this.touchStart,
				onTouchMove: this.touchMove,
				onTouchEnd: this.touchEnd,
				onTouchCancel: this.cancelAll }),
			this.props.children
		);
	};

	return Touch;
}(_react.Component);

exports.default = Touch;


Touch.propTypes = {
	onTap: _react.PropTypes.func,
	onSingleTap: _react.PropTypes.func,
	onDoubleTap: _react.PropTypes.func,
	onLongTap: _react.PropTypes.func,
	onSwipe: _react.PropTypes.func,
	onSwipeUp: _react.PropTypes.func,
	onSwipeRight: _react.PropTypes.func,
	onSwipeDown: _react.PropTypes.func,
	onSwipeLeft: _react.PropTypes.func
};
Touch.defaultProps = {
	flickThreshold: 0.6
};