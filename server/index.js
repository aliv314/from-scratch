const express = require('express');
const app = express()
const cors = require('cors')

const fs = require('fs')

app.use(cors());
app.use(express.json());

function readRecipes(){
    const recipes = fs.readFileSync("./data/recipes.json");
    const parsedRecipes = JSON.parse(recipes);
    return parsedRecipes;
}

function writeRecipe(recipeObj){
    const recipes = readRecipes();
    recipes.push(recipeObj);
    fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));

    return (readRecipes());
}

app.get("/", (req, res) => {
    res.json(readRecipes())
} )

app.post("/", (req, res) => {
    const recipe = req.body;
    console.log(recipe)
    res.json(writeRecipe(recipe))
})

app.listen(8080);