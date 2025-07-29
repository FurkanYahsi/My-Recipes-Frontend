import useTrendsPageContents from "./TrendsPageContents.logic";
import MiniRecipeBox from "../MiniRecipeBox/MiniRecipeBox";
import './TrendsPageContents.css';


import { IconBaseProps } from 'react-icons';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const IconArrowLeft = MdKeyboardDoubleArrowLeft as React.FC<IconBaseProps>;
const IconArrowRight = MdKeyboardDoubleArrowRight as React.FC<IconBaseProps>;

const TrendsPageContents = () => {

  const { recipes, loading, page, recipeCount, limitForPerPage, handleLikeChange, handleBookmarkChange, handlePreviousPage, handleNextPage } = useTrendsPageContents();

  return (
    <div className="trends-page-contents-container">
        {loading ? (
            <div>Loading...</div>
        ) : (
            <div className="trends-page-content-container">
                {recipes.map(recipe => (
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
        )}
    </div>
  )
}

export default TrendsPageContents
