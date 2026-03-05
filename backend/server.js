/* Sean Clarke
    c0561639
    10/28/2025
*/
//Server.js file - Entry point for Node/Express
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./src/db.js";
import cors from "cors";

//Routing instructions for CRUD endpoints
import bookRoutes from "./src/routes/BookRoutes.js";

//Creating app and listening on port 5000
const app = express();
const PORT = process.env.PORT || 5000;

//Allowing REACT to talk to EXPRESS
app.use(cors());

//Parses JSON requests
app.use(express.json());

//Node apparently doesnt provide __dirname by default due to ES. So re-creating it~
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Serves frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));

//Mounting REST API in /api/books 
app.use("/api/books", bookRoutes);

//Connecting to MongoDB via .env and starts HTTP server
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});

