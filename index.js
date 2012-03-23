var log = require('node-logging'),
    async = require('async'),
    mongoose = require('mongoose'),
    channels = mongoose.model('Channel'),
    events = mongoose.model('Event'),
    movies = mongoose.model('MovieDetail');

function TvGuide(app, express) {
    "use strict";
}

TvGuide.prototype.init = function () {
    "use strict";

    log.dbg('Init TvGuide Plugin');

    this.io.sockets.on('connection', function (socket) {
        socket.on('TVGuideCollection:read', function (data, cb) {
            if (!socket.handshake.session.loggedIn) {
                return false;
            }

            var page = data.page - 1 || 0;
            var start = page * 4;

            var channelQuery = channels.find({});

            channelQuery.where('active', true);
            channelQuery.sort('number', 1);
            channelQuery.skip(start);
            channelQuery.limit(4);

            channelQuery.run(function (err, channels) {
                cb(channels);
            });
        });
    });
};

module.exports = TvGuide;