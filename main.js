




console.log("main.js loaded")

function drawBoard(game){
let height = game.height
let width = game.width



//init the board    
const squareSize = 50; // width & height of each square
const padding = 5;     // space between squares


    const svg = d3.select("#boardDiv").attr("width", width * (squareSize + padding))
                  .attr("height", height * (squareSize + padding));

    //-------------draw the grid

    let colorsForType = {
        "ground":"aliceblue",
        "trash":"darkgray",
        "table":"peru",
        "pot":"darkRed",
        "onion_crate":"sandybrown",
        "cutting_board":"saddlebrown",
        "serving_belt":"limeGreen"




    }

    //----------------Grid

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        svg.append("rect")
          .attr("x", col * (squareSize + padding))
          .attr("y", row * (squareSize + padding))
          .attr("width", squareSize)
          .attr("height", squareSize)
          .attr("fill", colorsForType[game.board[row][col]]
          )
          .attr("stroke", "black")
          .attr("id","square"+col+"_"+row)
      }
    }

        //----------------agents


    for (let ag of game.agents){
        console.log(ag)
        console.log("square"+ag.position.x+"_"+ag.position.y)
        let imgSize = squareSize*1.2
        let sq = d3.select("#square" + ag.position.y + "_" + ag.position.x);

        
        svg.append("image")
            .attr("xlink:href", "resources/chief.png")          // path to your image
         .attr("x", ag.position.x * (squareSize + padding) + (squareSize - imgSize)/2)
         .attr("y", ag.position.y * (squareSize + padding) + (squareSize - imgSize)/2)
         .attr("width", imgSize)
         .attr("height", imgSize)
         .attr("id","agent"+ag.position.x+"_"+ag.position.y);    



    }



}


function updateSideBoard(game){
    let board = document.getElementById("sideBoardBody")
    let html = ""

    for (let ag of game.agents){
        html +=" <tr><td>"+ag.name+"</td><td>"+(ag.carried==undefined? "Nothing":ag.carried)+"</td><td>"+ag.position.x+"_"+ag.position.y+"</td><td>"+ag.objective+"</td></tr>"
        
    }

    board.innerHTML = html
    document.getElementById("score").innerHTML = "Revenu: "+game.score+"£"
} 


function gameStep(game){
drawBoard(game)
updateSideBoard(game)



}


function recHugo(game){
    game.update()
    drawBoard(game)
    updateSideBoard(game)
    setTimeout(function(){recHugo(game)
}, 250);
}


document.addEventListener("DOMContentLoaded", () => {
    let testGame = new Game(13, 9);

    gato = new Chief({x: 1, y: 2})
    testGame.addAgent(gato);
    console.log(testGame.agents)
    // while True:
        //let recipe1 = new Recipe("onion_soup", ["onion"], ["taken_oignon", "cut_oignon", "put_pot", "take_soupe"]);
        //let order1 = new Order(recipe1, 180, 15);
        //gato.addObjective(order1)

    
    
    
    drawBoard(testGame)



    recHugo(testGame)



})
