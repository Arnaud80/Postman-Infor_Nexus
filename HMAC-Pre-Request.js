var sdk = require('postman-collection');
var url = new sdk.Url(request.url);
var userId = "[UserId]";
var dataKey = "[dataKey]"
var secretAccessKey = "[secretAccessKey]";
var accessKeyId = '[accessKeyId]';
var x_dapi_date = new Date().toISOString();
var hmac_1 = "HMAC_1";
var authorization = hmac_1 + " " + accessKeyId + ":" + hmac() + ":" + userId;


function hmac() {
    let method = request.method;
	let pathInfo = url.getPath()
	
	if(url.getQueryString()) {
	    pathInfo = pathInfo + "?" + url.getQueryString();   
	}

	//headers['payload'] = ""
	//headers['content-type'] = ""
	
	let message = x_dapi_date + request.method + pathInfo;
	console.log("x_dapi_date : " + x_dapi_date)
	message = message.toLowerCase();
	console.log("message : " + message);
	encryptedMessage = CryptoJS.HmacSHA256(message, secretAccessKey);
	console.log("encryptedMessage : " + encryptedMessage);
	encryptedMessage = CryptoJS.enc.Base64.stringify(encryptedMessage);
	console.log("encryptedMessage (base64) : " + encryptedMessage);
	return(encryptedMessage);
}

pm.environment.set("dataKey", dataKey);
pm.environment.set("x-dapi-date", x_dapi_date);
pm.environment.set("authorization", authorization);
