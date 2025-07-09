import useTrendsPageContents from "./TrendsPageContents.logic";
import MiniRecipeBox from "../MiniRecipeBox/MiniRecipeBox";

const TrendsPageContents = () => {

  const { recipes, loading, handleLikeChange } = useTrendsPageContents();

  return (
    <div className="trends-page">
        {loading ? (
            <div>Loading...</div>
        ) : (
            <div className="recipes-container">
                {recipes.map(recipe => (
                    <MiniRecipeBox 
                        key={recipe.id} 
                        recipe={recipe} 
                        onLikeChange={()=>recipe.like_count = handleLikeChange(recipe.like_count, recipe.is_liked) } 
                    />
                ))}
            </div>
        )}
    </div>
  )
}

export default TrendsPageContents
