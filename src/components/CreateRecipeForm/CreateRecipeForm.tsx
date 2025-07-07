import { useRef, useEffect } from 'react';
import './CreateRecipeForm.css';

const CreateRecipeForm = () => {
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

  return (
    <div className="send-recipe-container">
        <div className='mini-container'>
          <div className='header'>Recipe Name</div>
          <textarea className='recipe-name' ref={recipeNameRef} onInput={handleInput} rows={1}/>
        </div>
        <div className='mini-container'>          
          <div className='header'>Ingredients</div>
          <textarea placeholder="Write all the ingredients under each other" className='ingredients' ref={ingredientsRef} onInput={handleInput} rows={5}/>
        </div>
        <div className='mini-container'>
          <div className='header'>Instructions</div>
          <textarea placeholder="Write all the preparation steps" className='instructions' ref={instructionsRef} onInput={handleInput} rows={5}/>
        </div>
        <button type="submit">Create Recipe</button>

    </div>
  )
}

export default CreateRecipeForm
