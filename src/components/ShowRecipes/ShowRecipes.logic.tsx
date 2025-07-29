import { useEffect, useState } from 'react';
import { getRecipeByCategory, getRecipesByType, getTrendRecipes, getSavedRecipes, getLikedRecipes } from '../../services/RecipeServices/RecipeService.export';
import { useLocation, useSearchParams } from 'react-router-dom';

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
    const limitForPerPage = 30;
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

        if (type === pageTypes.FILTEREDS) {

            if (!categoriesString && !typesString) {
                setRecipes([]);
                return;
            } 

            if (categoriesString) {
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
            }

            if (typesString) {
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
            }

        } else if (type === pageTypes.TRENDS) {

            getTrendRecipes(period, page, limitForPerPage).then((response) => {
                if (response && response.success) {
                    
                    setRecipeCount(response.data.total || 0);
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
                        setRecipeCount(response.data.total || 0);
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
                        setRecipeCount(response.data.total || 0);
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

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
            setLoading(true);
            getSavedRecipes(page - 1).then((response:any) => {
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
        getSavedRecipes(page + 1).then((response:any) => {
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

export default useShowRecipes;