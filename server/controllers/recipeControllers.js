import { database } from "../server.js";
const COLLECTION_ID = "";

export const createRecipe = async (req, res) => {
  const { name, recipe, ingredients } = req.body;
  const newRecipe = {
    name: name,
    recipe: recipe,
    ingredients: ingredients,
    created_date: Date.now(),
  };
  try {
    const createdData = await database.createDocument(COLLECTION_ID, newRecipe);
    res.status(201).json(createdData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const showRecipes = async (req, res) => {
  try {
    const data = await database.listDocuments(COLLECTION_ID, undefined, undefined, undefined, undefined, "DESC" );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const id = req.params.id;

  try {
    const deltetedRecipe = await database.deleteDocument(COLLECTION_ID, id);
    res.status(200).json(deleteRecipe);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

export const updateRecipe = (req, res) => {
  const id = req.params.id;
  const updatedRecipe = req.body;

  try {
    const newRecipe = database.updateDocument(COLLECTION_ID, id, updatedRecipe);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
