require('@babel/polyfill');
import axios from "axios"
export default class Search{
    constructor(query){ 
        this.query = query;
    }
    async doSearch(){
        try{
            let result = await axios("https://forkify-api.herokuapp.com/api/search?q=" + this.query);
            this.r = result.data.recipes;
            return this.r;
        } catch(error){
            alert("asuudal garla: " + error)
        }
    }
}