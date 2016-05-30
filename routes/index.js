'use strict';

module.exports = function (app) {
    app.use('/', require('./route/helloworld'));
    app.use('/commentBox', require('./route/commentBox'));
};