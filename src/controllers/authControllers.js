import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existingUser) {
            return res.status(400).json({ error: "user already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })


        const token = generateToken(existingUser.id, email, res);



        return res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: name,
                    email: email
                },
                token,
            }
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "User register fail" })
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "email and password both required" })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!existingUser) {
            return res.status(401).json({ message: "email or password is incorrect" })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "email or password is incorrect" })
        }


        const token = generateToken(existingUser.id, email, res);
        
        return res.status(200).json({
            message: "Login success",
            data: {
                user: {
                    id: existingUser.id,
                    name: existingUser.name,
                    email
                },
                token,
            }
        })


    } catch (error) {
        return res.status(500).json({ message: "Error while login" })
    }
}


const logout = async (req, res) => {

    res.cookie("jwt", "", {
        httpOnlt: true,
        expires: new Date(0)
    });

    res.status(200).json({
        status: "success",
        message: "Logout successfull"
    })
}



export { register, login, logout }