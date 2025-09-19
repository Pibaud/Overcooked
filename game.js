

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
        this.usables = {};
        this.board = this.createBoard(); // matrice du jeu
        this.agents = [];
        this.aliments = {};
        this.score = 0
    }

    createBoard() {
        // Crée une matrice width x height avec des éléments de base
        // "ground", "table", "pot", "trash", "serving_belt", "onion_crate", "cutting_board"
        const board = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                let cellType = "ground";
                if (x === 8 && y === 0) {
                    cellType = "pot";
                } else if (x === 3 && y === 0) {
                    cellType = "onion_crate";
                } else if (x === 12 && y === 7) {
                    cellType = "trash";
                } else if (x === 0 && y === 7) {
                    cellType = "serving_belt";
                } else if (x === 4 && y === 8) {
                    cellType = "cutting_board";
                } else if (y === 0 || y === this.height-1 || x === 0 || x === this.width-1) {
                    cellType = "table";
                }
                row.push(cellType);
                // Instancie un objet Usable si la case est utilisable
                if (["pot", "onion_crate", "trash", "serving_belt", "cutting_board", "table"].includes(cellType)) {
                    this.usables[`${x},${y}`] = new Usable({x, y}, cellType);
                }
            }
            board.push(row);
        }
        console.log(board);
        return board;
    }

    addAgent(agent) {
        this.agents.push(agent);
    }

    addAliment(name, position) {
        this.aliments[name] = position;
    }

    update() {
        // Pour chaque agent, jouer son tour
        for (const agent of this.agents) {
            agent.turn(this);
        }
    }
}

