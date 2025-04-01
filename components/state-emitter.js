class StateEmitter extends HTMLElement {
    #fnList = [];
    #getState;
    #state = {};

    get fnList() {
        return [...this.#fnList];
    }

    set fnList(value) {
        this.#fnList = value;
        this.#getState = this.stateBuilder();
    }

    get state() {
        return this.#state.newValues;
    }

    set state(updates) {
        this.#state = this.#getState(updates);
        this.dispatchEvent(new CustomEvent("updated", { detail: this.#state.newValues }));
    }

    stateBuilder() {
        let oldValues = {};
    
        return function(updates) {    
            const changed = Object.fromEntries(
                Object.entries(updates).filter(([key, value]) => value !== undefined && oldValues[key] !== value)
            );
    
            const updatedKeys = new Set(Object.keys(changed));
            const newValues = { ...oldValues, ...changed };
    
            fnList.forEach(({name, deps, fn}) => {
                if (!updatedKeys.has(name)) {
                    const depsSet = new Set(deps);
                    if (depsSet.intersection(updatedKeys).size > 0 || newValues[name] === undefined) {
                        const value = fn(newValues);
                        if (value !== newValues[name]) {
                            newValues[name] = value;
                            updatedKeys.add(name);
                        }
                    }
                }            
            });
    
            oldValues = newValues;
            return {
                newValues,
                updatedKeys,
            };
        }
    }
}

if (!customElements.get("state-emitter")) {
    customElements.define("state-emitter", StateEmitter);
}