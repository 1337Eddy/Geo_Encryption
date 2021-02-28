var encMapCoords;
var decMapCoords;

function onMapClick(e) {
    var encMapPos = e.latlng.toString();
    encMapPos = encMapPos.substring(7);
    encMapPos = encMapPos.substring(0, encMapPos.length - 1);
    encMapPos = encMapPos.split(",");
    latArr = encMapPos[0].split(".");
    longArr = encMapPos[1].split(".");
    lat = latArr[0] + "." + latArr[1].substring(0, 4);
    long = longArr[0].substring(1) + "." + longArr[1].substring(0, 4);
    encMapCoords = lat + " " + long;
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(mymap);
}


function onMapClick1(e) {
    var encMapPos = e.latlng.toString();
    encMapPos = encMapPos.substring(7);
    encMapPos = encMapPos.substring(0, encMapPos.length - 1);
    encMapPos = encMapPos.split(",");
    latArr = encMapPos[0].split(".");
    longArr = encMapPos[1].split(".");
    lat = latArr[0] + "." + latArr[1].substring(0, 4);
    long = longArr[0].substring(1) + "." + longArr[1].substring(0, 4);
    decMapCoords = lat + " " + long;
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

function encryptWithPosition(position) {
    var password = "";
    lat = position.coords.latitude.toString().split(".");
    long = position.coords.longitude.toString().split(".");

    password = lat[0] + "." + lat[1].substring(0, 4) + " " + long[0] + "." + long[1].substring(0, 4);
    if (document.querySelector("#pwEncryptionActivate").checked) {
        if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
            document.querySelector("#pwError").style.display = 'block';
        }
        password = password + document.querySelector("#pwEnc").value;
    }
    password = CryptoJS.SHA256(password).toString();
    var ciphertext = CryptoJS.AES.encrypt(document.querySelector("#plaintext").value, password);
    document.querySelector("#ciphertext").value = ciphertext;
}



function encrypt() {
    if (document.querySelector("#plaintext").value == "") {
        console.log("Enter Text");
        return;
    }
    //password activated but not equal
    if (document.querySelector("#pwEncryptionActivate").checked &&
        document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
        document.querySelector("#pwError").style.display = 'block';
    } else if (document.querySelector("#pwEncryptionActivate").checked && // password activated and empty
        document.querySelector("#pwEnc").value == "") {
        document.querySelector("#pwNotUsed").style.display = 'block';
    } else {
        //Map activated and waypoint setted
        if (document.querySelector("#encMapActivate").checked && encMapCoords != null) {
            var password;
            //password activated
            if (document.querySelector("#pwEncryptionActivate").checked) {
                //check password and password repeat are equal
                if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
                    document.querySelector("#pwError").style.display = 'block';
                }
                //add manual password to map coordinates
                password = encMapCoords + document.querySelector("#pwEnc").value;
            }
            password = CryptoJS.SHA256(password).toString();
            var ciphertext = CryptoJS.AES.encrypt(document.querySelector("#plaintext").value, password);
            document.querySelector("#ciphertext").value = ciphertext;
        } else if (navigator.geolocation) { //map not activated and GPS in use
            navigator.geolocation.getCurrentPosition(encryptWithPosition);
        } else {
            console.log("GPS nicht verfügbar!")
        }
    }
}

function decryptWithPosition(position) {
    var password = "";
    lat = position.coords.latitude.toString().split(".");
    long = position.coords.longitude.toString().split(".");

    password = lat[0] + "." + lat[1].substring(0, 4) + " " + long[0] + "." + long[1].substring(0, 4);
    if (document.querySelector("#pwDecryptionActivate").checked) {
        password = password + document.querySelector("#pwEnc").value;
    }
    password = CryptoJS.SHA256(password).toString();
    console.log(password);
    var plaintext = CryptoJS.AES.decrypt(document.querySelector("#ciphertext").value, password);
    console.log(plaintext.toString());
    document.querySelector("#plaintext").value = CryptoJS.enc.Utf8.stringify(plaintext);
}

function decrypt() {
    var password = "";

    if (document.querySelector("#decMapActivate").checked) {
        password = decMapCoords;
        if (document.querySelector("#pwDecryptionActivate").checked) {
            password = password + document.querySelector("#decPwField").value;
        }
        var codedPlaintext = CryptoJS.AES.decrypt(document.querySelector("#ciphertext").value, password);
        var plaintext = CryptoJS.enc.Utf8.stringify(codedPlaintext);
        document.querySelector("#plaintext").value = plaintext;
    } else if (navigator.geolocation) {
        password = navigator.geolocation.getCurrentPosition(decryptWithPosition)
    } else {

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



function deactivateDecPwError() {
    if (document.querySelector("#decPwField").value.length > 0) {
        document.querySelector("#decError").style.display = "none";
    }
}