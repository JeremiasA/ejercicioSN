const { validateFileDestroy } = require("../../validations/files.validations");
const {
    validateFolderDestroy,
    validateDestroyParams,
} = require("../../validations/folders.validations");
const { isReadOnly } = require("../../validations/role.validations");

const memory = require("../../memory/memory");

module.exports = async (receivedInput) => {
    let validateError = await isReadOnly();
    if (validateError) return validateError;

    validateError = await validateDestroyParams(receivedInput);
    if (validateError) return validateError;

    const nameToDestroy = receivedInput.split(" ")[1];
    let validate = "";
    let type = "";
    if (nameToDestroy[nameToDestroy.length - 1] === "/") {
        validate = await validateFolderDestroy(receivedInput);
        type = "folder";
    } else {
        validate = await validateFileDestroy(receivedInput);
        type = "file";
    }
    if (typeof validate === "string") return validate;

    if (type === "file") {
        indice = memory.files.indexOf(validate[0]);
        memory.files.splice(indice, 1);
    } else {
        indice = memory.folders.indexOf(validate[0]);
        memory.folders.splice(indice, 1);
    }
};
