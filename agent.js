// agent.js
// Classe Agent séparée du jeu

class Agent {
    constructor(type, position,name) {
        this.type = type; // 'cuistot', 'client', etc.
        this.name=name
        this.position = position; // {x, y}
        this.objective = null;
        this.carried = null;
    }

    turn(game) {
        // Logique de tour automatique (exemple simple)
        if (this.type === 'chief') {
            this.objective = 'faire_soupe_oignon';
            // Aller chercher un oignon
            if (!this.carried) {
                const onionCratePos = game.getUsablePosition('onion_crate');
                this.move(onionCratePos);
                if (this.isOn(onionCratePos)) {
                    this.carried = 'oignon';
                }
            } else if (this.carried === 'oignon') {
                // Aller à la planche à découper
                const cuttingBoardPos = game.getUsablePosition('cutting_board');
                this.move(cuttingBoardPos);
                if (this.isOn(cuttingBoardPos)) {
                    this.carried = 'oignon_decoupe';
                }
            } else if (this.carried === 'oignon_decoupe') {
                // Aller au pot
                const potPos = game.getUsablePosition('pot');
                this.move(potPos);
                if (this.isOn(potPos)) {
                    this.carried = 'soupe_oignon';
                }
            } else if (this.carried === 'soupe_oignon') {
                // Aller au comptoir de service
                const servingBeltPos = game.getUsablePosition('serving_belt');
                this.move(servingBeltPos);
                if (this.isOn(servingBeltPos)) {
                    console.log(`${this.name} a servi une soupe d'oignon!`);
                    this.carried = null; // Servi
                    game.score += 12; // Augmente le score du jeu
                }
            }
        }
    }

    move(target) {
        // Déplacement simple vers la cible
        console.log("target:", target);
        if (!target) return;
        if (this.position.x < target.x && this.position.x < 11) this.position.x++;
        else if (this.position.x > target.x && this.position.x > 1) this.position.x--;
        else if (this.position.y < target.y && this.position.y < 7) this.position.y++;
        else if (this.position.y > target.y && this.position.y > 1) this.position.y--;
    }

    isOn(target) {
        console.log("isOn check:", this.position, target);
        console.log("distance:", Math.abs((this.position.x-target.x))+Math.abs(this.position.y-target.y));
        return (Math.abs((this.position.x-target.x))+Math.abs(this.position.y-target.y)<=1)
    }

    addObjective(objective) {
        this.objective = objective;
    }
}

class Chief extends Agent{
    
 constructor( position) {
    super("chief",position,"gato le cuistot")
       
    }




}