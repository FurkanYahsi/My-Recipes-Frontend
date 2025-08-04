import MiniRecipeBox from "../MiniRecipeBox/MiniRecipeBox";
import Pagination from "../Pagination/Pagination";
import useShowRecipes from "./ShowRecipes.logic";
import './ShowRecipes.css';

interface ShowRecipesProps {
  type: string;
}

const ShowRecipes = ({ type }: ShowRecipesProps) => {

  const {page, setPage, recipes, recipeCount, limitForPerPage, isUserAdmin, isUserEditor, handleLikeChange, handleBookmarkChange, handleDeleteRecipe} = useShowRecipes(type);

  return (
    <div className="show-recipes-page-contents-container">
      {recipes.length > 0 ? (
          <div className="show-recipes-page-content-container">
            {recipes.map((recipe) => (
            <MiniRecipeBox
                key={recipe.id}
                recipe={recipe}
                onLikeChange={()=> handleLikeChange(recipe.id)} 
                onBookmarkChange={()=> handleBookmarkChange(recipe.id)}
                onDeleteSuccess={() => handleDeleteRecipe(recipe.id)}
                isUserAdmin={isUserAdmin}
                isUserEditor={isUserEditor}
            />
            ))}
            <Pagination 
                page={page}
                setPage={setPage}
                totalCount={recipeCount} 
                limit={limitForPerPage} 
            />
            </div>
        ) : (
            <p>No recipes saved yet.</p>
        )}
    </div>
  )
}

export default ShowRecipes