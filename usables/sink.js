// sink.js
// Classe pour l'évier - permet de laver les plats et ustensiles

import Usable from "./usable.js";

class Sink extends Usable {
    constructor(position) {
        super(position, 'sink');
        this.washingTime = 3000; // Temps de lavage en millisecondes
        this.currentWashItem = null;
        this.washStartTime = null;
    }

    // Override: vérifier si on peut utiliser l'évier
    canUse(agent) {
        return super.canUse(agent) && this.currentWashItem === null;
    }

    // Override: utiliser l'évier pour laver un objet
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }

        // L'agent doit avoir quelque chose de sale à laver
        if (!agent.carried || !this.isDirty(agent.carried)) {
            return false;
        }

        super.use(agent, item);
        this.currentWashItem = agent.carried;
        this.washStartTime = Date.now();
        agent.carried = null; // L'agent laisse l'objet dans l'évier
        
        return true;
    }

    // Vérifier si un objet est sale et peut être lavé
    isDirty(item) {
        return item && (item.includes('dirty') || item === 'dirty_plate' || item === 'dirty_pot');
    }

    // Mettre à jour l'état du lavage
    update() {
        if (this.currentWashItem && this.washStartTime) {
            const elapsed = Date.now() - this.washStartTime;
            
            if (elapsed >= this.washingTime) {
                // Lavage terminé
                this.currentWashItem = this.cleanItem(this.currentWashItem);
                this.finishUse();
            }
        }
    }

    // Nettoyer un objet (enlever "dirty" du nom)
    cleanItem(dirtyItem) {
        if (dirtyItem.startsWith('dirty_')) {
            return dirtyItem.replace('dirty_', '');
        }
        return dirtyItem;
    }

    // Récupérer l'objet lavé
    takeCleanItem(agent) {
        if (this.currentWashItem && !this.inUse) {
            const cleanItem = this.currentWashItem;
            this.currentWashItem = null;
            this.washStartTime = null;
            return cleanItem;
        }
        return null;
    }

    // Obtenir le pourcentage de progression du lavage
    getWashProgress() {
        if (!this.currentWashItem || !this.washStartTime) {
            return 0;
        }
        
        const elapsed = Date.now() - this.washStartTime;
        return Math.min(100, (elapsed / this.washingTime) * 100);
    }

    // Override: obtenir des informations sur l'évier
    getInfo() {
        return {
            ...super.getInfo(),
            currentWashItem: this.currentWashItem,
            washProgress: this.getWashProgress(),
            isWashing: this.currentWashItem !== null && this.inUse
        };
    }
}

export default Sink;