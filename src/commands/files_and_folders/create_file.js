const { validateParams, validateNotExists } = require("../../validations/files.validations");
const {isReadOnly} = require('../../validations/role.validations')
const memory = require("../../memory/memory");
const activeUser = require('../../activeUser')

module.exports = async (receivedInput, File, actualDir) => {
    const receivedParams = receivedInput.split(" ");
    const name = receivedParams[1];
        let validationError = await validateParams(receivedInput);
        if (validationError) {
            return validationError;
        }
        
        validateError = await isReadOnly()
        if (validateError) {
            return validateError
        }

       let validationErr = await validateNotExists(receivedInput,name);
       if (validationErr) {
          return validationErr;
        }
        const content = receivedParams
            .splice(2, receivedParams.length)
            .join(" ");
        const parentFolder = actualDir.dir._id;
        memory.files.push(await new File(name, content,parentFolder, activeUser.user.username));
        return;
    }
