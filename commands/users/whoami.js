const activeUser = require('../../activeUser')

module.exports = () =>{
    console.log(`Active user: ${activeUser.user.username}`)
}