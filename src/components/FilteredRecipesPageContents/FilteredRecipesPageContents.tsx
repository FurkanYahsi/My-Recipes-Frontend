import useFilteredRecipesPageContents from "./FilteredRecipesPageContents.logic"
import MiniRecipeBox from "../MiniRecipeBox/MiniRecipeBox"
import './FilteredRecipesPageContents.css';

const FilteredRecipesPageContents = () => {

    const {recipes, handleLikeChange, handleBookmarkChange} = useFilteredRecipesPageContents();

  return (
    <div className="filtered-recipes-page-contents-container">
        {recipes.length > 0 ? (
            <div className="filtered-recipes-page-content-container">
            {recipes.map((recipe) => (
            <MiniRecipeBox
                key={recipe.id}
                recipe={recipe}
                onLikeChange={()=> handleLikeChange(recipe.id)} 
                onBookmarkChange={()=> handleBookmarkChange(recipe.id)}
            />
            ))}
            </div>
        ) : (
            <p>No recipes found for the selected categories.</p>
        )}
    </div>
  )
}

export default FilteredRecipesPageContents