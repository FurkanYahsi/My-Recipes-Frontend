import React, { useEffect, useRef } from 'react'
import { createRecipe } from '../../services/RecipeServices/RecipeService.export';

const useCreateRecipeForm = () => {

    const recipeNameRef = useRef<HTMLTextAreaElement>(null);
    const ingredientsRef = useRef<HTMLTextAreaElement>(null);
    const instructionsRef = useRef<HTMLTextAreaElement>(null);
    
    const adjustHeight = (element: HTMLTextAreaElement | null) => {
      if (element) {
        element.style.height = 'auto'; // Reset height to auto to shrink if needed
        element.style.height = `${element.scrollHeight}px`; // Set height to scrollHeight
      }
    };
  
    const adjustAllTextareas = () => {
      adjustHeight(recipeNameRef.current);
      adjustHeight(ingredientsRef.current);
      adjustHeight(instructionsRef.current);
    }
  
    useEffect(() => {
      adjustAllTextareas();
    }, []);
  
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      adjustHeight(e.currentTarget);
    };
  
    const handleShareRecipe = () => {
        createRecipe({
            recipe_name: recipeNameRef.current?.value || '',
            recipe_ingredients: ingredientsRef.current?.value || '',
            recipe_instructions: instructionsRef.current?.value || '',
        }).then((response: any) => {
            if (response && response.success) {
                // Reset the form fields
                if (recipeNameRef.current) recipeNameRef.current.value = '';
                if (ingredientsRef.current) ingredientsRef.current.value = '';
                if (instructionsRef.current) instructionsRef.current.value = '';
                adjustAllTextareas(); // Adjust height again
            } else {
                console.error(response?.errorMessage || "Failed to create recipe!");
            }
        }).catch((error: any) => {
            console.error("Error creating recipe:", error);
        });
    }
    return {
      handleShareRecipe,
      recipeNameRef,
      ingredientsRef,
      instructionsRef,
      handleInput
    }
}

export default useCreateRecipeForm
