'use strict';

module.exports = function (app) {
    console.log(app);
    app.use('/', require('./route/helloworld'));
    app.use('/commentBox', require('./route/commentBox'));
};