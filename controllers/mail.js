var gmailapilib = require('gmailapilib')
    , config = gmailapilib.configuration
    , User = require('../models/User')
		, google = require('googleapis')
		, _ = require('lodash')
    , apikey = process.env.GOOGLE_SECRET;


config.apikey = apikey;

/**
 * GET /gmail
 */
exports.getMail = function(req, res) {

  User.findById(req.user.id, function(err, user) {
		var googleToken = _.find(user.tokens, { kind: 'google' });


// userId alt, fields, includespamtrash, key, labelids, maxresults, oauthtoken, pagetoken, prettyprint, q, quotauser, userip, callback
    gmailapilib.MessagesController.list('me', "json", null, false, apikey, null, 10, null, null, true, null, null, null, function(messages) {
        console.log(messages);
      res.render('mail/list', {
        messages: messages
      });
    });
	});
}

