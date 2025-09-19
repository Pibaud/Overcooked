// order.js
// Classe Order pour gérer les commandes des clients

class Order {
    constructor(recipe, timeLimit, reward) {
        this.recipe = recipe; // Instance de Recipe
        this.timeLimit = timeLimit; // Temps limite en secondes
        this.reward = reward; // Somme d'argent à gagner
        this.timeRemaining = timeLimit;
        this.completed = false;
        this.failed = false;
        this.startTime = Date.now();
    }

    // Mettre à jour le temps restant
    updateTime() {
        const elapsed = (Date.now() - this.startTime) / 1000;
        this.timeRemaining = Math.max(0, this.timeLimit - elapsed);
        
        if (this.timeRemaining <= 0 && !this.completed) {
            this.failed = true;
        }
    }

    // Marquer la commande comme complétée
    complete() {
        if (!this.failed && this.timeRemaining > 0) {
            this.completed = true;
            return this.reward;
        }
        return 0;
    }

    // Obtenir le statut de la commande
    getStatus() {
        if (this.completed) return "completed";
        if (this.failed) return "failed";
        return "in_progress";
    }

    // Obtenir le pourcentage de temps restant
    getTimeProgress() {
        return (this.timeRemaining / this.timeLimit) * 100;
    }
}

