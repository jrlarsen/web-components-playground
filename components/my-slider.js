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
        th.style.width = '5px';
        th.style.height = 'calc(100% - 5px)';
        th.style.position = 'absolute';
        th.style.border = '3px solid white';
        th.style.borderRadius = '3px';

        document.addEventListener("mousedown", e => this.eventHandler(e));
        document.addEventListener("mouseup", e => this.eventHandler(e));
        document.addEventListener("mousemove", e => this.eventHandler(e));
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
        const th = this.querySelector('.thumb');
        if (th) {
            th.style.left = (value/100 * this.offsetWidth - th.offsetWidth/2) + 'px';
        }
    }

    updateX(x) {
        let hPos =
        x - this.querySelector('.thumb') .offsetWidth/2;
        if (hPos > this.offsetWidth) {
            hPos = this.offsetWidth;
        }
        if (hPos < 0) {
            hPos = 0;
        }
        this.value = (hPos / this.offsetWidth) * 100;
     }
     
     eventHandler(e) {
        const bounds = this.getBoundingClientRect();
        const x = e.clientX - bounds.left;
     
        switch (e.type) {
            case 'mousedown':
                this.isDragging = true;
                this.updateX(x);
                this.refreshSlider(this.value);
                break;
     
            case 'mouseup':
                this.isDragging = false;
                break;
     
            case 'mousemove':
                if (this.isDragging) {
                    this.updateX(x);
                    this.refreshSlider(this.value);
                }
                break;
        }
     }
}

if (!customElements.get("my-slider")) {
    customElements.define("my-slider", MySlider);
}
