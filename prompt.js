const prompt = require('prompt');


module.exports = {
    input : async (actualDir) =>{
        prompt.message = actualDir;
        prompt.delimiter = "";
        prompt.start();
        const receivedInput = await prompt.get(">")
        return receivedInput[">"];
}
}