import { elements } from "./base"
// private function
// 
// image_url: "http://forkify-api.herokuapp.com/images/LemonChickenOrzoSoup33989.jpg"
// publisher: "Two Peas and Their Pod"
// publisher_url: "http://www.twopeasandtheirpod.com"
// recipe_id: "54290"
// social_rank: 99.99999952354868
// source_url: "http://www.twopeasandtheirpod.com/lemon-chicken-orzo-soup/"

const renderRecipe = recipe => {
    console.log(recipe);
    const mackup = ` 
    <li>
        <a class="results__link " href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`
    elements.searchResultList.insertAdjacentHTML("beforeend", mackup )
}
export const clearSearchQuery = () => {
    elements.searchInput.value = "";
}
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = "";
}
export const getInput = () => elements.searchInput.value;   
export const renderRecipes = recipes => {
    recipes.forEach(renderRecipe);
}