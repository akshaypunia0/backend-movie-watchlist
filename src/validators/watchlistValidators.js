import * as z from "zod";

const addwatchlistValidator = z.object({
    movieId: z.string().uuid(),
    status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
        error: () => ({
            message: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED"
        })
    }).optional(),
    rating: z.coerce
        .number()
        .int("Rating must be an integer")
        .min(1, "Rating must be between 1 to 10")
        .max(10, "Rating must be between 1 to 10"),
    notes: z.string().optional()
})

export { addwatchlistValidator }