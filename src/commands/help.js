const commands = require('../commands'); 

module.exports = () =>{
    let description=""
    for (const command in commands) {
        
        switch (command) {
            case "create_file":
                description="Allows to create a file. => create_file <filename> <content>"    
                break;
            case "show":
                description="Shows file content. => show <file>"    
                break;
            case "metadata":
                description="Shows file metadata. => metadata <file>"    
                break;
            case "destroy":
                description="Allows to destroy file or folder. => destroy <file | folder/>. In folder case be sure to add / at the end "    
                break;
            case "create_folder":
                description="Allows to create a folder. => create_folder <folderName>"    
                break;
            case "cd":
                description="Allows to change directory. => cd <folderName>"    
                break;
            case "ls":
                description="List files and folders in current directory"    
                break;
            case "whereami":
                description="Shows the current directory path"    
                break;
            case "create_user":
                description="Allows to create new user(super rights required). => create_user <username> <password> -role=<role>"    
                break;
            case "update_password":
                description="Allows to update your password(super or regular rights required). => update_password <new_password>"    
                break;                            
            case "destroy_user":
                description="Allows to destroy an user(super rights required). => destroy_user <username>"    
                break;                                    
            case "login":
                description="Allows to login. => login <username> <password>"    
                break;                                    
            case "whoami":
                description="Shows logged user"    
                break;       
            case "help":
                description="Shows help"    
                break;
            case "exit":
                description="Close this console"    
                break;  
            default:
                break;
        }
        console.log(`\x1b[36m${command}\x1b[0m` + " - " + description)
    }

}