import './CreateRecipeForm.css';
import useCreateRecipeForm from './CreateRecipeForm.logic';

const CreateRecipeForm = () => {

  const { handleShareRecipe, recipeNameRef, recipeStoryRef,ingredientsRef, instructionsRef, handleInput, contextHolder } = useCreateRecipeForm();

  return (      
    <div className="send-recipe-container">
      {contextHolder}
      <form onSubmit={handleShareRecipe}>      
        <div className='mini-container'>
          <div className='header'>Recipe Name</div>
          <textarea ref={recipeNameRef} onInput={handleInput} rows={1} name='recipeName'/>
        </div>
        <div className='mini-container'>
          <div className='header'>Recipe History</div>
          <textarea ref={recipeStoryRef} onInput={handleInput} rows={3} name='recipeStory'/>
        </div>
        <div className='mini-container'>          
          <div className='header'>Ingredients</div>
          <textarea placeholder="Write all the ingredients under each other" ref={ingredientsRef} onInput={handleInput} rows={5} name='recipeIngredients'/>
        </div>
        <div className='mini-container'>
          <div className='header'>Instructions</div>
          <textarea placeholder="Write all the preparation steps" ref={instructionsRef} onInput={handleInput} rows={5} name='recipeInstructions'/>
        </div>
        <div className="button-container">
          <button type='submit' className='button-share-recipe'>Share Recipe</button>
        </div>
      </form>
    </div>    
  )
}

export default CreateRecipeForm
