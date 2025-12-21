import jwt from "jsonwebtoken"

const generateToken = (userId, email, res) => {
    const payload = {
        id: userId,
        email
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPRES_IN || "7d"
        }
    )

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: "strict",
        maxAge: (1000 * 60 * 60 * 24) * 7
    })

    return token;
}

export default generateToken