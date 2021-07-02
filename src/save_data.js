const fs = require("fs");
const memory = require('./memory/memory')

module.exports = (fileName)=>{
        for (const user of memory.users) {
            user.pass = user.getPassword();
        }
        let data = JSON.stringify(memory, null, 2);
        fs.writeFile(`./src/memory/${fileName}`, data, (err) => {
            if (err) throw err;
            console.log(`Data persisted to file ${fileName}`);
        });
    return;
}