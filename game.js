

class Game {
    // Retourne la position du premier usable de type donné
    getUsablePosition(type) {
        for (const key in this.usables) {
            if (this.usables[key].type === type) {
                return this.usables[key].position;
            }
        }
        return null;
    }
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.score = 0
        
        this.orders = []
        this.tasks = []
        
        this.agents = {};
        this.usables = {};
        this.aliments = {};
        this.board = this.createBoard();
    }

    createBoard() {
        // Crée une matrice width x height avec des éléments de base
        // "ground", "table", "pot", "trash", "servingBelt", "onionBox", "cuttingBoard"
        let board = [];
        for (let x = 0; x < this.width; x++) {
        let col = [];
                for (let y = 0; y < this.height; y++) {
                let cellType = "ground";
                if (x === 8 && y === 0) {
                    cellType = "pot";
                } else if (x === 3 && y === 0) {
                    cellType = "onionBox";
                } else if (x === 12 && y === 7) {
                    cellType = "trash";
                } else if (x === 0 && y === 7) {
                    cellType = "servingBelt";
                } else if (x === 4 && y === 8) {
                    cellType = "cuttingBoard";
                } else if ((y === 0 || y === this.height-1 || x === 0 || x === this.width-1)|| (x===7 && y!=7)|| (x===8 && y===6)) {
                    cellType = "table";
                }
                col.push(cellType);
                // Instancie un objet Usable si la case est utilisable
                if (["pot", "onionBox", "trash", "servingBelt", "cuttingBoard"].includes(cellType)) {
                    this.usables[`${x},${y}`] = eval(("new "+cellType.charAt(0).toUpperCase() + cellType.slice(1)+"({'x':"+x+",'y':" +y+"})") ) ;
                }
            }
            board.push(col);
        }
        this.usables["0,2"] = new plate({"x":0,"y":2})
        console.log(board);
        return board;
    }

    addAgent(agent) {
        this.agents[`${agent.position.x},${agent.position.y}`]= agent;
    }

    addAliment(name, position) {
        this.aliments[name] = position;
    }

    addOrder(order){
        this.orders.push(order)
        order.addTasks(this)
    }

    

    findClosestAliment(position,targetAliment){
        var bestPos;
        for (var zIndex of Object.keys(this.aliments)){
            var z = this.aliments[zIndex]
            if (z.name==targetAliment.name){ 
                var zPosTab = zIndex.split(",") ; let zPos = {"x": parseInt(zPosTab[0]),"y":parseInt(zPosTab[1])}
                if (bestPos==undefined || distance(position,{"x": parseInt(zPos[0]),"y":parseInt(zPos[1])})<distance(position,bestPos)){
                    bestPos = zPos
                }
            }
        }
        
        for (var zIndex of Object.keys(this.usables)){
            var z = this.usables[zIndex]
            if ((z.type==(targetAliment.name+targetAliment.origin.charAt(0).toUpperCase()+targetAliment.origin.slice(1)))
               ||(z.type=="pot" && z.pickupable==true && z.ingredients==targetAliment.name) ){ 
                var zPosTab = zIndex.split(",") ; let zPos = {"x": parseInt(zPosTab[0]),"y":parseInt(zPosTab[1])}
                if (bestPos==undefined || distance(position,{"x": parseInt(zPos[0]),"y":parseInt(zPos[1])})<distance(position,bestPos)){
                    bestPos = zPos
                }
            }

       



        }
        
        return bestPos

    }


    findClosestUsable(position,targetUsable){
        var bestPos;
        for (var zIndex of Object.keys(this.usables)){
            var z = this.usables[zIndex]
            if (z.type==targetUsable){ 
                var zPosTab = zIndex.split(",") ; let zPos = {"x": parseInt(zPosTab[0]),"y":parseInt(zPosTab[1])}
                if (bestPos==undefined || distance(position,{"x": parseInt(zPos[0]),"y":parseInt(zPos[1])})<distance(position,bestPos)){
                    bestPos = zPos
                }
            }
        }
        return bestPos
    }


    update() {
        // Pour chaque agent, jouer son tour
       
        for (let agent of Object.keys(this.agents)) {
            this.agents[agent].turn(this);
        }
        for (let key in this.usables) {
            const usable = this.usables[key];
            if (usable.automatic) {
                usable.cooking(this);
            }
        }
    }
}

