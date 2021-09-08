import { elements } from "./base"
// private function

const renderRecipe = recipe => {
    // console.log(recipe);
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
    elements.pageButtons.innerHTML = "";
}
export const getInput = () => elements.searchInput.value;   
export const renderRecipes = ( recipes, currentPage = 1, resPerpage = 10 ) => {
    // hailttin ur dvn huudaslan vzzleh 
    const start = (currentPage-1)*resPerpage
    const end = currentPage * resPerpage
    recipes.slice(start, end).forEach(renderRecipe);
    // huudaslal dra tovch gargaj ireh 

    const totalPages = Math.ceil(recipes.length/ resPerpage)
    renderButtons(currentPage, totalPages)
}

const createButton = (page, type, direction ) => `<button class="btn-inline results__btn--${type}" data-goto = ${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
</button>`

const renderButtons = (currentPage, totalPages) =>{
    let buttonHtml ;
    if(currentPage === 1  && totalPages>1){
        // 1 huudas dr baina 2 huudas gedeg tovch darna
        buttonHtml = createButton(currentPage+1,"next", "right")
    }else if(currentPage < totalPages){
        // ooh bolon dragii huudasluu shiljih tovch usuul
        buttonHtml = createButton(currentPage-1,"prev", "left")
        buttonHtml += createButton(currentPage+1,"next", "right")
    }
    else if(currentPage === totalPages){
        buttonHtml = createButton(currentPage-1,"prev", "left")

    }

    elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml)
}
// prev, next
