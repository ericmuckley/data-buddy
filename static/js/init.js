
// when file is selected
document.getElementById("file-upload").addEventListener("change", function() {

  document.getElementById('loading-div').style.display = "block";
  document.getElementById('histogram-info-div').style.display = "none";
  document.getElementById('table-div').innerHTML = "";
  document.getElementById('data-stats-div').innerHTML = "";

  // configure file reader action once file is finished being read
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    load_data(contents);
  };    
  // read the selected file
  var file = this.files[0];
  //if (typeof file === 'Blob'){
  reader.readAsText(file);
  //};
  
}, false);  


function load_data(fileObject) {
  var data = d3.csvParse(fileObject);
  data = data.slice(0, 10000);
  document.getElementById("data").dataset.data = JSON.stringify(data);

  document.getElementById('data-stats-div').innerHTML = `
    Dataset contains ${data.length} rows, ${Object.keys(data[0]).length} columns
  `;

  var [table, thead, tbody] = createFilledTable(
    data=data,
    classes=['table', 'table-sm', 'table-bordered'],
    divId='table-div',
  );
  Object.assign(table.style, {
    'font-size': '0.75rem',
  });



  // build histogram
  populateSelect('histogram-select', Object.keys(data[0]));
  plotHistogram();
  [`histogram-select`].forEach(x => {
      var el = document.getElementById(x);
      el.addEventListener('change', event => {
        plotHistogram();
      });
  });


  document.getElementById('loading-div').style.display = "none";
  document.getElementById('histogram-info-div').style.display = "block";

};


// when help button is clicked
document.getElementById("help-btn").addEventListener("click", function() {
  var helpContent = `
    <h4>Using Data Buddy</h4>
    Data Buddy is a suite of tools for visualizing, studying, and iteracting
    with numerical datasets.
    First upload a CSV file using the upload button.
  `;
  createWindow(title="Help", content=helpContent, loc=[60, 60]);
}, false);
