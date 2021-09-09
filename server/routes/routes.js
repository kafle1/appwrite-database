import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  showRecipes,
  updateRecipe,
} from "../controllers/recipeControllers.js";
import multer from "multer";

const router = Router();

//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images");
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.get("/api/v1/getRecipes", showRecipes);
router.post("/api/v1/createRecipe", upload.single("image"), createRecipe);
router.delete("/api/v1/deleteRecipe/:id", deleteRecipe);
router.patch("/api/v1/updateRecipe/:id", updateRecipe);

export default router;
