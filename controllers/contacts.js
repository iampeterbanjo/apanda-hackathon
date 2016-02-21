var GoogleContacts = require('google-contacts').GoogleContacts;
var User = require('../models/User');
var _ = require('lodash');

/**
 * GET /contacts
 */
exports.getContacts = function(req, res, token) {

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

	c.getContacts(function(err, contacts){
		if(err) {
			console.log(err);
			res.redirect('/google');
		}
		res.render('contacts/list', {
			contacts: contacts
		})
	});
}