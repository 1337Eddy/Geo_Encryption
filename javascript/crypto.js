function foo() {
    var ciphertext = CryptoJS.AES.encrypt('my message', '123456').toString();
    var decrypted = CryptoJS.AES.decrypt(ciphertext, '123456');
    console.log(CryptoJS.AES.encrypt('my message', '123456').toString());
    console.log(decrypted.toString(CryptoJS.enc.Utf8));
}
var password = "superSicheresPasswort";

function encrypt() {

}

function test() {
    console.log("Test");
}

function download() {

    document.body.removeChild(document.querySelector("#myfile"));
}