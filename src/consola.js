const commandsList = require("./commands");
const { input } = require("./prompt");
const save_data = require('./save_data')
const initial_config = require('./initial_config')

const [mode, fileName] = initial_config()

let exit = false;
(async () => {
    while (!exit) {
   
        let receivedInput = await input();
        const command = receivedInput.split(" ")[0];
        
        if (commandsList.hasOwnProperty(command)) {
            if (command === "exit") {
               if (mode==="persistence") save_data(fileName);
               exit = true;
            } else {
                const errorReturned = await commandsList[command](receivedInput);
                if (errorReturned) console.error(errorReturned);
            }
        } else {
            console.log(`'${command}' is not a valid command. Input 'help' to see a list of valid commands.`);
        }
    }
})();
