import { Router } from "express"
import { getAllMovies, addMovie } from "../controllers/movieControllers.js"
import { authMiddleware } from "../middlewares/authMidleware.js"

const router = Router()

router.use(authMiddleware)


router.get("/allMovies", getAllMovies)
router.post("/addMovie", addMovie)

export default router