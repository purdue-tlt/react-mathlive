"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mathlive/dist/mathlive.core.css");
require("mathlive/dist/mathlive.css");
var React = require("react");
var mathlive_1 = require("mathlive");
/** A react-control that hosts a mathlive-mathfield in it. */
var MathFieldComponent = /** @class */ (function (_super) {
    __extends(MathFieldComponent, _super);
    function MathFieldComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.insertElement = null;
        _this.combinedOptions = __assign({}, props.mathFieldOptions);
        var onChange = props.onChange, onBlur = props.onBlur, onKeystroke = props.onKeystroke;
        if (onChange) {
            if (props.mathFieldOptions && props.mathFieldOptions.onContentDidChange) {
                var fromOptions_1 = props.mathFieldOptions.onContentDidChange;
                _this.combinedOptions.onContentDidChange = function (mf) {
                    onChange(mf.$latex());
                    fromOptions_1(mf);
                };
            }
            else {
                _this.combinedOptions.onContentDidChange = function (mf) { return onChange(mf.$latex()); };
            }
        }
        if (onBlur) {
            if (props.mathFieldOptions && props.mathFieldOptions.onBlur) {
                var fromOptions_2 = props.mathFieldOptions.onBlur;
                _this.combinedOptions.onBlur = function (mf) {
                    onBlur();
                    fromOptions_2(mf);
                };
            }
            else {
                _this.combinedOptions.onBlur = onBlur;
            }
        }
        if (onKeystroke) {
            if (props.mathFieldOptions && props.mathFieldOptions.onKeystroke) {
                var fromOptions_3 = props.mathFieldOptions.onKeystroke;
                _this.combinedOptions.onKeystroke = function (mf, ks, ev) {
                    onKeystroke(ev);
                    return fromOptions_3(mf, ks, ev);
                };
            }
            else {
                _this.combinedOptions.onKeystroke = function (mf, ks, ev) {
                    onKeystroke(ev);
                    return true;
                };
            }
        }
        return _this;
    }
    MathFieldComponent.prototype.componentWillReceiveProps = function (newProps) {
        if (!this.mathField) {
            throw new Error("Component was not correctly initialized.");
        }
        if (newProps.latex !== this.props.latex) {
            this.mathField.$latex(newProps.latex, {
                suppressChangeNotifications: this.props.suppressChangeNotifications === undefined
                    ? true
                    : this.props.suppressChangeNotifications
            });
        }
    };
    /** The domain of react ends here, so it should not render again. */
    MathFieldComponent.prototype.shouldComponentUpdate = function () { return false; };
    MathFieldComponent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { ref: function (instance) { return _this.insertElement = instance; } });
    };
    MathFieldComponent.prototype.componentDidMount = function () {
        if (!this.insertElement) {
            throw new Error("React did apparently not mount the insert point correctly.");
        }
        this.mathField = mathlive_1.makeMathField(this.insertElement, this.combinedOptions);
        this.mathField.$latex(this.props.latex, {
            suppressChangeNotifications: this.props.suppressChangeNotifications === undefined
                ? true
                : this.props.suppressChangeNotifications
        });
        if (this.props.mathFieldRef) {
            this.props.mathFieldRef(this.mathField);
        }
    };
    return MathFieldComponent;
}(React.Component));
exports.MathFieldComponent = MathFieldComponent;
//# sourceMappingURL=MathFieldComponent.js.map