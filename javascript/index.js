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

function encrypt() {
    if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
        document.querySelector("#pwError").style.display = 'block';
    } else if (document.querySelector("#pwEnc").value == "") {
        document.querySelector("#pwNotUsed").style.display = 'block';
    }
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