var request = require('request')
var contact = require('./contacts.js')

exports.getToken = function(req, res, code){
	var url = 'https://www.googleapis.com/oauth2/v4/token';
	var data = {
		code: code,
		client_id: process.env.GOOGLE_ID,
		client_secret: process.env.GOOGLE_SECRET,
		redirect_uri: 'http://' + req.rawHeaders[1] + '/auth/google/redirecturl',
		grant_type: 'authorization_code'
	}
	request.post(url, {form: data}, function(err, tokens){
		if(err) console.log(err)
		var x = JSON.parse(tokens.body);
		console.log(x);
		contact.getContacts(req, res, x['access_token']);
		//TODO: Store x['access_token'] in the database.
		// contact(x['access_token']);
	})
}