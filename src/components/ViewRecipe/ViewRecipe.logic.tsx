import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/RecipeServices/RecipeService.export';
import { useEffect, useState } from 'react';

interface Recipe {
  id: string;
  recipe_name: string;
  recipe_story?: string;
  recipe_ingredients?: string;
  recipe_instructions?: string;
  user_name?: string;
  like_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  bookmark_count: number;
}

const useViewRecipe = () => {

    const recipeId = useParams().id || '';

    const [recipe, setRecipe] = useState<Recipe>();
    const [isLikeClicked, setIsLikeClicked] = useState(false);
    const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);

    const ingredients = recipe?.recipe_ingredients?.split('\n').map(line => line.trim()).filter(line => line.length > 0) || [];
    const [checked, setChecked] = useState<boolean[]>([]);

    useEffect(() => {
        setChecked(new Array(ingredients.length).fill(false))
    }, [ingredients.length])

  const toggleChecked = (index: number) => {
    setChecked(prev => {
      const copy = [...prev]
      copy[index] = !copy[index]
      return copy
    })
  }

    const handleLikeChange = (recipeLikeCount: number, recipeIsLiked: boolean) => {
        setIsLikeClicked(!isLikeClicked);
        if (recipeIsLiked) { // If the recipe is already liked, we are unliking it
            isLikeClicked ? recipeLikeCount++ : recipeLikeCount--;
        } else { // If the recipe is not liked, we are liking it
            isLikeClicked ? recipeLikeCount-- : recipeLikeCount++;
        }
        return recipeLikeCount;
    }

    const handleBookmarkChange = (recipeBookmarkCount: number, recipeIsBookmarked: boolean) => {
        setIsBookmarkClicked(!isBookmarkClicked);
        if (recipeIsBookmarked) {
            isBookmarkClicked ? recipeBookmarkCount++ : recipeBookmarkCount--;
        } else {
            isBookmarkClicked ? recipeBookmarkCount-- : recipeBookmarkCount++;
        }
        return recipeBookmarkCount;
    }

    useEffect(() => {
        getRecipeById(recipeId).then((response:any) => {
            if (response && response.success) {
                // console.log("Recipe fetched successfully:", response);
                setRecipe(response.data);
            } else {
                console.error("Failed to fetch the recipe");
            }
        }).catch((error) => {
            console.error("Error fetching the recipe:", error);
        });
    }, []);


  return {
    recipe,
    ingredients,
    checked,
    toggleChecked,
    handleLikeChange,
    handleBookmarkChange
  }
}

export default useViewRecipe
