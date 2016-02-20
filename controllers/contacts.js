var GoogleContacts = require('google-contacts').GoogleContacts;
var User = require('../models/User');
var _ = require('lodash');

/**
 * GET /contacts
 */
exports.getContacts = function(req, res) {

  User.findById(req.user.id, function(err, user) {
		var googleToken = _.find(user.tokens, { kind: 'google' });
		var c = new GoogleContacts({
			token: googleToken.accessToken
		});

		c.getContacts(function(contacts) {
			res.render('contacts/list', {
				title: 'Contacts'
				, user: user
				, contacts: contacts
				, token: googleToken.accessToken
			});
		})

  });
}