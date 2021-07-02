const memory = require("./memory/memory");
const User = require("./classes/User");
const Folder = require("./classes/Folder");
const File = require("./classes/File");
const activeUser = require("./activeUser");
const actualDir = require("./actualDir");

module.exports = (fileName) => {
    try {
        savedData = require(`./memory/${fileName}`);
        //restore files
        for (const file of savedData.files) {
            memory.files.push(new File(file.name, file.content, file.user));
            memory.files[memory.files.length - 1].meta = {
                createdBy: file.meta.createdBy,
                createdAt: file.meta.createdAt,
                parentFolder: file.meta.parentFolder,
            };
        }
        //restore users
        for (const user of savedData.users) {
            memory.users.push(new User(user.username, user.pass, user.role));
        }
        if (memory.users.length > 0) {
            activeUser.user = memory.users[0];
            actualDir.path[0] = `\x1b[36m${activeUser.user.username}@\x1b[0m`;
        }

        //restore folders
        for (const folder of savedData.folders) {
            parentFolder = {
                name: folder.parentFolder.name,
                _id: folder.parentFolder._id,
            };
            memory.folders.push(new Folder(folder.name, parentFolder));
            memory.folders[memory.folders.length - 1]._id = folder._id;
            memory.folders[memory.folders.length - 1].createdAt =
                folder.createdAt;
        }
        console.log("* Data restored from " + fileName);
    } catch (error) {}

    return;
};
