const {
    validateParams,
    validateNotExists,
} = require("../../validations/folders.validations");
const { isReadOnly } = require("../../validations/role.validations");
const memory = require("../../memory/memory");
const actualDir = require("../../actualDir");
const Folder = require("../../classes/Folder");

module.exports = async (receivedInput) => {
    const name = receivedInput.split(" ")[1];
    const parentFolder = actualDir.dir;

    let validateError = await validateParams(receivedInput, name);
    if (validateError) return validateError

    validateError = await isReadOnly();
    if (validateError) return validateError

    validateError = await validateNotExists(receivedInput, name);
    if (validateError) return validateError
    
    memory.folders.push(new Folder(name, parentFolder));
    return;
};
