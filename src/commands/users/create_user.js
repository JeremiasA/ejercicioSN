const {
    validateParams,
    validateNotExists,
    validateLengths,
    validateRole,
} = require("../../validations/users.validations");
const { isAdmin } = require("../../validations/role.validations");
const memory = require("../../memory/memory");
const User = require("../../classes/User");

module.exports = async (receivedInput) => {
    let validationErr = await isAdmin();
    if (validationErr) return validationErr;

    validationErr = await validateParams(receivedInput);
    if (validationErr) return validationErr;

    const receivedParams = receivedInput.split(" ");
    const receivedUsername = receivedParams[1];
    const receivedPassword = receivedParams[2];
    const receivedRole = receivedParams[3].trim().split("=")[1];

    validationErr = await validateLengths(receivedUsername, receivedPassword);
    if (validationErr) return validationErr;

    validationErr = await validateRole(receivedRole);
    if (validationErr) return validationErr;

    validationErr = await validateNotExists(receivedUsername);
    if (validationErr) return validationErr;

    memory.users.push(new User(receivedUsername, receivedPassword, receivedRole));
    console.log(memory.users);
    return;
};
