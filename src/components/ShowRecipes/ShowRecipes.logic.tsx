import { useEffect, useState } from 'react';
import { getRecipeByCategory, getRecipesByType, getTrendRecipes, getSavedRecipes, getLikedRecipes } from '../../services/RecipeServices/RecipeService.export';
import { useSearchParams } from 'react-router-dom';

import { categoryTypes, pageTypes } from "../../config/constants";

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

const useShowRecipes = (type:string) => {
    const limitForPerPage = 5;
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipeCount, setRecipeCount] = useState(0);

    const [searchParams] = useSearchParams();

    // For filtering recipes
    const categoriesString = searchParams.get("categories") ?? "";
    const typesString = searchParams.get("types") ?? "";
    // For trends, default to "all-time"
    const period = searchParams.get("period") ?? "all-time";

    const categoriesArray = categoriesString ? decodeURIComponent(categoriesString).split(",") : [];
    const typesArray = typesString ? decodeURIComponent(typesString).split(",") : [];
    const typesFromSelectedCategories = categoriesArray.flatMap(category => categoryTypes[category] || []);
    const uniqueTypesNotFromCategories = typesArray.filter(type => !typesFromSelectedCategories.includes(type));

    useEffect(() => {
        setLoading(true);

        setRecipes([]);

        if (type === pageTypes.FILTEREDS) {

            if (!categoriesString && !typesString) {
                setRecipes([]);
                return;
            } 
            let length = 0;

            if (categoriesString) {
                getRecipeByCategory(categoriesString, page, limitForPerPage)
                  .then((response: any) => {

                    if (response && response.success && response.data && response.data.data) {
                        setRecipes(response.data.data);
                        length = response.data.data.length;
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
            }

            if (typesString) {
                getRecipesByType(uniqueTypesNotFromCategories.toString(), page, limitForPerPage - length)
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
            }

        } else if (type === pageTypes.TRENDS) {

            getTrendRecipes(period, page, limitForPerPage).then((response) => {
                if (response && response.success) {
                    
                    setRecipeCount(response.data.data.total || 0);
                    setRecipes(response.data.data.recipes || []);
                } else {
                    console.error("Failed to fetch trending recipes");
                }
            }).catch((error) => {
                console.error("Error fetching trending recipes:", error);
            });

        } else if (type === pageTypes.BOOKMARKS) {

            getSavedRecipes(page, limitForPerPage).then((response) => {
                    if (response && response.success) {                
                        setRecipeCount(response.data.data.total || 0);
                        setRecipes(response.data || []);                
                    } else {
                        console.error("Failed to fetch trending recipes");
                    }
                }).catch((error) => {
                    console.error("Error fetching trending recipes:", error);
                });

        } else if (type === pageTypes.LIKES) {

            getLikedRecipes(page, limitForPerPage).then((response) => {
                    if (response && response.success) {                
                        setRecipeCount(response.data.data || 0);
                        console.log("response.data", response.data);
                        setRecipes(response.data || []);                
                    } else {
                        console.error("Failed to fetch trending recipes");
                    }
                }).catch((error) => {
                    console.error("Error fetching trending recipes:", error);
                });

        }
        setLoading(false);

    }, [categoriesString, typesString, period, page, type]);

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
    page,
    setPage,
    recipeCount,
    limitForPerPage,
    loading,
    handleLikeChange,
    handleBookmarkChange,
  }
}

export default useShowRecipes;