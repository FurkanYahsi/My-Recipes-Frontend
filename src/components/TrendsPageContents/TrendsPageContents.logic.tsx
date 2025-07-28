import { useEffect, useState } from "react";
import { getTrendRecipes } from "../../services/RecipeServices/RecipeService.export";

interface Recipe {
  id: string;
  recipe_name: string;
  user_name?: string;
  like_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  bookmark_count: number;
}

const useTrendsPageContents = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => { // Fetch trending recipes when the page refreshes
        setLoading(true);
        getTrendRecipes().then((response:any) => {
            if (response && response.success) {
                setRecipes(response.data);
            } else {
                console.error("Failed to fetch trending recipes");
            }
        }).catch((error) => {
            console.error("Error fetching trending recipes:", error);
        });
        setLoading(false);
    }, []);
    return {
        recipes,
        loading,
        handleLikeChange,
        handleBookmarkChange
    }
}

export default useTrendsPageContents
