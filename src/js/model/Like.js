export default class Likes {
    constructor (){
        this.readDataFromLocalStorage();
        if(!this.likes) this.likes = [];
    }
    addLike(id, title, publisher, img){
        const like ={ id, title, publisher, img }
        this.likes.push(like)
        // storage luu hadgalna
        this.saveDataToLocalStorage()
        return like;
    }
    deleteLike(id){
        // id gedeg ID ortsiig massive aas haij olno
        const index = this.likes.findIndex(el => el.id === id)
        // ug index deerh elementiig massive aas ustgana 
        this.likes.splice(index, 1)
        this.saveDataToLocalStorage()
    }
    isLike(id){
        if(this.likes.findIndex(el => el.id === id)=== -1) return false;
        else return true;
    }
    getNumberOfLikes(){
        return this.likes.length;
    }
    saveDataToLocalStorage(){
        localStorage.setItem("likes", JSON.stringify(this.likes))
    }
    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem("likes"))
    }
}