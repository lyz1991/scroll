var Class = (function () {
    function Class(wrapper, scroller, container, max) {
        this.wrapper = wrapper;
        this.scroller = scroller;
        this.container = container;
        this.isPc = 'ontouchstart' in window;
        this.h = parseInt(window.getComputedStyle(wrapper).height);
        this.max = max;
        this.bind();
    }
    Class.prototype.bind = function () {
        var _this = this;
        this.container.addEventListener('touchstart', function (e) {
            _this.startY = e.targetTouches[0].clientY;
        });
        this.container.addEventListener('touchmove', function (e) {
            _this.shouldupdate(e);
        });
        this.container.addEventListener('touchend', function (e) {
            _this.reset(e);
        });
    };
    Class.prototype.shouldupdate = function (e) {
        var chg = e.changedTouches[0].clientY;
        var delta = chg - this.startY;
        if (!this.container.scrollTop && chg - this.startY > 0) {
            delta = delta > this.max ? this.max : delta;
            return this.down(delta);
        }
        if (this.container.scrollTop + this.h === this.container.scrollHeight && chg - this.startY < 0) {
            delta = Math.abs(delta) > this.max ? -this.max : delta;
            return this.up(delta);
        }
    };
    Class.prototype.down = function (distance) {
        this.scroller.style.transform = "translateY(" + distance + "px)";
    };
    Class.prototype.up = function (distance) {
        this.scroller.style.transform = "translateY(" + distance + "px)";
    };
    Class.prototype.reset = function (e) {
        this.startY = 0;
        this.scroller.style.transform = "translateY(0px)";
        this.callback && this.callback();
    };
    return Class;
}());
new Class(document.getElementById('wrapper'), document.getElementById('scroller'), document.getElementById('container'), 100);
//# sourceMappingURL=Scroll.js.map