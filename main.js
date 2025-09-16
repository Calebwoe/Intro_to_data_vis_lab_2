d3.json("GlobalTemperatures.json").then(function(data) {
  console.log(data);  // <- check that data is loading
});


d3.json("GlobalTemperatures.json").then(function(data) {
  const svg = d3.select("#chart1")
                .attr("width", 900)
                .attr("height", 500);

  const width = 900, height = 500;

  // Create scales
  const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.time))   // min/max of time
      .range([40, width-40]);

  const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.LAT))    // min/max temp
      .range([height-40, 40]);

  const rScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.LATU))   // min/max uncertainty
      .range([2, 10]);

  // Bind data to circles
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.time))
    .attr("cy", d => yScale(d.LAT))
    .attr("r", d => rScale(d.LATU))
    .attr("fill", "steelblue")
    .attr("opacity", 0.6);
});
