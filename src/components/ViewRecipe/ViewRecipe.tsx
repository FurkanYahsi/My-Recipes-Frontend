import useViewRecipe from "./ViewRecipe.logic";
import './ViewRecipe.css';
import CommentsSection from '../CommentsSection/CommentsSection';

import tatli from '../../assets/tatli.jpg';

import { IconBaseProps } from 'react-icons';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa'

const CircleFilled = FaCheckCircle  as React.FC<IconBaseProps>;
const Circle = FaRegCircle as React.FC<IconBaseProps>;

const ViewRecipe = () => {

    const { recipe, ingredients, checked, toggleChecked, handleLikeChange, handleBookmarkChange } = useViewRecipe();

    return (
    <div className="view-recipe-container">
      <div className="view-recipe-content-container">
        <div className="view-recipe-photo-container">
            <img src={tatli} alt={recipe?.recipe_name} />
            <div className="gradient-overlay"/>
            <div className="recipe-titlee">{recipe?.recipe_name}</div>
        </div>
        <div className="recipe-story">{recipe?.recipe_story}</div>
        <div className="recipe-ingredients">
            <div className="recipe-contents-header">Ingredients</div>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className={`ingredient-line${checked[index] ? ' checked' : ''}`}
                onClick={() => toggleChecked(index)}
              >
                {checked[index] ? <CircleFilled /> : <Circle />}
                <span className="ingredient-text">{ingredient}</span>
              </div>
            ))}                
        </div>
        <div className="recipe-instructions">
            <div className="recipe-contents-header">Instructions</div>
            {recipe?.recipe_instructions}
        </div>
      </div>
      {recipe && (
        <CommentsSection recipeId={recipe.id} />
      )}
    </div>
  )
}

export default ViewRecipe
