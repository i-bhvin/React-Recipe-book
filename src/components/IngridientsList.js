import React from 'react';
import Ingridient from './Ingridients';

export default function IngridientsList({ ingridients }) {
  return (
    <div className='ingredient-grid'>
      {ingridients.map(ingridient => {
        return <Ingridient key={ingridient.id} {...ingridient} />
      })}
    </div>
  )
}
