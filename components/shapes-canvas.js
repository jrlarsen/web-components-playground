class ShapesCanvas extends HTMLElement {
    static get observedAttributes() {
        return ["shapes"];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const canvas = document.createElement("canvas");
        shadow.appendChild(canvas);

        this.ctx = canvas.getContext("2d");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "shapes") {
            this.shapes = JSON.parse(newValue);
            this.draw();
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