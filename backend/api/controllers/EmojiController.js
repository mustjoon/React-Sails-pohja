/**
 * EmojiController
 *
 * @description :: Server-side logic for managing emojis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		create: function(req,res){
			var params = req.params.all();
			if(!params.name || !params.emoji){
				return res.json(401, {err: 'You need to include name and emoji!'});
			}
			Emoji.create({name: params.name,emoji: params.emoji}).exec(function createCB(err,created){
				
				console.log(created);
				return res.json(created);
					
			
			});
		}
};

