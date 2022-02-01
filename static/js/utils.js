
// create a select input using an array of options
function createSelect(options, label='', id='', parentId='', classList=[]){
  var select = document.createElement("select");
  select.classList.add('form-select');
  for (let c of classList){
    select.classList.add(c);
  };
  if (id !== ''){
      select.id = id
  };
  if (label !== '' && parentId !== ''){
      const lab = document.createElement('label');
      lab.classList.add('form-label', 'mb-0');
      lab.innerHTML = label;
      document.getElementById(parentId).appendChild(lab);
  };
  if (parentId !== ''){
      document.getElementById(parentId).appendChild(select)
  };
  for (let op of options){
      var option = document.createElement("option");
      //option.value = strToId(op);
      option.value = op;
      option.text = op;
      select.appendChild(option);
  };
  return select;
};

// Create a bootstrap row with multiple columns.
// Returns an array containing each column.
function createRowCols(parentdiv, ncols=2) {
  var row = document.createElement('div');
  row.classList.add('row');
  for (let i=0; i<ncols; i++) {
      var col = document.createElement('div');
      col.classList.add('col');
      row.appendChild(col);
  };
  parentdiv.appendChild(row);
  return row
};


// Create and populate a table from an array of data.
// The *data* argument should be an array of objects.
function createFilledTable(data=null, classes=['table', 'table-sm', 'table-borderless'], divId=null){
  // create tabel
  const table = document.createElement("table");
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  for (var c of classes){
      table.classList.add(c);
  };
  if (data !== null){
      // add table headers
      var headers = Object.keys(data[0]);
      var headrow = thead.insertRow();
      for (var h of headers) {
          var th = document.createElement('th');
          //th.style.textAlign = 'center';
          //th.classList.add('text-nowrap');
          th.innerHTML = h;
          headrow.appendChild(th);
      };
      // add table body content
      for (let record of data){
          var row = tbody.insertRow();
          for (let h of headers){
              var cell = row.insertCell();
              cell.innerHTML = record[h];
          };
      };
  };
  if (divId !== null) {
      document.getElementById(divId).appendChild(table);
  };
  return [table, thead, tbody];
};




// add a spinner to a parent div
function addSpinner(parentId, color='primary', size=null){
  const spinner = document.createElement('div');
  spinner.classList.add('mx-2', 'spinner', 'spinner-border', `text-${color}`);
  if (size !== null){
      spinner.classList.add(`spinner-border-${size}`);
  };
  document.getElementById(parentId).appendChild(spinner);
};
// remove spinner from a parent div
function removeSpinner(parentId){
  const spinners = document.getElementById(parentId).getElementsByClassName("spinner");
  for(const s of spinners){
      s.remove()
  };
};


// from a hex color code and an alpha level, return a new color code
function addAlpha(color, alpha) {
  var _alpha = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255);
  return color + _alpha.toString(16).toUpperCase();
};

// generate a random ID of strings
function getRandomId(n=12) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (! n) {
        n = Math.floor(Math.random() * chars.length);
    };
    var id = '';
    for (var i = 0; i < n; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    };
    return id;
};

// check if a string is a number
function stringIsNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
};