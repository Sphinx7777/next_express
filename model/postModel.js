const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: String,
	description: String,
	createdDate: Date,
	autor: String

});

const PostModel = mongoose.model('product', postSchema);

module.exports = PostModel;