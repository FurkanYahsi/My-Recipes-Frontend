import { useState } from "react";
import { likeOrUnlikeRecipe } from "../../services/RecipeServices/RecipeService.export";

const useMiniRecipeBox = (recipeId:string, initialLiked:boolean, onLikeChange?: () => void) => {

    const [isLiked, setIsLiked] = useState(initialLiked);


    const handleLikeClick = async () => {
        likeOrUnlikeRecipe(recipeId).then((response:any) => {
            if (response && response.success) {
                setIsLiked(!isLiked);
                if (onLikeChange) {
                    onLikeChange();
                }
            }})
            .catch((error) => {
                console.error("Error liking/unliking recipe:", error);
            });
    }
    const handleBookmarkClick = () => {
        console.log("Bookmark button clicked");
    }

  return {
    handleLikeClick,
    handleBookmarkClick,
    onLikeChange,
    isLiked
  }
}

export default useMiniRecipeBox
