
import { prisma } from "../config/db.js"

const allWatchlists = async (req, res) => {

    try {
        const allWatchlist = await prisma.watchlistItem.findMany()

        return res.status(200).json({
            status: allWatchlist.length <= 0 ? "No watchlist" : "success",
            data: allWatchlist
        })
    } catch (error) {
        return res.status(500).json({message: "Error while getting watchlists"})
    }
}


const addWatchlist = async (req, res) => {
    try {

        const { movieId, status, rating, notes} = req.body;

        if(!movieId || !rating) {
            return res.status(400).json({message: "All menditory filled are required"});
        }

        const existingWatchlist = await prisma.watchlistItem.findFirst({
            where: {
                userId: req.user.id,
                movieId: movieId
            }
        })

        if(existingWatchlist) {
            return res.status(400).json({message: "Movie already exist in watchlist"})
        }

        const payload = {
            userId: req.user.id,
            movieId,
            status: status || "PLANNING",
            rating,
            notes
        };

        const watchlist = await prisma.watchlistItem.create({
            data: payload
        })

        return res.status(201).json({
            status: "success",
            data: watchlist
        })
        
    } catch (error) {
        return res.status(500).json({message: "Error while adding the watchlist"});
    }
}


export {
    allWatchlists,
    addWatchlist,
}