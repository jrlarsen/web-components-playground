class PhotoCarousel extends HTMLElement {
    #photoIndex = 0;
    #photos = [];

    connectedCallback() {
        this.#photos = this.getAttribute('photos').split(',');

        this.innerHTML = `
<h2>${this.getAttribute('title')}</h2>
<h4>by ${this.getAttribute('author')}</h4>
<div class="image-container"></div>
<button class="back">&lt</button>
<button class="forward">&gt</button>`;

        this.showPhoto();

        this.querySelector('button.back').addEventListener('click', event =>
            this.onBackButtonClick(event));

        this.querySelector('button.forward').addEventListener('click', event =>
            this.onForwardButtonClick(event));
    }

    showPhoto() {
        this.querySelector('.image-container').style.backgroundImage = `url(${this.#photos[this.#photoIndex]})`;
    }

    onBackButtonClick() {
        this.#photoIndex = (this.#photoIndex + this.#photos.length - 1) % this.#photos.length;
        this.showPhoto();
    }

    onForwardButtonClick() {
        this.#photoIndex = (this.#photoIndex + 1) % this.#photos.length;
        this.showPhoto();
    }
}

if (!customElements.get("photo-carousel")) {
    customElements.define("photo-carousel", PhotoCarousel);
}