

export const validateRequest = (schema) => {
    return (req, res, next) => {

        const result = schema.safeParse(req.body)

        if (!result.success) {

            const errorMessage = result.error.issues.map((err) => err.message)

            console.log("Error message in validate zod request: ", errorMessage);
            
            return res.status(400).json({message: errorMessage})
        }

        next();
        
    }
}