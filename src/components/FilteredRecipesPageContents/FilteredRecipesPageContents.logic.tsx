import { getRecipeByCategory, getRecipesByType } from "../../services/RecipeServices/RecipeService.export";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { categoryTypes } from "../../config/constants";

interface Recipe {
    id: string;
    recipe_name: string;
    user_name?: string;
    like_count: number;
    is_liked: boolean;
    is_bookmarked: boolean;
    bookmark_count: number;
    comment_count: number;
}

const useFilteredRecipesPageContents = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoriesParam = queryParams.get('categories');
    const typesParam = queryParams.get('types');
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const categoriesString = categoriesParam ? decodeURIComponent(categoriesParam) : '';
    const typesString = typesParam ? decodeURIComponent(typesParam) : '';

    const categoriesArray = categoriesString ? categoriesString.split(',') : [];
    const typesArray = typesString ? typesString.split(',') : [];

    const typesFromSelectedCategories = categoriesArray.flatMap(category => categoryTypes[category] || []);    
    const uniqueTypesNotFromCategories = typesArray.filter(type => !typesFromSelectedCategories.includes(type));

    useEffect(() => {

        if (!categoriesString) {
            setRecipes([]);
            return;
        }
        
        getRecipeByCategory(categoriesString, 1, 10)
          .then((response: any) => {

            if (response && response.success && response.data && response.data.data) {
                setRecipes(response.data.data);
            } else {
              console.error("Unexpected API response structure:", response);
              setRecipes([]);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching recipes by category:", error);
            setRecipes([]);
          })
          .finally(() => {
          });
    }, [categoriesString]);

    useEffect(() => {
        if (!typesString) {
            setRecipes([]);
            return;
        }
        getRecipesByType(uniqueTypesNotFromCategories.toString(), 1, 10)
          .then((response: any) => {
            if (response && response.success && response.data && response.data.data) {
                setRecipes(response.data.data);
            } else {
              console.error("Unexpected API response structure:", response);
              setRecipes([]);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching recipes by type:", error);
            setRecipes([]);
          });
    }, [typesString]);
       
  const handleLikeChange = (recipeId: string) => {
    setRecipes(recipes => 
        recipes.map(recipe => recipe.id === recipeId
            ? {
                ...recipe, 
                is_liked: !recipe.is_liked, 
                like_count: Number(recipe.like_count) + (!recipe.is_liked ? 1 : -1)
              }
            : recipe
        )
    );
  };

  const handleBookmarkChange = (recipeId: string) => {
    setRecipes(recipes => 
        recipes.map(recipe => recipe.id === recipeId
            ? {
                ...recipe, 
                is_bookmarked: !recipe.is_bookmarked, 
                bookmark_count: Number(recipe.bookmark_count) + (!recipe.is_bookmarked ? 1 : -1)
              }
            : recipe
        )
    );
  }

  return {
    recipes,
    handleLikeChange,
    handleBookmarkChange
  }
}

export default useFilteredRecipesPageContents