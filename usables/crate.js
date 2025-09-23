// crate.js
// Classe pour les caisses génériques qui stockent des ingrédients


class Crate extends Usable {
    constructor(position, ingredientType) {
        super(position, 'crate');
        this.ingredientType = ingredientType;
        this.automatic = false; // type d'ingrédient que contient la caisse
    }

    // Override: vérifier si on peut utiliser la caisse
    canUse(agent) {
        return super.canUse(agent);
    }

    // Override: utiliser la caisse pour prendre un ingrédient
    use(agent, game) {
        if (!this.canUse(agent)) {
            return false;
        }

        // Si l'agent a déjà quelque chose dans les mains
        if (agent.carried) {
            return false;
        }

        agent.carried = this.ingredientType;
        return true;
    }
}

