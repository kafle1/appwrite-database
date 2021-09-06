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
  .setProject("") // Your project ID
  .setKey(
    ""
  ); // Your secret API key

// LISTENING TO PORT
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
