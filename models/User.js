const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        max: 24,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 40,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);


















//const { Model, DataTypes } = require('sequelize');
//const bcrypt = require('bcrypt');
//const sequelize = require('../config/connection');
//
//class User extends Model {
//    checkPassword(loginPassword) {
//        return bcrypt.compareSync(loginPassword, this.password);
//    }
//}
//
//User.init({
//    id: {
//        type: DataTypes.INTEGER,
//        allowNull: false,
//        primaryKey: true,
//        autoIncrement: true,
//    },
//    user_name: {
//        type: DataTypes.STRING,
//        allowNull: false,
//    },
//    user_email: {
//        type: DataTypes.STRING,
//        allowNull: false,
//        validate: {
//            isEmail: true,
//        },
//    },
//    user_password: {
//        type: DataTypes.STRING,
//        allowNull: false,
//        validate: {
//            length: [8],
//        },
//    }
//},
//    {
//        hooks: {
//            beforeCreate: async (newUserData) => {
//                newUserData.password = await bcrypt.hash(newUserData.password, 4);
//                return newUserData;
//            },
//            beforeUpdate: async (existingUserData) => {
//                existingUserData.password = await bcrypt.hash(existingUserData.password, 4);
//                return existingUserData;
//            }
//        },
//        sequelize,
//        timestamps: false,
//        freezeTableName: true,
//        underscored: true,
//        modelName: 'user',
//    }
//);
//
//module.exports = User;