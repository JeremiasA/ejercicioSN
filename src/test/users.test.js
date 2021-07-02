const chai = require("chai");
const commands = require("../commands");
const memory = require("../memory/memory");
const User = require("../classes/User");
const activeUser = require("../activeUser");

describe("Users operations", async () => {
    const error_params_createUser = "create_user username password";
    const success_create_user = "create_user testUser testPassword -role=regular"
    const error_bad_role = "create_user testUser testPassword -role=other"

    before(async function () {
        memory.users.push(await new User("admin", "1234", "super"));
        activeUser.user = memory.users[0];
    });

    it("Should returns params error", async () => {
        //Arrange
        let line = error_params_createUser
        //Act
        const result = await commands.create_user(line);
        //Assert
        chai.assert.equal(
            result,
            "Error: Invalid arguments => create_user <username> <password> -role=<role>"
        );
    });

    it("Should returns bad role selected", async () => {
        //Arrange
        let line = error_bad_role
        //Act
        const result = await commands.create_user(error_bad_role);
        //Assert
        chai.assert.equal(
            result,
            "Error: Invalid role. Select: super,regular,read-only"
        );
    });

    it("Should create user and assign it to memory.users", async () => {
        //Arrange
        let line = success_create_user;
        usersLength = memory.users.length;
        //Act
        await commands.create_user(line);

        //Assert
        chai.assert.equal(memory.users.length, usersLength + 1);
        chai.assert.equal(
            memory.users[memory.users.length-1].username,
            "testUser"
        );
    });

    it("Should returns bad privileges at create user", async () => {
        //Arrange
        memory.users.push(await new User("readOnlyUser", "1234", "read-only"));
        activeUser.user = memory.users[memory.users.length-1];
        let line = success_create_user;
        //Act
        const result = await commands.create_user(line);
        activeUser.user = memory.users[0];
        //Assert
        chai.assert.equal(result, "Permission denied: Super user privileges needed.");
        
    });


    it("Should returns error user already exits", async () => {
        //Arrange
        usersLength = memory.users.length;
        //Act
        const result = await commands.create_user("create_user admin pass -role=regular");

        //Assert
        chai.assert.equal(result, "Error: username already exists");
    });

    it("Should destroy previous added user and quit it from memory.users", async () => {
        //Arrange
        let line = "destroy_user testUser";
        lengthAfterDestroy = memory.users.length;
        //Act
        await commands.destroy_user(line);
        const result = await memory.users.filter(
            (user) => user.username === "testUser"
        );
        //Assert
        chai.assert.equal(memory.users.length, lengthAfterDestroy-1);
        chai.assert.equal(result.length, 0);
    });

    it("Should returns bad privileges at destroy user", async () => {
        //Arrange
        memory.users.push(await new User("notAdmin", "1234", "regular"));
        activeUser.user = memory.users[memory.users.length-1];
        let line = "destroy_user testUser";
        //Act
        const result = await commands.destroy_user(line);
        activeUser.user = memory.users[0];

        //Assert
        chai.assert.equal(result, "Permission denied: Super user privileges needed.");
    });

    it("Should returns error at destroy, user not exits", async () => {
        //Arrange
        let line = "destroy_user other";
        lengthAfterDestroy = memory.users.length;
        //Act
        const error = await commands.destroy_user(line);
        //Assert
        chai.assert.equal(error, "Error: User 'other' does not exists");
    });
    
    it("Should login and change active user", async () => {
        //Arrange
        let line = "login admin 1234";
        //Act
        await commands.login(line);
        //Assert
        chai.assert.equal(activeUser.user.username,"admin");
    });

    it("Should return bad credentials at login", async () => {
        //Arrange
        let line = "login admin 123454";
        //Act
        const result = await commands.login(line);
        //Assert
        chai.assert.equal(result, "Error: Bad credentials");
    });

    it("Should update password", async () => {
        //Arrange
        let prevPassword = activeUser.user.getPassword()
        let line = "update_password 123456";
        //Act
        await commands.update_password(line);
        //Assert
        chai.assert.equal(activeUser.user.getPassword(), "123456");
        chai.assert.notEqual(activeUser.user.getPassword(), prevPassword);
    });

    it("Should shows bad privileges at update password", async () => {
        //Arrange
        memory.users.push(await new User("read-only", "1234", "read-only"));
        activeUser.user = memory.users[memory.users.length-1];
        let prevPassword = activeUser.user.getPassword()
        let line = "update_password 123456";
        //Act
        const result = await commands.update_password(line);
        //Assert
        chai.assert.equal(result, "Permission denied for 'read-only' users.");
        chai.assert.equal(activeUser.user.getPassword(), prevPassword);
    });

});
