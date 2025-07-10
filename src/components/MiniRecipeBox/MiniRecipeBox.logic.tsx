import { useState } from "react";
import { likeOrUnlikeRecipe, addBookmarkOrRemoveBookmarkTheRecipe } from "../../services/RecipeServices/RecipeService.export";
import { useNavigate } from "react-router-dom";

const useMiniRecipeBox = (recipeId:string, initialLiked:boolean, initialBookmarked: boolean, onLikeChange?: () => void, onBookmarkChange?:() => void) => {

    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

    const handleViewRecipe = () => {
        navigate(`/recipe/${recipeId}`);
    }

    const handleLikeClick = async () => {
        likeOrUnlikeRecipe(recipeId).then((response:any) => {
            if (response && response.success) {
                setIsLiked(!isLiked);
                if (onLikeChange) {
                    onLikeChange();
                }
            }
        })
            .catch((error) => {
                console.error("Error liking/unliking recipe:", error);
            });
    }
    const handleBookmarkClick = async () => {
        addBookmarkOrRemoveBookmarkTheRecipe(recipeId).then((response:any) => {
            if (response && response.success) {
                setIsBookmarked(!isBookmarked);
                if (onBookmarkChange) {
                    onBookmarkChange();
                }
            }
        })
            .catch((error) => {
                console.error("Error bookmarking/removing bookmark recipe:", error);
            });
    }

  return {
    handleViewRecipe,
    handleLikeClick,
    handleBookmarkClick,
    onLikeChange,
    onBookmarkChange,
    isLiked,
    isBookmarked
  }
}

export default useMiniRecipeBox
