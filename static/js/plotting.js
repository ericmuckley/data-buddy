
function plotScatter() {
  var data = JSON.parse(document.getElementById("file-upload").dataset.data);
  var xcol = document.getElementById('x-axis-select').value;
  var ycol = document.getElementById('y-axis-select').value;
  var xvals = data.map(x => x[xcol]);
  var yvals = data.map(x => x[ycol]);

  var plot = [{
      x: xvals,
      y: yvals,
      type: 'scatter',
      mode: 'markers',
      //text: colorVals.map(x => `VALUE: ${x}`),
      marker: {
          size: 8,
          color: 'darkorange',
          //colorscale: 'Jet',
          symbol: 'circle',
          line: {'width': 1, 'color': 'white'},
          //color: colorVals,
      },
  }];
  var layout = {  
      xaxis: {title: xcol, automargin: true},
      yaxis: {title: ycol, automargin: true},
      hovermode:'closest',
      //hoverlabel: {font: {size: 10}},
      width: getPlotlySize()*1.5,
      height: getPlotlySize(),
      margin: getPlotlyMargin(),
      showlegend: false,
      plot_bgcolor: getbackgroundColor(),
      paper_bgcolor: getbackgroundColor(),
  };
  //if ([...new Set(colorVals)].length > 1) {
  //    plot[0]['marker']['colorbar'] = {len: 0.6, thickness: 10, thicknessmode: 'pixels',};
  //};
  Plotly.newPlot('scatter-plot-div', plot, layout, getPlotlyConfig());

};









function plotHistogram() {

  var data = JSON.parse(document.getElementById("file-upload").dataset.data);
  var columnToPlot = document.getElementById('histogram-select').value;
  var vals = data.map(x => x[columnToPlot]);

  var plot = [{x: vals, type: 'histogram', marker: {color: 'darkorange'},}];

  var layout = {  
    xaxis: {title: columnToPlot, automargin: true},
    yaxis: {title: "Counts", automargin: true},
    hovermode:'closest',
    //hoverlabel: {font: {size: 10}},
    width: getPlotlySize(),
    height: getPlotlySize(),
    margin: getPlotlyMargin(),
    showlegend: false,
    plot_bgcolor: getbackgroundColor(),
    paper_bgcolor: getbackgroundColor(),
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
    ['Std. deviation', d3.deviation(vals)],
  ];
  var tableString = `<table class="table table-sm table-borderless" style="font-size: 0.8rem;"><tbody>`;
  for (let r of tableData){
    tableString += `<tr><th>${r[0]}</th><td>${r[1]}</td><tr>`
  };
  tableString += `</tbody></table>`;
  document.getElementById('histogram-stats-div').innerHTML = tableString;
};





// from a dataset in the form of an array of
// objects, create a map of all the column correlations

function getCorrelationMap(data){
  var columns = Object.keys(data[0]);
  r2Map = [];
  var x;
  var y;
  var r2;
  for (let c of columns){
    mapRow = [];
    for (let c2 of columns){
      x = data.map(x => parseFloat(x[c]));
      y = data.map(x => parseFloat(x[c2]));
      r2 = getR2(x, y);
      mapRow.push(r2);
    };
    r2Map.push(mapRow);
  };
  return [r2Map, columns];
};





function plotCorrelationMap(){

  var data = JSON.parse(document.getElementById("file-upload").dataset.data);
  var [r2Map, columns] = getCorrelationMap(data);

  var plot = [{
      z: r2Map,
      x: columns,
      y: columns,
      type: 'heatmap',
      hoverongaps: false,
      colorscale: 'Portland',
    }];
  
  var layout = {
    xaxis: {automargin: true},
    yaxis: {scaleanchor: "x", automargin: true},
    hovermode:'closest',
    width: getPlotlySize()*1.5,
    height: getPlotlySize()*1.5,
    margin: getPlotlyMargin(),
    showlegend: false,
    plot_bgcolor: getbackgroundColor(),
    paper_bgcolor: getbackgroundColor(),
  };

  Plotly.newPlot('correlation-map-div', plot, layout, getPlotlyConfig());
};