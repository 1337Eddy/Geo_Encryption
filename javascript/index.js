var pwEncCheckBox = document.querySelector('pwEncryptionActivate');
pwEncCheckBox.onClick() = function() {
    alert(pwEncCheckBox.checked)
}

var btnEncrypt = document.querySelector('encrypt');
btnEncrypt.onClick = function() {
    alert("Clicked")
}

document.querySelector('html').onclick = function() {
    alert('Hey! Nicht so viel klicken!');
}