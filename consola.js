const User = require("./User");
const actualDir = require('./actualDir');
const commandsList = require("./commands");
const {input} = require('./prompt');

const prmpt = async () =>{
let exit=false
    while (!exit) {
        let message=[]
        if(actualDir.path.length>2) message=actualDir.path.map(dir =>
             actualDir.path.indexOf(dir)==0 || actualDir.path.indexOf(dir)==actualDir.path.length-1 ? dir : actualDir.path.indexOf(dir)==1 ?".../" : "" )
        else{
            message=actualDir.path
        }
             let receivedInput = await input(message.join(""))
        const command = receivedInput.split(" ")[0]
        if(commandsList.hasOwnProperty(command)){
            if(command==="exit") exit = true
            else{
                const errorReturned = await commandsList[command](receivedInput)
                if(errorReturned) console.error(errorReturned)
            } 
        }
        else{
            console.log(`'${command}' is not a valid command. Input 'help' to see a list of valid commands.`);            
        }
    }
}


    
prmpt()    
