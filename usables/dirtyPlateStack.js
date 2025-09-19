// dirtyPlateStack.js
// Classe pour la pile d'assiettes sales - stocke les assiettes à nettoyer

import Usable from "./usable.js";

class DirtyPlateStack extends Usable {
    constructor(position, maxCapacity = 10) {
        super(position, 'dirty_plate_stack');
        this.dirtyPlates = []; // Liste des assiettes sales
        this.maxCapacity = maxCapacity; // Capacité maximale de la pile
    }

    // Override: vérifier si on peut utiliser la pile
    canUse(agent) {
        // On peut utiliser si on veut déposer une assiette sale ET qu'il y a de la place
        // OU si on veut prendre une assiette sale ET qu'il y en a
        return super.canUse(agent) && 
               ((agent.carried === 'dirty_plate' && !this.isFull()) || 
                (!agent.carried && this.hasPlates()));
    }

    // Override: utiliser la pile pour déposer ou prendre une assiette sale
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }

        // Si l'agent a une assiette sale, la déposer
        if (agent.carried === 'dirty_plate' && !this.isFull()) {
            return this.addDirtyPlate(agent);
        }
        
        // Si l'agent n'a rien et qu'il y a des assiettes sales, en prendre une
        if (!agent.carried && this.hasPlates()) {
            return this.takeDirtyPlate(agent);
        }

        return false;
    }

    // Ajouter une assiette sale à la pile
    addDirtyPlate(agent) {
        if (agent.carried === 'dirty_plate' && !this.isFull()) {
            this.dirtyPlates.push('dirty_plate');
            agent.carried = null;
            super.use(agent);
            this.finishUse();
            return true;
        }
        return false;
    }

    // Prendre une assiette sale de la pile
    takeDirtyPlate(agent) {
        if (!agent.carried && this.hasPlates()) {
            const dirtyPlate = this.dirtyPlates.pop();
            agent.carried = dirtyPlate;
            super.use(agent);
            this.finishUse();
            return true;
        }
        return false;
    }

    // Vérifier si la pile a des assiettes
    hasPlates() {
        return this.dirtyPlates.length > 0;
    }

    // Vérifier si la pile est pleine
    isFull() {
        return this.dirtyPlates.length >= this.maxCapacity;
    }

    // Vérifier si la pile est vide
    isEmpty() {
        return this.dirtyPlates.length === 0;
    }

    // Obtenir le nombre d'assiettes sales
    getPlateCount() {
        return this.dirtyPlates.length;
    }

    // Obtenir le pourcentage de remplissage
    getFillPercentage() {
        return (this.dirtyPlates.length / this.maxCapacity) * 100;
    }

    // Ajouter plusieurs assiettes sales d'un coup (pour les tests/debug)
    addMultiplePlates(count) {
        const toAdd = Math.min(count, this.maxCapacity - this.dirtyPlates.length);
        for (let i = 0; i < toAdd; i++) {
            this.dirtyPlates.push('dirty_plate');
        }
        return toAdd;
    }

    // Vider complètement la pile (pour maintenance/reset)
    clear() {
        this.dirtyPlates = [];
    }

    // Override: obtenir des informations sur la pile d'assiettes sales
    getInfo() {
        return {
            ...super.getInfo(),
            plateCount: this.getPlateCount(),
            maxCapacity: this.maxCapacity,
            isFull: this.isFull(),
            isEmpty: this.isEmpty(),
            fillPercentage: this.getFillPercentage()
        };
    }
}

export default DirtyPlateStack;