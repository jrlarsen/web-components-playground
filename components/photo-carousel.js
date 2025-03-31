class PhotoCarousel extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<h2>${this.getAttribute('title')}</h2>
<h4>by ${this.getAttribute('author')}</h4>
<div class="image-container"></div>
<button class="back">&lt</button>
<button class="forward">&gt</button>`;
    }
}

if (!customElements.get("photo-carousel")) {
    customElements.define("photo-carousel", PhotoCarousel);
}