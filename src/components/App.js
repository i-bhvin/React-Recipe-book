import React, { useState, useEffect,  } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import "../css/app.css";
import { v4 as uuidv4 } from 'uuid';


export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "LearningWithReactCooking"

export default function App() {

    const recipeContextValue = {
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeEdit,
        handleRecipeChange
    }

    const [recipes, setRecipes] = useState(sampleRecipe);
    const [selectedRecipeID, setSelectedRecipeID] = useState();

    const selectedRecipe = recipes.find( r => r.id === selectedRecipeID);

    useEffect(() =>{
        let recipeString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(recipeString != null) setRecipes(JSON.parse(recipeString));
    }, []);

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    }, [recipes]);



    function handleRecipeChange(id, recipe){
        const newRecipes = [...recipes];

        const index = newRecipes.findIndex(r => r.id === id);

        newRecipes[index] = recipe;

        setRecipes(newRecipes);
    }

    function handleRecipeEdit(id) {
        setSelectedRecipeID(id);
    }   

    function handleRecipeAdd() {
        const newRecipe = {
            id: uuidv4(),
            name: "",
            servings: "",
            cookTime: "",
            instructions: "",
            ingridients: [
                {
                    id: uuidv4(), name: "", amount: ""
                }
            ]
        }

        setRecipes([...recipes, newRecipe]);
        setSelectedRecipeID(newRecipe.id);
    }

    function handleRecipeDelete(id) {
        if(selectedRecipeID !== null && selectedRecipeID === id) setSelectedRecipeID(undefined);

        setRecipes(recipes.filter(recipe => recipe.id !== id))
    }



    return (
        <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList
                recipes={recipes}
            />

            {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </RecipeContext.Provider>
    );
}

const sampleRecipe = [
    {
        id: 1,
        name: "Plain Chicken",
        servings: 3,
        cookTime: "1:45",
        instructions: "1. Put salt on the Chicken\n2. put chicken in the oven\n3. Eat chicken",
        ingridients: [
            {
                id: 1,
                name: "chicken",
                amount: "2 Pounds"
            },
            {
                id: 2,
                name: "Salt",
                amount: "1Tbs"
            }
        ]
    },
    {
        id: 2,
        name: "Plain Pork",
        servings: 5,
        cookTime: "0:45",
        instructions: "1. Put Pepper on the Pork\n2. put Pork in the oven\n3. Eat Pork",
        ingridients: [
            {
                id: 1,
                name: "Pork",
                amount: "3 Pounds"
            },
            {
                id: 2,
                name: "Pepper",
                amount: "2Tbs"
            }
        ]
    }
]

