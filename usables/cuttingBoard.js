// cuttingBoard.js
// Classe pour la planche à découper - permet de découper/préparer les ingrédients


class CuttingBoard extends Usable {
    constructor(position) {
        super(position, 'cuttingBoard');
        this.cuttingTime = 2000; // Temps de découpe en millisecondes
        this.currentCutItem = null;
        this.cutStartTime = null;
        this.hasSpecialSprite=true
        this.cuttableItems = ['onion', 'carrot', 'potato', 'tomato']; // Ingrédients découpables
    }

    // Override: vérifier si on peut utiliser la planche à découper
    canUse(agent) {
        return super.canUse(agent) && this.currentCutItem === null;
    }

    // Override: utiliser la planche pour découper un ingrédient
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }

        // L'agent doit avoir un ingrédient découpable
        if (!agent.carried || !this.isCuttable(agent.carried)) {
            return false;
        }

        super.use(agent, item);
        this.currentCutItem = agent.carried;
        this.cutStartTime = Date.now();
        agent.carried = null; // L'agent laisse l'ingrédient sur la planche
        
        return true;
    }

    // Vérifier si un ingrédient peut être découpé
    isCuttable(item) {
        return this.cuttableItems.includes(item);
    }

    // Mettre à jour l'état de la découpe
    update() {
        if (this.currentCutItem && this.cutStartTime) {
            const elapsed = Date.now() - this.cutStartTime;
            
            if (elapsed >= this.cuttingTime) {
                // Découpe terminée
                this.currentCutItem = this.cutItem(this.currentCutItem);
                this.finishUse();
            }
        }
    }

    // Découper un ingrédient (ajouter "chopped" au nom)
    cutItem(item) {
        return `chopped_${item}`;
    }

    // Récupérer l'ingrédient découpé
    takeChoppedItem(agent) {
        if (this.currentCutItem && !this.inUse) {
            const choppedItem = this.currentCutItem;
            this.currentCutItem = null;
            this.cutStartTime = null;
            return choppedItem;
        }
        return null;
    }

    // Obtenir le pourcentage de progression de la découpe
    getCutProgress() {
        if (!this.currentCutItem || !this.cutStartTime) {
            return 0;
        }
        
        const elapsed = Date.now() - this.cutStartTime;
        return Math.min(100, (elapsed / this.cuttingTime) * 100);
    }

    // Ajouter un nouvel ingrédient découpable
    addCuttableItem(item) {
        if (!this.cuttableItems.includes(item)) {
            this.cuttableItems.push(item);
        }
    }

    // Override: obtenir des informations sur la planche à découper
    getInfo() {
        return {
            ...super.getInfo(),
            currentCutItem: this.currentCutItem,
            cutProgress: this.getCutProgress(),
            isCutting: this.currentCutItem !== null && this.inUse,
            cuttableItems: this.cuttableItems
        };
    }
}

