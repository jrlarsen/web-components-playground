class ShapesCanvas extends HTMLElement {
    #src;

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const canvas = document.createElement("canvas");
        shadow.appendChild(canvas);

        this.ctx = canvas.getContext("2d");

        this.#src = document.querySelector("state-emitter");
        if (this.#src) {
            this.#src.addEventListener("updated", (e) => {
                this.shapes = e.detail.shapes;
                this.draw();
            });
        }
    }

    disconnectedCallback() {
        if (this.#src) {
            this.#src.removeEventListener("updated");
        }
    }

    draw() {
        const ctx = this.ctx;
        if (ctx) {
            ctx.clearRect(0, 0, 300, 300); 
            const [first, ...rest] = this.shapes;
            ctx.beginPath();
            ctx.moveTo(first.x, first.y);
            rest.forEach(p => {
                ctx.lineTo(p.x, p.y);
            });
            ctx.closePath();
            ctx.stroke();
        }                    
    }
}
customElements.define("shapes-canvas", ShapesCanvas);