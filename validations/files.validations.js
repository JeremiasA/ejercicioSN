const memory = require("../memory/memory");
const actualDir = require("../actualDir");

const validateParams = async (receivedInput) => {
    const params = receivedInput.split(" ");
    if (params.length < 2)
        return "Error: Invalid arguments => create_file <filename> '<content>'";
};

const validateNotExists = async (receivedInput) => {
    const receivedParams = receivedInput.split(" ");
    const foundedFile = memory.files.filter(
        (file) =>
            file.name === receivedParams[1] &&
            file.meta.parentFolder === actualDir.dir._id
    );
    if (foundedFile.length > 0) {
        return "Error: folder already exists";
    }
};

const validateShow = (receivedInput) => {
    const receivedParams = receivedInput.split(" ");
    if (receivedParams.length !== 2) {
        return "Error: Invalid arguments => show <filename>";
    } else {
        const foundedFile = memory.files.filter(
            (file) =>
                file.name === receivedParams[1] &&
                file.meta.parentFolder === actualDir.dir._id
        );
        if (foundedFile.length === 0) {
            return "Error: file does not exists in diretory";
        } else {
            return foundedFile;
        }
    }
};

const validateMetadata = (receivedInput) => {
    const receivedParams = receivedInput.split(" ");
    if (receivedParams.length !== 2) {
        return "Error: Invalid arguments => metadata <filename>";
    } else {
        const foundedFile = memory.files.filter(
            (file) =>
                file.name === receivedParams[1] &&
                file.meta.parentFolder === actualDir.dir._id
        );
        if (foundedFile.length === 0) {
            return "Error: file does not exists in diretory";
        } else {
            return foundedFile;
        }
    }
};

const validateFileDestroy = (receivedInput) => {
    const receivedParams = receivedInput.split(" ");

    if (receivedParams.length !== 2) {
        return "Error: Invalid arguments => delete <filename>";
    } else {
        const foundedFile = memory.files.filter(
            (file) =>
                file.name === receivedParams[1] &&
                file.meta.parentFolder === actualDir.dir._id
        );
        if (foundedFile.length === 0) {
            return "Error: file or directory does not exists";
        } else {
            return foundedFile;
        }
    }
};

module.exports = {
    validateParams,
    validateShow,
    validateFileDestroy,
    validateMetadata,
    validateNotExists,
};
