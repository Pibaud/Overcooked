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
    use(agent, item = null, game) {
        if (!this.canUse(agent)) {
            return false;
        }

        // L'agent doit avoir un plat fini à servir
        if (!agent.carried || !this.isServableDish(agent.carried)) {
            return false;
        }

        super.use(agent, item);
        this.agent.carried = null; // L'agent dépose le plat
        this.servedDishes.push(Math.random()*200);
        this.game.score += this.game.order.reward;
        this.game.tasks.remove(this.agent.task);
        this.agent.task = null;
        
        return true;
    }

    // Vérifier si un objet est un plat servable
    isServableDish(item) {
        const servableDishes = ['onion_soup', 'mixed_soup', 'salad', 'burger'];
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

