const { validateParams, validateNotExists } = require("../../validations/files.validations");
const memory = require("../../memory/memory");

module.exports = async (receivedInput, File, actualDir, activeUser) => {
    const receivedParams = receivedInput.split(" ");
    const name = receivedParams[1];
        let validationError = await validateParams(receivedInput);
        if (validationError) {
            return validationError;
        }

       let validationErr = await validateNotExists(receivedInput,name);
       if (validationErr) {
          return validationErr;
        }
        const content = receivedParams
            .splice(2, receivedParams.length)
            .join(" ");
        const parentFolder = actualDir.dir._id;
        memory.files.push(await new File(name, content,parentFolder, activeUser));
        return;
    }
