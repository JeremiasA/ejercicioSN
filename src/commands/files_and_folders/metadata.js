const { validateMetadata } = require("../../validations/files.validations");
const memory = require("../../memory/memory");

module.exports = async (receivedInput) => {
    const title = receivedInput.split(" ")[1];
    let validate = validateMetadata(receivedInput, title);
    if (typeof(validate)==="string") {
        return validate;
    }
    await console.log(validate[0].metadata());
};