const load_persisted_data = require("./load_persisted_data");
const load_work_mode = require("./load_work_mode");
const memory = require("./memory/memory");
const User = require("./classes/User");
const activeUser = require("./activeUser");
const actualDir = require("./actualDir");

module.exports = () => {
    const [mode, fileName] = load_work_mode();
    if (mode === "persistence") load_persisted_data(fileName);

    //initial superuser
    if (memory.users.length == 0) {
        memory.users.push(new User("admin", "1234", "super"));
        activeUser.user = memory.users[0];
        actualDir.path[0] = `\x1b[36m${activeUser.user.username}@\x1b[0m/`;
    }
    return [mode, fileName];
};
