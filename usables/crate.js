// crate.js
// Classe pour les caisses génériques qui stockent des ingrédients


class Crate extends Usable {
    constructor(position, ingredientType) {
        super(position, 'crate');
        this.ingredientType = ingredientType; // type d'ingrédient que contient la caisse
        this.automatic = false;
        this.hasSpecialSprite = true;
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

        agent.carried = eval("new carriedItem('"+this.ingredientType+"','box')")
        return true;
    }
}

