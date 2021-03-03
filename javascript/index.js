var encMapCoords;
var decMapCoords;

var numberOfDigits = 3;

function onMapClick(e) {
    var encMapPos = e.latlng.toString();
    encMapPos = encMapPos.substring(7);
    encMapPos = encMapPos.substring(0, encMapPos.length - 1);
    encMapPos = encMapPos.split(",");
    latArr = encMapPos[0].split(".");
    longArr = encMapPos[1].split(".");
    lat = latArr[0] + "." + latArr[1].substring(0, numberOfDigits);
    long = longArr[0].substring(1) + "." + longArr[1].substring(0, numberOfDigits);
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
    lat = latArr[0] + "." + latArr[1].substring(0, numberOfDigits);
    long = longArr[0].substring(1) + "." + longArr[1].substring(0, numberOfDigits);
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

function generateEncryptionPasswordGPS(position) {
    var password = "";
    lat = position.coords.latitude.toString().split(".");
    long = position.coords.longitude.toString().split(".");

    var coordsLat = "Lat: " + lat[0] + "." + lat[1].substring(0, 4);
    var coordsLong = "Long: " + long[0] + "." + long[1].substring(0, 4);
    document.querySelector("#lat").textContent = coordsLat;
    document.querySelector("#lat").style.display = 'block';

    document.querySelector("#long").textContent = coordsLong;
    document.querySelector("#long").style.display = 'block';

    password = lat[0] + "." + lat[1].substring(0, numberOfDigits) + " " + long[0] + "." + long[1].substring(0, numberOfDigits);
    console.log(password);
    if (document.querySelector("#pwEncryptionActivate").checked) {
        if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
            document.querySelector("#pwError").style.display = 'block';
        }
        password = password + document.querySelector("#pwEnc").value;
    }
    encryptText(password);
}

function encryptText(password) {
    password = CryptoJS.SHA256(password).toString();
    var ciphertext = CryptoJS.AES.encrypt(document.querySelector("#plaintext").value, password);
    document.querySelector("#ciphertext").value = ciphertext;
}



function encrypt() {
    document.querySelector("#long").style.display = 'none';
    document.querySelector("#longDec").style.display = 'none';
    document.querySelector("#lat").style.display = 'none';
    document.querySelector("#latDec").style.display = 'none';
    if (document.querySelector("#plaintext").value == "") {
        document.querySelector("#noTextEntered").style.display = "block";
        return;
    }

    document.querySelector("#noTextEntered").style.display = "none";
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
            var password = encMapCoords;
            //password activated
            if (document.querySelector("#pwEncryptionActivate").checked) {
                //check password and password repeat are equal
                if (document.querySelector("#pwEnc").value !== document.querySelector("#pwEncRepeat").value) {
                    document.querySelector("#pwError").style.display = 'block';
                }
                //add manual password to map coordinates
                password = password + document.querySelector("#pwEnc").value;
            }
            encryptText(password);
        } else if (navigator.geolocation) { //map not activated and GPS in use
            navigator.geolocation.getCurrentPosition(generateEncryptionPasswordGPS, function error(msg) {

                alert('Please enable your GPS position future.');

            }, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true });
        } else {
            console.log("GPS nicht verfügbar!")
        }
    }
}

function generateDecryptionPasswordGPS(position) {
    var password = "";

    var coordsLat = "Lat: " + lat[0] + "." + lat[1].substring(0, 4);
    var coordsLong = "Long: " + long[0] + "." + long[1].substring(0, 4);
    document.querySelector("#latDec").textContent = coordsLat;
    document.querySelector("#latDec").style.display = 'block';

    document.querySelector("#longDec").textContent = coordsLong;
    document.querySelector("#longDec").style.display = 'block';

    lat = position.coords.latitude.toString().split(".");
    long = position.coords.longitude.toString().split(".");

    password = lat[0] + "." + lat[1].substring(0, numberOfDigits) + " " + long[0] + "." + long[1].substring(0, numberOfDigits);
    if (document.querySelector("#pwDecryptionActivate").checked) {
        password = password + document.querySelector("#pwEnc").value;
    }
    decryptText(password);
}

function decrypt() {
    document.querySelector("#long").style.display = 'none';
    document.querySelector("#longDec").style.display = 'none';
    document.querySelector("#lat").style.display = 'none';
    document.querySelector("#latDec").style.display = 'none';

    var password = "";

    if (document.querySelector("#decMapActivate").checked) {
        password = decMapCoords;
        if (document.querySelector("#pwDecryptionActivate").checked) {
            password = password + document.querySelector("#decPwField").value;
        }
        decryptText(password);
    } else if (navigator.geolocation) {
        password = navigator.geolocation.getCurrentPosition(generateDecryptionPasswordGPS, function error(msg) {

            alert('Please enable your GPS position future.');

        }, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true })
    } else {
        console.log("Aktivieren sie GPS oder geben sie eine Position auf der Karte ein!");
    }

}

function decryptText(password) {
    password = CryptoJS.SHA256(password).toString();
    var codedPlaintext = CryptoJS.AES.decrypt(document.querySelector("#ciphertext").value, password);
    var plaintext;
    try {
        plaintext = CryptoJS.enc.Utf8.stringify(codedPlaintext);
    } catch {
        document.querySelector("#decryptError").style.display = 'block';
        document.querySelector("#plaintext").value = "";
        return;
    }
    console.log(plaintext.length);
    if (plaintext.length == 0) {
        document.querySelector("#decryptError").style.display = 'block';
        document.querySelector("#plaintext").value = "";
    } else {
        document.querySelector("#decryptError").style.display = 'none';
        document.querySelector("#plaintext").value = plaintext;
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