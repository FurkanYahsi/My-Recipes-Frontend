import React, { useEffect, useRef } from 'react'

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
