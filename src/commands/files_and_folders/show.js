const { validateShow } = require("../../validations/files.validations");
const memory = require("../../memory/memory");
const actualDir = require("../../actualDir");

module.exports = async (receivedInput) => {
    const title = receivedInput.split(" ")[1];
    let validate = validateShow(receivedInput, title);
    if (typeof(validate)==="string") {
        return validate;
    }
    await console.log(validate[0].show());
};
