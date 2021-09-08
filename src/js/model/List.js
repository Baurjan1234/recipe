import uniqid from "uniqid"


export default class list {
    constructor(){
        this.items = []
    }
    deleteItem(id){
        // id gedeg ID ortsiig massive aas haij olno
        const index = this.items.findIndex(el => el.id === id)
        // ug index deerh elementiig massive aas ustgana 
        this.items.splice(index, 1)
    }
    addItem(item){
        let newItem = {
            id: uniqid(),
            item // item: this.item gej bichij bolno
        }
        this.items.push(newItem)
        return newItem;
    }
}