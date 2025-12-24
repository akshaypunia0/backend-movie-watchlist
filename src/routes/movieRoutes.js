import { Router } from "express"
import { getAllMovies, addMovie, deleteMovie } from "../controllers/movieControllers.js"
import { authMiddleware } from "../middlewares/authMidleware.js"

const router = Router()

router.use(authMiddleware)


router.get("/allMovies", getAllMovies)
router.post("/addMovie", addMovie)
router.delete("/deleteMovie/:id", deleteMovie)

export default router