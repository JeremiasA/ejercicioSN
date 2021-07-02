const chai = require("chai");
const commands = require("../commands");
const memory = require("../memory/memory");
const User = require("../classes/User");
const activeUser = require("../activeUser");

describe("Folders operations", async () => {
    const error_params_createFolder = "create_folder";
    const succes_createFolder = "create_folder newFolder";

    before(async function () {
        memory.users.push(await new User("admin", "1234", "super"));
        activeUser.user = memory.users[0];
    });

    it("Should returns params error", async () => {
        //Arrange
        let line = error_params_createFolder;
        //Act
        const result = await commands.create_folder(line);
        //Assert
        chai.assert.equal(
            result,
            "Error: Invalid arguments => create_folder <foldername>"
        );
    });

    it("Should create folder and assign it to memory.folders", async () => {
        //Arrange
        let line = succes_createFolder;
        foldersLength = memory.folders.length;
        //Act
        await commands.create_folder(line);

        //Assert
        chai.assert.equal(memory.folders.length, foldersLength + 1);
        chai.assert.equal(
            memory.folders[memory.folders.length - 1].name,
            "newFolder"
        );
    });

    it("Should returns privileges error at create folder", async () => {
        //Arrange
        memory.users.push(await new User("readOnlyUser", "1234", "read-only"));
        activeUser.user = memory.users[memory.users.length-1];
        let line = succes_createFolder;
        foldersLength = memory.folders.length;
        //Act
        const result = await commands.create_folder(line);
        activeUser.user = memory.users[memory.users.length-2];
        //Assert
        chai.assert.equal(result, "Permission denied for 'read-only' users.");
    });

    it("Should destroy previous added folder and quit it from memory.folders", async () => {
        //Arrange
        let line = "destroy newFolder/";
        lengthAfterDestroy = memory.folders.length;
        //Act
        await commands.destroy(line);
        const result = await memory.folders.filter(
            (folder) => folder.name === "newFolder"
        );
        //Assert
        chai.assert.equal(memory.folders.length, lengthAfterDestroy-1);
        chai.assert.equal(result.length, 0);
    });

    it("Should returns folder does not exists", async () => {
        //Arrange
        let line = "destroy otherFolder/";
        //Act
        const result = await commands.destroy(line);
        //Assert
        chai.assert.equal(result, "Error: file or directory does not exists. Use  => delete <filename | foldername/>");
    });
});
