const actualDir = require('./actualDir');
const File = require("./classes/File");
const Folder = require("./classes/Folder");
const memory = require('./memory/memory')

module.exports = {
    create_file: (receivedInput) => require('./commands/files_and_folders/create_file')(receivedInput,File,actualDir),
    show: (receivedInput) => require('./commands/files_and_folders/show')(receivedInput),
    metadata: (receivedInput) => require('./commands/files_and_folders/metadata')(receivedInput),
    destroy: (receivedInput) => require('./commands/files_and_folders/destroy')(receivedInput),
    create_folder: (receivedInput) => require('./commands/files_and_folders/create_folder')(receivedInput,Folder),
    cd: (receivedInput) => require('./commands/files_and_folders/cd')(receivedInput),
    ls: () => require('./commands/files_and_folders/ls')(),
    whereami: () => require('./commands/files_and_folders/whereami')(),
    create_user: (receivedInput) => require('./commands/users/create_user')(receivedInput),
    update_password: (receivedInput) => require('./commands/users/update_password')(receivedInput),
    destroy_user: (receivedInput) => require('./commands/users/destroy_user')(receivedInput),
    login: (receivedInput) => require('./commands/users/login')(receivedInput),
    whoami: () => require('./commands/users/whoami')(),
    help:() => require('./commands/help')(),
    exit: () => exit = true
};
