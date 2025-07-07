import './CreateRecipeForm.css';
import useCreateRecipeForm from './CreateRecipeForm.logic';

const CreateRecipeForm = () => {

  const { handleShareRecipe, recipeNameRef, ingredientsRef, instructionsRef, handleInput } = useCreateRecipeForm();

  return (
    <div className="send-recipe-container">
        <div className='mini-container'>
          <div className='header'>Recipe Name</div>
          <textarea ref={recipeNameRef} onInput={handleInput} rows={1}/>
        </div>
        <div className='mini-container'>          
          <div className='header'>Ingredients</div>
          <textarea placeholder="Write all the ingredients under each other" ref={ingredientsRef} onInput={handleInput} rows={5}/>
        </div>
        <div className='mini-container'>
          <div className='header'>Instructions</div>
          <textarea placeholder="Write all the preparation steps" ref={instructionsRef} onInput={handleInput} rows={5}/>
        </div>
        <button className='button-share-recipe' onClick={handleShareRecipe}>Share Recipe</button>

    </div>
  )
}

export default CreateRecipeForm
