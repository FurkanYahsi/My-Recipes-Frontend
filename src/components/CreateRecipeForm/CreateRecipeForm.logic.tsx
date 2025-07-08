import React, { FormEvent, useEffect, useRef } from 'react'
import { createRecipe } from '../../services/RecipeServices/RecipeService.export';
import { ToastMessage } from '../../utils/ToastMessage/ToastMessage';

const useCreateRecipeForm = () => {

    const { contextHolder, showNotification } = ToastMessage();

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
  
    const handleShareRecipe = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Do not refresh the page
        if (!recipeNameRef.current?.value ||!ingredientsRef.current?.value || !instructionsRef.current?.value) {
          showNotification("Please fill in all fields before sharing the recipe.", "error");
          return;
        }

        if (recipeNameRef.current?.value.length < 3) {
          showNotification("Recipe name must be at least 3 characters long.", "error");
          return;
        }

         if (ingredientsRef.current?.value.length < 5) {
          showNotification("Ingredients must be at least 5 characters long.", "error");
          return;
        }

         if (instructionsRef.current?.value.length < 20) {
          showNotification("Instructions must be at least 20 characters long.", "error");
          return;
        }
        
        createRecipe({
            recipe_name: recipeNameRef.current?.value,
            recipe_ingredients: ingredientsRef.current?.value,
            recipe_instructions: instructionsRef.current?.value,
        }).then((response: any) => {
            if (response && response.success) {
                showNotification("Recipe shared successfully!", "success");
                // Reset the form fields
                if (recipeNameRef.current) recipeNameRef.current.value = '';
                if (ingredientsRef.current) ingredientsRef.current.value = '';
                if (instructionsRef.current) instructionsRef.current.value = '';
                adjustAllTextareas(); // Adjust height again
            } else {
                // console.error(response?.errorMessage || "Failed to create recipe!");
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
      handleInput,
      contextHolder
    }
}

export default useCreateRecipeForm
