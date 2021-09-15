import { storage, database, account } from "../server.js";
import { createReadStream } from "fs";

const COLLECTION_ID = "61319d3498a39";

export const createRecipe = async (req, res) => {
  try {
    const {
      file,
      body: { details },
    } = req;

    const data = JSON.parse(details);

    const createdImage = await storage.createFile(
      createReadStream(`./public/uploads/images/${file.filename}`),
      ["*"],
      ["*"]
    );

    const { name, recipe, ingredients } = data;
    const newRecipe = {
      name: name,
      recipe: recipe,
      ingredients: ingredients,
      created_date: Date.now(),
      image: createdImage.$id,
    };

    // const user = await account.get();

    // console.log(user);

    const createdData = await database.createDocument(COLLECTION_ID, newRecipe);

    res.status(201).json({ createdData, createdImage });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const showRecipes = async (req, res) => {
  try {
    const data = await database.listDocuments(
      COLLECTION_ID,
      undefined,
      undefined,
      undefined,
      "created_date",
      "DESC"
    );
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
