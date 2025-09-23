// order.js
// Classe Order pour gérer les commandes des clients

class Order {
    constructor(recipe, timeLimit, reward) {
        this.recipe = recipe;
        this.timeLimit = timeLimit; 
        this.reward = reward; 
        this.timeRemaining = timeLimit;
    }

    // Mettre à jour le temps restant
    addTasks(game){
        for (var t of this.recipe.tasks){
            t.order = this
            game.tasks.push(t)
        }
    }
}

class onionSoupOrder extends Order{
    
    constructor(){
        super(new onionSoupRecipe(),12,15)
    }
}