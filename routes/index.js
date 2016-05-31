'use strict';

module.exports = function (app) {
    app.use('/', require('./router/helloworld'));
    app.use('/commentBox', require('./router/commentBox'));
};