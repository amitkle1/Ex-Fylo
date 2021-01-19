var storage = 0.5;
var usedStorage = 0;
var MB = Math.pow(1024, 2);
var files = [];
var fileInput = document.getElementById('fileInput');
var validFormats = ["jpg","png","jpeg"];
var isValidateTypeFile = file => !!validFormats.find(format => 'image/'+format === file.type);

var DOMStrings = {
    btn: '.icon-btn',
    input: '.icon-input',
    usedSpaceId: 'usedSpace',
    freeSpaceId: 'freeSpace',
    valueBarId: 'progressValue'
}

// GENERAL FUNCTIONS 

function showErrorMessage(message) {
    alert('Error uploading file: \n ' + message);
}

function convertBytesToMB(size) {
    return size / MB;
}


function renderStorageView(size) {
    usedStorage += size;

    document.getElementById(DOMStrings.usedSpaceId).innerHTML = usedStorage.toFixed(2) + 'MB';
    document.getElementById(DOMStrings.freeSpaceId).innerHTML = (storage - usedStorage).toFixed(2);
    document.getElementById(DOMStrings.valueBarId).style.width = ((usedStorage / storage) * 100).toFixed(2)+ "%";
}



//////////////////////////////////////////////////////////////////////////////// 
function uploadFile(ev) {
    const file = ev.target.files[0];
    var Errormessage;

    if (isValidateTypeFile(file)) {
        var fileSizeMB = convertBytesToMB(file.size);

        if(file.size <= 5) {
            Errormessage = "The file is too big.";
        }

        if ((fileSizeMB + usedStorage) <= storage) {
            renderStorageView(fileSizeMB);
            files.push(file);
        }
        else {
            Errormessage = "There is no enough space in your storage.";
        }
    }
    else { 
        Errormessage = "The file is not valid.";
    }

    if(Errormessage) {
        showErrorMessage(Errormessage);
    }

    ev.target.value = '';
}

fileInput.addEventListener('change', uploadFile);