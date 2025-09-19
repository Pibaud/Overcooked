// onionCrate.js
// Classe spécialisée pour les caisses d'oignons

import Crate from "./crate.js";

class OnionBox extends Crate {
    constructor(position, capacity = -1) {
        super(position, 'onion', capacity);
        this.type = 'onion_crate'; // Type spécifique pour l'onion box
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

export default OnionBox;