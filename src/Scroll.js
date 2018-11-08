var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Class {
    constructor(wrapper, scroller, container, max, fn = function () {
    }) {
        this.wrapper = wrapper;
        this.scroller = scroller;
        this.container = container;
        this.h = parseInt(window.getComputedStyle(wrapper).height);
        this.max = max;
        this.callback = fn;
        this.bind();
    }
    bind() {
        this.container.addEventListener('touchstart', (e) => {
            this.startY = e.targetTouches[0].clientY;
        });
        this.container.addEventListener('touchmove', (e) => {
            this.shouldupdate(e);
        });
        this.container.addEventListener('touchend', (e) => {
            this.reset(e);
        });
    }
    shouldupdate(e) {
        let chg = e.changedTouches[0].clientY;
        let delta = chg - this.startY;
        if (!this.container.scrollTop && chg - this.startY > 0) {
            delta = delta > this.max ? this.max : delta;
            return this.down(delta);
        }
        if (this.container.scrollTop + this.h === this.container.scrollHeight && chg - this.startY < 0) {
            delta = Math.abs(delta) > this.max ? -this.max : delta;
            return this.up(delta);
        }
    }
    down(distance) {
        this.scroller.style.transform = `translateY(${distance}px)`;
    }
    up(distance) {
        this.scroller.style.transform = `translateY(${distance}px)`;
    }
    reset(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.startY = 0;
            yield this.callback();
            console.log('back');
            this.scroller.style.transform = `translateY(0px)`;
        });
    }
}
new Class(document.getElementById('wrapper'), document.getElementById('scroller'), document.getElementById('container'), 100, function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 3000);
    });
});
//# sourceMappingURL=Scroll.js.map