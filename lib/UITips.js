'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 直播PC Tips弹框组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// TODO 这里需要构建支持下
require('./css/index.less');

var defaultState = {
	show: false, // 是否显示
	title: '', // 标题
	content: '', // 内容
	confirmText: '确定', // 确认的执行方法
	onConfirm: null };

var UITips = function (_Component) {
	_inherits(UITips, _Component);

	function UITips(props, context) {
		_classCallCheck(this, UITips);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

		_this.state = {
			show: false
		};

		_this.show = _this.show.bind(_this);
		_this.hide = _this.hide.bind(_this);
		_this.handleConfirm = _this.handleConfirm.bind(_this);
		_this.handleCancel = _this.handleCancel.bind(_this);
		return _this;
	}

	/**
  * 生成UITips React Component实例的静态方法
  * @param  {Object} props UITips props
  * @return {Object}       UITips实例对象
  */


	UITips.createUITipsInstance = function createUITipsInstance(props) {
		var _props = props || {};

		// TODO 可以选择使用外部传递的element作为root
		var rootEl = document.createElement('div');
		document.body.appendChild(rootEl);

		// <UITips /> React Component
		var uiTips = void 0;
		_reactDom2.default.render(_react2.default.createElement(UITips, _extends({}, _props, {
			ref: function ref(_uiTips) {
				// 获取render后的React Component
				uiTips = _uiTips;
			}
		})), rootEl);

		return {
			// UITips React Component
			component: uiTips,

			/**
    * 生成UITips内容并展示
    * @param  {Object} tipsProps 给UITips用的state数据
    */
			tips: function tips(tipsProps) {
				uiTips.show(tipsProps);
			},


			/**
    * 隐藏UITips
    */
			hideTips: function hideTips() {
				uiTips.hide();
			},


			/**
    * 销毁生成的React Component
    * 移除React component，移除react event、state，去掉DOM节点
    */
			destroy: function destroy() {
				_reactDom2.default.unmountComponentAtNode(rootEl);
				document.body.removeChild(rootEl);
			}
		};
	};

	/**
  * 展示UITips，多次调用只用最新的
  * @param  {Object} tipsProps {title, content, confirmText, onConfirm} 字段解释见defaultState
  */


	UITips.prototype.show = function show(tipsProps) {
		this.setState((0, _objectAssign2.default)({}, defaultState, tipsProps, { show: true }));
	};

	/**
  * 隐藏UITips
  */


	UITips.prototype.hide = function hide() {
		this.setState({ show: false });
	};

	/**
  * 确认按钮点击事件，默认隐藏UITips
  */


	UITips.prototype.handleConfirm = function handleConfirm() {
		var onConfirm = this.state.onConfirm;


		this.hide();
		typeof onConfirm === 'function' && onConfirm();
	};

	/**
  * 取消按钮点击事件，默认隐藏UITips
  */


	UITips.prototype.handleCancel = function handleCancel() {
		var onCancel = this.state.onCancel;


		this.hide();
		typeof onCancel === 'function' && onCancel();
	};

	UITips.prototype.render = function render() {
		var _className;

		console.log('render UITips');

		var extraClass = this.props.extraClass;
		var _state = this.state,
		    show = _state.show,
		    title = _state.title,
		    content = _state.content,
		    confirmText = _state.confirmText,
		    cancelText = _state.cancelText;


		var className = (_className = {}, _className[extraClass] = true, _className);

		var tipsStyle = {
			display: show ? 'block' : 'none'
		};

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)("hypc-tip-dialog", className), style: tipsStyle },
			_react2.default.createElement(
				'p',
				{ className: 'hypc-tip-dialog-title' },
				title
			),
			_react2.default.createElement(
				'div',
				{ className: 'hypc-tip-dialog-content' },
				content
			),
			_react2.default.createElement(
				'div',
				{ className: 'hypc-tip-dialog-btn-list' },
				_react2.default.createElement(
					'a',
					{ href: 'javascript:void(0)', id: 'tipsConfirmBtn', className: 'hypc-tip-dialog-btn hypc-tip-dialog-btn-confirm', onClick: this.handleConfirm },
					confirmText
				),
				!cancelText ? null : _react2.default.createElement(
					'a',
					{ href: 'javascript:void(0)', id: 'tipsCancelBtn', className: 'hypc-tip-dialog-btn hypc-tip-dialog-btn-cancel', onClick: this.handleCancel },
					cancelText
				)
			)
		);
	};

	return UITips;
}(_react.Component);

exports.default = UITips;


UITips.propTypes = {
	extraClass: _react.PropTypes.string };
UITips.defaultProps = {
	extraClass: ''
};