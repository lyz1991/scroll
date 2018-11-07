class Class {
  wrapper: HTMLElement
  scroller: HTMLElement
  container: HTMLElement
  startY: number
  max: number
  h: number
  callback: any
  constructor (wrapper: HTMLElement, scroller: HTMLElement, container: HTMLElement, max:number) {
    this.wrapper = wrapper
    this.scroller = scroller
    this.container = container
    this.h = parseInt(window.getComputedStyle(wrapper).height)
    this.max = max
    this.bind()
  }
  bind():void {
    this.container.addEventListener('touchstart',  (e) => {
      this.startY = e.targetTouches[0].clientY
    })
    this.container.addEventListener('touchmove',  (e) => {
      this.shouldupdate(e)
    })
    this.container.addEventListener('touchend',  (e) => {
      this.reset(e)
    })
  }
  shouldupdate(e):any {
    let chg = e.changedTouches[0].clientY
    let delta = chg - this.startY
    if (!this.container.scrollTop && chg - this.startY > 0) {
      delta = delta > this.max ? this.max : delta
      return this.down(delta)
    }
    if (this.container.scrollTop + this.h === this.container.scrollHeight && chg - this.startY < 0) {
      delta = Math.abs(delta) > this.max ? -this.max: delta
      return this.up(delta)
    }
  }
  down(distance: number) {
    this.scroller.style.transform = `translateY(${distance}px)`
  }
  up(distance: number) {
    this.scroller.style.transform = `translateY(${distance}px)`
  }
  reset(e) {
    this.startY = 0
    this.scroller.style.transform = `translateY(0px)`
    this.callback && this.callback()
  }

}
new Class(document.getElementById('wrapper'),
    document.getElementById('scroller'),
    document.getElementById('container'), 100)