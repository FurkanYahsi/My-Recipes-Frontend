import { useEffect, useState } from 'react';
import { getRecipeByCategory, getRecipesByType, getTrendRecipes, getSavedRecipes, getLikedRecipes, getUserRecipes } from '../../services/RecipeServices/RecipeService.export';
import { isAdmin, isEditor } from '../../services/AuthServices/AuthService.export';
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

    const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
    const [isUserEditor, setIsUserEditor] = useState<boolean>(false);
    const [isUserShowing, setIsUserShowing] = useState<boolean>(false);

    useEffect(() => {

      const checkPermissions = async () => {
        try {
            const adminResult = await isAdmin();
            const adminData = Array.isArray(adminResult) ? adminResult[0] : adminResult;
            setIsUserAdmin(adminData?.data?.data?.isAdmin === true);
            
            const editorResult = await isEditor();
            const editorData = Array.isArray(editorResult) ? editorResult[0] : editorResult;
            setIsUserEditor(editorData?.data?.data?.isEditor === true);

        } catch (error) {
            console.error("Permission check failed:", error);
            setIsUserAdmin(false);
            setIsUserEditor(false);
        } finally {
        }
    };    
    checkPermissions();
}, []);

    useEffect(() => {
        setLoading(true);
        setIsUserShowing(false);
        setPage(1);

        setRecipes([]);

        if (type === pageTypes.FILTEREDS) {

            if (!categoriesString && !typesString) {
                setRecipes([]);
                return;
            } 
            let length = 0;

            // --------------------------- If both categories and types are selected, fetch recipes by category first but dysfunctional ---------------------------
            if (categoriesString) {
                getRecipeByCategory(categoriesString, page, limitForPerPage)
                  .then((response: any) => {

                    if (response && response.success && response.data && response.data.data) {
                        setRecipes(response.data.data.recipes);
                        setRecipeCount(response.data.data.total || 0);
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
                    setRecipeCount(response.data.data.total || 0);
                    setRecipes(response.data.data.recipes);
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
                        setRecipeCount(response.data.total || 0);
                        setRecipes(response.data.recipes || []);                
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
                        setRecipes(response.data.recipes || []);                
                    } else {
                        console.error("Failed to fetch trending recipes");
                    }
                }).catch((error) => {
                    console.error("Error fetching trending recipes:", error);
                });

        } else if (type === pageTypes.USER_RECIPES) {
            setIsUserShowing(true);
            getUserRecipes(page, limitForPerPage).then((response) => {
                if (response && response.success) {                
                    setRecipeCount(response.data.total || 0);
                    setRecipes(response.data.recipes || []);                
                } else {
                    console.error("Failed to fetch user recipes");
                }
            }).catch((error) => {
                console.error("Error fetching user recipes:", error);
            });

        }
        setLoading(false);

    }, [categoriesString, typesString, period, page, type]);

    const handleDeleteRecipe = (recipeId: string) => {
        setRecipes(recipes => recipes.filter(recipe => recipe.id !== recipeId));
        setRecipeCount(recipeCount => recipeCount - 1);
    }

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
    isUserAdmin,
    isUserEditor,
    isUserShowing,
    handleLikeChange,
    handleBookmarkChange,
    handleDeleteRecipe,
  }
}

export default useShowRecipes;