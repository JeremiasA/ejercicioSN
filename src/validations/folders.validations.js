const memory = require("../memory/memory");
const actualDir = require("../actualDir");

const validateParams = async (receivedInput) => {
    const receivedParams = receivedInput.trim().split(" ");
    if (receivedParams.length !== 2)
        return "Error: Invalid arguments => create_folder <foldername>";
};

const validateCd = async (receivedInput) => {
    const receivedParams = receivedInput.trim().split(" ");
    if (receivedParams.length !== 2)
        console.log(
            "Error: Invalid arguments"
        );
    const foundedDir = memory.folders.filter(
        (folder) =>
            folder.name === receivedParams[1] &&
            folder.parentFolder._id === actualDir.dir._id
    );

    if (foundedDir.length === 0) {
        return "Error: folder does not exists";
    } else return foundedDir;
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

const validateDestroyParams = (receivedInput) => {
    const receivedParams = receivedInput.split(" ");
    if (receivedParams.length !== 2) {
        return "Error: Invalid arguments => delete <filename | foldername/>";
    }
};

const validateFolderDestroy = (receivedInput) => {
    const receivedName = receivedInput.split(" ")[1];
    const nameToFind = receivedName.substring(0, receivedName.length - 1);
    const foundedFolder = memory.folders.filter(
        (folder) =>
            folder.name === nameToFind &&
            folder.parentFolder._id === actualDir.dir._id
    );
    if (foundedFolder.length === 0) {
        return "Error: file or directory does not exists. Use  => delete <filename | foldername/>";
    } else {
        return foundedFolder;
    }
};

module.exports = {
    validateParams,
    validateCd,
    validateNotExists,
    validateFolderDestroy,
    validateDestroyParams,
};
