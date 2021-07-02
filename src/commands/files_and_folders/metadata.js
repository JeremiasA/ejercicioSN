const { validateMetadata } = require("../../validations/files.validations");

module.exports = (receivedInput) => {
    const title = receivedInput.split(" ")[1];
    let validate = validateMetadata(receivedInput, title);
    if (typeof(validate)==="string") return validate;
    console.log(validate[0].metadata());
};