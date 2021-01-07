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

function btn() {
    if (document.querySelector("#pwEncryptionActivate").checked == true) {
        document.querySelector("#pwEncryptionActivate").checked = false;
    } else {
        document.querySelector("#pwEncryptionActivate").checked = true;
    }
}

function pwError() {
    if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
        document.querySelector("#pwError").style.display = 'block';
    } else {
        document.querySelector("#pwError").style.display = 'none';
    }
}