// recipe.js
// Classe Recipe pour définir les recettes

class Recipe {
    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks; // liste d'étapes pour préparer le plat
    }

    // Vérifier si tous les ingrédients sont disponibles
    hasAllIngredients(availableIngredients) {
        return this.ingredients.every(ingredient => 
            availableIngredients.includes(ingredient)
        );
    }

    // Obtenir la prochaine étape
    getNextStep(currentStepIndex) {
        if (currentStepIndex < this.steps.length - 1) {
            return this.steps[currentStepIndex + 1];
        }
        return null; // Recette terminée
    }

    


}


class oignionSoupRecipe extends Recipe {
    constructor(){
        super("onionSoup",[//Liste de tasks
            new task("cuttingBoard",new carriedItem("onion","box")),
            new task("pot",new carriedItem("cutOnion","usable")),
            new task("servingBelt",new carriedItem("onionSoup","usable"))

        ])
    }



}
