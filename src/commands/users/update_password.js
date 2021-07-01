const memory = require("../../memory/memory");
const activeUser = require('../../activeUser');

const { validateUpdatePassword, validateDestroyUpdateParams } =require('../../validations/users.validations')
const {isReadOnly} = require('../../validations/role.validations')

module.exports = async (receivedInput) => {
    const receivedPassword = receivedInput.split(" ")[1]

    let validateError = await isReadOnly()
    if (validateError) {
        return validateError
    }

    validateError = await validateDestroyUpdateParams(receivedInput);
    if (validateError) {
        return validateError;
    }


    validateError = await validateUpdatePassword(receivedPassword)
    if(validateError) return validateError
   
   
   
        activeUser.user.setPassword(receivedPassword)

}