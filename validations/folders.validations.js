const memory = require("../memory/memory");
const actualDir = require("../actualDir");

const validateParams = async (receivedInput) => {
    const receivedParams = receivedInput.trim().split(" ");
    if (receivedParams.length !== 2)
        return "Error: Invalid arguments => create_folder <foldername>";
};

const validateCd = async (receivedInput) => {
    const receivedParams = receivedInput.split(" ");
    if (receivedParams.length !== 2)
        return "Error: Invalid arguments => create_folder <foldername>";

    const foundedDir = memory.folders.filter(
        (folder) =>
            folder.name === receivedParams[1] &&
            folder.parentFolder === actualDir.dir
    );

    if (foundedDir.length === 0) {
        return "Error: folder does not exists";
    }else return foundedDir
};

const validateNotExists = async (receivedInput) => {
    const receivedParams = receivedInput.split(" ");
    const foundedDir = memory.folders.filter(
        (folder) =>
            folder.name === receivedParams[1] &&
            folder.parentFolder === actualDir.dir
    );
    if (foundedDir.length > 0) {
        return "Error: folder already exists";
    }
};

module.exports = { validateParams, validateCd, validateNotExists };
