// agent.js
// Classe Agent séparée du jeu

class Agent {
    constructor(type, position,name) {
        this.type = type; // 'cuistot', 'client', etc.
        this.name=name
        this.position = position; // {x, y}
        this.objective = null;
        this.task = null;
        this.carried = null;
    }

turn(game) {

console.log("-----------------------TURN----------------------")
this.choseTask(game)
if (this.task!=undefined){this.doTask(game)}


/* 

// Logique de tour automatique (exemple simple)
if (this.type === 'chief') {
            this.objective = 'faire_soupe_onion';
            // Aller chercher un onion
            if (!this.carried) {
                const onionCratePos = game.getUsablePosition('onionBox');

                this.tryToMove(onionCratePos,game);
                if (this.isOn(onionCratePos)) {
                    this.carried = 'onion';
                }
            } else if (this.carried === 'onion') {
                // Aller à la planche à découper
                const cuttingBoardPos = game.getUsablePosition('cuttingBoard');
                this.tryToMove(cuttingBoardPos,game);
                if (this.isOn(cuttingBoardPos)) {
                    this.carried = 'onion_decoupe';
                }
            } else if (this.carried === 'onion_decoupe') {
                // Aller au pot
                const potPos = game.getUsablePosition('pot');
                this.tryToMove(potPos,game);
                if (this.isOn(potPos)) {
                    this.carried = 'soupe_onion';
                }
            } else if (this.carried === 'soupe_onion') {
                // Aller au comptoir de service
                const servingBeltPos = game.getUsablePosition('servingBelt');
                this.tryToMove(servingBeltPos,game);
                if (this.isOn(servingBeltPos)) {
                    console.log(`${this.name} a servi une soupe d'onion!`);
                    this.carried = null; // Servi
                    game.score += 12; // Augmente le score du jeu
                }
            }
            
            
        }
        */
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
        if (!target) return;
        let path = pathfindToUsable(this.position,target,game)
        if (path!=false){this.move(path[1],game)}
    }



    isOn(target) {
        return (Math.abs((this.position.x-target.x))+Math.abs(this.position.y-target.y)<=1)
    }


    choseTask(game){

        if (this.task!=undefined){return}

        for (var tIndex in game.tasks){
            var t = game.tasks[tIndex]
            if (this.canDoTask(game,t)){
                this.task = game.tasks.splice(tIndex,1)[0] 
                console.log(this.name+" choosed task with usable "+this.task.usable)
                return
            }
        }
    }


    canDoTask(game){
        return true
    }



    doTask(game){//Main function for the agent's AI. Checks if it has the right held item for the task and tried to accomplish said task
        if (this.task==undefined){return false}
        if (this.carried==undefined ||  this.carried.name!=this.task.targetAliment.name){
            this.findAliment(game)
        }
        else{
            this.doTaskUsable(game)
        }
    }

    findAliment(game){
        let bestAlimentPosition = game.findClosestAliment(this.position,this.task.targetAliment)
        if (this.isOn(bestAlimentPosition)){
            //check if aliment or box
            if ( game.aliments[bestAlimentPosition.x+","+bestAlimentPosition.y]!=undefined && game.aliments[bestAlimentPosition.x+","+bestAlimentPosition.y].name==this.task.targetAliment.name){
                this.carried = game.aliments[bestAlimentPosition.x+","+bestAlimentPosition.y]
                delete game.aliments[bestAlimentPosition.x+","+bestAlimentPosition.y]
            }
            if (game.usables[bestAlimentPosition.x+","+bestAlimentPosition.y]!=undefined && game.usables[bestAlimentPosition.x+","+bestAlimentPosition.y].type==this.task.targetAliment.name+this.task.targetAliment.origin.charAt(0).toUpperCase()+this.task.targetAliment.origin.slice(1)){
                console.log("J'UTILISE LA CAISSE D OIGNONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                game.usables[bestAlimentPosition.x+","+bestAlimentPosition.y].use(this,game)
                console.log(this.carried)
            }
        }
        else{
            this.tryToMove(bestAlimentPosition,game)
        }




    }

    doTaskUsable(game){//called if the agent has the right aliment, makes it try to accomplish the task
        if (this.carried==undefined){
            console.log(this.name+" has no aliment to do the task")
            return false
        }
        //find the usable
        let usablePos = game.findClosestUsable(this.position, this.task.usable)
        //console.log("bestUsablePos = ")
        //console.dir(usablePos)
        this.tryToMove(usablePos,game) // move to usable
        if (this.isOn(usablePos)){
            let usable = game.usables[usablePos.x+","+usablePos.y]
            console.log(this.carried.name)
            usable.use(this, game)
        return true
    }
    
}

}

class Chief extends Agent{
    
 constructor( position) {
    super("chief",position,"gato le cuistot")
       
    }




}
