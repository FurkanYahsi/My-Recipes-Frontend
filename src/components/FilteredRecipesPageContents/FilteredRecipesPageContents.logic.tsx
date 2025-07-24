import { getRecipeByCategory } from "../../services/RecipeServices/RecipeService.export";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
    
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const categoriesString = categoriesParam ? decodeURIComponent(categoriesParam) : '';

    useEffect(() => {
        
        getRecipeByCategory(categoriesString, 1, 10)
          .then((response: any) => {
            console.log("Response from getRecipeByCategory: ", response);

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

    console.log("Filtered Categories: ", categoriesString);

  return {
    recipes,
  }
}

export default useFilteredRecipesPageContents
