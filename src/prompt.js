const prompt = require("prompt");
const actualDir = require("./actualDir");
let message_ = [];

module.exports = {
    input: async () => {
        //shows '...'  instead complete path
        if (actualDir.path.length > 2) {
            message_ = actualDir.path.map((dir) =>
                actualDir.path.indexOf(dir) === 0 ||
                actualDir.path.indexOf(dir) === actualDir.path.length - 1
                    ? dir
                    : actualDir.path.indexOf(dir) === 1
                    ? ".../"
                    : ""
            );
        } else {
            message_ = actualDir.path;
        }

        prompt.message = message_.join("");
        prompt.delimiter = "";
        prompt.start();
        const receivedInput = await prompt.get(">");
        return receivedInput[">"];
    },
};
