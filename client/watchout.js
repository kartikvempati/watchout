// start slingin' some d3 here.
var svg = d3.select('body').append('svg')
   .attr('class', 'svg')
   .attr("width", 500)
   .attr("height", 500)  


/* ENEMY DATA*/

var dataset = [];


function randomPos(dataset) {
  for(var i =0; i < 25; i++ ) {
    dataset[i] = [Math.random()*500, Math.random()*500];
  }   
  return dataset;
}


var initialPos = randomPos(dataset);
var collisionCount = 0;
var enemies = svg.selectAll('enemy')
                 .data(dataset)
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


/* PLAYER DATA */
//Hoisting

var px = 250;
var py = 250;

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
  d3.selectAll('#current-score').text(score.toString());
  d3.selectAll('#collisions').text(collisionCount.toString());

}

function updateHighScore() {
  var highScore = d3.selectAll('#high-score');
  if (score > highScore.text()){
    highScore.text(score.toString());
  }
}

var collision = function() {

  var curX = parseFloat(enemies.attr('cx'));
  var curY = parseFloat(enemies.attr('cy'));

  console.log(curX);
  return function () {
    // if(curX !== playerX && curY !== playerY){
    
    var distance = Math.sqrt(Math.pow(px - enemies.attr('cx'), 2)+(Math.pow(py- enemies.attr('cy'), 2)));
    var collisionDist = parseFloat(enemies.attr('r'))+parseFloat(player.attr('r'));
    // console.log(collisionDist);
    if (collisionDist >= distance){
      collisionCount++;
      console.log('COLLISION');
      updateScore();
      updateHighScore();
      score = 0;
    }
  }
};
var score = 0;

var update = function(){
  var futurePos = randomPos(dataset);

  // Enter is only for new data bindings. If data is already 
  // bound to the target, enter is not needed.
  enemies.data(futurePos)
          .transition().duration(1000)
          .tween('custom', collision)
          .attr('cx', function (d) {
            return d[0];
          })
          .attr('cy', function (d) {
            //console.log(py-d[1]);
            return d[1];
          })
  setInterval(updateScore, 100);
};

setInterval(update, 1000);                 
