const actualDir = require("../../actualDir");
const memory = require("../../memory/memory");

module.exports = () => {
    let data = "";
    let fileCounter = 0;
    for (const file of memory.files) {
        if (file.meta.parentFolder === actualDir.dir._id) {
            data += file.name + " - " + file.meta.createdAt + "\n";
            fileCounter++;
        }
    }

    folderCounter = 0;
    for (const folder of memory.folders) {
        if (folder.parentFolder._id === actualDir.dir._id) {
            data += folder.name + "/ - " + folder.createdAt + "\n";
            folderCounter++;
        }
    }

    console.log(data);
    console.log(
        `${fileCounter} files and ${folderCounter} folders in ${actualDir.dir.name}`
    );
};
