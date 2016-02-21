var GoogleContacts = require('google-contacts').GoogleContacts;
var User = require('../models/User');
var _ = require('lodash');
var request = require('request')
/**
 * GET /contacts
 */
exports.getContacts = function(token) {

  // User.findById(req.user.id, function(err, user) {
		// var googleToken = _.find(user.tokens, { kind: 'google' });
		// var c = new GoogleContacts({
		// 	token: googleToken.accessToken
		// });

		// c.getContacts(function(contacts) {
		// 	res.render('contacts/list', {
		// 		title: 'Contacts'
		// 		, user: user
		// 		, contacts: contacts
		// 		, token: googleToken.accessToken
		// 	});
		// })

  // });

  //TODO Code to fetch access token from database

  //code to fetch contact from google
  var GoogleContacts = require('google-contacts').GoogleContacts;
	var c = new GoogleContacts({
	  token: token
	});
	
	c.getContacts(function(err,cb){
		if(err) throw err;
		//Logging the contactlist in console
		console.log(cb);
	});

	var options = {
	  url: 'https://www.googleapis.com/userinfo/v2/me',
	  headers: {
	    'Authorization': 'Bearer '+token
	  }
	};

	// This request fetches the info of the user
	request.get(options, function(error, response, body){
		if (!error && response.statusCode == 200) {
		    var info = JSON.parse(body);
		    //Logging the userinfo in console
		    console.log(info);
		    //TODO: save the user info in the database. 
		  }
	} )
}