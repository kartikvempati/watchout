// start slingin' some d3 here.
var svg = d3.select('body').append('svg')
   .attr('class', 'svg')
   .attr("width", 500)
   .attr("height", 500)  


/* ENEMY DATA*/
var score = 0;
var dataset = [];


function randomPos(dataset) {
  for(var i =0; i < 3; i++ ) {
    dataset[i] = [Math.random()*500, Math.random()*500];
  }   
  return dataset;
}


var initialPos = randomPos(dataset);

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

var px;
var py;

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



var update = function(){

  score++;
  d3.selectAll('.current').text("Current Score: " + score);
  var futurePos = randomPos(dataset);
  // var enemyX = futurePos[0][0];
  // var enemyY = futurePos[0][1];
  // Math.sqrt(Math.pow(px - enemyX , 2)+(Math.pow(py - enemyY , 2)));
  var colDistance = 20;

  // Enter is only for new data bindings. If data is already 
  // bound to the target, enter is not needed.
  enemies.data(futurePos)
          .transition().duration(1000)
          .attr('cx', function (d) {
            if(px - d[0] < 20){
              score = 0;
            }
            
            return d[0];
          })
          .attr('cy', function (d) {
            console.log(py-d[1]);
            return d[1];
          })
};

setInterval(update, 1000);                 