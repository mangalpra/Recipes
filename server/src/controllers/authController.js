import usersModel from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
    const { username, password } = req.body;
    const user = await usersModel.findOne({ username });
    
    if(user){
        return res.status(200).json({ message: "User already exists!"});
    }
    //const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, 10);
    //below 2 lines save the data to database 
    const newUser = new usersModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully!"});

};

export const loginController = async (req, res) => {
    const { username, password } = req.body;
    const user = await usersModel.findOne({ username });

    if(!user){
        return res.status(400).json({ message: "User doesn't exists!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid credentials!"
        })
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
    
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};