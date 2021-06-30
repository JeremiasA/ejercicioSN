const activeUser = "Pomelo";
const actualDir = require('./actualDir');
const File = require("./classes/File");
const Folder = require("./classes/Folder");

module.exports = {
    create_file: (receivedInput) => require('./commands/files_and_folders/create_file')(receivedInput,File,actualDir, activeUser),
    show: (receivedInput) => require('./commands/files_and_folders/show')(receivedInput),
    metadata: (receivedInput) => require('./commands/files_and_folders/metadata')(receivedInput),
    destroy: (receivedInput) => require('./commands/files_and_folders/destroy')(receivedInput),
    cf: (receivedInput) => require('./commands/files_and_folders/create_folder')(receivedInput,Folder),
    cd: (receivedInput) => require('./commands/files_and_folders/cd')(receivedInput),
    ls: () => require('./commands/files_and_folders/ls')(),
    whereami: () => require('./commands/files_and_folders/whereami')(),
    create_user: () => {},
    update_password: () => {},
    destroy_user: () => {},
    login: () => {},
    whoami: () => {},
    exit: () => exit = true
};
