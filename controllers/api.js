/**
 * Split into declaration and initialization for better startup performance.
 */
var validator;
var cheerio;
var graph;
var LastFmNode;
var tumblr;
var foursquare;
var Github;
var Twit;
var stripe;
var twilio;
var Linkedin;
var BitGo;
var clockwork;
var paypal;
var lob;
var ig;
var Y;
var request;

var _ = require('lodash');
var async = require('async');
var querystring = require('querystring');

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};


/**
 * GET /api/twitter
 * Twiter API example.
 */
exports.getTwitter = function(req, res, next) {
  Twit = require('twit');

  var token = _.find(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.get('search/tweets', { q: 'nodejs since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 10 }, function(err, reply) {
    if (err) {
      return next(err);
    }
    res.render('api/twitter', {
      title: 'Twitter API',
      tweets: reply.statuses
    });
  });
};

/**
 * POST /api/twitter
 * Post a tweet.
 */
exports.postTwitter = function(req, res, next) {
  req.assert('tweet', 'Tweet cannot be empty.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/api/twitter');
  }

  var token = _.find(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
    if (err) {
      return next(err);
    }
    req.flash('success', { msg: 'Tweet has been posted.'});
    res.redirect('/api/twitter');
  });
};


/**
 * GET /api/lob
 * Lob API example.
 */
exports.getLob = function(req, res, next) {
  lob = require('lob')(process.env.LOB_KEY);

  lob.routes.list({
    zip_codes: ['10007']
  }, function(err, routes) {
    if(err) {
      return next(err);
    }
    res.render('api/lob', {
      title: 'Lob API',
      routes: routes.data[0].routes
    });
  });
};




exports.getFileUpload = function(req, res, next) {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = function(req, res, next) {
  req.flash('success', { msg: 'File was uploaded successfully.'});
  res.redirect('/api/upload');
};
