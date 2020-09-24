class Slides {
    on_change = n => null;

    constructor(selector, callback, n=0) {
        this.element = $(selector);
        this.on_change = callback;
        this.n = n;

        this.dots = this.element.find(".dot")
        this.slides = this.element.find(".slide")
        
        this.show();
    }

    next() {
        this.n += 1;
        if (this.n >= this.slides.length) this.n = 0;
        this.show();
    }

    prev() {
        this.n -= 1;
        if (this.n < 0) this.n = this.slides.length - 1;
        this.show();
    }

    show(n=null) {
        if (n==null) n = this.n;
        this.dots.addClass("inactive");
        this.dots.eq(n).removeClass("inactive");
        this.slides.addClass("inactive");
        this.slides.eq(n).removeClass("inactive");
        this.on_change(n)
    }
}