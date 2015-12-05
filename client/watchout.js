// start slingin' some d3 here.
var svg = d3.select('body').append('svg')
   .attr("width", 500)
   .attr("height", 500);
  

var dataset = [];

function randomPos(dataset) {
  for(var i =0; i < 50; i++ ) {
    dataset[i] = [Math.random()*500, Math.random()*500];
  }   
  return dataset;
}

var initialPos = randomPos(dataset);

var enemies = svg.selectAll('circle')
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
                 