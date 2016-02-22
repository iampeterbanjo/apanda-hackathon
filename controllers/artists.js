var request = require('request')
    , watson = require('watson-developer-cloud')
    , _ = require('lodash')
    , TextSummary = require('../public/js/lib/text-summary.js')
    , helpers = require('../public/js/lib/personality-insights-helpers.js')
    , Dictionary = require('../public/js/lib/dictionary.standalone.js')
    , Profile = require('../public/js/lib/personality-insights-profile.0.1.0.js')
    , personality_insights = watson.personality_insights({
      username: process.env.IBM_PERSONALITY_INSIGHTS_USERNAME
      , password: process.env.IBM_PERSONALITY_INSIGHTS_PASSWORD
      , version: 'v2'
    })
    , topArtistsUrl = 'http://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&format=json&api_key=' + process.env.LASTFM_KEY
    , artistProfileUrl = 'http://api.lyricsnmusic.com/songs?&api_key=' + process.env.LYRICS_SEARCH_KEY + '&q=';

/** Get the top artists in the charts */
exports.getTopArtists = function(req, res) {
  request(topArtistsUrl, function(error, lastfmResponse, body){
    var data, artists;

    if(error) {
      res.flash('error', { msg: error });
    }

    try {
      data = JSON.parse(body);
      artists = data.artists.artist;
    } catch(e) {
      res.flash('error', { msg: e });
    }

    res.render('artists/top', {
      artists: artists
    });
  })
}

exports.getArtistProfile = function(req, res) {
  var name = req.params.name;

   function sortScores(obj1, obj2) {
    return obj2.score - obj1.score;
  }

  request(artistProfileUrl + name, function(error, lyricsnmusicResponse, body) {
    var lyrics, songs;

    if(error) {
      res.flash('error', { msg: error });
    }

    try {
      lyrics = JSON.parse(body);
    } catch(e) {
      res.flash('error', { msg: e });
    }

    songs = lyrics.map(function(l) {
      return l.snippet + ' ' + l.title;
    });

    personality_insights.profile({text: songs},
      function(watsonError, insights) {
        if(watsonError) {
          res.flash('error', {msg: watsonError});
        }

        var data = helpers.changeProfileLabels(insights)
            , profile = new Profile(data)
            , personality = profile.mapped.personality
            , needs = profile.mapped.needs
            , values = profile.mapped.values
            , textSummary = new TextSummary('en')
            , summary = textSummary.getSummary(insights)
            , traits = []
            , highestTraits = [];

        function collectTraits(trait) {
          if(trait.self.percentage > 0.8) {
            highestTraits.push(trait.self);
          }
          traits.push(trait.self);
        }

        Object.keys(personality.trait).map(function(key){
          collectTraits(personality.trait[key]);
        });

        Object.keys(needs.trait).map(function(key){
          collectTraits(needs.trait[key]);
        });

        Object.keys(values.trait).map(function(key){
          collectTraits(values.trait[key]);
        });

        highestTraits.sort(function(a, b){
          return b.percentage - a.percentage;
        })

        res.render('artists/profile', {
          name: name
          , personality: personality.trait
          , needs: needs.trait
          , values: values.trait
          , summary: summary
          , traits: traits
          , highestTraits: highestTraits
        });
      }
    );

  });
}