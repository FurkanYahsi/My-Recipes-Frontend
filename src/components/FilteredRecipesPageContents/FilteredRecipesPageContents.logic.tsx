import { getRecipeByCategory, getRecipesByType } from "../../services/RecipeServices/RecipeService.export";
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

const categoryTypes: Record<string, string[]> = {
  "Meat Dishes": ["Grilled Meatball", "Fish & Seafood", "Chicken", "Hamburgers", "Other Meat Dishes"],
  "Vegetable Dishes": ["Stir-fried Vegetables", "Roasted Vegetables", "Steamed Vegetables", "Other Vegetable Dishes"],
  "Pasta Recipes": ["Spaghetti Bolognese", "Penne Arrabbiata", "Fettuccine Alfredo", "Other Pasta Recipes"],
  "Pizza Recipes": ["Margherita Pizza", "Pepperoni Pizza", "Veggie Pizza", "Other Pizza Recipes"],
  "Soup Recipes": ["Chicken Soup", "Vegetable Soup", "Mushroom Soup", "Other Soups"],
  "Desserts": ["Cakes", "Milk Dessert", "Ice Cream", "Fruit Recipes", "Other Desserts"],
  "Salads": ["Caesar Salad", "Greek Salad", "Caprese Salad", "Other Salads"],
  "Beverages": ["Cold Beverages", "Hot Beverages"],
  "Other Recipes": ["Rice Dishes", "Snacks", "Egg Dishes", "Legume Dishes", "Bread Recipes", "Other Recipes"]
};

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
