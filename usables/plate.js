

class plate extends Usable {
    constructor(position) {
        super(position, 'plate');
        this.aliments = []
        this.hasSpecialSprite = true
    }

    canUse(agent) {
    }

    // Override: utiliser la planche pour découper un ingrédient
    use(agent, item = null) {
      
    }

}

