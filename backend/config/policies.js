/*
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  '*': ['isAuthorized'], // Everything resctricted here
  'UserController': {
    'create': true // We dont need authorization here, allowing public access
  },

  'AuthController': {
    '*': true // We dont need authorization here, allowing public access
  }
};