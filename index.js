var maxSize = 10;
var currSize = 0;

var DOMStrings = {
    btn: '.icon-btn',
    input: '.icon-input',
    usedSpace: 'used_space',
    freeSpace: 'free_space',
    valueBar: 'progress_value'
}

function validate_fileupload(file)
{
    var fileName = file.name;
    var fileSize_MG = file.size / 1000000;

    var allowed_extensions = new Array("jpg","png","jpeg");
    var file_extension = fileName.split('.').pop().toLowerCase();

    for(var i = 0; i <= allowed_extensions.length; i++) {
        if(allowed_extensions[i]==file_extension &&
            fileSize_MG <= 5) {return true;}
    }
    return false;
}

function updateCurrSize(size) {
    currSize += size;
    
    document.getElementById(DOMStrings.usedSpace).innerHTML = currSize.toFixed(2) + 'MB';
    document.getElementById(DOMStrings.freeSpace).innerHTML = (maxSize - currSize).toFixed(2);
    document.getElementById(DOMStrings.valueBar).style.width = (currSize / maxSize).toFixed(2) * 100 + "%";
}

function init() {
    Array.prototype.forEach.call(document.querySelectorAll(DOMStrings.btn), function(btn) {
        const hiddenInput = btn.parentElement.querySelector(DOMStrings.input);
        
        btn.addEventListener('click', function () {
            hiddenInput.click();
        });
        
        hiddenInput.addEventListener('change', function() {
            var arr = Array.prototype.filter.call(hiddenInput.files, validate_fileupload).map(function(file) {
                return {name: file.name, size: file.size};
            });
            
            arr.forEach(function(file) {
                var fileSize = file.size / 1000000;
                
                if(currSize + fileSize <= maxSize) {
                    updateCurrSize(fileSize);
                }
                else {
                    alert('"' + file.name + '"' + ' is too big.\nThere is no enough space.');
                }
            })
        });
    });
}

init();