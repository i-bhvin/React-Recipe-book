import React, { useContext } from 'react'
import IngridientsList from './IngridientsList'
import { RecipeContext } from "./App"

export default function Recipe(props) {

    const { handleRecipeDelete, handleRecipeEdit } = useContext(RecipeContext);

    const {
        id,
        name,
        cookTime,
        servings,
        instructions,
        ingridients
    } = props;
    return (
        <div className='recipe'>


            <div className='recipe__header'>
                <h1 className='recipe__title'>{name}</h1>
                <div>
                    <button 
                        className='btn btn--primary mr-1'
                        onClick={() => handleRecipeEdit(id)}
                    >
                    Edit</button>
                    <button
                        className='btn btn--danger'
                        onClick={() => {
                            handleRecipeDelete(id)
                        }}
                    >

                        Delete</button>
                </div>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Cook Time:</span>
                <span className='recipe__value'>{cookTime}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Servings:</span>
                <span className='recipe__value'>{servings}</span>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Instructions:</span>
                <div className='recipe__value recipe__value--indented recipe__instructions'>
                    {instructions}
                </div>
            </div>
            <div className='recipe__row'>
                <span className='recipe__label'>Ingridients:</span>
                <div className='recipe__value recipe__value--indented'>
                    <IngridientsList ingridients={ingridients} />
                </div>
            </div>









        </div>
    )
}
