import React, { useContext } from "react";
import RecipeIngridientsEdit from "./RecipeIngridientsEdit";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from 'uuid';


export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeEdit } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngridientsChange(id, ingridient) {
    const newIngridients = [...recipe.ingridients];
    const index = newIngridients.findIndex((i) => i.id === id);
    newIngridients[index] = ingridient;
    handleChange({ ingridients: newIngridients });
  }

  function handleIngridientAdd() {
    const newIngridient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };

    handleChange({ ingridients: [...recipe.ingridients, newIngridient] });
  }

  function handleIngridientDelete(id) {
    const newIngridients = recipe.ingridients.filter( i => i.id !== id);

    handleChange({ingridients: newIngridients});
  }

  return (
    <div className="recipe-edit">
      <div>
        <div className="recipe-edit__remove-button-container">
          <button
            onClick={() => handleRecipeEdit(undefined)}
            className="btn recipe-edit__remove-button"
          >
            &times;
          </button>
        </div>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input
          value={recipe.name}
          onChange={(e) => handleChange({ [e.target.name]: e.target.value })}
          type="text"
          name="name"
          id="name"
          className="recipe-edit__input"
        />
        <label htmlFor="cookTime" className="recipe-edit__label">
          Cook Time
        </label>
        <input
          value={recipe.cookTime}
          onChange={(e) => handleChange({ [e.target.name]: e.target.value })}
          type="text"
          name="cookTime"
          id="cookTime"
          className="recipe-edit__input"
        />
        <label htmlFor="servings" className="recipe-edit__label">
          Servings
        </label>
        <input
          value={recipe.servings}
          onChange={(e) => handleChange({ [e.target.name]: e.target.value })}
          type="number"
          min="1"
          name="servings"
          id="servings"
          className="recipe-edit__input"
        />
        <label htmlFor="instructions" className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          value={recipe.instructions}
          onChange={(e) => handleChange({ [e.target.name]: e.target.value })}
          name="instructions"
          id="instructions"
          className="recipe-edit__input"
        ></textarea>
      </div>

      <br />
      <label className="recipe-edit__label">Ingridients</label>

      <div className="recipe-edit__ingridient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>

        {recipe.ingridients.map((ingridient) => (
          <RecipeIngridientsEdit
            key={ingridient.id}
            handleIngridientsChange={handleIngridientsChange}
            handleIngridientDelete={handleIngridientDelete}
            ingridient={ingridient}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingridient-btn-container">
        <button
            onClick={handleIngridientAdd}
         className="btn btn--primary">Add Ingridient</button>
      </div>
    </div>
  );
}
