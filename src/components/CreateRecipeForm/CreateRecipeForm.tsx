import './CreateRecipeForm.css';
import useCreateRecipeForm from './CreateRecipeForm.logic';
import MultipleSelectDropDown from '../MultipleSelectDropDown/MultipleSelectDropDown';

import { IconBaseProps } from 'react-icons';
import { HiMiniArrowLeft } from "react-icons/hi2";
import { HiMiniArrowRight } from "react-icons/hi2";

const IconArrowLeft = HiMiniArrowLeft as React.FC<IconBaseProps>;
const IconArrowRight = HiMiniArrowRight as React.FC<IconBaseProps>;

const CreateRecipeForm = () => {

  const { whichStep,
          setWhichStep,
          handleFirstNextStep,
          handleUpdateRecipe,
          handleShareRecipe,
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
          isUpdateRecipe } = useCreateRecipeForm();
          

  return (
    <>
    {contextHolder}
      {whichStep === 1 &&
        <div className="send-recipe-container">          
          <form onSubmit={handleFirstNextStep}>
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
              <button type='submit' className='button-share-recipe'>Next Step <IconArrowRight/></button>
            </div>
          </form>
        </div>
      }
      {whichStep === 2 &&
        <div className="send-recipe-container">
          <div className='mini-container'>
          <MultipleSelectDropDown 
            header="Recipe Category"
            options={["Meat Dishes", "Vegetable Dishes", "Pasta Recipes", "Pizza Recipes", "Soup", "Desserts", "Salads", "Beverages", "Snacks", "Other Recipes"]}
            selectedOptions={selectedCategories}
            setSelectedOptions={setSelectedCategories}
          />
          <MultipleSelectDropDown 
            header="Recipe Type"
            options={typeOptions}
            selectedOptions={selectedTypes}
            setSelectedOptions={setSelectedTypes}
          />
          </div>
          <div className="button-container">
            <button onClick={() => setWhichStep(1)} className='previous-page create-recipe-buttons-width'><IconArrowLeft/>Back</button>
            { isUpdateRecipe ?
              <button onClick={handleUpdateRecipe} className='next-page create-recipe-buttons-width'>Update Recipe<IconArrowRight/></button> :
              <button onClick={handleShareRecipe} className='next-page create-recipe-buttons-width'>Share Recipe<IconArrowRight/></button>}
          </div>
        </div>
      }
    </>
  )
}

export default CreateRecipeForm
