const { validateDestroy } = require("../../validations/files.validations");
const memory = require("../../memory/memory");


module.exports = async (receivedInput) => {
    const title = receivedInput.split(" ")[1];
    
    let validate = validateDestroy(receivedInput, title);
    if (typeof (validate) ==="string") {
        return validate;
    } 
    indice = memory.files.indexOf(validate[0])
     memory.files.splice(indice,1);
};