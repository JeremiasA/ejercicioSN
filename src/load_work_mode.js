let mode = "memory";
let fileName = "";
module.exports=()=>{
    if (process.argv[2] === "-persisted") {
        mode = "persistence";
        if (process.argv[3]) {
            fileName = process.argv[3] + ".json";
        } else {
            fileName = "no_name.json";
        }
        console.log(
            "* Persisted mode active: data will be saved in '" + fileName + "'"
            );
        }
        return [mode, fileName]
    }