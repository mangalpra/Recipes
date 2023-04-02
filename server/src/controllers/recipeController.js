import recipeModel from "../models/Recipes.js";
import usersModel from "../models/Users.js";

export const getRecipeController = async (req, res) => {
    try{
        const response = await recipeModel.find({});
        res.json(response);
    }catch(err){
        res.json(err);
    }
};

//Create a new Recipe
export const createRecipeController = async (req, res) => {
    const recipe = new recipeModel(req.body);
    try{
        const response = await recipe.save();
        res.json(response);
    }catch(err){
        res.json(err);
    }
};

// Get a recipe by ID
export const recipeByIdController = async (req, res) => {
    try {
        const result = await recipeModel.findById(req.params.recipeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Save a recipe
export const recipeController = async (req, res) => {
    try{
        const recipe = await recipeModel.findById(req.body.recipeID);
        const user = await usersModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    }catch(err){
        res.json(err);
    }
};

// Get id of saved recipes
export const savedRecipeIdController = async (req, res) => {
    try{
        const user = await usersModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    }catch(err){
        console.log(err);
    }
};

// Get saved recipes
export const savedRecipeController = async (req, res) => {
    try{
        const user = await usersModel.findById(req.params.userID);
        const savedRecipes = await recipeModel.find({
            _id: { $in: user.savedRecipes },
        }); 
        res.json({ savedRecipes });
    }catch(err){
        console.log(err);
    }
};