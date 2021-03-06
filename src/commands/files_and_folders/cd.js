const { validateCd } = require("../../validations/folders.validations");
const memory = require("../../memory/memory");
const actualDir = require("../../actualDir");

module.exports = async (receivedInput) => {
    const receivedParams = receivedInput.trim().split(" ");

    if ( receivedParams.length == 1 || (actualDir.dir._id === 0 && receivedParams[1] === "..")) return; 

    if (receivedParams[1] === "..") {
        actualDir.path.pop();
        actualDir.dir = actualDir.prev;
        actualDir.prev = actualDir.dir.parentFolder;
    } else {
        let validated = await validateCd(receivedInput);
        if (typeof (validated) === "string") {
            return validated;
        }
         
        actualDir.prev = actualDir.dir;
        actualDir.dir = validated[0];
        actualDir.path.push(receivedParams[1] + "/");
        
    }
    return;
};
