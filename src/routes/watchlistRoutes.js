import { Router } from "express"
import { allWatchlists, addWatchlist } from "../controllers/watchlistControllers.js";
import { authMiddleware } from "../middlewares/authMidleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { addwatchlistValidator } from "../validators/watchlistValidators.js";

const router = Router();

router.use(authMiddleware)

router.get("/allWatchlists", allWatchlists);
router.post("/addWatchlist",validateRequest(addwatchlistValidator) ,addWatchlist);

export default router;