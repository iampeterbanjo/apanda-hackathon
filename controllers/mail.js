var Gmail = require('node-gmail-api')
		, User = require('../models/User')
		, google = require('googleapis')
		, _ = require('lodash')
		, googleAuth = require('google-auth-library')
		, auth = new googleAuth()
		, googleSecrets = {
			clientID: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: '/auth/google/callback'
		};

/**
 * GET /gmail
 */
exports.getMail = function(req, res) {

  User.findById(req.user.id, function(err, user) {
		var googleToken = _.find(user.tokens, { kind: 'google' });
				// , gmail = new Gmail(googleToken.accessToken)
				// , messages = gmail.messages('label:inbox', {max: 10});

		// messages.on('data', function(mail) {
		// 	res.render('mail/list', {
		// 		title: 'Mail'
		// 		, user: user
		// 		, mail: mail
		// 		, token: googleToken.accessToken
		// 	});
		// });

		var oauth2Client = new auth.OAuth2( googleSecrets.clientId, googleSecrets.clientSecret, googleSecrets.redirectUrl);

		var gmail = google.gmail('v1');
		oauth2Client.credentials = {token: googleToken};
		gmail.users.labels.list({
			auth: oauth2Client,
			userId: 'me',
		}, function(err, response) {
			if (err) {
				console.log('The API returned an error: ' + err);
				return;
			}

			res.render('mail/list', {
				labels: response.labels
			});
			// var labels = response.labels;
			// if (labels.length == 0) {
			// 	console.log('No labels found.');
			// } else {
			// 	console.log('Labels:');
			// 	for (var i = 0; i < labels.length; i++) {
			// 		var label = labels[i];
			// 		console.log('- %s', label.name);
			// 	}
			// }
		});

	});
}