const memory = require("../../memory/memory");
const { validateLoginParams } =require('../../validations/users.validations')
const activeUser = require('../../activeUser')
const actualDir = require('../../actualDir');

module.exports = async (receivedInput) => {
    const receivedPassword = receivedInput.split(" ")[2] 
    const receivedUsername = receivedInput.split(" ")[1]


    validateError = await validateLoginParams(receivedInput);
    if (validateError) {
        return validateError;
    }

    const foundedUser = memory.users.filter( user => user.username === receivedUsername);
    if (foundedUser.length !== 0) {
        const userPass = foundedUser[0].getPassword()
        if(userPass === receivedPassword){
            activeUser.user=foundedUser[0]
            actualDir.path[0]=`\x1b[36m${activeUser.user.username}@\x1b[0m`
            return `${foundedUser[0].username} logged.`
        }
    }
    return "Error: Bad credentials";

}