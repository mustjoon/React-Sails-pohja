/**
 * jwToken
 *
 * @description ::User Service for sails
 * @help        :: 
 */
 
var
  jwt = require('jsonwebtoken'),
  tokenSecret = "secretissecet";

// Checks if User Authentication is Valid
module.exports.isValid = function(req,res) {

		var email = req.params.email;
		var password = req.params.password;
		console.log(req);
	
    if (!email || !password) {
      return res.json(401, {err: 'email and password required'});
    }

    User.findOne({email: email}, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid email or password'});
        } else {
         return true;
        }
      });
    })
		
			
};

