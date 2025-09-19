// usable.js
// Classe mère pour tous les éléments utilisables/interactifs de la map

class Usable {
    constructor(position, type) {
        this.position = position; // {x, y} position sur la map
        this.type = type; // type d'élément (sink, cutting_board, pot, etc.)
        this.content = null; // ce que contient l'élément (ingrédient, plat, etc.)
        this.inUse = false; // si un agent utilise actuellement cet élément
    }

    // Vérifier si l'élément peut être utilisé
    canUse(agent) {
        return !this.inUse;
    }

    // Utiliser l'élément (à override dans les classes filles)
    use(agent, item = null) {
        if (!this.canUse(agent)) {
            return false;
        }
        this.inUse = true;
        return true;
    }

    // Terminer l'utilisation de l'élément
    finishUse() {
        this.inUse = false;
    }

    // Placer un objet sur/dans l'élément
    place(item) {
        if (this.content === null) {
            this.content = item;
            return true;
        }
        return false;
    }

    // Récupérer l'objet de l'élément
    take() {
        const item = this.content;
        this.content = null;
        return item;
    }

    // Vérifier si l'élément contient quelque chose
    hasContent() {
        return this.content !== null;
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

