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
            <div className="content-container">
                {recipes.map(recipe => (
                    <MiniRecipeBox 
                        key={recipe.id} 
                        recipe={recipe} 
                        onLikeChange={()=>recipe.like_count = handleLikeChange(recipe.like_count, recipe.is_liked)} 
                        onBookmarkChange={()=>recipe.bookmark_count = handleBookmarkChange(recipe.bookmark_count, recipe.is_bookmarked)}
                    />
                ))}
            </div>
        )}
    </div>
  )
}

export default TrendsPageContents
