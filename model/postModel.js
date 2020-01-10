const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	name: String,
	description: String
});

const PostModel = mongoose.model('product', postSchema);

module.exports = PostModel;