class MySlider extends HTMLElement {
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
    }
}

if (!customElements.get("my-slider")) {
    customElements.define("my-slider", MySlider);
}
