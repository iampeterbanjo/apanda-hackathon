/**
 * GET /
 * Home page.
 */
exports.index = function (req, res) {
    res.render('home', {
        title: 'Home'
    })};

var User = require('../models/User');
var _ = require('lodash');

/**
 * GET /chartData
 */
exports.getChartData = function (req, res) {

}

