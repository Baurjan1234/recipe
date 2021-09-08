// ogogdol avah 
require('@babel/polyfill');
// ferch() orond axios
import Search from "./model/Search"
import { elements, renderLoader,clearLoader } from "./view/base";
import * as searchView from "./view/searchView"
import Recipe from "./model/Recipe";
import List from "./model/List";
import { renderRecipe, clearRecipe, highlightSelectedRecipe } from "./view/recipeView"
import * as listView from "./view/listView"
import Like from "./model/Like";
import * as likesView from "./view/likesView"
/* 
web app tolov 
- hailtiin query ur dun 
- tuhain uzuulj bag jor
- like san jor
- zahialj baigaa nairlaguud
*/
const state = {};

/**
 * model ==> controller <== view 
 */

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
  clearLoader();
  // 4 hailt guitsetgene,
  await state.search.doSearch();

  // 5 hailt ur dun delgetsend 
  
  if(state.search.result === undefined) alert("Хайлт үр дүн байхгүй байна");
  else searchView.renderRecipes(state.search.result);
  }
  
}

elements.searchForm.addEventListener("submit", e =>{
  // garanguuta arilah zogsooh
  e.preventDefault();
  controlSearch();
})
elements.pageButtons.addEventListener("click", e =>{
 const btn  =e.target.closest(".btn-inline")
 if(btn){
  const gotoPageNumber = parseInt(btn.dataset.goto, 10) 
  searchView.clearSearchResult();
  searchView.renderRecipes(state.search.result, gotoPageNumber);  
 }
})
// Jor controller 
const controlRecipe = async () => {
  
  // 1 URL id salgaj avna 
  const id = window.location.hash.replace("#", "");
  if(id){

    // 2 joriin model uusgen 
    state.recipe = new Recipe(id);
    // 3 UI beltgen delgets 
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    // 4 joroo tataj avchirna
    await state.recipe.getRecipe();
    // joriig guitsetgeh hugtsaa 
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    
    // jor delgetrsend gargana
    renderRecipe(state.recipe, state.likes.isLike(id));

  }

}
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
// 
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe))

window.addEventListener("load", e => {
  if (!state.likes ){
    state.likes = new Like();
  }
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
  // like baival tedgeeriig tses nemj haruulna
  state.likes.likes.forEach(e => likesView.renderLike(e));
  

});
/**
 * Nairlagnii controller 
 */
const controlList = ()=> {
  // state.recipe.
  state.list = new List();
  listView.clearItems();

  // nairlaga model uusegne
  state.recipe.ingredients.forEach(n => {
    const item = state.list.addItem(n);
    // console.log(n);
    // tuhain nairlaga delgetsend gargan
    listView.renderItem(item);
  })

  // ug model hargdaj bga bvh nairlaga avch hiine

}

// Like controller 
const controlLike = () => {
  // daragdsan recipe abj model ruu hiine 
  if (!state.likes ){
    state.likes = new Like();
  }
  // Odoo hargdaj baigaa ID olj avah
  const currentRecipeId = state.recipe.id;
  // ene joriig like hiisem esseh shalgah 
  if(state.likes.isLike(currentRecipeId)){
    // likes hiisen bol like boliulna 
    state.likes.deleteLike(currentRecipeId)

    // hargdaj baigaa like tsesees ustagna
    likesView.deleteLike(currentRecipeId)
    // like tovch hargdah baidal 
    likesView.toggleLikeBtn(false);
  }else{
    // like hiigegv bol like hiine 
    const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url )
    likesView.renderLike(newLike)
    likesView.toggleLikeBtn(true);
  }

  
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes())
}
elements.recipeDiv.addEventListener("click", e=>{
  if(e.target.matches(".recipe__btn, .recipe__btn *")){
    controlList()
  } else if(e.target.matches(".recipe__love, .recipe__love *")){
    controlLike();
  }
})

elements.shoppingList.addEventListener("click", e => {
  // click hiise data itemid atterbut shuuj gargaj avah 
  const id = e.target.closest(".shopping__item").dataset.itemid
  // oldson idtai ottsiig modelees ustgan
  state.list.deleteItem(id)

  // delgetsees ustgan 
  listView.deleteItem(id);
})