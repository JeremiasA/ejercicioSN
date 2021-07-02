const { validateParams, validateNotExists } = require("../../validations/files.validations");
const {isReadOnly} = require('../../validations/role.validations')
const memory = require("../../memory/memory");
const activeUser = require('../../activeUser')
const File = require('../../classes/File')
const actualDir = require('../../actualDir')

module.exports = async (receivedInput) => {
    const receivedParams = receivedInput.split(" ");
    const name = receivedParams[1];
        
    let validateError = await validateParams(receivedInput);
    if (validateError) return validateError
    
    validateError = await isReadOnly()
    if (validateError) return validateError

    validateErr = await validateNotExists(receivedInput,name);
    if (validateError) return validateError

    const content = receivedParams
        .splice(2, receivedParams.length)
        .join(" ");
    const parentFolder = actualDir.dir._id;

    memory.files.push(new File(name, content,parentFolder, activeUser.user.username));
    return;
    }
