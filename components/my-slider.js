class MySlider extends HTMLElement {
    static get observedAttributes() {
        return ["value", "backgroundcolor"];
    }

    set value(val) {
        this.setAttribute('value', val);
    }
     
    get value() {
        return this.getAttribute('value');
    }
     
    set backgroundcolor(val) {
        this.setAttribute('backgroundcolor', val);
    }
     
    get backgroundcolor() {
        return this.getAttribute('backgroundcolor');
    }

    connectedCallback() {
        this.innerHTML = '<div class="bg-overlay"></div><div class="thumb"></div>';
        this.style.display = 'inline-block';
        this.style.position = 'relative';
        this.style.width = '500px';
        this.style.height = '50px';

        const bg = this.querySelector('.bg-overlay');
        bg.style.width = '100%';
        bg.style.height = '100%';
        bg.style.position = 'absolute';
        bg.style.backgroundColor = this.getAttribute('backgroundcolor');

        const th = this.querySelector('.thumb');
        th.style.marginLeft = this.getAttribute('value') + 'px';
        th.style.width = '5px';
        th.style.height = 'calc(100% - 5px)';
        th.style.position = 'absolute';
        th.style.border = '3px solid white';
        th.style.borderRadius = '3px';

        // this.setColor(this.backgroundcolor);
        // this.refreshSlider(this.value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "value":
                this.refreshSlider(newValue);
                break;

            case "backgroundcolor":
                this.setColor(newValue);
                break;
        }
    }

    setColor(color) {
        if (this.querySelector('.bg-overlay')) {
            this.querySelector('.bg-overlay').style.background =
                `linear-gradient(to right, ${color} 0%, ${color}00 100%)`;
        }
    }

    refreshSlider(value) {
        if (this.querySelector('.thumb')) {
                this.querySelector('.thumb').style.left = (value/100 *
                this.offsetWidth - this.querySelector('.thumb').offsetWidth/2)
                + 'px';
        }
    }
}

if (!customElements.get("my-slider")) {
    customElements.define("my-slider", MySlider);
}
