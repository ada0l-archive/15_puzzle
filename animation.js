class AnimationCSS {

    static makeAndRestore(prop, element, func) {
        let old_value = element.style[prop];
        func(element)
        setTimeout(() => {
            element.style[prop] = old_value;
        }, 200);
    }

    static fadeIn(element) {
        this.makeAndRestore('transition', element, () => {
            element.style.transition = 'opacity 0.2s';
            element.style.opacity = "0.7";
        })
    }

    static fadeOut(element) {
        this.makeAndRestore('transition', element, () => {
            element.style.transition = 'opacity 0.2s';
            element.style.opacity = "1";
        })
    }

    static fadeInFadeOut(element) {
        this.fadeIn(element);
        setTimeout(() => {
            this.fadeOut(element);
        }, 200);
    }

}