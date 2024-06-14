import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (request, response, next) => {
    const { username, email, password } = request.body;
    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        response.status(201).json('User created successfully!')
    }catch(error){
        next(error);
    }

}

export const all = async (request, response) => {
    User.find({}).then(function (users) {
        response.send(users);
        });

}