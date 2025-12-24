import express from "express"
import { config } from "dotenv"
config();
import movieRoutes from "../src/routes/movieRoutes.js"
import authRoutes from "../src/routes/authRoutes.js"
import { connectDB, disconnectDB } from "./config/db.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import { apiRateLimit } from "./middlewares/apiRateLimiters.js";


connectDB();

const app = express();

const PORT = 5001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(apiRateLimit);

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/watchlist", watchlistRoutes);

app.get("/test", async (req, res) => {
    res.send({message: "Welcome to movie watchlist project..."});
})

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
}) 