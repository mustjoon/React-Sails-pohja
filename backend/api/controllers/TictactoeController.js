/**
 * TictactoeController
 *
 * @description :: Server-side logic for managing tictactoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(req,res){

			var id = req.token.id;
			// Find by user id!
			Emoji.find({owner: id}).exec(function(err,data){
				console.log(data.length);
				return res.json(data);
			})
		}
	
};

