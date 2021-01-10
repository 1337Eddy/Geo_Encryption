function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(mymap);
}


function onMapClick1(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(mymap1);
}

function onSelectPwEnc() {
    if (document.querySelector("#pwEncryptionActivate").checked == true) {
        document.querySelector("#pwFields").style.display = 'block';
    } else {
        document.querySelector("#pwFields").style.display = 'none';
    }
}

function onSelectMapEnc() {
    if (document.querySelector("#encMapActivate").checked == true) {
        document.querySelector("#encMap").style.display = 'block';
    } else {
        document.querySelector("#encMap").style.display = 'none';
    }
}


function onSelectPwDec() {
    if (document.querySelector("#pwDecryptionActivate").checked == true) {
        document.querySelector("#decPw").style.display = 'block';
    } else {
        document.querySelector("#decPw").style.display = 'none';
    }
}

function onSelectMapDec() {
    if (document.querySelector("#decMapActivate").checked == true) {
        document.querySelector("#decMap").style.display = 'block';
    } else {
        document.querySelector("#decMap").style.display = 'none';
    }
}


function encrypt() {
    if (document.querySelector("#pwEncryptionActivate").checked == true) {
        if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
            document.querySelector("#pwError").style.display = 'block';
        } else if (document.querySelector("#pwEnc").value == "") {
            document.querySelector("#pwNotUsed").style.display = 'block';
        } else {

        }
    } else {
        var cryptFile = CryptoJS.AES.encrypt(JSON.stringify(document.querySelector("#myfile")), password);
        console.log(cryptFile.toString());
        console.log(cryptFile);
        //browser.downloads.download(cryptFile);
        downloadObjectAsJson(cryptFile, "TestFile");
    }
}

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function pwMsg() {
    document.querySelector("#pwNotUsed").style.display = 'none';
    if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
        document.querySelector("#pwError").style.display = 'block';
        document.querySelector("#weak").style.display = 'none';
        document.querySelector("#middle").style.display = 'none';
        document.querySelector("#strong").style.display = 'none';
    } else {
        deactivatePwMsg();
        if (document.querySelector("#pwEnc").value.length < 5 && document.querySelector("#pwEnc").value.length > 0) {
            console.log(document.querySelector("#pwEnc").value.toString.length);
            document.querySelector("#weak").style.display = 'block';
        } else if (document.querySelector("#pwEnc").value.length < 8 && document.querySelector("#pwEnc").value.length > 0) {
            document.querySelector("#middle").style.display = 'block';
        } else if (document.querySelector("#pwEnc").value.length >= 8 && document.querySelector("#pwEnc").value.length > 0) {
            document.querySelector("#strong").style.display = 'block';
        }
    }
}

function deactivatePwMsg() {
    document.querySelector("#weak").style.display = 'none';
    document.querySelector("#middle").style.display = 'none';
    document.querySelector("#strong").style.display = 'none';
    document.querySelector("#pwNotUsed").style.display = 'none';
    document.querySelector("#pwError").style.display = 'none';
}

function decrypt() {
    if (document.querySelector("#pwDecryptionActivate").checked == true && document.querySelector("#decPwField").value.length == 0) {
        document.querySelector("#decError").style.display = "block";
    }
}

function deactivateDecPwError() {
    if (document.querySelector("#decPwField").value.length > 0) {
        document.querySelector("#decError").style.display = "none";
    }
}