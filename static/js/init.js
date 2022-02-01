
// when file is selected
document.getElementById("file-upload").addEventListener("change", function() {

  document.getElementById('loading-div').style.display = "block";
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
  var data = d3.csv.parse(fileObject);
  data = data.slice(0, 1000);
  //create_table(data);

  console.log(data);
  document.getElementById('data-stats-div').innerHTML = `
    Dataset contains ${data.length} rows, ${Object.keys(data[0]).length} columns
  `;

  //document.getElementById('table-div').innerHTML = JSON.stringify(data.slice(0, 5), null, 4);


  var [table, thead, tbody] = createFilledTable(
    data=data,
    classes=['table', 'table-sm'],
    divId='table-div',
  );

  Object.assign(table.style, {
    'font-size': '0.75rem',
  });

  document.getElementById('loading-div').style.display = "none";

};
