// servingBelt.js
// Classe pour le tapis roulant de service - permet de servir les plats aux clients


class ServingBelt extends Usable {
    constructor(position) {
        super(position, 'servingBelt');
        this.servedDishes = []; // File des plats servis
        this.maxCapacity = 5; // Capacité maximale du tapis
        this.deliveryTime = 1000; // Temps avant qu'un plat soit "livré" (en ms)
        this.dishTimestamps = new Map(); // Timestamps des plats ajoutés
    }

    // Override: vérifier si on peut utiliser le tapis roulant
    canUse(agent) {
        return super.canUse(agent) && this.servedDishes.length < this.maxCapacity;
    }

    // Override: utiliser le tapis pour servir un plat
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }

        // L'agent doit avoir un plat fini à servir
        if (!agent.carried || !this.isServableDish(agent.carried)) {
            return false;
        }

        super.use(agent, item);
        this.serveDish(agent.carried, agent);
        
        return true;
    }

    // Vérifier si un objet est un plat servable
    isServableDish(item) {
        const servableDishes = ['onion_soup', 'mixed_soup', 'salad', 'burger'];
        return servableDishes.includes(item);
    }

    // Servir un plat sur le tapis
    serveDish(dish, agent) {
        this.servedDishes.push(dish);
        this.dishTimestamps.set(dish, Date.now());
        agent.carried = null;
        this.finishUse();
    }

    // Mettre à jour le tapis roulant
    update() {
        const currentTime = Date.now();
        
        // Supprimer les plats qui ont été "livrés" (après deliveryTime)
        this.servedDishes = this.servedDishes.filter(dish => {
            const servedTime = this.dishTimestamps.get(dish);
            if (currentTime - servedTime >= this.deliveryTime) {
                this.dishTimestamps.delete(dish);
                return false; // Retirer de la liste
            }
            return true; // Garder dans la liste
        });
    }

    // Obtenir le nombre de plats actuellement sur le tapis
    getDishCount() {
        return this.servedDishes.length;
    }

    // Vérifier si le tapis est plein
    isFull() {
        return this.servedDishes.length >= this.maxCapacity;
    }

    // Vérifier si le tapis est vide
    isEmpty() {
        return this.servedDishes.length === 0;
    }

    // Obtenir la liste des plats avec leur temps restant
    getDishesWithTime() {
        const currentTime = Date.now();
        return this.servedDishes.map(dish => {
            const servedTime = this.dishTimestamps.get(dish);
            const timeRemaining = Math.max(0, this.deliveryTime - (currentTime - servedTime));
            return {
                dish,
                timeRemaining,
                progress: ((this.deliveryTime - timeRemaining) / this.deliveryTime) * 100
            };
        });
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

