// recipe.js
// Classe Recipe pour définir les recettes

class Recipe {
    constructor(title, ingredients, steps) {
        this.title = title;
        this.ingredients = ingredients; // liste des ingrédients nécessaires
        this.steps = steps; // liste d'étapes pour préparer le plat
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