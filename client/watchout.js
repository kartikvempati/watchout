// start slingin' some d3 here.
var svg = d3.select('body').append('svg')
   .attr("width", 500)
   .attr("height", 500);
  


/* ENEMY DATA*/

var dataset = [];


function randomPos(dataset) {
  for(var i =0; i < 50; i++ ) {
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

var drag = d3.behavior.drag()
              .on('drag', function(){
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
  enemies.data(randomPos(dataset))
          .transition().duration(500)
          .attr('cx', function (d) {
            return d[0];
          })
          .attr('cy', function (d) {
            return d[1];
          })
};

setInterval(update, 1000);                 