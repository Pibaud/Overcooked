class MinHeap {
    constructor(compareFn) {
        this.data = [];
        this.compare = compareFn;
    }

    insert(item) {
        this.data.push(item);
        this.bubbleUp();
    }

    extractMin() {
        const min = this.data[0];
        const last = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = last;
            this.bubbleDown();
        }
        return min;
    }

    find(predicate) {
        return this.data.find(predicate);
    }

    isEmpty() {
        return this.data.length === 0;
    }

    bubbleUp() {
        let index = this.data.length - 1;
        const item = this.data[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.data[parentIndex];
            if (this.compare(item, parent) >= 0) break;

            this.data[index] = parent;
            index = parentIndex;
        }
        this.data[index] = item;
    }

    bubbleDown() {
        let index = 0;
        const length = this.data.length;
        const item = this.data[index];

        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.compare(this.data[left], this.data[smallest]) < 0) {
                smallest = left;
            }
            if (right < length && this.compare(this.data[right], this.data[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === index) break;

            this.data[index] = this.data[smallest];
            index = smallest;
        }
        this.data[index] = item;
    }
}





function adjacentCases(position,game){
    let cases = [position]
    if (position.x>0){cases.push({"x":position.x-1,"y":position.y})}
    if (position.x<game.width-1){cases.push({"x":position.x+1,"y":position.y})}
    if (position.y>0){cases.push({"x":position.x,"y":position.y-1})}
    if (position.y<game.height-1){cases.push({"x":position.x,"y":position.y+1})}
    return cases
}

function distance(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}



function pathFind(start, goal, game) {
  
    let open = new MinHeap((a, b) => a.f - b.f);
    let closed = new Set();
    let cameFrom = new Map(); // store parent references

    open.insert({ pos: start, g: 0, h: distance(start, goal), f: distance(start, goal) });

    while (!open.isEmpty()) {
        let current = open.extractMin();
        let { pos, g } = current;
        let key = `${pos.x},${pos.y}`;

        // Check if we reached goal
        if (pos.x === goal.x && pos.y === goal.y) {
            let path = [];
            let curKey = key;
            while (curKey) {
                let [cx, cy] = curKey.split(",").map(Number);
                path.push({ x: cx, y: cy });
                curKey = cameFrom.get(curKey);
            }
            return path.reverse();
        }

        if (closed.has(key)) continue;
        closed.add(key);

        // Explore neighbors
        for (let neighbor of adjacentCases(pos, game)) {
            let nKey = `${neighbor.x},${neighbor.y}`;

            // Skip blocked cells
            if (game.board[neighbor.x][neighbor.y] != "ground" || game.agents[`${neighbor.x},${neighbor.y}`]!=undefined) continue;
            if (closed.has(nKey)) continue;

            let tentativeG = g + 1; // cost is always 1 for "floor"
            let h = distance(neighbor, goal);
            let f = tentativeG + h;

            let existing = open.find(n => n.pos.x === neighbor.x && n.pos.y === neighbor.y);
            if (existing && tentativeG >= existing.g) {
                continue;
            }

            cameFrom.set(nKey, key);
            open.insert({ pos: neighbor, g: tentativeG, h, f });
        }
    }

    return false; // No path found
}

function pathfindToUsable(start,goal,game){
    if ((game.usables[`${goal.x},${goal.y}`])==undefined) {return end}

    var possibleCases = adjacentCases(goal,game).sort((a,b)=>distance(start,a)-distance(start,b))
    for (var z of possibleCases){
        if (game.board[z.x][z.y]!="ground" || game.agents[`${z.x},${z.y}`]!=undefined){continue}
        let pathTest = pathFind(start,z,game)
        if (pathTest!=false){return pathTest}
    }
return false
}