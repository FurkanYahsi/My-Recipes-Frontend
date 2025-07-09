import { useEffect, useState } from "react";
import { getTrendRecipes } from "../../services/RecipeServices/RecipeService.export";

interface Recipe {
  id: string;
  recipe_name: string;
  user_name?: string;
  like_count: number;
  is_liked: boolean;
}

const useTrendsPageContents = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLikeClicked, setIsLikeClicked] = useState(false);

    const handleLikeChange = (recipeLikeCount: number, recipeIsLiked: boolean) => {
        setIsLikeClicked(!isLikeClicked);
        if (recipeIsLiked) { // If the recipe is already liked, we are unliking it
            isLikeClicked ? recipeLikeCount++ : recipeLikeCount--;
        } else { // If the recipe is not liked, we are liking it
            isLikeClicked ? recipeLikeCount-- : recipeLikeCount++;
        }
        return recipeLikeCount;
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
        handleLikeChange
    }
}

export default useTrendsPageContents
