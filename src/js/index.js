// ogogdol avah 
require('@babel/polyfill');
// ferch() orond axios
import Search from "./model/Search"
let search = new Search("pasta");
// console.log(search)  ;
  search.doSearch().then( e => console.log( e ));
