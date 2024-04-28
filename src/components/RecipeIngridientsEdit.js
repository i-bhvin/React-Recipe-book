import React from "react";

export default function RecipeIngridientsEdit({
  ingridient,
  handleIngridientsChange,
  handleIngridientDelete,
}) {
  function handleChange(changes) {
    handleIngridientsChange(ingridient.id, { ...ingridient, ...changes });
  }
  return (
    <>
      <input
        onChange={(e) => handleChange({ [e.target.name]: e.target.value })}
        value={ingridient.name}
        name="name"
        className="recipe-edit__input"
        type="text"
      />
      <input
        onChange={(e) => handleChange({ [e.target.name]: e.target.value })}
        value={ingridient.amount}
        name="amount"
        className="recipe-edit__input"
        type="text"
      />
      <button
        onClick={() => handleIngridientDelete(ingridient.id)}
        className="btn btn--danger"
      >
        &times;
      </button>
    </>
  );
}
