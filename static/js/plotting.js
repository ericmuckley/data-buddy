




function plotScatter() {
  var data = JSON.parse(document.getElementById("sample-title-div").dataset.r)['plate-data']['records'];
  var colorVar = document.getElementById(`prop-select-${plotId}`).value;
  var colorVals = data.map(x => x[colorVar]);
  var scale = document.getElementById(`scale-select-${plotId}`).value;
  if (scale === 'Log'){
      colorVals = colorVals.map(x => Math.log10(x));
  };
  var plot = [{
      x: data.map(x => x['X']),
      y: data.map(x => x['Y']),
      type: 'scatter',
      mode: 'markers',
      text: colorVals.map(x => `VALUE: ${x}`),
      marker: {
          size: 8,
          colorscale: 'Jet',
          symbol: 'circle',
          line: {'width': 1, 'color': 'white'},
          color: colorVals,
          cmin: document.getElementById(`min-val-${plotId}`).value,
          cmax: document.getElementById(`max-val-${plotId}`).value,
      },
  }];
  var layout = {  
      //title: colorVar,
      xaxis: {showgrid: false, zeroline: false, range: [-32, 32]},
      yaxis: {scaleanchor: "x", automargin: true, showgrid: false, zeroline: false, range: [-32, 32]},
      hovermode:'closest',
      hoverlabel: {font: {size: 10}},
      width: getPlotlySize(),
      height: getPlotlySize(),
      margin: getPlotlyMargin(),
      showlegend: false,
  };
  if ([...new Set(colorVals)].length > 1) {
      plot[0]['marker']['colorbar'] = {len: 0.6, thickness: 10, thicknessmode: 'pixels',};
  };
  Plotly.newPlot(plotId, plot, layout, getPlotlyConfig());
  addHoverLogic(plotId);
};





function plotHistogram() {

  var data = JSON.parse(document.getElementById("data").dataset.data);
  var columnToPlot = document.getElementById('histogram-select').value;
  var vals = data.map(x => x[columnToPlot]);

  var plot = [{x: vals, type: 'histogram', marker: {color: 'darkorange'},}];

  var layout = {  
    xaxis: {title: columnToPlot},
    yaxis: {title: "Counts"},
    hovermode:'closest',
    //hoverlabel: {font: {size: 10}},
    width: getPlotlySize(),
    height: getPlotlySize(),
    margin: getPlotlyMargin(),
    showlegend: false,
    plot_bgcolor: "#dee2e6",
    paper_bgcolor: "#dee2e6",
  };

  Plotly.newPlot('histogram-plot-div', plot, layout, getPlotlyConfig());

  vals = vals.map(x => parseFloat(x));
  var tableData = [
    ['Min', d3.min(vals)],
    ['Max', d3.max(vals)],
    ['Min index', d3.minIndex(vals)],
    ['Max index', d3.maxIndex(vals)],
    ['Sum', d3.sum(vals)],
    ['Mean', d3.mean(vals)],
    ['Median', d3.median(vals)],
    ['Mode', d3.mode(vals)],
    ['Variance', d3.variance(vals)],
    ['Standard deviation', d3.deviation(vals)],
  ];
  var tableString = `<table class="table table-sm table-borderless"><tbody>`;
  for (let r of tableData){
    tableString += `<tr><th>${r[0]}</th><td>${r[1]}</td><tr>`
  };
  tableString += `</tbody></table>`;
  document.getElementById('histogram-stats-div').innerHTML = tableString;
};
