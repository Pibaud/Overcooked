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
                const onionCratePos = game.getUsablePosition('onionBox');

                this.tryToMove(onionCratePos,game);
                if (this.isOn(onionCratePos)) {
                    this.carried = 'oignon';
                }
            } else if (this.carried === 'oignon') {
                // Aller à la planche à découper
                const cuttingBoardPos = game.getUsablePosition('cuttingBoard');
                this.tryToMove(cuttingBoardPos,game);
                if (this.isOn(cuttingBoardPos)) {
                    this.carried = 'oignon_decoupe';
                }
            } else if (this.carried === 'oignon_decoupe') {
                // Aller au pot
                const potPos = game.getUsablePosition('pot');
                this.tryToMove(potPos,game);
                if (this.isOn(potPos)) {
                    this.carried = 'soupe_oignon';
                }
            } else if (this.carried === 'soupe_oignon') {
                // Aller au comptoir de service
                const servingBeltPos = game.getUsablePosition('servingBelt');
                this.tryToMove(servingBeltPos,game);
                if (this.isOn(servingBeltPos)) {
                    console.log(`${this.name} a servi une soupe d'oignon!`);
                    this.carried = null; // Servi
                    game.score += 12; // Augmente le score du jeu
                }
            }


        }
    }

    move(target,game){
    let check = false
    for (var z of adjacentCases(this.position,game)){if (z.x==target.x && z.y==target.y){check=true}}

    if (check==false){return false}

    if (game.board[target.x][target.y]!="ground"){return false}
    delete game.agents[`${this.position.x},${this.position.y}`]
    this.position = target
    game.agents[`${this.position.x},${this.position.y}`] = this

    }


    tryToMove(target,game) {
        console.log(target)
        if (!target) return;
        let path = pathfindToUsable(this.position,target,game)
        if (path!=false){this.move(path[1],game)}
    }



    isOn(target) {
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