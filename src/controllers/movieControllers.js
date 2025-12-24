
import { prisma } from "../config/db.js"

const getAllMovies = async (req, res) => {
    try {

        const movies = await prisma.movie.findMany()

        return res.status(200).json({
            status: movies.length <= 0 ? "No movie found" : "success",
            data: movies
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error geting movies" })
    }
}



const addMovie = async (req, res) => {
    try {
        const { title, overview, releaseYear, genres, runtime, posterUrl, createdBy} = req.body;

        if(!title || !releaseYear || genres.length <= 0 || !createdBy) {
            return res.status(400).json({message: "Fill all required fileds"});
        }

        const existingMovie = await prisma.movie.findFirst({
            where: { 
                title,
                createdBy,
                releaseYear
            }
        });

        if (existingMovie) {
            return res.status(400).json({message: "Movie already exist"});
        }

        const payload = req.body;

        const movie = await prisma.movie.create({
            data: payload
        })

        return res.status(201).json({
            status: "success",
            data: movie
        })


    } catch (error) {
        return res.status(500).json({ message: "Internal server error while creating movie" })
    }
}


const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;

        const existingMovie = await prisma.movie.findUnique({
            where: {id: id}
        })

        if(!existingMovie) {
            return res.status(401).json({message: "Movie doesn't exist"})
        }

        const deletedMovie = await prisma.movie.delete({
            where: {id: id}
        })

        return res.status(200).json({
            status: "Success",
            message: "Movie deleted successfully",
            data: deletedMovie
        })


    } catch (error) {
        return res.status(500).json({message: "Internal server error while deleting movie"})
    }
}


export {
    getAllMovies,
    addMovie,
    deleteMovie,
}