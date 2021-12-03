const sequelize = require("../config/connection");
const {User,Post} = require("../testmodels");

const seed = async () =>{
    await sequelize.sync({force: true})
    await User.bulkCreate([
        {
            email:"chrisof@soundbyte.com",
            password:"password"
        },
        {
            email:"chrisn@soundbyte.com",
            password:"password"
        },
        {
            email:"david@soundbyte.com",
            password:"password"
        },
        {
            email:"amay@soundbyte.com",
            password:"password"
        }        
], {
    individualHooks:true
})
await Post.bulkCreate([
    {
        songname:"Song #1",
        description: "This is the first description"
    },
    {
        songname:"Song #2",
        description: "This is the second description"
    },
    {
        songname:"Song #3",
        description: "This is the third description"
    },
    {
        songname:"Song #4",
        description: "This is the fourth description"
    }   
])
console.log("database has been seeded")
process.exit(0)
}

seed();