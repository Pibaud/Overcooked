// table.js
// Classe pour les tables - permet de poser des aliments ou des assiettes


class Table extends Usable {
    constructor(position) {
        super(position, 'table');
    }

    // Override: vérifier si on peut utiliser la table
    canUse(agent) {
        // On peut utiliser la table si elle n'est pas occupée
        return super.canUse(agent);
    }

    // Override: utiliser la table pour poser ou prendre un objet
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }

        // Si l'agent a quelque chose et que la table est vide, poser l'objet
        if (agent.carried && !this.hasContent()) {
            return this.placeItem(agent);
        }
        
        // Si l'agent n'a rien et que la table a quelque chose, prendre l'objet
        if (!agent.carried && this.hasContent()) {
            return this.takeItem(agent);
        }

        return false;
    }

    // Poser un objet sur la table
    placeItem(agent) {
        if (this.place(agent.carried)) {
            agent.carried = null;
            super.use(agent);
            this.finishUse();
            return true;
        }
        return false;
    }

    // Prendre un objet de la table
    takeItem(agent) {
        const item = this.take();
        if (item) {
            agent.carried = item;
            super.use(agent);
            this.finishUse();
            return true;
        }
        return false;
    }

    // Vérifier si on peut poser un objet spécifique
    canPlace(item) {
        return !this.hasContent() && (this.isFood(item) || this.isPlate(item));
    }

    // Vérifier si c'est un aliment
    isFood(item) {
        const foods = ['onion', 'chopped_onion', 'onion_soup', 'carrot', 'potato', 'mixed_soup'];
        return foods.includes(item);
    }

    // Vérifier si c'est une assiette
    isPlate(item) {
        return item && (item.includes('plate') || item === 'clean_plate' || item === 'dirty_plate');
    }

    // Override: obtenir des informations sur la table
    getInfo() {
        return {
            ...super.getInfo(),
            canAcceptFood: !this.hasContent(),
            canAcceptPlate: !this.hasContent()
        };
    }
}

