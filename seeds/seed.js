const sequelize = require('../config/connection');
const { Comment, CommentedSong, Post, Song, User} = require('../models');

const userData = require ('./userData.json');
const postData = require ('./postData.json');
const commentData = require ('./commentData.json');
const commentedSongData = require('./commentedSongData.json');
const songData = require('./songData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({force: true});
        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        await Song.bulkCreate(songData)
        await Comment.bulkCreate(commentData)
        await Post.bulkCreate(postData)
        await CommentedSong.bulkCreate(commentedSongData)
        process.exit(0);
    } catch (err) {
        throw err
    }
};

seedDatabase();