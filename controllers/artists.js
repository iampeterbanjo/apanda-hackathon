var request = require('request')
    , watson = require('watson-developer-cloud')
    , _ = require('lodash')
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
      function(watsonError, profile) {
        if(watsonError) {
          res.flash('error', {msg: watsonError});
        }

        var personality = profile.tree.children[0];
        console.log(personality);

        res.render('artists/profile', {
          name: name
          , profile: profile
        });
      }
    );

  });
}