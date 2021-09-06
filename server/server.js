//IMPORTS
import express from "express";
import router from "./routes/routes.js";
import sdk from "node-appwrite";
import cors from "cors";

const app = express();

//MIDDLEWARE TO TRANSFER DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

//CONSTANTS
const PORT = process.env.PORT || 5000;

//MIDDLEWARES
app.use("/", router);

//CONNECTION WITH APPWRITE DATABASE

let client = new sdk.Client();
export const database = new sdk.Database(client);

client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("61308ccc181d0") // Your project ID
  .setKey(
    "524168baf8489844dec669b0895f6b6bfcabc5553868c2c2fae66184f32bb7b5c67964245c3497c45827b11c7c092323cfe0af8846d749ab4166d341f2a0ceb5c471edb0d130f8157f243d7c45e671c940eca443d2510a3c36c450b870e5e80f0c85c6caf6231fe96c6a9f510764fb4207abbda8bdbf5c341f5ced4602ff8415"
  ); // Your secret API key

// LISTENING TO PORT
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
