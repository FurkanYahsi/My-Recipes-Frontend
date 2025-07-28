import useTrendsPageContents from "./TrendsPageContents.logic";
import MiniRecipeBox from "../MiniRecipeBox/MiniRecipeBox";
import './TrendsPageContents.css';

const TrendsPageContents = () => {

  const { recipes, loading, handleLikeChange, handleBookmarkChange } = useTrendsPageContents();

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
            </div>
        )}
    </div>
  )
}

export default TrendsPageContents
