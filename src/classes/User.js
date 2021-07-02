module.exports = class User {
    #password
    constructor(username,password, role){
        this.username = username,
        this.#password = password
        this._id = User.incrementId()
        this.role = role
        }
     
    static incrementId() {
      if (!this.latestId) this.latestId = 1
      else this.latestId++
      return this.latestId
    }
     setPassword(newPassword) {
      this.#password=newPassword;
    } 
    getPassword(){
      return this.#password
    }

}
            
