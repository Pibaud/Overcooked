// pot.js
// Classe pour la marmite - permet de cuire les ingrédients et faire des soupes

import Usable from "./usable.js";

class Pot extends Usable {
    constructor(position) {
        super(position, 'pot');
        this.cookingTime = 4000; // Temps de cuisson en millisecondes
        this.ingredients = []; // Ingrédients dans la marmite
        this.cookStartTime = null;
        this.maxIngredients = 3; // Maximum d'ingrédients dans la marmite
        this.isCooking = false;
        this.cookableItems = ['chopped_onion'];
    }

    // Override: vérifier si on peut utiliser la marmite
    canUse(agent) {
        return super.canUse(agent) && !this.isCooking;
    }

    // Override: utiliser la marmite pour ajouter un ingrédient ou commencer la cuisson
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }

        // Si l'agent a un ingrédient à ajouter
        if (agent.carried && this.canAddIngredient(agent.carried)) {
            return this.addIngredient(agent.carried, agent);
        }
        
        // Si pas d'ingrédient mais des ingrédients dans la marmite, commencer la cuisson
        if (!agent.carried && this.ingredients.length > 0 && !this.isCooking) {
            return this.startCooking(agent);
        }

        return false;
    }

    // Vérifier si on peut ajouter un ingrédient
    canAddIngredient(ingredient) {
        return this.cookableItems.includes(ingredient) && 
               this.ingredients.length < this.maxIngredients &&
               !this.isCooking;
    }

    // Ajouter un ingrédient à la marmite
    addIngredient(ingredient, agent) {
        if (this.canAddIngredient(ingredient)) {
            this.ingredients.push(ingredient);
            agent.carried = null;
            return true;
        }
        return false;
    }

    // Commencer la cuisson
    startCooking(agent) {
        if (this.ingredients.length > 0 && !this.isCooking) {
            this.isCooking = true;
            this.cookStartTime = Date.now();
            super.use(agent);
            return true;
        }
        return false;
    }

    // Mettre à jour l'état de la cuisson
    update() {
        if (this.isCooking && this.cookStartTime) {
            const elapsed = Date.now() - this.cookStartTime;
            
            if (elapsed >= this.cookingTime) {
                // Cuisson terminée
                this.content = this.createDish();
                this.ingredients = [];
                this.isCooking = false;
                this.cookStartTime = null;
                this.finishUse();
            }
        }
    }

    // Créer un plat basé sur les ingrédients
    createDish() {
        if (this.ingredients.includes('chopped_onion')) {
            return 'onion_soup';
        }
        // Ajouter d'autres recettes selon les ingrédients
        return 'mixed_soup';
    }

    // Récupérer le plat cuit
    takeDish(agent) {
        if (this.content && !this.isCooking) {
            const dish = this.content;
            this.content = null;
            return dish;
        }
        return null;
    }

    // Obtenir le pourcentage de progression de la cuisson
    getCookProgress() {
        if (!this.isCooking || !this.cookStartTime) {
            return 0;
        }
        
        const elapsed = Date.now() - this.cookStartTime;
        return Math.min(100, (elapsed / this.cookingTime) * 100);
    }

    // Vider la marmite (en cas d'erreur ou reset)
    empty() {
        this.ingredients = [];
        this.content = null;
        this.isCooking = false;
        this.cookStartTime = null;
        this.finishUse();
    }

    // Override: obtenir des informations sur la marmite
    getInfo() {
        return {
            ...super.getInfo(),
            ingredients: this.ingredients,
            isCooking: this.isCooking,
            cookProgress: this.getCookProgress(),
            maxIngredients: this.maxIngredients,
            canAddMore: this.ingredients.length < this.maxIngredients && !this.isCooking
        };
    }
}

export default Pot;