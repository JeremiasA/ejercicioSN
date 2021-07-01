const { validateParams, validateNotExists } = require("../../validations/folders.validations");
const {isReadOnly} = require('../../validations/role.validations')
const memory = require("../../memory/memory");
const actualDir = require('../../actualDir');

module.exports = async (receivedInput, Folder) => {
    
        const name = receivedInput.split(" ")[1];
        const parentFolder = actualDir.dir
    
        let validationError = await validateParams(receivedInput,name);
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
        memory.folders.push(await new Folder(name, parentFolder));
        return;
    }
