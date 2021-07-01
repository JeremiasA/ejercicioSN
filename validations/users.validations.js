const memory = require("../memory/memory");
const activeUser= require('../activeUser')

const validateParams = async (receivedInput) => {
    const params = receivedInput.split(" ");
    if (params.length !== 4 || params[3].trim().split("=")[0]!=="-role")
        return "Error: Invalid arguments => create_user <username> <password> -role=<role>";
};

const validateLoginParams = async (receivedInput) => {
    const params = receivedInput.split(" ");
    if (params.length !== 3)
        return "Error: Invalid arguments => login <username> <password>";
};

const validateDestroyUpdateParams = async (receivedInput) => {
    const params = receivedInput.split(" ");
    params[0]==="destroy_user" ? message="destroy_user <username>" : message= "update_password <newPassword>"
    if (params.length !== 2 )
        return `Error: Invalid arguments => ${message}`;
};

const validateNotExists = async (receivedUsername) => {
    const foundedUser = memory.users.filter(
        (user) => user.username === receivedUsername );
    if (foundedUser.length > 0) {
        return "Error: username already exists";
    }
};

const validateLengths = async (receivedUsername,receivedPassword) => {
    if (receivedUsername.length < 4 || receivedPassword.lenght < 4) {
        return "Error: username and password length must be at least 4";
    }
};

const validateUpdatePassword = async (receivedPassword) => {
   
    if (receivedPassword.length < 4) {
        return "Error: password length must be at least 4";
    }
};


const validateRole = async (receivedRole) => {
    const roles = ["super", "regular", "read-only"]
    if (!roles.includes(receivedRole)) {
        return `Error: Invalid role. Select: ${roles}`;
    }
};

const validateDestroy = (receivedInput) => {
    const receivedParams = receivedInput.split(" ");

    if (receivedParams.length !== 2) {
        return "Error: Invalid arguments => delete <username>";
    } else {
        const foundedUser = memory.users.filter( user => user.username === receivedParams[1]);

        if (foundedUser.length === 0 || foundedUser[0] === activeUser.user ) {
            return `Error: User '${receivedParams[1]}' does not exists`;
        } else {
            return foundedUser;
        }
    }
};

module.exports={
    validateNotExists,
    validateParams, 
    validateLengths, 
    validateRole, 
    validateDestroy, 
    validateUpdatePassword, 
    validateDestroyUpdateParams,
    validateLoginParams
}