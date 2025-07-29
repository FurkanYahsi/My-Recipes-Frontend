import { useEffect, useState } from 'react';
import { getLikedRecipes } from '../../services/RecipeServices/RecipeService.export';

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

const useLikedRecipesPageContents = () => {
    const limitForPerPage = 30;
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipeCount, setRecipeCount] = useState(0);

    
    useEffect(() => { // Fetch liked recipes when the page refreshes
        setLoading(true);
        getLikedRecipes(page, limitForPerPage).then((response) => {
            if (response && response.success) {                
                setRecipeCount(response.data.total || 0);
                setRecipes(response.data || []);                
                setLoading(false);
            } else {
                console.error("Failed to fetch trending recipes");
                setLoading(false);
            }
        }).catch((error) => {
            console.error("Error fetching trending recipes:", error);
            setLoading(false);
        });
    }, [page]);

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

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
            setLoading(true);
            getLikedRecipes(page - 1).then((response:any) => {
                if (response && response.success) {
                    setRecipes(response.data);
                } else {
                    console.error("Failed to fetch trending recipes");
                }
            }).catch((error) => {
                console.error("Error fetching trending recipes:", error);
            });
            setLoading(false);
        }
    }

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
        setLoading(true);
        getLikedRecipes(page + 1).then((response:any) => {
            if (response && response.success) {
                setRecipes(response.data);
            } else {
                console.error("Failed to fetch trending recipes");
            }
        }).catch((error) => {
            console.error("Error fetching trending recipes:", error);
        });
        setLoading(false);
    }


  return {
    recipes,
    page,
    recipeCount,
    limitForPerPage,
    handlePreviousPage,
    handleNextPage,
    loading,
    handleLikeChange,
    handleBookmarkChange,
  }
}

export default useLikedRecipesPageContents
