// crate.js
// Classe pour les caisses génériques qui stockent des ingrédients

import Usable from "./usable.js";

class Crate extends Usable {
    constructor(position, ingredientType) {
        super(position, 'crate');
        this.ingredientType = ingredientType; // type d'ingrédient que contient la caisse
    }

    // Override: vérifier si on peut utiliser la caisse
    canUse(agent) {
        return super.canUse(agent);
    }

    // Override: utiliser la caisse pour prendre un ingrédient
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }

        // Si l'agent a déjà quelque chose dans les mains
        if (agent.carried) {
            return false;
        }

        agent.carried = this.ingredientType;
        if (this.capacity !== -1) {
            this.currentStock--;
        }
        return true;
    }
}

export default Crate;