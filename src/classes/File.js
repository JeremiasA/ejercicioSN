module.exports = class File {
    constructor(name,content, parentFolder,user){
        this.name = name,
        this.content = content,
        this.user =user,
        this.meta = {
            createdBy: user,
            createdAt : new Date().toLocaleString(),
            parentFolder: parentFolder
        }
    }
    show(){
        return( `${this.name}: ${this.content}`)
    }
    metadata(){
        return(this.meta)
    }        

}