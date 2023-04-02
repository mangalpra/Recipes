import express from "express";
import { 
    createRecipeController, 
    getRecipeController, 
    recipeByIdController, 
    recipeController, 
    savedRecipeController, 
    savedRecipeIdController,
} from "../controllers/recipeController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getRecipeController);
//Create a new Recipe
router.post("/", verifyToken ,createRecipeController);
// Get a recipe by ID
router.get("/:recipeId", recipeByIdController);
//Save a recipe
router.put("/", verifyToken, recipeController);
// Get id of saved recipes
router.get("/savedRecipes/ids/:userID", savedRecipeIdController);
// Get saved recipes
router.get("/savedRecipes/:userID", savedRecipeController);

export default router;