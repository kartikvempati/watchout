// Global variables
var dataset = [];
var collisionCount = 0;
var px = 250;
var py = 250;
var score = 0;
var initialPos = randomPos(dataset);


// start slingin' some d3 here.

// Requirement 1: Draw the enemies in an SVG element
var svg = d3.select('body').append('svg')
   .attr('class', 'svg')
   .attr("width", 500)
   .attr("height", 500)  


function randomPos(dataset) {

  for(var i =0; i < 3; i++ ) {
    dataset[i] = [Math.random()*500, Math.random()*500];
  }   
  return dataset;
}


var enemies = svg.selectAll('enemy')
                 .data(initialPos)
                 .enter()
                 .append("svg:circle")
                 .attr('cx', function(d) {
                  return d[0] + 'px';
                 })
                 .attr('cy', function(d) {
                  return d[1] + 'px';
                 })
                 .attr('r', 10 + 'px')
                 .attr("fill", "yellow")
                 .attr("stroke", "orange")
                 .attr("stroke-width", 5);


var move = function() {
    enemies
      .transition()
      .ease('linear')
      .duration(1000)
      .attr('cx', function(d) {
          return d[0] + 'px'
        })
      .attr('cy', function(d) {
          return d[1] + 'px'
      })
      .each('end', move);
  };
move();

/* PLAYER DATA */
//Hoisting


var drag = d3.behavior.drag()
              .on('drag', function(){
                px = d3.event.x;
                py = d3.event.y;
                player.attr('cx', d3.event.x + 'px')
                      .attr('cy', d3.event.y + 'px');
                });

var player = svg.selectAll('player')
            .data([250, 250])
            .enter()
            .append("svg:circle")
            .attr('cx', 250 + 'px')
            .attr('cy', 250 + 'px')
            .attr('r', 10 + 'px')
            .call(drag);


function updateScore() {
  score = score+1;
  d3.select('#current-score').text(score.toString());
  d3.select('#collisions').text(collisionCount.toString());


}

function updateHighScore() {
  var highScore = d3.select('#high-score');
  if (score > highScore.text()){
    highScore.text(score.toString());
  }
}

function onCollision () {
          collisionCount++;
          // updateScore();
          // updateHighScore();
          score = 0;
          collisionBool = false;
}
var collisionBool = false;

var collision = function() {
  enemies.each(function() {
    enemy = d3.select(this);
    var curX = parseFloat(enemy.attr('cx'));
    var curY = parseFloat(enemy.attr('cy'));
    var collisionX;
    var collisionY;
    // return function () {
    var distance = Math.sqrt(Math.pow(px - enemy.attr('cx'), 2)+(Math.pow(py- enemy.attr('cy'), 2)));
    var collisionDist = parseFloat(enemies.attr('r'))+parseFloat(player.attr('r')); 
    if (collisionDist >= distance){
      console.log("should work")
      //collisionBool = true;
      if(collisionX && collisionY){
        if(Math.sqrt(Math.pow(collisionX - curX, 2)+(Math.pow(collisionY- curY, 2))) > 20) {
          collisionY = curY;
          collisionX = curX;
          updateScore();
          updateHighScore();
          score = 0;
        }
      }
      else{
        collisionX = curX;
        collisionY = curY;
        updateScore();
        updateHighScore();
        score = 0;
      }
    }
    // }
  })
  //console.log("tween");
};

var update = function(){
  var futurePos = randomPos(dataset);


  // Enter is only for new data bindings. If data is already 
  // bound to the target, enter is not needed.
  enemies.data(futurePos)
         .transition()
         .duration(2000)
         .tween('custom', collision)

  // if(collisionBool) {
  //   onCollision();
  // }        

  setInterval(updateScore, 200);
};

setInterval(update,2000);
             
