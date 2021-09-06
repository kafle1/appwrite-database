import { Router } from "express";
import { createRecipe, deleteRecipe, showRecipes, updateRecipe } from "../controllers/recipeControllers.js";

const router = Router();

router.get("/api/v1/getRecipes", showRecipes );
router.post("/api/v1/createRecipe", createRecipe );
router.delete("/api/v1/deleteRecipe/:id", deleteRecipe );
router.patch("/api/v1/updateRecipe/:id", updateRecipe );

export default router;