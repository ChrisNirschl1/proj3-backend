const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    // add properites here, ex:
    songname: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    description: {
        type:DataTypes.TEXT,
        allowNull:false
    },   
},{
    sequelize
});

module.exports=Post