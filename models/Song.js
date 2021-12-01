const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model { }

Song.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        song_title: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        song_artist: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscore: true,
        modelName: 'song',
    }
)

module.exports = Song;