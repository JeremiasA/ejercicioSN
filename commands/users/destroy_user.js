const memory = require("../../memory/memory");
const { validateDestroy, validateDestroyUpdateParams } =require('../../validations/users.validations')
const {isAdmin} = require('../../validations/role.validations')
module.exports = async (receivedInput) => {
   
    let validationError = await isAdmin()
    if (validationError) {
        return validationError;
    }
   
    validationError = await validateDestroyUpdateParams(receivedInput);
    if (validationError) {
        return validationError;
    }

    let validate = await validateDestroy(receivedInput)
    if(typeof(validate)==="string") return validate
   
   
    const indice = memory.users.indexOf(validate[0])
    memory.users.splice(indice,1);
    console.log(users);
    }