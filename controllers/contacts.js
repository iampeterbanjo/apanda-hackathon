var request = require('request')
		, User = require('../models/User')
		, _ = require('lodash');

/**
 * GET /contacts
 */
exports.getContacts = function(req, res) {

  User.findById(req.user.id, function(err, user) {
		var googleToken = _.find(user.tokens, { kind: 'google' });

		request.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&oauth_token=' + googleToken.accessToken
		, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.flash('errors', {
					msg: error
				});
			} else {
				// var contacts = JSON.parse(body);

				res.render('contacts/list', {
					title: 'Contacts'
					, user: user
					, contacts: body
					, token: googleToken.accessToken
				});
			}
		});
  });
}