// crate.js
// Classe pour les caisses génériques qui stockent des ingrédients


class Trash extends Usable {
    constructor(position, ingredientType) {
        super(position, 'trash');
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

