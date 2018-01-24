var CryptoJS = require("crypto-js");

var AesUtil = function(keySize, iterationCount) {
	this.keySize = keySize / 32;
	this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function(salt, passPhrase) {
	var key = CryptoJS.PBKDF2(
		passPhrase,
		CryptoJS.enc.Hex.parse(salt),
		{
			keySize : this.keySize,
			iterations : this.iterationCount
		});
	return key;
}

AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
	var key = this.generateKey(salt, passPhrase);
	var encrypted = CryptoJS.AES.encrypt(
		plainText,
		key,
		{
			iv : CryptoJS.enc.Hex.parse(iv)
		});
	return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
	var key = this.generateKey(salt, passPhrase);
	var cipherParams = CryptoJS.lib.CipherParams.create({
		ciphertext : CryptoJS.enc.Base64.parse(cipherText)
	});
	var decrypted = CryptoJS.AES.decrypt(
		cipherParams,
		key,
		{
			iv : CryptoJS.enc.Hex.parse(iv)
		});
	return decrypted.toString(CryptoJS.enc.Utf8);
}

function encrypt(password){
	var aesUtil = new AesUtil(keySize, iterationCount)
    var encrypted = aesUtil.encrypt(salt, iv, secretPhrase, password);
    return encrypted;
}

function decrypt(passwordEncrypt){	
	var aesUtil = new AesUtil(keySize, iterationCount)
    var decrypted = aesUtil.decrypt(salt, iv, secretPhrase, passwordEncrypt);
    return decrypted;
}

var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
var plainText = "Password";
var keySize = 128;
var iterations = iterationCount = 10000;
var secretPhrase = "secret";

var encrypted = encrypt('test')
console.log(encrypted);

var decrypted = decrypt(encrypted)
console.log(decrypted);


