var storage = 1;
var usedStorage = 0;
var MB = Math.pow(1024, 2);
var files = [];
var fileInput = document.getElementById("fileInput");
var validFormats = ["jpg", "png", "jpeg"];
var isValidateTypeFile = (file) =>
  !!validFormats.find((format) => "image/" + format === file.type);
var table = document.getElementById("table");

var DOMStrings = {
  btn: ".icon-btn",
  input: ".icon-input",
  usedSpaceId: "usedSpace",
  freeSpaceId: "freeSpace",
  valueBarId: "progressValue",
};

// GENERAL FUNCTIONS

function showErrorMessage(message) {
  alert("Error uploading file: \n " + message);
}

function convertBytesToMB(size) {
  return size / MB;
}

function renderStorageView(size) {
  usedStorage += size;

  document.getElementById(DOMStrings.usedSpaceId).innerHTML =
    usedStorage.toFixed(2) + "MB";
  document.getElementById(DOMStrings.freeSpaceId).innerHTML = (
    storage - usedStorage
  ).toFixed(2);
  console.log(((usedStorage / storage) * 100).toFixed(2));
  document.getElementById(DOMStrings.valueBarId).style.width =
    ((usedStorage / storage) * 100).toFixed(2) + "%";
}

////////////////////////////////////////////////////////////////////////////////
function uploadFile(ev) {
  const file = ev.target.files[0];

  var Errormessage;

  if (isValidateTypeFile(file)) {
    var fileSizeMB = convertBytesToMB(file.size);

    if (file.size <= 5) {
      Errormessage = "The file is too big.";
    }

    if (fileSizeMB + usedStorage <= storage) {
      renderStorageView(fileSizeMB);
      files.push(file);

      if (files.length > 0) {
        table.style.display = "flex";
      }
      var row = table.insertRow(files.length);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell2.innerHTML = file.size / 1000000 + " MB";
      cell1.innerHTML = file.name.toString();
    } else {
      Errormessage = "There is no enough space in your storage.";
    }
  } else {
    Errormessage = "The file is not valid.";
  }

  if (Errormessage) {
    showErrorMessage(Errormessage);
  }

  ev.target.value = "";
}

fileInput.addEventListener("change", uploadFile);
/*var storage = 1;
var usedStorage = 0;
var MB = Math.pow(1024, 2);
var files = [];
var fileInput = document.getElementById("fileInput");
var validFormats = ["jpg", "png", "jpeg"];
var isValidateTypeFile = (file) =>
  !!validFormats.find((format) => "image/" + format === file.type);
var table = document.getElementById("table");

var DOMStrings = {
  btn: ".icon-btn",
  input: ".icon-input",
  usedSpaceId: "usedSpace",
  freeSpaceId: "freeSpace",
  valueBarId: "progressValue",
};

// GENERAL FUNCTIONS

function showErrorMessage(message) {
  alert("Error uploading file: \n " + message);
}

function convertBytesToMB(size) {
  return size / MB;
}

function renderStorageView(size) {
  usedStorage += size;

  document.getElementById(DOMStrings.usedSpaceId).innerHTML =
    usedStorage.toFixed(2) + "MB";
  document.getElementById(DOMStrings.freeSpaceId).innerHTML = (
    storage - usedStorage
  ).toFixed(2);

  document.getElementById(DOMStrings.valueBarId).style.width =
    ((usedStorage / storage) * 100).toFixed(2) + "%";
}

////////////////////////////////////////////////////////////////////////////////
function uploadFile(ev) {
  const file = ev.target.files[0];

  var Errormessage;

  if (isValidateTypeFile(file)) {
    var fileSizeMB = convertBytesToMB(file.size);

    if (file.size <= 5) {
      Errormessage = "The file is too big.";
    }

    if (fileSizeMB + usedStorage <= storage) {
      renderStorageView(fileSizeMB);
      tableCreate(files);
      files.push(file);

      if (files.length > 0) {
        table.style.display = "flex";
      }
      //   var row = table.insertRow(files.length);
      //   var cell1 = row.insertCell(0);
      //   var cell2 = row.insertCell(1);

      cell2.innerHTML = file.size / 1000000 + " MB";
      cell1.innerHTML = file.name.toString();
    } else {
      Errormessage = "There is no enough space in your storage.";
    }
  } else {
    Errormessage = "The file is not valid.";
  }

  if (Errormessage) {
    showErrorMessage(Errormessage);
  }

  ev.target.value = "";
}

fileInput.addEventListener("change", uploadFile);

function tableCreate(arr) {
  var body = document.body,
    tbl = document.createElement("table");
  tbl.style.width = "100px";
  tbl.style.border = "1px solid black";

  var tr = tbl.insertRow(arr.length);

  var cell1 = tr.insertCell(0);
  var cell2 = tr.insertCell(1);

  console.log(arr + "arr");
  console.log(arr.file[0] + "sadfasd");

  cell2.innerHTML = arr.file[0].size / 1000000 + " MB";
  cell1.innerHTML = arr.file[0].name.toString();
  body.appendChild(tbl);
}
*/
