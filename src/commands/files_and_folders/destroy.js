const { validateFileDestroy } = require("../../validations/files.validations");
const { validateFolderDestroy } = require("../../validations/folders.validations");
const {isReadOnly} = require('../../validations/role.validations')

const memory = require("../../memory/memory");


module.exports = async (receivedInput) => {
    let validateError = await isReadOnly()
    if (validateError) {
        return validateError
    }

    const nameToDestroy = receivedInput.split(" ")[1];
    let validate="";
    let type = ""
    if(nameToDestroy[nameToDestroy.length-1]==="/"){
        validate = validateFolderDestroy(receivedInput);
        type="folder"
    } else {
        validate = validateFileDestroy(receivedInput);
        type="file"
    }
    if (typeof (validate) ==="string") {
        return validate;
    } 
    if(type==="file"){
        indice = memory.files.indexOf(validate[0])
        memory.files.splice(indice,1);
    } else {
        indice = memory.folders.indexOf(validate[0])
        memory.folders.splice(indice,1);
    }
};