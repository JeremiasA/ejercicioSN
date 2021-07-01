const fs = require('fs');
const memory= require('./memory/memory')
const User = require('./classes/User')
const File = require('./classes/File')
const Folder = require('./classes/Folder')
const commandsList = require("./commands");
const activeUser = require('./activeUser')
const actualDir = require('./actualDir');
const {input} = require('./prompt');

let mode="memory"
let fileName=""
if(process.argv[2]==="-persisted"){
    mode="disk"
    if(process.argv[3]){
        fileName=process.argv[3]+".json"
    } else {
        fileName="no_name.json"
    }
    console.log("* Persisted mode active: data will be saved in '"+fileName+"'");
}

if(mode==="disk"){
try {
    savedData = require(`./memory/${fileName}`);
    console.log("* Data restored from "+fileName)
    //restore files
    for (const file of savedData.files) {
        memory.files.push(new File(file.name,file.content, file.user))
        memory.files[memory.files.length-1].meta={
            createdBy: file.meta.createdBy,
            createdAt : file.meta.createdAt,
            parentFolder: file.meta.parentFolder
        }
    }
    //restore users
    for (const user of savedData.users) {
        memory.users.push(new User(user.username, user.pass, user.role))
    }
    if(memory.users.length>0){
        activeUser.user= memory.users[0]
        actualDir.path[0]=`\x1b[36m${activeUser.user.username}@\x1b[0m`
    }

    //restore folders
    for (const folder of savedData.folders) {
        parentFolder = {name:folder.parentFolder.name, _id:folder.parentFolder._id}
        memory.folders.push(new Folder(folder.name, parentFolder))
        memory.folders[memory.folders.length-1]._id=folder._id;
        memory.folders[memory.folders.length-1].createdAt=folder.createdAt;
    }

} catch (error) {
}
} 
if(memory.users.length==0) {
    //initialuser
    memory.users.push(new User("admin","1234", "super"))
    activeUser.user= memory.users[0]
    actualDir.path[0]=`\x1b[36m${activeUser.user.username}@\x1b[0m`
} 


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
            if(command==="exit"){
                if(mode==="disk") {

                    for (const user of memory.users) {
                        user.pass = user.getPassword() 
                    }

                    let data = JSON.stringify(memory, null, 2);
                    fs.writeFile(`./memory/${fileName}`, data, (err) => {
                        if (err) throw err;
                        console.log(`Data persisted to file ${fileName}`);
                    });
                }
                exit = true
            }
        
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
