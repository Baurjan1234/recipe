// ogogdol avah 
require('@babel/polyfill');
// ferch() orond axios
import Search from "./model/Search"
import { elements, renderLoader,clearLoader } from "./view/base";
import * as searchView from "./view/searchView"
/* 
web app tolov 
- hailtiin query ur dun 
- tuhain uzuulj bag jor
- like san jor
- zahialj baigaa nairlaguud
*/
const state = {};

const controlSearch = async () =>{
  // 1 web hailt tulhuur ug gargaj avna 
  const query = searchView.getInput();
  if(query){
    // 2 shine hailtiin object uusgene
    state.search = new Search (query);
     
  // 3 hailt hiihed zoriulj delgets beltegne UI
  searchView.clearSearchQuery();
  searchView.clearSearchResult();
  renderLoader(elements.searchResultDiv),
  // 4 hailt guitsetgene,

  await state.search.doSearch();

  // 5 hailt ur dun delgetsend 
  clearLoader();
  if(state.search.result === undefined) alert("Хайлт үр дүн байхгүй байна");
  else searchView.renderRecipes(state.search.result);
  }
  
}

elements.searchForm.addEventListener("submit", e =>{
  // garanguuta arilah zogsooh
  e.preventDefault();
  controlSearch();
})