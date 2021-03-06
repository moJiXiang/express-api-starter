/**
 * Created by mojixiang on 16/6/6.
 */

'use strict';

module.exports = function (app) {

    // auth routes
    app.use('/auth', require('./auth'));

    // server logic api
    app.use('/api/users', require('./api/user'));
    app.use('/api/books', require('./api/book'));

    // test api
    app.use('/api/test', function(req, res) {
      res.json({result: 'test api result'});
    })

    // app.use('/*', function (req, res, next) {
    //     res.json({status: 'success', data: '鱼人永不败!'});
    // })
};
