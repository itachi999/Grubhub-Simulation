var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var { secret } = require('./config');
const kafka = require('./kafka/client');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    kafka.make_request('passport', jwt_payload.id, function (err, results) {
      if (err) {
        return done(err, false);
      }
      if(results){
        done(null, results);
      }
      else {
        done(null, false);
      }
    });
  }));
};