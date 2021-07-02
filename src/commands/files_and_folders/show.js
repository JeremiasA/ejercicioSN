const validations = require("../../validations/files.validations");
const memory = require("../../memory/memory");
const actualDir = require("../../actualDir");

module.exports = (receivedInput) => {
    const title = receivedInput.split(" ")[1];
    let validate = validations.validateShow(receivedInput, title);
    if (typeof(validate)==="string") return validate;
    
    const fileContent=validate[0].show()
    console.log(fileContent);
};
