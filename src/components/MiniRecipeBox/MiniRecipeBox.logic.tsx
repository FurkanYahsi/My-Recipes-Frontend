import { useState } from "react";
import { likeOrUnlikeRecipe, addBookmarkOrRemoveBookmarkTheRecipe, deleteRecipe, editRecipe  } from "../../services/RecipeServices/RecipeService.export";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../../utils/ToastMessage/ToastMessage";

const useMiniRecipeBox = (recipeId:string, initialLiked:boolean, initialBookmarked: boolean, onLikeChange?: () => void, onBookmarkChange?:() => void, onDeleteSuccess?: () => void) => {

    const navigate = useNavigate();
    const {showNotification, contextHolder} = ToastMessage();
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

    const handleViewRecipe = () => {
        navigate(`/recipe/${recipeId}`);
    }

    const handleEditRecipe = (values: any) => {
        editRecipe(recipeId, values).then((response:any) => {
            if (response && response.success) {
                console.log("Recipe edited successfully:", response);
                // Navigate to the edit page or show a success message
            } else {
                console.error("Failed to edit the recipe");
            }
        }).catch((error) => {
            console.error("Error editing the recipe:", error);
        });
    }

 const handleDeleteRecipe = () => {
  if (window.confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
    deleteRecipe(recipeId).then((response: any) => {
      
      if (response && response.success) {
        showNotification("Tarif başarıyla silindi.", "success");
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } else {
        showNotification(response.message || "Tarif silinemedi.", "error");
      }
    }).catch((error) => {
      console.error("Error deleting the recipe:", error);
      showNotification("Bir hata oluştu. Tarif silinemedi.", "error");
    });
  }
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
    const addToEditorSuggestions = () => {
        console.log(`Recipe with ID ${recipeId} added to editor suggestions.`);
    }

  return {
    handleViewRecipe,
    handleLikeClick,
    handleBookmarkClick,
    onLikeChange,
    onBookmarkChange,
    isLiked,
    isBookmarked,
    addToEditorSuggestions,
    handleEditRecipe,
    handleDeleteRecipe,
    contextHolder
  }
}

export default useMiniRecipeBox
