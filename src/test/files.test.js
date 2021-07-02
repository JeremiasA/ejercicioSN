const chai = require("chai");
const commands = require("../commands");
const memory = require("../memory/memory");
const User = require("../classes/User");
const activeUser = require("../activeUser");

describe("Files operations", async () => {
    const error_params_createFile = "create_file";
    const succes_createFile = "create_file newFile this is file content";
    const error_notExists_show = "show other";
    const error_notExists_meta = "metadata other";

    before(async function () {
        memory.users.push(await new User("admin", "1234", "super"));
        activeUser.user = memory.users[0];
        await commands.create_file(succes_createFile);
    });

    beforeEach(async function () {});

    afterEach(function () {});

    it("Should returns params error", async () => {
        //Arrange
        let line = error_params_createFile;
        //Act
        const result = await commands.create_file(line);
        //Assert
        chai.assert.equal(
            result,
            "Error: Invalid arguments => create_file <filename> '<content>'"
        );
    });

    it("Should create file and assign it to memory.files", async () => {
        //Arrange
        let line = succes_createFile;
        filesLength = memory.files.length;
        //Act
        await commands.create_file(line);

        //Assert
        chai.assert.equal(memory.files.length, filesLength + 1);
        chai.assert.equal(
            memory.files[memory.files.length - 1].name,
            "newFile"
        );
    });

    it("Should returns privileges error at create file", async () => {
        //Arrange
        memory.users.push(await new User("readOnlyUser", "1234", "read-only"));
        activeUser.user = memory.users[memory.users.length-1];
        let line = succes_createFile;
        //Act
        const result = await commands.create_file(line);
        activeUser.user = memory.users[memory.users.length-2];
        //Assert
        chai.assert.equal(result, "Permission denied for 'read-only' users.");
    });


    it("Should shows error: file not exists when Show...", async () => {
        //Arrange
        let line = error_notExists_show;
        //Act
        const result = await commands.show(line);
        //Assert
        chai.assert.equal(result, "Error: file does not exists in diretory");
    });

    it("Should shows error: file not exists when Metadata...", async () => {
        //Arrange
        let line = error_notExists_meta;
        //Act
        const result = await commands.metadata(line);
        //Assert
        chai.assert.equal(result, "Error: file does not exists in diretory");
    });

    it("Should destroy previous added file and quit it from memory.files", async () => {
        //Arrange
        memory.users.push(await new User("admin", "1234", "super"));
        activeUser.user = memory.users[0];
        let line = "destroy testFile";
        lengthAfterCreateFile = memory.files.length;
        //Act
        await commands.create_file("create_file testFile fake data");
        await commands.destroy(line);
        const result = await memory.files.filter(
            (file) => file.name === "testFile"
        );
        //Assert
        chai.assert.equal(memory.files.length, lengthAfterCreateFile);
        chai.assert.equal(result.length, 0);
    });

    it("Should returns file does not exists", async () => {
        //Arrange
        let line = "destroy otherFile";
        //Act
        const result = await commands.destroy(line);
        //Assert
        chai.assert.equal(result, "Error: file or directory does not exists");
    });
});
