/**
 * EmojiController
 *
 * @description :: Server-side logic for managing emojis
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
		},

		create: function(req,res){
			var params = req.params.all();

			//USERID
			var id = req.token.id;
			if(!params.name || !params.emoji){
				return res.json(401, {err: 'You need to include name and emoji!'});
			}
			Emoji.create({ owner: id,name: params.name,emoji: params.emoji}).exec(function createCB(err,created){
				return res.json(created);
					
			
			});
		}
	
};

