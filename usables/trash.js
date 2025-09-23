// crate.js
// Classe pour les caisses génériques qui stockent des ingrédients


class Trash extends Usable {
    constructor(position, ingredientType) {
        super(position, 'trash');
        this.automatic = false; // type d'ingrédient que contient la caisse
    }

    // Override: vérifier si on peut utiliser la caisse
    canUse(agent) {
        return super.canUse(agent);
    }

    // Override: utiliser la caisse pour prendre un ingrédient
    use(agent, item = null) {
        agent.carried=undefined
    }
}

