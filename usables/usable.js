// usable.js
// Classe mère pour tous les éléments utilisables/interactifs de la map

class Usable {
    constructor(position, type) {
        this.position = position; // {x, y} position sur la map
        this.type = type; // type d'élément (sink, cutting_board, pot, etc.)
        this.content = null; // ce que contient l'élément (ingrédient, plat, etc.)
        this.isUsing = null; // si un agent utilise actuellement cet élément
        this.automatic = true;
    }

    // Vérifier si l'élément peut être utilisé
    canUse(agent) {
        return true;
        return ((this.isUsing === null) || (agent == agent));
    }

    // Utiliser l'élément (à override dans les classes filles)
    use(agent, game) {
        if (!this.canUse(agent)) {
            return false;
        }
        this.isUsing = agent;
        return true;
    }

    // Terminer l'utilisation de l'élément
    finishUse() {
        this.isUsing = null;
    }

    cooking(game) {
        if (!this.automatic){
            console.log("we should not be here");
            return false;
        }
    }


    // Obtenir des informations sur l'élément
    getInfo() {
        return {
            type: this.type,
            position: this.position,
            content: this.content,
            inUse: this.inUse
        };
    }
}

