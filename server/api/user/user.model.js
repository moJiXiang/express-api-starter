'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var authTypes = ['github', 'google'];
var crypto = require('crypto');

var UserSchema = new Schema({
  name: {type: String, unique: true, required: true},
  email: {type: String,unique: true, required: true},
  role: {
    type: String,
    default: 'user'
  },
  password: String,
  provider: String,
  salt: String // used for encrypt password, ensure every user has the different salt
})


UserSchema.pre('save', function(next) {

  var _this = this;

  // Handle new/update passwords
  if (this.isModified('password')) {
    if (!(this.password && this.password.length) && authTypes.indexOf(this.provider) === -1) {
      next(new Error('Invalid Password'));
    }

    // make salt
    this.makeSalt(null, function(saltErr, salt) {
      if(saltErr) {
        next(saltErr);
      }
      _this.salt = salt;
      _this.encryptPassword(_this.password, function(encryptErr, hashedPassword) {
        if(encryptErr) {
          next(encryptErr);
        }
        _this.password = hashedPassword;
        next();
      })
    })
  // if update other fields, go next()
  } else {
    next();
  }
})

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * authenticate - check if the passwords are the same
   * @param  {String}   password
   * @param  {String} callback
   * @return {Boolean}
   */
  authenticate: function(password, callback) {
    if(!callback) {
      return this.password === this.encryptPassword(password);
    }

    var _this = this;
    this.encryptPassword(password, function(err, pwdGen) {
      if(err) {
        callback(err);
      }
      if(_this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    })
  },

  /**
   * Make salt
   * @param  {Number}   byteSize Optional salt byte size, default to 16
   * @param  {Function} callback
   * @return {String}
   */
  makeSalt: function(byteSize, callback) {
    var defaultByteSize = 16;

    if(!byteSize) {
      byteSize = defaultByteSize;
    }

    if(!callback) {
      return crypto.randomBytes(byteSize).toString('base64');
    }

    return crypto.randomBytes(byteSize, function(err, salt) {
      if(err) {
        callback(err);
      }
      return callback(null, salt.toString('base64'))
    })
  },

  /**
   * Encrypt password
   * @param  {String}   password
   * @param  {function} callback
   * @return {String}
   */
  encryptPassword: function(password, callback) {
    if(!password || !this.salt) {
      return null;
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');
    var digest = 'sha512'

    if(!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, digest).toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, digest, function(err, key) {
      if(err) {
        callback(err);
      }
      return callback(null, key.toString('base64'));
    })
  }
}


module.exports = mongoose.model('User', UserSchema);
