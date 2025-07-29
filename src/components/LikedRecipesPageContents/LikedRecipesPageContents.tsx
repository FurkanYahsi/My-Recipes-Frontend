import useLikedRecipesPageContents from "./LikedRecipesPageContents.logic";
import MiniRecipeBox from "../MiniRecipeBox/MiniRecipeBox";
import { IconBaseProps } from 'react-icons';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const LikedRecipesPageContents = () => {
    const {recipes, page, recipeCount, limitForPerPage, handleLikeChange, handleBookmarkChange, handlePreviousPage, handleNextPage} = useLikedRecipesPageContents();
    
    const IconArrowLeft = MdKeyboardDoubleArrowLeft as React.FC<IconBaseProps>;
    const IconArrowRight = MdKeyboardDoubleArrowRight as React.FC<IconBaseProps>;
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
            <div className='pagination'>
                    <button className={`previous-page${page === 1 ? ' cannot-click' : ''}`} onClick={handlePreviousPage}>
                        <IconArrowLeft/>Previous
                    </button>
                    <span className='page-number'>Page {page} / {Math.max(1, Math.ceil(recipeCount / limitForPerPage))}</span>        
                    <button className={`next-page${page === Math.max(1, Math.ceil(recipeCount / limitForPerPage)) ? ' cannot-click' : ''}`} onClick={handleNextPage}>
                        Next<IconArrowRight/>
                    </button>
                </div>
            </div>
        ) : (
            <p>No recipes liked yet.</p>
        )}
    </div>
  )
}

export default LikedRecipesPageContents
