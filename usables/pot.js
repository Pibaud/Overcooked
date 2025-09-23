// pot.js
// Classe pour la marmite - permet de cuire les ingrédients et faire des soupes


class Pot extends Usable {
    constructor(position) {
        super(position, 'pot');
        this.cookingTime = 50; // Temps de cuisson en millisecondes
        this.ingredients = null; // Ingrédient dans la marmite
        this.isCooking = false;
        this.cookableItems = ['cutOnion'];
        this.pickupable = false;
        this.automatic = true; // La marmite cuit automatiquement une fois un ingrédient ajouté
        this.hasSpecialSprite = true

    }

    // Override: vérifier si on peut utiliser la marmite
    canUse(agent) {
        return super.canUse(agent) && !this.isCooking;
    }

    cooked(ingredient) {
        table = { 'cutOnion': 'onionSoup' }
        return table[ingredient]
    }

    // Override: utiliser la marmite pour ajouter un ingrédient ou commencer la cuisson
    use(agent, game) {
        if (this.pickupable) {
            console.log("agent picks the cooked dish");
            if (this.cookingTime <= -10) {
                agent.carried = this.cooked(this.ingredient);
                this.empty();
                this.pickupable = false;
                return true;
            } else {
                agent.carried = this.cooked(this.ingredient);
                this.empty();
                this.pickupable = false;
                return true;
            }
        } else {
            if (!this.canUse(agent)) {
                console.log("Cannot use pot");
                return false;
            }

            // Si l'agent a un ingrédient à ajouter
            console.log("Agent is using pot");
            console.log("agent carried:", agent.carried);
            console.log("canAddIngredient:", this.canAddIngredient(agent.carried ? agent.carried.name : null), "because : ", agent.carried.name, "is not in ", this.cookableItems, " or pot is cooking : ", this.isCooking);
            if (agent.carried && this.canAddIngredient(agent.carried.name)) {
                console.log("Adding ingredient to pot:", agent.carried.name);
                agent.task = null;
                let res = this.addIngredient(agent.carried.name, agent);
                agent.carried = null;
                return res;
            }
            console.log("Pot is already cooking or no valid ingredient to add");

            return true;
        }
    }

    // Vérifier si on peut ajouter un ingrédient
    canAddIngredient(ingredient) {
        return this.cookableItems.includes(ingredient) && !this.isCooking;
    }

    // Ajouter un ingrédient à la marmite
    addIngredient(ingredient, agent) {
        console.log("Attempting to add ingredient:", ingredient);
        if (this.canAddIngredient(ingredient)) {
            this.ingredient = ingredient;
            agent.carried = null;
            this.isCooking = true;
            console.log("Pot is now cooking");
            return true;
        }
        return false;
    }


    cooking(game) {
        if (!this.isCooking) {
            console.log("Pot is not cooking");
            return false;
        }
        if (this.cookingTime != 0) {
            console.log("Cooking... time left:", this.cookingTime);
            this.cookingTime -= 1;
        } else {
            console.log("Cooking finished!");
            this.cookingTime -= 1;
            this.pickupable = true;
        }
        return true
    }

    // Vider la marmite (en cas d'erreur ou reset)
    empty() {
        this.ingredients = [];
        this.content = null;
        this.isCooking = false;
        this.cookingTime = 50;
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

