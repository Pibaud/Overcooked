// servingBelt.js
// Classe pour le tapis roulant de service - permet de servir les plats aux clients


class ServingBelt extends Usable {
    constructor(position) {
        super(position, 'servingBelt');
        this.servedDishes = [];
        this.automatic = false; // Liste des timings des plats actuellement sur le tapis
    }

    // Override: vérifier si on peut utiliser le tapis roulant
    canUse(agent) {
        return super.canUse(agent);
    }

    // Override: utiliser le tapis pour servir un plat
    use(agent, game) {
        console.log("Trying to serve a dish...");
        if (!this.canUse(agent)) {
            return false;
        }

        // L'agent doit avoir un plat fini à servir
        if (!agent.carried || !this.isServableDish(agent.carried.name)) {
            return false;
        }

        //super.use(agent, item);
        this.servedDishes.push(Math.random()*200);
        console.log("game.orders.reward : ", game.orders);
        
        // Trouver la commande correspondante avec le temps restant le plus petit
        let matchingOrder = null;
        for (let order of game.orders) {
            if (order.recipe.name === agent.carried.name) {
                if (!matchingOrder || order.timeRemaining < matchingOrder.timeRemaining) {
                    matchingOrder = order;
                }
            }
        }
        if (matchingOrder) {
            game.score += matchingOrder.reward;
        }
        
        const taskIndex = game.tasks.indexOf(agent.task);
        if (taskIndex > -1) {
            game.tasks.splice(taskIndex, 1);
        }
        agent.carried = null; // L'agent dépose le plat
        agent.task = undefined;
        
        return true;
    }

    // Vérifier si un objet est un plat servable
    isServableDish(item) {
        const servableDishes = ['onionSoup', 'mixed_soup', 'salad', 'burger'];
        return servableDishes.includes(item);
    }


    // Nettoyer le tapis (retirer tous les plats)
    clear() {
        this.servedDishes = [];
        this.dishTimestamps.clear();
    }

    // Override: obtenir des informations sur le tapis roulant
    getInfo() {
        return {
            ...super.getInfo(),
            servedDishes: this.servedDishes,
            dishCount: this.getDishCount(),
            maxCapacity: this.maxCapacity,
            isFull: this.isFull(),
            isEmpty: this.isEmpty(),
            dishesWithTime: this.getDishesWithTime()
        };
    }
}

