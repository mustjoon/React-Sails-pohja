/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {

    var valid = UserService.isValid(req,res);

    if(valid){
      return res.json({
            user: user,
            token: jwToken.issue({id : user.id })
          });
    }

    if (!email || !password) {
      return res.json(401, {err: 'email and password required'});
    }

  },

  refresh: function(req,res){
    console.log(req.header);
  }
};
