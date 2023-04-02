import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import colors from "colors";
import connectdb from "./db.js";
import userRoutes from "./routes/usersRoute.js";
import recipesRoutes from "./routes/recipesRoute.js";

//dotenv
dotenv.config();

//mongo connection
connectdb();

//rest object
const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", userRoutes);
app.use("/recipes", recipesRoutes);

//Port
const PORT = process.env.PORT || 4000;

//listen server
app.listen(PORT, () => {
    console.log(`Server running in development mode on port no. ${PORT}`.bgBlue.white);
});