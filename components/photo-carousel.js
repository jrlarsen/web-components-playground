class PhotoCarousel extends HTMLElement {
    connectedCallback() {
        console.log("Photo Carousel");
    }
}

if (!customElements.get("photo-carousel")) {
    customElements.define("photo-carousel", PhotoCarousel);
}