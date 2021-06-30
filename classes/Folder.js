
module.exports = class Folder {
    constructor(name,parentFolder){
        this.name = name,
        this.parentFolder = parentFolder
        this._id = Folder.incrementId()
        this.createdAt = new Date().toLocaleString()
        }
     
    static incrementId() {
      if (!this.latestId) this.latestId = 1
      else this.latestId++
      return this.latestId
    }
}
            

