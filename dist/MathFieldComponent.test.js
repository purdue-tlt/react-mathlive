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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("@testing-library/react");
var MathFieldComponent_1 = require("./MathFieldComponent");
afterEach(react_1.cleanup);
describe("MathFieldComponent", function () {
    it(" mounts mathfield", function () {
        var mountingResult = react_1.render(React.createElement(MathFieldComponent_1.MathFieldComponent, { latex: "fubar" }));
        var mlTextAreas = mountingResult.baseElement.getElementsByClassName("ML__textarea");
        expect(mlTextAreas).toHaveLength(1);
    });
    it(" internal mathfield yields correct latex", function () {
        var mathField;
        var mountingResult = react_1.render(React.createElement(MathFieldComponent_1.MathFieldComponent, { mathFieldRef: function (mf) { return mathField = mf; }, latex: "fubar" }));
        expect(mathField.$latex()).toBe("fubar");
    });
    it(" onChange reacts to direct mathfield interaction", function () {
        var value = "foo";
        var mathField;
        react_1.render(React.createElement(MathFieldComponent_1.MathFieldComponent, { mathFieldRef: function (mf) { return mathField = mf; }, onChange: function (v) { return value = v; }, latex: value }));
        expect(value).toBe("foo");
        expect(mathField.$latex()).toBe("foo");
        mathField.$latex("bar");
        expect(value).toBe("bar");
        expect(mathField.$latex()).toBe("bar");
    });
    it(" accept changed props", function () {
        var Container = /** @class */ (function (_super) {
            __extends(Container, _super);
            function Container() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = { value: "foo" };
                return _this;
            }
            Container.prototype.render = function () {
                var _this = this;
                return React.createElement(MathFieldComponent_1.MathFieldComponent, { mathFieldRef: function (mf) { return _this.mathField = mf; }, latex: this.state.value });
            };
            return Container;
        }(React.Component));
        var container;
        react_1.render(React.createElement(Container, { ref: function (c) { return container = c; } }));
        var mathField = container.mathField;
        expect(mathField.$latex()).toBe("foo");
        container.setState({ value: "bar" });
        container.forceUpdate();
        expect(mathField.$latex()).toBe("bar");
    });
});
//# sourceMappingURL=MathFieldComponent.test.js.map