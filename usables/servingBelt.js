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
        if (!this.canUse(agent)) {
            return false;
        }

        // L'agent doit avoir un plat fini à servir
        if (!agent.carried || !this.isServableDish(agent.carried.name)) {
            return false;
        }

        //super.use(agent, item);
        agent.carried = null; // L'agent dépose le plat
        this.servedDishes.push(Math.random()*200);
        game.score += game.order.reward;
        game.tasks.remove(agent.task);
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

