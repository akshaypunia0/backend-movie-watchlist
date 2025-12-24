

export const validateRequest = (schema) => {
    return (req, res, next) => {

        const result = schema.safeParse(req.body)

        if (!result.success) {

            const errorMessage = result.error.issues.map((err) => err.message)
            
            return res.status(400).json({errorMessage: errorMessage})
        }

        next();
        
    }
}