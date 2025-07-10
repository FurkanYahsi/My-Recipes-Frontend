import useViewRecipe from "./ViewRecipe.logic";
import './ViewRecipe.css';


const ViewRecipe = () => {

    const { recipe, handleLikeChange, handleBookmarkChange } = useViewRecipe();
  return (
    <div className="view-recipe-container">
        <div className="view-recipe-content-container">
            <div className="view-recipe-photo-container">
                <img src="/res/tatli.jpg" alt={recipe?.recipe_name} />
                <div className="gradient-overlay"/>
                <div className="recipe-titlee">{recipe?.recipe_name}</div>
            </div>
            <div className="recipe-instructions">
                <div className="recipe-contents-header">
                    Instructions
                </div>
                {recipe?.recipe_instructions}
            </div>
            <div className="recipe-ingredients">
                <div className="recipe-contents-header">
                    Ingredients
                </div>
                {recipe?.recipe_ingredients}
            </div>
        </div>
    </div>
  )
}

export default ViewRecipe
