// onionCrate.js
// Classe spécialisée pour les caisses d'oignons


class OnionBox extends Crate {
    constructor(position, capacity = -1) {
        super(position, 'onion', capacity);
        this.type = 'onionBox'; // Type spécifique pour l'onion box
    }

    // Méthode spéciale pour vérifier si c'est bien une caisse d'oignons
    isOnionBox() {
        return true;
    }

    // Override: obtenir des informations spécifiques à l'onion box
    getInfo() {
        return {
            ...super.getInfo(),
        };
    }
}

