import { Router } from "express"
import { allWatchlists, addWatchlist } from "../controllers/watchlistControllers.js";
import { authMiddleware } from "../middlewares/authMidleware.js";

const router = Router();

router.use(authMiddleware)

router.get("/allWatchlists", allWatchlists);
router.post("/addWatchlist", addWatchlist);

export default router;