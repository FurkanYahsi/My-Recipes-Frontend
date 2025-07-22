import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { createRecipe } from '../../services/RecipeServices/RecipeService.export';
import { ToastMessage } from '../../utils/ToastMessage/ToastMessage';

const useCreateRecipeForm = () => {

  const { contextHolder, showNotification } = ToastMessage();
  const recipeNameRef = useRef<HTMLTextAreaElement>(null);
  const recipeStoryRef = useRef<HTMLTextAreaElement>(null);
  const ingredientsRef = useRef<HTMLTextAreaElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const [whichStep, setWhichStep] = useState(1);
  const [inputs, setInputs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setTypeOptions([]); // Reset type options when categories change
      if (selectedCategories.includes("Meat Dishes")) {
        setTypeOptions([...typeOptions, "Grilled Meatball", "Fish & Seafood", "Chicken", "Hamburgers"]);
      } 
      if (selectedCategories.includes("Vegetable Dishes")) {
        setTypeOptions([...typeOptions, "Stir-fried Vegetables", "Roasted Vegetables", "Steamed Vegetables"]);
      } 
      if (selectedCategories.includes("Pasta Recipes")) {
        setTypeOptions([...typeOptions, "Spaghetti Bolognese", "Penne Arrabbiata", "Fettuccine Alfredo"]);
      } 
      if (selectedCategories.includes("Pizza Recipes")) {
        setTypeOptions([...typeOptions, "Margherita Pizza", "Pepperoni Pizza", "Vegetarian Pizza"]);
      } 
      if (selectedCategories.includes("Soup")) {
        setTypeOptions([...typeOptions, "Chicken Soup", "Vegetable Soup", "Mushroom Soup"]);
      }
      if (selectedCategories.includes("Desserts")) {
        setTypeOptions([...typeOptions, "Cakes", "Milk Dessert", "Ice Cream", "Fruit Recipes"]);
      } 
      if (selectedCategories.includes("Salads")) {
        setTypeOptions([...typeOptions, "Caesar Salad", "Greek Salad", "Caprese Salad"]);
      }
      if (selectedCategories.includes("Beverages")) {
        setTypeOptions([...typeOptions, "Cold Beverages", "Hot Beverages"]);
      }
      if (selectedCategories.includes("Snacks")) {
        setTypeOptions([...typeOptions, "Chips", "Popcorn", "Nuts"]);
      }
      if (selectedCategories.includes("Other Recipes")) {
        setTypeOptions([...typeOptions, "Rice Dishes", "Snacks", "Egg Dishes", "Legume Dishes", "Bread Recipes"]);
      }
    }
  }, [selectedCategories]);
  
  const adjustHeight = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = 'auto'; // Reset height to auto to shrink if needed
      element.style.height = `${element.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  const adjustAllTextareas = () => {
    adjustHeight(recipeNameRef.current);
    adjustHeight(recipeStoryRef.current);
    adjustHeight(ingredientsRef.current);
    adjustHeight(instructionsRef.current);
  }

  useEffect(() => {
    adjustAllTextareas();
  }, []);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    adjustHeight(e.currentTarget);
  };

  const handleFirstNextStep = (e : FormEvent<HTMLFormElement>) => {
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
      inputs[0] = recipeNameRef.current?.value || '';
      inputs[1] = recipeStoryRef.current?.value || '';
      inputs[2] = ingredientsRef.current?.value || '';
      inputs[3] = instructionsRef.current?.value || '';

      setWhichStep(whichStep + 1);
  }

  useEffect(() => {
  // When the user navigates back to step 1, update the textareas with the saved inputs
    if (whichStep === 1 && inputs.length > 0) {
      if (recipeNameRef.current) recipeNameRef.current.value = inputs[0] || '';
      if (recipeStoryRef.current) recipeStoryRef.current.value = inputs[1] || '';
      if (ingredientsRef.current) ingredientsRef.current.value = inputs[2] || '';
      if (instructionsRef.current) instructionsRef.current.value = inputs[3] || '';

      adjustAllTextareas();
    }
    if (whichStep === 1) { 
      setSelectedCategories([]);
      setSelectedTypes([]);
    }
  }, [whichStep]);

  const handleShareRecipe = () => {

    if (selectedCategories.length === 0) {
      showNotification("Please select at least one category.", "error");
      return;
    }
    if (selectedTypes.length === 0) {
      showNotification("Please select at least one type.", "error");
      return;
    }

    if (inputs.length === 4 && inputs.every(input => input.trim() !== '') && selectedCategories.length > 0 && selectedTypes.length > 0) {
      createRecipe({
        recipe_name: inputs[0],
        recipe_story: inputs[1],
        recipe_ingredients: inputs[2],
        recipe_instructions: inputs[3],
        category: selectedCategories,
        type: selectedTypes,
      }).then((response: any) => {
        if (response && response.success) {
          showNotification("Recipe shared successfully!", "success");
          setSelectedCategories([]);
          setSelectedTypes([]);
          inputs.length = 0; // Clear inputs after successful submission
        } else {
           showNotification("Failed to create recipe! " + (response?.errorMessage || ""), "error");
           console.error(response?.errorMessage || "Failed to create recipe!");
        }
      }).catch((error: any) => {
        console.error("Error creating recipe:", error);
        showNotification("Error creating recipe! Please try again later.", "error");
      });
    }      
  }
  return {
    handleFirstNextStep,
    handleShareRecipe,
    whichStep,
    setWhichStep,
    recipeNameRef,
    recipeStoryRef,
    ingredientsRef,
    instructionsRef,
    handleInput,
    contextHolder,
    selectedCategories,
    setSelectedCategories,
    selectedTypes,
    setSelectedTypes,
    typeOptions,
  }
}

export default useCreateRecipeForm
