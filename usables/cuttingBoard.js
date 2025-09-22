// cuttingBoard.js
// Classe pour la planche à découper - permet de découper/préparer les ingrédients


class CuttingBoard extends Usable {
    constructor(position) {
        super(position, 'cuttingBoard');
        this.cuttingTime = 5; 
        this.currentCutItem = null;
        this.cutStartTime = null;
        this.hasSpecialSprite = true
        this.cuttableItems = ['onion', 'carrot', 'potato', 'tomato']; // Ingrédients découpables
        this.automatic = false;
    }

    // Override: vérifier si on peut utiliser la planche à découper
    canUse(agent) {
        return super.canUse(agent) && this.currentCutItem === null;
    }

    // Override: utiliser la planche pour découper un ingrédient
    use(agent, game) {
        if (!this.canUse(agent) && this.canUse(agent))  {
            console.log("Cannot use cutting board because : ", !this.canUse(agent) , " || ", this.canUse(agent) );
            return false;
        }

        // L'agent doit avoir un ingrédient découpable
        if (!agent.carried || !this.isCuttable(agent.carried.name)) {
            console.log("Agent is not carrying a cuttable item" , agent.carried.name);
            return false;
        }

        console.log("avant le super.use");
        super.use(agent, game);
        console.log("après le super.use");
        this.currentCutItem = agent.carried.name;
        if (this.cuttingTime != 0) {
            this.cuttingTime -= 1;
            console.log("Cutting in progress...", this.cuttingTime);
        } else {
            console.log("Cutting complete!");
            this.cuttingTime = 10;
            agent.carried.name = "cut" + (agent.carried.name.charAt(0).toUpperCase() + agent.carried.name.slice(1));
            agent.task = null;
            this.finishUse();

        }

        return true;
    }

    // Vérifier si un ingrédient peut être découpé
    isCuttable(item) {
        return this.cuttableItems.includes(item);
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

