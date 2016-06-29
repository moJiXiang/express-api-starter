var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// define passport 'local' strategy
function localAuthenticate(User, email, password, done) {
  User.findOneAsync({
    email: email.toLowerCase()
  })
    .then(function(user) {
      console.log(user);
      if(!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        console.log('====================')
        console.log(authenticated);
        if(authError) {
          return done(authError);
        }

        if(!authenticated) {
          return done(null, false, {
            message: 'This password is not correct.'
          })
        } else {
          return done(null, user);
        }
      });
    })
    .catch(function(err) {
      return done(err);
    });
}

exports.setup = function(User, config) {
  //注意，这里的字段名称应该是页面表单提交的名称，即req.body.xxx，而不是user数据库中的字段名称。
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    console.log(email)
    return localAuthenticate(User, email, password, done);
  }));
}
